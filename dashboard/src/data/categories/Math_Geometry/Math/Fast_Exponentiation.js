export const data = {
  "presentation": `### Prezentare Generală

Exponentierea rapidă (sau exponentierea binară) este un algoritm eficient pentru calculul puterii unui număr, $a^b$, sau al restului împărțirii acesteia la un modul $M$, adică $a^b \\pmod{M}$.

În loc de a efectua $b$ înmulțiri succesive cu o complexitate de $O(b)$, algoritmul folosește descompunerea binară a exponentului pentru a reduce numărul de operații la $O(\\log b)$. La fiecare pas, dacă exponentul curent este impar, înmulțim rezultatul cu baza curentă. Apoi, ridicăm baza la pătrat și înjumătățim exponentul.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\log b)$ — la fiecare pas exponentul $b$ se împarte la 2, reducând drastic numărul de înmulțiri.
- **Spațiu:** $O(1)$ — algoritmul rulează iterativ folosind doar câteva variabile auxiliare.`,
  "variations": `### Variații și Edge Cases

1. **Exponent $b = 0$:** Orice număr la puterea 0 este 1. Algoritmul returnează corect 1 deoarece bucla \`while\` nu se execută.
2. **Modulo $M = 1$:** În acest caz, orice număr modular este 0. Este important ca preprocesarea sau rezultatul să țină cont de acest caz particular (returnează 0).
3. **Overflow:** Înmulțirea \`result * base\` poate depăși tipul standard de date (ex. \`int\` pe 32 de biți). Se recomandă folosirea tipului \`long long\` în C++.`,
  "applications": `### Aplicații

- Calculul rapid al puterilor mari în aritmetica modulară (criptografie, de exemplu RSA).
- Calcularea inversului modular folosind Micul Teoremă a lui Fermat ($a^{M-2} \\pmod{M}$ pentru $M$ prim).
- Ridicarea la putere a matricelor în timp logaritmic pentru determinarea termenilor șirurilor recurente (ex: Fibonacci).`,
  "code": `#include <iostream>

using namespace std;

long long fastExponentiation(long long base, long long exp, long long mod) {
    long long result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2;
    }
    return result;
}

int main() {
    long long ans = fastExponentiation(3, 13, 10);
    cout << "3^13 % 10 = " << ans << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 18,
    "text": "Apelăm funcția fastExponentiation cu parametrii base = 3, exp = 13 și mod = 10 pentru a calcula modular (3^13) % 10.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": false
            },
            {
              "val": "exp = 13",
              "active": false
            },
            {
              "val": "result = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 5,
    "text": "Intrăm în corpul funcției cu valorile primite: base = 3, exp = 13 și mod = 10.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 6,
    "text": "Inițializăm variabila result cu 1. Aceasta va acumula rezultatul ridicării la putere.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 1",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 7,
    "text": "Reducem baza inițială modulo mod: base = base % mod, adică 3 % 10 = 3. Noua valoare pentru base este 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 1",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Verificăm condiția buclei while (exp > 0). Deoarece exp = 13 este mai mare decât 0, condiția este adevărată, deci continuăm execuția buclei.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 1",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm dacă exponentul curent exp este impar: exp % 2 == 1. Deoarece 13 % 2 = 1 (adevărat), vom actualiza rezultatul.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 1",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Actualizăm rezultatul prin înmulțirea cu baza curentă modulo mod: result = (result * base) % mod, adică (1 * 3) % 10 = 3. Noul result devine 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Ridicăm baza la pătrat în mod modular pentru următorul pas: base = (base * base) % mod, adică (3 * 3) % 10 = 9. Noua bază devine 9.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 9",
              "active": true
            },
            {
              "val": "exp = 13",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Înjumătățim exponentul prin împărțire întreagă: exp = exp / 2, adică 13 / 2 = 6. Exponentul devine 6.",
    "blocksVisual": [
      {
        "label": "exp în binar (110_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": true,
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
              "val": "base = 9",
              "active": true
            },
            {
              "val": "exp = 6",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Verificăm din nou condiția buclei while (exp > 0). Deoarece exp = 6 este mai mare decât 0, condiția este adevărată, intrăm în buclă.",
    "blocksVisual": [
      {
        "label": "exp în binar (110_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": true,
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
              "val": "base = 9",
              "active": true
            },
            {
              "val": "exp = 6",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm dacă exponentul este impar: exp % 2 == 1. Deoarece 6 % 2 = 0 (fals), sărim peste actualizarea rezultatului.",
    "blocksVisual": [
      {
        "label": "exp în binar (110_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": true,
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
              "val": "base = 9",
              "active": true
            },
            {
              "val": "exp = 6",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Ridicăm baza la pătrat în mod modular: base = (base * base) % mod, adică (9 * 9) % 10 = 81 % 10 = 1. Noua bază devine 1.",
    "blocksVisual": [
      {
        "label": "exp în binar (110_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 6",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Înjumătățim exponentul: exp = exp / 2, adică 6 / 2 = 3. Exponentul devine 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (11_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 3",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Verificăm din nou condiția buclei while (exp > 0). Deoarece exp = 3 este mai mare decât 0, condiția este adevărată, intrăm în buclă.",
    "blocksVisual": [
      {
        "label": "exp în binar (11_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 3",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm dacă exponentul este impar: exp % 2 == 1. Deoarece 3 % 2 = 1 (adevărat), actualizăm rezultatul.",
    "blocksVisual": [
      {
        "label": "exp în binar (11_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 3",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Înmulțim rezultatul cu baza curentă modulo mod: result = (result * base) % mod, adică (3 * 1) % 10 = 3. Noul result devine 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (11_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 3",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Ridicăm baza la pătrat: base = (base * base) % mod, adică (1 * 1) % 10 = 1. Noua bază devine 1.",
    "blocksVisual": [
      {
        "label": "exp în binar (11_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 3",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Înjumătățim exponentul: exp = exp / 2, adică 3 / 2 = 1. Exponentul devine 1.",
    "blocksVisual": [
      {
        "label": "exp în binar (1_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 1",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Verificăm condiția buclei while (exp > 0). Deoarece exp = 1 este mai mare decât 0, condiția este adevărată, intrăm în buclă.",
    "blocksVisual": [
      {
        "label": "exp în binar (1_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 1",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Verificăm dacă exponentul este impar: exp % 2 == 1. Deoarece 1 % 2 = 1 (adevărat), actualizăm rezultatul.",
    "blocksVisual": [
      {
        "label": "exp în binar (1_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 1",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Înmulțim rezultatul cu baza curentă modulo mod: result = (result * base) % mod, adică (3 * 1) % 10 = 3. Noul result devine 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (1_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 1",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Ridicăm baza la pătrat: base = (base * base) % mod, adică (1 * 1) % 10 = 1. Noua bază devine 1.",
    "blocksVisual": [
      {
        "label": "exp în binar (1_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": true,
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
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 1",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Înjumătățim exponentul: exp = exp / 2, adică 1 / 2 = 0. Exponentul devine 0.",
    "blocksVisual": [
      {
        "label": "exp în binar",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 0",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Verificăm condiția buclei while (exp > 0). Deoarece exp = 0, condiția este acum falsă, așa că ieșim din buclă.",
    "blocksVisual": [
      {
        "label": "exp în binar",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 0",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Returnăm rezultatul final calculat: result = 3.",
    "blocksVisual": [
      {
        "label": "exp în binar",
        "groups": [
          [
            {
              "val": "0",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Curenți",
        "groups": [
          [
            {
              "val": "base = 1",
              "active": true
            },
            {
              "val": "exp = 0",
              "active": true
            },
            {
              "val": "result = 3",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Revenim în funcția main. Valoarea returnată de fastExponentiation este atribuită variabilei ans, care devine 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": false
            },
            {
              "val": "exp = 13",
              "active": false
            },
            {
              "val": "result = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Afișăm rezultatul obținut la ieșirea standard (cout): 3^13 % 10 = 3.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": false
            },
            {
              "val": "exp = 13",
              "active": false
            },
            {
              "val": "result = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 21,
    "text": "Funcția main se termină și returnează 0, finalizând cu succes execuția întregului program.",
    "blocksVisual": [
      {
        "label": "exp în binar (1101_2)",
        "groups": [
          [
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": false,
              "sorted": false
            },
            {
              "val": "0",
              "active": false,
              "sorted": false
            },
            {
              "val": "1",
              "active": true,
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
              "val": "base = 3",
              "active": false
            },
            {
              "val": "exp = 13",
              "active": false
            },
            {
              "val": "result = 1",
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
        "title": "Pow(x, n)",
        "url": "https://leetcode.com/problems/powx-n/",
        "desc": "Calculează x la puterea n, având grijă la valori negative ale exponentului."
      }
    ],
    "medium": [
      {
        "title": "Super Pow",
        "url": "https://leetcode.com/problems/super-pow/",
        "desc": "Calculează a^b modulo 1337, unde b este dat ca un tablou de cifre (număr foarte mare)."
      }
    ],
    "hard": [
      {
        "title": "Count Good Numbers",
        "url": "https://leetcode.com/problems/count-good-numbers/",
        "desc": "Folosește exponentierea rapidă modulo 10^9 + 7 pentru a număra șirurile de cifre bune."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"Apel"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 1"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 3"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 13"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 9"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"return 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"ans = 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null}];
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
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"Apel"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 1"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 3"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 13"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 9"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"return 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"ans = 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;
      return null;
    }
  }
};
