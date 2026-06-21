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

function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const errors = [];
    const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
    
    // 1. Scan raw file content for unescaped backslashes followed by words
    let index = 0;
    while ((index = content.indexOf('\\', index)) !== -1) {
        // Check if it is preceded by another backslash
        if (index > 0 && content[index - 1] === '\\') {
            index++;
            continue; // Escaped backslash, so it is correct
        }
        
        // Extract the word after the backslash
        const match = content.slice(index + 1).match(/^[a-zA-Z]+/);
        if (match) {
            const word = match[0];
            // Standard single-character escape sequences in JS
            const standardEscapes = ['n', 't', 'r', 'b', 'f', 'v', 'u', 'x'];
            
            if (!standardEscapes.includes(word) || word.length > 1) {
                // Find line number
                const lineNum = content.slice(0, index).split('\n').length;
                errors.push({
                    type: 'unescaped-backslash',
                    line: lineNum,
                    message: `Line ${lineNum}: Found unescaped LaTeX or escape command '\\${word}' in raw source code.`
                });
            }
        }
        index++;
    }
    
    // 2. Count dollar signs to ensure they are balanced
    // We parse the file by replacing export and requiring it
    let tempContent = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    tempContent += '\n;module.exports = data;';
    const tempFile = path.join(__dirname, 'temp_check_latex_all.cjs');
    fs.writeFileSync(tempFile, tempContent, 'utf8');
    
    try {
        const data = require(tempFile);
        const textFields = ['presentation', 'complexity', 'variations', 'applications'];
        
        for (const field of textFields) {
            if (data[field]) {
                const val = data[field];
                
                // Count dollar signs
                const dollars = (val.match(/\$/g) || []).length;
                if (dollars % 2 !== 0) {
                    errors.push({
                        type: 'mismatched-dollars',
                        message: `Field '${field}' has an odd number of '$' symbols (${dollars}).`
                    });
                }
                
                // Check for newlines in inline math blocks $ ... $
                let pos = 0;
                while (true) {
                    const start = val.indexOf('$', pos);
                    if (start === -1) break;
                    let isDouble = val[start + 1] === '$';
                    const end = val.indexOf('$', isDouble ? start + 2 : start + 1);
                    if (end === -1) {
                        errors.push({
                            type: 'unclosed-math',
                            message: `Field '${field}' has unclosed math delimiter starting at index ${start}.`
                        });
                        break;
                    }
                    
                    if (!isDouble) {
                        const mathText = val.substring(start + 1, end);
                        if (mathText.includes('\n')) {
                            errors.push({
                                type: 'newline-in-inline-math',
                                message: `Field '${field}' has newline inside inline math: "$${mathText.replace(/\n/g, '\\n')}$"`
                            });
                        }
                        pos = end + 1;
                    } else {
                        pos = end + 2;
                    }
                }
            }
        }
    } catch (err) {
        errors.push({
            type: 'compile-error',
            message: `Could not parse file: ${err.message}`
        });
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
    
    return errors;
}

const categoriesDir = path.resolve(__dirname, '../dashboard/src/data/categories');
const files = getJsFiles(categoriesDir);
console.log(`Analyzing ${files.length} files...\n`);

let totalErrors = 0;
for (const file of files) {
    const fileErrors = analyzeFile(file);
    if (fileErrors.length > 0) {
        console.log(`\nFile: ${path.relative(path.resolve(__dirname, '..'), file)}`);
        for (const err of fileErrors) {
            console.log(`  - [${err.type}] ${err.message}`);
            totalErrors++;
        }
    }
}

console.log(`\nAnalysis complete. Found ${totalErrors} potential LaTeX/math formatting errors.`);
