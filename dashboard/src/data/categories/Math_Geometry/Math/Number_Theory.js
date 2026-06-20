export const data = {
  "presentation": "### Prezentare Generală\n\nTeoria Numerelor se ocupă cu studiul numerelor întregi și proprietățile lor. În algoritmică, conceptele esențiale includ divizibilitatea, numerele prime, cel mai mare divizor comun (CMMDC) și cel mai mic multiplu comun (CMMMC), dar și aritmetica modulară.\n\nUnul dintre cei mai eleganți și folosiți algoritmi este **Ciurul lui Eratostene**. Acesta ne permite să găsim eficient toate numerele prime mai mici sau egale cu o valoare $N$. Spre deosebire de verificarea individuală a fiecărui număr, ciurul funcționează iterativ, \"tăind\" (marcând ca neprime) toți multiplii numerelor prime pe măsură ce le găsește.",
  "complexity": "### Complexitate\n\nPentru Ciurul lui Eratostene:\n- **Timp:** O(N log(log N)), ceea ce este extrem de aproape de O(N). Aceasta se datorează faptului că suma seriei $1/2 + 1/3 + 1/5 + 1/7 + ...$ crește logaritmic.\n- **Spațiu:** O(N), deoarece avem nevoie de un array (sau un bitset) pentru a stoca starea fiecărui număr de la 1 la N.\n",
  "variations": "### Variații și Edge Cases\n\n1. Ciurul pe biți: Pentru a salva memorie, folosim structuri bit-level (ex: `vector<bool>` sau `bitset`), reducând spațiul la a 8-a parte.\n2. Ciurul Liniar (O(N)): O versiune optimizată care se asigură că fiecare număr compus este tăiat o singură dată (prin cel mai mic factor prim al său).\n3. Ciurul Segmentat: Folosit când $N$ este foarte mare (ex: $10^{12}$), dar căutăm prime într-un interval $[L, R]$ de lungime relativ mică.",
  "applications": "### Aplicații\n\nGăsirea rapidă a numerelor prime este baza criptografiei (ex. algoritmul RSA). În probleme de concurs, ciurul este adesea o preprocesare, urmată de rezolvarea problemei folosind divizorii primi ai numerelor.",
  code: `
#include <iostream>
#include <vector>

using namespace std;

void ciurulLuiEratostene(int n) {
    vector<bool> estePrim(n + 1, true);
    estePrim[0] = estePrim[1] = false;
    
    for (int p = 2; p * p <= n; p++) {
        if (estePrim[p]) {
            for (int i = p * p; i <= n; i += p) {
                estePrim[i] = false;
            }
        }
    }
    
    cout << "Numere prime pana la " << n << ":\n";
    for (int p = 2; p <= n; p++) {
        if (estePrim[p]) {
            cout << p << " ";
        }
    }
    cout << "\n";
}

int main() {
    ciurulLuiEratostene(20);
    return 0;
}
`,
  "explanations": [
    {
      "line": 7,
      "text": "Pasul 1: Apelăm funcția ciurulLuiEratostene(20). Inițializăm vectorul `estePrim` de lungime 21 cu `true` pentru toate numerele de la 0 la 20.",
      "blocksVisual": [
        {
          "label": "estePrim (Initializor)",
          "groups": [
            [
              { "val": "2", "active": true }, { "val": "3", "active": true }, { "val": "4", "active": true },
              { "val": "5", "active": true }, { "val": "6", "active": true }, { "val": "7", "active": true },
              { "val": "8", "active": true }, { "val": "9", "active": true }, { "val": "10", "active": true },
              { "val": "11", "active": true }, { "val": "12", "active": true }, { "val": "13", "active": true },
              { "val": "14", "active": true }, { "val": "15", "active": true }, { "val": "16", "active": true },
              { "val": "17", "active": true }, { "val": "18", "active": true }, { "val": "19", "active": true },
              { "val": "20", "active": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 8,
      "text": "Pasul 2: `0` și `1` sunt setate la `false` deoarece, prin definiție matematică, nu sunt numere prime.",
      "blocksVisual": [
        {
          "label": "Marcat 0,1 ca neprime",
          "groups": [
            [
              { "val": "2" }, { "val": "3" }, { "val": "4" }, { "val": "5" }, { "val": "6" },
              { "val": "7" }, { "val": "8" }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Pasul 3: Intrăm în bucla exterioară începând cu p = 2. Verificăm condiția `p * p <= 20` (adică `4 <= 20`), care este adevărată.",
      "blocksVisual": [
        {
          "label": "p = 2 (Verificare limita)",
          "groups": [
            [
              { "val": "2", "active": true }, { "val": "3" }, { "val": "4" }, { "val": "5" }, { "val": "6" },
              { "val": "7" }, { "val": "8" }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 4: `estePrim[2]` este `true`. Asta înseamnă că 2 este număr prim! Vom începe tăierea multiplilor săi începând cu 2 * 2 = 4.",
      "blocksVisual": [
        {
          "label": "2 confirmat prim",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4" }, { "val": "5" }, { "val": "6" },
              { "val": "7" }, { "val": "8" }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 5: Bucla interioară pornește cu i = 4. Marcăm multiplii lui 2.",
      "blocksVisual": [
        {
          "label": "Tăiere multipli de 2 (i = 4)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "active": true }, { "val": "5" }, { "val": "6" },
              { "val": "7" }, { "val": "8" }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 6: Setăm `estePrim[4] = false` (număr compus).",
      "blocksVisual": [
        {
          "label": "Tăiat 4",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6" },
              { "val": "7" }, { "val": "8" }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 7: Tăiem următorul multiplu al lui 2, `i = 6`. Setăm `estePrim[6] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 6",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8" }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 8: Tăiem următorul multiplu al lui 2, `i = 8`. Setăm `estePrim[8] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 8",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10" }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 9: Tăiem următorul multiplu al lui 2, `i = 10`. Setăm `estePrim[10] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 10",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12" }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 10: Tăiem următorul multiplu al lui 2, `i = 12`. Setăm `estePrim[12] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 12",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14" }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 11: Tăiem următorul multiplu al lui 2, `i = 14`. Setăm `estePrim[14] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 14",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16" },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 12: Tăiem următorul multiplu al lui 2, `i = 16`. Setăm `estePrim[16] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 16",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18" }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 13: Tăiem următorul multiplu al lui 2, `i = 18`. Setăm `estePrim[18] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 18",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20" }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 14: Tăiem ultimul multiplu al lui 2 în acest interval, `i = 20`. Setăm `estePrim[20] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 20",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3" }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Pasul 15: Incrementăm p la 3. Verificăm condiția `p * p <= 20` (adică `9 <= 20`), adevărat.",
      "blocksVisual": [
        {
          "label": "p = 3 (Verificare limita)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "active": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 16: `estePrim[3]` este `true`. 3 este număr prim! Începem tăierea multiplilor săi de la 3 * 3 = 9.",
      "blocksVisual": [
        {
          "label": "3 confirmat prim",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9" }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Pasul 17: Bucla interioară pornește cu i = 9. Tăiem multiplii lui 3.",
      "blocksVisual": [
        {
          "label": "Tăiere multipli de 3 (i = 9)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "active": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 18: Setăm `estePrim[9] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 9",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 19: Tăiem următorul multiplu, `i = 12`. Era deja false (tăiat de 2), deci nu se modifică nimic.",
      "blocksVisual": [
        {
          "label": "Vizitat 12 (deja tăiat)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15" }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 20: Tăiem următorul multiplu, `i = 15`. Setăm `estePrim[15] = false`.",
      "blocksVisual": [
        {
          "label": "Tăiat 15",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15", "hidden": true }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "Pasul 21: Tăiem ultimul multiplu, `i = 18`. Era deja false (tăiat de 2).",
      "blocksVisual": [
        {
          "label": "Vizitat 18 (deja tăiat)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15", "hidden": true }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Pasul 22: Incrementăm p la 4. Verificăm condiția `p * p <= 20` (adică `16 <= 20`), adevărat.",
      "blocksVisual": [
        {
          "label": "p = 4 (Verificare)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15", "hidden": true }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 11,
      "text": "Pasul 23: `estePrim[4]` este `false`, deci nu facem nimic. Sărim peste el.",
      "blocksVisual": [
        {
          "label": "4 nu e prim",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5" }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15", "hidden": true }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Pasul 24: Incrementăm p la 5. Condiția `p * p <= 20` (adică `25 <= 20`) devine falsă. Bucla principală se încheie.",
      "blocksVisual": [
        {
          "label": "p = 5 (Sfârșit buclă)",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5", "active": true }, { "val": "6", "hidden": true },
              { "val": "7" }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11" },
              { "val": "12", "hidden": true }, { "val": "13" }, { "val": "14", "hidden": true }, { "val": "15", "hidden": true }, { "val": "16", "hidden": true },
              { "val": "17" }, { "val": "18", "hidden": true }, { "val": "19" }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 26,
      "text": "Pasul 25: Parcurgem numerele rămase în vectorul `estePrim` începând cu p = 2 pentru a le afișa.",
      "blocksVisual": [
        {
          "label": "Colectare prime",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "4", "hidden": true }, { "val": "5", "sorted": true }, { "val": "6", "hidden": true },
              { "val": "7", "sorted": true }, { "val": "8", "hidden": true }, { "val": "9", "hidden": true }, { "val": "10", "hidden": true }, { "val": "11", "sorted": true },
              { "val": "12", "hidden": true }, { "val": "13", "sorted": true }, { "val": "14", "hidden": true }, { "val": "15", "hidden": true }, { "val": "16", "hidden": true },
              { "val": "17", "sorted": true }, { "val": "18", "hidden": true }, { "val": "19", "sorted": true }, { "val": "20", "hidden": true }
            ]
          ]
        }
      ]
    },
    {
      "line": 28,
      "text": "Pasul 26: Numerele prime până la 20 sunt afișate cu succes: 2, 3, 5, 7, 11, 13, 17, 19.",
      "blocksVisual": [
        {
          "label": "Numere Prime Rezultate",
          "groups": [
            [
              { "val": "2", "sorted": true }, { "val": "3", "sorted": true }, { "val": "5", "sorted": true },
              { "val": "7", "sorted": true }, { "val": "11", "sorted": true }, { "val": "13", "sorted": true },
              { "val": "17", "sorted": true }, { "val": "19", "sorted": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Ciurul lui Eratostene",
        "url": "https://www.pbinfo.ro/probleme/236/ciurul-lui-eratostene",
        "desc": "Problema clasică"
      },
      {
        "title": "CMMDC",
        "url": "https://www.pbinfo.ro/probleme/55/cmmdc",
        "desc": "Algoritmul lui Euclid"
      }
    ],
    "medium": [
      {
        "title": "Count Primes",
        "url": "https://leetcode.com/problems/count-primes/",
        "desc": "O(N log log N)"
      },
      {
        "title": "Descompunere in Factori Primi",
        "url": "https://www.pbinfo.ro/probleme/63/factori-primi",
        "desc": "Divizori"
      }
    ],
    "hard": [
      {
        "title": "Segmented Sieve",
        "url": "https://www.spoj.com/problems/PRIME1/",
        "desc": "Primes between L and R"
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let p = 2;
      if (stepIndex >= 14) p = 3;
      if (stepIndex >= 22) p = 4;
      if (stepIndex >= 23) p = 5;
      globalVars.push({ name: 'estePrim', type: 'vector<bool>', val: '[2..20]', expandable: false });
      globalVars.push({ name: 'n', type: 'int', val: '20', expandable: false });
      if (stepIndex >= 2) vars.push({ name: 'p', type: 'int', val: p, expandable: false });
      if (stepIndex >= 4 && stepIndex <= 23) {
        let iVal = p * p;
        if (stepIndex >= 12) iVal = 20;
        if (stepIndex >= 14) iVal = 9;
        vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
      }
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 2) frames.unshift({ name: `ciurulLuiEratostene(n = 20)`, file: 'main.cpp', line: activeLine });
      if (stepIndex >= 2) inlineVal = `p: ${p}`;
      return { vars, globalVars, frames, inlineVal };
    }
  }
};
