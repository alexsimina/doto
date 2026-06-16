module.exports = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul lui Prim găsește Arborele Minim de Acoperire (MST). Spre deosebire de Kruskal (care e bazat pe muchii), Prim crește un singur copac, pornind dintr-un nod arbitrar. La fiecare pas, algoritmul extrage cea mai ieftină muchie care conectează un nod deja aflat în arbore cu un nod nevizitat.",
  "complexity": "### Complexitate\n\n- **Timp:** O(E log V) folosind o Coadă de Priorități (Min-Heap).\\n- **Spațiu:** O(V + E) pentru graf și coadă.\n",
  "variations": "### Variații și Edge Cases\n\nPoate rula în O(E + V log V) teoretic dacă se folosește un Fibonacci Heap, util doar pentru grafuri extrem de dense.",
  "applications": "### Aplicații\n\nDesign-ul rețelelor electrice (cablarea caselor), design-ul plăcilor de circuit, algoritmi de aproximare pentru problema comisarului voiajor (TSP).",
  code: `
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

typedef pair<int, int> pii; // {cost, nod}
vector<pii> adj[10005];
bool inMST[10005];

int prim(int start) {
    priority_queue<pii, vector<pii>, greater<pii>> pq;
    
    int totalCost = 0;
    pq.push({0, start}); // cost 0, plecam din start
    
    while (!pq.empty()) {
        int cost = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (inMST[u]) continue; // daca e deja vizitat, ignoram muchia
        
        inMST[u] = true;
        totalCost += cost;
        
        for (auto edge : adj[u]) {
            int v = edge.second;
            int w = edge.first;
            if (!inMST[v]) {
                pq.push({w, v});
            }
        }
    }
    
    return totalCost;
}

int main() {
    // Graf: u, v, cost
    // 0-1 (4), 0-2 (1), 1-2 (2), 1-3 (5), 2-3 (8)
    adj[0].push_back({4, 1}); adj[1].push_back({4, 0});
    adj[0].push_back({1, 2}); adj[2].push_back({1, 0});
    adj[1].push_back({2, 2}); adj[2].push_back({2, 1});
    adj[1].push_back({5, 3}); adj[3].push_back({5, 1});
    adj[2].push_back({8, 3}); adj[3].push_back({8, 2});
    
    cout << "Cost MST: " << prim(0) << "\
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 14,
      "text": "Punem nodul de start în Priority Queue (Heap).",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "{0, nodul 0}",
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
            "x": 100,
            "y": 50,
            "state": "active"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150
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
            "label": "1"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Extragem din Heap muchia cu costul minim {0, 0}. Nodul 0 devine vizitat. TotalCost = 0.",
      "blocksVisual": [
        {
          "label": "inMST",
          "groups": [
            [
              {
                "val": "0",
                "active": true
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
            "label": "0",
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150
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
            "label": "1"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Introducem vecinii lui 0 în Heap: nodul 1 (cost 4) și nodul 2 (cost 1).",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "{1, nodul 2}",
                "active": true
              },
              {
                "val": "{4, nodul 1}"
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
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "4",
            "style": "dashed"
          },
          {
            "source": "0",
            "target": "2",
            "label": "1",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "La pasul următor, Heap-ul va extrage pe {1, 2}. Deci includem muchia 0-2 (cost 1) în MST. Nodul 2 devine vizitat. TotalCost = 1.",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "{4, nodul 1}"
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
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150
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
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Adăugăm vecinii lui 2 în Heap: nodul 1 (cost 2) și nodul 3 (cost 8). Heap-ul sortează elementele automat.",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "{2, nodul 1}",
                "active": true
              },
              {
                "val": "{4, nodul 1}"
              },
              {
                "val": "{8, nodul 3}"
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
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150,
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
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8",
            "style": "dashed"
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Se extrage elementul minim: nodul 1 prin muchia de cost 2 (conectat la 2). Adăugăm 2 în MST. TotalCost devine 3.",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "{4, nodul 1}"
              },
              {
                "val": "{8, nodul 3}"
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
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150
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
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Adăugăm vecinii lui 1: nodul 3 cu cost 5. Nodul 0 e deja în MST deci îl ignorăm. Heap are min {5, nodul 3}.",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "{4, nodul 1}"
              },
              {
                "val": "{5, nodul 3}",
                "active": true
              },
              {
                "val": "{8, nodul 3}"
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
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150,
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
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5",
            "style": "dashed"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Când vom scoate elementul {4, nodul 1}, vom vedea pe linia 21 că inMST[1] e deja true, deci ignorăm muchia (continue)! După aceea, scoatem pe {5, 3} și includem nodul 3 în MST. Cost final = 8.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "TotalCost = 8",
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
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 150,
            "state": "visited"
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
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "5",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "8"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Min Cost to Connect All Points",
        "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
        "desc": "Perfect pentru Prim pe graf dens (puncte 2D)."
      }
    ],
    "medium": [],
    "hard": []
  }
};
