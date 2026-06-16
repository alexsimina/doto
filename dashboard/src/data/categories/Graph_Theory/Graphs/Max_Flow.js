export const data = {
  "presentation": "### Prezentare Generală\n\nFluxul Maxim (Max Flow) este o problemă în care dorim să aflăm cantitatea maximă de 'ceva' (apă, mașini, date) ce poate fi transportată dintr-o Sursă într-o Destinație printr-o rețea de conducte cu capacități limitate.\\n\\nCei mai folosiți algoritmi:\\n1. **Edmonds-Karp**: Implementare a metodei Ford-Fulkerson folosind BFS pentru a găsi drumuri de creștere.\\n2. **Dinic**: Mult mai rapid, folosește un Graf pe Niveluri și fluxuri de blocare.",
  "complexity": "### Complexitate\n\nEdmonds-Karp: O(V * E^2). Dinic: O(V^2 * E). Pentru rețele bipartite, Dinic ajunge la O(E * sqrt(V)).",
  "variations": "### Variații și Edge Cases\n\nMin-Cost Max-Flow, Bipartite Matching (poate fi redus la Max Flow).",
  "applications": "### Aplicații\n\nAsignarea de joburi către muncitori, routing de trafic, competiții sportive.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Flux Maxim",
        "url": "https://www.pbinfo.ro/probleme/flux-maxim",
        "desc": "Problemă educațională pentru flux maxim."
      }
    ],
    "medium": [
      {
        "title": "Download Speed",
        "url": "https://cses.fi/problemset/task/1694",
        "desc": "Calcularea lățimii de bandă maxime în rețea."
      }
    ],
    "hard": [
      {
        "title": "Police Chase",
        "url": "https://cses.fi/problemset/task/1695",
        "desc": "Găsirea tăieturii minime (Min-Cut) pe graf."
      }
    ]
  }
};
