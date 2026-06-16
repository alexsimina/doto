export const data = {
  "presentation": "### Prezentare Generală\n\nDepth First Search (Parcurgerea în Adâncime) este o tehnică fundamentală de explorare a unui graf. Se pornește dintr-un nod sursă și se vizitează un vecin, apoi un vecin al acelui vecin, adâncindu-ne cât mai mult posibil. Când ajungem la un nod fără vecini nevizitați, ne 'întoarcem' (backtrack) la nodul anterior.\\n\\nEste implementată natural folosind o funcție recursivă (care folosește implicit stiva de apeluri a sistemului). Este esențial să marcăm nodurile deja vizitate într-un vector `visited` pentru a nu intra într-un ciclu infinit.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) deoarece explorăm fiecare nod și fiecare muchie exact o dată.\\n- **Spațiu:** O(V) pentru vectorul de vizitați și stiva de recursivitate (în cel mai rău caz, graful este o linie dreaptă).\n",
  "variations": "### Variații și Edge Cases\n\nAflarea Componentelor Conexe, Detectarea Ciclurilor (grafuri orientate/neorientate), Sortare Topologică.",
  "applications": "### Aplicații\n\nRezolvarea labirinturilor, flood fill (umplerea contururilor în MS Paint), analiza rețelelor electrice.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}

int main() {
    int V = 5;
    vector<vector<int>> adj = {
        {1, 2},    // Vecinii lui 0
        {0, 3, 4}, // Vecinii lui 1
        {0, 4},    // Vecinii lui 2
        {1},       // Vecinii lui 3
        {1, 2}     // Vecinii lui 4
    };
    
    vector<bool> visited(V, false);
    
    cout << "Parcurgere DFS pornind din 0: ";
    dfs(0, adj, visited);
    cout << "
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 30,
      "text": "Începem DFS-ul din nodul 0.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "dfs(0)",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 7,
      "text": "Marcăm nodul 0 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "1"
              },
              {
                "val": "2"
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Iterăm prin vecinii lui 0 (adică 1 și 2).",
      "blocksVisual": [
        {
          "label": "Vecini 0",
          "groups": [
            [
              {
                "val": "1",
                "active": true
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
            "state": "active"
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 11,
      "text": "Vecinul 1 nu este vizitat. Apelăm recursiv `dfs(1)`.",
      "blocksVisual": [
        {
          "label": "Apel",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 7,
      "text": "Marcăm 1 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "2"
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Vecinii lui 1 sunt 0, 3, 4. 0 e deja vizitat. Urmează 3.",
      "blocksVisual": [
        {
          "label": "Vecini 1",
          "groups": [
            [
              {
                "val": "0(viz)"
              },
              {
                "val": "3",
                "active": true
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Apelăm recursiv `dfs(3)`.",
      "blocksVisual": [
        {
          "label": "Apel",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 7,
      "text": "Marcăm 3 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "2"
              },
              {
                "val": "3",
                "active": true
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Vecinii lui 3 sunt doar 1. Dar 1 este deja vizitat! Deci am atins un capăt.",
      "blocksVisual": [
        {
          "label": "Vecini 3",
          "groups": [
            [
              {
                "val": "1(viz)"
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 15,
      "text": "Funcția `dfs(3)` se termină. Ne întoarcem (backtrack) la `dfs(1)`.",
      "blocksVisual": [
        {
          "label": "Backtrack",
          "groups": [
            [
              {
                "val": "Înapoi la dfs(1)",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "La `dfs(1)`, următorul vecin de verificat era 4. 4 nu este vizitat.",
      "blocksVisual": [
        {
          "label": "Vecini 1",
          "groups": [
            [
              {
                "val": "0(viz)"
              },
              {
                "val": "3(viz)"
              },
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Apelăm recursiv `dfs(4)`.",
      "blocksVisual": [
        {
          "label": "Apel",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 7,
      "text": "Marcăm 4 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "2"
              },
              {
                "val": "3",
                "active": true
              },
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Vecinii lui 4 sunt 1 și 2. 1 este deja vizitat. Apelăm DFS pentru 2.",
      "blocksVisual": [
        {
          "label": "Vecini 4",
          "groups": [
            [
              {
                "val": "1(viz)"
              },
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 7,
      "text": "Marcăm 2 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Vizitat",
          "groups": [
            [
              {
                "val": "Toate vizitate!",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Vecinii lui 2 (0, 4) sunt amândoi vizitați. Ne întoarcem.",
      "blocksVisual": [
        {
          "label": "Backtrack",
          "groups": [
            [
              {
                "val": "Înapoi la dfs(4)"
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 15,
      "text": "Se termină `dfs(4)`, apoi se termină `dfs(1)`, iar în `dfs(0)` vecinul rămas era 2 (deja vizitat). Astfel, am explorat întregul graf conex!",
      "blocksVisual": [
        {
          "label": "Ordinea Vizitării",
          "groups": [
            [
              {
                "val": "0 -> 1 -> 3 -> 4 -> 2",
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
            "target": "3"
          },
          {
            "source": "1",
            "target": "4"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Componente Conexe",
        "url": "https://www.pbinfo.ro/probleme/417/componenteconexe",
        "desc": "Găsire componente"
      }
    ],
    "medium": [
      {
        "title": "Number of Islands",
        "url": "https://leetcode.com/problems/number-of-islands/",
        "desc": "DFS pe matrice"
      }
    ],
    "hard": [
      {
        "title": "Longest Increasing Path in a Matrix",
        "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
        "desc": "DFS + Memoization"
      }
    ]
  }
};
