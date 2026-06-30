export const data = {
  "presentation": `### Prezentare Generală

Inversul modular al unui număr întreg $a$ în raport cu un modul $m$ este un număr întreg $x$ care satisface ecuația de congruență:
$a \\cdot x \\equiv 1 \\pmod{m}$

Acesta există dacă și numai dacă $a$ și $m$ sunt prime între ele, adică $\\gcd(a, m) = 1$. Inversul modular poate fi văzut ca echivalentul împărțirii în aritmetica modulară: a împărți la $a$ modulo $m$ este echivalent cu a înmulți cu inversul modular $x$.

Algoritmul lui Euclid Extins determină coeficienții întregi $x$ și $y$ din identitatea lui Bézout:
$a \\cdot x + b \\cdot y = \\gcd(a, b)$

Atunci când $b = m$ și $\\gcd(a, m) = 1$, ecuația devine $a \\cdot x + m \\cdot y = 1$. Trecând această ecuație modulo $m$, obținem $a \\cdot x \\equiv 1 \\pmod{m}$, ceea ce înseamnă că valoarea lui $x$ (adusă în intervalul $[0, m - 1]$) este exact inversul modular căutat.`,
  "complexity": `### Complexitate

- **Timp:** $O(\\log(\\min(a, b)))$ — algoritmul urmează pașii Algoritmului lui Euclid standard pentru determinarea celui mai mare divizor comun, unde la fiecare două iterații argumentele se înjumătățesc cel puțin.
- **Spațiu:** $O(\\log(\\min(a, b)))$ — din cauza recursivității pe stiva de apeluri. Fiecare apel consumă un frame pe stivă pentru a memora variabilele locale $x1$ și $y1$.`,
  "variations": `### Variații și Edge Cases

1. **Inversul nu există ($\\gcd(a, m) > 1$):**
   Dacă cel mai mare divizor comun al lui $a$ și $m$ nu este 1, inversul modular nu există. Funcția returnează \`-1\` în acest caz.

2. **Aducerea inversului la un număr pozitiv:**
   Valoarea coeficientului $x$ obținută din algoritm poate fi negativă. Pentru a obține reprezentantul pozitiv din clasa de resturi, aplicăm formula \`(x % m + m) % m\`.

3. **Alternativă cu Micul Teoremă a lui Fermat:**
   Dacă modulul $m$ este un număr prim, inversul modular al lui $a$ poate fi calculat mai simplu utilizând exponentierea rapidă:
   $a^{-1} \\equiv a^{m-2} \\pmod{m}$
   Această abordare are o complexitate de $O(\\log m)$ timp și $O(1)$ spațiu (iterativ), fiind extrem de des întâlnită în competiții.`,
  "applications": `### Aplicații

- **Împărțirea modulară:** Permite calcularea unor fracții mari modulo un număr prim (de exemplu, combinări $\\binom{n}{k} \\pmod{10^9 + 7}$), unde împărțirea directă nu este permisă.
- **Criptografie:** Algoritmul RSA folosește Euclid Extins pentru a calcula cheia privată de decriptare $d$ ca fiind inversul modular al cheii de criptare $e$ modulo $\\phi(n)$.
- **Rezolvarea ecuațiilor diofantice liniare:** Algoritmul extins este baza pentru rezolvarea ecuațiilor de forma $a \\cdot x + b \\cdot y = c$.
- **Teorema Chineză a Resturilor (CRT):** Inversul modular este utilizat direct pentru a reconstitui un număr dintr-un set de resturi modulo factori primi între ei.`,
  "code": `#include <iostream>

using namespace std;

// Algoritmul lui Euclid Extins: gaseste x si y astfel incat a*x + b*y = gcd(a, b)
long long extGCD(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long d = extGCD(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}

long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extGCD(a, m, x, y);
    if (g != 1) {
        return -1; // Inversul nu exista
    } else {
        return (x % m + m) % m;
    }
}

int main() {
    long long inv = modInverse(3, 11);
    cout << "inv = " << inv << endl;
    return 0;
}

// Metoda 2: Invers modular folosind Mica Teoremă a lui Fermat
// Funcționează doar când modulul p este un număr prim
long long power(long long base, long long exp, long long mod) {
    long long res = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2;
    }
    return res;
}

long long modInverseFermat(long long a, long long p) {
    return power(a, p - 2, p);
}
`,
  "explanations": [
    {
      "line": 30,
      "text": "Se apelează funcția `modInverse(3, 11)` din funcția principală `main()` pentru a găsi inversul lui $3$ modulo $11$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "main()", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile Curente",
          "groups": [
            [
              { "val": "inv = ?", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Intrăm în funcția `modInverse` cu argumentele $a = 3$ și $m = 11$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "main()", "active": false },
              { "val": "modInverse(3, 11)", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile Curente",
          "groups": [
            [
              { "val": "a = 3", "active": true },
              { "val": "m = 11", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 20,
      "text": "Declarăm variabilele locale `x` și `y` care vor stoca coeficienții combinației liniare returnați de algoritmul lui Euclid Extins.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "main()", "active": false },
              { "val": "modInverse(3, 11)", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile Curente",
          "groups": [
            [
              { "val": "a = 3", "active": false },
              { "val": "m = 11", "active": false },
              { "val": "x = ?", "active": true },
              { "val": "y = ?", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Apelăm funcția recursivă `extGCD` cu parametrii $a = 3$, $m = 11$, trimițând variabilele `x` și `y` prin referință pentru a le completa pe parcurs.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "main()", "active": false },
              { "val": "modInverse(3, 11)", "active": false },
              { "val": "extGCD(3, 11)", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile Curente",
          "groups": [
            [
              { "val": "a = 3", "active": true },
              { "val": "b = 11", "active": true },
              { "val": "x = ?", "active": false },
              { "val": "y = ?", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Primul apel al funcției `extGCD` începe execuția cu $a = 3$ și $b = 11$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "modInverse", "active": false },
              { "val": "extGCD(3, 11) [Nivel 1]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile extGCD [Nivel 1]",
          "groups": [
            [
              { "val": "a = 3", "active": true },
              { "val": "b = 11", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm cazul de bază: $b == 0$. Deoarece $b = 11$, condiția este falsă. Continuăm execuția.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "modInverse", "active": false },
              { "val": "extGCD(3, 11) [Nivel 1]", "active": true }
            ]
          ]
        },
        {
          "label": "Verificare",
          "groups": [
            [
              { "val": "11 == 0 ? Nu", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Declarăm variabilele locale `x1` și `y1` pentru a memora coeficienții întorși de sub-problema recursivă.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "modInverse", "active": false },
              { "val": "extGCD(3, 11) [Nivel 1]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 1]",
          "groups": [
            [
              { "val": "a = 3", "active": false },
              { "val": "b = 11", "active": false },
              { "val": "x1 = ?", "active": true },
              { "val": "y1 = ?", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `extGCD` cu noile argumente: $b = 11$ și $a \\% b = 3 \\% 11 = 3$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(3, 11) [Nivel 1]", "active": false },
              { "val": "extGCD(11, 3) [Nivel 2]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 2]",
          "groups": [
            [
              { "val": "a = 11", "active": true },
              { "val": "b = 3", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Al doilea apel recursiv (`Nivel 2`) începe execuția cu $a = 11$ și $b = 3$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(3, 11)", "active": false },
              { "val": "extGCD(11, 3) [Nivel 2]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 2]",
          "groups": [
            [
              { "val": "a = 11", "active": true },
              { "val": "b = 3", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm cazul de bază: $b == 0$ pe `Nivelul 2`. Deoarece $b = 3$, condiția este falsă. Continuăm recursivitatea.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              { "val": "3 == 0 ? Nu", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Declarăm variabilele `x1` și `y1` specifice acestui apel de nivel 2.",
      "blocksVisual": [
        {
          "label": "Variabile [Nivel 2]",
          "groups": [
            [
              { "val": "a = 11", "active": false },
              { "val": "b = 3", "active": false },
              { "val": "x1 = ?", "active": true },
              { "val": "y1 = ?", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `extGCD` cu $b = 3$ și $a \\% b = 11 \\% 3 = 2$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(11, 3)", "active": false },
              { "val": "extGCD(3, 2) [Nivel 3]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 3]",
          "groups": [
            [
              { "val": "a = 3", "active": true },
              { "val": "b = 2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Al treilea apel recursiv (`Nivel 3`) începe execuția cu $a = 3$ și $b = 2$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(11, 3)", "active": false },
              { "val": "extGCD(3, 2) [Nivel 3]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 3]",
          "groups": [
            [
              { "val": "a = 3", "active": true },
              { "val": "b = 2", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm cazul de bază: $b == 0$ pe `Nivelul 3`. Cum $b = 2$, continuăm mai departe.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              { "val": "2 == 0 ? Nu", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Declarăm variabilele `x1` și `y1` specifice acestui apel de nivel 3.",
      "blocksVisual": [
        {
          "label": "Variabile [Nivel 3]",
          "groups": [
            [
              { "val": "a = 3", "active": false },
              { "val": "b = 2", "active": false },
              { "val": "x1 = ?", "active": true },
              { "val": "y1 = ?", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `extGCD` cu $b = 2$ și $a \\% b = 3 \\% 2 = 1$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(3, 2)", "active": false },
              { "val": "extGCD(2, 1) [Nivel 4]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 4]",
          "groups": [
            [
              { "val": "a = 2", "active": true },
              { "val": "b = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Al patrulea apel recursiv (`Nivel 4`) începe execuția cu $a = 2$ și $b = 1$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(3, 2)", "active": false },
              { "val": "extGCD(2, 1) [Nivel 4]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 4]",
          "groups": [
            [
              { "val": "a = 2", "active": true },
              { "val": "b = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm cazul de bază: $b == 0$ pe `Nivelul 4`. Deoarece $b = 1$, continuăm.",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              { "val": "1 == 0 ? Nu", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Declarăm variabilele `x1` și `y1` specifice apelului de nivel 4.",
      "blocksVisual": [
        {
          "label": "Variabile [Nivel 4]",
          "groups": [
            [
              { "val": "a = 2", "active": false },
              { "val": "b = 1", "active": false },
              { "val": "x1 = ?", "active": true },
              { "val": "y1 = ?", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Apelăm recursiv `extGCD` cu $b = 1$ și $a \\% b = 2 \\% 1 = 0$. Aceasta ne va duce la cazul elementar.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(2, 1)", "active": false },
              { "val": "extGCD(1, 0) [Nivel 5]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 5]",
          "groups": [
            [
              { "val": "a = 1", "active": true },
              { "val": "b = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 6,
      "text": "Al cincilea apel recursiv (`Nivel 5`) începe cu $a = 1$ și $b = 0$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(2, 1)", "active": false },
              { "val": "extGCD(1, 0) [Nivel 5]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile [Nivel 5]",
          "groups": [
            [
              { "val": "a = 1", "active": true },
              { "val": "b = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 7,
      "text": "Verificăm cazul de bază: $b == 0$ pe `Nivelul 5`. Condiția este acum adevărată (0 == 0).",
      "blocksVisual": [
        {
          "label": "Verificare",
          "groups": [
            [
              { "val": "0 == 0 ? Da", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Cazul de bază atins: setăm $x = 1$. Acesta corespunde coeficientului lui $a$ când restul este $0$.",
      "blocksVisual": [
        {
          "label": "Setare x case de bază",
          "groups": [
            [
              { "val": "x = 1", "active": true },
              { "val": "y = ?", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Setăm $y = 0$. Acesta este coeficientul corespunzător restului nul.",
      "blocksVisual": [
        {
          "label": "Setare y case de bază",
          "groups": [
            [
              { "val": "x = 1", "active": false },
              { "val": "y = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Returnăm valoarea lui $a$, adică cel mai mare divizor comun provizoriu ($d = 1$), și încheiem apelul de `Nivel 5`.",
      "blocksVisual": [
        {
          "label": "Returnare [Nivel 5]",
          "groups": [
            [
              { "val": "return a = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Revenim la apelul de `Nivel 4`. Variabila `d` primește rezultatul $1$. Sub-apelul a determinat $x1 = 1$ și $y1 = 0$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(3, 2)", "active": false },
              { "val": "extGCD(2, 1) [Nivel 4]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile primite [Nivel 4]",
          "groups": [
            [
              { "val": "x1 = 1", "active": true },
              { "val": "y1 = 0", "active": true },
              { "val": "d = 1", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Actualizăm coeficientul curent $x$ cu valoarea $y1$ primită de la sub-apel, deci $x = 0$.",
      "blocksVisual": [
        {
          "label": "Calcul: x = y1",
          "groups": [
            [
              { "val": "x = 0", "active": true },
              { "val": "y = ?", "active": false },
              { "val": "x1 = 1", "active": false },
              { "val": "y1 = 0", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Calculăm coeficientul $y = x1 - y1 \\cdot (a / b) = 1 - 0 \\cdot (2 / 1) = 1$.",
      "blocksVisual": [
        {
          "label": "Calcul: y = x1 - y1 * (a/b)",
          "groups": [
            [
              { "val": "x = 0", "active": false },
              { "val": "y = 1", "active": true },
              { "val": "a = 2", "active": false },
              { "val": "b = 1", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Returnăm valoarea divizorului comun $d = 1$ și încheiem apelul de `Nivel 4`.",
      "blocksVisual": [
        {
          "label": "Returnare [Nivel 4]",
          "groups": [
            [
              { "val": "return d = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Revenim la apelul de `Nivel 3`. Primim $d = 1$, iar sub-apelul a setat $x1 = 0$ și $y1 = 1$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(11, 3)", "active": false },
              { "val": "extGCD(3, 2) [Nivel 3]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile primite [Nivel 3]",
          "groups": [
            [
              { "val": "x1 = 0", "active": true },
              { "val": "y1 = 1", "active": true },
              { "val": "d = 1", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Actualizăm $x = y1 = 1$.",
      "blocksVisual": [
        {
          "label": "Calcul: x = y1",
          "groups": [
            [
              { "val": "x = 1", "active": true },
              { "val": "y = ?", "active": false },
              { "val": "y1 = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Calculăm $y = x1 - y1 \\cdot (a / b) = 0 - 1 \\cdot (3 / 2) = -1$.",
      "blocksVisual": [
        {
          "label": "Calcul: y = x1 - y1 * (a/b)",
          "groups": [
            [
              { "val": "x = 1", "active": false },
              { "val": "y = -1", "active": true },
              { "val": "x1 = 0", "active": false },
              { "val": "y1 = 1", "active": false },
              { "val": "a = 3", "active": false },
              { "val": "b = 2", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Returnăm $d = 1$, încheind apelul de `Nivel 3`.",
      "blocksVisual": [
        {
          "label": "Returnare [Nivel 3]",
          "groups": [
            [
              { "val": "return d = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Revenim la apelul de `Nivel 2`. Sub-apelul a determinat $x1 = 1$ și $y1 = -1$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "extGCD(3, 11)", "active": false },
              { "val": "extGCD(11, 3) [Nivel 2]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile primite [Nivel 2]",
          "groups": [
            [
              { "val": "x1 = 1", "active": true },
              { "val": "y1 = -1", "active": true },
              { "val": "d = 1", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Actualizăm $x = y1 = -1$.",
      "blocksVisual": [
        {
          "label": "Calcul: x = y1",
          "groups": [
            [
              { "val": "x = -1", "active": true },
              { "val": "y = ?", "active": false },
              { "val": "y1 = -1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Calculăm $y = x1 - y1 \\cdot (a / b) = 1 - (-1) \\cdot (11 / 3) = 1 - (-1) \\cdot 3 = 1 + 3 = 4$.",
      "blocksVisual": [
        {
          "label": "Calcul: y = x1 - y1 * (a/b)",
          "groups": [
            [
              { "val": "x = -1", "active": false },
              { "val": "y = 4", "active": true },
              { "val": "x1 = 1", "active": false },
              { "val": "y1 = -1", "active": false },
              { "val": "a = 11", "active": false },
              { "val": "b = 3", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Returnăm $d = 1$, încheind apelul de `Nivel 2`.",
      "blocksVisual": [
        {
          "label": "Returnare [Nivel 2]",
          "groups": [
            [
              { "val": "return d = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Revenim la primul apel al `extGCD` (`Nivel 1`). Sub-apelul a determinat $x1 = -1$ și $y1 = 4$.",
      "blocksVisual": [
        {
          "label": "Stivă Apeluri",
          "groups": [
            [
              { "val": "modInverse", "active": false },
              { "val": "extGCD(3, 11) [Nivel 1]", "active": true }
            ]
          ]
        },
        {
          "label": "Variabile primite [Nivel 1]",
          "groups": [
            [
              { "val": "x1 = -1", "active": true },
              { "val": "y1 = 4", "active": true },
              { "val": "d = 1", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Actualizăm coeficientul din primul apel: $x = y1 = 4$.",
      "blocksVisual": [
        {
          "label": "Calcul: x = y1",
          "groups": [
            [
              { "val": "x = 4", "active": true },
              { "val": "y = ?", "active": false },
              { "val": "y1 = 4", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Calculăm coeficientul $y$ pentru primul apel: $y = x1 - y1 \\cdot (a / b) = -1 - 4 \\cdot (3 / 11) = -1 - 4 \\cdot 0 = -1$.",
      "blocksVisual": [
        {
          "label": "Calcul: y = x1 - y1 * (a/b)",
          "groups": [
            [
              { "val": "x = 4", "active": false },
              { "val": "y = -1", "active": true },
              { "val": "x1 = -1", "active": false },
              { "val": "y1 = 4", "active": false },
              { "val": "a = 3", "active": false },
              { "val": "b = 11", "active": false }
            ]
          ]
        }
      ]
    },
    {
      "line": 16,
      "text": "Returnăm $d = 1$ către funcția apelantă `modInverse` și încheiem execuția algoritmului lui Euclid Extins.",
      "blocksVisual": [
        {
          "label": "Returnare [Nivel 1]",
          "groups": [
            [
              { "val": "return d = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Revenim în `modInverse`. Coeficientul final $x$ este acum $4$, $y = -1$, iar cel mai mare divizor comun $g$ este $1$.",
      "blocksVisual": [
        {
          "label": "Revenire în modInverse",
          "groups": [
            [
              { "val": "modInverse", "active": true }
            ]
          ]
        },
        {
          "label": "Rezultate Euclid Extins",
          "groups": [
            [
              { "val": "x = 4", "active": true },
              { "val": "y = -1", "active": true },
              { "val": "g = 1", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Verificăm dacă cel mai mare divizor comun $g$ este diferit de 1. Deoarece $g = 1$, condiția este falsă (inversul modular există).",
      "blocksVisual": [
        {
          "label": "Verificare existență",
          "groups": [
            [
              { "val": "1 != 1 ? Nu", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Calculăm rezultatul final aducând coeficientul $x$ în domeniul pozitiv: $(x \\% m + m) \\% m = (4 \\% 11 + 11) \\% 11 = 4$. Returnăm valoarea 4.",
      "blocksVisual": [
        {
          "label": "Returnare invers modular",
          "groups": [
            [
              { "val": "return 4", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 30,
      "text": "Revenim în `main()`. Atribuim valoarea returnată (4) variabilei `inv`.",
      "blocksVisual": [
        {
          "label": "Revenire în main",
          "groups": [
            [
              { "val": "inv = 4", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Afișăm valoarea inversului modular la ieșirea standard: `inv = 4`.",
      "blocksVisual": [
        {
          "label": "Afișare stdout",
          "groups": [
            [
              { "val": "Afișat: inv = 4", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Funcția `main()` se încheie și returnează 0, finalizând cu succes execuția programului.",
      "blocksVisual": [
        {
          "label": "Final",
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
        "title": "Greatest Common Divisor of Strings",
        "url": "https://leetcode.com/problems/greatest-common-divisor-of-strings/",
        "desc": "Găsește cel mai mare divizor comun al două șiruri de caractere, o problemă de bază legată de algoritmul lui Euclid."
      }
    ],
    "medium": [
      {
        "title": "Simplified Fractions",
        "url": "https://leetcode.com/problems/simplified-fractions/",
        "desc": "Folosește determinarea coprimelor (gcd(a, b) == 1) pentru a genera toate fracțiile simplificate cu numitorul cel mult n."
      }
    ],
    "hard": [
      {
        "title": "Count Ways to Build Rooms in an Ant Colony",
        "url": "https://leetcode.com/problems/count-ways-to-build-rooms-in-an-ant-colony/",
        "desc": "Problemă dificilă de combinatorică ce necesită împărțire modulară. Se folosește Inversul Modular cu Euclid Extins sau Fermat pentru a efectua împărțirea modulo 10^9 + 7."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = [
        {
          "vars": [],
          "frames": [{ "name": "main()", "file": "main.cpp", "line": 30 }],
          "inlineVal": "Apel"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "m", "type": "long long", "val": "11", "expandable": false }
          ],
          "frames": [
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 19 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "m", "type": "long long", "val": "11", "expandable": false },
            { "name": "x", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 20 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "m", "type": "long long", "val": "11", "expandable": false },
            { "name": "x", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "Apel extGCD"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 6 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 7 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "b = 11"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 12 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "Apel extGCD(11, 3)"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 6 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 7 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "b = 3"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 12 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "Apel extGCD(3, 2)"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 6 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 7 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "b = 2"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 12 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "Apel extGCD(2, 1)"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 6 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 7 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "b = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 12 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false },
            { "name": "x1", "type": "long long", "val": "uninitialized", "expandable": false },
            { "name": "y1", "type": "long long", "val": "uninitialized", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "Apel extGCD(1, 0)"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "1", "expandable": false },
            { "name": "b", "type": "long long", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(1, 0, x1, y1)", "file": "main.cpp", "line": 6 },
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": null
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "1", "expandable": false },
            { "name": "b", "type": "long long", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(1, 0, x1, y1)", "file": "main.cpp", "line": 7 },
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "b = 0 (adevarat)"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "1", "expandable": false },
            { "name": "b", "type": "long long", "val": "0", "expandable": false },
            { "name": "x", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(1, 0, x1, y1)", "file": "main.cpp", "line": 8 },
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "x = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "1", "expandable": false },
            { "name": "b", "type": "long long", "val": "0", "expandable": false },
            { "name": "x", "type": "long long", "val": "1", "expandable": false },
            { "name": "y", "type": "long long", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(1, 0, x1, y1)", "file": "main.cpp", "line": 9 },
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "y = 0"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "1", "expandable": false },
            { "name": "b", "type": "long long", "val": "0", "expandable": false },
            { "name": "x", "type": "long long", "val": "1", "expandable": false },
            { "name": "y", "type": "long long", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(1, 0, x1, y1)", "file": "main.cpp", "line": 10 },
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "return 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "0", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "d = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "0", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "0", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 14 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "x = 0"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "0", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "0", "expandable": false },
            { "name": "y", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 15 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "y = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "2", "expandable": false },
            { "name": "b", "type": "long long", "val": "1", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "0", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "0", "expandable": false },
            { "name": "y", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(2, 1, x1, y1)", "file": "main.cpp", "line": 16 },
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "return 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false },
            { "name": "x1", "type": "long long", "val": "0", "expandable": false },
            { "name": "y1", "type": "long long", "val": "1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "d = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false },
            { "name": "x1", "type": "long long", "val": "0", "expandable": false },
            { "name": "y1", "type": "long long", "val": "1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 14 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "x = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false },
            { "name": "x1", "type": "long long", "val": "0", "expandable": false },
            { "name": "y1", "type": "long long", "val": "1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "1", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 15 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "y = -1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "2", "expandable": false },
            { "name": "x1", "type": "long long", "val": "0", "expandable": false },
            { "name": "y1", "type": "long long", "val": "1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "1", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 2, x1, y1)", "file": "main.cpp", "line": 16 },
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "return 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 13 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "d = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "-1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 14 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "x = -1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "-1", "expandable": false },
            { "name": "y", "type": "long long", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 15 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "y = 4"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "11", "expandable": false },
            { "name": "b", "type": "long long", "val": "3", "expandable": false },
            { "name": "x1", "type": "long long", "val": "1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "-1", "expandable": false },
            { "name": "y", "type": "long long", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(11, 3, x1, y1)", "file": "main.cpp", "line": 16 },
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "return 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false },
            { "name": "x1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "4", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 13 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "d = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false },
            { "name": "x1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "4", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 14 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "x = 4"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false },
            { "name": "x1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "4", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "4", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 15 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "y = -1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "b", "type": "long long", "val": "11", "expandable": false },
            { "name": "x1", "type": "long long", "val": "-1", "expandable": false },
            { "name": "y1", "type": "long long", "val": "4", "expandable": false },
            { "name": "d", "type": "long long", "val": "1", "expandable": false },
            { "name": "x", "type": "long long", "val": "4", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false }
          ],
          "frames": [
            { "name": "extGCD(3, 11, x, y)", "file": "main.cpp", "line": 16 },
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "return 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "m", "type": "long long", "val": "11", "expandable": false },
            { "name": "x", "type": "long long", "val": "4", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false },
            { "name": "g", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 21 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "g = 1"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "m", "type": "long long", "val": "11", "expandable": false },
            { "name": "x", "type": "long long", "val": "4", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false },
            { "name": "g", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 22 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "g != 1 (fals)"
        },
        {
          "vars": [
            { "name": "a", "type": "long long", "val": "3", "expandable": false },
            { "name": "m", "type": "long long", "val": "11", "expandable": false },
            { "name": "x", "type": "long long", "val": "4", "expandable": false },
            { "name": "y", "type": "long long", "val": "-1", "expandable": false },
            { "name": "g", "type": "long long", "val": "1", "expandable": false }
          ],
          "frames": [
            { "name": "modInverse(3, 11)", "file": "main.cpp", "line": 25 },
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "return 4"
        },
        {
          "vars": [
            { "name": "inv", "type": "long long", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "main()", "file": "main.cpp", "line": 30 }
          ],
          "inlineVal": "inv = 4"
        },
        {
          "vars": [
            { "name": "inv", "type": "long long", "val": "4", "expandable": false }
          ],
          "frames": [
            { "name": "main()", "file": "main.cpp", "line": 31 }
          ],
          "inlineVal": "Afișat inv = 4"
        },
        {
          "vars": [],
          "frames": [{ "name": "main()", "file": "main.cpp", "line": 32 }],
          "inlineVal": "return 0"
        }
      ];
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || 30 }], inlineVal: null };
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
        { "30": "Apel" },
        { "19": "a = 3, m = 11" },
        { "20": "x=?, y=?" },
        { "21": "Apel extGCD" },
        { "6": "a = 3, b = 11" },
        { "7": "b = 11" },
        { "12": "x1=?, y1=?" },
        { "13": "Apel extGCD(11, 3)" },
        { "6": "a = 11, b = 3" },
        { "7": "b = 3" },
        { "12": "x1=?, y1=?" },
        { "13": "Apel extGCD(3, 2)" },
        { "6": "a = 3, b = 2" },
        { "7": "b = 2" },
        { "12": "x1=?, y1=?" },
        { "13": "Apel extGCD(2, 1)" },
        { "6": "a = 2, b = 1" },
        { "7": "b = 1" },
        { "12": "x1=?, y1=?" },
        { "13": "Apel extGCD(1, 0)" },
        { "6": "a = 1, b = 0" },
        { "7": "b = 0 (adevarat)" },
        { "8": "x = 1" },
        { "9": "y = 0" },
        { "10": "return 1" },
        { "13": "d = 1" },
        { "14": "x = 0" },
        { "15": "y = 1" },
        { "16": "return 1" },
        { "13": "d = 1" },
        { "14": "x = 1" },
        { "15": "y = -1" },
        { "16": "return 1" },
        { "13": "d = 1" },
        { "14": "x = -1" },
        { "15": "y = 4" },
        { "16": "return 1" },
        { "13": "d = 1" },
        { "14": "x = 4" },
        { "15": "y = -1" },
        { "16": "return 1" },
        { "21": "g = 1" },
        { "22": "g != 1 (fals)" },
        { "25": "return 4" },
        { "30": "inv = 4" },
        { "31": "Afișat inv = 4" },
        { "32": "return 0" }
      ];
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;
    }
  }
};
