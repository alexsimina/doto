const getGraphVisualInternal = (stepIndex) => {
  const nodes = [
    { id: "0", label: "0 (C:1)", x: 200, y: 50 },
    { id: "1", label: "1 (C:2)", x: 120, y: 130 },
    { id: "2", label: "2 (C:1)", x: 280, y: 130 },
    { id: "3", label: "3 (C:2)", x: 60, y: 210 },
    { id: "4", label: "4 (C:2)", x: 180, y: 210 }
  ];

  const edges = [
    { source: "0", target: "1", weight: "Fiu Mare" },
    { source: "0", target: "2", weight: "Fiu Mic" },
    { source: "1", target: "3", weight: "Fiu Mare" },
    { source: "1", target: "4", weight: "Fiu Mic" }
  ];

  // Determine active node
  let activeNode = -1;
  if (stepIndex === 4 || stepIndex === 5 || stepIndex === 14 || stepIndex === 29) activeNode = 0;
  else if (stepIndex === 15 || stepIndex === 21 || stepIndex === 24 || stepIndex === 25 || stepIndex === 28) activeNode = 1;
  else if (stepIndex >= 6 && stepIndex <= 13) activeNode = 2;
  else if (stepIndex === 22 || stepIndex === 23) activeNode = 3;
  else if (stepIndex >= 16 && stepIndex <= 20) activeNode = 4;

  // Determine which nodes are in the "sack" (tabela de frecvență)
  const inSack = new Set();
  if (stepIndex >= 9 && stepIndex <= 11) {
    inSack.add(2);
  }
  if (stepIndex >= 17 && stepIndex <= 19) {
    inSack.add(4);
  }
  if (stepIndex >= 22) {
    inSack.add(3);
  }
  if (stepIndex >= 25) {
    inSack.add(1);
  }
  if (stepIndex >= 27) {
    inSack.add(4);
  }
  if (stepIndex >= 30) {
    inSack.add(0);
    inSack.add(2);
  }

  const enrichedNodes = nodes.map(n => {
    const idNum = parseInt(n.id);
    let state = undefined;
    if (idNum === activeNode) {
      state = "active";
    } else if (inSack.has(idNum)) {
      state = "visited";
    }

    // Node descriptions containing sizes & big child details
    let desc = "";
    if (idNum === 0) desc = "sz: 5, big: 1";
    else if (idNum === 1) desc = "sz: 3, big: 3";
    else desc = "sz: 1, big: -1";

    if (inSack.has(idNum)) {
      desc += " [În Sac]";
    }

    return { ...n, state, desc };
  });

  const enrichedEdges = edges.map(e => {
    const u = parseInt(e.source), v = parseInt(e.target);
    const active = (u === activeNode || v === activeNode);
    return { ...e, active };
  });

  return {
    directed: true,
    title: "Sack (DSU pe Arbori) - Arbore / DP pe Arbori",
    nodes: enrichedNodes,
    edges: enrichedEdges
  };
};

const getBlocksVisualInternal = (stepIndex) => {
  const cnt = [0, 0, 0]; // cnt[0], cnt[1], cnt[2]

  if (stepIndex >= 9 && stepIndex <= 11) cnt[1] = 1;
  if (stepIndex >= 17 && stepIndex <= 19) cnt[2] = 1;
  if (stepIndex >= 22 && stepIndex <= 24) cnt[2] = 1;
  if (stepIndex === 25 || stepIndex === 26) cnt[2] = 2;
  if (stepIndex >= 27 && stepIndex <= 29) cnt[2] = 3;
  if (stepIndex === 30) {
    cnt[1] = 1;
    cnt[2] = 3;
  }
  if (stepIndex >= 31) {
    cnt[1] = 2;
    cnt[2] = 3;
  }

  return [
    {
      label: "Tabela de Frecvență a Culorilor (cnt)",
      groups: [
        [
          { val: `cnt[1] (Culoare 1): ${cnt[1]}`, active: stepIndex === 9 || stepIndex === 12 || stepIndex === 30 || stepIndex === 31 },
          { val: `cnt[2] (Culoare 2): ${cnt[2]}`, active: stepIndex === 17 || stepIndex === 20 || stepIndex === 22 || stepIndex === 25 || stepIndex === 27 }
        ]
      ]
    }
  ];
};

