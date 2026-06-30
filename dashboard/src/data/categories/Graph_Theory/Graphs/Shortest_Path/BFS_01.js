const steps = [
  {
    line: 54,
    text: "Apelăm funcția bfs01 din main, începând din nodul sursă 0.",
    u: -1, v: -1, w: -1,
    dist: [1e9, 1e9, 1e9, 1e9, 1e9],
    dq: []
  },
  {
    line: 15,
    text: "Inițializăm vectorul de distanțe dist cu valoarea infinit (INF = 10^9).",
    u: -1, v: -1, w: -1,
    dist: [1e9, 1e9, 1e9, 1e9, 1e9],
    dq: []
  },
  {
    line: 16,
    text: "Inițializăm coada cu două capete (std::deque) dq.",
    u: -1, v: -1, w: -1,
    dist: [1e9, 1e9, 1e9, 1e9, 1e9],
    dq: []
  },
  {
    line: 18,
    text: "Setăm distanța către sursa 0 ca fiind 0: dist[0] = 0.",
    u: -1, v: -1, w: -1,
    dist: [0, 1e9, 1e9, 1e9, 1e9],
    dq: []
  },
  {
    line: 19,
    text: "Adăugăm nodul de start 0 în deque.",
    u: -1, v: -1, w: -1,
    dist: [0, 1e9, 1e9, 1e9, 1e9],
    dq: [0]
  },
  {
    line: 21,
    text: "Verificăm dacă deque-ul nu este gol. Acesta conține [0].",
    u: -1, v: -1, w: -1,
    dist: [0, 1e9, 1e9, 1e9, 1e9],
    dq: [0]
  },
  {
    line: 22,
    text: "Extragem elementul din fața deque-ului: u = 0.",
    u: 0, v: -1, w: -1,
    dist: [0, 1e9, 1e9, 1e9, 1e9],
    dq: [0]
  },
  {
    line: 23,
    text: "Eliminăm nodul 0 din deque. Deque-ul devine gol.",
    u: 0, v: -1, w: -1,
    dist: [0, 1e9, 1e9, 1e9, 1e9],
    dq: []
  },
  {
    line: 29,
    text: "Pentru nodul 0, analizăm vecinul 1 cu costul 1. Deoarece dist[0] + 1 = 1 < dist[1] (INF), actualizăm dist[1] = 1.",
    u: 0, v: 1, w: 1,
    dist: [0, 1, 1e9, 1e9, 1e9],
    dq: []
  },
  {
    line: 34,
    text: "Deoarece costul muchiei este 1, adăugăm nodul 1 la SFÂRȘITUL (back) deque-ului.",
    u: 0, v: 1, w: 1,
    dist: [0, 1, 1e9, 1e9, 1e9],
    dq: [1]
  },
  {
    line: 29,
    text: "Analizăm vecinul 2 cu costul 1. Deoarece dist[0] + 1 = 1 < dist[2] (INF), actualizăm dist[2] = 1.",
    u: 0, v: 2, w: 1,
    dist: [0, 1, 1, 1e9, 1e9],
    dq: [1]
  },
  {
    line: 34,
    text: "Deoarece costul muchiei este 1, adăugăm nodul 2 la SFÂRȘITUL (back) deque-ului.",
    u: 0, v: 2, w: 1,
    dist: [0, 1, 1, 1e9, 1e9],
    dq: [1, 2]
  },
  {
    line: 21,
    text: "Revenim la buclă. Deque-ul nu este gol, conține [1, 2].",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1e9, 1e9],
    dq: [1, 2]
  },
  {
    line: 22,
    text: "Extragem elementul din fața deque-ului: u = 1.",
    u: 1, v: -1, w: -1,
    dist: [0, 1, 1, 1e9, 1e9],
    dq: [1, 2]
  },
  {
    line: 23,
    text: "Eliminăm nodul 1 din deque. Deque-ul rămâne cu [2].",
    u: 1, v: -1, w: -1,
    dist: [0, 1, 1, 1e9, 1e9],
    dq: [2]
  },
  {
    line: 29,
    text: "Pentru nodul 1, vecinul 3 are costul 0. Deoarece dist[1] + 0 = 1 < dist[3] (INF), actualizăm dist[3] = 1.",
    u: 1, v: 3, w: 0,
    dist: [0, 1, 1, 1, 1e9],
    dq: [2]
  },
  {
    line: 32,
    text: "Deoarece costul muchiei este 0, adăugăm nodul 3 la ÎNCEPUTUL (front) deque-ului.",
    u: 1, v: 3, w: 0,
    dist: [0, 1, 1, 1, 1e9],
    dq: [3, 2]
  },
  {
    line: 29,
    text: "Analizăm vecinul 4 al nodului 1 cu costul 1. Deoarece dist[1] + 1 = 2 < dist[4] (INF), actualizăm dist[4] = 2.",
    u: 1, v: 4, w: 1,
    dist: [0, 1, 1, 1, 2],
    dq: [3, 2]
  },
  {
    line: 34,
    text: "Deoarece costul muchiei este 1, adăugăm nodul 4 la SFÂRȘITUL (back) deque-ului.",
    u: 1, v: 4, w: 1,
    dist: [0, 1, 1, 1, 2],
    dq: [3, 2, 4]
  },
  {
    line: 21,
    text: "Revenim la buclă. Deque-ul conține [3, 2, 4].",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1, 2],
    dq: [3, 2, 4]
  },
  {
    line: 22,
    text: "Extragem elementul din fața deque-ului: u = 3.",
    u: 3, v: -1, w: -1,
    dist: [0, 1, 1, 1, 2],
    dq: [3, 2, 4]
  },
  {
    line: 23,
    text: "Eliminăm nodul 3 din deque. Deque-ul devine [2, 4].",
    u: 3, v: -1, w: -1,
    dist: [0, 1, 1, 1, 2],
    dq: [2, 4]
  },
  {
    line: 29,
    text: "Pentru nodul 3, analizăm vecinul 4 cu costul 0. dist[3] + 0 = 1, care este mai mic decât dist[4] (2). Actualizăm dist[4] = 1.",
    u: 3, v: 4, w: 0,
    dist: [0, 1, 1, 1, 1],
    dq: [2, 4]
  },
  {
    line: 32,
    text: "Deoarece costul muchiei este 0, adăugăm nodul 4 la ÎNCEPUTUL (front) deque-ului.",
    u: 3, v: 4, w: 0,
    dist: [0, 1, 1, 1, 1],
    dq: [4, 2, 4]
  },
  {
    line: 21,
    text: "Revenim la buclă. Deque-ul conține [4, 2, 4].",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [4, 2, 4]
  },
  {
    line: 22,
    text: "Extragem elementul din fața deque-ului: u = 4.",
    u: 4, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [4, 2, 4]
  },
  {
    line: 23,
    text: "Eliminăm nodul 4 din deque. Deque-ul devine [2, 4].",
    u: 4, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [2, 4]
  },
  {
    line: 25,
    text: "Pentru u = 4, vecinii sunt deja optimizați. Nu se face nicio actualizare.",
    u: 4, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [2, 4]
  },
  {
    line: 21,
    text: "Revenim la buclă. Deque-ul conține [2, 4].",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [2, 4]
  },
  {
    line: 22,
    text: "Extragem elementul din fața deque-ului: u = 2.",
    u: 2, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [2, 4]
  },
  {
    line: 23,
    text: "Eliminăm nodul 2 din deque. Deque-ul devine [4].",
    u: 2, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [4]
  },
  {
    line: 21,
    text: "Revenim la buclă. Deque-ul conține [4].",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [4]
  },
  {
    line: 22,
    text: "Extragem elementul din fața deque-ului: u = 4.",
    u: 4, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: [4]
  },
  {
    line: 23,
    text: "Eliminăm nodul 4 din deque. Deque-ul devine gol.",
    u: 4, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: []
  },
  {
    line: 21,
    text: "Verificăm condiția buclei. Deque-ul este gol. Ieșim din buclă.",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: []
  },
  {
    line: 40,
    text: "Afișăm drumurile minime calculate de la sursa 0 la toate celelalte noduri.",
    u: -1, v: -1, w: -1,
    dist: [0, 1, 1, 1, 1],
    dq: []
  }
];

