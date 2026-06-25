export const data = {
  presentation: "### Determinarea Elementului Majoritar\n\nUn element dintr-un vector de dimensiune $N$ se numește **element majoritar** dacă apare de cel puțin $\\lfloor N/2 \\rfloor + 1$ ori (strict mai mult de jumătate din dimensiunea vectorului).\n\nCea mai eficientă metodă de determinare este **Algoritmul de Vot Boyer-Moore** (*Boyer-Moore Majority Vote Algorithm*). Acesta identifică un candidat pentru elementul majoritar într-o singură parcurgere, folosind timp $O(N)$ și spațiu $O(1)$. \n\nPrincipiul algoritmului se bazează pe anularea reciprocă a elementelor diferite: dacă asociem fiecărui element egal cu candidatul un vot $+1$ și fiecărui element diferit un vot $-1$, suma voturilor pentru elementul majoritar va rămâne strict pozitivă la final.",
  complexity: "### Complexitate\n\n- **Timp:** $O(N)$ - se realizează maximum două parcurgeri liniare ale vectorului (una pentru determinarea candidatului și una opțională pentru validarea acestuia).\n- **Spațiu:** $O(1)$ - algoritmul folosește doar două variabile auxiliare (`candidate` și `count`).",
  variations: "### Variații și Cazuri Particulare\n\n- **Inexistența elementului majoritar**: Algoritmul Boyer-Moore găsește întotdeauna un candidat, chiar dacă în vector nu există un element majoritar (de exemplu în vectorul $\\{1, 2, 3\\}$). Din acest motiv, **validarea** candidatului printr-o a doua parcurgere este obligatorie.\n- **Generalizarea pentru $\\lfloor N/k \\rfloor$**: Găsirea tuturor elementelor care apar de mai mult de $\\lfloor N/k \\rfloor$ ori. Necesită menținerea a maximum $k-1$ candidați și a contoarelor asociate (de exemplu, algoritmul pentru $N/3$ majoritate).",
  applications: "### Aplicații Reale\n\n- Sisteme tolerante la erori (Fault-tolerant systems) unde se decide rezultatul corect prin votul majorității nodurilor.\n- Detectarea atacurilor cibernetice sau a anomaliilor de rețea prin identificarea tiparelor repetitive dominante în loguri.\n- Sisteme de procesare a fluxurilor de date mari (data streams) unde memoria este extrem de limitată.",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> arr = {2, 2, 1, 1, 2};
    int candidate = -1;
    int count = 0;
    
    for (int x : arr) {
        if (count == 0) {
            candidate = x;
            count = 1;
        } else if (x == candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    int actual_count = 0;
    for (int x : arr) {
        if (x == candidate) {
            actual_count++;
        }
    }
    
    bool is_majority = (actual_count > arr.size() / 2);
    return 0;
}
`,
  explanations: [
  {
    "line": 7,
    "text": "Definim și inițializăm vectorul de intrare arr = {2, 2, 1, 1, 2} cu dimensiunea 5.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = -1",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Inițializăm variabila candidate cu -1. Aceasta va stoca elementul care este candidatul curent la majoritate.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = -1",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Inițializăm contorul de voturi count cu 0.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = -1",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Începem prima parcurgere a vectorului (algoritmul Boyer-Moore) pentru a identifica un candidat viabil.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = -1",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Extragem primul element din vector: x = arr[0] = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = -1",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Verificăm dacă contorul count este 0. Deoarece count = 0, condiția este adevărată. Aceasta înseamnă că nu avem un candidat activ în acest moment.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = -1",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Deoarece nu aveam un candidat activ (count = 0), stabilim elementul curent ca fiind noul candidat: candidate = x = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Setăm valoarea contorului count la 1, însemnând că noul candidat are un prim vot favorabil.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Trecem la următorul element din vector: x = arr[1] = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Verificăm dacă count este 0. Deoarece count = 1, condiția este falsă, deci continuăm cu verificarea egalității.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Verificăm dacă elementul curent x este egal cu candidatul nostru. Deoarece x = 2 și candidate = 2, condiția x == candidate este adevărată.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "Deoarece elementul curent coincide cu candidatul, incrementăm contorul de voturi: count devine 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 2",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Trecem la următorul element din vector: x = arr[2] = 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 2",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Verificăm dacă count este 0. Deoarece count = 2, condiția este falsă.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 2",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Verificăm dacă elementul curent x este egal cu candidatul. Deoarece x = 1 și candidate = 2, condiția x == candidate este falsă.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 2",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Deoarece elementul curent (1) diferă de candidat (2), contorul își pierde un vot: count se decrementează și devine 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Trecem la următorul element din vector: x = arr[3] = 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Verificăm dacă contorul count este 0. Deoarece count = 1, condiția este falsă.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Verificăm dacă elementul curent x este egal cu candidatul. Deoarece x = 1 și candidate = 2, condiția x == candidate este falsă.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Deoarece elementul curent (1) diferă de candidat (2), contorul scade: count se decrementează și devine 0.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 11,
    "text": "Trecem la ultimul element din vector: x = arr[4] = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "Verificăm dacă count este 0. Deoarece count = 0 (candidatul anterior și-a pierdut toate voturile), condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "Stabilim elementul curent ca noul candidat: candidate = x = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 0",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 14,
    "text": "Setăm valoarea contorului count la 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "După finalizarea primei parcurgeri, am găsit un candidat (2). Inițializăm contorul de apariții reale actual_count cu 0 pentru a-l valida.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Începem a doua parcurgere a vectorului pentru a număra exact de câte ori apare candidatul în tot vectorul.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Analizăm primul element: x = arr[0] = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Verificăm dacă elementul x este egal cu candidatul. Deoarece x = 2 și candidate = 2, condiția x == candidate este adevărată.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 25,
    "text": "Incrementăm contorul aparițiilor reale: actual_count devine 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": true
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Analizăm al doilea element: x = arr[1] = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Verificăm dacă x == candidate. Deoarece 2 == 2, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 25,
    "text": "Incrementăm contorul aparițiilor reale: actual_count devine 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Analizăm al treilea element: x = arr[2] = 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Verificăm dacă x == candidate. Deoarece 1 == 2, condiția este falsă.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Analizăm al patrulea element: x = arr[3] = 1.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Verificăm dacă x == candidate. Deoarece 1 == 2, condiția este falsă.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": true
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "Analizăm ultimul element: x = arr[4] = 2.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "Verificăm dacă x == candidate. Deoarece 2 == 2, condiția este adevărată.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 25,
    "text": "Incrementăm contorul aparițiilor reale: actual_count devine 3.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": true
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "Verificăm dacă numărul de apariții determinate (actual_count = 3) este strict mai mare decât jumătate din dimensiunea vectorului (arr.size() / 2 = 2). Condiția 3 > 2 este adevărată, deci elementul este într-adevăr majoritar.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "Programul s-a încheiat cu succes și returnează 0.",
    "blocksVisual": [
      {
        "label": "Vector (arr)",
        "groups": [
          [
            {
              "val": "2",
              "active": false
            },
            {
              "val": "2",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "1",
              "active": false
            },
            {
              "val": "2",
              "active": false
            }
          ]
        ]
      },
      {
        "label": "Parametri Boyer-Moore",
        "groups": [
          [
            {
              "val": "candidate = 2",
              "active": false
            },
            {
              "val": "count = 1",
              "active": false
            }
          ]
        ]
      }
    ]
  }
],
  "debugger": {
    
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [{"line": 7,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 8,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 9,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 13,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 14,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 15,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 16,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":2,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":1,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":1,"actual_count":null,"is_majority":null}},{"line": 15,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":1,"actual_count":null,"is_majority":null}},{"line": 18,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 15,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 18,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":1,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 13,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 14,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 22,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":0,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":0,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":0,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":0,"is_majority":null}},{"line": 25,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":1,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":1,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":1,"is_majority":null}},{"line": 25,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":2,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":2,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":2,"is_majority":null}},{"line": 25,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":3,"is_majority":null}},{"line": 29,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":3,"is_majority":null}},{"line": 30,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":3,"is_majority":true}}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = [{ name: "main()", file: "main.cpp", line: activeLine }];
      
      vars.push({ name: "arr", type: "vector<int>", val: "size = 5", expandable: true });
      vars.push({ name: "candidate", type: "int", val: locals.candidate.toString() });
      vars.push({ name: "count", type: "int", val: locals.count.toString() });
      if (locals.x !== null) vars.push({ name: "x", type: "int", val: locals.x.toString() });
      if (locals.actual_count !== null) vars.push({ name: "actual_count", type: "int", val: locals.actual_count.toString() });
      if (locals.is_majority !== null) vars.push({ name: "is_majority", type: "bool", val: locals.is_majority.toString() });

      let inlineVal = null;
      if (locals.x !== null && activeLine >= 16 && activeLine <= 30) {
          inlineVal = `x: ${locals.x}`;
          if (activeLine === 18 || activeLine === 20 || activeLine === 29) {
              inlineVal += `, candidate: ${locals.candidate}`;
          }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"line": 7,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 8,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 9,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":null,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":-1,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 13,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 14,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 15,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 16,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":2,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":1,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":1,"actual_count":null,"is_majority":null}},{"line": 15,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":2,"x":1,"actual_count":null,"is_majority":null}},{"line": 18,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 15,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":null,"is_majority":null}},{"line": 18,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":1,"actual_count":null,"is_majority":null}},{"line": 11,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 12,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 13,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":0,"x":2,"actual_count":null,"is_majority":null}},{"line": 14,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":null,"is_majority":null}},{"line": 22,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":0,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":0,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":0,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":0,"is_majority":null}},{"line": 25,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":1,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":1,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":1,"is_majority":null}},{"line": 25,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":2,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":1,"actual_count":2,"is_majority":null}},{"line": 23,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":2,"is_majority":null}},{"line": 24,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":2,"is_majority":null}},{"line": 25,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":2,"actual_count":3,"is_majority":null}},{"line": 29,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":3,"is_majority":null}},{"line": 30,"locals":{"arr":[2,2,1,1,2],"candidate":2,"count":1,"x":null,"actual_count":3,"is_majority":true}}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (locals.x !== null && (lineNum === 11 || lineNum === 23)) return `x: ${locals.x}`;
      return null;
    }

  },
  problems: {
    easy: [
      {
        title: "Majority Element I",
        url: "https://leetcode.com/problems/majority-element/",
        desc: "Determină elementul majoritar dintr-un vector în timp liniar și spațiu constant."
      }
    ],
    medium: [
      {
        title: "Element Majoritar",
        url: "https://www.pbinfo.ro/probleme/1261/element-majoritar",
        desc: "Determină elementul majoritar dintr-un vector dat, sau afișează un mesaj corespunzător dacă acesta nu există."
      }
    ],
    hard: [
      {
        title: "Majority Element II",
        url: "https://leetcode.com/problems/majority-element-ii/",
        desc: "Găsește toate elementele care apar de mai mult de ⌊N/3⌋ ori într-un vector."
      }
    ]
  }
};
