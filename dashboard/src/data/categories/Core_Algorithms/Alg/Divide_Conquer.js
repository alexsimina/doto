export const data = {
  "presentation": "### Prezentare Generală\n\nDivide et Impera (Divide and Conquer) este o paradigmă fundamentală de proiectare a algoritmilor. Funcționează prin împărțirea recursivă a unei probleme complexe în subprobleme mai mici de același tip, rezolvarea acestor subprobleme, și apoi combinarea soluțiilor lor pentru a obține rezultatul problemei inițiale.\n\nEtapele principale sunt:\n1. Divide: Împarte problema în subprobleme mai mici.\n2. Stăpânește (Conquer): Rezolvă subproblemele recursiv (până la cazuri de bază banale).\n3. Combină: Unește soluțiile subproblemelor pentru a rezolva problema mare.\n\nDe ce este important? Reduce drastic complexitatea în timp. Unul din cele mai clare exemple este Ridicarea la putere în timp logaritmic (Fast Exponentiation). Dacă vrem să calculăm a^n, o abordare naivă ar face n înmulțiri (O(n)). Însă, cu Divide et Impera, observăm că:\n- Dacă n este par: a^n = a^(n/2) * a^(n/2)\n- Dacă n este impar: a^n = a * a^(n-1)\nAceasta ne permite să reducem timpul la O(log n)!",
  "complexity": "### Complexitate\n\nPrin reducerea continuă a dimensiunii problemei (de ex. înjumătățire), se ajunge la performanțe logaritmice sau super-liniare O(N log N) – esențiale pentru algoritmii moderni de sortare și structuri de date. Teorema Master ne ajută să calculăm complexitatea algoritmică a relațiilor de recurență.",
  "variations": "### Variații și Edge Cases\n\nAlgoritmii care folosesc Divide et Impera se regăsesc în tot computer science-ul:\n1. Sortări (Merge Sort, Quick Sort)\n2. Căutări (Căutarea Binară pe vectori sau pe intervale de numere)\n3. Geometrie Computațională (Cel mai apropiat punct)\n4. Structuri de Date (Arbori de Intervale - Segment Trees)\n5. Transformata Fourier Rapidă (FFT) care stă la baza comprimării audio-video moderne.",
  "applications": "### Aplicații\n\nUn prim contact excelent cu Divide et Impera este Ridicarea la putere. Mai jos, poți urmări pașii pentru a calcula 2^10 = 1024 în doar câteva înmulțiri, comparativ cu o buclă de 10 pași.",
  code: `
#include <iostream>

using namespace std;

long long fastExpo(long long a, long long n) {
    if (n == 0) return 1;
    if (n % 2 == 0) {
        long long half = fastExpo(a, n / 2);
        return half * half;
    } else {
        return a * fastExpo(a, n - 1);
    }
}

int main() {
    long long baza = 2, exponent = 10;
    cout << baza << "^" << exponent << " = " << fastExpo(baza, exponent) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 17,
      "text": "Apelăm funcția fastExpo pentru a calcula 2^10.",
      "blocksVisual": [
        {
          "label": "Stare",
          "groups": [
            [
              {
                "val": "Calcul: 2^10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Exponentul 10 este par. Conform strategiei Divide et Impera, calculăm întâi a^(n/2), adică 2^5.",
      "blocksVisual": [
        {
          "label": "Înjumătățire",
          "groups": [
            [
              {
                "val": "Calculăm 2^5"
              }
            ],
            [
              {
                "val": "Urmează: x * x",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Ne adâncim recursiv pentru a calcula fastExpo(2, 5).",
      "blocksVisual": [
        {
          "label": "Apel recursiv",
          "groups": [
            [
              {
                "val": "Calcul: 2^5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Exponentul 5 este impar. Reducem problema calculând întâi 2^4.",
      "blocksVisual": [
        {
          "label": "Impar",
          "groups": [
            [
              {
                "val": "Calculăm 2^4"
              }
            ],
            [
              {
                "val": "Urmează: 2 * (2^4)",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Apel recursiv pentru fastExpo(2, 4).",
      "blocksVisual": [
        {
          "label": "Apel recursiv",
          "groups": [
            [
              {
                "val": "Calcul: 2^4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Exponentul 4 este par. Înjumătățim la fastExpo(2, 2).",
      "blocksVisual": [
        {
          "label": "Înjumătățire",
          "groups": [
            [
              {
                "val": "Calculăm 2^2"
              }
            ],
            [
              {
                "val": "Urmează: y * y",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Apel recursiv pentru fastExpo(2, 2).",
      "blocksVisual": [
        {
          "label": "Apel recursiv",
          "groups": [
            [
              {
                "val": "Calcul: 2^2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Exponentul 2 este par. Înjumătățim la fastExpo(2, 1).",
      "blocksVisual": [
        {
          "label": "Înjumătățire",
          "groups": [
            [
              {
                "val": "Calculăm 2^1"
              }
            ],
            [
              {
                "val": "Urmează: z * z",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Apel recursiv pentru fastExpo(2, 1).",
      "blocksVisual": [
        {
          "label": "Apel recursiv",
          "groups": [
            [
              {
                "val": "Calcul: 2^1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Exponentul 1 este impar. Reducem la fastExpo(2, 0).",
      "blocksVisual": [
        {
          "label": "Impar",
          "groups": [
            [
              {
                "val": "Calculăm 2^0"
              }
            ],
            [
              {
                "val": "Urmează: 2 * (2^0)",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Cazul de bază: Exponentul este 0. Orice număr la puterea 0 este 1. Am atins baza recursivității!",
      "blocksVisual": [
        {
          "label": "Caz de bază",
          "groups": [
            [
              {
                "val": "2^0 = 1",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Ne întoarcem din recursivitate: 2 * (2^0) = 2 * 1 = 2. Deci 2^1 = 2.",
      "blocksVisual": [
        {
          "label": "Întoarcere",
          "groups": [
            [
              {
                "val": "2^1 = 2",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Acum avem răspunsul pentru (2^1). Îl ridicăm la pătrat pentru a obține 2^2: 2 * 2 = 4.",
      "blocksVisual": [
        {
          "label": "Întoarcere (par)",
          "groups": [
            [
              {
                "val": "2^2 = 4",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Avem răspunsul pentru (2^2). Îl ridicăm la pătrat pentru a obține 2^4: 4 * 4 = 16.",
      "blocksVisual": [
        {
          "label": "Întoarcere (par)",
          "groups": [
            [
              {
                "val": "2^4 = 16",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pentru exponent impar, multiplicăm cu baza: 2 * (2^4) = 2 * 16 = 32. Deci 2^5 = 32.",
      "blocksVisual": [
        {
          "label": "Întoarcere (impar)",
          "groups": [
            [
              {
                "val": "2^5 = 32",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "În sfârșit, avem jumătatea pentru apelul inițial: (2^5). O ridicăm la pătrat: 32 * 32 = 1024.",
      "blocksVisual": [
        {
          "label": "FINAL COMBINE",
          "groups": [
            [
              {
                "val": "2^10 = 1024",
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
        "title": "Putere",
        "url": "https://www.pbinfo.ro/probleme/810/putere",
        "desc": "Aflare a^n"
      },
      {
        "title": "Căutare Binară",
        "url": "https://www.pbinfo.ro/probleme/115/cautare-binara",
        "desc": "Aflare element O(log N)"
      }
    ],
    "medium": [
      {
        "title": "Turnurile din Hanoi",
        "url": "https://www.pbinfo.ro/probleme/1146/hanoi",
        "desc": "Recursivitate & Divide"
      },
      {
        "title": "Z-Parcurgere",
        "url": "https://www.infoarena.ro/problema/z",
        "desc": "Parcurgere fractalică"
      }
    ],
    "hard": [
      {
        "title": "Inversion Count",
        "url": "https://www.spoj.com/problems/INVCNT/",
        "desc": "Numărare inversiuni"
      },
      {
        "title": "Pow(x, n)",
        "url": "https://leetcode.com/problems/powx-n/",
        "desc": "Fast Expo pe numere reale"
      }
    ]
  }
};
