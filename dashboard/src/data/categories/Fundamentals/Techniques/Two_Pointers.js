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
      "text": "Avem un array SORTAT [1, 3, 5, 8, 11, 15] și căutăm o pereche cu suma 13.",
      "blocksVisual": [
        {
          "label": "Inițial",
          "groups": [
            [
              {
                "val": 1
              },
              {
                "val": 3
              },
              {
                "val": 5
              },
              {
                "val": 8
              },
              {
                "val": 11
              },
              {
                "val": 15
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Plasăm pointerul L la început (valoarea 1) și R la final (valoarea 15).",
      "blocksVisual": [
        {
          "label": "Pointeri L și R",
          "groups": [
            [
              {
                "val": "1 (L)",
                "active": true
              },
              {
                "val": 3
              },
              {
                "val": 5
              },
              {
                "val": 8
              },
              {
                "val": 11
              },
              {
                "val": "15 (R)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm suma curenților: 1 + 15 = 16. Suma noastră este 16, dar targetul e 13.",
      "blocksVisual": [
        {
          "label": "Sum = 16",
          "groups": [
            [
              {
                "val": "16",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Deoarece 16 > target (13) și șirul e crescător, trebuie să reducem suma. Pentru a face asta, mutăm R la stânga (R--).",
      "blocksVisual": [
        {
          "label": "Prea Mare (Mutăm R)",
          "groups": [
            [
              {
                "val": "1 (L)",
                "active": true
              },
              {
                "val": 3
              },
              {
                "val": 5
              },
              {
                "val": 8
              },
              {
                "val": "11 (R)",
                "active": true
              },
              {
                "val": "15",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Noua sumă calculată: 1 + 11 = 12.",
      "blocksVisual": [
        {
          "label": "Sum = 12",
          "groups": [
            [
              {
                "val": "12",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "12 < target (13). Suma e prea mică. Trebuie să mărim suma, așa că mutăm L la dreapta (L++).",
      "blocksVisual": [
        {
          "label": "Prea Mică (Mutăm L)",
          "groups": [
            [
              {
                "val": "1",
                "hidden": true
              },
              {
                "val": "3 (L)",
                "active": true
              },
              {
                "val": 5
              },
              {
                "val": 8
              },
              {
                "val": "11 (R)",
                "active": true
              },
              {
                "val": "15",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Noua sumă calculată: 3 + 11 = 14.",
      "blocksVisual": [
        {
          "label": "Sum = 14",
          "groups": [
            [
              {
                "val": "14",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "14 > 13. Din nou e prea mare. Mutăm R la stânga (R--).",
      "blocksVisual": [
        {
          "label": "Mutăm R",
          "groups": [
            [
              {
                "val": "1",
                "hidden": true
              },
              {
                "val": "3 (L)",
                "active": true
              },
              {
                "val": 5
              },
              {
                "val": "8 (R)",
                "active": true
              },
              {
                "val": "11",
                "hidden": true
              },
              {
                "val": "15",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Noua sumă calculată: 3 + 8 = 11.",
      "blocksVisual": [
        {
          "label": "Sum = 11",
          "groups": [
            [
              {
                "val": "11",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "11 < 13. Prea mică. Mutăm L la dreapta (L++).",
      "blocksVisual": [
        {
          "label": "Mutăm L",
          "groups": [
            [
              {
                "val": "1",
                "hidden": true
              },
              {
                "val": "3",
                "hidden": true
              },
              {
                "val": "5 (L)",
                "active": true
              },
              {
                "val": "8 (R)",
                "active": true
              },
              {
                "val": "11",
                "hidden": true
              },
              {
                "val": "15",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Suma curentă: 5 + 8 = 13. EXACT ce ne trebuia!",
      "blocksVisual": [
        {
          "label": "SUCCES!",
          "groups": [
            [
              {
                "val": "5 (L)",
                "sorted": true
              },
              {
                "val": "8 (R)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Am găsit soluția în timp liniar O(N) fără a face două bucle imbricate (care ar fi durat mult mai mult). Oprim execuția (break).",
      "blocksVisual": [
        {
          "label": "Răspuns Găsit",
          "groups": [
            [
              {
                "val": "Suma 13 găsită",
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
