export const data = {
  "presentation": "### Prezentare Generală\n\nCombinatorica este ramura matematicii care studiază modurile de selecție, aranjare și numărare a elementelor dintr-o mulțime finită.\n\nConceptele fundamentale includ:\n1. **Permutări**: Numărul de moduri de a ordona $N$ elemente ($N!$).\n2. **Aranjamente**: Numărul de moduri de a alege și ordona $K$ elemente din $N$ posibile ($N! / (N-K)!$).\n3. **Combinări**: Numărul de moduri de a alege $K$ elemente din $N$, indiferent de ordine ($N! / (K! * (N-K)!)$).\n\nÎn informatică, adesea avem nevoie să calculăm aceste valori modulo un număr prim mare (ex. $10^9+7$) pentru a evita overflow-ul la factorial. O metodă vizuală și utilă (mai ales pentru N mici) de a calcula combinările fără formule explicite este **Triunghiul lui Pascal**, care folosește relația de recurență: $C(N, K) = C(N-1, K-1) + C(N-1, K)$.",
  "complexity": "### Complexitate\n\nGenerarea Triunghiului lui Pascal până la linia $N$ are:\n- **Timp:** O(N^2), calculând iterativ fiecare rând din rândul anterior.\n- **Spațiu:** O(N^2) dacă stocăm toată matricea, sau O(N) dacă folosim doar rândul anterior (spațiu optimizat).\n",
  "variations": "### Variații și Edge Cases\n\n1. Calculul Combinărilor cu Invers Modular: Pentru $N$ de ordinul $10^5$, nu putem folosi Triunghiul (necesită timp $O(N^2)$). Calculăm direct factoriali $N!$ și apoi împărțim în aritmetică modulară folosind Teorema Mică a lui Fermat ($A^{-1} \\equiv A^{MOD-2} \\pmod{MOD}$).\n2. Stars and Bars: Metodă combinatorică pentru aflarea numărului de soluții întregi ale unor ecuații (ex: $x_1 + x_2 + ... + x_k = N$).",
  "applications": "### Aplicații\n\nProbleme de probabilitate, numărarea căilor pe un grid (Catalan Numbers), calcularea numărului de subseturi, grafuri (ex. numărul de arbori generatori - Cayley), și generare de parole / stringuri.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

void pascalTriangle(int numRows) {
    vector<vector<int>> triangle(numRows);
    
    for (int i = 0; i < numRows; i++) {
        triangle[i].resize(i + 1);
        triangle[i][0] = 1; // Primul element de pe rand e 1
        triangle[i][i] = 1; // Ultimul element de pe rand e 1
        
        for (int j = 1; j < i; j++) {
            // Un element este suma celor doua de deasupra lui
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
    }
    
    // Afisare
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j <= i; j++) {
            cout << triangle[i][j] << " ";
        }
        cout << "
";
    }
}

int main() {
    pascalTriangle(5);
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Vrem să generăm primele 5 rânduri din Triunghiul lui Pascal (indexate de la 0 la 4).",
      "blocksVisual": [
        {
          "label": "Inițializare",
          "groups": [
            [
              {
                "val": "i=0"
              },
              {
                "val": "i=1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pentru i = 0: Rândul are lungimea 1. Singurul element este setat la 1. (Combinări de 0 luate câte 0)",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 0
          }
        ]
      }
    },
    {
      "line": 11,
      "text": "Pentru i = 1: Rândul are lungimea 2. Primul și ultimul element sunt setate la 1.",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ]
        ],
        "activeCells": [
          {
            "r": 1,
            "c": 0
          },
          {
            "r": 1,
            "c": 1
          }
        ]
      }
    },
    {
      "line": 9,
      "text": "Pentru i = 2: Rândul are lungimea 3. Elementele capetelor (j=0 și j=2) primesc automat valoarea 1.",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 16,
      "text": "Calculăm elementele de la mijloc. Pentru j=1: adunăm valorile de deasupra `triangle[1][0] + triangle[1][1] = 1 + 1 = 2`.",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            ""
          ],
          [
            "1",
            "2",
            "1",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
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
            "c": 0
          },
          {
            "r": 1,
            "c": 1
          }
        ]
      }
    },
    {
      "line": 9,
      "text": "Pentru i = 3: Rândul capătă lungimea 4. Capetele primesc 1.",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            ""
          ],
          [
            "1",
            "2",
            "1",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 16,
      "text": "Pentru j=1: 1 + 2 = 3. Pentru j=2: 2 + 1 = 3.",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            ""
          ],
          [
            "1",
            "2",
            "1",
            "",
            ""
          ],
          [
            "1",
            "3",
            "3",
            "1",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            ""
          ]
        ],
        "activeCells": [
          {
            "r": 3,
            "c": 1
          },
          {
            "r": 3,
            "c": 2
          }
        ],
        "highlightCells": [
          {
            "r": 2,
            "c": 0
          },
          {
            "r": 2,
            "c": 1
          },
          {
            "r": 2,
            "c": 2
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Pentru i = 4: Capetele primesc 1. j=1: 1+3=4. j=2: 3+3=6. j=3: 3+1=4.",
      "matrix": {
        "headers": [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        "data": [
          [
            "1",
            "",
            "",
            "",
            ""
          ],
          [
            "1",
            "1",
            "",
            "",
            ""
          ],
          [
            "1",
            "2",
            "1",
            "",
            ""
          ],
          [
            "1",
            "3",
            "3",
            "1",
            ""
          ],
          [
            "1",
            "4",
            "6",
            "4",
            "1"
          ]
        ],
        "activeCells": [
          {
            "r": 4,
            "c": 1
          },
          {
            "r": 4,
            "c": 2
          },
          {
            "r": 4,
            "c": 3
          }
        ],
        "highlightCells": [
          {
            "r": 3,
            "c": 0
          },
          {
            "r": 3,
            "c": 1
          },
          {
            "r": 3,
            "c": 2
          },
          {
            "r": 3,
            "c": 3
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Pascal's Triangle",
        "url": "https://leetcode.com/problems/pascals-triangle/",
        "desc": "Generare O(N^2)"
      },
      {
        "title": "Combinări",
        "url": "https://www.pbinfo.ro/probleme/126/combinari",
        "desc": "Generare combinări"
      }
    ],
    "medium": [
      {
        "title": "Unique Paths",
        "url": "https://leetcode.com/problems/unique-paths/",
        "desc": "C(M+N-2, N-1)"
      },
      {
        "title": "Subsets",
        "url": "https://leetcode.com/problems/subsets/",
        "desc": "Toate combinațiile"
      }
    ],
    "hard": [
      {
        "title": "Numărul de arbori (Cayley)",
        "url": "https://www.pbinfo.ro/probleme/2126/arbori",
        "desc": "N^(N-2)"
      }
    ]
  }
};
