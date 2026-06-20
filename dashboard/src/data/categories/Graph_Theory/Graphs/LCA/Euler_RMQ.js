export const data = {
  "presentation": "### LCA prin Euler Tour + RMQ\n\nAceastă tehnică reduce problema LCA la o problemă de tip **RMQ** (Range Minimum Query) pe un șir reprezentând adâncimile nodurilor parcurse în modul Euler. Formula centrală este: $\\text{LCA}(u, v) = \\text{euler}[\\text{RMQ}(\\text{depth}, \\text{first\\_occ}[u], \\text{first\\_occ}[v])]$.",
  "complexity": "### Complexitate\n\n- **Timp:** Preprocesare în $O(N \\log N)$, interogare în $O(1)$.\n- **Spațiu:** $O(N \\log N)$ - Sparse Table.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Block RMQ**: reducerea preprocesării la $O(N)$.",
  "applications": "### Aplicații Reale\n\n- Interogări LCA rapide în sisteme de navigare pe arbori.",
  "code": "#include <iostream>\n#include <vector>\n#include <cmath>\n\nusing namespace std;\n\nconst int MAXN = 1005;\nvector<int> adj[MAXN];\nint euler[2005], depth[2005], first_occ[MAXN];\nint timer = 0;\nint sparse[2005][12];\n\nvoid dfs(int u, int p, int d) {\n    first_occ[u] = timer;\n    euler[timer] = u;\n    depth[timer] = d;\n    timer++;\n    \n    for (int v : adj[u]) {\n        if (v != p) {\n            dfs(v, u, d + 1);\n            euler[timer] = u;\n            depth[timer] = d;\n            timer++;\n        }\n    }\n}\n\nvoid buildRMQ(int n) {\n    for (int i = 0; i < n; i++) sparse[i][0] = i;\n    for (int j = 1; (1 << j) <= n; j++) {\n        for (int i = 0; i + (1 << j) - 1 < n; i++) {\n            int idx1 = sparse[i][j - 1];\n            int idx2 = sparse[i + (1 << (j - 1))][j - 1];\n            if (depth[idx1] < depth[idx2]) sparse[i][j] = idx1;\n            else sparse[i][j] = idx2;\n        }\n    }\n}\n\nint queryRMQ(int l, int r) {\n    if (l > r) swap(l, r);\n    int j = log2(r - l + 1);\n    int idx1 = sparse[l][j];\n    int idx2 = sparse[r - (1 << j) + 1][j];\n    if (depth[idx1] < depth[idx2]) return euler[idx1];\n    return euler[idx2];\n}\n\nint get_lca(int u, int v) {\n    return queryRMQ(first_occ[u], first_occ[v]);\n}\n\nint main() {\n    adj[1] = {2, 3}; adj[2] = {1, 4, 5}; adj[3] = {1};\n    adj[4] = {2}; adj[5] = {2};\n    dfs(1, 0, 0);\n    buildRMQ(timer);\n    get_lca(4, 5);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 55,
      "text": "Începem parcurgerea DFS din rădăcina 1 cu adâncimea 0.",
      "blocksVisual": [
        {
          "label": "DFS",
          "groups": [
            [
              {
                "val": "start: 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Setăm prima apariție a rădăcinii: `first_occ[1] = 0`.",
      "blocksVisual": [
        {
          "label": "first_occ[1]",
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
      "text": "Înregistrăm nodul 1 în șirul euler.",
      "blocksVisual": [
        {
          "label": "euler",
          "groups": [
            [
              {
                "val": "euler[0]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Înregistrăm adâncimea nodului 1: `depth[0] = 0`.",
      "blocksVisual": [
        {
          "label": "depth",
          "groups": [
            [
              {
                "val": "depth[0]: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Incrementăm `timer`-ul parcurgerii Euler.",
      "blocksVisual": [
        {
          "label": "timer",
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
      "text": "Vizităm primul vecin al lui 1, nodul 2.",
      "blocksVisual": [
        {
          "label": "Copil",
          "groups": [
            [
              {
                "val": "v: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Apelăm `dfs(2, 1, 1)`.",
      "blocksVisual": [
        {
          "label": "Apel DFS",
          "groups": [
            [
              {
                "val": "dfs(2)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Setăm prima apariție a lui 2: `first_occ[2] = 1`.",
      "blocksVisual": [
        {
          "label": "first_occ[2]",
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
      "text": "Adăugăm nodul 2 în vectorul `euler` pe poziția `timer` (1).",
      "blocksVisual": [
        {
          "label": "euler",
          "groups": [
            [
              {
                "val": "euler[0]: 1"
              },
              {
                "val": "euler[1]: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Intrăm recursiv din 2 în 4. `first_occ[4] = 2`, `euler[2] = 4`, `depth[2] = 2`.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "După explorarea lui 4, ne întoarcem în 2 și înregistrăm din nou nodul 2 în șirul euler.",
      "blocksVisual": [
        {
          "label": "euler",
          "groups": [
            [
              {
                "val": "euler[2]: 4"
              },
              {
                "val": "euler[3]: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Intrăm în al doilea copil al lui 2, nodul 5. `first_occ[5] = 4`, `euler[4] = 5`, `depth[4] = 2`.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "Ne întoarcem în 2. Adăugăm 2 în `euler` la poziția 5.",
      "blocksVisual": [
        {
          "label": "euler",
          "groups": [
            [
              {
                "val": "euler[4]: 5"
              },
              {
                "val": "euler[5]: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Ne întoarcem din 2 în 1. Adăugăm 1 în `euler` la poziția 6.",
      "blocksVisual": [
        {
          "label": "euler",
          "groups": [
            [
              {
                "val": "euler[5]: 2"
              },
              {
                "val": "euler[6]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Parcurgem celălalt copil al lui 1, nodul 3. `first_occ[3] = 7`, `euler[7] = 3`, `depth[7] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "Revenim în 1. Adăugăm 1 în `euler` la poziția 8. Parcurgerea se încheie.",
      "blocksVisual": [
        {
          "label": "euler",
          "groups": [
            [
              {
                "val": "euler[7]: 3"
              },
              {
                "val": "euler[8]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 58,
      "text": "Construim tabelul Sparse pentru interogări RMQ.",
      "blocksVisual": []
    },
    {
      "line": 59,
      "text": "Apelăm `get_lca(4, 5)` pentru a determina strămoșul comun.",
      "blocksVisual": [
        {
          "label": "LCA",
          "groups": [
            [
              {
                "val": "u: 4, v: 5"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 49,
      "text": "Aflăm intervalul dintre primele apariții ale nodurilor 4 și 5: de la `first_occ[4] = 2` la `first_occ[5] = 4`.",
      "blocksVisual": [
        {
          "label": "Interval",
          "groups": [
            [
              {
                "val": "L: 2, R: 4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Interogăm RMQ pe intervalul $[2, 4]$. Lungimea este 3, deci luăm puterea `j = 1` (salt de lungime 2).",
      "blocksVisual": []
    },
    {
      "line": 44,
      "text": "Comparăm minimul din prima parte $[2, 3]$ (nodul cu adâncimea minimă este 2) cu cel din a doua parte $[3, 4]$ (tot nodul 2).",
      "blocksVisual": []
    },
    {
      "line": 45,
      "text": "Nodul cu adâncime minimă pe interval este 2. Acesta este LCA-ul! Răspuns: 2.",
      "blocksVisual": [
        {
          "label": "LCA",
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
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let nodeVal = -1;
      const eulerArr = [];
      if (stepIndex >= 1) { nodeVal = 0; eulerArr.push(0); }
      if (stepIndex >= 3) { nodeVal = 1; eulerArr.push(1); }
      if (stepIndex >= 5) { nodeVal = 3; eulerArr.push(3); }
      if (stepIndex >= 7) { eulerArr.push(1); }
      if (stepIndex >= 9) { nodeVal = 4; eulerArr.push(4); }
      if (stepIndex >= 11) { eulerArr.push(0); }
      globalVars.push({ name: 'euler', type: 'std::vector<int>', val: eulerArr.length > 0 ? `[${eulerArr.join(', ')}]` : '[]', expandable: false });
      globalVars.push({ name: 'st[MAXN][LOGN]', type: 'int[][]', val: 'Sparse Table for RMQ', expandable: false });
      if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      frames.unshift({ name: stepIndex >= 9 ? 'queryLCA(u, v)' : `dfsEuler(node=${nodeVal !== -1 ? nodeVal : 0})`, file: 'solution.cpp', line: activeLine });
      if (nodeVal !== -1) inlineVal = `node: ${nodeVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
      let nodeVal = -1;
      if (stepIndex >= 1) { nodeVal = 0; }
      if (stepIndex >= 3) { nodeVal = 1; }
      if (stepIndex >= 5) { nodeVal = 3; }
      if (stepIndex >= 9) { nodeVal = 4; }

      const staticNodes = [
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 100, y: 100, label: "2" },
        { id: "3", x: 200, y: 100, label: "3" },
        { id: "4", x: 50, y: 150, label: "4" },
        { id: "5", x: 150, y: 150, label: "5" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "2", target: "4" },
        { source: "2", target: "5" }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal + 1) state = "active";
          return { ...n, state };
        }),
        edges: staticEdges
      };
    }
  }
};
