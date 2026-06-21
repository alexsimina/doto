export const data = {
  "presentation": "### Prezentare Generală\n\nTeoria Jocurilor în algoritmică se concentrează în special pe jocurile imparțiale (unde ambii jucători au exact aceleași mutări posibile). Un astfel de joc clasic este **Jocul Nim**, din care derivă întreaga teorie Sprague-Grundy.\n\nÎn jocul Nim, avem mai multe stive cu obiecte (ex. pietre). Un jucător poate lua la rândul său oricâte obiecte dintr-o singură stivă (dar cel puțin unul). Pierde cel care nu mai poate face mutări (adică cel care e la rând când stivele sunt goale).\n\nRezultatul oricărui joc Nim se poate afla instant calculând **Suma XOR (eXclusive OR)** a tuturor stivelor:\n- Dacă suma XOR este nenulă (> 0), primul jucător are o strategie sigură de câștig.\n- Dacă suma XOR este 0, al doilea jucător va câștiga dacă joacă optim.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N) pentru a calcula suma XOR a celor N stive.\n- **Spațiu:** O(1) deoarece necesită doar o singură variabilă în care acumulăm rezultatul.\n",
  "variations": "### Variații și Edge Cases\n\n1. Misère Nim: O variație în care regulile se schimbă la final: pierde cel care este forțat să ia *ultimul* obiect.\n2. Numere Sprague-Grundy: Orice joc imparțial finit (ex. mutarea unui pion pe un graf, tăierea unei ciocolate) poate fi transformat într-un joc Nim echivalent calculând valorile Grundy (mex - minimum excluded) pentru fiecare stare.",
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
        cout << "Primul jucator va castiga (NimSum = " << nimSum << ")\\n";
    } else {
        cout << "Al doilea jucator va castiga (NimSum = 0)\\n";
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
      "line": 23,
      "text": "Pasul 1: Intrăm în funcția main. Avem 3 stive cu dimensiunile {3, 4, 5}. Apelăm funcția playNim(stive).",
      "blocksVisual": [
        {
          "label": "Stare Stive",
          "groups": [
            [{ "val": "Stiva 1: 3" }, { "val": "Stiva 2: 4" }, { "val": "Stiva 3: 5" }]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Pasul 2: Inițializăm variabila nimSum cu 0. Aceasta va acumula produsul XOR.",
      "blocksVisual": [
        {
          "label": "nimSum (Initial)",
          "groups": [
            [{ "val": "nimSum = 0", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 3: Facem XOR cu prima stivă (3). nimSum = 0 ^ 3 = 3.",
      "blocksVisual": [
        {
          "label": "XOR cu Stiva 1",
          "groups": [
            [{ "val": "0 ^ 3 = 3", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 4: Facem XOR cu a doua stivă (4). nimSum = 3 ^ 4 = 7 (binar: 011 ^ 100 = 111).",
      "blocksVisual": [
        {
          "label": "XOR cu Stiva 2",
          "groups": [
            [{ "val": "3 ^ 4 = 7", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 5: Facem XOR cu a treia stivă (5). nimSum = 7 ^ 5 = 2 (binar: 111 ^ 101 = 010).",
      "blocksVisual": [
        {
          "label": "XOR cu Stiva 3",
          "groups": [
            [{ "val": "7 ^ 5 = 2", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 6: Deoarece nimSum = 2 (> 0), primul jucător (Player 1) are o strategie de câștig sigură! Iată cum decurge jocul.",
      "blocksVisual": [
        {
          "label": "Verificare Câștigător",
          "groups": [
            [{ "val": "nimSum = 2 > 0 -> Player 1 Câștigă", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 7 (Joc real - Jucătorul 1): Starea stivelor este {3, 4, 5}. Jucătorul 1 vrea să lase o sumă Nim = 0. Mutarea optimă: reduce Stiva 1 de la 3 la 1.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 1 (Ia 2 din Stiva 1)",
          "groups": [
            [{ "val": "Stiva 1: 1", "active": true }, { "val": "Stiva 2: 4" }, { "val": "Stiva 3: 5" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 8 (Calcul XOR după Jucătorul 1): Suma Nim a noii stări {1, 4, 5} este 1 ^ 4 ^ 5 = 0. Jucătorul 2 este pus în dificultate.",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 1)",
          "groups": [
            [{ "val": "1 ^ 4 ^ 5 = 0", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 9 (Joc real - Jucătorul 2): Jucătorul 2 mută din starea {1, 4, 5}. El ia 2 pietre din Stiva 2. Starea devine {1, 2, 5}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 2 (Ia 2 din Stiva 2)",
          "groups": [
            [{ "val": "Stiva 1: 1" }, { "val": "Stiva 2: 2", "active": true }, { "val": "Stiva 3: 5" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 10 (Calcul XOR după Jucătorul 2): Suma Nim a stării {1, 2, 5} este 1 ^ 2 ^ 5 = 6 (nenulă).",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 2)",
          "groups": [
            [{ "val": "1 ^ 2 ^ 5 = 6", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 11 (Joc real - Jucătorul 1): Jucătorul 1 trebuie să readucă suma Nim la 0. El ia 2 pietre din Stiva 3. Starea devine {1, 2, 3}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 1 (Ia 2 din Stiva 3)",
          "groups": [
            [{ "val": "Stiva 1: 1" }, { "val": "Stiva 2: 2" }, { "val": "Stiva 3: 3", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 12 (Calcul XOR după Jucătorul 1): Suma Nim a stării {1, 2, 3} este 1 ^ 2 ^ 3 = 0. Jucătorul 2 primește din nou o stare cu NimSum = 0.",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 1)",
          "groups": [
            [{ "val": "1 ^ 2 ^ 3 = 0", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 13 (Joc real - Jucătorul 2): Jucătorul 2 ia singura piatră din Stiva 1. Starea devine {0, 2, 3}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 2 (Golește Stiva 1)",
          "groups": [
            [{ "val": "Stiva 1: 0", "active": true }, { "val": "Stiva 2: 2" }, { "val": "Stiva 3: 3" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 14 (Calcul XOR după Jucătorul 2): Suma Nim a stării {0, 2, 3} este 0 ^ 2 ^ 3 = 1.",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 2)",
          "groups": [
            [{ "val": "0 ^ 2 ^ 3 = 1", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 15 (Joc real - Jucătorul 1): Jucătorul 1 face XOR=0 luând 1 piatră din Stiva 3. Starea devine {0, 2, 2}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 1 (Ia 1 din Stiva 3)",
          "groups": [
            [{ "val": "Stiva 1: 0" }, { "val": "Stiva 2: 2" }, { "val": "Stiva 3: 2", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 16 (Calcul XOR după Jucătorul 1): Suma Nim a stării {0, 2, 2} este 0 ^ 2 ^ 2 = 0.",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 1)",
          "groups": [
            [{ "val": "0 ^ 2 ^ 2 = 0", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 17 (Joc real - Jucătorul 2): Jucătorul 2 ia 1 piatră din Stiva 2. Starea devine {0, 1, 2}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 2 (Ia 1 din Stiva 2)",
          "groups": [
            [{ "val": "Stiva 1: 0" }, { "val": "Stiva 2: 1", "active": true }, { "val": "Stiva 3: 2" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 18 (Calcul XOR după Jucătorul 2): Suma Nim a stării {0, 1, 2} este 0 ^ 1 ^ 2 = 3.",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 2)",
          "groups": [
            [{ "val": "0 ^ 1 ^ 2 = 3", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 19 (Joc real - Jucătorul 1): Jucătorul 1 ia 1 piatră din Stiva 3 pentru a o egala cu Stiva 2. Starea devine {0, 1, 1}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 1 (Ia 1 din Stiva 3)",
          "groups": [
            [{ "val": "Stiva 1: 0" }, { "val": "Stiva 2: 1" }, { "val": "Stiva 3: 1", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 20 (Calcul XOR după Jucătorul 1): Suma Nim este 0 ^ 1 ^ 1 = 0.",
      "blocksVisual": [
        {
          "label": "Suma Nim (După Jucătorul 1)",
          "groups": [
            [{ "val": "0 ^ 1 ^ 1 = 0", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 21 (Joc real - Jucătorul 2): Jucătorul 2 trebuie să ia singura piatră dintr-o stivă. El ia din Stiva 2. Starea devine {0, 0, 1}.",
      "blocksVisual": [
        {
          "label": "Mutare Jucător 2 (Golește Stiva 2)",
          "groups": [
            [{ "val": "Stiva 1: 0" }, { "val": "Stiva 2: 0", "active": true }, { "val": "Stiva 3: 1" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Pasul 22 (Joc real - Jucătorul 1): Jucătorul 1 ia ultima piatră din Stiva 3. Starea devine {0, 0, 0}. Jucătorul 2 este la rând, nu mai are mutări valide și pierde. Jucătorul 1 Câștigă!",
      "blocksVisual": [
        {
          "label": "Jucătorul 1 Câștigă Jocul!",
          "groups": [
            [{ "val": "Stiva 1: 0" }, { "val": "Stiva 2: 0" }, { "val": "Stiva 3: 0", "active": true }]
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
  },
    "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let nimSum = 0;
      if (stepIndex >= 2) nimSum = 3;
      if (stepIndex >= 3) nimSum = 7;
      if (stepIndex >= 4) nimSum = 2;
      globalVars.push({ name: 'stive', type: 'vector<int>', val: '{3, 4, 5}', expandable: false });
      vars.push({ name: 'nimSum', type: 'int', val: nimSum, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: stepIndex === 0 ? activeLine : 29 });
      if (stepIndex >= 1) frames.unshift({ name: `playNim(stive)`, file: 'main.cpp', line: activeLine });
      inlineVal = `nimSum: ${nimSum}`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let nimSum = 0;
      if (stepIndex >= 2) nimSum = 3;
      if (stepIndex >= 3) nimSum = 7;
      if (stepIndex >= 4) nimSum = 2;
      
      if (lineNum === 7) return `nimSum: ${nimSum}`;
      if (lineNum === 11 && stepIndex >= 2 && stepIndex <= 4) return `val: ${stepIndex === 2 ? 3 : (stepIndex === 3 ? 4 : 5)}`;
      if (lineNum === 15) return `nimSum: ${nimSum}`;
      return null;
    }
  }};
