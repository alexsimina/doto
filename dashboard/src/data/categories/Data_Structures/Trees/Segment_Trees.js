export const data = {
  presentation: "### Prezentare Generală\n\nArborii de Intervale (Segment Trees) reprezintă 'the ultimate tool' în lumea structurilor de date. Pot răspunde eficient atât la interogări complexe pe intervale (suma, minimul, gcd, max etc.), cât și la actualizări continue.\n\nFață de Fenwick Tree, care poate doar funcții inversabile (cum e suma, pentru ca poți scadea), Segment Tree susține și operații ne-inversabile (minimul - nu poți 'scădea' minimul pe o parte). Funcționează bazat pe paradigma Divide et Impera: fiecare nod al arborelui reprezintă rezultatul pentru un anumit interval. Rădăcina reține răspunsul pe [0, N-1]. Nodurile stânga/dreapta rețin răspunsurile pe înjumătățirile intervalului [0, mid] și [mid+1, N-1], și așa mai departe până la frunze, care conțin elemente unice.",
  complexity: "### Complexitate\n\n- **Timp:** Construcția inițială e O(N). Interogarea și Actualizarea sunt garantat O(log N) pe un arbore echilibrat perfect cu înălțime log N.\n- **Spațiu:** O(N), vectorul care reprezintă arborele necesită mărimea de aproximativ 4 * N (pentru a asigura destul spațiu vizualizării ca un arbore binar complet din array).\n",
  variations: "### Variații și Edge Cases\n\n1. Lazy Propagation (Actualizare leneșă): O tehnică monumentală care permite actualizarea direct pe RANGE-URI (de ex: adună 5 pe toate elementele [L, R]) în O(log N) în loc de repetate actualizări de punct. Stocăm update-ul la nivel înalt în noduri, și îl împingem (push) copiilor abia când e strict vizitat acel nod.\n2. Segment Tree Persistent: Stochează istoria completă a modificărilor structurii pe ramurile modificate, fără să dubleze O(N) ramurile nemodificate (păstrează pointeri comuni). Astfel poți interoga 'Care era minimul la timpul T?'.",
  applications: "### Aplicații\n\nSunt esențiali în Computational Geometry (ex: aflarea dreptunghiurilor intersectate), menținerea statisticilor de scoruri, sau rezolvarea jocurilor 2D în platformere unde se simulează coliziuni.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

struct SegTree {
    int n;
    vector<int> tree;

    SegTree(const vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }

    void build(const vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start]; 
        } else {
            int mid = (start + end) / 2;
            int leftChild = 2 * node;
            int rightChild = 2 * node + 1;
            
            build(arr, leftChild, start, mid);
            build(arr, rightChild, mid + 1, end);
            
            tree[node] = tree[leftChild] + tree[rightChild];
        }
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] += val;
        } else {
            int mid = (start + end) / 2;
            if (start <= idx && idx <= mid) {
                update(2 * node, start, mid, idx, val);
            } else {
                update(2 * node + 1, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    int query(int node, int start, int end, int L, int R) {
        if (R < start || end < L) return 0; 
        if (L <= start && end <= R) return tree[node]; 
        
        int mid = (start + end) / 2;
        int p1 = query(2 * node, start, mid, L, R);
        int p2 = query(2 * node + 1, mid + 1, end, L, R);
        return p1 + p2;
    }
};

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    SegTree st(arr);
    
    cout << "Suma pe [1, 3] = " << st.query(1, 0, 5, 1, 3) << "\n"; 
    st.update(1, 0, 5, 1, 10); 
    cout << "Suma pe [1, 3] dupa udp = " << st.query(1, 0, 5, 1, 3) << "\n"; 
    return 0;
}
`,
  explanations: [
  {
    "line": 9,
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
    "line": 16,
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
    "line": 24,
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
    "line": 25,
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
    "line": 28,
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
    "line": 28,
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
    "line": 24,
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
    "line": 25,
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
    "line": 28,
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
    "line": 28,
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
    "line": 28,
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
    "line": 62,
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
    "line": 52,
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
    "line": 52,
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
    "line": 47,
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
    "line": 48,
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
    "line": 48,
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
    "line": 54,
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
    "line": 53,
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
    "line": 52,
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
    "line": 47,
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
    "line": 47,
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
    "line": 54,
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
    "line": 64,
    "text": "Facem update(1, 0, 5, 1, 10) - adăugăm 10 la poziția 1. Drumul de actualizare coboară spre frunza [1..1] și crește valorile nodurilor părinte pe drum.",
    "blocksVisual": [
      {
        "label": "Actualizare",
        "groups": [
          [
            {
              "val": "Adaugă 10 la index 1"
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
  }
],
  problems: {
    easy: [
      {
        title: "Arbori de Intervale Infoarena",
        url: "https://www.infoarena.ro/problema/arbint",
        desc: "Clasica problemă românească"
      },
      {
        title: "Range Sum Query Mutable",
        url: "https://leetcode.com/problems/range-sum-query-mutable/",
        desc: "Se rezolvă excelent cu Segment Tree"
      }
    ],
    medium: [
      {
        title: "My Calendar I",
        url: "https://leetcode.com/problems/my-calendar-i/",
        desc: "Detecție intersectări de intervale"
      },
      {
        title: "Lazy Propagation (Arbore de Update)",
        url: "https://www.infoarena.ro/problema/update",
        desc: "Dificultate mai ridicată la implementare"
      }
    ],
    hard: [
      {
        title: "Falling Squares",
        url: "https://leetcode.com/problems/falling-squares/",
        desc: "RMQ pe Segment Tree cu Lazy"
      }
    ]
  }
};
