# Algoritmul lui Lee & Algoritmul de Fill (Flood Fill)

## Prezentare Generală
1. **Algoritmul de Fill (Flood Fill):** Este un algoritm folosit pentru a determina și colora/marca o regiune conexă de pixeli sau celule similare dintr-o matrice bidimensională (grilă). Se bazează pe parcurgerea în adâncime (DFS) sau în lățime (BFS). Este algoritmul din spatele instrumentului "Bucket Fill" (găleata de vopsea) din programele de desenat.
2. **Algoritmul lui Lee:** Este o adaptare directă a parcurgerii în lățime (BFS) pe o matrice (grilă) pentru a găsi cel mai scurt drum între o celulă de start `(x1, y1)` și o celulă destinație `(x2, y2)`, ocolind obstacolele. Matricea este etichetată cu distanțele de la start (startul primește `1` sau `0`, vecinii accesibili `2`, vecinii lor `3` etc.).

## Complexitate
Fie `N` numărul de linii și `M` numărul de coloane ale matricei:
- **Timp:** O(N * M) deoarece fiecare celulă este vizitată și procesată de un număr constant de ori (în cele 4 sau 8 direcții).
- **Spațiu:** O(N * M) pentru coada BFS și matricea de distanțe.

## Variații și Cazuri Speciale
- **Direcții cardinale:** Mișcarea poate fi definită pe 4 direcții (sus, jos, stânga, dreapta) sau 8 direcții (incluzând diagonalele).
- **Traseul efectiv:** Pentru a reconstitui traseul de la destinație la start, pornim de la destinație și ne deplasăm mereu spre vecini care au valoarea cu 1 mai mică decât celula curentă.

## Aplicații
- Rezolvarea labirinturilor (găsirea celui mai scurt drum).
- Determinarea numărului de insule/regiuni dintr-o matrice (componente conexe pe grilă).
- Detectarea zonelor închise în jocuri.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Direcțiile cardinale (Sus, Dreapta, Jos, Stânga)
int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

int lee(vector<vector<int>>& labirint, int start_x, int start_y, int stop_x, int stop_y) {
    int n = labirint.size();
    int m = labirint[0].size();
    
    // Matrice de distanțe inițializată cu -1 (nevizitat)
    vector<vector<int>> dist(n, vector<int>(m, -1));
    queue<pair<int, int>> q;
    
    // Startul
    q.push({start_x, start_y});
    dist[start_x][start_y] = 0; // Distanța la start este 0
    
    while (!q.empty()) {
        auto [x, y] = q.front();
        q.pop();
        
        if (x == stop_x && y == stop_y) {
            return dist[x][y]; // Am ajuns la destinație!
        }
        
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            
            // Verificăm dacă celula vecină este în interiorul matricei, nu este obstacol și nu a fost vizitată
            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                if (labirint[nx][ny] == 0 && dist[nx][ny] == -1) {
                    dist[nx][ny] = dist[x][y] + 1;
                    q.push({nx, ny});
                }
            }
        }
    }
    return -1; // Destinația este inaccesibilă
}

int main() {
    // 0 = Liber, 1 = Zid (obstacol)
    vector<vector<int>> labirint = {
        {0, 1, 0, 0},
        {0, 0, 0, 1},
        {1, 0, 1, 0},
        {0, 0, 0, 0}
    };
    
    int drum = lee(labirint, 0, 0, 3, 3); // Cel mai scurt drum de la (0,0) la (3,3)
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 29**: Definim direcțiile cardinale de mișcare: `dx` și `dy` pentru orientarea pe linii și coloane.
- **Linia 37**: Inițializăm matricea de distanțe `dist` de dimensiune `N x M` cu valoarea `-1` (semnificând celulă nevizitată).
- **Linia 42**: Setăm distanța punctului de start `(start_x, start_y) = (0, 0)` ca fiind `0`.
  - **Vizualizare (matrix)**:
    ```json
    {
      "headers": ["", "c0", "c1", "c2", "c3"],
      "data": [
        ["r0", "0", "-1", "-1", "-1"],
        ["r1", "-1", "-1", "-1", "-1"],
        ["r2", "-1", "-1", "-1", "-1"],
        ["r3", "-1", "-1", "-1", "-1"]
      ],
      "activeCells": [{"r": 0, "c": 0}]
    }
    ```
- **Linia 45**: Extragem prima celulă `(0, 0)` din coada `q` pentru a-i examina vecinii.
- **Linia 59**: Găsim vecinul de jos `(1, 0)` ca fiind liber (are valoarea `0` în labirint) și nevizitat. Îi setăm distanța ca fiind `dist[0][0] + 1 = 1` și îl adăugăm în coadă.
  - **Vizualizare (matrix)**:
    ```json
    {
      "headers": ["", "c0", "c1", "c2", "c3"],
      "data": [
        ["r0", "0", "-1", "-1", "-1"],
        ["r1", "1", "-1", "-1", "-1"],
        ["r2", "-1", "-1", "-1", "-1"],
        ["r3", "-1", "-1", "-1", "-1"]
      ],
      "activeCells": [{"r": 1, "c": 0}],
      "highlightCells": [{"r": 0, "c": 0}]
    }
    ```
- **Pasul următor (Linia 44)**: Continuăm bucla BFS. Extragem `(1, 0)`. Găsim vecinul `(1, 1)` care devine vizitat cu distanța `2`.
  - **Vizualizare (matrix)**:
    ```json
    {
      "headers": ["", "c0", "c1", "c2", "c3"],
      "data": [
        ["r0", "0", "-1", "-1", "-1"],
        ["r1", "1", "2", "-1", "-1"],
        ["r2", "-1", "-1", "-1", "-1"],
        ["r3", "-1", "-1", "-1", "-1"]
      ],
      "activeCells": [{"r": 1, "c": 1}],
      "highlightCells": [{"r": 1, "c": 0}]
    }
    ```


## Probleme Recomandate
- **Easy**: [Fill (PbInfo #1279)](https://www.pbinfo.ro/probleme/1279) - Numărarea componentelor conexe pe grilă.
- **Medium**: [Lee (PbInfo #344)](https://www.pbinfo.ro/probleme/344) - Găsirea celui mai scurt drum în matrice.
- **Hard**: [Labirint în 3D](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) - Lee pe graf 3D cu obstacole distructibile.
