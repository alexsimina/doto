export const data = {
  "presentation": "### Prezentare Generală\n\nProcesarea șirurilor de caractere (String Processing) este un domeniu esențial în programare, ocupându-se cu manipularea, căutarea și analiza textului.\n\nÎn C++, un `std::string` este o clasă din Standard Template Library (STL) care gestionează automat alocarea memoriei pentru caractere. Oferă funcții extrem de puternice, precum `substr` (pentru a extrage părți dintr-un șir), `find` (pentru a căuta un subșir) sau `append`.\n\nÎnțelegerea modului în care funcționează șirurile este primul pas către rezolvarea problemelor avansate, cum ar fi căutarea de tipare, parsarea, criptografia și compresia datelor.",
  "complexity": "### Complexitate\n\n- **Timp:** Operațiile de bază pe șiruri pot părea rapide, dar ascund adesea un cost ascuns. Concatenarea `s += 'a'` este amortizat O(1), dar inserarea la început `s.insert(0, \"a\")` este O(N). Funcția `find` folosește în C++ standard o abordare destul de eficientă, dar în cel mai rău caz (naiv) poate lua O(N * M).\n- **Spațiu:** O(N) pentru a stoca șirul, plus potențiala memorie extra necesară pentru concatenări.\n",
  "variations": "### Variații și Edge Cases\n\n1. String Hashing (Rabin-Karp): Reprezintă transformarea unui șir într-un număr (hash) pentru a compara două șiruri de lungime N în O(1) (după o preprocesare O(N)).\n2. Căutare Naivă: Compararea a două șiruri de la fiecare poziție posibilă.\n3. Parsare: Extragerea de token-uri dintr-un text (de ex. folosind `stringstream` sau `strtok`).",
  "applications": "### Aplicații\n\nAproape orice interacțiune cu un utilizator implică șiruri de caractere: căutările pe Google, parsarea de fișiere JSON, editoarele de text și sistemele de recomandare. Cunoașterea detaliată a manipulării lor previne probleme grave de performanță (precum faimosul 'accident' de O(N^2) din GTA Online la parsarea unui fișier JSON masiv).",
  code: `
#include <iostream>
#include <string>

using namespace std;

int main() {
    string text = "algoritmica";
    string pattern = "ritm";
    
    // Căutarea unui subșir
    size_t pos = text.find(pattern);
    if (pos != string::npos) {
        cout << "Am găsit '" << pattern << "' la indexul " << pos << "
";
    }
    
    // Extragerea unui substring
    string sub = text.substr(pos, 4);
    cout << "Substring extras: " << sub << "
";
    
    // Modificarea șirului
    text.replace(pos, 4, "bra");
    cout << "După înlocuire: " << text << "
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
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
      "line": 9,
      "text": "Inițializăm șablonul (pattern) căutat cu 'ritm'.",
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
      "line": 12,
      "text": "Apelăm text.find(pattern) pentru a găsi 'ritm' în text. Începem căutarea de la indexul 0.",
      "blocksVisual": [
        {
          "label": "Căutare index 0",
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
      "line": 12,
      "text": "Litera de la indexul 0 ('a') nu corespunde cu prima literă din pattern ('r'). Avansăm la indexul 1.",
      "blocksVisual": [
        {
          "label": "Căutare index 1",
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
      "line": 12,
      "text": "Litera de la indexul 1 ('l') nu corespunde cu 'r'. Avansăm la indexul 2.",
      "blocksVisual": [
        {
          "label": "Căutare index 2",
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
      "line": 12,
      "text": "Litera de la indexul 2 ('g') nu corespunde cu 'r'. Avansăm la indexul 3.",
      "blocksVisual": [
        {
          "label": "Căutare index 3",
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
      "line": 12,
      "text": "Litera de la indexul 3 ('o') nu corespunde cu 'r'. Avansăm la indexul 4.",
      "blocksVisual": [
        {
          "label": "Căutare index 4",
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
      "line": 12,
      "text": "Litera de la indexul 4 ('r') se potrivește cu prima literă din pattern ('r')! Verificăm caracterele următoare.",
      "blocksVisual": [
        {
          "label": "Potrivire parțială",
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
      "line": 12,
      "text": "Caracterele de la indexul 5 din text ('i') și indexul 1 din pattern ('i') se potrivesc! Continuăm.",
      "blocksVisual": [
        {
          "label": "Potrivire parțială",
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
      "line": 12,
      "text": "Caracterele de la indexul 6 din text ('t') și indexul 2 din pattern ('t') se potrivesc! Mai avem un caracter.",
      "blocksVisual": [
        {
          "label": "Potrivire parțială",
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
      "line": 12,
      "text": "Toate caracterele șablonului s-au potrivit la indexul 4! Funcția find va returna valoarea 4.",
      "blocksVisual": [
        {
          "label": "Potrivire completă la indexul 4",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "sorted": true}, {"val": "m", "sorted": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ],
            [
              {"val": "r", "sorted": true}, {"val": "i", "sorted": true}, {"val": "t", "sorted": true}, {"val": "m", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă subșirul a fost găsit. Valoarea returnată (4) este diferită de 'string::npos' (care indică absența).",
      "blocksVisual": [
        {
          "label": "Verificare poziție",
          "groups": [
            [
              {"val": "4 != string::npos", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Condiția este adevărată, deci afișăm mesajul de succes la consolă.",
      "blocksVisual": [
        {
          "label": "Output consolă",
          "groups": [
            [
              {"val": "Am găsit 'ritm' la indexul 4", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Apelăm text.substr(pos, 4) pentru a extrage 4 caractere începând de la indexul 4 (care conține 'ritm').",
      "blocksVisual": [
        {
          "label": "Extragere substring",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "o"}, {"val": "r", "active": true}, {"val": "i", "active": true}, {"val": "t", "active": true}, {"val": "m", "active": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Subșirul 'sub' primește valoarea 'ritm'. Acesta este alocat ca un string nou în memorie.",
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
      "line": 20,
      "text": "Afișăm substringul extras la consolă: 'Substring extras: ritm'.",
      "blocksVisual": [
        {
          "label": "Output consolă",
          "groups": [
            [
              {"val": "Substring extras: ritm", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Apelăm text.replace(pos, 4, 'bra') pentru a înlocui subșirul de la indexul 4 de lungime 4 ('ritm') cu textul 'bra'.",
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
      "line": 24,
      "text": "După eliminarea celor 4 caractere ('ritm') și inserarea celor 3 ('bra'), conținutul devine 'algebraica'.",
      "blocksVisual": [
        {
          "label": "Șir modificat",
          "groups": [
            [
              {"val": "a"}, {"val": "l"}, {"val": "g"}, {"val": "e"}, {"val": "b", "sorted": true}, {"val": "r", "sorted": true}, {"val": "a", "sorted": true}, {"val": "i"}, {"val": "c"}, {"val": "a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Afișăm rezultatul final la consolă: 'După înlocuire: algebraica'.",
      "blocksVisual": [
        {
          "label": "Output consolă",
          "groups": [
            [
              {"val": "După înlocuire: algebraica", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Programul se încheie returnând 0, semnalizând rularea cu succes.",
      "blocksVisual": [
        {
          "label": "Return",
          "groups": [
            [
              {"val": "EXIT SUCCESS (0)", "sorted": true}
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
        "desc": "Înlocuire caractere"
      },
      {
        "title": "Valid Palindrome",
        "url": "https://leetcode.com/problems/valid-palindrome/",
        "desc": "Doi pointeri pe șiruri"
      }
    ],
    "medium": [
      {
        "title": "Longest Substring Without Repeating",
        "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        "desc": "Sliding window"
      },
      {
        "title": "String to Integer (atoi)",
        "url": "https://leetcode.com/problems/string-to-integer-atoi/",
        "desc": "Parsare masivă"
      }
    ],
    "hard": [
      {
        "title": "Minimum Window Substring",
        "url": "https://leetcode.com/problems/minimum-window-substring/",
        "desc": "Căutare avansată în fereastră"
      },
      {
        "title": "Text Justification",
        "url": "https://leetcode.com/problems/text-justification/",
        "desc": "Formatare de text complexă"
      }
    ]
  }
};
