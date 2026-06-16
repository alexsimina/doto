const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories';
let count = 0;

function processFile(p) {
    let content = fs.readFileSync(p, 'utf8');
    
    // find "text": "..."
    const regex = /"text"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let txt = match[1];
        if (txt.includes(';') && (txt.includes('int ') || txt.includes('for ') || txt.includes('while ') || txt.includes('if '))) {
             if (txt.includes('\\n') || txt.split(';').length > 2) {
                  console.log("FOUND CODE IN TEXT AT:", p);
                  console.log(txt);
                  count++;
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
if(count===0) console.log("None found inside text properties.");
