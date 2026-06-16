# Algoritmul lui Dial (Optimizare Dijkstra)

## Prezentare Generală
Algoritmul lui Dial este o optimizare a algoritmului lui Dijkstra pentru determinarea drumurilor minime într-un graf ponderat, utilă atunci când **costurile muchiilor sunt numere întregi mici** (în intervalul `[0, W]`).

În Dijkstra clasic, extragerea nodului cu distanța minimă se face în `O(log V)` folosind o coadă cu priorități (Heap), rezultând o complexitate totală de `O(E log V)`. 
Algoritmul lui Dial înlocuiește heap-ul cu un vector de **bucket-uri** (liste sau seturi), unde bucket-ul `i` conține toate nodurile care au distanța provizorie egală cu `i`.
- Deoarece costul maxim al unei muchii este `W`, diferența maximă de distanță între nodul curent extras și orice nod vecin relaxat este cel mult `W`.
- Astfel, avem nevoie doar de `W + 1` bucket-uri active, gestionate circular (folosind operatorul `% (W + 1)`).
- Menținem un indicator (pointer) la bucket-ul curent și îl avansăm circular până găsim un bucket nevid. Distanțele cresc monoton, deci nu trebuie să ne întoarcem niciodată în spate.

## Complexitate
- **Timp:** `O(E + V * W)` în cel mai rău caz. Dacă `W` este mic (constant), algoritmul rulează în timp liniar `O(E + V)`, depășind Dijkstra standard.
- **Spațiu:** `O(V + W)` pentru stocarea bucket-urilor circular.

## Variații și Cazuri Speciale
- **W mare:** Dacă `W` este foarte mare (ex. `W = 10^9`), algoritmul lui Dial devine extrem de ineficient și consumă prea multă memorie. În acest caz, Dijkstra clasic cu heap binar sau Fibonacci este de preferat.

## Aplicații
- Drumuri minime pe rețele rutiere unde limitele de viteză / distanțele între intersecții au valori întregi mici.
- Algoritmi de routing pe grid-uri în jocuri (unde costul trecerii pe un teren este 1, 2 sau 5).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <list>
using namespace std;

const int INF = 1e9;

struct Muchie {
    int to, cost;
};

void dial(int start, int n, int W, const vector<vector<Muchie>>& adj) {
    vector<int> dist(n + 1, INF);
    
    // Avem nevoie de W + 1 bucket-uri circular
    int num_buckets = W + 1;
    vector<list<int>> buckets(num_buckets);
    
    // Start
    dist[start] = 0;
    buckets[0].push_back(start);
    
    int idx_curent = 0; // Pointerul la bucket-ul curent
    int noduri_ramase = 1;
    
    while (noduri_ramase > 0) {
        // Avansăm circular până găsim un bucket nevid
        while (buckets[idx_curent].empty()) {
            idx_curent = (idx_curent + 1) % num_buckets;
        }
        
        int u = buckets[idx_curent].front();
        buckets[idx_curent].pop_front();
        noduri_ramase--;
        
        for (auto muchie : adj[u]) {
            int v = muchie.to;
            int cost = muchie.cost;
            
            if (dist[u] + cost < dist[v]) {
                // Dacă v era deja într-un bucket, îl scoatem (sau facem lazy-deletion)
                if (dist[v] != INF) {
                    int vechiul_bucket = dist[v] % num_buckets;
                    buckets[vechiul_bucket].remove(v);
                    noduri_ramase--;
                }
                
                dist[v] = dist[u] + cost;
                int noul_bucket = dist[v] % num_buckets;
                buckets[noul_bucket].push_back(v);
                noduri_ramase++;
            }
        }
    }
}

int main() {
    int n = 4;
    int W = 5; // Costul maxim al unei muchii
    vector<vector<Muchie>> adj(n + 1);
    
    adj[1].push_back({2, 2});
    adj[1].push_back({3, 4});
    adj[2].push_back({3, 1});
    adj[3].push_back({4, 3});
    
    dial(1, n, W, adj);
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 13**: Inițializăm distanțele cu `INF` (infinit).
- **Linia 16**: Inițializăm vectorul de bucket-uri circular cu dimensiunea `W + 1 = 6`.
- **Linia 20**: Setăm `dist[start] = 0` și adăugăm nodul de start în `buckets[0]`.
  - Visual Block:
    Label: Inițializare Buckets
    State: dist[1] = 0, buckets = [[1], [], [], [], [], []], activ: true
- **Linia 25**: Începem procesarea. Bucket-ul curent este `buckets[0]`. Extragem nodul `u = 1`.
  - Visual Block:
    Label: Extragere Nod
    State: u = 1, idx_curent = 0, activ: true
- **Linia 32**: Relaxăm vecinii lui `1`:
  - Vecinul `2` cu cost `2`: `dist[2] = 0 + 2 = 2`. Adăugăm `2` în `buckets[2]`.
  - Vecinul `3` cu cost `4`: `dist[3] = 0 + 4 = 4`. Adăugăm `3` în `buckets[4]`.
  - Visual Block:
    Label: Relaxare Vecini Nod 1
    State: dist[2] = 2, dist[3] = 4, buckets = [[], [], [2], [], [3], []]
- **Pasul 2**: Pointerul `idx_curent` avansează la `1` (vid), apoi la `2` (care conține nodul `2`).
- **Linia 29**: Extragem `u = 2` din `buckets[2]`.
  - Relaxăm vecinul `3` cu cost `1`: `dist[2] + 1 = 3 < dist[3] (4)`.
  - Scoatem `3` din `buckets[4]` și îl adăugăm în `buckets[3]` deoarece noua distanță este `3`.
  - Visual Block:
    Label: Actualizare Distanță Nod 3
    State: dist[3] = 3, buckets = [[], [], [], [3], [], []], activ: true

## Probleme Recomandate
- **Easy**: [Dijkstra Simplu (PbInfo #639)](https://www.pbinfo.ro/probleme/639/dijkstra) - Algoritmul Dijkstra pe costuri standard.
- **Medium**: [Dial Algorithm Simulation](https://www.geeksforgeeks.org/dials-algorithm-shortest-path-acyclic-graph/) - Rezolvarea drumurilor minime pe grafuri cu costuri mici.
- **Hard**: [Shortest Path with Small Edge Weights](https://leetcode.com/problems/network-delay-time/) - Probleme unde costurile muchiilor sunt foarte mici și se dorește optimizarea sub O(E log V).
