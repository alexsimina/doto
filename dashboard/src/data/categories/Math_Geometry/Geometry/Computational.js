export const data = {
  "presentation": "### Prezentare Generală\n\nGeometria Computațională se concentrează pe algoritmi care rezolvă probleme geometrice. Structurile de date principale nu sunt array-uri de numere, ci Puncte, Vectori, Segmente și Poligoane.\n\nInstrumentul cel mai de preț în geometria 2D este **Produsul Vectorial (Cross Product)**. Dacă avem 3 puncte A, B, C, produsul vectorial al segmentelor AB și AC ne ajută să determinăm orientarea acestora: fac o curbură la stânga (Counter-Clockwise), o curbură la dreapta (Clockwise) sau sunt coliniare?\n\n$CrossProduct(AB, AC) = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x)$\n- Dacă e pozitiv: rotație anti-orară (stânga).\n- Dacă e negativ: rotație orară (dreapta).\n- Dacă e zero: puncte coliniare.\n\nPe acest concept se bazează calculul ariei unui poligon, detectarea intersecției între două segmente și algoritmul Graham Scan pentru aflarea Înfășurătoarei Convexe (Convex Hull - poligonul convex minim care înglobează un set de puncte).",
  "complexity": "### Complexitate\n\n- **Timp:** Majoritatea formulelor (Cross Product, Arie poligon) se execută în O(1) sau O(V) unde V e numărul de vârfuri. Pentru Convex Hull (Graham Scan sau Monotone Chain) complexitatea e O(N log N) din cauza nevoii de sortare a punctelor.\n- **Spațiu:** O(N) pentru a stoca vârfurile sau punctele de interes.\n",
  "variations": "### Variații și Edge Cases\n\n1. Sweepline Algorithm (Baleiere): O tehnică avansată pentru a găsi intersecția multor segmente sau punctul cel mai apropiat dintr-un plan în $O(N \\log N)$, traversând planul cu o \"linie imaginară\" de la stânga la dreapta.\n2. Poligoane strict convexe vs Poligoane oarecare: Anumiți algoritmi de geometrie se optimizează dramatic dacă se știe că poligonul este convex.",
  "applications": "### Aplicații\n\nGrafica pe calculator (renderizare 3D/2D, ray casting), Sisteme Informaționale Geografice (GIS, Google Maps), Roboți pentru pathfinding evitând obstacole geometrice (ex: visibility graphs), simularea fizicii (collision detection).",
  code: `
#include <iostream>

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
    
    cout << "CP pt Coliniar: " << cp1 << " (Orientare: " << (cp1 == 0 ? "Coliniar" : "") << ")
";
    cout << "CP pt Stanga: " << cp2 << " (Orientare: " << (cp2 > 0 ? "Anti-Orar (Stanga)" : "") << ")
";
    cout << "CP pt Dreapta: " << cp3 << " (Orientare: " << (cp3 < 0 ? "Orar (Dreapta)" : "") << ")
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 5,
      "text": "Definim structura `Point`. E recomandat să folosim `long long` sau `double` pentru geometrie, evitând overflow-ul apărut la înmulțiri.",
      "blocksVisual": [
        {
          "label": "Structura",
          "groups": [
            [
              {
                "val": "struct Point { x, y }"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Formula Produsului Vectorial. Aceasta ne scutește de a folosi pante și divizări la zero! Pur și simplu scade X-ul și Y-ul față de origine (A) și face produsul în cruce.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": "struct Point { x, y }",
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Test 1: Punctul C_Coliniar (5,5). Avem linia formată de A(1,1) și B(3,3). 5,5 se află clar pe prelungirea acestei linii.",
      "graphVisual": {
        "nodes": [
          {
            "id": 1,
            "x": 40,
            "y": 180,
            "label": "A(1,1)",
            "state": "normal"
          },
          {
            "id": 2,
            "x": 100,
            "y": 120,
            "label": "B(3,3)",
            "state": "normal"
          },
          {
            "id": 3,
            "x": 160,
            "y": 60,
            "label": "C(5,5)",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": 1,
            "target": 2
          },
          {
            "source": 2,
            "target": 3
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Calculăm CP: (3-1)*(5-1) - (3-1)*(5-1) = 2*4 - 2*4 = 8 - 8 = 0. Rezultat perfect: Orientare zero înseamnă coliniaritate.",
      "blocksVisual": [
        {
          "label": "CP = 0",
          "groups": [
            [
              {
                "val": "Coliniar",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Test 2: C_Stanga (2,4). Dacă tragem o linie de la A(1,1) la B(3,3), punctul (2,4) se află deasupra (adică la stânga vectorului AB).",
      "graphVisual": {
        "nodes": [
          {
            "id": 1,
            "x": 40,
            "y": 180,
            "label": "A(1,1)",
            "state": "normal"
          },
          {
            "id": 2,
            "x": 100,
            "y": 120,
            "label": "B(3,3)",
            "state": "normal"
          },
          {
            "id": 3,
            "x": 70,
            "y": 90,
            "label": "C(2,4)",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": 1,
            "target": 2
          },
          {
            "source": 2,
            "target": 3
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Calculăm CP: (3-1)*(4-1) - (3-1)*(2-1) = 2*3 - 2*1 = 6 - 2 = 4. Pozitiv! Deci traseul A -> B -> C implică un viraj la stânga (Anti-Orar).",
      "blocksVisual": [
        {
          "label": "CP > 0",
          "groups": [
            [
              {
                "val": "Anti-Orar",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Test 3: C_Dreapta (4,2). Acest punct e dedesubtul dreptei AB.",
      "graphVisual": {
        "nodes": [
          {
            "id": 1,
            "x": 40,
            "y": 180,
            "label": "A(1,1)",
            "state": "normal"
          },
          {
            "id": 2,
            "x": 100,
            "y": 120,
            "label": "B(3,3)",
            "state": "normal"
          },
          {
            "id": 3,
            "x": 130,
            "y": 150,
            "label": "C(4,2)",
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": 1,
            "target": 2
          },
          {
            "source": 2,
            "target": 3
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Calculăm CP: (3-1)*(2-1) - (3-1)*(4-1) = 2*1 - 2*3 = 2 - 6 = -4. Negativ! Deci virăm la dreapta (Orar).",
      "blocksVisual": [
        {
          "label": "CP < 0",
          "groups": [
            [
              {
                "val": "Orar",
                "sorted": true
              }
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
  }
};
