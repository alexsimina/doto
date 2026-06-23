export const data = {
  presentation: "### Tipuri de Date Neomogene (Structs)\n\nO structură (`struct`) în C++ este un tip de date definit de utilizator care permite gruparea mai multor variabile de tipuri diferite (neomogene) sub același nume. Variabilele din interiorul structurii sunt numite **membri** sau **câmpuri**.\n\nSpre deosebire de un vector sau un tablou, unde toate elementele au același tip, o structură poate conține simultan numere întregi, caractere, șiruri de caractere sau chiar alte structuri. Acest lucru este extrem de util pentru a modela obiecte din lumea reală (cum ar fi un student, un punct în plan tridimensional sau o tranzacție bancară).",
  complexity: "### Complexitate\n\n- **Timp:** Accesul la orice membru al unei structuri se realizează în $O(1)$ prin intermediul operatorului punct (`.`).\n- **Spațiu:** Dimensiunea unei structuri în memorie este, în general, suma dimensiunilor membrilor săi (plus posibile spații de umplere - *padding* - adăugate automat de compilator pentru alinierea memoriei).",
  variations: "### Variații și Cazuri Particulare\n\n- **Vector de structuri**: Putem declara tablouri sau vectori STL de structuri pentru a menține liste de înregistrări.\n- **Supraîncărcarea operatorilor**: Putem defini operatori personalizați în structură (de exemplu, operatorul `<`) pentru a permite sortarea automată a elementelor cu `std::sort`.\n- **Constructori**: Putem adăuga constructori în interiorul structurii pentru o inițializare rapidă a câmpurilor: `Student(string n, int g) : name(n), grade(g) {}`.",
  applications: "### Aplicații Reale\n\n- Reprezentarea punctelor în spațiu bidimensional sau tridimensional în grafică computerizată ($x, y, z$).\n- Stocarea nodurilor și a costurilor în algoritmi de drum minim (cum ar fi stocarea unei stări `(nod, cost)` în coada de priorități pentru Dijkstra).\n- Baze de date mici stocate în memorie (de exemplu, catalogul unei școli, stocul unui magazin).",
  code: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Student {
    string name;
    int grade;
};

int main() {
    Student s1;
    s1.name = "Alex";
    s1.grade = 9;
    
    Student s2;
    s2.name = "Maria";
    s2.grade = 10;
    
    vector<Student> classList;
    classList.push_back(s1);
    classList.push_back(s2);
    
    int maxGrade = classList[0].grade;
    string topStudent = classList[0].name;
    
    for (int i = 1; i < classList.size(); i++) {
        if (classList[i].grade > maxGrade) {
            maxGrade = classList[i].grade;
            topStudent = classList[i].name;
        }
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 13,
      text: "Declarăm variabila $s1$ de tipul `Student`.",
      blocksVisual: [
        {
          "label": "Student s1",
          "groups": [
            [
              {
                "val": "name: \"\"",
                "active": true
              },
              {
                "val": "grade: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Atribuim valoarea `\"Alex\"` membrului $name$ al structurii $s1$.",
      blocksVisual: [
        {
          "label": "Student s1",
          "groups": [
            [
              {
                "val": "name: \"Alex\"",
                "active": true
              },
              {
                "val": "grade: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Atribuim valoarea $9$ membrului $grade$ al structurii $s1$.",
      blocksVisual: [
        {
          "label": "Student s1",
          "groups": [
            [
              {
                "val": "name: \"Alex\""
              },
              {
                "val": "grade: 9",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Declarăm variabila $s2$ de tipul `Student`.",
      blocksVisual: [
        {
          "label": "Student s2",
          "groups": [
            [
              {
                "val": "name: \"\"",
                "active": true
              },
              {
                "val": "grade: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Setăm numele studentului $s2$ ca fiind `\"Maria\"`.",
      blocksVisual: [
        {
          "label": "Student s2",
          "groups": [
            [
              {
                "val": "name: \"Maria\"",
                "active": true
              },
              {
                "val": "grade: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Setăm nota studentului $s2$ ca fiind $10$.",
      blocksVisual: [
        {
          "label": "Student s2",
          "groups": [
            [
              {
                "val": "name: \"Maria\""
              },
              {
                "val": "grade: 10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 21,
      text: "Declarăm un vector $classList$ capabil să stocheze elemente de tipul `Student`.",
      blocksVisual: [
        {
          "label": "Listă Clasă",
          "groups": [
            [
              {
                "val": "classList: []",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Adăugăm studentul $s1$ la finalul vectorului $classList$.",
      blocksVisual: [
        {
          "label": "Listă Clasă",
          "groups": [
            [
              {
                "val": "[0]: {Alex, 9}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Adăugăm studentul $s2$ la finalul vectorului.",
      blocksVisual: [
        {
          "label": "Listă Clasă",
          "groups": [
            [
              {
                "val": "[0]: {Alex, 9}"
              },
              {
                "val": "[1]: {Maria, 10}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 25,
      text: "Inițializăm nota maximă cu nota primului student din listă: $maxGrade = 9$.",
      blocksVisual: [
        {
          "label": "Maxim",
          "groups": [
            [
              {
                "val": "maxGrade = 9",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 26,
      text: "Inițializăm numele studentului eminent cu cel al primului student: `topStudent = \"Alex\"`.",
      blocksVisual: [
        {
          "label": "Top Student",
          "groups": [
            [
              {
                "val": "topStudent = \"Alex\"",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 28,
      text: "Începem parcurgerea clasei de la indexul $i = 1$.",
      blocksVisual: [
        {
          "label": "Index parcurgere",
          "groups": [
            [
              {
                "val": "i = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 29,
      text: "Verificăm dacă nota studentului curent ($10$) este mai mare decât $maxGrade$ ($9$).",
      blocksVisual: [
        {
          "label": "Verificare",
          "groups": [
            [
              {
                "val": "10 > 9 ? Da",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 30,
      text: "Actualizăm nota maximă: $maxGrade = 10$.",
      blocksVisual: [
        {
          "label": "Maxim actualizat",
          "groups": [
            [
              {
                "val": "maxGrade = 10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 31,
      text: "Actualizăm numele studentului eminent: topStudent = \"Maria\".",
      blocksVisual: [
        {
          "label": "Top Student actualizat",
          "groups": [
            [
              {
                "val": "topStudent = \"Maria\"",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 28,
      text: "Incrementăm $i$ la $2$. Condiția devine falsă. Ieșim din buclă.",
      blocksVisual: [
        {
          "label": "Condiție buclă",
          "groups": [
            [
              {
                "val": "2 < 2 ? Fals",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 35,
      text: "Finalizăm programul cu succes, având determinat studentul eminent: Maria cu nota 10.",
      blocksVisual: [
        {
          "label": "Rezultate Finale",
          "groups": [
            [
              {
                "val": "topStudent = \"Maria\""
              },
              {
                "val": "maxGrade = 10"
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
        title: "Puncte 2D",
        url: "https://www.pbinfo.ro/probleme/2311/puncte",
        desc: "Definește o structură pentru un punct în plan și calculează distanța dintre două puncte."
      }
    ],
    medium: [
      {
        title: "Catalog Elevi",
        url: "https://www.pbinfo.ro/probleme/3233/sortare-elevi",
        desc: "Stochează datele mai multor elevi într-un vector de structuri și sortează-i după medie."
      }
    ],
    hard: [
      {
        title: "Complex Numbers",
        url: "https://www.pbinfo.ro/probleme/2324/numere-complexe",
        desc: "Implementează o structură pentru numere complexe și operațiile matematice elementare pe acestea."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"\", grade: 0}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 13
            }
          ],
          "inlineVal": "s1: {name: \"\", grade: 0}"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 0}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 14
            }
          ],
          "inlineVal": "s1: {name: \"Alex\", grade: 0}"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 15
            }
          ],
          "inlineVal": "s1: {name: \"Alex\", grade: 9}"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"\", grade: 0}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 17
            }
          ],
          "inlineVal": "s2: {name: \"\", grade: 0}"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 0}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 18
            }
          ],
          "inlineVal": "s2: {name: \"Maria\", grade: 0}"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 19
            }
          ],
          "inlineVal": "s2: {name: \"Maria\", grade: 10}"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[]",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 21
            }
          ],
          "inlineVal": "classList: []"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}]",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 22
            }
          ],
          "inlineVal": "classList: [{name: \"Alex\", grade: 9}]"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 23
            }
          ],
          "inlineVal": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 9,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 25
            }
          ],
          "inlineVal": "maxGrade: 9"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 9,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Alex\"",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 26
            }
          ],
          "inlineVal": "topStudent: \"Alex\""
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 9,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Alex\"",
              "expandable": false
            },
            {
              "name": "i",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 28
            }
          ],
          "inlineVal": "i: 1"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 9,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Alex\"",
              "expandable": false
            },
            {
              "name": "i",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 29
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Alex\"",
              "expandable": false
            },
            {
              "name": "i",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 30
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Maria\"",
              "expandable": false
            },
            {
              "name": "i",
              "type": "int",
              "val": 1,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 31
            }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Maria\"",
              "expandable": false
            },
            {
              "name": "i",
              "type": "int",
              "val": 2,
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 28
            }
          ],
          "inlineVal": "i: 2"
        },
        {
          "vars": [
            {
              "name": "s1",
              "type": "Student",
              "val": "{name: \"Alex\", grade: 9}",
              "expandable": true
            },
            {
              "name": "s2",
              "type": "Student",
              "val": "{name: \"Maria\", grade: 10}",
              "expandable": true
            },
            {
              "name": "classList",
              "type": "std::vector<Student>",
              "val": "[{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
              "expandable": true
            },
            {
              "name": "maxGrade",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "topStudent",
              "type": "std::string",
              "val": "\"Maria\"",
              "expandable": false
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 35
            }
          ],
          "inlineVal": null
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 13 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "13": "s1: {name: \"\", grade: 0}"
        },
        {
          "14": "s1: {name: \"Alex\", grade: 0}"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "17": "s2: {name: \"\", grade: 0}"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "18": "s2: {name: \"Maria\", grade: 0}"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "21": "classList: []"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "22": "classList: [{name: \"Alex\", grade: 9}]"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 9"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 9",
          "26": "topStudent: \"Alex\""
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 9",
          "26": "topStudent: \"Alex\"",
          "28": "i: 1"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 9",
          "26": "topStudent: \"Alex\"",
          "28": "i: 1"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 10",
          "26": "topStudent: \"Alex\"",
          "28": "i: 1"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 10",
          "26": "topStudent: \"Maria\"",
          "28": "i: 1"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 10",
          "26": "topStudent: \"Maria\"",
          "28": "i: 2"
        },
        {
          "15": "s1: {name: \"Alex\", grade: 9}",
          "19": "s2: {name: \"Maria\", grade: 10}",
          "23": "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]",
          "25": "maxGrade: 10",
          "26": "topStudent: \"Maria\""
        }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
}
;
