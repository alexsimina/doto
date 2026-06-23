export const data = {
  "presentation": `### Prezentare Generală

Algoritmul lui Dial este o optimizare extrem de eficientă a algoritmului lui Dijkstra pentru determinarea celor mai scurte drumuri de la o sursă unică, aplicabil în grafuri unde costurile muchiilor sunt numere întregi pozitive mici.

În timp ce algoritmul lui Dijkstra standard folosește o coadă de priorități (priority queue) cu o complexitate de $O(E \\log V)$, algoritmul lui Dial folosește o structură de tip **bucket** (găleți). Dacă valoarea maximă a costului unei muchii este $W$, atunci distanța maximă posibilă a oricărui drum minim este mărginită de $V \\cdot W$. 

Putem aloca un vector de $V \\cdot W + 1$ bucket-uri (liste), unde bucket-ul $i$ conține toate nodurile care au distanța temporară egală cu $i$. Menținem un pointer curent \`idx\` care scanează secvențial bucket-urile de la $0$ la $V \\cdot W$. Deoarece distanțele minime cresc monoton, pointerul \`idx\` nu se întoarce niciodată la stânga, garantând o complexitate de timp liniară în raport cu numărul de bucket-uri.`,
  "complexity": `### Complexitate

Pentru un graf cu $V$ noduri, $E$ muchii și costul maxim al unei muchii $W$:
- **Timp:** $O(E + V \\cdot W)$ — parcurgem muchiile în $O(E)$ și scanăm bucket-urile în $O(V \\cdot W)$ operații. Dacă $W$ este mic (constant), algoritmul rulează în timp liniar $O(E + V)$.
- **Spațiu:** $O(V \\cdot W + E)$ — spațiul ocupat de vectorul de liste pentru stocarea celor $V \\cdot W + 1$ bucket-uri.`,
  "variations": `### Variații și Edge Cases

1. **Memorie optimizată (Bucket circular):** Pentru a reduce spațiul de la $V \\cdot W + 1$ la $W + 1$, putem folosi un buffer circular de dimensiune $W + 1$, deoarece diferența maximă dintre distanțele a două noduri active din coadă este cel mult $W$. Indexul în buffer se calculează prin \`dist % (W + 1)\`.
2. **Muchii cu cost $0$:** Dial funcționează fără probleme cu costuri de $0$, spre deosebire de alte optimizări, adăugând nodul în același bucket ca cel curent.
3. **Ponderi mari:** Dacă $W$ este mare (ex. $W = 10^9$), algoritmul lui Dial devine extrem de ineficient ca spațiu și timp, fiind preferat Dijkstra standard.`,
  "applications": `### Aplicații

- Determinarea drumurilor minime în rețele rutiere sau hărți grid unde costul muchiilor reprezintă distanțe mici sau timpi de tranzit uniformi.
- Rutarea pachetelor în rețele de telecomunicații cu lățimi de bandă discretizate.
- Planificarea mișcării în jocuri video pe hărți cu tipuri diferite de teren (ex: iarbă = cost 1, mlaștină = cost 3).`,
  "code": `
#include <iostream>
#include <vector>
#include <list>
#include <algorithm>

using namespace std;

const int INF = 1e9;

struct Edge {
    int to, weight;
};

vector<int> dial(int src, int n, vector<vector<Edge>>& adj, int max_weight) {
    vector<int> dist(n + 1, INF);
    dist[src] = 0;
    
    // Numarul maxim de bucket-uri este n * max_weight + 1
    int num_buckets = n * max_weight + 1;
    vector<list<int>> buckets(num_buckets);
    
    buckets[0].push_back(src);
    int idx = 0;
    
    for (int count = 0; count < n; ) {
        // Gasim primul bucket ne-vid
        while (idx < num_buckets && buckets[idx].empty()) {
            idx++;
        }
        
        if (idx == num_buckets) break;
        
        int u = buckets[idx].front();
        buckets[idx].pop_front();
        
        count++; // Am finalizat procesarea unui nod
        
        for (auto& edge : adj[u]) {
            int v = edge.to;
            int weight = edge.weight;
            
            if (dist[u] + weight < dist[v]) {
                if (dist[v] != INF) {
                    buckets[dist[v]].remove(v);
                }
                
                dist[v] = dist[u] + weight;
                buckets[dist[v]].push_back(v);
            }
        }
    }
    return dist;
}

int main() {
    int n = 4;
    vector<vector<Edge>> adj(n + 1);
    adj[1] = {{2, 2}, {3, 4}};
    adj[2] = {{3, 1}, {4, 7}};
    adj[3] = {{4, 3}};
    
    vector<int> dist = dial(1, n, adj, 7);
    cout << "Distante de la nodul 1:\n";
    for (int i = 1; i <= n; ++i) {
        cout << "Nodul " << i << ": " << dist[i] << "\n";
    }
    return 0;
}
`,
  "explanations": [
  {
    "line": 62,
    "text": "Apelăm dial(1, 4, adj, 7).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "Inițializăm dist[i] = INF.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "dist[1] = 0.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "num_buckets = 29.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "Inițializăm vectorul buckets.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "buckets[0].push_back(1).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {1}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "idx = 0.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {1}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 25,
    "text": "Începe bucla (count = 0 < 4).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {1}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Căutăm următorul bucket ne-vid de la idx=0.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {1}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 31,
    "text": "Verificăm idx == num_buckets.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {1}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 33,
    "text": "u = buckets[0].front() = 1.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {1}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "buckets[0].pop_front().",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 36,
    "text": "count devine 1.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 38,
    "text": "Parcurgem vecinii lui 1. Vectorul v=2, weight=2.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 42,
    "text": "Verificăm dacă dist[1] + 2 < dist[2]. (2 < INF).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 43,
    "text": "Verificăm dacă dist[2] != INF.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 47,
    "text": "dist[2] = 2.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 48,
    "text": "Adăugăm 2 în bucket[2].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 38,
    "text": "Parcurgem vecinii lui 1. Vectorul v=3, weight=4.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 42,
    "text": "Verificăm dacă dist[1] + 4 < dist[3]. (4 < INF).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 43,
    "text": "Verificăm dacă dist[3] != INF.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 47,
    "text": "dist[3] = 4.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 48,
    "text": "Adăugăm 3 în bucket[4].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Căutăm următorul bucket ne-vid de la idx=0.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=0",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": true
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "idx=1.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=1",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": true
            },
            {
              "val": "B[2]: {2}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "idx=2.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 31,
    "text": "Verificăm idx == num_buckets.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 33,
    "text": "u = buckets[2].front() = 2.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {2}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "buckets[2].pop_front().",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 36,
    "text": "count devine 2.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 38,
    "text": "Parcurgem vecinii lui 2. Vectorul v=3, weight=1.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 42,
    "text": "Verificăm dacă dist[2] + 1 < dist[3]. (3 < 4).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 43,
    "text": "Verificăm dacă dist[3] != INF.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {3}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 44,
    "text": "Eliminăm nodul 3 din bucket[4].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 47,
    "text": "dist[3] = 3.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 48,
    "text": "Adăugăm 3 în bucket[3].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 38,
    "text": "Parcurgem vecinii lui 2. Vectorul v=4, weight=7.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 42,
    "text": "Verificăm dacă dist[2] + 7 < dist[4]. (9 < INF).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 43,
    "text": "Verificăm dacă dist[4] != INF.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 47,
    "text": "dist[4] = 9.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 48,
    "text": "Adăugăm 4 în bucket[9].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Căutăm următorul bucket ne-vid de la idx=2.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=2",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": true
            },
            {
              "val": "B[3]: {3}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "idx=3.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {3}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 31,
    "text": "Verificăm idx == num_buckets.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {3}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 33,
    "text": "u = buckets[3].front() = 3.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {3}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "buckets[3].pop_front().",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 36,
    "text": "count devine 3.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 38,
    "text": "Parcurgem vecinii lui 3. Vectorul v=4, weight=3.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 42,
    "text": "Verificăm dacă dist[3] + 3 < dist[4]. (6 < 9).",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 43,
    "text": "Verificăm dacă dist[4] != INF.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 44,
    "text": "Eliminăm nodul 4 din bucket[9].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 47,
    "text": "dist[4] = 6.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 48,
    "text": "Adăugăm 4 în bucket[6].",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {4}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Căutăm următorul bucket ne-vid de la idx=3.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=3",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": true
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {4}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "idx=4.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=4",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": true
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {4}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "idx=5.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=5",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": true
            },
            {
              "val": "B[6]: {4}",
              "active": false
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "idx=6.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {4}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 31,
    "text": "Verificăm idx == num_buckets.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {4}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 33,
    "text": "u = buckets[6].front() = 4.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {4}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "buckets[6].pop_front().",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 36,
    "text": "count devine 4.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 52,
    "text": "Returnăm vectorul dist.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 63,
    "text": "Afișăm distanțele în main().",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": true
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 67,
    "text": "Program finalizat.",
    "blocksVisual": [
      {
        "label": "Buckets (0..6) - idx=6",
        "groups": [
          [
            {
              "val": "B[0]: {}",
              "active": false
            },
            {
              "val": "B[1]: {}",
              "active": false
            },
            {
              "val": "B[2]: {}",
              "active": false
            },
            {
              "val": "B[3]: {}",
              "active": false
            },
            {
              "val": "B[4]: {}",
              "active": false
            },
            {
              "val": "B[5]: {}",
              "active": false
            },
            {
              "val": "B[6]: {}",
              "active": true
            }
          ]
        ]
      }
    ]
  }
],
  "debugger": {
    
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [{"line": 62,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,1000000000,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 15,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,1000000000,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 16,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 19,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 20,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 22,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 23,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 25,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["1","","","","","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":1,"bucketsStr":["","","2","","3","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":1,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","2","","3","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 44,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","3","","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 44,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":3,"bucketsStr":["","","","","","","4"]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":4,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":5,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","","4"]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","",""]},{"line": 52,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 63,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 67,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      if (activeLine >= 80 && activeLine <= 91 && activeLine !== 86) {
          frames.push({ name: "main()", file: "main.cpp", line: activeLine });
          vars.push({ name: "n", type: "int", val: "4" });
          if (activeLine > 86) vars.push({ name: "dist", type: "vector<int>", val: "size = 5", expandable: true });
      } else {
          frames.push({ name: "dial(src, n, adj, max_weight)", file: "solution.cpp", line: activeLine });
          frames.push({ name: "main()", file: "main.cpp", line: 62 });
          
          vars.push({ name: "src", type: "int", val: "1" });
          vars.push({ name: "n", type: "int", val: "4" });
          vars.push({ name: "max_weight", type: "int", val: "7" });
          vars.push({ name: "dist", type: "vector<int>", val: "size = 5", expandable: true });
          
          if (locals.num_buckets !== null) vars.push({ name: "num_buckets", type: "int", val: locals.num_buckets.toString() });
          if (locals.idx !== null) vars.push({ name: "idx", type: "int", val: locals.idx.toString() });
          if (locals.count !== null) vars.push({ name: "count", type: "int", val: locals.count.toString() });
          if (locals.u !== null) vars.push({ name: "u", type: "int", val: locals.u.toString() });
          if (locals.v !== null) vars.push({ name: "v", type: "int", val: locals.v.toString() });
          if (locals.weight !== null) vars.push({ name: "weight", type: "int", val: locals.weight.toString() });
      }

      globalVars.push({ name: "INF", type: "const int", val: "1e9" });

      let inlineVal = null;
      if (locals.u !== null && activeLine >= 57 && activeLine <= 74) {
          inlineVal = `u: ${locals.u}`;
          if (locals.v !== null) inlineVal += `, v: ${locals.v}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"line": 62,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,1000000000,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 15,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,1000000000,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 16,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 19,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 20,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 22,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 23,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 25,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["1","","","","","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":1,"bucketsStr":["","","2","","3","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":1,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","2","","3","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 44,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","3","","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 44,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":3,"bucketsStr":["","","","","","","4"]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":4,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":5,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","","4"]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","",""]},{"line": 52,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 63,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 67,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (lineNum === 33 || lineNum === 38) return locals.u !== null ? `u: ${locals.u}` : null;
      if (lineNum === 39) return locals.v !== null ? `v: ${locals.v}` : null;
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const states = [{"line": 62,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,1000000000,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 15,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,1000000000,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 16,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":null,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 19,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 20,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 22,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":null,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 23,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":null,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 25,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":null,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":-1,"bucketsStr":["1","","","","","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["1","","","","","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":0,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":null,"weight":null},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,1000000000,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":2,"weight":2},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,1000000000,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":1,"bucketsStr":["","","2","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":1,"bucketsStr":["","","2","","3","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":0,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":1,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":1,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":-1,"bucketsStr":["","","2","","3","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","2","","3","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":1,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":4},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","3","",""]},{"line": 44,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,4,1000000000],"uVal":2,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":3,"weight":1},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,1000000000],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":2,"bucketsStr":["","","","3","","",""]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":2,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":2,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":-1,"bucketsStr":["","","","3","","",""]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","3","","",""]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":2,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":7},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 38,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 42,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 43,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 44,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,9],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 47,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":3,"bucketsStr":["","","","","","",""]},{"line": 48,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":3,"bucketsStr":["","","","","","","4"]},{"line": 27,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":3,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":4,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":5,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 28,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 31,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":3,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","","4"]},{"line": 33,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","","4"]},{"line": 34,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":3,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","",""]},{"line": 36,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":4,"bucketsStr":["","","","","","",""]},{"line": 52,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 63,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]},{"line": 67,"locals":{"src":1,"n":4,"max_weight":7,"num_buckets":29,"idx":6,"count":4,"u":4,"v":4,"weight":3},"dist":[1000000000,0,2,3,6],"uVal":-1,"bucketsStr":["","","","","","",""]}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const dist = state.dist;
      let uVal = state.uVal;

      const staticNodes = [
        { id: "1", x: 50, y: 110, label: "1" },
        { id: "2", x: 150, y: 50, label: "2" },
        { id: "3", x: 150, y: 170, label: "3" },
        { id: "4", x: 250, y: 110, label: "4" }
      ];
      const staticEdges = [
        { source: "1", target: "2", weight: 2 },
        { source: "1", target: "3", weight: 4 },
        { source: "2", target: "3", weight: 1 },
        { source: "2", target: "4", weight: 7 },
        { source: "3", target: "4", weight: 3 }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let nState = undefined;
          if (idNum === uVal) nState = "active";
          else if (dist[idNum] < 1e9) nState = "visited";
          const desc = `d=${dist[idNum] >= 1e9 ? "INF" : dist[idNum]}`;
          return { ...n, state: nState, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === uVal);
          return { ...e, active };
        })
      };
    }

  },
  "problems": {
    "easy": [
      {
        "title": "Network Delay Time",
        "url": "https://leetcode.com/problems/network-delay-time/",
        "desc": "Calculează timpul minim necesar ca semnalul să ajungă la toate nodurile rețelei pornind dintr-o sursă."
      }
    ],
    "medium": [
      {
        "title": "Dijkstra?",
        "url": "https://codeforces.com/problemset/problem/20/C",
        "desc": "Problemă clasică de determinare și reconstituire a celui mai scurt drum într-un graf ponderat."
      }
    ],
    "hard": [
      {
        "title": "Shortest Routes I",
        "url": "https://cses.fi/problemset/task/1671/",
        "desc": "Găsește cele mai scurte rute de la nodul 1 la toate celelalte noduri din graf."
      }
    ]
  }
};
