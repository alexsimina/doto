export const data = {
  "presentation": "### Algoritmul lui Kosaraju (SCC)\n\nAlgoritmul lui Kosaraju determină Componentele Tare Conexe ale unui graf orientat $G = (V, E)$ folosind **două treceri DFS**.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - se fac două parcurgeri DFS complete și o transpunere de graf, toate liniare.\n- **Spațiu:** $O(V + E)$ - pentru memorarea grafului transpus și a stivei.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Arbore de condensare**: Graful rezultat prin înlocuirea fiecărei componente tare conexe cu un singur nod. Acesta este întotdeauna un DAG (graf orientat aciclic).",
  "applications": "### Aplicații Reale\n\n- Optimizarea codului sursă prin determinarea recursivității în definițiile de funcții.\n- Rezolvarea problemelor de logică matematică (2-SAT).\n- Gruparea paginilor web strâns interconectate (PageRank).",
  "code": "#include <iostream>\n#include <vector>\n#include <stack>\n\nusing namespace std;\n\nvoid dfs1(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& s) {\n    visited[node] = true;\n    for (int neighbor : adj[node]) {\n        if (!visited[neighbor]) dfs1(neighbor, adj, visited, s);\n    }\n    s.push(node);\n}\n\nvoid dfs2(int node, vector<vector<int>>& adjT, vector<bool>& visited, vector<int>& component) {\n    visited[node] = true;\n    component.push_back(node);\n    for (int neighbor : adjT[node]) {\n        if (!visited[neighbor]) dfs2(neighbor, adjT, visited, component);\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V), adjT(V);\n    \n    // 0->2, 2->1, 1->0, 0->3, 3->4\n    adj[0].push_back(2); adjT[2].push_back(0);\n    adj[2].push_back(1); adjT[1].push_back(2);\n    adj[1].push_back(0); adjT[0].push_back(1);\n    adj[0].push_back(3); adjT[3].push_back(0);\n    adj[3].push_back(4); adjT[4].push_back(3);\n\n    vector<bool> visited(V, false);\n    stack<int> s;\n    \n    for (int i = 0; i < V; ++i) {\n        if (!visited[i]) dfs1(i, adj, visited, s);\n    }\n    \n    fill(visited.begin(), visited.end(), false);\n    \n    while (!s.empty()) {\n        int node = s.top();\n        s.pop();\n        if (!visited[node]) {\n            vector<int> component;\n            dfs2(node, adjT, visited, component);\n            for (int x : component) cout << x << \" \";\n            cout << \"\\n\";\n        }\n    }\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 31,
      "text": "Pregătim vectorul `visited` și stiva `s` pentru prima fază.",
      "blocksVisual": [
        {
          "label": "Faza 1",
          "groups": [
            [
              {
                "val": "Start"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "Iterăm prin noduri pentru a ne asigura că vizităm tot graful. Începem cu `i = 0`.",
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
      "line": 35,
      "text": "Nodul 0 nu este vizitat. Apelăm `dfs1(0)`.",
      "blocksVisual": [
        {
          "label": "Apel DFS1",
          "groups": [
            [
              {
                "val": "dfs1(0)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 0 ca vizitat în prima trecere.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Parcurgem vecinii lui 0 pe graful original: [2, 3]. Primul vecin este 2.",
      "blocksVisual": [
        {
          "label": "Vecin",
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
      "line": 10,
      "text": "Nodul 2 nu este vizitat, apelăm `dfs1(2)`.",
      "blocksVisual": [
        {
          "label": "Stack Apeluri",
          "groups": [
            [
              {
                "val": "dfs1(0)"
              },
              {
                "val": "dfs1(2)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 2 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[2]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Parcurgem vecinii lui 2: [1]. Vizităm vecinul 1.",
      "blocksVisual": [
        {
          "label": "Vecin",
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
      "line": 10,
      "text": "Nodul 1 nu este vizitat, apelăm `dfs1(1)`.",
      "blocksVisual": [
        {
          "label": "Stack Apeluri",
          "groups": [
            [
              {
                "val": "dfs1(0)"
              },
              {
                "val": "dfs1(2)"
              },
              {
                "val": "dfs1(1)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 1 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[1]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Vecinii lui 1 sunt [0]. But 0 is visited already.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Nodul 1 termină explorarea. Îl adăugăm la stiva `s`.",
      "blocksVisual": [
        {
          "label": "Stiva s",
          "groups": [
            [
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Revenim în `dfs1(2)`. Nu are alți vecini. Îl adăugăm în stiva `s`.",
      "blocksVisual": [
        {
          "label": "Stiva s",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Revenim în `dfs1(0)`. Următorul său vecin este 3. Apelăm `dfs1(3)`.",
      "blocksVisual": [
        {
          "label": "Stack Apeluri",
          "groups": [
            [
              {
                "val": "dfs1(0)"
              },
              {
                "val": "dfs1(3)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 3 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[3]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Vecinul lui 3 este 4. Apelăm `dfs1(4)`.",
      "blocksVisual": [
        {
          "label": "Stack Apeluri",
          "groups": [
            [
              {
                "val": "dfs1(0)"
              },
              {
                "val": "dfs1(3)"
              },
              {
                "val": "dfs1(4)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Marcăm nodul 4 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[4]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Nodul 4 nu are vecini. Îl punem în stivă.",
      "blocksVisual": [
        {
          "label": "Stiva s",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Nodul 3 se termină și el. Îl punem în stivă.",
      "blocksVisual": [
        {
          "label": "Stiva s",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "4"
              },
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Nodul 0 se termină și el. Îl punem în stivă.",
      "blocksVisual": [
        {
          "label": "Stiva s",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "4"
              },
              {
                "val": "3"
              },
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 38,
      "text": "Faza 2: Resetăm vectorul `visited` pe `false`.",
      "blocksVisual": [
        {
          "label": "Reset",
          "groups": [
            [
              {
                "val": "visited: all false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Intrăm în bucla de extragere. Cât timp stiva nu e goală, verificăm vârful.",
      "blocksVisual": [
        {
          "label": "Stiva",
          "groups": [
            [
              {
                "val": "0"
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
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 42,
      "text": "Extragem `node = 0` din stivă.",
      "blocksVisual": [
        {
          "label": "Nod extras",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 44,
      "text": "0 nu este vizitat. Apelăm `dfs2` pe graful transpus, identificând componenta tare conexă: {0, 1, 2}.",
      "blocksVisual": [
        {
          "label": "SCC identificat",
          "groups": [
            [
              {
                "val": "0, 1, 2",
                "active": true
              }
            ]
          ]
        }
      ]
    }
  ]
};
