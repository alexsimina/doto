# Vectori de Frecvență / Sortare prin Numărare

## Prezentare Generală
Un **vector de frecvență** este un tablou folosit pentru a stoca numărul de apariții (frecvența) fiecărei valori dintr-un set de date. Dacă valorile din datele de intrare sunt numere întregi dintr-un interval relativ mic `[0, VMAX]`, putem folosi valoarea însăși ca index în vectorul de frecvență: `frecventa[valoare]` reprezintă de câte ori apare `valoare` în setul de date.

**Sortarea prin numărare (Counting Sort)** este o aplicație directă a vectorilor de frecvență. În loc să comparăm elementele între ele (cum fac Quick Sort sau Merge Sort), numărăm aparițiile fiecărei valori, iar apoi reconstruim șirul în ordine crescătoare parcurgând vectorul de frecvență. Este un algoritm de sortare non-comparativ extrem de eficient când valorile sunt mici.

## Complexitate
- **Timp:** O(N + K) pentru sortare, unde N este numărul de elemente de sortat și K este valoarea maximă (plaja de valori). 
- **Spațiu:** O(K) pentru stocarea vectorului de frecvență.

## Variații și Cazuri Speciale
- **Valori negative:** Dacă șirul conține valori negative (ex: `[-100, 100]`), putem aplica un "offset" (deplasare) pentru a mapa valorile negative la indici pozitivi (ex: `frecventa[valoare + 100]`).
- **Valori foarte mari:** Dacă intervalul valorilor este extrem de mare (ex. `[0, 10^9]`), nu putem folosi un vector clasic din cauza limitei de memorie. În acest caz, folosim un dicționar asociativ precum `std::map<int, int>` sau `std::unordered_map<int, int>`.

## Aplicații
- Determinarea elementului cu cele mai multe apariții (modulul șirului).
- Verificarea dacă două cuvinte sunt anagrame (au aceleași litere cu aceleași frecvențe).
- Sortarea rapidă a notelor elevilor la un test (valori între 1 și 10).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& v) {
    if (v.empty()) return;
    
    // Găsim elementul maxim pentru a ști dimensiunea vectorului de frecvență
    int maxim = *max_element(v.begin(), v.end());
    vector<int> fr(maxim + 1, 0);
    
    // Pasul 1: Calculăm frecvențele
    for (int x : v) {
        fr[x]++;
    }
    
    // Pasul 2: Reconstruim vectorul în ordine sortată
    int idx = 0;
    for (int i = 0; i <= maxim; i++) {
        while (fr[i] > 0) {
            v[idx++] = i;
            fr[i]--;
        }
    }
}

int main() {
    vector<int> v = {4, 1, 3, 1, 4, 1};
    countingSort(v);
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 10**: Găsim maximul din vectorul `v = {4, 1, 3, 1, 4, 1}` pentru a dimensiona corect vectorul de frecvență `fr`. Maximul este `4`.
  - Visual Block:
    Label: Detecție Maxim
    State: maxim = 4, activ: true
- **Linia 11**: Inițializăm vectorul de frecvență `fr` cu dimensiunea `maxim + 1 = 5` plin cu `0`.
  - Visual Block:
    Label: Vector Frecvență Nou
    State: fr = [0, 0, 0, 0, 0]
- **Linia 14**: Parcurgem vectorul `v` pentru a număra aparițiile. Primul element este `4`.
- **Linia 15**: Incrementăm `fr[4]` la `1`.
  - Visual Block:
    Label: Incrementare (x = 4)
    State: fr = [0, 0, 0, 0, 1]
- **Linia 14 (Pasul 2)**: Al doilea element este `1`. Incrementăm `fr[1]` la `1`.
  - Visual Block:
    Label: Incrementare (x = 1)
    State: fr = [0, 1, 0, 0, 1]
- **La finalul buclei**: Vectorul de frecvențe va fi `fr = [0, 3, 0, 1, 2]` (adică trei de `1`, un `3` și doi de `4`).
  - Visual Block:
    Label: Frecvențe Finale
    State: fr = [0, 3, 0, 1, 2], sorted: true
- **Linia 20**: Începem reconstrucția. Pentru `i = 1`, `fr[1] = 3` > 0.
- **Linia 21**: Scriem `1` în `v[0]`, `v[1]`, `v[2]` și decrementăm `fr[1]`.
  - Visual Block:
    Label: Scriere Element 1
    State: v = [1, 1, 1, 1, 4, 1], fr = [0, 0, 0, 1, 2], activ: true

## Probleme Recomandate
- **Easy**: [Vectorul de Frecvență (PbInfo #300)](https://www.pbinfo.ro/probleme/300) - Numărarea aparițiilor unor cifre/valori mici.
- **Medium**: [Sortare prin Numărare (PbInfo #4145)](https://www.pbinfo.ro/probleme/4145) - Sortarea unui vector folosind Counting Sort.
- **Hard**: [Anagrame Afectate](https://leetcode.com/problems/find-all-anagrams-in-a-string/) - Utilizarea vectorilor de frecvență glisanți (sliding window frequency).
