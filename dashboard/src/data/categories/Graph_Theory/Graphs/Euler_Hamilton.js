export const data = {
  "presentation": "### Prezentare Generală\n\nUn **Drum Eulerian** vizitează fiecare muchie dintr-un graf exact o singură dată. Un **Ciclu Eulerian** este un drum Eulerian care se întoarce la nodul de pornire.\\n\\nPentru grafuri neorientate:\\n- Ciclu Eulerian: toate nodurile au grad par.\\n- Drum Eulerian: exact 2 noduri au grad impar (restul par).\\n\\nAlgoritmul lui Hierholzer găsește un Ciclu Eulerian în O(E): facem DFS, dar distrugem muchiile pe măsură ce le parcurgem. Când ne blocăm într-un nod, adăugăm acel nod la răspuns. La final, răspunsul se inversează.\\n\\nUn **Drum/Ciclu Hamiltonian** vizitează fiecare nod exact o singură dată. Spre deosebire de Eulerian, problema este NP-Hard (nu are soluție eficientă polinomială, necesitând Backtracking sau Bitmask DP O(2^N * N^2)).",
  "complexity": "### Complexitate\n\nEulerian (Hierholzer): O(V + E) timp și spațiu.\\nHamiltonian (Held-Karp Bitmask DP): O(2^V * V^2) timp. (Deci imposibil pentru V > 20).",
  "variations": "### Variații și Edge Cases\n\nProblema Poștașului Chinez (Găsirea drumului minim care vizitează toate muchiile măcar o dată), Problema Comis-Voiajorului (TSP - vizitarea tuturor nodurilor cu cost minim).",
  "applications": "### Aplicații\n\nRute de gunoieri, poștași, curățarea străzilor cu utilaje (Eulerian). Optimizarea livrărilor logistice (TSP).",
  "code": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\n\nusing namespace std;\n\nvoid findEulerianPath(int start, vector<vector<int>>& adj) {\n    stack<int> curr_path;\n    vector<int> circuit;\n    \n    curr_path.push(start);\n    int curr_v = start; \n    \n    while (!curr_path.empty()) {\n        if (adj[curr_v].size()) {\n            curr_path.push(curr_v);\n            int next_v = adj[curr_v].back();\n            adj[curr_v].pop_back();\n            curr_v = next_v;\n        } else {\n            circuit.push_back(curr_v);\n            curr_v = curr_path.top();\n            curr_path.pop();\n        }\n    }\n    \n    reverse(circuit.begin(), circuit.end());\n    \n    cout << \"Ciclu/Drum Eulerian: \";\n    for (int i = 0; i < circuit.size(); i++) {\n        cout << circuit[i] << (i == circuit.size() - 1 ? \"\" : \" -> \");\n    }\n    cout << \"\\n\";\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V);\n    // Ciclu: 0 -> 1 -> 2 -> 3 -> 4 -> 2 -> 0\n    adj[0].push_back(1);\n    adj[1].push_back(2);\n    adj[2].push_back(0);\n    adj[2].push_back(3);\n    adj[3].push_back(4);\n    adj[4].push_back(2);\n    \n    findEulerianPath(0, adj);\n    return 0;\n}",
  "explanations": [
    {
      "line": 14,
      "text": "Începem de la nodul de start 0 și îl adăugăm în stiva curentă.",
      "blocksVisual": [
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        },
        {
          "label": "Circuit",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 15,
      "text": "Cât timp stiva nu este goală, vom continua să avansăm. Nodul curent este 0.",
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
          "label": "Stivă",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
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
      "text": "Nodul 0 are vecini nevizitați. Salvăm nodul curent pe stivă.",
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
          "label": "Stivă",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Alegem muchia 0 -> 1 și o \"ștergem\" din graf (o marcăm ca parcursă). Ne mutăm la nodul 1.",
      "blocksVisual": [
        {
          "label": "Muchie ștearsă",
          "groups": [
            [
              {
                "val": "0 -> 1",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
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
      "text": "Nodul 1 are vecini nevizitați. Salvăm nodul curent pe stivă.",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Alegem muchia 1 -> 2 și o \"ștergem\" din graf (o marcăm ca parcursă). Ne mutăm la nodul 2.",
      "blocksVisual": [
        {
          "label": "Muchie ștearsă",
          "groups": [
            [
              {
                "val": "1 -> 2",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
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
      "text": "Nodul 2 are vecini nevizitați. Salvăm nodul curent pe stivă.",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Alegem muchia 2 -> 3 și o \"ștergem\" din graf (o marcăm ca parcursă). Ne mutăm la nodul 3.",
      "blocksVisual": [
        {
          "label": "Muchie ștearsă",
          "groups": [
            [
              {
                "val": "2 -> 3",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4"
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
      "text": "Nodul 3 are vecini nevizitați. Salvăm nodul curent pe stivă.",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Alegem muchia 3 -> 4 și o \"ștergem\" din graf (o marcăm ca parcursă). Ne mutăm la nodul 4.",
      "blocksVisual": [
        {
          "label": "Muchie ștearsă",
          "groups": [
            [
              {
                "val": "3 -> 4",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
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
      "text": "Nodul 4 are vecini nevizitați. Salvăm nodul curent pe stivă.",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Alegem muchia 4 -> 2 și o \"ștergem\" din graf (o marcăm ca parcursă). Ne mutăm la nodul 2.",
      "blocksVisual": [
        {
          "label": "Muchie ștearsă",
          "groups": [
            [
              {
                "val": "4 -> 2",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Nodul 2 are vecini nevizitați. Salvăm nodul curent pe stivă.",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Alegem muchia 2 -> 0 și o \"ștergem\" din graf (o marcăm ca parcursă). Ne mutăm la nodul 0.",
      "blocksVisual": [
        {
          "label": "Muchie ștearsă",
          "groups": [
            [
              {
                "val": "2 -> 0",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 0 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 0 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (2) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 2 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 2 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
          "groups": [
            [
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (4) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
          "groups": [
            [
              {
                "val": "0"
              },
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
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 4 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 4 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (3) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "3"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 3 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 3 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "4",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "active"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (2) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 2 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 2 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "3",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
              },
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (1) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
          "groups": [
            [
              {
                "val": "0"
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 1 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 1 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "3",
                "active": true
              },
              {
                "val": "2",
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
          "label": "Stivă",
          "groups": [
            [
              {
                "val": "0"
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
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (0) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Nodul 0 nu mai are muchii de ieșire neparcurse. Suntem blocați!",
      "blocksVisual": [
        {
          "label": "Nod Blocat",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 0 la circuitul rezultat.",
      "blocksVisual": [
        {
          "label": "Circuit Revers",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "3",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "1",
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
          "label": "Stivă",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Scoatem din stivă nodul anterior (0) și facem Backtrack la el.",
      "blocksVisual": [
        {
          "label": "Backtrack la",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        },
        {
          "label": "Stivă Rămasă",
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Stiva s-a golit. Acum avem un circuit eulerian, dar el a fost construit de la capăt la coadă (datorită backtracking-ului). Îl inversăm.",
      "blocksVisual": [
        {
          "label": "Circuit Inversat",
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
              },
              {
                "val": "2"
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    },
    {
      "line": 31,
      "text": "Acesta este circuitul Eulerian final (sau drum, dacă am fi pornit din capătul corect într-un graf care admite drum Eulerian).",
      "blocksVisual": [
        {
          "label": "Rezultat",
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
                "val": "2",
                "active": true
              },
              {
                "val": "3",
                "active": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "2",
                "active": true
              },
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
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "state": "visited"
          },
          {
            "source": "1",
            "target": "2",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "0",
            "state": "visited"
          },
          {
            "source": "2",
            "target": "3",
            "state": "visited"
          },
          {
            "source": "3",
            "target": "4",
            "state": "visited"
          },
          {
            "source": "4",
            "target": "2",
            "state": "visited"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Ciclu Eulerian",
        "url": "https://www.infoarena.ro/problema/ciclueuler",
        "desc": "Clasica O(M)"
      }
    ],
    "medium": [
      {
        "title": "Reconstruct Itinerary",
        "url": "https://leetcode.com/problems/reconstruct-itinerary/",
        "desc": "Drum Eulerian cu Sortare Lexicografică"
      }
    ],
    "hard": [
      {
        "title": "Hamiltonian Path (TSP)",
        "url": "https://www.infoarena.ro/problema/tsp",
        "desc": "Traveling Salesman Bitmask DP"
      }
    ]
  }
};
