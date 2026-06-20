export const data = {
  "presentation": "### Algoritmul lui Tarjan (SCC)\n\nAlgoritmul lui Tarjan identifică componentele tare conexe ale unui graf orientat într-o **singură trecere DFS**.\n\nFiecare nod primește un număr de ordine unic (`tin`) și un indice de accesibilitate (`low`). Nodurile sunt stocate pe o stivă pe măsură ce sunt vizitate. Când pentru un nod $u$ avem `low[u] == tin[u]`, acesta devine rădăcina unei componente tare conexe.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - o singură parcurgere DFS.\n- **Spațiu:** $O(V)$ - pentru vectorii `tin`, `low`, `onStack` și stivă.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Puncte de articulație și Punți**: Concepte similare în grafuri neorientate.",
  "applications": "### Aplicații Reale\n\n- Optimizarea compilatoarelor.\n- Detecția deadlock-urilor în sisteme de operare.\n- Analiza rețelelor sociale complexe.",
  "code": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\n\nusing namespace std;\n\nconst int MAXN = 1005;\nvector<int> adj[MAXN];\nint tin[MAXN], low[MAXN];\nbool onStack[MAXN];\nstack<int> st;\nint timer = 0, sccCount = 0;\n\nvoid tarjan(int u) {\n    tin[u] = low[u] = ++timer;\n    st.push(u);\n    onStack[u] = true;\n\n    for (int v : adj[u]) {\n        if (tin[v] == 0) {\n            tarjan(v);\n            low[u] = min(low[u], low[v]);\n        } else if (onStack[v]) {\n            low[u] = min(low[u], tin[v]);\n        }\n    }\n\n    if (low[u] == tin[u]) {\n        sccCount++;\n        cout << \"SCC: \";\n        while (true) {\n            int v = st.top();\n            st.pop();\n            onStack[v] = false;\n            cout << v << \" \";\n            if (u == v) break;\n        }\n        cout << \"\\n\";\n    }\n}\n\nint main() {\n    adj[1].push_back(2);\n    adj[2].push_back(3);\n    adj[3].push_back(1);\n    adj[3].push_back(4);\n    \n    for (int i = 1; i <= 4; i++) {\n        if (tin[i] == 0) tarjan(i);\n    }\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 15,
      "text": "Începem apelul `tarjan` pentru nodul 1.",
      "blocksVisual": [
        {
          "label": "Nod",
          "groups": [
            [
              {
                "val": "u: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Incrementăm `timer`. Atribuim `tin[1] = low[1] = 1`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[1]: 1"
              },
              {
                "val": "low[1]: 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 1 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Marcăm că nodul 1 este pe stivă: `onStack[1] = true`.",
      "blocksVisual": [
        {
          "label": "onStack",
          "groups": [
            [
              {
                "val": "onStack[1]: true"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 1: [2]. Primul vecin este 2.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Verificăm dacă nodul 2 a fost vizitat. `tin[2] == 0` este adevărat.",
      "blocksVisual": [
        {
          "label": "Vizitat check",
          "groups": [
            [
              {
                "val": "tin[2]: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Apelăm recursiv `tarjan(2)`.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "tarjan(2)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Pentru nodul 2: `tin[2] = low[2] = 2`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[2]: 2"
              },
              {
                "val": "low[2]: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 2 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 2: [3]. Apelăm `tarjan(3)`.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "tarjan(3)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Pentru nodul 3: `tin[3] = low[3] = 3`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[3]: 3"
              },
              {
                "val": "low[3]: 3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 3 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 3: [1, 4]. Începem cu vecinul 1.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Verificăm dacă nodul 1 a fost vizitat. Este vizitat (`tin[1] == 1`).",
      "blocksVisual": []
    },
    {
      "line": 24,
      "text": "Nodul 1 este pe stivă, deci avem muchie de întoarcere. Actualizăm `low[3] = min(low[3], tin[1]) = 1`.",
      "blocksVisual": [
        {
          "label": "low[3]",
          "groups": [
            [
              {
                "val": "low[3]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Trecem la celălalt vecin al lui 3, care este nodul 4.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Nodul 4 nu este vizitat. Apelăm recursiv `tarjan(4)`.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "tarjan(4)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 4: `tin[4] = low[4] = 4`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[4]: 4"
              },
              {
                "val": "low[4]: 4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 4 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Nodul 4 nu are vecini.",
      "blocksVisual": []
    },
    {
      "line": 28,
      "text": "Verificăm pentru 4: `low[4] == tin[4] == 4`. Am găsit o componentă!",
      "blocksVisual": []
    },
    {
      "line": 31,
      "text": "Extragem din stivă până la nodul 4 inclusiv. Componenta este {4}.",
      "blocksVisual": [
        {
          "label": "SCC",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Revenim în apelul lui 3. Actualizăm `low[3] = min(low[3], low[4]) = min(1, 4) = 1`.",
      "blocksVisual": [
        {
          "label": "low[3]",
          "groups": [
            [
              {
                "val": "low[3]: 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Ne întoarcem în 1. Avem `low[1] == tin[1] == 1`. Extragem stiva: obținem componenta {3, 2, 1}.",
      "blocksVisual": [
        {
          "label": "SCC",
          "groups": [
            [
              {
                "val": "3, 2, 1",
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
      let nodeVal = -1, idVal = 0;
      const ids = [-1, -1, -1, -1, -1];
      const low = [-1, -1, -1, -1, -1];
      if (stepIndex >= 1) { nodeVal = 0; ids[0] = 0; low[0] = 0; idVal = 1; }
      if (stepIndex >= 3) { nodeVal = 1; ids[1] = 1; low[1] = 1; idVal = 2; }
      if (stepIndex >= 5) { nodeVal = 3; ids[3] = 2; low[3] = 2; idVal = 3; }
      if (stepIndex >= 9) { nodeVal = 2; ids[2] = 3; low[2] = 1; idVal = 4; }
      if (stepIndex >= 13) { nodeVal = 4; ids[4] = 4; low[4] = 0; idVal = 5; }
      globalVars.push({ name: 'adj', type: 'std::vector<std::vector<int>>&', val: 'Directed graph', expandable: true });
      globalVars.push({ name: 'ids', type: 'std::vector<int>', val: `{${ids.map(v => v === -1 ? '-' : v).join(', ')}}`, expandable: false });
      globalVars.push({ name: 'low', type: 'std::vector<int>', val: `{${low.map(v => v === -1 ? '-' : v).join(', ')}}`, expandable: false });
      if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
      vars.push({ name: 'id', type: 'int', val: idVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 1) frames.unshift({ name: `tarjanDFS(node=${nodeVal !== -1 ? nodeVal : 0})`, file: 'solution.cpp', line: activeLine });
      if (nodeVal !== -1) inlineVal = `node: ${nodeVal}, id: ${idVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
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
            desc = `id/low: ${ids[idNum - 1]}/${low[idNum - 1]}`;
          }
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === nodeVal);
          return { ...e, active };
        })
      };
    }
  }
};
