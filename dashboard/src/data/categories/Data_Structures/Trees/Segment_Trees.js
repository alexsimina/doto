export const data = {
  "presentation": "### Prezentare Generală\n\nArborii de Intervale (Segment Trees) reprezintă 'the ultimate tool' în lumea structurilor de date. Pot răspunde eficient atât la interogări complexe pe intervale (suma, minimul, gcd, max etc.), cât și la actualizări continue.\n\nFață de Fenwick Tree, care poate doar funcții inversabile (cum e suma, pentru ca poți scadea), Segment Tree susține și operații ne-inversabile (minimul - nu poți 'scădea' minimul pe o parte). Funcționează bazat pe paradigma Divide et Impera: fiecare nod al arborelui reprezintă rezultatul pentru un anumit interval. Rădăcina reține răspunsul pe [0, N-1]. Nodurile stânga/dreapta rețin răspunsurile pe înjumătățirile intervalului [0, mid] și [mid+1, N-1], și așa mai departe până la frunze, care conțin elemente unice.",
  "complexity": "### Complexitate\n\n- **Timp:** Construcția inițială e O(N). Interogarea și Actualizarea sunt garantat O(log N) pe un arbore echilibrat perfect cu înălțime log N.\n- **Spațiu:** O(N), vectorul care reprezintă arborele necesită mărimea de aproximativ 4 * N (pentru a asigura destul spațiu vizualizării ca un arbore binar complet din array).\n",
  "variations": "### Variații și Edge Cases\n\n1. Lazy Propagation (Actualizare leneșă): O tehnică monumentală care permite actualizarea direct pe RANGE-URI (de ex: adună 5 pe toate elementele [L, R]) în O(log N) în loc de repetate actualizări de punct. Stocăm update-ul la nivel înalt în noduri, și îl împingem (push) copiilor abia când e strict vizitat acel nod.\n2. Segment Tree Persistent: Stochează istoria completă a modificărilor structurii pe ramurile modificate, fără să dubleze O(N) ramurile nemodificate (păstrează pointeri comuni). Astfel poți interoga 'Care era minimul la timpul T?'.",
  "applications": "### Aplicații\n\nSunt esențiali în Computational Geometry (ex: aflarea dreptunghiurilor intersectate), menținerea statisticilor de scoruri, sau rezolvarea jocurilor 2D în platformere unde se simulează coliziuni.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

struct SegTree {
    int n;
    vector<int> tree;

    SegTree(var vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }

    // Nodul "node" acopera intervalul [start, end]
    void build(var vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start]; // Frunza
        } else {
            int mid = (start + end) / 2;
            int leftChild = 2 * node;
            int rightChild = 2 * node + 1;
            
            build(arr, leftChild, start, mid);
            build(arr, rightChild, mid + 1, end);
            
            // Combinarea rezultatelor (Aici facem SUMA)
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
        if (R < start || end < L) return 0; // Total inafara intervalului
        if (L <= start && end <= R) return tree[node]; // Total in interior
        
        // Suprapunere partiala
        int mid = (start + end) / 2;
        int p1 = query(2 * node, start, mid, L, R);
        int p2 = query(2 * node + 1, mid + 1, end, L, R);
        return p1 + p2;
    }
};

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    SegTree st(arr);
    
    cout << "Suma pe [1, 3] = " << st.query(1, 0, 5, 1, 3) << "
"; // 3+5+7 = 15
    st.update(1, 0, 5, 1, 10); // Adauga 10 la poz 1. (Din 3 se face 13)
    cout << "Suma pe [1, 3] dupa udp = " << st.query(1, 0, 5, 1, 3) << "
