export const data = {
  presentation: `### Analiza Complexității

În informatică, analiza complexității este utilizată pentru a măsura eficiența unui algoritm în funcție de dimensiunea datelor de intrare, notată de obicei cu $N$. Aceasta ne permite să estimăm cum se vor comporta resursele (timpul de execuție și memoria utilizată) atunci când volumul de date crește.

### Notațiile Asimptotice

Pentru a descrie comportamentul asimptotic, folosim trei notații matematice principale:

1. **Notația Big O ($O$)**
   - Reprezintă o **limită superioară** a timpului de execuție sau a spațiului (worst-case).
   - Spunem că $f(N) = O(g(N))$ dacă există constantele pozitive $c$ și $n_0$ astfel încât $f(N) \\le c \\cdot g(N)$ pentru orice $N \\ge n_0$.
   - Oferă o garanție că algoritmul nu va rula mai lent decât un anumit ritm de creștere.

2. **Notația Big Omega ($\\Omega$)**
   - Reprezintă o **limită inferioară** (best-case).
   - Spunem că $f(N) = \\Omega(g(N))$ dacă există constantele pozitive $c$ și $n_0$ astfel încât $f(N) \\ge c \\cdot g(N)$ pentru orice $N \\ge n_0$.
   - Garantează că algoritmul va efectua cel puțin un număr de operații proporțional cu $g(N)$ în cel mai bun caz.

3. **Notația Big Theta ($\\Theta$)**
   - Reprezintă o **limită strânsă** (comportament asimptotic exact).
   - Spunem că $f(N) = \\Theta(g(N))$ dacă algoritmul este atât $O(g(N))$ cât și $\\Omega(g(N))$.
   - Există constantele pozitive $c_1, c_2$ și $n_0$ astfel încât $c_1 \\cdot g(N) \\le f(N) \\le c_2 \\cdot g(N)$ pentru orice $N \\ge n_0$.

### Clase Comune de Complexitate

- $O(1)$ — Timp Constant: Operații elementare independente de $N$ (ex: accesarea unui element dintr-un vector prin index).
- $O(\\log N)$ — Timp Logaritmic: Spațiul de căutare se înjumătățește la fiecare pas (ex: Căutarea Binară).
- $O(N)$ — Timp Liniar: Parcurgerea unei structuri de date o singură dată (ex: căutarea liniară).
- $O(N \\log N)$ — Timp Liniar-Logaritmic: Algoritmi eficienți de sortare (ex: Merge Sort, Quick Sort).
- $O(N^2)$ — Timp Pătratic: Bucle imbricate (ex: Bubble Sort, verificarea tuturor perechilor dintr-un vector).
- $O(2^N)$ — Timp Exponențial: Generarea tuturor subseturilor posibile (Backtracking).`,

  complexity: `### Complexitatea Codului Demonstrat

- **Timp total:** $\\Theta(N + \\log N) = \\Theta(N)$ — deoarece primul loop execută exact $N$ pași, iar al doilea loop execută $\\approx \\log_2 N$ pași. Termenul dominant asimptotic este $N$.
- **Spațiu:** $\\Theta(1)$ — memoria auxiliară folosită este constantă, constând doar în variabile simple întregi (\`n\`, \`counter\`, \`i\`, \`temp\`).`,

  variations: `### Variații și Comportamente Asimptotice

- **Cazul cel mai bun (Best Case) vs Cazul cel mai rău (Worst Case):** La căutarea liniară într-un vector, dacă elementul căutat este pe prima poziție, timpul este $\\Omega(1)$, dar dacă elementul nu există sau este pe ultima poziție, timpul este $O(N)$.
- **Analiza Amortizată:** Se folosește pentru a evalua o secvență de operații, unde unele pot fi foarte costisitoare, dar media pe termen lung este mică. Un exemplu clasic este redimensionarea unui vector dinamic (\`std::vector\`), unde adăugarea durează în general $O(1)$ amortizat, dar uneori poate dura $O(N)$ când se realocă memoria.`,

  applications: `### Aplicații și Importanță Practică

- **Optimizarea performanței:** Permite programatorilor să aleagă algoritmul corect înainte de a scrie codul propriu-zis (de exemplu, alegerea unei sortări $O(N \\log N)$ în loc de $O(N^2)$ pentru seturi mari de date).
- **Previzionarea scalabilității:** Oferă o metodă matematică de a prezice comportamentul sistemelor software pe măsură ce baza de utilizatori și datele cresc.
- **Interviuri tehnice:** Analiza asimptotică este un subiect central în evaluarea abilităților de rezolvare a problemelor de tip algoritm.`,

  code: `#include <iostream>
using namespace std;

int main() {
    int n = 10;
    int counter = 0;
    
    // Exemplu 1: Loop liniar - O(N)
    for (int i = 0; i < n; i++) {
        counter++;
    }
    
    // Exemplu 2: Loop logaritmic - O(log N)
    int temp = n;
    while (temp > 0) {
        temp /= 2;
        counter++;
    }
    
    return 0;
}
`,

  explanations: [
    {
      line: 5,
      text: "Inițializăm dimensiunea datelor de intrare $n = 10$. Această valoare dictează numărul de iterații în buclele noastre.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10", active: true }, { val: "counter = ?" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "N/A" }]] }
      ]
    },
    {
      line: 6,
      text: "Inițializăm contorul `counter = 0`. Vom folosi acest contor pentru a număra exact operațiile de bază executate.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 0", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "N/A" }]] }
      ]
    },
    {
      line: 9,
      text: "Începem primul loop (liniar). Inițializăm variabila de control `i = 0`. Verificăm condiția `i < n` ($0 < 10$), care este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 0" }, { val: "i = 0", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul de operații. `counter` devine $1$. Această operație se execută în timp constant $O(1)$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 1", active: true }, { val: "i = 0" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 1$). Condiția `i < n` ($1 < 10$) este adevărată, continuăm bucla.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 1" }, { val: "i = 1", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $2$. Suntem la al doilea pas al buclei liniare.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 2", active: true }, { val: "i = 1" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 2$). Condiția `i < n` ($2 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 2" }, { val: "i = 2", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $3$. Numărul de operații crește liniar cu valoarea lui `i`.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 3", active: true }, { val: "i = 2" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 3$). Condiția `i < n` ($3 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 3" }, { val: "i = 3", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $4$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 4", active: true }, { val: "i = 3" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 4$). Condiția `i < n` ($4 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 4" }, { val: "i = 4", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $5$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 5", active: true }, { val: "i = 4" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 5$). Condiția `i < n` ($5 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 5" }, { val: "i = 5", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $6$. Am ajuns la jumătatea intervalului pentru $n=10$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 6", active: true }, { val: "i = 5" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 6$). Condiția `i < n` ($6 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 6" }, { val: "i = 6", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $7$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 7", active: true }, { val: "i = 6" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 7$). Condiția `i < n` ($7 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 7" }, { val: "i = 7", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $8$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 8", active: true }, { val: "i = 7" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 8$). Condiția `i < n` ($8 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 8" }, { val: "i = 8", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $9$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 9", active: true }, { val: "i = 8" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 9$). Condiția `i < n` ($9 < 10$) este adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 9" }, { val: "i = 9", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 10,
      text: "Incrementăm contorul. `counter` devine $10$. Am efectuat exact $N$ incrementări, demonstrând complexitatea liniară $O(N)$ a acestei bucle.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 10", active: true }, { val: "i = 9" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 9,
      text: "Incrementăm indexul `i++` ($i = 10$). De data aceasta, condiția `i < n` ($10 < 10$) este FALSĂ. Ieșim din prima buclă.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 10" }, { val: "i = 10", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(N)", active: true }]] }
      ]
    },
    {
      line: 14,
      text: "Inițializăm variabila temporară `temp = n` ($10$) pentru a rula o a doua buclă cu comportament logaritmic.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 10" }, { val: "temp = 10", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 15,
      text: "Verificăm condiția buclei `while (temp > 0)` ($10 > 0$), care este adevărată. Intrăm în buclă.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 10" }, { val: "temp = 10", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 16,
      text: "Împărțim `temp` la 2: `temp /= 2` ($10 / 2 = 5$). Înjumătățirea valorii la fiecare pas este semnătura unei complexități logaritmice $O(\\log N)$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 10" }, { val: "temp = 5", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Incrementăm `counter` la $11$ pentru a înregistra această operație logaritmică.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 11", active: true }, { val: "temp = 5" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 15,
      text: "Verificăm condiția buclei `while (temp > 0)` ($5 > 0$), care este adevărată. Continuăm.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 11" }, { val: "temp = 5", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 16,
      text: "Împărțim `temp` la 2: `temp /= 2` ($5 / 2 = 2$). Valoarea continuă să scadă rapid.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 11" }, { val: "temp = 2", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Incrementăm `counter` la $12$. Aceasta este a doua operație din bucla logaritmică.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 12", active: true }, { val: "temp = 2" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 15,
      text: "Verificăm condiția buclei `while (temp > 0)` ($2 > 0$), adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 12" }, { val: "temp = 2", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 16,
      text: "Împărțim `temp` la 2: `temp /= 2` ($2 / 2 = 1$).",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 12" }, { val: "temp = 1", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Incrementăm `counter` la $13$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 13", active: true }, { val: "temp = 1" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 15,
      text: "Verificăm condiția buclei `while (temp > 0)` ($1 > 0$), adevărată.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 13" }, { val: "temp = 1", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 16,
      text: "Împărțim `temp` la 2: `temp /= 2` ($1 / 2 = 0$). Valoarea lui `temp` a ajuns la $0$.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 13" }, { val: "temp = 0", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 17,
      text: "Incrementăm `counter` la $14$. Aceasta este ultima incrementare din bucla logaritmică.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 14", active: true }, { val: "temp = 0" }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 15,
      text: "Verificăm condiția buclei `while (temp > 0)` ($0 > 0$), care acum este FALSĂ. Ieșim din a doua buclă.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 14" }, { val: "temp = 0", active: true }]] },
        { label: "Complexitate curentă", groups: [[{ val: "Analiză O(log N)", active: true }]] }
      ]
    },
    {
      line: 20,
      text: "Programul se încheie cu succes (`return 0`). În total, am efectuat $14$ operații de incrementare (10 pași în bucla liniară și 4 pași în bucla logaritmică). Complexitatea totală asimptotică este $O(N)$ deoarece termenul liniar îl domină pe cel logaritmic.",
      blocksVisual: [
        { label: "Variabile", groups: [[{ val: "n = 10" }, { val: "counter = 14" }]] },
        { label: "Complexitate totală", groups: [[{ val: "O(N) + O(log N) = O(N)", sorted: true }]] }
      ]
    }
  ],

  globalVars: [],

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      const stepData = [
        { n: 10, counter: 0, i: undefined, temp: undefined, comp: "N/A" }, // 0: line 5
        { n: 10, counter: 0, i: undefined, temp: undefined, comp: "N/A" }, // 1: line 6
        { n: 10, counter: 0, i: 0, temp: undefined, comp: "O(N)" }, // 2: line 9
        { n: 10, counter: 1, i: 0, temp: undefined, comp: "O(N)" }, // 3: line 10
        { n: 10, counter: 1, i: 1, temp: undefined, comp: "O(N)" }, // 4: line 9
        { n: 10, counter: 2, i: 1, temp: undefined, comp: "O(N)" }, // 5: line 10
        { n: 10, counter: 2, i: 2, temp: undefined, comp: "O(N)" }, // 6: line 9
        { n: 10, counter: 3, i: 2, temp: undefined, comp: "O(N)" }, // 7: line 10
        { n: 10, counter: 3, i: 3, temp: undefined, comp: "O(N)" }, // 8: line 9
        { n: 10, counter: 4, i: 3, temp: undefined, comp: "O(N)" }, // 9: line 10
        { n: 10, counter: 4, i: 4, temp: undefined, comp: "O(N)" }, // 10: line 9
        { n: 10, counter: 5, i: 4, temp: undefined, comp: "O(N)" }, // 11: line 10
        { n: 10, counter: 5, i: 5, temp: undefined, comp: "O(N)" }, // 12: line 9
        { n: 10, counter: 6, i: 5, temp: undefined, comp: "O(N)" }, // 13: line 10
        { n: 10, counter: 6, i: 6, temp: undefined, comp: "O(N)" }, // 14: line 9
        { n: 10, counter: 7, i: 6, temp: undefined, comp: "O(N)" }, // 15: line 10
        { n: 10, counter: 7, i: 7, temp: undefined, comp: "O(N)" }, // 16: line 9
        { n: 10, counter: 8, i: 7, temp: undefined, comp: "O(N)" }, // 17: line 10
        { n: 10, counter: 8, i: 8, temp: undefined, comp: "O(N)" }, // 18: line 9
        { n: 10, counter: 9, i: 8, temp: undefined, comp: "O(N)" }, // 19: line 10
        { n: 10, counter: 9, i: 9, temp: undefined, comp: "O(N)" }, // 20: line 9
        { n: 10, counter: 10, i: 9, temp: undefined, comp: "O(N)" }, // 21: line 10
        { n: 10, counter: 10, i: 10, temp: undefined, comp: "O(N)" }, // 22: line 9 (fals)
        { n: 10, counter: 10, i: 10, temp: 10, comp: "O(log N)" }, // 23: line 14
        { n: 10, counter: 10, i: 10, temp: 10, comp: "O(log N)" }, // 24: line 15
        { n: 10, counter: 10, i: 10, temp: 5, comp: "O(log N)" }, // 25: line 16
        { n: 10, counter: 11, i: 10, temp: 5, comp: "O(log N)" }, // 26: line 17
        { n: 10, counter: 11, i: 10, temp: 5, comp: "O(log N)" }, // 27: line 15
        { n: 10, counter: 11, i: 10, temp: 2, comp: "O(log N)" }, // 28: line 16
        { n: 10, counter: 12, i: 10, temp: 2, comp: "O(log N)" }, // 29: line 17
        { n: 10, counter: 12, i: 10, temp: 2, comp: "O(log N)" }, // 30: line 15
        { n: 10, counter: 12, i: 10, temp: 1, comp: "O(log N)" }, // 31: line 16
        { n: 10, counter: 13, i: 10, temp: 1, comp: "O(log N)" }, // 32: line 17
        { n: 10, counter: 13, i: 10, temp: 1, comp: "O(log N)" }, // 33: line 15
        { n: 10, counter: 13, i: 10, temp: 0, comp: "O(log N)" }, // 34: line 16
        { n: 10, counter: 14, i: 10, temp: 0, comp: "O(log N)" }, // 35: line 17
        { n: 10, counter: 14, i: 10, temp: 0, comp: "O(log N)" }, // 36: line 15
        { n: 10, counter: 14, i: 10, temp: 0, comp: "O(log N)" }  // 37: line 20
      ];
      
      const curr = stepData[stepIndex] || stepData[stepData.length - 1];
      
      frames.push({ name: "main()", file: "main.cpp", line: activeLine || 5 });
      
      vars.push({ name: "n", type: "int", val: curr.n.toString(), expandable: false });
      vars.push({ name: "counter", type: "int", val: curr.counter.toString(), expandable: false });
      if (curr.i !== undefined) {
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
      }
      if (curr.temp !== undefined) {
        vars.push({ name: "temp", type: "int", val: curr.temp.toString(), expandable: false });
      }
      vars.push({ name: "complexity_class", type: "std::string", val: `"${curr.comp}"`, expandable: false });
      
      const inlineVal = `counter: ${curr.counter}, complexity: ${curr.comp}`;
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const stepData = [
        { n: 10, counter: 0, i: undefined, temp: undefined, comp: "N/A" },
        { n: 10, counter: 0, i: undefined, temp: undefined, comp: "N/A" },
        { n: 10, counter: 0, i: 0, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 1, i: 0, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 1, i: 1, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 2, i: 1, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 2, i: 2, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 3, i: 2, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 3, i: 3, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 4, i: 3, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 4, i: 4, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 5, i: 4, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 5, i: 5, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 6, i: 5, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 6, i: 6, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 7, i: 6, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 7, i: 7, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 8, i: 7, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 8, i: 8, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 9, i: 8, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 9, i: 9, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 10, i: 9, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 10, i: 10, temp: undefined, comp: "O(N)" },
        { n: 10, counter: 10, i: 10, temp: 10, comp: "O(log N)" },
        { n: 10, counter: 10, i: 10, temp: 10, comp: "O(log N)" },
        { n: 10, counter: 10, i: 10, temp: 5, comp: "O(log N)" },
        { n: 10, counter: 11, i: 10, temp: 5, comp: "O(log N)" },
        { n: 10, counter: 11, i: 10, temp: 5, comp: "O(log N)" },
        { n: 10, counter: 11, i: 10, temp: 2, comp: "O(log N)" },
        { n: 10, counter: 12, i: 10, temp: 2, comp: "O(log N)" },
        { n: 10, counter: 12, i: 10, temp: 2, comp: "O(log N)" },
        { n: 10, counter: 12, i: 10, temp: 1, comp: "O(log N)" },
        { n: 10, counter: 13, i: 10, temp: 1, comp: "O(log N)" },
        { n: 10, counter: 13, i: 10, temp: 1, comp: "O(log N)" },
        { n: 10, counter: 13, i: 10, temp: 0, comp: "O(log N)" },
        { n: 10, counter: 14, i: 10, temp: 0, comp: "O(log N)" },
        { n: 10, counter: 14, i: 10, temp: 0, comp: "O(log N)" },
        { n: 10, counter: 14, i: 10, temp: 0, comp: "O(log N)" }
      ];
      const curr = stepData[stepIndex];
      if (!curr) return null;
      if (lineNum === 9 && curr.i !== undefined) return `i: ${curr.i}`;
      if (lineNum === 10) return `counter: ${curr.counter}`;
      if (lineNum === 15 && curr.temp !== undefined) return `temp: ${curr.temp}`;
      if (lineNum === 16 && curr.temp !== undefined) return `temp: ${curr.temp}`;
      if (lineNum === 17) return `counter: ${curr.counter}`;
      return null;
    }
  }
};
