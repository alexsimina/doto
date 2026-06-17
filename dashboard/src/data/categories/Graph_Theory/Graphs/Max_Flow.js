export const data = {
  "presentation": "### Flux Maxim (Max Flow)\n\nProblema fluxului maxim presupune trimiterea unei cantități cât mai mari de \"resursă\" (apă, date, mărfuri) printr-o rețea de transport orientată care are o sursă $S$, o destinație $T$ și muchii cu capacități limitate $c(u, v) \\ge 0$.\n\nProprietățile de bază ale fluxului sunt:\n- **Limitarea capacității**: $f(u, v) \\le c(u, v)$\n- **Conservarea fluxului**: Pentru orice nod $u \\neq S, T$, fluxul total intrat este egal cu cel ieșit:\n  $$\\sum_{v \\in V} f(v, u) = \\sum_{v \\in V} f(u, v)$$\n- **Teorema Max-Flow Min-Cut**: Valoarea maximă a unui flux este egală cu capacitatea minimă a unei tăieturi $S-T$.\n\nAlgoritmii principali sunt:\n1. **Edmonds-Karp**: O implementare a metodei Ford-Fulkerson folosind BFS pentru găsirea drumurilor de creștere.\n2. **Dinic**: Un algoritm mult mai rapid care folosește un Graf pe Niveluri și fluxuri de blocare determinate prin DFS.",
  "complexity": "### Complexități de Timp și Spațiu\n\n- **Edmonds-Karp**: Timp $O(V \\cdot E^2)$, spațiu $O(V + E)$.\n- **Dinic**: Timp $O(V^2 \\cdot E)$ în cazul general și $O(E \\sqrt{V})$ pe rețele cu capacități unitare (cum ar fi cuplajele bipartite).",
  "variations": "### Variații și Cazuri Particulare\n\n- **Cuplaj Maxim în Graf Bipartit**: Poate fi redus la Max Flow adăugând o sursă fictivă și o destinație fictivă.\n- **Min-Cost Max-Flow**: Trimiterea fluxului maxim cu costul total minim.",
  "applications": "### Aplicații Reale\n\n- Distribuția de resurse în rețele de transport (ex: gaze naturale, energie electrică).\n- Planificarea personalului (ex: alocarea schimburilor de lucru).\n- Analiza vulnerabilității rețelelor (determinarea tăieturii minime).",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Flux Maxim",
        "url": "https://www.pbinfo.ro/probleme/flux-maxim",
        "desc": "Determinarea fluxului maxim într-o rețea dată."
      }
    ],
    "medium": [
      {
        "title": "Download Speed",
        "url": "https://cses.fi/problemset/task/1694",
        "desc": "Calcularea lățimii de bandă maxime de descărcare a datelor dintr-o rețea."
      }
    ],
    "hard": [
      {
        "title": "Police Chase",
        "url": "https://cses.fi/problemset/task/1695",
        "desc": "Găsirea numărului minim de străzi care trebuie blocate pentru a opri infractorul (Min-Cut)."
      }
    ]
  }
};
