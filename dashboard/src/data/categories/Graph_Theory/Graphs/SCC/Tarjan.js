export const data = {
  "presentation": "### Algoritmul lui Tarjan (SCC)\n\nAlgoritmul lui Tarjan identifică componentele tare conexe ale unui graf orientat într-o **singură trecere DFS**.\n\nFiecare nod primește un număr de ordine unic (`tin`) și un indice de accesibilitate (`low`). Nodurile sunt stocate pe o stivă pe măsură ce sunt vizitate. Când pentru un nod $u$ avem `low[u] == tin[u]`, acesta devine rădăcina unei componente tare conexe.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ - o singură parcurgere DFS.\n- **Spațiu:** $O(V)$ - pentru vectorii `tin`, `low`, `onStack` și stivă.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Puncte de articulație și Punți**: Concepte similare în grafuri neorientate.",
  "applications": "### Aplicații Reale\n\n- Optimizarea compilatoarelor.\n- Detecția deadlock-urilor în sisteme de operare.\n- Analiza rețelelor sociale complexe.",
  "code": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\n\nusing namespace std;\n\nconst int MAXN = 1005;\nvector<int> adj[MAXN];\nint tin[MAXN], low[MAXN];\nbool onStack[MAXN];\nstack<int> st;\nint timer = 0, sccCount = 0;\n\nvoid tarjan(int u) {\n    tin[u] = low[u] = ++timer;\n    st.push(u);\n    onStack[u] = true;\n\n    for (int v : adj[u]) {\n        if (tin[v] == 0) {\n            tarjan(v);\n            low[u] = min(low[u], low[v]);\n        } else if (onStack[v]) {\n            low[u] = min(low[u], tin[v]);\n        }\n    }\n\n    if (low[u] == tin[u]) {\n        sccCount++;\n        cout << \"SCC: \";\n        while (true) {\n            int v = st.top();\n            st.pop();\n            onStack[v] = false;\n            cout << v << \" \";\n            if (u == v) break;\n        }\n        cout << \"\\n\";\n    }\n}\n\nint main() {\n    adj[1].push_back(2);\n    adj[2].push_back(3);\n    adj[3].push_back(1);\n    adj[3].push_back(4);\n    \n    for (int i = 1; i <= 4; i++) {\n        if (tin[i] == 0) tarjan(i);\n    }\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 15,
      "text": "Începem apelul `tarjan` pentru nodul 1.",
      "blocksVisual": [
        {
          "label": "Nod",
          "groups": [
            [
              {
                "val": "u: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Incrementăm `timer`. Atribuim `tin[1] = low[1] = 1`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[1]: 1"
              },
              {
                "val": "low[1]: 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 1 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Marcăm că nodul 1 este pe stivă: `onStack[1] = true`.",
      "blocksVisual": [
        {
          "label": "onStack",
          "groups": [
            [
              {
                "val": "onStack[1]: true"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 1: [2]. Primul vecin este 2.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Verificăm dacă nodul 2 a fost vizitat. `tin[2] == 0` este adevărat.",
      "blocksVisual": [
        {
          "label": "Vizitat check",
          "groups": [
            [
              {
                "val": "tin[2]: 0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Apelăm recursiv `tarjan(2)`.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "tarjan(2)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Pentru nodul 2: `tin[2] = low[2] = 2`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[2]: 2"
              },
              {
                "val": "low[2]: 2"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 2 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 2: [3]. Apelăm `tarjan(3)`.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "tarjan(3)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Pentru nodul 3: `tin[3] = low[3] = 3`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[3]: 3"
              },
              {
                "val": "low[3]: 3"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 3 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "3",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Explorăm vecinii lui 3: [1, 4]. Începem cu vecinul 1.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Verificăm dacă nodul 1 a fost vizitat. Este vizitat (`tin[1] == 1`).",
      "blocksVisual": []
    },
    {
      "line": 24,
      "text": "Nodul 1 este pe stivă, deci avem muchie de întoarcere. Actualizăm `low[3] = min(low[3], tin[1]) = 1`.",
      "blocksVisual": [
        {
          "label": "low[3]",
          "groups": [
            [
              {
                "val": "low[3]: 1",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Trecem la celălalt vecin al lui 3, care este nodul 4.",
      "blocksVisual": [
        {
          "label": "Vecin",
          "groups": [
            [
              {
                "val": "v: 4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Nodul 4 nu este vizitat. Apelăm recursiv `tarjan(4)`.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              {
                "val": "tarjan(4)",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Nodul 4: `tin[4] = low[4] = 4`.",
      "blocksVisual": [
        {
          "label": "tin/low",
          "groups": [
            [
              {
                "val": "tin[4]: 4"
              },
              {
                "val": "low[4]: 4"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Adăugăm nodul 4 în stivă.",
      "blocksVisual": [
        {
          "label": "Stack",
          "groups": [
            [
              {
                "val": "1"
              },
              {
                "val": "2"
              },
              {
                "val": "3"
              },
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Nodul 4 nu are vecini.",
      "blocksVisual": []
    },
    {
      "line": 28,
      "text": "Verificăm pentru 4: `low[4] == tin[4] == 4`. Am găsit o componentă!",
      "blocksVisual": []
    },
    {
      "line": 31,
      "text": "Extragem din stivă până la nodul 4 inclusiv. Componenta este {4}.",
      "blocksVisual": [
        {
          "label": "SCC",
          "groups": [
            [
              {
                "val": "4",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Revenim în apelul lui 3. Actualizăm `low[3] = min(low[3], low[4]) = min(1, 4) = 1`.",
      "blocksVisual": [
        {
          "label": "low[3]",
          "groups": [
            [
              {
                "val": "low[3]: 1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Ne întoarcem în 1. Avem `low[1] == tin[1] == 1`. Extragem stiva: obținem componenta {3, 2, 1}.",
      "blocksVisual": [
        {
          "label": "SCC",
          "groups": [
            [
              {
                "val": "3, 2, 1",
                "active": true
              }
            ]
          ]
        }
      ]
    }
  ]
};
