const getGraphVisualInternal = (stepIndex) => {
  const nodes = [
    { id: "0", label: "0", x: 100, y: 70 },
    { id: "1", label: "1", x: 100, y: 170 },
    { id: "2", label: "2", x: 250, y: 70 },
    { id: "3", label: "3", x: 250, y: 170 },
    { id: "4", label: "4", x: 380, y: 70 }
  ];
  const edges = [];

  // Determine active node and visited/active paths based on stepIndex
  let activeNode = -1;
  let edge01 = false;
  let edge23 = false;
  let edge02 = false;

  // Active edges & nodes
  if (stepIndex >= 13 && stepIndex <= 35) edge01 = true;
  else if (stepIndex >= 36) edge01 = true;

  if (stepIndex >= 20 && stepIndex <= 39) edge23 = true;

  if (stepIndex >= 29 && stepIndex <= 35) edge02 = true;

  // Active nodes in DFS/Find
  if (stepIndex === 6 || stepIndex === 7 || stepIndex === 24 || stepIndex === 25) activeNode = 0;
  if (stepIndex === 8 || stepIndex === 9 || stepIndex === 23) activeNode = 1;
  if (stepIndex === 17 || stepIndex === 26 || stepIndex === 38) activeNode = 2;
  if (stepIndex === 18 || stepIndex === 39) activeNode = 3;

  const enrichedNodes = nodes.map(n => {
    let state = undefined;
    const idNum = parseInt(n.id);
    if (idNum === activeNode) {
      state = "active";
    } else if (
      (idNum === 0 && (stepIndex >= 13)) ||
      (idNum === 1 && (stepIndex >= 13)) ||
      (idNum === 2 && (stepIndex >= 20)) ||
      (idNum === 3 && (stepIndex >= 20))
    ) {
      state = "visited";
    }
    return { ...n, state };
  });

  if (edge01) {
    edges.push({ source: "1", target: "0", active: stepIndex === 13 });
  }
  if (edge23) {
    edges.push({ source: "3", target: "2", active: stepIndex === 20 });
  }
  if (edge02) {
    edges.push({ source: "2", target: "0", active: stepIndex === 29 });
  }

  return {
    directed: true,
    title: "Păduri de Mulțimi Disjuncte (DSU)",
    nodes: enrichedNodes,
    edges
  };
};

const getBlocksVisualInternal = (stepIndex) => {
  // We want to reconstruct parent, rank, and history stack state for each stepIndex
  const parent = [0, 1, 2, 3, 4];
  const rank = [0, 0, 0, 0, 0];
  const history = [];

  if (stepIndex >= 13) {
    parent[1] = 0;
    rank[0] = 1;
    history.push({ u: 0, v: 1, rank: 0 });
  }
  if (stepIndex >= 20) {
    parent[3] = 2;
    rank[2] = 1;
    history.push({ u: 2, v: 3, rank: 0 });
  }
  if (stepIndex >= 29) {
    parent[2] = 0;
    rank[0] = 2;
    history.push({ u: 0, v: 2, rank: 1 });
  }

  // Rollbacks
  if (stepIndex >= 36) {
    // first rollback complete
    parent[2] = 2;
    rank[0] = 1;
    history.pop();
  }
  if (stepIndex >= 40) {
    // second rollback complete
    parent[3] = 3;
    rank[2] = 0;
    history.pop();
  }

  return [
    {
      label: "Vectorul parent (Părinte)",
      groups: [
        parent.map((p, idx) => ({
          val: `${idx} -> ${p}`,
          active: (stepIndex >= 5 && (idx === 0 || idx === 1) && stepIndex <= 15) ||
                  (stepIndex >= 16 && (idx === 2 || idx === 3) && stepIndex <= 21) ||
                  (stepIndex >= 22 && (idx === 1 || idx === 2 || idx === 0) && stepIndex <= 30)
        }))
      ]
    },
    {
      label: "Vectorul rank (Rang)",
      groups: [
        rank.map((r, idx) => ({
          val: `rank[${idx}]: ${r}`,
          active: (idx === 0 && (stepIndex === 15 || stepIndex === 30 || stepIndex === 36)) ||
                  (idx === 2 && (stepIndex === 21 || stepIndex === 40))
        }))
      ]
    },
    {
      label: "Stiva de Istoric (Rollback History)",
      groups: [
        history.length > 0
          ? history.map(h => ({
              val: `u:${h.u}, v:${h.v}, rank_u:${h.rank}`,
              active: true
            }))
          : [{ val: "stivă goală", active: false }]
      ]
    }
  ];
};

