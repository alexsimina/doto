export const data = {
  "presentation": "### Grafuri Orientate: Concepte și Definiții de Bază\n\nUn **graf orientat** (sau digraf) este o structură matematică folosită pentru a modela relații asimetrice sau direcționale între obiecte. \n\nFormal, un graf orientat este o pereche ordonată $G = (V, E)$, unde:\n- $V$ este o mulțime finită și nevidă de **noduri** (sau vârfuri).\n- $E$ este o mulțime de **arce** (conexiuni orientate), reprezentate ca perechi ordonate de noduri din $V$, adică $E \\subseteq V \\times V$.\n\n### Concepte Fundamentale\n\n1. **Arce**: Un arc este o pereche ordonată $(u, v) \\in E$. Spunem că arcul pornește din nodul $u$ și se termină în nodul $v$.\n2. **Succesor și Predecesor**: Pentru arcul $(u, v)$:\n   - Nodul $v$ se numește **succesor** al nodului $u$.\n   - Nodul $u$ se numește **predecesor** al nodului $v$.\n3. **Bucle**: Un arc de forma $(u, u)$ care pornește și se termină în același nod se numește **buclă**.\n\n### Grade într-un Graf Orientat\n\nSpre deosebire de grafurile neorientate, fiecare nod are două tipuri de grade:\n- **Gradul interior** al unui nod $v$, notat $\\deg^-(v)$, reprezintă numărul de arce care intră în $v$ (adică arce de forma $(u, v)$).\n- **Gradul exterior** al unui nod $v$, notat $\\deg^+(v)$, reprezintă numărul de arce care ies din $v$ (adică arce de forma $(v, w)$).\n\n### Teorema Sumelor Gradelor\n\nSuma gradelor exterioare ale tuturor nodurilor este egală cu suma gradelor interioare și este egală cu numărul total de arce din graf:\n$$\\sum_{v \\in V} \\deg^+(v) = \\sum_{v \\in V} \\deg^-(v) = |E|$$",
  "complexity": "### Reprezentare și Complexități\n\n1. **Matricea de Adiacență**:\n   O matrice pătratică $A$ de dimensiune $N \\times N$, unde $A[i][j] = 1$ dacă există arcul $(i, j)$ și $0$ altfel. Spre deosebire de grafurile neorientate, matricea **nu este în general simetrică** ($A[i][j] \\neq A[j][i]$).\n   - **Spațiu**: $\\mathcal{O}(N^2)$\n   - **Verificare existență arc $(i, j)$**: $\\mathcal{O}(1)$\n   - **Determinare succesori nod $i$**: $\\mathcal{O}(N)$\n\n2. **Listele de Adiacență**:\n   Pentru fiecare nod $i$, se menține un vector cu succesorii săi. Dacă este necesar, se poate menține separat și o listă a predecesorilor.\n   - **Spațiu**: $\\mathcal{O}(N + M)$ (optim pentru grafuri rare)\n   - **Verificare existență arc $(i, j)$**: $\\mathcal{O}(\\deg^+(i))$\n   - **Parcurgere succesori nod $i$**: $\\mathcal{O}(\\deg^+(i))$",
  "variations": "### Conexitate în Grafuri Orientate\n\n- **Graf slab conex**: Dacă, ignorând orientarea arcelor, graful neorientat obținut este conex.\n- **Graf tare conex**: Dacă pentru orice pereche de noduri $(u, v)$, există un drum orientat de la $u$ la $v$ și un drum orientat de la $v$ la $u$.\n- **Componentă tare conexă (CTC)**: Subgraf maximal tare conex.",
  "applications": "### Aplicații Practice\n\n- **Web și PageRank**: Link-urile de la o pagină web la alta formează un graf orientat uriaș utilizat de motoarele de căutare pentru ierarhizare.\n- **Sisteme de Tranzacții**: Circulația banilor sau a resurselor între conturi.\n- **Ierarhii și Dependențe**: Reprezentarea ordinii de execuție a task-urilor (de exemplu, compilarea modulelor software în funcție de dependințe, modelate prin Sortare Topologică).",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Grade Noduri",
        "url": "https://www.pbinfo.ro/probleme/23/grade-graf-orientat",
        "desc": "Determinarea gradelor interioare și exterioare ale tuturor nodurilor dintr-un graf orientat."
      }
    ],
    "medium": [
      {
        "title": "Sortare Topologică",
        "url": "https://www.pbinfo.ro/probleme/24/sortare-topologica",
        "desc": "Ordonarea nodurilor unui graf orientat aciclic (DAG) astfel încât pentru orice arc (u, v), u să apară înaintea lui v."
      }
    ],
    "hard": [
      {
        "title": "Componente Tare Conexe",
        "url": "https://www.pbinfo.ro/probleme/25/componente-tare-conexe",
        "desc": "Găsirea tuturor componentelor tare conexe dintr-un graf orientat folosind algoritmul Tarjan sau Kosaraju."
      }
    ]
  }
};
