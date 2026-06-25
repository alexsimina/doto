export const data = {
  presentation: "### Introducere în STL\n\n**STL** (*Standard Template Library*) este o parte fundamentală a limbajului C++ care pune la dispoziție structuri de date și algoritmi gata implementați, extrem de eficienți. Cele mai frecvent utilizate containere de bază sunt:\n\n1. **`std::vector`**: Tablou dinamic care își modifică dimensiunea automat. Permite accesul în timp $O(1)$ la orice element.\n2. **`std::pair`**: Structură simplă care grupează două valori ce pot avea tipuri diferite. Valorile sunt accesibile prin membrii `.first` și `.second`.\n3. **`std::set`**: Colecție ordonată de elemente unice. Inserarea, căutarea și ștergerea se realizează în timp logaritmic, adică $O(\\log N)$.\n4. **`std::map`**: Tablou asociativ care stochează perechi cheie-valoare. Cheile sunt unice și ordonate. Căutarea după cheie se face în $O(\\log N)$.",
  complexity: "### Complexitate\n\n- **`std::vector`**:\n  - Acces indexat: $O(1)$.\n  - Inserare la sfârșit (`push_back`): $O(1)$ amortizat.\n- **`std::set` și `std::map`**:\n  - Inserare / Căutare / Ștergere: $O(\\log N)$ (unde $N$ este numărul de elemente).\n- **`std::pair`**:\n  - Creare și accesare: $O(1)$.",
  variations: "### Variații și Cazuri Particulare\n\n- **Containere Neordonate (`unordered_set`, `unordered_map`)**: Sunt implementate folosind tabele de dispersie (*hash tables*). Oferă un timp mediu de căutare și inserare de $O(1)$, însă elementele nu mai sunt stocate în ordine.\n- **`std::multiset` și `std::multimap`**: Variații care permit stocarea de elemente/chei duplicate, menținându-le în continuare ordonate.",
  applications: "### Aplicații Reale\n\n- **`vector`**: Stocarea listelor dinamice de utilizatori, produse sau scoruri în jocuri.\n- **`pair`**: Reprezentarea coordonatelor carteziene $(x, y)$ sau a costurilor asociate unor muchii în grafuri ponderate: `pair<int, int>`.\n- **`set`**: Eliminarea rapidă a duplicatelor dintr-un șir masiv de date.\n- **`map`**: Numărarea frecvenței de apariție a cuvintelor dintr-un text generos.",
  code: `#include <iostream>
#include <vector>
#include <utility>
#include <set>
#include <map>

using namespace std;

int main() {
    // 1. Vector
    vector<int> v;
    v.push_back(10);
    
    // 2. Pair
    pair<int, string> p = {1, "unu"};
    
    // 3. Set
    set<int> s;
    s.insert(5);
    s.insert(5);
    
    // 4. Map
    map<string, int> m;
    m["mere"] = 3;
    
    int val = v[0];
    int count = s.size();
    int mere_count = m["mere"];
    
    return 0;
}
`,
  explanations: [
    {
      line: 11,
      text: "Declarăm un vector de numere întregi $v$ din STL. În acest moment vectorul este dinamic și complet gol.",
      blocksVisual: [
        {
          "label": "Vector v",
          "groups": [
            [
              {
                "val": "v: []",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Adăugăm elementul $10$ la finalul vectorului folosind `push_back`. Dimensiunea vectorului devine 1, iar elementul de la indexul 0 este 10.",
      blocksVisual: [
        {
          "label": "Vector v",
          "groups": [
            [
              {
                "val": "10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Inițializăm perechea $p$ (de tip `std::pair`) ce grupează două tipuri diferite: primul câmp `.first` are valoarea $1$, iar al doilea câmp `.second` are valoarea `\"unu\"`.",
      blocksVisual: [
        {
          "label": "Pereche p",
          "groups": [
            [
              {
                "val": "first: 1",
                "active": true
              },
              {
                "val": "second: \"unu\"",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Declarăm o mulțime ordonată $s$ (de tip `std::set`) pentru a păstra elemente unice. Setul este inițial gol.",
      blocksVisual: [
        {
          "label": "Mulțime s",
          "groups": [
            [
              {
                "val": "s: {}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Inserăm valoarea $5$ în mulțime. Elementele din `std::set` sunt sortate automat crescător.",
      blocksVisual: [
        {
          "label": "Mulțime s",
          "groups": [
            [
              {
                "val": "5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Încercăm să inserăm din nou valoarea $5$. Deoarece elementele într-un `std::set` sunt unice, duplicatul este respins, iar mulțimea rămâne $\\{5\\}$.",
      blocksVisual: [
        {
          "label": "Mulțime s (ignorat duplicat)",
          "groups": [
            [
              {
                "val": "5"
              }
            ]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Declarăm un dicționar $m$ (`std::map`) ce asociază chei de tip șir de caractere (string) cu valori întregi (int). Momentan este gol.",
      blocksVisual: [
        {
          "label": "Dicționar m",
          "groups": [
            [
              {
                "val": "m: {}",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 24,
      text: "Asociem cheii `\"mere\"` valoarea $3$ prin `m[\"mere\"] = 3`. Cheia este creată și valoarea este stocată în map.",
      blocksVisual: [
        {
          "label": "Dicționar m",
          "groups": [
            [
              {
                "val": "\"mere\" -> 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 26,
      text: "Accesăm prin indexare în timp constant primul element din vector: $v[0] = 10$. Valoarea este salvată în variabila $val$.",
      blocksVisual: [
        {
          "label": "Citire Vector",
          "groups": [
            [
              {
                "val": "val = 10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 27,
      text: "Obținem numărul de elemente din setul $s$ folosind `size()`. Dimensiunea este $1$ deoarece duplicatul introdus anterior a fost ignorat.",
      blocksVisual: [
        {
          "label": "Dimensiune Mulțime",
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
      line: 28,
      text: "Căutăm în map valoarea asociată cheii `\"mere\"` folosind cheia ca index. Găsim valoarea stocată $3$.",
      blocksVisual: [
        {
          "label": "Citire Dicționar",
          "groups": [
            [
              {
                "val": "mere_count = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      line: 30,
      text: "Programul se încheie cu succes. Containerele din STL ne permit să scriem cod extrem de rapid și bine optimizat.",
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
        title: "Perechi Elementare",
        url: "https://www.pbinfo.ro/probleme/2312/pereche",
        desc: "Folosește std::pair pentru a stoca și manipula perechi de date."
      }
    ],
    medium: [
      {
        title: "Verificare Duplicate",
        url: "https://www.pbinfo.ro/probleme/3079/elemente-distincte",
        desc: "Folosește std::set pentru a număra rapid elementele unice dintr-un șir dat."
      }
    ],
    hard: [
      {
        title: "Frecvența Cuvintelor",
        url: "https://www.pbinfo.ro/probleme/2784/frecventa-cuvinte",
        desc: "Folosește std::map pentru a ordona cuvintele primite după frecvență sau alfabetic."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[]",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 11
            }
          ],
          "inlineVal": "v: []"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 12
            }
          ],
          "inlineVal": "v: [10]"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
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
          "inlineVal": "p: {first: 1, second: \"unu\"}"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{}",
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
          "inlineVal": "s: {}"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
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
          "inlineVal": "s: {5}"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
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
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
            },
            {
              "name": "m",
              "type": "std::map<string, int>",
              "val": "{}",
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
          "inlineVal": "m: {}"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
            },
            {
              "name": "m",
              "type": "std::map<string, int>",
              "val": "{\"mere\": 3}",
              "expandable": true
            }
          ],
          "frames": [
            {
              "name": "main()",
              "file": "main.cpp",
              "line": 24
            }
          ],
          "inlineVal": "m: {\"mere\": 3}"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
            },
            {
              "name": "m",
              "type": "std::map<string, int>",
              "val": "{\"mere\": 3}",
              "expandable": true
            },
            {
              "name": "val",
              "type": "int",
              "val": 10,
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
          "inlineVal": "val: 10"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
            },
            {
              "name": "m",
              "type": "std::map<string, int>",
              "val": "{\"mere\": 3}",
              "expandable": true
            },
            {
              "name": "val",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
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
          "inlineVal": "count: 1"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
            },
            {
              "name": "m",
              "type": "std::map<string, int>",
              "val": "{\"mere\": 3}",
              "expandable": true
            },
            {
              "name": "val",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "mere_count",
              "type": "int",
              "val": 3,
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
          "inlineVal": "mere_count: 3"
        },
        {
          "vars": [
            {
              "name": "v",
              "type": "std::vector<int>",
              "val": "[10]",
              "expandable": true
            },
            {
              "name": "p",
              "type": "std::pair<int, string>",
              "val": "{first: 1, second: \"unu\"}",
              "expandable": true
            },
            {
              "name": "s",
              "type": "std::set<int>",
              "val": "{5}",
              "expandable": true
            },
            {
              "name": "m",
              "type": "std::map<string, int>",
              "val": "{\"mere\": 3}",
              "expandable": true
            },
            {
              "name": "val",
              "type": "int",
              "val": 10,
              "expandable": false
            },
            {
              "name": "count",
              "type": "int",
              "val": 1,
              "expandable": false
            },
            {
              "name": "mere_count",
              "type": "int",
              "val": 3,
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
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 11 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        {
          "11": "v: []"
        },
        {
          "12": "v: [10]"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "18": "s: {}"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}",
          "23": "m: {}"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}",
          "24": "m: {\"mere\": 3}"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}",
          "24": "m: {\"mere\": 3}",
          "26": "val: 10"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}",
          "24": "m: {\"mere\": 3}",
          "26": "val: 10",
          "27": "count: 1"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}",
          "24": "m: {\"mere\": 3}",
          "26": "val: 10",
          "27": "count: 1",
          "28": "mere_count: 3"
        },
        {
          "12": "v: [10]",
          "15": "p: {first: 1, second: \"unu\"}",
          "19": "s: {5}",
          "24": "m: {\"mere\": 3}",
          "26": "val: 10",
          "27": "count: 1",
          "28": "mere_count: 3"
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
