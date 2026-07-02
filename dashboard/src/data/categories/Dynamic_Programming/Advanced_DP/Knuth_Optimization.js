const getMatrixAtStep = (stepIdx) => {
  const dpMatrix = [
    ["DP[1]", "0", "·", "·", "·"],
    ["DP[2]", "·", "0", "·", "·"],
    ["DP[3]", "·", "·", "0", "·"],
    ["DP[4]", "·", "·", "·", "0"]
  ];
  const optMatrix = [
    ["OPT[1]", "·", "·", "·", "·"],
    ["OPT[2]", "·", "·", "·", "·"],
    ["OPT[3]", "·", "·", "·", "·"],
    ["OPT[4]", "·", "·", "·", "·"]
  ];
  
  if (stepIdx >= 4) optMatrix[0][1] = "1";
  if (stepIdx >= 5) optMatrix[1][2] = "2";
  if (stepIdx >= 6) optMatrix[2][3] = "3";
  if (stepIdx >= 7) optMatrix[3][4] = "4";
  
  // len = 2, i = 1, j = 2
  if (stepIdx >= 11) dpMatrix[0][2] = "∞";
  if (stepIdx >= 18) dpMatrix[0][2] = "4";
  if (stepIdx >= 19) optMatrix[0][2] = "1";
  
  // len = 2, i = 2, j = 3
  if (stepIdx >= 22) dpMatrix[1][3] = "∞";
  if (stepIdx >= 28) dpMatrix[1][3] = "5";
  if (stepIdx >= 29) optMatrix[1][3] = "2";
  
  // len = 2, i = 3, j = 4
  if (stepIdx >= 30) dpMatrix[2][4] = "∞";
  if (stepIdx >= 34) dpMatrix[2][4] = "6";
  if (stepIdx >= 35) optMatrix[2][4] = "3";
  
  // len = 3, i = 1, j = 3
  if (stepIdx >= 37) dpMatrix[0][3] = "∞";
  if (stepIdx >= 42) { dpMatrix[0][3] = "12"; optMatrix[0][3] = "1"; }
  if (stepIdx >= 45) { dpMatrix[0][3] = "11"; optMatrix[0][3] = "2"; }
  
  // len = 3, i = 2, j = 4
  if (stepIdx >= 46) dpMatrix[1][4] = "∞";
  if (stepIdx >= 50) { dpMatrix[1][4] = "14"; optMatrix[1][4] = "2"; }
  if (stepIdx >= 52) { dpMatrix[1][4] = "13"; optMatrix[1][4] = "3"; }
  
  // len = 4, i = 1, j = 4
  if (stepIdx >= 56) dpMatrix[0][4] = "∞";
  if (stepIdx >= 58) dpMatrix[0][4] = "20";
  if (stepIdx >= 59) optMatrix[0][4] = "2";
  
  return { dpMatrix, optMatrix };
};

