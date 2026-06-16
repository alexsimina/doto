# Ciurul lui Eratostene & Descompunerea în Factori Primi

## Prezentare Generală
1. **Ciurul lui Eratostene:** Este un algoritm clasic și extrem de eficient pentru determinarea tuturor numerelor prime mai mici sau egale cu un număr `N`. Algoritmul începe cu un vector boolean în care toate numerele sunt presupuse prime. Pornind de la `2`, pentru fiecare număr prim găsit, îi marcăm toți multiplii săi mai mari sau egali cu pătratul lui ca fiind compuși (neprimi).
2. **Descompunerea în factori primi:** Constă în scrierea unui număr `X` ca produs de numere prime la anumite puteri. Folosind Ciurul lui Eratostene, putem precalcula pentru fiecare număr cel mai mic divizor prim (SPF - Smallest Prime Factor). Cu ajutorul vectorului `spf[]`, putem descompune orice număr `X <= N` în timp logaritmic `O(log X)` împărțindu-l repetat la `spf[X]`.

## Complexitate
- **Ciurul lui Eratostene:**
  - **Timp:** O(N log log N) - aproape liniar datorită densității numerelor prime.
  - **Spațiu:** O(N) pentru vectorul de marcaje sau vectorul `spf`.
- **Descompunerea rapidă folosind SPF:**
  - **Timp:** O(log X) per interogare de descompunere.

## Variații și Cazuri Speciale
- **Optimizare spațiu:** Putem folosi `std::vector<bool>` în C++ care este optimizat la nivel de bit (1 bit per valoare booleană) sau putem parcurge doar numerele impare pentru a înjumătăți memoria.
- **Factorizare fără precalculare:** Pentru un singur număr `X` mare, cea mai eficientă metodă clasică rulează în `O(sqrt(X))` testând divizibilitatea până la `sqrt(X)`.

## Aplicații
- Generarea rapidă a numerelor prime într-un interval.
- Factorizarea rapidă a mai multor numere (de exemplu la interogări repetate în probleme de tip query).
- Calcularea numărului de divizori sau a sumei divizorilor.

## Cod Sursă C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 100000;
vector<int> spf(MAXN + 1);

// Initializează Ciurul și precalculează cel mai mic divizor prim (SPF)
void initializeazaCiur() {
    for (int i = 1; i <= MAXN; i++) {
        spf[i] = i; // Inițial, fiecare număr este propriul său SPF
    }
    
    for (int i = 2; i * i <= MAXN; i++) {
        if (spf[i] == i) { // i este prim
            for (int j = i * i; j <= MAXN; j += i) {
                if (spf[j] == j) {
                    spf[j] = i; // i este cel mai mic divizor prim al lui j
                }
            }
        }
    }
}

// Descompune numărul x în factori primi în O(log x)
vector<pair<int, int>> descompune(int x) {
    vector<pair<int, int>> factori;
    while (x > 1) {
        int d = spf[x];
        int p = 0;
        while (x % d == 0) {
            p++;
            x /= d;
        }
        factori.push_back({d, p});
    }
    return factori;
}

int main() {
    initializeazaCiur();
    vector<pair<int, int>> f = descompune(60); // 60 = 2^2 * 3^1 * 5^1
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 10**: Inițializăm vectorul `spf`. Pentru `1`, `spf[1]=1`. Pentru `2`, `spf[2]=2` etc.
- **Linia 14**: Bucla exterioară a ciurului pornește de la `i = 2`. Deoarece `spf[2] == 2`, `2` este detectat ca prim.
  - Visual Block:
    Label: Prim Gasit
    State: i = 2, prim = true, activ: true
- **Linia 16**: Bucla interioară marchează multiplii lui `2` începând cu `2 * 2 = 4`, din 2 în 2: `4, 6, 8, 10...`. Pentru toți aceștia, `spf` devine `2`.
  - Visual Block:
    Label: Marcare Multipli
    State: spf[4] = 2, spf[6] = 2, spf[8] = 2
- **Linia 26**: Apelăm funcția de descompunere pentru `x = 60`.
- **Linia 28**: `spf[60]` este `2`. Deci divizorul curent este `d = 2`.
  - Visual Block:
    Label: Divizor Gasit
    State: x = 60, d = 2, activ: true
- **Linia 30**: Împărțim `60` la `2` succesiv. Obținem puterea `p = 2` și noul `x = 15`.
  - Visual Block:
    Label: Impartire Factor
    State: x = 15, p = 2, d = 2
- **Linia 28 (Pasul 2)**: `spf[15]` este `3`. Divizorul devine `d = 3`. Împărțim `15` la `3` => `x = 5`, `p = 1`.
  - Visual Block:
    Label: Impartire Factor 2
    State: x = 5, p = 1, d = 3
- **Linia 28 (Pasul 3)**: `spf[5]` este `5`. Divizorul devine `d = 5`. Împărțim `5` la `5` => `x = 1`, `p = 1`.
  - Visual Block:
    Label: Impartire Factor 3
    State: x = 1, p = 1, d = 5. Bucla se oprește.

## Probleme Recomandate
- **Easy**: [Ciur (PbInfo #3225)](https://www.pbinfo.ro/probleme/3225) - Generarea numerelor prime mai mici ca N.
- **Medium**: [Factorizare (PbInfo #439)](https://www.pbinfo.ro/probleme/439) - Descompunerea numerelor în factori primi.
- **Hard**: [Queries Prim](https://leetcode.com/problems/prime-in-diagonal/) - Probleme ce implică interogări repetate de factorizare pentru N mari.
