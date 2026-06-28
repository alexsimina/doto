export const data = {
  "presentation": "### Concepte Fundamentale în Teoria Grafurilor\n\nUn **graf** este o structură matematică folosită pentru a modela relații între perechi de obiecte. Formal, un graf $G$ este definit ca o pereche ordonată $G = (V, E)$, unde:\n- $V$ este o mulțime finită de **noduri** (sau vârfuri).\n- $E$ este o mulțime de **muchii** (sau arce), reprezentând conexiuni între nodurile din $V$.\n\n### 1. Tipuri de Grafuri\n- **Graf Neorientat (Undirected Graph):** Legăturile sunt bidirecționale. O muchie este o pereche neordonată $\\{u, v\\}$. Dacă există muchia $\\{u, v\\}$, putem circula atât de la $u$ la $v$, cât și invers.\n- **Graf Orientat (Directed Graph / Digraph):** Legăturile au un sens unic. Un arc este o pereche ordonată $(u, v)$, reprezentând o conexiune de la nodul sursă $u$ la nodul destinație $v$.\n\n### 2. Gradele Nodurilor\n- În **grafuri neorientate**, **gradul** unui nod $u$, notat cu $d(u)$, reprezintă numărul de muchii incidente cu acesta (numărul de vecini direcți).\n- În **grafuri orientate**, avem:\n  - **Gradul interior** ($d^-(u)$): numărul de arce care intră în nodul $u$.\n  - **Gradul exterior** ($d^+(u)$): numărul de arce care ies din nodul $u$.\n\n### 3. Drumuri, Lanțuri și Cicluri\n- **Lanț (Chain):** O secvență de noduri $v_1, v_2, \\dots, v_k$ dintr-un graf **neorientat** cu proprietatea că pentru orice $1 \\le i < k$, există muchia $\\{v_i, v_{i+1}\\}$.\n- **Drum (Path):** O secvență de noduri $v_1, v_2, \\dots, v_k$ dintr-un graf **orientat** cu proprietatea că pentru orice $1 \\le i < k$, există arcul $(v_i, v_{i+1})$.\n- **Ciclu / Circuit:** Un lanț (respectiv drum) în care primul și ultimul nod coincid ($v_1 = v_k$), iar toate muchiile/arcele sunt distincte.\n\n### 4. Conexitate (Connectedness)\n- Un graf neorientat este **conex** dacă există cel puțin un lanț între oricare două noduri.\n- Un graf orientat este **tare conex** dacă există drum între oricare două noduri $u$ și $v$, în ambele sensuri.\n\n### 5. Graf Bipartit\n- Un graf este **bipartit** dacă mulțimea nodurilor sale poate fi împărțită în două submulțimi disjuncte $A$ și $B$ astfel încât orice muchie conectează un nod din $A$ cu unul din $B$.",
  "complexity": "### Complexități de Reprezentare a Grafurilor\n\n- **Matrice de Adiacență:**\n  - **Spațiu:** $O(V^2)$\n  - **Adăugare Muchie:** $O(1)$\n  - **Verificare Vecinătate $(u, v)$:** $O(1)$\n  - **Parcurgere Vecini nod $u$:** $O(V)$\n\n- **Liste de Adiacență:**\n  - **Spațiu:** $O(V + E)$\n  - **Adăugare Muchie:** $O(1)$\n  - **Verificare Vecinătate $(u, v)$:** $O(d(u))$\n  - **Parcurgere Vecini nod $u$:** $O(d(u))$\n\n- **Listă de Muchii:**\n  - **Spațiu:** $O(E)$\n  - **Adăugare Muchie:** $O(1)$\n  - **Verificare Vecinătate $(u, v)$:** $O(E)$\n  - **Parcurgere Vecini nod $u$:** $O(E)$",
  "variations": "### Alegerea Reprezentării Potrivite\n\n1. **Matricea de adiacență** se folosește în general pentru **grafuri dense** ($E \\approx V^2$), unde verificarea rapidă a existenței unei muchii este critică.\n2. **Listele de adiacență** sunt ideale pentru **grafuri rare** ($E \\ll V^2$), fiind standardul în algoritmi precum DFS, BFS, Dijkstra etc.\n3. **Lista de muchii** este extrem de simplu de implementat și este folosită în algoritmi ca Bellman-Ford sau Kruskal.",
  "applications": "### Aplicații Practice ale Grafurilor\n\n- **Rețele de socializare:** Utilizatorii sunt noduri, iar relațiile de prietenie (neorientate) sau de urmărire (orientate) sunt muchii/arce.\n- **Rețele de transport și GPS:** Intersecțiile sunt noduri, iar străzile sunt muchii (orientate pentru sensuri unice, cu ponderi reprezentând distanțele sau timpul de parcurs).\n- **Analiza paginilor Web (PageRank):** Paginile web sunt noduri, iar link-urile hipertext sunt arce orientate.",
  "code": `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int V = 4;
    vector<vector<int>> adj(V);
    
    adj[0].push_back(1); adj[1].push_back(0);
    adj[0].push_back(2); adj[2].push_back(0);
    adj[1].push_back(2); adj[2].push_back(1);
    adj[2].push_back(3); adj[3].push_back(2);
    
    vector<int> deg(V, 0);
    for (int i = 0; i < V; ++i) {
        deg[i] = adj[i].size();
    }
    
    vector<int> seq = {0, 2, 3};
    bool ok = true;
    for (int i = 0; i < 2; ++i) {
        int u = seq[i];
        int v = seq[i+1];
        bool gasit = false;
        for (int vec : adj[u]) {
            if (vec == v) {
                gasit = true;
                break;
            }
        }
        if (!gasit) {
            ok = false;
            break;
        }
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 5,
      "text": "Inițializăm numărul de noduri $V = 4$ din graful neorientat.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "V: 4", "active": true }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Declarăm listele de adiacență `adj` ca un vector de 4 vectori (inițial vizi).",
      "blocksVisual": [
        {
          "label": "Liste de adiacență adj",
          "groups": [
            [{ "val": "adj[0]: []" }],
            [{ "val": "adj[1]: []" }],
            [{ "val": "adj[2]: []" }],
            [{ "val": "adj[3]: []" }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Adăugăm muchia neorientată între nodurile $0$ și $1$ (inserăm în listele ambelor noduri).",
      "blocksVisual": [
        {
          "label": "Liste de adiacență adj",
          "groups": [
            [{ "val": "adj[0]: [1]", "active": true }],
            [{ "val": "adj[1]: [0]", "active": true }],
            [{ "val": "adj[2]: []" }],
            [{ "val": "adj[3]: []" }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Adăugăm muchia neorientată între $0$ și $2$ în listele de adiacență.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență adj",
          "groups": [
            [{ "val": "adj[0]: [1, 2]", "active": true }],
            [{ "val": "adj[1]: [0]" }],
            [{ "val": "adj[2]: [0]", "active": true }],
            [{ "val": "adj[3]: []" }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm muchia neorientată între nodurile $1$ și $2$.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență adj",
          "groups": [
            [{ "val": "adj[0]: [1, 2]" }],
            [{ "val": "adj[1]: [0, 2]", "active": true }],
            [{ "val": "adj[2]: [0, 1]", "active": true }],
            [{ "val": "adj[3]: []" }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adăugăm muchia neorientată între nodurile $2$ și $3$. Graful este acum complet format.",
      "blocksVisual": [
        {
          "label": "Liste de adiacență adj",
          "groups": [
            [{ "val": "adj[0]: [1, 2]" }],
            [{ "val": "adj[1]: [0, 2]" }],
            [{ "val": "adj[2]: [0, 1, 3]", "active": true }],
            [{ "val": "adj[3]: [2]", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Inițializăm vectorul de grade `deg` cu $0$ pentru toate cele $4$ noduri.",
      "blocksVisual": [
        {
          "label": "Grade noduri deg",
          "groups": [
            [{ "val": "deg[0]: 0", "active": true }, { "val": "deg[1]: 0", "active": true }, { "val": "deg[2]: 0", "active": true }, { "val": "deg[3]: 0", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Începem bucla de calculare a gradelor. Pentru `i = 0`, calculăm `deg[0] = adj[0].size()`.",
      "blocksVisual": [
        {
          "label": "Grade noduri deg",
          "groups": [
            [{ "val": "deg[0]: 2", "active": true }, { "val": "deg[1]: 0" }, { "val": "deg[2]: 0" }, { "val": "deg[3]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Mergem la următorul nod, `i = 1`. Gradul nodului $1$ devine lungimea listei sale de vecini: `deg[1] = 2`.",
      "blocksVisual": [
        {
          "label": "Grade noduri deg",
          "groups": [
            [{ "val": "deg[0]: 2" }, { "val": "deg[1]: 2", "active": true }, { "val": "deg[2]: 0" }, { "val": "deg[3]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Mergem la `i = 2`. Nodul $2$ are vecinii $0, 1, 3$, deci lista sa are mărimea $3$. Setăm `deg[2] = 3`.",
      "blocksVisual": [
        {
          "label": "Grade noduri deg",
          "groups": [
            [{ "val": "deg[0]: 2" }, { "val": "deg[1]: 2" }, { "val": "deg[2]: 3", "active": true }, { "val": "deg[3]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Mergem la `i = 3`. Nodul $3$ are doar vecinul $2$, deci mărimea listei este $1$. Setăm `deg[3] = 1`.",
      "blocksVisual": [
        {
          "label": "Grade noduri deg",
          "groups": [
            [{ "val": "deg[0]: 2" }, { "val": "deg[1]: 2" }, { "val": "deg[2]: 3" }, { "val": "deg[3]: 1", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Inițializăm secvența de noduri de verificat: `seq = {0, 2, 3}`.",
      "blocksVisual": [
        {
          "label": "Secvență de verificat seq",
          "groups": [
            [{ "val": "seq[0]: 0", "active": true }, { "val": "seq[1]: 2", "active": true }, { "val": "seq[2]: 3", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Inițializăm variabila `ok = true` (presupunem că secvența este un lanț valid).",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "ok: true", "active": true }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Începem bucla de verificare a existenței muchiilor între elementele succesive din secvență. Pentru `i = 0`, verificăm dacă există legătură între `seq[0]` ($0$) și `seq[1]` ($2$).",
      "blocksVisual": [
        {
          "label": "Indici verificare",
          "groups": [[{ "val": "i: 0", "active": true }, { "val": "u: 0" }, { "val": "v: 2" }]]
        }
      ]
    },
    {
      "line": 21,
      "text": "Setăm nodul sursă `u = 0`.",
      "blocksVisual": [
        {
          "label": "Indici verificare",
          "groups": [[{ "val": "i: 0" }, { "val": "u: 0", "active": true }, { "val": "v: 2" }]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Setăm nodul destinație `v = 2`.",
      "blocksVisual": [
        {
          "label": "Indici verificare",
          "groups": [[{ "val": "i: 0" }, { "val": "u: 0" }, { "val": "v: 2", "active": true }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Inițializăm variabila de căutare `gasit = false`.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "gasit: false", "active": true }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Parcurgem vecinii lui `u = 0`. Primul vecin din listă este `vec = 1`.",
      "blocksVisual": [
        {
          "label": "Vecin curent u",
          "groups": [[{ "val": "vec: 1", "active": true }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Al doilea vecin din lista lui `u = 0` este `vec = 2`.",
      "blocksVisual": [
        {
          "label": "Vecin curent u",
          "groups": [[{ "val": "vec: 2", "active": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Deoarece `vec == v` (adică $2 == 2$), am găsit muchia! Setăm `gasit = true` și părăsim bucla internă.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "gasit: true", "active": true }]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Verificăm variabila `gasit`. Cum `gasit == true`, trecem la pasul următor din bucla `for`.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "gasit: true", "active": true }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Incrementăm `i = 1`. Acum verificăm legătura dintre `seq[1]` ($2$) și `seq[2]` ($3$).",
      "blocksVisual": [
        {
          "label": "Indici verificare",
          "groups": [[{ "val": "i: 1", "active": true }, { "val": "u: 2" }, { "val": "v: 3" }]]
        }
      ]
    },
    {
      "line": 21,
      "text": "Setăm nodul sursă `u = 2`.",
      "blocksVisual": [
        {
          "label": "Indici verificare",
          "groups": [[{ "val": "i: 1" }, { "val": "u: 2", "active": true }, { "val": "v: 3" }]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Setăm nodul destinație `v = 3`.",
      "blocksVisual": [
        {
          "label": "Indici verificare",
          "groups": [[{ "val": "i: 1" }, { "val": "u: 2" }, { "val": "v: 3", "active": true }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Inițializăm `gasit = false`.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "gasit: false", "active": true }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Parcurgem vecinii lui `u = 2`. Primul vecin este `vec = 0`.",
      "blocksVisual": [
        {
          "label": "Vecin curent u",
          "groups": [[{ "val": "vec: 0", "active": true }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Al doilea vecin din listă este `vec = 1`.",
      "blocksVisual": [
        {
          "label": "Vecin curent u",
          "groups": [[{ "val": "vec: 1", "active": true }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Al treilea vecin din lista lui $2$ este `vec = 3`.",
      "blocksVisual": [
        {
          "label": "Vecin curent u",
          "groups": [[{ "val": "vec: 3", "active": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Deoarece `vec == v` (adică $3 == 3$), setăm `gasit = true` și încheiem bucla de căutare.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "gasit: true", "active": true }]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Muchiile succesive fiind găsite, verificarea secvenței se încheie cu succes. Variabila `ok` rămâne `true`.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{ "val": "ok: true", "active": true }]]
        }
      ]
    },
    {
      "line": 32,
      "text": "Programul se încheie returnând codul $0$. Secvența $0 - 2 - 3$ este un lanț valid în graful analizat.",
      "blocksVisual": [
        {
          "label": "Terminare",
          "groups": [[{ "val": "return 0", "active": true }]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Gradele unui graf",
        "url": "https://www.pbinfo.ro/probleme/431",
        "desc": "Calculați gradele nodurilor pentru un graf neorientat dat."
      }
    ],
    "medium": [
      {
        "title": "Verificare lanț",
        "url": "https://www.pbinfo.ro/probleme/532",
        "desc": "Verificați dacă o secvență dată de noduri constituie un lanț în graf."
      }
    ],
    "hard": [
      {
        "title": "Componente conexe",
        "url": "https://www.pbinfo.ro/probleme/432",
        "desc": "Determinați componentele conexe dintr-un graf neorientat."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      let V_val = 4;
      let ok_val = undefined;
      let i_val = undefined;
      let u_val = undefined;
      let v_val = undefined;
      let gasit_val = undefined;
      let vec_val = undefined;

      if (stepIndex >= 0) {
        vars.push({ name: 'V', type: 'int', val: V_val, expandable: false });
      }

      if (stepIndex >= 6) {
        globalVars.push({ name: 'deg', type: 'std::vector<int>', val: '[...]', expandable: false });
      }

      if (stepIndex >= 12) {
        ok_val = true;
      }
      if (stepIndex === 29) {
        ok_val = true;
      }

      if (stepIndex >= 13 && stepIndex <= 20) {
        i_val = 0;
        u_val = 0;
        v_val = 2;
      } else if (stepIndex >= 21 && stepIndex <= 29) {
        i_val = 1;
        u_val = 2;
        v_val = 3;
      }

      if (stepIndex === 16) gasit_val = false;
      if (stepIndex === 17) { gasit_val = false; vec_val = 1; }
      if (stepIndex === 18) { gasit_val = false; vec_val = 2; }
      if (stepIndex === 19) { gasit_val = true; vec_val = 2; }
      if (stepIndex === 20) { gasit_val = true; }

      if (stepIndex === 23) gasit_val = false;
      if (stepIndex === 24) { gasit_val = false; vec_val = 0; }
      if (stepIndex === 25) { gasit_val = false; vec_val = 1; }
      if (stepIndex === 26) { gasit_val = false; vec_val = 3; }
      if (stepIndex === 27) { gasit_val = true; vec_val = 3; }
      if (stepIndex === 28) { gasit_val = true; }

      if (ok_val !== undefined) vars.push({ name: 'ok', type: 'bool', val: ok_val ? 'true' : 'false', expandable: false });
      if (i_val !== undefined) vars.push({ name: 'i', type: 'int', val: i_val, expandable: false });
      if (u_val !== undefined) vars.push({ name: 'u', type: 'int', val: u_val, expandable: false });
      if (v_val !== undefined) vars.push({ name: 'v', type: 'int', val: v_val, expandable: false });
      if (gasit_val !== undefined) vars.push({ name: 'gasit', type: 'bool', val: gasit_val ? 'true' : 'false', expandable: false });
      if (vec_val !== undefined) vars.push({ name: 'vec', type: 'int', val: vec_val, expandable: false });

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine });

      if (u_val !== undefined) {
        inlineVal = `u: ${u_val}, v: ${v_val}`;
        if (vec_val !== undefined) inlineVal += `, vec: ${vec_val}`;
      } else if (ok_val !== undefined) {
        inlineVal = `ok: ${ok_val ? 'true' : 'false'}`;
      } else {
        inlineVal = `V: ${V_val}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex >= 13 && stepIndex <= 20) {
        if (lineNum === 17) return "i: 0";
        if (lineNum === 18) return "u: 0";
        if (lineNum === 19) return "v: 2";
      } else if (stepIndex >= 21 && stepIndex <= 29) {
        if (lineNum === 17) return "i: 1";
        if (lineNum === 18) return "u: 2";
        if (lineNum === 19) return "v: 3";
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const staticNodes = [
        { id: "0", x: 100, y: 50, label: "0" },
        { id: "1", x: 50, y: 120, label: "1" },
        { id: "2", x: 150, y: 120, label: "2" },
        { id: "3", x: 200, y: 200, label: "3" }
      ];

      const edges = [];
      if (stepIndex >= 2) edges.push({ source: "0", target: "1" });
      if (stepIndex >= 3) edges.push({ source: "0", target: "2" });
      if (stepIndex >= 4) edges.push({ source: "1", target: "2" });
      if (stepIndex >= 5) edges.push({ source: "2", target: "3" });

      let activeNodeId = null;
      let visitedNodeIds = [];
      let activeEdge = null;

      if (stepIndex >= 13 && stepIndex <= 20) {
        activeNodeId = "0";
        visitedNodeIds = ["0", "2"];
        if (stepIndex >= 15) {
          activeEdge = { source: "0", target: "2" };
        }
      } else if (stepIndex >= 21 && stepIndex <= 29) {
        activeNodeId = "2";
        visitedNodeIds = ["2", "3"];
        if (stepIndex >= 23) {
          activeEdge = { source: "2", target: "3" };
        }
      }

      return {
        directed: false,
        title: "Reprezentare Graf Neorientat",
        nodes: staticNodes.map(n => {
          let state = undefined;
          if (n.id === activeNodeId) state = "active";
          else if (visitedNodeIds.includes(n.id)) state = "visited";
          
          let desc = undefined;
          if (stepIndex >= 11) {
            const degrees = [2, 2, 3, 1];
            desc = `deg: ${degrees[parseInt(n.id)]}`;
          }
          return { ...n, state, desc };
        }),
        edges: edges.map(e => {
          let active = false;
          if (activeEdge && ((e.source === activeEdge.source && e.target === activeEdge.target) || 
                             (e.target === activeEdge.source && e.source === activeEdge.target))) {
            active = true;
          }
          return { ...e, active };
        })
      };
    }
  }
};
