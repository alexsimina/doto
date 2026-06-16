export const data = {
  "presentation": "### Prezentare Generală\n\nConvex Hull Trick (CHT) este o tehnică de optimizare avansată pentru relațiile de recurență DP ce au formă liniară sau de min/max de ecuații de drepte.\n\nCând o tranziție de DP arată ca: dp[i] = min(dp[j] + M[j] * X[i] + C), observăm că pentru fiecare j, (dp[j] + M[j] * x + C) definește o **linie** sub forma y = mx + c.\nÎn loc să verificăm toate nodurile j anterioare în timp O(N) la fiecare pas i, CHT menține învelișul inferior (lower envelope) al acestor linii și răspunde în timp O(log N) sau chiar O(1).\n\nAcest lucru optimizează o formulă DP globală O(N^2) în O(N log N) sau O(N).",
  "complexity": "### Complexitate\n\n- **Timp:** Reduce o etapă O(N) la O(1) amotizat dacă X[i] e monoton, sau O(log N) dacă nu e. Per total: de la O(N^2) la O(N log N) / O(N).\n- **Spațiu:** O(N) pentru stocarea structurii CHT.\n",
  "variations": "### Variații și Edge Cases\n\n1. Li Chao Tree - O structură de date care face același lucru dar suportă inserții de segmente (nu doar drepte), mai ușor de implementat pentru query-uri nestructurate.\n2. Divide & Conquer Optimization - O altă optimizare care se folosește când funcția de cost are anumite proprietăți (monotonie a punctului de minim).",
  "applications": "### Aplicații\n\nOrice problemă în care un cost este proporțional cu un produs de 2 factori și alegi dintr-o serie de soluții anterioare (ex: împartirea unui șir de elemente în bucăți continue pentru a minimiza suma pătratelor, costuri de transport etc.)",

  code: `
// Pseudocod / Abordare structurală pentru CHT (Convex Hull Trick)
// Deoarece implementarea completa e masiva, prezentam ideea CHT.
#include <iostream>
#include <vector>
using namespace std;

// Reprezentam o linie y = m*x + c
struct Line {
    long long m, c;
    long long eval(long long x) { return m * x + c; }
};

// Functie care verifica daca l3 face ca l2 sa devina irelevanta
bool intersect(Line l1, Line l2, Line l3) {
    // Returneaza true daca intersectia lui l1 cu l3 este 
    // la "stanga" intersectiei lui l1 cu l2, facand l2 inutila.
    return (l2.c - l1.c) * (l1.m - l3.m) >= (l3.c - l1.c) * (l1.m - l2.m);
}

int main() {
    cout << "Convex Hull Trick e o optimizare geometrica la o formula recurenta DP!" << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
      "text": "Inițializăm structura CHT (deque-ul de drepte este gol).",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Adăugăm prima linie: L1 (y = 4x + 0). Deque-ul devine: [4x + 0].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y = 4x + 0", "active": true }]]
        }
      ]
    },
    {
      "line": 10,
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
      "line": 14,
      "text": "Adăugăm L2 (y = 3x + 2). Deque-ul devine: [4x + 0, 3x + 2]. Nu avem suficiente linii pentru o eliminare.",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y = 4x + 0" }, { "val": "y = 3x + 2", "active": true }]]
        }
      ]
    },
    {
      "line": 10,
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
      "line": 10,
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
      "line": 10,
      "text": "Interogare la x = 3. Evaluăm: L1(3) = 12, L2(3) = 11. Minimul este 11 (L2 devine mai bună).",
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
      "line": 14,
      "text": "Adăugăm L3 (y = 2x + 5). Verificăm dacă L2 devine redundantă cu intersect(L1, L2, L3).",
      "blocksVisual": [
        {
          "label": "Intersect",
          "groups": [[{ "val": "L1", "active": true }, { "val": "L2", "active": true }, { "val": "L3", "active": true }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intersecția L1 cu L2 e la x = 2. Intersecția L2 cu L3 e la x = 3. Deoarece 2 < 3, L2 este utilă. Păstrăm toate liniile: [4x + 0, 3x + 2, 2x + 5].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y = 4x + 0" }, { "val": "y = 3x + 2" }, { "val": "y = 2x + 5", "active": true }]]
        }
      ]
    },
    {
      "line": 10,
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
      "line": 14,
      "text": "Adăugăm L4 (y = 1x + 9). Verificăm dacă L3 este redundantă cu intersect(L2, L3, L4).",
      "blocksVisual": [
        {
          "label": "Intersect",
          "groups": [[{ "val": "L2", "active": true }, { "val": "L3", "active": true }, { "val": "L4", "active": true }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intersecția L2 cu L3 este la x = 3. Intersecția L3 cu L4 este la x = 4. Deoarece 3 < 4, L3 este salvată. Deque: [4x+0, 3x+2, 2x+5, x+9].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2" }, { "val": "y=2x+5" }, { "val": "y=x+9", "active": true }]]
        }
      ]
    },
    {
      "line": 10,
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
      "line": 14,
      "text": "Adăugăm L5 (y = 0x + 10). Verificăm dacă L4 devine redundantă cu intersect(L3, L4, L5).",
      "blocksVisual": [
        {
          "label": "Intersect",
          "groups": [[{ "val": "L3", "active": true }, { "val": "L4", "active": true }, { "val": "L5", "active": true }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intersecția L3 cu L4 e la x = 4. Intersecția L4 cu L5 e la x = 1. Deoarece 1 < 4, L4 devine redundantă!",
      "blocksVisual": [
        {
          "label": "Redundancy",
          "groups": [[{ "val": "L4 este redundanta!", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Eliminăm L4 din deque. Deque actual: [4x + 0, 3x + 2, 2x + 5]. Acum verificăm L3 cu intersect(L2, L3, L5).",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2" }, { "val": "y=2x+5", "active": true }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intersecția L2 cu L3 e la x = 3. Intersecția L3 cu L5 e la x = 2.5. Deoarece 2.5 < 3, L3 devine și ea redundantă!",
      "blocksVisual": [
        {
          "label": "Redundancy",
          "groups": [[{ "val": "L3 este redundanta!", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Eliminăm L3 din deque. Deque actual: [4x + 0, 3x + 2]. Acum verificăm L2 cu intersect(L1, L2, L5).",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2", "active": true }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intersecția L1 cu L2 e la x = 2. Intersecția L2 cu L5 e la x = 2.67. 2.67 > 2, deci L2 este utilă! Salvăm L5. Deque: [4x+0, 3x+2, 10].",
      "blocksVisual": [
        {
          "label": "Deque CHT",
          "groups": [[{ "val": "y=4x" }, { "val": "y=3x+2" }, { "val": "y=10", "active": true }]]
        }
      ]
    },
    {
      "line": 10,
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
      "line": 10,
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
      "line": 21,
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
  }
};
