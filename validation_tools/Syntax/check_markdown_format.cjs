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

function checkFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(path.resolve(__dirname, '../..'), filePath);
    
    // Convert to module format to inspect content safely
    let tempContent = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    tempContent += '\n;module.exports = data;';
    const tempFile = path.join(__dirname, `temp_check_${Math.random().toString(36).substring(7)}.cjs`);
    fs.writeFileSync(tempFile, tempContent, 'utf8');
    
    const errors = [];
    try {
        const data = require(tempFile);
        const textFields = ['presentation', 'complexity', 'variations', 'applications'];
        
        for (const field of textFields) {
            if (data[field]) {
                const textVal = data[field];
                if (textVal.includes('####')) {
                    errors.push(`Field '${field}' contains header level 4 (####), which is unsupported by formatText.`);
                }
                if (/\|(\s*:?-+:?\s*\|)+/.test(textVal)) {
                    errors.push(`Field '${field}' contains markdown table separator (using '|'), which is unsupported by the custom dashboard parser.`);
                }
            }
        }
    } catch (err) {
        errors.push(`Compilation error: ${err.message}`);
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        const cachePath = require.resolve(tempFile);
        if (require.cache[cachePath]) {
            delete require.cache[cachePath];
        }
    }
    
    return errors;
}

const categoriesDir = path.resolve(__dirname, '../../dashboard/src/data/categories');
const files = getJsFiles(categoriesDir);
console.log(`Checking ${files.length} category files for unsupported markdown elements...\n`);

let totalIssues = 0;
for (const file of files) {
    const issues = checkFile(file);
    if (issues.length > 0) {
        console.log(`✗ ${path.relative(path.resolve(__dirname, '../..'), file)}:`);
        for (const issue of issues) {
            console.log(`  - ${issue}`);
            totalIssues++;
        }
    }
}

console.log(`\nCheck complete. Found ${totalIssues} markdown formatting issues.`);
if (totalIssues > 0) {
    console.log("Run 'node validation_tools/Syntax/fix_markdown_format.cjs' to automatically repair these issues.");
    process.exit(1);
} else {
    console.log("✓ No formatting issues found!");
    process.exit(0);
}
