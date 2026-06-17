export const data = {
  "presentation": "### Drumuri Minime (Shortest Path)\n\nGăsirea celui mai scurt drum între nodurile unui graf ponderat reprezintă una dintre problemele clasice ale informaticii. Dacă pentru grafuri neponderate simpla parcurgere BFS este suficientă pentru a obține un timp de $O(V + E)$, pe grafuri ponderate costurile pot diferi radical.\n\nMetodele consacrate sunt:\n1. **Dijkstra**: Sursă unică, optimizată pentru grafe cu ponderi strict non-negative $w(e) \\ge 0$. Utilizează un heap min pentru a extrage mereu nodul cel mai apropiat.\n2. **Bellman-Ford**: Sursă unică, permite ponderi negative și poate detecta cicluri de cost negativ. Se bazează pe relaxarea repetată a tuturor muchiilor.\n3. **Floyd-Warshall**: Determinarea drumurilor minime între oricare două perechi de noduri (All-Pairs Shortest Path), folosind programare dinamică.",
  "complexity": "### Complexități de Timp și Spațiu\n\n- **Dijkstra**: Timp $O(E \\log V)$ folosind o coadă de priorități bazată pe heap binare; spațiu $O(V + E)$.\n- **Bellman-Ford**: Timp $O(V \\cdot E)$; spațiu $O(V)$ pentru vectorul de distanțe.\n- **Floyd-Warshall**: Timp $O(V^3)$; spațiu $O(V^2)$ pentru stocarea matricei de distanțe.",
  "variations": "### Variații și Cazuri Particulare\n\n- **Algoritmul SPFA**: O variantă optimizată a algoritmului Bellman-Ford folosind o coadă, cu complexitate medie excelentă.\n- **Algoritmul A***: Folosește o funcție euristică pentru a accelera căutarea pe drumuri geometrice.",
  "applications": "### Aplicații Reale\n\n- Sisteme de navigație GPS (Google Maps, Waze).\n- Rutarea pachetelor de date pe internet (protocoalele OSPF, RIP).\n- Găsirea oportunităților de arbitraj financiar (schimburi valutare cu cicluri de profit negativ).",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Dijkstra",
        "url": "https://www.pbinfo.ro/probleme/dijkstra",
        "desc": "Aflarea distanțelor minime de la un nod la restul nodurilor din graf."
      }
    ],
    "medium": [
      {
        "title": "Shortest Routes I",
        "url": "https://cses.fi/problemset/task/1671",
        "desc": "Rute minime într-un graf orientat mare cu ponderi pozitive."
      }
    ],
    "hard": [
      {
        "title": "Flight Discount",
        "url": "https://cses.fi/problemset/task/1195",
        "desc": "Aplicarea Dijkstra modificat în care putem obține un zbor la jumătate de preț."
      }
    ]
  }
};
