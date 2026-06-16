# Exponențiere de Matrice în Timp Logaritmic (Matrix Exponentiation)

## Prezentare Generală
Exponențierea de matrice în timp logaritmic este o tehnică extrem de puternică folosită pentru a calcula termeni foarte mari ai unor **recurențe liniare** (de exemplu, al N-lea termen Fibonacci pentru `N = 10^18`) în timp logaritmic `O(K^3 log N)`, unde `K` este dimensiunea matricei (numărul de termeni anteriori de care depinde recurența).

Pentru un șir definit prin recurență liniară (ex: `F_N = F_(N-1) + F_(N-2)`), putem scrie relația sub formă matriceală:
```
| F_N     |   | 1  1 |   | F_(N-1) |
|         | = |      | * |         |
| F_(N-1) |   | 1  0 |   | F_(N-2) |
```
Notând matricea de tranziție cu `T`, obținem prin inducție:
```
| F_N     |       N-1   | F_1 |
|         | =    T    * |     |
| F_(N-1) |             | F_0 |
```
Calculând `T^(N-1)` în timp logaritmic folosind algoritmul de exponențiere rapidă adaptat pentru înmulțirea matricelor, putem găsi valoarea `F_N` extrem de rapid.

## Complexitate
- **Timp:** O(K^3 log N) unde K este numărul de linii/coloane ale matricei, iar N este exponentul dorit. Înmulțirea a două matrice KxK durează `O(K^3)`.
- **Spațiu:** O(K^2) memorie constantă suplimentară pentru stocarea matricelor intermediare.

## Variații și Cazuri Speciale
- **K mare:** Dacă `K` depășește 100, complexitatea `O(K^3)` devine lentă. Pentru recurențe generale cu `K` mare, se folosește algoritmul **Berlekamp-Massey** sau teorema Cayley-Hamilton.

## Aplicații
- Calcularea rapidă a numerelor Fibonacci mari modulo M.
- Rezolvarea problemelor de programare dinamică pe grafuri unde stările de tranziție sunt liniare și numărul de pași este foarte mare (ex. numărul de drumuri de lungime L în graf).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MOD = 1000000007;

typedef vector<vector<long long>> Matrice;

// Înmulțește două matrice A și B sub modul
Matrice inmulteste(const Matrice& A, const Matrice& B) {
    int n = A.size();
    Matrice C(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            for (int k = 0; k < n; k++) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
            }
        }
    }
    return C;
}

// Ridică o matrice la puterea p în timp logaritmic
Matrice putereMatrice(Matrice baza, long long p) {
    int n = baza.size();
    // Cream matricea identitate (I)
    Matrice rez(n, vector<long long>(n, 0));
    for (int i = 0; i < n; i++) rez[i][i] = 1;
    
    while (p > 0) {
        if (p % 2 == 1) {
            rez = inmulteste(rez, baza);
        }
        baza = inmulteste(baza, baza);
        p /= 2;
    }
    return rez;
}

// Calculează al N-lea număr Fibonacci în O(log N)
long long getFibonacci(long long n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    
    // Matricea de tranziție T
    Matrice T = {
        {1, 1},
        {1, 0}
    };
    
    T = putereMatrice(T, n - 1);
    
    // F_N = T^(n-1)[0][0] * F_1 + T^(n-1)[0][1] * F_0
    // F_1 = 1, F_0 = 0
    return T[0][0]; // Deoarece F_0 este 0
}

int main() {
    long long n = 10;
    long long fib = getFibonacci(n); // fib = 55 (al 10-lea număr: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55)
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 44**: Funcția `inmulteste` efectuează înmulțirea clasică a două matrice de dimensiune `N x N` sub modul.
- **Linia 59**: Inițializăm `rez` ca fiind matricea identitate `I` (toate 1 pe diagonala principală, 0 în rest).
  - **Vizualizare (matrix)**:
    ```json
    {
      "headers": ["", "c0", "c1"],
      "data": [
        ["r0", "1", "0"],
        ["r1", "0", "1"]
      ],
      "activeCells": [{"r": 0, "c": 0}, {"r": 1, "c": 1}]
    }
    ```
- **Linia 78**: Inițializăm matricea de tranziție `T` cu valorile `[[1, 1], [1, 0]]`.
  - **Vizualizare (matrix)**:
    ```json
    {
      "headers": ["", "c0", "c1"],
      "data": [
        ["r0", "1", "1"],
        ["r1", "1", "0"]
      ],
      "activeCells": []
    }
    ```
- **La finalul ridicării la putere (Linia 83)**: Matricea rezultată `T^(N-1)` (pentru N=10, calculat ca T^9) conține valorile `[[55, 34], [34, 21]]`. Elementul `T[0][0]` (valoarea 55) este valoarea `F_10`.
  - **Vizualizare (matrix)**:
    ```json
    {
      "headers": ["", "c0", "c1"],
      "data": [
        ["r0", "55", "34"],
        ["r1", "34", "21"]
      ],
      "activeCells": [{"r": 0, "c": 0}]
    }
    ```


## Probleme Recomandate
- **Easy**: [Fibonacci (PbInfo #455)](https://www.pbinfo.ro/probleme/455) - Calcularea numărului Fibonacci pentru N relativ mare.
- **Medium**: [Fibonacci Sum (PbInfo #3831)](https://www.pbinfo.ro/probleme/3831) - Calcularea sumei primelor N numere Fibonacci modulo M folosind exponențiere de matrice.
- **Hard**: [Path Product](https://leetcode.com/problems/climbing-stairs/) - Probleme pe grafuri care determină numărul de drumuri de lungime L între două noduri.
