export const data = {
  "presentation": "### Prezentare Generală\n\nO **coadă cu priorități (Priority Queue)** este o structură de date avansată care administrează o colecție de elemente astfel încât elementul cu cea mai mare prioritate (implicit valoarea maximă) se află întotdeauna în vârful structurii și poate fi accesat în timp constant $O(1)$.\n\nSpre deosebire de o coadă standard FIFO unde elementele ies în ordinea sosirii lor, în coada cu priorități ordinea este determinată de valoarea elementelor. În spate, este implementată ca un **Heap (grămadă)**, un arbore binar aproape complet care respectă proprietatea de Heap (de exemplu, pentru Max-Heap, părintele are o valoare mai mare sau egală cu cea a fiilor săi).",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - Inserare (`push`): $O(\\log N)$ deoarece elementul nou urcă (cerne în sus) pentru a-și găsi poziția corectă.\n  - Eliminare vârf (`pop`): $O(\\log N)$ deoarece se înlocuiește rădăcina cu ultimul element din heap, iar acesta coboară (cerne în jos).\n  - Vizualizare vârf (`top`): $O(1)$ constant.\n- **Spațiu:** $O(N)$ memorie pentru stocarea celor $N$ elemente.",
  "variations": "### Variații și Edge Cases\n\n1. **Min-Heap:** În C++, implicit se utilizează Max-Heap. Pentru a obține elementul minim în vârf, se declară astfel:\n   `priority_queue<int, vector<int>, greater<int>> pq;`\n2. **Comparatori Custom:** Pentru tipuri personalizate (de exemplu, muchii de graf sau puncte în plan), se poate defini o structură de comparare custom sau se poate supraîncărca operatorul `<`.",
  "applications": "### Aplicații\n\n- **Algoritmul lui Dijkstra** pentru drumuri minime în grafuri ponderate (extragerea nodului cel mai apropiat nevizitat).\n- **Algoritmul lui Prim** pentru determinarea arborelui parțial de cost minim (MST).\n- **Codificarea Huffman** în algoritmii de compresie a datelor.\n- Algoritmul de îmbinare eficientă a K liste sortate (K-way merge).",
  "code": "\n#include <iostream>\n#include <queue>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    // 1. Max-Heap implicit\n    priority_queue<int> max_pq;\n    max_pq.push(10);\n    max_pq.push(30);\n    max_pq.push(20);\n    max_pq.push(40);\n    \n    int max1 = max_pq.top(); // 40\n    max_pq.pop(); // noul top = 30\n    int max2 = max_pq.top(); // 30\n    max_pq.pop(); // noul top = 20\n    \n    // 2. Min-Heap \n    priority_queue<int, vector<int>, greater<int>> min_pq;\n    min_pq.push(40);\n    min_pq.push(10);\n    min_pq.push(30);\n    min_pq.push(20);\n    \n    int min1 = min_pq.top(); // 10\n    min_pq.pop(); // noul top = 20\n    int min2 = min_pq.top(); // 20\n    min_pq.pop(); // noul top = 30\n    \n    return 0;\n}\n",
  "explanations": [
    {
      "line": 3,
      "text": "Includem biblioteca standard `<queue>` care pune la dispoziție structura de date `priority_queue` implementată ca un Heap.",
      "blocksVisual": [
        {
          "label": "Biblioteci",
          "groups": [
            [
              {
                "val": "queue",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Începem execuția funcției principale `main()`.",
      "blocksVisual": [
        {
          "label": "Program",
          "groups": [
            [
              {
                "val": "main()",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm o coadă cu priorități de tip Max-Heap `max_pq` în mod implicit. În vârful ei se va afla mereu cel mai mare element.",
      "blocksVisual": [
        {
          "label": "Max-Heap",
          "groups": [
            [
              {
                "val": "Vârf (Max)",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm elementul 10. `max_pq` = [10].",
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
      "text": "Adăugăm elementul 30. Structura se re-echilibrează, iar 30 urcă în vârful heap-ului. `max_pq` = [30, 10].",
      "blocksVisual": [
        {
          "label": "Push 30",
          "groups": [
            [
              {
                "val": "30 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "10"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Adăugăm elementul 20. Deoarece 20 este mai mic decât 30, acesta se plasează sub vârf. `max_pq` = [30, 10, 20].",
      "blocksVisual": [
        {
          "label": "Push 20",
          "groups": [
            [
              {
                "val": "30 (Vârf)"
              }
            ],
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
      "line": 14,
      "text": "Adăugăm elementul 40. Fiind cel mai mare, 40 devine noul reprezentant (rădăcină). `max_pq` = [40, 30, 20, 10].",
      "blocksVisual": [
        {
          "label": "Push 40",
          "groups": [
            [
              {
                "val": "40 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "30"
              },
              {
                "val": "20"
              }
            ],
            [
              {
                "val": "10"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Accesăm top-ul heap-ului: `max_pq.top()`. Acesta returnează elementul maxim curent, adică 40.",
      "blocksVisual": [
        {
          "label": "Top Max-Heap",
          "groups": [
            [
              {
                "val": "40 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "30"
              },
              {
                "val": "20"
              }
            ],
            [
              {
                "val": "10"
              }
            ],
            [
              {
                "val": "max1 = 40"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm rădăcina 40 cu `pop()`. În urma cernii, 30 urcă în vârf. `max_pq` = [30, 20, 10].",
      "blocksVisual": [
        {
          "label": "Pop Max-Heap",
          "groups": [
            [
              {
                "val": "30 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "10"
              },
              {
                "val": "20"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Accesăm din nou top-ul. Valoarea returnată este 30.",
      "blocksVisual": [
        {
          "label": "Top Max-Heap",
          "groups": [
            [
              {
                "val": "30 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "10"
              },
              {
                "val": "20"
              }
            ],
            [
              {
                "val": "max2 = 30"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Ștergem elementul 30 cu `pop()`. Noul vârf devine 20. În heap rămân [20, 10].",
      "blocksVisual": [
        {
          "label": "Pop Max-Heap",
          "groups": [
            [
              {
                "val": "20 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "10"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Inițializăm un Min-Heap `min_pq` folosind parametrul `greater<int>`. În vârful acestuia se va afla mereu valoarea minimă.",
      "blocksVisual": [
        {
          "label": "Min-Heap",
          "groups": [
            [
              {
                "val": "Vârf (Min)",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Adăugăm elementul 40 în Min-Heap. `min_pq` = [40].",
      "blocksVisual": [
        {
          "label": "Push 40",
          "groups": [
            [
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
      "line": 24,
      "text": "Adăugăm 10. Deoarece 10 este mai mic decât 40, acesta devine noua rădăcină (vârf). `min_pq` = [10, 40].",
      "blocksVisual": [
        {
          "label": "Push 10",
          "groups": [
            [
              {
                "val": "10 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "40"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Adăugăm 30. `min_pq` = [10, 40, 30].",
      "blocksVisual": [
        {
          "label": "Push 30",
          "groups": [
            [
              {
                "val": "10 (Vârf)"
              }
            ],
            [
              {
                "val": "40"
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
      "line": 26,
      "text": "Adăugăm 20. `min_pq` = [10, 20, 30, 40]. Valoarea 10 rămâne în vârf deoarece este minimul.",
      "blocksVisual": [
        {
          "label": "Push 20",
          "groups": [
            [
              {
                "val": "10 (Vârf)"
              }
            ],
            [
              {
                "val": "20",
                "active": true
              },
              {
                "val": "30"
              }
            ],
            [
              {
                "val": "40"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Accesăm top-ul Min-Heap-ului. Valoarea extrasă (minimul) este 10.",
      "blocksVisual": [
        {
          "label": "Top Min-Heap",
          "groups": [
            [
              {
                "val": "10 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "20"
              },
              {
                "val": "30"
              }
            ],
            [
              {
                "val": "40"
              }
            ],
            [
              {
                "val": "min1 = 10"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Eliminăm rădăcina 10. Structura se reorganizează, iar 20 devine noul vârf (minim). `min_pq` = [20, 40, 30].",
      "blocksVisual": [
        {
          "label": "Pop Min-Heap",
          "groups": [
            [
              {
                "val": "20 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "40"
              },
              {
                "val": "30"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Accesăm top-ul curent. Valoarea citită este 20.",
      "blocksVisual": [
        {
          "label": "Top Min-Heap",
          "groups": [
            [
              {
                "val": "20 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "40"
              },
              {
                "val": "30"
              }
            ],
            [
              {
                "val": "min2 = 20"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Ștergem elementul 20. Noul vârf devine 30. În heap mai rămân [30, 40].",
      "blocksVisual": [
        {
          "label": "Pop Min-Heap",
          "groups": [
            [
              {
                "val": "30 (Vârf)",
                "active": true
              }
            ],
            [
              {
                "val": "40"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Programul se încheie cu succes, returnând 0.",
      "blocksVisual": [
        {
          "label": "Sfârșit",
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
        "title": "Sortare cu Heap (PbInfo #2035)",
        "url": "https://www.pbinfo.ro/probleme/2035",
        "desc": "Sortarea unui vector folosind structura de Heap."
      }
    ],
    "medium": [
      {
        "title": "Kth Largest Element in an Array",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "desc": "Găsirea celui de-al K-lea cel mai mare element dintr-un șir folosind un Min-Heap de mărime K."
      }
    ],
    "hard": [
      {
        "title": "Merge k Sorted Lists",
        "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
        "desc": "Îmbinarea eficientă a k liste sortate folosind o coadă cu priorități."
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { max_pq: [], min_pq: [] },
        { max_pq: [], min_pq: [] },
        { max_pq: [], min_pq: [] },
        { max_pq: [10], min_pq: [] },
        { max_pq: [30, 10], min_pq: [] },
        { max_pq: [30, 10, 20], min_pq: [] },
        { max_pq: [40, 30, 20, 10], min_pq: [] },
        { max_pq: [40, 30, 20, 10], max1: 40, min_pq: [] },
        { max_pq: [30, 20, 10], max1: 40, min_pq: [] },
        { max_pq: [30, 20, 10], max1: 40, max2: 30, min_pq: [] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [40] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 40] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 40, 30] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 20, 30, 40] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 20, 30, 40], min1: 10 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [20, 30, 40], min1: 10 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [20, 30, 40], min1: 10, min2: 20 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [30, 40], min1: 10, min2: 20 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [30, 40], min1: 10, min2: 20 }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [
        { name: "main()", file: "main.cpp", line: activeLine }
      ];

      if (activeLine >= 9 && activeLine <= 20) {
        const pqVal = "size = " + curr.max_pq.length + " (top = " + (curr.max_pq[0] || "none") + ")";
        vars.push({ name: "max_pq", type: "std::priority_queue<int>", val: pqVal, expandable: curr.max_pq.length > 0 });
        if (curr.max1 !== undefined) {
          vars.push({ name: "max1", type: "int", val: curr.max1.toString(), expandable: false });
        }
        if (curr.max2 !== undefined) {
          vars.push({ name: "max2", type: "int", val: curr.max2.toString(), expandable: false });
        }
      } else if (activeLine >= 21) {
        const pqVal = "size = " + curr.min_pq.length + " (top = " + (curr.min_pq[0] || "none") + ")";
        vars.push({ name: "min_pq", type: "std::priority_queue<int, vector<int>, greater<int>>", val: pqVal, expandable: curr.min_pq.length > 0 });
        if (curr.min1 !== undefined) {
          vars.push({ name: "min1", type: "int", val: curr.min1.toString(), expandable: false });
        }
        if (curr.min2 !== undefined) {
          vars.push({ name: "min2", type: "int", val: curr.min2.toString(), expandable: false });
        }
      }

      let inlineVal = "";
      if (activeLine >= 9 && activeLine <= 20) {
        inlineVal = "max_pq: " + (curr.max_pq.length > 0 ? "{" + curr.max_pq.join(",") + "}" : "empty");
      } else if (activeLine >= 21) {
        inlineVal = "min_pq: " + (curr.min_pq.length > 0 ? "{" + curr.min_pq.join(",") + "}" : "empty");
      }
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { max_pq: [], min_pq: [] },
        { max_pq: [], min_pq: [] },
        { max_pq: [], min_pq: [] },
        { max_pq: [10], min_pq: [] },
        { max_pq: [30, 10], min_pq: [] },
        { max_pq: [30, 10, 20], min_pq: [] },
        { max_pq: [40, 30, 20, 10], min_pq: [] },
        { max_pq: [40, 30, 20, 10], max1: 40, min_pq: [] },
        { max_pq: [30, 20, 10], max1: 40, min_pq: [] },
        { max_pq: [30, 20, 10], max1: 40, max2: 30, min_pq: [] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [40] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 40] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 40, 30] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 20, 30, 40] },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [10, 20, 30, 40], min1: 10 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [20, 30, 40], min1: 10 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [20, 30, 40], min1: 10, min2: 20 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [30, 40], min1: 10, min2: 20 },
        { max_pq: [20, 10], max1: 40, max2: 30, min_pq: [30, 40], min1: 10, min2: 20 }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum >= 9 && lineNum <= 20) {
        return "max_pq: " + (curr.max_pq.length > 0 ? "{" + curr.max_pq.join(",") + "}" : "empty");
      }
      if (lineNum >= 21 && lineNum <= 31) {
        return "min_pq: " + (curr.min_pq.length > 0 ? "{" + curr.min_pq.join(",") + "}" : "empty");
      }
      return null;
    }
  }
};
