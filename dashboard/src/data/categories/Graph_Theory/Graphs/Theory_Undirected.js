export const data = {
  "presentation": "### Grafuri Neorientate: Concepte și Definiții de Bază\n\nUn **graf neorientat** este o structură matematică folosită pentru a modela relații simetrice între o mulțime de obiecte. \n\nFormal, un graf neorientat este o pereche ordonată $G = (V, E)$, unde:\n- $V$ este o mulțime finită și nevidă de **noduri** (sau vârfuri).\n- $E$ este o mulțime de **muchii** (sau conexiuni), reprezentate ca perechi neordonate de noduri distincte din $V$, adică $E \\subseteq \\{ \\{u, v\\} \\mid u, v \\in V, u \\neq v \\}$.\n\n### Concepte Fundamentale\n\n1. **Adiacență**: Două noduri $u$ și $v$ sunt adiacente dacă există o muchie $\\{u, v\\} \\in E$.\n2. **Incidență**: O muchie $e = \\{u, v\\}$ este incidentă cu nodurile $u$ și $v$ (extremitățile muchiei).\n3. **Gradul unui nod**: Gradul unui nod $v$, notat cu $\\deg(v)$, reprezintă numărul de muchii incidente cu acesta.\n   - Un nod cu gradul $0$ se numește **izolat**.\n   - Un nod cu gradul $1$ se numește **terminal** (sau frunză).\n\n### Teoreme Importante\n\n- **Teorema Gradelor (Handshaking Lemma)**: În orice graf neorientat, suma gradelor tuturor nodurilor este egală cu dublul numărului de muchii:\n  $$\\sum_{v \\in V} \\deg(v) = 2 \\cdot |E|$$\n- **Consecință**: În orice graf neorientat, numărul de noduri cu grad impar este par.\n\n### Structuri Speciale de Grafuri\n\n- **Graf Complet ($K_n$)**: Un graf cu $n$ noduri în care există o muchie între oricare două noduri distincte. Numărul total de muchii în $K_n$ este:\n  $$|E| = \\frac{n(n-1)}{2}$$\n- **Graf Bipartit**: Un graf ale cărui noduri pot fi împărțite în două mulțimi disjuncte $A$ și $B$ ($V = A \\cup B$, $A \\cap B = \\emptyset$) astfel încât orice muchie din graf conectează un nod din $A$ cu un nod din $B$.\n- **Graf Nul**: Un graf care nu are nicio muchie ($E = \\emptyset$).\n- **Graf Regulat**: Un graf în care toate nodurile au același grad $k$. Se mai numește graf $k$-regulat.\n- **Subgraf**: Un graf $G' = (V', E')$ este subgraf al lui $G = (V, E)$ dacă $V' \\subseteq V$ și $E' \\subseteq E$ cu extremitățile muchiilor din $E'$ în $V'$.\n- **Graf Parțial**: Un graf parțial al lui $G = (V, E)$ este un graf $G' = (V, E')$ unde $E' \\subseteq E$ (păstrează toate nodurile, dar elimină muchii).\n- **Graf Complementar ($\\overline{G}$)**: Are aceeași mulțime de noduri $V$, iar o muchie $\\{u, v\\}$ există în $\\overline{G}$ dacă și numai dacă nu există în $G$.",
  "complexity": "### Reprezentare și Complexități\n\nGrafurile pot fi reprezentate în memorie prin mai multe metode, fiecare având avantaje și dezavantaje:\n\n1. **Matricea de Adiacență**:\n   O matrice pătratică $A$ de dimensiune $N \\times N$, unde $A[i][j] = 1$ dacă există muchia $\\{i, j\\}$ și $0$ altfel. Pentru grafuri neorientate, matricea este **simetrică** ($A[i][j] = A[j][i]$).\n   - **Spațiu**: $\\mathcal{O}(N^2)$\n   - **Verificare muchie $\\{i, j\\}$**: $\\mathcal{O}(1)$\n   - **Găsire vecini nod $i$**: $\\mathcal{O}(N)$\n\n2. **Listele de Adiacență**:\n   Un vector de liste (sau `std::vector`), unde pentru fiecare nod $i$ reținem lista vecinilor săi.\n   - **Spațiu**: $\\mathcal{O}(N + M)$ (optim pentru grafuri rare, unde $M \\ll N^2$)\n   - **Verificare muchie $\\{i, j\\}$**: $\\mathcal{O}(\\deg(i))$\n   - **Găsire vecini nod $i$**: $\\mathcal{O}(\\deg(i))$",
  "variations": "### Alte Reprezentări și Concepte\n\n- **Lista de Muchii**: O listă simplă ce conține toate cele $M$ perechi de noduri conectate. Foarte utilă în algoritmi precum Kruskal (pentru Arbori Parțiali de Cost Minim) sau Bellman-Ford.\n- **Conexitate**: Un graf este **conectat** dacă există drum între oricare două noduri. Subgrafurile maximale conectate se numesc **componente conexe**.",
  "applications": "### Aplicații Practice\n\n- **Rețele Sociale**: Modelarea legăturilor de prietenie (relații simetrice) în rețele de socializare.\n- **Rețele Electrice și de Apă**: Modelarea conexiunilor fizice unde fluxul poate circula în ambele sensuri.\n- **Probleme de Repartizare**: Utilizarea grafurilor bipartite pentru cuplaje optime (de exemplu, potrivirea studenților cu proiectele lor).",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Componente Conexe",
        "url": "https://www.pbinfo.ro/probleme/539/dfs",
        "desc": "Determinarea numărului de componente conexe într-un graf neorientat folosind DFS."
      }
    ],
    "medium": [
      {
        "title": "Graf Complet",
        "url": "https://www.pbinfo.ro/probleme/1782/graf-complet",
        "desc": "Verificarea dacă un graf dat este complet."
      }
    ],
    "hard": [
      {
        "title": "Graf Bipartit",
        "url": "https://www.pbinfo.ro/probleme/22/bipartit",
        "desc": "Determinarea dacă un graf neorientat este bipartit prin colorare cu două culori."
      }
    ]
  }
};
