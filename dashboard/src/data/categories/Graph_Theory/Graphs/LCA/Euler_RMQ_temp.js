module.exports = {
  "presentation": "### Prezentare Generală\n\nLowest Common Ancestor (LCA) prin Euler Tour + RMQ (Range Minimum Query).\\n\\nIdeea de bază este de a transforma problema LCA pe un arbore într-o problemă de minim pe un șir unidimensional (RMQ). Cum facem asta?\\n1. Facem un DFS (Euler Tour) în care adăugăm nodul curent în șirul Euler DE FIECARE DATĂ când ajungem în el (la început și la revenirea dintr-un subarbore).\\n2. Reținem pentru fiecare nod prima sa apariție (First Occurrence) în șirul Euler.\\n3. Pentru a găsi LCA(u, v), căutăm în șirul Euler, între prima apariție a lui u și prima apariție a lui v, nodul care are **cea mai mică adâncime** (depth).",
  "complexity": "### Complexitate\n\n- **Timp:** Preprocesare O(N log N) (pentru a construi Sparse Table-ul folosit la RMQ), Interogare O(1).\\n- **Spațiu:** O(N log N) pentru Sparse Table.\n",
  "variations": "### Variații și Edge Cases\n\nAcest algoritm este perfect când graful e static și vrem să facem un număr foarte mare de query-uri (interogări), deoarece interogările se fac în O(1) față de O(log N) la Binary Lifting.",
  "applications": "### Aplicații\n\nToate aplicațiile LCA unde viteza de interogare pe un arbore static este critică (milioane de interogări).",
  code: `
#include <iostream>
#include <vector>
#include <math.h>

using namespace std;

vector<int> adj[1005];
int euler[2005], depth[2005], first_occ[1005];
int timer = 0;
int sparse[2005][12];

void dfs(int u, int p, int d) {
    first_occ[u] = timer;
    euler[timer] = u;
    depth[timer] = d;
    timer++;
    
    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u, d + 1);
            // Dupa vizitarea subarborelui, readaugam nodul u in sir
            euler[timer] = u;
            depth[timer] = d;
            timer++;
        }
    }
}

void buildRMQ(int n) {
    for (int i = 0; i < n; i++) sparse[i][0] = i;
    
    for (int j = 1; (1 << j) <= n; j++) {
        for (int i = 0; i + (1 << j) - 1 < n; i++) {
            int idx1 = sparse[i][j - 1];
            int idx2 = sparse[i + (1 << (j - 1))][j - 1];
            if (depth[idx1] < depth[idx2])
                sparse[i][j] = idx1;
            else
                sparse[i][j] = idx2;
        }
    }
}

int queryRMQ(int l, int r) {
    if (l > r) swap(l, r);
    int j = log2(r - l + 1);
    int idx1 = sparse[l][j];
    int idx2 = sparse[r - (1 << j) + 1][j];
    if (depth[idx1] < depth[idx2]) return euler[idx1];
    return euler[idx2];
}

int get_lca(int u, int v) {
    return queryRMQ(first_occ[u], first_occ[v]);
}

int main() {
    // Arbore: 1 e radacina. 1->2, 1->3. 2->4, 2->5.
    adj[1] = {2, 3};
    adj[2] = {1, 4, 5}; adj[3] = {1};
    adj[4] = {2}; adj[5] = {2};
    
    dfs(1, 0, 0);
    buildRMQ(timer);
    
    cout << "LCA(4, 5) = " << get_lca(4, 5) << "\
";
    cout << "LCA(4, 3) = " << get_lca(4, 3) << "\
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 12,
      "text": "Executăm Euler Tour pe arbore: intrăm în nodul 1 (adâncime 0), apoi în 2 (adâncime 1), apoi în 4 (adâncime 2). Apoi NE ÎNTOARCEM în 2, apoi mergem în 5, iar ne întoarcem în 2, iar ne întoarcem în 1, și în final în 3.",
      "blocksVisual": [
        {
          "label": "Euler Array",
          "groups": [
            [
              {
                "val": "euler: [1, 2, 4, 2, 5, 2, 1, 3, 1]",
                "active": true
              }
            ],
            [
              {
                "val": "depth: [0, 1, 2, 1, 2, 1, 0, 1, 0]"
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
            "y": 50,
            "state": "visited"
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
            "y": 100,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 50,
            "y": 150,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
            "y": 150,
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "style": "thick"
          },
          {
            "source": "1",
            "target": "3",
            "style": "thick"
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
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Salvăm și prima apariție a fiecărui nod în acest șir: first_occ[1] = 0, first_occ[2] = 1, first_occ[4] = 2, first_occ[5] = 4, first_occ[3] = 7.",
      "blocksVisual": [
        {
          "label": "First Occurrences",
          "groups": [
            [
              {
                "val": "f[1]=0, f[2]=1, f[3]=7, f[4]=2, f[5]=4",
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
          }
        ]
      }
    },
    {
      "line": 57,
      "text": "Pentru a găsi LCA(4, 5), ne uităm între first_occ[4] = 2 și first_occ[5] = 4. Subșirul euler este [4, 2, 5], iar adâncimile sunt [2, 1, 2].",
      "blocksVisual": [
        {
          "label": "Interval",
          "groups": [
            [
              {
                "val": "Range [2..4] -> euler[4, 2, 5]",
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
          }
        ]
      }
    },
    {
      "line": 52,
      "text": "Cel mai mic Depth din acest interval este 1 (corespunzător nodului 2). Deci LCA(4, 5) = 2. Căutarea minimului în acel interval (RMQ) este făcută în O(1) grație structurii precalculate Sparse Table!",
      "blocksVisual": [
        {
          "label": "RMQ Answer",
          "groups": [
            [
              {
                "val": "Min Depth = 1 => Nodul 2",
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
            "y": 150,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 150,
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
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "LCA",
        "url": "https://www.infoarena.ro/problema/lca",
        "desc": "Perfect pentru abordarea Euler + RMQ."
      }
    ],
    "medium": [],
    "hard": []
  }
};
