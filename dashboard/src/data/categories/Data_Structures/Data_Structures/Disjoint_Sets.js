export const data = {
  "presentation": "### Prezentare Generală\n\n**Disjoint Set Union (DSU)**, cunoscută și sub numele de **Păduri de Mulțimi Disjuncte (Union-Find)**, este o structură de date concepută pentru a gestiona eficient o partiție a unei mulțimi de elemente în submulțimi disjuncte.\n\nEa oferă două operații fundamentale:\n- **Find($x$):** Determină din ce mulțime face parte elementul $x$ (returnează un reprezentant unic sau rădăcina subarborelui lui $x$).\n- **Union($x$, $y$):** Unește mulțimile din care fac parte elementele $x$ și $y$ într-o singură mulțime.\n\nFiecare mulțime este reprezentată sub forma unui arbore, unde rădăcina arborelui servește drept reprezentant al mulțimii.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - Fără optimizări, operațiile pot dura $O(N)$ în cel mai rău caz.\n  - Folosind **Compresia Drumului (Path Compression)** și **Unirea după Rang (Union by Rank/Size)**, timpul amortizat per interogare devine $O(\\alpha(N))$, unde $\\alpha$ este inversa funcției Ackermann. Deoarece $\\alpha(N) \\le 4$ pentru orice valoare practică a lui $N$, operațiile se execută aproape instantaneu, adică în $O(1)$ amortizat.\n- **Spațiu:** $O(N)$ memorie pentru stocarea părinților (`parent`) și a rangurilor (`rank`).",
  "variations": "### Variații și Edge Cases\n\n1. **DSU cu Rollback:** În probleme unde trebuie să anulăm ultimele uniri (de tip Undo), nu putem folosi compresia drumului (pentru că modifică arborele ireversibil). Folosind doar unirea după rang, complexitatea crește la $O(\\log N)$ per operație, dar permite restaurarea stării anterioare prin salvarea modificărilor într-o stivă.\n2. **Kruskal pentru MST:** Algoritmul lui Kruskal pentru determinarea Arborelui Parțial de Cost Minim folosește DSU pentru a detecta și preveni formarea de cicluri la adăugarea muchiilor.",
  "applications": "### Aplicații\n\nOrice problemă de conectivitate dinamică: generarea labirinturilor (Kruskal Randomizat), găsirea componentelor conexe în imagine, clusterizarea datelor, determinarea relațiilor de rudenie sau de prietenie pe rețele sociale (Friends of friends).",
  "code": "\n#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nstruct DSU {\n    vector<int> parent;\n    vector<int> rank;\n\n    DSU(int n) {\n        parent.resize(n);\n        rank.resize(n, 0);\n        for (int i = 0; i < n; i++)\n            parent[i] = i; \n    }\n\n    int find(int i) {\n        if (parent[i] == i)\n            return i;\n        return parent[i] = find(parent[i]);\n    }\n\n    void unite(int i, int j) {\n        int rootI = find(i);\n        int rootJ = find(j);\n\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) {\n                parent[rootI] = rootJ;\n            } else if (rank[rootI] > rank[rootJ]) {\n                parent[rootJ] = rootI;\n            } else {\n                parent[rootJ] = rootI;\n                rank[rootI]++;\n            }\n        }\n    }\n};\n\nint main() {\n    DSU dsu(6);\n    dsu.unite(0, 2);\n    dsu.unite(4, 2);\n    dsu.unite(3, 1);\n    dsu.unite(5, 3);\n    dsu.unite(0, 5);\n    \n    if (dsu.find(4) == dsu.find(1))\n        cout << \"4 si 1 sunt in aceeasi multime (conectate)!\\n\";\n    \n    return 0;\n}\n",
  "explanations": [
    {
      "line": 42,
      "text": "Inițializăm structura DSU pentru 6 elemente (0..5). Fiecare element începe prin a fi propriul său părinte.",
      "blocksVisual": [
        {
          "label": "Inițializare",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->2"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->4"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": []
      }
    },
    {
      "line": 43,
      "text": "Apelăm unite(0, 2). Mai întâi căutăm reprezentantul lui 0 cu find(0) care returnează 0.",
      "blocksVisual": [
        {
          "label": "find(0)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->2"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->4"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": []
      }
    },
    {
      "line": 25,
      "text": "Căutăm reprezentantul lui 2 cu find(2) care returnează 2.",
      "blocksVisual": [
        {
          "label": "find(2)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->2"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->4"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": []
      }
    },
    {
      "line": 34,
      "text": "Deoarece sunt în mulțimi diferite și rangurile lor sunt egale, legăm 2 sub 0 (parent[2] = 0).",
      "blocksVisual": [
        {
          "label": "parent[2] = 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->4"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 44,
      "text": "Apelăm unite(4, 2). find(4) returnează 4.",
      "blocksVisual": [
        {
          "label": "find(4)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->4"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "find(2) îl caută pe părintele lui 2, care este 0. Cum 0 e rădăcină, returnează 0.",
      "blocksVisual": [
        {
          "label": "find(2) -> 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->4"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Legăm 4 sub 0 (parent[4] = 0). Acum mulțimea lui 0 conține elementele {0, 2, 4}.",
      "blocksVisual": [
        {
          "label": "parent[4] = 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 45,
      "text": "Apelăm unite(3, 1). find(3) returnează 3.",
      "blocksVisual": [
        {
          "label": "find(3)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 25,
      "text": "find(1) returnează 1.",
      "blocksVisual": [
        {
          "label": "find(1)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->1"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 34,
      "text": "Legăm 1 sub 3 (parent[1] = 3). Mulțimea lui 3 conține {3, 1}.",
      "blocksVisual": [
        {
          "label": "parent[1] = 3",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 46,
      "text": "Apelăm unite(5, 3). find(5) returnează 5.",
      "blocksVisual": [
        {
          "label": "find(5)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 25,
      "text": "find(3) returnează 3.",
      "blocksVisual": [
        {
          "label": "find(3) -> 3",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 34,
      "text": "Legăm 5 sub 3 (parent[5] = 3). Mulțimea lui 3 conține {3, 1, 5}.",
      "blocksVisual": [
        {
          "label": "parent[5] = 3",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 47,
      "text": "Acum apelăm unite(0, 5). find(0) returnează 0.",
      "blocksVisual": [
        {
          "label": "find(0) -> 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "find(5) ne trimite la 3, iar 3 la el însuși. Returnează 3.",
      "blocksVisual": [
        {
          "label": "find(5) -> 3",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->3"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 34,
      "text": "Rangul lui 0 este mai mare sau egal, deci legăm rădăcina 3 sub 0 (parent[3] = 0). Mulțimile s-au unit!",
      "blocksVisual": [
        {
          "label": "parent[3] = 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->0"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          },
          {
            "source": "3",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Testăm dacă 4 și 1 sunt în aceeași mulțime. Apelăm find(4) care returnează direct rădăcina 0.",
      "blocksVisual": [
        {
          "label": "find(4) -> 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->0"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          },
          {
            "source": "3",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Apelăm find(1). Părintele lui 1 este 3. Cum 3 nu este propriul său părinte, continuăm căutarea recursivă.",
      "blocksVisual": [
        {
          "label": "find(1) -> recursiv",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->0"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          },
          {
            "source": "3",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Mergem la părintele lui 3, care este 0. Deoarece 0 este rădăcină (parent[0]=0), returnăm 0.",
      "blocksVisual": [
        {
          "label": "find(3) -> 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->3"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->0"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "3",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          },
          {
            "source": "3",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Aplicăm Compresia Drumului (Path Compression)! Setăm părintele lui 1 direct la rădăcina 0: parent[1] = 0.",
      "blocksVisual": [
        {
          "label": "parent[1] = 0 (Path Compression)",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->0"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->0"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          },
          {
            "source": "3",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "0",
            "directed": true
          }
        ]
      }
    },
    {
      "line": 50,
      "text": "Ambele find-uri au returnat 0! Elementele sunt în aceeași mulțime. Mesajul 'sunt conectate' este afișat.",
      "blocksVisual": [
        {
          "label": "find(4) == find(1) = 0",
          "groups": [
            [
              {
                "val": "0->0"
              },
              {
                "val": "1->0"
              },
              {
                "val": "2->0"
              },
              {
                "val": "3->0"
              },
              {
                "val": "4->0"
              },
              {
                "val": "5->3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 150,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 350,
            "y": 250
          },
          {
            "id": "2",
            "label": "2",
            "x": 80,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 300,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 220,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 250,
            "y": 250
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0",
            "directed": true
          },
          {
            "source": "4",
            "target": "0",
            "directed": true
          },
          {
            "source": "5",
            "target": "3",
            "directed": true
          },
          {
            "source": "3",
            "target": "0",
            "directed": true
          },
          {
            "source": "1",
            "target": "0",
            "directed": true
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Disjoint Sets (Infoarena)",
        "url": "https://www.infoarena.ro/problema/disjoint",
        "desc": "Implementare clasica"
      },
      {
        "title": "Number of Connected Components",
        "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        "desc": "Verificare"
      }
    ],
    "medium": [
      {
        "title": "Redundant Connection",
        "url": "https://leetcode.com/problems/redundant-connection/",
        "desc": "Detecția ciclurilor în graf"
      },
      {
        "title": "Kruskal (MST)",
        "url": "https://www.pbinfo.ro/probleme/588/kruskal",
        "desc": "Cea mai mare aplicație DSU"
      }
    ],
    "hard": [
      {
        "title": "Checking Existence of Edge Length Limit",
        "url": "https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/",
        "desc": "Sortare Offline + DSU"
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { parent: [0, 1, 2, 3, 4, 5], rank: [0, 0, 0, 0, 0, 0], stack: [] },
        { parent: [0, 1, 2, 3, 4, 5], rank: [0, 0, 0, 0, 0, 0], stack: ["unite(0, 2)"] },
        { parent: [0, 1, 2, 3, 4, 5], rank: [0, 0, 0, 0, 0, 0], stack: ["find(2)", "unite(0, 2)"], i: 0, j: 2 },
        { parent: [0, 1, 0, 3, 4, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(0, 2)"], i: 0, j: 2, rootI: 0, rootJ: 2 },
        { parent: [0, 1, 0, 3, 4, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(4, 2)"] },
        { parent: [0, 1, 0, 3, 4, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["find(2)", "unite(4, 2)"], i: 4, j: 2 },
        { parent: [0, 1, 0, 3, 0, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(4, 2)"], i: 4, j: 2, rootI: 4, rootJ: 0 },
        { parent: [0, 1, 0, 3, 0, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(3, 1)"] },
        { parent: [0, 1, 0, 3, 0, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["find(1)", "unite(3, 1)"], i: 3, j: 1 },
        { parent: [0, 3, 0, 3, 0, 5], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(3, 1)"], i: 3, j: 1, rootI: 3, rootJ: 1 },
        { parent: [0, 3, 0, 3, 0, 5], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(5, 3)"] },
        { parent: [0, 3, 0, 3, 0, 5], rank: [1, 0, 0, 1, 0, 0], stack: ["find(3)", "unite(5, 3)"], i: 5, j: 3 },
        { parent: [0, 3, 0, 3, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(5, 3)"], i: 5, j: 3, rootI: 5, rootJ: 3 },
        { parent: [0, 3, 0, 3, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(0, 5)"] },
        { parent: [0, 3, 0, 3, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(5)", "unite(0, 5)"], i: 0, j: 5 },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(0, 5)"], i: 0, j: 5, rootI: 0, rootJ: 3 },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: [] },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(1)"] },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(3)", "find(1)"] },
        { parent: [0, 0, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(1)"] },
        { parent: [0, 0, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: [] }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      curr.stack.forEach(frameName => {
        frames.push({ name: frameName, file: "solution.cpp", line: activeLine });
      });
      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 15) ? (41 + Math.floor(stepIndex / 4)) : 49 });

      const parentStr = "{" + curr.parent.join(", ") + "}";
      const rankStr = "{" + curr.rank.join(", ") + "}";
      globalVars.push({ name: "dsu.parent", type: "std::vector<int>", val: parentStr, expandable: true });
      globalVars.push({ name: "dsu.rank", type: "std::vector<int>", val: rankStr, expandable: true });

      if (curr.i !== undefined) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }
      if (curr.j !== undefined) {
        vars.push({ name: "j", type: "int", val: curr.j.toString(), expandable: false });
      }
      if (curr.rootI !== undefined) {
        vars.push({ name: "rootI", type: "int", val: curr.rootI.toString(), expandable: false });
      }
      if (curr.rootJ !== undefined) {
        vars.push({ name: "rootJ", type: "int", val: curr.rootJ.toString(), expandable: false });
      }

      let inlineVal = "parent: " + parentStr;
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { parent: [0, 1, 2, 3, 4, 5], rank: [0, 0, 0, 0, 0, 0], stack: [] },
        { parent: [0, 1, 2, 3, 4, 5], rank: [0, 0, 0, 0, 0, 0], stack: ["unite(0, 2)"] },
        { parent: [0, 1, 2, 3, 4, 5], rank: [0, 0, 0, 0, 0, 0], stack: ["find(2)", "unite(0, 2)"], i: 0, j: 2 },
        { parent: [0, 1, 0, 3, 4, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(0, 2)"], i: 0, j: 2, rootI: 0, rootJ: 2 },
        { parent: [0, 1, 0, 3, 4, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(4, 2)"] },
        { parent: [0, 1, 0, 3, 4, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["find(2)", "unite(4, 2)"], i: 4, j: 2 },
        { parent: [0, 1, 0, 3, 0, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(4, 2)"], i: 4, j: 2, rootI: 4, rootJ: 0 },
        { parent: [0, 1, 0, 3, 0, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["unite(3, 1)"] },
        { parent: [0, 1, 0, 3, 0, 5], rank: [1, 0, 0, 0, 0, 0], stack: ["find(1)", "unite(3, 1)"], i: 3, j: 1 },
        { parent: [0, 3, 0, 3, 0, 5], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(3, 1)"], i: 3, j: 1, rootI: 3, rootJ: 1 },
        { parent: [0, 3, 0, 3, 0, 5], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(5, 3)"] },
        { parent: [0, 3, 0, 3, 0, 5], rank: [1, 0, 0, 1, 0, 0], stack: ["find(3)", "unite(5, 3)"], i: 5, j: 3 },
        { parent: [0, 3, 0, 3, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(5, 3)"], i: 5, j: 3, rootI: 5, rootJ: 3 },
        { parent: [0, 3, 0, 3, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(0, 5)"] },
        { parent: [0, 3, 0, 3, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(5)", "unite(0, 5)"], i: 0, j: 5 },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["unite(0, 5)"], i: 0, j: 5, rootI: 0, rootJ: 3 },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: [] },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(1)"] },
        { parent: [0, 3, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(3)", "find(1)"] },
        { parent: [0, 0, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: ["find(1)"] },
        { parent: [0, 0, 0, 0, 0, 3], rank: [1, 0, 0, 1, 0, 0], stack: [] }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 18 && lineNum <= 37) {
        let res = "";
        if (curr.i !== undefined) res += "i: " + curr.i;
        if (curr.j !== undefined) res += ", j: " + curr.j;
        return res || null;
      }
      return null;
    }
  }
};
