export const data = {
  "presentation": "Căutarea Binară (Binary Search) este un algoritm extrem de eficient pentru găsirea unui element într-un șir **sortat**.\n\n### Principiul de Funcționare\n\nPrincipiul de bază este simplu: comparăm valoarea căutată cu elementul din mijlocul șirului.\n- Dacă sunt egale, am găsit elementul!\n- Dacă valoarea căutată este **mai mică**, înseamnă că ea se poate afla doar în prima jumătate a șirului.\n- Dacă este **mai mare**, se află cu siguranță în a doua jumătate.\n\n> Imaginează-ți că deschizi un dicționar pentru a căuta cuvântul 'Programare'. Nu citești fiecare pagină, ci deschizi la jumătate. Ignori jumătatea irelevantă și continui înjumătățirea.\n\nIată un exemplu de declarare a unui vector:\n```cpp\nvector<int> arr = {1, 3, 5, 7, 9};\n```",
  "complexity": "### Complexitate de Timp\n\n- **Cazul Favorabil:** `O(1)` (găsim elementul chiar la mijloc)\n- **Cazul Mediu / Defavorabil:** `O(log N)`. \n\nLa fiecare pas, numărul de elemente analizate se reduce la jumătate. Chiar și pentru un miliard de elemente (10^9), algoritmul are nevoie de cel mult 30 de pași!\n\n### Complexitate Spațială\n\n- `O(1)` pentru varianta iterativă (folosește doar pointerii `left` și `right`).\n- `O(log N)` pentru varianta recursivă, datorită spațiului alocat pe *Call Stack*.",
  "variations": "### Variante Populare\n\n1. **Lower Bound / Upper Bound**: Găsim prima valoare mai mare sau egală (`lower_bound`) sau strict mai mare (`upper_bound`).\n2. **Căutarea Binară pe Răspuns** (Binary Search on Answer): O tehnică avansată unde nu căutăm într-un array, ci într-un interval de valori posibile ale răspunsului.\n\nPentru a folosi varianta din C++, apelezi `std::binary_search(arr.begin(), arr.end(), target)` din librăria `<algorithm>`.",
  "applications": "### Aplicații\n\nCăutarea binară este o tehnică foarte versatilă cu numeroase aplicații practice:\n\n- Optimizări în care trebuie să găsești o soluție optimă ('minimizați maximul' sau 'maximizați minimul').\n- Rezolvarea ecuațiilor matematice monotone (ex: găsirea rădăcinilor pătrate sau cubice cu precizie).\n- Interogări rapide pe structuri de date sortate și arbori de căutare.\n\nAflă mai multe din documentația oficială despre [Binary Search pe C++ Reference](https://en.cppreference.com/w/cpp/algorithm/binary_search).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int binarySearch(var vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Element gasit
        }
        
        if (arr[mid] < target) {
            left = mid + 1; // Cautam in dreapta
        } else {
            right = mid - 1; // Cautam in stanga
        }
    }
    
    return -1; // Elementul nu exista
}

