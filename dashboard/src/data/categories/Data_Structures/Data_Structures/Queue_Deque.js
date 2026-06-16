export const data = {
  "presentation": "### Prezentare Generală\n\n**Coada (Queue)** și **Deque (Double-Ended Queue)** sunt două structuri de date liniare fundamentale utilizate pentru a stoca și gestiona elemente într-o anumită ordine:\n\n1. **Coada (Queue):** Funcționează după principiul **FIFO** (First In, First Out - Primul venit, primul plecat). Elementele sunt inserate prin spate (push) și extrase prin față (pop), la fel ca o coadă la magazin.\n2. **Deque (Double-Ended Queue):** Este o coadă cu două capete care permite inserarea și ștergerea elementelor la ambele extremități (față și spate) în timp constant. Ea combină utilitatea unei stive și a unei cozi.",
  "complexity": "### Complexitate\n\n- **Timp:** Toate operațiile elementare (`push`, `pop`, `push_front`, `push_back`, `pop_front`, `pop_back`, `front`, `back`) rulează în timp constant **O(1)**.\n- **Spațiu:** **O(N)** pentru stocarea a N elemente.\n",
  "variations": "### Variații și Edge Cases\n\n1. **Deque-ul Monoton:** O variație în care menținem elementele în ordine strict crescătoare sau descrescătoare. Folosit pentru a determina eficient valoarea minimă/maximă pe o fereastră glisantă (Sliding Window Minimum/Maximum) în timp total O(N).\n2. **Coadă Circulară:** O implementare pe un vector static unde capătul se conectează la început pentru a evita risipa de spațiu.",
  "applications": "### Aplicații\n\n- **Coada:** Parcurgerea în lățime a grafurilor (BFS - Breadth-First Search).\n- **Coada:** Algoritmul Lee (Flood Fill) pentru determinarea drumului minim în labirinturi.\n- **Deque:** Algoritmi avansați de ferestre glisante la concursuri de programare.\n- Gestionarea cozilor de printare sau a bufferelor de rețea.",
  code: `
#include <iostream>
#include <queue>
#include <deque>

using namespace std;

int main() {
    // Partea 1: Coada (Queue - FIFO)
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    q.push(40);
    
    int primul = q.front(); 
    q.pop(); 
    int al_doilea = q.front(); 
    q.pop(); 
    
    // Partea 2: Deque (Double-Ended Queue)
    deque<int> dq;
    dq.push_back(100);  
    dq.push_front(50);  
    dq.push_back(150);  
    dq.push_front(25);  
    
    int front_val = dq.front(); 
    int back_val = dq.back(); 
    
    dq.pop_front(); 
    dq.pop_back();  
    dq.pop_front(); 
    dq.pop_back();  
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 9,
      "text": "Inițializăm o coadă goală `q` de numere întregi.",
      "blocksVisual": [
        {
          "label": "Coada (q)",
          "groups": [
            [{ "val": "Coada e goală", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Adăugăm elementul 10 în coadă. Acesta este acum primul și singurul element.",
      "blocksVisual": [
        {
          "label": "Push 10",
          "groups": [
            [{ "val": "10", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm elementul 20 în coadă. Acesta se așază în spatele lui 10.",
      "blocksVisual": [
        {
          "label": "Push 20",
          "groups": [
            [{ "val": "10" }, { "val": "20", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adăugăm elementul 30 în coadă, plasându-se în spatele lui 20.",
      "blocksVisual": [
        {
          "label": "Push 30",
          "groups": [
            [{ "val": "10" }, { "val": "20" }, { "val": "30", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Adăugăm elementul 40 în coadă. Coada conține acum: 10 (față), 20, 30, 40 (spate).",
      "blocksVisual": [
        {
          "label": "Push 40",
          "groups": [
            [{ "val": "10" }, { "val": "20" }, { "val": "30" }, { "val": "40", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Citim elementul din față (front) al cozii. Valoarea citită este 10.",
      "blocksVisual": [
        {
          "label": "Front q",
          "groups": [
            [{ "val": "10 (Front)", "active": true }, { "val": "20" }, { "val": "30" }, { "val": "40" }],
            [{ "val": "primul = 10" }]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Eliminăm elementul din față folosind pop(). Elementul 10 este extras, iar 20 devine noul front.",
      "blocksVisual": [
        {
          "label": "Pop Front q",
          "groups": [
            [{ "val": "20 (Front)", "active": true }, { "val": "30" }, { "val": "40" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Citim noul front al cozii. Valoarea citită este 20.",
      "blocksVisual": [
        {
          "label": "Front q",
          "groups": [
            [{ "val": "20 (Front)", "active": true }, { "val": "30" }, { "val": "40" }],
            [{ "val": "al_doilea = 20" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm 20 din coadă. În coadă mai rămân elementele 30 și 40.",
      "blocksVisual": [
        {
          "label": "Pop Front q",
          "groups": [
            [{ "val": "30 (Front)" }, { "val": "40" }]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Partea 2: Inițializăm un deque `dq` (Double-Ended Queue) gol.",
      "blocksVisual": [
        {
          "label": "Deque (dq)",
          "groups": [
            [{ "val": "Deque e gol", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Adăugăm elementul 100 la spatele (back) deque-ului. dq = [100].",
      "blocksVisual": [
        {
          "label": "Push Back 100",
          "groups": [
            [{ "val": "100", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Adăugăm elementul 50 în fața (front) deque-ului. dq = [50, 100].",
      "blocksVisual": [
        {
          "label": "Push Front 50",
          "groups": [
            [{ "val": "50", "active": true }, { "val": "100" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adăugăm elementul 150 la spatele deque-ului. dq = [50, 100, 150].",
      "blocksVisual": [
        {
          "label": "Push Back 150",
          "groups": [
            [{ "val": "50" }, { "val": "100" }, { "val": "150", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Adăugăm elementul 25 în fața deque-ului. dq = [25, 50, 100, 150].",
      "blocksVisual": [
        {
          "label": "Push Front 25",
          "groups": [
            [{ "val": "25", "active": true }, { "val": "50" }, { "val": "100" }, { "val": "150" }]
          ]
        }
      ]
    },
    {
      "line": 27,
      "text": "Citim elementul din fața (front) deque-ului. Valoarea este 25.",
      "blocksVisual": [
        {
          "label": "Front Deque",
          "groups": [
            [{ "val": "25 (Front)", "active": true }, { "val": "50" }, { "val": "100" }, { "val": "150 (Back)" }],
            [{ "val": "front_val = 25" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Citim elementul din spate (back) deque-ului. Valoarea este 150.",
      "blocksVisual": [
        {
          "label": "Back Deque",
          "groups": [
            [{ "val": "25 (Front)" }, { "val": "50" }, { "val": "100" }, { "val": "150 (Back)", "active": true }],
            [{ "val": "back_val = 150" }]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Eliminăm elementul din față (pop_front()). Se șterge 25, dq = [50, 100, 150].",
      "blocksVisual": [
        {
          "label": "Pop Front dq",
          "groups": [
            [{ "val": "50 (Front)", "active": true }, { "val": "100" }, { "val": "150 (Back)" }]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Eliminăm elementul din spate (pop_back()). Se șterge 150, dq = [50, 100].",
      "blocksVisual": [
        {
          "label": "Pop Back dq",
          "groups": [
            [{ "val": "50 (Front)" }, { "val": "100 (Back)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Eliminăm iarăși din față (pop_front()). Se șterge 50, dq = [100].",
      "blocksVisual": [
        {
          "label": "Pop Front dq",
          "groups": [
            [{ "val": "100 (Front/Back)", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "Eliminăm ultimul element rămas în spate (pop_back()). Deque devine din nou gol.",
      "blocksVisual": [
        {
          "label": "Pop Back dq - Gol",
          "groups": [
            [{ "val": "Deque e gol", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 35,
      "text": "Programul se termină. Am ilustrat cu succes ordinea FIFO în coadă și flexibilitatea deque-ului.",
      "blocksVisual": [
        {
          "label": "Sfârșit program",
          "groups": [
            [{ "val": "Succes!", "sorted": true }]
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
  }
};
