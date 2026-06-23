export const data = {
  "presentation": `### Prezentare Generală

Diametrul unui arbore este definit ca fiind distanța maximă dintre oricare două noduri ale arborelui (lungimea celui mai lung drum simplu). Spre deosebire de un graf general, unde determinarea drumului maxim este o problemă NP-hard, în arbore proprietatea de aciclicitate ne permite să determinăm diametrul în timp liniar $O(N)$ folosind doar două parcurgeri de tip BFS (sau DFS).

Algoritmul clasic (metoda celor două scanări) constă în:
1. Pornirea unei parcurgeri în lățime (BFS) din orice nod arbitrar $X$. Identificăm nodul $Y$ aflat la distanța maximă față de $X$.
2. Pornirea unei a doua parcurgeri în lățime (BFS) având ca punct de start chiar nodul $Y$. Identificăm nodul $Z$ aflat la distanța maximă de $Y$.
3. Distanța dintre $Y$ și $Z$ reprezintă exact diametrul arborelui.

Această proprietate se bazează pe faptul că nodul cel mai îndepărtat de orice nod din arbore va fi întotdeauna unul dintre capetele unui diametru.`,
  "complexity": `### Complexitate

Pentru un arbore cu $N$ noduri și $N-1$ muchii:
- **Timp:** $O(N)$ — realizăm exact două parcurgeri BFS. Fiecare parcurgere vizitează fiecare nod și fiecare muchie exact o singură dată.
- **Spațiu:** $O(N)$ — necesar pentru lista de adiacență, coada BFS și matricea/vectorul de distanțe.`,
  "variations": `### Variații și Edge Cases

1. **Arbore cu 1 nod:** Diametrul este $0$.
2. **Arbori cu muchii ponderate:** Algoritmul celor două parcurgeri BFS funcționează la fel și în cazul în care muchiile au costuri pozitive (în loc de adăugarea $+1$ la distanță, adăugăm ponderea muchiei).
3. **Programare dinamică pe arbori:** O metodă alternativă de determinare a diametrului folosește programarea dinamică, calculând pentru fiecare nod $U$ cele mai lungi două drumuri descendente. Această abordare funcționează și pe muchii cu ponderi negative.`,
  "applications": `### Aplicații

- Determinarea „centrului” unui arbore (nodul care minimizează distanța maximă către orice alt nod).
- Probleme de rețelistică, unde vrem să minimizăm întârzierea maximă a transmiterii semnalelor între două puncte finale.
- Determinarea razei și a excentricității nodurilor într-o rețea fără cicluri.`,
  "code": `
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

pair<int, int> bfs(int start, int n, vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;
    
    dist[start] = 0;
    q.push(start);
    
    int farthest_node = start;
    int max_dist = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        if (dist[u] > max_dist) {
            max_dist = dist[u];
            farthest_node = u;
        }
        
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return {farthest_node, max_dist};
}

int getTreeDiameter(int n, vector<vector<int>>& adj) {
    if (n <= 1) return 0;
    pair<int, int> p1 = bfs(1, n, adj);
    pair<int, int> p2 = bfs(p1.first, n, adj);
    return p2.second;
}

int main() {
    int n = 6;
    vector<vector<int>> adj(n + 1);
    adj[1] = {2};
    adj[2] = {1, 3, 4};
    adj[3] = {2, 5};
    adj[4] = {2, 6};
    adj[5] = {3};
    adj[6] = {4};
    
    int diameter = getTreeDiameter(n, adj);
    cout << "Diametrul arborelui: " << diameter << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 55,
      "text": "Apelăm funcția `getTreeDiameter` cu un arbore de $6$ noduri. Arborele are structura: 1-2, 2-3, 2-4, 3-5, 4-6.",
      "blocksVisual": [
        {
          "label": "Configurație",
          "groups": [
            [
              { "val": "n = 6", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Verificăm dacă arborele are noduri suficiente. Condiția `n <= 1` este falsă.",
      "blocksVisual": [
        {
          "label": "Verificare trivialitate",
          "groups": [
            [
              { "val": "n > 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 40,
      "text": "Apelăm prima parcurgere `bfs` din nodul arbitrar $1$ pentru a găsi cel mai îndepărtat nod.",
      "blocksVisual": [
        {
          "label": "BFS 1",
          "groups": [
            [
              { "val": "start = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Setăm distanța inițială a nodului sursă `dist[1] = 0`.",
      "blocksVisual": [
        {
          "label": "Distanțe BFS 1",
          "groups": [
            [
              { "val": "dist[1] = 0", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Introducem nodul de pornire $1$ în coadă.",
      "blocksVisual": [
        {
          "label": "Coada BFS 1",
          "groups": [
            [
              { "val": "1", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Explorăm arborele nivel cu nivel. Din nodul $1$ ajungem la $2$ (dist. 1), apoi la $3$ și $4$ (dist. 2) și în cele din urmă la $5$ și $6$ (dist. 3).",
      "blocksVisual": [
        {
          "label": "Coada BFS 1 (rulare)",
          "groups": [
            [
              { "val": "dist[5] = 3" },
              { "val": "dist[6] = 3" }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "În timpul parcurgerii, găsim nodul cu distanța maximă față de $1$. Acesta este nodul $5$ (sau $6$), având distanța $3$.",
      "blocksVisual": [
        {
          "label": "Nod maxim BFS 1",
          "groups": [
            [
              { "val": "nod = 5", "sorted": true },
              { "val": "max_dist = 3" }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Prima funcție BFS se termină și returnează perechea `p1 = {5, 3}`.",
      "blocksVisual": [
        {
          "label": "Rezultat BFS 1",
          "groups": [
            [
              { "val": "farthest = 5" },
              { "val": "dist = 3" }
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Apelăm a doua parcurgere `bfs` pornind din nodul cel mai îndepărtat găsit la pasul anterior, adică din nodul $5$.",
      "blocksVisual": [
        {
          "label": "BFS 2",
          "groups": [
            [
              { "val": "start = 5", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Inițializăm distanța pentru noua sursă: `dist[5] = 0`.",
      "blocksVisual": [
        {
          "label": "Distanțe BFS 2",
          "groups": [
            [
              { "val": "dist[5] = 0", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Adăugăm nodul $5$ în coadă pentru a începe a doua etapă a algoritmului.",
      "blocksVisual": [
        {
          "label": "Coada BFS 2",
          "groups": [
            [
              { "val": "5", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Rulăm BFS din nodul $5$. Vizităm succesiv vecinii: $3$ (dist. 1), $2$ (dist. 2), $1$ și $4$ (dist. 3), și apoi $6$ (dist. 4).",
      "blocksVisual": [
        {
          "label": "Vizitare BFS 2",
          "groups": [
            [
              { "val": "dist[6] = 4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Aflăm nodul cu distanța maximă în această a doua parcurgere: acesta este nodul $6$, aflat la distanța $4$ de nodul $5$.",
      "blocksVisual": [
        {
          "label": "Cel mai îndepărtat nod",
          "groups": [
            [
              { "val": "nod = 6", "sorted": true },
              { "val": "max_dist = 4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Al doilea BFS returnează perechea `p2 = {6, 4}`.",
      "blocksVisual": [
        {
          "label": "Rezultat BFS 2",
          "groups": [
            [
              { "val": "farthest = 6" },
              { "val": "dist = 4" }
            ]
          ]
        }
      ]
    },
    {
      "line": 42,
      "text": "Returnăm distanța maximă găsită, adică $4$. Acesta este diametrul arborelui.",
      "blocksVisual": [
        {
          "label": "Diametru",
          "groups": [
            [
              { "val": "diameter = 4", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 56,
      "text": "Afișăm diametrul arborelui pe ecran: $4$. Drumul diametral este $5-3-2-4-6$.",
      "blocksVisual": [
        {
          "label": "Output",
          "groups": [
            [
              { "val": "Diametru: 4", "sorted": true }
            ]
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

      if (stepIndex <= 2) {
        frames.push({ name: "getTreeDiameter(n=6, adj)", file: "solution.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 81 });
        vars.push({ name: "n", type: "int", val: "6", expandable: false });
      } else if (stepIndex === 8) {
        frames.push({ name: "getTreeDiameter(n=6, adj)", file: "solution.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 81 });
        vars.push({ name: "n", type: "int", val: "6", expandable: false });
        vars.push({ name: "p1", type: "std::pair<int,int>", val: "{first: 5, second: 3}", expandable: false });
      } else if (stepIndex === 14) {
        frames.push({ name: "getTreeDiameter(n=6, adj)", file: "solution.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 81 });
        vars.push({ name: "n", type: "int", val: "6", expandable: false });
        vars.push({ name: "p1", type: "std::pair<int,int>", val: "{first: 5, second: 3}", expandable: false });
        vars.push({ name: "p2", type: "std::pair<int,int>", val: "{first: 6, second: 4}", expandable: false });
      } else if (stepIndex === 15) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        vars.push({ name: "n", type: "int", val: "6", expandable: false });
        vars.push({ name: "diameter", type: "int", val: "4", expandable: false });
      } else {
        // Inside BFS 1 or BFS 2
        const startVal = stepIndex <= 7 ? 1 : 5;
        const callerLine = stepIndex <= 7 ? 66 : 67;
        const farthest = stepIndex <= 7 ? 5 : 6;
        const maxDist = stepIndex <= 7 ? 3 : 4;

        frames.push({ name: `bfs(start=${startVal}, n=6, adj)`, file: "solution.cpp", line: activeLine });
        frames.push({ name: "getTreeDiameter(n=6, adj)", file: "solution.cpp", line: callerLine });
        frames.push({ name: "main()", file: "main.cpp", line: 81 });

        vars.push({ name: "start", type: "int", val: startVal.toString(), expandable: false });
        vars.push({ name: "n", type: "int", val: "6", expandable: false });
        vars.push({ name: "dist", type: "std::vector<int>", val: "size = 7", expandable: true });
        
        let qVal = "empty";
        if (stepIndex === 4 || stepIndex === 10) qVal = `{${startVal}}`;
        else if (stepIndex === 5 || stepIndex === 11) qVal = `{...}`;
        vars.push({ name: "q", type: "std::queue<int>", val: qVal, expandable: false });
        vars.push({ name: "farthest_node", type: "int", val: farthest.toString(), expandable: false });
        vars.push({ name: "max_dist", type: "int", val: maxDist.toString(), expandable: false });

        inlineVal = `start: ${startVal}, max_dist: ${maxDist}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 65) return "n: 6";
      if (lineNum === 66 && stepIndex >= 8) return "p1: {5, 3}";
      if (lineNum === 67 && stepIndex >= 14) return "p2: {6, 4}";
      if (lineNum === 39 || lineNum === 40 || lineNum === 42 || lineNum === 43) {
        return `start: ${stepIndex <= 7 ? 1 : 5}`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const staticNodes = [
        { id: "1", x: 160, y: 170, label: "1" },
        { id: "2", x: 160, y: 100, label: "2" },
        { id: "3", x: 100, y: 100, label: "3" },
        { id: "4", x: 220, y: 100, label: "4" },
        { id: "5", x: 40, y: 100, label: "5" },
        { id: "6", x: 280, y: 100, label: "6" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "2", target: "4" },
        { source: "3", target: "5" },
        { source: "4", target: "6" }
      ];

      let activeNode = -1;
      let visitedNodes = [];
      let diameterNodes = [];

      if (stepIndex >= 2 && stepIndex <= 7) {
        // BFS 1
        activeNode = 1;
        visitedNodes = [1, 2, 3, 4, 5, 6];
      } else if (stepIndex >= 8 && stepIndex <= 13) {
        // BFS 2
        activeNode = 5;
        visitedNodes = [5, 3, 2, 1, 4, 6];
      } else if (stepIndex >= 14) {
        // Path diameter highlighted
        diameterNodes = [5, 3, 2, 4, 6];
      }

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (diameterNodes.includes(idNum)) state = "active";
          else if (idNum === activeNode) state = "active";
          else if (visitedNodes.includes(idNum)) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const active = (diameterNodes.includes(u) && diameterNodes.includes(v)) || (u === activeNode || v === activeNode);
          return { ...e, active };
        })
      };
    }
  },
  "problems": {
    "easy": [
      {
        "title": "Diameter of Binary Tree",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
        "desc": "Calculează diametrul unui arbore binar (distanța maximă dintre oricare două frunze)."
      }
    ],
    "medium": [
      {
        "title": "Tree Diameter",
        "url": "https://cses.fi/problemset/task/1131/",
        "desc": "Problemă clasică: determină diametrul unui arbore oarecare cu N noduri."
      }
    ],
    "hard": [
      {
        "title": "Tree Distances I",
        "url": "https://cses.fi/problemset/task/1132/",
        "desc": "Pentru fiecare nod din arbore, determină distanța maximă către orice alt nod utilizând concepte similare determinării diametrului."
      }
    ]
  }
};
