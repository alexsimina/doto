export const data = {
  "presentation": "### Algoritmul Floyd-Warshall (All-Pairs Shortest Path)\n\nAlgoritmul lui Floyd-Warshall determină lungimile celor mai scurte drumuri între **oricare două noduri** dintr-un graf orientat și ponderat, utilizând programare dinamică.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V^3)$ - trei bucle imbricate.\n- **Spațiu:** $O(V^2)$ - pentru stocarea matricei de distanțe.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Algoritmul Warshall**: Pentru închidere tranzitivă.",
  "applications": "### Aplicații Reale\n\n- Calcularea tabelelor de rutare în rețele IP.\n- Rețele logistice.",
  "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\nconst int INF = 1e9;\n\nvoid floydWarshall(int V, vector<vector<int>>& dist) {\n    for (int k = 0; k < V; k++) {\n        for (int i = 0; i < V; i++) {\n            for (int j = 0; j < V; j++) {\n                if (dist[i][k] < INF && dist[k][j] < INF) {\n                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);\n                }\n            }\n        }\n    }\n\n    for (int i = 0; i < V; i++) {\n        for (int j = 0; j < V; j++) {\n            if (dist[i][j] == INF) cout << \"INF \";\n            else cout << dist[i][j] << \" \";\n        }\n        cout << \"\\n\";\n    }\n}\n\nint main() {\n    int V = 4;\n    vector<vector<int>> graph = {\n        {0,   5,  INF, 10},\n        {INF, 0,   3,  INF},\n        {INF, INF, 0,   1},\n        {INF, INF, INF, 0}\n    };\n    floydWarshall(V, graph);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 8,
      "text": "Începem execuția funcției `floydWarshall` cu matricea de distanțe inițială.",
      "matrix": {
        "title": "Distanțe inițiale",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 9,
      "text": "Intrăm în prima buclă. Setăm `k = 0`. Încercăm să scurtăm drumurile trecând prin nodul 0.",
      "matrix": {
        "title": "Intermediar k=0",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "highlightCells": [
          {
            "r": 0,
            "c": 0
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Parcurgem nodul sursă `i`. Setăm `i = 0`.",
      "matrix": {
        "title": "Sursă i=0",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 0
          }
        ]
      }
    },
    {
      "line": 11,
      "text": "Parcurgem destinația `j`. Setăm `j = 0`.",
      "matrix": {
        "title": "Destinație j=0",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 0
          }
        ]
      }
    },
    {
      "line": 12,
      "text": "Verificăm dacă trecerea prin 0 îmbunătățește drumul $0 \\to 0$. Distanța rămâne 0.",
      "matrix": {
        "title": "Fără schimbare",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 1` pentru sursa `i = 0`. $0 \\to 1$ prin 0 are costul $0 + 5 = 5$.",
      "matrix": {
        "title": "Destinație j=1",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 2`. Drumul $0 \\to 2$ este INF.",
      "matrix": {
        "title": "Destinație j=2",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 3`. Drumul $0 \\to 3$ este 10. Trecând prin 0: $0+10 = 10$.",
      "matrix": {
        "title": "Destinație j=3",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 10,
      "text": "Schimbăm sursa la `i = 1`. Încercăm să îmbunătățim drumurile din nodul 1.",
      "matrix": {
        "title": "Sursă i=1",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 1,
            "c": 0
          }
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm `j = 0`. Drumul $1 \\to 0$ este INF.",
      "matrix": {
        "title": "Destinație j=0",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 9,
      "text": "Incrementăm `k` la 1. Acum încercăm să folosim nodul 1 ca intermediar.",
      "matrix": {
        "title": "Intermediar k=1",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "highlightCells": [
          {
            "r": 1,
            "c": 1
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Rulăm bucla pentru `i = 0` (sursa 0).",
      "matrix": {
        "title": "Sursă i=0",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "INF",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 2`. Drumul direct $0 \\to 2$ este INF. Dar trecând prin 1 avem $dist[0][1] + dist[1][2] = 5 + 3 = 8$.",
      "matrix": {
        "title": "Optimizare găsită!",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 2
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Actualizăm $dist[0][2] = 8$.",
      "matrix": {
        "title": "Actualizat dist[0][2]",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 2
          }
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 3` pentru `i = 0`. Drumul $0 \\to 1 + 1 \\to 3$ este $5 + INF = INF$. Nu se modifică.",
      "matrix": {
        "title": "Destinație j=3",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 9,
      "text": "Mergem la `k = 2`. Folosim nodul 2 ca intermediar.",
      "matrix": {
        "title": "Intermediar k=2",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "highlightCells": [
          {
            "r": 2,
            "c": 2
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Setăm `i = 0`.",
      "matrix": {
        "title": "Sursă i=0",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "10"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 3`. Drumul direct $0 \\to 3$ are costul 10. Varianta prin 2: $dist[0][2] + dist[2][3] = 8 + 1 = 9$.",
      "matrix": {
        "title": "Optimizare găsită!",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "9"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 3
          }
        ]
      }
    },
    {
      "line": 13,
      "text": "Actualizăm $dist[0][3] = 9$.",
      "matrix": {
        "title": "Actualizat dist[0][3]",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "9"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 0,
            "c": 3
          }
        ]
      }
    },
    {
      "line": 10,
      "text": "Setăm sursa `i = 1`. Încercăm să folosim nodul 2 ca intermediar de la 1.",
      "matrix": {
        "title": "Sursă i=1",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "9"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "INF"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 1,
            "c": 2
          }
        ]
      }
    },
    {
      "line": 11,
      "text": "Verificăm destinația `j = 3`. Drumul $1 \\to 3$ direct este INF. Trecând prin 2: $dist[1][2] + dist[2][3] = 3 + 1 = 4$.",
      "matrix": {
        "title": "Optimizare găsită!",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "9"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "4"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "activeCells": [
          {
            "r": 1,
            "c": 3
          }
        ]
      }
    },
    {
      "line": 9,
      "text": "Mergem la `k = 3` (nodul 3 ca intermediar).",
      "matrix": {
        "title": "Intermediar k=3",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "9"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "4"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ],
        "highlightCells": [
          {
            "r": 3,
            "c": 3
          }
        ]
      }
    },
    {
      "line": 18,
      "text": "Afișăm matricea finală cu cele mai scurte drumuri calculate între oricare două perechi.",
      "matrix": {
        "title": "Matricea Finală",
        "headers": [
          "",
          "0",
          "1",
          "2",
          "3"
        ],
        "rows": [
          [
            "0",
            "0",
            "5",
            "8",
            "9"
          ],
          [
            "1",
            "INF",
            "0",
            "3",
            "4"
          ],
          [
            "2",
            "INF",
            "INF",
            "0",
            "1"
          ],
          [
            "3",
            "INF",
            "INF",
            "INF",
            "0"
          ]
        ]
      }
    }
  ]
};