int main() {
    vector<int> arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    
    int result = binarySearch(arr, target);
    
    if (result != -1) {
        cout << "Elementul " << target << " a fost gasit la indexul: " << result << "
";
    } else {
        cout << "Elementul " << target << " nu a fost gasit.
";
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Setăm limitele inițiale: `left` la primul element și `right` la ultimul.",
      "blocksVisual": [
        {
          "label": "Inițializare",
          "groups": [
            [
              {
                "val": 2,
                "active": true
              },
              {
                "val": 5
              },
              {
                "val": 8
              },
              {
                "val": 12
              },
              {
                "val": 16
              },
              {
                "val": 23
              },
              {
                "val": 38
              },
              {
                "val": 56
              },
              {
                "val": 72
              },
              {
                "val": 91,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Cât timp intervalul este valid (left nu a depășit right), continuăm căutarea."
    },
    {
      "line": 11,
      "text": "Calculăm mijlocul. Folosim formula `left + (right - left) / 2` pentru a preveni overflow-ul dacă left și right sunt foarte mari.",
      "blocksVisual": [
        {
          "label": "Mijloc (mid = 4)",
          "groups": [
            [
              {
                "val": 2,
                "active": true
              },
              {
                "val": 5
              },
              {
                "val": 8
              },
              {
                "val": 12
              },
              {
                "val": 16,
                "sorted": true
              },
              {
                "val": 23
              },
              {
                "val": 38
              },
              {
                "val": 56
              },
              {
                "val": 72
              },
              {
                "val": 91,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă am găsit elementul. (16 == 23) este Fals."
    },
    {
      "line": 17,
      "text": "Elementul din mijloc (16) este mai mic decât target-ul (23). Astfel, știm sigur că 23 se află în dreapta lui 16. Mutăm `left` la `mid + 1`."
    },
    {
      "line": 18,
      "text": "Noul interval devine [23, 38, 56, 72, 91].",
      "blocksVisual": [
        {
          "label": "Actualizare Left",
          "groups": [
            [
              {
                "val": 2,
                "hidden": true
              },
              {
                "val": 5,
                "hidden": true
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 12,
                "hidden": true
              },
              {
                "val": 16,
                "hidden": true
              },
              {
                "val": 23,
                "active": true
              },
              {
                "val": 38
              },
              {
                "val": 56
              },
              {
                "val": 72
              },
              {
                "val": 91,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Reluăm bucla cu noul interval."
    },
    {
      "line": 11,
      "text": "Calculăm noul mijloc: left=5, right=9. `mid = 5 + (9 - 5)/2 = 7` (valoarea 56).",
      "blocksVisual": [
        {
          "label": "Nou Mijloc (mid = 7)",
          "groups": [
            [
              {
                "val": 2,
                "hidden": true
              },
              {
                "val": 5,
                "hidden": true
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 12,
                "hidden": true
              },
              {
                "val": 16,
                "hidden": true
              },
              {
                "val": 23,
                "active": true
              },
              {
                "val": 38
              },
              {
                "val": 56,
                "sorted": true
              },
              {
                "val": 72
              },
              {
                "val": 91,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă (56 == 23). Fals."
    },
    {
      "line": 17,
      "text": "Acum 56 este mai MARE decât 23. Astfel, 23 se află în stânga lui 56. Mutăm `right` la `mid - 1`."
    },
    {
      "line": 20,
      "text": "Noul interval devine [23, 38].",
      "blocksVisual": [
        {
          "label": "Actualizare Right",
          "groups": [
            [
              {
                "val": 2,
                "hidden": true
              },
              {
                "val": 5,
                "hidden": true
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 12,
                "hidden": true
              },
              {
                "val": 16,
                "hidden": true
              },
              {
                "val": 23,
                "active": true
              },
              {
                "val": 38,
                "active": true
              },
              {
                "val": 56,
                "hidden": true
              },
              {
                "val": 72,
                "hidden": true
              },
              {
                "val": 91,
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Reluăm bucla."
    },
    {
      "line": 11,
      "text": "Calculăm noul mijloc: left=5, right=6. `mid = 5 + (6 - 5)/2 = 5` (valoarea 23).",
      "blocksVisual": [
        {
          "label": "Nou Mijloc (mid = 5)",
          "groups": [
            [
              {
                "val": 2,
                "hidden": true
              },
              {
                "val": 5,
                "hidden": true
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 12,
                "hidden": true
              },
              {
                "val": 16,
                "hidden": true
              },
              {
                "val": 23,
                "sorted": true
              },
              {
                "val": 38,
                "active": true
              },
              {
                "val": 56,
                "hidden": true
              },
              {
                "val": 72,
                "hidden": true
              },
              {
                "val": 91,
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm (23 == 23). ADEVĂRAT! Am găsit elementul."
    },
    {
      "line": 14,
      "text": "Returnăm indexul 5.",
      "blocksVisual": [
        {
          "label": "FINAL - Succes!",
          "groups": [
            [
              {
                "val": 23,
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
        "title": "Binary Search",
        "url": "https://leetcode.com/problems/binary-search/",
        "desc": "Standard BS"
      },
      {
        "title": "First Bad Version",
        "url": "https://leetcode.com/problems/first-bad-version/",
        "desc": "Lower Bound practic"
      }
    ],
    "medium": [
      {
        "title": "Search in Rotated Array",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        "desc": "Array rotit"
      },
      {
        "title": "Koko Eating Bananas",
        "url": "https://leetcode.com/problems/koko-eating-bananas/",
        "desc": "Căutare pe Răspuns"
      },
      {
        "title": "Tăieturi M",
        "url": "https://www.pbinfo.ro/probleme/1149/taieturi-m",
        "desc": "Problema cu cherestea"
      }
    ],
    "hard": [
      {
        "title": "Median of Two Sorted Arrays",
        "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        "desc": "O(log(min(m,n))) BS complex"
      },
      {
        "title": "Split Array Largest Sum",
        "url": "https://leetcode.com/problems/split-array-largest-sum/",
        "desc": "Minimizați maximul (BS + Greedy)"
      }
    ]
  }
};
