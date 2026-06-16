export const data = {
  "presentation": "### Prezentare Generală\n\nUn graf este o structură de date neliniară formată din noduri (vârfuri) și muchii (conexiuni între noduri). Este folosit pentru a modela relații între perechi de obiecte.\\n\\nTipuri principale:\\n- Orientate / Neorientate: Muchiile au o direcție (A -> B) sau sunt bidirecționale.\\n- Ponderate / Neponderate: Muchiile au un 'cost' (ex: distanță, timp).\\n\\nReprezentare:\\n1. Matrice de adiacență: O matrice N x N unde M[i][j] = 1 dacă există muchie între i și j.\\n2. Liste de adiacență: Un vector de liste, unde vec[i] conține toți vecinii nodului i. Este mult mai eficientă din punct de vedere al memoriei pentru grafuri rare (cu puține muchii).",
  "complexity": "### Complexitate\n\n- **Spațiu:** O(V^2) pentru matricea de adiacență, O(V + E) pentru liste de adiacență (V = noduri, E = muchii).\\n- **Timp:** Verificarea existenței unei muchii e O(1) la matrice, dar O(grad(V)) la liste. Parcurgerea vecinilor e O(V) la matrice, O(grad(V)) la liste.\n",
  "variations": "### Variații și Edge Cases\n\nGrafuri Bipartite (nodurile pot fi împărțite în 2 seturi fără muchii în interiorul aceluiași set), Arbori (grafuri conexe fără cicluri), DAG (Directed Acyclic Graph - graf orientat fără cicluri).",
  "applications": "### Aplicații\n\nRețele de socializare (prietenii sunt muchii), hărți GPS (intersecțiile sunt noduri, străzile sunt muchii), rețele de calculatoare, web (link-uri între pagini).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int V = 5; // Numarul de noduri (0 la 4)
    vector<vector<int>> adj(V);
    
    // Adaugam muchii pentru un graf neorientat
    // Muchia 0-1
    adj[0].push_back(1);
    adj[1].push_back(0);
    
    // Muchia 0-4
    adj[0].push_back(4);
    adj[4].push_back(0);
    
    // Muchia 1-2
    adj[1].push_back(2);
    adj[2].push_back(1);
    
    // Muchia 1-3
    adj[1].push_back(3);
    adj[3].push_back(1);
    
    // Muchia 1-4
    adj[1].push_back(4);
    adj[4].push_back(1);
    
    // Afisarea listei de adiacenta
    for (int i = 0; i < V; ++i) {
        cout << "Nodul " << i << " este conectat cu: ";
        for (int vec : adj[i]) {
            cout << vec << " ";
        }
        cout << "
";
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Avem 5 noduri numerotate de la 0 la 4.",
      "blocksVisual": [
        {
          "label": "Noduri",
          "groups": [
            [
              {
                "val": "0"
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
            "label": "4"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 8,
      "text": "Inițializăm un vector de vectori (liste de adiacență). `adj[i]` va reține vecinii nodului `i`.",
      "blocksVisual": [
        {
          "label": "Liste vide",
          "groups": [
            [
              {
                "val": "adj[0]: []"
              }
            ],
            [
              {
                "val": "adj[1]: []"
              }
            ],
            [
              {
                "val": "adj[2]: []"
              }
            ],
            [
              {
                "val": "adj[3]: []"
              }
            ],
            [
              {
                "val": "adj[4]: []"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
            "label": "4"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 12,
      "text": "Adăugăm muchia neorientată (0, 1). Punem 1 în lista lui 0.",
      "blocksVisual": [
        {
          "label": "Muchia 0-1",
          "groups": [
            [
              {
                "val": "adj[0]: [1]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[1]: []"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Și punem 0 în lista lui 1.",
      "blocksVisual": [
        {
          "label": "Muchia 0-1",
          "groups": [
            [
              {
                "val": "adj[0]: [1]"
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Adăugăm muchia (0, 4).",
      "blocksVisual": [
        {
          "label": "Muchia 0-4",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
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
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Adăugăm muchia (1, 2).",
      "blocksVisual": [
        {
          "label": "Muchia 1-2",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
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
            "target": "4"
          },
          {
            "source": "1",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Adăugăm muchia (1, 3).",
      "blocksVisual": [
        {
          "label": "Muchia 1-3",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2, 3]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
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
            "target": "4"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Adăugăm muchia (1, 4).",
      "blocksVisual": [
        {
          "label": "Muchia 1-4",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[4]: [0, 1]",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
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
            "target": "4"
          },
          {
            "source": "1",
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
      "line": 32,
      "text": "Afișăm structura finală a grafului. Aceasta este o reprezentare compactă și eficientă!",
      "blocksVisual": [
        {
          "label": "Graful Final",
          "groups": [
            [
              {
                "val": "Nod 0 -> 1, 4",
                "sorted": true
              }
            ],
            [
              {
                "val": "Nod 1 -> 0, 2, 3, 4",
                "sorted": true
              }
            ],
            [
              {
                "val": "Nod 2 -> 1",
                "sorted": true
              }
            ],
            [
              {
                "val": "Nod 3 -> 1",
                "sorted": true
              }
            ],
            [
              {
                "val": "Nod 4 -> 0, 1",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 110,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 230,
            "y": 50,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 170,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 190,
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
            "target": "4"
          },
          {
            "source": "1",
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
        "title": "Matrice de Adiacență",
        "url": "https://www.pbinfo.ro/probleme/412/adiacenta",
        "desc": "Creare din muchii"
      }
    ],
    "medium": [
      {
        "title": "Grade Noduri",
        "url": "https://www.pbinfo.ro/probleme/416/grade",
        "desc": "Calcul grade"
      }
    ],
    "hard": [
      {
        "title": "Find the Town Judge",
        "url": "https://leetcode.com/problems/find-the-town-judge/",
        "desc": "Grade intrare/ieșire"
      }
    ]
  }
};
