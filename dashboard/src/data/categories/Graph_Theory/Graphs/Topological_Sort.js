export const data = {
  "presentation": "### Sortare Topologică\n\nSortarea Topologică reprezintă o aranjare liniară a nodurilor unui graf orientat aciclic (DAG) astfel încât pentru fiecare muchie orientată $u \\to v$, nodul $u$ să apară înaintea nodului $v$ în ordinea finală.\n\nAlgoritmul lui **Kahn** funcționează prin calcularea gradelor de intrare (in-degree) ale tuturor nodurilor. Nodurile cu in-degree 0 nu depind de niciun alt nod și sunt introduse într-o coadă. Când un nod este procesat, muchiile care pornesc din el sunt simulate ca fiind șterse, scăzând in-degree-ul vecinilor săi.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - calcularea in-degree durează $O(V + E)$, iar fiecare nod și muchie este procesat exact o dată.\n- **Spațiu:** $O(V)$ - pentru coadă și vectorul `inDegree`.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Sortare Topologică bazată pe DFS**: Rulăm DFS și adăugăm nodurile într-o listă la finalizarea vizitei acestora.\n- **Detecția ciclurilor**: Dacă numărul de noduri din ordinea topologică rezultată este mai mic decât $V$.",
  "applications": "### Aplicații Reale\n\n- Rezolvarea dependențelor la compilarea fișierelor.\n- Instalarea pachetelor software.\n- Planificarea activităților cu condiții de precondiție.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvector<int> topologicalSort(int V, vector<vector<int>>& adj) {\n    vector<int> inDegree(V, 0);\n    for (int i = 0; i < V; ++i) {\n        for (int neighbor : adj[i]) {\n            inDegree[neighbor]++;\n        }\n    }\n    \n    queue<int> q;\n    for (int i = 0; i < V; ++i) {\n        if (inDegree[i] == 0) {\n            q.push(i);\n        }\n    }\n    \n    vector<int> topOrder;\n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        topOrder.push_back(u);\n        \n        for (int v : adj[u]) {\n            inDegree[v]--;\n            if (inDegree[v] == 0) {\n                q.push(v);\n            }\n        }\n    }\n    return topOrder;\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V);\n    adj[0].push_back(2);\n    adj[1].push_back(2);\n    adj[2].push_back(3);\n    adj[2].push_back(4);\n    adj[3].push_back(4);\n    \n    vector<int> res = topologicalSort(V, adj);\n    for (int node : res) cout << node << \" \";\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 7,
      "text": "Începem funcția `topologicalSort`.",
      "blocksVisual": [
        {
          "label": "Noduri",
          "groups": [
            [
              {
                "val": "V: 5"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm vectorul de in-degree cu 0 pentru toate nodurile.",
      "blocksVisual": [
        {
          "label": "inDegree",
          "groups": [
            [
              {
                "val": "inDegree[0]: 0"
              },
              {
                "val": "inDegree[1]: 0"
              },
              {
                "val": "inDegree[2]: 0"
              },
              {
                "val": "inDegree[3]: 0"
              },
              {
                "val": "inDegree[4]: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pornim calculul gradelor de intrare iterând prin noduri.",
      "blocksVisual": [
        {
          "label": "Calcul grade",
          "groups": [
            [
              {
                "val": "Start"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Iterăm prin vecinii fiecărui nod.",
      "blocksVisual": [
        {
          "label": "Muchiile",
          "groups": [
            [
              {
                "val": "Vizitare"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Incrementăm in-degree pentru fiecare nod țintă. La finalul buclei, valorile sunt calculate.",
      "blocksVisual": [
        {
          "label": "inDegree",
          "groups": [
            [
              {
                "val": "inDegree[0]: 0"
              },
              {
                "val": "inDegree[1]: 0"
              },
              {
                "val": "inDegree[2]: 2"
              },
              {
                "val": "inDegree[3]: 1"
              },
              {
                "val": "inDegree[4]: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Declarăm coada `q` pentru a reține nodurile cu in-degree 0.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Căutăm nodurile care nu au dependențe.",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Verificăm dacă `inDegree[0] == 0`.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "inDegree[0]: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Adăugăm nodul 0 în coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Verificăm dacă `inDegree[1] == 0`.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "inDegree[1]: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Adăugăm nodul 1 în coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "0"
              },
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
      "line": 22,
      "text": "Declarăm vectorul `topOrder` în care vom stoca rezultatul final.",
      "blocksVisual": [
        {
          "label": "topOrder",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Intrăm în bucla principală: coada conține [0, 1].",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Extragem elementul din fața cozii: `u = 0`.",
      "blocksVisual": [
        {
          "label": "u",
          "groups": [
            [
              {
                "val": "u: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Scoatem elementul din coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Adăugăm nodul 0 în ordinea topologică.",
      "blocksVisual": [
        {
          "label": "topOrder",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Explorăm vecinii lui 0, adică nodul 2.",
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
      "line": 29,
      "text": "Decrementăm gradul nodului 2: `inDegree[2]` devine 1.",
      "blocksVisual": [
        {
          "label": "inDegree",
          "groups": [
            [
              {
                "val": "inDegree[2]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Verificăm dacă `inDegree[2] == 0`. Este 1, deci nu-l punem în coadă.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Mergem la următorul pas din buclă. Extragem `u = 1`.",
      "blocksVisual": [
        {
          "label": "u",
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
      "line": 26,
      "text": "Adăugăm nodul 1 în `topOrder`.",
      "blocksVisual": [
        {
          "label": "topOrder",
          "groups": [
            [
              {
                "val": "0"
              },
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
      "line": 29,
      "text": "Decrementăm gradul vecinului 2: `inDegree[2]` devine 0.",
      "blocksVisual": [
        {
          "label": "inDegree",
          "groups": [
            [
              {
                "val": "inDegree[2]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Întrucât `inDegree[2]` a ajuns la 0, îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
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
      "line": 35,
      "text": "Procesăm în continuare nodul 2, care va debloca nodul 3, care va debloca nodul 4. Returnăm ordinea topologică completă.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "topOrder: [0, 1, 2, 3, 4]"
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
      const inDegCurr = [0, 0, 2, 1, 2];
      const topOrder = [];
      const qState = [];
      let uVal = -1, vVal = -1;
      if (stepIndex >= 4) { }
      if (stepIndex >= 7) { qState.push(0); }
      if (stepIndex >= 9) { qState.push(1); }
      if (stepIndex >= 13) { uVal = 0; }
      if (stepIndex >= 14) { if (qState.length) qState.shift(); topOrder.push(0); }
      if (stepIndex >= 16) { vVal = 2; inDegCurr[2] = 1; }
      if (stepIndex >= 19) { uVal = 1; topOrder.push(1); }
      if (stepIndex >= 21) { inDegCurr[2] = 0; qState.push(2); vVal = 2; }
      if (stepIndex >= 22) { uVal = 2; topOrder.push(2); }
      if (stepIndex >= 23) { topOrder.push(3, 4); }
      globalVars.push({ name: 'adj', type: 'std::vector<std::vector<int>>', val: '5-node DAG', expandable: true });
      globalVars.push({ name: 'inDegree', type: 'std::vector<int>', val: `{${inDegCurr.join(', ')}}`, expandable: false });
      if (uVal !== -1) vars.push({ name: 'u', type: 'int', val: uVal, expandable: false });
      if (vVal !== -1) vars.push({ name: 'v', type: 'int', val: vVal, expandable: false });
      vars.push({ name: 'q', type: 'std::queue<int>', val: qState.length > 0 ? `{${qState.join(', ')}}` : 'empty', expandable: false });
      vars.push({ name: 'topOrder', type: 'std::vector<int>', val: topOrder.length > 0 ? `[${topOrder.join(', ')}]` : '[]', expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: 44 });
      if (stepIndex >= 1) frames.unshift({ name: 'topologicalSort(V=5, adj)', file: 'solution.cpp', line: activeLine });
      if (uVal !== -1) inlineVal = `u: ${uVal}`;
      else if (vVal !== -1) inlineVal = `v: ${vVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
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
    }
  }
};
