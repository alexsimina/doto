export const data = {
  "presentation": "### Prezentare Generală\n\n**Coada (Queue)** și **Deque (Double-Ended Queue)** sunt două structuri de date liniare fundamentale utilizate pentru a stoca și gestiona elemente într-o ordine bine determinată:\n\n1. **Coada (Queue):** Funcționează după principiul **FIFO** (*First In, First Out* - Primul intrat, primul ieșit). Elementele sunt adăugate exclusiv prin spatele cozii (`push`) și eliminate prin fața acesteia (`pop`), mimând comportamentul unei cozi de așteptare reale.\n2. **Deque (Double-Ended Queue):** Este o coadă cu două capete care permite inserarea și ștergerea elementelor la ambele extremități (față și spate) în timp constant $O(1)$. Combină flexibilitatea stivei și a cozii într-o singură structură extrem de versatilă.",
  "complexity": "### Complexitate\n\n- **Timp:** Toate operațiile elementare (`push`, `pop`, `push_front`, `push_back`, `pop_front`, `pop_back`, `front`, `back`) rulează în timp constant $O(1)$.\n- **Spațiu:** $O(N)$ pentru stocarea celor $N$ elemente în memorie.",
  "variations": "### Variații și Edge Cases\n\n1. **Deque Monoton:** O variație specială unde elementele sunt menținute în ordine strict monotonă (crescătoare sau descrescătoare). Se utilizează în probleme avansate pentru a găsi elementul minim sau maxim pe o fereastră glisantă (Sliding Window Minimum/Maximum) în timp total liniar $O(N)$.\n2. **Coadă de priorități:** Elementele nu mai sunt extrase în ordinea FIFO, ci în funcție de o valoare a priorității asociate.",
  "applications": "### Aplicații\n\n- **Coada:** Parcurgerea în lățime a grafurilor (BFS - Breadth-First Search).\n- **Coada:** Algoritmul Lee (Flood Fill) pentru determinarea drumului minim în labirinturi.\n- **Deque:** Algoritmi avansați de ferestre glisante la concursuri de programare.\n- Gestionarea cozilor de printare sau a bufferelor de rețea.",
  "code": "\n#include <iostream>\n#include <queue>\n#include <deque>\n\nusing namespace std;\n\nint main() {\n    // Partea 1: Coada (Queue - FIFO)\n    queue<int> q;\n    q.push(10);\n    q.push(20);\n    q.push(30);\n    q.push(40);\n    \n    int primul = q.front(); \n    q.pop(); \n    int al_doilea = q.front(); \n    q.pop(); \n    \n    // Partea 2: Deque (Double-Ended Queue)\n    deque<int> dq;\n    dq.push_back(100);  \n    dq.push_front(50);  \n    dq.push_back(150);  \n    dq.push_front(25);  \n    \n    int front_val = dq.front(); \n    int back_val = dq.back(); \n    \n    dq.pop_front(); \n    dq.pop_back();  \n    dq.pop_front(); \n    dq.pop_back();  \n    \n    return 0;\n}\n",
  "explanations": [
    {
      "line": 10,
      "text": "Inițializăm o coadă goală `q` de numere întregi.",
      "blocksVisual": [
        {
          "label": "Coada (q)",
          "groups": [
            [
              {
                "val": "Coada e goală",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm elementul 10 în coadă. Acesta este acum primul și singurul element.",
      "blocksVisual": [
        {
          "label": "Push 10",
          "groups": [
            [
              {
                "val": "10",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adăugăm elementul 20 în coadă. Acesta se așază în spatele lui 10.",
      "blocksVisual": [
        {
          "label": "Push 20",
          "groups": [
            [
              {
                "val": "10"
              },
              {
                "val": "20",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Adăugăm elementul 30 în coadă, plasându-se în spatele lui 20.",
      "blocksVisual": [
        {
          "label": "Push 30",
          "groups": [
            [
              {
                "val": "10"
              },
              {
                "val": "20"
              },
              {
                "val": "30",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Adăugăm elementul 40 în coadă. Coada conține acum: 10 (față), 20, 30, 40 (spate).",
      "blocksVisual": [
        {
          "label": "Push 40",
          "groups": [
            [
              {
                "val": "10"
              },
              {
                "val": "20"
              },
              {
                "val": "30"
              },
              {
                "val": "40",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Citim elementul din față (front) al cozii. Valoarea citită este 10.",
      "blocksVisual": [
        {
          "label": "Front q",
          "groups": [
            [
              {
                "val": "10 (Front)",
                "active": true
              },
              {
                "val": "20"
              },
              {
                "val": "30"
              },
              {
                "val": "40"
              }
            ],
            [
              {
                "val": "primul = 10"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm elementul din față folosind pop(). Elementul 10 este extras, iar 20 devine noul front.",
      "blocksVisual": [
        {
          "label": "Pop Front q",
          "groups": [
            [
              {
                "val": "20 (Front)",
                "active": true
              },
              {
                "val": "30"
              },
              {
                "val": "40"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Citim noul front al cozii. Valoarea citită este 20.",
      "blocksVisual": [
        {
          "label": "Front q",
          "groups": [
            [
              {
                "val": "20 (Front)",
                "active": true
              },
              {
                "val": "30"
              },
              {
                "val": "40"
              }
            ],
            [
              {
                "val": "al_doilea = 20"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Eliminăm 20 din coadă. În coadă mai rămân elementele 30 și 40.",
      "blocksVisual": [
        {
          "label": "Pop Front q",
          "groups": [
            [
              {
                "val": "30 (Front)"
              },
              {
                "val": "40"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Partea 2: Inițializăm un deque `dq` (Double-Ended Queue) gol.",
      "blocksVisual": [
        {
          "label": "Deque (dq)",
          "groups": [
            [
              {
                "val": "Deque e gol",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Adăugăm elementul 100 la spatele (back) deque-ului. dq = [100].",
      "blocksVisual": [
        {
          "label": "Push Back 100",
          "groups": [
            [
              {
                "val": "100",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adăugăm elementul 50 în fața (front) deque-ului. dq = [50, 100].",
      "blocksVisual": [
        {
          "label": "Push Front 50",
          "groups": [
            [
              {
                "val": "50",
                "active": true
              },
              {
                "val": "100"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Adăugăm elementul 150 la spatele deque-ului. dq = [50, 100, 150].",
      "blocksVisual": [
        {
          "label": "Push Back 150",
          "groups": [
            [
              {
                "val": "50"
              },
              {
                "val": "100"
              },
              {
                "val": "150",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Adăugăm elementul 25 în fața deque-ului. dq = [25, 50, 100, 150].",
      "blocksVisual": [
        {
          "label": "Push Front 25",
          "groups": [
            [
              {
                "val": "25",
                "active": true
              },
              {
                "val": "50"
              },
              {
                "val": "100"
              },
              {
                "val": "150"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Citim elementul din fața (front) deque-ului. Valoarea este 25.",
      "blocksVisual": [
        {
          "label": "Front Deque",
          "groups": [
            [
              {
                "val": "25 (Front)",
                "active": true
              },
              {
                "val": "50"
              },
              {
                "val": "100"
              },
              {
                "val": "150 (Back)"
              }
            ],
            [
              {
                "val": "front_val = 25"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Citim elementul din spate (back) deque-ului. Valoarea este 150.",
      "blocksVisual": [
        {
          "label": "Back Deque",
          "groups": [
            [
              {
                "val": "25 (Front)"
              },
              {
                "val": "50"
              },
              {
                "val": "100"
              },
              {
                "val": "150 (Back)",
                "active": true
              }
            ],
            [
              {
                "val": "back_val = 150"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Eliminăm elementul din față (pop_front()). Se șterge 25, dq = [50, 100, 150].",
      "blocksVisual": [
        {
          "label": "Pop Front dq",
          "groups": [
            [
              {
                "val": "50 (Front)",
                "active": true
              },
              {
                "val": "100"
              },
              {
                "val": "150 (Back)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Eliminăm elementul din spate (pop_back()). Se șterge 150, dq = [50, 100].",
      "blocksVisual": [
        {
          "label": "Pop Back dq",
          "groups": [
            [
              {
                "val": "50 (Front)"
              },
              {
                "val": "100 (Back)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Eliminăm iarăși din față (pop_front()). Se șterge 50, dq = [100].",
      "blocksVisual": [
        {
          "label": "Pop Front dq",
          "groups": [
            [
              {
                "val": "100 (Front/Back)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "Eliminăm ultimul element rămas în spate (pop_back()). Deque devine din nou gol.",
      "blocksVisual": [
        {
          "label": "Pop Back dq - Gol",
          "groups": [
            [
              {
                "val": "Deque e gol",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Programul se termină. Am ilustrat cu succes ordinea FIFO în coadă și flexibilitatea deque-ului.",
      "blocksVisual": [
        {
          "label": "Sfârșit program",
          "groups": [
            [
              {
                "val": "Succes!",
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
        "title": "Coada (PbInfo #875)",
        "url": "https://www.pbinfo.ro/probleme/875",
        "desc": "Simulare simplă a operațiilor pe coadă."
      }
    ],
    "medium": [
      {
        "title": "Algoritmul Lee (PbInfo #344)",
        "url": "https://www.pbinfo.ro/probleme/344",
        "desc": "Determinarea drumului minim în matrice folosind coada (BFS)."
      }
    ],
    "hard": [
      {
        "title": "Sliding Window Maximum (LeetCode #239)",
        "url": "https://leetcode.com/problems/sliding-window-maximum/",
        "desc": "Găsirea maximului pe ferestre glisante în timp liniar folosind un Deque monoton."
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { q: [], dq: [] },
        { q: [10], dq: [] },
        { q: [10, 20], dq: [] },
        { q: [10, 20, 30], dq: [] },
        { q: [10, 20, 30, 40], dq: [] },
        { q: [10, 20, 30, 40], primul: 10, dq: [] },
        { q: [20, 30, 40], primul: 10, dq: [] },
        { q: [20, 30, 40], primul: 10, al_doilea: 20, dq: [] },
        { q: [30, 40], primul: 10, al_doilea: 20, dq: [] },
        { q: [30, 40], dq: [] },
        { q: [30, 40], dq: [100] },
        { q: [30, 40], dq: [50, 100] },
        { q: [30, 40], dq: [50, 100, 150] },
        { q: [30, 40], dq: [25, 50, 100, 150] },
        { q: [30, 40], dq: [25, 50, 100, 150], front_val: 25 },
        { q: [30, 40], dq: [25, 50, 100, 150], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [50, 100, 150], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [50, 100], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [100], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [], front_val: 25, back_val: 150 }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [
        { name: "main()", file: "main.cpp", line: activeLine }
      ];

      if (activeLine >= 10 && activeLine <= 20) {
        const qVal = "size = " + curr.q.length + " {" + curr.q.join(", ") + "}";
        vars.push({ name: "q", type: "std::queue<int>", val: qVal, expandable: curr.q.length > 0 });
        if (curr.primul !== undefined) {
          vars.push({ name: "primul", type: "int", val: curr.primul.toString(), expandable: false });
        }
        if (curr.al_doilea !== undefined) {
          vars.push({ name: "al_doilea", type: "int", val: curr.al_doilea.toString(), expandable: false });
        }
      } else if (activeLine >= 22) {
        const dqVal = "size = " + curr.dq.length + " {" + curr.dq.join(", ") + "}";
        vars.push({ name: "dq", type: "std::deque<int>", val: dqVal, expandable: curr.dq.length > 0 });
        if (curr.front_val !== undefined) {
          vars.push({ name: "front_val", type: "int", val: curr.front_val.toString(), expandable: false });
        }
        if (curr.back_val !== undefined) {
          vars.push({ name: "back_val", type: "int", val: curr.back_val.toString(), expandable: false });
        }
      }

      let inlineVal = "";
      if (activeLine >= 10 && activeLine <= 20) {
        inlineVal = "q: {" + curr.q.join(",") + "}";
      } else if (activeLine >= 22) {
        inlineVal = "dq: {" + curr.dq.join(",") + "}";
      }
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { q: [], dq: [] },
        { q: [10], dq: [] },
        { q: [10, 20], dq: [] },
        { q: [10, 20, 30], dq: [] },
        { q: [10, 20, 30, 40], dq: [] },
        { q: [10, 20, 30, 40], primul: 10, dq: [] },
        { q: [20, 30, 40], primul: 10, dq: [] },
        { q: [20, 30, 40], primul: 10, al_doilea: 20, dq: [] },
        { q: [30, 40], primul: 10, al_doilea: 20, dq: [] },
        { q: [30, 40], dq: [] },
        { q: [30, 40], dq: [100] },
        { q: [30, 40], dq: [50, 100] },
        { q: [30, 40], dq: [50, 100, 150] },
        { q: [30, 40], dq: [25, 50, 100, 150] },
        { q: [30, 40], dq: [25, 50, 100, 150], front_val: 25 },
        { q: [30, 40], dq: [25, 50, 100, 150], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [50, 100, 150], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [50, 100], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [100], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [], front_val: 25, back_val: 150 },
        { q: [30, 40], dq: [], front_val: 25, back_val: 150 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 10 && lineNum <= 20) {
        return "q: {" + curr.q.join(",") + "}";
      }
      if (lineNum >= 22 && lineNum <= 34) {
        return "dq: {" + curr.dq.join(",") + "}";
      }
      return null;
    }
  }
};
