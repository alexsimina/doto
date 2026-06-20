const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const fileMapping = {
  "BFS": "Graph_Theory/Graphs/BFS.js",
  "Basics": "Graph_Theory/Graphs/Basics.js",
  "DFS": "Graph_Theory/Graphs/DFS.js",
  "Euler_Hamilton": "Graph_Theory/Graphs/Euler_Hamilton.js",
  "Binary_Lifting": "Graph_Theory/Graphs/LCA/Binary_Lifting.js",
  "Euler_RMQ": "Graph_Theory/Graphs/LCA/Euler_RMQ.js",
  "Kruskal": "Graph_Theory/Graphs/MST/Kruskal.js",
  "Prim": "Graph_Theory/Graphs/MST/Prim.js",
  "Dinic": "Graph_Theory/Graphs/Max_Flow/Dinic.js",
  "Edmonds_Karp": "Graph_Theory/Graphs/Max_Flow/Edmonds_Karp.js",
  "Kosaraju": "Graph_Theory/Graphs/SCC/Kosaraju.js",
  "Tarjan": "Graph_Theory/Graphs/SCC/Tarjan.js",
  "Bellman_Ford": "Graph_Theory/Graphs/Shortest_Path/Bellman_Ford.js",
  "Dijkstra": "Graph_Theory/Graphs/Shortest_Path/Dijkstra.js",
  "Floyd_Warshall": "Graph_Theory/Graphs/Shortest_Path/Floyd_Warshall.js",
  "Topological_Sort": "Graph_Theory/Graphs/Topological_Sort.js"
};

const results = {};

for (const [name, relPath] of Object.entries(fileMapping)) {
  try {
    const fileContent = execSync(`git show 117d1e6:dashboard/src/data/categories/${relPath}`).toString();
    
    const cleanJS = fileContent
      .replace(/export\s+const\s+data\s*=/, 'module.exports =')
      .replace(/export\s+default\s+/, 'module.exports =');
    
    // Use .cjs extension to override the type: module in package.json
    const tempFile = path.join(__dirname, 'temp_inspect.cjs');
    fs.writeFileSync(tempFile, cleanJS);
    
    const importedData = require(tempFile);
    fs.unlinkSync(tempFile);
    
    delete require.cache[require.resolve(tempFile)];
    
    const gvs = [];
    if (importedData.explanations) {
      importedData.explanations.forEach((exp, idx) => {
        if (exp.graphVisual) {
          gvs.push({ stepIndex: idx, graphVisual: exp.graphVisual });
        }
      });
    }
    
    results[name] = {
      hasExplanationsGraphVisual: gvs.length > 0,
      totalSteps: importedData.explanations ? importedData.explanations.length : 0,
      gvsCount: gvs.length,
      sampleGv: gvs[0] || null,
      allGvs: gvs
    };
    
    console.log(`${name}: extracted ${gvs.length} graphVisual entries`);
  } catch (e) {
    console.error(`Failed for ${name}:`, e.message);
  }
}

fs.writeFileSync('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\scratch\\extracted_graphs.json', JSON.stringify(results, null, 2));
console.log("Completed extraction.");
