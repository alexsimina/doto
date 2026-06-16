export const data = {
  "presentation": "### Prezentare Generală\n\nProgramare Dinamică pe Arbori (DP on Trees) combină traversarea arborilor (DFS) cu paradigmele DP.\n\nÎntr-un arbore, substructura optimă este naturală: soluția pentru rădăcină depinde de soluțiile copiilor (subarborilor). O stare comună este `dp[node][state]`, unde `state` poate însemna dacă nodul curent este inclus sau nu într-o mulțime, sau numărul de culori folosite.\n\nCaz clasic: Maximum Independent Set of a Tree. Vrem să alegem noduri astfel încât să maximizăm numărul lor, dar niciun părinte să nu fie ales simultan cu fiul său.\n- dp[u][0] = Maximum fără a include u = sum(max(dp[v][0], dp[v][1]))\n- dp[u][1] = Maximum incluzând u = 1 + sum(dp[v][0])",
  "complexity": "### Complexitate\n\n- **Timp:** O(V) deoarece fiecare nod și muchie este vizitată o singură dată (în post-ordine).\n- **Spațiu:** O(V) pentru tablourile DP și stiva recursivă.\n",
  "variations": "### Variații și Edge Cases\n\n1. Diametrul unui arbore.\n2. Tree Knapsack (Problema rucsacului, dar restricționată pe o ierarhie de noduri).",
  "applications": "### Aplicații\n\nProbleme de colorare sau acoperire pe grafuri cu densitate mică. Optimizarea structurilor ierarhice (sisteme de referințe sau permisiuni).",

  code: `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void dfs(int u, int p, vector<vector<int>>& adj, vector<vector<int>>& dp) {
    dp[u][0] = 0; // Nu include
    dp[u][1] = 1; // Include

    for (int v : adj[u]) {
        if (v == p) continue; // Evitam intoarcerea
        
        dfs(v, u, adj, dp);
        
        // Dacă nu includ u, copiii pot fi incluși sau nu
        dp[u][0] += max(dp[v][0], dp[v][1]);
        
        // Dacă includ u, copiii NU pot fi incluși
        dp[u][1] += dp[v][0];
    }
}

int main() {
    int n = 5;
    vector<vector<int>> adj(n);
    adj[0] = {1, 2};
    adj[1] = {0, 3, 4};
    adj[2] = {0};
    adj[3] = {1};
    adj[4] = {1};
    
    vector<vector<int>> dp(n, vector<int>(2, 0));
    dfs(0, -1, adj, dp); // Rădăcina 0, părinte -1
    
    cout << "Max Independent Set: " << max(dp[0][0], dp[0][1]) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 24,
      "text": "Pornim programul. Avem un arbore cu n = 5 noduri și rădăcina 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 33,
      "text": "Apelăm dfs(0, -1) pentru a calcula dp de la rădăcina 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Inițializăm stările de bază pentru nodul 0: dp[0][0] = 0 și dp[0][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (0,1)", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Din nodul 0, apelăm dfs(1, 0) pentru primul copil.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Inițializăm stările de bază pentru nodul 1: dp[1][0] = 0 și dp[1][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (0,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Din nodul 1, apelăm dfs(3, 1) pentru copilul 3.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3", "state": "active" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Nodul 3 este frunză. Inițializăm dp[3][0] = 0 și dp[3][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "active" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "dfs(3, 1) s-a terminat. Revenim în nodul 1 și apelăm dfs(4, 1) pentru copilul 4.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Nodul 4 este frunză. Inițializăm dp[4][0] = 0 și dp[4][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "dfs(4, 1) s-a terminat. Revenim în nodul 1 pentru a agrega rezultatele copiilor săi.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 16,
      "text": "Prelucrăm copilul 3 pentru nodul 1: dp[1][0] += max(dp[3][0]=0, dp[3][1]=1) = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (1,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 19,
      "text": "De asemenea, dacă includem nodul 1: dp[1][1] += dp[3][0] = 0. Momentan dp[1] = (1, 1).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (1,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 16,
      "text": "Prelucrăm copilul 4 pentru nodul 1: dp[1][0] += max(dp[4][0]=0, dp[4][1]=1) = 1 + 1 = 2.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 19,
      "text": "Și dacă includem nodul 1: dp[1][1] += dp[4][0] = 0. Final dp[1] = (2, 1). dfs(1) se întoarce.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Revenim în nodul 0. Prelucrăm rezultatele de la copilul 1: dp[0][0] += max(2, 1) = 2 și dp[0][1] += dp[1][0] = 2. dp[0] = (2, 3).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (2,3)", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Apelăm acum dfs(2, 0) pentru al doilea copil al rădăcinii.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2", "state": "active" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Nodul 2 este frunză. Inițializăm dp[2][0] = 0 și dp[2][1] = 1. dfs(2) se întoarce.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Revenim în nodul 0. Prelucrăm rezultatele de la copilul 2: dp[0][0] += max(dp[2][0]=0, dp[2][1]=1) = 2 + 1 = 3.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 19,
      "text": "Și dacă includem nodul 0: dp[0][1] += dp[2][0] = 3 + 0 = 3. Final dp[0] = (3, 3). dfs(0) se întoarce.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "visited" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 35,
      "text": "Rezultatul final este max(dp[0][0]=3, dp[0][1]=3) = 3. Alegem nodurile {0, 3, 4}.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "visited" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Subarbore",
        "url": "https://www.infoarena.ro/problema/subarbore",
        "desc": "Baza pentru DP pe arbori"
      }
    ],
    "medium": [
      {
        "title": "Binary Tree Cameras",
        "url": "https://leetcode.com/problems/binary-tree-cameras/",
        "desc": "Extindere State Machine cu 3 stări"
      }
    ],
    "hard": [
      {
        "title": "Minimum Cost Tree From Leaf Values",
        "url": "https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/",
        "desc": "Combinație Greedy și DP pe intervale de arbori"
      }
    ]
  }
};
