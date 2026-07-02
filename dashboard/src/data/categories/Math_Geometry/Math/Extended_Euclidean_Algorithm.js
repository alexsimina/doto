export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul lui Euclid Extins este o extindere a algoritmului clasic al lui Euclid pentru cel mai mare divizor comun (CMMDC). Pe lângă determinarea $\\gcd(a, b)$, algoritmul extins calculează și o pereche de numere întregi $x$ și $y$ care satisfac **Identitatea lui Bézout**:\n\n$$a \\cdot x + b \\cdot y = \\gcd(a, b)$$\n\nAcești coeficienți $x$ și $y$ sunt extrem de utili deoarece permit determinarea inversului modular, rezolvarea ecuațiilor diofantice liniare și aplicarea Teoremei Chineze a Resturilor.\n\n### Principiul de Funcționare\n\nAlgoritmul funcționează recursiv, în mod similar cu Euclid clasic:\n1. **Cazul de bază**: Când $b = 0$, știm că $\\gcd(a, 0) = a$. Identitatea devine $a \\cdot x + 0 \\cdot y = a$, deci alegem coeficienții $x = 1$ și $y = 0$.\n2. **Pasul recursiv**: Pentru $b > 0$, apelăm algoritmul pentru perechea $(b, a \\bmod b)$, obținând divizorul $g$ și coeficienții $x_1, y_1$ care satisfac:\n   $$b \\cdot x_1 + (a \\bmod b) \\cdot y_1 = g$$\n3. Folosind identitatea $a \\bmod b = a - \\lfloor a/b \\rfloor \\cdot b$, putem rearanja ecuația pentru a exprima coeficienții pentru pasul curent în funcție de cei ai subproblemei:\n   $$x = y_1$$\n   $$y = x_1 - \\lfloor a/b \\rfloor \\cdot y_1$$",
  "complexity": "### Complexitate\n\n- **Timp**: $O(\\log(\\min(a, b)))$. Numărul de pași este cel mult proporțional cu numărul de cifre ale numerelor. Cel mai nefavorabil caz apare atunci când $a$ și $b$ sunt numere Fibonacci consecutive.\n- **Spațiu**: $O(\\log(\\min(a, b)))$ datorită stivei de apeluri recursive. Spațiul poate fi redus la $O(1)$ dacă implementăm varianta iterativă a algoritmului.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Varianta Iterativă**: Evită utilizarea stivei de apeluri prin menținerea a două seturi de coeficienți pe parcursul unui algoritm similar cu împărțirile succesive din Euclid.\n- **Determinarea Inversului Modular**: Dacă $\\gcd(a, m) = 1$, atunci inversul lui $a$ modulo $m$ este valoarea $x$ obținută din algoritmul extins, adusă în intervalul $[0, m-1]$ prin formula $(x \\bmod m + m) \\bmod m$.\n- **Rezolvarea Ecuațiilor Diofantice Liniare**: O ecuație de forma $a \\cdot x + b \\cdot y = c$ are soluții dacă și numai dacă $\\gcd(a, b)$ divide pe $c$. Putem multiplica coeficienții Bézout pentru a găsi o soluție particulară.",
  "applications": "### Aplicații Reale\n\n- **Criptografie (RSA)**: Calcularea cheii private ca invers modular al cheii publice de criptare modulo $\\varphi(N)$.\n- **Algoritmul RSA și Schimbul de chei Diffie-Hellman**: Operații de împărțire modulară rapide.\n- **Teorema Chineză a Resturilor**: Recompunerea unui număr din resturile sale modulo mai multe numere prime între ele.",
  "code": `#include <iostream>

using namespace std;

int gcd(int a, int b, int &x, int &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    int temp_x, temp_y;
    int g = gcd(b, a % b, temp_x, temp_y);
    x = temp_y;
    y = temp_x - (a / b) * temp_y;
    return g;
}

int main() {
    int a = 30;
    int b = 13;
    int x = 0, y = 0;
    int g = gcd(a, b, x, y);
    return 0;
}
`,
  "explanations": [
    {
      "line": 18,
      "text": "Începe execuția programului în funcția `main`.",
      "blocksVisual": [
        {
          "label": "Cadrul main()",
          "groups": [
            [
              { "val": "Start program", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Declarăm și inițializăm variabila `a` cu valoarea `30`.",
      "blocksVisual": [
        {
          "label": "Variabile în main()",
          "groups": [
            [
              { "val": "a: 30", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Declarăm și inițializăm variabila `b` cu valoarea `13`.",
      "blocksVisual": [
        {
          "label": "Variabile în main()",
          "groups": [
            [
              { "val": "a: 30" },
              { "val": "b: 13", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Declarăm și inițializăm coeficienții Bézout `x = 0` și `y = 0`.",
      "blocksVisual": [
        {
          "label": "Variabile în main()",
          "groups": [
            [
              { "val": "a: 30" },
              { "val": "b: 13" },
              { "val": "x: 0", "active": true },
              { "val": "y: 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Apelăm funcția recursivă `gcd(a, b, x, y)` cu `a = 30`, `b = 13`. Se creează primul cadru de stivă recursivă.",
      "blocksVisual": [
        {
          "label": "Apel gcd(30, 13)",
          "groups": [
            [
              { "val": "a: 30" },
              { "val": "b: 13" },
              { "val": "x: 0" },
              { "val": "y: 0" }
            ]
          ]
        }
      ]
    },
    {
      "line": 5,
      "text": "Intrăm în funcția `gcd` cu parametrii `a = 30` și `b = 13`. Referințele `x` și `y` indică spre variabilele cu același nume din `main`.",
      "blocksVisual": [
        {
          "label": "gcd(30, 13) - Parametri",
          "groups": [
            [
              { "val": "a: 30", "active": true },
              { "val": "b: 13", "active": true },
              { "val": "x: 0" },
              { "val": "y: 0" }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Verificăm cazul de bază `b == 0`. Cum `13 != 0`, condiția este falsă și continuăm execuția.",
      "blocksVisual": [
        {
          "label": "Verificare b == 0",
          "groups": [
            [
              { "val": "b: 13" },
              { "val": "13 == 0 (Fals)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Declarăm variabilele locale `temp_x` și `temp_y` care vor reține coeficienții subproblemei recursive.",
      "blocksVisual": [
        {
          "label": "gcd(30, 13) - Local",
          "groups": [
            [
              { "val": "temp_x: neinițializat", "active": true },
              { "val": "temp_y: neinițializat", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm recursiv `gcd(b, a % b, temp_x, temp_y)`. Parametrii devin `a = 13` și `b = 30 % 13 = 4`.",
      "blocksVisual": [
        {
          "label": "Apel recursiv gcd(13, 4)",
          "groups": [
            [
              { "val": "a: 13", "active": true },
              { "val": "b: 4", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 5,
      "text": "Intrăm în noul cadru de stivă `gcd(13, 4)`. Aici, referințele `x` și `y` indică spre `temp_x` și `temp_y` din cadrul anterior `gcd(30, 13)`.",
      "blocksVisual": [
        {
          "label": "gcd(13, 4) - Parametri",
          "groups": [
            [
              { "val": "a: 13", "active": true },
              { "val": "b: 4", "active": true },
              { "val": "x: temp_x(F0)" },
              { "val": "y: temp_y(F0)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Verificăm cazul de bază `b == 0`. Cum `4 != 0`, condiția este falsă și continuăm.",
      "blocksVisual": [
        {
          "label": "Verificare b == 0",
          "groups": [
            [
              { "val": "b: 4" },
              { "val": "4 == 0 (Fals)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Declarăm variabilele locale `temp_x` și `temp_y` pentru cadrul curent `gcd(13, 4)`.",
      "blocksVisual": [
        {
          "label": "gcd(13, 4) - Local",
          "groups": [
            [
              { "val": "temp_x: neinițializat", "active": true },
              { "val": "temp_y: neinițializat", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm recursiv `gcd(b, a % b, temp_x, temp_y)` cu parametrii `a = 4` și `b = 13 % 4 = 1`.",
      "blocksVisual": [
        {
          "label": "Apel recursiv gcd(4, 1)",
          "groups": [
            [
              { "val": "a: 4", "active": true },
              { "val": "b: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 5,
      "text": "Intrăm în noul cadru de stivă `gcd(4, 1)`. Coeficiții de referință `x` și `y` indică spre `temp_x` și `temp_y` din cadrul `gcd(13, 4)`.",
      "blocksVisual": [
        {
          "label": "gcd(4, 1) - Parametri",
          "groups": [
            [
              { "val": "a: 4", "active": true },
              { "val": "b: 1", "active": true },
              { "val": "x: temp_x(F1)" },
              { "val": "y: temp_y(F1)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Verificăm cazul de bază `b == 0`. Cum `1 != 0`, continuăm.",
      "blocksVisual": [
        {
          "label": "Verificare b == 0",
          "groups": [
            [
              { "val": "b: 1" },
              { "val": "1 == 0 (Fals)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Declarăm variabilele locale `temp_x` și `temp_y` pentru cadrul curent `gcd(4, 1)`.",
      "blocksVisual": [
        {
          "label": "gcd(4, 1) - Local",
          "groups": [
            [
              { "val": "temp_x: neinițializat", "active": true },
              { "val": "temp_y: neinițializat", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Apelăm recursiv `gcd(b, a % b, temp_x, temp_y)` cu parametrii `a = 1` și `b = 4 % 1 = 0`.",
      "blocksVisual": [
        {
          "label": "Apel recursiv gcd(1, 0)",
          "groups": [
            [
              { "val": "a: 1", "active": true },
              { "val": "b: 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 5,
      "text": "Intrăm în ultimul cadru recursiv `gcd(1, 0)`. Referințele `x` și `y` indică spre `temp_x` și `temp_y` din cadrul `gcd(4, 1)`.",
      "blocksVisual": [
        {
          "label": "gcd(1, 0) - Parametri",
          "groups": [
            [
              { "val": "a: 1", "active": true },
              { "val": "b: 0", "active": true },
              { "val": "x: temp_x(F2)" },
              { "val": "y: temp_y(F2)" }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Verificăm cazul de bază `b == 0`. Condiția este adevărată (`b == 0`), deci începem construirea soluției.",
      "blocksVisual": [
        {
          "label": "Verificare b == 0",
          "groups": [
            [
              { "val": "b: 0" },
              { "val": "0 == 0 (Adevărat)", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Setăm `x = 1`. Deoarece `x` este o referință, această instrucțiune modifică direct variabila locală `temp_x` din cadrul apelant `gcd(4, 1)` la valoarea `1`.",
      "blocksVisual": [
        {
          "label": "gcd(1, 0) - Soluție",
          "groups": [
            [
              { "val": "x: 1", "active": true },
              { "val": "y: neinițializat" }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Setăm `y = 0`. Modificăm direct variabila locală `temp_y` din cadrul apelant `gcd(4, 1)` la valoarea `0`.",
      "blocksVisual": [
        {
          "label": "gcd(1, 0) - Soluție",
          "groups": [
            [
              { "val": "x: 1" },
              { "val": "y: 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Returnăm valoarea `a = 1` înapoi la cadrul apelant (Frame 2). Acest return reprezintă cel mai mare divizor comun.",
      "blocksVisual": [
        {
          "label": "gcd(1, 0) - Returnare",
          "groups": [
            [
              { "val": "return a: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Revenim în Frame 2 `gcd(4, 1)`. CMMDC-ul returnat este stocat în variabila locală `g = 1`. Variabilele locale `temp_x` și `temp_y` au acum valorile calculate `1` și respectiv `0`.",
      "blocksVisual": [
        {
          "label": "Revenire în gcd(4, 1)",
          "groups": [
            [
              { "val": "g: 1" },
              { "val": "temp_x: 1" },
              { "val": "temp_y: 0" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Actualizăm coeficientul `x` al cadrului curent (referință la `temp_y` din `gcd(13, 4)`) la valoarea `temp_y` (care este `0`).",
      "blocksVisual": [
        {
          "label": "gcd(4, 1) - Coeficienți",
          "groups": [
            [
              { "val": "x: 0", "active": true },
              { "val": "y: neinițializat" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Actualizăm coeficientul `y` al cadrului curent (referință la `temp_x` din `gcd(13, 4)`) ca fiind `temp_x - (a / b) * temp_y` = `1 - (4 / 1) * 0 = 1`.",
      "blocksVisual": [
        {
          "label": "gcd(4, 1) - Coeficienți",
          "groups": [
            [
              { "val": "x: 0" },
              { "val": "y: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Cadrul `gcd(4, 1)` se încheie, returnând `g = 1` la cadrul anterior.",
      "blocksVisual": [
        {
          "label": "gcd(4, 1) - Returnare",
          "groups": [
            [
              { "val": "return g: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Revenim în Frame 1 `gcd(13, 4)`. `g` primește valoarea `1`, iar variabilele locale devin `temp_x = 0` și `temp_y = 1`.",
      "blocksVisual": [
        {
          "label": "Revenire în gcd(13, 4)",
          "groups": [
            [
              { "val": "g: 1" },
              { "val": "temp_x: 0" },
              { "val": "temp_y: 1" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Actualizăm coeficientul `x` al cadrului curent (referință la `temp_y` din `gcd(30, 13)`) cu valoarea lui `temp_y` (care este `1`).",
      "blocksVisual": [
        {
          "label": "gcd(13, 4) - Coeficienți",
          "groups": [
            [
              { "val": "x: 1", "active": true },
              { "val": "y: neinițializat" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Actualizăm coeficientul `y` al cadrului curent (referință la `temp_x` din `gcd(30, 13)`) ca fiind `temp_x - (a / b) * temp_y` = `0 - (13 / 4) * 1 = 0 - 3 * 1 = -3`.",
      "blocksVisual": [
        {
          "label": "gcd(13, 4) - Coeficienți",
          "groups": [
            [
              { "val": "x: 1" },
              { "val": "y: -3", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Cadrul `gcd(13, 4)` se încheie, returnând `g = 1` la cadrul anterior.",
      "blocksVisual": [
        {
          "label": "gcd(13, 4) - Returnare",
          "groups": [
            [
              { "val": "return g: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Revenim în primul apel recursiv `gcd(30, 13)`. `g` devine `1`, iar variabilele locale devin `temp_x = 1` și `temp_y = -3`.",
      "blocksVisual": [
        {
          "label": "Revenire în gcd(30, 13)",
          "groups": [
            [
              { "val": "g: 1" },
              { "val": "temp_x: 1" },
              { "val": "temp_y: -3" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Actualizăm `x` din funcția `main` (prin referință) cu valoarea lui `temp_y` (care este `-3`).",
      "blocksVisual": [
        {
          "label": "gcd(30, 13) - Coeficienți",
          "groups": [
            [
              { "val": "x: -3", "active": true },
              { "val": "y: 0" }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Calculăm și actualizăm `y` din funcția `main` (prin referință) ca fiind `temp_x - (a / b) * temp_y` = `1 - (30 / 13) * (-3) = 1 - 2 * (-3) = 7`.",
      "blocksVisual": [
        {
          "label": "gcd(30, 13) - Coeficienți",
          "groups": [
            [
              { "val": "x: -3" },
              { "val": "y: 7", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Primul cadru recursiv se încheie cu succes, returnând `g = 1` în `main()`.",
      "blocksVisual": [
        {
          "label": "gcd(30, 13) - Returnare",
          "groups": [
            [
              { "val": "return g: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Revenim în funcția `main()`. Apelul s-a încheiat, stocăm rezultatul în variabila `g = 1`. Am calculat coeficienții finali ai identității: $30 \\cdot (-3) + 13 \\cdot 7 = 1$.",
      "blocksVisual": [
        {
          "label": "Rezultate în main()",
          "groups": [
            [
              { "val": "a: 30" },
              { "val": "b: 13" },
              { "val": "x: -3" },
              { "val": "y: 7" },
              { "val": "g: 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Funcția `main` se încheie cu succes, returnând codul `0`.",
      "blocksVisual": [
        {
          "label": "Sfârșit Program",
          "groups": [
            [
              { "val": "Cod retur: 0", "active": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Cel Mai Mare Divizor Comun Extins",
        "url": "https://www.pbinfo.ro/probleme/2221/extins",
        "desc": "Aflarea coeficienților Bézout x și y și a CMMDC."
      }
    ],
    "medium": [
      {
        "title": "Rezolvare Ecuații Diofantice",
        "url": "https://www.pbinfo.ro/probleme/ecuatie-diofantica",
        "desc": "Rezolvarea ecuației a * x + b * y = c în numere întregi."
      }
    ],
    "hard": [
      {
        "title": "Extended GCD Problems",
        "url": "https://lightoj.com/problem/extended-gcd",
        "desc": "Probleme avansate folosind ecuații diofantice liniare."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const getMainVars = () => {
        const list = [
          { name: "a", type: "int", val: "30" },
          { name: "b", type: "int", val: "13" }
        ];
        if (stepIndex >= 3) {
          list.push({ name: "x", type: "int", val: stepIndex >= 31 ? "-3" : "0" });
          list.push({ name: "y", type: "int", val: stepIndex >= 32 ? "7" : "0" });
        }
        if (stepIndex >= 34) {
          list.push({ name: "g", type: "int", val: "1" });
        }
        return list;
      };

      const getF0Vars = () => {
        const list = [
          { name: "a", type: "int", val: "30" },
          { name: "b", type: "int", val: "13" },
          { name: "x", type: "int&", val: stepIndex >= 31 ? "-3" : "0" },
          { name: "y", type: "int&", val: stepIndex >= 32 ? "7" : "0" }
        ];
        if (stepIndex >= 7) {
          list.push({ name: "temp_x", type: "int", val: stepIndex >= 27 ? "1" : "neinițializat" });
          list.push({ name: "temp_y", type: "int", val: stepIndex >= 28 ? "-3" : "neinițializat" });
        }
        if (stepIndex >= 30) {
          list.push({ name: "g", type: "int", val: "1" });
        }
        return list;
      };

      const getF1Vars = () => {
        const list = [
          { name: "a", type: "int", val: "13" },
          { name: "b", type: "int", val: "4" },
          { name: "x", type: "int&", val: stepIndex >= 27 ? "1" : "neinițializat" },
          { name: "y", type: "int&", val: stepIndex >= 28 ? "-3" : "neinițializat" }
        ];
        if (stepIndex >= 11) {
          list.push({ name: "temp_x", type: "int", val: stepIndex >= 23 ? "0" : "neinițializat" });
          list.push({ name: "temp_y", type: "int", val: stepIndex >= 24 ? "1" : "neinițializat" });
        }
        if (stepIndex >= 26) {
          list.push({ name: "g", type: "int", val: "1" });
        }
        return list;
      };

      const getF2Vars = () => {
        const list = [
          { name: "a", type: "int", val: "4" },
          { name: "b", type: "int", val: "1" },
          { name: "x", type: "int&", val: stepIndex >= 23 ? "0" : "neinițializat" },
          { name: "y", type: "int&", val: stepIndex >= 24 ? "1" : "neinițializat" }
        ];
        if (stepIndex >= 15) {
          list.push({ name: "temp_x", type: "int", val: stepIndex >= 19 ? "1" : "neinițializat" });
          list.push({ name: "temp_y", type: "int", val: stepIndex >= 20 ? "0" : "neinițializat" });
        }
        if (stepIndex >= 22) {
          list.push({ name: "g", type: "int", val: "1" });
        }
        return list;
      };

      const getF3Vars = () => {
        return [
          { name: "a", type: "int", val: "1" },
          { name: "b", type: "int", val: "0" },
          { name: "x", type: "int&", val: stepIndex >= 19 ? "1" : "neinițializat" },
          { name: "y", type: "int&", val: stepIndex >= 20 ? "0" : "neinițializat" }
        ];
      };

      if (stepIndex <= 4) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        vars.push(...getMainVars());
      } else if (stepIndex >= 5 && stepIndex <= 8) {
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF0Vars());
      } else if (stepIndex >= 9 && stepIndex <= 12) {
        frames.push({ name: "gcd(a = 13, b = 4, &x = temp_x, &y = temp_y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: 12 });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF1Vars());
      } else if (stepIndex >= 13 && stepIndex <= 16) {
        frames.push({ name: "gcd(a = 4, b = 1, &x = temp_x, &y = temp_y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "gcd(a = 13, b = 4, &x = temp_x, &y = temp_y)", file: "main.cpp", line: 12 });
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: 12 });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF2Vars());
      } else if (stepIndex >= 17 && stepIndex <= 21) {
        frames.push({ name: "gcd(a = 1, b = 0, &x = temp_x, &y = temp_y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "gcd(a = 4, b = 1, &x = temp_x, &y = temp_y)", file: "main.cpp", line: 12 });
        frames.push({ name: "gcd(a = 13, b = 4, &x = temp_x, &y = temp_y)", file: "main.cpp", line: 12 });
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: 12 });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF3Vars());
      } else if (stepIndex >= 22 && stepIndex <= 25) {
        frames.push({ name: "gcd(a = 4, b = 1, &x = temp_x, &y = temp_y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "gcd(a = 13, b = 4, &x = temp_x, &y = temp_y)", file: "main.cpp", line: 12 });
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: 12 });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF2Vars());
      } else if (stepIndex >= 26 && stepIndex <= 29) {
        frames.push({ name: "gcd(a = 13, b = 4, &x = temp_x, &y = temp_y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: 12 });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF1Vars());
      } else if (stepIndex >= 30 && stepIndex <= 33) {
        frames.push({ name: "gcd(a = 30, b = 13, &x = x, &y = y)", file: "main.cpp", line: activeLine });
        frames.push({ name: "main()", file: "main.cpp", line: 22 });
        vars.push(...getF0Vars());
      } else if (stepIndex >= 34) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        vars.push(...getMainVars());
      }

      const inlineParts = [];
      vars.forEach(v => {
        if (v.val !== "neinițializat") {
          inlineParts.push(`${v.name}: ${v.val}`);
        }
      });
      if (inlineParts.length > 0) {
        inlineVal = inlineParts.join(", ");
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (stepIndex <= 4) {
        if (lineNum === 19 && stepIndex >= 1) return "a: 30";
        if (lineNum === 20 && stepIndex >= 2) return "b: 13";
        if (lineNum === 21 && stepIndex >= 3) return "x: 0, y: 0";
        if (lineNum === 22 && stepIndex >= 34) return "g: 1, x: -3, y: 7";
      } else if (stepIndex >= 5 && stepIndex <= 8) {
        if (lineNum === 5) return "a: 30, b: 13";
        if (lineNum === 6) return "b: 13";
        if (lineNum === 11 && stepIndex >= 7) return "temp_x: ?, temp_y: ?";
        if (lineNum === 12 && stepIndex >= 8) return "calling gcd(13, 4)";
      } else if (stepIndex >= 9 && stepIndex <= 12) {
        if (lineNum === 5) return "a: 13, b: 4";
        if (lineNum === 6) return "b: 4";
        if (lineNum === 11 && stepIndex >= 11) return "temp_x: ?, temp_y: ?";
        if (lineNum === 12 && stepIndex >= 12) return "calling gcd(4, 1)";
      } else if (stepIndex >= 13 && stepIndex <= 16) {
        if (lineNum === 5) return "a: 4, b: 1";
        if (lineNum === 6) return "b: 1";
        if (lineNum === 11 && stepIndex >= 15) return "temp_x: ?, temp_y: ?";
        if (lineNum === 12 && stepIndex >= 16) return "calling gcd(1, 0)";
      } else if (stepIndex >= 17 && stepIndex <= 21) {
        if (lineNum === 5) return "a: 1, b: 0";
        if (lineNum === 6) return "b: 0";
        if (lineNum === 7 && stepIndex >= 19) return "x: 1";
        if (lineNum === 8 && stepIndex >= 20) return "y: 0";
        if (lineNum === 9 && stepIndex >= 21) return "return 1";
      } else if (stepIndex >= 22 && stepIndex <= 25) {
        if (lineNum === 12 && stepIndex >= 22) return "g: 1, temp_x: 1, temp_y: 0";
        if (lineNum === 13 && stepIndex >= 23) return "x: 0";
        if (lineNum === 14 && stepIndex >= 24) return "y: 1";
        if (lineNum === 15 && stepIndex >= 25) return "return 1";
      } else if (stepIndex >= 26 && stepIndex <= 29) {
        if (lineNum === 12 && stepIndex >= 26) return "g: 1, temp_x: 0, temp_y: 1";
        if (lineNum === 13 && stepIndex >= 27) return "x: 1";
        if (lineNum === 14 && stepIndex >= 28) return "y: -3";
        if (lineNum === 15 && stepIndex >= 29) return "return 1";
      } else if (stepIndex >= 30 && stepIndex <= 33) {
        if (lineNum === 12 && stepIndex >= 30) return "g: 1, temp_x: 1, temp_y: -3";
        if (lineNum === 13 && stepIndex >= 31) return "x: -3";
        if (lineNum === 14 && stepIndex >= 32) return "y: 7";
        if (lineNum === 15 && stepIndex >= 33) return "return 1";
      } else if (stepIndex >= 34) {
        if (lineNum === 22) return "g: 1, x: -3, y: 7";
        if (lineNum === 23) return "return 0";
      }
      return null;
    }
  }
};
