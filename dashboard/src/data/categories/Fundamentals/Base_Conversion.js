export const data = {
  presentation: "### Sisteme de Numerație și Conversii\n\nUn sistem de numerație reprezintă un mod de scriere a numerelor folosind un set de simboluri (cifre). Cel mai cunoscut este sistemul zecimal (baza $10$). În informatică, sistemele binar (baza $2$), octal (baza $8$) și hexadecimal (baza $16$) sunt extrem de importante.\n\nFie $b$ baza sistemului de numerație. Un număr reprezentat prin cifrele $(d_k d_{k-1} \\dots d_1 d_0)_b$ are valoarea în baza $10$ determinată de formula:\n\n$$N = \\sum_{i=0}^{k} d_i \\cdot b^i$$\n\nPentru a converti un număr din baza $10$ în baza $b$, împărțim succesiv numărul la $b$, colectând resturile obținute de la ultimul la primul (în ordine inversă).",
  complexity: "### Complexitate\n\n- **Timp:** $O(\\log_b(n))$ - numărul de împărțiri necesare este egal cu numărul de cifre în baza $b$.\n- **Spațiu:** $O(\\log_b(n))$ - spațiul necesar stocării cifrelor numărului în noua bază.",
  variations: "### Variații și Cazuri Particulare\n\n- **Baze mai mari de $10$**: Pentru cifrele cu valori între $10$ și $b-1$, se folosesc litere, de exemplu: $'A' = 10$, $'B' = 11$, $\\dots$, $'F' = 15$ în baza $16$.\n- **Baze puteri ale lui $2$**: Conversia directă între baza $2$ și baze precum $4$, $8$, $16$ se poate face rapid prin gruparea cifrelor binare câte $\\log_2(B)$ (de exemplu, gruparea de câte $4$ biți pentru baza $16$), evitând conversia prin intermediul bazei $10$.",
  applications: "### Aplicații Reale\n\n- Reprezentarea culorilor în format Hex (de exemplu `#FFFFFF` pentru alb).\n- Adresarea memoriei RAM în sisteme de calcul folosind notația hexadecimală.\n- Permisiunile în Unix/Linux reprezentate octal (de exemplu `755`).",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n = 13;
    int base = 2;
    vector<int> digits;
    
    int temp = n;
    while (temp > 0) {
        int rem = temp % base;
        digits.push_back(rem);
        temp /= base;
    }
    
    int num_digits = digits.size();
    return 0;
}
`,
  explanations: [
    {
      line: 7,
      text: "Definim numărul zecimal $n = 13$ pe care dorim să-l convertim.",
      blocksVisual: [
        {
          label: "Input",
          groups: [
            [{ val: "n = 13", active: true }]
          ]
        }
      ]
    },
    {
      line: 8,
      text: "Definim baza în care dorim să facem conversia: $base = 2$.",
      blocksVisual: [
        {
          label: "Bază",
          groups: [
            [{ val: "base = 2", active: true }]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Declarăm un vector $digits$ în care vom stoca cifrele reprezentării în baza $2$.",
      blocksVisual: [
        {
          label: "Vector Cifre",
          groups: [
            [{ val: "digits: []", active: true }]
          ]
        }
      ]
    },
    {
      line: 11,
      text: "Copiem valoarea lui $n$ în variabila de lucru $temp$.",
      blocksVisual: [
        {
          label: "Copie",
          groups: [
            [{ val: "temp = 13", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm dacă $temp > 0$. $13 > 0$ este adevărat, deci intrăm în bucla de împărțiri.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "13 > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm restul împărțirii lui $temp$ la $base$: $13 \\pmod{2} = 1$.",
      blocksVisual: [
        {
          label: "Rest",
          groups: [
            [{ val: "rem = 1", active: true }],
            [{ val: "temp = 13" }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul obținut ($1$) la finalul vectorului $digits$.",
      blocksVisual: [
        {
          label: "Vector Cifre",
          groups: [
            [{ val: "digits: [1]", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Împărțim întreagă valoarea lui $temp$ la $base$: $temp = 13 / 2 = 6$.",
      blocksVisual: [
        {
          label: "Actualizare",
          groups: [
            [{ val: "temp = 6", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția: $temp = 6 > 0$ este adevărată.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "6 > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm noul rest: $6 \\pmod{2} = 0$.",
      blocksVisual: [
        {
          label: "Rest",
          groups: [
            [{ val: "rem = 0", active: true }],
            [{ val: "temp = 6" }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul ($0$) în vector. Cifrele sunt adăugate în ordinea obținerii.",
      blocksVisual: [
        {
          label: "Vector Cifre",
          groups: [
            [{ val: "digits: [1, 0]", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Actualizăm valoarea lui $temp$: $temp = 6 / 2 = 3$.",
      blocksVisual: [
        {
          label: "Actualizare",
          groups: [
            [{ val: "temp = 3", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția: $temp = 3 > 0$ este adevărată.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "3 > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm restul: $3 \\pmod{2} = 1$.",
      blocksVisual: [
        {
          label: "Rest",
          groups: [
            [{ val: "rem = 1", active: true }],
            [{ val: "temp = 3" }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm restul ($1$) în vector.",
      blocksVisual: [
        {
          label: "Vector Cifre",
          groups: [
            [{ val: "digits: [1, 0, 1]", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Actualizăm valoarea lui $temp$: $temp = 3 / 2 = 1$.",
      blocksVisual: [
        {
          label: "Actualizare",
          groups: [
            [{ val: "temp = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția: $temp = 1 > 0$ este adevărată.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "1 > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Calculăm ultimul rest: $1 \\pmod{2} = 1$.",
      blocksVisual: [
        {
          label: "Rest",
          groups: [
            [{ val: "rem = 1", active: true }],
            [{ val: "temp = 1" }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Adăugăm ultimul rest ($1$) în vector. Vectorul complet conține resturile în ordine directă de obținere.",
      blocksVisual: [
        {
          label: "Vector Cifre",
          groups: [
            [{ val: "digits: [1, 0, 1, 1]", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Actualizăm valoarea lui $temp$: $temp = 1 / 2 = 0$.",
      blocksVisual: [
        {
          label: "Actualizare",
          groups: [
            [{ val: "temp = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Verificăm condiția: $temp = 0 > 0$ este falsă. Ieșim din buclă.",
      blocksVisual: [
        {
          label: "Condiție",
          groups: [
            [{ val: "0 > 0 ? Fals", active: true }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Salvăm lungimea vectorului de cifre pentru afișare/analiză.",
      blocksVisual: [
        {
          label: "Rezultat",
          groups: [
            [{ val: "num_digits = 4", active: true }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Baza 2",
        url: "https://www.pbinfo.ro/probleme/429/baza2",
        desc: "Afișează reprezentarea în baza 2 a unui număr dat în baza 10."
      }
    ],
    medium: [
      {
        title: "Conversie din baza b în baza 10",
        url: "https://www.pbinfo.ro/probleme/2319/conversie",
        desc: "Convertește un număr dintr-o bază b în baza 10."
      }
    ],
    hard: [
      {
        title: "Baza b",
        url: "https://www.pbinfo.ro/probleme/430/bazab",
        desc: "Efectuează conversia unui număr din baza 10 în baza b (unde b poate fi între 2 și 16)."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 7 });

      if (stepIndex >= 0) {
        vars.push({ name: 'n', type: 'int', val: 13, expandable: false });
      }
      if (stepIndex >= 1) {
        vars.push({ name: 'base', type: 'int', val: 2, expandable: false });
      }
      if (stepIndex >= 2) {
        let dVal = [];
        if (stepIndex >= 6 && stepIndex <= 9) dVal = [1];
        else if (stepIndex >= 10 && stepIndex <= 13) dVal = [1, 0];
        else if (stepIndex >= 14 && stepIndex <= 17) dVal = [1, 0, 1];
        else if (stepIndex >= 18) dVal = [1, 0, 1, 1];
        vars.push({ name: 'digits', type: 'std::vector<int>', val: `[${dVal.join(', ')}]`, expandable: true });
      }
      if (stepIndex >= 3) {
        let tVal = 13;
        if (stepIndex >= 7 && stepIndex <= 10) tVal = 6;
        else if (stepIndex >= 11 && stepIndex <= 14) tVal = 3;
        else if (stepIndex >= 15 && stepIndex <= 18) tVal = 1;
        else if (stepIndex >= 19) tVal = 0;
        vars.push({ name: 'temp', type: 'int', val: tVal, expandable: false });
      }
      let showRem = false;
      let rVal = 0;
      if (stepIndex >= 5 && stepIndex <= 6) { showRem = true; rVal = 1; }
      else if (stepIndex >= 9 && stepIndex <= 10) { showRem = true; rVal = 0; }
      else if (stepIndex >= 13 && stepIndex <= 14) { showRem = true; rVal = 1; }
      else if (stepIndex >= 17 && stepIndex <= 18) { showRem = true; rVal = 1; }
      if (showRem) {
        vars.push({ name: 'rem', type: 'int', val: rVal, expandable: false });
      }
      if (stepIndex >= 21) {
        vars.push({ name: 'num_digits', type: 'int', val: 4, expandable: false });
      }

      if (activeLine === 7) inlineVal = "n: 13";
      else if (activeLine === 8) inlineVal = "base: 2";
      else if (activeLine === 11) inlineVal = "temp: 13";
      else if (activeLine === 12) {
        let tVal = 13;
        if (stepIndex >= 7 && stepIndex <= 10) tVal = 6;
        else if (stepIndex >= 11 && stepIndex <= 14) tVal = 3;
        else if (stepIndex >= 15 && stepIndex <= 18) tVal = 1;
        else if (stepIndex >= 19) tVal = 0;
        inlineVal = `temp: ${tVal}`;
      } else if (activeLine === 13) {
        let rVal = 0;
        if (stepIndex >= 5 && stepIndex <= 6) rVal = 1;
        else if (stepIndex >= 9 && stepIndex <= 10) rVal = 0;
        else if (stepIndex >= 13 && stepIndex <= 14) rVal = 1;
        else if (stepIndex >= 17 && stepIndex <= 18) rVal = 1;
        inlineVal = `rem: ${rVal}`;
      } else if (activeLine === 14) {
        let dVal = [];
        if (stepIndex >= 6 && stepIndex <= 9) dVal = [1];
        else if (stepIndex >= 10 && stepIndex <= 13) dVal = [1, 0];
        else if (stepIndex >= 14 && stepIndex <= 17) dVal = [1, 0, 1];
        else if (stepIndex >= 18) dVal = [1, 0, 1, 1];
        inlineVal = `digits: [${dVal.join(', ')}]`;
      } else if (activeLine === 15) {
        let tVal = 13;
        if (stepIndex >= 7 && stepIndex <= 10) tVal = 6;
        else if (stepIndex >= 11 && stepIndex <= 14) tVal = 3;
        else if (stepIndex >= 15 && stepIndex <= 18) tVal = 1;
        else if (stepIndex >= 19) tVal = 0;
        inlineVal = `temp: ${tVal}`;
      } else if (activeLine === 18) {
        inlineVal = "num_digits: 4";
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 7 && stepIndex >= 0) return 'n: 13';
      if (lineNum === 8 && stepIndex >= 1) return 'base: 2';
      if (lineNum === 9 && stepIndex >= 2) {
        let dVal = [];
        if (stepIndex >= 6 && stepIndex <= 9) dVal = [1];
        else if (stepIndex >= 10 && stepIndex <= 13) dVal = [1, 0];
        else if (stepIndex >= 14 && stepIndex <= 17) dVal = [1, 0, 1];
        else if (stepIndex >= 18) dVal = [1, 0, 1, 1];
        return `digits: [${dVal.join(', ')}]`;
      }
      if (lineNum === 11 && stepIndex >= 3) return 'temp: 13';
      if (lineNum === 12 && stepIndex >= 4) {
        let tVal = 13;
        if (stepIndex >= 7 && stepIndex <= 10) tVal = 6;
        else if (stepIndex >= 11 && stepIndex <= 14) tVal = 3;
        else if (stepIndex >= 15 && stepIndex <= 18) tVal = 1;
        else if (stepIndex >= 19) tVal = 0;
        return `temp: ${tVal}`;
      }
      if (lineNum === 13) {
        let rVal = null;
        if (stepIndex >= 5 && stepIndex <= 6) rVal = 1;
        else if (stepIndex >= 9 && stepIndex <= 10) rVal = 0;
        else if (stepIndex >= 13 && stepIndex <= 14) rVal = 1;
        else if (stepIndex >= 17 && stepIndex <= 18) rVal = 1;
        if (rVal !== null) return `rem: ${rVal}`;
      }
      if (lineNum === 14) {
        let dVal = [];
        if (stepIndex >= 6 && stepIndex <= 9) dVal = [1];
        else if (stepIndex >= 10 && stepIndex <= 13) dVal = [1, 0];
        else if (stepIndex >= 14 && stepIndex <= 17) dVal = [1, 0, 1];
        else if (stepIndex >= 18) dVal = [1, 0, 1, 1];
        return `digits: [${dVal.join(', ')}]`;
      }
      if (lineNum === 15) {
        let tVal = 13;
        if (stepIndex >= 7 && stepIndex <= 10) tVal = 6;
        else if (stepIndex >= 11 && stepIndex <= 14) tVal = 3;
        else if (stepIndex >= 15 && stepIndex <= 18) tVal = 1;
        else if (stepIndex >= 19) tVal = 0;
        return `temp: ${tVal}`;
      }
      if (lineNum === 18 && stepIndex >= 21) return 'num_digits: 4';
      return null;
    }
  }
};
