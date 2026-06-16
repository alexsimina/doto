# Funcții și Transmiterea Parametrilor

## Prezentare Generală
Funcțiile sunt blocuri reutilizabile de cod care rezolvă o sarcină specifică. Ele ajută la modularizarea programului și la evitarea codului duplicat. 

În C++, înțelegerea modului în care parametrii sunt transmiși unei funcții este vitală:
1. **Transmitere prin valoare (Pass by Value):** Funcția primește o *copie* a variabilei originale. Modificările aduse parametrului în interiorul funcției nu afectează variabila din exterior.
2. **Transmitere prin referință (Pass by Reference):** Funcția primește o *referință* (alias) la variabila originală (folosind operatorul `&`). Orice modificare a parametrului afectează direct variabila din exterior. Transmiterea prin referință este folosită și pentru a evita copierea obiectelor mari (ex. vectori) folosind `const reference` (ex. `const vector<int>& v`).

## Complexitate
- **Timp:** O(1) pentru transmiterea prin referință sau prin valoare a tipurilor primitive. Dacă transmitem structuri mari de date (cum ar fi vectori) prin valoare, complexitatea devine O(N) din cauza copierii elementelor.
- **Spațiu:** O(1) sau O(N) în Stack-ul de execuție, în funcție de mărimea copiilor și adâncimea recursivității.

## Variații și Cazuri Speciale
- **Transmiterea pointerilor:** Asemănătoare transmiterii prin referință, dar folosește adrese de memorie explicite (ex. `void f(int* ptr)`).
- **Parametri impliciți:** C++ permite definirea unor valori implicite pentru parametri (ex. `void f(int x = 10)`).

## Aplicații
- Modularizarea programelor.
- Algoritmi recursivi (DFS, Divide et Impera).
- Funcții de sortare customizate (comparatori).

## Cod Sursă C++
```cpp
#include <iostream>
using namespace std;

// Transmitere prin valoare: modificarea lui 'x' nu afectează variabila din main
void dubleazaValoare(int x) {
    x = x * 2;
}

// Transmitere prin referință: modificarea lui 'y' schimbă variabila originală
void dubleazaReferinta(int &y) {
    y = y * 2;
}

int main() {
    int a = 5;
    int b = 5;
    
    dubleazaValoare(a);
    dubleazaReferinta(b);
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 5**: Declarăm o funcție care preia parametrul `x` prin valoare.
- **Linia 10**: Declarăm o funcție care preia parametrul `y` prin referință (observați operatorul `&`).
- **Linia 15**: În `main()`, inițializăm variabilele `a = 5` și `b = 5`.
  - Visual Block:
    Label: Variabile Inițiale
    State: a = 5, b = 5
- **Linia 18**: Apelăm funcția `dubleazaValoare(a)`. În interiorul funcției, copia locală `x` devine `10`, dar la întoarcerea în `main`, `a` rămâne `5`.
  - Visual Block:
    Label: Apel prin Valoare
    State: a = 5, x (local) = 10, activ: true
- **Linia 19**: Apelăm funcția `dubleazaReferinta(b)`. Funcția modifică direct variabila `b` din `main`. `b` devine `10`.
  - Visual Block:
    Label: Apel prin Referință
    State: b = 10, y (alias pentru b) = 10, activ: true

## Probleme Recomandate
- **Easy**: [Suma elementelor dintr-un vector (PbInfo #3812)](https://www.pbinfo.ro/probleme/3812) - Scrierea unei funcții de sumare.
- **Medium**: [Funcții cu vectori ca parametru (PbInfo #97)](https://www.pbinfo.ro/probleme/97/functievocale) - Manipularea șirurilor prin funcții.
- **Hard**: [Recursivitate Avansată (PbInfo #920)](https://www.pbinfo.ro/probleme/920) - Probleme ce necesită transmiterea structurilor prin referință în apeluri recursive.
