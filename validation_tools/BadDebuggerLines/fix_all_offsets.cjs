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
        if (lines[i].includes('code: `') || lines[i].includes('"code": `')) {
            H = i + 2; // Line after 'code: `'
            break;
        }
    }
    
    if (H === -1) return 0;
    
    // Temporarily require the data object to analyze line boundaries
    let tempContent = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    tempContent += '\n;module.exports = data;';
    const tempFile = path.join(__dirname, 'temp_detect_auto.cjs');
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

const basePath = path.resolve(__dirname, '../../dashboard/src/data/categories');

let files = process.argv.slice(2);
if (files.length === 0) {
    files = getJsFiles(basePath);
} else {
    files = files.map(f => path.resolve(f));
}

console.log(`Scanning ${files.length} file(s) for offset shifts...\n`);
let shiftedCount = 0;

for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        continue;
    }
    
    const shift = detectShift(filePath);
    if (shift > 0) {
        const relPath = path.relative(basePath, filePath);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Shift line numbers: "line": X or line: X
        content = content.replace(/("line"|line)\s*:\s*(\d+)/g, (match, p1, p2) => {
            const val = parseInt(p2);
            if (val > shift) {
                return `${p1}: ${val - shift}`;
            }
            return match;
        });
        
        // Shift lineNum comparisons in custom hooks
        const operators = ['===', '==', '>=', '<=', '>', '<'];
        operators.forEach(op => {
            const regex = new RegExp(`lineNum\\s*${op.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*(\\d+)`, 'g');
            content = content.replace(regex, (match, p1) => {
                const val = parseInt(p1);
                if (val > shift) {
                    return `lineNum ${op} ${val - shift}`;
                }
                return match;
            });
        });
        
        // Shift activeLine fallbacks: line: activeLine || X
        content = content.replace(/line\s*:\s*activeLine\s*\|\|\s*(\d+)/g, (match, p1) => {
            const val = parseInt(p1);
            if (val > shift) {
                return `line: activeLine || ${val - shift}`;
            }
            return match;
        });

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Successfully shifted ${relPath} by -${shift}`);
        shiftedCount++;
    }
}

if (shiftedCount === 0) {
    console.log(`✓ No files required shifting.`);
} else {
    console.log(`\nSuccessfully shifted ${shiftedCount} file(s).`);
}
