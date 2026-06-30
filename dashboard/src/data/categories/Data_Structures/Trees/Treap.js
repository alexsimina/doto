const getGraphVisualInternal = (stepIndex) => {
  let nodes = [];
  let edges = [];

  if (stepIndex === 0) {
    // empty
  } else if (stepIndex >= 1 && stepIndex <= 8) {
    nodes.push({ id: "5", label: "K:5, P:80", x: 200, y: 80, state: (stepIndex >= 2 ? "normal" : "active"), desc: "Rădăcină" });
    if (stepIndex >= 8) {
      nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: "active", desc: "Fiu Stâng" });
      edges.push({ source: "5", target: "3", active: true });
    }
  } else if (stepIndex === 9) {
    nodes.push({ id: "5", label: "K:5, P:80", x: 200, y: 80, state: "normal", desc: "Rădăcină" });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: "active", desc: "Fiu Stâng" });
    edges.push({ source: "5", target: "3", active: false });
  } else if (stepIndex >= 10 && stepIndex <= 12) {
    nodes.push({ id: "5", label: "K:5, P:80", x: 200, y: 80, state: "normal", desc: "Rădăcină" });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: "normal", desc: "Fiu Stâng" });
    edges.push({ source: "5", target: "3", active: false });
    if (stepIndex >= 12) {
      nodes.push({ id: "8", label: "K:8, P:60", x: 280, y: 160, state: "active", desc: "Fiu Drept" });
      edges.push({ source: "5", target: "8", active: true });
    }
  } else if (stepIndex === 13) {
    nodes.push({ id: "5", label: "K:5, P:80", x: 200, y: 80, state: "normal" });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: "normal" });
    nodes.push({ id: "8", label: "K:8, P:60", x: 280, y: 160, state: "normal" });
    edges.push({ source: "5", target: "3", active: false });
    edges.push({ source: "5", target: "8", active: false });
  } else if (stepIndex >= 14 && stepIndex <= 20) {
    nodes.push({ id: "5", label: "K:5, P:80", x: 200, y: 80, state: (stepIndex === 14 || stepIndex === 15 || stepIndex === 16 || stepIndex === 20 ? "active" : "normal") });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: (stepIndex === 17 || stepIndex === 19 ? "active" : "normal") });
    nodes.push({ id: "8", label: "K:8, P:60", x: 280, y: 160, state: "normal" });
    nodes.push({ id: "4", label: "K:4, P:90", x: 200, y: 240, state: "visited", desc: "Nod în curs de split/inserare" });
    
    edges.push({ source: "5", target: "8", active: false });
    if (stepIndex < 20) {
      edges.push({ source: "5", target: "3", active: (stepIndex === 15 || stepIndex === 16) });
    }
  } else if (stepIndex === 21 || stepIndex === 22) {
    nodes.push({ id: "4", label: "K:4, P:90", x: 200, y: 80, state: (stepIndex === 21 ? "active" : "normal"), desc: "Noua Rădăcină" });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: "normal" });
    nodes.push({ id: "5", label: "K:5, P:80", x: 280, y: 160, state: "normal" });
    nodes.push({ id: "8", label: "K:8, P:60", x: 340, y: 240, state: "normal" });
    edges.push({ source: "4", target: "3", active: (stepIndex === 21) });
    edges.push({ source: "4", target: "5", active: (stepIndex === 21) });
    edges.push({ source: "5", target: "8", active: false });
  } else if (stepIndex === 23) {
    nodes.push({ id: "4", label: "K:4, P:90", x: 200, y: 80, state: "active" });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: "normal" });
    nodes.push({ id: "5", label: "K:5, P:80", x: 280, y: 160, state: "normal" });
    nodes.push({ id: "8", label: "K:8, P:60", x: 340, y: 240, state: "normal" });
    edges.push({ source: "4", target: "3", active: false });
    edges.push({ source: "4", target: "5", active: false });
    edges.push({ source: "5", target: "8", active: false });
  } else if (stepIndex >= 24 && stepIndex <= 27) {
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: (stepIndex === 24 || stepIndex === 26 || stepIndex === 27 ? "active" : "normal") });
    nodes.push({ id: "5", label: "K:5, P:80", x: 280, y: 160, state: (stepIndex === 25 ? "active" : "normal") });
    nodes.push({ id: "8", label: "K:8, P:60", x: 340, y: 240, state: "normal" });
    edges.push({ source: "5", target: "8", active: false });
  } else if (stepIndex >= 28) {
    nodes.push({ id: "5", label: "K:5, P:80", x: 200, y: 80, state: (stepIndex === 28 ? "active" : (stepIndex === 30 ? "visited" : "normal")), desc: "Rădăcină" });
    nodes.push({ id: "3", label: "K:3, P:50", x: 120, y: 160, state: (stepIndex === 30 ? "visited" : "normal") });
    nodes.push({ id: "8", label: "K:8, P:60", x: 280, y: 160, state: (stepIndex === 30 ? "visited" : "normal") });
    edges.push({ source: "5", target: "3", active: (stepIndex === 28) });
    edges.push({ source: "5", target: "8", active: false });
  }

  const enrichedNodes = nodes.map(n => ({
    ...n,
    val: n.id,
    labelPosition: parseInt(n.id) < 5 ? "left" : "right"
  }));

  return {
    directed: true,
    title: "Structura Treap-ului (Cheie, Prioritate)",
    nodes: enrichedNodes,
    edges
  };
};

