export const data = {
  "presentation": "### Prezentare Generală\n\nGăsirea celor mai scurte drumuri (Shortest Paths) este o problemă fundamentală pe grafuri ponderate.\\n\\nCând toate muchiile au cost 1, BFS este suficient. Însă, când avem costuri diferite (ex: distanțe kilometrice, timp), avem nevoie de algoritmi specializați:\\n\\n1. **Dijkstra**: Sursă unică, doar costuri pozitive.\\n2. **Bellman-Ford**: Sursă unică, costuri și negative, detectează cicluri.\\n3. **Floyd-Warshall**: Toate perechile (All-Pairs).",
  "complexity": "### Complexitate\n\n- **Timp:** Variază de la O(E log V) (Dijkstra) la O(V^3) (Floyd-Warshall).\n",
  "variations": "### Variații și Edge Cases\n\nA* (A-Star) folosește euristici pentru a ghida Dijkstra.",
  "applications": "### Aplicații\n\nNavigație rutieră, rutare IP în rețele.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Dijkstra",
        "url": "https://www.pbinfo.ro/probleme/dijkstra",
        "desc": "Aflarea distanțelor minime de la un nod la toate celelalte."
      }
    ],
    "medium": [
      {
        "title": "Shortest Routes I",
        "url": "https://cses.fi/problemset/task/1671",
        "desc": "Rute minime într-un graf mare orientat."
      }
    ],
    "hard": [
      {
        "title": "Flight Discount",
        "url": "https://cses.fi/problemset/task/1195",
        "desc": "Aplicare Dijkstra modificat cu stări suplimentare."
      }
    ]
  }
};
