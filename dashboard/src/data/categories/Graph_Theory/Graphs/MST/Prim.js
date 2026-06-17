export const data = {
  "presentation": "### Algoritmul lui Prim (MST)\n\nAlgoritmul lui Prim construiește Arborele Parțial de Cost Minim (MST) pornind de la un singur nod rădăcină și extinzând progresiv arborele. La fiecare pas, se selectează o muchie minimă $e = (u, v)$ unde $u \\in \\text{MST}$ și $v \\notin \\text{MST}$.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(E \\log V)$ - cu priority queue.\n- **Spațiu:** $O(V + E)$ - memorarea grafului.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Varianta cu tablou**: utilă pe grafuri dense, având complexitate $O(V^2)$.",
  "applications": "### Aplicații Reale\n\n- Optimizarea cablurilor de rețea.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\ntypedef pair<int, int> pii;\nconst int MAXN = 10005;\nvector<pii> adj[MAXN];\nbool inMST[MAXN];\n\nint prim(int start, int V) {\n    priority_queue<pii, vector<pii>, greater<pii>> pq;\n    int totalCost = 0;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        int cost = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        \n        if (inMST[u]) continue;\n        \n        inMST[u] = true;\n        totalCost += cost;\n        \n        for (auto edge : adj[u]) {\n            int v = edge.second;\n            int w = edge.first;\n            if (!inMST[v]) {\n                pq.push({w, v});\n            }\n        }\n    }\n    return totalCost;\n}\n\nint main() {\n    int V = 4;\n    adj[0].push_back({4, 1}); adj[1].push_back({4, 0});\n    adj[0].push_back({1, 2}); adj[2].push_back({1, 0});\n    adj[1].push_back({2, 2}); adj[2].push_back({2, 1});\n    adj[1].push_back({5, 3}); adj[3].push_back({5, 1});\n    adj[2].push_back({8, 3}); adj[3].push_back({8, 2});\n    prim(0, V);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 12,
      "text": "Începem executarea algoritmului lui Prim.",
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
      "text": "Inițializăm coada de priorități `pq` (min-heap).",
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
      "line": 14,
      "text": "Setăm `totalCost = 0`.",
      "blocksVisual": [
        {
          "label": "totalCost",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Introducem nodul de pornire 0 în heap cu costul 0.",
      "blocksVisual": [
        {
          "label": "Queue",
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
      "text": "Intrăm în buclă: coada nu este goală.",
      "blocksVisual": [
        {
          "label": "Queue",
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
      "text": "Preluăm muchia din vârful heap-ului: cost = 0.",
      "blocksVisual": [
        {
          "label": "cost",
          "groups": [
            [
              {
                "val": "cost: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Preluăm nodul țintă: `u = 0`.",
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
      "text": "Pop din coadă.",
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
      "line": 22,
      "text": "Verificăm dacă nodul 0 este deja în MST. Nu este vizitat.",
      "blocksVisual": [
        {
          "label": "inMST check",
          "groups": [
            [
              {
                "val": "inMST[0]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adăugăm nodul 0 la MST: `inMST[0] = true`.",
      "blocksVisual": [
        {
          "label": "inMST",
          "groups": [
            [
              {
                "val": "inMST[0]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Adunăm costul curent: `totalCost` rămâne 0.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Parcurgem vecinii nodului 0: 1 (cost 4) și 2 (cost 1).",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 1"
              },
              {
                "val": "v: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Nodul 1 nu este în MST, îl punem în heap: `{4, 1}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{4, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Nodul 2 nu este în MST, îl punem în heap: `{1, 2}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{1, 2}"
              },
              {
                "val": "{4, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Reluăm bucla. Heap-ul scoate muchia minimă: `{1, 2}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{1, 2}"
              },
              {
                "val": "{4, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Extragem nodul `u = 2` cu `cost = 1`.",
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
      "text": "Marcăm `inMST[2] = true`.",
      "blocksVisual": [
        {
          "label": "inMST",
          "groups": [
            [
              {
                "val": "inMST[2]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Actualizăm `totalCost = 0 + 1 = 1`.",
      "blocksVisual": [
        {
          "label": "totalCost",
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
      "line": 27,
      "text": "Explorăm vecinii lui 2: 1 (cost 2) și 3 (cost 8).",
      "blocksVisual": []
    },
    {
      "line": 30,
      "text": "Punem `{2, 1}` și `{8, 3}` în heap.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{2, 1}"
              },
              {
                "val": "{4, 1}"
              },
              {
                "val": "{8, 3}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Etapa următoare extrage `{2, 1}`, adăugând nodul 1 la MST cu costul 2. La final se adaugă nodul 3 cu costul 5. Cost final = 8.",
      "blocksVisual": [
        {
          "label": "Cost Final",
          "groups": [
            [
              {
                "val": "8"
              }
            ]
          ]
        }
      ]
    }
  ]
};
