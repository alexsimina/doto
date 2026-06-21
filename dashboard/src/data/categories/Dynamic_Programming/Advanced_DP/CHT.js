export const data = {
  "presentation": "### Prezentare Generală\n\n**Convex Hull Trick (CHT)** este o tehnică avansată de optimizare a ecuațiilor de recurență în Programarea Dinamică. Această metodă este utilizată atunci când tranziția DP poate fi modelată ca o căutare a minimului sau maximului dintr-un set de funcții liniare (drepte).\n\nConsiderăm o relație de recurență de forma:\n$$dp[i] = A[i] + \\min_{j < i} \\left( dp[j] + M[j] \\cdot X[i] + C[j] \\right)$$\n\nPutem observa că expresia din interiorul parantezei, $dp[j] + M[j] \\cdot x + C[j]$, reprezintă ecuația unei drepte $y = m_j \\cdot x + c_j$, unde:\n- Panta dreptei este $m_j = M[j]$\n- Intersecția cu axa Oy este $c_j = dp[j] + C[j]$\n- Valoarea la care evaluăm este $x = X[i]$\n\nÎn loc să parcurgem toate stările anterioare $j < i$ în $\\mathcal{O}(N)$ pentru a găsi dreapta minimă într-un punct $X[i]$, menținem o structură geometrică numită **înveliș inferior** (lower envelope) al acestor drepte. CHT ne permite să adăugăm drepte noi și să interogăm valoarea minimă în timp mult mai eficient.\n\n#### Cazuri de funcționare\n1. **Pante monotone și interogări monotone:** Putem folosi o coadă cu două capete (deque). Adăugarea și interogarea se fac în $\\mathcal{O}(1)$ amortizat.\n2. **Pante monotone și interogări arbitrare:** Putem folosi căutarea binară pe învelișul de drepte pentru a găsi dreapta optimă în timp $\\mathcal{O}(\\log N)$.\n3. **Fără monotonie (cazul general):** Necesită o structură dinamică mai complexă precum *Li Chao Tree* sau *Dynamic Convex Hull Trick* (ex: implementarea std::set cu căutare pe intersecții), realizând operațiile în $\\mathcal{O}(\\log N)$.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - $\\mathcal{O}(N)$ total (adică $\\mathcal{O}(1)$ amortizat per pas) dacă pantele dreptelor adăugate și punctele de interogare $X[i]$ sunt monotone.\n  - $\\mathcal{O}(N \\log N)$ total dacă interogările nu sunt monotone, utilizând căutarea binară.\n- **Spațiu:** $\\mathcal{O}(N)$ pentru stocarea dreptelor care formează învelișul convex.",
  "variations": "### Variații și Edge Cases\n\n1. **Li Chao Tree:** O structură de date arborescentă asemănătoare cu un arbore de intervale, care poate gestiona adăugări de segmente de dreaptă și interogări în puncte arbitrare fără a necesita pante monotone.\n2. **Divide and Conquer Optimization:** Se folosește când funcția de cost îndeplinește proprietatea de quadrangle inequality ($cost[a][c] + cost[b][d] \\le cost[a][d] + cost[b][c]$ pentru $a \\le b \\le c \\le d$).\n3. **Edge Cases:**\n   - **Drepte paralele ($m_1 = m_2$):** Se păstrează doar cea cu interceptul mai mic ($c$ minim), eliminând-o pe cealaltă imediat.\n   - **Diviziune prin zero:** Calculul corect al punctelor de intersecție fără erori de precizie prin utilizarea tipului `long long` sau `double`.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Probleme de Planificare (Scheduling):** Minimizarea penalizărilor de timp sau costurilor de producție atunci când costul este o funcție liniară în raport cu timpul de finalizare.\n- **Optimizări în Rucsac Dinamic:** Rezolvarea anumitor cazuri speciale de alocare continuă a resurselor.\n- **Segmentare Optimă (ex: Machine Learning):** Divizarea unui set de date în $K$ submulțimi pentru a minimiza suma erorilor pătratice."
,
  code: `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Line {
    long long m, c;
    long long eval(long long x) const {
        return m * x + c;
    }
};

bool is_redundant(Line l1, Line l2, Line l3) {
    return (l2.c - l1.c) * (l1.m - l3.m) >= (l3.c - l1.c) * (l1.m - l2.m);
}

class ConvexHullTrick {
private:
    vector<Line> hull;
public:
    void add_line(long long m, long long c) {
        Line l = {m, c};
        while (hull.size() >= 2 && is_redundant(hull[hull.size() - 2], hull.back(), l)) {
            hull.pop_back();
        }
        hull.push_back(l);
    }
    long long query(long long x) {
        if (hull.empty()) return 0;
        int left = 0, right = hull.size() - 1;
        long long best = hull[0].eval(x);
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long long val = hull[mid].eval(x);
            best = min(best, val);
            if (mid + 1 < hull.size() && hull[mid + 1].eval(x) < val) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return best;
    }
};

int main() {
    ConvexHullTrick cht;
    cht.add_line(4, 0);
    cht.add_line(3, 2);
    cht.add_line(2, 5);
    cht.add_line(1, 9);
    cht.add_line(0, 10);
    cout << "Query x=1: " << cht.query(1) << endl;
    cout << "Query x=2: " << cht.query(2) << endl;
    cout << "Query x=3: " << cht.query(3) << endl;
    cout << "Query x=4: " << cht.query(4) << endl;
    cout << "Query x=5: " << cht.query(5) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 54,
      "text": "Inițializăm structura Convex Hull Trick. Vectorul de drepte (învelișul convex) este gol.",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 55,
      "text": "Adăugăm prima linie: L1 (y = 4x + 0). Deque-ul devine: [4x + 0].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y = 4x + 0", "active": true }]]
        }
      ]
    },
    {
      "line": 60,
      "text": "Interogare la x = 1. Avem o singură linie în deque. eval(4x + 0) = 4.",
      "blocksVisual": [
        {
          "label": "Query x=1",
          "groups": [
            [{ "val": "y = 4x + 0" }],
            [{ "val": "Valoare = 4", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 56,
      "text": "Adăugăm L2 (y = 3x + 2). Deque-ul devine: [4x + 0, 3x + 2]. Nu avem suficiente linii pentru o eliminare.",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y = 4x + 0" }, { "val": "y = 3x + 2", "active": true }]]
        }
      ]
    },
    {
      "line": 60,
      "text": "Interogare la x = 1. Evaluăm ambele linii: L1(1) = 4, L2(1) = 5. Minimul este 4.",
      "blocksVisual": [
        {
          "label": "Query x=1",
          "groups": [
            [{ "val": "L1: 4", "active": true }, { "val": "L2: 5" }],
            [{ "val": "Minim = 4", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 61,
      "text": "Interogare la x = 2. Evaluăm: L1(2) = 8, L2(2) = 8. Minimul este 8.",
      "blocksVisual": [
        {
          "label": "Query x=2",
          "groups": [
            [{ "val": "L1: 8", "active": true }, { "val": "L2: 8", "active": true }],
            [{ "val": "Minim = 8", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 62,
      "text": "Interogare la x = 3. Evaluăm: L1(3) = 12, L2(3) = 11. Minimul este 11 (L2 devine mai bună decât L1).",
      "blocksVisual": [
        {
          "label": "Query x=3",
          "groups": [
            [{ "val": "L1: 12" }, { "val": "L2: 11", "active": true }],
            [{ "val": "Minim = 11", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 57,
      "text": "Adăugăm L3 (y = 2x + 5). Verificăm dacă L2 devine redundantă cu funcția is_redundant(L1, L2, L3).",
      "blocksVisual": [
        {
          "label": "Intersect",
          "groups": [[{ "val": "L1", "active": true }, { "val": "L2", "active": true }, { "val": "L3", "active": true }]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Intersecția L1 cu L2 e la x = 2. Intersecția L2 cu L3 e la x = 3. Deoarece 2 < 3, L2 este utilă. Păstrăm toate liniile: [4x + 0, 3x + 2, 2x + 5].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y = 4x + 0" }, { "val": "y = 3x + 2" }, { "val": "y = 2x + 5", "active": true }]]
        }
      ]
    },
    {
      "line": 56,
      "text": "Interogare la x = 4. Evaluăm: L1(4)=16, L2(4)=14, L3(4)=13. Minimul este L3(4) = 13.",
      "blocksVisual": [
        {
          "label": "Query x=4",
          "groups": [
            [{ "val": "L1: 16" }, { "val": "L2: 14" }, { "val": "L3: 13", "active": true }],
            [{ "val": "Minim = 13", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 51,
      "text": "Adăugăm L4 (y = 1x + 9). Verificăm dacă L3 este redundantă cu is_redundant(L2, L3, L4).",
      "blocksVisual": [
        {
          "label": "Intersect",
          "groups": [[{ "val": "L2", "active": true }, { "val": "L3", "active": true }, { "val": "L4", "active": true }]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Intersecția L2 cu L3 este la x = 3. Intersecția L3 cu L4 este la x = 4. Deoarece 3 < 4, L3 este salvată. Deque: [4x+0, 3x+2, 2x+5, x+9].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2" }, { "val": "y=2x+5" }, { "val": "y=x+9", "active": true }]]
        }
      ]
    },
    {
      "line": 57,
      "text": "Interogare la x = 5. Evaluăm liniile. L4(5) = 14 este minimul.",
      "blocksVisual": [
        {
          "label": "Query x=5",
          "groups": [
            [{ "val": "L2: 17" }, { "val": "L3: 15" }, { "val": "L4: 14", "active": true }],
            [{ "val": "Minim = 14", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 52,
      "text": "Adăugăm L5 (y = 0x + 10). Verificăm dacă L4 devine redundantă cu is_redundant(L3, L4, L5).",
      "blocksVisual": [
        {
          "label": "Intersect",
          "groups": [[{ "val": "L3", "active": true }, { "val": "L4", "active": true }, { "val": "L5", "active": true }]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Intersecția L3 cu L4 e la x = 4. Intersecția L4 cu L5 e la x = 1. Deoarece 1 < 4, L4 devine redundantă!",
      "blocksVisual": [
        {
          "label": "Redundancy",
          "groups": [[{ "val": "L4 este redundanta!", "active": true }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Eliminăm L4 din deque. Deque actual: [4x + 0, 3x + 2, 2x + 5]. Acum verificăm L3 cu is_redundant(L2, L3, L5).",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2" }, { "val": "y=2x+5", "active": true }]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Intersecția L2 cu L3 e la x = 3. Intersecția L3 cu L5 e la x = 2.5. Deoarece 2.5 < 3, L3 devine și ea redundantă!",
      "blocksVisual": [
        {
          "label": "Redundancy",
          "groups": [[{ "val": "L3 este redundanta!", "active": true }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Eliminăm L3 din deque. Deque actual: [4x + 0, 3x + 2]. Acum verificăm L2 cu is_redundant(L1, L2, L5).",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2", "active": true }]]
        }
      ]
    },
    {
      "line": 13,
      "text": "Intersecția L1 cu L2 e la x = 2. Intersecția L2 cu L5 e la x = 2.67. Deoarece 2.67 > 2, L2 este utilă! Salvăm L5. Deque: [4x+0, 3x+2, 10].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2" }, { "val": "y=10", "active": true }]]
        }
      ]
    },
    {
      "line": 54,
      "text": "Interogare la x = 2. Minimul este L1(2) = 8.",
      "blocksVisual": [
        {
          "label": "Query x=2",
          "groups": [
            [{ "val": "L1: 8", "active": true }, { "val": "L2: 8" }, { "val": "L5: 10" }],
            [{ "val": "Minim = 8", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 55,
      "text": "Interogare la x = 3. Minimul este L2(3) = 11.",
      "blocksVisual": [
        {
          "label": "Query x=3",
          "groups": [
            [{ "val": "L1: 12" }, { "val": "L2: 11", "active": true }, { "val": "L5: 10" }],
            [{ "val": "Minim = 11", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 56,
      "text": "Interogare la x = 4. Minimul este L5(4) = 10.",
      "blocksVisual": [
        {
          "label": "Query x=4",
          "groups": [
            [{ "val": "L1: 16" }, { "val": "L2: 14" }, { "val": "L5: 10", "active": true }],
            [{ "val": "Minim = 10", "sorted": true }]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Frog 3 (AtCoder DP)",
        "url": "https://atcoder.jp/contests/dp/tasks/dp_z",
        "desc": "Problema școală pentru învățat CHT."
      }
    ],
    "medium": [
      {
        "title": "Roata Infoarena",
        "url": "https://www.infoarena.ro/problema/roata",
        "desc": "Clasica din România."
      }
    ],
    "hard": [
      {
        "title": "Product of K subarrays",
        "url": "https://codeforces.com/problemset/problem/319/C",
        "desc": "CHT cu Li Chao Tree."
      }
    ]
  },
  "globalVars": [
  {
    "name": "hull",
    "type": "std::vector<Line>",
    "val": "Active lines in hull",
    "expandable": false
  }
]
,
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex === 0) ? 54 : 60 });

      // Check if we are inside add_line or query
      let inAddLine = false;
      let inQuery = false;

      // add_line steps: 1, 3, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19
      if ([1, 3, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19].includes(stepIndex)) {
        inAddLine = true;
      }
      // query steps: 2, 4, 5, 6, 10, 13, 20, 21, 22
      if ([2, 4, 5, 6, 10, 13, 20, 21, 22].includes(stepIndex)) {
        inQuery = true;
      }

      if (inAddLine) {
        frames.unshift({ name: "ConvexHullTrick::add_line(m, c)", file: "solution.cpp", line: activeLine });
        let m = 0, c = 0;
        if (stepIndex === 1) { m = 4; c = 0; }
        else if (stepIndex === 3) { m = 3; c = 2; }
        else if (stepIndex === 7 || stepIndex === 8 || stepIndex === 9) { m = 2; c = 5; }
        else if (stepIndex === 11 || stepIndex === 12) { m = 1; c = 9; }
        else if (stepIndex >= 14 && stepIndex <= 19) { m = 0; c = 10; }

        vars.push({ name: "m", type: "long long", val: m.toString(), expandable: false });
        vars.push({ name: "c", type: "long long", val: c.toString(), expandable: false });
        vars.push({ name: "l", type: "Line", val: `{m = ${m}, c = ${c}}`, expandable: false });
        inlineVal = `m: ${m}, c: ${c}`;
      }

      if (inQuery) {
        frames.unshift({ name: "ConvexHullTrick::query(x)", file: "solution.cpp", line: activeLine });
        let x = 1;
        if (stepIndex === 2 || stepIndex === 4) x = 1;
        else if (stepIndex === 5 || stepIndex === 20) x = 2;
        else if (stepIndex === 6 || stepIndex === 21) x = 3;
        else if (stepIndex === 10 || stepIndex === 22) x = 4;
        else if (stepIndex === 13) x = 5;

        vars.push({ name: "x", type: "long long", val: x.toString(), expandable: false });
        
        let best = 0;
        if (stepIndex === 2 || stepIndex === 4) best = 4;
        else if (stepIndex === 5 || stepIndex === 20) best = 8;
        else if (stepIndex === 6 || stepIndex === 21) best = 11;
        else if (stepIndex === 10) best = 13;
        else if (stepIndex === 13) best = 14;
        else if (stepIndex === 22) best = 10;

        vars.push({ name: "best", type: "long long", val: best.toString(), expandable: false });
        inlineVal = `x: ${x}, best: ${best}`;
      }

      // Add hull to globalVars or localVars
      let hullLines = [];
      if (stepIndex >= 1 && stepIndex <= 2) hullLines = ["y = 4x + 0"];
      else if (stepIndex >= 3 && stepIndex <= 6) hullLines = ["y = 4x + 0", "y = 3x + 2"];
      else if (stepIndex >= 7 && stepIndex <= 10) hullLines = ["y = 4x + 0", "y = 3x + 2", "y = 2x + 5"];
      else if (stepIndex >= 11 && stepIndex <= 13) hullLines = ["y = 4x + 0", "y = 3x + 2", "y = 2x + 5", "y = x + 9"];
      else if (stepIndex === 14 || stepIndex === 15) hullLines = ["y = 4x + 0", "y = 3x + 2", "y = 2x + 5", "y = x + 9"];
      else if (stepIndex === 16 || stepIndex === 17) hullLines = ["y = 4x + 0", "y = 3x + 2", "y = 2x + 5"];
      else if (stepIndex === 18 || stepIndex === 19) hullLines = ["y = 4x + 0", "y = 3x + 2"];
      else if (stepIndex >= 20) hullLines = ["y = 4x + 0", "y = 3x + 2", "y = 10"];

      globalVars.push({
        name: "hull",
        type: "std::vector<Line>",
        val: `{${hullLines.join(", ")}}`,
        expandable: false
      });

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let x = -1;
      if ([2, 4].includes(stepIndex)) x = 1;
      else if ([5, 20].includes(stepIndex)) x = 2;
      else if ([6, 21].includes(stepIndex)) x = 3;
      else if ([10, 22].includes(stepIndex)) x = 4;
      else if (stepIndex === 13) x = 5;

      if (x !== -1 && (lineNum === 35 || lineNum === 38 || lineNum === 41 || lineNum === 42 || lineNum === 49)) {
        return `x: ${x}`;
      }

      let m = -1, c = -1;
      if (stepIndex === 1) { m = 4; c = 0; }
      else if (stepIndex === 3) { m = 3; c = 2; }
      else if ([7, 8, 9].includes(stepIndex)) { m = 2; c = 5; }
      else if ([11, 12].includes(stepIndex)) { m = 1; c = 9; }
      else if (stepIndex >= 14 && stepIndex <= 19) { m = 0; c = 10; }

      if (m !== -1 && (lineNum === 28 || lineNum === 29 || lineNum === 30 || lineNum === 33)) {
        return `m: ${m}, c: ${c}`;
      }
      return null;
    }
  }
};
