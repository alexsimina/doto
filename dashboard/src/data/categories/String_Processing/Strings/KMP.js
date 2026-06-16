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
      "line": 7,
      "text": "Etapa de Preprocesare: Construim PI array-ul pentru pattern-ul 'ABABCABAB'. Ne spune cel mai lung prefix care este și sufix. De exemplu, pentru 'ABABCABAB', ultimul B (index 8) are sufixul 'ABAB' care e egal cu prefixul 'ABAB', deci pi[8] = 4.",
      "blocksVisual": [
        {
          "label": "Pattern și PI Array",
          "groups": [
            [
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "C"
              },
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "A"
              },
              {
                "val": "B"
              }
            ],
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
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
              },
              {
                "val": "3"
              },
              {
                "val": "4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Începem căutarea în text, având PI-ul gata. i e indexul pe text, j pe pattern.",
      "blocksVisual": [
        {
          "label": "KMP Search (i=0..4, j=0..4)",
          "groups": [
            [
              {
                "val": "T: A B A B D ..."
              }
            ],
            [
              {
                "val": "P: A B A B C ..."
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Găsim potrivire la primele 4 litere: 'ABAB' se potrivește cu 'ABAB'. Dar la i=4 în text e 'D', iar la j=4 în pattern e 'C'. Mismatch!",
      "blocksVisual": [
        {
          "label": "Mismatch la C vs D",
          "groups": [
            [
              {
                "val": "A",
                "sorted": true
              },
              {
                "val": "B",
                "sorted": true
              },
              {
                "val": "A",
                "sorted": true
              },
              {
                "val": "B",
                "sorted": true
              },
              {
                "val": "D",
                "active": true
              }
            ],
            [
              {
                "val": "A",
                "sorted": true
              },
              {
                "val": "B",
                "sorted": true
              },
              {
                "val": "A",
                "sorted": true
              },
              {
                "val": "B",
                "sorted": true
              },
              {
                "val": "C",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "În loc să ne întoarcem pe i în text la indexul 1 (cum ar face varianta naivă), KMP zice: M-am blocat la j=4. PI array pt j-1 (adică pi[3]) este 2. Știm că 'AB' este deja un prefix care s-a potrivit la capătul a ceea ce am citit. Deci mutăm j la 2!",
      "blocksVisual": [
        {
          "label": "Shift inteligent (j = 2)",
          "groups": [
            [
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "A",
                "sorted": true
              },
              {
                "val": "B",
                "sorted": true
              },
              {
                "val": "D",
                "active": true
              }
            ],
            [
              {
                "val": "-",
                "hidden": true
              },
              {
                "val": "-",
                "hidden": true
              },
              {
                "val": "A",
                "sorted": true
              },
              {
                "val": "B",
                "sorted": true
              },
              {
                "val": "A",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Acum comparăm text[4] ('D') cu pattern[2] ('A'). Încă nu e bine. j=2, ne ducem la pi[1] care e 0. j devine 0.",
      "blocksVisual": [
        {
          "label": "Nou shift",
          "groups": [
            [
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "D",
                "active": true
              }
            ],
            [
              {
                "val": "-",
                "hidden": true
              },
              {
                "val": "-",
                "hidden": true
              },
              {
                "val": "-",
                "hidden": true
              },
              {
                "val": "-",
                "hidden": true
              },
              {
                "val": "A",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "i-ul pur și simplu continuă (i avansează, NICIODATĂ nu scade). Așa obținem O(N). Patternul este decalat constant pe baza informațiilor din PI array.",
      "blocksVisual": [
        {
          "label": "Căutare mai departe",
          "groups": [
            [
              {
                "val": "KMP Rulez!"
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
