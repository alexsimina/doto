export const data = {
  "presentation": `### Prezentare Generală

Diametrul unui arbore este definit ca fiind distanța maximă dintre oricare două noduri ale arborelui (lungimea celui mai lung drum simplu). Spre deosebire de un graf general, unde determinarea drumului maxim este o problemă NP-hard, în arbore proprietatea de aciclicitate ne permite să determinăm diametrul în timp liniar $O(N)$ folosind doar două parcurgeri de tip BFS (sau DFS).

Algoritmul clasic (metoda celor două scanări) constă în:
1. Pornirea unei parcurgeri în lățime (BFS) din orice nod arbitrar $X$. Identificăm nodul $Y$ aflat la distanța maximă față de $X$.
2. Pornirea unei a doua parcurgeri în lățime (BFS) având ca punct de start chiar nodul $Y$. Identificăm nodul $Z$ aflat la distanța maximă de $Y$.
3. Distanța dintre $Y$ și $Z$ reprezintă exact diametrul arborelui.

Această proprietate se bazează pe faptul că nodul cel mai îndepărtat de orice nod din arbore va fi întotdeauna unul dintre capetele unui diametru.`,
  "complexity": `### Complexitate

Pentru un arbore cu $N$ noduri și $N-1$ muchii:
- **Timp:** $O(N)$ — realizăm exact două parcurgeri BFS. Fiecare parcurgere vizitează fiecare nod și fiecare muchie exact o singură dată.
- **Spațiu:** $O(N)$ — necesar pentru lista de adiacență, coada BFS și matricea/vectorul de distanțe.`,
  "variations": `### Variații și Edge Cases

1. **Arbore cu 1 nod:** Diametrul este $0$.
2. **Arbori cu muchii ponderate:** Algoritmul celor două parcurgeri BFS funcționează la fel și în cazul în care muchiile au costuri pozitive (în loc de adăugarea $+1$ la distanță, adăugăm ponderea muchiei).
3. **Programare dinamică pe arbori:** O metodă alternativă de determinare a diametrului folosește programarea dinamică, calculând pentru fiecare nod $U$ cele mai lungi două drumuri descendente. Această abordare funcționează și pe muchii cu ponderi negative.`,
  "applications": `### Aplicații

- Determinarea „centrului” unui arbore (nodul care minimizează distanța maximă către orice alt nod).
- Probleme de rețelistică, unde vrem să minimizăm întârzierea maximă a transmiterii semnalelor între două puncte finale.
- Determinarea razei și a excentricității nodurilor într-o rețea fără cicluri.`,
  "code": `
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

pair<int, int> bfs(int start, int n, vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;
    
    dist[start] = 0;
    q.push(start);
    
    int farthest_node = start;
    int max_dist = 0;
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        if (dist[u] > max_dist) {
            max_dist = dist[u];
            farthest_node = u;
        }
        
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return {farthest_node, max_dist};
}

int getTreeDiameter(int n, vector<vector<int>>& adj) {
    if (n <= 1) return 0;
    pair<int, int> p1 = bfs(1, n, adj);
    pair<int, int> p2 = bfs(p1.first, n, adj);
    return p2.second;
}

int main() {
    int n = 6;
    vector<vector<int>> adj(n + 1);
    adj[1] = {2};
    adj[2] = {1, 3, 4};
    adj[3] = {2, 5};
    adj[4] = {2, 6};
    adj[5] = {3};
    adj[6] = {4};
    
    int diameter = getTreeDiameter(n, adj);
    cout << "Diametrul arborelui: " << diameter << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 54,
    "text": "Apelăm getTreeDiameter(6, adj).",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 38,
    "text": "Verificăm dacă n <= 1. (6 <= 1 e fals)",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 39,
    "text": "Apelăm bfs(1, 6, adj).",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Intrăm în BFS 1 cu start=1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Inițializăm vectorul dist cu -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Inițializăm coada q.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "dist[1] = 0.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "q.push(1).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "farthest_node = 1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "max_dist = 0.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Începe bucla while (!q.empty()).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[1] > max_dist (0 > 0).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 2 al lui 1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[2] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[2] = 1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(2).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [2]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [2]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[2] > max_dist (1 > 0).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 1 al lui 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[1] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 3 al lui 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[3] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[3] = 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(3).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [3]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 4 al lui 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [3]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[4] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [3]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[4] = 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [3]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(4).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [3,4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [3,4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[3] > max_dist (2 > 1).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 2.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 2 al lui 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[2] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 5 al lui 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[5] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[5] = 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(5).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4,5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 4.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [4,5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[4] > max_dist (2 > 2).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 2 al lui 4.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[2] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 6 al lui 4.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[6] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[6] = 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(6).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5,6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 5.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [5,6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[5] > max_dist (3 > 2).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 3.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 5.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 3 al lui 5.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[3] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 6.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[6] > max_dist (3 > 3).",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 4 al lui 6.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[4] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "Returnăm perechea {5, 3}.",
    "blocksVisual": [
      {
        "label": "BFS 1",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 40,
    "text": "Apelăm bfs(5, 6, adj).",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 8,
    "text": "Intrăm în BFS 2 cu start=5.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 9,
    "text": "Inițializăm vectorul dist cu -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 10,
    "text": "Inițializăm coada q.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 12,
    "text": "dist[5] = 0.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 13,
    "text": "q.push(5).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 15,
    "text": "farthest_node = 5.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 16,
    "text": "max_dist = 0.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 18,
    "text": "Începe bucla while (!q.empty()).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 5.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [5]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[5] > max_dist (0 > 0).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 3 al lui 5.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[3] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[3] = 1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(3).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [3]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [3]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[3] > max_dist (1 > 0).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 2 al lui 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[2] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[2] = 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(2).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [2]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 5 al lui 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [2]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[5] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [2]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [2]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[2] > max_dist (2 > 1).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 1 al lui 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[1] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[1] = 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(1).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 3 al lui 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[3] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 4 al lui 2.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[4] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[4] = 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(4).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1,4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [1,4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[1] > max_dist (3 > 2).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 3.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 2 al lui 1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[2] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 4.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [4]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[4] > max_dist (3 > 3).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 2 al lui 4.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[2] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 6 al lui 4.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[6] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 29,
    "text": "dist[6] = 4.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 30,
    "text": "q.push(6).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 19,
    "text": "u = q.front() = 6.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = [6]"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 20,
    "text": "q.pop().",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 22,
    "text": "Verificăm dacă dist[6] > max_dist (4 > 3).",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 23,
    "text": "max_dist = 4.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 24,
    "text": "farthest_node = 6.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 27,
    "text": "Parcurgem vecinul v = 4 al lui 6.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 28,
    "text": "Verificăm dist[4] == -1.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 34,
    "text": "Returnăm perechea {6, 4}.",
    "blocksVisual": [
      {
        "label": "BFS 2",
        "groups": [
          [
            {
              "val": "q = []"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 41,
    "text": "Returnăm p2.second = 4.",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 55,
    "text": "Afișăm diametrul arborelui: 4.",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  },
  {
    "line": 56,
    "text": "Program finalizat.",
    "blocksVisual": [
      {
        "label": "Main",
        "groups": [
          [
            {
              "val": "n = 6"
            }
          ]
        ]
      }
    ]
  }
],
  "debugger": {
    
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [{"line": 54,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 38,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 38},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 39,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 8,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 8},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 9,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 9},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 10,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 10},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 12,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 12},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 13,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 13},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 15,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 15},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 16,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 16},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 18,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 18},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[2],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[2],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":1,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":1},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":1},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,2,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3,4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3,4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":2},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":2},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4,5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4,5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":2},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":2},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5,6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5,6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":3,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 34,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 34},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 40,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 8,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 8},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 9,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 9},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 10,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 10},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 12,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 12},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 13,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 13},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 15,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 15},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 16,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 16},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 18,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 18},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[3],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[3],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":1,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,3,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":3},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":3},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1,4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1,4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":3,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[6],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[6],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":4,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 34,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 34},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 41,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 41},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 55,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":4},"stackFrames":[{"name":"main()","file":"main.cpp","line": 55}],"bfsCallCount":0},{"line": 56,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":4},"stackFrames":[{"name":"main()","file":"main.cpp","line": 56}],"bfsCallCount":0}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = state.stackFrames;
      
      if (state.bfsCallCount === 0) {
          vars.push({ name: "n", type: "int", val: "6" });
          if (locals.p1) vars.push({ name: "p1", type: "pair<int,int>", val: `{${locals.p1.first}, ${locals.p1.second}}` });
          if (locals.p2) vars.push({ name: "p2", type: "pair<int,int>", val: `{${locals.p2.first}, ${locals.p2.second}}` });
          if (locals.diameter) vars.push({ name: "diameter", type: "int", val: locals.diameter.toString() });
      } else {
          vars.push({ name: "start", type: "int", val: locals.start.toString() });
          vars.push({ name: "n", type: "int", val: "6" });
          vars.push({ name: "dist", type: "vector<int>", val: "size = 7", expandable: true });
          vars.push({ name: "q", type: "queue<int>", val: `[${state.q.join(',')}]` });
          if (locals.farthest_node !== null) vars.push({ name: "farthest_node", type: "int", val: locals.farthest_node.toString() });
          if (locals.max_dist !== null) vars.push({ name: "max_dist", type: "int", val: locals.max_dist.toString() });
          if (locals.u !== null) vars.push({ name: "u", type: "int", val: locals.u.toString() });
          if (locals.v !== null) vars.push({ name: "v", type: "int", val: locals.v.toString() });
      }

      let inlineVal = null;
      if (state.bfsCallCount > 0 && locals.u !== null && activeLine >= 46 && activeLine <= 60) {
          inlineVal = `u: ${locals.u}`;
          if (locals.v !== null && activeLine >= 54) inlineVal += `, v: ${locals.v}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"line": 54,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 38,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 38},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 39,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 8,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 8},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 9,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 9},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 10,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 10},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 12,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 12},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 13,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 13},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 15,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 15},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 16,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 16},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 18,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 18},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[2],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[2],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":1,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":1},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":1},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,2,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3,4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3,4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":2},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":2},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4,5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4,5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":2},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":2},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5,6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5,6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":3,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 34,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 34},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 40,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 8,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 8},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 9,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 9},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 10,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 10},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 12,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 12},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 13,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 13},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 15,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 15},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 16,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 16},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 18,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 18},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[3],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[3],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":1,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,3,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":3},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":3},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1,4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1,4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":3,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[6],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[6],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":4,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 34,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 34},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 41,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 41},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 55,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":4},"stackFrames":[{"name":"main()","file":"main.cpp","line": 55}],"bfsCallCount":0},{"line": 56,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":4},"stackFrames":[{"name":"main()","file":"main.cpp","line": 56}],"bfsCallCount":0}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (state.bfsCallCount > 0) {
          if (lineNum === 19) return locals.u !== null ? `u: ${locals.u}` : null;
          if (lineNum === 27) return locals.v !== null ? `v: ${locals.v}` : null;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const states = [{"line": 54,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 38,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 38},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 39,"locals":{"n":6,"p1":null,"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 8,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 8},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 9,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 9},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 10,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 10},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 12,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 12},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 13,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 13},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 15,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":null,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 15},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 16,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 16},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 18,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":null,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 18},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":-1},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[1],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":null},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":1,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[2],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":1},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[2],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":0,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":1,"max_dist":1,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":2},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":1},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":1},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,2,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":3},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,-1,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":2,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3,4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":2},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[3,4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":1,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":4},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":2},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":2},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,-1,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":3,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4,5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":3},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[4,5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":5},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":2},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":2},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,-1],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 29,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 30,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":4,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5,6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":4},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[5,6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 23,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":3,"max_dist":3,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 24,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":6},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":5,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":5},{"line": 19,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[6],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 20,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 22,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":3},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 27,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 28,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 34,"locals":{"start":1,"n":6,"p1":null,"p2":null,"diameter":null,"farthest_node":5,"max_dist":3,"u":6,"v":4},"dist":[-1,0,1,2,2,3,3],"q":[],"stackFrames":[{"name":"bfs(start=1, n=6, adj)","file":"solution.cpp","line": 34},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 39},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":1,"activeNode":6},{"line": 40,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 8,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 8},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 9,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 9},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 10,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,-1,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 10},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 12,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 12},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 13,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":null,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 13},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 15,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":null,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 15},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 16,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 16},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 18,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":null,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 18},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":-1},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[5],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":null},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,-1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":5,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[3],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":5},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[3],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":0,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":5,"max_dist":1,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":3},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,-1,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":2},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":3,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":3},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[2],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":1,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":3,"max_dist":2,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":5},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,-1,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,3,2,1,-1,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":1},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":3},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":3},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,-1,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":2,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1,4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":2},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[1,4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":2,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":2,"max_dist":3,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":4},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":1,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":1},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[4],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":2},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,-1],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 29,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 29},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 30,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":4,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[6],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 30},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":4},{"line": 19,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[6],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 19},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 20,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 20},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 22,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":3,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 22},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 23,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":1,"max_dist":4,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 23},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 24,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":6},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 24},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 27,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 27},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 28,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 28},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 34,"locals":{"start":5,"n":6,"p1":{"first":5,"second":3},"p2":null,"diameter":null,"farthest_node":6,"max_dist":4,"u":6,"v":4},"dist":[-1,3,2,1,3,0,4],"q":[],"stackFrames":[{"name":"bfs(start=5, n=6, adj)","file":"solution.cpp","line": 34},{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 40},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":2,"activeNode":6},{"line": 41,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":null},"stackFrames":[{"name":"getTreeDiameter(n=6, adj)","file":"solution.cpp","line": 41},{"name":"main()","file":"main.cpp","line": 54}],"bfsCallCount":0},{"line": 55,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":4},"stackFrames":[{"name":"main()","file":"main.cpp","line": 55}],"bfsCallCount":0},{"line": 56,"locals":{"n":6,"p1":{"first":5,"second":3},"p2":{"first":6,"second":4},"diameter":4},"stackFrames":[{"name":"main()","file":"main.cpp","line": 56}],"bfsCallCount":0}];
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      
      const staticNodes = [
        { id: "1", x: 160, y: 170, label: "1" },
        { id: "2", x: 160, y: 100, label: "2" },
        { id: "3", x: 100, y: 100, label: "3" },
        { id: "4", x: 220, y: 100, label: "4" },
        { id: "5", x: 40, y: 100, label: "5" },
        { id: "6", x: 280, y: 100, label: "6" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "2", target: "4" },
        { source: "3", target: "5" },
        { source: "4", target: "6" }
      ];

      let activeNode = state.activeNode || -1;
      let visitedNodes = [];
      let diameterNodes = [];

      if (state.bfsCallCount === 1) {
          for (let i = 1; i <= 6; i++) {
              if (state.dist[i] !== -1) visitedNodes.push(i);
          }
      } else if (state.bfsCallCount === 2) {
          for (let i = 1; i <= 6; i++) {
              if (state.dist[i] !== -1) visitedNodes.push(i);
          }
      }

      if (state.line === 82 || state.line === 83) {
          diameterNodes = [5, 3, 2, 4, 6];
          activeNode = -1;
          visitedNodes = [];
      }

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let nState = undefined;
          if (diameterNodes.includes(idNum)) nState = "active";
          else if (idNum === activeNode) nState = "active";
          else if (visitedNodes.includes(idNum)) nState = "visited";
          
          let desc = "";
          if (state.dist && state.dist[idNum] !== undefined && state.dist[idNum] !== -1) {
              desc = `d=${state.dist[idNum]}`;
          }
          return { ...n, state: nState, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const active = (diameterNodes.includes(u) && diameterNodes.includes(v)) || (u === activeNode || v === activeNode);
          return { ...e, active };
        })
      };
    }

  },
  "problems": {
    "easy": [
      {
        "title": "Diameter of Binary Tree",
        "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
        "desc": "Calculează diametrul unui arbore binar (distanța maximă dintre oricare două frunze)."
      }
    ],
    "medium": [
      {
        "title": "Tree Diameter",
        "url": "https://cses.fi/problemset/task/1131/",
        "desc": "Problemă clasică: determină diametrul unui arbore oarecare cu N noduri."
      }
    ],
    "hard": [
      {
        "title": "Tree Distances I",
        "url": "https://cses.fi/problemset/task/1132/",
        "desc": "Pentru fiecare nod din arbore, determină distanța maximă către orice alt nod utilizând concepte similare determinării diametrului."
      }
    ]
  }
};
