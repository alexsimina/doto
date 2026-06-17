export const data = {
  "presentation": "Căutarea Binară (Binary Search) este un algoritm extrem de eficient pentru găsirea unui element într-un șir **sortat**.\n\n### Principiul de Funcționare\n\nPrincipiul de bază este simplu: comparăm valoarea căutată cu elementul din mijlocul șirului.\n- Dacă sunt egale, am găsit elementul!\n- Dacă valoarea căutată este **mai mică**, înseamnă că ea se poate afla doar în prima jumătate a șirului.\n- Dacă este **mai mare**, se află cu siguranță în a doua jumătate.\n\n> Imaginează-ți că deschizi un dicționar pentru a căuta cuvântul 'Programare'. Nu citești fiecare pagină, ci deschizi la jumătate. Ignori jumătatea irelevantă și continui înjumătățirea.\n\nIată un exemplu de declarare a unui vector:\n```cpp\nvector<int> arr = {1, 3, 5, 7, 9};\n```",
  "complexity": "### Complexitate de Timp\n\n- **Cazul Favorabil:** `O(1)` (găsim elementul chiar la mijloc)\n- **Cazul Mediu / Defavorabil:** `O(log N)`. \n\nLa fiecare pas, numărul de elemente analizate se reduce la jumătate. Chiar și pentru un miliard de elemente (10^9), algoritmul are nevoie de cel mult 30 de pași!\n\n### Complexitate Spațială\n\n- `O(1)` pentru varianta iterativă (folosește doar pointerii `left` și `right`).\n- `O(log N)` pentru varianta recursivă, datorită spațiului alocat pe *Call Stack*.",
  "variations": "### Variante Populare\n\n1. **Lower Bound / Upper Bound**: Găsim prima valoare mai mare sau egală (`lower_bound`) sau strict mai mare (`upper_bound`).\n2. **Căutarea Binară pe Răspuns** (Binary Search on Answer): O tehnică avansată unde nu căutăm într-un array, ci într-un interval de valori posibile ale răspunsului.\n\nPentru a folosi varianta din C++, apelezi `std::binary_search(arr.begin(), arr.end(), target)` din librăria `<algorithm>`.",
  "applications": "### Aplicații\n\nCăutarea binară este o tehnică foarte versatilă cu numeroase aplicații practice:\n\n- Optimizări în care trebuie să găsești o soluție optimă ('minimizați maximul' sau 'maximizați minimul').\n- Rezolvarea ecuațiilor matematice monotone (ex: găsirea rădăcinilor pătrate sau cubice cu precizie).\n- Interogări rapide pe structuri de date sortate și arbori de căutare.\n\nAflă mai multe din documentația oficială despre [Binary Search pe C++ Reference](https://en.cppreference.com/w/cpp/algorithm/binary_search).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int binarySearch(var vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Element gasit
        }
        
        if (arr[mid] < target) {
            left = mid + 1; // Cautam in dreapta
        } else {
            right = mid - 1; // Cautam in stanga
        }
    }
    
    return -1; // Elementul nu exista
}

