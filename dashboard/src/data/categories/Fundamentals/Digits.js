export const data = {
  presentation: "### Prelucrarea Cifrelor\n\nPrelucrarea cifrelor unui număr întreg în baza $10$ este o abilitate fundamentală în programare. Aceasta se bazează pe două operații matematice elementare:\n\n1. **Determinarea ultimei cifre**: obținută prin operatorul modulo, adică $n \\pmod{10}$.\n2. **Eliminarea ultimei cifre**: obținută prin împărțirea întreagă la $10$, adică $n \\leftarrow \\lfloor n / 10 \\rfloor$.\n\nNumărul de cifre ale unui număr întreg pozitiv $n$ poate fi determinat prin împărțiri succesive sau direct prin formula: $d = \\lfloor \\log_{10}(n) \\rfloor + 1$.",
  complexity: "### Complexitate\n\n- **Timp:** $O(\\log_{10}(n))$ - deoarece numărul de iterații este direct proporțional cu numărul de cifre ale lui $n$.\n- **Spațiu:** $O(1)$ - memoria utilizată este constantă, folosind doar câteva variabile simple.",
  variations: "### Variații și Cazuri Particulare\n\n- **Cazul $n = 0$**: Majoritatea algoritmilor cu bucle `while (n > 0)` nu intră în buclă pentru $0$. Acest caz trebuie tratat separat dacă se cere prelucrarea cifrelor sale.\n- **Numere negative**: Trebuie aplicată funcția valoare absolută ($|n|$) înainte de extragerea cifrelor, deoarece în C++ operatorul `%` pe numere negative returnează valori negative sau dependente de compilator.\n- **Palindrom**: Verificarea dacă un număr este egal cu răsturnatul său.",
  applications: "### Aplicații Reale\n\n- Algoritmi de criptografie (cum ar fi RSA) care operează pe cifrele/blocurile de cifre ale unor numere mari.\n- Validarea sumelor de control (algoritmul Luhn pentru carduri de credit).\n- Conversii rapide de tipuri de date în interfețe grafice.",
  code: `#include <iostream>

using namespace std;

int main() {
    int n = 358;
    int sum = 0;
    int reversed = 0;
    int temp = n;
    
    while (temp > 0) {
        int digit = temp % 10;
        sum += digit;
        reversed = reversed * 10 + digit;
        temp /= 10;
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 6,
      text: "Inițializăm numărul $n$ cu valoarea $358$ pe care îl vom procesa.",
      blocksVisual: [
        {
          label: "Variabile",
          groups: [
            [{ val: "n = 358", active: true }]
          ]
        }
      ]
    },
    {
      line: 7,
      text: "Inițializăm variabila $sum$ cu $0$. Aceasta va acumula suma cifrelor.",
      blocksVisual: [
        {
          label: "Stare",
          groups: [
            [{ val: "n = 358" }],
            [{ val: "sum = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Inițializăm $reversed$ cu $0$. Aici vom construi inversul (răsturnatul) numărului.",
      blocksVisual: [
        {
          label: "Stare",
          groups: [
            [{ val: "sum = 0" }],
            [{ val: "reversed = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Copiem valoarea lui $n$ în $temp$ pentru a nu distruge valoarea inițială în timpul procesării.",
      blocksVisual: [
        {
          label: "Stare",
          groups: [
            [{ val: "temp = 358", active: true }],
            [{ val: "sum = 0" }],
            [{ val: "reversed = 0" }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Verificăm dacă mai avem cifre de procesat ($temp > 0$). Deoarece $358 > 0$, intrăm în buclă.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "temp = 358 > 0 ?", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Extragem ultima cifră a lui $temp$: $358 \\pmod{10} = 8$.",
      blocksVisual: [
        {
          label: "Cifră extrasă",
          groups: [
            [{ val: "digit = 8", active: true }],
            [{ val: "temp = 358" }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Adăugăm cifra $8$ la suma cifrelor: $sum = 0 + 8 = 8$.",
      blocksVisual: [
        {
          label: "Suma actualizată",
          groups: [
            [{ val: "sum = 8", active: true }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Actualizăm răsturnatul: $reversed = 0 \\times 10 + 8 = 8$.",
      blocksVisual: [
        {
          label: "Răsturnat actualizat",
          groups: [
            [{ val: "reversed = 8", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Eliminăm ultima cifră a lui $temp$ prin împărțirea la $10$: $temp = 358 / 10 = 35$.",
      blocksVisual: [
        {
          label: "Valoare rămasă",
          groups: [
            [{ val: "temp = 35", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Verificăm condiția: $temp = 35 > 0$, care este adevărată, deci continuăm.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "temp = 35 > 0 ?", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Extragem ultima cifră a lui $temp$: $35 \\pmod{10} = 5$.",
      blocksVisual: [
        {
          label: "Cifră extrasă",
          groups: [
            [{ val: "digit = 5", active: true }],
            [{ val: "temp = 35" }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Adăugăm cifra $5$ la sumă: $sum = 8 + 5 = 13$.",
      blocksVisual: [
        {
          label: "Suma actualizată",
          groups: [
            [{ val: "sum = 13", active: true }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Actualizăm răsturnatul: $reversed = 8 \\times 10 + 5 = 85$.",
      blocksVisual: [
        {
          label: "Răsturnat actualizat",
          groups: [
            [{ val: "reversed = 85", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Eliminăm ultima cifră a lui $temp$: $temp = 35 / 10 = 3$.",
      blocksVisual: [
        {
          label: "Valoare rămasă",
          groups: [
            [{ val: "temp = 3", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Verificăm condiția: $temp = 3 > 0$, care este adevărată.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "temp = 3 > 0 ?", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Extragem ultima cifră a lui $temp$: $3 \\pmod{10} = 3$.",
      blocksVisual: [
        {
          label: "Cifră extrasă",
          groups: [
            [{ val: "digit = 3", active: true }],
            [{ val: "temp = 3" }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Adăugăm cifra $3$ la sumă: $sum = 13 + 3 = 16$.",
      blocksVisual: [
        {
          label: "Suma actualizată",
          groups: [
            [{ val: "sum = 16", active: true }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Actualizăm răsturnatul: $reversed = 85 \\times 10 + 3 = 853$.",
      blocksVisual: [
        {
          label: "Răsturnat actualizat",
          groups: [
            [{ val: "reversed = 853", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Eliminăm ultima cifră a lui $temp$: $temp = 3 / 10 = 0$.",
      blocksVisual: [
        {
          label: "Valoare rămasă",
          groups: [
            [{ val: "temp = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Verificăm condiția: $temp = 0 > 0$ este falsă. Ieșim din buclă.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "temp = 0 > 0 ? Fals", active: true }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Suma cifrelor",
        url: "https://www.pbinfo.ro/probleme/2269/suma-cifrelor",
        desc: "Calculează suma cifrelor unui număr întreg dat."
      }
    ],
    medium: [
      {
        title: "Palindrom",
        url: "https://www.pbinfo.ro/probleme/89/palindrom",
        desc: "Verifică dacă un număr dat este palindrom (egal cu inversul său)."
      }
    ],
    hard: [
      {
        title: "Cifre Comune",
        url: "https://www.pbinfo.ro/probleme/1931/cifre-comune",
        desc: "Determină cifrele comune ale unor numere date folosind vectori de frecvență."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 6 });

      if (stepIndex >= 0) {
        vars.push({ name: 'n', type: 'int', val: 358, expandable: false });
      }

      let sumVal = 0;
      if (stepIndex >= 1 && stepIndex <= 5) sumVal = 0;
      else if (stepIndex >= 6 && stepIndex <= 10) sumVal = 8;
      else if (stepIndex >= 11 && stepIndex <= 15) sumVal = 13;
      else if (stepIndex >= 16) sumVal = 16;
      if (stepIndex >= 1) {
        vars.push({ name: 'sum', type: 'int', val: sumVal, expandable: false });
      }

      let revVal = 0;
      if (stepIndex >= 2 && stepIndex <= 6) revVal = 0;
      else if (stepIndex >= 7 && stepIndex <= 11) revVal = 8;
      else if (stepIndex >= 12 && stepIndex <= 16) revVal = 85;
      else if (stepIndex >= 17) revVal = 853;
      if (stepIndex >= 2) {
        vars.push({ name: 'reversed', type: 'int', val: revVal, expandable: false });
      }

      let tempVal = 358;
      if (stepIndex >= 3 && stepIndex <= 7) tempVal = 358;
      else if (stepIndex >= 8 && stepIndex <= 12) tempVal = 35;
      else if (stepIndex >= 13 && stepIndex <= 17) tempVal = 3;
      else if (stepIndex >= 18) tempVal = 0;
      if (stepIndex >= 3) {
        vars.push({ name: 'temp', type: 'int', val: tempVal, expandable: false });
      }

      let digitVal = null;
      if (stepIndex >= 5 && stepIndex <= 7) digitVal = 8;
      else if (stepIndex >= 10 && stepIndex <= 12) digitVal = 5;
      else if (stepIndex >= 15 && stepIndex <= 17) digitVal = 3;
      if (digitVal !== null) {
        vars.push({ name: 'digit', type: 'int', val: digitVal, expandable: false });
      }

      if (activeLine === 6) inlineVal = "n: 358";
      else if (activeLine === 7) inlineVal = `sum: ${sumVal}`;
      else if (activeLine === 8) inlineVal = `reversed: ${revVal}`;
      else if (activeLine === 9) inlineVal = `temp: ${tempVal}`;
      else if (activeLine === 11) inlineVal = `temp: ${tempVal}`;
      else if (activeLine === 12 && digitVal !== null) inlineVal = `digit: ${digitVal}`;
      else if (activeLine === 13 && digitVal !== null) inlineVal = `digit: ${digitVal}, sum: ${sumVal}`;
      else if (activeLine === 14 && digitVal !== null) inlineVal = `digit: ${digitVal}, reversed: ${revVal}`;
      else if (activeLine === 15) inlineVal = `temp: ${tempVal}`;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 6 && stepIndex >= 0) return 'n: 358';
      
      let sumVal = 0;
      if (stepIndex >= 6 && stepIndex <= 10) sumVal = 8;
      else if (stepIndex >= 11 && stepIndex <= 15) sumVal = 13;
      else if (stepIndex >= 16) sumVal = 16;

      let revVal = 0;
      if (stepIndex >= 7 && stepIndex <= 11) revVal = 8;
      else if (stepIndex >= 12 && stepIndex <= 16) revVal = 85;
      else if (stepIndex >= 17) revVal = 853;

      let tempVal = 358;
      if (stepIndex >= 8 && stepIndex <= 12) tempVal = 35;
      else if (stepIndex >= 13 && stepIndex <= 17) tempVal = 3;
      else if (stepIndex >= 18) tempVal = 0;

      let digitVal = null;
      if (stepIndex >= 5 && stepIndex <= 7) digitVal = 8;
      else if (stepIndex >= 10 && stepIndex <= 12) digitVal = 5;
      else if (stepIndex >= 15 && stepIndex <= 17) digitVal = 3;

      if (lineNum === 7 && stepIndex >= 1) return `sum: ${sumVal}`;
      if (lineNum === 8 && stepIndex >= 2) return `reversed: ${revVal}`;
      if (lineNum === 9 && stepIndex >= 3) return `temp: ${tempVal}`;
      if (lineNum === 11 && stepIndex >= 4) return `temp: ${tempVal}`;
      if (lineNum === 12 && digitVal !== null) return `digit: ${digitVal}`;
      if (lineNum === 13 && digitVal !== null) return `digit: ${digitVal}, sum: ${sumVal}`;
      if (lineNum === 14 && digitVal !== null) return `digit: ${digitVal}, reversed: ${revVal}`;
      if (lineNum === 15 && stepIndex >= 8) return `temp: ${tempVal}`;
      return null;
    }
  }
};
