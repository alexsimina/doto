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
      "line": 4,
      "text": "Reprezentarea binară: numerele sunt procesate la nivel de biți (0 și 1) în memoria calculatorului.",
      "blocksVisual": [
        {
          "label": "Biți",
          "groups": [
            [{ "val": "1" }, { "val": "0" }, { "val": "1" }, { "val": "1" }]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Avem o mulțime de N = 3 elemente distincte: A, B, C.",
      "blocksVisual": [
        {
          "label": "Date Intrare",
          "groups": [
            [{ "val": "A" }, { "val": "B" }, { "val": "C" }]
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
            [{ "val": "1 << 3 = 8", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Începem bucla for. Inițializăm masca 'mask' = 0 (în binar: 000).",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [{ "val": "mask = 0 (000)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 0: Verificăm bitul 0 (1 << 0 = 1). Condiția (0 & 1) este Falsă.",
      "blocksVisual": [
        {
          "label": "Verificare Bit 0",
          "groups": [
            [{ "val": "000 & 001 = 0 (Fals)" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 0: Verificăm bitul 1 (1 << 1 = 2). Condiția (0 & 2) este Falsă.",
      "blocksVisual": [
        {
          "label": "Verificare Bit 1",
          "groups": [
            [{ "val": "000 & 010 = 0 (Fals)" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 0: Verificăm bitul 2 (1 << 2 = 4). Condiția (0 & 4) este Falsă.",
      "blocksVisual": [
        {
          "label": "Verificare Bit 2",
          "groups": [
            [{ "val": "000 & 100 = 0 (Fals)" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "mask = 0: Niciun bit nu a fost setat. Afișăm submulțimea vidă { }.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [{ "val": "{ }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la următoarea mască: mask = 1 (în binar: 001).",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [{ "val": "mask = 1 (001)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 1: Verificăm bitul 0 (1 << 0 = 1). Condiția (1 & 1) este Adevărată! Selectăm 'A'.",
      "blocksVisual": [
        {
          "label": "Verificare Bit 0",
          "groups": [
            [{ "val": "001 & 001 = 1 (Adevărat)", "active": true }],
            [{ "val": "A" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 1: Verificăm bitul 1 (1 & 2 = 0 - Fals) și bitul 2 (1 & 4 = 0 - Fals).",
      "blocksVisual": [
        {
          "label": "Verificare rest biți",
          "groups": [
            [{ "val": "Fals pentru B și C" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "mask = 1: Afișăm submulțimea formată doar din elementul 'A': { A }.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [{ "val": "{ A }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la mask = 2 (în binar: 010).",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [{ "val": "mask = 2 (010)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 2: Verificăm bitul 0 (2 & 1 = 0 - Fals). Verificăm bitul 1 (2 & 2 = 2 - Adevărat!). Selectăm 'B'.",
      "blocksVisual": [
        {
          "label": "Verificare Biți",
          "groups": [
            [{ "val": "010 & 010 = 2 (Adevărat)", "active": true }],
            [{ "val": "B" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 2: Verificăm bitul 2 (2 & 4 = 0 - Fals). Doar 'B' a fost selectat.",
      "blocksVisual": [
        {
          "label": "Verificare Bit 2",
          "groups": [
            [{ "val": "010 & 100 = 0 (Fals)" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "mask = 2: Afișăm submulțimea { B }.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [{ "val": "{ B }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la mask = 3 (în binar: 011).",
      "blocksVisual": [
        {
          "label": "Masca Curenta",
          "groups": [
            [{ "val": "mask = 3 (011)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 3: Verificăm bitul 0. 3 & 1 = 1 (Adevărat). Selectăm 'A'.",
      "blocksVisual": [
        {
          "label": "Verificare Bit 0",
          "groups": [
            [{ "val": "011 & 001 = 1", "active": true }],
            [{ "val": "A" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "mask = 3: Verificăm bitul 1. 3 & 2 = 2 (Adevărat). Selectăm 'B'. Bitul 2 este 0.",
      "blocksVisual": [
        {
          "label": "Verificare Biți",
          "groups": [
            [{ "val": "011 & 010 = 2", "active": true }],
            [{ "val": "A" }, { "val": "B" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "mask = 3: Afișăm submulțimea { A, B }.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [{ "val": "{ A, B }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la mask = 4 (în binar: 100). Doar bitul 2 este setat. Afișăm { C }.",
      "blocksVisual": [
        {
          "label": "Masca 100",
          "groups": [
            [{ "val": "mask = 4" }],
            [{ "val": "{ C }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la mask = 5 (în binar: 101). Biții 0 și 2 sunt setați. Afișăm { A, C }.",
      "blocksVisual": [
        {
          "label": "Masca 101",
          "groups": [
            [{ "val": "mask = 5" }],
            [{ "val": "{ A, C }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la mask = 6 (în binar: 110). Biții 1 și 2 sunt setați. Afișăm { B, C }.",
      "blocksVisual": [
        {
          "label": "Masca 110",
          "groups": [
            [{ "val": "mask = 6" }],
            [{ "val": "{ B, C }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Trecem la ultima mască: mask = 7 (în binar: 111). Toți biții sunt setați.",
      "blocksVisual": [
        {
          "label": "Masca 111",
          "groups": [
            [{ "val": "mask = 7 (111)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "mask = 7: Toate cele 3 elemente sunt selectate. Afișăm { A, B, C }.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [{ "val": "{ A, B, C }", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Am parcurs toate cele 8 stări și am generat corect toate submulțimile posibile în O(2^N).",
      "blocksVisual": [
        {
          "label": "Succes!",
          "groups": [
            [{ "val": "8 Submulțimi", "sorted": true }]
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
