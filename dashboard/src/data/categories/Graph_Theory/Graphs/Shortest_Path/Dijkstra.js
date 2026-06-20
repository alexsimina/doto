export const data = {
  "presentation": "### Algoritmul lui Dijkstra\n\nAlgoritmul lui Dijkstra determină cele mai scurte drumuri de la un nod sursă la toate celelalte noduri dintr-un graf ponderat cu **costuri non-negative** ($w(e) \\ge 0$).",
  "complexity": "### Complexitate\n\n- **Timp:** $O(E \\log V)$ - cu ajutorul unui heap binar.\n- **Spațiu:** $O(V + E)$ - pentru listele de adiacență și elementele stocate în coadă.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Ponderi negative**: Dijkstra **nu funcționează** corect pe grafuri cu muchii negative.",
  "applications": "### Aplicații Reale\n\n- Calcularea rutelor pe hărți electronice.\n- Rutarea pachetelor de date pe Internet (protocolul OSPF).",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\nconst int INF = 1e9;\n\nstruct Edge { int to, weight; };\n\nvoid dijkstra(int start, int V, vector<vector<Edge>>& adj) {\n    vector<int> dist(V, INF);\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    \n    dist[start] = 0;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        int d = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        \n        if (d > dist[u]) continue;\n        \n        for (Edge e : adj[u]) {\n            if (dist[u] + e.weight < dist[e.to]) {\n                dist[e.to] = dist[u] + e.weight;\n                pq.push({dist[e.to], e.to});\n            }\n        }\n    }\n    \n    for (int i = 0; i < V; i++) {\n        cout << \"0 -> \" << i << \" : \" << dist[i] << \"\\n\";\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<Edge>> adj(V);\n    adj[0].push_back({1, 10}); adj[0].push_back({2, 3});\n    adj[1].push_back({3, 2});\n    adj[2].push_back({1, 1}); adj[2].push_back({3, 8}); adj[2].push_back({4, 2});\n    adj[4].push_back({3, 9});\n    \n    dijkstra(0, V, adj);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 10,
      "text": "Începem execuția funcției `dijkstra` pornind din nodul 0.",
      "blocksVisual": [
        {
          "label": "Start",
          "groups": [
            [
              {
                "val": "start: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Inițializăm vectorul de distanțe cu valoarea infinită ($10^9$) pentru toate nodurile, iar pentru sursă cu 0.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[0]: 0",
                "active": true
              },
              {
                "val": "dist[1]: INF"
              },
              {
                "val": "dist[2]: INF"
              },
              {
                "val": "dist[3]: INF"
              },
              {
                "val": "dist[4]: INF"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Declarăm Min-Heap-ul `pq` (coada de priorități) pentru a extrage perechile `{distanță, nod}`.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Salvăm distanța 0 pentru sursa 0: `dist[0] = 0`.",
      "blocksVisual": [
        {
          "label": "dist[0]",
          "groups": [
            [
              {
                "val": "dist[0]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Adăugăm perechea `{0, 0}` în heap.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            [
              {
                "val": "{0, 0}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intrăm în buclă: coada nu este goală, conține starea `{0, 0}`.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            [
              {
                "val": "{0, 0}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Preluăm distanța minimă din vârful cozii: `d = 0`.",
      "blocksVisual": [
        {
          "label": "d",
          "groups": [
            [
              {
                "val": "d: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Preluăm nodul cel mai apropiat: `u = 0`.",
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
      "line": 20,
      "text": "Eliminăm starea `{0, 0}` din heap. Coada rămâne goală.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Verificăm dacă distanța retrasă `d` este mai mare decât cea mai bună distanță curentă. `0 > 0` este fals, continuăm.",
      "blocksVisual": []
    },
    {
      "line": 24,
      "text": "Parcurgem muchiile de ieșire ale nodului 0: (0->1, pondere 10) și (0->2, pondere 3). Începem cu 1.",
      "blocksVisual": [
        {
          "label": "Muchie curentă",
          "groups": [
            [
              {
                "val": "0 -> 1 (w: 10)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Relaxăm drumul spre 1: `dist[0] + 10 = 10` < `dist[1]` (care este INF). Actualizăm `dist[1] = 10`.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[1]: 10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Adăugăm `{10, 1}` în coada de priorități.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            [
              {
                "val": "{10, 1}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Trecem la a doua muchie: 0->2 (pondere 3).",
      "blocksVisual": [
        {
          "label": "Muchie curentă",
          "groups": [
            [
              {
                "val": "0 -> 2 (w: 3)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Relaxăm drumul spre 2: `dist[0] + 3 = 3` < `dist[2]` (INF). Actualizăm `dist[2] = 3`.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[2]: 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Adăugăm `{3, 2}` în coada de priorități. Coada are acum: `[{3, 2}, {10, 1}]`.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            [
              {
                "val": "{3, 2}"
              },
              {
                "val": "{10, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Reluăm bucla. Heap-ul aduce la suprafață elementul minim `{3, 2}`.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            [
              {
                "val": "{3, 2}"
              },
              {
                "val": "{10, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Extragem `d = 3`.",
      "blocksVisual": [
        {
          "label": "d",
          "groups": [
            [
              {
                "val": "d: 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Extragem `u = 2`.",
      "blocksVisual": [
        {
          "label": "u",
          "groups": [
            [
              {
                "val": "u: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Parcurgem vecinii nodului 2: (2->1, pondere 1), (2->3, pondere 8), (2->4, pondere 2). Vizităm 2->1.",
      "blocksVisual": [
        {
          "label": "Muchie",
          "groups": [
            [
              {
                "val": "2 -> 1 (w: 1)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Relaxăm drumul spre 1: `dist[2] + 1 = 3 + 1 = 4` < `dist[1]` (care este 10). Actualizăm `dist[1] = 4`.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[1]: 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Adăugăm `{4, 1}` în coada de priorități.",
      "blocksVisual": [
        {
          "label": "Priority Queue",
          "groups": [
            [
              {
                "val": "{4, 1}"
              },
              {
                "val": "{10, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Următoarea muchie din 2 este 2->4 (pondere 2). Relaxăm `dist[4] = 5`.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[4]: 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "Continuăm procesarea restului de stări din heap. Obținem distanțele minime finale.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "dist[0]: 0"
              },
              {
                "val": "dist[1]: 4"
              },
              {
                "val": "dist[2]: 3"
              },
              {
                "val": "dist[3]: 6"
              },
              {
                "val": "dist[4]: 5"
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
      const dist = [0, 1000000000, 1000000000, 1000000000, 1000000000];
      let uVal = -1, dVal = -1;
      const pqState = [];
      if (stepIndex >= 2) { dist[0] = 0; pqState.push('{0,0}'); }
      if (stepIndex >= 3) { uVal = 0; dVal = 0; pqState.shift(); }
      if (stepIndex >= 4) { dist[2] = 3; dist[1] = 10; pqState.push('{3,2}'); pqState.push('{10,1}'); }
      if (stepIndex >= 5) { uVal = 2; dVal = 3; pqState.shift(); }
      if (stepIndex >= 6) { dist[1] = 4; dist[4] = 5; pqState.push('{4,1}'); pqState.push('{5,4}'); }
      if (stepIndex >= 7) { uVal = 1; dVal = 4; pqState.shift(); }
      if (stepIndex >= 8) { dist[3] = 6; }
      if (stepIndex >= 9) { uVal = 4; dVal = 5; }
      if (stepIndex >= 10) { }
      globalVars.push({ name: 'INF', type: 'const int', val: '1e9', expandable: false });
      globalVars.push({ name: 'dist', type: 'std::vector<int>', val: `{${dist.map(d => d >= 1000000000 ? 'INF' : d).join(', ')}}`, expandable: false });
      vars.push({ name: 'pq', type: 'priority_queue', val: pqState.length > 0 ? pqState.join(', ') : 'empty', expandable: false });
      if (uVal !== -1) vars.push({ name: 'u', type: 'int', val: uVal, expandable: false });
      if (dVal !== -1) vars.push({ name: 'd', type: 'int', val: dVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: 40 });
      if (stepIndex >= 1) frames.unshift({ name: 'dijkstra(start=0, V=5, adj)', file: 'solution.cpp', line: activeLine });
      if (uVal !== -1) inlineVal = `u: ${uVal}, d: ${dVal}`;
      else inlineVal = `start: 0`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
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
          
          const desc = `d=${dist[idNum] >= 1e9 ? 'INF' : dist[idNum]}`;
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === uVal);
          return { ...e, active };
        })
      };
    }
  }
};
