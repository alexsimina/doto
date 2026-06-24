const fs = require('fs');
const path = require('path');

// Helper to recursively find JS files
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
    const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check raw file for single backslashes in double-quoted or single-quoted strings that look like LaTeX
    // e.g., \to, \cdot, \pi, \mathcal, \le, \ge, \log, \max
    // In a JS string, if they wrote "\to", it is stored in the file as \to (one backslash).
    // Let's search for these patterns in the file content.
    // We can extract all double-quoted and single-quoted string literals using a simple regex or parser.
    
    // Let's find occurrences of backslash followed by a LaTeX command keyword (like to, cdot, pi, mathcal, le, ge, log, max, theta, deg, to, sum, infty, left, right, dots)
    // but NOT preceded by another backslash.
    // e.g. (?<!\\)\\(to|cdot|pi|mathcal|le|ge|log|max|min|theta|deg|sum|infty|left|right|dots|alpha|beta|gamma|omega|Delta|phi)
    // Wait, JS doesn't always support all lookbehinds in old engines, but V8 does. Let's write a robust check.
    
    const errors = [];
    
    // 1. Check for mismatched '$' (odd number of '$' on a single line or in text fields)
    // Let's load the data object by requiring the file dynamically (similar to validate_syntax)
    let tempContent = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    tempContent += '\n;module.exports = data;';
    const tempFile = path.join(__dirname, 'temp_check_latex.cjs');
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
                
                // Check if inline math contains newlines
                // e.g. $ ... \n ... $
                // Let's find all pairs of $
                let pos = 0;
                while (true) {
                    const start = val.indexOf('$', pos);
                    if (start === -1) break;
                    // Check if it's double dollar $$
                    let isDouble = false;
                    if (val[start + 1] === '$') {
                        isDouble = true;
                    }
                    
                    const end = val.indexOf('$', isDouble ? start + 2 : start + 1);
                    if (end === -1) {
                        errors.push({
                            type: 'unclosed-math',
                            message: `Field '${field}' has unclosed math delimiter starting at index ${start}.`
                        });
                        break;
                    }
                    
                    if (isDouble && val[end + 1] === '$') {
                        // Double dollar closed
                        pos = end + 2;
                    } else if (!isDouble) {
                        // Single dollar closed
                        const mathText = val.substring(start + 1, end);
                        if (mathText.includes('\n')) {
                            errors.push({
                                type: 'newline-in-inline-math',
                                message: `Field '${field}' has newline inside inline math: "$${mathText.replace(/\n/g, '\\n')}$"`
                            });
                        }
                        pos = end + 1;
                    } else {
                        // Mismatched single/double
                        pos = end + 1;
                    }
                }
                
                // Let's also look for common LaTeX commands that were parsed as plain text without a backslash
                // e.g., "mathcal", "cdot", "to" (when surrounded by spaces or math chars), "le", "ge"
                // But only inside $...$ blocks!
                pos = 0;
                while (true) {
                    const start = val.indexOf('$', pos);
                    if (start === -1) break;
                    let isDouble = false;
                    if (val[start + 1] === '$') isDouble = true;
                    
                    const end = val.indexOf('$', isDouble ? start + 2 : start + 1);
                    if (end === -1) break;
                    
                    const mathText = val.substring(isDouble ? start + 2 : start + 1, end);
                    
                    // Look for words that are LaTeX commands but lack backslash
                    // e.g., "mathcal", "cdot", "to", "le", "ge", "log", "max", "min", "infty", "sum", "deg"
                    // We check with word boundaries, e.g. \b(mathcal|cdot|to|le|ge)\b
                    // But wait, "to" is a common Romanian word, so we have to be careful. However, inside math mode ($...$), "to" is almost never a Romanian word because Romanian words don't belong in math mode (except maybe \text{...}).
                    // Let's check for these keywords:
                    const keywords = ['mathcal', 'cdot', 'to', 'le', 'ge', 'log', 'max', 'min', 'infty', 'sum', 'deg', 'pi', 'theta', 'alpha', 'beta', 'gamma', 'omega', 'Delta', 'phi', 'cup', 'cap', 'subset', 'subseteq', 'in', 'notin', 'times', 'div', 'pm', 'mp'];
                    for (const kw of keywords) {
                        const regex = new RegExp(`(?<!\\\\)\\b${kw}\\b`);
                        if (regex.test(mathText)) {
                            // Let's make sure it's not inside a \text{...} or similar
                            // We can do a basic check
                            errors.push({
                                type: 'missing-backslash',
                                message: `Field '${field}' has '${kw}' inside math block "$${mathText}$" without a backslash.`
                            });
                        }
                    }
                    
                    pos = isDouble ? end + 2 : end + 1;
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
    
    // 2. Scan raw file content for escape sequences that got swallowed.
    // In the raw JS file, if they have: "u \to v", the character sequence is '\', 't', 'o'.
    // In JS, "\t" is parsed as tab.
    // If they have: "O(2^{N/2} \cdot N)", the character sequence is '\', 'c', 'd', 'o', 't'.
    // "\c" is parsed as 'c'.
    // Let's look for:
    // a) `\to` (which is represented in the file as `\to`)
    // Wait, in the JS source code, how is a string literal defined?
    // It can start with `"` or `'` or `` ` ``.
    // Let's find all string literals in the file.
    // A regex for double quoted string: /"([^"\\]|\\.)*"/g
    // A regex for single quoted string: /'([^'\\]|\\.)*'/g
    // A regex for template literal: /`([^`\\]|\\.)*`/g
    // Let's run these regexes on the file content and check their matched strings.
    const stringRegexes = [
        /"([^"\\]|\\.)*"/g,
        /'([^'\\]|\\.)*'/g,
        /`([^`\\]|\\.)*`/g
    ];
    
    // We can also just search the raw text for suspicious backslashes.
    // For example, if we see a backslash followed by a letter (like \t, \c, \m, \p, \l, \g, \s, \i, \d)
    // which is not a standard JS escape sequence (like \n, \r, \t, \f, \b, \v, \0, \u, \x, \", \', \\, \`).
    // Actually, `\t` IS a standard JS escape sequence (tab), but if it's followed by `o` (making it `\to`), it is highly likely a typo for `\\to`.
    // Similarly, `\n` is a newline, but `\nu` could be a typo for `\\nu` (the Greek letter).
    // Let's find all `\` in the file.
    let index = 0;
    while ((index = content.indexOf('\\', index)) !== -1) {
        // Look at the character after the backslash
        const nextChar = content[index + 1];
        const wordMatch = content.slice(index + 1).match(/^[a-zA-Z]+/);
        if (wordMatch) {
            const word = wordMatch[0];
            // Check if this word is a common LaTeX command
            const latexCommands = ['to', 'cdot', 'pi', 'mathcal', 'le', 'ge', 'log', 'max', 'min', 'theta', 'deg', 'sum', 'infty', 'left', 'right', 'dots', 'alpha', 'beta', 'gamma', 'omega', 'Delta', 'phi', 'cup', 'cap', 'subset', 'subseteq', 'in', 'notin', 'times', 'div', 'pm', 'mp'];
            if (latexCommands.includes(word)) {
                // Wait! Is it preceded by another backslash?
                if (index > 0 && content[index - 1] === '\\') {
                    // It is escaped, i.e. \\to or \\cdot. This is CORRECT!
                } else {
                    // It is NOT escaped! i.e. \to or \cdot. This is an ERROR!
                    // Let's find the line number
                    const lineNum = content.slice(0, index).split('\n').length;
                    errors.push({
                        type: 'unescaped-backslash',
                        message: `Line ${lineNum}: Found unescaped LaTeX command '\\${word}' in raw source code.`
                    });
                }
            }
        }
        index++;
    }
    
    return errors;
}

const categoriesDir = path.resolve(__dirname, '../../dashboard/src/data/categories');
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

console.log(`\nAnalysis complete. Found ${totalErrors} potential LaTeX formatting errors.`);
