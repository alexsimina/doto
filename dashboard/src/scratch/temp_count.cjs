export const data = {
  "presentation": "### Parcurgerea în Lățime (BFS)\n\nBreadth-First Search (BFS) explorează un graf strat cu strat, începând dintr-un nod sursă. Aceasta vizitează mai întâi toți vecinii direcți ai sursei, apoi vecinii acestora și așa mai departe.\n\nDatorită structurii FIFO (First-In, First-Out) implementate cu ajutorul unei **Cozi**, BFS are proprietatea remarcabilă de a descoperi **cele mai scurte drumuri** (măsurate în număr de muchii) de la sursă la toate celelalte noduri în grafuri neponderate. Distanța minimă de la o sursă $s$ la un nod $u$ este determinată pas cu pas.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - fiecare nod intră în coadă o singură dată și fiecare muchie este vizitată cel mult de două ori.\n- **Spațiu:** $O(V)$ - pentru coada de așteptare și vectorul `visited` care ține evidența nodurilor explorate.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Lee Algorithm**: BFS aplicat pe matrice/grid pentru găsirea drumului minim într-un labirint.\n- **0-1 BFS**: Când muchiile au costul 0 sau 1, se folosește un `std::deque`.\n- **Multi-source BFS**: Când se pleacă din mai multe surse simultan.",
  "applications": "### Aplicații Reale\n\n- Determinarea distanței minime în rețele neponderate.\n- Găsirea celei mai scurte căi de conectare între utilizatori pe platforme sociale.\n- Algoritmul Edmonds-Karp.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvoid bfs(int start, vector<vector<int>>& adj, int V) {\n    vector<bool> visited(V, false);\n    queue<int> q;\n    \n    visited[start] = true;\n    q.push(start);\n    \n    while (!q.empty()) {\n        int node = q.front();\n        q.pop();\n        cout << node << \" \";\n        \n        for (int neighbor : adj[node]) {\n            if (!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj = {\n        {1, 2},\n        {0, 3, 4},\n        {0, 4},\n        {1, 4},\n        {1, 2, 3}\n    };\n    bfs(0, adj, V);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 7,
      "text": "Începem funcția `bfs` pornind din nodul de start.",
      "blocksVisual": [
        {
          "label": "Start",
          "groups": [
            [
              {
                "val": "start: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm vectorul `visited` cu `false` pentru toate cele $V$ noduri.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: false"
              },
              {
                "val": "visited[1]: false"
              },
              {
                "val": "visited[2]: false"
              },
              {
                "val": "visited[3]: false"
              },
              {
                "val": "visited[4]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Declarăm coada `q` în care vom reține nodurile în curs de explorare.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Marcăm nodul de start (0) ca fiind vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: true",
                "active": true
              },
              {
                "val": "visited[1]: false"
              },
              {
                "val": "visited[2]: false"
              },
              {
                "val": "visited[3]: false"
              },
              {
                "val": "visited[4]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adăugăm nodul de start în coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Verificăm dacă coada nu este goală. Ea conține elementul [0].",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Extragem elementul din fața cozii: `node = 0`.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "node: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Eliminăm elementul din coadă. Coada devine goală.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Afișăm nodul 0 în consola de ieșire.",
      "blocksVisual": [
        {
          "label": "Console",
          "groups": [
            [
              {
                "val": "0 "
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Iterăm prin vecinii nodului 0, care sunt 1 și 2. Începem cu vecinul 1.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Verificăm dacă vecinul 1 este vizitat. `visited[1]` este false.",
      "blocksVisual": [
        {
          "label": "Visited Check",
          "groups": [
            [
              {
                "val": "visited[1]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Marcăm nodul 1 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: true"
              },
              {
                "val": "visited[1]: true",
                "active": true
              },
              {
                "val": "visited[2]: false"
              },
              {
                "val": "visited[3]: false"
              },
              {
                "val": "visited[4]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Adăugăm nodul 1 în coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Trecem la următorul vecin al nodului 0, care este nodul 2.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Nodul 2 nu este vizitat. Continuăm explorarea lui.",
      "blocksVisual": [
        {
          "label": "Visited Check",
          "groups": [
            [
              {
                "val": "visited[2]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Marcăm nodul 2 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[0]: true"
              },
              {
                "val": "visited[1]: true"
              },
              {
                "val": "visited[2]: true",
                "active": true
              },
              {
                "val": "visited[3]: false"
              },
              {
                "val": "visited[4]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Adăugăm nodul 2 în coadă.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Revenim la buclă. Coada nu este goală, conține [1, 2].",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Extragem elementul din fața cozii: `node = 1`.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "node: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Eliminăm 1 din coadă. Coada rămâne cu [2].",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Afișăm nodul 1 în consolă.",
      "blocksVisual": [
        {
          "label": "Console",
          "groups": [
            [
              {
                "val": "0 1 "
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Iterăm prin vecinii lui 1: [0, 3, 4]. Începem cu vecinul 0.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Nodul 0 este deja vizitat, îl ignorăm.",
      "blocksVisual": [
        {
          "label": "Visited Check",
          "groups": [
            [
              {
                "val": "visited[0]: true"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Trecem la următorul vecin al nodului 1, care este 3.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Nodul 3 nu este vizitat.",
      "blocksVisual": [
        {
          "label": "Visited Check",
          "groups": [
            [
              {
                "val": "visited[3]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Marcăm nodul 3 ca vizitat.",
      "blocksVisual": [
        {
          "label": "Visited",
          "groups": [
            [
              {
                "val": "visited[3]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Adăugăm nodul 3 în coadă. Coada devine [2, 3].",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "2"
              },
              {
                "val": "3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Trecem la următorul vecin al nodului 1, nodul 4.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "neighbor: 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Marcăm nodul 4 ca vizitat și îl adăugăm în coadă. Coada devine [2, 3, 4].",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Coada nu este goală. Extragem următorul nod, care este 2, apoi vecinii lui 0 și 4 (ambii vizitați). La fel pentru 3 și 4. Coada se golește și algoritmul se încheie.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            []
          ]
        }
      ]
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let nodeVal = -1;
      let neighborVal = -1;
      let visitedArray = [false, false, false, false, false];
      let qArray = [];
      if (stepIndex >= 3) { visitedArray[0] = true; }
      if (stepIndex >= 4) { qArray = [0]; }
      if (stepIndex >= 6) { nodeVal = 0; }
      if (stepIndex >= 7) { qArray = []; }
      if (stepIndex >= 9) { neighborVal = 1; }
      if (stepIndex >= 11) { visitedArray[1] = true; neighborVal = -1; }
      if (stepIndex >= 12) { qArray = [1]; }
      if (stepIndex >= 13) { neighborVal = 2; }
      if (stepIndex >= 15) { visitedArray[2] = true; neighborVal = -1; }
      if (stepIndex >= 16) { qArray = [1, 2]; }
      if (stepIndex >= 18) { nodeVal = 1; }
      if (stepIndex >= 19) { qArray = [2]; }
      if (stepIndex >= 21) { neighborVal = 0; }
      if (stepIndex >= 22) { neighborVal = -1; }
      if (stepIndex >= 23) { neighborVal = 3; }
      if (stepIndex >= 25) { visitedArray[3] = true; neighborVal = -1; }
      if (stepIndex >= 26) { qArray = [2, 3]; }
      if (stepIndex >= 27) { neighborVal = 4; }
      if (stepIndex >= 28) { visitedArray[4] = true; qArray = [2, 3, 4]; neighborVal = -1; }
      if (stepIndex >= 29) { qArray = [3, 4]; nodeVal = 2; }
      if (stepIndex >= 30) { qArray = [4]; nodeVal = 3; }
      if (stepIndex >= 31) { qArray = []; nodeVal = 4; }

      globalVars.push({ name: 'adj', type: 'std::vector<std::vector<int>>&', val: 'size = 5', expandable: true });
      globalVars.push({ name: 'visited', type: 'std::vector<bool>', val: `{${visitedArray.map(b => b ? 'true' : 'false').join(', ')}}`, expandable: false });
      vars.push({ name: 'q', type: 'std::queue<int>', val: qArray.length > 0 ? `{${qArray.join(', ')}}` : 'empty', expandable: false });
      if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
      if (neighborVal !== -1) vars.push({ name: 'neighbor', type: 'int', val: neighborVal, expandable: false });

      frames.push({ name: 'main()', file: 'main.cpp', line: 33 });
      if (stepIndex >= 1) {
        frames.unshift({ name: `bfs(start = 0, adj, V = 5)`, file: 'solution.cpp', line: activeLine });
      }

      if (nodeVal !== -1) {
        inlineVal = `node: ${nodeVal}`;
        if (neighborVal !== -1) inlineVal += `, neighbor: ${neighborVal}`;
      } else if (stepIndex >= 3) {
        inlineVal = `start: 0`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let nodeVal = -1;
      let qArray = [];
      if (stepIndex >= 4) { qArray = [0]; }
      if (stepIndex >= 7) { qArray = []; nodeVal = 0; }
      if (stepIndex >= 12) { qArray = [1]; nodeVal = 0; }
      if (stepIndex >= 16) { qArray = [1, 2]; nodeVal = 0; }
      if (stepIndex >= 19) { qArray = [2]; nodeVal = 1; }
      if (stepIndex >= 26) { qArray = [2, 3]; nodeVal = 1; }
      if (stepIndex >= 28) { qArray = [2, 3, 4]; nodeVal = 1; }
      if (stepIndex >= 29) { qArray = [3, 4]; nodeVal = 2; }
      if (stepIndex >= 30) { qArray = [4]; nodeVal = 3; }
      if (stepIndex >= 31) { qArray = []; nodeVal = 4; }

      if (lineNum === 7 || lineNum === 8 || lineNum === 12) {
        return `start: 0`;
      }
      if (lineNum === 14) {
        return `q.size(): ${qArray.length}`;
      }
      if ((lineNum === 15 || lineNum === 16 || lineNum === 17) && nodeVal !== -1) {
        return `node: ${nodeVal}`;
      }
      if ((lineNum === 19 || lineNum === 20 || lineNum === 22) && nodeVal !== -1) {
        return `node: ${nodeVal}, q.size(): ${qArray.length}`;
      }
      return null;
    }
  }
};
