export const data = {
  "presentation": "### Prezentare Generală\n\nTeoria Numerelor se ocupă cu studiul numerelor întregi și proprietățile lor. În algoritmică, conceptele esențiale includ divizibilitatea, numerele prime, cel mai mare divizor comun (CMMDC) și cel mai mic multiplu comun (CMMMC), dar și aritmetica modulară.\n\nUnul dintre cei mai eleganți și folosiți algoritmi este **Ciurul lui Eratostene**. Acesta ne permite să găsim eficient toate numerele prime mai mici sau egale cu o valoare $N$. Spre deosebire de verificarea individuală a fiecărui număr, ciurul funcționează iterativ, \"tăind\" (marcând ca neprime) toți multiplii numerelor prime pe măsură ce le găsește.",
  "complexity": "### Complexitate\n\nPentru Ciurul lui Eratostene:\n- **Timp:** O(N log(log N)), ceea ce este extrem de aproape de O(N). Aceasta se datorează faptului că suma seriei $1/2 + 1/3 + 1/5 + 1/7 + ...$ crește logaritmic.\n- **Spațiu:** O(N), deoarece avem nevoie de un array (sau un bitset) pentru a stoca starea fiecărui număr de la 1 la N.\n",
  "variations": "### Variații și Edge Cases\n\n1. Ciurul pe biți: Pentru a salva memorie, folosim structuri bit-level (ex: `vector<bool>` sau `bitset`), reducând spațiul la a 8-a parte.\n2. Ciurul Liniar (O(N)): O versiune optimizată care se asigură că fiecare număr compus este tăiat o singură dată (prin cel mai mic factor prim al său).\n3. Ciurul Segmentat: Folosit când $N$ este foarte mare (ex: $10^{12}$), dar căutăm prime într-un interval $[L, R]$ de lungime relativ mică.",
  "applications": "### Aplicații\n\nGăsirea rapidă a numerelor prime este baza criptografiei (ex. algoritmul RSA). În probleme de concurs, ciurul este adesea o preprocesare, urmată de rezolvarea problemei folosind divizorii primi ai numerelor.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

void ciurulLuiEratostene(int n) {
    vector<bool> estePrim(n + 1, true);
    estePrim[0] = estePrim[1] = false;
    
    for (int p = 2; p * p <= n; p++) {
        if (estePrim[p]) {
            for (int i = p * p; i <= n; i += p) {
                estePrim[i] = false;
            }
        }
    }
    
    cout << "Numere prime pana la " << n << ":
";
    for (int p = 2; p <= n; p++) {
        if (estePrim[p]) {
            cout << p << " ";
        }
    }
    cout << "
";
}

int main() {
    ciurulLuiEratostene(20);
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Inițializăm un vector `estePrim` în care presupunem că toate numerele sunt prime (true).",
      "blocksVisual": [
        {
          "label": "Inițializare",
          "groups": [
            [
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "4"
              },
              {
                "val": "5"
              },
              {
                "val": "6"
              },
              {
                "val": "7"
              },
              {
                "val": "8"
              },
              {
                "val": "9"
              },
              {
                "val": 10
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "0 și 1 nu sunt prime conform definiției matematice.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": "2",
                "active": false
              },
              {
                "val": "3",
                "active": false
              },
              {
                "val": "4",
                "active": false
              },
              {
                "val": "5",
                "active": false
              },
              {
                "val": "6",
                "active": false
              },
              {
                "val": "7",
                "active": false
              },
              {
                "val": "8",
                "active": false
              },
              {
                "val": "9",
                "active": false
              },
              {
                "val": 10,
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Începem de la primul număr prim, p = 2. Mergem până la radical din N (adică p * p <= 20).",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": "2",
                "active": false
              },
              {
                "val": "3",
                "active": false
              },
              {
                "val": "4",
                "active": false
              },
              {
                "val": "5",
                "active": false
              },
              {
                "val": "6",
                "active": false
              },
              {
                "val": "7",
                "active": false
              },
              {
                "val": "8",
                "active": false
              },
              {
                "val": "9",
                "active": false
              },
              {
                "val": 10,
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "2 este marcat ca prim. Așa că îi vom tăia toți multiplii.",
      "blocksVisual": [
        {
          "label": "p = 2",
          "groups": [
            [
              {
                "val": 2,
                "active": true
              },
              {
                "val": 3
              },
              {
                "val": 4
              },
              {
                "val": 5
              },
              {
                "val": 6
              },
              {
                "val": 7
              },
              {
                "val": 8
              },
              {
                "val": 9
              },
              {
                "val": 10
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Începem tăierea de la p*p (adică 4). Orice multiplu mai mic (ex: 2*1) a fost deja procesat sau tăiat.",
      "blocksVisual": [
        {
          "label": "Tăiere multipli de 2",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true
              },
              {
                "val": 3
              },
              {
                "val": 4,
                "hidden": true
              },
              {
                "val": 5
              },
              {
                "val": 6,
                "hidden": true
              },
              {
                "val": 7
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 9
              },
              {
                "val": 10,
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Trecem la următorul p, p = 3.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true,
                "active": false
              },
              {
                "val": 3,
                "active": false
              },
              {
                "val": 4,
                "hidden": true,
                "active": false
              },
              {
                "val": 5,
                "active": false
              },
              {
                "val": 6,
                "hidden": true,
                "active": false
              },
              {
                "val": 7,
                "active": false
              },
              {
                "val": 8,
                "hidden": true,
                "active": false
              },
              {
                "val": 9,
                "active": false
              },
              {
                "val": 10,
                "hidden": true,
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "3 este încă true (nu a fost tăiat de niciun număr anterior), deci este prim.",
      "blocksVisual": [
        {
          "label": "p = 3",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true
              },
              {
                "val": 3,
                "active": true
              },
              {
                "val": 4,
                "hidden": true
              },
              {
                "val": 5
              },
              {
                "val": 6,
                "hidden": true
              },
              {
                "val": 7
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 9
              },
              {
                "val": 10,
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Tăiem multiplii lui 3 începând de la 3*3 = 9. Observăm că 6 a fost deja tăiat de 2!",
      "blocksVisual": [
        {
          "label": "Tăiere multipli de 3",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 4,
                "hidden": true
              },
              {
                "val": 5
              },
              {
                "val": 6,
                "hidden": true
              },
              {
                "val": 7
              },
              {
                "val": 8,
                "hidden": true
              },
              {
                "val": 9,
                "hidden": true
              },
              {
                "val": 10,
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "p = 4. Însă 4*4 = 16 <= 20. Verificăm.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true,
                "active": false
              },
              {
                "val": 3,
                "sorted": true,
                "active": false
              },
              {
                "val": 4,
                "hidden": true,
                "active": false
              },
              {
                "val": 5,
                "active": false
              },
              {
                "val": 6,
                "hidden": true,
                "active": false
              },
              {
                "val": 7,
                "active": false
              },
              {
                "val": 8,
                "hidden": true,
                "active": false
              },
              {
                "val": 9,
                "hidden": true,
                "active": false
              },
              {
                "val": 10,
                "hidden": true,
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "4 a fost tăiat anterior, deci `estePrim[4]` e fals. Sărim peste el!",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true,
                "active": false
              },
              {
                "val": 3,
                "sorted": true,
                "active": false
              },
              {
                "val": 4,
                "hidden": true,
                "active": false
              },
              {
                "val": 5,
                "active": false
              },
              {
                "val": 6,
                "hidden": true,
                "active": false
              },
              {
                "val": 7,
                "active": false
              },
              {
                "val": 8,
                "hidden": true,
                "active": false
              },
              {
                "val": 9,
                "hidden": true,
                "active": false
              },
              {
                "val": 10,
                "hidden": true,
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "p = 5. p*p = 25, care depășește limita n=20. Bucla principală se oprește.",
      "blocksVisual": [
        {
          "label": "Stare curentă",
          "groups": [
            [
              {
                "val": 2,
                "sorted": true,
                "active": false
              },
              {
                "val": 3,
                "sorted": true,
                "active": false
              },
              {
                "val": 4,
                "hidden": true,
                "active": false
              },
              {
                "val": 5,
                "active": false
              },
              {
                "val": 6,
                "hidden": true,
                "active": false
              },
              {
                "val": 7,
                "active": false
              },
              {
                "val": 8,
                "hidden": true,
                "active": false
              },
              {
                "val": 9,
                "hidden": true,
                "active": false
              },
              {
                "val": 10,
                "hidden": true,
                "active": false
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Afișăm numerele care au rămas true (nu au fost tăiate niciodată): 2, 3, 5, 7, 11, 13, 17, 19.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "Prime:"
              },
              {
                "val": 2,
                "sorted": true
              },
              {
                "val": 3,
                "sorted": true
              },
              {
                "val": 5,
                "sorted": true
              },
              {
                "val": 7,
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
        "title": "Ciurul lui Eratostene",
        "url": "https://www.pbinfo.ro/probleme/236/ciurul-lui-eratostene",
        "desc": "Problema clasică"
      },
      {
        "title": "CMMDC",
        "url": "https://www.pbinfo.ro/probleme/55/cmmdc",
        "desc": "Algoritmul lui Euclid"
      }
    ],
    "medium": [
      {
        "title": "Count Primes",
        "url": "https://leetcode.com/problems/count-primes/",
        "desc": "O(N log log N)"
      },
      {
        "title": "Descompunere in Factori Primi",
        "url": "https://www.pbinfo.ro/probleme/63/factori-primi",
        "desc": "Divizori"
      }
    ],
    "hard": [
      {
        "title": "Segmented Sieve",
        "url": "https://www.spoj.com/problems/PRIME1/",
        "desc": "Primes between L and R"
      }
    ]
  }
};
