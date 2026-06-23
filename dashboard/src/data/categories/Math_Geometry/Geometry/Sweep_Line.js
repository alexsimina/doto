export const data = {
  "presentation": `### Prezentare Generală

Algoritmul de baleiere (Sweep Line) este o paradigmă geometrică fundamentală utilizată pentru a rezolva probleme bidimensionale prin trecerea unei linii imaginare (de obicei verticală sau orizontală) peste plan. Pe măsură ce linia se deplasează de la stânga la dreapta, evenimentele geometrice relevante sunt procesate în ordine cronologică.

Acest algoritm transformă o problemă statică bidimensională într-o problemă dinamică unidimensională. O structură de date de tip set auto-echilibrat (de exemplu \`std::set\` în C++) este utilizată pentru a stoca starea activă a obiectelor geometrice intersectate în prezent de linia de baleiere.

Exemple clasice includ determinarea intersecțiilor de segmente în plan (Algoritmul Bentley-Ottmann) sau găsirea celei mai apropiate perechi de puncte (Closest Pair of Points) în $O(N \\log N)$.`,
  "complexity": `### Complexitate

Pentru $N$ obiecte în plan (cum ar fi puncte sau capete de segmente):
- **Timp:** $O(N \\log N)$ — sortarea inițială a evenimentelor durează $O(N \\log N)$, iar fiecare inserare, ștergere și interogare în setul activ durează $O(\\log N)$ pe eveniment.
- **Spațiu:** $O(N)$ — necesar pentru stocarea evenimentelor geometrice și a structurii setului activ.`,
  "variations": `### Variații și Edge Cases

1. **Evenimente coincidente:** Dacă mai multe puncte au aceeași abscisă $X$, ordonarea lor secundară (de obicei după $Y$) este critică pentru a evita erori geometrice.
2. **Structuri active adaptate:** În funcție de problemă, setul activ poate stoca puncte (sortate după $Y$), intervale active, sau intersecții de segmente.
3. **Baleiere 1D:** Probleme simple precum unirea intervalelor sau calcularea acoperirii maxime pe o axă folosesc evenimente de tip „start” și „end” sortate liniar.`,
  "applications": `### Aplicații

- Determinarea ariei uniunii unei mulțimi de dreptunghiuri orientate pe axe (Algoritmul lui Klee).
- Găsirea celei mai apropiate perechi de puncte în plan bidimensional.
- Determinarea tuturor punctelor de intersecție dintr-o mulțime de segmente de dreaptă.
- Triangularea poligoanelor în grafică computerizată.`,
  "code": `
#include <iostream>
#include <vector>
#include <set>
#include <cmath>
#include <algorithm>
#include <iomanip>

using namespace std;

struct Point {
    double x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

struct CompareY {
    bool operator()(const Point& a, const Point& b) const {
        if (a.y != b.y) return a.y < b.y;
        return a.x < b.x;
    }
};

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

double closestPair(vector<Point>& points) {
    sort(points.begin(), points.end());
    set<Point, CompareY> active_set;
    double d = dist(points[0], points[1]);
    active_set.insert(points[0]);
    active_set.insert(points[1]);
    
    int left = 0;
    for (int i = 2; i < points.size(); ++i) {
        while (left < i && points[i].x - points[left].x >= d) {
            active_set.erase(points[left]);
            left++;
        }
        
        Point lower = {points[i].x, points[i].y - d};
        Point upper = {points[i].x, points[i].y + d};
        auto it_start = active_set.lower_bound(lower);
        
        for (auto it = it_start; it != active_set.end() && it->y <= points[i].y + d; ++it) {
            d = min(d, dist(points[i], *it));
        }
        active_set.insert(points[i]);
    }
    return d;
}

int main() {
    vector<Point> pts = {{2, 3}, {12, 30}, {40, 50}, {5, 1}, {12, 10}, {3, 4}};
    double ans = closestPair(pts);
    cout << "Distanta minima: " << fixed << setprecision(4) << ans << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 58,
      "text": "Apelăm funcția `closestPair` cu un set de puncte nesortate: $\{(2,3), (12,30), (40,50), (5,1), (12,10), (3,4)\}$.",
      "blocksVisual": [
        {
          "label": "Puncte primite",
          "groups": [
            [
              { "val": "(2,3)" }, { "val": "(12,30)" }, { "val": "(40,50)" },
              { "val": "(5,1)" }, { "val": "(12,10)" }, { "val": "(3,4)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Sortăm vectorul de puncte crescător după coordonata $X$. Punctele sortate sunt: $\{(2,3), (3,4), (5,1), (12,10), (12,30), (40,50)\}$.",
      "blocksVisual": [
        {
          "label": "Puncte sortate",
          "groups": [
            [
              { "val": "(2,3)" }, { "val": "(3,4)" }, { "val": "(5,1)" },
              { "val": "(12,10)" }, { "val": "(12,30)" }, { "val": "(40,50)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Inițializăm `active_set`, care va menține punctele din banda activă de baleiere sortate vertical după coordonata $Y$.",
      "blocksVisual": [
        {
          "label": "active_set",
          "groups": [
            [
              { "val": "vid" }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Inițializăm distanța minimă `d` cu distanța dintre primele două puncte sortate: $d = \\text{dist}((2,3), (3,4)) \\approx 1.4142$.",
      "blocksVisual": [
        {
          "label": "Stare distanță",
          "groups": [
            [
              { "val": "d = 1.4142", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "Inserăm primul punct `points[0]` ($(2,3)$) în setul activ.",
      "blocksVisual": [
        {
          "label": "Set Activ",
          "groups": [
            [
              { "val": "(2,3)", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Inserăm al doilea punct `points[1]` ($(3,4)$) în setul activ.",
      "blocksVisual": [
        {
          "label": "Set Activ",
          "groups": [
            [
              { "val": "(2,3)" }, { "val": "(3,4)", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Inițializăm pointerul `left = 0`, care marchează cel mai din stânga punct aflat încă în banda de lățime $d$.",
      "blocksVisual": [
        {
          "label": "Pointer stânga",
          "groups": [
            [
              { "val": "left = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 38,
      "text": "Parcurgem restul punctelor cu un indice `i` de la $2$ la $5$. Începem cu `i = 2`, adică punctul $(5,1)$.",
      "blocksVisual": [
        {
          "label": "Punct curent",
          "groups": [
            [
              { "val": "i = 2 (5,1)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Verificăm dacă punctele din stânga trebuie eliminate: coordonata $X$ a lui `points[2]` ($5$) minus `points[left]` ($2$) este $3 \\ge d$ ($1.4142$). Condiția este adevărată.",
      "blocksVisual": [
        {
          "label": "Fereastră X",
          "groups": [
            [
              { "val": "5 - 2 = 3 >= 1.4142", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 40,
      "text": "Ștergem punctul `points[left]` ($(2,3)$) din setul activ deoarece se află prea în stânga liniei de baleiere.",
      "blocksVisual": [
        {
          "label": "Set Activ",
          "groups": [
            [
              { "val": "(3,4)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Incrementăm `left` la $1$, mutând marginea stângă a ferestrei de baleiere active.",
      "blocksVisual": [
        {
          "label": "Pointer stânga",
          "groups": [
            [
              { "val": "left = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 44,
      "text": "Definim punctul limită inferior `lower = (5, -0.4142)` pentru a efectua o căutare pe verticală.",
      "blocksVisual": [
        {
          "label": "Limită căutare",
          "groups": [
            [
              { "val": "lower.y = -0.4142", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 46,
      "text": "Folosim `lower_bound` pentru a localiza primul element din setul activ cu ordonata $Y \\ge -0.4142$.",
      "blocksVisual": [
        {
          "label": "Căutare în set",
          "groups": [
            [
              { "val": "iterator la (3,4)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 48,
      "text": "Parcurgem elementele din setul activ din vecinătatea punctului curent, a căror ordonată diferă cu cel mult $d$.",
      "blocksVisual": [
        {
          "label": "Vecini analizați",
          "groups": [
            [
              { "val": "punct active = (3,4)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 49,
      "text": "Calculăm distanța dintre $(5,1)$ și $(3,4)$, care este $\\approx 3.605$. Cum $3.605 > d$, distanța minimă `d` rămâne neschimbată.",
      "blocksVisual": [
        {
          "label": "Comparație",
          "groups": [
            [
              { "val": "d = 1.4142", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 53,
      "text": "După parcurgerea tuturor punctelor, returnăm distanța minimă găsită: $1.4142$.",
      "blocksVisual": [
        {
          "label": "Rezultat final",
          "groups": [
            [
              { "val": "1.4142", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Merge Intervals",
        "url": "https://leetcode.com/problems/merge-intervals/",
        "desc": "Îmbinează intervalele suprapuse folosind o linie de baleiere unidimensională prin sortarea punctelor de start și final."
      }
    ],
    "medium": [
      {
        "title": "The Skyline Problem",
        "url": "https://leetcode.com/problems/the-skyline-problem/",
        "desc": "Reprezintă conturul clădirilor suprapuse folosind o linie de baleiere verticală și o structură de priority queue."
      }
    ],
    "hard": [
      {
        "title": "Closest Pair of Points",
        "url": "https://www.spoj.com/problems/CLOPPAIR/",
        "desc": "Găsește cea mai apropiată pereche de puncte în plan bidimensional folosind algoritmul Sweep Line în timp O(N log N)."
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
        { f: [{ name: 'main()', file: 'main.cpp', line: 82 }], v: [] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 55 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 56 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{}' }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 57 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{}' }, { name: 'd', type: 'double', val: 1.4142 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 58 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(2,3)}' }, { name: 'd', type: 'double', val: 1.4142 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 59 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(2,3),(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 61 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(2,3),(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 0 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 62 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(2,3),(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 0 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 63 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(2,3),(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 0 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 64 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 0 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 65 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 1 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 68 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 1 }, { name: 'i', type: 'int', val: 2 }, { name: 'lower', type: 'Point', val: '(5,-0.4142)' }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 70 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 1 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 72 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 1 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 73 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 1 }, { name: 'i', type: 'int', val: 2 }] },
        { f: [{ name: 'closestPair(pts)', file: 'main.cpp', line: 77 }, { name: 'main()', file: 'main.cpp', line: 82 }], v: [{ name: 'active_set', type: 'set<Point>', val: '{(3,4)}' }, { name: 'd', type: 'double', val: 1.4142 }, { name: 'left', type: 'int', val: 1 }, { name: 'i', type: 'int', val: 2 }] }
      ];

      const s = states[stepIndex] || states[states.length - 1];
      s.v.forEach(v => vars.push({ ...v, expandable: false }));
      s.f.forEach(fr => frames.push(fr));
      if (stepIndex > 0) {
        inlineVal = "d: " + (vars.find(v => v.name === 'd')?.val || '1.4142') + ", active_set: " + (vars.find(v => v.name === 'active_set')?.val || '{}');
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const varsAtStep = [
        { i: 0, d: 'N/A', left: 0 },
        { i: 0, d: 'N/A', left: 0 },
        { i: 0, d: 'N/A', left: 0 },
        { i: 0, d: 1.4142, left: 0 },
        { i: 0, d: 1.4142, left: 0 },
        { i: 0, d: 1.4142, left: 0 },
        { i: 0, d: 1.4142, left: 0 },
        { i: 2, d: 1.4142, left: 0 },
        { i: 2, d: 1.4142, left: 0 },
        { i: 2, d: 1.4142, left: 0 },
        { i: 2, d: 1.4142, left: 1 },
        { i: 2, d: 1.4142, left: 1 },
        { i: 2, d: 1.4142, left: 1 },
        { i: 2, d: 1.4142, left: 1 },
        { i: 2, d: 1.4142, left: 1 },
        { i: 2, d: 1.4142, left: 1 }
      ];
      const s = varsAtStep[stepIndex] || varsAtStep[varsAtStep.length - 1];
      if (lineNum === 55) return "sorting done";
      if (lineNum === 56) return "active_set initialized";
      if (lineNum === 57) return "d: " + s.d;
      if (lineNum === 61) return "left: " + s.left;
      if (lineNum === 62) return "i: " + s.i;
      if (lineNum === 64) return "erased points[left]";
      if (lineNum === 65) return "left: " + s.left;
      if (lineNum === 77) return "d: " + s.d;
      if (lineNum === 82) return "closest pair distance computed";
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const nodes = [
        { id: '0', x: 46, y: 238, label: '(2,3)' },
        { id: '1', x: 54, y: 234, label: '(3,4)' },
        { id: '2', x: 70, y: 246, label: '(5,1)' },
        { id: '3', x: 126, y: 210, label: '(12,10)' },
        { id: '4', x: 126, y: 130, label: '(12,30)' },
        { id: '5', x: 350, y: 50, label: '(40,50)' }
      ];

      let activeSetIndices = [];
      let currentPtIdx = -1;
      let sweepX = null;

      if (stepIndex === 4) {
        activeSetIndices = [0];
        sweepX = 46;
      } else if (stepIndex === 5 || stepIndex === 6) {
        activeSetIndices = [0, 1];
        sweepX = 54;
      } else if (stepIndex === 7 || stepIndex === 8) {
        activeSetIndices = [0, 1];
        currentPtIdx = 2;
        sweepX = 70;
      } else if (stepIndex === 9) {
        activeSetIndices = [1];
        currentPtIdx = 2;
        sweepX = 70;
      } else if (stepIndex >= 10 && stepIndex <= 14) {
        activeSetIndices = [1];
        currentPtIdx = 2;
        sweepX = 70;
      } else if (stepIndex === 15) {
        activeSetIndices = [0, 1, 2, 3, 4, 5];
        sweepX = 350;
      }

      nodes.forEach(n => {
        const idx = parseInt(n.id);
        if (idx === currentPtIdx) {
          n.state = 'active';
        } else if (activeSetIndices.includes(idx)) {
          n.state = 'visited';
        }
      });

      const edges = [];
      if (sweepX !== null) {
        nodes.push({ id: 'sweep_t', x: sweepX, y: 20, label: 'Baleiere', size: 1 });
        nodes.push({ id: 'sweep_b', x: sweepX, y: 280, label: '', size: 1 });
        edges.push({ source: 'sweep_t', target: 'sweep_b', active: true });
      }

      if (stepIndex >= 3) {
        edges.push({ source: '0', target: '1', active: false, label: 'd=1.41' });
      }

      return {
        directed: false,
        nodes,
        edges
      };
    }
  }
};
