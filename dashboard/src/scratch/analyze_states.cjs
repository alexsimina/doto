const fs = require('fs');

const extracted = require('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\scratch\\extracted_graphs.json');

for (const [name, data] of Object.entries(extracted)) {
  if (name === 'Basics') continue;
  
  console.log(`=== ${name} ===`);
  if (!data.allGvs || data.allGvs.length === 0) {
    console.log("No graphVisuals found");
    continue;
  }
  
  data.allGvs.slice(0, 5).forEach((entry, i) => {
    const activeNodes = entry.graphVisual.nodes.filter(n => n.state).map(n => `${n.id}:${n.state}`);
    const activeEdges = entry.graphVisual.edges.filter(e => e.active).map(e => `${e.source}->${e.target}`);
    console.log(`  Step ${entry.stepIndex}: activeNodes=[${activeNodes.join(', ')}], activeEdges=[${activeEdges.join(', ')}]`);
  });
  if (data.allGvs.length > 5) {
    console.log("  ...");
    const last = data.allGvs[data.allGvs.length - 1];
    const activeNodes = last.graphVisual.nodes.filter(n => n.state).map(n => `${n.id}:${n.state}`);
    const activeEdges = last.graphVisual.edges.filter(e => e.active).map(e => `${e.source}->${e.target}`);
    console.log(`  Step ${last.stepIndex}: activeNodes=[${activeNodes.join(', ')}], activeEdges=[${activeEdges.join(', ')}]`);
  }
}
