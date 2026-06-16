module.exports = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul lui Tarjan este o metodă foarte elegantă bazată pe o singură parcurgere DFS pentru a găsi Componentele Tare Conexe (SCC) într-un graf orientat.\\n\\nSe bazează pe menținerea a două valori pentru fiecare nod:\\n1. `tin[u]`: momentul de timp la care nodul u a fost descoperit.\\n2. `low[u]`: cea mai mică adâncime (moment de timp) ce poate fi atinsă dintr-un descendent al lui u printr-o muchie de întoarcere (back edge).\\n\\nDacă după evaluarea tuturor vecinilor `low[u] == tin[u]`, înseamnă că nu există nicio cale de a ieși din subarborele lui u spre un strămoș. Deci u este 'rădăcina' unei componente tare conexe, iar tot ce este stivuit deasupra lui aparține acestei componente.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V + E) - o singură parcurgere DFS.\\n- **Spațiu:** O(V) pentru stiva de noduri, `tin`, `low` și `onStack`.\n",
  "variations": "### Variații și Edge Cases\n\nAcelași concept (low-link) se folosește pe grafuri neorientate pentru a găsi Puncte de Articulație (Cut Vertices) și Punți (Bridges).",
  "applications": "### Aplicații\n\nDetectarea 'single points of failure' (puncte critice) în rețele de computere, reducerea grafurilor la DAG-uri (Directed Acyclic Graphs).",
  code: `
#include <iostream>
#include <vector>
#include <stack>

using namespace std;

vector<int> adj[1005];
int tin[1005], low[1005];
bool onStack[1005];
stack<int> st;
int timer = 0, sccCount = 0;

void tarjan(int u) {
    tin[u] = low[u] = ++timer;
    st.push(u);
    onStack[u] = true;

    for (int v : adj[u]) {
        if (tin[v] == 0) {
            // Nod nevizitat (Tree edge)
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (onStack[v]) {
            // Back edge spre un nod din componenta curenta
            low[u] = min(low[u], tin[v]);
        }
    }

    // Daca u este radacina unei componente tare conexe
    if (low[u] == tin[u]) {
        sccCount++;
        cout << "SCC " << sccCount << ": ";
        while (true) {
            int v = st.top();
            st.pop();
            onStack[v] = false;
            cout << v << " ";
            if (u == v) break;
        }
        cout << "\
";
    }
}

int main() {
    int V = 4;
    adj[1].push_back(2);
    adj[2].push_back(3);
    adj[3].push_back(1); // Ciclu 1-2-3
    adj[3].push_back(4); // Muchie catre alt nod
    
    for (int i = 1; i <= V; i++) {
        if (tin[i] == 0) {
            tarjan(i);
        }
    }
    return 0;
}
`,
  "explanations": [
    {
      "line": 14,
      "text": "Începem DFS-ul din nodul 1. Îi atribuim `tin[1] = 1`, `low[1] = 1`. Îl punem pe stivă.",
      "blocksVisual": [
        {
          "label": "DFS",
          "groups": [
            [
              {
                "val": "tin[1]=1, low[1]=1",
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
            "label": "1",
            "x": 100,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 50
          },
          {
            "id": "3",
            "label": "3",
            "x": 150,
            "y": 150
          },
          {
            "id": "4",
            "label": "4",
            "x": 250,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Nodul 1 apelează recursiv pentru 2, apoi 2 pentru 3. Astfel, 2 și 3 primesc timer-uri succesive și intră pe stivă.",
      "blocksVisual": [
        {
          "label": "Stiva",
          "groups": [
            [
              {
                "val": "Stiva: [1, 2, 3]",
                "active": true
              }
            ],
            [
              {
                "val": "tin[3]=3, low[3]=3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "4",
            "label": "4",
            "x": 250,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "style": "thick"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Din nodul 3 vedem muchia către 1. Nodul 1 e deja vizitat și pe stivă, deci avem o muchie de întoarcere (back edge). Actualizăm `low[3] = min(low[3], tin[1]) = 1`.",
      "blocksVisual": [
        {
          "label": "Low Link",
          "groups": [
            [
              {
                "val": "low[3] = min(3, 1) = 1",
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
            "label": "1",
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "4",
            "label": "4",
            "x": 250,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "style": "thick"
          },
          {
            "source": "3",
            "target": "1",
            "style": "dashed"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 20,
      "text": "Tot din 3, DFS-ul continuă în 4. `tin[4] = 4, low[4] = 4`. Nodul 4 nu are muchii. Deoarece `low[4] == tin[4] == 4`, am găsit o SCC! O extragem din stivă: componenta este doar [4].",
      "blocksVisual": [
        {
          "label": "Extract SCC",
          "groups": [
            [
              {
                "val": "SCC: {4}",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 100,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "4",
            "label": "4",
            "x": 250,
            "y": 150,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Ne întoarcem din 3 în 2. Actualizăm `low[2] = min(low[2], low[3]) = 1`. Ne întoarcem din 2 în 1. Actualizăm `low[1] = min(low[1], low[2]) = 1`.",
      "blocksVisual": [
        {
          "label": "Backtrack",
          "groups": [
            [
              {
                "val": "low propagat la 1",
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
            "label": "1",
            "x": 100,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 150,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 250,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "style": "thick"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Pentru nodul 1, avem `low[1] == tin[1] == 1`. Extragem toate elementele de pe stivă până dăm de 1. Componenta a doua este [3, 2, 1]!",
      "blocksVisual": [
        {
          "label": "Extract SCC",
          "groups": [
            [
              {
                "val": "SCC: {3, 2, 1}",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 100,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 50,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "4",
            "label": "4",
            "x": 250,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "1"
          },
          {
            "source": "3",
            "target": "4"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "CTC",
        "url": "https://www.infoarena.ro/problema/ctc",
        "desc": "Problema clasica Componente Tare Conexe."
      }
    ],
    "medium": [
      {
        "title": "Critical Connections in a Network",
        "url": "https://leetcode.com/problems/critical-connections-in-a-network/",
        "desc": "Aplicație a conceptului de 'low-link' (Tarjan Bridge-finding)."
      }
    ],
    "hard": []
  }
};
