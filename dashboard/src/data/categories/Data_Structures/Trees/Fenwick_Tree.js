export const data = {
  "presentation": "### Prezentare Generală\n\n**Arborele Indexat Binar (AIB)**, cunoscut internațional sub numele de **Fenwick Tree**, este o structură de date extrem de eficientă care permite efectuarea de actualizări punctuale și interogări de sumă pe prefix în timp logaritmic.\n\nSpre deosebire de un arbore segmentat clasic, Fenwick Tree nu utilizează noduri sau pointeri, ci stochează toate informațiile într-un singur vector de dimensiune $N+1$, folosind proprietățile reprezentării în baza 2 a indicilor. Ideea centrală este că fiecare index $x$ din structură stochează suma elementelor dintr-un interval a cărui lungime este egală cu cel mai puțin semnificativ bit setat din reprezentarea binară a lui $x$:\n$$\\text{LSB}(x) = x \\ \\& \\ (-x)$$\n\nAcest fapt permite deplasarea rapidă între nodul părinte și fii prin operații simple pe biți.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - Actualizare punctuală (Update): $O(\\log N)$.\n  - Interogare prefix (Query): $O(\\log N)$.\n  - Reconstruire / Construcție: $O(N)$ sau $O(N \\log N)$.\n  - Constanta de timp este extrem de mică, fiind considerabil mai rapid în practică decât un Arbore de Intervale.\n- **Spațiu:** $O(N)$ memorie auxiliară, utilizând exact un singur vector suplimentar de dimensiune $N+1$.",
  "variations": "### Variații și Edge Cases\n\n1. **Range Update - Point Query:** Adunarea unei valori pe un interval $[L, R]$ și interogarea valorii dintr-un punct. Se folosește ideea de vector de diferențe direct peste Fenwick Tree.\n2. **Range Update - Range Query:** Adunarea pe $[L, R]$ și interogarea sumei pe $[L, R]$. Necesită utilizarea a două Fenwick Trees independente pentru a urmări modificările liniare.\n3. **Arbore Indexat Binar 2D:** Extinderea structurii pentru matrice. Actualizările și interogările se efectuează în $O(\\log N \\cdot \\log M)$.",
  "applications": "### Aplicații\n\nFenwick Tree este standardul absolut pentru rezolvarea Inversiunilor într-un array (Inversion Count). Folosit și la query-uri pe frecvențe dinamice (de exemplu calcularea medianei într-un flux de date curent).",
  "code": "\n#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nstruct FenwickTree {\n    vector<int> tree;\n    int n;\n\n    FenwickTree(int n) {\n        this->n = n;\n        tree.assign(n + 1, 0); \n    }\n\n    int LSB(int x) {\n        return x & (-x);\n    }\n\n    void update(int index, int delta) {\n        while (index <= n) {\n            tree[index] += delta;\n            index += LSB(index); \n        }\n    }\n\n    int query(int index) {\n        int sum = 0;\n        while (index > 0) {\n            sum += tree[index];\n            index -= LSB(index); \n        }\n        return sum;\n    }\n    \n    int queryRange(int left, int right) {\n        return query(right) - query(left - 1);\n    }\n};\n\nint main() {\n    FenwickTree aib(10);\n    \n    aib.update(3, 5); \n    aib.update(5, 2); \n    aib.update(6, 1); \n    aib.update(1, 4); \n    \n    cout << \"Suma de pe [1, 6] = \" << aib.query(6) << \"\\n\"; \n    cout << \"Suma de pe [3, 6] = \" << aib.queryRange(3, 6) << \"\\n\"; \n    return 0;\n}\n",
  "explanations": [
    {
      "line": 41,
      "text": "Inițializăm structura Fenwick Tree (AIB). Avem un vector `tree` de dimensiune N+1 = 11, indexat de la 1, plin de 0. Relațiile de dependență sunt ilustrate în graf.",
      "blocksVisual": [
        {
          "label": "Inițializare AIB",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 0",
                "active": false
              },
              {
                "val": "tree[4]: 0",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 0",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 43,
      "text": "Pasul 1: update(3, 5). Pornim de la indexul 3.",
      "blocksVisual": [
        {
          "label": "update(3, 5) - start",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 0",
                "active": true
              },
              {
                "val": "tree[4]: 0",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 0",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 3"
              },
              {
                "val": "delta = 5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "active"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 5 în tree[3]: din 0 devine 5.",
      "blocksVisual": [
        {
          "label": "tree[3] += 5",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": true
              },
              {
                "val": "tree[4]: 0",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 0",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 3"
              },
              {
                "val": "delta = 5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "active"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(3) = 1. index devine 3 + 1 = 4.",
      "blocksVisual": [
        {
          "label": "index += LSB(3)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 0",
                "active": true
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 0",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 4"
              },
              {
                "val": "delta = 5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": true
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 5 în tree[4]: din 0 devine 5.",
      "blocksVisual": [
        {
          "label": "tree[4] += 5",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": true
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 0",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 4"
              },
              {
                "val": "delta = 5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(4) = 4. index devine 4 + 4 = 8.",
      "blocksVisual": [
        {
          "label": "index += LSB(4)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 0",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": true
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 5 în tree[8]: din 0 devine 5.",
      "blocksVisual": [
        {
          "label": "tree[8] += 5",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 5"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(8) = 8. index devine 8 + 8 = 16 (depășește dimensiunea N=10, deci ne oprim).",
      "blocksVisual": [
        {
          "label": "index += LSB(8)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 44,
      "text": "Pasul 2: update(5, 2). Pornim de la indexul 5.",
      "blocksVisual": [
        {
          "label": "update(5, 2) - start",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 0",
                "active": true
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 5"
              },
              {
                "val": "delta = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "active"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 2 în tree[5]: din 0 devine 2.",
      "blocksVisual": [
        {
          "label": "tree[5] += 2",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": true
              },
              {
                "val": "tree[6]: 0",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 5"
              },
              {
                "val": "delta = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "active"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(5) = 1. index devine 5 + 1 = 6.",
      "blocksVisual": [
        {
          "label": "index += LSB(5)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 0",
                "active": true
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 6"
              },
              {
                "val": "delta = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "active"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": true
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 2 în tree[6]: din 0 devine 2.",
      "blocksVisual": [
        {
          "label": "tree[6] += 2",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 2",
                "active": true
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 6"
              },
              {
                "val": "delta = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "active"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(6) = 2. index devine 6 + 2 = 8.",
      "blocksVisual": [
        {
          "label": "index += LSB(6)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 2",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 5",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": true
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 2 în tree[8]: din 5 devine 7.",
      "blocksVisual": [
        {
          "label": "tree[8] += 2",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 2",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 7",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 2"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(8) = 8. index devine 8 + 8 = 16 (depășește dimensiunea N=10, deci ne oprim).",
      "blocksVisual": [
        {
          "label": "index += LSB(8)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 2",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 7",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 45,
      "text": "Pasul 3: update(6, 1). Pornim de la indexul 6.",
      "blocksVisual": [
        {
          "label": "update(6, 1) - start",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 2",
                "active": true
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 7",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 6"
              },
              {
                "val": "delta = 1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "active"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 1 în tree[6]: din 2 devine 3.",
      "blocksVisual": [
        {
          "label": "tree[6] += 1",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": true
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 7",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 6"
              },
              {
                "val": "delta = 1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "active"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(6) = 2. index devine 6 + 2 = 8.",
      "blocksVisual": [
        {
          "label": "index += LSB(6)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 7",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": true
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 1 în tree[8]: din 7 devine 8.",
      "blocksVisual": [
        {
          "label": "tree[8] += 1",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 1"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(8) = 8. index devine 8 + 8 = 16 (depășește dimensiunea N=10, deci ne oprim).",
      "blocksVisual": [
        {
          "label": "index += LSB(8)",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 46,
      "text": "Pasul 4: update(1, 4). Pornim de la indexul 1.",
      "blocksVisual": [
        {
          "label": "update(1, 4) - start",
          "groups": [
            [
              {
                "val": "tree[1]: 0",
                "active": true
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 1"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 4 în tree[1]: din 0 devine 4.",
      "blocksVisual": [
        {
          "label": "tree[1] += 4",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": true
              },
              {
                "val": "tree[2]: 0",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 1"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(1) = 1. index devine 1 + 1 = 2.",
      "blocksVisual": [
        {
          "label": "index += LSB(1)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 0",
                "active": true
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 2"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": true
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 4 în tree[2]: din 0 devine 4.",
      "blocksVisual": [
        {
          "label": "tree[2] += 4",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": true
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 2"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(2) = 2. index devine 2 + 2 = 4.",
      "blocksVisual": [
        {
          "label": "index += LSB(2)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 5",
                "active": true
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 4"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": true
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 4 în tree[4]: din 5 devine 9.",
      "blocksVisual": [
        {
          "label": "tree[4] += 4",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": true
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 4"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(4) = 4. index devine 4 + 4 = 8.",
      "blocksVisual": [
        {
          "label": "index += LSB(4)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 8",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": true
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Adunăm delta = 4 în tree[8]: din 8 devine 12.",
      "blocksVisual": [
        {
          "label": "tree[8] += 4",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": true
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 8"
              },
              {
                "val": "delta = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "active"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 22,
      "text": "Urcăm la superior: LSB(8) = 8. index devine 8 + 8 = 16 (depășește dimensiunea N=10, deci ne oprim).",
      "blocksVisual": [
        {
          "label": "index += LSB(8)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "visited"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "visited"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 48,
      "text": "Calculăm suma pe prefix [1..6] cu query(6). Pornim de la index 6 cu sum = 0.",
      "blocksVisual": [
        {
          "label": "query(6) - start",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": true
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 6"
              },
              {
                "val": "sum = 0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "active"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Adunăm valoarea din tree[6] (care este 3) la sumă. sum devine 3.",
      "blocksVisual": [
        {
          "label": "sum += tree[6]",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": true
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 6"
              },
              {
                "val": "sum = 3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "active"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Coborâm spre 0: LSB(6) = 2. index devine 6 - 2 = 4.",
      "blocksVisual": [
        {
          "label": "index -= LSB(6)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": true
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 4"
              },
              {
                "val": "sum = 3"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Adunăm valoarea din tree[4] (care este 9) la sumă. sum devine 12.",
      "blocksVisual": [
        {
          "label": "sum += tree[4]",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": true
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 4"
              },
              {
                "val": "sum = 12"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "active"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Coborâm spre 0: LSB(4) = 4. index devine 4 - 4 = 0.",
      "blocksVisual": [
        {
          "label": "index -= LSB(4)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 0"
              },
              {
                "val": "sum = 12"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "visited"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Calculăm suma pe intervalul [3, 6] folosind queryRange(3, 6) = query(6) - query(2).",
      "blocksVisual": [
        {
          "label": "queryRange(3, 6)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "sum = query(6) - query(2)"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Calculăm query(2) pentru a scădea prefixul [1..2]. Pornim de la index 2.",
      "blocksVisual": [
        {
          "label": "query(2) - start",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": true
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 2"
              },
              {
                "val": "sum = 0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "Adunăm tree[2] = 4 la sub-sumă. subSum devine 4.",
      "blocksVisual": [
        {
          "label": "subSum += tree[2]",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": true
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 2"
              },
              {
                "val": "sum = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Coborâm: LSB(2) = 2. index devine 2 - 2 = 0.",
      "blocksVisual": [
        {
          "label": "index -= LSB(2)",
          "groups": [
            [
              {
                "val": "tree[1]: 4",
                "active": false
              },
              {
                "val": "tree[2]: 4",
                "active": false
              },
              {
                "val": "tree[3]: 5",
                "active": false
              },
              {
                "val": "tree[4]: 9",
                "active": false
              },
              {
                "val": "tree[5]: 2",
                "active": false
              },
              {
                "val": "tree[6]: 3",
                "active": false
              },
              {
                "val": "tree[7]: 0",
                "active": false
              },
              {
                "val": "tree[8]: 12",
                "active": false
              },
              {
                "val": "tree[9]: 0",
                "active": false
              },
              {
                "val": "tree[10]: 0",
                "active": false
              }
            ],
            [
              {
                "val": "index = 0"
              },
              {
                "val": "sum = 4"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "visited"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    },
    {
      "line": 36,
      "text": "Finalizăm queryRange(3, 6): query(6) - query(2) = 12 - 4 = 8.",
      "blocksVisual": [
        {
          "label": "Rezultat Final",
          "groups": [
            [
              {
                "val": "Suma pe [3, 6] = 8",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "1",
            "x": 50,
            "y": 230,
            "state": "normal"
          },
          {
            "id": "2",
            "label": "2",
            "x": 50,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "3",
            "label": "3",
            "x": 110,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "4",
            "label": "4",
            "x": 80,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "5",
            "label": "5",
            "x": 180,
            "y": 170,
            "state": "normal"
          },
          {
            "id": "6",
            "label": "6",
            "x": 180,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "7",
            "label": "7",
            "x": 280,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "8",
            "label": "8",
            "x": 180,
            "y": 50,
            "state": "normal"
          },
          {
            "id": "9",
            "label": "9",
            "x": 380,
            "y": 110,
            "state": "normal"
          },
          {
            "id": "10",
            "label": "10",
            "x": 380,
            "y": 50,
            "state": "normal"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2",
            "active": false
          },
          {
            "source": "2",
            "target": "4",
            "active": false
          },
          {
            "source": "3",
            "target": "4",
            "active": false
          },
          {
            "source": "4",
            "target": "8",
            "active": false
          },
          {
            "source": "5",
            "target": "6",
            "active": false
          },
          {
            "source": "6",
            "target": "8",
            "active": false
          },
          {
            "source": "7",
            "target": "8",
            "active": false
          },
          {
            "source": "9",
            "target": "10",
            "active": false
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Fenwick Tree (AIB) Infoarena",
        "url": "https://www.infoarena.ro/problema/aib",
        "desc": "Implementare clasica"
      }
    ],
    "medium": [
      {
        "title": "Inversion Count",
        "url": "https://www.spoj.com/problems/INVCNT/",
        "desc": "Numărarea inversiunilor într-un vector folosind AIB"
      }
    ],
    "hard": [
      {
        "title": "2D Range Sum Query",
        "url": "https://leetcode.com/problems/range-sum-query-2d-mutable/",
        "desc": "AIB bidimensional pentru sume pe submatrice"
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { tree: [0,0,0,0,0,0,0,0,0,0,0], stack: [] },
        { tree: [0,0,0,0,0,0,0,0,0,0,0], stack: ["update(3, 5)"] },
        { tree: [0,0,0,5,0,0,0,0,0,0,0], stack: ["update(3, 5)"], index: 3, delta: 5 },
        { tree: [0,0,0,5,0,0,0,0,0,0,0], stack: ["update(3, 5)"], index: 4, delta: 5 },
        { tree: [0,0,0,5,5,0,0,0,0,0,0], stack: ["update(3, 5)"], index: 4, delta: 5 },
        { tree: [0,0,0,5,5,0,0,0,0,0,0], stack: ["update(3, 5)"], index: 8, delta: 5 },
        { tree: [0,0,0,5,5,0,0,0,5,0,0], stack: ["update(3, 5)"], index: 8, delta: 5 },
        { tree: [0,0,0,5,5,0,0,0,5,0,0], stack: ["update(3, 5)"], index: 16, delta: 5 },
        { tree: [0,0,0,5,5,0,0,0,5,0,0], stack: ["update(5, 2)"] },
        { tree: [0,0,0,5,5,2,0,0,5,0,0], stack: ["update(5, 2)"], index: 5, delta: 2 },
        { tree: [0,0,0,5,5,2,0,0,5,0,0], stack: ["update(5, 2)"], index: 6, delta: 2 },
        { tree: [0,0,0,5,5,2,2,0,5,0,0], stack: ["update(5, 2)"], index: 6, delta: 2 },
        { tree: [0,0,0,5,5,2,2,0,5,0,0], stack: ["update(5, 2)"], index: 8, delta: 2 },
        { tree: [0,0,0,5,5,2,2,0,7,0,0], stack: ["update(5, 2)"], index: 8, delta: 2 },
        { tree: [0,0,0,5,5,2,2,0,7,0,0], stack: ["update(5, 2)"], index: 16, delta: 2 },
        { tree: [0,0,0,5,5,2,2,0,7,0,0], stack: ["update(6, 1)"] },
        { tree: [0,0,0,5,5,2,3,0,7,0,0], stack: ["update(6, 1)"], index: 6, delta: 1 },
        { tree: [0,0,0,5,5,2,3,0,7,0,0], stack: ["update(6, 1)"], index: 8, delta: 1 },
        { tree: [0,0,0,5,5,2,3,0,8,0,0], stack: ["update(6, 1)"], index: 8, delta: 1 },
        { tree: [0,0,0,5,5,2,3,0,8,0,0], stack: ["update(6, 1)"], index: 16, delta: 1 },
        { tree: [0,0,0,5,5,2,3,0,8,0,0], stack: ["update(1, 4)"] },
        { tree: [0,4,0,5,5,2,3,0,8,0,0], stack: ["update(1, 4)"], index: 1, delta: 4 },
        { tree: [0,4,0,5,5,2,3,0,8,0,0], stack: ["update(1, 4)"], index: 2, delta: 4 },
        { tree: [0,4,4,5,5,2,3,0,8,0,0], stack: ["update(1, 4)"], index: 2, delta: 4 },
        { tree: [0,4,4,5,5,2,3,0,8,0,0], stack: ["update(1, 4)"], index: 4, delta: 4 },
        { tree: [0,4,4,5,9,2,3,0,8,0,0], stack: ["update(1, 4)"], index: 4, delta: 4 },
        { tree: [0,4,4,5,9,2,3,0,8,0,0], stack: ["update(1, 4)"], index: 8, delta: 4 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["update(1, 4)"], index: 8, delta: 4 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["update(1, 4)"], index: 16, delta: 4 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(6)"] },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(6)"], index: 6, sum: 3 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(6)"], index: 4, sum: 3 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(6)"], index: 4, sum: 12 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(6)"], index: 0, sum: 12 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["queryRange(3, 6)"] },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["queryRange(3, 6)"], left: 3, right: 6 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(2)", "queryRange(3, 6)"], index: 2, sum: 4 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["query(2)", "queryRange(3, 6)"], index: 0, sum: 4 },
        { tree: [0,4,4,5,9,2,3,0,12,0,0], stack: ["queryRange(3, 6)"], left: 3, right: 6 }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      curr.stack.forEach(frameName => {
        frames.push({ name: frameName, file: "solution.cpp", line: activeLine });
      });
      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 28) ? (41 + Math.floor(stepIndex / 7)) : (stepIndex <= 33 ? 48 : 49) });

      const treeStr = "{" + curr.tree.join(", ") + "}";
      globalVars.push({ name: "aib.tree", type: "std::vector<int>", val: treeStr, expandable: true });
      globalVars.push({ name: "aib.n", type: "int", val: "10", expandable: false });

      if (curr.index !== undefined) {
        vars.push({ name: "index", type: "int", val: curr.index.toString(), expandable: false });
      }
      if (curr.delta !== undefined) {
        vars.push({ name: "delta", type: "int", val: curr.delta.toString(), expandable: false });
      }
      if (curr.sum !== undefined) {
        vars.push({ name: "sum", type: "int", val: curr.sum.toString(), expandable: false });
      }
      if (curr.left !== undefined) {
        vars.push({ name: "left", type: "int", val: curr.left.toString(), expandable: false });
      }
      if (curr.right !== undefined) {
        vars.push({ name: "right", type: "int", val: curr.right.toString(), expandable: false });
      }

      let inlineVal = "tree: " + treeStr;
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { index: -1 }, { index: 3, delta: 5 }, { index: 3, delta: 5 }, { index: 4, delta: 5 }, { index: 4, delta: 5 },
        { index: 8, delta: 5 }, { index: 8, delta: 5 }, { index: 16, delta: 5 }, { index: -1 }, { index: 5, delta: 2 },
        { index: 6, delta: 2 }, { index: 6, delta: 2 }, { index: 8, delta: 2 }, { index: 8, delta: 2 }, { index: 16, delta: 2 },
        { index: -1 }, { index: 6, delta: 1 }, { index: 8, delta: 1 }, { index: 8, delta: 1 }, { index: 16, delta: 1 },
        { index: -1 }, { index: 1, delta: 4 }, { index: 2, delta: 4 }, { index: 2, delta: 4 }, { index: 4, delta: 4 },
        { index: 4, delta: 4 }, { index: 8, delta: 4 }, { index: 8, delta: 4 }, { index: 16, delta: 4 }, { index: -1 },
        { index: 6, sum: 3 }, { index: 4, sum: 3 }, { index: 4, sum: 12 }, { index: 0, sum: 12 }, { index: -1 },
        { left: 3, right: 6 }, { index: 2, sum: 4 }, { index: 0, sum: 4 }, { left: 3, right: 6 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum === 21 || lineNum === 22 || lineNum === 29 || lineNum === 30) {
        let res = "";
        if (curr.index !== undefined) res += "index: " + curr.index;
        if (curr.delta !== undefined) res += ", delta: " + curr.delta;
        if (curr.sum !== undefined) res += ", sum: " + curr.sum;
        return res || null;
      }
      return null;
    }
  }
};
