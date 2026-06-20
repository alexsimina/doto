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

const extracted = require('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\scratch\\extracted_graphs.json');

for (const [name, relPath] of Object.entries(fileMapping)) {
  try {
    const currentContent = fs.readFileSync('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\data\\categories\\' + relPath, 'utf8');
    
    // Find explanations array using a regex or simple eval
    // We can extract just the explanations section to avoid importing the whole file
    const match = currentContent.match(/"explanations"\s*:\s*\[([\s\S]*?)\]\s*,\s*\n\s*"debugger"/);
    let count = 0;
    if (match) {
      // It's a JSON array format basically, let's wrap it in brackets and parse it
      const expArrayStr = '[' + match[1] + ']';
      // Strip trailing comma if any
      const cleaned = expArrayStr.replace(/,\s*$/, ']').replace(/,(\s*[\]}])/g, '$1');
      try {
        const arr = JSON.parse(cleaned);
        count = arr.length;
      } catch (jsonErr) {
        // Fallback: count occurrences of "line": or "text":
        count = (match[1].match(/"line"\s*:/g) || []).length;
      }
    } else {
      // Try parsing with export replacement
      const cleanJS = currentContent
        .replace(/export\s+const\s+data\s*=/, 'module.exports =')
        .replace(/export\s+default\s+/, 'module.exports =');
      const tempFile = path.join(__dirname, 'temp_count.cjs');
      fs.writeFileSync(tempFile, cleanJS);
      const currData = require(tempFile);
      fs.unlinkSync(tempFile);
      delete require.cache[require.resolve(tempFile)];
      count = currData.explanations.length;
    }
    
    console.log(`${name.padEnd(20)} | 117d1e6 steps: ${String(extracted[name].totalSteps).padEnd(3)} | current steps: ${count}`);
  } catch (e) {
    console.error(`Failed for ${name}:`, e.message);
  }
}
