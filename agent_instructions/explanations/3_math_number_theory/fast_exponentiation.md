# Exponențiere Rapidă (Binary Exponentiation)

## Prezentare Generală
Exponențierea rapidă (sau ridicarea rapidă la putere) este un algoritm care calculează `A^B` (sau `A^B % M`) în timp logaritmic `O(log B)`. Abordarea naivă prin înmulțiri succesive `A * A * ... * A` necesită timp liniar `O(B)` și este ineficientă pentru puteri mari (ex: `B = 10^18`).

Algoritmul se bazează pe proprietatea de "Divide et Impera" și folosește scrierea exponentului în baza 2:
- Dacă `B` este par: `A^B = (A^(B/2))^2`
- Dacă `B` este impar: `A^B = A * A^(B-1) = A * (A^((B-1)/2))^2`

În loc să facem `B` înmulțiri, înjumătățim exponentul în fiecare pas, reducând dramatic numărul de operații.

## Complexitate
- **Timp:** O(log B) deoarece în fiecare pas exponentul `B` se împarte la 2.
- **Spațiu:** 
  - Varianta iterativă: O(1) memorie constantă.
  - Varianta recursivă: O(log B) memorie pe stivă.

## Variații și Cazuri Speciale
- **Exponent 0:** `A^0 = 1`. Acesta este cazul de bază.
- **Baza 0:** `0^B = 0` (pentru `B > 0`). `0^0` este în general tratat ca `1` sau nedefinit în funcție de context.
- **Înmulțire modulară mare:** Dacă `M` este foarte mare (ex. `10^18`) astfel încât înmulțirea `(A * A)` depășește tipul `long long`, se folosește un algoritm similar de "înmulțire rapidă" (sau `__int128` în GCC compilator).

## Aplicații
- Calcularea inversului modular în timp logaritmic.
- Ridicarea la putere a matricelor (exponențiere de matrice) pentru determinarea rapidă a termenilor șirurilor recurente (ex: al N-lea termen Fibonacci în `O(log N)`).
- Algoritmi de criptografie (RSA).

## Cod Sursă C++
```cpp
#include <iostream>
using namespace std;

// Versiunea iterativă (recomandată: mai rapidă și fără consum de stivă)
long long fastPow(long long baza, long long exp, long long mod) {
    long long rez = 1;
    baza %= mod; // Asigurăm că baza este în intervalul [0, mod-1]
    
    while (exp > 0) {
        // Dacă bitul curent al exponentului este 1, înmulțim cu baza curentă
        if (exp % 2 == 1) {
            rez = (rez * baza) % mod;
        }
        baza = (baza * baza) % mod; // Baza devine baza^2
        exp /= 2; // Înjumătățim exponentul (sau shiftare la dreapta: exp >>= 1)
    }
    return rez;
}

int main() {
    long long b = 3;
    long long e = 13;
    long long m = 1000000007;
    
    long long rezultat = fastPow(b, e, m); // 3^13 % m = 1594323
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 6**: Inițializăm funcția `fastPow(baza = 3, exp = 13, mod = 1000000007)`.
- **Linia 7**: Inițializăm rezultatul `rez = 1`.
- **Linia 10**: Intrăm în buclă. Condiția `exp > 0` (`13 > 0`) este adevărată.
- **Linia 12**: Deoarece `13 % 2 == 1` (exponentul este impar), actualizăm `rez = (1 * 3) % mod = 3`.
  - Visual Block:
    Label: Pas 1 (exp = 13, impar)
    State: rez = 3, baza = 3, exp = 13, activ: true
- **Linia 15**: Ridicăm baza la pătrat: `baza = (3 * 3) % mod = 9`.
- **Linia 16**: Înjumătățim exponentul: `exp = 13 / 2 = 6`.
  - Visual Block:
    Label: Actualizare Variabile 1
    State: rez = 3, baza = 9, exp = 6
- **Linia 10 (Pasul 2)**: Condiția `6 > 0` este adevărată.
- **Linia 12**: Deoarece `6 % 2 == 0` (par), nu modificăm `rez` (`rez` rămâne `3`).
- **Linia 15**: Ridicăm baza la pătrat: `baza = (9 * 9) % mod = 81`.
- **Linia 16**: `exp = 6 / 2 = 3`.
  - Visual Block:
    Label: Pas 2 (exp = 6, par)
    State: rez = 3, baza = 81, exp = 3, activ: true

## Probleme Recomandate
- **Easy**: [Ridicarea la Putere (PbInfo #346)](https://www.pbinfo.ro/probleme/346/putere) - Calculează rapid A^B.
- **Medium**: [Pow(x, n) (LeetCode #50)](https://leetcode.com/problems/powx-n/) - Implementarea funcției double pow.
- **Hard**: [Fibonacci în timp Logaritmic](https://leetcode.com/problems/climbing-stairs/) - Probleme avansate ce necesită ridicarea la putere a matricelor.
