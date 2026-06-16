export const data = {
  "presentation": "### Prezentare Generală\n\nO **coadă cu priorități (Priority Queue)** este o structură de date avansată care administrează o colecție de elemente astfel încât elementul cu cea mai mare prioritate (implicit valoarea maximă) este întotdeauna în vârful structurii și poate fi accesat rapid.\n\nSpre deosebire de o coadă standard FIFO unde elementele ies în ordinea sosirii lor, în coada cu priorități elementele sunt ordonate după valoarea lor. Intern, ea este implementată sub forma unui **Heap (grămadă)**, un arbore binar aproape complet în care fiecare părinte are o valoare mai mare sau egală cu cea a fiilor săi (pentru Max-Heap).",
  "complexity": "### Complexitate\n\n- **Timp:** \n  - Inserare (`push`): **O(log N)** (elementul urcă/cerne în sus în Heap).\n  - Ștergere maxim/minim (`pop`): **O(log N)** (rădăcina este înlocuită și elementul de test cerne în jos).\n  - Vizualizare vârf (`top`): **O(1)** (rădăcina este direct accesibilă).\n- **Spațiu:** **O(N)** pentru stocarea celor N elemente.\n",
  "variations": "### Variații și Edge Cases\n\n1. **Min-Heap:** În C++, pentru a reține elementul minim în vârf, se declară astfel: \n   `priority_queue<int, vector<int>, greater<int>> pq;`\n2. **Comparatori custom:** Pentru structuri personalizate (ex. puncte 2D sau muchii de graf), putem supraîncărca operatorul `<` sau defini o structură de comparare personalizată, esențială în algoritmi pe grafuri.",
  "applications": "### Aplicații\n\n- **Algoritmul lui Dijkstra** pentru drumuri minime în grafuri ponderate (extragerea nodului cel mai apropiat nevizitat).\n- **Algoritmul lui Prim** pentru determinarea arborelui parțial de cost minim (MST).\n- **Codificarea Huffman** în algoritmii de compresie a datelor.\n- Algoritmul de îmbinare eficientă a K liste sortate (K-way merge).",
  code: `
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

int main() {
    // 1. Max-Heap implicit
    priority_queue<int> max_pq;
    max_pq.push(10);
    max_pq.push(30);
    max_pq.push(20);
    max_pq.push(40);
    
    int max1 = max_pq.top(); // 40
    max_pq.pop(); // noul top = 30
    int max2 = max_pq.top(); // 30
    max_pq.pop(); // noul top = 20
    
    // 2. Min-Heap 
    priority_queue<int, vector<int>, greater<int>> min_pq;
    min_pq.push(40);
    min_pq.push(10);
    min_pq.push(30);
    min_pq.push(20);
    
    int min1 = min_pq.top(); // 10
    min_pq.pop(); // noul top = 20
    int min2 = min_pq.top(); // 20
    min_pq.pop(); // noul top = 30
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 9,
      "text": "Inițializăm o coadă cu priorități de tip Max-Heap `max_pq` în mod implicit.",
      "blocksVisual": [
        {
          "label": "Max-Heap Goadă",
          "groups": [
            [{ "val": "Vârf (Max)", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Adăugăm elementul 10 în Max-Heap. max_pq = [10].",
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
      "text": "Adăugăm elementul 30. Întrucât 30 > 10, structura de Heap îl mută automat în vârf. max_pq = [30, 10].",
      "blocksVisual": [
        {
          "label": "Push 30 (Bubbling Up)",
          "groups": [
            [{ "val": "30 (Vârf)", "active": true }],
            [{ "val": "10" }]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Adăugăm elementul 20. 20 este mai mic decât rădăcina 30, deci rămâne la nivelul inferior. max_pq = [30, 10, 20].",
      "blocksVisual": [
        {
          "label": "Push 20",
          "groups": [
            [{ "val": "30 (Vârf)" }],
            [{ "val": "10" }, { "val": "20", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Adăugăm elementul 40. Fiind mai mare decât toți, 40 urcă direct în vârf (rădăcină). max_pq = [40, 30, 20, 10].",
      "blocksVisual": [
        {
          "label": "Push 40 (Noul Vârf)",
          "groups": [
            [{ "val": "40 (Vârf)", "active": true }],
            [{ "val": "30" }, { "val": "20" }],
            [{ "val": "10" }]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Accesăm top-ul heap-ului: max_pq.top(). Valoarea este elementul maxim, 40.",
      "blocksVisual": [
        {
          "label": "Top Max-Heap",
          "groups": [
            [{ "val": "40 (Vârf)", "active": true }],
            [{ "val": "30" }, { "val": "20" }],
            [{ "val": "10" }],
            [{ "val": "max1 = 40" }]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Eliminăm rădăcina prin pop(). Structura de heap se re-echilibrează, iar 30 devine noul vârf.",
      "blocksVisual": [
        {
          "label": "Pop Max-Heap",
          "groups": [
            [{ "val": "30 (Vârf)", "active": true }],
            [{ "val": "10" }, { "val": "20" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Accesăm din nou top-ul. Valoarea curentă este 30.",
      "blocksVisual": [
        {
          "label": "Top Max-Heap",
          "groups": [
            [{ "val": "30 (Vârf)", "active": true }],
            [{ "val": "10" }, { "val": "20" }],
            [{ "val": "max2 = 30" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm și elementul 30. Noul vârf devine 20. În heap rămân [20, 10].",
      "blocksVisual": [
        {
          "label": "Pop Max-Heap",
          "groups": [
            [{ "val": "20 (Vârf)", "active": true }],
            [{ "val": "10" }]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Partea 2: Inițializăm un Min-Heap `min_pq` folosind parametrul `greater<int>`.",
      "blocksVisual": [
        {
          "label": "Min-Heap Goadă",
          "groups": [
            [{ "val": "Vârf (Min)", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Adăugăm 40 în Min-Heap. min_pq = [40].",
      "blocksVisual": [
        {
          "label": "Push 40",
          "groups": [
            [{ "val": "40", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Adăugăm 10. În Min-Heap, valoarea mai mică are prioritate, deci 10 urcă în vârf. min_pq = [10, 40].",
      "blocksVisual": [
        {
          "label": "Push 10 (Urcare)",
          "groups": [
            [{ "val": "10 (Vârf)", "active": true }],
            [{ "val": "40" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Adăugăm 30. 30 e mai mare decât 10, dar mai mic ca 40. min_pq = [10, 40, 30].",
      "blocksVisual": [
        {
          "label": "Push 30",
          "groups": [
            [{ "val": "10 (Vârf)" }],
            [{ "val": "40" }, { "val": "30", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Adăugăm 20. min_pq = [10, 20, 30, 40]. 10 rămâne în vârf deoarece este valoarea minimă.",
      "blocksVisual": [
        {
          "label": "Push 20",
          "groups": [
            [{ "val": "10 (Vârf)" }],
            [{ "val": "20", "active": true }, { "val": "30" }],
            [{ "val": "40" }]
          ]
        }
      ]
    },
    {
      "line": 27,
      "text": "Accesăm top-ul Min-Heap-ului. Valoarea returnată este elementul minim, adică 10.",
      "blocksVisual": [
        {
          "label": "Top Min-Heap",
          "groups": [
            [{ "val": "10 (Vârf)", "active": true }],
            [{ "val": "20" }, { "val": "30" }],
            [{ "val": "40" }],
            [{ "val": "min1 = 10" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Ștergem vârful cu pop(). Structura se reorganizează, punând 20 în vârf.",
      "blocksVisual": [
        {
          "label": "Pop Min-Heap",
          "groups": [
            [{ "val": "20 (Vârf)", "active": true }],
            [{ "val": "40" }, { "val": "30" }]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Accesăm top-ul curent. Valoarea citită este 20.",
      "blocksVisual": [
        {
          "label": "Top Min-Heap",
          "groups": [
            [{ "val": "20 (Vârf)", "active": true }],
            [{ "val": "40" }, { "val": "30" }],
            [{ "val": "min2 = 20" }]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Ștergem și elementul 20. Vârful devine 30. Rămân [30, 40] în heap.",
      "blocksVisual": [
        {
          "label": "Pop Min-Heap",
          "groups": [
            [{ "val": "30 (Vârf)", "active": true }],
            [{ "val": "40" }]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Programul se încheie. Am demonstrat cum Max-Heap oferă acces la elementul maxim, iar Min-Heap la elementul minim.",
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
  }
};
