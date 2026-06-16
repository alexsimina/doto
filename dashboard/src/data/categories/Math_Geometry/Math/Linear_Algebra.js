export const data = {
  "presentation": "### Prezentare Generală\n\nAlgebra liniară joacă un rol vital în algoritmi, de la procesarea grafică și Machine Learning până la rezolvarea sistemelor de ecuații în timp optim.\\n\\nUn algoritm esențial este **Eliminarea Gaussiană (Gaussian Elimination)**. Acesta primește un sistem liniar de $N$ ecuații cu $M$ necunoscute și îl transformă într-o matrice numită \"Forma Eșalonată pe Linii\" (Row Echelon Form) prin operații elementare:\\n1. Schimbarea liniilor între ele (Swap).\\n2. Înmulțirea unei linii cu o constantă nenulă.\\n3. Adunarea unui multiplu al unei linii la altă linie.\\n\\nAstfel, pe diagonala principală vom lăsa doar coeficienți nenuli, iar sub diagonală doar zerouri, permițând apoi determinarea necunoscutelor de jos în sus (Back Substitution).",
  "complexity": "### Complexitate\n\n- **Timp:** O(N^3) pentru un sistem de N ecuații cu N necunoscute, datorită celor 3 bucle imbricate (pentru pivot, pentru linia curentă și pentru parcurgerea coloanelor pe linie).\\n- **Spațiu:** O(N^2) pentru stocarea matricii sistemului (coeficienții).\n",
  "variations": "### Variații și Edge Cases\n\n1. Gauss-Jordan Elimination: Duce matricea și mai departe, creând zerouri nu doar sub diagonală, ci și *deasupra* diagonalei. La final, soluția este citită direct.\\n2. Eliminare Gaussiana în $Z_2$ (Modulo 2): Folosind operatorul bitwise XOR în loc de plus și minus, putem rezolva sisteme de ecuații booleene (des întâlnit în cryptanaliză și concursuri).",
  "applications": "### Aplicații\n\nDeterminarea numărului de cicluri fundamentale dintr-un graf, calculul determinanților unei matrice, rezolvarea circuitelor electrice (Legile lui Kirchhoff) și inversarea matricilor mari.",
  code: `
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

// Functie pentru eliminarea gaussiana
void gaussianElimination(vector<vector<double>>& a) {
    int n = a.size();

    // Reducerea liniilor
    for (int i = 0; i < n; i++) {
        // Cautam cel mai mare pivot in coloana i
        int maxRow = i;
        for (int k = i + 1; k < n; k++) {
            if (abs(a[k][i]) > abs(a[maxRow][i])) {
                maxRow = k;
            }
        }

        // Swap linii daca e nevoie
        swap(a[i], a[maxRow]);

        // Reducem elementele de sub pivot
        for (int k = i + 1; k < n; k++) {
            double c = -a[k][i] / a[i][i];
            for (int j = i; j <= n; j++) {
                if (i == j) {
                    a[k][j] = 0; // Fixam la 0
                } else {
                    a[k][j] += c * a[i][j];
                }
            }
        }
    }
}

int main() {
    vector<vector<double>> a = {
        {2, 1, -1, 8},
        {-3, -1, 2, -11},
        {-2, 1, 2, -3}
    };
    gaussianElimination(a);
    return 0;
}
`,
  "explanations": [
    {
      "line": 40,
      "text": "Avem matricea initială 3x4. Ultimele elemente sunt termenii liberi.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "2",
            "1",
            "-1",
            "8"
          ],
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "-2",
            "1",
            "2",
            "-3"
          ]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 12,
      "text": "i=0: Căutăm pivotul pe prima coloană (index 0). Coeficienții absolut sunt 2, |-3|=3, |-2|=2.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "2",
            "1",
            "-1",
            "8"
          ],
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "-2",
            "1",
            "2",
            "-3"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 0
          },
          {
            "r": 1,
            "c": 0
          },
          {
            "r": 2,
            "c": 0
          }
        ],
        "highlightCells": []
      }
    },
    {
      "line": 22,
      "text": "Valoarea maximă este pe linia 1 (valoarea -3). Interschimbăm linia 0 cu linia 1.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "2",
            "1",
            "-1",
            "8"
          ],
          [
            "-2",
            "1",
            "2",
            "-3"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 0
          },
          {
            "r": 0,
            "c": 1
          },
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 0,
            "c": 3
          },
          {
            "r": 1,
            "c": 0
          },
          {
            "r": 1,
            "c": 1
          },
          {
            "r": 1,
            "c": 2
          },
          {
            "r": 1,
            "c": 3
          }
        ],
        "highlightCells": []
      }
    },
    {
      "line": 26,
      "text": "Calculăm factorul c pentru a elimina primul element din linia 1: c = - (2) / (-3) = 0.666... Adunăm pe linia 1 multipli din linia 0.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "0",
            "0.33",
            "0.33",
            "0.66"
          ],
          [
            "-2",
            "1",
            "2",
            "-3"
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
          },
          {
            "r": 1,
            "c": 2
          },
          {
            "r": 1,
            "c": 3
          }
        ],
        "highlightCells": [
          {
            "r": 0,
            "c": 0
          },
          {
            "r": 0,
            "c": 1
          },
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 0,
            "c": 3
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Calculăm factorul c pentru linia 2: c = - (-2) / (-3) = -0.666... Eliminăm primul element din linia 2.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "0",
            "0.33",
            "0.33",
            "0.66"
          ],
          [
            "0",
            "1.66",
            "0.66",
            "4.33"
          ]
        ],
        "activeCells": [
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
          },
          {
            "r": 2,
            "c": 3
          }
        ],
        "highlightCells": [
          {
            "r": 0,
            "c": 0
          },
          {
            "r": 0,
            "c": 1
          },
          {
            "r": 0,
            "c": 2
          },
          {
            "r": 0,
            "c": 3
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "i=1: Trecem la a doua coloană pentru a face pivot. Ne uităm de la diagonala în jos: 0.33 și 1.66. Maximul e 1.66.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "0",
            "0.33",
            "0.33",
            "0.66"
          ],
          [
            "0",
            "1.66",
            "0.66",
            "4.33"
          ]
        ],
        "activeCells": [
          {
            "r": 1,
            "c": 1
          },
          {
            "r": 2,
            "c": 1
          }
        ],
        "highlightCells": []
      }
    },
    {
      "line": 22,
      "text": "Swap Linia 1 cu Linia 2.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "0",
            "0.33",
            "0.33",
            "0.66"
          ],
          [
            "0",
            "1.66",
            "0.66",
            "4.33"
          ]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 26,
      "text": "Aducem elementul de pe L2 (coloana 1) la 0 scăzând proporția respectivă din L1.",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "0",
            "0.33",
            "0.33",
            "0.66"
          ],
          [
            "0",
            "1.66",
            "0.66",
            "4.33"
          ]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 36,
      "text": "Acum avem sub diagonala principală DOAR zerouri! Sistemul este complet triunghiularizat. Acum X3 este ușor de aflat (X3 = -0.2 / 0.2 = -1).",
      "matrix": {
        "headers": [
          "X1",
          "X2",
          "X3",
          "C"
        ],
        "data": [
          [
            "-3",
            "-1",
            "2",
            "-11"
          ],
          [
            "0",
            "0.33",
            "0.33",
            "0.66"
          ],
          [
            "0",
            "1.66",
            "0.66",
            "4.33"
          ]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Gaussian Elimination",
        "url": "https://www.infoarena.ro/problema/gauss",
        "desc": "Problema clasica de pe Infoarena"
      }
    ],
    "medium": [
      {
        "title": "XOR Gaussian",
        "url": "https://www.infoarena.ro/problema/xorc",
        "desc": "Gauss Modulo 2"
      }
    ],
    "hard": [
      {
        "title": "Sisteme sub-determinate",
        "url": "https://codeforces.com/problemset/problem/1154/G",
        "desc": "Aplicații Liniar Algebrice"
      }
    ]
  }
};
