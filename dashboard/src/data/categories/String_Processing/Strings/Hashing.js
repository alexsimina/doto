export const data = {
  presentation: `### Hash-ul de Șiruri (String Hashing)

Hash-ul de șiruri este o tehnică extrem de eficientă folosită pentru a compara două șiruri de caractere în timp constant $O(1)$, după o preprocesare în timp liniar $O(N)$. Ideea de bază este de a asocia fiecărui șir de caractere o valoare numerică întreagă (cod hash), astfel încât două șiruri identice să aibă întotdeauna același hash, iar șirurile diferite să aibă coduri hash diferite cu o probabilitate foarte mare.

### Metoda Rolling Hash Polynomial

Cea mai utilizată funcție de hash pentru șiruri este **Polynomial Rolling Hash**. Pentru un șir $s$ de lungime $N$, valoarea de hash este definită ca:

$$hash(s) = \\left( \\sum_{i=0}^{N-1} s[i] \\cdot P^i \\right) \\pmod M$$

Unde:
- $s[i]$ este codul numeric al caracterului de pe poziția $i$ (de exemplu, $s[i] = \\text{code}(s[i]) - \\text{code}('a') + 1$ pentru caractere mici).
- $P$ este o bază (un număr prim, de obicei $P = 31$ pentru caractere mici sau $P = 53$ dacă sunt incluse și litere mari).
- $M$ este un modul mare, adesea un număr prim precum $10^9 + 7$ sau $10^9 + 9$, pentru a reduce probabilitatea coliziunilor.

### Coliziuni de Hash

O coliziune apare atunci când două șiruri diferite $s_1 \\ne s_2$ produc același hash: $hash(s_1) = hash(s_2)$. Conform principiului cutiei (Dirichlet), coliziunile sunt inevitabile deoarece mulțimea tuturor șirurilor este infinită, în timp ce mulțimea valorilor hash este finită (mărimea $M$). Pentru a reduce riscul coliziunilor în competiții, se folosește adesea **Double Hashing** (calcularea a două hash-uri independente cu perechi diferite de $(P, M)$).`,

  complexity: `### Complexitate

- **Timp Preprocesare:** $O(N)$ — calculul hash-urilor pentru toate prefixele șirului durează timp liniar, unde $N$ este lungimea șirului.
- **Timp Interogare (Subsecvență):** $O(1)$ — odată preprocesate prefixele și puterile lui $P$, hash-ul oricărei subsecvențe $s[L..R]$ se poate calcula în timp constant folosind formula:
  $$hash(s[L..R]) = \\left( hash(s[0..R]) - hash(s[0..L-1]) \\cdot P^{R-L+1} \\right) \\pmod M$$
- **Spațiu:** $O(1)$ dacă se calculează doar hash-ul total, sau $O(N)$ dacă se stochează hash-urile tuturor prefixelor pentru interogări rapide.`,

  variations: `### Variații și Bune Practici

- **Double Hashing:** Folosirea a două module diferite, de exemplu $M_1 = 10^9 + 7$ și $M_2 = 10^9 + 9$. Șansa de coliziune scade la $\\approx 1 / (M_1 \\cdot M_2) \\approx 10^{-18}$, ceea ce este practic imposibil să apară în teste.
- **Evitarea modulului $2^{64}$:** Utilizarea tipului \`unsigned long long\` fără modul explicit (ceea ce echivalează cu modulo $2^{64}$) este vulnerabilă la teste create special pentru a genera coliziuni (sistemul de teste anti-hash). De aceea se recomandă module prime mari.`,

  applications: `### Aplicații Practice

- **Algoritmul Rabin-Karp:** Căutarea unui șablon (pattern) într-un text în timp mediu $O(N + M)$.
- **Determinarea numărului de subsecvențe unice** ale unui șir.
- **Găsirea celui mai lung palindrom** sau a celei mai lungi subsecvențe comune utilizând căutarea binară combinată cu hash-ul.`,

  code: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string s = "algoritm";
    long long P = 31;
    long long M = 1000000009;
    
    long long hash_val = 0;
    long long power_val = 1;
    
    for (int i = 0; i < s.length(); i++) {
        int char_code = s[i] - 'a' + 1;
        hash_val = (hash_val + char_code * power_val) % M;
        power_val = (power_val * P) % M;
    }
    
    return 0;
}
`,

  explanations: [
    {
      line: 8,
      text: "Inițializăm șirul de caractere $s = \\text{\"algoritm\"}$ pe care îl vom folosi pentru a calcula codul hash.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a", active: true }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "?" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "?" }]] }
      ]
    },
    {
      line: 9,
      text: "Definim baza polinomului $P = 31$. Aceasta este o valoare standard pentru literele mici din alfabet.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "?" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "?" }]] }
      ]
    },
    {
      line: 10,
      text: "Definim modulul prim $M = 1000000009$ pentru a menține valorile de hash în limitele tipurilor de date standard și a preveni overflow-ul.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "?" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "?" }]] }
      ]
    },
    {
      line: 12,
      text: "Inițializăm valoarea de hash inițială `hash_val = 0`.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "?" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "0", active: true }]] }
      ]
    },
    {
      line: 13,
      text: "Inițializăm prima putere a bazei: $P^0 = 1$ în `power_val = 1`.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "1", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "0" }]] }
      ]
    },
    {
      line: 15,
      text: "Intrăm în buclă cu indexul $i = 0$. Condiția $i < \\text{s.length()}$ ($0 < 8$) este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a [i=0]", active: true }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "1" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "0" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului curent $s[0] = \\text{'a'}$. Codul său este $1$ (deoarece $\\text{'a'} - \\text{'a'} + 1 = 1$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a [i=0]", active: true }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "1" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 1", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția caracterului la hash: $\\text{hash\\_val} = (0 + 1 \\cdot 1) \\pmod M = 1$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a [i=0]", active: true }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "1" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "1", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (1 \\cdot 31) \\pmod M = 31$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a [i=0]" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "31", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "1" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 1$. Condiția $1 < 8$ este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l [i=1]", active: true }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "31" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "1" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[1] = \\text{'l'}$. Codul său este $12$ ($\\text{'l'} - \\text{'a'} + 1 = 12$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l [i=1]", active: true }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "31" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 12", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (1 + 12 \\cdot 31) \\pmod M = 373$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l [i=1]", active: true }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "31" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "373", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (31 \\cdot 31) \\pmod M = 961$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "961", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "373" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 2$. Condiția $2 < 8$ este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g [i=2]", active: true }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "961" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "373" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[2] = \\text{'g'}$. Codul său este $7$ ($\\text{'g'} - \\text{'a'} + 1 = 7$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g [i=2]", active: true }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "961" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 7", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (373 + 7 \\cdot 961) \\pmod M = 7100$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g [i=2]", active: true }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "961" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "7100", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (961 \\cdot 31) \\pmod M = 29791$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "29791", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "7100" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 3$. Condiția $3 < 8$ este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o [i=3]", active: true }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "29791" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "7100" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[3] = \\text{'o'}$. Codul său este $15$ ($\\text{'o'} - \\text{'a'} + 1 = 15$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o [i=3]", active: true }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "29791" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 15", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (7100 + 15 \\cdot 29791) \\pmod M = 453965$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o [i=3]", active: true }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "29791" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "453965", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (29791 \\cdot 31) \\pmod M = 923521$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "923521", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "453965" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 4$. Condiția $4 < 8$ este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r [i=4]", active: true }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "923521" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "453965" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[4] = \\text{'r'}$. Codul său este $18$ ($\\text{'r'} - \\text{'a'} + 1 = 18$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r [i=4]", active: true }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "923521" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 18", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (453965 + 18 \\cdot 923521) \\pmod M = 17077343$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r [i=4]", active: true }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "923521" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "17077343", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (923521 \\cdot 31) \\pmod M = 28629151$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "28629151", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "17077343" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 5$. Condiția $5 < 8$ este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i [i=5]", active: true }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "28629151" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "17077343" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[5] = \\text{'i'}$. Codul său este $9$ ($\\text{'i'} - \\text{'a'} + 1 = 9$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i [i=5]", active: true }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "28629151" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 9", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (17077343 + 9 \\cdot 28629151) \\pmod M = 274739702$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i [i=5]", active: true }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "28629151" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "274739702", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (28629151 \\cdot 31) \\pmod M = 887503681$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "887503681", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "274739702" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 6$. Condiția $6 < 8$ este adevărată.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t [i=6]", active: true }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "887503681" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "274739702" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[6] = \\text{'t'}$. Codul său este $20$ ($\\text{'t'} - \\text{'a'} + 1 = 20$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t [i=6]", active: true }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "887503681" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 20", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (274739702 + 20 \\cdot 887503681) \\pmod M = 24813160$. (S-a efectuat reducerea modulo $M$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t [i=6]", active: true }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "887503681" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "24813160", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (887503681 \\cdot 31) \\pmod M = 512613868$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "512613868", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "24813160" }]] }
      ]
    },
    {
      line: 15,
      text: "Trecem la indexul $i = 7$. Condiția $7 < 8$ este adevărată. Aceasta este ultima iterație.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m [i=7]", active: true }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "512613868" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "24813160" }]] }
      ]
    },
    {
      line: 16,
      text: "Calculăm valoarea numerică a caracterului $s[7] = \\text{'m'}$. Codul său este $13$ ($\\text{'m'} - \\text{'a'} + 1 = 13$).",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m [i=7]", active: true }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "512613868" }]] },
        { label: "Cod caracter", groups: [[{ val: "char_code = 13", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Adunăm contribuția la hash: $\\text{hash\\_val} = (24813160 + 13 \\cdot 512613868) \\pmod M = 688793390$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m [i=7]", active: true }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "512613868" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "688793390", active: true }]] }
      ]
    },
    {
      line: 18,
      text: "Actualizăm puterea lui $P$: $\\text{power\\_val} = (512613868 \\cdot 31) \\pmod M = 891029773$.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "891029773", active: true }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "688793390" }]] }
      ]
    },
    {
      line: 15,
      text: "Incrementăm indexul `i++` ($i = 8$). Condiția $8 < 8$ este acum FALSĂ. Ieșim din buclă.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Puteri P (power_val)", groups: [[{ val: "891029773" }]] },
        { label: "Hash total (hash_val)", groups: [[{ val: "688793390" }]] }
      ]
    },
    {
      line: 21,
      text: "Algoritmul a calculat cu succes hash-ul șirului \"algoritm\" ca fiind $688793390$ în timp $O(N)$ și spațiu $O(1)$. Programul se termină.",
      blocksVisual: [
        { label: "String (s)", groups: [[{ val: "a" }, { val: "l" }, { val: "g" }, { val: "o" }, { val: "r" }, { val: "i" }, { val: "t" }, { val: "m" }]] },
        { label: "Hash final", groups: [[{ val: "688793390", sorted: true }]] }
      ]
    }
  ],

  globalVars: [],

  problems: {
    easy: [
      {
        "title": "Repeated Substring Pattern",
        "url": "https://leetcode.com/problems/repeated-substring-pattern/",
        "desc": "Determinarea dacă șirul este format prin repetarea unui subșir."
      }
    ],
    medium: [
      {
        "title": "Longest Duplicate Substring",
        "url": "https://leetcode.com/problems/longest-duplicate-substring/",
        "desc": "Căutare binară pe lungime + Hashing."
      },
      {
        "title": "Substrings Hashing",
        "url": "https://cses.fi/problemset/task/2103",
        "desc": "Interogări rapide pe hash-urile subsecvențelor."
      }
    ],
    hard: [
      {
        "title": "Prefix-Suffix Palindrome",
        "url": "https://leetcode.com/problems/longest-happy-prefix/",
        "desc": "Găsirea celui mai lung prefix care este și sufix (KMP sau Hashing)."
      }
    ]
  },

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      const stepData = [
        { s: "algoritm", P: 31, M: 1000000009, hash_val: undefined, power_val: undefined, i: undefined, char_code: undefined }, // 0
        { s: "algoritm", P: 31, M: 1000000009, hash_val: undefined, power_val: undefined, i: undefined, char_code: undefined }, // 1
        { s: "algoritm", P: 31, M: 1000000009, hash_val: undefined, power_val: undefined, i: undefined, char_code: undefined }, // 2
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: undefined, i: undefined, char_code: undefined }, // 3
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: 1,         i: undefined, char_code: undefined }, // 4
        // i = 0
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: 1,         i: 0,         char_code: undefined }, // 5
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: 1,         i: 0,         char_code: 1         }, // 6
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 1,         i: 0,         char_code: 1         }, // 7
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 31,        i: 0,         char_code: 1         }, // 8
        // i = 1
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 31,        i: 1,         char_code: undefined }, // 9
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 31,        i: 1,         char_code: 12        }, // 10
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 31,        i: 1,         char_code: 12        }, // 11
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 961,       i: 1,         char_code: 12        }, // 12
        // i = 2
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 961,       i: 2,         char_code: undefined }, // 13
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 961,       i: 2,         char_code: 7         }, // 14
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 961,       i: 2,         char_code: 7         }, // 15
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 29791,     i: 2,         char_code: 7         }, // 16
        // i = 3
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 29791,     i: 3,         char_code: undefined }, // 17
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 29791,     i: 3,         char_code: 15        }, // 18
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 29791,     i: 3,         char_code: 15        }, // 19
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 923521,    i: 3,         char_code: 15        }, // 20
        // i = 4
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 923521,    i: 4,         char_code: undefined }, // 21
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 923521,    i: 4,         char_code: 18        }, // 22
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 923521,    i: 4,         char_code: 18        }, // 23
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 28629151,  i: 4,         char_code: 18        }, // 24
        // i = 5
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 28629151,  i: 5,         char_code: undefined }, // 25
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 28629151,  i: 5,         char_code: 9         }, // 26
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 28629151,  i: 5,         char_code: 9         }, // 27
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 887503681, i: 5,         char_code: 9         }, // 28
        // i = 6
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 887503681, i: 6,         char_code: undefined }, // 29
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 887503681, i: 6,         char_code: 20        }, // 30
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 887503681, i: 6,         char_code: 20        }, // 31
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 512613868, i: 6,         char_code: 20        }, // 32
        // i = 7
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 512613868, i: 7,         char_code: undefined }, // 33
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 512613868, i: 7,         char_code: 13        }, // 34
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 512613868, i: 7,         char_code: 13        }, // 35
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 891029773, i: 7,         char_code: 13        }, // 36
        // i = 8
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 891029773, i: 8,         char_code: undefined }, // 37
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 891029773, i: 8,         char_code: undefined }  // 38
      ];
      
      const curr = stepData[stepIndex] || stepData[stepData.length - 1];
      
      frames.push({ name: "main()", file: "main.cpp", line: activeLine || 8 });
      
      vars.push({ name: "s", type: "std::string", val: `"${curr.s}"`, expandable: false });
      vars.push({ name: "P", type: "long long", val: curr.P.toString(), expandable: false });
      vars.push({ name: "M", type: "long long", val: curr.M.toString(), expandable: false });
      
      if (curr.hash_val !== undefined) {
        vars.push({ name: "hash_val", type: "long long", val: curr.hash_val.toString(), expandable: false });
      }
      if (curr.power_val !== undefined) {
        vars.push({ name: "power_val", type: "long long", val: curr.power_val.toString(), expandable: false });
      }
      if (curr.i !== undefined) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }
      if (curr.char_code !== undefined) {
        vars.push({ name: "char_code", type: "int", val: curr.char_code.toString(), expandable: false });
      }
      
      let inlineVal = `i: ${curr.i !== undefined ? curr.i : '?'}`;
      if (curr.hash_val !== undefined) inlineVal += `, hash_val: ${curr.hash_val}`;
      if (curr.power_val !== undefined) inlineVal += `, power_val: ${curr.power_val}`;
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const stepData = [
        { s: "algoritm", P: 31, M: 1000000009, hash_val: undefined, power_val: undefined, i: undefined, char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: undefined, power_val: undefined, i: undefined, char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: undefined, power_val: undefined, i: undefined, char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: undefined, i: undefined, char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: 1,         i: undefined, char_code: undefined },
        // i = 0
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: 1,         i: 0,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 0,         power_val: 1,         i: 0,         char_code: 1         },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 1,         i: 0,         char_code: 1         },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 31,        i: 0,         char_code: 1         },
        // i = 1
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 31,        i: 1,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 1,         power_val: 31,        i: 1,         char_code: 12        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 31,        i: 1,         char_code: 12        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 961,       i: 1,         char_code: 12        },
        // i = 2
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 961,       i: 2,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 373,       power_val: 961,       i: 2,         char_code: 7         },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 961,       i: 2,         char_code: 7         },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 29791,     i: 2,         char_code: 7         },
        // i = 3
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 29791,     i: 3,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 7100,      power_val: 29791,     i: 3,         char_code: 15        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 29791,     i: 3,         char_code: 15        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 923521,    i: 3,         char_code: 15        },
        // i = 4
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 923521,    i: 4,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 453965,    power_val: 923521,    i: 4,         char_code: 18        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 923521,    i: 4,         char_code: 18        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 28629151,  i: 4,         char_code: 18        },
        // i = 5
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 28629151,  i: 5,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 17077343,  power_val: 28629151,  i: 5,         char_code: 9         },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 28629151,  i: 5,         char_code: 9         },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 887503681, i: 5,         char_code: 9         },
        // i = 6
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 887503681, i: 6,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 274739702, power_val: 887503681, i: 6,         char_code: 20        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 887503681, i: 6,         char_code: 20        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 512613868, i: 6,         char_code: 20        },
        // i = 7
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 512613868, i: 7,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 24813160,  power_val: 512613868, i: 7,         char_code: 13        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 512613868, i: 7,         char_code: 13        },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 891029773, i: 7,         char_code: 13        },
        // i = 8
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 891029773, i: 8,         char_code: undefined },
        { s: "algoritm", P: 31, M: 1000000009, hash_val: 688793390, power_val: 891029773, i: 8,         char_code: undefined }
      ];
      const curr = stepData[stepIndex];
      if (!curr) return null;
      if (lineNum === 15 && curr.i !== undefined) return `i: ${curr.i}`;
      if (lineNum === 16 && curr.char_code !== undefined) return `char_code: ${curr.char_code}`;
      if (lineNum === 17 && curr.hash_val !== undefined) return `hash_val: ${curr.hash_val}`;
      if (lineNum === 18 && curr.power_val !== undefined) return `power_val: ${curr.power_val}`;
      return null;
    }
  }
};
