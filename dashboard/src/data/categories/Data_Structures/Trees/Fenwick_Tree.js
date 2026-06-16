export const data = {
  "presentation": "### Prezentare Generală\n\nArborele Indexat Binar (AIB / Fenwick Tree) este o structură de date fascinantă prin simplitatea sa la nivel de cod și complexitatea ideii matematice din spate.\n\nOferă două funcționalități extrem de puternice pentru un vector, care altfel nu se pot face simultan rapid:\n1. Adunarea unei valori X la elementul i din vector (Point Update).\n2. Calculul sumei elementelor pe intervalul de prefix [1..i] (Prefix Sum Query).\n\nCum funcționează? Nu se folosește un arbore efectiv (cu pointeri parent/left/right), ci doar reprezentarea binară a indecșilor array-ului. Fiecare index din AIB conține suma unor elemente, responsabilitatea sa fiind calculată folosind 'cel mai nesemnificativ bit' (LSB = x & -x).",
  "complexity": "### Complexitate\n\n- **Timp:** Crearea din zero durează O(N) sau O(N log N). Interogarea și Actualizarea se desfășoară ambele în O(log N). Deoarece parcurgem biții setanți, operația este extrem de rapidă în viața reală comparativ cu Segment Trees.\n- **Spațiu:** O(N), un singur vector auxiliar stochează perfect arborele virtual, fără nicio pierdere (overhead).\n",
  "variations": "### Variații și Edge Cases\n\n1. Varianta Range Update - Point Query: Prin utilizarea tehnicii de Difference Array în spatele Fenwick Tree, putem aduna elemente pe [L, R] și interoga la un punct!\n2. Varianta 2D: Fenwick Tree pe matrice. Memoria este M x N, iar Query/Update este O(log N * log M).\n3. Range Update - Range Query: Cea mai avansată, necesită 2 AIB-uri paralele (pentru a simula ecuația liniară matematică a modificărilor).",
  "applications": "### Aplicații\n\nFenwick Tree este standardul absolut pentru rezolvarea Inversiunilor într-un array (Inversion Count). Folosit și la query-uri pe frecvențe dinamice (de exemplu calcularea medianei într-un flux de date curent).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

struct FenwickTree {
    vector<int> tree;
    int n;

    FenwickTree(int n) {
        this->n = n;
        tree.assign(n + 1, 0); // indexare de la 1
    }

    // Extrage ultimul bit de 1 (Least Significant Bit)
    int LSB(int x) {
        return x & (-x);
    }

    // Adauga o valoare delta la pozitia index
    void update(int index, int delta) {
        while (index <= n) {
            tree[index] += delta;
            index += LSB(index); // Urcam in arbore
        }
    }

    // Suma de la 1 la index
    int query(int index) {
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= LSB(index); // Coboram spre 0
        }
        return sum;
    }
    
    // Suma pe interval [L, R]
    int queryRange(int left, int right) {
        return query(right) - query(left - 1);
    }
};

int main() {
    FenwickTree aib(10);
    
    aib.update(3, 5); // Adauga 5 la pozitia 3
    aib.update(5, 2); // Adauga 2 la pozitia 5
    aib.update(6, 1); // Adauga 1 la pozitia 6
    
    cout << "Suma de pe [1, 6] = " << aib.query(6) << "
"; // Trebuie sa fie 8
    return 0;
}
`,
  "explanations": [
    {
      "line": 15,
      "text": "Structura Fenwick Tree (AIB): un simplu vector liniar 1-indexed. Indexul fiecărui element dictează responsabilitea lui.",
      "blocksVisual": [
        {
          "label": "Array AIB",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 49,
      "text": "Facem un Update(3, 5) pe un AIB gol. Inițial index=3. Adunăm 5 în tree[3].",
      "blocksVisual": [
        {
          "label": "Tree[3]",
          "groups": [
            [
              {
                "val": "tree[3] += 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Acum trebuie să transmitem modificarea superiorilor (numele mai mari care rețin intervale peste 3). LSB(3) = (011) & (101) = 1. index devine 3 + 1 = 4.",
      "blocksVisual": [
        {
          "label": "Calcul LSB",
          "groups": [
            [
              {
                "val": "index = 3+1 = 4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "tree[4] += 5. Mai departe: LSB(4) = 4. index devine 4 + 4 = 8.",
      "blocksVisual": [
        {
          "label": "Tree[4]",
          "groups": [
            [
              {
                "val": "tree[4] += 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "tree[8] += 5. LSB(8) = 8. index devine 16. Oprim, că depășim n=10.",
      "blocksVisual": [
        {
          "label": "Tree[8]",
          "groups": [
            [
              {
                "val": "tree[8] += 5",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 50,
      "text": "Facem Update(5, 2). tree[5] += 2. index -> 5 + 1 = 6.",
      "blocksVisual": [
        {
          "label": "Update(5, 2)",
          "groups": [
            [
              {
                "val": "tree[5] += 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "tree[6] += 2. index -> 6 + LSB(6) = 6 + 2 = 8.",
      "blocksVisual": [
        {
          "label": "Update Superior",
          "groups": [
            [
              {
                "val": "tree[6] += 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "tree[8] += 2. Oprim. Observăm cum 8 colectează sume de pe mai multe ramuri!",
      "blocksVisual": [
        {
          "label": "Tree[8] colectează",
          "groups": [
            [
              {
                "val": "tree[8] += 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 51,
      "text": "Facem Update(6, 1). tree[6] += 1. index -> 6 + 2 = 8. tree[8] += 1.",
      "blocksVisual": [
        {
          "label": "Update(6, 1)",
          "groups": [
            [
              {
                "val": "tree[6] += 1",
                "active": true
              }
            ],
            [
              {
                "val": "tree[8] += 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 53,
      "text": "Query(6). Aflăm suma [1..6]. Începem de la index 6. suma += tree[6]. În prezent tree[6] are 2(de la udp5) + 1(udp6) = 3.",
      "blocksVisual": [
        {
          "label": "Query",
          "groups": [
            [
              {
                "val": "Suma = 3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "Următorul pas la Query: index -= LSB(6). LSB(6) este 2. index devine 4.",
      "blocksVisual": [
        {
          "label": "Coborâre",
          "groups": [
            [
              {
                "val": "6 - 2 = 4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 33,
      "text": "suma += tree[4]. tree[4] conține 5 (de la udp3). Suma devine 3 + 5 = 8.",
      "blocksVisual": [
        {
          "label": "Query",
          "groups": [
            [
              {
                "val": "Suma = 8",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 34,
      "text": "index -= LSB(4). LSB(4)=4. index devine 0. Bucla s-a oprit. S-a realizat O(log N) magie!",
      "blocksVisual": [
        {
          "label": "Suma Finală",
          "groups": [
            [
              {
                "val": "8",
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
        "title": "AIB Infoarena",
        "url": "https://www.infoarena.ro/problema/aib",
        "desc": "Clasica din liceu"
      }
    ],
    "medium": [
      {
        "title": "Count of Smaller Numbers After Self",
        "url": "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
        "desc": "Numărare cu AIB"
      },
      {
        "title": "Inversion Count",
        "url": "https://www.spoj.com/problems/INVCNT/",
        "desc": "O altă rezolvare decât Merge Sort"
      }
    ],
    "hard": [
      {
        "title": "Range Sum Query 2D Mutable",
        "url": "https://leetcode.com/problems/range-sum-query-2d-mutable/",
        "desc": "Fenwick Tree 2D"
      }
    ]
  }
};
