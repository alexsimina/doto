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

int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
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
    
    cout << "Valoare Maxima = " << knapsack(W, wt, val, val.size()) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 21,
      "text": "Pornim programul. Inițializăm vectorul de valori val = [60, 100, 120] și greutăți wt = [10, 20, 30].",
      "blocksVisual": [
        {
          "label": "Greutati & Valori",
          "groups": [
            [{ "val": "wt[0]=10" }, { "val": "wt[1]=20" }, { "val": "wt[2]=30" }],
            [{ "val": "val[0]=60" }, { "val": "val[1]=100" }, { "val": "val[2]=120" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Setăm capacitatea maximă a rucsacului W = 50.",
      "blocksVisual": [
        {
          "label": "Capacitate",
          "groups": [[{ "val": "W = 50", "active": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Apelăm funcția knapsack(W = 50, wt, val, n = 3).",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [[{ "val": "knapsack(50)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Inițializăm vectorul dp de dimensiune W + 1 cu valori de 0. dp[w] = 0.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=0" }, { "val": "dp[40]=0" }, { "val": "dp[50]=0" }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "i = 0. Considerăm primul obiect (wt[0] = 10, val[0] = 60).",
      "blocksVisual": [
        {
          "label": "Obiect Curent",
          "groups": [[{ "val": "wt=10, val=60", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 50: dp[50] devine max(dp[50]=0, dp[40]+60 = 60). dp[50] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=0" }, { "val": "dp[40]=0" }, { "val": "dp[50]=60", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 40: dp[40] devine max(dp[40]=0, dp[30]+60 = 60). dp[40] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=0" }, { "val": "dp[40]=60", "active": true }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 30: dp[30] devine max(dp[30]=0, dp[20]+60 = 60). dp[30] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=60", "active": true }, { "val": "dp[40]=60" }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 20: dp[20] devine max(dp[20]=0, dp[10]+60 = 60). dp[20] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=60", "active": true },
            { "val": "dp[30]=60" }, { "val": "dp[40]=60" }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 10: dp[10] devine max(dp[10]=0, dp[0]+60 = 60). dp[10] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60", "active": true }, { "val": "dp[20]=60" },
            { "val": "dp[30]=60" }, { "val": "dp[40]=60" }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "i = 1. Considerăm al doilea obiect (wt[1] = 20, val[1] = 100).",
      "blocksVisual": [
        {
          "label": "Obiect Curent",
          "groups": [[{ "val": "wt=20, val=100", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 50: dp[50] devine max(dp[50]=60, dp[30]+100 = 60+100 = 160). dp[50] = 160.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=60" },
            { "val": "dp[30]=60" }, { "val": "dp[40]=60" }, { "val": "dp[50]=160", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 40: dp[40] devine max(dp[40]=60, dp[20]+100 = 60+100 = 160). dp[40] = 160.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=60" },
            { "val": "dp[30]=60" }, { "val": "dp[40]=160", "active": true }, { "val": "dp[50]=160" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 30: dp[30] devine max(dp[30]=60, dp[10]+100 = 60+100 = 160). dp[30] = 160.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=60" },
            { "val": "dp[30]=160", "active": true }, { "val": "dp[40]=160" }, { "val": "dp[50]=160" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 20: dp[20] devine max(dp[20]=60, dp[0]+100 = 100). dp[20] = 100.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100", "active": true },
            { "val": "dp[30]=160" }, { "val": "dp[40]=160" }, { "val": "dp[50]=160" }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "i = 2. Considerăm al treilea obiect (wt[2] = 30, val[2] = 120).",
      "blocksVisual": [
        {
          "label": "Obiect Curent",
          "groups": [[{ "val": "wt=30, val=120", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 50: dp[50] devine max(dp[50]=160, dp[20]+120 = 100+120 = 220). dp[50] = 220.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100" },
            { "val": "dp[30]=160" }, { "val": "dp[40]=160" }, { "val": "dp[50]=220", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 40: dp[40] devine max(dp[40]=160, dp[10]+120 = 60+120 = 180). dp[40] = 180.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100" },
            { "val": "dp[30]=160" }, { "val": "dp[40]=180", "active": true }, { "val": "dp[50]=220" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 30: dp[30] devine max(dp[30]=160, dp[0]+120 = 120). dp[30] = 160 (rămâne neschimbat).",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100" },
            { "val": "dp[30]=160", "active": true }, { "val": "dp[40]=180" }, { "val": "dp[50]=220" }
          ]]
        }
      ]
    },
    {
      "line": 18,
      "text": "Toate obiectele au fost procesate. Returnăm dp[W] = dp[50] = 220.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [[{ "val": "dp[50]=220", "sorted": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Afișăm rezultatul final: Valoare Maxima = 220.",
      "blocksVisual": [
        {
          "label": "Finalizat",
          "groups": [[{ "val": "220", "sorted": true }]]
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
