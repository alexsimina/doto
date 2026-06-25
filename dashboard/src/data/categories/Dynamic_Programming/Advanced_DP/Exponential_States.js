export const data = {
  "presentation": "### Prezentare Generală\n\n**Programarea Dinamică pe Stări Exponențiale (sau Bitmask DP)** este o tehnică de optimizare utilizată atunci când stările problemei depind de o submulțime de elemente selectate sau vizitate. Pentru a reprezenta eficient o submulțime, folosim o **mască de biți (bitmask)** — un număr întreg în care cel de-al $k$-lea bit este $1$ dacă elementul $k$ aparține submulțimii, și $0$ în caz contrar.\n\nDe exemplu, dacă avem $N=4$ elemente (indexate de la 0 la 3), submulțimea {0, 2} este reprezentată de masca binară $0101_2$, care în baza 10 este numărul întreg $5$.\n\nDeoarece numărul total de submulțimi este $2^N$, această abordare este viabilă doar pentru valori mici ale lui $N$ (de regulă, $N \\le 20$, deoarece $2^{20} \\approx 10^6$).\n\n#### Travelling Salesperson Problem (TSP)\nProblema clasică rezolvată cu Bitmask DP este TSP: fiind date $N$ orașe și distanțele dintre ele, se cere determinarea unui circuit de cost minim care vizitează fiecare oraș exact o singură dată și revine în orașul de start.\n\nDefinim starea:\n- $dp[S][i]$ = costul minim de a vizita toate orașele din submulțimea reprezentată de masca $S$, terminând traseul în orașul $i$.\n\nTranziția se face prin alegerea următorului oraș $city$ care nu a fost încă vizitat ($city \\notin S$):\n$$dp[S \\cup \\{city\\}][city] = \\min_{i \\in S} \\left( dp[S][i] + dist[i][city] \\right)$$\n\nÎn cod, verificăm dacă un oraș este vizitat folosind operația logică ȘI pe biți `(mask & (1 << city)) == 0` și îl adăugăm în mască folosind SAU pe biți `mask | (1 << city)`.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(2^N \\times N^2)$ pentru TSP. Numărul total de stări este $2^N \\times N$, iar pentru fiecare stare încercăm $N$ tranziții posibile. Aceasta este o îmbunătățire uriașă față de abordarea naivă de generare a tuturor permutărilor, care rulează în $\\mathcal{O}(N!)$.\n- **Spațiu:** $\\mathcal{O}(2^N \\times N)$ pentru stocarea tabelei $dp$.",
  "variations": "### Variații și Edge Cases\n\n1. **Sum Over Subsets (SOS DP):** O tehnică avansată care permite calculul sumei valorilor tuturor subseturilor unei măști în timp $\\mathcal{O}(N \\cdot 2^N)$ în loc de $\\mathcal{O}(3^N)$.\n2. **Profile DP (Broken Profile DP):** Utilizată pentru pavări sau numărarea modurilor de acoperire a unei grile 2D folosind piese de domino sau alte forme, unde masca reprezintă starea ultimei linii procesate.\n3. **Edge Cases:**\n   - $N = 1$ (costul este $0$).\n   - Graf neorientat vs. orientat.\n   - Graf incomplet (distanțe infinite între anumite orașe) — stările invalide trebuie inițializate cu o valoare infinită suficient de mare, dar care să nu producă overflow la adunare (ex. $10^9$).",
  "applications": "### Aplicații în Lumea Reală\n\n- **Rutarea Vehiculelor (Logistică):** Determinarea traseelor optime de livrare pentru curieri cu un număr mic de opriri zilnice.\n- **Planificarea Circuitelor Integrate (VLSI):** Proiectarea traseelor optime de cablare pe cipuri de siliciu pentru a reduce la minimum întârzierile de semnal.\n- **Secvențierea ADN:** Reconstrucția genomului prin găsirea celui mai scurt superșir comun (Shortest Common Superstring) care conține un set de fragmente de ADN citite."
,
  code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int INF = 1e9;

int tsp(int mask, int pos, int n, vector<vector<int>>& dist, vector<vector<int>>& dp) {
    // Dacă am vizitat toate nodurile (mask are toti n bitii pe 1)
    if (mask == (1 << n) - 1) {
        return dist[pos][0]; // Ne întoarcem la start (0)
    }
    
    if (dp[mask][pos] != -1) return dp[mask][pos];
    
    int ans = INF;
    // Incercam sa mergem la orice alt oras
    for (int city = 0; city < n; city++) {
        // Verificam daca 'city' NU este inca vizitat in 'mask'
        if ((mask & (1 << city)) == 0) {
            int newAns = dist[pos][city] + tsp(mask | (1 << city), city, n, dist, dp);
            ans = min(ans, newAns);
        }
    }
    
    return dp[mask][pos] = ans;
}

int main() {
    int n = 4;
    vector<vector<int>> dist = {
        {0, 20, 42, 25},
        {20, 0, 30, 34},
        {42, 30, 0, 10},
        {25, 34, 10, 0}
    };
    
    vector<vector<int>> dp(1 << n, vector<int>(n, -1));
    cout << "Cost minim TSP: " << tsp(1, 0, n, dist, dp) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 30,
      "text": "Pornim programul cu n = 4 orașe și matricea de distanțe.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 39,
      "text": "Apelăm funcția tsp(mask = 1, pos = 0) - am vizitat orașul 0 (0001 binar), ne aflăm în 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "active" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 14,
      "text": "Verificăm dp[1][0]. Este -1 (necalculat).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "active" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Tranziție: încercăm să mergem la orașul 1. Apelăm tsp(mask = 3, pos = 1). (3 în binar: 0011).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 1, încercăm să mergem la orașul 2. Apelăm tsp(mask = 7, pos = 2). (7 în binar: 0111).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 2, încercăm să mergem la orașul 3. Apelăm tsp(mask = 15, pos = 3). (15 în binar: 1111).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 10,
      "text": "mask = 15 (toate orașele vizitate). Returnăm costul de întoarcere în 0: dist[3][0] = 25.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(7, 2). Variabila newAns = dist[2][3] + 25 = 10 + 25 = 35. Deoarece 3 e singurul unvisited, ans = 35.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 26,
      "text": "Salvăm în cache rezultatul: dp[7][2] = 35 și îl returnăm.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(3, 1). newAns = dist[1][2] + dp[7][2] = 30 + 35 = 65. ans = 65.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 1, încercăm și cealaltă opțiune nevizitată: orașul 3. Apelăm tsp(mask = 11, pos = 3). (11: 1011).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 3, mergem la singurul nevizitat: orașul 2. Apelăm tsp(mask = 15, pos = 2). (15: 1111).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 10,
      "text": "mask = 15 (toate vizitate). Returnăm costul de întoarcere: dist[2][0] = 42.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(11, 3). newAns = dist[3][2] + 42 = 10 + 42 = 52. Retinem dp[11][3] = 52.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(3, 1). A doua opțiune costă dist[1][3] + dp[11][3] = 34 + 52 = 86. min(65, 86) = 65. Salvăm dp[3][1] = 65.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(1, 0). Prima tranziție (orașul 1) a costat dist[0][1] + dp[3][1] = 20 + 65 = 85. ans = 85.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "active" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 0, încercăm a doua opțiune: orașul 2. Apelăm tsp(mask = 5, pos = 2). (5 în binar: 0101).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 2, încercăm orașul 1. Apelăm tsp(mask = 7, pos = 1). (7 în binar: 0111).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 14,
      "text": "Verificăm în cache dp[7][1]. Este -1.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 1, mergem la orașul 3. Apelăm tsp(mask = 15, pos = 3).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 10,
      "text": "mask = 15. Returnăm dist[3][0] = 25.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 26,
      "text": "Revenim în tsp(7, 1). Costul este dist[1][3] + 25 = 34 + 25 = 59. Salvăm dp[7][1] = 59.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(5, 2). Prima tranziție (orașul 1) a costat dist[2][1] + dp[7][1] = 30 + 59 = 89. ans = 89.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 2, încercăm a doua tranziție: orașul 3. Apelăm tsp(mask = 13, pos = 3). (13 în binar: 1101).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Din orașul 3, mergem la singurul nevizitat: orașul 1. Apelăm tsp(mask = 15, pos = 1).",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 10,
      "text": "mask = 15. Returnăm dist[1][0] = 20.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "active" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 26,
      "text": "Revenim în tsp(13, 3). Costul este dist[3][1] + 20 = 34 + 20 = 54. Salvăm dp[13][3] = 54.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "active" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(5, 2). A doua opțiune costă dist[2][3] + dp[13][3] = 10 + 54 = 64. min(89, 64) = 64. Salvăm dp[5][2] = 64.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "active" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 21,
      "text": "Revenim în tsp(1, 0). Opțiunea 2 (orașul 2) a costat dist[0][2] + dp[5][2] = 42 + 64 = 106. min(85, 106) = 85.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "active" },
          { "id": "1", "x": 50, "y": 100, "label": "1" },
          { "id": "2", "x": 230, "y": 100, "label": "2" },
          { "id": "3", "x": 140, "y": 170, "label": "3" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    },
    {
      "line": 39,
      "text": "După verificarea tuturor drumurilor, drumul minim are costul 85. Traseul optim: 0 -> 1 -> 2 -> 3 -> 0.",
      "graphVisual": {
        "nodes": [
          { "id": "0", "x": 140, "y": 30, "label": "0", "state": "visited" },
          { "id": "1", "x": 50, "y": 100, "label": "1", "state": "visited" },
          { "id": "2", "x": 230, "y": 100, "label": "2", "state": "visited" },
          { "id": "3", "x": 140, "y": 170, "label": "3", "state": "visited" }
        ],
        "edges": [
          { "source": "0", "target": "1" },
          { "source": "0", "target": "2" },
          { "source": "0", "target": "3" },
          { "source": "1", "target": "2" },
          { "source": "1", "target": "3" },
          { "source": "2", "target": "3" }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Subset Sums Bitmask",
        "url": "https://www.pbinfo.ro/probleme/899/submultimi-biti",
        "desc": "Generare subseturi cu biti"
      }
    ],
    "medium": [
      {
        "title": "TSP Infoarena",
        "url": "https://www.infoarena.ro/problema/hamilton",
        "desc": "Ciclul Hamiltonian de cost minim"
      }
    ],
    "hard": [
      {
        "title": "Find the Shortest Superstring",
        "url": "https://leetcode.com/problems/find-the-shortest-superstring/",
        "desc": "O capodoperă a DP-ului pe biti combinata cu stringuri"
      }
    ]
  },
  "globalVars": [
  {
    "name": "dp",
    "type": "int[1 << N][N]",
    "val": "Bitmask DP table",
    "expandable": false
  }
]
,
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "dist", type: "std::vector<std::vector<int>>&", val: "size = 4 x 4", expandable: true });

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex === 0) ? 37 : (stepIndex >= 29 ? 46 : 46) });

      let activeStack = [];
      // we map stepIndex to recursive TSP stack frames: [mask, pos]
      if (stepIndex === 1 || stepIndex === 2) activeStack = [[1, 0]];
      else if (stepIndex === 3) activeStack = [[1, 0]]; // calling (3, 1)
      else if (stepIndex === 4) activeStack = [[1, 0], [3, 1]]; // calling (7, 2)
      else if (stepIndex === 5) activeStack = [[1, 0], [3, 1], [7, 2]]; // calling (15, 3)
      else if (stepIndex === 6) activeStack = [[1, 0], [3, 1], [7, 2], [15, 3]];
      else if (stepIndex === 7) activeStack = [[1, 0], [3, 1], [7, 2], [15, 3]];
      else if (stepIndex === 8) activeStack = [[1, 0], [3, 1], [7, 2], [15, 3]];
      else if (stepIndex === 9) activeStack = [[1, 0], [3, 1], [7, 2]];
      else if (stepIndex === 10) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 11) activeStack = [[1, 0], [3, 1]]; // calling (11, 3)
      else if (stepIndex === 12) activeStack = [[1, 0], [3, 1], [11, 3]]; // calling (15, 2)
      else if (stepIndex === 13) activeStack = [[1, 0], [3, 1], [11, 3], [15, 2]];
      else if (stepIndex === 14) activeStack = [[1, 0], [3, 1], [11, 3], [15, 2]];
      else if (stepIndex === 15) activeStack = [[1, 0], [3, 1], [11, 3], [15, 2]];
      else if (stepIndex === 16) activeStack = [[1, 0], [3, 1], [11, 3]];
      else if (stepIndex === 17) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 18) activeStack = [[1, 0], [3, 1]]; // dp hit check
      else if (stepIndex === 19) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 20) activeStack = [[1, 0], [3, 1], [15, 3]]; // calling (15, 3) from another path
      else if (stepIndex === 21) activeStack = [[1, 0], [3, 1], [15, 3]];
      else if (stepIndex === 22) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 23) activeStack = [[1, 0]];
      else if (stepIndex === 24) activeStack = [[1, 0]]; // calling (5, 2)
      else if (stepIndex === 25) activeStack = [[1, 0], [5, 2]]; // calling (15, 3)
      else if (stepIndex === 26) activeStack = [[1, 0], [5, 2], [15, 3]];
      else if (stepIndex === 27) activeStack = [[1, 0], [5, 2]];
      else if (stepIndex === 28) activeStack = [[1, 0]];

      activeStack.forEach(([maskVal, posVal], idx) => {
        let line = 28;
        if (idx === activeStack.length - 1) line = activeLine;
        frames.unshift({ name: `tsp(mask = ${maskVal}, pos = ${posVal}, n = 4, dist, dp)`, file: "solution.cpp", line: line });
      });

      if (activeStack.length > 0) {
        const [maskVal, posVal] = activeStack[activeStack.length - 1];
        const binaryStr = maskVal.toString(2).padStart(4, '0');
        vars.push({ name: "mask", type: "int (binary)", val: `${maskVal} (0b${binaryStr})`, expandable: false });
        vars.push({ name: "pos", type: "int", val: posVal.toString(), expandable: false });
        
        let ans = 1000000000;
        if (stepIndex === 6) ans = 25; // dist[3][0]
        else if (stepIndex === 8) ans = 35; // dist[2][3] + dist[3][0] = 10 + 25 = 35
        
        vars.push({ name: "ans", type: "int", val: ans === 1000000000 ? "INF" : ans.toString(), expandable: false });
        inlineVal = `mask: ${maskVal} (0b${binaryStr}), pos: ${posVal}`;
      }

      let dpGrid = "size = 16 x 4";
      globalVars.push({ name: "dp", type: "std::vector<std::vector<int>>", val: dpGrid, expandable: true });

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let activeStack = [];
      if (stepIndex === 1 || stepIndex === 2) activeStack = [[1, 0]];
      else if (stepIndex === 3) activeStack = [[1, 0]];
      else if (stepIndex === 4) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 5) activeStack = [[1, 0], [3, 1], [7, 2]];
      else if (stepIndex === 6) activeStack = [[1, 0], [3, 1], [7, 2], [15, 3]];
      else if (stepIndex === 7) activeStack = [[1, 0], [3, 1], [7, 2], [15, 3]];
      else if (stepIndex === 8) activeStack = [[1, 0], [3, 1], [7, 2], [15, 3]];
      else if (stepIndex === 9) activeStack = [[1, 0], [3, 1], [7, 2]];
      else if (stepIndex === 10) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 11) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 12) activeStack = [[1, 0], [3, 1], [11, 3]];
      else if (stepIndex === 13) activeStack = [[1, 0], [3, 1], [11, 3], [15, 2]];
      else if (stepIndex === 14) activeStack = [[1, 0], [3, 1], [11, 3], [15, 2]];
      else if (stepIndex === 15) activeStack = [[1, 0], [3, 1], [11, 3], [15, 2]];
      else if (stepIndex === 16) activeStack = [[1, 0], [3, 1], [11, 3]];
      else if (stepIndex === 17) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 18) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 19) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 20) activeStack = [[1, 0], [3, 1], [15, 3]];
      else if (stepIndex === 21) activeStack = [[1, 0], [3, 1], [15, 3]];
      else if (stepIndex === 22) activeStack = [[1, 0], [3, 1]];
      else if (stepIndex === 23) activeStack = [[1, 0]];
      else if (stepIndex === 24) activeStack = [[1, 0]];
      else if (stepIndex === 25) activeStack = [[1, 0], [5, 2]];
      else if (stepIndex === 26) activeStack = [[1, 0], [5, 2], [15, 3]];
      else if (stepIndex === 27) activeStack = [[1, 0], [5, 2]];
      else if (stepIndex === 28) activeStack = [[1, 0]];

      if (activeStack.length > 0) {
        const [maskVal, posVal] = activeStack[activeStack.length - 1];
        if (lineNum === 10 || lineNum === 11 || lineNum === 14 || lineNum === 18 || lineNum === 20 || lineNum === 21 || lineNum === 26) {
          return `mask: ${maskVal}, pos: ${posVal}`;
        }
      }
      return null;
    }
  }
};
