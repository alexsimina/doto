const fs = require('fs');
const path = require('path');

const shifts = {
    'Core_Algorithms/Alg/Backtracking.js': 6,
    'Core_Algorithms/Alg/Divide_Conquer/Binary_Search.js': 6,
    'Core_Algorithms/Alg/Divide_Conquer/Merge_Sort.js': 6,
    'Core_Algorithms/Alg/Divide_Conquer/Quick_Sort.js': 6,
    'Core_Algorithms/Alg/Divide_Conquer/Z_Traversal.js': 6,
    'Core_Algorithms/Alg/Greedy.js': 6,
    'Core_Algorithms/Alg/Meet_in_the_Middle.js': 6,
    'Core_Algorithms/Alg/Mo_Algorithm.js': 6,
    'Core_Algorithms/Alg/Square_Root_Decomp.js': 6,
    'Data_Structures/Data_Structures/Disjoint_Sets.js': 6,
    'Data_Structures/Techniques/Bitwise_Ops.js': 6,
    'Data_Structures/Techniques/Difference_Arrays.js': 6,
    'Dynamic_Programming/Advanced_DP/CHT.js': 7,
    'Dynamic_Programming/Advanced_DP/Exponential_States.js': 7,
    'Dynamic_Programming/Advanced_DP/Trees_Graphs.js': 7,
    'Dynamic_Programming/Dynamic_Programming/LCS.js': 6,
    'Graph_Theory/Graphs/DFS.js': 1,
    'Graph_Theory/Graphs/MST/Kruskal.js': 1,
    'Graph_Theory/Graphs/Shortest_Path/Bellman_Ford.js': 1
};

const basePath = path.resolve(__dirname, '../dashboard/src/data/categories');

Object.entries(shifts).forEach(([relPath, shift]) => {
    const filePath = path.join(basePath, relPath.replace(/\//g, '\\'));
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Shift line numbers: "line": X or line: X
    content = content.replace(/("line"|line)\s*:\s*(\d+)/g, (match, p1, p2) => {
        const val = parseInt(p2);
        if (val > shift) {
            return `${p1}: ${val - shift}`;
        }
        return match;
    });
    
    // Shift lineNum comparisons
    const operators = ['===', '==', '>=', '<=', '>', '<'];
    operators.forEach(op => {
        const regex = new RegExp(`lineNum\\s*${op.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\s*(\\d+)`, 'g');
        content = content.replace(regex, (match, p1) => {
            const val = parseInt(p1);
            if (val > shift) {
                return `lineNum ${op} ${val - shift}`;
            }
            return match;
        });
    });
    
    // Shift activeLine fallbacks: line: activeLine || X
    content = content.replace(/line\s*:\s*activeLine\s*\|\|\s*(\d+)/g, (match, p1) => {
        const val = parseInt(p1);
        if (val > shift) {
            return `line: activeLine || ${val - shift}`;
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Successfully shifted ${relPath} by -${shift}`);
});
