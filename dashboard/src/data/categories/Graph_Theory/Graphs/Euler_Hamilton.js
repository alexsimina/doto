export const data = {
  "presentation": "### Prezentare Generală\n\nUn **Drum Eulerian** vizitează fiecare muchie dintr-un graf exact o singură dată. Un **Ciclu Eulerian** este un drum Eulerian care se întoarce la nodul de pornire.\\n\\nPentru grafuri neorientate:\\n- Ciclu Eulerian: toate nodurile au grad par.\\n- Drum Eulerian: exact 2 noduri au grad impar (restul par).\\n\\nAlgoritmul lui Hierholzer găsește un Ciclu Eulerian în O(E): facem DFS, dar distrugem muchiile pe măsură ce le parcurgem. Când ne blocăm într-un nod, adăugăm acel nod la răspuns. La final, răspunsul se inversează.\\n\\nUn **Drum/Ciclu Hamiltonian** vizitează fiecare nod exact o singură dată. Spre deosebire de Eulerian, problema este NP-Hard (nu are soluție eficientă polinomială, necesitând Backtracking sau Bitmask DP O(2^N * N^2)).",
  "complexity": "### Complexitate\n\nEulerian (Hierholzer): O(V + E) timp și spațiu.\\nHamiltonian (Held-Karp Bitmask DP): O(2^V * V^2) timp. (Deci imposibil pentru V > 20).",
  "variations": "### Variații și Edge Cases\n\nProblema Poștașului Chinez (Găsirea drumului minim care vizitează toate muchiile măcar o dată), Problema Comis-Voiajorului (TSP - vizitarea tuturor nodurilor cu cost minim).",
  "applications": "### Aplicații\n\nRute de gunoieri, poștași, curățarea străzilor cu utilaje (Eulerian). Optimizarea livrărilor logistice (TSP).",
  code: `
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

void findEulerianPath(int start, vector<vector<int>>& adj) {
    stack<int> curr_path;
    vector<int> circuit;
    
    curr_path.push(start);
    int curr_v = start; 

    while (!curr_path.empty()) {
        if (adj[curr_v].size()) {
            curr_path.push(curr_v);
            int next_v = adj[curr_v].back();
            adj[curr_v].pop_back();
            
            // Daca graful era neorientat, trebuia stearsa si muchia inapoi!
            // Presupunem graf orientat pentru simplitate
            curr_v = next_v;
        } else {
            circuit.push_back(curr_v);
            curr_v = curr_path.top();
            curr_path.pop();
        }
    }

    reverse(circuit.begin(), circuit.end());
    for (int node : circuit) cout << node << " ";
    cout << "
";
}

int main() {
    vector<vector<int>> adj = {
        {1},    // 0 -> 1
        {2},    // 1 -> 2
        {0, 3}, // 2 -> 0, 2 -> 3
        {4},    // 3 -> 4
        {2}     // 4 -> 2
    };
    
    cout << "Ciclu Eulerian: ";
    findEulerianPath(0, adj);
    return 0;
}
`,
  "explanations": [
    {
      "line": 12,
      "text": "Începem de la nodul 0.",
      "blocksVisual": [
        {
          "label": "Start",
          "groups": [
            [
              {
                "val": "0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "active"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 16,
      "text": "Avem vecini pentru nodul curent. Îl salvăm pe stivă, luăm primul vecin disponibil și ȘTERGEM muchia dintre ei.",
      "blocksVisual": [
        {
          "label": "Alegere Muchie",
          "groups": [
            [
              {
                "val": "0 -> 1",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "active"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 23,
      "text": "Ne mutăm la noul nod și repetăm. Continuăm până nu mai avem muchii.",
      "blocksVisual": [
        {
          "label": "Drum Recursiv",
          "groups": [
            [
              {
                "val": "0 -> 1 -> 2 -> 3 -> 4 -> 2 -> 0"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "active"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 24,
      "text": "Când un nod rămâne complet FĂRĂ muchii de ieșire (ne-am blocat), îl adăugăm la rezultatul final `circuit`.",
      "blocksVisual": [
        {
          "label": "Blocaj",
          "groups": [
            [
              {
                "val": "Nod adăugat la final"
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 26,
      "text": "Ne întoarcem la ultimul nod salvat în stivă (Backtrack) ca să vedem dacă are alte rute neexplorate.",
      "blocksVisual": [
        {
          "label": "Backtrack",
          "groups": [
            [
              {
                "val": "Pop stiva",
                "active": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    },
    {
      "line": 31,
      "text": "La final, inversăm `circuit`. Dacă graful satisface condițiile, rezultatul este Ciclu/Drum Eulerian valid!",
      "blocksVisual": [
        {
          "label": "Rezultat",
          "groups": [
            [
              {
                "val": "0 -> 1 -> 2 -> 3 -> 4 -> 2 -> 0",
                "sorted": true
              }
            ]
          ]
        }
      ],
      "graphVisual": {
        "nodes": [
          {
            "id": "0",
            "x": 80,
            "y": 60,
            "label": "0",
            "state": "visited"
          },
          {
            "id": "1",
            "x": 200,
            "y": 60,
            "label": "1",
            "state": "visited"
          },
          {
            "id": "2",
            "x": 140,
            "y": 130,
            "label": "2",
            "state": "visited"
          },
          {
            "id": "3",
            "x": 80,
            "y": 200,
            "label": "3",
            "state": "visited"
          },
          {
            "id": "4",
            "x": 200,
            "y": 200,
            "label": "4",
            "state": "visited"
          }
        ],
        "edges": [
          {
            "source": "0",
            "target": "1"
          },
          {
            "source": "1",
            "target": "2"
          },
          {
            "source": "2",
            "target": "0"
          },
          {
            "source": "2",
            "target": "3"
          },
          {
            "source": "3",
            "target": "4"
          },
          {
            "source": "4",
            "target": "2"
          }
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Ciclu Eulerian",
        "url": "https://www.infoarena.ro/problema/ciclueuler",
        "desc": "Clasica O(M)"
      }
    ],
    "medium": [
      {
        "title": "Reconstruct Itinerary",
        "url": "https://leetcode.com/problems/reconstruct-itinerary/",
        "desc": "Drum Eulerian cu Sortare Lexicografică"
      }
    ],
    "hard": [
      {
        "title": "Hamiltonian Path (TSP)",
        "url": "https://www.infoarena.ro/problema/tsp",
        "desc": "Traveling Salesman Bitmask DP"
      }
    ]
  }
};
