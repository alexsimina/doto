export const data = {
  presentation: "### Prezentare Generală\n\nDisjoint Set Union (DSU), sau Păduri de Mulțimi Disjuncte, este o structură de date magistrală pentru o sarcină anume: gruparea elementelor în mulțimi (componente conexe) și verificarea rapidă dacă două elemente fac parte din aceeași mulțime.\n\nPentru a face asta, vizualizăm fiecare mulțime ca pe un Arbore. Elementul Rădăcină (Root) acționează ca 'Reprezentantul' întregii mulțimi. Algoritmul utilizează 2 operații cheie:\n- Find(x): Găsește rădăcina arborelui în care e x.\n- Union(x, y): Unește cele două mulțimi ale lui x și y, legând rădăcina uneia sub rădăcina celeilalte.",
  complexity: "### Complexitate\n\n- **Timp:** Fără optimizări, Find și Union ar putea lua O(N). Dar aplicând 'Path Compression' (Compresia Drumului) și 'Union by Rank/Size' (Unire după rang), timpul mediu amortizat pentru o operație devine O(\u03b1(N)), unde \u03b1 e Inversa Funcției Ackermann. Practic, \u03b1(N) < 4 pentru orice valoare a lui N observabilă din Univers! Așadar, funcționează practic în O(1).\n- **Spațiu:** O(N) pentru a reține vectorul de părinți și rangul.\n",
  variations: "### Variații și Edge Cases\n\n1. DSU cu Rollback: Dacă trebuie să 'anulăm' operații de Union (Undo), putem folosi o stivă pentru istoric, dar trebuie să renunțăm la Compresia Drumului, mărind timpul la O(log N).\n2. Bipartite DSU: Verificarea grafurilor bipartite online (pe măsură ce adăugăm muchii).\n3. Kruskal's Algorithm: DSU stă la baza celui mai cunoscut algoritm pentru Arborele Parțial de Cost Minim.",
  applications: "### Aplicații\n\nOrice problemă de conectivitate dinamică: generarea labirinturilor (Kruskal Randomizat), găsirea componentelor conexe în imagine, clusterizarea datelor, determinarea relațiilor de rudenie sau de prietenie pe rețele sociale (Friends of friends).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

struct DSU {
    vector<int> parent;
    vector<int> rank;

    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++)
            parent[i] = i; 
    }

    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]);
    }

    void unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);

        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    }
};

