const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/User8/Desktop/doto/dashboard/src/data';

function processFile(p) {
    let content = fs.readFileSync(p, 'utf8');
    let changed = false;

    const regex = /"code":\s*"((?:[^"\\]|\\.)*)"/g;
    
    content = content.replace(regex, (match, innerStr) => {
        if (innerStr.includes('\\n')) {
            changed = true;
            console.log('Fixed single line code in:', p);
            
            let unescaped = innerStr
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
