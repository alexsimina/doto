export const data = {
  "presentation": `### Prezentare Generală

Înfășurătoarea convexă (Convex Hull) a unei mulțimi de puncte din plan este cel mai mic poligon convex care conține toate punctele în interiorul său sau pe frontieră. O analogie fizică clasică este plasarea unui elastic de cauciuc în jurul unor cuie bătute în plan; elasticul se va strânge închizând toate cuiele și formând exact înfășurătoarea convexă.

Există mai mulți algoritmi pentru a determina înfășurătoarea convexă:
- **Algoritmul lui Jarvis (Gift Wrapping):** $O(N \\cdot H)$ unde $H$ este numărul de puncte de pe înfășurătoare.
- **Scanarea Graham (Graham Scan):** $O(N \\log N)$ folosind sortare polară.
- **Algoritmul Monotone Chain al lui Andrew:** $O(N \\log N)$, extrem de popular în programare competitivă deoarece utilizează o simplă sortare lexicografică și împarte înfășurătoarea în două jumătăți: partea inferioară (Lower Hull) și partea superioară (Upper Hull).

Pentru a determina dacă trei puncte succesive $O, A, B$ fac o curbă la stânga (counter-clockwise) sau la dreapta (clockwise), se folosește **Produsul Vectorial (Cross Product)**:
$$ \\text{cross}(O, A, B) = (A.x - O.x)(B.y - O.y) - (A.y - O.y)(B.x - O.x) $$
Dacă rezultatul este $> 0$, atunci curba este spre stânga. Dacă este $< 0$, curba este spre dreapta, iar dacă este $0$, punctele sunt coliniare.`,
  "complexity": `### Complexitate

Pentru $N$ puncte în plan folosind algoritmul lui Andrew:
- **Timp:** $O(N \\log N)$ — sortarea inițială lexicografică a punctelor domină timpul de rulare. Construirea înfășurătorilor se face în timp liniar $O(N)$, deoarece fiecare punct este adăugat și eliminat cel mult o dată în structura stivei.
- **Spațiu:** $O(N)$ — necesar pentru stocarea punctelor sortate și a punctelor din înfășurătoarea convexă finală.`,
  "variations": `### Variații și Edge Cases

1. **Puncte coliniare:** Dacă există mai multe puncte pe marginea înfășurătorii convexe, trebuie stabilit clar prin cerință dacă acestea trebuie păstrate sau eliminate (se rezolvă prin modificarea operatorului $\\le 0$ sau $< 0$ în verificarea cross product-ului).
2. **Număr mic de puncte:** Pentru $N \\le 3$, toate punctele fac parte din înfășurătoarea convexă (după eliminarea eventualelor duplicate coliniare).`,
  "applications": `### Aplicații

- **Probleme de localizare:** Determinarea celei mai mici zone de siguranță care cuprinde un set de senzori sau orașe.
- **Planificare de rute:** Evitarea obstacolelor în robotică prin ocolirea înfășurătorii lor convexe.
- **Geometrie computațională avansată:** Determinarea diametrului unei mulțimi de puncte sau determinarea dacă două poligoane se intersectează.`,
  "code": `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Point {
    long long x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

long long crossProduct(Point O, Point A, Point B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

vector<Point> convexHull(vector<Point>& points) {
    int n = points.size();
    if (n <= 3) return points;
    
    sort(points.begin(), points.end());
    vector<Point> hull;
    
    // Partea inferioara (Lower hull)
    for (int i = 0; i < n; ++i) {
        while (hull.size() >= 2 && crossProduct(hull[hull.size() - 2], hull.back(), points[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }
    
    // Partea superioara (Upper hull)
    int t = hull.size() + 1;
    for (int i = n - 2; i >= 0; --i) {
        while (hull.size() >= t && crossProduct(hull[hull.size() - 2], hull.back(), points[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }
    
    hull.pop_back(); // Ultimul punct e duplicat al primului
    return hull;
}

int main() {
    vector<Point> pts = {{0, 3}, {1, 1}, {2, 2}, {4, 4}, {0, 0}, {1, 2}, {3, 1}, {3, 3}};
    vector<Point> hull = convexHull(pts);
    cout << "Puncte in infasuratoare: ";
    for (Point p : hull) {
        cout << "(" << p.x << ", " << p.y << ") ";
    }
    cout << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 50,
      "text": "Apelăm funcția `convexHull` cu vectorul de puncte trimis în consolă.",
      "blocksVisual": [
        {
          "label": "Input",
          "groups": [
            [
              { "val": "(0,3)" }, { "val": "(1,1)" }, { "val": "(2,2)" }, { "val": "(4,4)" },
              { "val": "(0,0)" }, { "val": "(1,2)" }, { "val": "(3,1)" }, { "val": "(3,3)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Salvăm numărul total de puncte: `n = 8`.",
      "blocksVisual": [
        {
          "label": "n",
          "groups": [
            [
              { "val": "8", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Sortăm lexicografic punctele: mai întâi crescător după coordonata $X$, apoi după coordonata $Y$. Punctele sortate sunt: $\{(0,0), (0,3), (1,1), (1,2), (2,2), (3,1), (3,3), (4,4)\}$.",
      "blocksVisual": [
        {
          "label": "Puncte sortate",
          "groups": [
            [
              { "val": "(0,0)" }, { "val": "(0,3)" }, { "val": "(1,1)" }, { "val": "(1,2)" },
              { "val": "(2,2)" }, { "val": "(3,1)" }, { "val": "(3,3)" }, { "val": "(4,4)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Inițializăm vectorul (stiva) `hull` care va stoca succesiv punctele înfășurătorii.",
      "blocksVisual": [
        {
          "label": "hull",
          "groups": [
            [
              { "val": "vid" }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Pornim bucla exterioară pentru a construi partea inferioară a înfășurătorii (Lower Hull), adăugând puncte de la stânga la dreapta.",
      "blocksVisual": [
        {
          "label": "Lower Hull",
          "groups": [
            [
              { "val": "Start Lower", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Cât timp stiva `hull` are cel puțin $2$ elemente și ultimele două elemente plus punctul curent fac o curbă la dreapta (sau sunt coliniare, cross product $\\le 0$), eliminăm ultimul punct din stivă.",
      "blocksVisual": [
        {
          "label": "Verificare viraj",
          "groups": [
            [
              { "val": "crossProduct <= 0?" }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Inserăm punctul curent `points[i]` în stivă. La finalul etapei Lower Hull, punctele selectate sunt: $\{(0,0), (3,1), (4,4)\}$.",
      "blocksVisual": [
        {
          "label": "Lower Hull finalizat",
          "groups": [
            [
              { "val": "(0,0)" }, { "val": "(3,1)" }, { "val": "(4,4)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Setăm limita `t = hull.size() + 1` (în acest caz $3+1 = 4$). Toate punctele adăugate în continuare trebuie să mențină dimensiunea stivei peste `t` pentru a nu altera Lower Hull.",
      "blocksVisual": [
        {
          "label": "Limita t",
          "groups": [
            [
              { "val": "t = 4", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Pornim bucla pentru a construi partea superioară a înfășurătorii (Upper Hull), parcurgând punctele de la dreapta la stânga, începând cu `n - 2`.",
      "blocksVisual": [
        {
          "label": "Upper Hull",
          "groups": [
            [
              { "val": "Start Upper", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 38,
      "text": "Similar, eliminăm punctele care nu fac o curbă spre stânga (cross product $\\le 0$), dar de data aceasta raportat la limita `t`.",
      "blocksVisual": [
        {
          "label": "Verificare viraj",
          "groups": [
            [
              { "val": "crossProduct <= 0?" }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Adăugăm punctele în `hull`. Punctele adăugate în această fază vor fi cele din partea de sus: $(3,3)$, $(0,3)$ și din nou $(0,0)$.",
      "blocksVisual": [
        {
          "label": "Upper Hull adăugat",
          "groups": [
            [
              { "val": "(0,0)" }, { "val": "(3,1)" }, { "val": "(4,4)" },
              { "val": "(3,3)" }, { "val": "(0,3)" }, { "val": "(0,0)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 44,
      "text": "Eliminăm ultimul punct din stivă, deoarece este exact primul punct $(0,0)$ pe care l-am duplicat la închiderea poligonului.",
      "blocksVisual": [
        {
          "label": "Set final stivă",
          "groups": [
            [
              { "val": "(0,0)" }, { "val": "(3,1)" }, { "val": "(4,4)" },
              { "val": "(3,3)" }, { "val": "(0,3)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 45,
      "text": "Returnăm vectorul cu punctele înfășurătorii convexe în ordine trigonometrică.",
      "blocksVisual": [
        {
          "label": "Valori returnate",
          "groups": [
            [
              { "val": "5 puncte", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 52,
      "text": "Parcurgem punctele înfășurătorii convexe și le afișăm pe ecran.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              { "val": "Output generat", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Erect the Fence",
        "url": "https://leetcode.com/problems/erect-the-fence/",
        "desc": "Găsește toate coordonatele copacilor care definesc gardul exterior (înfășurătoarea convexă), incluzând punctele coliniare."
      }
    ],
    "medium": [
      {
        "title": "Convex Hull Graham Scan",
        "url": "https://www.geeksforgeeks.org/convex-hull-using-graham-scan/",
        "desc": "Implementează înfășurătoarea convexă folosind algoritmul Graham Scan bazat pe ordonare polară."
      }
    ],
    "hard": [
      {
        "title": "Convex Hull",
        "url": "https://cses.fi/problemset/task/2195/",
        "desc": "Problemă clasică Convex Hull pe CSES: determină înfășurătoarea convexă folosind un algoritm eficient și afișează punctele în ordinea cerută."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const states = [
        { f: [{ name: 'main()', file: 'main.cpp', line: 77 }], v: [] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 48 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 51 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 52 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[]' }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 55 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[]' }, { name: 'i', type: 'int', val: 0 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 56 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[]' }, { name: 'i', type: 'int', val: 0 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 59 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4)]' }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 63 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4)]' }, { name: 't', type: 'int', val: 4 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 64 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4)]' }, { name: 't', type: 'int', val: 4 }, { name: 'i', type: 'int', val: 6 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 65 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4)]' }, { name: 't', type: 'int', val: 4 }, { name: 'i', type: 'int', val: 6 }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 68 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4),(3,3),(0,3),(0,0)]' }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 71 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4),(3,3),(0,3)]' }] },
        { f: [{ name: 'convexHull(pts)', file: 'main.cpp', line: 72 }, { name: 'main()', file: 'main.cpp', line: 77 }], v: [{ name: 'n', type: 'int', val: 8 }, { name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4),(3,3),(0,3)]' }] },
        { f: [{ name: 'main()', file: 'main.cpp', line: 79 }], v: [{ name: 'hull', type: 'vector<Point>', val: '[(0,0),(3,1),(4,4),(3,3),(0,3)]' }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0) {
        inlineVal = "hull.size(): " + (vars.find(v => v.name === 'hull')?.val ? vars.find(v => v.name === 'hull').val.split('),(').length : 0);
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const varsAtStep = [
        { i: 0, hullSize: 0 },
        { i: 0, hullSize: 0 },
        { i: 0, hullSize: 0 },
        { i: 0, hullSize: 0 },
        { i: 0, hullSize: 0 },
        { i: 0, hullSize: 0 },
        { i: 7, hullSize: 3 },
        { i: 7, hullSize: 3, t: 4 },
        { i: 6, hullSize: 3, t: 4 },
        { i: 6, hullSize: 3, t: 4 },
        { i: 0, hullSize: 6 },
        { i: 0, hullSize: 5 },
        { i: 0, hullSize: 5 },
        { i: 0, hullSize: 5 }
      ];
      const s = varsAtStep[stepIndex] || varsAtStep[varsAtStep.length - 1];
      if (lineNum === 48) return "n: 8";
      if (lineNum === 52) return "hull initialized";
      if (lineNum === 55) return "i: " + s.i;
      if (lineNum === 59) return "hull size: " + s.hullSize;
      if (lineNum === 63) return "t: " + s.t;
      if (lineNum === 64) return "i: " + s.i;
      if (lineNum === 68) return "hull size: " + s.hullSize;
      if (lineNum === 71) return "popped duplicate";
      if (lineNum === 72) return "hull size: " + s.hullSize;
      if (lineNum === 77) return "hull computed";
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const nodes = [
        { id: '0', x: 50, y: 250, label: '(0,0)' },
        { id: '1', x: 50, y: 100, label: '(0,3)' },
        { id: '2', x: 130, y: 200, label: '(1,1)' },
        { id: '3', x: 130, y: 150, label: '(1,2)' },
        { id: '4', x: 210, y: 150, label: '(2,2)' },
        { id: '5', x: 290, y: 200, label: '(3,1)' },
        { id: '6', x: 290, y: 100, label: '(3,3)' },
        { id: '7', x: 370, y: 50, label: '(4,4)' }
      ];

      let hullIndices = [];
      let closed = false;

      if (stepIndex === 6) {
        hullIndices = [0, 5, 7];
      } else if (stepIndex === 7 || stepIndex === 8 || stepIndex === 9) {
        hullIndices = [0, 5, 7];
      } else if (stepIndex === 10) {
        hullIndices = [0, 5, 7, 6, 1, 0];
        closed = true;
      } else if (stepIndex >= 11) {
        hullIndices = [0, 5, 7, 6, 1];
        closed = true;
      }

      nodes.forEach(n => {
        const idx = parseInt(n.id);
        if (hullIndices.includes(idx)) {
          n.state = 'active';
        }
      });

      const edges = [];
      for (let i = 0; i < hullIndices.length - 1; i++) {
        edges.push({
          source: String(hullIndices[i]),
          target: String(hullIndices[i + 1]),
          active: true
        });
      }
      if (closed && hullIndices.length > 2 && hullIndices[hullIndices.length - 1] !== hullIndices[0]) {
        edges.push({
          source: String(hullIndices[hullIndices.length - 1]),
          target: String(hullIndices[0]),
          active: true
        });
      }

      return {
        directed: false,
        nodes,
        edges
      };
    }
  }
};
