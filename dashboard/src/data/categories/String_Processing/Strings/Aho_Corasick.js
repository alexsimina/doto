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
      "line": 41,
      "text": "Pasul 1: Construim structura Trie primind cuvintele 'he', 'she', 'his', 'hers'. Rădăcina (Root) este creată pe nivelul 0.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 13,
      "text": "Inserare 'he': Creăm nodul 1 ('h') sub Root, și nodul 2 ('e') sub nodul 1. Marcăm nodul 2 ca fiind capăt de cuvânt.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "h", "x": 80, "y": 60, "state": "visited"},
          {"id": 2, "label": "e", "x": 50, "y": 110, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2}
        ]
      }
    },
    {
      "line": 13,
      "text": "Inserare 'she': Creăm o ramură nouă din Root cu nodul 3 ('s'), apoi nodul 4 ('h') și nodul 5 ('e', capăt de cuvânt).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "h", "x": 80, "y": 60},
          {"id": 2, "label": "e", "x": 50, "y": 110},
          {"id": 3, "label": "s", "x": 200, "y": 60, "state": "visited"},
          {"id": 4, "label": "h", "x": 200, "y": 110, "state": "visited"},
          {"id": 5, "label": "e", "x": 200, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 0, "target": 3},
          {"source": 3, "target": 4},
          {"source": 4, "target": 5}
        ]
      }
    },
    {
      "line": 13,
      "text": "Inserare 'his': Folosim nodul 1 ('h') existent sub Root. Adăugăm nodul 6 ('i') sub 'h', și nodul 7 ('s', capăt) sub 'i'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "h", "x": 80, "y": 60},
          {"id": 2, "label": "e", "x": 50, "y": 110},
          {"id": 3, "label": "s", "x": 200, "y": 60},
          {"id": 4, "label": "h", "x": 200, "y": 110},
          {"id": 5, "label": "e", "x": 200, "y": 160},
          {"id": 6, "label": "i", "x": 100, "y": 110, "state": "visited"},
          {"id": 7, "label": "s", "x": 100, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 0, "target": 3},
          {"source": 3, "target": 4},
          {"source": 4, "target": 5},
          {"source": 1, "target": 6},
          {"source": 6, "target": 7}
        ]
      }
    },
    {
      "line": 13,
      "text": "Inserare 'hers': Folosim prefixul 'he' existent (nodurile 1 și 2). Creăm nodul 8 ('r') sub nodul 2, și nodul 9 ('s', capăt) sub nodul 8.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "h", "x": 80, "y": 60},
          {"id": 2, "label": "e", "x": 50, "y": 110},
          {"id": 3, "label": "s", "x": 200, "y": 60},
          {"id": 4, "label": "h", "x": 200, "y": 110},
          {"id": 5, "label": "e", "x": 200, "y": 160},
          {"id": 6, "label": "i", "x": 100, "y": 110},
          {"id": 7, "label": "s", "x": 100, "y": 160},
          {"id": 8, "label": "r", "x": 50, "y": 160, "state": "visited"},
          {"id": 9, "label": "s", "x": 50, "y": 210, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 0, "target": 3},
          {"source": 3, "target": 4},
          {"source": 4, "target": 5},
          {"source": 1, "target": 6},
          {"source": 6, "target": 7},
          {"source": 2, "target": 8},
          {"source": 8, "target": 9}
        ]
      }
    },
    {
      "line": 27,
      "text": "Calcul failure links (BFS): Adăugăm în coadă copiii rădăcinii, adică nodurile 1 ('h') și 3 ('s'). Legăturile lor de eșec vor pointa spre Root (0).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "visited"},
          {"id": 1, "label": "h", "x": 80, "y": 60, "state": "active"},
          {"id": 3, "label": "s", "x": 200, "y": 60, "state": "active"}
        ],
        "edges": [
          {"source": 1, "target": 0},
          {"source": 3, "target": 0}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm copiii nodului 1 ('h'). Pentru copilul său, nodul 2 ('e'): fail[2] = nxt[fail[1]]['e'] = nxt[0]['e'] = 0 (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 1, "label": "h", "x": 80, "y": 60, "state": "visited"},
          {"id": 2, "label": "e", "x": 50, "y": 110, "state": "active"},
          {"id": 0, "label": "Root", "x": 140, "y": 20}
        ],
        "edges": [
          {"source": 2, "target": 0}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm următorul copil al nodului 1 ('h'): copilul 6 ('i'). fail[6] = nxt[fail[1]]['i'] = nxt[0]['i'] = 0.",
      "graphVisual": {
        "nodes": [
          {"id": 1, "label": "h", "x": 80, "y": 60, "state": "visited"},
          {"id": 6, "label": "i", "x": 100, "y": 110, "state": "active"},
          {"id": 0, "label": "Root", "x": 140, "y": 20}
        ],
        "edges": [
          {"source": 6, "target": 0}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm copiii nodului 3 ('s'): copilul 4 ('h'). fail[4] = nxt[fail[3]]['h'] = nxt[0]['h'] = 1 ('h' sub root). Failure link-ul lui 4 pointează spre 1.",
      "graphVisual": {
        "nodes": [
          {"id": 3, "label": "s", "x": 200, "y": 60, "state": "visited"},
          {"id": 4, "label": "h", "x": 200, "y": 110, "state": "active"},
          {"id": 1, "label": "h", "x": 80, "y": 60, "state": "visited"}
        ],
        "edges": [
          {"source": 4, "target": 1}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm copiii nodului 2 ('e'): copilul 8 ('r'). fail[8] = nxt[fail[2]]['r'] = nxt[0]['r'] = 0.",
      "graphVisual": {
        "nodes": [
          {"id": 2, "label": "e", "x": 50, "y": 110, "state": "visited"},
          {"id": 8, "label": "r", "x": 50, "y": 160, "state": "active"},
          {"id": 0, "label": "Root", "x": 140, "y": 20}
        ],
        "edges": [
          {"source": 8, "target": 0}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm copiii nodului 6 ('i'): copilul 7 ('s'). fail[7] = nxt[fail[6]]['s'] = nxt[0]['s'] = 3 ('s' sub root). Legătura de eșec duce la nodul 3.",
      "graphVisual": {
        "nodes": [
          {"id": 6, "label": "i", "x": 100, "y": 110, "state": "visited"},
          {"id": 7, "label": "s", "x": 100, "y": 160, "state": "active"},
          {"id": 3, "label": "s", "x": 200, "y": 60, "state": "visited"}
        ],
        "edges": [
          {"source": 7, "target": 3}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm copiii nodului 4 ('h'): copilul 5 ('e'). fail[5] = nxt[fail[4]]['e'] = nxt[1]['e'] = 2 ('e' sub 'h'). Legătura de eșec a lui 5 duce la nodul 2.",
      "graphVisual": {
        "nodes": [
          {"id": 4, "label": "h", "x": 200, "y": 110, "state": "visited"},
          {"id": 5, "label": "e", "x": 200, "y": 160, "state": "active"},
          {"id": 2, "label": "e", "x": 50, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 5, "target": 2}
        ]
      }
    },
    {
      "line": 32,
      "text": "BFS: Procesăm copiii nodului 8 ('r'): copilul 9 ('s'). fail[9] = nxt[fail[8]]['s'] = nxt[0]['s'] = 3. Legătura de eșec a lui 9 pointează spre nodul 3.",
      "graphVisual": {
        "nodes": [
          {"id": 8, "label": "r", "x": 50, "y": 160, "state": "visited"},
          {"id": 9, "label": "s", "x": 50, "y": 210, "state": "active"},
          {"id": 3, "label": "s", "x": 200, "y": 60, "state": "visited"}
        ],
        "edges": [
          {"source": 9, "target": 3}
        ]
      }
    },
    {
      "line": 42,
      "text": "Automatul DFA este complet construit. Acum începem căutarea în textul 'ahishers'. u = 0.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 0 ('a'): u = nxt[0]['a'] = 0. Rămânem la Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 1 ('h'): u = nxt[0]['h'] = 1. Trecem la nodul 1 ('h').",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "h", "x": 80, "y": 60, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 2 ('i'): u = nxt[1]['i'] = 6. Trecem la nodul 6 ('i').",
      "graphVisual": {
        "nodes": [
          {"id": 1, "label": "h", "x": 80, "y": 60},
          {"id": 6, "label": "i", "x": 100, "y": 110, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 3 ('s'): u = nxt[6]['s'] = 7. Trecem la nodul 7 ('s').",
      "graphVisual": {
        "nodes": [
          {"id": 6, "label": "i", "x": 100, "y": 110},
          {"id": 7, "label": "s", "x": 100, "y": 160, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 54,
      "text": "Nodul 7 are cnt[7] = 1, adică reprezintă cuvântul 'his'. Adăugăm 1 la matches. Mergem pe fail[7] = 3. matches = 1.",
      "graphVisual": {
        "nodes": [
          {"id": 7, "label": "s", "x": 100, "y": 160, "state": "visited"},
          {"id": 3, "label": "s", "x": 200, "y": 60, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 4 ('h'): u = nxt[7]['h'] = 4. Trecem la nodul 4 ('h' din subarborele 'she').",
      "graphVisual": {
        "nodes": [
          {"id": 4, "label": "h", "x": 200, "y": 110, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 5 ('e'): u = nxt[4]['e'] = 5. Trecem la nodul 5 ('e' din subarborele 'she').",
      "graphVisual": {
        "nodes": [
          {"id": 5, "label": "e", "x": 200, "y": 160, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 54,
      "text": "Nodul 5 este capăt de cuvânt ('she') -> matches = 2. Urmărim fail[5] = 2 ('he' - capăt de cuvânt) -> matches = 3. fail[2] = 0.",
      "graphVisual": {
        "nodes": [
          {"id": 5, "label": "e", "x": 200, "y": 160, "state": "visited"},
          {"id": 2, "label": "e", "x": 50, "y": 110, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Căutare index 6 ('r') și index 7 ('s'): u ajunge la nodul 8 ('r'), apoi la nodul 9 ('s'). Găsim cuvântul 'hers'. matches devine 4. Căutare finalizată cu succes!",
      "graphVisual": {
        "nodes": [
          {"id": 8, "label": "r", "x": 50, "y": 160, "state": "visited"},
          {"id": 9, "label": "s", "x": 50, "y": 210, "state": "active"}
        ],
        "edges": []
      }
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
