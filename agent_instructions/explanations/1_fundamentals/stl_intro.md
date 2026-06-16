# Introducere în STL (vector, pair, set, map)

## Prezentare Generală
Biblioteca standard de șabloane (STL - Standard Template Library) din C++ conține o colecție puternică de structuri de date (containere) și algoritmi predefiniți care accelerează considerabil scrierea programelor și rezolvarea problemelor de olimpiadă.

Cele mai folosite containere de bază sunt:
1. **`std::vector`**: Un tablou dinamic care își mărește dimensiunea automat. Permite accesul la elemente în O(1).
2. **`std::pair`**: Cuplu format din două elemente, accesibile prin `.first` și `.second`. Utile pentru coordonate, intervale sau asocieri rapide.
3. **`std::set`**: O colecție de elemente unice, sortate automat crescător (implementată intern ca arbore roșu-negru). Inserarea, ștergerea și căutarea se fac în O(log N).
4. **`std::map`**: Un tablou asociativ (dicționar) format din perechi cheie-valoare. Cheile sunt unice și sortate. Căutările și inserările se fac în O(log N).

## Complexitate
- **Vector:** Inserare la final: O(1) amortizat; Căutare după valoare: O(N); Acces după index: O(1).
- **Set & Map:** Inserare, Ștergere, Căutare: O(log N).
- **Pair:** O(1) pentru orice operație.

## Variații și Cazuri Speciale
- **`unordered_set` și `unordered_map`:** Variații care folosesc tabele hash (hash tables) în loc de arbori. Căutările și inserările se fac în O(1) în medie, dar pot ajunge la O(N) în cel mai rău caz (coliziuni).
- **Iteratori:** Pentru a parcurge un `set` sau un `map`, se folosesc iteratori (ex: `for(auto it = s.begin(); it != s.end(); ++it)` sau bucla simplificată C++11 `for(auto x : s)`).

## Aplicații
- Vectori folosiți pentru stocarea listelor de adiacență ale grafurilor.
- Set-uri pentru eliminarea duplicatelor dintr-un șir și verificarea rapidă a existenței.
- Map-uri pentru numărarea frecvenței unor cuvinte sau valori non-întregi.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <utility>
#include <set>
#include <map>
using namespace std;

int main() {
    // 1. Vector
    vector<int> v = {10, 20};
    v.push_back(30); // v devine {10, 20, 30}
    
    // 2. Pair
    pair<int, string> p = {1, "Olimpiada"};
    
    // 3. Set
    set<int> s;
    s.insert(5);
    s.insert(2);
    s.insert(5); // 5 este duplicat, nu se adaugă din nou. s = {2, 5}
    
    // 4. Map
    map<string, int> varste;
    varste["Andrei"] = 16;
    varste["Maria"] = 17;
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 9**: Inițializăm un vector `v` cu elementele `{10, 20}`.
  - Visual Block:
    Label: Vector Initial
    State: v = [10, 20]
- **Linia 10**: Adăugăm elementul `30` la sfârșitul vectorului `v`.
  - Visual Block:
    Label: Vector Actualizat
    State: v = [10, 20, 30], activ: true
- **Linia 13**: Creăm o pereche `p` care asociază numărul `1` cu șirul `"Olimpiada"`.
  - Visual Block:
    Label: Pereche (Pair)
    State: p = {first: 1, second: "Olimpiada"}
- **Linia 16**: Declarăm un set `s` gol.
- **Linia 17**: Inserăm `5` în set.
- **Linia 18**: Inserăm `2` în set. Setul se auto-sortează: `{2, 5}`.
  - Visual Block:
    Label: Set Auto-Sortat
    State: s = [2, 5], sorted: true
- **Linia 19**: Încercăm să inserăm din nou `5`. Deoarece setul păstrează elemente unice, setul rămâne neschimbat: `{2, 5}`.
  - Visual Block:
    Label: Set Unic
    State: s = [2, 5]
- **Linia 22**: Declarăm un dicționar `varste` (Map).
- **Linia 23**: Adăugăm cheia `"Andrei"` cu valoarea `16`.
  - Visual Block:
    Label: Map Actualizat
    State: varste = {"Andrei": 16}, activ: true

## Probleme Recomandate
- **Easy**: [Frecventa (PbInfo #300)](https://www.pbinfo.ro/probleme/300) - Determinarea frecvenței numerelor folosind `std::map` sau vector.
- **Medium**: [Set Unice (PbInfo #1277)](https://www.pbinfo.ro/probleme/1277) - Verificarea existenței elementelor distincte folosind `std::set`.
- **Hard**: [Set-uri în Grafuri](https://leetcode.com/problems/contains-duplicate-iii/) - Probleme avansate ce combină iteratori pe set (ex: `lower_bound`).
