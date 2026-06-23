export const data = {
  "presentation": `### Prezentare Generală

În C++ sau alte limbaje de programare, tipurile de date întregi standard (cum ar fi \`int\` sau \`long long\`) au limite stricte de stocare (de exemplu, maximum $\\approx 9 \\times 10^{18}$ pentru \`long long\` pe 64 de biți). Când lucrăm cu numere mult mai mari (de ordinul sutelor sau miilor de cifre), avem nevoie de o reprezentare specială, numită **numere mari** (Big Integers).

Cea mai simplă metodă este stocarea cifrelor numărului într-un \`std::string\` sau un \`std::vector<int>\`, de obicei în ordine inversă (de la unități la cifrele cele mai semnificative), pentru a facilita operația de adunare, scădere sau înmulțire prin metodele clasice învățate la școală (digit-by-digit).`,
  "complexity": `### Complexitate

Pentru adunarea a două numere mari cu $N$, respectiv $M$ cifre:
- **Timp:** $O(\\max(N, M))$ — parcurgem numerele cifră cu cifră de la dreapta la stânga o singură dată.
- **Spațiu:** $O(\\max(N, M))$ — spațiul necesar pentru stocarea sumei rezultate.`,
  "variations": `### Variații și Edge Cases

1. **Numere de lungimi diferite:** Când unul dintre numere se termină înaintea celuilalt, cifrele sale lipsă sunt considerate ca fiind $0$.
2. **Transport final (Carry):** Dacă după adunarea celor mai semnificative cifre rămâne un transport (ex: $99 + 1 = 100$), acesta trebuie adăugat ca o nouă cifră la final.
3. **Scăderea și Semnul:** Necesită gestionarea împrumuturilor și stabilirea semnului rezultatului.
4. **Înmulțirea:** Complexitatea devine $O(N \\times M)$ prin algoritmul clasic sau $O(N \\log N)$ folosind Transformata Fourier Rapidă (FFT) pentru numere extrem de mari.`,
  "applications": `### Aplicații

- Criptografie (algoritmi precum RSA, care folosesc chei de 2048 de biți).
- Calcularea factorialelor numerelor mari ($N!$ pentru $N \\ge 30$).
- Probleme competitive de programare unde rezultatele intermediare pot depăși cu mult limitele standard ale procesorului.`,
  "code": `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

string addBigIntegers(string num1, string num2) {
    string result = "";
    int i = num1.length() - 1;
    int j = num2.length() - 1;
    int carry = 0;
    
    while (i >= 0 || j >= 0 || carry > 0) {
        int sum = carry;
        if (i >= 0) {
            sum += num1[i] - '0';
            i--;
        }
        if (j >= 0) {
            sum += num2[j] - '0';
            j--;
        }
        carry = sum / 10;
        result += to_string(sum % 10);
    }
    
    reverse(result.begin(), result.end());
    return result;
}

int main() {
    string a = "987";
    string b = "45";
    string sum = addBigIntegers(a, b);
    cout << "Suma: " << sum << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 36,
      "text": "Apelăm funcția `addBigIntegers` pentru a aduna numerele mari $a = \"987\"$ și $b = \"45\"$.",
      "blocksVisual": [
        {
          "label": "Input",
          "groups": [
            [
              { "val": "num1 = \"987\"", "active": true },
              { "val": "num2 = \"45\"", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm șirul de caractere `result` ca fiind vid. Acesta va stoca temporar cifrele sumei în ordine inversă.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              { "val": "\"\"", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Setăm indicele `i` la ultima cifră a primului număr: `i = 2`, corespunzător cifrei $'7'$ din `\"987\"`.",
      "blocksVisual": [
        {
          "label": "Indecși",
          "groups": [
            [
              { "val": "i = 2 (cifra '7')", "active": true },
              { "val": "j = ?" }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Setăm indicele `j` la ultima cifră a celui de-al doilea număr: `j = 1`, corespunzător cifrei $'5'$ din `\"45\"`.",
      "blocksVisual": [
        {
          "label": "Indecși",
          "groups": [
            [
              { "val": "i = 2 (cifra '7')" },
              { "val": "j = 1 (cifra '5')", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Inițializăm transportul `carry` cu $0$. Transportul reține valoarea care trece la ordinul superior (zeci, sute).",
      "blocksVisual": [
        {
          "label": "Transport",
          "groups": [
            [
              { "val": "carry = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Intrăm în bucla `while`. Condiția `i >= 0 || j >= 0 || carry > 0` este adevărată deoarece `i = 2` și `j = 1` sunt pozitive.",
      "blocksVisual": [
        {
          "label": "Evaluare Condiție",
          "groups": [
            [
              { "val": "i>=0 (DA) || j>=0 (DA)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La prima iterație, suma parțială `sum` începe cu valoarea transportului (`carry = 0`).",
      "blocksVisual": [
        {
          "label": "Suma curentă",
          "groups": [
            [
              { "val": "sum = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Deoarece `i = 2 >= 0`, adăugăm cifra corespunzătoare: `sum += 7`, devenind $7$. Decrementăm `i` la $1$.",
      "blocksVisual": [
        {
          "label": "Adunare num1",
          "groups": [
            [
              { "val": "sum = 7", "sorted": true },
              { "val": "i = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Deoarece `j = 1 >= 0`, adăugăm cifra din `num2`: `sum += 5`, devenind $12$. Decrementăm `j` la $0$.",
      "blocksVisual": [
        {
          "label": "Adunare num2",
          "groups": [
            [
              { "val": "sum = 12", "sorted": true },
              { "val": "j = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm noul transport: `carry = 12 / 10 = 1`. Cifra care se va scrie este unitatea sumei: `12 % 10 = 2`.",
      "blocksVisual": [
        {
          "label": "Transport nou",
          "groups": [
            [
              { "val": "carry = 1", "sorted": true },
              { "val": "unitate = 2" }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Adăugăm cifra unităților ca text la rezultat: `result` devine `\"2\"`.",
      "blocksVisual": [
        {
          "label": "Rezultat Parțial",
          "groups": [
            [
              { "val": "result = \"2\"", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La a doua iterație, `sum` începe cu `carry = 1`. Adăugăm `num1[1]` ($8$) și `num2[0]` ($4$), obținând `sum = 13`. Indecșii devin `i = 0`, `j = -1`.",
      "blocksVisual": [
        {
          "label": "Suma zeci",
          "groups": [
            [
              { "val": "sum = 13", "active": true },
              { "val": "i = 0" },
              { "val": "j = -1" }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Noul transport este `carry = 13 / 10 = 1`. Rezultatul parțial devine `\"23\"` după adăugarea unității $3$.",
      "blocksVisual": [
        {
          "label": "Rezultat Parțial",
          "groups": [
            [
              { "val": "result = \"23\"", "sorted": true },
              { "val": "carry = 1" }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La a treia iterație, `sum` pornește cu `carry = 1`. Adăugăm doar `num1[0]` ($9$) deoarece `j = -1`. Obținăm `sum = 10`. `i` devine $-1$.",
      "blocksVisual": [
        {
          "label": "Suma sute",
          "groups": [
            [
              { "val": "sum = 10", "active": true },
              { "val": "i = -1" }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Noul transport este `carry = 10 / 10 = 1`. Cifra unităților $0$ este adăugată: `result` devine `\"230\"`.",
      "blocksVisual": [
        {
          "label": "Rezultat Parțial",
          "groups": [
            [
              { "val": "result = \"230\"", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "La a patra iterație, `i` și `j` sunt negative, dar `carry = 1 > 0`. `sum` începe cu $1$, unitatea $1$ este adăugată la rezultat, devenind `\"2301\"`. `carry` devine $0$.",
      "blocksVisual": [
        {
          "label": "Ultimul Carry",
          "groups": [
            [
              { "val": "result = \"2301\"", "sorted": true },
              { "val": "carry = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Inversăm caracterele șirului `result` pentru a obține ordinea corectă de la stânga la dreapta: `\"1032\"`.",
      "blocksVisual": [
        {
          "label": "Reverse",
          "groups": [
            [
              { "val": "result = \"1032\"", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Returnăm valoarea finală a sumei numerelor mari, adică `\"1032\"`.",
      "blocksVisual": [
        {
          "label": "Return",
          "groups": [
            [
              { "val": "\"1032\"", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Add Strings",
        "url": "https://leetcode.com/problems/add-strings/",
        "desc": "Adună două numere mari reprezentate ca string-uri."
      }
    ],
    "medium": [
      {
        "title": "Multiply Strings",
        "url": "https://leetcode.com/problems/multiply-strings/",
        "desc": "Înmulțește două numere mari reprezentate ca string-uri."
      }
    ],
    "hard": [
      {
        "title": "Sum of Two Large Numbers",
        "url": "https://practice.geeksforgeeks.org/problems/sum-of-two-numbers-represented-as-arrays3110/1",
        "desc": "Adună două numere mari reprezentate ca vectori de cifre."
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
        { f: [{ name: 'main()', file: 'main.cpp', line: 36 }], v: [] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 10 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 11 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 12 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 2 }, { name: 'j', type: 'int', val: 1 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 13 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 2 }, { name: 'j', type: 'int', val: 1 }, { name: 'carry', type: 'int', val: 0 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 15 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 2 }, { name: 'j', type: 'int', val: 1 }, { name: 'carry', type: 'int', val: 0 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 2 }, { name: 'j', type: 'int', val: 1 }, { name: 'carry', type: 'int', val: 0 }, { name: 'sum', type: 'int', val: 0 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 18 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 1 }, { name: 'j', type: 'int', val: 1 }, { name: 'carry', type: 'int', val: 0 }, { name: 'sum', type: 'int', val: 7 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 22 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 1 }, { name: 'j', type: 'int', val: 0 }, { name: 'carry', type: 'int', val: 0 }, { name: 'sum', type: 'int', val: 12 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 25 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '""' }, { name: 'i', type: 'int', val: 1 }, { name: 'j', type: 'int', val: 0 }, { name: 'carry', type: 'int', val: 1 }, { name: 'sum', type: 'int', val: 12 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 26 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"2"' }, { name: 'i', type: 'int', val: 1 }, { name: 'j', type: 'int', val: 0 }, { name: 'carry', type: 'int', val: 1 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"2"' }, { name: 'i', type: 'int', val: 0 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 1 }, { name: 'sum', type: 'int', val: 13 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 26 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"23"' }, { name: 'i', type: 'int', val: 0 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 1 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"23"' }, { name: 'i', type: 'int', val: -1 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 1 }, { name: 'sum', type: 'int', val: 10 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 26 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"230"' }, { name: 'i', type: 'int', val: -1 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 1 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 16 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"2301"' }, { name: 'i', type: 'int', val: -1 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 0 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 29 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"1032"' }, { name: 'i', type: 'int', val: -1 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 0 }] },
        { f: [{ name: 'addBigIntegers("987", "45")', file: 'main.cpp', line: 30 }, { name: 'main()', file: 'main.cpp', line: 36 }], v: [{ name: 'num1', type: 'string', val: '"987"' }, { name: 'num2', type: 'string', val: '"45"' }, { name: 'result', type: 'string', val: '"1032"' }, { name: 'i', type: 'int', val: -1 }, { name: 'j', type: 'int', val: -1 }, { name: 'carry', type: 'int', val: 0 }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0 && stepIndex < 17) {
        inlineVal = `carry: ${vars.find(v => v.name === 'carry')?.val}, result: ${vars.find(v => v.name === 'result')?.val}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const varsAtStep = [
        { i: 2, j: 1, carry: 0, sum: null, result: '""' },
        { i: 2, j: 1, carry: 0, sum: null, result: '""' },
        { i: 2, j: 1, carry: 0, sum: null, result: '""' },
        { i: 2, j: 1, carry: 0, sum: null, result: '""' },
        { i: 2, j: 1, carry: 0, sum: null, result: '""' },
        { i: 2, j: 1, carry: 0, sum: null, result: '""' },
        { i: 2, j: 1, carry: 0, sum: 0, result: '""' },
        { i: 1, j: 1, carry: 0, sum: 7, result: '""' },
        { i: 1, j: 0, carry: 0, sum: 12, result: '""' },
        { i: 1, j: 0, carry: 1, sum: 12, result: '""' },
        { i: 1, j: 0, carry: 1, sum: 12, result: '"2"' },
        { i: 0, j: -1, carry: 1, sum: 13, result: '"2"' },
        { i: 0, j: -1, carry: 1, sum: 13, result: '"23"' },
        { i: -1, j: -1, carry: 1, sum: 10, result: '"23"' },
        { i: -1, j: -1, carry: 1, sum: 10, result: '"230"' },
        { i: -1, j: -1, carry: 0, sum: 1, result: '"2301"' },
        { i: -1, j: -1, carry: 0, sum: 1, result: '"1032"' },
        { i: -1, j: -1, carry: 0, sum: 1, result: '"1032"' }
      ];
      const s = varsAtStep[stepIndex] || varsAtStep[varsAtStep.length - 1];
      if (lineNum === 10) return `result: ${s.result}`;
      if (lineNum === 11) return `i: ${s.i}`;
      if (lineNum === 12) return `j: ${s.j}`;
      if (lineNum === 13) return `carry: ${s.carry}`;
      if (lineNum === 15) return `i: ${s.i}, j: ${s.j}`;
      if (lineNum === 16) return `sum: ${s.sum}`;
      if (lineNum === 25) return `carry: ${s.carry}`;
      if (lineNum === 26) return `result: ${s.result}`;
      if (lineNum === 29) return `result: ${s.result}`;
      if (lineNum === 30) return `result: ${s.result}`;
      if (lineNum === 36) return `sum: "1032"`;
      return null;
    }
  }
};
