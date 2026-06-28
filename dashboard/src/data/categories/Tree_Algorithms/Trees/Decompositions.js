export const data = {
  "presentation": "### Descompuneri pe Arbori\n\nDescompunerile pe arbori reprezintă o clasă puternică de tehnici folosite pentru a împărți structura complexă a unui arbore în sub-componente mai simple (cum ar fi drumuri liniare sau subarbori independenți). Aceste tehnici permit extinderea algoritmilor și structurilor de date liniare (precum arborii de intervale sau structurile de tip Fenwick) la structuri arborescente.\n\nPrincipalele descompuneri pe care le analizăm sunt:\n1. **Heavy-Light Decomposition (HLD)**: Împarte arborele în drumuri liniare disjuncte (*heavy paths*), permițând actualizări și interogări pe drumuri în timp $O(\\log^2 N)$ utilizând un arbore de intervale.\n2. **Centroid Decomposition**: Divide recursiv arborele în jurul *centroidului* său (un nod care, odată eliminat, împarte arborele în componente de dimensiune cel mult $N/2$). Aceasta reduce structura generală a arborelui la un arbore centroid de adâncime $O(\\log N)$, fiind excelent pentru probleme legate de distanțe sau drumuri de lungimi specifice.",
  "complexity": "### Complexități\n\n- **Heavy-Light Decomposition**: Preprocesare în $O(N)$ sau $O(N \\log N)$, interogare/actualizare în $O(\\log^2 N)$ per drum.\n- **Centroid Decomposition**: Construcția arborelui centroid se realizează în $O(N \\log N)$ timp și $O(N)$ spațiu. Interogările se rezolvă adesea urcând în arborele centroid în timp $O(\\log N)$.",
  "variations": "### Variații și Structuri Corelate\n\n- **HLD pe muchii**: Transpunerea valorilor de pe muchii pe nodurile corespunzătoare (de obicei pe nodul fiu din muchie).\n- **Centroid Decomposition Dinamic**: Utilizarea structurii de centroid pentru a răspunde la interogări dinamice despre culorile sau stările nodurilor.\n- **Descompunerea în căi ușoare/grele prin centroid (Centroid Path)**: Tehnici hibride pentru optimizarea anumitor interogări.",
  "applications": "### Aplicații Reale\n\n- Actualizarea valorilor nodurilor și interogarea sumei/maximului pe drumul cel mai scurt între două noduri arbitrare dintr-un arbore.\n- Numărarea perechilor de noduri aflate la o distanță dată sau pe drumuri cu anumite proprietăți restrictive.\n- Rutare eficientă și menținerea structurilor dinamice de rețea.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Subtree Queries",
        "url": "https://cses.fi/problemset/task/1137",
        "desc": "Interogări pe subarbori folosind indexarea Euler sau HLD."
      }
    ],
    "medium": [
      {
        "title": "Path Queries",
        "url": "https://cses.fi/problemset/task/1138",
        "desc": "Interogări și actualizări pe drumuri utilizând Heavy-Light Decomposition."
      }
    ],
    "hard": [
      {
        "title": "Covoare",
        "url": "https://www.pbinfo.ro/probleme/2984/covoare",
        "desc": "Descompunere avansată pe arbori."
      }
    ]
  }
};
