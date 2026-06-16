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
      "line": 7,
      "text": "Inițializăm șirul de bază 'text' și modelul pe care vrem să-l căutăm 'pattern'.",
      "blocksVisual": [
        {
          "label": "Text",
          "groups": [
            [
              {
                "val": "a"
              },
              {
                "val": "l"
              },
              {
                "val": "g"
              },
              {
                "val": "o"
              },
              {
                "val": "r"
              },
              {
                "val": "i"
              },
              {
                "val": "t"
              },
              {
                "val": "m"
              },
              {
                "val": "i"
              },
              {
                "val": "c"
              },
              {
                "val": "a"
              }
            ]
          ]
        },
        {
          "label": "Pattern",
          "groups": [
            [
              {
                "val": "r"
              },
              {
                "val": "i"
              },
              {
                "val": "t"
              },
              {
                "val": "m"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Folosim funcția 'find' pentru a căuta 'ritm'. Aceasta returnează indexul de început al primei apariții. Intern, C++ caută potriviri succesive.",
      "blocksVisual": [
        {
          "label": "Căutare 'find'",
          "groups": [
            [
              {
                "val": "a"
              },
              {
                "val": "l"
              },
              {
                "val": "g"
              },
              {
                "val": "o"
              },
              {
                "val": "r",
                "active": true
              },
              {
                "val": "i",
                "active": true
              },
              {
                "val": "t",
                "active": true
              },
              {
                "val": "m",
                "active": true
              },
              {
                "val": "i"
              },
              {
                "val": "c"
              },
              {
                "val": "a"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "'string::npos' este o constantă specială care înseamnă 'nu a fost găsit'. Aici, condiția e adevărată, deci am găsit la indexul 4."
    },
    {
      "line": 17,
      "text": "Folosim 'substr(index, lungime)' pentru a extrage 4 caractere începând de la indexul 4. Obținem din nou 'ritm'.",
      "blocksVisual": [
        {
          "label": "Extragere 'substr'",
          "groups": [
            [
              {
                "val": "r",
                "sorted": true
              },
              {
                "val": "i",
                "sorted": true
              },
              {
                "val": "t",
                "sorted": true
              },
              {
                "val": "m",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Folosim 'replace(index, lungime, noul_string)'. Înlocuim cele 4 caractere ('ritm') cu 'bra'. Rezultatul final va fi 'algebra'.",
      "blocksVisual": [
        {
          "label": "Înlocuire",
          "groups": [
            [
              {
                "val": "a"
              },
              {
                "val": "l"
              },
              {
                "val": "g"
              },
              {
                "val": "e"
              },
              {
                "val": "b",
                "active": true
              },
              {
                "val": "r",
                "active": true
              },
              {
                "val": "a",
                "active": true
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
