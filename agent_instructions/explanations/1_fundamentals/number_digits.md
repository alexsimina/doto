# Prelucrarea Cifrelor unui Număr

## Prezentare Generală
Prelucrarea cifrelor unui număr este unul dintre cele mai fundamentale concepte în programare. Folosind operatorii modulo (`%`) și împărțire întreagă (`/`), putem extrage cifrele unui număr de la dreapta la stânga (de la unități spre zeci, sute etc.) și le putem folosi în diverse calcule (suma cifrelor, numărul de cifre, determinarea cifrei maxime, oglinditul etc.).

Pentru a extrage ultima cifră a unui număr `n`, folosim `n % 10`.
Pentru a elimina ultima cifră a lui `n`, folosim `n / 10`.
Repetăm acest proces într-o structură repetitivă (de obicei `while(n > 0)`) până când numărul devine `0`.

## Complexitate
- **Timp:** O(log10(N)) deoarece în fiecare pas împărțim numărul la 10. Numărul de pași este egal cu numărul de cifre ale lui N.
- **Spațiu:** O(1) memorie suplimentară constantă.

## Variații și Cazuri Speciale
1. **Numărul 0:** Dacă numărul inițial este `0`, bucla `while(n > 0)` nu se va executa niciodată. Acesta este un edge-case important pentru care suma cifrelor este `0`, dar numărul de cifre este `1`.
2. **Numere Negative:** În C++, operatorul `%` pe un număr negativ va da un rezultat negativ (ex: `-12 % 10 = -2`). Este recomandat să lucrăm cu valoarea absolută a numărului folosind `abs(n)`.

## Aplicații
- Suma, produsul sau numărul de cifre ale unui număr.
- Oglinditul (palindromul) unui număr.
- Verificarea proprietății de număr Armstrong (Narcisist).
- Criptografie de bază (cifruri simple).

## Cod Sursă C++
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1234;
    int suma = 0;
    int numar_cifre = 0;
    int temp = n;
    
    while (temp > 0) {
        int cifra = temp % 10;
        suma += cifra;
        numar_cifre++;
        temp /= 10;
    }
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 5**: Inițializăm numărul `n = 1234` ale cărui cifre vrem să le prelucrăm.
  - Visual Block:
    Label: Date Inițiale
    State: n = 1234
- **Linia 9**: Salvăm o copie a lui `n` în `temp` pentru a nu modifica numărul original.
  - Visual Block:
    Label: Stare Variabile
    State: temp = 1234
- **Linia 11**: Intrăm în bucla `while`. Condiția `temp > 0` este adevărată (`1234 > 0`).
  - Visual Block:
    Label: Buclă Loop
    State: temp = 1234, activ: true
- **Linia 12**: Extragem ultima cifră: `cifra = 1234 % 10 = 4`.
  - Visual Block:
    Label: Extragere Cifră
    State: cifra = 4, activ: true
- **Linia 13**: Adăugăm cifra la sumă: `suma = 0 + 4 = 4`.
  - Visual Block:
    Label: Sumă Cifre
    State: suma = 4
- **Linia 14**: Incrementăm contorul de cifre: `numar_cifre = 1`.
  - Visual Block:
    Label: Număr Cifre
    State: numar_cifre = 1
- **Linia 15**: Eliminăm ultima cifră: `temp = 1234 / 10 = 123`.
  - Visual Block:
    Label: Eliminare Cifră
    State: temp = 123, activ: true

## Probleme Recomandate
- **Easy**: [Suma Cifrelor (PbInfo #10)](https://www.pbinfo.ro/probleme/10/sumacifre) - Calculează suma cifrelor unui număr.
- **Medium**: [Palindrom (PbInfo #81)](https://www.pbinfo.ro/probleme/81/oglindit) - Verifică dacă un număr este egal cu oglinditul său.
- **Hard**: [Cifre Speciale](https://www.pbinfo.ro/probleme/260) - Determinarea unor numere cu proprietăți speciale ale cifrelor.
