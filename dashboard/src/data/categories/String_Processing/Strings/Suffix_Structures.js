export const data = {
  "presentation": "### Prezentare Generală\n\nStructurile de Sufixe (**Suffix Array**, **Suffix Tree** și **Suffix Automaton**) sunt printre cele mai avansate structuri de date utilizate în procesarea textelor, fiind capabile să rezolve eficient probleme complexe legate de substringuri.\n\n### Suffix Array (Vectorul de Sufixe)\n\nUn **Suffix Array** este un vector care conține indicii de pornire ai tuturor sufixelor unui șir de caractere, sortate în ordine lexicografică (alfabetică).\n\nFie șirul $S = \\text{\"banana\"}$ de lungime $N = 6$. Sufixele sale sunt:\n- Index 0: `\"banana\"`\n- Index 1: `\"anana\"`\n- Index 2: `\"nana\"`\n- Index 3: `\"ana\"`\n- Index 4: `\"na\"`\n- Index 5: `\"a\"`\n\nDupă sortarea lexicografică a acestor sufixe, obținem:\n1. `\"a\"` (index 5)\n2. `\"ana\"` (index 3)\n3. `\"anana\"` (index 1)\n4. `\"banana\"` (index 0)\n5. `\"na\"` (index 4)\n6. `\"nana\"` (index 2)\n\nAstfel, Suffix Array-ul rezultat este: $SA = [5, 3, 1, 0, 4, 2]$.\n\n### Vectorul LCP (Longest Common Prefix)\n\nPentru a maximiza utilitatea unui Suffix Array, se construiește suplimentar vectorul **LCP** (Longest Common Prefix). Fiecare element $LCP[i]$ stochează lungimea celui mai lung prefix comun între sufixul $SA[i]$ și sufixul precedent $SA[i-1]$:\n- $LCP[1]$ (între `\"a\"` și `\"ana\"`) = 1\n- $LCP[2]$ (între `\"ana\"` și `\"anana\"`) = 3\n- $LCP[3]$ (între `\"anana\"` și `\"banana\"`) = 0\n\nCu ajutorul vectorilor $SA$ și $LCP$, putem răspunde instantaneu la interogări complexe, cum ar fi determinarea numărului de substringuri unice din șir sau căutarea de potriviri de tipare.",
  "complexity": "### Complexitate\n\nFie $N$ lungimea șirului de caractere.\n\n- **Timp:**\n  - **Construcție Naivă:** $\\mathcal{O}(N^2 \\log N)$ - prin sortarea celor $N$ sufixe (fiecare comparație putând dura $\\mathcal{O}(N)$).\n  - **Construcție prin Prefix Doubling (Manber-Myers):** $\\mathcal{O}(N \\log^2 N)$ sau $\\mathcal{O}(N \\log N)$.\n  - **Construcție Optimă (Algoritmul SA-IS):** $\\mathcal{O}(N)$ timp liniar, destul de complex de implementat manual în concursuri, dar extrem de eficient în practică.\n  - **Calcul vector LCP (Algoritmul lui Kasai):** $\\mathcal{O}(N)$ după ce vectorul $SA$ a fost deja generat.\n- **Spațiu:**\n  - $\\mathcal{O}(N)$ spațiu suplimentar de memorie pentru stocarea indecșilor sufixelor și valorilor LCP.",
  "variations": "### Variații și Edge Cases\n\n1. **Suffix Tree (Arborele de Sufixe):** O reprezentare compressed Trie a tuturor sufixelor. Ukkonen oferă o metodă de construcție on-line în timp $\\mathcal{O}(N)$. Consumă multă memorie din cauza structurii de pointeri.\n2. **Suffix Automaton (DAWG):** Un automat finit determinist acyclic care acceptă toate substringurile unui șir de caractere. Poate fi construit on-line în timp $\\mathcal{O}(N)$ și are un consum de spațiu extrem de compact comparativ cu un Suffix Tree.\n3. **Căutarea unui șablon:** Odată construit Suffix Array-ul, căutarea unui șablon $P$ de lungime $M$ se poate realiza prin Căutare Binară (Binary Search) în timp $\\mathcal{O}(M \\log N)$.",
  "applications": "### Aplicații\n\n- **Bioinformatică:** Alinierea secvențelor lungi de ADN și identificarea genelor comune între mai multe specii.\n- **Numărarea substringurilor unice:** Numărul de substringuri unice ale unui șir este dat de formula:\n  $$N_{\\text{unique}} = \\frac{N(N+1)}{2} - \\sum_{i=1}^{N-1} LCP[i]$$\n- **Longest Repeated Substring:** Cel mai lung substring care se repetă în text, identificat prin valoarea maximă din vectorul LCP.\n- **Analiza Plagiatului:** Compararea masivă a documentelor pentru detectarea fragmentelor copiate.",
  code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

struct Suffix {
    int index;
    string suff;
};

// Sortam sufixele lexicografic
bool cmp(const Suffix& a, const Suffix& b) {
    return a.suff < b.suff;
}

vector<int> buildSuffixArray(string txt) {
    int n = txt.length();
    vector<Suffix> suffixes(n);
    
    // 1. Generarea sufixelor
    for (int i = 0; i < n; i++) {
        suffixes[i].index = i;
        suffixes[i].suff = txt.substr(i, n - i);
    }
    
    // 2. Sortarea O(N^2 log N) - strict conceptual
    sort(suffixes.begin(), suffixes.end(), cmp);
    
    // 3. Extragerea indecsilor
    vector<int> sa(n);
    for (int i = 0; i < n; i++) {
        sa[i] = suffixes[i].index;
    }
    return sa;
}

int main() {
    string txt = "banana";
    vector<int> sa = buildSuffixArray(txt);
    
    cout << "Suffix Array:\\n";
    for (int i = 0; i < sa.size(); i++) {
        cout << sa[i] << " - " << txt.substr(sa[i]) << "\\n";
    }
    return 0;
}`,
  "explanations": [
    {
      "line": 39,
      "text": "Pornim executarea din funcția main.",
      "blocksVisual": [
        {
          "label": "Program",
          "groups": [[{"val": "main()"}]]
        }
      ]
    },
    {
      "line": 40,
      "text": "Definim șirul de analizat: txt = \"banana\".",
      "blocksVisual": [
        {
          "label": "Text",
          "groups": [
            [
              {"val": "b"}, {"val": "a"}, {"val": "n"}, {"val": "a"}, {"val": "n"}, {"val": "a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 41,
      "text": "Apelăm `buildSuffixArray(txt)` pentru a genera vectorul de sufixe sortat.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{"val": "buildSuffixArray", "active": true}]]
        }
      ]
    },
    {
      "line": 19,
      "text": "Intrăm în funcție. Aflăm lungimea textului n = 6.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{"val": "n = 6", "sorted": true}]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Alocăm un vector `suffixes` cu n = 6 elemente de tip struct Suffix.",
      "blocksVisual": [
        {
          "label": "Vector Suffixes",
          "groups": [
            [
              {"val": "{}"}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Pornim bucla pentru generarea sufixelor cu i de la 0 la 5.",
      "blocksVisual": [
        {
          "label": "Buclă",
          "groups": [[{"val": "i = 0", "active": true}]]
        }
      ]
    },
    {
      "line": 24,
      "text": "i = 0: Salvăm indexul inițial de pornire: suffixes[0].index = 0.",
      "blocksVisual": [
        {
          "label": "Sufix 0",
          "groups": [[{"val": "index = 0"}]]
        }
      ]
    },
    {
      "line": 25,
      "text": "i = 0: Extragem sufixul propriu-zis suffixes[0].suff = \"banana\".",
      "blocksVisual": [
        {
          "label": "Sufixe Generate",
          "groups": [
            [
              {"val": "0: banana", "active": true}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "i = 1: suffixes[1].index = 1, suff = \"anana\".",
      "blocksVisual": [
        {
          "label": "Sufixe Generate",
          "groups": [
            [
              {"val": "0: banana"}, {"val": "1: anana", "active": true}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "i = 2: suffixes[2].index = 2, suff = \"nana\".",
      "blocksVisual": [
        {
          "label": "Sufixe Generate",
          "groups": [
            [
              {"val": "0: banana"}, {"val": "1: anana"}, {"val": "2: nana", "active": true}, {"val": "{}"}, {"val": "{}"}, {"val": "{}"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "i = 3: suffixes[3].index = 3, suff = \"ana\".",
      "blocksVisual": [
        {
          "label": "Sufixe Generate",
          "groups": [
            [
              {"val": "0: banana"}, {"val": "1: anana"}, {"val": "2: nana"}, {"val": "3: ana", "active": true}, {"val": "{}"}, {"val": "{}"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "i = 4: suffixes[4].index = 4, suff = \"na\".",
      "blocksVisual": [
        {
          "label": "Sufixe Generate",
          "groups": [
            [
              {"val": "0: banana"}, {"val": "1: anana"}, {"val": "2: nana"}, {"val": "3: ana"}, {"val": "4: na", "active": true}, {"val": "{}"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "i = 5: suffixes[5].index = 5, suff = \"a\". Toate cele 6 sufixe sunt acum stocate în structură.",
      "blocksVisual": [
        {
          "label": "Sufixe Generate",
          "groups": [
            [
              {"val": "0: banana"}, {"val": "1: anana"}, {"val": "2: nana"}, {"val": "3: ana"}, {"val": "4: na"}, {"val": "5: a", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Apelăm `sort()` pe vectorul de structuri utilizând funcția de comparare cmp.",
      "blocksVisual": [
        {
          "label": "Sortare",
          "groups": [[{"val": "sort(suffixes)"}]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Sortarea compară elementele perechi. Comparație naivă: compare \"banana\" cu \"anana\".",
      "blocksVisual": [
        {
          "label": "Cmp",
          "groups": [[{"val": "banana vs anana"}]]
        }
      ]
    },
    {
      "line": 15,
      "text": "Deoarece \"anana\" este mai mic lexicografic decât \"banana\", funcția de comparare decide permutarea lor.",
      "blocksVisual": [
        {
          "label": "Swap",
          "groups": [[{"val": "anana < banana", "sorted": true}]]
        }
      ]
    },
    {
      "line": 29,
      "text": "După mai multe comparări lexicografice, vectorul `suffixes` devine ordonat complet: [\"a\", \"ana\", \"anana\", \"banana\", \"na\", \"nana\"].",
      "blocksVisual": [
        {
          "label": "Sufixe Sortate",
          "groups": [
            [
              {"val": "5: a", "sorted": true}, {"val": "3: ana", "sorted": true}, {"val": "1: anana", "sorted": true}, {"val": "0: banana", "sorted": true}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Inițializăm vectorul rezultat `sa` (Suffix Array) de lungime n = 6.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Pornim bucla de extragere a indicilor.",
      "blocksVisual": [
        {
          "label": "Buclă",
          "groups": [[{"val": "i = 0", "active": true}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 0: sa[0] primește indexul sufixului sortat pe prima poziție: suffixes[0].index = 5.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "5", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 1: sa[1] = suffixes[1].index = 3.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "5", "sorted": true}, {"val": "3", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 2: sa[2] = suffixes[2].index = 1.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "5", "sorted": true}, {"val": "3", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 3: sa[3] = suffixes[3].index = 0.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "5", "sorted": true}, {"val": "3", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0", "sorted": true}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 4: sa[4] = suffixes[4].index = 4.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "5", "sorted": true}, {"val": "3", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0", "sorted": true}, {"val": "4", "sorted": true}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 5: sa[5] = suffixes[5].index = 2. Generarea Suffix Array este completă.",
      "blocksVisual": [
        {
          "label": "Suffix Array",
          "groups": [
            [
              {"val": "5", "sorted": true}, {"val": "3", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0", "sorted": true}, {"val": "4", "sorted": true}, {"val": "2", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Returnăm vectorul `sa` rezultat.",
      "blocksVisual": [
        {
          "label": "Return sa",
          "groups": [[{"val": "sa complete", "sorted": true}]]
        }
      ]
    },
    {
      "line": 41,
      "text": "Revenim în main, primind Suffix Array: [5, 3, 1, 0, 4, 2].",
      "blocksVisual": [
        {
          "label": "Variabila sa",
          "groups": [
            [
              {"val": "5"}, {"val": "3"}, {"val": "1"}, {"val": "0"}, {"val": "4"}, {"val": "2"}
            ]
          ]
        }
      ]
    },
    {
      "line": 43,
      "text": "Afișăm în consolă titlul 'Suffix Array:'.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [[{"val": "Suffix Array:", "sorted": true}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "Parcurgem vectorul `sa` și afișăm fiecare element alături de sufixul textului corespunzător. Primul element: '5 - a'.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [[{"val": "5 - a", "sorted": true}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "Al doilea element afișat: '3 - ana'.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [[{"val": "3 - ana", "sorted": true}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "Continuăm afișarea: '1 - anana', apoi '0 - banana', '4 - na' și în final '2 - nana'.",
      "blocksVisual": [
        {
          "label": "Consolă finală",
          "groups": [[{"val": "Afișare finalizată", "sorted": true}]]
        }
      ]
    },
    {
      "line": 47,
      "text": "Programul se termină cu succes returnând 0.",
      "blocksVisual": [
        {
          "label": "Exit",
          "groups": [[{"val": "0", "sorted": true}]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Suffix Array",
        "url": "https://www.infoarena.ro/problema/smax",
        "desc": "Construirea și utilizarea vectorului de sufixe."
      }
    ],
    "medium": [
      {
        "title": "Longest Common Substring",
        "url": "https://leetcode.com/problems/longest-common-substring/",
        "desc": "Găsirea celui mai lung subșir comun a două sau mai multe șiruri folosind Suffix Array."
      },
      {
        "title": "Distinct Substrings",
        "url": "https://www.spoj.com/problems/DISUBSTR/",
        "desc": "Determinarea numărului de substringuri distincte folosind formula bazată pe suma LCP."
      }
    ],
    "hard": [
      {
        "title": "Longest Duplicate Substring",
        "url": "https://leetcode.com/problems/longest-duplicate-substring/",
        "desc": "Căutarea celui mai lung subșir duplicat prin găsirea elementului maxim din vectorul LCP."
      }
    ]
  },
  "globalVars": [
  {
    "name": "sa",
    "type": "int[MAXN]",
    "val": "Suffix array representation",
    "expandable": false
  }
]
};
