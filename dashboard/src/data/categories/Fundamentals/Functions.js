export const data = {
  presentation: "### Funcții și Transmiterea Parametrilor\n\nFuncțiile sunt blocuri de cod reutilizabile concepute pentru a îndeplini o singură sarcină specifică. Modularizarea programelor prin funcții face codul mai ușor de citit și depanat.\n\nÎn C++, transmiterea parametrilor către funcții se poate face în două moduri principale:\n\n1. **Transmitere prin valoare (Call by Value)**: Se creează o copie a variabilei transmise. Modificările din interiorul funcției afectează doar copia locală.\n2. **Transmitere prin referință (Call by Reference)**: Se transmite o referință (folosind operatorul `&`) către variabila originală. Orice modificare adusă parametrului în funcție afectează direct variabila din apelant.\n\nPentru structurile mari de date (cum ar fi `std::vector` sau `std::string`), transmiterea prin valoare generează o copiere costisitoare de timp $O(N)$. Din acest motiv, se recomandă transmiterea prin referință constantă: `const vector<int> &v`.",
  complexity: "### Complexitate\n\n- **Timp:** \n  - Transmitere prin valoare pentru tipuri simple (int, char): $O(1)$.\n  - Transmitere prin valoare pentru un vector de dimensiune $N$: $O(N)$ (datorită copierii).\n  - Transmitere prin referință (chiar și pentru vectori mari): $O(1)$ (se transmite doar adresa de memorie).\n- **Spațiu:** $O(1)$ spațiu suplimentar (se folosește stiva pentru a reține adresa de retur și variabilele locale).",
  variations: "### Variații și Cazuri Particulare\n\n- **Referințe constante (`const Type &`)**: Permite transmiterea rapidă fără copiere (ca o referință normală), dar previne modificarea accidentală a datelor în interiorul funcției.\n- **Transmitere prin pointeri**: Metodă moștenită din limbajul C (`void increment(int* p)`), unde se folosește adresa explicită a variabilei și operatorul de dereferențiere `*`.",
  applications: "### Aplicații Reale\n\n- Modularizarea corectă a oricărui software complex.\n- Algoritmi recursivi (cum ar fi sortările rapide sau parcurgerile de grafuri DFS/BFS) unde funcțiile se autoapelează pe subprobleme.\n- Transmiterea eficientă a containerelor STL voluminoase în bibliotecile software.",
  code: `#include <iostream>

using namespace std;

// Transmitere prin valoare
void incrementByValue(int x) {
    x++;
}

// Transmitere prin referinta
void incrementByReference(int &x) {
    x++;
}

int main() {
    int a = 5;
    int b = 5;
    
    incrementByValue(a);
    incrementByReference(b);
    
    return 0;
}
`,
  explanations: [
    {
      line: 16,
      text: "Inițializăm variabila locală $a = 5$ în funcția main. Valoarea ei va fi transmisă ulterior prin valoare.",
      blocksVisual: [
        {
          "label": "Funcția main",
          "groups": [
            [
              {
                "val": "a = 5",
                "active": true
              },
              {
                "val": "b = ?"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Inițializăm variabila locală $b = 5$ în main. Aceasta va fi transmisă ulterior prin referință.",
      blocksVisual: [
        {
          "label": "Funcția main",
          "groups": [
            [
              {
                "val": "a = 5"
              },
              {
                "val": "b = 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Apelăm funcția `incrementByValue(a)`. Deoarece transmiterea este prin valoare, programul va copia valoarea lui $a$ pe stivă.",
      blocksVisual: [
        {
          "label": "Apel incrementByValue",
          "groups": [
            [
              {
                "val": "a = 5 (în main)"
              }
            ],
            [
              {
                "val": "Parametru x = 5 (copie pe stivă)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 6,
      text: "Suntem acum în interiorul funcției `incrementByValue`. Parametrul $x$ are valoarea copiată $5$.",
      blocksVisual: [
        {
          "label": "În incrementByValue",
          "groups": [
            [
              {
                "val": "x = 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 7,
      text: "Incrementăm variabila locală $x$ din funcție. $x$ devine $6$. Observăm că valoarea originală $a$ din main rămâne neschimbată.",
      blocksVisual: [
        {
          "label": "În incrementByValue",
          "groups": [
            [
              {
                "val": "x = 6",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Funcția `incrementByValue` se încheie. Copia locală $x$ este ștearsă din memorie, iar controlul revine în main.",
      blocksVisual: [
        {
          "label": "Revenire în main",
          "groups": [
            [
              {
                "val": "a = 5",
                "active": true
              }
            ],
            [
              {
                "val": "b = 5"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Apelăm `incrementByReference(b)`. Deoarece parametrul este transmis prin referință (folosind &), nu se face o copie, ci se lucrează direct pe variabila originală $b$.",
      blocksVisual: [
        {
          "label": "Apel incrementByReference",
          "groups": [
            [
              {
                "val": "b = 5 (în main)"
              }
            ],
            [
              {
                "val": "Referința x pointează direct la b",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Intrăm în funcția `incrementByReference`. Parametrul $x$ este o referință (un alias sau o poreclă) pentru variabila originală $b$ din main.",
      blocksVisual: [
        {
          "label": "În incrementByReference",
          "groups": [
            [
              {
                "val": "x (alias pentru b) = 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Incrementăm valoarea referită de $x$. Deoarece $x$ este legat direct de variabila $b$ din main, valoarea lui $b$ devine direct $6$ în memorie.",
      blocksVisual: [
        {
          "label": "În incrementByReference",
          "groups": [
            [
              {
                "val": "x (alias pentru b) = 6",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Funcția `incrementByReference` se încheie. Referința $x$ este eliminată, iar execuția continuă în main.",
      blocksVisual: [
        {
          "label": "Revenire în main",
          "groups": [
            [
              {
                "val": "a = 5"
              }
            ],
            [
              {
                "val": "b = 6",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Programul se finalizează cu succes. Se observă cum $a$ a rămas cu valoarea inițială $5$, în timp ce $b$ a fost modificat cu succes la $6$ prin referință.",
      blocksVisual: [
        {
          "label": "Stare Finală",
          "groups": [
            [
              {
                "val": "a = 5"
              }
            ],
            [
              {
                "val": "b = 6"
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
        title: "Funcție de Max",
        url: "https://www.pbinfo.ro/probleme/23/max2",
        desc: "Definește o funcție simplă care returnează maximul dintre două numere."
      }
    ],
    medium: [
      {
        title: "Permutarea a două valori (Swap)",
        url: "https://www.pbinfo.ro/probleme/896/swap",
        desc: "Implementează o funcție care interschimbă valorile a două variabile folosind referințe."
      }
    ],
    hard: [
      {
        title: "Funcții recursive pe tablouri",
        url: "https://www.pbinfo.ro/probleme/823/sumrec",
        desc: "Implementează o funcție recursivă pentru a calcula suma elementelor unui vector."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [
            {
              "name": "a",
              "type": "int",
              "val": 5,
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
          "inlineVal": "a: 5"
        },
        {
          "vars": [
            {
              "name": "a",
              "type": "int",
              "val": 5,
              "expandable": false
            },
            {
              "name": "b",
              "type": "int",
              "val": 5,
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
          "inlineVal": "b: 5"
        },
        {
          "vars": [
            {
              "name": "a",
              "type": "int",
              "val": 5,
              "expandable": false
            },
            {
              "name": "b",
              "type": "int",
              "val": 5,
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
              "name": "x",
              "type": "int",
              "val": 5,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "incrementByValue(int)",
              "file": "main.cpp",
              "line": 6
            },
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 19
            }
          ],
          "inlineVal": "x: 5"
        },
        {
          "vars": [
            {
              "name": "x",
              "type": "int",
              "val": 6,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "incrementByValue(int)",
              "file": "main.cpp",
              "line": 7
            },
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 19
            }
          ],
          "inlineVal": "x: 6"
        },
        {
          "vars": [
            {
              "name": "x",
              "type": "int",
              "val": 6,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "incrementByValue(int)",
              "file": "main.cpp",
              "line": 8
            },
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
              "name": "a",
              "type": "int",
              "val": 5,
              "expandable": false
            },
            {
              "name": "b",
              "type": "int",
              "val": 5,
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
              "name": "x",
              "type": "int&",
              "val": "&b (value: 5)",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "incrementByReference(int&)",
              "file": "main.cpp",
              "line": 11
            },
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 20
            }
          ],
          "inlineVal": "x: &b (value: 5)"
        },
        {
          "vars": [
            {
              "name": "x",
              "type": "int&",
              "val": "&b (value: 6)",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "incrementByReference(int&)",
              "file": "main.cpp",
              "line": 12
            },
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 20
            }
          ],
          "inlineVal": "x: &b (value: 6)"
        },
        {
          "vars": [
            {
              "name": "x",
              "type": "int&",
              "val": "&b (value: 6)",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "incrementByReference(int&)",
              "file": "main.cpp",
              "line": 13
            },
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
              "name": "a",
              "type": "int",
              "val": 5,
              "expandable": false
            },
            {
              "name": "b",
              "type": "int",
              "val": 6,
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
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 16 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "16": "a: 5"
        },
        {
          "16": "a: 5",
          "17": "b: 5"
        },
        {
          "16": "a: 5",
          "17": "b: 5"
        },
        {
          "6": "x: 5"
        },
        {
          "7": "x: 6"
        },
        {
          "7": "x: 6"
        },
        {
          "16": "a: 5",
          "17": "b: 5"
        },
        {
          "11": "x: &b (value: 5)"
        },
        {
          "12": "x: &b (value: 6)"
        },
        {
          "12": "x: &b (value: 6)"
        },
        {
          "16": "a: 5",
          "17": "b: 6"
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
