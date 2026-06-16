export const data = {
  "presentation": "### Prezentare Generală\n\nUn graf este o structură de date neliniară formată din noduri (vârfuri) și muchii (conexiuni între noduri). Este folosit pentru a modela relații între perechi de obiecte.\\n\\nTipuri principale:\\n- Orientate / Neorientate: Muchiile au o direcție (A -> B) sau sunt bidirecționale.\\n- Ponderate / Neponderate: Muchiile au un 'cost' (ex: distanță, timp).\\n\\nReprezentare:\\n1. Matrice de adiacență: O matrice N x N unde M[i][j] = 1 dacă există muchie între i și j.\\n2. Liste de adiacență: Un vector de liste, unde vec[i] conține toți vecinii nodului i. Este mult mai eficientă din punct de vedere al memoriei pentru grafuri rare (cu puține muchii).",
  "complexity": "### Complexitate\n\n- **Spațiu:** O(V^2) pentru matricea de adiacență, O(V + E) pentru liste de adiacență (V = noduri, E = muchii).\\n- **Timp:** Verificarea existenței unei muchii e O(1) la matrice, dar O(grad(V)) la liste. Parcurgerea vecinilor e O(V) la matrice, O(grad(V)) la liste.\\n",
  "variations": "### Variații și Edge Cases\n\nGrafuri Bipartite (nodurile pot fi împărțite în 2 seturi fără muchii în interiorul aceluiași set), Arbori (grafuri conexe fără cicluri), DAG (Directed Acyclic Graph - graf orientat fără cicluri).",
  "applications": "### Aplicații\n\nRețele de socializare (prietenii sunt muchii), hărți GPS (intersecțiile sunt noduri, străzile sunt muchii), rețele de calculatoare, web (link-uri între pagini).",
  "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int V = 5; // Numarul de noduri (0 la 4)\n    vector<vector<int>> adj(V);\n    \n    // Adaugam muchii pentru un graf neorientat\n    // Muchia 0-1\n    adj[0].push_back(1);\n    adj[1].push_back(0);\n    \n    // Muchia 0-4\n    adj[0].push_back(4);\n    adj[4].push_back(0);\n    \n    // Muchia 1-2\n    adj[1].push_back(2);\n    adj[2].push_back(1);\n    \n    // Muchia 1-3\n    adj[1].push_back(3);\n    adj[3].push_back(1);\n    \n    // Muchia 1-4\n    adj[1].push_back(4);\n    adj[4].push_back(1);\n    \n    cout << \"Structura listelor de adiacenta:\\n\";\n    for (int i = 0; i < V; ++i) {\n        cout << \"Nod \" << i << \" -> \";\n        for (int neighbor : adj[i]) {\n            cout << neighbor << \" \";\n        }\n        cout << \"\\n\";\n    }\n    \n    return 0;\n}",
  "explanations": [
    {
      "line": 12,
      "text": "Începem prin a defini numărul de noduri V = 5. Deocamdată nu există nicio muchie între ele, doar 5 noduri izolate.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
      "line": 13,
      "text": "Alocăm memorie pentru lista de adiacență. Aceasta este practic un vector de vectori. Fiecare nod va avea propria listă cu vecini, momentan toate fiind goale.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
      "line": 16,
      "text": "Ne pregătim să adăugăm muchia (0, 1). Fiind un graf neorientat, trebuie să adăugăm conexiunea în ambele direcții.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
      "line": 17,
      "text": "Adăugăm nodul 1 în lista vecinilor lui 0. Acum nodul 0 \"știe\" despre existența lui 1.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[1]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
            "label": "4"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 18,
      "text": "Adăugăm nodul 0 în lista vecinilor lui 1. Acum nodul 1 \"știe\" despre existența lui 0.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
            "label": "4"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 18,
      "text": "Muchia (0, 1) a fost complet stabilită și introdusă în graful nostru.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
            "target": "1",
            "state": "active"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Ne pregătim să adăugăm muchia (0, 4). Fiind un graf neorientat, trebuie să adăugăm conexiunea în ambele direcții.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
        "edges": [
          {
            "source": "0",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adăugăm nodul 4 în lista vecinilor lui 0. Acum nodul 0 \"știe\" despre existența lui 4.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: []",
                "active": false
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
      "line": 22,
      "text": "Adăugăm nodul 0 în lista vecinilor lui 4. Acum nodul 4 \"știe\" despre existența lui 0.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
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
            "label": "4",
            "state": "active"
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
      "line": 22,
      "text": "Muchia (0, 4) a fost complet stabilită și introdusă în graful nostru.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
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
            "target": "4",
            "state": "active"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Ne pregătim să adăugăm muchia (1, 2). Fiind un graf neorientat, trebuie să adăugăm conexiunea în ambele direcții.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
      "line": 25,
      "text": "Adăugăm nodul 2 în lista vecinilor lui 1. Acum nodul 1 \"știe\" despre existența lui 2.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Adăugăm nodul 1 în lista vecinilor lui 2. Acum nodul 2 \"știe\" despre existența lui 1.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Muchia (1, 2) a fost complet stabilită și introdusă în graful nostru.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
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
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
            "target": "2",
            "state": "active"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Ne pregătim să adăugăm muchia (1, 3). Fiind un graf neorientat, trebuie să adăugăm conexiunea în ambele direcții.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
      "line": 29,
      "text": "Adăugăm nodul 3 în lista vecinilor lui 1. Acum nodul 1 \"știe\" despre existența lui 3.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: []",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
      "line": 30,
      "text": "Adăugăm nodul 1 în lista vecinilor lui 3. Acum nodul 3 \"știe\" despre existența lui 1.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Muchia (1, 3) a fost complet stabilită și introdusă în graful nostru.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
            "target": "3",
            "state": "active"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Ne pregătim să adăugăm muchia (1, 4). Fiind un graf neorientat, trebuie să adăugăm conexiunea în ambele direcții.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
      "line": 33,
      "text": "Adăugăm nodul 4 în lista vecinilor lui 1. Acum nodul 1 \"știe\" despre existența lui 4.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0]",
                "active": false
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
      "line": 34,
      "text": "Adăugăm nodul 1 în lista vecinilor lui 4. Acum nodul 4 \"știe\" despre existența lui 1.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": false
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
      "line": 34,
      "text": "Muchia (1, 4) a fost complet stabilită și introdusă în graful nostru.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": false
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
            "target": "4",
            "state": "active"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Avem toate muchiile din graf introduse. Acum parcurgem listele pentru a afișa structura.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0, 1]",
                "active": false
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
      "line": 44,
      "text": "Afișăm structura finală a grafului. Listele de adiacență sunt foarte eficiente pentru a itera doar prin vecinii strict existenți, ignorând perechile de noduri care nu au muchii între ele.",
      "blocksVisual": [
        {
          "label": "Liste Adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[2]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[3]: [1]",
                "active": false
              }
            ],
            [
              {
                "val": "adj[4]: [0, 1]",
                "active": false
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
