export const data = {
  "presentation": "### Prezentare Generală\n\nProgramarea Dinamică (DP) este o metodă de optimizare algoritmică bazată pe două concepte cheie:\n\n1. Substructură optimă: Soluția optimă a problemei poate fi construită din soluțiile optime ale subproblemelor sale.\n2. Subprobleme care se suprapun: Algoritmul rezolvă aceleași subprobleme de mai multe ori.\n\nPentru a evita recalcularea (care duce la timpi exponențiali în cazul recursivității naive), DP salvează răspunsurile parțiale. Aceasta se poate face în două moduri:\n- Top-Down (Memoizare): Folosim recursivitate, dar salvăm rezultatele într-o memorie (ex: array, hashmap).\n- Bottom-Up (Tabulare): Folosim iterație (for loops) pentru a construi soluția de la cele mai mici subprobleme (cazuri de bază) până la răspunsul final.",
  "complexity": "### Complexitate\n\n- **Timp:** Depinde de numărul de Stări * Complexitatea Tranziției. De cele mai multe ori polinomial, reducând complexități de la O(2^N) la O(N) sau O(N^2).\n- **Spațiu:** O(Număr de stări), dar adesea poate fi optimizat dacă starea curentă depinde doar de linia anterioară (Rolling Arrays).\n",
  "variations": "### Variații și Edge Cases\n\n1. DP pe șiruri de caractere (LCS, Edit Distance)\n2. DP pe vectori/matrici (Subșir crescător, Căi într-o grilă)\n3. DP pe stări exponențiale (Bitmask DP)\n4. DP pe Arbori/Grafuri",
  "applications": "### Aplicații\n\nGăsirea celui mai scurt drum cu constrângeri speciale, alinieri ADN în bioinformatică, probleme de planificare și rucsac, alocări optime de resurse.",
  code: `
#include <iostream>
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
      "line": 17,
      "text": "Pornim programul. Inițializăm variabila n = 5.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "n = 5", "active": true }]]
        }
      ]
    },
    {
      "line": 18,
      "text": "Inițializăm vectorul de memoizare cu -1 pentru n + 1 elemente. memo = [-1, -1, -1, -1, -1, -1]",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 19,
      "text": "Apelăm funcția fib(n, memo) pentru n = 5.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în fib(5). Valoarea n = 5 nu este caz de bază (n <= 1).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă valoarea a fost calculată. memo[5] este -1 (necalculat).",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Calculăm recursiv fib(4) ca prim argument din sumă.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în fib(4). Valoarea n = 4 nu este caz de bază.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă am calculat memo[4]. Este -1.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1" }, { "val": "-1", "active": true }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm recursiv fib(3) din interiorul lui fib(4).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în fib(3). Valoarea n = 3 nu este caz de bază.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă am calculat memo[3]. Este -1.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" },
            { "val": "-1", "active": true }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm recursiv fib(2) din interiorul lui fib(3).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(2)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în fib(2). Valoarea n = 2 nu este caz de bază.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(2)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă am calculat memo[2]. Este -1.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "-1", "active": true },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm recursiv fib(1) din interiorul lui fib(2).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(2)" }, { "val": "fib(1)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "fib(1) este caz de bază (n <= 1). Se returnează valoarea 1.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(2)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm acum al doilea argument, adică fib(0), din fib(2).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(2)" }, { "val": "fib(0)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "fib(0) este caz de bază (n <= 1). Se returnează valoarea 0.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(2)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Calculăm fib(2) = fib(1) + fib(0) = 1 + 0 = 1. Salvăm în memo[2] = 1.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1", "active": true },
            { "val": "-1" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Returnăm valoarea memo[2] = 1.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Din fib(3), apelăm al doilea termen fib(1).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }, { "val": "fib(1)", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "fib(1) este caz de bază. Returnează valoarea 1.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(3)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Calculăm fib(3) = fib(2) + fib(1) = 1 + 1 = 2. Salvăm memo[3] = 2.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2", "active": true }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Returnăm valoarea memo[3] = 2.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Din fib(4), apelăm al doilea termen fib(2).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }, { "val": "fib(2)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "În fib(2), verificăm memo[2]. memo[2] = 1, adică diferit de -1! Avem cache hit!",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1", "active": true },
            { "val": "2" }, { "val": "-1" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm valoarea memo[2] = 1 direct, fără a mai face apeluri recursive.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(4)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Calculăm fib(4) = fib(3) + fib(2) = 2 + 1 = 3. Salvăm în memo[4] = 3.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3", "active": true }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Returnăm valoarea memo[4] = 3.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Din fib(5), apelăm al doilea termen fib(3).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }, { "val": "fib(3)", "active": true }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm memo[3]. memo[3] = 2, deci din nou cache hit!",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2", "active": true }, { "val": "3" }, { "val": "-1" }
          ]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm memo[3] = 2 direct.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{ "val": "fib(5)" }]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Calculăm fib(5) = fib(4) + fib(3) = 3 + 2 = 5. Salvăm memo[5] = 5.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [[
            { "val": "-1" }, { "val": "-1" }, { "val": "1" },
            { "val": "2" }, { "val": "3" }, { "val": "5", "active": true }
          ]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Returnăm memo[5] = 5.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 19,
      "text": "Afișăm rezultatul final: Fibonacci(5) = 5.",
      "blocksVisual": [
        {
          "label": "Finalizat",
          "groups": [[{ "val": "5", "sorted": true }]]
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
  }
};
