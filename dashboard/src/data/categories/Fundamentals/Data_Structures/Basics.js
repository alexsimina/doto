export const data = {
  "presentation": "### Prezentare Generală\n\nOrice structură de date oferă un mod de a stoca și organiza informația.\n\nCele mai fundamentale două structuri, derivate adesea tot din Arrays, sunt:\n1. Stiva (Stack - LIFO): Ultimul venit, primul plecat. Exact ca un teanc de farfurii. Poți adăuga (push) și scoate (pop) doar de deasupra.\n2. Coada (Queue - FIFO): Primul venit, primul plecat. Asemănător unei cozi la magazin. Adaugi la final (push) și scoți de la început (pop).",
  "complexity": "### Complexitate\n\n- **Timp:** - Stack: Push, Pop, Top -> Toate se fac în O(1) constant, instantaneu.\n- Queue: Push, Pop, Front -> La fel, O(1).\n\n- **Spațiu:** O(N) pentru N elemente stocate.\n",
  "variations": "### Variații și Edge Cases\n\n1. Deque (Double-Ended Queue): O coadă în care poți insera și șterge de la ambele capete.\n2. Priority Queue (Max-Heap/Min-Heap): O coadă care nu sortează după timpul de intrare, ci după prioritatea elementelor.",
  "applications": "### Aplicații\n\n- Stack-urile sunt nucleul execuției funcțiilor în programare (Call Stack), parcurgerii de tip DFS și mecanismelor Undo/Redo.\n- Queue-urile sunt esențiale pentru algoritmul BFS (Breadth-First Search) și gestionarea cererilor asincrone pe servere web.",
  code: `
#include <iostream>
#include <stack>
#include <queue>

using namespace std;

int main() {
    // Partea 1: Stiva (Stack - LIFO)
    stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    
    int varf = s.top();
    s.pop();
    
    // Partea 2: Coada (Queue - FIFO)
    queue<int> q;
    q.push(100);
    q.push(200);
    q.push(300);
    
    int primul = q.front();
    q.pop();
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 9,
      "text": "Inițializăm o stivă goală (Stack). LIFO - Last In, First Out.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "Empty"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Adăugăm (push) elementul 10. Acesta ajunge la bază, dar este și vârful.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": 10,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm (push) elementul 20. Se așează PESTE elementul 10.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": 20,
                "active": true
              }
            ],
            [
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
      "text": "Adăugăm (push) elementul 30. Noul vârf (top) al stivei este acum 30.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": 30,
                "active": true
              }
            ],
            [
              {
                "val": 20
              }
            ],
            [
              {
                "val": 10
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Citim valoarea din vârf cu `s.top()`. Valoarea este 30.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": 30,
                "sorted": true
              }
            ],
            [
              {
                "val": 20
              }
            ],
            [
              {
                "val": 10
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Eliminăm vârful cu `s.pop()`. Elementul 30 dispare. Noul vârf redevine 20.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": 20,
                "active": true
              }
            ],
            [
              {
                "val": 10
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Acum trecem la o Coadă (Queue). FIFO - First In, First Out.",
      "blocksVisual": [
        {
          "label": "Queue (Coadă)",
          "groups": [
            [
              {
                "val": "Empty"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Adăugăm (push) 100 în coadă.",
      "blocksVisual": [
        {
          "label": "Queue (Coadă)",
          "groups": [
            [
              {
                "val": 100,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Adăugăm 200 la sfârșitul cozii. Elementul 100 rămâne primul (în față).",
      "blocksVisual": [
        {
          "label": "Queue (Coadă)",
          "groups": [
            [
              {
                "val": 100
              },
              {
                "val": 200,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Adăugăm 300. Coada crește în spate, iar primul venit e tot în față.",
      "blocksVisual": [
        {
          "label": "Queue (Coadă)",
          "groups": [
            [
              {
                "val": 100
              },
              {
                "val": 200
              },
              {
                "val": 300,
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Citim elementul din față folosind `q.front()`. Acesta este 100 (primul venit).",
      "blocksVisual": [
        {
          "label": "Queue (Coadă)",
          "groups": [
            [
              {
                "val": 100,
                "sorted": true
              },
              {
                "val": 200
              },
              {
                "val": 300
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Apelăm `q.pop()`. Acesta elimină elementul din față (100). Noul `front` devine 200.",
      "blocksVisual": [
        {
          "label": "Queue (Coadă)",
          "groups": [
            [
              {
                "val": 200,
                "active": true
              },
              {
                "val": 300
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
        "title": "Valid Parentheses",
        "url": "https://leetcode.com/problems/valid-parentheses/",
        "desc": "Problema clasică pentru stivă"
      }
    ],
    "medium": [
      {
        "title": "Implement Queue using Stacks",
        "url": "https://leetcode.com/problems/implement-queue-using-stacks/",
        "desc": "Combinație logică"
      }
    ],
    "hard": [
      {
        "title": "Sliding Window Maximum",
        "url": "https://leetcode.com/problems/sliding-window-maximum/",
        "desc": "Necesită un Deque (mai avansat)"
      }
    ]
  }
};
