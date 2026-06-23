export const data = {
  presentation: "### Prelucrări pe Șiruri fără Memorare (Streaming)\n\nProcesarea în flux (sau **streaming**) se referă la tehnica de a citi și analiza un șir de date element cu element, fără a stoca toate elementele în memorie. Această metodă este fundamentală în programare competitivă și sisteme de producție.\n\nDe exemplu, dacă se cere suma sau maximul a $N$ numere, nu este necesar să declarăm un vector de dimensiune $N$. Putem folosi o singură variabilă în care citim pe rând fiecare număr și acumulăm rezultatul. Astfel, spațiul de memorie devine $O(1)$, comparat cu $O(N)$ dacă am fi stocat elementele într-un tablou.",
  complexity: "### Complexitate\n\n- **Timp:** $O(N)$ - citim și procesăm fiecare din cele $N$ elemente exact o singură dată.\n- **Spațiu:** $O(1)$ - memoria utilizată este constantă, independentă de lungimea șirului de intrare.",
  variations: "### Variații și Cazuri Particulare\n\n1. **Citire până la EOF (End Of File)**: Când nu se specifică numărul de elemente dinainte, citirea se face într-o buclă `while(cin >> x)`.\n2. **Valoare de oprire**: Șirul se încheie cu o valoare santinelă (de exemplu, $0$).\n3. **Stări consecutive**: Uneori avem nevoie de elementul anterior pentru a-l compara cu cel curent. Acest lucru se rezolvă menținând o variabilă suplimentară `prev_x`.",
  applications: "### Aplicații Reale\n\n- Procesarea fișierelor de log gigantice care nu încap în memoria RAM.\n- Monitorizarea în timp real a datelor provenite de la senzori (IoT).\n- Calcularea metricilor agregate (medie, deviație standard) pentru fluxuri financiare live.",
  code: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    // Simulam citirea succesiva a numerelor: 4, -2, 7, 0
    vector<int> stream = {4, -2, 7, 0};
    int sum = 0;
    int count = 0;
    
    for (int x : stream) {
        if (x == 0) {
            break;
        }
        if (x > 0) {
            sum += x;
            count++;
        }
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 8,
      text: "Definim un vector $stream$ pentru a simula citirea valorilor de la consolă una câte una.",
      blocksVisual: [
        {
          label: "Flux de intrare",
          groups: [
            [{ val: "4" }, { val: "-2" }, { val: "7" }, { val: "0 (stop)" }]
          ]
        }
      ]
    },
    {
      line: 9,
      text: "Inițializăm suma numerelor pozitive cu $0$.",
      blocksVisual: [
        {
          label: "Suma",
          groups: [
            [{ val: "sum = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 10,
      text: "Inițializăm numărul de elemente pozitive găsite cu $0$.",
      blocksVisual: [
        {
          label: "Contor",
          groups: [
            [{ val: "count = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Începem parcurgerea fluxului. Primul număr citit este $x = 4$.",
      blocksVisual: [
        {
          label: "Element curent",
          groups: [
            [{ val: "x = 4", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă numărul citit este valoarea de oprire $0$. Nu este.",
      blocksVisual: [
        {
          label: "Oprire?",
          groups: [
            [{ val: "4 == 0 ? Nu", active: true }]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă $x$ este strict pozitiv ($4 > 0$). Este adevărat.",
      blocksVisual: [
        {
          label: "Verificare",
          groups: [
            [{ val: "4 > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Adunăm valoarea $4$ la suma totală: $sum = 0 + 4 = 4$.",
      blocksVisual: [
        {
          label: "Suma",
          groups: [
            [{ val: "sum = 4", active: true }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Incrementăm contorul numerelor pozitive: $count = 1$.",
      blocksVisual: [
        {
          label: "Contor",
          groups: [
            [{ val: "count = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Trecem la următorul număr din flux: $x = -2$.",
      blocksVisual: [
        {
          label: "Element curent",
          groups: [
            [{ val: "x = -2", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă $x$ este $0$. Nu este.",
      blocksVisual: [
        {
          label: "Oprire?",
          groups: [
            [{ val: "-2 == 0 ? Nu", active: true }]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă $x$ este strict pozitiv ($-2 > 0$). Este fals.",
      blocksVisual: [
        {
          label: "Verificare",
          groups: [
            [{ val: "-2 > 0 ? Nu", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Citim următorul număr din flux: $x = 7$.",
      blocksVisual: [
        {
          label: "Element curent",
          groups: [
            [{ val: "x = 7", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă $x$ este $0$. Nu este.",
      blocksVisual: [
        {
          label: "Oprire?",
          groups: [
            [{ val: "7 == 0 ? Nu", active: true }]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă $x$ este pozitiv ($7 > 0$). Este adevărat.",
      blocksVisual: [
        {
          label: "Verificare",
          groups: [
            [{ val: "7 > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Adunăm valoarea $7$ la suma totală: $sum = 4 + 7 = 11$.",
      blocksVisual: [
        {
          label: "Suma",
          groups: [
            [{ val: "sum = 11", active: true }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Incrementăm contorul numerelor pozitive: $count = 2$.",
      blocksVisual: [
        {
          label: "Contor",
          groups: [
            [{ val: "count = 2", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Citim următorul număr din flux: $x = 0$.",
      blocksVisual: [
        {
          label: "Element curent",
          groups: [
            [{ val: "x = 0", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Verificăm dacă valoarea citită este egală cu $0$. De data aceasta este adevărat.",
      blocksVisual: [
        {
          label: "Oprire?",
          groups: [
            [{ val: "0 == 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Întrerupem bucla folosind instrucțiunea `break`.",
      blocksVisual: [
        {
          label: "Ieșire din buclă",
          groups: [
            [{ val: "break", active: true }]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Finalizăm programul cu succes. Variabilele finale sunt $sum = 11$ și $count = 2$.",
      blocksVisual: [
        {
          label: "Stare finală",
          groups: [
            [{ val: "sum = 11" }],
            [{ val: "count = 2" }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Numărare valori pozitive",
        url: "https://www.pbinfo.ro/probleme/2810/numarare6",
        desc: "Citește un flux de numere până la întâlnirea lui 0 și determină câte au fost pozitive."
      }
    ],
    medium: [
      {
        title: "Minimul și Maximul din flux",
        url: "https://www.pbinfo.ro/probleme/346/minmax-sir",
        desc: "Determină elementul minim și cel maxim dintr-un flux fără a memora șirul."
      }
    ],
    hard: [
      {
        title: "Numărare perechi cu proprietăți",
        url: "https://www.pbinfo.ro/probleme/2951/perechi-consecutive",
        desc: "Determină câte perechi de numere consecutive citite au proprietatea că au același număr de divizori."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 8 });

      let sumVal = 0;
      if (stepIndex >= 6 && stepIndex <= 13) sumVal = 4;
      else if (stepIndex >= 14) sumVal = 11;

      let countVal = 0;
      if (stepIndex >= 7 && stepIndex <= 14) countVal = 1;
      else if (stepIndex >= 15) countVal = 2;

      if (stepIndex >= 0) {
        vars.push({ name: 'stream', type: 'std::vector<int>', val: '{4, -2, 7, 0}', expandable: true });
      }
      if (stepIndex >= 1) {
        vars.push({ name: 'sum', type: 'int', val: sumVal, expandable: false });
      }
      if (stepIndex >= 2) {
        vars.push({ name: 'count', type: 'int', val: countVal, expandable: false });
      }

      let xVal = null;
      if (stepIndex >= 3 && stepIndex <= 7) xVal = 4;
      else if (stepIndex >= 8 && stepIndex <= 10) xVal = -2;
      else if (stepIndex >= 11 && stepIndex <= 15) xVal = 7;
      else if (stepIndex >= 16 && stepIndex <= 18) xVal = 0;

      if (xVal !== null) {
        vars.push({ name: 'x', type: 'int', val: xVal, expandable: false });
      }

      if (activeLine === 8) inlineVal = "stream: {4, -2, 7, 0}";
      else if (activeLine === 9) inlineVal = "sum: 0";
      else if (activeLine === 10) inlineVal = "count: 0";
      else if (activeLine === 12 && xVal !== null) inlineVal = `x: ${xVal}`;
      else if (activeLine === 13 && xVal !== null) inlineVal = `x: ${xVal}`;
      else if (activeLine === 14) inlineVal = "x: 0";
      else if (activeLine === 16 && xVal !== null) inlineVal = `x: ${xVal}`;
      else if (activeLine === 17 && xVal !== null) inlineVal = `x: ${xVal}, sum: ${sumVal}`;
      else if (activeLine === 18) inlineVal = `count: ${countVal}`;
      else if (activeLine === 22) inlineVal = `sum: 11, count: 2`;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let sumVal = 0;
      if (stepIndex >= 6 && stepIndex <= 13) sumVal = 4;
      else if (stepIndex >= 14) sumVal = 11;

      let countVal = 0;
      if (stepIndex >= 7 && stepIndex <= 14) countVal = 1;
      else if (stepIndex >= 15) countVal = 2;

      let xVal = null;
      if (stepIndex >= 3 && stepIndex <= 7) xVal = 4;
      else if (stepIndex >= 8 && stepIndex <= 10) xVal = -2;
      else if (stepIndex >= 11 && stepIndex <= 15) xVal = 7;
      else if (stepIndex >= 16 && stepIndex <= 18) xVal = 0;

      if (lineNum === 8 && stepIndex >= 0) return 'stream: {4, -2, 7, 0}';
      if (lineNum === 9 && stepIndex >= 1) return 'sum: 0';
      if (lineNum === 10 && stepIndex >= 2) return 'count: 0';
      if (lineNum === 12 && xVal !== null) return `x: ${xVal}`;
      if (lineNum === 13 && xVal !== null) return `x: ${xVal}`;
      if (lineNum === 14 && stepIndex >= 18) return 'x: 0';
      if (lineNum === 16 && xVal !== null) return `x: ${xVal}`;
      if (lineNum === 17 && xVal !== null) return `x: ${xVal}, sum: ${sumVal}`;
      if (lineNum === 18 && stepIndex >= 7) return `count: ${countVal}`;
      if (lineNum === 22 && stepIndex >= 19) return `sum: 11, count: 2`;
      return null;
    }
  }
};
