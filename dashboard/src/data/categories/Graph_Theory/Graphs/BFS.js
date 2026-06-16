export const data = {
  "presentation": "### Prezentare Generală\n\nBreadth First Search (Parcurgerea în Lățime) explorează graful nivel cu nivel, plecând de la nodul sursă. Întâi vizitează toți vecinii direcți, apoi vecinii vecinilor, și așa mai departe.\\n\\nAcest comportament face ca BFS să fie algoritmul perfect pentru a găsi **cel mai scurt drum** (ca număr de muchii) într-un graf neponderat.\\n\\nImplementarea se bazează pe o structură de date de tip Coadă (Queue - FIFO: First In, First Out).",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - fiecare nod este adăugat în coadă o singură dată, iar fiecare muchie este verificată o singură dată.\\n- **Spațiu:** O(V) - pentru coada de așteptare și vectorul de vizitați. În cel mai rău caz (un graf stea), coada va conține V-1 noduri.\n",
  "variations": "### Variații și Edge Cases\n\nLee Algorithm (BFS pe o matrice pentru găsirea drumului minim într-un labirint), 0-1 BFS (dacă muchiile au cost 0 sau 1, folosim un deque în loc de queue), Multi-source BFS (dacă avem mai multe surse din care plecăm simultan).",
  "applications": "### Aplicații\n\nGăsirea celui mai scurt drum pe o hartă fără ponderi, rețele peer-to-peer (pentru a găsi nodurile vecine), web crawlers, algoritmul lui Ford-Fulkerson (pentru aflarea drumului de creștere în rețea - Edmonds-Karp).",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvoid bfs(int start, vector<vector<int>>& adj, int V) {\n    vector<bool> visited(V, false);\n    queue<int> q;\n    \n    visited[start] = true;\n    q.push(start);\n    \n    while (!q.empty()) {\n        int node = q.front();\n        q.pop();\n        \n        cout << node << \" \";\n        \n        for (int neighbor : adj[node]) {\n            if (!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n}\n\nint main() {\n    int V = 6;\n    vector<vector<int>> adj = {\n        {1, 2},    // Vecini 0\n        {0, 3, 4}, // Vecini 1\n        {0, 4},    // Vecini 2\n        {1, 5},    // Vecini 3\n        {1, 2, 5}, // Vecini 4\n        {3, 4}     // Vecini 5\n    };\n    \n    cout << \"Parcurgere BFS pornind din 0: \";\n    bfs(0, adj, V);\n    cout << \"\\n\";\n    \n    return 0;\n}",
  "explanations": [
    {
      "line": 47,
      "text": "Începem parcurgerea BFS apelând funcția cu nodul de start 0.",
      "blocksVisual": [
        {
          "label": "Start",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Inițializăm vectorul de vizitați și marcăm nodul 0 ca fiind vizitat.",
      "blocksVisual": [
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Adăugăm nodul de start (0) în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Cât timp coada nu este goală, vom extrage și procesa elemente.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Extragem primul element din coadă: nodul 0. Acesta devine nodul curent.",
      "blocksVisual": [
        {
          "label": "Nod curent",
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
          "label": "Coadă Rămasă",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Parcurgem vecinii nodului 0. Vecinii sunt 1 și 2.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        },
        {
          "label": "Vecini",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Verificăm primul vecin: 1. Nu a fost vizitat încă.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Marcăm nodul 1 ca vizitat și îl adăugăm la finalul cozii.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Verificăm următorul vecin: 2. Nici el nu a fost vizitat.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Marcăm nodul 2 ca vizitat și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
            "y": 30,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Extragem următorul element din coadă: nodul 1.",
      "blocksVisual": [
        {
          "label": "Nod curent",
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
          "label": "Coadă Rămasă",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Parcurgem vecinii nodului 1. Aceștia sunt 0, 3 și 4.",
      "blocksVisual": [
        {
          "label": "Vecini",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Vecinul 0 a fost deja vizitat, deci îl sărim.",
      "blocksVisual": [
        {
          "label": "Vecin ignorat",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Vecinul 3 nu este vizitat.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Marcăm 3 ca vizitat și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
          "groups": [
            [
              {
                "val": "2"
              },
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Vecinul 4 nu este vizitat.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Marcăm 4 ca vizitat și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
          "groups": [
            [
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Extragem nodul 2 din coadă.",
      "blocksVisual": [
        {
          "label": "Nod curent",
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
          "label": "Coadă Rămasă",
          "groups": [
            [
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Vecinii lui 2 sunt 0 și 4.",
      "blocksVisual": [
        {
          "label": "Vecini",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Atât vecinul 0 cât și vecinul 4 sunt deja vizitați, deci îi ignorăm.",
      "blocksVisual": [
        {
          "label": "Vecini ignorați",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Extragem nodul 3 din coadă.",
      "blocksVisual": [
        {
          "label": "Nod curent",
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
          "label": "Coadă Rămasă",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Vecinii lui 3 sunt 1 și 5.",
      "blocksVisual": [
        {
          "label": "Vecini",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "5"
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Vecinul 1 este vizitat. Vecinul 5 nu este vizitat.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
          "groups": [
            [
              {
                "val": "5",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5"
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Marcăm 5 ca vizitat și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5",
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Extragem nodul 4 din coadă.",
      "blocksVisual": [
        {
          "label": "Nod curent",
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
          "label": "Coadă Rămasă",
          "groups": [
            [
              {
                "val": "5"
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5",
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Vecinii lui 4 sunt 1, 2 și 5. Toți au fost deja vizitați (sau sunt deja în coadă), deci nu mai adăugăm nimic.",
      "blocksVisual": [
        {
          "label": "Vecini ignorați",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "5"
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5",
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Extragem nodul 5 din coadă.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "5",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Coadă Rămasă",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5",
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Vecinii lui 5 sunt 3 și 4, ambii fiind vizitați.",
      "blocksVisual": [
        {
          "label": "Vecini ignorați",
          "groups": [
            [
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5",
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Coada este acum goală, ceea ce înseamnă că algoritmul BFS a explorat toate nodurile accesibile din nodul de start.",
      "blocksVisual": [
        {
          "label": "Status",
          "groups": [
            [
              {
                "val": "Complet",
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
            "y": 30,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 80,
            "y": 90,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 200,
            "y": 90,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 140,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 95,
            "y": 220,
            "label": "5",
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
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    }
  ]
};
