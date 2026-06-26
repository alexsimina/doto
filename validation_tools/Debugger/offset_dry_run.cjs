const fs = require('fs');
const path = require('path');

function getJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getJsFiles(fullPath));
        } else if (file.endsWith('.js')) {
            results.push(fullPath);
        }
    });
    return results;
}

function detectShift(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    
    // Find where the actual C++ code starts in the JS file
    let H = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('code: `') || lines[i].includes('"code": `') || lines[i].includes('code:`') || lines[i].includes('"code":`')) {
            H = i + 2; // Line after 'code: `'
            break;
        }
    }
    
    if (H === -1) return 0;
    
    // Temporarily require the data object to analyze line boundaries
    let tempContent = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    tempContent += '\n;module.exports = data;';
    const tempFile = path.join(__dirname, 'temp_detect_dry_run.cjs');
    fs.writeFileSync(tempFile, tempContent, 'utf8');
    
    try {
        const data = require(tempFile);
        if (!data.code || !data.explanations || data.explanations.length === 0) {
            return 0;
        }
        
        const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
        const cppLines = cleanCode.split('\n');
        const numLines = cppLines.length;
        
        let hasOob = false;
        let maxLine = 0;
        let minLine = 999999;
        data.explanations.forEach(step => {
            if (step.line > numLines || step.line <= 0) {
                hasOob = true;
            }
            if (step.line > maxLine) maxLine = step.line;
            if (step.line < minLine) minLine = step.line;
        });
        
        const expectedShift = H - 1;
        
        // 1. If any step is out of bounds, it must be unshifted.
        if (hasOob) {
            return expectedShift;
        }
        
        // 2. Identify function/main declaration lines to check alignment
        const fileName = path.basename(filePath, '.js');
        const variants = [
            fileName,
            fileName.toLowerCase(),
            fileName.charAt(0).toLowerCase() + fileName.slice(1),
            fileName.replace(/_/g, ''),
            fileName.toLowerCase().replace(/_/g, '')
        ];
        if (fileName.includes('_')) {
            const camel = fileName.split('_').map((w, idx) => idx === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join('');
            variants.push(camel);
        }
        
        let declLine = -1;
        // Prioritize int main() or void main() since explanations start in main if present
        for (let i = 0; i < cppLines.length; i++) {
            if (cppLines[i].includes('int main(') || cppLines[i].includes('void main(') || cppLines[i].includes('int main (') || cppLines[i].includes('void main (')) {
                declLine = i + 1;
                break;
            }
        }
        
        if (declLine === -1) {
            // Fallback to function declaration
            for (let i = 0; i < cppLines.length; i++) {
                const lineText = cppLines[i];
                const isDecl = variants.some(v => {
                    return lineText.includes(v + '(') || lineText.includes(v + 'Algorithm(');
                });
                if (isDecl && !lineText.includes(';') && !lineText.trim().startsWith('//')) {
                    declLine = i + 1;
                    break;
                }
            }
        }
        
        if (declLine !== -1 && data.explanations.length > 0) {
            const firstLine = data.explanations[0].line;
            const distShifted = Math.abs(firstLine - declLine);
            const distUnshifted = Math.abs(firstLine - (declLine + expectedShift));
            
            if (distUnshifted < distShifted) {
                return expectedShift;
            } else {
                return 0;
            }
        }
        
        if (minLine >= expectedShift && maxLine > numLines - expectedShift) {
            return expectedShift;
        }
        
        return 0;
    } catch (err) {
        return 0;
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
}

const files = getJsFiles(path.resolve(__dirname, '../../dashboard/src/data/categories'));

files.forEach(filePath => {
    const shift = detectShift(filePath);
    if (shift > 0) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
        content += '\n;module.exports = data;';
        
        const tempFile = path.join(__dirname, 'temp_dry_run_preview.cjs');
        fs.writeFileSync(tempFile, content, 'utf8');
        
        try {
            const data = require(tempFile);
            const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
            const cppLines = cleanCode.split('\n');
            
            console.log(`\n========================================`);
            console.log(`File: ${path.relative(path.resolve(__dirname, '../../dashboard/src/data/categories'), filePath)}`);
            console.log(`Best Offset: ${shift}`);
            
            let oobCount = 0;
            data.explanations.forEach(step => {
                if (step.line > cppLines.length || step.line <= 0) oobCount++;
            });
            console.log(`Original Out-of-Bounds Steps: ${oobCount} / ${data.explanations.length}`);
            
            console.log(`Preview of shifted steps:`);
            data.explanations.slice(0, 3).forEach((step, idx) => {
                const oldLine = step.line;
                const newLine = step.line - shift;
                const oldContent = cppLines[oldLine - 1] || 'OUT OF BOUNDS';
                const newContent = cppLines[newLine - 1] || 'OUT OF BOUNDS';
                console.log(`  Step ${idx}: "${step.text.substring(0, 40)}..."`);
                console.log(`    Old Line ${oldLine}: ${oldContent.trim()}`);
                console.log(`    New Line ${newLine}: ${newContent.trim()}`);
            });
        } catch (err) {
            console.log(`Error parsing ${filePath}: ${err.message}`);
        } finally {
            if (fs.existsSync(tempFile)) {
                fs.unlinkSync(tempFile);
            }
            delete require.cache[require.resolve(tempFile)];
        }
    }
});
