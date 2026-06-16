export const data = {
  "presentation": "### Prezentare Generală\n\nTeoria Jocurilor în algoritmică se concentrează în special pe jocurile imparțiale (unde ambii jucători au exact aceleași mutări posibile). Un astfel de joc clasic este **Jocul Nim**, din care derivă întreaga teorie Sprague-Grundy.\\n\\nÎn jocul Nim, avem mai multe stive cu obiecte (ex. pietre). Un jucător poate lua la rândul său oricâte obiecte dintr-o singură stivă (dar cel puțin unul). Pierde cel care nu mai poate face mutări (adică cel care e la rând când stivele sunt goale).\\n\\nRezultatul oricărui joc Nim se poate afla instant calculând **Suma XOR (eXclusive OR)** a tuturor stivelor:\\n- Dacă suma XOR este nenulă (> 0), primul jucător are o strategie sigură de câștig.\\n- Dacă suma XOR este 0, al doilea jucător va câștiga dacă joacă optim.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N) pentru a calcula suma XOR a celor N stive.\\n- **Spațiu:** O(1) deoarece necesită doar o singură variabilă în care acumulăm rezultatul.\n",
  "variations": "### Variații și Edge Cases\n\n1. Misère Nim: O variație în care regulile se schimbă la final: pierde cel care este forțat să ia *ultimul* obiect.\\n2. Numere Sprague-Grundy: Orice joc imparțial finit (ex. mutarea unui pion pe un graf, tăierea unei ciocolate) poate fi transformat într-un joc Nim echivalent calculând valorile Grundy (mex - minimum excluded) pentru fiecare stare.",
  "applications": "### Aplicații\n\nAplicațiile sunt teoretice, folosite pentru optimizarea arborilor de decizie în AI simplu și jocuri de logică matematică și puzzle-uri (Hackenbush, jocuri pe table/griduri).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

void playNim(vector<int>& stive) {
    int nimSum = 0;
    
    // Calculam suma XOR a tuturor stivelor
    for(int val : stive) {
        nimSum ^= val;
    }
    
    if(nimSum > 0) {
        cout << "Primul jucator va castiga (NimSum = " << nimSum << ")
";
    } else {
        cout << "Al doilea jucator va castiga (NimSum = 0)
";
    }
}

int main() {
    vector<int> stive = {3, 4, 5};
    playNim(stive);
    return 0;
}
`,
  "explanations": [
    {
      "line": 22,
      "text": "Avem 3 stive cu pietre. Stiva 1 are 3 pietre, Stiva 2 are 4 pietre, Stiva 3 are 5 pietre.",
      "blocksVisual": [
        {
          "label": "Stive Initiale",
          "groups": [
            [
              {
                "val": "3",
                "active": true
              },
              {
                "val": "4",
                "active": true
              },
              {
                "val": "5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Inițializăm suma Nim (nimSum) cu 0.",
      "blocksVisual": [
        {
          "label": "XOR Curent",
          "groups": [
            [
              {
                "val": "000 (binar)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Facem XOR cu prima stivă (3). În binar: 0 ^ 3 = 000 ^ 011 = 011 (adică 3).",
      "blocksVisual": [
        {
          "label": "nimSum ^ 3",
          "groups": [
            [
              {
                "val": "3",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "XOR cu a doua stivă (4). În binar: 3 ^ 4 = 011 ^ 100 = 111 (adică 7).",
      "blocksVisual": [
        {
          "label": "nimSum ^ 4",
          "groups": [
            [
              {
                "val": "7",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "XOR cu a treia stivă (5). În binar: 7 ^ 5 = 111 ^ 101 = 010 (adică 2).",
      "blocksVisual": [
        {
          "label": "nimSum ^ 5",
          "groups": [
            [
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Suma Nim finală este 2. Deoarece 2 > 0, primul jucător are o strategie sigură de câștig! Punct cheie: O mutare corectă a primului jucător va transforma suma Nim în 0 pentru oponent.",
      "blocksVisual": [
        {
          "label": "Rezultat final",
          "groups": [
            [
              {
                "val": "Primul castiga",
                "active": true
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
        "title": "Jocul Nim",
        "url": "https://www.pbinfo.ro/probleme/2347/nim",
        "desc": "Aflare castigator (XOR)"
      }
    ],
    "medium": [
      {
        "title": "Nim Game",
        "url": "https://leetcode.com/problems/nim-game/",
        "desc": "Caz particular 1-3 pietre"
      },
      {
        "title": "Sprague Grundy",
        "url": "https://www.infoarena.ro/problema/grundy",
        "desc": "Teoria Grundy"
      }
    ],
    "hard": [
      {
        "title": "Misere Nim",
        "url": "https://www.hackerrank.com/challenges/misere-nim-1/",
        "desc": "Regula ultimului obiect"
      }
    ]
  }
};