export const data = {
  "presentation": "### 0-1 BFS (Parcurgerea în Lățime pe Grafuri cu Costuri 0 și 1)\n\nAlgoritmul **0-1 BFS** determină drumurile minime într-un graf ponderat unde costurile muchiilor pot fi doar $0$ sau $1$. În timp ce algoritmul lui Dijkstra rezolvă această problemă în $O(E \\log V)$ folosind o coadă de priorități, 0-1 BFS realizează același lucru în timp liniar $O(V + E)$ folosind o **coadă cu două capete (Double-Ended Queue / Deque)**.\n\nPrincipiul este simplu:\n- Dacă parcurgem o muchie de cost $0$, noul nod se adaugă la **începutul (front)** deque-ului.\n- Dacă parcurgem o muchie de cost $1$, noul nod se adaugă la **sfârșitul (back)** deque-ului.\n\nAceastă strategie menține deque-ul sortat în permanență după distanță (conținând cel mult două valori distincte de distanță în orice moment), asigurând proprietatea de parcurgere optimală fără a fi nevoie de operații logaritmice.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(V + E)$ – fiecare nod este extras din deque de cel mult 2 ori.\n- **Spațiu:** $\\mathcal{O}(V)$ – pentru vectorul \`dist\` și deque-ul care poate conține cel mult $V$ elemente.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Dial's Algorithm**: O generalizare pentru grafuri unde costurile muchiilor sunt întregi mici în intervalul $[0, K]$. Folosește $K+1$ cozi.\n- **BFS Clasic**: Cazul particular în care toate costurile sunt $1$. Se folosește o simplă coadă de tip FIFO.",
  "applications": "### Aplicații Reale\n\n- **Găsirea drumului minim cu număr minim de penalizări/schimbări**: De exemplu, în rețele de transport unde schimbarea liniei costă $1$, iar continuarea pe aceeași linie costă $0$.\n- **Labirinturi cu pereți distructibili**: Trecerea printr-un spațiu liber costă $0$, iar distrugerea unui perete costă $1$.\n- **Găsirea drumului minim cu rotații minime în grid-uri**: Deplasarea înainte costă $0$, iar schimbarea direcției (virajul) costă $1$.",
  "code": `#include <iostream>
#include <vector>
#include <deque>

using namespace std;

const int INF = 1e9;

struct Edge {
    int to;
    int weight;
};

void bfs01(int start, vector<vector<Edge>>& adj, int V) {
    vector<int> dist(V, INF);
    deque<int> dq;
    
    dist[start] = 0;
    dq.push_back(start);
    
    while (!dq.empty()) {
        int u = dq.front();
        dq.pop_front();
        
        for (auto edge : adj[u]) {
            int v = edge.to;
            int w = edge.weight;
            
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) {
                    dq.push_front(v);
                } else {
                    dq.push_back(v);
                }
            }
        }
    }
    
    for (int i = 0; i < V; ++i) {
        cout << "Nod " << i << ": " << dist[i] << "\\n";
    }
}

int main() {
    int V = 5;
    vector<vector<Edge>> adj(V);
    adj[0].push_back({1, 1}); adj[0].push_back({2, 1});
    adj[1].push_back({0, 1}); adj[1].push_back({3, 0}); adj[1].push_back({4, 1});
    adj[2].push_back({0, 1}); adj[2].push_back({3, 0});
    adj[3].push_back({1, 0}); adj[3].push_back({2, 0}); adj[3].push_back({4, 0});
    adj[4].push_back({1, 1}); adj[4].push_back({3, 0});
    
    bfs01(0, adj, V);
    return 0;
}
`,
  "explanations": steps.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: [
      {
        label: "Deque Noduri",
        groups: [
          step.dq.map((val, idx) => ({
            val: val.toString(),
            active: idx === 0
          }))
        ]
      }
    ]
  })),
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const step = steps[stepIndex] || steps[steps.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      globalVars.push({ name: "INF", type: "const int", val: "1000000000", expandable: false });
      globalVars.push({ name: "dist", type: "std::vector<int>", val: "{" + step.dist.map(d => d === 1e9 ? "INF" : d).join(", ") + "}", expandable: false });

      vars.push({ name: "dq", type: "std::deque<int>", val: step.dq.length > 0 ? "{" + step.dq.join(", ") + "}" : "empty", expandable: false });

      if (step.u !== -1) {
        vars.push({ name: "u", type: "int", val: step.u, expandable: false });
      }
      if (step.v !== -1) {
        vars.push({ name: "v", type: "int", val: step.v, expandable: false });
        vars.push({ name: "w", type: "int", val: step.w, expandable: false });
      }

      frames.push({ name: "main()", file: "main.cpp", line: 54 });
      if (stepIndex >= 1) {
        frames.unshift({ name: "bfs01(start = 0, adj, V = 5)", file: "solution.cpp", line: activeLine });
      }

      let inlineVal = null;
      if (step.u !== -1) {
        inlineVal = "u: " + step.u + ", dist[u]: " + step.dist[step.u];
        if (step.v !== -1) {
          inlineVal += ", v: " + step.v + ", w: " + step.w;
        }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const step = steps[stepIndex];
      if (!step) return null;

      if (lineNum === 14 || lineNum === 15) {
        return "start: 0, V: 5";
      }
      if (lineNum === 21) {
        return "dq.size(): " + step.dq.length;
      }
      if ((lineNum === 22 || lineNum === 23) && step.u !== -1) {
        return "u: " + step.u + ", dist[u]: " + step.dist[step.u];
      }
      if ((lineNum === 25 || lineNum === 26 || lineNum === 27) && step.v !== -1) {
        return "v: " + step.v + ", w: " + step.w;
      }
      if (lineNum === 29) {
        return step.v !== -1 ? "dist[u] + w: " + (step.dist[step.u] + step.w) + " < dist[v]: " + (step.dist[step.v] === 1e9 ? "INF" : step.dist[step.v]) : null;
      }
      if (lineNum === 30) {
        return step.v !== -1 ? "dist[v] = " + (step.dist[step.u] + step.w) : null;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const step = steps[stepIndex] || steps[steps.length - 1];

      const staticNodes = [
        { id: "0", x: 50, y: 120, label: "0" },
        { id: "1", x: 180, y: 50, label: "1" },
        { id: "2", x: 180, y: 190, label: "2" },
        { id: "3", x: 300, y: 120, label: "3" },
        { id: "4", x: 420, y: 120, label: "4" }
      ];

      const staticEdges = [
        { source: "0", target: "1", weight: 1 },
        { source: "0", target: "2", weight: 1 },
        { source: "1", target: "3", weight: 0 },
        { source: "2", target: "3", weight: 0 },
        { source: "3", target: "4", weight: 0 },
        { source: "1", target: "4", weight: 1 }
      ];

      return {
        directed: false,
        title: "Parcurgere 0-1 BFS",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === step.u) {
            state = "active";
          } else if (step.dist[idNum] !== 1e9) {
            state = "visited";
          }

          const dVal = step.dist[idNum];
          const desc = dVal === 1e9 ? "dist: \u221e" : "dist: " + dVal;

          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const isCurrentActive = step.u !== -1 && step.v !== -1 && 
            ((step.u === u && step.v === v) || (step.u === v && step.v === u));

          return {
            ...e,
            active: isCurrentActive
          };
        })
      };
    }
  }
};
