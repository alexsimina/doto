export const data = {
  "presentation": "### Prezentare Generală\n\nVectorul de Diferențe (**Difference Array**) este o tehnică extrem de eficientă folosită atunci când trebuie să efectuăm un număr mare de actualizări pe intervale (Range Additions) asupra unui vector, urmat de interogări (citiri) ale valorilor sale.\n\nSă presupunem că avem un vector de dimensiune $N$ și dorim să adăugăm o valoare $V$ tuturor elementelor din intervalul $[L, R]$. Abordarea naivă necesită modificarea fiecărui element în parte, având o complexitate de $O(N)$ per operație. \n\nFolosind un vector auxiliar de diferențe `diff`, definit prin relația:\n$$diff[i] = arr[i] - arr[i - 1]$$\n\nPutem efectua actualizarea intervalului $[L, R]$ în timp constant $O(1)$ prin doar două modificări:\n1. `diff[L] += V`\n2. `diff[R + 1] -= V`\n\nLa final, valorile finale ale vectorului se pot obține calculând sumele parțiale (prefix sum) ale vectorului `diff` de la stânga la dreapta într-o singură parcurgere liniară $O(N)$.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - Actualizare (Update): $O(1)$ per operație.\n  - Reconstruire vector final: $O(N)$.\n  - Pentru $U$ actualizări, complexitatea totală este de $O(U + N)$ comparat cu $O(U \\cdot N)$ în cazul naiv.\n- **Spațiu:** $O(N)$ memorie adițională pentru stocarea vectorului `diff` de dimensiune $N+2$.",
  "variations": "### Variații și Edge Cases\n\n1. **Matrice de Diferențe 2D:** Logica se poate extinde pentru 2D. Pentru a adăuga $V$ într-o submatrice definită de colțul stânga-sus $(r_1, c_1)$ și colțul dreapta-jos $(r_2, c_2)$, modificăm doar 4 puncte în matricea de diferențe:\n   - `diff[r1][c1] += V`\n   - `diff[r1][c2+1] -= V`\n   - `diff[r2+1][c1] -= V`\n   - `diff[r2+1][c2+1] += V`\n2. **Relația cu Prefix Sums:** Vectorul de Diferențe și Vectorul de Sume Parțiale sunt operații inverse una față de cealaltă (analog cu diferențierea și integrarea în analiză matematică).",
  "applications": "### Aplicații\n\n- **Scanline Algorithm:** Determinarea acoperirii unui set de intervale pe o dreaptă (de exemplu, numărul maxim de utilizatori conectați simultan pe un server).\n- **Actualizări statice pe intervale:** Adăugarea de scoruri sau modificări repetate pe intervale unde interogările se fac doar după finalizarea tuturor actualizărilor.",
  "code": `
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N = 5;
    vector<int> arr(N + 1, 0);
    vector<int> diff(N + 2, 0);
    
    // 1. Adunam 10 pe intervalul [1, 3]
    diff[1] += 10;
    diff[3 + 1] -= 10;
    
    // 2. Adunam 20 pe intervalul [2, 5]
    diff[2] += 20;
    diff[5 + 1] -= 20;
    
    // 3. Adunam 5 pe intervalul [3, 4]
    diff[3] += 5;
    diff[4 + 1] -= 5;
    
    // Reconstruire prin sume partiale
    for (int i = 1; i <= N; i++) {
        arr[i] = arr[i - 1] + diff[i];
    }
    
    // Afisare rezultate
    for (int i = 1; i <= N; i++) {
        cout << arr[i] << " ";
    }
    cout << "\\n";
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Inițializăm numărul de elemente $N = 5$.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [
            [{ "val": "N = 5", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm vectorul real `arr` cu 0. Dimensiunea este $N + 1$ (indexare de la 1).",
      "blocksVisual": [
        {
          "label": "arr",
          "groups": [
            [{ "val": "arr[1]: 0" }, { "val": "arr[2]: 0" }, { "val": "arr[3]: 0" }, { "val": "arr[4]: 0" }, { "val": "arr[5]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Inițializăm vectorul de diferențe `diff` cu 0. Are dimensiune $N + 2$ pentru a preveni erori la modificarea indicelui $R + 1$.",
      "blocksVisual": [
        {
          "label": "diff",
          "groups": [
            [{ "val": "diff[1]: 0" }, { "val": "diff[2]: 0" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: 0" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Primul update: Adăugăm $10$ pe intervalul $[1, 3]$. Adăugăm $10$ la poziția de start $L=1$ a vectorului de diferențe.",
      "blocksVisual": [
        {
          "label": "diff (L=1)",
          "groups": [
            [{ "val": "diff[1]: 10", "active": true }, { "val": "diff[2]: 0" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: 0" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pentru primul update, scădem $10$ la poziția imediat următoare intervalului $R + 1 = 4$: `diff[4] -= 10`.",
      "blocksVisual": [
        {
          "label": "diff (R+1=4)",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 0" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: -10", "active": true }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Al doilea update: Adăugăm $20$ pe intervalul $[2, 5]$. Adăugăm $20$ la poziția de start $L=2$: `diff[2] += 20`.",
      "blocksVisual": [
        {
          "label": "diff (L=2)",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20", "active": true }, { "val": "diff[3]: 0" }, { "val": "diff[4]: -10" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Pentru al doilea update, scădem $20$ la poziția imediat următoare $R + 1 = 6$: `diff[6] -= 20`.",
      "blocksVisual": [
        {
          "label": "diff (R+1=6)",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: -10" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: -20", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Al treilea update: Adăugăm $5$ pe intervalul $[3, 4]$. Adăugăm $5$ la poziția de start $L=3$: `diff[3] += 5`.",
      "blocksVisual": [
        {
          "label": "diff (L=3)",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20" }, { "val": "diff[3]: 5", "active": true }, { "val": "diff[4]: -10" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: -20" }]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Pentru al treilea update, scădem $5$ la poziția $R + 1 = 5$: `diff[5] -= 5`.",
      "blocksVisual": [
        {
          "label": "diff (R+1=5)",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20" }, { "val": "diff[3]: 5" }, { "val": "diff[4]: -10" }, { "val": "diff[5]: -5", "active": true }, { "val": "diff[6]: -20" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Începem bucla de reconstrucție prin sume parțiale: `arr[i] = arr[i - 1] + diff[i]`. Pornim de la $i = 1$.",
      "blocksVisual": [
        {
          "label": "Buclă i=1",
          "groups": [
            [{ "val": "i = 1", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm `arr[1] = arr[0] + diff[1] = 0 + 10 = 10`.",
      "blocksVisual": [
        {
          "label": "Reconstruire arr[1]",
          "groups": [
            [{ "val": "arr[1]: 10", "active": true }, { "val": "arr[2]: 0" }, { "val": "arr[3]: 0" }, { "val": "arr[4]: 0" }, { "val": "arr[5]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Trecem la următoarea iterație: $i = 2$.",
      "blocksVisual": [
        {
          "label": "Buclă i=2",
          "groups": [
            [{ "val": "i = 2", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm `arr[2] = arr[1] + diff[2] = 10 + 20 = 30`.",
      "blocksVisual": [
        {
          "label": "Reconstruire arr[2]",
          "groups": [
            [{ "val": "arr[1]: 10" }, { "val": "arr[2]: 30", "active": true }, { "val": "arr[3]: 0" }, { "val": "arr[4]: 0" }, { "val": "arr[5]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Trecem la următoarea iterație: $i = 3$.",
      "blocksVisual": [
        {
          "label": "Buclă i=3",
          "groups": [
            [{ "val": "i = 3", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm `arr[3] = arr[2] + diff[3] = 30 + 5 = 35`.",
      "blocksVisual": [
        {
          "label": "Reconstruire arr[3]",
          "groups": [
            [{ "val": "arr[1]: 10" }, { "val": "arr[2]: 30" }, { "val": "arr[3]: 35", "active": true }, { "val": "arr[4]: 0" }, { "val": "arr[5]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Trecem la următoarea iterație: $i = 4$.",
      "blocksVisual": [
        {
          "label": "Buclă i=4",
          "groups": [
            [{ "val": "i = 4", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm `arr[4] = arr[3] + diff[4] = 35 + (-10) = 25`.",
      "blocksVisual": [
        {
          "label": "Reconstruire arr[4]",
          "groups": [
            [{ "val": "arr[1]: 10" }, { "val": "arr[2]: 30" }, { "val": "arr[3]: 35" }, { "val": "arr[4]: 25", "active": true }, { "val": "arr[5]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Trecem la ultima iterație a buclei de reconstrucție: $i = 5$.",
      "blocksVisual": [
        {
          "label": "Buclă i=5",
          "groups": [
            [{ "val": "i = 5", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm `arr[5] = arr[4] + diff[5] = 25 + (-5) = 20`.",
      "blocksVisual": [
        {
          "label": "Reconstruire arr[5]",
          "groups": [
            [{ "val": "arr[1]: 10" }, { "val": "arr[2]: 30" }, { "val": "arr[3]: 35" }, { "val": "arr[4]: 25" }, { "val": "arr[5]: 20", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Începem bucla de afișare pentru elementele finale, de la pozițiile $1$ la $5$.",
      "blocksVisual": [
        {
          "label": "Afișare rezultate",
          "groups": [
            [{ "val": "Afișare", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Afișăm valoarea finală de pe poziția curentă din `arr`.",
      "blocksVisual": [
        {
          "label": "Output",
          "groups": [
            [{ "val": "10 30 35 25 20", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Programul returnează 0 și se încheie cu succes.",
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
        "title": "Range Addition (LeetCode #370)",
        "url": "https://leetcode.com/problems/range-addition/",
        "desc": "Problemă clasică directă de aplicare a vectorului de diferențe."
      }
    ],
    "medium": [
      {
        "title": "Corporate Flight Bookings (LeetCode #1109)",
        "url": "https://leetcode.com/problems/corporate-flight-bookings/",
        "desc": "Aplicație directă a actualizărilor multiple pe intervale de zboruri."
      }
    ],
    "hard": [
      {
        "title": "Describe the Painting (LeetCode #1943)",
        "url": "https://leetcode.com/problems/describe-the-painting/",
        "desc": "Utilizarea tehnicii scanline împreună cu un vector sau map de diferențe pentru culori."
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { arr: [0,0,0,0,0,0], diff: [0,0,0,0,0,0,0], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,0,0,0,0,0,0], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,0,0,0,0,0,0], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,0,0,0,0,0], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,0,0,-10,0,0], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,20,0,-10,0,0], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,20,0,-10,0,-20], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,20,5,-10,0,-20], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,20,5,-10,-5,-20], i: -1 },
        { arr: [0,0,0,0,0,0], diff: [0,10,20,5,-10,-5,-20], i: 1 },
        { arr: [0,10,0,0,0,0], diff: [0,10,20,5,-10,-5,-20], i: 1 },
        { arr: [0,10,0,0,0,0], diff: [0,10,20,5,-10,-5,-20], i: 2 },
        { arr: [0,10,30,0,0,0], diff: [0,10,20,5,-10,-5,-20], i: 2 },
        { arr: [0,10,30,0,0,0], diff: [0,10,20,5,-10,-5,-20], i: 3 },
        { arr: [0,10,30,35,0,0], diff: [0,10,20,5,-10,-5,-20], i: 3 },
        { arr: [0,10,30,35,0,0], diff: [0,10,20,5,-10,-5,-20], i: 4 },
        { arr: [0,10,30,35,25,0], diff: [0,10,20,5,-10,-5,-20], i: 4 },
        { arr: [0,10,30,35,25,0], diff: [0,10,20,5,-10,-5,-20], i: 5 },
        { arr: [0,10,30,35,25,20], diff: [0,10,20,5,-10,-5,-20], i: 5 },
        { arr: [0,10,30,35,25,20], diff: [0,10,20,5,-10,-5,-20], i: 1 },
        { arr: [0,10,30,35,25,20], diff: [0,10,20,5,-10,-5,-20], i: 1 },
        { arr: [0,10,30,35,25,20], diff: [0,10,20,5,-10,-5,-20], i: -1 }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [
        { name: "main()", file: "main.cpp", line: activeLine }
      ];

      vars.push({ name: "N", type: "int", val: "5", expandable: false });
      vars.push({ name: "arr", type: "std::vector<int>", val: "size = 6 {" + curr.arr.join(", ") + "}", expandable: true });
      vars.push({ name: "diff", type: "std::vector<int>", val: "size = 7 {" + curr.diff.join(", ") + "}", expandable: true });

      if (curr.i !== -1) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }

      let inlineVal = "";
      if (curr.i !== -1) inlineVal = "i: " + curr.i;
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { i: -1 }, { i: -1 }, { i: -1 }, { i: -1 }, { i: -1 }, { i: -1 }, { i: -1 }, { i: -1 }, { i: -1 },
        { i: 1 }, { i: 1 }, { i: 2 }, { i: 2 }, { i: 3 }, { i: 3 }, { i: 4 }, { i: 4 }, { i: 5 }, { i: 5 },
        { i: 1 }, { i: 1 }, { i: -1 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 24 && lineNum <= 30) {
        return curr.i !== -1 ? "i: " + curr.i : null;
      }
      return null;
    }
  }
};
