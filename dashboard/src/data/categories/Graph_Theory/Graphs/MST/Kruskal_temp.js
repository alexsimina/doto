module.exports = {
  "presentation": "### Prezentare Generală\n\nMinimum Spanning Tree (Arborele Parțial de Cost Minim). Dat fiind un graf neorientat, ponderat și conex, un MST este un subgraf care:\\n1. Este un arbore (nu are cicluri)\\n2. Conectează TOATE nodurile (este conex)\\n3. Suma costurilor muchiilor sale este minimă.\\n\\nCei mai cunoscuți algoritmi sunt Kruskal și Prim, ambii fiind abordări Greedy.\\n- **Kruskal**: Sortează toate muchiile crescător. Adaugă-le una câte una dacă nu formează un ciclu (folosind Disjoint Set Union - DSU).\\n- **Prim**: Pornește cu un nod oarecare. La fiecare pas, folosește un Priority Queue pentru a alege cea mai ieftină muchie care conectează porțiunea deja construită de un nod nou.",
  "complexity": "### Complexitate\n\nKruskal: O(E log E) pentru sortare muchii + O(E α(V)) pentru operațiile DSU.\\nPrim: O(E log V) cu un min-heap (Priority Queue).\\nRecomandare: Pentru grafuri rare (puține muchii), Kruskal e adesea mai ușor de scris. Pentru grafuri dense (E ~ V^2), Prim poate fi mai rapid.",
  "variations": "### Variații și Edge Cases\n\nMaximum Spanning Tree (se sortează muchiile descrescător), Second Best MST.",
  "applications": "### Aplicații\n\nProiectarea rețelelor de cabluri (ex: fibră optică) - conectarea tuturor orașelor cu cel mai mic cost posibil, designul circuitelor integrate.",
  code: `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Structura Disjoint Set (Paduri de multimi disjuncte)
struct DSU {
    vector<int> parent, rank;
    DSU(int n) {
        parent.resize(n); rank.resize(n, 0);
        for(int i=0; i<n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    void unite(int i, int j) {
        int rootI = find(i), rootJ = find(j);
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else { parent[rootJ] = rootI; rank[rootI]++; }
        }
    }
};

struct Edge { int u, v, weight; };

int kruskal(int V, vector<Edge>& edges) {
    // 1. Sortam muchiile crescator dupa cost
    sort(edges.begin(), edges.end(), [](Edge a, Edge b) {
        return a.weight < b.weight;
    });

    DSU dsu(V);
    int mst_cost = 0;
    
    // 2. Iteram prin muchii
    for (Edge e : edges) {
        if (dsu.find(e.u) != dsu.find(e.v)) { // Daca nu formeaza ciclu
            dsu.unite(e.u, e.v);
            mst_cost += e.weight;
            cout << "Adaug muchia: " << e.u << "-" << e.v << " (Cost " << e.weight << ")
";
        }
    }
    return mst_cost;
}

int main() {
    int V = 4;
    vector<Edge> edges = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},
        {1, 3, 15}, {2, 3, 4}
    };
    
    cout << "Cost minim: " << kruskal(V, edges) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 32,
      "text": "Sortăm toate muchiile crescător. Inițial: [ (0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4) ].",
      "blocksVisual": [
        {
          "label": "Muchii Sortate",
          "groups": [
            [
              {
                "val": "2-3: 4",
                "active": true
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
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 36,
      "text": "DSU (Disjoint Set) se inițializează: Fiecare nod e în propriul set.",
      "blocksVisual": [
        {
          "label": "Seturi",
          "groups": [
            [
              {
                "val": "{0}"
              }
            ],
            [
              {
                "val": "{1}"
              }
            ],
            [
              {
                "val": "{2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 40,
      "text": "Alegem prima muchie: 2-3 (cost 4). 2 și 3 sunt în seturi diferite?",
      "blocksVisual": [
        {
          "label": "Verificare ciclu",
          "groups": [
            [
              {
                "val": "2 ∈ {2}",
                "active": true
              },
              {
                "val": "3 ∈ {3}",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "active"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 41,
      "text": "Da! Nu formează ciclu. Îi unim.",
      "blocksVisual": [
        {
          "label": "Unire",
          "groups": [
            [
              {
                "val": "{0}"
              }
            ],
            [
              {
                "val": "{1}"
              }
            ],
            [
              {
                "val": "{2, 3}",
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Cost",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 40,
      "text": "Alegem a doua muchie: 0-3 (cost 5). Seturile lui 0 și 3 sunt diferite.",
      "blocksVisual": [
        {
          "label": "Verificare ciclu",
          "groups": [
            [
              {
                "val": "0 ∈ {0}",
                "active": true
              },
              {
                "val": "3 ∈ {2, 3}",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 41,
      "text": "Unim setul lui 0 cu setul lui 3.",
      "blocksVisual": [
        {
          "label": "Unire",
          "groups": [
            [
              {
                "val": "{1}"
              }
            ],
            [
              {
                "val": "{0, 2, 3}",
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Cost",
          "groups": [
            [
              {
                "val": "4 + 5 = 9"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "0",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 40,
      "text": "Alegem a treia muchie: 0-2 (cost 6). 0 și 2 sunt în același set! Formează ciclu. O SĂRIM.",
      "blocksVisual": [
        {
          "label": "Skip",
          "groups": [
            [
              {
                "val": "0 ∈ {0, 2, 3}",
                "active": true
              },
              {
                "val": "2 ∈ {0, 2, 3}",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "0",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 40,
      "text": "Alegem a patra muchie: 0-1 (cost 10). Seturile sunt diferite.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "0 ∈ {0, 2, 3}",
                "active": true
              },
              {
                "val": "1 ∈ {1}",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "0",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 41,
      "text": "Le unim. Acum toate nodurile sunt în același set!",
      "blocksVisual": [
        {
          "label": "Arbore Finalizat",
          "groups": [
            [
              {
                "val": "{0, 1, 2, 3}",
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Cost",
          "groups": [
            [
              {
                "val": "9 + 10 = 19",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "0",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 46,
      "text": "Returnăm costul 19.",
      "blocksVisual": [
        {
          "label": "Gata!",
          "groups": [
            [
              {
                "val": "Cost MST: 19",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 50,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 80,
            "y": 160,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 160,
            "label": "3",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "0",
            "target": "1"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "APM",
        "url": "https://www.pbinfo.ro/probleme/588/apm",
        "desc": "Arbore parțial de cost minim clasic"
      }
    ],
    "medium": [
      {
        "title": "Min Cost to Connect All Points",
        "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
        "desc": "Kruskal / Prim pe puncte 2D"
      }
    ],
    "hard": [
      {
        "title": "Redundant Connection II",
        "url": "https://leetcode.com/problems/redundant-connection-ii/",
        "desc": "Grafuri orientate & DSU"
      }
    ]
  }
};
