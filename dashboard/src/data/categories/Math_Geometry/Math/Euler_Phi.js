export const data = {
  "presentation": `### Prezentare Generală

Indicatorul lui Euler (sau funcția totient, notată cu $\\phi(n)$) este o funcție aritmetică extrem de importantă în teoria numerelor. Ea determină numărul de numere întregi pozitive mai mici sau egale cu $n$ care sunt prime cu $n$ (adică cel mai mare divizor comun al lor este $1$).

Formula matematică bazată pe descompunerea în factori primi a lui $n$ este:
$$ \\phi(n) = n \\prod_{p | n} \\left(1 - \\frac{1}{p}\\right) $$
unde produsul se face peste toate numerele prime distincte $p$ care îl divid pe $n$.

Pentru a calcula $\\phi(n)$ eficient pentru un singur număr, putem extrage factorii săi primi în $O(\\sqrt{n})$, similar cu descompunerea standard. De fiecare dată când găsim un factor prim $p$, actualizăm rezultatul scăzând din el $\\frac{\\text{result}}{p}$.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\sqrt{n})$ — căutăm divizorii primi până la $\\sqrt{n}$. Dacă numărul este prim, algoritmul face exact $\\sqrt{n}$ pași.
- **Spațiu:** $O(1)$ — calculul se face folosind doar câteva variabile pentru descompunere.`,
  "variations": `### Variații și Edge Cases

1. **Indicatorul lui Euler pentru un interval (Ciurul Totient):** Când trebuie să calculăm $\\phi(i)$ pentru toate numerele dintr-un interval $[1, N]$, putem folosi o variantă a **Ciurului lui Eratostene**. Complexitatea totală devine $O(N \\log \\log N)$.
2. **Proprietatea multiplicativă:** Dacă $a$ și $b$ sunt prime între ele, atunci $\\phi(a \\cdot b) = \\phi(a) \\cdot \\phi(b)$.
3. **Micul Teoremă a lui Fermat generalizată (Teorema lui Euler):** Pentru orice $a$ prim cu $n$, avem $a^{\\phi(n)} \\equiv 1 \\pmod{n}$.`,
  "applications": `### Aplicații

- **Criptografia RSA:** Generarea cheilor publice și private se bazează pe calculul $\\phi(p \\cdot q) = (p-1)(q-1)$ pentru două numere prime mari.
- **Calculul inversului modular:** Dacă $a$ și $M$ sunt prime între ele, atunci inversul modular al lui $a \\pmod{M}$ este $a^{\\phi(M)-1} \\pmod{M}$.`,
  "code": `#include <iostream>

using namespace std;

int eulerPhi(int n) {
    int result = n;
    for (int p = 2; p * p <= n; ++p) {
        if (n % p == 0) {
            while (n % p == 0) {
                n /= p;
            }
            result -= result / p;
        }
    }
    if (n > 1) {
        result -= result / n;
    }
    return result;
}

int main() {
    int ans = eulerPhi(12);
    cout << "phi(12) = " << ans << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 21,
    "text": "Apelăm funcția eulerPhi cu parametrul n = 12 pentru a determina numărul de numere prime cu 12 mai mici sau egale cu acesta.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": false
            },
            {
              "val": "result = 12",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 5,
    "text": "Intrăm în funcție. Parametrul primit este n = 12.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": true
            },
            {
              "val": "result = 12",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 6,
    "text": "Inițializăm variabila result cu valoarea lui n, adică result = 12.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 7,
    "text": "Începem bucla for pentru a găsi factorii primi. Verificăm p = 2. Deoarece p * p = 4 <= 12, condiția buclei for este adevărată.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Verificăm dacă p = 2 este divizor al lui n (n % p == 0). Deoarece 12 % 2 = 0, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm condiția buclei while (n % p == 0). Deoarece 12 % 2 = 0, condiția este adevărată, deci împărțim n la p pentru a elimina factorul prim 2.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Împărțim n la factorul prim p = 2: n /= 2, deci n devine 6.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 6",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm din nou condiția buclei while (n % p == 0). Deoarece n = 6 % 2 = 0, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 6",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Împărțim n la factorul prim p = 2: n /= 2, deci n devine 3.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm din nou condiția buclei while (n % p == 0). Deoarece n = 3 % 2 = 1, condiția este falsă, deci ieșim din bucla while.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 12",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Actualizăm rezultatul pentru factorul prim p = 2: result -= result / 2, adică 12 - 6 = 6. Noul result devine 6.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 6",
              "active": true
            },
            {
              "val": "p = 2",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 7,
    "text": "Incrementăm p la 3. Verificăm condiția buclei for: p * p = 9 <= n (unde n a devenit 3). Deoarece 9 > 3, condiția p * p <= n este falsă, așa că ieșim din bucla for.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 6",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Verificăm dacă a rămas vreun factor prim mai mare decât radical din n inițial (condiția n > 1). Deoarece n = 3, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 6",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "Deoarece n = 3 > 1 este prim, actualizăm rezultatul pentru acest ultim factor prim: result -= result / 3, adică 6 - 2 = 4. Noul result devine 4.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 4",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Returnăm rezultatul final calculat: result = 4.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "✕",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 3",
              "active": true
            },
            {
              "val": "result = 4",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Revenim în funcția main. Valoarea returnată de eulerPhi este stocată în variabila ans, care devine 4.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": false
            },
            {
              "val": "result = 12",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Afișăm rezultatul obținut la ieșirea standard (cout): phi(12) = 4.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": false
            },
            {
              "val": "result = 12",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Funcția main returnează 0, finalizând cu succes execuția programului.",
    "blocksVisual": [
      {
        "label": "Candidați Coprimi (1..12)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            },
            {
              "val": "4",
              "active": false,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "6",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            },
            {
              "val": "8",
              "active": false,
              "sorted": true
            },
            {
              "val": "9",
              "active": false,
              "sorted": true
            },
            {
              "val": "10",
              "active": false,
              "sorted": true
            },
            {
              "val": "11",
              "active": false,
              "sorted": true
            },
            {
              "val": "12",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "n = 12",
              "active": false
            },
            {
              "val": "result = 12",
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
        "title": "Euler Totient Function",
        "url": "https://www.geeksforgeeks.org/eulers-totient-function/",
        "desc": "Implementează calcularea valorii ETF pentru un număr dat."
      }
    ],
    "medium": [
      {
        "title": "ETF - Euler Totient Function",
        "url": "https://www.spoj.com/problems/ETF/",
        "desc": "Calculează indicatorul lui Euler pentru multiple query-uri în timp util."
      }
    ],
    "hard": [
      {
        "title": "GCDEX - GCD Extreme",
        "url": "https://www.spoj.com/problems/GCDEX/",
        "desc": "Calculează suma GCD pentru toate perechile ordonate, optimizând utilizând ETF pe intervale."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"Apel eulerPhi"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"p = 2"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 6"},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 3"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 6"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 4"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"ans = 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"cout"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 0"}];
      const s = states[stepIndex] || states[states.length - 1];
      const frames = s.frames.map((frame, index) => {
        if (index === 0 && activeLine !== undefined && activeLine !== null) {
          return { ...frame, line: activeLine };
        }
        return frame;
      });
      return { vars: s.vars, globalVars: [], frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"Apel eulerPhi"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"p = 2"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 6"},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 3"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 6"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 4"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"ans = 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"cout"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 0"}];
      const s = states[stepIndex] || states[states.length - 1];
      const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;
      return null;
    }
  }
};