const getMatrixVisual = (stepIdx) => {
  const { dpMatrix, optMatrix } = getMatrixAtStep(stepIdx);
  const rows = [...dpMatrix, ...optMatrix];
  const headers = ["i \\ j", "1", "2", "3", "4"];
  
  const activeCells = [];
  const highlightCells = [];
  
  const stepConfigs = [
    null, null, null, null, null, null, null, null, null, null, null,
    // 11..19: i=1, j=2
    { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 },
    { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 }, { i: 1, j: 2, k: 1 },
    // 20..29: i=2, j=3
    null, null, { i: 2, j: 3 }, { i: 2, j: 3 }, { i: 2, j: 3 }, { i: 2, j: 3 }, { i: 2, j: 3, k: 2 }, { i: 2, j: 3, k: 2 }, { i: 2, j: 3, k: 2 }, { i: 2, j: 3, k: 2 },
    // 30..35: i=3, j=4
    { i: 3, j: 4 }, { i: 3, j: 4 }, { i: 3, j: 4 }, { i: 3, j: 4, k: 3 }, { i: 3, j: 4, k: 3 }, { i: 3, j: 4, k: 3 },
    // 36..45: i=1, j=3
    null, { i: 1, j: 3 }, { i: 1, j: 3 }, { i: 1, j: 3 }, { i: 1, j: 3, k: 1 }, { i: 1, j: 3, k: 1 }, { i: 1, j: 3, k: 1 }, { i: 1, j: 3, k: 2 }, { i: 1, j: 3, k: 2 }, { i: 1, j: 3, k: 2 },
    // 46..52: i=2, j=4
    { i: 2, j: 4 }, { i: 2, j: 4 }, { i: 2, j: 4 }, { i: 2, j: 4, k: 2 }, { i: 2, j: 4, k: 2 }, { i: 2, j: 4, k: 3 }, { i: 2, j: 4, k: 3 },
    // 53..62: i=1, j=4
    null, { i: 1, j: 4 }, { i: 1, j: 4 }, { i: 1, j: 4 }, { i: 1, j: 4, k: 2 }, { i: 1, j: 4, k: 2 }, { i: 1, j: 4, k: 2 }, { i: 1, j: 4, k: 3 }, { i: 1, j: 4, k: 3 }, { i: 1, j: 4, k: 3 },
    null
  ];
  
  const cfg = stepConfigs[stepIdx];
  if (cfg) {
    activeCells.push({ r: cfg.i - 1, c: cfg.j });
    activeCells.push({ r: cfg.i - 1 + 4, c: cfg.j });
    
    if (cfg.k !== undefined) {
      highlightCells.push({ r: cfg.i - 1, c: cfg.k });
      highlightCells.push({ r: cfg.k, c: cfg.j });
    }
  }
  
  return {
    title: "Tabelul DP (linii 1-4) & split-uri OPT (linii 5-8)",
    headers,
    rows,
    activeCells,
    highlightCells
  };
};

