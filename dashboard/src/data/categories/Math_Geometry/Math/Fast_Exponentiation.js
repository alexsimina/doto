export const data = {
  "presentation": `### Prezentare Generală

Exponentierea rapidă (sau exponentierea binară) este un algoritm eficient pentru calculul puterii unui număr, $a^b$, sau al restului împărțirii acesteia la un modul $M$, adică $a^b \\pmod{M}$.

În loc de a efectua $b$ înmulțiri succesive cu o complexitate de $O(b)$, algoritmul folosește descompunerea binară a exponentului pentru a reduce numărul de operații la $O(\\log b)$. La fiecare pas, dacă exponentul curent este impar, înmulțim rezultatul cu baza curentă. Apoi, ridicăm baza la pătrat și înjumătățim exponentul.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\log b)$ — la fiecare pas exponentul $b$ se împarte la 2, reducând drastic numărul de înmulțiri.
- **Spațiu:** $O(1)$ — algoritmul rulează iterativ folosind doar câteva variabile auxiliare.`,
  "variations": `### Variații și Edge Cases

1. **Exponent $b = 0$:** Orice număr la puterea 0 este 1. Algoritmul returnează corect 1 deoarece bucla \`while\` nu se execută.
2. **Modulo $M = 1$:** În acest caz, orice număr modular este 0. Este important ca preprocesarea sau rezultatul să țină cont de acest caz particular (returnează 0).
3. **Overflow:** Înmulțirea \`result * base\` poate depăși tipul standard de date (ex. \`int\` pe 32 de biți). Se recomandă folosirea tipului \`long long\` în C++.`,
  "applications": `### Aplicații

- Calculul rapid al puterilor mari în aritmetica modulară (criptografie, de exemplu RSA).
- Calcularea inversului modular folosind Micul Teoremă a lui Fermat ($a^{M-2} \\pmod{M}$ pentru $M$ prim).
- Ridicarea la putere a matricelor în timp logaritmic pentru determinarea termenilor șirurilor recurente (ex: Fibonacci).`,
  "code": `
#include <iostream>

using namespace std;

long long fastExponentiation(long long base, long long exp, long long mod) {
    long long result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2;
    }
    return result;
}

int main() {
    long long ans = fastExponentiation(3, 13, 10);
    cout << "3^13 % 10 = " << ans << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 20,
      "text": "Apelăm funcția `fastExponentiation` cu baza $3$, exponentul $13$ și modulul $10$, calculând $3^{13} \\pmod{10}$.",
      "blocksVisual": [
        {
          "label": "Parametri apel",
          "groups": [
            [
              { "val": "base = 3", "active": true },
              { "val": "exp = 13", "active": true },
              { "val": "mod = 10", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Inițializăm `result` cu $1$. Această variabilă va acumula factorii de înmulțire când exponentul este impar.",
      "blocksVisual": [
        {
          "label": "Stare",
          "groups": [
            [
              { "val": "result = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Aplicăm operația modulo pe baza inițială pentru a preveni depășirea limitelor: `base = 3 % 10 = 3`.",
      "blocksVisual": [
        {
          "label": "Stare",
          "groups": [
            [
              { "val": "base = 3", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Prima iterație a buclei `while`. Exponentul curent `exp = 13` este mai mare decât $0$, deci continuăm.",
      "blocksVisual": [
        {
          "label": "Condiție buclă",
          "groups": [
            [
              { "val": "exp = 13 > 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Deoarece `13` este impar, înmulțim rezultatul cu baza curentă și aplicăm modulo: `result = (1 * 3) % 10 = 3`.",
      "blocksVisual": [
        {
          "label": "Actualizare result",
          "groups": [
            [
              { "val": "result = 3", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Ridicăm baza la pătrat pentru următorul bit al exponentului: `base = (3 * 3) % 10 = 9`.",
      "blocksVisual": [
        {
          "label": "Actualizare bază",
          "groups": [
            [
              { "val": "base = 9", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Înjumătățim exponentul prin împărțire întreagă: `exp = 13 / 2 = 6`.",
      "blocksVisual": [
        {
          "label": "Actualizare exponent",
          "groups": [
            [
              { "val": "exp = 6", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "A doua iterație. `exp = 6 > 0`. Fiind par (`6 % 2 == 0`), nu actualizăm `result`. Ridicăm baza la pătrat: `base = (9 * 9) % 10 = 1`.",
      "blocksVisual": [
        {
          "label": "Stare iterația 2",
          "groups": [
            [
              { "val": "exp = 6" },
              { "val": "base = 1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Înjumătățim exponentul: `exp = 6 / 2 = 3`.",
      "blocksVisual": [
        {
          "label": "Actualizare exponent",
          "groups": [
            [
              { "val": "exp = 3", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "A treia iterație. `exp = 3 > 0` este impar, deci înmulțim rezultatul cu baza: `result = (3 * 1) % 10 = 3`.",
      "blocksVisual": [
        {
          "label": "Stare iterația 3",
          "groups": [
            [
              { "val": "result = 3", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Ridicăm baza la pătrat: `base = (1 * 1) % 10 = 1`.",
      "blocksVisual": [
        {
          "label": "Actualizare bază",
          "groups": [
            [
              { "val": "base = 1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Înjumătățim exponentul: `exp = 3 / 2 = 1`.",
      "blocksVisual": [
        {
          "label": "Actualizare exponent",
          "groups": [
            [
              { "val": "exp = 1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "A patra iterație. `exp = 1 > 0` este impar, deci înmulțim: `result = (3 * 1) % 10 = 3`.",
      "blocksVisual": [
        {
          "label": "Stare iterația 4",
          "groups": [
            [
              { "val": "result = 3", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Înjumătățim exponentul final: `exp = 1 / 2 = 0`. Bucla `while` se va încheia deoarece condiția `exp > 0` devine falsă.",
      "blocksVisual": [
        {
          "label": "Actualizare exponent",
          "groups": [
            [
              { "val": "exp = 0", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Returnăm valoarea finală a variabilei `result`, adică $3$. Într-adevăr, $3^{13} = 1594323$, iar ultimul său cifră este $3$.",
      "blocksVisual": [
        {
          "label": "Rezultat final",
          "groups": [
            [
              { "val": "Ans = 3", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Pow(x, n)",
        "url": "https://leetcode.com/problems/powx-n/",
        "desc": "Calculează x la puterea n, având grijă la valori negative ale exponentului."
      }
    ],
    "medium": [
      {
        "title": "Super Pow",
        "url": "https://leetcode.com/problems/super-pow/",
        "desc": "Calculează a^b modulo 1337, unde b este dat ca un tablou de cifre (număr foarte mare)."
      }
    ],
    "hard": [
      {
        "title": "Count Good Numbers",
        "url": "https://leetcode.com/problems/count-good-numbers/",
        "desc": "Folosește exponentierea rapidă modulo 10^9 + 7 pentru a număra șirurile de cifre bune."
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
        { f: [{ name: 'main()', file: 'main.cpp', line: 20 }], v: [] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 7 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 3 }, { name: 'exp', type: 'long long', val: 13 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 1 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 8 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 3 }, { name: 'exp', type: 'long long', val: 13 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 1 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 9 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 3 }, { name: 'exp', type: 'long long', val: 13 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 1 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 11 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 3 }, { name: 'exp', type: 'long long', val: 13 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 13 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 9 }, { name: 'exp', type: 'long long', val: 13 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 14 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 9 }, { name: 'exp', type: 'long long', val: 6 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 9 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 6 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 14 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 3 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 9 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 3 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 13 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 3 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 14 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 9 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 14 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 0 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] },
        { f: [{ name: 'fastExponentiation(3, 13, 10)', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 20 }], v: [{ name: 'base', type: 'long long', val: 1 }, { name: 'exp', type: 'long long', val: 0 }, { name: 'mod', type: 'long long', val: 10 }, { name: 'result', type: 'long long', val: 3 }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0 && stepIndex < 15) {
        inlineVal = `base: ${vars.find(v => v.name === 'base')?.val}, exp: ${vars.find(v => v.name === 'exp')?.val}, result: ${vars.find(v => v.name === 'result')?.val}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        { base: 3, exp: 13, result: 1 }, // 0
        { base: 3, exp: 13, result: 1 }, // 1
        { base: 3, exp: 13, result: 1 }, // 2
        { base: 3, exp: 13, result: 1 }, // 3
        { base: 3, exp: 13, result: 3 }, // 4
        { base: 9, exp: 13, result: 3 }, // 5
        { base: 9, exp: 6, result: 3 }, // 6
        { base: 1, exp: 6, result: 3 }, // 7
        { base: 1, exp: 3, result: 3 }, // 8
        { base: 1, exp: 3, result: 3 }, // 9
        { base: 1, exp: 3, result: 3 }, // 10
        { base: 1, exp: 1, result: 3 }, // 11
        { base: 1, exp: 1, result: 3 }, // 12
        { base: 1, exp: 0, result: 3 }, // 13
        { base: 1, exp: 0, result: 3 }  // 14
      ];
      const s = states[stepIndex] || states[states.length - 1];
      if (lineNum === 7) return `result: ${s.result}`;
      if (lineNum === 8) return `base: ${s.base}`;
      if (lineNum === 9) return `exp: ${s.exp}`;
      if (lineNum === 11) return `result: ${s.result}`;
      if (lineNum === 13) return `base: ${s.base}`;
      if (lineNum === 14) return `exp: ${s.exp}`;
      if (lineNum === 16) return `result: ${s.result}`;
      if (lineNum === 20) return `ans: 3`;
      return null;
    }
  }
};