const stepsData = [
  {
    line: 70,
    text: "Inițializăm rădăcina treap-ului (`root`) cu `nullptr`.",
    vars: [["root", "nullptr", true]]
  },
  {
    line: 72,
    text: "Apelăm `insert(root, new Node(5, 80))`. Se creează un nod nou cu cheia $5$ și prioritatea $80$. Deocamdată, nodul nu este adăugat în structură.",
    vars: [["root", "nullptr", false], ["it", "Node(5, 80)", true]]
  },
  {
    line: 37,
    text: "Intrăm în funcția `insert`. Deoarece arborele `t` (care referențiază rădăcina) este `nullptr`, se execută ramura `if (!t)`.",
    vars: [["t", "nullptr", true], ["it", "Node(5, 80)", false]]
  },
  {
    line: 38,
    text: "Atribuim `t = it`. Rădăcina treap-ului devine acum nodul $(5, 80)$.",
    vars: [["t", "Node(5, 80)", true]]
  },
  {
    line: 73,
    text: "Apelăm `insert(root, new Node(3, 50))`. Se creează un nod nou cu cheia $3$ și prioritatea $50$.",
    vars: [["root", "Node(5, 80)", false], ["it", "Node(3, 50)", true]]
  },
  {
    line: 37,
    text: "Intrăm în `insert`. Arborele `t` (care este nodul $5$) nu este `nullptr`, deci trecem la verificarea priorității.",
    vars: [["t", "Node(5, 80)", true], ["it", "Node(3, 50)", false]]
  },
  {
    line: 39,
    text: "Verificăm dacă prioritatea nodului nou ($50$) este mai mare decât cea a rădăcinii curente ($80$). Condiția `it->priority > t->priority` este falsă.",
    vars: [["t->priority", "80", false], ["it->priority", "50", true]]
  },
  {
    line: 42,
    text: "Deoarece cheia noului nod ($3$) este mai mică decât cheia rădăcinii ($5$), apelăm recursiv `insert(t->left, it)` pe subarborele stâng.",
    vars: [["t->key", "5", false], ["it->key", "3", true]]
  },
  {
    line: 37,
    text: "Intrăm în apelul recursiv pentru subarborele stâng. Aici, `t` (fiul stâng al nodului $5$) este `nullptr`, deci se execută ramura `if (!t)`.",
    vars: [["t", "nullptr", true], ["it", "Node(3, 50)", false]]
  },
  {
    line: 38,
    text: "Atribuim `t = it`. Nodul $(3, 50)$ este legat direct ca fiul stâng al nodului $(5, 80)$.",
    vars: [["t", "Node(3, 50)", true]]
  },
  {
    line: 74,
    text: "Apelăm `insert(root, new Node(8, 60))`. Se creează nodul nou cu cheia $8$ și prioritatea $60$.",
    vars: [["root", "Node(5, 80)", false], ["it", "Node(8, 60)", true]]
  },
  {
    line: 42,
    text: "După verificările de prioritate în `insert`, cheia nodului nou ($8$) este mai mare decât cea a rădăcinii ($5$). Apelăm recursiv `insert(t->right, it)` pe subarborele drept.",
    vars: [["t->key", "5", false], ["it->key", "8", true]]
  },
  {
    line: 38,
    text: "Deoarece fiul drept al nodului $5$ este `nullptr`, noul nod $(8, 60)$ este inserat direct ca fiu drept al nodului $(5, 80)$.",
    vars: [["t", "Node(8, 60)", true]]
  },
  {
    line: 75,
    text: "Apelăm `insert(root, new Node(4, 90))`. Se creează nodul nou cu cheia $4$ și prioritatea $90$.",
    vars: [["root", "Node(5, 80)", false], ["it", "Node(4, 90)", true]]
  },
  {
    line: 39,
    text: "Verificăm prioritatea nodului nou: `it->priority` ($90$) este mai mare decât `t->priority` ($80$). Aceasta înseamnă că noul nod $(4, 90)$ trebuie să devină noua rădăcină locală, iar nodurile din subarborele curent trebuie împărțite în stânga și dreapta prin funcția `split`.",
    vars: [["t->priority", "80", false], ["it->priority", "90", true]]
  },
  {
    line: 40,
    text: "Apelăm `split(t, it->key, it->left, it->right)`. Această funcție va distribui toate nodurile din treap-ul cu rădăcina $5$ în funcție de cheia $4$.",
    vars: [["t", "Node(5, 80)", false], ["key", "4", true]]
  },
  {
    line: 15,
    text: "În `split`, cheia rădăcinii curente `t->key` ($5$) este mai mare decât cheia de split $4$ (condiția `t->key <= key` este falsă). Nodul $5$ și subarborele său drept vor fi în partea dreaptă a split-ului. Apelăm recursiv `split(t->left, key, l, t->left)` pe subarborele stâng.",
    vars: [["t->key", "5", false], ["key", "4", true]]
  },
  {
    line: 15,
    text: "Intrăm în `split` pentru nodul $3$. Aici, `t->key` ($3$) este $\\le 4$. Deci nodul $3$ va fi în partea stângă a split-ului. Apelăm recursiv `split(t->right, key, t->right, r)` pe subarborele drept al lui $3$ (care este `nullptr`).",
    vars: [["t->key", "3", false], ["key", "4", true]]
  },
  {
    line: 13,
    text: "Ajungem la un nod `nullptr` (fiul drept al lui $3$). Funcția de split se oprește, setând pointerii `l` și `r` corespunzători la `nullptr`.",
    vars: [["t", "nullptr", true]]
  },
  {
    line: 17,
    text: "Revenim în split-ul nodului $3$. Trecem la linia `l = t`, adică subarborele stâng `l` returnat va fi nodul $3$, iar fiul său drept rămâne `nullptr`.",
    vars: [["t", "Node(3, 50)", true], ["l", "Node(3, 50)", false]]
  },
  {
    line: 20,
    text: "Revenim în split-ul nodului $5$. Trecem la linia `r = t`, adică subarborele drept `r` returnat va fi nodul $5$. De asemenea, fiul stâng al lui $5$ este înlocuit cu rezultatul split-ului de pe ramura dreaptă (care este `nullptr`). Astfel, nodul $5$ nu mai are fiul stâng $3$.",
    vars: [["t", "Node(5, 80)", true], ["r", "Node(5, 80)", false]]
  },
  {
    line: 41,
    text: "Revenim în funcția `insert`. Nodul $(4, 90)$ a preluat în fiul stâng pe `it->left` (nodul $3$) și în cel drept pe `it->right` (nodul $5$, care îl are pe $8$ ca fiu drept). Atribuim `t = it`, făcând din nodul $4$ noua rădăcină a întregului Treap.",
    vars: [["t", "Node(4, 90)", true]]
  },
  {
    line: 77,
    text: "Apelăm `erase(root, 4)`. Dorim să eliminăm cheia $4$ din Treap. Această operație va localiza nodul și va uni subarborii stâng și drept prin `merge`.",
    vars: [["root", "Node(4, 90)", false], ["key", "4", true]]
  },
  {
    line: 51,
    text: "Găsim nodul cu cheia $4$. Îl salvăm într-un pointer temporar `temp` și apelăm `merge(t, t->left, t->right)` pentru a uni subarborele stâng (nodul $3$) cu subarborele drept (nodul $5$).",
    vars: [["t", "Node(4, 90)", true], ["key", "4", false]]
  },
  {
    line: 25,
    text: "Intrăm în funcția `merge` cu `l = Node(3, 50)` și `r = Node(5, 80)`. Niciun subarbore nu este `nullptr`.",
    vars: [["l", "Node(3, 50)", false], ["r", "Node(5, 80)", true]]
  },
  {
    line: 27,
    text: "Deoarece `l->priority` ($50$) este mai mică decât `r->priority` ($80$), rădăcina noului subarbore îmbinat trebuie să fie `r` (nodul $5$). Apelăm recursiv `merge(r->left, l, r->left)` pentru a îmbina `l` cu fiul stâng al lui `r` (care este `nullptr`).",
    vars: [["l->priority", "50", false], ["r->priority", "80", true]]
  },
  {
    line: 25,
    text: "Intrăm în apelul recursiv `merge` pentru `l = Node(3, 50)` și `r = nullptr`.",
    vars: [["l", "Node(3, 50)", true], ["r", "nullptr", false]]
  },
  {
    line: 26,
    text: "Deoarece `r` este `nullptr`, îmbinarea returnează direct pe `l` (nodul $3$).",
    vars: [["t", "Node(3, 50)", true]]
  },
  {
    line: 32,
    text: "Revenim în primul apel `merge`. Fiul stâng al lui $5$ devine rezultatul îmbinării (nodul $3$). Întregul subarbore îmbinat (nodurile $5$, $3$, $8$) este returnat ca fiind rădăcina `t`.",
    vars: [["t", "Node(5, 80)", true]]
  },
  {
    line: 54,
    text: "Revenim în `erase`. Se șterge nodul salvat în `temp` (nodul $4$), eliberând memoria. Rădăcina `t` indică acum nodul $5$.",
    vars: [["t", "Node(5, 80)", true], ["temp", "Node(4, 90)", false]]
  },
  {
    line: 80,
    text: "Apelăm `printInorder(root)`. Se face o parcurgere înordine (stânga-rădăcină-dreapta) a arborelui rămas, afișând cheile sortate crescător: $3$, $5$, $8$.",
    vars: [["root", "Node(5, 80)", true]]
  },
  {
    line: 83,
    text: "Programul se termină cu succes, returnând $0$.",
    vars: [[]]
  }
];