const stepsData = [
  { line: 58, text: "Inițializăm structura DSU cu Rollback pentru 5 elemente (0..4).", vars: [["n", 5]] },
  { line: 18, text: "Alocăm memorie pentru vectorul `parent` de dimensiune 5.", vars: [["n", 5]] },
  { line: 20, text: "Parcurgem elementele de la 0 la 4 pentru inițializare.", vars: [["i", 0]] },
  { line: 21, text: "Fiecare element începe prin a fi propriul său părinte (`parent[i] = i`).", vars: [["parent[0]", 0]] },
  { line: 59, text: "Apelăm `dsu.unite(0, 1)` pentru a conecta elementele 0 și 1.", vars: [["i", 0], ["j", 1]] },
  { line: 32, text: "Căutăm rădăcina elementului 0 cu funcția `find(0)`.", vars: [["i", 0]] },
  { line: 26, text: "Verificăm dacă elementul 0 este propria sa rădăcină. `parent[0] == 0` este adevărat.", vars: [["i", 0]] },
  { line: 33, text: "Căutăm rădăcina elementului 1 cu funcția `find(1)`.", vars: [["j", 1]] },
  { line: 26, text: "Verificăm dacă elementul 1 este propria sa rădăcină. `parent[1] == 1` este adevărat.", vars: [["i", 1]] },
  { line: 34, text: "Verificăm dacă cele două elemente fac deja parte din aceeași mulțime. `rootI (0) != rootJ (1)`, deci continuăm.", vars: [["rootI", 0], ["rootJ", 1]] },
  { line: 37, text: "Comparăm rangurile rădăcinilor. `rank[0]` este 0, iar `rank[1]` este 0. Sunt egale, deci nu interschimbăm.", vars: [["rank[rootI]", 0], ["rank[rootJ]", 0]] },
  { line: 40, text: "Salvăm modificarea în stiva de istoric: `rootI: 0`, `rootJ: 1`, și rangul anterior al rădăcinii `rank[0]: 0`.", vars: [["history.size()", 1]] },
  { line: 41, text: "Setăm părintele lui 1 la 0 (`parent[1] = 0`). Elementul 0 devine părintele lui 1.", vars: [["parent[1]", 0]] },
  { line: 42, text: "Deoarece rădăcinile au avut ranguri egale, incrementăm rangul noii rădăcini.", vars: [["rank[0] == rank[1]", "true"]] },
  { line: 43, text: "Incrementăm `rank[0]` de la 0 la 1.", vars: [["rank[0]", 1]] },
  { line: 60, text: "Apelăm `dsu.unite(2, 3)` pentru a conecta elementele 2 și 3.", vars: [["i", 2], ["j", 3]] },
  { line: 32, text: "Căutăm rădăcina elementului 2 cu `find(2)`, obținând 2.", vars: [["i", 2]] },
  { line: 33, text: "Căutăm rădăcina elementului 3 cu `find(3)`, obținând 3.", vars: [["j", 3]] },
  { line: 40, text: "Salvăm modificarea pe stivă: `rootI: 2`, `rootJ: 3`, `rank[2]: 0`.", vars: [["history.size()", 2]] },
  { line: 41, text: "Setăm părintele lui 3 la 2 (`parent[3] = 2`).", vars: [["parent[3]", 2]] },
  { line: 43, text: "Deoarece ambele aveau rangul 0, incrementăm `rank[2]` la 1.", vars: [["rank[2]", 1]] },
  { line: 61, text: "Apelăm `dsu.unite(1, 2)` pentru a conecta componentele `{0, 1}` și `{2, 3}`.", vars: [["i", 1], ["j", 2]] },
  { line: 32, text: "Căutăm rădăcina elementului 1. Intrăm în `find(1)`.", vars: [["i", 1]] },
  { line: 28, text: "Deoarece `parent[1] == 0`, apelăm recursiv `find(parent[1])` (adică `find(0)`).", vars: [["parent[1]", 0]] },
  { line: 26, text: "Verificăm dacă `parent[0] == 0`. Este adevărat. Returnăm 0 ca rădăcină.", vars: [["i", 0]] },
  { line: 33, text: "Căutăm rădăcina elementului 2. `find(2)` returnează direct 2.", vars: [["j", 2]] },
  { line: 37, text: "Comparăm rangurile rădăcinilor: `rank[0]` este 1, `rank[2]` este 1. Rămânem la aceeași ordine.", vars: [["rank[0]", 1], ["rank[2]", 1]] },
  { line: 40, text: "Introducem modificarea în istoric: `rootI: 0`, `rootJ: 2`, `rank[0]: 1`.", vars: [["history.size()", 3]] },
  { line: 41, text: "Setăm părintele rădăcinii 2 la 0 (`parent[2] = 0`).", vars: [["parent[2]", 0]] },
  { line: 43, text: "Deoarece ambele aveau rangul 1, incrementăm `rank[0]` la 2.", vars: [["rank[0]", 2]] },
  { line: 63, text: "Apelăm `dsu.rollback()` pentru a anula ultima operație de unire.", vars: [] },
  { line: 49, text: "Verificăm dacă istoricul este gol. Nu este gol (avem 3 elemente).", vars: [["history.empty()", "false"]] },
  { line: 50, text: "Extragem ultima înregistrare din istoric: `last = {u: 0, v: 2, prev_rank_u: 1}`.", vars: [["last.u", 0], ["last.v", 2]] },
  { line: 51, text: "Eliminăm elementul din vârful stivei de istoric.", vars: [["history.size()", 2]] },
  { line: 52, text: "Anulăm legătura de părinte: `parent[2]` redevine 2. Componenta `{2, 3}` este separată din nou.", vars: [["parent[2]", 2]] },
  { line: 53, text: "Restaurăm rangul rădăcinii 0 la valoarea anterioară: `rank[0] = 1`.", vars: [["rank[0]", 1]] },
  { line: 64, text: "Apelăm din nou `dsu.rollback()` pentru a anula încă o unire.", vars: [] },
  { line: 50, text: "Obținem următoarea înregistrare din istoric: `last = {u: 2, v: 3, prev_rank_u: 0}`.", vars: [["last.u", 2], ["last.v", 3]] },
  { line: 51, text: "Eliminăm elementul de pe stivă.", vars: [["history.size()", 1]] },
  { line: 52, text: "Anulăm legătura: `parent[3]` redevine 3. Elementul 3 devine izolat.", vars: [["parent[3]", 3]] },
  { line: 53, text: "Restaurăm rangul rădăcinii 2 la valoarea anterioară: `rank[2] = 0`.", vars: [["rank[2]", 0]] },
  { line: 65, text: "Programul se încheie. DSU-ul s-a întors exact la starea de după prima unire.", vars: [] }
];

