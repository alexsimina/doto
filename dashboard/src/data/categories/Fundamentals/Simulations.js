export const data = {
  presentation: "### Simulări\n\n**Simularea** este o tehnică de rezolvare a problemelor în care modelăm pas cu pas procesul descris, urmărind îndeaproape regulile jocului sau ale sistemului. Spre deosebire de alte categorii unde căutăm formule matematice directe sau algoritmi complecși, la simulări accentul cade pe corectitudinea implementării tuturor stărilor și tranzițiilor.\n\nUn exemplu clasic de simulare este deplasarea unui robot sau a unui personaj pe o grilă bidimensională de dimensiune $N \\times M$ în funcție de un set de comenzi primite.",
  complexity: "### Complexitate\n\n- **Timp:** $O(S)$ - unde $S$ este numărul total de pași sau comenzi simulate. Dacă fiecare pas se procesează în timp constant, timpul total este liniar în raport cu numărul de stări.\n- **Spațiu:** $O(1)$ sau $O(N \\times M)$ - în funcție de necesitatea de a stoca întreaga stare a grilei/matricei în memorie.",
  variations: "### Variații și Cazuri Particulare\n\n- **Ieșirea din limite**: La simulări pe grilă, este critic să verificăm dacă coordonatele viitoare depășesc marginile matricei ($0 \\le row < N$ și $0 \\le col < M$).\n- **Simulări Ciclicce**: Obiectul reintră prin partea opusă a ecranului (lume de tip toroidal).\n- **Jocul Vieții (Conway's Game of Life)**: Simularea unei întregi populații de celule pe baza stării vecinilor lor.",
  applications: "### Aplicații Reale\n\n- Modelarea fluxului de trafic în orașe sau rețele de calculatoare.\n- Dezvoltarea motoarelor fizice pentru jocuri video (simularea gravitației, coliziunilor).\n- Simularea comportamentului rețelelor neuronale sau a proceselor economice.",
  code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    // Coordonatele initiale ale robotului pe o matrice 3x3
    int row = 1;
    int col = 1;
    
    // Comenzi de miscare
    string commands = "RULD";
    
    for (char cmd : commands) {
        if (cmd == 'U' && row > 0) {
            row--;
        } else if (cmd == 'D' && row < 2) {
            row++;
        } else if (cmd == 'L' && col > 0) {
            col--;
        } else if (cmd == 'R' && col < 2) {
            col++;
        }
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 9,
      text: "Inițializăm linia de pornire a robotului: $row = 1$ (centrul unei matrice $3 \\times 3$).",
      blocksVisual: [
        {
          "label": "Poziție Robot",
          "groups": [
            [
              {
                "val": "row = 1",
                "active": true
              },
              {
                "val": "col = ?"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 10,
      text: "Inițializăm coloana de pornire a robotului: $col = 1$.",
      blocksVisual: [
        {
          "label": "Poziție Robot",
          "groups": [
            [
              {
                "val": "row = 1"
              },
              {
                "val": "col = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Definim șirul de comenzi de mișcare: $commands = \"RULD\"$ (Dreapta, Sus, Stânga, Jos).",
      blocksVisual: [
        {
          "label": "Comenzi de rulat",
          "groups": [
            [
              {
                "val": "R",
                "active": true
              },
              {
                "val": "U"
              },
              {
                "val": "L"
              },
              {
                "val": "D"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Citim comanda: $cmd = 'R'$.",
      blocksVisual: [
        {
          "label": "Comandă curentă",
          "groups": [
            [
              {
                "val": "cmd = 'R'",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm `cmd == 'U' && row > 0`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'U' ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Verificăm `cmd == 'D' && row < 2`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'D' ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Verificăm `cmd == 'L' && col > 0`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'L' ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Verificăm `cmd == 'R' && col < 2`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'R' ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Mutăm robotul la dreapta prin incrementarea coloanei: $col = 2$.",
      blocksVisual: [
        {
          "label": "Poziție Robot",
          "groups": [
            [
              {
                "val": "row = 1"
              },
              {
                "val": "col = 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Citim comanda: $cmd = 'U'$.",
      blocksVisual: [
        {
          "label": "Comandă curentă",
          "groups": [
            [
              {
                "val": "cmd = 'U'",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm `cmd == 'U' && row > 0`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'U' ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Mutăm robotul în sus prin decrementarea liniei: $row = 0$.",
      blocksVisual: [
        {
          "label": "Poziție Robot",
          "groups": [
            [
              {
                "val": "row = 0",
                "active": true
              },
              {
                "val": "col = 2"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Citim comanda: $cmd = 'L'$.",
      blocksVisual: [
        {
          "label": "Comandă curentă",
          "groups": [
            [
              {
                "val": "cmd = 'L'",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm `cmd == 'U' && row > 0`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'U' ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Verificăm `cmd == 'D' && row < 2`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'D' ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Verificăm `cmd == 'L' && col > 0`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'L' ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 21,
      text: "Mutăm robotul la stânga prin decrementarea coloanei: $col = 1$.",
      blocksVisual: [
        {
          "label": "Poziție Robot",
          "groups": [
            [
              {
                "val": "row = 0"
              },
              {
                "val": "col = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Citim comanda: $cmd = 'D'$.",
      blocksVisual: [
        {
          "label": "Comandă curentă",
          "groups": [
            [
              {
                "val": "cmd = 'D'",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm `cmd == 'U' && row > 0`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'U' ? Nu",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Verificăm `cmd == 'D' && row < 2`.",
      blocksVisual: [
        {
          "label": "Verificare mișcare",
          "groups": [
            [
              {
                "val": "cmd == 'D' ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Mutăm robotul în jos prin incrementarea liniei: $row = 1$.",
      blocksVisual: [
        {
          "label": "Poziție Robot",
          "groups": [
            [
              {
                "val": "row = 1",
                "active": true
              },
              {
                "val": "col = 1"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 27,
      text: "Finalizăm simularea cu robotul revenit la poziția de start $(1, 1)$.",
      blocksVisual: [
        {
          "label": "Poziție Finală",
          "groups": [
            [
              {
                "val": "row = 1"
              },
              {
                "val": "col = 1"
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
        title: "Robot",
        url: "https://www.pbinfo.ro/probleme/2318/robot1",
        desc: "Simulează deplasarea unui robot pe o grilă conform unui set simplu de comenzi."
      }
    ],
    medium: [
      {
        title: "Spirală Matrice",
        url: "https://www.pbinfo.ro/probleme/208/spirala",
        desc: "Parcurge și afișează o matrice în formă de spirală."
      }
    ],
    hard: [
      {
        title: "Jocul Vieții",
        url: "https://leetcode.com/problems/game-of-life/",
        desc: "Simulează evoluția celulelor conform regulilor Conway pe o matrice 2D."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
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
          "inlineVal": "row: 1"
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
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
          "inlineVal": "col: 1"
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
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
          "inlineVal": "commands: \"RULD\""
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'R'",
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
          "inlineVal": "cmd: 'R'"
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'R'",
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
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'R'",
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
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'R'",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 20
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'R'",
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
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'R'",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 23
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'U'",
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
          "inlineVal": "cmd: 'U'"
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'U'",
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
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'U'",
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
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'L'",
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
          "inlineVal": "cmd: 'L'"
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'L'",
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
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'L'",
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
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 2,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'L'",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 20
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'L'",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 21
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'D'",
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
          "inlineVal": "cmd: 'D'"
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'D'",
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
              "name": "row",
              "type": "int",
              "val": 0,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'D'",
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
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            },
            {
              "name": "cmd",
              "type": "char",
              "val": "'D'",
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
        },
        {
          "vars": [
            {
              "name": "row",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "col",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "commands",
              "type": "std::string",
              "val": "\"RULD\"",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 27
            }
          ],
          "inlineVal": null
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 9 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "9": "row: 1"
        },
        {
          "9": "row: 1",
          "10": "col: 1"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\""
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'R'"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'R'"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'R'"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'R'"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'R'"
        },
        {
          "9": "row: 1",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'R'"
        },
        {
          "9": "row: 1",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'U'"
        },
        {
          "9": "row: 1",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'U'"
        },
        {
          "9": "row: 0",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'U'"
        },
        {
          "9": "row: 0",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'L'"
        },
        {
          "9": "row: 0",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'L'"
        },
        {
          "9": "row: 0",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'L'"
        },
        {
          "9": "row: 0",
          "10": "col: 2",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'L'"
        },
        {
          "9": "row: 0",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'L'"
        },
        {
          "9": "row: 0",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'D'"
        },
        {
          "9": "row: 0",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'D'"
        },
        {
          "9": "row: 0",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'D'"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\"",
          "15": "cmd: 'D'"
        },
        {
          "9": "row: 1",
          "10": "col: 1",
          "13": "commands: \"RULD\""
        }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
}
;
