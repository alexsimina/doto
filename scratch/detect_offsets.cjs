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

const files = getJsFiles(path.resolve(__dirname, '../dashboard/src/data/categories'));

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_detect.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const data = require(tempFile);
        if (data.code && data.explanations && data.explanations.length > 0) {
            const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
            const lines = cleanCode.split('\n');
            
            // Find function declaration line
            const fileName = path.basename(filePath, '.js');
            // Try different variants of the filename
            const variants = [
                fileName,
                fileName.toLowerCase(),
                fileName.charAt(0).toLowerCase() + fileName.slice(1), // camelCase
                fileName.replace(/_/g, ''), // remove underscores
                fileName.toLowerCase().replace(/_/g, '')
            ];
            
            // For Bellman_Ford -> bellmanFord
            if (fileName.includes('_')) {
                const camel = fileName.split('_').map((w, idx) => idx === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join('');
                variants.push(camel);
            }
            
            let declLine = -1;
            for (let i = 0; i < lines.length; i++) {
                const lineText = lines[i];
                // Check if it's a function declaration
                const isDecl = variants.some(v => {
                    return lineText.includes(v + '(') || lineText.includes(v + 'Algorithm(');
                });
                if (isDecl && !lineText.includes(';') && !lineText.trim().startsWith('//')) {
                    declLine = i + 1;
                    break;
                }
            }
            
            if (declLine !== -1) {
                // Find explanation step pointing to declaration or near it
                // Usually the first step that mentions the function
                let firstStep = data.explanations.find(s => {
                    const txt = s.text.toLowerCase();
                    return txt.includes('începem') || txt.includes('intram') || txt.includes('intrăm') || txt.includes('apelăm') || txt.includes('apelam') || txt.includes('pornim');
                });
                
                if (!firstStep && data.explanations.length > 0) {
                    firstStep = data.explanations[0];
                }
                
                if (firstStep) {
                    const explLine = firstStep.line;
                    const diff = explLine - declLine;
                    console.log(`File: ${path.basename(filePath)} | Function decl line: ${declLine} | Expl line: ${explLine} | Diff: ${diff}`);
                }
            } else {
                // Try main
                let mainLine = -1;
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes('int main(') || lines[i].includes('void main(')) {
                        mainLine = i + 1;
                        break;
                    }
                }
                if (mainLine !== -1 && data.explanations.length > 0) {
                    const firstStep = data.explanations[0];
                    const explLine = firstStep.line;
                    const diff = explLine - mainLine;
                    console.log(`File: ${path.basename(filePath)} (main) | main line: ${mainLine} | Expl line: ${explLine} | Diff: ${diff}`);
                }
            }
        }
    } catch (err) {
        // Ignore
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});
