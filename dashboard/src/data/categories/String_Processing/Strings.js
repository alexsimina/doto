export const data = {
  "presentation": "### Prezentare Generală\n\nProcesarea șirurilor de caractere (String Processing) este un domeniu esențial în informatică, ocupându-se cu stocarea, manipularea, căutarea și analiza textului. \n\nÎn C++, un `std::string` este o clasă din Standard Template Library (STL) care gestionează automat alocarea memoriei pentru caractere, spre deosebire de tablourile clasice de caractere din limbajul C (terminate prin null-character `\\0`). Oferă funcții integrate extrem de puternice, precum:\n- `substr(pos, len)`: pentru a extrage un subșir de lungime $len$ începând de la indexul $pos$.\n- `find(pattern)`: pentru a căuta prima apariție a unui șablon în text.\n- `replace(pos, len, new_str)`: înlocuiește o secțiune de text.\n\nPentru compararea rapidă a șirurilor, se folosește adesea tehnica de **String Hashing** (Rabin-Karp), care asociază fiecărui șir o valoare numerică printr-o funcție polinomială:\n$$H(S) = \\left( \\sum_{i=0}^{N-1} S[i] \\cdot p^{N-1-i} \\right) \\pmod m$$\nunde $p$ este un număr prim (de obicei $p = 31$ sau $p = 53$ pentru litere), iar $m$ este un modul mare (de obicei $m = 10^9 + 9$ sau chiar $2^{64}$ folosind tipul `unsigned long long` pentru overflow control implicit).\n\nÎnțelegerea modului în care funcționează șirurile este primul pas către rezolvarea problemelor avansate, cum ar fi căutarea de tipare (Pattern Matching), parsarea limbajelor, bioinformatica și compresia datelor.",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - **Accesare element (`s[i]`):** $\\mathcal{O}(1)$ timp constant, la fel ca la vectori.\n  - **Concatenare (`s1 + s2`):** $\\mathcal{O}(N + M)$ unde $N$ și $M$ sunt lungimile celor două șiruri.\n  - **Extragere subșir (`substr`):** $\\mathcal{O}(L)$ unde $L$ este lungimea subșirului extras.\n  - **Căutare naivă (`find`):** În cel mai rău caz $\\mathcal{O}(N \\cdot M)$, deși în practică funcția standard a STL este extrem de bine optimizată.\n- **Spațiu:**\n  - $\\mathcal{O}(N)$ pentru stocarea șirului de lungime $N$ în memorie.",
  "variations": "### Variații și Edge Cases\n\n1. **C-Style Strings (`char[]` sau `char*`):** Reprezentarea clasică terminată cu caracterul `\\0` (ASCII 0). Trebuie avută mare atenție la depășirea bufferului (Buffer Overflow).\n2. **Rolling Hash (Rabin-Karp):** Permite compararea a două substringuri în timp $\\mathcal{O}(1)$ după o preprocesare în $\\mathcal{O}(N)$.\n3. **Double Hashing:** Folosirea a două perechi de baze și module distincte $(p_1, m_1)$ și $(p_2, m_2)$ pentru a reduce probabilitatea unei coliziuni de hash la valori neglijabile ($< 10^{-18}$).",
  "applications": "### Aplicații\n\n- **Parsarea formatelor de date:** Cum ar fi fișierele JSON, XML sau YAML. O parsare ineficientă a șirurilor poate duce la degradarea masivă a performanței aplicațiilor.\n- **Motoare de căutare:** Căutarea de cuvinte cheie în documente (de exemplu, algoritmul KMP sau Aho-Corasick).\n- **Bioinformatică:** Căutarea de secvențe de gene (șiruri lungi formate din caracterele A, C, G, T).",
  code: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string text = "algoritmica";
    string pattern = "ritm";
    
    // Căutarea unui subșir
    size_t pos = text.find(pattern);
    if (pos != string::npos) {
        cout << "Am gasit '" << pattern << "' la indexul " << pos << "\\n";
    }
    
    // Extragerea unui substring
    string sub = text.substr(pos, 4);
    cout << "Substring extras: " << sub << "\\n";
    
    // Modificarea șirului
    text.replace(pos, 4, "bra");
    cout << "Dupa inlocuire: " << text << "\\n";
    
    return 0;
}`,
  "explanations": [
    {
      "line": 7,
      "text": "Inițializăm șirul de bază 'text' cu valoarea 'algoritmica'.",
      "blocksVisual": [
        {
          "label": "Text",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm șablonul (pattern) căutat cu valoarea 'ritm'.",
      "blocksVisual": [
        {
          "label": "Text",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ]
          ]
        },
        {
          "label": "Pattern",
          "groups": [
            [
              {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Apelăm text.find(pattern) pentru a căuta pattern-ul în text. Simulăm căutarea: la indexul 0 ('a'), prima literă nu corespunde cu prima literă din pattern ('r').",
      "blocksVisual": [
        {
          "label": "Căutare la index 0",
          "groups": [
            [
              {"val": "a", "active": true}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "active": true}, {"val": "i"}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Simulare căutare: la indexul 1 ('l'), prima literă nu corespunde cu prima literă din pattern ('r').",
      "blocksVisual": [
        {
          "label": "Căutare la index 1",
          "groups": [
            [
              {"val": "a"}, {"val": "l", "active": true}, {"val": "g"}, {"val": "o"}, {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "active": true}, {"val": "i"}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Simulare căutare: la indexul 2 ('g'), prima literă nu corespunde cu prima literă din pattern ('r').",
      "blocksVisual": [
        {
          "label": "Căutare la index 2",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g", "active": true}, {"val": "o"}, {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "active": true}, {"val": "i"}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Simulare căutare: la indexul 3 ('o'), prima literă nu corespunde cu prima literă din pattern ('r').",
      "blocksVisual": [
        {
          "label": "Căutare la index 3",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o", "active": true}, {"val": "r"}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "active": true}, {"val": "i"}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Simulare căutare: la indexul 4, caracterul din text ('r') se potrivește cu prima literă din pattern ('r')! Începem verificarea extinsă.",
      "blocksVisual": [
        {
          "label": "Potrivire la index 4",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "active": true}, {"val": "i"}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "active": true}, {"val": "i"}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Verificăm al doilea caracter: 'i' de la indexul 5 din text coincide cu 'i' de la indexul 1 din pattern. Continuăm.",
      "blocksVisual": [
        {
          "label": "Potrivire parțială 1",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "sorted": true}, {"val": "i", "active": true}, {"val": "t"}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "sorted": true}, {"val": "i", "active": true}, {"val": "t"}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Verificăm al treilea caracter: 't' de la indexul 6 din text coincide cu 't' de la indexul 2 din pattern. Mai avem un singur caracter.",
      "blocksVisual": [
        {
          "label": "Potrivire parțială 2",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "active": true}, {"val": "m"}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "active": true}, {"val": "m"}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Verificăm ultimul caracter: 'm' de la indexul 7 din text coincide cu 'm' de la indexul 3 din pattern. Potrivire completă!",
      "blocksVisual": [
        {
          "label": "Potrivire completă",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "sorted": true}, {"val": "m", "active": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "sorted": true}, {"val": "m", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Funcția `find` a determinat potrivirea la indexul 4. Salvăm poziția în variabila `pos`.",
      "blocksVisual": [
        {
          "label": "Variabila pos",
          "groups": [
            [
              {"val": "pos = 4", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă subșirul a fost găsit. Deoarece `pos != string::npos` (valoarea 4 este validă), condiția este adevărată.",
      "blocksVisual": [
        {
          "label": "Verificare condiție",
          "groups": [
            [
              {"val": "4 != npos (Adevărat)", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Afișăm mesajul de succes în consolă: 'Am gasit 'ritm' la indexul 4'.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {"val": "Am gasit 'ritm' la indexul 4", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Apelăm `text.substr(pos, 4)` pentru a extrage 4 caractere începând de la indexul 4.",
      "blocksVisual": [
        {
          "label": "Extragere subșir",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "active": true}, {"val": "i", "active": true}, {"val": "t", "active": true}, {"val": "m", "active": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Variabila `sub` primește noul șir extras: 'ritm'.",
      "blocksVisual": [
        {
          "label": "Variabila sub",
          "groups": [
            [
              {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "sorted": true}, {"val": "m", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Afișăm substringul extras în consolă: 'Substring extras: ritm'.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {"val": "Substring extras: ritm", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Apelăm `text.replace(pos, 4, \"bra\")` pentru a înlocui 4 caractere de la indexul 4 ('ritm') cu textul 'bra'.",
      "blocksVisual": [
        {
          "label": "Înlocuire caractere",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "active": true}, {"val": "i", "active": true}, {"val": "t", "active": true}, {"val": "m", "active": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "b", "sorted": true}, {"val": "r", "sorted": true}, {"val": "a", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Înlocuirea modifică șirul original. Caracterele 'ritm' sunt șterse, iar 'bra' este inserat. Șirul devine 'algebraica'.",
      "blocksVisual": [
        {
          "label": "Text modificat",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "e"}, {"val": "b", "sorted": true}, {"val": "r", "sorted": true}, {"val": "a", "sorted": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Afișăm textul rezultat în consolă: 'Dupa inlocuire: algebraica'.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [
            [
              {"val": "Dupa inlocuire: algebraica", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Programul se încheie returnând 0, semnalizând executarea corectă.",
      "blocksVisual": [
        {
          "label": "Return",
          "groups": [
            [
              {"val": "EXIT_SUCCESS (0)", "sorted": true}
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Defanging an IP Address",
        "url": "https://leetcode.com/problems/defanging-an-ip-address/",
        "desc": "Înlocuire caractere simplă în text."
      },
      {
        "title": "Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/",
        "desc": "Tehnica celor doi pointeri aplicată pe șiruri."
      }
    ],
    "medium": [
      {
        "title": "Longest Substring Without Repeating",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        "desc": "Căutarea ferestrei glisante (Sliding Window)."
      },
      {
        "title": "String to Integer (atoi)",
        "url": "https://leetcode.com/problems/string-to-integer-atoi/",
        "desc": "Parsare riguroasă a unui șir cu atenție la edge-case-uri."
      }
    ],
    "hard": [
      {
        "title": "Minimum Window Substring",
        "url": "https://leetcode.com/problems/minimum-window-substring/",
        "desc": "Fereastră glisantă avansată pentru potrivire de caractere."
      },
      {
        "title": "Text Justification",
        "url": "https://leetcode.com/problems/text-justification/",
        "desc": "Formatare de text complexă cu reguli stricte de spațiere."
      }
    ]
  },
  "globalVars": [
  {
    "name": "alphabet_size",
    "type": "const int",
    "val": "26",
    "expandable": false
  }
]
};
