export const data = {
  "presentation": "### Prezentare Generală\n\nLowest Common Ancestor (LCA) este nodul cel mai de jos într-un arbore care este strămoș pentru ambele noduri date u și v.\\n\\nCum îl aflăm?\\n1. **Binary Lifting**: Sărim din putere a lui 2 în putere a lui 2 în sus. Simplu de scris, eficient în memorie.\\n2. **Euler Tour + RMQ**: Reducem problema la Range Minimum Query pe o parcurgere liniară.",
  "complexity": "### Complexitate\n\nBinary Lifting: Preprocesare O(N log N), interogare O(log N). Euler+RMQ: Preprocesare O(N log N), interogare O(1).",
  "variations": "### Variații și Edge Cases\n\nDistanța minimă între 2 noduri în arbore: dist(u,v) = dist(u) + dist(v) - 2*dist(LCA(u,v)).",
  "applications": "### Aplicații\n\nCalculul distanțelor în structuri ierarhice, biologia moleculară (arbori filogenetici).",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "LCA - Lowest Common Ancestor",
        "url": "https://www.pbinfo.ro/probleme/lca",
        "desc": "Problemă clasică de aflare a strămoșului comun."
      }
    ],
    "medium": [
      {
        "title": "Distance Queries",
        "url": "https://cses.fi/problemset/task/1135",
        "desc": "Folosirea LCA pentru aflarea distanței între noduri pe arbore."
      }
    ],
    "hard": [
      {
        "title": "Company Queries II",
        "url": "https://cses.fi/problemset/task/1688",
        "desc": "Interogări multiple pe LCA într-un arbore mare."
      }
    ]
  }
};