const stepsData = [
  { line: 70, text: "Inițializăm parcurgerea pentru calcularea dimensiunilor apelând `dfs_sz(0, -1)`.", vars: [] },
  { line: 15, text: "Suntem la nodul 0. Inițializăm dimensiunea subarborelui `sz[0] = 1` și `big_child[0] = -1`.", vars: [["u", 0], ["p", -1]] },
  { line: 20, text: "După finalizarea parcurgerii `dfs_sz` pe întreg arborele, avem dimensiunile calculate.", vars: [] },
  { line: 71, text: "Pornim parcurgerea principală `dfs_sack(0, -1, true)` pe rădăcina 0.", vars: [["u", 0], ["p", -1], ["keep", "true"]] },
  { line: 40, text: "Parcurgem fiii nodului 0 pentru a rezolva fiii mici (light children). Fiii lui 0 sunt [1, 2].", vars: [["u", 0], ["big_child[0]", 1]] },
  { line: 42, text: "Nodul 2 este fiu mic. Apelăm recursiv `dfs_sack(2, 0, false)`.", vars: [["v", 2], ["keep", "false"]] },
  { line: 40, text: "Nodul 2 nu are niciun fiu în afară de părintele său 0.", vars: [["u", 2]] },
  { line: 45, text: "Verificăm dacă nodul 2 are fiu mare. `big_child[2]` este -1.", vars: [["big_child[2]", -1]] },
  { line: 48, text: "Adăugăm subarborele lui 2 în tabela de frecvență. Apelăm `add(2, 0, 1, -1)`.", vars: [["u", 2]] },
  { line: 31, text: "Culoarea nodului 2 este 1. Incrementăm `cnt[1]`. `cnt[1]` devine 1.", vars: [["col[2]", 1], ["cnt[1]", 1]] },
  { line: 49, text: "Salvăm răspunsul pentru nodul 2: `ans[2] = cnt[col[2]]` = 1.", vars: [["ans[2]", 1]] },
  { line: 51, text: "Deoarece `keep = false` (2 este fiu mic), ștergem frecvențele sale cu `add(2, 0, -1, -1)`.", vars: [] },
  { line: 31, text: "Decrementăm `cnt[1]`. `cnt[1]` devine 0.", vars: [["cnt[1]", 0]] },
  { line: 46, text: "Revenim în nodul 0. Apelăm `dfs_sack(1, 0, true)` pentru fiul mare (big child) 1.", vars: [["big_child[0]", 1], ["keep", "true"]] },
  { line: 40, text: "La nodul 1, parcurgem fiii mici. Fiii lui 1 sunt [3, 4], iar fiul mare este 3. Deci 4 este fiu mic.", vars: [["u", 1], ["big_child[1]", 3]] },
  { line: 42, text: "Nodul 4 este fiu mic. Apelăm recursiv `dfs_sack(4, 1, false)`.", vars: [["v", 4], ["keep", "false"]] },
  { line: 48, text: "Adăugăm subarborele lui 4 în tabela de frecvență apelând `add(4, 1, 1, -1)`.", vars: [["u", 4]] },
  { line: 31, text: "Culoarea nodului 4 este 2. Incrementăm `cnt[2]`. `cnt[2]` devine 1.", vars: [["col[4]", 2], ["cnt[2]", 1]] },
  { line: 49, text: "Salvăm răspunsul pentru nodul 4: `ans[4] = 1`.", vars: [["ans[4]", 1]] },
  { line: 51, text: "Fiind fiu mic (`keep = false`), ștergem frecvența lui 4 din tabelă.", vars: [["cnt[2]", 0]] },
  { line: 46, text: "Revenim în nodul 1. Apelăm `dfs_sack(3, 1, true)` pe fiul mare 3, cu `keep = true`.", vars: [["big_child[1]", 3]] },
  { line: 48, text: "Adăugăm subarborele lui 3 în tabela de frecvență. Culoarea lui 3 este 2. `cnt[2]` devine 1.", vars: [["u", 3]] },
  { line: 49, text: "Salvăm răspunsul pentru nodul 3: `ans[3] = cnt[2] = 1`.", vars: [["ans[3]", 1]] },
  { line: 48, text: "Revenim în nodul 1. Adăugăm elementele nodului curent 1 și ale fiilor săi mici în tabelă.", vars: [["u", 1], ["big_child[1]", 3]] },
  { line: 31, text: "Culoarea nodului 1 este 2. Incrementăm `cnt[2]` de la 1 la 2.", vars: [["cnt[2]", 2]] },
  { line: 34, text: "Coborâm recursiv în fiul mic (light child) 4 pentru a-l adăuga în tabelă.", vars: [["v", 4]] },
  { line: 31, text: "Culoarea nodului 4 este 2. Incrementăm `cnt[2]` de la 2 la 3.", vars: [["cnt[2]", 3]] },
  { line: 49, text: "Salvăm răspunsul pentru nodul 1: `ans[1] = cnt[2] = 3`.", vars: [["ans[1]", 3]] },
  { line: 48, text: "Revenim în rădăcina 0. Adăugăm nodul curent 0 și subarborii fiilor mici (nodul 2) în tabela de frecvență.", vars: [["u", 0], ["big_child[0]", 1]] },
  { line: 31, text: "Culoarea nodului 0 este 1. Incrementăm `cnt[1]`. `cnt[1]` devine 1.", vars: [["cnt[1]", 1]] },
  { line: 34, text: "Coborâm recursiv în fiul mic 2 pentru a-l adăuga în tabelă.", vars: [["v", 2]] },
  { line: 31, text: "Culoarea nodului 2 este 1. Incrementăm `cnt[1]` de la 1 la 2.", vars: [["cnt[1]", 2]] },
  { line: 49, text: "Salvăm răspunsul final pentru rădăcina 0: `ans[0] = cnt[1] = 2`.", vars: [["ans[0]", 2]] },
  { line: 72, text: "Algoritmul se încheie cu succes. Răspunsurile finale au fost salvate.", vars: [] }
];

