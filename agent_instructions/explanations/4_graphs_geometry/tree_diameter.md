# Diametrul unui Arbore (Tree Diameter)

## Prezentare Generală
Diametrul unui arbore reprezintă lungimea celui mai lung drum simplu între oricare două noduri din acel arbore. 

Pentru a găsi diametrul unui arbore în timp liniar `O(N)`, folosim o metodă elegantă bazată pe **două parcurgeri DFS** (sau BFS):
1. **Primul DFS:** Pornim dintr-un nod arbitrar (de obicei nodul `1`). Găsim nodul cel mai îndepărtat de acesta, pe care îl notăm cu `Y`.
2. **Al doilea DFS:** Pornim parcurgerea din nodul `Y` (care este garantat un capăt al diametrului). Găsim nodul cel mai îndepărtat de `Y`, pe care îl notăm cu `Z`.
Distanța dintre `Y` și `Z` determinată la a doua parcurgere este exact diametrul arborelui.

*Notă: Această proprietate este specifică arborilor (grafuri conexe aciclice) și nu funcționează pe grafuri generale.*

## Complexitate
- **Timp:** O(N) deoarece efectuăm exact două parcurgeri complete ale arborelui (vizitând fiecare nod și muchie de un număr constant de ori).
- **Spațiu:** O(N) pentru stocarea listei de adiacență a arborelui și a stivei de recursivitate.

## Variații și Cazuri Speciale
- **Arbore cu un singur nod:** Diametrul este `0`.
- **Programare Dinamică pe Arbori:** O metodă alternativă de a calcula diametrul constă în definirea pentru fiecare nod `u` a celei mai lungi căi descendente și a celei de-a doua cele mai lungi căi descendente. Diametrul va fi maximul sumei acestor două căi pentru orice nod `u`. Această metodă funcționează și în arbori orientați sau când muchiile au costuri negative.

## Aplicații
- Probleme de rețele (găsirea distanței maxime de propagare).
- Determinarea centrului unui arbore (nodul care minimizează distanța maximă către orice alt nod).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<vector<int>> adj;
vector<int> dist;

// Parcurgere DFS pentru calculul distanțelor de la nodul de pornire 'u'
void dfs(int u, int p, int d) {
    dist[u] = d;
    for (int v : adj[u]) {
        if (v != p) { // Evităm întoarcerea spre părinte
            dfs(v, u, d + 1);
        }
    }
}

int main() {
    // Inițializare arbore cu 5 noduri
    n = 5;
    adj.resize(n + 1);
    dist.resize(n + 1);
    
    // Muchii: 1-2, 2-3, 3-4, 3-5
    adj[1].push_back(2); adj[2].push_back(1);
    adj[2].push_back(3); adj[3].push_back(2);
    adj[3].push_back(4); adj[4].push_back(3);
    adj[3].push_back(5); adj[5].push_back(3);
    
    // Pasul 1: DFS din nodul arbitrar 1
    dfs(1, 0, 0);
    
    int nod_indepartat = 1;
    for (int i = 1; i <= n; i++) {
        if (dist[i] > dist[nod_indepartat]) {
            nod_indepartat = i;
        }
    }
    
    // Pasul 2: DFS din nodul cel mai îndepărtat (care este capătul Y)
    dfs(nod_indepartat, 0, 0);
    
    int diametru = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] > diametru) {
            diametru = dist[i];
        }
    }
    
    cout << "Diametrul este: " << diametru << endl; // Pentru graful dat, drumul 1-2-3-4 are lungimea 3 (sau 1-2-3-5)
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 23**: Definim arborele și adăugăm muchiile în lista de adiacență `adj`.
- **Linia 30**: Apelăm primul DFS din nodul `1` cu părintele `0` și distanța inițială `0`.
- **Linia 10**: `dist[1]` devine `0`. Intrăm în vecinii lui `1` (nodul `2`).
- **Linia 13**: Apelăm recursiv `dfs(2, 1, 1)`. `dist[2]` devine `1`.
- **La finalul primului DFS**: Vectorul `dist` va fi `[0, 0, 1, 2, 3, 3]`. Valorile maxime sunt `3` pentru nodurile `4` și `5`.
  - Visual Block:
    Label: Rezultat DFS 1
    State: dist = [0, 0, 1, 2, 3, 3], nod_indepartat = 4 (sau 5), activ: true
- **Linia 40**: Rulăm al doilea DFS din nodul `4` (Y).
  - DFS-ul va calcula distanțele față de `4`.
- **La finalul celui de-al doilea DFS**: Vectorul `dist` devine `[0, 3, 2, 1, 0, 2]`. Distanța maximă este `3` în nodul `1` (sau `5` în nodul `5` distanța e `2`).
  - Visual Block:
    Label: Rezultat DFS 2
    State: dist = [0, 3, 2, 1, 0, 2], diametru = 3, sorted: true

## Probleme Recomandate
- **Easy**: [Diametru Arbore (PbInfo #2810)](https://www.pbinfo.ro/probleme/2810) - Determinarea diametrului unui arbore.
- **Medium**: [Tree Diameter (CSES)](https://cses.fi/problemset/task/1131) - Problemă clasică din setul CSES.
- **Hard**: [Centrul unui Arbore](https://leetcode.com/problems/minimum-height-trees/) - Determinarea nodurilor care pot reprezenta rădăcina unui arbore de înălțime minimă.
