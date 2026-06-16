# Sisteme de Numerație și Reguli de Conversie

## Prezentare Generală
Un sistem de numerație reprezintă totalitatea regulilor pentru reprezentarea numerelor folosind un set de simboluri numite cifre. Cel mai folosit sistem este cel în baza 10 (zecimal), dar în informatică sunt esențiale bazele 2 (binar), 8 (octal) și 16 (hexazecimal).

Conversiile de bază sunt de două tipuri fundamentale:
1. **Din baza 10 în baza B:** Se împarte succesiv numărul la B, reținând resturile obținute de la dreapta la stânga (în ordine inversă), până când câtul devine `0`.
2. **Din baza B în baza 10:** Se calculează suma cifrelor înmulțite cu puterile bazei corespunzătoare pozițiilor lor, sau se folosește Schema lui Horner (mai eficientă computațional, evitând ridicarea directă la putere).

## Complexitate
- **Timp:** 
  - Din 10 în baza B: O(logB(N)) deoarece împărțim numărul la B în fiecare pas.
  - Din baza B în baza 10: O(L) unde L este lungimea numărului (numărul de cifre).
- **Spațiu:** O(logB(N)) sau O(L) pentru a stoca reprezentarea în baza B (de obicei ca șir de caractere sau vector).

## Variații și Cazuri Speciale
- **Baza > 10:** Pentru baze mai mari decât 10 (ex. Hexazecimal - baza 16), cifrele mai mari sau egale cu 10 sunt reprezentate prin litere: `10 = 'A'`, `11 = 'B'`, ..., `15 = 'F'`.
- **Baza 2 (Binar):** Conversiile pot fi optimizate folosind operatori pe biți (shiftare la dreapta `>>` pentru împărțire și `& 1` pentru modulo).

## Aplicații
- Reprezentarea numerelor în memoria calculatorului (binar).
- Permisiuni în Unix (octal).
- Reprezentarea culorilor în web design (hexazecimal: ex. `#FF0000`).

## Cod Sursă C++
```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Convertește un număr n din baza 10 în baza B (B <= 10)
string din10inBazaB(int n, int b) {
    if (n == 0) return "0";
    string rez = "";
    while (n > 0) {
        int rest = n % b;
        rez += to_string(rest);
        n /= b;
    }
    reverse(rez.begin(), rez.end());
    return rez;
}

int main() {
    int numar = 13;
    int baza = 2;
    string reprezentare = din10inBazaB(numar, baza);
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 7**: Definirea funcției care primește numărul în baza 10 (`n`) și baza dorită (`b`).
- **Linia 9**: Dacă `n` este `0`, rezultatul este direct `"0"`.
- **Linia 11**: Intrăm în bucla `while`. Pentru `n = 13` și `b = 2`, condiția `13 > 0` este adevărată.
  - Visual Block:
    Label: Conversie Pas 1
    State: n = 13, rest = 13 % 2 = 1, rez = "1", activ: true
- **Linia 13**: Împărțim numărul la bază: `n = 13 / 2 = 6`.
  - Visual Block:
    Label: Actualizare N
    State: n = 6
- **Linia 11 (Pasul 2)**: Condiția `6 > 0` este adevărată.
  - Visual Block:
    Label: Conversie Pas 2
    State: n = 6, rest = 6 % 2 = 0, rez = "10", activ: true
- **Linia 13 (Pasul 2)**: `n = 6 / 2 = 3`.
- **Linia 11 (Pasul 3)**: Condiția `3 > 0` este adevărată.
  - Visual Block:
    Label: Conversie Pas 3
    State: n = 3, rest = 3 % 2 = 1, rez = "101", activ: true
- **Linia 13 (Pasul 3)**: `n = 3 / 2 = 1`.
- **Linia 11 (Pasul 4)**: Condiția `1 > 0` este adevărată.
  - Visual Block:
    Label: Conversie Pas 4
    State: n = 1, rest = 1 % 2 = 1, rez = "1011", activ: true
- **Linia 13 (Pasul 4)**: `n = 1 / 2 = 0`. Bucla se oprește.
- **Linia 15**: Inversăm șirul obținut (`"1011"`) pentru a avea cifrele în ordinea corectă (de la stânga la dreapta). Obținem `"1101"`.
  - Visual Block:
    Label: Rezultat Inversat
    State: reprezentare = "1101", sorted: true

## Probleme Recomandate
- **Easy**: [Baza 2 (PbInfo #429)](https://www.pbinfo.ro/probleme/429/baza2) - Afișarea reprezentării în baza 2 a unui număr.
- **Medium**: [Conversii Baze (PbInfo #1314)](https://www.pbinfo.ro/probleme/1314/baze) - Conversia unui număr din baza b1 în baza b2.
- **Hard**: [Hexazecimal](https://www.pbinfo.ro/probleme/430) - Conversii avansate cu baze mai mari de 10.
