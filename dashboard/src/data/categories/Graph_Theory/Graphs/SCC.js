export const data = {
  "presentation": "### Componente Tare Conexe (SCC)\n\nÎntr-un graf orientat $G = (V, E)$, o **Componentă Tare Conexă** (Strongly Connected Component - SCC) este un subgraf maximal $U \\subseteq V$ în care există un drum orientat între oricare două noduri $u, v \\in U$ (adică $u \\to v$ și $v \\to u$).\n\nProprietățile componentelor tare conexe:\n- Dacă contractăm fiecare SCC într-un singur nod, graful rezultat va fi întotdeauna un **DAG** (Directed Acyclic Graph).\n- Acest lucru ne permite să reducem probleme complexe pe grafuri arbitrare la probleme mai simple pe grafuri fără cicluri.\n\nCei mai cunoscuți algoritmi de determinare a SCC-urilor sunt:\n1. **Kosaraju**: Folosește două parcurgeri DFS, una pe graful inițial și una pe graful transpus.\n2. **Tarjan**: Realizează o singură parcurgere DFS, identificând componentele folosind o stivă și un index numit *low-link*.",
  "complexity": "### Complexități de Timp și Spațiu\n\n- **Kosaraju**: Timp $O(V + E)$ (două parcurgeri DFS), spațiu $O(V + E)$ pentru graful transpus.\n- **Tarjan**: Timp $O(V + E)$ (o singură parcurgere), spațiu $O(V)$ pentru stivă și indici.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Componente Biconexe**: Pentru grafuri neorientate, unde căutăm noduri a căror eliminare ar deconecta graful (puncte de articulație/punți).",
  "applications": "### Aplicații Reale\n\n- Rezolvarea problemei 2-SAT (2-Satisfiability).\n- Determinarea grupurilor strâns conectate în rețelele sociale.\n- Identificarea dependențelor circulare în codul sursă al programelor software.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "CTC",
        "url": "https://www.pbinfo.ro/probleme/ctc",
        "desc": "Aflarea componentelor tare conexe dintr-un graf orientat."
      }
    ],
    "medium": [
      {
        "title": "Flight Routes Check",
        "url": "https://cses.fi/problemset/task/1682",
        "desc": "Verificarea posibilității de a zbura între oricare două aeroporturi din rețea."
      }
    ],
    "hard": [
      {
        "title": "Planets and Kingdoms",
        "url": "https://cses.fi/problemset/task/1683",
        "desc": "Organizarea planetelor în regate izolate, reprezentate prin componente tare conexe."
      }
    ]
  }
};
