export const data = {
  "presentation": "### Prezentare Generală\n\nAho-Corasick este algoritmul absolut pentru căutarea simultană a MULTIPLE pattern-uri (un dicționar) într-un singur text.\n\nGândește-te la o combinație strălucită între Trie (unde stocăm dicționarul de pattern-uri) și KMP (unde calculăm muchii de 'eșec' - failure links). Un Failure Link ne spune: 'dacă ai ajuns într-un nod pe Trie dar următoarea literă nu se potrivește, la ce alt nod din Trie trebuie să sari (cel mai lung prefix comun care se potrivește) ca să continui eficient?'.",
  "complexity": "### Complexitate\n\n- **Timp:** Preprocesarea dicționarului: O(Sumă lungimi pattern-uri). Căutarea în text: O(N + Z), unde N e lungimea textului, iar Z e numărul total de apariții ale tuturor cuvintelor din dicționar. Este extrem de rapid!\n- **Spațiu:** O(Sumă lungimi pattern-uri * Σ) pentru Trie și vectorul de tranziții.\n",
  "variations": "### Variații și Edge Cases\n\n1. Aho-Corasick pe Automate Finit Deterministe (DFA): Calculăm direct un automat de tranziții, astfel încât la fiecare pas facem o sigură verificare, obținând O(N) garantat pe text, independent de mărimea dicționarului.\n2. Aho-Corasick DP: Combinat cu Programare Dinamică pentru a afla 'Câte parole de lungime L care nu conțin cuvinte interzise pot fi generate?'.",
  "applications": "### Aplicații\n\nAplicația clasică: Antivirus Scanner. Motoarele antivirus trebuie să caute milioane de 'semnături' (viruși) într-un fișier. Fac un Aho-Corasick pe viruși, și apoi trec fișierul suspect o singură dată (în streaming!) prin automat.",
  code: `
#include <iostream>
#include <vector>
#include <queue>
#include <string>

using namespace std;

var int MAXN = 1000;
int nxt[MAXN][26], fail[MAXN], cnt[MAXN];
int sz = 0;

void insert(string s) {
    int u = 0;
    for (char c : s) {
        if (!nxt[u][c - 'a']) nxt[u][c - 'a'] = ++sz;
        u = nxt[u][c - 'a'];
    }
    cnt[u]++;
}

void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++) {
        if (nxt[0][i]) q.push(nxt[0][i]);
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            if (nxt[u][i]) {
                fail[nxt[u][i]] = nxt[fail[u]][i]; // Legătura de eșec
                q.push(nxt[u][i]);
            } else {
                nxt[u][i] = nxt[fail[u]][i]; // Optimizare DFA
            }
        }
    }
}

int main() {
    insert("he"); insert("she"); insert("his"); insert("hers");
    build();
    
    string text = "ahishers";
    int u = 0, matches = 0;
    for (char c : text) {
        u = nxt[u][c - 'a']; // Tranziția automată O(1)
        int temp = u;
        while (temp > 0) { // Mergem pe failure links pt cuvinte incluse
            matches += cnt[temp];
            cnt[temp] = 0; // Nu le număra de două ori
            temp = fail[temp];
        }
    }
    cout << "Cuvinte gasite: " << matches << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 12,
      "text": "Pasul 1: Construim un Trie normal (funcția insert). Adăugăm cuvintele 'he', 'she', 'his', 'hers'.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30
          },
          {
            "id": 1,
            "label": "h",
            "x": 80,
            "y": 100
          },
          {
            "id": 2,
            "label": "e",
            "x": 60,
            "y": 160
          },
          {
            "id": 3,
            "label": "s",
            "x": 200,
            "y": 100
          },
          {
            "id": 4,
            "label": "h",
            "x": 200,
            "y": 160
          },
          {
            "id": 5,
            "label": "e",
            "x": 200,
            "y": 220
          }
        ],
        "edges": [
          {
            "source": 0,
            "target": 1
          },
          {
            "source": 1,
            "target": 2
          },
          {
            "source": 0,
            "target": 3
          },
          {
            "source": 3,
            "target": 4
          },
          {
            "source": 4,
            "target": 5
          }
        ]
      }
    },
    {
      "line": 21,
      "text": "Pasul 2: Aho-Corasick transformă Trie-ul într-un Automat (DFA). Folosim o coadă (BFS) pentru a calcula array-ul 'fail' (failure links) nivel cu nivel.",
      "blocksVisual": [
        {
          "label": "Inițializare BFS",
          "groups": [
            [
              {
                "val": "Queue:"
              },
              {
                "val": "fiii root-ului"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 29,
      "text": "Calculul Failure Link: Dacă nodul X este litera 'e' din 'she', link-ul său de fail va arăta spre capătul celui mai lung sufix al lui 'she' care e prefix în alt cuvânt, adică 'he'.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30
          },
          {
            "id": 1,
            "label": "h",
            "x": 80,
            "y": 100
          },
          {
            "id": 2,
            "label": "e",
            "x": 60,
            "y": 160
          },
          {
            "id": 3,
            "label": "s",
            "x": 200,
            "y": 100
          },
          {
            "id": 4,
            "label": "h",
            "x": 200,
            "y": 160
          },
          {
            "id": 5,
            "label": "e",
            "x": 200,
            "y": 220,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": 0,
            "target": 1
          },
          {
            "source": 1,
            "target": 2
          },
          {
            "source": 0,
            "target": 3
          },
          {
            "source": 3,
            "target": 4
          },
          {
            "source": 4,
            "target": 5
          },
          {
            "source": 5,
            "target": 2
          }
        ]
      }
    },
    {
      "line": 32,
      "text": "Optimizare DFA magică: Dacă un nod NU are copilul 'i', îl conectăm DIRECT la ce ar avea copilul pe failure link-ul său! Astfel, pe text facem mereu doar u = nxt[u][c], fără while-uri în căutare (O(1) pe literă garantat).",
      "blocksVisual": [
        {
          "label": "Optimizare DFA",
          "groups": [
            [
              {
                "val": "nxt[u][i] = nxt[fail[u]][i]",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 43,
      "text": "Acum căutăm în 'ahishers'. Fiecare literă c execută o tranziție curată în DFA: u = nxt[u][c]. Nu trebuie să dăm niciodată pointerul înapoi pe text!",
      "blocksVisual": [
        {
          "label": "Parcurgere",
          "groups": [
            [
              {
                "val": "a"
              },
              {
                "val": "h"
              },
              {
                "val": "i"
              },
              {
                "val": "s"
              },
              {
                "val": "h"
              },
              {
                "val": "e"
              },
              {
                "val": "r"
              },
              {
                "val": "s"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 46,
      "text": "Bucla interioară extrage 'match-urile ascunse'. Dacă găsim 'hers', prin fail-links vom vizita și 'he', înregistrându-le pe ambele imediat.",
      "blocksVisual": [
        {
          "label": "Colectare match-uri",
          "groups": [
            [
              {
                "val": "Found: hers"
              },
              {
                "val": "Found: he (via fail)"
              }
            ]
          ]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Aho-Corasick Infoarena",
        "url": "https://www.infoarena.ro/problema/ahocorasick",
        "desc": "Problema clasică"
      }
    ],
    "medium": [
      {
        "title": "Stream of Characters",
        "url": "https://leetcode.com/problems/stream-of-characters/",
        "desc": "Trie răsturnat sau AC"
      }
    ],
    "hard": [
      {
        "title": "Trie + DP (Password Generator)",
        "url": "https://codeforces.com/problemset/problem/86/C",
        "desc": "Aho-Corasick combinat cu DP"
      }
    ]
  }
};
