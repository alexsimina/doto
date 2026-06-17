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
    }
  ]
};
