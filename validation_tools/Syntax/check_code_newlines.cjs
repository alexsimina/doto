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

const basePath = path.resolve(__dirname, '../../dashboard/src/data/categories');
const files = getJsFiles(basePath);

console.log(`Checking ${files.length} category files for correct C++ code line breaks...\n`);
let errorCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, `temp_code_newlines_${path.basename(filePath)}.cjs`);
    fs.writeFileSync(tempFile, content, 'utf8');
    
    try {
        const data = require(tempFile);
        if (data && data.code) {
            const hasRealNewlines = data.code.includes('\n');
            const hasEscapedNewlines = data.code.includes('\\n');
            
            if (!hasRealNewlines && hasEscapedNewlines) {
                errorCount++;
                console.error(`❌ Error in ${path.relative(basePath, filePath)}:`);
                console.error(`   C++ code block is compiled on a single line because newlines are escaped as literal '\\n'.`);
                console.error(`   It contains no actual line-break characters but has literal '\\n' sequences.\n`);
            }
        }
    } catch (err) {
        // Skip files that fail parsing here
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});

console.log("=========================================");
if (errorCount > 0) {
    console.error(`❌ Failure: ${errorCount} file(s) contain single-line C++ code blocks with escaped newlines!`);
    console.error("Please ensure code blocks use raw newlines so the debugger can split them correctly.");
    console.error("Run 'node validation_tools/Syntax/fix_code_newlines.cjs' to automatically convert them.");
    process.exit(1);
} else {
    console.log("✓ All C++ code blocks have correct newline formatting!");
    process.exit(0);
}
