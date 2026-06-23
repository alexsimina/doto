export const data = {
  "presentation": `### Prezentare Generală

Indicatorul lui Euler (sau funcția totient, notată cu $\\phi(n)$) este o funcție aritmetică extrem de importantă în teoria numerelor. Ea determină numărul de numere întregi pozitive mai mici sau egale cu $n$ care sunt prime cu $n$ (adică cel mai mare divizor comun al lor este $1$).

Formula matematică bazată pe descompunerea în factori primi a lui $n$ este:
$$ \\phi(n) = n \\prod_{p | n} \\left(1 - \\frac{1}{p}\\right) $$
unde produsul se face peste toate numerele prime distincte $p$ care îl divid pe $n$.

Pentru a calcula $\\phi(n)$ eficient pentru un singur număr, putem extrage factorii săi primi în $O(\\sqrt{n})$, similar cu descompunerea standard. De fiecare dată când găsim un factor prim $p$, actualizăm rezultatul scăzând din el $\\frac{\\text{result}}{p}$.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\sqrt{n})$ — căutăm divizorii primi până la $\\sqrt{n}$. Dacă numărul este prim, algoritmul face exact $\\sqrt{n}$ pași.
- **Spațiu:** $O(1)$ — calculul se face folosind doar câteva variabile pentru descompunere.`,
  "variations": `### Variații și Edge Cases

1. **Indicatorul lui Euler pentru un interval (Ciurul Totient):** Când trebuie să calculăm $\\phi(i)$ pentru toate numerele dintr-un interval $[1, N]$, putem folosi o variantă a **Ciurului lui Eratostene**. Complexitatea totală devine $O(N \\log \\log N)$.
2. **Proprietatea multiplicativă:** Dacă $a$ și $b$ sunt prime între ele, atunci $\\phi(a \\cdot b) = \\phi(a) \\cdot \\phi(b)$.
3. **Micul Teoremă a lui Fermat generalizată (Teorema lui Euler):** Pentru orice $a$ prim cu $n$, avem $a^{\\phi(n)} \\equiv 1 \\pmod{n}$.`,
  "applications": `### Aplicații

- **Criptografia RSA:** Generarea cheilor publice și private se bazează pe calculul $\\phi(p \\cdot q) = (p-1)(q-1)$ pentru două numere prime mari.
- **Calculul inversului modular:** Dacă $a$ și $M$ sunt prime între ele, atunci inversul modular al lui $a \\pmod{M}$ este $a^{\\phi(M)-1} \\pmod{M}$.`,
  "code": `
#include <iostream>

using namespace std;

int eulerPhi(int n) {
    int result = n;
    for (int p = 2; p * p <= n; ++p) {
        if (n % p == 0) {
            while (n % p == 0) {
                n /= p;
            }
            result -= result / p;
        }
    }
    if (n > 1) {
        result -= result / n;
    }
    return result;
}

int main() {
    int ans = eulerPhi(12);
    cout << "phi(12) = " << ans << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 23,
      "text": "Apelăm funcția `eulerPhi(12)` pentru a calcula valoarea indicatorului $\\phi(12)$.",
      "blocksVisual": [
        {
          "label": "Input",
          "groups": [
            [
              { "val": "n = 12", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Inițializăm `result` cu valoarea lui $n$ ($12$). Pe măsură ce găsim factori primi distincti, vom reduce valoarea lui `result`.",
      "blocksVisual": [
        {
          "label": "Stare",
          "groups": [
            [
              { "val": "n = 12" },
              { "val": "result = 12", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Pornim bucla `for` pentru a căuta factori primi începând cu $p = 2$. Condiția `p * p <= n` ($4 \\le 12$) este îndeplinită.",
      "blocksVisual": [
        {
          "label": "Căutare factori",
          "groups": [
            [
              { "val": "p = 2", "active": true },
              { "val": "p*p = 4 <= 12?" }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă $p = 2$ divide pe $n = 12$. Cum $12 \\pmod 2 == 0$, am găsit un factor prim distinct.",
      "blocksVisual": [
        {
          "label": "Divizibilitate",
          "groups": [
            [
              { "val": "12 % 2 == 0 (DA)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Intrăm în bucla `while` pentru a elimina complet factorul prim $2$ din valoarea lui $n$.",
      "blocksVisual": [
        {
          "label": "Buclă eliminare",
          "groups": [
            [
              { "val": "n = 12" }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Împărțim repetat pe $n$ la $2$: $n = 12 / 2 = 6$, apoi $6 / 2 = 3$. Bucla se termină când $3 \\pmod 2 \\neq 0$.",
      "blocksVisual": [
        {
          "label": "Actualizare n",
          "groups": [
            [
              { "val": "n = 3", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Actualizăm `result` conform formulei pentru factorul prim $2$: `result = result - result / 2` $\\implies 12 - 6 = 6$.",
      "blocksVisual": [
        {
          "label": "Actualizare result",
          "groups": [
            [
              { "val": "result = 6", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Incrementăm $p$ la $3$. Verificăm condiția buclei: $p \\times p = 9$. Cum $9 > n$ ($9 > 3$, unde $3$ este valoarea curentă a lui $n$), bucla se oprește.",
      "blocksVisual": [
        {
          "label": "Căutare factori",
          "groups": [
            [
              { "val": "p = 3" },
              { "val": "p*p = 9 <= 3? (NU)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Ieșim din buclă și verificăm dacă valoarea rămasă pentru $n$ este $> 1$. În cazul nostru, $n = 3$, deci condiția este adevărată.",
      "blocksVisual": [
        {
          "label": "Verificare rest",
          "groups": [
            [
              { "val": "n = 3 > 1? (DA)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Deoarece $n = 3$ este ultimul factor prim distinct, actualizăm indicatorul: `result = result - result / 3` $\\implies 6 - 2 = 4$.",
      "blocksVisual": [
        {
          "label": "Actualizare finală",
          "groups": [
            [
              { "val": "result = 4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Returnăm valoarea indicatorului `result`, care este $4$.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              { "val": "4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Afișăm rezultatul $\\phi(12) = 4$. Într-adevăr, există $4$ numere mai mici decât 12 și prime cu el: $\\{1, 5, 7, 11\\}$.",
      "blocksVisual": [
        {
          "label": "Output",
          "groups": [
            [
              { "val": "phi(12) = 4", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Euler Totient Function",
        "url": "https://www.geeksforgeeks.org/eulers-totient-function/",
        "desc": "Implementează calcularea valorii ETF pentru un număr dat."
      }
    ],
    "medium": [
      {
        "title": "ETF - Euler Totient Function",
        "url": "https://www.spoj.com/problems/ETF/",
        "desc": "Calculează indicatorul lui Euler pentru multiple query-uri în timp util."
      }
    ],
    "hard": [
      {
        "title": "GCDEX - GCD Extreme",
        "url": "https://www.spoj.com/problems/GCDEX/",
        "desc": "Calculează suma GCD pentru toate perechile ordonate, optimizând utilizând ETF pe intervale."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const states = [
        { f: [{ name: 'main()', file: 'main.cpp', line: 23 }], v: [] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 7 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 12 }, { name: 'result', type: 'int', val: 12 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 8 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 12 }, { name: 'result', type: 'int', val: 12 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 9 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 12 }, { name: 'result', type: 'int', val: 12 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 10 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 12 }, { name: 'result', type: 'int', val: 12 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 11 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 3 }, { name: 'result', type: 'int', val: 12 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 13 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 3 }, { name: 'result', type: 'int', val: 6 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 8 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 3 }, { name: 'result', type: 'int', val: 6 }, { name: 'p', type: 'int', val: 3 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 3 }, { name: 'result', type: 'int', val: 6 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 17 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 3 }, { name: 'result', type: 'int', val: 4 }] },
        { f: [{ name: 'eulerPhi(12)', file: 'main.cpp', line: 19 }, { name: 'main()', file: 'main.cpp', line: 23 }], v: [{ name: 'n', type: 'int', val: 3 }, { name: 'result', type: 'int', val: 4 }] },
        { f: [{ name: 'main()', file: 'main.cpp', line: 24 }], v: [{ name: 'ans', type: 'int', val: 4 }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0 && stepIndex < 11) {
        inlineVal = `n: ${vars.find(v => v.name === 'n')?.val}, result: ${vars.find(v => v.name === 'result')?.val}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex === 0 && lineNum === 23) return 'n: 12';
      if (stepIndex === 1 && lineNum === 7) return 'result: 12';
      if (stepIndex === 2 && lineNum === 8) return 'p: 2, p*p <= n: true';
      if (stepIndex === 3 && lineNum === 9) return 'n%p: 0';
      if (stepIndex === 4 && lineNum === 10) return 'n%p: 0';
      if (stepIndex === 5 && lineNum === 11) return 'n: 3';
      if (stepIndex === 6 && lineNum === 13) return 'result: 6';
      if (stepIndex === 7 && lineNum === 8) return 'p: 3, p*p <= n: false';
      if (stepIndex === 8 && lineNum === 16) return 'n > 1: true';
      if (stepIndex === 9 && lineNum === 17) return 'result: 4';
      if (stepIndex === 10 && lineNum === 19) return 'result: 4';
      if (stepIndex === 11 && lineNum === 24) return 'ans: 4';
      return null;
    }
  }
};
