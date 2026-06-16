# Ghid de Extindere Syllabus pentru Agenți (Instructions README)

Acest ghid oferă instrucțiuni clare pentru alți agenți AI în vederea extinderii arborelui curricular (Syllabus Tree) din aplicația `doto`.

## 📌 Obiectiv General
Să integreze noile teme/secțiuni (din programa de olimpiadă) în arborele syllabus din front-end (`dashboard/src/data/syllabusData.js`), să le asocieze cu modulele corespunzătoare de explicații în `mockCategoryData.js` și să creeze fișierele de date asociate fiecărui capitol.

---

## 📂 Pași de Implementare

### 1. Crearea Modulelor JavaScript de Explicații
Pentru fiecare temă nouă, trebuie să existe un fișier `.js` corespunzător în directorul `dashboard/src/data/categories/` (e.g. `Fundamentals/Number_Digits.js`). 
Fiecare fișier trebuie să exporte un obiect numit `data` cu următoarea structură:

```javascript
export const data = {
  "presentation": "### Prezentare Generală\n\n[Descriere detaliată...]",
  "complexity": "### Complexitate\n\n- **Timp:** O(...) \n- **Spațiu:** O(...)",
  "variations": "### Variații și Edge Cases\n\n1. [Variație 1...]\n2. [Edge Case 2...]",
  "applications": "### Aplicații\n\n[Unde se aplică în practică / probleme...]",
  "code": `
#include <iostream>
// Cod C++ de bază, complet și curat
`,
  "explanations": [
    {
      "line": 10, // Numărul liniei din blocul 'code' (1-indexed, excluzând liniile goale de la început)
      "text": "Explicație detaliată a acestei linii.",
      "blocksVisual": [ // Vizualizări de tip debugger (opțional)
        {
          "label": "Stare",
          "groups": [
            [
              { "val": "x = 5", "active": true }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Nume Problemă",
        "url": "https://...",
        "desc": "Scurt indiciu"
      }
    ],
    "medium": [],
    "hard": []
  }
};
```

*Notă: Textul explicativ trebuie să fie scris în limba română.*

### 🎨 Ghid de Adăugare Vizualizări (Visualization Guide)
Pentru a crește calitatea vizuală și interactivitatea (WOW factor), fiecare agent trebuie să adauge stări de vizualizare specifice în array-ul `explanations` (în interiorul fiecărui pas de depanare). Frontend-ul suportă patru formate de vizualizare:

#### A. `blocksVisual` (Vectori, Stive, Cozi, Frecvențe)
Este ideal pentru a prezenta structuri de date liniare. Reprezintă o listă de rânduri, unde fiecare rând poate avea un label și mai multe grupuri de elemente:
```javascript
"blocksVisual": [
  {
    "label": "Nume Structură (ex. Vector sau Stivă)",
    "groups": [
      [
        { "val": 10, "active": true }, // Element selectat/activ (culoare albastră)
        { "val": 20, "sorted": true },  // Element sortat (culoare verde)
        { "val": 30, "hidden": true }   // Element ascuns/opacitate mică
      ]
    ]
  }
]
```

#### B. `matrix` (Matrice DP, Tabele, Grilă Lee)
Ideal pentru programare dinamică (tabele de stări) sau algoritmi pe grile.
```javascript
"matrix": {
  "headers": ["", "col 0", "col 1", "col 2"],
  "data": [
    ["lin 0", "0", "1", "2"],
    ["lin 1", "3", "4", "5"]
  ],
  "activeCells": [{ "r": 0, "c": 2 }],   // Celulă activă în pasul curent (verde)
  "highlightCells": [{ "r": 1, "c": 1 }] // Celulă evidențiată (galben)
}
```

#### C. `graphVisual` (Grafuri, Arbori, DFS/BFS, Kruskal, Dijkstra)
Folosit pentru a desena grafuri personalizate. Fiecare nod are coordonate absolute `x` și `y` în cadrul spațiului de vizualizare de `280x220` pixeli.
```javascript
"graphVisual": {
  "nodes": [
    { "id": 1, "x": 50, "y": 100, "label": "1", "state": "visited" }, // state poate fi "active", "visited" sau "default"
    { "id": 2, "x": 150, "y": 50, "label": "2", "state": "active" },
    { "id": 3, "x": 150, "y": 150, "label": "3", "state": "default" }
  ],
  "edges": [
    { "source": 1, "target": 2 },
    { "source": 1, "target": 3 }
  ]
}
```

