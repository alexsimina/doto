const steps = [
  {
    line: 66,
    text: "Pornim calcularea fluxului maxim folosind algoritmul Edmonds-Karp, care va satura drumurile din rețea.",
    flow: 0,
    cap: [
      [0, 3, 2, 0],
      [0, 0, 1, 2],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 32,
    text: "Intrăm în funcția edmondsKarp. Fluxul total este inițializat cu 0.",
    flow: 0,
    cap: [
      [0, 3, 2, 0],
      [0, 0, 1, 2],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Se lansează BFS-ul pentru a găsi primul drum de creștere în rețea.",
    flow: 0,
    cap: [
      [0, 3, 2, 0],
      [0, 0, 1, 2],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Găsim primul drum de creștere: 0 -> 1 -> 3 cu fluxul de 2 unități (gâtuire la muchia 1 -> 3 de capacitate 2).",
    flow: 2,
    cap: [
      [0, 1, 2, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 37,
    text: "Fluxul total crește la 2. Actualizăm capacitățile pe drumul 0 -> 1 -> 3 în graful rezidual.",
    flow: 2,
    cap: [
      [0, 1, 2, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Lansăm din nou BFS-ul pentru a căuta următorul drum de creștere.",
    flow: 2,
    cap: [
      [0, 1, 2, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 3],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Găsim al doilea drum de creștere: 0 -> 2 -> 3 cu fluxul de 2 unități (gâtuire la muchia 0 -> 2 de capacitate 2).",
    flow: 4,
    cap: [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 37,
    text: "Fluxul total crește la 4. Actualizăm capacitățile reziduale pe drumul 0 -> 2 -> 3.",
    flow: 4,
    cap: [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Căutăm din nou un drum de creștere.",
    flow: 4,
    cap: [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Găsim al treilea drum de creștere: 0 -> 1 -> 2 -> 3 cu fluxul de 1 unitate (capacitatea reziduală minimă pe acest drum este a muchiei 0 -> 1 sau 1 -> 2 care au ambele capacitate reziduală 1).",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 37,
    text: "Fluxul total crește la 5. Toate muchiile directe din rețea sunt acum complet saturate (capacitate reziduală 0).",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 36,
    text: "Lansăm BFS-ul pentru a patra oară. Nu mai există niciun drum ne-saturat de la sursă la chiuvetă.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 46,
    text: "Algoritmul Edmonds-Karp se termină și returnează fluxul maxim de 5 unități.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 68,
    text: "Pregătim vectorul visited pentru a marca nodurile accesibile din sursă. Toate sunt inițializate cu false.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 69,
    text: "Inițializăm coada de BFS q pentru parcurgerea reziduală.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 70,
    text: "Adăugăm sursa 0 în coadă: q.push(0).",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [false, false, false, false],
    q: [0],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 71,
    text: "Marcăm sursa ca vizitată: visited[0] = true. Sursa face parte din grupul S.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [0],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 73,
    text: "Începem bucla de BFS. Verificăm dacă coada este goală (conține elementul 0).",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [0],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 74,
    text: "Preluăm primul nod din coadă: u = 0.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [0],
    u: 0,
    v: -1,
    cutEdges: []
  },
  {
    line: 75,
    text: "Eliminăm nodul 0 din coadă: q.pop(). Coada devine goală.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: -1,
    cutEdges: []
  },
  {
    line: 76,
    text: "Iterăm prin vecinii nodului 0. Primul vecin este v = 1.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 1,
    cutEdges: []
  },
  {
    line: 77,
    text: "Verificăm dacă vecinul 1 este vizitat și dacă există capacitate reziduală: !visited[1] și cap[0][1] > 0. Deoarece cap[0][1] == 0, nu îl putem vizita.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 1,
    cutEdges: []
  },
  {
    line: 76,
    text: "Următorul vecin al nodului 0 este v = 2.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 2,
    cutEdges: []
  },
  {
    line: 77,
    text: "Verificăm pentru nodul 2: !visited[2] și cap[0][2] > 0. Cum cap[0][2] == 0, nu îl putem vizita.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 2,
    cutEdges: []
  },
  {
    line: 73,
    text: "Verificăm starea cozii de BFS. Deoarece coada este goală, parcurgerea BFS în graful rezidual s-a încheiat.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: []
  },
  {
    line: 84,
    text: "Începem căutarea muchiilor de tăietură, verificând fiecare nod i de la 0 la V-1. Începem cu i = 0.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: -1,
    cutEdges: []
  },
  {
    line: 85,
    text: "Verificăm dacă nodul 0 este vizitat (face parte din S-side). Da, visited[0] este true.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: -1,
    cutEdges: []
  },
  {
    line: 86,
    text: "Verificăm toți vecinii j ai nodului 0 pentru a vedea dacă vreo muchie traversează de la S la T. Verificăm j = 0.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 0,
    cutEdges: []
  },
  {
    line: 87,
    text: "Pentru j = 0: visited[0] este true, deci condiția !visited[j] este falsă.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 0,
    cutEdges: []
  },
  {
    line: 86,
    text: "Trecem la vecinul j = 1 al nodului 0.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 1,
    cutEdges: []
  },
  {
    line: 87,
    text: "Pentru j = 1: !visited[1] este true, orig_cap[0][1] (3) > 0 și cap[0][1] == 0. Condițiile sunt îndeplinite: muchia 0 -> 1 traversează de la S-side la T-side și este complet saturată.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 1,
    cutEdges: []
  },
  {
    line: 88,
    text: "Afișăm muchia 0 - 1 ca fiind parte din tăietura minimă.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 1,
    cutEdges: [[0, 1]]
  },
  {
    line: 86,
    text: "Trecem la vecinul j = 2 al nodului 0.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 2,
    cutEdges: [[0, 1]]
  },
  {
    line: 87,
    text: "Pentru j = 2: !visited[2] este true, orig_cap[0][2] (2) > 0 și cap[0][2] == 0. Muchia 0 -> 2 este saturată și merge din S în T.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 2,
    cutEdges: [[0, 1]]
  },
  {
    line: 88,
    text: "Afișăm muchia 0 - 2 ca fiind parte din tăietura minimă.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 2,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 86,
    text: "Trecem la vecinul j = 3 al nodului 0.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 3,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 87,
    text: "Pentru j = 3: !visited[3] este true, dar orig_cap[0][3] == 0. Nu există muchie directă de la 0 la 3 în graful inițial.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 0,
    v: 3,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 84,
    text: "Trecem la i = 1.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 1,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 85,
    text: "Verificăm dacă nodul 1 este vizitat (S-side). visited[1] este false, deci nu poate avea muchii de tăietură dinspre el.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 1,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 84,
    text: "Trecem la i = 2.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 2,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 85,
    text: "Verificăm dacă nodul 2 este vizitat. visited[2] este false.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 2,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 84,
    text: "Trecem la i = 3.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 3,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 85,
    text: "Verificăm dacă nodul 3 este vizitat. visited[3] este false.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: 3,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  },
  {
    line: 93,
    text: "Finalizăm programul. Tăietura minimă găsită este formată din muchiile {0 - 1} și {0 - 2}, cu capacitatea totală de 5, egală cu fluxul maxim.",
    flow: 5,
    cap: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    visited: [true, false, false, false],
    q: [],
    u: -1,
    v: -1,
    cutEdges: [[0, 1], [0, 2]]
  }
];

export const data = {
  presentation: `### Tăietură Minimă într-o Rețea de Flux (Min-Cut)

O **tăietură $S-T$** a unei rețele de flux este o partiție a nodurilor grafului în două mulțimi disjuncte $S$ și $T$ astfel încât sursa $s \\in S$ și chiuveta $t \\in T$. **Capacitatea tăieturii** este definită ca suma capacităților tuturor muchiilor directe care pleacă dintr-un nod din $S$ și ajung într-un nod din $T$:
$$C(S, T) = \\sum_{u \\in S, v \\in T} c(u, v)$$

Conform **Teoremei Flux Maxim - Tăietură Minimă (Max-Flow Min-Cut Theorem)**, valoarea fluxului maxim care poate trece printr-o rețea este egală cu capacitatea minimă a unei tăieturi $S-T$ în acea rețea.

Algoritmul de determinare a tăieturii minime constă în:
1. Calcularea fluxului maxim pe rețea folosind un algoritm precum **Edmonds-Karp** sau **Dinic**. Acesta modifică capacitățile reziduale în rețea.
2. Rularea unei parcurgeri (de exemplu, **BFS**) din sursa $s$ în graful rezidual final, vizitând doar nodurile la care se poate ajunge folosind muchii cu capacitate reziduală strict pozitivă ($c_f(u, v) > 0$).
3. Mulțimea nodurilor vizitate formează componenta $S$, iar nodurile nevizitate formează componenta $T$.
4. Muchiile din graful original care pleacă dintr-un nod vizitat ($u \\in S$) și se termină într-un nod nevizitat ($v \\in T$) alcătuiesc **tăietura minimă** (aceste muchii sunt complet saturate în fluxul maxim).`,

  complexity: `### Complexitate

- **Timp:** $\\mathcal{O}(V \\cdot E^2)$ – pentru algoritmul Edmonds-Karp de flux maxim, plus $\\mathcal{O}(V + E)$ pentru BFS-ul final din sursă.
- **Spațiu:** $\\mathcal{O}(V + E)$ – pentru stocarea matricilor de adiacență, capacităților inițiale și reziduale.`,

  variations: `### Variații și Cazuri Particulare

- **Partiționare Multi-sursă / Multi-chiuvetă**: Redusă la cazul cu o singură sursă/chiuvetă adăugând un super-nod sursă și super-nod chiuvetă cu capacități infinite.
- **Tăietură Minimă în Grafuri Neorientate**: Algoritmul lui Stoer-Wagner găsește o tăietură minimă globală fără a specifica o sursă și o chiuvetă în timp $\\mathcal{O}(V \\cdot E + V^2 \\log V)$.`,

  applications: `### Aplicații Reale

- **Segmentarea imaginilor**: Separarea obiectului de fundal în prelucrarea imaginilor digitale (metoda Graph Cuts).
- **Planificarea proiectelor**: Determinarea setului optim de sarcini cu dependențe pentru maximizarea profitului.
- **Fiabilitatea rețelelor**: Identificarea legăturilor vulnerabile care pot deconecta două zone geografice importante.`,

  code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;
const int INF = 1e9;

int bfsFlow(int s, int t, vector<int>& parent, vector<vector<int>>& adj, vector<vector<int>>& capacity) {
    fill(parent.begin(), parent.end(), -1);
    parent[s] = -2;
    queue<pair<int, int>> q;
    q.push({s, INF});

    while (!q.empty()) {
        int cur = q.front().first;
        int flow = q.front().second;
        q.pop();

        for (int next : adj[cur]) {
            if (parent[next] == -1 && capacity[cur][next] > 0) {
                parent[next] = cur;
                int new_flow = min(flow, capacity[cur][next]);
                if (next == t) return new_flow;
                q.push({next, new_flow});
            }
        }
    }
    return 0;
}

int edmondsKarp(int s, int t, int V, vector<vector<int>>& adj, vector<vector<int>>& capacity) {
    int flow = 0;
    vector<int> parent(V);
    int new_flow;
    while ((new_flow = bfsFlow(s, t, parent, adj, capacity)) > 0) {
        flow += new_flow;
        int cur = t;
        while (cur != s) {
            int prev = parent[cur];
            capacity[prev][cur] -= new_flow;
            capacity[cur][prev] += new_flow;
            cur = prev;
        }
    }
    return flow;
}

int main() {
    int V = 4;
    vector<vector<int>> adj(V);
    vector<vector<int>> cap(V, vector<int>(V, 0));
    vector<vector<int>> orig_cap(V, vector<int>(V, 0));

    auto add = [&](int u, int v, int c) {
        adj[u].push_back(v); adj[v].push_back(u);
        cap[u][v] = c;
        orig_cap[u][v] = c;
    };
    add(0, 1, 3);
    add(0, 2, 2);
    add(1, 2, 1);
    add(1, 3, 2);
    add(2, 3, 3);

    edmondsKarp(0, 3, V, adj, cap);

    vector<bool> visited(V, false);
    queue<int> q;
    q.push(0);
    visited[0] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (!visited[v] && cap[u][v] > 0) {
                visited[v] = true;
                q.push(v);
            }
        }
    }

    for (int i = 0; i < V; i++) {
        if (visited[i]) {
            for (int j = 0; j < V; j++) {
                if (!visited[j] && orig_cap[i][j] > 0 && cap[i][j] == 0) {
                    cout << "Cut edge: " << i << " - " << j << "\\n";
                }
            }
        }
    }
    return 0;
}
`,

  explanations: steps.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: [
      {
        label: "Coada BFS",
        groups: [
          step.q.map(node => ({
            val: node.toString(),
            active: true
          }))
        ]
      },
      {
        label: "Grup Tăietură (visited)",
        groups: [
          step.visited.map((val, idx) => ({
            val: `Nod ${idx}: ${val ? "S-side" : "T-side"}`,
            active: val
          }))
        ]
      },
      {
        label: "Flux Total",
        groups: [
          [
            {
              val: `Flux: ${step.flow}`,
              active: true
            }
          ]
        ]
      }
    ]
  })),

  problems: {
    easy: [
      {
        title: "Minimum Cut in Flow Network",
        url: "https://www.geeksforgeeks.org/problems/minimum-cut-in-a-flow-network/1",
        desc: "Găsește tăietura minimă într-o rețea de flux dată, returnând muchiile tăiate."
      }
    ],
    medium: [
      {
        title: "Police Chase",
        url: "https://cses.fi/problemset/task/1695",
        desc: "Determină numărul minim de străzi pe care poliția trebuie să le închidă pentru a bloca orice cale între două intersecții (Min-Cut pe un graf neorientat cu capacități unitare)."
      }
    ],
    hard: [
      {
        title: "Sabotage",
        url: "https://cses.fi/problemset/task/1700",
        desc: "Găsește setul minim de conexiuni ce trebuie sabotați pentru a întrerupe legătura dintre două computere, cu diverse costuri de eliminare."
      }
    ]
  },

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const step = steps[stepIndex] || steps[steps.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      globalVars.push({ name: "V", type: "int", val: 4, expandable: false });
      globalVars.push({ name: "flow", type: "int", val: step.flow, expandable: false });
      globalVars.push({ name: "visited", type: "std::vector<bool>", val: "{" + step.visited.map(x => x ? "true" : "false").join(", ") + "}", expandable: false });
      
      if (step.u !== -1) {
        vars.push({ name: "u", type: "int", val: step.u, expandable: false });
      }
      if (step.v !== -1) {
        vars.push({ name: "v", type: "int", val: step.v, expandable: false });
      }

      frames.push({ name: "main()", file: "main.cpp", line: activeLine });

      let inlineVal = `flow: ${step.flow}`;
      if (step.u !== -1) {
        inlineVal += `, u: ${step.u}`;
        if (step.v !== -1) {
          inlineVal += `, v: ${step.v}`;
        }
      }

      return { vars, globalVars, frames, inlineVal };
    },

    getInlineValueForLine: (stepIndex, lineNum) => {
      const step = steps[stepIndex];
      if (!step) return null;

      if (lineNum === 33 || lineNum === 37) {
        return `flow: ${step.flow}`;
      }
      if (lineNum === 74 || lineNum === 75) {
        return step.u !== -1 ? `u: ${step.u}` : null;
      }
      if (lineNum === 76 || lineNum === 77) {
        return step.v !== -1 ? `v: ${step.v}, cap[u][v]: ${step.cap[step.u][step.v]}` : null;
      }
      if (lineNum === 85) {
        return step.u !== -1 ? `i: ${step.u}, visited[i]: ${step.visited[step.u]}` : null;
      }
      if (lineNum === 87 || lineNum === 88) {
        return (step.u !== -1 && step.v !== -1) ? `i: ${step.u}, j: ${step.v}, cap: ${step.cap[step.u][step.v]}` : null;
      }
      return null;
    },

    getGraphVisual: (stepIndex) => {
      const step = steps[stepIndex] || steps[steps.length - 1];

      // Partition nodes to the left/right if the BFS reachability is computed (stepIndex >= 24)
      const isPartitioned = stepIndex >= 24;
      const staticNodes = isPartitioned ? [
        { id: "0", x: 60, y: 150, label: "0" },
        { id: "1", x: 280, y: 80, label: "1" },
        { id: "2", x: 280, y: 220, label: "2" },
        { id: "3", x: 340, y: 150, label: "3" }
      ] : [
        { id: "0", x: 50, y: 150, label: "0" },
        { id: "1", x: 180, y: 80, label: "1" },
        { id: "2", x: 180, y: 220, label: "2" },
        { id: "3", x: 310, y: 150, label: "3" }
      ];

      const staticEdges = [
        { source: "0", target: "1", origCap: 3 },
        { source: "0", target: "2", origCap: 2 },
        { source: "1", target: "2", origCap: 1 },
        { source: "1", target: "3", origCap: 2 },
        { source: "2", target: "3", origCap: 3 }
      ];

      return {
        directed: true,
        title: "Tăietură Minimă (Min-Cut)",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === step.u) {
            state = "active";
          } else if (step.visited[idNum]) {
            state = "visited";
          }

          let desc = "T-side (Neatingibil)";
          if (step.visited[idNum]) {
            desc = "S-side (Atingibil)";
          }

          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          
          const isCut = step.visited[u] && !step.visited[v];
          const isCurrentActive = step.u === u && step.v === v;

          // Flow = capacity - residual capacity
          const flow = e.origCap - step.cap[u][v];

          return { 
            ...e, 
            active: isCut || isCurrentActive,
            label: `${flow}/${e.origCap}${isCut ? " (Cut)" : ""}`
          };
        })
      };
    }
  }
};
