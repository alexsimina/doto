# Înfășurătoare Convexă (Convex Hull)

## Prezentare Generală
Înfășurătoarea convexă (Convex Hull) a unei mulțimi de puncte în plan reprezintă cel mai mic poligon convex care conține toate punctele în interiorul său sau pe frontiera sa. O metaforă vizuală comună este întinderea unui elastic în jurul unor cuie bătute în tablă: forma pe care o ia elasticul după ce este eliberat reprezintă înfășurătoarea convexă.

Cel mai robust și simplu de implementat algoritm este **Algoritmul Monotone Chain al lui Andrew**. Acesta construiește separat înfășurătoarea inferioară (Lower Hull) și înfășurătoarea superioară (Upper Hull) în timp `O(N log N)`:
1. Sortăm punctele după coordonata `X` (și în caz de egalitate după `Y`).
2. **Lower Hull:** Parcurgem punctele de la stânga la dreapta. Adăugăm punctele într-o listă. Dacă ultimele trei puncte din listă `A, B, C` nu realizează o virare la stânga (contra acelor de ceasornic), eliminăm punctul din mijloc `B`. Repetăm până când condiția este satisfăcută.
3. **Upper Hull:** Repetăm procesul parcurgând punctele de la dreapta la stânga.
4. Combinăm cele două liste, eliminând duplicatele de la capete.

Proprietatea de virare la stânga se verifică matematic folosind **produsul vectorial** (Cross Product) al vectorilor `AB` și `AC`:
`cross_product = (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x)`
- Dacă rezultatul este `> 0`, atunci `C` este la stânga dreptei `AB` (virare la stânga).
- Dacă este `< 0`, virare la dreapta.
- Dacă este `= 0`, punctele sunt coliniare.

## Complexitate
- **Timp:** O(N log N) din cauza sortării inițiale. Construirea efectivă a înfășurătorilor durează `O(N)` deoarece fiecare punct este adăugat și eliminat din stivă cel mult o singură dată (analiză amortizată).
- **Spațiu:** O(N) pentru stocarea punctelor înfășurătorii.

## Variații și Cazuri Speciale
- **Puncte coliniare:** În funcție de problemă, putem dori să includem sau să excludem punctele coliniare de pe frontiera poligonului. Acest lucru se controlează modificând condiția din produsul vectorial (`>= 0` sau `> 0`).
- **Graham Scan:** Un alt algoritm clasic ce sortează punctele polar în funcție de un punct de referință (minimul pe Y). Este ușor mai sensibil la precizia unghiulară a numerelor reale.

## Aplicații
- Probleme de delimitare a teritoriilor.
- Găsirea diametrului unei mulțimi de puncte (distanța maximă dintre oricare două puncte din plan - folosind tehnica "rotating calipers" pe înfășurătoarea convexă).
- Algoritmi de optimizare în planificare și grafică pe calculator.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Punct {
    long long x, y;
    
    // Sortare după X, apoi după Y
    bool operator<(const Punct& altul) const {
        if (x != altul.x) return x < altul.x;
        return y < altul.y;
    }
};

// Produsul vectorial pentru a verifica orientarea (AB x AC)
long long crossProduct(Punct A, Punct B, Punct C) {
    return (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
}

vector<Punct> convexHull(vector<Punct>& puncte) {
    int n = puncte.size(), k = 0;
    if (n <= 3) return puncte;
    
    vector<Punct> hull(2 * n);
    sort(puncte.begin(), puncte.end());
    
    // 1. Construim Lower Hull
    for (int i = 0; i < n; ++i) {
        while (k >= 2 && crossProduct(hull[k-2], hull[k-1], puncte[i]) <= 0) {
            k--;
        }
        hull[k++] = puncte[i];
    }
    
    // 2. Construim Upper Hull
    for (int i = n - 2, t = k + 1; i >= 0; i--) {
        while (k >= t && crossProduct(hull[k-2], hull[k-1], puncte[i]) <= 0) {
            k--;
        }
        hull[k++] = puncte[i];
    }
    
    hull.resize(k - 1); // Eliminăm duplicatul primului element adăugat la final
    return hull;
}

int main() {
    vector<Punct> puncte = {{0, 3}, {2, 2}, {1, 1}, {2, 1}, {3, 0}, {0, 0}, {3, 3}};
    vector<Punct> hull = convexHull(puncte);
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 53**: Apelăm funcția `convexHull` cu lista de 7 puncte din plan.
- **Linia 58**: Sortăm punctele după X (apoi Y).
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Puncte Sortate",
        "groups": [
          [
            { "val": "(0,0)" },
            { "val": "(0,3)" },
            { "val": "(1,1)" },
            { "val": "(2,1)" },
            { "val": "(2,2)" },
            { "val": "(3,0)" },
            { "val": "(3,3)" }
          ]
        ]
      }
    ]
    ```
- **Linia 61**: Începem construirea Lower Hull. Adăugăm primele două puncte: `(0, 0)` și `(0, 3)`.
- **Linia 62**: Pentru al treilea punct `(1, 1)` (i=2), verificăm orientarea formată de ultimele puncte. Deoarece `crossProduct` <= 0 (virare la dreapta), eliminăm `(0, 3)` din stivă.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă Hull Curent",
        "groups": [
          [
            { "val": "(0,0)" },
            { "val": "(1,1)", "active": true }
          ]
        ]
      }
    ]
    ```
- **Linia 65 (i=3)**: Adăugăm următorul punct `(2, 1)`. Deoarece `crossProduct` > 0 (virare la stânga: (0,0) -> (1,1) -> (2,1)), îl păstrăm pe stivă.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă Hull Curent",
        "groups": [
          [
            { "val": "(0,0)" },
            { "val": "(1,1)" },
            { "val": "(2,1)", "active": true }
          ]
        ]
      }
    ]
    ```


## Probleme Recomandate
- **Easy**: [Infasuratoare Convexă (PbInfo #1527)](https://www.pbinfo.ro/probleme/1527) - Determinarea înfășurătorii convexe a unei mulțimi de puncte.
- **Medium**: [Erect the Fence (LeetCode #587)](https://leetcode.com/problems/erect-the-fence/) - Implementare clasică de Convex Hull.
- **Hard**: [Convex Hull and Rotating Calipers](https://leetcode.com/problems/max-points-on-a-line/) - Probleme care combină Convex Hull cu determinarea distanței maxime.
