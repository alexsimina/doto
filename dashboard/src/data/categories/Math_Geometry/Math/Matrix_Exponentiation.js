export const data = {
  "presentation": `### Prezentare Generală

Exponentierea de matrice este o tehnică algoritmică avansată utilizată pentru a calcula rapid termeni din recurențe liniare (cum ar fi șirul lui Fibonacci sau recurențe mai complexe) și drumuri în grafuri.

Dacă o recurență liniară poate fi exprimată sub forma unei relații matriceale:
$$ X_{n} = T \\cdot X_{n-1} $$
unde $T$ este o matrice de tranziție de dimensiune $K \\times K$, atunci prin inducție obținem:
$$ X_{n} = T^{n-1} \\cdot X_1 $$

Folosind algoritmul de exponentiere rapidă aplicat pe înmulțirea matricelor, putem calcula $T^{n-1}$ în timp logaritmic. În loc de $O(n)$ înmulțiri succesive de vectori, obținem o complexitate de $O(K^3 \\log n)$ unde $K$ este dimensiunea matricei.`,
  "complexity": `### Complexitate

Pentru o matrice de tranziție de dimensiune $K \\times K$ și o putere $N$:
- **Timp:** $O(K^3 \\log N)$ — ridicarea la putere durează $\\log N$ pași, iar fiecare pas implică înmulțirea a două matrice de dimensiune $K \\times K$, care are o complexitate de $O(K^3)$.
- **Spațiu:** $O(K^2)$ — memoria necesară pentru a stoca rezultatele temporare ale matricelor ridicate la pătrat.`,
  "variations": `### Variații și Edge Cases

1. **Matricea Identitate ca element neutru:** Rezultatul ridicării la puterea $0$ a oricărei matrice este Matricea Identitate $I_K$ (care are $1$ pe diagonala principală și $0$ în rest).
2. **Dimensiune variabilă $K$:** Pentru $K$ mare (ex. $K > 100$), înmulțirea standard $O(K^3)$ poate fi prea lentă, necesitând tehnici speciale de optimizare sau utilizarea structurilor de date sparse dacă tranzitiile sunt rare.
3. **Căi în grafuri:** Matricea de adiacență a unui graf neorientat ridicată la puterea $P$ ne indică numărul de drumuri de lungime $P$ între oricare două noduri.`,
  "applications": `### Aplicații

- Determinarea celui de-al $N$-lea termen din șirul lui Fibonacci pentru $N \\le 10^{18}$.
- Determinarea numărului de drumuri de lungime exactă $L$ într-un graf între două noduri.
- Rezolvarea problemelor de programare dinamică cu recurențe liniare și stări limitate, unde $N$ este foarte mare.`,
  "code": `#include <iostream>
#include <vector>

using namespace std;

typedef vector<vector<long long>> Matrix;

Matrix multiply(Matrix A, Matrix B, long long mod) {
    Matrix C = {{0, 0}, {0, 0}};
    for (int i = 0; i < 2; ++i) {
        for (int j = 0; j < 2; ++j) {
            for (int k = 0; k < 2; ++k) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod;
            }
        }
    }
    return C;
}

Matrix power(Matrix A, long long p, long long mod) {
    Matrix res = {{1, 0}, {0, 1}}; // Matricea identitate
    while (p > 0) {
        if (p % 2 == 1) {
            res = multiply(res, A, mod);
        }
        A = multiply(A, A, mod);
        p /= 2;
    }
    return res;
}

int main() {
    Matrix T = {{1, 1}, {1, 0}}; // Matricea de tranzitie Fibonacci
    Matrix T_pow = power(T, 5, 1000000007);
    cout << "F_6 = " << T_pow[0][0] << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 33,
    "text": "Definim matricea de tranziție T pentru șirul lui Fibonacci: T = {{1, 1}, {1, 0}}.",
    "blocksVisual": []
  },
  {
    "line": 34,
    "text": "Apelăm funcția power pentru a ridica matricea T la puterea 5, folosind modulul 1000000007.",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "Intrăm în corpul funcției power cu exponentul p = 5.",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "Inițializăm matricea res cu Matricea Identitate {{1, 0}, {0, 1}}, care servește drept element neutru la înmulțire.",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "Verificăm condiția buclei while (p > 0). Deoarece p = 5 > 0, condiția este adevărată, deci continuăm.",
    "blocksVisual": []
  },
  {
    "line": 23,
    "text": "Verificăm dacă exponentul curent p este impar: p % 2 == 1. Deoarece 5 % 2 = 1, condiția este adevărată.",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "Apelăm funcția multiply pentru a înmulți res curent cu matricea de putere A.",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "Matricea res a fost actualizată în urma înmulțirii.",
    "blocksVisual": []
  },
  {
    "line": 26,
    "text": "Apelăm funcția multiply pentru a ridica matricea A la pătrat (dublăm puterea de tranziție).",
    "blocksVisual": []
  },
  {
    "line": 26,
    "text": "Matricea A a fost înlocuită cu pătratul său.",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Înjumătățim exponentul p prin împărțire întreagă la 2: p devine 5 / 2 = 2.",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "Verificăm din nou condiția buclei while (p > 0). Deoarece p = 2 > 0, condiția este adevărată, continuăm.",
    "blocksVisual": []
  },
  {
    "line": 23,
    "text": "Verificăm dacă exponentul curent p este impar. Deoarece 2 % 2 = 0, condiția este falsă; sărim peste înmulțirea rezultatului.",
    "blocksVisual": []
  },
  {
    "line": 26,
    "text": "Apelăm funcția multiply pentru a ridica din nou matricea A la pătrat.",
    "blocksVisual": []
  },
  {
    "line": 26,
    "text": "Matricea A a fost actualizată cu pătratul său.",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Înjumătățim exponentul p prin împărțire întreagă: p devine 2 / 2 = 1.",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "Verificăm condiția buclei while (p > 0). Deoarece p = 1 > 0, condiția este adevărată.",
    "blocksVisual": []
  },
  {
    "line": 23,
    "text": "Verificăm dacă p este impar. Deoarece 1 % 2 = 1, condiția este adevărată.",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "Apelăm funcția multiply pentru a înmulți rezultatul acumulat res cu matricea de putere curentă A.",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "Matricea res a fost actualizată în urma înmulțirii.",
    "blocksVisual": []
  },
  {
    "line": 26,
    "text": "Apelăm multiply pentru a ridica din nou matricea A la pătrat.",
    "blocksVisual": []
  },
  {
    "line": 26,
    "text": "Matricea A a fost înlocuită cu pătratul său.",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Înjumătățim exponentul p prin împărțire întreagă: p devine 1 / 2 = 0.",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "Verificăm condiția buclei while (p > 0). Deoarece p = 0, condiția este acum falsă, așa că ieșim din buclă.",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Returnăm matricea res ce conține rezultatul final T^5.",
    "blocksVisual": []
  },
  {
    "line": 34,
    "text": "Revenim în funcția main. Atribuim matricea returnată variabilei T_pow.",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "Afișăm valoarea calculată a celui de-al 6-lea termen Fibonacci, aflat în T_pow[0][0].",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Funcția main se încheie cu return 0, ceea ce indică succesul programului.",
    "blocksVisual": []
  }
],
  "problems": {
    "easy": [
      {
        "title": "Fibonacci Number",
        "url": "https://leetcode.com/problems/fibonacci-number/",
        "desc": "Calculează al N-lea număr Fibonacci utilizând o matrice de tranziție."
      }
    ],
    "medium": [
      {
        "title": "FIBOSUM",
        "url": "https://www.spoj.com/problems/FIBOSUM/",
        "desc": "Calculează suma numerelor Fibonacci de la N la M modulo 10^9 + 7."
      }
    ],
    "hard": [
      {
        "title": "Graph Paths I",
        "url": "https://cses.fi/problemset/task/1723/",
        "desc": "Determină numărul de drumuri distincte de lungime exactă K între nodul 1 și nodul N într-un graf orientat."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine) => {
      const states = [{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T={{1,1},{1,0}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"Apel power"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res={{1,0},{0,1}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[1,1],[1,0]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[2,1],[1,1]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[5,3],[3,2]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[8,5],[5,3]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[34,21],[21,13]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"return res"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T_pow primit"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const frames = s.frames.map((frame, index) => {
        if (index === 0 && activeLine !== undefined && activeLine !== null) {
          return { ...frame, line: activeLine };
        }
        return frame;
      });
      return { vars: s.vars, globalVars: [], frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T={{1,1},{1,0}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"Apel power"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res={{1,0},{0,1}}"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 5"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,0],[0,1]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[1,1],[1,0]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"5","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[2,1],[1,1]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 2"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[2,1],[1,1]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"2","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[5,3],[3,2]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 1"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[1,1],[1,0]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"res=[[8,5],[5,3]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[5,3],[3,2]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"A=[[34,21],[21,13]]"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p=0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"p = 0"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"A","type":"Matrix","val":"[[34,21],[21,13]]","expandable":false},{"name":"p","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"1000000007","expandable":false},{"name":"res","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"power(T, 5, 1000000007)","file":"main.cpp","line": 20},{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"return res"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":"T_pow primit"},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null},{"vars":[{"name":"T","type":"Matrix","val":"{{1, 1}, {1, 0}}","expandable":false},{"name":"T_pow","type":"Matrix","val":"[[8,5],[5,3]]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 32}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;
      return null;
    }
  }
};
