export const data = {
  "presentation": "### Prezentare Generală\n\nCel Mai Lung Subșir Comun (Longest Common Subsequence - LCS) găsește cel mai lung subșir care apare în ambele string-uri în aceeași ordine, dar nu neapărat consecutiv.\\n\\nExemplu: A = 'AGGTAB', B = 'GXTXAYB'. LCS este 'GTAB'.\\n\\nDefinim starea: dp[i][j] = lungimea LCS dintre primele i caractere din A și primele j caractere din B.\\n\\nTranziția:\\n1. Dacă A[i-1] == B[j-1]: Am găsit o potrivire! Creștem LCS-ul. dp[i][j] = 1 + dp[i-1][j-1]\\n2. Dacă sunt diferite: Trebuie să luăm cel mai bun rezultat fie ignorând ultimul caracter din A, fie din B. dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
  "complexity": "### Complexitate\n\n- **Timp:** O(N * M) unde N, M sunt lungimile șirurilor.\\n- **Spațiu:** O(N * M) pentru matrice. Poate fi redus la O(min(N, M)) dacă vrem doar lungimea, nu și stringul.\n",
  "variations": "### Variații și Edge Cases\n\n1. Longest Common Substring (elementele trebuie să fie consecutive).\\n2. Edit Distance (câte modificări sunt necesare pentru a transforma un string în altul).",
  "applications": "### Aplicații\n\nDiferența de cod (diff tools), corecția ortografică, recunoașterea vocii, similaritatea șirurilor ADN.",
  code: `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcs(string X, string Y) {
    int m = X.length();
    int n = Y.length();
    
    // DP tabel de (m+1) x (n+1)
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

int main() {
    string X = \"AGGTAB\";
    string Y = \"GXTXAYB\";
    cout << \"Lungime LCS este \" << lcs(X, Y) << \"\
\";
    return 0;
}
`,
  "explanations": [
    {
      "line": 12,
      "text": "Creăm matricea dp de 7x8 cu 0 peste tot.",
      "blocksVisual": [
        {
          "label": "Matrice DP",
          "groups": [
            [
              {
                "val": "0-uri",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Comparăm primul A ('A') cu toate caracterele din Y. La Y[4] ('A'), match! dp[1][5] devine dp[0][4]+1 = 1.",
      "blocksVisual": [
        {
          "label": "Match A",
          "groups": [
            [
              {
                "val": "dp[1][5] = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Următoarele G, G, T, A, B vor completa pe baza elementelor adiacente stânga/sus și a match-urilor diagonale.",
      "blocksVisual": [
        {
          "label": "Completare",
          "groups": [
            [
              {
                "val": "max(stanga, sus)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La X[2] ('G') cu Y[0] ('G') e match! dp[2][1] devine dp[1][0]+1=1.",
      "blocksVisual": [
        {
          "label": "Match G",
          "groups": [
            [
              {
                "val": "dp[2][1] = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Pentru B (ultimul din X) și ultimul din Y ('B'), match. dp[6][7] = dp[5][6]+1 = 4.",
      "blocksVisual": [
        {
          "label": "Ultimul Match",
          "groups": [
            [
              {
                "val": "dp[6][7] = 4",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Răspunsul este 4. Pentru a extrage stringul, mergem invers de la dp[6][7] la 0.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Lungime 4",
                "active": true
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
        "title": "LCS CMMDC",
        "url": "https://www.infoarena.ro/problema/cmlsc",
        "desc": "Problema clasica de LCS pe numere"
      }
    ],
    "medium": [
      {
        "title": "Longest Common Subsequence",
        "url": "https://leetcode.com/problems/longest-common-subsequence/",
        "desc": "Standard"
      }
    ],
    "hard": [
      {
        "title": "Shortest Common Supersequence",
        "url": "https://leetcode.com/problems/shortest-common-supersequence/",
        "desc": "Combinația a doua string-uri"
      }
    ]
  }
};
