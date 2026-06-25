export const data = {
  "presentation": "### Prezentare Generală\n\nOrice structură de date oferă un mod de a stoca și organiza informația.\n\nCele mai fundamentale două structuri, derivate adesea tot din Arrays, sunt:\n1. Stiva (Stack - LIFO): Ultimul venit, primul plecat. Exact ca un teanc de farfurii. Poți adăuga (push) și scoate (pop) doar de deasupra.\n2. Coada (Queue - FIFO): Primul venit, primul plecat. Asemănător unei cozi la magazin. Adaugi la final (push) și scoți de la început (pop).",
  "complexity": "### Complexitate\n\n- **Timp:** - Stack: Push, Pop, Top -> Toate se fac în O(1) constant, instantaneu.\n- Queue: Push, Pop, Front -> La fel, O(1).\n\n- **Spațiu:** O(N) pentru N elemente stocate.\n",
  "variations": "### Variații și Edge Cases\n\n1. Deque (Double-Ended Queue): O coadă în care poți insera și șterge de la ambele capete.\n2. Priority Queue (Max-Heap/Min-Heap): O coadă care nu sortează după timpul de intrare, ci după prioritatea elementelor.",
  "applications": "### Aplicații\n\n- Stack-urile sunt nucleul execuției funcțiilor în programare (Call Stack), parcurgerii de tip DFS și mecanismelor Undo/Redo.\n- Queue-urile sunt esențiale pentru algoritmul BFS (Breadth-First Search) și gestionarea cererilor asincrone pe servere web.",
  code: `#include <iostream>
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
      "text": "📚 STIVA (Stack) — Principiu LIFO: Last In, First Out. Imaginează-ți un teanc de farfurii: poți pune sau lua doar din vârf. Inițializăm o stivă goală.",
      "visual": "  ┌────┐\n  │    │  ← (goală)\n  └────┘\n  Stack LIFO",
      "blocksVisual": [
        { "label": "Stack (goală)", "groups": [[{ "val": "∅" }]] }
      ]
    },
    {
      "line": 10,
      "text": "s.push(10) — Adăugăm elementul 10. Este primul element, deci este simultan și vârful (TOP) și baza (BOTTOM) stivei.",
      "visual": "  ┌────┐\n  │ 10 │  ← TOP\n  └────┘\n    ↑ BOTTOM",
      "blocksVisual": [
        { "label": "TOP ↑", "groups": [[{ "val": 10, "active": true }]] },
        { "label": "BOT ↓", "groups": [[{ "val": "───" }]] }
      ]
    },
    {
      "line": 11,
      "text": "s.push(20) — Adăugăm elementul 20. Se așează DEASUPRA lui 10. Noul vârf este 20. Elementul 10 coboară la bază.",
      "visual": "  ┌────┐\n  │ 20 │  ← TOP (nou)\n  ├────┤\n  │ 10 │  ← BOTTOM\n  └────┘",
      "blocksVisual": [
        { "label": "TOP ↑", "groups": [[{ "val": 20, "active": true }]] },
        { "label": "BOT ↓", "groups": [[{ "val": 10 }]] }
      ]
    },
    {
      "line": 12,
      "text": "s.push(30) — Adăugăm elementul 30. Acesta devine noul vârf (TOP). Stiva crește vertical în sus: 10 → 20 → 30.",
      "visual": "  ┌────┐\n  │ 30 │  ← TOP\n  ├────┤\n  │ 20 │\n  ├────┤\n  │ 10 │  ← BOTTOM\n  └────┘",
      "blocksVisual": [
        { "label": "TOP ↑", "groups": [[{ "val": 30, "active": true }]] },
        { "label": "     ", "groups": [[{ "val": 20 }]] },
        { "label": "BOT ↓", "groups": [[{ "val": 10 }]] }
      ]
    },
    {
      "line": 14,
      "text": "s.top() — Citim valoarea din vârf FĂRĂ a o elimina. Valoarea returnată este 30. Stiva rămâne intactă.",
      "visual": "  ┌────┐\n  │ 30 │  ← TOP  ✓ top() = 30\n  ├────┤\n  │ 20 │\n  ├────┤\n  │ 10 │  ← BOTTOM\n  └────┘",
      "blocksVisual": [
        { "label": "TOP ↑  top()=30", "groups": [[{ "val": 30, "sorted": true }]] },
        { "label": "               ", "groups": [[{ "val": 20 }]] },
        { "label": "BOT ↓          ", "groups": [[{ "val": 10 }]] }
      ]
    },
    {
      "line": 15,
      "text": "s.pop() — Eliminăm vârful stivei. Elementul 30 este scos definitiv (LIFO: ultimul intrat, primul ieșit). Noul vârf devine 20.",
      "visual": "  ╳ 30 ╳  ← eliminat!\n  ┌────┐\n  │ 20 │  ← TOP (nou)\n  ├────┤\n  │ 10 │  ← BOTTOM\n  └────┘",
      "blocksVisual": [
        { "label": "⬆ eliminat", "groups": [[{ "val": 30, "hidden": true }]] },
        { "label": "TOP ↑     ", "groups": [[{ "val": 20, "active": true }]] },
        { "label": "BOT ↓     ", "groups": [[{ "val": 10 }]] }
      ]
    },
    {
      "line": 15,
      "text": "Starea finală a stivei după pop(): [10, 20] cu 20 la vârf. Operațiile s.top() și s.pop() lucrează mereu la același capăt — vârful.",
      "visual": "  ┌────┐\n  │ 20 │  ← TOP\n  ├────┤\n  │ 10 │  ← BOTTOM\n  └────┘\n  (30 a fost eliminat)",
      "blocksVisual": [
        { "label": "TOP ↑", "groups": [[{ "val": 20, "sorted": true }]] },
        { "label": "BOT ↓", "groups": [[{ "val": 10 }]] }
      ]
    },
    {
      "line": 15,
      "text": "🔁 Recapitulare Stack: push() adaugă la vârf, pop() elimină din vârf, top() citește vârful. Totul la un singur capăt! Complexitate O(1) pentru toate operațiile.",
      "visual": "  push(x) → │ x  │ ← TOP\n            │ .. │\n  pop()   ← │ .. │\n            └────┘",
      "blocksVisual": [
        { "label": "push → TOP (O1)", "groups": [[{ "val": "push(x)", "active": true }]] },
        { "label": "               ", "groups": [[{ "val": "..." }]] },
        { "label": "pop  ← TOP (O1)", "groups": [[{ "val": "pop()" }]] }
      ]
    },
    {
      "line": 18,
      "text": "📬 COADA (Queue) — Principiu FIFO: First In, First Out. Ca o coadă la magazin: primul sosit, primul servit. Inițializăm o coadă goală.",
      "visual": "  FRONT → [        ] → BACK\n  Queue FIFO (goală)",
      "blocksVisual": [
        { "label": "Queue  FRONT → BACK", "groups": [[{ "val": "∅" }]] }
      ]
    },
    {
      "line": 19,
      "text": "q.push(100) — Adăugăm 100 la coadă. Primul element este simultan și FRONT (față) și BACK (spate). Va fi primul care iese.",
      "visual": "  FRONT → [ 100 ] → BACK\n            ↑↑↑\n         primul venit",
      "blocksVisual": [
        {
          "label": "Queue  FRONT → BACK",
          "groups": [[{ "val": 100, "active": true }]]
        }
      ]
    },
    {
      "line": 20,
      "text": "q.push(200) — Adăugăm 200 la SPATELE cozii. Elementul 100 rămâne la FRONT (va ieși primul). Coada crește spre dreapta.",
      "visual": "  FRONT → [ 100 | 200 ] → BACK\n             ↑              ↑\n           front           back (nou)",
      "blocksVisual": [
        {
          "label": "Queue  FRONT → BACK",
          "groups": [[{ "val": 100, "active": true }, { "val": 200 }]]
        }
      ]
    },
    {
      "line": 21,
      "text": "q.push(300) — Adăugăm 300 la spate. Coada: [100, 200, 300]. 100 este FRONT (iese primul), 300 este BACK (ultimul venit).",
      "visual": "  FRONT → [ 100 | 200 | 300 ] → BACK\n             ↑                    ↑\n          iese primul          intrat ultimul",
      "blocksVisual": [
        {
          "label": "Queue  FRONT → BACK",
          "groups": [[{ "val": 100, "active": true }, { "val": 200 }, { "val": 300 }]]
        }
      ]
    },
    {
      "line": 23,
      "text": "q.front() — Citim elementul din față FĂRĂ a-l elimina. Returnează 100 (primul intrat). Coada rămâne neschimbată.",
      "visual": "  FRONT → [ 100 | 200 | 300 ] → BACK\n             ↑\n          front() = 100  ✓",
      "blocksVisual": [
        {
          "label": "Queue  FRONT → BACK   front()=100",
          "groups": [[{ "val": 100, "sorted": true }, { "val": 200 }, { "val": 300 }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "q.pop() — Eliminăm elementul din FAȚĂ (FIFO: primul venit, primul plecat). Elementul 100 iese. Noul FRONT devine 200.",
      "visual": "  ╳ 100 ╳ → [ 200 | 300 ] → BACK\n  eliminat     ↑\n             front (nou) = 200",
      "blocksVisual": [
        {
          "label": "Queue  FRONT → BACK   (100 eliminat)",
          "groups": [[{ "val": 100, "hidden": true }, { "val": 200, "active": true }, { "val": 300 }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "Starea finală a cozii după pop(): [200, 300] cu 200 la FRONT. Urmează 200 să iasă la un nou q.pop(), iar 300 va fi ultimul.",
      "visual": "  FRONT → [ 200 | 300 ] → BACK\n  (100 a fost eliminat)",
      "blocksVisual": [
        {
          "label": "Queue  FRONT → BACK",
          "groups": [[{ "val": 200, "sorted": true }, { "val": 300 }]]
        }
      ]
    },
    {
      "line": 24,
      "text": "🔁 Recapitulare Queue: push() adaugă la BACK, pop() elimină din FRONT, front() citește FRONT-ul. Cele două operații sunt la capete OPUSE!",
      "visual": "  push(x) → FRONT → [ ... | x ] → BACK\n  pop()   ← FRONT → [ ... ]",
      "blocksVisual": [
        {
          "label": "pop ← FRONT  |  BACK → push",
          "groups": [[{ "val": "pop←" }, { "val": "..." }, { "val": "→push", "active": true }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "⚖️ Stack vs Queue: Ambele sunt structuri liniare O(1), dar diferă prin ORDINEA de eliminare: Stack elimină ultimul venit (LIFO), Queue elimină primul venit (FIFO).",
      "visual": "  STACK (LIFO)     QUEUE (FIFO)\n  ┌────┐           FRONT→[A|B|C]→BACK\n  │ C  │ ← in/out   pop←A   C→push\n  │ B  │\n  │ A  │ ← bottom",
      "blocksVisual": [
        { "label": "Stack LIFO  (in/out = TOP)", "groups": [[{ "val": "TOP", "active": true }, { "val": "..." }, { "val": "BOT" }]] },
        { "label": "Queue FIFO  (in=BACK out=FRONT)", "groups": [[{ "val": "FRONT", "sorted": true }, { "val": "..." }, { "val": "BACK", "active": true }]] }
      ]
    },
    {
      "line": 9,
      "text": "🎯 Aplicații reale: Stack → Call Stack în CPU, Undo/Redo în editoare, DFS în grafuri. Queue → BFS în grafuri, cozi de așteptare pe servere, print spooling.",
      "visual": "  Stack: [ func3 ]  Queue: [req1|req2|req3]\n         [ func2 ]         server procesează\n         [ func1 ]         în ordinea sosirii",
      "blocksVisual": [
        { "label": "Stack → DFS / Undo / Call Stack", "groups": [[{ "val": "func3", "active": true }, { "val": "func2" }, { "val": "func1" }]] },
        { "label": "Queue → BFS / Server / Printer ", "groups": [[{ "val": "req1", "sorted": true }, { "val": "req2" }, { "val": "req3" }]] }
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
  },
  "globalVars": [
  {
    "name": "CAPACITY",
    "type": "const int",
    "val": "1000",
    "expandable": false
  }
]
};
