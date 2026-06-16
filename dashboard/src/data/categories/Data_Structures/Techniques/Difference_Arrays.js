export const data = {
  "presentation": "### Prezentare Generală\n\nVectorul de Diferențe (Difference Array) este o tehnică excelentă utilizată atunci când ai nevoie să efectuezi rapid un număr mare de operații de tip 'adunare pe intervale' (Range Additions) asupra unui vector, urmate de citirea valorilor finale.\n\nÎn loc să adunăm valoarea V fiecărui element din intervalul [L, R] (ceea ce ia O(N) per operație), creăm un vector auxiliar 'diff'. Pentru a adăuga V pe intervalul [L, R], facem doar:\n'diff[L] += V' și 'diff[R + 1] -= V'.\nLa final, reconstruim vectorul real parcurgând 'diff' cu sume parțiale: 'arr[i] = arr[i - 1] + diff[i]'.",
  "complexity": "### Complexitate\n\n- **Timp:** O(1) pentru fiecare actualizare (Update). O(N) pentru a reconstrui vectorul la final. Dacă avem U update-uri, timpul total scade de la O(U * N) la O(U + N)!\n- **Spațiu:** O(N) pentru vectorul auxiliar 'diff'.\n",
  "variations": "### Variații și Edge Cases\n\n1. Matrice de Diferențe 2D: Aceeași logică, dar pentru matrice. Adăugarea pe o submatrice [r1..r2][c1..c2] modifică 4 elemente în matricea diferență: +V la (r1, c1), -V la (r1, c2+1), -V la (r2+1, c1), +V la (r2+1, c2+1).\n2. Sume Parțiale (Prefix Sums): Diferența Array este conceptul invers (derivat) al Sumelor Parțiale (integrală). Dacă faci sume parțiale pe Diferențe, obții Vectorul curent.",
  "applications": "### Aplicații\n\nOrice problemă care necesită modificări multiple și statice pe intervale și interogări doar la final: actualizări de scoruri pe servere, vopsirea unui gard cu mai multe culori, rezervări de tren/autobuz unde trebuie să știi pasagerii per stație (Scanline).",
  code: `
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int N = 5;
    // Initial toate elementele sunt 0
    vector<int> arr(N + 1, 0); 
    vector<int> diff(N + 2, 0); // +2 pentru a evita index out of bounds la R+1
    
    // Operatii: Aduna V pe intervalul [L, R] (indexare de la 1)
    // 1. Aduna 10 pe [1, 3]
    diff[1] += 10;
    diff[3 + 1] -= 10;
    
    // 2. Aduna 20 pe [2, 5]
    diff[2] += 20;
    diff[5 + 1] -= 20;
    
    // Reconstruirea vectorului prin Sume Partiale
    cout << "Valorile finale: ";
    for (int i = 1; i <= N; i++) {
        arr[i] = arr[i - 1] + diff[i];
        cout << arr[i] << " ";
    }
    cout << "
";
    
    return 0;
}
`,
  "explanations": [
    {
      "line": 10,
      "text": "Structura vectorului de diferențe: diff[i] = arr[i] - arr[i-1]. Păstrează doar salturile de valoare.",
      "blocksVisual": [
        {
          "label": "Diff Array",
          "groups": [
            [
              {
                "val": "+5"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "-5"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Avem un vector 'diff' inițializat cu 0. Dimensiune N=5.",
      "blocksVisual": [
        {
          "label": "Diff Inicial",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Update 1: Adunăm 10 pe [1, 3]. Facem diff[1] += 10.",
      "blocksVisual": [
        {
          "label": "Diff[1] += 10",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "10",
                "active": true
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 15,
      "text": "Și pentru a opri 'inundarea' valorii, facem diff[4] -= 10. Asta anulează acel +10 începând de la indexul 4.",
      "blocksVisual": [
        {
          "label": "Diff[4] -= 10",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "10"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "-10",
                "active": true
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Update 2: Adunăm 20 pe [2, 5]. Facem diff[2] += 20.",
      "blocksVisual": [
        {
          "label": "Diff[2] += 20",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "10"
              },
              {
                "val": "20",
                "active": true
              },
              {
                "val": "0"
              },
              {
                "val": "-10"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Oprim inundarea la diff[6] -= 20.",
      "blocksVisual": [
        {
          "label": "Diff[6] -= 20",
          "groups": [
            [
              {
                "val": "0"
              },
              {
                "val": "10"
              },
              {
                "val": "20"
              },
              {
                "val": "0"
              },
              {
                "val": "-10"
              },
              {
                "val": "0"
              },
              {
                "val": "-20",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Acum Reconstruim: arr[1] = arr[0] + diff[1] = 0 + 10 = 10.",
      "blocksVisual": [
        {
          "label": "Calcul arr[1]",
          "groups": [
            [
              {
                "val": "10",
                "sorted": true
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "arr[2] = arr[1] + diff[2] = 10 + 20 = 30.",
      "blocksVisual": [
        {
          "label": "Calcul arr[2]",
          "groups": [
            [
              {
                "val": "10",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "arr[3] = arr[2] + diff[3] = 30 + 0 = 30.",
      "blocksVisual": [
        {
          "label": "Calcul arr[3]",
          "groups": [
            [
              {
                "val": "10",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "0"
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "arr[4] = arr[3] + diff[4] = 30 + (-10) = 20. Valoarea scade pentru că s-a terminat primul interval!",
      "blocksVisual": [
        {
          "label": "Calcul arr[4]",
          "groups": [
            [
              {
                "val": "10",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "20",
                "sorted": true
              },
              {
                "val": "0"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "arr[5] = arr[4] + diff[5] = 20 + 0 = 20.",
      "blocksVisual": [
        {
          "label": "Calcul arr[5]",
          "groups": [
            [
              {
                "val": "10",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "30",
                "sorted": true
              },
              {
                "val": "20",
                "sorted": true
              },
              {
                "val": "20",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Algoritm finalizat. Cu doar două adunări pe operație am simulat mii de adunări element cu element!",
      "blocksVisual": [
        {
          "label": "Vector Final",
          "groups": [
            [
              {
                "val": "10"
              },
              {
                "val": "30"
              },
              {
                "val": "30"
              },
              {
                "val": "20"
              },
              {
                "val": "20"
              }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Sume partiale si Diferente",
        "url": "https://www.pbinfo.ro/probleme/2301/diferente",
        "desc": "pbinfo"
      },
      {
        "title": "Corporate Flight Bookings",
        "url": "https://leetcode.com/problems/corporate-flight-bookings/",
        "desc": "Clasica aplicație de Range Addition"
      }
    ],
    "medium": [
      {
        "title": "Car Pooling",
        "url": "https://leetcode.com/problems/car-pooling/",
        "desc": "Simulare Scanline"
      },
      {
        "title": "Shifting Letters II",
        "url": "https://leetcode.com/problems/shifting-letters-ii/",
        "desc": "Diferențe aplicate pe șiruri"
      }
    ],
    "hard": [
      {
        "title": "Stamping the Grid",
        "url": "https://leetcode.com/problems/stamping-the-grid/",
        "desc": "Diferențe pe Matrice (2D)"
      }
    ]
  }
};
