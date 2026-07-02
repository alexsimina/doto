const getGraphVisualInternal = (stepIndex) => {
  const nodes = [];
  const edges = [];

  // Define nodes and edges based on stepIndex
  // Keys: 50 (root), 30, 70, 20, 40
  // Position coordinates:
  // 50: (200, 50)
  // 30: (120, 120) -> changes key to 40 at step 46
  // 70: (280, 120)
  // 20: (60, 190)
  // 40: (180, 190) -> deleted at step 50

  const keyFor30 = stepIndex >= 46 ? "40" : "30";

  // Nodes existing at various steps
  if (stepIndex >= 2 && stepIndex <= 4) {
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: "active", desc: "Rădăcină" });
  } else if (stepIndex >= 5 && stepIndex <= 10) {
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: (stepIndex === 7 || stepIndex === 8 || stepIndex === 9 ? "active" : "normal") });
    if (stepIndex >= 10) {
      nodes.push({ id: "30", label: "30", x: 120, y: 120, state: "active", desc: "Nod nou stâng" });
    }
  } else if (stepIndex >= 11 && stepIndex <= 18) {
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: (stepIndex === 15 || stepIndex === 16 || stepIndex === 17 ? "active" : "normal") });
    nodes.push({ id: "30", label: "30", x: 120, y: 120, state: "normal" });
    edges.push({ source: "50", target: "30", active: stepIndex === 12 });
    if (stepIndex >= 18) {
      nodes.push({ id: "70", label: "70", x: 280, y: 120, state: "active", desc: "Nod nou drept" });
    }
  } else if (stepIndex >= 19 && stepIndex <= 23) {
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: (stepIndex === 22 || stepIndex === 23 ? "active" : "normal") });
    nodes.push({ id: "30", label: "30", x: 120, y: 120, state: "normal" });
    nodes.push({ id: "70", label: "70", x: 280, y: 120, state: "normal" });
    edges.push({ source: "50", target: "30", active: false });
    edges.push({ source: "50", target: "70", active: stepIndex === 20 });
    if (stepIndex >= 23) {
      nodes.push({ id: "20", label: "20", x: 60, y: 190, state: "active", desc: "Nod nou stâng-stâng" });
    }
  } else if (stepIndex >= 24 && stepIndex <= 27) {
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: (stepIndex === 26 ? "active" : "normal") });
    nodes.push({ id: "30", label: "30", x: 120, y: 120, state: (stepIndex === 27 ? "active" : "normal") });
    nodes.push({ id: "70", label: "70", x: 280, y: 120, state: "normal" });
    nodes.push({ id: "20", label: "20", x: 60, y: 190, state: stepIndex === 24 ? "active" : "normal" });
    edges.push({ source: "50", target: "30", active: false });
    edges.push({ source: "50", target: "70", active: false });
    edges.push({ source: "30", target: "20", active: stepIndex === 24 });
    if (stepIndex >= 27) {
      nodes.push({ id: "40", label: "40", x: 180, y: 190, state: "active", desc: "Nod nou stâng-drept" });
    }
  } else if (stepIndex >= 28 && stepIndex <= 49) {
    // 40 is still present
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: (stepIndex === 29 || stepIndex === 30 || stepIndex === 34 || stepIndex === 35 || stepIndex === 39 || stepIndex === 40 ? "active" : "normal") });
    nodes.push({ id: "30", label: keyFor30, x: 120, y: 120, state: (stepIndex === 31 || stepIndex === 32 || stepIndex === 33 || stepIndex === 41 || stepIndex === 42 || stepIndex === 46 ? "active" : "normal") });
    nodes.push({ id: "70", label: "70", x: 280, y: 120, state: (stepIndex === 36 ? "active" : "normal") });
    nodes.push({ id: "20", label: "20", x: 60, y: 190, state: "normal" });
    nodes.push({ id: "40", label: "40", x: 180, y: 190, state: (stepIndex === 43 || stepIndex === 44 || stepIndex === 45 || stepIndex === 47 || stepIndex === 48 || stepIndex === 49 ? "active" : "normal"), desc: (stepIndex === 42 ? "Succesor înordine" : undefined) });

    edges.push({ source: "50", target: "30", active: (stepIndex === 31 || stepIndex === 40) });
    edges.push({ source: "50", target: "70", active: (stepIndex === 35) });
    edges.push({ source: "30", target: "20", active: false });
    edges.push({ source: "30", target: "40", active: (stepIndex === 47) });
  } else if (stepIndex >= 50) {
    // 40 at (180, 190) is deleted
    nodes.push({ id: "50", label: "50", x: 200, y: 50, state: "normal" });
    nodes.push({ id: "30", label: "40", x: 120, y: 120, state: stepIndex === 52 ? "active" : "normal", desc: "Cheie înlocuită" });
    nodes.push({ id: "70", label: "70", x: 280, y: 120, state: "normal" });
    nodes.push({ id: "20", label: "20", x: 60, y: 190, state: "normal" });

    edges.push({ source: "50", target: "30", active: false });
    edges.push({ source: "50", target: "70", active: false });
    edges.push({ source: "30", target: "20", active: false });
  }

  return {
    directed: true,
    title: "Structură Arbore Binar de Căutare (BST)",
    nodes,
    edges
  };
};

