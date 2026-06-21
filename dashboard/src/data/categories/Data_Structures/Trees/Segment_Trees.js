export const data = {
  "presentation": "### Prezentare Generală\n\n**Arborii de Intervale (Segment Trees)** sunt printre cele mai versatile și puternice structuri de date în informatică. Aceștia permit efectuarea rapidă a actualizărilor și interogărilor pe intervale în timp logaritmic, susținând o gamă largă de operații (sumă, minim, maxim, GCD, etc.).\n\nFiecare nod din arbore corespunde unui interval $[start, end]$ din vector. Structura se bazează pe paradigma **Divide et Impera**:\n- Rădăcina arborelui reprezintă întregul interval $[0, N - 1]$.\n- Dacă un nod reprezintă intervalul $[start, end]$, atunci fiul său stâng reprezintă jumătatea stângă $[start, mid]$, iar fiul său drept reprezintă jumătatea dreaptă $[mid + 1, end]$, unde $mid = \\lfloor \\frac{start + end}{2} \\rfloor$.\n- Frunzele corespund elementelor individuale ale vectorului, unde $start = end$.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - Construcție (Build): $O(N)$.\n  - Interogare pe interval (Query): $O(\\log N)$.\n  - Actualizare punctuală (Update): $O(\\log N)$.\n- **Spațiu:** $O(N)$ deoarece numărul total de noduri într-un arbore binar complet de dimensiune $N$ este limitat superior de $4 \\cdot N$.",
  "variations": "### Variații și Edge Cases\n\n1. **Lazy Propagation (Actualizare Leneșă):** Permite actualizarea unui întreg interval (de exemplu, adunarea unei valori pe $[L, R]$) în timp de $O(\\log N)$. Modificările sunt stocate în mod \"leneș\" la nivelul nodurilor superioare și sunt propagate descendent către fii doar atunci când nodurile respective sunt vizitate într-o operație ulterioară.\n2. **Arbori de Intervale Persistenți:** Permite păstrarea istoricului tuturor versiunilor arborelui după fiecare actualizare. O actualizare creează doar $O(\\log N)$ noduri noi, reutilizând restul arborelui prin legături.",
  "applications": "### Aplicații\n\nSunt esențiali în Computational Geometry (ex: aflarea dreptunghiurilor intersectate), menținerea statisticilor de scoruri, sau rezolvarea jocurilor 2D în platformere unde se simulează coliziuni.",
  "code": "\n#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nstruct SegTree {\n    int n;\n    vector<int> tree;\n\n    SegTree(const vector<int>& arr) {\n        n = arr.size();\n        tree.resize(4 * n);\n        build(arr, 1, 0, n - 1);\n    }\n\n    void build(const vector<int>& arr, int node, int start, int end) {\n        if (start == end) {\n            tree[node] = arr[start]; \n        } else {\n            int mid = (start + end) / 2;\n            int leftChild = 2 * node;\n            int rightChild = 2 * node + 1;\n            \n            build(arr, leftChild, start, mid);\n            build(arr, rightChild, mid + 1, end);\n            \n            tree[node] = tree[leftChild] + tree[rightChild];\n        }\n    }\n\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) {\n            tree[node] += val;\n        } else {\n            int mid = (start + end) / 2;\n            if (start <= idx && idx <= mid) {\n                update(2 * node, start, mid, idx, val);\n            } else {\n                update(2 * node + 1, mid + 1, end, idx, val);\n            }\n            tree[node] = tree[2 * node] + tree[2 * node + 1];\n        }\n    }\n\n    int query(int node, int start, int end, int L, int R) {\n        if (R < start || end < L) return 0; \n        if (L <= start && end <= R) return tree[node]; \n        \n        int mid = (start + end) / 2;\n        int p1 = query(2 * node, start, mid, L, R);\n        int p2 = query(2 * node + 1, mid + 1, end, L, R);\n        return p1 + p2;\n    }\n};\n\nint main() {\n    vector<int> arr = {1, 3, 5, 7, 9, 11};\n    SegTree st(arr);\n    \n    cout << \"Suma pe [1, 3] = \" << st.query(1, 0, 5, 1, 3) << \"\\n\"; \n    st.update(1, 0, 5, 1, 10); \n    cout << \"Suma pe [1, 3] dupa udp = \" << st.query(1, 0, 5, 1, 3) << \"\\n\"; \n    return 0;\n}\n",
  "explanations": [
  {
    "line": 58,
    "text": "Pornim construcția Segment Tree pentru tabloul arr = {1, 3, 5, 7, 9, 11}. tree[1] corespunde rădăcinii și acoperă intervalul [0..5].",
    "blocksVisual": [
      {
        "label": "Vector",
        "groups": [
          [
            {
              "val": "1"
            },
            {
              "val": "3"
            },
            {
              "val": "5"
            },
            {
              "val": "7"
            },
            {
              "val": "9"
            },
            {
              "val": "11"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "active": true
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "?",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "?",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "?",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "?",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 24,
    "text": "Apelăm recursiv build pe copilul stâng, nodul 2, care acoperă jumătatea [0..2].",
    "blocksVisual": [
      {
        "label": "Nod curent",
        "groups": [
          [
            {
              "val": "Nod 2: [0..2]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "active": true
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "?",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "?",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "?",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "?",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2",
          "active": true
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 24,
    "text": "Nodul 2 acoperă [0..2]. Copilul său stâng este nodul 4 care acoperă [0..1].",
    "blocksVisual": [
      {
        "label": "Nod curent",
        "groups": [
          [
            {
              "val": "Nod 4: [0..1]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "?",
          "desc": "[0..1]",
          "x": 60,
          "y": 190,
          "active": true
        },
        {
          "id": "5",
          "label": "?",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "?",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "?",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4",
          "active": true
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 18,
    "text": "Nodul 4 acoperă [0..1]. Copilul său stâng este nodul 8, care fiind frunză ([0..0]), primește direct valoarea arr[0] = 1.",
    "blocksVisual": [
      {
        "label": "Frunză",
        "groups": [
          [
            {
              "val": "tree[8] = arr[0] = 1"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "?",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "?",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260,
          "active": true
        },
        {
          "id": "9",
          "label": "?",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8",
          "active": true
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 18,
    "text": "Copilul drept al nodului 4 este nodul 9. Fiind frunză ([1..1]), primește direct valoarea arr[1] = 3.",
    "blocksVisual": [
      {
        "label": "Frunză",
        "groups": [
          [
            {
              "val": "tree[9] = arr[1] = 3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "?",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "?",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260,
          "active": true
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9",
          "active": true
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 27,
    "text": "Calculăm valoarea nodului 4 ca suma copiilor săi: tree[4] = tree[8] + tree[9] = 1 + 3 = 4.",
    "blocksVisual": [
      {
        "label": "Combinare",
        "groups": [
          [
            {
              "val": "tree[4] = 1 + 3 = 4"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190,
          "active": true
        },
        {
          "id": "5",
          "label": "?",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8",
          "active": true
        },
        {
          "source": "4",
          "target": "9",
          "active": true
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 18,
    "text": "Copilul drept al nodului 2 este nodul 5, o frunză acoperind [2..2]. tree[5] = arr[2] = 5.",
    "blocksVisual": [
      {
        "label": "Frunză",
        "groups": [
          [
            {
              "val": "tree[5] = 5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "?",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190,
          "active": true
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5",
          "active": true
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 27,
    "text": "Calculăm valoarea nodului 2: tree[2] = tree[4] + tree[5] = 4 + 5 = 9.",
    "blocksVisual": [
      {
        "label": "Combinare",
        "groups": [
          [
            {
              "val": "tree[2] = 9"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "active": true
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4",
          "active": true
        },
        {
          "source": "2",
          "target": "5",
          "active": true
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 25,
    "text": "Trecem la subarborele drept al rădăcinii: nodul 3 acoperă intervalul [3..5]. Apelăm build pe el.",
    "blocksVisual": [
      {
        "label": "Nod curent",
        "groups": [
          [
            {
              "val": "Nod 3: [3..5]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120,
          "active": true
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "?",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3",
          "active": true
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 18,
    "text": "Nodul 3 se împarte în nodul 6 [3..4]. Copilul stâng al lui 6 este frunza 12 ([3..3]), tree[12] = arr[3] = 7.",
    "blocksVisual": [
      {
        "label": "Frunză",
        "groups": [
          [
            {
              "val": "tree[12] = 7"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260,
          "active": true
        },
        {
          "id": "13",
          "label": "?",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12",
          "active": true
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 18,
    "text": "Copilul drept al lui 6 este frunza 13 ([4..4]), tree[13] = arr[4] = 9.",
    "blocksVisual": [
      {
        "label": "Frunză",
        "groups": [
          [
            {
              "val": "tree[13] = 9"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "?",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260,
          "active": true
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13",
          "active": true
        }
      ]
    }
  },
  {
    "line": 27,
    "text": "Calculăm valoarea nodului 6: tree[6] = tree[12] + tree[13] = 7 + 9 = 16.",
    "blocksVisual": [
      {
        "label": "Combinare",
        "groups": [
          [
            {
              "val": "tree[6] = 16"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190,
          "active": true
        },
        {
          "id": "7",
          "label": "?",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12",
          "active": true
        },
        {
          "source": "6",
          "target": "13",
          "active": true
        }
      ]
    }
  },
  {
    "line": 18,
    "text": "Copilul drept al nodului 3 este frunza 7 ([5..5]). tree[7] = arr[5] = 11.",
    "blocksVisual": [
      {
        "label": "Frunză",
        "groups": [
          [
            {
              "val": "tree[7] = 11"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "?",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190,
          "active": true
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7",
          "active": true
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 27,
    "text": "Calculăm valoarea nodului 3: tree[3] = tree[6] + tree[7] = 16 + 11 = 27.",
    "blocksVisual": [
      {
        "label": "Combinare",
        "groups": [
          [
            {
              "val": "tree[3] = 27"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "?",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120,
          "active": true
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6",
          "active": true
        },
        {
          "source": "3",
          "target": "7",
          "active": true
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 27,
    "text": "În final, calculăm rădăcina: tree[1] = tree[2] + tree[3] = 9 + 27 = 36. Construcția este completă!",
    "blocksVisual": [
      {
        "label": "Rădăcină completă",
        "groups": [
          [
            {
              "val": "tree[1] = 36"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "active": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2",
          "active": true
        },
        {
          "source": "1",
          "target": "3",
          "active": true
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 60,
    "text": "Facem interogarea query(1, 0, 5, 1, 3) pentru a găsi suma elementelor de pe indicii [1..3]. Vizităm rădăcina [0..5].",
    "blocksVisual": [
      {
        "label": "Interogare [1, 3]",
        "groups": [
          [
            {
              "val": "Vizită Nod 1 [0..5]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "active": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 50,
    "text": "Nodul 1 [0..5] se suprapune parțial cu intervalul interogat [1..3]. Mergem la stânga (nodul 2 [0..2]).",
    "blocksVisual": [
      {
        "label": "Overlap Parțial",
        "groups": [
          [
            {
              "val": "Vizită Nod 2 [0..2]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "active": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2",
          "active": true
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 50,
    "text": "Nodul 2 [0..2] se suprapune parțial cu [1..3]. Mergem la copilul stâng (nodul 4 [0..1]).",
    "blocksVisual": [
      {
        "label": "Overlap Parțial",
        "groups": [
          [
            {
              "val": "Vizită Nod 4 [0..1]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190,
          "active": true
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4",
          "active": true
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 46,
    "text": "Nodul 4 [0..1] se suprapune parțial. Copilul stâng 8 [0..0] este total în afara lui [1..3], deci returnează 0.",
    "blocksVisual": [
      {
        "label": "În afara intervalului",
        "groups": [
          [
            {
              "val": "Nod 8 -> returnează 0"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260,
          "active": true
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8",
          "active": true
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 47,
    "text": "Copilul drept al lui 4 este nodul 9 [1..1]. Este complet în interiorul lui [1..3], deci returnează tree[9] = 3.",
    "blocksVisual": [
      {
        "label": "În interior",
        "groups": [
          [
            {
              "val": "Nod 9 -> returnează 3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260,
          "active": true
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9",
          "active": true
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 47,
    "text": "Copilul drept al nodului 2 este nodul 5 [2..2]. Este complet în interiorul lui [1..3], deci returnează tree[5] = 5.",
    "blocksVisual": [
      {
        "label": "În interior",
        "groups": [
          [
            {
              "val": "Nod 5 -> returnează 5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190,
          "active": true
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5",
          "active": true
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 52,
    "text": "Nodul 2 adună răspunsurile copiilor săi: p1 (de la nodul 4) + p2 (de la nodul 5) = (0 + 3) + 5 = 8.",
    "blocksVisual": [
      {
        "label": "Sumă parțială stânga",
        "groups": [
          [
            {
              "val": "Suma pe [1..2] = 8"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "active": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4",
          "active": true
        },
        {
          "source": "2",
          "target": "5",
          "active": true
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 51,
    "text": "Ne întoarcem la rădăcină și vizităm subarborele drept: nodul 3 [3..5]. Are overlap parțial cu [1..3].",
    "blocksVisual": [
      {
        "label": "Overlap Parțial",
        "groups": [
          [
            {
              "val": "Vizită Nod 3 [3..5]"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120,
          "active": true
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3",
          "active": true
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 47,
    "text": "La nodul 3: Copilul stâng 6 [3..4] are overlap parțial. Mergem în jos. Frunza 12 [3..3] returnează 7 (complet în interior).",
    "blocksVisual": [
      {
        "label": "Vizită subarbore",
        "groups": [
          [
            {
              "val": "Nod 12 -> returnează 7"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260,
          "active": true
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12",
          "active": true
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 46,
    "text": "Frunza 13 [4..4] este complet în afara lui [1..3], deci returnează 0. Nodul 6 returnează 7.",
    "blocksVisual": [
      {
        "label": "În afara intervalului",
        "groups": [
          [
            {
              "val": "Nod 13 -> returnează 0"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260,
          "active": true
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13",
          "active": true
        }
      ]
    }
  },
  {
    "line": 46,
    "text": "Copilul drept al nodului 3 este 7 [5..5], aflat în afara lui [1..3] -> returnează 0. Nodul 3 returnează 7.",
    "blocksVisual": [
      {
        "label": "În afara intervalului",
        "groups": [
          [
            {
              "val": "Nod 7 -> returnează 0"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190,
          "active": true
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7",
          "active": true
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 52,
    "text": "Rădăcina returnează suma finală a celor două ramuri: 8 (stânga) + 7 (dreapta) = 15.",
    "blocksVisual": [
      {
        "label": "Rezultat",
        "groups": [
          [
            {
              "val": "Suma pe [1..3] = 15",
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
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "active": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2",
          "active": true
        },
        {
          "source": "1",
          "target": "3",
          "active": true
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 61,
    "text": "Apelăm update(1, 0, 5, 1, 10). Începem actualizarea de la rădăcină (nodul 1, intervalul [0..5]). Deoarece indexul căutat (1) este în prima jumătate, mergem spre fiul stâng.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "update(1, 0, 5, 1, 10)"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "active": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 37,
    "text": "Mergem la fiul stâng: nodul 2 (intervalul [0..2]). Deoarece indexul căutat (1) este în prima jumătate (mid = 1, idx = 1 <= mid), mergem tot la stânga.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "update(2, 0, 2, 1, 10)"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "visited": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "active": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 37,
    "text": "Mergem la fiul stâng: nodul 4 (intervalul [0..1]). Aici mid = 0. Deoarece indexul căutat (1) este mai mare decât mid (1 > 0), mergem la dreapta spre frunză.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "update(4, 0, 1, 1, 10)"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "visited": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "visited": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190,
          "active": true
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "3",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Am ajuns la nodul frunză 9 (intervalul [1..1]). Incrementăm valoarea sa cu delta = 10: tree[9] devine 3 + 10 = 13. Începe întoarcerea din recursivitate.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "tree[9] += 10 (3 -> 13)"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "visited": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "visited": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "4",
          "desc": "[0..1]",
          "x": 60,
          "y": 190,
          "visited": true
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "13",
          "desc": "[1..1]",
          "x": 90,
          "y": 260,
          "active": true
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 41,
    "text": "Revenim la nodul părinte 4 (intervalul [0..1]). Recalculăm valoarea sa ca suma fiilor: tree[4] = tree[8] + tree[9] = 1 + 13 = 14.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "tree[4] = tree[8] + tree[9] = 14"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "visited": true
        },
        {
          "id": "2",
          "label": "9",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "visited": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "14",
          "desc": "[0..1]",
          "x": 60,
          "y": 190,
          "active": true
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "13",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 41,
    "text": "Revenim la nodul părinte 2 (intervalul [0..2]). Recalculăm valoarea sa ca suma fiilor: tree[2] = tree[4] + tree[5] = 14 + 5 = 19.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "tree[2] = tree[4] + tree[5] = 19"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "36",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "visited": true
        },
        {
          "id": "2",
          "label": "19",
          "desc": "[0..2]",
          "x": 120,
          "y": 120,
          "active": true
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "14",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "13",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 41,
    "text": "Revenim la rădăcină (nodul 1, intervalul [0..5]). Recalculăm valoarea sa ca suma fiilor: tree[1] = tree[2] + tree[3] = 19 + 27 = 46. Actualizarea în arbore este completă!",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "tree[1] = tree[2] + tree[3] = 46"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "1",
          "label": "46",
          "desc": "[0..5]",
          "x": 250,
          "y": 50,
          "active": true
        },
        {
          "id": "2",
          "label": "19",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "14",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "13",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  },
  {
    "line": 62,
    "text": "Afișăm rezultatul interogării pe [1, 3] după actualizare. Suma este 25.",
    "blocksVisual": [
      {
        "label": "Sfârșit Program",
        "groups": [
          [
            {
              "val": "Suma pe [1,3] după update = 25",
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
          "label": "46",
          "desc": "[0..5]",
          "x": 250,
          "y": 50
        },
        {
          "id": "2",
          "label": "19",
          "desc": "[0..2]",
          "x": 120,
          "y": 120
        },
        {
          "id": "3",
          "label": "27",
          "desc": "[3..5]",
          "x": 380,
          "y": 120
        },
        {
          "id": "4",
          "label": "14",
          "desc": "[0..1]",
          "x": 60,
          "y": 190
        },
        {
          "id": "5",
          "label": "5",
          "desc": "[2..2]",
          "x": 180,
          "y": 190
        },
        {
          "id": "6",
          "label": "16",
          "desc": "[3..4]",
          "x": 320,
          "y": 190
        },
        {
          "id": "7",
          "label": "11",
          "desc": "[5..5]",
          "x": 440,
          "y": 190
        },
        {
          "id": "8",
          "label": "1",
          "desc": "[0..0]",
          "x": 30,
          "y": 260
        },
        {
          "id": "9",
          "label": "13",
          "desc": "[1..1]",
          "x": 90,
          "y": 260
        },
        {
          "id": "12",
          "label": "7",
          "desc": "[3..3]",
          "x": 290,
          "y": 260
        },
        {
          "id": "13",
          "label": "9",
          "desc": "[4..4]",
          "x": 350,
          "y": 260
        }
      ],
      "edges": [
        {
          "source": "1",
          "target": "2"
        },
        {
          "source": "1",
          "target": "3"
        },
        {
          "source": "2",
          "target": "4"
        },
        {
          "source": "2",
          "target": "5"
        },
        {
          "source": "3",
          "target": "6"
        },
        {
          "source": "3",
          "target": "7"
        },
        {
          "source": "4",
          "target": "8"
        },
        {
          "source": "4",
          "target": "9"
        },
        {
          "source": "6",
          "target": "12"
        },
        {
          "source": "6",
          "target": "13"
        }
      ]
    }
  }
],
  "problems": {
  "easy": [
    {
      "title": "Arbori de Intervale Infoarena",
      "url": "https://www.infoarena.ro/problema/arbint",
      "desc": "Clasica problemă românească"
    },
    {
      "title": "Range Sum Query Mutable",
      "url": "https://leetcode.com/problems/range-sum-query-mutable/",
      "desc": "Se rezolvă excelent cu Segment Tree"
    }
  ],
  "medium": [
    {
      "title": "My Calendar I",
      "url": "https://leetcode.com/problems/my-calendar-i/",
      "desc": "Detecție intersectări de intervale"
    },
    {
      "title": "Lazy Propagation (Arbore de Update)",
      "url": "https://www.infoarena.ro/problema/update",
      "desc": "Dificultate mai ridicată la implementare"
    }
  ],
  "hard": [
    {
      "title": "Falling Squares",
      "url": "https://leetcode.com/problems/falling-squares/",
      "desc": "RMQ pe Segment Tree cu Lazy"
    }
  ]
},
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { tree: Array(24).fill(0), stack: ["build(node=1, [0..5])"] },
        { tree: Array(24).fill(0), stack: ["build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: Array(24).fill(0), stack: ["build(node=4, [0..1])", "build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; return a; })(), stack: ["build(node=8, [0..0])", "build(node=4, [0..1])", "build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; return a; })(), stack: ["build(node=9, [1..1])", "build(node=4, [0..1])", "build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; return a; })(), stack: ["build(node=4, [0..1])", "build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; return a; })(), stack: ["build(node=5, [2..2])", "build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; return a; })(), stack: ["build(node=2, [0..2])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; return a; })(), stack: ["build(node=3, [3..5])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; a[12] = 7; return a; })(), stack: ["build(node=12, [3..3])", "build(node=6, [3..4])", "build(node=3, [3..5])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; a[12] = 7; a[13] = 9; return a; })(), stack: ["build(node=13, [4..4])", "build(node=6, [3..4])", "build(node=3, [3..5])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; a[12] = 7; a[13] = 9; a[6] = 16; return a; })(), stack: ["build(node=6, [3..4])", "build(node=3, [3..5])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; a[12] = 7; a[13] = 9; a[6] = 16; a[7] = 11; return a; })(), stack: ["build(node=7, [5..5])", "build(node=3, [3..5])", "build(node=1, [0..5])"] },
        { tree: (() => { const a = Array(24).fill(0); a[8] = 1; a[9] = 3; a[4] = 4; a[5] = 5; a[2] = 9; a[12] = 7; a[13] = 9; a[6] = 16; a[7] = 11; a[3] = 27; return a; })(), stack: ["build(node=3, [3..5])", "build(node=1, [0..5])"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["build(node=1, [0..5])"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=1, [0..5], L=1, R=3)"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=2, [0..2], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=4, [0..1], L=1, R=3)", "query(node=2, [0..2], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=8, [0..0], L=1, R=3)", "query(node=4, [0..1], L=1, R=3)", "query(node=2, [0..2], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p1: 0 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=9, [1..1], L=1, R=3)", "query(node=4, [0..1], L=1, R=3)", "query(node=2, [0..2], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p2: 3 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=5, [2..2], L=1, R=3)", "query(node=2, [0..2], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p2: 5 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=2, [0..2], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p1: 8 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=3, [3..5], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=12, [3..3], L=1, R=3)", "query(node=6, [3..4], L=1, R=3)", "query(node=3, [3..5], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p1: 7 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=13, [4..4], L=1, R=3)", "query(node=6, [3..4], L=1, R=3)", "query(node=3, [3..5], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p2: 0 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=7, [5..5], L=1, R=3)", "query(node=3, [3..5], L=1, R=3)", "query(node=1, [0..5], L=1, R=3)"], p2: 0 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["query(node=1, [0..5], L=1, R=3)"], p1: 8, p2: 7 },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["update(node=1, [0..5], idx=1, val=10)"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["update(node=2, [0..2], idx=1, val=10)", "update(node=1, [0..5], idx=1, val=10)"] },
        { tree: [0, 36, 9, 27, 4, 5, 16, 11, 1, 3, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: ["update(node=4, [0..1], idx=1, val=10)", "update(node=2, [0..2], idx=1, val=10)", "update(node=1, [0..5], idx=1, val=10)"] },
        { tree: (() => { const a = [0, 36, 9, 27, 4, 5, 16, 11, 1, 13, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return a; })(), stack: ["update(node=9, [1..1], idx=1, val=10)", "update(node=4, [0..1], idx=1, val=10)", "update(node=2, [0..2], idx=1, val=10)", "update(node=1, [0..5], idx=1, val=10)"] },
        { tree: (() => { const a = [0, 36, 9, 27, 14, 5, 16, 11, 1, 13, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return a; })(), stack: ["update(node=4, [0..1], idx=1, val=10)", "update(node=2, [0..2], idx=1, val=10)", "update(node=1, [0..5], idx=1, val=10)"] },
        { tree: (() => { const a = [0, 36, 19, 27, 14, 5, 16, 11, 1, 13, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return a; })(), stack: ["update(node=2, [0..2], idx=1, val=10)", "update(node=1, [0..5], idx=1, val=10)"] },
        { tree: (() => { const a = [0, 46, 19, 27, 14, 5, 16, 11, 1, 13, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; return a; })(), stack: ["update(node=1, [0..5], idx=1, val=10)"] },
        { tree: [0, 46, 19, 27, 14, 5, 16, 11, 1, 13, 0, 0, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], stack: [] }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      curr.stack.forEach(frameName => {
        frames.push({ name: frameName, file: "solution.cpp", line: activeLine });
      });
      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 14) ? 58 : (stepIndex <= 26 ? 60 : (stepIndex === 27 ? 61 : (stepIndex === 34 ? 62 : 61))) });

      const treeStr = "size = 24 {" + curr.tree.slice(0, 16).join(", ") + ", ...}";
      globalVars.push({ name: "st.tree", type: "std::vector<int>", val: treeStr, expandable: true });
      globalVars.push({ name: "st.n", type: "int", val: "6", expandable: false });

      const activeFrame = curr.stack[0];
      if (activeFrame) {
        const match = activeFrame.match(/node=(\d+),\s*\[(\d+)\.\.(\d+)\]/);
        if (match) {
          vars.push({ name: "node", type: "int", val: match[1], expandable: false });
          vars.push({ name: "start", type: "int", val: match[2], expandable: false });
          vars.push({ name: "end", type: "int", val: match[3], expandable: false });
          const mid = Math.floor((parseInt(match[2]) + parseInt(match[3])) / 2);
          vars.push({ name: "mid", type: "int", val: mid.toString(), expandable: false });
        }
        const matchQuery = activeFrame.match(/L=(\d+),\s*R=(\d+)/);
        if (matchQuery) {
          vars.push({ name: "L", type: "int", val: matchQuery[1], expandable: false });
          vars.push({ name: "R", type: "int", val: matchQuery[2], expandable: false });
        }
        const matchUpdate = activeFrame.match(/idx=(\d+),\s*val=(\d+)/);
        if (matchUpdate) {
          vars.push({ name: "idx", type: "int", val: matchUpdate[1], expandable: false });
          vars.push({ name: "val", type: "int", val: matchUpdate[2], expandable: false });
        }
      }
      if (curr.p1 !== undefined) {
        vars.push({ name: "p1", type: "int", val: curr.p1.toString(), expandable: false });
      }
      if (curr.p2 !== undefined) {
        vars.push({ name: "p2", type: "int", val: curr.p2.toString(), expandable: false });
      }

      let inlineVal = "tree: {" + curr.tree.slice(1, 14).join(",") + "}";
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { stack: ["build(node=1, [0..5])"] },
        { stack: ["build(node=2, [0..2])"] },
        { stack: ["build(node=4, [0..1])"] },
        { stack: ["build(node=8, [0..0])"] },
        { stack: ["build(node=9, [1..1])"] },
        { stack: ["build(node=4, [0..1])"] },
        { stack: ["build(node=5, [2..2])"] },
        { stack: ["build(node=2, [0..2])"] },
        { stack: ["build(node=3, [3..5])"] },
        { stack: ["build(node=12, [3..3])"] },
        { stack: ["build(node=13, [4..4])"] },
        { stack: ["build(node=6, [3..4])"] },
        { stack: ["build(node=7, [5..5])"] },
        { stack: ["build(node=3, [3..5])"] },
        { stack: ["build(node=1, [0..5])"] },
        { stack: ["query(node=1, [0..5], L=1, R=3)"] },
        { stack: ["query(node=2, [0..2], L=1, R=3)"] },
        { stack: ["query(node=4, [0..1], L=1, R=3)"] },
        { stack: ["query(node=8, [0..0], L=1, R=3)"] },
        { stack: ["query(node=9, [1..1], L=1, R=3)"] },
        { stack: ["query(node=5, [2..2], L=1, R=3)"] },
        { stack: ["query(node=2, [0..2], L=1, R=3)"] },
        { stack: ["query(node=3, [3..5], L=1, R=3)"] },
        { stack: ["query(node=12, [3..3], L=1, R=3)"] },
        { stack: ["query(node=13, [4..4], L=1, R=3)"] },
        { stack: ["query(node=7, [5..5], L=1, R=3)"] },
        { stack: ["query(node=1, [0..5], L=1, R=3)"] },
        { stack: ["update(node=1, [0..5], idx=1, val=10)"] },
        { stack: ["update(node=2, [0..2], idx=1, val=10)"] },
        { stack: ["update(node=4, [0..1], idx=1, val=10)"] },
        { stack: ["update(node=9, [1..1], idx=1, val=10)"] },
        { stack: ["update(node=4, [0..1], idx=1, val=10)"] },
        { stack: ["update(node=2, [0..2], idx=1, val=10)"] },
        { stack: ["update(node=1, [0..5], idx=1, val=10)"] },
        { stack: [] }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 16 && lineNum <= 53) {
        const activeFrame = curr.stack[0];
        if (activeFrame) {
          const match = activeFrame.match(/node=(\\d+),\\s*\\[(\\d+)\\.\\.(\\d+)\\]/);
          if (match) {
            return "node: " + match[1] + ", [" + match[2] + ".." + match[3] + "]";
          }
        }
      }
      return null;
    }
  }

};
