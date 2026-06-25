export const data = {
  "presentation": "### Prezentare Generală\n\nArray-urile (sau Vectorii în C++) sunt cea mai simplă și mai folosită structură de date.\n\nUn array reprezintă o zonă continuă de memorie în care elementele sunt stocate unul după altul. Acest lucru permite accesul instantaneu la orice element dacă îi știm poziția (indexul).\n\nÎn C++, `std::vector` este varianta dinamică a unui array: își poate mări sau micșora dimensiunea automat, ascunzând complexitatea alocării memoriei.",
  "complexity": "### Complexitate\n\n- **Timp:** - Accesare: O(1) instant, datorită indexării.\n- Inserare/Ștergere la final: O(1) amortizat.\n- Inserare/Ștergere la mijloc sau început: O(N) pentru că trebuie să mutăm restul elementelor.\n\n- **Spațiu:** O(N) pentru stocarea a N elemente.\n",
  "variations": "### Variații și Edge Cases\n\n1. Arrays Multidimensionale: Matrici (2D Arrays), folosite frecvent în grafică și programare dinamică.\n2. Circular Arrays: Array-uri în care după ultimul element urmează logic primul, utile pentru cozi.",
  "applications": "### Aplicații\n\nPractic orice problemă sau algoritm are nevoie de arrays pentru a stoca input-ul inițial. Algoritmi ca Binary Search, Two Pointers și Prefix Sums operează nativ pe arrays.",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    // Partea 1: Vector 1D
    vector<int> arr = {10, 24, 8, 42, 17};
    int max_val = arr[0];
    
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i] > max_val) {
            max_val = arr[i];
        }
    }
    
    // Partea 2: Matrice 2D
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6}
    };
    int sum = 0;
    
    for(int i = 0; i < matrix.size(); i++) {
        for(int j = 0; j < matrix[i].size(); j++) {
            sum += matrix[i][j];
        }
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
      "text": "Inițializăm un vector 1D (un șir liniar de elemente) cu valori predefinite.",
      "blocksVisual": [
        {
          "label": "Vector 1D",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24
              },
              {
                "val": 8
              },
              {
                "val": 42
              },
              {
                "val": 17
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Presupunem că primul element (10) este valoarea maximă inițială.",
      "blocksVisual": [
        {
          "label": "Căutare Maxim",
          "groups": [
            [
              {
                "val": 10,
                "active": true
              },
              {
                "val": 24
              },
              {
                "val": 8
              },
              {
                "val": 42
              },
              {
                "val": 17
              }
            ],
            [
              {
                "val": "max_val = 10",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Începem parcurgerea vectorului de la indexul 1 (valoarea 24).",
      "blocksVisual": [
        {
          "label": "Căutare Maxim (i=1)",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24,
                "active": true
              },
              {
                "val": 8
              },
              {
                "val": 42
              },
              {
                "val": 17
              }
            ],
            [
              {
                "val": "max_val = 10",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Comparăm 24 cu max_val (10). Deoarece 24 este mai mare, vom actualiza.",
      "blocksVisual": [
        {
          "label": "Comparare",
          "groups": [
            [
              {
                "val": "24 > 10 ?",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "max_val devine 24.",
      "blocksVisual": [
        {
          "label": "Actualizare Maxim",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24,
                "sorted": true
              },
              {
                "val": 8
              },
              {
                "val": 42
              },
              {
                "val": 17
              }
            ],
            [
              {
                "val": "max_val = 24",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Trecem la indexul 2 (valoarea 8).",
      "blocksVisual": [
        {
          "label": "Căutare Maxim (i=2)",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24
              },
              {
                "val": 8,
                "active": true
              },
              {
                "val": 42
              },
              {
                "val": 17
              }
            ],
            [
              {
                "val": "max_val = 24",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Comparăm 8 cu max_val (24). 8 nu este mai mare, deci nu actualizăm.",
      "blocksVisual": [
        {
          "label": "Comparare",
          "groups": [
            [
              {
                "val": "8 > 24 ? NU"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Trecem la indexul 3 (valoarea 42).",
      "blocksVisual": [
        {
          "label": "Căutare Maxim (i=3)",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24
              },
              {
                "val": 8
              },
              {
                "val": 42,
                "active": true
              },
              {
                "val": 17
              }
            ],
            [
              {
                "val": "max_val = 24",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "42 este mai mare decât 24, așa că actualizăm max_val la 42.",
      "blocksVisual": [
        {
          "label": "Actualizare Maxim",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24
              },
              {
                "val": 8
              },
              {
                "val": 42,
                "sorted": true
              },
              {
                "val": 17
              }
            ],
            [
              {
                "val": "max_val = 42",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Trecem la indexul 4 (valoarea 17). 17 nu este mai mare decât 42. După aceasta, am terminat parcurgerea vectorului 1D.",
      "blocksVisual": [
        {
          "label": "Final Vector",
          "groups": [
            [
              {
                "val": 10
              },
              {
                "val": 24
              },
              {
                "val": 8
              },
              {
                "val": 42,
                "sorted": true
              },
              {
                "val": 17,
                "active": true
              }
            ],
            [
              {
                "val": "max_val = 42",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Acum trecem la lucrul cu Matrici (Array 2D). O matrice este un vector de vectori. Inițializăm matricea.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
          [
            {
              "val": 1
            },
            {
              "val": 2
            },
            {
              "val": 3
            }
          ],
          [
            {
              "val": 4
            },
            {
              "val": 5
            },
            {
              "val": 6
            }
          ]
        ]
      }
    },
    {
      "line": 22,
      "text": "Inițializăm suma cu 0. Vom parcurge toată matricea rând cu rând.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
          [
            {
              "val": 1
            },
            {
              "val": 2
            },
            {
              "val": 3
            }
          ],
          [
            {
              "val": 4
            },
            {
              "val": 5
            },
            {
              "val": 6
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Suntem pe rândul i=0, coloana j=0. Adăugăm valoarea 1 la sumă.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
          [
            {
              "val": 1,
              "active": true
            },
            {
              "val": 2
            },
            {
              "val": 3
            }
          ],
          [
            {
              "val": 4
            },
            {
              "val": 5
            },
            {
              "val": 6
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Suntem pe rândul i=0, coloana j=1. Adăugăm valoarea 2.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
          [
            {
              "val": 1,
              "sorted": true
            },
            {
              "val": 2,
              "active": true
            },
            {
              "val": 3
            }
          ],
          [
            {
              "val": 4
            },
            {
              "val": 5
            },
            {
              "val": 6
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Suntem pe rândul i=0, coloana j=2. Adăugăm valoarea 3.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
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
              "active": true
            }
          ],
          [
            {
              "val": 4
            },
            {
              "val": 5
            },
            {
              "val": 6
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 6",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Am terminat primul rând. Trecem la rândul i=1, coloana j=0. Adăugăm 4.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
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
            }
          ],
          [
            {
              "val": 4,
              "active": true
            },
            {
              "val": 5
            },
            {
              "val": 6
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Suntem pe rândul i=1, coloana j=1. Adăugăm 5.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
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
            }
          ],
          [
            {
              "val": 4,
              "sorted": true
            },
            {
              "val": 5,
              "active": true
            },
            {
              "val": 6
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 15",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Suntem pe rândul i=1, coloana j=2. Adăugăm 6.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
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
            }
          ],
          [
            {
              "val": 4,
              "sorted": true
            },
            {
              "val": 5,
              "sorted": true
            },
            {
              "val": 6,
              "active": true
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Sumă",
          "groups": [
            [
              {
                "val": "sum = 21",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Am parcurs complet matricea. Rezultatul final pentru suma elementelor este 21.",
      "matrix": {
        "headers": [
          "Col 0",
          "Col 1",
          "Col 2"
        ],
        "rows": [
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
            }
          ],
          [
            {
              "val": 4,
              "sorted": true
            },
            {
              "val": 5,
              "sorted": true
            },
            {
              "val": 6,
              "sorted": true
            }
          ]
        ]
      },
      "blocksVisual": [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "Suma Finală = 21",
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
        "title": "Suma elementelor",
        "url": "https://www.pbinfo.ro/probleme/2263/suma-elementelor",
        "desc": "Parcurgere simplă vector"
      },
      {
        "title": "Matrice",
        "url": "https://www.pbinfo.ro/probleme/191/matrice",
        "desc": "Lucru cu elemente din matrice 2D"
      }
    ],
    "medium": [
      {
        "title": "Subarray Sum Equals K",
        "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
        "desc": "Problemă avansată de prefix sums pe vector"
      }
    ],
    "hard": [
      {
        "title": "Max Sum of Rectangle No Larger Than K",
        "url": "https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/",
        "desc": "Parcurgere și optimizare pe o matrice"
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      globalVars.push({ name: 'arr', type: 'std::vector<int>', val: '{10, 24, 8, 42, 17}', expandable: true });
      if (stepIndex >= 1) {
        let maxVal = 10;
        if (stepIndex >= 4) maxVal = 24;
        if (stepIndex >= 8) maxVal = 42;
        vars.push({ name: 'max_val', type: 'int', val: maxVal, expandable: false });
        if (activeLine === 9 || activeLine === 13 || activeLine === 15) inlineVal = `max_val: ${maxVal}`;
      }
      if (stepIndex >= 2 && stepIndex <= 10) {
        let iVal = 1;
        if (stepIndex >= 5) iVal = 2;
        if (stepIndex >= 7) iVal = 3;
        if (stepIndex >= 10) iVal = 4;
        vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
        if (activeLine === 11 || activeLine === 12) inlineVal = `i: ${iVal}, arr[i]: ${[10, 24, 8, 42, 17][iVal]}`;
      }
      if (stepIndex >= 11) {
        globalVars.push({ name: 'matrix', type: 'std::vector<std::vector<int>>', val: '{{1, 2, 3}, {4, 5, 6}}', expandable: true });
      }
      if (stepIndex >= 12) {
        let sumVal = 0;
        if (stepIndex === 13) sumVal = 1;
        if (stepIndex === 14) sumVal = 3;
        if (stepIndex === 15) sumVal = 6;
        if (stepIndex === 16) sumVal = 10;
        if (stepIndex === 17) sumVal = 15;
        if (stepIndex === 18) sumVal = 21;
        if (stepIndex === 19) sumVal = 21;
        vars.push({ name: 'sum', type: 'int', val: sumVal, expandable: false });
        if (activeLine === 22 || activeLine === 26 || activeLine === 32) inlineVal = `sum: ${sumVal}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 8 && stepIndex >= 0) return 'arr: {10, 24, 8, 42, 17}';
      if (lineNum === 9 && stepIndex >= 1) {
        return `max_val: ${stepIndex >= 8 ? 42 : (stepIndex >= 4 ? 24 : 10)}`;
      }
      if (lineNum === 11 && stepIndex >= 2 && stepIndex <= 10) {
        let iVal = 1;
        if (stepIndex >= 5) iVal = 2;
        if (stepIndex >= 7) iVal = 3;
        if (stepIndex >= 10) iVal = 4;
        return `i: ${iVal}`;
      }
      if (lineNum === 12 && stepIndex >= 2 && stepIndex <= 10) {
        let iVal = 1;
        let maxVal = 10;
        if (stepIndex >= 5) { iVal = 2; maxVal = 24; }
        if (stepIndex >= 7) { iVal = 3; maxVal = 24; }
        if (stepIndex >= 10) { iVal = 4; maxVal = 42; }
        const arrVals = [10, 24, 8, 42, 17];
        return `arr[i]: ${arrVals[iVal]}, max_val: ${maxVal}`;
      }
      if (lineNum === 13 && stepIndex >= 1) {
        return `max_val: ${stepIndex >= 8 ? 42 : (stepIndex >= 4 ? 24 : 10)}`;
      }
      if (lineNum === 20 && stepIndex >= 11) return 'matrix: {{1,2,3},{4,5,6}}';
      if (lineNum === 24 && stepIndex >= 13 && stepIndex <= 18) {
        let iVal = stepIndex >= 16 ? 1 : 0;
        return `i: ${iVal}`;
      }
      if (lineNum === 25 && stepIndex >= 13 && stepIndex <= 18) {
        let iVal = stepIndex >= 16 ? 1 : 0;
        let jVal = (stepIndex - 13) % 3;
        if (stepIndex >= 16) jVal = (stepIndex - 16) % 3;
        return `i: ${iVal}, j: ${jVal}`;
      }
      if (lineNum === 26 && stepIndex >= 12) {
        let sumVal = 0;
        if (stepIndex === 13) sumVal = 1;
        if (stepIndex === 14) sumVal = 3;
        if (stepIndex === 15) sumVal = 6;
        if (stepIndex === 16) sumVal = 10;
        if (stepIndex === 17) sumVal = 15;
        if (stepIndex === 18) sumVal = 21;
        if (stepIndex === 19) sumVal = 21;
        return `sum: ${sumVal}`;
      }
      return null;
    }
  }
};
