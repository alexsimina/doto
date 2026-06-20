export const data = {
  "presentation": "### Parcurgerea în Adâncime (DFS)\n\nDepth-First Search (DFS) explorează graful mergând cât mai adânc posibil pe fiecare ramură, înainte de a se întoarce (backtracking) la nodurile anterioare.\n\nSe folosește o structură de tip LIFO (Last-In, First-Out) - de cele mai multe ori prin intermediul **stivei de apeluri recursive**. DFS împarte muchiile grafului în muchii de arbore (folosite pentru vizitarea nodurilor noi) și muchii de întoarcere (back edges, care detectează cicluri). Complexitatea sa în timp este de $O(V + E)$.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - vizităm fiecare nod și muchie exact o singură dată.\n- **Spațiu:** $O(V)$ - stiva de recursivitate poate ajunge la adâncimea $V$ (dacă graful este un drum liniar).",
  "variations": "### Variații și Cazuri Particulare\n\n- **DFS Iterativ**: Implementat cu o structură explicită de tip `std::stack`.\n- **Timpi de intrare/ieșire (Euler Tour)**: Memorarea momentului de început și de sfârșit pentru vizita fiecărui nod.\n- **Detecția ciclurilor**: Dacă în timpul parcurgerii întâlnim un nod vizitat care se află pe stiva de recursivitate activă.",
  "applications": "### Aplicații Reale\n\n- Sortarea topologică a unui graf orientat aciclic (DAG).\n- Determinarea componentelor conexe și tare conexe.\n- Rezolvarea puzzle-urilor și labirinturilor.",
  "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {\n    visited[node] = true;\n    cout << node << \" \";\n    \n    for (int neighbor : adj[node]) {\n        if (!visited[neighbor]) {\n            dfs(neighbor, adj, visited);\n        }\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj = {\n        {1, 2},\n        {0, 3, 4},\n        {0, 4},\n        {1},\n        {1, 2}\n    };\n    vector<bool> visited(V, false);\n    dfs(0, adj, visited);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 7,
      "text": "Intrăm în funcția recursivă `dfs` pentru nodul 0.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "node: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 0 ca vizitat în vectorul `visited`.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: true",
                "active": true
              },
              {
                "val": "visited[1]: false"
              },
              {
                "val": "visited[2]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Afișăm nodul 0.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {
                "val": "0 "
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Parcurgem lista de vecini ai nodului 0: [1, 2]. Primul vecin este 1.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă vecinul 1 a fost vizitat. `visited[1]` este false.",
      "blocksVisual": [
        {
          "label": "Visited check",
          "groups": [
            [
              {
                "val": "visited[1]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs(1)`.",
      "blocksVisual": [
        {
          "label": "Recursivitate",
          "groups": [
            [
              {
                "val": "dfs(0)"
              },
              {
                "val": "dfs(1)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Pornim executarea `dfs(1)`.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "node: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 1 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: true"
              },
              {
                "val": "visited[1]: true",
                "active": true
              },
              {
                "val": "visited[2]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Afișăm nodul 1.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {
                "val": "0 1 "
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Parcurgem vecinii nodului 1: [0, 3, 4]. Primul vecin este 0.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Nodul 0 este vizitat, deci nu facem nimic.",
      "blocksVisual": [
        {
          "label": "Visited check",
          "groups": [
            [
              {
                "val": "visited[0]: true"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Trecem la următorul vecin al nodului 1, care este 3.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Nodul 3 nu este vizitat.",
      "blocksVisual": [
        {
          "label": "Visited check",
          "groups": [
            [
              {
                "val": "visited[3]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs(3)`.",
      "blocksVisual": [
        {
          "label": "Recursivitate",
          "groups": [
            [
              {
                "val": "dfs(0)"
              },
              {
                "val": "dfs(1)"
              },
              {
                "val": "dfs(3)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 3 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[3]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Afișăm nodul 3.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {
                "val": "0 1 3 "
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Vecinii lui 3 sunt [1]. 1 este vizitat. Ne întoarcem din `dfs(3)`.",
      "blocksVisual": [
        {
          "label": "Backtrack",
          "groups": [
            [
              {
                "val": "dfs(0)"
              },
              {
                "val": "dfs(1)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Revenim în `dfs(1)`. Următorul vecin nerezolvat este 4.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs(4)`.",
      "blocksVisual": [
        {
          "label": "Recursivitate",
          "groups": [
            [
              {
                "val": "dfs(0)"
              },
              {
                "val": "dfs(1)"
              },
              {
                "val": "dfs(4)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 4 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[4]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Afișăm nodul 4.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {
                "val": "0 1 3 4 "
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Parcurgem vecinii lui 4: [1, 2]. 1 este vizitat. Trecem la vecinul 2.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Nodul 2 nu este vizitat. Apelăm recursiv `dfs(2)`.",
      "blocksVisual": [
        {
          "label": "Recursivitate",
          "groups": [
            [
              {
                "val": "dfs(0)"
              },
              {
                "val": "dfs(1)"
              },
              {
                "val": "dfs(4)"
              },
              {
                "val": "dfs(2)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm 2 ca vizitat. Toate nodurile sunt acum vizitate. Algoritmul se întoarce succesiv din toate apelurile.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[2]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
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

      globalVars.push({ name: 'adj', type: 'std::vector<std::vector<int>>&', val: 'size = 5', expandable: true });
      globalVars.push({ name: 'visited', type: 'std::vector<bool>&', val: `{${visitedArray.map(b => b ? 'true' : 'false').join(', ')}}`, expandable: false });
      if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
      if (neighborVal !== -1) vars.push({ name: 'neighbor', type: 'int', val: neighborVal, expandable: false });

      frames.push({ name: 'main()', file: 'main.cpp', line: 26 });
      activeStack.forEach((n, idx) => {
        frames.unshift({ name: `dfs(node = ${n}, adj, visited)`, file: 'dfs.cpp', line: idx === 0 ? activeLine : 11 });
      });

      if (nodeVal !== -1) {
        inlineVal = `node: ${nodeVal}`;
        if (neighborVal !== -1) inlineVal += `, neighbor: ${neighborVal}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let nodeVal = -1;
      let neighborVal = -1;
      if (stepIndex >= 1) nodeVal = 0;
      if (stepIndex >= 6) nodeVal = 1;
      if (stepIndex >= 13) nodeVal = 3;
      if (stepIndex >= 16) nodeVal = 1;
      if (stepIndex >= 18) nodeVal = 4;
      if (stepIndex >= 21) nodeVal = 2;
      if (stepIndex >= 23) nodeVal = 0;

      if (stepIndex === 4 || stepIndex === 5) neighborVal = 1;
      if (stepIndex === 11 || stepIndex === 12) neighborVal = 3;
      if (stepIndex === 17) neighborVal = 4;

      if ((lineNum === 7 || lineNum === 8 || lineNum === 9 || lineNum === 11) && nodeVal !== -1) {
        return `node: ${nodeVal}`;
      }
      if ((lineNum === 10 || lineNum === 11) && neighborVal !== -1) {
        return `neighbor: ${neighborVal}`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
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
    }
  }
};
