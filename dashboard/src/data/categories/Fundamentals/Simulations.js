export const data = {
  presentation: "### Simulări\n\n**Simularea** este o tehnică de rezolvare a problemelor în care modelăm pas cu pas procesul descris, urmărind îndeaproape regulile jocului sau ale sistemului. Spre deosebire de alte categorii unde căutăm formule matematice directe sau algoritmi complecși, la simulări accentul cade pe corectitudinea implementării tuturor stărilor și tranzițiilor.\n\nUn exemplu clasic de simulare este deplasarea unui robot sau a unui personaj pe o grilă bidimensională de dimensiune $N \\times M$ în funcție de un set de comenzi primite.",
  complexity: "### Complexitate\n\n- **Timp:** $O(S)$ - unde $S$ este numărul total de pași sau comenzi simulate. Dacă fiecare pas se procesează în timp constant, timpul total este liniar în raport cu numărul de stări.\n- **Spațiu:** $O(1)$ sau $O(N \\times M)$ - în funcție de necesitatea de a stoca întreaga stare a grilei/matricei în memorie.",
  variations: "### Variații și Cazuri Particulare\n\n- **Ieșirea din limite**: La simulări pe grilă, este critic să verificăm dacă coordonatele viitoare depășesc marginile matricei ($0 \\le row < N$ și $0 \\le col < M$).\n- **Simulări Ciclicce**: Obiectul reintră prin partea opusă a ecranului (lume de tip toroidal).\n- **Jocul Vieții (Conway's Game of Life)**: Simularea unei întregi populații de celule pe baza stării vecinilor lor.",
  applications: "### Aplicații Reale\n\n- Modelarea fluxului de trafic în orașe sau rețele de calculatoare.\n- Dezvoltarea motoarelor fizice pentru jocuri video (simularea gravitației, coliziunilor).\n- Simularea comportamentului rețelelor neuronale sau a proceselor economice.",
  code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    // Coordonatele initiale ale robotului pe o matrice 3x3
    int row = 1;
    int col = 1;
    
    // Comenzi de miscare
    string commands = "RULD";
    
    for (char cmd : commands) {
        if (cmd == 'U' && row > 0) {
            row--;
        } else if (cmd == 'D' && row < 2) {
            row++;
        } else if (cmd == 'L' && col > 0) {
            col--;
        } else if (cmd == 'R' && col < 2) {
            col++;
        }
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 9,
      text: "Inițializăm linia de pornire a robotului: $row = 1$ (centrul unei matrice $3 \\times 3$).",
      blocksVisual: [
        {
          label: "Poziție Robot",
          groups: [
            [{ val: "row = 1", active: true }, { val: "col = ?" }]
          ]
        }
      ]
    },
    {
      line: 10,
      text: "Inițializăm coloana de pornire a robotului: $col = 1$.",
      blocksVisual: [
        {
          label: "Poziție Robot",
          groups: [
            [{ val: "row = 1" }, { val: "col = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 13,
      text: "Definim șirul de comenzi de mișcare: $commands = \"RULD\"$ (Dreapta, Sus, Stânga, Jos).",
      blocksVisual: [
        {
          label: "Comenzi de rulat",
          groups: [
            [{ val: "R", active: true }, { val: "U" }, { val: "L" }, { val: "D" }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Începem bucla și citim prima comandă: $cmd = 'R'$.",
      blocksVisual: [
        {
          label: "Comandă curentă",
          groups: [
            [{ val: "cmd = 'R'", active: true }]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Comanda fiind $'R'$ și robotul nefiind pe ultima coloană ($col = 1 < 2$), condiția este adevărată.",
      blocksVisual: [
        {
          label: "Verificare mișcare",
          groups: [
            [{ val: "cmd == 'R' && col < 2 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Mutăm robotul la dreapta prin incrementarea coloanei: $col = 2$.",
      blocksVisual: [
        {
          label: "Poziție Robot",
          groups: [
            [{ val: "row = 1" }, { val: "col = 2", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Trecem la a doua comandă: $cmd = 'U'$ (Sus).",
      blocksVisual: [
        {
          label: "Comandă curentă",
          groups: [
            [{ val: "cmd = 'U'", active: true }]
          ]
        }
      ]
    },
    {
      line: 16,
      text: "Verificăm dacă robotul se poate deplasa în sus: $cmd == 'U'$ și linia nu este prima ($row = 1 > 0$). Condiția este adevărată.",
      blocksVisual: [
        {
          label: "Verificare mișcare",
          groups: [
            [{ val: "cmd == 'U' && row > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Mutăm robotul în sus prin decrementarea liniei: $row = 0$.",
      blocksVisual: [
        {
          label: "Poziție Robot",
          groups: [
            [{ val: "row = 0", active: true }, { val: "col = 2" }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Trecem la a treia comandă: $cmd = 'L'$ (Stânga).",
      blocksVisual: [
        {
          label: "Comandă curentă",
          groups: [
            [{ val: "cmd = 'L'", active: true }]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Verificăm dacă robotul se poate deplasa la stânga ($col = 2 > 0$). Este adevărat.",
      blocksVisual: [
        {
          label: "Verificare mișcare",
          groups: [
            [{ val: "cmd == 'L' && col > 0 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 21,
      text: "Mutăm robotul la stânga prin decrementarea coloanei: $col = 1$.",
      blocksVisual: [
        {
          label: "Poziție Robot",
          groups: [
            [{ val: "row = 0" }, { val: "col = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Trecem la ultima comandă: $cmd = 'D'$ (Jos).",
      blocksVisual: [
        {
          label: "Comandă curentă",
          groups: [
            [{ val: "cmd = 'D'", active: true }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Verificăm dacă ne putem deplasa în jos: $row = 0 < 2$. Condiția este adevărată.",
      blocksVisual: [
        {
          label: "Verificare mișcare",
          groups: [
            [{ val: "cmd == 'D' && row < 2 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Mutăm robotul în jos prin incrementarea liniei: $row = 1$.",
      blocksVisual: [
        {
          label: "Poziție Robot",
          groups: [
            [{ val: "row = 1", active: true }, { val: "col = 1" }]
          ]
        }
      ]
    },
    {
      line: 27,
      text: "Finalizăm simularea cu robotul revenit la poziția de start $(1, 1)$.",
      blocksVisual: [
        {
          label: "Poziție Finală",
          groups: [
            [{ val: "row = 1" }, { val: "col = 1" }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Robot",
        url: "https://www.pbinfo.ro/probleme/2318/robot1",
        desc: "Simulează deplasarea unui robot pe o grilă conform unui set simplu de comenzi."
      }
    ],
    medium: [
      {
        title: "Spirală Matrice",
        url: "https://www.pbinfo.ro/probleme/208/spirala",
        desc: "Parcurge și afișează o matrice în formă de spirală."
      }
    ],
    hard: [
      {
        title: "Jocul Vieții",
        url: "https://leetcode.com/problems/game-of-life/",
        desc: "Simulează evoluția celulelor conform regulilor Conway pe o matrice 2D."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 9 });

      let rowVal = 1;
      if (stepIndex >= 8 && stepIndex <= 13) rowVal = 0;
      else if (stepIndex >= 14) rowVal = 1;

      let colVal = 1;
      if (stepIndex >= 5 && stepIndex <= 10) colVal = 2;
      else if (stepIndex >= 11) colVal = 1;

      if (stepIndex >= 0) {
        vars.push({ name: 'row', type: 'int', val: rowVal, expandable: false });
      }
      if (stepIndex >= 1) {
        vars.push({ name: 'col', type: 'int', val: colVal, expandable: false });
      }
      if (stepIndex >= 2) {
        vars.push({ name: 'commands', type: 'std::string', val: '"RULD"', expandable: false });
      }

      let cmdVal = null;
      if (stepIndex >= 3 && stepIndex <= 5) cmdVal = 'R';
      else if (stepIndex >= 6 && stepIndex <= 8) cmdVal = 'U';
      else if (stepIndex >= 9 && stepIndex <= 11) cmdVal = 'L';
      else if (stepIndex >= 12 && stepIndex <= 14) cmdVal = 'D';

      if (cmdVal !== null) {
        vars.push({ name: 'cmd', type: 'char', val: `'${cmdVal}'`, expandable: false });
      }

      if (activeLine === 9) inlineVal = "row: 1";
      else if (activeLine === 10) inlineVal = `col: 1`;
      else if (activeLine === 13) inlineVal = 'commands: "RULD"';
      else if (activeLine === 15 && cmdVal !== null) inlineVal = `cmd: '${cmdVal}'`;
      else if (activeLine === 16) inlineVal = `cmd: 'U', row: ${rowVal}`;
      else if (activeLine === 17) inlineVal = `row: ${rowVal}`;
      else if (activeLine === 18) inlineVal = `cmd: 'D', row: ${rowVal}`;
      else if (activeLine === 19) inlineVal = `row: ${rowVal}`;
      else if (activeLine === 20) inlineVal = `cmd: 'L', col: ${colVal}`;
      else if (activeLine === 21) inlineVal = `col: ${colVal}`;
      else if (activeLine === 22) inlineVal = `cmd: 'R', col: ${colVal}`;
      else if (activeLine === 23) inlineVal = `col: ${colVal}`;
      else if (activeLine === 27) inlineVal = `row: ${rowVal}, col: ${colVal}`;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let rowVal = 1;
      if (stepIndex >= 8 && stepIndex <= 13) rowVal = 0;
      else if (stepIndex >= 14) rowVal = 1;

      let colVal = 1;
      if (stepIndex >= 5 && stepIndex <= 10) colVal = 2;
      else if (stepIndex >= 11) colVal = 1;

      let cmdVal = null;
      if (stepIndex >= 3 && stepIndex <= 5) cmdVal = 'R';
      else if (stepIndex >= 6 && stepIndex <= 8) cmdVal = 'U';
      else if (stepIndex >= 9 && stepIndex <= 11) cmdVal = 'L';
      else if (stepIndex >= 12 && stepIndex <= 14) cmdVal = 'D';

      if (lineNum === 9 && stepIndex >= 0) return 'row: 1';
      if (lineNum === 10 && stepIndex >= 1) return 'col: 1';
      if (lineNum === 13 && stepIndex >= 2) return 'commands: "RULD"';
      if (lineNum === 15 && cmdVal !== null) return `cmd: '${cmdVal}'`;
      if (lineNum === 16 && cmdVal !== null) return `cmd: '${cmdVal}', row: ${rowVal}`;
      if (lineNum === 17) return `row: ${rowVal}`;
      if (lineNum === 18 && cmdVal !== null) return `cmd: '${cmdVal}', row: ${rowVal}`;
      if (lineNum === 19) return `row: ${rowVal}`;
      if (lineNum === 20 && cmdVal !== null) return `cmd: '${cmdVal}', col: ${colVal}`;
      if (lineNum === 21) return `col: ${colVal}`;
      if (lineNum === 22 && cmdVal !== null) return `cmd: '${cmdVal}', col: ${colVal}`;
      if (lineNum === 23) return `col: ${colVal}`;
      if (lineNum === 27 && stepIndex >= 15) return `row: ${rowVal}, col: ${colVal}`;
      return null;
    }
  }
};
