const fs = require('fs');
const path = require('path');

const absolutePath = path.resolve('c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/Disjoint_Sets.js');
const fileContent = fs.readFileSync(absolutePath, 'utf8');

const codeToEval = fileContent.replace('export const data =', 'module.exports =');
const tempFile = path.resolve('C:/Users/User8/.gemini/antigravity/brain/e9000940-a1c1-4ecd-9d24-13532c574ad4/scratch/temp_dsu_eval.js');
fs.writeFileSync(tempFile, codeToEval, 'utf8');
const dataObj = require(tempFile);
fs.unlinkSync(tempFile);

// Update code block to remove any weird text
dataObj.code = `
#include <iostream>
#include <vector>

using namespace std;

struct DSU {
    vector<int> parent;
    vector<int> rank;

    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for (int i = 0; i < n; i++)
            parent[i] = i; 
    }

    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]);
    }

    void unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);

        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    }
};

int main() {
    DSU dsu(6);
    dsu.unite(0, 2);
    dsu.unite(4, 2);
    dsu.unite(3, 1);
    dsu.unite(5, 3);
    dsu.unite(0, 5);
    
    if (dsu.find(4) == dsu.find(1))
        cout << "4 si 1 sunt in aceeasi multime (conectate)!\\n";
    
    return 0;
}
`;

// Fix line mappings
const newLines = [
  47, // Step 1
  48, // Step 2
  30, // Step 3
  39, // Step 4
  49, // Step 5
  31, // Step 6
  39, // Step 7
  50, // Step 8
  31, // Step 9
  39, // Step 10
  51, // Step 11
  31, // Step 12
  39, // Step 13
  52, // Step 14
  31, // Step 15
  39, // Step 16
  54, // Step 17
  54, // Step 18
  24, // Step 19
  26, // Step 20
  55  // Step 21
];

newLines.forEach((l, idx) => {
  if (dataObj.explanations[idx]) {
    dataObj.explanations[idx].line = l;
  }
});

// Update presentation and complexities with LaTeX
dataObj.presentation = "### Prezentare Generală\n\n**Disjoint Set Union (DSU)**, cunoscută și sub numele de **Păduri de Mulțimi Disjuncte (Union-Find)**, este o structură de date concepută pentru a gestiona eficient o partiție a unei mulțimi de elemente în submulțimi disjuncte.\n\nEa oferă două operații fundamentale:\n- **Find($x$):** Determină din ce mulțime face parte elementul $x$ (returnează un reprezentant unic sau rădăcina subarborelui lui $x$).\n- **Union($x$, $y$):** Unește mulțimile din care fac parte elementele $x$ și $y$ într-o singură mulțime.\n\nFiecare mulțime este reprezentată sub forma unui arbore, unde rădăcina arborelui servește drept reprezentant al mulțimii.";

dataObj.complexity = "### Complexitate\n\n- **Timp:** \n  - Fără optimizări, operațiile pot dura $O(N)$ în cel mai rău caz.\n  - Folosind **Compresia Drumului (Path Compression)** și **Unirea după Rang (Union by Rank/Size)**, timpul amortizat per interogare devine $O(\\alpha(N))$, unde $\\alpha$ este inversa funcției Ackermann. Deoarece $\\alpha(N) \\le 4$ pentru orice valoare practică a lui $N$, operațiile se execută aproape instantaneu, adică în $O(1)$ amortizat.\n- **Spațiu:** $O(N)$ memorie pentru stocarea părinților (`parent`) și a rangurilor (`rank`).";

dataObj.variations = "### Variații și Edge Cases\n\n1. **DSU cu Rollback:** În probleme unde trebuie să anulăm ultimele uniri (de tip Undo), nu putem folosi compresia drumului (pentru că modifică arborele ireversibil). Folosind doar unirea după rang, complexitatea crește la $O(\\log N)$ per operație, dar permite restaurarea stării anterioare prin salvarea modificărilor într-o stivă.\n2. **Kruskal pentru MST:** Algoritmul lui Kruskal pentru determinarea Arborelui Parțial de Cost Minim folosește DSU pentru a detecta și preveni formarea de cicluri la adăugarea muchiilor.";

const outputContent = `export const data = ${JSON.stringify(dataObj, null, 2)};\n`;
fs.writeFileSync(absolutePath, outputContent, 'utf8');
console.log('DSU updated successfully!');