const stepsData = [
  { line: 71, text: "Inițializăm rădăcina arborelui binar de căutare (`root`) cu `nullptr`.", vars: [["root", "nullptr", true]] },
  { line: 72, text: "Apelăm `insert(root, 50)` pentru a introduce prima cheie în arbore.", vars: [["root", "nullptr", false], ["key", "50", true]] },
  { line: 13, text: "Verificăm dacă nodul curent este `nullptr`. Fiind adevărat, se va crea un nou nod.", vars: [["root", "nullptr", true], ["key", "50", false]] },
  { line: 14, text: "Se alocă un nou nod pentru cheia 50 și se returnează.", vars: [["new Node", "50", true]] },
  { line: 72, text: "Revenim în funcția `main`. Noul nod cu cheia 50 a fost setat drept rădăcina arborelui.", vars: [["root", "Node(50)", true]] },
  { line: 73, text: "Apelăm `insert(root, 30)` pentru a adăuga cheia 30 în arbore.", vars: [["root", "Node(50)", false], ["key", "30", true]] },
  { line: 13, text: "Verificăm dacă nodul curent cu cheia 50 este `nullptr`. Este fals, deci continuăm.", vars: [["root", "Node(50)", true], ["key", "30", false]] },
  { line: 16, text: "Verificăm dacă noua cheie (30) este mai mică decât cheia nodului curent (50). Condiția `30 < 50` este adevărată.", vars: [["key", "30", false], ["root->key", "50", true]] },
  { line: 17, text: "Coborâm recursiv în subarborele stâng apelând `insert(root->left, 30)`.", vars: [["root->left", "nullptr", true], ["key", "30", false]] },
  { line: 13, text: "Nodul curent (fiul stâng al lui 50) este `nullptr`. Vom crea un nod nou.", vars: [["root", "nullptr", true], ["key", "30", false]] },
  { line: 14, text: "Se creează nodul nou cu cheia 30 și se întoarce la nivelul anterior.", vars: [["new Node", "30", true]] },
  { line: 17, text: "Revenim în apelul pentru nodul 50. Fiul stâng al nodului 50 devine noul nod 30.", vars: [["root->left", "Node(30)", true]] },
  { line: 21, text: "Returnăm rădăcina arborelui (nodul 50) înapoi la `main`.", vars: [["root", "Node(50)", true]] },
  { line: 74, text: "Apelăm `insert(root, 70)` pentru a adăuga cheia 70.", vars: [["root", "Node(50)", false], ["key", "70", true]] },
  { line: 16, text: "Verificăm dacă `70 < 50`. Condiția este falsă.", vars: [["key", "70", false], ["root->key", "50", true]] },
  { line: 18, text: "Verificăm dacă `70 > 50`. Condiția este adevărată.", vars: [["key", "70", false], ["root->key", "50", true]] },
  { line: 19, text: "Coborâm recursiv în subarborele drept apelând `insert(root->right, 70)`.", vars: [["root->right", "nullptr", true], ["key", "70", false]] },
  { line: 13, text: "Nodul curent este `nullptr`. Creăm un nod nou cu cheia 70.", vars: [["root", "nullptr", true], ["key", "70", false]] },
  { line: 14, text: "Returnăm nodul nou 70.", vars: [["new Node", "70", true]] },
  { line: 19, text: "Revenim în apelul pentru nodul 50. Fiul drept al nodului 50 devine noul nod 70.", vars: [["root->right", "Node(70)", true]] },
  { line: 75, text: "Apelăm `insert(root, 20)`. Aceasta va coborî recursiv pe calea stângă: 50 -> 30 -> stânga.", vars: [["root", "Node(50)", false], ["key", "20", true]] },
  { line: 17, text: "Pentru 50, condiția `20 < 50` este adevărată. Coborâm la fiul stâng (nodul 30).", vars: [["key", "20", false], ["root->key", "50", true]] },
  { line: 17, text: "Pentru 30, condiția `20 < 30` este adevărată. Coborâm la fiul stâng (`nullptr`).", vars: [["key", "20", false], ["root->key", "30", true]] },
  { line: 14, text: "Creăm nodul 20 ca fiu stâng al lui 30 și ne întoarcem recursiv.", vars: [["new Node", "20", true]] },
  { line: 76, text: "Apelăm `insert(root, 40)`. Aceasta va coborî: 50 -> 30 -> dreapta.", vars: [["root", "Node(50)", false], ["key", "40", true]] },
  { line: 17, text: "Deoarece `40 < 50`, mergem la fiul stâng al lui 50 (nodul 30).", vars: [["key", "40", false], ["root->key", "50", true]] },
  { line: 19, text: "Deoarece `40 > 30`, mergem la fiul drept al lui 30 (`nullptr`).", vars: [["key", "40", false], ["root->key", "30", true]] },
  { line: 14, text: "Creăm nodul 40 ca fiu drept al lui 30 și ne întoarcem recursiv.", vars: [["new Node", "40", true]] },
  { line: 78, text: "Căutăm cheia 30 în BST, pornind de la rădăcină (50).", vars: [["root", "Node(50)", false], ["key", "30", true]] },
  { line: 28, text: "Nodul curent are cheia 50, care nu este egală cu 30.", vars: [["root->key", "50", true], ["key", "30", false]] },
  { line: 32, text: "Deoarece `30 < 50`, căutăm în subarborele stâng (nodul 30).", vars: [["key", "30", false], ["root->key", "50", true]] },
  { line: 28, text: "Nodul curent are cheia 30, care este egală cu 30! Am găsit cheia.", vars: [["root->key", "30", true], ["key", "30", true]] },
  { line: 29, text: "Returnăm `true` indicând că elementul a fost găsit în arbore.", vars: [["return", "true", true]] },
  { line: 79, text: "Acum căutăm cheia 60 în BST, pornind de la rădăcină (50).", vars: [["root", "Node(50)", false], ["key", "60", true]] },
  { line: 34, text: "Deoarece `60 > 50`, coborâm la fiul drept (nodul 70).", vars: [["key", "60", false], ["root->key", "50", true]] },
  { line: 32, text: "Deoarece `60 < 70`, coborâm la fiul stâng al lui 70 (`nullptr`).", vars: [["key", "60", false], ["root->key", "70", true]] },
  { line: 25, text: "Am ajuns la un nod `nullptr`, ceea ce înseamnă că elementul 60 nu există în arbore.", vars: [["root", "nullptr", true]] },
  { line: 26, text: "Returnăm `false` către apelant.", vars: [["return", "false", true]] },
  { line: 81, text: "Apelăm `deleteNode(root, 30)` pentru a șterge nodul cu cheia 30.", vars: [["root", "Node(50)", false], ["key", "30", true]] },
  { line: 49, text: "Deoarece `30 < 50`, apelăm recursiv `deleteNode(root->left, 30)` pe fiul stâng.", vars: [["key", "30", false], ["root->key", "50", true]] },
  { line: 53, text: "Am găsit nodul cu cheia 30. Începem procesul de ștergere.", vars: [["root->key", "30", true], ["key", "30", false]] },
  { line: 63, text: "Nodul 30 are ambii fii (20 și 40). Găsim succesorul înordine: cel mai mic nod din subarborele fiului drept.", vars: [["root", "Node(30)", true]] },
  { line: 38, text: "Pornim de la rădăcina subarborelui drept (nodul 40).", vars: [["node", "Node(40)", true]] },
  { line: 39, text: "Verificăm dacă nodul 40 are fiu stâng. `40->left` este `nullptr`, deci bucla se oprește.", vars: [["current", "Node(40)", true]] },
  { line: 42, text: "Returnăm succesorul înordine găsit (nodul 40).", vars: [["return", "Node(40)", true]] },
  { line: 64, text: "Copiem cheia succesorului (40) în nodul pe care dorim să-l ștergem. Cheia nodului devine 40.", vars: [["root->key", "40", true], ["temp->key", "40", false]] },
  { line: 65, text: "Acum ștergem succesorul original cu cheia 40 din subarborele drept apelând `deleteNode(root->right, 40)`.", vars: [["root->right", "Node(40)", true], ["key", "40", false]] },
  { line: 54, text: "Am găsit nodul duplicat 40. Fiul său stâng este `nullptr`, deci legăm direct fiul său drept.", vars: [["root", "Node(40)", true]] },
  { line: 55, text: "Salvăm fiul drept al lui 40 (`nullptr`) în `temp`.", vars: [["temp", "nullptr", true]] },
  { line: 56, text: "Ștergem fizic nodul cu cheia 40 din memorie.", vars: [["delete", "Node(40)", true]] },
  { line: 57, text: "Returnăm `temp` (`nullptr`), actualizând legătura fiului drept al nodului modificat.", vars: [["return", "nullptr", true]] },
  { line: 67, text: "Nodul modificat (acum cu cheia 40, fiu stâng 20 și fiu drept `nullptr`) este returnat.", vars: [["return", "Node(40)", true]] },
  { line: 81, text: "Ștergerea s-a încheiat. Rădăcina arborelui a fost actualizată.", vars: [["root", "Node(50)", true]] },
  { line: 82, text: "Programul se termină cu succes, returnând 0.", vars: [] }
];

