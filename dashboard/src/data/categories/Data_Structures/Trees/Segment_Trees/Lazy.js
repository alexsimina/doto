export const data = {
  "presentation": "### Arbore de Intervale cu Lazy Propagation\n\nArborele de intervale cu **Propagare Leneșă (Lazy Propagation)** este o extensie extrem de puternică a structurii clasice de arbore de intervale. Aceasta permite efectuarea de **actualizări pe intervale** (de exemplu, adunarea unei valori $V$ la toate elementele dintr-un interval $[L, R]$) în timp logaritmic $\\mathcal{O}(\\log N)$, păstrând în același timp capacitatea de a face interogări în $\\mathcal{O}(\\log N)$.\n\n### Conceptul de Propagare Leneșă\n\nÎn abordarea naivă, actualizarea unui interval ar necesita modificarea tuturor frunzelor din acel interval, ceea ce ar dura $\\mathcal{O}(N \\log N)$. \n\nPropagarea leneșă optimizează acest proces prin **amânarea** actualizării nodurilor descendente. Atunci când actualizăm un interval $[L, R]$:\n1. Dacă intervalul curent $[start, end]$ al unui nod este complet inclus în intervalul de actualizare $[L, R]$, actualizăm valoarea nodului curent în arbore (deoarece știm exact câte frunze conține intervalul) și **stocăm modificarea** într-un vector suplimentar `lazy[node]`.\n2. Nu continuăm parcurgerea către fii. Ne oprim și marcăm nodul ca având modificări în așteptare pentru descendenți.\n3. Atunci când vizităm ulterior un nod (fie în timpul unui alt `update`, fie în timpul unui `query`), **propagăm (push)** valoarea `lazy[node]` către copiii săi stâng și drept, actualizând valorile acestora în arbore și marcându-i ca leneși la rândul lor. Apoi setăm `lazy[node] = 0`.",
  "complexity": "### Complexitate\n\n- **Timp:**\n  - **Construcție:** $\\mathcal{O}(N)$.\n  - **Actualizare pe interval (Update):** $\\mathcal{O}(\\log N)$. Vizităm cel mult $\\mathcal{O}(\\log N)$ noduri datorită modului leneș de propagare.\n  - **Interogare pe interval (Query):** $\\mathcal{O}(\\log N)$.\n- **Spațiu:** $\\mathcal{O}(N)$. De obicei, vectorii `tree` și `lazy` sunt dimensionați la $4 \\cdot N$.",
  "variations": "### Variații și Cazuri Particulare\n\n1. **Tipuri de Actualizări:**\n   - **Adunare pe interval:** Valoarea unui nod crește cu $(end - start + 1) \\times lazy[node]$.\n   - **Setare pe interval (Assignment):** Toate elementele devin egale cu o valoare $V$. În acest caz, valoarea nodului devine $(end - start + 1) \\times lazy[node]$, iar propagarea rescrie (nu adună) valorile copiilor.\n2. **Edge Cases:**\n   - Intervalul interogat/actualizat este complet în afara limitelor vectorului.\n   - Interval de lungime 1 ($L = R$), caz în care nu mai propagăm către copii (deoarece nodul este frunză).",
  "applications": "### Aplicații în Lumea Reală\n\n- **Grafică 2D și Motoare de Jocuri:** Modificarea proprietăților (strălucire, înălțime, textură) pentru regiuni întregi de pixeli sau tile-uri.\n- **Sisteme de Planificare și Calendar:** Alocarea unei perioade de timp pentru un set de resurse și detecția rapidă a conflictelor.\n- **Baze de Date Spatiale:** Interogări rapide pe regiuni geometrice și modificări masive ale datelor stocate în indexuri R-Tree sau similare.",
  "code": `#include <iostream>
#include <vector>

using namespace std;

struct LazySegTree {
    int n;
    vector<int> tree;
    vector<int> lazy;

    LazySegTree(int size) {
        n = size;
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
    }

    void push(int node, int start, int end) {
        if (lazy[node] != 0) {
            tree[node] += (end - start + 1) * lazy[node];
            if (start != end) {
                lazy[2 * node] += lazy[node];
                lazy[2 * node + 1] += lazy[node];
            }
            lazy[node] = 0;
        }
    }

    void updateRange(int node, int start, int end, int l, int r, int val) {
        push(node, start, end);
        if (start > end || start > r || end < l) {
            return;
        }
        if (start >= l && end <= r) {
            lazy[node] += val;
            push(node, start, end);
            return;
        }
        int mid = (start + end) / 2;
        updateRange(2 * node, start, mid, l, r, val);
        updateRange(2 * node + 1, mid + 1, end, l, r, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    int queryRange(int node, int start, int end, int l, int r) {
        push(node, start, end);
        if (start > end || start > r || end < l) {
            return 0;
        }
        if (start >= l && end <= r) {
            return tree[node];
        }
        int mid = (start + end) / 2;
        int p1 = queryRange(2 * node, start, mid, l, r);
        int p2 = queryRange(2 * node + 1, mid + 1, end, l, r);
        return p1 + p2;
    }
};

int main() {
    int n = 4;
    LazySegTree st(n);

    // Adaugam +5 pe intervalul [0, 2]
    st.updateRange(1, 0, n - 1, 0, 2, 5);

    // Cerem suma pe intervalul [1, 3]
    int ans1 = st.queryRange(1, 0, n - 1, 1, 3);
    cout << "Suma pe [1, 3] este " << ans1 << endl;

    // Adaugam +10 pe intervalul [1, 1]
    st.updateRange(1, 0, n - 1, 1, 1, 10);

    // Cerem suma pe [1, 2]
    int ans2 = st.queryRange(1, 0, n - 1, 1, 2);
    cout << "Suma pe [1, 2] este " << ans2 << endl;

    return 0;
}
`,
  "explanations": [
    {
      "line": 59,
      "text": "Pornim programul. Funcția main începe execuția.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 60,
      "text": "Definim dimensiunea vectorului n = 4.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 61,
      "text": "Constructorul LazySegTree inițializează vectorii tree și lazy cu 0 (alocând 4*n = 16 elemente).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 64,
      "text": "Apelăm updateRange(1, 0, 3, 0, 2, 5) pentru a aduna +5 pe intervalul [0..2]. Rădăcina acoperă [0..3].",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 29,
      "text": "Apelăm push(1, 0, 3). Rădăcina nu are modificări în așteptare (lazy[1] == 0), deci push nu modifică nimic.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Verificăm dacă intervalul curent [0..3] este inclus complet în intervalul de actualizat [0..2]. Nu este, deci împărțim intervalul.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 39,
      "text": "Recursivitate pe fiul stâng: updateRange(2, 0, 1, 0, 2, 5).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 29,
      "text": "push(2, 0, 1) nu face modificări deoarece lazy[2] == 0.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Verificăm dacă intervalul [0..1] este inclus în [0..2]. Este inclus complet! Actualizăm direct nodul 2.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "Adăugăm valoarea în lazy: lazy[2] += 5.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 35,
      "text": "Apelăm push(2, 0, 1). lazy[2] este 5, deci tree[2] devine (1-0+1)*5 = 10. Propagăm valoarea: lazy[4] = 5, lazy[5] = 5. Apoi setăm lazy[2] = 0.",
      "blocksVisual": [
        {
          "label": "Tabloul original (Valori logice)",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 40,
      "text": "Revenim în nodul rădăcină și parcurgem fiul drept: updateRange(3, 2, 3, 0, 2, 5).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 29,
      "text": "push(3, 2, 3) nu face modificări deoarece lazy[3] == 0.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Verificăm dacă [2..3] este inclus în [0..2]. Nu este, deci divizăm intervalul în [2..2] (stânga) și [3..3] (dreapta).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 39,
      "text": "Apelăm updateRange(6, 2, 2, 0, 2, 5) pentru fiul stâng al nodului 3.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "0"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Intervalul [2..2] este inclus complet în [0..2]. Setăm lazy[6] += 5 și apelăm push(6, 2, 2). tree[6] devine 5.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 40,
      "text": "Apelăm updateRange(7, 3, 3, 0, 2, 5) pentru fiul drept al nodului 3.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Intervalul [3..3] este în afara limitelor [0..2]. Returnăm direct fără actualizări.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 41,
      "text": "Reasamblăm valorile: tree[3] = tree[6] + tree[7] = 5 + 0 = 5. Apoi tree[1] = tree[2] + tree[3] = 10 + 5 = 15.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 67,
      "text": "Apelăm queryRange(1, 0, 3, 1, 3) pentru a calcula suma pe intervalul [1..3].",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "Apelăm push(1, 0, 3) la rădăcină (fără modificări).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 53,
      "text": "Parcurgem copiii rădăcinii pentru a acoperi [1..3]. Apelăm queryRange pe fiul stâng (nod 2, acoperă [0..1]).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "În nodul 2, push(2, 0, 1) nu aduce modificări. Divizăm deoarece [0..1] nu e complet inclus în [1..3]. Apelăm queryRange pe fiul său stâng (nod 4, [0..0]).",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5 (lazy)"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "În nodul 4, push(4, 0, 0) observă lazy[4] = 5. Actualizează tree[4] = 5 și resetează lazy[4] = 0.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 46,
      "text": "Intervalul [0..0] este în afara limitelor [1..3]. Returnăm 0.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5 (lazy)"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 54,
      "text": "Apelăm queryRange pe fiul drept al nodului 2 (nod 5, [1..1]). push(5, 1, 1) propagă lazy[5] = 5, tree[5] devine 5.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 49,
      "text": "Intervalul [1..1] este inclus în [1..3]. Returnăm tree[5] = 5. De la nodul 2 primim 0 + 5 = 5.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 54,
      "text": "Apelăm queryRange pe fiul drept al rădăcinii (nod 3, [2..3]). push(3, 2, 3) - fără modificări.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 49,
      "text": "Intervalul [2..3] este complet inclus în [1..3]. Returnăm tree[3] = 5 direct.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 55,
      "text": "Suma totală returnată la rădăcină este 5 (stânga) + 5 (dreapta) = 10.",
      "blocksVisual": [
        {
          "label": "Tabloul original",
          "groups": [[{"val": "5"}, {"val": "5"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 68,
      "text": "Afișăm rezultatul primei interogări: \"Suma pe [1, 3] este 10\".",
      "blocksVisual": []
    },
    {
      "line": 71,
      "text": "Apelăm updateRange(1, 0, 3, 1, 1, 10) pentru a aduna +10 la poziția 1 (intervalul [1..1]). Execuția se propagă similar.",
      "blocksVisual": []
    },
    {
      "line": 74,
      "text": "Apelăm queryRange(1, 0, 3, 1, 2) pentru a cere suma pe [1..2].",
      "blocksVisual": [
        {
          "label": "Tabloul original după actualizare",
          "groups": [[{"val": "5"}, {"val": "15"}, {"val": "5"}, {"val": "0"}]]
        }
      ]
    },
    {
      "line": 75,
      "text": "Afișăm rezultatul celei de-a doua interogări: \"Suma pe [1, 2] este 20\".",
      "blocksVisual": []
    },
    {
      "line": 77,
      "text": "Programul se încheie cu succes returnând 0.",
      "blocksVisual": []
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Range Sum Query - Mutable (LeetCode 307)",
        "url": "https://leetcode.com/problems/range-sum-query-mutable/",
        "desc": "Interogarea sumei pe un interval și actualizarea unui element, o problemă introductivă ce pregătește conceptele pentru Lazy Propagation."
      },
      {
        "title": "Knight Tournament (Codeforces 356A)",
        "url": "https://codeforces.com/problemset/problem/356/A",
        "desc": "Actualizarea culorilor cavalerilor eliminați pe un interval și interogarea învingătorului fiecărui cavaler, eficientizată prin lazy propagation."
      }
    ],
    "medium": [
      {
        "title": "Actualizare Interval, Minim Interval (Pbinfo #2091)",
        "url": "https://www.pbinfo.ro/probleme/2091/actualizare-interval-minim-interval",
        "desc": "Implementarea clasică a arborilor de intervale cu actualizare pe interval (setare valoare) și interogare de minim."
      },
      {
        "title": "Circular RMQ (Codeforces 52C)",
        "url": "https://codeforces.com/problemset/problem/52/C",
        "desc": "Determinarea minimului pe un interval circular cu actualizări de tip adunare pe interval (Range Addition Query)."
      }
    ],
    "hard": [
      {
        "title": "Gestiune Hotel (Infoarena hotel)",
        "url": "https://www.infoarena.ro/problema/hotel",
        "desc": "Gestionarea stărilor camerelor unui hotel prin ocupare și eliberare pe intervale, determinând lungimea celei mai mari secvențe de camere libere."
      },
      {
        "title": "Range Module (LeetCode 715)",
        "url": "https://leetcode.com/problems/range-module/",
        "desc": "Urmărirea și interogarea intervalelor de numere reale, necesitând inserarea, ștergerea și interogarea eficientă pe intervale prin Lazy Propagation."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      // Tree state and lazy state step-by-step
      const tree = Array(16).fill(0);
      const lazy = Array(16).fill(0);

      // Simulate states based on stepIndex
      if (stepIndex >= 10) { tree[2] = 10; lazy[4] = 5; lazy[5] = 5; }
      if (stepIndex >= 15) { tree[6] = 5; tree[3] = 5; }
      if (stepIndex >= 18) { tree[1] = 15; }
      if (stepIndex >= 23) { tree[4] = 5; lazy[4] = 0; }
      if (stepIndex >= 25) { tree[5] = 5; lazy[5] = 0; }

      // Second update: [1..1] + 10
      if (stepIndex >= 32) {
        tree[5] = 15;
        tree[2] = 20;
        tree[1] = 25;
      }

      globalVars.push({ name: "st.tree", type: "std::vector<int>", val: `size=16 {${tree.slice(0, 8).join(", ")}, ...}`, expandable: true });
      globalVars.push({ name: "st.lazy", type: "std::vector<int>", val: `size=16 {${lazy.slice(0, 8).join(", ")}, ...}`, expandable: true });
      globalVars.push({ name: "st.n", type: "int", val: "4", expandable: false });

      // Build call stack frame info
      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 2) ? 59 + stepIndex : (stepIndex <= 19 ? 64 : (stepIndex <= 30 ? 67 : (stepIndex <= 31 ? 68 : (stepIndex <= 32 ? 71 : 74)))) });
      
      let nodeVal = -1, startVal = -1, endVal = -1;
      if (stepIndex >= 3 && stepIndex <= 18) {
        frames.unshift({ name: "updateRange()", file: "solution.cpp", line: activeLine });
      } else if (stepIndex >= 19 && stepIndex <= 29) {
        frames.unshift({ name: "queryRange()", file: "solution.cpp", line: activeLine });
      }

      // Local variables based on step index
      if (stepIndex === 3 || stepIndex === 5 || stepIndex === 11 || stepIndex === 18) { nodeVal = 1; startVal = 0; endVal = 3; }
      else if (stepIndex === 4 || stepIndex === 6 || stepIndex === 7 || stepIndex === 10) { nodeVal = 2; startVal = 0; endVal = 1; }
      else if (stepIndex === 12 || stepIndex === 13) { nodeVal = 3; startVal = 2; endVal = 3; }
      else if (stepIndex === 14 || stepIndex === 15) { nodeVal = 6; startVal = 2; endVal = 2; }
      else if (stepIndex === 16 || stepIndex === 17) { nodeVal = 7; startVal = 3; endVal = 3; }
      else if (stepIndex === 20 || stepIndex === 21 || stepIndex === 29) { nodeVal = 1; startVal = 0; endVal = 3; }
      else if (stepIndex === 22) { nodeVal = 2; startVal = 0; endVal = 1; }
      else if (stepIndex === 23 || stepIndex === 24) { nodeVal = 4; startVal = 0; endVal = 0; }
      else if (stepIndex === 25 || stepIndex === 26) { nodeVal = 5; startVal = 1; endVal = 1; }
      else if (stepIndex === 27 || stepIndex === 28) { nodeVal = 3; startVal = 2; endVal = 3; }

      if (nodeVal !== -1) {
        vars.push({ name: "node", type: "int", val: nodeVal.toString(), expandable: false });
        vars.push({ name: "start", type: "int", val: startVal.toString(), expandable: false });
        vars.push({ name: "end", type: "int", val: endVal.toString(), expandable: false });
        vars.push({ name: "mid", type: "int", val: Math.floor((startVal + endVal) / 2).toString(), expandable: false });
      }

      if (nodeVal !== -1) {
        inlineVal = `node: ${nodeVal}, range: [${startVal}..${endVal}]`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let nodeVal = -1, startVal = -1, endVal = -1;
      if (stepIndex === 3 || stepIndex === 5 || stepIndex === 11 || stepIndex === 18) { nodeVal = 1; startVal = 0; endVal = 3; }
      else if (stepIndex === 4 || stepIndex === 6 || stepIndex === 7 || stepIndex === 10) { nodeVal = 2; startVal = 0; endVal = 1; }
      else if (stepIndex === 12 || stepIndex === 13) { nodeVal = 3; startVal = 2; endVal = 3; }
      else if (stepIndex === 14 || stepIndex === 15) { nodeVal = 6; startVal = 2; endVal = 2; }
      else if (stepIndex === 16 || stepIndex === 17) { nodeVal = 7; startVal = 3; endVal = 3; }
      else if (stepIndex === 20 || stepIndex === 21 || stepIndex === 29) { nodeVal = 1; startVal = 0; endVal = 3; }
      else if (stepIndex === 22) { nodeVal = 2; startVal = 0; endVal = 1; }
      else if (stepIndex === 23 || stepIndex === 24) { nodeVal = 4; startVal = 0; endVal = 0; }
      else if (stepIndex === 25 || stepIndex === 26) { nodeVal = 5; startVal = 1; endVal = 1; }
      else if (stepIndex === 27 || stepIndex === 28) { nodeVal = 3; startVal = 2; endVal = 3; }

      if (nodeVal !== -1) {
        if (lineNum === 28 || lineNum === 44) return `node = ${nodeVal}`;
        if (lineNum === 29 || lineNum === 45) return `pushing lazy values`;
        if (lineNum === 38 || lineNum === 52) return `mid = ${(startVal + endVal) >> 1}`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      // Tree nodes & values dynamic state
      const tree = Array(8).fill(0);
      const lazy = Array(8).fill(0);
      let activeNode = -1;

      if (stepIndex >= 10) { tree[2] = 10; lazy[4] = 5; lazy[5] = 5; }
      if (stepIndex >= 15) { tree[6] = 5; tree[3] = 5; }
      if (stepIndex >= 18) { tree[1] = 15; }
      if (stepIndex >= 23) { tree[4] = 5; lazy[4] = 0; }
      if (stepIndex >= 25) { tree[5] = 5; lazy[5] = 0; }

      if (stepIndex >= 32) {
        tree[5] = 15;
        tree[2] = 20;
        tree[1] = 25;
      }

      // Active node highlights
      if (stepIndex === 3 || stepIndex === 5 || stepIndex === 11 || stepIndex === 18) activeNode = 1;
      else if (stepIndex === 4 || stepIndex === 6 || stepIndex === 7 || stepIndex === 10) activeNode = 2;
      else if (stepIndex === 12 || stepIndex === 13) activeNode = 3;
      else if (stepIndex === 14 || stepIndex === 15) activeNode = 6;
      else if (stepIndex === 16 || stepIndex === 17) activeNode = 7;
      else if (stepIndex === 20 || stepIndex === 21 || stepIndex === 29) activeNode = 1;
      else if (stepIndex === 22) activeNode = 2;
      else if (stepIndex === 23 || stepIndex === 24) activeNode = 4;
      else if (stepIndex === 25 || stepIndex === 26) activeNode = 5;
      else if (stepIndex === 27 || stepIndex === 28) activeNode = 3;

      const staticNodes = [
        { id: "1", x: 250, y: 50, label: tree[1].toString(), desc: `[0..3] lazy:${lazy[1]}` },
        { id: "2", x: 130, y: 120, label: tree[2].toString(), desc: `[0..1] lazy:${lazy[2]}` },
        { id: "3", x: 370, y: 120, label: tree[3].toString(), desc: `[2..3] lazy:${lazy[3]}` },
        { id: "4", x: 70, y: 190, label: tree[4].toString(), desc: `[0..0] lazy:${lazy[4]}` },
        { id: "5", x: 190, y: 190, label: tree[5].toString(), desc: `[1..1] lazy:${lazy[5]}` },
        { id: "6", x: 310, y: 190, label: tree[6].toString(), desc: `[2..2] lazy:${lazy[6]}` },
        { id: "7", x: 430, y: 190, label: tree[7].toString(), desc: `[3..3] lazy:${lazy[7]}` }
      ];

      const staticEdges = [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "2", target: "4" },
        { source: "2", target: "5" },
        { source: "3", target: "6" },
        { source: "3", target: "7" }
      ];

      return {
        directed: false,
        title: "Arborele de Intervale (Suma + Lazy)",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === activeNode) state = "active";
          else if (lazy[idNum] > 0) state = "visited"; // Highlight nodes with pending lazy value
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === activeNode);
          return { ...e, active };
        })
      };
    }
  }
};
