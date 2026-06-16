# Simulări

## Prezentare Generală
Simularea reprezintă scrierea unui program care mimează sau reproduce pas cu pas un proces fizic, un joc (ex: Jocul Vieții al lui Conway, X și 0), sau o succesiune de reguli bine definite (ex. mișcarea unui robot pe o grilă, derularea unui algoritm fizic). 

Spre deosebire de algoritmii care folosesc formule matematice directe, simulările urmăresc starea sistemului (variabile, matrici de stare) de-a lungul timpului. Algoritmii de simulare sunt ideali pentru problemele unde regulile sunt complexe și greu de modelat analitic, dar ușor de aplicat pas cu pas.

## Complexitate
- **Timp:** O(T * S) unde T este numărul de pași (timpul de simulare) și S este complexitatea actualizării stării într-un pas.
- **Spațiu:** O(S) pentru memorarea stării curente a sistemului.

## Variații și Cazuri Speciale
- **Simulări pe Grilă (2D):** Deseori necesită utilizarea vectorilor de direcție (`dx[]`, `dy[]`) pentru a simula mișcarea în cele 4 sau 8 direcții cardinale.
- **Detecția Ciclurilor:** În simulările deterministe cu număr finit de stări, sistemul poate intra într-un ciclu infinit. Este important să stocăm stările vizitate pentru a opri simularea dacă o stare se repetă (folosind de exemplu un `set` sau `map`).

## Aplicații
- Jocuri (Șah, Conway's Game of Life).
- Planificarea proceselor (CPU scheduling, simularea cozilor la magazin).
- Probleme geometrice interactive (mişcarea corpurilor).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

// Direcțiile de mișcare în grilă: Sus, Dreapta, Jos, Stânga
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

int main() {
    // Poziția inițială a robotului pe grilă
    int x = 0, y = 0;
    int dir = 1; // Începe deplasarea spre Dreapta (indexul 1 din dx/dy)
    
    // Instrucțiuni: 0 = Mergi înainte, 1 = Rotește 90 grade la dreapta
    vector<int> instructiuni = {0, 0, 1, 0, 1, 0};
    
    for (int ins : instructiuni) {
        if (ins == 0) {
            x += dx[dir];
            y += dy[dir];
        } else if (ins == 1) {
            dir = (dir + 1) % 4; // Rotație la dreapta
        }
    }
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 6**: Definim vectorii de direcție `dx` și `dy` pentru a ușura deplasarea în grilă.
- **Linia 11**: Inițializăm coordonatele robotului `x = 0, y = 0`.
  - Visual Block:
    Label: Poziție Robot
    State: x = 0, y = 0
- **Linia 12**: Setăm direcția inițială la `1` (corespunzătoare direcției `(dx[1], dy[1]) = (0, 1)`, adică Dreapta).
  - Visual Block:
    Label: Direcție Curentă
    State: dir = 1 (Dreapta)
- **Linia 17**: Începem procesarea instrucțiunilor. Prima instrucțiune este `0` (Mergi înainte).
  - Visual Block:
    Label: Instrucțiune Pas 1
    State: ins = 0, activ: true
- **Linia 19**: Deoarece instrucțiunea este `0`, actualizăm coordonatele: `x += dx[1] => x += 0`, `y += dy[1] => y += 1`. Robotul ajunge la `(0, 1)`.
  - Visual Block:
    Label: Mutare Robot
    State: x = 0, y = 1, activ: true
- **Linia 17 (Pasul 3)**: A treia instrucțiune este `1` (Rotește la dreapta).
  - Visual Block:
    Label: Instrucțiune Pas 3
    State: ins = 1, activ: true
- **Linia 22**: Schimbăm direcția: `dir = (1 + 1) % 4 = 2` (direcția Jos: `dx[2]=1, dy[2]=0`).
  - Visual Block:
    Label: Schimbare Direcție
    State: dir = 2 (Jos)

## Probleme Recomandate
- **Easy**: [Robot (PbInfo #3312)](https://www.pbinfo.ro/probleme/3312) - Simulează mișcarea unui robot pe o tablă.
- **Medium**: [Jocul Vieții (Conway's Game of Life)](https://leetcode.com/problems/game-of-life/) - Implementarea clasică a simulării celulare.
- **Hard**: [Simulare Parc](https://www.pbinfo.ro/probleme/1269) - O simulare complexă cu mașini și parcări cu priorități.
