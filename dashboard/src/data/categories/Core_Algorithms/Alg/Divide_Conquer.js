export const data = {
  "presentation": "### Prezentare Generală\n\nDivide et Impera (Divide and Conquer) este o paradigmă fundamentală de proiectare a algoritmilor. Funcționează prin împărțirea recursivă a unei probleme complexe în subprobleme mai mici de același tip, rezolvarea acestor subprobleme, și apoi combinarea soluțiilor lor pentru a obține rezultatul problemei inițiale.\n\nEtapele principale sunt:\n1. Divide: Împarte problema în subprobleme mai mici.\n2. Stăpânește (Conquer): Rezolvă subproblemele recursiv (până la cazuri de bază banale).\n3. Combină: Unește soluțiile subproblemelor pentru a rezolva problema mare.\n\nDe ce este important? Reduce drastic complexitatea în timp. Unul din cele mai clare exemple este Ridicarea la putere în timp logaritmic (Fast Exponentiation). Dacă vrem să calculăm a^n, o abordare naivă ar face n înmulțiri (O(n)). Însă, cu Divide et Impera, observăm că:\n- Dacă n este par: a^n = a^(n/2) * a^(n/2)\n- Dacă n este impar: a^n = a * a^(n-1)\nAceasta ne permite să reducem timpul la O(log n)!",
  "complexity": "### Complexitate\n\nPrin reducerea continuă a dimensiunii problemei (de ex. înjumătățire), se ajunge la performanțe logaritmice sau super-liniare O(N log N) – esențiale pentru algoritmii moderni de sortare și structuri de date. Teorema Master ne ajută să calculăm complexitatea algoritmică a relațiilor de recurență.",
  "variations": "### Variații și Edge Cases\n\nAlgoritmii care folosesc Divide et Impera se regăsesc în tot computer science-ul:\n1. Sortări (Merge Sort, Quick Sort)\n2. Căutări (Căutarea Binară pe vectori sau pe intervale de numere)\n3. Geometrie Computațională (Cel mai apropiat punct)\n4. Structuri de Date (Arbori de Intervale - Segment Trees)\n5. Transformata Fourier Rapidă (FFT) care stă la baza comprimării audio-video moderne.",
  "applications": "### Aplicații\n\nUn prim contact excelent cu Divide et Impera este Ridicarea la putere. Mai jos, poți urmări pașii pentru a calcula 2^10 = 1024 în doar câteva înmulțiri, comparativ cu o buclă de 10 pași.",
  code: `
#include <iostream>

using namespace std;

long long fastExpo(long long a, long long n) {
    if (n == 0) return 1;
    if (n % 2 == 0) {
        long long half = fastExpo(a, n / 2);
        return half * half;
    } else {
        return a * fastExpo(a, n - 1);
    }
}

int main() {
    long long baza = 2, exponent = 10;
    cout << baza << "^" << exponent << " = " << fastExpo(baza, exponent) << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 11,
      "text": "Apelăm funcția fastExpo(a = 2, n = 10) pentru a calcula 2^10.",
      "blocksVisual": [
        { "label": "Apel fastExpo(2, 10)", "groups": [[{"val": "2^10"}]] }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă exponentul n == 0. n = 10, deci continuăm.",
      "blocksVisual": [
        { "label": "n == 0", "groups": [[{"val": "Fals"}]] }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă n este par: n % 2 == 0 (10 % 2 == 0) este adevărat.",
      "blocksVisual": [
        { "label": "Paritate", "groups": [[{"val": "Par", "sorted": true}]] }
      ]
    },
    {
      "line": 14,
      "text": "Apelăm recursiv fastExpo(a, n / 2) => fastExpo(2, 5) pentru a reduce problema la jumătate.",
      "blocksVisual": [
        { "label": "Stivă", "groups": [[{"val": "fastExpo(2, 5)"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în noul apel fastExpo(a = 2, n = 5).",
      "blocksVisual": [
        { "label": "Apel fastExpo(2, 5)", "groups": [[{"val": "2^5"}]] }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă n == 0. Cum n = 5, continuăm.",
      "blocksVisual": [
        { "label": "n == 0", "groups": [[{"val": "Fals"}]] }
      ]
    },
    {
      "line": 13,
      "text": "Verificăm dacă n % 2 == 0. n = 5 este impar, deci trecem la ramura else.",
      "blocksVisual": [
        { "label": "Paritate", "groups": [[{"val": "Impar", "active": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Conform regulii pentru impari, apelăm fastExpo(a, n - 1) => fastExpo(2, 4). Soluția va fi 2 * fastExpo(2, 4).",
      "blocksVisual": [
        { "label": "Stivă", "groups": [[{"val": "fastExpo(2, 4)"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în fastExpo(a = 2, n = 4).",
      "blocksVisual": [
        { "label": "Apel fastExpo(2, 4)", "groups": [[{"val": "2^4"}]] }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă n == 0. Cum n = 4, continuăm.",
      "blocksVisual": [
        { "label": "n == 0", "groups": [[{"val": "Fals"}]] }
      ]
    },
    {
      "line": 13,
      "text": "Deoarece n = 4 este par, vom calcula jumătatea lui: apelăm fastExpo(2, 2).",
      "blocksVisual": [
        { "label": "Stivă", "groups": [[{"val": "fastExpo(2, 2)"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în fastExpo(a = 2, n = 2).",
      "blocksVisual": [
        { "label": "Apel fastExpo(2, 2)", "groups": [[{"val": "2^2"}]] }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă n == 0. Cum n = 2, continuăm.",
      "blocksVisual": [
        { "label": "n == 0", "groups": [[{"val": "Fals"}]] }
      ]
    },
    {
      "line": 13,
      "text": "Exponentul 2 este par, deci apelăm recursiv fastExpo(2, 1).",
      "blocksVisual": [
        { "label": "Stivă", "groups": [[{"val": "fastExpo(2, 1)"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în fastExpo(a = 2, n = 1).",
      "blocksVisual": [
        { "label": "Apel fastExpo(2, 1)", "groups": [[{"val": "2^1"}]] }
      ]
    },
    {
      "line": 12,
      "text": "Verificăm dacă n == 0. Cum n = 1, continuăm.",
      "blocksVisual": [
        { "label": "n == 0", "groups": [[{"val": "Fals"}]] }
      ]
    },
    {
      "line": 13,
      "text": "Exponentul 1 este impar. Apelăm recursiv fastExpo(2, 0). Rezultatul va fi 2 * fastExpo(2, 0).",
      "blocksVisual": [
        { "label": "Stivă", "groups": [[{"val": "fastExpo(2, 0)"}]] }
      ]
    },
    {
      "line": 11,
      "text": "Intrăm în fastExpo(a = 2, n = 0).",
      "blocksVisual": [
        { "label": "Apel fastExpo(2, 0)", "groups": [[{"val": "2^0"}]] }
      ]
    },
    {
      "line": 12,
      "text": "Deoarece n == 0, am atins cazul de bază! Returnăm 1.",
      "blocksVisual": [
        { "label": "Caz de bază", "groups": [[{"val": 1, "sorted": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Revenim în fastExpo(2, 1). Înmulțim baza cu valoarea returnată: 2 * 1 = 2. Returnăm 2.",
      "blocksVisual": [
        { "label": "Întoarcere", "groups": [[{"val": "2^1 = 2", "sorted": true}]] }
      ]
    },
    {
      "line": 14,
      "text": "Revenim în fastExpo(2, 2). Valoarea returnată (half) este 2.",
      "blocksVisual": [
        { "label": "Stare", "groups": [[{"val": "half = 2"}]] }
      ]
    },
    {
      "line": 15,
      "text": "Ridicăm la pătrat: half * half = 2 * 2 = 4. Returnăm 4.",
      "blocksVisual": [
        { "label": "Ridicarea la pătrat", "groups": [[{"val": "2^2 = 4", "sorted": true}]] }
      ]
    },
    {
      "line": 14,
      "text": "Revenim în fastExpo(2, 4). Valoarea returnată (half) este 4.",
      "blocksVisual": [
        { "label": "Stare", "groups": [[{"val": "half = 4"}]] }
      ]
    },
    {
      "line": 15,
      "text": "Ridicăm la pătrat: 4 * 4 = 16. Returnăm 16.",
      "blocksVisual": [
        { "label": "Ridicarea la pătrat", "groups": [[{"val": "2^4 = 16", "sorted": true}]] }
      ]
    },
    {
      "line": 17,
      "text": "Revenim în fastExpo(2, 5). Înmulțim baza (2) cu rezultatul apelului pentru 2^4 (16) => 2 * 16 = 32. Returnăm 32.",
      "blocksVisual": [
        { "label": "Întoarcere", "groups": [[{"val": "2^5 = 32", "sorted": true}]] }
      ]
    },
    {
      "line": 14,
      "text": "Revenim în apelul inițial fastExpo(2, 10). Valoarea returnată (half) este 32.",
      "blocksVisual": [
        { "label": "Stare", "groups": [[{"val": "half = 32"}]] }
      ]
    },
    {
      "line": 15,
      "text": "Efectuăm ultima ridicare la pătrat: 32 * 32 = 1024. Obținem rezultatul final 1024 în doar 5 pași recursivi!",
      "blocksVisual": [
        { "label": "Rezultat final", "groups": [[{"val": "2^10 = 1024", "sorted": true}]] }
      ]
    }
  ],
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
