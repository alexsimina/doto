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
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed backslashes/braces in: ${path.relative(categoriesDir, file)}`);
        modifiedCount++;
    }
}

console.log(`\nSuccessfully fixed ${modifiedCount} files!`);
