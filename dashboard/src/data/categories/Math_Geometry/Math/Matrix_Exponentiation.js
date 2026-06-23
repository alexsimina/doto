export const data = {
  "presentation": `### Prezentare Generală

Exponentierea de matrice este o tehnică algoritmică avansată utilizată pentru a calcula rapid termeni din recurențe liniare (cum ar fi șirul lui Fibonacci sau recurențe mai complexe) și drumuri în grafuri.

Dacă o recurență liniară poate fi exprimată sub forma unei relații matriceale:
$$ X_{n} = T \\cdot X_{n-1} $$
unde $T$ este o matrice de tranziție de dimensiune $K \\times K$, atunci prin inducție obținem:
$$ X_{n} = T^{n-1} \\cdot X_1 $$

Folosind algoritmul de exponentiere rapidă aplicat pe înmulțirea matricelor, putem calcula $T^{n-1}$ în timp logaritmic. În loc de $O(n)$ înmulțiri succesive de vectori, obținem o complexitate de $O(K^3 \\log n)$ unde $K$ este dimensiunea matricei.`,
  "complexity": `### Complexitate

Pentru o matrice de tranziție de dimensiune $K \\times K$ și o putere $N$:
- **Timp:** $O(K^3 \\log N)$ — ridicarea la putere durează $\\log N$ pași, iar fiecare pas implică înmulțirea a două matrice de dimensiune $K \\times K$, care are o complexitate de $O(K^3)$.
- **Spațiu:** $O(K^2)$ — memoria necesară pentru a stoca rezultatele temporare ale matricelor ridicate la pătrat.`,
  "variations": `### Variații și Edge Cases

1. **Matricea Identitate ca element neutru:** Rezultatul ridicării la puterea $0$ a oricărei matrice este Matricea Identitate $I_K$ (care are $1$ pe diagonala principală și $0$ în rest).
2. **Dimensiune variabilă $K$:** Pentru $K$ mare (ex. $K > 100$), înmulțirea standard $O(K^3)$ poate fi prea lentă, necesitând tehnici speciale de optimizare sau utilizarea structurilor de date sparse dacă tranzitiile sunt rare.
3. **Căi în grafuri:** Matricea de adiacență a unui graf neorientat ridicată la puterea $P$ ne indică numărul de drumuri de lungime $P$ între oricare două noduri.`,
  "applications": `### Aplicații

- Determinarea celui de-al $N$-lea termen din șirul lui Fibonacci pentru $N \\le 10^{18}$.
- Determinarea numărului de drumuri de lungime exactă $L$ într-un graf între două noduri.
- Rezolvarea problemelor de programare dinamică cu recurențe liniare și stări limitate, unde $N$ este foarte mare.`,
  "code": `
#include <iostream>
#include <vector>

using namespace std;

typedef vector<vector<long long>> Matrix;

Matrix multiply(Matrix A, Matrix B, long long mod) {
    Matrix C = {{0, 0}, {0, 0}};
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 2; ++j) {
            for (int k = 0; k < 2; ++k) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
            }
        }
    }
    return C;
}

Matrix power(Matrix A, long long p, long long mod) {
    Matrix res = {{1, 0}, {0, 1}}; // Matricea identitate
    while (p > 0) {
        if (p % 2 == 1) {
            res = multiply(res, A, mod);
        }
        A = multiply(A, A, mod);
        p /= 2;
    }
    return res;
}

int main() {
    Matrix T = {{1, 1}, {1, 0}}; // Matricea de tranzitie Fibonacci
    Matrix T_pow = power(T, 5, 1000000007);
    cout << "F_6 = " << T_pow[0][0] << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 35,
      "text": "Apelăm funcția `power(T, 5, 1000000007)` pentru a calcula matricea de tranziție Fibonacci $T$ ridicată la puterea $5$ modulo $10^9+7$.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              { "val": "p = 5", "active": true },
              { "val": "mod = 10^9+7" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": "-" }, { "val": "-" }],
          [{ "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": "-" }, { "val": "-" }]
        ]
      }
    },
    {
      "line": 22,
      "text": "Inițializăm matricea `res` cu Matricea Identitate $I_2$: `{{1, 0}, {0, 1}}`. Aceasta acționează ca elementul neutru la înmulțirea matricelor.",
      "blocksVisual": [
        {
          "label": "res",
          "groups": [
            [
              { "val": "1" }, { "val": "0" }
            ],
            [
              { "val": "0" }, { "val": "1" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1, "highlight": true }, { "val": 0, "highlight": true }],
          [{ "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 0, "highlight": true }, { "val": 1, "highlight": true }]
        ]
      }
    },
    {
      "line": 23,
      "text": "Intrăm în bucla `while`. Deoarece exponentul `p = 5` este strict mai mare decât $0$, bucla se va executa.",
      "blocksVisual": [
        {
          "label": "Condiție",
          "groups": [
            [
              { "val": "p = 5 > 0? DA", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 0 }],
          [{ "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 0 }, { "val": 1 }]
        ]
      }
    },
    {
      "line": 24,
      "text": "Verificăm dacă exponentul curent `p` este impar: `5 % 2 == 1` este adevărat.",
      "blocksVisual": [
        {
          "label": "Paritate",
          "groups": [
            [
              { "val": "5 % 2 = 1 (impar)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 0 }],
          [{ "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 0 }, { "val": 1 }]
        ]
      }
    },
    {
      "line": 25,
      "text": "Înmulțim rezultatul curent cu matricea $A$: `res = multiply(res, A)`. `res` devine `{{1, 1}, {1, 0}}`.",
      "blocksVisual": [
        {
          "label": "res după multiply",
          "groups": [
            [
              { "val": "1", "sorted": true }, { "val": "1", "sorted": true }
            ],
            [
              { "val": "1", "sorted": true }, { "val": "0", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1, "highlight": true }, { "val": 1, "highlight": true }],
          [{ "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1, "highlight": true }, { "val": 0, "highlight": true }]
        ]
      }
    },
    {
      "line": 27,
      "text": "Ridicăm la pătrat matricea de bază: `A = multiply(A, A)`. Valoarea lui `A` devine `{{2, 1}, {1, 1}}`.",
      "blocksVisual": [
        {
          "label": "A la pătrat",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "1", "sorted": true }
            ],
            [
              { "val": "1", "sorted": true }, { "val": "1", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 2, "highlight": true }, { "val": 1, "highlight": true }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 1, "highlight": true }, { "val": 1, "highlight": true }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 28,
      "text": "Împărțim întreg exponentul `p` la $2$: `p = 5 / 2 = 2`.",
      "blocksVisual": [
        {
          "label": "p actualizat",
          "groups": [
            [
              { "val": "p = 2", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 2 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 23,
      "text": "Evaluăm din nou condiția buclei. Exponentul `p = 2 > 0` menține execuția buclei.",
      "blocksVisual": [
        {
          "label": "Condiție",
          "groups": [
            [
              { "val": "p = 2 > 0? DA", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 2 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 24,
      "text": "Verificăm paritatea lui `p = 2`. Deoarece este par, condiția `if` este falsă și nu se execută înmulțirea în `res`.",
      "blocksVisual": [
        {
          "label": "Paritate",
          "groups": [
            [
              { "val": "2 % 2 = 0 (par)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 2 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 27,
      "text": "Ridicăm din nou matricea `A` la pătrat: `A = multiply(A, A)`. `A` devine `{{5, 3}, {3, 2}}`.",
      "blocksVisual": [
        {
          "label": "A la pătrat",
          "groups": [
            [
              { "val": "5", "sorted": true }, { "val": "3", "sorted": true }
            ],
            [
              { "val": "3", "sorted": true }, { "val": "2", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 5, "highlight": true }, { "val": 3, "highlight": true }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 3, "highlight": true }, { "val": 2, "highlight": true }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 28,
      "text": "Înjumătățim exponentul: `p = 2 / 2 = 1`.",
      "blocksVisual": [
        {
          "label": "p actualizat",
          "groups": [
            [
              { "val": "p = 1", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 5 }, { "val": 3 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 3 }, { "val": 2 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 23,
      "text": "A treia iterație. Exponentul `p = 1 > 0` continuă bucla.",
      "blocksVisual": [
        {
          "label": "Condiție",
          "groups": [
            [
              { "val": "p = 1 > 0? DA", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 5 }, { "val": 3 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 3 }, { "val": 2 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 24,
      "text": "Deoarece `p = 1` este impar, vom actualiza rezultatul.",
      "blocksVisual": [
        {
          "label": "Paritate",
          "groups": [
            [
              { "val": "1 % 2 = 1 (impar)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 5 }, { "val": 3 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 1 }, { "val": 1 }],
          [{ "val": 3 }, { "val": 2 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 1 }, { "val": 0 }]
        ]
      }
    },
    {
      "line": 25,
      "text": "Înmulțim `res` cu `A`: `res = multiply(res, A)`. Noua valoare din `res` devine `{{8, 5}, {5, 3}}`.",
      "blocksVisual": [
        {
          "label": "res final",
          "groups": [
            [
              { "val": "8", "sorted": true }, { "val": "5", "sorted": true }
            ],
            [
              { "val": "5", "sorted": true }, { "val": "3", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 5 }, { "val": 3 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 8, "highlight": true }, { "val": 5, "highlight": true }],
          [{ "val": 3 }, { "val": 2 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 5, "highlight": true }, { "val": 3, "highlight": true }]
        ]
      }
    },
    {
      "line": 27,
      "text": "Actualizăm `A` ridicându-l din nou la pătrat pentru consistență: `A` devine `{{34, 21}, {21, 13}}`.",
      "blocksVisual": [
        {
          "label": "A actualizat",
          "groups": [
            [
              { "val": "34" }, { "val": "21" }
            ],
            [
              { "val": "21" }, { "val": "13" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 34, "highlight": true }, { "val": 21, "highlight": true }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 8 }, { "val": 5 }],
          [{ "val": 21, "highlight": true }, { "val": 13, "highlight": true }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 5 }, { "val": 3 }]
        ]
      }
    },
    {
      "line": 28,
      "text": "Înjumătățim exponentul: `p = 1 / 2 = 0`.",
      "blocksVisual": [
        {
          "label": "p actualizat",
          "groups": [
            [
              { "val": "p = 0", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 34 }, { "val": 21 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 8 }, { "val": 5 }],
          [{ "val": 21 }, { "val": 13 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 5 }, { "val": 3 }]
        ]
      }
    },
    {
      "line": 23,
      "text": "Deoarece `p = 0`, bucla `while` se încheie.",
      "blocksVisual": [
        {
          "label": "Condiție",
          "groups": [
            [
              { "val": "p = 0 (Oprire)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 34 }, { "val": 21 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 8 }, { "val": 5 }],
          [{ "val": 21 }, { "val": 13 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 5 }, { "val": 3 }]
        ]
      }
    },
    {
      "line": 30,
      "text": "Returnăm matricea rezultat `res`. Elementul de pe poziția `[0][0]` este al 6-lea număr Fibonacci ($F_6 = 8$).",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              { "val": "F_6 = 8", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Matrice: A (baza) | T (tranzitie) | res (rezultat)",
        "headers": ["A_00", "A_01", "|", "T_00", "T_01", "|", "res_00", "res_01"],
        "rows": [
          [{ "val": 34 }, { "val": 21 }, { "val": "|" }, { "val": 1 }, { "val": 1 }, { "val": "|" }, { "val": 8, "highlight": true }, { "val": 5 }],
          [{ "val": 21 }, { "val": 13 }, { "val": "|" }, { "val": 1 }, { "val": 0 }, { "val": "|" }, { "val": 5 }, { "val": 3 }]
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Fibonacci Number",
        "url": "https://leetcode.com/problems/fibonacci-number/",
        "desc": "Calculează al N-lea număr Fibonacci utilizând o matrice de tranziție."
      }
    ],
    "medium": [
      {
        "title": "FIBOSUM",
        "url": "https://www.spoj.com/problems/FIBOSUM/",
        "desc": "Calculează suma numerelor Fibonacci de la N la M modulo 10^9 + 7."
      }
    ],
    "hard": [
      {
        "title": "Graph Paths I",
        "url": "https://cses.fi/problemset/task/1723/",
        "desc": "Determină numărul de drumuri distincte de lungime exactă K între nodul 1 și nodul N într-un graf orientat."
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
        { f: [{ name: 'main()', file: 'main.cpp', line: 61 }], v: [] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 22 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 5 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,0],[0,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 23 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 5 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,0],[0,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 24 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 5 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,0],[0,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 25 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 5 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 27 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 5 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[2,1],[1,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 28 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 2 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[2,1],[1,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 23 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 2 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[2,1],[1,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 24 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 2 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[2,1],[1,1]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 27 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 2 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[5,3],[3,2]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 28 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[5,3],[3,2]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 23 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[5,3],[3,2]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 24 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[1,1],[1,0]]' }, { name: 'A', type: 'Matrix', val: '[[5,3],[3,2]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 25 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[8,5],[5,3]]' }, { name: 'A', type: 'Matrix', val: '[[5,3],[3,2]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 27 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 1 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[8,5],[5,3]]' }, { name: 'A', type: 'Matrix', val: '[[34,21],[21,13]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 28 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 0 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[8,5],[5,3]]' }, { name: 'A', type: 'Matrix', val: '[[34,21],[21,13]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 23 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 0 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[8,5],[5,3]]' }, { name: 'A', type: 'Matrix', val: '[[34,21],[21,13]]' }] },
        { f: [{ name: 'power(T, 5, 1000000007)', file: 'main.cpp', line: 30 }, { name: 'main()', file: 'main.cpp', line: 61 }], v: [{ name: 'p', type: 'long long', val: 0 }, { name: 'mod', type: 'long long', val: 1000000007 }, { name: 'res', type: 'Matrix', val: '[[8,5],[5,3]]' }, { name: 'A', type: 'Matrix', val: '[[34,21],[21,13]]' }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0) {
        inlineVal = "p: " + vars.find(v => v.name === 'p').val + ", res: " + vars.find(v => v.name === 'res').val;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const varsAtStep = [
        { p: 5, res: '[[1,0],[0,1]]', A: '[[1,1],[1,0]]' },
        { p: 5, res: '[[1,0],[0,1]]', A: '[[1,1],[1,0]]' },
        { p: 5, res: '[[1,0],[0,1]]', A: '[[1,1],[1,0]]' },
        { p: 5, res: '[[1,0],[0,1]]', A: '[[1,1],[1,0]]' },
        { p: 5, res: '[[1,1],[1,0]]', A: '[[1,1],[1,0]]' },
        { p: 5, res: '[[1,1],[1,0]]', A: '[[2,1],[1,1]]' },
        { p: 2, res: '[[1,1],[1,0]]', A: '[[2,1],[1,1]]' },
        { p: 2, res: '[[1,1],[1,0]]', A: '[[2,1],[1,1]]' },
        { p: 2, res: '[[1,1],[1,0]]', A: '[[2,1],[1,1]]' },
        { p: 2, res: '[[1,1],[1,0]]', A: '[[5,3],[3,2]]' },
        { p: 1, res: '[[1,1],[1,0]]', A: '[[5,3],[3,2]]' },
        { p: 1, res: '[[1,1],[1,0]]', A: '[[5,3],[3,2]]' },
        { p: 1, res: '[[1,1],[1,0]]', A: '[[5,3],[3,2]]' },
        { p: 1, res: '[[8,5],[5,3]]', A: '[[5,3],[3,2]]' },
        { p: 1, res: '[[8,5],[5,3]]', A: '[[34,21],[21,13]]' },
        { p: 0, res: '[[8,5],[5,3]]', A: '[[34,21],[21,13]]' },
        { p: 0, res: '[[8,5],[5,3]]', A: '[[34,21],[21,13]]' },
        { p: 0, res: '[[8,5],[5,3]]', A: '[[34,21],[21,13]]' }
      ];
      const s = varsAtStep[stepIndex] || varsAtStep[varsAtStep.length - 1];
      if (lineNum === 22) return "res: " + s.res;
      if (lineNum === 23) return "p: " + s.p;
      if (lineNum === 25) return "res: " + s.res;
      if (lineNum === 27) return "A: " + s.A;
      if (lineNum === 28) return "p: " + s.p;
      if (lineNum === 30) return "res: " + s.res;
      if (lineNum === 35) return "T_pow: " + s.res;
      return null;
    }
  }
};
