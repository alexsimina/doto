export const data = {
  "presentation": "### Prezentare Generală\n\nMinimum Spanning Tree (Arborele Parțial de Cost Minim). Dat fiind un graf neorientat, ponderat și conex, un MST este un subgraf care:\\n1. Este un arbore (nu are cicluri)\\n2. Conectează TOATE nodurile (este conex)\\n3. Suma costurilor muchiilor sale este minimă.\\n\\nCei mai cunoscuți algoritmi sunt Kruskal și Prim, ambii fiind abordări Greedy.\\n- **Kruskal**: Sortează toate muchiile crescător. Adaugă-le una câte una dacă nu formează un ciclu (folosind Disjoint Set Union - DSU).\\n- **Prim**: Pornește cu un nod oarecare. La fiecare pas, folosește un Priority Queue pentru a alege cea mai ieftină muchie care conectează porțiunea deja construită de un nod nou.",
  "complexity": "### Complexitate\n\nKruskal: O(E log E) pentru sortare muchii + O(E α(V)) pentru operațiile DSU.\\nPrim: O(E log V) cu un min-heap (Priority Queue).\\nRecomandare: Pentru grafuri rare (puține muchii), Kruskal e adesea mai ușor de scris. Pentru grafuri dense (E ~ V^2), Prim poate fi mai rapid.",
  "variations": "### Variații și Edge Cases\n\nMaximum Spanning Tree (se sortează muchiile descrescător), Second Best MST.",
  "applications": "### Aplicații\n\nProiectarea rețelelor de cabluri (ex: fibră optică) - conectarea tuturor orașelor cu cel mai mic cost posibil, designul circuitelor integrate.",
  "code": "\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// Structura Disjoint Set (Paduri de multimi disjuncte)\nstruct DSU {\n    vector<int> parent, rank;\n    DSU(int n) {\n        parent.resize(n); rank.resize(n, 0);\n        for(int i=0; i<n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    void unite(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;\n            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;\n            else { parent[rootJ] = rootI; rank[rootI]++; }\n        }\n    }\n};\n\nstruct Edge { int u, v, weight; };\n\nint kruskal(int V, vector<Edge>& edges) {\n    // 1. Sortam muchiile crescator dupa cost\n    sort(edges.begin(), edges.end(), [](Edge a, Edge b) {\n        return a.weight < b.weight;\n    });\n\n    DSU dsu(V);\n    int mst_cost = 0;\n    \n    // 2. Iteram prin muchii\n    for (Edge e : edges) {\n        if (dsu.find(e.u) != dsu.find(e.v)) { // Daca nu formeaza ciclu\n            dsu.unite(e.u, e.v);\n            mst_cost += e.weight;\n            cout << \"Adaug muchia: \" << e.u << \"-\" << e.v << \" (Cost \" << e.weight << \")\n\";\n        }\n    }\n    return mst_cost;\n}\n\nint main() {\n    int V = 4;\n    vector<Edge> edges = {\n        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},\n        {1, 3, 15}, {2, 3, 4}\n    };\n    \n    cout << \"Cost minim: \" << kruskal(V, edges) << \"\n\";\n    return 0;\n}\n",
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
      "line": 32,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
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
      "line": 36,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
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
      "line": 40,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
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
      "line": 41,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
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
      "line": 40,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
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
      "line": 41,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
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
