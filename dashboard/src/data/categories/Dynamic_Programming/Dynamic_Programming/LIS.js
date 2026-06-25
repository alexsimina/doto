export const data = {
  "presentation": "### Prezentare Generală\n\nCel Mai Lung Subșir Strict Crescător (Longest Increasing Subsequence - LIS) este o problemă fundamentală de programare dinamică ce constă în găsirea lungimii maxime a unui subșir al unui tablou dat, astfel încât elementele subșirului să fie în ordine strict crescătoare. Elementele subșirului nu trebuie să fie adiacente în tabloul original.\n\nDe exemplu, în vectorul:\n- $arr$ = $[10, 9, 2, 5, 3, 7, 101, 18]$\nUn subșir crescător maxim este $[2, 3, 7, 101]$ (sau $[2, 5, 7, 101]$, $[2, 3, 7, 18]$ etc.), având lungimea maximă 4.\n\n#### Formulare DP\nDefinim starea:\n- $dp[i]$ = lungimea celui mai lung subșir strict crescător care se termină exact cu elementul de pe poziția $i$ ($arr[i]$).\n\nTranzițiile se stabilesc prin compararea elementului curent $arr[i]$ cu toate elementele anterioare $arr[j]$ ($j < i$):\n- Dacă $arr[i] > arr[j]$, atunci putem extinde orice subșir valid care se termină în $j$ prin adăugarea lui $arr[i]$.\n- Din toate opțiunile de extindere posibile, o alegem pe cea care maximizează lungimea:\n  $$dp[i] = \\max \\left( 1, \\max_{j < i, arr[i] > arr[j]} (dp[j] + 1) \\right)$$\n\n#### Cazuri de Bază\nFiecare element individual reprezintă un subșir crescător valid de lungime 1:\n$$dp[i] = 1 \\quad \\forall i \\in [0, N-1]$$\n\n#### Optimizare la $\\mathcal{O}(N \\log N)$\nPrin menținerea unui vector auxiliar care stochează cel mai mic element final pentru fiecare lungime de subșir crescător întâlnită până acum, putem folosi Căutarea Binară (prin funcții precum `std::lower_bound` în C++) pentru a plasa fiecare element la poziția sa optimă în $\\mathcal{O}(\\log N)$ per pas.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - $\\mathcal{O}(N^2)$ pentru abordarea standard cu două bucle imbricate (prezentată în cod).\n  - $\\mathcal{O}(N \\log N)$ pentru varianta optimizată cu Căutare Binară.\n- **Spațiu:** $\\mathcal{O}(N)$ pentru stocarea vectorului $dp$ (sau a vectorului auxiliar în cazul versiunii logaritmice).",
  "variations": "### Variații și Edge Cases\n\n1. **Cel Mai Lung Subșir Descrescător (LDS):** Se dorește o secvență strict descrescătoare (se inversează condiția în $arr[i] < arr[j]$).\n2. **Subșir Crescător Non-Strict (LIS Non-Strict):** Elementele succesive pot fi egale (condiția devine $arr[i] \\ge arr[j]$).\n3. **Cel Mai Lung Subșir Bitonic:** Subșirul crește până la un punct, după care scade (se calculează LIS de la stânga la dreapta și LDS de la dreapta la stânga, maximizând $dp_{LIS}[i] + dp_{LDS}[i] - 1$).\n4. **Edge Cases:**\n   - Vector gol (LIS = 0).\n   - Vector sortat strict descrescător (LIS = 1).\n   - Vector cu toate elementele egale (LIS = 1 pentru strict crescător, LIS = $N$ pentru non-strict).",
  "applications": "### Aplicații în Lumea Reală\n\n- **Patience Sorting:** Un algoritm eficient de sortare bazat pe jocul de cărți Solitaire, care calculează LIS în mod natural.\n- **Analiză Climatologică:** Identificarea tendințelor de încălzire globală prin extragerea celor mai lungi perioade de creștere consecutivă a temperaturilor medii.\n- **Sincronizarea Datelor:** Algoritmi de ordonare a pachetelor de date sosite dezordonat în rețele.\n- **Geometrie Computațională:** Determinarea numărului maxim de drepte neintersectabile în anumite configurații.",
  code: `#include <iostream>
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
    cout << "Lungimea LIS este " << lis(arr) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 27,
      "text": "Pornim programul. Avem vectorul arr = [10, 9, 2, 5, 3, 7, 101, 18] de lungime n = 8.",
      "blocksVisual": [
        {
          "label": "arr",
          "groups": [[
            { "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" },
            { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18" }
          ]]
        }
      ]
    },
    {
      "line": 11,
      "text": "Inițializăm vectorul dp cu 1. dp[i] reprezintă lungimea LIS care se termină la indexul i. dp = [1, 1, 1, 1, 1, 1, 1, 1]",
      "blocksVisual": [
        {
          "label": "dp",
          "groups": [[
            { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" },
            { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }
          ]]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 1 (arr[1] = 9), j = 0 (arr[0] = 10). Comparăm 9 > 10. False, deci dp[1] rămâne 1.",
      "blocksVisual": [
        {
          "label": "i=1, j=0",
          "groups": [
            [{ "val": "10", "active": true }, { "val": "9", "active": true }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 2 (arr[2] = 2), j = 0 (arr[0] = 10). Comparăm 2 > 10. False, dp[2] rămâne 1.",
      "blocksVisual": [
        {
          "label": "i=2, j=0",
          "groups": [
            [{ "val": "10", "active": true }, { "val": "9" }, { "val": "2", "active": true }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 2 (arr[2] = 2), j = 1 (arr[1] = 9). Comparăm 2 > 9. False, dp[2] rămâne 1.",
      "blocksVisual": [
        {
          "label": "i=2, j=1",
          "groups": [
            [{ "val": "10" }, { "val": "9", "active": true }, { "val": "2", "active": true }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 3 (arr[3] = 5), j = 0 (10) și j = 1 (9). Ambele fals.",
      "blocksVisual": [
        {
          "label": "i=3, j<2",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5", "active": true }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 3 (arr[3] = 5), j = 2 (arr[2] = 2). Deoarece 5 > 2, dp[3] devine max(dp[3]=1, dp[2]+1 = 2) = 2.",
      "blocksVisual": [
        {
          "label": "i=3, j=2",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2", "active": true }, { "val": "5", "active": true }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 4 (arr[4] = 3), j = 0 (10) și j = 1 (9). Fals.",
      "blocksVisual": [
        {
          "label": "i=4, j<2",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3", "active": true }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 4 (arr[4] = 3), j = 2 (arr[2] = 2). 3 > 2 este True. dp[4] = max(1, dp[2]+1) = 2.",
      "blocksVisual": [
        {
          "label": "i=4, j=2",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2", "active": true }, { "val": "5" }, { "val": "3", "active": true }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 4 (arr[4] = 3), j = 3 (arr[3] = 5). 3 > 5 este False. dp[4] rămâne 2.",
      "blocksVisual": [
        {
          "label": "i=4, j=3",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5", "active": true }, { "val": "3", "active": true }, { "val": "7" }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2", "active": true }, { "val": "1" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 5 (arr[5] = 7), j = 0 (10) și j = 1 (9). False.",
      "blocksVisual": [
        {
          "label": "i=5, j<2",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7", "active": true }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "1", "active": true }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 5 (arr[5] = 7), j = 2 (arr[2] = 2). 7 > 2 este True. dp[5] = max(1, dp[2]+1) = 2.",
      "blocksVisual": [
        {
          "label": "i=5, j=2",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2", "active": true }, { "val": "5" }, { "val": "3" }, { "val": "7", "active": true }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "2", "active": true }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 5 (arr[5] = 7), j = 3 (arr[3] = 5). 7 > 5 este True. dp[5] = max(2, dp[3]+1 = 3) = 3.",
      "blocksVisual": [
        {
          "label": "i=5, j=3",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5", "active": true }, { "val": "3" }, { "val": "7", "active": true }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3", "active": true }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 5 (arr[5] = 7), j = 4 (arr[4] = 3). 7 > 3 este True. dp[5] = max(3, dp[4]+1 = 3) = 3.",
      "blocksVisual": [
        {
          "label": "i=5, j=4",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3", "active": true }, { "val": "7", "active": true }, { "val": "101" }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3", "active": true }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 6 (arr[6] = 101), j = 0 (10) și j = 1 (9). Ambele True. dp[6] devine max(1, dp[0]+1=2) = 2.",
      "blocksVisual": [
        {
          "label": "i=6, j<2",
          "groups": [
            [{ "val": "10", "active": true }, { "val": "9", "active": true }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101", "active": true }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "2", "active": true }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 6 (arr[6] = 101), j = 2 (2), j = 3 (5), j = 4 (3). Toate True. dp[6] crește până la 3.",
      "blocksVisual": [
        {
          "label": "i=6, j<5",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101", "active": true }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "3", "active": true }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 6 (arr[6] = 101), j = 5 (arr[5] = 7). 101 > 7 este True. dp[6] = max(3, dp[5]+1 = 4) = 4.",
      "blocksVisual": [
        {
          "label": "i=6, j=5",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7", "active": true }, { "val": "101", "active": true }, { "val": "18" }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "4", "active": true }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 7 (arr[7] = 18), j = 0 (10). 18 > 10 este True. dp[7] = max(1, dp[0]+1) = 2.",
      "blocksVisual": [
        {
          "label": "i=7, j=0",
          "groups": [
            [{ "val": "10", "active": true }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18", "active": true }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "4" }, { "val": "2", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 7 (arr[7] = 18), j = 1 (9). 18 > 9 este True. dp[7] = max(2, dp[1]+1) = 2.",
      "blocksVisual": [
        {
          "label": "i=7, j=1",
          "groups": [
            [{ "val": "10" }, { "val": "9", "active": true }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18", "active": true }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "4" }, { "val": "2", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 7 (arr[7] = 18), j = 2 (2) și j = 3 (5). Ambele True. dp[7] = max(2, dp[3]+1) = 3.",
      "blocksVisual": [
        {
          "label": "i=7, j<4",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5", "active": true }, { "val": "3" }, { "val": "7" }, { "val": "101" }, { "val": "18", "active": true }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "4" }, { "val": "3", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "i = 7 (arr[7] = 18), j = 5 (arr[5] = 7). 18 > 7 este True. dp[7] = max(3, dp[5]+1 = 4) = 4.",
      "blocksVisual": [
        {
          "label": "i=7, j=5",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7", "active": true }, { "val": "101" }, { "val": "18", "active": true }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "4" }, { "val": "4", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "i = 7 (arr[7] = 18), j = 6 (arr[6] = 101). 18 > 101 este False. dp[7] rămâne 4.",
      "blocksVisual": [
        {
          "label": "i=7, j=6",
          "groups": [
            [{ "val": "10" }, { "val": "9" }, { "val": "2" }, { "val": "5" }, { "val": "3" }, { "val": "7" }, { "val": "101", "active": true }, { "val": "18", "active": true }],
            [{ "val": "1" }, { "val": "1" }, { "val": "1" }, { "val": "2" }, { "val": "2" }, { "val": "3" }, { "val": "4" }, { "val": "4", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Algoritmul s-a încheiat. Cel mai lung subșir strict crescător are lungimea max_ans = 4.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [[{ "val": "4", "sorted": true }]]
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
  },
  "globalVars": [
    {
      "name": "dp",
      "type": "std::vector<int>",
      "val": "LIS lengths array",
      "expandable": false
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "arr", type: "std::vector<int>&", val: "{10, 9, 2, 5, 3, 7, 101, 18}", expandable: false });

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex === 0) ? 27 : (stepIndex === 22 ? 28 : 28) });

      if (stepIndex >= 1 && stepIndex <= 22) {
        frames.unshift({ name: "lis(arr)", file: "solution.cpp", line: activeLine });
      }

      if (stepIndex >= 1 && stepIndex <= 21) {
        let i = -1;
        let j = -1;
        let max_ans = 1;

        if (stepIndex === 2) i = 1;
        else if (stepIndex >= 3 && stepIndex <= 4) i = 2;
        else if (stepIndex >= 5 && stepIndex <= 6) i = 3;
        else if (stepIndex >= 7 && stepIndex <= 9) i = 4;
        else if (stepIndex >= 10 && stepIndex <= 13) i = 5;
        else if (stepIndex >= 14 && stepIndex <= 16) i = 6;
        else if (stepIndex >= 17 && stepIndex <= 21) i = 7;

        if (stepIndex === 2) j = 0;
        else if (stepIndex === 3) j = 0;
        else if (stepIndex === 4) j = 1;
        else if (stepIndex === 5) j = 1;
        else if (stepIndex === 6) j = 2;
        else if (stepIndex === 7) j = 1;
        else if (stepIndex === 8) j = 2;
        else if (stepIndex === 9) j = 3;
        else if (stepIndex === 10) j = 1;
        else if (stepIndex === 11) j = 2;
        else if (stepIndex === 12) j = 3;
        else if (stepIndex === 13) j = 4;
        else if (stepIndex === 14) j = 1;
        else if (stepIndex === 15) j = 4;
        else if (stepIndex === 16) j = 5;
        else if (stepIndex === 17) j = 0;
        else if (stepIndex === 18) j = 1;
        else if (stepIndex === 19) j = 3;
        else if (stepIndex === 20) j = 5;
        else if (stepIndex === 21) j = 6;

        if (stepIndex >= 6 && stepIndex <= 11) max_ans = 2;
        else if (stepIndex >= 12 && stepIndex <= 15) max_ans = 3;
        else if (stepIndex >= 16) max_ans = 4;

        if (i !== -1) vars.push({ name: "i", type: "int", val: i.toString(), expandable: false });
        if (j !== -1) vars.push({ name: "j", type: "int", val: j.toString(), expandable: false });

        let dp = [1, 1, 1, 1, 1, 1, 1, 1];
        if (stepIndex >= 6) dp[3] = 2;
        if (stepIndex >= 8) dp[4] = 2;
        if (stepIndex >= 11) dp[5] = 2;
        if (stepIndex >= 12) dp[5] = 3;
        if (stepIndex >= 14) dp[6] = 2;
        if (stepIndex >= 15) dp[6] = 3;
        if (stepIndex >= 16) dp[6] = 4;
        if (stepIndex >= 17) dp[7] = 2;
        if (stepIndex >= 18) dp[7] = 2;
        if (stepIndex >= 19) dp[7] = 3;
        if (stepIndex >= 20) dp[7] = 4;

        vars.push({ name: "dp", type: "std::vector<int>", val: `{${dp.map(v => v.toString()).join(", ")}}`, expandable: false });
        vars.push({ name: "max_ans", type: "int", val: max_ans.toString(), expandable: false });

        if (i !== -1) vars.push({ name: "arr[i]", type: "int", val: [10, 9, 2, 5, 3, 7, 101, 18][i].toString(), expandable: false });
        if (j !== -1) vars.push({ name: "arr[j]", type: "int", val: [10, 9, 2, 5, 3, 7, 101, 18][j].toString(), expandable: false });

        inlineVal = "";
        if (i !== -1) inlineVal += `i: ${i}`;
        if (j !== -1) inlineVal += `, j: ${j}`;
        inlineVal += `, max_ans: ${max_ans}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex >= 1 && stepIndex <= 21) {
        let i = -1;
        let j = -1;
        
        if (stepIndex === 2) i = 1;
        else if (stepIndex >= 3 && stepIndex <= 4) i = 2;
        else if (stepIndex >= 5 && stepIndex <= 6) i = 3;
        else if (stepIndex >= 7 && stepIndex <= 9) i = 4;
        else if (stepIndex >= 10 && stepIndex <= 13) i = 5;
        else if (stepIndex >= 14 && stepIndex <= 16) i = 6;
        else if (stepIndex >= 17 && stepIndex <= 21) i = 7;

        if (stepIndex === 2) j = 0;
        else if (stepIndex === 3) j = 0;
        else if (stepIndex === 4) j = 1;
        else if (stepIndex === 5) j = 1;
        else if (stepIndex === 6) j = 2;
        else if (stepIndex === 7) j = 1;
        else if (stepIndex === 8) j = 2;
        else if (stepIndex === 9) j = 3;
        else if (stepIndex === 10) j = 1;
        else if (stepIndex === 11) j = 2;
        else if (stepIndex === 12) j = 3;
        else if (stepIndex === 13) j = 4;
        else if (stepIndex === 14) j = 1;
        else if (stepIndex === 15) j = 4;
        else if (stepIndex === 16) j = 5;
        else if (stepIndex === 17) j = 0;
        else if (stepIndex === 18) j = 1;
        else if (stepIndex === 19) j = 3;
        else if (stepIndex === 20) j = 5;
        else if (stepIndex === 21) j = 6;

        if (lineNum === 14) return i !== -1 ? `i: ${i}` : null;
        if (lineNum === 15 || lineNum === 16 || lineNum === 17) {
          let res = "";
          if (i !== -1) res += `i: ${i}`;
          if (j !== -1) res += `, j: ${j}`;
          return res || null;
        }
      }
      return null;
    }
  }
};