const trace = [
  { line: 70, frames: ["main()"], vars: { "root": "nullptr" }, inlineVal: "root = nullptr" },
  { line: 72, frames: ["main()"], vars: { "root": "nullptr", "it->key": "5", "it->priority": "80" }, inlineVal: "insert key 5, priority 80" },
  { line: 37, frames: ["insert(t, it)", "main()"], vars: { "t": "nullptr", "it->key": "5", "it->priority": "80" }, inlineVal: "t is nullptr" },
  { line: 38, frames: ["insert(t, it)", "main()"], vars: { "t": "Node(5, 80)", "it->key": "5", "it->priority": "80" }, inlineVal: "t = it" },
  { line: 73, frames: ["main()"], vars: { "root": "Node(5, 80)", "it->key": "3", "it->priority": "50" }, inlineVal: "insert key 3, priority 50" },
  { line: 37, frames: ["insert(t, it)", "main()"], vars: { "t": "Node(5, 80)", "it->key": "3", "it->priority": "50" }, inlineVal: "t is not nullptr" },
  { line: 39, frames: ["insert(t, it)", "main()"], vars: { "t->priority": "80", "it->priority": "50" }, inlineVal: "50 > 80 is false" },
  { line: 42, frames: ["insert(t, it)", "main()"], vars: { "t->key": "5", "it->key": "3" }, inlineVal: "3 < 5 is true, descend left" },
  { line: 37, frames: ["insert(t->left, it)", "insert(t, it)", "main()"], vars: { "t": "nullptr", "it->key": "3", "it->priority": "50" }, inlineVal: "t is nullptr" },
  { line: 38, frames: ["insert(t->left, it)", "insert(t, it)", "main()"], vars: { "t": "Node(3, 50)", "it->key": "3" }, inlineVal: "t = it" },
  { line: 74, frames: ["main()"], vars: { "root": "Node(5, 80)", "it->key": "8", "it->priority": "60" }, inlineVal: "insert key 8, priority 60" },
  { line: 42, frames: ["insert(t, it)", "main()"], vars: { "t->key": "5", "it->key": "8" }, inlineVal: "8 > 5 is true, descend right" },
  { line: 38, frames: ["insert(t->right, it)", "insert(t, it)", "main()"], vars: { "t": "Node(8, 60)", "it->key": "8" }, inlineVal: "t = it" },
  { line: 75, frames: ["main()"], vars: { "root": "Node(5, 80)", "it->key": "4", "it->priority": "90" }, inlineVal: "insert key 4, priority 90" },
  { line: 39, frames: ["insert(t, it)", "main()"], vars: { "t->priority": "80", "it->priority": "90" }, inlineVal: "90 > 80 is true, perform split" },
  { line: 40, frames: ["split(t, key, l, r)", "insert(t, it)", "main()"], vars: { "t->key": "5", "key": "4" }, inlineVal: "splitting Node 5 by key 4" },
  { line: 15, frames: ["split(t, key, l, r)", "insert(t, it)", "main()"], vars: { "t->key": "5", "key": "4" }, inlineVal: "5 <= 4 is false, split left child" },
  { line: 15, frames: ["split(t->left, key, l, t->left)", "split(t, key, l, r)", "insert(t, it)", "main()"], vars: { "t->key": "3", "key": "4" }, inlineVal: "splitting Node 3 by key 4" },
  { line: 13, frames: ["split(t->right, key, t->right, r)", "split(t->left, key, l, t->left)", "split(t, key, l, r)", "insert(t, it)", "main()"], vars: { "t": "nullptr", "key": "4" }, inlineVal: "t is nullptr, split finished" },
  { line: 17, frames: ["split(t->left, key, l, t->left)", "split(t, key, l, r)", "insert(t, it)", "main()"], vars: { "t->key": "3", "l": "Node(3, 50)", "r": "nullptr" }, inlineVal: "l = 3, r = nullptr" },
  { line: 20, frames: ["split(t, key, l, r)", "insert(t, it)", "main()"], vars: { "t->key": "5", "l": "Node(3, 50)", "r": "Node(5, 80)" }, inlineVal: "l = 3, r = 5" },
  { line: 41, frames: ["insert(t, it)", "main()"], vars: { "t": "Node(4, 90)", "t->left": "Node(3, 50)", "t->right": "Node(5, 80)" }, inlineVal: "t = it, root is Node 4" },
  { line: 77, frames: ["main()"], vars: { "root": "Node(4, 90)", "key": "4" }, inlineVal: "erase key 4" },
  { line: 51, frames: ["erase(t, key)", "main()"], vars: { "t->key": "4", "key": "4" }, inlineVal: "key matches root 4" },
  { line: 25, frames: ["merge(t, l, r)", "erase(t, key)", "main()"], vars: { "l": "Node(3, 50)", "r": "Node(5, 80)" }, inlineVal: "merging Node 3 and Node 5" },
  { line: 27, frames: ["merge(t, l, r)", "erase(t, key)", "main()"], vars: { "l->priority": "50", "r->priority": "80" }, inlineVal: "50 > 80 is false, merge L with R->left" },
  { line: 25, frames: ["merge(r->left, l, r->left)", "merge(t, l, r)", "erase(t, key)", "main()"], vars: { "l": "Node(3, 50)", "r": "nullptr" }, inlineVal: "r is nullptr, return l" },
  { line: 26, frames: ["merge(r->left, l, r->left)", "merge(t, l, r)", "erase(t, key)", "main()"], vars: { "t": "Node(3, 50)" }, inlineVal: "merged result: Node 3" },
  { line: 32, frames: ["merge(t, l, r)", "erase(t, key)", "main()"], vars: { "t": "Node(5, 80)" }, inlineVal: "merged result: Node 5" },
  { line: 54, frames: ["erase(t, key)", "main()"], vars: { "temp": "deleted", "t": "Node(5, 80)" }, inlineVal: "temp deleted, t = Node 5" },
  { line: 80, frames: ["main()"], vars: { "root": "Node(5, 80)" }, inlineVal: "printing inorder" },
  { line: 83, frames: ["main()"], vars: {}, inlineVal: "exit" }
];

