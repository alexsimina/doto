export const data = {
  "presentation": "### Prezentare Generală\n\nBacktracking-ul este o metodă generală de a găsi toate (sau unele) soluții pentru probleme de calcul, în special probleme de satisfacere a constrângerilor.\n\nAlgoritmul explorează treptat spațiul de căutare (care adesea ia forma unui arbore). La fiecare pas, algoritmul încearcă să adauge un element la o soluție parțială. Dacă soluția parțială poate duce la o soluție validă, continuă. Altfel, se 'întoarce' (backtracks) și încearcă o altă opțiune.",
  "complexity": "### Complexitate\n\n- **Timp:** Frecvent exponențial $O(2^N)$ sau factorial $O(N!)$, depinzând de ramificarea arborelui de decizie. Deși ineficient pentru $N$ mari, de multe ori este singura soluție exactă pentru probleme NP-Complete.\n- **Spațiu:** $O(N)$ pentru stiva de apeluri recursiv, unde N este adâncimea maximă a arborelui.\n",
  "variations": "### Variații și Edge Cases\n\n1. Branch and Bound: O optimizare în care păstrăm evidența celei mai bune soluții găsite până acum și abandonăm ramurile care nu o pot îmbunătăți.\n2. Memoization / DP: Dacă subproblemele se suprapun (ceea ce nu e mereu cazul în Backtracking), putem salva rezultatele.",
  "applications": "### Aplicații\n\nBacktracking este folosit extensiv la generarea de permutări, combinări, rezolvarea de puzzle-uri precum Sudoku sau N-Regine, și în AI pentru parcurgerea spațiului de stări.",
  code: `#include <iostream>
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
        cout << "Solutie gasita!\n";
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

int main() {
    col.resize(N);
    solve(0);
    return 0;
}
`,
  "explanations": [
    {
      "line": 20,
      "text": "Inițializăm solve(row=0). Tabla 4x4 este complet goală. Vom încerca să plasăm câte o regină pe fiecare rând, coloană cu coloană.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "start"}
        ],
        "edges": []
      }
    },
    {
      "line": 21,
      "text": "Verificăm row == N: 0 == 4? NU. Condiția de bază nu este îndeplinită, deci continuăm cu plasarea reginei pe rândul 0.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·", "active": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0", "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 27,
      "text": "Testăm c=0 pentru rândul 0. Apelăm isValid(0,0). Tabla e goală, deci nu există conflicte. isValid = TRUE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "?", "active": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0", "active": true}
        ]
      }
    },
    {
      "line": 28,
      "text": "Plasăm regina la (0,0): col[0]=0. Acum apelăm recursiv solve(1) pentru a plasa regina pe rândul 1.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(1): Testăm c=0 pentru rândul 1. isValid(1,0): col[0]=0 → conflict pe coloana 0! isValid = FALSE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "X", "active": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c0", "x": 30, "y": 90, "label": "(1,0)✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c0"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Testăm c=1 pentru rândul 1. isValid(1,1): col[0]=0 → diagonală! |0-1|==|0-1| → 1==1. Conflict diagonal! isValid = FALSE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "X", "active": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c0", "x": 30, "y": 90, "label": "(1,0)✗"},
          {"id": "r1c1", "x": 85, "y": 90, "label": "(1,1)✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c0"},
          {"source": "r0c0", "target": "r1c1"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Testăm c=2 pentru rândul 1. isValid(1,2): coloana diferită (2≠0), diagonal: |0-1|=1, |0-2|=2 → 1≠2. Valid! isValid = TRUE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "?", "active": true}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c0", "x": 30, "y": 90, "label": "(1,0)✗"},
          {"id": "r1c1", "x": 85, "y": 90, "label": "(1,1)✗"},
          {"id": "r1c2", "x": 140, "y": 90, "label": "(1,2)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c0"},
          {"source": "r0c0", "target": "r1c1"},
          {"source": "r0c0", "target": "r1c2", "active": true}
        ]
      }
    },
    {
      "line": 28,
      "text": "Plasăm regina la (1,2): col[1]=2. Apelăm recursiv solve(2). Tabla arată: Q la (0,0) și (1,2).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c0", "x": 30, "y": 90, "label": "(1,0)✗"},
          {"id": "r1c1", "x": 85, "y": 90, "label": "(1,1)✗"},
          {"id": "r1c2", "x": 140, "y": 90, "label": "(1,2)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c0"},
          {"source": "r0c0", "target": "r1c1"},
          {"source": "r0c0", "target": "r1c2"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(2): Testăm c=0. isValid(2,0): col[0]=0 → conflict coloana 0! FALSE. Testăm c=1: col[1]=2, diagonal |1-2|=1, |2-1|=1 → 1==1, conflict! FALSE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "X", "active": true}, {"val": "X", "active": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c2", "x": 140, "y": 90, "label": "(1,2)", "state": "visited"},
          {"id": "r2c0", "x": 85, "y": 130, "label": "(2,0)✗"},
          {"id": "r2c1", "x": 140, "y": 130, "label": "(2,1)✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c2"},
          {"source": "r1c2", "target": "r2c0"},
          {"source": "r1c2", "target": "r2c1"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(2): Testăm c=2. col[1]=2 → conflict coloana 2! FALSE. Testăm c=3: col[0]=0, |0-2|=2,|0-3|=3 diferite; col[1]=2, |1-2|=1,|2-3|=1 → 1==1, conflict diagonal! FALSE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "X", "active": true}, {"val": "X", "active": true}, {"val": "X", "active": true}, {"val": "X", "active": true}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c2", "x": 140, "y": 90, "label": "(1,2)", "state": "visited"},
          {"id": "r2c0", "x": 30, "y": 130, "label": "(2,0)✗"},
          {"id": "r2c1", "x": 85, "y": 130, "label": "(2,1)✗"},
          {"id": "r2c2", "x": 140, "y": 130, "label": "(2,2)✗"},
          {"id": "r2c3", "x": 195, "y": 130, "label": "(2,3)✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c2"},
          {"source": "r1c2", "target": "r2c0"},
          {"source": "r1c2", "target": "r2c1"},
          {"source": "r1c2", "target": "r2c2"},
          {"source": "r1c2", "target": "r2c3"}
        ]
      }
    },
    {
      "line": 26,
      "text": "Nicio coloană validă pe rândul 2 (cu Q la (0,0) și (1,2)). solve(2) se termină → BACKTRACK la solve(1). Revenim și continuăm cu c=3 pe rândul 1.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "?", "active": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c2", "x": 100, "y": 90, "label": "(1,2)✗"},
          {"id": "r1c3", "x": 195, "y": 90, "label": "(1,3)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c2"},
          {"source": "r0c0", "target": "r1c3", "active": true}
        ]
      }
    },
    {
      "line": 27,
      "text": "isValid(1,3): col[0]=0 → coloana diferită (3≠0); diagonal: |0-1|=1, |0-3|=3 → 1≠3. Valid! Plasăm Q la (1,3): col[1]=3.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c2", "x": 100, "y": 90, "label": "(1,2)✗"},
          {"id": "r1c3", "x": 195, "y": 90, "label": "(1,3)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "r0c0", "target": "r1c2"},
          {"source": "r0c0", "target": "r1c3"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Apelăm solve(2) din nou. Testăm c=0: col[0]=0→conflict col! c=1: col[0]=0,|0-2|=2,|0-1|=1 ok; col[1]=3,|1-2|=1,|3-1|=2 ok. isValid(2,1)=TRUE!",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "X"}, {"val": "?", "active": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c3", "x": 195, "y": 50, "label": "(1,3)", "state": "visited"},
          {"id": "r2c0b","x": 140, "y": 90, "label": "(2,0)✗"},
          {"id": "r2c1b","x": 195, "y": 90, "label": "(2,1)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r1c3"},
          {"source": "r1c3", "target": "r2c0b"},
          {"source": "r1c3", "target": "r2c1b", "active": true}
        ]
      }
    },
    {
      "line": 28,
      "text": "Plasăm Q la (2,1): col[2]=1. Apelăm solve(3). Tabla: Q la (0,0), (1,3), (2,1).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c3", "x": 195, "y": 50, "label": "(1,3)", "state": "visited"},
          {"id": "r2c1b","x": 195, "y": 90, "label": "(2,1)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r1c3"},
          {"source": "r1c3", "target": "r2c1b"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(3): Testăm c=0. isValid(3,0): col[0]=0→conflict col! FALSE. Testăm c=1: col[2]=1→conflict col! FALSE. Testăm c=2: verificăm toate reginele...",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "X"}, {"val": "X"}, {"val": "?", "active": true}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c3", "x": 195, "y": 50, "label": "(1,3)", "state": "visited"},
          {"id": "r2c1b","x": 195, "y": 90, "label": "(2,1)", "state": "visited"},
          {"id": "r3c0", "x": 100, "y": 130, "label": "(3,0)✗"},
          {"id": "r3c1", "x": 155, "y": 130, "label": "(3,1)✗"},
          {"id": "r3c2", "x": 210, "y": 130, "label": "(3,2)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r1c3"},
          {"source": "r1c3", "target": "r2c1b"},
          {"source": "r2c1b", "target": "r3c0"},
          {"source": "r2c1b", "target": "r3c1"},
          {"source": "r2c1b", "target": "r3c2", "active": true}
        ]
      }
    },
    {
      "line": 27,
      "text": "isValid(3,2): col[0]=0≠2; diag(0,3):|0-3|=3,|0-2|=2 ok. col[1]=3≠2; diag(1,3):|1-3|=2,|3-2|=1 ok. col[2]=1≠2; diag(2,3):|2-3|=1,|1-2|=1 → CONFLICT! FALSE.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "X"}, {"val": "X"}, {"val": "X", "active": true}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c3", "x": 195, "y": 50, "label": "(1,3)", "state": "visited"},
          {"id": "r2c1b","x": 195, "y": 90, "label": "(2,1)", "state": "visited"},
          {"id": "r3c0", "x": 100, "y": 130, "label": "(3,0)✗"},
          {"id": "r3c1", "x": 155, "y": 130, "label": "(3,1)✗"},
          {"id": "r3c2", "x": 210, "y": 130, "label": "(3,2)✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r1c3"},
          {"source": "r1c3", "target": "r2c1b"},
          {"source": "r2c1b", "target": "r3c0"},
          {"source": "r2c1b", "target": "r3c1"},
          {"source": "r2c1b", "target": "r3c2"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Testăm c=3 pe rândul 3. isValid(3,3): col[1]=3→CONFLICT coloana! FALSE. Niciun c valid pe rândul 3 → BACKTRACK la solve(2).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "X"}, {"val": "X"}, {"val": "X"}, {"val": "X", "active": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c3", "x": 195, "y": 50, "label": "(1,3)", "state": "visited"},
          {"id": "r2c1b","x": 195, "y": 90, "label": "(2,1)✗"},
          {"id": "r3c3", "x": 210, "y": 130, "label": "(3,3)✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r1c3"},
          {"source": "r1c3", "target": "r2c1b"},
          {"source": "r2c1b", "target": "r3c3"}
        ]
      }
    },
    {
      "line": 26,
      "text": "BACKTRACK la solve(2). Continuăm cu c=2,3 pe rândul 2. isValid(2,2): col[1]=3≠2, diag(1,2):|1-2|=1,|3-2|=1 CONFLICT! isValid(2,3): col[1]=3→conflict col! BACKTRACK la solve(1).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "X"}, {"val": "X"}, {"val": "X"}, {"val": "X", "active": true}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)", "state": "visited"},
          {"id": "r1c3", "x": 195, "y": 50, "label": "(1,3)✗"},
          {"id": "r2all","x": 210, "y": 90, "label": "r2:TOATE✗"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r1c3"},
          {"source": "r1c3", "target": "r2all"}
        ]
      }
    },
    {
      "line": 26,
      "text": "La solve(1), c=3 era ultima opțiune. Toate coloanele epuizate pe rândul 1 (cu Q la (0,0)) → BACKTRACK la solve(0). Continuăm cu c=1 pe rândul 0.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "?", "active": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)✗"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r0c1", "active": true}
        ]
      }
    },
    {
      "line": 27,
      "text": "isValid(0,1) = TRUE (tabla goală). Plasăm Q la (0,1): col[0]=1. Apelăm solve(1). Explorăm ramura (0,1).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c0", "x": 30, "y": 50, "label": "(0,0)✗"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c0"},
          {"source": "root", "target": "r0c1"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(1) cu col[0]=1: Testăm c=0. isValid(1,0): col[0]=1≠0; diag:|0-1|=1,|1-0|=1→CONFLICT! c=1: col[0]=1→conflict col! c=2: diag:|0-1|=1,|1-2|=1→CONFLICT! Testăm c=3.",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "X"}, {"val": "X"}, {"val": "X"}, {"val": "?", "active": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1"},
          {"source": "r0c1", "target": "s1c3", "active": true}
        ]
      }
    },
    {
      "line": 27,
      "text": "isValid(1,3): col[0]=1≠3; diag:|0-1|=1,|1-3|=2 ok. Valid! Plasăm Q la (1,3): col[1]=3. Apelăm solve(2).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1"},
          {"source": "r0c1", "target": "s1c3"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(2) cu (0,1),(1,3): Testăm c=0. isValid(2,0): col[0]=1≠0; diag(0,2):|0-2|=2,|1-0|=1 ok; col[1]=3≠0; diag(1,2):|1-2|=1,|3-0|=3 ok. isValid=TRUE!",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "?", "active": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "visited"},
          {"id": "s2c0", "x": 180, "y": 130, "label": "(2,0)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1"},
          {"source": "r0c1", "target": "s1c3"},
          {"source": "s1c3", "target": "s2c0", "active": true}
        ]
      }
    },
    {
      "line": 28,
      "text": "Plasăm Q la (2,0): col[2]=0. Apelăm solve(3). Tabla: Q la (0,1), (1,3), (2,0). Aproape de soluție!",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "visited"},
          {"id": "s2c0", "x": 180, "y": 130, "label": "(2,0)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1"},
          {"source": "r0c1", "target": "s1c3"},
          {"source": "s1c3", "target": "s2c0"}
        ]
      }
    },
    {
      "line": 27,
      "text": "solve(3) cu (0,1),(1,3),(2,0): Testăm c=0: col[2]=0→CONFLICT! c=1: col[0]=1→CONFLICT col! c=2: isValid(3,2): col[0]=1≠2,diag(0,3):|0-3|=3,|1-2|=1ok; col[1]=3≠2,diag(1,3):|1-3|=2,|3-2|=1ok; col[2]=0≠2,diag(2,3):|2-3|=1,|0-2|=2ok. isValid=TRUE!",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "X"}, {"val": "X"}, {"val": "?", "active": true}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "visited"},
          {"id": "s2c0", "x": 180, "y": 130, "label": "(2,0)", "state": "visited"},
          {"id": "s3c2", "x": 220, "y": 155, "label": "(3,2)", "state": "active"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1"},
          {"source": "r0c1", "target": "s1c3"},
          {"source": "s1c3", "target": "s2c0"},
          {"source": "s2c0", "target": "s3c2", "active": true}
        ]
      }
    },
    {
      "line": 28,
      "text": "Plasăm Q la (3,2): col[3]=2. Apelăm solve(4). Acum row==N (4==4) → SOLUȚIE GĂSITĂ! Prima soluție: col=[1,3,0,2] → Q la (0,1),(1,3),(2,0),(3,2).",
      "blocksVisual": [
        { "label": "Rând 0", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "row=0"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "visited"},
          {"id": "s2c0", "x": 180, "y": 130, "label": "(2,0)", "state": "visited"},
          {"id": "s3c2", "x": 220, "y": 155, "label": "(3,2)✓", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1"},
          {"source": "r0c1", "target": "s1c3"},
          {"source": "s1c3", "target": "s2c0"},
          {"source": "s2c0", "target": "s3c2", "active": true}
        ]
      }
    },
    {
      "line": 21,
      "text": "row==N: Tipărim 'Soluție găsită!'. Algoritmul continuă backtracking-ul pentru a găsi TOATE soluțiile. Tabla 4x4 are 2 soluții posibile.",
      "blocksVisual": [
        { "label": "Soluția 1: col=[1,3,0,2]", "groups": [[{"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 1", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}]] },
        { "label": "Rând 2", "groups": [[{"val": "Q", "sorted": true}, {"val": "·"}, {"val": "·"}, {"val": "·"}]] },
        { "label": "Rând 3", "groups": [[{"val": "·"}, {"val": "·"}, {"val": "Q", "sorted": true}, {"val": "·"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "root", "x": 130, "y": 10, "label": "SOLUTIE 1"},
          {"id": "r0c1", "x": 130, "y": 50, "label": "(0,1)", "state": "visited"},
          {"id": "s1c3", "x": 180, "y": 90, "label": "(1,3)", "state": "visited"},
          {"id": "s2c0", "x": 180, "y": 130, "label": "(2,0)", "state": "visited"},
          {"id": "s3c2", "x": 220, "y": 155, "label": "(3,2)", "state": "visited"}
        ],
        "edges": [
          {"source": "root", "target": "r0c1", "active": true},
          {"source": "r0c1", "target": "s1c3", "active": true},
          {"source": "s1c3", "target": "s2c0", "active": true},
          {"source": "s2c0", "target": "s3c2", "active": true}
        ]
      }
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
  },
  globalVars: [
    { name: "N", type: "int", val: "4", expandable: false },
    { name: "col", type: "std::vector<int>", val: "size = 4", expandable: true }
  ],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [
        { name: "N", type: "int", val: "4", expandable: false }
      ];
      const frames = [];
      let inlineVal = null;

      const stepData = [
        { row: 0, c: -1, col: [-1, -1, -1, -1], stack: [0] }, // 0
        { row: 0, c: -1, col: [-1, -1, -1, -1], stack: [0] }, // 1
        { row: 0, c: 0, col: [-1, -1, -1, -1], stack: [0] },  // 2
        { row: 0, c: 0, col: [0, -1, -1, -1], stack: [0] },   // 3
        { row: 1, c: 0, col: [0, -1, -1, -1], stack: [1, 0] }, // 4
        { row: 1, c: 1, col: [0, -1, -1, -1], stack: [1, 0] }, // 5
        { row: 1, c: 2, col: [0, -1, -1, -1], stack: [1, 0] }, // 6
        { row: 1, c: 2, col: [0, 2, -1, -1], stack: [1, 0] },  // 7
        { row: 2, c: 0, col: [0, 2, -1, -1], stack: [2, 1, 0] }, // 8
        { row: 2, c: 2, col: [0, 2, -1, -1], stack: [2, 1, 0] }, // 9
        { row: 1, c: 3, col: [0, -1, -1, -1], stack: [1, 0] }, // 10
        { row: 1, c: 3, col: [0, 3, -1, -1], stack: [1, 0] },  // 11
        { row: 2, c: 1, col: [0, 3, -1, -1], stack: [2, 1, 0] }, // 12
        { row: 2, c: 1, col: [0, 3, 1, -1], stack: [2, 1, 0] },  // 13
        { row: 3, c: 0, col: [0, 3, 1, -1], stack: [3, 2, 1, 0] }, // 14
        { row: 3, c: 2, col: [0, 3, 1, -1], stack: [3, 2, 1, 0] }, // 15
        { row: 3, c: 3, col: [0, 3, 1, -1], stack: [3, 2, 1, 0] }, // 16
        { row: 2, c: 2, col: [0, 3, -1, -1], stack: [2, 1, 0] }, // 17
        { row: 0, c: 1, col: [-1, -1, -1, -1], stack: [0] }, // 18
        { row: 0, c: 1, col: [1, -1, -1, -1], stack: [0] },  // 19
        { row: 1, c: 0, col: [1, -1, -1, -1], stack: [1, 0] }, // 20
        { row: 1, c: 3, col: [1, 3, -1, -1], stack: [1, 0] },  // 21
        { row: 2, c: 0, col: [1, 3, -1, -1], stack: [2, 1, 0] }, // 22
        { row: 2, c: 0, col: [1, 3, 0, -1], stack: [2, 1, 0] },  // 23
        { row: 3, c: 2, col: [1, 3, 0, -1], stack: [3, 2, 1, 0] }, // 24
        { row: 3, c: 2, col: [1, 3, 0, 2], stack: [3, 2, 1, 0] },  // 25
        { row: 4, c: -1, col: [1, 3, 0, 2], stack: [4, 3, 2, 1, 0] } // 26
      ];

      const curr = stepData[stepIndex] || stepData[stepData.length - 1];

      const colStr = "{" + curr.col.map(x => x === -1 ? "0" : x.toString()).join(", ") + "}";
      globalVars.push({ name: "col", type: "std::vector<int>", val: colStr, expandable: true });

      curr.stack.forEach((rVal) => {
        frames.push({
          name: "solve(row = " + rVal + ")",
          file: "solution.cpp",
          line: (rVal === curr.row) ? activeLine : 35
        });
      });
      frames.push({ name: "main()", file: "main.cpp", line: 37 });

      if (curr.row < 4) {
        vars.push({ name: "row", type: "int", val: curr.row.toString(), expandable: false });
      }
      if (curr.c !== -1) {
        vars.push({ name: "c", type: "int", val: curr.c.toString(), expandable: false });
      }

      inlineVal = "row: " + curr.row;
      if (curr.c !== -1) {
        inlineVal += ", c: " + curr.c;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const stepData = [
        { row: 0, c: -1 }, // 0
        { row: 0, c: -1 }, // 1
        { row: 0, c: 0 },  // 2
        { row: 0, c: 0 },  // 3
        { row: 1, c: 0 }, // 4
        { row: 1, c: 1 }, // 5
        { row: 1, c: 2 }, // 6
        { row: 1, c: 2 },  // 7
        { row: 2, c: 0 }, // 8
        { row: 2, c: 2 }, // 9
        { row: 1, c: 3 }, // 10
        { row: 1, c: 3 },  // 11
        { row: 2, c: 1 }, // 12
        { row: 2, c: 1 },  // 13
        { row: 3, c: 0 }, // 14
        { row: 3, c: 2 }, // 15
        { row: 3, c: 3 }, // 16
        { row: 2, c: 2 }, // 17
        { row: 0, c: 1 }, // 18
        { row: 0, c: 1 },  // 19
        { row: 1, c: 0 }, // 20
        { row: 1, c: 3 },  // 21
        { row: 2, c: 0 }, // 22
        { row: 2, c: 0 },  // 23
        { row: 3, c: 2 }, // 24
        { row: 3, c: 2 },  // 25
        { row: 4, c: -1 }  // 26
      ];
      const curr = stepData[stepIndex];
      if (!curr) return null;
      if (lineNum === 20 || lineNum === 21) {
        return "row: " + curr.row;
      }
      if (lineNum === 26 || lineNum === 27 || lineNum === 28 || lineNum === 29) {
        let val = "row: " + curr.row;
        if (curr.c !== -1) val += ", c: " + curr.c;
        return val;
      }
      return null;
    }
  }
};
