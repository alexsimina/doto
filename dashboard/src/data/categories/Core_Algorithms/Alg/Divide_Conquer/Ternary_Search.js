const arVal = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];

function generateTernarySearchBlocks(ar, left, right, mid1, mid2, key) {
  const arGroup = [];
  for (let idx = 0; idx < ar.length; idx++) {
    let active = idx === mid1 || idx === mid2;
    let sorted = ar[idx] === key && (idx >= left && idx <= right);
    let hidden = idx < left || idx > right;
    
    arGroup.push({
      val: ar[idx],
      active: active,
      sorted: sorted,
      hidden: hidden
    });
  }
  
  return [
    {
      label: "Vectorul căutării (L = " + left + ", R = " + right + ", cheie = " + key + ")",
      groups: [arGroup]
    }
  ];
}

const trace = [
  {
    line: 30,
    text: "Se începe execuția funcției main.",
    stack: ["main()"],
    vars: [],
    blocksVisual: []
  },
  {
    line: 31,
    text: "Se inițializează vectorul sortat de 15 elemente.",
    stack: ["main()"],
    vars: [{ name: "ar", type: "vector<int>", val: "size=15" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, -1)
  },
  {
    line: 32,
    text: "Definim cheia căutată key1 = 23.",
    stack: ["main()"],
    vars: [{ name: "key1", type: "int", val: "23" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, 23)
  },
  {
    line: 33,
    text: "Apelăm funcția ternarySearch pe întregul vector (de la indexul 0 la 14) cu cheia key = 23.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "14" }, { name: "key", type: "int", val: "23" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, 23)
  },
  {
    line: 7,
    text: "Verificăm condiția buclei: right >= left (14 >= 0) este adevărată.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "14" }, { name: "key", type: "int", val: "23" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, 23)
  },
  {
    line: 8,
    text: "Calculăm prima treime mid1 = left + (right - left) / 3 = 0 + 14 / 3 = 4. Valoarea este ar[4] = 9.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "14" }, { name: "mid1", type: "int", val: "4" }, { name: "key", type: "int", val: "23" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, -1, 23)
  },
  {
    line: 9,
    text: "Calculăm a doua treime mid2 = right - (right - left) / 3 = 14 - 14 / 3 = 10. Valoarea este ar[10] = 21.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "14" }, { name: "mid1", type: "int", val: "4" }, { name: "mid2", type: "int", val: "10" }, { name: "key", type: "int", val: "23" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 23)
  },
  {
    line: 11,
    text: "Verificăm dacă elementul căutat este la mid1 (ar[4] == 23 -> 9 == 23). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "4" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 23)
  },
  {
    line: 14,
    text: "Verificăm dacă elementul căutat este la mid2 (ar[10] == 23 -> 21 == 23). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid2", type: "int", val: "10" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 23)
  },
  {
    line: 18,
    text: "Verificăm dacă cheia este în prima treime: key < ar[mid1] (23 < 9). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "4" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 23)
  },
  {
    line: 20,
    text: "Verificăm dacă cheia este în a treia treime: key > ar[mid2] (23 > 21). Adevărat!",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid2", type: "int", val: "10" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 23)
  },
  {
    line: 21,
    text: "Deoarece cheia este mai mare ca ar[mid2], restrângem intervalul la dreapta: left = mid2 + 1 = 11.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "14" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, -1, -1, 23)
  },
  {
    line: 7,
    text: "Reluăm bucla. Verificăm condiția: right >= left (14 >= 11) este adevărată.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "14" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, -1, -1, 23)
  },
  {
    line: 8,
    text: "Calculăm mid1 = 11 + (14 - 11) / 3 = 12. Valoarea este ar[12] = 25.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "14" }, { name: "mid1", type: "int", val: "12" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, 12, -1, 23)
  },
  {
    line: 9,
    text: "Calculăm mid2 = 14 - (14 - 11) / 3 = 13. Valoarea este ar[13] = 27.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "14" }, { name: "mid1", type: "int", val: "12" }, { name: "mid2", type: "int", val: "13" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, 12, 13, 23)
  },
  {
    line: 11,
    text: "Verificăm dacă elementul este la mid1 (ar[12] == 23 -> 25 == 23). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "12" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, 12, 13, 23)
  },
  {
    line: 14,
    text: "Verificăm dacă elementul este la mid2 (ar[13] == 23 -> 27 == 23). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid2", type: "int", val: "13" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, 12, 13, 23)
  },
  {
    line: 18,
    text: "Verificăm dacă cheia este în prima treime: key < ar[mid1] (23 < 25). Adevărat!",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "12" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 14, 12, 13, 23)
  },
  {
    line: 19,
    text: "Deoarece cheia este mai mică, restrângem intervalul la stânga: right = mid1 - 1 = 11.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "11" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 11, -1, -1, 23)
  },
  {
    line: 7,
    text: "Reluăm bucla. Verificăm condiția: right >= left (11 >= 11) este adevărată.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "11" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 11, -1, -1, 23)
  },
  {
    line: 8,
    text: "Calculăm mid1 = 11 + 0 / 3 = 11. Valoarea este ar[11] = 23.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "11" }, { name: "mid1", type: "int", val: "11" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 11, 11, -1, 23)
  },
  {
    line: 9,
    text: "Calculăm mid2 = 11 - 0 / 3 = 11. Valoarea este tot ar[11] = 23.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "11" }, { name: "right", type: "int", val: "11" }, { name: "mid1", type: "int", val: "11" }, { name: "mid2", type: "int", val: "11" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 11, 11, 11, 23)
  },
  {
    line: 11,
    text: "Verificăm dacă elementul este la mid1 (ar[11] == 23 -> 23 == 23). Adevărat! Am găsit cheia.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "11" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 11, 11, 11, 23)
  },
  {
    line: 12,
    text: "Returnăm indexul 11.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 11, 11, 11, 11, 23)
  },
  {
    line: 33,
    text: "Revenim în main cu result1 = 11.",
    stack: ["main()"],
    vars: [{ name: "result1", type: "int", val: "11" }],
    blocksVisual: []
  },
  {
    line: 34,
    text: "Definim a doua cheie căutată key2 = 4 (care nu se află în vector).",
    stack: ["main()"],
    vars: [{ name: "key2", type: "int", val: "4" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, 4)
  },
  {
    line: 35,
    text: "Apelăm ternarySearch pe intervalul [0, 14] pentru key = 4.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "14" }, { name: "key", type: "int", val: "4" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, 4)
  },
  {
    line: 7,
    text: "Verificăm condiția buclei: right >= left (14 >= 0) este adevărată.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "14" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, -1, -1, 4)
  },
  {
    line: 8,
    text: "Calculăm mid1 = 4. Valoarea este ar[4] = 9.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "4" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, -1, 4)
  },
  {
    line: 9,
    text: "Calculăm mid2 = 10. Valoarea este ar[10] = 21.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "4" }, { name: "mid2", type: "int", val: "10" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 4)
  },
  {
    line: 11,
    text: "Verificăm dacă ar[mid1] == key (9 == 4). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 4)
  },
  {
    line: 14,
    text: "Verificăm dacă ar[mid2] == key (21 == 4). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 4)
  },
  {
    line: 18,
    text: "Verificăm dacă key < ar[mid1] (4 < 9). Adevărat! Cheia se află în prima treime.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 14, 4, 10, 4)
  },
  {
    line: 19,
    text: "Restrângem intervalul la stânga: right = mid1 - 1 = 3.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "3" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, -1, -1, 4)
  },
  {
    line: 7,
    text: "Verificăm condiția buclei: right >= left (3 >= 0). Adevărat.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "0" }, { name: "right", type: "int", val: "3" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, -1, -1, 4)
  },
  {
    line: 8,
    text: "Calculăm mid1 = 0 + 3 / 3 = 1. Valoarea este ar[1] = 3.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "1" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, -1, 4)
  },
  {
    line: 9,
    text: "Calculăm mid2 = 3 - 3 / 3 = 2. Valoarea este ar[2] = 5.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "mid1", type: "int", val: "1" }, { name: "mid2", type: "int", val: "2" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, 2, 4)
  },
  {
    line: 11,
    text: "Verificăm dacă ar[mid1] == key (3 == 4). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, 2, 4)
  },
  {
    line: 14,
    text: "Verificăm dacă ar[mid2] == key (5 == 4). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, 2, 4)
  },
  {
    line: 18,
    text: "Verificăm key < ar[mid1] (4 < 3). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, 2, 4)
  },
  {
    line: 20,
    text: "Verificăm key > ar[mid2] (4 > 5). Fals.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, 2, 4)
  },
  {
    line: 22,
    text: "Intrăm pe ramura else deoarece cheia se poate afla doar între mid1 și mid2.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: generateTernarySearchBlocks(arVal, 0, 3, 1, 2, 4)
  },
  {
    line: 23,
    text: "Actualizăm marginea stângă: left = mid1 + 1 = 2.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "2" }, { name: "right", type: "int", val: "3" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 2, 3, -1, -1, 4)
  },
  {
    line: 24,
    text: "Actualizăm marginea dreaptă: right = mid2 - 1 = 1.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "2" }, { name: "right", type: "int", val: "1" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 2, 1, -1, -1, 4)
  },
  {
    line: 7,
    text: "Verificăm condiția buclei: right >= left (1 >= 2) este falsă. Căutarea se oprește.",
    stack: ["ternarySearch()", "main()"],
    vars: [{ name: "left", type: "int", val: "2" }, { name: "right", type: "int", val: "1" }],
    blocksVisual: generateTernarySearchBlocks(arVal, 2, 1, -1, -1, 4)
  },
  {
    line: 27,
    text: "Elementul nu a fost găsit. Returnăm -1.",
    stack: ["ternarySearch()", "main()"],
    vars: [],
    blocksVisual: []
  },
  {
    line: 35,
    text: "Revenim în main cu result2 = -1.",
    stack: ["main()"],
    vars: [{ name: "result2", type: "int", val: "-1" }],
    blocksVisual: []
  },
  {
    line: 36,
    text: "Programul se încheie cu succes.",
    stack: ["main()"],
    vars: [],
    blocksVisual: []
  }
];

