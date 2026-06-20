const fs = require('fs');

const extracted = require('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\scratch\\extracted_graphs.json');

const staticStructures = {};

for (const [name, data] of Object.entries(extracted)) {
  if (name === 'Basics') continue; // Basics is already handled differently
  
  if (!data.hasExplanationsGraphVisual || !data.allGvs || data.allGvs.length === 0) {
    console.log(`${name}: No graphVisual entries found`);
    continue;
  }
  
  // To get the complete set of nodes and edges, we collect all unique nodes and edges across all steps
  const nodesMap = new Map();
  const edgesMap = new Map();
  let directed = true;
  
  // Some categories might have directed = false by default in UI, let's detect from data if present
  let title = "";
  
  data.allGvs.forEach(gvEntry => {
    const gv = gvEntry.graphVisual;
    if (gv.directed !== undefined) directed = gv.directed;
    if (gv.title) title = gv.title;
    
    if (gv.nodes) {
      gv.nodes.forEach(n => {
        if (!nodesMap.has(n.id)) {
          nodesMap.set(n.id, {
            id: n.id,
            x: n.x,
            y: n.y,
            label: n.label,
            desc: n.desc // if any
          });
        }
      });
    }
    
    if (gv.edges) {
      gv.edges.forEach(e => {
        const key = `${e.source}->${e.target}`;
        if (!edgesMap.has(key)) {
          edgesMap.set(key, {
            source: e.source,
            target: e.target,
            weight: e.weight // if any
          });
        }
      });
    }
  });
  
  staticStructures[name] = {
    title,
    directed,
    nodes: Array.from(nodesMap.values()),
    edges: Array.from(edgesMap.values())
  };
  
  console.log(`${name}: ${nodesMap.size} nodes, ${edgesMap.size} edges, directed: ${directed}`);
}

fs.writeFileSync('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\scratch\\static_structures.json', JSON.stringify(staticStructures, null, 2));
console.log("Static structures written.");
