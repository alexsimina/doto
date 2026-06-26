export const data = {
  "presentation": "### Prezentare Generală\n\nMerge Sort este un algoritm de sortare clasic și foarte eficient, bazat pe Divide et Impera. Se bazează pe o idee extrem de elegantă: e foarte ușor să unești (interclasezi) două șiruri deja sortate într-unul singur, tot sortat.\n\nLogica principală: înjumătățim constant șirul până ajungem la elemente individuale (care, fiind singure, sunt implicit 'sortate'). Apoi le combinăm înapoi două câte două, menținând ordinea la fiecare pas.\n\nCaracteristica sa de bază este stabilitatea. Un algoritm stabil garantează că elementele cu valori egale își păstrează ordinea relativă inițială după sortare (esențial când sortezi obiecte după atribute multiple).",
  "complexity": "### Complexitate\n\n- **Timp:** O(N log N) în orice caz (Best, Average, Worst). E garantat să nu degenereze în O(N^2) precum Quick Sort.\n- **Spațiu:** O(N) memorie auxiliară. Acesta este marele dezavantaj al Merge Sort – necesită vectori auxiliari pentru interclasare.\n",
  "variations": "### Variații și Edge Cases\n\n1. Inversion Count (Numărarea inversiunilor): Cea mai populară aplicație a algoritmului.\n2. Bottom-up Merge Sort: Fără recursivitate, unește direct perechi de lungime 1, apoi 2, 4 etc.",
  "applications": "### Aplicații\n\nMerge Sort este algoritmul preferat pentru structurile de date Linked Lists, unde inserarea la mijloc se face în O(1) și nu avem nevoie de un vector auxiliar suplimentar masiv.",
  code: `#include <iostream>
#include <vector>

using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
        
    int mid = left + (right - left) / 2;
    
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    merge(arr, left, mid, right);
}

int main() {
    vector<int> arr = {38, 27, 43, 3};
    mergeSort(arr, 0, arr.size() - 1);
    cout << "Array sortat: ";
    for(int x : arr) cout << x << " ";
    cout << "\\n";
    return 0;
}
`,
  "explanations": [
    {
      "line": 31,
      "text": "Începem cu un vector inițial neordonat.",
      "blocksVisual": [
        { "label": "Vector Inițial", "groups": [[{"val": 38}, {"val": 27}, {"val": 43}, {"val": 3}]] }
      ]
    },
    {
      "line": 31,
      "text": "Apelăm mergeSort pentru întreg vectorul (left=0, right=3).",
      "blocksVisual": [
        { "label": "Apel mergeSort(0, 3)", "groups": [[{"val": 38, "active": true}, {"val": 27, "active": true}, {"val": 43, "active": true}, {"val": 3, "active": true}]] }
      ]
    },
    {
      "line": 32,
      "text": "Verificăm dacă left >= right. Deoarece 0 < 3, continuăm.",
      "blocksVisual": [
        { "label": "Verificare", "groups": [[{"val": "0 >= 3 (Fals)"}]] }
      ]
    },
    {
      "line": 34,
      "text": "Etapa DIVIDE: Calculăm mijlocul: mid = 0 + (3-0)/2 = 1.",
      "blocksVisual": [
        { "label": "Mijloc (mid = 1)", "groups": [[{"val": 38}, {"val": 27, "sorted": true}, {"val": 43}, {"val": 3}]] }
      ]
    },
    {
      "line": 36,
      "text": "Apelăm recursiv mergeSort pe prima jumătate (left=0, right=1).",
      "blocksVisual": [
        { "label": "Apel mergeSort(0, 1)", "groups": [[{"val": 38, "active": true}, {"val": 27, "active": true}, {"val": 43, "hidden": true}, {"val": 3, "hidden": true}]] }
      ]
    },
    {
      "line": 34,
      "text": "Calculăm mijlocul pentru acest subinterval: mid = 0 + (1-0)/2 = 0.",
      "blocksVisual": [
        { "label": "Mijloc (mid = 0)", "groups": [[{"val": 38, "sorted": true}, {"val": 27}]] }
      ]
    },
    {
      "line": 32,
      "text": "Apelăm mergeSort(0, 0). Acesta returnează imediat deoarece left >= right (0 >= 0).",
      "blocksVisual": [
        { "label": "Caz de bază (0, 0)", "groups": [[{"val": 38, "sorted": true}]] }
      ]
    },
    {
      "line": 32,
      "text": "Apelăm mergeSort(1, 1). Returnează de asemenea deoarece left >= right (1 >= 1).",
      "blocksVisual": [
        { "label": "Caz de bază (1, 1)", "groups": [[{"val": 27, "sorted": true}]] }
      ]
    },
    {
      "line": 39,
      "text": "Apelăm merge(arr, left=0, mid=0, right=1) pentru a interclasa sub-vectorii.",
      "blocksVisual": [
        { "label": "Interclasare stânga", "groups": [[{"val": 38, "active": true}, {"val": 27, "active": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm vectorii auxiliari L = {38} și R = {27}.",
      "blocksVisual": [
        { "label": "L", "groups": [[{"val": 38}]] },
        { "label": "R", "groups": [[{"val": 27}]] }
      ]
    },
    {
      "line": 16,
      "text": "Intrăm în bucla while. Indicii i = 0, j = 0. Condiția i < 1 && j < 1 este adevărată.",
      "blocksVisual": [
        { "label": "Buclă", "groups": [[{"val": "i=0, j=0"}]] }
      ]
    },
    {
      "line": 17,
      "text": "Comparăm L[0] (38) cu R[0] (27). Deoarece 38 > 27, mergem pe ramura else.",
      "blocksVisual": [
        { "label": "Comparație", "groups": [[{"val": "38 <= 27 (Fals)"}]] }
      ]
    },
    {
      "line": 21,
      "text": "Copiem valoarea din R în vectorul original: arr[0] = 27. Incrementăm j la 1.",
      "blocksVisual": [
        { "label": "Vector Original", "groups": [[{"val": 27, "sorted": true}, {"val": 38}]] }
      ]
    },
    {
      "line": 27,
      "text": "Bucla while s-a terminat deoarece j = 1. Copiem elementele rămase din L: arr[1] = 38.",
      "blocksVisual": [
        { "label": "Vector interclasat (0, 1)", "groups": [[{"val": 27, "sorted": true}, {"val": 38, "sorted": true}]] }
      ]
    },
    {
      "line": 37,
      "text": "Revenim în apelul principal și apelăm mergeSort pe a doua jumătate (left=2, right=3).",
      "blocksVisual": [
        { "label": "Apel mergeSort(2, 3)", "groups": [[{"val": 27, "hidden": true}, {"val": 38, "hidden": true}, {"val": 43, "active": true}, {"val": 3, "active": true}]] }
      ]
    },
    {
      "line": 39,
      "text": "După apelurile recursive pentru 43 și 3, apelăm merge(arr, left=2, mid=2, right=3).",
      "blocksVisual": [
        { "label": "Interclasare dreapta", "groups": [[{"val": 43, "active": true}, {"val": 3, "active": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm vectorii auxiliari: L = {43}, R = {3}.",
      "blocksVisual": [
        { "label": "L", "groups": [[{"val": 43}]] },
        { "label": "R", "groups": [[{"val": 3}]] }
      ]
    },
    {
      "line": 17,
      "text": "Comparăm L[0] (43) cu R[0] (3). Deoarece 43 > 3, copiem 3 în arr[2] și incrementăm j.",
      "blocksVisual": [
        { "label": "Vector Original", "groups": [[{"val": 27}, {"val": 38}, {"val": 3, "sorted": true}, {"val": 43}]] }
      ]
    },
    {
      "line": 27,
      "text": "Copiem elementele rămase din L: arr[3] = 43.",
      "blocksVisual": [
        { "label": "Vector interclasat (2, 3)", "groups": [[{"val": 3, "sorted": true}, {"val": 43, "sorted": true}]] }
      ]
    },
    {
      "line": 39,
      "text": "Acum că ambele jumătăți sunt sortate ([27, 38] și [3, 43]), apelăm merge(0, 1, 3).",
      "blocksVisual": [
        { "label": "Stânga", "groups": [[{"val": 27, "sorted": true}, {"val": 38, "sorted": true}]] },
        { "label": "Dreapta", "groups": [[{"val": 3, "sorted": true}, {"val": 43, "sorted": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm L = {27, 38} și R = {3, 43}.",
      "blocksVisual": [
        { "label": "L", "groups": [[{"val": 27}, {"val": 38}]] },
        { "label": "R", "groups": [[{"val": 3}, {"val": 43}]] }
      ]
    },
    {
      "line": 17,
      "text": "Comparăm L[0] (27) cu R[0] (3). Deoarece 3 < 27, copiem 3 în arr[0]. j devine 1, k devine 1.",
      "blocksVisual": [
        { "label": "Alegem 3", "groups": [[{"val": 3, "sorted": true}, {"val": "?", "hidden": true}, {"val": "?", "hidden": true}, {"val": "?", "hidden": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Comparăm L[0] (27) cu R[1] (43). Deoarece 27 < 43, copiem 27 în arr[1]. i devine 1, k devine 2.",
      "blocksVisual": [
        { "label": "Alegem 27", "groups": [[{"val": 3, "sorted": true}, {"val": 27, "sorted": true}, {"val": "?", "hidden": true}, {"val": "?", "hidden": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Comparăm L[1] (38) cu R[1] (43). Deoarece 38 < 43, copiem 38 în arr[2]. i devine 2, k devine 3.",
      "blocksVisual": [
        { "label": "Alegem 38", "groups": [[{"val": 3, "sorted": true}, {"val": 27, "sorted": true}, {"val": 38, "sorted": true}, {"val": "?", "hidden": true}]] }
      ]
    },
    {
      "line": 28,
      "text": "L s-a terminat. Copiem elementele rămase din R: arr[3] = 43. Vectorul este complet sortat!",
      "blocksVisual": [
        { "label": "FINAL", "groups": [[{"val": 3, "sorted": true}, {"val": 27, "sorted": true}, {"val": 38, "sorted": true}, {"val": 43, "sorted": true}]] }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Sort an Array",
        "url": "https://leetcode.com/problems/sort-an-array/",
        "desc": "Problemă standard"
      },
      {
        "title": "Merge Two Sorted Lists",
        "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
        "desc": "Punctul cheie (merge)"
      }
    ],
    "medium": [
      {
        "title": "Sort List",
        "url": "https://leetcode.com/problems/sort-list/",
        "desc": "Merge Sort pe liste O(1) memorie"
      },
      {
        "title": "Inversion Count",
        "url": "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1",
        "desc": "Aplicația numărul 1"
      }
    ],
    "hard": [
      {
        "title": "Count of Range Sum",
        "url": "https://leetcode.com/problems/count-of-range-sum/",
        "desc": "Merge Sort modificat"
      },
      {
        "title": "Reverse Pairs",
        "url": "https://leetcode.com/problems/reverse-pairs/",
        "desc": "Variație la Inversiuni"
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
        { stack: [], active: "main", left: 0, right: 3 }, // 0
        { stack: [{l:0, r:3}], active: "mergeSort", left: 0, right: 3, mid: -1 }, // 1
        { stack: [{l:0, r:3}], active: "mergeSort", left: 0, right: 3, mid: -1 }, // 2
        { stack: [{l:0, r:3}], active: "mergeSort", left: 0, right: 3, mid: 1 },  // 3
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "mergeSort", left: 0, right: 1, mid: -1 }, // 4
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "mergeSort", left: 0, right: 1, mid: 0 },  // 5
        { stack: [{l:0, r:0}, {l:0, r:1}, {l:0, r:3}], active: "mergeSort", left: 0, right: 0, mid: -1 }, // 6
        { stack: [{l:1, r:1}, {l:0, r:1}, {l:0, r:3}], active: "mergeSort", left: 1, right: 1, mid: -1 }, // 7
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "mergeSort", left: 0, right: 1, mid: 0 }, // 8
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "merge", lStart: 0, lMid: 0, lEnd: 1, L: [38], R: [27], i: 0, j: 0, k: 0 }, // 9
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "merge", lStart: 0, lMid: 0, lEnd: 1, L: [38], R: [27], i: 0, j: 0, k: 0 }, // 10
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "merge", lStart: 0, lMid: 0, lEnd: 1, L: [38], R: [27], i: 0, j: 0, k: 0 }, // 11
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "merge", lStart: 0, lMid: 0, lEnd: 1, L: [38], R: [27], i: 0, j: 1, k: 1 }, // 12
        { stack: [{l:0, r:1}, {l:0, r:3}], active: "merge", lStart: 0, lMid: 0, lEnd: 1, L: [38], R: [27], i: 1, j: 1, k: 2 }, // 13
        { stack: [{l:2, r:3}, {l:0, r:3}], active: "mergeSort", left: 2, right: 3, mid: -1 }, // 14
        { stack: [{l:2, r:3}, {l:0, r:3}], active: "mergeSort", left: 2, right: 3, mid: 2 },  // 15
        { stack: [{l:2, r:3}, {l:0, r:3}], active: "merge", lStart: 2, lMid: 2, lEnd: 3, L: [43], R: [3], i: 0, j: 0, k: 2 }, // 16
        { stack: [{l:2, r:3}, {l:0, r:3}], active: "merge", lStart: 2, lMid: 2, lEnd: 3, L: [43], R: [3], i: 0, j: 1, k: 3 }, // 17
        { stack: [{l:2, r:3}, {l:0, r:3}], active: "merge", lStart: 2, lMid: 2, lEnd: 3, L: [43], R: [3], i: 1, j: 1, k: 4 }, // 18
        { stack: [{l:0, r:3}], active: "mergeSort", left: 0, right: 3, mid: 1 }, // 19
        { stack: [{l:0, r:3}], active: "merge", lStart: 0, lMid: 1, lEnd: 3, L: [27, 38], R: [3, 43], i: 0, j: 0, k: 0 }, // 20
        { stack: [{l:0, r:3}], active: "merge", lStart: 0, lMid: 1, lEnd: 3, L: [27, 38], R: [3, 43], i: 0, j: 1, k: 1 }, // 21
        { stack: [{l:0, r:3}], active: "merge", lStart: 0, lMid: 1, lEnd: 3, L: [27, 38], R: [3, 43], i: 1, j: 1, k: 2 }, // 22
        { stack: [{l:0, r:3}], active: "merge", lStart: 0, lMid: 1, lEnd: 3, L: [27, 38], R: [3, 43], i: 2, j: 1, k: 3 }, // 23
        { stack: [{l:0, r:3}], active: "merge", lStart: 0, lMid: 1, lEnd: 3, L: [27, 38], R: [3, 43], i: 2, j: 2, k: 4 }  // 24
      ];

      const curr = stepData[stepIndex] || stepData[stepData.length - 1];

      if (curr.active === "merge") {
        frames.push({ name: "merge(arr, left=" + curr.lStart + ", mid=" + curr.lMid + ", right=" + curr.lEnd + ")", file: "solution.cpp", line: activeLine });
      }
      curr.stack.forEach((frame) => {
        frames.push({ name: "mergeSort(arr, left=" + frame.l + ", right=" + frame.r + ")", file: "solution.cpp", line: 36 });
      });
      frames.push({ name: "main()", file: "main.cpp", line: 44 });

      vars.push({ name: "arr", type: "std::vector<int>&", val: "size = 4", expandable: true });

      if (curr.active === "mergeSort") {
        vars.push({ name: "left", type: "int", val: curr.left.toString(), expandable: false });
        vars.push({ name: "right", type: "int", val: curr.right.toString(), expandable: false });
        if (curr.mid !== -1) {
          vars.push({ name: "mid", type: "int", val: curr.mid.toString(), expandable: false });
        }
        inlineVal = "left: " + curr.left + ", right: " + curr.right;
        if (curr.mid !== -1) inlineVal += ", mid: " + curr.mid;
      } else if (curr.active === "merge") {
        vars.push({ name: "left", type: "int", val: curr.lStart.toString(), expandable: false });
        vars.push({ name: "mid", type: "int", val: curr.lMid.toString(), expandable: false });
        vars.push({ name: "right", type: "int", val: curr.lEnd.toString(), expandable: false });
        vars.push({ name: "L", type: "std::vector<int>", val: "size = " + curr.L.length, expandable: true });
        vars.push({ name: "R", type: "std::vector<int>", val: "size = " + curr.R.length, expandable: true });
        vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
        vars.push({ name: "j", type: "int", val: curr.j.toString(), expandable: false });
        vars.push({ name: "k", type: "int", val: curr.k.toString(), expandable: false });
        inlineVal = "i: " + curr.i + ", j: " + curr.j + ", k: " + curr.k;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      if (stepIndex >= 9 && stepIndex <= 13) {
        if (lineNum >= 6 && lineNum <= 29) return "i: 0, j: 0, k: 0";
      }
      return null;
    }
  }
};
