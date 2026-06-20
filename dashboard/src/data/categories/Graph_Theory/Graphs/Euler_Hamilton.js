export const data = {
  "presentation": "### Drumuri și Cicluri Euler / Hamilton\n\n- **Ciclu Eulerian**: Un drum într-un graf care vizitează **fiecare muchie** exact o singură dată și revine la nodul de start. Există dacă și numai dacă toate nodurile au grad par (graf neorientat) sau $\\text{in-degree}(v) = \\text{out-degree}(v)$ (graf orientat).\n- **Ciclu Hamiltonian**: Un drum care vizitează **fiecare nod** exact o singură dată și revine la start. Problema determinării sale este NP-completă.\n\nAlgoritmul lui **Hierholzer** găsește un ciclu eulerian în mod eficient folosind o stivă pentru a construi subcicluri și a le îmbina progresiv.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - parcurgem fiecare muchie exact o dată folosind stiva.\n- **Spațiu:** $O(V + E)$ - pentru stiva de drum curent și vectorul de rezultate.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Drum Eulerian (nu ciclu)**: Vizitează toate muchiile exact o dată, dar începe și se termină în noduri diferite.\n- **Algoritmul Fleury**: Un alt algoritm pentru drumuri euleriene, dar mai puțin eficient ($O(E^2)$).",
  "applications": "### Aplicații Reale\n\n- Planificarea rutelor mașinilor de deszăpezire sau colectare a deșeurilor.\n- Reconstrucția secvențelor ADN prin intermediul grafurilor de Bruijn.\n- Proiectarea circuitelor integrate.",
  "code": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\n\nusing namespace std;\n\nvoid findEulerianPath(int start, vector<vector<int>>& adj) {\n    stack<int> curr_path;\n    vector<int> circuit;\n    \n    curr_path.push(start);\n    int curr_v = start; \n\n    while (!curr_path.empty()) {\n        if (!adj[curr_v].empty()) {\n            curr_path.push(curr_v);\n            int next_v = adj[curr_v].back();\n            adj[curr_v].pop_back();\n            curr_v = next_v;\n        } else {\n            circuit.push_back(curr_v);\n            curr_v = curr_path.top();\n            curr_path.pop();\n        }\n    }\n\n    reverse(circuit.begin(), circuit.end());\n    for (int node : circuit) cout << node << \" \";\n}\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V);\n    adj[0].push_back(1);\n    adj[1].push_back(2);\n    adj[2].push_back(0);\n    adj[2].push_back(3);\n    adj[3].push_back(2);\n    \n    findEulerianPath(0, adj);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 8,
      "text": "Începem căutarea ciclului eulerian cu funcția `findEulerianPath`.",
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
      "line": 9,
      "text": "Declarăm stiva `curr_path` pentru stocarea drumului curent.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Declarăm vectorul `circuit` pentru salvarea ordinii finale a ciclului.",
      "blocksVisual": [
        {
          "label": "Circuit",
          "groups": [
            []
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adăugăm nodul de pornire (0) în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
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
      "line": 13,
      "text": "Setăm nodul curent `curr_v = 0`.",
      "blocksVisual": [
        {
          "label": "curr_v",
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
      "line": 15,
      "text": "Intrăm în bucla principală: stiva nu este goală.",
      "blocksVisual": [
        {
          "label": "Stack",
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
      "line": 16,
      "text": "Verificăm dacă nodul 0 mai are muchii nefolosite. Are o muchie către nodul 1.",
      "blocksVisual": [
        {
          "label": "Listă vecini",
          "groups": [
            [
              {
                "val": "adj[0]: [1]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Salvăm nodul curent (0) pe stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
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
      "line": 18,
      "text": "Identificăm următorul nod: `next_v = 1`.",
      "blocksVisual": [
        {
          "label": "next_v",
          "groups": [
            [
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Ștergem muchia din listă (simulând parcurgerea ei).",
      "blocksVisual": [
        {
          "label": "Listă vecini",
          "groups": [
            [
              {
                "val": "adj[0]: []",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Ne mutăm în noul nod: `curr_v = 1`.",
      "blocksVisual": [
        {
          "label": "curr_v",
          "groups": [
            [
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Reluăm bucla. Stiva conține [0, 0]. Nodul curent este 1.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 1 are vecinul 2. Salvăm 1 pe stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Ștergem muchia $1 \\to 2$. setăm `curr_v = 2`.",
      "blocksVisual": [
        {
          "label": "curr_v",
          "groups": [
            [
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 2 are vecinii [0, 3]. Ultimul adăugat este 3. Îl salvăm pe 2 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Ștergem muchia către 3, mutăm `curr_v = 3`.",
      "blocksVisual": [
        {
          "label": "curr_v",
          "groups": [
            [
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 3 are vecinul 2. Îl salvăm pe 3 pe stivă, ștergem muchia, mutăm `curr_v = 2`.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 2 are acum doar vecinul 0. Îl salvăm în stivă, ștergem muchia, mutăm `curr_v = 0`.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 0 nu mai are nicio muchie neparcursă. Intrăm pe ramura `else`.",
      "blocksVisual": [
        {
          "label": "adj[0]",
          "groups": [
            [
              {
                "val": "[]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Adăugăm nodul curent 0 la circuit.",
      "blocksVisual": [
        {
          "label": "Circuit",
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
      "line": 23,
      "text": "Restabilim `curr_v` la cel din vârful stivei (2).",
      "blocksVisual": [
        {
          "label": "curr_v",
          "groups": [
            [
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Eliminăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
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
      "line": 27,
      "text": "Continuăm procesul până stiva este goală, inversăm ordinea elementelor din `circuit` și obținem ciclul complet.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "circuit: [0, 1, 2, 3, 2, 0]"
              }
            ]
          ]
        }
      ]
    },
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let currV = -1, nextV = -1;
      const stackState = [];
      const circuitState = [];
      if (stepIndex >= 1) { stackState.push(0); }
      if (stepIndex >= 4) { currV = 0; }
      if (stepIndex >= 6) { stackState.push(0); nextV = 1; }
      if (stepIndex >= 7) { currV = 1; nextV = -1; }
      if (stepIndex >= 8) { stackState.push(1); currV = 2; }
      if (stepIndex >= 9) { stackState.push(2); currV = 3; nextV = 3; }
      if (stepIndex >= 10) { stackState.push(3); currV = 2; nextV = -1; }
      if (stepIndex >= 11) { stackState.push(2); currV = 0; }
      if (stepIndex >= 12) { circuitState.push(0); currV = 2; }
      if (stepIndex >= 13) { circuitState.push(2); }
      globalVars.push({ name: 'adj', type: 'std::vector<std::vector<int>>', val: '4-node graph', expandable: true });
      globalVars.push({ name: 'circuit', type: 'std::vector<int>', val: circuitState.length > 0 ? `[${circuitState.join(', ')}]` : '[]', expandable: false });
      if (currV !== -1) vars.push({ name: 'curr_v', type: 'int', val: currV, expandable: false });
      if (nextV !== -1) vars.push({ name: 'next_v', type: 'int', val: nextV, expandable: false });
      vars.push({ name: 'curr_path (stack)', type: 'std::stack<int>', val: stackState.length > 0 ? `[${stackState.join(', ')}]` : 'empty', expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: 35 });
      if (stepIndex >= 1) frames.unshift({ name: 'findEulerianPath(start=0, adj)', file: 'solution.cpp', line: activeLine });
      if (currV !== -1) inlineVal = `curr_v: ${currV}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
      let currV = -1, nextV = -1;
      const stackState = [];
      const circuitState = [];
      if (stepIndex >= 1) { stackState.push(0); }
      if (stepIndex >= 4) { currV = 0; }
      if (stepIndex >= 6) { stackState.push(0); nextV = 1; }
      if (stepIndex >= 7) { currV = 1; nextV = -1; }
      if (stepIndex >= 8) { stackState.push(1); currV = 2; }
      if (stepIndex >= 9) { stackState.push(2); currV = 3; nextV = 3; }
      if (stepIndex >= 10) { stackState.push(3); currV = 2; nextV = -1; }
      if (stepIndex >= 11) { stackState.push(2); currV = 0; }
      if (stepIndex >= 12) { circuitState.push(0); currV = 2; }
      if (stepIndex >= 13) { circuitState.push(2); }

      const staticNodes = [
        { id: "0", x: 80, y: 60, label: "0" },
        { id: "1", x: 200, y: 60, label: "1" },
        { id: "2", x: 140, y: 130, label: "2" },
        { id: "3", x: 80, y: 200, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1" },
        { source: "1", target: "2" },
        { source: "2", target: "0" },
        { source: "2", target: "3" },
        { source: "3", target: "2" }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === currV) state = "active";
          else if (circuitState.includes(idNum)) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = (u === currV && v === nextV);
          if (!active && stackState.length > 1) {
            for (let i = 0; i < stackState.length - 1; i++) {
              if (stackState[i] === u && stackState[i+1] === v) {
                active = true;
                break;
              }
            }
          }
          return { ...e, active };
        })
      };
    }
  }
};
