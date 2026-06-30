const steps = [
  { line: 41, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: null, v: null, text: "Se apelează funcția `maxBipartiteMatching()` din `main`." },
  { line: 25, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: null, v: null, text: "Inițializăm vectorul de cuplaje `pairR` cu `-1` (toate nodurile din dreapta sunt libere)." },
  { line: 26, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: null, v: null, text: "Inițializăm dimensiunea cuplajului `matchingSize = 0`." },
  { line: 27, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: 0, v: null, text: "Pornim bucla exterioară pentru nodul din stânga `u = 0`." },
  { line: 28, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: 0, v: null, text: "Resetăm vectorul de vizitare `vis` cu `false` pentru toate nodurile din dreapta." },
  { line: 29, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: 0, v: null, text: "Apelăm `dfs(0)` pentru a găsi un drum alternant începând de la nodul stâng `0`." },
  { line: 12, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: 0, v: null, text: "Intrăm în `dfs(0)`. Începem parcurgerea vecinilor nodului stâng `0`." },
  { line: 13, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: 0, v: 0, text: "Analizăm primul vecin al nodului `0` din stânga, care este `v = 0` (dreapta)." },
  { line: 14, pairR: [-1, -1, -1], vis: [false, false, false], matchingSize: 0, u: 0, v: 0, text: "Nodul `v = 0` nu a fost încă vizitat în acest DFS. Trecem la pasul următor." },
  { line: 15, pairR: [-1, -1, -1], vis: [true, false, false], matchingSize: 0, u: 0, v: 0, text: "Marcăm nodul din dreapta `0` ca vizitat: `vis[0] = true`." },
  { line: 16, pairR: [-1, -1, -1], vis: [true, false, false], matchingSize: 0, u: 0, v: 0, text: "Verificăm dacă `v = 0` este liber sau se poate re-cupla. Deoarece `pairR[0] == -1` (este liber), condiția este îndeplinită." },
  { line: 17, pairR: [0, -1, -1], vis: [true, false, false], matchingSize: 0, u: 0, v: 0, text: "Cuplăm nodul `0` din dreapta cu nodul `0` din stânga: `pairR[0] = 0`." },
  { line: 18, pairR: [0, -1, -1], vis: [true, false, false], matchingSize: 0, u: 0, v: 0, text: "Funcția `dfs(0)` se termină cu succes și returnează `true`." },
  { line: 30, pairR: [0, -1, -1], vis: [true, false, false], matchingSize: 1, u: 0, v: null, text: "Deoarece `dfs(0)` a returnat `true`, incrementăm `matchingSize` la `1`." },
  { line: 27, pairR: [0, -1, -1], vis: [true, false, false], matchingSize: 1, u: 1, v: null, text: "Trecem la următorul nod din stânga: `u = 1`." },
  { line: 28, pairR: [0, -1, -1], vis: [false, false, false], matchingSize: 1, u: 1, v: null, text: "Resetăm vectorul de vizitare `vis` cu `false`." },
  { line: 29, pairR: [0, -1, -1], vis: [false, false, false], matchingSize: 1, u: 1, v: null, text: "Apelăm `dfs(1)` pentru a încerca cuplarea nodului stâng `1`." },
  { line: 12, pairR: [0, -1, -1], vis: [false, false, false], matchingSize: 1, u: 1, v: null, text: "Intrăm în `dfs(1)`. Vecinii lui `1` din stânga sunt `1` și `2` din dreapta." },
  { line: 13, pairR: [0, -1, -1], vis: [false, false, false], matchingSize: 1, u: 1, v: 1, text: "Analizăm primul vecin al lui `1` din stânga: `v = 1` (dreapta)." },
  { line: 14, pairR: [0, -1, -1], vis: [false, false, false], matchingSize: 1, u: 1, v: 1, text: "Nodul `v = 1` nu a fost încă vizitat în acest DFS." },
  { line: 15, pairR: [0, -1, -1], vis: [false, true, false], matchingSize: 1, u: 1, v: 1, text: "Marcăm nodul din dreapta `1` ca vizitat: `vis[1] = true`." },
  { line: 16, pairR: [0, -1, -1], vis: [false, true, false], matchingSize: 1, u: 1, v: 1, text: "Deoarece `pairR[1] == -1` (este liber), condiția este adevărată." },
  { line: 17, pairR: [0, 1, -1], vis: [false, true, false], matchingSize: 1, u: 1, v: 1, text: "Cuplăm nodul `1` din dreapta cu nodul `1` din stânga: `pairR[1] = 1`." },
  { line: 18, pairR: [0, 1, -1], vis: [false, true, false], matchingSize: 1, u: 1, v: 1, text: "Funcția `dfs(1)` se termină cu succes și returnează `true`." },
  { line: 30, pairR: [0, 1, -1], vis: [false, true, false], matchingSize: 2, u: 1, v: null, text: "Deoarece `dfs(1)` a returnat `true`, incrementăm `matchingSize` la `2`." },
  { line: 27, pairR: [0, 1, -1], vis: [false, true, false], matchingSize: 2, u: 2, v: null, text: "Trecem la următorul nod din stânga: `u = 2`." },
  { line: 28, pairR: [0, 1, -1], vis: [false, false, false], matchingSize: 2, u: 2, v: null, text: "Resetăm vectorul de vizitare `vis` cu `false`." },
  { line: 29, pairR: [0, 1, -1], vis: [false, false, false], matchingSize: 2, u: 2, v: null, text: "Apelăm `dfs(2)` pentru a încerca cuplarea nodului stâng `2`." },
  { line: 12, pairR: [0, 1, -1], vis: [false, false, false], matchingSize: 2, u: 2, v: null, text: "Intrăm în `dfs(2)`. Vecinul lui `2` din stânga este `0` din dreapta." },
  { line: 13, pairR: [0, 1, -1], vis: [false, false, false], matchingSize: 2, u: 2, v: 0, text: "Analizăm vecinul `v = 0`." },
  { line: 14, pairR: [0, 1, -1], vis: [false, false, false], matchingSize: 2, u: 2, v: 0, text: "Nodul `v = 0` nu a fost încă vizitat în acest DFS." },
  { line: 15, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 2, v: 0, text: "Marcăm nodul din dreapta `0` ca vizitat: `vis[0] = true`." },
  { line: 16, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 2, v: 0, text: "Deoarece `pairR[0] == 0` (nu este liber), încercăm să re-cuplăm partenerul său `L0` apelând recursiv `dfs(0)`." },
  { line: 12, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 0, v: null, text: "Intrăm în apelul recursiv `dfs(0)`. Vecinii lui `0` din stânga sunt `0` și `1` din dreapta." },
  { line: 13, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 0, v: 0, text: "Verificăm primul vecin al lui `0` din stânga: `v = 0`." },
  { line: 14, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 0, v: 0, text: "Deoarece `vis[0] == true`, sărim peste `v = 0` (pentru a evita ciclurile infinite)." },
  { line: 13, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 0, v: 1, text: "Trecem la următorul vecin al lui `0` din stânga: `v = 1`." },
  { line: 14, pairR: [0, 1, -1], vis: [true, false, false], matchingSize: 2, u: 0, v: 1, text: "Nodul `v = 1` nu a fost încă vizitat." },
  { line: 15, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 0, v: 1, text: "Marcăm nodul din dreapta `1` ca vizitat: `vis[1] = true`." },
  { line: 16, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 0, v: 1, text: "Deoarece `pairR[1] == 1` (ocupat de `L1`), apelăm recursiv `dfs(1)` pentru a-l re-cupla pe `L1`." },
  { line: 12, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 1, v: null, text: "Intrăm în apelul recursiv `dfs(1)`. Vecinii lui `1` din stânga sunt `1` și `2` din dreapta." },
  { line: 13, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 1, v: 1, text: "Verificăm primul vecin al lui `1` din stânga: `v = 1`." },
  { line: 14, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 1, v: 1, text: "Deoarece `vis[1] == true`, îl sărim." },
  { line: 13, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 1, v: 2, text: "Trecem la următorul vecin al lui `1` din stânga: `v = 2`." },
  { line: 14, pairR: [0, 1, -1], vis: [true, true, false], matchingSize: 2, u: 1, v: 2, text: "Nodul `v = 2` nu a fost încă vizitat." },
  { line: 15, pairR: [0, 1, -1], vis: [true, true, true], matchingSize: 2, u: 1, v: 2, text: "Marcăm nodul din dreapta `2` ca vizitat: `vis[2] = true`." },
  { line: 16, pairR: [0, 1, -1], vis: [true, true, true], matchingSize: 2, u: 1, v: 2, text: "Deoarece `pairR[2] == -1` (este liber), condiția `pairR[2] < 0` este adevărată." },
  { line: 17, pairR: [0, 1, 1], vis: [true, true, true], matchingSize: 2, u: 1, v: 2, text: "Cuplăm nodul `2` din dreapta cu nodul `1` din stânga: `pairR[2] = 1`." },
  { line: 18, pairR: [0, 1, 1], vis: [true, true, true], matchingSize: 2, u: 1, v: 2, text: "Apelul `dfs(1)` returnează `true` (succes)." },
  { line: 17, pairR: [0, 0, 1], vis: [true, true, true], matchingSize: 2, u: 0, v: 1, text: "Reveniți în `dfs(0)`, deoarece `dfs(1)` a fost un succes, cuplăm nodul `1` din dreapta cu `L0`: `pairR[1] = 0`." },
  { line: 18, pairR: [0, 0, 1], vis: [true, true, true], matchingSize: 2, u: 0, v: 1, text: "Apelul `dfs(0)` returnează `true` (succes)." },
  { line: 17, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 2, u: 2, v: 0, text: "Reveniți în `dfs(2)`, deoarece `dfs(0)` a fost un succes, cuplăm nodul `0` din dreapta cu `L2`: `pairR[0] = 2`." },
  { line: 18, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 2, u: 2, v: 0, text: "Apelul `dfs(2)` returnează `true` (succes)." },
  { line: 30, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 3, u: 2, v: null, text: "Deoarece `dfs(2)` a returnat `true`, incrementăm `matchingSize` la `3`." },
  { line: 27, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 3, u: null, v: null, text: "Bucla de iterare s-a terminat deoarece am procesat toate cele `n = 3` noduri din stânga." },
  { line: 33, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 3, u: null, v: null, text: "Funcția `maxBipartiteMatching` se termină și returnează valoarea `3`." },
  { line: 41, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 3, u: null, v: null, text: "Reveniți în `main()`. Primim dimensiunea cuplajului maxim, adică `result = 3`." },
  { line: 42, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 3, u: null, v: null, text: "Se tipărește rezultatul în consolă: `Cuplaj maxim: 3`." },
  { line: 43, pairR: [2, 0, 1], vis: [true, true, true], matchingSize: 3, u: null, v: null, text: "Programul se încheie cu succes prin returnarea codului `0`." }
];

