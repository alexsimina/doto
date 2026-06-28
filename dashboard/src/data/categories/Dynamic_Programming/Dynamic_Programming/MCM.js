export const data = {
  "presentation": "### Prezentare Generală\n\nDeterminarea modului optim de înmulțire a unui șir de matrice (Matrix Chain Multiplication - MCM) este o problemă clasică ce ilustrează utilizarea programării dinamice pe intervale.\n\nDacă avem un șir de matrice $A_1, A_2, \\dots, A_N$ de dimensiuni $p_0 \\times p_1, p_1 \\times p_2, \\dots, p_{N-1} \\times p_N$, operația de înmulțire a matricelor fiind asociativă, orice parantezare validă va produce același rezultat final. Totuși, numărul total de operații elementare (înmulțiri de numere) poate diferi masiv în funcție de ordinea aleasă.\n\nDe exemplu, dacă avem trei matrice:\n- $A_1$ de dimensiune $10 \\times 100$\n- $A_2$ de dimensiune $100 \\times 5$\n- $A_3$ de dimensiune $5 \\times 50$\n\nAvem două parantezări posibile:\n1. $(A_1 \\times A_2) \\times A_3$: înmulțirea $A_1 \\times A_2$ costă $10 \\times 100 \\times 5 = 5000$ operații, generând o matrice de $10 \\times 5$. Înmulțirea rezultatului cu $A_3$ costă $10 \\times 5 \\times 50 = 2500$ operații. În total: $7500$ operații.\n2. $A_1 \\times (A_2 \\times A_3)$: înmulțirea $A_2 \\times A_3$ costă $100 \\times 5 \\times 50 = 25000$ operații, generând o matrice de $100 \\times 50$. Înmulțirea $A_1$ cu rezultatul costă $10 \\times 100 \\times 50 = 50000$ operații. În total: $75000$ operații (de 10 ori mai mult!).\n\n### Formulare DP (Intervale)\n\nDefinim starea:\n- $dp[i][j]$ = numărul minim de înmulțiri scalare necesare pentru a calcula sub-produsul matricelor $A_i \\times \\dots \\times A_j$, unde $1 \\le i \\le j \\le N$.\n\nCazul de bază (interval de lungime 1):\n- $dp[i][i] = 0$, deoarece o singură matrice nu necesită înmulțiri.\n\nTranziția (împărțirea intervalului $[i, j]$ în două sub-intervale $[i, k]$ și $[k+1, j]$):\nPentru fiecare punct de divizare posibil $k$ (unde $i \\le k < j$), calculăm costul combinării celor două părți:\n$$dp[i][j] = \\min_{i \\le k < j} \\left( dp[i][k] + dp[k+1][j] + p_{i-1} \\times p_k \\times p_j \\right)$$",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(N^3)$, deoarece există $\\mathcal{O}(N^2)$ stări (intervale $[i, j]$), iar pentru fiecare interval parcurgem toate punctele de divizare $k$ în timp $\\mathcal{O}(N)$.\n- **Spațiu:** $\\mathcal{O}(N^2)$ pentru stocarea matricei $dp$ de dimensiuni $(N+1) \\times (N+1)$.",
  "variations": "### Variații și Edge Cases\n\n1. **Reconstrucția Parantezării Optime:** Putem stoca un tablou suplimentar $split[i][j] = k$ care reține punctul optim de divizare. Ulterior, o funcție recursivă poate afișa parantezarea (de exemplu, folosind paranteze rotunde `(`, `)`).\n2. **DP pe Structuri Arborescente:** MCM este o formă de programare dinamică pe intervale, o tehnică generală folosită și la probleme precum construirea unui arbore binar de căutare optim sau poligonizarea convexă cu cost minim.\n3. **Edge Cases:**\n   - O singură matrice ($N = 1$): costul este 0.\n   - Dimensiuni invalide sau număr de matrice negativ.",
  "applications": "### Aplicații în Lumea Reală\n\n- **Optimizarea Interogărilor în Baze de Date:** Optimizatoarele SQL determină ordinea optimă de efectuare a operațiilor de JOIN (care se comportă matematic similar cu înmulțirea matricelor în ceea ce privește asociativitatea și costurile de calcul).\n- **Grafică pe Calculator:** Combinarea eficientă a transformărilor geometrice (reprezentate prin matrice) înainte de a fi aplicate pe milioane de vertecși.\n- **Analiză de Algoritmi:** Studiul structurilor de paranteze și gramatici independente de context (cum ar fi algoritmul CYK).",
  "code": `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int matrixChainOrder(vector<int>& p) {
    int n = p.size() - 1;
    vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= n; i++) {
        dp[i][i] = 0;
    }

    for (int L = 2; L <= n; L++) {
        for (int i = 1; i <= n - L + 1; i++) {
            int j = i + L - 1;
            dp[i][j] = 1e9;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                }
            }
        }
    }
    return dp[1][n];
}

int main() {
    vector<int> p = {10, 20, 30, 40, 30};
    int ans = matrixChainOrder(p);
    cout << "Costul minim este " << ans << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 29,
      "text": "Pornim programul. Funcția main începe execuția.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["2", "", "", "", ""],
          ["3", "", "", "", ""],
          ["4", "", "", "", ""]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 30,
      "text": "Inițializăm vectorul de dimensiuni p = {10, 20, 30, 40, 30} corespunzător matricelor A1(10x20), A2(20x30), A3(30x40), A4(40x30).",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["2", "", "", "", ""],
          ["3", "", "", "", ""],
          ["4", "", "", "", ""]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 31,
      "text": "Apelăm funcția matrixChainOrder(p) pentru a determina numărul minim de înmulțiri scalare.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["2", "", "", "", ""],
          ["3", "", "", "", ""],
          ["4", "", "", "", ""]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 7,
      "text": "Calculăm numărul de matrice: n = p.size() - 1 = 4.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "", "", "", ""],
          ["2", "", "", "", ""],
          ["3", "", "", "", ""],
          ["4", "", "", "", ""]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 8,
      "text": "Alocăm matricea dp de dimensiune (n+1) x (n+1) = 5 x 5 inițializată cu 0.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "0", "0", "0"],
          ["2", "0", "0", "0", "0"],
          ["3", "0", "0", "0", "0"],
          ["4", "0", "0", "0", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 10,
      "text": "Începem setarea cazurilor de bază. Pentru intervale de lungime 1 (matrice individuale), costul este 0.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "i = 1: dp[1][1] = 0 (A1 singură).",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 1}],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "i = 2: dp[2][2] = 0 (A2 singură).",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 1, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "i = 3: dp[3][3] = 0 (A3 singură).",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "i = 4: dp[4][4] = 0 (A4 singură).",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 3, "c": 4}],
        "highlightCells": []
      }
    },
    {
      "line": 14,
      "text": "Intrăm în bucla principală pentru lungimi de interval L de la 2 la n. Începem cu L = 2.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 17,
      "text": "L = 2, i = 1: Calculăm intervalul [1, 2] (A1 * A2). Inițializăm dp[1][2] = INF.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "INF", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 2}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "k = 1: cost = dp[1][1] + dp[2][2] + p[0]*p[1]*p[2] = 0 + 0 + 10*20*30 = 6000. Actualizăm dp[1][2] = 6000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "", ""],
          ["2", "", "0", "", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 2}],
        "highlightCells": [{"r": 0, "c": 1}, {"r": 1, "c": 2}]
      }
    },
    {
      "line": 17,
      "text": "L = 2, i = 2: Calculăm intervalul [2, 3] (A2 * A3). Inițializăm dp[2][3] = INF.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "", ""],
          ["2", "", "0", "INF", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 1, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "k = 2: cost = dp[2][2] + dp[3][3] + p[1]*p[2]*p[3] = 0 + 0 + 20*30*40 = 24000. Actualizăm dp[2][3] = 24000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", ""],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 1, "c": 3}],
        "highlightCells": [{"r": 1, "c": 2}, {"r": 2, "c": 3}]
      }
    },
    {
      "line": 17,
      "text": "L = 2, i = 3: Calculăm intervalul [3, 4] (A3 * A4). Inițializăm dp[3][4] = INF.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", "INF"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 2, "c": 4}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "k = 3: cost = dp[3][3] + dp[4][4] + p[2]*p[3]*p[4] = 0 + 0 + 30*40*30 = 36000. Actualizăm dp[3][4] = 36000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 2, "c": 4}],
        "highlightCells": [{"r": 2, "c": 3}, {"r": 3, "c": 4}]
      }
    },
    {
      "line": 14,
      "text": "Trecem la lungimea de interval L = 3.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 17,
      "text": "L = 3, i = 1: Calculăm intervalul [1, 3] (A1 * A2 * A3). Inițializăm dp[1][3] = INF.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "INF", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 3}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "k = 1: cost = dp[1][1] + dp[2][3] + p[0]*p[1]*p[3] = 0 + 24000 + 10*20*40 = 32000. Setăm dp[1][3] = 32000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "32000", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 3}],
        "highlightCells": [{"r": 0, "c": 1}, {"r": 1, "c": 3}]
      }
    },
    {
      "line": 21,
      "text": "k = 2: cost = dp[1][2] + dp[3][3] + p[0]*p[2]*p[3] = 6000 + 0 + 10*30*40 = 18000. Deoarece 18000 < 32000, actualizăm dp[1][3] = 18000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", ""],
          ["2", "", "0", "24000", ""],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 3}],
        "highlightCells": [{"r": 0, "c": 2}, {"r": 2, "c": 3}]
      }
    },
    {
      "line": 17,
      "text": "L = 3, i = 2: Calculăm intervalul [2, 4] (A2 * A3 * A4). Inițializăm dp[2][4] = INF.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", ""],
          ["2", "", "0", "24000", "INF"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 1, "c": 4}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "k = 2: cost = dp[2][2] + dp[3][4] + p[1]*p[2]*p[4] = 0 + 36000 + 20*30*30 = 54000. Setăm dp[2][4] = 54000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", ""],
          ["2", "", "0", "24000", "54000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 1, "c": 4}],
        "highlightCells": [{"r": 1, "c": 2}, {"r": 2, "c": 4}]
      }
    },
    {
      "line": 21,
      "text": "k = 3: cost = dp[2][3] + dp[4][4] + p[1]*p[3]*p[4] = 24000 + 0 + 20*40*30 = 48000. Deoarece 48000 < 54000, actualizăm dp[2][4] = 48000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", ""],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 1, "c": 4}],
        "highlightCells": [{"r": 1, "c": 3}, {"r": 3, "c": 4}]
      }
    },
    {
      "line": 14,
      "text": "Trecem la lungimea maximă de interval L = 4.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", ""],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 17,
      "text": "L = 4, i = 1: Calculăm intervalul [1, 4] (întregul lanț A1 * A2 * A3 * A4). Inițializăm dp[1][4] = INF.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "INF"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 4}],
        "highlightCells": []
      }
    },
    {
      "line": 21,
      "text": "k = 1: cost = dp[1][1] + dp[2][4] + p[0]*p[1]*p[4] = 0 + 48000 + 10*20*30 = 54000. Setăm dp[1][4] = 54000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "54000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 4}],
        "highlightCells": [{"r": 0, "c": 1}, {"r": 1, "c": 4}]
      }
    },
    {
      "line": 21,
      "text": "k = 2: cost = dp[1][2] + dp[3][4] + p[0]*p[2]*p[4] = 6000 + 36000 + 10*30*30 = 51000. Deoarece 51000 < 54000, actualizăm dp[1][4] = 51000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "51000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 4}],
        "highlightCells": [{"r": 0, "c": 2}, {"r": 2, "c": 4}]
      }
    },
    {
      "line": 21,
      "text": "k = 3: cost = dp[1][3] + dp[4][4] + p[0]*p[3]*p[4] = 18000 + 0 + 10*40*30 = 30000. Deoarece 30000 < 51000, actualizăm dp[1][4] = 30000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "30000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 4}],
        "highlightCells": [{"r": 0, "c": 3}, {"r": 3, "c": 4}]
      }
    },
    {
      "line": 26,
      "text": "Returnăm costul minim total determinat dp[1][4] = 30000.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "30000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [{"r": 0, "c": 4}],
        "highlightCells": []
      }
    },
    {
      "line": 31,
      "text": "Salvați rezultatul returnat în variabila ans din main.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "30000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 32,
      "text": "Afișăm rezultatul: \"Costul minim este 30000\".",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "30000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 33,
      "text": "Programul se încheie cu succes returnând 0.",
      "matrix": {
        "headers": ["i \\ j", "1", "2", "3", "4"],
        "data": [
          ["1", "0", "6000", "18000", "30000"],
          ["2", "", "0", "24000", "48000"],
          ["3", "", "", "0", "36000"],
          ["4", "", "", "", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Paranteze (Pbinfo #1928)",
        "url": "https://www.pbinfo.ro/probleme/1928/paranteze",
        "desc": "Determinarea unei parantezări corecte sau calcularea numărului minim de operații pentru structuri simple de paranteze."
      },
      {
        "title": "Minimum Score Triangulation of Polygon (LeetCode 1039)",
        "url": "https://leetcode.com/problems/minimum-score-triangulation-of-polygon/",
        "desc": "Triangularea unui poligon convex cu cost minim, o problemă izomorfă cu Matrix Chain Multiplication."
      }
    ],
    "medium": [
      {
        "title": "Parantezare optimă de matrici (Infoarena podm)",
        "url": "https://www.infoarena.ro/problema/podm",
        "desc": "Problema clasică Matrix Chain Multiplication în care se cere determinarea numărului minim de operații scalare pentru a înmulți un șir de N matrice."
      },
      {
        "title": "Minimum Cost Tree From Leaf Values (LeetCode 1130)",
        "url": "https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/",
        "desc": "Construirea unui arbore binar de căutare din valori frunză date, minimizând suma valorilor nodurilor non-frunză."
      }
    ],
    "hard": [
      {
        "title": "Zuma (Codeforces 607B)",
        "url": "https://codeforces.com/problemset/problem/607/B",
        "desc": "Determinarea numărului minim de secunde pentru a distruge o secvență de bile prin eliminarea palindromurilor, utilizând programare dinamică pe intervale."
      },
      {
        "title": "Remove Boxes (LeetCode 546)",
        "url": "https://leetcode.com/problems/remove-boxes/",
        "desc": "O problemă extrem de dificilă de programare dinamică pe intervale unde starea necesită parametri suplimentari pentru a urmări elementele adiacente similare eliminate."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex <= 1) ? 29 + stepIndex : (stepIndex >= 30 ? 32 + (stepIndex - 30) : 31) });

      if (stepIndex >= 2 && stepIndex <= 29) {
        frames.unshift({ name: "matrixChainOrder(p)", file: "solution.cpp", line: activeLine });
      }

      // Local variables tracking
      if (stepIndex >= 3 && stepIndex <= 29) {
        vars.push({ name: "n", type: "int", val: "4", expandable: false });
        vars.push({ name: "dp", type: "std::vector<std::vector<int>>", val: "size=5x5", expandable: true });
      }

      let L = -1, i = -1, j = -1, k = -1;
      
      if (stepIndex >= 10 && stepIndex <= 12) { L = 2; i = 1; j = 2; }
      else if (stepIndex >= 13 && stepIndex <= 14) { L = 2; i = 2; j = 3; }
      else if (stepIndex >= 15 && stepIndex <= 16) { L = 2; i = 3; j = 4; }
      else if (stepIndex >= 17 && stepIndex <= 17) { L = 3; }
      else if (stepIndex >= 18 && stepIndex <= 20) { L = 3; i = 1; j = 3; }
      else if (stepIndex >= 21 && stepIndex <= 23) { L = 3; i = 2; j = 4; }
      else if (stepIndex >= 24 && stepIndex <= 24) { L = 4; }
      else if (stepIndex >= 25 && stepIndex <= 28) { L = 4; i = 1; j = 4; }

      if (stepIndex === 12) k = 1;
      if (stepIndex === 14) k = 2;
      if (stepIndex === 16) k = 3;
      if (stepIndex === 19) k = 1;
      if (stepIndex === 20) k = 2;
      if (stepIndex === 22) k = 2;
      if (stepIndex === 23) k = 3;
      if (stepIndex === 26) k = 1;
      if (stepIndex === 27) k = 2;
      if (stepIndex === 28) k = 3;

      if (L !== -1) vars.push({ name: "L", type: "int", val: L.toString(), expandable: false });
      if (i !== -1) vars.push({ name: "i", type: "int", val: i.toString(), expandable: false });
      if (j !== -1) vars.push({ name: "j", type: "int", val: j.toString(), expandable: false });
      if (k !== -1) vars.push({ name: "k", type: "int", val: k.toString(), expandable: false });

      if (stepIndex >= 29) {
        vars.push({ name: "ans", type: "int", val: "30000", expandable: false });
      }

      // Inline value calculation
      if (stepIndex >= 10 && stepIndex <= 28) {
        let parts = [];
        if (L !== -1) parts.push(`L: ${L}`);
        if (i !== -1) parts.push(`i: ${i}`);
        if (j !== -1) parts.push(`j: ${j}`);
        if (k !== -1) parts.push(`k: ${k}`);
        inlineVal = parts.join(", ");
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let L = -1, i = -1, j = -1, k = -1;
      
      if (stepIndex >= 10 && stepIndex <= 12) { L = 2; i = 1; j = 2; }
      else if (stepIndex >= 13 && stepIndex <= 14) { L = 2; i = 2; j = 3; }
      else if (stepIndex >= 15 && stepIndex <= 16) { L = 2; i = 3; j = 4; }
      else if (stepIndex >= 17 && stepIndex <= 17) { L = 3; }
      else if (stepIndex >= 18 && stepIndex <= 20) { L = 3; i = 1; j = 3; }
      else if (stepIndex >= 21 && stepIndex <= 23) { L = 3; i = 2; j = 4; }
      else if (stepIndex >= 24 && stepIndex <= 24) { L = 4; }
      else if (stepIndex >= 25 && stepIndex <= 28) { L = 4; i = 1; j = 4; }

      if (stepIndex === 12) k = 1;
      if (stepIndex === 14) k = 2;
      if (stepIndex === 16) k = 3;
      if (stepIndex === 19) k = 1;
      if (stepIndex === 20) k = 2;
      if (stepIndex === 22) k = 2;
      if (stepIndex === 23) k = 3;
      if (stepIndex === 26) k = 1;
      if (stepIndex === 27) k = 2;
      if (stepIndex === 28) k = 3;

      if (lineNum === 14 && L !== -1) return `L = ${L}`;
      if (lineNum === 15 && i !== -1) return `i = ${i}`;
      if (lineNum === 16 && j !== -1) return `j = ${j}`;
      if (lineNum === 18 && k !== -1) return `k = ${k}`;
      if ((lineNum === 19 || lineNum === 20 || lineNum === 21) && k !== -1) {
        return `cost = dp[${i}][${k}] + dp[${k+1}][${j}] + p[${i-1}]*p[${k}]*p[${j}]`;
      }
      return null;
    }
  }
};
