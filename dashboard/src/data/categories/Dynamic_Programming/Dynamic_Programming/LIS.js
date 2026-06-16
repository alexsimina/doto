export const data = {
  "presentation": "### Prezentare Generală\n\nCel Mai Lung Subșir Strict Crescător (Longest Increasing Subsequence - LIS) extrage un subșir strict crescător cât mai lung.\\n\\nExemplu: Pentru [10, 9, 2, 5, 3, 7, 101, 18], un LIS este [2, 3, 7, 101] (lungime 4).\\n\\nStarea: dp[i] = lungimea LIS care se termină exact la indexul i.\\n\\nTranziție (Abordarea O(N^2)):\\nPentru fiecare i, ne uităm la toate j < i. Dacă arr[i] > arr[j], atunci șirul care se termină în j poate fi extins cu arr[i].\\ndp[i] = max(dp[i], dp[j] + 1).\\n\\nExistă și o tehnică cu Binary Search care aduce complexitatea la O(N log N), dar paradigma DP se vede cel mai clar în versiunea pătratică.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N^2) abordarea pur DP. O(N log N) abordarea Căutare Binară + DP.\\n- **Spațiu:** O(N) pentru vectorul dp.\n",
  "variations": "### Variații și Edge Cases\n\n1. Cel mai lung subșir descrescător (LDS).\\n2. Bitonic Subsequence (crește, apoi descrește).",
  "applications": "### Aplicații\n\nSortarea minimă a elementelor (cate elemente trebuie mutate), analize pe secvențe biologice, algoritmul Patience Sorting.",
  code: `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int lis(vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return 0;
    
    // dp[i] stocheaza LIS care se termina in arr[i].
    vector<int> dp(n, 1); 
    int max_ans = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        max_ans = max(max_ans, dp[i]);
    }
    
    return max_ans;
}

int main() {
    vector<int> arr = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << \"Lungimea LIS este \" << lis(arr) << \"\
\";
    return 0;
}
`,
  "explanations": [
    {
      "line": 11,
      "text": "Inițializăm dp cu 1 (orice element singur formează un LIS de lungime 1).",
      "blocksVisual": [
        {
          "label": "DP Init",
          "groups": [
            [
              {
                "val": "[1, 1, 1, 1, 1, 1, 1, 1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La i=1 (arr[1]=9), îl comparăm cu arr[0]=10. 9 nu e mai mare ca 10. dp[1]=1.",
      "blocksVisual": [
        {
          "label": "i=1",
          "groups": [
            [
              {
                "val": "Nu extinde"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La i=3 (arr[3]=5), se uită la j=2 (arr[2]=2). Deoarece 5>2, dp[3] = dp[2]+1 = 2.",
      "blocksVisual": [
        {
          "label": "i=3, j=2",
          "groups": [
            [
              {
                "val": "dp[3] = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La i=5 (arr[5]=7), se uită la 2, 5, 3. 7 e mai mare decât ele. Din j=4 (arr[4]=3), dp[5]=dp[4]+1=2. Dar din j=3(arr[3]=5), dp[5] = dp[3]+1=3.",
      "blocksVisual": [
        {
          "label": "i=5 (Val 7)",
          "groups": [
            [
              {
                "val": "dp[5] = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La i=6 (arr[6]=101), acesta e mai mare ca 7 (dp=3), deci devine dp=4. La i=7(arr[7]=18), la fel devine dp=4 (extinde din valoarea 7).",
      "blocksVisual": [
        {
          "label": "Final completare",
          "groups": [
            [
              {
                "val": "max_ans = 4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Returnăm 4.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Lungime: 4",
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
        "title": "SCMAX",
        "url": "https://www.infoarena.ro/problema/scmax",
        "desc": "Clasica O(N log N) recomandata in infoarena"
      }
    ],
    "medium": [
      {
        "title": "Longest Increasing Subsequence",
        "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
        "desc": "Standard pe LeetCode"
      }
    ],
    "hard": [
      {
        "title": "Russian Doll Envelopes",
        "url": "https://leetcode.com/problems/russian-doll-envelopes/",
        "desc": "2D LIS. Sortare + LIS O(N log N)"
      }
    ]
  }
};
