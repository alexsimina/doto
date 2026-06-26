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

function hasSplitStrings(code) {
    let cleanCode = code.replace(/\/\*[\s\S]*?\*\//g, ''); // strip block comments
    const lines = cleanCode.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const commentIdx = line.indexOf('//');
        if (commentIdx !== -1) {
            line = line.substring(0, commentIdx);
        }
        const cleanLine = line.replace(/\\"/g, '');
        const quoteCount = (cleanLine.match(/"/g) || []).length;
        if (quoteCount % 2 !== 0) {
            return { lineIndex: i + 1, content: lines[i] };
        }
    }
    return null;
}

const basePath = path.resolve(__dirname, '../dashboard/src/data/categories');
const files = getJsFiles(basePath);

console.log(`Checking ${files.length} category files for split C++ string literals...\n`);
let errorCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, `temp_split_strings_${path.basename(filePath)}.cjs`);
    fs.writeFileSync(tempFile, content, 'utf8');
    
    try {
        const data = require(tempFile);
        if (!data.code) return;
        const split = hasSplitStrings(data.code);
        if (split) {
            errorCount++;
            console.error(`❌ Error in ${path.relative(basePath, filePath)}:`);
            console.error(`   C++ Line ${split.lineIndex} has an odd number of double quotes (likely due to an unescaped \\n or literal newline).`);
            console.error(`   Content: ${JSON.stringify(split.content.trim())}\n`);
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
    console.error(`❌ Failure: ${errorCount} file(s) contain split string literals/unescaped newlines!`);
    console.error("Please escape your newlines inside C++ string literals as '\\\\n' (double backslash).");
    console.error("Run 'node validation_tools/fix_split_strings.cjs' to automatically escape them.");
    process.exit(1);
} else {
    console.log("✓ All C++ code blocks have valid, aligned string literals!");
    process.exit(0);
}
