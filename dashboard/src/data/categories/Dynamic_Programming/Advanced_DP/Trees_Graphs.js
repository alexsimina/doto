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
    
    cout << "Max Independent Set: " << max(dp[0][0], dp[0][1]) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 33,
      "text": "Apelăm DFS din rădăcina 0.",
      "blocksVisual": [
        {
          "label": "DFS Start",
          "groups": [
            [
              {
                "val": "Root 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "DFS coboară până la frunze (nodurile 2, 3, 4).",
      "blocksVisual": [
        {
          "label": "Coborâre",
          "groups": [
            [
              {
                "val": "Către frunze"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Frunza 3: dp[3][0]=0, dp[3][1]=1. Nu are copii. Se întoarce.",
      "blocksVisual": [
        {
          "label": "Frunza 3",
          "groups": [
            [
              {
                "val": "dp[3]={0, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Frunza 4: similar dp[4]={0, 1}.",
      "blocksVisual": [
        {
          "label": "Frunza 4",
          "groups": [
            [
              {
                "val": "dp[4]={0, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La nodul 1 (copiii 3, 4): Dacă nu includ 1, dp[1][0] += max(0, 1) + max(0, 1) = 2.",
      "blocksVisual": [
        {
          "label": "Nod 1 (dp[1][0])",
          "groups": [
            [
              {
                "val": "Nu includ: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Dacă includ 1, dp[1][1] += dp[3][0] + dp[4][0] = 1 + 0 + 0 = 1.",
      "blocksVisual": [
        {
          "label": "Nod 1 (dp[1][1])",
          "groups": [
            [
              {
                "val": "Includ: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Similar, se prelucrează nodul 2 (frunză, dp[2]={0,1}). La final, nodul 0 alege combinarea optimă a copiilor 1 și 2.",
      "blocksVisual": [
        {
          "label": "Nod 0",
          "groups": [
            [
              {
                "val": "Combinație"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Afișăm maximul la rădăcină (în acest caz 3: alegem nodurile 0, 3, 4).",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Rezultat = 3",
                "sorted": true
              }
            ]
          ]
        }
      ]
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
