export const data = {
  "presentation": "### Prezentare Generală\n\nBacktracking-ul este o metodă generală de a găsi toate (sau unele) soluții pentru probleme de calcul, în special probleme de satisfacere a constrângerilor.\n\nAlgoritmul explorează treptat spațiul de căutare (care adesea ia forma unui arbore). La fiecare pas, algoritmul încearcă să adauge un element la o soluție parțială. Dacă soluția parțială poate duce la o soluție validă, continuă. Altfel, se 'întoarce' (backtracks) și încearcă o altă opțiune.",
  "complexity": "### Complexitate\n\n- **Timp:** Frecvent exponențial $O(2^N)$ sau factorial $O(N!)$, depinzând de ramificarea arborelui de decizie. Deși ineficient pentru $N$ mari, de multe ori este singura soluție exactă pentru probleme NP-Complete.\n- **Spațiu:** $O(N)$ pentru stiva de apeluri recursiv, unde N este adâncimea maximă a arborelui.\n",
  "variations": "### Variații și Edge Cases\n\n1. Branch and Bound: O optimizare în care păstrăm evidența celei mai bune soluții găsite până acum și abandonăm ramurile care nu o pot îmbunătăți.\n2. Memoization / DP: Dacă subproblemele se suprapun (ceea ce nu e mereu cazul în Backtracking), putem salva rezultatele.",
  "applications": "### Aplicații\n\nBacktracking este folosit extensiv la generarea de permutări, combinări, rezolvarea de puzzle-uri precum Sudoku sau N-Regine, și în AI pentru parcurgerea spațiului de stări.",
  code: `
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int N = 4;
vector<int> col; // col[i] = coloana in care se afla regina pe linia i

bool isValid(int r, int c) {
    for (int i = 0; i < r; i++) {
        // Daca e pe aceeasi coloana sau diagonala
        if (col[i] == c || abs(i - r) == abs(col[i] - c)) {
            return false;
        }
    }
    return true;
}

void solve(int row) {
    if (row == N) {
        cout << "Solutie gasita!
";
        return;
    }
    
    for (int c = 0; c < N; c++) {
        if (isValid(row, c)) {
            col[row] = c;       // Plasare regina
            solve(row + 1);     // Explorare mai departe
            // col[row] se va suprascrie la urmatoarea iteratie (Backtrack)
        }
    }
}
`,
  "explanations": [
    {
      "line": 20,
      "text": "Începem căutarea pe prima linie (row = 0) pentru un tablou de 4x4.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": "Row: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Încercăm plasarea reginei pe prima coloană (c = 0).",
      "blocksVisual": [
        {
          "label": "Linia 0",
          "groups": [
            [
              {
                "val": "R0, C0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Verificăm dacă e valid. Cum tabla e goală, e mereu valid pe R0.",
      "blocksVisual": [
        {
          "label": "Validare",
          "groups": [
            [
              {
                "val": "Valid!"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Plasăm regina la (0, 0). Apelăm recursiv pentru linia 1.",
      "blocksVisual": [
        {
          "label": "Plasează R0",
          "groups": [
            [
              {
                "val": "Q la (0,0)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Pentru linia 1, încercăm c=0, c=1. Ambele sunt atacate de (0,0). La c=2 este valid.",
      "blocksVisual": [
        {
          "label": "Linia 1",
          "groups": [
            [
              {
                "val": "C=0: Atacat",
                "hidden": true
              },
              {
                "val": "C=1: Atacat",
                "hidden": true
              },
              {
                "val": "C=2: Valid",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Plasăm regina la (1, 2). Mergem la linia 2.",
      "blocksVisual": [
        {
          "label": "Plasează R1",
          "groups": [
            [
              {
                "val": "Q la (1,2)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Pentru linia 2, TOATE coloanele (0, 1, 2, 3) sunt atacate de (0,0) și (1,2).",
      "blocksVisual": [
        {
          "label": "Linia 2",
          "groups": [
            [
              {
                "val": "C=0: X"
              },
              {
                "val": "C=1: X"
              },
              {
                "val": "C=2: X"
              },
              {
                "val": "C=3: X"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Ieșim din for pe linia 2. Backtrack! Ne întoarcem la linia 1 și încercăm următoarea coloană (c=3).",
      "blocksVisual": [
        {
          "label": "Backtrack L2->L1",
          "groups": [
            [
              {
                "val": "Înapoi la R1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Plasăm regina la (1, 3). Mergem iar la linia 2.",
      "blocksVisual": [
        {
          "label": "Plasează R1 (nou)",
          "groups": [
            [
              {
                "val": "Q la (1,3)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "La linia 2, acum c=1 este valid.",
      "blocksVisual": [
        {
          "label": "Linia 2",
          "groups": [
            [
              {
                "val": "C=1: Valid",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Plasăm regina la (2, 1). Mergem la linia 3.",
      "blocksVisual": [
        {
          "label": "Plasează R2",
          "groups": [
            [
              {
                "val": "Q la (2,1)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "La linia 3, c=0, 1, 2, 3 sunt verificate. C=0, C=1, C=2 atacate. C=3 atacat de R1.",
      "blocksVisual": [
        {
          "label": "Linia 3",
          "groups": [
            [
              {
                "val": "Toate atacate!"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Backtrack L3->L2! Și tot așa până descoperim soluția: (0,1), (1,3), (2,0), (3,2).",
      "blocksVisual": [
        {
          "label": "Soluție finală",
          "groups": [
            [
              {
                "val": "(0,1)"
              },
              {
                "val": "(1,3)"
              },
              {
                "val": "(2,0)"
              },
              {
                "val": "(3,2)"
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
        "title": "Permutari",
        "url": "https://www.pbinfo.ro/probleme/123/permutari",
        "desc": "Generare permutari N"
      }
    ],
    "medium": [
      {
        "title": "N-Queens",
        "url": "https://leetcode.com/problems/n-queens/",
        "desc": "Clasica problema cu Regine"
      }
    ],
    "hard": [
      {
        "title": "Sudoku Solver",
        "url": "https://leetcode.com/problems/sudoku-solver/",
        "desc": "Backtracking pe grila"
      }
    ]
  }
};
