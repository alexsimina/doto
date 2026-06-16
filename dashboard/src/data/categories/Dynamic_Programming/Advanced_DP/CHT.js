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

// ... Urmeaza o structura Deque care gestioneaza liniile.
// Query evalueaza linia optima.

int main() {
    cout << "Convex Hull Trick e o optimizare geometrica la o formula recurenta DP!
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
      "text": "O ecuație DP devine o linie în planul 2D.",
      "blocksVisual": [
        {
          "label": "Linie",
          "groups": [
            [
              {
                "val": "y = m*x + c",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Nucleul matematic al CHT: Când inserăm o linie nouă (L3), verificăm dacă acoperă complet o altă linie (L2) preexistentă.",
      "blocksVisual": [
        {
          "label": "Intersecție",
          "groups": [
            [
              {
                "val": "Verifică Puncte"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Folosind inegalități pe rapoarte (adică pante și intersecții cu Y), ștergem L2 dacă nu va mai fi niciodată optimă.",
      "blocksVisual": [
        {
          "label": "Pop L2",
          "groups": [
            [
              {
                "val": "L2 Redundantă!",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Datorită acestei gestiuni cu un Deque, avem direct acces la linia optimă la un X dat.",
      "blocksVisual": [
        {
          "label": "Deque",
          "groups": [
            [
              {
                "val": "Optim la X",
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
