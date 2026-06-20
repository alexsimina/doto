export const data = {
  "presentation": "### Prezentare Generală\n\nUn **Trie** (sau Arbore de Prefixe) este o structură de date arborescentă avansată, utilizată pentru a stoca și regăsi rapid chei dintr-un set de șiruri de caractere. \n\nÎntr-un Trie:\n- Nodul rădăcină (root) reprezintă de obicei un șir vid.\n- Fiecare muchie care coboară din un nod reprezintă un caracter din alfabet.\n- Orice drum de la rădăcină la un nod anume reprezintă un prefix al unuia sau mai multor cuvinte.\n- Anumite noduri sunt marcate special ca fiind sfârșit de cuvânt (`isEndOfWord = true`), pentru a distinge între prefixele simple și cuvintele complete stocate în dicționar.\n\n### Principiul de Funcționare\n\nProprietatea cheie a unui Trie este **partajarea prefixelor comune**. De exemplu, cuvintele *\"car\"* și *\"cat\"* vor partaja aceleași prime două noduri (corespunzătoare literelor `'c'` și `'a'`). Acest lucru reduce semnificativ spațiul ocupat în cazul în care dicționarul conține multe cuvinte cu prefixe similare și garantează o viteză excepțională de căutare.",
  "complexity": "### Complexitate\n\nFie $L$ lungimea cuvântului căutat sau inserat, $N$ numărul total de cuvinte, iar $\\Sigma$ dimensiunea alfabetului (de exemplu, $\\Sigma = 26$ pentru literele mici ale alfabetului englez).\n\n- **Timp:**\n  - **Inserare (Insert):** $\\mathcal{O}(L)$ - parcurgem sau creăm exact $L$ noduri.\n  - **Căutare (Search):** $\\mathcal{O}(L)$ - căutarea depinde exclusiv de lungimea cuvântului căutat, fiind complet independentă de numărul total de cuvinte $N$ stocate în structură.\n  - **Căutare prefix (Starts With):** $\\mathcal{O}(L)$ - verificăm dacă există drumul definit de prefix.\n- **Spațiu:**\n  - **Cel mai rău caz:** $\\mathcal{O}(V \\cdot \\Sigma)$, unde $V$ este numărul total de noduri în Trie ($V \\le N \\cdot L$). Fiecare nod conține un tablou de pointeri de dimensiune $\\Sigma$. Din acest motiv, structura poate consuma multă memorie în varianta de bază, dar se pot folosi liste sau hărți (`std::unordered_map`) în noduri pentru a reduce spațiul la $\\mathcal{O}(V)$.",
  "variations": "### Variații și Edge Cases\n\n1. **Bitwise Trie (Trie Binar):** O variație în care caracterele sunt doar biți ($0$ și $1$, deci $\\Sigma = 2$). Este extrem de utilă în probleme de tipul *\"XOR maxim între două numere dintr-un vector\"*.\n2. **Radix Tree (Compressed Trie):** Optimizează spațiul prin unirea nodurilor consecutive care au un singur copil (de exemplu, calea `n -> o -> d` devine un singur nod `nod`).\n3. **Ternary Search Tree (TST):** Fiecare nod are exact trei copii (Left, Equal, Right), reducând consumul de spațiu la $\\mathcal{O}(V)$ fără a depinde direct de $\\Sigma$.",
  "applications": "### Aplicații\n\n- **Autocompletare (Auto-Complete):** Sugerarea de cuvinte pe baza prefixului tastat deja de utilizator.\n- **Spell Checker:** Verificarea corectitudinii ortografice a cuvintelor dintr-un dicționar.\n- **IP Routing (Longest Prefix Match):** Ruterele de internet folosesc structuri similare pentru a determina calea optimă de transmitere a pachetelor de date IP.\n- **Motoare de căutare:** Indexarea documentelor și căutarea rapidă a cuvintelor.",
  code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool isEndOfWord;
    
    TrieNode() {
        isEndOfWord = false;
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
    }
};

