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
      "line": 15,
      "text": "Pasul 1: Generăm toate cele 6 sufixe ale stringului 'banana' cu indexul lor de pornire.",
      "blocksVisual": [
        {
          "label": "Generare Sufixe",
          "groups": [
            [
              {"val": "0: banana"}, {"val": "1: anana"}, {"val": "2: nana"}, {"val": "3: ana"}, {"val": "4: na"}, {"val": "5: a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 2: Începem sortarea. Comparăm sufixul 'banana' (index 0) cu 'anana' (index 1). 'anana' este mai mic lexicografic, deci le inversăm.",
      "blocksVisual": [
        {
          "label": "Compară 0 și 1",
          "groups": [
            [
              {"val": "1: anana", "active": true}, {"val": "0: banana", "active": true}, {"val": "2: nana"}, {"val": "3: ana"}, {"val": "4: na"}, {"val": "5: a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 3: Comparăm sufixul 'banana' (index 0) cu 'nana' (index 2). 'banana' < 'nana', deci ordinea este corectă. Nu facem nicio schimbare.",
      "blocksVisual": [
        {
          "label": "Compară 0 și 2",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "0: banana", "active": true}, {"val": "2: nana", "active": true}, {"val": "3: ana"}, {"val": "4: na"}, {"val": "5: a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 4: Comparăm 'nana' (index 2) cu 'ana' (index 3). Deoarece 'ana' < 'nana', le inversăm.",
      "blocksVisual": [
        {
          "label": "Compară 2 și 3",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "0: banana"}, {"val": "3: ana", "active": true}, {"val": "2: nana", "active": true}, {"val": "4: na"}, {"val": "5: a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 5: Comparăm 'nana' (index 2) cu 'na' (index 4). Deoarece 'na' < 'nana', le inversăm.",
      "blocksVisual": [
        {
          "label": "Compară 2 și 4",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "0: banana"}, {"val": "3: ana"}, {"val": "4: na", "active": true}, {"val": "2: nana", "active": true}, {"val": "5: a"}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 6: Comparăm 'nana' (index 2) cu 'a' (index 5). Inversăm. Suffixul 'nana' (index 2) ajunge pe poziția sa finală la sfârșit.",
      "blocksVisual": [
        {
          "label": "Poziție finală: nana",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "0: banana"}, {"val": "3: ana"}, {"val": "4: na"}, {"val": "5: a", "active": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 7: Trecerea a doua. Comparăm 'anana' (index 1) cu 'banana' (index 0). Ordinea este corectă.",
      "blocksVisual": [
        {
          "label": "Compară 1 și 0",
          "groups": [
            [
              {"val": "1: anana", "active": true}, {"val": "0: banana", "active": true}, {"val": "3: ana"}, {"val": "4: na"}, {"val": "5: a"}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 8: Comparăm 'banana' (index 0) cu 'ana' (index 3). Inversăm.",
      "blocksVisual": [
        {
          "label": "Compară 0 și 3",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "3: ana", "active": true}, {"val": "0: banana", "active": true}, {"val": "4: na"}, {"val": "5: a"}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 9: Comparăm 'banana' (index 0) cu 'na' (index 4). Ordinea este corectă.",
      "blocksVisual": [
        {
          "label": "Compară 0 și 4",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "3: ana"}, {"val": "0: banana", "active": true}, {"val": "4: na", "active": true}, {"val": "5: a"}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 10: Comparăm 'na' (index 4) cu 'a' (index 5). Inversăm. Suffixul 'na' (index 4) ajunge pe poziția sa finală.",
      "blocksVisual": [
        {
          "label": "Poziție finală: na",
          "groups": [
            [
              {"val": "1: anana"}, {"val": "3: ana"}, {"val": "0: banana"}, {"val": "5: a", "active": true}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 11: Trecerea a treia. Comparăm 'anana' (index 1) cu 'ana' (index 3). Deoarece 'ana' < 'anana', le inversăm.",
      "blocksVisual": [
        {
          "label": "Compară 1 și 3",
          "groups": [
            [
              {"val": "3: ana", "active": true}, {"val": "1: anana", "active": true}, {"val": "0: banana"}, {"val": "5: a"}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 12: Comparăm 'anana' (index 1) cu 'banana' (index 0). Ordinea este corectă.",
      "blocksVisual": [
        {
          "label": "Compară 1 și 0",
          "groups": [
            [
              {"val": "3: ana"}, {"val": "1: anana", "active": true}, {"val": "0: banana", "active": true}, {"val": "5: a"}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 13: Comparăm 'banana' (index 0) cu 'a' (index 5). Inversăm. Suffixul 'banana' (index 0) își ocupă poziția finală.",
      "blocksVisual": [
        {
          "label": "Poziție finală: banana",
          "groups": [
            [
              {"val": "3: ana"}, {"val": "1: anana"}, {"val": "5: a", "active": true}, {"val": "0: banana", "sorted": true}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 14: Trecerea a patra. Comparăm 'ana' (index 3) cu 'anana' (index 1). Ordinea este corectă.",
      "blocksVisual": [
        {
          "label": "Compară 3 și 1",
          "groups": [
            [
              {"val": "3: ana", "active": true}, {"val": "1: anana", "active": true}, {"val": "5: a"}, {"val": "0: banana", "sorted": true}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 15: Comparăm 'anana' (index 1) cu 'a' (index 5). Inversăm. Suffixul 'anana' (index 1) își ocupă poziția finală.",
      "blocksVisual": [
        {
          "label": "Poziție finală: anana",
          "groups": [
            [
              {"val": "3: ana"}, {"val": "5: a", "active": true}, {"val": "1: anana", "sorted": true}, {"val": "0: banana", "sorted": true}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pasul 16: Trecerea a cincea. Comparăm 'ana' (index 3) cu 'a' (index 5). Inversăm. Suffixele 'a' și 'ana' își ocupă pozițiile finale.",
      "blocksVisual": [
        {
          "label": "Sufixe sortate complet",
          "groups": [
            [
              {"val": "5: a", "sorted": true}, {"val": "3: ana", "sorted": true}, {"val": "1: anana", "sorted": true}, {"val": "0: banana", "sorted": true}, {"val": "4: na", "sorted": true}, {"val": "2: nana", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Pasul 17: Extragem doar indicii din structura sortată. Obținem Suffix Array (SA): [5, 3, 1, 0, 4, 2].",
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
      "line": 35,
      "text": "Pasul 18: Construim array-ul LCP (Longest Common Prefix). LCP[1] (între 'a' și 'ana') are valoarea 1. LCP[2] (între 'ana' și 'anana') are valoarea 3.",
      "blocksVisual": [
        {
          "label": "LCP primele elemente",
          "groups": [
            [
              {"val": "LCP[0] = 0"}, {"val": "LCP[1] = 1"}, {"val": "LCP[2] = 3"}
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Pasul 19: LCP[3] ('anana' vs 'banana') = 0, LCP[4] ('banana' vs 'na') = 0, LCP[5] ('na' vs 'nana') = 2. Array-ul LCP final este: [0, 1, 3, 0, 0, 2].",
      "blocksVisual": [
        {
          "label": "LCP Final",
          "groups": [
            [
              {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "3", "sorted": true}, {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "2", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Pasul 20: Structurile sunt finalizate. Putem răspunde la interogări de substringuri extrem de rapid, de exemplu numărul de substringuri unice: N*(N+1)/2 - suma(LCP) = 21 - 6 = 15.",
      "blocksVisual": [
        {
          "label": "Aplicație LCP",
          "groups": [
            [
              {"val": "Substringuri unice = 15", "sorted": true}
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
