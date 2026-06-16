export const data = {
  "presentation": "### Prezentare Generală\n\nBreadth First Search (Parcurgerea în Lățime) explorează graful nivel cu nivel, plecând de la nodul sursă. Întâi vizitează toți vecinii direcți, apoi vecinii vecinilor, și așa mai departe.\\n\\nAcest comportament face ca BFS să fie algoritmul perfect pentru a găsi **cel mai scurt drum** (ca număr de muchii) într-un graf neponderat.\\n\\nImplementarea se bazează pe o structură de date de tip Coadă (Queue - FIFO: First In, First Out).",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - fiecare nod este adăugat în coadă o singură dată, iar fiecare muchie este verificată o singură dată.\\n- **Spațiu:** O(V) - pentru coada de așteptare și vectorul de vizitați. În cel mai rău caz (un graf stea), coada va conține V-1 noduri.\n",
  "variations": "### Variații și Edge Cases\n\nLee Algorithm (BFS pe o matrice pentru găsirea drumului minim într-un labirint), 0-1 BFS (dacă muchiile au cost 0 sau 1, folosim un deque în loc de queue), Multi-source BFS (dacă avem mai multe surse din care plecăm simultan).",
  "applications": "### Aplicații\n\nGăsirea celui mai scurt drum pe o hartă fără ponderi, rețele peer-to-peer (pentru a găsi nodurile vecine), web crawlers, algoritmul lui Ford-Fulkerson (pentru aflarea drumului de creștere în rețea - Edmonds-Karp).",
  code: `
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

void bfs(int start, vector<vector<int>>& adj, int V) {
    vector<bool> visited(V, false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        cout << node << " ";
        
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}

int main() {
    int V = 6;
    vector<vector<int>> adj = {
        {1, 2},    // Vecini 0
        {0, 3, 4}, // Vecini 1
        {0, 4},    // Vecini 2
        {1, 5},    // Vecini 3
        {1, 2, 5}, // Vecini 4
        {3, 4}     // Vecini 5
    };
    
    cout << "Parcurgere BFS pornind din 0: ";
    bfs(0, adj, V);
    cout << "
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 40,
      "text": "Începem BFS din nodul 0.",
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
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "line": 11,
      "text": "Marcăm 0 ca vizitat.",
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
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "line": 12,
      "text": "Adăugăm 0 în coadă.",
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
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Cât timp coada nu e goală, extragem primul element.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "0"
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
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Explorăm vecinii lui 0 (1 și 2). Niciunul nu e vizitat.",
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
            "state": "active"
          },
          {
            "id": "3",
            "x": 50,
            "y": 150,
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "line": 22,
      "text": "Marcăm 1 și 2 ca vizitați și îi adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
          "groups": [
            [
              {
                "val": "1",
                "active": true
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
            "label": "3"
          },
          {
            "id": "4",
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Extragem pe 1 din coadă.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "1"
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
            "x": 110,
            "y": 150,
            "label": "4"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Vecinii lui 1 sunt 0, 3, 4. 0 este vizitat, deci adăugăm 3 și 4.",
      "blocksVisual": [
        {
          "label": "Coadă Nouă",
          "groups": [
            [
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
            "x": 110,
            "y": 150,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Extragem pe 2 din coadă.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "2"
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
            "x": 110,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Vecinii lui 2 sunt 0 și 4. Ambele sunt deja vizitate/în coadă. Nu adăugăm nimic.",
      "blocksVisual": [
        {
          "label": "Skip",
          "groups": [
            [
              {
                "val": "Niciunul adăugat"
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
            "x": 110,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Extragem pe 3. Vecinii săi: 1 (vizitat), 5 (nevizitat).",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "3"
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
            "x": 110,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
      "text": "Extragem pe 4. Vecinii (1, 2, 5) toți vizitați. Apoi extragem 5. Gata!",
      "blocksVisual": [
        {
          "label": "Ordinea Vizitării",
          "groups": [
            [
              {
                "val": "0 -> 1 -> 2 -> 3 -> 4 -> 5",
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
            "x": 110,
            "y": 150,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 80,
            "y": 200,
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
  ],
  "problems": {
    "easy": [
      {
        "title": "BFS Parcurgere",
        "url": "https://www.pbinfo.ro/probleme/418/bfs",
        "desc": "Parcurgere simplă"
      }
    ],
    "medium": [
      {
        "title": "Rotting Oranges",
        "url": "https://leetcode.com/problems/rotting-oranges/",
        "desc": "Multi-source BFS"
      }
    ],
    "hard": [
      {
        "title": "Word Ladder",
        "url": "https://leetcode.com/problems/word-ladder/",
        "desc": "BFS pentru drum minim în graf de cuvinte"
      }
    ]
  }
};
