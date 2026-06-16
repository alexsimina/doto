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
    if (n <= 1) return n; // Cazuri de baza
    
    // Daca am calculat deja valoarea, o returnam
    if (memo[n] != -1) return memo[n];
    
    // Altfel, calculam recursiv si salvam
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

int main() {
    int n = 5;
    vector<int> memo(n + 1, -1);
    cout << "Fibonacci(" << n << ") = " << fib(n, memo) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 16,
      "text": "Inițializăm vectorul de memoizare cu -1 (semnificând 'necalculat').",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [
            [
              {
                "val": "[-1, -1, -1, -1, -1, -1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Apelăm fib(5).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [
            [
              {
                "val": "fib(5)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "n=5 nu e caz de bază.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [
            [
              {
                "val": "fib(5)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm memo[5]. Este -1, deci mergem mai departe.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [
            [
              {
                "val": "fib(5)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Calculăm fib(4) și fib(3). Prima dată fib(4) intră pe stivă.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [
            [
              {
                "val": "fib(4)",
                "active": true
              },
              {
                "val": "fib(5)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Din fib(4) se apelează fib(3), apoi fib(2), apoi fib(1).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [
            [
              {
                "val": "fib(1)",
                "active": true
              },
              {
                "val": "fib(2)"
              },
              {
                "val": "fib(3)"
              },
              {
                "val": "fib(4)"
              },
              {
                "val": "fib(5)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "fib(1) = 1. Se întoarce la fib(2).",
      "blocksVisual": [
        {
          "label": "fib(1)",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "În fib(2), apelăm acum fib(0), care e 0. Suma e 1+0=1. Salvăm în memo[2]=1.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [
            [
              {
                "val": "[-1, -1, 1, -1, -1, -1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Acum fib(3) calculează fib(3-2)=fib(1) care din nou este caz de bază. Rezultat: 1+1=2. memo[3]=2.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [
            [
              {
                "val": "[-1, -1, 1, 2, -1, -1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "La fib(4), apelăm fib(2).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [
            [
              {
                "val": "fib(2)",
                "active": true
              },
              {
                "val": "fib(4)"
              },
              {
                "val": "fib(5)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Dar fib(2) are memo[2] != -1! Returnăm 1 IMEDIAT, tăind ramura.",
      "blocksVisual": [
        {
          "label": "O(1) Branch!",
          "groups": [
            [
              {
                "val": "Return 1 (Cache)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "memo[4] devine fib(3)+fib(2) = 2+1=3.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [
            [
              {
                "val": "[-1, -1, 1, 2, 3, -1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pentru fib(5), calculăm fib(3). Găsim memo[3]=2 IMEDIAT.",
      "blocksVisual": [
        {
          "label": "O(1) Branch!",
          "groups": [
            [
              {
                "val": "Return 2 (Cache)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Final: memo[5] devine fib(4)+fib(3) = 3+2=5.",
      "blocksVisual": [
        {
          "label": "Memo",
          "groups": [
            [
              {
                "val": "[-1, -1, 1, 2, 3, 5]",
                "active": true
              }
            ]
          ]
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
