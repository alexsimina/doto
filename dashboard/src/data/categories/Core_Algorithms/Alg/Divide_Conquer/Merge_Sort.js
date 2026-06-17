export const data = {
  "presentation": "### Prezentare Generală\n\nMerge Sort este un algoritm de sortare clasic și foarte eficient, bazat pe Divide et Impera. Se bazează pe o idee extrem de elegantă: e foarte ușor să unești (interclasezi) două șiruri deja sortate într-unul singur, tot sortat.\n\nLogica principală: înjumătățim constant șirul până ajungem la elemente individuale (care, fiind singure, sunt implicit 'sortate'). Apoi le combinăm înapoi două câte două, menținând ordinea la fiecare pas.\n\nCaracteristica sa de bază este stabilitatea. Un algoritm stabil garantează că elementele cu valori egale își păstrează ordinea relativă inițială după sortare (esențial când sortezi obiecte după atribute multiple).",
  "complexity": "### Complexitate\n\n- **Timp:** O(N log N) în orice caz (Best, Average, Worst). E garantat să nu degenereze în O(N^2) precum Quick Sort.\n- **Spațiu:** O(N) memorie auxiliară. Acesta este marele dezavantaj al Merge Sort – necesită vectori auxiliari pentru interclasare.\n",
  "variations": "### Variații și Edge Cases\n\n1. Inversion Count (Numărarea inversiunilor): Cea mai populară aplicație a algoritmului.\n2. Bottom-up Merge Sort: Fără recursivitate, unește direct perechi de lungime 1, apoi 2, 4 etc.",
  "applications": "### Aplicații\n\nMerge Sort este algoritmul preferat pentru structurile de date Linked Lists, unde inserarea la mijloc se face în O(1) și nu avem nevoie de un vector auxiliar suplimentar masiv.",
  code: `
#include <iostream>
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
    cout << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 43,
      "text": "Începem cu un vector inițial neordonat.",
      "blocksVisual": [
        { "label": "Vector Inițial", "groups": [[{"val": 38}, {"val": 27}, {"val": 43}, {"val": 3}]] }
      ]
    },
    {
      "line": 44,
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
      "line": 36,
      "text": "Apelăm mergeSort(0, 0). Acesta returnează imediat deoarece left >= right (0 >= 0).",
      "blocksVisual": [
        { "label": "Caz de bază (0, 0)", "groups": [[{"val": 38, "sorted": true}]] }
      ]
    },
    {
      "line": 37,
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
  }
};