const explanations = [
  {
    line: 8,
    text: "Inițializăm numărul de elemente/intervale $n = 4$."
  },
  {
    line: 9,
    text: "Definim pozițiile de tăiere ale grinzii $a = \\{0, 2, 4, 7, 10\\}$."
  },
  {
    line: 10,
    text: "Inițializăm matricea $dp$ de dimensiune $5 \\times 5$ cu $0$."
  },
  {
    line: 11,
    text: "Inițializăm matricea $opt$ de dimensiune $5 \\times 5$ cu $0$."
  },
  {
    line: 13,
    text: "Inițializăm cazurile de bază: pentru intervalele de lungime 1, punctul de divizare optim $opt[1][1]$ este $1$."
  },
  {
    line: 13,
    text: "Punctul de divizare optim $opt[2][2]$ este $2$."
  },
  {
    line: 13,
    text: "Punctul de divizare optim $opt[3][3]$ este $3$."
  },
  {
    line: 13,
    text: "Punctul de divizare optim $opt[4][4]$ este $4$."
  },
  {
    line: 17,
    text: "Începem bucla exterioară pentru lungimea intervalelor: `len = 2`."
  },
  {
    line: 18,
    text: "Buclele interioare încep cu capătul stâng `i = 1`."
  },
  {
    line: 19,
    text: "Calculăm capătul drept al intervalului: `j = i + len - 1 = 2`."
  },
  {
    line: 20,
    text: "Inițializăm `dp[1][2]` cu o valoare infinită ($10^9$) înainte de căutarea minimului."
  },
  {
    line: 21,
    text: "Calculăm costul tăierii pentru intervalul $[1, 2]$: `cost = a[2] - a[0] = 4 - 0 = 4`."
  },
  {
    line: 23,
    text: "Conform optimizării Knuth, căutăm punctul de split $k$ începând de la `k_start = opt[i][j-1] = opt[1][1] = 1`."
  },
  {
    line: 24,
    text: "Limita superioară pentru căutare este `k_end = opt[i+1][j] = opt[2][2] = 2`."
  },
  {
    line: 26,
    text: "Testăm prima valoare pentru split: `k = 1`. Îndeplinește condiția $k \\le k\\_end$ și $k < j$ ($1 \\le 2$ și $1 < 2$)."
  },
  {
    line: 27,
    text: "Calculăm costul tranziției: `val = dp[1][1] + dp[2][2] + cost = 0 + 0 + 4 = 4`."
  },
  {
    line: 28,
    text: "Verificăm dacă `val < dp[1][2]` ($4 < 10^9$), condiție adevărată."
  },
  {
    line: 29,
    text: "Actualizăm `dp[1][2] = 4`."
  },
  {
    line: 30,
    text: "Actualizăm split-ul optim `opt[1][2] = 1`."
  },
  {
    line: 18,
    text: "Trecem la următorul capăt stâng: `i = 2`."
  },
  {
    line: 19,
    text: "Capătul drept este `j = 3`."
  },
  {
    line: 20,
    text: "Inițializăm `dp[2][3] = 1e9`."
  },
  {
    line: 21,
    text: "Costul tăierii este `cost = a[3] - a[1] = 7 - 2 = 5`."
  },
  {
    line: 23,
    text: "Intervalul de căutare pentru $k$ începe de la `k_start = opt[2][2] = 2`."
  },
  {
    line: 24,
    text: "Se termină la `k_end = opt[3][3] = 3`."
  },
  {
    line: 26,
    text: "Testăm `k = 2`. Valoarea este validă ($2 < 3$)."
  },
  {
    line: 27,
    text: "Obținem `val = dp[2][2] + dp[3][3] + 5 = 5`."
  },
  {
    line: 29,
    text: "Actualizăm `dp[2][3] = 5`."
  },
  {
    line: 30,
    text: "Actualizăm split-ul optim `opt[2][3] = 2`."
  },
  {
    line: 18,
    text: "Următorul interval: `i = 3`, `j = 4`."
  },
  {
    line: 21,
    text: "Costul este `cost = a[4] - a[2] = 10 - 4 = 6`."
  },
  {
    line: 23,
    text: "Intervalul pentru $k$ este `[opt[3][3], opt[4][4]] = [3, 4]`."
  },
  {
    line: 26,
    text: "Testăm `k = 3`. Calculăm `val = dp[3][3] + dp[4][4] + cost = 0 + 0 + 6 = 6`."
  },
  {
    line: 29,
    text: "Actualizăm `dp[3][4] = 6`."
  },
  {
    line: 30,
    text: "Actualizăm `opt[3][4] = 3`."
  },
  {
    line: 17,
    text: "Trecem la lungimea `len = 3`."
  },
  {
    line: 18,
    text: "Începem cu `i = 1`, deci `j = i + len - 1 = 3`."
  },
  {
    line: 21,
    text: "Costul este `cost = a[3] - a[0] = 7 - 0 = 7`."
  },
  {
    line: 23,
    text: "Optimizarea Knuth ne indică să căutăm $k$ în intervalul `[opt[1][2], opt[2][3]] = [1, 2]`."
  },
  {
    line: 26,
    text: "Testăm prima tranziție `k = 1`."
  },
  {
    line: 27,
    text: "Calculăm costul pentru split în $1$: `val = dp[1][1] + dp[2][3] + 7 = 0 + 5 + 7 = 12`."
  },
  {
    line: 29,
    text: "Setăm temporar `dp[1][3] = 12` și `opt[1][3] = 1`."
  },
  {
    line: 26,
    text: "Testăm a doua tranziție `k = 2`."
  },
  {
    line: 27,
    text: "Calculăm costul pentru split în $2$: `val = dp[1][2] + dp[3][3] + 7 = 4 + 0 + 7 = 11`."
  },
  {
    line: 29,
    text: "Deoarece $11 < 12$, actualizăm `dp[1][3] = 11`."
  },
  {
    line: 30,
    text: "Actualizăm și split-ul optim `opt[1][3] = 2`."
  },
  {
    line: 18,
    text: "Trecem la intervalul următor: `i = 2`, `j = 4`."
  },
  {
    line: 21,
    text: "Costul este `cost = a[4] - a[1] = 10 - 2 = 8`."
  },
  {
    line: 23,
    text: "Căutăm $k$ în intervalul `[opt[2][3], opt[3][4]] = [2, 3]`."
  },
  {
    line: 26,
    text: "Testăm `k = 2`. `val = dp[2][2] + dp[3][4] + 8 = 0 + 6 + 8 = 14`."
  },
  {
    line: 29,
    text: "Setăm temporar `dp[2][4] = 14` și `opt[2][4] = 2`."
  },
  {
    line: 26,
    text: "Testăm `k = 3`. `val = dp[2][3] + dp[4][4] + 8 = 5 + 0 + 8 = 13`."
  },
  {
    line: 29,
    text: "Deoarece $13 < 14$, actualizăm `dp[2][4] = 13`."
  },
  {
    line: 30,
    text: "Actualizăm split-ul optim `opt[2][4] = 3`."
  },
  {
    line: 17,
    text: "Trecem la lungimea maximă a intervalului: `len = 4`."
  },
  {
    line: 18,
    text: "Avem un singur interval: `i = 1`, `j = 4`."
  },
  {
    line: 21,
    text: "Costul total al primei tăieri este `cost = a[4] - a[0] = 10 - 0 = 10`."
  },
  {
    line: 23,
    text: "Knuth optimizează căutarea lui $k$ la intervalul `[opt[1][3], opt[2][4]] = [2, 3]`."
  },
  {
    line: 26,
    text: "Testăm `k = 2`. Calculăm `val = dp[1][2] + dp[3][4] + 10 = 4 + 6 + 10 = 20`."
  },
  {
    line: 29,
    text: "Actualizăm `dp[1][4] = 20`."
  },
  {
    line: 30,
    text: "Actualizăm split-ul optim `opt[1][4] = 2`."
  },
  {
    line: 26,
    text: "Testăm a doua valoare: `k = 3`."
  },
  {
    line: 27,
    text: "Calculăm costul: `val = dp[1][3] + dp[4][4] + 10 = 11 + 0 + 10 = 21`."
  },
  {
    line: 28,
    text: "Deoarece $21 \\ge 20$, nu actualizăm valoarea minimă."
  },
  {
    line: 36,
    text: "Am calculat cu succes costul optim de tăiere pentru întreaga grindă: `dp[1][4] = 20`. Programul se termină."
  }
];

