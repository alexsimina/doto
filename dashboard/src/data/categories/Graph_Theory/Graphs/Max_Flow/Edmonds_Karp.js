export const data = {
  "presentation": "### Prezentare Generală\n\nFluxul Maxim (Maximum Flow) ne cere să determinăm ce cantitate maximă de materie (apă, date, pachete, curent) putem trimite de la un nod Sursă (Source) la un nod Destinație (Sink) într-o rețea unde muchiile au 'capacități' limitate.\\n\\nAlgoritmul Edmonds-Karp e o specializare a metodei Ford-Fulkerson. El caută cel mai scurt drum de la sursă la destinație (ca număr de muchii, folosind BFS) pe care încă mai e spațiu liber, calculează cât spațiu ('bottleneck') are acel drum, scade acel flux din muchiile normale și adaugă flux pe muchiile 'reziduale' (muchii virtuale în direcția opusă). Muchiile reziduale permit algoritmului să 'anuleze' decizii luate anterior.\\n\\nTeorema Max Flow - Min Cut: Fluxul maxim din rețea este exact egal cu capacitatea celei mai mici tăieturi (muchii șterse) care separă Sursa de Destinație.",
  "complexity": "### Complexitate\n\nEdmonds-Karp: O(V * E^2). Deoarece drumurile sunt găsite prin BFS, lungimea drumului de creștere crește mereu, garantând terminarea.\\nDinic: O(V^2 * E). Mult mai rapid în practică (construiește level graphs și face blocking flows cu DFS).",
  "variations": "### Variații și Edge Cases\n\nBipartite Matching (Cuplaj Maxim în graf Bipartit): Se poate reduce la un Max Flow punând o sursă superioară și o destinație superioară. Circulații cu cereri (flux care trebuie să fie într-un anume interval).",
  "applications": "### Aplicații\n\nAsignarea de joburi la angajați (Bipartite Matching), optimizarea rețelelor de transport feroviar/aero, planificarea evacuărilor de urgență.",
  code: `
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;
const int INF = 1e9;

int bfs(int s, int t, vector<int>& parent, vector<vector<int>>& adj, vector<vector<int>>& capacity) {
    fill(parent.begin(), parent.end(), -1);
    parent[s] = -2;
    queue<pair<int, int>> q;
    q.push({s, INF});

    while (!q.empty()) {
        int cur = q.front().first;
        int flow = q.front().second;
        q.pop();

        for (int next : adj[cur]) {
            if (parent[next] == -1 && capacity[cur][next] > 0) {
                parent[next] = cur;
                int new_flow = min(flow, capacity[cur][next]);
                if (next == t) return new_flow; // Gata
                q.push({next, new_flow});
            }
        }
    }
    return 0; // Nu mai sunt drumuri
}

int edmondsKarp(int s, int t, int V, vector<vector<int>>& adj, vector<vector<int>>& capacity) {
    int flow = 0;
    vector<int> parent(V);
    int new_flow;

    while ((new_flow = bfs(s, t, parent, adj, capacity)) > 0) {
        flow += new_flow;
        int cur = t;
        while (cur != s) {
            int prev = parent[cur];
            capacity[prev][cur] -= new_flow; // Reducem capacitatea muchiei
            capacity[cur][prev] += new_flow; // Adaugam pe muchia reziduala!
            cur = prev;
        }
    }
    return flow;
}

int main() {
    int V = 6;
    vector<vector<int>> adj(V);
    vector<vector<int>> cap(V, vector<int>(V, 0));

    auto add_edge = [&](int u, int v, int c) {
        adj[u].push_back(v);
        adj[v].push_back(u); // Muchia reziduala
        cap[u][v] += c;
    };

    // S=0, T=5
    add_edge(0, 1, 16); add_edge(0, 2, 13);
    add_edge(1, 2, 10); add_edge(1, 3, 12);
    add_edge(2, 1, 4);  add_edge(2, 4, 14);
    add_edge(3, 2, 9);  add_edge(3, 5, 20);
    add_edge(4, 3, 7);  add_edge(4, 5, 4);

    cout << "Max Flow: " << edmondsKarp(0, 5, V, adj, cap) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 36,
      "text": "Edmonds-Karp va continua să ruleze un BFS cât timp găsește un drum pe care mai încăpea flux de la Sursă la Destinație (Drum de Creștere).",
      "blocksVisual": [
        {
          "label": "Algoritm Principal",
          "groups": [
            [
              {
                "val": "BFS Loop",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 9,
      "text": "BFS-ul stochează pentru fiecare nod atât sursa din care s-a venit (vectorul `parent`), cât și cel mai restrâns 'gâtuire' (bottleneck flow) de până acum pe acel drum.",
      "blocksVisual": [
        {
          "label": "BFS Stare",
          "groups": [
            [
              {
                "val": "Coadă",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Când explorăm un vecin, verificăm `capacity[cur][next] > 0`. Pe muchia inițială, asta e capacitatea reală. Pe muchia Inversă, va fi fluxul anulat.",
      "blocksVisual": [
        {
          "label": "Verificare Capacitate",
          "groups": [
            [
              {
                "val": "Cap > 0",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Noul bottleneck e MIN dintre bottleneck-ul anterior și capacitatea muchiei curente.",
      "blocksVisual": [
        {
          "label": "Bottleneck Min",
          "groups": [
            [
              {
                "val": "min(flow, cap)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 24,
      "text": "Dacă am atins destinația T, ne oprim imediat din BFS și returnăm cât flux încape pe tot drumul. Nu e nevoie să parcurgem tot graful.",
      "blocksVisual": [
        {
          "label": "Spre T",
          "groups": [
            [
              {
                "val": "Găsit t!",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 39,
      "text": "Acum că avem un drum cu capacitatea `new_flow`, reconstituim calea parcurgând din tată în tată din Destinație până în Sursă.",
      "blocksVisual": [
        {
          "label": "Reconstituire",
          "groups": [
            [
              {
                "val": "Cur -> Sursă",
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
            "x": 50,
            "y": 110,
            "label": "0"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 41,
      "text": "Scădem fluxul din capacitatea normală (spațiul liber se reduce).",
      "blocksVisual": [
        {
          "label": "Reducere Cap",
          "groups": [
            [
              {
                "val": "cap -= new_flow",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 42,
      "text": "SECRETUL MAX FLOW: Adăugăm aceeași valoare pe MUCHIA REZIDUALĂ (în sens invers). Astfel, la iterațiile viitoare, un alt drum va putea 'trimite înapoi' acest flux, corectând o greșeală din trecut!",
      "blocksVisual": [
        {
          "label": "Muchia Reziduală",
          "groups": [
            [
              {
                "val": "cap_inv += new_flow",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
          },
          {
            "source": "4",
            "target": "5"
          }
        ]
      }
    },
    {
      "line": 46,
      "text": "Când BFS nu mai găsește NICIUN drum > 0, înseamnă că am pompat la maxim. Returnăm `flow` total, care în acest exemplu este 23.",
      "blocksVisual": [
        {
          "label": "Finalizat",
          "groups": [
            [
              {
                "val": "Total: 23",
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
            "x": 50,
            "y": 110,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 120,
            "y": 50,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 120,
            "y": 170,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 200,
            "y": 50,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 200,
            "y": 170,
            "label": "4",
            "state": "visited"
          },
          {
            "id": "5",
            "x": 260,
            "y": 110,
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
            "target": "2"
          },
          {
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "1"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "3",
            "target": "2"
          },
          {
            "source": "3",
            "target": "5"
          },
          {
            "source": "4",
            "target": "3"
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
        "title": "Max Flow",
        "url": "https://www.infoarena.ro/problema/maxflow",
        "desc": "Problema clasică"
      }
    ],
    "medium": [
      {
        "title": "Cuplaj Maxim in Graf Bipartit",
        "url": "https://www.infoarena.ro/problema/cuplaj",
        "desc": "Edmonds Karp adaptat"
      }
    ],
    "hard": [
      {
        "title": "Maximum Flow (Dinic)",
        "url": "https://www.spoj.com/problems/FASTFLOW/",
        "desc": "Edmonds Karp da TLE, cere Dinic O(V^2 E)"
      }
    ]
  }
};
