const fs = require('fs');
const path = require('path');

const shifts = {
    'Core_Algorithms/Alg/Majority_Element.js': 5,
    'Graph_Theory/Graphs/Flood_Fill.js': 24,
    'Graph_Theory/Graphs/Lee.js': 24,
    'Graph_Theory/Graphs/Shortest_Path/Dial.js': 24,
    'Graph_Theory/Graphs/Tree_Diameter.js': 27,
    'Math_Geometry/Geometry/Convex_Hull.js': 28,
    'Math_Geometry/Geometry/Sweep_Line.js': 25,
    'Math_Geometry/Math/Big_Integers.js': 23,
    'Math_Geometry/Math/Euler_Phi.js': 24,
    'Math_Geometry/Math/Fast_Exponentiation.js': 21,
    'Math_Geometry/Math/Matrix_Exponentiation.js': 27,
    'Math_Geometry/Math/Mobius.js': 29,
    'Math_Geometry/Math/PIE.js': 25
};

Object.entries(shifts).forEach(([relPath, shift]) => {
    const fullPath = path.resolve(__dirname, '../dashboard/src/data/categories', relPath);
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${relPath}`);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Shift pattern 1: "line": X or line: X
    content = content.replace(/("line"|line)\s*:\s*(\d+)/g, (match, p1, p2) => {
        const val = parseInt(p2);
        if (val > shift) {
            return `${p1}: ${val - shift}`;
        }
        return match;
    });
    
    // Shift pattern 2: lineNum === X
    content = content.replace(/lineNum\s*===\s*(\d+)/g, (match, p1) => {
        const val = parseInt(p1);
        if (val > shift) {
            return `lineNum === ${val - shift}`;
        }
        return match;
    });
    
    // Shift pattern 3: line: activeLine || X
    content = content.replace(/line\s*:\s*activeLine\s*\|\|\s*(\d+)/g, (match, p1) => {
        const val = parseInt(p1);
        if (val > shift) {
            return `line: activeLine || ${val - shift}`;
        }
        return match;
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Shifted line numbers in ${path.basename(relPath)} by -${shift}`);
});
