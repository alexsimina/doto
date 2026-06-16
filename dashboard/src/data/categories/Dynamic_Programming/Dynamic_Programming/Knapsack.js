export const data = {
  "presentation": "### Prezentare Generală\n\nProblema Rucsacului (0/1 Knapsack) este o problemă clasică de optimizare combinatorică.\\n\\nAi un rucsac cu o capacitate maximă W și un set de obiecte, fiecare având o greutate și o valoare. Scopul este să maximizezi valoarea totală a obiectelor puse în rucsac, fără a depăși capacitatea.\\n\\nAbordarea Naivă: Generăm toate submulțimile (2^N).\\n\\nAbordarea DP:\\nDefinim starea: dp[i][w] = valoarea maximă folosind un subset al primelor i obiecte și capacitate curentă w.\\n\\nTranziția pentru obiectul curent i:\\n1. Nu-l luăm: dp[i][w] = dp[i-1][w]\\n2. Îl luăm (dacă încape): dp[i][w] = dp[i-1][w - greutate[i]] + valoare[i]\\nSoluția la pasul i este maximul dintre aceste două opțiuni.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N * W), unde N = număr obiecte, W = capacitatea rucsacului.\\n- **Spațiu:** O(N * W), ce poate fi optimizat la O(W) (Rolling Array), folosind doar linia precedentă.\n",
  "variations": "### Variații și Edge Cases\n\n1. Fracțional Knapsack (rezolvat cu Greedy).\\n2. Unbounded Knapsack (fiecare obiect poate fi luat de un număr nelimitat de ori - Coin Change).\\n3. Multiple Knapsack (număr finit c_i din fiecare obiect).",
  "applications": "### Aplicații\n\nAlocarea de bugete, selecția de proiecte cu constrângeri de resurse, tăierea stocului.",
  code: `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(int W, var vector<int>& wt, var vector<int>& val, int n) {
    // DP array liniarizat (optimizare spatiu O(W))
    vector<int> dp(W + 1, 0);

    // Iteram prin fiecare obiect
    for (int i = 0; i < n; i++) {
        // Traversam capacitatile invers pentru a nu folosi acelasi obiect de doua ori
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    
    cout << \"Valoare Maxima = \" << knapsack(W, wt, val, val.size()) << \"\
\";
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
      "text": "Inițializăm dp cu 0. dp[w] reține valoarea max pt capacitatea w.",
      "blocksVisual": [
        {
          "label": "dp[0..50]",
          "groups": [
            [
              {
                "val": "[0, 0, ..., 0]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Luăm Obiectul 0 (wt=10, val=60).",
      "blocksVisual": [
        {
          "label": "Obiect 0",
          "groups": [
            [
              {
                "val": "wt=10, val=60",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pentru W de la 50 la 10, actualizăm dp[w]. Pentru W>=10, obiectul încape. dp[w] devine max(0, dp[w-10] + 60) = 60.",
      "blocksVisual": [
        {
          "label": "Update",
          "groups": [
            [
              {
                "val": "dp[10..50] = 60",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Luăm Obiectul 1 (wt=20, val=100).",
      "blocksVisual": [
        {
          "label": "Obiect 1",
          "groups": [
            [
              {
                "val": "wt=20, val=100",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Parcurgem invers de la 50 la 20. Ex: dp[30] = max(dp[30], dp[30-20] + 100). Vechiul dp[30] era 60. Nou: dp[10]+100 = 60+100=160.",
      "blocksVisual": [
        {
          "label": "Update W=30",
          "groups": [
            [
              {
                "val": "dp[30] devine 160",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "dp[20] = max(dp[20]=60, dp[0]+100=100) = 100.",
      "blocksVisual": [
        {
          "label": "Update W=20",
          "groups": [
            [
              {
                "val": "dp[20] = 100"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Luăm Obiectul 2 (wt=30, val=120).",
      "blocksVisual": [
        {
          "label": "Obiect 2",
          "groups": [
            [
              {
                "val": "wt=30, val=120",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "dp[50] = max(dp[50]=160, dp[20]+120=100+120=220).",
      "blocksVisual": [
        {
          "label": "Update W=50",
          "groups": [
            [
              {
                "val": "dp[50] = 220",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Returnăm dp[50] adică 220. (Obiectul 1 și Obiectul 2).",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Valoare 220",
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
        "title": "Rucsac Infoarena",
        "url": "https://www.infoarena.ro/problema/rucsac",
        "desc": "Problema rucsacului standard"
      }
    ],
    "medium": [
      {
        "title": "Coin Change 2",
        "url": "https://leetcode.com/problems/coin-change-2/",
        "desc": "Numărul de moduri de a face suma (Unbounded Knapsack)"
      }
    ],
    "hard": [
      {
        "title": "Target Sum",
        "url": "https://leetcode.com/problems/target-sum/",
        "desc": "DP bazat pe 0/1 Knapsack"
      }
    ]
  }
};
