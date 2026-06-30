export const data = {
  "presentation": `### Prezentare Generală

Optimizarea Divide and Conquer (D&C DP) este o tehnică avansată de programare dinamică aplicată pentru a reduce complexitatea temporală a unor relații de recurență speciale de la $\\mathcal{O}(N^2)$ la $\\mathcal{O}(N \\log N)$ (sau de la $\\mathcal{O}(K \\cdot N^2)$ la $\\mathcal{O}(K \\cdot N \\log N)$).

Această optimizare se aplică recurențelor de forma:
$$dp[i][j] = \\min_{k < j} \\{ dp[i-1][k] + cost(k, j) \\}$$

Pentru a folosi această optimizare, funcția de cost și punctele optime de tranziție trebuie să satisfacă o proprietate numită **monotonicitate**:
Fie $opt(i, j)$ cel mai mic indice $k$ care minimizează expresia de mai sus pentru starea $(i, j)$. Proprietatea de monotonicitate afirmă că:
$$opt(i, j) \\le opt(i, j + 1) \\quad \\forall j$$

Cu alte cuvinte, pe măsură ce starea $j$ crește, punctul optim de tranziție de pe linia anterioară se deplasează doar spre dreapta (sau rămâne pe loc).

### Abordarea Divide and Conquer
Dacă calculăm stările în mod naiv, pentru fiecare $j$ căutăm $opt(i, j)$ în intervalul $[0, j-1]$, rezultând un timp de parcurgere $\\mathcal{O}(N)$ per stare, deci $\\mathcal{O}(N^2)$ per grup.

Folosind Divide and Conquer:
1. Definim o funcție recursivă: \`compute(i, l, r, optL, optR)\` care calculează stările $dp[i][l \\dots r]$ știind că punctele lor optime de tranziție se află în intervalul $[optL, optR]$.
2. Alegem mijlocul intervalului stărilor curent: $mid = \\frac{l + r}{2}$.
3. Determinăm prin căutare liniară valoarea optimă $dp[i][mid]$ și obținem punctul său optim de tranziție $opt$ în interiorul intervalului $[optL, \\min(mid - 1, optR)]$.
4. Datorită monotonicității:
   - Pentru orice $j < mid$, punctul optim $opt(i, j) \\le opt$. Căutăm tranzițiile în intervalul $[optL, opt]$.
   - Pentru orice $j > mid$, punctul optim $opt(i, j) \\ge opt$. Căutăm tranzițiile în intervalul $[opt, optR]$.
5. Apelăm recursiv:
   - \`compute(i, l, mid - 1, optL, opt)\`
   - \`compute(i, mid + 1, r, opt, optR)\``,
  "complexity": `### Complexitate

- **Timp:** $\\mathcal{O}(K \\cdot N \\log N)$, unde $K$ este numărul de grupuri/partiții, iar $N$ este dimensiunea tabloului. La fiecare nivel al recursivității Divide and Conquer, suma lungimilor intervalelor de căutare $[optL, optR]$ este de ordinul $\\mathcal{O}(N)$. Deoarece arborele de recursivitate are înălțimea $\\mathcal{O}(\\log N)$, calculul pentru o linie/grup $i$ durează $\\mathcal{O}(N \\log N)$.
- **Spațiu:** $\\mathcal{O}(K \\cdot N)$ pentru stocarea stărilor din tabelul DP, care poate fi redus la $\\mathcal{O}(N)$ dacă folosim doar două rânduri din memorie (linia curentă și cea anterioară).`,
  "variations": `### Variații și Edge Cases

1. **Condiția de suficiență (Quadrangle Inequality):** O metodă matematică comună de a dovedi monotonicitatea lui $opt$ este de a verifica dacă funcția de cost satisface inegalitatea patrulaterului:
   $$cost(a, c) + cost(b, d) \\le cost(a, d) + cost(b, c) \\quad \\forall a \\le b \\le c \\le d$$
2. **Optimizarea pentru DP 1D:** Uneori, recurența nu depinde de un număr fix de grupuri $i$, ci este de forma $dp[j] = \\min_{k < j} \\{ dp[k] + cost(k, j) \\}$. D&C DP nu se aplică direct aici deoarece $dp[k]$ depinde de deciziile calculate în cadrul aceleiași linii. În acest caz se folosește un algoritm de tip D&C offline sau optimizarea Knuth / 1D DP cu stivă/coadă.
3. **Edge Cases:**
   - Un singur grup ($K = 1$), unde rezultatul este direct costul întregului interval.
   - Cazuri în care nu există nicio tranziție validă în intervalul de căutare (costul rămâne $\\infty$).`,
  "applications": `### Aplicații în Lumea Reală

- **Gruparea Datelor (Clustering 1D):** Împărțirea unui set de puncte unidimensionale în $K$ clustere astfel încât suma varianțelor interne să fie minimă (1D K-means).
- **Segmentarea Semnalelor:** Partiționarea unui semnal discret în $K$ intervale staționare pentru a minimiza eroarea de aproximare.
- **Optimizarea Producției și Distribuției:** Planificarea stocurilor sau împărțirea sarcinilor de lucru pe mașini cu costuri de setup dependente de dimensiunea lotului.`,
  code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const long long INF = 1e18;
int N = 4;
int G = 2;
vector<long long> A = {2, 4, 6, 8};
vector<long long> pref = {0, 2, 6, 12, 20};
vector<vector<long long>> dp;

long long cost(int k, int j) {
    long long sum = pref[j] - pref[k];
    return sum * sum;
}

// i = grupul curent (1-indexed)
// l, r = intervalul de stări dp[i][l...r] pe care le calculăm
// optL, optR = intervalul de căutare pentru tranzitia optimă a stărilor curente
void compute(int i, int l, int r, int optL, int optR) {
    if (l > r) return;
    
    int mid = (l + r) / 2;
    dp[i][mid] = INF;
    int opt = -1;
    
    for (int k = optL; k <= min(mid - 1, optR); k++) {
        long long current_cost = dp[i - 1][k] + cost(k, mid);
        if (current_cost < dp[i][mid]) {
            dp[i][mid] = current_cost;
            opt = k;
        }
    }
    
    compute(i, l, mid - 1, optL, opt);
    compute(i, mid + 1, r, opt, optR);
}

int main() {
    dp.assign(G + 1, vector<long long>(N + 1, INF));
    
    // Caz de bază: 0 grupuri
    dp[0][0] = 0;
    for (int j = 1; j <= N; j++) {
        dp[0][j] = INF;
    }
    
    // Completăm stările grup cu grup folosind Divide & Conquer
    for (int i = 1; i <= G; i++) {
        compute(i, 1, N, 0, N - 1);
    }
    
    cout << "Cost minim: " << dp[G][N] << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 40,
      "text": "Pornim execuția programului în funcția main.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "INF", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Tabloul A",
          "groups": [[{ "val": "2" }, { "val": "4" }, { "val": "6" }, { "val": "8" }]]
        }
      ]
    },
    {
      "line": 41,
      "text": "Inițializăm tabelul de programare dinamică cu dimensiunea (G+1) x (N+1) cu valoarea infinit (INF).",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "INF", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Tabloul A",
          "groups": [[{ "val": "2" }, { "val": "4" }, { "val": "6" }, { "val": "8" }]]
        }
      ]
    },
    {
      "line": 44,
      "text": "Setăm cazul de bază: dp[0][0] = 0 (costul de a împărți 0 elemente în 0 grupuri este 0).",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 1, "c": 1}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Tabloul A",
          "groups": [[{ "val": "2" }, { "val": "4" }, { "val": "6" }, { "val": "8" }]]
        }
      ]
    },
    {
      "line": 45,
      "text": "Restul coloanelor pentru i=0 sunt setate la INF, deoarece nu putem forma 0 grupuri din j > 0 elemente.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Tabloul A",
          "groups": [[{ "val": "2" }, { "val": "4" }, { "val": "6" }, { "val": "8" }]]
        }
      ]
    },
    {
      "line": 50,
      "text": "Intrăm în bucla principală pentru grupul i = 1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Tabloul A",
          "groups": [[{ "val": "2" }, { "val": "4" }, { "val": "6" }, { "val": "8" }]]
        }
      ]
    },
    {
      "line": 51,
      "text": "Apelăm recursiv funcția compute(1, 1, 4, 0, 3) pentru a calcula prima linie (grupul 1) a tabelului DP.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Interval de Stări & Căutare",
          "groups": [
            [{ "val": "l=1" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Verificăm dacă l (1) > r (4). Condiția este falsă, continuăm.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Interval de Stări & Căutare",
          "groups": [
            [{ "val": "l=1" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm starea de la mijloc: mid = (1 + 4) / 2 = 2.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "INF", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Calculat",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=2", "active": true }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Parcurgem k în intervalul [optL, min(mid-1, optR)] = [0, 1]. Pentru k=0: dp[0][0] + cost(0,2) = 0 + 6^2 = 36. Pentru k=1: dp[0][1] + cost(1,2) = INF. Cel mai bun cost este 36, obținut pentru opt = 0.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": [{"r": 1, "c": 1}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Găsită",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=2" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "opt=0", "sorted": true }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Apelăm recursiv compute(1, 1, 1, 0, 0) pentru jumătatea stângă a intervalului, reducând intervalul optR la opt = 0.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Stângă",
          "groups": [
            [{ "val": "l=1" }, { "val": "r=1" }],
            [{ "val": "optL=0" }, { "val": "optR=0" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "În apelul secundar pentru stânga, calculăm mid = (1 + 1) / 2 = 1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "INF", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Stânga",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=1", "active": true }, { "val": "r=1" }],
            [{ "val": "optL=0" }, { "val": "optR=0" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm k în intervalul [0, 0]. Singura tranziție este k=0: dp[0][0] + cost(0,1) = 0 + 2^2 = 4. Salvăm dp[1][1] = 4, opt = 0.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": [{"r": 1, "c": 1}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Găsită",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=1" }, { "val": "r=1" }],
            [{ "val": "optL=0" }, { "val": "opt=0", "sorted": true }, { "val": "optR=0" }]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Apelăm compute(1, 1, 0, 0, 0) pentru subproblema din stânga.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Stângă a Stângii",
          "groups": [
            [{ "val": "l=1" }, { "val": "r=0" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Întrucât l (1) > r (0), revenim din recursivitate.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": []
    },
    {
      "line": 37,
      "text": "Apelăm compute(1, 2, 1, 0, 0) pentru subproblema din dreapta.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Dreaptă a Stângii",
          "groups": [
            [{ "val": "l=2" }, { "val": "r=1" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Întrucât l (2) > r (1), revenim din recursivitate la apelul inițial compute(1, 1, 4, 0, 3).",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": []
    },
    {
      "line": 37,
      "text": "Apelăm compute(1, 3, 4, 0, 3) pentru a calcula stările din dreapta lui mid=2, restricționând optL la opt = 0.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Dreaptă",
          "groups": [
            [{ "val": "l=3" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm mid = (3 + 4) / 2 = 3.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "INF", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 4}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Dreapta",
          "groups": [
            [{ "val": "l=3" }, { "val": "mid=3", "active": true }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm k în intervalul [0, 2]. Singura tranziție validă este k=0: dp[0][0] + cost(0,3) = 0 + 12^2 = 144. Salvăm dp[1][3] = 144, opt = 0.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 4}],
        "highlightCells": [{"r": 1, "c": 1}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Găsită",
          "groups": [
            [{ "val": "l=3" }, { "val": "mid=3" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "opt=0", "sorted": true }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Apelăm recursiv compute(1, 3, 2, 0, 0), care se întoarce imediat deoarece l (3) > r (2).",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": []
    },
    {
      "line": 37,
      "text": "Apelăm recursiv compute(1, 4, 4, 0, 3) pentru a calcula ultima stare din grupul 1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Dreaptă a Dreptei",
          "groups": [
            [{ "val": "l=4" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm mid = 4.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "INF"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 5}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Dreapta",
          "groups": [
            [{ "val": "l=4" }, { "val": "mid=4", "active": true }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm k în intervalul [0, 3]. Cel mai bun cost este pentru k=0: dp[0][0] + cost(0,4) = 400. Salvăm dp[1][4] = 400, opt = 0.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 2, "c": 5}],
        "highlightCells": [{"r": 1, "c": 1}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Găsită",
          "groups": [
            [{ "val": "l=4" }, { "val": "mid=4" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "opt=0", "sorted": true }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 50,
      "text": "Revenim în main. Am terminat calculul grupului i = 1. Trecem la grupul i = 2.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": []
    },
    {
      "line": 51,
      "text": "Apelăm compute(2, 1, 4, 0, 3) pentru a calcula cel de-al doilea grup.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Grupul 2 Stări",
          "groups": [
            [{ "val": "l=1" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm mid = (1 + 4) / 2 = 2.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "INF", "INF", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 3}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Grup 2",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=2", "active": true }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Parcurgem k în intervalul [0, 1]. Pentru k=0: dp[1][0] + cost(0,2) = INF. Pentru k=1: dp[1][1] + cost(1,2) = 4 + 4^2 = 20. Valoarea optimă este 20, obținută pentru opt = 1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "INF", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 3}],
        "highlightCells": [{"r": 2, "c": 2}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Găsită",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=2" }, { "val": "r=4" }],
            [{ "val": "optL=0" }, { "val": "opt=1", "sorted": true }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Apelăm recursiv compute(2, 1, 1, 0, 1) pentru partea stângă, restricționând căutarea la opt = 1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Stângă i=2",
          "groups": [
            [{ "val": "l=1" }, { "val": "r=1" }],
            [{ "val": "optL=0" }, { "val": "optR=1" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm mid = 1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "INF", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 2}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Stânga i=2",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=1", "active": true }, { "val": "r=1" }],
            [{ "val": "optL=0" }, { "val": "optR=1" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm k în intervalul [0, 0]. Deoarece dp[1][0] este INF, rezultatul rămâne INF, iar opt = -1.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "INF", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 2}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Nicio Tranziție Validă",
          "groups": [
            [{ "val": "l=1" }, { "val": "mid=1" }, { "val": "r=1" }],
            [{ "val": "optL=0" }, { "val": "opt=-1", "sorted": true }, { "val": "optR=1" }]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Revenim în apelul anterior compute(2, 1, 4, 0, 3) și apelăm compute(2, 3, 4, 1, 3) pentru stările din dreapta lui mid=2.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "INF", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Dreaptă i=2",
          "groups": [
            [{ "val": "l=3" }, { "val": "r=4" }],
            [{ "val": "optL=1" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm mid = (3 + 4) / 2 = 3.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "INF", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 4}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Dreapta i=2",
          "groups": [
            [{ "val": "l=3" }, { "val": "mid=3", "active": true }, { "val": "r=4" }],
            [{ "val": "optL=1" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm k în [1, 2]. Pentru k=1: dp[1][1] + cost(1,3) = 4 + 10^2 = 104. Pentru k=2: dp[1][2] + cost(2,3) = 36 + 6^2 = 72. Cel mai bun cost este 72, pentru opt = 2.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "72", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 4}],
        "highlightCells": [{"r": 2, "c": 3}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Găsită",
          "groups": [
            [{ "val": "l=3" }, { "val": "mid=3" }, { "val": "r=4" }],
            [{ "val": "optL=1" }, { "val": "opt=2", "sorted": true }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 37,
      "text": "Apelăm recursiv compute(2, 4, 4, 2, 3) pentru a calcula ultima stare a programului.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "72", "INF"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Jumătatea Dreaptă a Dreptei i=2",
          "groups": [
            [{ "val": "l=4" }, { "val": "r=4" }],
            [{ "val": "optL=2" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Calculăm mid = 4.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "72", "INF"]
        ],
        "activeCells": [{"r": 3, "c": 5}],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Mijloc Dreapta i=2",
          "groups": [
            [{ "val": "l=4" }, { "val": "mid=4", "active": true }, { "val": "r=4" }],
            [{ "val": "optL=2" }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Căutăm k în [2, 3]. Pentru k=2: dp[1][2] + cost(2,4) = 36 + 14^2 = 232. Pentru k=3: dp[1][3] + cost(3,4) = 144 + 8^2 = 208. Costul minim este 208, pentru opt = 3.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "72", "208"]
        ],
        "activeCells": [{"r": 3, "c": 5}],
        "highlightCells": [{"r": 2, "c": 4}]
      },
      "blocksVisual": [
        {
          "label": "Tranziție Finală",
          "groups": [
            [{ "val": "l=4" }, { "val": "mid=4" }, { "val": "r=4" }],
            [{ "val": "optL=2" }, { "val": "opt=3", "sorted": true }, { "val": "optR=3" }]
          ]
        }
      ]
    },
    {
      "line": 54,
      "text": "Revenim în main și afișăm rezultatul final: Cost minim: 208.",
      "matrix": {
        "headers": ["i \\ j", "0", "1", "2", "3", "4"],
        "data": [
          ["i = 0", "0", "INF", "INF", "INF", "INF"],
          ["i = 1", "INF", "4", "36", "144", "400"],
          ["i = 2", "INF", "INF", "20", "72", "208"]
        ],
        "activeCells": [],
        "highlightCells": []
      },
      "blocksVisual": [
        {
          "label": "Rezultat Final",
          "groups": [[{ "val": "Cost minim: 208", "sorted": true }]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Subarray Partitioning",
        "url": "https://codeforces.com/problemset/problem/311/B",
        "desc": "Optimizare D&C pentru a împărți pisicile în grupuri în timp optim."
      }
    ],
    "medium": [
      {
        "title": "Guardians of the Luniverse",
        "url": "https://open.kattis.com/problems/guardians",
        "desc": "Problema clasică de partiționare a unui vector cu cost bazat pe sume."
      }
    ],
    "hard": [
      {
        "title": "Laruby and Division",
        "url": "https://codeforces.com/problemset/problem/868/F",
        "desc": "Optimizare D&C unde cost(k, j) este calculat online folosind tehnica two-pointers în timp amortizat."
      }
    ]
  },
  "globalVars": [
    {
      "name": "N",
      "type": "int",
      "val": "4",
      "expandable": false
    },
    {
      "name": "G",
      "type": "int",
      "val": "2",
      "expandable": false
    },
    {
      "name": "A",
      "type": "std::vector<long long>",
      "val": "{2, 4, 6, 8}",
      "expandable": false
    },
    {
      "name": "pref",
      "type": "std::vector<long long>",
      "val": "{0, 2, 6, 12, 20}",
      "expandable": false
    },
    {
      "name": "dp",
      "type": "std::vector<std::vector<long long>>",
      "val": "DP table",
      "expandable": true
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "N", type: "int", val: "4", expandable: false });
      globalVars.push({ name: "G", type: "int", val: "2", expandable: false });
      globalVars.push({ name: "A", type: "std::vector<long long>", val: "{2, 4, 6, 8}", expandable: false });
      globalVars.push({ name: "pref", type: "std::vector<long long>", val: "{0, 2, 6, 12, 20}", expandable: false });
      globalVars.push({ name: "dp", type: "std::vector<std::vector<long long>>", val: "DP table", expandable: true });

      const stackStates = {
        5:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        6:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        7:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        8:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        9:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        10: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }],
        11: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }],
        12: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }],
        13: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 1, r: 0, optL: 0, optR: 0 }],
        14: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 1, r: 0, optL: 0, optR: 0 }],
        15: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 2, r: 1, optL: 0, optR: 0 }],
        16: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 2, r: 1, optL: 0, optR: 0 }],
        17: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }],
        18: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }],
        19: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 2, optL: 0, optR: 0 }],
        20: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 4, r: 4, optL: 0, optR: 3 }],
        21: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 4, r: 4, optL: 0, optR: 3 }],
        22: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 4, r: 4, optL: 0, optR: 3 }],
        24: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }],
        25: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }],
        26: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }],
        27: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 1, r: 1, optL: 0, optR: 1 }],
        28: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 1, r: 1, optL: 0, optR: 1 }],
        29: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 1, r: 1, optL: 0, optR: 1 }],
        30: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }],
        31: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }],
        32: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }, { i: 2, l: 4, r: 4, optL: 2, optR: 3 }],
        33: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }, { i: 2, l: 4, r: 4, optL: 2, optR: 3 }],
        34: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }, { i: 2, l: 4, r: 4, optL: 2, optR: 3 }],
      };

      if (stepIndex <= 4) {
        frames.push({ name: "main()", file: "main.cpp", line: stepIndex === 0 ? 40 : (stepIndex === 1 ? 41 : (stepIndex === 2 ? 44 : (stepIndex === 3 ? 45 : 50))) });
      } else if (stepIndex >= 5 && stepIndex <= 34) {
        const activeStack = stackStates[stepIndex] || [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }];
        activeStack.forEach((st, fIdx) => {
          const isTop = fIdx === activeStack.length - 1;
          frames.unshift({
            name: `compute(i = ${st.i}, l = ${st.l}, r = ${st.r}, optL = ${st.optL}, optR = ${st.optR})`,
            file: "solution.cpp",
            line: isTop ? activeLine : 36
          });
        });

        const topFrame = activeStack[activeStack.length - 1];
        vars.push({ name: "i", type: "int", val: topFrame.i.toString(), expandable: false });
        vars.push({ name: "l", type: "int", val: topFrame.l.toString(), expandable: false });
        vars.push({ name: "r", type: "int", val: topFrame.r.toString(), expandable: false });
        vars.push({ name: "optL", type: "int", val: topFrame.optL.toString(), expandable: false });
        vars.push({ name: "optR", type: "int", val: topFrame.optR.toString(), expandable: false });

        let mid = -1;
        if (stepIndex === 7 || stepIndex === 8 || stepIndex === 9) mid = 2;
        else if (stepIndex === 10 || stepIndex === 11 || stepIndex === 12) mid = 1;
        else if (stepIndex === 17 || stepIndex === 18 || stepIndex === 19) mid = 3;
        else if (stepIndex === 21 || stepIndex === 22) mid = 4;
        else if (stepIndex === 25 || stepIndex === 26 || stepIndex === 27) mid = 2;
        else if (stepIndex === 28 || stepIndex === 29) mid = 1;
        else if (stepIndex === 30 || stepIndex === 31 || stepIndex === 32) mid = 3;
        else if (stepIndex === 33 || stepIndex === 34) mid = 4;

        if (mid !== -1) {
          vars.push({ name: "mid", type: "int", val: mid.toString(), expandable: false });
        }

        let opt = -1;
        if (stepIndex === 8 || stepIndex === 9) opt = 0;
        else if (stepIndex === 11 || stepIndex === 12) opt = 0;
        else if (stepIndex === 18 || stepIndex === 19) opt = 0;
        else if (stepIndex === 22) opt = 0;
        else if (stepIndex === 26 || stepIndex === 27) opt = 1;
        else if (stepIndex === 29) opt = -1;
        else if (stepIndex === 31 || stepIndex === 32) opt = 2;
        else if (stepIndex === 34) opt = 3;

        if (opt !== -1) {
          vars.push({ name: "opt", type: "int", val: opt.toString(), expandable: false });
        }

        frames.push({ name: "main()", file: "main.cpp", line: 51 });
      } else if (stepIndex >= 35) {
        frames.push({ name: "main()", file: "main.cpp", line: stepIndex === 35 ? 54 : 55 });
      }

      if (stepIndex >= 5 && stepIndex <= 34) {
        const activeStack = stackStates[stepIndex] || [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }];
        const topFrame = activeStack[activeStack.length - 1];
        inlineVal = `i: ${topFrame.i}, l: ${topFrame.l}, r: ${topFrame.r}, optL: ${topFrame.optL}, optR: ${topFrame.optR}`;
      } else if (stepIndex >= 35) {
        inlineVal = `dp[2][4]: 208`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const stackStates = {
        5:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        6:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        7:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        8:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        9:  [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }],
        10: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }],
        11: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }],
        12: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }],
        13: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 1, r: 0, optL: 0, optR: 0 }],
        14: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 1, r: 0, optL: 0, optR: 0 }],
        15: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 2, r: 1, optL: 0, optR: 0 }],
        16: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 1, r: 1, optL: 0, optR: 0 }, { i: 1, l: 2, r: 1, optL: 0, optR: 0 }],
        17: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }],
        18: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }],
        19: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 2, optL: 0, optR: 0 }],
        20: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 4, r: 4, optL: 0, optR: 3 }],
        21: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 4, r: 4, optL: 0, optR: 3 }],
        22: [{ i: 1, l: 1, r: 4, optL: 0, optR: 3 }, { i: 1, l: 3, r: 4, optL: 0, optR: 3 }, { i: 1, l: 4, r: 4, optL: 0, optR: 3 }],
        24: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }],
        25: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }],
        26: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }],
        27: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 1, r: 1, optL: 0, optR: 1 }],
        28: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 1, r: 1, optL: 0, optR: 1 }],
        29: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 1, r: 1, optL: 0, optR: 1 }],
        30: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }],
        31: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }],
        32: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }, { i: 2, l: 4, r: 4, optL: 2, optR: 3 }],
        33: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }, { i: 2, l: 4, r: 4, optL: 2, optR: 3 }],
        34: [{ i: 2, l: 1, r: 4, optL: 0, optR: 3 }, { i: 2, l: 3, r: 4, optL: 1, optR: 3 }, { i: 2, l: 4, r: 4, optL: 2, optR: 3 }],
      };

      if (stepIndex >= 5 && stepIndex <= 34) {
        const activeStack = stackStates[stepIndex];
        if (activeStack) {
          const topFrame = activeStack[activeStack.length - 1];
          if (lineNum === 21) {
            return `i: ${topFrame.i}, l: ${topFrame.l}, r: ${topFrame.r}, optL: ${topFrame.optL}, optR: ${topFrame.optR}`;
          }
          if (lineNum === 24) {
            let mid = Math.floor((topFrame.l + topFrame.r) / 2);
            return `mid: ${mid}`;
          }
        }
      }
      return null;
    }
  }
};
