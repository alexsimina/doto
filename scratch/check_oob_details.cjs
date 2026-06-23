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
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_check_oob.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const data = require(tempFile);
        if (data.code && data.explanations) {
            const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
            const lines = cleanCode.split('\n');
            const numLines = lines.length;
            
            data.explanations.forEach((step, idx) => {
                if (step.line > numLines || step.line <= 0) {
                    console.log(`❌ ${path.relative(path.resolve(__dirname, '..'), filePath)}: Step ${idx} has line ${step.line} (Code lines: ${numLines}) | "${step.text.substring(0, 60)}..."`);
                }
            });
        }
    } catch (err) {
        // Ignore
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});
