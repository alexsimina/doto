const getStates = () => {
  const states = [];
  let sz = [0, 0, 0, 0, 0];
  let removed = [false, false, false, false, false];
  let v = -1, p = -1, u = -1, S = -1, centroid = -1;
  let stack = [];

  for (let step = 0; step < 48; step++) {
    if (step === 7) sz[0] = 1;
    else if (step === 12) sz[1] = 1;
    else if (step === 16) sz[2] = 1;
    else if (step === 19) sz[1] = 2;
    else if (step === 23) sz[3] = 1;
    else if (step === 27) sz[4] = 1;
    else if (step === 29) sz[3] = 2;
    else if (step === 31) sz[1] = 4;
    else if (step === 33) sz[0] = 5;

    v = -1; p = -1; u = -1; S = -1; stack = [];
    if (step >= 6 && step <= 9) {
      v = 0; p = -1; stack = [[0, -1, 'sz']];
      if (step >= 8) u = 1;
    } else if (step === 10) {
      v = 0; p = -1; u = 1; stack = [[0, -1, 'sz']];
    } else if (step >= 11 && step <= 13) {
      v = 1; p = 0; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
      if (step === 13) u = 2;
    } else if (step === 14) {
      v = 1; p = 0; u = 2; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 15 && step <= 18) {
      v = 2; p = 1; stack = [[2, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 19 && step <= 20) {
      v = 1; p = 0; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
      if (step === 20) u = 3;
    } else if (step === 21) {
      v = 1; p = 0; u = 3; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 22 && step <= 24) {
      v = 3; p = 1; stack = [[3, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
      if (step === 24) u = 4;
    } else if (step === 25) {
      v = 3; p = 1; u = 4; stack = [[3, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 26 && step <= 28) {
      v = 4; p = 3; stack = [[4, 3, 'sz'], [3, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 29 && step <= 30) {
      v = 3; p = 1; stack = [[3, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 31 && step <= 32) {
      v = 1; p = 0; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 33 && step <= 34) {
      v = 0; p = -1; stack = [[0, -1, 'sz']];
    } else if (step >= 36 && step <= 38) {
      v = 0; p = -1; S = 5; stack = [[0, -1, 'cent']];
      if (step >= 37) u = 1;
    } else if (step === 39) {
      v = 0; p = -1; S = 5; u = 1; stack = [[0, -1, 'cent']];
    } else if (step >= 40 && step <= 44) {
      v = 1; p = 0; S = 5; stack = [[1, 0, 'cent'], [0, -1, 'cent']];
      if (step === 41 || step === 42) u = 2;
      if (step === 43 || step === 44) u = 3;
    } else if (step === 45) {
      v = 1; p = 0; S = 5; centroid = 1; stack = [[1, 0, 'cent'], [0, -1, 'cent']];
    } else if (step >= 46) {
      centroid = 1; stack = [];
    }

    states.push({
      sz: [...sz],
      removed: [...removed],
      v, p, u, S, centroid,
      stack: [...stack]
    });
  }
  return states;
};

const states = getStates();

export const data = {
  "presentation": "### Descompunerea prin Centroid (Centroid Decomposition)\n\nDescompunerea prin Centroid este o tehnică recursivă de divizare a unui arbore. Un **centroid** este definit ca un nod dintr-un arbore cu $N$ noduri care, odată eliminat, împarte arborele în subarbori/componente conexe disjuncte, fiecare având o dimensiune de maximum $N / 2$ noduri.\n\nFiecare arbore conține întotdeauna cel puțin un centroid (și maximum doi). Algoritmul funcționează astfel:\n1. Găsește centroidul arborelui curent.\n2. Îl elimină virtual (marchează ca `removed`).\n3. Aplică recursiv același procedeu pe toate componentele conexe rămase.\n\nAceastă descompunere creează o nouă structură de arbore, numită **arborele centroid** (Centroid Tree), în care înălțimea este garantată să fie de maximum $O(\\log N)$. Acest lucru ne permite să rezolvăm interogări pe drumuri sau distanțe urcând în noul arbore de la un nod la strămoșii săi centroizi în timp de $O(\\log N)$.",
  "complexity": "### Complexitate\n\n- **Timp Construcție:** $O(N \\log N)$ - găsirea centroidului se face în $O(N)$ la fiecare nivel al recursivității, iar adâncimea maximă a arborelui centroid este de $O(\\log N)$.\n- **Spațiu:** $O(N)$ - pentru memorarea structurii arborelui inițial și a arborelui centroid obținut (inclusiv a vectorilor de mărimi și stări).",
  "variations": "### Variații și Cazuri Particulare\n\n- **Centroid Decomposition Dinamică**: Păstrarea informațiilor agregate despre nodurile active/colorate sub fiecare centroid în structuri precum liste ordonate sau `std::multiset` pentru a răspunde la interogări dinamice în timp de $O(\\log^2 N)$.\n- **Căutarea a doi centroizi**: Dacă dimensiunile subarborilor rezultați după ștergere sunt exact $N/2$, există doi centroizi adiacenți în arbore.",
  "applications": "### Aplicații Reale\n\n- Numărarea perechilor de noduri $(u, v)$ din arbore aflate la o distanță exactă sau cel mult egală cu $K$.\n- Rezolvarea problemelor dinamice în care nodurile își schimbă culoarea/starea și se cere distanța minimă de la un nod dat la cel mai apropiat nod dintr-o anumită categorie.\n- Analiza rețelelor de transport și identificarea punctelor cheie de deconectare.",
  "code": `#include <iostream>
#include <vector>

using namespace std;

vector<int> sz;
vector<bool> removed;

void dfs_sz(int v, int p, const vector<vector<int>>& adj) {
    sz[v] = 1;
    for (int u : adj[v]) {
        if (u != p && !removed[u]) {
            dfs_sz(u, v, adj);
            sz[v] += sz[u];
        }
    }
}

int get_centroid(int v, int p, int S, const vector<vector<int>>& adj) {
    for (int u : adj[v]) {
        if (u != p && !removed[u]) {
            if (sz[u] > S / 2) {
                return get_centroid(u, v, S, adj);
            }
        }
    }
    return v;
}

int main() {
    int N = 5;
    vector<vector<int>> adj = {
        {1},
        {0, 2, 3},
        {1},
        {1, 4},
        {3}
    };
    sz.assign(N, 0);
    removed.assign(N, false);
    dfs_sz(0, -1, adj);
    int centroid = get_centroid(0, -1, sz[0], adj);
    cout << "Centroid: " << centroid << endl;
    return 0;
}`,
  "explanations": [
    {
      "line": 30,
      "text": "Începem executarea funcției `main()`.",
      "blocksVisual": []
    },
    {
      "line": 31,
      "text": "Declarăm numărul total de noduri în arbore: $N = 5$.",
      "blocksVisual": []
    },
    {
      "line": 32,
      "text": "Inițializăm lista de adiacență `adj` cu muchiile arborelui în formă de stea alungită: 0 - 1 - 3 - 4 și 1 - 2.",
      "blocksVisual": []
    },
    {
      "line": 39,
      "text": "Alocăm memorie pentru vectorul `sz` de dimensiune $N$ și îl umplem cu 0.",
      "blocksVisual": []
    },
    {
      "line": 40,
      "text": "Alocăm vectorul `removed` umplut cu `false`. Acesta urmărește ce noduri au fost eliminate ca centroizi la pașii anteriori.",
      "blocksVisual": []
    },
    {
      "line": 41,
      "text": "Apelăm `dfs_sz(0, -1)` pentru a calcula dimensiunile subarborilor, având ca rădăcină temporară nodul 0.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 0.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Inițializăm dimensiunea `sz[0] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Parcurgem vecinii nodului 0. Singurul vecin este nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 12,
      "text": "Verificăm vecinul 1: este diferit de părinte (-1) și nu a fost eliminat.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs_sz(1, 0)` pentru fiul 1.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Inițializăm `sz[1] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Parcurgem vecinii nodului 1. Primul vecin nerezolvat este 2.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs_sz(2, 1)` pentru fiul 2.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 2.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Setăm `sz[2] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Nodul 2 nu are alți fii diferiți de părintele 1, deci bucla sa se termină.",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Ieșim din `dfs_sz(2, 1)`.",
      "blocksVisual": []
    },
    {
      "line": 14,
      "text": "Revenim în nodul 1. Actualizăm dimensiunea sa: `sz[1] += sz[2]` (1 + 1 = 2).",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Trecem la următorul vecin al nodului 1, care este 3.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs_sz(3, 1)` pentru fiul 3.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 3.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Setăm `sz[3] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Parcurgem vecinii nodului 3. Vecinul diferit de părinte este 4.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `dfs_sz(4, 3)`.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 4.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Setăm `sz[4] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Nodul 4 nu are fii, ieșim din `dfs_sz(4, 3)`.",
      "blocksVisual": []
    },
    {
      "line": 14,
      "text": "Revenim în nodul 3. Actualizăm: `sz[3] += sz[4]` (1 + 1 = 2).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Finalizăm `dfs_sz(3, 1)`.",
      "blocksVisual": []
    },
    {
      "line": 14,
      "text": "Revenim în nodul 1. Actualizăm: `sz[1] += sz[3]` (2 + 2 = 4).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Am vizitat toți vecinii nodului 1. Finalizăm `dfs_sz(1, 0)`.",
      "blocksVisual": []
    },
    {
      "line": 14,
      "text": "Revenim în rădăcina 0. Actualizăm: `sz[0] += sz[1]` (1 + 4 = 5).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Am vizitat toți vecinii nodului 0. Parcurgerea de dimensiune s-a terminat, obținând $S = sz[0] = 5$.",
      "blocksVisual": []
    },
    {
      "line": 42,
      "text": "Apelăm funcția `get_centroid` pornind de la nodul 0, cu părintele -1 și dimensiunea totală a componentei $S = sz[0] = 5$.",
      "blocksVisual": []
    },
    {
      "line": 19,
      "text": "Intrăm în `get_centroid(0, -1, 5)`.",
      "blocksVisual": []
    },
    {
      "line": 20,
      "text": "Parcurgem vecinii nodului 0 pentru a găsi un subarbore cu dimensiunea mai mare de $S/2 = 2.5$. Singurul vecin este 1.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "Verificăm dacă `sz[1]` (4) > 2. Deoarece $4 > 2$, subarborele nodului 1 conține majoritatea nodurilor.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Ne deplasăm în nodul 1 prin apelul recursiv `get_centroid(1, 0, 5)`.",
      "blocksVisual": []
    },
    {
      "line": 19,
      "text": "Intrăm în `get_centroid(1, 0, 5)`.",
      "blocksVisual": []
    },
    {
      "line": 20,
      "text": "Parcurgem vecinii nodului 1 (excluzând părintele 0): 2 și 3. Primul analizat este 2.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "Verificăm dacă `sz[2]` (1) > 2. Condiția este falsă.",
      "blocksVisual": []
    },
    {
      "line": 20,
      "text": "Trecem la următorul vecin al nodului 1, care este 3.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "Verificăm dacă `sz[3]` (2) > 2. Condiția este falsă ($2 \\ngtr 2$).",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Niciunul dintre vecinii nodului 1 nu are dimensiunea subarborelui strict mai mare de $S/2 = 2$. Prin urmare, nodul 1 este centroidul componentei!",
      "blocksVisual": []
    },
    {
      "line": 43,
      "text": "Revenim în `main()` și afișăm valoarea centroidului: 1.",
      "blocksVisual": []
    },
    {
      "line": 44,
      "text": "Programul se încheie cu succes.",
      "blocksVisual": []
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Find Center of Star Graph (LeetCode 1791)",
        "url": "https://leetcode.com/problems/find-center-of-star-graph/",
        "desc": "Găsirea centrului unui graf stea, un exercițiu simplu de familiarizare cu noțiunea de nod central."
      },
      {
        "title": "Minimum Height Trees (LeetCode 310)",
        "url": "https://leetcode.com/problems/minimum-height-trees/",
        "desc": "Identificarea rădăcinilor care minimizează înălțimea unui arbore, concept strâns legat de determinarea centroidului."
      }
    ],
    "medium": [
      {
        "title": "Ciel the Commander (Codeforces 321C)",
        "url": "https://codeforces.com/problemset/problem/321/C",
        "desc": "Atribuirea de etichete alfabetice nodurilor unui arbore astfel încât calea dintre oricare două noduri cu aceeași etichetă să conțină o etichetă superioară."
      },
      {
        "title": "Xenia and Tree (Codeforces 342E)",
        "url": "https://codeforces.com/problemset/problem/342/E",
        "desc": "Actualizarea culorii unui nod și determinarea distanței minime de la un nod dat la cel mai apropiat nod colorat, folosind un Centroid Tree."
      }
    ],
    "hard": [
      {
        "title": "Ecotraseu (Infoarena ecotraseu)",
        "url": "https://www.infoarena.ro/problema/ecotraseu",
        "desc": "Calcularea numărului de drumuri simple cu proprietăți restrictive de cost și lungime, utilizând eficient tehnica Centroid Decomposition."
      },
      {
        "title": "Close Vertices (Codeforces 293E)",
        "url": "https://codeforces.com/problemset/problem/293/E",
        "desc": "Numărarea perechilor de noduri cu distanța dintre ele de cel puțin o valoare dată și cu suma costurilor muchiilor de cel mult o limită, combinând Centroid Decomposition cu vectori indexați binar (AIB)."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const state = states[stepIndex] || states[states.length - 1];

      if (state.v !== -1) {
        vars.push({ name: 'v', type: 'int', val: state.v, expandable: false });
        if (state.p !== -1) {
          vars.push({ name: 'p', type: 'int', val: state.p, expandable: false });
        }
        if (state.u !== -1) {
          vars.push({ name: 'u', type: 'int', val: state.u, expandable: false });
        }
      }

      globalVars.push({ name: 'N', type: 'int', val: '5', expandable: false });
      globalVars.push({ name: 'sz', type: 'std::vector<int>&', val: `{${state.sz.join(', ')}}`, expandable: false });
      globalVars.push({ name: 'removed', type: 'std::vector<bool>&', val: `{${state.removed.map(b => b ? 'true' : 'false').join(', ')}}`, expandable: false });

      if (state.stack.length === 0) {
        frames.push({ name: 'main()', file: 'main.cpp', line: activeLine });
      } else {
        const top = state.stack[0];
        if (top[2] === 'sz') {
          frames.push({ name: `dfs_sz(v = ${top[0]}, p = ${top[1]}, adj)`, file: 'centroid.cpp', line: activeLine });
        } else {
          frames.push({ name: `get_centroid(v = ${top[0]}, p = ${top[1]}, S = ${state.S}, adj)`, file: 'centroid.cpp', line: activeLine });
        }
        for (let i = 1; i < state.stack.length; i++) {
          const frame = state.stack[i];
          if (frame[2] === 'sz') {
            frames.push({ name: `dfs_sz(v = ${frame[0]}, p = ${frame[1]}, adj)`, file: 'centroid.cpp', line: 13 });
          } else {
            frames.push({ name: `get_centroid(v = ${frame[0]}, p = ${frame[1]}, S = ${state.S}, adj)`, file: 'centroid.cpp', line: 23 });
          }
        }
        const mainLine = state.stack[0][2] === 'sz' ? 41 : 42;
        frames.push({ name: 'main()', file: 'main.cpp', line: mainLine });
      }

      if (state.v !== -1) {
        inlineVal = `v: ${state.v}`;
        if (state.u !== -1) inlineVal += `, u: ${state.u}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const state = states[stepIndex] || states[states.length - 1];
      if ((lineNum === 9 || lineNum === 10 || lineNum === 11 || lineNum === 19 || lineNum === 27) && state.v !== -1) {
        return `v: ${state.v}`;
      }
      if ((lineNum === 11 || lineNum === 12 || lineNum === 13 || lineNum === 20 || lineNum === 21 || lineNum === 22) && state.u !== -1) {
        return `u: ${state.u}`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const state = states[stepIndex] || states[states.length - 1];
      const staticNodes = [
        { id: "0", x: 60, y: 110, label: "0" },
        { id: "1", x: 140, y: 110, label: "1" },
        { id: "2", x: 140, y: 180, label: "2" },
        { id: "3", x: 220, y: 110, label: "3" },
        { id: "4", x: 300, y: 110, label: "4" }
      ];
      const staticEdges = [
        { source: "0", target: "1" },
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "3", target: "4" }
      ];

      return {
        directed: false,
        title: "Căutare Centroid",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let nodeState = undefined;
          if (idNum === state.v) {
            nodeState = "active";
          } else if (state.centroid === idNum) {
            nodeState = "visited";
          } else if (state.sz[idNum] > 0) {
            nodeState = "visited";
          }

          let desc = "";
          if (state.centroid !== -1) {
            if (idNum === 1) desc = "Centroid";
            else if (idNum === 0) desc = "Comp A";
            else if (idNum === 2) desc = "Comp B";
            else if (idNum === 3 || idNum === 4) desc = "Comp C";
          } else if (state.sz[idNum] > 0) {
            desc = `sz=${state.sz[idNum]}`;
          }
          return { ...n, state: nodeState, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = (u === state.v && v === state.u) || (v === state.v && u === state.u);
          if (!active && state.stack.length > 1) {
            for (let i = 0; i < state.stack.length - 1; i++) {
              const su = state.stack[i][0], sv = state.stack[i + 1][0];
              if ((su === u && sv === v) || (su === v && sv === u)) {
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
