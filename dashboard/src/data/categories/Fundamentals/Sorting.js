export const data = {
  "presentation": "### Prezentare Generală\n\nSortarea este procesul de rearanjare a elementelor într-o anumită ordine (crescătoare sau descrescătoare).\n\nPe lângă algoritmii complecși precum Merge Sort sau Quick Sort, există algoritmii elementari (cu timp pătratic O(N^2)). Deși sunt lenți pentru date multe, ei sunt intuitivi și perfecți pentru seturi mici:\n1. Bubble Sort: 'Mullonează' cele mai mari elemente spre final.\n2. Selection Sort: Selectează minimul și-l pune la început.\n3. Insertion Sort: Inserează fiecare element în sub-șirul deja sortat.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N^2) în cel mai rău caz.\n\nÎnsă Insertion Sort are particularitatea incredibilă că pe vectori parțial sortați rulează în O(N)! Astfel devine extrem de rapid, fiind adesea combinat cu Quick Sort (intro-sort) pentru instanțe mici (< 32 elemente).\n- **Spațiu:** O(1) - sortare in-place (în memoria existentă a vectorului).\n",
  "variations": "### Variații și Edge Cases\n\n1. Stabilitate: Insertion și Bubble Sort sunt 'Stabili' (păstrează ordinea relativă a elementelor egale). Selection Sort NU este stabil.\n2. Inversions: Timpul de rulare a lui Insertion Sort depinde direct de numărul de 'Inversiuni' (elemente în ordine greșită) ale array-ului inițial.",
  "applications": "### Aplicații\n\nAșa cum am menționat, Insertion Sort e adesea implementarea internă a funcțiilor de sistem (std::sort, Array.prototype.sort) pentru sub-segmente mici de date.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> v = {4, 3, 1, 2}; // Exemplu redus pentru visual
    
    for (int i = 1; i < v.size(); i++) {
        int key = v[i];
        int j = i - 1;
        
        while (j >= 0 && v[j] > key) {
            v[j + 1] = v[j];
            j--;
        }
        v[j + 1] = key;
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Vectorul inițial. Elementul de la indexul 0 (valoarea 4) este considerat partea deja sortată a vectorului.",
      "blocksVisual": [
        {
          "label": "Stare Inițială",
          "groups": [
            [
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 3
              },
              {
                "val": 1
              },
              {
                "val": 2
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 1 (i = 1). Luăm elementul 3. Trebuie să-i găsim locul în sub-șirul sortat (la stânga lui).",
      "blocksVisual": [
        {
          "label": "Alegere i=1",
          "groups": [
            [
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 3,
                "active": true
              },
              {
                "val": 1
              },
              {
                "val": 2
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Salvăm 3 în variabila `key`.",
      "blocksVisual": [
        {
          "label": "key = 3",
          "groups": [
            [
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              },
              {
                "val": 1
              },
              {
                "val": 2
              }
            ],
            [
              {
                "val": "key = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Comparăm elementele din stânga (4) cu key (3). Deoarece 4 > 3, vom muta 4 cu o poziție la dreapta.",
      "blocksVisual": [
        {
          "label": "Mutare 4",
          "groups": [
            [
              {
                "val": "_",
                "active": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 1
              },
              {
                "val": 2
              }
            ],
            [
              {
                "val": "key = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Am ajuns la început (j devine -1). Inserăm `key` pe poziția sa corectă (0).",
      "blocksVisual": [
        {
          "label": "Inserare key",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 1
              },
              {
                "val": 2
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 2 (i = 2). Acum partea sortată este [3, 4]. Elementul curent pe care vrem să-l inserăm este 1.",
      "blocksVisual": [
        {
          "label": "Alegere i=2",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 1,
                "active": true
              },
              {
                "val": 2
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Salvăm 1 în `key`.",
      "blocksVisual": [
        {
          "label": "key = 1",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              },
              {
                "val": 2
              }
            ],
            [
              {
                "val": "key = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "4 > 1, deci îl mutăm pe 4 la dreapta.",
      "blocksVisual": [
        {
          "label": "Mutare 4",
          "groups": [
            [
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 2
              }
            ],
            [
              {
                "val": "key = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "3 > 1, deci îl mutăm și pe 3 la dreapta.",
      "blocksVisual": [
        {
          "label": "Mutare 3",
          "groups": [
            [
              {
                "val": "_",
                "active": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 2
              }
            ],
            [
              {
                "val": "key = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Inserăm 1 pe poziția sa corectă, la început.",
      "blocksVisual": [
        {
          "label": "Inserare key",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 2
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 3 (i = 3). Partea sortată este [1, 3, 4]. Elementul de inserat este 2.",
      "blocksVisual": [
        {
          "label": "Alegere i=3",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": 2,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Salvăm 2 în `key`.",
      "blocksVisual": [
        {
          "label": "key = 2",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              }
            ],
            [
              {
                "val": "key = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "4 > 2, deci mutăm 4 la dreapta.",
      "blocksVisual": [
        {
          "label": "Mutare 4",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              },
              {
                "val": 4,
                "sorted": true
              }
            ],
            [
              {
                "val": "key = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "3 > 2, deci mutăm 3 la dreapta.",
      "blocksVisual": [
        {
          "label": "Mutare 3",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              }
            ],
            [
              {
                "val": "key = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Acum comparăm 1 cu 2. Din fericire, 1 < 2. Ne oprim din mutat elemente.",
      "blocksVisual": [
        {
          "label": "Oprire mutare",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": "_",
                "active": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              }
            ],
            [
              {
                "val": "key = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Inserăm 2 pe locul gol.",
      "blocksVisual": [
        {
          "label": "Inserare key",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 2,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Vectorul nostru este acum complet sortat!",
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": 1,
                "sorted": true
              },
              {
                "val": 2,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
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
        "title": "Insertion Sort Infoarena",
        "url": "https://www.infoarena.ro/problema/algsort",
        "desc": "Sortare directă"
      },
      {
        "title": "Bubble Sort",
        "url": "https://www.pbinfo.ro/probleme/119/sortare",
        "desc": "PbInfo"
      }
    ],
    "medium": [
      {
        "title": "Sort Colors",
        "url": "https://leetcode.com/problems/sort-colors/",
        "desc": "Sortare eficientă DNF"
      }
    ],
    "hard": [
      {
        "title": "Maximum Gap",
        "url": "https://leetcode.com/problems/maximum-gap/",
        "desc": "Radix/Bucket Sort"
      }
    ]
  }
};
