# Determinarea Elementului Majoritar (Boyer-Moore Voting)

## Prezentare Generală
Elementul majoritar al unui vector cu `N` elemente este acel element care apare de mai mult de `N / 2` ori. O abordare naivă ar fi sortarea vectorului și verificarea mijlocului sau contorizarea frecvenței fiecărui element (care necesită `O(N log N)` timp sau `O(N)` memorie suplimentară).

**Algoritmul Boyer-Moore de Vot Majoritar** rezolvă această problemă în timp liniar `O(N)` și memorie suplimentară constantă `O(1)`. Algoritmul se bazează pe eliminarea perechilor de elemente diferite. Acesta menține un singur element candidat și un contor de voturi:
- Parcurgem vectorul:
  - Dacă contorul este `0`, curentul element devine candidatul și contorul devine `1`.
  - Dacă elementul curent este egal cu candidatul, incrementăm contorul.
  - Altfel, decrementăm contorul.
La finalul parcurgerii, candidatul obținut este singurul care poate fi elementul majoritar. Pentru siguranță, se face o a doua parcurgere pentru a-i număra aparițiile efective și a verifica dacă depășește `N / 2`.

## Complexitate
- **Timp:** O(N) deoarece parcurgem vectorul de maximum 2 ori.
- **Spațiu:** O(1) deoarece folosim doar două variabile de stare (`candidat`, `voturi`).

## Variații și Cazuri Speciale
- **Existența elementului majoritar:** Algoritmul garantează că găsește elementul majoritar *doar dacă* acesta există cu adevărat. Dacă nu suntem siguri că există, a doua parcurgere pentru verificare este absolut obligatorie.

## Aplicații
- Detectarea consensului în sisteme distribuite.
- Analiza fluxurilor mari de date în timp real (Data Streams).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

int gasesteMajoritar(const vector<int>& v) {
    int candidat = -1;
    int voturi = 0;
    
    // Pasul 1: Găsirea candidatului
    for (int x : v) {
        if (voturi == 0) {
            candidat = x;
            voturi = 1;
        } else if (x == candidat) {
            voturi++;
        } else {
            voturi--;
        }
    }
    
    // Pasul 2: Verificarea candidatului
    int aparitii = 0;
    for (int x : v) {
        if (x == candidat) {
            aparitii++;
        }
    }
    
    if (aparitii > v.size() / 2) {
        return candidat;
    }
    return -1; // Nu există element majoritar
}

int main() {
    vector<int> v = {3, 3, 4, 2, 4, 4, 2, 4, 4};
    int maj = gasesteMajoritar(v);
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 6**: Inițializăm funcția de căutare a elementului majoritar.
- **Linia 11**: Începem parcurgerea vectorului `v = {3, 3, 4, 2, 4, 4, 2, 4, 4}`. Primul element este `3`.
- **Linia 12**: Deoarece `voturi == 0`, `candidat` devine `3`, iar `voturi` devine `1`.
  - Visual Block:
    Label: Pas 1 (x = 3)
    State: candidat = 3, voturi = 1, activ: true
- **Linia 11 (Pasul 2)**: Următorul element este `3`. Deoarece `3 == candidat`, incrementăm `voturi` la `2`.
  - Visual Block:
    Label: Pas 2 (x = 3)
    State: candidat = 3, voturi = 2
- **Linia 11 (Pasul 3)**: Următorul element este `4`. Deoarece `4 != candidat`, decrementăm `voturi` la `1`.
  - Visual Block:
    Label: Pas 3 (x = 4)
    State: candidat = 3, voturi = 1, activ: true
- **Linia 11 (Pasul 4)**: Următorul element este `2`. Deoarece `2 != candidat`, decrementăm `voturi` la `0`.
  - Visual Block:
    Label: Pas 4 (x = 2)
    State: candidat = 3, voturi = 0, activ: true
- **Linia 11 (Pasul 5)**: Următorul element este `4`. Deoarece `voturi == 0`, `candidat` devine `4`, iar `voturi` devine `1`.
  - Visual Block:
    Label: Pas 5 (x = 4)
    State: candidat = 4, voturi = 1, activ: true

## Probleme Recomandate
- **Easy**: [Majoritar (PbInfo #1021)](https://www.pbinfo.ro/probleme/1021) - Găsirea elementului majoritar într-un vector.
- **Medium**: [Majority Element II](https://leetcode.com/problems/majority-element-ii/) - Găsirea elementelor care apar de mai mult de `N / 3` ori (extinderea algoritmului).
- **Hard**: [Stream Majority Element](https://leetcode.com/problems/online-majority-element-in-subarray/) - Interogări repetate pentru elementul majoritar în subvectori.
