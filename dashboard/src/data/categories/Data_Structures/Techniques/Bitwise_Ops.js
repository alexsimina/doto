export const data = {
  "presentation": "### Prezentare Generală\n\nOperațiile pe biți (Bitwise Operations) reprezintă o tehnică de manipulare directă a biților unui număr întreg la nivel de procesor.\n\nÎn C++, datele sunt stocate în baza 2. De exemplu, 5 este stocat ca '0101'. Operațiile pe biți (&, |, ^, ~, <<, >>) ne permit să modificăm acești biți extrem de rapid.\n\nAceastă tehnică este fundamentală pentru optimizarea algoritmilor de generare a submulțimilor, a măștilor de biți (bitmasks) în Programarea Dinamică, și pentru criptografie. Un avantaj enorm este viteza: o operație pe biți durează exact un ciclu de procesor (O(1) cu constantă infimă).",
  "complexity": "### Complexitate\n\n- **Timp:** O(1) pentru operațiile de bază. Dacă iterăm peste N biți, devine O(N).\n- **Spațiu:** O(1). Datele sunt comprimate incredibil de bine (un 'int' de 32 biți poate reține prezența/absența a 32 de elemente diferite).\n",
  "variations": "### Variații și Edge Cases\n\n1. Generarea Submulțimilor: Putem itera de la 0 la (2^N - 1), iar fiecare număr binar reprezintă o submulțime unică.\n2. Extragerea ultimului bit setat (LSB): expresia 'x & -x' returnează valoarea celui mai din dreapta bit de 1, esențial pentru Arborii Indexați Binar.\n3. Trucul lui Brian Kernighan: 'x & (x - 1)' șterge ultimul bit de 1, folosit pentru a număra rapid câți biți de 1 are un număr.",
  "applications": "### Aplicații\n\nBitwise este folosit pentru: comprimarea stărilor în DP (DP pe stări exponențiale), calcularea parității, algoritmi de criptare (AES folosește XOR masiv), rețele de calculatoare (IP masks), grafică pe calculator (manipularea pixelilor).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N = 3; // Numarul de elemente
    vector<char> multime = {'A', 'B', 'C'};
    
    // Total submultimi = 2^N (adica 1 << N)
    int total_submultimi = (1 << N);
    
    for (int mask = 0; mask < total_submultimi; mask++) {
        cout << "{ ";
        // Verificam fiecare bit din masca curenta
        for (int i = 0; i < N; i++) {
            // (1 << i) creeaza un numar care are doar bitul 'i' setat
            if (mask & (1 << i)) {
                cout << multime[i] << " ";
            }
        }
        cout << "}
";
    }
    return 0;
}
`,
  "explanations": [
    {
      "line": 10,
      "text": "Reprezentarea binară: numerele sunt procesate la nivel de biți (0 și 1).",
      "blocksVisual": [
        {
          "label": "Biți",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "0"
              },
              {
                "val": "1"
              },
              {
                "val": "1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Avem o mulțime de N = 3 elemente: A, B, C.",
      "blocksVisual": [
        {
          "label": "Date Intrare",
          "groups": [
            [
              {
                "val": "A"
              },
              {
                "val": "B"
              },
              {
                "val": "C"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Numărul total de submulțimi pentru N elemente este 2^N. Calculăm rapid folosind shiftare la stânga: (1 << 3) = 8.",
      "blocksVisual": [
        {
          "label": "Bitshift",
          "groups": [
            [
              {
                "val": "1 << 3 = 8",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Iterăm 'mask' de la 0 la 7 (ex: 000, 001, 010... 111). Fiecare 'mask' e un număr a cărui scriere binară definește submulțimea.",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [
              {
                "val": "mask = 0",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 0 (Binar: 000). Niciun bit nu este 1. Rezultă o submulțime vidă.",
      "blocksVisual": [
        {
          "label": "Masca 000",
          "groups": [
            [
              {
                "val": "{ }",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Iterația următoare: mask = 1 (Binar: 001). Bitul 0 este setat (dreapta).",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [
              {
                "val": "mask = 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Pentru i = 0, condiția '1 & (1 << 0)' -> '1 & 1' este Adevărat. Afișează 'A'. Restul biților sunt 0.",
      "blocksVisual": [
        {
          "label": "Masca 001",
          "groups": [
            [
              {
                "val": "{ A }",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "mask = 3 (Binar: 011). Biții 0 și 1 sunt setați.",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [
              {
                "val": "mask = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Vor trece testul i=0 ('A') și i=1 ('B'). Afișează { A, B }.",
      "blocksVisual": [
        {
          "label": "Masca 011",
          "groups": [
            [
              {
                "val": "{ A, B }",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "mask = 7 (Binar: 111). Toți cei 3 biți sunt setați.",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [
              {
                "val": "mask = 7",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Condiția '7 & (1 << i)' e adevărată pentru i=0,1,2. Afișează { A, B, C }.",
      "blocksVisual": [
        {
          "label": "Masca 111",
          "groups": [
            [
              {
                "val": "{ A, B, C }",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Am generat complet toate submulțimile fără să folosim Backtracking recursiv!",
      "blocksVisual": [
        {
          "label": "Succes!",
          "groups": [
            [
              {
                "val": "8 Submulțimi"
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
        "title": "Single Number",
        "url": "https://leetcode.com/problems/single-number/",
        "desc": "Folosirea XOR-ului (x ^ x = 0)"
      },
      {
        "title": "Number of 1 Bits",
        "url": "https://leetcode.com/problems/number-of-1-bits/",
        "desc": "Trucul lui Brian Kernighan"
      }
    ],
    "medium": [
      {
        "title": "Subsets",
        "url": "https://leetcode.com/problems/subsets/",
        "desc": "Generarea submulțimilor"
      },
      {
        "title": "Bitwise AND of Numbers Range",
        "url": "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
        "desc": "Proprietăți matematice pe biți"
      }
    ],
    "hard": [
      {
        "title": "Maximum XOR of Two Numbers",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        "desc": "Trie + Bitwise"
      }
    ]
  }
};
