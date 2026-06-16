# Aritmetică Modulară și Invers Modular

## Prezentare Generală
În programarea competitivă și olimpiade, rezultatele problemelor combinatorice sau de numărare pot crește exponențial și depăși limitele tipurilor întregi standard (cum ar fi `long long` în C++). De aceea, cerința cere adesea afișarea rezultatului **modulo M** (unde `M` este de obicei un număr prim mare, precum `1.000.000.007` sau `998.244.353`).

Aritmetica modulară oferă reguli pentru a efectua calcule direct modulo M:
1. **Adunare:** `(A + B) % M = ((A % M) + (B % M)) % M`
2. **Scădere:** `(A - B) % M = ((A % M) - (B % M) + M) % M` (adunăm `M` pentru a evita rezultatele negative în C++).
3. **Înmulțire:** `(A * B) % M = ((A % M) * (B % M)) % M`
4. **Împărțire:** Nu putem împărți direct sub modul. În schimb, definim **inversul modular** al lui `B` ca fiind acel număr `B^(-1)` pentru care `B * B^(-1) ≡ 1 (mod M)`. Împărțirea `(A / B) % M` se transformă în `(A * B^(-1)) % M`.

Dacă modulo `M` este **număr prim**, conform *Micii Teoreme a lui Fermat*, inversul modular al lui `B` este `B^(M - 2) % M`. Acesta poate fi calculat rapid în `O(log M)` folosind Exponențierea Rapidă.

## Complexitate
- **Adunare, Scădere, Înmulțire:** O(1) operații de bază.
- **Invers Modular (Fermat):** O(log M) folosind ridicarea rapidă la putere.

## Variații și Cazuri Speciale
- **M nu este prim:** Dacă `M` nu este prim, Teorema lui Fermat nu se aplică. Inversul modular există doar dacă `B` și `M` sunt prime între ele (`cmmdc(B, M) == 1`) și se calculează folosind **Algoritmul lui Euclid Extins**.

## Aplicații
- Calcularea combinărilor `C(N, K) % M` pentru N, K mari (unde se folosesc factoriale și inversele lor).
- Algoritmi de hashing (ex: Rabin-Karp pentru șiruri de caractere).
- Criptografie (RSA, Diffie-Hellman).

## Cod Sursă C++
```cpp
#include <iostream>
using namespace std;

const int MOD = 1000000007;

// Calculează (baza ^ exp) % MOD în O(log exp)
long long ridicareLaPutere(long long baza, long long exp) {
    long long rez = 1;
    baza %= MOD;
    while (exp > 0) {
        if (exp % 2 == 1) {
            rez = (rez * baza) % MOD;
        }
        baza = (baza * baza) % MOD;
        exp /= 2;
    }
    return rez;
}

// Calculează inversul modular al lui n modulo MOD (unde MOD este prim)
long long inversModular(long long n) {
    return ridicareLaPutere(n, MOD - 2);
}

int main() {
    long long a = 15;
    long long b = 3;
    
    // Vrem să calculăm (a / b) % MOD folosind inversul modular
    long long inv_b = inversModular(b);
    long long rez = (a * inv_b) % MOD;
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 5**: Definim valoarea modulo utilizată în calcule: `MOD = 1000000007`.
- **Linia 8**: Funcția de exponențiere rapidă, utilizată pentru ridicarea la putere sub modul în timp logaritmic.
- **Linia 22**: Funcția `inversModular` folosește Mica Teoremă a lui Fermat. Returnează `n^(MOD-2) % MOD`.
- **Linia 31**: Calculăm inversul modular al lui `b = 3`. Apelăm `ridicareLaPutere(3, 1000000005)`.
  - Visual Block:
    Label: Invers Modular
    State: b = 3, inv_b = 333333336, activ: true
- **Linia 32**: Înmulțim `a` cu `inv_b` sub modul: `rez = (15 * 333333336) % 1000000007 = 5`. Obținem rezultatul corect al împărțirii lui 15 la 3.
  - Visual Block:
    Label: Împărțire Modulară
    State: rez = 5, sorted: true

## Probleme Recomandate
- **Easy**: [Invers Modular (PbInfo #3355)](https://www.pbinfo.ro/probleme/3355) - Determinarea inversului modular.
- **Medium**: [Combinari Modulo (PbInfo #3258)](https://www.pbinfo.ro/probleme/3258) - Calcularea combinărilor modulo M.
- **Hard**: [Modular Division](https://leetcode.com/problems/fraction-to-recurring-decimal/) - Împărțire și hash modular în condiții dificile.
