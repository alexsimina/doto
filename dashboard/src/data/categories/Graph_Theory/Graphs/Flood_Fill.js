export const data = {
  "presentation": `### Prezentare Generală

Algoritmul Flood Fill (sau algoritmul de umplere) este o tehnică utilizată pentru a determina și marca regiunile conectate dintr-o matrice multidimensională. Este cel mai bine cunoscut pentru funcționarea sa în instrumentul „Bucket Fill” (găleata de vopsea) din programele de editare grafică, unde dând click pe un pixel, întreaga zonă adiacentă de aceeași culoare este colorată cu o culoare nouă.

Algoritmul începe dintr-o celulă de start (sursă) și explorează toți vecinii acesteia în mod recursiv (folosind DFS - Depth-First Search) sau iterativ (folosind BFS - Breadth-First Search). Procesul se repetă pentru fiecare vecin care are culoarea inițială a punctului de pornire.

Este esențial să verificăm dacă noua culoare este diferită de cea veche înainte de a rula algoritmul; în caz contrar, programul va intra într-o buclă de recursivitate infinită (depășire de stivă - stack overflow).`,
  "complexity": `### Complexitate

Pentru o matrice de dimensiuni $R \\times C$ (linii și coloane):
- **Timp:** $O(R \\times C)$ — fiecare celulă este vizitată cel mult o dată (sau de un număr constant de ori corespunzător celor 4 direcții).
- **Spațiu:** $O(R \\times C)$ — în cazul DFS recursiv, stiva de recursivitate poate ajunge la o adâncime de $R \\times C$ în cel mai rău caz (o matrice liniară fără obstacole).`,
  "variations": `### Variații și Edge Cases

1. **Direcții de conectivitate:** Flood Fill poate fi aplicat pe 4 direcții (sus, jos, stânga, dreapta) sau 8 direcții (incluzând diagonalele).
2. **Flood Fill pe grafuri:** Deși este definit pe matrice, conceptul se aplică pe orice graf pentru a identifica componentele conexe (Connected Components).
3. **Culoare identică:** Dacă apelăm algoritmul pentru a înlocui o culoare cu ea însăși, trebuie să ne oprim imediat pentru a preveni recursivitatea infinită.`,
  "applications": `### Aplicații

- Instrumentul de umplere cu culoare (Paint Bucket) din editori grafici.
- Numărarea numărului de regiuni izolate (de exemplu, determinarea numărului de insule într-o hartă satelit).
- Detectarea zonelor închise în jocuri precum Minesweeper sau Go.`,
  "code": `
#include <iostream>
#include <vector>

using namespace std;

void floodFill(vector<vector<int>>& image, int r, int c, int oldColor, int newColor) {
    int rows = image.size();
    int cols = image[0].size();
    
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (image[r][c] != oldColor) return;
    
    image[r][c] = newColor;
    
    floodFill(image, r - 1, c, oldColor, newColor); // Sus
    floodFill(image, r + 1, c, oldColor, newColor); // Jos
    floodFill(image, r, c - 1, oldColor, newColor); // Stanga
    floodFill(image, r, c + 1, oldColor, newColor); // Dreapta
}

int main() {
    vector<vector<int>> img = {
        {1, 1, 1},
        {1, 1, 0},
        {1, 0, 1}
    };
    
    int startColor = img[1][1]; // Culoarea de start este 1
    if (startColor != 2) {
        floodFill(img, 1, 1, startColor, 2);
    }
    
    cout << "Imaginea dupa Flood Fill:\n";
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << img[i][j] << " ";
        }
        cout << "\n";
    }
    return 0;
}
`,
  "explanations": [
  {
    "line": 22,
    "text": "Inițializăm matricea `img` de dimensiuni 3x3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 28,
    "text": "Preluăm culoarea de start: `startColor = img[1][1] = 1`.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 29,
    "text": "Verificăm dacă `startColor != 2`. Adevărat (1 != 2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 30,
    "text": "Apelăm `floodFill` pentru celula (1,1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 1. La fel, continuăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          1,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 13,
    "text": "Colorăm celula (1, 1) în noua culoare (2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 15,
    "text": "Apelăm recursiv floodFill pentru vecinul de sus (0, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=0, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 1. La fel, continuăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          1,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 13,
    "text": "Colorăm celula (0, 1) în noua culoare (2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 15,
    "text": "Apelăm recursiv floodFill pentru vecinul de sus (-1, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": [
        {
          "r": -1,
          "c": 1
        }
      ]
    }
  },
  {
    "line": 7,
    "text": "Intrăm în floodFill pentru r=-1, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=-1, c=1). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 16,
    "text": "Revenim la (0, 1). Apelăm recursiv floodFill pentru vecinul de jos (1, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 17,
    "text": "Revenim la (0, 1). Apelăm recursiv floodFill pentru vecinul din stânga (0, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=0, c=0). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 1. La fel, continuăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          1,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 13,
    "text": "Colorăm celula (0, 0) în noua culoare (2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 15,
    "text": "Apelăm recursiv floodFill pentru vecinul de sus (-1, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
          "r": -1,
          "c": 0
        }
      ]
    }
  },
  {
    "line": 7,
    "text": "Intrăm în floodFill pentru r=-1, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=-1, c=0). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 16,
    "text": "Revenim la (0, 0). Apelăm recursiv floodFill pentru vecinul de jos (1, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=0). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 1. La fel, continuăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          1,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 13,
    "text": "Colorăm celula (1, 0) în noua culoare (2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 15,
    "text": "Apelăm recursiv floodFill pentru vecinul de sus (0, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=0, c=0). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 16,
    "text": "Revenim la (1, 0). Apelăm recursiv floodFill pentru vecinul de jos (2, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=2, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=2, c=0). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 1. La fel, continuăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          1,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 13,
    "text": "Colorăm celula (2, 0) în noua culoare (2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 15,
    "text": "Apelăm recursiv floodFill pentru vecinul de sus (1, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=0). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 16,
    "text": "Revenim la (2, 0). Apelăm recursiv floodFill pentru vecinul de jos (3, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=3, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=3, c=0). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 17,
    "text": "Revenim la (2, 0). Apelăm recursiv floodFill pentru vecinul din stânga (2, -1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": [
        {
          "r": 2,
          "c": -1
        }
      ]
    }
  },
  {
    "line": 7,
    "text": "Intrăm în floodFill pentru r=2, c=-1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=2, c=-1). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 18,
    "text": "Revenim la (2, 0). Apelăm recursiv floodFill pentru vecinul din dreapta (2, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=2, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=2, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 0. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 19,
    "text": "Am finalizat explorarea pentru (2, 0) și ne întoarcem.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 2,
          "c": 0
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 17,
    "text": "Revenim la (1, 0). Apelăm recursiv floodFill pentru vecinul din stânga (1, -1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
          "c": -1
        }
      ]
    }
  },
  {
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=-1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=1, c=-1). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 1,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 18,
    "text": "Revenim la (1, 0). Apelăm recursiv floodFill pentru vecinul din dreapta (1, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 19,
    "text": "Am finalizat explorarea pentru (1, 0) și ne întoarcem.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 17,
    "text": "Revenim la (0, 0). Apelăm recursiv floodFill pentru vecinul din stânga (0, -1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
          "c": -1
        }
      ]
    }
  },
  {
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=-1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=0, c=-1). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": -1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 18,
    "text": "Revenim la (0, 0). Apelăm recursiv floodFill pentru vecinul din dreapta (0, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=0, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 19,
    "text": "Am finalizat explorarea pentru (0, 0) și ne întoarcem.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 18,
    "text": "Revenim la (0, 1). Apelăm recursiv floodFill pentru vecinul din dreapta (0, 2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=2. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=0, c=2). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 1. La fel, continuăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          1
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 13,
    "text": "Colorăm celula (0, 2) în noua culoare (2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 15,
    "text": "Apelăm recursiv floodFill pentru vecinul de sus (-1, 2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
          "r": -1,
          "c": 2
        }
      ]
    }
  },
  {
    "line": 7,
    "text": "Intrăm în floodFill pentru r=-1, c=2. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=-1, c=2). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": -1,
          "c": 2
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 16,
    "text": "Revenim la (0, 2). Apelăm recursiv floodFill pentru vecinul de jos (1, 2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=2. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=2). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 0. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 17,
    "text": "Revenim la (0, 2). Apelăm recursiv floodFill pentru vecinul din stânga (0, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 10,
    "text": "Verificăm limitele (r=0, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 18,
    "text": "Revenim la (0, 2). Apelăm recursiv floodFill pentru vecinul din dreapta (0, 3).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=0, c=3. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=0, c=3). Suntem în afara limitelor matricei. Returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 19,
    "text": "Am finalizat explorarea pentru (0, 2) și ne întoarcem.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 19,
    "text": "Am finalizat explorarea pentru (0, 1) și ne întoarcem.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [
        {
          "r": 0,
          "c": 1
        }
      ],
      "highlightCells": []
    }
  },
  {
    "line": 16,
    "text": "Revenim la (1, 1). Apelăm recursiv floodFill pentru vecinul de jos (2, 1).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=2, c=1. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=2, c=1). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 0. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 17,
    "text": "Revenim la (1, 1). Apelăm recursiv floodFill pentru vecinul din stânga (1, 0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=0. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=0). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 2. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 18,
    "text": "Revenim la (1, 1). Apelăm recursiv floodFill pentru vecinul din dreapta (1, 2).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 7,
    "text": "Intrăm în floodFill pentru r=1, c=2. Obținem rows = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 8,
    "text": "Obținem cols = 3.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 10,
    "text": "Verificăm limitele (r=1, c=2). În limite.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 11,
    "text": "Verificăm dacă culoarea curentă este diferită de 1. Culoarea este 0. Diferită, deci returnăm.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "line": 19,
    "text": "Am finalizat explorarea pentru (1, 1) și ne întoarcem.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
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
    "text": "Afișăm rezultatul final al matricei img.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 34,
    "text": "Bucla principală pentru afișare (i=0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 35,
    "text": "Bucla secundară pentru afișare (j=0).",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 36,
    "text": "Afișăm img[0][0].",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  },
  {
    "line": 40,
    "text": "Return 0; program finalizat.",
    "blocksVisual": [],
    "matrix": {
      "title": "Gridul de Culori",
      "headers": [
        "R/C",
        "0",
        "1",
        "2"
      ],
      "data": [
        [
          "0",
          2,
          2,
          2
        ],
        [
          "1",
          2,
          2,
          0
        ],
        [
          "2",
          2,
          0,
          1
        ]
      ],
      "activeCells": [],
      "highlightCells": []
    }
  }
],
  "debugger": {
    
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [{"line": 22,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 22}]},{"line": 28,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 28}]},{"line": 29,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 29}]},{"line": 30,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":-1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":-1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":-1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":-1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":-1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":-1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":3,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=3, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":3,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=3, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":3,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=3, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":-1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":-1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":-1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":-1,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":-1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":-1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":3,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=3, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":3,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=3, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":3,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=3, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 33,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 33}]},{"line": 34,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 34}]},{"line": 35,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 35}]},{"line": 36,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 36}]},{"line": 40,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 40}]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const vars = [];
      const globalVars = [];
      const frames = state.stackFrames;
      
      vars.push({ name: "img", type: "vector<vector<int>>", val: "size = 3x3", expandable: true });
      if (state.locals.startColor !== null) vars.push({ name: "startColor", type: "int", val: state.locals.startColor.toString() });
      if (state.locals.r !== null) vars.push({ name: "r", type: "int", val: state.locals.r.toString() });
      if (state.locals.c !== null) vars.push({ name: "c", type: "int", val: state.locals.c.toString() });
      if (state.locals.oldColor !== null) vars.push({ name: "oldColor", type: "int", val: state.locals.oldColor.toString() });
      if (state.locals.newColor !== null) vars.push({ name: "newColor", type: "int", val: state.locals.newColor.toString() });
      if (state.locals.rows !== null) vars.push({ name: "rows", type: "int", val: state.locals.rows.toString() });
      if (state.locals.cols !== null) vars.push({ name: "cols", type: "int", val: state.locals.cols.toString() });
      
      let inlineVal = null;
      if (state.locals.r !== null) {
          inlineVal = `r: ${state.locals.r}, c: ${state.locals.c}, oldColor: 1, newColor: 2`;
      } else if (state.locals.startColor !== null) {
          inlineVal = `startColor: ${state.locals.startColor}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"line": 22,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 22}]},{"line": 28,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 28}]},{"line": 29,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 29}]},{"line": 30,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":-1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":-1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":-1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":-1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":-1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":-1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":3,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=3, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":3,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=3, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":3,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=3, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":-1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":2,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":-1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":-1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":-1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=-1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":0,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 13,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 13},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 15,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":-1,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":-1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":-1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=-1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":0,"c":3,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=3, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":0,"c":3,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=3, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":0,"c":3,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=3, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":0,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 15},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":0,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=0, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 16,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 16},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":2,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=2, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 17,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 17},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":0,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=0, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 18,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 18},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 7,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":null,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 7},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 8,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":null,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 8},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 10,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 10},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 11,"locals":{"r":1,"c":2,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=2, oldColor=1, newColor=2)","file":"solution.cpp","line": 11},{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 30},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 19,"locals":{"r":1,"c":1,"oldColor":1,"newColor":2,"rows":3,"cols":3,"startColor":null},"stackFrames":[{"name":"floodFill(image, r=1, c=1, oldColor=1, newColor=2)","file":"solution.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 30}]},{"line": 33,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 33}]},{"line": 34,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 34}]},{"line": 35,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 35}]},{"line": 36,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 36}]},{"line": 40,"locals":{"r":null,"c":null,"oldColor":null,"newColor":null,"rows":null,"cols":null,"startColor":1},"stackFrames":[{"name":"main()","file":"main.cpp","line": 40}]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      if (lineNum === 28 || lineNum === 29) return state.locals.startColor !== null ? `startColor: ${state.locals.startColor}` : null;
      if (lineNum >= 30 && lineNum <= 43 && state.locals.r !== null) return `r: ${state.locals.r}, c: ${state.locals.c}`;
      return null;
    }

  },
  "problems": {
    "easy": [
      {
        "title": "Flood Fill",
        "url": "https://leetcode.com/problems/flood-fill/",
        "desc": "Implementează algoritmul clasic Flood Fill pe o imagine reprezentată ca matrice bidimensională."
      }
    ],
    "medium": [
      {
        "title": "Number of Islands",
        "url": "https://leetcode.com/problems/number-of-islands/",
        "desc": "Numără componentele conexe formate din caractere de '1' (pământ) într-o mare de '0' (apă) folosind Flood Fill."
      }
    ],
    "hard": [
      {
        "title": "Making A Large Island",
        "url": "https://leetcode.com/problems/making-a-large-island/",
        "desc": "Folosește Flood Fill pentru a eticheta insulele conexe și a le calcula dimensiunile, apoi determină cum schimbarea unui singur '0' în '1' poate maximiza dimensiunea unei insule."
      }
    ]
  }
};
