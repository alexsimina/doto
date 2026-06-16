export const data = {
  "presentation": "### Prezentare Generală\n\nZ-Parcurgere (Z-Traversal / Morton Order / Z-order curve) este un algoritm clasic care utilizează Divide et Impera pentru a mapa date multidimensionale pe o singură dimensiune, păstrând localitatea.\n\nProblema tipică ne cere să determinăm valoarea dintr-o matrice $2^N \\times 2^N$ la o anumită linie și coloană, știind că matricea este populată parcurgând recursiv cadranele ei în ordinea formei literei 'Z':\n1. Cadranul stânga-sus\n2. Cadranul dreapta-sus\n3. Cadranul stânga-jos\n4. Cadranul dreapta-jos\n\nPentru a găsi valoarea direct, NU trebuie să generăm matricea (ceea ce ar costa O(4^N) memorie și timp). Folosim Divide et Impera: împărțim matricea curentă în 4 și verificăm în care sfert se află linia și coloana noastră. Adunăm la răspuns numărul de elemente din cadranele pe care le sărim și continuăm recursiv în cadranul țintă până ajungem la o celulă $1 \\times 1$.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N) unde N este puterea lui 2 a laturii matricei. Deoarece înjumătățim dimensiunea la fiecare pas, vom face exact N pași.\n- **Spațiu:** O(1) pentru varianta iterativă, sau O(N) memorie pe stiva de apeluri pentru recursivitate.\n",
  "variations": "### Variații și Edge Cases\n\n1. Varianta Inversă: Se dă valoarea și trebuie să găsim coordonatele (R, C) corespunzătoare.\n2. Grafică pe Calculator: Generarea de hărți de biți și optimizarea texturilor (Quadtrees, Morton codes).",
  "applications": "### Aplicații\n\nAcest algoritm stă la baza Quadtrees, folosite extensiv în dezvoltarea de jocuri, detectarea coliziunilor 2D și indexarea geografică a bazelor de date (ex. Amazon DynamoDB / baze de date spațiale).",
  code: `
#include <iostream>

using namespace std;

long long zTraversal(int n, int r, int c) {
    if (n == 1) return 0;

    int half = n / 2;
    long long area = 1LL * half * half;

    if (r < half && c < half) return zTraversal(half, r, c);
    else if (r < half && c >= half) return area + zTraversal(half, r, c - half);
    else if (r >= half && c < half) return 2 * area + zTraversal(half, r - half, c);
    else return 3 * area + zTraversal(half, r - half, c - half);
}

int main() {
    int N = 3;
    int dim = 1 << N;
    int r = 5, c = 2;
    
    cout << "Valoarea la (" << r << ", " << c << ") este: " << zTraversal(dim, r, c) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 21,
      "text": "Vrem să aflăm valoarea la linia r=5, coloana c=2 într-o matrice de dimensiune 8x8 (unde indicii sunt 0..7).",
      "blocksVisual": [
        {
          "label": "Căutare",
          "groups": [
            [
              {
                "val": "Dim: 8x8"
              },
              {
                "val": "R: 5"
              },
              {
                "val": "C: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Jumătatea dimensiunii este half = 4. Aria unui cadran (sfert) este 4x4 = 16. Cadranul stânga-sus are valori 0..15, dreapta-sus 16..31, stânga-jos 32..47, dreapta-jos 48..63.",
      "blocksVisual": [
        {
          "label": "Matrice 8x8",
          "groups": [
            [
              {
                "val": "[0..15]"
              },
              {
                "val": "[16..31]"
              }
            ],
            [
              {
                "val": "[32..47]",
                "active": true
              },
              {
                "val": "[48..63]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm cadranele: r=5 >= 4, c=2 < 4. Suntem în Cadranul 3 (Stânga-Jos). Sărim peste primele 2 cadrane (2 * 16 = 32 elemente). Apelăm recursiv pentru noul cadran.",
      "blocksVisual": [
        {
          "label": "Salt +32",
          "groups": [
            [
              {
                "val": "+32 elemente",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Acum căutăm în submatricea de 4x4. Noile coordonate relative devin r = 5 - 4 = 1 și c = 2. Jumătatea este 2, aria unui cadran este 4.",
      "blocksVisual": [
        {
          "label": "Matrice 4x4",
          "groups": [
            [
              {
                "val": "[32..35]",
                "active": true
              },
              {
                "val": "[36..39]"
              }
            ],
            [
              {
                "val": "[40..43]"
              },
              {
                "val": "[44..47]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "r=1 < 2, dar c=2 NU este < 2, deci c=2 >= 2! Ah, deci suntem in Cadranul 2 (Dreapta-Sus).",
      "blocksVisual": [
        {
          "label": "Salt +4",
          "groups": [
            [
              {
                "val": "+4 elemente",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adunăm aria unui cadran (4). Coordonatele devin: r=1, c=2-2=0. Apelăm recursiv pentru submatrice 2x2.",
      "blocksVisual": [
        {
          "label": "Total = 32 + 4",
          "groups": [
            [
              {
                "val": "36"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Matrice 2x2. Jumătatea e 1, aria unui cadran este 1. Căutăm la r=1, c=0.",
      "blocksVisual": [
        {
          "label": "Matrice 2x2",
          "groups": [
            [
              {
                "val": "[36]"
              },
              {
                "val": "[37]"
              }
            ],
            [
              {
                "val": "[38]",
                "active": true
              },
              {
                "val": "[39]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "r=1 >= 1, c=0 < 1. Cadranul 3 (Stânga-Jos). Sărim peste 2 cadrane (2 * 1 = 2). Coordonate: r=1-1=0, c=0.",
      "blocksVisual": [
        {
          "label": "Salt +2",
          "groups": [
            [
              {
                "val": "+2 elemente",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Adunăm cele 2 elemente. Totalul este 32 + 4 + 2 = 38. Apel recursiv cu n=1, r=0, c=0.",
      "blocksVisual": [
        {
          "label": "Total = 36 + 2",
          "groups": [
            [
              {
                "val": "38"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Baza recursivității: n=1. Returnăm 0.",
      "blocksVisual": [
        {
          "label": "Baza",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Răspunsul final este 38! Fără să generăm restul de 63 de numere.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "Valoare = 38",
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
        "title": "Z-Parcurgere Info",
        "url": "https://www.pbinfo.ro/probleme/1149/z",
        "desc": "Clasica pbinfo"
      }
    ],
    "medium": [
      {
        "title": "Z-Parcurgere",
        "url": "https://www.infoarena.ro/problema/z",
        "desc": "Z Parcurgere pe Infoarena"
      },
      {
        "title": "Quad Tree",
        "url": "https://leetcode.com/problems/construct-quad-tree/",
        "desc": "Constructie Arbore Z"
      }
    ],
    "hard": [
      {
        "title": "Căutare în QuadTree",
        "url": "https://www.pbinfo.ro/probleme/2951/quadtree",
        "desc": "Grafică avansată"
      }
    ]
  }
};
