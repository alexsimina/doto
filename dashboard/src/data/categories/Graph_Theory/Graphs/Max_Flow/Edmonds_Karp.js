export const data = {
  "presentation": "### Algoritmul Edmonds-Karp\n\nAlgoritmul lui Edmonds-Karp reprezintă o implementare specifică a metodei **Ford-Fulkerson** folosind o parcurgere **BFS**. Fluxul pe fiecare muchie este limitat de capacitatea reziduală: $f(u, v) \\le c(u, v)$ în rețea.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V \\cdot E^2)$ - parcurgerea BFS garantează eficiența.\n- **Spațiu:** $O(V + E)$ - stocarea matricilor reziduale.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Tăietură Minimă**: identificată prin vizitabilitatea din sursa $S$.",
  "applications": "### Aplicații Reale\n\n- Logistica transportului de marfuri.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\n\nusing namespace std;\nconst int INF = 1e9;\n\nint bfs(int s, int t, vector<int>& parent, vector<vector<int>>& adj, vector<vector<int>>& capacity) {\n    fill(parent.begin(), parent.end(), -1);\n    parent[s] = -2;\n    queue<pair<int, int>> q;\n    q.push({s, INF});\n\n    while (!q.empty()) {\n        int cur = q.front().first;\n        int flow = q.front().second;\n        q.pop();\n\n        for (int next : adj[cur]) {\n            if (parent[next] == -1 && capacity[cur][next] > 0) {\n                parent[next] = cur;\n                int new_flow = min(flow, capacity[cur][next]);\n                if (next == t) return new_flow;\n                q.push({next, new_flow});\n            }\n        }\n    }\n    return 0;\n}\n\nint edmondsKarp(int s, int t, int V, vector<vector<int>>& adj, vector<vector<int>>& capacity) {\n    int flow = 0;\n    vector<int> parent(V);\n    int new_flow;\n\n    while ((new_flow = bfs(s, t, parent, adj, capacity)) > 0) {\n        flow += new_flow;\n        int cur = t;\n        while (cur != s) {\n            int prev = parent[cur];\n            capacity[prev][cur] -= new_flow;\n            capacity[cur][prev] += new_flow;\n            cur = prev;\n        }\n    }\n    return flow;\n}\n\nint main() {\n    int V = 4;\n    vector<vector<int>> adj(V);\n    vector<vector<int>> cap(V, vector<int>(V, 0));\n    \n    auto add = [&](int u, int v, int c) {\n        adj[u].push_back(v); adj[v].push_back(u);\n        cap[u][v] = c;\n    };\n    add(0, 1, 3); add(0, 2, 2); add(1, 2, 1); add(1, 3, 2); add(2, 3, 3);\n    edmondsKarp(0, 3, V, adj, cap);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 31,
      "text": "Începem algoritmul lui Edmonds-Karp.",
      "blocksVisual": [
        {
          "label": "Start",
          "groups": [
            [
              {
                "val": "s: 0, t: 3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Inițializăm variabila `flow = 0`.",
      "blocksVisual": [
        {
          "label": "Total Flow",
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
      "line": 36,
      "text": "Lansăm primul BFS pentru a căuta un drum de creștere.",
      "blocksVisual": [
        {
          "label": "BFS",
          "groups": [
            [
              {
                "val": "Cautare drum"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm vectorul de părinți cu -1.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Setăm părintele sursei: `parent[0] = -2`.",
      "blocksVisual": [
        {
          "label": "Parents",
          "groups": [
            [
              {
                "val": "parent[0]: -2"
              },
              {
                "val": "parent[1]: -1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Adăugăm sursa în coada BFS cu flux nelimitat (INF).",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{0, INF}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Începem extragerea din coada BFS.",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Extragem starea de pe poziția 0: `cur = 0`, `flow = INF`.",
      "blocksVisual": [
        {
          "label": "Nod curent",
          "groups": [
            [
              {
                "val": "cur: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 0 pe muchiile cu capacitate reziduală pozitivă. Primul vecin este 1 (capacitate 3).",
      "blocksVisual": [
        {
          "label": "Capacitate",
          "groups": [
            [
              {
                "val": "cap[0][1]: 3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Nodul 1 nu este vizitat în acest BFS. Actualizăm `parent[1] = 0`.",
      "blocksVisual": [
        {
          "label": "Parents",
          "groups": [
            [
              {
                "val": "parent[1]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Bottleneck-ul pe această muchie devine `min(INF, 3) = 3`.",
      "blocksVisual": [
        {
          "label": "new_flow",
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
      "line": 24,
      "text": "Adăugăm nodul 1 în coadă: `{1, 3}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{1, 3}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Următorul vecin al lui 0 este 2 (capacitate 2).",
      "blocksVisual": []
    },
    {
      "line": 21,
      "text": "Actualizăm `parent[2] = 0`.",
      "blocksVisual": [
        {
          "label": "Parents",
          "groups": [
            [
              {
                "val": "parent[2]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Calculăm bottleneck-ul: `min(INF, 2) = 2`.",
      "blocksVisual": [
        {
          "label": "new_flow",
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
      "text": "Adăugăm `{2, 2}` în coadă. Coada devine `[{1, 3}, {2, 2}]`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{1, 3}"
              },
              {
                "val": "{2, 2}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Mergem la pasul următor din BFS. Extragem `{1, 3}`. `cur = 1`.",
      "blocksVisual": []
    },
    {
      "line": 20,
      "text": "Vecinii lui 1 sunt 2 (cap 1) și 3 (cap 2). Încercăm vecinul 3 (Destinația).",
      "blocksVisual": []
    },
    {
      "line": 21,
      "text": "Actualizăm `parent[3] = 1`.",
      "blocksVisual": [
        {
          "label": "Parents",
          "groups": [
            [
              {
                "val": "parent[3]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Noul flux stocat pe drum este `min(3, 2) = 2`.",
      "blocksVisual": [
        {
          "label": "new_flow",
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
      "line": 23,
      "text": "Am atins destinația (nodul 3)! Returnăm fluxul maxim găsit pe acest drum: 2.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Întoarcerea din BFS ne oferă un drum de flux 2. Adunăm la fluxul total: `flow = 2`.",
      "blocksVisual": [
        {
          "label": "Total Flow",
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
      "line": 39,
      "text": "Reconstituim calea și actualizăm capacitățile. Scădem 2 unități din muchiile folosite și le adăugăm pe cele inversate.",
      "blocksVisual": []
    },
    {
      "line": 46,
      "text": "Următoarea iterație va găsi drumul 0->2->3 cu flux 2, apoi 0->1->2->3 cu flux 1. Fluxul maxim final este 5.",
      "blocksVisual": [
        {
          "label": "Max Flow",
          "groups": [
            [
              {
                "val": "5",
                "active": true
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
      let flowVal = 0, pathBottleneck = -1, uVal = -1;
      if (stepIndex >= 2) { flowVal = 0; }
      if (stepIndex >= 4) { uVal = 0; pathBottleneck = 10; flowVal = 10; }
      if (stepIndex >= 6) { pathBottleneck = 10; flowVal = 20; }
      globalVars.push({ name: 'source', type: 'int', val: '0', expandable: false });
      globalVars.push({ name: 'sink', type: 'int', val: '3', expandable: false });
      globalVars.push({ name: 'capacity[][]', type: 'int[][]', val: 'Residual capacity matrix', expandable: false });
      vars.push({ name: 'maxFlow', type: 'int', val: flowVal, expandable: false });
      if (uVal !== -1) vars.push({ name: 'u', type: 'int', val: uVal, expandable: false });
      if (pathBottleneck !== -1) vars.push({ name: 'pathFlow', type: 'int', val: pathBottleneck, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 1) frames.unshift({ name: 'edmondsKarp(source=0, sink=3)', file: 'solution.cpp', line: activeLine });
      inlineVal = `maxFlow: ${flowVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
      let uVal = -1;
      if (stepIndex >= 4) { uVal = 0; }

      const staticNodes = [
        { id: "0", x: 50, y: 100, label: "S (0)" },
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 150, y: 150, label: "2" },
        { id: "3", x: 250, y: 100, label: "T (3)" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: "0/3" },
        { source: "0", target: "2", weight: "0/2" },
        { source: "1", target: "2", weight: "0/1" },
        { source: "1", target: "3", weight: "0/2" },
        { source: "2", target: "3", weight: "0/3" }
      ];

      let f01 = 0, f02 = 0, f12 = 0, f13 = 0, f23 = 0;
      if (stepIndex >= 4 && stepIndex < 6) {
        f01 = 2; f13 = 2;
      } else if (stepIndex >= 6 && stepIndex < 8) {
        f01 = 2; f13 = 2; f02 = 2; f23 = 2;
      } else if (stepIndex >= 8) {
        f01 = 3; f12 = 1; f23 = 3; f13 = 2; f02 = 2;
      }

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (stepIndex >= 8) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          let flow = 0;
          let cap = 0;
          if (e.source === "0" && e.target === "1") { flow = f01; cap = 3; }
          else if (e.source === "0" && e.target === "2") { flow = f02; cap = 2; }
          else if (e.source === "1" && e.target === "2") { flow = f12; cap = 1; }
          else if (e.source === "1" && e.target === "3") { flow = f13; cap = 2; }
          else if (e.source === "2" && e.target === "3") { flow = f23; cap = 3; }
          
          let active = false;
          if (stepIndex >= 4 && stepIndex < 6 && (e.source === "0" && e.target === "1" || e.source === "1" && e.target === "3")) active = true;
          if (stepIndex >= 6 && stepIndex < 8 && (e.source === "0" && e.target === "2" || e.source === "2" && e.target === "3")) active = true;
          if (stepIndex >= 8 && (e.source === "0" && e.target === "1" || e.source === "1" && e.target === "2" || e.source === "2" && e.target === "3")) active = true;

          return { ...e, weight: `${flow}/${cap}`, active };
        })
      };
    }
  }
};
