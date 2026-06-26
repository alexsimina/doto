export const data = {
  "presentation": "### Prezentare Generală\n\nMatematica avansată din informatică implică concepte ce apar des în concursuri și în cryptografie modernă.\n\nPrintre ele amintim:\n1. **Inversul Modular**: În aritmetica modulară nu putem \"împărți\". Pentru a calcula $(A / B) \\pmod M$, calculăm $(A \\times B^{-1}) \\pmod M$, unde $B^{-1}$ e inversul modular al lui B. Îl găsim fie cu Algoritmul lui Euclid Extins, fie cu Teorema Mică a lui Fermat ($B^{M-2} \\pmod M$).\n2. **Exponențierea Rapidă pe Matrici**: Știm că recurențele liniare, precum Șirul lui Fibonacci $F_n = F_{n-1} + F_{n-2}$, durează O(N). Putem rescrie recurența ca o înmulțire de matrici. Ridicând matricea la puterea $N$ în timp logaritmic, obținem termenul $F_N$ în $O(\\log N)$.\n3. **Transformata Fourier Rapidă (FFT)**: Utilizată pentru a înmulți două polinoame de grad N în $O(N \\log N)$ în loc de $O(N^2)$. Folosește evaluarea polinomului pe rădăcini complexe ale unității.",
  "complexity": "### Complexitate\n\n- **Timp:** Exponențierea pe matrici costă $O(K^3 \\log N)$ unde K e dimensiunea matricii de tranziție (ex: K=2 pt Fibonacci). Euclid Extins costă $O(\\log(\\min(A, B)))$ similar cu GCD-ul normal.\n- **Spațiu:** O(1) auxiliar (cu excepția stivei de recursivitate pentru funcții sau matricilor).\n",
  "variations": "### Variații și Edge Cases\n\n1. Teorema Chineză a Resturilor (CRT): Folosită pentru a găsi un număr $X$ care dă resturi diferite modulo numere prime între ele diferite.\n2. FFT pe corpuri finite (Number Theoretic Transform - NTT): Asemănător cu FFT, dar folosește un Modulo special (ex. $998244353$) și rădăcini primitive în loc de numere complexe pentru a garanta exactitatea la nivel de bit și a evita erorile în virgulă mobilă.",
  "applications": "### Aplicații\n\nAritmetica exponențială masivă pentru numărarea posibilităților (combinatorică DP). Punctul de intersecție dintre teoria jocurilor (Numere Grundy / Nim) și teoria grafurilor depinde deseori de fundamente matematice (operații XOR, recurențe).",
  code: `#include <iostream>

using namespace std;

// Functie pentru Algoritmul lui Euclid Extins
// Returneaza CMMDC(a, b) si gaseste x, y astfel incat: a * x + b * y = gcd(a, b)
long long gcdExtended(long long a, long long b, long long *x, long long *y) {
    if (a == 0) {
        *x = 0;
        *y = 1;
        return b;
    }

    long long x1, y1;
    long long gcd = gcdExtended(b % a, a, &x1, &y1);

    // Actualizam x si y folosind rezultatele din apelul recursiv
    *x = y1 - (b / a) * x1;
    *y = x1;

    return gcd;
}

int main() {
    long long a = 34, b = 21;
    long long x, y;
    long long g = gcdExtended(a, b, &x, &y);
    
    cout << "CMMDC(" << a << ", " << b << ") = " << g << "\\n";
    cout << "X = " << x << ", Y = " << y << "\\n";
    cout << "Verificare: " << a << "*" << x << " + " << b << "*" << y << " = " << a*x + b*y << "\\n";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 26,
      "text": "Pasul 1: Începem programul din funcția main cu a = 34 și b = 21. Apelăm gcdExtended(34, 21, &x, &y).",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 2: Apelul 1 - gcdExtended(34, 21). a = 34 (nenul). Calculăm recursiv cu b % a = 21 % 34 = 21 și a = 34.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 3: Apelul 2 - gcdExtended(21, 34). a = 21 (nenul). Calculăm recursiv cu b % a = 34 % 21 = 13 și a = 21.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 4: Apelul 3 - gcdExtended(13, 21). a = 13 (nenul). Calculăm recursiv cu b % a = 21 % 13 = 8 și a = 13.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)" }],
            [{ "val": "gcd(8, 13)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 5: Apelul 4 - gcdExtended(8, 13). a = 8 (nenul). Calculăm recursiv cu b % a = 13 % 8 = 5 și a = 8.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)" }],
            [{ "val": "gcd(8, 13)" }],
            [{ "val": "gcd(5, 8)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 6: Apelul 5 - gcdExtended(5, 8). a = 5 (nenul). Calculăm recursiv cu b % a = 8 % 5 = 3 și a = 5.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)" }],
            [{ "val": "gcd(8, 13)" }],
            [{ "val": "gcd(5, 8)" }],
            [{ "val": "gcd(3, 5)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 7: Apelul 6 - gcdExtended(3, 5). a = 3 (nenul). Calculăm recursiv cu b % a = 5 % 3 = 2 și a = 3.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)" }],
            [{ "val": "gcd(8, 13)" }],
            [{ "val": "gcd(5, 8)" }],
            [{ "val": "gcd(3, 5)" }],
            [{ "val": "gcd(2, 3)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 8: Apelul 7 - gcdExtended(2, 3). a = 2 (nenul). Calculăm recursiv cu b % a = 3 % 2 = 1 și a = 2.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)" }],
            [{ "val": "gcd(8, 13)" }],
            [{ "val": "gcd(5, 8)" }],
            [{ "val": "gcd(3, 5)" }],
            [{ "val": "gcd(2, 3)" }],
            [{ "val": "gcd(1, 2)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 9: Apelul 8 - gcdExtended(1, 2). a = 1 (nenul). Calculăm recursiv cu b % a = 2 % 1 = 0 și a = 1.",
      "blocksVisual": [
        {
          "label": "Stiva de Apeluri",
          "groups": [
            [{ "val": "gcd(34, 21)" }],
            [{ "val": "gcd(21, 34)" }],
            [{ "val": "gcd(13, 21)" }],
            [{ "val": "gcd(8, 13)" }],
            [{ "val": "gcd(5, 8)" }],
            [{ "val": "gcd(3, 5)" }],
            [{ "val": "gcd(2, 3)" }],
            [{ "val": "gcd(1, 2)" }],
            [{ "val": "gcd(0, 1)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Pasul 10: Baza recursivității - a = 0. Întoarcem CMMDC = b = 1 și setăm coeficienții x1 = 0, y1 = 1.",
      "blocksVisual": [
        {
          "label": "Bază Atingasă (gcd=1)",
          "groups": [
            [{ "val": "x1 = 0" }, { "val": "y1 = 1" }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 11: Revenim la apelul gcdExtended(1, 2). Avem x1 = 0, y1 = 1. Noul x = y1 - (b / a) * x1 = 1 - (2 / 1) * 0 = 1. Noul y = x1 = 0.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(1, 2)",
          "groups": [
            [{ "val": "x = 1" }, { "val": "y = 0", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 12: Revenim la apelul gcdExtended(2, 3). Avem x1 = 1, y1 = 0. Noul x = 0 - (3 / 2) * 1 = -1. Noul y = 1.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(2, 3)",
          "groups": [
            [{ "val": "x = -1" }, { "val": "y = 1", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 13: Revenim la apelul gcdExtended(3, 5). Avem x1 = -1, y1 = 1. Noul x = 1 - (5 / 3) * (-1) = 2. Noul y = -1.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(3, 5)",
          "groups": [
            [{ "val": "x = 2" }, { "val": "y = -1", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 14: Revenim la apelul gcdExtended(5, 8). Avem x1 = 2, y1 = -1. Noul x = -1 - (8 / 5) * 2 = -3. Noul y = 2.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(5, 8)",
          "groups": [
            [{ "val": "x = -3" }, { "val": "y = 2", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 15: Revenim la apelul gcdExtended(8, 13). Avem x1 = -3, y1 = 2. Noul x = 2 - (13 / 8) * (-3) = 5. Noul y = -3.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(8, 13)",
          "groups": [
            [{ "val": "x = 5" }, { "val": "y = -3", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 16: Revenim la apelul gcdExtended(13, 21). Avem x1 = 5, y1 = -3. Noul x = -3 - (21 / 13) * 5 = -8. Noul y = 5.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(13, 21)",
          "groups": [
            [{ "val": "x = -8" }, { "val": "y = 5", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 17: Revenim la apelul gcdExtended(21, 34). Avem x1 = -8, y1 = 5. Noul x = 5 - (34 / 21) * (-8) = 13. Noul y = -8.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(21, 34)",
          "groups": [
            [{ "val": "x = 13" }, { "val": "y = -8", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pasul 18: Revenim la apelul de vârf gcdExtended(34, 21). Avem x1 = 13, y1 = -8. Noul x = -8 - (21 / 34) * 13 = -8. Noul y = 13.",
      "blocksVisual": [
        {
          "label": "Revenire gcd(34, 21)",
          "groups": [
            [{ "val": "x = -8" }, { "val": "y = 13", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Pasul 19: Funcția se termină și obținem g = 1 (CMMDC). Afișăm în consolă: CMMDC(34, 21) = 1.",
      "blocksVisual": [
        {
          "label": "Consolă (g)",
          "groups": [
            [{ "val": "g = 1", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Pasul 20: Afișăm valorile coeficienților Bezout: X = -8, Y = 13.",
      "blocksVisual": [
        {
          "label": "Consolă (X, Y)",
          "groups": [
            [{ "val": "X = -8" }, { "val": "Y = 13", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Pasul 21: Realizăm verificarea relației: 34 * (-8) + 21 * 13 = -272 + 273 = 1. Relația este validă!",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [{ "val": "34*(-8) + 21*(13) = 1", "sorted": true }]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Euclid Extins",
        "url": "https://www.infoarena.ro/problema/euclid3",
        "desc": "Problemă standard a * x + b * y = gcd(a,b)"
      }
    ],
    "medium": [
      {
        "title": "Invers Modular",
        "url": "https://www.infoarena.ro/problema/inversmodular",
        "desc": "A * x = 1 (mod B)"
      },
      {
        "title": "Climbing Stairs (O(log N))",
        "url": "https://leetcode.com/problems/climbing-stairs/",
        "desc": "Fibonacci pe Matrice"
      }
    ],
    "hard": [
      {
        "title": "FFT",
        "url": "https://www.infoarena.ro/problema/fft",
        "desc": "Inmulțire polinoame"
      },
      {
        "title": "K-th Fibonacci",
        "url": "https://www.infoarena.ro/problema/kfib",
        "desc": "Fibonacci uriaș cu matrici"
      }
    ]
  },
    "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      const gcdFrames = [
        [34, 21], [21, 34], [13, 21], [8, 13], [5, 8], [3, 5], [2, 3], [1, 2], [0, 1]
      ];
      globalVars.push({ name: 'a', type: 'long long', val: '34', expandable: false });
      globalVars.push({ name: 'b', type: 'long long', val: '21', expandable: false });
      
      if (stepIndex === 0) {
        frames.push({ name: 'main()', file: 'main.cpp', line: activeLine });
      } else {
        const depth = Math.min(stepIndex, 8);
        for (let d = 0; d <= depth; d++) {
          const f = gcdFrames[d];
          frames.push({ name: `gcdExtended(${f[0]}, ${f[1]})`, file: 'main.cpp', line: d === depth ? activeLine : 16 });
        }
        frames.push({ name: 'main()', file: 'main.cpp', line: 28 });
      }
      frames.reverse();
      
      if (stepIndex >= 10) {
        const xVals = [null, 1, -1, 2, -3, 5, -8, 13, -8];
        const yVals = [null, 0, 1, -1, 2, -3, 5, -8, 13];
        const idx = Math.min(stepIndex - 10, 8);
        if (idx >= 0) {
          vars.push({ name: 'x', type: 'long long', val: xVals[idx] ?? 0, expandable: false });
          vars.push({ name: 'y', type: 'long long', val: yVals[idx] ?? 1, expandable: false });
        }
      }
      const depth = Math.min(stepIndex, 8);
      inlineVal = depth > 0 ? `depth: ${depth}` : null;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const gcdFrames = [
        [34, 21], [21, 34], [13, 21], [8, 13], [5, 8], [3, 5], [2, 3], [1, 2], [0, 1]
      ];
      const depth = Math.min(stepIndex, 8);
      if (lineNum === 9 && stepIndex <= 8) {
        const f = gcdFrames[depth];
        return `a: ${f[0]}, b: ${f[1]}`;
      }
      if (lineNum === 26 && stepIndex === 0) return 'a: 34, b: 21';
      if (stepIndex >= 10) {
        const xVals = [null, 1, -1, 2, -3, 5, -8, 13, -8];
        const yVals = [null, 0, 1, -1, 2, -3, 5, -8, 13];
        const idx = Math.min(stepIndex - 10, 8);
        if (idx >= 0) {
          if (lineNum === 19 || lineNum === 20) return `x: ${xVals[idx]}, y: ${yVals[idx]}`;
        }
      }
      return null;
    }
  }};
