export const data = {
  "presentation": "### Prezentare Generală\n\nRMQ (Range Minimum Query) cu ajutorul unui Sparse Table este o structură de date concepută pentru a răspunde extrem de rapid la interogări de tipul 'care este minimul în intervalul [L, R]?', având ca limitare faptul că vectorul este imutabil (nu apar actualizări).\n\nIdeea strălucită a Sparse Table este să precalculeze răspunsurile pentru toate intervalele a căror lungime este o putere a lui 2. Un interval de lungime 2^k se compune perfect din două intervale mai mici de lungime 2^(k-1) care se alătură (sau se suprapun). Apoi, orice interogare [L, R] o 'acoperim' cu exact două intervale de putere a lui 2 care se suprapun, calculând minimul lor direct în O(1)!",
  "complexity": "### Complexitate\n\n- **Timp:** Precalculare în O(N log N) unde log N provine de la numărul de puteri ale lui 2. Interogare în O(1) absolut constant! Acesta e principalul avantaj față de Arborii de Intervale (care răspund în O(log N)).\n- **Spațiu:** O(N log N) memorie necesară pentru a stoca matricea Sparse Table st[i][j].\n",
  "variations": "### Variații și Edge Cases\n\n1. Sparse Table pentru Maximum (RMQ Max), GCD (Cel mai mare divizor comun) sau Bitwise AND/OR. Reține: metoda funcționează optim doar pentru operații idempotente (unde x * x = x), precum min(min(A, B), min(B, C)) e ok. Nu merge pt Sumă, pentru că elementele suprapuse ar fi adunate de două ori.\n2. Algoritmul lui Tarjan pentru LCA / RMQ cu ±1. (Cartesian Tree).",
  "applications": "### Aplicații\n\nSparse Table este regina incontestabilă la aflarea rapidă a Strămoșului Comun (LCA) în arbori folosind turul Euler, precum și la algoritmul LCP (Longest Common Prefix) pe vectori de sufixe.",
  code: `
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int main() {
    vector<int> A = {7, 2, 3, 0, 5, 10, 3, 12, 18};
    int n = A.size();
    int k = log2(n) + 1;
    
    // st[i][j] = minimul pe intervalul de lungime 2^j care incepe la pozitia i
    vector<vector<int>> st(n, vector<int>(k));
    
    // Initializare pt lungimi de 2^0 = 1
    for (int i = 0; i < n; i++)
        st[i][0] = A[i];
        
    // Construire Sparse Table O(N log N)
    for (int j = 1; (1 << j) <= n; j++) {
        for (int i = 0; i + (1 << j) <= n; i++) {
            st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }
    
    // Interogare pe intervalul [1, 5] = {2, 3, 0, 5, 10}
    int L = 1, R = 5;
    int j = log2(R - L + 1); // 5 elemente -> log2(5) = 2 (intervale de 4)
    
    int minim = min(st[L][j], st[R - (1 << j) + 1][j]);
    
    cout << "Minim pe [" << L << ", " << R << "] este " << minim << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 15,
      "text": "Structura Sparse Table: O matrice st[i][j] ce stochează răspunsul pentru intervalul de lungime 2^j care începe la indexul i.",
      "matrix": {
        "headers": [
          "j=0",
          "j=1",
          "j=2",
          "j=3"
        ],
        "rows": [
          [
            {
              "val": "st[0][0]"
            },
            {
              "val": "st[0][1]"
            },
            {
              "val": "st[0][2]"
            },
            {
              "val": "..."
            }
          ],
          [
            {
              "val": "st[1][0]"
            },
            {
              "val": "st[1][1]"
            },
            {
              "val": "st[1][2]"
            },
            {
              "val": "..."
            }
          ]
        ]
      }
    },
    {
      "line": 8,
      "text": "Avem vectorul inițial. A = [7, 2, 3, 0, 5, 10, 3, 12, 18]. Numărul de elemente n = 9.",
      "blocksVisual": [
        {
          "label": "Array",
          "groups": [
            [
              {
                "val": "7"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "0"
              },
              {
                "val": "5"
              },
              {
                "val": "10"
              },
              {
                "val": "3"
              },
              {
                "val": "12"
              },
              {
                "val": "18"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Calculăm numărul maxim de puteri k. log2(9) este ~3. +1 devine 4.",
      "blocksVisual": [
        {
          "label": "Puteri k",
          "groups": [
            [
              {
                "val": "k = 4 (pt 2^0, 2^1, 2^2, 2^3)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Precalculare de bază (j = 0): minimul pentru intervale de mărime 2^0 = 1 este doar elementul în sine.",
      "blocksVisual": [
        {
          "label": "Tabel j=0",
          "groups": [
            [
              {
                "val": "7"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)"
        ],
        "rows": [
          [
            {
              "val": "7"
            }
          ],
          [
            {
              "val": "2"
            }
          ],
          [
            {
              "val": "3"
            }
          ],
          [
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "5"
            }
          ],
          [
            {
              "val": "10"
            }
          ],
          [
            {
              "val": "3"
            }
          ],
          [
            {
              "val": "12"
            }
          ],
          [
            {
              "val": "18"
            }
          ]
        ]
      }
    },
    {
      "line": 20,
      "text": "Construcția (j = 1). Pentru intervale de lungime 2 (2^1). De ex, st[0][1] combină elementele st[0][0]=7 și st[1][0]=2. Minimul este 2.",
      "blocksVisual": [
        {
          "label": "Tabel j=1 (len 2)",
          "groups": [
            [
              {
                "val": "min(7,2)=2",
                "active": true
              },
              {
                "val": "min(2,3)=2"
              },
              {
                "val": "min(3,0)=0"
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            }
          ]
        ]
      }
    },
    {
      "line": 22,
      "text": "Iterația j = 2. Intervale de lungime 4. st[0][2] = min( st[0][1], st[2][1] ) -> min(min(7,2), min(3,0)) = 0.",
      "blocksVisual": [
        {
          "label": "Tabel j=2 (len 4)",
          "groups": [
            [
              {
                "val": "min(7,2,3,0)=0",
                "active": true
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)",
          "j=2 (L=4)",
          "j=3 (L=8)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ]
        ]
      }
    },
    {
      "line": 28,
      "text": "Acum testăm o interogare [L=1, R=5]. Dimensiunea este de 5 elemente.",
      "blocksVisual": [
        {
          "label": "Query",
          "groups": [
            [
              {
                "val": "L=1",
                "active": true
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "4"
              },
              {
                "val": "5",
                "active": true
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)",
          "j=2 (L=4)",
          "j=3 (L=8)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ]
        ]
      }
    },
    {
      "line": 29,
      "text": "Căutăm cea mai mare putere a lui 2 mai mică sau egală cu 5. Aceasta este 4 (2^2). Deci j = 2.",
      "blocksVisual": [
        {
          "label": "Mărime block",
          "groups": [
            [
              {
                "val": "j = 2 (block len 4)"
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)",
          "j=2 (L=4)",
          "j=3 (L=8)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ]
        ]
      }
    },
    {
      "line": 31,
      "text": "Acoperim intervalul folosind două blocuri de lungime 4. Primul bloc pleacă de la stânga L: st[1][2]. Al doilea pleacă din dreapta R înapoi: st[5 - 4 + 1][2] = st[2][2].",
      "blocksVisual": [
        {
          "label": "Suprapunere",
          "groups": [
            [
              {
                "val": "[1, 2, 3, 4]",
                "active": true
              }
            ],
            [
              {
                "val": "[2, 3, 4, 5]",
                "active": true
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)",
          "j=2 (L=4)",
          "j=3 (L=8)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ]
        ]
      }
    },
    {
      "line": 31,
      "text": "min(st[1][2], st[2][2]) -> min(0, 0) = 0. Suprapunerea la mjiloc (ex elementele 2,3,4 incluse de 2 ori) nu strică funcția min!",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "0",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)",
          "j=2 (L=4)",
          "j=3 (L=8)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ]
        ]
      }
    },
    {
      "line": 33,
      "text": "Am afișat în O(1) fără a parcurge vectorul!",
      "blocksVisual": [
        {
          "label": "O(1) MAGIC",
          "groups": [
            [
              {
                "val": "Done"
              }
            ]
          ]
        }
      ],
      "matrix": {
        "headers": [
          "j=0 (L=1)",
          "j=1 (L=2)",
          "j=2 (L=4)",
          "j=3 (L=8)"
        ],
        "rows": [
          [
            {
              "val": "7"
            },
            {
              "val": "2"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "2"
            },
            {
              "val": "2"
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0"
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "0"
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": "0"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "5"
            },
            {
              "val": "5"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "10"
            },
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "3"
            },
            {
              "val": "3"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "12"
            },
            {
              "val": "12"
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ],
          [
            {
              "val": "18"
            },
            {
              "val": ""
            },
            {
              "val": ""
            },
            {
              "val": ""
            }
          ]
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "RMQ Infoarena",
        "url": "https://www.infoarena.ro/problema/rmq",
        "desc": "Problema etalon pentru evaluare"
      }
    ],
    "medium": [
      {
        "title": "LCA in Arbore",
        "url": "https://www.infoarena.ro/problema/lca",
        "desc": "Reducerea LCA la RMQ"
      }
    ],
    "hard": [
      {
        "title": "STMA",
        "url": "https://www.pbinfo.ro/probleme/2952/stma",
        "desc": "Aplicații avansate 2D RMQ"
      }
    ]
  }
};
