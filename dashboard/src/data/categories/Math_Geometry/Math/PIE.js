export const data = {
  "presentation": `### Prezentare Generală

Principiul Includerii și Excluderii (PIE) este o metodă combinatorică fundamentală folosită pentru a calcula cardinalul (dimensiunea) reuniunii mai multor mulțimi finite. Dacă am aduna pur și simplu dimensiunile mulțimilor, am număra elementele din intersecții de mai multe ori. PIE corectează această supra-numărare prin adunarea și scăderea alternativă a dimensiunilor intersecțiilor.

Pentru $n$ mulțimi $A_1, A_2, \\dots, A_n$, formula este:
$$ |A_1 \\cup A_2 \\cup \\dots \\cup A_n| = \\sum_{i} |A_i| - \\sum_{i < j} |A_i \\cap A_j| + \\sum_{i < j < k} |A_i \\cap A_j \\cap A_k| - \\dots + (-1)^{n-1} |A_1 \\cap A_2 \\cap \\dots \\cap A_n| $$

În programare, PIE este adesea implementat folosind măști pe biți (bitmasks). Fiecare mască de la $1$ la $2^m-1$ reprezintă un subset de condiții sau mulțimi. Semnul cu care adunăm sau scădem contribuția subsetului depinde de paritatea numărului de biți setați în mască (impar $\\implies$ adunare $+$, par $\\implies$ scădere $-$).`,
  "complexity": `### Complexitate

Pentru $m$ mulțimi/condiții și calculul reuniunii lor pe un interval:
- **Timp:** $O(2^m \\cdot m)$ — există $2^m$ subseturi posibile de generat, iar pentru fiecare subset facem operații cu cele $m$ elemente.
- **Spațiu:** $O(1)$ — stocăm doar câteva variabile pentru mască și cel mai mic multiplu comun.`,
  "variations": `### Variații și Edge Cases

1. **Overflow la LCM:** Când calculăm cel mai mic multiplu comun al elementelor din subset, valoarea poate depăși rapid tipurile de date întregi. Este esențial să oprim calculul subsetului curent dacă LCM depășește limita superioară a intervalului analizat ($N$).
2. **Mobius ca PIE:** Funcția Mobius $\\mu(n)$ este o generalizare directă a Principiului Includerii și Excluderii, folosită pentru a optimiza calculele pe divizori.`,
  "applications": `### Aplicații

- Numărarea numerelor dintr-un interval care sunt divizibile cu cel puțin un număr dintr-un set dat.
- Numărarea permutațiilor fără puncte fixe (deranjamente).
- Determinarea numărului de șiruri de lungime $N$ care conțin toate caracterele unui alfabet dat.
- Determinarea numărului de perechi de indici cu cel mai mare divizor comun egal cu $1$.`,
  "code": `
#include <iostream>
#include <vector>

using namespace std;

long long countDivisible(long long n, vector<long long>& primes) {
    long long count = 0;
    int m = primes.size();
    
    for (int mask = 1; mask < (1 << m); ++mask) {
        long long lcm = 1;
        int bits = 0;
        
        for (int i = 0; i < m; ++i) {
            if ((mask & (1 << i)) != 0) {
                lcm *= primes[i];
                bits++;
                if (lcm > n) break;
            }
        }
        
        if (bits % 2 == 1) {
            count += n / lcm;
        } else {
            count -= n / lcm;
        }
    }
    
    return count;
}

int main() {
    vector<long long> primes = {2, 3, 5};
    long long ans = countDivisible(30, primes);
    cout << "Divizibile cu 2, 3 sau 5 in [1, 30]: " << ans << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 35,
      "text": "Apelăm funcția `countDivisible(30, {2, 3, 5})` pentru a găsi câte numere din intervalul $[1, 30]$ sunt divizibile cu cel puțin unul dintre numerele 2, 3 sau 5.",
      "blocksVisual": [
        {
          "label": "Input",
          "groups": [
            [
              { "val": "n = 30", "active": true },
              { "val": "primes = {2, 3, 5}", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm variabila `count` cu $0$. Aceasta va cumula rezultatul conform formulei de Includere-Excludere.",
      "blocksVisual": [
        {
          "label": "Stare",
          "groups": [
            [
              { "val": "count = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Salvați numărul de elemente din vectorul `primes`: `m = 3`.",
      "blocksVisual": [
        {
          "label": "Dimensiune",
          "groups": [
            [
              { "val": "m = 3", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Generăm toate subseturile nevide folosind o mască pe biți de la $1$ la $2^m - 1$ ($2^3 - 1 = 7$).",
      "blocksVisual": [
        {
          "label": "Măști",
          "groups": [
            [
              { "val": "mask de la 1 la 7", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pentru fiecare mască, inițializăm valoarea produsului/LCM-ului `lcm` cu $1$.",
      "blocksVisual": [
        {
          "label": "Produs inițial",
          "groups": [
            [
              { "val": "lcm = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Inițializăm `bits` cu $0$. `bits` va stoca numărul de elemente selectate din subsetul curent.",
      "blocksVisual": [
        {
          "label": "Biți activați",
          "groups": [
            [
              { "val": "bits = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Parcurgem fiecare bit al măștii pentru a decide care numere prime din vector sunt incluse în intersecție.",
      "blocksVisual": [
        {
          "label": "Parcurgere biți",
          "groups": [
            [
              { "val": "i = 0..2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Pentru `mask = 1` (în binar `001`), bitul $0$ este activ. Astfel, selectăm elementul `primes[0]` ($2$).",
      "blocksVisual": [
        {
          "label": "Masca curentă",
          "groups": [
            [
              { "val": "mask = 1 (001)", "active": true },
              { "val": "primes[0] = 2 selectat" }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Înmulțim `lcm` cu $2$ și incrementăm contorul de biți la $1$.",
      "blocksVisual": [
        {
          "label": "Actualizare",
          "groups": [
            [
              { "val": "lcm = 2", "sorted": true },
              { "val": "bits = 1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Verificăm dacă numărul de elemente din subset (`bits = 1`) este impar. Deoarece $1 \\% 2 == 1$, adunăm contribuția acestui subset la `count`.",
      "blocksVisual": [
        {
          "label": "Evaluare paritate",
          "groups": [
            [
              { "val": "bits = 1 (impar)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adunăm numerele divizibile cu $2$: `count += 30 / 2 = 15`. `count` devine $15$.",
      "blocksVisual": [
        {
          "label": "Adunare",
          "groups": [
            [
              { "val": "count = 15", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Mergem la următoarea mască. Pentru un subset cu număr par de elemente, de exemplu `mask = 3` (în binar `011`), selectăm `primes[0]` ($2$) și `primes[1]` ($3$).",
      "blocksVisual": [
        {
          "label": "Masca curentă",
          "groups": [
            [
              { "val": "mask = 3 (011)", "active": true },
              { "val": "lcm = 6" },
              { "val": "bits = 2" }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Deoarece `bits = 2` este par, conform PIE trebuie să scădem contribuția intersecției pentru a evita dubla numărare.",
      "blocksVisual": [
        {
          "label": "Evaluare paritate",
          "groups": [
            [
              { "val": "bits = 2 (par)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Scădem numerele divizibile cu $6$: `count -= 30 / 6 = 5`. `count` devine $15 - 5 = 10$.",
      "blocksVisual": [
        {
          "label": "Scădere",
          "groups": [
            [
              { "val": "count = 10", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Procesăm similar toate măștile rămase până la $7$. La masca $7$ (binar `111`), avem `lcm = 30` și `bits = 3`. Fiind impar, adunăm `30 / 30 = 1`. Valoarea finală acumulată a lui `count` devine $22$.",
      "blocksVisual": [
        {
          "label": "Finisare buclă",
          "groups": [
            [
              { "val": "mask = 7", "active": true },
              { "val": "lcm = 30" },
              { "val": "count = 22", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Ieșim din buclă și returnăm rezultatul final: $22$ de numere sunt divizibile cu cel puțin unul dintre numerele 2, 3 sau 5.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              { "val": "22", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Afișăm rezultatul final în consolă: 22.",
      "blocksVisual": [
        {
          "label": "Output",
          "groups": [
            [
              { "val": "Divizibile: 22", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = "";

      globalVars.push({ name: "primes", type: "std::vector<long long>", val: "{2, 3, 5}", expandable: false });

      if (stepIndex === 0) {
        frames.push({ name: "main()", file: "main.cpp", line: 35 });
        vars.push({ name: "n", type: "long long", val: "30", expandable: false });
      } else if (stepIndex >= 1 && stepIndex <= 15) {
        frames.push({ name: "countDivisible(30, primes)", file: "solution.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 35 });

        vars.push({ name: "n", type: "long long", val: "30", expandable: false });
        
        let countVal = 0;
        if (stepIndex >= 10 && stepIndex <= 11) countVal = 15;
        else if (stepIndex >= 12 && stepIndex <= 13) countVal = 10;
        else if (stepIndex >= 14) countVal = 22;
        vars.push({ name: "count", type: "long long", val: countVal.toString(), expandable: false });

        if (stepIndex >= 2) {
          vars.push({ name: "m", type: "int", val: "3", expandable: false });
        }

        if (stepIndex >= 3) {
          let maskVal = 1;
          if (stepIndex >= 11 && stepIndex <= 13) maskVal = 3;
          else if (stepIndex >= 14) maskVal = 7;
          vars.push({ name: "mask", type: "int", val: `${maskVal} (binar: ${maskVal.toString(2).padStart(3, '0')})`, expandable: false });
        }

        if (stepIndex >= 4) {
          let lcmVal = 1;
          if (stepIndex === 8 || stepIndex === 9 || stepIndex === 10) lcmVal = 2;
          else if (stepIndex >= 11 && stepIndex <= 13) lcmVal = 6;
          else if (stepIndex >= 14) lcmVal = 30;
          vars.push({ name: "lcm", type: "long long", val: lcmVal.toString(), expandable: false });
        }

        if (stepIndex >= 5) {
          let bitsVal = 0;
          if (stepIndex === 8 || stepIndex === 9 || stepIndex === 10) bitsVal = 1;
          else if (stepIndex >= 11 && stepIndex <= 13) bitsVal = 2;
          else if (stepIndex >= 14) bitsVal = 3;
          vars.push({ name: "bits", type: "int", val: bitsVal.toString(), expandable: false });
        }

        if (stepIndex >= 6 && stepIndex <= 8) {
          vars.push({ name: "i", type: "int", val: "0", expandable: false });
        }
      } else if (stepIndex === 16) {
        frames.push({ name: "main()", file: "main.cpp", line: 36 });
        vars.push({ name: "ans", type: "long long", val: "22", expandable: false });
      }

      if (stepIndex === 0) inlineVal = "Apel countDivisible(30)";
      else if (stepIndex >= 1 && stepIndex <= 15) {
        let countVal = 0;
        if (stepIndex >= 10 && stepIndex <= 11) countVal = 15;
        else if (stepIndex >= 12 && stepIndex <= 13) countVal = 10;
        else if (stepIndex >= 14) countVal = 22;
        inlineVal = `count: ${countVal}`;
      } else if (stepIndex === 16) {
        inlineVal = "ans: 22";
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex >= 1 && stepIndex <= 15) {
        let countVal = 0;
        if (stepIndex >= 10 && stepIndex <= 11) countVal = 15;
        else if (stepIndex >= 12 && stepIndex <= 13) countVal = 10;
        else if (stepIndex >= 14) countVal = 22;

        if (lineNum === 8) return `count = ${countVal}`;
        if (lineNum === 30) return `return ${countVal}`;

        let maskVal = 1;
        if (stepIndex >= 11 && stepIndex <= 13) maskVal = 3;
        else if (stepIndex >= 14) maskVal = 7;

        if (lineNum === 11) return `mask = ${maskVal}`;

        let lcmVal = 1;
        if (stepIndex === 8 || stepIndex === 9 || stepIndex === 10) lcmVal = 2;
        else if (stepIndex >= 11 && stepIndex <= 13) lcmVal = 6;
        else if (stepIndex >= 14) lcmVal = 30;

        if (lineNum === 12) return `lcm = ${lcmVal}`;

        let bitsVal = 0;
        if (stepIndex === 8 || stepIndex === 9 || stepIndex === 10) bitsVal = 1;
        else if (stepIndex >= 11 && stepIndex <= 13) bitsVal = 2;
        else if (stepIndex >= 14) bitsVal = 3;

        if (lineNum === 13) return `bits = ${bitsVal}`;
      }
      if (stepIndex === 16 && lineNum === 35) {
        return "ans = 22";
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const nodes = [
        { id: "1", x: 80, y: 60, label: "{2}" },
        { id: "2", x: 180, y: 60, label: "{3}" },
        { id: "4", x: 280, y: 60, label: "{5}" },
        { id: "3", x: 80, y: 160, label: "{2,3}" },
        { id: "5", x: 180, y: 160, label: "{2,5}" },
        { id: "6", x: 280, y: 160, label: "{3,5}" },
        { id: "7", x: 180, y: 260, label: "{2,3,5}" }
      ];

      const edges = [
        { source: "1", target: "3", weight: "" },
        { source: "1", target: "5", weight: "" },
        { source: "2", target: "3", weight: "" },
        { source: "2", target: "6", weight: "" },
        { source: "4", target: "5", weight: "" },
        { source: "4", target: "6", weight: "" },
        { source: "3", target: "7", weight: "" },
        { source: "5", target: "7", weight: "" },
        { source: "6", target: "7", weight: "" }
      ];

      const activeMask = (stepIndex >= 4 && stepIndex <= 10) ? 1 :
                         (stepIndex >= 11 && stepIndex <= 13) ? 3 :
                         (stepIndex === 14) ? 7 : 0;

      const visitedMasks = new Set();
      if (stepIndex >= 11) {
        visitedMasks.add(1);
        visitedMasks.add(2);
      }
      if (stepIndex >= 14) {
        visitedMasks.add(1);
        visitedMasks.add(2);
        visitedMasks.add(3);
        visitedMasks.add(4);
        visitedMasks.add(5);
        visitedMasks.add(6);
      }
      if (stepIndex >= 15) {
        visitedMasks.add(1);
        visitedMasks.add(2);
        visitedMasks.add(3);
        visitedMasks.add(4);
        visitedMasks.add(5);
        visitedMasks.add(6);
        visitedMasks.add(7);
      }

      const contributions = {
        "1": { text: "+15", active: true },
        "2": { text: "+10", active: true },
        "4": { text: "+6", active: true },
        "3": { text: "-5", active: false },
        "5": { text: "-3", active: false },
        "6": { text: "-2", active: false },
        "7": { text: "+1", active: true }
      };

      return {
        directed: false,
        title: "Lattice-ul de Subseturi (Includere-Excludere)",
        nodes: nodes.map(node => {
          const maskNum = parseInt(node.id);
          let state = undefined;
          let desc = "";

          if (maskNum === activeMask) {
            state = "active";
            desc = contributions[node.id].text;
          } else if (visitedMasks.has(maskNum)) {
            state = "visited";
            desc = contributions[node.id].text;
          }

          return { ...node, state, desc };
        }),
        edges: edges.map(edge => {
          const s = parseInt(edge.source);
          const t = parseInt(edge.target);
          let active = false;

          const sState = (s === activeMask || visitedMasks.has(s));
          const tState = (t === activeMask || visitedMasks.has(t));
          if (sState && tState) {
            active = true;
          }

          return { ...edge, active };
        })
      };
    }
  },
  "problems": {
    "easy": [
      {
        "title": "Divisible Numbers",
        "url": "https://www.geeksforgeeks.org/find-number-of-integers-in-the-range-1-n-which-are-divisible-by-any-of-the-first-k-prime-numbers/",
        "desc": "Calculează câte numere din intervalul [1, N] sunt divizibile cu primele K numere prime."
      }
    ],
    "medium": [
      {
        "title": "MSKYCODE",
        "url": "https://www.spoj.com/problems/MSKYCODE/",
        "desc": "Folosește PIE pentru a număra câte subseturi de 4 elemente au cel mai mare divizor comun egal cu 1."
      }
    ],
    "hard": [
      {
        "title": "Coprime Triples",
        "url": "https://cses.fi/problemset/task/2417/",
        "desc": "Numără tripletele de elemente dintr-un vector care au GCD egal cu 1, folosind PIE pe frecvențele divizorilor."
      }
    ]
  }
};
