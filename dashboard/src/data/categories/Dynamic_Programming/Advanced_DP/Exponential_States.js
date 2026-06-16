export const data = {
  "presentation": "### Prezentare Generală\n\nDP pe stări exponențiale (Bitmask DP) folosește măști de biți (reprezentând numere întregi) pentru a reprezenta seturi de obiecte (prezent/absent).\n\nExemplu: dacă avem N=5 obiecte, numărul binar 10110 reprezintă starea în care elementele de pe pozițiile 1, 2 și 4 (0-indexed) sunt 'marcate' / 'vizitate'. Deoarece putem reprezenta 2^N stări, este viabil doar pentru N mic (N ≤ 20).\n\nProblema clasică este Travelling Salesperson Problem (TSP): vizitarea tuturor celor N orașe cu cost minim.\n- Starea: dp[mask][i] = costul minim de a vizita un set de orașe reprezentat de 'mask', terminând în orașul 'i'.",
  "complexity": "### Complexitate\n\n- **Timp:** O(2^N * N^2) pentru TSP. Mult mai bine decât generarea completă O(N!).\n- **Spațiu:** O(2^N * N) pentru stocarea tabelei dp.\n",
  "variations": "### Variații și Edge Cases\n\n1. SOS DP (Sum Over Subsets) - O(N * 2^N) în loc de 3^N pentru subseturi.\n2. DP de Acoperire a Grilei cu Profile (Profile DP) - folosind bitmasks pe lățimea grilei.",
  "applications": "### Aplicații\n\nProbleme de rutare optime unde N e mic, puzzle-uri logice complexe de alocare a resurselor cu restricții încrucișate.",

  code: `
#include <iostream>
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
      "line": 11,
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
      "line": 11,
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
      "line": 11,
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
      "line": 11,
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
  }
};
