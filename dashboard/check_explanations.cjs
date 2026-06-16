const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories';
let count = 0;

function processFile(p) {
    let content = fs.readFileSync(p, 'utf8');
    
    // the files export 'data' which we can parse by stripping "export const data = "
    let jsonStr = content.replace(/export\s+const\s+data\s*=\s*/, '');
    
    // Unfortunately jsonStr might contain code: `...` which is not valid JSON
    // but maybe we can just find occurrences of "code": "..." or similar inside explanations.
    
    let inExplanations = false;
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('"explanations"')) {
            inExplanations = true;
        }
        if (inExplanations) {
            if (line.includes('code: "') || line.includes('"code": "') || line.includes('code: \'') || line.includes('"code": \'')) {
                console.log("FOUND EXPLANATION WITH SINGLE LINE CODE IN", p, "line:", i+1);
                console.log(line);
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
if(count===0) console.log("None found inside explanations arrays.");
