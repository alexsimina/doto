export const data = {
  "presentation": `### Prezentare Generală

Funcția Mobius, notată cu $\\mu(n)$, este o funcție multiplicativă fundamentală în teoria numerelor și combinatorică, utilizată în special în problemele ce implică divizibilitate și cel mai mare divizor comun. Ea este definită pentru orice număr întreg pozitiv $n$ astfel:

- $\\mu(n) = 1$ dacă $n$ este un întreg liber de pătrate (square-free) și are un număr par de factori primi distincți.
- $\\mu(n) = -1$ dacă $n$ este un întreg liber de pătrate și are un număr impar de factori primi distincți.
- $\\mu(n) = 0$ dacă $n$ nu este liber de pătrate (adică se divide cu $p^2$ pentru un număr prim $p$).

Prin convenție, $\\mu(1) = 1$. 

Cea mai importantă proprietate a sa este **Formula de Inversiune Mobius**, care permite exprimarea unei relații între două funcții aritmetice. De asemenea, suma funcției Mobius peste toți divizorii unui număr $n > 1$ este întotdeauna $0$:
$$ \\sum_{d | n} \\mu(d) = \\begin{cases} 1 & \\text{dacă } n = 1 \\ 0 & \\text{dacă } n > 1 \\end{cases} $$

Putem calcula valorile funcției $\\mu$ pentru toate numerele până la $N$ într-o complexitate liniară de $O(N)$ folosind o adaptare a **Ciurului Liniar** (Eratostene optimizat).`,
  "complexity": `### Complexitate

Pentru precalcularea valorilor de la $1$ la $N$:
- **Timp:** $O(N)$ — ciurul liniar garantează că fiecare număr este vizitat și procesat o singură dată (prin cel mai mic factor prim al său).
- **Spațiu:** $O(N)$ — necesar pentru a stoca valorile funcției $\\mu$ și starea numerelor prime în memorie.`,
  "variations": `### Variații și Edge Cases

1. **Calcul individual:** Dacă avem nevoie de $\\mu(n)$ doar pentru o singură valoare mare, putem descompune $n$ în factori primi în $O(\\sqrt{n})$. Dacă un factor prim apare la o putere $\\ge 2$, returnăm direct $0$. Altminteri, returnăm $(-1)^k$, unde $k$ este numărul de factori primi distincți.
2. **Mertens Function:** Suma parțială a funcției Mobius, $M(N) = \\sum_{i=1}^{N} \\mu(i)$, utilizată în studiul distribuției numerelor prime și strâns legată de Ipoteza lui Riemann.`,
  "applications": `### Aplicații

- **Calculul numărului de perechi coprime:** Determinarea numărului de perechi $(i, j)$ cu $1 \\le i, j \\le N$ și $\\gcd(i, j) = 1$, folosind relația $\\sum_{d | \\gcd(i, j)} \\mu(d)$.
- **Inversiune:** Rezolvarea problemelor unde trebuie să calculăm sume complexe peste cel mai mare divizor comun (ex: $\\sum \\gcd(i, j)$).`,
  "code": `
#include <iostream>
#include <vector>

using namespace std;

vector<int> computeMobius(int n) {
    vector<int> mu(n + 1, 0);
    vector<bool> isPrime(n + 1, true);
    vector<int> primes;
    
    mu[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (isPrime[i]) {
            primes.push_back(i);
            mu[i] = -1;
        }
        for (int p : primes) {
            if (i * p > n) break;
            isPrime[i * p] = false;
            if (i % p == 0) {
                mu[i * p] = 0;
                break;
            } else {
                mu[i * p] = -mu[i];
            }
        }
    }
    return mu;
}

int main() {
    int limit = 10;
    vector<int> mu = computeMobius(limit);
    cout << "mu(1..10): ";
    for (int i = 1; i <= limit; ++i) {
        cout << mu[i] << " ";
    }
    cout << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 34,
      "text": "Apelăm funcția `computeMobius(10)` pentru a precalcula valorile funcției Mobius de la $1$ la $10$.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              { "val": "n = 10", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm vectorul `mu` cu dimensiunea $11$, completat cu valori implicite de $0$.",
      "blocksVisual": [
        {
          "label": "mu",
          "groups": [
            [
              { "val": "0" }, { "val": "0" }, { "val": "0" }, { "val": "0" }, { "val": "0" },
              { "val": "0" }, { "val": "0" }, { "val": "0" }, { "val": "0" }, { "val": "0" }, { "val": "0" }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Inițializăm vectorul `isPrime` cu `true` pentru a marca toate numerele ca fiind potențial prime.",
      "blocksVisual": [
        {
          "label": "isPrime",
          "groups": [
            [
              { "val": "T" }, { "val": "T" }, { "val": "T" }, { "val": "T" }, { "val": "T" },
              { "val": "T" }, { "val": "T" }, { "val": "T" }, { "val": "T" }, { "val": "T" }, { "val": "T" }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Declarăm vectorul `primes` care va stoca numerele prime pe măsură ce le descoperim.",
      "blocksVisual": [
        {
          "label": "Primes",
          "groups": [
            [
              { "val": "vid" }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Setăm $\\mu(1) = 1$ prin definiție (1 nu are factori primi, deci $(-1)^0 = 1$).",
      "blocksVisual": [
        {
          "label": "mu[1]",
          "groups": [
            [
              { "val": "mu[1] = 1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Începem bucla de la $i = 2$ până la $n$. Vizităm fiecare număr pentru a-i determina factorii primi.",
      "blocksVisual": [
        {
          "label": "Index",
          "groups": [
            [
              { "val": "i = 2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Deoarece `isPrime[2]` este adevărat, $2$ este un număr prim. Intrăm în ramura de procesare prim.",
      "blocksVisual": [
        {
          "label": "Verificare prim",
          "groups": [
            [
              { "val": "isPrime[2] = T", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Adăugăm $2$ la vectorul `primes`.",
      "blocksVisual": [
        {
          "label": "Vector primes",
          "groups": [
            [
              { "val": "2", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Un număr prim are exact un factor prim, deci $\\mu(2) = (-1)^1 = -1$.",
      "blocksVisual": [
        {
          "label": "mu[2]",
          "groups": [
            [
              { "val": "mu[2] = -1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Parcurgem numerele prime găsite până acum pentru a marca multiplii lui $i$ ca fiind compuși.",
      "blocksVisual": [
        {
          "label": "Generare multipli",
          "groups": [
            [
              { "val": "i = 2", "active": true },
              { "val": "p = 2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Marcăm $i \\times p = 4$ ca fiind compus: `isPrime[4] = false`.",
      "blocksVisual": [
        {
          "label": "Marcare compus",
          "groups": [
            [
              { "val": "isPrime[4] = F", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Verificăm divizibilitatea: `2 % 2 == 0` este adevărat. Asta înseamnă că multiplul $4$ conține factorul $p=2$ la pătrat ($2^2$).",
      "blocksVisual": [
        {
          "label": "Divizibilitate p",
          "groups": [
            [
              { "val": "i % p == 0 (DA)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Deoarece $4$ se divide cu un pătrat perfect, setăm $\\mu(4) = 0$ și apelăm `break` pentru a opri multiplicarea.",
      "blocksVisual": [
        {
          "label": "mu[4] si break",
          "groups": [
            [
              { "val": "mu[4] = 0", "sorted": true },
              { "val": "break", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Continuăm bucla. La $i = 3$, $3$ este prim $\\implies \\mu(3) = -1$. La $i = 3, p = 2$, marcăm $6$ ca fiind compus. Deoarece $3 \\pmod 2 \\neq 0$, setăm $\\mu(6) = -\\mu(3) = 1$ (are 2 factori primi distincți).",
      "blocksVisual": [
        {
          "label": "Stare i = 3",
          "groups": [
            [
              { "val": "mu[3] = -1" },
              { "val": "mu[6] = 1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "După ce completăm vectorul până la valoarea $limit = 10$, returnăm rezultatul precalculat.",
      "blocksVisual": [
        {
          "label": "Returnare",
          "groups": [
            [
              { "val": "mu vector completat", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Afișăm valorile calculate: `mu` pentru 1..10 sunt `1, -1, -1, 0, -1, 1, -1, 0, 0, 1`.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              { "val": "Output tipărit", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Mobius Function Calculator",
        "url": "https://www.geeksforgeeks.org/program-to-calculate-mobius-function/",
        "desc": "Calculează valoarea funcției Mobius pentru un număr dat N prin descompunere în factori primi."
      }
    ],
    "medium": [
      {
        "title": "SQFREE - Square-free integers",
        "url": "https://www.spoj.com/problems/SQFREE/",
        "desc": "Calculează numărul de numere libere de pătrate mai mici sau egale cu N folosind funcția Mobius."
      }
    ],
    "hard": [
      {
        "title": "LCM Sum",
        "url": "https://www.spoj.com/problems/LCMSUM/",
        "desc": "Calculează suma LCM(i, N) pentru toți i de la 1 la N folosind funcția Mobius sau indicatorul lui Euler."
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
        { f: [{ name: 'main()', file: 'main.cpp', line: 62 }], v: [] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 8 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,0,0,0,0,0,0,0,0,0,0]' }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 9 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,0,0,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 10 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,0,0,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[]' }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 12 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,0,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[]' }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 13 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,0,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[]' }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 14 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,0,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[]' }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 15 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,0,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2]' }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2]' }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 18 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,1,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2]' }, { name: 'i', type: 'int', val: 2 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 20 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,0,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2]' }, { name: 'i', type: 'int', val: 2 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 21 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,0,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2]' }, { name: 'i', type: 'int', val: 2 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 22 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,0,0,0,0,0,0,0,0]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,0,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2]' }, { name: 'i', type: 'int', val: 2 }, { name: 'p', type: 'int', val: 2 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 13 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,-1,0,-1,1,-1,0,0,1]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,0,1,1,1,1,1,1,1]' }, { name: 'primes', type: 'vector<int>', val: '[2,3]' }, { name: 'i', type: 'int', val: 3 }] },
        { f: [{ name: 'computeMobius(10)', file: 'main.cpp', line: 29 }, { name: 'main()', file: 'main.cpp', line: 62 }], v: [{ name: 'n', type: 'int', val: 10 }, { name: 'mu', type: 'vector<int>', val: '[0,1,-1,-1,0,-1,1,-1,0,0,1]' }, { name: 'isPrime', type: 'vector<bool>', val: '[1,1,1,0,0,1,0,1,0,0,0]' }, { name: 'primes', type: 'vector<int>', val: '[2,3,5,7]' }] },
        { f: [{ name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'mu', type: 'vector<int>', val: '[0,1,-1,-1,0,-1,1,-1,0,0,1]' }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0 && stepIndex < 15) {
        inlineVal = "i: " + (vars.find(v => v.name === 'i')?.val || 'N/A') + ", primes.size(): " + (vars.find(v => v.name === 'primes')?.val ? eval(vars.find(v => v.name === 'primes').val).length : 0);
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const varsAtStep = [
        { i: 2, primes: '[]', mu: '[0,0,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[]', mu: '[0,0,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[]', mu: '[0,0,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[]', mu: '[0,0,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[]', mu: '[0,1,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[]', mu: '[0,1,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[]', mu: '[0,1,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[2]', mu: '[0,1,0,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[2]', mu: '[0,1,-1,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[2]', mu: '[0,1,-1,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[2]', mu: '[0,1,-1,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[2]', mu: '[0,1,-1,0,0,0,0,0,0,0,0]' },
        { i: 2, primes: '[2]', mu: '[0,1,-1,0,0,0,0,0,0,0,0]' },
        { i: 3, primes: '[2,3]', mu: '[0,1,-1,-1,0,-1,1,-1,0,0,1]' },
        { i: 10, primes: '[2,3,5,7]', mu: '[0,1,-1,-1,0,-1,1,-1,0,0,1]' },
        { i: 10, primes: '[2,3,5,7]', mu: '[0,1,-1,-1,0,-1,1,-1,0,0,1]' }
      ];
      const s = varsAtStep[stepIndex] || varsAtStep[varsAtStep.length - 1];
      if (lineNum === 8) return "mu size: 11";
      if (lineNum === 10) return "primes size: " + eval(s.primes).length;
      if (lineNum === 12) return "mu[1]: 1";
      if (lineNum === 13) return "i: " + s.i;
      if (lineNum === 15) return "primes added: " + eval(s.primes).join(', ');
      if (lineNum === 20) return "marked composite: " + (s.i * 2);
      if (lineNum === 29) return "mu precomputed";
      if (lineNum === 36) return "limit: 10";
      return null;
    }
  }
};
