export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul Floyd-Warshall găsește cele mai scurte drumuri între TOATE perechile de noduri (All-Pairs Shortest Path).\\n\\nFolosește Programare Dinamică. Matricea `dist[i][j]` reprezintă distanța minimă de la `i` la `j`. Algoritmul actualizează progresiv această matrice considerând pe rând fiecare nod `k` ca posibil nod intermediar pe drumul de la `i` la `j`.\\nFormula: `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`.",
  "complexity": "### Complexitate\n\n- **Timp:** O(V^3) - trei bucle for imbricate. Foarte rapid în practică datorită accesului secvențial în memorie (cache-friendly).\\n- **Spațiu:** O(V^2) - pentru matricea de distanțe.\n",
  "variations": "### Variații și Edge Cases\n\nÎnchiderea Tranzitivă (Transitive Closure) - folosit pentru a afla dacă există măcar un drum (reachability) între oricare două noduri. Acolo folosim matrice booleană și operații logice: `reach[i][j] = reach[i][j] | (reach[i][k] & reach[k][j])`.",
  "applications": "### Aplicații\n\nCalcularea similitudinii în rețele, sisteme de navigație cu hărți mici (unde V e mic, ex V <= 400), probleme de minimizare a costului în lanțuri de distribuție.",
  code: `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
const int INF = 1e9;

void floydWarshall(int V, vector<vector<int>>& dist) {
    // Parcurgem fiecare nod intermediar k
    for (int k = 0; k < V; k++) {
        // Parcurgem toate perechile (i, j)
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                // Daca drumul i -> k -> j e mai scurt decat i -> j
                if (dist[i][k] < INF && dist[k][j] < INF) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    // Afisare matrice finala
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF) cout << "INF ";
            else cout << dist[i][j] << "   ";
        }
        cout << "\
";
    }
}

int main() {
    int V = 4;
    vector<vector<int>> graph = {
        {0,   5,  INF, 10},
        {INF, 0,   3,  INF},
        {INF, INF, 0,   1},
        {INF, INF, INF, 0}
    };
    
    floydWarshall(V, graph);
    return 0;
}
`,
  "explanations": [
    {
      "line": 9,
      "text": "Se alege `k`, nodul intermediar, care va lua valori de la 0 la V-1. La pasul k=0, vedem dacă e mai avantajos să trecem prin nodul 0.",
      "blocksVisual": [
        {
          "label": "Intermediar",
          "groups": [
            [
              {
                "val": "k = 0",
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
            "x": 100,
            "y": 50,
            "state": "active"
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 100,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "5"
          },
          {
            "source": "0",
            "target": "3",
            "label": "10"
          },
          {
            "source": "1",
            "target": "2",
            "label": "3"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1"
          }
        ]
      }
    },
    {
      "line": 15,
      "text": "Pentru k=1 (nodul 1), algoritmul încearcă să vadă dacă trecerea prin 1 îmbunătățește distanța de la 0 la 2. dist[0][2] era INF. Acum devine dist[0][1] + dist[1][2] = 5 + 3 = 8.",
      "blocksVisual": [
        {
          "label": "Matrice DP",
          "groups": [
            [
              {
                "val": "dist[0][2] = 8",
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
            "x": 100,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50,
            "state": "active"
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 100,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "5"
          },
          {
            "source": "0",
            "target": "3",
            "label": "10"
          },
          {
            "source": "1",
            "target": "2",
            "label": "3"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1"
          },
          {
            "source": "0",
            "target": "2",
            "label": "8(DP)",
            "style": "dashed"
          }
        ]
      }
    },
    {
      "line": 15,
      "text": "La pasul k=2, încercăm să folosim 2 ca nod intermediar. dist[0][3] era 10 (drumul direct). Dar prin 2 avem dist[0][2] + dist[2][3] = 8 + 1 = 9. 9 este mai mic decât 10, așa că actualizăm dist[0][3] = 9!",
      "blocksVisual": [
        {
          "label": "Matrice DP",
          "groups": [
            [
              {
                "val": "dist[0][3] = 9",
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
            "x": 100,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 150,
            "state": "active"
          },
          {
            "id": "3",
            "label": "3",
            "x": 100,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "5"
          },
          {
            "source": "0",
            "target": "3",
            "label": "10"
          },
          {
            "source": "1",
            "target": "2",
            "label": "3"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1"
          },
          {
            "source": "0",
            "target": "2",
            "label": "8(DP)",
            "style": "dashed"
          },
          {
            "source": "0",
            "target": "3",
            "label": "9(DP)",
            "style": "dashed"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "La final, matricea conține lungimea celui mai scurt drum de la orice nod i la orice nod j.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "O(V^3) executat",
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
            "x": 100,
            "y": 50
          },
          {
            "id": "1",
            "label": "1",
            "x": 200,
            "y": 50
          },
          {
            "id": "2",
            "label": "2",
            "x": 200,
            "y": 150
          },
          {
            "id": "3",
            "label": "3",
            "x": 100,
            "y": 150
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1",
            "label": "5"
          },
          {
            "source": "1",
            "target": "2",
            "label": "3"
          },
          {
            "source": "2",
            "target": "3",
            "label": "1"
          },
          {
            "source": "0",
            "target": "3",
            "label": "9",
            "style": "dashed"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Roy-Floyd",
        "url": "https://www.infoarena.ro/problema/royfloyd",
        "desc": "Problema clasică Infoarena"
      }
    ],
    "medium": [
      {
        "title": "Find the City With the Smallest Number of Neighbors at a Threshold Distance",
        "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
        "desc": "Aplicație directă FW pe matrice mică"
      }
    ],
    "hard": []
  }
};
