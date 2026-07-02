export const data = {
  "presentation": "### Teoria Numerelor (Number Theory)\n\nTeoria Numerelor este o ramură fundamentală a matematicii și algoritmicii care se ocupă cu studiul proprietăților numerelor întregi. Conceptele fundamentale stau la baza criptografiei moderne și a multor optimizări matematice în programarea competitivă.\n\nPrincipalele concepte includ:\n1. **Divizibilitate și CMMDC**: Determinarea celui mai mare divizor comun utilizând algoritmul lui Euclid în complexitate logaritmică, $O(\\log(\\min(a, b)))$.\n2. **Numere Prime**: Verificarea primalității, descompunerea în factori primi și generarea numerelor prime (Ciurul lui Eratostene).\n3. **Aritmetică Modulară**: Proprietățile operațiilor de adunare, scădere și înmulțire modulo $M$, care permit evitarea overflow-ului.\n4. **Algoritmul lui Euclid Extins**: Determinarea coeficienților Bézout și a inversului modular.",
  "complexity": "### Complexități Relevante\n\n- **Algoritmul lui Euclid**: Timp $O(\\log(\\min(a, b)))$ pentru determinarea CMMDC; spațiu $O(1)$ iterativ sau $O(\\log(\\min(a, b)))$ recursiv.\n- **Ciurul lui Eratostene**: Timp $O(N \\log(\\log N))$ pentru generarea tuturor numerelor prime mai mici sau egale cu $N$; spațiu $O(N)$.\n- **Factorizarea naivă**: Timp $O(\\sqrt{N})$ pentru determinarea divizorilor unui număr $N$; spațiu $O(1)$.",
  "variations": "### Variații și Concepte Avansate\n\n- **Invers Modular**: Utilizarea Teoremei lui Fermat sau a algoritmului Euclid Extins pentru a efectua împărțirea modulo $M$.\n- **Teorema Chineză a Resturilor (CRT)**: Rezolvarea sistemelor de congruențe liniare.\n- **Funcția Totient a lui Euler ($\\varphi(n)$)**: Calculul numărului de numere mai mici decât $n$ prime cu acesta.",
  "applications": "### Aplicații Reale\n\n- **Criptografie Asimetrică**: Protocoale precum RSA și Diffie-Hellman se bazează pe dificultatea factorizării numerelor mari și pe logaritmul discret.\n- **Hashing și Generatoare de Numere Pseudo-aleatoare**: Utilizarea modulo-ului cu numere prime mari pentru a minimiza coliziunile.\n- **Optimizări în Combinatorică**: Probleme de numărare și structuri algebrice modulo $10^9 + 7$.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "CMMDC",
        "url": "https://www.pbinfo.ro/probleme/55/cmmdc",
        "desc": "Algoritmul lui Euclid pentru aflarea celui mai mare divizor comun."
      },
      {
        "title": "Prim",
        "url": "https://www.pbinfo.ro/probleme/56/prim",
        "desc": "Verificarea primalității unui număr."
      }
    ],
    "medium": [
      {
        "title": "Descompunere în Factori Primi",
        "url": "https://www.pbinfo.ro/probleme/63/factori-primi",
        "desc": "Aflarea factorilor primi ai unui număr întreg."
      },
      {
        "title": "Invers Modular",
        "url": "https://www.pbinfo.ro/probleme/2222/inversmodular",
        "desc": "Calcularea inversului modular al unui număr modulo M."
      }
    ],
    "hard": [
      {
        "title": "Extended GCD",
        "url": "https://lightoj.com/problem/extended-gcd",
        "desc": "Determinarea coeficienților Bézout x și y pentru a * x + b * y = gcd(a, b)."
      }
    ]
  }
};
