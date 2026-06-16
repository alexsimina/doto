export const data = {
  "presentation": "### Prezentare Generală\n\nQuick Sort este probabil cel mai faimos algoritm de sortare practic (de unde și cuvântul 'Quick'). Deși asimptotic (pe hârtie) Worst-Case-ul lui este mai slab decât al Merge Sort, în realitate, cu mici optimizări (ca alegerea randomizată a pivotului), bate majoritatea algoritmilor de sortare!\n\nIdeea sa este să aleagă un element numit 'Pivot' și să 'partiționeze' șirul: toate elementele mai mici decât pivotul merg în stânga sa, și toate cele mai mari merg în dreapta sa. După acest proces, știm clar că Pivotul este la poziția sa finală! Apoi, aplicăm recursiv Quick Sort pe partea stângă și pe partea dreaptă.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N log N) în caz mediu (Average Case) și optim. O(N^2) în cel mai rău caz (Worst Case), care apare când vectorul este deja sortat și alegem sistematic primul sau ultimul element ca pivot. Randomizarea pivotului elimină practic șansa unui O(N^2).\n- **Spațiu:** O(1) memorie auxiliară (sortează 'in-place'). Pe stiva de apeluri folosește O(log N) spațiu.\n",
  "variations": "### Variații și Edge Cases\n\n1. Randomized Quick Sort: Algoritmul standard folosește un rand() pentru a alege pivotul, anulând vulnerabilitățile worst-case.\n2. Quick Select (K-th Element): Putem afla al K-lea cel mai mic element în O(N) folosind logica de partiționare a Quick Sort, fără să sortăm integral vectorul (căutăm doar în stânga sau în dreapta pivotului!).\n3. 3-Way Quick Sort (Dijkstra 3-way partitioning): Optim pentru vectori cu extrem de multe duplicate (grupează '<, ==, >').",
  "applications": "### Aplicații\n\nFuncția qsort() din C și funcțiile similare din alte limbaje s-au bazat decenii la rând pe acest algoritm. Reprezintă de asemenea soluția standard când ai memorie RAM extrem de strictă și Merge Sort e inacceptabil din cauza O(N) aux space.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1);
  
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, arr.size() - 1);
    cout << "Array sortat cu Quick Sort: ";
    for(int x : arr) cout << x << " ";
    cout << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 31,
      "text": "Avem vectorul nesortat [10, 7, 8, 9, 1, 5].",
      "blocksVisual": [
        {
          "label": "Inițial",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 7
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 1
              },
              {
                "val": 5
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Apelăm quickSort pentru întreg intervalul (low=0, high=5).",
      "blocksVisual": [
        {
          "label": "Apel initial",
          "groups": [
            [
              {
                "val": 10,
                "active": true
              },
              {
                "val": 7,
                "active": true
              },
              {
                "val": 8,
                "active": true
              },
              {
                "val": 9,
                "active": true
              },
              {
                "val": 1,
                "active": true
              },
              {
                "val": 5,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Aflăm poziția pivotului apelând funcția partition.",
      "blocksVisual": [
        {
          "label": "Partiționare curentă",
          "groups": [
            [
              {
                "val": 10,
                "active": true
              },
              {
                "val": 7,
                "active": true
              },
              {
                "val": 8,
                "active": true
              },
              {
                "val": 9,
                "active": true
              },
              {
                "val": 1,
                "active": true
              },
              {
                "val": 5,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "La prima partiționare, Pivotul devine ultimul element: 5.",
      "blocksVisual": [
        {
          "label": "Pivot = 5",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 7
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 1
              },
              {
                "val": 5,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Iterăm prin vector. 10 > 5, 7 > 5, 8 > 5, 9 > 5. Niciun swap până la 1.",
      "blocksVisual": [
        {
          "label": "Căutare mai mici",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 7
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 1,
                "active": true
              },
              {
                "val": 5,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Găsim 1 < 5. Îl aducem la început (swap cu arr[i+1], adică cu 10).",
      "blocksVisual": [
        {
          "label": "Swap 1 cu 10",
          "groups": [
            [
              {
                "val": 1
              },
              {
                "val": 7
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 10
              },
              {
                "val": 5,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Aducem pivotul (5) la locul său corect (după 1). Facem swap între 7 (prima valoare mai mare) și 5.",
      "blocksVisual": [
        {
          "label": "Fixare Pivot",
          "groups": [
            [
              {
                "val": 1
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 10
              },
              {
                "val": 7
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Aplicăm quickSort recursiv pe jumătatea stângă [1] (low=0, high=0). Condiția low < high e falsă, deci rămâne pe loc.",
      "blocksVisual": [
        {
          "label": "Stânga (Sortat)",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 10
              },
              {
                "val": 7
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Aplicăm quickSort pe jumătatea dreaptă (low=2, high=5). Intervalul este [8, 9, 10, 7].",
      "blocksVisual": [
        {
          "label": "Partea Dreaptă",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 8,
                "active": true
              },
              {
                "val": 9,
                "active": true
              },
              {
                "val": 10,
                "active": true
              },
              {
                "val": 7,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Partiționăm [8, 9, 10, 7]. Pivotul devine ultimul element: 7.",
      "blocksVisual": [
        {
          "label": "Pivot = 7",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 10
              },
              {
                "val": 7,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Toate elementele (8, 9, 10) sunt > 7. Niciun swap în buclă.",
      "blocksVisual": [
        {
          "label": "Căutare",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 10
              },
              {
                "val": 7,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Punem pivotul (7) la locul lui, la începutul intervalului (swap 8 cu 7). Vectorul devine [7, 9, 10, 8].",
      "blocksVisual": [
        {
          "label": "Fixare Pivot 7",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
                "sorted": true
              },
              {
                "val": 9
              },
              {
                "val": 10
              },
              {
                "val": 8
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Aplicăm quickSort la dreapta lui 7. Interval: [9, 10, 8] (low=3, high=5).",
      "blocksVisual": [
        {
          "label": "Partea Dreaptă",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
                "sorted": true
              },
              {
                "val": 9,
                "active": true
              },
              {
                "val": 10,
                "active": true
              },
              {
                "val": 8,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Partiționăm [9, 10, 8]. Pivotul este 8. Atât 9 cât și 10 sunt mai mari ca 8. Swap 8 cu 9. Vector: [8, 10, 9].",
      "blocksVisual": [
        {
          "label": "Pivot 8 fixat",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
                "sorted": true
              },
              {
                "val": 8,
                "sorted": true
              },
              {
                "val": 10
              },
              {
                "val": 9
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Aplicăm quickSort la dreapta lui 8. Interval: [10, 9] (low=4, high=5).",
      "blocksVisual": [
        {
          "label": "Partea Dreaptă",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
                "sorted": true
              },
              {
                "val": 8,
                "sorted": true
              },
              {
                "val": 10,
                "active": true
              },
              {
                "val": 9,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Partiționăm [10, 9]. Pivotul e 9. 10 > 9. Swap 10 cu 9. Vector: [9, 10].",
      "blocksVisual": [
        {
          "label": "Pivot 9 fixat",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
                "sorted": true
              },
              {
                "val": 8,
                "sorted": true
              },
              {
                "val": 9,
                "sorted": true
              },
              {
                "val": 10
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "La final, elementul 10 rămâne singur. Este automat considerat sortat.",
      "blocksVisual": [
        {
          "label": "Finalizat!",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
                "sorted": true
              },
              {
                "val": 8,
                "sorted": true
              },
              {
                "val": 9,
                "sorted": true
              },
              {
                "val": 10,
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
        "title": "Sort an Array",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "desc": "Folosind Quick Sort"
      }
    ],
    "medium": [
      {
        "title": "Kth Largest Element",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "desc": "Quick Select, optim O(N)"
      },
      {
        "title": "Sort Colors (0 1 2)",
        "url": "https://leetcode.com/problems/sort-colors/",
        "desc": "3-Way Partitioning/Dutch Flag"
      }
    ],
    "hard": [
      {
        "title": "Median of Array (O(N))",
        "url": "https://www.infoarena.ro/problema/sdo",
        "desc": "Selecție de ordine"
      }
    ]
  }
};
