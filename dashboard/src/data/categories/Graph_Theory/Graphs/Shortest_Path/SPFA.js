export const data = {
  "presentation": "### Algoritmul SPFA (Shortest Path Faster Algorithm)\n\nSPFA (Shortest Path Faster Algorithm) este o optimizare a algoritmului clasic Bellman-Ford utilizată pentru a găsi cele mai scurte drumuri de la un nod sursă într-un graf orientat și ponderat. Spre deosebire de algoritmul lui Dijkstra, SPFA funcționează corect și pe grafuri care conțin muchii cu costuri negative, atâta timp cât nu există cicluri de cost negativ accesibile din sursă.\n\n### Principiu de Funcționare\n\nAlgoritmul utilizează o coadă ($q$) pentru a ține evidența nodurilor „active” a căror distanță s-a îmbunătățit și care trebuie procesate pentru a relaxa vecinii. De asemenea, un vector boolean `in_queue` indică în timp real dacă un anumit nod se află deja în coadă, prevenind introducerea duplicată a acestuia și reducând operațiile inutile.\n\nTranziția/Relaxarea:\nPentru fiecare nod $u$ extras din coadă, parcurgem toate muchiile sale adiacente $(u, v)$ de cost $w$:\n- Dacă $dist[u] + w < dist[v]$, actualizăm $dist[v] = dist[u] + w$.\n- Dacă noul cost este mai mic și $v$ nu se află în coadă (`in_queue[v] == false`), adăugăm $v$ în coadă și setăm `in_queue[v] = true`.\n\n### Detecția Ciclurilor Negative\n\nDacă un nod este adăugat în coadă de mai mult de $V$ ori (unde $V$ este numărul de noduri din graf), graful conține un ciclu de cost negativ accesibil de la sursă, iar algoritmul poate fi oprit semnalând acest lucru.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(E)$ în medie pentru grafuri aleatorii, ceea ce îl face extrem de rapid în practică. Totuși, în cel mai rău caz (worst-case), complexitatea sa este $\\mathcal{O}(V \\times E)$, similar cu Bellman-Ford clasic.\n- **Spațiu:** $\\mathcal{O}(V + E)$ pentru listele de adiacență, coadă și vectorul de distanțe.",
  "variations": "### Variații și Optimizări\n\n1. **SLF (Small Labeled First):** Când introducem nodul $v$ în coadă, dacă $dist[v]$ este mai mic decât distanța nodului din capul cozii, adăugăm $v$ la începutul cozii (folosind un `std::deque`), altfel la sfârșit.\n2. **LLL (Large Label Last):** Cât timp distanța nodului din vârful cozii este mai mare decât media distanțelor tuturor nodurilor din coadă, mutăm acest nod la sfârșitul cozii.\n3. **Edge Cases:**\n   - Cicluri negative: Algoritmul rulează la nesfârșit dacă nu este prevăzut cu un contor de vizite per nod.\n   - Componente conexe neconectate de sursă: distanța lor rămâne $INF$.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Rutare în Rețele:** Optimizarea căilor de transmisie unde conexiunile pot avea ponderi variabile sau chiar negative (datorate unor factori de compensare a costurilor).\n- **Arbitraj Financiar:** Detecția ciclurilor negative într-un graf al ratelor de schimb valutar (ce reprezintă oportunități de profit prin tranzacții circulare).\n- **Probleme de drum minim** în grafuri cu costuri arbitrare unde Dijkstra nu poate fi aplicat din cauza prezenței muchiilor negative.",
  "code": `#include <iostream>
#include <vector>
#include <queue>

using namespace std;
const int INF = 1e9;

struct Edge {
    int to;
    int weight;
};

void spfa(int start, int V, vector<vector<Edge>>& adj) {
    vector<int> dist(V, INF);
    vector<bool> in_queue(V, false);
    queue<int> q;

    dist[start] = 0;
    q.push(start);
    in_queue[start] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        in_queue[u] = false;

        for (auto& edge : adj[u]) {
            int v = edge.to;
            int w = edge.weight;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!in_queue[v]) {
                    q.push(v);
                    in_queue[v] = true;
                }
            }
        }
    }

    for (int i = 0; i < V; i++) {
        cout << "0 -> " << i << " : " << dist[i] << "\\n";
    }
}

int main() {
    int V = 5;
    vector<vector<Edge>> adj(V);
    adj[0].push_back({1, 4});
    adj[0].push_back({2, 2});
    adj[1].push_back({2, -3});
    adj[1].push_back({3, 5});
    adj[2].push_back({4, 3});
    adj[3].push_back({4, -2});

    spfa(0, V, adj);
    return 0;
}
`,
  "explanations": [
    {
      "line": 45,
      "text": "Pornim programul. Funcția main începe execuția.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 46,
      "text": "Definim numărul de noduri V = 5 și inițializăm listele de adiacență ale grafului.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 55,
      "text": "Apelăm funcția spfa pornind din nodul sursă 0.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Inițializăm vectorul de distanțe dist cu valoarea infinită (INF) pentru toate cele V noduri.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 15,
      "text": "Inițializăm vectorul in_queue cu false. Acesta ne ajută să știm rapid dacă un nod se află deja în coadă.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 16,
      "text": "Declarăm coada q care va stoca nodurile ce urmează a fi procesate.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 18,
      "text": "Sursă are distanța 0: dist[0] = 0.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 19,
      "text": "Adăugăm nodul sursă 0 în coadă.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "0", "active": true}]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Marcăm in_queue[0] = true, arătând că nodul 0 este în coadă.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "0"}]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Verificăm dacă coada este goală. Coada conține nodul [0], deci intrăm în bucla while.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "0"}]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Preluăm nodul din capul cozii: u = 0.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "0", "active": true}]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Eliminăm nodul 0 din coadă. Coada devine goală.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Setăm in_queue[0] = false.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Începem parcurgerea vecinilor lui u = 0. Primul vecin este v = 1, cu muchia de cost 4.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 31,
      "text": "Relaxăm drumul spre nodul 1: dist[0] + 4 = 4 < dist[1] (INF). Actualizăm dist[1] = 4.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Nodul 1 nu este în coadă, deci îl adăugăm.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1", "active": true}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "Setăm in_queue[1] = true.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1"}]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Al doilea vecin al lui u = 0 este v = 2, cu muchia de cost 2.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1"}]]
        }
      ]
    },
    {
      "line": 31,
      "text": "Relaxăm drumul spre nodul 2: dist[0] + 2 = 2 < dist[2] (INF). Actualizăm dist[2] = 2.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Nodul 2 nu este în coadă, deci îl adăugăm.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1"}, {"val": "2", "active": true}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "Setăm in_queue[2] = true.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1"}, {"val": "2"}]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Reevaluăm bucla while. Coada nu este goală, conține [1, 2].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1"}, {"val": "2"}]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Preluăm nodul din capul cozii: u = 1.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "1", "active": true}, {"val": "2"}]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Eliminăm nodul 1 din coadă. Rămâne doar [2].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Setăm in_queue[1] = false.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Parcurgem vecinii lui u = 1. Primul vecin este v = 2, cost -3.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 31,
      "text": "Relaxăm drumul spre 2: dist[1] + (-3) = 4 - 3 = 1 < dist[2] (care este 2). Actualizăm dist[2] = 1.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 32,
      "text": "Verificăm dacă nodul 2 este în coadă. in_queue[2] este deja true, deci nu îl adăugăm din nou.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Al doilea vecin al lui u = 1 este v = 3, cost 5.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 31,
      "text": "Relaxăm drumul spre 3: dist[1] + 5 = 4 + 5 = 9 < dist[3] (INF). Actualizăm dist[3] = 9.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Nodul 3 nu este în coadă. Îl adăugăm în coadă.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}, {"val": "3", "active": true}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "Setăm in_queue[3] = true.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}, {"val": "3"}]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Reevaluăm bucla while. Coada conține [2, 3].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2"}, {"val": "3"}]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Preluăm nodul din capul cozii: u = 2.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "2", "active": true}, {"val": "3"}]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Eliminăm nodul 2 din coadă. Rămâne doar [3].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Setăm in_queue[2] = false.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Parcurgem vecinii lui u = 2. Singurul vecin este v = 4, cost 3.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}]]
        }
      ]
    },
    {
      "line": 31,
      "text": "Relaxăm drumul spre 4: dist[2] + 3 = 1 + 3 = 4 < dist[4] (INF). Actualizăm dist[4] = 4.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}]]
        }
      ]
    },
    {
      "line": 33,
      "text": "Nodul 4 nu este în coadă. Îl adăugăm.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}, {"val": "4", "active": true}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "Setăm in_queue[4] = true.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}, {"val": "4"}]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Reevaluăm bucla while. Coada conține [3, 4].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3"}, {"val": "4"}]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Preluăm nodul din capul cozii: u = 3.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "3", "active": true}, {"val": "4"}]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Eliminăm nodul 3 din coadă. Rămâne [4].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "4"}]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Setăm in_queue[3] = false.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "4"}]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Parcurgem vecinii lui u = 3. Vecinul este v = 4, cost -2.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "4"}]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Verificăm dacă dist[3] + (-2) < dist[4]. Avem 9 - 2 = 7, care NU este mai mic decât dist[4] = 4. Nu facem nicio relaxare.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "4"}]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Reevaluăm bucla while. Coada conține [4].",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "4"}]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Preluăm nodul din capul cozii: u = 4.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[{"val": "4", "active": true}]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Eliminăm nodul 4 din coadă. Coada devine goală.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Setăm in_queue[4] = false.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Nodul u = 4 nu are niciun vecin în graf. Finisăm parcurgerea vecinilor.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Verificăm coada. Este goală. Căutarea drumurilor minime s-a finalizat.",
      "blocksVisual": [
        {
          "label": "Coada (Queue)",
          "groups": [[]]
        }
      ]
    },
    {
      "line": 40,
      "text": "Afișăm drumul minim de la nodul 0 la toate nodurile.",
      "blocksVisual": [
        {
          "label": "Rezultate",
          "groups": [[{"val": "dist[0]=0"}, {"val": "dist[1]=4"}, {"val": "dist[2]=1"}, {"val": "dist[3]=9"}, {"val": "dist[4]=4"}]]
        }
      ]
    },
    {
      "line": 55,
      "text": "Funcția spfa returnează execuția înapoi în main.",
      "blocksVisual": []
    },
    {
      "line": 56,
      "text": "Programul se încheie cu succes.",
      "blocksVisual": []
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Bellman-Ford (Pbinfo #1046)",
        "url": "https://www.pbinfo.ro/probleme/1046/bellmanford",
        "desc": "Aplicație directă a algoritmului SPFA/Bellman-Ford pentru determinarea drumurilor minime de la o sursă."
      },
      {
        "title": "Network Delay Time (LeetCode 743)",
        "url": "https://leetcode.com/problems/network-delay-time/",
        "desc": "Calcularea timpului minim de propagare a unui semnal într-o rețea cu costuri pozitive."
      }
    ],
    "medium": [
      {
        "title": "Drumuri Minime (Infoarena dmin)",
        "url": "https://www.infoarena.ro/problema/dmin",
        "desc": "Găsirea numărului de drumuri minime într-un graf ponderat cu costuri pozitive."
      },
      {
        "title": "Path with Maximum Probability (LeetCode 1514)",
        "url": "https://leetcode.com/problems/path-with-maximum-probability/",
        "desc": "Determinarea drumului cu probabilitatea maximă de succes într-un graf neorientat ponderat."
      }
    ],
    "hard": [
      {
        "title": "Ciclu (Infoarena ciclu)",
        "url": "https://www.infoarena.ro/problema/ciclu",
        "desc": "Determinarea unui ciclu cu costul mediu minim folosind căutare binară și detecția ciclurilor negative cu SPFA."
      },
      {
        "title": "Cheapest Flights Within K Stops (LeetCode 787)",
        "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
        "desc": "Găsirea celui mai ieftin zbor cu cel mult K escale, reprezentând o relaxare restricționată a drumului minim."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      // Distances tracking state based on stepIndex
      const dist = [1e9, 1e9, 1e9, 1e9, 1e9];
      const inQueue = [false, false, false, false, false];
      const qState = [];
      let uVal = -1;

      if (stepIndex >= 6) { dist[0] = 0; }
      if (stepIndex >= 7 && stepIndex <= 10) { qState.push(0); inQueue[0] = true; }
      if (stepIndex >= 10 && stepIndex <= 12) { uVal = 0; }
      
      if (stepIndex >= 14) { dist[1] = 4; }
      if (stepIndex >= 15) { qState.push(1); inQueue[1] = true; }
      if (stepIndex >= 18) { dist[2] = 2; }
      if (stepIndex >= 19) { qState.push(2); inQueue[2] = true; }
      
      if (stepIndex >= 22 && stepIndex <= 23) { uVal = 1; }
      if (stepIndex === 23) { qState.shift(); inQueue[1] = false; }
      if (stepIndex >= 24) { uVal = 1; qState.filter(x => x !== 1); inQueue[1] = false; } // u = 1 pop

      if (stepIndex >= 26) { dist[2] = 1; } // Relax 1 -> 2
      if (stepIndex >= 29) { dist[3] = 9; }
      if (stepIndex >= 30) { qState.push(3); inQueue[3] = true; }

      if (stepIndex >= 33 && stepIndex <= 34) { uVal = 2; }
      if (stepIndex === 34) { qState.shift(); inQueue[2] = false; }
      if (stepIndex >= 35) { uVal = 2; qState.filter(x => x !== 2); inQueue[2] = false; } // u = 2 pop

      if (stepIndex >= 37) { dist[4] = 4; }
      if (stepIndex >= 38) { qState.push(4); inQueue[4] = true; }

      if (stepIndex >= 41 && stepIndex <= 42) { uVal = 3; }
      if (stepIndex === 42) { qState.shift(); inQueue[3] = false; }
      if (stepIndex >= 43) { uVal = 3; qState.filter(x => x !== 3); inQueue[3] = false; } // u = 3 pop

      if (stepIndex >= 47 && stepIndex <= 48) { uVal = 4; }
      if (stepIndex === 48) { qState.shift(); inQueue[4] = false; }
      if (stepIndex >= 49) { uVal = 4; qState.filter(x => x !== 4); inQueue[4] = false; } // u = 4 pop

      // Adjust queue elements specifically
      let finalQueue = [];
      if (stepIndex >= 7 && stepIndex <= 10) finalQueue = [0];
      else if (stepIndex >= 11 && stepIndex <= 12) finalQueue = [];
      else if (stepIndex >= 13 && stepIndex <= 14) finalQueue = [1];
      else if (stepIndex >= 15 && stepIndex <= 21) finalQueue = [1, 2];
      else if (stepIndex >= 22 && stepIndex <= 23) finalQueue = [1, 2];
      else if (stepIndex >= 24 && stepIndex <= 29) finalQueue = [2];
      else if (stepIndex >= 30 && stepIndex <= 32) finalQueue = [2, 3];
      else if (stepIndex >= 33 && stepIndex <= 34) finalQueue = [2, 3];
      else if (stepIndex >= 35 && stepIndex <= 37) finalQueue = [3];
      else if (stepIndex >= 38 && stepIndex <= 40) finalQueue = [3, 4];
      else if (stepIndex >= 41 && stepIndex <= 42) finalQueue = [3, 4];
      else if (stepIndex >= 43 && stepIndex <= 46) finalQueue = [4];
      else if (stepIndex >= 47 && stepIndex <= 48) finalQueue = [4];
      else finalQueue = [];

      globalVars.push({ name: "INF", type: "const int", val: "1e9", expandable: false });
      
      if (stepIndex >= 3) {
        vars.push({ name: "dist", type: "std::vector<int>", val: `{${dist.map(d => d >= 1e9 ? "INF" : d).join(", ")}}`, expandable: false });
        vars.push({ name: "in_queue", type: "std::vector<bool>", val: `{${inQueue.map(b => b ? "true" : "false").join(", ")}}`, expandable: false });
        vars.push({ name: "q", type: "std::queue<int>", val: finalQueue.length > 0 ? `[${finalQueue.join(", ")}]` : "empty", expandable: false });
      }

      if (uVal !== -1) vars.push({ name: "u", type: "int", val: uVal.toString(), expandable: false });

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 1) ? 45 + stepIndex : (stepIndex >= 54 ? 55 + (stepIndex - 54) : 55) });
      if (stepIndex >= 2 && stepIndex <= 53) {
        frames.unshift({ name: "spfa(start=0, V=5, adj)", file: "solution.cpp", line: activeLine });
      }

      if (uVal !== -1) inlineVal = `u: ${uVal}`;
      else inlineVal = "start: 0";

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let uVal = -1;
      if (stepIndex >= 10 && stepIndex <= 12) uVal = 0;
      if (stepIndex >= 22 && stepIndex <= 32) uVal = 1;
      if (stepIndex >= 33 && stepIndex <= 40) uVal = 2;
      if (stepIndex >= 41 && stepIndex <= 46) uVal = 3;
      if (stepIndex >= 47 && stepIndex <= 50) uVal = 4;

      if (lineNum === 23 && uVal !== -1) return `u = ${uVal}`;
      if (lineNum === 25 && uVal !== -1) return `in_queue[${uVal}] = false`;
      if (lineNum === 31 && uVal !== -1) {
        return `dist[v] updated if shorter path found`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const dist = [1e9, 1e9, 1e9, 1e9, 1e9];
      const inQueue = [false, false, false, false, false];
      let uVal = -1;

      if (stepIndex >= 6) { dist[0] = 0; }
      if (stepIndex >= 7 && stepIndex <= 12) { inQueue[0] = true; }
      if (stepIndex >= 10 && stepIndex <= 21) { uVal = 0; }
      
      if (stepIndex >= 14) { dist[1] = 4; }
      if (stepIndex >= 15 && stepIndex <= 24) { inQueue[1] = true; }
      if (stepIndex >= 18) { dist[2] = 2; }
      if (stepIndex >= 19 && stepIndex <= 34) { inQueue[2] = true; }
      
      if (stepIndex >= 22 && stepIndex <= 32) { uVal = 1; }
      if (stepIndex >= 26) { dist[2] = 1; }
      if (stepIndex >= 29) { dist[3] = 9; }
      if (stepIndex >= 30 && stepIndex <= 42) { inQueue[3] = true; }

      if (stepIndex >= 33 && stepIndex <= 40) { uVal = 2; }
      if (stepIndex >= 37) { dist[4] = 4; }
      if (stepIndex >= 38 && stepIndex <= 48) { inQueue[4] = true; }

      if (stepIndex >= 41 && stepIndex <= 46) { uVal = 3; }
      if (stepIndex >= 47 && stepIndex <= 50) { uVal = 4; }

      const staticNodes = [
        { id: "0", x: 50, y: 110, label: "0" },
        { id: "1", x: 150, y: 50, label: "1" },
        { id: "2", x: 150, y: 170, label: "2" },
        { id: "3", x: 250, y: 50, label: "3" },
        { id: "4", x: 350, y: 110, label: "4" }
      ];

      const staticEdges = [
        { source: "0", target: "1", weight: 4 },
        { source: "0", target: "2", weight: 2 },
        { source: "1", target: "2", weight: -3 },
        { source: "1", target: "3", weight: 5 },
        { source: "2", target: "4", weight: 3 },
        { source: "3", target: "4", weight: -2 }
      ];

      return {
        directed: true,
        title: "Starea Grafului SPFA",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (inQueue[idNum]) state = "visited"; // Highlight nodes in queue
          
          const desc = `d=${dist[idNum] >= 1e9 ? "INF" : dist[idNum]}${inQueue[idNum] ? " [Q]" : ""}`;
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const v = parseInt(e.target);
          const active = (u === uVal);
          return { ...e, active };
        })
      };
    }
  }
};
