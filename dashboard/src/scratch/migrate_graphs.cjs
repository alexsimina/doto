const fs = require('fs');
const path = require('path');

const BASE_DIR = 'c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\data\\categories';

const fileMapping = {
  "BFS": "Graph_Theory/Graphs/BFS.js",
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

const getGraphVisualCode = {
  "BFS": `(stepIndex) => {
      let nodeVal = -1;
      let neighborVal = -1;
      let visitedArray = [false, false, false, false, false, false];
      let qArray = [];
      if (stepIndex >= 3) { visitedArray[0] = true; }
      if (stepIndex >= 4) { qArray = [0]; }
      if (stepIndex >= 6) { nodeVal = 0; }
      if (stepIndex >= 7) { qArray = []; }
      if (stepIndex >= 9) { neighborVal = 1; }
      if (stepIndex >= 11) { visitedArray[1] = true; neighborVal = -1; }
      if (stepIndex >= 12) { qArray = [1]; }
      if (stepIndex >= 13) { neighborVal = 2; }
      if (stepIndex >= 15) { visitedArray[2] = true; neighborVal = -1; }
      if (stepIndex >= 16) { qArray = [1, 2]; }
      if (stepIndex >= 18) { nodeVal = 1; }
      if (stepIndex >= 19) { qArray = [2]; }
      if (stepIndex >= 21) { neighborVal = 0; }
      if (stepIndex >= 22) { neighborVal = -1; }
      if (stepIndex >= 23) { neighborVal = 3; }
      if (stepIndex >= 25) { visitedArray[3] = true; neighborVal = -1; }
      if (stepIndex >= 26) { qArray = [2, 3]; }
      if (stepIndex >= 27) { neighborVal = 4; }
      if (stepIndex >= 28) { visitedArray[4] = true; qArray = [2, 3, 4]; neighborVal = -1; }
      if (stepIndex >= 29) { qArray = [3, 4]; nodeVal = 2; }
      if (stepIndex >= 30) { qArray = [4]; nodeVal = 3; }
      if (stepIndex >= 31) { qArray = []; nodeVal = 4; }

      const staticNodes = [
        { id: "0", x: 140, y: 30, label: "0" },
        { id: "1", x: 80, y: 90, label: "1" },
        { id: "2", x: 200, y: 90, label: "2" },
        { id: "3", x: 50, y: 150, label: "3" },
        { id: "4", x: 110, y: 150, label: "4" },
        { id: "5", x: 80, y: 200, label: "5" }
      ];
      const staticEdges = [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "1", target: "3" },
        { source: "1", target: "4" },
        { source: "3", target: "5" },
        { source: "4", target: "5" }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal) state = "active";
          else if (visitedArray[idNum]) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const active = (u === nodeVal && v === neighborVal) || (v === nodeVal && u === neighborVal);
          return { ...e, active };
        })
      };
    }`,

  "DFS": `(stepIndex) => {
      let nodeVal = -1;
      let neighborVal = -1;
      let visitedArray = [false, false, false, false, false];
      let activeStack = [];

      if (stepIndex >= 1) { visitedArray[0] = true; nodeVal = 0; activeStack = [0]; }
      if (stepIndex >= 6) { visitedArray[1] = true; nodeVal = 1; activeStack = [1, 0]; }
      if (stepIndex >= 13) { visitedArray[3] = true; nodeVal = 3; activeStack = [3, 1, 0]; }
      if (stepIndex >= 16) { nodeVal = 1; activeStack = [1, 0]; }
      if (stepIndex >= 18) { visitedArray[4] = true; nodeVal = 4; activeStack = [4, 1, 0]; }
      if (stepIndex >= 21) { visitedArray[2] = true; nodeVal = 2; activeStack = [2, 4, 1, 0]; }
      if (stepIndex >= 23) { nodeVal = 0; activeStack = [0]; }

      if (stepIndex === 4 || stepIndex === 5) neighborVal = 1;
      if (stepIndex === 11 || stepIndex === 12) neighborVal = 3;
      if (stepIndex === 17) neighborVal = 4;

      const staticNodes = [
        { id: "0", x: 140, y: 40, label: "0" },
        { id: "1", x: 80, y: 110, label: "1" },
        { id: "2", x: 200, y: 110, label: "2" },
        { id: "3", x: 50, y: 180, label: "3" },
        { id: "4", x: 110, y: 180, label: "4" }
      ];
      const staticEdges = [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "1", target: "3" },
        { source: "1", target: "4" },
        { source: "2", target: "4" }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal) state = "active";
          else if (visitedArray[idNum]) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = (u === nodeVal && v === neighborVal) || (v === nodeVal && u === neighborVal);
          if (!active && activeStack.length > 1) {
            for (let i = 0; i < activeStack.length - 1; i++) {
              if ((activeStack[i] === u && activeStack[i+1] === v) || (activeStack[i] === v && activeStack[i+1] === u)) {
                active = true;
                break;
              }
            }
          }
          return { ...e, active };
        })
      };
    }`,

  "Topological_Sort": `(stepIndex) => {
      const topOrder = [];
      const qState = [];
      let uVal = -1, vVal = -1;
      if (stepIndex >= 7) { qState.push(0); }
      if (stepIndex >= 9) { qState.push(1); }
      if (stepIndex >= 13) { uVal = 0; }
      if (stepIndex >= 14) { topOrder.push(0); }
      if (stepIndex >= 16) { vVal = 2; }
      if (stepIndex >= 19) { uVal = 1; topOrder.push(1); }
      if (stepIndex >= 21) { qState.push(2); vVal = 2; }
      if (stepIndex >= 22) { uVal = 2; topOrder.push(2); }
      if (stepIndex >= 23) { topOrder.push(3, 4); }

      const staticNodes = [
        { id: "0", x: 50, y: 50, label: "0" },
        { id: "1", x: 230, y: 50, label: "1" },
        { id: "2", x: 140, y: 130, label: "2" },
        { id: "3", x: 80, y: 200, label: "3" },
        { id: "4", x: 200, y: 200, label: "4" }
      ];
      const staticEdges = [
        { source: "0", target: "2" },
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "2", target: "4" },
        { source: "3", target: "4" }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal || idNum === vVal) state = "active";
          else if (topOrder.includes(idNum)) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const active = (u === uVal && v === vVal);
          return { ...e, active };
        })
      };
    }`,

  "Euler_Hamilton": `(stepIndex) => {
      let currV = -1, nextV = -1;
      const stackState = [];
      const circuitState = [];
      if (stepIndex >= 1) { stackState.push(0); }
      if (stepIndex >= 4) { currV = 0; }
      if (stepIndex >= 6) { stackState.push(0); nextV = 1; }
      if (stepIndex >= 7) { currV = 1; nextV = -1; }
      if (stepIndex >= 8) { stackState.push(1); currV = 2; }
      if (stepIndex >= 9) { stackState.push(2); currV = 3; nextV = 3; }
      if (stepIndex >= 10) { stackState.push(3); currV = 2; nextV = -1; }
      if (stepIndex >= 11) { stackState.push(2); currV = 0; }
      if (stepIndex >= 12) { circuitState.push(0); currV = 2; }
      if (stepIndex >= 13) { circuitState.push(2); }

      const staticNodes = [
        { id: "0", x: 80, y: 60, label: "0" },
        { id: "1", x: 200, y: 60, label: "1" },
        { id: "2", x: 140, y: 130, label: "2" },
        { id: "3", x: 80, y: 200, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1" },
        { source: "1", target: "2" },
        { source: "2", target: "0" },
        { source: "2", target: "3" },
        { source: "3", target: "2" }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === currV) state = "active";
          else if (circuitState.includes(idNum)) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = (u === currV && v === nextV);
          if (!active && stackState.length > 1) {
            for (let i = 0; i < stackState.length - 1; i++) {
              if (stackState[i] === u && stackState[i+1] === v) {
                active = true;
                break;
              }
            }
          }
          return { ...e, active };
        })
      };
    }`,

  "Binary_Lifting": `(stepIndex) => {
      let nodeVal = -1, ansVal = -1;
      if (stepIndex >= 1) { nodeVal = 0; }
      if (stepIndex >= 3) { nodeVal = 1; }
      if (stepIndex >= 5) { nodeVal = 3; }
      if (stepIndex >= 7) { nodeVal = 4; }
      if (stepIndex >= 9) { ansVal = 1; }
      if (stepIndex >= 11) { ansVal = 0; }

      const staticNodes = [
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 100, y: 100, label: "2" },
        { id: "3", x: 200, y: 100, label: "3" },
        { id: "4", x: 50, y: 150, label: "4" },
        { id: "5", x: 150, y: 150, label: "5" },
        { id: "6", x: 250, y: 150, label: "6" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "2", target: "4" },
        { source: "2", target: "5" },
        { source: "3", target: "6" }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal + 1) state = "active";
          else if (idNum === ansVal + 1) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges
      };
    }`,

  "Euler_RMQ": `(stepIndex) => {
      let nodeVal = -1;
      if (stepIndex >= 1) { nodeVal = 0; }
      if (stepIndex >= 3) { nodeVal = 1; }
      if (stepIndex >= 5) { nodeVal = 3; }
      if (stepIndex >= 9) { nodeVal = 4; }

      const staticNodes = [
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 100, y: 100, label: "2" },
        { id: "3", x: 200, y: 100, label: "3" },
        { id: "4", x: 50, y: 150, label: "4" },
        { id: "5", x: 150, y: 150, label: "5" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "2", target: "4" },
        { source: "2", target: "5" }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal + 1) state = "active";
          return { ...n, state };
        }),
        edges: staticEdges
      };
    }`,

  "Kruskal": `(stepIndex) => {
      let uVal = -1, vVal = -1;
      if (stepIndex >= 4) { uVal = 2; vVal = 3; }
      if (stepIndex >= 5) { uVal = 0; vVal = 3; }
      if (stepIndex >= 6) { uVal = 0; vVal = 2; }
      if (stepIndex >= 7) { uVal = 0; vVal = 1; }
      if (stepIndex >= 8) { uVal = 1; vVal = 3; }

      const staticNodes = [
        { id: "0", x: 80, y: 50, label: "0" },
        { id: "1", x: 200, y: 50, label: "1" },
        { id: "2", x: 80, y: 160, label: "2" },
        { id: "3", x: 200, y: 160, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: 10 },
        { source: "0", target: "2", weight: 6 },
        { source: "0", target: "3", weight: 5 },
        { source: "1", target: "3", weight: 15 },
        { source: "2", target: "3", weight: 4 }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal || idNum === vVal) state = "active";
          else if (stepIndex >= 7) state = "visited";
          else if (stepIndex >= 5 && (idNum === 0 || idNum === 2 || idNum === 3)) state = "visited";
          else if (stepIndex >= 4 && (idNum === 2 || idNum === 3)) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = false;
          if (stepIndex >= 7 && ((u === 0 && v === 1) || (u === 0 && v === 3) || (u === 2 && v === 3))) active = true;
          else if (stepIndex >= 5 && ((u === 0 && v === 3) || (u === 2 && v === 3))) active = true;
          else if (stepIndex >= 4 && (u === 2 && v === 3)) active = true;
          return { ...e, active };
        })
      };
    }`,

  "Prim": `(stepIndex) => {
      let uVal = -1;
      if (stepIndex >= 3) { uVal = 0; }
      if (stepIndex >= 5) { uVal = 2; }
      if (stepIndex >= 7) { uVal = 1; }
      if (stepIndex >= 9) { uVal = 3; }

      const staticNodes = [
        { id: "0", x: 100, y: 50, label: "0" },
        { id: "1", x: 200, y: 50, label: "1" },
        { id: "2", x: 100, y: 150, label: "2" },
        { id: "3", x: 200, y: 150, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: 4 },
        { source: "0", target: "2", weight: 1 },
        { source: "1", target: "2", weight: 2 },
        { source: "1", target: "3", weight: 5 },
        { source: "2", target: "3", weight: 8 }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (stepIndex >= 9) state = "visited";
          else if (stepIndex >= 7 && idNum !== 3) state = "visited";
          else if (stepIndex >= 5 && (idNum === 0 || idNum === 2)) state = "visited";
          else if (stepIndex >= 3 && idNum === 0) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = false;
          if (stepIndex >= 9 && ((u === 0 && v === 2) || (u === 1 && v === 2) || (u === 1 && v === 3))) active = true;
          else if (stepIndex >= 7 && ((u === 0 && v === 2) || (u === 1 && v === 2))) active = true;
          else if (stepIndex >= 5 && (u === 0 && v === 2)) active = true;
          return { ...e, active };
        })
      };
    }`,

  "Dinic": `(stepIndex) => {
      let flowVal = 0;
      const level = [-1, -1, -1, -1];
      if (stepIndex >= 2) { level[0] = 0; level[1] = 1; level[2] = 1; level[3] = 2; }
      if (stepIndex >= 4) { flowVal = 10; }
      if (stepIndex >= 6) { flowVal = 20; }

      const staticNodes = [
        { id: "0", x: 50, y: 100, label: "S (0)" },
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 150, y: 150, label: "2" },
        { id: "3", x: 250, y: 100, label: "T (3)" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: "0/3" },
        { source: "0", target: "2", weight: "0/2" },
        { source: "1", target: "2", weight: "0/1" },
        { source: "1", target: "3", weight: "0/2" },
        { source: "2", target: "3", weight: "0/3" }
      ];

      let f01 = 0, f02 = 0, f12 = 0, f13 = 0, f23 = 0;
      if (stepIndex >= 4 && stepIndex < 6) {
        f01 = 2; f13 = 2;
      } else if (stepIndex >= 6 && stepIndex < 8) {
        f01 = 2; f13 = 2; f02 = 2; f23 = 2;
      } else if (stepIndex >= 8) {
        f01 = 3; f12 = 1; f23 = 3; f13 = 2; f02 = 2;
      }

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (stepIndex >= 2 && level[idNum] !== -1) state = "visited";
          const desc = stepIndex >= 2 ? \`L=\\c\`.replace('c', 'level[idNum] !== -1 ? level[idNum] : "-"') : undefined; // simple escape fix
          // Let's rewrite desc safely to avoid node evaluation errors
          let safeDesc = undefined;
          if (stepIndex >= 2) {
             safeDesc = "L=" + (level[idNum] !== -1 ? level[idNum] : "-");
          }
          return { ...n, state, desc: safeDesc };
        }),
        edges: staticEdges.map(e => {
          let flow = 0;
          let cap = 0;
          if (e.source === "0" && e.target === "1") { flow = f01; cap = 3; }
          else if (e.source === "0" && e.target === "2") { flow = f02; cap = 2; }
          else if (e.source === "1" && e.target === "2") { flow = f12; cap = 1; }
          else if (e.source === "1" && e.target === "3") { flow = f13; cap = 2; }
          else if (e.source === "2" && e.target === "3") { flow = f23; cap = 3; }
          
          let active = false;
          if (stepIndex >= 4 && stepIndex < 6 && (e.source === "0" && e.target === "1" || e.source === "1" && e.target === "3")) active = true;
          if (stepIndex >= 6 && stepIndex < 8 && (e.source === "0" && e.target === "2" || e.source === "2" && e.target === "3")) active = true;
          if (stepIndex >= 8 && (e.source === "0" && e.target === "1" || e.source === "1" && e.target === "2" || e.source === "2" && e.target === "3")) active = true;

          return { ...e, weight: \`\${flow}/\${cap}\`, active };
        })
      };
    }`,

  "Edmonds_Karp": `(stepIndex) => {
      let uVal = -1;
      if (stepIndex >= 4) { uVal = 0; }

      const staticNodes = [
        { id: "0", x: 50, y: 100, label: "S (0)" },
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 150, y: 150, label: "2" },
        { id: "3", x: 250, y: 100, label: "T (3)" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: "0/3" },
        { source: "0", target: "2", weight: "0/2" },
        { source: "1", target: "2", weight: "0/1" },
        { source: "1", target: "3", weight: "0/2" },
        { source: "2", target: "3", weight: "0/3" }
      ];

      let f01 = 0, f02 = 0, f12 = 0, f13 = 0, f23 = 0;
      if (stepIndex >= 4 && stepIndex < 6) {
        f01 = 2; f13 = 2;
      } else if (stepIndex >= 6 && stepIndex < 8) {
        f01 = 2; f13 = 2; f02 = 2; f23 = 2;
      } else if (stepIndex >= 8) {
        f01 = 3; f12 = 1; f23 = 3; f13 = 2; f02 = 2;
      }

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (stepIndex >= 8) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          let flow = 0;
          let cap = 0;
          if (e.source === "0" && e.target === "1") { flow = f01; cap = 3; }
          else if (e.source === "0" && e.target === "2") { flow = f02; cap = 2; }
          else if (e.source === "1" && e.target === "2") { flow = f12; cap = 1; }
          else if (e.source === "1" && e.target === "3") { flow = f13; cap = 2; }
          else if (e.source === "2" && e.target === "3") { flow = f23; cap = 3; }
          
          let active = false;
          if (stepIndex >= 4 && stepIndex < 6 && (e.source === "0" && e.target === "1" || e.source === "1" && e.target === "3")) active = true;
          if (stepIndex >= 6 && stepIndex < 8 && (e.source === "0" && e.target === "2" || e.source === "2" && e.target === "3")) active = true;
          if (stepIndex >= 8 && (e.source === "0" && e.target === "1" || e.source === "1" && e.target === "2" || e.source === "2" && e.target === "3")) active = true;

          return { ...e, weight: \`\${flow}/\${cap}\`, active };
        })
      };
    }`,

  "Kosaraju": `(stepIndex) => {
      let passVal = 1, nodeVal = -1;
      const visited = [false, false, false, false, false];
      if (stepIndex >= 3) { visited[0] = true; nodeVal = 0; }
      if (stepIndex >= 5) { visited[1] = true; nodeVal = 1; }
      if (stepIndex >= 7) { visited[2] = true; nodeVal = 2; }
      if (stepIndex >= 9) { visited[3] = true; nodeVal = 3; }
      if (stepIndex >= 11) { visited[4] = true; nodeVal = 4; passVal = 2; }

      const staticNodes = [
        { id: "0", x: 140, y: 60, label: "0" },
        { id: "1", x: 80, y: 120, label: "1" },
        { id: "2", x: 200, y: 120, label: "2" },
        { id: "3", x: 140, y: 180, label: "3" },
        { id: "4", x: 230, y: 180, label: "4" }
      ];

      const forwardEdges = [
        { source: "0", target: "2" },
        { source: "2", target: "1" },
        { source: "1", target: "0" },
        { source: "0", target: "3" },
        { source: "3", target: "4" }
      ];
      
      const transposedEdges = [
        { source: "2", target: "0" },
        { source: "1", target: "2" },
        { source: "0", target: "1" },
        { source: "3", target: "0" },
        { source: "4", target: "3" }
      ];

      return {
        title: passVal === 1 ? "Graf Original" : "Graf Transpus (adjT)",
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal) state = "active";
          else if (visited[idNum]) state = "visited";
          return { ...n, state };
        }),
        edges: (passVal === 1 ? forwardEdges : transposedEdges).map(e => {
          const u = parseInt(e.source);
          const active = (u === nodeVal);
          return { ...e, active };
        })
      };
    }`,

  "Tarjan": `(stepIndex) => {
      let nodeVal = -1;
      const ids = [-1, -1, -1, -1];
      const low = [-1, -1, -1, -1];
      if (stepIndex >= 1) { nodeVal = 1; ids[0] = 1; low[0] = 1; }
      if (stepIndex >= 3) { nodeVal = 2; ids[1] = 2; low[1] = 2; }
      if (stepIndex >= 5) { nodeVal = 3; ids[2] = 3; low[2] = 3; }
      if (stepIndex >= 9) { nodeVal = 2; ids[1] = 2; low[1] = 1; }
      if (stepIndex >= 13) { nodeVal = 4; ids[3] = 4; low[3] = 4; }

      const staticNodes = [
        { id: "1", x: 100, y: 50, label: "1" },
        { id: "2", x: 200, y: 50, label: "2" },
        { id: "3", x: 150, y: 150, label: "3" },
        { id: "4", x: 250, y: 150, label: "4" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "3", target: "1" },
        { source: "3", target: "4" }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal) state = "active";
          else if (ids[idNum - 1] !== -1) state = "visited";
          
          let desc = undefined;
          if (ids[idNum - 1] !== -1) {
            desc = \`id/low: \${ids[idNum - 1]}/\${low[idNum - 1]}\`;
          }
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === nodeVal);
          return { ...e, active };
        })
      };
    }`,

  "Bellman_Ford": `(stepIndex) => {
      const dist = [0, 1e9, 1e9, 1e9];
      let uVal = -1, vVal = -1, wVal = -1;
      if (stepIndex >= 1) { dist[0] = 0; }
      if (stepIndex >= 3) { uVal = 0; vVal = 1; wVal = 4; dist[1] = 4; }
      if (stepIndex >= 4) { uVal = 0; vVal = 2; wVal = 5; dist[2] = 5; }
      if (stepIndex >= 5) { uVal = 2; vVal = 1; wVal = -2; dist[1] = 3; }
      if (stepIndex >= 6) { uVal = 1; vVal = 3; wVal = 3; dist[3] = 6; }

      const staticNodes = [
        { id: "0", x: 50, y: 100, label: "0" },
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 150, y: 150, label: "2" },
        { id: "3", x: 250, y: 100, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: 4 },
        { source: "0", target: "2", weight: 5 },
        { source: "2", target: "1", weight: -2 },
        { source: "1", target: "3", weight: 3 }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal || idNum === vVal) state = "active";
          else if (dist[idNum] < 1e9) state = "visited";
          
          const desc = \`d=\${dist[idNum] >= 1e9 ? 'INF' : dist[idNum]}\`;
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const active = (u === uVal && v === vVal);
          return { ...e, active };
        })
      };
    }`,

  "Dijkstra": `(stepIndex) => {
      const dist = [0, 1e9, 1e9, 1e9, 1e9];
      let uVal = -1;
      if (stepIndex >= 2) { dist[0] = 0; }
      if (stepIndex >= 3) { uVal = 0; }
      if (stepIndex >= 4) { dist[2] = 3; dist[1] = 10; }
      if (stepIndex >= 5) { uVal = 2; }
      if (stepIndex >= 6) { dist[1] = 4; dist[4] = 5; }
      if (stepIndex >= 7) { uVal = 1; }
      if (stepIndex >= 8) { dist[3] = 6; }
      if (stepIndex >= 9) { uVal = 4; }

      const staticNodes = [
        { id: "0", x: 50, y: 110, label: "0" },
        { id: "1", x: 140, y: 50, label: "1" },
        { id: "2", x: 140, y: 170, label: "2" },
        { id: "3", x: 230, y: 50, label: "3" },
        { id: "4", x: 230, y: 170, label: "4" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: 10 },
        { source: "0", target: "2", weight: 3 },
        { source: "1", target: "3", weight: 2 },
        { source: "2", target: "1", weight: 1 },
        { source: "2", target: "3", weight: 8 },
        { source: "2", target: "4", weight: 2 },
        { source: "4", target: "3", weight: 9 }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (dist[idNum] < 1e9) state = "visited";
          
          const desc = \`d=\${dist[idNum] >= 1e9 ? 'INF' : dist[idNum]}\`;
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === uVal);
          return { ...e, active };
        })
      };
    }`,

  "Floyd_Warshall": `(stepIndex) => {
      let kVal = 0, iVal = 0, jVal = 0;
      if (stepIndex >= 3) kVal = 1;
      if (stepIndex >= 5) { iVal = 1; jVal = 0; }
      if (stepIndex >= 7) kVal = 2;
      if (stepIndex >= 9) { iVal = 0; jVal = 1; }

      const staticNodes = [
        { id: "0", x: 100, y: 50, label: "0" },
        { id: "1", x: 200, y: 50, label: "1" },
        { id: "2", x: 200, y: 150, label: "2" },
        { id: "3", x: 100, y: 150, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: 5 },
        { source: "0", target: "3", weight: 10 },
        { source: "1", target: "2", weight: 3 },
        { source: "2", target: "3", weight: 1 }
      ];

      const edgesList = [...staticEdges];
      if (stepIndex >= 3) {
        edgesList.push({ source: "0", target: "2", weight: 8 });
      }

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === kVal) state = "active";
          else if (idNum === iVal || idNum === jVal) state = "visited";
          return { ...n, state };
        }),
        edges: edgesList.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = false;
          if ((u === iVal && v === kVal) || (u === kVal && v === jVal)) active = true;
          return { ...e, active };
        })
      };
    }`
};

for (const [name, relPath] of Object.entries(fileMapping)) {
  const fullPath = path.join(BASE_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File does not exist: ${fullPath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(/\r\n/g, '\n');
  
  // Find "  }\n};" at the end of the file
  const searchStr = '  }\n};';
  const lastIndex = content.lastIndexOf(searchStr);
  if (lastIndex === -1) {
    console.error(`Could not find standard closing pattern in ${fullPath}`);
    continue;
  }
  
  const visualCode = getGraphVisualCode[name];
  const before = content.substring(0, lastIndex).trim();
  const trailingChar = before.slice(-1);
  const separator = (trailingChar === ',' || trailingChar === '{') ? '' : ',';
  
  const newContent = before + separator + '\n    "getGraphVisual": ' + visualCode + '\n  }\n};\n';
  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log(`Successfully injected getGraphVisual for ${name} -> ${relPath}`);
}
console.log("All graph visualizations injected.");
