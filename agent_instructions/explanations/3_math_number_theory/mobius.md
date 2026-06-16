# Funcția Mobius (Möbius Function)

## Prezentare Generală
Funcția Möbius, notată cu `mu(N)` (sau `μ(N)`), este o funcție multiplicativă importantă în teoria numerelor și combinatorică, definită pentru orice număr întreg pozitiv `N`:
- `mu(N) = 1` dacă `N` este un număr liber de pătrate (square-free - nu este divizibil cu niciun pătrat perfect în afară de 1) și are un număr **par** de factori primi distincți. De asemenea, `mu(1) = 1`.
- `mu(N) = -1` dacă `N` este liber de pătrate și are un număr **impar** de factori primi distincți.
- `mu(N) = 0` dacă `N` **nu** este liber de pătrate (deci conține cel puțin un factor prim la o putere >= 2, ex. divizibil cu 4, 9, 25 etc.).

De exemplu:
- `mu(1) = 1`
- `mu(2) = -1` (un singur factor prim: 2)
- `mu(6) = 1` (doi factori primi distincți: 2 * 3)
- `mu(4) = 0` (divizibil cu 2^2)

Funcția Möbius este strâns legată de **Formula de Inversiune Möbius** și reprezintă o abstractizare algebrică a Principiului Includerii și Excluderii (PIE).

## Complexitate
- **Pentru toate numerele până la N:** `O(N log log N)` sau `O(N)` folosind un Ciur Linear pentru a calcula valoarea funcției pentru toate elementele din intervalul `[1, N]`.
- **Spațiu:** O(N) pentru vectorul de stocare al valorilor `mu`.

## Variații și Cazuri Speciale
- **Ciur Liniar:** Permite calcularea funcțiilor multiplicative (cum ar fi `mu` sau indicatorul lui Euler `phi`) în timp liniar strict `O(N)`, vizitând fiecare număr exact o singură dată.

## Aplicații
- Probleme de sumare a divizorilor și calcularea CMMDC în probleme combinatorice (ex: aflarea numărului de perechi `(i, j)` cu `cmmdc(i, j) == 1`).
- Eliminarea calculelor redundante în sume matematice multiple.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 100000;
vector<int> mu(MAXN + 1, 0);
vector<bool> este_prim(MAXN + 1, true);
vector<int> prime;

// Calculează valorile mu în O(N) folosind ciurul liniar
void calculeazaMobius() {
    mu[1] = 1;
    for (int i = 2; i <= MAXN; i++) {
        if (este_prim[i]) {
            prime.push_back(i);
            mu[i] = -1; // i este prim (un singur factor prim)
        }
        for (int p : prime) {
            if (i * p > MAXN) break;
            este_prim[i * p] = false;
            
            if (i % p == 0) {
                mu[i * p] = 0; // i * p are factorul p^2 (deci nu e square-free)
                break; // Optimizarea cheie a ciurului liniar
            } else {
                mu[i * p] = -mu[i]; // Multiplicativitate: mu(i * p) = mu(i) * mu(p) = mu(i) * (-1)
            }
        }
    }
}

int main() {
    calculeazaMobius();
    int val_6 = mu[6]; // val_6 = 1
    int val_4 = mu[4]; // val_4 = 0
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 13**: Setăm valoarea de bază `mu[1] = 1`.
- **Linia 14**: Bucla exterioară pornește de la `i = 2`. `este_prim[2]` este `true`.
- **Linia 17**: `2` este adăugat în vectorul `prime`. Setăm `mu[2] = -1`.
  - Visual Block:
    Label: Primul Prim Gasit
    State: i = 2, mu[2] = -1, activ: true
- **Linia 19**: Parcurgem numerele prime găsite. Pentru `p = 2` și `i = 2`:
- **Linia 20**: `i * p = 4 <= MAXN`.
- **Linia 23**: `2 % 2 == 0` (adevărat). Setăm `mu[4] = 0`.
- **Linia 25**: Se apelează `break` (asigură complexitatea liniară).
  - Visual Block:
    Label: Procesare Pătrat
    State: mu[4] = 0, i = 2, p = 2
- **Pasul i = 3**: `3` este prim, `mu[3] = -1`.
  - Pentru `p = 2`: `i * p = 6`. `3 % 2 != 0`. `mu[6] = -mu[3] = 1`.
  - Visual Block:
    Label: Multiplicativitate (i=3, p=2)
    State: mu[6] = 1, i = 3, p = 2, activ: true

## Probleme Recomandate
- **Easy**: [Mobius (PbInfo #3834)](https://www.pbinfo.ro/probleme/3834) - Generarea valorilor funcției Möbius.
- **Medium**: [Coprime Triplets](https://leetcode.com/problems/number-of-pairs-satisfying-inequality/) - Determinarea numărului de triplete prime între ele folosind funcția Möbius.
- **Hard**: [GCD Sum Extreme](https://leetcode.com/problems/number-of-different-subsequences-gcds/) - Sume matematice avansate rezolvate cu inversiunea Möbius.