int main() {
    vector<int> arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    
    int result = binarySearch(arr, target);
    
    if (result != -1) {
        cout << "Elementul " << target << " a fost gasit la indexul: " << result << "
";
    } else {
        cout << "Elementul " << target << " nu a fost gasit.
";
    }
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 6,
      "text": "Începe execuția funcției binarySearch pentru a căuta target = 3.",
      "blocksVisual": [
        { "label": "Vectorul", "groups": [[{"val": 2}, {"val": 5}, {"val": 8}, {"val": 12}, {"val": 16}, {"val": 23}, {"val": 38}, {"val": 56}, {"val": 72}, {"val": 91}]] }
      ]
    },
    {
      "line": 7,
      "text": "Inițializăm marginea stângă: left = 0.",
      "blocksVisual": [
        { "label": "left = 0", "groups": [[{"val": 2, "active": true}, {"val": 5}, {"val": 8}, {"val": 12}, {"val": 16}, {"val": 23}, {"val": 38}, {"val": 56}, {"val": 72}, {"val": 91}]] }
      ]
    },
    {
      "line": 8,
      "text": "Inițializăm marginea dreaptă: right = 9 (ultimul index).",
      "blocksVisual": [
        { "label": "Interval", "groups": [[{"val": 2, "active": true}, {"val": 5}, {"val": 8}, {"val": 12}, {"val": 16}, {"val": 23}, {"val": 38}, {"val": 56}, {"val": 72}, {"val": 91, "active": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Verificăm condiția buclei: left <= right (0 <= 9) este adevărată.",
      "blocksVisual": [
        { "label": "Valid", "groups": [[{"val": "left <= right"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Calculăm mijlocul intervalului: mid = 0 + (9 - 0) / 2 = 4.",
      "blocksVisual": [
        { "label": "Mijloc (mid = 4)", "groups": [[{"val": 2}, {"val": 5}, {"val": 8}, {"val": 12}, {"val": 16, "sorted": true}, {"val": 23}, {"val": 38}, {"val": 56}, {"val": 72}, {"val": 91}]] }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă arr[mid] == target. Deoarece arr[4] = 16 și target = 3, condiția este falsă.",
      "blocksVisual": [
        { "label": "Comparație", "groups": [[{"val": "16 == 3", "active": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Deoarece arr[mid] > target (16 > 3), elementul se poate afla doar în stânga. Mutăm right = mid - 1 = 3.",
      "blocksVisual": [
        { "label": "Actualizare", "groups": [[{"val": "right = 3", "active": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Reluăm bucla. Verificăm condiția: left <= right (0 <= 3) este adevărată.",
      "blocksVisual": [
        { "label": "Noul Interval", "groups": [[{"val": 2, "active": true}, {"val": 5}, {"val": 8}, {"val": 12, "active": true}, {"val": 16, "hidden": true}, {"val": 23, "hidden": true}, {"val": 38, "hidden": true}, {"val": 56, "hidden": true}, {"val": 72, "hidden": true}, {"val": 91, "hidden": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Calculăm noul mijloc: mid = 0 + (3 - 0) / 2 = 1.",
      "blocksVisual": [
        { "label": "Mijloc (mid = 1)", "groups": [[{"val": 2}, {"val": 5, "sorted": true}, {"val": 8}, {"val": 12}]] }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă arr[1] == target (5 == 3). Este fals.",
      "blocksVisual": [
        { "label": "Comparație", "groups": [[{"val": "5 == 3", "active": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Deoarece arr[mid] > target (5 > 3), mutăm marginea dreaptă la stânga: right = mid - 1 = 0.",
      "blocksVisual": [
        { "label": "Actualizare", "groups": [[{"val": "right = 0", "active": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Reluăm bucla. Condiția: left <= right (0 <= 0) este adevărată.",
      "blocksVisual": [
        { "label": "Interval", "groups": [[{"val": 2, "active": true}, {"val": 5, "hidden": true}, {"val": 8, "hidden": true}, {"val": 12, "hidden": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Calculăm mijlocul: mid = 0 + (0 - 0) / 2 = 0.",
      "blocksVisual": [
        { "label": "Mijloc (mid = 0)", "groups": [[{"val": 2, "sorted": true}]] }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă arr[0] == target (2 == 3). Este fals.",
      "blocksVisual": [
        { "label": "Comparație", "groups": [[{"val": "2 == 3", "active": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Deoarece arr[mid] < target (2 < 3), mutăm marginea stângă la dreapta: left = mid + 1 = 1.",
      "blocksVisual": [
        { "label": "Actualizare", "groups": [[{"val": "left = 1", "active": true}]] }
      ]
    },
    {
      "line": 10,
      "text": "Verificăm condiția buclei: left <= right (1 <= 0) este falsă. Căutarea pentru target = 3 s-a terminat (negăsit).",
      "blocksVisual": [
        { "label": "Stop", "groups": [[{"val": "Incomplet / Negăsit", "active": true}]] }
      ]
    },
    {
      "line": 24,
      "text": "Returnăm -1 deoarece elementul 3 nu există în vector.",
      "blocksVisual": [
        { "label": "Retur", "groups": [[{"val": -1}]] }
      ]
    },
    {
      "line": 6,
      "text": "Acum pornim o nouă căutare pentru target = 23. Inițializăm left = 0, right = 9.",
      "blocksVisual": [
        { "label": "Interval Inițial", "groups": [[{"val": 2, "active": true}, {"val": 5}, {"val": 8}, {"val": 12}, {"val": 16}, {"val": 23}, {"val": 38}, {"val": 56}, {"val": 72}, {"val": 91, "active": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Calculăm mijlocul: mid = 0 + (9 - 0) / 2 = 4 (valoarea 16). Deoarece 16 < 23, setăm left = mid + 1 = 5.",
      "blocksVisual": [
        { "label": "Stânga exclusă", "groups": [[{"val": 2, "hidden": true}, {"val": 5, "hidden": true}, {"val": 8, "hidden": true}, {"val": 12, "hidden": true}, {"val": 16, "hidden": true}, {"val": 23, "active": true}, {"val": 38}, {"val": 56}, {"val": 72}, {"val": 91, "active": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Calculăm noul mijloc: mid = 5 + (9 - 5) / 2 = 7 (valoarea 56). Deoarece 56 > 23, setăm right = mid - 1 = 6.",
      "blocksVisual": [
        { "label": "Dreapta exclusă", "groups": [[{"val": 2, "hidden": true}, {"val": 5, "hidden": true}, {"val": 8, "hidden": true}, {"val": 12, "hidden": true}, {"val": 16, "hidden": true}, {"val": 23, "active": true}, {"val": 38, "active": true}, {"val": 56, "hidden": true}, {"val": 72, "hidden": true}, {"val": 91, "hidden": true}]] }
      ]
    },
    {
      "line": 11,
      "text": "Calculăm noul mijloc: mid = 5 + (6 - 5) / 2 = 5 (valoarea 23). Deoarece arr[5] == target (23 == 23), am găsit elementul și returnăm indexul 5.",
      "blocksVisual": [
        { "label": "Succes!", "groups": [[{"val": 23, "sorted": true}]] }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Binary Search",
        "url": "https://leetcode.com/problems/binary-search/",
        "desc": "Standard BS"
      },
      {
        "title": "First Bad Version",
        "url": "https://leetcode.com/problems/first-bad-version/",
        "desc": "Lower Bound practic"
      }
    ],
    "medium": [
      {
        "title": "Search in Rotated Array",
        "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        "desc": "Array rotit"
      },
      {
        "title": "Koko Eating Bananas",
        "url": "https://leetcode.com/problems/koko-eating-bananas/",
        "desc": "Căutare pe Răspuns"
      },
      {
        "title": "Tăieturi M",
        "url": "https://www.pbinfo.ro/probleme/1149/taieturi-m",
        "desc": "Problema cu cherestea"
      }
    ],
    "hard": [
      {
        "title": "Median of Two Sorted Arrays",
        "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
        "desc": "O(log(min(m,n))) BS complex"
      },
      {
        "title": "Split Array Largest Sum",
        "url": "https://leetcode.com/problems/split-array-largest-sum/",
        "desc": "Minimizați maximul (BS + Greedy)"
      }
    ]
  }
};
