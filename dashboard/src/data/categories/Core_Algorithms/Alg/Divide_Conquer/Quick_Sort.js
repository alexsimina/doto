export const data = {
  "presentation": "### Prezentare Generală\n\nQuick Sort este probabil cel mai faimos algoritm de sortare practic (de unde și cuvântul 'Quick'). Deși asimptotic (pe hârtie) Worst-Case-ul lui este mai slab decât al Merge Sort, în realitate, cu mici optimizări (ca alegerea randomizată a pivotului), bate majoritatea algoritmilor de sortare!\n\nIdeea sa este să aleagă un element numit 'Pivot' și să 'partiționeze' șirul: toate elementele mai mici decât pivotul merg în stânga sa, și toate cele mai mari merg în dreapta sa. După acest proces, știm clar că Pivotul este la poziția sa finală! Apoi, aplicăm recursiv Quick Sort pe partea stângă și pe partea dreaptă.",
  "complexity": "### Complexitate\n\n- **Timp:** O(N log N) în caz mediu (Average Case) și optim. O(N^2) în cel mai rău caz (Worst Case), care apare când vectorul este deja sortat și alegem sistematic primul sau ultimul element ca pivot. Randomizarea pivotului elimină practic șansa unui O(N^2).\n- **Spațiu:** O(1) memorie auxiliară (sortează 'in-place'). Pe stiva de apeluri folosește O(log N) spațiu.\n",
  "variations": "### Variații și Edge Cases\n\n1. Randomized Quick Sort: Algoritmul standard folosește un rand() pentru a alege pivotul, anulând vulnerabilitățile worst-case.\n2. Quick Select (K-th Element): Putem afla al K-lea cel mai mic element în O(N) folosind logica de partiționare a Quick Sort, fără să sortăm integral vectorul (căutăm doar în stânga sau în dreapta pivotului!).\n3. 3-Way Quick Sort (Dijkstra 3-way partitioning): Optim pentru vectori cu extrem de multe duplicate (grupează '<, ==, >').",
  "applications": "### Aplicații\n\nFuncția qsort() din C și funcțiile similare din alte limbaje s-au bazat decenii la rând pe acest algoritm. Reprezintă de asemenea soluția standard când ai memorie RAM extrem de strictă și Merge Sort e inacceptabil din cauza O(N) aux space.",
  code: `#include <iostream>
#include <vector>

using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1);
  
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, arr.size() - 1);
    cout << "Array sortat cu Quick Sort: ";
    for(int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}
`,
  "explanations": [
    {
      "line": 20,
      "text": "Apelăm quickSort pentru întreg intervalul (low=0, high=5). Vectorul nesortat este [10, 7, 8, 9, 1, 5].",
      "blocksVisual": [
        { "label": "Vectorul", "groups": [[{"val": 10}, {"val": 7}, {"val": 8}, {"val": 9}, {"val": 1}, {"val": 5}]] }
      ]
    },
    {
      "line": 21,
      "text": "Verificăm condiția low < high (0 < 5), care este adevărată.",
      "blocksVisual": [
        { "label": "Verificare", "groups": [[{"val": "0 < 5 (Adevărat)"}]] }
      ]
    },
    {
      "line": 22,
      "text": "Apelăm partition(arr, 0, 5) pentru a poziționa un element pivot la locul său final.",
      "blocksVisual": [
        { "label": "Partiționare", "groups": [[{"val": 10, "active": true}, {"val": 7, "active": true}, {"val": 8, "active": true}, {"val": 9, "active": true}, {"val": 1, "active": true}, {"val": 5, "active": true}]] }
      ]
    },
    {
      "line": 7,
      "text": "Alegem ultimul element ca pivot: pivot = arr[5] = 5.",
      "blocksVisual": [
        { "label": "Pivot = 5", "groups": [[{"val": 10}, {"val": 7}, {"val": 8}, {"val": 9}, {"val": 1}, {"val": 5, "sorted": true}]] }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm indicele elementului mai mic: i = low - 1 = -1.",
      "blocksVisual": [
        { "label": "Indice i", "groups": [[{"val": "i = -1"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în buclă. j = 0: Comparăm arr[0] (10) cu pivotul (5). Deoarece 10 > 5, nu facem nimic.",
      "blocksVisual": [
        { "label": "Comparație j=0", "groups": [[{"val": 10, "active": true}, {"val": 7}, {"val": 8}, {"val": 9}, {"val": 1}, {"val": 5}]] }
      ]
    },
    {
      "line": 11,
      "text": "j = 1: Comparăm arr[1] (7) cu pivotul (5). Deoarece 7 > 5, nu facem nimic.",
      "blocksVisual": [
        { "label": "Comparație j=1", "groups": [[{"val": 10}, {"val": 7, "active": true}, {"val": 8}, {"val": 9}, {"val": 1}, {"val": 5}]] }
      ]
    },
    {
      "line": 11,
      "text": "j = 2: Comparăm arr[2] (8) cu pivotul (5). Deoarece 8 > 5, nu facem nimic.",
      "blocksVisual": [
        { "label": "Comparație j=2", "groups": [[{"val": 10}, {"val": 7}, {"val": 8, "active": true}, {"val": 9}, {"val": 1}, {"val": 5}]] }
      ]
    },
    {
      "line": 11,
      "text": "j = 3: Comparăm arr[3] (9) cu pivotul (5). Deoarece 9 > 5, nu facem nimic.",
      "blocksVisual": [
        { "label": "Comparație j=3", "groups": [[{"val": 10}, {"val": 7}, {"val": 8}, {"val": 9, "active": true}, {"val": 1}, {"val": 5}]] }
      ]
    },
    {
      "line": 11,
      "text": "j = 4: Comparăm arr[4] (1) cu pivotul (5). Deoarece 1 < 5, incrementăm i la 0.",
      "blocksVisual": [
        { "label": "Comparație j=4", "groups": [[{"val": 10}, {"val": 7}, {"val": 8}, {"val": 9}, {"val": 1, "active": true}, {"val": 5}]] }
      ]
    },
    {
      "line": 13,
      "text": "Facem swap între arr[i] (arr[0] = 10) și arr[j] (arr[4] = 1). Vectorul devine [1, 7, 8, 9, 10, 5].",
      "blocksVisual": [
        { "label": "După swap j=4", "groups": [[{"val": 1, "sorted": true}, {"val": 7}, {"val": 8}, {"val": 9}, {"val": 10}, {"val": 5}]] }
      ]
    },
    {
      "line": 16,
      "text": "Ieșim din buclă. Facem swap între primul element mai mare (arr[1] = 7) și pivotul (arr[5] = 5).",
      "blocksVisual": [
        { "label": "Fixare Pivot", "groups": [[{"val": 1}, {"val": 5, "sorted": true}, {"val": 8}, {"val": 9}, {"val": 10}, {"val": 7}]] }
      ]
    },
    {
      "line": 17,
      "text": "Returnăm indicele pivotului: pi = 1.",
      "blocksVisual": [
        { "label": "Pivot returnat", "groups": [[{"val": "pi = 1"}]] }
      ]
    },
    {
      "line": 23,
      "text": "Apelăm recursiv quickSort(arr, low=0, pi-1=0). Deoarece low >= high (0 >= 0), apelul returnează imediat.",
      "blocksVisual": [
        { "label": "Jumătatea stângă sortată", "groups": [[{"val": 1, "sorted": true}, {"val": 5, "sorted": true}]] }
      ]
    },
    {
      "line": 24,
      "text": "Apelăm recursiv quickSort(arr, pi+1=2, high=5) pentru intervalul [8, 9, 10, 7].",
      "blocksVisual": [
        { "label": "Apel quickSort(2, 5)", "groups": [[{"val": 1, "hidden": true}, {"val": 5, "hidden": true}, {"val": 8, "active": true}, {"val": 9, "active": true}, {"val": 10, "active": true}, {"val": 7, "active": true}]] }
      ]
    },
    {
      "line": 7,
      "text": "Alegem noul pivot: pivot = arr[5] = 7.",
      "blocksVisual": [
        { "label": "Pivot = 7", "groups": [[{"val": 8}, {"val": 9}, {"val": 10}, {"val": 7, "sorted": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Iterăm j de la 2 la 4. Toate valorile (8, 9, 10) sunt mai mari ca 7. Niciun swap în buclă.",
      "blocksVisual": [
        { "label": "Iterare", "groups": [[{"val": 8}, {"val": 9}, {"val": 10}, {"val": 7}]] }
      ]
    },
    {
      "line": 16,
      "text": "Swap între arr[2] (8) și pivot (7). Vectorul devine [1, 5, 7, 9, 10, 8]. Pivotul 7 este acum la poziția finală index 2.",
      "blocksVisual": [
        { "label": "Pivot 7 fixat", "groups": [[{"val": 1, "sorted": true}, {"val": 5, "sorted": true}, {"val": 7, "sorted": true}, {"val": 9}, {"val": 10}, {"val": 8}]] }
      ]
    },
    {
      "line": 23,
      "text": "Apelăm quickSort pentru stânga lui 7 (low=2, high=1). Returnează imediat.",
      "blocksVisual": [
        { "label": "Retur stânga", "groups": [[{"val": "Niciun element"}]] }
      ]
    },
    {
      "line": 24,
      "text": "Apelăm quickSort pentru dreapta lui 7 (low=3, high=5). Intervalul este [9, 10, 8].",
      "blocksVisual": [
        { "label": "Apel quickSort(3, 5)", "groups": [[{"val": 9, "active": true}, {"val": 10, "active": true}, {"val": 8, "active": true}]] }
      ]
    },
    {
      "line": 16,
      "text": "Pentru sub-intervalul [9, 10, 8], pivotul este 8. Deoarece 9 > 8 și 10 > 8, după buclă facem swap între 9 și 8. Vectorul devine [1, 5, 7, 8, 10, 9].",
      "blocksVisual": [
        { "label": "Pivot 8 fixat", "groups": [[{"val": 1, "sorted": true}, {"val": 5, "sorted": true}, {"val": 7, "sorted": true}, {"val": 8, "sorted": true}, {"val": 10}, {"val": 9}]] }
      ]
    },
    {
      "line": 24,
      "text": "Apelăm quickSort pentru dreapta lui 8: low=4, high=5. Intervalul este [10, 9].",
      "blocksVisual": [
        { "label": "Apel quickSort(4, 5)", "groups": [[{"val": 10, "active": true}, {"val": 9, "active": true}]] }
      ]
    },
    {
      "line": 16,
      "text": "Pivotul este 9. Deoarece 10 > 9, facem swap între 10 și 9. Pivotul 9 este fixat.",
      "blocksVisual": [
        { "label": "Pivot 9 fixat", "groups": [[{"val": 1, "sorted": true}, {"val": 5, "sorted": true}, {"val": 7, "sorted": true}, {"val": 8, "sorted": true}, {"val": 9, "sorted": true}, {"val": 10}]] }
      ]
    },
    {
      "line": 25,
      "text": "Toate elementele au fost vizitate și partiționate corect. Vectorul este complet sortat!",
      "blocksVisual": [
        { "label": "Sortare Finalizată", "groups": [[{"val": 1, "sorted": true}, {"val": 5, "sorted": true}, {"val": 7, "sorted": true}, {"val": 8, "sorted": true}, {"val": 9, "sorted": true}, {"val": 10, "sorted": true}]] }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Sort an Array",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "desc": "Folosind Quick Sort"
      }
    ],
    "medium": [
      {
        "title": "Kth Largest Element",
        "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "desc": "Quick Select, optim O(N)"
      },
      {
        "title": "Sort Colors (0 1 2)",
        "url": "https://leetcode.com/problems/sort-colors/",
        "desc": "3-Way Partitioning/Dutch Flag"
      }
    ],
    "hard": [
      {
        "title": "Median of Array (O(N))",
        "url": "https://www.infoarena.ro/problema/sdo",
        "desc": "Selecție de ordine"
      }
    ]
  },
  globalVars: [],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const stepData = [
        { active: "quickSort", stack: [{l:0, h:5}], low: 0, high: 5 }, // 0
        { active: "quickSort", stack: [{l:0, h:5}], low: 0, high: 5 }, // 1
        { active: "quickSort", stack: [{l:0, h:5}], low: 0, high: 5 }, // 2
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: -1, j: -1 }, // 3
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: -1, j: -1 }, // 4
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: -1, j: 0 },  // 5
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: -1, j: 1 },  // 6
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: -1, j: 2 },  // 7
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: -1, j: 3 },  // 8
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: 0,  j: 4 },  // 9
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: 0,  j: 4 },  // 10
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: 0,  j: 5 },  // 11
        { active: "partition", stack: [{l:0, h:5}], low: 0, high: 5, pivot: 5, i: 1,  j: 5 },  // 12
        { active: "quickSort", stack: [{l:0, h:0}, {l:0, h:5}], low: 0, high: 0 }, // 13
        { active: "quickSort", stack: [{l:2, h:5}, {l:0, h:5}], low: 2, high: 5 }, // 14
        { active: "partition", stack: [{l:2, h:5}, {l:0, h:5}], low: 2, high: 5, pivot: 7, i: 1, j: -1 }, // 15
        { active: "partition", stack: [{l:2, h:5}, {l:0, h:5}], low: 2, high: 5, pivot: 7, i: 1, j: 4 },  // 16
        { active: "partition", stack: [{l:2, h:5}, {l:0, h:5}], low: 2, high: 5, pivot: 7, i: 2, j: 5 },  // 17
        { active: "quickSort", stack: [{l:2, h:1}, {l:2, h:5}, {l:0, h:5}], low: 2, high: 1 }, // 18
        { active: "quickSort", stack: [{l:3, h:5}, {l:2, h:5}, {l:0, h:5}], low: 3, high: 5 }, // 19
        { active: "partition", stack: [{l:3, h:5}, {l:2, h:5}, {l:0, h:5}], low: 3, high: 5, pivot: 8, i: 3, j: 5 }, // 20
        { active: "quickSort", stack: [{l:4, h:5}, {l:3, h:5}, {l:2, h:5}, {l:0, h:5}], low: 4, high: 5 }, // 21
        { active: "partition", stack: [{l:4, h:5}, {l:3, h:5}, {l:2, h:5}, {l:0, h:5}], low: 4, high: 5, pivot: 9, i: 4, j: 5 }, // 22
        { active: "quickSort", stack: [], low: 0, high: 5 } // 23
      ];

      const curr = stepData[stepIndex] || stepData[stepData.length - 1];

      if (curr.active === "partition") {
        frames.push({ name: "partition(arr, low=" + curr.low + ", high=" + curr.high + ")", file: "solution.cpp", line: activeLine });
      }
      curr.stack.forEach((frame) => {
        frames.push({ name: "quickSort(arr, low=" + frame.l + ", high=" + frame.h + ")", file: "solution.cpp", line: 22 });
      });
      frames.push({ name: "main()", file: "main.cpp", line: 30 });

      vars.push({ name: "arr", type: "std::vector<int>&", val: "size = 6", expandable: true });

      if (curr.active === "quickSort") {
        vars.push({ name: "low", type: "int", val: curr.low.toString(), expandable: false });
        vars.push({ name: "high", type: "int", val: curr.high.toString(), expandable: false });
        inlineVal = "low: " + curr.low + ", high: " + curr.high;
      } else if (curr.active === "partition") {
        vars.push({ name: "low", type: "int", val: curr.low.toString(), expandable: false });
        vars.push({ name: "high", type: "int", val: curr.high.toString(), expandable: false });
        vars.push({ name: "pivot", type: "int", val: curr.pivot.toString(), expandable: false });
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
        if (curr.j !== -1) {
          vars.push({ name: "j", type: "int", val: curr.j.toString(), expandable: false });
        }
        inlineVal = "pivot: " + curr.pivot + ", i: " + curr.i;
        if (curr.j !== -1) inlineVal += ", j: " + curr.j;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      if (stepIndex >= 3 && stepIndex <= 12) {
        if (lineNum >= 6 && lineNum <= 18) return "pivot: 5, i: 0";
      }
      return null;
    }
  }
};
