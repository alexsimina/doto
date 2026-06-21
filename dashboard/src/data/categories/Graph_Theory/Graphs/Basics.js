export const data = {
  "presentation": "### Reprezentarea Grafurilor (Liste de Adiacență)\n\nUn graf $G = (V, E)$ este o structură formată dintr-o mulțime de noduri (vârfuri) $V$ și o mulțime de muchii (conexiuni) $E \\subseteq V \\times V$. În funcție de direcția muchiilor, avem grafuri **orientate** sau **neorientate**. De asemenea, muchiile pot avea un cost (grafuri **ponderate**).\n\nReprezentarea prin **Liste de adiacență** stochează vecinii fiecărui nod $u$ ca o listă dinamică. Astfel, pentru fiecare nod $u$, menținem o listă cu toate nodurile $v$ pentru care există o muchie $(u, v)$.\n\nAceastă reprezentare este optimă pentru grafuri rare (cu puține muchii), economisind memorie în comparație cu o matrice de adiacență de dimensiune $V \\times V$, unde majoritatea celulelor ar fi egale cu $0$.",
  "complexity": "### Complexitate\n\n- **Spațiu:** $O(V + E)$ - optim pentru grafuri rare (unde numărul de muchii este mult mai mic decât numărul maxim posibil, adică $E \\ll V^2$).\n- **Timp:**\n  - Adăugare muchie: $O(1)$.\n  - Verificare existență muchie $(u, v)$: $O(\\deg(u))$, unde $\\deg(u)$ este gradul nodului $u$.\n  - Parcurgere vecini nod $u$: $O(\\deg(u))$.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Matrice de adiacență**: Matrice $V \\times V$ unde $A[i][j] = 1$ dacă există muchie de la $i$ la $j$. Utilă pentru grafuri dense.\n- **Listă de muchii**: Vector simplu cu perechi de forma $(u, v)$, util în algoritmi precum Kruskal sau Bellman-Ford.",
  "applications": "### Aplicații Reale\n\n- Rețele sociale (liste de adiacență pentru stocarea legăturilor de prietenie).\n- Hărți rutiere și sisteme GPS.\n- Găsirea conexiunilor directe între servere în rețele.",
  "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V);\n    \n    adj[0].push_back(1);\n    adj[1].push_back(0);\n    \n    adj[0].push_back(4);\n    adj[4].push_back(0);\n    \n    adj[1].push_back(2);\n    adj[2].push_back(1);\n    \n    adj[1].push_back(3);\n    adj[3].push_back(1);\n    \n    adj[1].push_back(4);\n    adj[4].push_back(1);\n    \n    for (int i = 0; i < V; ++i) {\n        cout << \"Nodul \" << i << \" conectat cu: \";\n        for (int neighbor : adj[i]) {\n            cout << neighbor << \" \";\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 7,
      "text": "Inițializăm numărul de noduri ale grafului la $V = 5$.",
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
      ]
    },
    {
      "line": 8,
      "text": "Declarăm listele de adiacență ca fiind un vector de vectori cu 5 elemente vide.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
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
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm nodul 1 în lista de vecini a nodului 0.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
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
            "x": 100,
            "y": 50,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 12,
      "text": "Adăugăm nodul 0 în lista de vecini a nodului 1 (graf neorientat).",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
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
            "x": 100,
            "y": 50,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "active": true
          }
        ]
      }
    },
    {
      "line": 14,
      "text": "Adăugăm nodul 4 în lista de vecini a nodului 0.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]",
                "active": true
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
            "x": 100,
            "y": 50,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1"
          },
          {
            "id": "4",
            "x": 150,
            "y": 200,
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
      "line": 15,
      "text": "Adăugăm nodul 0 în lista de vecini a nodului 4.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[0]: [1, 4]"
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
            "x": 100,
            "y": 50,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1"
          },
          {
            "id": "4",
            "x": 150,
            "y": 200,
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
            "active": true
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 2 în lista de vecini a nodului 1.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[2]: []"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 150,
            "y": 120,
            "label": "2",
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
      "line": 18,
      "text": "Adăugăm nodul 1 în lista de vecini a nodului 2.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2]"
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
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 150,
            "y": 120,
            "label": "2",
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
            "target": "2",
            "active": true
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Adăugăm nodul 3 în lista de vecini a nodului 1.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2, 3]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[3]: []"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 200,
            "label": "3",
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
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adăugăm nodul 1 în lista de vecini a nodului 3.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2, 3]"
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
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 200,
            "label": "3",
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
            "target": "3",
            "active": true
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Adăugăm nodul 4 în lista de vecini a nodului 1.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "adj[4]: [0]"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "4",
            "x": 150,
            "y": 200,
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
      "line": 24,
      "text": "Adăugăm nodul 1 în lista de vecini a nodului 4.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență",
          "groups": [
            [
              {
                "val": "adj[1]: [0, 2, 3, 4]"
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
            "id": "1",
            "x": 50,
            "y": 120,
            "label": "1",
            "state": "active"
          },
          {
            "id": "4",
            "x": 150,
            "y": 200,
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
            "active": true
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Afișăm listele de adiacență. Pornim bucla de la `i = 0`.",
      "blocksVisual": [
        {
          "label": "Index",
          "groups": [
            [
              {
                "val": "i: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 27,
      "text": "Afișăm prefixul 'Nodul 0 conectat cu: '.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              {
                "val": "i: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Începem parcurgerea vecinilor nodului 0. Primul vecin este 1.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
          "groups": [
            [
              {
                "val": "neighbor: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Tipărim nodul 1.",
      "blocksVisual": [
        {
          "label": "Afișat",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Trecem la următorul vecin al nodului 0, care este 4.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
          "groups": [
            [
              {
                "val": "neighbor: 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Tipărim nodul 4.",
      "blocksVisual": [
        {
          "label": "Afișat",
          "groups": [
            [
              {
                "val": "4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Mergem la `i = 1` în bucla exterioară.",
      "blocksVisual": [
        {
          "label": "Index",
          "groups": [
            [
              {
                "val": "i: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Începem parcurgerea vecinilor nodului 1. Primul vecin este 0.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
          "groups": [
            [
              {
                "val": "neighbor: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Tipărim nodul 0.",
      "blocksVisual": [
        {
          "label": "Afișat",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Următorul vecin al nodului 1 este 2.",
      "blocksVisual": [
        {
          "label": "Vecin curent",
          "groups": [
            [
              {
                "val": "neighbor: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Tipărim nodul 2.",
      "blocksVisual": [
        {
          "label": "Afișat",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Încheiem rularea programului cu succes.",
      "blocksVisual": [
        {
          "label": "Terminare",
          "groups": [
            [
              {
                "val": "return 0"
              }
            ]
          ]
        }
      ]
    }
  ]
};
