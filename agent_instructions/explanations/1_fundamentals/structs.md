# Tipuri de Date Neomogene (struct)

## Prezentare Generală
În C++, tipul de date `struct` permite gruparea mai multor variabile de tipuri diferite (numite membri) sub un singur nume. Acestea sunt cunoscute ca tipuri de date neomogene sau structuri de date definite de utilizator. 

Structurile sunt extrem de utile pentru reprezentarea conceptelor din lumea reală sau matematică ce conțin mai multe atribute (ex: un punct în plan format din coordonatele `x` și `y`, o fracție formată din `numarator` și `numitor`, sau o structură de date despre o persoană cu `nume` (string) și `varsta` (int)).

Accesul la membrii unei structuri se face folosind operatorul punct (`.`).

## Complexitate
- **Timp:** O(1) pentru accesarea sau modificarea membrilor unei structuri.
- **Spațiu:** Suma dimensiunilor membrilor din structură (plus eventual padding adăugat de compilator pentru alinierea memoriei).

## Variații și Cazuri Speciale
- **Constructori:** Putem defini funcții speciale numite constructori pentru a inițializa rapid membrii structurii (ex. `Punct(int _x, int _y) : x(_x), y(_y) {}`).
- **Supraîncărcarea operatorilor:** Permite definirea comportamentului operatorilor (cum ar fi `<` sau `==`) pentru structuri. Acest lucru este esențial pentru sortarea vectorilor de structuri folosind `std::sort`.

## Aplicații
- Reprezentarea punctelor în geometrie computațională.
- Gestionarea elementelor în algoritmi ca MST (Kruskal stochează muchiile ca structuri cu `u`, `v`, `cost`).
- Lucrul cu stări complexe în BFS sau Programare Dinamică.

## Cod Sursă C++
```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

struct Punct {
    int x, y;
    
    // Constructor pentru inițializare rapidă
    Punct(int _x = 0, int _y = 0) {
        x = _x;
        y = _y;
    }
    
    // Supraîncărcarea operatorului < pentru sortare (după abscisa x)
    bool operator<(const Punct &altul) const {
        if (x != altul.x) {
            return x < altul.x;
        }
        return y < altul.y;
    }
};

int main() {
    Punct p1(5, 3);
    Punct p2(2, 8);
    
    vector<Punct> puncte = {p1, p2};
    sort(puncte.begin(), puncte.end());
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 7**: Declarăm structura `Punct` care conține membrii întregi `x` și `y`.
- **Linia 11**: Constructorul structurii `Punct` care permite inițializarea ei sub forma `Punct p(5, 3)`.
- **Linia 17**: Definim operatorul `<`. Spunem că un punct este "mai mic" decât altul dacă are coordonata `x` mai mică, sau, în caz de egalitate a lui `x`, dacă are coordonata `y` mai mică.
- **Linia 26**: În `main()`, creăm un punct `p1` la `(5, 3)`.
  - Visual Block:
    Label: Creare Punct 1
    State: p1 = {x: 5, y: 3}
- **Linia 27**: Creăm un al doilea punct `p2` la `(2, 8)`.
  - Visual Block:
    Label: Creare Punct 2
    State: p2 = {x: 2, y: 8}
- **Linia 29**: Introducem ambele puncte într-un vector de puncte.
  - Visual Block:
    Label: Vector Puncte
    State: puncte = [{x: 5, y: 3}, {x: 2, y: 8}]
- **Linia 30**: Apelăm funcția `sort()`. Deoarece am definit `operator<`, compilatorul știe cum să sorteze punctele. Punctul `p2` (x=2) va fi plasat înaintea lui `p1` (x=5).
  - Visual Block:
    Label: Vector Sortat
    State: puncte = [{x: 2, y: 8}, {x: 5, y: 3}], sorted: true

## Probleme Recomandate
- **Easy**: [Fractii (PbInfo #452)](https://www.pbinfo.ro/probleme/452/fractii) - Reducerea fracțiilor folosind o structură.
- **Medium**: [Distanta Puncte (PbInfo #112)](https://www.pbinfo.ro/probleme/112/sortare_puncte) - Sortarea punctelor în plan după distanța față de origine.
- **Hard**: [Coordonate (PbInfo #381)](https://www.pbinfo.ro/probleme/381) - Probleme de geometrie ce folosesc intens operații pe structuri.
