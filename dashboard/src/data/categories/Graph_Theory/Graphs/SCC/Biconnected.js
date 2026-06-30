const steps = [
  {
    line: 70,
    text: "Începem parcurgerea DFS din nodul de start 0 cu părintele -1.",
    u: 0, p: -1, children: 0, v: -1,
    tin: [0,0,0,0,0,0], low: [0,0,0,0,0,0],
    st: [], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 17,
    text: "Setăm timpul de descoperire și low-link pentru nodul 0: tin[0] = low[0] = 1.",
    u: 0, p: -1, children: 0, v: -1,
    tin: [1,0,0,0,0,0], low: [1,0,0,0,0,0],
    st: [], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 28,
    text: "Nodul vecin 1 nu este vizitat. Adăugăm muchia {0, 1} pe stiva de muchii.",
    u: 0, p: -1, children: 1, v: 1,
    tin: [1,0,0,0,0,0], low: [1,0,0,0,0,0],
    st: [[0,1]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [0,1]
  },
  {
    line: 29,
    text: "Apelăm recursiv DFS pentru nodul 1, având ca părinte nodul 0.",
    u: 1, p: 0, children: 0, v: -1,
    tin: [1,0,0,0,0,0], low: [1,0,0,0,0,0],
    st: [[0,1]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [0,1]
  },
  {
    line: 17,
    text: "Setăm timpul de descoperire și low-link pentru nodul 1: tin[1] = low[1] = 2.",
    u: 1, p: 0, children: 0, v: -1,
    tin: [1,2,0,0,0,0], low: [1,2,0,0,0,0],
    st: [[0,1]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 28,
    text: "Nodul vecin 2 nu este vizitat. Adăugăm muchia {1, 2} pe stiva de muchii.",
    u: 1, p: 0, children: 1, v: 2,
    tin: [1,2,0,0,0,0], low: [1,2,0,0,0,0],
    st: [[0,1], [1,2]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [1,2]
  },
  {
    line: 29,
    text: "Apelăm recursiv DFS pentru nodul 2, având ca părinte nodul 1.",
    u: 2, p: 1, children: 0, v: -1,
    tin: [1,2,0,0,0,0], low: [1,2,0,0,0,0],
    st: [[0,1], [1,2]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [1,2]
  },
  {
    line: 17,
    text: "Setăm timpul de descoperire și low-link pentru nodul 2: tin[2] = low[2] = 3.",
    u: 2, p: 1, children: 0, v: -1,
    tin: [1,2,3,0,0,0], low: [1,2,3,0,0,0],
    st: [[0,1], [1,2]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 22,
    text: "Pentru nodul 2, vecinul 0 este deja vizitat și nu este părintele său. Este o muchie de întoarcere. Actualizăm low[2] = min(low[2], tin[0]) = 1.",
    u: 2, p: 1, children: 0, v: 0,
    tin: [1,2,3,0,0,0], low: [1,2,1,0,0,0],
    st: [[0,1], [1,2]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [2,0]
  },
  {
    line: 24,
    text: "Deoarece tin[0] < tin[2] (1 < 3), adăugăm muchia de întoarcere {2, 0} pe stivă.",
    u: 2, p: 1, children: 0, v: 0,
    tin: [1,2,3,0,0,0], low: [1,2,1,0,0,0],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [2,0]
  },
  {
    line: 28,
    text: "Următorul vecin 3 nu este vizitat. Adăugăm muchia {2, 3} pe stivă.",
    u: 2, p: 1, children: 1, v: 3,
    tin: [1,2,3,0,0,0], low: [1,2,1,0,0,0],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [2,3]
  },
  {
    line: 29,
    text: "Apelăm recursiv DFS pentru nodul 3, având ca părinte nodul 2.",
    u: 3, p: 2, children: 0, v: -1,
    tin: [1,2,3,0,0,0], low: [1,2,1,0,0,0],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [2,3]
  },
  {
    line: 17,
    text: "Setăm timpul de descoperire și low-link pentru nodul 3: tin[3] = low[3] = 4.",
    u: 3, p: 2, children: 0, v: -1,
    tin: [1,2,3,4,0,0], low: [1,2,1,4,0,0],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 28,
    text: "Vecinul 4 nu este vizitat. Adăugăm muchia {3, 4} pe stivă.",
    u: 3, p: 2, children: 1, v: 4,
    tin: [1,2,3,4,0,0], low: [1,2,1,4,0,0],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [3,4]
  },
  {
    line: 29,
    text: "Apelăm recursiv DFS pentru nodul 4, având ca părinte nodul 3.",
    u: 4, p: 3, children: 0, v: -1,
    tin: [1,2,3,4,0,0], low: [1,2,1,4,0,0],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [3,4]
  },
  {
    line: 17,
    text: "Setăm timpul de descoperire și low-link pentru nodul 4: tin[4] = low[4] = 5.",
    u: 4, p: 3, children: 0, v: -1,
    tin: [1,2,3,4,5,0], low: [1,2,1,4,5,0],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 28,
    text: "Vecinul 5 nu este vizitat. Adăugăm muchia {4, 5} pe stivă.",
    u: 4, p: 3, children: 1, v: 5,
    tin: [1,2,3,4,5,0], low: [1,2,1,4,5,0],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [4,5]
  },
  {
    line: 29,
    text: "Apelăm recursiv DFS pentru nodul 5, având ca părinte nodul 4.",
    u: 5, p: 4, children: 0, v: -1,
    tin: [1,2,3,4,5,0], low: [1,2,1,4,5,0],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [4,5]
  },
  {
    line: 17,
    text: "Setăm timpul de descoperire și low-link pentru nodul 5: tin[5] = low[5] = 6.",
    u: 5, p: 4, children: 0, v: -1,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,5,6],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 22,
    text: "Pentru nodul 5, vecinul 3 este deja vizitat. Muchie de întoarcere. Actualizăm low[5] = min(low[5], tin[3]) = 4.",
    u: 5, p: 4, children: 0, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,5,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [5,3]
  },
  {
    line: 24,
    text: "Deoarece tin[3] < tin[5] (4 < 6), adăugăm muchia {5, 3} pe stivă.",
    u: 5, p: 4, children: 0, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,5,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: [5,3]
  },
  {
    line: 50,
    text: "Se încheie parcurgerea pentru nodul 5, revenim în nodul părinte 4.",
    u: 4, p: 3, children: 1, v: 5,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,5,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 30,
    text: "În nodul 4: actualizăm low[4] = min(low[4], low[5]) = min(5, 4) = 4.",
    u: 4, p: 3, children: 1, v: 5,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 31,
    text: "Verificăm condiția low[5] >= tin[4] (4 >= 5 este fals). Nodul 4 nu este punct de articulație din această ramură.",
    u: 4, p: 3, children: 1, v: 5,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 50,
    text: "Se încheie parcurgerea pentru nodul 4, revenim în nodul părinte 3.",
    u: 3, p: 2, children: 1, v: 4,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 30,
    text: "În nodul 3: actualizăm low[3] = min(low[3], low[4]) = min(4, 4) = 4.",
    u: 3, p: 2, children: 1, v: 4,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,false,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 31,
    text: "Verificăm condiția low[4] >= tin[3] (4 >= 4 este adevărat). Marcăm nodul 3 ca punct de articulație: is_cut[3] = true.",
    u: 3, p: 2, children: 1, v: 4,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3], [3,4], [4,5], [5,3]], isCut: [false,false,false,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 34,
    text: "Găsim prima Componentă Biconexă (BCC). Extragem muchiile de pe stivă până la {3, 4}. Obținem bcc: { (5,3), (4,5), (3,4) }.",
    u: 3, p: 2, children: 1, v: 4,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 42,
    text: "Verificăm dacă muchia {3, 4} este punte: low[4] > tin[3] (4 > 4 este fals). Nu este punte.",
    u: 3, p: 2, children: 1, v: 4,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 50,
    text: "Se încheie parcurgerea pentru nodul 3, revenim în nodul părinte 2.",
    u: 2, p: 1, children: 1, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 30,
    text: "În nodul 2: actualizăm low[2] = min(low[2], low[3]) = min(1, 4) = 1.",
    u: 2, p: 1, children: 1, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,false,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 31,
    text: "Verificăm condiția low[3] >= tin[2] (4 >= 3 este adevărat). Marcăm nodul 2 ca punct de articulație: is_cut[2] = true.",
    u: 2, p: 1, children: 1, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0], [2,3]], isCut: [false,false,true,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 34,
    text: "Găsim a doua Componentă Biconexă (BCC). Extragem muchia {2, 3} de pe stivă.",
    u: 2, p: 1, children: 1, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [], activeEdge: null
  },
  {
    line: 42,
    text: "Verificăm dacă muchia {2, 3} este punte: low[3] > tin[2] (4 > 3 este adevărat). Am găsit o punte: {2, 3}.",
    u: 2, p: 1, children: 1, v: 3,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 50,
    text: "Se încheie parcurgerea pentru nodul 2, revenim în nodul părinte 1.",
    u: 1, p: 0, children: 1, v: 2,
    tin: [1,2,3,4,5,6], low: [1,2,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 30,
    text: "În nodul 1: actualizăm low[1] = min(low[1], low[2]) = min(2, 1) = 1.",
    u: 1, p: 0, children: 1, v: 2,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 31,
    text: "Verificăm condiția low[2] >= tin[1] (1 >= 2 este fals). Nodul 1 nu este punct de articulație.",
    u: 1, p: 0, children: 1, v: 2,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 50,
    text: "Se încheie parcurgerea pentru nodul 1, revenim în nodul de start 0.",
    u: 0, p: -1, children: 1, v: 1,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 30,
    text: "În nodul 0: actualizăm low[0] = min(low[0], low[1]) = min(1, 1) = 1.",
    u: 0, p: -1, children: 1, v: 1,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 31,
    text: "Verificăm condiția low[1] >= tin[0] (1 >= 1 este adevărat). Marcăm temporar nodul 0 ca punct de articulație.",
    u: 0, p: -1, children: 1, v: 1,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [[0,1], [1,2], [2,0]], isCut: [true,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 34,
    text: "Găsim a treia Componentă Biconexă (BCC). Extragem muchiile de pe stivă până la {0, 1}. Obținem bcc: { (2,0), (1,2), (0,1) }.",
    u: 0, p: -1, children: 1, v: 1,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [], isCut: [true,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 47,
    text: "Deoarece 0 este rădăcina arborelui DFS și are un singur copil (children <= 1), el nu este de fapt punct de articulație. Rectificăm is_cut[0] = false.",
    u: 0, p: -1, children: 1, v: 1,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  },
  {
    line: 71,
    text: "Algoritmul s-a încheiat cu succes! Am identificat 3 componente biconexe, 2 puncte de articulație (2 și 3) și o punte (muchia 2-3).",
    u: -1, p: -1, children: 0, v: -1,
    tin: [1,2,3,4,5,6], low: [1,1,1,4,4,4],
    st: [], isCut: [false,false,true,true,false,false],
    bridges: [[2,3]], activeEdge: null
  }
];

export const data = {
  "presentation": "### Componente Biconexe (BCC), Puncte de Articulație și Punți\n\nO **componentă biconexă** a unui graf neorientat este un subgraf maximal conex care rămâne conex după eliminarea oricărui nod. Un **punct de articulație** (sau nod de tăiere) este un nod a cărui eliminare crește numărul de componente conexe ale grafului. O **punte** (sau muchie de tăiere) este o muchie a cărei eliminare crește numărul de componente conexe.\n\nAlgoritmul folosește o parcurgere DFS în care fiecărui nod $u$ i se asociază:\n- `tin[u]`: timpul de descoperire în DFS.\n- `low[u]`: timpul minim de descoperire al unui nod accesibil din subarborele DFS al lui $u$, folosind cel mult o muchie de întoarcere.\n\nPentru o muchie directă $(u, v)$ în DFS, avem:\n- Un nod $u$ (diferit de rădăcină) este punct de articulație dacă și numai dacă există un fiu $v$ astfel încât `low[v] >= tin[u]`.\n- Rădăcina parcurgerii DFS este punct de articulație dacă și numai dacă are cel puțin doi fii în arborele DFS.\n- O muchie $(u, v)$ este punte dacă și numai dacă `low[v] > tin[u]`.\n- Componentele biconexe sunt determinate prin extragerea muchiilor stocate pe o stivă în timpul DFS.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(V + E)$ – o singură parcurgere DFS completă, în care fiecare nod și fiecare muchie sunt vizitate de un număr constant de ori.\n- **Spațiu:** $\\mathcal{O}(V + E)$ – pentru stiva de muchii, listele de adiacență și vectorii auxiliari (`tin`, `low`, `is_cut`).",
  "variations": "### Variații și Cazuri Particulare\n\n- **Graf Biconex**: Un graf este biconex dacă nu conține niciun punct de articulație.\n- **Bloc**: În teoria grafurilor, un bloc este un subgraf maximal fără puncte de articulație (o componentă biconexă sau o punte singulară).\n- **Block-Cut Tree**: O reprezentare sub formă de arbore în care nodurile sunt componentele biconexe și punctele de articulație din graful original.",
  "applications": "### Aplicații Reale\n\n- **Proiectarea rețelelor tolerante la erori**: Determinarea punctelor critice de eșec (Single Point of Failure) în rețele de telecomunicații sau rețele electrice.\n- **Analiza vulnerabilității rețelelor sociale**: Identificarea persoanelor cheie (gatekeepers) care leagă comunități diferite.\n- **Optimizarea rutării**: Găsirea rutelor alternative în caz de deconectare a unui nod sau a unei legături fizice.",
  "code": `#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

vector<vector<int>> adj;
vector<int> tin, low;
int timer = 0;
stack<pair<int, int>> st;
vector<vector<pair<int, int>>> bccs;
vector<pair<int, int>> bridges;
vector<bool> is_cut;

void dfs(int u, int p = -1) {
    tin[u] = low[u] = ++timer;
    int children = 0;
    for (int v : adj[u]) {
        if (v == p) continue;
        if (tin[v] != 0) {
            low[u] = min(low[u], tin[v]);
            if (tin[v] < tin[u]) {
                st.push({u, v});
            }
        } else {
            children++;
            st.push({u, v});
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] >= tin[u]) {
                is_cut[u] = true;
                vector<pair<int, int>> bcc;
                while (true) {
                    auto edge = st.top();
                    st.pop();
                    bcc.push_back(edge);
                    if (edge == make_pair(u, v)) break;
                }
                bccs.push_back(bcc);
            }
            if (low[v] > tin[u]) {
                bridges.push_back({u, v});
            }
        }
    }
    if (p == -1 && children <= 1) {
        is_cut[u] = false;
    }
}

int main() {
    int n = 6;
    adj.resize(n);
    tin.assign(n, 0);
    low.assign(n, 0);
    is_cut.assign(n, false);

    // Ciclul 0-1-2
    adj[0].push_back(1); adj[1].push_back(0);
    adj[1].push_back(2); adj[2].push_back(1);
    adj[2].push_back(0); adj[0].push_back(2);
    // Puntea 2-3
    adj[2].push_back(3); adj[3].push_back(2);
    // Ciclul 3-4-5
    adj[3].push_back(4); adj[4].push_back(3);
    adj[4].push_back(5); adj[5].push_back(4);
    adj[5].push_back(3); adj[3].push_back(5);

    dfs(0);
    return 0;
}
`,
  "explanations": steps.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: [
      {
        label: "Stivă Muchii",
        type: "Stack",
        groups: step.st.length === 0 ? [[]] : step.st.map(edge => [
          {
            val: "(" + edge[0] + ", " + edge[1] + ")",
            active: step.activeEdge && step.activeEdge[0] === edge[0] && step.activeEdge[1] === edge[1]
          }
        ])
      }
    ]
  })),
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const step = steps[stepIndex] || steps[steps.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      globalVars.push({ name: "timer", type: "int", val: step.timer, expandable: false });
      globalVars.push({ name: "tin", type: "std::vector<int>", val: "{" + step.tin.join(", ") + "}", expandable: false });
      globalVars.push({ name: "low", type: "std::vector<int>", val: "{" + step.low.join(", ") + "}", expandable: false });
      globalVars.push({ name: "is_cut", type: "std::vector<bool>", val: "{" + step.isCut.map(x => x ? "true" : "false").join(", ") + "}", expandable: false });
      globalVars.push({ name: "bridges", type: "std::vector<std::pair<int,int>>", val: "size = " + step.bridges.length, expandable: true });

      if (step.u !== -1) {
        vars.push({ name: "u", type: "int", val: step.u, expandable: false });
        vars.push({ name: "p", type: "int", val: step.p, expandable: false });
        vars.push({ name: "children", type: "int", val: step.children, expandable: false });
        if (step.v !== -1) {
          vars.push({ name: "v", type: "int", val: step.v, expandable: false });
        }
      }

      frames.push({ name: "main()", file: "main.cpp", line: 70 });
      if (step.u !== -1) {
        const path = [];
        if (step.u >= 5 || stepIndex === 19) {
          path.push({ u: 5, p: 4 });
        }
        if (step.u >= 4 || (stepIndex >= 20 && stepIndex <= 21)) {
          path.push({ u: 4, p: 3 });
        }
        if (step.u >= 3 || (stepIndex >= 22 && stepIndex <= 25)) {
          path.push({ u: 3, p: 2 });
        }
        if (step.u >= 2 || (stepIndex >= 26 && stepIndex <= 29)) {
          path.push({ u: 2, p: 1 });
        }
        if (step.u >= 1 || stepIndex === 30) {
          path.push({ u: 1, p: 0 });
        }
        path.push({ u: 0, p: -1 });

        for (const f of path) {
          frames.unshift({
            name: "dfs(u = " + f.u + ", p = " + f.p + ")",
            file: "solution.cpp",
            line: activeLine
          });
        }
      }

      let inlineVal = null;
      if (step.u !== -1) {
        inlineVal = "u: " + step.u + ", p: " + step.p + ", low[u]: " + step.low[step.u];
        if (step.v !== -1) {
          inlineVal += ", v: " + step.v;
        }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const step = steps[stepIndex];
      if (!step || step.u === -1) return null;

      if (lineNum === 16 || lineNum === 17) {
        return "u: " + step.u + ", tin: " + step.tin[step.u];
      }
      if (lineNum === 18) {
        return "children: " + step.children;
      }
      if (lineNum === 19 || lineNum === 20 || lineNum === 21) {
        return step.v !== -1 ? "v: " + step.v + ", tin[v]: " + step.tin[step.v] : null;
      }
      if (lineNum === 22) {
        return "low[u]: " + step.low[step.u];
      }
      if (lineNum === 30) {
        return step.v !== -1 ? "low[u]: " + step.low[step.u] + ", low[v]: " + step.low[step.v] : null;
      }
      if (lineNum === 31 || lineNum === 32) {
        return step.v !== -1 ? "low[v]: " + step.low[step.v] + " >= tin[u]: " + step.tin[step.u] : null;
      }
      if (lineNum === 42 || lineNum === 43) {
        return step.v !== -1 ? "low[v]: " + step.low[step.v] + " > tin[u]: " + step.tin[step.u] : null;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const step = steps[stepIndex] || steps[steps.length - 1];

      const staticNodes = [
        { id: "0", x: 100, y: 50, label: "0" },
        { id: "1", x: 50, y: 150, label: "1" },
        { id: "2", x: 150, y: 150, label: "2" },
        { id: "3", x: 250, y: 150, label: "3" },
        { id: "4", x: 300, y: 50, label: "4" },
        { id: "5", x: 350, y: 150, label: "5" }
      ];

      const staticEdges = [
        { source: "0", target: "1" },
        { source: "1", target: "2" },
        { source: "2", target: "0" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "5" },
        { source: "5", target: "3" }
      ];

      return {
        directed: false,
        title: "Componente Biconexe, Puncte de Articulație & Punți",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === step.u) {
            state = "active";
          } else if (step.tin[idNum] > 0) {
            state = "visited";
          }

          let desc = "tin/low: -/-";
          if (step.tin[idNum] > 0) {
            desc = "tin/low: " + step.tin[idNum] + "/" + step.low[idNum];
            if (step.isCut[idNum]) {
              desc += " (Artic)";
            }
          }

          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          
          // Check if it is the current active edge
          const isCurrentActive = step.activeEdge && 
            ((step.activeEdge[0] === u && step.activeEdge[1] === v) || 
             (step.activeEdge[0] === v && step.activeEdge[1] === u));

          // Check if this edge is a detected bridge
          const isBridge = step.bridges.some(b => 
            (b[0] === u && b[1] === v) || (b[0] === v && b[1] === u)
          );

          return { 
            ...e, 
            active: isCurrentActive || isBridge,
            weight: isBridge ? "punte" : undefined
          };
        })
      };
    }
  }
};
