export const data = {
  "presentation": "### Prezentare Generală\n\nProgramarea Dinamică (DP) este o paradigmă de proiectare a algoritmilor utilizată pentru rezolvarea problemelor de optimizare prin descompunerea lor în subprobleme mai simple ale căror soluții sunt combinate pentru a rezolva problema globală. DP se bazează pe două concepte fundamentale:\n\n1. **Substructură optimă (Optimal Substructure):** Soluția optimă a unei probleme de dimensiune mai mare poate fi construită în mod eficient din soluțiile optime ale subproblemelor sale. De exemplu, în determinarea drumului minim între două noduri, orice sub-drum al acestui traseu trebuie să fie, la rândul său, un drum minim.\n2. **Subprobleme care se suprapun (Overlapping Subproblems):** Spațiul subproblemelor este relativ mic, ceea ce înseamnă că algoritmul recursiv rezolvă aceleași subprobleme de mai multe ori. În loc să recalculăm recursiv aceleași stări, salvăm rezultatele deja obținute într-o structură de date.\n\n### Formulare Matematică\nO recurență generală în Programarea Dinamică poate fi exprimată sub forma:\n$$dp[i] = \\mathcal{O}_{j \\in \\text{tranziti(i)}} \\left( dp[j] \\oplus \\text{cost}(j, i) \\right)$$\nunde:\n- $dp[i]$ reprezintă starea curentă.\n- $\\mathcal{O}$ este un operator de optimizare precum $\\min$, $\\max$ sau sumă $\\sum$.\n- $j$ este o stare anterioară din care se poate efectua tranziția.\n- $\\text{cost}(j, i)$ reprezintă costul tranziției de la starea $j$ la starea $i$.\n\n### Abordări de Implementare\n- **Top-Down (Memoizare):** Se pornește de la problema mare, se rezolvă recursiv subproblemele, iar rezultatele sunt salvate într-o structură (vector sau tabel hash) la prima calculare. La apelurile ulterioare, se returnează direct valoarea salvată.\n- **Bottom-Up (Tabulare):** Se rezolvă mai întâi cazurile de bază, iar apoi se iterează prin stări în ordine crescătoare a complexității lor, populând tabela de la cele mai simple subprobleme până la soluția finală.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(\\text{Număr de Stări} \\times \\text{Complexitatea unei Tranziții})$. DP reduce complexitatea de la una exponențială $\\mathcal{O}(2^N)$ sau $\\mathcal{O}(N!)$ la una polinomială (ex. $\\mathcal{O}(N)$ sau $\\mathcal{O}(N^2)$).\n- **Spațiu:** $\\mathcal{O}(\\text{Număr de Stări})$ pentru stocarea structurii de date (memoizare/tabulare). Aceasta poate fi optimizată adesea la $\\mathcal{O}(\\text{Stare Redusă})$ folosind tehnica ecranului rulant (Rolling Array) dacă tranziția curentă depinde doar de un număr limitat de stări anterioare.",
  "variations": "### Variații și Edge Cases\n\n1. **DP pe Șiruri de Caractere:** Alinierea secvențelor, distanța de editare (Edit Distance), Cel Mai Lung Subșir Comun (LCS).\n2. **DP pe Interval (Interval DP):** Determinarea costului optim de combinare a elementelor pe subintervale închise, de tipul $[i, j]$ (ex: înmulțirea optimă de matrice).\n3. **DP pe Arbori (Tree DP):** Calculul stărilor asociate nodurilor dintr-o structură ierarhică prin parcurgeri de tip DFS.\n4. **DP cu Stări Exponențiale (Bitmask DP):** Folosit când numărul de stări este reprezentat sub formă de submulțimi folosind biți (ex: Travelling Salesperson Problem pentru $N \\le 20$).\n5. **Edge Cases Importante:**\n   - Inițializarea corectă a stărilor de bază (ex. $dp[0]$, $dp[1]$).\n   - Evitarea depășirii tipurilor de date (folosirea `long long` sau aplicarea operației modulo $10^9 + 7$ la fiecare pas).\n   - Direcția corectă de parcurgere în tabulare (Bottom-Up) pentru a asigura disponibilitatea stărilor anterioare.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Bioinformatică:** Alinierea secvențelor ADN (algoritmii Needleman-Wunsch și Smith-Waterman).\n- **Compilatoare:** Analiza lexicală și sintactică, potrivirea de regex-uri.\n- **Rețele de Comunicații:** Algoritmi de rutare (Bellman-Ford, Floyd-Warshall) pentru stabilirea celei mai scurte căi cu costuri/lățimi de bandă dinamice.\n- **Economie și Finanțe:** Alocarea optimă a bugetului, probleme de investiții imobiliare și planificare strategică.",
  code: `#include <iostream>
#include <vector>
using namespace std;

int fib(int n, vector<int>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

int main() {
    int n = 5;
    vector<int> memo(n + 1, -1);
    cout << "Fibonacci(" << n << ") = " << fib(n, memo) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 13,
      "text": "Pornim programul. Inițializăm variabila n = 5.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[{ "val": "-1" }, { "val": "-1" }, { "val": "-1" }, { "val": "-1" }, { "val": "-1" }, { "val": "-1" }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Inițializăm vectorul de memoizare cu -1 pentru n + 1 elemente. memo = [-1, -1, -1, -1, -1, -1]",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 15,
      "text": "Apelăm funcția fib(n, memo) pentru n = 5.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm dacă valoarea a fost calculată. memo[5] este -1 (necalculat).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Calculăm recursiv fib(4) ca prim argument din sumă.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm dacă am calculat memo[4]. Este -1.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1", "active": true }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Apelăm recursiv fib(3) din interiorul lui fib(4).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm dacă am calculat memo[3]. Este -1.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1", "active": true }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Apelăm recursiv fib(2) din interiorul lui fib(3).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm dacă am calculat memo[2]. Este -1.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1", "active": true },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Apelăm recursiv fib(1) din interiorul lui fib(2).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Apelăm acum al doilea argument, adică fib(0), din fib(2).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Calculăm fib(2) = fib(1) + fib(0) = 1 + 0 = 1. Salvăm în memo[2] = 1.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1", "active": true },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm valoarea memo[2] = 1.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1", "active": true },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Din fib(3), apelăm al doilea termen fib(1).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Calculăm fib(3) = fib(2) + fib(1) = 1 + 1 = 2. Salvăm memo[3] = 2.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2", "active": true }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm valoarea memo[3] = 2.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2", "active": true }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Din fib(4), apelăm al doilea termen fib(2).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "În fib(2), verificăm memo[2]. memo[2] = 1, adică diferit de -1! Avem cache hit!",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1", "active": true },
            { "val": "2" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Returnăm valoarea memo[2] = 1 direct, fără a mai face apeluri recursive.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1", "active": true },
            { "val": "2" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Calculăm fib(4) = fib(3) + fib(2) = 2 + 1 = 3. Salvăm în memo[4] = 3.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3", "active": true }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm valoarea memo[4] = 3.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3", "active": true }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Din fib(5), apelăm al doilea termen fib(3).",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm memo[3]. memo[3] = 2, deci din nou cache hit!",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2", "active": true }, { "val": "3" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Returnăm memo[3] = 2 direct.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2", "active": true }, { "val": "3" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Calculăm fib(5) = fib(4) + fib(3) = 3 + 2 = 5. Salvăm memo[5] = 5.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3" }, { "val": "5", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm memo[5] = 5.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3" }, { "val": "5", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 15,
      "text": "Afișăm rezultatul final: Fibonacci(5) = 5.",
      "blocksVisual": [
        {
          "label": "Memo Array",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3" }, { "val": "5" }
          ]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Fibonacci DP",
        "url": "https://leetcode.com/problems/fibonacci-number/",
        "desc": "Implementare Memoizare/Tabulare"
      }
    ],
    "medium": [
      {
        "title": "Climbing Stairs",
        "url": "https://leetcode.com/problems/climbing-stairs/",
        "desc": "Fibonacci mascat"
      }
    ],
    "hard": [
      {
        "title": "House Robber",
        "url": "https://leetcode.com/problems/house-robber/",
        "desc": "Alegere DP (ia vs nu ia)"
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "n", type: "int", val: "5", expandable: false });
      
      let memo = [-1, -1, -1, -1, -1, -1];
      if (stepIndex >= 12) memo[2] = 1;
      if (stepIndex >= 15) memo[3] = 2;
      if (stepIndex >= 20) memo[4] = 3;
      if (stepIndex >= 25) memo[5] = 5;
      
      globalVars.push({
        name: "memo",
        type: "std::vector<int>",
        val: `{${memo.map(v => v.toString()).join(", ")}}`,
        expandable: false
      });

      let stack = [];
      if (stepIndex === 0 || stepIndex === 1 || stepIndex === 2 || stepIndex === 27) {
        // Only main
      } else if (stepIndex === 3 || stepIndex === 4) {
        stack = [5];
      } else if (stepIndex === 5 || stepIndex === 6) {
        stack = [5, 4];
      } else if (stepIndex === 7 || stepIndex === 8) {
        stack = [5, 4, 3];
      } else if (stepIndex === 9 || stepIndex === 10) {
        stack = [5, 4, 3, 2];
      } else if (stepIndex === 11) {
        stack = [5, 4, 3, 2, 0];
      } else if (stepIndex === 12 || stepIndex === 13) {
        stack = [5, 4, 3, 2];
      } else if (stepIndex === 14) {
        stack = [5, 4, 3, 1];
      } else if (stepIndex === 15 || stepIndex === 16) {
        stack = [5, 4, 3];
      } else if (stepIndex === 17 || stepIndex === 18) {
        stack = [5, 4, 2];
      } else if (stepIndex === 19) {
        stack = [5, 4];
      } else if (stepIndex === 20 || stepIndex === 21) {
        stack = [5, 4];
      } else if (stepIndex === 22 || stepIndex === 23) {
        stack = [5, 3];
      } else if (stepIndex === 24) {
        stack = [5];
      } else if (stepIndex === 25 || stepIndex === 26) {
        stack = [5];
      }

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 2) ? (13 + stepIndex) : (stepIndex === 27 ? 15 : 15) });
      
      stack.forEach((frameN, idx) => {
        let line = 8;
        if (idx === stack.length - 1) {
          line = activeLine;
        }
        frames.unshift({ name: `fib(n = ${frameN}, memo)`, file: "solution.cpp", line: line });
      });

      if (stack.length > 0) {
        const topN = stack[stack.length - 1];
        vars.push({ name: "n", type: "int", val: topN.toString(), expandable: false });
        inlineVal = `n: ${topN}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let stack = [];
      if (stepIndex === 3 || stepIndex === 4) stack = [5];
      else if (stepIndex === 5 || stepIndex === 6) stack = [5, 4];
      else if (stepIndex === 7 || stepIndex === 8) stack = [5, 4, 3];
      else if (stepIndex === 9 || stepIndex === 10) stack = [5, 4, 3, 2];
      else if (stepIndex === 11) stack = [5, 4, 3, 2, 0];
      else if (stepIndex === 12 || stepIndex === 13) stack = [5, 4, 3, 2];
      else if (stepIndex === 14) stack = [5, 4, 3, 1];
      else if (stepIndex === 15 || stepIndex === 16) stack = [5, 4, 3];
      else if (stepIndex === 17 || stepIndex === 18) stack = [5, 4, 2];
      else if (stepIndex === 19) stack = [5, 4];
      else if (stepIndex === 20 || stepIndex === 21) stack = [5, 4];
      else if (stepIndex === 22 || stepIndex === 23) stack = [5, 3];
      else if (stepIndex === 24) stack = [5];
      else if (stepIndex === 25 || stepIndex === 26) stack = [5];

      if (stack.length > 0) {
        const topN = stack[stack.length - 1];
        if (lineNum === 5 || lineNum === 6 || lineNum === 7 || lineNum === 8 || lineNum === 9) {
          return `n: ${topN}`;
        }
      }
      return null;
    }
  }
};
