const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories';

function processFile(p) {
    let content = fs.readFileSync(p, 'utf8');
    let changed = false;

    // We are looking for code: `...` blocks that have \ at the end of lines
    // We can just match the entire code: `...` block
    const regex = /code:\s*`([\s\S]*?)`/g;
    
    content = content.replace(regex, (match, innerStr) => {
        // If innerStr contains \ followed by a newline, it's a line continuation
        // Note: Windows newlines are \r\n, Unix are \n.
        // We match a backslash at the end of the line: \\\r?\n
        if (/\\\r?\n/.test(innerStr)) {
            changed = true;
            console.log('Fixed line continuations in:', p);
            
            // Remove the backslash at the end of the line, keeping the newline
            let fixedStr = innerStr.replace(/\\\r?\n/g, '\n');
            
            return 'code: `' + fixedStr + '`';
        }
        
        // Also check if there are literal "\n" characters left?
        if (innerStr.includes('\\n')) {
             changed = true;
             let fixedStr = innerStr.replace(/\\n/g, '\n');
             return 'code: `' + fixedStr + '`';
        }
        
        return match;
    });

    // Also let's catch any "code": "..." strings that might still exist and have line continuations
    const regex2 = /"code":\s*"((?:[^"\\]|\\.)*)"/g;
    content = content.replace(regex2, (match, innerStr) => {
        if (/\\\r?\n/.test(innerStr) || innerStr.includes('\\n')) {
            changed = true;
            console.log('Fixed single line code (string) in:', p);
            
            let unescaped = innerStr
                .replace(/\\\r?\n/g, '\n')
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '"')
                .replace(/\\\\/g, '\\');
                
            return 'code: `\n' + unescaped + '\n`';
        }
        return match;
    });

    if (changed) {
        fs.writeFileSync(p, content, 'utf8');
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
