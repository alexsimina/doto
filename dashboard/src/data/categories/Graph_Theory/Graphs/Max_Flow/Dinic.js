export const data = {
  "presentation": "### Algoritmul lui Dinic\n\nAlgoritmul lui Dinic folosește un Graf pe Niveluri pentru a găsi fluxuri de blocare. Nivelurile nodurilor se mențin cu relația $level[v] = level[u] + 1$ în mod repetat.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V^2 \\cdot E)$ - în general, $O(E \\sqrt{V})$ pe rețele cu capacități unitare.\n- **Spațiu:** $O(V + E)$.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Scaling Dinic**: optimizare folosind biți de capacitate maximă.",
  "applications": "### Aplicații Reale\n\n- Cuplaje în grafuri bipartite, segmentare imagini.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nstruct Edge {\n    int to, cap, flow, rev;\n};\n\nconst int MAXN = 100;\nvector<Edge> adj[MAXN];\nint level[MAXN];\nint ptr[MAXN];\n\nvoid addEdge(int from, int to, int cap) {\n    adj[from].push_back({to, cap, 0, (int)adj[to].size()});\n    adj[to].push_back({from, 0, 0, (int)adj[from].size() - 1});\n}\n\nbool bfs(int s, int t) {\n    fill(level, level + MAXN, -1);\n    level[s] = 0;\n    queue<int> q;\n    q.push(s);\n    \n    while(!q.empty()) {\n        int v = q.front(); q.pop();\n        for(auto edge : adj[v]) {\n            if(edge.cap - edge.flow > 0 && level[edge.to] == -1) {\n                level[edge.to] = level[v] + 1;\n                q.push(edge.to);\n            }\n        }\n    }\n    return level[t] != -1;\n}\n\nint dfs(int v, int t, int pushed) {\n    if(pushed == 0) return 0;\n    if(v == t) return pushed;\n    \n    for(int& cid = ptr[v]; cid < adj[v].size(); ++cid) {\n        auto& edge = adj[v][cid];\n        int tr = edge.to;\n        if(level[v] + 1 != level[tr] || edge.cap - edge.flow == 0) continue;\n        \n        int push = dfs(tr, t, min(pushed, edge.cap - edge.flow));\n        if(push == 0) continue;\n        \n        edge.flow += push;\n        adj[tr][edge.rev].flow -= push;\n        return push;\n    }\n    return 0;\n}\n\nint dinic(int s, int t) {\n    int flow = 0;\n    while(bfs(s, t)) {\n        fill(ptr, ptr + MAXN, 0);\n        while(int pushed = dfs(s, t, 1e9)) {\n            flow += pushed;\n        }\n    }\n    return flow;\n}\n\nint main() {\n    addEdge(0, 1, 3);\n    addEdge(0, 2, 2);\n    addEdge(1, 2, 1);\n    addEdge(1, 3, 2);\n    addEdge(2, 3, 3);\n    dinic(0, 3);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 55,
      "text": "Începem algoritmul lui Dinic pentru max flow.",
      "blocksVisual": [
        {
          "label": "Dinic",
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
      "line": 56,
      "text": "Inițializăm `flow = 0`.",
      "blocksVisual": [
        {
          "label": "Flow",
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
      "line": 57,
      "text": "Lansăm BFS pentru a determina graful pe niveluri. Verificăm dacă destinația 3 este vizitabilă.",
      "blocksVisual": []
    },
    {
      "line": 21,
      "text": "Resetăm nivelurile tuturor nodurilor la -1.",
      "blocksVisual": [
        {
          "label": "Niveluri",
          "groups": [
            [
              {
                "val": "level[0]: -1"
              },
              {
                "val": "level[1]: -1"
              },
              {
                "val": "level[2]: -1"
              },
              {
                "val": "level[3]: -1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Sursa 0 primește nivelul 0: `level[0] = 0`.",
      "blocksVisual": [
        {
          "label": "Niveluri",
          "groups": [
            [
              {
                "val": "level[0]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adăugăm sursa 0 în coadă.",
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
      "line": 26,
      "text": "Începem bucla de BFS. Extragem nodul 0.",
      "blocksVisual": []
    },
    {
      "line": 28,
      "text": "Parcurgem muchiile de ieșire ale nodului 0. Primul vecin este 1 (cap 3).",
      "blocksVisual": []
    },
    {
      "line": 29,
      "text": "Deoarece `level[1]` este -1 și mai avem capacitate, setăm `level[1] = level[0] + 1 = 1`.",
      "blocksVisual": [
        {
          "label": "Niveluri",
          "groups": [
            [
              {
                "val": "level[1]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
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
      "line": 28,
      "text": "Al doilea vecin al lui 0 este nodul 2 (cap 2).",
      "blocksVisual": []
    },
    {
      "line": 29,
      "text": "Setăm `level[2] = 1`.",
      "blocksVisual": [
        {
          "label": "Niveluri",
          "groups": [
            [
              {
                "val": "level[2]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Adăugăm nodul 2 în coadă. Coada are `[1, 2]`.",
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
      "line": 26,
      "text": "Extragem 1 din coadă. Vecinii săi sunt 2 (nivel deja setat) și 3 (Destinația).",
      "blocksVisual": []
    },
    {
      "line": 29,
      "text": "Setăm `level[3] = level[1] + 1 = 2`.",
      "blocksVisual": [
        {
          "label": "Niveluri",
          "groups": [
            [
              {
                "val": "level[3]: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Destinația 3 este vizitabilă. BFS returnează `true`.",
      "blocksVisual": []
    },
    {
      "line": 58,
      "text": "Resetăm pointerii de optimizare `ptr` pe 0 pentru toate nodurile.",
      "blocksVisual": [
        {
          "label": "ptr",
          "groups": [
            [
              {
                "val": "ptr[0]: 0"
              },
              {
                "val": "ptr[1]: 0"
              },
              {
                "val": "ptr[2]: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 59,
      "text": "Lansăm DFS pentru a găsi fluxuri de blocare. Trimitem flux nelimitat de la 0.",
      "blocksVisual": [
        {
          "label": "DFS",
          "groups": [
            [
              {
                "val": "Start DFS"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Intrăm în DFS din nodul 0.",
      "blocksVisual": [
        {
          "label": "Nod",
          "groups": [
            [
              {
                "val": "v: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 40,
      "text": "Folosim pointerul `ptr[0]` pentru a explora muchiile lui 0. Începem cu prima muchie (0->1).",
      "blocksVisual": []
    },
    {
      "line": 43,
      "text": "Mergem pe calea 0->1 deoarece `level[0] + 1 == level[1] == 1`.",
      "blocksVisual": []
    },
    {
      "line": 45,
      "text": "Apelăm recursiv `dfs(1, t, min(INF, 3))` pentru a trimite maxim 3 unități de flux.",
      "blocksVisual": [
        {
          "label": "DFS",
          "groups": [
            [
              {
                "val": "v: 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 45,
      "text": "Din nodul 1, explorăm drumul spre 3. Trimitem 2 unități (limitare pe muchia 1->3).",
      "blocksVisual": []
    },
    {
      "line": 63,
      "text": "Această fază de DFS se încheie cu succes. Continuăm cu o nouă re-evaluare a nivelurilor până când nu mai putem trimite flux. Max flow total este 5.",
      "blocksVisual": [
        {
          "label": "Final Flow",
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
      let flowVal = 0;
      const level = [-1, -1, -1, -1];
      if (stepIndex >= 2) { level[0] = 0; level[1] = 1; level[2] = 1; level[3] = 2; }
      if (stepIndex >= 4) { flowVal = 10; }
      if (stepIndex >= 6) { flowVal = 20; }
      globalVars.push({ name: 'level', type: 'int[MAXN]', val: `{${level.map(v => v === -1 ? '-' : v).join(', ')}}`, expandable: false });
      globalVars.push({ name: 'ptr', type: 'int[MAXN]', val: 'Next edge pointer per node', expandable: false });
      vars.push({ name: 'flow', type: 'int', val: flowVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 1) frames.unshift({ name: 'dinicMaxFlow(source=0, sink=3)', file: 'solution.cpp', line: activeLine });
      inlineVal = `flow: ${flowVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
      let flowVal = 0;
      const level = [-1, -1, -1, -1];
      if (stepIndex >= 2) { level[0] = 0; level[1] = 1; level[2] = 1; level[3] = 2; }
      if (stepIndex >= 4) { flowVal = 10; }
      if (stepIndex >= 6) { flowVal = 20; }

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
          if (stepIndex >= 2 && level[idNum] !== -1) state = "visited";
          let safeDesc = undefined;
          if (stepIndex >= 2) {
             safeDesc = "L=" + (level[idNum] !== -1 ? level[idNum] : "-");
          }
          return { ...n, state, desc: safeDesc };
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
