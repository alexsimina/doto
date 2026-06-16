const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/User8/Desktop/doto/dashboard/src/data';

let found = false;

function processFile(p) {
    let content = fs.readFileSync(p, 'utf8');

    // We look for code blocks. They might be in template literals now `...` or still in strings "..."
    // Let's find any code block.
    // 1. Template literals: code: `...`
    // 2. Strings: code: "..." or "code": "..."
    
    // Let's match all properties named "code"
    const regex1 = /"code"\s*:\s*`([\s\S]*?)`/g;
    const regex2 = /code\s*:\s*`([\s\S]*?)`/g;
    const regex3 = /"code"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    const regex4 = /code\s*:\s*"((?:[^"\\]|\\.)*)"/g;

    const allMatches = [];
    let match;
    while ((match = regex1.exec(content)) !== null) allMatches.push({type: '`', val: match[1]});
    while ((match = regex2.exec(content)) !== null) allMatches.push({type: '`', val: match[1]});
    while ((match = regex3.exec(content)) !== null) allMatches.push({type: '"', val: match[1]});
    while ((match = regex4.exec(content)) !== null) allMatches.push({type: '"', val: match[1]});

    for (const m of allMatches) {
        let codeStr = m.val;
        // If it has NO newlines (neither \n nor literal string \n)
        if (!codeStr.includes('\n') && !codeStr.includes('\\n')) {
            // Check if it has multiple statements
            const semicolons = (codeStr.match(/;/g) || []).length;
            const braces = (codeStr.match(/\{/g) || []).length;
            if (semicolons > 1 || (braces > 0 && codeStr.length > 15)) {
                console.log('--- Found single-line code needing formatting in:', p);
                console.log(codeStr);
                found = true;
            }
        }
    }
}

function traverse(d) {
    fs.readdirSync(d).forEach(f => {
        const p = path.join(d, f);
        if (fs.statSync(p).isDirectory()) {
            traverse(p);
        } else if (p.endsWith('.js')) {
            processFile(p);
        }
    });
}

traverse(dir);
if (!found) console.log("No more single-line codes found.");
