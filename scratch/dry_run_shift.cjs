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
    
    // Let's count matches for each pattern
    const pattern1 = /("line"|line)\s*:\s*(\d+)/g;
    const pattern2 = /lineNum\s*===\s*(\d+)/g;
    const pattern3 = /line\s*:\s*activeLine\s*\|\|\s*(\d+)/g;
    
    let p1Matches = 0;
    let p2Matches = 0;
    let p3Matches = 0;
    
    content.replace(pattern1, (match, p1, p2) => {
        const val = parseInt(p2);
        if (val > shift) p1Matches++;
        return match;
    });
    
    content.replace(pattern2, (match, p2) => {
        const val = parseInt(p2);
        if (val > shift) p2Matches++;
        return match;
    });
    
    content.replace(pattern3, (match, p2) => {
        const val = parseInt(p2);
        if (val > shift) p3Matches++;
        return match;
    });
    
    console.log(`${path.basename(relPath)}: shift=${shift}, p1=${p1Matches}, p2=${p2Matches}, p3=${p3Matches}`);
});
