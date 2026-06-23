export const data = {
  "presentation": `### Prezentare Generală

Algoritmul lui Lee este o aplicație directă a parcurgerii în lățime (BFS - Breadth-First Search) pe o matrice (grid bidimensional). Este utilizat pe scară largă pentru a găsi cel mai scurt drum într-un labirint sau o matrice cu obstacole între o celulă sursă și o celulă destinație.

Ideea de bază este propagarea unui front de undă (expansion) pornind din sursă. Fiecare celulă accesibilă din punct de vedere geometric și nevizitată este marcată cu distanța de la sursă (care crește cu $1$ la fiecare pas). Deoarece folosim o coadă, prima dată când vizităm destinația garantăm că am găsit drumul cel mai scurt (deoarece pașii sunt parcurși în ordinea crescătoare a distanței).

Celulele labirintului pot fi traversate în 4 direcții (sus, jos, stânga, dreapta) sau 8 direcții (incluzând diagonalele), în funcție de regulile problemei.`,
  "complexity": `### Complexitate

Pentru o matrice de dimensiune $R \\times C$ (linii și coloane):
- **Timp:** $O(R \\times C)$ — în cel mai rău caz vizităm fiecare celulă din matrice o singură dată.
- **Spațiu:** $O(R \\times C)$ — necesar pentru a stoca distanțele minime pentru fiecare celulă și coada BFS.`,
  "variations": `### Variații și Edge Cases

1. **Celulă de pornire/sosire blocată:** Dacă celula sursă sau destinație conține un obstacol (valoare $1$), algoritmul trebuie să returneze imediat că drumul nu este posibil ($-1$).
2. **Obstacole dinamice / Eliminare:** În variante mai avansate, putem elimina un număr maxim de obstacole $K$, caz în care starea BFS-ului se extinde de la \`(r, c)\` la \`(r, c, obstacole_eliminate)\`.
3. **Ponderi diferite (0-1 BFS):** Dacă trecerea prin anumite celule are cost $0$ și prin altele cost $1$, se folosește un Deque în loc de Queue standard (0-1 BFS).`,
  "applications": `### Aplicații

- Găsirea celei mai scurte căi într-un labirint 2D.
- Algoritmi de rutare a cablurilor pe circuite integrate (routing).
- AI de bază pentru deplasarea personajelor pe hărți de tip grid în jocuri video.`,
  "code": `
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Cell {
    int r, c;
};

int leeAlgorithm(vector<vector<int>>& grid, Cell src, Cell dest) {
    int rows = grid.size();
    int cols = grid[0].size();
    if (grid[src.r][src.c] == 1 || grid[dest.r][dest.c] == 1) return -1;
    
    vector<vector<int>> dist(rows, vector<int>(cols, -1));
    queue<Cell> q;
    
    dist[src.r][src.c] = 0;
    q.push(src);
    
    int dr[] = {-1, 1, 0, 0};
    int dc[] = {0, 0, -1, 1};
    
    while (!q.empty()) {
        Cell curr = q.front();
        q.pop();
        
        if (curr.r == dest.r && curr.c == dest.c) {
            return dist[curr.r][curr.c];
        }
        
        for (int i = 0; i < 4; ++i) {
            int nr = curr.r + dr[i];
            int nc = curr.c + dc[i];
            
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (grid[nr][nc] == 0 && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[curr.r][curr.c] + 1;
                    q.push({nr, nc});
                }
            }
        }
    }
    return -1;
}

int main() {
    vector<vector<int>> grid = {
        {0, 1, 0, 0},
        {0, 0, 0, 1},
        {1, 0, 0, 0},
        {0, 0, 1, 0}
    };
    int ans = leeAlgorithm(grid, {0, 0}, {3, 3});
    cout << "Drum minim: " << ans << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 56,
      "text": "Apelăm funcția `leeAlgorithm` pentru o matrice $4 \\times 4$ cu sursa la coordonatele $(0, 0)$ și destinația la $(3, 3)$.",
      "blocksVisual": [
        {
          "label": "Configurație",
          "groups": [
            [
              { "val": "src = (0,0)", "active": true },
              { "val": "dest = (3,3)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Intrăm în funcția `leeAlgorithm` cu parametrii transmiși.",
      "blocksVisual": [
        {
          "label": "Stare",
          "groups": [
            [
              { "val": "src: (0,0)" },
              { "val": "dest: (3,3)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Determină numărul de linii al matricei: `rows = 4`.",
      "blocksVisual": [
        {
          "label": "rows",
          "groups": [[{ "val": "4", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Determină numărul de coloane al matricei: `cols = 4`.",
      "blocksVisual": [
        {
          "label": "cols",
          "groups": [[{ "val": "4", "active": true }]]
        }
      ]
    },
    {
      "line": 15,
      "text": "Verificăm dacă celulele de start și destinație nu sunt obstacole. Ambele sunt libere (valori $0$).",
      "blocksVisual": [
        {
          "label": "Verificare celule",
          "groups": [
            [
              { "val": "src liber: da", "active": true },
              { "val": "dest liber: da", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Inițializăm matricea `dist` de dimensiuni $4 \\times 4$ cu valoarea $-1$ pentru a marca celulele nevizitate.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist (Obstacole cu █)",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", -1, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 18,
      "text": "Inițializăm coada FIFO `q` pentru a gestiona ordinea de parcurgere BFS.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", -1, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 20,
      "text": "Setăm distanța celulei de start la $0$: `dist[0][0] = 0`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "Adăugăm celula sursă $(0,0)$ în coada `q`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(0,0)", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 23,
      "text": "Definim vectorul `dr = {-1, 1, 0, 0}` pentru deplasarea pe linii.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(0,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 24,
      "text": "Definim vectorul `dc = {0, 0, -1, 1}` pentru deplasarea pe coloane.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(0,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 26,
      "text": "Pornim bucla principală BFS. Aceasta rulează cât timp coada nu este goală.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(0,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem prima celulă din coadă: `curr = (0,0)`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(0,0)", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 28,
      "text": "Scoatem celula din coadă (operația pop). Coada devine goală.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 30,
      "text": "Verificăm dacă `curr` este destinația $(3,3)$. Nu este, deci continuăm expansiunea.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 34,
      "text": "Iterăm prin cele 4 direcții. Evaluăm vecinul din dreapta $(0,1)$, dar este obstacol ('█'). Evaluăm vecinul de jos $(1,0)$, care este liber și nevizitat.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", -1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": [{"r": 1, "c": 0}]
      }
    },
    {
      "line": 40,
      "text": "Setăm distanța minimă `dist[1][0] = dist[0][0] + 1 = 1`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": [{"r": 1, "c": 0}]
      }
    },
    {
      "line": 41,
      "text": "Adăugăm celula `(1,0)` în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(1,0)", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 0}],
        "highlightCells": [{"r": 1, "c": 0}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 1 element: `(1,0)`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(1,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (1,0)`. Pop din coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, -1, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(1,0)`. Vecinul `(1,1)` este liber și nevizitat. Îi setăm distanța la `dist[1][1] = dist[1][0] + 1 = 2` și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(1,1)", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 0}],
        "highlightCells": [{"r": 1, "c": 1}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 1 element: `(1,1)`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(1,1)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (1,1)`. Pop din coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, -1, "█"],
          ["2", "█", -1, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(1,1)`. Vecinii liberi și nevizitați sunt `(2,1)` și `(1,2)`. Setăm distanțele `dist[2][1] = 3`, `dist[1][2] = 3` și îi adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(2,1)" }, { "val": "(1,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 1}],
        "highlightCells": [{"r": 2, "c": 1}, {"r": 1, "c": 2}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 2 elemente: `[(2,1), (1,2)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(2,1)" }, { "val": "(1,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (2,1)`. Pop din coadă. Coada rămâne: `[(1,2)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(1,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, -1, -1],
          ["3", -1, -1, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(2,1)`. Vecinii liberi și nevizitați sunt `(3,1)` și `(2,2)`. Setăm distanțele `dist[3][1] = 4`, `dist[2][2] = 4` și îi adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(1,2)" }, { "val": "(3,1)" }, { "val": "(2,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", -1, 4, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 1}],
        "highlightCells": [{"r": 3, "c": 1}, {"r": 2, "c": 2}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 3 elemente: `[(1,2), (3,1), (2,2)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(1,2)" }, { "val": "(3,1)" }, { "val": "(2,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", -1, 4, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (1,2)`. Pop din coadă. Coada rămâne: `[(3,1), (2,2)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(3,1)" }, { "val": "(2,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", -1, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", -1, 4, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(1,2)`. Vecinul liber și nevizitat este `(0,2)`. Setăm distanța `dist[0][2] = 4` și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(3,1)" }, { "val": "(2,2)" }, { "val": "(0,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", -1, 4, "█", -1]
        ],
        "activeCells": [{"r": 1, "c": 2}],
        "highlightCells": [{"r": 0, "c": 2}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 3 elemente: `[(3,1), (2,2), (0,2)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(3,1)" }, { "val": "(2,2)" }, { "val": "(0,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", -1, 4, "█", -1]
        ],
        "activeCells": [{"r": 3, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (3,1)`. Pop din coadă. Coada rămâne: `[(2,2), (0,2)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(2,2)" }, { "val": "(0,2)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", -1, 4, "█", -1]
        ],
        "activeCells": [{"r": 3, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(3,1)`. Vecinul liber și nevizitat este `(3,0)`. Setăm distanța `dist[3][0] = 5` și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(2,2)" }, { "val": "(0,2)" }, { "val": "(3,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 3, "c": 1}],
        "highlightCells": [{"r": 3, "c": 0}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 3 elemente: `[(2,2), (0,2), (3,0)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(2,2)" }, { "val": "(0,2)" }, { "val": "(3,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (2,2)`. Pop din coadă. Coada rămâne: `[(0,2), (3,0)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(0,2)" }, { "val": "(3,0)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, -1],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(2,2)`. Vecinul liber și nevizitat este `(2,3)`. Setăm distanța `dist[2][3] = 5` și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(0,2)" }, { "val": "(3,0)" }, { "val": "(2,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": [{"r": 2, "c": 3}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 3 elemente: `[(0,2), (3,0), (2,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(0,2)" }, { "val": "(3,0)" }, { "val": "(2,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (0,2)`. Pop din coadă. Coada rămâne: `[(3,0), (2,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(3,0)" }, { "val": "(2,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, -1],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(0,2)`. Vecinul liber și nevizitat este `(0,3)`. Setăm distanța `dist[0][3] = 5` și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(3,0)" }, { "val": "(2,3)" }, { "val": "(0,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 0, "c": 2}],
        "highlightCells": [{"r": 0, "c": 3}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 3 elemente: `[(3,0), (2,3), (0,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(3,0)" }, { "val": "(2,3)" }, { "val": "(0,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 3, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (3,0)`. Pop din coadă. Coada rămâne: `[(2,3), (0,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(2,3)" }, { "val": "(0,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 3, "c": 0}],
        "highlightCells": []
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 2 elemente: `[(2,3), (0,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(2,3)" }, { "val": "(0,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (2,3)`. Pop din coadă. Coada rămâne: `[(0,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(0,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", -1]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 40,
      "text": "Explorăm vecinii lui `(2,3)`. Vecinul liber și nevizitat este destinația `(3,3)`! Setăm distanța `dist[3][3] = dist[2][3] + 1 = 6` și îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(0,3)" }, { "val": "(3,3)", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": [{"r": 3, "c": 3}]
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 2 elemente: `[(0,3), (3,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(0,3)" }, { "val": "(3,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 0, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (0,3)`. Pop din coadă. Coada rămâne: `[(3,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[{ "val": "(3,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 0, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 26,
      "text": "Următoarea iterație. Coada are 1 element: `[(3,3)]`.",
      "blocksVisual": [
        {
          "label": "Queue q",
          "groups": [[{ "val": "(3,3)" }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 3, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 27,
      "text": "Extragem `curr = (3,3)`. Pop din coadă. Coada devine goală.",
      "blocksVisual": [
        {
          "label": "Queue q (Coada)",
          "groups": [[]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 3, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 30,
      "text": "Verificăm dacă `curr` este destinația $(3,3)$. Este adevărat! Am găsit cel mai scurt drum.",
      "blocksVisual": [
        {
          "label": "Verificare destinație",
          "groups": [[{ "val": "Destinație atinsă!", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 3, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 31,
      "text": "Returnăm distanța minimă până la destinație: `dist[3][3] = 6`.",
      "blocksVisual": [
        {
          "label": "Returnează",
          "groups": [[{ "val": "6", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [{"r": 3, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 57,
      "text": "Revenim în funcția `main`. Afișăm rezultatul drumului minim: 6.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [[{ "val": "Drum minim = 6", "active": true }]]
        }
      ],
      "matrix": {
        "title": "Matricea dist",
        "headers": ["R/C", "0", "1", "2", "3"],
        "data": [
          ["0", 0, "█", 4, 5],
          ["1", 1, 2, 3, "█"],
          ["2", "█", 3, 4, 5],
          ["3", 5, 4, "█", 6]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "grid", type: "std::vector<std::vector<int>>", val: "size = 4 x 4", expandable: true });

      if (stepIndex === 0 || stepIndex === 41) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        if (stepIndex === 41) {
          vars.push({ name: "ans", type: "int", val: "6", expandable: false });
          inlineVal = "ans: 6";
        }
      } else {
        frames.push({ name: "leeAlgorithm(grid, src={r:0,c:0}, dest={r:3,c:3})", file: "solution.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 79 });

        vars.push({ name: "src", type: "Cell", val: "{r:0, c:0}", expandable: false });
        vars.push({ name: "dest", type: "Cell", val: "{r:3, c:3}", expandable: false });
        
        if (stepIndex >= 2) vars.push({ name: "rows", type: "int", val: "4", expandable: false });
        if (stepIndex >= 3) vars.push({ name: "cols", type: "int", val: "4", expandable: false });
        if (stepIndex >= 5) {
          vars.push({ name: "dist", type: "std::vector<std::vector<int>>", val: "size = 4 x 4", expandable: true });
        }
        
        const qStates = [
          [], [], [], [], [], [], [], [], 
          ["{r:0,c:0}"], ["{r:0,c:0}"], ["{r:0,c:0}"], ["{r:0,c:0}"], [], [], [], [], 
          ["{r:1,c:0}"], ["{r:1,c:0}"], [], ["{r:1,c:1}"], ["{r:1,c:1}"], [], 
          ["{r:2,c:1}", "{r:1,c:2}"], ["{r:1,c:2}"], 
          ["{r:1,c:2}", "{r:3,c:1}", "{r:2,c:2}"], ["{r:3,c:1}", "{r:2,c:2}"], 
          ["{r:3,c:1}", "{r:2,c:2}", "{r:0,c:2}"], ["{r:2,c:2}", "{r:0,c:2}"], 
          ["{r:2,c:2}", "{r:0,c:2}", "{r:3,c:0}"], ["{r:0,c:2}", "{r:3,c:0}"], 
          ["{r:0,c:2}", "{r:3,c:0}", "{r:2,c:3}"], ["{r:3,c:0}", "{r:2,c:3}"], 
          ["{r:3,c:0}", "{r:2,c:3}", "{r:0,c:3}"], ["{r:2,c:3}", "{r:0,c:3}"], 
          ["{r:0,c:3}"], ["{r:0,c:3}", "{r:3,c:3}"], ["{r:3,c:3}"], [], [], [], []
        ];
        
        const qList = qStates[stepIndex] || [];
        if (stepIndex >= 6) {
          vars.push({ name: "q", type: "std::queue<Cell>", val: qList.length > 0 ? qList.join(", ") : "empty", expandable: false });
        }

        const currCells = [
          null, null, null, null, null, null, null, null, null, null,
          "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}",
          "{r:1,c:0}", "{r:1,c:0}", "{r:1,c:0}",
          "{r:1,c:1}", "{r:1,c:1}",
          "{r:2,c:1}", "{r:2,c:1}",
          "{r:1,c:2}", "{r:1,c:2}",
          "{r:3,c:1}", "{r:3,c:1}",
          "{r:2,c:2}", "{r:2,c:2}",
          "{r:0,c:2}", "{r:0,c:2}",
          "{r:3,c:0}",
          "{r:2,c:3}", "{r:2,c:3}",
          "{r:0,c:3}",
          "{r:3,c:3}", "{r:3,c:3}", "{r:3,c:3}", "{r:3,c:3}"
        ];
        const currVal = currCells[stepIndex];
        if (currVal) {
          vars.push({ name: "curr", type: "Cell", val: currVal, expandable: false });
          inlineVal = `curr: ${currVal}`;
        } else {
          inlineVal = "src: {r:0,c:0}, dest: {r:3,c:3}";
        }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 36 || lineNum === 37) {
        return "grid.size(): 4";
      }
      const currCells = [
        null, null, null, null, null, null, null, null, null, null,
        "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}", "{r:0,c:0}",
        "{r:1,c:0}", "{r:1,c:0}", "{r:1,c:0}",
        "{r:1,c:1}", "{r:1,c:1}",
        "{r:2,c:1}", "{r:2,c:1}",
        "{r:1,c:2}", "{r:1,c:2}",
        "{r:3,c:1}", "{r:3,c:1}",
        "{r:2,c:2}", "{r:2,c:2}",
        "{r:0,c:2}", "{r:0,c:2}",
        "{r:3,c:0}",
        "{r:2,c:3}", "{r:2,c:3}",
        "{r:0,c:3}",
        "{r:3,c:3}", "{r:3,c:3}", "{r:3,c:3}", "{r:3,c:3}"
      ];
      const currVal = currCells[stepIndex];
      if (currVal && (lineNum === 50 || lineNum === 51 || lineNum === 53)) {
        return `curr: ${currVal}`;
      }
      return null;
    }
  },

  "problems": {
    "easy": [
      {
        "title": "Shortest Path in Binary Matrix",
        "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
        "desc": "Găsește lungimea celui mai scurt drum pe o matrice 8-direcțională folosind BFS / Lee."
      }
    ],
    "medium": [
      {
        "title": "Rotting Oranges",
        "url": "https://leetcode.com/problems/rotting-oranges/",
        "desc": "Calculează timpul minim până când toate portocalele devin alterate, modelat ca un BFS cu surse multiple."
      }
    ],
    "hard": [
      {
        "title": "Shortest Path in a Grid with Obstacles Elimination",
        "url": "https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/",
        "desc": "Găsește drumul minim de la (0,0) la (M-1, N-1) cu permisiunea de a elimina maximum K obstacole."
      }
    ]
  }
};