int main() {
    DSU dsu(6);
    dsu.unite(0, 2);
    dsu.unite(4, 2);
    dsu.unite(3, 1);
    dsu.unite(5, 3);
    dsu.unite(0, 5);
    
    if (dsu.find(4) == dsu.find(1))
        cout << "4 si 1 sunt in aceeasi multime कनेक्टेड!\n";
    
    return 0;
}
`,
  explanations: [
  {
    "line": 16,
    "text": "Inițializăm structura DSU pentru 6 elemente (0..5). Fiecare element începe prin a fi propriul său părinte.",
    "blocksVisual": [
      {
        "label": "Inițializare",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->2"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->4"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": []
    }
  },
  {
    "line": 33,
    "text": "Apelăm unite(0, 2). Mai întâi căutăm reprezentantul lui 0 cu find(0) care returnează 0.",
    "blocksVisual": [
      {
        "label": "find(0)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->2"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->4"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": []
    }
  },
  {
    "line": 34,
    "text": "Căutăm reprezentantul lui 2 cu find(2) care returnează 2.",
    "blocksVisual": [
      {
        "label": "find(2)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->2"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->4"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": []
    }
  },
  {
    "line": 44,
    "text": "Deoarece sunt în mulțimi diferite și rangurile lor sunt egale, legăm 2 sub 0 (parent[2] = 0).",
    "blocksVisual": [
      {
        "label": "parent[2] = 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->4"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Apelăm unite(4, 2). find(4) returnează 4.",
    "blocksVisual": [
      {
        "label": "find(4)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->4"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 34,
    "text": "find(2) îl caută pe părintele lui 2, care este 0. Cum 0 e rădăcină, returnează 0.",
    "blocksVisual": [
      {
        "label": "find(2) -> 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->4"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 41,
    "text": "Legăm 4 sub 0 (parent[4] = 0). Acum mulțimea lui 0 conține elementele {0, 2, 4}.",
    "blocksVisual": [
      {
        "label": "parent[4] = 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Apelăm unite(3, 1). find(3) returnează 3.",
    "blocksVisual": [
      {
        "label": "find(3)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 34,
    "text": "find(1) returnează 1.",
    "blocksVisual": [
      {
        "label": "find(1)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->1"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 44,
    "text": "Legăm 1 sub 3 (parent[1] = 3). Mulțimea lui 3 conține {3, 1}.",
    "blocksVisual": [
      {
        "label": "parent[1] = 3",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Apelăm unite(5, 3). find(5) returnează 5.",
    "blocksVisual": [
      {
        "label": "find(5)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 34,
    "text": "find(3) returnează 3.",
    "blocksVisual": [
      {
        "label": "find(3) -> 3",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->5"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 44,
    "text": "Legăm 5 sub 3 (parent[5] = 3). Mulțimea lui 3 conține {3, 1, 5}.",
    "blocksVisual": [
      {
        "label": "parent[5] = 3",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 33,
    "text": "Acum apelăm unite(0, 5). find(0) returnează 0.",
    "blocksVisual": [
      {
        "label": "find(0) -> 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 34,
    "text": "find(5) ne trimite la 3, iar 3 la el însuși. Returnează 3.",
    "blocksVisual": [
      {
        "label": "find(5) -> 3",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->3"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 44,
    "text": "Rangul lui 0 este mai mare sau egal, deci legăm rădăcina 3 sub 0 (parent[3] = 0). Mulțimile s-au unit!",
    "blocksVisual": [
      {
        "label": "parent[3] = 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->0"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        },
        {
          "source": "3",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 57,
    "text": "Testăm dacă 4 și 1 sunt în aceeași mulțime. Apelăm find(4) care returnează direct rădăcina 0.",
    "blocksVisual": [
      {
        "label": "find(4) -> 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->0"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        },
        {
          "source": "3",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 57,
    "text": "Apelăm find(1). Părintele lui 1 este 3. Cum 3 nu este propriul său părinte, continuăm căutarea recursivă.",
    "blocksVisual": [
      {
        "label": "find(1) -> recursiv",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->0"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        },
        {
          "source": "3",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 24,
    "text": "Mergem la părintele lui 3, care este 0. Deoarece 0 este rădăcină (parent[0]=0), returnăm 0.",
    "blocksVisual": [
      {
        "label": "find(3) -> 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->3"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->0"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "3",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        },
        {
          "source": "3",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 28,
    "text": "Aplicăm Compresia Drumului (Path Compression)! Setăm părintele lui 1 direct la rădăcina 0: parent[1] = 0.",
    "blocksVisual": [
      {
        "label": "parent[1] = 0 (Path Compression)",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->0"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->0"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        },
        {
          "source": "3",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "0",
          "directed": true
        }
      ]
    }
  },
  {
    "line": 57,
    "text": "Ambele find-uri au returnat 0! Elementele sunt în aceeași mulțime. Mesajul 'sunt conectate' este afișat.",
    "blocksVisual": [
      {
        "label": "find(4) == find(1) = 0",
        "groups": [
          [
            {
              "val": "0->0"
            },
            {
              "val": "1->0"
            },
            {
              "val": "2->0"
            },
            {
              "val": "3->0"
            },
            {
              "val": "4->0"
            },
            {
              "val": "5->3"
            }
          ]
        ]
      }
    ],
    "graphVisual": {
      "nodes": [
        {
          "id": "0",
          "label": "0",
          "x": 150,
          "y": 50
        },
        {
          "id": "1",
          "label": "1",
          "x": 350,
          "y": 250
        },
        {
          "id": "2",
          "label": "2",
          "x": 80,
          "y": 150
        },
        {
          "id": "3",
          "label": "3",
          "x": 300,
          "y": 150
        },
        {
          "id": "4",
          "label": "4",
          "x": 220,
          "y": 150
        },
        {
          "id": "5",
          "label": "5",
          "x": 250,
          "y": 250
        }
      ],
      "edges": [
        {
          "source": "2",
          "target": "0",
          "directed": true
        },
        {
          "source": "4",
          "target": "0",
          "directed": true
        },
        {
          "source": "5",
          "target": "3",
          "directed": true
        },
        {
          "source": "3",
          "target": "0",
          "directed": true
        },
        {
          "source": "1",
          "target": "0",
          "directed": true
        }
      ]
    }
  }
],
  problems: {
    easy: [
      {
        title: "Disjoint Sets (Infoarena)",
        url: "https://www.infoarena.ro/problema/disjoint",
        desc: "Implementare clasica"
      },
      {
        title: "Number of Connected Components",
        url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        desc: "Verificare"
      }
    ],
    medium: [
      {
        title: "Redundant Connection",
        url: "https://leetcode.com/problems/redundant-connection/",
        desc: "Detecția ciclurilor în graf"
      },
      {
        title: "Kruskal (MST)",
        url: "https://www.pbinfo.ro/probleme/588/kruskal",
        desc: "Cea mai mare aplicație DSU"
      }
    ],
    hard: [
      {
        title: "Checking Existence of Edge Length Limit",
        url: "https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/",
        desc: "Sortare Offline + DSU"
      }
    ]
  }
};
