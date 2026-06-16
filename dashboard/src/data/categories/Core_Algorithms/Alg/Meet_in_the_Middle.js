export const data = {
  "presentation": "### Prezentare Generală\n\nMeet in the Middle este o tehnică inteligentă folosită atunci când complexitatea exponențială a problemei este un pic prea mare (ex: $O(2^N)$ pentru $N=40$).\n\nIdeea este să împărțim datele de intrare în două jumătăți aproximativ egale ($N/2$). Generăm toate soluțiile posibile independent pentru stânga și pentru dreapta. Aceasta durează $O(2^{N/2}) + O(2^{N/2})$, care e MULT mai mic decât $O(2^N)$.\n\nApoi, combinăm ('ne întâlnim la mijloc') soluțiile celor două jumătăți într-un mod eficient, de regulă sortând o jumătate și făcând Căutare Binară sau folosind Two Pointers pe ea pentru fiecare element din a doua jumătate.",
  "complexity": "### Complexitate\n\n- **Timp:** Reducere de la $O(2^N)$ la $O(2^{N/2} \\cdot N)$ datorită combinării.\n- **Spațiu:** $O(2^{N/2})$ pentru a stoca soluțiile unei jumătăți în memorie.\n",
  "variations": "### Variații și Edge Cases\n\n1. Subset Sum: Aflarea dacă există o submulțime cu o anumită sumă.\n2. 4-SUM: Reducerea de la $O(N^4)$ la $O(N^2 \\log N)$ prin același principiu, doar că împărțim în perechi în loc de jumătăți de array.",
  "applications": "### Aplicații\n\nFolosit în criptografie (atacuri asupra 2DES - Double DES), unde împărțirea spațiului cheilor la jumătate face atacul fezabil.",
  code: `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Functie auxiliara pentru a genera toate sumele de submultimi
void getSubsetSums(var vector<long long>& arr, int start, int end, vector<long long>& res) {
    int n = end - start;
    // Iteram prin toate cele 2^n submultimi posibile folosind biti
    for (int i = 0; i < (1 << n); i++) {
        long long sum = 0;
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) {
                sum += arr[start + j];
            }
        }
        res.push_back(sum);
    }
}

long long maxSubsetSumLessThanS(vector<long long>& a, long long S) {
    int n = a.size();
    vector<long long> left, right;
    
    // Impartim vectorul in 2 jumatati
    getSubsetSums(a, 0, n / 2, left);
    getSubsetSums(a, n / 2, n, right);
    
    // Sortam jumatatea dreapta
    sort(right.begin(), right.end());
    
    long long max_sum = 0;
    
    // Pentru fiecare suma din stanga, gasim cel mai bun complement din dreapta
    for (int i = 0; i < left.size(); i++) {
        if (left[i] <= S) {
            // Cautare binara in 'right'
            auto it = upper_bound(right.begin(), right.end(), S - left[i]);
            if (it != right.begin()) {
                max_sum = max(max_sum, left[i] + *(--it));
            }
        }
    }
    return max_sum;
}
`,
  "explanations": [
    {
      "line": 24,
      "text": "Presupunem un vector de 40 elemente. Generarea tuturor celor 2^40 sume e imposibilă. Îl tăiem în 2 jumătăți de câte 20.",
      "blocksVisual": [
        {
          "label": "Împărțire",
          "groups": [
            [
              {
                "val": "A[0..19]"
              }
            ],
            [
              {
                "val": "A[20..39]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 27,
      "text": "Generăm toate sumele posibile pentru prima jumătate. Există 2^20 (aprox 1 milion) sume. Le stocăm în 'left'.",
      "blocksVisual": [
        {
          "label": "Sume Stânga",
          "groups": [
            [
              {
                "val": "2^20 elemente",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Generăm sumele și pentru a doua jumătate. Le stocăm în 'right'.",
      "blocksVisual": [
        {
          "label": "Sume Dreapta",
          "groups": [
            [
              {
                "val": "2^20 elemente",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Sortăm vectorul 'right' ca să putem căuta binar în el. Durează $O(2^{N/2} \\log(2^{N/2}))$.",
      "blocksVisual": [
        {
          "label": "Sortare Right",
          "groups": [
            [
              {
                "val": "Sorted Right",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Parcurgem fiecare sumă L din 'left'. Vrem ca (L + R <= S), deci vrem un R maxim cu condiția R <= S - L.",
      "blocksVisual": [
        {
          "label": "Iterare pe Left",
          "groups": [
            [
              {
                "val": "L curent",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Folosim 'upper_bound' (căutare binară) în 'right' pentru valoarea (S - L). Aceasta găsește rapid cel mai mare R.",
      "blocksVisual": [
        {
          "label": "Căutare Binară",
          "groups": [
            [
              {
                "val": "Găsim R",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Actualizăm suma maximă găsită până acum cu L + R. Continuăm până verificăm tot.",
      "blocksVisual": [
        {
          "label": "Actualizare",
          "groups": [
            [
              {
                "val": "Max = L + R"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 46,
      "text": "A durat de un milion de ori mai puțin decât o rezolvare backtraking standard!",
      "blocksVisual": [
        {
          "label": "Victorie!",
          "groups": [
            [
              {
                "val": "Done",
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
        "title": "4Sum",
        "url": "https://leetcode.com/problems/4sum/",
        "desc": "Clasica O(N^2)"
      }
    ],
    "medium": [
      {
        "title": "Subset Sum",
        "url": "https://www.spoj.com/problems/SUBSUMS/",
        "desc": "O(2^{N/2}) pe bune"
      }
    ],
    "hard": [
      {
        "title": "Closest Subsequence Sum",
        "url": "https://leetcode.com/problems/closest-subsequence-sum/",
        "desc": "Meet in the Middle pe Leetcode"
      }
    ]
  }
};
