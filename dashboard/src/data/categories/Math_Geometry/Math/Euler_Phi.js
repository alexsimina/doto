export const data = {
  "presentation": `### Prezentare Generală

Indicatorul lui Euler (sau funcția totient, notată cu $\\phi(n)$) este o funcție aritmetică extrem de importantă în teoria numerelor. Ea determină numărul de numere întregi pozitive mai mici sau egale cu $n$ care sunt prime cu $n$ (adică cel mai mare divizor comun al lor este $1$).

Formula matematică bazată pe descompunerea în factori primi a lui $n$ este:
$$ \\phi(n) = n \\prod_{p | n} \\left(1 - \\frac{1}{p}\\right) $$
unde produsul se face peste toate numerele prime distincte $p$ care îl divid pe $n$.

Pentru a calcula $\\phi(n)$ eficient pentru un singur număr, putem extrage factorii săi primi în $O(\\sqrt{n})$, similar cu descompunerea standard. De fiecare dată când găsim un factor prim $p$, actualizăm rezultatul scăzând din el $\\frac{\\text{result}}{p}$.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\sqrt{n})$ — căutăm divizorii primi până la $\\sqrt{n}$. Dacă numărul este prim, algoritmul face exact $\\sqrt{n}$ pași.
- **Spațiu:** $O(1)$ — calculul se face folosind doar câteva variabile pentru descompunere.`,
  "variations": `### Variații și Edge Cases

1. **Indicatorul lui Euler pentru un interval (Ciurul Totient):** Când trebuie să calculăm $\\phi(i)$ pentru toate numerele dintr-un interval $[1, N]$, putem folosi o variantă a **Ciurului lui Eratostene**. Complexitatea totală devine $O(N \\log \\log N)$.
2. **Proprietatea multiplicativă:** Dacă $a$ și $b$ sunt prime între ele, atunci $\\phi(a \\cdot b) = \\phi(a) \\cdot \\phi(b)$.
3. **Micul Teoremă a lui Fermat generalizată (Teorema lui Euler):** Pentru orice $a$ prim cu $n$, avem $a^{\\phi(n)} \\equiv 1 \\pmod{n}$.`,
  "applications": `### Aplicații

- **Criptografia RSA:** Generarea cheilor publice și private se bazează pe calculul $\\phi(p \\cdot q) = (p-1)(q-1)$ pentru două numere prime mari.
- **Calculul inversului modular:** Dacă $a$ și $M$ sunt prime între ele, atunci inversul modular al lui $a \\pmod{M}$ este $a^{\\phi(M)-1} \\pmod{M}$.`,
  "code": `
#include <iostream>

using namespace std;

int eulerPhi(int n) {
    int result = n;
    for (int p = 2; p * p <= n; ++p) {
        if (n % p == 0) {
            while (n % p == 0) {
                n /= p;
            }
            result -= result / p;
        }
    }
    if (n > 1) {
        result -= result / n;
    }
    return result;
}

int main() {
    int ans = eulerPhi(12);
    cout << "phi(12) = " << ans << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 21,
    "text": "Apelam eulerPhi(12).",
    "blocksVisual": []
  },
  {
    "line": 5,
    "text": "Intram in functie.",
    "blocksVisual": []
  },
  {
    "line": 6,
    "text": "Initializam result = n",
    "blocksVisual": []
  },
  {
    "line": 7,
    "text": "Verificam factor p = 2. 2*2 <= 12",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "Verificam daca n % p == 0: 12 % 2",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "Intram in bucla while(n % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 10,
    "text": "n /= p; n devine 6",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "Verificam while(n % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 10,
    "text": "n /= p; n devine 3",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "Verificam while(n % p == 0)",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "result -= result / p; result devine 6",
    "blocksVisual": []
  },
  {
    "line": 7,
    "text": "p*p depaseste n. Iesim din bucla for.",
    "blocksVisual": []
  },
  {
    "line": 15,
    "text": "Verificam daca n > 1: n = 3",
    "blocksVisual": []
  },
  {
    "line": 16,
    "text": "n > 1, result -= result / n; result devine 4",
    "blocksVisual": []
  },
  {
    "line": 18,
    "text": "Returnam result = 4",
    "blocksVisual": []
  },
  {
    "line": 22,
    "text": "A primit 4 in ans",
    "blocksVisual": []
  },
  {
    "line": 23,
    "text": "Afisam",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "Sfarsit",
    "blocksVisual": []
  }
],
  "problems": {
    "easy": [
      {
        "title": "Euler Totient Function",
        "url": "https://www.geeksforgeeks.org/eulers-totient-function/",
        "desc": "Implementează calcularea valorii ETF pentru un număr dat."
      }
    ],
    "medium": [
      {
        "title": "ETF - Euler Totient Function",
        "url": "https://www.spoj.com/problems/ETF/",
        "desc": "Calculează indicatorul lui Euler pentru multiple query-uri în timp util."
      }
    ],
    "hard": [
      {
        "title": "GCDEX - GCD Extreme",
        "url": "https://www.spoj.com/problems/GCDEX/",
        "desc": "Calculează suma GCD pentru toate perechile ordonate, optimizând utilizând ETF pe intervale."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"Apel eulerPhi"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"p = 2"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 6"},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 3"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 6"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 4"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"ans = 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"cout"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 0"}];
      const s = states[stepIndex] || states[states.length - 1];
      return { vars: s.vars, globalVars: [], frames: s.frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"Apel eulerPhi"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 12"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"p = 2"},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"12","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 6"},{"vars":[{"name":"n","type":"int","val":"6","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"n = 3"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"12","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false},{"name":"p","type":"int","val":"2","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 6"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"6","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":null},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"result = 4"},{"vars":[{"name":"n","type":"int","val":"3","expandable":false},{"name":"result","type":"int","val":"4","expandable":false}],"frames":[{"name":"eulerPhi(12)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"ans = 4"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"cout"},{"vars":[{"name":"ans","type":"int","val":"4","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 21}],"inlineVal":"return 0"}];
      const s = states[stepIndex] || states[states.length - 1];
      if (s.inlineVal && s.frames.length > 0 && s.frames[0].line === lineNum) return s.inlineVal;
      return null;
    }
  }
};
