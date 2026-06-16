# Stiva (Stack) și Aplicații

## Prezentare Generală
Stiva (Stack) este o structură de date de tip LIFO (Last In, First Out - Ultimul venit, primul plecat). Singurul element accesibil în mod direct este cel din vârful stivei (cel mai recent adăugat). Putem vizualiza o stivă ca pe un teanc de farfurii: poți adăuga o farfurie nouă doar deasupra și o poți lua doar pe cea de deasupra.

Operații fundamentale:
- `push(x)`: Adaugă elementul `x` în vârful stivei.
- `pop()`: Elimină elementul din vârful stivei.
- `top()`: Returnează valoarea din vârful stivei, fără a o elimina.
- `empty()`: Returnează `true` dacă stiva nu conține niciun element.

În C++, stiva standard este furnizată de biblioteca `<stack>` prin containerul `std::stack`.

## Complexitate
- **Timp:** Toate operațiile de bază (`push`, `pop`, `top`, `empty`) se execută în timp constant `O(1)`.
- **Spațiu:** `O(N)` pentru stocarea a `N` elemente în stivă.

## Variații și Cazuri Speciale
- **Stiva Monotonă:** O stivă ale cărei elemente sunt menținute tot timpul în ordine strict crescătoare sau descrescătoare. Când se adaugă un element nou, se elimină elementele din stivă care contrazic monotonia. Este o tehnică avansată extrem de utilă pentru găsirea "următorului element mai mare" (next greater element) sau în geometrie computațională.

## Aplicații
- Parcurgerea grafurilor în adâncime (DFS - Depth-First Search) folosește o stivă implicită (Call Stack) sau explicită.
- Evaluarea expresiilor matematice (conversia din forma Infixată în forma Postfixată/Poloneză).
- Verificarea corectitudinii parantezelor (ex: `{[()]}`).
- Mecanismele de tip Undo/Redo în software.

## Cod Sursă C++
```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

// Verifică dacă parantezele dintr-un șir sunt corect închise
bool parantezeCorecte(string sir) {
    stack<char> s;
    for (char c : sir) {
        if (c == '(' || c == '[' || c == '{') {
            s.push(c);
        } else {
            if (s.empty()) return false;
            char varf = s.top();
            if ((c == ')' && varf == '(') || 
                (c == ']' && varf == '[') || 
                (c == '}' && varf == '{')) {
                s.pop();
            } else {
                return false; // Potrivire greșită (ex: '(]' )
            }
        }
    }
    return s.empty(); // Dacă stiva e goală, toate s-au închis corect
}

int main() {
    string s = "{[()]}";
    bool ok = parantezeCorecte(s);
    return 0;
}
```

## Explicații Pas cu Pas
- **Linia 35**: Declarăm funcția care primește un șir de paranteze și returnează dacă este valid.
- **Linia 36**: Inițializăm o stivă goală de caractere `s`.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă (LIFO)",
        "groups": [
          [
            { "val": "Gol", "hidden": true }
          ]
        ]
      }
    ]
    ```
- **Linia 39 (Adăugarea '{')**: Întâlnim `{`. Fiind deschisă, o adăugăm în stivă.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă (LIFO)",
        "groups": [
          [
            { "val": "{", "active": true }
          ]
        ]
      }
    ]
    ```
- **Linia 39 (Adăugarea '[')**: Întâlnim `[`. O adăugăm pe stivă peste `{`.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă (LIFO)",
        "groups": [
          [
            { "val": "[", "active": true }
          ],
          [
            { "val": "{" }
          ]
        ]
      }
    ]
    ```
- **Linia 39 (Adăugarea '(')**: Întâlnim `(`. O adăugăm în vârful stivei.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă (LIFO)",
        "groups": [
          [
            { "val": "(", "active": true }
          ],
          [
            { "val": "[" }
          ],
          [
            { "val": "{" }
          ]
        ]
      }
    ]
    ```
- **Linia 46 (Eliminarea '(')**: Întâlnim paranteza închisă `)`. Se potrivește cu vârful stivei `(`, deci o eliminăm folosind `pop()`.
  - **Vizualizare (blocksVisual)**:
    ```json
    [
      {
        "label": "Stivă (LIFO)",
        "groups": [
          [
            { "val": "[", "active": true }
          ],
          [
            { "val": "{" }
          ]
        ]
      }
    ]
    ```


## Probleme Recomandate
- **Easy**: [Paranteze (PbInfo #2533)](https://www.pbinfo.ro/probleme/2533) - Verificarea parantezelor corect închise.
- **Medium**: [Next Greater Element](https://leetcode.com/problems/next-greater-element-i/) - Găsirea următorului element mai mare folosind o stivă monotonă.
- **Hard**: [Cel mai mare dreptunghi în histogramă](https://leetcode.com/problems/largest-rectangle-in-histogram/) - Aplicație clasică avansată a stivelor monotone.
