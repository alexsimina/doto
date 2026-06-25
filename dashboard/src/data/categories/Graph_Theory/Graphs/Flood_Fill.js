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
  "code": `#include <iostream>
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
    "text": "Inițializăm matricea `img` de dimensiuni 3x3 de pixeli, unde culorile sunt reprezentate prin numere întregi.",
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
    "text": "Preluăm culoarea pixelului de start pe care am dat click: $startColor = img[1][1] = 1$.",
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
    "text": "Verificăm dacă culoarea de start este diferită de culoarea nouă la care dorim să ajungem ($startColor \\neq 2$). Condiția $1 \\neq 2$ este Adevărată, deci putem porni umplerea fără risc de buclă infinită.",
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
    "text": "Apelăm funcția recursivă `floodFill` pentru celula de start (1,1) cu culoarea veche 1 și cea nouă 2.",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][1] = 1. Condiția de culoare diferită este Falsă (celula are culoarea țintă 1), deci trebuie să o colorăm.",
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
    "text": "Colorăm celula (1, 1) cu noua culoare: img[1][1] = 2.",
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
    "text": "Apelăm recursiv floodFill pentru vecinul de SUS (0, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (0, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[0][1] = 1. Condiția de culoare diferită este Falsă (celula are culoarea țintă 1), deci trebuie să o colorăm.",
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
    "text": "Colorăm celula (0, 1) cu noua culoare: img[0][1] = 2.",
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
    "text": "Apelăm recursiv floodFill pentru vecinul de SUS (-1, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (-1, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=-1, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (0, 1). Apelăm recursiv floodFill pentru vecinul de JOS (1, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][1] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (0, 1). Apelăm recursiv floodFill pentru vecinul din STÂNGA (0, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (0, 0) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[0][0] = 1. Condiția de culoare diferită este Falsă (celula are culoarea țintă 1), deci trebuie să o colorăm.",
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
    "text": "Colorăm celula (0, 0) cu noua culoare: img[0][0] = 2.",
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
    "text": "Apelăm recursiv floodFill pentru vecinul de SUS (-1, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (-1, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=-1, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (0, 0). Apelăm recursiv floodFill pentru vecinul de JOS (1, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 0) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][0] = 1. Condiția de culoare diferită este Falsă (celula are culoarea țintă 1), deci trebuie să o colorăm.",
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
    "text": "Colorăm celula (1, 0) cu noua culoare: img[1][0] = 2.",
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
    "text": "Apelăm recursiv floodFill pentru vecinul de SUS (0, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (0, 0) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[0][0] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (1, 0). Apelăm recursiv floodFill pentru vecinul de JOS (2, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (2, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=2, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (2, 0) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[2][0] = 1. Condiția de culoare diferită este Falsă (celula are culoarea țintă 1), deci trebuie să o colorăm.",
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
    "text": "Colorăm celula (2, 0) cu noua culoare: img[2][0] = 2.",
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
    "text": "Apelăm recursiv floodFill pentru vecinul de SUS (1, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 0) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][0] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (2, 0). Apelăm recursiv floodFill pentru vecinul de JOS (3, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (3, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=3, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (2, 0). Apelăm recursiv floodFill pentru vecinul din STÂNGA (2, -1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (2, -1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=2, c=-1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (2, 0). Apelăm recursiv floodFill pentru vecinul din DREAPTA (2, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (2, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=2, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (2, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[2][1] = 0. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Am finalizat explorarea tuturor celor 4 vecini pentru celula (2, 0). Acest apel se încheie, revenind în apelant.",
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
    "text": "Revenim la (1, 0). Apelăm recursiv floodFill pentru vecinul din STÂNGA (1, -1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, -1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=-1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (1, 0). Apelăm recursiv floodFill pentru vecinul din DREAPTA (1, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][1] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Am finalizat explorarea tuturor celor 4 vecini pentru celula (1, 0). Acest apel se încheie, revenind în apelant.",
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
    "text": "Revenim la (0, 0). Apelăm recursiv floodFill pentru vecinul din STÂNGA (0, -1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, -1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=-1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (0, 0). Apelăm recursiv floodFill pentru vecinul din DREAPTA (0, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (0, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[0][1] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Am finalizat explorarea tuturor celor 4 vecini pentru celula (0, 0). Acest apel se încheie, revenind în apelant.",
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
    "text": "Revenim la (0, 1). Apelăm recursiv floodFill pentru vecinul din DREAPTA (0, 2).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 2). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=2) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (0, 2) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[0][2] = 1. Condiția de culoare diferită este Falsă (celula are culoarea țintă 1), deci trebuie să o colorăm.",
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
    "text": "Colorăm celula (0, 2) cu noua culoare: img[0][2] = 2.",
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
    "text": "Apelăm recursiv floodFill pentru vecinul de SUS (-1, 2).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (-1, 2). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=-1, c=2) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Revenim la (0, 2). Apelăm recursiv floodFill pentru vecinul de JOS (1, 2).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 2). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=2) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 2) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][2] = 0. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (0, 2). Apelăm recursiv floodFill pentru vecinul din STÂNGA (0, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (0, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[0][1] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (0, 2). Apelăm recursiv floodFill pentru vecinul din DREAPTA (0, 3).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (0, 3). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=0, c=3) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Adevărată (suntem în afara limitelor). Ne întoarcem direct din apelul curent.",
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
    "text": "Am finalizat explorarea tuturor celor 4 vecini pentru celula (0, 2). Acest apel se încheie, revenind în apelant.",
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
    "text": "Am finalizat explorarea tuturor celor 4 vecini pentru celula (0, 1). Acest apel se încheie, revenind în apelant.",
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
    "text": "Revenim la (1, 1). Apelăm recursiv floodFill pentru vecinul de JOS (2, 1).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (2, 1). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=2, c=1) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (2, 1) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[2][1] = 0. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (1, 1). Apelăm recursiv floodFill pentru vecinul din STÂNGA (1, 0).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 0). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=0) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 0) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][0] = 2. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Revenim la (1, 1). Apelăm recursiv floodFill pentru vecinul din DREAPTA (1, 2).",
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
    "text": "Intrăm în funcția recursivă floodFill pentru celula curentă (1, 2). Citim numărul de rânduri: rows = 3.",
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
    "text": "Obținem numărul de coloane: cols = 3. Matricea are o rezoluție totală de 3x3.",
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
    "text": "Verificăm dacă coordonatele celulei curente (r=1, c=2) depășesc marginile matricei (0 <= r < 3 și 0 <= c < 3). Condiția este Falsă (suntem în limitele matricei), deci continuăm verificările.",
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
    "text": "Verificăm dacă culoarea celulei curente (1, 2) este diferită de cea pe care vrem să o înlocuim (oldColor = 1). Culoarea celulei este img[1][2] = 0. Condiția de culoare diferită este Adevărată (celula are altă culoare sau a fost deja colorată). Revenim din apel.",
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
    "text": "Am finalizat explorarea tuturor celor 4 vecini pentru celula (1, 1). Acest apel se încheie, revenind în apelant.",
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
    "text": "Pregătim afișarea matricei finale prin două bucle for consecutive.",
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
    "text": "Inițializăm bucla pentru rânduri: i = 0. Parcurgem prima linie.",
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
    "text": "Inițializăm bucla pentru coloane: j = 0. Afișăm elementul de la prima coloană.",
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
    "text": "Afișăm valoarea pixelului de pe prima poziție: img[0][0] = 2.",
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
    "text": "Programul se încheie cu succes, returnând 0. Zona conectată de culoare 1 a fost umplută complet cu culoarea 2.",
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
      if (lineNum >= 6 && lineNum <= 19 && state.locals.r !== null) return `r: ${state.locals.r}, c: ${state.locals.c}`;
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
