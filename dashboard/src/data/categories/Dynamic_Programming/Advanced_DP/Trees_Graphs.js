export const data = {
  "presentation": "### Prezentare Generală\n\n**Programarea Dinamică pe Arbori (Tree DP)** combină proprietățile structurale ale arborilor cu principiile Programării Dinamice. Datorită structurii ierarhice aciclice, subproblemele unui arbore sunt definite în mod natural de subarborii săi. Soluția optimă pentru un nod părinte poate fi calculată exclusiv din soluțiile optime ale nodurilor copii.\n\nÎn mod tipic, Tree DP se implementează recursiv printr-o parcurgere în adâncime (DFS). Se procesează mai întâi frunzele (cazurile de bază), iar apoi, în post-ordine, se agregă rezultatele de la fii către părinți, urcând spre rădăcină.\n\n#### Problema Clasică: Maximum Independent Set (MIS)\nSe dorește alegerea unei submulțimi de noduri din arbore cu cardinalitate maximă, astfel încât să nu existe două noduri adiacente (conectate direct printr-o muchie) selectate simultan.\n\nDefinim starea pentru fiecare nod $u$:\n- $dp[u][0]$ = dimensiunea maximă a unei mulțimi independente în subarborele lui $u$, în care $u$ **nu** este inclus.\n- $dp[u][1]$ = dimensiunea maximă a unei mulțimi independente în subarborele lui $u$, în care $u$ **este** inclus.\n\n#### Tranziții\n1. **Dacă NU includem nodul $u$ ($dp[u][0]$):** Copiii $v$ ai lui $u$ pot fi fie incluși, fie excluși din mulțime. Alegem varianta optimă pentru fiecare copil:\n   $$dp[u][0] = \\sum_{v \\in children(u)} \\max(dp[v][0], dp[v][1])$$\n2. **Dacă includem nodul $u$ ($dp[u][1]$):** Copiii $v$ nu au voie să fie incluși (pentru a evita adiacența). Adăugăm $1$ pentru nodul $u$:\n   $$dp[u][1] = 1 + \\sum_{v \\in children(u)} dp[v][0]$$",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(V + E) = \\mathcal{O}(V)$, deoarece într-un arbore numărul de muchii este $E = V - 1$. Fiecare nod și fiecare muchie este vizitată exact o singură dată în timpul parcurgerii DFS.\n- **Spațiu:** $\\mathcal{O}(V)$ pentru stocarea stărilor de programare dinamică în matricea $dp$, la care se adaugă spațiul ocupat de stiva recursivă a parcurgerii DFS.",
  "variations": "### Variații și Edge Cases\n\n1. **Determinarea Diametrului unui Arbore:** Determinarea celei mai mari distanțe dintre oricare două noduri. Definim $dp[u]$ ca fiind lungimea celui mai lung drum de la $u$ în subarborele său, iar diametrul global este $\\max_{u} (drum1(u) + drum2(u))$.\n2. **Tree Knapsack (Subtree DP cu Greutăți):** Fiecare nod are o greutate și o valoare, iar alegerea unui nod este condiționată de selectarea părintelui său. Starea devine $dp[u][w]$ — valoarea maximă obtenabilă în subarborele lui $u$ cu capacitatea $w$.\n3. **Edge Cases:**\n   - Arbore format dintr-un singur nod (răspunsul este $1$).\n   - Arbore de tip linie (echivalent cu o problemă DP clasică pe secvență liniară).\n   - Rădăcină cu un singur copil.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Ierarhii Organizaționale:** Selectarea celei mai mari echipe de angajați pentru un eveniment fără ca un manager și subordonatul său direct să fie invitați simultan (pentru a asigura comunicarea liberă).\n- **Securitatea Rețelelor:** Plasarea unui număr minim de servere de securitate (firewalls) în nodurile unei rețele ierarhice pentru a monitoriza toate conexiunile.\n- **Instalarea Facilităților:** Amplasarea optimă a routerelor wireless în clădiri cu structură arborescentă pentru acoperire maximă cu cost minim."
,
  code: `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void dfs(int u, int p, vector<vector<int>>& adj, vector<vector<int>>& dp) {
    dp[u][0] = 0; // Nu include
    dp[u][1] = 1; // Include

    for (int v : adj[u]) {
        if (v == p) continue; // Evitam intoarcerea
        
        dfs(v, u, adj, dp);
        
        // Dacă nu includ u, copiii pot fi incluși sau nu
        dp[u][0] += max(dp[v][0], dp[v][1]);
        
        // Dacă includ u, copiii NU pot fi incluși
        dp[u][1] += dp[v][0];
    }
}

int main() {
    int n = 5;
    vector<vector<int>> adj(n);
    adj[0] = {1, 2};
    adj[1] = {0, 3, 4};
    adj[2] = {0};
    adj[3] = {1};
    adj[4] = {1};
    
    vector<vector<int>> dp(n, vector<int>(2, 0));
    dfs(0, -1, adj, dp); // Rădăcina 0, părinte -1
    
    cout << "Max Independent Set: " << max(dp[0][0], dp[0][1]) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 24,
      "text": "Pornim programul. Avem un arbore cu n = 5 noduri și rădăcina 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 33,
      "text": "Apelăm dfs(0, -1) pentru a calcula dp de la rădăcina 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Inițializăm stările de bază pentru nodul 0: dp[0][0] = 0 și dp[0][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (0,1)", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Din nodul 0, apelăm dfs(1, 0) pentru primul copil.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Inițializăm stările de bază pentru nodul 1: dp[1][0] = 0 și dp[1][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (0,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Din nodul 1, apelăm dfs(3, 1) pentru copilul 3.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3", "state": "active" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Nodul 3 este frunză. Inițializăm dp[3][0] = 0 și dp[3][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "active" },
          { "id": "4", "x": 115, "y": 150, "label": "4" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "dfs(3, 1) s-a terminat. Revenim în nodul 1 și apelăm dfs(4, 1) pentru copilul 4.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Nodul 4 este frunză. Inițializăm dp[4][0] = 0 și dp[4][1] = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "dfs(4, 1) s-a terminat. Revenim în nodul 1 pentru a agrega rezultatele copiilor săi.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 16,
      "text": "Prelucrăm copilul 3 pentru nodul 1: dp[1][0] += max(dp[3][0]=0, dp[3][1]=1) = 1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (1,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 19,
      "text": "De asemenea, dacă includem nodul 1: dp[1][1] += dp[3][0] = 0. Momentan dp[1] = (1, 1).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (1,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 16,
      "text": "Prelucrăm copilul 4 pentru nodul 1: dp[1][0] += max(dp[4][0]=0, dp[4][1]=1) = 1 + 1 = 2.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "active" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 19,
      "text": "Și dacă includem nodul 1: dp[1][1] += dp[4][0] = 0. Final dp[1] = (2, 1). dfs(1) se întoarce.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Revenim în nodul 0. Prelucrăm rezultatele de la copilul 1: dp[0][0] += max(2, 1) = 2 și dp[0][1] += dp[1][0] = 2. dp[0] = (2, 3).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (2,3)", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Apelăm acum dfs(2, 0) pentru al doilea copil al rădăcinii.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2", "state": "active" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 7,
      "text": "Nodul 2 este frunză. Inițializăm dp[2][0] = 0 și dp[2][1] = 1. dfs(2) se întoarce.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 13,
      "text": "Revenim în nodul 0. Prelucrăm rezultatele de la copilul 2: dp[0][0] += max(dp[2][0]=0, dp[2][1]=1) = 2 + 1 = 3.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "active" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 19,
      "text": "Și dacă includem nodul 0: dp[0][1] += dp[2][0] = 3 + 0 = 3. Final dp[0] = (3, 3).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "visited" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 33,
      "text": "Funcția recursivă dfs(0, -1) își încheie execuția. Matricea DP conține acum rezultatele optime pentru toate subarborile.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "visited" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 35,
      "text": "Rezultatul final este max(dp[0][0]=3, dp[0][1]=3) = 3. Alegem nodurile {0, 3, 4} pentru mulțimea independentă maximă.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "visited" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    },
    {
      "line": 36,
      "text": "Programul se termină cu succes, returnând 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0 (3,3)", "state": "visited" },
          { "id": "1", "x": 80, "y": 90, "label": "1 (2,1)", "state": "visited" },
          { "id": "2", "x": 200, "y": 90, "label": "2 (0,1)", "state": "visited" },
          { "id": "3", "x": 45, "y": 150, "label": "3 (0,1)", "state": "visited" },
          { "id": "4", "x": 115, "y": 150, "label": "4 (0,1)", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "1", "target": "4" }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Subarbore",
        "url": "https://www.infoarena.ro/problema/subarbore",
        "desc": "Baza pentru DP pe arbori"
      }
    ],
    "medium": [
      {
        "title": "Binary Tree Cameras",
        "url": "https://leetcode.com/problems/binary-tree-cameras/",
        "desc": "Extindere State Machine cu 3 stări"
      }
    ],
    "hard": [
      {
        "title": "Minimum Cost Tree From Leaf Values",
        "url": "https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/",
        "desc": "Combinație Greedy și DP pe intervale de arbori"
      }
    ]
  }
};
