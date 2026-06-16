export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmii Greedy construiesc o soluție pas cu pas, alegând mereu opțiunea care pare a fi cea mai bună în momentul curent (alegerea local optimă), în speranța că aceasta va conduce la soluția globală optimă.\n\nPentru ca un algoritm Greedy să funcționeze, problema trebuie să aibă două proprietăți:\n1. Proprietatea alegerii Greedy: Putem ajunge la soluția optimă prin alegeri locale.\n2. Substructură optimă: Soluția optimă a problemei conține soluțiile optime ale subproblemelor.",
  "complexity": "### Complexitate\n\n- **Timp:** Majoritatea algoritmilor Greedy necesită o sortare inițială a datelor, deci $O(N \\log N)$. Parcurgerea propriu-zisă e adesea $O(N)$.\n- **Spațiu:** $O(1)$ sau $O(N)$ în funcție de nevoia stocării rezultatului.\n",
  "variations": "### Variații și Edge Cases\n\n1. Interval Scheduling: Selectarea numărului maxim de activități care nu se suprapun.\n2. Huffman Coding: Crearea de arbori de compresie optimi.\n3. Fractional Knapsack: Spre deosebire de 0/1 Knapsack (unde e nevoie de DP), varianta fracționară se rezolvă optim cu Greedy.",
  "applications": "### Aplicații\n\nGreedy este des folosit în rutare (Dijkstra), generarea arborilor de acoperire minimă (Kruskal, Prim), compresia datelor și planificarea activităților (Scheduling).",
  code: `
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Activity {
    int start, finish;
};

// Sortam activitatile dupa timpul de terminare (crescator)
bool cmp(Activity s1, Activity s2) {
    return (s1.finish < s2.finish);
}

void printMaxActivities(vector<Activity>& arr) {
    sort(arr.begin(), arr.end(), cmp);

    cout << "Activitati selectate: ";
    int i = 0;
    cout << "(" << arr[i].start << ", " << arr[i].finish << "), ";

    for (int j = 1; j < arr.size(); j++) {
        // Daca activitatea j incepe dupa ce s-a terminat i
        if (arr[j].start >= arr[i].finish) {
            cout << "(" << arr[j].start << ", " << arr[j].finish << "), ";
            i = j;
        }
    }
}
`,
  "explanations": [
    {
      "line": 16,
      "text": "Avem un vector de activități (Start, Finish).",
      "blocksVisual": [
        {
          "label": "Input",
          "groups": [
            [
              {
                "val": "A1: (1, 4)"
              },
              {
                "val": "A2: (3, 5)"
              },
              {
                "val": "A3: (0, 6)"
              },
              {
                "val": "A4: (5, 7)"
              },
              {
                "val": "A5: (8, 9)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Sortăm activitățile crescător după timpul de TERMINARE.",
      "blocksVisual": [
        {
          "label": "Sortare dupa Finish",
          "groups": [
            [
              {
                "val": "(1, 4)",
                "active": true
              },
              {
                "val": "(3, 5)"
              },
              {
                "val": "(0, 6)"
              },
              {
                "val": "(5, 7)"
              },
              {
                "val": "(8, 9)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Alegem mereu prima activitate (cea care se termină cel mai devreme), lăsând astfel cel mai mult timp pentru restul.",
      "blocksVisual": [
        {
          "label": "Selecție #1",
          "groups": [
            [
              {
                "val": "(1, 4)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Parcurgem restul activităților.",
      "blocksVisual": [
        {
          "label": "Iterare",
          "groups": [
            [
              {
                "val": "(3, 5)",
                "active": true
              },
              {
                "val": "(0, 6)"
              },
              {
                "val": "(5, 7)"
              },
              {
                "val": "(8, 9)"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "(3, 5) începe la 3, dar activitatea curentă s-a terminat la 4. Suprapunere! O ignorăm.",
      "blocksVisual": [
        {
          "label": "Respins",
          "groups": [
            [
              {
                "val": "(3, 5) X",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "(0, 6) începe la 0, s-a terminat la 4. Suprapunere! Ignorăm.",
      "blocksVisual": [
        {
          "label": "Respins",
          "groups": [
            [
              {
                "val": "(0, 6) X",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "(5, 7) începe la 5 >= 4. E compatibilă! O selectăm și actualizăm timpul curent de terminare la 7.",
      "blocksVisual": [
        {
          "label": "Selecție #2",
          "groups": [
            [
              {
                "val": "(5, 7)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "(8, 9) începe la 8 >= 7. E compatibilă! O selectăm.",
      "blocksVisual": [
        {
          "label": "Selecție #3",
          "groups": [
            [
              {
                "val": "(8, 9)",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Am găsit numărul maxim de activități: 3.",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "(1, 4)"
              },
              {
                "val": "(5, 7)"
              },
              {
                "val": "(8, 9)"
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
        "title": "Spectacole",
        "url": "https://www.pbinfo.ro/probleme/344/spectacole",
        "desc": "Problema planificarii clasice"
      }
    ],
    "medium": [
      {
        "title": "Jump Game",
        "url": "https://leetcode.com/problems/jump-game/",
        "desc": "Aflare distanta maxima Greedy"
      }
    ],
    "hard": [
      {
        "title": "Minimum Number of Refueling Stops",
        "url": "https://leetcode.com/problems/minimum-number-of-refueling-stops/",
        "desc": "Greedy combinat cu Heap-uri"
      }
    ]
  }
};
