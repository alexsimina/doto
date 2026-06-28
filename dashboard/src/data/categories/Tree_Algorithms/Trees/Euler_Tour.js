export const data = {
  "presentation": "### Parcurgerea Euler (Euler Tour)\n\nParcurgerea Euler a unui arbore reprezintă o tehnică fundamentală prin care structura bidimensională a unui arbore este aplatizată într-un vector liniar. Acest lucru se realizează prin înregistrarea nodurilor vizitate în timpul unei parcurgeri în adâncime (DFS), adăugând un nod în listă atât la prima sa vizită (intrare), cât și după revenirea din fiecare subarbore al fiilor săi.\n\nPentru un arbore cu $N$ noduri, parcurgerea Euler conține exact $2N - 1$ elemente. Această reprezentare are proprietăți matematice remarcabile:\n- Orice subarbore corespunde unui interval continuu în parcurgere.\n- Cel mai apropiat strămoș comun (LCA) a două noduri $u$ și $v$ corespunde nodului cu adâncimea minimă din intervalul cuprins între primele apariții ale lui $u$ și $v$ în vectorul Euler. Astfel, problema LCA este redusă la o interogare RMQ (Range Minimum Query) în timp $O(1)$ după o preprocesare $O(N \\log N)$ a vectorului.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(N)$ - fiecare muchie a arborelui este parcursă exact de două ori (dus și întors).\n- **Spațiu:** $O(N)$ - dimensiunea vectorului de parcurgere este $2N - 1$, iar stiva de recursivitate ocupă maximum $O(N)$ în cel mai nefavorabil caz.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Parcurgere Euler pe muchii**: Fiecare muchie este adăugată de două ori (la coborâre și la urcare). Este utilă pentru actualizări pe drumuri.\n- **Parcurgere de tip interval (Start/End DFS)**: Se salvează doar timpii de intrare și de ieșire ai fiecărui nod, rezultând un vector de dimensiune $2N$. Acest format este ideal pentru interogări pe subarbori.",
  "applications": "### Aplicații Reale\n\n- Determinarea LCA în timp constant $O(1)$ prin reducerea la RMQ.\n- Rezolvarea interogărilor pe subarbori (actualizarea unui nod și interogarea sumei valorilor din subarborele său) folosind un arbore de intervale peste reprezentarea liniară.\n- Algoritmul lui Mo pe arbori folosind timpii de început și de sfârșit ai parcurgerii.",
  "code": `#include <iostream>
#include <vector>

using namespace std;

void dfs(int node, int parent, const vector<vector<int>>& adj, vector<int>& tour) {
    tour.push_back(node);
    for (int neighbor : adj[node]) {
        if (neighbor != parent) {
            dfs(neighbor, node, adj, tour);
            tour.push_back(node);
        }
    }
}

int main() {
    int N = 4;
    vector<vector<int>> adj(N);
    adj[0] = {1, 2};
    adj[1] = {0, 3};
    adj[2] = {0};
    adj[3] = {1};
    vector<int> tour;
    dfs(0, -1, adj, tour);
    for (int x : tour) {
        cout << x << " ";
    }
    return 0;
}`,
  "explanations": [
    {
      "line": 16,
      "text": "Începem funcția `main()` a programului.",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Declarăm numărul de noduri al arborelui, $N = 4$.",
      "blocksVisual": []
    },
    {
      "line": 18,
      "text": "Inițializăm lista de adiacență `adj` cu 4 elemente.",
      "blocksVisual": []
    },
    {
      "line": 19,
      "text": "Adăugăm legăturile pentru nodul 0: vecinii săi sunt nodurile 1 și 2.",
      "blocksVisual": []
    },
    {
      "line": 20,
      "text": "Adăugăm legăturile pentru nodul 1: vecinii săi sunt nodurile 0 și 3.",
      "blocksVisual": []
    },
    {
      "line": 21,
      "text": "Adăugăm vecinul nodului 2, care este nodul 0.",
      "blocksVisual": []
    },
    {
      "line": 22,
      "text": "Adăugăm vecinul nodului 3, care este nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Declarăm vectorul `tour` în care vom stoca elementele parcurgerii Euler.",
      "blocksVisual": []
    },
    {
      "line": 24,
      "text": "Apelăm funcția recursivă `dfs` pentru rădăcina 0, setând părintele inițial ca -1.",
      "blocksVisual": []
    },
    {
      "line": 6,
      "text": "Intrăm în funcția `dfs` pentru nodul 0 (parent = -1).",
      "blocksVisual": []
    },
    {
      "line": 7,
      "text": "Adăugăm nodul 0 în vectorul `tour` (prima vizită).",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Începem iterarea prin vecinii nodului 0. Primul vecin extras este 1.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă vecinul 1 este diferit de părinte (-1). Condiția este adevărată.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Apelăm recursiv `dfs(1, 0)` pentru a vizita subarborele nodului 1.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în `dfs` pentru nodul 1 (parent = 0).",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Adăugăm nodul 1 în `tour` (prima vizită a nodului 1).",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Iterăm prin vecinii nodului 1: vecinii sunt [0, 3]. Primul vecin extras este 0.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă vecinul 0 este diferit de părintele 0. Condiția este falsă (0 este părintele).",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Trecem la următorul vecin al nodului 1, care este 3.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă vecinul 3 este diferit de părintele 0. Condiția este adevărată.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Apelăm recursiv `dfs(3, 1)` pentru a vizita subarborele nodului 3.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în `dfs` pentru nodul 3 (parent = 1).",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Adăugăm nodul 3 în `tour`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Parcurgem vecinii nodului 3: singurul vecin este 1.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă vecinul 1 este diferit de părintele 1. Este fals.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Nu mai există alți vecini pentru nodul 3.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Ieșim din apelul recursiv `dfs(3, 1)`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }]]
        }
      ]
    },
    {
      "line": 11,
      "text": "Revenim în `dfs(1, 0)`. Adăugăm din nou nodul curent 1 în `tour` după întoarcerea din subarborele lui 3.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Nu mai există alți vecini nevizitați pentru nodul 1.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Ieșim din apelul recursiv `dfs(1, 0)`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }]]
        }
      ]
    },
    {
      "line": 11,
      "text": "Revenim în `dfs(0, -1)`. Adăugăm din nou nodul curent 0 în `tour` după întoarcerea din subarborele lui 1.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Trecem la următorul vecin al nodului 0, care este 2.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă vecinul 2 este diferit de părintele -1. Condiția este adevărată.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 10,
      "text": "Apelăm recursiv `dfs(2, 0)` pentru a vizita subarborele nodului 2.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 6,
      "text": "Intrăm în `dfs` pentru nodul 2 (parent = 0).",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 7,
      "text": "Adăugăm nodul 2 în `tour`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Parcurgem vecinii nodului 2: singurul vecin este 0.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Verificăm dacă vecinul 0 este diferit de părintele 0. Este fals.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Nu mai sunt alți vecini pentru nodul 2.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Ieșim din apelul recursiv `dfs(2, 0)`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }]]
        }
      ]
    },
    {
      "line": 11,
      "text": "Revenim în `dfs(0, -1)`. Adăugăm din nou nodul curent 0 în `tour` după întoarcerea din subarborele lui 2.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }, { "val": "0", "active": true }]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Am vizitat toți vecinii rădăcinii 0.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 14,
      "text": "Finalizăm apelul `dfs(0, -1)` și revenim în `main()`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 25,
      "text": "Începem bucla de afișare a vectorului `tour`.",
      "blocksVisual": [
        {
          "label": "Tour Euler",
          "groups": [[{ "val": "0" }, { "val": "1" }, { "val": "3" }, { "val": "1" }, { "val": "0" }, { "val": "2" }, { "val": "0" }]]
        }
      ]
    },
    {
      "line": 26,
      "text": "Afișăm elementul curent pe consolă: `0 1 3 1 0 2 0`.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [[{ "val": "0 1 3 1 0 2 0" }]]
        }
      ]
    },
    {
      "line": 28,
      "text": "Programul se încheie cu succes, returnând 0.",
      "blocksVisual": []
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Parcurgerea în adâncime a unui arbore (Pbinfo #3240)",
        "url": "https://www.pbinfo.ro/probleme/3240/dfs",
        "desc": "Implementarea de bază a parcurgerii în adâncime (DFS) pe un arbore, fundamentul din spatele parcurgerii Euler."
      },
      {
        "title": "Lowest Common Ancestor of a Binary Tree (LeetCode 236)",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        "desc": "Găsirea celui mai apropiat strămoș comun a două noduri într-un arbore binar."
      }
    ],
    "medium": [
      {
        "title": "Lowest Common Ancestor (Infoarena lca)",
        "url": "https://www.infoarena.ro/problema/lca",
        "desc": "Determinarea celui mai apropiat strămoș comun a două noduri într-un arbore oarecare, folosind tehnica Euler Tour combinată cu RMQ în timp amortizat O(1)."
      },
      {
        "title": "Propagating Tree (Codeforces 383C)",
        "url": "https://codeforces.com/problemset/problem/383/C",
        "desc": "Modificarea valorilor pe un subarbore cu semne alternante în funcție de adâncimea nodurilor, rezolvabilă eficient prin aplatizarea arborelui (Euler Tour)."
      }
    ],
    "hard": [
      {
        "title": "New Year Tree (Codeforces 620E)",
        "url": "https://codeforces.com/problemset/problem/620/E",
        "desc": "Actualizarea culorilor pe un întreg subarbore și determinarea numărului de culori distincte din subarbore, utilizând Euler Tour și un arbore de intervale cu Lazy Propagation și bitmasks."
      },
      {
        "title": "Allca (Pbinfo #4840)",
        "url": "https://www.pbinfo.ro/probleme/4840/allca",
        "desc": "Calcularea sumei valorilor LCA pentru toate perechile de noduri dintr-o subsecvență a unui arbore oarecare."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      let nodeVal = -1;
      let parentVal = -1;
      let neighborVal = -1;
      let activeStack = [];

      const tourHistory = [
        [], [], [], [], [], [], [], [], [], [],
        [0],
        [0], [0], [0], [0],
        [0, 1],
        [0, 1], [0, 1], [0, 1], [0, 1], [0, 1],
        [0, 1],
        [0, 1, 3],
        [0, 1, 3], [0, 1, 3], [0, 1, 3], [0, 1, 3],
        [0, 1, 3, 1],
        [0, 1, 3, 1], [0, 1, 3, 1],
        [0, 1, 3, 1, 0],
        [0, 1, 3, 1, 0], [0, 1, 3, 1, 0], [0, 1, 3, 1, 0], [0, 1, 3, 1, 0],
        [0, 1, 3, 1, 0, 2],
        [0, 1, 3, 1, 0, 2], [0, 1, 3, 1, 0, 2], [0, 1, 3, 1, 0, 2], [0, 1, 3, 1, 0, 2],
        [0, 1, 3, 1, 0, 2, 0],
        [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0]
      ];

      if (stepIndex >= 9 && stepIndex <= 13) {
        nodeVal = 0; parentVal = -1; activeStack = [[0, -1]];
        if (stepIndex >= 11) neighborVal = 1;
      } else if (stepIndex >= 14 && stepIndex <= 20) {
        nodeVal = 1; parentVal = 0; activeStack = [[1, 0], [0, -1]];
        if (stepIndex === 17) neighborVal = 0;
        if (stepIndex >= 18) neighborVal = 3;
      } else if (stepIndex >= 21 && stepIndex <= 26) {
        nodeVal = 3; parentVal = 1; activeStack = [[3, 1], [1, 0], [0, -1]];
        if (stepIndex >= 23 && stepIndex <= 25) neighborVal = 1;
      } else if (stepIndex >= 27 && stepIndex <= 29) {
        nodeVal = 1; parentVal = 0; activeStack = [[1, 0], [0, -1]];
        if (stepIndex === 27 || stepIndex === 28) neighborVal = 3;
      } else if (stepIndex >= 30 && stepIndex <= 33) {
        nodeVal = 0; parentVal = -1; activeStack = [[0, -1]];
        if (stepIndex === 30 || stepIndex === 31) neighborVal = 1;
        if (stepIndex >= 32) neighborVal = 2;
      } else if (stepIndex >= 34 && stepIndex <= 39) {
        nodeVal = 2; parentVal = 0; activeStack = [[2, 0], [0, -1]];
        if (stepIndex >= 36 && stepIndex <= 38) neighborVal = 0;
      } else if (stepIndex >= 40 && stepIndex <= 42) {
        nodeVal = 0; parentVal = -1; activeStack = [[0, -1]];
        if (stepIndex === 40 || stepIndex === 41) neighborVal = 2;
      }

      if (nodeVal !== -1) {
        vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
        vars.push({ name: 'parent', type: 'int', val: parentVal, expandable: false });
      }
      if (neighborVal !== -1) {
        vars.push({ name: 'neighbor', type: 'int', val: neighborVal, expandable: false });
      }

      globalVars.push({ name: 'N', type: 'int', val: '4', expandable: false });
      globalVars.push({ name: 'adj', type: 'const std::vector<std::vector<int>>&', val: 'size = 4', expandable: true });
      const currentTour = tourHistory[stepIndex] || [];
      globalVars.push({ name: 'tour', type: 'std::vector<int>&', val: `{${currentTour.join(', ')}}`, expandable: false });

      if (activeStack.length === 0) {
        frames.push({ name: 'main()', file: 'main.cpp', line: activeLine });
      } else {
        const top = activeStack[0];
        frames.push({ name: `dfs(node = ${top[0]}, parent = ${top[1]}, adj, tour)`, file: 'dfs.cpp', line: activeLine });
        for (let i = 1; i < activeStack.length; i++) {
          const frame = activeStack[i];
          frames.push({ name: `dfs(node = ${frame[0]}, parent = ${frame[1]}, adj, tour)`, file: 'dfs.cpp', line: 10 });
        }
        frames.push({ name: 'main()', file: 'main.cpp', line: 24 });
      }

      if (nodeVal !== -1) {
        inlineVal = `node: ${nodeVal}`;
        if (neighborVal !== -1) {
          inlineVal += `, neighbor: ${neighborVal}`;
        }
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let nodeVal = -1;
      let neighborVal = -1;

      if (stepIndex >= 9 && stepIndex <= 13) {
        nodeVal = 0; if (stepIndex >= 11) neighborVal = 1;
      } else if (stepIndex >= 14 && stepIndex <= 20) {
        nodeVal = 1;
        if (stepIndex === 17) neighborVal = 0;
        if (stepIndex >= 18) neighborVal = 3;
      } else if (stepIndex >= 21 && stepIndex <= 26) {
        nodeVal = 3; if (stepIndex >= 23 && stepIndex <= 25) neighborVal = 1;
      } else if (stepIndex >= 27 && stepIndex <= 29) {
        nodeVal = 1; if (stepIndex === 27 || stepIndex === 28) neighborVal = 3;
      } else if (stepIndex >= 30 && stepIndex <= 33) {
        nodeVal = 0;
        if (stepIndex === 30 || stepIndex === 31) neighborVal = 1;
        if (stepIndex >= 32) neighborVal = 2;
      } else if (stepIndex >= 34 && stepIndex <= 39) {
        nodeVal = 2; if (stepIndex >= 36 && stepIndex <= 38) neighborVal = 0;
      } else if (stepIndex >= 40 && stepIndex <= 42) {
        nodeVal = 0; if (stepIndex === 40 || stepIndex === 41) neighborVal = 2;
      }

      if ((lineNum === 6 || lineNum === 7 || lineNum === 8 || lineNum === 11 || lineNum === 14) && nodeVal !== -1) {
        return `node: ${nodeVal}`;
      }
      if ((lineNum === 8 || lineNum === 9 || lineNum === 10) && neighborVal !== -1) {
        return `neighbor: ${neighborVal}`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      let nodeVal = -1;
      let neighborVal = -1;
      let activeStack = [];

      if (stepIndex >= 9 && stepIndex <= 13) {
        nodeVal = 0; activeStack = [[0, -1]]; if (stepIndex >= 11) neighborVal = 1;
      } else if (stepIndex >= 14 && stepIndex <= 20) {
        nodeVal = 1; activeStack = [[1, 0], [0, -1]];
        if (stepIndex === 17) neighborVal = 0;
        if (stepIndex >= 18) neighborVal = 3;
      } else if (stepIndex >= 21 && stepIndex <= 26) {
        nodeVal = 3; activeStack = [[3, 1], [1, 0], [0, -1]];
        if (stepIndex >= 23 && stepIndex <= 25) neighborVal = 1;
      } else if (stepIndex >= 27 && stepIndex <= 29) {
        nodeVal = 1; activeStack = [[1, 0], [0, -1]];
        if (stepIndex === 27 || stepIndex === 28) neighborVal = 3;
      } else if (stepIndex >= 30 && stepIndex <= 33) {
        nodeVal = 0; activeStack = [[0, -1]];
        if (stepIndex === 30 || stepIndex === 31) neighborVal = 1;
        if (stepIndex >= 32) neighborVal = 2;
      } else if (stepIndex >= 34 && stepIndex <= 39) {
        nodeVal = 2; activeStack = [[2, 0], [0, -1]];
        if (stepIndex >= 36 && stepIndex <= 38) neighborVal = 0;
      } else if (stepIndex >= 40 && stepIndex <= 42) {
        nodeVal = 0; activeStack = [[0, -1]];
        if (stepIndex === 40 || stepIndex === 41) neighborVal = 2;
      }

      const tourHistory = [
        [], [], [], [], [], [], [], [], [], [],
        [0],
        [0], [0], [0], [0],
        [0, 1],
        [0, 1], [0, 1], [0, 1], [0, 1], [0, 1],
        [0, 1],
        [0, 1, 3],
        [0, 1, 3], [0, 1, 3], [0, 1, 3], [0, 1, 3],
        [0, 1, 3, 1],
        [0, 1, 3, 1], [0, 1, 3, 1],
        [0, 1, 3, 1, 0],
        [0, 1, 3, 1, 0], [0, 1, 3, 1, 0], [0, 1, 3, 1, 0], [0, 1, 3, 1, 0],
        [0, 1, 3, 1, 0, 2],
        [0, 1, 3, 1, 0, 2], [0, 1, 3, 1, 0, 2], [0, 1, 3, 1, 0, 2], [0, 1, 3, 1, 0, 2],
        [0, 1, 3, 1, 0, 2, 0],
        [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0], [0, 1, 3, 1, 0, 2, 0]
      ];

      const currentTour = tourHistory[stepIndex] || [];
      const visitedSet = new Set(currentTour);

      const staticNodes = [
        { id: "0", x: 150, y: 40, label: "0" },
        { id: "1", x: 80, y: 110, label: "1" },
        { id: "2", x: 220, y: 110, label: "2" },
        { id: "3", x: 80, y: 180, label: "3" }
      ];

      const staticEdges = [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "1", target: "3" }
      ];

      return {
        directed: false,
        title: "Parcurgerea Euler a Arborelui",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === nodeVal) state = "active";
          else if (visitedSet.has(idNum)) state = "visited";
          return { ...n, state };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = (u === nodeVal && v === neighborVal) || (v === nodeVal && u === neighborVal);
          if (!active && activeStack.length > 1) {
            for (let i = 0; i < activeStack.length - 1; i++) {
              const su = activeStack[i][0], sv = activeStack[i+1][0];
              if ((su === u && sv === v) || (su === v && sv === u)) {
                active = true;
                break;
              }
            }
          }
          return { ...e, active };
        })
      };
    }
  }
};
