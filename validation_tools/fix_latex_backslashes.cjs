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

const categoriesDir = path.resolve(__dirname, '../dashboard/src/data/categories');
const files = getJsFiles(categoriesDir);

console.log(`Scanning ${files.length} files for 4-backslash escaping...`);

let modifiedCount = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('\\\\')) { 
        const originalContent = content;
        content = content.replace(/\\\\\\\\/g, '\\\\');
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Fixed backslashes in: ${path.relative(categoriesDir, file)}`);
            modifiedCount++;
        }
    }
}

console.log(`\nSuccessfully fixed ${modifiedCount} files!`);
