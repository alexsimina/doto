export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul KMP (Knuth-Morris-Pratt) este probabil cel mai faimos algoritm eficient de potrivire a șirurilor (String Matching). Rezolvă problema găsirii tuturor aparițiilor unui model (pattern de lungime M) într-un text (de lungime N) în timp O(N + M).\n\nÎn abordarea naivă, când avem o nepotrivire (mismatch), ne întoarcem cu un caracter și reluăm toată verificarea (timp O(N * M)). KMP-ul spune: 'Dacă am greșit, de ce să uit tot ce am citit deja bun?'. Analizând în prealabil pattern-ul, construim un vector numit LPS sau PI array (Longest Proper Prefix which is also Suffix). Acest vector ne spune la fiecare pas: dacă mă blochez aici, cât de mult din prefixul meu este și sufix, ca să pot continua de acolo fără să mă întorc pe text!",
  "complexity": "### Complexitate\n\n- **Timp:** O(N + M) deoarece atât construirea PI array-ului cât și căutarea în sine nu duc pointerii pe text niciodată înapoi (pointerii cresc monoton).\n- **Spațiu:** O(M) memorie auxiliară, necesară stocării PI array-ului de lungimea patternului.\n",
  "variations": "### Variații și Edge Cases\n\n1. Numărarea Aparițiilor (Z-Algorithm este o alternativă, dar PI Array e mai flexibil pentru suprapuneri).\n2. Găsirea celei mai scurte perioade a unui șir: PI array-ul, la ultima sa poziție, poate fi folosit pentru a afla dacă șirul este repetitiv (de ex. 'ababab').",
  "applications": "### Aplicații\n\nFuncțiile de căutare avansată în editoarele de cod moderne și parsarea extrem de rapidă de fluxuri infinite (stream-uri) unde nu poți memora tot textul și nu te poți întoarce pe el.",
  code: `
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<int> computePi(string pat) {
    int m = pat.length();
    vector<int> pi(m, 0);
    int j = 0;
    
    for (int i = 1; i < m; i++) {
        while (j > 0 && pat[i] != pat[j]) {
            j = pi[j - 1]; // Fallback pe muchia de failure
        }
        if (pat[i] == pat[j]) {
            j++;
        }
        pi[i] = j;
    }
    return pi;
}

void kmpSearch(string pat, string txt) {
    vector<int> pi = computePi(pat);
    int n = txt.length();
    int m = pat.length();
    int j = 0;
    
    for (int i = 0; i < n; i++) {
        while (j > 0 && txt[i] != pat[j]) {
            j = pi[j - 1]; // Aici e inima KMP-ului
        }
        if (txt[i] == pat[j]) {
            j++;
        }
        if (j == m) {
            cout << "Gasit la index " << i - m + 1 << "
";
            j = pi[j - 1]; // Continuă pentru a găsi și alte potriviri
        }
    }
}

int main() {
    string txt = "ABABDABACDABABCABAB";
    string pat = "ABABCABAB";
    kmpSearch(pat, txt);
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
      "text": "Etapa 1: Preprocesare (computePi). Începem calculul vectorului PI pentru pattern-ul 'ABABCABAB'. j = 0, i = 1.",
      "blocksVisual": [
        {
          "label": "Pattern & PI",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 1: Comparăm pat[1] ('B') cu pat[j] ('A'). Nu se potrivesc și j este 0, deci pi[1] = 0.",
      "blocksVisual": [
        {
          "label": "i = 1, j = 0",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 2: Comparăm pat[2] ('A') cu pat[j] ('A'). Se potrivesc! j devine 1, pi[2] = 1.",
      "blocksVisual": [
        {
          "label": "i = 2, j = 1",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 3: Comparăm pat[3] ('B') cu pat[j] ('B'). Se potrivesc! j devine 2, pi[3] = 2.",
      "blocksVisual": [
        {
          "label": "i = 3, j = 2",
          "groups": [
            [
              {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B", "active": true}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 4: Comparăm pat[4] ('C') cu pat[j] ('A'). Mismatch! Deoarece j = 2 > 0, ne întoarcem la pi[j-1] = pi[1] = 0.",
      "blocksVisual": [
        {
          "label": "i = 4, mismatch",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "C", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "j a devenit 0. Comparăm pat[4] ('C') cu pat[0] ('A'). Mismatch! pi[4] devine 0.",
      "blocksVisual": [
        {
          "label": "i = 4, j = 0",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 5: Comparăm pat[5] ('A') cu pat[0] ('A'). Match! j devine 1, pi[5] = 1.",
      "blocksVisual": [
        {
          "label": "i = 5, j = 1",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 6: Comparăm pat[6] ('B') cu pat[1] ('B'). Match! j devine 2, pi[6] = 2.",
      "blocksVisual": [
        {
          "label": "i = 6, j = 2",
          "groups": [
            [
              {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 7: Comparăm pat[7] ('A') cu pat[2] ('A'). Match! j devine 3, pi[7] = 3.",
      "blocksVisual": [
        {
          "label": "i = 7, j = 3",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "3", "sorted": true}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul i = 8: Comparăm pat[8] ('B') cu pat[3] ('B'). Match! j devine 4, pi[8] = 4. Preprocesarea s-a încheiat.",
      "blocksVisual": [
        {
          "label": "PI complet",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B", "active": true}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B", "active": true}
            ],
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "3", "sorted": true}, {"val": "4", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Etapa 2: Căutare (kmpSearch). Pornim de la i = 0 (pe text) și j = 0 (pe pattern). Comparăm txt[0] ('A') cu pat[0] ('A'). Potrivire!",
      "blocksVisual": [
        {
          "label": "Căutare i = 0",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "D"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "C"}, {"val": "D"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Continuăm: i = 1, j = 1. txt[1] ('B') se potrivește cu pat[1] ('B').",
      "blocksVisual": [
        {
          "label": "Căutare i = 1",
          "groups": [
            [
              {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "D"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "C"}, {"val": "D"}
            ],
            [
              {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Continuăm: i = 2, j = 2. txt[2] ('A') se potrivește cu pat[2] ('A').",
      "blocksVisual": [
        {
          "label": "Căutare i = 2",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "D"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Continuăm: i = 3, j = 3. txt[3] ('B') se potrivește cu pat[3] ('B'). j devine 4.",
      "blocksVisual": [
        {
          "label": "Căutare i = 3",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B", "active": true}, {"val": "D"}
            ],
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B", "active": true}, {"val": "C"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "La i = 4, txt[4] ('D') nu corespunde cu pat[4] ('C'). Mismatch la j = 4!",
      "blocksVisual": [
        {
          "label": "Mismatch i = 4",
          "groups": [
            [
              {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "D", "active": true}
            ],
            [
              {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "C", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "KMP folosește PI: pentru j = 4, fallback pe pi[3] = 2. Înseamnă că prefixul 'AB' coincide cu sufixul dinaintea nepotrivirii. j devine 2, i rămâne 4.",
      "blocksVisual": [
        {
          "label": "Fallback j = 2",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "D", "active": true}
            ],
            [
              {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Comparăm txt[4] ('D') cu pat[2] ('A'). Încă nu se potrivesc! Fallback pe pi[1] = 0. j devine 0.",
      "blocksVisual": [
        {
          "label": "Fallback j = 0",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "D", "active": true}
            ],
            [
              {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "A", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "i = 5, j = 0. txt[5] ('A') se potrivește cu pat[0] ('A'). j devine 1.",
      "blocksVisual": [
        {
          "label": "i = 5, j = 1",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "D"}, {"val": "A", "active": true}, {"val": "B"}
            ],
            [
              {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "-", "hidden": true}, {"val": "A", "active": true}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "i = 6: txt[6] ('B') se potrivește cu pat[1] ('B'). j devine 2.",
      "blocksVisual": [
        {
          "label": "i = 6, j = 2",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}
            ],
            [
              {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "i = 7: txt[7] ('A') se potrivește cu pat[2] ('A'). j devine 3.",
      "blocksVisual": [
        {
          "label": "i = 7, j = 3",
          "groups": [
            [
              {"val": "B"}, {"val": "A", "active": true}, {"val": "C"}
            ],
            [
              {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "La i = 8, txt[8] ('C') nu se potrivește cu pat[3] ('B'). Mismatch! Fallback pe pi[2] = 1. Compare txt[8] ('C') cu pat[1] ('B') (mismatch), fallback pi[0]=0, mismatch.",
      "blocksVisual": [
        {
          "label": "Mismatch la i = 8",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "C", "active": true}
            ],
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "i = 9: txt[9] ('D') vs pat[0] ('A'). Nepotrivire totală. j rămâne 0.",
      "blocksVisual": [
        {
          "label": "i = 9, j = 0",
          "groups": [
            [
              {"val": "D", "active": true}, {"val": "A"}
            ],
            [
              {"val": "A", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "La i = 10, găsim o nouă potrivire! txt[10] ('A') == pat[0] ('A'). j devine 1.",
      "blocksVisual": [
        {
          "label": "Potrivire i = 10",
          "groups": [
            [
              {"val": "D"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ],
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Urmează o serie de potriviri consecutive: i = 11..17 corespund perfect cu pat[1..7]. j crește până la 8.",
      "blocksVisual": [
        {
          "label": "Potriviri succesive",
          "groups": [
            [
              {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "C", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B"}
            ],
            [
              {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "C", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "La i = 18, txt[18] ('B') == pat[8] ('B'). j devine 9 (mărimea patternului). Am găsit o potrivire completă la indexul 10!",
      "blocksVisual": [
        {
          "label": "GĂSIT LA INDEX 10",
          "groups": [
            [
              {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "C", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}, {"val": "A", "sorted": true}, {"val": "B", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 46,
      "text": "După găsirea meciului, facem fallback pe pi[j-1] = pi[8] = 4 pentru a continua căutarea unei alte potriviri. Căutarea se finalizează cu succes.",
      "blocksVisual": [
        {
          "label": "Finalizare",
          "groups": [
            [
              {"val": "KMP finalizat cu succes", "sorted": true}
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Find the Index of the First Occurrence",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        "desc": "Problema KMP Standard"
      }
    ],
    "medium": [
      {
        "title": "Potrivire",
        "url": "https://www.infoarena.ro/problema/strmatch",
        "desc": "String Matching Infoarena"
      },
      {
        "title": "Repeated Substring Pattern",
        "url": "https://leetcode.com/problems/repeated-substring-pattern/",
        "desc": "Găsirea perioadei (folosind Pi Array)"
      }
    ],
    "hard": [
      {
        "title": "Shortest Palindrome",
        "url": "https://leetcode.com/problems/shortest-palindrome/",
        "desc": "Construcție isteață cu KMP"
      }
    ]
  }
};
