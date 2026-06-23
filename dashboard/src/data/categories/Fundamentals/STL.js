export const data = {
  presentation: "### Introducere în STL\n\n**STL** (*Standard Template Library*) este o parte fundamentală a limbajului C++ care pune la dispoziție structuri de date și algoritmi gata implementați, extrem de eficienți. Cele mai frecvent utilizate containere de bază sunt:\n\n1. **`std::vector`**: Tablou dinamic care își modifică dimensiunea automat. Permite accesul în timp $O(1)$ la orice element.\n2. **`std::pair`**: Structură simplă care grupează două valori ce pot avea tipuri diferite. Valorile sunt accesibile prin membrii `.first` și `.second`.\n3. **`std::set`**: Colecție ordonată de elemente unice. Inserarea, căutarea și ștergerea se realizează în timp logaritmic, adică $O(\\log N)$.\n4. **`std::map`**: Tablou asociativ care stochează perechi cheie-valoare. Cheile sunt unice și ordonate. Căutarea după cheie se face în $O(\\log N)$.",
  complexity: "### Complexitate\n\n- **`std::vector`**:\n  - Acces indexat: $O(1)$.\n  - Inserare la sfârșit (`push_back`): $O(1)$ amortizat.\n- **`std::set` și `std::map`**:\n  - Inserare / Căutare / Ștergere: $O(\\log N)$ (unde $N$ este numărul de elemente).\n- **`std::pair`**:\n  - Creare și accesare: $O(1)$.",
  variations: "### Variații și Cazuri Particulare\n\n- **Containere Neordonate (`unordered_set`, `unordered_map`)**: Sunt implementate folosind tabele de dispersie (*hash tables*). Oferă un timp mediu de căutare și inserare de $O(1)$, însă elementele nu mai sunt stocate în ordine.\n- **`std::multiset` și `std::multimap`**: Variații care permit stocarea de elemente/chei duplicate, menținându-le în continuare ordonate.",
  applications: "### Aplicații Reale\n\n- **`vector`**: Stocarea listelor dinamice de utilizatori, produse sau scoruri în jocuri.\n- **`pair`**: Reprezentarea coordonatelor carteziene $(x, y)$ sau a costurilor asociate unor muchii în grafuri ponderate: `pair<int, int>`.\n- **`set`**: Eliminarea rapidă a duplicatelor dintr-un șir masiv de date.\n- **`map`**: Numărarea frecvenței de apariție a cuvintelor dintr-un text generos.",
  code: `#include <iostream>
#include <vector>
#include <utility>
#include <set>
#include <map>

using namespace std;

int main() {
    // 1. Vector
    vector<int> v;
    v.push_back(10);
    
    // 2. Pair
    pair<int, string> p = {1, "unu"};
    
    // 3. Set
    set<int> s;
    s.insert(5);
    s.insert(5);
    
    // 4. Map
    map<string, int> m;
    m["mere"] = 3;
    
    int val = v[0];
    int count = s.size();
    int mere_count = m["mere"];
    
    return 0;
}
`,
  explanations: [
    {
      line: 11,
      text: "Declarăm un vector de numere întregi $v$, inițial gol.",
      blocksVisual: [
        {
          label: "Vector v",
          groups: [
            [{ val: "v: []", active: true }]
          ]
        }
      ]
    },
    {
      line: 12,
      text: "Adăugăm elementul $10$ la finalul vectorului folosind `push_back`. Dimensiunea vectorului devine $1$.",
      blocksVisual: [
        {
          label: "Vector v",
          groups: [
            [{ val: "10", active: true }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Inițializăm perechea $p$ cu valorile $1$ (pe prima poziție, `.first`) și `\"unu\"` (pe a doua poziție, `.second`).",
      blocksVisual: [
        {
          label: "Pereche p",
          groups: [
            [{ val: "first: 1", active: true }, { val: "second: \"unu\"", active: true }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Declarăm o mulțime ordonată $s$ pentru a păstra elemente întregi unice. În acest moment este goală.",
      blocksVisual: [
        {
          label: "Mulțime s",
          groups: [
            [{ val: "s: {}", active: true }]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Inserăm valoarea $5$ în mulțime. $s$ devine $\\{5\\}$.",
      blocksVisual: [
        {
          label: "Mulțime s",
          groups: [
            [{ val: "5", active: true }]
          ]
        }
      ]
    },
    {
      line: 20,
      text: "Încercăm să inserăm din nou valoarea $5$. Deoarece elementele într-un `std::set` trebuie să fie unice, inserarea este ignorată. Mulțimea rămâne $\\{5\\}$.",
      blocksVisual: [
        {
          label: "Mulțime s (ignorat duplicat)",
          groups: [
            [{ val: "5" }]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Declarăm un dicționar $m$ care asociază chei de tip șir de caractere cu valori întregi.",
      blocksVisual: [
        {
          label: "Dicționar m",
          groups: [
            [{ val: "m: {}", active: true }]
          ]
        }
      ]
    },
    {
      line: 24,
      text: "Asociem cheii `\"mere\"` valoarea $3$. Dacă cheia nu exista, ea este creată.",
      blocksVisual: [
        {
          label: "Dicționar m",
          groups: [
            [{ val: "\"mere\" -> 3", active: true }]
          ]
        }
      ]
    },
    {
      line: 26,
      text: "Accesăm primul element din vector: $v[0] = 10$.",
      blocksVisual: [
        {
          label: "Citire Vector",
          groups: [
            [{ val: "val = 10", active: true }]
          ]
        }
      ]
    },
    {
      line: 27,
      text: "Obținem dimensiunea mulțimii $s$ folosind funcția `size()`. Valoarea returnată este $1$, deoarece duplicatul a fost ignorat.",
      blocksVisual: [
        {
          label: "Dimensiune Mulțime",
          groups: [
            [{ val: "count = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 28,
      text: "Căutăm și citim valoarea asociată cheii `\"mere\"` în dicționar. Obținem valoarea $3$.",
      blocksVisual: [
        {
          label: "Citire Dicționar",
          groups: [
            [{ val: "mere_count = 3", active: true }]
          ]
        }
      ]
    },
    {
      line: 30,
      text: "Finalizăm programul cu succes.",
      blocksVisual: [
        {
          label: "Final",
          groups: [
            [{ val: "return 0", active: true }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Perechi Elementare",
        url: "https://www.pbinfo.ro/probleme/2312/pereche",
        desc: "Folosește std::pair pentru a stoca și manipula perechi de date."
      }
    ],
    medium: [
      {
        title: "Verificare Duplicate",
        url: "https://www.pbinfo.ro/probleme/3079/elemente-distincte",
        desc: "Folosește std::set pentru a număra rapid elementele unice dintr-un șir dat."
      }
    ],
    hard: [
      {
        title: "Frecvența Cuvintelor",
        url: "https://www.pbinfo.ro/probleme/2784/frecventa-cuvinte",
        desc: "Folosește std::map pentru a ordona cuvintele primite după frecvență sau alfabetic."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 11 });

      if (stepIndex >= 0) {
        let vVal = stepIndex >= 1 ? '[10]' : '[]';
        vars.push({ name: 'v', type: 'std::vector<int>', val: vVal, expandable: true });
      }
      if (stepIndex >= 2) {
        vars.push({ name: 'p', type: 'std::pair<int, string>', val: '{first: 1, second: "unu"}', expandable: true });
      }
      if (stepIndex >= 3) {
        let sVal = stepIndex >= 4 ? '{5}' : '{}';
        vars.push({ name: 's', type: 'std::set<int>', val: sVal, expandable: true });
      }
      if (stepIndex >= 6) {
        let mVal = stepIndex >= 7 ? '{"mere": 3}' : '{}';
        vars.push({ name: 'm', type: 'std::map<string, int>', val: mVal, expandable: true });
      }
      if (stepIndex >= 8) {
        vars.push({ name: 'val', type: 'int', val: 10, expandable: false });
      }
      if (stepIndex >= 9) {
        vars.push({ name: 'count', type: 'int', val: 1, expandable: false });
      }
      if (stepIndex >= 10) {
        vars.push({ name: 'mere_count', type: 'int', val: 3, expandable: false });
      }

      if (activeLine === 11) inlineVal = "v: []";
      else if (activeLine === 12) inlineVal = "v: [10]";
      else if (activeLine === 15) inlineVal = 'p: {first: 1, second: "unu"}';
      else if (activeLine === 18) inlineVal = "s: {}";
      else if (activeLine === 19) inlineVal = "s: {5}";
      else if (activeLine === 20) inlineVal = "s: {5}";
      else if (activeLine === 23) inlineVal = "m: {}";
      else if (activeLine === 24) inlineVal = 'm: {"mere": 3}';
      else if (activeLine === 26) inlineVal = "val: 10";
      else if (activeLine === 27) inlineVal = "count: 1";
      else if (activeLine === 28) inlineVal = "mere_count: 3";

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 11 && stepIndex >= 0) return 'v: []';
      if (lineNum === 12 && stepIndex >= 1) return 'v: [10]';
      if (lineNum === 15 && stepIndex >= 2) return 'p: {first: 1, second: "unu"}';
      if (lineNum === 18 && stepIndex >= 3) return 's: {}';
      if (lineNum === 19 && stepIndex >= 4) return 's: {5}';
      if (lineNum === 20 && stepIndex >= 5) return 's: {5}';
      if (lineNum === 23 && stepIndex >= 6) return 'm: {}';
      if (lineNum === 24 && stepIndex >= 7) return 'm: {"mere": 3}';
      if (lineNum === 26 && stepIndex >= 8) return 'val: 10';
      if (lineNum === 27 && stepIndex >= 9) return 'count: 1';
      if (lineNum === 28 && stepIndex >= 10) return 'mere_count: 3';
      return null;
    }
  }
};
