# Prelucrări pe Șiruri de Numere Citite Succesiv, Fără Memorarea Lor

## Prezentare Generală
Prelucrarea datelor în flux (stream processing) constă în citirea elementelor dintr-un șir, pe rând, și actualizarea unor indicatori statistici (sumă, minim, maxim, contoare) fără a stoca numerele citite într-un vector. Această tehnică este esențială atunci când cantitatea de date este foarte mare și nu ar încăpea în memorie, sau când vrem să obținem rezultatul într-o singură parcurgere (algoritm "one-pass").

În C++, citirea succesivă se realizează de obicei folosind o buclă de tipul `while(cin >> x)` sau citind un număr specificat `N` de elemente într-o buclă `for`.

## Complexitate
- **Timp:** O(N) unde N este numărul total de elemente din flux. Fiecare element este procesat exact o dată.
- **Spațiu:** O(1) deoarece folosim doar câteva variabile de stare, independent de lungimea șirului.

## Variații și Cazuri Speciale
1. **Șir Vid:** Dacă nu se introduce niciun număr, min/max pot fi nedefinite.
2. **Inițializarea Minimului/Maximului:** Pentru determinarea minimului, variabila de stare trebuie inițializată cu o valoare foarte mare (de exemplu `INT_MAX` sau primul element citit). Pentru maxim, cu o valoare foarte mică (`INT_MIN` sau primul element citit).

## Aplicații
- Calcularea mediei aritmetice a unui set de numere.
- Găsirea celei mai mici și celei mai mari valori.
- Filtrarea și numărarea elementelor care respectă o anumită proprietate (ex. numere pare, numere prime).

## Cod Sursă C++
```cpp
#include <iostream>
#include <climits>
using namespace std;

int main() {
    int x;
    int minim = INT_MAX;
    int maxim = INT_MIN;
    int suma = 0;
    
    // Presupunem că citim până la finalul fișierului/inputului (EOF)
    while (cin >> x) {
        if (x < minim) {
            minim = x;
        }
        if (x > maxim) {
            maxim = x;
        }
        suma += x;
    }
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 7**: Inițializăm variabila `minim` cu cea mai mare valoare posibilă pentru un `int` (`INT_MAX`), pentru a ne asigura că orice număr citit va fi mai mic sau egal cu ea.
  - Visual Block:
    Label: Inițializare Minim
    State: minim = 2147483647
- **Linia 8**: Inițializăm variabila `maxim` cu cea mai mică valoare posibilă pentru un `int` (`INT_MIN`), pentru a ne asigura că orice număr citit va fi mai mare sau egal cu ea.
  - Visual Block:
    Label: Inițializare Maxim
    State: maxim = -2147483648
- **Linia 12**: Citim primul număr `x` (să spunem `x = 7`). Condiția `cin >> x` devine adevărată.
  - Visual Block:
    Label: Citire Element
    State: x = 7, activ: true
- **Linia 13**: Verificăm dacă `x < minim` (`7 < 2147483647`). Este adevărat, deci `minim` devine `7`.
  - Visual Block:
    Label: Actualizare Minim
    State: minim = 7, activ: true
- **Linia 16**: Verificăm dacă `x > maxim` (`7 > -2147483648`). Este adevărat, deci `maxim` devine `7`.
  - Visual Block:
    Label: Actualizare Maxim
    State: maxim = 7, activ: true
- **Linia 19**: Adăugăm la sumă: `suma = 0 + 7 = 7`.
  - Visual Block:
    Label: Sumă Totală
    State: suma = 7

## Probleme Recomandate
- **Easy**: [Minimul a n numere (PbInfo #46)](https://www.pbinfo.ro/probleme/46/minimpozitive) - Determinarea minimului dintre numerele citite.
- **Medium**: [Statistici Flux (PbInfo #3264)](https://www.pbinfo.ro/probleme/3264/statistici) - Calculează diverse statistici pe un șir citit.
- **Hard**: [Element Majoritar Online](https://leetcode.com/problems/majority-element/) - Determinarea elementului majoritar folosind Boyer-Moore (algoritm one-pass).