export const data = {
  "presentation": "### Cuplaj Maxim în Graf Bipartit (Algoritmul lui Kuhn)\n\nUn **cuplaj** (sau matching) într-un graf este o mulțime de muchii independente, adică muchii care nu împart niciun nod comun. Un **cuplaj maxim** este un cuplaj cu numărul maxim posibil de muchii.\n\nPentru grafurile bipartite, algoritmul lui Kuhn determină cuplajul maxim în timp $\\mathcal{O}(V \\cdot E)$. Algoritmul se bazează pe conceptul de **drum alternant** și **drum de augmentare**:\n- **Drum alternant**: Un drum ale cărui muchii alternează între muchii din cuplaj și muchii din afara cuplajului.\n- **Drum de augmentare**: Un drum alternant care începe și se termină în noduri libere (necuplate). \n\nConform **Teoremei lui Berge**, un cuplaj este maxim dacă și numai dacă nu mai există niciun drum de augmentare. Algoritmul lui Kuhn caută, pentru fiecare nod din stânga, un drum de augmentare folosind o parcurgere DFS. Dacă găsește un astfel de drum, cuplajul este mărit (augmentat) prin inversarea stării muchiilor de pe drum (muchiile necuplate devin cuplate, iar cele cuplate devin libere).",
  "complexity": "### Complexitate\n\n- **Timp**: $\\mathcal{O}(V \\cdot E)$, unde $V$ este numărul de noduri din stânga, iar $E$ este numărul de muchii. În cel mai rău caz, pentru fiecare din cele $|V_L|$ noduri din stânga, facem o căutare DFS ce parcurge graful.\n- **Spațiu**: $\\mathcal{O}(V + E)$ pentru stocarea grafului, vectorului `pairR` (perechile nodurilor din dreapta) și a vectorului `vis` de vizitare.",
  "variations": "### Variații și Algoritmul Hopcroft-Karp\n\nPentru grafuri bipartite foarte mari, algoritmul **Hopcroft-Karp** oferă o complexitate superioară de:\n$$\\mathcal{O}(E \\sqrt{V})$$\nacesta găsind mai multe drumuri de augmentare scurte în mod simultan la fiecare fază (folosind BFS urmat de DFS).",
  "applications": "### Aplicații Practice\n\n- **Potrivirea job-urilor**: Alocarea automată a sarcinilor către angajații sau mașinile care au abilitățile necesare.\n- **Problema căsătoriilor stabile**: Cuplarea optimă în funcție de preferințe.\n- **Acoperirea minimă cu noduri**: În grafurile bipartite, conform Teoremei lui König, dimensiunea cuplajului maxim este egală cu dimensiunea acoperirii minime cu noduri (numărul minim de noduri care ating toate muchiile).",
  "code": `#include <iostream>
#include <vector>

using namespace std;

int n = 3;
int m = 3;
vector<vector<int>> adj;
vector<int> pairR;
vector<bool> vis;

bool dfs(int u) {
    for (int v : adj[u]) {
        if (vis[v]) continue;
        vis[v] = true;
        if (pairR[v] < 0 || dfs(pairR[v])) {
            pairR[v] = u;
            return true;
        }
    }
    return false;
}

int maxBipartiteMatching() {
    pairR.assign(m, -1);
    int matchingSize = 0;
    for (int u = 0; u < n; ++u) {
        vis.assign(m, false);
        if (dfs(u)) {
            matchingSize++;
        }
    }
    return matchingSize;
}

int main() {
    adj.resize(n);
    adj[0] = {0, 1};
    adj[1] = {1, 2};
    adj[2] = {0};
    int result = maxBipartiteMatching();
    cout << "Cuplaj maxim: " << result << "\\n";
    return 0;
}
`,
  "explanations": steps.map((s, idx) => ({
    "line": s.line,
    "text": s.text,
    "blocksVisual": [
      {
        "label": "pairR (Cuplaj Dreapta -> Stânga)",
        "groups": [[
          { "val": "R0: " + (s.pairR[0] === -1 ? "liber" : "L" + s.pairR[0]), "active": s.pairR[0] !== -1 },
          { "val": "R1: " + (s.pairR[1] === -1 ? "liber" : "L" + s.pairR[1]), "active": s.pairR[1] !== -1 },
          { "val": "R2: " + (s.pairR[2] === -1 ? "liber" : "L" + s.pairR[2]), "active": s.pairR[2] !== -1 }
        ]]
      },
      {
        "label": "vis (Vizitat în DFS)",
        "groups": [[
          { "val": "R0: " + (s.vis[0] ? "DA" : "NU"), "sorted": s.vis[0] },
          { "val": "R1: " + (s.vis[1] ? "DA" : "NU"), "sorted": s.vis[1] },
          { "val": "R2: " + (s.vis[2] ? "DA" : "NU"), "sorted": s.vis[2] }
        ]]
      },
      {
        "label": "Dimensiune Cuplaj",
        "groups": [[
          { "val": "matchingSize: " + s.matchingSize, "active": true }
        ]]
      }
    ]
  })),
  "problems": {
    "easy": [
      {
        "title": "Cuplaj Maxim",
        "url": "https://www.pbinfo.ro/probleme/2633/cuplaj-maxim",
        "desc": "Determinarea cuplajului maxim într-un graf bipartit."
      }
    ],
    "medium": [
      {
        "title": "Gigel și Temele",
        "url": "https://www.pbinfo.ro/probleme/4317/gigel-si-temele",
        "desc": "O problemă ce necesită reducerea la cuplaj maxim."
      }
    ],
    "hard": [
      {
        "title": "L-Matching",
        "url": "https://www.pbinfo.ro/probleme/3233/l-matching",
        "desc": "O problemă avansată de cuplaj pe o rețea de flux sau cuplaj maxim în condiții speciale."
      }
    ]
  },
  "globalVars": [],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const curr = steps[stepIndex] || steps[steps.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = "";

      vars.push({ name: "n", type: "int", val: "3", expandable: false });
      vars.push({ name: "m", type: "int", val: "3", expandable: false });
      
      const pairRStr = "[" + curr.pairR.map(v => (v === -1 ? "-1" : v)).join(", ") + "]";
      vars.push({ name: "pairR", type: "std::vector<int>", val: pairRStr, expandable: true });
      
      const visStr = "[" + curr.vis.map(v => (v ? "true" : "false")).join(", ") + "]";
      vars.push({ name: "vis", type: "std::vector<bool>", val: visStr, expandable: true });
      vars.push({ name: "matchingSize", type: "int", val: curr.matchingSize.toString(), expandable: false });

      if (curr.u !== null) {
        vars.push({ name: "u", type: "int", val: curr.u.toString(), expandable: false });
      }
      if (curr.v !== null) {
        vars.push({ name: "v", type: "int", val: curr.v.toString(), expandable: false });
      }

      const matchingFrame = (l) => ({ name: "maxBipartiteMatching()", file: "solution.cpp", line: l });
      const dfsFrame = (u, l) => ({ name: `dfs(u = ${u})`, file: "solution.cpp", line: l });

      if (stepIndex === 0) {
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex === 56) {
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex === 57) {
        frames.push({ name: "main()", file: "main.cpp", line: 42 });
      } else if (stepIndex === 58) {
        frames.push({ name: "main()", file: "main.cpp", line: 43 });
      } else if (stepIndex >= 1 && stepIndex <= 5) {
        frames.push(matchingFrame(activeLine));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 11 && stepIndex <= 16) {
        frames.push(matchingFrame(activeLine));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 24 && stepIndex <= 27) {
        frames.push(matchingFrame(activeLine));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 53 && stepIndex <= 55) {
        frames.push(matchingFrame(activeLine));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 6 && stepIndex <= 10) {
        frames.push(dfsFrame(0, activeLine));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 17 && stepIndex <= 23) {
        frames.push(dfsFrame(1, activeLine));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 28 && stepIndex <= 32) {
        frames.push(dfsFrame(2, activeLine));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 33 && stepIndex <= 39) {
        frames.push(dfsFrame(0, activeLine));
        frames.push(dfsFrame(2, 16));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 40 && stepIndex <= 48) {
        frames.push(dfsFrame(1, activeLine));
        frames.push(dfsFrame(0, 16));
        frames.push(dfsFrame(2, 16));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 49 && stepIndex <= 50) {
        frames.push(dfsFrame(0, activeLine));
        frames.push(dfsFrame(2, 16));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else if (stepIndex >= 51 && stepIndex <= 52) {
        frames.push(dfsFrame(2, activeLine));
        frames.push(matchingFrame(29));
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      } else {
        frames.push({ name: "main()", file: "main.cpp", line: 41 });
      }

      inlineVal = "matchingSize: " + curr.matchingSize;
      if (curr.u !== null) inlineVal += ", u: " + curr.u;
      if (curr.v !== null) inlineVal += ", v: " + curr.v;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const curr = steps[stepIndex];
      if (!curr) return null;
      if (lineNum === curr.line) {
        let res = "matchingSize: " + curr.matchingSize;
        if (curr.u !== null) res += ", u: " + curr.u;
        if (curr.v !== null) res += ", v: " + curr.v;
        return res;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const curr = steps[stepIndex] || steps[steps.length - 1];
      const pairR = curr.pairR;
      const vis = curr.vis;
      const nodes = [];

      const getMatchForL = (u) => {
        return pairR.indexOf(u);
      };

      const getLState = (u) => {
        if (curr.u === u) return "active";
        const isUInStack = (() => {
          if (u === 0 && ((stepIndex >= 6 && stepIndex <= 10) || (stepIndex >= 27 && stepIndex <= 31) || (stepIndex >= 33 && stepIndex <= 39) || (stepIndex >= 49 && stepIndex <= 50))) return true;
          if (u === 1 && ((stepIndex >= 17 && stepIndex <= 23) || (stepIndex >= 32 && stepIndex <= 38) || (stepIndex >= 40 && stepIndex <= 48))) return true;
          if (u === 2 && ((stepIndex >= 24 && stepIndex <= 26) || (stepIndex >= 28 && stepIndex <= 32) || (stepIndex >= 51 && stepIndex <= 52))) return true;
          return false;
        })();
        if (isUInStack) return "visited";
        return undefined;
      };

      const getRState = (v) => {
        if (curr.v === v) return "active";
        if (vis[v]) return "visited";
        return undefined;
      };

      for (let i = 0; i < 3; i++) {
        const matchV = getMatchForL(i);
        const label = matchV !== -1 ? `L${i} (cuplat R${matchV})` : `L${i} (liber)`;
        nodes.push({
          id: `L${i}`,
          x: 50,
          y: 50 + i * 100,
          label: label,
          state: getLState(i)
        });
      }

      for (let j = 0; j < 3; j++) {
        const matchU = pairR[j];
        const label = matchU !== -1 ? `R${j} (cuplat L${matchU})` : `R${j} (liber)`;
        nodes.push({
          id: `R${j}`,
          x: 250,
          y: 50 + j * 100,
          label: label,
          state: getRState(j)
        });
      }

      const baseEdges = [
        { source: "L0", target: "R0" },
        { source: "L0", target: "R1" },
        { source: "L1", target: "R1" },
        { source: "L1", target: "R2" },
        { source: "L2", target: "R0" }
      ];

      const edges = baseEdges.map(edge => {
        const u = parseInt(edge.source.slice(1));
        const v = parseInt(edge.target.slice(1));

        const isMatched = pairR[v] === u;
        const isTraversed = curr.u === u && curr.v === v;

        let active = false;
        let weight = null;

        if (isTraversed) {
          active = true;
          weight = isMatched ? "recuplare" : "exploră";
        } else if (isMatched) {
          active = true;
          weight = "cuplat";
        }

        return {
          ...edge,
          active,
          weight
        };
      });

      const enrichedNodes = nodes.map(n => ({
        ...n,
        val: n.id,
        labelPosition: n.id.startsWith("L") ? "left" : "right"
      }));

      return {
        directed: false,
        title: "Cuplaj Maxim (Kuhn)",
        nodes: enrichedNodes,
        edges
      };
    }
  }
};
