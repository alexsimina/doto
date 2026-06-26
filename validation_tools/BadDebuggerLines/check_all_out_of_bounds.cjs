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

let allOk = true;

console.log(`Checking ${files.length} category files for out-of-bounds steps...\n`);

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_check_bounds.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const data = require(tempFile);
        if (data.code && data.explanations) {
            const cleanCode = data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
            const lines = cleanCode.split('\n');
            const numLines = lines.length;
            
            const oobSteps = [];
            data.explanations.forEach((step, idx) => {
                if (step.line > numLines || step.line <= 0) {
                    oobSteps.push({ index: idx, line: step.line, text: step.text });
                }
            });
            
            const relPath = path.relative(categoriesDir, filePath);
            if (oobSteps.length > 0) {
                allOk = false;
                console.log(`❌ ${relPath}: ${oobSteps.length} step(s) out of bounds! (Code lines: ${numLines})`);
                oobSteps.forEach(s => {
                    console.log(`   - Step ${s.index} references line ${s.line} | "${s.text.substring(0, 75)}..."`);
                });
            } else {
                console.log(`✅ ${relPath}: OK (Code lines: ${numLines})`);
            }
        }
    } catch (err) {
        console.log(`⚠️ ${path.relative(categoriesDir, filePath)}: Loader error - ${err.message}`);
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});

if (!allOk) {
    console.log("\n✗ Mismatch found: Some files have out-of-bounds line numbers.");
    console.log("Suggestions to resolve this:");
    console.log("  - Run 'node validation_tools/BadDebuggerLines/fix_all_offsets.cjs' if files need systematic header offset shifts.");
    console.log("  - Run 'node validation_tools/fix_split_strings.cjs' if files have unescaped newlines (\\n) in C++ string literals.");
    console.log("  - Or manually inspect and correct the line numbers in the explanations arrays.");
    process.exit(1);
} else {
    console.log("\n✓ All files are clean and properly aligned!");
    process.exit(0);
}
