export const data = {
  "presentation": "### Prezentare Generală\n\nAlgebra liniară joacă un rol vital în algoritmi, de la procesarea grafică și Machine Learning până la rezolvarea sistemelor de ecuații în timp optim.\n\nUn algoritm esențial este **Eliminarea Gaussiană (Gaussian Elimination)**. Acesta primește un sistem liniar de $N$ ecuații cu $M$ necunoscute și îl transformă într'o matrice numită \"Forma Eșalonată pe Linii\" (Row Echelon Form) prin operații elementare:\n1. Schimbarea liniilor între ele (Swap).\n2. Înmulțirea unei linii cu o constantă nenulă.\n3. Adunarea unui multiplu al unei linii la altă linie.\n\nAstfel, pe diagonala principală vom lăsa doar coeficienți nenuli, iar sub diagonală doar zerouri, permițând apoi determinarea necunoscutelor de jos în sus (Back Substitution).",
  "complexity": "### Complexitate\n\n- **Timp:** O(N^3) pentru un sistem de N ecuații cu N necunoscute, datorită celor 3 bucle imbricate (pentru pivot, pentru linia curentă și pentru parcurgerea coloanelor pe linie).\n- **Spațiu:** O(N^2) pentru stocarea matricii sistemului (coeficienții).\n",
  "variations": "### Variații și Edge Cases\n\n1. Gauss-Jordan Elimination: Duce matricea și mai departe, creând zerouri nu doar sub diagonală, ci și *deasupra* diagonalei. La final, soluția este citită direct.\n2. Eliminare Gaussiana în $Z_2$ (Modulo 2): Folosind operatorul bitwise XOR în loc de plus și minus, putem rezolva sisteme de ecuații booleene (des întâlnit în cryptanaliză și concursuri).",
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
      "line": 45,
      "text": "Pasul 1: Începem funcția main. Definim matricea de coeficienți 3x4 care reprezintă sistemul de ecuații.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["2.00", "1.00", "-1.00", "8.00"],
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 18,
      "text": "Pasul 2: Intrăm în bucla principală pentru coloana i = 0. Căutăm cel mai bun pivot (valoare absolută maximă) pe coloana 0.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["2.00", "1.00", "-1.00", "8.00"],
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 0, "c": 0 }, { "r": 1, "c": 0 }, { "r": 2, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 23,
      "text": "Pasul 3: Cel mai mare pivot pe coloana 0 este |-3| = 3 la linia 1. maxRow devine 1.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["2.00", "1.00", "-1.00", "8.00"],
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 1, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 28,
      "text": "Pasul 4: Interschimbăm (swap) linia i = 0 cu linia maxRow = 1 pentru a aduce pivotul pe diagonala principală.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["2.00", "1.00", "-1.00", "8.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 0, "c": 0 }, { "r": 1, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 31,
      "text": "Pasul 5: Începem reducerea elementelor de sub pivot (coloana 0). Începem cu linia k = 1.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["2.00", "1.00", "-1.00", "8.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 1, "c": 0 }],
        "highlightCells": [{ "r": 0, "c": 0 }]
      }
    },
    {
      "line": 32,
      "text": "Pasul 6: Calculăm factorul de reducere c = -a[1][0] / a[0][0] = -2 / -3 = 2/3 (aprox 0.67).",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["2.00", "1.00", "-1.00", "8.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [],
        "highlightCells": [{ "r": 0, "c": 0 }, { "r": 1, "c": 0 }]
      }
    },
    {
      "line": 35,
      "text": "Pasul 7: Elementul sub pivot a[1][0] este anulat forțat: a[1][0] = 0.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.00", "-1.00", "8.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 1, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 37,
      "text": "Pasul 8: Actualizăm coloana 1 a liniei 1: a[1][1] += c * a[0][1] = 1.00 + (2/3) * (-1) = 0.33.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "-1.00", "8.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 1, "c": 1 }],
        "highlightCells": [{ "r": 0, "c": 1 }]
      }
    },
    {
      "line": 37,
      "text": "Pasul 9: Actualizăm coloana 2 a liniei 1: a[1][2] += c * a[0][2] = -1.00 + (2/3) * 2 = 0.33.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "8.00"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": [{ "r": 0, "c": 2 }]
      }
    },
    {
      "line": 37,
      "text": "Pasul 10: Actualizăm termenul liber al liniei 1: a[1][3] += c * a[0][3] = 8.00 + (2/3) * (-11) = 0.67.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 1, "c": 3 }],
        "highlightCells": [{ "r": 0, "c": 3 }]
      }
    },
    {
      "line": 31,
      "text": "Pasul 11: Trecem la linia k = 2 pentru eliminarea de sub pivot.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 2, "c": 0 }],
        "highlightCells": [{ "r": 0, "c": 0 }]
      }
    },
    {
      "line": 32,
      "text": "Pasul 12: Calculăm factorul c = -a[2][0] / a[0][0] = -(-2) / -3 = -2/3 (aprox -0.67).",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["-2.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [],
        "highlightCells": [{ "r": 0, "c": 0 }, { "r": 2, "c": 0 }]
      }
    },
    {
      "line": 35,
      "text": "Pasul 13: Elementul sub pivot a[2][0] devine 0.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["0.00", "1.00", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 2, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 37,
      "text": "Pasul 14: Actualizăm coloana 1 a liniei 2: a[2][1] += c * a[0][1] = 1.00 + (-2/3) * (-1) = 1.67.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["0.00", "1.67", "2.00", "-3.00"]
        ],
        "activeCells": [{ "r": 2, "c": 1 }],
        "highlightCells": [{ "r": 0, "c": 1 }]
      }
    },
    {
      "line": 37,
      "text": "Pasul 15: Actualizăm coloana 2 a liniei 2: a[2][2] += c * a[0][2] = 2.00 + (-2/3) * 2 = 0.67.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["0.00", "1.67", "0.67", "-3.00"]
        ],
        "activeCells": [{ "r": 2, "c": 2 }],
        "highlightCells": [{ "r": 0, "c": 2 }]
      }
    },
    {
      "line": 37,
      "text": "Pasul 16: Actualizăm termenul liber al liniei 2: a[2][3] += c * a[0][3] = -3.00 + (-2/3) * (-11) = 4.33.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["0.00", "1.67", "0.67", "4.33"]
        ],
        "activeCells": [{ "r": 2, "c": 3 }],
        "highlightCells": [{ "r": 0, "c": 3 }]
      }
    },
    {
      "line": 18,
      "text": "Pasul 17: Trecem la coloana i = 1. Căutăm pivotul maxim pe coloana 1 sub linia 0 (linii 1 și 2).",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["0.00", "1.67", "0.67", "4.33"]
        ],
        "activeCells": [{ "r": 1, "c": 1 }, { "r": 2, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 23,
      "text": "Pasul 18: Valoarea maximă este 1.67 la linia 2. maxRow devine 2.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "0.33", "0.33", "0.67"],
          ["0.00", "1.67", "0.67", "4.33"]
        ],
        "activeCells": [{ "r": 2, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 28,
      "text": "Pasul 19: Interschimbăm linia 1 cu linia 2 pentru a aduce noul pivot pe diagonală.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.33", "0.33", "0.67"]
        ],
        "activeCells": [{ "r": 1, "c": 1 }, { "r": 2, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 32,
      "text": "Pasul 20: Eliminăm sub noul pivot. Pentru linia k = 2, factorul de reducere c = -a[2][1] / a[1][1] = -0.33 / 1.67 = -0.20.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.33", "0.33", "0.67"]
        ],
        "activeCells": [],
        "highlightCells": [{ "r": 1, "c": 1 }, { "r": 2, "c": 1 }]
      }
    },
    {
      "line": 35,
      "text": "Pasul 21: Elementul sub pivot a[2][1] devine 0.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.00", "0.33", "0.67"]
        ],
        "activeCells": [{ "r": 2, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 37,
      "text": "Pasul 22: Actualizăm coloana 2 a liniei 2: a[2][2] += c * a[1][2] = 0.33 + (-0.20) * 0.67 = 0.20.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.00", "0.20", "0.67"]
        ],
        "activeCells": [{ "r": 2, "c": 2 }],
        "highlightCells": [{ "r": 1, "c": 2 }]
      }
    },
    {
      "line": 37,
      "text": "Pasul 23: Actualizăm termenul liber a liniei 2: a[2][3] += c * a[1][3] = 0.67 + (-0.20) * 4.33 = -0.20.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.00", "0.20", "-0.20"]
        ],
        "activeCells": [{ "r": 2, "c": 3 }],
        "highlightCells": [{ "r": 1, "c": 3 }]
      }
    },
    {
      "line": 18,
      "text": "Pasul 24: Coloana i = 2. Este ultima linie a matricii, deci nu mai există elemente dedesubt de eliminat.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.00", "0.20", "-0.20"]
        ],
        "activeCells": [{ "r": 2, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 51,
      "text": "Pasul 25: Eliminarea Gaussiană este completă! Matricea este în formă eșalonată. Prin substituție inversă obținem: X3 = -1, X2 = 3, X1 = 2.",
      "matrix": {
        "headers": ["X1", "X2", "X3", "C"],
        "data": [
          ["-3.00", "-1.00", "2.00", "-11.00"],
          ["0.00", "1.67", "0.67", "4.33"],
          ["0.00", "0.00", "0.20", "-0.20"]
        ],
        "activeCells": [],
        "highlightCells": [{ "r": 0, "c": 0 }, { "r": 1, "c": 1 }, { "r": 2, "c": 2 }]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Gaussian Elimination",
        "url": "https://www.infoarena.ro/problema/gauss",
        "desc": "Sisteme de ecuații liniare"
      }
    ],
    "medium": [
      {
        "title": "Determinant",
        "url": "https://www.infoarena.ro/problema/determinant",
        "desc": "Calculul determinantului prin Gauss"
      },
      {
        "title": "XOR Matrix Equation",
        "url": "https://leetcode.com/problems/minimize-xor-of-two-numbers/",
        "desc": "Gauss Modulo 2"
      }
    ],
    "hard": [
      {
        "title": "Matrix Inversion",
        "url": "https://www.infoarena.ro/problema/inversa",
        "desc": "Inversarea matricilor prin Gauss-Jordan"
      }
    ]
  }
};
