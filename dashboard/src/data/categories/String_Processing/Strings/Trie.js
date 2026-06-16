export const data = {
  "presentation": "### Prezentare Generală\n\nUn Trie (sau Arbore de Prefixe) este o structură de date arborescentă, extrem de eficientă pentru stocarea și căutarea unui dicționar mare de cuvinte.\n\nFiecare nod din Trie reprezintă un caracter, iar un drum de la rădăcină (root) la o frunză formează un cuvânt. Avantajul masiv este că prefixele comune ale cuvintelor sunt stocate o singură dată (ex. 'car' și 'cat' vor împărți primele două noduri, 'c' și 'a'). Acest lucru economisește spațiu și reduce masiv numărul de comparații la căutare.",
  "complexity": "### Complexitate\n\n- **Timp:** O(L) pentru inserare și căutare, unde L este lungimea cuvântului. Timpul depinde DOAR de lungimea cuvântului, nu și de numărul de cuvinte din dicționar!\n- **Spațiu:** O(N * L * Σ), unde N este numărul de cuvinte, L lungimea medie, iar Σ este dimensiunea alfabetului (ex. 26 pentru litere mici). Trie-ul poate consuma destul de multă memorie din cauza pointerilor liberi, dar există optimizări (ex. Radix Trie).\n",
  "variations": "### Variații și Edge Cases\n\n1. Trie pe Biți (Bitwise Trie): În loc de litere, muchiile sunt 0 și 1. Este folosit extrem de des pentru aflarea XOR-ului maxim între două numere dintr-un vector.\n2. Compressed Trie (Radix Tree): Muchiile pot avea șiruri întregi de caractere în loc de unul singur, dacă există un singur copil, economisind mult spațiu.",
  "applications": "### Aplicații\n\nTrie-ul este la baza oricărui sistem de 'Auto-Complete' (completare automată) și a corectoarelor gramaticale (Spell Checker). De asemenea, este esențial pentru stocarea și căutarea rapidă în agende telefonice uriașe sau servere de rutare IP.",
  code: `
#include <iostream>
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
    
    cout << "Caut 'cat': " << (t.search("cat") ? "Gasit" : "Nu") << "
";
    cout << "Caut 'ca': " << (t.search("ca") ? "Gasit" : "Nu") << "
";
    return 0;
}
`,
  "explanations": [
    {
      "line": 50,
      "text": "Inițializăm structura Trie. Rădăcina (Root) este creată ca un nod gol.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 51,
      "text": "Începem inserarea cuvântului 'cat'. Pornim de la nodul Rădăcină (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"}
        ],
        "edges": []
      }
    },
    {
      "line": 28,
      "text": "Inserare 'cat': Verificăm dacă Root are un copil pentru caracterul 'c'. Deoarece nu are, creăm un nod nou.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "visited"},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1}
        ]
      }
    },
    {
      "line": 33,
      "text": "Mutăm indicatorul curent la nodul nou creat pentru 'c'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'cat': Căutăm copilul pentru 'a' sub nodul 'c'. Negăsindu-l, creăm un nod nou.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "visited"},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2}
        ]
      }
    },
    {
      "line": 33,
      "text": "Mutăm indicatorul curent la nodul 'a'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'cat': Căutăm copilul pentru 't' sub nodul 'a'. Deoarece nu există, creăm nodul.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "visited"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3}
        ]
      }
    },
    {
      "line": 33,
      "text": "Mutăm indicatorul la nodul 't'. Suntem la sfârșitul cuvântului 'cat'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3}
        ]
      }
    },
    {
      "line": 35,
      "text": "Marcăm nodul 't' ca fiind sfârșit de cuvânt (isEndOfWord = true). Cuvântul 'cat' a fost inserat.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3}
        ]
      }
    },
    {
      "line": 52,
      "text": "Începem inserarea cuvântului 'car'. Pornim din nou de la nodul Rădăcină (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'car': Root are deja un copil pentru 'c' (nodul 1). Îl refolosim în loc să creăm altul.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "visited"},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "active"},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'car': Nodul 'c' are deja un copil pentru 'a' (nodul 2). Îl refolosim.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "visited"},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "active"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'car': Căutăm copilul pentru 'r' sub nodul 'a'. Acesta nu există, așa că creăm un nod nou.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "visited"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4}
        ]
      }
    },
    {
      "line": 33,
      "text": "Mutăm indicatorul la noul nod 'r'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4}
        ]
      }
    },
    {
      "line": 35,
      "text": "Marcăm nodul 'r' ca sfârșit de cuvânt. Acum cuvintele 'cat' și 'car' împart prefixul comun 'ca'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4}
        ]
      }
    },
    {
      "line": 53,
      "text": "Începem inserarea cuvântului 'do'. Pornim de la nodul Rădăcină (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'do': Căutăm copilul 'd' sub Root. Acesta nu există, așa că creăm o ramură nouă în dreapta.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "visited"},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5}
        ]
      }
    },
    {
      "line": 33,
      "text": "Mutăm indicatorul la nodul 'd'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5}
        ]
      }
    },
    {
      "line": 28,
      "text": "Inserare 'do': Căutăm copilul 'o' sub nodul 'd'. Deoarece nu există, creăm nodul.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60, "state": "visited"},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 33,
      "text": "Mutăm indicatorul la nodul 'o'.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "active"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 35,
      "text": "Marcăm nodul 'o' ca fiind sfârșit de cuvânt. Toate cuvintele dicționarului au fost acum inserate în Trie.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 55,
      "text": "Acum căutăm cuvântul 'cat' în Trie. Pornim din nou de la nodul Rădăcină (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 40,
      "text": "Căutare 'cat': Prima literă este 'c'. Root are un copil 'c' (nodul 1). Coborâm la el.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "visited"},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "active"},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 40,
      "text": "Căutare 'cat': A doua literă este 'a'. Nodul 'c' are un copil 'a' (nodul 2). Coborâm la el.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "visited"},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "active"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 40,
      "text": "Căutare 'cat': A treia literă este 't'. Nodul 'a' are un copil 't' (nodul 3). Coborâm la el.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "visited"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "active"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 45,
      "text": "Căutare 'cat': Am terminat caracterele cuvântului. Nodul 't' (nodul 3) are isEndOfWord = true. Căutarea are succes, returnăm true.",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 57,
      "text": "Căutăm acum cuvântul 'ca' (prefix în dicționar). Pornim de la nodul Rădăcină (Root).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "active"},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 40,
      "text": "Căutare 'ca': Prima literă este 'c'. Coborâm la nodul 1 ('c', state: active).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20, "state": "visited"},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "active"},
          {"id": 2, "label": "a", "x": 80, "y": 110},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 40,
      "text": "Căutare 'ca': A doua literă este 'a'. Coborâm la nodul 2 ('a', state: active).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60, "state": "visited"},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "active"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    },
    {
      "line": 45,
      "text": "Căutare 'ca': Am parcurs toate literele. Nodul 2 ('a') nu este marcat ca sfârșit de cuvânt (isEndOfWord = false). Returnăm false (negăsit).",
      "graphVisual": {
        "nodes": [
          {"id": 0, "label": "Root", "x": 140, "y": 20},
          {"id": 1, "label": "c", "x": 80, "y": 60},
          {"id": 2, "label": "a", "x": 80, "y": 110, "state": "active"},
          {"id": 3, "label": "t", "x": 50, "y": 160, "state": "visited"},
          {"id": 4, "label": "r", "x": 110, "y": 160, "state": "visited"},
          {"id": 5, "label": "d", "x": 200, "y": 60},
          {"id": 6, "label": "o", "x": 200, "y": 110, "state": "visited"}
        ],
        "edges": [
          {"source": 0, "target": 1},
          {"source": 1, "target": 2},
          {"source": 2, "target": 3},
          {"source": 2, "target": 4},
          {"source": 0, "target": 5},
          {"source": 5, "target": 6}
        ]
      }
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Implement Trie",
        "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
        "desc": "Implementarea clasică"
      }
    ],
    "medium": [
      {
        "title": "Maximum XOR of Two Numbers",
        "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        "desc": "Bitwise Trie pe Numere"
      },
      {
        "title": "Replace Words",
        "url": "https://leetcode.com/problems/replace-words/",
        "desc": "Trie pentru Prefix matching"
      }
    ],
    "hard": [
      {
        "title": "Word Search II",
        "url": "https://leetcode.com/problems/word-search-ii/",
        "desc": "Trie + Backtracking (DFS) pe matrice"
      }
    ]
  }
};
