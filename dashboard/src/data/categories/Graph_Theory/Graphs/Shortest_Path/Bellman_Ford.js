export const data = {
  "presentation": "### Algoritmul lui Bellman-Ford\n\nAlgoritmul lui Bellman-Ford calculează cele mai scurte drumuri de la o sursă unică la toate nodurile dintr-un graf ponderat, permițând existența **ponderilor negative**. Relaxarea muchiei se bazează pe inegalitatea triunghiulară: $dist[v] = \\min(dist[v], dist[u] + w(u, v))$.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V \\cdot E)$ - relaxăm cele $E$ muchii de $V-1$ ori.\n- **Spațiu:** $O(V)$ - vectorul de distanțe.",
  "variations": "### Variații și Cazuri Particulare\n\n- **SPFA**: O optimizare a algoritmului Bellman-Ford folosind o coadă.",
  "applications": "### Aplicații Reale\n\n- Protocolul de rutare RIP.\n- Arbitraj financiar (schimburi valutare).",
  "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\nconst int INF = 1e9;\n\nstruct Edge {\n    int u, v, weight;\n};\n\nvoid bellmanFord(int V, int E, int start, vector<Edge>& edges) {\n    vector<int> dist(V, INF);\n    dist[start] = 0;\n\n    for (int i = 1; i <= V - 1; i++) {\n        for (int j = 0; j < E; j++) {\n            int u = edges[j].u;\n            int v = edges[j].v;\n            int weight = edges[j].weight;\n            if (dist[u] != INF && dist[u] + weight < dist[v]) {\n                dist[v] = dist[u] + weight;\n            }\n        }\n    }\n\n    for (int j = 0; j < E; j++) {\n        int u = edges[j].u;\n        int v = edges[j].v;\n        int weight = edges[j].weight;\n        if (dist[u] != INF && dist[u] + weight < dist[v]) {\n            cout << \"Graful contine ciclu de cost negativ!\";\n            return;\n        }\n    }\n\n    for (int i = 0; i < V; i++) {\n        cout << \"0 -> \" << i << \" : \" << dist[i] << \"\\n\";\n    }\n}\n\nint main() {\n    int V = 4, E = 4;\n    vector<Edge> edges = {\n        {0, 1, 4},\n        {0, 2, 5},\n        {2, 1, -2},\n        {1, 3, 3}\n    };\n    bellmanFord(V, E, 0, edges);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 12,
      "text": "Începem funcția `bellmanFord`.",
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
      "line": 13,
      "text": "Inițializăm distanțele cu INF, iar dist[start] = 0.",
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
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Marcăm sursa ca fiind descoperită cu distanța 0.",
      "blocksVisual": []
    },
    {
      "line": 16,
      "text": "Pornim bucla exterioară pentru a relaxa muchiile de $V-1$ ori (în cazul nostru 3 ori). Prima etapă `i = 1`.",
      "blocksVisual": [
        {
          "label": "Etapă i",
          "groups": [
            [
              {
                "val": "i: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Parcurgem toate cele $E=4$ muchii. Prima muchie este 0->1 (pondere 4).",
      "blocksVisual": [
        {
          "label": "Muchie",
          "groups": [
            [
              {
                "val": "0 -> 1 (w: 4)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Extragem extremitățile `u = 0`, `v = 1` și ponderea `weight = 4`.",
      "blocksVisual": []
    },
    {
      "line": 21,
      "text": "Relaxăm muchia 0->1: `dist[0] + 4 = 4` < `dist[1]` (INF). Actualizăm `dist[1] = 4`.",
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
      "line": 17,
      "text": "Următoarea muchie este 0->2 (pondere 5).",
      "blocksVisual": [
        {
          "label": "Muchie",
          "groups": [
            [
              {
                "val": "0 -> 2 (w: 5)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Relaxăm muchia 0->2: `dist[0] + 5 = 5` < `dist[2]` (INF). Actualizăm `dist[2] = 5`.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[2]: 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Următoarea muchie este 2->1 (pondere -2).",
      "blocksVisual": [
        {
          "label": "Muchie",
          "groups": [
            [
              {
                "val": "2 -> 1 (w: -2)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Relaxăm muchia 2->1: `dist[2] + (-2) = 3` < `dist[1]` (care era 4). Noul `dist[1]` devine 3.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[1]: 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "A patra muchie este 1->3 (pondere 3).",
      "blocksVisual": [
        {
          "label": "Muchie",
          "groups": [
            [
              {
                "val": "1 -> 3 (w: 3)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Relaxăm muchia 1->3: `dist[1] + 3 = 3 + 3 = 6` < `dist[3]` (INF). Actualizăm `dist[3] = 6`.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "dist[3]: 6",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Trecem la etapa `i = 2` din relaxări.",
      "blocksVisual": [
        {
          "label": "Etapă i",
          "groups": [
            [
              {
                "val": "i: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Trecem prin muchii pentru a doua oară.",
      "blocksVisual": []
    },
    {
      "line": 21,
      "text": "Relaxăm muchiile. Deoarece valorile sunt deja minime, nu se modifică nimic.",
      "blocksVisual": []
    },
    {
      "line": 16,
      "text": "Trecem la etapa `i = 3` (ultima etapă de relaxare).",
      "blocksVisual": [
        {
          "label": "Etapă i",
          "groups": [
            [
              {
                "val": "i: 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Relaxările s-au finalizat fără alte modificări.",
      "blocksVisual": []
    },
    {
      "line": 26,
      "text": "Începem testul de detecție a ciclurilor negative. Trecem din nou prin toate muchiile.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "Ciclu negativ?"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Verificăm dacă `dist[u] + weight < dist[v]`. Nicio muchie nu mai respectă această condiție.",
      "blocksVisual": []
    },
    {
      "line": 37,
      "text": "Afișăm rezultatele calculate cu succes.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "dist[0]: 0"
              },
              {
                "val": "dist[1]: 3"
              },
              {
                "val": "dist[2]: 5"
              },
              {
                "val": "dist[3]: 6"
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
      const dist = [0, 1000000000, 1000000000, 1000000000];
      let iVal = 1, jVal = 0;
      let uVal = -1, vVal = -1, wVal = -1;
      if (stepIndex >= 1) { dist[0] = 0; }
      if (stepIndex >= 3) { uVal = 0; vVal = 1; wVal = 4; dist[1] = 4; }
      if (stepIndex >= 4) { jVal = 1; uVal = 0; vVal = 2; wVal = 5; dist[2] = 5; }
      if (stepIndex >= 5) { jVal = 2; uVal = 2; vVal = 1; wVal = -2; dist[1] = 3; }
      if (stepIndex >= 6) { jVal = 3; uVal = 1; vVal = 3; wVal = 3; dist[3] = 6; }
      if (stepIndex >= 7) { iVal = 2; jVal = 0; }
      globalVars.push({ name: 'INF', type: 'const int', val: '1e9', expandable: false });
      globalVars.push({ name: 'dist', type: 'std::vector<int>', val: `{${dist.map(d => d >= 1000000000 ? 'INF' : d).join(', ')}}`, expandable: false });
      if (uVal !== -1) vars.push({ name: 'u', type: 'int', val: uVal, expandable: false });
      if (vVal !== -1) vars.push({ name: 'v', type: 'int', val: vVal, expandable: false });
      if (wVal !== -1) vars.push({ name: 'weight', type: 'int', val: wVal, expandable: false });
      vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
      vars.push({ name: 'j', type: 'int', val: jVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: 42 });
      if (stepIndex >= 1) frames.unshift({ name: 'bellmanFord(V=4, E=4, start=0)', file: 'solution.cpp', line: activeLine });
      if (uVal !== -1) inlineVal = `u: ${uVal}, v: ${vVal}, w: ${wVal}`;
      else inlineVal = `i: ${iVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
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
          
          const desc = `d=${dist[idNum] >= 1e9 ? 'INF' : dist[idNum]}`;
          return { ...n, state, desc };
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
