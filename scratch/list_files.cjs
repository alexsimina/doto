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
console.log(`Total JS files: ${files.length}`);
files.forEach(f => {
  console.log(path.relative(path.resolve(__dirname, '..'), f));
});
