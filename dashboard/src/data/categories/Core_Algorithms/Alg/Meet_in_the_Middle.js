export const data = {
  "presentation": "### Prezentare Generală\n\nMeet in the Middle este o tehnică inteligentă folosită atunci când complexitatea exponențială a problemei este un pic prea mare (ex: $O(2^N)$ pentru $N=40$).\n\nIdeea este să împărțim datele de intrare în două jumătăți aproximativ egale ($N/2$). Generăm toate soluțiile posibile independent pentru stânga și pentru dreapta. Aceasta durează $O(2^{N/2}) + O(2^{N/2})$, care e MULT mai mic decât $O(2^N)$.\n\nApoi, combinăm ('ne întâlnim la mijloc') soluțiile celor două jumătăți într-un mod eficient, de regulă sortând o jumătate și făcând Căutare Binară sau folosind Two Pointers pe ea pentru fiecare element din a doua jumătate.",
  "complexity": "### Complexitate\n\n- **Timp:** Reducere de la $O(2^N)$ la $O(2^{N/2} \\cdot N)$ datorită combinării.\n- **Spațiu:** $O(2^{N/2})$ pentru a stoca soluțiile unei jumătăți în memorie.\n",
  "variations": "### Variații și Edge Cases\n\n1. Subset Sum: Aflarea dacă există o submulțime cu o anumită sumă.\n2. 4-SUM: Reducerea de la $O(N^4)$ la $O(N^2 \\log N)$ prin același principiu, doar că împărțim în perechi în loc de jumătăți de array.",
  "applications": "### Aplicații\n\nFolosit în criptografie (atacuri asupra 2DES - Double DES), unde împărțirea spațiului cheilor la jumătate face atacul fezabil.",
  code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Functie auxiliara pentru a genera toate sumele de submultimi
void getSubsetSums(const vector<long long>& arr, int start, int end, vector<long long>& res) {
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

int main() {
    vector<long long> a = {2, 3, 9, 10};
    long long S = 13;
    cout << "Suma maxima <= " << S << " este: " << maxSubsetSumLessThanS(a, S) << "\n";
    return 0;
}
`,
  "explanations": [
    {
      "line": 22,
      "text": "Apelăm maxSubsetSumLessThanS pentru a = {2, 3, 9, 10} și target S = 13. Dimensiunea vectorului este n = 4.",
      "blocksVisual": [
        { "label": "Input", "groups": [[{"val": "a = {2, 3, 9, 10}"}, {"val": "S = 13"}]] }
      ]
    },
    {
      "line": 24,
      "text": "Declarăm vectorii auxiliari left și right pentru a reține sumele celor două jumătăți.",
      "blocksVisual": [
        { "label": "Inițializare", "groups": [[{"val": "left"}, {"val": "right"}]] }
      ]
    },
    {
      "line": 27,
      "text": "Apelăm getSubsetSums pe prima jumătate a = {2, 3} (de la start = 0 la end = 2).",
      "blocksVisual": [
        { "label": "Prima Jumătate", "groups": [[{"val": 2}, {"val": 3}]] }
      ]
    },
    {
      "line": 11,
      "text": "Generăm sumele pentru submulțimile stângi folosind măști pe biți. Pentru masca 0 (submulțimea vidă), suma este 0.",
      "blocksVisual": [
        { "label": "left sume", "groups": [[{"val": 0, "active": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Masca 1 selectează {2}, suma este 2. Masca 2 selectează {3}, suma este 3.",
      "blocksVisual": [
        { "label": "left sume", "groups": [[{"val": 0}, {"val": 2, "active": true}, {"val": 3, "active": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Masca 3 selectează {2, 3}, suma este 5. Vectorul left devine: {0, 2, 3, 5}.",
      "blocksVisual": [
        { "label": "left complet", "groups": [[{"val": 0}, {"val": 2}, {"val": 3}, {"val": 5, "sorted": true}]] }
      ]
    },
    {
      "line": 28,
      "text": "Apelăm getSubsetSums pe a doua jumătate a = {9, 10} (de la start = 2 la end = 4).",
      "blocksVisual": [
        { "label": "A doua Jumătate", "groups": [[{"val": 9}, {"val": 10}]] }
      ]
    },
    {
      "line": 11,
      "text": "Generăm sumele pentru submulțimile drepte. Masca 0 produce suma 0.",
      "blocksVisual": [
        { "label": "right sume", "groups": [[{"val": 0, "active": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Masca 1 produce {9}, suma este 9. Masca 2 produce {10}, suma este 10.",
      "blocksVisual": [
        { "label": "right sume", "groups": [[{"val": 0}, {"val": 9, "active": true}, {"val": 10, "active": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Masca 3 produce {9, 10}, suma este 19. Vectorul right devine: {0, 9, 10, 19}.",
      "blocksVisual": [
        { "label": "right complet", "groups": [[{"val": 0}, {"val": 9}, {"val": 10}, {"val": 19, "sorted": true}]] }
      ]
    },
    {
      "line": 31,
      "text": "Sortăm vectorul right. Vectorul este deja ordonat: {0, 9, 10, 19}.",
      "blocksVisual": [
        { "label": "Sorted Right", "groups": [[{"val": 0, "sorted": true}, {"val": 9, "sorted": true}, {"val": 10, "sorted": true}, {"val": 19, "sorted": true}]] }
      ]
    },
    {
      "line": 33,
      "text": "Inițializăm suma maximă validă: max_sum = 0.",
      "blocksVisual": [
        { "label": "max_sum = 0", "groups": [[{"val": 0}]] }
      ]
    },
    {
      "line": 36,
      "text": "Începem parcurgerea vectorului left. Pentru i = 0, left[0] = 0.",
      "blocksVisual": [
        { "label": "i = 0", "groups": [[{"val": 0, "active": true}, {"val": 2}, {"val": 3}, {"val": 5}]] }
      ]
    },
    {
      "line": 37,
      "text": "Verificăm dacă left[0] <= S (0 <= 13) - adevărat.",
      "blocksVisual": [
        { "label": "Verificare S", "groups": [[{"val": "0 <= 13 (Adevărat)"}]] }
      ]
    },
    {
      "line": 39,
      "text": "Căutăm binar în right cea mai mare valoare <= S - left[0] (13 - 0 = 13). upper_bound returnează poziția elementului 19.",
      "blocksVisual": [
        { "label": "Căutare 13", "groups": [[{"val": 0}, {"val": 9}, {"val": 10}, {"val": 19, "active": true}]] }
      ]
    },
    {
      "line": 41,
      "text": "Deoarece elementul precedent lui 19 este 10, actualizăm max_sum = max(0, 0 + 10) = 10.",
      "blocksVisual": [
        { "label": "max_sum = 10", "groups": [[{"val": 10, "sorted": true}]] }
      ]
    },
    {
      "line": 36,
      "text": "Incrementăm i la 1. left[1] = 2.",
      "blocksVisual": [
        { "label": "i = 1", "groups": [[{"val": 0}, {"val": 2, "active": true}, {"val": 3}, {"val": 5}]] }
      ]
    },
    {
      "line": 39,
      "text": "Căutăm binar în right valoarea <= S - left[1] (13 - 2 = 11). upper_bound returnează elementul 19.",
      "blocksVisual": [
        { "label": "Căutare 11", "groups": [[{"val": 0}, {"val": 9}, {"val": 10}, {"val": 19, "active": true}]] }
      ]
    },
    {
      "line": 41,
      "text": "Elementul precedent este 10. Actualizăm max_sum = max(10, 2 + 10) = 12.",
      "blocksVisual": [
        { "label": "max_sum = 12", "groups": [[{"val": 12, "sorted": true}]] }
      ]
    },
    {
      "line": 36,
      "text": "Incrementăm i la 2. left[2] = 3.",
      "blocksVisual": [
        { "label": "i = 2", "groups": [[{"val": 0}, {"val": 2}, {"val": 3, "active": true}, {"val": 5}]] }
      ]
    },
    {
      "line": 39,
      "text": "Căutăm binar în right valoarea <= S - left[2] (13 - 3 = 10). upper_bound returnează 19.",
      "blocksVisual": [
        { "label": "Căutare 10", "groups": [[{"val": 0}, {"val": 9}, {"val": 10}, {"val": 19, "active": true}]] }
      ]
    },
    {
      "line": 41,
      "text": "Elementul precedent este 10. Actualizăm max_sum = max(12, 3 + 10) = 13.",
      "blocksVisual": [
        { "label": "max_sum = 13", "groups": [[{"val": 13, "sorted": true}]] }
      ]
    },
    {
      "line": 36,
      "text": "Incrementăm i la 3. left[3] = 5.",
      "blocksVisual": [
        { "label": "i = 3", "groups": [[{"val": 0}, {"val": 2}, {"val": 3}, {"val": 5, "active": true}]] }
      ]
    },
    {
      "line": 39,
      "text": "Căutăm binar în right valoarea <= S - left[3] (13 - 5 = 8). upper_bound returnează 9.",
      "blocksVisual": [
        { "label": "Căutare 8", "groups": [[{"val": 0}, {"val": 9, "active": true}, {"val": 10}, {"val": 19}]] }
      ]
    },
    {
      "line": 41,
      "text": "Elementul precedent lui 9 este 0. Suma obținută ar fi 5 + 0 = 5. max_sum rămâne 13.",
      "blocksVisual": [
        { "label": "max_sum = 13", "groups": [[{"val": 13}]] }
      ]
    },
    {
      "line": 36,
      "text": "Bucla for s-a terminat.",
      "blocksVisual": [
        { "label": "For terminat", "groups": [[{"val": "i = 4"}]] }
      ]
    },
    {
      "line": 45,
      "text": "Returnăm valoarea max_sum = 13. Problema a fost rezolvată în mod optim folosind tehnica Meet in the Middle!",
      "blocksVisual": [
        { "label": "Rezultat Final", "groups": [[{"val": 13, "sorted": true}]] }
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
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const stepData = [
        { phase: "init", stack: ["maxSubsetSumLessThanS"] }, // 0
        { phase: "init", stack: ["maxSubsetSumLessThanS"] }, // 1
        { phase: "left_sums_call", stack: ["maxSubsetSumLessThanS"] }, // 2
        { phase: "left_sums", stack: ["getSubsetSums(arr, start=0, end=2)", "maxSubsetSumLessThanS"], start: 0, end: 2, n: 2, mask: 0, res: [0] }, // 3
        { phase: "left_sums", stack: ["getSubsetSums(arr, start=0, end=2)", "maxSubsetSumLessThanS"], start: 0, end: 2, n: 2, mask: 2, res: [0, 2, 3] }, // 4
        { phase: "left_sums", stack: ["getSubsetSums(arr, start=0, end=2)", "maxSubsetSumLessThanS"], start: 0, end: 2, n: 2, mask: 3, res: [0, 2, 3, 5] }, // 5
        { phase: "right_sums_call", stack: ["maxSubsetSumLessThanS"] }, // 6
        { phase: "right_sums", stack: ["getSubsetSums(arr, start=2, end=4)", "maxSubsetSumLessThanS"], start: 2, end: 4, n: 2, mask: 0, res: [0] }, // 7
        { phase: "right_sums", stack: ["getSubsetSums(arr, start=2, end=4)", "maxSubsetSumLessThanS"], start: 2, end: 4, n: 2, mask: 2, res: [0, 9, 10] }, // 8
        { phase: "right_sums", stack: ["getSubsetSums(arr, start=2, end=4)", "maxSubsetSumLessThanS"], start: 2, end: 4, n: 2, mask: 3, res: [0, 9, 10, 19] }, // 9
        { phase: "sort", stack: ["maxSubsetSumLessThanS"] }, // 10
        { phase: "solve", i: -1, max_sum: 0, stack: ["maxSubsetSumLessThanS"] }, // 11
        { phase: "solve", i: 0, max_sum: 0, stack: ["maxSubsetSumLessThanS"] }, // 12
        { phase: "solve", i: 0, max_sum: 0, stack: ["maxSubsetSumLessThanS"] }, // 13
        { phase: "solve", i: 0, max_sum: 0, stack: ["maxSubsetSumLessThanS"] }, // 14
        { phase: "solve", i: 0, max_sum: 10, stack: ["maxSubsetSumLessThanS"] }, // 15
        { phase: "solve", i: 1, max_sum: 10, stack: ["maxSubsetSumLessThanS"] }, // 16
        { phase: "solve", i: 1, max_sum: 10, stack: ["maxSubsetSumLessThanS"] }, // 17
        { phase: "solve", i: 1, max_sum: 12, stack: ["maxSubsetSumLessThanS"] }, // 18
        { phase: "solve", i: 2, max_sum: 12, stack: ["maxSubsetSumLessThanS"] }, // 19
        { phase: "solve", i: 2, max_sum: 12, stack: ["maxSubsetSumLessThanS"] }, // 20
        { phase: "solve", i: 2, max_sum: 13, stack: ["maxSubsetSumLessThanS"] }, // 21
        { phase: "solve", i: 3, max_sum: 13, stack: ["maxSubsetSumLessThanS"] }, // 22
        { phase: "solve", i: 3, max_sum: 13, stack: ["maxSubsetSumLessThanS"] }, // 23
        { phase: "solve", i: 3, max_sum: 13, stack: ["maxSubsetSumLessThanS"] }, // 24
        { phase: "solve", i: 4, max_sum: 13, stack: ["maxSubsetSumLessThanS"] }, // 25
        { phase: "ret", i: 4, max_sum: 13, stack: ["maxSubsetSumLessThanS"] } // 26
      ];

      const curr = stepData[stepIndex] || stepData[stepData.length - 1];

      curr.stack.forEach((fName) => {
        frames.push({
          name: fName.includes("getSubsetSums") ? fName : "maxSubsetSumLessThanS(vector<long long>& a, long long S)",
          file: "solution.cpp",
          line: fName.includes("getSubsetSums") ? activeLine : (stepIndex <= 2 ? 33 : (stepIndex <= 5 ? 33 : (stepIndex <= 9 ? 34 : activeLine)))
        });
      });
      frames.push({ name: "main()", file: "main.cpp", line: 51 });

      if (curr.phase === "left_sums" || curr.phase === "right_sums") {
        vars.push({ name: "start", type: "int", val: curr.start.toString(), expandable: false });
        vars.push({ name: "end", type: "int", val: curr.end.toString(), expandable: false });
        vars.push({ name: "n", type: "int", val: curr.n.toString(), expandable: false });
        vars.push({ name: "i (mask)", type: "int", val: curr.mask.toString(), expandable: false });
        vars.push({ name: "res", type: "std::vector<long long>", val: "size = " + curr.res.length, expandable: true });
        inlineVal = "start: " + curr.start + ", end: " + curr.end + ", mask: " + curr.mask;
      } else {
        const leftSize = stepIndex >= 6 ? 4 : (stepIndex >= 3 ? curr.res.length : 0);
        const rightSize = stepIndex >= 10 ? 4 : (stepIndex >= 7 ? curr.res.length : 0);
        
        vars.push({ name: "left", type: "std::vector<long long>", val: "size = " + leftSize, expandable: true });
        vars.push({ name: "right", type: "std::vector<long long>", val: "size = " + rightSize, expandable: true });

        if (curr.phase === "solve" || curr.phase === "ret") {
          vars.push({ name: "max_sum", type: "long long", val: curr.max_sum.toString(), expandable: false });
          if (curr.i !== -1 && curr.i < 4) {
            vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
            vars.push({ name: "left[i]", type: "long long", val: [0, 2, 3, 5][curr.i].toString(), expandable: false });
          }
          inlineVal = "max_sum: " + curr.max_sum;
          if (curr.i !== -1 && curr.i < 4) inlineVal += ", i: " + curr.i;
        }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      if (stepIndex >= 3 && stepIndex <= 5) {
        if (lineNum >= 8 && lineNum <= 19) {
          const masks = [0, 0, 0, 0, 2, 3];
          return "start: 0, end: 2, mask: " + masks[stepIndex];
        }
      }
      if (stepIndex >= 7 && stepIndex <= 9) {
        if (lineNum >= 8 && lineNum <= 19) {
          const masks = [0, 0, 0, 0, 0, 0, 0, 0, 2, 3];
          return "start: 2, end: 4, mask: " + masks[stepIndex];
        }
      }
      if (stepIndex >= 11 && stepIndex <= 26) {
        let max_sum = (stepIndex >= 21) ? 13 : ((stepIndex >= 18) ? 12 : ((stepIndex >= 15) ? 10 : 0));
        let i = -1;
        if (stepIndex >= 12 && stepIndex <= 15) i = 0;
        else if (stepIndex >= 16 && stepIndex <= 18) i = 1;
        else if (stepIndex >= 19 && stepIndex <= 21) i = 2;
        else if (stepIndex >= 22 && stepIndex <= 25) i = 3;
        else if (stepIndex === 26) i = 4;

        if (lineNum === 33 || lineNum === 41 || lineNum === 45) {
          return "max_sum: " + max_sum;
        }
        if (lineNum === 36 || lineNum === 37 || lineNum === 39) {
          let res = "max_sum: " + max_sum;
          if (i !== -1 && i < 4) res += ", i: " + i;
          return res;
        }
      }
      return null;
    }
  }
};
