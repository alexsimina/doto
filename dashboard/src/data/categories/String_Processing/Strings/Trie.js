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
      "line": 26,
      "text": "Pentru a insera 'cat', pornim de la nodul Rădăcină (Root).",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "active"
          }
        ],
        "edges": []
      }
    },
    {
      "line": 30,
      "text": "Verificăm prima literă: 'c'. Nodul Root nu are un copil 'c', așa că îl creăm.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "visited"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100,
            "state": "active"
          }
        ],
        "edges": [
          {
            "source": 0,
            "target": 1
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Următoarea literă: 'a'. Creăm copilul 'a' pentru nodul 'c'.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "visited"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100,
            "state": "visited"
          },
          {
            "id": 2,
            "label": "a",
            "x": 80,
            "y": 160,
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
          }
        ]
      }
    },
    {
      "line": 30,
      "text": "Ultima literă: 't'. Creăm copilul 't' pentru nodul 'a'.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "visited"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100,
            "state": "visited"
          },
          {
            "id": 2,
            "label": "a",
            "x": 80,
            "y": 160,
            "state": "visited"
          },
          {
            "id": 3,
            "label": "t",
            "x": 40,
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
            "source": 2,
            "target": 3
          }
        ]
      }
    },
    {
      "line": 34,
      "text": "Am terminat cuvântul. Marcăm nodul 't' ca fiind sfârșit de cuvânt (isEndOfWord = true).",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "visited"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100,
            "state": "visited"
          },
          {
            "id": 2,
            "label": "a",
            "x": 80,
            "y": 160,
            "state": "visited"
          },
          {
            "id": 3,
            "label": "t",
            "x": 40,
            "y": 220,
            "state": "visited"
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
            "source": 2,
            "target": 3
          }
        ]
      }
    },
    {
      "line": 50,
      "text": "Acum inserăm 'car'. Root are deja copilul 'c', deci îl refolosim! Apoi 'c' are deja copilul 'a', deci refolosim! Pentru 'r', îl creăm din nodul 'a'. Aceasta este magia Trie-ului.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "visited"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100,
            "state": "visited"
          },
          {
            "id": 2,
            "label": "a",
            "x": 80,
            "y": 160,
            "state": "visited"
          },
          {
            "id": 3,
            "label": "t",
            "x": 40,
            "y": 220,
            "state": "visited"
          },
          {
            "id": 4,
            "label": "r",
            "x": 120,
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
            "source": 2,
            "target": 3
          },
          {
            "source": 2,
            "target": 4
          }
        ]
      }
    },
    {
      "line": 51,
      "text": "Pentru 'do', Root nu are 'd', așa că creăm o ramură separată în dreapta.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "visited"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100
          },
          {
            "id": 2,
            "label": "a",
            "x": 80,
            "y": 160
          },
          {
            "id": 3,
            "label": "t",
            "x": 40,
            "y": 220
          },
          {
            "id": 4,
            "label": "r",
            "x": 120,
            "y": 220
          },
          {
            "id": 5,
            "label": "d",
            "x": 200,
            "y": 100,
            "state": "active"
          },
          {
            "id": 6,
            "label": "o",
            "x": 200,
            "y": 160,
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
            "source": 2,
            "target": 3
          },
          {
            "source": 2,
            "target": 4
          },
          {
            "source": 0,
            "target": 5
          },
          {
            "source": 5,
            "target": 6
          }
        ]
      }
    },
    {
      "line": 54,
      "text": "Când căutăm 'ca', mergem Root -> c -> a. Dar nodul 'a' NU are flag-ul isEndOfWord activ, deci 'ca' e doar un prefix, nu un cuvânt complet! Returnăm false.",
      "graphVisual": {
        "nodes": [
          {
            "id": 0,
            "label": "Root",
            "x": 140,
            "y": 30,
            "state": "active"
          },
          {
            "id": 1,
            "label": "c",
            "x": 80,
            "y": 100,
            "state": "active"
          },
          {
            "id": 2,
            "label": "a",
            "x": 80,
            "y": 160,
            "state": "active"
          },
          {
            "id": 3,
            "label": "t",
            "x": 40,
            "y": 220
          },
          {
            "id": 4,
            "label": "r",
            "x": 120,
            "y": 220
          },
          {
            "id": 5,
            "label": "d",
            "x": 200,
            "y": 100
          },
          {
            "id": 6,
            "label": "o",
            "x": 200,
            "y": 160
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
            "source": 2,
            "target": 3
          },
          {
            "source": 2,
            "target": 4
          },
          {
            "source": 0,
            "target": 5
          },
          {
            "source": 5,
            "target": 6
          }
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
