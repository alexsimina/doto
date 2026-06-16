export const data = {
  "presentation": "### Prezentare Generală\n\nO Componentă Tare Conexă (Strongly Connected Component - SCC) într-un graf orientat este un subgraf maximal în care, pentru orice pereche de noduri (u, v), există un drum de la u la v ȘI un drum de la v la u.\\n\\nAlgoritmii clasici pentru găsirea SCC-urilor sunt Tarjan și Kosaraju. Kosaraju folosește 2 parcurgeri DFS (una pe graful normal pentru a determina o ordine de finalizare, alta pe graful transpus, explorând în ordinea inversă).\\n\\nComponentele Biconexe se aplică grafurilor neorientate. Un graf este biconex dacă nu are niciun 'Punct de Articulație' (un nod care, dacă e șters, rupe graful în mai multe componente).",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - Kosaraju face doar 2 parcurgeri DFS, iar transpunerea grafului durează tot O(V + E).\\n- **Spațiu:** O(V + E) pentru graful transpus (la Kosaraju) și O(V) stiva pentru DFS.\n",
  "variations": "### Variații și Edge Cases\n\nGăsirea Punctelor de Articulație și a Punților (Bridges) - muchii a căror eliminare crește numărul de componente conexe (algoritmul lui Tarjan / DFS Low-Link).",
  "applications": "### Aplicații\n\nAnaliza rețelelor ecologice, 2-SAT (Satisfiability) poate fi rezolvat în timp liniar transformând expresia logică într-un graf de implicații și găsind SCC-urile.",
  "code": "\n#include <iostream>\n#include <vector>\n#include <stack>\n\nusing namespace std;\n\nvoid dfs1(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& s) {\n    visited[node] = true;\n    for (int neighbor : adj[node]) {\n        if (!visited[neighbor]) dfs1(neighbor, adj, visited, s);\n    }\n    s.push(node); // Punem in stiva la finalizarea vizitei\n}\n\nvoid dfs2(int node, vector<vector<int>>& adjT, vector<bool>& visited, vector<int>& component) {\n    visited[node] = true;\n    component.push_back(node);\n    for (int neighbor : adjT[node]) {\n        if (!visited[neighbor]) dfs2(neighbor, adjT, visited, component);\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V), adjT(V);\n    // Muchii: 0->2, 2->1, 1->0, 0->3, 3->4\n    adj[0].push_back(2); adjT[2].push_back(0);\n    adj[2].push_back(1); adjT[1].push_back(2);\n    adj[1].push_back(0); adjT[0].push_back(1);\n    adj[0].push_back(3); adjT[3].push_back(0);\n    adj[3].push_back(4); adjT[4].push_back(3);\n\n    vector<bool> visited(V, false);\n    stack<int> s;\n    \n    // Pasul 1: DFS pe graful original\n    for (int i = 0; i < V; ++i) {\n        if (!visited[i]) dfs1(i, adj, visited, s);\n    }\n    \n    fill(visited.begin(), visited.end(), false);\n    \n    // Pasul 2: DFS pe graful transpus, in ordinea stivei\n    cout << \"Componentele Tare Conexe:\n\";\n    while (!s.empty()) {\n        int node = s.top();\n        s.pop();\n        \n        if (!visited[node]) {\n            vector<int> component;\n            dfs2(node, adjT, visited, component);\n            for (int x : component) cout << x << \" \";\n            cout << \"\n\";\n        }\n    }\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 36,
      "text": "Pasul 1 (Kosaraju): Facem DFS pe graful normal pentru a înregistra timpul de finalizare al nodurilor într-o stivă.",
      "blocksVisual": [
        {
          "label": "DFS 1",
          "groups": [
            [
              {
                "val": "Începem..."
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "DFS 1",
          "groups": [
            [
              {
                "val": "Începem..."
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Stivă (Top -> Bottom)",
          "groups": [
            [
              {
                "val": "0, 1, 2, 3, 4",
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Când un nod termină de explorat toți vecinii săi, îl punem în stivă. Primul nod care se blochează va fi jos, ultimul care se termină va fi în vârf.",
      "blocksVisual": [
        {
          "label": "Stivă (Top -> Bottom)",
          "groups": [
            [
              {
                "val": "0, 1, 2, 3, 4",
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Stivă (Top -> Bottom)",
          "groups": [
            [
              {
                "val": "0, 1, 2, 3, 4",
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "2"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "1",
            "target": "0"
          },
          {
            "source": "0",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Graf Transpus",
          "groups": [
            [
              {
                "val": "2->0, 1->2, 0->1, 3->0, 4->3"
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Avem Graful Transpus (adjT), unde sensul tuturor muchiilor a fost inversat.",
      "blocksVisual": [
        {
          "label": "Graf Transpus",
          "groups": [
            [
              {
                "val": "2->0, 1->2, 0->1, 3->0, 4->3"
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Graf Transpus",
          "groups": [
            [
              {
                "val": "2->0, 1->2, 0->1, 3->0, 4->3"
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 43,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "Nod curent"
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 43,
      "text": "Pasul 2: Scoatem noduri din stivă. Extragem primul nod din stivă (cel cu timpul de finalizare maxim).",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "Nod curent"
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 43,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "Nod curent"
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
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 47,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "DFS 2",
          "groups": [
            [
              {
                "val": "Găsim SCC-ul",
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
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 47,
      "text": "Facem un nou DFS pornind de la acest nod, dar pe Graful Transpus. Toate nodurile la care ajungem din el formează o Componentă Tare Conexă!",
      "blocksVisual": [
        {
          "label": "DFS 2",
          "groups": [
            [
              {
                "val": "Găsim SCC-ul",
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
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 47,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "DFS 2",
          "groups": [
            [
              {
                "val": "Găsim SCC-ul",
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
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "SCC Găsit",
          "groups": [
            [
              {
                "val": "{0, 1, 2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ],
            [
              {
                "val": "{4}"
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Am găsit un SCC. Continuăm procesul până când stiva e goală, ignorând nodurile deja vizitate în faza 2.",
      "blocksVisual": [
        {
          "label": "SCC Găsit",
          "groups": [
            [
              {
                "val": "{0, 1, 2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ],
            [
              {
                "val": "{4}"
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "SCC Găsit",
          "groups": [
            [
              {
                "val": "{0, 1, 2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ],
            [
              {
                "val": "{4}"
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "SCC Găsit",
          "groups": [
            [
              {
                "val": "{0, 1, 2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ],
            [
              {
                "val": "{4}"
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Verificăm stabilitatea și corectitudinea rezultatului parțial...",
      "blocksVisual": [
        {
          "label": "SCC Găsit",
          "groups": [
            [
              {
                "val": "{0, 1, 2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ],
            [
              {
                "val": "{4}"
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Verificăm stabilitatea și corectitudinea rezultatului parțial...",
      "blocksVisual": [
        {
          "label": "SCC Găsit",
          "groups": [
            [
              {
                "val": "{0, 1, 2}"
              }
            ],
            [
              {
                "val": "{3}"
              }
            ],
            [
              {
                "val": "{4}"
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
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 120,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 120,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 180,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 180,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "3",
            "target": "0"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Componente Tare Conexe",
        "url": "https://www.infoarena.ro/problema/ctc",
        "desc": "Problema Standard Kosaraju/Tarjan"
      }
    ],
    "medium": [
      {
        "title": "Puncte de Articulatie",
        "url": "https://www.infoarena.ro/problema/biconex",
        "desc": "Componente Biconexe"
      }
    ],
    "hard": [
      {
        "title": "Critical Connections in a Network",
        "url": "https://leetcode.com/problems/critical-connections-in-a-network/",
        "desc": "Găsirea Punților (Bridges) cu Tarjan"
      }
    ]
  }
};