export const data = {
  "presentation": "### Arbori Binari de Căutare (BST)\n\nUn **Arbore Binar de Căutare (Binary Search Tree - BST)** este o structură de date arborescentă în care fiecare nod are cel mult doi fii (stâng și drept), iar cheile stocate respectă următoarea proprietate fundamentală:\n- Pentru orice nod $X$, toate cheile din subarborele său stâng sunt strict mai mici decât cheia lui $X$.\n- Toate cheile din subarborele său drept sunt strict mai mari decât cheia lui $X$.\n\nDatorită acestei proprietăți, o parcurgere înordine (in-order traversal) a unui BST va vizita nodurile în ordine strict crescătoare. BST-ul permite efectuarea rapidă a operațiilor de căutare, inserare și ștergere a elementelor.",
  "complexity": "### Complexitate\n\n- **Timp (Caz Mediu):** $O(\\log N)$ pentru toate operațiile de bază (căutare, inserare, ștergere), unde $N$ este numărul de noduri. Înălțimea medie a unui arbore construit prin inserări aleatorii este logaritmică.\n- **Timp (Cel mai rău caz):** $O(N)$ dacă elementele sunt introduse în ordine sortată (caz în care arborele degenerează într-o listă liniară).\n- **Spațiu:** $O(N)$ pentru stocarea celor $N$ noduri. Spațiul pe stivă pentru recursivitate este de asemenea $O(\\log N)$ în medie și $O(N)$ în cel mai rău caz.",
  "variations": "### Variații și Echilibrare\n\nPentru a evita degenerarea în cazuri nefavorabile, se folosesc structuri auto-echilibrate care garantează o înălțime de maximum $O(\\log N)$ în cel mai rău caz:\n- **Treapuri / Arbori AVL / Arbori Red-Black**: Ajustează structura arborelui folosind rotații sau re-ordonări aleatorii după fiecare inserare/ștergere.\n- **Splay Trees**: Mută nodul cel mai recent accesat la rădăcină prin rotații specifice, oferind complexitate amortizată de $O(\\log N)$ per operație.",
  "applications": "### Aplicații Practice\n\n- Implementarea containerelor asociative ordonate din bibliotecile standard (ex. `std::set` și `std::map` în C++ folosesc arbori Red-Black).\n- Indexarea bazelor de date pentru interogări rapide pe intervale.\n- Organizarea rețelelor de rutare și a algoritmilor de compresie a datelor.",
  "code": `#include <iostream>

using namespace std;

struct Node {
    int key;
    Node* left;
    Node* right;
    Node(int val) : key(val), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int key) {
    if (root == nullptr) {
        return new Node(key);
    }
    if (key < root->key) {
        root->left = insert(root->left, key);
    } else if (key > root->key) {
        root->right = insert(root->right, key);
    }
    return root;
}

bool search(Node* root, int key) {
    if (root == nullptr) {
        return false;
    }
    if (root->key == key) {
        return true;
    }
    if (key < root->key) {
        return search(root->left, key);
    }
    return search(root->right, key);
}

Node* minValueNode(Node* node) {
    Node* current = node;
    while (current && current->left != nullptr) {
        current = current->left;
    }
    return current;
}

Node* deleteNode(Node* root, int key) {
    if (root == nullptr) {
        return root;
    }
    if (key < root->key) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->key) {
        root->right = deleteNode(root->right, key);
    } else {
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        Node* temp = minValueNode(root->right);
        root->key = temp->key;
        root->right = deleteNode(root->right, temp->key);
    }
    return root;
}

int main() {
    Node* root = nullptr;
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);
    
    search(root, 30);
    search(root, 60);
    
    root = deleteNode(root, 30);
    return 0;
}`,
  "explanations": stepsData.map((step, idx) => ({
    "line": step.line,
    "text": step.text,
    "blocksVisual": [
      {
        "label": "Variabile locale",
        "groups": [
          step.vars.length > 0 ? step.vars.map(v => ({
            "val": `${v[0]}: ${v[1]}`,
            "active": v[2]
          })) : [{ "val": "fără variabile active", "active": false }]
        ]
      }
    ],
    "graphVisual": getGraphVisualInternal(idx)
  })),
  "problems": {
    "easy": [
      {
        "title": "BST Inserare și Căutare",
        "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
        "desc": "Implementarea operației de inserare într-un arbore binar de căutare."
      }
    ],
    "medium": [
      {
        "title": "Ștergere nod în BST",
        "url": "https://leetcode.com/problems/delete-node-in-a-bst/",
        "desc": "Implementarea operației de ștergere a unui nod dat dintr-un BST."
      }
    ],
    "hard": [
      {
        "title": "K-th Smallest Element",
        "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
        "desc": "Găsirea celui de-al K-lea cel mai mic element dintr-un BST în timp optim."
      }
    ]
  },
  "globalVars": [],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const step = stepsData[stepIndex] || stepsData[stepsData.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      // Determine active call stack frames based on stepIndex
      frames.push({ name: "main()", file: "main.cpp", line: activeLine });
      
      // Setup recursive frames
      if (stepIndex >= 2 && stepIndex <= 4) {
        frames.unshift({ name: "insert(root = nullptr, key = 50)", file: "bst.cpp", line: activeLine });
      } else if (stepIndex >= 6 && stepIndex <= 13) {
        frames.unshift({ name: "insert(root = Node(50), key = 30)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 9 && stepIndex <= 11) {
          frames.unshift({ name: "insert(root = nullptr, key = 30)", file: "bst.cpp", line: activeLine });
        }
      } else if (stepIndex >= 14 && stepIndex <= 20) {
        frames.unshift({ name: "insert(root = Node(50), key = 70)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 17 && stepIndex <= 19) {
          frames.unshift({ name: "insert(root = nullptr, key = 70)", file: "bst.cpp", line: activeLine });
        }
      } else if (stepIndex >= 21 && stepIndex <= 24) {
        frames.unshift({ name: "insert(root = Node(50), key = 20)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 22) {
          frames.unshift({ name: "insert(root = Node(30), key = 20)", file: "bst.cpp", line: activeLine });
        }
        if (stepIndex >= 23) {
          frames.unshift({ name: "insert(root = nullptr, key = 20)", file: "bst.cpp", line: activeLine });
        }
      } else if (stepIndex >= 25 && stepIndex <= 28) {
        frames.unshift({ name: "insert(root = Node(50), key = 40)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 26) {
          frames.unshift({ name: "insert(root = Node(30), key = 40)", file: "bst.cpp", line: activeLine });
        }
        if (stepIndex >= 27) {
          frames.unshift({ name: "insert(root = nullptr, key = 40)", file: "bst.cpp", line: activeLine });
        }
      } else if (stepIndex >= 29 && stepIndex <= 33) {
        frames.unshift({ name: "search(root = Node(50), key = 30)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 31) {
          frames.unshift({ name: "search(root = Node(30), key = 30)", file: "bst.cpp", line: activeLine });
        }
      } else if (stepIndex >= 34 && stepIndex <= 38) {
        frames.unshift({ name: "search(root = Node(50), key = 60)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 35) {
          frames.unshift({ name: "search(root = Node(70), key = 60)", file: "bst.cpp", line: activeLine });
        }
        if (stepIndex >= 36) {
          frames.unshift({ name: "search(root = nullptr, key = 60)", file: "bst.cpp", line: activeLine });
        }
      } else if (stepIndex >= 39 && stepIndex <= 52) {
        frames.unshift({ name: "deleteNode(root = Node(50), key = 30)", file: "bst.cpp", line: activeLine });
        if (stepIndex >= 40 && stepIndex <= 51) {
          frames.unshift({ name: "deleteNode(root = Node(30), key = 30)", file: "bst.cpp", line: activeLine });
        }
        if (stepIndex >= 42 && stepIndex <= 45) {
          frames.unshift({ name: "minValueNode(node = Node(40))", file: "bst.cpp", line: activeLine });
        }
        if (stepIndex >= 47 && stepIndex <= 50) {
          frames.unshift({ name: "deleteNode(root = Node(40), key = 40)", file: "bst.cpp", line: activeLine });
        }
      }

      globalVars.push({ name: "root", type: "Node*", val: stepIndex === 0 ? "nullptr" : "0x00ff7e88", expandable: true });

      for (const [name, val] of step.vars) {
        vars.push({ name, type: name.includes("Node") || name === "root" || name === "current" || name === "node" || name === "temp" ? "Node*" : "int", val: val.toString(), expandable: false });
      }

      // Inline value generator
      let inlineVal = null;
      if (step.vars.length > 0) {
        inlineVal = step.vars.map(v => `${v[0]} = ${v[1]}`).join(", ");
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const step = stepsData[stepIndex];
      if (!step) return null;
      if (step.line === lineNum) {
        return step.vars.map(v => `${v[0]}: ${v[1]}`).join(", ");
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      return getGraphVisualInternal(stepIndex);
    }
  }
};
