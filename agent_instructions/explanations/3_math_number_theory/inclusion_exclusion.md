# Principiul Includerii și Excluderii (PIE)

## Prezentare Generală
Principiul Includerii și Excluderii (PIE) este o metodă combinatorică folosită pentru a calcula cardinalul (dimensiunea) reuniunii mai multor mulțimi, sau numărul de elemente care respectă cel puțin o proprietate dintr-un set de proprietăți date.

Cazul cel mai simplu, pentru 2 mulțimi:
`|A ∪ B| = |A| + |B| - |A ∩ B|`

Pentru 3 mulțimi:
`|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|`

Regula generală spune că pentru a calcula dimensiunea reuniunii a `N` mulțimi:
1. Adunăm dimensiunile tuturor mulțimilor individuale (luate câte 1).
2. Scădem dimensiunile tuturor intersecțiilor de câte 2 mulțimi.
3. Adunăm dimensiunile tuturor intersecțiilor de câte 3 mulțimi...
4. Semnul termenului este `+` dacă numărul de mulțimi din intersecție este impar, și `-` dacă este par.

În informatică, generarea tuturor intersecțiilor posibile se realizează de obicei folosind **măști pe biți (bitmasks)** de la `1` la `2^N - 1`.

## Complexitate
Dacă avem `N` mulțimi/proprietăți:
- **Timp:** O(2^N * T_intersect) unde 2^N este numărul de subseturi posibile, iar T_intersect este timpul pentru calcularea intersecției unui subset (de obicei O(1) sau O(N)).
- **Spațiu:** O(1) memorie suplimentară (dacă folosim măști pe biți).

## Variații și Cazuri Speciale
- **Numere prime între ele cu un set de numere:** O aplicație comună este determinarea numărului de numere din intervalul `[1, X]` care nu sunt divizibile cu niciunul dintre numerele dintr-un set `S = {p1, p2, ..., pN}`. Aici, intersecția corespunde divizibilității cu cel mai mic multiplu comun (CMMMC) al elementelor din subset.

## Aplicații
- Numărarea elementelor care nu respectă nicio condiție (ex. numere prime cu un număr compus prin factorii săi primi).
- Probleme de tip deranjamente (permutări în care niciun element nu rămâne pe poziția sa originală).
- Calcularea probabilităților în probleme de grafuri și combinatorică.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Determină câte numere din intervalul [1, X] sunt divizibile cu cel puțin un număr din vectorul P
long long numaraDivizibile(long long X, const vector<int>& P) {
    int n = P.size();
    long long total = 0;
    
    // Parcurgem toate cele 2^n - 1 subseturi posibile (excluzând subsetul vid 0)
    for (int masca = 1; masca < (1 << n); masca++) {
        long long produs = 1;
        int elemente_selectate = 0;
        
        for (int i = 0; i < n; i++) {
            if ((masca >> i) & 1) { // Elementul P[i] face parte din subset
                produs *= P[i];
                elemente_selectate++;
            }
        }
        
        // Câte numere din [1, X] sunt divizibile cu produsul elementelor din subset
        long long divizibile_cu_produs = X / produs;
        
        // Dacă avem număr impar de elemente adunăm, altfel scădem
        if (elemente_selectate % 2 == 1) {
            total += divizibile_cu_produs;
        } else {
            total -= divizibile_cu_produs;
        }
    }
    return total;
}

int main() {
    long long X = 20;
    vector<int> P = {2, 3}; // Vrem divizibile cu 2 sau 3
    
    long long rez = numaraDivizibile(X, P); // 20/2 + 20/3 - 20/6 = 10 + 6 - 3 = 13
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 6**: Inițializăm funcția `numaraDivizibile(X = 20, P = {2, 3})`. Lungimea vectorului `P` este `n = 2`.
- **Linia 11**: Parcurgem măștile de la `1` la `3` (`1 << 2 = 4`).
- **Masca 1 (`01` în binar)**:
  - Bitul `0` este `1` (corespunzător lui `P[0] = 2`).
  - `produs = 2`, `elemente_selectate = 1`.
  - `divizibile_cu_produs = 20 / 2 = 10`.
  - Deoarece `elemente_selectate` este impar (`1`), `total += 10 => total = 10`.
  - Visual Block:
    Label: Procesare Mască 1 (Binar: 01)
    State: masca = 1, produs = 2, total = 10, activ: true
- **Masca 2 (`10` în binar)**:
  - Bitul `1` este `1` (corespunzător lui `P[1] = 3`).
  - `produs = 3`, `elemente_selectate = 1`.
  - `divizibile_cu_produs = 20 / 3 = 6`.
  - Impar => `total += 6 => total = 16`.
  - Visual Block:
    Label: Procesare Mască 2 (Binar: 10)
    State: masca = 2, produs = 3, total = 16
- **Masca 3 (`11` în binar)**:
  - Ambii biți sunt `1` (subsetul `{2, 3}`).
  - `produs = 2 * 3 = 6`, `elemente_selectate = 2`.
  - `divizibile_cu_produs = 20 / 6 = 3`.
  - Deoarece `elemente_selectate` este par (`2`), `total -= 3 => total = 13`.
  - Visual Block:
    Label: Procesare Mască 3 (Binar: 11)
    State: masca = 3, produs = 6, total = 13, activ: true
- Bucla se oprește. Rezultatul returnat este `13`.
  - Visual Block:
    Label: Rezultat Final
    State: rez = 13, sorted: true

## Probleme Recomandate
- **Easy**: [Divizibil (PbInfo #1340)](https://www.pbinfo.ro/probleme/1340) - Numărarea elementelor divizibile folosind PIE.
- **Medium**: [Co-prime (PbInfo #383)](https://www.pbinfo.ro/probleme/383) - Calcularea numărului de numere prime cu X dintr-un interval.
- **Hard**: [Ugly Numbers II (LeetCode #264)](https://leetcode.com/problems/ugly-numbers-ii/) - Determinarea numerelor cu divizori prime specifice.
