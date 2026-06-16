export const data = {
  "presentation": "### Prezentare Generală\n\nStructurile de Sufixe (Suffix Array, Suffix Tree, Suffix Automaton) sunt apogeul algoritmilor de stringuri. Odată ce stăpânești aceste concepte, aproape nicio problemă de substring-uri nu îți va sta în cale.\n\nSuffix Array (Vectorul de sufixe) reprezintă pur și simplu ordonarea lexicografică (alfabetică) a TUTUROR sufixelor unui text. Din el obținem LCP Array (Longest Common Prefix), care ne indică câte litere sunt comune între două sufixe adiacente sortate. Prin combinarea Suffix Array + LCP putem rezolva instant probleme ca: 'Care este cel mai lung substring comun pentru M texte?' sau 'De câte ori apare un string?'.",
  "complexity": "### Complexitate\n\n- **Timp:** Suffix Array poate fi construit trivial în O(N^2 log N), optimizat la O(N log^2 N) folosind hash-uri/sortare cu prefixe, și în O(N log N) sau chiar O(N) (SA-IS, algoritmul lui Yuta Mori sau Karkkainen-Sanders).\n- **Spațiu:** O(N) memorie pentru LCP și SA, de obicei foarte compact față de Suffix Tree.\n",
  "variations": "### Variații și Edge Cases\n\n1. Suffix Tree: O reprezentare sub formă de Trie comprimat al tuturor sufixelor. Ukkonen îl generează în O(N).\n2. Suffix Automaton (DAWG): O structură incredibil de mică și elegantă care acceptă fix toate substring-urile, fără construcții complicate (algoritm on-line).",
  "applications": "### Aplicații\n\nBioinformatica: Găsirea celei mai lungi secvențe de ADN comune între mai multe genomi. Analiza plagiatului la o scară masivă. Motoare de căutare primitive.",
  code: `
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

struct Suffix {
    int index;
    string suff;
};

// Sortăm sufixele lexicografic
bool cmp(var Suffix& a, var Suffix& b) {
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
    
    // 3. Extragerea indecșilor
    vector<int> sa(n);
    for (int i = 0; i < n; i++) {
        sa[i] = suffixes[i].index;
    }
    return sa;
}

int main() {
    string txt = "banana";
    vector<int> sa = buildSuffixArray(txt);
    
    cout << "Suffix Array:
";
    for (int i = 0; i < sa.size(); i++) {
        cout << sa[i] << " - " << txt.substr(sa[i]) << "
";
    }
    return 0;
}
`,
  "explanations": [
    {
      "line": 21,
      "text": "Pasul 1: Pentru cuvântul 'banana', generăm toate cele 6 sufixe posibile și le reținem indexul de start inițial. (În O(N) practic nu stocăm stringurile direct, dar facem asta conceptual pentru simplitate).",
      "blocksVisual": [
        {
          "label": "Generare Sufixe 'banana'",
          "groups": [
            [
              {
                "val": "0: banana"
              }
            ],
            [
              {
                "val": "1: anana"
              }
            ],
            [
              {
                "val": "2: nana"
              }
            ],
            [
              {
                "val": "3: ana"
              }
            ],
            [
              {
                "val": "4: na"
              }
            ],
            [
              {
                "val": "5: a"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Pasul 2: Le sortăm lexicografic. Literele 'a' ajung la început, urmate de 'b' și apoi 'n'.",
      "blocksVisual": [
        {
          "label": "Sortare Alfabetica",
          "groups": [
            [
              {
                "val": "5: a"
              }
            ],
            [
              {
                "val": "3: ana"
              }
            ],
            [
              {
                "val": "1: anana"
              }
            ],
            [
              {
                "val": "0: banana"
              }
            ],
            [
              {
                "val": "4: na"
              }
            ],
            [
              {
                "val": "2: nana",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Pasul 3: Aruncăm stringurile (ca să economisim RAM) și păstrăm DOAR vectorul de indecși [5, 3, 1, 0, 4, 2]. Ăsta e celebrul Suffix Array (SA)!",
      "blocksVisual": [
        {
          "label": "SA Final (O(N) memorie)",
          "groups": [
            [
              {
                "val": "5",
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
                "val": "0",
                "sorted": true
              },
              {
                "val": "4",
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
      "line": 40,
      "text": "Aplicație majoră: Oricând cauți un pattern 'ana' în text, faci CĂUTARE BINARĂ în Suffix Array! Cum sufixele care încep cu 'ana' sunt adiacente (la indecșii 3 și 1), găsești instant aparițiile în text!",
      "blocksVisual": [
        {
          "label": "Căutare Binară 'ana'",
          "groups": [
            [
              {
                "val": "O(M log N)",
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
        "title": "Suffix Array",
        "url": "https://www.infoarena.ro/problema/smax",
        "desc": "Inițiere SA"
      }
    ],
    "medium": [
      {
        "title": "Longest Common Substring",
        "url": "https://leetcode.com/problems/longest-common-substring/",
        "desc": "Se rezolvă excelent cu Suffix Array / Automata"
      },
      {
        "title": "Distinct Substrings",
        "url": "https://www.spoj.com/problems/DISUBSTR/",
        "desc": "Numărul de substringuri unice: N(N+1)/2 - sum(LCP)"
      }
    ],
    "hard": [
      {
        "title": "Longest Duplicate Substring",
        "url": "https://leetcode.com/problems/longest-duplicate-substring/",
        "desc": "Problemă clasică pentru LCP max"
      }
    ]
  }
};
