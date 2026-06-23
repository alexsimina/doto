export const data = {
  presentation: "### Prelucrarea Cifrelor\n\nPrelucrarea cifrelor unui număr întreg în baza $10$ este o abilitate fundamentală în programare. Aceasta se bazează pe două operații matematice elementare:\n\n1. **Determinarea ultimei cifre**: obținută prin operatorul modulo, adică $n \\pmod{10}$.\n2. **Eliminarea ultimei cifre**: obținută prin împărțirea întreagă la $10$, adică $n \\leftarrow \\lfloor n / 10 \\rfloor$.\n\nNumărul de cifre ale unui număr întreg pozitiv $n$ poate fi determinat prin împărțiri succesive sau direct prin formula: $d = \\lfloor \\log_{10}(n) \\rfloor + 1$.",
  complexity: "### Complexitate\n\n- **Timp:** $O(\\log_{10}(n))$ - deoarece numărul de iterații este direct proporțional cu numărul de cifre ale lui $n$.\n- **Spațiu:** $O(1)$ - memoria utilizată este constantă, folosind doar câteva variabile simple.",
  variations: "### Variații și Cazuri Particulare\n\n- **Cazul $n = 0$**: Majoritatea algoritmilor cu bucle `while (n > 0)` nu intră în buclă pentru $0$. Acest caz trebuie tratat separat dacă se cere prelucrarea cifrelor sale.\n- **Numere negative**: Trebuie aplicată funcția valoare absolută ($|n|$) înainte de extragerea cifrelor, deoarece în C++ operatorul `%` pe numere negative returnează valori negative sau dependente de compilator.\n- **Palindrom**: Verificarea dacă un număr este egal cu răsturnatul său.",
  applications: "### Aplicații Reale\n\n- Algoritmi de criptografie (cum ar fi RSA) care operează pe cifrele/blocurile de cifre ale unor numere mari.\n- Validarea sumelor de control (algoritmul Luhn pentru carduri de credit).\n- Conversii rapide de tipuri de date în interfețe grafice.",
  code: `#include <iostream>

using namespace std;

int main() {
    int n = 358;
    int sum = 0;
    int reversed = 0;
    int temp = n;
    
    while (temp > 0) {
        int digit = temp % 10;
        sum += digit;
        reversed = reversed * 10 + digit;
        temp /= 10;
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 6,
      text: "Inițializăm numărul $n$ cu valoarea $358$ pe care îl vom procesa.",
      blocksVisual: [
        {
          "label": "Variabile",
          "groups": [
            [
              {
                "val": "n = 358",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 7,
      text: "Inițializăm variabila $sum$ cu $0$. Aceasta va acumula suma cifrelor.",
      blocksVisual: [
        {
          "label": "Stare",
          "groups": [
            [
              {
                "val": "n = 358"
              }
            ],
            [
              {
                "val": "sum = 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Inițializăm $reversed$ cu $0$. Aici vom construi inversul (răsturnatul) numărului.",
      blocksVisual: [
        {
          "label": "Stare",
          "groups": [
            [
              {
                "val": "sum = 0"
              }
            ],
            [
              {
                "val": "reversed = 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Copiem valoarea lui $n$ în $temp$ pentru a nu distruge valoarea inițială în timpul procesării.",
      blocksVisual: [
        {
          "label": "Stare",
          "groups": [
            [
              {
                "val": "temp = 358",
                "active": true
              }
            ],
            [
              {
                "val": "sum = 0"
              }
            ],
            [
              {
                "val": "reversed = 0"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Verificăm dacă $temp > 0$. $358 > 0$ este adevărat.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "358 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Extragem ultima cifră a lui $temp$: $358 \\pmod{10} = 8$.",
      blocksVisual: [
        {
          "label": "Cifră extrasă",
          "groups": [
            [
              {
                "val": "digit = 8",
                "active": true
              }
            ],
            [
              {
                "val": "temp = 358"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Adăugăm cifra $8$ la suma cifrelor: sum devine $8$.",
      blocksVisual: [
        {
          "label": "Suma actualizată",
          "groups": [
            [
              {
                "val": "sum = 8",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Actualizăm răsturnatul: reversed devine $8$.",
      blocksVisual: [
        {
          "label": "Răsturnat actualizat",
          "groups": [
            [
              {
                "val": "reversed = 8",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Eliminăm ultima cifră a lui $temp$ prin împărțirea la $10$: $temp = 35$.",
      blocksVisual: [
        {
          "label": "Valoare rămasă",
          "groups": [
            [
              {
                "val": "temp = 35",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Verificăm dacă $temp > 0$. $35 > 0$ este adevărat.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "35 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Extragem ultima cifră a lui $temp$: $35 \\pmod{10} = 5$.",
      blocksVisual: [
        {
          "label": "Cifră extrasă",
          "groups": [
            [
              {
                "val": "digit = 5",
                "active": true
              }
            ],
            [
              {
                "val": "temp = 35"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Adăugăm cifra $5$ la suma cifrelor: sum devine $13$.",
      blocksVisual: [
        {
          "label": "Suma actualizată",
          "groups": [
            [
              {
                "val": "sum = 13",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Actualizăm răsturnatul: reversed devine $85$.",
      blocksVisual: [
        {
          "label": "Răsturnat actualizat",
          "groups": [
            [
              {
                "val": "reversed = 85",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Eliminăm ultima cifră a lui $temp$ prin împărțirea la $10$: $temp = 3$.",
      blocksVisual: [
        {
          "label": "Valoare rămasă",
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
      line: 11,
      text: "Verificăm dacă $temp > 0$. $3 > 0$ este adevărat.",
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
      line: 12,
      text: "Extragem ultima cifră a lui $temp$: $3 \\pmod{10} = 3$.",
      blocksVisual: [
        {
          "label": "Cifră extrasă",
          "groups": [
            [
              {
                "val": "digit = 3",
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
      line: 13,
      text: "Adăugăm cifra $3$ la suma cifrelor: sum devine $16$.",
      blocksVisual: [
        {
          "label": "Suma actualizată",
          "groups": [
            [
              {
                "val": "sum = 16",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Actualizăm răsturnatul: reversed devine $853$.",
      blocksVisual: [
        {
          "label": "Răsturnat actualizat",
          "groups": [
            [
              {
                "val": "reversed = 853",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Eliminăm ultima cifră a lui $temp$ prin împărțirea la $10$: $temp = 0$.",
      blocksVisual: [
        {
          "label": "Valoare rămasă",
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
      line: 11,
      text: "Verificăm dacă $temp > 0$. $0 > 0$ este fals.",
      blocksVisual: [
        {
          "label": "Condiție",
          "groups": [
            [
              {
                "val": "0 > 0 ? Fals",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Finalizăm programul cu succes.",
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
        title: "Suma cifrelor",
        url: "https://www.pbinfo.ro/probleme/2269/suma-cifrelor",
        desc: "Calculează suma cifrelor unui număr întreg dat."
      }
    ],
    medium: [
      {
        title: "Palindrom",
        url: "https://www.pbinfo.ro/probleme/89/palindrom",
        desc: "Verifică dacă un număr dat este palindrom (egal cu inversul său)."
      }
    ],
    hard: [
      {
        title: "Cifre Comune",
        url: "https://www.pbinfo.ro/probleme/1931/cifre-comune",
        desc: "Determină cifrele comune ale unor numere date folosind vectori de frecvență."
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
              "val": 358,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 6
            }
          ],
          "inlineVal": "n: 358"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
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
          "inlineVal": "sum: 0"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 0,
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
          "inlineVal": "reversed: 0"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 358,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 9
            }
          ],
          "inlineVal": "temp: 358"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 358,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 8,
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
          "inlineVal": "digit: 8"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 8,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 8,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 35,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 8,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 35,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 35,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 5,
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
          "inlineVal": "digit: 5"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 8,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 35,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 5,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 85,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 35,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 5,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 85,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 5,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 85,
              "expandable": false
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
              "line": 11
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 13,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 85,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "digit",
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
          "inlineVal": "digit: 3"
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 16,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 85,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 3,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 16,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 853,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 3,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 3,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 16,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 853,
              "expandable": false
            },
            {
              "name": "temp",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "digit",
              "type": "int",
              "val": 3,
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 16,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 853,
              "expandable": false
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
              "line": 11
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "n",
              "type": "int",
              "val": 358,
              "expandable": false
            },
            {
              "name": "sum",
              "type": "int",
              "val": 16,
              "expandable": false
            },
            {
              "name": "reversed",
              "type": "int",
              "val": 853,
              "expandable": false
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
              "line": 18
            }
          ],
          "inlineVal": null
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 6 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "6": "n: 358"
        },
        {
          "6": "n: 358",
          "7": "sum: 0"
        },
        {
          "6": "n: 358",
          "7": "sum: 0",
          "8": "reversed: 0"
        },
        {
          "6": "n: 358",
          "7": "sum: 0",
          "8": "reversed: 0",
          "9": "temp: 358"
        },
        {
          "6": "n: 358",
          "7": "sum: 0",
          "8": "reversed: 0",
          "9": "temp: 358"
        },
        {
          "6": "n: 358",
          "7": "sum: 0",
          "8": "reversed: 0",
          "9": "temp: 358",
          "12": "digit: 8"
        },
        {
          "6": "n: 358",
          "7": "sum: 8",
          "8": "reversed: 0",
          "9": "temp: 358",
          "12": "digit: 8"
        },
        {
          "6": "n: 358",
          "7": "sum: 8",
          "8": "reversed: 8",
          "9": "temp: 358",
          "12": "digit: 8"
        },
        {
          "6": "n: 358",
          "7": "sum: 8",
          "8": "reversed: 8",
          "9": "temp: 35",
          "12": "digit: 8"
        },
        {
          "6": "n: 358",
          "7": "sum: 8",
          "8": "reversed: 8",
          "9": "temp: 35"
        },
        {
          "6": "n: 358",
          "7": "sum: 8",
          "8": "reversed: 8",
          "9": "temp: 35",
          "12": "digit: 5"
        },
        {
          "6": "n: 358",
          "7": "sum: 13",
          "8": "reversed: 8",
          "9": "temp: 35",
          "12": "digit: 5"
        },
        {
          "6": "n: 358",
          "7": "sum: 13",
          "8": "reversed: 85",
          "9": "temp: 35",
          "12": "digit: 5"
        },
        {
          "6": "n: 358",
          "7": "sum: 13",
          "8": "reversed: 85",
          "9": "temp: 3",
          "12": "digit: 5"
        },
        {
          "6": "n: 358",
          "7": "sum: 13",
          "8": "reversed: 85",
          "9": "temp: 3"
        },
        {
          "6": "n: 358",
          "7": "sum: 13",
          "8": "reversed: 85",
          "9": "temp: 3",
          "12": "digit: 3"
        },
        {
          "6": "n: 358",
          "7": "sum: 16",
          "8": "reversed: 85",
          "9": "temp: 3",
          "12": "digit: 3"
        },
        {
          "6": "n: 358",
          "7": "sum: 16",
          "8": "reversed: 853",
          "9": "temp: 3",
          "12": "digit: 3"
        },
        {
          "6": "n: 358",
          "7": "sum: 16",
          "8": "reversed: 853",
          "9": "temp: 0",
          "12": "digit: 3"
        },
        {
          "6": "n: 358",
          "7": "sum: 16",
          "8": "reversed: 853",
          "9": "temp: 0"
        },
        {
          "6": "n: 358",
          "7": "sum: 16",
          "8": "reversed: 853",
          "9": "temp: 0"
        }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
}
;
