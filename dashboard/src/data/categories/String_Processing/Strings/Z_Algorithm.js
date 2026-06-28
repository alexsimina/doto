export const data = {
  "presentation": "### Algoritmul Z (Z-Algorithm)\n\nAlgoritmul Z este un algoritm extrem de eficient utilizat în procesarea șirurilor de caractere pentru a găsi toate aparițiile unui șablon (pattern) într-un text dat în timp liniar $\\mathcal{O}(N + M)$.\n\n### Structura Tabloului Z\n\nPentru un șir $S$ de lungime $N$, tabloul $Z$ este un vector de dimensiune $N$ unde fiecare element $Z[i]$ (pentru $i > 0$) reprezintă lungimea celui mai lung prefix comun (LCP) între $S$ și sufixul lui $S$ care începe la poziția $i$.\nMatematic:\n$$Z[i] = \\max \\{ k : S[0 \\dots k-1] = S[i \\dots i+k-1] \\}$$\nPrin convenție, $Z[0] = 0$.\n\n### Menținerea Ferestrei $[L, R]$\n\nPentru a atinge complexitatea liniară, algoritmul folosește conceptul de „fereastră de potrivire” $[L, R]$, care reprezintă intervalul $[L, R]$ ce maximizează valoarea lui $R$ astfel încât $S[L \\dots R]$ este un prefix al lui $S$.\n\nAtunci când calculăm $Z[i]$, distingem două cazuri:\n1. **$i > R$ (în afara ferestrei):** Nu avem informații precalculate. Comparăm caracterele succesiv începând de la poziția $i$ cu cele de la prefixul lui $S$ ($S[0], S[1], \\dots$) până găsim o nepotrivire. Dacă lungimea potrivirii $k > 0$, definim o nouă fereastră $[L, R] = [i, i + k - 1]$.\n2. **$i \\le R$ (în interiorul ferestrei):** Fie $k = i - L$.\n   - Dacă $Z[k] < R - i + 1$, atunci valoarea este complet înăuntrul ferestrei curente, deci $Z[i] = Z[k]$.\n   - Dacă $Z[k] \\ge R - i + 1$, potrivirea se poate extinde dincolo de marginea dreaptă $R$. Pornim compararea manuală de la caracterul $S[R+1]$ încolo și actualizăm fereastra $[L, R]$ cu noul interval determinat.",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(N)$, unde $N$ este lungimea șirului $S$. Deși avem bucle imbricate, pointerul $R$ avansează doar spre dreapta și nu este decrementat niciodată în timpul comparărilor succesive. Astfel, numărul maxim de comparații de caractere este cel mult $2N$.\n- **Spațiu:** $\\mathcal{O}(N)$ pentru stocarea tabloului $Z$.",
  "variations": "### Variații și Aplicații\n\n1. **Căutarea unui Șablon (Pattern Matching):** Pentru a căuta un șablon $P$ într-un text $T$, construim șirul concatenat $S = P + \\# + T$. Calculăm vectorul $Z$ pentru $S$. Orice poziție $i$ unde $Z[i] = |P|$ marchează începutul unei apariții a șablonului în text.\n2. **Determinarea Perioadelor unui Șir:** Dacă pentru un index $i$, $i + Z[i] = N$ și $N$ se divide la $i$, atunci $i$ reprezintă o perioadă validă a șirului.\n3. **Edge Cases:**\n   - Șiruri cu un singur caracter.\n   - Șiruri în care toate caracterele sunt identice (de exemplu `\"aaaa\"`).\n   - Șiruri fără nicio potrivire internă.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Algoritmi de Căutare a Textului:** Utilizat ca alternativă la KMP datorită simplității implementării și vitezei sale comparabile.\n- **Bioinformatică:** Alinierea secvențelor de ADN sau identificarea repetițiilor în genomuri.\n- **Compresia Datelor:** Identificarea repetitivității în date pentru utilizarea în scheme de compresie de tip Lempel-Ziv.",
  "code": `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

vector<int> calculateZ(string s) {
    int n = s.length();
    vector<int> z(n, 0);
    int L = 0, R = 0;

    for (int i = 1; i < n; i++) {
        if (i <= R) {
            int k = i - L;
            if (z[k] < R - i + 1) {
                z[i] = z[k];
            } else {
                L = i;
                while (R < n && s[R - L] == s[R]) {
                    R++;
                }
                z[i] = R - L;
                R--;
            }
        } else {
            L = i;
            R = i;
            while (R < n && s[R - L] == s[R]) {
                R++;
            }
            z[i] = R - L;
            R--;
        }
    }
    return z;
}

int main() {
    string s = "aabaabaa";
    vector<int> z = calculateZ(s);
    for (int i = 0; i < s.length(); i++) {
        cout << "Z[" << i << "] = " << z[i] << "\\n";
    }
    return 0;
}
`,
  "explanations": [
  {
    "line": 39,
    "text": "Pornim programul în funcția main.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 40,
    "text": "Inițializăm șirul s = \"aabaabaa\" de lungime 8.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 41,
    "text": "Apelăm funcția calculateZ(s) pentru a construi tabloul Z.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "În interiorul calculateZ, aflăm lungimea n = 8.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Inițializăm vectorul Z cu valoarea 0 pentru toate cele 8 elemente. Z[0] = 0.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Inițializăm limitele ferestrei L = 0 și R = 0.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Începem bucla for de la indexul i = 1.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm condiția i <= R. Deoarece 1 <= 0 este fals, trecem direct pe ramura else.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Setăm L = 1 și R = 1.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "Comparăm caracterele din prefix cu sufixul pornind de la poziția i = 1. Avem s[0] == s[1] ('a' == 'a') - potrivire. R devine 2. Apoi s[1] == s[2] ('a' == 'b') - nepotrivire. Ne oprim.",
    "blocksVisual": [
      {
        "label": "Șirul s",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 32,
    "text": "Calculăm Z[1] = R - L = 2 - 1 = 1. Apoi setăm R = 1. Fereastra curentă este [L, R] = [1, 1].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [1, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Mergem la următorul pas din buclă: i = 2.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [1, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm dacă i <= R. Deoarece 2 <= 1 este fals, intrăm în else.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [1, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Setăm L = 2 și R = 2.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [1, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "Comparăm caracterele pornind de la i = 2: s[0] == s[2] ('a' == 'b') - nepotrivire. Rămânem cu 0 potriviri.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [1, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 32,
    "text": "Calculăm Z[2] = R - L = 2 - 2 = 0. Apoi setăm R = 1 (decrementare). Fereastra revine la [1, 1].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [2, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Trecem la următorul pas din buclă: i = 3.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [2, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm dacă i <= R. Deoarece 3 <= 1 este fals, mergem în else.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [2, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Setăm L = 3 și R = 3.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [2, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "Comparăm elementele succesive începând de la indexul 3 cu caracterele de la începutul șirului. Găsim 5 potriviri (\"aabaa\" de la 3 la 7 coincide cu prefixul \"aabaa\"). R crește la 8.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [2, 1])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 32,
    "text": "Calculăm Z[3] = R - L = 8 - 3 = 5. Apoi decrementăm R la 7. Noua fereastră optimă este [L, R] = [3, 7].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Trecem la următorul pas din buclă: i = 4.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm dacă i <= R. Deoarece 4 <= 7 este adevărat, suntem complet în interiorul ferestrei active [3, 7]!",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Calculăm indexul corespondent în prefix: k = i - L = 4 - 3 = 1.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "Verificăm dacă Z[k] < R - i + 1. Avem Z[1] = 1, iar R - i + 1 = 7 - 4 + 1 = 4. Deoarece 1 < 4, putem copia valoarea fără comparații suplimentare!",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Setăm direct Z[4] = Z[1] = 1.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Trecem la următorul pas din buclă: i = 5.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm dacă i <= R. Deoarece 5 <= 7 este adevărat, suntem în interiorul ferestrei [3, 7].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Aflăm indexul corespondent în prefix: k = i - L = 5 - 3 = 2.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "Verificăm dacă Z[k] < R - i + 1. Avem Z[2] = 0, iar R - i + 1 = 7 - 5 + 1 = 3. Deoarece 0 < 3 este adevărat, copiem valoarea direct.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Setăm direct Z[5] = Z[2] = 0.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": true
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Trecem la următorul pas din buclă: i = 6.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm dacă i <= R. Deoarece 6 <= 7 este adevărat, suntem în interiorul ferestrei [3, 7].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Calculăm k = i - L = 6 - 3 = 3.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "Verificăm dacă Z[3] < R - i + 1. Avem Z[3] = 5, iar R - i + 1 = 7 - 6 + 1 = 2. Deoarece 5 < 2 este fals, este posibil ca potrivirea să continue dincolo de R. Intrăm în else.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [3, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Actualizăm originea ferestrei: L = 6.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Încercăm să extindem fereastra pornind de la R = 7. Comparăm s[R-L] cu s[R], adică s[1] cu s[7]. Deoarece 'a' == 'a', potrivirea se extinde! R devine 8. Apoi s[2] cu s[8] (depășește lungimea șirului). Ne oprim.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Calculăm Z[6] = R - L = 8 - 6 = 2. Noua fereastră devine [L, R] = [6, 7].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "0",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Mergem la ultimul pas al buclei: i = 7.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": true
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Verificăm dacă i <= R. Deoarece 7 <= 7 este adevărat, intrăm în if.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
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
    "text": "Calculăm k = i - L = 7 - 6 = 1.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
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
    "line": 16,
    "text": "Verificăm dacă Z[1] < R - i + 1. Avem Z[1] = 1, iar R - i + 1 = 7 - 7 + 1 = 1. Deoarece 1 < 1 este fals, mergem în else pentru a încerca să extindem.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [6, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
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
    "line": 19,
    "text": "Actualizăm originea ferestrei: L = 7.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
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
    "line": 20,
    "text": "Încercăm extinderea pornind de la R = 7: s[0] cu s[7]. Deoarece 'a' == 'a', potrivirea se extinde, R devine 8. Apoi s[1] cu s[8] (out of bounds). Ne oprim.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
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
    "line": 23,
    "text": "Calculăm Z[7] = R - L = 8 - 7 = 1. Noua fereastră devine [L, R] = [7, 7].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
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
    "line": 36,
    "text": "Returnăm vectorul Z rezultat: [0, 1, 0, 5, 1, 0, 2, 1].",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 41,
    "text": "Vectorul z este recepționat în main.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 42,
    "text": "Afișăm valorile calculate din vectorul z.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 45,
    "text": "Programul se încheie cu succes returnând 0.",
    "blocksVisual": [
      {
        "label": "Șirul s (Fereastra [7, 7])",
        "groups": [
          [
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "b",
              "active": false
            },
            {
              "val": "a",
              "active": false
            },
            {
              "val": "a",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Vectorul Z",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "5",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "0",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
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
        "title": "Find the Index of the First Occurrence in a String (LeetCode 28)",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        "desc": "Găsirea primei apariții a unui șablon într-un text, rezolvabilă eficient prin concatenare și aplicarea vectorului Z."
      },
      {
        "title": "Longest Happy Prefix (LeetCode 1392)",
        "url": "https://leetcode.com/problems/longest-happy-prefix/",
        "desc": "Găsirea celui mai lung prefix al unui șir care este în același timp și sufix al acestuia."
      }
    ],
    "medium": [
      {
        "title": "Password (Codeforces 126B)",
        "url": "https://codeforces.com/problemset/problem/126/B",
        "desc": "Determinarea unui subșir care este simultan prefix, sufix și apare undeva la mijlocul șirului dat."
      },
      {
        "title": "Preficși și Suficși (Codeforces 432D)",
        "url": "https://codeforces.com/problemset/problem/432/D",
        "desc": "Găsirea tuturor prefixelor unui șir care sunt și sufixe ale acestuia și determinarea numărului de apariții ale fiecăruia în text."
      }
    ],
    "hard": [
      {
        "title": "Jocul Zlego (Infoarena zlego)",
        "url": "https://www.infoarena.ro/problema/zlego",
        "desc": "O problemă excelentă în care se cere calcularea unei sume ponderate bazate pe lungimile potrivirilor de prefixe determinate prin algoritmul Z."
      },
      {
        "title": "Sum of Scores of Built Strings (LeetCode 2223)",
        "url": "https://leetcode.com/problems/sum-of-scores-of-built-strings/",
        "desc": "Calcularea sumei scorurilor tuturor sufixelor unui șir, unde scorul unui sufix este lungimea celui mai lung prefix comun cu șirul inițial. Aceasta este exact definiția valorilor din vectorul Z."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      // Z array dynamic state reconstruction
      const z = [0, 0, 0, 0, 0, 0, 0, 0];
      let L = 0, R = 0, i = -1, k = -1;

      if (stepIndex >= 10) { z[1] = 1; L = 1; R = 1; }
      if (stepIndex >= 15) { z[2] = 0; L = 2; R = 1; }
      if (stepIndex >= 20) { z[3] = 5; L = 3; R = 7; }
      if (stepIndex >= 25) { z[4] = 1; }
      if (stepIndex >= 30) { z[5] = 0; }
      if (stepIndex >= 38) { z[6] = 2; L = 6; R = 7; }
      if (stepIndex >= 44) { z[7] = 1; L = 7; R = 7; }

      // Map step to variables i and k
      if (stepIndex >= 6 && stepIndex <= 10) { i = 1; }
      else if (stepIndex >= 11 && stepIndex <= 15) { i = 2; }
      else if (stepIndex >= 16 && stepIndex <= 20) { i = 3; }
      else if (stepIndex >= 21 && stepIndex <= 25) { i = 4; if (stepIndex >= 23) k = 1; }
      else if (stepIndex >= 26 && stepIndex <= 30) { i = 5; if (stepIndex >= 28) k = 2; }
      else if (stepIndex >= 31 && stepIndex <= 38) { i = 6; if (stepIndex >= 33) k = 3; if (stepIndex >= 35) { L = 6; } }
      else if (stepIndex >= 39 && stepIndex <= 44) { i = 7; if (stepIndex >= 41) k = 1; if (stepIndex >= 42) { L = 7; } }

      if (stepIndex >= 3 && stepIndex <= 41) {
        vars.push({ name: "n", type: "int", val: "8", expandable: false });
        vars.push({ name: "z", type: "std::vector<int>", val: `{${z.join(", ")}}`, expandable: false });
        vars.push({ name: "L", type: "int", val: L.toString(), expandable: false });
        vars.push({ name: "R", type: "int", val: R.toString(), expandable: false });
      }

      if (i !== -1) vars.push({ name: "i", type: "int", val: i.toString(), expandable: false });
      if (k !== -1) vars.push({ name: "k", type: "int", val: k.toString(), expandable: false });

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 2) ? 39 + stepIndex : (stepIndex >= 42 ? 41 + (stepIndex - 42) : 41) });
      if (stepIndex >= 3 && stepIndex <= 41) {
        frames.unshift({ name: "calculateZ(s=\"aabaabaa\")", file: "solution.cpp", line: activeLine });
      }

      // Inline value calculations
      if (stepIndex >= 6 && stepIndex <= 41) {
        let parts = [];
        if (i !== -1) parts.push(`i: ${i}`);
        if (L !== 0 || R !== 0) parts.push(`[L, R]: [${L}, ${R}]`);
        if (k !== -1) parts.push(`k: ${k}`);
        inlineVal = parts.join(", ");
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let L = 0, R = 0, i = -1, k = -1;

      if (stepIndex >= 10) { L = 1; R = 1; }
      if (stepIndex >= 15) { L = 2; R = 1; }
      if (stepIndex >= 20) { L = 3; R = 7; }
      if (stepIndex >= 38) { L = 6; R = 7; }
      if (stepIndex >= 44) { L = 7; R = 7; }

      if (stepIndex >= 6 && stepIndex <= 10) { i = 1; }
      else if (stepIndex >= 11 && stepIndex <= 15) { i = 2; }
      else if (stepIndex >= 16 && stepIndex <= 20) { i = 3; }
      else if (stepIndex >= 21 && stepIndex <= 25) { i = 4; if (stepIndex >= 23) k = 1; }
      else if (stepIndex >= 26 && stepIndex <= 30) { i = 5; if (stepIndex >= 28) k = 2; }
      else if (stepIndex >= 31 && stepIndex <= 38) { i = 6; if (stepIndex >= 33) k = 3; if (stepIndex >= 35) { L = 6; } }
      else if (stepIndex >= 39 && stepIndex <= 44) { i = 7; if (stepIndex >= 41) k = 1; if (stepIndex >= 42) { L = 7; } }

      if (lineNum === 13 && i !== -1) return `i = ${i}`;
      if (lineNum === 14 && i !== -1) return `i <= R? ${i} <= ${R}`;
      if (lineNum === 15 && k !== -1) return `k = ${k}`;
      if (lineNum === 20 || lineNum === 29) return `comparing characters`;
      return null;
    }
  }
};
