# Algoritmi de Baleiere (Sweep-line)

## Prezentare Generală
Baleierea (Sweep-line) este o tehnică fundamentală în geometria computațională folosită pentru a rezolva probleme bidimensionale (pe puncte, segmente, dreptunghiuri) într-un mod eficient. 

În loc să comparăm fiecare obiect cu fiecare alt obiect (ceea ce ar dura `O(N^2)`), imaginăm o linie verticală (linia de baleiere) care se deplasează de la stânga la dreapta peste plan. Linia se oprește doar în anumite puncte critice numite **evenimente** (ex: începutul unui segment, sfârșitul unui segment, poziția unui punct).
Pe măsură ce linia înaintează:
1. Menținem o structură de date activă (de obicei un arbore de căutare echilibrat precum `std::set`) cu obiectele intersectate curent de linia de baleiere, ordonate după coordonata lor `Y`.
2. Când întâlnim un eveniment, adăugăm sau eliminăm obiecte din structura activă și verificăm proprietăți (cum ar fi intersecția) doar între obiectul curent și vecinii săi imediați de pe axa `Y`.

## Complexitate
Fie `N` numărul de obiecte (segmente, puncte):
- **Timp:** O(N log N) - sortarea celor `2N` evenimente durează `O(N log N)`, iar fiecare operație de inserare/ștergere/căutare în structura activă durează `O(log N)`.
- **Spațiu:** O(N) pentru stocarea listei de evenimente și a structurii active.

## Variații și Cazuri Speciale
- **Baleiere pe 1D:** Găsirea acoperirii maxime a unor intervale pe o dreaptă (folosește doar sortare și parcurgere, fără structură activă complexă).
- **Intersecția a N segmente (Bentley-Ottmann):** Determină toate intersecțiile. Evenimentele includ și punctele de intersecție descoperite pe parcurs, care sunt adăugate dinamic în coada de prioritate a evenimentelor.

## Aplicații
- Detectarea dacă există cel puțin o pereche de segmente care se intersectează.
- Calcularea ariei reuniunii a `N` dreptunghiuri (folosind baleiere + Segment Tree).
- Găsirea celei mai apropiate perechi de puncte (Closest Pair of Points).

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <set>
using namespace std;

struct Punct {
    double x, y;
};

struct Eveniment {
    double x;
    int tip; // 1 = Început segment, -1 = Sfârșit segment
    int id;  // Identificatorul segmentului
    double y;
    
    bool operator<(const Eveniment& altul) const {
        if (x != altul.x) return x < altul.x;
        return tip < altul.tip; // Procesăm inserările înaintea ștergerilor la coordonate X egale
    }
};

int main() {
    // Exemplu simplu: detectarea suprapunerii unor intervale pe axa X (baleiere 1D)
    // Intervalele: [1, 4], [2, 5], [6, 8]
    vector<pair<int, int>> intervale = {{1, 4}, {2, 5}, {6, 8}};
    vector<Eveniment> evenimente;
    
    for (int i = 0; i < intervale.size(); i++) {
        evenimente.push_back({(double)intervale[i].first, 1, i, 0});
        evenimente.push_back({(double)intervale[i].second, -1, i, 0});
    }
    
    sort(evenimente.begin(), evenimente.end());
    
    int intervale_active = 0;
    int max_suprapunere = 0;
    
    for (auto ev : evenimente) {
        if (ev.tip == 1) {
            intervale_active++;
            max_suprapunere = max(max_suprapunere, intervale_active);
        } else {
            intervale_active--;
        }
    }
    
    cout << "Suprapunere maximă: " << max_suprapunere << endl; // Rezultat: 2 (intervalele 1 și 2 se suprapun)
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 26**: Definim intervalele pe axa X: `[1, 4]`, `[2, 5]`, `[6, 8]`.
- **Linia 29**: Generăm evenimentele. Fiecare interval adaugă un eveniment de început (`tip = 1`) la coordonata de start și unul de sfârșit (`tip = -1`) la coordonata de final.
  - Evenimente generate: `(1, tip=1)`, `(4, tip=-1)`, `(2, type=1)`, `(5, type=-1)`, `(6, type=1)`, `(8, type=-1)`.
- **Linia 34**: Sortăm evenimentele crescător după coordonata `X`.
  - Ordine rezultată: `X = 1 (start)`, `X = 2 (start)`, `X = 4 (stop)`, `X = 5 (stop)`, `X = 6 (start)`, `X = 8 (stop)`.
  - Visual Block:
    Label: Evenimente Sortate
    State: Ev = [1, 2, 4, 5, 6, 8], sorted: true
- **Linia 39**: Începem baleierea.
  - La `X = 1 (start)`: `intervale_active = 1`.
  - La `X = 2 (start)`: `intervale_active = 2`. `max_suprapunere = 2`.
  - Visual Block:
    Label: Baleiere Pas 2 (X = 2)
    State: x = 2, active = 2, max = 2, activ: true
  - La `X = 4 (stop)`: `intervale_active = 1`.
  - La `X = 5 (stop)`: `intervale_active = 0`.
  - La `X = 6 (start)`: `intervale_active = 1`.
  - La `X = 8 (stop)`: `intervale_active = 0`.
  - Visual Block:
    Label: Final Baleiere
    State: max_suprapunere = 2, active = 0

## Probleme Recomandate
- **Easy**: [Reuniune Intervale (PbInfo #3065)](https://www.pbinfo.ro/probleme/3065) - Determinarea lungimii totale a reuniunii unor intervale.
- **Medium**: [Closest Pair of Points](https://leetcode.com/problems/k-closest-points-to-origin/) - Găsirea distanței minime dintre două puncte folosind baleiere.
- **Hard**: [Area of Rectangles (CSES)](https://cses.fi/problemset/task/2427) - Reuniunea ariei a N dreptunghiuri folosind baleiere și Segment Tree.