#### D. `visual` (Formule matematice, Puncte geometrice, Text ASCII)
Folosit ca fallback pentru vizualizări textuale monospace, util în matematică.
```javascript
"visual": "Pas 1: 15 % 7 = 1\nPas 2: 1 * 8 % 7 = 1"
```


### 2. Înregistrarea Categoriilor în `mockCategoryData.js`
După crearea fișierului `.js` pentru un nou capitol, acesta trebuie importat în `dashboard/src/data/mockCategoryData.js` și adăugat în obiectul `mockCategoryData` folosind calea sa logică ca cheie (e.g. `"Fundamentals/Number_Digits"`).

Exemplu:
```javascript
import { data as data_Fundamentals_Number_Digits } from './categories/Fundamentals/Number_Digits.js';

const mockCategoryData = {
  // ... restul capitolelor
  "Fundamentals/Number_Digits": data_Fundamentals_Number_Digits,
};
```

### 3. Adăugarea Nodului în `syllabusData.js`
Noul nod trebuie înregistrat în `dashboard/src/data/syllabusData.js`:
- Adaugă ID-ul nodului (e.g., `num_digits`) în array-ul `nodes` al grupului corespunzător în `domainGroups`.
- Adaugă nodul în array-ul `rawNodes` cu formatul:
  `{ id: 'num_digits', label: 'Fundamentals/Number_Digits', x: <valoare>, y: <valoare>, status: null }`
- Adaugă relațiile de dependență (muchii) în array-ul `rawEdges`:
  `{ from: 'parent_node_id', to: 'num_digits' }`

*Atenție la coordonatele `x` și `y`: asigurați-vă că noile noduri sunt poziționate vizual logic față de nodurile învecinate, evitând suprapunerile.*

---

## ⚙️ Detalii Tehnice ale Depanatorului (CLion Debugger)

Când creați date noi pentru capitole, țineți cont de următoarele reguli și comportamente ale interfeței de depanare:

### 1. Regula de Indexare a Liniilor (Line Numbering & Sanitization)
- Frontend-ul **sanitizează automat** codul C++ înainte de a-l afișa, eliminând exact primul și ultimul caracter de linie nouă (`\n`) introduse de template literals în JavaScript.
- De exemplu, dacă scrieți:
  ```javascript
  code: `
  #include <iostream>
  int main() { ... }
  `
  ```
  Linia `#include <iostream>` este considerată **linia 1** (1-indexed). Liniile din array-ul `explanations` trebuie indexate pornind de la această linie reală. Nu adăugați decalaje artificiale pentru a compensa newline-ul de după backtick-ul de deschidere.

### 2. Comportamentul Modalului și Navigarea
- Utilizatorul se poate întoarce la arborele de cursuri (Syllabus Tree) în trei moduri:
  - Apăsând butonul `✕` din colțul modalului.
  - Apăsând tasta `Escape` (Esc) pe tastatură.
  - Dând click pe fundalul întunecat din afara ferestrei debugger-ului (overlay).
- Fereastra de cod are o înălțime extinsă de `850px` pentru a ocupa aproape tot ecranul, iar caseta de explicație de sub visualizer se restrânge automat dacă explicația este mai scurtă (limitată la `maxHeight: '350px'`), maximizând spațiul util pentru Call Stack și Variables.

---

## 🛠️ Scripturi Utile pentru Validare
În directorul `dashboard/` există mai multe scripturi CJS utile pe care le puteți rula pentru a valida corectitudinea datelor:
- `node check_explanations.cjs` - Verifică consistența formatului explicațiilor din fișiere.
- `node check_depth.cjs` - Verifică adâncimea și structura arborelui.
- `node check_text_code.cjs` - Verifică dacă textul sau codul au probleme de sintaxă sau pot cauza erori în UI.
