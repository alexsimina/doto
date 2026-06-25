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

const basePath = path.resolve(__dirname, '../dashboard/src/data/categories');
const files = getJsFiles(basePath);

let offsetFilesCount = 0;
const categorySummary = {};

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_check_offsets.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    
    try {
        const data = require(tempFile);
        if (!data.code || !data.explanations || data.explanations.length === 0) return;
        
        const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
        const cppLines = cleanCode.split('\n');
        
        let bestOffset = 0;
        let maxScore = -1;
        
        for (let S = 0; S <= 50; S++) {
            let score = 0;
            let outOfBounds = false;
            
            data.explanations.forEach(step => {
                const lineNum = step.line - S;
                if (lineNum < 1 || lineNum > cppLines.length) {
                    outOfBounds = true;
                    return;
                }
                
                const cppLine = cppLines[lineNum - 1].toLowerCase();
                const text = step.text.toLowerCase();
                
                if ((text.includes('vizitat') || text.includes('visited')) && (cppLine.includes('visited') || cppLine.includes('vis['))) score += 2;
                if ((text.includes('coadă') || text.includes('coada') || text.includes('queue')) && (cppLine.includes('queue') || cppLine.includes('q.'))) score += 2;
                if ((text.includes('for') || text.includes('buclă') || text.includes('bucla') || text.includes('parcurgem') || text.includes('iterăm')) && (cppLine.includes('for') || cppLine.includes('while'))) score += 2;
                if ((text.includes('if') || text.includes('verificăm') || text.includes('verificam') || text.includes('condiția') || text.includes('conditia')) && (cppLine.includes('if') || cppLine.includes('else'))) score += 2;
                if ((text.includes('afişăm') || text.includes('afisam') || text.includes('cout')) && cppLine.includes('cout')) score += 2;
                if ((text.includes('return') || text.includes('returnează') || text.includes('returneaza')) && cppLine.includes('return')) score += 2;
                if ((text.includes('sort') || text.includes('sortăm') || text.includes('sortam')) && cppLine.includes('sort')) score += 2;
                if (text.includes('main') && cppLine.includes('main')) score += 2;
                
                const words = text.split(/\s+/).filter(w => w.length > 4);
                words.forEach(w => {
                    if (cppLine.includes(w)) score += 0.5;
                });
            });
            
            if (!outOfBounds && score > maxScore) {
                maxScore = score;
                bestOffset = S;
            }
        }
        
        if (bestOffset > 0) {
            offsetFilesCount++;
            const relativePath = path.relative(basePath, filePath);
            const parts = relativePath.split(path.sep);
            const category = parts.length > 1 ? parts.slice(0, parts.length - 1).join('/') : 'Root';
            
            if (!categorySummary[category]) {
                categorySummary[category] = [];
            }
            categorySummary[category].push({ file: path.basename(filePath), bestOffset, score: maxScore });
        }
        
    } catch (err) {
        // Skip files that fail parsing here since validate_syntax already checks them
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});

console.log("=============================================");
console.log(`Offset Check Summary: ${offsetFilesCount} file(s) have pending line offsets.\n`);

if (offsetFilesCount > 0) {
    console.log("Affected Categories requiring /BadDebuggerLines repair:");
    for (const [cat, items] of Object.entries(categorySummary)) {
        console.log(`📁 ${cat}:`);
        items.forEach(item => {
            console.log(`   📄 ${item.file} (Detected offset: +${item.bestOffset}, heuristic score: ${item.score})`);
        });
    }
    process.exit(1);
} else {
    console.log("✓ No pending line offsets detected!");
    process.exit(0);
}
