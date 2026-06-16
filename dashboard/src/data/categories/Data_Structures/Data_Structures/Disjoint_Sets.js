export const data = {
  "presentation": "### Prezentare Generală\n\nDisjoint Set Union (DSU), sau Păduri de Mulțimi Disjuncte, este o structură de date magistrală pentru o sarcină anume: gruparea elementelor în mulțimi (componente conexe) și verificarea rapidă dacă două elemente fac parte din aceeași mulțime.\n\nPentru a face asta, vizualizăm fiecare mulțime ca pe un Arbore. Elementul Rădăcină (Root) acționează ca 'Reprezentantul' întregii mulțimi. Algoritmul utilizează 2 operații cheie:\n- Find(x): Găsește rădăcina arborelui în care e x.\n- Union(x, y): Unește cele două mulțimi ale lui x și y, legând rădăcina uneia sub rădăcina celeilalte.",
  "complexity": "### Complexitate\n\n- **Timp:** Fără optimizări, Find și Union ar putea lua O(N). Dar aplicând 'Path Compression' (Compresia Drumului) și 'Union by Rank/Size' (Unire după rang), timpul mediu amortizat pentru o operație devine O(α(N)), unde α e Inversa Funcției Ackermann. Practic, α(N) < 4 pentru orice valoare a lui N observabilă din Univers! Așadar, funcționează practic în O(1).\n- **Spațiu:** O(N) pentru a reține vectorul de părinți și rangul.\n",
  "variations": "### Variații și Edge Cases\n\n1. DSU cu Rollback: Dacă trebuie să 'anulăm' operații de Union (Undo), putem folosi o stivă pentru istoric, dar trebuie să renunțăm la Compresia Drumului, mărind timpul la O(log N).\n2. Bipartite DSU: Verificarea grafurilor bipartite online (pe măsură ce adăugăm muchii).\n3. Kruskal's Algorithm: DSU stă la baza celui mai cunoscut algoritm pentru Arborele Parțial de Cost Minim.",
  "applications": "### Aplicații\n\nOrice problemă de conectivitate dinamică: generarea labirinturilor (Kruskal Randomizat), găsirea componentelor conexe în imagine, clusterizarea datelor, determinarea relațiilor de rudenie sau de prietenie pe rețele sociale (Friends of friends).",
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
            parent[i] = i; // La inceput, fiecare e propriul sau reprezentant
    }

    // Gaseste radacina cu COMPRESIA DRUMULUI
    int find(int i) {
        if (parent[i] == i)
            return i;
        // Recursiv, legam i direct de radacina pt optimizare
        return parent[i] = find(parent[i]);
    }

    // Unire dupa RANG (adancimea estimata a arborelui)
    void unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);

        if (rootI != rootJ) {
            // Arborele mai scund e atasat sub cel mai inalt
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                // Dacă sunt egali, alegem oricare si ii crestem rangul
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    }
};

int main() {
    DSU dsu(5);
    dsu.unite(0, 2);
    dsu.unite(4, 2);
    dsu.unite(3, 1);
    
    if (dsu.find(4) == dsu.find(0))
        cout << "4 si 0 sunt conectate!
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 12,
      "text": "Structura internă a DSU: o pădure de arbori unde fiecare nod pointează spre părintele său. La început, fiecare este propriul părinte.",
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "label": "0",
            "x": 100,
            "y": 100
          },
          {
            "id": "1",
            "label": "1",
            "x": 150,
            "y": 100
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 100
          },
          {
            "id": "3",
            "label": "3",
            "x": 250,
            "y": 100
          },
          {
            "id": "4",
            "label": "4",
            "x": 300,
            "y": 100
          }
        ],
        "edges": []
      }
    },
    {
      "line": 12,
      "text": "Inițializăm DSU pentru 5 elemente (0..4). Fiecare se reprezintă pe el însuși.",
      "blocksVisual": [
        {
          "label": "Inițializare Părinți",
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
          }
        ],
        "edges": []
      }
    },
    {
      "line": 49,
      "text": "Facem Union(0, 2). rootI = 0, rootJ = 2. Rangurile sunt 0. Părintele lui 2 devine 0 (parent[2]=0). Rangul lui 0 crește.",
      "blocksVisual": [
        {
          "label": "Unire 0 și 2",
          "groups": [
            [
              {
                "val": "Root 0 (Rank 1)"
              }
            ],
            [
              {
                "val": "2 -> 0",
                "active": true
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
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
      "line": 50,
      "text": "Facem Union(4, 2). Find(4)=4. Find(2) trece prin 2->0 deci dă 0! rootI = 4, rootJ = 0.",
      "blocksVisual": [
        {
          "label": "Cautare pt 2",
          "groups": [
            [
              {
                "val": "Find(2)->0",
                "active": true
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
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
      "text": "Rang(4)=0, Rang(0)=1. Deoarece 0 are rang mai mare, 4 devine copilul lui 0 (parent[4]=0). Asta previne dezechilibrarea arborelui!",
      "blocksVisual": [
        {
          "label": "Unire după Rang",
          "groups": [
            [
              {
                "val": "Root 0"
              }
            ],
            [
              {
                "val": "2->0"
              },
              {
                "val": "4->0",
                "active": true
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
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
      "line": 51,
      "text": "Facem Union(3, 1). Root 3, Root 1. Le unim, 1 devine copilul lui 3 (parent[1]=3).",
      "blocksVisual": [
        {
          "label": "Altă componentă",
          "groups": [
            [
              {
                "val": "Root 3"
              }
            ],
            [
              {
                "val": "1->3",
                "active": true
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
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
      "line": 53,
      "text": "Verificăm dacă Find(4) == Find(0). Find(4) sare la 0 direct (O(1)). Find(0) este 0.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "Sunt la fel!",
                "sorted": true
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
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
      "line": 22,
      "text": "Aceasta este Compresia Drumului (Path Compression). Când căutăm, toți pe drum își setează parentul fix la Rădăcină. La următoarele căutări din ei vom sari la rădăcină direct din prima!",
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
            "x": 250,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 100,
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
            "x": 200,
            "y": 150
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
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Disjoint Sets (Infoarena)",
        "url": "https://www.infoarena.ro/problema/disjoint",
        "desc": "Implementare clasica"
      },
      {
        "title": "Number of Connected Components",
        "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
        "desc": "Verificare"
      }
    ],
    "medium": [
      {
        "title": "Redundant Connection",
        "url": "https://leetcode.com/problems/redundant-connection/",
        "desc": "Detecția ciclurilor în graf"
      },
      {
        "title": "Kruskal (MST)",
        "url": "https://www.pbinfo.ro/probleme/588/kruskal",
        "desc": "Cea mai mare aplicație DSU"
      }
    ],
    "hard": [
      {
        "title": "Checking Existence of Edge Length Limit",
        "url": "https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/",
        "desc": "Sortare Offline + DSU"
      }
    ]
  }
};
