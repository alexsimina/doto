export const data = {
  "presentation": "### Prezentare Generală\n\nLowest Common Ancestor (LCA) - Cel Mai Mic Strămoș Comun, este un algoritm folosit pe arbori (sau grafuri orientate aciclice) pentru a găsi nodul cel mai de jos care îi are ca descendenți pe două noduri date u și v.\\n\\nExistă mai multe abordări pentru LCA:\\n1. **Naiv**: Mergi cu ambele noduri în sus din tată în tată până se întâlnesc.\\n2. **Binary Lifting (Strămoși pe sărite)**: Preprocesăm strămoșul aflat la distanța 2^k pentru fiecare nod. Apoi putem aduce ambele noduri la același nivel în timp O(log N) și putem 'sări' în sus spre LCA tot în O(log N).\\n3. **Euler Tour + RMQ**: Parcurgem arborele DFS (Euler Tour) și reducem problema la o căutare a minimului pe un interval (Range Minimum Query).",
  "complexity": "### Complexitate\n\n- **Timp:** Preprocesare O(N log N) pentru Binary Lifting, Interogare O(log N).\\n- **Spațiu:** O(N log N) pentru matricea de strămoși (Binary Lifting).\n",
  "variations": "### Variații și Edge Cases\n\nGăsirea distanței minime dintre oricare două noduri într-un arbore: `dist(u, v) = dist(root, u) + dist(root, v) - 2 * dist(root, LCA(u, v))`.",
  "applications": "### Aplicații\n\nDistanța pe hărți rutiere cu structură de arbore, ierarhii de clase în OOP (determinarea părintelui comun), arbori filogenetici în biologie.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

const int LOG = 14;
vector<int> adj[1005];
int up[1005][LOG]; // up[v][j] este stramosul 2^j al lui v
int depth[1005];

void dfs(int v, int p) {
    up[v][0] = p;
    for (int j = 1; j < LOG; ++j) {
        if (up[v][j-1] != -1)
            up[v][j] = up[up[v][j-1]][j-1];
        else
            up[v][j] = -1;
    }
    
    for (int u : adj[v]) {
        if (u != p) {
            depth[u] = depth[v] + 1;
            dfs(u, v);
        }
    }
}

int get_lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    
    // 1. Aducem u la acelasi nivel cu v
    int diff = depth[u] - depth[v];
    for (int j = LOG - 1; j >= 0; --j) {
        if ((diff >> j) & 1) {
            u = up[u][j];
        }
    }
    
    if (u == v) return u;
    
    // 2. Urcam in paralel cu u si v pana cand tatii lor sunt la fel (adica LCA-ul)
    for (int j = LOG - 1; j >= 0; --j) {
        if (up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    return up[u][0];
}

int main() {
    // Construim arborele
    adj[1] = {2, 3}; adj[2] = {1, 4, 5}; adj[3] = {1, 6};
    adj[4] = {2}; adj[5] = {2}; adj[6] = {3};
    
    depth[1] = 0;
    for(int i=0; i<=6; i++) for(int j=0; j<LOG; j++) up[i][j] = -1;
    
    dfs(1, -1);
    
    cout << "LCA(4, 5) = " << get_lca(4, 5) << "\
";
    cout << "LCA(4, 6) = " << get_lca(4, 6) << "\
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 16,
      "text": "Se preprocesează toți strămoșii (puterile lui 2) printr-un DFS folosind tehnica Binary Lifting.",
      "blocksVisual": [
        {
          "label": "DFS",
          "groups": [
            [
              {
                "val": "up[v][j] = up[up[v][j-1]][j-1]",
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
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 100
          },
          {
            "id": "4",
            "label": "4",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "6",
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
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "2",
            "target": "5"
          },
          {
            "source": "3",
            "target": "6"
          }
        ]
      }
    },
    {
      "line": 34,
      "text": "Vrem să aflăm LCA pentru nodurile 4 și 5. Ambele sunt la aceeași adâncime (adâncimea 2).",
      "blocksVisual": [
        {
          "label": "Niveluri",
          "groups": [
            [
              {
                "val": "depth[4] = 2"
              },
              {
                "val": "depth[5] = 2"
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
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 100
          },
          {
            "id": "4",
            "label": "4",
            "x": 50,
            "y": 150,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "6",
            "label": "6",
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
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "2",
            "target": "5"
          },
          {
            "source": "3",
            "target": "6"
          }
        ]
      }
    },
    {
      "line": 37,
      "text": "Diferența de nivel (diff) este 0, deci nu urcăm niciunul pentru egalare. Trecem la pasul 2.",
      "blocksVisual": [
        {
          "label": "Pasul 1",
          "groups": [
            [
              {
                "val": "Echilibrare Nivel",
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
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 100
          },
          {
            "id": "4",
            "label": "4",
            "x": 50,
            "y": 150,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
            "y": 150,
            "state": "active"
          },
          {
            "id": "6",
            "label": "6",
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
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4"
          },
          {
            "source": "2",
            "target": "5"
          },
          {
            "source": "3",
            "target": "6"
          }
        ]
      }
    },
    {
      "line": 47,
      "text": "În pasul 2 verificăm de la cele mai mari puteri ale lui 2 până la 0. Vom constata că pentru j=0, up[4][0] este 2, iar up[5][0] este tot 2. Cum ele sunt EGALATE la putere, NU urcăm în interiorul buclei (condiția din if nu se respectă).",
      "blocksVisual": [
        {
          "label": "Urcare",
          "groups": [
            [
              {
                "val": "up[4][0] = 2"
              },
              {
                "val": "up[5][0] = 2"
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
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 100
          },
          {
            "id": "4",
            "label": "4",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "6",
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
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4",
            "style": "dashed"
          },
          {
            "source": "2",
            "target": "5",
            "style": "dashed"
          },
          {
            "source": "3",
            "target": "6"
          }
        ]
      }
    },
    {
      "line": 53,
      "text": "Bucla de urcare s-a terminat, nodurile 4 și 5 se află exact dedesubtul LCA-ului lor. Returnăm tatăl unuia din ele (up[4][0]), care este 2. Acesta este LCA-ul!",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "LCA(4, 5) = 2",
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
            "x": 150,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
            "y": 100,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 200,
            "y": 100
          },
          {
            "id": "4",
            "label": "4",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "6",
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
            "source": "1",
            "target": "3"
          },
          {
            "source": "2",
            "target": "4",
            "style": "thick"
          },
          {
            "source": "2",
            "target": "5",
            "style": "thick"
          },
          {
            "source": "3",
            "target": "6"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "LCA Infoarena",
        "url": "https://www.infoarena.ro/problema/lca",
        "desc": "Problema clasica LCA"
      }
    ],
    "medium": [
      {
        "title": "K-th Ancestor of a Tree Node",
        "url": "https://leetcode.com/problems/kth-ancestor-of-a-tree-node/",
        "desc": "Binary Lifting direct"
      }
    ],
    "hard": [
      {
        "title": "Lowest Common Ancestor of a Binary Tree",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        "desc": "LCA fara distante (O(N) DFS)"
      }
    ]
  }
};
