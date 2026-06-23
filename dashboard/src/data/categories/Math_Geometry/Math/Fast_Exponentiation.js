export const data = {
  "presentation": `### Prezentare Generală

Exponentierea rapidă (sau exponentierea binară) este un algoritm eficient pentru calculul puterii unui număr, $a^b$, sau al restului împărțirii acesteia la un modul $M$, adică $a^b \\pmod{M}$.

În loc de a efectua $b$ înmulțiri succesive cu o complexitate de $O(b)$, algoritmul folosește descompunerea binară a exponentului pentru a reduce numărul de operații la $O(\\log b)$. La fiecare pas, dacă exponentul curent este impar, înmulțim rezultatul cu baza curentă. Apoi, ridicăm baza la pătrat și înjumătățim exponentul.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\log b)$ — la fiecare pas exponentul $b$ se împarte la 2, reducând drastic numărul de înmulțiri.
- **Spațiu:** $O(1)$ — algoritmul rulează iterativ folosind doar câteva variabile auxiliare.`,
  "variations": `### Variații și Edge Cases

1. **Exponent $b = 0$:** Orice număr la puterea 0 este 1. Algoritmul returnează corect 1 deoarece bucla \`while\` nu se execută.
2. **Modulo $M = 1$:** În acest caz, orice număr modular este 0. Este important ca preprocesarea sau rezultatul să țină cont de acest caz particular (returnează 0).
3. **Overflow:** Înmulțirea \`result * base\` poate depăși tipul standard de date (ex. \`int\` pe 32 de biți). Se recomandă folosirea tipului \`long long\` în C++.`,
  "applications": `### Aplicații

- Calculul rapid al puterilor mari în aritmetica modulară (criptografie, de exemplu RSA).
- Calcularea inversului modular folosind Micul Teoremă a lui Fermat ($a^{M-2} \\pmod{M}$ pentru $M$ prim).
- Ridicarea la putere a matricelor în timp logaritmic pentru determinarea termenilor șirurilor recurente (ex: Fibonacci).`,
  "code": `
#include <iostream>

using namespace std;

long long fastExponentiation(long long base, long long exp, long long mod) {
    long long result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp = exp / 2;
    }
    return result;
}

int main() {
    long long ans = fastExponentiation(3, 13, 10);
    cout << "3^13 % 10 = " << ans << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 18,
    "text": "Apelam fastExponentiation(3, 13, 10)",
    "blocksVisual": []
  },
  {
    "line": 5,
    "text": "Intram in functie.",
    "blocksVisual": []
  },
  {
    "line": 6,
    "text": "result = 1",
    "blocksVisual": []
  },
  {
    "line": 7,
    "text": "base = base % mod; base = 3",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "while (exp > 0)",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "if (exp % 2 == 1)",
    "blocksVisual": []
  },
  {
    "line": 10,
    "text": "result = (result * base) % mod; result = 3",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "base = (base * base) % mod; base = 9",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "exp = exp / 2; exp = 6",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "while (exp > 0)",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "if (exp % 2 == 1)",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "base = (base * base) % mod; base = 1",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "exp = exp / 2; exp = 3",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "while (exp > 0)",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "if (exp % 2 == 1)",
    "blocksVisual": []
  },
  {
    "line": 10,
    "text": "result = (result * base) % mod; result = 3",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "base = (base * base) % mod; base = 1",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "exp = exp / 2; exp = 1",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "while (exp > 0)",
    "blocksVisual": []
  },
  {
    "line": 9,
    "text": "if (exp % 2 == 1)",
    "blocksVisual": []
  },
  {
    "line": 10,
    "text": "result = (result * base) % mod; result = 3",
    "blocksVisual": []
  },
  {
    "line": 12,
    "text": "base = (base * base) % mod; base = 1",
    "blocksVisual": []
  },
  {
    "line": 13,
    "text": "exp = exp / 2; exp = 0",
    "blocksVisual": []
  },
  {
    "line": 8,
    "text": "while (exp > 0)",
    "blocksVisual": []
  },
  {
    "line": 15,
    "text": "return result",
    "blocksVisual": []
  },
  {
    "line": 19,
    "text": "ans = 3",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "cout",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "return 0",
    "blocksVisual": []
  }
],
  "problems": {
    "easy": [
      {
        "title": "Pow(x, n)",
        "url": "https://leetcode.com/problems/powx-n/",
        "desc": "Calculează x la puterea n, având grijă la valori negative ale exponentului."
      }
    ],
    "medium": [
      {
        "title": "Super Pow",
        "url": "https://leetcode.com/problems/super-pow/",
        "desc": "Calculează a^b modulo 1337, unde b este dat ca un tablou de cifre (număr foarte mare)."
      }
    ],
    "hard": [
      {
        "title": "Count Good Numbers",
        "url": "https://leetcode.com/problems/count-good-numbers/",
        "desc": "Folosește exponentierea rapidă modulo 10^9 + 7 pentru a număra șirurile de cifre bune."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"Apel"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 1"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 3"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 13"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 9"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"return 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"ans = 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      return { vars: s.vars, globalVars: [], frames: s.frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"Apel"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 1"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 3"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 13"},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"1","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"3","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"13","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 9"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 6"},{"vars":[{"name":"base","type":"long long","val":"9","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"6","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"3","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"result = 3"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"1","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"base = 1"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"exp = 0"},{"vars":[{"name":"base","type":"long long","val":"1","expandable":false},{"name":"exp","type":"long long","val":"0","expandable":false},{"name":"mod","type":"long long","val":"10","expandable":false},{"name":"result","type":"long long","val":"3","expandable":false}],"frames":[{"name":"fastExponentiation(3, 13, 10)","file":"main.cpp","line": 5},{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"return 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":"ans = 3"},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null},{"vars":[{"name":"ans","type":"long long","val":"3","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 18}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      if (s.inlineVal && s.frames.length > 0 && s.frames[0].line === lineNum) return s.inlineVal;
      return null;
    }
  }
};
