# Coada (Queue) și Deque

## Prezentare Generală
Coada (Queue) și Deque (Double-Ended Queue) sunt structuri de date liniare care gestionează ordinea elementelor.

1. **Coada (Queue):** Funcționează după principiul FIFO (First In, First Out - Primul venit, primul plecat). Elementele sunt adăugate la sfârșitul cozii și eliminate de la începutul ei, exact ca o coadă de așteptare la magazin.
   - Operații: `push()` (adaugă la final), `pop()` (elimină de la început), `front()` (accesează elementul din față), `empty()`.
   
2. **Deque (Double-Ended Queue):** Permite inserarea și ștergerea elementelor la ambele capete (față și spate). Combină funcționalitățile unei stive și ale unei cozi.
   - Operații: `push_back()`, `push_front()`, `pop_back()`, `pop_front()`, `front()`, `back()`.

În C++, acestea sunt disponibile prin `<queue>` pentru `std::queue` și `<deque>` pentru `std::deque`.

## Complexitate
- **Timp:** Toate operațiile elementare (`push`, `pop`, `push_front`, `pop_front` etc.) se execută în `O(1)` timp constant.
- **Spațiu:** `O(N)` pentru stocarea a `N` elemente.

## Variații și Cazuri Speciale
- **Deque-ul Monoton:** O variație în care menținem elementele din deque în ordine monotonă (crescător/descrescător) eliminând elementele care devin inutile. Aceasta este baza algoritmului de determinare a minimului/maximului pe ferestre glisante (Sliding Window Minimum/Maximum), o tehnică foarte frecventă la olimpiade.

## Aplicații
- **Coada:** Algoritmul BFS (Breadth-First Search) pentru parcurgerea grafurilor pe niveluri și determinarea drumurilor minime în grafuri neponderate.
- **Coada:** Algoritmul Lee (Flood Fill) pentru grid-uri.
- **Deque:** Algoritmi de tip Sliding Window (ex: determinarea elementului minim din fiecare subsecvență de lungime `K`).

## Cod Sursă C++
```cpp
#include <iostream>
#include <queue>
#include <deque>
using namespace std;

int main() {
    // Partea 1: Coada (Queue - FIFO)
    queue<int> q;
    q.push(10);
    q.push(20);
    
    int primul = q.front(); // primul = 10
    q.pop(); // Elimina 10, ramane 20 in coada
    
    // Partea 2: Deque (Double-Ended Queue)
    deque<int> dq;
    dq.push_back(100);  // dq = [100]
    dq.push_front(50);  // dq = [50, 100]
    dq.push_back(150);  // dq = [50, 100, 150]
    
    dq.pop_front(); // Elimina 50, dq = [100, 150]
    dq.pop_back();  // Elimina 150, dq = [100]
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 8**: Inițializăm o coadă `q` goală.
- **Linia 9**: Adăugăm `10` în coadă.
- **Linia 10**: Adăugăm `20` în coadă. Acesta se plasează în spatele lui `10`.
  - Visual Block:
    Label: Coadă (Queue)
    State: Queue = [10, 20]
- **Linia 12**: Citim valoarea din față cu `q.front()`. Valoarea este `10`.
  - Visual Block:
    Label: Citire Front
    State: primul = 10, activ: true
- **Linia 13**: Eliminăm elementul din față folosind `q.pop()`. Rămâne doar `{20}` în coadă.
  - Visual Block:
    Label: Pop Front
    State: Queue = [20], activ: true
- **Linia 17**: Creăm un `deque` `dq` și adăugăm `100` la final.
  - Visual Block:
    Label: Deque Pas 1
    State: Deque = [100]
- **Linia 18**: Adăugăm `50` în FAȚA deque-ului.
  - Visual Block:
    Label: Deque Pas 2
    State: Deque = [50, 100], activ: true
- **Linia 19**: Adăugăm `150` la SPATELE deque-ului.
  - Visual Block:
    Label: Deque Pas 3
    State: Deque = [50, 100, 150]

## Probleme Recomandate
- **Easy**: [Coada (PbInfo #875)](https://www.pbinfo.ro/probleme/875) - Simulare operații coadă.
- **Medium**: [Algoritmul Lee (PbInfo #344)](https://www.pbinfo.ro/probleme/344) - Folosirea cozii pentru drumul minim în matrice.
- **Hard**: [Sliding Window Maximum (LeetCode #239)](https://leetcode.com/problems/sliding-window-maximum/) - Determinarea maximului pe ferestre glisante folosind un Deque monoton în timp liniar.
