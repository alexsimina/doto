export const data = {
  "presentation": `### Prezentare Generală

Funcția Mobius, notată cu $\\mu(n)$, este o funcție multiplicativă fundamentală în teoria numerelor și combinatorică, utilizată în special în problemele ce implică divizibilitate și cel mai mare divizor comun. Ea este definită pentru orice număr întreg pozitiv $n$ astfel:

- $\\mu(n) = 1$ dacă $n$ este un întreg liber de pătrate (square-free) și are un număr par de factori primi distincți.
- $\\mu(n) = -1$ dacă $n$ este un întreg liber de pătrate și are un număr impar de factori primi distincți.
- $\\mu(n) = 0$ dacă $n$ nu este liber de pătrate (adică se divide cu $p^2$ pentru un număr prim $p$).

Prin convenție, $\\mu(1) = 1$. 

Cea mai importantă proprietate a sa este **Formula de Inversiune Mobius**, care permite exprimarea unei relații între două funcții aritmetice. De asemenea, suma funcției Mobius peste toți divizorii unui număr $n > 1$ este întotdeauna $0$:
$$ \\sum_{d | n} \\mu(d) = \\begin{cases} 1 & \\text{dacă } n = 1 \\ 0 & \\text{dacă } n > 1 \\end{cases} $$

Putem calcula valorile funcției $\\mu$ pentru toate numerele până la $N$ într-o complexitate liniară de $O(N)$ folosind o adaptare a **Ciurului Liniar** (Eratostene optimizat).`,
  "complexity": `### Complexitate

Pentru precalcularea valorilor de la $1$ la $N$:
- **Timp:** $O(N)$ — ciurul liniar garantează că fiecare număr este vizitat și procesat o singură dată (prin cel mai mic factor prim al său).
- **Spațiu:** $O(N)$ — necesar pentru a stoca valorile funcției $\\mu$ și starea numerelor prime în memorie.`,
  "variations": `### Variații și Edge Cases

1. **Calcul individual:** Dacă avem nevoie de $\\mu(n)$ doar pentru o singură valoare mare, putem descompune $n$ în factori primi în $O(\\sqrt{n})$. Dacă un factor prim apare la o putere $\\ge 2$, returnăm direct $0$. Altminteri, returnăm $(-1)^k$, unde $k$ este numărul de factori primi distincți.
2. **Mertens Function:** Suma parțială a funcției Mobius, $M(N) = \\sum_{i=1}^{N} \\mu(i)$, utilizată în studiul distribuției numerelor prime și strâns legată de Ipoteza lui Riemann.`,
  "applications": `### Aplicații

- **Calculul numărului de perechi coprime:** Determinarea numărului de perechi $(i, j)$ cu $1 \\le i, j \\le N$ și $\\gcd(i, j) = 1$, folosind relația $\\sum_{d | \\gcd(i, j)} \\mu(d)$.
- **Inversiune:** Rezolvarea problemelor unde trebuie să calculăm sume complexe peste cel mai mare divizor comun (ex: $\\sum \\gcd(i, j)$).`,
  "code": `#include <iostream>
#include <vector>

using namespace std;

vector<int> computeMobius(int n) {
    vector<int> mu(n + 1, 0);
    vector<bool> isPrime(n + 1, true);
    vector<int> primes;
    
    mu[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (isPrime[i]) {
            primes.push_back(i);
            mu[i] = -1;
        }
        for (int p : primes) {
            if (i * p > n) break;
            isPrime[i * p] = false;
            if (i % p == 0) {
                mu[i * p] = 0;
                break;
            } else {
                mu[i * p] = -mu[i];
            }
        }
    }
    return mu;
}

int main() {
    int limit = 10;
    vector<int> mu = computeMobius(limit);
    cout << "mu(1..10): ";
    for (int i = 1; i <= limit; ++i) {
        cout << mu[i] << " ";
    }
    cout << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 32,
    "text": "Inițializăm limita superioară a intervalului: limit = 10.",
    "blocksVisual": []
  },
  {
    "line": 33,
    "text": "Apelăm funcția computeMobius pentru a calcula valorile funcției Mobius până la 10.",
    "blocksVisual": []
  },
  {
    "line": 6,
    "text": "Intrăm în corpul funcției computeMobius.",
    "blocksVisual": []
  },
  {
    "line": 7,
    "text": "Inițializăm vectorul mu cu 11 elemente (de la 0 la 10) cu valoarea implicită 0.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "2:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Inițializăm vectorul isPrime cu 11 elemente având valoarea true (presupunem inițial că toate numerele sunt prime).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "2:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Inițializăm un vector gol primes pentru a stoca numerele prime pe care le vom găsi.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "2:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Prin definiție, valoarea funcției Mobius pentru 1 este 1, deci setăm mu[1] = 1.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Numărul 2 fiind prim, îl adăugăm în vectorul primes.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Deoarece 2 este număr prim, are un singur factor prim (număr impar de factori), deci mu[2] = -1.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Marcăm multiplul compus 4 ca fiind ne-prim în vectorul isPrime (isPrime[i * p] = false).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Verificăm dacă indexul curent i este divizibil cu numărul prim p.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 21,
    "text": "Deoarece i se divide cu p, numărul 4 se divide cu p^2 (nu este liber de pătrate), deci setăm mu[4] = 0.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "break p loop",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 3.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Numărul 3 fiind prim, îl adăugăm în vectorul primes.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Deoarece 3 este număr prim, are un singur factor prim (număr impar de factori), deci mu[3] = -1.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Marcăm multiplul compus 6 ca fiind ne-prim în vectorul isPrime (isPrime[i * p] = false).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Verificăm dacă indexul curent i este divizibil cu numărul prim p.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Deoarece i nu se divide cu p, numărul i * p are un factor prim distinct în plus față de i, deci mu[i * p] = -mu[i].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": true,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 3.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Marcăm multiplul compus 9 ca fiind ne-prim în vectorul isPrime (isPrime[i * p] = false).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Verificăm dacă indexul curent i este divizibil cu numărul prim p.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 21,
    "text": "Deoarece i se divide cu p, numărul 9 se divide cu p^2 (nu este liber de pătrate), deci setăm mu[9] = 0.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "break p loop",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 4.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Marcăm multiplul compus 8 ca fiind ne-prim în vectorul isPrime (isPrime[i * p] = false).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Verificăm dacă indexul curent i este divizibil cu numărul prim p.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 21,
    "text": "Deoarece i se divide cu p, numărul 8 se divide cu p^2 (nu este liber de pătrate), deci setăm mu[8] = 0.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "break p loop",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": true,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 5.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Numărul 5 fiind prim, îl adăugăm în vectorul primes.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Deoarece 5 este număr prim, are un singur factor prim (număr impar de factori), deci mu[5] = -1.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": false,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": false,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": true,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": true,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": true,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:P",
              "active": true,
              "sorted": 1
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "Marcăm multiplul compus 10 ca fiind ne-prim în vectorul isPrime (isPrime[i * p] = false).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": true,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Verificăm dacă indexul curent i este divizibil cu numărul prim p.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:0",
              "active": true,
              "sorted": false
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Deoarece i nu se divide cu p, numărul i * p are un factor prim distinct în plus față de i, deci mu[i * p] = -mu[i].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 3.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
            {
              "val": "2",
              "active": false,
              "sorted": true
            },
            {
              "val": "3",
              "active": true,
              "sorted": true
            },
            {
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 6.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": true,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": true,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": true,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": true,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": true,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 7.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Numărul 7 fiind prim, îl adăugăm în vectorul primes.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Deoarece 7 este număr prim, are un singur factor prim (număr impar de factori), deci mu[7] = -1.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": true,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": true,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 8.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 9.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": true,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": true,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": false,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Începem sau continuăm iterația buclei for exterioare cu i = 10.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Verificăm dacă valoarea curentă i este marcată ca fiind număr prim (isPrime[i] este adevărat).",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 17,
    "text": "Parcurgem numerele prime găsite până acum; verificăm factorul prim curent p = 2.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Verificăm dacă multiplul i * p depășește limita n.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "return mu",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": true,
              "sorted": true
            }
          ]
        ]
      },
      {
        "label": "isPrime[1..10] (P=Prim, C=Compus)",
        "groups": [
          [
            {
              "val": "1:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "2:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "3:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "4:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "5:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "6:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "7:P",
              "active": false,
              "sorted": 1
            },
            {
              "val": "8:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "9:C",
              "active": false,
              "sorted": 0
            },
            {
              "val": "10:C",
              "active": true,
              "sorted": 0
            }
          ]
        ]
      },
      {
        "label": "Numere Prime Găsite (primes)",
        "groups": [
          [
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
              "val": "5",
              "active": false,
              "sorted": true
            },
            {
              "val": "7",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 33,
    "text": "A primit mu",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "Tipărim mesajul introductiv la ieșirea standard.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[1].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[2].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[3].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[4].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[5].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[6].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[7].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[8].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[9].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 35,
    "text": "Afișăm la consolă valoarea calculată mu[10].",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 39,
    "text": "Funcția main returnează 0, finalizând cu succes programul.",
    "blocksVisual": [
      {
        "label": "Valori Mobius mu[1..10]",
        "groups": [
          [
            {
              "val": "1:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "2:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "3:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "4:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "5:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "6:1",
              "active": false,
              "sorted": true
            },
            {
              "val": "7:-1",
              "active": false,
              "sorted": true
            },
            {
              "val": "8:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "9:0",
              "active": false,
              "sorted": false
            },
            {
              "val": "10:1",
              "active": false,
              "sorted": true
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
        "title": "Mobius Function Calculator",
        "url": "https://www.geeksforgeeks.org/program-to-calculate-mobius-function/",
        "desc": "Calculează valoarea funcției Mobius pentru un număr dat N prin descompunere în factori primi."
      }
    ],
    "medium": [
      {
        "title": "SQFREE - Square-free integers",
        "url": "https://www.spoj.com/problems/SQFREE/",
        "desc": "Calculează numărul de numere libere de pătrate mai mici sau egale cu N folosind funcția Mobius."
      }
    ],
    "hard": [
      {
        "title": "LCM Sum",
        "url": "https://www.spoj.com/problems/LCMSUM/",
        "desc": "Calculează suma LCM(i, N) pentru toți i de la 1 la N folosind funcția Mobius sau indicatorul lui Euler."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine) => {
      const states = [{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"limit=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"Apel"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"n=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[2]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[3]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=5"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[5]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=6"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=7"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[7]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=8"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=9"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"return"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu primit"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null}];
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
      const states = [{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"limit=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"Apel"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"n=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[2]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[3]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=5"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[5]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=6"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=7"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[7]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=8"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=9"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"return"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu primit"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;
      return null;
    }
  }
};
