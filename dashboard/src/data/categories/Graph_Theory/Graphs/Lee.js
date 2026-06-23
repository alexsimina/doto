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
    "line": 55,
    "text": "Apelăm funcția leeAlgorithm pentru grid, src=(0,0), dest=(3,3).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          -1,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 12,
    "text": "Obținem numărul de rânduri: rows = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          -1,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 13,
    "text": "Obținem numărul de coloane: cols = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          -1,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 14,
    "text": "Verificăm dacă sursa sau destinația este obstacol (1). Ambele sunt 0 (libere).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          -1,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 16,
    "text": "Inițializăm matricea dist cu valoarea -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          -1,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 17,
    "text": "Inițializăm coada q.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          -1,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 19,
    "text": "Setăm distanța pentru sursă la 0: dist[0][0] = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 20,
    "text": "Adăugăm sursa în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 22,
    "text": "Definim dr = {-1, 1, 0, 0}.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 23,
    "text": "Definim dc = {0, 0, -1, 1}.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 1 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (0, 0).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (-1, 0). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          -1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[1][0] = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (1, 0) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, -1). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 1 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (1, 0).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, -1). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          -1,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[1][1] = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (1, 1) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 1 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (1, 1).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          -1,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[2][1] = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (2, 1) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          -1,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[1][2] = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (1, 2) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            },
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 2 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,1)"
            },
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (2, 1).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          -1,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[3][1] = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (3, 1) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          -1,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[2][2] = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (2, 2) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 3 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(1,2)"
            },
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (1, 2).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          -1,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[0][2] = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (0, 2) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 3). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 3 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,1)"
            },
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (3, 1).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (4, 1). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          -1,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[3][0] = 5.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (3, 0) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 3 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,2)"
            },
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (2, 2).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 3). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          -1
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[2][3] = 5.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (2, 3) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 3 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,2)"
            },
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (0, 2).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (-1, 2). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 3). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          -1
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[0][3] = 5.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (0, 3) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 2
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 3 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,0)"
            },
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (3, 0).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 0). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (4, 0). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, -1). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, 1). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 2 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(2,3)"
            },
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (2, 3).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 3). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (3, 3). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Da.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          -1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 39,
    "text": "Actualizăm dist[3][3] = 6.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 40,
    "text": "Adăugăm (3, 3) în coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 3,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (2, 4). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 2 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(0,3)"
            },
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (0, 3).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = -1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (-1, 3). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 1.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (1, 3). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 1,
          "c": 3
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 2.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 2). În limite.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 38,
    "text": "Verificăm dacă celula e liberă și nevizitată. Nu.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": [
        {
          "r": 0,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Explorăm vecinul i=3.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Calculăm nr = 0.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Calculăm nc = 4.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 37,
    "text": "Verificăm limitele pentru (0, 4). În afara limitelor.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 25,
    "text": "Începem o iterație BFS. Coada are 1 elemente.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          [
            {
              "val": "(3,3)"
            }
          ]
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 26,
    "text": "Extragem primul element din coadă: curr = (3, 3).",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 27,
    "text": "Scoatem elementul din coadă.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă curr este destinația (3,3). Da, este destinația!",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 30,
    "text": "Returnăm distanța minimă: 6.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [
        {
          "r": 3,
          "c": 3
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 56,
    "text": "Afișăm drumul minim.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 57,
    "text": "Program finalizat.",
    "blocksVisual": [
      {
        "label": "Queue q",
        "groups": [
          []
        ]
      }
    ],
    "matrix": {
      "title": "Matricea dist",
      "headers": [
        "R/C",
        "0",
        "1",
        "2",
        "3"
      ],
      "data": [
        [
          "0",
          0,
          "█",
          4,
          5
        ],
        [
          "1",
          1,
          2,
          3,
          "█"
        ],
        [
          "2",
          "█",
          3,
          4,
          5
        ],
        [
          "3",
          5,
          4,
          "█",
          6
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  }
],
  "debugger": {
    
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [{"line": 55,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":null,"cols":null,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 12,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":null,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 13,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 14,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 16,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 17,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 19,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 20,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 22,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 23,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":null,"nr":null,"nc":null},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":null,"nr":null,"nc":null},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":null,"nr":null,"nc":null},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":null,"nc":null},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":-1,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":-1,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":-1,"nc":0},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":-1,"nc":0},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[{"r":1,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":1,"nc":0},"q":[{"r":1,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":0,"nc":1},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":0,"nc":1},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":0,"nc":1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":0,"nc":0},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":2,"nc":0},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":1,"nc":-1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":1,"nc":-1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":1,"nc":-1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":-1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[{"r":1,"c":1}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[{"r":1,"c":1}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":1},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":1},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":1,"nc":1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":0,"nc":1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[{"r":2,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":2,"nc":1},"q":[{"r":2,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1},{"r":1,"c":2}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1},{"r":1,"c":2}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":3,"nc":1},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1},{"r":2,"c":2}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1},{"r":2,"c":2}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0},{"r":2,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0},{"r":2,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3},{"r":0,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3},{"r":0,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":3,"nc":3},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 30,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 56,"locals":{"ans":6,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 57,"locals":{"ans":6,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      let qStr = "empty";
      if (state.q.length > 0) {
          qStr = state.q.map(e => `(${e.r},${e.c})`).join(", ");
      }

      if (activeLine >= 73 && activeLine <= 81 && activeLine !== 79) {
          frames.push({ name: "main()", file: "main.cpp", line: activeLine });
          vars.push({ name: "grid", type: "vector<vector<int>>", val: "size = 4x4", expandable: true });
          if (locals.ans !== null) vars.push({ name: "ans", type: "int", val: locals.ans.toString() });
      } else {
          frames.push({ name: "leeAlgorithm(grid, src, dest)", file: "solution.cpp", line: activeLine });
          frames.push({ name: "main()", file: "main.cpp", line: 55 });
          
          vars.push({ name: "grid", type: "vector<vector<int>>&", val: "size = 4x4", expandable: true });
          vars.push({ name: "src", type: "Cell", val: "{0, 0}" });
          vars.push({ name: "dest", type: "Cell", val: "{3, 3}" });
          if (locals.rows !== null) vars.push({ name: "rows", type: "int", val: "4" });
          if (locals.cols !== null) vars.push({ name: "cols", type: "int", val: "4" });
          vars.push({ name: "dist", type: "vector<vector<int>>", val: "size = 4x4", expandable: true });
          vars.push({ name: "q", type: "queue<Cell>", val: qStr });
          
          if (locals.curr) {
              vars.push({ name: "curr", type: "Cell", val: `{${locals.curr.r}, ${locals.curr.c}}` });
          }
          if (locals.i !== null) vars.push({ name: "i", type: "int", val: locals.i.toString() });
          if (locals.nr !== null) vars.push({ name: "nr", type: "int", val: locals.nr.toString() });
          if (locals.nc !== null) vars.push({ name: "nc", type: "int", val: locals.nc.toString() });
      }

      let inlineVal = null;
      if (locals.curr !== null && activeLine >= 49 && activeLine <= 68) {
          inlineVal = `curr: {${locals.curr.r}, ${locals.curr.c}}`;
          if (locals.nr !== null && locals.nc !== null) {
              inlineVal += `, nr: ${locals.nr}, nc: ${locals.nc}`;
          }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"line": 55,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":null,"cols":null,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 12,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":null,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 13,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 14,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 16,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 17,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 19,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[]},{"line": 20,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 22,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 23,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":null,"i":null,"nr":null,"nc":null},"q":[{"r":0,"c":0}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":null,"nr":null,"nc":null},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":null,"nr":null,"nc":null},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":null,"nr":null,"nc":null},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":null,"nc":null},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":-1,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":-1,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":0,"nr":-1,"nc":0},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":-1,"nc":0},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":1,"nr":1,"nc":0},"q":[{"r":1,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":1,"nc":0},"q":[{"r":1,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":2,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":-1},"q":[{"r":1,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":0},"i":3,"nr":0,"nc":1},"q":[{"r":1,"c":0}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":0,"nc":1},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":0,"nc":1},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":0,"nc":1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":0,"nr":0,"nc":0},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":0,"nc":0},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":1,"nr":2,"nc":0},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":2,"nc":0},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":1,"nc":-1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":1,"nc":-1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":2,"nr":1,"nc":-1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":-1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[{"r":1,"c":1}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":0},"i":3,"nr":1,"nc":1},"q":[{"r":1,"c":1}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":1},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":1},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":1,"nc":1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":0,"nr":0,"nc":1},"q":[]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":0,"nc":1},"q":[]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":1,"nr":2,"nc":1},"q":[{"r":2,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":2,"nc":1},"q":[{"r":2,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":2,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":0},"q":[{"r":2,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1},{"r":1,"c":2}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":2,"c":1},{"r":1,"c":2}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":2},"q":[{"r":1,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":0,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":1,"nc":1},"q":[{"r":1,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":1,"nr":3,"nc":1},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":3,"nc":1},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":2,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":0},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1},{"r":2,"c":2}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":1},"i":3,"nr":2,"nc":2},"q":[{"r":1,"c":2},{"r":3,"c":1},{"r":2,"c":2}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":0,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":0,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":1,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":2,"nc":2},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":2,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":1},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":1,"c":2},"i":3,"nr":1,"nc":3},"q":[{"r":3,"c":1},{"r":2,"c":2},{"r":0,"c":2}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":1,"nc":3},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":0,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":2,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":1,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":4,"nc":1},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":2,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":0},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":1},"i":3,"nr":3,"nc":2},"q":[{"r":2,"c":2},{"r":0,"c":2},{"r":3,"c":0}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":0,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":1,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":3,"nc":2},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":2,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":1},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0},{"r":2,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":0,"c":2},{"r":3,"c":0},{"r":2,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":2,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":0,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":-1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":1,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":1,"nc":2},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":2,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":1},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3},{"r":0,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":2},"i":3,"nr":0,"nc":3},"q":[{"r":3,"c":0},{"r":2,"c":3},{"r":0,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":0,"nc":3},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":0,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":2,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":1,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":4,"nc":0},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":2,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":-1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":0},"i":3,"nr":3,"nc":1},"q":[{"r":2,"c":3},{"r":0,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":3,"nc":1},"q":[{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":0,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":0,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 39,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3}]},{"line": 40,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":1,"nr":3,"nc":3},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":3,"nc":3},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":2,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":2},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":2,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":0,"c":3},{"r":3,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":2,"nc":4},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":0,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":-1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":1,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":1,"nc":3},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 38,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":2,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 33,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":2},"q":[{"r":3,"c":3}]},{"line": 34,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 35,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 37,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 25,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":0,"c":3},"i":3,"nr":0,"nc":4},"q":[{"r":3,"c":3}]},{"line": 26,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 27,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 29,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 30,"locals":{"ans":null,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 56,"locals":{"ans":6,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]},{"line": 57,"locals":{"ans":6,"srcR":0,"srcC":0,"destR":3,"destC":3,"rows":4,"cols":4,"curr":{"r":3,"c":3},"i":3,"nr":0,"nc":4},"q":[]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (lineNum === 26) return locals.curr ? `curr: {${locals.curr.r}, ${locals.curr.c}}` : null;
      if (lineNum === 34) return locals.nr !== null ? `nr: ${locals.nr}` : null;
      if (lineNum === 35) return locals.nc !== null ? `nc: ${locals.nc}` : null;
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
