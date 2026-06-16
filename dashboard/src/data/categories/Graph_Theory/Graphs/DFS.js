export const data = {
  "presentation": "### Prezentare Generală\n\nDepth First Search (Parcurgerea în Adâncime) este o tehnică fundamentală de explorare a unui graf. Se pornește dintr-un nod sursă și se vizitează un vecin, apoi un vecin al acelui vecin, adâncindu-ne cât mai mult posibil. Când ajungem la un nod fără vecini nevizitați, ne 'întoarcem' (backtrack) la nodul anterior.\\n\\nEste implementată natural folosind o funcție recursivă (care folosește implicit stiva de apeluri a sistemului). Este esențial să marcăm nodurile deja vizitate într-un vector `visited` pentru a nu intra într-un ciclu infinit.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) deoarece explorăm fiecare nod și fiecare muchie exact o dată.\\n- **Spațiu:** O(V) pentru vectorul de vizitați și stiva de recursivitate (în cel mai rău caz, graful este o linie dreaptă).\\n",
  "variations": "### Variații și Edge Cases\n\nAflarea Componentelor Conexe, Detectarea Ciclurilor (grafuri orientate/neorientate), Sortare Topologică.",
  "applications": "### Aplicații\n\nRezolvarea labirinturilor, flood fill (umplerea contururilor în MS Paint), analiza rețelelor electrice.",
  "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {\n    visited[node] = true;\n    cout << node << \" \";\n    \n    for (int neighbor : adj[node]) {\n        if (!visited[neighbor]) {\n            dfs(neighbor, adj, visited);\n        }\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj = {\n        {1, 2},    // Vecinii lui 0\n        {0, 3, 4}, // Vecinii lui 1\n        {0, 4},    // Vecinii lui 2\n        {1},       // Vecinii lui 3\n        {1, 2}     // Vecinii lui 4\n    };\n    \n    vector<bool> visited(V, false);\n    \n    cout << \"Parcurgere DFS pornind din 0: \";\n    dfs(0, adj, visited);\n    cout << \"\\n\";\n    \n    return 0;\n}",
  "explanations": [
    {
      "line": 36,
      "text": "Începem DFS-ul apelând funcția recursivă pentru nodul 0 din funcția main.",
      "blocksVisual": [
        {
          "label": "Apel Curent",
          "groups": [
            [
              {
                "val": "dfs(0)",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "Gol"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Intrăm în funcția dfs pentru nodul 0.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Marcăm nodul 0 ca fiind vizitat.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        },
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "0",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Afișăm / procesăm nodul 0.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Parcurgem vecinii nodului 0. Aceștia sunt: 1, 2.",
      "blocksVisual": [
        {
          "label": "Vecini (0)",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 1 al nodului 0.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "1",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 18,
      "text": "Nodul 1 nu este vizitat, deci apelăm recursiv DFS pentru el.",
      "blocksVisual": [
        {
          "label": "Apel Recursiv",
          "groups": [
            [
              {
                "val": "dfs(1)",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Intrăm în funcția dfs pentru nodul 1.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Marcăm nodul 1 ca fiind vizitat.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "1",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Afișăm / procesăm nodul 1.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Parcurgem vecinii nodului 1. Aceștia sunt: 0, 3, 4.",
      "blocksVisual": [
        {
          "label": "Vecini (1)",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "3"
              },
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 0 al nodului 1.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "0",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 0 a fost deja vizitat, deci îl ignorăm și trecem mai departe.",
      "blocksVisual": [
        {
          "label": "Vecin Vizitat",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 3 al nodului 1.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "3",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 18,
      "text": "Nodul 3 nu este vizitat, deci apelăm recursiv DFS pentru el.",
      "blocksVisual": [
        {
          "label": "Apel Recursiv",
          "groups": [
            [
              {
                "val": "dfs(3)",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Intrăm în funcția dfs pentru nodul 3.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ],
            [
              {
                "val": "dfs(3)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Marcăm nodul 3 ca fiind vizitat.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "3"
              }
            ]
          ]
        },
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "3",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Afișăm / procesăm nodul 3.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              {
                "val": "3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Parcurgem vecinii nodului 3. Aceștia sunt: 1.",
      "blocksVisual": [
        {
          "label": "Vecini (3)",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 1 al nodului 3.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "1",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 1 a fost deja vizitat, deci îl ignorăm și trecem mai departe.",
      "blocksVisual": [
        {
          "label": "Vecin Vizitat",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Am terminat de verificat toți vecinii nodului 3. Funcția dfs(3) se va încheia.",
      "blocksVisual": [
        {
          "label": "Finalizare",
          "groups": [
            [
              {
                "val": "dfs(3)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Ne întoarcem din apelul recursiv dfs(3) înapoi la dfs(1). Această operație se numește Backtrack.",
      "blocksVisual": [
        {
          "label": "Întoarcere",
          "groups": [
            [
              {
                "val": "dfs(1)",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 4 al nodului 1.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "4",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 18,
      "text": "Nodul 4 nu este vizitat, deci apelăm recursiv DFS pentru el.",
      "blocksVisual": [
        {
          "label": "Apel Recursiv",
          "groups": [
            [
              {
                "val": "dfs(4)",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Intrăm în funcția dfs pentru nodul 4.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ],
            [
              {
                "val": "dfs(4)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Marcăm nodul 4 ca fiind vizitat.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        },
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "4",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Afișăm / procesăm nodul 4.",
      "blocksVisual": [
        {
          "label": "Afișare",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Parcurgem vecinii nodului 4. Aceștia sunt: 1, 2.",
      "blocksVisual": [
        {
          "label": "Vecini (4)",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 1 al nodului 4.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "1",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 1 a fost deja vizitat, deci îl ignorăm și trecem mai departe.",
      "blocksVisual": [
        {
          "label": "Vecin Vizitat",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 2 al nodului 4.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "2",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 18,
      "text": "Nodul 2 nu este vizitat, deci apelăm recursiv DFS pentru el.",
      "blocksVisual": [
        {
          "label": "Apel Recursiv",
          "groups": [
            [
              {
                "val": "dfs(2)",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Intrăm în funcția dfs pentru nodul 2.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ],
            [
              {
                "val": "dfs(4)"
              }
            ],
            [
              {
                "val": "dfs(2)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Marcăm nodul 2 ca fiind vizitat.",
      "blocksVisual": [
        {
          "label": "Nod Curent",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        },
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "2",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Afișăm / procesăm nodul 2.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Parcurgem vecinii nodului 2. Aceștia sunt: 0, 4.",
      "blocksVisual": [
        {
          "label": "Vecini (2)",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 0 al nodului 2.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "0",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 0 a fost deja vizitat, deci îl ignorăm și trecem mai departe.",
      "blocksVisual": [
        {
          "label": "Vecin Vizitat",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 4 al nodului 2.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "4",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 4 a fost deja vizitat, deci îl ignorăm și trecem mai departe.",
      "blocksVisual": [
        {
          "label": "Vecin Vizitat",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Am terminat de verificat toți vecinii nodului 2. Funcția dfs(2) se va încheia.",
      "blocksVisual": [
        {
          "label": "Finalizare",
          "groups": [
            [
              {
                "val": "dfs(2)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Ne întoarcem din apelul recursiv dfs(2) înapoi la dfs(4). Această operație se numește Backtrack.",
      "blocksVisual": [
        {
          "label": "Întoarcere",
          "groups": [
            [
              {
                "val": "dfs(4)",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ],
            [
              {
                "val": "dfs(4)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Am terminat de verificat toți vecinii nodului 4. Funcția dfs(4) se va încheia.",
      "blocksVisual": [
        {
          "label": "Finalizare",
          "groups": [
            [
              {
                "val": "dfs(4)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Ne întoarcem din apelul recursiv dfs(4) înapoi la dfs(1). Această operație se numește Backtrack.",
      "blocksVisual": [
        {
          "label": "Întoarcere",
          "groups": [
            [
              {
                "val": "dfs(1)",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ],
            [
              {
                "val": "dfs(1)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Am terminat de verificat toți vecinii nodului 1. Funcția dfs(1) se va încheia.",
      "blocksVisual": [
        {
          "label": "Finalizare",
          "groups": [
            [
              {
                "val": "dfs(1)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Ne întoarcem din apelul recursiv dfs(1) înapoi la dfs(0). Această operație se numește Backtrack.",
      "blocksVisual": [
        {
          "label": "Întoarcere",
          "groups": [
            [
              {
                "val": "dfs(0)",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă de Apeluri",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Verificăm vecinul 2 al nodului 0.",
      "blocksVisual": [
        {
          "label": "Vecin Curent",
          "groups": [
            [
              {
                "val": "2",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 2 a fost deja vizitat, deci îl ignorăm și trecem mai departe.",
      "blocksVisual": [
        {
          "label": "Vecin Vizitat",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Am terminat de verificat toți vecinii nodului 0. Funcția dfs(0) se va încheia.",
      "blocksVisual": [
        {
          "label": "Finalizare",
          "groups": [
            [
              {
                "val": "dfs(0)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 37,
      "text": "Am revenit în funcția main. Toate nodurile conectate au fost vizitate cu succes.",
      "blocksVisual": [
        {
          "label": "Status",
          "groups": [
            [
              {
                "val": "Finalizat",
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
            "x": 140,
            "y": 40,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 110,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 110,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    }
  ]
};
