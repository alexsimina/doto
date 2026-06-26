const fs = require('fs');
const path = require('path');

const targetFiles = [
    'Graph_Theory/Graphs/LCA/Binary_Lifting.js',
    'Graph_Theory/Graphs/LCA/Euler_RMQ.js',
    'Graph_Theory/Graphs/Max_Flow/Dinic.js',
    'Graph_Theory/Graphs/Max_Flow/Edmonds_Karp.js',
    'Data_Structures/Data_Structures/Frequency_Vectors.js',
    'Data_Structures/Data_Structures/Priority_Queue.js',
    'Data_Structures/Data_Structures/Queue_Deque.js',
    'Data_Structures/Data_Structures/Stack.js'
];

const basePath = path.resolve(__dirname, '../../dashboard/src/data/categories');

targetFiles.forEach(relPath => {
    const filePath = path.join(basePath, relPath);
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_verify_details.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    
    try {
        const data = require(tempFile);
        if (!data.code || !data.explanations) return;
        
        const cleanCode = data.code.replace(/^\r?\n/, '').replace(/^\r?\n$/, '');
        const cppLines = cleanCode.split('\n');
        
        console.log(`\n========================================`);
        console.log(`File: ${relPath}`);
        console.log(`Code lines: ${cppLines.length}`);
        
        data.explanations.slice(0, 5).forEach((step, idx) => {
            console.log(`  Step ${idx}: "${step.text.substring(0, 50)}..."`);
            console.log(`    Line in explanation: ${step.line}`);
            for (let offset = -2; offset <= 8; offset++) {
                const targetLine = step.line - offset;
                const lineContent = cppLines[targetLine - 1] || 'OUT OF BOUNDS';
                console.log(`      Offset ${offset} -> Line ${targetLine}: ${lineContent.trim()}`);
            }
        });
        
    } catch (err) {
        console.log(`Error parsing ${relPath}: ${err.message}`);
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
});
