const fs = require('fs');
const path = require('path');

const targets = [
    { file: 'dashboard/src/data/categories/Core_Algorithms/Alg/Majority_Element.js', start: 6 },
    { file: 'dashboard/src/data/categories/Graph_Theory/Graphs/Flood_Fill.js', start: 25 },
    { file: 'dashboard/src/data/categories/Graph_Theory/Graphs/Lee.js', start: 25 },
    { file: 'dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Dial.js', start: 25 },
    { file: 'dashboard/src/data/categories/Graph_Theory/Graphs/Tree_Diameter.js', start: 28 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Geometry/Convex_Hull.js', start: 29 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Geometry/Sweep_Line.js', start: 26 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Math/Big_Integers.js', start: 24 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Math/Euler_Phi.js', start: 25 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Math/Fast_Exponentiation.js', start: 22 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Math/Matrix_Exponentiation.js', start: 28 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Math/Mobius.js', start: 30 },
    { file: 'dashboard/src/data/categories/Math_Geometry/Math/PIE.js', start: 26 }
];

targets.forEach(t => {
    const fullPath = path.resolve(__dirname, '..', t.file);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_check_shift.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const data = require(tempFile);
        let lessThanStart = 0;
        let totalSteps = data.explanations.length;
        data.explanations.forEach(step => {
            if (step.line < t.start) {
                lessThanStart++;
            }
        });
        console.log(`${path.basename(t.file)}: start=${t.start}, total=${totalSteps}, lessThanStart=${lessThanStart}`);
    } catch (err) {
        console.log(`Error in ${t.file}: ${err.message}`);
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});
