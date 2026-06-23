export const data = {
  "presentation": `### Prezentare Generală

Algoritmul Flood Fill (sau algoritmul de umplere) este o tehnică utilizată pentru a determina și marca regiunile conectate dintr-o matrice multidimensională. Este cel mai bine cunoscut pentru funcționarea sa în instrumentul „Bucket Fill” (găleata de vopsea) din programele de editare grafică, unde dând click pe un pixel, întreaga zonă adiacentă de aceeași culoare este colorată cu o culoare nouă.

Algoritmul începe dintr-o celulă de start (sursă) și explorează toți vecinii acesteia în mod recursiv (folosind DFS - Depth-First Search) sau iterativ (folosind BFS - Breadth-First Search). Procesul se repetă pentru fiecare vecin care are culoarea inițială a punctului de pornire.

Este esențial să verificăm dacă noua culoare este diferită de cea veche înainte de a rula algoritmul; în caz contrar, programul va intra într-o buclă de recursivitate infinită (depășire de stivă - stack overflow).`,
  "complexity": `### Complexitate

Pentru o matrice de dimensiuni $R \\times C$ (linii și coloane):
- **Timp:** $O(R \\times C)$ — fiecare celulă este vizitată cel mult o dată (sau de un număr constant de ori corespunzător celor 4 direcții).
- **Spațiu:** $O(R \\times C)$ — în cazul DFS recursiv, stiva de recursivitate poate ajunge la o adâncime de $R \\times C$ în cel mai rău caz (o matrice liniară fără obstacole).`,
  "variations": `### Variații și Edge Cases

1. **Direcții de conectivitate:** Flood Fill poate fi aplicat pe 4 direcții (sus, jos, stânga, dreapta) sau 8 direcții (incluzând diagonalele).
2. **Flood Fill pe grafuri:** Deși este definit pe matrice, conceptul se aplică pe orice graf pentru a identifica componentele conexe (Connected Components).
3. **Culoare identică:** Dacă apelăm algoritmul pentru a înlocui o culoare cu ea însăși, trebuie să ne oprim imediat pentru a preveni recursivitatea infinită.`,
  "applications": `### Aplicații

- Instrumentul de umplere cu culoare (Paint Bucket) din editori grafici.
- Numărarea numărului de regiuni izolate (de exemplu, determinarea numărului de insule într-o hartă satelit).
- Detectarea zonelor închise în jocuri precum Minesweeper sau Go.`,
  "code": `
#include <iostream>
#include <vector>

using namespace std;

void floodFill(vector<vector<int>>& image, int r, int c, int oldColor, int newColor) {
    int rows = image.size();
    int cols = image[0].size();
    
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (image[r][c] != oldColor) return;
    
    image[r][c] = newColor;
    
    floodFill(image, r - 1, c, oldColor, newColor); // Sus
    floodFill(image, r + 1, c, oldColor, newColor); // Jos
    floodFill(image, r, c - 1, oldColor, newColor); // Stanga
    floodFill(image, r, c + 1, oldColor, newColor); // Dreapta
}

int main() {
    vector<vector<int>> img = {
        {1, 1, 1},
        {1, 1, 0},
        {1, 0, 1}
    };
    
    int startColor = img[1][1]; // Culoarea de start este 1
    if (startColor != 2) {
        floodFill(img, 1, 1, startColor, 2);
    }
    
    cout << "Imaginea dupa Flood Fill:\n";
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << img[i][j] << " ";
        }
        cout << "\n";
    }
    return 0;
}
`,
  "explanations": [
    {
      "line": 29,
      "text": "Salvăm culoarea inițială a celulei de la coordonatele $(1, 1)$, care este $1$. Aceasta va fi culoarea pe care o vom înlocui.",
      "blocksVisual": [
        {
          "label": "Culoare de start",
          "groups": [
            [
              { "val": "startColor = 1", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 30,
      "text": "Verificăm dacă noua culoare ($2$) este diferită de cea veche ($1$). Condiția fiind adevărată, continuăm pentru a evita recursivitatea infinită.",
      "blocksVisual": [
        {
          "label": "Verificare identitate",
          "groups": [
            [
              { "val": "1 != 2 (Adevărat)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 31,
      "text": "Apelăm funcția recursivă `floodFill` pornind din celula $(1,1)$.",
      "blocksVisual": [
        {
          "label": "Apel",
          "groups": [
            [
              { "val": "floodFill(img, 1, 1, 1, 2)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    },
    {
      "line": 8,
      "text": "Aflăm numărul total de linii din imagine: `rows = 3`.",
      "blocksVisual": [
        {
          "label": "Linii",
          "groups": [
            [
              { "val": "3", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 9,
      "text": "Aflăm numărul total de coloane din imagine: `cols = 3`.",
      "blocksVisual": [
        {
          "label": "Coloane",
          "groups": [
            [
              { "val": "3", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Verificăm limitele celulei curente $(1, 1)$. Deoarece coordonatele sunt valide (între $0$ și $2$), trecem de această verificare.",
      "blocksVisual": [
        {
          "label": "Validare limite",
          "groups": [
            [
              { "val": "În limite", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 12,
      "text": "Verificăm dacă pixelul de pe poziția curentă are culoarea inițială `oldColor = 1`. Deoarece `image[1][1] = 1`, continuăm.",
      "blocksVisual": [
        {
          "label": "Validare culoare",
          "groups": [
            [
              { "val": "Are culoarea 1", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 1, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 14,
      "text": "Modificăm culoarea celulei curente la noua culoare: `image[1][1] = 2`.",
      "blocksVisual": [
        {
          "label": "Recolorare",
          "groups": [
            [
              { "val": "image[1][1] = 2", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 16,
      "text": "Apelăm recursiv funcția `floodFill` pentru vecinul de sus: `r - 1 = 0`, adică celula $(0, 1)$.",
      "blocksVisual": [
        {
          "label": "Apel sus",
          "groups": [
            [
              { "val": "(0,1)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 1, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": [{ "r": 0, "c": 2 }]
      }
    },
    {
      "line": 14,
      "text": "Pentru $(0,1)$, limitele sunt corecte și culoarea este $1$. Recolorăm celula: `image[0][1] = 2`.",
      "blocksVisual": [
        {
          "label": "Recolorare vecin",
          "groups": [
            [
              { "val": "image[0][1] = 2", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 0, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 16,
      "text": "Din celula $(0,1)$, încercăm să mergem din nou în sus, adică la celula $(-1, 1)$.",
      "blocksVisual": [
        {
          "label": "Apel sus din (0,1)",
          "groups": [
            [
              { "val": "(-1,1)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 0, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 11,
      "text": "Pentru celula $(-1, 1)$, coordonata $r = -1$ este în afara limitelor matricei. Apelul se încheie imediat (backtrack).",
      "blocksVisual": [
        {
          "label": "Ieșire limite",
          "groups": [
            [
              { "val": "Invalid (r = -1)" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 0, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 17,
      "text": "Din celula $(1,1)$, după explorarea completă a ramurii de sus, apelăm recursiv pentru vecinul de jos: `r + 1 = 2`, adică celula $(2, 1)$.",
      "blocksVisual": [
        {
          "label": "Apel jos",
          "groups": [
            [
              { "val": "(2,1)", "active": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": [{ "r": 2, "c": 2 }]
      }
    },
    {
      "line": 12,
      "text": "Pentru $(2,1)$, observăm că valoarea din matrice este `image[2][1] = 0`. Culoarea nu corespunde cu `oldColor = 1`, deci apelul se întoarce imediat.",
      "blocksVisual": [
        {
          "label": "Verificare culoare",
          "groups": [
            [
              { "val": "Culoare diferită (0 != 1)" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 1, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 2, "c": 2 }],
        "highlightCells": []
      }
    },
    {
      "line": 18,
      "text": "Explorăm recursiv vecinul din stânga celulei active: `c - 1 = 0`, adică celula $(1, 0)$. Acesta are culoarea $1$ și este colorat în $2$.",
      "blocksVisual": [
        {
          "label": "Apel stânga",
          "groups": [
            [
              { "val": "(1,0) recolorat", "sorted": true }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 2, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 1 }],
        "highlightCells": []
      }
    },
    {
      "line": 19,
      "text": "Explorăm recursiv vecinul din dreapta: `c + 1 = 2`, adică celula $(1, 2)$. Are culoarea $0$, deci se întoarce.",
      "blocksVisual": [
        {
          "label": "Apel dreapta",
          "groups": [
            [
              { "val": "(1,2) ignorat" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 1, 2, 1],
          ["1", 2, 2, 0],
          ["2", 1, 0, 1]
        ],
        "activeCells": [{ "r": 1, "c": 2 }],
        "highlightCells": [{ "r": 1, "c": 3 }]
      }
    },
    {
      "line": 35,
      "text": "După ce toate celulele adiacente de aceeași culoare au fost parcurse și recolorate, afișăm matricea rezultată.",
      "blocksVisual": [
        {
          "label": "Rezultat final",
          "groups": [
            [
              { "val": "2 2 2" },
              { "val": "2 2 0" },
              { "val": "2 0 1" }
            ]
          ]
        }
      ],
      "matrix": {
        "title": "Gridul de Culori",
        "headers": ["R/C", "0", "1", "2"],
        "data": [
          ["0", 2, 2, 2],
          ["1", 2, 2, 0],
          ["2", 2, 0, 1]
        ],
        "activeCells": [],
        "highlightCells": []
      }
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      if (stepIndex <= 2) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        vars.push({ name: "img", type: "std::vector<std::vector<int>>", val: "size = 3 x 3", expandable: true });
        if (stepIndex >= 1) {
          vars.push({ name: "startColor", type: "int", val: "1", expandable: false });
          inlineVal = "startColor: 1";
        }
      } else if (stepIndex === 16) {
        frames.push({ name: "main()", file: "main.cpp", line: activeLine });
        vars.push({ name: "img", type: "std::vector<std::vector<int>>", val: "size = 3 x 3", expandable: true });
        vars.push({ name: "startColor", type: "int", val: "1", expandable: false });
      } else {
        let rVal = 1, cVal = 1;
        let depth = 1;
        let callerLine = 31;

        if (stepIndex === 9 || stepIndex === 10) {
          rVal = 0; cVal = 1; depth = 2; callerLine = 16;
        } else if (stepIndex === 11) {
          rVal = -1; cVal = 1; depth = 3; callerLine = 16;
        } else if (stepIndex === 13) {
          rVal = 2; cVal = 1; depth = 2; callerLine = 17;
        } else if (stepIndex === 14) {
          rVal = 1; cVal = 0; depth = 2; callerLine = 18;
        } else if (stepIndex === 15) {
          rVal = 1; cVal = 2; depth = 2; callerLine = 19;
        }

        frames.push({ name: `floodFill(image, r=${rVal}, c=${cVal}, oldColor=1, newColor=2)`, file: "solution.cpp", line: activeLine });
        if (depth >= 2) {
          const prevR = (depth === 3) ? 0 : 1;
          const prevC = 1;
          const prevLine = (depth === 3) ? 16 : callerLine;
          frames.push({ name: `floodFill(image, r=${prevR}, c=${prevC}, oldColor=1, newColor=2)`, file: "solution.cpp", line: prevLine });
        }
        if (depth === 3) {
          frames.push({ name: `floodFill(image, r=1, c=1, oldColor=1, newColor=2)`, file: "solution.cpp", line: 16 });
        }
        frames.push({ name: "main()", file: "main.cpp", line: 31 });

        vars.push({ name: "r", type: "int", val: rVal.toString(), expandable: false });
        vars.push({ name: "c", type: "int", val: cVal.toString(), expandable: false });
        vars.push({ name: "oldColor", type: "int", val: "1", expandable: false });
        vars.push({ name: "newColor", type: "int", val: "2", expandable: false });
        if (rVal === 1 && cVal === 1) {
          if (stepIndex >= 4) vars.push({ name: "rows", type: "int", val: "3", expandable: false });
          if (stepIndex >= 5) vars.push({ name: "cols", type: "int", val: "3", expandable: false });
        }

        inlineVal = `r: ${rVal}, c: ${cVal}, oldColor: 1, newColor: 2`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if (lineNum === 29 || lineNum === 30) {
        return "startColor: 1";
      }
      if (stepIndex >= 3 && stepIndex <= 15) {
        let rVal = 1, cVal = 1;
        if (stepIndex === 9 || stepIndex === 10) { rVal = 0; cVal = 1; }
        else if (stepIndex === 11) { rVal = -1; cVal = 1; }
        else if (stepIndex === 13) { rVal = 2; cVal = 1; }
        else if (stepIndex === 14) { rVal = 1; cVal = 0; }
        else if (stepIndex === 15) { rVal = 1; cVal = 2; }

        if (lineNum === 11 || lineNum === 12 || lineNum === 14) {
          return `r: ${rVal}, c: ${cVal}`;
        }
      }
      return null;
    }
  },
  "problems": {
    "easy": [
      {
        "title": "Flood Fill",
        "url": "https://leetcode.com/problems/flood-fill/",
        "desc": "Implementează algoritmul clasic Flood Fill pe o imagine reprezentată ca matrice bidimensională."
      }
    ],
    "medium": [
      {
        "title": "Number of Islands",
        "url": "https://leetcode.com/problems/number-of-islands/",
        "desc": "Numără componentele conexe formate din caractere de '1' (pământ) într-o mare de '0' (apă) folosind Flood Fill."
      }
    ],
    "hard": [
      {
        "title": "Making A Large Island",
        "url": "https://leetcode.com/problems/making-a-large-island/",
        "desc": "Folosește Flood Fill pentru a eticheta insulele conexe și a le calcula dimensiunile, apoi determină cum schimbarea unui singur '0' în '1' poate maximiza dimensiunea unei insule."
      }
    ]
  }
};
