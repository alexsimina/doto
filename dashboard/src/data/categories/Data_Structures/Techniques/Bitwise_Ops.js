export const data = {
  "presentation": "### Prezentare Generală\n\nOperațiile pe biți (**Bitwise Operations**) reprezintă o tehnică extrem de rapidă de manipulare directă a biților unui număr întreg la nivel de procesor.\n\nÎn memorie, orice tip de date este stocat în baza 2 (sistemul binar). De exemplu, numărul întreg $5$ este stocat pe 32 de biți ca `00...0101`. Operațiile fundamentale din C++ ne permit să manipulăm acești biți în timp constant $O(1)$:\n- **AND (`&`)**: Returnează $1$ doar dacă ambii biți corespunzători sunt $1$.\n- **OR (`|`)**: Returnează $1$ dacă cel puțin unul dintre biți este $1$.\n- **XOR (`^`)**: Returnează $1$ dacă biții sunt diferiți (unul este $0$, celălalt este $1$).\n- **NOT (`~`)**: Inversează toți biții (complementul față de 1).\n- **Shift Stânga (`<<`)**: Deplasează biții spre stânga, echivalent cu înmulțirea cu $2^k$.\n- **Shift Dreapta (`>>`)**: Deplasează biții spre dreapta, echivalent cu împărțirea întreagă la $2^k$.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(1)$ pentru fiecare operație elementară pe biți.\n- **Spațiu:** $O(1)$ memorie suplimentară. Datele pot fi stocate extrem de compact sub formă de **măști de biți (bitmasks)** (de exemplu, un singur `int` pe 32 de biți poate reține starea de prezență/absență pentru $32$ de elemente distincte, înlocuind un vector de booleană).",
  "variations": "### Variații și Edge Cases\n\n1. **Generarea Submulțimilor:** O mulțime cu $N$ elemente are $2^N$ submulțimi posibile. Fiecare număr din intervalul $[0, 2^N - 1]$ corespunde în mod unic unei submulțimi, unde bitul $i$ este setat la $1$ dacă și numai dacă elementul $i$ face parte din submulțime.\n2. **Extragerea celui mai nesemnificativ bit setat (LSB):** Expresia `x & -x` izolează cel mai din dreapta bit de $1$, fiind folosită intens în Fenwick Trees (Arbori Indexați Binar).\n3. **Trucul lui Brian Kernighan:** Operația `x & (x - 1)` elimină cel mai din dreapta bit de $1$. Permite determinarea numărului de biți setați într-un număr în timp proporțional cu numărul de biți de $1$ stocați, nu cu lungimea totală a reprezentării.",
  "applications": "### Aplicații\n\n- **Programare Dinamică pe măști de biți (Bitmask DP):** Folosită în probleme exponențiale (de exemplu, TSP - Traveling Salesperson Problem).\n- **Criptografie:** Operația XOR este baza multor algoritmi de criptare simetrică.\n- **Sisteme de operare și rețele:** Calcularea măștilor de rețea (subnet masks), permisiuni pe fișiere (read/write/execute ca biți 111 în octal).",
  "code": `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N = 3;
    vector<char> multime = {'A', 'B', 'C'};
    int total_submultimi = (1 << N);
    for (int mask = 0; mask < total_submultimi; mask++) {
        cout << "{ ";
        for (int i = 0; i < N; i++) {
            if (mask & (1 << i)) {
                cout << multime[i] << " ";
            }
        }
        cout << "}\\n";
    }
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Inițializăm numărul de elemente $N = 3$. Aceasta înseamnă că vom genera $2^3 = 8$ submulțimi.",
      "blocksVisual": [
        {
          "label": "Parametri",
          "groups": [
            [{ "val": "N = 3", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Definim mulțimea inițială de caractere: {'A', 'B', 'C'}.",
      "blocksVisual": [
        {
          "label": "Mulțime inițială",
          "groups": [
            [{ "val": "A" }, { "val": "B" }, { "val": "C" }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Calculăm totalul de submulțimi: $2^3 = 8$, folosind operatorul de shiftare la stânga: $1 << 3 = 8$.",
      "blocksVisual": [
        {
          "label": "Calcule",
          "groups": [
            [{ "val": "1 << 3 = 8", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Începem iterarea măștilor de la `mask = 0` (în binar `000`) până la `total_submultimi - 1` (adică 7, în binar `111`).",
      "blocksVisual": [
        {
          "label": "Iterare măști",
          "groups": [
            [{ "val": "mask = 0 (binar: 000)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Afișăm începutul submulțimii curente, reprezentată de acolada deschisă '{ '.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: {" }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pentru masca curentă, iterăm prin toți cei $N=3$ biți de la pozițiile $0, 1, 2$.",
      "blocksVisual": [
        {
          "label": "Iterare biți",
          "groups": [
            [{ "val": "i = 0", "active": true }, { "val": "i = 1" }, { "val": "i = 2" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă bitul $0$ este setat în `mask = 0` făcând AND logic cu $1 << 0$: `000 & 001 = 0` (Fals).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "0 & 1 = 0", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Incrementăm indicele bitului la $i = 1$.",
      "blocksVisual": [
        {
          "label": "Iterare biți",
          "groups": [
            [{ "val": "i = 0" }, { "val": "i = 1", "active": true }, { "val": "i = 2" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă bitul $1$ este setat în `mask = 0`: `000 & 010 = 0` (Fals).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "0 & 2 = 0", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Incrementăm indicele bitului la $i = 2$.",
      "blocksVisual": [
        {
          "label": "Iterare biți",
          "groups": [
            [{ "val": "i = 0" }, { "val": "i = 1" }, { "val": "i = 2", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă bitul $2$ este setat în `mask = 0`: `000 & 100 = 0` (Fals).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "0 & 4 = 0", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Închidem acolada. Niciun element nu a fost selectat. Am afișat submulțimea vidă `{ }`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { }" }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Trecem la următoarea mască: `mask = 1` (binar `001`).",
      "blocksVisual": [
        {
          "label": "Iterare măști",
          "groups": [
            [{ "val": "mask = 1 (binar: 001)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Afișăm începutul submulțimii: '{ '.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: {" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă bitul $0$ este setat în `mask = 1`: `001 & 001 = 1` (Adevărat).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "1 & 1 = 1", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Deoarece condiția este adevărată, afișăm `multime[0]` care este caracterul `'A'`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { A" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă bitul $1$ este setat în `mask = 1`: `001 & 010 = 0` (Fals).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "1 & 2 = 0", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă bitul $2$ este setat în `mask = 1`: `001 & 100 = 0` (Fals).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "1 & 4 = 0", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Închidem submulțimea pentru `mask = 1`, obținând `{ A }`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { A }" }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Trecem la `mask = 2` (binar `010`).",
      "blocksVisual": [
        {
          "label": "Iterare măști",
          "groups": [
            [{ "val": "mask = 2 (binar: 010)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm biții pentru `mask = 2`. Pentru bitul $0$: `010 & 001 = 0` (Fals). Pentru bitul $1$: `010 & 010 = 2` (Adevărat!).",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "2 & 1 = 0" }, { "val": "2 & 2 = 2", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Afișăm caracterul corespunzător poziției $1$, adică `'B'`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { B" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Închidem submulțimea pentru `mask = 2`, obținând `{ B }`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { B }" }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Trecem la `mask = 3` (binar `011`).",
      "blocksVisual": [
        {
          "label": "Iterare măști",
          "groups": [
            [{ "val": "mask = 3 (binar: 011)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pentru `mask = 3`, bitul $0$ (`011 & 001 = 1`) și bitul $1$ (`011 & 010 = 2`) sunt ambele setate (Adevărat). Bitul $2$ este 0.",
      "blocksVisual": [
        {
          "label": "Evaluare AND",
          "groups": [
            [{ "val": "3 & 1 = 1", "active": true }, { "val": "3 & 2 = 2", "active": true }, { "val": "3 & 4 = 0" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Afișăm caracterele corespunzătoare: `'A'` și `'B'`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { A B" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Închidem submulțimea pentru `mask = 3`, rezultând `{ A B }`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { A B }" }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Iterăm similar prin măștile următoare până la 7. Masca 7 (binar `111`) are toți biții setați.",
      "blocksVisual": [
        {
          "label": "Masca finală",
          "groups": [
            [{ "val": "mask = 7 (binar: 111)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pentru `mask = 7`, toți biții sunt setați, deci se vor afișa toate caracterele: `'A'`, `'B'` și `'C'`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { A B C" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Închidem submulțimea pentru `mask = 7`, rezultând `{ A B C }`.",
      "blocksVisual": [
        {
          "label": "Afișare curentă",
          "groups": [
            [{ "val": "Output: { A B C }" }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Programul se încheie cu succes, returnând 0.",
      "blocksVisual": [
        {
          "label": "Sfârșit",
          "groups": [
            [{ "val": "Succes!", "sorted": true }]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Single Number",
        "url": "https://leetcode.com/problems/single-number/",
        "desc": "Folosirea XOR-ului (x ^ x = 0)"
      },
      {
        "title": "Number of 1 Bits",
        "url": "https://leetcode.com/problems/number-of-1-bits/",
        "desc": "Trucul lui Brian Kernighan"
      }
    ],
    "medium": [
      {
        "title": "Subsets",
        "url": "https://leetcode.com/problems/subsets/",
        "desc": "Generarea submulțimilor"
      },
      {
        "title": "Bitwise AND of Numbers Range",
        "url": "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
        "desc": "Proprietăți matematice pe biți"
      }
    ],
    "hard": [
      {
        "title": "Maximum XOR of Two Numbers",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        "desc": "Trie + Bitwise"
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { mask: -1, i: -1, phase: "init" },
        { mask: -1, i: -1, phase: "init" },
        { mask: -1, i: -1, phase: "init" },
        { mask: 0, i: -1, phase: "mask" },
        { mask: 0, i: -1, phase: "mask" },
        { mask: 0, i: 0, phase: "bit" },
        { mask: 0, i: 0, phase: "bit" },
        { mask: 0, i: 1, phase: "bit" },
        { mask: 0, i: 1, phase: "bit" },
        { mask: 0, i: 2, phase: "bit" },
        { mask: 0, i: 2, phase: "bit" },
        { mask: 0, i: -1, phase: "mask" },
        { mask: 1, i: -1, phase: "mask" },
        { mask: 1, i: -1, phase: "mask" },
        { mask: 1, i: 0, phase: "bit" },
        { mask: 1, i: 0, phase: "bit" },
        { mask: 1, i: 1, phase: "bit" },
        { mask: 1, i: 2, phase: "bit" },
        { mask: 1, i: -1, phase: "mask" },
        { mask: 2, i: -1, phase: "mask" },
        { mask: 2, i: 1, phase: "bit" },
        { mask: 2, i: 1, phase: "bit" },
        { mask: 2, i: -1, phase: "mask" },
        { mask: 3, i: -1, phase: "mask" },
        { mask: 3, i: 0, phase: "bit" },
        { mask: 3, i: 0, phase: "bit" },
        { mask: 3, i: -1, phase: "mask" },
        { mask: 7, i: -1, phase: "mask" },
        { mask: 7, i: 2, phase: "bit" },
        { mask: 7, i: -1, phase: "mask" },
        { mask: 7, i: -1, phase: "end" }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [
        { name: "main()", file: "main.cpp", line: activeLine }
      ];

      vars.push({ name: "N", type: "int", val: "3", expandable: false });
      vars.push({ name: "multime", type: "std::vector<char>", val: "size = 3 {'A', 'B', 'C'}", expandable: true });
      
      if (stepIndex >= 2) {
        vars.push({ name: "total_submultimi", type: "int", val: "8", expandable: false });
      }
      if (curr.mask !== -1) {
        vars.push({ name: "mask", type: "int", val: curr.mask + " (binar: " + curr.mask.toString(2).padStart(3, "0") + ")", expandable: false });
      }
      if (curr.i !== -1) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }

      let inlineVal = "";
      if (curr.mask !== -1) {
        inlineVal = "mask: " + curr.mask;
        if (curr.i !== -1) inlineVal += ", i: " + curr.i;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { mask: -1, i: -1 },
        { mask: -1, i: -1 },
        { mask: -1, i: -1 },
        { mask: 0, i: -1 },
        { mask: 0, i: -1 },
        { mask: 0, i: 0 },
        { mask: 0, i: 0 },
        { mask: 0, i: 1 },
        { mask: 0, i: 1 },
        { mask: 0, i: 2 },
        { mask: 0, i: 2 },
        { mask: 0, i: -1 },
        { mask: 1, i: -1 },
        { mask: 1, i: -1 },
        { mask: 1, i: 0 },
        { mask: 1, i: 0 },
        { mask: 1, i: 1 },
        { mask: 1, i: 2 },
        { mask: 1, i: -1 },
        { mask: 2, i: -1 },
        { mask: 2, i: 1 },
        { mask: 2, i: 1 },
        { mask: 2, i: -1 },
        { mask: 3, i: -1 },
        { mask: 3, i: 0 },
        { mask: 3, i: 0 },
        { mask: 3, i: -1 },
        { mask: 7, i: -1 },
        { mask: 7, i: 2 },
        { mask: 7, i: -1 },
        { mask: 7, i: -1 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 10 && lineNum <= 18) {
        let res = "mask: " + curr.mask;
        if (curr.i !== -1) res += ", i: " + curr.i;
        return res;
      }
      return null;
    }
  }
};
