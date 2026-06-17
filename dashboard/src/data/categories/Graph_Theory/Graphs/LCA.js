export const data = {
  "presentation": "### Lowest Common Ancestor (LCA)\n\nLowest Common Ancestor (LCA) reprezintă cel mai apropiat strămoș comun al două noduri $u$ și $v$ dintr-un arbore cu rădăcină. Cu alte cuvinte, este nodul $w$ situat la adâncimea maximă care este strămoș atât pentru $u$, cât și pentru $v$.\n\nUnele dintre proprietățile cheie ale LCA includ:\n- Distanța dintre două noduri $u$ și $v$ în arbore poate fi calculată ca:\n  $$d(u, v) = \\text{depth}(u) + \\text{depth}(v) - 2 \\cdot \\text{depth}(\\text{LCA}(u, v))$$\n- LCA este esențial în rezolvarea interogărilor pe drumuri în arbori (de exemplu, determinarea valorii minime/maxime pe un drum).\n\nAici vom studia două tehnici majore pentru determinarea LCA:\n1. **Binary Lifting**: Salturi binare care permit determinarea LCA în timp $O(\\log N)$ per interogare.\n2. **Euler Tour + RMQ**: Reducerea problemei LCA la aflarea minimului într-un interval pe o parcurgere Euler, rezolvată în timp $O(1)$ per interogare cu preprocesare $O(N \\log N)$.",
  "complexity": "### Complexități de Timp și Spațiu\n\n- **Binary Lifting**: Preprocesare în $O(N \\log N)$ timp și spațiu, interogare în $O(\\log N)$.\n- **Euler Tour + RMQ**: Preprocesare în $O(N \\log N)$ timp și spațiu (pentru Sparse Table), interogare în $O(1)$ timp.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Arbore neconectat (Pădure)**: LCA este definit doar dacă nodurile se află în aceeași componentă conexă.\n- **Interogări dinamice (Link-Cut Trees)**: Determinarea LCA într-un arbore care își schimbă structura dinamic.",
  "applications": "### Aplicații Reale\n\n- Rutare în rețele ierarhice.\n- Determinarea relațiilor evolutive în arbori filogenetici în biologie.\n- Rezolvarea interogărilor pe arbori în competițiile de programare sportivă.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "LCA - Lowest Common Ancestor",
        "url": "https://www.pbinfo.ro/probleme/lca",
        "desc": "Aflarea clasică a strămoșului comun într-un arbore."
      }
    ],
    "medium": [
      {
        "title": "Distance Queries",
        "url": "https://cses.fi/problemset/task/1135",
        "desc": "Folosirea LCA pentru a calcula distanțele dintre noduri în mod eficient."
      }
    ],
    "hard": [
      {
        "title": "Company Queries II",
        "url": "https://cses.fi/problemset/task/1688",
        "desc": "Găsirea rapidă a superiorului comun pentru mai mulți angajați dintr-o ierarhie mare."
      }
    ]
  }
};
