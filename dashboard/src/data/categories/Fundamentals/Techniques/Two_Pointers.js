export const data = {
  "presentation": "### Prezentare Generală\n\nDoi Pointeri (Two Pointers) este o tehnică fundamentală de optimizare aplicată adesea pe vectori sortați sau pentru probleme de ferestre glisante (Sliding Window).\n\nIdeea e simplă: în loc să folosim două loop-uri imbricate (O(N^2)) pentru a verifica toate perechile, folosim doi indecși (pointeri) - unul la început (left) și unul la final (right). Pe măsură ce analizăm suma sau relația dintre ei, mișcăm pointerii către interior până se întâlnesc.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N) unde N este mărimea vectorului. Se trece prin fiecare element cel mult o dată.\n- **Spațiu:** O(1) deoarece stocăm doar doi indecși (left și right).\n",
  "variations": "### Variații și Edge Cases\n\n1. Opposite Ends: Cel mai clasic (ex: Găsirea unei perechi ce are o anumită sumă în array sortat).\n2. Same Direction (Sliding Window / Fast & Slow): Un pointer e rapid, altul încet. Folosit pentru a găsi subsecvențe sau pentru a detecta cicluri într-o listă (Algoritmul iepurelui și broaștei).",
  "applications": "### Aplicații\n\n- Problema fundamentală Two Sum (când vectorul e sortat).\n- Validarea palindromurilor.\n- Container With Most Water (găsirea suprafeței maxime cu doi stâlpi).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> arr = {1, 3, 5, 8, 11, 15}; // Array SORTAT
    int target = 13;
    
    int L = 0;
    int R = arr.size() - 1;
    
    while(L < R) {
        int sum = arr[L] + arr[R];
        
        if (sum == target) {
            cout << "Gasit la indicii " << L << " si " << R << "
";
            break;
        } else if (sum < target) {
            L++; // Avem nevoie de o suma mai mare
        } else {
            R--; // Avem nevoie de o suma mai mica
        }
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Avem un array SORTAT: [1, 3, 5, 8, 11, 15] și căutăm o pereche cu suma țintă = 13. Tehnica Two Pointers funcționează doar pe arrays sortate.",
      "visual": "Array: [1, 3, 5, 8, 11, 15] | target = 13",
      "blocksVisual": [
        {
          "label": "Array sortat",
          "groups": [
            [
              { "val": "1" },
              { "val": "3" },
              { "val": "5" },
              { "val": "8" },
              { "val": "11" },
              { "val": "15" }
            ]
          ]
        },
        {
          "label": "Status",
          "groups": [
            [
              { "val": "Target = 13", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm pointerul L = 0 (valoarea 1, capătul stâng) și R = 5 (valoarea 15, capătul drept). Vom restrânge fereastra pas cu pas.",
      "visual": "L=0, R=5 | arr[L]=1, arr[R]=15 | target=13",
      "blocksVisual": [
        {
          "label": "Array — L=0, R=5",
          "groups": [
            [
              { "val": "1 ← L", "active": true },
              { "val": "3" },
              { "val": "5" },
              { "val": "8" },
              { "val": "11" },
              { "val": "15 ← R", "active": true }
            ]
          ]
        },
        {
          "label": "Status",
          "groups": [
            [
              { "val": "L=0  R=5", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm prima sumă: arr[L] + arr[R] = 1 + 15 = 16. Comparam cu targetul 13.",
      "visual": "L=0, R=5 | sum = 1+15 = 16 | target=13",
      "blocksVisual": [
        {
          "label": "Array — calculăm suma",
          "groups": [
            [
              { "val": "1 ← L", "active": true },
              { "val": "3" },
              { "val": "5" },
              { "val": "8" },
              { "val": "11" },
              { "val": "15 ← R", "active": true }
            ]
          ]
        },
        {
          "label": "Suma vs Target",
          "groups": [
            [
              { "val": "16 > 13", "active": true },
              { "val": "Prea Mare!" }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "16 > 13 → suma e prea mare. Deoarece array-ul e sortat, dacă mutăm R la stânga alegem o valoare mai mică, reducând suma. Executăm R--.",
      "visual": "L=0, R=5→4 | 16>13 → R--",
      "blocksVisual": [
        {
          "label": "Array — R-- (15 eliminat)",
          "groups": [
            [
              { "val": "1 ← L", "active": true },
              { "val": "3" },
              { "val": "5" },
              { "val": "8" },
              { "val": "11 ← R", "active": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Decizie",
          "groups": [
            [
              { "val": "R-- → R=4" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm noua sumă cu R mutat: arr[0] + arr[4] = 1 + 11 = 12.",
      "visual": "L=0, R=4 | sum = 1+11 = 12 | target=13",
      "blocksVisual": [
        {
          "label": "Array — L=0, R=4",
          "groups": [
            [
              { "val": "1 ← L", "active": true },
              { "val": "3" },
              { "val": "5" },
              { "val": "8" },
              { "val": "11 ← R", "active": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Suma vs Target",
          "groups": [
            [
              { "val": "12 < 13", "active": true },
              { "val": "Prea Mică!" }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "12 < 13 → suma e prea mică. Mutăm L la dreapta pentru a alege o valoare mai mare. Executăm L++.",
      "visual": "L=0→1, R=4 | 12<13 → L++",
      "blocksVisual": [
        {
          "label": "Array — L++ (1 eliminat)",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3 ← L", "active": true },
              { "val": "5" },
              { "val": "8" },
              { "val": "11 ← R", "active": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Decizie",
          "groups": [
            [
              { "val": "L++ → L=1" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm suma: arr[1] + arr[4] = 3 + 11 = 14. Comparăm din nou cu 13.",
      "visual": "L=1, R=4 | sum = 3+11 = 14 | target=13",
      "blocksVisual": [
        {
          "label": "Array — L=1, R=4",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3 ← L", "active": true },
              { "val": "5" },
              { "val": "8" },
              { "val": "11 ← R", "active": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Suma vs Target",
          "groups": [
            [
              { "val": "14 > 13", "active": true },
              { "val": "Prea Mare!" }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "14 > 13 → din nou prea mare. Mutăm R la stânga: R--.",
      "visual": "L=1, R=4→3 | 14>13 → R--",
      "blocksVisual": [
        {
          "label": "Array — R-- (11 eliminat)",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3 ← L", "active": true },
              { "val": "5" },
              { "val": "8 ← R", "active": true },
              { "val": "11", "hidden": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Decizie",
          "groups": [
            [
              { "val": "R-- → R=3" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm suma: arr[1] + arr[3] = 3 + 8 = 11. Comparam cu 13.",
      "visual": "L=1, R=3 | sum = 3+8 = 11 | target=13",
      "blocksVisual": [
        {
          "label": "Array — L=1, R=3",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3 ← L", "active": true },
              { "val": "5" },
              { "val": "8 ← R", "active": true },
              { "val": "11", "hidden": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Suma vs Target",
          "groups": [
            [
              { "val": "11 < 13", "active": true },
              { "val": "Prea Mică!" }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "11 < 13 → prea mică. Mutăm L la dreapta: L++.",
      "visual": "L=1→2, R=3 | 11<13 → L++",
      "blocksVisual": [
        {
          "label": "Array — L++ (3 eliminat)",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3", "hidden": true },
              { "val": "5 ← L", "active": true },
              { "val": "8 ← R", "active": true },
              { "val": "11", "hidden": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Decizie",
          "groups": [
            [
              { "val": "L++ → L=2" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm suma: arr[2] + arr[3] = 5 + 8 = 13. Exact targetul! Am găsit perechea!",
      "visual": "L=2, R=3 | sum = 5+8 = 13 = target → GĂSIT!",
      "blocksVisual": [
        {
          "label": "Array — PERECHE GĂSITĂ!",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3", "hidden": true },
              { "val": "5 ← L", "sorted": true },
              { "val": "8 ← R", "sorted": true },
              { "val": "11", "hidden": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Suma vs Target",
          "groups": [
            [
              { "val": "13 = 13 ✓", "sorted": true },
              { "val": "GĂSIT!", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Condiția sum == target este adevărată. Afișăm indicii L=2 și R=3, apoi executăm break pentru a ieși din buclă.",
      "visual": "break | Răspuns: indici 2 și 3, valori 5+8=13",
      "blocksVisual": [
        {
          "label": "Array — Rezultat final",
          "groups": [
            [
              { "val": "1", "hidden": true },
              { "val": "3", "hidden": true },
              { "val": "5 [idx=2]", "sorted": true },
              { "val": "8 [idx=3]", "sorted": true },
              { "val": "11", "hidden": true },
              { "val": "15", "hidden": true }
            ]
          ]
        },
        {
          "label": "Output",
          "groups": [
            [
              { "val": "Găsit la 2 și 3", "sorted": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Algoritmul Two Pointers a rezolvat problema în O(N) timp și O(1) spațiu. Am examinat doar 5 perechi, nu toate cele N²/2 = 15 perechi posibile ale unui brute-force.",
      "visual": "Complexitate: O(N) timp, O(1) spațiu | Pași: 5 iterații",
      "blocksVisual": [
        {
          "label": "Comparație",
          "groups": [
            [
              { "val": "Two Pointers: O(N)", "sorted": true },
              { "val": "Brute Force: O(N²)" }
            ]
          ]
        },
        {
          "label": "Iterații folosite",
          "groups": [
            [
              { "val": "5 din 15 posibile", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Two Sum II",
        "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        "desc": "Exact exemplul nostru"
      },
      {
        "title": "Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/",
        "desc": "Doi pointeri simpli"
      }
    ],
    "medium": [
      {
        "title": "Container With Most Water",
        "url": "https://leetcode.com/problems/container-with-most-water/",
        "desc": "Găsire maximă cu left/right"
      },
      {
        "title": "3Sum",
        "url": "https://leetcode.com/problems/3sum/",
        "desc": "Un loop + Two Pointers"
      }
    ],
    "hard": [
      {
        "title": "Trapping Rain Water",
        "url": "https://leetcode.com/problems/trapping-rain-water/",
        "desc": "Varianta O(1) space cu Two Pointers"
      }
    ]
  }
};
