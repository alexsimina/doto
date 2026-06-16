# Indicatorul lui Euler (Euler's Totient Function - phi)

## Prezentare Generală
Indicatorul lui Euler, notat cu `phi(N)` (sau `φ(N)`), este o funcție aritmetică ce determină numărul de numere întregi pozitive mai mici sau egale cu `N` care sunt prime între ele cu `N` (adică `cmmdc(i, N) == 1`).

De exemplu, `phi(9) = 6` deoarece numerele `{1, 2, 4, 5, 7, 8}` sunt prime cu 9.

Formula de calcul a Indicatorului lui Euler se bazează pe descompunerea în factori primi a lui `N`:
`phi(N) = N * (1 - 1/p1) * (1 - 1/p2) * ... * (1 - 1/pk)`
unde `p1, p2, ..., pk` sunt factorii primi unici ai lui `N`. Pentru a evita lucrul cu fracții în programare, scriem formula echivalent:
`phi(N) = N / p1 * (p1 - 1) / p2 * (p2 - 1) ...`

## Complexitate
- **Pentru un singur N:** `O(sqrt(N))` timp, prin găsirea factorilor primi până la `sqrt(N)`.
- **Pentru toate numerele până la N:** `O(N log log N)` timp, folosind un algoritm similar cu Ciurul lui Eratostene pentru a propaga factorii în mod eficient.

## Variații și Cazuri Speciale
- **N este număr prim:** Dacă `N` este prim, toate numerele mai mici ca el sunt prime cu el, deci `phi(N) = N - 1`.
- **Teorema lui Euler:** Spune că dacă `cmmdc(A, M) == 1`, atunci `A^phi(M) ≡ 1 (mod M)`. Aceasta este o generalizare a Micii Teoreme a lui Fermat (unde `M` trebuia să fie prim). Folosită pentru calculul inversului modular când `M` nu este prim.

## Aplicații
- Determinarea numărului de fracții ireductibile dintr-un set.
- Algoritmi de criptografie (RSA folosește `phi(p*q) = (p-1)*(q-1)`).
- Calcularea rapidă a puterilor modulo M când modulo nu este prim.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Calculează phi(n) pentru un singur n în O(sqrt(n))
int calculeazaPhi(int n) {
    int rezultat = n;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) { // i este factor prim
            while (n % i == 0) {
                n /= i;
            }
            rezultat -= rezultat / i;
        }
    }
    if (n > 1) { // n este factorul prim rămas (dacă e prim și > sqrt(n))
        rezultat -= rezultat / n;
    }
    return rezultat;
}

int main() {
    int n = 12;
    int phi = calculeazaPhi(n); // phi(12) = 12 * (1 - 1/2) * (1 - 1/3) = 4 (numerele: 1, 5, 7, 11)
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 6**: Inițializăm funcția `calculeazaPhi` cu `n = 12`.
- **Linia 7**: Inițializăm `rezultat = n` (deci `rezultat = 12`).
- **Linia 8**: Începem bucla de la `i = 2` până la `i * i <= 12` (adică `i` poate fi `2` sau `3`).
- **Linia 9**: `12` este divizibil cu `2`. Deci `2` este factor prim.
- **Linia 10**: Împărțim repetat `n` la `2`. `n` devine `3`.
- **Linia 13**: Aplicăm formula: `rezultat = rezultat - rezultat / 2 = 12 - 6 = 6`.
  - Visual Block:
    Label: Factor 2 Procesat
    State: n = 3, rezultat = 6, i = 2, activ: true
- **Linia 8 (Pasul 2)**: `i = 3`. `i * i = 9 <= 12`. `n = 3` este divizibil cu `3`.
- **Linia 10 (Pasul 2)**: Împărțim repetat la `3`. `n` devine `1`.
- **Linia 13 (Pasul 2)**: Aplicăm formula: `rezultat = rezultat - rezultat / 3 = 6 - 2 = 4`.
  - Visual Block:
    Label: Factor 3 Procesat
    State: n = 1, rezultat = 4, i = 3
- **Linia 16**: Deoarece `n` a devenit `1`, condiția `n > 1` este falsă. Funcția returnează `rezultat = 4`.
  - Visual Block:
    Label: Rezultat Final
    State: phi = 4, sorted: true

## Probleme Recomandate
- **Easy**: [Indicator (PbInfo #348)](https://www.pbinfo.ro/probleme/348/indicator) - Determinarea `phi(N)`.
- **Medium**: [Fractii Ireductibile](https://www.pbinfo.ro/probleme/2311) - Numărarea fracțiilor ireductibile dintr-un interval.
- **Hard**: [Euler Totient Sum](https://leetcode.com/problems/numbers-with-same-consecutive-differences/) - Calcularea sumei `phi(i)` pentru `i` de la 1 la N.
