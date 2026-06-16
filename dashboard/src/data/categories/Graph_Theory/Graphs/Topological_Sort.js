export const data = {
  "presentation": "### Prezentare Generală\n\nSortarea Topologică este o aranjare liniară a nodurilor dintr-un DAG (Directed Acyclic Graph) astfel încât pentru fiecare muchie orientată u -> v, nodul u apare înaintea nodului v în acea înșiruire.\\n\\nPentru ce e folosită? Pentru a programa o serie de task-uri care au dependențe (de ex. un curs universitar necesită alte cursuri ca pre-rechizite, sau compilarea unui proiect depinde de ordinea modulelor).\\n\\nAlgoritmul lui Kahn: Calculăm 'gradul de intrare' (in-degree) pentru fiecare nod. Nodurile cu grad 0 nu depind de nimic, deci pot fi adăugate primele. Le adăugăm într-o coadă, le scoatem, și 'ștergem' muchiile care pornesc din ele, scăzând gradul vecinilor. Când un vecin ajunge la grad 0, îl adăugăm în coadă.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - fiecare nod este introdus în coadă o dată, iar fiecare muchie e vizitată la scăderea gradului.\\n- **Spațiu:** O(V) pentru vectorul de in-degree și coadă.\\n",
  "variations": "### Variații și Edge Cases\n\nDetectarea unui ciclu într-un graf orientat: dacă la finalul algoritmului Kahn nu am reușit să punem toate cele V noduri în lista sortată, înseamnă că există o dependență circulară (un ciclu)!",
  "applications": "### Aplicații\n\nDependency Resolution (cum face `npm` sau `apt`), scheduling de task-uri.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvector<int> topologicalSort(int V, vector<vector<int>>& adj) {\n    vector<int> inDegree(V, 0);\n    // Calculam gradul de intrare pentru fiecare nod\n    for (int i = 0; i < V; ++i) {\n        for (int neighbor : adj[i]) {\n            inDegree[neighbor]++;\n        }\n    }\n    \n    queue<int> q;\n    // Adaugam nodurile care nu depind de nimic (inDegree == 0)\n    for (int i = 0; i < V; ++i) {\n        if (inDegree[i] == 0) q.push(i);\n    }\n    \n    vector<int> topOrder;\n    while (!q.empty()) {\n        int node = q.front();\n        q.pop();\n        topOrder.push_back(node);\n        \n        // Simulam stergerea muchiilor\n        for (int neighbor : adj[node]) {\n            inDegree[neighbor]--;\n            if (inDegree[neighbor] == 0) {\n                q.push(neighbor);\n            }\n        }\n    }\n    \n    if (topOrder.size() != V) {\n        cout << \"Eroare: Graful are un ciclu!\\n\";\n        return {};\n    }\n    return topOrder;\n}\n\nint main() {\n    int V = 6;\n    vector<vector<int>> adj(V);\n    // 5 -> 0, 5 -> 2, 4 -> 0, 4 -> 1, 2 -> 3, 3 -> 1\n    adj[5].push_back(0); adj[5].push_back(2);\n    adj[4].push_back(0); adj[4].push_back(1);\n    adj[2].push_back(3); adj[3].push_back(1);\n    \n    vector<int> res = topologicalSort(V, adj);\n    cout << \"Sortare Topologica: \";\n    for (int n : res) cout << n << \" \";\n    cout << \"\\n\";\n    return 0;\n}",
  "explanations": [
    {
      "line": 14,
      "text": "Inițializăm vectorul inDegree cu 0 pentru toate nodurile. In-degree reprezintă numărul de muchii care intră într-un nod.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 0"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Parcurgem toate muchiile pentru a calcula in-degree-ul real pentru fiecare nod.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 0"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Am calculat in-degree pentru fiecare nod.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Acum căutăm nodurile care au in-degree 0. Acestea nu depind de niciun alt nod și pot fi procesate primele.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 25,
      "text": "Nodul 4 are inDegree 0, deci îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
        {
          "label": "Coadă",
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 25,
      "text": "Nodul 5 are inDegree 0, deci îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Începem procesarea. Cât timp coada nu este goală, vom extrage câte un nod.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Extragem nodul 4 din coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
          "label": "Coadă",
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Adăugăm nodul 4 în lista sortată topologic.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
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
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 2"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 35,
      "text": "Parcurgem vecinii nodului 4 pentru a simula ștergerea muchiilor.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        },
        {
          "label": "Vecini (4)",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Ștergem muchia de la 4 la 0. Scădem in-degree-ul lui 0 la 1.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 1"
              },
              {
                "val": "1: 2"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Ștergem muchia de la 4 la 1. Scădem in-degree-ul lui 1 la 1.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 1"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Extragem nodul 5 din coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 1"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
        {
          "label": "Nod Curent",
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
          "label": "Coadă",
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Adăugăm nodul 5 în lista sortată topologic.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 1"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 35,
      "text": "Parcurgem vecinii nodului 5 pentru a simula ștergerea muchiilor.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
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
        },
        {
          "label": "Vecini (5)",
          "groups": [
            [
              {
                "val": "0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Ștergem muchia de la 5 la 0. Scădem in-degree-ul lui 0 la 0.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
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
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 38,
      "text": "In-degree-ul lui 0 a devenit 0! Îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Ștergem muchia de la 5 la 2. Scădem in-degree-ul lui 2 la 0.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
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
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 38,
      "text": "In-degree-ul lui 2 a devenit 0! Îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
        {
          "label": "Coadă",
          "groups": [
            [
              {
                "val": "0"
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
            "y": 180,
            "label": "0"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Extragem nodul 0 din coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
          "label": "Coadă",
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
            "y": 180,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Adăugăm nodul 0 în lista sortată topologic.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              },
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 35,
      "text": "Nodul 0 nu are vecini, deci nu avem ce muchii să ștergem.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
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
            "y": 180,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Extragem nodul 2 din coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
          "label": "Coadă",
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Adăugăm nodul 2 în lista sortată topologic.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 1"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 35,
      "text": "Parcurgem vecinii nodului 2 pentru a simula ștergerea muchiilor.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "0"
              },
              {
                "val": "2"
              }
            ]
          ]
        },
        {
          "label": "Vecini (2)",
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Ștergem muchia de la 2 la 3. Scădem in-degree-ul lui 3 la 0.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "0"
              },
              {
                "val": "2"
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 38,
      "text": "In-degree-ul lui 3 a devenit 0! Îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
        {
          "label": "Coadă",
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Extragem nodul 3 din coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
          "label": "Coadă",
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Adăugăm nodul 3 în lista sortată topologic.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 1"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 35,
      "text": "Parcurgem vecinii nodului 3 pentru a simula ștergerea muchiilor.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              }
            ]
          ]
        },
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1"
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Ștergem muchia de la 3 la 1. Scădem in-degree-ul lui 1 la 0.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 0"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 38,
      "text": "In-degree-ul lui 1 a devenit 0! Îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 0"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Extragem nodul 1 din coadă.",
      "blocksVisual": [
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 0"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
              }
            ]
          ]
        },
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
          "label": "Coadă",
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Adăugăm nodul 1 în lista sortată topologic.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "3",
                "active": true
              },
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "InDegree",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 0"
              },
              {
                "val": "2: 0"
              },
              {
                "val": "3: 0"
              },
              {
                "val": "4: 0"
              },
              {
                "val": "5: 0"
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 35,
      "text": "Nodul 1 nu are vecini, deci nu avem ce muchii să ștergem.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 43,
      "text": "Coada s-a golit. Verificăm dacă am extras toate nodurile.",
      "blocksVisual": [
        {
          "label": "Sortare Topologică Finală",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "3",
                "active": true
              },
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 48,
      "text": "Lungimea listei este 6, ceea ce înseamnă că nu avem cicluri. Algoritmul s-a încheiat cu succes!",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
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
            "y": 180,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 220,
            "y": 180,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 60,
            "y": 100,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 140,
            "y": 100,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 220,
            "y": 40,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 60,
            "y": 40,
            "label": "5",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "5",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "5",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "1",
            "state": "visited"
          }
        ]
      }
    }
  ]
};
