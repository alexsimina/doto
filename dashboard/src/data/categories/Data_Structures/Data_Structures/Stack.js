export const data = {
  "presentation": "### Prezentare Generală\n\nStiva (Stack) este o structură de date liniară care funcționează după principiul **LIFO** (Last In, First Out - Ultimul venit, primul plecat). Singurul element accesibil direct este cel din vârf (cel mai recent adăugat).\n\nPutem vizualiza stiva ca pe un teanc de farfurii: poți adăuga o farfurie nouă doar în vârf (push) și o poți îndepărta doar pe cea de deasupra (pop). Această structură este extrem de utilă pentru gestionarea apelurilor de funcții (Call Stack), parantezarea expresiilor sau menținerea unui istoric de operații pentru acțiuni de tip Undo.",
  "complexity": "### Complexitate\n\n- **Timp:** Operațiile de bază (`push`, `pop`, `top`, `empty`, `size`) sunt extrem de eficiente, rulând în timp constant **O(1)**.\n- **Spațiu:** **O(N)**, unde N este numărul total de elemente stocate în stivă.\n",
  "variations": "### Variații și Edge Cases\n\n1. **Stiva Monotonă:** O stivă ale cărei elemente sunt menținute într-o ordine strict monotonă (crescătoare sau descrescătoare). Când se adaugă un element nou, se elimină din vârf toate elementele care încalcă ordinea. Este o tehnică extrem de folosită pentru a găsi 'următorul element mai mare' în timp liniar O(N).\n2. **Stiva cu dimensiune limitată:** Implementată pe un tablou static unde se aruncă o excepție (Stack Overflow) dacă se depășește capacitatea maximă.",
  "applications": "### Aplicații\n\n- Verificarea expresiilor matematice parantezate corect.\n- Evaluarea expresiilor în formă postfixată (Reverse Polish Notation).\n- Parcurgerea grafurilor în adâncime (DFS - Depth First Search).\n- Funcționalitatea de Undo/Redo în editoarele de text.",
  code: `
#include <iostream>
#include <stack>
#include <string>

using namespace std;

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
                return false; 
            }
        }
    }
    return s.empty();
}

int main() {
    string s = "{[()]}()[{}]";
    bool ok = parantezeCorecte(s);
    return 0;
}
`,
  "explanations": [
    {
      "line": 8,
      "text": "Funcția primește șirul s = \"{[()]}()[{}]\" și inițializează o stivă goală de caractere.",
      "blocksVisual": [
        {
          "label": "Stivă Goadă",
          "groups": [
            [{ "val": "Vârf", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 1: c = '{'. Fiind paranteză deschisă, o punem pe stivă.",
      "blocksVisual": [
        {
          "label": "Push '{'",
          "groups": [
            [{ "val": "{", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 2: c = '['. O punem pe stivă în vârful elementului '{'.",
      "blocksVisual": [
        {
          "label": "Push '['",
          "groups": [
            [{ "val": "[", "active": true }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 3: c = '('. O adăugăm pe stivă peste '['.",
      "blocksVisual": [
        {
          "label": "Push '('",
          "groups": [
            [{ "val": "(", "active": true }],
            [{ "val": "[" }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 4: c = ')'. Fiind închisă, verificăm dacă stiva e goală (nu este) și citim vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [{ "val": "(", "active": true }],
            [{ "val": "[" }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Vârful stivei este '('. Se potrivește cu c = ')', deci le împerechem cu succes.",
      "blocksVisual": [
        {
          "label": "Potrivire ')' și '('",
          "groups": [
            [{ "val": "Match: ()", "sorted": true }],
            [{ "val": "[" }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm '(' din stivă prin pop(). Noul vârf devine '['.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [{ "val": "[", "active": true }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 5: c = ']'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [{ "val": "[", "active": true }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Vârful stivei este '['. Se potrivește cu c = ']', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire ']' și '['",
          "groups": [
            [{ "val": "Match: []", "sorted": true }],
            [{ "val": "{" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm '[' din stivă. Noul vârf devine '{'.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [{ "val": "{", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 6: c = '}'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [{ "val": "{", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Vârful stivei este '{'. Se potrivește cu c = '}', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire '}' și '{'",
          "groups": [
            [{ "val": "Match: {}", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm '{'. Stiva devine goală.",
      "blocksVisual": [
        {
          "label": "Pop - Stivă Goală",
          "groups": [
            [{ "val": "Vârf", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 7: c = '('. Este deschisă, deci o adăugăm pe stivă.",
      "blocksVisual": [
        {
          "label": "Push '('",
          "groups": [
            [{ "val": "(", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 8: c = ')'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [{ "val": "(", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Vârful stivei este '('. Se potrivește cu c = ')', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire ')' și '('",
          "groups": [
            [{ "val": "Match: ()", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm '('. Stiva devine goală din nou.",
      "blocksVisual": [
        {
          "label": "Pop - Stivă Goală",
          "groups": [
            [{ "val": "Vârf", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 9: c = '['. Este deschisă, o punem pe stivă.",
      "blocksVisual": [
        {
          "label": "Push '['",
          "groups": [
            [{ "val": "[", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Pasul 10: c = '{'. O punem pe stivă peste '['.",
      "blocksVisual": [
        {
          "label": "Push '{'",
          "groups": [
            [{ "val": "{", "active": true }],
            [{ "val": "[" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 11: c = '}'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [{ "val": "{", "active": true }],
            [{ "val": "[" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Vârful stivei este '{'. Se potrivește cu c = '}', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire '}' și '{'",
          "groups": [
            [{ "val": "Match: {}", "sorted": true }],
            [{ "val": "[" }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm '{'. Noul vârf este '['.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [{ "val": "[", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 12: c = ']'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [{ "val": "[", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Vârful stivei este '['. Se potrivește cu c = ']', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire ']' și '['",
          "groups": [
            [{ "val": "Match: []", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Eliminăm '['. Stiva este goală și am terminat de parcurs șirul.",
      "blocksVisual": [
        {
          "label": "Pop - Stivă Goală",
          "groups": [
            [{ "val": "Vârf", "hidden": true }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Parcurgerea s-a finalizat fără erori. Returnăm s.empty(). Deoarece stiva este goală, expresia este corect parantezată. Rezultatul este Adevărat (true).",
      "blocksVisual": [
        {
          "label": "Rezultat Final",
          "groups": [
            [{ "val": "Valid!", "sorted": true }]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Paranteze (PbInfo #2533)",
        "url": "https://www.pbinfo.ro/probleme/2533",
        "desc": "Verificarea parantezelor corect închise."
      }
    ],
    "medium": [
      {
        "title": "Next Greater Element",
        "url": "https://leetcode.com/problems/next-greater-element-i/",
        "desc": "Găsirea următorului element mai mare folosind o stivă monotonă."
      }
    ],
    "hard": [
      {
        "title": "Largest Rectangle in Histogram",
        "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        "desc": "Determinarea ariei maxime a unui dreptunghi într-o histogramă folosind stivă monotonă."
      }
    ]
  }
};
