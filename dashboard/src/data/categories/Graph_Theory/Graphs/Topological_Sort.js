export const data = {
  "presentation": "### Prezentare Generală\n\nSortarea Topologică este o aranjare liniară a nodurilor dintr-un DAG (Directed Acyclic Graph) astfel încât pentru fiecare muchie orientată u -> v, nodul u apare înaintea nodului v în acea înșiruire.\\n\\nPentru ce e folosită? Pentru a programa o serie de task-uri care au dependențe (de ex. un curs universitar necesită alte cursuri ca pre-rechizite, sau compilarea unui proiect depinde de ordinea modulelor).\\n\\nAlgoritmul lui Kahn: Calculăm 'gradul de intrare' (in-degree) pentru fiecare nod. Nodurile cu grad 0 nu depind de nimic, deci pot fi adăugate primele. Le adăugăm într-o coadă, le scoatem, și 'ștergem' muchiile care pornesc din ele, scăzând gradul vecinilor. Când un vecin ajunge la grad 0, îl adăugăm în coadă.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - fiecare nod este introdus în coadă o dată, iar fiecare muchie e vizitată la scăderea gradului.\\n- **Spațiu:** O(V) pentru vectorul de in-degree și coadă.\n",
  "variations": "### Variații și Edge Cases\n\nDetectarea unui ciclu într-un graf orientat: dacă la finalul algoritmului Kahn nu am reușit să punem toate cele V noduri în lista sortată, înseamnă că există o dependență circulară (un ciclu)!",
  "applications": "### Aplicații\n\nDependency Resolution (cum face `npm` sau `apt`), scheduling de task-uri.",
  code: `
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> topologicalSort(int V, vector<vector<int>>& adj) {
    vector<int> inDegree(V, 0);
    // Calculam gradul de intrare pentru fiecare nod
    for (int i = 0; i < V; ++i) {
        for (int neighbor : adj[i]) {
            inDegree[neighbor]++;
        }
    }
    
    queue<int> q;
    // Adaugam nodurile care nu depind de nimic (inDegree == 0)
    for (int i = 0; i < V; ++i) {
        if (inDegree[i] == 0) q.push(i);
    }
    
    vector<int> topOrder;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        topOrder.push_back(node);
        
        // Simulam stergerea muchiilor
        for (int neighbor : adj[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }
    
    if (topOrder.size() != V) {
        cout << "Eroare: Graful are un ciclu!
";
        return {};
    }
    return topOrder;
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);
    // 5 -> 0, 5 -> 2, 4 -> 0, 4 -> 1, 2 -> 3, 3 -> 1
    adj[5].push_back(0); adj[5].push_back(2);
    adj[4].push_back(0); adj[4].push_back(1);
    adj[2].push_back(3); adj[3].push_back(1);
    
    vector<int> res = topologicalSort(V, adj);
    cout << "Sortare Topologica: ";
    for (int n : res) cout << n << " ";
    cout << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 9,
      "text": "Calculăm gradul de intrare. Adică de câte alte noduri depinde fiecare nod.",
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
            "y": 130,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
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
      "line": 17,
      "text": "Nodurile 4 și 5 au inDegree 0. Pot fi executate primele! Le băgăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 130,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "active"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
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
      "text": "Scoatem 4. Îl adăugăm la rezultat.",
      "blocksVisual": [
        {
          "label": "Rezultat",
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
            "y": 130,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
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
      "text": "Scădem inDegree pentru vecinii lui 4 (adică 0 și 1).",
      "blocksVisual": [
        {
          "label": "InDegree Update",
          "groups": [
            [
              {
                "val": "0: 1",
                "active": true
              },
              {
                "val": "1: 1",
                "active": true
              },
              {
                "val": "2: 1"
              },
              {
                "val": "3: 1"
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
            "y": 130,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
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
      "text": "Scoatem 5. Îl adăugăm la rezultat.",
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
            "y": 130,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
      "text": "Scădem inDegree pentru vecinii lui 5 (0 și 2). Noul inDegree pentru 0 devine 0! Pentru 2 devine 0!",
      "blocksVisual": [
        {
          "label": "InDegree Update",
          "groups": [
            [
              {
                "val": "0: 0",
                "active": true
              },
              {
                "val": "2: 0",
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
            "y": 130,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
      "text": "Fiindcă 0 și 2 au atins 0 dependențe, le punem în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 140,
            "y": 130,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
      "text": "Scoatem 0. Acesta nu are vecini. Rezultat: [4, 5, 0].",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "4, 5, 0"
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
            "y": 130,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
      "text": "Scoatem 2. Vecinul său e 3. Scădem inDegree-ul lui 3. Devine 0! Punem 3 în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
            "y": 130,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1"
          },
          {
            "id": "2",
            "x": 80,
            "y": 130,
            "label": "2",
            "state": "visited"
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
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
      "text": "Scoatem 3. Vecinul e 1. Scădem inDegree-ul lui 1. Devine 0! Punem 1 în coadă.",
      "blocksVisual": [
        {
          "label": "Coadă",
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
            "y": 130,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 80,
            "y": 130,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
      "text": "Scoatem 1. Nu are vecini. Am terminat!",
      "blocksVisual": [
        {
          "label": "Rezultat Final",
          "groups": [
            [
              {
                "val": "4, 5, 0, 2, 3, 1",
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
            "y": 130,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 200,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 80,
            "y": 130,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 230,
            "y": 50,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 50,
            "y": 50,
            "label": "5",
            "state": "visited"
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
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Sortare Topologica",
        "url": "https://www.infoarena.ro/problema/sortaret",
        "desc": "Problema clasica"
      }
    ],
    "medium": [
      {
        "title": "Course Schedule",
        "url": "https://leetcode.com/problems/course-schedule/",
        "desc": "Detectie Cicluri"
      },
      {
        "title": "Course Schedule II",
        "url": "https://leetcode.com/problems/course-schedule-ii/",
        "desc": "Aflare Ordine"
      }
    ],
    "hard": [
      {
        "title": "Alien Dictionary",
        "url": "https://leetcode.com/problems/alien-dictionary/",
        "desc": "Dedus alfabete extraterestre cu DAG"
      }
    ]
  }
};
