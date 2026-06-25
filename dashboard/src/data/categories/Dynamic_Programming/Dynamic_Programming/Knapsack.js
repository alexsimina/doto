export const data = {
  "presentation": "### Prezentare Generală\n\nProblema Rucsacului (0/1 Knapsack) este o problemă clasică de optimizare combinatorică:\n\nAvând o mulțime de $N$ obiecte, fiecare caracterizat de o greutate $wt[i]$ și o valoare $val[i]$, și un rucsac de capacitate maximă $W$, scopul este să selectăm un subset de obiecte astfel încât valoarea lor totală să fie maximă, iar greutatea lor totală să nu depășească capacitatea rucsacului.\n\nFiecare obiect poate fi ales o singură dată (0/1).\n\n#### Formulare DP\nDefinim starea:\n- $dp[i][w]$ = valoarea maximă care poate fi obținută folosind primele $i$ obiecte, având o capacitate disponibilă a rucsacului de exact/maximum $w$.\n\nTranziția se bazează pe decizia de a include sau exclude obiectul $i$:\n1. **Excludem obiectul $i$:** Valoarea rămâne cea obținută din primele $i-1$ obiecte: \n   $$dp[i][w] = dp[i-1][w]$$\n2. **Includem obiectul $i$ (dacă $w \\ge wt[i]$):** Valoarea devine suma dintre valoarea obiectului curent și cea optimă pentru capacitatea rămasă $w - wt[i]$ folosind primele $i-1$ obiecte:\n   $$dp[i][w] = dp[i-1][w - wt[i]] + val[i]$$\n\nFormula de recurență generală:\n$$dp[i][w] = \\max(dp[i-1][w], dp[i-1][w - wt[i]] + val[i])$$\n\n#### Optimizarea Spațiului (Rolling Array)\nDeoarece linia $i$ depinde exclusiv de elementele de pe linia $i-1$, putem reduce dimensiunea spațiului la un singur vector 1D de lungime $W+1$:\n$$dp[w] = \\max(dp[w], dp[w - wt[i]] + val[i])$$\nPentru a evita folosirea aceluiași obiect de mai multe ori (ceea ce ar corespunde problemei Unbounded Knapsack), iterarea capacității $w$ trebuie realizată în sens invers, de la $W$ la $wt[i]$.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(N \\times W)$, unde $N$ este numărul de obiecte și $W$ este capacitatea rucsacului. Deși este polinomial în raport cu parametrii numerici, din punct de vedere computațional este un algoritm pseudo-polinomial (deoarece depinde de valoarea numerică a lui $W$, nu de numărul său de biți).\n- **Spațiu:** $\\mathcal{O}(W)$ prin optimizarea cu vector 1D, sau $\\mathcal{O}(N \\times W)$ dacă este necesară reconstrucția subsetului optim de obiecte selectate.",
  "variations": "### Variații și Edge Cases\n\n1. **Fractional Knapsack:** Obiectele pot fi tăiate (se rezolvă optim cu o strategie Greedy sortând după densitatea de valoare $\\frac{val[i]}{wt[i]}$).\n2. **Unbounded Knapsack:** Fiecare obiect este disponibil în cantități nelimitate (bucla pentru $w$ se parcurge direct, de la $wt[i]$ la $W$).\n3. **Bounded Knapsack:** Fiecare obiect $i$ este disponibil în maximum $c_i$ exemplare (se poate reduce la 0/1 Knapsack prin descompunere binară a cantităților în sub-obiecte).\n4. **Edge Cases:**\n   - Capacitate $W = 0$.\n   - Greutatea unui obiect depășește capacitatea maximă ($wt[i] > W$).\n   - Valori sau greutăți egale cu $0$.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Managementul Portofoliilor:** Selectarea investițiilor care maximizează profitul fără a depăși un buget de risc limitat.\n- **Criptografie:** Criptosistemul Merkle-Hellman bazat pe problema sumei subseturilor (o variație a rucsacului).\n- **Încărcarea Mărfurilor:** Distribuirea eficientă a containerelor în avioane sau nave cargo cu constrângeri stricte de greutate.\n- **Alocarea Resurselor în Cloud:** Plasarea mașinilor virtuale pe serverer fizice cu capacitate fixă de CPU/RAM.",
  code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    // DP array liniarizat (optimizare spatiu O(W))
    vector<int> dp(W + 1, 0);

    // Iteram prin fiecare obiect
    for (int i = 0; i < n; i++) {
        // Traversam capacitatile invers pentru a nu folosi acelasi obiect de doua ori
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }
    return dp[W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    
    cout << "Valoare Maxima = " << knapsack(W, wt, val, val.size()) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 21,
      "text": "Pornim programul. Inițializăm vectorul de valori val = [60, 100, 120] și greutăți wt = [10, 20, 30].",
      "blocksVisual": [
        {
          "label": "Greutati & Valori",
          "groups": [
            [{ "val": "wt[0]=10" }, { "val": "wt[1]=20" }, { "val": "wt[2]=30" }],
            [{ "val": "val[0]=60" }, { "val": "val[1]=100" }, { "val": "val[2]=120" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Setăm capacitatea maximă a rucsacului W = 50.",
      "blocksVisual": [
        {
          "label": "Capacitate",
          "groups": [[{ "val": "W = 50", "active": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Apelăm funcția knapsack(W = 50, wt, val, n = 3).",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [[{ "val": "knapsack(50)", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm vectorul dp de dimensiune W + 1 cu valori de 0. dp[w] = 0.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=0" }, { "val": "dp[40]=0" }, { "val": "dp[50]=0" }
          ]]
        }
      ]
    },
    {
      "line": 11,
      "text": "i = 0. Considerăm primul obiect (wt[0] = 10, val[0] = 60).",
      "blocksVisual": [
        {
          "label": "Obiect Curent",
          "groups": [[{ "val": "wt=10, val=60", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 50: dp[50] devine max(dp[50]=0, dp[40]+60 = 60). dp[50] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=0" }, { "val": "dp[40]=0" }, { "val": "dp[50]=60", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 40: dp[40] devine max(dp[40]=0, dp[30]+60 = 60). dp[40] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=0" }, { "val": "dp[40]=60", "active": true }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 30: dp[30] devine max(dp[30]=0, dp[20]+60 = 60). dp[30] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=0" },
            { "val": "dp[30]=60", "active": true }, { "val": "dp[40]=60" }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 20: dp[20] devine max(dp[20]=0, dp[10]+60 = 60). dp[20] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=0" }, { "val": "dp[20]=60", "active": true },
            { "val": "dp[30]=60" }, { "val": "dp[40]=60" }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 10: dp[10] devine max(dp[10]=0, dp[0]+60 = 60). dp[10] = 60.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60", "active": true }, { "val": "dp[20]=60" },
            { "val": "dp[30]=60" }, { "val": "dp[40]=60" }, { "val": "dp[50]=60" }
          ]]
        }
      ]
    },
    {
      "line": 11,
      "text": "i = 1. Considerăm al doilea obiect (wt[1] = 20, val[1] = 100).",
      "blocksVisual": [
        {
          "label": "Obiect Curent",
          "groups": [[{ "val": "wt=20, val=100", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 50: dp[50] devine max(dp[50]=60, dp[30]+100 = 60+100 = 160). dp[50] = 160.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=60" },
            { "val": "dp[30]=60" }, { "val": "dp[40]=60" }, { "val": "dp[50]=160", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 40: dp[40] devine max(dp[40]=60, dp[20]+100 = 60+100 = 160). dp[40] = 160.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=60" },
            { "val": "dp[30]=60" }, { "val": "dp[40]=160", "active": true }, { "val": "dp[50]=160" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 30: dp[30] devine max(dp[30]=60, dp[10]+100 = 60+100 = 160). dp[30] = 160.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=60" },
            { "val": "dp[30]=160", "active": true }, { "val": "dp[40]=160" }, { "val": "dp[50]=160" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 20: dp[20] devine max(dp[20]=60, dp[0]+100 = 100). dp[20] = 100.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100", "active": true },
            { "val": "dp[30]=160" }, { "val": "dp[40]=160" }, { "val": "dp[50]=160" }
          ]]
        }
      ]
    },
    {
      "line": 11,
      "text": "i = 2. Considerăm al treilea obiect (wt[2] = 30, val[2] = 120).",
      "blocksVisual": [
        {
          "label": "Obiect Curent",
          "groups": [[{ "val": "wt=30, val=120", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 50: dp[50] devine max(dp[50]=160, dp[20]+120 = 100+120 = 220). dp[50] = 220.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100" },
            { "val": "dp[30]=160" }, { "val": "dp[40]=160" }, { "val": "dp[50]=220", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 40: dp[40] devine max(dp[40]=160, dp[10]+120 = 60+120 = 180). dp[40] = 180.",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100" },
            { "val": "dp[30]=160" }, { "val": "dp[40]=180", "active": true }, { "val": "dp[50]=220" }
          ]]
        }
      ]
    },
    {
      "line": 14,
      "text": "w = 30: dp[30] devine max(dp[30]=160, dp[0]+120 = 120). dp[30] = 160 (rămâne neschimbat).",
      "blocksVisual": [
        {
          "label": "dp[0, 10, 20, 30, 40, 50]",
          "groups": [[
            { "val": "dp[0]=0" }, { "val": "dp[10]=60" }, { "val": "dp[20]=100" },
            { "val": "dp[30]=160", "active": true }, { "val": "dp[40]=180" }, { "val": "dp[50]=220" }
          ]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Toate obiectele au fost procesate. Returnăm dp[W] = dp[50] = 220.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [[{ "val": "dp[50]=220", "sorted": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Afișăm rezultatul final: Valoare Maxima = 220.",
      "blocksVisual": [
        {
          "label": "Finalizat",
          "groups": [[{ "val": "220", "sorted": true }]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Rucsac Infoarena",
        "url": "https://www.infoarena.ro/problema/rucsac",
        "desc": "Problema rucsacului standard"
      }
    ],
    "medium": [
      {
        "title": "Coin Change 2",
        "url": "https://leetcode.com/problems/coin-change-2/",
        "desc": "Numărul de moduri de a face suma (Unbounded Knapsack)"
      }
    ],
    "hard": [
      {
        "title": "Target Sum",
        "url": "https://leetcode.com/problems/target-sum/",
        "desc": "DP bazat pe 0/1 Knapsack"
      }
    ]
  },
  "globalVars": [
    {
      "name": "dp",
      "type": "int[105][1005]",
      "val": "DP values grid",
      "expandable": false
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "W", type: "int", val: "50", expandable: false });
      globalVars.push({ name: "wt", type: "const std::vector<int>&", val: "{10, 20, 30}", expandable: false });
      globalVars.push({ name: "val", type: "const std::vector<int>&", val: "{60, 100, 120}", expandable: false });

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 2) ? (21 + (stepIndex === 0 ? 0 : (stepIndex === 1 ? 2 : 4))) : (stepIndex === 20 ? 25 : 25) });

      if (stepIndex >= 3 && stepIndex <= 19) {
        frames.unshift({ name: "knapsack(W = 50, wt, val, n = 3)", file: "solution.cpp", line: activeLine });
      }

      if (stepIndex >= 3 && stepIndex <= 19) {
        let i = -1;
        let w = -1;
        if (stepIndex >= 4 && stepIndex <= 9) { i = 0; }
        else if (stepIndex >= 10 && stepIndex <= 14) { i = 1; }
        else if (stepIndex >= 15 && stepIndex <= 18) { i = 2; }
        
        if (stepIndex === 5) w = 50;
        else if (stepIndex === 6) w = 40;
        else if (stepIndex === 7) w = 30;
        else if (stepIndex === 8) w = 20;
        else if (stepIndex === 9) w = 10;
        else if (stepIndex === 11) w = 50;
        else if (stepIndex === 12) w = 40;
        else if (stepIndex === 13) w = 30;
        else if (stepIndex === 14) w = 20;
        else if (stepIndex === 16) w = 50;
        else if (stepIndex === 17) w = 40;
        else if (stepIndex === 18) w = 30;

        if (i !== -1) vars.push({ name: "i", type: "int", val: i.toString(), expandable: false });
        if (w !== -1) vars.push({ name: "w", type: "int", val: w.toString(), expandable: false });

        let dpVal = "size = 51";
        vars.push({ name: "dp", type: "std::vector<int>", val: dpVal, expandable: true });

        if (i !== -1) {
          vars.push({ name: "wt[i]", type: "int", val: [10, 20, 30][i].toString(), expandable: false });
          vars.push({ name: "val[i]", type: "int", val: [60, 100, 120][i].toString(), expandable: false });
        }

        inlineVal = "";
        if (i !== -1) inlineVal += `i: ${i}`;
        if (w !== -1) inlineVal += `, w: ${w}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex >= 3 && stepIndex <= 19) {
        let i = -1;
        let w = -1;
        if (stepIndex >= 4 && stepIndex <= 9) { i = 0; }
        else if (stepIndex >= 10 && stepIndex <= 14) { i = 1; }
        else if (stepIndex >= 15 && stepIndex <= 18) { i = 2; }
        
        if (stepIndex === 5) w = 50;
        else if (stepIndex === 6) w = 40;
        else if (stepIndex === 7) w = 30;
        else if (stepIndex === 8) w = 20;
        else if (stepIndex === 9) w = 10;
        else if (stepIndex === 11) w = 50;
        else if (stepIndex === 12) w = 40;
        else if (stepIndex === 13) w = 30;
        else if (stepIndex === 14) w = 20;
        else if (stepIndex === 16) w = 50;
        else if (stepIndex === 17) w = 40;
        else if (stepIndex === 18) w = 30;

        if (lineNum === 11 || lineNum === 17) {
          return i !== -1 ? `i: ${i}` : null;
        }
        if (lineNum === 13 || lineNum === 14) {
          let res = "";
          if (i !== -1) res += `i: ${i}`;
          if (w !== -1) res += `, w: ${w}`;
          return res || null;
        }
      }
      return null;
    }
  }
};
