export const data = {
  "presentation": `### Prezentare Generală

Numerele Catalan formează un șir de numere naturale care apare extrem de frecvent în combinatorică și în probleme de numărare structurală. Acest șir este numit după matematicianul belgian Eugène Charles Catalan.

Formula generală de recurență pentru cel de-al $n$-lea număr Catalan este:
$C_0 = 1$
$C_n = \\sum_{j=0}^{n-1} C_j \\cdot C_{n-1-j} \\quad \\text{pentru } n \\ge 1$

Vizual, fiecare termen $C_n$ se bazează pe combinarea tuturor perechilor anterioare de numere Catalan ale căror indici însumează $n - 1$. Acest tip de descompunere este specific structurilor recursive precum arborii binari sau parantezările corecte.`,
  "complexity": `### Complexitate

- **Timp:** $O(n^2)$ — deoarece folosim două bucle imbricate (pentru $i$ de la $1$ la $n$ și pentru $j$ de la $0$ la $i-1$) pentru a calcula fiecare număr Catalan consecutiv.
- **Spațiu:** $O(n)$ — utilizăm un vector de dimensiune $n + 1$ pentru a stoca valorile intermediate calculate anterior (programare dinamică).`,
  "variations": `### Variații și Edge Cases

1. **Calcul Direct în $O(n)$:**
   Folosind coeficienți binomiali, al $n$-lea număr Catalan poate fi scris ca:
   $C_n = \\frac{1}{n+1} \\binom{2n}{n} = \\frac{(2n)!}{(n+1)!n!}$
   Putem calcula această valoare în timp liniar $O(n)$ folosind înmulțiri succesive și inversul modular.

2. **Cazul $n = 0$:**
   Prin definiție, $C_0 = 1$. Codul inițializează direct acest element în vector, servind ca bază pentru toate recurențele viitoare.

3. **Prevenirea Overflow-ului:**
   Numerele Catalan cresc exponențial (aproximativ ca $\\frac{4^n}{n^{3/2}\\sqrt{\\pi}}$). Prin urmare, pentru un $n$ relativ mic (de ex. $n > 30$), valorile depășesc limitele tipului standard de date pe 64 de biți (\`long long\`). Utilizarea unui modul (\`mod\`) este esențială în competițiile de programare.`,
  "applications": `### Aplicații

- **Parantezări corecte:** Numărul de șiruri de paranteze rotunde corect formate de lungime $2n$ (de ex., pentru $n = 3$, avem $C_3 = 5$ moduri: \`((()))\`, \`(()())\`, \`(())()\`, \`()(())\`, \`()()()\`).
- **Arbori binari de căutare:** Numărul de arbori binari structural diferiți care pot fi construiți folosind $n$ chei unice.
- **Triangularea poligoanelor:** Numărul de moduri în care un poligon convex cu $n+2$ laturi poate fi divizat în triunghiuri prin desenarea de diagonale neintersectabile.
- **Drumuri pe rețea (Dyck paths):** Numărul de drumuri pe o rețea de dimensiune $n \\times n$ care merg de la $(0,0)$ la $(n,n)$ folosind doar pași la dreapta și în sus, fără a depăși diagonala principală $y = x$.`,
  "code": `#include <iostream>
#include <vector>

using namespace std;

void computeCatalan(int n, int mod) {
    vector<long long> C(n + 1, 0);
    C[0] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            C[i] = (C[i] + C[j] * C[i - 1 - j]) % mod;
        }
    }
    cout << "C[" << n << "] = " << C[n] << endl;
}

int main() {
    computeCatalan(4, 1000000007);
    return 0;
}
`,
  "explanations": [
    {
      "line": 18,
      "text": "Se apelează funcția `computeCatalan` din funcția principală `main()`, setând $n = 4$ și un modul standard $mod = 1000000007$.",
      "blocksVisual": [
        {
          "label": "Stare inițială",
          "groups": [
            [
              { "val": "C neinițializat", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în funcția `computeCatalan` primind parametrii $n = 4$ și $mod = 1000000007$.",
      "blocksVisual": [
        {
          "label": "Parametri",
          "groups": [
            [
              { "val": "n = 4", "active": true },
              { "val": "mod = 1000000007", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Inițializăm vectorul `C` de dimensiune $n + 1 = 5$ (pentru a stoca indicii de la $0$ la $4$) cu toate elementele setate pe $0$.",
      "blocksVisual": [
        {
          "label": "Vectorul C (inițializat cu 0)",
          "groups": [
            [
              { "val": "C[0] = 0", "active": false },
              { "val": "C[1] = 0", "active": false },
              { "val": "C[2] = 0", "active": false },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Setați primul număr Catalan $C_0 = 1$. Acesta este cazul de bază fundamental, reprezentând de exemplu un singur mod de a paranteza $0$ elemente.",
      "blocksVisual": [
        {
          "label": "Cazul de bază C[0]",
          "groups": [
            [
              { "val": "C[0] = 1", "active": true },
              { "val": "C[1] = 0", "active": false },
              { "val": "C[2] = 0", "active": false },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Inițiem bucla exterioară cu indexul $i = 1$. Deoarece $i = 1 \\le 4$, bucla continuă pentru a calcula $C_1$.",
      "blocksVisual": [
        {
          "label": "Buclă exterioară (i = 1)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 0", "active": true },
              { "val": "C[2] = 0", "active": false },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Intrăm în bucla interioară cu indexul de sumare $j = 0$. Condiția $j < i$ ($0 < 1$) este adevărată, deci executăm corpul buclei.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 1, j = 0)",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 0", "active": true },
              { "val": "C[2] = 0", "active": false },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la valoarea curentă $C_1$ produsul $C_0 \\cdot C_0 = 1 \\cdot 1 = 1$. Deci $C_1$ devine $1$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[1] = C[1] + C[0]*C[0]",
          "groups": [
            [
              { "val": "C[0] = 1 (j, i-1-j)", "sorted": true },
              { "val": "C[1] = 1", "active": true },
              { "val": "C[2] = 0", "active": false },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $1$. Deoarece $j < i$ ($1 < 1$) devine fals, terminăm bucla interioară pentru $i = 1$.",
      "blocksVisual": [
        {
          "label": "Final buclă interioară (i = 1)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": true },
              { "val": "C[2] = 0", "active": false },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Incrementăm $i$ la $2$. Condiția $i \\le 4$ este adevărată, deci începem calculul pentru $C_2$.",
      "blocksVisual": [
        {
          "label": "Buclă exterioară (i = 2)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 0", "active": true },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm bucla interioară pentru $i = 2$ cu $j = 0$. Condiția $j < 2$ este adevărată.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 2, j = 0)",
          "groups": [
            [
              { "val": "C[0] = 1 (j)", "sorted": true },
              { "val": "C[1] = 1 (i-1-j)", "sorted": true },
              { "val": "C[2] = 0", "active": true },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_2$ primul termen: $C_0 \\cdot C_1 = 1 \\cdot 1 = 1$. Deci $C_2$ devine $1$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[2] = C[2] + C[0]*C[1]",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 1", "sorted": true },
              { "val": "C[2] = 1", "active": true },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $1$. Condiția $j < 2$ este adevărată, deci continuăm.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 2, j = 1)",
          "groups": [
            [
              { "val": "C[0] = 1 (i-1-j)", "sorted": true },
              { "val": "C[1] = 1 (j)", "sorted": true },
              { "val": "C[2] = 1", "active": true },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_2$ al doilea termen: $C_1 \\cdot C_0 = 1 \\cdot 1 = 1$. Deci $C_2$ devine $1 + 1 = 2$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[2] = C[2] + C[1]*C[0]",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 1", "sorted": true },
              { "val": "C[2] = 2", "active": true },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $2$. Condiția $j < 2$ devine falsă, finalizând calculul pentru $C_2 = 2$.",
      "blocksVisual": [
        {
          "label": "Final buclă interioară (i = 2)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": true },
              { "val": "C[3] = 0", "active": false },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Incrementăm $i$ la $3$. Condiția $i \\le 4$ este adevărată, deci trecem la calculul pentru $C_3$.",
      "blocksVisual": [
        {
          "label": "Buclă exterioară (i = 3)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 0", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm bucla interioară pentru $i = 3$ cu $j = 0$. Condiția $j < 3$ este adevărată.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 3, j = 0)",
          "groups": [
            [
              { "val": "C[0] = 1 (j)", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2 (i-1-j)", "sorted": true },
              { "val": "C[3] = 0", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_3$ primul termen: $C_0 \\cdot C_2 = 1 \\cdot 2 = 2$. $C_3$ devine $2$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[3] = C[3] + C[0]*C[2]",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "sorted": true },
              { "val": "C[3] = 2", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $1$. Condiția $j < 3$ este adevărată, deci mergem la pasul următor.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 3, j = 1)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1 (j, i-1-j)", "sorted": true },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 2", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_3$ al doilea termen: $C_1 \\cdot C_1 = 1 \\cdot 1 = 1$. Astfel, $C_3$ devine $2 + 1 = 3$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[3] = C[3] + C[1]*C[1]",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "sorted": true },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 3", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $2$. Deoarece $j < 3$, continuăm cu ultimul termen din sumă.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 3, j = 2)",
          "groups": [
            [
              { "val": "C[0] = 1 (i-1-j)", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2 (j)", "sorted": true },
              { "val": "C[3] = 3", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_3$ al treilea termen: $C_2 \\cdot C_0 = 2 \\cdot 1 = 2$. $C_3$ devine $3 + 2 = 5$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[3] = C[3] + C[2]*C[0]",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "sorted": true },
              { "val": "C[3] = 5", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $3$. Condiția $j < 3$ devine falsă. Terminăm calculul pentru $C_3 = 5$.",
      "blocksVisual": [
        {
          "label": "Final buclă interioară (i = 3)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5", "active": true },
              { "val": "C[4] = 0", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Incrementăm $i$ la $4$. Condiția $i \\le 4$ este adevărată, deci trecem la calculul ultimului număr Catalan, $C_4$.",
      "blocksVisual": [
        {
          "label": "Buclă exterioară (i = 4)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm bucla interioară pentru $i = 4$ cu $j = 0$. Condiția $j < 4$ este adevărată.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 4, j = 0)",
          "groups": [
            [
              { "val": "C[0] = 1 (j)", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5 (i-1-j)", "sorted": true },
              { "val": "C[4] = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_4$ primul termen: $C_0 \\cdot C_3 = 1 \\cdot 5 = 5$. Deci $C_4$ devine $5$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[4] = C[4] + C[0]*C[3]",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5", "sorted": true },
              { "val": "C[4] = 5", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $1$. Condiția $j < 4$ este adevărată, continuăm.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 4, j = 1)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1 (j)", "sorted": true },
              { "val": "C[2] = 2 (i-1-j)", "sorted": true },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 5", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_4$ al doilea termen: $C_1 \\cdot C_2 = 1 \\cdot 2 = 2$. $C_4$ devine $5 + 2 = 7$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[4] = C[4] + C[1]*C[2]",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "sorted": true },
              { "val": "C[2] = 2", "sorted": true },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 7", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $2$. Condiția $j < 4$ este adevărată.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 4, j = 2)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1 (i-1-j)", "sorted": true },
              { "val": "C[2] = 2 (j)", "sorted": true },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 7", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_4$ al treilea termen: $C_2 \\cdot C_1 = 2 \\cdot 1 = 2$. $C_4$ devine $7 + 2 = 9$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[4] = C[4] + C[2]*C[1]",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "sorted": true },
              { "val": "C[2] = 2", "sorted": true },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 9", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $3$. Condiția $j < 4$ este adevărată, deci adăugăm și ultimul produs.",
      "blocksVisual": [
        {
          "label": "Buclă interioară (i = 4, j = 3)",
          "groups": [
            [
              { "val": "C[0] = 1 (i-1-j)", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5 (j)", "sorted": true },
              { "val": "C[4] = 9", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Adăugăm la $C_4$ al patrulea termen: $C_3 \\cdot C_0 = 5 \\cdot 1 = 5$. Rezultatul final obținut pentru $C_4$ este $9 + 5 = 14$.",
      "blocksVisual": [
        {
          "label": "Calcul: C[4] = C[4] + C[3]*C[0]",
          "groups": [
            [
              { "val": "C[0] = 1", "sorted": true },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5", "sorted": true },
              { "val": "C[4] = 14", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Incrementăm $j$ la $4$. Condiția $j < i$ ($4 < 4$) devine falsă. Ieșim din bucla interioară.",
      "blocksVisual": [
        {
          "label": "Final buclă interioară (i = 4)",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 14", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Incrementăm $i$ la $5$. Deoarece condiția $i \\le 4$ ($5 \\le 4$) este falsă, ieșim din bucla exterioară.",
      "blocksVisual": [
        {
          "label": "Ieșire buclă exterioară",
          "groups": [
            [
              { "val": "C[0] = 1", "active": false },
              { "val": "C[1] = 1", "active": false },
              { "val": "C[2] = 2", "active": false },
              { "val": "C[3] = 5", "active": false },
              { "val": "C[4] = 14", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Afișăm valoarea finală calculată a lui $C_4$, care este $14$, la ieșirea standard.",
      "blocksVisual": [
        {
          "label": "Afișare",
          "groups": [
            [
              { "val": "Afișat: 14", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Funcția `computeCatalan` se încheie, eliberând resursele locale.",
      "blocksVisual": [
        {
          "label": "Eliberare resurse",
          "groups": [
            [
              { "val": "C eliberat", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Funcția `main()` returnează 0, indicând terminarea cu succes a programului.",
      "blocksVisual": [
        {
          "label": "Program încheiat",
          "groups": [
            [
              { "val": "return 0", "active": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Unique Binary Search Trees",
        "url": "https://leetcode.com/problems/unique-binary-search-trees/",
        "desc": "Calculează numărul de arbori binari de căutare structural unici care pot fi formați cu n chei distincte de la 1 la n."
      }
    ],
    "medium": [
      {
        "title": "Generate Parentheses",
        "url": "https://leetcode.com/problems/generate-parentheses/",
        "desc": "Găsește toate combinațiile valide de paranteze corect închise care pot fi formate din n perechi de paranteze."
      }
    ],
    "hard": [
      {
        "title": "Handshakes That Don't Cross",
        "url": "https://leetcode.com/problems/handshakes-that-dont-cross/",
        "desc": "Calculează numărul de moduri în care n oameni (unde n este par) așezați la o masă rotundă își pot strânge mâinile fără ca strângerile de mână să se intersecteze."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [],
          "frames": [{ "name": "main()", "file": "main.cpp", "line": 18 }],
          "inlineVal": "Apel"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 6 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[0, 0, 0, 0, 0]", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 7 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C: [0, 0, 0, 0, 0]"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 0, 0, 0, 0]", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 8 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[0] = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 0, 0, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 9 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "i = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 0, 0, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "1", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 0"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 0, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "1", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[1] = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 0, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "1", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 1 (fals)"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 0, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 9 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "i = 2"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 0, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "2", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 0"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 1, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "2", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[2] = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 1, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "2", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "2", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[2] = 2"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "2", "expandable": false },
            { "name": "j", "type": "int", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 2 (fals)"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 9 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "i = 3"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 0, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 0"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 2, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[3] = 2"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 2, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 3, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[3] = 3"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 3, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 2"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[3] = 5"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "3", "expandable": false },
            { "name": "j", "type": "int", "val": "3", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 3 (fals)"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 9 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "i = 4"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 0]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 0"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 5]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[4] = 5"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 5]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 1"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 7]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[4] = 7"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 7]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 2"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 9]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[4] = 9"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 9]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "3", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 3"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 14]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "3", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 11 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[4] = 14"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 14]", "expandable": false },
            { "name": "i", "type": "int", "val": "4", "expandable": false },
            { "name": "j", "type": "int", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 10 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "j = 4 (fals)"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 14]", "expandable": false },
            { "name": "i", "type": "int", "val": "5", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 9 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "i = 5 (fals)"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 14]", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 14 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": "C[4] = 14"
        },
        {
          "vars": [
            { "name": "n", "type": "int", "val": "4", "expandable": false },
            { "name": "mod", "type": "int", "val": "1000000007", "expandable": false },
            { "name": "C", "type": "std::vector<long long>", "val": "[1, 1, 2, 5, 14]", "expandable": false }
          ],
          "frames": [
            { "name": "computeCatalan(4, 1000000007)", "file": "main.cpp", "line": 15 },
            { "name": "main()", "file": "main.cpp", "line": 18 }
          ],
          "inlineVal": null
        },
        {
          "vars": [],
          "frames": [{ "name": "main()", "file": "main.cpp", "line": 19 }],
          "inlineVal": "return 0"
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 18 }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const frames = state.frames.map((frame, index) => {
        if (index === 0 && activeLine !== undefined && activeLine !== null) {
          return { ...frame, line: activeLine };
        }
        return frame;
      });
      return { vars: state.vars, globalVars: [], frames, inlineVal: state.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [
        { "18": "Apel" },
        { "6": "n = 4" },
        { "7": "C: [0, 0, 0, 0, 0]" },
        { "8": "C[0] = 1" },
        { "9": "i = 1" },
        { "10": "j = 0" },
        { "11": "C[1] = 1" },
        { "10": "j = 1 (fals)" },
        { "9": "i = 2" },
        { "10": "j = 0" },
        { "11": "C[2] = 1" },
        { "10": "j = 1" },
        { "11": "C[2] = 2" },
        { "10": "j = 2 (fals)" },
        { "9": "i = 3" },
        { "10": "j = 0" },
        { "11": "C[3] = 2" },
        { "10": "j = 1" },
        { "11": "C[3] = 3" },
        { "10": "j = 2" },
        { "11": "C[3] = 5" },
        { "10": "j = 3 (fals)" },
        { "9": "i = 4" },
        { "10": "j = 0" },
        { "11": "C[4] = 5" },
        { "10": "j = 1" },
        { "11": "C[4] = 7" },
        { "10": "j = 2" },
        { "11": "C[4] = 9" },
        { "10": "j = 3" },
        { "11": "C[4] = 14" },
        { "10": "j = 4 (fals)" },
        { "9": "i = 5 (fals)" },
        { "14": "C[4] = 14" },
        { "15": "Ieșire" },
        { "19": "return 0" }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
};
