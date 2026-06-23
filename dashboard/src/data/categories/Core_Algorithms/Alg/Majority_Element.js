export const data = {
  presentation: "### Determinarea Elementului Majoritar\n\nUn element dintr-un vector de dimensiune $N$ se numește **element majoritar** dacă apare de cel puțin $\\lfloor N/2 \\rfloor + 1$ ori (strict mai mult de jumătate din dimensiunea vectorului).\n\nCea mai eficientă metodă de determinare este **Algoritmul de Vot Boyer-Moore** (*Boyer-Moore Majority Vote Algorithm*). Acesta identifică un candidat pentru elementul majoritar într-o singură parcurgere, folosind timp $O(N)$ și spațiu $O(1)$. \n\nPrincipiul algoritmului se bazează pe anularea reciprocă a elementelor diferite: dacă asociem fiecărui element egal cu candidatul un vot $+1$ și fiecărui element diferit un vot $-1$, suma voturilor pentru elementul majoritar va rămâne strict pozitivă la final.",
  complexity: "### Complexitate\n\n- **Timp:** $O(N)$ - se realizează maximum două parcurgeri liniare ale vectorului (una pentru determinarea candidatului și una opțională pentru validarea acestuia).\n- **Spațiu:** $O(1)$ - algoritmul folosește doar două variabile auxiliare (`candidate` și `count`).",
  variations: "### Variații și Cazuri Particulare\n\n- **Inexistența elementului majoritar**: Algoritmul Boyer-Moore găsește întotdeauna un candidat, chiar dacă în vector nu există un element majoritar (de exemplu în vectorul $\\{1, 2, 3\\}$). Din acest motiv, **validarea** candidatului printr-o a doua parcurgere este obligatorie.\n- **Generalizarea pentru $\\lfloor N/k \\rfloor$**: Găsirea tuturor elementelor care apar de mai mult de $\\lfloor N/k \\rfloor$ ori. Necesită menținerea a maximum $k-1$ candidați și a contoarelor asociate (de exemplu, algoritmul pentru $N/3$ majoritate).",
  applications: "### Aplicații Reale\n\n- Sisteme tolerante la erori (Fault-tolerant systems) unde se decide rezultatul corect prin votul majorității nodurilor.\n- Detectarea atacurilor cibernetice sau a anomaliilor de rețea prin identificarea tiparelor repetitive dominante în loguri.\n- Sisteme de procesare a fluxurilor de date mari (data streams) unde memoria este extrem de limitată.",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> arr = {2, 2, 1, 1, 2};
    int candidate = -1;
    int count = 0;
    
    for (int x : arr) {
        if (count == 0) {
            candidate = x;
            count = 1;
        } else if (x == candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    int actual_count = 0;
    for (int x : arr) {
        if (x == candidate) {
            actual_count++;
        }
    }
    
    bool is_majority = (actual_count > arr.size() / 2);
    return 0;
}
`,
  explanations: [
    {
      line: 7,
      text: "Definim vectorul $arr = \\{2, 2, 1, 1, 2\\}$ în care căutăm elementul majoritar.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = -", active: false }, { val: "count = 0", active: false }]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Inițializăm candidatul cu o valoare fictivă ($-1$).",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = -1", active: true }, { val: "count = 0", active: false }]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Inițializăm contorul de voturi cu $0$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = -1", active: false }, { val: "count = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Începem parcurgerea vectorului. Primul element procesat este $x = 2$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: true }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = -1", active: false }, { val: "count = 0", active: false }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Deoarece contorul de voturi este $0$, desemnăm elementul curent ca nou candidat.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: true }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = -1", active: false }, { val: "count = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Setăm `candidate = 2`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: true }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: true }, { val: "count = 0", active: false }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Setăm contorul de voturi la $1$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: true }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Trecem la următorul element din vector: $x = 2$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2", active: true }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 1", active: false }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm dacă `count == 0`. Este fals (avem $1$ vot).",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2", active: true }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Verificăm dacă elementul curent este egal cu candidatul ($2 == 2$). Este adevărat.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2", active: true }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: true }, { val: "count = 1", active: false }]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Incrementăm contorul de voturi: `count = 2`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2", active: true }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 2", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Trecem la al treilea element din vector: $x = 1$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1", active: true }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 2", active: false }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Deoarece contorul nu este zero și $x$ ($1$) este diferit de candidat ($2$), ajungem pe ramura `else`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1", active: true }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: true }, { val: "count = 2", active: false }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Decrementăm contorul de voturi, anulând un vot pentru candidatul curent: `count = 1`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1", active: true }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Trecem la al patrulea element din vector: $x = 1$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1", active: true }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 1", active: false }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condițiile. `count` este $1$, iar $x = 1 \\neq candidate = 2$. Ajungem din nou pe ramura `else`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1", active: true }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: true }, { val: "count = 1", active: false }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Decrementăm contorul de voturi: `count = 0`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1", active: true }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Trecem la ultimul element din vector: $x = 2$.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2", active: true }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 0", active: false }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Deoarece contorul de voturi a ajuns la $0$, resetăm candidatul.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2", active: true }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Setăm noul `candidate = 2`.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2", active: true }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: true }, { val: "count = 0", active: false }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Setăm `count = 1`. Am terminat prima parcurgere.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2", active: true }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "count = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Inițializăm `actual_count = 0` pentru a verifica validitatea candidatului.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: false }, { val: "2" }, { val: "1" }, { val: "1" }, { val: "2" }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "actual_count = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Începem a doua parcurgere pentru a număra de câte ori apare candidatul ($2$) în vector. După parcurgerea completă a vectorului, vom găsi că valoarea $2$ apare de $3$ ori.",
      blocksVisual: [
        {
          label: "Vector (arr)",
          groups: [
            [{ val: "2", active: true }, { val: "2", active: true }, { val: "1" }, { val: "1" }, { val: "2", active: true }]
          ]
        },
        {
          label: "Parametri Boyer-Moore",
          groups: [
            [{ val: "candidate = 2", active: false }, { val: "actual_count = 3", active: true }]
          ]
        }
      ]
    },
    {
      line: 29,
      text: "Verificăm dacă numărul de apariții ($3$) este strict mai mare decât jumătate din lungimea vectorului ($5 / 2 = 2$). Deoarece $3 > 2$, candidatul este un element majoritar valid.",
      blocksVisual: [
        {
          label: "Decizie Finală",
          groups: [
            [{ val: "is_majority = true", active: true }]
          ]
        }
      ]
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: "main()", file: "main.cpp", line: activeLine });

      vars.push({ name: "arr", type: "std::vector<int>", val: "size = 5", expandable: true });
      if (stepIndex >= 1) {
        let candVal = -1;
        if (stepIndex >= 5 && stepIndex <= 18) candVal = 2;
        if (stepIndex >= 19) candVal = 2;
        vars.push({ name: "candidate", type: "int", val: candVal.toString(), expandable: false });
      }
      if (stepIndex >= 2) {
        let countVal = 0;
        if (stepIndex === 6 || stepIndex === 7 || stepIndex === 8 || stepIndex === 9 || stepIndex === 13 || stepIndex === 14 || stepIndex === 15 || stepIndex === 20) countVal = 1;
        if (stepIndex === 10 || stepIndex === 11 || stepIndex === 12) countVal = 2;
        if (stepIndex >= 21) countVal = 1;
        vars.push({ name: "count", type: "int", val: countVal.toString(), expandable: false });
      }

      const loopIndices = {
        3: 2, 4: 2, 5: 2, 6: 2,
        7: 2, 8: 2, 9: 2, 10: 2,
        11: 1, 12: 1, 13: 1,
        14: 1, 15: 1, 16: 1,
        17: 2, 18: 2, 19: 2, 20: 2
      };
      if (stepIndex in loopIndices) {
        vars.push({ name: "x", type: "int", val: loopIndices[stepIndex].toString(), expandable: false });
        inlineVal = `x: ${loopIndices[stepIndex]}`;
      }

      if (stepIndex >= 21) {
        let actCount = 0;
        if (stepIndex >= 22) actCount = 3;
        vars.push({ name: "actual_count", type: "int", val: actCount.toString(), expandable: false });
        if (stepIndex === 23) {
          vars.push({ name: "is_majority", type: "bool", val: "true", expandable: false });
        }
        inlineVal = `actual_count: ${actCount}`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 12) return "arr.size(): 5";
      const loopIndices = {
        3: 2, 4: 2, 5: 2, 6: 2,
        7: 2, 8: 2, 9: 2, 10: 2,
        11: 1, 12: 1, 13: 1,
        14: 1, 15: 1, 16: 1,
        17: 2, 18: 2, 19: 2, 20: 2
      };
      if (stepIndex in loopIndices) {
        if (lineNum === 16 || lineNum === 17 || lineNum === 20) {
          return `x: ${loopIndices[stepIndex]}`;
        }
      }
      if (stepIndex >= 21) {
        if (lineNum === 28 || lineNum === 29 || lineNum === 30) {
          let actCount = (stepIndex >= 22) ? 3 : 0;
          return `actual_count: ${actCount}`;
        }
      }
      return null;
    }
  },
  problems: {
    easy: [
      {
        title: "Majority Element I",
        url: "https://leetcode.com/problems/majority-element/",
        desc: "Determină elementul majoritar dintr-un vector în timp liniar și spațiu constant."
      }
    ],
    medium: [
      {
        title: "Element Majoritar",
        url: "https://www.pbinfo.ro/probleme/1261/element-majoritar",
        desc: "Determină elementul majoritar dintr-un vector dat, sau afișează un mesaj corespunzător dacă acesta nu există."
      }
    ],
    hard: [
      {
        title: "Majority Element II",
        url: "https://leetcode.com/problems/majority-element-ii/",
        desc: "Găsește toate elementele care apar de mai mult de ⌊N/3⌋ ori într-un vector."
      }
    ]
  }
};
