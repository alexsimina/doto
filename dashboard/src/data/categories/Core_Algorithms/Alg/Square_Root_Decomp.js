export const data = {
  "presentation": "### Prezentare Generală\n\nDescompunerea în radical (Square Root Decomposition) este o tehnică foarte flexibilă pentru a rezolva eficient probleme de interogări pe intervale (Range Queries).\n\nÎn loc să răspundem la interogări în $O(N)$ (naiv) sau $O(\\log N)$ cu Arbori de Intervale care sunt complex de implementat, SQRT Decomposition oferă o soluție elegantă de compromis $O(\\sqrt{N})$:\nÎmpărțim vectorul de $N$ elemente în bucăți (blocuri) de dimensiune $\\sqrt{N}$. Precalculăm răspunsul (suma, minimul, max) pentru fiecare bloc.\n\nCând vine o interogare pe un interval [L, R], acest interval va acoperi complet o serie de blocuri intermediare, și parțial cel mult două blocuri (la margini). Sumăm răspunsurile precalculate ale blocurilor complet acoperite, și iterăm element cu element pentru capetele parțiale.",
  "complexity": "### Complexitate\n\n- **Timp:** Creare/Precalculare: $O(N)$. Interogare: $O(\\sqrt{N})$ deoarece parcurgem cel mult $\\sqrt{N}$ elemente individuale la capete și cel mult $\\sqrt{N}$ blocuri întregi pe mijloc.\n- **Spațiu:** $O(\\sqrt{N})$ pentru a reține răspunsul pe blocuri.\n",
  "variations": "### Variații și Edge Cases\n\n1. Point Update: Actualizarea unei valori necesită doar actualizarea blocului din care face parte în $O(1)$.\n2. Range Update: Se pot folosi 'lazy tags' pe blocuri întregi, similar segment trees.",
  "applications": "### Aplicații\n\nOrice fel de Range Queries pe care nu știm sau ne e greu să le modelăm cu Segment Trees. Unele funcții care nu sunt asociative (ex: Mode / Culoare dominantă) pot fi rezolvate mult mai ușor cu blocuri.",
  code: `
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int blockSize;
vector<int> b; // vectorul de blocuri

void preprocess(const vector<int>& input) {
    int n = input.size();
    blockSize = sqrt(n);
    // rotunjire in sus pentru ultimul bloc
    b.assign((n + blockSize - 1) / blockSize, 0); 
    
    for (int i = 0; i < n; i++) {
        b[i / blockSize] += input[i];
    }
}

// Update la pozitia 'idx' cu valoarea 'val' (adaugare)
void update(vector<int>& input, int idx, int val) {
    int blockNumber = idx / blockSize;
    b[blockNumber] += val - input[idx];
    input[idx] = val;
}

// Query pe intervalul [l, r]
int query(const vector<int>& input, int l, int r) {
    int sum = 0;
    int c_l = l / blockSize;
    int c_r = r / blockSize;
    
    if (c_l == c_r) {
        // Cazul in care intervalul e pe un singur bloc
        for (int i = l; i <= r; i++) sum += input[i];
    } else {
        // Capatul stang (partial)
        for (int i = l, end = (c_l + 1) * blockSize - 1; i <= end; i++) sum += input[i];
        
        // Blocurile intermediare complete
        for (int i = c_l + 1; i <= c_r - 1; i++) sum += b[i];
        
        // Capatul drept (partial)
        for (int i = c_r * blockSize; i <= r; i++) sum += input[i];
    }
    return sum;
}

int main() {
    vector<int> input = {2, 1, 3, 4, 5, 8, 9, 2, 0};
    preprocess(input);
    cout << "Suma pe [1, 7]: " << query(input, 1, 7) << "\n";
    return 0;
}
`,
  "explanations": [
    {
      "line": 16,
      "text": "Pornim cu vectorul de intrare input = {2, 1, 3, 4, 5, 8, 9, 2, 0}, N = 9. Aceasta este structura brută, fără nicio împărțire încă.",
      "blocksVisual": [
        { "label": "Array input [0-8]", "groups": [[{"val": 2}, {"val": 1}, {"val": 3}, {"val": 4}, {"val": 5}, {"val": 8}, {"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=?"}, {"val": "b[1]=?"}, {"val": "b[2]=?"}]] }
      ]
    },
    {
      "line": 18,
      "text": "Calculăm dimensiunea blocului: blockSize = sqrt(9) = 3. Vectorul va fi împărțit în 3 blocuri egale de câte 3 elemente fiecare.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]", "groups": [[{"val": 2}, {"val": 1}, {"val": 3}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4}, {"val": 5}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]  (init 0)", "groups": [[{"val": "b[0]=0"}, {"val": "b[1]=0"}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 20,
      "text": "Alocăm vectorul de sume pe blocuri b[] cu (9+3-1)/3 = 3 intrări, inițializate cu 0. Fiecare b[k] va stoca suma elementelor din blocul k.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]", "groups": [[{"val": 2}, {"val": 1}, {"val": 3}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4}, {"val": 5}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=0", "active": true}, {"val": "b[1]=0"}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=0: input[0]=2 aparține blocului 0/3=0. Adunăm 2 la b[0]. b[0] devine 2.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]", "groups": [[{"val": 2, "active": true}, {"val": 1}, {"val": 3}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4}, {"val": 5}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=2", "active": true}, {"val": "b[1]=0"}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=1: input[1]=1 aparține blocului 1/3=0. Adunăm 1 la b[0]. b[0] devine 3.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]", "groups": [[{"val": 2}, {"val": 1, "active": true}, {"val": 3}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4}, {"val": 5}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=3", "active": true}, {"val": "b[1]=0"}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=2: input[2]=3 aparține blocului 2/3=0. Adunăm 3 la b[0]. b[0] devine 6. Blocul 0 este acum complet precalculat!",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "active": true}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4}, {"val": 5}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=0"}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=3: input[3]=4 aparține blocului 3/3=1. Adunăm 4 la b[1]. b[1] devine 4.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4, "active": true}, {"val": 5}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=4", "active": true}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=4: input[4]=5 aparține blocului 4/3=1. Adunăm 5 la b[1]. b[1] devine 9.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4}, {"val": 5, "active": true}, {"val": 8}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=9", "active": true}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=5: input[5]=8 aparține blocului 5/3=1. Adunăm 8 la b[1]. b[1] devine 17. Blocul 1 este complet!",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "active": true}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=17", "sorted": true}, {"val": "b[2]=0"}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=6: input[6]=9 aparține blocului 6/3=2. Adunăm 9 la b[2]. b[2] devine 9.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9, "active": true}, {"val": 2}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=17", "sorted": true}, {"val": "b[2]=9", "active": true}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=7: input[7]=2 aparține blocului 7/3=2. Adunăm 2 la b[2]. b[2] devine 11.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2, "active": true}, {"val": 0}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=17", "sorted": true}, {"val": "b[2]=11", "active": true}]] }
      ]
    },
    {
      "line": 23,
      "text": "i=8: input[8]=0 aparține blocului 8/3=2. Adunăm 0 la b[2]. b[2] rămâne 11. Blocul 2 este complet. Preprocesarea s-a încheiat!",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "sorted": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]  ✓", "groups": [[{"val": 9, "sorted": true}, {"val": 2, "sorted": true}, {"val": 0, "active": true}]] },
        { "label": "Bucket sums b[]  (FINAL)", "groups": [[{"val": "b[0]=6", "sorted": true}, {"val": "b[1]=17", "sorted": true}, {"val": "b[2]=11", "sorted": true}]] }
      ]
    },
    {
      "line": 35,
      "text": "Apelăm query(input, l=1, r=7). Vrem suma elementelor de la indexul 1 la 7 inclusiv. Intervalul [1,7] acoperă parțial Block 0, complet Block 1 și parțial Block 2.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  (parțial stânga)", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "active": true}, {"val": 3, "active": true}]] },
        { "label": "Block 1 [3-5]  (complet acoperit)", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]  (parțial dreapta)", "groups": [[{"val": 9, "active": true}, {"val": 2, "active": true}, {"val": 0, "hidden": true}]] },
        { "label": "Bucket sums b[]", "groups": [[{"val": "b[0]=6"}, {"val": "b[1]=17", "sorted": true}, {"val": "b[2]=11"}]] }
      ]
    },
    {
      "line": 37,
      "text": "Calculăm blocurile capetelor: c_l = 1/3 = 0 și c_r = 7/3 = 2. Deoarece c_l ≠ c_r, intrăm pe ramura else cu cele 3 faze: stânga parțial + blocuri complete + dreapta parțial.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ← c_l=0", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "active": true}, {"val": 3, "active": true}]] },
        { "label": "Block 1 [3-5]  (complet)", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]  ← c_r=2", "groups": [[{"val": 9, "active": true}, {"val": 2, "active": true}, {"val": 0, "hidden": true}]] },
        { "label": "sum = 0", "groups": [[{"val": "sum=0"}]] }
      ]
    },
    {
      "line": 45,
      "text": "Faza 1 – capăt stâng parțial (Block 0): parcurgem de la l=1 la end=(0+1)*3−1=2. Adunăm input[1]=1 → sum=1.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ← parcurgere parțială", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "active": true}, {"val": 3}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0, "hidden": true}]] },
        { "label": "Suma parțială", "groups": [[{"val": "sum = 0+1 = 1", "active": true}]] }
      ]
    },
    {
      "line": 45,
      "text": "Continuăm capătul stâng: adunăm input[2]=3 → sum = 1+3 = 4. Capătul stâng parțial este finalizat.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓ parțial gata", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "sorted": true}, {"val": 3, "active": true}]] },
        { "label": "Block 1 [3-5]", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0, "hidden": true}]] },
        { "label": "Suma parțială", "groups": [[{"val": "sum = 1+3 = 4", "active": true}]] }
      ]
    },
    {
      "line": 48,
      "text": "Faza 2 – blocuri complete: de la c_l+1=1 la c_r−1=1, adică doar Block 1. Adunăm direct b[1]=17 → sum = 4+17 = 21. O singură operație în loc de 3 iterații!",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓ parțial", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓ complet – b[1]=17", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]", "groups": [[{"val": 9}, {"val": 2}, {"val": 0, "hidden": true}]] },
        { "label": "Suma după b[1]", "groups": [[{"val": "sum = 4+17 = 21", "sorted": true}]] }
      ]
    },
    {
      "line": 51,
      "text": "Faza 3 – capăt drept parțial (Block 2): parcurgem de la c_r*3=6 la r=7. Adunăm input[6]=9 → sum = 21+9 = 30.",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]  ← parcurgere parțială", "groups": [[{"val": 9, "active": true}, {"val": 2}, {"val": 0, "hidden": true}]] },
        { "label": "Suma parțială", "groups": [[{"val": "sum = 21+9 = 30", "active": true}]] }
      ]
    },
    {
      "line": 51,
      "text": "Adunăm input[7]=2 → sum = 30+2 = 32. Capătul drept parțial este finalizat. Toate cele 3 faze s-au terminat!",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  ✓", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  ✓", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]  ✓ parțial", "groups": [[{"val": 9, "sorted": true}, {"val": 2, "active": true}, {"val": 0, "hidden": true}]] },
        { "label": "Suma finală", "groups": [[{"val": "sum = 30+2 = 32", "sorted": true}]] }
      ]
    },
    {
      "line": 53,
      "text": "Returnăm suma finală: query(1, 7) = 32. Am folosit doar 5 operații: 2 pe capătul stâng + 1 bloc complet (b[1]=17, O(1)!) + 2 pe capătul drept, față de 7 iterate naiv!",
      "blocksVisual": [
        { "label": "Block 0 [0-2]  (2 op)", "groups": [[{"val": 2, "hidden": true}, {"val": 1, "sorted": true}, {"val": 3, "sorted": true}]] },
        { "label": "Block 1 [3-5]  (1 op – b[1]=17)", "groups": [[{"val": 4, "sorted": true}, {"val": 5, "sorted": true}, {"val": 8, "sorted": true}]] },
        { "label": "Block 2 [6-8]  (2 op)", "groups": [[{"val": 9, "sorted": true}, {"val": 2, "sorted": true}, {"val": 0, "hidden": true}]] },
        { "label": "Rezultat Final query[1,7]", "groups": [[{"val": "32", "sorted": true}]] }
      ]
    },
    {
      "line": 57,
      "text": "Intrăm în funcția main și definim vectorul de intrare input cu 9 elemente.",
      "blocksVisual": [
        { "label": "input", "groups": [[{"val": 2}, {"val": 1}, {"val": 3}, {"val": 4}, {"val": 5}, {"val": 8}, {"val": 9}, {"val": 2}, {"val": 0}]] }
      ]
    },
    {
      "line": 58,
      "text": "Apelăm funcția preprocess(input) pentru a precalcula sumele pe blocuri.",
      "blocksVisual": [
        { "label": "b[]", "groups": [[{"val": 6, "sorted": true}, {"val": 17, "sorted": true}, {"val": 11, "sorted": true}]] }
      ]
    },
    {
      "line": 59,
      "text": "Apelăm query(input, 1, 7) pentru a obține suma în timp O(sqrt(N)) și o afișăm la consolă.",
      "blocksVisual": [
        { "label": "Afișat", "groups": [[{"val": "32", "sorted": true}]] }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Range Sum Query",
        "url": "https://leetcode.com/problems/range-sum-query-mutable/",
        "desc": "Clasica RSQ"
      }
    ],
    "medium": [
      {
        "title": "Arbori de intervale",
        "url": "https://www.pbinfo.ro/probleme/2096/arbori-de-intervale",
        "desc": "Se pot face cu Sqrt!"
      }
    ],
    "hard": [
      {
        "title": "Holes",
        "url": "https://codeforces.com/contest/13/problem/E",
        "desc": "Sarături din bloc în bloc pe CF"
      }
    ]
  },
  globalVars: [
    { name: "blockSize", type: "int", val: "3", expandable: false },
    { name: "b", type: "std::vector<int>", val: "size = 3", expandable: true }
  ],
  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const stepData = [
        { phase: "preprocess", i: -1, b: [0,0,0] }, // 0
        { phase: "preprocess", i: -1, b: [0,0,0] }, // 1
        { phase: "preprocess", i: -1, b: [0,0,0] }, // 2
        { phase: "preprocess", i: 0,  b: [2,0,0] }, // 3
        { phase: "preprocess", i: 1,  b: [3,0,0] }, // 4
        { phase: "preprocess", i: 2,  b: [6,0,0] }, // 5
        { phase: "preprocess", i: 3,  b: [6,4,0] }, // 6
        { phase: "preprocess", i: 4,  b: [6,9,0] }, // 7
        { phase: "preprocess", i: 5,  b: [6,17,0] }, // 8
        { phase: "preprocess", i: 6,  b: [6,17,9] }, // 9
        { phase: "preprocess", i: 7,  b: [6,17,11] }, // 10
        { phase: "preprocess", i: 8,  b: [6,17,11] }, // 11
        { phase: "query", l: 1, r: 7, sum: 0, c_l: -1, c_r: -1 }, // 12
        { phase: "query", l: 1, r: 7, sum: 0, c_l: 0,  c_r: 2 },  // 13
        { phase: "query", l: 1, r: 7, sum: 1, c_l: 0,  c_r: 2 },  // 14
        { phase: "query", l: 1, r: 7, sum: 4, c_l: 0,  c_r: 2 },  // 15
        { phase: "query", l: 1, r: 7, sum: 21, c_l: 0, c_r: 2 },  // 16
        { phase: "query", l: 1, r: 7, sum: 30, c_l: 0, c_r: 2 },  // 17
        { phase: "query", l: 1, r: 7, sum: 32, c_l: 0, c_r: 2 },  // 18
        { phase: "query", l: 1, r: 7, sum: 32, c_l: 0, c_r: 2 },  // 19
        { phase: "main" }, // 20
        { phase: "main" }, // 21
        { phase: "main" }  // 22
      ];

      const curr = stepData[stepIndex] || stepData[stepData.length - 1];

      const bVals = (curr.phase === "preprocess") ? curr.b : [6, 17, 11];
      const bStr = "{" + bVals.join(", ") + "}";
      globalVars.push({ name: "blockSize", type: "int", val: (stepIndex >= 1 ? "3" : "0"), expandable: false });
      globalVars.push({ name: "b", type: "std::vector<int>", val: bStr, expandable: true });

      if (curr.phase === "preprocess") {
        frames.push({ name: "preprocess(const vector<int>& input)", file: "solution.cpp", line: activeLine });
      } else if (curr.phase === "query") {
        frames.push({ name: "query(const vector<int>& input, int l = 1, int r = 7)", file: "solution.cpp", line: activeLine });
      }
      frames.push({ name: "main()", file: "main.cpp", line: (stepIndex === 20 ? 57 : (stepIndex === 21 ? 58 : 59)) });

      if (curr.phase === "preprocess") {
        vars.push({ name: "input", type: "const std::vector<int>&", val: "size = 9", expandable: true });
        if (curr.i !== -1) {
          vars.push({ name: "i", type: "int", val: curr.i.toString(), expandable: false });
          vars.push({ name: "input[i]", type: "int", val: [2, 1, 3, 4, 5, 8, 9, 2, 0][curr.i].toString(), expandable: false });
        }
        inlineVal = curr.i !== -1 ? "i: " + curr.i : "";
      } else if (curr.phase === "query") {
        vars.push({ name: "input", type: "const std::vector<int>&", val: "size = 9", expandable: true });
        vars.push({ name: "l", type: "int", val: curr.l.toString(), expandable: false });
        vars.push({ name: "r", type: "int", val: curr.r.toString(), expandable: false });
        vars.push({ name: "sum", type: "int", val: curr.sum.toString(), expandable: false });
        if (curr.c_l !== -1) {
          vars.push({ name: "c_l", type: "int", val: curr.c_l.toString(), expandable: false });
          vars.push({ name: "c_r", type: "int", val: curr.c_r.toString(), expandable: false });
        }
        inlineVal = "sum: " + curr.sum;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      if (stepIndex >= 3 && stepIndex <= 11) {
        const i = stepIndex - 3;
        if (lineNum === 22 || lineNum === 23) return "i: " + i;
      }
      if (stepIndex >= 12 && stepIndex <= 19) {
        let sum = (stepIndex >= 18) ? 32 : ((stepIndex === 17) ? 30 : ((stepIndex === 16) ? 21 : ((stepIndex === 15) ? 4 : ((stepIndex === 14) ? 1 : 0))));
        if (lineNum === 35 || lineNum === 36 || lineNum === 45 || lineNum === 48 || lineNum === 51 || lineNum === 53) {
          return "sum: " + sum;
        }
      }
      return null;
    }
  }
};
