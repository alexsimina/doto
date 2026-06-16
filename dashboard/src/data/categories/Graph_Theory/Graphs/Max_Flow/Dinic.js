export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul lui Dinic este un algoritm extrem de eficient pentru a găsi fluxul maxim (Max Flow) într-o rețea de capacități.\\n\\nPentru a evita alegerea unor 'drumuri de creștere' ineficiente (cum poate face Edmonds-Karp), Dinic folosește un concept numit **Graf pe Niveluri (Level Graph)**:\\n1. Folosim BFS pentru a da un nivel fiecărui nod, pornind de la Sursă (nivel 0). Păstrăm doar muchiile care merg de la un nivel `L` la `L+1`.\\n2. Rulăm mai multe DFS-uri pentru a trimite flux (Blocking Flows) pe aceste drumuri cele mai scurte simultan, până când Destinația (T) nu mai poate fi atinsă.\\n3. Repetăm procesul până când T nu mai poate fi atins deloc de la S.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V^2 * E). În grafuri cu capacitate unitară (cum ar fi Bipartite Matching), devine O(E * sqrt(V)), fiind standardul de aur pentru cuplaj maxim.\\n- **Spațiu:** O(V + E).\n",
  "variations": "### Variații și Edge Cases\n\nHopcroft-Karp este practic algoritmul lui Dinic specializat pe grafuri bipartite.",
  "applications": "### Aplicații\n\nMatching Bipartit (asignarea studenților la proiecte), segmentarea imaginilor în Computer Vision (Min-Cut), rutarea traficului aerian.",
  "code": "\n#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nstruct Edge {\n    int to, cap, flow, rev;\n};\n\nvector<Edge> adj[100];\nint level[100];\nint ptr[100];\n\nvoid addEdge(int from, int to, int cap) {\n    adj[from].push_back({to, cap, 0, (int)adj[to].size()});\n    adj[to].push_back({from, 0, 0, (int)adj[from].size() - 1});\n}\n\nbool bfs(int s, int t) {\n    fill(level, level + 100, -1);\n    level[s] = 0;\n    queue<int> q;\n    q.push(s);\n    \n    while(!q.empty()) {\n        int v = q.front(); q.pop();\n        for(auto edge : adj[v]) {\n            if(edge.cap - edge.flow > 0 && level[edge.to] == -1) {\n                level[edge.to] = level[v] + 1;\n                q.push(edge.to);\n            }\n        }\n    }\n    return level[t] != -1;\n}\n\nint dfs(int v, int t, int pushed) {\n    if(pushed == 0) return 0;\n    if(v == t) return pushed;\n    \n    for(int& cid = ptr[v]; cid < adj[v].size(); ++cid) {\n        auto& edge = adj[v][cid];\n        int tr = edge.to;\n        if(level[v] + 1 != level[tr] || edge.cap - edge.flow == 0) continue;\n        \n        int push = dfs(tr, t, min(pushed, edge.cap - edge.flow));\n        if(push == 0) continue;\n        \n        edge.flow += push;\n        adj[tr][edge.rev].flow -= push;\n        return push;\n    }\n    return 0;\n}\n\nint dinic(int s, int t) {\n    int flow = 0;\n    while(bfs(s, t)) {\n        fill(ptr, ptr + 100, 0);\n        while(int pushed = dfs(s, t, 1e9)) {\n            flow += pushed;\n        }\n    }\n    return flow;\n}\n\nint main() {\n    // S=0, T=3\n    addEdge(0, 1, 3);\n    addEdge(0, 2, 2);\n    addEdge(1, 2, 1);\n    addEdge(1, 3, 2);\n    addEdge(2, 3, 3);\n    \n    cout << \"Max Flow: \" << dinic(0, 3) << \"\";\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 49,
      "text": "Rulăm BFS din Sursă (nod 0) pentru a construi Graful pe Niveluri. Căutăm cele mai scurte drumuri (nefolosite la maxim) către Destinație (nod 3).",
      "blocksVisual": [
        {
          "label": "BFS Niveluri",
          "groups": [
            [
              {
                "val": "level[0]=0"
              },
              {
                "val": "level[1]=1, level[2]=1"
              },
              {
                "val": "level[3]=2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
            "x": 50,
            "y": 100,
            "state": "active"
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
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "BFS Niveluri",
          "groups": [
            [
              {
                "val": "level[0]=0"
              },
              {
                "val": "level[1]=1, level[2]=1"
              },
              {
                "val": "level[3]=2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
            "x": 50,
            "y": 100,
            "state": "active"
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
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "DFS Pushing",
          "groups": [
            [
              {
                "val": "Push flux pe S->1->T",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS a găsit că T are nivelul 2. Acum apelăm DFS pentru a găsi 'Blocking Flows' doar pe muchiile care merg de la L la L+1 (ex: nivel 0 -> 1 -> 2). De remarcat că muchia 1->2 nu va fi folosită acum deoarece ambele noduri sunt pe nivelul 1!",
      "blocksVisual": [
        {
          "label": "DFS Pushing",
          "groups": [
            [
              {
                "val": "Push flux pe S->1->T",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "DFS Pushing",
          "groups": [
            [
              {
                "val": "Push flux pe S->1->T",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Flux",
          "groups": [
            [
              {
                "val": "flow = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "2/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "0/2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "0/1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "0/3"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "Trimitem 2 unități de flux pe S->1->T (limitat de muchia 1->T). Flux total = 2.",
      "blocksVisual": [
        {
          "label": "Flux",
          "groups": [
            [
              {
                "val": "flow = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "2/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "0/2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "0/1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "0/3"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Flux",
          "groups": [
            [
              {
                "val": "flow = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "2/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "0/2"
          },
          {
            "source": "1",
            "target": "2",
            "label": "0/1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "0/3"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Flux",
          "groups": [
            [
              {
                "val": "flow = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "2/3"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "0/1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2"
          },
          {
            "source": "2",
            "target": "3",
            "label": "2/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "Încă suntem în faza curentă de DFS. Mai găsim un drum valid: S->2->T. Trimitem 2 unități de flux. Flux total = 4.",
      "blocksVisual": [
        {
          "label": "Flux",
          "groups": [
            [
              {
                "val": "flow = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "2/3"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "0/1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2"
          },
          {
            "source": "2",
            "target": "3",
            "label": "2/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Flux",
          "groups": [
            [
              {
                "val": "flow = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "2/3"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "0/1"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2"
          },
          {
            "source": "2",
            "target": "3",
            "label": "2/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Re-BFS",
          "groups": [
            [
              {
                "val": "level[0]=0, level[1]=1"
              },
              {
                "val": "level[2]=2, level[3]=3",
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
            "label": "S (0)",
            "x": 50,
            "y": 100,
            "state": "active"
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
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "T (3)",
            "x": 250,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "1 cap rama",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "PLIN",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "PLIN",
            "style": "dashed"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1 cap rama",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "DFS-ul se oprește deoarece nu mai putem trimite flux pe nivelurile actuale. Reluăm BFS-ul pentru a reface Nivelurile. De data asta, muchia 0->2 și 1->3 sunt pline (capacitate 0 rămasă). BFS va găsi drumul 0 -> 1 -> 2 -> 3!",
      "blocksVisual": [
        {
          "label": "Re-BFS",
          "groups": [
            [
              {
                "val": "level[0]=0, level[1]=1"
              },
              {
                "val": "level[2]=2, level[3]=3",
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
            "label": "S (0)",
            "x": 50,
            "y": 100,
            "state": "active"
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
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "T (3)",
            "x": 250,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "1 cap rama",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "PLIN",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "PLIN",
            "style": "dashed"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1 cap rama",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Re-BFS",
          "groups": [
            [
              {
                "val": "level[0]=0, level[1]=1"
              },
              {
                "val": "level[2]=2, level[3]=3",
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
            "label": "S (0)",
            "x": 50,
            "y": 100,
            "state": "active"
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
            "y": 150,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "T (3)",
            "x": 250,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "1 cap rama",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "PLIN",
            "style": "dashed"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "PLIN",
            "style": "dashed"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1 cap rama",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Max Flow = 5",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1/1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Trimitem 1 unitate de flux prin 0->1->2->3. Fluxul ajunge la maximul de 5. Următorul BFS nu va mai putea atinge T, și algoritmul se încheie.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Max Flow = 5",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1/1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Analizăm starea curentă a grafului. Se pregătește o tranziție.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Max Flow = 5",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1/1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Pregătim variabilele interne și structurile de date pentru următorul pas...",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Max Flow = 5",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1/1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Verificăm stabilitatea și corectitudinea rezultatului parțial...",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Max Flow = 5",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1/1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3/3",
            "style": "thick"
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Verificăm stabilitatea și corectitudinea rezultatului parțial...",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Max Flow = 5",
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
            "label": "S (0)",
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
            "label": "T (3)",
            "x": 250,
            "y": 100
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "3/3",
            "style": "thick"
          },
          {
            "source": "0",
            "target": "2",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "2",
            "label": "1/1",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "label": "2/2",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "3",
            "label": "3/3",
            "style": "thick"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Maximum Flow",
        "url": "https://www.infoarena.ro/problema/maxflow",
        "desc": "Problema clasica Infoarena."
      }
    ],
    "medium": [
      {
        "title": "Maximum Bipartite Matching",
        "url": "https://www.infoarena.ro/problema/cuplaj",
        "desc": "Problema Cuplaj Maxim Bipartit - se rezolvă perfect cu Dinic (sau Hopcroft-Karp)."
      }
    ],
    "hard": []
  }
};
