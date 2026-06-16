export const data = {
  "presentation": "### Prezentare Generală\n\nMatematica avansată din informatică implică concepte ce apar des în concursuri și în cryptografie modernă.\n\nPrintre ele amintim:\n1. **Inversul Modular**: În aritmetica modulară nu putem \"împărți\". Pentru a calcula $(A / B) \\pmod M$, calculăm $(A \\times B^{-1}) \\pmod M$, unde $B^{-1}$ e inversul modular al lui B. Îl găsim fie cu Algoritmul lui Euclid Extins, fie cu Teorema Mică a lui Fermat ($B^{M-2} \\pmod M$).\n2. **Exponențierea Rapidă pe Matrici**: Știm că recurențele liniare, precum Șirul lui Fibonacci $F_n = F_{n-1} + F_{n-2}$, durează O(N). Putem rescrie recurența ca o înmulțire de matrici. Ridicând matricea la puterea $N$ în timp logaritmic, obținem termenul $F_N$ în $O(\\log N)$.\n3. **Transformata Fourier Rapidă (FFT)**: Utilizată pentru a înmulți două polinoame de grad N în $O(N \\log N)$ în loc de $O(N^2)$. Folosește evaluarea polinomului pe rădăcini complexe ale unității.",
  "complexity": "### Complexitate\n\n- **Timp:** Exponențierea pe matrici costă $O(K^3 \\log N)$ unde K e dimensiunea matricii de tranziție (ex: K=2 pt Fibonacci). Euclid Extins costă $O(\\log(\\min(A, B)))$ similar cu GCD-ul normal.\n- **Spațiu:** O(1) auxiliar (cu excepția stivei de recursivitate pentru funcții sau matricilor).\n",
  "variations": "### Variații și Edge Cases\n\n1. Teorema Chineză a Resturilor (CRT): Folosită pentru a găsi un număr $X$ care dă resturi diferite modulo numere prime între ele diferite.\n2. FFT pe corpuri finite (Number Theoretic Transform - NTT): Asemănător cu FFT, dar folosește un Modulo special (ex. $998244353$) și rădăcini primitive în loc de numere complexe pentru a garanta exactitatea la nivel de bit și a evita erorile în virgulă mobilă.",
  "applications": "### Aplicații\n\nAritmetica exponențială masivă pentru numărarea posibilităților (combinatorică DP). Punctul de intersecție dintre teoria jocurilor (Numere Grundy / Nim) și teoria grafurilor depinde deseori de fundamente matematice (operații XOR, recurențe).",
  code: `
#include <iostream>

using namespace std;

// Functie pentru Algoritmul lui Euclid Extins
// Returneaza CMMDC(a, b) si gaseste x, y astfel incat: a * x + b * y = gcd(a, b)
long long gcdExtended(long long a, long long b, long long *x, long long *y) {
    if (a == 0) {
        *x = 0;
        *y = 1;
        return b;
    }

    long long x1, y1;
    long long gcd = gcdExtended(b % a, a, &x1, &y1);

    // Actualizam x si y folosind rezultatele din apelul recursiv
    *x = y1 - (b / a) * x1;
    *y = x1;

    return gcd;
}

int main() {
    long long a = 35, b = 15;
    long long x, y;
    long long g = gcdExtended(a, b, &x, &y);
    
    cout << "CMMDC(" << a << ", " << b << ") = " << g << "
";
    cout << "X = " << x << ", Y = " << y << "
";
    cout << "Verificare: " << a << "*" << x << " + " << b << "*" << y << " = " << a*x + b*y << "
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 24,
      "text": "Începem cu a = 35 și b = 15. Vrem să găsim CMMDC și coeficienții x, y asfel încât 35*x + 15*y = CMMDC(35, 15).",
      "blocksVisual": [
        {
          "label": "Căutăm",
          "groups": [
            [
              {
                "val": "35x + 15y = gcd(35, 15)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Apel 1: gcdExtended(35, 15). a nu e 0. Apelăm recursiv cu (15 % 35, 35) = (15, 35). Dar wait, 35 % 15 e 5! Parametrii sunt (b%a, a).",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": "35x + 15y = gcd(35, 15)",
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Să corectăm mental: apelul face (b%a, a). b=15, a=35. 15 % 35 = 15. Apelăm gcd(15, 35). Apoi gcd(35%15, 15) = gcd(5, 15). Apoi gcd(15%5, 5) = gcd(0, 5).",
      "blocksVisual": [
        {
          "label": "Adâncire",
          "groups": [
            [
              {
                "val": "gcd(35, 15)"
              }
            ],
            [
              {
                "val": "gcd(15, 35)"
              }
            ],
            [
              {
                "val": "gcd(5, 15)"
              }
            ],
            [
              {
                "val": "gcd(0, 5)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Atingem baza: a=0 (apelul (0, 5)). CMMDC este b, adică 5. Setăm x=0, y=1. Ne întoarcem sus.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": "gcd(35, 15)",
                "active": false
              }
            ],
            [
              {
                "val": "gcd(15, 35)",
                "active": false
              }
            ],
            [
              {
                "val": "gcd(5, 15)",
                "active": false
              }
            ],
            [
              {
                "val": "gcd(0, 5)",
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Ne întoarcem în gcd(5, 15). Avem x1=0, y1=1. Calculăm noul x: y1 - (15/5)*x1 = 1 - 3*0 = 1. Noul y: x1 = 0.",
      "blocksVisual": [
        {
          "label": "gcd(5, 15)",
          "groups": [
            [
              {
                "val": "x = 1"
              },
              {
                "val": "y = 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Ne întoarcem în gcd(15, 35). Avem x1=1, y1=0. Calculăm noul x: 0 - (35/15)*1 = 0 - 2*1 = -2. Noul y: 1.",
      "blocksVisual": [
        {
          "label": "gcd(15, 35)",
          "groups": [
            [
              {
                "val": "x = -2"
              },
              {
                "val": "y = 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Ne întoarcem în gcd(35, 15). Avem x1=-2, y1=1. Calculăm noul x: 1 - (15/35)*(-2) = 1 - 0 = 1. Noul y: -2.",
      "blocksVisual": [
        {
          "label": "gcd(35, 15)",
          "groups": [
            [
              {
                "val": "x = 1"
              },
              {
                "val": "y = -2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Final: g = 5, x = 1, y = -2. Verificare: 35*(1) + 15*(-2) = 35 - 30 = 5! Ecuația Diofantică este rezolvată corect și am aflat și CMMDC.",
      "blocksVisual": [
        {
          "label": "Succes",
          "groups": [
            [
              {
                "val": "35(1) + 15(-2) = 5",
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
        "title": "Euclid Extins",
        "url": "https://www.infoarena.ro/problema/euclid3",
        "desc": "Problemă standard a * x + b * y = gcd(a,b)"
      }
    ],
    "medium": [
      {
        "title": "Invers Modular",
        "url": "https://www.infoarena.ro/problema/inversmodular",
        "desc": "A * x = 1 (mod B)"
      },
      {
        "title": "Climbing Stairs (O(log N))",
        "url": "https://leetcode.com/problems/climbing-stairs/",
        "desc": "Fibonacci pe Matrice"
      }
    ],
    "hard": [
      {
        "title": "FFT",
        "url": "https://www.infoarena.ro/problema/fft",
        "desc": "Inmulțire polinoame"
      },
      {
        "title": "K-th Fibonacci",
        "url": "https://www.infoarena.ro/problema/kfib",
        "desc": "Fibonacci uriaș cu matrici"
      }
    ]
  }
};
