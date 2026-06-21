export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul **Aho-Corasick** este un algoritm extrem de puternic de potrivire a șirurilor (String Matching), conceput pentru a căuta simultan un dicționar întreg de șabloane într-un singur text de intrare. \n\nÎn esență, Aho-Corasick combină ideea de **Trie** (în care stocăm șabloanele din dicționar) cu ideea de **Failure Links** (legături de eșec) împrumutată din algoritmul **KMP**.\n\n### Cum Funcționează?\n\n1. **Construirea Trie-ului:** Toate șabloanele din dicționar sunt inserate într-un Trie standard.\n2. **Calcularea Legăturilor de Eșec (Failure Links):** Folosind o parcurgere în lățime (**BFS**), calculăm legăturile de eșec pentru fiecare nod. Legătura de eșec a unui nod $u$ (care reprezintă un prefix $P$) indică spre nodul $v$ din Trie care reprezintă cel mai lung sufix propriu al lui $P$ care există în Trie. În caz de mismatch pe caracterul următor, automatul sare pe această legătură de eșec pentru a continua căutarea fără a lua textul de la capăt.\n3. **Legături de Dicționar (Dictionary Links / Optimization):** Ne ajută să raportăm toate cuvintele găsite chiar și atunci când un cuvânt este inclus în interiorul altui cuvânt mai lung (de exemplu, *\"he\"* în interiorul lui *\"she\"*).\n4. **Optimizarea DFA (Automat Finit Determinist):** Dacă un nod nu are o muchie pentru un caracter, putem precalcula tranziția direct către starea în care s-ar ajunge urmând legătura de eșec. Astfel, tranziția devine strict $\\mathcal{O}(1)$ la fiecare pas pe text.",
  "complexity": "### Complexitate\n\nFie $M$ suma lungimilor tuturor șabloanelor din dicționar, $\\Sigma$ dimensiunea alfabetului și $N$ lungimea textului în care se face căutarea.\n\n- **Timp:** \n  - **Construcția Trie-ului și DFA-ului:** $\\mathcal{O}(M \\cdot \\Sigma)$ folosind BFS.\n  - **Căutarea în text:** $\\mathcal{O}(N + Z)$, unde $Z$ este numărul total de apariții ale șabloanelor în text. Cu optimizarea DFA, facem exact $N$ tranziții, fiecare în timp $\\mathcal{O}(1)$.\n- **Spațiu:**\n  - $\\mathcal{O}(M \\cdot \\Sigma)$ pentru a stoca matricea de tranziții a automatului.",
  "variations": "### Variații și Edge Cases\n\n1. **Programare Dinamică pe Aho-Corasick:** Utilizat frecvent pentru a genera sau număra șiruri de caractere de lungime $L$ care respectă anumite proprietăți (de exemplu, *\"Câte șiruri de lungime $L$ nu conțin niciunul dintre cuvintele interzise din dicționar?\"*).\n2. **Aho-Corasick cu memorie redusă:** În loc de matricea bidimensională `nxt[MAXN][26]`, se pot folosi liste de adiacență sau tabele de dispersie (hashmaps) în fiecare nod, reducând spațiul la $\\mathcal{O}(M)$ în detrimentul unei constante de timp ușor mai mari la tranziție.",
  "applications": "### Aplicații\n\n- **Scanere Antivirus:** Căutarea a zeci de mii de semnături de malware (șiruri de biți) în fișiere suspecte într-o singură trecere.\n- **Sisteme de Detecție a Intruziunilor (IDS):** Scanarea traficului de rețea în timp real pentru identificarea pachetelor suspecte.\n- **Sisteme de filtrare de text (Cenzură / Spam):** Blocarea automată a cuvintelor obscene sau a link-urilor spam pe platformele de socializare.",
  code: `#include <iostream>
#include <vector>
#include <queue>
#include <string>

using namespace std;

const int MAXN = 1000;
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
    cout << "Cuvinte gasite: " << matches << "\\n";
    return 0;
}`,
  "explanations": [
    {
      "line": 39,
      "text": "Pornim programul din funcția main.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 40,
      "text": "Apelăm `insert(\"he\")` pentru a adăuga primul cuvânt în Trie.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 13,
      "text": "Inițializăm pointerul u = 0 (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 15,
      "text": "Inserare 'he': creăm nodul 1 pentru caracterul 'h' sub Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "h"}
        ]
      }
    },
    {
      "line": 16,
      "text": "Mergem la nodul 1.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "h"}
        ]
      }
    },
    {
      "line": 15,
      "text": "Inserare 'he': creăm nodul 2 pentru caracterul 'e' sub nodul 1.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100},
          {"id": 2, "label": "e* (2)", "x": 100, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "h"},
          {"source": 1, "target": 2, "label": "e"}
        ]
      }
    },
    {
      "line": 18,
      "text": "Am finalizat inserarea cuvântului \"he\". Marcăm nodul 2 ca având cnt[2] = 1 (cuvânt valid).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100},
          {"id": 2, "label": "e* (2)", "x": 100, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "h"},
          {"source": 1, "target": 2, "label": "e"}
        ]
      }
    },
    {
      "line": 40,
      "text": "Inserăm pe rând cuvintele \"she\", \"his\" și \"hers\" în mod similar, reutilizând prefixele deja create.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100},
          {"id": 2, "label": "e* (2)", "x": 100, "y": 160},
          {"id": 3, "label": "s (3)", "x": 260, "y": 100},
          {"id": 4, "label": "h (4)", "x": 260, "y": 160},
          {"id": 5, "label": "e* (5)", "x": 260, "y": 220},
          {"id": 6, "label": "i (6)", "x": 180, "y": 160},
          {"id": 7, "label": "s* (7)", "x": 180, "y": 220},
          {"id": 8, "label": "r (8)", "x": 100, "y": 220},
          {"id": 9, "label": "s* (9)", "x": 100, "y": 280}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "h"},
          {"source": 1, "target": 2, "label": "e"},
          {"source": 0, "target": 3, "label": "s"},
          {"source": 3, "target": 4, "label": "h"},
          {"source": 4, "target": 5, "label": "e"},
          {"source": 1, "target": 6, "label": "i"},
          {"source": 6, "target": 7, "label": "s"},
          {"source": 2, "target": 8, "label": "r"},
          {"source": 8, "target": 9, "label": "s"}
        ]
      }
    },
    {
      "line": 41,
      "text": "Apelăm funcția build() pentru a calcula legăturile de eșec (fail links).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 23,
      "text": "Intrăm în build(). Adăugăm în coada BFS copiii direcți ai Root-ului: nodurile 1 ('h') și 3 ('s'). Legătura lor de eșec este setată implicit pe 0 (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100, "state": "active"},
          {"id": 3, "label": "s (3)", "x": 260, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 1, "target": 0, "label": "fail"},
          {"source": 3, "target": 0, "label": "fail"}
        ]
      }
    },
    {
      "line": 26,
      "text": "Bucla BFS procesează coada nod cu nod până devine goală.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45}
        ],
        "edges": []
      }
    },
    {
      "line": 27,
      "text": "Procesăm primul nod din coadă: nodul 1 ('h'). Extragem și analizăm copiii săi.",
      "graphVisual": {
        "nodes": [
          {"id": 1, "label": "h (1)", "x": 140, "y": 100, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 30,
      "text": "Nodul 1 are ca prim copil nodul 2 ('e'). Legătura de eșec pentru 2 este calculată ca fail[2] = nxt[fail[1]]['e'] = nxt[0]['e'] = 0 (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 2, "label": "e* (2)", "x": 100, "y": 160, "state": "active"},
          {"id": 0, "label": "Root", "x": 200, "y": 45}
        ],
        "edges": [
          {"source": 2, "target": 0, "label": "fail"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Nodul 1 are ca al doilea copil nodul 6 ('i'). Legătura sa de eșec este setată tot pe Root: fail[6] = 0.",
      "graphVisual": {
        "nodes": [
          {"id": 6, "label": "i (6)", "x": 180, "y": 160, "state": "active"},
          {"id": 0, "label": "Root", "x": 200, "y": 45}
        ],
        "edges": [
          {"source": 6, "target": 0, "label": "fail"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Procesăm nodul 3 ('s') din coadă. Căutăm copiii lui.",
      "graphVisual": {
        "nodes": [
          {"id": 3, "label": "s (3)", "x": 260, "y": 100, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 30,
      "text": "Nodul 3 are ca copil nodul 4 ('h'). fail[4] = nxt[fail[3]]['h'] = nxt[0]['h'] = 1 (nodul 'h' sub Root). Legătura de eșec a lui 4 pointează la 1.",
      "graphVisual": {
        "nodes": [
          {"id": 4, "label": "h (4)", "x": 260, "y": 160, "state": "active"},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100}
        ],
        "edges": [
          {"source": 4, "target": 1, "label": "fail"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Procesăm nodul 2 ('e'). Copilul său 8 ('r') primește fail[8] = nxt[fail[2]]['r'] = nxt[0]['r'] = 0.",
      "graphVisual": {
        "nodes": [
          {"id": 8, "label": "r (8)", "x": 100, "y": 220, "state": "active"},
          {"id": 0, "label": "Root", "x": 200, "y": 45}
        ],
        "edges": [
          {"source": 8, "target": 0, "label": "fail"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Procesăm nodul 6 ('i'). Copilul său 7 ('s') primește fail[7] = nxt[fail[6]]['s'] = nxt[0]['s'] = 3 ('s' sub Root). Legătura de eșec duce la 3.",
      "graphVisual": {
        "nodes": [
          {"id": 7, "label": "s* (7)", "x": 180, "y": 220, "state": "active"},
          {"id": 3, "label": "s (3)", "x": 260, "y": 100}
        ],
        "edges": [
          {"source": 7, "target": 3, "label": "fail"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Procesăm nodul 4 ('h'). Copilul său 5 ('e') primește fail[5] = nxt[fail[4]]['e'] = nxt[1]['e'] = 2. Legătura de eșec duce la nodul 2.",
      "graphVisual": {
        "nodes": [
          {"id": 5, "label": "e* (5)", "x": 260, "y": 220, "state": "active"},
          {"id": 2, "label": "e* (2)", "x": 100, "y": 160}
        ],
        "edges": [
          {"source": 5, "target": 2, "label": "fail"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Procesăm nodul 8 ('r'). Copilul său 9 ('s') primește fail[9] = nxt[fail[8]]['s'] = nxt[0]['s'] = 3. Legătura de eșec pointează la 3.",
      "graphVisual": {
        "nodes": [
          {"id": 9, "label": "s* (9)", "x": 100, "y": 280, "state": "active"},
          {"id": 3, "label": "s (3)", "x": 260, "y": 100}
        ],
        "edges": [
          {"source": 9, "target": 3, "label": "fail"}
        ]
      }
    },
    {
      "line": 43,
      "text": "Definim textul în care căutăm: text = \"ahishers\".",
      "blocksVisual": [
        {
          "label": "Text",
          "groups": [[{"val": "a"}, {"val": "h"}, {"val": "i"}, {"val": "s"}, {"val": "h"}, {"val": "e"}, {"val": "r"}, {"val": "s"}]]
        }
      ]
    },
    {
      "line": 44,
      "text": "Inițializăm starea curentă în automat u = 0, și numărul de potriviri matches = 0.",
      "blocksVisual": [
        {
          "label": "Stare Căutare",
          "groups": [[{"val": "u = 0", "sorted": true}, {"val": "matches = 0", "sorted": true}]]
        }
      ]
    },
    {
      "line": 46,
      "text": "Pasul 0: caracterul 'a'. De la u = 0, nxt[0]['a'] = 0. Rămânem la Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 1: caracterul 'h'. De la u = 0, u devine nxt[0]['h'] = 1.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 45},
          {"id": 1, "label": "h (1)", "x": 140, "y": 100, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 2: caracterul 'i'. De la u = 1, u devine nxt[1]['i'] = 6.",
      "graphVisual": {
        "nodes": [
          {"id": 1, "label": "h (1)", "x": 140, "y": 100},
          {"id": 6, "label": "i (6)", "x": 180, "y": 160, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 3: caracterul 's'. De la u = 6, u devine nxt[6]['s'] = 7.",
      "graphVisual": {
        "nodes": [
          {"id": 6, "label": "i (6)", "x": 180, "y": 160},
          {"id": 7, "label": "s* (7)", "x": 180, "y": 220, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 49,
      "text": "Suntem în nodul 7. Acesta este cuvânt valid (cnt[7] = 1, \"his\"). Adăugăm la matches. Urmărim legătura de eșec fail[7] = 3. matches devine 1.",
      "graphVisual": {
        "nodes": [
          {"id": 7, "label": "s* (7)", "x": 180, "y": 220, "state": "visited"},
          {"id": 3, "label": "s (3)", "x": 260, "y": 100, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 4: caracterul 'h'. De la u = 7, nxt[7]['h'] = 4. Trecem la nodul 4.",
      "graphVisual": {
        "nodes": [
          {"id": 4, "label": "h (4)", "x": 260, "y": 160, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 5: caracterul 'e'. De la u = 4, nxt[4]['e'] = 5. Trecem la nodul 5.",
      "graphVisual": {
        "nodes": [
          {"id": 5, "label": "e* (5)", "x": 260, "y": 220, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 49,
      "text": "Nodul 5 este sfârșit de cuvânt (\"she\"), incrementăm matches la 2. Urmărim fail[5] = 2 (\"he\"), incrementăm matches la 3.",
      "graphVisual": {
        "nodes": [
          {"id": 5, "label": "e* (5)", "x": 260, "y": 220, "state": "visited"},
          {"id": 2, "label": "e* (2)", "x": 100, "y": 160, "state": "visited"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 6: caracterul 'r'. De la u = 5, nxt[5]['r'] = 8. Trecem la nodul 8.",
      "graphVisual": {
        "nodes": [
          {"id": 8, "label": "r (8)", "x": 100, "y": 220, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 46,
      "text": "Pasul 7: caracterul 's'. De la u = 8, nxt[8]['s'] = 9. Trecem la nodul 9.",
      "graphVisual": {
        "nodes": [
          {"id": 9, "label": "s* (9)", "x": 100, "y": 280, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 49,
      "text": "Nodul 9 este sfârșit de cuvânt (\"hers\"). Incrementăm matches la 4. Căutarea este completă.",
      "graphVisual": {
        "nodes": [
          {"id": 9, "label": "s* (9)", "x": 100, "y": 280, "state": "visited"}
        ],
        "edges": []
      }
    },
    {
      "line": 54,
      "text": "Afișăm rezultatul final: 4 matches găsite în text.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [[{"val": "Cuvinte gasite: 4", "sorted": true}]]
        }
      ]
    },
    {
      "line": 55,
      "text": "Programul se încheie returnând 0.",
      "blocksVisual": [
        {
          "label": "Exit",
          "groups": [[{"val": "0", "sorted": true}]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Aho-Corasick Infoarena",
        "url": "https://www.infoarena.ro/problema/ahocorasick",
        "desc": "Problema clasică de determinare a numărului de apariții ale unui set de cuvinte într-un text."
      }
    ],
    "medium": [
      {
        "title": "Stream of Characters",
        "url": "https://leetcode.com/problems/stream-of-characters/",
        "desc": "Căutarea pe flux infinit (stream) de caractere; se pretează optim cu Aho-Corasick sau Trie inversat."
      }
    ],
    "hard": [
      {
        "title": "Trie + DP (Password Generator)",
        "url": "https://codeforces.com/problemset/problem/86/C",
        "desc": "Determinarea numărului de parole valide folosind programare dinamică pe stările automatului Aho-Corasick."
      }
    ]
  },
  "globalVars": [
    {
      "name": "fail",
      "type": "int[MAXN]",
      "val": "Suffix failure links",
      "expandable": false
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const trace = [
        { "stack": ["main()"], "vars": [] },
        { "stack": ["main()"], "vars": [] },
        { "stack": ["insert(s=\"he\")", "main()"], "vars": [{ "name": "s", "type": "std::string", "val": "\"he\"" }, { "name": "u", "type": "int", "val": "0" }] },
        { "stack": ["insert(s=\"he\")", "main()"], "vars": [{ "name": "s", "type": "std::string", "val": "\"he\"" }, { "name": "u", "type": "int", "val": "0" }, { "name": "c", "type": "char", "val": "'h'" }] },
        { "stack": ["insert(s=\"he\")", "main()"], "vars": [{ "name": "s", "type": "std::string", "val": "\"he\"" }, { "name": "u", "type": "int", "val": "1" }] },
        { "stack": ["insert(s=\"he\")", "main()"], "vars": [{ "name": "s", "type": "std::string", "val": "\"he\"" }, { "name": "u", "type": "int", "val": "1" }, { "name": "c", "type": "char", "val": "'e'" }] },
        { "stack": ["insert(s=\"he\")", "main()"], "vars": [{ "name": "s", "type": "std::string", "val": "\"he\"" }, { "name": "u", "type": "int", "val": "2" }] },
        { "stack": ["main()"], "vars": [] },
        { "stack": ["main()"], "vars": [] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "q", "type": "std::queue<int>", "val": "size=2 {1, 3}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "q", "type": "std::queue<int>", "val": "size=2 {1, 3}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "1" }, { "name": "q", "type": "std::queue<int>", "val": "size=1 {3}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "1" }, { "name": "i", "type": "int", "val": "4" }, { "name": "q", "type": "std::queue<int>", "val": "size=2 {3, 2}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "1" }, { "name": "i", "type": "int", "val": "8" }, { "name": "q", "type": "std::queue<int>", "val": "size=3 {3, 2, 6}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "3" }, { "name": "q", "type": "std::queue<int>", "val": "size=2 {2, 6}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "3" }, { "name": "i", "type": "int", "val": "7" }, { "name": "q", "type": "std::queue<int>", "val": "size=3 {2, 6, 4}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "2" }, { "name": "q", "type": "std::queue<int>", "val": "size=3 {6, 4, 8}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "6" }, { "name": "q", "type": "std::queue<int>", "val": "size=3 {4, 8, 7}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "4" }, { "name": "q", "type": "std::queue<int>", "val": "size=3 {8, 7, 5}" }] },
        { "stack": ["build()", "main()"], "vars": [{ "name": "u", "type": "int", "val": "8" }, { "name": "q", "type": "std::queue<int>", "val": "size=3 {7, 5, 9}" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "0" }, { "name": "matches", "type": "int", "val": "0" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "0" }, { "name": "matches", "type": "int", "val": "0" }, { "name": "c", "type": "char", "val": "'a'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "1" }, { "name": "matches", "type": "int", "val": "0" }, { "name": "c", "type": "char", "val": "'h'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "6" }, { "name": "matches", "type": "int", "val": "0" }, { "name": "c", "type": "char", "val": "'i'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "7" }, { "name": "matches", "type": "int", "val": "0" }, { "name": "c", "type": "char", "val": "'s'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "7" }, { "name": "matches", "type": "int", "val": "1" }, { "name": "temp", "type": "int", "val": "3" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "4" }, { "name": "matches", "type": "int", "val": "1" }, { "name": "c", "type": "char", "val": "'h'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "5" }, { "name": "matches", "type": "int", "val": "1" }, { "name": "c", "type": "char", "val": "'e'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "5" }, { "name": "matches", "type": "int", "val": "3" }, { "name": "temp", "type": "int", "val": "0" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "8" }, { "name": "matches", "type": "int", "val": "3" }, { "name": "c", "type": "char", "val": "'r'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "9" }, { "name": "matches", "type": "int", "val": "3" }, { "name": "c", "type": "char", "val": "'s'" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "9" }, { "name": "matches", "type": "int", "val": "4" }, { "name": "temp", "type": "int", "val": "3" }] },
        { "stack": ["main()"], "vars": [{ "name": "text", "type": "std::string", "val": "\"ahishers\"" }, { "name": "u", "type": "int", "val": "9" }, { "name": "matches", "type": "int", "val": "4" }] },
        { "stack": ["main()"], "vars": [] }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [
        { "name": "sz", "type": "int", "val": "9", "expandable": false },
        { "name": "MAXN", "type": "const int", "val": "1000", "expandable": false }
      ];
      const frames = [];

      curr.stack.forEach(frameName => {
        frames.push({ "name": frameName, "file": "solution.cpp", "line": activeLine });
      });

      curr.vars.forEach(v => {
        vars.push({ "name": v.name, "type": v.type, "val": v.val, "expandable": false });
      });

      let inlineVal = curr.vars.length > 0 ? `${curr.vars[0].name}: ${curr.vars[0].val}` : "";
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const mappings = {
        0: { line: 44, val: "main()" },
        1: { line: 45, val: "insert(\"he\")" },
        2: { line: 18, val: "u: 0" },
        3: { line: 19, val: "c: 'h'" },
        4: { line: 21, val: "u: 1" },
        5: { line: 19, val: "c: 'e'" },
        6: { line: 21, val: "u: 2" },
        7: { line: 45, val: "insert(\"she\")" },
        8: { line: 46, val: "build()" },
        9: { line: 27, val: "queue initialized" },
        10: { line: 31, val: "q.empty(): false" },
        11: { line: 32, val: "u: 1" },
        12: { line: 35, val: "fail[2]: 0" },
        13: { line: 35, val: "fail[6]: 0" },
        14: { line: 32, val: "u: 3" },
        15: { line: 35, val: "fail[4]: 1" },
        16: { line: 32, val: "u: 2" },
        17: { line: 32, val: "u: 6" },
        18: { line: 32, val: "u: 4" },
        19: { line: 32, val: "u: 8" },
        20: { line: 48, val: "text: \"ahishers\"" },
        21: { line: 49, val: "matches: 0" },
        22: { line: 50, val: "c: 'a'" },
        23: { line: 50, val: "c: 'h'" },
        24: { line: 50, val: "c: 'i'" },
        25: { line: 50, val: "c: 's'" },
        26: { line: 54, val: "matches: 1" },
        27: { line: 50, val: "c: 'h'" },
        28: { line: 50, val: "c: 'e'" },
        29: { line: 54, val: "matches: 3" },
        30: { line: 50, val: "c: 'r'" },
        31: { line: 50, val: "c: 's'" },
        32: { line: 54, val: "matches: 4" },
        33: { line: 59, val: "stdout: 4" },
        34: { line: 60, val: "return 0" }
      };
      const mapping = mappings[stepIndex];
      if (mapping && mapping.line === lineNum) {
        return mapping.val;
      }
      return null;
    }
  }
};
