export const data = {
  "presentation": "### Prezentare Generală\n\nPentru a găsi cel mai scurt drum (când muchiile au ponderi), BFS nu mai funcționează. Avem nevoie de:\\n\\n1. **Algoritmul lui Dijkstra**: Găsește drumurile minime de la un nod sursă la toate celelalte. Funcționează doar pentru ponderi $\\\\ge 0$. Folosește un Priority Queue (Min-Heap).\\n2. **Algoritmul Bellman-Ford**: Poate gestiona ponderi negative. Iterează relaxarea muchiilor de V-1 ori. Poate și detecta Cicluri de Cost Negativ!\\n3. **Floyd-Warshall**: Găsește drumul minim între *orice pereche* de noduri (All-Pairs Shortest Path) folosind Programare Dinamică. Simplu de scris (3 for-uri).",
  "complexity": "### Complexitate\n\nDijkstra: O(E log V) (cu Priority Queue).\\nBellman-Ford: O(V * E).\\nFloyd-Warshall: O(V^3). (E bun doar pentru V $\\\\le$ 400).",
  "variations": "### Variații și Edge Cases\n\nA* Search (A-Star) - o extensie a lui Dijkstra care folosește o euristică pentru a ghida căutarea mai rapid către destinație (folosit extensiv în jocuri video).",
  "applications": "### Aplicații\n\nNavigație GPS (Google Maps folosește variații ultra-optimizate de Dijkstra/A* numite Contraction Hierarchies), rutingul pachetelor de rețea pe internet (OSPF).",
  "code": "\n#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\nconst int INF = 1e9;\n\nstruct Edge { int to, weight; };\n\nvoid dijkstra(int start, int V, vector<vector<Edge>>& adj) {\n    vector<int> dist(V, INF);\n    // priority_queue min-heap: stocheaza perechi (distanta, nod)\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    \n    dist[start] = 0;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        int d = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        \n        // Optimizare vitala: daca am gasit un drum mai bun in trecut, oprim ramura\n        if (d > dist[u]) continue;\n        \n        for (Edge e : adj[u]) {\n            if (dist[u] + e.weight < dist[e.to]) {\n                dist[e.to] = dist[u] + e.weight;\n                pq.push({dist[e.to], e.to});\n            }\n        }\n    }\n    \n    for (int i = 0; i < V; i++) cout << \"0 -> \" << i << \" : \" << dist[i] << \"\n\";\n}\n\nint main() {\n    int V = 5;\n    vector<vector<Edge>> adj(V);\n    // Muchii orientate ponderate\n    adj[0].push_back({1, 10}); adj[0].push_back({2, 3});\n    adj[1].push_back({3, 2});\n    adj[2].push_back({1, 1}); adj[2].push_back({3, 8}); adj[2].push_back({4, 2});\n    adj[4].push_back({3, 9});\n    \n    dijkstra(0, V, adj);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 11,
      "text": "Inițializăm vectorul de distanțe cu INF (Infinit), cu excepția nodului start care e 0.",
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
              },
              {
                "val": "4: INF"
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
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 11,
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
              },
              {
                "val": "4: INF"
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
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "pq = [{0, 0}]"
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
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Creăm un Min-Heap pentru a extrage mereu cel mai apropiat nod nevizitat în timp O(log V).",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "pq = [{0, 0}]"
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
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "pq = [{0, 0}]"
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
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "Nod 0",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Extragem (dist=0, nod=0).",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "Nod 0",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "Nod 0",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
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
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Relaxare",
          "groups": [
            [
              {
                "val": "Relaxăm vecinii",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
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
      "text": "Analizăm muchiile lui 0: (0->1, cost 10) și (0->2, cost 3).",
      "blocksVisual": [
        {
          "label": "Relaxare",
          "groups": [
            [
              {
                "val": "Relaxăm vecinii",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
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
          "label": "Relaxare",
          "groups": [
            [
              {
                "val": "Relaxăm vecinii",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "1: 10",
                "active": true
              },
              {
                "val": "2: 3",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Verificăm Relaxarea: (dist[0] + 10) < INF. Da! Actualizăm dist[1] = 10.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "1: 10",
                "active": true
              },
              {
                "val": "2: 3",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "1: 10",
                "active": true
              },
              {
                "val": "2: 3",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "{3, 2}"
              },
              {
                "val": "{10, 1}"
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
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Punem perechile {10, 1} și {3, 2} în Min-Heap. Heap-ul aduce la suprafață {3, 2}.",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "{3, 2}"
              },
              {
                "val": "{10, 1}"
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
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "{3, 2}"
              },
              {
                "val": "{10, 1}"
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
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Extragem {3, 2}. Ne aflăm la nodul 2 (care a fost descoperit cu distanța minimă de 3). Vecinii sunt 1 (cost 1), 3 (cost 8), 4 (cost 2).",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "Nod 2",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 27,
      "text": "Relaxăm (2->1, cost 1): 3 + 1 = 4. Mai bun decât vechiul 10? DA! Noul dist[1] devine 4.",
      "blocksVisual": [
        {
          "label": "Distanțe",
          "groups": [
            [
              {
                "val": "1: 4",
                "active": true
              },
              {
                "val": "2: 3"
              },
              {
                "val": "3: 11",
                "active": true
              },
              {
                "val": "4: 5",
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
            "state": "visited"
          },
          {
            "id": "1",
            "x": 140,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Băgăm noul drum pentru 1 în Heap: {4, 1}.",
      "blocksVisual": [
        {
          "label": "Min Heap",
          "groups": [
            [
              {
                "val": "{4, 1}"
              },
              {
                "val": "{5, 4}"
              },
              {
                "val": "{10, 1}(vechi)"
              },
              {
                "val": "{11, 3}"
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
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "La extragerea stării vechi {10, 1}, condiția `d > dist[u]` se va prinde că am găsit deja ceva mai bun (4) și o va ignora. Aceasta e optimizarea vitală pentru Dijkstra pe cozi de priorități!",
      "blocksVisual": [
        {
          "label": "Optimizare",
          "groups": [
            [
              {
                "val": "Ignoră stări slabe",
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
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "4",
            "target": "3"
          }
        ]
      }
    },
    {
      "line": 34,
      "text": "La final afișăm drumurile.",
      "blocksVisual": [
        {
          "label": "Finalizat",
          "groups": [
            [
              {
                "val": "0: 0, 1: 4, 2: 3, 3: 6, 4: 5",
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
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 230,
            "y": 50,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 170,
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
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
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
        "title": "Dijkstra",
        "url": "https://www.infoarena.ro/problema/dijkstra",
        "desc": "Clasica Dijkstra"
      },
      {
        "title": "Bellman-Ford",
        "url": "https://www.infoarena.ro/problema/bellmanford",
        "desc": "Drumuri negative"
      }
    ],
    "medium": [
      {
        "title": "Network Delay Time",
        "url": "https://leetcode.com/problems/network-delay-time/",
        "desc": "Dijkstra Basic"
      },
      {
        "title": "Floyd-Warshall",
        "url": "https://www.infoarena.ro/problema/royfloyd",
        "desc": "Roy-Floyd (V^3)"
      }
    ],
    "hard": [
      {
        "title": "Cheapest Flights Within K Stops",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        "desc": "Bellman-Ford Relaxări K pași"
      }
    ]
  }
};
