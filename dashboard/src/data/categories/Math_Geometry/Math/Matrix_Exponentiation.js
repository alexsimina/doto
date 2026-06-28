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
  "code": `#include <iostream>
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
    "line": 33,
    "text": "Definim matricea de tranziție T pentru șirul lui Fibonacci: T = {{1, 1}, {1, 0}}.",
    "blocksVisual": [],
    "matrix": {
      "title": "Matricea de tranziție T (Fibonacci)",
      "headers": ["", "Col 0", "Col 1"],
      "rows": [
        ["R0", "1", "1"],
        ["R1", "1", "0"]
      ]
    }
  },
  {
    "line": 34,
    "text": "Apelăm funcția power pentru a ridica matricea T la puterea 5, folosind modulul 1000000007.",
    "blocksVisual": [],
    "matrix": {
      "title": "Matricea de tranziție T (Fibonacci)",
      "headers": ["", "Col 0", "Col 1"],
      "rows": [
        ["R0", "1", "1"],
        ["R1", "1", "0"]
      ]
    }
  },
  {
    "line": 20,
    "text": "Intrăm în corpul funcției power cu exponentul p = 5.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 5", "active": true },
            { "val": "mod = 10^9 + 7", "active": false }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea A (Baza)",
      "headers": ["", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1"],
        ["i = 1", "1", "0"]
      ]
    }
  },
  {
    "line": 21,
    "text": "Inițializăm matricea res cu Matricea Identitate {{1, 0}, {0, 1}}, care servește drept element neutru la înmulțire.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 5", "active": true },
            { "val": "res = Identitate", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Rezultatul res (Identitate) | Matricea A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "0", "", "1", "1"],
        ["i = 1", "0", "1", "", "1", "0"]
      ]
    }
  },
  {
    "line": 22,
    "text": "Verificăm condiția buclei while (p > 0). Deoarece p = 5 > 0, condiția este adevărată, deci continuăm.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 5 > 0 (Adevărat)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Rezultatul res | Matricea A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "0", "", "1", "1"],
        ["i = 1", "0", "1", "", "1", "0"]
      ]
    }
  },
  {
    "line": 23,
    "text": "Verificăm dacă exponentul curent p este impar: p % 2 == 1. Deoarece 5 % 2 = 1, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p % 2 == 1 (Adevărat)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Rezultatul res | Matricea A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "0", "", "1", "1"],
        ["i = 1", "0", "1", "", "1", "0"]
      ]
    }
  },
  {
    "line": 24,
    "text": "Apelăm funcția multiply pentru a înmulți res curent cu matricea de putere A.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "Înmulțire", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Înmulțire: res = res * A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 1}, {"r": 0, "c": 2}, {"r": 1, "c": 1}, {"r": 1, "c": 2}],
      "highlightCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "1", "0", "", "1", "1"],
        ["i = 1", "0", "1", "", "1", "0"]
      ]
    }
  },
  {
    "line": 24,
    "text": "Matricea res a fost actualizată în urma înmulțirii.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "res actualizat", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res actualizat cu succes",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 1}, {"r": 0, "c": 2}, {"r": 1, "c": 1}, {"r": 1, "c": 2}],
      "rows": [
        ["i = 0", "1", "1", "", "1", "1"],
        ["i = 1", "1", "0", "", "1", "0"]
      ]
    }
  },
  {
    "line": 26,
    "text": "Apelăm funcția multiply pentru a ridica matricea A la pătrat (dublăm puterea de tranziție).",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "Dublare putere A", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Ridicarea la pătrat: A = A * A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "1", "1", "", "1", "1"],
        ["i = 1", "1", "0", "", "1", "0"]
      ]
    }
  },
  {
    "line": 26,
    "text": "Matricea A a fost înlocuită cu pătratul său.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (101_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": false },
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "A actualizat la A^2", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "A actualizat cu A^2",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "1", "1", "", "2", "1"],
        ["i = 1", "1", "0", "", "1", "1"]
      ]
    }
  },
  {
    "line": 27,
    "text": "Înjumătățim exponentul p prin împărțire întreagă la 2: p devine 5 / 2 = 2.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (10_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 2", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^2",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1", "", "2", "1"],
        ["i = 1", "1", "0", "", "1", "1"]
      ]
    }
  },
  {
    "line": 22,
    "text": "Verificăm din nou condiția buclei while (p > 0). Deoarece p = 2 > 0, condiția este adevărată, continuăm.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (10_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 2 > 0 (Adevărat)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^2",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1", "", "2", "1"],
        ["i = 1", "1", "0", "", "1", "1"]
      ]
    }
  },
  {
    "line": 23,
    "text": "Verificăm dacă exponentul curent p este impar. Deoarece 2 % 2 = 0, condiția este falsă; sărim peste înmulțirea rezultatului.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (10_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p % 2 == 1 (Fals)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^2",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1", "", "2", "1"],
        ["i = 1", "1", "0", "", "1", "1"]
      ]
    }
  },
  {
    "line": 26,
    "text": "Apelăm funcția multiply pentru a ridica din nou matricea A la pătrat.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (10_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "Dublare putere A", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Ridicarea la pătrat: A = A * A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "1", "1", "", "2", "1"],
        ["i = 1", "1", "0", "", "1", "1"]
      ]
    }
  },
  {
    "line": 26,
    "text": "Matricea A a fost actualizată cu pătratul său.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (10_2)",
        "groups": [
          [
            { "val": "1", "active": false },
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "A actualizat la A^4", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "A actualizat cu A^4",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "1", "1", "", "5", "3"],
        ["i = 1", "1", "0", "", "3", "2"]
      ]
    }
  },
  {
    "line": 27,
    "text": "Înjumătățim exponentul p prin împărțire întreagă: p devine 2 / 2 = 1.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 1", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^4",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1", "", "5", "3"],
        ["i = 1", "1", "0", "", "3", "2"]
      ]
    }
  },
  {
    "line": 22,
    "text": "Verificăm condiția buclei while (p > 0). Deoarece p = 1 > 0, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 1 > 0 (Adevărat)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^4",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1", "", "5", "3"],
        ["i = 1", "1", "0", "", "3", "2"]
      ]
    }
  },
  {
    "line": 23,
    "text": "Verificăm dacă p este impar. Deoarece 1 % 2 = 1, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p % 2 == 1 (Adevărat)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^4",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "1", "1", "", "5", "3"],
        ["i = 1", "1", "0", "", "3", "2"]
      ]
    }
  },
  {
    "line": 24,
    "text": "Apelăm funcția multiply pentru a înmulți rezultatul acumulat res cu matricea de putere curentă A.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "Înmulțire", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Înmulțire: res = res * A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 1}, {"r": 0, "c": 2}, {"r": 1, "c": 1}, {"r": 1, "c": 2}],
      "highlightCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "1", "1", "", "5", "3"],
        ["i = 1", "1", "0", "", "3", "2"]
      ]
    }
  },
  {
    "line": 24,
    "text": "Matricea res a fost actualizată în urma înmulțirii.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true, "sorted": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "res actualizat", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res actualizat cu succes",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 1}, {"r": 0, "c": 2}, {"r": 1, "c": 1}, {"r": 1, "c": 2}],
      "rows": [
        ["i = 0", "8", "5", "", "5", "3"],
        ["i = 1", "5", "3", "", "3", "2"]
      ]
    }
  },
  {
    "line": 26,
    "text": "Apelăm multiply pentru a ridica din nou matricea A la pătrat.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "Dublare putere A", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Ridicarea la pătrat: A = A * A",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "8", "5", "", "5", "3"],
        ["i = 1", "5", "3", "", "3", "2"]
      ]
    }
  },
  {
    "line": 26,
    "text": "Matricea A a fost înlocuită cu pătratul său.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (1_2)",
        "groups": [
          [
            { "val": "1", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "A actualizat la A^8", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "A actualizat cu A^8",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 4}, {"r": 0, "c": 5}, {"r": 1, "c": 4}, {"r": 1, "c": 5}],
      "rows": [
        ["i = 0", "8", "5", "", "34", "21"],
        ["i = 1", "5", "3", "", "21", "13"]
      ]
    }
  },
  {
    "line": 27,
    "text": "Înjumătățim exponentul p prin împărțire întreagă: p devine 1 / 2 = 0.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (0_2)",
        "groups": [
          [
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 0", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^8",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "8", "5", "", "34", "21"],
        ["i = 1", "5", "3", "", "21", "13"]
      ]
    }
  },
  {
    "line": 22,
    "text": "Verificăm condiția buclei while (p > 0). Deoarece p = 0, condiția este acum falsă, așa că ieșim din buclă.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (0_2)",
        "groups": [
          [
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "p = 0 > 0 (Fals)", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "res | A^8",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "rows": [
        ["i = 0", "8", "5", "", "34", "21"],
        ["i = 1", "5", "3", "", "21", "13"]
      ]
    }
  },
  {
    "line": 29,
    "text": "Returnăm matricea res ce conține rezultatul final T^5.",
    "blocksVisual": [
      {
        "label": "Exponentul p în binar (0_2)",
        "groups": [
          [
            { "val": "0", "active": true }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            { "val": "Returnare res", "active": true }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Returnăm rezultatul res (T^5)",
      "headers": ["", "res[i][0]", "res[i][1]", " ", "A[i][0]", "A[i][1]"],
      "activeCells": [{"r": 0, "c": 1}, {"r": 0, "c": 2}, {"r": 1, "c": 1}, {"r": 1, "c": 2}],
      "rows": [
        ["i = 0", "8", "5", "", "34", "21"],
        ["i = 1", "5", "3", "", "21", "13"]
      ]
    }
  },
  {
    "line": 34,
    "text": "Revenim în funcția main. Atribuim matricea returnată variabilei T_pow.",
    "blocksVisual": [],
    "matrix": {
      "title": "Matricea Rezultat T_pow (T^5)",
      "headers": ["", "T_pow[i][0]", "T_pow[i][1]"],
      "rows": [
        ["i = 0", "8", "5"],
        ["i = 1", "5", "3"]
      ]
    }
  },
  {
    "line": 35,
    "text": "Afișăm valoarea calculată a celui de-al 6-lea termen Fibonacci, aflat în T_pow[0][0].",
    "blocksVisual": [],
    "matrix": {
      "title": "Afișăm T_pow[0][0] = 8",
      "headers": ["", "T_pow[i][0]", "T_pow[i][1]"],
      "activeCells": [{"r": 0, "c": 1}],
      "rows": [
        ["i = 0", "8", "5"],
        ["i = 1", "5", "3"]
      ]
    }
  },
  {
    "line": 36,
    "text": "Funcția main se încheie cu return 0, ceea ce indică succesul programului.",
    "blocksVisual": [],
    "matrix": {
      "title": "Program Finalizat cu Succes",
      "headers": ["", "T_pow[i][0]", "T_pow[i][1]"],
      "rows": [
        ["i = 0", "8", "5"],
        ["i = 1", "5", "3"]
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
    "getDebuggerState": (stepIndex, activeLine) => {
      const states = [{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T={{1,1},{1,0}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"Apel power"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res={{1,0},{0,1}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[1,1],[1,0]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[2,1],[1,1]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[5,3],[3,2]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[8,5],[5,3]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[34,21],[21,13]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"return res"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T_pow primit"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const frames = s.frames.map((frame, index) => {
        if (index === 0 && activeLine !== undefined && activeLine !== null) {
          return { ...frame, line: activeLine };
        }
        return frame;
      });
      return { vars: s.vars, globalVars: [], frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T={{1,1},{1,0}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"Apel power"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res={{1,0},{0,1}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[1,1],[1,0]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[2,1],[1,1]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[5,3],[3,2]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[8,5],[5,3]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[34,21],[21,13]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"return res"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T_pow primit"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;
      return null;
    }
  }
};