export const data = {
  "presentation": "### DSU cu Rollback (Undo)\n\nStructura de date **Disjoint Set Union (DSU) cu Rollback** este o extensie a DSU standard care permite anularea ultimelor operații de unire (`unite`) într-o manieră LIFO (Last-In, First-Out). Această proprietate este esențială în algoritmii care folosesc tehnica de divide and conquer pe query-uri sau în parcurgeri în adâncime unde modificările de conectivitate trebuie anulate la întoarcerea din recursivitate.\n\n### De ce nu putem folosi Compresia Drumului (Path Compression)?\n\nÎntr-un DSU clasic, optimizarea de **Compresie a Drumului** modifică structura arborelui în mod ireversibil prin legarea directă a nodurilor intermediare de rădăcină. Această optimizare distruge proprietatea de structură arborescentă stabilă și face imposibilă anularea eficientă a modificărilor. Din acest motiv, un DSU cu Rollback folosește **DOAR Unirea după Rang (Union by Rank)** sau după dimensiune. Complexitatea per operație crește la $O(\\log N)$, dar fiecare unire modifică maximum doi pointeri, permițându-ne să le stocăm valorile anterioare pe o stivă de istoric.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(\\log N)$ per operație de `find` și `unite`. Fără compresia drumului, adâncimea maximă a arborilor este limitată logaritmic prin unirea după rang.\n- **Timp (Rollback):** $O(1)$ per operație de anulare. Tot ce trebuie să facem este să extragem modificările din vârful stivei și să le restabilim.\n- **Spațiu:** $O(N + Q)$ unde $Q$ este numărul maxim de uniri active salvate în stiva de istoric.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Rollback la un moment de timp $T$**: Putem salva numărul curent de elemente din stivă și să apelăm `rollback()` într-o buclă până când dimensiunea stivei revine la valoarea inițială de la momentul $T$.\n- **Conectivitate Dinamică offline**: Folosind un arbore de intervale peste timp, muchiile care sunt active doar pe anumite intervale de timp pot fi inserate și șterse folosind DSU cu Rollback, rezolvând conectivitatea dinamică în $O(N \\log N \\log Q)$.",
  "applications": "### Aplicații Practice\n\n- Determinarea componentelor conexe în grafuri cu adăugări și ștergeri de muchii (conectivitate dinamică offline).\n- Algoritmul lui Kruskal dinamic sau menținerea pădurilor de acoperire în mod offline.\n- Probleme de tip divide and conquer pe query-uri temporale.",
  "code": `#include <iostream>
#include <vector>
#include <stack>

using namespace std;

struct DSUElement {
    int u, v;
    int prev_rank_u;
};

struct DSUWithRollback {
    vector<int> parent;
    vector<int> rank;
    stack<DSUElement> history;

    DSUWithRollback(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
    }

    int find(int i) {
        if (parent[i] == i)
            return i;
        return find(parent[i]);
    }

    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) {
            return false;
        }
        if (rank[rootI] < rank[rootJ]) {
            swap(rootI, rootJ);
        }
        history.push({rootI, rootJ, rank[rootI]});
        parent[rootJ] = rootI;
        if (rank[rootI] == rank[rootJ]) {
            rank[rootI]++;
        }
        return true;
    }

    void rollback() {
        if (history.empty()) return;
        DSUElement last = history.top();
        history.pop();
        parent[last.v] = last.v;
        rank[last.u] = last.prev_rank_u;
    }
};

int main() {
    DSUWithRollback dsu(5);
    dsu.unite(0, 1);
    dsu.unite(2, 3);
    dsu.unite(1, 2);
    
    dsu.rollback();
    dsu.rollback();
    return 0;
}`,
  "explanations": stepsData.map((step, idx) => ({
    "line": step.line,
    "text": step.text,
    "blocksVisual": getBlocksVisualInternal(idx),
    "graphVisual": getGraphVisualInternal(idx)
  })),
  "problems": {
    "easy": [
      {
        "title": "DSU de bază (fără rollback)",
        "url": "https://www.infoarena.ro/problema/dsu",
        "desc": "Implementarea structurii DSU simple pentru a vă familiariza cu unirea și căutarea."
      }
    ],
    "medium": [
      {
        "title": "Conectivitate Dinamică Offline",
        "url": "https://codeforces.com/gym/100551/problem/A",
        "desc": "Determinarea numărului de componente conexe pe un graf în care se adaugă și se șterg muchii."
      }
    ],
    "hard": [
      {
        "title": "Bipartite Graph Checker",
        "url": "https://codeforces.com/contest/1444/problem/C",
        "desc": "Determinarea dacă anumite subgrafuri formate din grupuri sunt bipartite folosind DSU cu rollback."
      }
    ]
  },
  "globalVars": [],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const step = stepsData[stepIndex] || stepsData[stepsData.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      // Determine active call stack frames
      frames.push({ name: "main()", file: "main.cpp", line: activeLine });

      if (stepIndex >= 1 && stepIndex <= 3) {
        frames.unshift({ name: "DSUWithRollback(n = 5)", file: "dsu.cpp", line: activeLine });
      } else if ((stepIndex >= 5 && stepIndex <= 14) || (stepIndex >= 16 && stepIndex <= 20) || (stepIndex >= 21 && stepIndex <= 30)) {
        let iVal = stepIndex >= 21 ? 1 : (stepIndex >= 16 ? 2 : 0);
        let jVal = stepIndex >= 21 ? 2 : (stepIndex >= 16 ? 3 : 1);
        frames.unshift({ name: `unite(i = ${iVal}, j = ${jVal})`, file: "dsu.cpp", line: activeLine });
        
        // Find recursion
        if (stepIndex === 6 || stepIndex === 7) {
          frames.unshift({ name: "find(i = 0)", file: "dsu.cpp", line: activeLine });
        } else if (stepIndex === 8 || stepIndex === 9) {
          frames.unshift({ name: "find(i = 1)", file: "dsu.cpp", line: activeLine });
        } else if (stepIndex === 17) {
          frames.unshift({ name: "find(i = 2)", file: "dsu.cpp", line: activeLine });
        } else if (stepIndex === 18) {
          frames.unshift({ name: "find(i = 3)", file: "dsu.cpp", line: activeLine });
        } else if (stepIndex >= 22 && stepIndex <= 25) {
          frames.unshift({ name: "find(i = 1)", file: "dsu.cpp", line: activeLine });
          if (stepIndex >= 24) {
            frames.unshift({ name: "find(i = 0)", file: "dsu.cpp", line: activeLine });
          }
        } else if (stepIndex === 26) {
          frames.unshift({ name: "find(i = 2)", file: "dsu.cpp", line: activeLine });
        }
      } else if (stepIndex === 31 || stepIndex === 36 || (stepIndex >= 32 && stepIndex <= 35) || (stepIndex >= 37 && stepIndex <= 40)) {
        frames.unshift({ name: "rollback()", file: "dsu.cpp", line: activeLine });
      }

      globalVars.push({ name: "dsu", type: "DSUWithRollback", val: "parent, rank, history", expandable: true });

      // Add local variables based on step vars
      for (const [name, val] of step.vars) {
        vars.push({ name, type: typeof val === "number" ? "int" : "bool", val: val.toString(), expandable: false });
      }

      // Reconstruct logical variables for debugger state tree
      let rollbackStackSize = 0;
      if (stepIndex >= 12) rollbackStackSize = 1;
      if (stepIndex >= 19) rollbackStackSize = 2;
      if (stepIndex >= 28) rollbackStackSize = 3;
      if (stepIndex >= 34) rollbackStackSize = 2;
      if (stepIndex >= 39) rollbackStackSize = 1;
      if (stepIndex >= 41) rollbackStackSize = 1;

      vars.push({ name: "parent_ptr", type: "int*", val: "0x00dsu_parent", expandable: false });
      vars.push({ name: "rank_ptr", type: "int*", val: "0x00dsu_rank", expandable: false });
      vars.push({ name: "rollback_stack_size", type: "int", val: rollbackStackSize, expandable: false });

      // Inline value generator
      let inlineVal = null;
      if (step.vars.length > 0) {
        inlineVal = step.vars.map(v => `${v[0]} = ${v[1]}`).join(", ");
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const step = stepsData[stepIndex];
      if (!step) return null;
      if (step.line === lineNum) {
        return step.vars.map(v => `${v[0]}: ${v[1]}`).join(", ");
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      return getGraphVisualInternal(stepIndex);
    }
  }
};
