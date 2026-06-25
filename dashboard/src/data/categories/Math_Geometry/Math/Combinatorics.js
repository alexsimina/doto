export const data = {
  "presentation": "### Prezentare Generală\n\nCombinatorica este ramura matematicii care studiază modurile de selecție, aranjare și numărare a elementelor dintr-o mulțime finită.\n\nConceptele fundamentale includ:\n1. **Permutări**: Numărul de moduri de a ordona $N$ elemente ($N!$).\n2. **Aranjamente**: Numărul de moduri de a alege și ordona $K$ elemente din $N$ posibile ($N! / (N-K)!$).\n3. **Combinări**: Numărul de moduri de a alege $K$ elemente din $N$, indiferent de ordine ($N! / (K! * (N-K)!)$).\n\nÎn informatică, adesea avem nevoie să calculăm aceste valori modulo un număr prim mare (ex. $10^9+7$) pentru a evita overflow-ul la factorial. O metodă vizuală și utilă (mai ales pentru N mici) de a calcula combinările fără formule explicite este **Triunghiul lui Pascal**, care folosește relația de recurență: $C(N, K) = C(N-1, K-1) + C(N-1, K)$.",
  "complexity": "### Complexitate\n\nGenerarea Triunghiului lui Pascal până la linia $N$ are:\n- **Timp:** O(N^2), calculând iterativ fiecare rând din rândul anterior.\n- **Spațiu:** O(N^2) dacă stocăm toată matricea, sau O(N) dacă folosim doar rândul anterior (spațiu optimizat).\n",
  "variations": "### Variații și Edge Cases\n\n1. Calculul Combinărilor cu Invers Modular: Pentru $N$ de ordinul $10^5$, nu putem folosi Triunghiul (necesită timp $O(N^2)$). Calculăm direct factoriali $N!$ și apoi împărțim în aritmetică modulară folosind Teorema Mică a lui Fermat ($A^{-1} \\equiv A^{MOD-2} \\pmod{MOD}$).\n2. Stars and Bars: Metodă combinatorică pentru aflarea numărului de soluții întregi ale unor ecuații (ex: $x_1 + x_2 + ... + x_k = N$).",
  "applications": "### Aplicații\n\nProbleme de probabilitate, numărarea căilor pe un grid (Catalan Numbers), calcularea numărului de subseturi, grafuri (ex. numărul de arbori generatori - Cayley), și generare de parole / stringuri.",
  code: `#include <iostream>
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
        cout << "\n";
    }
}

int main() {
    pascalTriangle(5);
    return 0;
}
`,
  "explanations": [
    {
      "line": 6,
      "text": "Pasul 1: Inițializăm generatorul Triunghiului lui Pascal pentru numRows = 5. Alocăm vectorul de vectori.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 9,
      "text": "Pasul 2: i = 0 (primul rând). Redimensionăm rândul la lungimea 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 0, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Pasul 3: triangle[0][0] = 1 (Combinări de 0 luate câte 0).",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 0, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 9,
      "text": "Pasul 4: Incrementăm i la 1. Redimensionăm rândul la lungimea 2.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 1, "c": 0 }, { "r": 1, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Pasul 5: Setăm primul element de pe rândul 1 la 1: triangle[1][0] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 1, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 12,
      "text": "Pasul 6: Setăm ultimul element de pe rândul 1 la 1: triangle[1][1] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 1, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 9,
      "text": "Pasul 7: Incrementăm i la 2. Redimensionăm rândul 2 la lungimea 3.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 2, "c": 0 }, { "r": 2, "c": 1 }, { "r": 2, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Pasul 8: Primul element: triangle[2][0] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 2, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 14,
      "text": "Pasul 9: Rândul 2, j = 1. Calculăm elementul interior: triangle[2][1] = triangle[1][0] + triangle[1][1].",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 2, "c": 1 }],
        "highlightCells": [{ "r": 1, "c": 0 }, { "r": 1, "c": 1 }]
      }
    },
    {
      "line": 16,
      "text": "Pasul 10: Sumăm valorile: 1 + 1 = 2. Deci triangle[2][1] = 2.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 2, "c": 1 }],
        "highlightCells": [{ "r": 1, "c": 0 }, { "r": 1, "c": 1 }]
      }
    },
    {
      "line": 12,
      "text": "Pasul 11: Setăm ultimul element: triangle[2][2] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 2, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 9,
      "text": "Pasul 12: Incrementăm i la 3. Redimensionăm rândul 3 la lungimea 4.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 3, "c": 0 }, { "r": 3, "c": 1 }, { "r": 3, "c": 2 }, { "r": 3, "c": 3 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Pasul 13: Setăm triangle[3][0] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 3, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 16,
      "text": "Pasul 14: Rândul 3, j = 1. Calculăm elementul din stânga sus + cel de deasupra: 1 + 2 = 3. Deci triangle[3][1] = 3.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 3, "c": 1 }],
        "highlightCells": [{ "r": 2, "c": 0 }, { "r": 2, "c": 1 }]
      }
    },
    {
      "line": 16,
      "text": "Pasul 15: Rândul 3, j = 2. Calculăm elementul: 2 + 1 = 3. Deci triangle[3][2] = 3.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 3, "c": 2 }],
        "highlightCells": [{ "r": 2, "c": 1 }, { "r": 2, "c": 2 }]
      }
    },
    {
      "line": 12,
      "text": "Pasul 16: Setăm ultimul element: triangle[3][3] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 3, "c": 3 }],
        "highlightCells": []
      }
    },
    {
      "line": 9,
      "text": "Pasul 17: Incrementăm i la 4. Redimensionăm ultimul rând la lungimea 5.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["", "", "", "", ""]
        ],
        "activeCells": [{ "r": 4, "c": 0 }, { "r": 4, "c": 1 }, { "r": 4, "c": 2 }, { "r": 4, "c": 3 }, { "r": 4, "c": 4 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Pasul 18: Setăm triangle[4][0] = 1.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["1", "", "", "", ""]
        ],
        "activeCells": [{ "r": 4, "c": 0 }],
        "highlightCells": []
      }
    },
    {
      "line": 16,
      "text": "Pasul 19: Rândul 4, j = 1. Adunăm: 1 + 3 = 4. triangle[4][1] = 4.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["1", "4", "", "", ""]
        ],
        "activeCells": [{ "r": 4, "c": 1 }],
        "highlightCells": [{ "r": 3, "c": 0 }, { "r": 3, "c": 1 }]
      }
    },
    {
      "line": 16,
      "text": "Pasul 20: Rândul 4, j = 2. Adunăm: 3 + 3 = 6. triangle[4][2] = 6 (Combinări de 4 luate câte 2).",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["1", "4", "6", "", ""]
        ],
        "activeCells": [{ "r": 4, "c": 2 }],
        "highlightCells": [{ "r": 3, "c": 1 }, { "r": 3, "c": 2 }]
      }
    },
    {
      "line": 16,
      "text": "Pasul 21: Rândul 4, j = 3. Adunăm: 3 + 1 = 4. triangle[4][3] = 4.",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["1", "4", "6", "4", ""]
        ],
        "activeCells": [{ "r": 4, "c": 3 }],
        "highlightCells": [{ "r": 3, "c": 2 }, { "r": 3, "c": 3 }]
      }
    },
    {
      "line": 12,
      "text": "Pasul 22: Setăm ultimul element: triangle[4][4] = 1. Generarea triunghiului s-a încheiat cu succes!",
      "matrix": {
        "headers": ["0", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["1", "1", "", "", ""],
          ["1", "2", "1", "", ""],
          ["1", "3", "3", "1", ""],
          ["1", "4", "6", "4", "1"]
        ],
        "activeCells": [{ "r": 4, "c": 4 }],
        "highlightCells": []
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
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let iVal = 0, jVal = 0;
      if (stepIndex >= 3) iVal = 1;
      if (stepIndex >= 6) iVal = 2;
      if (stepIndex >= 8 && stepIndex <= 10) jVal = 1;
      if (stepIndex >= 11) iVal = 3;
      if (stepIndex >= 13) jVal = 1;
      if (stepIndex >= 14) jVal = 2;
      if (stepIndex >= 16) { iVal = 4; jVal = 0; }
      if (stepIndex >= 18) jVal = 1;
      if (stepIndex >= 19) jVal = 2;
      if (stepIndex >= 20) jVal = 3;
      globalVars.push({ name: 'numRows', type: 'int', val: '5', expandable: false });
      globalVars.push({ name: 'triangle', type: 'vector<vector<int>>', val: `size=${iVal+1}`, expandable: false });
      vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
      if (stepIndex >= 8) vars.push({ name: 'j', type: 'int', val: jVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      frames.unshift({ name: `pascalTriangle(numRows = 5)`, file: 'main.cpp', line: activeLine });
      inlineVal = `i: ${iVal}, j: ${jVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let iVal = 0, jVal = 0;
      if (stepIndex >= 3) iVal = 1;
      if (stepIndex >= 6) iVal = 2;
      if (stepIndex >= 8 && stepIndex <= 10) jVal = 1;
      if (stepIndex >= 11) iVal = 3;
      if (stepIndex >= 13) jVal = 1;
      if (stepIndex >= 14) jVal = 2;
      if (stepIndex >= 16) { iVal = 4; jVal = 0; }
      if (stepIndex >= 18) jVal = 1;
      if (stepIndex >= 19) jVal = 2;
      if (stepIndex >= 20) jVal = 3;

      if (lineNum === 9) return `i: ${iVal}`;
      if (lineNum === 14 && stepIndex >= 8) return `j: ${jVal}`;
      if (lineNum === 16 && stepIndex >= 9) return `triangle[${iVal}][${jVal}]: ${stepIndex === 9 ? 2 : (stepIndex === 13 ? 3 : (stepIndex === 14 ? 3 : (stepIndex === 18 ? 4 : (stepIndex === 19 ? 6 : 4))))}`;
      return null;
    }
  }
};
