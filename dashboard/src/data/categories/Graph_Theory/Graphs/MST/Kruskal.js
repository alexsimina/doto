export const data = {
  "presentation": "### Algoritmul lui Kruskal (MST)\n\nAlgoritmul lui Kruskal găsește Arborele Parțial de Cost Minim (MST) al unui graf ponderat și neorientat folosind o strategie **greedy**. El sortează muchiile după ponderi, i.e., $w(e_1) \\le w(e_2) \\le \\dots \\le w(e_m)$ și le adaugă dacă nu creează cicluri.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(E \\log E) = O(E \\log V)$ - pasul dominant este sortarea.\n- **Spațiu:** $O(V)$ - necesar pentru DSU.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Maximum Spanning Tree**: Arborele parțial de pondere maximă.",
  "applications": "### Aplicații Reale\n\n- Conectarea rețelelor urbane cu cost minim.",
  "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct DSU {\n    vector<int> parent, rank;\n    DSU(int n) {\n        parent.resize(n); rank.resize(n, 0);\n        for(int i=0; i<n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]);\n    }\n    void unite(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;\n            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;\n            else { parent[rootJ] = rootI; rank[rootI]++; }\n        }\n    }\n};\n\nstruct Edge { int u, v, weight; };\n\nint kruskal(int V, vector<Edge>& edges) {\n    sort(edges.begin(), edges.end(), [](Edge a, Edge b) {\n        return a.weight < b.weight;\n    });\n\n    DSU dsu(V);\n    int mst_cost = 0;\n    \n    for (Edge e : edges) {\n        if (dsu.find(e.u) != dsu.find(e.v)) {\n            dsu.unite(e.u, e.v);\n            mst_cost += e.weight;\n        }\n    }\n    return mst_cost;\n}\n\nint main() {\n    int V = 4;\n    vector<Edge> edges = {\n        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},\n        {1, 3, 15}, {2, 3, 4}\n    };\n    kruskal(V, edges);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 30,
      "text": "Începem funcția `kruskal` pentru calcularea MST.",
      "blocksVisual": [
        {
          "label": "Start",
          "groups": [
            [
              {
                "val": "edges size: 5"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Sortează muchiile crescător. Ordinea devine: (2-3, w:4), (0-3, w:5), (0-2, w:6), (0-1, w:10), (1-3, w:15).",
      "blocksVisual": [
        {
          "label": "Muchii sortate",
          "groups": [
            [
              {
                "val": "2-3: 4"
              },
              {
                "val": "0-3: 5"
              },
              {
                "val": "0-2: 6"
              },
              {
                "val": "0-1: 10"
              },
              {
                "val": "1-3: 15"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Inițializăm structura DSU. Fiecare nod are ca părinte pe el însuși.",
      "blocksVisual": [
        {
          "label": "DSU parents",
          "groups": [
            [
              {
                "val": "parent[0]: 0"
              },
              {
                "val": "parent[1]: 1"
              },
              {
                "val": "parent[2]: 2"
              },
              {
                "val": "parent[3]: 3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Inițializăm costul total `mst_cost = 0`.",
      "blocksVisual": [
        {
          "label": "mst_cost",
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
      "line": 38,
      "text": "Iterăm prin muchii. Prima muchie considerată: 2->3 (pondere 4).",
      "blocksVisual": [
        {
          "label": "Muchie curentă",
          "groups": [
            [
              {
                "val": "2 - 3 (w: 4)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Apelăm `find(2)` și `find(3)` pentru a verifica dacă sunt deja conectate. Reprezentanții sunt 2 și 3. Mulțimi diferite!",
      "blocksVisual": []
    },
    {
      "line": 40,
      "text": "Unim mulțimile nodurilor 2 și 3. `parent[3]` devine 2.",
      "blocksVisual": [
        {
          "label": "DSU parents",
          "groups": [
            [
              {
                "val": "parent[0]: 0"
              },
              {
                "val": "parent[1]: 1"
              },
              {
                "val": "parent[2]: 2"
              },
              {
                "val": "parent[3]: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Actualizăm costul MST: `mst_cost = 0 + 4 = 4`.",
      "blocksVisual": [
        {
          "label": "mst_cost",
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
      "line": 38,
      "text": "Trecem la a doua muchie din listă: 0->3 (pondere 5).",
      "blocksVisual": [
        {
          "label": "Muchie curentă",
          "groups": [
            [
              {
                "val": "0 - 3 (w: 5)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Verificăm reprezentanții: `find(0)` este 0, iar `find(3)` este 2. Mulțimi diferite!",
      "blocksVisual": []
    },
    {
      "line": 40,
      "text": "Unim cele două mulțimi. `parent[2]` devine 0.",
      "blocksVisual": [
        {
          "label": "DSU parents",
          "groups": [
            [
              {
                "val": "parent[0]: 0"
              },
              {
                "val": "parent[2]: 0",
                "active": true
              },
              {
                "val": "parent[3]: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Actualizăm costul MST: `mst_cost = 4 + 5 = 9`.",
      "blocksVisual": [
        {
          "label": "mst_cost",
          "groups": [
            [
              {
                "val": "9",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 38,
      "text": "Trecem la a treia muchie: 0->2 (pondere 6).",
      "blocksVisual": [
        {
          "label": "Muchie curentă",
          "groups": [
            [
              {
                "val": "0 - 2 (w: 6)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Verificăm reprezentanții: `find(0)` este 0, iar `find(2)` este tot 0 (reprezentantul final prin legătura 2->0). Reprezentanții sunt egali!",
      "blocksVisual": []
    },
    {
      "line": 38,
      "text": "Muchiile 0 și 2 sunt deja în aceeași componentă conexă. Sărim muchia 0->2 pentru a nu forma un ciclu.",
      "blocksVisual": []
    },
    {
      "line": 38,
      "text": "Trecem la a patra muchie: 0->1 (pondere 10).",
      "blocksVisual": [
        {
          "label": "Muchie curentă",
          "groups": [
            [
              {
                "val": "0 - 1 (w: 10)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Verificăm reprezentanții: `find(0)` este 0, iar `find(1)` este 1. Sunt diferiți.",
      "blocksVisual": []
    },
    {
      "line": 40,
      "text": "Unim mulțimile: `parent[1]` devine 0.",
      "blocksVisual": [
        {
          "label": "DSU parents",
          "groups": [
            [
              {
                "val": "parent[1]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Actualizăm costul: `mst_cost = 9 + 10 = 19`.",
      "blocksVisual": [
        {
          "label": "mst_cost",
          "groups": [
            [
              {
                "val": "19",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 44,
      "text": "Toate nodurile au fost conectate în MST. Algoritmul returnează costul final de 19.",
      "blocksVisual": [
        {
          "label": "Cost Final",
          "groups": [
            [
              {
                "val": "19"
              }
            ]
          ]
        }
      ]
    }
  ]
};
