export const data = {
  "presentation": "### Prezentare Generală\n\nDivide et Impera (Divide and Conquer) este o paradigmă fundamentală de proiectare a algoritmilor. Funcționează prin împărțirea recursivă a unei probleme complexe în subprobleme mai mici de același tip, rezolvarea acestor subprobleme, și apoi combinarea soluțiilor lor pentru a obține rezultatul problemei inițiale.\n\nEtapele principale sunt:\n1. Divide: Împarte problema în subprobleme mai mici.\n2. Stăpânește (Conquer): Rezolvă subproblemele recursiv (până la cazuri de bază banale).\n3. Combină: Unește soluțiile subproblemelor pentru a rezolva problema mare.\n\nDe ce este important? Reduce drastic complexitatea în timp. Unul din cele mai clare exemple este Ridicarea la putere în timp logaritmic (Fast Exponentiation). Dacă vrem să calculăm a^n, o abordare naivă ar face n înmulțiri (O(n)). Însă, cu Divide et Impera, observăm că:\n- Dacă n este par: a^n = a^(n/2) * a^(n/2)\n- Dacă n este impar: a^n = a * a^(n-1)\nAceasta ne permite să reducem timpul la O(log n)!",
  "complexity": "### Complexitate\n\nPrin reducerea continuă a dimensiunii problemei (de ex. înjumătățire), se ajunge la performanțe logaritmice sau super-liniare O(N log N) – esențiale pentru algoritmii moderni de sortare și structuri de date. Teorema Master ne ajută să calculăm complexitatea algoritmică a relațiilor de recurență.",
  "variations": "### Variații și Edge Cases\n\nAlgoritmii care folosesc Divide et Impera se regăsesc în tot computer science-ul:\n1. Sortări (Merge Sort, Quick Sort)\n2. Căutări (Căutarea Binară pe vectori sau pe intervale de numere)\n3. Geometrie Computațională (Cel mai apropiat punct)\n4. Structuri de Date (Arbori de Intervale - Segment Trees)\n5. Transformata Fourier Rapidă (FFT) care stă la baza comprimării audio-video moderne.",
  "applications": "### Aplicații\n\nUn prim contact excelent cu Divide et Impera este Ridicarea la putere. Mai jos, poți urmări pașii pentru a calcula 2^10 = 1024 în doar câteva înmulțiri, comparativ cu o buclă de 10 pași.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "Putere",
        "url": "https://www.pbinfo.ro/probleme/810/putere",
        "desc": "Aflare a^n"
      },
      {
        "title": "Căutare Binară",
        "url": "https://www.pbinfo.ro/probleme/115/cautare-binara",
        "desc": "Aflare element O(log N)"
      }
    ],
    "medium": [
      {
        "title": "Turnurile din Hanoi",
        "url": "https://www.pbinfo.ro/probleme/1146/hanoi",
        "desc": "Recursivitate & Divide"
      },
      {
        "title": "Z-Parcurgere",
        "url": "https://www.infoarena.ro/problema/z",
        "desc": "Parcurgere fractalică"
      }
    ],
    "hard": [
      {
        "title": "Inversion Count",
        "url": "https://www.spoj.com/problems/INVCNT/",
        "desc": "Numărare inversiuni"
      },
      {
        "title": "Pow(x, n)",
        "url": "https://leetcode.com/problems/powx-n/",
        "desc": "Fast Expo pe numere reale"
      }
    ]
  }
};
