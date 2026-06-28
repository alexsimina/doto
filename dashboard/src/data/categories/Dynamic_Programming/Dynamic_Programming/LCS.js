export const data = {
  "presentation": "### Prezentare Generală\n\nCel Mai Lung Subșir Comun (Longest Common Subsequence - LCS) este o problemă clasică din informatică ce constă în determinarea celui mai lung subșir care apare în ambele șiruri de caractere date, în aceeași ordine relativă, dar nu neapărat pe poziții consecutive.\n\nDe exemplu, dacă avem:\n- $X$ = \"AGGTAB\"\n- $Y$ = \"GXTXAYB\"\nCel mai lung subșir comun este \"GTAB\", care are lungimea 4.\n\n### Formulare DP\nFie $X$ de lungime $M$ și $Y$ de lungime $N$.\nDefinim starea:\n- $dp[i][j]$ = lungimea celui mai lung subșir comun al prefixelor $X[0 \\dots i-1]$ și $Y[0 \\dots j-1]$.\n\nTranzițiile se bazează pe potrivirea caracterelor curente:\n1. **Potrivire ($X[i-1] == Y[j-1]$):** Extindem subșirul comun optim determinat anterior fără aceste caractere:\n   $$dp[i][j] = dp[i-1][j-1] + 1$$\n2. **Nepotrivire ($X[i-1] \\neq Y[j-1]$):** Soluția optimă va fi maximul dintre ignorarea ultimului caracter din $X$ și ignorarea ultimului caracter din $Y$:\n   $$dp[i][j] = \\max(dp[i-1][j], dp[i][j-1])$$\n\n### Cazuri de Bază\nDacă oricare dintre șiruri este vid, lungimea subșirului comun este 0:\n$$dp[i][0] = 0 \\quad \\forall i \\in [0, M]$$\n$$dp[0][j] = 0 \\quad \\forall j \\in [0, N]$$",
  "complexity": "### Complexitate\n\n- **Timp:** $\\mathcal{O}(M \\times N)$, deoarece completăm o matrice de dimensiuni $(M+1) \\times (N+1)$, iar calculul fiecărei celule se realizează în $\\mathcal{O}(1)$.\n- **Spațiu:** $\\mathcal{O}(M \\times N)$ pentru matricea de programare dinamică. Spațiul poate fi optimizat la $\\mathcal{O}(\\min(M, N))$ folosind doar două rânduri în memorie (linia curentă și linia anterioară) dacă dorim doar lungimea subșirului, nu și reconstrucția acestuia.",
  "variations": "### Variații și Edge Cases\n\n1. **Longest Common Substring:** Caracterele din subșir trebuie să fie consecutive în ambele șiruri (tranziția devine $dp[i][j] = dp[i-1][j-1] + 1$ dacă caracterele coincid, respectiv $0$ în caz contrar).\n2. **Edit Distance (Distanța Levenshtein):** Numărul minim de operații (inserare, ștergere, substituire) necesare pentru a transforma un șir în altul.\n3. **Shortest Common Supersequence (SCS):** Cel mai scurt șir care conține ambele șiruri date ca subșiruri (lungimea sa este $M + N - \\text{LCS}(X, Y)$).\n4. **Edge Cases:**\n   - Unul sau ambele șiruri sunt goale.\n   - Niciun caracter nu se potrivește (LCS = 0).\n   - Șirurile sunt identice (LCS = lungimea șirului).",
  "applications": "### Aplicații în Lumea Reală\n\n- **Sisteme de Control al Versiunilor (Git):** Determinarea modificărilor dintre fișiere (`git diff` folosește variații ale algoritmului LCS).\n- **Bioinformatică:** Compararea secvențelor de gene/ADN pentru a măsura gradul de asemănare genetică și evolutivă.\n- **Sisteme Anti-Plagiat:** Identificarea secvențelor de text similare copiate între documente.\n- **Recunoașterea Formelor:** Compararea gesturilor sau a traseelor de mișcare aproximative.",
  code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int lcs(string X, string Y) {
    int m = X.length();
    int n = Y.length();
    
    // DP tabel de (m+1) x (n+1)
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

int main() {
    string X = "AGGTAB";
    string Y = "GXTXAYB";
    cout << "Lungime LCS este " << lcs(X, Y) << endl;
    return 0;
}
`,
  "explanations": [
    {
      "line": 28,
      "text": "Pornim programul. Avem X = 'AGGTAB' (lungime m = 6) și Y = 'GXTXAYB' (lungime n = 7).",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "", "", "", "", "", "", "", ""],
          ["G", "", "", "", "", "", "", "", ""],
          ["G", "", "", "", "", "", "", "", ""],
          ["T", "", "", "", "", "", "", "", ""],
          ["A", "", "", "", "", "", "", "", ""],
          ["B", "", "", "", "", "", "", "", ""]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 12,
      "text": "Inițializăm matricea dp de dimensiuni 7x8 cu 0.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["G", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["G", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["T", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["B", "0", "0", "0", "0", "0", "0", "0", "0"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 19,
      "text": "i = 1 (X[0] = 'A'), j = 1 (Y[0] = 'G'). Comparăm 'A' cu 'G'. Nu este match. dp[1][1] = max(dp[0][1]=0, dp[1][0]=0) = 0.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "", "", "", "", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 1, "c": 2}],
        "highlightCells": [{"r": 0, "c": 2}, {"r": 1, "c": 1}]
      }
    },
    {
      "line": 17,
      "text": "i = 1 (X[0] = 'A'), j = 5 (Y[4] = 'A'). MATCH! 'A' == 'A'. dp[1][5] = dp[0][4] + 1 = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 1, "c": 6}],
        "highlightCells": [{"r": 0, "c": 5}]
      }
    },
    {
      "line": 19,
      "text": "i = 1 (X[0] = 'A'), j = 7 (Y[6] = 'B'). Comparăm 'A' cu 'B'. Mismatch. dp[1][7] = max(dp[0][7]=0, dp[1][6]=1) = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "", "", "", "", "", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 1, "c": 8}],
        "highlightCells": [{"r": 0, "c": 8}, {"r": 1, "c": 7}]
      }
    },
    {
      "line": 17,
      "text": "i = 2 (X[1] = 'G'), j = 1 (Y[0] = 'G'). MATCH! 'G' == 'G'. dp[2][1] = dp[1][0] + 1 = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "", "", "", "", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 2, "c": 2}],
        "highlightCells": [{"r": 1, "c": 1}]
      }
    },
    {
      "line": 19,
      "text": "i = 2 (X[1] = 'G'), j = 2 (Y[1] = 'X'). Mismatch. dp[2][2] = max(dp[1][2]=0, dp[2][1]=1) = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "", "", "", "", ""],
          ["G", "0", "", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 2, "c": 3}],
        "highlightCells": [{"r": 1, "c": 3}, {"r": 2, "c": 2}]
      }
    },
    {
      "line": 19,
      "text": "i = 2 (X[1] = 'G'), j = 5 (Y[4] = 'A'). Mismatch. dp[2][5] = max(dp[1][5]=1, dp[2][4]=1) = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 2, "c": 6}],
        "highlightCells": [{"r": 1, "c": 6}, {"r": 2, "c": 5}]
      }
    },
    {
      "line": 17,
      "text": "i = 3 (X[2] = 'G'), j = 1 (Y[0] = 'G'). MATCH! 'G' == 'G'. dp[3][1] = dp[2][0] + 1 = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "", "", "", "", "", ""],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 3, "c": 2}],
        "highlightCells": [{"r": 2, "c": 1}]
      }
    },
    {
      "line": 19,
      "text": "i = 3 (X[2] = 'G'), j = 3 (Y[2] = 'T'). Mismatch. dp[3][3] = max(dp[2][3]=1, dp[3][2]=1) = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 3, "c": 4}],
        "highlightCells": [{"r": 2, "c": 4}, {"r": 3, "c": 3}]
      }
    },
    {
      "line": 19,
      "text": "i = 4 (X[3] = 'T'), j = 1 (Y[0] = 'G'). Mismatch. dp[4][1] = max(dp[3][1]=1, dp[4][0]=0) = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "", "", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 4, "c": 2}],
        "highlightCells": [{"r": 3, "c": 2}, {"r": 4, "c": 1}]
      }
    },
    {
      "line": 17,
      "text": "i = 4 (X[3] = 'T'), j = 3 (Y[2] = 'T'). MATCH! 'T' == 'T'. dp[4][3] = dp[3][2] + 1 = 1 + 1 = 2.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "", "", "", ""],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 4, "c": 4}],
        "highlightCells": [{"r": 3, "c": 3}]
      }
    },
    {
      "line": 19,
      "text": "i = 4 (X[3] = 'T'), j = 4 (Y[3] = 'X'). Mismatch. dp[4][4] = max(dp[3][4]=1, dp[4][3]=2) = 2.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "", "", "", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 4, "c": 5}],
        "highlightCells": [{"r": 3, "c": 5}, {"r": 4, "c": 4}]
      }
    },
    {
      "line": 19,
      "text": "i = 5 (X[4] = 'A'), j = 3 (Y[2] = 'T'). Mismatch. dp[5][3] = max(dp[4][3]=2, dp[5][2]=1) = 2.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "", "", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 5, "c": 4}],
        "highlightCells": [{"r": 4, "c": 4}, {"r": 5, "c": 3}]
      }
    },
    {
      "line": 17,
      "text": "i = 5 (X[4] = 'A'), j = 5 (Y[4] = 'A'). MATCH! 'A' == 'A'. dp[5][5] = dp[4][4] + 1 = 2 + 1 = 3.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "", ""],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 5, "c": 6}],
        "highlightCells": [{"r": 4, "c": 5}]
      }
    },
    {
      "line": 19,
      "text": "i = 5 (X[4] = 'A'), j = 6 (Y[5] = 'Y'). Mismatch. dp[5][6] = max(dp[4][6]=2, dp[5][5]=3) = 3.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "3", "3"],
          ["B", "0", "", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 5, "c": 7}],
        "highlightCells": [{"r": 4, "c": 7}, {"r": 5, "c": 6}]
      }
    },
    {
      "line": 19,
      "text": "i = 6 (X[5] = 'B'), j = 1 (Y[0] = 'G'). Mismatch. dp[6][1] = max(dp[5][1]=1, dp[6][0]=0) = 1.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "3", "3"],
          ["B", "0", "1", "", "", "", "", "", ""]
        ],
        "activeCells": [{"r": 6, "c": 2}],
        "highlightCells": [{"r": 5, "c": 2}, {"r": 6, "c": 1}]
      }
    },
    {
      "line": 19,
      "text": "i = 6 (X[5] = 'B'), j = 5 (Y[4] = 'A'). Mismatch. dp[6][5] = max(dp[5][5]=3, dp[6][4]=2) = 3.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "3", "3"],
          ["B", "0", "1", "1", "2", "2", "3", "", ""]
        ],
        "activeCells": [{"r": 6, "c": 6}],
        "highlightCells": [{"r": 5, "c": 6}, {"r": 6, "c": 5}]
      }
    },
    {
      "line": 17,
      "text": "i = 6 (X[5] = 'B'), j = 7 (Y[6] = 'B'). MATCH! 'B' == 'B'. dp[6][7] = dp[5][6] + 1 = 3 + 1 = 4.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "3", "3"],
          ["B", "0", "1", "1", "2", "2", "3", "3", "4"]
        ],
        "activeCells": [{"r": 6, "c": 8}],
        "highlightCells": [{"r": 5, "c": 7}]
      }
    },
    {
      "line": 24,
      "text": "Am parcurs toate caracterele. Răspunsul se află în dp[m][n] = dp[6][7] = 4.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "3", "3"],
          ["B", "0", "1", "1", "2", "2", "3", "3", "4"]
        ],
        "activeCells": [{"r": 6, "c": 8}],
        "highlightCells": []
      }
    },
    {
      "line": 30,
      "text": "Afișăm rezultatul final: Lungime LCS este 4.",
      "matrix": {
        "headers": ["", "Ø", "G", "X", "T", "X", "A", "Y", "B"],
        "data": [
          ["Ø", "0", "0", "0", "0", "0", "0", "0", "0"],
          ["A", "0", "0", "0", "0", "0", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["G", "0", "1", "1", "1", "1", "1", "1", "1"],
          ["T", "0", "1", "1", "2", "2", "2", "2", "2"],
          ["A", "0", "1", "1", "2", "2", "3", "3", "3"],
          ["B", "0", "1", "1", "2", "2", "3", "3", "4"]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "LCS CMMDC",
        "url": "https://www.infoarena.ro/problema/cmlsc",
        "desc": "Problema clasica de LCS pe numere"
      }
    ],
    "medium": [
      {
        "title": "Longest Common Subsequence",
        "url": "https://leetcode.com/problems/longest-common-subsequence/",
        "desc": "Standard"
      }
    ],
    "hard": [
      {
        "title": "Shortest Common Supersequence",
        "url": "https://leetcode.com/problems/shortest-common-supersequence/",
        "desc": "Combinația a doua string-uri"
      }
    ]
  },
  "globalVars": [
    {
      "name": "dp",
      "type": "int[1005][1005]",
      "val": "LCS length table",
      "expandable": false
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      globalVars.push({ name: "X", type: "std::string", val: "\"AGGTAB\"", expandable: false });
      globalVars.push({ name: "Y", type: "std::string", val: "\"GXTXAYB\"", expandable: false });

      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex === 0) ? 34 : (stepIndex === 20 ? 36 : 36) });

      if (stepIndex >= 1 && stepIndex <= 19) {
        frames.unshift({ name: "lcs(X = \"AGGTAB\", Y = \"GXTXAYB\")", file: "solution.cpp", line: activeLine });
      }

      if (stepIndex >= 1 && stepIndex <= 19) {
        let i = -1;
        let j = -1;
        
        if (stepIndex >= 2 && stepIndex <= 4) i = 1;
        else if (stepIndex >= 5 && stepIndex <= 7) i = 2;
        else if (stepIndex >= 8 && stepIndex <= 9) i = 3;
        else if (stepIndex >= 10 && stepIndex <= 12) i = 4;
        else if (stepIndex >= 13 && stepIndex <= 15) i = 5;
        else if (stepIndex >= 16 && stepIndex <= 18) i = 6;

        if (stepIndex === 2) j = 1;
        else if (stepIndex === 3) j = 5;
        else if (stepIndex === 4) j = 7;
        else if (stepIndex === 5) j = 1;
        else if (stepIndex === 6) j = 2;
        else if (stepIndex === 7) j = 5;
        else if (stepIndex === 8) j = 1;
        else if (stepIndex === 9) j = 3;
        else if (stepIndex === 10) j = 1;
        else if (stepIndex === 11) j = 3;
        else if (stepIndex === 12) j = 4;
        else if (stepIndex === 13) j = 3;
        else if (stepIndex === 14) j = 5;
        else if (stepIndex === 15) j = 6;
        else if (stepIndex === 16) j = 1;
        else if (stepIndex === 17) j = 5;
        else if (stepIndex === 18) j = 7;

        if (i !== -1) {
          vars.push({ name: "i", type: "int", val: i.toString(), expandable: false });
          vars.push({ name: "m", type: "int", val: "6", expandable: false });
        }
        if (j !== -1) {
          vars.push({ name: "j", type: "int", val: j.toString(), expandable: false });
          vars.push({ name: "n", type: "int", val: "7", expandable: false });
        }

        let dpVal = "size = 7 x 8";
        vars.push({ name: "dp", type: "std::vector<std::vector<int>>", val: dpVal, expandable: true });

        if (i !== -1 && j !== -1) {
          vars.push({ name: "X[i-1]", type: "char", val: `'${"AGGTAB"[i-1]}'`, expandable: false });
          vars.push({ name: "Y[j-1]", type: "char", val: `'${"GXTXAYB"[j-1]}'`, expandable: false });
        }

        inlineVal = "";
        if (i !== -1) inlineVal += `i: ${i}`;
        if (j !== -1) inlineVal += `, j: ${j}`;
        if (i !== -1 && j !== -1) inlineVal += `, X[i-1]: '${"AGGTAB"[i-1]}', Y[j-1]: '${"GXTXAYB"[j-1]}'`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex >= 1 && stepIndex <= 19) {
        let i = -1;
        let j = -1;
        
        if (stepIndex >= 2 && stepIndex <= 4) i = 1;
        else if (stepIndex >= 5 && stepIndex <= 7) i = 2;
        else if (stepIndex >= 8 && stepIndex <= 9) i = 3;
        else if (stepIndex >= 10 && stepIndex <= 12) i = 4;
        else if (stepIndex >= 13 && stepIndex <= 15) i = 5;
        else if (stepIndex >= 16 && stepIndex <= 18) i = 6;

        if (stepIndex === 2) j = 1;
        else if (stepIndex === 3) j = 5;
        else if (stepIndex === 4) j = 7;
        else if (stepIndex === 5) j = 1;
        else if (stepIndex === 6) j = 2;
        else if (stepIndex === 7) j = 5;
        else if (stepIndex === 8) j = 1;
        else if (stepIndex === 9) j = 3;
        else if (stepIndex === 10) j = 1;
        else if (stepIndex === 11) j = 3;
        else if (stepIndex === 12) j = 4;
        else if (stepIndex === 13) j = 3;
        else if (stepIndex === 14) j = 5;
        else if (stepIndex === 15) j = 6;
        else if (stepIndex === 16) j = 1;
        else if (stepIndex === 17) j = 5;
        else if (stepIndex === 18) j = 7;

        if (lineNum === 14 || lineNum === 15) {
          let res = "";
          if (i !== -1) res += `i: ${i}`;
          if (j !== -1) res += `, j: ${j}`;
          return res || null;
        }
        if (lineNum === 16 || lineNum === 17 || lineNum === 19) {
          let res = "";
          if (i !== -1) res += `i: ${i}`;
          if (j !== -1) res += `, j: ${j}`;
          if (i !== -1 && j !== -1) res += `, X[i-1]: '${"AGGTAB"[i-1]}', Y[j-1]: '${"GXTXAYB"[j-1]}'`;
          return res || null;
        }
      }
      return null;
    }
  }
};
