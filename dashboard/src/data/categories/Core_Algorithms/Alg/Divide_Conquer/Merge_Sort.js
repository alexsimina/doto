export const data = {
  "presentation": "### Prezentare Generală\n\nMerge Sort este un algoritm de sortare clasic și foarte eficient, bazat pe Divide et Impera. Se bazează pe o idee extrem de elegantă: e foarte ușor să unești (interclasezi) două șiruri deja sortate într-unul singur, tot sortat.\n\nLogica principală: înjumătățim constant șirul până ajungem la elemente individuale (care, fiind singure, sunt implicit 'sortate'). Apoi le combinăm înapoi două câte două, menținând ordinea la fiecare pas.\n\nCaracteristica sa de bază este stabilitatea. Un algoritm stabil garantează că elementele cu valori egale își păstrează ordinea relativă inițială după sortare (esențial când sortezi obiecte după atribute multiple).",
  "complexity": "### Complexitate\n\n- **Timp:** O(N log N) în orice caz (Best, Average, Worst). E garantat să nu degenereze în O(N^2) precum Quick Sort.\n- **Spațiu:** O(N) memorie auxiliară. Acesta este marele dezavantaj al Merge Sort – necesită vectori auxiliari pentru interclasare.\n",
  "variations": "### Variații și Edge Cases\n\n1. Inversion Count (Numărarea inversiunilor): Cea mai populară aplicație a algoritmului.\n2. Bottom-up Merge Sort: Fără recursivitate, unește direct perechi de lungime 1, apoi 2, 4 etc.",
  "applications": "### Aplicații\n\nMerge Sort este algoritmul preferat pentru structurile de date Linked Lists, unde inserarea la mijloc se face în O(1) și nu avem nevoie de un vector auxiliar suplimentar masiv.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
        
    int mid = left + (right - left) / 2;
    
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    merge(arr, left, mid, right);
}

