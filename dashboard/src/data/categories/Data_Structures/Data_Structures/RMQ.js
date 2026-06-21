export const data = {
  "presentation": "### Prezentare Generală\n\nRMQ (**Range Minimum Query**) cu ajutorul unui **Sparse Table** este o structură de date concepută pentru a răspunde extrem de rapid la interogări de tipul \"care este minimul în intervalul $[L, R]$?\", având ca limitare faptul că vectorul este imutabil (nu apar actualizări).\n\nIdeea de bază a Sparse Table este să precalculeze răspunsurile pentru toate intervalele a căror lungime este o putere a lui 2. Un interval de lungime $2^j$ se compune din două intervale mai mici de lungime $2^{j-1}$ care se suprapun sau se învecinează:\n$$st[i][j] = \\min(st[i][j-1], st[i + 2^{j-1}][j-1])$$\n\nOrice interogare pe un interval $[L, R]$ de lungime $\\text{len} = R - L + 1$ poate fi acoperită complet cu exact două intervale de lungime $2^j$ care se suprapun, unde $j = \\lfloor \\log_2(\\text{len}) \\rfloor$. Astfel, răspunsul se determină în $O(1)$ constant:\n$$\\text{RMQ}(L, R) = \\min(st[L][j], st[R - 2^j + 1][j])$$",
  "complexity": "### Complexitate\n\n- **Timp:**\n  - Precalculare: $O(N \\log N)$ deoarece completăm o matrice cu $N$ linii și $\\log N$ coloane.\n  - Interogare: $O(1)$ constant, un mare avantaj față de Segment Trees care răspund în $O(\\log N)$.\n- **Spațiu:** $O(N \\log N)$ memorie pentru matricea Sparse Table `st[i][j]`.",
  "variations": "### Variații și Edge Cases\n\n1. **Operații idempotente:** Sparse Table funcționează optim doar pentru operații unde $x \\circ x = x$ (idempotente), cum ar fi minim, maxim, GCD (cel mai mare divizor comun) sau AND/OR pe biți. Nu poate fi folosit direct pentru sumă pe interval în $O(1)$ deoarece suprapunerea intervalelor ar dubla adunarea unor elemente.\n2. **±1 RMQ (Algoritmul lui Farach-Colton și Bender):** Rezolvă RMQ în $O(N)$ timp de precalculare și $O(1)$ timp de interogare folosind proprietatea că elementele adiacente diferă prin exact $\\pm 1$.",
  "applications": "### Aplicații\n\nSparse Table este regina incontestabilă la aflarea rapidă a Strămoșului Comun (LCA) în arbori folosind turul Euler, precum și la algoritmul LCP (Longest Common Prefix) pe vectori de sufixe.",
  "code": "\n#include <iostream>\n#include <vector>\n#include <cmath>\n\nusing namespace std;\n\nint main() {\n    vector<int> A = {7, 2, 3, 0, 5, 10, 3, 12, 18};\n    int n = A.size();\n    int k = log2(n) + 1;\n    vector<vector<int>> st(n, vector<int>(k));\n    for (int i = 0; i < n; i++) {\n        st[i][0] = A[i];\n    }\n    for (int j = 1; (1 << j) <= n; j++) {\n        for (int i = 0; i + (1 << j) <= n; i++) {\n            st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);\n        }\n    }\n    int L = 1, R = 5;\n    int j = log2(R - L + 1);\n    int minim = min(st[L][j], st[R - (1 << j) + 1][j]);\n    cout << \"Minim pe [\" << L << \", \" << R << \"] este \" << minim << \"\\n\";\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 11,
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
      "line": 13,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 17,
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
      "line": 20,
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
      "line": 21,
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
      "line": 22,
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
      "line": 22,
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
      "line": 22,
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
      "line": 23,
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
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { i: -1, j: -1, phase: "init" },
        { i: 0, j: 0, phase: "base" },
        { i: 0, j: 1, phase: "dp" },
        { i: 1, j: 1, phase: "dp" },
        { i: 2, j: 1, phase: "dp" },
        { i: 3, j: 1, phase: "dp" },
        { i: 4, j: 1, phase: "dp" },
        { i: 5, j: 1, phase: "dp" },
        { i: 6, j: 1, phase: "dp" },
        { i: 7, j: 1, phase: "dp" },
        { i: 0, j: 2, phase: "dp" },
        { i: 1, j: 2, phase: "dp" },
        { i: 2, j: 2, phase: "dp" },
        { i: 3, j: 2, phase: "dp" },
        { i: 4, j: 2, phase: "dp" },
        { i: 5, j: 2, phase: "dp" },
        { L: 1, R: 5, phase: "query_init" },
        { L: 1, R: 5, q_j: 2, phase: "query_j" },
        { L: 1, R: 5, q_j: 2, minim: 0, phase: "query_min" },
        { L: 1, R: 5, q_j: 2, minim: 0, phase: "query_min" },
        { L: 1, R: 5, q_j: 2, minim: 0, phase: "query_min" },
        { L: 1, R: 5, q_j: 2, minim: 0, phase: "end" }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [
        { name: "main()", file: "main.cpp", line: activeLine }
      ];

      const AVal = "{7, 2, 3, 0, 5, 10, 3, 12, 18}";
      globalVars.push({ name: "A", type: "std::vector<int>", val: AVal, expandable: true });
      globalVars.push({ name: "n", type: "int", val: "9", expandable: false });
      globalVars.push({ name: "k", type: "int", val: "4", expandable: false });

      if (curr.phase === "init" || curr.phase === "base" || curr.phase === "dp") {
        vars.push({ name: "st", type: "std::vector<std::vector<int>>", val: "9 x 4 Sparse Table", expandable: true });
        if (curr.i !== -1) {
          vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
        }
        if (curr.j !== -1) {
          vars.push({ name: "j", type: "int", val: curr.j.toString(), expandable: false });
        }
      } else {
        vars.push({ name: "L", type: "int", val: curr.L.toString(), expandable: false });
        vars.push({ name: "R", type: "int", val: curr.R.toString(), expandable: false });
        if (curr.q_j !== undefined) {
          vars.push({ name: "j", type: "int", val: curr.q_j.toString(), expandable: false });
        }
        if (curr.minim !== undefined) {
          vars.push({ name: "minim", type: "int", val: curr.minim.toString(), expandable: false });
        }
      }

      let inlineVal = "";
      if (curr.phase === "dp") {
        inlineVal = "i: " + curr.i + ", j: " + curr.j;
      } else if (curr.phase === "query_min") {
        inlineVal = "L: " + curr.L + ", R: " + curr.R + ", minim: " + curr.minim;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { i: -1, j: -1 },
        { i: 0, j: 0 },
        { i: 0, j: 1 },
        { i: 1, j: 1 },
        { i: 2, j: 1 },
        { i: 3, j: 1 },
        { i: 4, j: 1 },
        { i: 5, j: 1 },
        { i: 6, j: 1 },
        { i: 7, j: 1 },
        { i: 0, j: 2 },
        { i: 1, j: 2 },
        { i: 2, j: 2 },
        { i: 3, j: 2 },
        { i: 4, j: 2 },
        { i: 5, j: 2 },
        { L: 1, R: 5 },
        { L: 1, R: 5, q_j: 2 },
        { L: 1, R: 5, q_j: 2, minim: 0 },
        { L: 1, R: 5, q_j: 2, minim: 0 },
        { L: 1, R: 5, q_j: 2, minim: 0 },
        { L: 1, R: 5, q_j: 2, minim: 0 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum === 17) {
        return "i: " + curr.i + ", j: " + curr.j;
      }
      if (lineNum === 22) {
        return "L: " + curr.L + ", R: " + curr.R + ", j: " + curr.q_j + ", minim: " + curr.minim;
      }
      return null;
    }
  }
};
