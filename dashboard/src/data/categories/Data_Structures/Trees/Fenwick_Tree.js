export const data = {
  presentation: "### Prezentare Generală\n\nArborele Indexat Binar (AIB / Fenwick Tree) este o structură de date fascinantă prin simplitatea sa la nivel de cod și complexitatea ideii matematice din spate.\n\nOferă două funcționalități extrem de puternice pentru un vector, care altfel nu se pot face simultan rapid:\n1. Adunarea unei valori X la elementul i din vector (Point Update).\n2. Calculul sumei elementelor pe intervalul de prefix [1..i] (Prefix Sum Query).\n\nCum funcționează? Nu se folosește un arbore efectiv (cu pointeri parent/left/right), ci doar reprezentarea binară a indecșilor array-ului. Fiecare index din AIB conține suma unor elemente, responsabilitatea sa fiind calculată folosind 'cel mai nesemnificativ bit' (LSB = x & -x).",
  complexity: "### Complexitate\n\n- **Timp:** Crearea din zero durează O(N) sau O(N log N). Interogarea și Actualizarea se desfășoară ambele în O(log N). Deoarece parcurgem biții setanți, operația este extrem de rapidă în viața reală comparativ cu Segment Trees.\n- **Spațiu:** O(N), un singur vector auxiliar stochează perfect arborele virtual, fără nicio pierdere (overhead).\n",
  variations: "### Variații și Edge Cases\n\n1. Varianta Range Update - Point Query: Prin utilizarea tehnicii de Difference Array în spatele Fenwick Tree, putem aduna elemente pe [L, R] și interoga la un pt!\n2. Varianta 2D: Fenwick Tree pe matrice. Memoria este M x N, iar Query/Update este O(log N * log M).\n3. Range Update - Range Query: Cea mai avansată, necesită 2 AIB-uri paralele (pentru a simula ecuația liniară matematică a modificărilor).",
  applications: "### Aplicații\n\nFenwick Tree este standardul absolut pentru rezolvarea Inversiunilor într-un array (Inversion Count). Folosit și la query-uri pe frecvențe dinamice (de exemplu calcularea medianei într-un flux de date curent).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

struct FenwickTree {
    vector<int> tree;
    int n;

    FenwickTree(int n) {
        this->n = n;
        tree.assign(n + 1, 0); 
    }

    int LSB(int x) {
        return x & (-x);
    }

    void update(int index, int delta) {
        while (index <= n) {
            tree[index] += delta;
            index += LSB(index); 
        }
    }

    int query(int index) {
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= LSB(index); 
        }
        return sum;
    }
    
    int queryRange(int left, int right) {
        return query(right) - query(left - 1);
    }
};

int main() {
    FenwickTree aib(10);
    
    aib.update(3, 5); 
    aib.update(5, 2); 
    aib.update(6, 1); 
    aib.update(1, 4); 
    
    cout << "Suma de pe [1, 6] = " << aib.query(6) << "\n"; 
    cout << "Suma de pe [3, 6] = " << aib.queryRange(3, 6) << "\n"; 
    return 0;
}
`,
  explanations: [
  {
    "line": 7,
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
    "line": 19,
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
    "line": 19,
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
    "line": 19,
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
    "line": 19,
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
    "line": 27,
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
    "line": 30,
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
    "line": 31,
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
    "line": 30,
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
    "line": 31,
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
    "line": 37,
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
    "line": 27,
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
    "line": 30,
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
    "line": 31,
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
    "line": 38,
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
  problems: {
    easy: [
      {
        title: "Fenwick Tree (AIB) Infoarena",
        url: "https://www.infoarena.ro/problema/aib",
        desc: "Implementare clasica"
      }
    ],
    medium: [
      {
        title: "Inversion Count",
        url: "https://www.spoj.com/problems/INVCNT/",
        desc: "Numărarea inversiunilor într-un vector folosind AIB"
      }
    ],
    hard: [
      {
        title: "2D Range Sum Query",
        url: "https://leetcode.com/problems/range-sum-query-2d-mutable/",
        desc: "AIB bidimensional pentru sume pe submatrice"
      }
    ]
  }
};