class Trie {
private:
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (node->children[index] == nullptr) {
                node->children[index] = new TrieNode();
            }
            node = node->children[index];
        }
        node->isEndOfWord = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (node->children[index] == nullptr) return false;
            node = node->children[index];
        }
        return node->isEndOfWord;
    }
};

int main() {
    Trie t;
    t.insert("cat");
    t.insert("car");
    t.insert("do");
    
    cout << "Caut 'cat': " << (t.search("cat") ? "Gasit" : "Nu") << "\\n";
    cout << "Caut 'ca': " << (t.search("ca") ? "Gasit" : "Nu") << "\\n";
    return 0;
}`,
  "explanations": [
    {
      "line": 49,
      "text": "Instanțiem clasa Trie, apelând constructorul implicit care alocă nodul Root gol.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 50,
      "text": "Apelăm `insert(\"cat\")`. Începem parcurgerea de la nodul Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 26,
      "text": "Setăm indicatorul curent `node` pe nodul `root`.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 27,
      "text": "Citim primul caracter 'c' din cuvântul \"cat\".",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 29,
      "text": "Verificăm dacă sub nodul curent există un copil asociat literei 'c'. Copilul este nul.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 30,
      "text": "Deoarece copilul corespunzător literei 'c' nu există, creăm un nod nou.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"}
        ]
      }
    },
    {
      "line": 32,
      "text": "Coborâm pe muchia nou creată. `node` devine nodul asociat literei 'c'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Citim următorul caracter 'a' din \"cat\".",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"}
        ]
      }
    },
    {
      "line": 29,
      "text": "Verificăm copilul pentru 'a' sub nodul 'c'. Acesta este nul.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Creăm un nod nou pentru caracterul 'a' legat de nodul 'c'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 32,
      "text": "Avansăm variabila `node` la noul nod 'a'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 27,
      "text": "Citim ultimul caracter 't' din \"cat\".",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Creăm un nod nou pentru caracterul 't' legat de nodul 'a'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t", "x": 80, "y": 220, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 32,
      "text": "Mergem la nodul 't'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t", "x": 80, "y": 220, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 34,
      "text": "Am terminat inserarea cuvântului \"cat\". Marcăm `isEndOfWord = true` în nodul 't' (nodul 3 devine verde/sortat).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 51,
      "text": "Apelăm `insert(\"car\")`. Începem din nou din Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 29,
      "text": "Inserăm 'car': Căutăm litera 'c'. Copilul există deja sub root. Nu creăm nod nou, doar îl reutilizăm.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 29,
      "text": "Inserăm 'car': Căutăm litera 'a'. Copilul există sub nodul 'c'. Îl reutilizăm.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Inserăm 'car': Căutăm litera 'r' sub nodul 'a'. Acesta nu există, așa că creăm un nod nou.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r", "x": 160, "y": 220, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"}
        ]
      }
    },
    {
      "line": 34,
      "text": "Am terminat inserarea cuvântului \"car\". Marcăm nodul 'r' (nodul 4) ca fiind sfârșit de cuvânt.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"}
        ]
      }
    },
    {
      "line": 52,
      "text": "Apelăm `insert(\"do\")`. Începem din Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Inserăm 'do': Căutăm litera 'd'. Deoarece nu există sub Root, creăm o ramură nouă în dreapta.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"},
          {"id": 5, "label": "d", "x": 280, "y": 100, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"},
          {"source": 0, "target": 5, "label": "d"}
        ]
      }
    },
    {
      "line": 30,
      "text": "Inserăm 'do': Căutăm litera 'o' sub nodul 'd'. Creăm un nod nou.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"},
          {"id": 5, "label": "d", "x": 280, "y": 100},
          {"id": 6, "label": "o", "x": 280, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"},
          {"source": 0, "target": 5, "label": "d"},
          {"source": 5, "target": 6, "label": "o"}
        ]
      }
    },
    {
      "line": 34,
      "text": "Am terminat de inserat \"do\". Marcăm nodul 'o' (nodul 6) ca sfârșit de cuvânt.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"},
          {"id": 5, "label": "d", "x": 280, "y": 100},
          {"id": 6, "label": "o*", "x": 280, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"},
          {"source": 0, "target": 5, "label": "d"},
          {"source": 5, "target": 6, "label": "o"}
        ]
      }
    },
    {
      "line": 54,
      "text": "Căutăm cuvântul \"cat\" în Trie.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"},
          {"id": 5, "label": "d", "x": 280, "y": 100},
          {"id": 6, "label": "o*", "x": 280, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"},
          {"source": 0, "target": 5, "label": "d"},
          {"source": 5, "target": 6, "label": "o"}
        ]
      }
    },
    {
      "line": 38,
      "text": "Căutare: Pornim pointerul `node` de la Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"},
          {"id": 4, "label": "r*", "x": 160, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"},
          {"source": 2, "target": 4, "label": "r"}
        ]
      }
    },
    {
      "line": 42,
      "text": "Căutare \"cat\": primul caracter este 'c'. Coborâm la nodul 'c'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 42,
      "text": "Căutare \"cat\": al doilea caracter este 'a'. Coborâm la nodul 'a'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 42,
      "text": "Căutare \"cat\": al treilea caracter este 't'. Coborâm la nodul 't'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 44,
      "text": "Am parcurs cuvântul complet. Deoarece nodul 't' are `isEndOfWord = true`, returnăm `true` (Găsit).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 55,
      "text": "Căutăm acum cuvântul \"ca\" în Trie (un prefix, nu un cuvânt complet stocat).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160},
          {"id": 3, "label": "t*", "x": 80, "y": 220, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"},
          {"source": 2, "target": 3, "label": "t"}
        ]
      }
    },
    {
      "line": 38,
      "text": "Căutare \"ca\": Pornim pointerul de la Root.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40, "state": "active"},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 42,
      "text": "Căutare \"ca\": prima literă 'c' se găsește. Coborâm la nodul 'c'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100, "state": "active"},
          {"id": 2, "label": "a", "x": 120, "y": 160}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 42,
      "text": "Căutare \"ca\": a doua literă 'a' se găsește. Coborâm la nodul 'a'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 44,
      "text": "Am parcurs complet cuvântul \"ca\". Cu toate acestea, nodul 'a' are `isEndOfWord = false` (nu este marcat cu *). Returnăm `false` (Negăsit).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40},
          {"id": 1, "label": "c", "x": 120, "y": 100},
          {"id": 2, "label": "a", "x": 120, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1, "label": "c"},
          {"source": 1, "target": 2, "label": "a"}
        ]
      }
    },
    {
      "line": 56,
      "text": "Programul se încheie returnând 0.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 200, "y": 40}
        ],
        "edges": []
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Implement Trie (Prefix Tree)",
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
        "desc": "Implementarea clasică a metodelor insert, search și startsWith."
      }
    ],
    "medium": [
      {
        "title": "Maximum XOR of Two Numbers in an Array",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        "desc": "Folosirea unui Bitwise Trie (cu 0 și 1) pentru a găsi eficient perechea cu XOR maxim."
      },
      {
        "title": "Replace Words",
        "url": "https://leetcode.com/problems/replace-words/",
        "desc": "Înlocuirea cuvintelor dintr-o propoziție cu cea mai scurtă rădăcină (prefix) din Trie."
      }
    ],
    "hard": [
      {
        "title": "Word Search II",
        "url": "https://leetcode.com/problems/word-search-ii/",
        "desc": "Căutarea simultană a mai multor cuvinte într-o matrice folosind DFS combinat cu un Trie."
      }
    ]
  },
  "globalVars": [
  {
    "name": "root",
    "type": "TrieNode*",
    "val": "0x7ffeb073",
    "expandable": false
  }
]
};