int main() {
    vector<int> arr = {38, 27, 43, 3};
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Array sortat: ";
    for(int x : arr) cout << x << " ";
    cout << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 43,
      "text": "Începem cu un vector inițial neordonat.",
      "blocksVisual": [
        {
          "label": "Vector Inițial",
          "groups": [
            [
              {
                "val": 38
              },
              {
                "val": 27
              },
              {
                "val": 43
              },
              {
                "val": 3
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Apelăm mergeSort pentru întreg vectorul (left=0, right=3).",
      "blocksVisual": [
        {
          "label": "Vector Inițial",
          "groups": [
            [
              {
                "val": 38,
                "active": true
              },
              {
                "val": 27,
                "active": true
              },
              {
                "val": 43,
                "active": true
              },
              {
                "val": 3,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Etapa DIVIDE: Calculăm mijlocul pentru a împărți problema în două.",
      "blocksVisual": [
        {
          "label": "Împărțire în două jumătăți",
          "groups": [
            [
              {
                "val": 38,
                "active": true
              },
              {
                "val": 27,
                "active": true
              }
            ],
            [
              {
                "val": 43
              },
              {
                "val": 3
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Etapa CONQUER: Apelăm recursiv mergeSort pentru jumătatea din stânga.",
      "blocksVisual": [
        {
          "label": "Jumătatea stângă (Apel curent)",
          "groups": [
            [
              {
                "val": 38,
                "active": true
              },
              {
                "val": 27,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Jumătatea dreaptă (În așteptare)",
          "groups": [
            [
              {
                "val": 43,
                "hidden": true
              },
              {
                "val": 3,
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Împărțim din nou jumătatea stângă.",
      "blocksVisual": [
        {
          "label": "Divide - stânga",
          "groups": [
            [
              {
                "val": 38,
                "active": true
              }
            ],
            [
              {
                "val": 27,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Cazul de bază: Elementele ajung să fie singure [38] și [27]. Ele nu mai pot fi împărțite și se consideră sortate.",
      "blocksVisual": [
        {
          "label": "Elemente singure (Sortate default)",
          "groups": [
            [
              {
                "val": 38,
                "sorted": true
              }
            ],
            [
              {
                "val": 27,
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 40,
      "text": "Etapa COMBINE: Apelăm funcția merge pentru a interclasa [38] și [27].",
      "blocksVisual": [
        {
          "label": "L (Stânga)",
          "groups": [
            [
              {
                "val": 38,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "R (Dreapta)",
          "groups": [
            [
              {
                "val": 27,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Vector destinație temporar",
          "groups": [
            [
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Comparăm elementele (38 cu 27). Punem elementul mai mic primul.",
      "blocksVisual": [
        {
          "label": "L",
          "groups": [
            [
              {
                "val": 38,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "R",
          "groups": [
            [
              {
                "val": 27,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Rezultat (27 < 38)",
          "groups": [
            [
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 27,
      "text": "Copiem restul elementelor (în acest caz 38) dacă un vector se termină.",
      "blocksVisual": [
        {
          "label": "L (rămas)",
          "groups": [
            [
              {
                "val": 38,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Sfertul stâng interclasat complet",
          "groups": [
            [
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": 38,
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 38,
      "text": "Acum că jumătatea stângă originală e sortată [27, 38], aplicăm aceeași recursivitate pentru jumătatea din dreapta [43, 3].",
      "blocksVisual": [
        {
          "label": "Stânga (Gata)",
          "groups": [
            [
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": 38,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Dreapta (Urmează)",
          "groups": [
            [
              {
                "val": 43,
                "active": true
              },
              {
                "val": 3,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Împărțim jumătatea dreaptă.",
      "blocksVisual": [
        {
          "label": "Divide - dreapta",
          "groups": [
            [
              {
                "val": 43,
                "active": true
              }
            ],
            [
              {
                "val": 3,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Și le interclasăm similar pe [43] și [3]. 3 este mai mic.",
      "blocksVisual": [
        {
          "label": "L",
          "groups": [
            [
              {
                "val": 43,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "R",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Sfertul drept interclasat (3 < 43)",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 43,
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 40,
      "text": "Finalul etapei COMBINE pentru tot vectorul: Apelăm funcția merge pentru cele două jumătăți mari (care acum sunt sortate).",
      "blocksVisual": [
        {
          "label": "Jumătatea Stângă",
          "groups": [
            [
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": 38,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Jumătatea Dreaptă",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 43,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Array destinație general",
          "groups": [
            [
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Comparăm primul din L (27) cu primul din R (3).",
      "blocksVisual": [
        {
          "label": "L",
          "groups": [
            [
              {
                "val": 27,
                "active": true
              },
              {
                "val": 38,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "R",
          "groups": [
            [
              {
                "val": 3,
                "active": true
              },
              {
                "val": 43,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "Alegem 3",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Avansează R. Comparăm (27) cu următorul din R (43).",
      "blocksVisual": [
        {
          "label": "L",
          "groups": [
            [
              {
                "val": 27,
                "active": true
              },
              {
                "val": 38,
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "R",
          "groups": [
            [
              {
                "val": 3,
                "hidden": true
              },
              {
                "val": 43,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Alegem 27",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": "?",
                "hidden": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Avansează L. Comparăm (38) cu (43).",
      "blocksVisual": [
        {
          "label": "L",
          "groups": [
            [
              {
                "val": 27,
                "hidden": true
              },
              {
                "val": 38,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "R",
          "groups": [
            [
              {
                "val": 3,
                "hidden": true
              },
              {
                "val": 43,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Alegem 38",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": 38,
                "sorted": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "L s-a terminat. Copiem elementele rămase din R (adică 43).",
      "blocksVisual": [
        {
          "label": "R (rămas)",
          "groups": [
            [
              {
                "val": 43,
                "active": true
              }
            ]
          ]
        },
        {
          "label": "Vector interclasat complet",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": 38,
                "sorted": true
              },
              {
                "val": 43,
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 48,
      "text": "Algoritmul s-a terminat. Am combinat succesiv soluții mici pentru a rezolva problema mare!",
      "blocksVisual": [
        {
          "label": "REZULTAT FINAL",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 27,
                "sorted": true
              },
              {
                "val": 38,
                "sorted": true
              },
              {
                "val": 43,
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
        "desc": "Problemă standard"
      },
      {
        "title": "Merge Two Sorted Lists",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
        "desc": "Punctul cheie (merge)"
      }
    ],
    "medium": [
      {
        "title": "Sort List",
        "url": "https://leetcode.com/problems/sort-list/",
        "desc": "Merge Sort pe liste O(1) memorie"
      },
      {
        "title": "Inversion Count",
        "url": "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
        "desc": "Aplicația numărul 1"
      }
    ],
    "hard": [
      {
        "title": "Count of Range Sum",
        "url": "https://leetcode.com/problems/count-of-range-sum/",
        "desc": "Merge Sort modificat"
      },
      {
        "title": "Reverse Pairs",
        "url": "https://leetcode.com/problems/reverse-pairs/",
        "desc": "Variație la Inversiuni"
      }
    ]
  }
};
