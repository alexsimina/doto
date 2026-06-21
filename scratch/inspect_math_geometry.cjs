const fs = require('fs');
const path = require('path');

const files = [
    'dashboard/src/data/categories/Math_Geometry/Math/Advanced.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Combinatorics.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Game_Theory.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Linear_Algebra.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Number_Theory.js',
    'dashboard/src/data/categories/Math_Geometry/Geometry/Computational.js'
];

files.forEach(f => {
    const filePath = path.resolve(f);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    const tempFile = path.join(__dirname, 'temp_inspect.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const data = require(tempFile);
        console.log(`\n==================================================`);
        console.log(`FILE: ${f}`);
        console.log(`==================================================`);
        data.explanations.forEach((exp, idx) => {
            console.log(`Step ${idx} (Line ${exp.line}): ${exp.text.substring(0, 120)}`);
        });
    } catch (err) {
        console.error(`Error loading ${f}:`, err.message);
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});