"; // 13+5+7 = 25
    return 0;
}
`,
  "explanations": [
    {
      "line": 11,
      "text": "Structura Segment Tree: un arbore binar complet unde rădăcina acoperă întreg intervalul, iar fiecare copil înjumătățește intervalul părintelui.",
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 17,
      "text": "Build: Apelăm recursiv pentru a construi arborele. Arr = [1,3,5,7,9,11], N=6. Rădăcina e nodul 1 și acoperă [0, 5].",
      "blocksVisual": [
        {
          "label": "Root Nod 1 [0..5]",
          "groups": [
            [
              {
                "val": "Total sum"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Build recursiv îl sparge pe 1 în stânga 2*[0..2] și dreapta 3*[3..5].",
      "blocksVisual": [
        {
          "label": "Split",
          "groups": [
            [
              {
                "val": "Nod 2 [0..2]"
              },
              {
                "val": "Nod 3 [3..5]"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 19,
      "text": "Când se ajunge la nodurile frunză (start == end), salvăm valorile efective (ex: tree[4]=arr[0]=1, tree[5]=arr[1]=3).",
      "blocksVisual": [
        {
          "label": "Frunze",
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
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 29,
      "text": "La întoarcere din recursivitate, Nodul combină copiii (Suma). Ex: Nodul ce acoperă [0,1] ia suma 1+3=4.",
      "blocksVisual": [
        {
          "label": "Backtrack Sum",
          "groups": [
            [
              {
                "val": "1+3=4",
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
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 62,
      "text": "Avem Query pe [1, 3]. Chemăm Query(node=1, L=1, R=3). Rădăcina acoperă [0..5]. Se suprapune parțial.",
      "blocksVisual": [
        {
          "label": "Query",
          "groups": [
            [
              {
                "val": "Target [1, 3]",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 51,
      "text": "Divizăm pe mijloc(2). Cerem query pentru stânga [0..2] din target [1..3] și dreapta [3..5] din target [1..3].",
      "blocksVisual": [
        {
          "label": "Split Query",
          "groups": [
            [
              {
                "val": "L-Search [0..2]"
              },
              {
                "val": "R-Search [3..5]"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Pentru partea stângă, nodul e [0..2]. Noi căutăm doar [1..3]. Divizăm iar: [0..0] și [1..2].",
      "blocksVisual": [
        {
          "label": "Stânga adâncește",
          "groups": [
            [
              {
                "val": "[0..0] respins"
              },
              {
                "val": "[1..2] acceptat",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Nodul pt [1..2] este TOTAL INCLUS in query [1..3]. Deci OPREȘTE recursivitatea și returnează direct răspunsul calculat din Build (Suma 3+5=8)!",
      "blocksVisual": [
        {
          "label": "Gasit [1..2]",
          "groups": [
            [
              {
                "val": "Return 8",
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
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 49,
      "text": "Pentru partea dreaptă inițială [3..5] în query [1..3]. Divizăm în [3..3] și [4..5]. Nodul pentru [3..3] e inclus total. Returnează valoarea (7).",
      "blocksVisual": [
        {
          "label": "Găsit [3..3]",
          "groups": [
            [
              {
                "val": "Return 7",
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
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 48,
      "text": "Nodul pentru [4..5] este TOTAL ÎN AFARĂ de [1..3]. Se omoară ramura: returnează 0.",
      "blocksVisual": [
        {
          "label": "Respins",
          "groups": [
            [
              {
                "val": "Return 0",
                "hidden": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "1",
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
          }
        ]
      }
    },
    {
      "line": 53,
      "text": "Cele 2 răspunsuri (8 + 7 = 15) se întorc spre rădăcină și acesta e răspunsul final! Log N complexitate superbă.",
      "blocksVisual": [
        {
          "label": "Răspuns final",
          "groups": [
            [
              {
                "val": "15",
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
            "label": "[0..5]",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "[0..2]",
            "x": 100,
            "y": 100
          },
          {
            "id": "3",
            "label": "[3..5]",
            "x": 300,
            "y": 100
          },
          {
            "id": "4",
            "label": "[0..1]",
            "x": 50,
            "y": 150
          },
          {
            "id": "5",
            "label": "[2..2]",
            "x": 150,
            "y": 150
          },
          {
            "id": "6",
            "label": "[3..4]",
            "x": 250,
            "y": 150
          },
          {
            "id": "7",
            "label": "[5..5]",
            "x": 350,
            "y": 150
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
  }
};
