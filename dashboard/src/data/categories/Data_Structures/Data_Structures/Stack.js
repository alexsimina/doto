export const data = {
  "presentation": "### Prezentare Generală\n\nStiva (**Stack**) este o structură de date liniară care respectă principiul **LIFO** (*Last In, First Out* - Ultimul intrat, primul ieșit). Singurul element accesibil în mod direct este cel situat în vârful stivei (cel mai recent adăugat).\n\nPutem vizualiza o stivă ca pe un teanc de farfurii: adăugarea unui element nou se poate face doar deasupra (operația `push`), iar eliminarea se poate face exclusiv pentru elementul din vârf (operația `pop`). Această structură este ideală pentru parantezarea expresiilor, recursivitate și menținerea unui istoric pentru operații reversibile (de tip Undo).",
  "complexity": "### Complexitate\n\n- **Timp:** Operațiile fundamentale (`push`, `pop`, `top`/`peek`, `empty`, `size`) sunt extrem de rapide, executându-se în timp constant $O(1)$.\n- **Spațiu:** $O(N)$, unde $N$ este numărul maxim de elemente stocate simultan în stivă.",
  "variations": "### Variații și Edge Cases\n\n1. **Stivă Monotonă:** O stivă în care elementele sunt păstrate într-o ordine strict crescătoare sau descrescătoare. La inserarea unui element nou, se elimină din vârf toate elementele care încalcă monotonia. Utilă pentru determinarea rapidă în $O(N)$ a următorului element mai mare/mic dintr-un șir.\n2. **Stack Overflow / Underflow:** Erori generate la depășirea capacității maxime a stivei (Overflow - de obicei în cazul recursivității infinite) sau la încercarea de a elimina dintr-o stivă goală (Underflow).",
  "applications": "### Aplicații\n\n- Verificarea expresiilor matematice parantezate corect.\n- Evaluarea expresiilor în formă postfixată (Reverse Polish Notation).\n- Parcurgerea grafurilor în adâncime (DFS - Depth First Search).\n- Funcționalitatea de Undo/Redo în editoarele de text.",
  "code": "\n#include <iostream>\n#include <stack>\n#include <string>\n\nusing namespace std;\n\nbool parantezeCorecte(string sir) {\n    stack<char> s;\n    for (char c : sir) {\n        if (c == '(' || c == '[' || c == '{') {\n            s.push(c);\n        } else {\n            if (s.empty()) return false;\n            char varf = s.top();\n            if ((c == ')' && varf == '(') || \n                (c == ']' && varf == '[') || \n                (c == '}' && varf == '{')) {\n                s.pop();\n            } else {\n                return false; \n            }\n        }\n    }\n    return s.empty();\n}\n\nint main() {\n    string s = \"{[()]}()[{}]\";\n    bool ok = parantezeCorecte(s);\n    return 0;\n}\n",
  "explanations": [
    {
      "line": 8,
      "text": "Funcția primește șirul s = \"{[()]}()[{}]\" și inițializează o stivă goală de caractere.",
      "blocksVisual": [
        {
          "label": "Stivă Goadă",
          "groups": [
            [
              {
                "val": "Vârf",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 1: c = '{'. Fiind paranteză deschisă, o punem pe stivă.",
      "blocksVisual": [
        {
          "label": "Push '{'",
          "groups": [
            [
              {
                "val": "{",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 2: c = '['. O punem pe stivă în vârful elementului '{'.",
      "blocksVisual": [
        {
          "label": "Push '['",
          "groups": [
            [
              {
                "val": "[",
                "active": true
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 3: c = '('. O adăugăm pe stivă peste '['.",
      "blocksVisual": [
        {
          "label": "Push '('",
          "groups": [
            [
              {
                "val": "(",
                "active": true
              }
            ],
            [
              {
                "val": "["
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 4: c = ')'. Fiind închisă, verificăm dacă stiva e goală (nu este) și citim vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [
              {
                "val": "(",
                "active": true
              }
            ],
            [
              {
                "val": "["
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Vârful stivei este '('. Se potrivește cu c = ')', deci le împerechem cu succes.",
      "blocksVisual": [
        {
          "label": "Potrivire ')' și '('",
          "groups": [
            [
              {
                "val": "Match: ()",
                "sorted": true
              }
            ],
            [
              {
                "val": "["
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm '(' din stivă prin pop(). Noul vârf devine '['.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "[",
                "active": true
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 5: c = ']'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [
              {
                "val": "[",
                "active": true
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Vârful stivei este '['. Se potrivește cu c = ']', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire ']' și '['",
          "groups": [
            [
              {
                "val": "Match: []",
                "sorted": true
              }
            ],
            [
              {
                "val": "{"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm '[' din stivă. Noul vârf devine '{'.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "{",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 6: c = '}'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [
              {
                "val": "{",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Vârful stivei este '{'. Se potrivește cu c = '}', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire '}' și '{'",
          "groups": [
            [
              {
                "val": "Match: {}",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm '{'. Stiva devine goală.",
      "blocksVisual": [
        {
          "label": "Pop - Stivă Goală",
          "groups": [
            [
              {
                "val": "Vârf",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 7: c = '('. Este deschisă, deci o adăugăm pe stivă.",
      "blocksVisual": [
        {
          "label": "Push '('",
          "groups": [
            [
              {
                "val": "(",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 8: c = ')'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [
              {
                "val": "(",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Vârful stivei este '('. Se potrivește cu c = ')', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire ')' și '('",
          "groups": [
            [
              {
                "val": "Match: ()",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm '('. Stiva devine goală din nou.",
      "blocksVisual": [
        {
          "label": "Pop - Stivă Goală",
          "groups": [
            [
              {
                "val": "Vârf",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 9: c = '['. Este deschisă, o punem pe stivă.",
      "blocksVisual": [
        {
          "label": "Push '['",
          "groups": [
            [
              {
                "val": "[",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 10: c = '{'. O punem pe stivă peste '['.",
      "blocksVisual": [
        {
          "label": "Push '{'",
          "groups": [
            [
              {
                "val": "{",
                "active": true
              }
            ],
            [
              {
                "val": "["
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 11: c = '}'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [
              {
                "val": "{",
                "active": true
              }
            ],
            [
              {
                "val": "["
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Vârful stivei este '{'. Se potrivește cu c = '}', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire '}' și '{'",
          "groups": [
            [
              {
                "val": "Match: {}",
                "sorted": true
              }
            ],
            [
              {
                "val": "["
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm '{'. Noul vârf este '['.",
      "blocksVisual": [
        {
          "label": "Pop",
          "groups": [
            [
              {
                "val": "[",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Pasul 12: c = ']'. Verificăm vârful stivei.",
      "blocksVisual": [
        {
          "label": "Citire Vârf",
          "groups": [
            [
              {
                "val": "[",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Vârful stivei este '['. Se potrivește cu c = ']', deci le împerechem.",
      "blocksVisual": [
        {
          "label": "Potrivire ']' și '['",
          "groups": [
            [
              {
                "val": "Match: []",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Eliminăm '['. Stiva este goală și am terminat de parcurs șirul.",
      "blocksVisual": [
        {
          "label": "Pop - Stivă Goală",
          "groups": [
            [
              {
                "val": "Vârf",
                "hidden": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 24,
      "text": "Parcurgerea s-a finalizat fără erori. Returnăm s.empty(). Deoarece stiva este goală, expresia este corect parantezată. Rezultatul este Adevărat (true).",
      "blocksVisual": [
        {
          "label": "Rezultat Final",
          "groups": [
            [
              {
                "val": "Valid!",
                "sorted": true
              }
            ]
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
  },
  globalVars: [
    { name: "sir", type: "std::string", val: "\"{[()]}()[{}]\"", expandable: false }
  ],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const trace = [
        { c: '', s: [] },
        { c: '{', s: ['{'] },
        { c: '[', s: ['{', '['] },
        { c: '(', s: ['{', '[', '('] },
        { c: ')', s: ['{', '[', '('], varf: '(' },
        { c: ')', s: ['{', '[', '('], varf: '(' },
        { c: ')', s: ['{', '['] },
        { c: ']', s: ['{', '['], varf: '[' },
        { c: ']', s: ['{', '['], varf: '[' },
        { c: ']', s: ['{'] },
        { c: '}', s: ['{'], varf: '{' },
        { c: '}', s: ['{'], varf: '{' },
        { c: '}', s: [] },
        { c: '(', s: ['('] },
        { c: ')', s: ['('], varf: '(' },
        { c: ')', s: ['('], varf: '(' },
        { c: ')', s: [] },
        { c: '[', s: ['['] },
        { c: '{', s: ['[', '{'] },
        { c: '}', s: ['[', '{'], varf: '{' },
        { c: '}', s: ['[', '{'], varf: '{' },
        { c: '}', s: ['['] },
        { c: ']', s: ['['], varf: '[' },
        { c: ']', s: ['['], varf: '[' },
        { c: ']', s: [] },
        { c: '', s: [] }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      if (curr.c) {
        vars.push({ name: "c", type: "char", val: "'" + curr.c + "'", expandable: false });
      }
      if (curr.varf) {
        vars.push({ name: "varf", type: "char", val: "'" + curr.varf + "'", expandable: false });
      }
      const stackVal = "size = " + curr.s.length + " {" + curr.s.join(", ") + "}";
      vars.push({ name: "s", type: "std::stack<char>", val: stackVal, expandable: curr.s.length > 0 });
      
      const globalVars = [
        { name: "sir", type: "std::string", val: "\"{[()]}()[{}]\"", expandable: false }
      ];
      const frames = [
        { name: "parantezeCorecte(sir = \"{[()]}()[{}]\")", file: "solution.cpp", line: activeLine }
      ];
      if (activeLine !== 29 && activeLine !== 30) {
        frames.push({ name: "main()", file: "main.cpp", line: 29 });
      }
      
      let inlineVal = "s: " + (curr.s.length > 0 ? "{" + curr.s.join(",") + "}" : "empty");
      if (curr.c) inlineVal += ", c: '" + curr.c + "'";
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const trace = [
        { c: '', s: [] },
        { c: '{', s: ['{'] },
        { c: '[', s: ['{', '['] },
        { c: '(', s: ['{', '[', '('] },
        { c: ')', s: ['{', '[', '('], varf: '(' },
        { c: ')', s: ['{', '[', '('], varf: '(' },
        { c: ')', s: ['{', '['] },
        { c: ']', s: ['{', '['], varf: '[' },
        { c: ']', s: ['{', '['], varf: '[' },
        { c: ']', s: ['{'] },
        { c: '}', s: ['{'], varf: '{' },
        { c: '}', s: ['{'], varf: '{' },
        { c: '}', s: [] },
        { c: '(', s: ['('] },
        { c: ')', s: ['('], varf: '(' },
        { c: ')', s: ['('], varf: '(' },
        { c: ')', s: [] },
        { c: '[', s: ['['] },
        { c: '{', s: ['[', '{'] },
        { c: '}', s: ['[', '{'], varf: '{' },
        { c: '}', s: ['[', '{'], varf: '{' },
        { c: '}', s: ['['] },
        { c: ']', s: ['['], varf: '[' },
        { c: ']', s: ['['], varf: '[' },
        { c: ']', s: [] },
        { c: '', s: [] }
      ];
      const curr = trace[stepIndex];
      if (!curr) return null;
      if (lineNum === 11 || lineNum === 14 || lineNum === 15 || lineNum === 18) {
        let val = "s: " + (curr.s.length > 0 ? "{" + curr.s.join(",") + "}" : "empty");
        if (curr.c) val += ", c: '" + curr.c + "'";
        return val;
      }
      return null;
    }
  }
};
