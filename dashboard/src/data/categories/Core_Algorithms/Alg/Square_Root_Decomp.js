export const data = {
  "presentation": "### Prezentare Generală\n\nDescompunerea în radical (Square Root Decomposition) este o tehnică foarte flexibilă pentru a rezolva eficient probleme de interogări pe intervale (Range Queries).\n\nÎn loc să răspundem la interogări în $O(N)$ (naiv) sau $O(\\log N)$ cu Arbori de Intervale care sunt complex de implementat, SQRT Decomposition oferă o soluție elegantă de compromis $O(\\sqrt{N})$:\nÎmpărțim vectorul de $N$ elemente în bucăți (blocuri) de dimensiune $\\sqrt{N}$. Precalculăm răspunsul (suma, minimul, max) pentru fiecare bloc.\n\nCând vine o interogare pe un interval [L, R], acest interval va acoperi complet o serie de blocuri intermediare, și parțial cel mult două blocuri (la margini). Sumăm răspunsurile precalculate ale blocurilor complet acoperite, și iterăm element cu element pentru capetele parțiale.",
  "complexity": "### Complexitate\n\n- **Timp:** Creare/Precalculare: $O(N)$. Interogare: $O(\\sqrt{N})$ deoarece parcurgem cel mult $\\sqrt{N}$ elemente individuale la capete și cel mult $\\sqrt{N}$ blocuri întregi pe mijloc.\n- **Spațiu:** $O(\\sqrt{N})$ pentru a reține răspunsul pe blocuri.\n",
  "variations": "### Variații și Edge Cases\n\n1. Point Update: Actualizarea unei valori necesită doar actualizarea blocului din care face parte în $O(1)$.\n2. Range Update: Se pot folosi 'lazy tags' pe blocuri întregi, similar segment trees.",
  "applications": "### Aplicații\n\nOrice fel de Range Queries pe care nu știm sau ne e greu să le modelăm cu Segment Trees. Unele funcții care nu sunt asociative (ex: Mode / Culoare dominantă) pot fi rezolvate mult mai ușor cu blocuri.",
  code: `
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int blockSize;
vector<int> b; // vectorul de blocuri

void preprocess(var vector<int>& input) {
    int n = input.size();
    blockSize = sqrt(n);
    // rotunjire in sus pentru ultimul bloc
    b.assign((n + blockSize - 1) / blockSize, 0); 
    
    for (int i = 0; i < n; i++) {
        b[i / blockSize] += input[i];
    }
}

// Update la pozitia 'idx' cu valoarea 'val' (adaugare)
void update(vector<int>& input, int idx, int val) {
    int blockNumber = idx / blockSize;
    b[blockNumber] += val - input[idx];
    input[idx] = val;
}

// Query pe intervalul [l, r]
int query(var vector<int>& input, int l, int r) {
    int sum = 0;
    int c_l = l / blockSize;
    int c_r = r / blockSize;
    
    if (c_l == c_r) {
        // Cazul in care intervalul e pe un singur bloc
        for (int i = l; i <= r; i++) sum += input[i];
    } else {
        // Capatul stang (partial)
        for (int i = l, end = (c_l + 1) * blockSize - 1; i <= end; i++) sum += input[i];
        
        // Blocurile intermediare complete
        for (int i = c_l + 1; i <= c_r - 1; i++) sum += b[i];
        
        // Capatul drept (partial)
        for (int i = c_r * blockSize; i <= r; i++) sum += input[i];
    }
    return sum;
}
`,
  "explanations": [
    {
      "line": 11,
      "text": "Avem N = 9 elemente. Dimensiunea blocului va fi sqrt(9) = 3.",
      "blocksVisual": [
        {
          "label": "Input",
          "groups": [
            [
              {
                "val": "2"
              },
              {
                "val": "1"
              },
              {
                "val": "3"
              },
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "8"
              },
              {
                "val": "9"
              },
              {
                "val": "2"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Precalculăm sumele. Bloc 0 va avea suma primelor 3 elemente, Bloc 1 suma următoarelor 3, etc.",
      "blocksVisual": [
        {
          "label": "Blocuri",
          "groups": [
            [
              {
                "val": "B0: 6",
                "active": true
              }
            ],
            [
              {
                "val": "B1: 17",
                "active": true
              }
            ],
            [
              {
                "val": "B2: 11",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Vine un Query de Sumă pe [1, 7]. Acoperă parțial B0, B1 total, și parțial B2.",
      "blocksVisual": [
        {
          "label": "Query",
          "groups": [
            [
              {
                "val": "L=1"
              }
            ],
            [
              {
                "val": "R=7"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 39,
      "text": "Capatul stâng (L=1). Face parte din B0 (care are indecșii 0..2). Parcurgem de la index 1 la marginea blocului 2. Adunăm input[1] + input[2].",
      "blocksVisual": [
        {
          "label": "Left partial",
          "groups": [
            [
              {
                "val": "A[1]=1",
                "active": true
              },
              {
                "val": "A[2]=3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 42,
      "text": "Partea din mijloc. B1 este complet inclus in interval! Nu iterăm prin 3 elemente, ci doar luăm B1 direct (Suma 17).",
      "blocksVisual": [
        {
          "label": "Middle block",
          "groups": [
            [
              {
                "val": "B1 = 17",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 45,
      "text": "Capatul drept (R=7). Face parte din B2 (indecși 6..8). Iterăm de la începutul blocului (index 6) până la R=7. Adunăm input[6] + input[7].",
      "blocksVisual": [
        {
          "label": "Right partial",
          "groups": [
            [
              {
                "val": "A[6]=9",
                "active": true
              },
              {
                "val": "A[7]=2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 47,
      "text": "Suma = 4 (stânga) + 17 (mijloc) + 11 (dreapta) = 32.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "Suma = 32",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Dacă facem Update la index 4 cu +2, adăugăm 2 pur și simplu în B1. Blocul e mereu corect. O(1) timp!",
      "blocksVisual": [
        {
          "label": "Update",
          "groups": [
            [
              {
                "val": "B1 devine 19"
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
        "title": "Range Sum Query",
        "url": "https://leetcode.com/problems/range-sum-query-mutable/",
        "desc": "Clasica RSQ"
      }
    ],
    "medium": [
      {
        "title": "Arbori de intervale",
        "url": "https://www.pbinfo.ro/probleme/2096/arbori-de-intervale",
        "desc": "Se pot face cu Sqrt!"
      }
    ],
    "hard": [
      {
        "title": "Holes",
        "url": "https://codeforces.com/contest/13/problem/E",
        "desc": "Sarături din bloc în bloc pe CF"
      }
    ]
  }
};
