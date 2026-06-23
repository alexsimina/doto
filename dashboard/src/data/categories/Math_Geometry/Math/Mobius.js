export const data = {
  "presentation": `### Prezentare Generală

Funcția Mobius, notată cu $\\mu(n)$, este o funcție multiplicativă fundamentală în teoria numerelor și combinatorică, utilizată în special în problemele ce implică divizibilitate și cel mai mare divizor comun. Ea este definită pentru orice număr întreg pozitiv $n$ astfel:

- $\\mu(n) = 1$ dacă $n$ este un întreg liber de pătrate (square-free) și are un număr par de factori primi distincți.
- $\\mu(n) = -1$ dacă $n$ este un întreg liber de pătrate și are un număr impar de factori primi distincți.
- $\\mu(n) = 0$ dacă $n$ nu este liber de pătrate (adică se divide cu $p^2$ pentru un număr prim $p$).

Prin convenție, $\\mu(1) = 1$. 

Cea mai importantă proprietate a sa este **Formula de Inversiune Mobius**, care permite exprimarea unei relații între două funcții aritmetice. De asemenea, suma funcției Mobius peste toți divizorii unui număr $n > 1$ este întotdeauna $0$:
$$ \\sum_{d | n} \\mu(d) = \\begin{cases} 1 & \\text{dacă } n = 1 \\ 0 & \\text{dacă } n > 1 \\end{cases} $$

Putem calcula valorile funcției $\\mu$ pentru toate numerele până la $N$ într-o complexitate liniară de $O(N)$ folosind o adaptare a **Ciurului Liniar** (Eratostene optimizat).`,
  "complexity": `### Complexitate

Pentru precalcularea valorilor de la $1$ la $N$:
- **Timp:** $O(N)$ — ciurul liniar garantează că fiecare număr este vizitat și procesat o singură dată (prin cel mai mic factor prim al său).
- **Spațiu:** $O(N)$ — necesar pentru a stoca valorile funcției $\\mu$ și starea numerelor prime în memorie.`,
  "variations": `### Variații și Edge Cases

1. **Calcul individual:** Dacă avem nevoie de $\\mu(n)$ doar pentru o singură valoare mare, putem descompune $n$ în factori primi în $O(\\sqrt{n})$. Dacă un factor prim apare la o putere $\\ge 2$, returnăm direct $0$. Altminteri, returnăm $(-1)^k$, unde $k$ este numărul de factori primi distincți.
2. **Mertens Function:** Suma parțială a funcției Mobius, $M(N) = \\sum_{i=1}^{N} \\mu(i)$, utilizată în studiul distribuției numerelor prime și strâns legată de Ipoteza lui Riemann.`,
  "applications": `### Aplicații

- **Calculul numărului de perechi coprime:** Determinarea numărului de perechi $(i, j)$ cu $1 \\le i, j \\le N$ și $\\gcd(i, j) = 1$, folosind relația $\\sum_{d | \\gcd(i, j)} \\mu(d)$.
- **Inversiune:** Rezolvarea problemelor unde trebuie să calculăm sume complexe peste cel mai mare divizor comun (ex: $\\sum \\gcd(i, j)$).`,
  "code": `
#include <iostream>
#include <vector>

using namespace std;

vector<int> computeMobius(int n) {
    vector<int> mu(n + 1, 0);
    vector<bool> isPrime(n + 1, true);
    vector<int> primes;
    
    mu[1] = 1;
    for (int i = 2; i <= n; ++i) {
        if (isPrime[i]) {
            primes.push_back(i);
            mu[i] = -1;
        }
        for (int p : primes) {
            if (i * p > n) break;
            isPrime[i * p] = false;
            if (i % p == 0) {
                mu[i * p] = 0;
                break;
            } else {
                mu[i * p] = -mu[i];
            }
        }
    }
    return mu;
}

int main() {
    int limit = 10;
    vector<int> mu = computeMobius(limit);
    cout << "mu(1..10): ";
    for (int i = 1; i <= limit; ++i) {
        cout << mu[i] << " ";
    }
    cout << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 32,
    "text": "limit = 10",
    "blocksVisual": []
  },
  {
    "line": 33,
    "text": "Apelam computeMobius(10)",
    "blocksVisual": []
  },
  {
    "line": 6,
    "text": "Intram in functie.",
    "blocksVisual": []
  },
  {
    "line": 7,
    "text": "mu initializat",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "isPrime initializat",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "primes initializat",
    "blocksVisual": []
  },
  {
    "line": 11,
    "text": "mu[1] = 1",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=2",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 14,
    "text": "primes.push_back(2)",
    "blocksVisual": []
  },
  {
    "line": 15,
    "text": "mu[2] = -1",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 19,
    "text": "isPrime[4] = false",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "if (i % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "mu[4] = 0",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "break p loop",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=3",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 14,
    "text": "primes.push_back(3)",
    "blocksVisual": []
  },
  {
    "line": 15,
    "text": "mu[3] = -1",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 19,
    "text": "isPrime[6] = false",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "if (i % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "mu[6] = -mu[i]",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=3",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 19,
    "text": "isPrime[9] = false",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "if (i % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "mu[9] = 0",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "break p loop",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=4",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 19,
    "text": "isPrime[8] = false",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "if (i % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "mu[8] = 0",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "break p loop",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=5",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 14,
    "text": "primes.push_back(5)",
    "blocksVisual": []
  },
  {
    "line": 15,
    "text": "mu[5] = -1",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 19,
    "text": "isPrime[10] = false",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "if (i % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "mu[10] = -mu[i]",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=3",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=6",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=7",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 14,
    "text": "primes.push_back(7)",
    "blocksVisual": []
  },
  {
    "line": 15,
    "text": "mu[7] = -1",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=8",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=9",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "for i=10",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "if (isPrime[i])",
    "blocksVisual": []
  },
  {
    "line": 17,
    "text": "for p=2",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "if (i * p > n)",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "i*p > n, break",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "return mu",
    "blocksVisual": []
  },
  {
    "line": 33,
    "text": "A primit mu",
    "blocksVisual": []
  },
  {
    "line": 34,
    "text": "cout",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[1]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[2]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[3]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[4]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[5]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[6]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[7]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[8]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[9]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "afisare mu[10]",
    "blocksVisual": []
  },
  {
    "line": 39,
    "text": "return 0",
    "blocksVisual": []
  }
],
  "problems": {
    "easy": [
      {
        "title": "Mobius Function Calculator",
        "url": "https://www.geeksforgeeks.org/program-to-calculate-mobius-function/",
        "desc": "Calculează valoarea funcției Mobius pentru un număr dat N prin descompunere în factori primi."
      }
    ],
    "medium": [
      {
        "title": "SQFREE - Square-free integers",
        "url": "https://www.spoj.com/problems/SQFREE/",
        "desc": "Calculează numărul de numere libere de pătrate mai mici sau egale cu N folosind funcția Mobius."
      }
    ],
    "hard": [
      {
        "title": "LCM Sum",
        "url": "https://www.spoj.com/problems/LCMSUM/",
        "desc": "Calculează suma LCM(i, N) pentru toți i de la 1 la N folosind funcția Mobius sau indicatorul lui Euler."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex) => {
      const states = [{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"limit=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"Apel"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"n=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[2]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[3]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=5"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[5]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=6"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=7"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[7]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=8"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=9"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"return"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu primit"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      return { vars: s.vars, globalVars: [], frames: s.frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"limit=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"Apel"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"n=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,0,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,0,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[2]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,1,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,0,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[3]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,1,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,0,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,1,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,1,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=5"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,0,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[5]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,1]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,0]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=3"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"p","type":"int","val":"3","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=6"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=7"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,0,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"primes_size=4"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu[7]=-1"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=8"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"8","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=9"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"9","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"i=10"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"p=2"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"break"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"n","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false},{"name":"isPrime","type":"vector<bool>","val":"[1,1,1,1,0,1,0,1,0,0,0]","expandable":false},{"name":"primes","type":"vector<int>","val":"[2,3,5,7]","expandable":false},{"name":"i","type":"int","val":"10","expandable":false}],"frames":[{"name":"computeMobius(10)","file":"main.cpp","line": 6},{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"return"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":"mu primit"},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null},{"vars":[{"name":"limit","type":"int","val":"10","expandable":false},{"name":"mu","type":"vector<int>","val":"[0,1,-1,-1,0,-1,1,-1,0,0,1]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 31}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      if (s.inlineVal && s.frames.length > 0 && s.frames[0].line === lineNum) return s.inlineVal;
      return null;
    }
  }
};
