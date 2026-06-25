export const data = {
  "presentation": "### Prezentare Generală\n\nGeometria Computațională se concentrează pe algoritmi care rezolvă probleme geometrice. Structurile de date principale nu sunt array-uri de numere, ci Puncte, Vectori, Segmente și Poligoane.\n\nInstrumentul cel mai de preț în geometria 2D este **Produsul Vectorial (Cross Product)**. Dacă avem 3 puncte A, B, C, produsul vectorial al segmentelor AB și AC ne ajută să determinăm orientarea acestora: fac o curbură la stânga (Counter-Clockwise), o curbură la dreapta (Clockwise) sau sunt coliniare?\n\n$CrossProduct(AB, AC) = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x)$\n- Dacă e pozitiv: rotație anti-orară (stânga).\n- Dacă e negativ: rotație orară (dreapta).\n- Dacă e zero: puncte coliniare.\n\nPe acest concept se bazează calculul ariei unui poligon, detectarea intersecției între două segmente și algoritmul Graham Scan pentru aflarea Înfășurătorii Convexe (Convex Hull - poligonul convex minim care înglobează un set de puncte).",
  "complexity": "### Complexitate\n\n- **Timp:** Majoritatea formulelor (Cross Product, Arie poligon) se execută în O(1) sau O(V) unde V e numărul de vârfuri. Pentru Convex Hull (Graham Scan sau Monotone Chain) complexitatea e O(N log N) din cauza nevoii de sortare a punctelor.\n- **Spațiu:** O(N) pentru a stoca vârfurile sau punctele de interes.\n",
  "variations": "### Variații și Edge Cases\n\n1. Sweepline Algorithm (Baleiere): O tehnică avansată pentru a găsi intersecția multor segmente sau punctul cel mai apropiat dintr-un plan în $O(N \\log N)$, traversând planul cu o \"linie imaginară\" de la stânga la dreapta.\n2. Poligoane strict convexe vs Poligoane oarecare: Anumiți algoritmi de geometrie se optimizează dramatic dacă se știe că poligonul este convex.",
  "applications": "### Aplicații\n\nGrafica pe calculator (renderizare 3D/2D, ray casting), Sisteme Informaționale Geografice (GIS, Google Maps), Roboți pentru pathfinding evitând obstacole geometrice (ex: visibility graphs), simularea fizicii (collision detection).",
  code: `#include <iostream>

using namespace std;

struct Point {
    long long x, y;
};

// Functie care calculeaza produsul vectorial
long long crossProduct(Point a, Point b, Point c) {
    // Returneaza produsul vectorial al vectorilor AB si AC
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

int main() {
    Point A = {1, 1};
    Point B = {3, 3};
    
    // Vom testa trei puncte C diferite
    Point C_Coliniar = {5, 5};
    Point C_Stanga = {2, 4};
    Point C_Dreapta = {4, 2};
    
    long long cp1 = crossProduct(A, B, C_Coliniar);
    long long cp2 = crossProduct(A, B, C_Stanga);
    long long cp3 = crossProduct(A, B, C_Dreapta);
    
    cout << "CP pt Coliniar: " << cp1 << " (Orientare: " << (cp1 == 0 ? "Coliniar" : "") << ")\n";
    cout << "CP pt Stanga: " << cp2 << " (Orientare: " << (cp2 > 0 ? "Anti-Orar (Stanga)" : "") << ")\n";
    cout << "CP pt Dreapta: " << cp3 << " (Orientare: " << (cp3 < 0 ? "Orar (Dreapta)" : "") << ")\n";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 16,
      "text": "Pasul 1: Inițializăm punctul de origine A = (1, 1). Acesta va fi originea vectorilor noștri.",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)", "state": "active" }
        ],
        "edges": []
      }
    },
    {
      "line": 17,
      "text": "Pasul 2: Definim punctul B = (3, 3). Împreună cu A, formează vectorul de referință AB.",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 }
        ]
      }
    },
    {
      "line": 20,
      "text": "Pasul 3: Definim primul punct de test C_Coliniar = (5, 5).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 190, "y": 50, "label": "C(5,5)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 }
        ]
      }
    },
    {
      "line": 24,
      "text": "Pasul 4: Apelăm crossProduct(A, B, C_Coliniar). Se va evalua relația dintre vectorul AB și AC.",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 190, "y": 50, "label": "C(5,5)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 },
          { "source": 2, "target": 3 }
        ]
      }
    },
    {
      "line": 12,
      "text": "Pasul 5: Calculăm componentele vectorilor: (B.x - A.x) = 2 și (C.y - A.y) = 4. Primul produs este 2 * 4 = 8.",
      "blocksVisual": [
        {
          "label": "Produse intermediare",
          "groups": [
            [
              { "val": "AB.x = 2" }, { "val": "AC.y = 4" }, { "val": "AB.x * AC.y = 8", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 6: Calculăm celelalte componente: (B.y - A.y) = 2 și (C.x - A.x) = 4. Al doilea produs este 2 * 4 = 8.",
      "blocksVisual": [
        {
          "label": "Produse intermediare",
          "groups": [
            [
              { "val": "AB.y = 2" }, { "val": "AC.x = 4" }, { "val": "AB.y * AC.x = 8", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 7: Scădem produsele: 8 - 8 = 0. Rezultatul este 0.",
      "blocksVisual": [
        {
          "label": "Diferență CP",
          "groups": [
            [
              { "val": "8 - 8 = 0", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Pasul 8: crossProduct returnează 0. Punctul C_Coliniar se află pe dreapta determinată de A și B.",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 190, "y": 50, "label": "C(5,5)", "state": "visited" }
        ],
        "edges": [
          { "source": 1, "target": 2 },
          { "source": 2, "target": 3 }
        ]
      }
    },
    {
      "line": 21,
      "text": "Pasul 9: Definim al doilea punct de test C_Stanga = (2, 4).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 85, "y": 80, "label": "C(2,4)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 }
        ]
      }
    },
    {
      "line": 25,
      "text": "Pasul 10: Apelăm crossProduct(A, B, C_Stanga).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 85, "y": 80, "label": "C(2,4)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 },
          { "source": 2, "target": 3 }
        ]
      }
    },
    {
      "line": 12,
      "text": "Pasul 11: Calculăm componentele vectorilor: (B.x - A.x) = 2 și (C.y - A.y) = 3. Primul produs este 2 * 3 = 6.",
      "blocksVisual": [
        {
          "label": "Produse intermediare",
          "groups": [
            [
              { "val": "AB.x = 2" }, { "val": "AC.y = 3" }, { "val": "AB.x * AC.y = 6", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 12: Calculăm celelalte componente: (B.y - A.y) = 2 și (C.x - A.x) = 1. Al doilea produs este 2 * 1 = 2.",
      "blocksVisual": [
        {
          "label": "Produse intermediare",
          "groups": [
            [
              { "val": "AB.y = 2" }, { "val": "AC.x = 1" }, { "val": "AB.y * AC.x = 2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 13: Diferența este 6 - 2 = 4.",
      "blocksVisual": [
        {
          "label": "Diferență CP",
          "groups": [
            [
              { "val": "6 - 2 = 4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 14: crossProduct returnează 4. Semnul pozitiv indică o virare la stânga (orientare trigonometrică / anti-orară).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 85, "y": 80, "label": "C(2,4)", "state": "visited" }
        ],
        "edges": [
          { "source": 1, "target": 2 },
          { "source": 2, "target": 3 }
        ]
      }
    },
    {
      "line": 22,
      "text": "Pasul 15: Definim al treilea punct de test C_Dreapta = (4, 2).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 155, "y": 140, "label": "C(4,2)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 }
        ]
      }
    },
    {
      "line": 26,
      "text": "Pasul 16: Apelăm crossProduct(A, B, C_Dreapta).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 155, "y": 140, "label": "C(4,2)", "state": "active" }
        ],
        "edges": [
          { "source": 1, "target": 2 },
          { "source": 2, "target": 3 }
        ]
      }
    },
    {
      "line": 12,
      "text": "Pasul 17: Calculăm componentele vectorilor: (B.x - A.x) = 2 și (C.y - A.y) = 1. Primul produs este 2 * 1 = 2.",
      "blocksVisual": [
        {
          "label": "Produse intermediare",
          "groups": [
            [
              { "val": "AB.x = 2" }, { "val": "AC.y = 1" }, { "val": "AB.x * AC.y = 2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 18: Calculăm celelalte componente: (B.y - A.y) = 2 și (C.x - A.x) = 3. Al doilea produs este 2 * 3 = 6.",
      "blocksVisual": [
        {
          "label": "Produse intermediare",
          "groups": [
            [
              { "val": "AB.y = 2" }, { "val": "AC.x = 3" }, { "val": "AB.y * AC.x = 6", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 19: Diferența este 2 - 6 = -4.",
      "blocksVisual": [
        {
          "label": "Diferență CP",
          "groups": [
            [
              { "val": "2 - 6 = -4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Pasul 20: crossProduct returnează -4. Semnul negativ indică o virare la dreapta (orientare orară).",
      "graphVisual": {
        "nodes": [
          { "id": 1, "x": 50, "y": 170, "label": "A(1,1)" },
          { "id": 2, "x": 120, "y": 110, "label": "B(3,3)" },
          { "id": 3, "x": 155, "y": 140, "label": "C(4,2)", "state": "visited" }
        ],
        "edges": [
          { "source": 1, "target": 2 },
          { "source": 2, "target": 3 }
        ]
      }
    },
    {
      "line": 28,
      "text": "Pasul 21: Afișăm primul rezultat în main: CP pt Coliniar: 0.",
      "blocksVisual": [
        {
          "label": "Afisaj consola",
          "groups": [
            [
              { "val": "CP Coliniar: 0 (Coliniar)", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Pasul 22: Afișăm al doilea rezultat: CP pt Stanga: 4.",
      "blocksVisual": [
        {
          "label": "Afisaj consola",
          "groups": [
            [
              { "val": "CP Stanga: 4 (Stanga)", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Pasul 23: Afișăm al treilea rezultat: CP pt Dreapta: -4. Execuția se termină cu succes!",
      "blocksVisual": [
        {
          "label": "Afisaj consola",
          "groups": [
            [
              { "val": "CP Dreapta: -4 (Dreapta)", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Aria unui Poligon",
        "url": "https://www.pbinfo.ro/probleme/2261/poligon",
        "desc": "Formula lui Gauss"
      },
      {
        "title": "Valid Boomerang",
        "url": "https://leetcode.com/problems/valid-boomerang/",
        "desc": "Puncte Necoliniare"
      }
    ],
    "medium": [
      {
        "title": "Erect the Fence",
        "url": "https://leetcode.com/problems/erect-the-fence/",
        "desc": "Convex Hull (Graham Scan)"
      },
      {
        "title": "Intersecție Segmente",
        "url": "https://www.infoarena.ro/problema/intersectie",
        "desc": "Folosind cross product"
      }
    ],
    "hard": [
      {
        "title": "Closest Pair of Points",
        "url": "https://www.spoj.com/problems/CLOPPAIR/",
        "desc": "Divide et Impera sau Sweepline O(N log N)"
      }
    ]
  },
    "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      
      globalVars.push({ name: 'A', type: 'Point', val: '{1, 1}', expandable: false });
      globalVars.push({ name: 'B', type: 'Point', val: '{3, 3}', expandable: false });
      
      let cpResult = 0;
      let cName = 'C_Coliniar';
      if (stepIndex <= 8) { cName = 'C_Coliniar'; cpResult = 0; }
      else if (stepIndex <= 14) { cName = 'C_Stanga'; cpResult = 4; }
      else { cName = 'C_Dreapta'; cpResult = -4; }
      
      vars.push({ name: cName, type: 'Point', val: cName === 'C_Coliniar' ? '{5,5}' : cName === 'C_Stanga' ? '{2,4}' : '{4,2}', expandable: false });
      if (stepIndex >= 4) vars.push({ name: 'cp', type: 'long long', val: cpResult, expandable: false });
      
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 4 && stepIndex <= 7) frames.unshift({ name: `crossProduct(A, B, ${cName})`, file: 'main.cpp', line: activeLine });
      if (stepIndex >= 10 && stepIndex <= 13) frames.unshift({ name: `crossProduct(A, B, ${cName})`, file: 'main.cpp', line: activeLine });
      if (stepIndex >= 16 && stepIndex <= 19) frames.unshift({ name: `crossProduct(A, B, ${cName})`, file: 'main.cpp', line: activeLine });
      
      inlineVal = stepIndex >= 4 ? `cp: ${cpResult}` : null;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if ((lineNum === 24 || lineNum === 28) && stepIndex >= 8) return 'cp1: 0';
      if ((lineNum === 25 || lineNum === 29) && stepIndex >= 14) return 'cp2: 4';
      if ((lineNum === 26 || lineNum === 30) && stepIndex >= 20) return 'cp3: -4';
      return null;
    }
  }};
