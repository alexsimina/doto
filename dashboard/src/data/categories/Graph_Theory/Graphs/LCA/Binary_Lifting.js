export const data = {
  "presentation": "### LCA prin Binary Lifting\n\nTehnica **Binary Lifting** determină Lowest Common Ancestor (LCA) al unui arbore stocând pentru fiecare nod $v$ strămoșii situați la distanțe puteri ale lui 2 în sus:\n$$up[v][j] = \\text{strămoșul de pe nivelul } 2^j \\text{ al lui } v$$",
  "complexity": "### Complexitate\n\n- **Timp:** Preprocesare în $O(N \\log N)$, interogare în $O(\\log N)$.\n- **Spațiu:** $O(N \\log N)$ - pentru tabelul `up`.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Interogări pe muchii**: putere a lui 2 minim/maxim pe un drum.",
  "applications": "### Aplicații Reale\n\n- Distanțe între noduri în structuri ierarhice complexe.",
  "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nconst int LOG = 14;\nvector<int> adj[1005];\nint up[1005][LOG];\nint depth[1005];\n\nvoid dfs(int v, int p) {\n    up[v][0] = p;\n    for (int j = 1; j < LOG; ++j) {\n        if (up[v][j-1] != -1)\n            up[v][j] = up[up[v][j-1]][j-1];\n        else\n            up[v][j] = -1;\n    }\n    \n    for (int u : adj[v]) {\n        if (u != p) {\n            depth[u] = depth[v] + 1;\n            dfs(u, v);\n        }\n    }\n}\n\nint get_lca(int u, int v) {\n    if (depth[u] < depth[v]) swap(u, v);\n    \n    int diff = depth[u] - depth[v];\n    for (int j = LOG - 1; j >= 0; --j) {\n        if ((diff >> j) & 1) {\n            u = up[u][j];\n        }\n    }\n    \n    if (u == v) return u;\n    \n    for (int j = LOG - 1; j >= 0; --j) {\n        if (up[u][j] != up[v][j]) {\n            u = up[u][j];\n            v = up[v][j];\n        }\n    }\n    return up[u][0];\n}\n\nint main() {\n    adj[1] = {2, 3}; adj[2] = {1, 4, 5}; adj[3] = {1, 6};\n    adj[4] = {2}; adj[5] = {2}; adj[6] = {3};\n    \n    depth[1] = 0;\n    for(int i=0; i<=6; i++) for(int j=0; j<LOG; j++) up[i][j] = -1;\n    \n    dfs(1, -1);\n    get_lca(4, 5);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 55,
      "text": "Inițializăm matricea `up` cu -1.",
      "blocksVisual": []
    },
    {
      "line": 57,
      "text": "Lansăm DFS din rădăcina 1 cu părintele fictiv -1.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Intrăm în DFS pentru nodul 1. Părintele său direct este -1: `up[1][0] = -1`.",
      "blocksVisual": [
        {
          "label": "up[1]",
          "groups": [
            [
              {
                "val": "up[1][0]: -1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Completăm restul puterilor pentru nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 18,
      "text": "Explorăm copiii nodului 1. Primul copil este 2.",
      "blocksVisual": [
        {
          "label": "Copil",
          "groups": [
            [
              {
                "val": "u: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Setăm adâncimea copilului: `depth[2] = depth[1] + 1 = 1`.",
      "blocksVisual": [
        {
          "label": "Depth",
          "groups": [
            [
              {
                "val": "depth[2]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Apelăm recursiv `dfs(2, 1)`.",
      "blocksVisual": [
        {
          "label": "DFS",
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
      "line": 11,
      "text": "Setăm `up[2][0] = 1`.",
      "blocksVisual": [
        {
          "label": "up[2]",
          "groups": [
            [
              {
                "val": "up[2][0]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Construim salturile pentru nodul 2. `up[2][1] = up[up[2][0]][0] = up[1][0] = -1`.",
      "blocksVisual": [
        {
          "label": "up[2]",
          "groups": [
            [
              {
                "val": "up[2][0]: 1"
              },
              {
                "val": "up[2][1]: -1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Din 2, vizităm copilul 4. Setăm `depth[4] = 2`, `up[4][0] = 2`.",
      "blocksVisual": [
        {
          "label": "up[4]",
          "groups": [
            [
              {
                "val": "up[4][0]: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Calculăm salturile pentru 4: `up[4][1] = up[up[4][0]][0] = up[2][0] = 1`.",
      "blocksVisual": [
        {
          "label": "up[4]",
          "groups": [
            [
              {
                "val": "up[4][0]: 2"
              },
              {
                "val": "up[4][1]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 58,
      "text": "După finalizarea preprocesării pentru tot arborele, apelăm `get_lca(4, 5)`.",
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
      "line": 26,
      "text": "Intrăm în funcția de aflare a LCA.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Verificăm dacă `depth[4] < depth[5]`. Sunt la aceeași adâncime (2), deci nu facem swap.",
      "blocksVisual": [
        {
          "label": "Depth check",
          "groups": [
            [
              {
                "val": "depth[4]: 2"
              },
              {
                "val": "depth[5]: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Calculăm diferența de nivel: `diff = 0`.",
      "blocksVisual": [
        {
          "label": "diff",
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
      "line": 30,
      "text": "Deoarece diferența este 0, bucla de egalare a nivelelor nu urcă niciun nod.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Verificăm dacă nodurile sunt egale: `4 == 5` este fals.",
      "blocksVisual": []
    },
    {
      "line": 40,
      "text": "Pornim căutarea în paralel, scăzând puterile lui 2 din vârful tabelului `j = 13`.",
      "blocksVisual": [
        {
          "label": "Salt",
          "groups": [
            [
              {
                "val": "j: 13"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Deoarece de la o distanță mare strămoșii lor sunt identici (-1), continuăm descreșterea lui `j`.",
      "blocksVisual": []
    },
    {
      "line": 41,
      "text": "Ajungem la `j = 0`. Strămoșul de pe nivelul $2^0 = 1$ în sus este `up[4][0] = 2` și `up[5][0] = 2`. Fiind egali, nu urcăm.",
      "blocksVisual": []
    },
    {
      "line": 46,
      "text": "Încheiem bucla. Nodurile se află deasupra direct sub LCA-ul lor.",
      "blocksVisual": []
    },
    {
      "line": 47,
      "text": "Returnăm părintele direct al lui `u`, care este `up[4][0] = 2`.",
      "blocksVisual": [
        {
          "label": "LCA Rezultat",
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
      let nodeVal = -1, depthVal = -1, ansVal = -1;
      if (stepIndex >= 1) { nodeVal = 0; depthVal = 0; }
      if (stepIndex >= 3) { nodeVal = 1; depthVal = 1; }
      if (stepIndex >= 5) { nodeVal = 3; depthVal = 2; }
      if (stepIndex >= 7) { nodeVal = 4; depthVal = 2; }
      if (stepIndex >= 9) { ansVal = 1; }
      if (stepIndex >= 11) { ansVal = 0; }
      globalVars.push({ name: 'up[MAXN][LOGN]', type: 'int[][]', val: 'Binary lifting ancestor table', expandable: false });
      globalVars.push({ name: 'depth', type: 'int[MAXN]', val: '{0, 1, 1, 2, 2}', expandable: false });
      if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
      if (depthVal !== -1) vars.push({ name: 'dep', type: 'int', val: depthVal, expandable: false });
      if (ansVal !== -1) vars.push({ name: 'lca', type: 'int', val: ansVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      frames.unshift({ name: stepIndex >= 9 ? 'lca(u, v)' : `dfs(node=${nodeVal !== -1 ? nodeVal : 0}, parent, dep)`, file: 'solution.cpp', line: activeLine });
      if (ansVal !== -1) inlineVal = `lca: ${ansVal}`;
      else if (nodeVal !== -1) inlineVal = `node: ${nodeVal}, depth: ${depthVal}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
      let nodeVal = -1, ansVal = -1;
      if (stepIndex >= 1) { nodeVal = 0; }
      if (stepIndex >= 3) { nodeVal = 1; }
      if (stepIndex >= 5) { nodeVal = 3; }
      if (stepIndex >= 7) { nodeVal = 4; }
      if (stepIndex >= 9) { ansVal = 1; }
      if (stepIndex >= 11) { ansVal = 0; }

      const staticNodes = [
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 100, y: 100, label: "2" },
        { id: "3", x: 200, y: 100, label: "3" },
        { id: "4", x: 50, y: 150, label: "4" },
        { id: "5", x: 150, y: 150, label: "5" },
        { id: "6", x: 250, y: 150, label: "6" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "2", target: "4" },
        { source: "2", target: "5" },
        { source: "3", target: "6" }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal + 1) state = "active";
          else if (idNum === ansVal + 1) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges
      };
    }
  }
};
