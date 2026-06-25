export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmii Greedy construiesc o soluție pas cu pas, alegând mereu opțiunea care pare a fi cea mai bună în momentul curent (alegerea local optimă), în speranța că aceasta va conduce la soluția globală optimă.\n\nPentru ca un algoritm Greedy să funcționeze, problema trebuie să aibă două proprietăți:\n1. Proprietatea alegerii Greedy: Putem ajunge la soluția optimă prin alegeri locale.\n2. Substructură optimă: Soluția optimă a problemei conține soluțiile optime ale subproblemelor.",
  "complexity": "### Complexitate\n\n- **Timp:** Majoritatea algoritmilor Greedy necesită o sortare inițială a datelor, deci $O(N \\log N)$. Parcurgerea propriu-zisă e adesea $O(N)$.\n- **Spațiu:** $O(1)$ sau $O(N)$ în funcție de nevoia stocării rezultatului.\n",
  "variations": "### Variații și Edge Cases\n\n1. Interval Scheduling: Selectarea numărului maxim de activități care nu se suprapun.\n2. Huffman Coding: Crearea de arbori de compresie optimi.\n3. Fractional Knapsack: Spre deosebire de 0/1 Knapsack (unde e nevoie de DP), varianta fracționară se rezolvă optim cu Greedy.",
  "applications": "### Aplicații\n\nGreedy este des folosit în rutare (Dijkstra), generarea arborilor de acoperire minimă (Kruskal, Prim), compresia datelor și planificarea activităților (Scheduling).",
  code: `#include <iostream>
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

int main() {
    vector<Activity> arr = {{3, 5}, {0, 6}, {1, 4}, {8, 9}, {5, 7}};
    printMaxActivities(arr);
    return 0;
}
`,
  "explanations": [
    {
      "line": 17,
      "text": "Apelăm printMaxActivities. Avem 5 activități nesortate: (3,5), (0,6), (1,4), (8,9), (5,7). Pe axa timpului, fiecare activitate ocupă un interval [start, finish].",
      "blocksVisual": [
        { "label": "Vector Inițial (nesortat)", "groups": [[{"val": "(3,5)"}, {"val": "(0,6)"}, {"val": "(1,4)"}, {"val": "(8,9)"}, {"val": "(5,7)"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "A0", "x": 70, "y": 15, "label": "A0(3,5)"},
          {"id": "A1", "x": 10, "y": 43, "label": "A1(0,6)"},
          {"id": "A2", "x": 30, "y": 71, "label": "A2(1,4)"},
          {"id": "A3", "x": 170, "y": 99, "label": "A3(8,9)"},
          {"id": "A4", "x": 110, "y": 127, "label": "A4(5,7)"}
        ],
        "edges": []
      }
    },
    {
      "line": 17,
      "text": "Sortăm activitățile după finish time (crescător) folosind cmp. Aceasta este cheia algoritmului Greedy: activitățile cu finish mai mic lasă mai mult timp liber pentru altele.",
      "blocksVisual": [
        { "label": "Sortare după finish time ↑", "groups": [[{"val": "cmp: finish asc", "active": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "A0", "x": 70, "y": 15, "label": "A0(3,5)"},
          {"id": "A1", "x": 10, "y": 43, "label": "A1(0,6)"},
          {"id": "A2", "x": 30, "y": 71, "label": "A2(1,4)"},
          {"id": "A3", "x": 170, "y": 99, "label": "A3(8,9)"},
          {"id": "A4", "x": 110, "y": 127, "label": "A4(5,7)"}
        ],
        "edges": []
      }
    },
    {
      "line": 17,
      "text": "Rezultatul sortării: Activity 0→(1,4), Activity 1→(3,5), Activity 2→(0,6), Activity 3→(5,7), Activity 4→(8,9). Pe timeline (x=start*20+10, y=index*28+15), activitățile sunt ordonate după finish.",
      "blocksVisual": [
        { "label": "Vector Sortat (după finish)", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "sorted": true}, {"val": "(0,6)", "sorted": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "sorted": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:(3,5)"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 20,
      "text": "Inițializăm i = 0. Prima activitate (1,4) este întotdeauna selectată — are cel mai mic finish time, deci lasă maximul de timp disponibil.",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "active": true}, {"val": "(3,5)"}, {"val": "(0,6)"}, {"val": "(5,7)"}, {"val": "(8,9)"}]] },
        { "label": "i = 0 (ultimul selectat)", "groups": [[{"val": "↑ i=0"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "active"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:(3,5)"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 21,
      "text": "Selectăm Activity 0 (1,4) — prima activitate este mereu inclusă. Marcăm ca SELECTATĂ (verde). Setăm i = 0.",
      "blocksVisual": [
        { "label": "Selectate", "groups": [[{"val": "(1,4)", "sorted": true}]] },
        { "label": "Rămase", "groups": [[{"val": "(3,5)"}, {"val": "(0,6)"}, {"val": "(5,7)"}, {"val": "(8,9)"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:(3,5)"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 23,
      "text": "Intrăm în bucla for cu j = 1. Evaluăm Activity 1: (3,5). Comparăm: arr[j].start=3 >= arr[i].finish=4?",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "active": true}, {"val": "(0,6)"}, {"val": "(5,7)"}, {"val": "(8,9)"}]] },
        { "label": "Verificare j=1", "groups": [[{"val": "3 >= 4 ?"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:(3,5)", "state": "active"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 25,
      "text": "Condiția 3 >= 4 este FALSĂ. Activity 1 (3,5) se suprapune cu Activity 0 (1,4) — 3 < 4 (Activity 1 începe înainte ca Activity 0 să se termine). O ignorăm.",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)"}, {"val": "(5,7)"}, {"val": "(8,9)"}]] },
        { "label": "Rezultat", "groups": [[{"val": "3 >= 4 → FALS, IGNORAT", "hidden": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 23,
      "text": "Avansăm j = 2. Evaluăm Activity 2: (0,6). Comparăm: arr[j].start=0 >= arr[i].finish=4 (unde i=0, finish=4)?",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "active": true}, {"val": "(5,7)"}, {"val": "(8,9)"}]] },
        { "label": "Verificare j=2", "groups": [[{"val": "0 >= 4 ?"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:(0,6)", "state": "active"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 25,
      "text": "Condiția 0 >= 4 este FALSĂ. Activity 2 (0,6) se suprapune masiv cu (1,4) — chiar începe la 0, mult înainte de finish=4. O ignorăm.",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}, {"val": "(5,7)"}, {"val": "(8,9)"}]] },
        { "label": "Rezultat", "groups": [[{"val": "0 >= 4 → FALS, IGNORAT", "hidden": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 23,
      "text": "Avansăm j = 3. Evaluăm Activity 3: (5,7). Comparăm: arr[j].start=5 >= arr[i].finish=4 (finish al activității i=0)?",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}, {"val": "(5,7)", "active": true}, {"val": "(8,9)"}]] },
        { "label": "Verificare j=3", "groups": [[{"val": "5 >= 4 ?"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "active"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": []
      }
    },
    {
      "line": 25,
      "text": "Condiția 5 >= 4 este ADEVĂRATĂ! Activity 3 (5,7) începe la 5, exact după ce Activity 0 s-a terminat la 4. Nu există suprapunere!",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)"}]] },
        { "label": "Rezultat", "groups": [[{"val": "5 >= 4 → ADEVĂRAT", "sorted": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": [
          {"source": "0", "target": "3", "active": true}
        ]
      }
    },
    {
      "line": 26,
      "text": "Selectăm Activity 3 (5,7)! O tipărim. Acum avem 2 activități selectate: (1,4) și (5,7).",
      "blocksVisual": [
        { "label": "Selectate până acum", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(5,7)", "sorted": true}]] },
        { "label": "Rămase de verificat", "groups": [[{"val": "(8,9)"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": [
          {"source": "0", "target": "3", "active": true}
        ]
      }
    },
    {
      "line": 27,
      "text": "Actualizăm i = j = 3. De acum, referința pentru ultima activitate selectată este Activity 3 cu finish=7.",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}, {"val": "(5,7)", "active": true}, {"val": "(8,9)"}]] },
        { "label": "i = 3 (finish=7)", "groups": [[{"val": "i=3, finish=7"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "active"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)"}
        ],
        "edges": [
          {"source": "0", "target": "3"}
        ]
      }
    },
    {
      "line": 23,
      "text": "Avansăm j = 4. Evaluăm ultima activitate, Activity 4: (8,9). Comparăm: arr[j].start=8 >= arr[i].finish=7 (finish al activității i=3)?",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "active": true}]] },
        { "label": "Verificare j=4", "groups": [[{"val": "8 >= 7 ?"}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)", "state": "active"}
        ],
        "edges": [
          {"source": "0", "target": "3"}
        ]
      }
    },
    {
      "line": 25,
      "text": "Condiția 8 >= 7 este ADEVĂRATĂ! Activity 4 (8,9) începe la 8, după finalizarea Activity 3 la 7. Compatibile!",
      "blocksVisual": [
        { "label": "Vector Sortat", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "sorted": true}]] },
        { "label": "Rezultat", "groups": [[{"val": "8 >= 7 → ADEVĂRAT", "sorted": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)", "state": "visited"}
        ],
        "edges": [
          {"source": "0", "target": "3"},
          {"source": "3", "target": "4", "active": true}
        ]
      }
    },
    {
      "line": 26,
      "text": "Selectăm Activity 4 (8,9)! Acum avem 3 activități selectate: (1,4), (5,7), (8,9). Actualizăm i = 4.",
      "blocksVisual": [
        { "label": "Selectate", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "sorted": true}]] },
        { "label": "Respinse", "groups": [[{"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)", "state": "visited"}
        ],
        "edges": [
          {"source": "0", "target": "3"},
          {"source": "3", "target": "4"}
        ]
      }
    },
    {
      "line": 23,
      "text": "Incrementăm j = 5. Condiția j < arr.size() (5 < 5) este FALSĂ. Ieșim din buclă. Algoritmul s-a terminat.",
      "blocksVisual": [
        { "label": "Bucla for", "groups": [[{"val": "j=5 >= size=5 → STOP"}]] },
        { "label": "Selectate", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "sorted": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "0:(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "1:REJECT"},
          {"id": "2", "x": 10,  "y": 71,  "label": "2:REJECT"},
          {"id": "3", "x": 110, "y": 99,  "label": "3:(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "4:(8,9)", "state": "visited"}
        ],
        "edges": [
          {"source": "0", "target": "3"},
          {"source": "3", "target": "4"}
        ]
      }
    },
    {
      "line": 30,
      "text": "De ce este această soluție optimă? Oricare altă combinație de activități non-suprapuse dă cel mult 3 activități. Alegerea Greedy (finish-time minim) garantează optimalul.",
      "blocksVisual": [
        { "label": "Soluție Optimă (3 activități)", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "sorted": true}]] },
        { "label": "Respinse (2 activități)", "groups": [[{"val": "(3,5)", "hidden": true}, {"val": "(0,6)", "hidden": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "✓(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "✗(3,5)"},
          {"id": "2", "x": 10,  "y": 71,  "label": "✗(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "✓(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "✓(8,9)", "state": "visited"}
        ],
        "edges": [
          {"source": "0", "target": "3", "active": true},
          {"source": "3", "target": "4", "active": true}
        ]
      }
    },
    {
      "line": 30,
      "text": "Concluzie: Am selectat 3 activități compatibile folosind strategia Greedy: la fiecare pas alegem activitatea validă cu cel mai mic timp de terminare, maximizând numărul total de activități selectate.",
      "blocksVisual": [
        { "label": "Rezultat Final", "groups": [[{"val": "(1,4)", "sorted": true}, {"val": "(5,7)", "sorted": true}, {"val": "(8,9)", "sorted": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "✓(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "✗(3,5)"},
          {"id": "2", "x": 10,  "y": 71,  "label": "✗(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "✓(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "✓(8,9)", "state": "visited"}
        ],
        "edges": [
          {"source": "0", "target": "3", "active": true},
          {"source": "3", "target": "4", "active": true}
        ]
      }
    },
    {
      "line": 30,
      "text": "Recapitulare complexitate: Sortarea ia O(N log N), parcurgerea bucla for ia O(N). Complexitate totală: O(N log N). Spațiu suplimentar: O(1) (in-place).",
      "blocksVisual": [
        { "label": "Timp: O(N log N) pentru sort", "groups": [[{"val": "sort O(N log N)", "active": true}]] },
        { "label": "Timp: O(N) pentru parcurgere", "groups": [[{"val": "for O(N)", "sorted": true}]] }
      ],
      "graphVisual": {
        "nodes": [
          {"id": "0", "x": 30,  "y": 15,  "label": "✓(1,4)", "state": "visited"},
          {"id": "1", "x": 70,  "y": 43,  "label": "✗(3,5)"},
          {"id": "2", "x": 10,  "y": 71,  "label": "✗(0,6)"},
          {"id": "3", "x": 110, "y": 99,  "label": "✓(5,7)", "state": "visited"},
          {"id": "4", "x": 170, "y": 127, "label": "✓(8,9)", "state": "visited"}
        ],
        "edges": [
          {"source": "0", "target": "3"},
          {"source": "3", "target": "4"}
        ]
      }
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
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const stepData = [
        { i: -1, j: -1, sorted: false }, // 0
        { i: -1, j: -1, sorted: false }, // 1
        { i: -1, j: -1, sorted: true },  // 2
        { i: 0,  j: -1, sorted: true },  // 3
        { i: 0,  j: -1, sorted: true },  // 4
        { i: 0,  j: 1,  sorted: true },  // 5
        { i: 0,  j: 1,  sorted: true },  // 6
        { i: 0,  j: 2,  sorted: true },  // 7
        { i: 0,  j: 2,  sorted: true },  // 8
        { i: 0,  j: 3,  sorted: true },  // 9
        { i: 0,  j: 3,  sorted: true },  // 10
        { i: 0,  j: 3,  sorted: true },  // 11
        { i: 3,  j: 3,  sorted: true },  // 12
        { i: 3,  j: 4,  sorted: true },  // 13
        { i: 3,  j: 4,  sorted: true },  // 14
        { i: 4,  j: 4,  sorted: true },  // 15
        { i: 4,  j: 5,  sorted: true },  // 16
        { i: 4,  j: 5,  sorted: true },  // 17
        { i: 4,  j: 5,  sorted: true },  // 18
        { i: 4,  j: 5,  sorted: true }   // 19
      ];

      const curr = stepData[stepIndex] || stepData[stepData.length - 1];

      if (stepIndex >= 0 && stepIndex <= 16) {
        frames.push({ name: "printMaxActivities(vector<Activity>& arr)", file: "solution.cpp", line: activeLine });
      }
      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 16) ? 40 : 41 });

      const actNames = curr.sorted ? 
        ["{start=1, finish=4}", "{start=3, finish=5}", "{start=0, finish=6}", "{start=5, finish=7}", "{start=8, finish=9}"] : 
        ["{start=3, finish=5}", "{start=0, finish=6}", "{start=1, finish=4}", "{start=8, finish=9}", "{start=5, finish=7}"];

      vars.push({ name: "arr", type: "std::vector<Activity>&", val: "size = 5", expandable: true });

      if (curr.i !== -1) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
        vars.push({ name: "arr[i]", type: "Activity", val: actNames[curr.i], expandable: false });
      }
      if (curr.j !== -1 && curr.j < 5) {
        vars.push({ name: "j", type: "int", val: curr.j.toString(), expandable: false });
        vars.push({ name: "arr[j]", type: "Activity", val: actNames[curr.j], expandable: false });
      }

      inlineVal = "";
      if (curr.i !== -1) inlineVal += "i: " + curr.i;
      if (curr.j !== -1 && curr.j < 5) inlineVal += ", j: " + curr.j;

      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      if (stepIndex <= 16) {
        let i = -1, j = -1;
        if (stepIndex >= 3) i = (stepIndex >= 12) ? (stepIndex >= 15 ? 4 : 3) : 0;
        if (stepIndex >= 5) {
          if (stepIndex <= 6) j = 1;
          else if (stepIndex <= 8) j = 2;
          else if (stepIndex <= 12) j = 3;
          else if (stepIndex <= 15) j = 4;
          else j = 5;
        }

        if (lineNum === 20 || lineNum === 21 || lineNum === 27) {
          return i !== -1 ? "i: " + i : null;
        }
        if (lineNum === 23 || lineNum === 25 || lineNum === 26) {
          let res = "";
          if (i !== -1) res += "i: " + i;
          if (j !== -1 && j < 5) res += ", j: " + j;
          return res || null;
        }
      }
      return null;
    }
  }
};
