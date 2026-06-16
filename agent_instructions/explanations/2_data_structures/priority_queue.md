# Coada cu Priorități (Priority Queue)

## Prezentare Generală
O **coadă cu priorități (Priority Queue)** este o structură de date care gestionează o colecție de elemente astfel încât elementul cu cea mai mare prioritate (de obicei valoarea maximă sau minimă) este întotdeauna accesibil în vârful structurii. Spre deosebire de o coadă standard (FIFO), ordinea de extragere nu depinde de momentul intrării elementului, ci de importanța/valoarea lui.

Intern, coada cu priorități este implementată ca o structură de tip **Heap (Grămadă)** - un arbore binar aproape complet care respectă proprietatea de heap (ex. tatăl este întotdeauna mai mare sau egal cu fii săi pentru Max-Heap).

În C++, containerul `std::priority_queue` este furnizat de biblioteca `<queue>` și funcționează implicit ca un **Max-Heap** (oferă acces instant la elementul maxim).

## Complexitate
- **Timp:** 
  - Inserare (`push`): O(log N) - elementul se cerne în sus în structura de heap.
  - Ștergere maxim/minim (`pop`): O(log N) - se elimină rădăcina și se re-echilibrează structura (cerne în jos).
  - Accesare maxim/minim (`top`): O(1) - elementul se află mereu în rădăcina arborelui (vârf).
- **Spațiu:** O(N) pentru stocarea a N elemente.

## Variații și Cazuri Speciale
- **Min-Heap în C++:** Dacă dorim ca elementul din vârf să fie cel *minim*, declarăm coada cu priorități astfel:
  `priority_queue<int, vector<int>, greater<int>> pq;`
- **Priorități pentru structuri custom:** Dacă lucrăm cu structuri personalizate (ex. perechi distanță-nod), trebuie să definim comparatorul corespunzător (sau să supraîncărcăm `operator<`).

## Aplicații
- **Algoritmul lui Dijkstra:** Determinarea drumurilor minime într-un graf ponderat cu costuri pozitive (folosește un Min-Heap pentru a extrage nodul cel mai apropiat nevizitat).
- **Algoritmul lui Prim:** Determinarea arborelui parțial de cost minim (MST).
- **Codificarea Huffman:** Algoritm de compresie a datelor.
- Heap Sort (Sortare folosind heap-uri).

## Cod Sursă C++
```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // 1. Max-Heap implicit (elementele mai mari au prioritate)
    priority_queue<int> max_pq;
    max_pq.push(10);
    max_pq.push(30);
    max_pq.push(20);
    
    int maxim = max_pq.top(); // maxim = 30
    max_pq.pop(); // Elimina 30, noul top devine 20
    
    // 2. Min-Heap (elementele mai mici au prioritate)
    priority_queue<int, vector<int>, greater<int>> min_pq;
    min_pq.push(10);
    min_pq.push(30);
    min_pq.push(20);
    
    int minim = min_pq.top(); // minim = 10
    min_pq.pop(); // Elimina 10, noul top devine 20
    
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 8**: Declarăm un Max-Heap implicit `max_pq`.
- **Linia 9**: Adăugăm `10`. Heap-ul conține `{10}`.
- **Linia 10**: Adăugăm `30`. Structura de heap se re-aranjează astfel încât `30` devine rădăcina (vârful).
- **Linia 11**: Adăugăm `20`. `30` rămâne în vârf.
  - Visual Block:
    Label: Max-Heap (Vârf = 30)
    State: Heap = [30, 10, 20]
- **Linia 13**: Accesăm elementul din vârf cu `max_pq.top()`. Valoarea este `30`.
  - Visual Block:
    Label: Top Max-Heap
    State: maxim = 30, activ: true
- **Linia 14**: Eliminăm rădăcina cu `max_pq.pop()`. Heap-ul se re-echilibrează, iar noul vârf devine `20`.
  - Visual Block:
    Label: Pop Max-Heap
    State: Heap = [20, 10], activ: true
- **Linia 17**: Declarăm un Min-Heap `min_pq` folosind `greater<int>`.
- **Liniile 18-20**: Adăugăm `10, 30, 20` în Min-Heap.
  - Visual Block:
    Label: Min-Heap (Vârf = 10)
    State: Heap = [10, 30, 20], sorted: true
- **Linia 22**: Accesăm elementul minim din vârf: `10`.
  - Visual Block:
    Label: Top Min-Heap
    State: minim = 10

## Probleme Recomandate
- **Easy**: [Sortare cu Heap (PbInfo #2035)](https://www.pbinfo.ro/probleme/2035) - Sortarea unui vector folosind structura de Heap.
- **Medium**: [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) - Găsirea al k-lea cel mai mare element dintr-un șir folosind un Min-Heap de dimensiune `K`.
- **Hard**: [Merge k Sorted Lists (LeetCode #23)](https://leetcode.com/problems/merge-k-sorted-lists/) - Îmbinarea eficientă a `k` liste sortate folosind o coadă cu priorități.
