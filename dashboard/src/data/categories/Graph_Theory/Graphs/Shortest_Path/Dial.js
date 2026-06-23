export const data = {
  "presentation": `### Prezentare Generală

Algoritmul lui Dial este o optimizare extrem de eficientă a algoritmului lui Dijkstra pentru determinarea celor mai scurte drumuri de la o sursă unică, aplicabil în grafuri unde costurile muchiilor sunt numere întregi pozitive mici.

În timp ce algoritmul lui Dijkstra standard folosește o coadă de priorități (priority queue) cu o complexitate de $O(E \\log V)$, algoritmul lui Dial folosește o structură de tip **bucket** (găleți). Dacă valoarea maximă a costului unei muchii este $W$, atunci distanța maximă posibilă a oricărui drum minim este mărginită de $V \\cdot W$. 

Putem aloca un vector de $V \\cdot W + 1$ bucket-uri (liste), unde bucket-ul $i$ conține toate nodurile care au distanța temporară egală cu $i$. Menținem un pointer curent \`idx\` care scanează secvențial bucket-urile de la $0$ la $V \\cdot W$. Deoarece distanțele minime cresc monoton, pointerul \`idx\` nu se întoarce niciodată la stânga, garantând o complexitate de timp liniară în raport cu numărul de bucket-uri.`,
  "complexity": `### Complexitate

Pentru un graf cu $V$ noduri, $E$ muchii și costul maxim al unei muchii $W$:
- **Timp:** $O(E + V \\cdot W)$ — parcurgem muchiile în $O(E)$ și scanăm bucket-urile în $O(V \\cdot W)$ operații. Dacă $W$ este mic (constant), algoritmul rulează în timp liniar $O(E + V)$.
- **Spațiu:** $O(V \\cdot W + E)$ — spațiul ocupat de vectorul de liste pentru stocarea celor $V \\cdot W + 1$ bucket-uri.`,
  "variations": `### Variații și Edge Cases

1. **Memorie optimizată (Bucket circular):** Pentru a reduce spațiul de la $V \\cdot W + 1$ la $W + 1$, putem folosi un buffer circular de dimensiune $W + 1$, deoarece diferența maximă dintre distanțele a două noduri active din coadă este cel mult $W$. Indexul în buffer se calculează prin \`dist % (W + 1)\`.
2. **Muchii cu cost $0$:** Dial funcționează fără probleme cu costuri de $0$, spre deosebire de alte optimizări, adăugând nodul în același bucket ca cel curent.
3. **Ponderi mari:** Dacă $W$ este mare (ex. $W = 10^9$), algoritmul lui Dial devine extrem de ineficient ca spațiu și timp, fiind preferat Dijkstra standard.`,
  "applications": `### Aplicații

- Determinarea drumurilor minime în rețele rutiere sau hărți grid unde costul muchiilor reprezintă distanțe mici sau timpi de tranzit uniformi.
- Rutarea pachetelor în rețele de telecomunicații cu lățimi de bandă discretizate.
- Planificarea mișcării în jocuri video pe hărți cu tipuri diferite de teren (ex: iarbă = cost 1, mlaștină = cost 3).`,
  "code": `
#include <iostream>
#include <vector>
#include <list>
#include <algorithm>

using namespace std;

const int INF = 1e9;

struct Edge {
    int to, weight;
};

vector<int> dial(int src, int n, vector<vector<Edge>>& adj, int max_weight) {
    vector<int> dist(n + 1, INF);
    dist[src] = 0;
    
    // Numarul maxim de bucket-uri este n * max_weight + 1
    int num_buckets = n * max_weight + 1;
    vector<list<int>> buckets(num_buckets);
    
    buckets[0].push_back(src);
    int idx = 0;
    
    for (int count = 0; count < n; ) {
        // Gasim primul bucket ne-vid
        while (idx < num_buckets && buckets[idx].empty()) {
            idx++;
        }
        
        if (idx == num_buckets) break;
        
        int u = buckets[idx].front();
        buckets[idx].pop_front();
        
        count++; // Am finalizat procesarea unui nod
        
        for (auto& edge : adj[u]) {
            int v = edge.to;
            int weight = edge.weight;
            
            if (dist[u] + weight < dist[v]) {
                if (dist[v] != INF) {
                    buckets[dist[v]].remove(v);
                }
                
                dist[v] = dist[u] + weight;
                buckets[dist[v]].push_back(v);
            }
        }
    }
    return dist;
}

int main() {
    int n = 4;
    vector<vector<Edge>> adj(n + 1);
    adj[1] = {{2, 2}, {3, 4}};
    adj[2] = {{3, 1}, {4, 7}};
    adj[3] = {{4, 3}};
    
    vector<int> dist = dial(1, n, adj, 7);
    cout << "Distante de la nodul 1:\n";
    for (int i = 1; i <= n; ++i) {
        cout << "Nodul " << i << ": " << dist[i] << "\n";
    }
    return 0;
}
`,
  "explanations": [
    {
      "line": 63,
      "text": "Apelăm funcția `dial` cu $N = 4$ noduri, sursa în nodul $1$, graful definit prin liste de adiacență ponderate și costul maxim al unei muchii $max\\_weight = 7$.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              { "val": "src = 1", "active": true },
              { "val": "n = 4" },
              { "val": "max_w = 7" }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Inițializăm distanțele tuturor nodurilor cu infinit (`INF = 1e9`), iar pentru sursă setăm `dist[1] = 0`.",
      "blocksVisual": [
        {
          "label": "Distanțe inițiale",
          "groups": [
            [
              { "val": "dist[1]: 0", "active": true },
              { "val": "dist[2]: INF" },
              { "val": "dist[3]: INF" },
              { "val": "dist[4]: INF" }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Calculăm numărul teoretic de bucket-uri: $num\\_buckets = 4 \\times 7 + 1 = 29$.",
      "blocksVisual": [
        {
          "label": "Găleți alocate",
          "groups": [
            [
              { "val": "29 bucket-uri", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Creăm vectorul de liste `buckets` de dimensiune $29$. Fiecare bucket corespunde unei distanțe temporare posibile.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Găleți vide",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Adăugăm nodul sursă $1$ în primul bucket `buckets[0]`, deoarece distanța sa curentă este $0$.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Nodul 1 adăugat",
          "groups": [
            [
              { "val": "B[0]: {1}", "active": true },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Inițializăm pointerul curent de scanare a bucket-urilor cu $idx = 0$.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Scanare de la idx = 0",
          "groups": [
            [
              { "val": "B[0]: {1}", "active": true },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Pornim bucla principală. Aceasta se execută pentru a finaliza pe rând cele $N$ noduri ale grafului.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6)",
          "groups": [
            [
              { "val": "B[0]: {1}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm cel mai mic index `idx` pentru care `buckets[idx]` nu este gol. Momentan `buckets[0]` conține nodul $1$, deci `idx` rămâne $0$.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - idx = 0 găsit",
          "groups": [
            [
              { "val": "B[0]: {1}", "active": true },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "Extragem primul nod din bucket-ul curent: `u = 1`.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Extragere u=1",
          "groups": [
            [
              { "val": "B[0]: {1}", "active": true },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Ștergem nodul $1$ din `buckets[0]`. Acesta devine acum un nod complet finalizat.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - B[0] golit",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Incrementăm numărul de noduri finalizate: `count` devine $1$.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6)",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Explorăm vecinii nodului $1$: vecinul $2$ (muchie de cost 2) și vecinul $3$ (muchie de cost 4).",
      "blocksVisual": [
        {
          "label": "Buckets (0..6)",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 43,
      "text": "Verificăm dacă putem relaxa distanțele vecinilor. Pentru nodul $2$, `0 + 2 = 2 < INF`, deci actualizăm distanța.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6)",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 48,
      "text": "Setăm `dist[2] = 2` și inserăm nodul $2$ în `buckets[2]`.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Nodul 2 adăugat în B[2]",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {2}", "sorted": true },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 49,
      "text": "Similar, pentru nodul $3$, `0 + 4 = 4 < INF`. Actualizăm `dist[3] = 4` și îl inserăm în `buckets[4]`.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Nodul 3 adăugat în B[4]",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {2}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {3}", "sorted": true },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "La următoarea iterație, pointerul `idx` avansează succesiv la $1$ (gol), apoi la $2$, unde găsește nodul $2$ în `buckets[2]`. Relaxăm vecinul $3$ via $2$: `dist[2] + 1 = 3 < dist[3]` ($4$). Eliminăm nodul $3$ din `buckets[4]` și îl mutăm în `buckets[3]`.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Mutare nod 3 la B[3]",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {3}", "sorted": true },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 53,
      "text": "După ce toate nodurile accesibile au fost extrase și finalizate, returnăm vectorul distanțelor minime.",
      "blocksVisual": [
        {
          "label": "Buckets (0..6) - Finalizare",
          "groups": [
            [
              { "val": "B[0]: {}" },
              { "val": "B[1]: {}" },
              { "val": "B[2]: {}" },
              { "val": "B[3]: {}" },
              { "val": "B[4]: {}" },
              { "val": "B[5]: {}" },
              { "val": "B[6]: {}" }
            ]
          ]
        }
      ]
    },
    {
      "line": 64,
      "text": "Tipărim în consolă distanțele finale calculate de la nodul sursă 1.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              { "val": "Output tipărit", "sorted": true }
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

      const dist = [1000000000, 1000000000, 1000000000, 1000000000, 1000000000];
      if (stepIndex >= 1) dist[1] = 0;
      if (stepIndex >= 13) dist[2] = 2;
      if (stepIndex >= 14) dist[3] = 4;
      if (stepIndex >= 15) { dist[3] = 3; dist[4] = 6; }
      if (stepIndex >= 16) { dist[4] = 6; }

      if (stepIndex === 0 || stepIndex === 17) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        vars.push({ name: "n", type: "int", val: "4", expandable: false });
        if (stepIndex === 17) {
          vars.push({ name: "dist", type: "std::vector<int>", val: `{INF, 0, 2, 3, 6}`, expandable: true });
        }
      } else {
        frames.push({ name: "dial(src=1, n=4, adj, max_weight=7)", file: "solution.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 86 });

        vars.push({ name: "src", type: "int", val: "1", expandable: false });
        vars.push({ name: "n", type: "int", val: "4", expandable: false });
        vars.push({ name: "max_weight", type: "int", val: "7", expandable: false });
        vars.push({ name: "dist", type: "std::vector<int>", val: `size = 5`, expandable: true });

        if (stepIndex >= 2) vars.push({ name: "num_buckets", type: "int", val: "29", expandable: false });
        if (stepIndex >= 3) vars.push({ name: "buckets", type: "vector<list<int>>", val: "size = 29", expandable: true });
        if (stepIndex >= 5) {
          let idxVal = 0;
          if (stepIndex === 15) idxVal = 2;
          if (stepIndex === 16) idxVal = 6;
          vars.push({ name: "idx", type: "int", val: idxVal.toString(), expandable: false });
        }
        if (stepIndex >= 6) {
          let countVal = 0;
          if (stepIndex >= 10 && stepIndex <= 15) countVal = 1;
          if (stepIndex === 16) countVal = 4;
          vars.push({ name: "count", type: "int", val: countVal.toString(), expandable: false });
        }
        if (stepIndex >= 8 && stepIndex <= 14) {
          vars.push({ name: "u", type: "int", val: "1", expandable: false });
        } else if (stepIndex === 15) {
          vars.push({ name: "u", type: "int", val: "2", expandable: false });
        }

        if (stepIndex >= 8 && stepIndex <= 14) {
          inlineVal = "u: 1";
        } else if (stepIndex === 15) {
          inlineVal = "u: 2";
        }
      }

      globalVars.push({ name: "INF", type: "const int", val: "1e9", expandable: false });
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 40) return "dist[1]: 0";
      if (lineNum === 43) return "num_buckets: 29";
      if (stepIndex >= 8 && stepIndex <= 14) {
        if (lineNum === 57 || lineNum === 58 || lineNum === 60 || lineNum === 62) return "u: 1";
      }
      if (stepIndex === 15) {
        if (lineNum === 57 || lineNum === 58 || lineNum === 60 || lineNum === 62) return "u: 2";
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const dist = [1e9, 1e9, 1e9, 1e9, 1e9];
      let uVal = -1;

      if (stepIndex >= 1) dist[1] = 0;
      if (stepIndex >= 8 && stepIndex <= 14) uVal = 1;
      if (stepIndex >= 13) dist[2] = 2;
      if (stepIndex >= 14) dist[3] = 4;
      if (stepIndex === 15) {
        uVal = 2;
        dist[3] = 3;
        dist[4] = 6;
      }
      if (stepIndex >= 16) {
        dist[4] = 6;
      }

      const staticNodes = [
        { id: "1", x: 50, y: 110, label: "1" },
        { id: "2", x: 150, y: 50, label: "2" },
        { id: "3", x: 150, y: 170, label: "3" },
        { id: "4", x: 250, y: 110, label: "4" }
      ];
      const staticEdges = [
        { source: "1", target: "2", weight: 2 },
        { source: "1", target: "3", weight: 4 },
        { source: "2", target: "3", weight: 1 },
        { source: "2", target: "4", weight: 7 },
        { source: "3", target: "4", weight: 3 }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === uVal) state = "active";
          else if (dist[idNum] < 1e9) state = "visited";
          const desc = `d=${dist[idNum] >= 1e9 ? "INF" : dist[idNum]}`;
          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === uVal);
          return { ...e, active };
        })
      };
    }
  },
  "problems": {
    "easy": [
      {
        "title": "Network Delay Time",
        "url": "https://leetcode.com/problems/network-delay-time/",
        "desc": "Calculează timpul minim necesar ca semnalul să ajungă la toate nodurile rețelei pornind dintr-o sursă."
      }
    ],
    "medium": [
      {
        "title": "Dijkstra?",
        "url": "https://codeforces.com/problemset/problem/20/C",
        "desc": "Problemă clasică de determinare și reconstituire a celui mai scurt drum într-un graf ponderat."
      }
    ],
    "hard": [
      {
        "title": "Shortest Routes I",
        "url": "https://cses.fi/problemset/task/1671/",
        "desc": "Găsește cele mai scurte rute de la nodul 1 la toate celelalte noduri din graf."
      }
    ]
  }
};
