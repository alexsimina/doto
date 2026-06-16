module.exports = {
  "presentation": "### Prezentare Generală\n\nO Componentă Tare Conexă (Strongly Connected Component - SCC) într-un graf orientat este un subgraf maximal în care, pentru orice pereche de noduri (u, v), există un drum de la u la v ȘI un drum de la v la u.\\n\\nAlgoritmii clasici pentru găsirea SCC-urilor sunt Tarjan și Kosaraju. Kosaraju folosește 2 parcurgeri DFS (una pe graful normal pentru a determina o ordine de finalizare, alta pe graful transpus, explorând în ordinea inversă).\\n\\nComponentele Biconexe se aplică grafurilor neorientate. Un graf este biconex dacă nu are niciun 'Punct de Articulație' (un nod care, dacă e șters, rupe graful în mai multe componente).",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - Kosaraju face doar 2 parcurgeri DFS, iar transpunerea grafului durează tot O(V + E).\\n- **Spațiu:** O(V + E) pentru graful transpus (la Kosaraju) și O(V) stiva pentru DFS.\n",
  "variations": "### Variații și Edge Cases\n\nGăsirea Punctelor de Articulație și a Punților (Bridges) - muchii a căror eliminare crește numărul de componente conexe (algoritmul lui Tarjan / DFS Low-Link).",
  "applications": "### Aplicații\n\nAnaliza rețelelor ecologice, 2-SAT (Satisfiability) poate fi rezolvat în timp liniar transformând expresia logică într-un graf de implicații și găsind SCC-urile.",
  code: `
#include <iostream>
#include <vector>
#include <stack>

using namespace std;

void dfs1(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& s) {
    visited[node] = true;
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) dfs1(neighbor, adj, visited, s);
    }
    s.push(node); // Punem in stiva la finalizarea vizitei
}

void dfs2(int node, vector<vector<int>>& adjT, vector<bool>& visited, vector<int>& component) {
    visited[node] = true;
    component.push_back(node);
    for (int neighbor : adjT[node]) {
        if (!visited[neighbor]) dfs2(neighbor, adjT, visited, component);
    }
}

int main() {
    int V = 5;
    vector<vector<int>> adj(V), adjT(V);
    // Muchii: 0->2, 2->1, 1->0, 0->3, 3->4
    adj[0].push_back(2); adjT[2].push_back(0);
    adj[2].push_back(1); adjT[1].push_back(2);
    adj[1].push_back(0); adjT[0].push_back(1);
    adj[0].push_back(3); adjT[3].push_back(0);
    adj[3].push_back(4); adjT[4].push_back(3);

    vector<bool> visited(V, false);
    stack<int> s;
    
    // Pasul 1: DFS pe graful original
    for (int i = 0; i < V; ++i) {
        if (!visited[i]) dfs1(i, adj, visited, s);
    }
    
    fill(visited.begin(), visited.end(), false);
    
    // Pasul 2: DFS pe graful transpus, in ordinea stivei
    cout << "Componentele Tare Conexe:
";
    while (!s.empty()) {
        int node = s.top();
        s.pop();
        
        if (!visited[node]) {
            vector<int> component;
            dfs2(node, adjT, visited, component);
            for (int x : component) cout << x << " ";
            cout << "
";
        }
    }
    return 0;
}
`,
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
