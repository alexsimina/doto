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

const files = getJsFiles(path.resolve(__dirname, '../dashboard/src/data/categories'));

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    // evaluate data object
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_check.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const data = require(tempFile);
        if (data.code && data.explanations && data.explanations.length > 0) {
            const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
            const lines = cleanCode.split('\n');
            
            console.log(`\n--- File: ${path.relative(path.resolve(__dirname, '..'), filePath)} ---`);
            // Check first 3 steps
            for (let i = 0; i < Math.min(3, data.explanations.length); i++) {
                const step = data.explanations[i];
                const lineNum = step.line;
                const codeLine = lines[lineNum - 1] || 'OUT OF BOUNDS';
                console.log(`  Step ${i}: line ${lineNum} -> "${codeLine.trim()}" | text: "${step.text.substring(0, 60)}..."`);
            }
        }
    } catch (err) {
        // Skip files that fail
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});
