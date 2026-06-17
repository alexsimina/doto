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
    
    // 3. Aduna 5 pe [3, 4]
    diff[3] += 5;
    diff[4 + 1] -= 5;
    
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
      "line": 4,
      "text": "Structura vectorului de diferențe: diff[i] = arr[i] - arr[i-1]. Păstrează doar salturile de valoare.",
      "blocksVisual": [
        {
          "label": "Concept",
          "groups": [
            [{ "val": "diff[i] = arr[i] - arr[i-1]" }]
          ]
        }
      ]
    },
    {
      "line": 4,
      "text": "Avem un vector 'diff' inițializat cu 0. Dimensiune N=5 (folosim indici 1..6 pentru siguranță).",
      "blocksVisual": [
        {
          "label": "Diff Initial",
          "groups": [
            [{ "val": "diff[1]: 0" }, { "val": "diff[2]: 0" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: 0" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 9,
      "text": "Update 1: Adunăm 10 pe [1, 3]. Pasul 1A: Adunăm 10 la diff[1].",
      "blocksVisual": [
        {
          "label": "Diff[1] += 10",
          "groups": [
            [{ "val": "diff[1]: 10", "active": true }, { "val": "diff[2]: 0" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: 0" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Update 1: Pasul 1B: Scădem 10 la R+1 = 4: diff[4] -= 10. Asta anulează impactul lui +10 de la indexul 4 încolo.",
      "blocksVisual": [
        {
          "label": "Diff[4] -= 10",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 0" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: -10", "active": true }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Update 2: Adunăm 20 pe [2, 5]. Pasul 2A: Adunăm 20 la diff[2].",
      "blocksVisual": [
        {
          "label": "Diff[2] += 20",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20", "active": true }, { "val": "diff[3]: 0" }, { "val": "diff[4]: -10" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: 0" }]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Update 2: Pasul 2B: Scădem 20 la R+1 = 6: diff[6] -= 20.",
      "blocksVisual": [
        {
          "label": "Diff[6] -= 20",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20" }, { "val": "diff[3]: 0" }, { "val": "diff[4]: -10" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: -20", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Update 3: Adunăm 5 pe [3, 4]. Pasul 3A: Adunăm 5 la diff[3].",
      "blocksVisual": [
        {
          "label": "Diff[3] += 5",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20" }, { "val": "diff[3]: 5", "active": true }, { "val": "diff[4]: -10" }, { "val": "diff[5]: 0" }, { "val": "diff[6]: -20" }]
          ]
        }
      ]
    },
    {
      "line": 18,
      "text": "Update 3: Pasul 3B: Scădem 5 la R+1 = 5: diff[5] -= 5. Acum toți biții/salturile din diff sunt gata.",
      "blocksVisual": [
        {
          "label": "Diff[5] -= 5",
          "groups": [
            [{ "val": "diff[1]: 10" }, { "val": "diff[2]: 20" }, { "val": "diff[3]: 5" }, { "val": "diff[4]: -10" }, { "val": "diff[5]: -5", "active": true }, { "val": "diff[6]: -20" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Începem reconstruirea vectorului `arr` prin sume parțiale pe vectorul de diferențe.",
      "blocksVisual": [
        {
          "label": "Start Sume Parțiale",
          "groups": [
            [{ "val": "i = 1" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Reconstruire i = 1: Citim saltul diff[1] = 10. Calculăm arr[1] = arr[0] + diff[1] = 0 + 10 = 10.",
      "blocksVisual": [
        {
          "label": "Calcul arr[1]",
          "groups": [
            [{ "val": "arr[1]: 10", "active": true }, { "val": "0" }, { "val": "0" }, { "val": "0" }, { "val": "0" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Trecem la următorul element din buclă: i = 2.",
      "blocksVisual": [
        {
          "label": "Buclă",
          "groups": [
            [{ "val": "i = 2" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Reconstruire i = 2: Citim saltul diff[2] = 20. Calculăm arr[2] = arr[1] + diff[2] = 10 + 20 = 30.",
      "blocksVisual": [
        {
          "label": "Calcul arr[2]",
          "groups": [
            [{ "val": "10" }, { "val": "arr[2]: 30", "active": true }, { "val": "0" }, { "val": "0" }, { "val": "0" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Trecem la următorul element din buclă: i = 3.",
      "blocksVisual": [
        {
          "label": "Buclă",
          "groups": [
            [{ "val": "i = 3" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Reconstruire i = 3: Citim saltul diff[3] = 5. Calculăm arr[3] = arr[2] + diff[3] = 30 + 5 = 35.",
      "blocksVisual": [
        {
          "label": "Calcul arr[3]",
          "groups": [
            [{ "val": "10" }, { "val": "30" }, { "val": "arr[3]: 35", "active": true }, { "val": "0" }, { "val": "0" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Trecem la următorul element din buclă: i = 4.",
      "blocksVisual": [
        {
          "label": "Buclă",
          "groups": [
            [{ "val": "i = 4" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Reconstruire i = 4: Citim saltul diff[4] = -10. Calculăm arr[4] = arr[3] + diff[4] = 35 + (-10) = 25.",
      "blocksVisual": [
        {
          "label": "Calcul arr[4]",
          "groups": [
            [{ "val": "10" }, { "val": "30" }, { "val": "35" }, { "val": "arr[4]: 25", "active": true }, { "val": "0" }]
          ]
        }
      ]
    },
    {
      "line": 22,
      "text": "Trecem la ultimul element: i = 5.",
      "blocksVisual": [
        {
          "label": "Buclă",
          "groups": [
            [{ "val": "i = 5" }]
          ]
        }
      ]
    },
    {
      "line": 23,
      "text": "Reconstruire i = 5: Citim saltul diff[5] = -5. Calculăm arr[5] = arr[4] + diff[5] = 25 + (-5) = 20.",
      "blocksVisual": [
        {
          "label": "Calcul arr[5]",
          "groups": [
            [{ "val": "10" }, { "val": "30" }, { "val": "35" }, { "val": "25" }, { "val": "arr[5]: 20", "active": true }]
          ]
        }
      ]
    },
    {
      "line": 25,
      "text": "Afișăm valorile finale obținute în vector.",
      "blocksVisual": [
        {
          "label": "Afișare Rezultate",
          "groups": [
            [{ "val": "10 30 35 25 20", "sorted": true }]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Algoritmul s-a încheiat cu succes! Am demonstrat cum interogarea complexă se face într-o singură parcurgere liniară.",
      "blocksVisual": [
        {
          "label": "Finalizat",
          "groups": [
            [{ "val": "O(N + U)", "sorted": true }]
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
