export const data = {
  "presentation": "### Prezentare Generală\n\nO Componentă Tare Conexă (Strongly Connected Component - SCC) într-un graf orientat este un subgraf în care orice nod poate ajunge la oricare altul din componentă.\\n\\nPrincipalii algoritmi:\\n1. **Kosaraju**: Folosește două parcurgeri DFS (una pe graful normal, alta pe graful transpus).\\n2. **Tarjan**: Face o singură parcurgere DFS și menține niște indici (low-link) pentru a identifica componentele din mers.",
  "complexity": "### Complexitate\n\nAmbele au complexitate O(V + E) (timp liniar).",
  "variations": "### Variații și Edge Cases\n\nPentru grafuri neorientate, vorbim de Componente Biconexe și Puncte de Articulație.",
  "applications": "### Aplicații\n\nRețele de implicații logice (2-SAT), analiza circuitelor ecologice.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "CTC",
        "url": "https://www.pbinfo.ro/probleme/ctc",
        "desc": "Determinarea componentelor tare conexe."
      }
    ],
    "medium": [
      {
        "title": "Flight Routes Check",
        "url": "https://cses.fi/problemset/task/1682",
        "desc": "Verificare conectivitate din ambele direcții."
      }
    ],
    "hard": [
      {
        "title": "Planets and Kingdoms",
        "url": "https://cses.fi/problemset/task/1683",
        "desc": "Împărțirea planetelor în regate folosind SCC."
      }
    ]
  }
};
