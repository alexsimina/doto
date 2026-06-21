const fs = require('fs');
const path = require('path');

const filePath = path.resolve('dashboard/src/data/categories/Math_Geometry/Math/Advanced.js');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
content += '\n;module.exports = data;';
const tempFile = path.join(__dirname, 'temp_inspect_code.cjs');
fs.writeFileSync(tempFile, content, 'utf8');
try {
    const data = require(tempFile);
    console.log("=== CODE LINES ===");
    const lines = data.code.split('\n');
    lines.forEach((line, idx) => {
        console.log(`${idx + 1}: ${line}`);
    });
} catch (err) {
    console.error(err);
} finally {
    if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
    }
}
