export const data = {
  presentation: "### Prelucrări pe Șiruri fără Memorare (Streaming)\n\nProcesarea în flux (sau **streaming**) se referă la tehnica de a citi și analiza un șir de date element cu element, fără a stoca toate elementele în memorie. Această metodă este fundamentală în programare competitivă și sisteme de producție.\n\nDe exemplu, dacă se cere suma sau maximul a $N$ numere, nu este necesar să declarăm un vector de dimensiune $N$. Putem folosi o singură variabilă în care citim pe rând fiecare număr și acumulăm rezultatul. Astfel, spațiul de memorie devine $O(1)$, comparat cu $O(N)$ dacă am fi stocat elementele într-un tablou.",
  complexity: "### Complexitate\n\n- **Timp:** $O(N)$ - citim și procesăm fiecare din cele $N$ elemente exact o singură dată.\n- **Spațiu:** $O(1)$ - memoria utilizată este constantă, independentă de lungimea șirului de intrare.",
  variations: "### Variații și Cazuri Particulare\n\n1. **Citire până la EOF (End Of File)**: Când nu se specifică numărul de elemente dinainte, citirea se face într-o buclă `while(cin >> x)`.\n2. **Valoare de oprire**: Șirul se încheie cu o valoare santinelă (de exemplu, $0$).\n3. **Stări consecutive**: Uneori avem nevoie de elementul anterior pentru a-l compara cu cel curent. Acest lucru se rezolvă menținând o variabilă suplimentară `prev_x`.",
  applications: "### Aplicații Reale\n\n- Procesarea fișierelor de log gigantice care nu încap în memoria RAM.\n- Monitorizarea în timp real a datelor provenite de la senzori (IoT).\n- Calcularea metricilor agregate (medie, deviație standard) pentru fluxuri financiare live.",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    // Simulam citirea succesiva a numerelor: 4, -2, 7, 0
    vector<int> stream = {4, -2, 7, 0};
    int sum = 0;
    int count = 0;
    
    for (int x : stream) {
        if (x == 0) {
            break;
        }
        if (x > 0) {
            sum += x;
            count++;
        }
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 8,
      text: "Definim un vector $stream$ pentru a simula citirea valorilor de la consolă.",
      blocksVisual: [
        {
          "label": "Flux de intrare",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "-2"
              },
              {
                "val": "7"
              },
              {
                "val": "0 (stop)"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Inițializăm suma numerelor pozitive cu $0$.",
      blocksVisual: [
        {
          "label": "Suma",
          "groups": [
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
      line: 10,
      text: "Inițializăm numărul de elemente pozitive găsite cu $0$.",
      blocksVisual: [
        {
          "label": "Contor",
          "groups": [
            [
              {
                "val": "count = 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Citim următorul număr din flux: $x = 4$.",
      blocksVisual: [
        {
          "label": "Element curent",
          "groups": [
            [
              {
                "val": "x = 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă $x$ este $0$. Nu este.",
      blocksVisual: [
        {
          "label": "Oprire?",
          "groups": [
            [
              {
                "val": "4 == 0 ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă $x$ este pozitiv ($4 > 0$). Este adevărat.",
      blocksVisual: [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "4 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Adunăm valoarea $4$ la suma totală: $sum = 4$.",
      blocksVisual: [
        {
          "label": "Suma",
          "groups": [
            [
              {
                "val": "sum = 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Incrementăm contorul numerelor pozitive: $count = 1$.",
      blocksVisual: [
        {
          "label": "Contor",
          "groups": [
            [
              {
                "val": "count = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Citim următorul număr din flux: $x = -2$.",
      blocksVisual: [
        {
          "label": "Element curent",
          "groups": [
            [
              {
                "val": "x = -2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă $x$ este $0$. Nu este.",
      blocksVisual: [
        {
          "label": "Oprire?",
          "groups": [
            [
              {
                "val": "-2 == 0 ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă $x$ este pozitiv ($-2 > 0$). Este fals.",
      blocksVisual: [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "-2 > 0 ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Citim următorul număr din flux: $x = 7$.",
      blocksVisual: [
        {
          "label": "Element curent",
          "groups": [
            [
              {
                "val": "x = 7",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă $x$ este $0$. Nu este.",
      blocksVisual: [
        {
          "label": "Oprire?",
          "groups": [
            [
              {
                "val": "7 == 0 ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă $x$ este pozitiv ($7 > 0$). Este adevărat.",
      blocksVisual: [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "7 > 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Adunăm valoarea $7$ la suma totală: $sum = 11$.",
      blocksVisual: [
        {
          "label": "Suma",
          "groups": [
            [
              {
                "val": "sum = 11",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Incrementăm contorul numerelor pozitive: $count = 2$.",
      blocksVisual: [
        {
          "label": "Contor",
          "groups": [
            [
              {
                "val": "count = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Citim următorul număr din flux: $x = 0$.",
      blocksVisual: [
        {
          "label": "Element curent",
          "groups": [
            [
              {
                "val": "x = 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă $x$ este $0$. Este adevărat.",
      blocksVisual: [
        {
          "label": "Oprire?",
          "groups": [
            [
              {
                "val": "0 == 0 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Întrerupem bucla folosind instrucțiunea `break`.",
      blocksVisual: [
        {
          "label": "Ieșire din buclă",
          "groups": [
            [
              {
                "val": "break",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Finalizăm programul. Variabilele finale sunt $sum = 11$ și $count = 2$.",
      blocksVisual: [
        {
          "label": "Stare finală",
          "groups": [
            [
              {
                "val": "sum = 11"
              }
            ],
            [
              {
                "val": "count = 2"
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
        title: "Numărare valori pozitive",
        url: "https://www.pbinfo.ro/probleme/2810/numarare6",
        desc: "Citește un flux de numere până la întâlnirea lui 0 și determină câte au fost pozitive."
      }
    ],
    medium: [
      {
        title: "Minimul și Maximul din flux",
        url: "https://www.pbinfo.ro/probleme/346/minmax-sir",
        desc: "Determină elementul minim și cel maxim dintr-un flux fără a memora șirul."
      }
    ],
    hard: [
      {
        title: "Numărare perechi cu proprietăți",
        url: "https://www.pbinfo.ro/probleme/2951/perechi-consecutive",
        desc: "Determină câte perechi de numere consecutive citite au proprietatea că au același număr de divizori."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 8
            }
          ],
          "inlineVal": "stream: {4, -2, 7, 0}"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
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
              "line": 9
            }
          ],
          "inlineVal": "sum: 0"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 0,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 10
            }
          ],
          "inlineVal": "count: 0"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 4,
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
          "inlineVal": "x: 4"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 4,
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
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 4,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 16
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 4,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 17
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": -2,
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
          "inlineVal": "x: -2"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": -2,
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
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": -2,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 16
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 7,
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
          "inlineVal": "x: 7"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 7,
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
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 4,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 7,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 16
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 11,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 7,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 17
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 11,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "x",
              "type": "int",
              "val": 7,
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
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 11,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "x",
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
          "inlineVal": "x: 0"
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 11,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "x",
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 11,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "x",
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
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "stream",
              "type": "std::vector<int>",
              "val": "{4, -2, 7, 0}",
              "expandable": true
            },
            {
              "name": "sum",
              "type": "int",
              "val": 11,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 2,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 22
            }
          ],
          "inlineVal": null
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 8 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "8": "stream: {4, -2, 7, 0}"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 0"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 0",
          "10": "count: 0"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 0",
          "10": "count: 0",
          "12": "x: 4"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 0",
          "10": "count: 0",
          "12": "x: 4"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 0",
          "10": "count: 0",
          "12": "x: 4"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 0",
          "12": "x: 4"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: 4"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: -2"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: -2"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: -2"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: 7"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: 7"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 4",
          "10": "count: 1",
          "12": "x: 7"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 11",
          "10": "count: 1",
          "12": "x: 7"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 11",
          "10": "count: 2",
          "12": "x: 7"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 11",
          "10": "count: 2",
          "12": "x: 0"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 11",
          "10": "count: 2",
          "12": "x: 0"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 11",
          "10": "count: 2",
          "12": "x: 0"
        },
        {
          "8": "stream: {4, -2, 7, 0}",
          "9": "sum: 11",
          "10": "count: 2"
        }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
}
;
