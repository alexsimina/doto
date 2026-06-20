export const data = {
  "presentation": "### Algoritmul lui Prim (MST)\n\nAlgoritmul lui Prim construiește Arborele Parțial de Cost Minim (MST) pornind de la un singur nod rădăcină și extinzând progresiv arborele. La fiecare pas, se selectează o muchie minimă $e = (u, v)$ unde $u \\in \\text{MST}$ și $v \\notin \\text{MST}$.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(E \\log V)$ - cu priority queue.\n- **Spațiu:** $O(V + E)$ - memorarea grafului.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Varianta cu tablou**: utilă pe grafuri dense, având complexitate $O(V^2)$.",
  "applications": "### Aplicații Reale\n\n- Optimizarea cablurilor de rețea.",
  "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\ntypedef pair<int, int> pii;\nconst int MAXN = 10005;\nvector<pii> adj[MAXN];\nbool inMST[MAXN];\n\nint prim(int start, int V) {\n    priority_queue<pii, vector<pii>, greater<pii>> pq;\n    int totalCost = 0;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        int cost = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        \n        if (inMST[u]) continue;\n        \n        inMST[u] = true;\n        totalCost += cost;\n        \n        for (auto edge : adj[u]) {\n            int v = edge.second;\n            int w = edge.first;\n            if (!inMST[v]) {\n                pq.push({w, v});\n            }\n        }\n    }\n    return totalCost;\n}\n\nint main() {\n    int V = 4;\n    adj[0].push_back({4, 1}); adj[1].push_back({4, 0});\n    adj[0].push_back({1, 2}); adj[2].push_back({1, 0});\n    adj[1].push_back({2, 2}); adj[2].push_back({2, 1});\n    adj[1].push_back({5, 3}); adj[3].push_back({5, 1});\n    adj[2].push_back({8, 3}); adj[3].push_back({8, 2});\n    prim(0, V);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 12,
      "text": "Începem executarea algoritmului lui Prim.",
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
      "line": 13,
      "text": "Inițializăm coada de priorități `pq` (min-heap).",
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
      "line": 14,
      "text": "Setăm `totalCost = 0`.",
      "blocksVisual": [
        {
          "label": "totalCost",
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
      "text": "Introducem nodul de pornire 0 în heap cu costul 0.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{0, 0}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Intrăm în buclă: coada nu este goală.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{0, 0}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Preluăm muchia din vârful heap-ului: cost = 0.",
      "blocksVisual": [
        {
          "label": "cost",
          "groups": [
            [
              {
                "val": "cost: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Preluăm nodul țintă: `u = 0`.",
      "blocksVisual": [
        {
          "label": "u",
          "groups": [
            [
              {
                "val": "u: 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Pop din coadă.",
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
      "line": 22,
      "text": "Verificăm dacă nodul 0 este deja în MST. Nu este vizitat.",
      "blocksVisual": [
        {
          "label": "inMST check",
          "groups": [
            [
              {
                "val": "inMST[0]: false"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adăugăm nodul 0 la MST: `inMST[0] = true`.",
      "blocksVisual": [
        {
          "label": "inMST",
          "groups": [
            [
              {
                "val": "inMST[0]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Adunăm costul curent: `totalCost` rămâne 0.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Parcurgem vecinii nodului 0: 1 (cost 4) și 2 (cost 1).",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 1"
              },
              {
                "val": "v: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Nodul 1 nu este în MST, îl punem în heap: `{4, 1}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{4, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Nodul 2 nu este în MST, îl punem în heap: `{1, 2}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{1, 2}"
              },
              {
                "val": "{4, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Reluăm bucla. Heap-ul scoate muchia minimă: `{1, 2}`.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{1, 2}"
              },
              {
                "val": "{4, 1}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Extragem nodul `u = 2` cu `cost = 1`.",
      "blocksVisual": [
        {
          "label": "u",
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
      "line": 24,
      "text": "Marcăm `inMST[2] = true`.",
      "blocksVisual": [
        {
          "label": "inMST",
          "groups": [
            [
              {
                "val": "inMST[2]: true",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Actualizăm `totalCost = 0 + 1 = 1`.",
      "blocksVisual": [
        {
          "label": "totalCost",
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
      "line": 27,
      "text": "Explorăm vecinii lui 2: 1 (cost 2) și 3 (cost 8).",
      "blocksVisual": []
    },
    {
      "line": 30,
      "text": "Punem `{2, 1}` și `{8, 3}` în heap.",
      "blocksVisual": [
        {
          "label": "Queue",
          "groups": [
            [
              {
                "val": "{2, 1}"
              },
              {
                "val": "{4, 1}"
              },
              {
                "val": "{8, 3}"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Etapa următoare extrage `{2, 1}`, adăugând nodul 1 la MST cu costul 2. La final se adaugă nodul 3 cu costul 5. Cost final = 8.",
      "blocksVisual": [
        {
          "label": "Cost Final",
          "groups": [
            [
              {
                "val": "8"
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
      const inMST = [false, false, false, false];
      let uVal = -1, costVal = -1, totalCost = 0;
      const pqState = [];
      if (stepIndex >= 2) { pqState.push('{0,0}'); }
      if (stepIndex >= 3) { uVal = 0; costVal = 0; inMST[0] = true; pqState.length = 0; }
      if (stepIndex >= 4) { pqState.push('{1,2}'); pqState.push('{4,1}'); }
      if (stepIndex >= 5) { uVal = 2; costVal = 1; inMST[2] = true; totalCost = 1; pqState.length = 0; }
      if (stepIndex >= 6) { pqState.push('{2,1}'); pqState.push('{8,3}'); }
      if (stepIndex >= 7) { uVal = 1; costVal = 2; inMST[1] = true; totalCost = 3; }
      if (stepIndex >= 8) { pqState.push('{5,3}'); }
      if (stepIndex >= 9) { uVal = 3; costVal = 5; inMST[3] = true; totalCost = 8; }
      globalVars.push({ name: 'adj[]', type: 'vector<pii>[MAXN]', val: '4-node weighted graph', expandable: true });
      globalVars.push({ name: 'inMST', type: 'bool[MAXN]', val: `{${inMST.map(b => b ? 'T' : 'F').join(', ')}}`, expandable: false });
      vars.push({ name: 'pq', type: 'priority_queue<pii>', val: pqState.length > 0 ? pqState.join(', ') : 'empty', expandable: false });
      vars.push({ name: 'totalCost', type: 'int', val: totalCost, expandable: false });
      if (uVal !== -1) vars.push({ name: 'u', type: 'int', val: uVal, expandable: false });
      if (costVal !== -1) vars.push({ name: 'cost', type: 'int', val: costVal, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: 37 });
      if (stepIndex >= 1) frames.unshift({ name: 'prim(start=0, V=4)', file: 'solution.cpp', line: activeLine });
      if (uVal !== -1) inlineVal = `u: ${uVal}, cost: ${costVal}, total: ${totalCost}`;
      else inlineVal = `totalCost: ${totalCost}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getGraphVisual": (stepIndex) => {
      let uVal = -1;
      if (stepIndex >= 3) { uVal = 0; }
      if (stepIndex >= 5) { uVal = 2; }
      if (stepIndex >= 7) { uVal = 1; }
      if (stepIndex >= 9) { uVal = 3; }

      const staticNodes = [
        { id: "0", x: 100, y: 50, label: "0" },
        { id: "1", x: 200, y: 50, label: "1" },
        { id: "2", x: 100, y: 150, label: "2" },
        { id: "3", x: 200, y: 150, label: "3" }
      ];
      const staticEdges = [
        { source: "0", target: "1", weight: 4 },
        { source: "0", target: "2", weight: 1 },
        { source: "1", target: "2", weight: 2 },
        { source: "1", target: "3", weight: 5 },
        { source: "2", target: "3", weight: 8 }
      ];

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (stepIndex >= 9) state = "visited";
          else if (stepIndex >= 7 && idNum !== 3) state = "visited";
          else if (stepIndex >= 5 && (idNum === 0 || idNum === 2)) state = "visited";
          else if (stepIndex >= 3 && idNum === 0) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = false;
          if (stepIndex >= 9 && ((u === 0 && v === 2) || (u === 1 && v === 2) || (u === 1 && v === 3))) active = true;
          else if (stepIndex >= 7 && ((u === 0 && v === 2) || (u === 1 && v === 2))) active = true;
          else if (stepIndex >= 5 && (u === 0 && v === 2)) active = true;
          return { ...e, active };
        })
      };
    }
  }
};
