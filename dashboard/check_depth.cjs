const fs = require('fs');
const lines = fs.readFileSync('temp_eval.js', 'utf8').split('\n');
let depth = 0;
let inString = false;
let inBacktick = false;

for(let i=0; i<lines.length; i++) {
    let line = lines[i];
    for(let j=0; j<line.length; j++) {
        let c = line[j];
        if(c === '`') inBacktick = !inBacktick;
        if(c === '"' && line[j-1] !== '\\' && !inBacktick) inString = !inString;
        if(!inString && !inBacktick) {
            if(c === '{') depth++;
            if(c === '}') depth--;
        }
    }
    if(line.includes('"explanations"') || line.includes('"problems"') || line.match(/^\s*"[A-Za-z0-9_/-]+":\s*\{/)) {
        console.log('Line ' + (i+1) + ': depth ' + depth + ' -> ' + line.trim());
    }
}
console.log('Final depth:', depth);
