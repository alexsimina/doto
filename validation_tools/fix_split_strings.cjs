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

let fixedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the code block. It usually looks like:
    // "code": `...` or code: `...`
    const codeBlockRegex = /("code"|code)\s*:\s*`([\s\S]*?)`/g;
    
    let modified = false;
    const newContent = content.replace(codeBlockRegex, (match, key, codeContent) => {
        let newCodeContent = codeContent;
        
        // Replace unescaped \n with \\n
        const unescapedN = /(?<!\\)\\n/g;
        if (unescapedN.test(newCodeContent)) {
            newCodeContent = newCodeContent.replace(unescapedN, '\\\\n');
            modified = true;
        }
        
        // Replace unescaped \t with \\t
        const unescapedT = /(?<!\\)\\t/g;
        if (unescapedT.test(newCodeContent)) {
            newCodeContent = newCodeContent.replace(unescapedT, '\\\\t');
            modified = true;
        }
        
        return `${key}: \`${newCodeContent}\``;
    });
    
    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Fixed unescaped newlines/tabs in: ${path.relative(basePath, filePath)}`);
        fixedCount++;
    }
});

console.log("=========================================");
if (fixedCount > 0) {
    console.log(`🎉 Successfully repaired ${fixedCount} file(s) with split C++ string literals!`);
} else {
    console.log("✓ No files required split string repairs.");
}
process.exit(0);
