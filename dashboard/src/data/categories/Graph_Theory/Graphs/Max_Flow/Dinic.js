export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul lui Dinic este un algoritm extrem de eficient pentru a găsi fluxul maxim (Max Flow) într-o rețea de capacități.\\n\\nPentru a evita alegerea unor 'drumuri de creștere' ineficiente (cum poate face Edmonds-Karp), Dinic folosește un concept numit **Graf pe Niveluri (Level Graph)**:\\n1. Folosim BFS pentru a da un nivel fiecărui nod, pornind de la Sursă (nivel 0). Păstrăm doar muchiile care merg de la un nivel `L` la `L+1`.\\n2. Rulăm mai multe DFS-uri pentru a trimite flux (Blocking Flows) pe aceste drumuri cele mai scurte simultan, până când Destinația (T) nu mai poate fi atinsă.\\n3. Repetăm procesul până când T nu mai poate fi atins deloc de la S.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V^2 * E). În grafuri cu capacitate unitară (cum ar fi Bipartite Matching), devine O(E * sqrt(V)), fiind standardul de aur pentru cuplaj maxim.\\n- **Spațiu:** O(V + E).\n",
  "variations": "### Variații și Edge Cases\n\nHopcroft-Karp este practic algoritmul lui Dinic specializat pe grafuri bipartite.",
  "applications": "### Aplicații\n\nMatching Bipartit (asignarea studenților la proiecte), segmentarea imaginilor în Computer Vision (Min-Cut), rutarea traficului aerian.",
  code: `
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Edge {
    int to, cap, flow, rev;
};

vector<Edge> adj[100];
int level[100];
int ptr[100];

void addEdge(int from, int to, int cap) {
    adj[from].push_back({to, cap, 0, (int)adj[to].size()});
    adj[to].push_back({from, 0, 0, (int)adj[from].size() - 1});
}

bool bfs(int s, int t) {
    fill(level, level + 100, -1);
    level[s] = 0;
    queue<int> q;
    q.push(s);
    
    while(!q.empty()) {
        int v = q.front(); q.pop();
        for(auto edge : adj[v]) {
            if(edge.cap - edge.flow > 0 && level[edge.to] == -1) {
                level[edge.to] = level[v] + 1;
                q.push(edge.to);
            }
        }
    }
    return level[t] != -1;
}

int dfs(int v, int t, int pushed) {
    if(pushed == 0) return 0;
    if(v == t) return pushed;
    
    for(int& cid = ptr[v]; cid < adj[v].size(); ++cid) {
        auto& edge = adj[v][cid];
        int tr = edge.to;
        if(level[v] + 1 != level[tr] || edge.cap - edge.flow == 0) continue;
        
        int push = dfs(tr, t, min(pushed, edge.cap - edge.flow));
        if(push == 0) continue;
        
        edge.flow += push;
        adj[tr][edge.rev].flow -= push;
        return push;
    }
    return 0;
}

int dinic(int s, int t) {
    int flow = 0;
    while(bfs(s, t)) {
        fill(ptr, ptr + 100, 0);
        while(int pushed = dfs(s, t, 1e9)) {
            flow += pushed;
        }
    }
    return flow;
}

int main() {
    // S=0, T=3
    addEdge(0, 1, 3);
    addEdge(0, 2, 2);
    addEdge(1, 2, 1);
    addEdge(1, 3, 2);
    addEdge(2, 3, 3);
    
    cout << "Max Flow: " << dinic(0, 3) << "\
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 43,
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
      "line": 26,
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
      "line": 36,
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
      "line": 36,
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
      "line": 43,
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
      "line": 46,
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
