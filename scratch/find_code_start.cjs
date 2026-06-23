const fs = require('fs');
const path = require('path');

const targetFiles = [
    'dashboard/src/data/categories/Core_Algorithms/Alg/Majority_Element.js',
    'dashboard/src/data/categories/Graph_Theory/Graphs/Flood_Fill.js',
    'dashboard/src/data/categories/Graph_Theory/Graphs/Lee.js',
    'dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Dial.js',
    'dashboard/src/data/categories/Graph_Theory/Graphs/Tree_Diameter.js',
    'dashboard/src/data/categories/Math_Geometry/Geometry/Convex_Hull.js',
    'dashboard/src/data/categories/Math_Geometry/Geometry/Sweep_Line.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Big_Integers.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Euler_Phi.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Fast_Exponentiation.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Matrix_Exponentiation.js',
    'dashboard/src/data/categories/Math_Geometry/Math/Mobius.js',
    'dashboard/src/data/categories/Math_Geometry/Math/PIE.js'
];

targetFiles.forEach(relPath => {
    const fullPath = path.resolve(__dirname, '..', relPath);
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${relPath}`);
        return;
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    let codeStartIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"code":') || lines[i].includes('code:')) {
            codeStartIdx = i;
            break;
        }
    }
    if (codeStartIdx !== -1) {
        // Find where the actual C++ code starts. Usually it is index + 1 (the next line has #include)
        // Let's print the line and the next 2 lines
        console.log(`\nFile: ${relPath}`);
        console.log(`  Line ${codeStartIdx + 1}: ${lines[codeStartIdx].trim()}`);
        console.log(`  Line ${codeStartIdx + 2}: ${lines[codeStartIdx + 1].trim()}`);
        console.log(`  Line ${codeStartIdx + 3}: ${lines[codeStartIdx + 2].trim()}`);
    } else {
        console.log(`❌ Could not find "code": in ${relPath}`);
    }
});
