export const data = {
  "presentation": "### Prezentare Generală\n\nUn **vector de frecvență** (sau tablou de apariții) este o structură de date extrem de simplă și eficientă folosită pentru a număra aparițiile elementelor dintr-un set de date. În loc să căutăm repetat fiecare valoare, folosim chiar valoarea elementului ca index într-un vector auxiliar $fr[x]$, unde stocăm numărul de apariții ale valorii $x$.\n\n**Sortarea prin numărare (Counting Sort)** utilizează această tehnică pentru a sorta un șir în timp liniar. În loc de a compara elementele între ele, algoritmul numără aparițiile fiecărui element în vectorul de frecvență, iar apoi reconstruiește vectorul parcurgând indicii în ordine crescătoare.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(N + K)$, unde $N$ este numărul de elemente de sortat și $K$ este plaja de valori (valoarea maximă). Dacă $K$ este relativ mic, sortarea se realizează în timp liniar, mult mai rapid decât sortările bazate pe comparare de tip $O(N \\log N)$.\n- **Spațiu:** $O(K)$ pentru stocarea vectorului de frecvență. Dacă plaja de valori este mare (de exemplu, $K \\approx 10^9$), memoria devine prohibitivă.",
  "variations": "### Variații și Edge Cases\n\n1. **Valori negative:** Dacă plaja conține valori în intervalul $[-offset, +offset]$, putem translata indicii adunând constanta $offset$ (de exemplu: $fr[valoare + offset]$).\n2. **Valori foarte mari:** Când $K$ este foarte mare, putem înlocui vectorul de frecvență cu o tabelă hash (`std::unordered_map` în C++), obținând o complexitate medie de $O(N)$, dar cu o constantă de timp mai mare.",
  "applications": "### Aplicații\n\n- Numărarea frecvenței literelor într-un text sau determinarea anagramei.\n- Găsirea elementului majoritar sau a valorilor unice dintr-un șir.\n- Sortarea rapidă a notelor elevilor la examene (plajă fixă [1..10]).",
  "code": "\n#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nvoid countingSort(vector<int>& v) {\n    if (v.empty()) return;\n    \n    // Găsim elementul maxim\n    int maxim = *max_element(v.begin(), v.end());\n    vector<int> fr(maxim + 1, 0);\n    \n    // Pasul 1: Numărarea aparițiilor\n    for (int x : v) {\n        fr[x]++;\n    }\n    \n    // Pasul 2: Reconstruirea vectorului\n    int idx = 0;\n    for (int i = 0; i <= maxim; i++) {\n        while (fr[i] > 0) {\n            v[idx++] = i;\n            fr[i]--;\n        }\n    }\n}\n\nint main() {\n    vector<int> v = {4, 1, 3, 1, 4, 1};\n    countingSort(v);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 8,
      "text": "Intrăm în funcția `countingSort` cu vectorul inițial **v = {4, 1, 3, 1, 4, 1}**. Vectorul de frecvență `fr` nu este încă creat.",
      "blocksVisual": [
        {
          "label": "Vectorul de intrare v",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "1"
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "Vectorul de frecvență fr (necreat încă)",
          "groups": [
            [
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Căutăm elementul **maxim** din vector. Parcurgem toate elementele și identificăm că valoarea maximă este **4**. Dimensiunea vectorului de frecvență va fi maxim + 1 = 5.",
      "blocksVisual": [
        {
          "label": "Vectorul v — găsim maximul (maxim = 4)",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "1"
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "Vectorul de frecvență fr (necreat încă)",
          "groups": [
            [
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              },
              {
                "val": "—",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Inițializăm vectorul de frecvență `fr` cu dimensiunea **maxim + 1 = 5**, completat cu zerouri. Indicii 0..4 corespund valorilor posibile.",
      "blocksVisual": [
        {
          "label": "Vectorul v (neschimbat)",
          "groups": [
            [
              {
                "val": "4"
              },
              {
                "val": "1"
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — inițializat cu 0",
          "groups": [
            [
              {
                "val": "0",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "0",
                "active": true
              },
              {
                "val": "0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "**Faza de numărare — v[0] = 4.** Luăm primul element din vector: valoarea **4**. Vom incrementa `fr[4]`.",
      "blocksVisual": [
        {
          "label": "Vectorul v — procesăm v[0] = 4",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              },
              {
                "val": "1"
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — stare curentă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Executăm `fr[4]++`. Frecvența valorii 4 devine **1**.",
      "blocksVisual": [
        {
          "label": "Vectorul v — v[0] procesat ✓",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1"
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[4] actualizat",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "**v[1] = 1.** Luăm al doilea element: valoarea **1**. Vom incrementa `fr[1]`.",
      "blocksVisual": [
        {
          "label": "Vectorul v — procesăm v[1] = 1",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — stare curentă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Executăm `fr[1]++`. Frecvența valorii 1 devine **1**.",
      "blocksVisual": [
        {
          "label": "Vectorul v — v[1] procesat ✓",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3"
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[1] actualizat",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "**v[2] = 3.** Luăm al treilea element: valoarea **3**. Vom incrementa `fr[3]`.",
      "blocksVisual": [
        {
          "label": "Vectorul v — procesăm v[2] = 3",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "active": true
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — stare curentă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Executăm `fr[3]++`. Frecvența valorii 3 devine **1**.",
      "blocksVisual": [
        {
          "label": "Vectorul v — v[2] procesat ✓",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1"
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[3] actualizat",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "0"
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "**v[3] = 1.** Al patrulea element: valoarea **1** (a doua apariție). Vom incrementa din nou `fr[1]`.",
      "blocksVisual": [
        {
          "label": "Vectorul v — procesăm v[3] = 1",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — stare curentă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Executăm `fr[1]++`. Frecvența valorii 1 devine **2** (am întâlnit-o a doua oară).",
      "blocksVisual": [
        {
          "label": "Vectorul v — v[3] procesat ✓",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "4"
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[1] actualizat",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "**v[4] = 4.** Al cincilea element: valoarea **4** (a doua apariție). Vom incrementa din nou `fr[4]`.",
      "blocksVisual": [
        {
          "label": "Vectorul v — procesăm v[4] = 4",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — stare curentă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Executăm `fr[4]++`. Frecvența valorii 4 devine **2**.",
      "blocksVisual": [
        {
          "label": "Vectorul v — v[4] procesat ✓",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1"
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[4] actualizat",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "**v[5] = 1.** Ultimul element: valoarea **1** (a treia apariție). Vom incrementa `fr[1]` pentru ultima dată.",
      "blocksVisual": [
        {
          "label": "Vectorul v — procesăm v[5] = 1",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — stare curentă",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "2"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Executăm `fr[1]++`. Frecvența valorii 1 devine **3**. **Faza de numărare este completă!** fr = {0, 3, 0, 1, 2}.",
      "blocksVisual": [
        {
          "label": "Vectorul v — numărare completă ✓",
          "groups": [
            [
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — frecvențe finale",
          "groups": [
            [
              {
                "val": "0",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "0",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "2",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "**Faza de reconstrucție.** Setăm `idx = 0` și pornim bucla cu `i` de la 0 la maxim = 4. Vom plasa fiecare valoare `i` de `fr[i]` ori în ordine crescătoare.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire (în construcție) — idx = 0",
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
        },
        {
          "label": "fr[ ] — contor rămas de plasat",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "3"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "**i = 0:** fr[0] = 0, condiția `fr[0] > 0` este falsă. Valoarea 0 nu apare în vector — sărim la i = 1.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — nimic plasat (i=0 sărit)",
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
        },
        {
          "label": "fr[ ] — fr[0]=0 sărit",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "3"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "**i = 1, fr[1] = 3 > 0:** Plasăm valoarea **1** la v[0]. idx devine 1. Scădem fr[1] → fr[1] = 2.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — v[0] = 1 plasat",
          "groups": [
            [
              {
                "val": "1",
                "active": true
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
        },
        {
          "label": "fr[ ] — fr[1] decrementat la 2",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "2",
                "active": true
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "**i = 1, fr[1] = 2 > 0:** Plasăm valoarea **1** la v[1]. idx devine 2. Scădem fr[1] → fr[1] = 1.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — v[1] = 1 plasat",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "active": true
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
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[1] decrementat la 1",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "1",
                "active": true
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "**i = 1, fr[1] = 1 > 0:** Plasăm valoarea **1** la v[2]. idx devine 3. Scădem fr[1] → fr[1] = 0. Valoarea 1 a fost plasată de **3 ori**.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — v[2] = 1 plasat (fr[1] epuizat)",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "active": true
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
        },
        {
          "label": "fr[ ] — fr[1] = 0, epuizat",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "**i = 2:** fr[2] = 0, condiția `fr[2] > 0` este falsă. Valoarea 2 nu apare în vector — sărim la i = 3.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — nimic adăugat (i=2 sărit)",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
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
        },
        {
          "label": "fr[ ] — fr[2]=0 sărit",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "1"
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "**i = 3, fr[3] = 1 > 0:** Plasăm valoarea **3** la v[3]. idx devine 4. Scădem fr[3] → fr[3] = 0.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — v[3] = 3 plasat",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "active": true
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
        },
        {
          "label": "fr[ ] — fr[3] decrementat la 0",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "**i = 4, fr[4] = 2 > 0:** Plasăm valoarea **4** la v[4]. idx devine 5. Scădem fr[4] → fr[4] = 1.",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — v[4] = 4 plasat",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "?",
                "hidden": true
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — fr[4] decrementat la 1",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "**i = 4, fr[4] = 1 > 0:** Plasăm valoarea **4** la v[5]. idx devine 6. Scădem fr[4] → fr[4] = 0. Toate frecvențele sunt epuizate!",
      "blocksVisual": [
        {
          "label": "Vectorul de ieșire — v[5] = 4 plasat (fr[4] epuizat)",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — toate epuizate",
          "groups": [
            [
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              },
              {
                "val": "0",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "**Sortare finalizată!** Vectorul `v` este acum sortat crescător: **{1, 1, 1, 3, 4, 4}**. Algoritmul a funcționat în O(N + K) = O(6 + 4) fără nicio comparație directă între elemente.",
      "blocksVisual": [
        {
          "label": "Vectorul sortat final v = {1, 1, 1, 3, 4, 4}",
          "groups": [
            [
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "1",
                "sorted": true
              },
              {
                "val": "3",
                "sorted": true
              },
              {
                "val": "4",
                "sorted": true
              },
              {
                "val": "4",
                "sorted": true
              }
            ]
          ]
        },
        {
          "label": "fr[ ] — complet consumat",
          "groups": [
            [
              {
                "val": "0",
                "sorted": true
              },
              {
                "val": "0",
                "sorted": true
              },
              {
                "val": "0",
                "sorted": true
              },
              {
                "val": "0",
                "sorted": true
              },
              {
                "val": "0",
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
        "title": "Vectorul de Frecvență (PbInfo #300)",
        "url": "https://www.pbinfo.ro/probleme/300",
        "desc": "Numărarea aparițiilor unor cifre/valori mici."
      }
    ],
    "medium": [
      {
        "title": "Sortare prin Numărare (PbInfo #4145)",
        "url": "https://www.pbinfo.ro/probleme/4145",
        "desc": "Sortarea unui vector folosind Counting Sort."
      }
    ],
    "hard": [
      {
        "title": "Find All Anagrams in a String",
        "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
        "desc": "Utilizarea vectorilor de frecvență glisanți (sliding window frequency)."
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { v: [4, 1, 3, 1, 4, 1], fr: [], i: -1, phase: "init" },
        { v: [4, 1, 3, 1, 4, 1], fr: [], maxim: 4, i: -1, phase: "maxim" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 0], maxim: 4, i: -1, phase: "fr_init" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 0], maxim: 4, x: 4, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 1], maxim: 4, x: 4, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 1], maxim: 4, x: 1, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 0, 1], maxim: 4, x: 1, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 0, 1], maxim: 4, x: 3, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 1, 1], maxim: 4, x: 3, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 1, 1], maxim: 4, x: 1, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 1], maxim: 4, x: 1, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 1], maxim: 4, x: 4, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 2], maxim: 4, x: 4, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 2], maxim: 4, x: 1, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 3, 0, 1, 2], maxim: 4, x: 1, i: -1, phase: "count" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 3, 0, 1, 2], maxim: 4, idx: 0, i: -1, phase: "reconstruct_init" },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 3, 0, 1, 2], maxim: 4, idx: 0, i: 0, phase: "reconstruct" },
        { v: [1, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 2], maxim: 4, idx: 1, i: 1, phase: "reconstruct" },
        { v: [1, 1, 3, 1, 4, 1], fr: [0, 1, 0, 1, 2], maxim: 4, idx: 2, i: 1, phase: "reconstruct" },
        { v: [1, 1, 1, 1, 4, 1], fr: [0, 0, 0, 1, 2], maxim: 4, idx: 3, i: 1, phase: "reconstruct" },
        { v: [1, 1, 1, 1, 4, 1], fr: [0, 0, 0, 1, 2], maxim: 4, idx: 3, i: 2, phase: "reconstruct" },
        { v: [1, 1, 1, 3, 4, 1], fr: [0, 0, 0, 0, 2], maxim: 4, idx: 4, i: 3, phase: "reconstruct" },
        { v: [1, 1, 1, 3, 4, 1], fr: [0, 0, 0, 0, 1], maxim: 4, idx: 5, i: 4, phase: "reconstruct" },
        { v: [1, 1, 1, 3, 4, 4], fr: [0, 0, 0, 0, 0], maxim: 4, idx: 6, i: 4, phase: "reconstruct" },
        { v: [1, 1, 1, 3, 4, 4], fr: [0, 0, 0, 0, 0], maxim: 4, idx: 6, i: -1, phase: "end" }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [
        { name: "countingSort(vector<int>& v)", file: "solution.cpp", line: activeLine }
      ];
      if (activeLine !== 31) {
        frames.push({ name: "main()", file: "main.cpp", line: 31 });
      }

      vars.push({ name: "v", type: "std::vector<int>&", val: "size = 6 {" + curr.v.join(", ") + "}", expandable: true });
      if (curr.fr.length > 0) {
        vars.push({ name: "fr", type: "std::vector<int>", val: "size = 5 {" + curr.fr.join(", ") + "}", expandable: true });
      }
      if (curr.maxim !== undefined) {
        vars.push({ name: "maxim", type: "int", val: curr.maxim.toString(), expandable: false });
      }
      if (curr.x !== undefined) {
        vars.push({ name: "x", type: "int", val: curr.x.toString(), expandable: false });
      }
      if (curr.idx !== undefined) {
        vars.push({ name: "idx", type: "int", val: curr.idx.toString(), expandable: false });
      }
      if (curr.i !== -1) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }

      let inlineVal = "v: {" + curr.v.join(",") + "}";
      if (curr.fr.length > 0) inlineVal += ", fr: {" + curr.fr.join(",") + "}";
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { v: [4, 1, 3, 1, 4, 1], fr: [], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 0], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 0], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 0, 0, 0, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 0, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 0, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 1, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 1, 0, 1, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 1], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 2], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 2], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 3, 0, 1, 2], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 3, 0, 1, 2], i: -1 },
        { v: [4, 1, 3, 1, 4, 1], fr: [0, 3, 0, 1, 2], i: 0 },
        { v: [1, 1, 3, 1, 4, 1], fr: [0, 2, 0, 1, 2], i: 1 },
        { v: [1, 1, 3, 1, 4, 1], fr: [0, 1, 0, 1, 2], i: 1 },
        { v: [1, 1, 1, 1, 4, 1], fr: [0, 0, 0, 1, 2], i: 1 },
        { v: [1, 1, 1, 1, 4, 1], fr: [0, 0, 0, 1, 2], i: 2 },
        { v: [1, 1, 1, 3, 4, 1], fr: [0, 0, 0, 0, 2], i: 3 },
        { v: [1, 1, 1, 3, 4, 1], fr: [0, 0, 0, 0, 1], i: 4 },
        { v: [1, 1, 1, 3, 4, 4], fr: [0, 0, 0, 0, 0], i: 4 },
        { v: [1, 1, 1, 3, 4, 4], fr: [0, 0, 0, 0, 0], i: -1 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 15 && lineNum <= 26) {
        let res = "v: {" + curr.v.join(",") + "}";
        if (curr.fr.length > 0) res += ", fr: {" + curr.fr.join(",") + "}";
        if (curr.i !== -1) res += ", i: " + curr.i;
        return res;
      }
      return null;
    }
  }
};