export const data = {
  "presentation": "### DSU on Trees (Sack)\n\n**DSU on Trees** (cunoscut și sub numele de **Sack** sau algoritmul lui Lando) este o tehnică extrem de eficientă folosită pentru a răspunde la interogări despre subarbori în $O(N \\log N)$ timp total, atunci când nu există modificări structurale în arbore (este o tehnică offline).\n\n### Cum funcționează?\n\nTehnica se bazează pe conceptul de **Heavy-Light Decomposition**: pentru fiecare nod, identificăm fiul cu cel mai mare subarbore (numit **fiul mare** / *heavy child*), ceilalți fii fiind **fii mici** / *light children*.\n\nEtapele algoritmului:\n1. Parcurgem recursiv fiii mici ai lui $u$ și calculăm răspunsurile lor, dar le ștergem contribuția din structura de date globală la întoarcere (folosind `keep = false`).\n2. Parcurgem fiul mare al lui $u$ și calculăm răspunsul său, păstrându-i datele în structura globală (`keep = true`).\n3. Parcurgem din nou toți fiii mici ai lui $u$ și le adăugăm valorile înapoi în structura globală (care conținea deja datele fiului mare).\n4. Adăugăm informațiile nodului curent $u$. În acest moment, structura globală conține exact toate elementele din subarborele lui $u$, deci putem salva răspunsul pentru $u$.\n5. Dacă $u$ a fost apelat cu `keep = false`, ștergem toate valorile sale din structură înainte de a ne întoarce la părinte.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(N \\log N)$ total. Fiecare nod $u$ este adăugat în structura globală doar atunci când calea de la $u$ la rădăcină trece printr-o muchie ușoară (light edge). Deoarece pe orice cale de la un nod la rădăcină există cel mult $O(\\log N)$ muchii ușoare, fiecare nod este adăugat și șters de maximum $O(\\log N)$ ori.\n- **Spațiu:** $O(N)$ memorie pentru stocarea arborelui și a structurii de date globale (tabela de frecvență).",
  "variations": "### Variații și Tehnici Similare\n\n- **Merge de Map-uri**: O altă variantă de a rezolva probleme de acest tip este să menținem câte un `std::map` sau `std::set` pentru fiecare nod și să le unim întotdeauna pe cele mici în cele mai mari (Small-to-Large merging). Deși este mai ușor de implementat direct, merge-ul de map-uri are o constantă mai mare și timp de $O(N \\log^2 N)$ din cauza inserărilor în map.\n- **Segment Tree Merging**: Permite rezolvarea interogărilor pe subarbori în mod dinamic, dar consumă $O(N \\log N)$ memorie suplimentară.",
  "applications": "### Aplicații Practice\n\n- Determinarea numărului de valori distincte în fiecare subarbore al unui arbore.\n- Găsirea culorii dominante sau a elementelor cu frecvență maximă în subarbori.\n- Numărarea perechilor de noduri cu anumite proprietăți în subarbore.",
  "code": `#include <iostream>
#include <vector>

using namespace std;

int n;
vector<vector<int>> adj;
vector<int> col;
vector<int> sz;
vector<int> big_child;
vector<int> cnt;
vector<int> ans;

void dfs_sz(int u, int p) {
    sz[u] = 1;
    big_child[u] = -1;
    int max_sz = -1;
    for (int v : adj[u]) {
        if (v != p) {
            dfs_sz(v, u);
            sz[u] += sz[v];
            if (sz[v] > max_sz) {
                max_sz = sz[v];
                big_child[u] = v;
            }
        }
    }
}

void add(int u, int p, int val, int bigChild) {
    cnt[col[u]] += val;
    for (int v : adj[u]) {
        if (v != p && v != bigChild) {
            add(v, u, val, -1);
        }
    }
}

void dfs_sack(int u, int p, bool keep) {
    for (int v : adj[u]) {
        if (v != p && v != big_child[u]) {
            dfs_sack(v, u, false);
        }
    }
    if (big_child[u] != -1) {
        dfs_sack(big_child[u], u, true);
    }
    add(u, p, 1, big_child[u]);
    ans[u] = cnt[col[u]];
    if (!keep) {
        add(u, p, -1, -1);
    }
}

int main() {
    n = 5;
    adj.resize(n);
    col = {1, 2, 1, 2, 2};
    sz.resize(n);
    big_child.resize(n);
    cnt.resize(3, 0);
    ans.resize(n);

    adj[0] = {1, 2};
    adj[1] = {0, 3, 4};
    adj[2] = {0};
    adj[3] = {1};
    adj[4] = {1};

    dfs_sz(0, -1);
    dfs_sack(0, -1, true);
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
        "title": "Lomsat gelral",
        "url": "https://codeforces.com/contest/600/problem/E",
        "desc": "Calcularea sumei culorilor dominante pentru fiecare subarbore din arbore."
      }
    ],
    "medium": [
      {
        "title": "Tree Queries",
        "url": "https://codeforces.com/contest/375/problem/D",
        "desc": "Răspundeți la interogări de tipul: câte culori apar de cel puțin K ori în subarborele nodului U?"
      }
    ],
    "hard": [
      {
        "title": "Dominant Coloring",
        "url": "https://codeforces.com/problemset/problem/343/D",
        "desc": "Menținerea stărilor subarborilor cu modificări și propagare rapidă."
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

      // Reconstruct active call stack
      frames.push({ name: "main()", file: "main.cpp", line: activeLine });

      if (stepIndex === 1 || stepIndex === 2) {
        frames.unshift({ name: "dfs_sz(u = 0, p = -1)", file: "sack.cpp", line: activeLine });
      } else if (stepIndex >= 3) {
        // Setup frames for dfs_sack
        if (stepIndex >= 3 && stepIndex <= 13) {
          frames.unshift({ name: "dfs_sack(u = 0, p = -1, keep = true)", file: "sack.cpp", line: activeLine });
          if (stepIndex >= 5 && stepIndex <= 12) {
            frames.unshift({ name: "dfs_sack(u = 2, p = 0, keep = false)", file: "sack.cpp", line: activeLine });
            if (stepIndex >= 8 && stepIndex <= 12) {
              frames.unshift({ name: "add(u = 2, p = 0, val = 1, bigChild = -1)", file: "sack.cpp", line: activeLine });
            }
          }
        } else if (stepIndex >= 14 && stepIndex <= 28) {
          frames.unshift({ name: "dfs_sack(u = 0, p = -1, keep = true)", file: "sack.cpp", line: activeLine });
          frames.unshift({ name: "dfs_sack(u = 1, p = 0, keep = true)", file: "sack.cpp", line: activeLine });
          
          if (stepIndex >= 15 && stepIndex <= 19) {
            frames.unshift({ name: "dfs_sack(u = 4, p = 1, keep = false)", file: "sack.cpp", line: activeLine });
            if (stepIndex >= 17) {
              frames.unshift({ name: "add(u = 4, p = 1, val = 1, bigChild = -1)", file: "sack.cpp", line: activeLine });
            }
          } else if (stepIndex >= 20 && stepIndex <= 22) {
            frames.unshift({ name: "dfs_sack(u = 3, p = 1, keep = true)", file: "sack.cpp", line: activeLine });
            if (stepIndex >= 21) {
              frames.unshift({ name: "add(u = 3, p = 1, val = 1, bigChild = -1)", file: "sack.cpp", line: activeLine });
            }
          } else if (stepIndex >= 23 && stepIndex <= 27) {
            frames.unshift({ name: "add(u = 1, p = 0, val = 1, bigChild = 3)", file: "sack.cpp", line: activeLine });
          }
        } else if (stepIndex >= 29 && stepIndex <= 32) {
          frames.unshift({ name: "dfs_sack(u = 0, p = -1, keep = true)", file: "sack.cpp", line: activeLine });
          if (stepIndex >= 29) {
            frames.unshift({ name: "add(u = 0, p = -1, val = 1, bigChild = 1)", file: "sack.cpp", line: activeLine });
          }
        }
      }

      globalVars.push({ name: "col", type: "std::vector<int>", val: "{1, 2, 1, 2, 2}", expandable: false });
      globalVars.push({ name: "sz", type: "std::vector<int>", val: stepIndex >= 2 ? "{5, 3, 1, 1, 1}" : "{0, 0, 0, 0, 0}", expandable: false });
      globalVars.push({ name: "big_child", type: "std::vector<int>", val: stepIndex >= 2 ? "{1, 3, -1, -1, -1}" : "{}", expandable: false });

      for (const [name, val] of step.vars) {
        vars.push({ name, type: name === "keep" ? "bool" : "int", val: val.toString(), expandable: false });
      }

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
