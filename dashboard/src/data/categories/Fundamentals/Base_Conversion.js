export const data = {
  presentation: "### Sisteme de Numerație și Conversii\n\nUn sistem de numerație reprezintă un mod de scriere a numerelor folosind un set de simboluri (cifre). Cel mai cunoscut este sistemul zecimal (baza $10$). În informatică, sistemele binar (baza $2$), octal (baza $8$) și hexadecimal (baza $16$) sunt extrem de importante.\n\nFie $b$ baza sistemului de numerație. Un număr reprezentat prin cifrele $(d_k d_{k-1} \\dots d_1 d_0)_b$ are valoarea în baza $10$ determinată de formula:\n\n$$N = \\sum_{i=0}^{k} d_i \\cdot b^i$$\n\nPentru a converti un număr din baza $10$ în baza $b$, împărțim succesiv numărul la $b$, colectând resturile obținute de la ultimul la primul (în ordine inversă).",
  complexity: "### Complexitate\n\n- **Timp:** $O(\\log_b(n))$ - numărul de împărțiri necesare este egal cu numărul de cifre în baza $b$.\n- **Spațiu:** $O(\\log_b(n))$ - spațiul necesar stocării cifrelor numărului în noua bază.",
  variations: "### Variații și Cazuri Particulare\n\n- **Baze mai mari de $10$**: Pentru cifrele cu valori între $10$ și $b-1$, se folosesc litere, de exemplu: $'A' = 10$, $'B' = 11$, $\\dots$, $'F' = 15$ în baza $16$.\n- **Baze puteri ale lui $2$**: Conversia directă între baza $2$ și baze precum $4$, $8$, $16$ se poate face rapid prin gruparea cifrelor binare câte $\\log_2(B)$ (de exemplu, gruparea de câte $4$ biți pentru baza $16$), evitând conversia prin intermediul bazei $10$.",
  applications: "### Aplicații Reale\n\n- Reprezentarea culorilor în format Hex (de exemplu `#FFFFFF` pentru alb).\n- Adresarea memoriei RAM în sisteme de calcul folosind notația hexadecimală.\n- Permisiunile în Unix/Linux reprezentate octal (de exemplu `755`).",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n = 13;
    int base = 2;
    vector<int> digits;
    
    int temp = n;
    while (temp > 0) {
        int rem = temp % base;
        digits.push_back(rem);
        temp /= base;
    }
    
    int num_digits = digits.size();
    return 0;
}
`,
  explanations: [
    {
      line: 7,
      text: "Definim numărul zecimal $n = 13$ pe care dorim să-l convertim în baza $2$.",
      blocksVisual: [
        {
          "label": "Input",
          "groups": [
            [
              {
                "val": "n = 13",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Setăm baza în care dorim să facem conversia: $base = 2$. Numărul 13 va fi transformat în format binar.",
      blocksVisual: [
        {
          "label": "Bază",
          "groups": [
            [
              {
                "val": "base = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Declarăm un vector gol $digits$ în care vom stoca resturile obținute la fiecare pas, reprezentând cifrele în baza 2 de la dreapta la stânga.",
      blocksVisual: [
        {
          "label": "Vector Cifre",
          "groups": [
            [
              {
                "val": "digits: []",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Copiem valoarea lui $n$ în variabila de lucru $temp = 13$. Vom împărți succesiv $temp$ la bază pentru a nu altera valoarea inițială a lui $n$.",
      blocksVisual: [
        {
          "label": "Copie",
          "groups": [
            [
              {
                "val": "temp = 13",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 13$ este strict mai mare decât $0$ (13 > 0 este Adevărat), intrăm în buclă pentru a calcula următoarea cifră.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "13 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm restul împărțirii lui $temp$ la $base$: $13 \\pmod{2} = 1$. Cifra curentă determinată este 1.",
      blocksVisual: [
        {
          "label": "Rest",
          "groups": [
            [
              {
                "val": "rem = 1",
                "active": true
              }
            ],
            [
              {
                "val": "temp = 13"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul obținut ($1$) la finalul vectorului $digits$. Starea actuală a cifrelor colectate este [1].",
      blocksVisual: [
        {
          "label": "Vector Cifre",
          "groups": [
            [
              {
                "val": "digits: [1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Împărțim întreagă valoarea lui $temp$ la $base$ pentru a trece la următoarea cifră: $temp = \\lfloor 13 / 2 \\rfloor = 6$.",
      blocksVisual: [
        {
          "label": "Actualizare",
          "groups": [
            [
              {
                "val": "temp = 6",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 6$ este strict mai mare decât $0$ (6 > 0 este Adevărat), intrăm în buclă pentru a calcula următoarea cifră.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "6 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm restul împărțirii lui $temp$ la $base$: $6 \\pmod{2} = 0$. Cifra curentă determinată este 0.",
      blocksVisual: [
        {
          "label": "Rest",
          "groups": [
            [
              {
                "val": "rem = 0",
                "active": true
              }
            ],
            [
              {
                "val": "temp = 6"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul obținut ($0$) la finalul vectorului $digits$. Starea actuală a cifrelor colectate este [1, 0].",
      blocksVisual: [
        {
          "label": "Vector Cifre",
          "groups": [
            [
              {
                "val": "digits: [1, 0]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Împărțim întreagă valoarea lui $temp$ la $base$ pentru a trece la următoarea cifră: $temp = \\lfloor 6 / 2 \\rfloor = 3$.",
      blocksVisual: [
        {
          "label": "Actualizare",
          "groups": [
            [
              {
                "val": "temp = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 3$ este strict mai mare decât $0$ (3 > 0 este Adevărat), intrăm în buclă pentru a calcula următoarea cifră.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "3 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm restul împărțirii lui $temp$ la $base$: $3 \\pmod{2} = 1$. Cifra curentă determinată este 1.",
      blocksVisual: [
        {
          "label": "Rest",
          "groups": [
            [
              {
                "val": "rem = 1",
                "active": true
              }
            ],
            [
              {
                "val": "temp = 3"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul obținut ($1$) la finalul vectorului $digits$. Starea actuală a cifrelor colectate este [1, 0, 1].",
      blocksVisual: [
        {
          "label": "Vector Cifre",
          "groups": [
            [
              {
                "val": "digits: [1, 0, 1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Împărțim întreagă valoarea lui $temp$ la $base$ pentru a trece la următoarea cifră: $temp = \\lfloor 3 / 2 \\rfloor = 1$.",
      blocksVisual: [
        {
          "label": "Actualizare",
          "groups": [
            [
              {
                "val": "temp = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 1$ este strict mai mare decât $0$ (1 > 0 este Adevărat), intrăm în buclă pentru a calcula următoarea cifră.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "1 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm restul împărțirii lui $temp$ la $base$: $1 \\pmod{2} = 1$. Cifra curentă determinată este 1.",
      blocksVisual: [
        {
          "label": "Rest",
          "groups": [
            [
              {
                "val": "rem = 1",
                "active": true
              }
            ],
            [
              {
                "val": "temp = 1"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul obținut ($1$) la finalul vectorului $digits$. Starea actuală a cifrelor colectate este [1, 0, 1, 1].",
      blocksVisual: [
        {
          "label": "Vector Cifre",
          "groups": [
            [
              {
                "val": "digits: [1, 0, 1, 1]",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Împărțim întreagă valoarea lui $temp$ la $base$ pentru a trece la următoarea cifră: $temp = \\lfloor 1 / 2 \\rfloor = 0$.",
      blocksVisual: [
        {
          "label": "Actualizare",
          "groups": [
            [
              {
                "val": "temp = 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 0$ este strict mai mare decât $0$ (0 > 0 este Adevărat), intrăm în buclă pentru a calcula următoarea cifră.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "0 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 0$ nu este mai mare decât $0$ (0 > 0 este Fals), condiția este falsă și ieșim din bucla while.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "0 > 0 ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Determinăm lungimea vectorului de cifre: $num_digits = 4$. Numărul 13 are 4 cifre în baza 2.",
      blocksVisual: [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "num_digits = 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Programul se încheie cu succes, returnând 0. Vectorul $digits$ conține cifrele binare de la dreapta la stânga (reprezentând numărul 1101 binar).",
      blocksVisual: [
        {
          "label": "Final",
          "groups": [
            [
              {
                "val": "return 0",
                "active": true
              }
            ]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Baza 2",
        url: "https://www.pbinfo.ro/probleme/429/baza2",
        desc: "Afișează reprezentarea în baza 2 a unui număr dat în baza 10."
      }
    ],
    medium: [
      {
        title: "Conversie din baza b în baza 10",
        url: "https://www.pbinfo.ro/probleme/2319/conversie",
        desc: "Convertește un număr dintr-o bază b în baza 10."
      }
    ],
    hard: [
      {
        title: "Baza b",
        url: "https://www.pbinfo.ro/probleme/430/bazab",
        desc: "Efectuează conversia unui număr din baza 10 în baza b (unde b poate fi între 2 și 16)."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 7
            }
          ],
          "inlineVal": "n: 13"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 8
            }
          ],
          "inlineVal": "base: 2"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[]",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 9
            }
          ],
          "inlineVal": "digits: []"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 13,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 11
            }
          ],
          "inlineVal": "temp: 13"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 13,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 13
            }
          ],
          "inlineVal": "rem: 1"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 14
            }
          ],
          "inlineVal": "digits: [1]"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 6,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 15
            }
          ],
          "inlineVal": "temp: 6"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 6,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 6,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 0,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 13
            }
          ],
          "inlineVal": "rem: 0"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 6,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 0,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 14
            }
          ],
          "inlineVal": "digits: [1, 0]"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 0,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 15
            }
          ],
          "inlineVal": "temp: 3"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 13
            }
          ],
          "inlineVal": "rem: 1"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 14
            }
          ],
          "inlineVal": "digits: [1, 0, 1]"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 15
            }
          ],
          "inlineVal": "temp: 1"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 13
            }
          ],
          "inlineVal": "rem: 1"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 14
            }
          ],
          "inlineVal": "digits: [1, 0, 1, 1]"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "rem",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 15
            }
          ],
          "inlineVal": "temp: 0"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 0,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 0,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "num_digits",
              "type": "int",
              "val": 4,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 18
            }
          ],
          "inlineVal": "num_digits: 4"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "base",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "digits",
              "type": "std::vector<int>",
              "val": "[1, 0, 1, 1]",
              "expandable": true
            },
            {
              "name": "temp",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "num_digits",
              "type": "int",
              "val": 4,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 19
            }
          ],
          "inlineVal": null
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 7 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "7": "n: 13"
        },
        {
          "7": "n: 13",
          "8": "base: 2"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "9": "digits: []"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "9": "digits: []",
          "11": "temp: 13"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "9": "digits: []",
          "11": "temp: 13"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "9": "digits: []",
          "11": "temp: 13",
          "13": "rem: 1"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "11": "temp: 13",
          "13": "rem: 1",
          "14": "digits: [1]"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1]",
          "15": "temp: 6"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1]",
          "15": "temp: 6"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 0",
          "14": "digits: [1]",
          "15": "temp: 6"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 0",
          "14": "digits: [1, 0]",
          "15": "temp: 6"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 0",
          "14": "digits: [1, 0]",
          "15": "temp: 3"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1, 0]",
          "15": "temp: 3"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1, 0]",
          "15": "temp: 3"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1, 0, 1]",
          "15": "temp: 3"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1, 0, 1]",
          "15": "temp: 1"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1, 0, 1]",
          "15": "temp: 1"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1, 0, 1]",
          "15": "temp: 1"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1, 0, 1, 1]",
          "15": "temp: 1"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "13": "rem: 1",
          "14": "digits: [1, 0, 1, 1]",
          "15": "temp: 0"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1, 0, 1, 1]",
          "15": "temp: 0"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1, 0, 1, 1]",
          "15": "temp: 0"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1, 0, 1, 1]",
          "15": "temp: 0",
          "18": "num_digits: 4"
        },
        {
          "7": "n: 13",
          "8": "base: 2",
          "14": "digits: [1, 0, 1, 1]",
          "15": "temp: 0",
          "18": "num_digits: 4"
        }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
}
;
;
;