export const data = {
  "presentation": `### Prezentare Generală

**Treap-ul** este o structură de date arborescentă echilibrată aleatoriu (un Arbore Binar de Căutare auto-echilibrat), care combină proprietățile unui **Arbore Binar de Căutare (BST)** și ale unui **Heap**. Numele său provine din combinarea cuvintelor **Tree** (Arbore) și **Heap**.

Fiecare nod din Treap are două valori asociate:
1. O **cheie** ($X$), care respectă proprietatea de BST: pentru orice nod, cheile din subarborele stâng sunt mai mici, iar cele din subarborele drept sunt mai mari.
2. O **prioritate** ($Y$), aleasă aleatoriu la inserare, care respectă proprietatea de Max-Heap: prioritatea oricărui nod este mai mare sau egală cu prioritățile fiilor săi.

Prin asocierea unor priorități complet aleatorii fiecărui nod, forma Treap-ului este echivalentă cu un BST în care cheile sunt inserate într-o ordine aleatorie. Acest lucru garantează că înălțimea medie a arborelui este $O(\\log N)$, evitând degenerarea într-o listă liniară în cazul în care datele de intrare sunt sortate.

Treap-ul se bazează pe două operații fundamentale:
- **Split (Împărțire):** Împărțirea unui Treap în doi subarbori în funcție de o cheie $K$ (unul cu chei $\\le K$, celălalt cu chei $> K$).
- **Merge (Îmbinare):** Unirea a doi subarbori (unde toate cheile primului sunt mai mici decât toate cheile celui de-al doilea) într-un singur Treap valid.`,

  "complexity": `### Complexitate

Datorită proprietăților statistice ale priorităților aleatorii, toate operațiile de bază pe Treap se execută în timp logaritmic cu probabilitate extrem de mare.

- **Timp (Mediu):**
  - Căutare (Search): $O(\\log N)$
  - Inserare (Insert): $O(\\log N)$
  - Ștergere (Erase): $O(\\log N)$
  - Împărțire (Split): $O(\\log N)$
  - Îmbinare (Merge): $O(\\log N)$
- **Timp (Cel mai rău caz):** $O(N)$ - dacă prioritățile generate aleatoriu sunt nefericite (probabilitate infimă, similar cu QuickSort-ul degenerat).
- **Spațiu:** $O(N)$ - stocăm exact $N$ noduri, fiecare având doi pointeri și valorile aferente.`,

  "variations": `### Variații și Edge Cases

1. **Treap Implicit (Implicit Treap):** Cheile nu mai sunt stocate explicit în noduri, ci sunt determinate de ordinea elementelor din tablou (indexul implicit). Permite operații pe intervale, cum ar fi inversarea unui subtablou în $O(\\log N)$ (folosit în rezolvarea problemelor gen "lazy propagation" pe tablouri dinamice).
2. **Treap Persistent:** Prin evitarea modificărilor directe și copierea nodurilor pe calea de actualizare, Treap-ul poate fi făcut persistent (putem interoga versiuni anterioare ale structurii în $O(\\log N)$).
3. **Rotations vs Split/Merge:** Unele implementări folosesc rotații clasice din BST la inserare/ștergere, dar implementarea bazată pe Split și Merge este mult mai scurtă, mai elegantă și mai puțin predispusă la bug-uri.`,

  "applications": `### Aplicații

- Implementarea structurilor dinamice de date (mulțimi ordonate, vectori dinamici cu inserări/ștergeri la orice index în $O(\\log N)$).
- Rezolvarea query-urilor pe intervale de lungime variabilă cu modificări structurale (inversări de intervale, mutări de subșiruri).
- Alternativă mai simplă la alte BST-uri echilibrate (cum ar fi Arborii Red-Black sau AVL) în concursuri de programare competitivă.`,

  "code": `#include <iostream>

using namespace std;

struct Node {
    int key;
    int priority;
    Node *left, *right;
    Node(int k, int p) : key(k), priority(p), left(nullptr), right(nullptr) {}
};

void split(Node* t, int key, Node*& l, Node*& r) {
    if (!t) {
        l = r = nullptr;
    } else if (t->key <= key) {
        split(t->right, key, t->right, r);
        l = t;
    } else {
        split(t->left, key, l, t->left);
        r = t;
    }
}

void merge(Node*& t, Node* l, Node* r) {
    if (!l || !r) {
        t = l ? l : r;
    } else if (l->priority > r->priority) {
        merge(l->right, l->right, r);
        t = l;
    } else {
        merge(r->left, l, r->left);
        t = r;
    }
}

void insert(Node*& t, Node* it) {
    if (!t) {
        t = it;
    } else if (it->priority > t->priority) {
        split(t, it->key, it->left, it->right);
        t = it;
    } else if (it->key < t->key) {
        insert(t->left, it);
    } else {
        insert(t->right, it);
    }
}

void erase(Node*& t, int key) {
    if (!t) return;
    if (t->key == key) {
        Node* temp = t;
        merge(t, t->left, t->right);
        delete temp;
    } else if (key < t->key) {
        erase(t->left, key);
    } else {
        erase(t->right, key);
    }
}

void printInorder(Node* t) {
    if (!t) return;
    printInorder(t->left);
    cout << "(" << t->key << ", " << t->priority << ") ";
    printInorder(t->right);
}

int main() {
    Node* root = nullptr;
    
    insert(root, new Node(5, 80));
    insert(root, new Node(3, 50));
    insert(root, new Node(8, 60));
    insert(root, new Node(4, 90));
    
    erase(root, 4);
    
    cout << "Parcurgere inordine: ";
    printInorder(root);
    cout << "\\n";
    
    return 0;
}`,

  "explanations": stepsData.map((step, idx) => ({
    "line": step.line,
    "text": step.text,
    "blocksVisual": [
      {
        "label": "Variabile active",
        "groups": [
          step.vars.length > 0 ? step.vars.map(v => ({
            "val": `${v[0]}: ${v[1]}`,
            "active": v[2]
          })) : [{ "val": "fără variabile locale", "active": false }]
        ]
      }
    ],
    "graphVisual": getGraphVisualInternal(idx)
  })),

  "problems": {
    "easy": [
      {
        "title": "Set în C++ (sau similar)",
        "url": "https://www.infoarena.ro/problema/abce",
        "desc": "Implementare de bază a unei mulțimi ordonate dinamice."
      }
    ],
    "medium": [
      {
        "title": "Treap implicit",
        "url": "https://www.infoarena.ro/problema/shm",
        "desc": "Operații de inserare și interogare pe poziții specifice."
      }
    ],
    "hard": [
      {
        "title": "Reversing on Interval",
        "url": "https://www.spoj.com/problems/ORDERSET/",
        "desc": "Utilizarea unui treap pentru a menține o mulțime ordonată cu indexare rapidă."
      }
    ]
  },

  "globalVars": [],

  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const step = trace[stepIndex] || trace[trace.length - 1];
      
      const vars = [];
      const globalVars = [];
      const frames = [];

      step.frames.forEach(frameName => {
        frames.push({ name: frameName, file: "solution.cpp", line: activeLine });
      });

      globalVars.push({ name: "root", type: "Node*", val: stepIndex <= 1 ? "nullptr" : "0x7ffee3c8a9d0", expandable: true });

      for (const [name, val] of Object.entries(step.vars)) {
        let type = "int";
        if (name === "root" || name === "t" || name === "l" || name === "r" || name === "temp" || name === "t->left" || name === "t->right") {
          type = "Node*";
        }
        vars.push({ name, type, val: val.toString(), expandable: false });
      }

      return { vars, globalVars, frames, inlineVal: step.inlineVal };
    },

    "getInlineValueForLine": (stepIndex, lineNum) => {
      const step = trace[stepIndex];
      if (!step) return null;
      
      if (lineNum === 15 && (stepIndex === 16 || stepIndex === 17)) {
        return `t->key = ${stepIndex === 16 ? 5 : 3}, key = 4`;
      }
      if (lineNum === 27 && stepIndex === 25) {
        return `l->priority = 50, r->priority = 80`;
      }
      if (lineNum === 39 && (stepIndex === 6 || stepIndex === 14)) {
        return `it->priority = ${stepIndex === 6 ? 50 : 90}, t->priority = 80`;
      }
      if (lineNum === 51 && stepIndex === 23) {
        return `t->key = 4, key = 4`;
      }
      if (lineNum === 70 && stepIndex === 0) {
        return `root = nullptr`;
      }
      return null;
    },

    "getGraphVisual": (stepIndex) => {
      return getGraphVisualInternal(stepIndex);
    }
  }
};