export const data = {
  presentation: `### Prezentare Generală

**Căutarea Ternară (Ternary Search)** este un algoritm bazat pe paradigma **Divide et Impera** (Divide and Conquer), fiind similar cu Căutarea Binară. Totuși, în loc de a împărți spațiul de căutare în două jumătăți, Căutarea Ternară îl împarte în **trei părți egale** folosind două puncte intermediare (midpoints), $mid1$ și $mid2$:

- $mid1 = L + \\frac{R - L}{3}$
- $mid2 = R - \\frac{R - L}{3}$

### Căutarea Ternară pe Funcții Unimodale

Cea mai mare utilitate practică a căutării ternare nu este căutarea în vectori sortați (unde căutarea binară este mai eficientă deoarece face mai puține comparații per pas), ci **găsirea extremelor (minim sau maxim) ale unei funcții unimodale**.

O funcție $f$ este **unimodală** pe un interval $[L, R]$ dacă crește monoton până la un punct de maxim, iar apoi scade monoton (sau invers pentru minim).
Pentru a găsi maximul unei funcții unimodale:
1. Calculăm $mid1$ și $mid2$ în interiorul intervalului $[L, R]$.
2. Comparăm valorile funcției:
   - Dacă $f(mid1) < f(mid2)$, atunci maximul nu se poate afla în intervalul $[L, mid1]$. Putem elimina această treime setând $L = mid1$.
   - Dacă $f(mid1) > f(mid2)$, atunci maximul nu se poate afla în intervalul $[mid2, R]$. Eliminăm această treime setând $R = mid2$.
   - Dacă sunt egale, putem restrânge din ambele părți: $L = mid1$ și $R = mid2$.`,

  complexity: `### Complexitate de Timp

- **Cazul Favorabil:** $\\mathcal{O}(1)$ (când elementul este găsit direct la unul dintre mijlocuri).
- **Cazul Mediu / Defavorabil:** $\\mathcal{O}(\\log_3 N)$ comparații.
  La fiecare pas, dimensiunea intervalului se micșorează cu un factor de $\\frac{2}{3}$. Relația de recurență este:
  $$T(N) = T\\left(\\frac{2N}{3}\\right) + \\mathcal{O}(1)$$
  ceea ce conduce conform Master Theorem la o complexitate de $\\mathcal{O}(\\log_3 N)$.

### Complexitate Spațială

- **$\\mathcal{O}(1)$** pentru varianta iterativă, utilizând doar pointerii $L$ și $R$.`,

  variations: `### Variații și Comparație cu Căutarea Binară

Deși Căutarea Ternară împarte intervalul în 3 subintervale, ea necesită **două comparații** la fiecare pas, comparativ cu o singură comparație în Căutarea Binară.
Numărul de comparații în cel mai rău caz:
- Căutare Binară: $2 \\cdot \\log_2 N$ (sau chiar $\\log_2 N$)
- Căutare Ternară: $4 \\cdot \\log_3 N$ (deoarece facem două verificări de egalitate și una de inegalitate).
Deoarece $2 \\cdot \\log_2 N \\approx 2 \\cdot 1.44 \\ln N = 2.88 \\ln N$ și $4 \\cdot \\log_3 N \\approx 4 \\cdot 0.91 \\ln N = 3.64 \\ln N$, căutarea binară efectuează mai puține comparații per total pe vectori sortați. De aceea, pe vectori se preferă căutarea binară, în timp ce pe funcții continue unimodale se preferă căutarea ternară.`,

  applications: `### Aplicații Practice

- **Optimizări geometrice:** Găsirea distanței minime dintre o linie și o curbă sau între două obiecte în mișcare.
- **Grafică 3D și Fizică:** Determinarea punctului cel mai apropiat pe o traiectorie curbă sau determinarea momentului optim de coliziune.
- **Machine Learning / Statistici:** Optimizarea parametrilor unimodali (cum ar fi rata de învățare în anumite modele simplificate).`,

  code: `#include <iostream>
#include <vector>

using namespace std;

int ternarySearch(int left, int right, int key, const vector<int>& ar) {
    while (right >= left) {
        int mid1 = left + (right - left) / 3;
        int mid2 = right - (right - left) / 3;
        
        if (ar[mid1] == key) {
            return mid1;
        }
        if (ar[mid2] == key) {
            return mid2;
        }
        
        if (key < ar[mid1]) {
            right = mid1 - 1;
        } else if (key > ar[mid2]) {
            left = mid2 + 1;
        } else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> ar = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29};
    int key1 = 23;
    int result1 = ternarySearch(0, ar.size() - 1, key1, ar);
    int key2 = 4;
    int result2 = ternarySearch(0, ar.size() - 1, key2, ar);
    return 0;
}
`,

  explanations: trace.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: step.blocksVisual
  })),

  problems: {
    easy: [
      {
        title: "Ternary Search (GeeksforGeeks)",
        url: "https://www.geeksforgeeks.org/ternary-search/",
        desc: "Implementarea de bază și compararea practică cu Binary Search."
      }
    ],
    medium: [
      {
        title: "Peak Index in a Mountain Array",
        url: "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
        desc: "Găsirea vârfului unui array de tip munte (funcție unimodală discretă)."
      },
      {
        title: "Find Peak Element",
        url: "https://leetcode.com/problems/find-peak-element/",
        desc: "Găsirea unui element de tip vârf într-un array unimodal pe porțiuni."
      }
    ],
    hard: [
      {
        title: "Valori (Infoarena)",
        url: "https://www.infoarena.ro/problema/valori",
        desc: "O problemă complexă de optimizare geometrică rezolvabilă optim folosind căutarea ternară pe funcții."
      }
    ]
  },

  globalVars: [],

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const step = trace[stepIndex] || trace[trace.length - 1];
      const vars = step.vars.map(v => ({ name: v.name, type: v.type, val: v.val, expandable: false }));
      const globalVars = [];
      const frames = step.stack.map(fName => ({ name: fName, file: "solution.cpp", line: activeLine }));
      
      let inlineVal = "";
      if (step.vars.length > 0) {
        inlineVal = step.vars.map(v => `${v.name}: ${v.val}`).join(", ");
      }
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const step = trace[stepIndex];
      if (!step) return null;
      if (step.line === lineNum) {
        if (step.vars.length > 0) {
          return step.vars.map(v => `${v.name}: ${v.val}`).join(", ");
        }
      }
      return null;
    }
  }
};
