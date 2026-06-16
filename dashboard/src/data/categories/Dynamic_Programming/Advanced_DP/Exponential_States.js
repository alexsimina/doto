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

var int INF = 1e9;

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
    cout << "Cost minim TSP: " << tsp(1, 0, n, dist, dp) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 38,
      "text": "Pornim cu masca 1 (doar orașul 0 vizitat: 0001 în binar) de la orașul curent 0.",
      "blocksVisual": [
        {
          "label": "Start",
          "groups": [
            [
              {
                "val": "Mask: 0001",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Generăm opțiuni din orașul 0: orașul 1, 2 sau 3.",
      "blocksVisual": [
        {
          "label": "Opțiuni pt 0",
          "groups": [
            [
              {
                "val": "Next: 1, 2, 3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Pentru orașul 1, verificăm (0001 & 0010) == 0. Adevărat. Facem OR (|): Mask devine 0011. Noul pos = 1.",
      "blocksVisual": [
        {
          "label": "Mergem la 1",
          "groups": [
            [
              {
                "val": "Mask: 0011",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Apelăm recursiv cu (0011, oraș 1) și adăugăm costul dist[0][1] = 20.",
      "blocksVisual": [
        {
          "label": "Cost curent 20",
          "groups": [
            [
              {
                "val": "+20"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "La cel mai adânc nivel, când mask = 1111 (toate vizitate), returnăm dist[ultimul][0].",
      "blocksVisual": [
        {
          "label": "Baza TSP",
          "groups": [
            [
              {
                "val": "Return to 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "DP memoizează subprobleme. O maskă de 0111 cu pos 2 înseamnă că am vizitat aceleași orașe terminând în 2, indiferent de ordinea orașelor vizitate anterior!",
      "blocksVisual": [
        {
          "label": "Memo Key",
          "groups": [
            [
              {
                "val": "Memoizarea e magia!"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Rezultatul final calculează min(20+..., 42+..., 25+...) întorcând drumul optim: 0 -> 1 -> 2 -> 3 -> 0.",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Total = 85",
                "sorted": true
              }
            ]
          ]
        }
      ]
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
