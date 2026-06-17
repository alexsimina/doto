export const data = {
  "presentation": "### Arbore Parțial de Cost Minim (MST)\n\nUn Arbore Parțial de Cost Minim (Minimum Spanning Tree - MST) reprezintă un subgraf conex al unui graf ponderat, neorientat și conex $G = (V, E)$, care conține toate nodurile din $V$, este un arbore (nu are cicluri) și are suma costurilor muchiilor minimizată:\n$$W(T) = \\sum_{e \\in E_T} w(e) \\to \\text{minim}$$\n\nCei mai folosiți algoritmi pentru determinarea MST sunt:\n1. **Kruskal**: Algoritm de tip greedy care sortează muchiile și folosește o structură de date de tip DSU (Disjoint Set Union) pentru a evita formarea ciclurilor.\n2. **Prim**: Algoritm bazat pe extinderea treptată a unei singure componente conexe prin adăugarea celei mai ieftine muchii conectate, folosind o coadă de priorități.",
  "complexity": "### Complexități de Timp și Spațiu\n\n- **Kruskal**: Timp $O(E \\log E)$ sau $O(E \\log V)$ datorită sortării muchiilor; spațiu $O(V)$ pentru DSU.\n- **Prim**: Timp $O(E \\log V)$ folosind o coadă de priorități; spațiu $O(V + E)$ pentru stocarea grafului și a cozii.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Algoritmul lui Boruvka**: Utilizat în procesarea paralelă.\n- **Maximum Spanning Tree**: Aflarea arborelui de cost maxim (prin negarea ponderilor).",
  "applications": "### Aplicații Reale\n\n- Proiectarea rețelelor electrice, de apă sau internet cu costuri minime de instalare.\n- Algoritmuri de aproximare pentru probleme NP-dure (cum ar fi TSP - Problema comis-voiajorului).\n- Clustering de date în Machine Learning (Single-Linkage Clustering).",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "APM",
        "url": "https://www.pbinfo.ro/probleme/apm",
        "desc": "Arbore parțial de cost minim clasic."
      }
    ],
    "medium": [
      {
        "title": "Road Reparation",
        "url": "https://cses.fi/problemset/task/1675",
        "desc": "Conectarea orașelor cu cost minim de reparație a drumurilor."
      }
    ],
    "hard": [
      {
        "title": "Road Construction",
        "url": "https://cses.fi/problemset/task/1676",
        "desc": "Calcularea treptată a numărului de componente conexe și a celei mai mari componente pe măsură ce se adaugă drumuri."
      }
    ]
  }
};
