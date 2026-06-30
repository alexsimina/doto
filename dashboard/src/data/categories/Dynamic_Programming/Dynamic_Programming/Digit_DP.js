export const data = {
  "presentation": `### Prezentare Generală

Programarea Dinamică pe Cifre (Digit DP) este o tehnică puternică utilizată pentru a număra numerele dintr-un interval $[A, B]$ care satisfac o optimizare legată de cifrele lor (de exemplu: suma cifrelor este egală cu $S$, nu conțin cifra 13, au un număr par de cifre pare etc.).

În loc să iterăm prin toate numerele din interval (ceea ce ar fi imposibil pentru limite mari precum $10^{18}$), construim numerele cifră cu cifră, de la stânga la dreapta, folosind o abordare recursivă cu memoizare.

### Formulare DP
Pentru a număra numerele în intervalul $[0, N]$, reprezentăm $N$ ca un șir de caractere. Definim starea DP:
- $dp[idx][sum][tight]$ = numărul de moduri de a completa cifrele de la indexul $idx$ până la sfârșit, astfel încât suma cifrelor rămase să completeze suma țintă $S$ (sau să obținem exact suma parțială $sum$), iar starea de limitare este $tight$.

Parametrii stării:
1. $idx$: poziția curentă a cifrei pe care o plasăm (de la $0$ la $L-1$, unde $L$ este lungimea lui $N$).
2. $sum$: suma cifrelor plasate până în acest punct.
3. $tight$: o valoare booleană care indică dacă prefixul construit până acum este identic cu prefixul lui $N$.
   - Dacă $tight = 1$ (adevărat), cifra curentă poate fi cel mult $N[idx]$. Dacă punem o cifră strict mai mică, $tight$ devine $0$ pentru restul cifrelor. Dacă punem exact $N[idx]$, $tight$ rămâne $1$.
   - Dacă $tight = 0$ (fals), nu mai avem nicio restricție și putem plasa orice cifră de la $0$ la $9$.

### Tranziții
Pentru o stare curentă $(idx, sum, tight)$, determinăm limita superioară a cifrei curent:
$$limit = tight ? (N[idx] - '0') : 9$$

Parcurgem fiecare cifră $d$ de la $0$ la $limit$. Noul $tight$ (pe care îl numim $next\\_tight$) devine $tight \\land (d == limit)$. Suma devine $sum + d$.
Formula de recurență adună rezultatele stărilor următoare:
$$dp[idx][sum][tight] = \\sum_{d=0}^{limit} solve(idx + 1, sum + d, tight \\land (d == limit))$$

### Cazuri de Bază
Când ajungem la $idx == L$:
- Dacă $sum == S$, am obținut un număr valid, deci returnăm $1$.
- Altfel, returnăm $0$.`,
  "complexity": `### Complexitate

- **Timp:** $\\mathcal{O}(L \\times S \\times 10)$, unde $L$ este numărul de cifre ale lui $N$ (care este $\\mathcal{O}(\\log_{10} N)$) și $S$ este suma țintă a cifrelor. Numărul total de stări este $L \\times S \\times 2$, iar din fiecare stare facem cel mult 10 tranziții. Acest lucru face ca algoritmul să ruleze aproape instantaneu chiar și pentru $N \\le 10^{18}$.
- **Spațiu:** $\\mathcal{O}(L \\times S \\times 2)$ pentru tabelul de memoizare, care stochează rezultatele subproblemelor deja rezolvate pentru a evita recalcularile.`,
  "variations": `### Variații și Edge Cases

1. **Numere fără zerouri nesemnificative:** În unele probleme (de exemplu, când numărăm numere cu cifre adiacente diferite), prezența zerourilor la început poate afecta logica. Adăugăm un parametru $leading\\_zero$ în starea recursivă.
2. **Intervalul $[A, B]$:** Pentru a calcula rezultatul pe un interval general $[A, B]$, folosim relația standard:
   $$ans(A, B) = ans(0, B) - ans(0, A - 1)$$
3. **Divizibilitate:** Numărarea numerelor divizibile cu un număr $K$. Adăugăm în starea DP valoarea $\\text{modulo } K$ a prefixului curent: $rem = (rem \\cdot 10 + d) \\pmod K$.
4. **Edge Cases:**
   - $N = 0$.
   - Suma țintă $S$ este mai mare decât cea mai mare sumă posibilă ($9 \\times L$). În acest caz, rezultatul este direct 0.`,
  "applications": `### Aplicații în Lumea Reală

- **Generarea Cheilor Criptografice:** Identificarea sau verificarea numerelor prime cu anumite proprietăți ale cifrelor (de exemplu, sume de control).
- **Probleme de Optimizare a Numărilior în Baze de Date:** Căutarea rapidă a ID-urilor sau a codurilor numerice care satisfac șabloane specifice de cifre pe intervale foarte mari.
- **Teoria Numerelor și Analiză Statistică:** Studiul distribuției numerelor cu diverse proprietăți cifrice (cum ar fi numerele Harshad, care sunt divizibile cu suma cifrelor lor).`,
  code: `#include <iostream>
#include <string>
#include <cstring>
using namespace std;

string N = "123";
int S = 5;
int dp[4][10][2]; // dp[idx][sum][tight]

int solve(int idx, int sum, bool tight) {
    if (idx == N.length()) {
        return (sum == S) ? 1 : 0;
    }
    if (sum > S) {
        return 0;
    }
    if (dp[idx][sum][tight] != -1) {
        return dp[idx][sum][tight];
    }
    int limit = tight ? (N[idx] - '0') : 9;
    int ans = 0;
    for (int digit = 0; digit <= limit; digit++) {
        ans += solve(idx + 1, sum + digit, tight && (digit == limit));
    }
    return dp[idx][sum][tight] = ans;
}

int main() {
    memset(dp, -1, sizeof(dp));
    int result = solve(0, 0, true);
    cout << "Rezultat: " << result << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 28,
      "text": "Pornim execuția programului în funcția main.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?" }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 29,
      "text": "Inițializăm tabelul de memoizare dp cu -1 pe toate stările.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?" }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Apelăm recursiv solve(0, 0, true) pentru a începe plasarea de la primul index, cu suma 0 și tight=true.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Intrăm în solve(0, 0, true). Începem plasarea primei cifre.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 11,
      "text": "Verificăm cazul de bază: idx == 3. Este fals.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Verificăm dacă suma curentă (0) depășește S (5). Fals.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Verificăm dacă dp[0][0][true] este memoizată. Nu este (-1).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Deoarece tight=true, limita cifrei curente este N[0] - '0' = 1.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Inițiem bucla for cu digit = 0.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0", "active": true }, { "val": "?" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Pentru digit = 0, apelăm recursiv solve(1, 0, false). Starea tight devine false deoarece digit (0) < limit (1).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Intrăm în solve(1, 0, false). Căutăm moduri pentru a doua poziție cu tight=false.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "Starea dp[1][0][false] nu este calculată (-1), continuăm.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Deoarece tight=false, nu suntem limitați de N. Limita devine 9.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Începem iterarea cifrelor. Începem cu digit = 0.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Apelăm recursiv solve(2, 0, false) cu digit = 0 pe a doua poziție.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Intrăm în solve(2, 0, false). Căutăm cifra de pe poziția finală.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Deoarece tight=false, limita cifrei finale este 9.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Parcurgem cifrele de la 0 la 9. Pentru a obține suma totală S=5, doar digit = 5 este valid (0+0+5=5). Să analizăm apelul solve(3, 5, false).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0" }, { "val": "5", "active": true }]]
        }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în solve(3, 5, false). idx == 3. Deoarece sum (5) == S (5), returnăm 1 (am identificat numărul valid 005).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0" }, { "val": "5", "sorted": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Pentru solve(2, 0, false), singura cale validă este digit=5. Salvăm dp[2][0][false] = 1 și returnăm 1.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [{"r": 3, "c": 1}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "0" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Revenim în solve(1, 0, false). Pentru digit = 1, apelăm recursiv solve(2, 1, false).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "În solve(2, 1, false), doar digit = 4 duce la suma S=5 (numărul 014). Salvăm starea dp[2][1][false] = 1.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [{"r": 3, "c": 2}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "După terminarea buclei din solve(1, 0, false) (care adună modurile din 005, 014, 023, 032, 041, 050), obținem totalul de 6. Salvăm starea dp[1][0][false] = 6.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [{"r": 2, "c": 1}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "0" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Revenim în solve(0, 0, true) pentru digit = 0. Acum trecem la digit = 1. Apelăm solve(1, 1, true) (deoarece digit == limit, tight rămâne true).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Intrăm în solve(1, 1, true). Începem calculul pentru cifrele din ramura tight (prefixul curent fiind '1').",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "Deoarece tight=true, limita cifrei este N[1] - '0' = 2.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "?", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 22,
      "text": "Începem iterarea cifrelor de la 0 la 2. Pornim cu digit = 0.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "0", "active": true }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "Pentru digit = 0, apelăm solve(2, 1, false) (tight devine false).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "0" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 17,
      "text": "În solve(2, 1, false), verificăm dacă starea a fost deja vizitată. Găsim valoarea 1 în tabelul de memoizare pentru dp[2][1][false].",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": [{"r": 3, "c": 2}]
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "0" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 18,
      "text": "Returnăm direct valoarea memoizată 1. Aceasta evită apeluri recursive redundante.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": [{"r": 3, "c": 2}]
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "0" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "În mod similar, pentru digit = 1 apelăm solve(2, 2, false) (care este memoizat tot ca fiind 1). Pentru digit = 2, apelăm solve(2, 3, true) (tight rămâne true).",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "?", "active": true }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "În solve(2, 3, true), singura cifră validă este 2 (am determinat numărul 122). Salvăm dp[2][3][true] = 1.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, 1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [{"r": 3, "c": 4}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "3", "active": true }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "2" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "În solve(1, 1, true), adunăm cele trei moduri obținute (din 104, 113, 122) și salvăm dp[1][1][true] = 3.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, 3]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, 1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1" }, { "val": "2", "active": true }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "1" }, { "val": "?" }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "În solve(0, 0, true), adunăm rezultatele pentru digit=0 (6 moduri) și digit=1 (3 moduri), obținând 9 moduri în total. Salvăm dp[0][0][true] = 9.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, 9]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, 3]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, 1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [{"r": 1, "c": 1}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Cifrele lui N",
          "groups": [[{ "val": "1", "active": true }, { "val": "2" }, { "val": "3" }]]
        },
        {
          "label": "Cifre Plasate",
          "groups": [[{ "val": "?" }]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Revenim în main. Apelul principal solve(0, 0, true) a finalizat și a dat rezultatul 9.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, 9]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, 3]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, 1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Rezultat Final",
          "groups": [[{ "val": "9", "sorted": true }]]
        }
      ]
    },
    {
      "line": 31,
      "text": "Afișăm rezultatul: 9.",
      "matrix": {
        "headers": ["idx \\ sum", "0", "1", "2", "3", "4", "5"],
        "data": [
          ["idx = 0", "[-1, 9]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 1", "[6, -1]", "[-1, 3]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 2", "[1, -1]", "[1, -1]", "[-1, -1]", "[-1, 1]", "[-1, -1]", "[-1, -1]"],
          ["idx = 3", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]", "[-1, -1]"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Afișaj Consolă",
          "groups": [[{ "val": "Rezultat: 9", "sorted": true }]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Suma Cifrelor (CPCRC1C)",
        "url": "https://www.spoj.com/problems/CPCRC1C/",
        "desc": "Calculați suma tuturor cifrelor numerelor din intervalul [A, B]."
      }
    ],
    "medium": [
      {
        "title": "Digit DP count with sum",
        "url": "https://leetcode.com/problems/find-all-good-indices/",
        "desc": "Determinarea numărului de indici buni pe baza proprietăților cifrelor."
      }
    ],
    "hard": [
      {
        "title": "Investigation (LightOJ)",
        "url": "https://lightoj.com/problem/investigation",
        "desc": "Numărați câte numere din intervalul [A, B] sunt divizibile cu K, iar suma cifrelor lor este de asemenea divizibilă cu K."
      }
    ]
  },
  "globalVars": [
    {
      "name": "N",
      "type": "string",
      "val": "\"123\"",
      "expandable": false
    },
    {
      "name": "S",
      "type": "int",
      "val": "5",
      "expandable": false
    },
    {
      "name": "dp",
      "type": "int[4][10][2]",
      "val": "memoization table",
      "expandable": true
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "N", type: "string", val: '"123"', expandable: false });
      globalVars.push({ name: "S", type: "int", val: "5", expandable: false });
      globalVars.push({ name: "dp", type: "int[4][10][2]", val: "memoization table", expandable: true });

      const stackStates = {
        3:  [{ idx: 0, sum: 0, tight: true }],
        4:  [{ idx: 0, sum: 0, tight: true }],
        5:  [{ idx: 0, sum: 0, tight: true }],
        6:  [{ idx: 0, sum: 0, tight: true }],
        7:  [{ idx: 0, sum: 0, tight: true }],
        8:  [{ idx: 0, sum: 0, tight: true }],
        9:  [{ idx: 0, sum: 0, tight: true }],
        10: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        11: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        12: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        13: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        14: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        15: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        16: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        17: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        18: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }, { idx: 3, sum: 5, tight: false }],
        19: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }, { idx: 3, sum: 5, tight: false }],
        20: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        21: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 1, tight: false }],
        22: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        23: [{ idx: 0, sum: 0, tight: true }],
        24: [{ idx: 0, sum: 0, tight: true }],
        25: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        26: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        27: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        28: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 1, tight: false }],
        29: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 1, tight: false }],
        30: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 1, tight: false }],
        31: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 2, tight: false }],
        32: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 3, tight: true }],
        33: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 3, tight: true }],
        34: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        35: [{ idx: 0, sum: 0, tight: true }],
      };

      if (stepIndex <= 2) {
        frames.push({ name: "main()", file: "main.cpp", line: stepIndex === 0 ? 28 : (stepIndex === 1 ? 29 : 30) });
      } else if (stepIndex >= 3 && stepIndex <= 35) {
        const activeStack = stackStates[stepIndex] || [{ idx: 0, sum: 0, tight: true }];
        activeStack.forEach((st, fIdx) => {
          const isTop = fIdx === activeStack.length - 1;
          frames.unshift({
            name: `solve(idx = ${st.idx}, sum = ${st.sum}, tight = ${st.tight ? "true" : "false"})`,
            file: "solution.cpp",
            line: isTop ? activeLine : 23
          });
        });

        const topFrame = activeStack[activeStack.length - 1];
        vars.push({ name: "idx", type: "int", val: topFrame.idx.toString(), expandable: false });
        vars.push({ name: "sum", type: "int", val: topFrame.sum.toString(), expandable: false });
        vars.push({ name: "tight", type: "bool", val: topFrame.tight ? "true" : "false", expandable: false });

        let limit = -1;
        if (topFrame.tight) {
          if (topFrame.idx < 3) limit = [1, 2, 3][topFrame.idx];
        } else {
          limit = 9;
        }
        if (limit !== -1 && stepIndex >= 7) {
          vars.push({ name: "limit", type: "int", val: limit.toString(), expandable: false });
        }

        let digit = -1;
        if (stepIndex === 8 || stepIndex === 9) digit = 0;
        else if (stepIndex === 13 || stepIndex === 14) digit = 0;
        else if (stepIndex === 17 || stepIndex === 18) digit = 5;
        else if (stepIndex === 20 || stepIndex === 21) digit = 1;
        else if (stepIndex === 23) digit = 0;
        else if (stepIndex === 24) digit = 1;
        else if (stepIndex === 26 || stepIndex === 27) digit = 0;
        else if (stepIndex === 28 || stepIndex === 29 || stepIndex === 30) digit = 0;
        else if (stepIndex === 31) digit = 1;
        else if (stepIndex === 32 || stepIndex === 33) digit = 2;

        if (digit !== -1) {
          vars.push({ name: "digit", type: "int", val: digit.toString(), expandable: false });
        }

        let ans = -1;
        if (stepIndex === 19) ans = 1;
        else if (stepIndex === 20) ans = 1;
        else if (stepIndex === 21) ans = 1;
        else if (stepIndex === 22) ans = 6;
        else if (stepIndex === 30) ans = 1;
        else if (stepIndex === 33) ans = 1;
        else if (stepIndex === 34) ans = 3;
        else if (stepIndex === 35) ans = 9;

        if (ans !== -1) {
          vars.push({ name: "ans", type: "int", val: ans.toString(), expandable: false });
        }

        frames.push({ name: "main()", file: "main.cpp", line: 30 });
      } else if (stepIndex >= 36) {
        frames.push({ name: "main()", file: "main.cpp", line: stepIndex === 36 ? 30 : 31 });
        vars.push({ name: "result", type: "int", val: "9", expandable: false });
      }

      if (stepIndex >= 3 && stepIndex <= 35) {
        const activeStack = stackStates[stepIndex] || [{ idx: 0, sum: 0, tight: true }];
        const topFrame = activeStack[activeStack.length - 1];
        inlineVal = `idx: ${topFrame.idx}, sum: ${topFrame.sum}, tight: ${topFrame.tight ? "true" : "false"}`;
      } else if (stepIndex >= 36) {
        inlineVal = `result: 9`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const stackStates = {
        3:  [{ idx: 0, sum: 0, tight: true }],
        4:  [{ idx: 0, sum: 0, tight: true }],
        5:  [{ idx: 0, sum: 0, tight: true }],
        6:  [{ idx: 0, sum: 0, tight: true }],
        7:  [{ idx: 0, sum: 0, tight: true }],
        8:  [{ idx: 0, sum: 0, tight: true }],
        9:  [{ idx: 0, sum: 0, tight: true }],
        10: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        11: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        12: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        13: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        14: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        15: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        16: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        17: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        18: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }, { idx: 3, sum: 5, tight: false }],
        19: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }, { idx: 3, sum: 5, tight: false }],
        20: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 0, tight: false }],
        21: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }, { idx: 2, sum: 1, tight: false }],
        22: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 0, tight: false }],
        23: [{ idx: 0, sum: 0, tight: true }],
        24: [{ idx: 0, sum: 0, tight: true }],
        25: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        26: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        27: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        28: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 1, tight: false }],
        29: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 1, tight: false }],
        30: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 1, tight: false }],
        31: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 2, tight: false }],
        32: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 3, tight: true }],
        33: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }, { idx: 2, sum: 3, tight: true }],
        34: [{ idx: 0, sum: 0, tight: true }, { idx: 1, sum: 1, tight: true }],
        35: [{ idx: 0, sum: 0, tight: true }],
      };

      if (stepIndex >= 3 && stepIndex <= 35) {
        const activeStack = stackStates[stepIndex];
        if (activeStack) {
          const topFrame = activeStack[activeStack.length - 1];
          if (lineNum === 10) {
            return `idx: ${topFrame.idx}, sum: ${topFrame.sum}, tight: ${topFrame.tight ? "true" : "false"}`;
          }
          if (lineNum === 20) {
            let limit = topFrame.tight ? [1, 2, 3][topFrame.idx] : 9;
            return `limit: ${limit}`;
          }
        }
      }
      if (stepIndex >= 36 && lineNum === 31) {
        return `result: 9`;
      }
      return null;
    }
  }
};
