# Operații cu Numere Mari (Big Integers)

## Prezentare Generală
În C++, tipul de date întreg maxim standard este `long long`, care poate stoca numere de până la aproximativ `9 * 10^18` (19 cifre). În problemele de matematică sau combinatorică de la olimpiade, rezultatele pot depăși cu mult această limită (de exemplu, factorialul lui 1000 are peste 2500 de cifre).

Pentru a lucra cu astfel de numere, implementăm o clasă/structură numită **Numere Mari (Big Integers)**. Numărul este reprezentat ca un vector de cifre (de la dreapta la stânga, pentru a facilita calculele la nivelul unităților).

Operațiile de bază (Adunarea, Scăderea și Înmulțirea) sunt simulate exact ca la aritmetica pe foaie, menținând o variabilă pentru transport (`carry`).

## Complexitate
Fie `N` și `M` numărul de cifre ale celor două numere mari:
- **Adunare / Scădere:** O(max(N, M)) - parcurgem cifrele o singură dată.
- **Înmulțire (Algoritm Clasic):** O(N * M) - înmulțim fiecare cifră a primului număr cu fiecare cifră a celui de-al doilea.
- **Spațiu:** O(N + M) pentru stocarea rezultatului.

## Variații și Cazuri Speciale
- **Baza superioară:** Pentru optimizarea memoriei și a vitezei, în loc să stocăm cifre în baza 10 (cifre individuale 0-9), putem folosi baza `10^9` (fiecare element din vector reține un grup de 9 cifre), deoarece înmulțirile și adunările de grup nu depășesc limitele tipului `long long`.
- **Înmulțiri extrem de mari:** Pentru numere cu peste `10^5` cifre, înmulțirea standard în `O(N^2)` devine lentă. Se folosesc algoritmi avansați precum **Karatsuba** (`O(N^1.58)`) sau **Fast Fourier Transform (FFT)** (`O(N log N)`).

## Aplicații
- Calcularea factorialelor mari (`N!`).
- Numere Fibonacci mari.
- Calcularea numărului de moduri în combinatorică (ex: Numerele lui Catalan).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

typedef vector<int> NumarMare;

// Adunarea a două numere mari
NumarMare aduna(NumarMare A, NumarMare B) {
    NumarMare C;
    int transport = 0;
    int i = 0, j = 0;
    
    while (i < A.size() || j < B.size() || transport > 0) {
        int suma = transport;
        if (i < A.size()) suma += A[i++];
        if (j < B.size()) suma += B[j++];
        
        C.push_back(suma % 10);
        transport = suma / 10;
    }
    return C;
}

// Afișează numărul mare (stocat inversat)
void afiseaza(NumarMare A) {
    for (int i = A.size() - 1; i >= 0; i--) {
        cout << A[i];
    }
    cout << endl;
}

int main() {
    // Reprezentăm 48 și 75. Stocate invers: 48 devine {8, 4}, 75 devine {5, 7}
    NumarMare A = {8, 4};
    NumarMare B = {5, 7};
    
    NumarMare C = aduna(A, B); // 48 + 75 = 123 ({3, 2, 1})
    afiseaza(C);
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 9**: Funcția `aduna` primește două numere mari ca vectori de cifre.
- **Linia 10**: Declarăm vectorul rezultat `C` și variabila `transport = 0`.
- **Linia 13**: Începem bucla. Continuăm atât timp cât mai avem cifre de adunat în `A` sau `B`, sau dacă avem un transport rămas.
- **Linia 14**: Inițializăm suma de pe poziția curentă cu valoarea transportului.
- **Linia 15**: Adăugăm cifra corespunzătoare din `A` (dacă există) la sumă. Pentru prima poziție (unități), `A[0] = 8`.
  - Visual Block:
    Label: Adunare Unități A
    State: suma = 0 + 8 = 8, transport = 0, activ: true
- **Linia 16**: Adăugăm cifra corespunzătoare din `B`. `B[0] = 5`. Suma devine `13`.
  - Visual Block:
    Label: Adunare Unități B
    State: suma = 13, transport = 0
- **Linia 18**: Adăugăm ultima cifră a sumei în vectorul rezultat: `13 % 10 = 3`. `C` devine `{3}`.
  - Visual Block:
    Label: Adăugare Cifră Rezultat
    State: C = [3]
- **Linia 19**: Calculăm noul transport: `13 / 10 = 1`.
  - Visual Block:
    Label: Calcul Transport
    State: transport = 1
- **Pasul următor (zeci)**: `A[1] = 4`, `B[1] = 7`, `transport = 1`. Suma devine `1 + 4 + 7 = 12`.
  - `C` devine `{3, 2}`, `transport = 1`.
- **Pasul 3 (sute)**: Vectorii `A` și `B` s-au terminat, dar `transport = 1` > 0. Suma devine `1`.
  - `C` devine `{3, 2, 1}`, `transport = 0`. Bucla se oprește.

## Probleme Recomandate
- **Easy**: [Adunare Numere Mari (PbInfo #281)](https://www.pbinfo.ro/probleme/281/sumanm) - Adunarea a două numere mari.
- **Medium**: [Inmultire Numere Mari (PbInfo #282)](https://www.pbinfo.ro/probleme/282/prodnm) - Înmulțirea a două numere mari.
- **Hard**: [Fibonacci Gigantic](https://leetcode.com/problems/fibonacci-number/) - Calcularea termenilor mari Fibonacci folosind sume pe numere mari.
