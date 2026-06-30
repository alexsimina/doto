export const data = {
  "presentation": "### Grafuri Bipartite\n\nUn graf neorientat $G = (V, E)$ se numește **bipartit** dacă mulțimea nodurilor sale $V$ poate fi împărțită în două submulțimi nevide și disjuncte $L$ și $R$ ($V = L \\cup R$, $L \\cap R = \\emptyset$) astfel încât orice muchie din $E$ să aibă o extremitate în mulțimea $L$ și cealaltă în mulțimea $R$. \n\nCu alte cuvinte, nu există nicio muchie ale cărei extremități să aparțină aceleiași mulțimi (nu există muchii în interiorul lui $L$ sau în interiorul lui $R$).\n\n### Proprietăți Cheie\n\n- **Cicluri de lungime impară**: Un graf este bipartit dacă și numai dacă **nu conține cicluri de lungime impară**.\n- **Colorare**: Un graf este bipartit dacă și numai dacă poate fi colorat folosind exact două culori, astfel încât orice două noduri adiacente să aibă culori diferite.\n- **Arbori**: Orice arbore este un graf bipartit.",
  "complexity": "### Determinare și Complexitate\n\nVerificarea dacă un graf este bipartit se poate face printr-o parcurgere clasică (DFS sau BFS):\n- Pornim parcurgerea și colorăm nodul de start cu o culoare (de exemplu, $0$).\n- Pentru fiecare vecin nevizitat, îl colorăm cu cealaltă culoare (de exemplu, $1 - \\text{culoarea\\_curentă}$).\n- Dacă întâlnim un vecin deja vizitat care are aceeași culoare cu nodul curent, atunci graful **nu este bipartit**.\n- Dacă parcurgerea se finalează fără conflicte, graful este bipartit.\n\n- **Complexitate de Timp**: $\\mathcal{O}(N + M)$ - parcurgem fiecare nod și muchie cel mult o dată.\n- **Complexitate de Spațiu**: $\\mathcal{O}(N)$ - vectorul de culori și stiva DFS/coada BFS.",
  "variations": "### Tipuri și Extensii\n\n- **Graf Bipartit Complet ($K_{a, b}$)**: Un graf bipartit în care fiecare nod din mulțimea $L$ (de dimensiune $a$) este conectat cu toate nodurile din mulțimea $R$ (de dimensiune $b$). Numărul total de muchii este $a \\cdot b$.\n- **Cuplaj Maxim**: Găsirea unui set maxim de muchii independente (care nu împart niciun nod). Se rezolvă eficient cu algoritmi dedicați precum algoritmul lui Kuhn sau Hopcroft-Karp.",
  "applications": "### Aplicații Practice\n\n- **Alocare de resurse**: Potrivirea job-urilor cu mașinile capabile să le execute.\n- **Sisteme de recomandare**: Modelarea relațiilor de tip utilizator-produs (muchie între un utilizator și produsele cumpărate/apreciate).\n- **Problema căsătoriilor stabile**: Algoritmul Gale-Shapley pentru potrivirea optimă a două grupuri distincte.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Verificare Graf Bipartit",
        "url": "https://www.pbinfo.ro/probleme/1783/graf-bipartit",
        "desc": "Verificarea bipartitului prin colorare."
      }
    ],
    "medium": [
      {
        "title": "Colorare Graf",
        "url": "https://leetcode.com/problems/is-graph-bipartite/",
        "desc": "Problemă clasică LeetCode pentru determinarea grafului bipartit."
      }
    ],
    "hard": [
      {
        "title": "Cuplaj Maxim în Graf Bipartit",
        "url": "https://www.pbinfo.ro/probleme/2633/cuplaj-maxim",
        "desc": "Aflarea dimensiunii cuplajului maxim folosind algoritmul Kuhn."
      }
    ]
  }
};
