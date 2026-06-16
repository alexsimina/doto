export const data = {
  "presentation": "### Prezentare Generală\n\nRMQ (Range Minimum Query) cu ajutorul unui Sparse Table este o structură de date concepută pentru a răspunde extrem de rapid la interogări de tipul 'care este minimul în intervalul [L, R]?', având ca limitare faptul că vectorul este imutabil (nu apar actualizări).\n\nIdeea strălucită a Sparse Table este să precalculeze răspunsurile pentru toate intervalele a căror lungime este o putere a lui 2. Un interval de lungime 2^k se compune perfect din două intervale mai mici de lungime 2^(k-1) care se alătură (sau se suprapun). Apoi, orice interogare [L, R] o 'acoperim' cu exact două intervale de putere a lui 2 care se suprapun, calculând minimul lor direct în O(1)!",
  "complexity": "### Complexitate\n\n- **Timp:** Precalculare în O(N log N) unde log N provine de la numărul de puteri ale lui 2. Interogare în O(1) absolut constant! Acesta e principalul avantaj față de Arborii de Intervale (care răspund în O(log N)).\n- **Spațiu:** O(N log N) memorie necesară pentru a stoca matricea Sparse Table st[i][j].\n",
  "variations": "### Variații și Edge Cases\n\n1. Sparse Table pentru Maximum (RMQ Max), GCD (Cel mai mare divizor comun) sau Bitwise AND/OR. Reține: metoda funcționează optim doar pentru operații idempotente (unde x * x = x), precum min(min(A, B), min(B, C)) e ok. Nu merge pt Sumă, pentru că elementele suprapuse ar fi adunate de două ori.\n2. Algoritmul lui Tarjan pentru LCA / RMQ cu ±1. (Cartesian Tree).",
  "applications": "### Aplicații\n\nSparse Table este regina incontestabilă la aflarea rapidă a Strămoșului Comun (LCA) în arbori folosind turul Euler, precum și la algoritmul LCP (Longest Common Prefix) pe vectori de sufixe.",
  "code": "\n#include <iostream>\n#include <vector>\n#include <cmath>\n\nusing namespace std;\n\nint main() {\n    vector<int> A = {7, 2, 3, 0, 5, 10, 3, 12, 18};\n    int n = A.size();\n    int k = log2(n) + 1;\n    \n    // st[i][j] = minimul pe intervalul de lungime 2^j care incepe la pozitia i\n    vector<vector<int>> st(n, vector<int>(k));\n    \n    // Initializare pt lungimi de 2^0 = 1\n    for (int i = 0; i < n; i++)\n        st[i][0] = A[i];\n        \n    // Construire Sparse Table O(N log N)\n    for (int j = 1; (1 << j) <= n; j++) {\n        for (int i = 0; i + (1 << j) <= n; i++) {\n            st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);\n        }\n    }\n    \n    // Interogare pe intervalul [1, 5] = {2, 3, 0, 5, 10}\n    int L = 1, R = 5;\n    int j = log2(R - L + 1); // 5 elemente -> log2(5) = 2 (intervale de 4)\n    \n    int minim = min(st[L][j], st[R - (1 << j) + 1][j]);\n    \n    cout << \"Minim pe [\" << L << \", \" << R << \"] este \" << minim << \"\\n\";\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 19,
      "text": "Matricea st[i][j] va reține valorile minime precalculate. Linii = pornire interval, Coloane = puteri ale lui 2.",
      "blocksVisual": [
        {
          "label": "Structură ST",
          "groups": [
            [
              {
                "val": "A = [7,2,3,0,5,10,3,12,18]"
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
      "line": 22,
      "text": "Inițializăm j=0: intervale de lungime 2^0 = 1. Fiecare element este minimul propriului său interval de lungime 1.",
      "blocksVisual": [
        {
          "label": "Inițializare",
          "groups": [
            [
              {
                "val": "j = 0"
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
      "text": "Construcție j=1 (L=2): st[0][1] = min(st[0][0], st[1][0]) = min(7, 2) = 2",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=0",
          "groups": [
            [
              {
                "val": "min(7, 2) = 2"
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
              "val": "2",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[1][1] = min(st[1][0], st[2][0]) = min(2, 3) = 2",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=1",
          "groups": [
            [
              {
                "val": "min(2, 3) = 2"
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
              "val": "2",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[2][1] = min(st[2][0], st[3][0]) = min(3, 0) = 0",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=2",
          "groups": [
            [
              {
                "val": "min(3, 0) = 0"
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
              "val": "0",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[3][1] = min(st[3][0], st[4][0]) = min(0, 5) = 0",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=3",
          "groups": [
            [
              {
                "val": "min(0, 5) = 0"
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
              "val": "0",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[4][1] = min(st[4][0], st[5][0]) = min(5, 10) = 5",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=4",
          "groups": [
            [
              {
                "val": "min(5, 10) = 5"
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
              "val": "5",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[5][1] = min(st[5][0], st[6][0]) = min(10, 3) = 3",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=5",
          "groups": [
            [
              {
                "val": "min(10, 3) = 3"
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
              "val": "3",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[6][1] = min(st[6][0], st[7][0]) = min(3, 12) = 3",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=6",
          "groups": [
            [
              {
                "val": "min(3, 12) = 3"
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
              "val": "3",
              "active": true
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
      "text": "Construcție j=1 (L=2): st[7][1] = min(st[7][0], st[8][0]) = min(12, 18) = 12",
      "blocksVisual": [
        {
          "label": "Pas j=1, i=7",
          "groups": [
            [
              {
                "val": "min(12, 18) = 12"
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
              "val": "12",
              "active": true
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
      "text": "Construcție j=2 (L=4): st[0][2] = min(st[0][1], st[2][1]) = min(2, 0) = 0",
      "blocksVisual": [
        {
          "label": "Pas j=2, i=0",
          "groups": [
            [
              {
                "val": "min(2, 0) = 0"
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
              "val": "0",
              "active": true
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
      "text": "Construcție j=2 (L=4): st[1][2] = min(st[1][1], st[3][1]) = min(2, 0) = 0",
      "blocksVisual": [
        {
          "label": "Pas j=2, i=1",
          "groups": [
            [
              {
                "val": "min(2, 0) = 0"
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
      "text": "Construcție j=2 (L=4): st[2][2] = min(st[2][1], st[4][1]) = min(0, 5) = 0",
      "blocksVisual": [
        {
          "label": "Pas j=2, i=2",
          "groups": [
            [
              {
                "val": "min(0, 5) = 0"
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
      "line": 28,
      "text": "Construcție j=2 (L=4): st[3][2] = min(st[3][1], st[5][1]) = min(0, 3) = 0",
      "blocksVisual": [
        {
          "label": "Pas j=2, i=3",
          "groups": [
            [
              {
                "val": "min(0, 3) = 0"
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
              "val": "0",
              "active": true
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
      "text": "Construcție j=2 (L=4): st[4][2] = min(st[4][1], st[6][1]) = min(5, 3) = 3",
      "blocksVisual": [
        {
          "label": "Pas j=2, i=4",
          "groups": [
            [
              {
                "val": "min(5, 3) = 3"
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
              "val": "3",
              "active": true
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
      "text": "Construcție j=2 (L=4): st[5][2] = min(st[5][1], st[7][1]) = min(3, 12) = 3",
      "blocksVisual": [
        {
          "label": "Pas j=2, i=5",
          "groups": [
            [
              {
                "val": "min(3, 12) = 3"
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
              "val": "3",
              "active": true
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
      "text": "Pentru a răspunde la interogarea pe [1, 5], lungimea este R - L + 1 = 5.",
      "blocksVisual": [
        {
          "label": "Query [1, 5]",
          "groups": [
            [
              {
                "val": "L=1, R=5, lungime=5"
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
      "line": 34,
      "text": "Cea mai mare putere a lui 2 mai mică sau egală cu 5 este 4. Deci j = log2(5) = 2.",
      "blocksVisual": [
        {
          "label": "Putere j",
          "groups": [
            [
              {
                "val": "j = 2"
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
      "line": 36,
      "text": "Prima parte acoperă [1, 4] folosind st[L][j] = st[1][2] = 0.",
      "blocksVisual": [
        {
          "label": "Partea stângă [1, 4]",
          "groups": [
            [
              {
                "val": "st[1][2] = 0",
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
      "line": 36,
      "text": "A doua parte acoperă [2, 5] folosind st[R - 2^j + 1][j] = st[2][2] = 0.",
      "blocksVisual": [
        {
          "label": "Partea dreaptă [2, 5]",
          "groups": [
            [
              {
                "val": "st[2][2] = 0",
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
      "line": 36,
      "text": "Minimul general este min(st[1][2], st[2][2]) = min(0, 0) = 0. Suprapunerea elementelor {2, 3, 4} nu afectează rezultatul minimului.",
      "blocksVisual": [
        {
          "label": "Minim final",
          "groups": [
            [
              {
                "val": "minim = 0",
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
      "line": 38,
      "text": "Răspunsul este afișat în timp O(1) direct! Precalcularea Sparse Table oferă interogări ultrarapide.",
      "blocksVisual": [
        {
          "label": "Gata",
          "groups": [
            [
              {
                "val": "O(1) Query"
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