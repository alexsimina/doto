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

function getRawEnvironmentRanges(mathBlockRaw) {
    const ranges = [];
    const beginRegex = /\\+begin\{([a-zA-Z*]+)\}/g;
    let match;
    while ((match = beginRegex.exec(mathBlockRaw)) !== null) {
        const envName = match[1];
        const startIndex = match.index;
        const endRegex = new RegExp(`\\\\+end\\{${envName}\\}`, 'g');
        endRegex.lastIndex = beginRegex.lastIndex;
        const endMatch = endRegex.exec(mathBlockRaw);
        if (endMatch) {
            ranges.push({ start: startIndex, end: endMatch.index + endMatch[0].length });
        }
    }
    return ranges;
}

function fixAmpersandsInRawMathBlock(mathBlockRaw) {
    const envRanges = getRawEnvironmentRanges(mathBlockRaw);
    let result = '';
    let i = 0;
    while (i < mathBlockRaw.length) {
        const char = mathBlockRaw[i];
        if (char === '&') {
            const isEscapedCorrectly = i >= 2 && mathBlockRaw[i - 1] === '\\' && mathBlockRaw[i - 2] === '\\';
            if (!isEscapedCorrectly) {
                const inEnv = envRanges.some(r => i >= r.start && i < r.end);
                if (!inEnv) {
                    if (i >= 1 && mathBlockRaw[i - 1] === '\\') {
                        result += '\\&';
                    } else {
                        result += '\\\\&';
                    }
                    i++;
                    continue;
                }
            }
        }
        result += char;
        i++;
    }
    return result;
}

function fixAmpersandsInStringLiteral(str, quote) {
    let result = str[0]; // opening quote
    let i = 1;
    const len = str.length - 1; // exclude closing quote
    
    while (i < len) {
        if (str[i] === '$' && str[i + 1] === '$') {
            const start = i;
            let end = -1;
            let j = i + 2;
            while (j < len - 1) {
                if (str[j] === '\\') {
                    j += 2;
                } else if (str[j] === '$' && str[j + 1] === '$') {
                    end = j;
                    break;
                } else {
                    j++;
                }
            }
            if (end !== -1) {
                const mathBlockRaw = str.slice(start, end + 2);
                const fixedMathBlock = fixAmpersandsInRawMathBlock(mathBlockRaw);
                result += fixedMathBlock;
                i = end + 2;
            } else {
                result += str[i];
                i++;
            }
        } else if (str[i] === '$') {
            const start = i;
            let end = -1;
            let j = i + 1;
            while (j < len) {
                if (str[j] === '\\') {
                    j += 2;
                } else if (str[j] === '$') {
                    end = j;
                    break;
                } else {
                    j++;
                }
            }
            if (end !== -1) {
                const mathBlockRaw = str.slice(start, end + 1);
                const fixedMathBlock = fixAmpersandsInRawMathBlock(mathBlockRaw);
                result += fixedMathBlock;
                i = end + 1;
            } else {
                result += str[i];
                i++;
            }
        } else {
            result += str[i];
            i++;
        }
    }
    result += str[str.length - 1]; // closing quote
    return result;
}

function fixAmpersandsInFileContent(content) {
    let result = '';
    let i = 0;
    while (i < content.length) {
        const char = content[i];
        if (char === '"' || char === "'" || char === '`') {
            const quote = char;
            let strContent = quote;
            i++;
            while (i < content.length) {
                const c = content[i];
                if (c === '\\') {
                    strContent += '\\' + content[i + 1];
                    i += 2;
                } else if (c === quote) {
                    strContent += quote;
                    i++;
                    break;
                } else {
                    strContent += c;
                    i++;
                }
            }
            
            const fixedStrContent = fixAmpersandsInStringLiteral(strContent, quote);
            result += fixedStrContent;
        } else {
            result += char;
            i++;
        }
    }
    return result;
}

const categoriesDir = path.resolve(__dirname, '../../dashboard/src/data/categories');
const files = getJsFiles(categoriesDir);

console.log(`Scanning ${files.length} files for 4-backslash escaping...`);

let modifiedCount = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Fix over-escaped backslashes (convert 4-backslash to 2-backslash)
    content = content.replace(/\\\\\\\\/g, '\\\\');
    
    // Fix unescaped double braces inside LaTeX strings (convert \\{\\{ to \\{ \\{ and \\}\\} to \\} \\})
    content = content.replace(/\\\\\\\\{\\\\\\\\{/g, '\\\\{ \\\\{');
    content = content.replace(/\\\\\\\\}\\\\\\\\}/g, '\\\\} \\\\}');
    
    // Auto-double single backslashes in front of common LaTeX commands and braces to prevent escaping bugs (e.g. \neq -> \\neq)
    content = content.replace(/(?<!\\)\\(subseteq|neq|in|mid|deg|mathcal|sum|frac|cdot|overline|alpha|beta|le|ge|times|cap|cup|vee|wedge|neg|to|gets|lbar|rbar|left|right|lfloor|rfloor|log|min|max|infty|{|}|\$)/g, '\\\\$1');
    
    // Fix unescaped ampersands inside LaTeX/math blocks
    content = fixAmpersandsInFileContent(content);
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed backslashes/braces in: ${path.relative(categoriesDir, file)}`);
        modifiedCount++;
    }
}

console.log(`\nSuccessfully fixed ${modifiedCount} files!`);
