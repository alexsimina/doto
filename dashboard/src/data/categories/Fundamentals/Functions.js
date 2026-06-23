export const data = {
  presentation: "### Funcții și Transmiterea Parametrilor\n\nFuncțiile sunt blocuri de cod reutilizabile concepute pentru a îndeplini o singură sarcină specifică. Modularizarea programelor prin funcții face codul mai ușor de citit și depanat.\n\nÎn C++, transmiterea parametrilor către funcții se poate face în două moduri principale:\n\n1. **Transmitere prin valoare (Call by Value)**: Se creează o copie a variabilei transmise. Modificările din interiorul funcției afectează doar copia locală.\n2. **Transmitere prin referință (Call by Reference)**: Se transmite o referință (folosind operatorul `&`) către variabila originală. Orice modificare adusă parametrului în funcție afectează direct variabila din apelant.\n\nPentru structurile mari de date (cum ar fi `std::vector` sau `std::string`), transmiterea prin valoare generează o copiere costisitoare de timp $O(N)$. Din acest motiv, se recomandă transmiterea prin referință constantă: `const vector<int> &v`.",
  complexity: "### Complexitate\n\n- **Timp:** \n  - Transmitere prin valoare pentru tipuri simple (int, char): $O(1)$.\n  - Transmitere prin valoare pentru un vector de dimensiune $N$: $O(N)$ (datorită copierii).\n  - Transmitere prin referință (chiar și pentru vectori mari): $O(1)$ (se transmite doar adresa de memorie).\n- **Spațiu:** $O(1)$ spațiu suplimentar (se folosește stiva pentru a reține adresa de retur și variabilele locale).",
  variations: "### Variații și Cazuri Particulare\n\n- **Referințe constante (`const Type &`)**: Permite transmiterea rapidă fără copiere (ca o referință normală), dar previne modificarea accidentală a datelor în interiorul funcției.\n- **Transmitere prin pointeri**: Metodă moștenită din limbajul C (`void increment(int* p)`), unde se folosește adresa explicită a variabilei și operatorul de dereferențiere `*`.",
  applications: "### Aplicații Reale\n\n- Modularizarea corectă a oricărui software complex.\n- Algoritmi recursivi (cum ar fi sortările rapide sau parcurgerile de grafuri DFS/BFS) unde funcțiile se autoapelează pe subprobleme.\n- Transmiterea eficientă a containerelor STL voluminoase în bibliotecile software.",
  code: `#include <iostream>

using namespace std;

// Transmitere prin valoare
void incrementByValue(int x) {
    x++;
}

// Transmitere prin referinta
void incrementByReference(int &x) {
    x++;
}

int main() {
    int a = 5;
    int b = 5;
    
    incrementByValue(a);
    incrementByReference(b);
    
    return 0;
}
`,
  explanations: [
    {
      line: 16,
      text: "Inițializăm variabila $a$ cu valoarea $5$. Aceasta va fi transmisă prin valoare.",
      blocksVisual: [
        {
          label: "Funcția main",
          groups: [
            [{ val: "a = 5", active: true }, { val: "b = ?" }]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Inițializăm variabila $b$ cu valoarea $5$. Aceasta va fi transmisă prin referință.",
      blocksVisual: [
        {
          label: "Funcția main",
          groups: [
            [{ val: "a = 5" }, { val: "b = 5", active: true }]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Apelăm funcția `incrementByValue(a)`. Se creează o copie a valorii lui $a$ pe stivă.",
      blocksVisual: [
        {
          label: "Apel incrementByValue",
          groups: [
            [{ val: "a = 5 (în main)" }],
            [{ val: "Parametru x = 5 (copie pe stivă)", active: true }]
          ]
        }
      ]
    },
    {
      line: 6,
      text: "Suntem în corpul funcției `incrementByValue`. Parametrul $x$ are valoarea copiată $5$.",
      blocksVisual: [
        {
          label: "În incrementByValue",
          groups: [
            [{ val: "x = 5", active: true }]
          ]
        }
      ]
    },
    {
      line: 7,
      text: "Incrementăm variabila locală $x$. Aceasta devine $6$.",
      blocksVisual: [
        {
          label: "În incrementByValue",
          groups: [
            [{ val: "x = 6", active: true }]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Funcția se încheie și copia locală $x$ este ștearsă din memorie. Revenim în main.",
      blocksVisual: [
        {
          label: "Revenire în main",
          groups: [
            [{ val: "a = 5", active: true }],
            [{ val: "b = 5" }]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Apelăm `incrementByReference(b)`. Nu se face o copie; funcția va opera direct pe variabila $b$.",
      blocksVisual: [
        {
          label: "Apel incrementByReference",
          groups: [
            [{ val: "b = 5 (în main)" }],
            [{ val: "Referința x pointează către b", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Suntem în `incrementByReference`. Parametrul $x$ este o poreclă (alias) pentru variabila $b$ din main.",
      blocksVisual: [
        {
          label: "În incrementByReference",
          groups: [
            [{ val: "x (alias pentru b) = 5", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Incrementăm valoarea de la referința $x$. Deoarece $x$ este legat direct de $b$, valoarea lui $b$ din main devine $6$.",
      blocksVisual: [
        {
          label: "În incrementByReference",
          groups: [
            [{ val: "x (alias pentru b) = 6", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Funcția se încheie. Revenim în main.",
      blocksVisual: [
        {
          label: "Revenire în main",
          groups: [
            [{ val: "a = 5" }],
            [{ val: "b = 6", active: true }]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Finalizăm programul. Se observă că $a$ a rămas $5$, în timp ce $b$ a devenit $6$.",
      blocksVisual: [
        {
          label: "Stare Finală",
          groups: [
            [{ val: "a = 5" }],
            [{ val: "b = 6" }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Funcție de Max",
        url: "https://www.pbinfo.ro/probleme/23/max2",
        desc: "Definește o funcție simplă care returnează maximul dintre două numere."
      }
    ],
    medium: [
      {
        title: "Permutarea a două valori (Swap)",
        url: "https://www.pbinfo.ro/probleme/896/swap",
        desc: "Implementează o funcție care interschimbă valorile a două variabile folosind referințe."
      }
    ],
    hard: [
      {
        title: "Funcții recursive pe tablouri",
        url: "https://www.pbinfo.ro/probleme/823/sumrec",
        desc: "Implementează o funcție recursivă pentru a calcula suma elementelor unui vector."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const currentLine = activeLine || 16;

      // Determine frame stack and vars based on the active line / stepIndex
      if (currentLine === 6 || currentLine === 7 || currentLine === 8) {
        // inside incrementByValue
        frames.push({ name: 'incrementByValue(int)', file: 'main.cpp', line: currentLine });
        frames.push({ name: 'main()', file: 'main.cpp', line: 19 });
        let xVal = 5;
        if (stepIndex >= 4) xVal = 6;
        vars.push({ name: 'x', type: 'int', val: xVal, expandable: false });
        inlineVal = `x: ${xVal}`;
      } else if (currentLine === 11 || currentLine === 12 || currentLine === 13) {
        // inside incrementByReference
        frames.push({ name: 'incrementByReference(int&)', file: 'main.cpp', line: currentLine });
        frames.push({ name: 'main()', file: 'main.cpp', line: 20 });
        let xVal = 5;
        if (stepIndex >= 8) xVal = 6;
        vars.push({ name: 'x', type: 'int&', val: `&b (value: ${xVal})`, expandable: false });
        inlineVal = `x: ${xVal}`;
      } else {
        // inside main
        frames.push({ name: 'main()', file: 'main.cpp', line: currentLine });
        if (stepIndex >= 0) {
          vars.push({ name: 'a', type: 'int', val: 5, expandable: false });
        }
        if (stepIndex >= 1) {
          let bVal = 5;
          if (stepIndex >= 8) bVal = 6;
          vars.push({ name: 'b', type: 'int', val: bVal, expandable: false });
        }
        if (currentLine === 16) inlineVal = "a: 5";
        else if (currentLine === 17) inlineVal = "b: 5";
        else if (currentLine === 19) inlineVal = "a: 5, b: 5";
        else if (currentLine === 20) inlineVal = `a: 5, b: ${stepIndex >= 8 ? 6 : 5}`;
        else if (currentLine === 22) inlineVal = "a: 5, b: 6";
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let bVal = 5;
      if (stepIndex >= 8) bVal = 6;

      if (lineNum === 16 && stepIndex >= 0) return 'a: 5';
      if (lineNum === 17 && stepIndex >= 1) return 'b: 5';
      if (lineNum === 19 && stepIndex >= 2) return `a: 5, b: ${bVal}`;
      if (lineNum === 20 && stepIndex >= 6) return `a: 5, b: ${bVal}`;
      if (lineNum === 22 && stepIndex >= 10) return 'a: 5, b: 6';

      if (lineNum === 6) return `x: ${stepIndex >= 4 ? 6 : 5}`;
      if (lineNum === 7) return `x: ${stepIndex >= 4 ? 6 : 5}`;
      if (lineNum === 8) return `x: 6`;

      if (lineNum === 11) return `x: &b (value: ${stepIndex >= 8 ? 6 : 5})`;
      if (lineNum === 12) return `x: &b (value: ${stepIndex >= 8 ? 6 : 5})`;
      if (lineNum === 13) return `x: &b (value: 6)`;

      return null;
    }
  }
};