explanations.forEach((exp, idx) => {
  exp.matrix = getMatrixVisual(idx);
});

export const data = {
  presentation: `### Optimizarea Knuth (Knuth's DP Optimization)

Optimizarea Knuth este o tehnică avansată de programare dinamică utilizată pentru a reduce complexitatea de timp de la $O(N^3)$ la $O(N^2)$ pentru ecuații de recurență de tipul:

$$dp[i][j] = \\min_{i \\le k < j} \\{ dp[i][k] + dp[k+1][j] \\} + cost(i, j)$$

Această optimizare se aplică atunci când funcția de cost și punctele de divizare optimă satisfac anumite proprietăți matematice de monotonie.

### Condiții de Aplicabilitate

Pentru a putea aplica optimizarea Knuth, funcția $cost(i, j)$ trebuie să satisfacă două condiții pentru orice $a \\le b \\le c \\le d$:

1. **Inegalitatea Patrulaterului (Quadrangle Inequality):**
   $$cost(a, c) + cost(b, d) \\le cost(a, d) + cost(b, c)$$
   Aceasta înseamnă că costul combinării unor intervale suprapuse este mai mic sau egal cu costul combinării intervalelor incluse unul în celălalt.

2. **Monotonie:**
   $$cost(b, c) \\le cost(a, d)$$
   Adică, costul unui subinterval este mai mic sau egal cu costul intervalului mai mare care îl conține.

### Proprietatea Punctului Optic de Divizare

Dacă funcția de cost satisface condițiile de mai sus, atunci și matricea de stări $dp$ satisface inegalitatea patrulaterului. Ca o consecință directă, punctul optim de divizare $opt[i][j]$ (valoarea lui $k$ care minimizează expresia) respectă următoarea monotonie:

$$opt[i][j-1] \\le opt[i][j] \\le opt[i+1][j]$$

Datorită acestei proprietăți, în loc să căutăm punctul de divizare $k$ în întreg intervalul $[i, j-1]$, putem restrânge căutarea la intervalul $[opt[i][j-1], opt[i+1][j]]$.

### Analiza Complexității

Suma tuturor stărilor verificate pentru o lungime fixă $len = j - i + 1$ devine o sumă telescopică:
$$\\sum_{i=1}^{N - len + 1} (opt[i+1][j] - opt[i][j-1] + 1) = opt[N - len + 2][N] - opt[1][len-1] + N \\le 2N$$
Prin urmare, pentru fiecare lungime $len$, numărul total de operații este $O(N)$. Deoarece există $N$ lungimi posibile, complexitatea totală de timp se reduce la $O(N^2)$.`,

  complexity: `### Complexitate

- **Timp:** $O(N^2)$ — numărul de stări este $O(N^2)$, iar datorită optimizării Knuth, numărul mediu de tranziții verificate per stare este amortizat $O(1)$.
- **Spațiu:** $O(N^2)$ — necesar pentru a stoca matricea $dp[i][j]$ și matricea punctelor optime $opt[i][j]$.`,

  variations: `### Variații și Aplicații similare

- **Divide and Conquer Optimization:** Se folosește când recurența este de tipul $dp[i][j] = \\min \\{ dp[i-1][k] + cost(k+1, j) \\}$. Optimizarea Knuth este mai generală deoarece permite tranziții în interiorul aceluiași nivel al DP-ului, dar necesită condiții mai stricte pe inegalitatea patrulaterului.
- **Optimal Binary Search Trees (OBST):** Knuth a introdus inițial această optimizare exact pentru construirea arborilor binari de căutare optimi, unde costul reprezintă frecvențele de căutare.`,

  applications: `### Aplicații Practice

- **Optimal Binary Search Tree (OBST):** Organizarea optimă a unui arbore de căutare binar când cheile au probabilități de acces diferite.
- **Cutting Sticks (MCM / Îmbinarea de intervale):** Minimizarea costului de tăiere sau de îmbinare a $N$ intervale de dimensiuni date (similar cu problema înmulțirii matricelor, dar unde costurile satisfac inegalitatea patrulaterului).`,

  code: `#include <iostream>
#include <vector>
#include <climits>

using namespace std;

int main() {
    int n = 4;
    vector<int> a = {0, 2, 4, 7, 10};
    vector<vector<int>> dp(5, vector<int>(5, 0));
    vector<vector<int>> opt(5, vector<int>(5, 0));
    
    for (int i = 1; i <= n; i++) {
        opt[i][i] = i;
    }
    
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = 1e9;
            int cost = a[j] - a[i - 1];
            
            int k_start = opt[i][j - 1];
            int k_end = opt[i + 1][j];
            
            for (int k = k_start; k <= k_end && k < j; k++) {
                int val = dp[i][k] + dp[k + 1][j] + cost;
                if (val < dp[i][j]) {
                    dp[i][j] = val;
                    opt[i][j] = k;
                }
            }
        }
    }
    
    return 0;
}
`,

  explanations,

  globalVars: [],

  problems: {
    easy: [
      {
        "title": "Cutting Sticks",
        "url": "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=12&page=show_problem&problem=944",
        "desc": "Determinarea costului minim de taiere a unei grinzi."
      }
    ],
    medium: [
      {
        "title": "Optimal Binary Search Tree",
        "url": "https://www.geeksforgeeks.org/optimal-binary-search-tree-dp-24/",
        "desc": "Construirea unui arbore binar de cautare cu cost de acces minim."
      }
    ],
    hard: [
      {
        "title": "Breaking String",
        "url": "https://onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=4329",
        "desc": "Taierea unui sir de caractere la pozitii date cu cost minim de copiere."
      }
    ]
  },

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      const stepVars = [
        { n: 4 }, // 0
        { n: 4 }, // 1
        { n: 4 }, // 2
        { n: 4 }, // 3
        { n: 4, i: 1 }, // 4
        { n: 4, i: 2 }, // 5
        { n: 4, i: 3 }, // 6
        { n: 4, i: 4 }, // 7
        // len = 2
        { n: 4, len: 2 }, // 8
        { n: 4, len: 2, i: 1 }, // 9
        { n: 4, len: 2, i: 1, j: 2 }, // 10
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9" }, // 11
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4 }, // 12
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1 }, // 13
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2 }, // 14
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2, k: 1 }, // 15
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4 }, // 16
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4 }, // 17
        { n: 4, len: 2, i: 1, j: 2, dp_val: "4", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4 }, // 18
        { n: 4, len: 2, i: 1, j: 2, dp_val: "4", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4, opt_val: 1 }, // 19
        // len = 2, i = 2
        { n: 4, len: 2, i: 2 }, // 20
        { n: 4, len: 2, i: 2, j: 3 }, // 21
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9" }, // 22
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5 }, // 23
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2 }, // 24
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2, k_end: 3 }, // 25
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2, k_end: 3, k: 2 }, // 26
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2, k_end: 3, k: 2, val: 5 }, // 27
        { n: 4, len: 2, i: 2, j: 3, dp_val: "5", cost: 5, k_start: 2, k_end: 3, k: 2, val: 5 }, // 28
        { n: 4, len: 2, i: 2, j: 3, dp_val: "5", cost: 5, k_start: 2, k_end: 3, k: 2, val: 5, opt_val: 2 }, // 29
        // len = 2, i = 3
        { n: 4, len: 2, i: 3, j: 4 }, // 30
        { n: 4, len: 2, i: 3, j: 4, cost: 6 }, // 31
        { n: 4, len: 2, i: 3, j: 4, cost: 6, k_start: 3, k_end: 4 }, // 32
        { n: 4, len: 2, i: 3, j: 4, cost: 6, k_start: 3, k_end: 4, k: 3, val: 6 }, // 33
        { n: 4, len: 2, i: 3, j: 4, dp_val: "6", cost: 6, k_start: 3, k_end: 4, k: 3, val: 6 }, // 34
        { n: 4, len: 2, i: 3, j: 4, dp_val: "6", cost: 6, k_start: 3, k_end: 4, k: 3, val: 6, opt_val: 3 }, // 35
        // len = 3
        { n: 4, len: 3 }, // 36
        { n: 4, len: 3, i: 1, j: 3 }, // 37
        { n: 4, len: 3, i: 1, j: 3, cost: 7 }, // 38
        { n: 4, len: 3, i: 1, j: 3, cost: 7, k_start: 1, k_end: 2 }, // 39
        { n: 4, len: 3, i: 1, j: 3, cost: 7, k_start: 1, k_end: 2, k: 1 }, // 40
        { n: 4, len: 3, i: 1, j: 3, cost: 7, k_start: 1, k_end: 2, k: 1, val: 12 }, // 41
        { n: 4, len: 3, i: 1, j: 3, dp_val: "12", cost: 7, k_start: 1, k_end: 2, k: 1, val: 12, opt_val: 1 }, // 42
        { n: 4, len: 3, i: 1, j: 3, dp_val: "12", cost: 7, k_start: 1, k_end: 2, k: 2 }, // 43
        { n: 4, len: 3, i: 1, j: 3, dp_val: "12", cost: 7, k_start: 1, k_end: 2, k: 2, val: 11 }, // 44
        { n: 4, len: 3, i: 1, j: 3, dp_val: "11", cost: 7, k_start: 1, k_end: 2, k: 2, val: 11, opt_val: 2 }, // 45
        // len = 3, i = 2
        { n: 4, len: 3, i: 2, j: 4 }, // 46
        { n: 4, len: 3, i: 2, j: 4, cost: 8 }, // 47
        { n: 4, len: 3, i: 2, j: 4, cost: 8, k_start: 2, k_end: 3 }, // 48
        { n: 4, len: 3, i: 2, j: 4, cost: 8, k_start: 2, k_end: 3, k: 2, val: 14 }, // 49
        { n: 4, len: 3, i: 2, j: 4, dp_val: "14", cost: 8, k_start: 2, k_end: 3, k: 2, val: 14, opt_val: 2 }, // 50
        { n: 4, len: 3, i: 2, j: 4, dp_val: "14", cost: 8, k_start: 2, k_end: 3, k: 3, val: 13 }, // 51
        { n: 4, len: 3, i: 2, j: 4, dp_val: "13", cost: 8, k_start: 2, k_end: 3, k: 3, val: 13, opt_val: 3 }, // 52
        // len = 4
        { n: 4, len: 4 }, // 53
        { n: 4, len: 4, i: 1, j: 4 }, // 54
        { n: 4, len: 4, i: 1, j: 4, cost: 10 }, // 55
        { n: 4, len: 4, i: 1, j: 4, cost: 10, k_start: 2, k_end: 3 }, // 56
        { n: 4, len: 4, i: 1, j: 4, cost: 10, k_start: 2, k_end: 3, k: 2, val: 20 }, // 57
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 2, val: 20 }, // 58
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 2, val: 20, opt_val: 2 }, // 59
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 3 }, // 60
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 3, val: 21 }, // 61
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 3, val: 21 }, // 62
        { n: 4 } // 63
      ];
      
      const curr = stepVars[stepIndex] || stepVars[stepVars.length - 1];
      
      frames.push({ name: "main()", file: "main.cpp", line: activeLine || 8 });
      
      vars.push({ name: "n", type: "int", val: curr.n.toString(), expandable: false });
      
      if (curr.len !== undefined) {
        vars.push({ name: "len", type: "int", val: curr.len.toString(), expandable: false });
      }
      if (curr.i !== undefined) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }
      if (curr.j !== undefined) {
        vars.push({ name: "j", type: "int", val: curr.j.toString(), expandable: false });
      }
      if (curr.cost !== undefined) {
        vars.push({ name: "cost", type: "int", val: curr.cost.toString(), expandable: false });
      }
      if (curr.k_start !== undefined) {
        vars.push({ name: "k_start", type: "int", val: curr.k_start.toString(), expandable: false });
      }
      if (curr.k_end !== undefined) {
        vars.push({ name: "k_end", type: "int", val: curr.k_end.toString(), expandable: false });
      }
      if (curr.k !== undefined) {
        vars.push({ name: "k", type: "int", val: curr.k.toString(), expandable: false });
      }
      if (curr.val !== undefined) {
        vars.push({ name: "val", type: "int", val: curr.val.toString(), expandable: false });
      }
      
      const { dpMatrix, optMatrix } = getMatrixAtStep(stepIndex);
      const dpStr = "{" + dpMatrix.map(row => "{" + row.slice(1).map(x => x === "·" ? "0" : (x === "∞" ? "1e9" : x)).join(", ") + "}").join(", ") + "}";
      const optStr = "{" + optMatrix.map(row => "{" + row.slice(1).map(x => x === "·" ? "0" : x).join(", ") + "}").join(", ") + "}";
      
      vars.push({ name: "dp", type: "vector<vector<int>>", val: dpStr, expandable: true });
      vars.push({ name: "opt", type: "vector<vector<int>>", val: optStr, expandable: true });
      
      let inlineVal = `i: ${curr.i || '?'}, j: ${curr.j || '?'}`;
      if (curr.k !== undefined) inlineVal += `, k: ${curr.k}`;
      if (curr.cost !== undefined) inlineVal += `, cost: ${curr.cost}`;
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const stepVars = [
        { n: 4 }, { n: 4 }, { n: 4 }, { n: 4 },
        { n: 4, i: 1 }, { n: 4, i: 2 }, { n: 4, i: 3 }, { n: 4, i: 4 },
        { n: 4, len: 2 }, { n: 4, len: 2, i: 1 }, { n: 4, len: 2, i: 1, j: 2 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9" }, { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1 }, { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2, k: 1 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "1e9", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "4", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4 },
        { n: 4, len: 2, i: 1, j: 2, dp_val: "4", cost: 4, k_start: 1, k_end: 2, k: 1, val: 4, opt_val: 1 },
        { n: 4, len: 2, i: 2 }, { n: 4, len: 2, i: 2, j: 3 }, { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9" },
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5 }, { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2 },
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2, k_end: 3 },
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2, k_end: 3, k: 2 },
        { n: 4, len: 2, i: 2, j: 3, dp_val: "1e9", cost: 5, k_start: 2, k_end: 3, k: 2, val: 5 },
        { n: 4, len: 2, i: 2, j: 3, dp_val: "5", cost: 5, k_start: 2, k_end: 3, k: 2, val: 5 },
        { n: 4, len: 2, i: 2, j: 3, dp_val: "5", cost: 5, k_start: 2, k_end: 3, k: 2, val: 5, opt_val: 2 },
        { n: 4, len: 2, i: 3, j: 4 }, { n: 4, len: 2, i: 3, j: 4, cost: 6 }, { n: 4, len: 2, i: 3, j: 4, cost: 6, k_start: 3, k_end: 4 },
        { n: 4, len: 2, i: 3, j: 4, cost: 6, k_start: 3, k_end: 4, k: 3, val: 6 },
        { n: 4, len: 2, i: 3, j: 4, dp_val: "6", cost: 6, k_start: 3, k_end: 4, k: 3, val: 6 },
        { n: 4, len: 2, i: 3, j: 4, dp_val: "6", cost: 6, k_start: 3, k_end: 4, k: 3, val: 6, opt_val: 3 },
        { n: 4, len: 3 }, { n: 4, len: 3, i: 1, j: 3 }, { n: 4, len: 3, i: 1, j: 3, cost: 7 },
        { n: 4, len: 3, i: 1, j: 3, cost: 7, k_start: 1, k_end: 2 }, { n: 4, len: 3, i: 1, j: 3, cost: 7, k_start: 1, k_end: 2, k: 1 },
        { n: 4, len: 3, i: 1, j: 3, cost: 7, k_start: 1, k_end: 2, k: 1, val: 12 },
        { n: 4, len: 3, i: 1, j: 3, dp_val: "12", cost: 7, k_start: 1, k_end: 2, k: 1, val: 12, opt_val: 1 },
        { n: 4, len: 3, i: 1, j: 3, dp_val: "12", cost: 7, k_start: 1, k_end: 2, k: 2 },
        { n: 4, len: 3, i: 1, j: 3, dp_val: "12", cost: 7, k_start: 1, k_end: 2, k: 2, val: 11 },
        { n: 4, len: 3, i: 1, j: 3, dp_val: "11", cost: 7, k_start: 1, k_end: 2, k: 2, val: 11, opt_val: 2 },
        { n: 4, len: 3, i: 2, j: 4 }, { n: 4, len: 3, i: 2, j: 4, cost: 8 }, { n: 4, len: 3, i: 2, j: 4, cost: 8, k_start: 2, k_end: 3 },
        { n: 4, len: 3, i: 2, j: 4, cost: 8, k_start: 2, k_end: 3, k: 2, val: 14 },
        { n: 4, len: 3, i: 2, j: 4, dp_val: "14", cost: 8, k_start: 2, k_end: 3, k: 2, val: 14, opt_val: 2 },
        { n: 4, len: 3, i: 2, j: 4, dp_val: "14", cost: 8, k_start: 2, k_end: 3, k: 3 },
        { n: 4, len: 3, i: 2, j: 4, dp_val: "14", cost: 8, k_start: 2, k_end: 3, k: 3, val: 13 },
        { n: 4, len: 3, i: 2, j: 4, dp_val: "13", cost: 8, k_start: 2, k_end: 3, k: 3, val: 13, opt_val: 3 },
        { n: 4, len: 4 }, { n: 4, len: 4, i: 1, j: 4 }, { n: 4, len: 4, i: 1, j: 4, cost: 10 },
        { n: 4, len: 4, i: 1, j: 4, cost: 10, k_start: 2, k_end: 3 }, { n: 4, len: 4, i: 1, j: 4, cost: 10, k_start: 2, k_end: 3, k: 2, val: 20 },
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 2, val: 20 },
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 2, val: 20, opt_val: 2 },
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 3 },
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 3, val: 21 },
        { n: 4, len: 4, i: 1, j: 4, dp_val: "20", cost: 10, k_start: 2, k_end: 3, k: 3, val: 21 },
        { n: 4 }
      ];
      const curr = stepVars[stepIndex];
      if (!curr) return null;
      if (lineNum === 17 && curr.len !== undefined) return `len: ${curr.len}`;
      if (lineNum === 18 && curr.i !== undefined) return `i: ${curr.i}`;
      if (lineNum === 19 && curr.j !== undefined) return `j: ${curr.j}`;
      if (lineNum === 20 && curr.dp_val !== undefined) return `dp[${curr.i}][${curr.j}]: ${curr.dp_val}`;
      if (lineNum === 21 && curr.cost !== undefined) return `cost: ${curr.cost}`;
      if (lineNum === 23 && curr.k_start !== undefined) return `k_start: ${curr.k_start}`;
      if (lineNum === 24 && curr.k_end !== undefined) return `k_end: ${curr.k_end}`;
      if (lineNum === 26 && curr.k !== undefined) return `k: ${curr.k}`;
      if (lineNum === 27 && curr.val !== undefined) return `val: ${curr.val}`;
      if (lineNum === 29 && curr.dp_val !== undefined) return `dp[${curr.i}][${curr.j}]: ${curr.dp_val}`;
      if (lineNum === 30 && curr.opt_val !== undefined) return `opt[${curr.i}][${curr.j}]: ${curr.opt_val}`;
      return null;
    }
  }
};
