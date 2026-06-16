export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul Bellman-Ford calculează drumurile minime de la o singură sursă în grafuri orientate cu ponderi, care POT fi negative.\\n\\nSecretul constă în 'Relaxarea' tuturor muchiilor de (V-1) ori. Dacă după V-1 iterații mai putem face vreo relaxare, înseamnă că graful conține un **Ciclu de Cost Negativ** (și nu putem calcula un drum minim).",
  "complexity": "### Complexitate\n\n- **Timp:** O(V * E).\\n- **Spațiu:** O(V).\n",
  "variations": "### Variații și Edge Cases\n\nSPFA (Shortest Path Faster Algorithm) este o optimizare practică ce ține un queue cu nodurile schimbate recent, rulând mult mai rapid pe grafuri random, dar tot cu worst-case O(V*E).",
  "applications": "### Aplicații\n\nProtocolul de routare RIP, arbitrajul valutar pe piețele financiare (cicluri negative = profit infinit).",
  "code": "\n#include <iostream>\n#include <vector>\n\nusing namespace std;\nconst int INF = 1e9;\n\nstruct Edge {\n    int u, v, weight;\n};\n\nvoid bellmanFord(int V, int E, int start, vector<Edge>& edges) {\n    vector<int> dist(V, INF);\n    dist[start] = 0;\n\n    // Relaxam muchiile de V-1 ori\n    for (int i = 1; i <= V - 1; i++) {\n        for (int j = 0; j < E; j++) {\n            int u = edges[j].u;\n            int v = edges[j].v;\n            int weight = edges[j].weight;\n            if (dist[u] != INF && dist[u] + weight < dist[v]) {\n                dist[v] = dist[u] + weight;\n            }\n        }\n    }\n\n    // Verificam daca avem ciclu de cost negativ\n    for (int j = 0; j < E; j++) {\n        int u = edges[j].u;\n        int v = edges[j].v;\n        int weight = edges[j].weight;\n        if (dist[u] != INF && dist[u] + weight < dist[v]) {\n            cout << \"Graful contine ciclu de cost negativ!\";\n            return;\n        }\n    }\n\n    for (int i = 0; i < V; i++) {\n        cout << \"0 -> \" << i << \" : \" << dist[i] << \"\";\n    }\n}\n\nint main() {\n    int V = 4, E = 4;\n    vector<Edge> edges = {\n        {0, 1, 4},\n        {0, 2, 5},\n        {2, 1, -2},\n        {1, 3, 3}\n    };\n    bellmanFord(V, E, 0, edges);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 13,
      "text": "Inițializăm distanțele cu infinit, iar distanța către sursă cu 0.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0",
                "active": true
              },
              {
                "val": "1: INF"
              },
              {
                "val": "2: INF"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "active"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0",
                "active": true
              },
              {
                "val": "1: INF"
              },
              {
                "val": "2: INF"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "active"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Iterația 1",
          "groups": [
            [
              {
                "val": "Relaxam toate muchiile"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Începem prima iterație de relaxare a muchiilor (V-1 iteratii in total).",
      "blocksVisual": [
        {
          "label": "Iterația 1",
          "groups": [
            [
              {
                "val": "Relaxam toate muchiile"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Iterația 1",
          "groups": [
            [
              {
                "val": "Relaxam toate muchiile"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 4",
                "active": true
              },
              {
                "val": "2: INF"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Relaxăm muchia 0->1 cu costul 4. dist[1] devine 4.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 4",
                "active": true
              },
              {
                "val": "2: INF"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 4",
                "active": true
              },
              {
                "val": "2: INF"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 4"
              },
              {
                "val": "2: 5",
                "active": true
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Relaxăm muchia 0->2 cu costul 5. dist[2] devine 5.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 4"
              },
              {
                "val": "2: 5",
                "active": true
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 4"
              },
              {
                "val": "2: 5",
                "active": true
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Iterația 2",
          "groups": [
            [
              {
                "val": "Relaxam muchia negativa"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "La a doua iterație, descoperim muchia 2->1 de cost -2.",
      "blocksVisual": [
        {
          "label": "Iterația 2",
          "groups": [
            [
              {
                "val": "Relaxam muchia negativa"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Iterația 2",
          "groups": [
            [
              {
                "val": "Relaxam muchia negativa"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 3",
                "active": true
              },
              {
                "val": "2: 5"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Relaxăm 2->1: dist[2] + (-2) = 5 - 2 = 3. Cum 3 < 4, dist[1] devine 3!",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 3",
                "active": true
              },
              {
                "val": "2: 5"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 3",
                "active": true
              },
              {
                "val": "2: 5"
              },
              {
                "val": "3: INF"
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
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 3"
              },
              {
                "val": "2: 5"
              },
              {
                "val": "3: 6",
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
            "label": "0",
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Acum că dist[1] s-a micșorat la 3, muchia 1->3 (cost 3) ne va da dist[3] = 6.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 3"
              },
              {
                "val": "2: 5"
              },
              {
                "val": "3: 6",
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
            "label": "0",
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "0: 0"
              },
              {
                "val": "1: 3"
              },
              {
                "val": "2: 5"
              },
              {
                "val": "3: 6",
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
            "label": "0",
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Fără cicluri negative",
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
            "label": "0",
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 28,
      "text": "La final, verificăm dacă mai există relaxări posibile (cicluri negative). Nu avem, deci distanțele calculate sunt finale.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Fără cicluri negative",
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
            "label": "0",
            "x": 50,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 150,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4"
          },
          {
            "source": "0",
            "target": "2",
            "label": "5"
          },
          {
            "source": "2",
            "target": "1",
            "label": "-2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "3"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Bellman-Ford",
        "url": "https://www.infoarena.ro/problema/bellmanford",
        "desc": "Problema clasica Infoarena"
      }
    ],
    "medium": [],
    "hard": []
  }
};
