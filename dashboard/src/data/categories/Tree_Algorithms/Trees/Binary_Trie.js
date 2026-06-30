const codeStr = `#include <iostream>
#include <vector>

using namespace std;

struct Node {
    int children[2];
};

vector<Node> trie;

void insert(int num) {
    int curr = 0;
    for (int i = 2; i >= 0; i--) {
        int bit = (num >> i) & 1;
        if (trie[curr].children[bit] == -1) {
            int next_node = trie.size();
            trie.push_back({-1, -1});
            trie[curr].children[bit] = next_node;
        }
        curr = trie[curr].children[bit];
    }
}

int query_max_xor(int num) {
    int curr = 0;
    int max_xor = 0;
    for (int i = 2; i >= 0; i--) {
        int bit = (num >> i) & 1;
        int opposite = 1 - bit;
        if (trie[curr].children[opposite] != -1) {
            max_xor |= (1 << i);
            curr = trie[curr].children[opposite];
        } else {
            curr = trie[curr].children[bit];
        }
    }
    return max_xor;
}

int main() {
    trie.push_back({-1, -1});
    insert(2);
    insert(5);
    int ans = query_max_xor(3);
    cout << "Max XOR: " << ans << endl;
    return 0;
}`;

const explanationsRaw = [
  { line: 41, text: "Începem execuția programului în funcția `main()`." },
  { line: 42, text: "Inițializăm vectorul `trie` prin adăugarea nodului rădăcină (indexul $0$) cu fiii neinițializați ($-1$)." },
  { line: 43, text: "Apelăm funcția `insert(2)` pentru a introduce valoarea 2 (reprezentată binar pe 3 biți ca fiind `010`)." },
  { line: 12, text: "Intrăm în funcția `insert` cu argumentul `num = 2`." },
  { line: 13, text: "Inițializăm pointerul nodului curent: `curr = 0` (începem căutarea/inserarea din rădăcină)." },
  { line: 14, text: "Începem bucla de iterare de la bitul cel mai semnificativ, `i = 2`." },
  { line: 15, text: "Determinăm valoarea bitului curent de pe poziția 2 a numărului 2: `bit = 0`." },
  { line: 16, text: "Verificăm dacă nodul curent $0$ are deja fiu pentru bitul 0: `trie[0].children[0] == -1`." },
  { line: 17, text: "Deoarece condiția este adevărată (nu există legătură), calculăm indexul următorului nod disponibil: `next_node = 1`." },
  { line: 18, text: "Adăugăm un nod gol în vectorul `trie` (nodul 1)." },
  { line: 19, text: "Creăm legătura de la nodul părinte $0$ la noul nod fiu $1$: `trie[0].children[0] = 1`." },
  { line: 21, text: "Coborâm în Trie la nodul fiu: `curr = 1`." },
  { line: 14, text: "Continuăm bucla pentru următorul bit, `i = 1`." },
  { line: 15, text: "Determinăm valoarea bitului curent de pe poziția 1: `bit = 1`." },
  { line: 16, text: "Verificăm dacă există fiul pentru bitul 1 la nodul 1: `trie[1].children[1] == -1`." },
  { line: 17, text: "Nu există fiu pentru bitul 1. Determinăm indexul noului nod: `next_node = 2`." },
  { line: 18, text: "Adăugăm noul nod $2$ în vectorul `trie`." },
  { line: 19, text: "Creăm legătura: `trie[1].children[1] = 2`." },
  { line: 21, text: "Coborâm la nodul fiu: `curr = 2`." },
  { line: 14, text: "Continuăm bucla pentru ultimul bit, cel mai puțin semnificativ: `i = 0`." },
  { line: 15, text: "Determinăm valoarea bitului de pe poziția 0: `bit = 0`." },
  { line: 16, text: "Verificăm dacă există fiul pentru bitul 0 la nodul 2: `trie[2].children[0] == -1`." },
  { line: 17, text: "Nu există. Noul nod primește indexul `next_node = 3`." },
  { line: 18, text: "Adăugăm nodul $3$ în vectorul `trie`." },
  { line: 19, text: "Creăm legătura: `trie[2].children[0] = 3`." },
  { line: 21, text: "Coborâm la nodul fiu: `curr = 3`." },
  { line: 23, text: "Bucla se termină. Ieșim din funcția `insert(2)`." },
  { line: 44, text: "Revenim în `main()` și apelăm `insert(5)` pentru a introduce valoarea 5 (reprezentată binar pe 3 biți ca fiind `101`)." },
  { line: 12, text: "Intrăm în funcția `insert` cu argumentul `num = 5`." },
  { line: 13, text: "Inițializăm pointerul nodului curent: `curr = 0` (reîncepem din rădăcină)." },
  { line: 14, text: "Începem iterarea prin biți de la `i = 2`." },
  { line: 15, text: "Determinăm bitul de pe poziția 2 a numărului 5: `bit = 1`." },
  { line: 16, text: "Verificăm dacă rădăcina are fiu pentru bitul 1: `trie[0].children[1] == -1`." },
  { line: 17, text: "Condiția este adevărată (nu există). Indexul noului nod este `next_node = 4`." },
  { line: 18, text: "Adăugăm noul nod $4$ în `trie`." },
  { line: 19, text: "Legăm rădăcina $0$ de noul nod fiu $4$: `trie[0].children[1] = 4`." },
  { line: 21, text: "Coborâm la nodul fiu: `curr = 4`." },
  { line: 14, text: "Continuăm bucla pentru următorul bit, `i = 1`." },
  { line: 15, text: "Determinăm bitul de pe poziția 1: `bit = 0`." },
  { line: 16, text: "Verificăm dacă nodul 4 are fiu pentru bitul 0: `trie[4].children[0] == -1`." },
  { line: 17, text: "Condiția este adevărată. Indexul noului nod este `next_node = 5`." },
  { line: 18, text: "Adăugăm nodul $5$ în `trie`." },
  { line: 19, text: "Creăm legătura: `trie[4].children[0] = 5`." },
  { line: 21, text: "Coborâm la nodul fiu: `curr = 5`." },
  { line: 14, text: "Continuăm bucla pentru ultimul bit, `i = 0`." },
  { line: 15, text: "Determinăm bitul de pe poziția 0: `bit = 1`." },
  { line: 16, text: "Verificăm dacă nodul 5 are fiu pentru bitul 1: `trie[5].children[1] == -1`." },
  { line: 17, text: "Condiția este adevărată. Noul nod primește indexul `next_node = 6`." },
  { line: 18, text: "Adăugăm nodul $6$ în `trie`." },
  { line: 19, text: "Creăm legătura: `trie[5].children[1] = 6`." },
  { line: 21, text: "Coborâm la nodul fiu: `curr = 6`." },
  { line: 23, text: "Bucla se încheie. Ieșim din funcția `insert(5)`." },
  { line: 45, text: "În `main()`, apelăm `query_max_xor(3)` pentru a găsi valoarea maximă a XOR-ului dintre 3 (`011`) și un element din Trie." },
  { line: 25, text: "Intrăm în funcția `query_max_xor` cu argumentul `num = 3`." },
  { line: 26, text: "Inițializăm pointerul nodului curent: `curr = 0`." },
  { line: 27, text: "Inițializăm rezultatul XOR maxim cu 0: `max_xor = 0`." },
  { line: 28, text: "Începem căutarea biților de la cel mai semnificativ, `i = 2`." },
  { line: 29, text: "Determinăm bitul curent al numărului 3 pe poziția 2: `bit = 0`." },
  { line: 30, text: "Pentru a maximiza XOR, avem nevoie de bitul opus: `opposite = 1`." },
  { line: 31, text: "Verificăm dacă există fiul corespunzător bitului opus 1 la nodul 0: `trie[0].children[1] != -1`." },
  { line: 32, text: "Deoarece nodul $4$ există ca fiu pentru bitul 1, putem alege această cale! Activăm bitul 2 în XOR: `max_xor = 4`." },
  { line: 33, text: "Coborâm în Trie pe ramura bitului opus: `curr = 4`." },
  { line: 28, text: "Trecem la următorul bit, `i = 1`." },
  { line: 29, text: "Determinăm bitul curent al numărului 3 pe poziția 1: `bit = 1`." },
  { line: 30, text: "Bitul opus căutat este: `opposite = 0`." },
  { line: 31, text: "Verificăm dacă există fiul pentru bitul opus 0 la nodul 4: `trie[4].children[0] != -1`." },
  { line: 32, text: "Fiul stâng (nodul $5$) există, deci mergem pe calea optimă. Adăugăm bitul 1 în XOR: `max_xor = 6`." },
  { line: 33, text: "Coborâm la nodul fiu: `curr = 5`." },
  { line: 28, text: "Trecem la ultimul bit, cel mai puțin semnificativ, `i = 0`." },
  { line: 29, text: "Bitul curent al numărului 3 pe poziția 0: `bit = 1`." },
  { line: 30, text: "Bitul opus căutat este: `opposite = 0`." },
  { line: 31, text: "Verificăm dacă există fiul pentru bitul opus 0 la nodul 5: `trie[5].children[0] != -1`." },
  { line: 35, text: "Condiția este falsă (nu există fiu pentru bitul 0). Suntem obligați să mergem pe ramura bitului identic 1: `curr = trie[5].children[1]` (nodul 6)." },
  { line: 38, text: "Bucla se încheie. Returnăm rezultatul calculat: `max_xor = 6`." },
  { line: 46, text: "Revenim în `main()` și afișăm rezultatul pe consolă: `Max XOR: 6` (obținut prin 3 XOR 5)." },
  { line: 47, text: "Programul se încheie cu succes." }
];

const getBlocksVisual = (stepIndex) => {
  const values = [];
  if (stepIndex >= 27) values.push({ val: "2 (010)", active: stepIndex < 52 });
  if (stepIndex >= 52) values.push({ val: "5 (101)", active: stepIndex < 52 || (stepIndex >= 52 && stepIndex < 74) });
  
  const groups = [values];
  
  if (stepIndex >= 52) {
    groups.push([
      { val: "Căutare XOR pentru: 3 (011)", active: stepIndex >= 52 && stepIndex < 74 }
    ]);
  }
  
  if (stepIndex >= 74) {
    groups.push([
      { val: "XOR Maxim = 6 (110)", active: true }
    ]);
  }
  
  return [
    {
      label: "Elemente în Trie și Operații",
      groups
    }
  ];
};

const explanations = explanationsRaw.map((item, index) => {
  return {
    line: item.line,
    text: item.text,
    blocksVisual: getBlocksVisual(index)
  };
});

const getTrieAtStep = (stepIndex) => {
  const nodes = [];
  if (stepIndex >= 1) {
    nodes.push({ children: [-1, -1] }); // root 0
  }
  if (stepIndex >= 9) {
    nodes.push({ children: [-1, -1] }); // node 1
  }
  if (stepIndex >= 16) {
    nodes.push({ children: [-1, -1] }); // node 2
  }
  if (stepIndex >= 23) {
    nodes.push({ children: [-1, -1] }); // node 3
  }
  
  if (stepIndex >= 10 && nodes[0]) nodes[0].children[0] = 1;
  if (stepIndex >= 17 && nodes[1]) nodes[1].children[1] = 2;
  if (stepIndex >= 24 && nodes[2]) nodes[2].children[0] = 3;
  
  if (stepIndex >= 34) {
    nodes.push({ children: [-1, -1] }); // node 4
  }
  if (stepIndex >= 41) {
    nodes.push({ children: [-1, -1] }); // node 5
  }
  if (stepIndex >= 48) {
    nodes.push({ children: [-1, -1] }); // node 6
  }
  
  if (stepIndex >= 35 && nodes[0]) nodes[0].children[1] = 4;
  if (stepIndex >= 42 && nodes[4]) nodes[4].children[0] = 5;
  if (stepIndex >= 49 && nodes[5]) nodes[5].children[1] = 6;
  
  return nodes;
};

const getStackAndVars = (stepIndex, activeLine) => {
  const frames = [];
  const vars = [];
  let inlineVal = "";
  
  if (stepIndex <= 2) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
  } else if (stepIndex >= 3 && stepIndex <= 26) {
    frames.push({ name: "insert(num = 2)", file: "main.cpp", line: activeLine });
    frames.push({ name: "main()", file: "main.cpp", line: 43 });
    
    vars.push({ name: "num", type: "int", val: 2, expandable: false });
    
    let currVal = 0;
    if (stepIndex >= 11 && stepIndex <= 17) currVal = 1;
    else if (stepIndex >= 18 && stepIndex <= 24) currVal = 2;
    else if (stepIndex >= 25) currVal = 3;
    
    vars.push({ name: "curr", type: "int", val: currVal, expandable: false });
    
    let iVal = -1;
    if (stepIndex >= 5 && stepIndex <= 11) iVal = 2;
    else if (stepIndex >= 12 && stepIndex <= 18) iVal = 1;
    else if (stepIndex >= 19 && stepIndex <= 25) iVal = 0;
    
    if (iVal !== -1) {
      vars.push({ name: "i", type: "int", val: iVal, expandable: false });
      inlineVal = `num: 2, curr: ${currVal}, i: ${iVal}`;
      
      let bitVal = -1;
      if (iVal === 2) bitVal = 0;
      else if (iVal === 1) bitVal = 1;
      else if (iVal === 0) bitVal = 0;
      
      if (activeLine >= 15 && bitVal !== -1) {
        vars.push({ name: "bit", type: "int", val: bitVal, expandable: false });
        inlineVal += `, bit: ${bitVal}`;
      }
    }
  } else if (stepIndex === 27) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
  } else if (stepIndex >= 28 && stepIndex <= 51) {
    frames.push({ name: "insert(num = 5)", file: "main.cpp", line: activeLine });
    frames.push({ name: "main()", file: "main.cpp", line: 44 });
    
    vars.push({ name: "num", type: "int", val: 5, expandable: false });
    
    let currVal = 0;
    if (stepIndex >= 36 && stepIndex <= 42) currVal = 4;
    else if (stepIndex >= 43 && stepIndex <= 49) currVal = 5;
    else if (stepIndex >= 50) currVal = 6;
    
    vars.push({ name: "curr", type: "int", val: currVal, expandable: false });
    
    let iVal = -1;
    if (stepIndex >= 30 && stepIndex <= 36) iVal = 2;
    else if (stepIndex >= 37 && stepIndex <= 43) iVal = 1;
    else if (stepIndex >= 44 && stepIndex <= 50) iVal = 0;
    
    if (iVal !== -1) {
      vars.push({ name: "i", type: "int", val: iVal, expandable: false });
      inlineVal = `num: 5, curr: ${currVal}, i: ${iVal}`;
      
      let bitVal = -1;
      if (iVal === 2) bitVal = 1;
      else if (iVal === 1) bitVal = 0;
      else if (iVal === 0) bitVal = 1;
      
      if (activeLine >= 15 && bitVal !== -1) {
        vars.push({ name: "bit", type: "int", val: bitVal, expandable: false });
        inlineVal += `, bit: ${bitVal}`;
      }
    }
  } else if (stepIndex === 52) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
  } else if (stepIndex >= 53 && stepIndex <= 73) {
    frames.push({ name: "query_max_xor(num = 3)", file: "main.cpp", line: activeLine });
    frames.push({ name: "main()", file: "main.cpp", line: 45 });
    
    vars.push({ name: "num", type: "int", val: 3, expandable: false });
    
    let currVal = 0;
    if (stepIndex >= 61 && stepIndex <= 66) currVal = 4;
    else if (stepIndex >= 67 && stepIndex <= 71) currVal = 5;
    else if (stepIndex >= 72) currVal = 6;
    
    vars.push({ name: "curr", type: "int", val: currVal, expandable: false });
    
    let maxXor = 0;
    if (stepIndex >= 60 && stepIndex <= 65) maxXor = 4;
    else if (stepIndex >= 66) maxXor = 6;
    
    vars.push({ name: "max_xor", type: "int", val: maxXor, expandable: false });
    
    let iVal = -1;
    if (stepIndex >= 56 && stepIndex <= 61) iVal = 2;
    else if (stepIndex >= 62 && stepIndex <= 67) iVal = 1;
    else if (stepIndex >= 68 && stepIndex <= 72) iVal = 0;
    
    if (iVal !== -1) {
      vars.push({ name: "i", type: "int", val: iVal, expandable: false });
      inlineVal = `num: 3, curr: ${currVal}, max_xor: ${maxXor}, i: ${iVal}`;
      
      let bitVal = -1;
      if (iVal === 2) bitVal = 0;
      else if (iVal === 1) bitVal = 1;
      else if (iVal === 0) bitVal = 1;
      
      if (activeLine >= 29 && bitVal !== -1) {
        vars.push({ name: "bit", type: "int", val: bitVal, expandable: false });
        vars.push({ name: "opposite", type: "int", val: 1 - bitVal, expandable: false });
        inlineVal += `, bit: ${bitVal}, opp: ${1 - bitVal}`;
      }
    } else {
      inlineVal = `max_xor: ${maxXor}`;
    }
  } else if (stepIndex >= 74) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
    vars.push({ name: "ans", type: "int", val: 6, expandable: false });
    inlineVal = "ans: 6";
  }
  
  return { frames, vars, inlineVal };
};

const getPathToNode = (currVal) => {
  if (currVal === 0) return [0];
  if (currVal === 1) return [0, 1];
  if (currVal === 2) return [0, 1, 2];
  if (currVal === 3) return [0, 1, 2, 3];
  if (currVal === 4) return [0, 4];
  if (currVal === 5) return [0, 4, 5];
  if (currVal === 6) return [0, 4, 5, 6];
  return [];
};

export const data = {
  presentation: `### Binary Trie (Trie Binar)

Un Trie binar este o structură de date arborescentă eficientă utilizată pentru stocarea și interogarea numerelor întregi pe baza reprezentării lor binare. Fiecare nod din trie binar are maximum doi fii, corespunzători bitului 0 (ramura stângă) și bitului 1 (ramura dreaptă). Un drum de la rădăcină până la o frunză reprezintă scrierea în baza 2 a unui număr întreg.

Trie-ul binar este utilizat frecvent în probleme legate de operații pe biți, cum ar fi găsirea valorii maxime a operației XOR între un număr dat și elementele stocate. Căutarea valorii maxime XOR se face prin parcurgerea leneșă (greedy) a trie-ului: la fiecare pas, încercăm să alegem ramura corespunzătoare bitului opus bitului curent al numărului căutat. Dacă această ramură există, o urmăm, garantând obținerea unui bit de 1 în rezultatul final XOR. În caz contrar, suntem forțați să urmăm ramura corespunzătoare aceluiași bit.`,

  complexity: `### Complexitate

- **Timp:**
  - **Inserare:** $O(B)$ - unde $B$ este numărul de biți ai tipului de date (de exemplu, $B = 32$ pentru numere pe 32 de biți).
  - **Interogare XOR Maxim:** $O(B)$ - se parcurge o singură cale de la rădăcină la frunză.
- **Spațiu:** $O(N \\cdot B)$ - unde $N$ este numărul de elemente inserate, deoarece fiecare element adaugă cel mult $B$ noduri noi în Trie.`,

  variations: `### Variații și Cazuri Particulare

- **Trie Binar cu numărare (Multi-trie):** Stocarea numărului de apariții ale fiecărui prefix în noduri. Această variație permite ștergerea elementelor din Trie și găsirea celui de-al $K$-lea cel mai mic element sau a numărului de elemente mai mici decât o valoare dată care au XOR-ul cu o cheie mai mic decât un prag $Y$.
- **Trie pe biți variabili:** Pentru a economisi spațiu, se pot procesa doar biții semnificativi ai numerelor sau se pot folosi pointeri inteligenți.`,

  applications: `### Aplicații Reale

- **Maximum XOR Subarray:** Găsirea unei subsecvențe dintr-un vector care are suma XOR maximă, problemă rezolvată în $O(N \\log U)$ folosind sume XOR parțiale și un Trie Binar.
- **Protocoale de rutare IP:** Căutarea prefixului cel mai lung (longest prefix match) în rutarea pachetelor IP în rețele de calculatoare.
- **Algoritmi de criptografie:** Analiza și stocarea cheilor binare pentru operații rapide de potrivire.`,

  code: codeStr,

  explanations: explanations,

  problems: {
    easy: [
      {
        title: "Subarray XOR (LeetCode 421)",
        url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
        desc: "Găsirea valorii maxime a XOR-ului dintre două numere dintr-un vector folosind Binary Trie."
      }
    ],
    medium: [
      {
        title: "Xor sum (Infoarena xorsum)",
        url: "https://www.infoarena.ro/problema/xorsum",
        desc: "Determinarea subsecvenței cu suma XOR maximă dintr-un vector utilizând Trie Binar."
      },
      {
        title: "XOR-MST (Codeforces 888G)",
        url: "https://codeforces.com/problemset/problem/888/G",
        desc: "Găsirea arborelui parțial de cost minim pe un graf complet unde costul muchiei (u, v) este u XOR v, folosind Trie Binar."
      }
    ],
    hard: [
      {
        title: "Beautiful Subarrays (Codeforces 665E)",
        url: "https://codeforces.com/problemset/problem/665/E",
        desc: "Determinarea numărului de subsecvențe cu suma XOR cel puțin egală cu K folosind un Trie Binar cu numărare."
      }
    ]
  },

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const { frames, vars, inlineVal } = getStackAndVars(stepIndex, activeLine);
      const globalVars = [];
      
      const trieState = getTrieAtStep(stepIndex);
      globalVars.push({
        name: "trie",
        type: "std::vector<Node>",
        val: `size = ${trieState.length}`,
        expandable: true
      });
      
      trieState.forEach((node, idx) => {
        globalVars.push({
          name: `trie[${idx}]`,
          type: "Node",
          val: `{ children: [${node.children[0]}, ${node.children[1]}] }`,
          expandable: false
        });
      });
      
      return { vars, globalVars, frames, inlineVal };
    },
    
    getInlineValueForLine: (stepIndex, lineNum) => {
      const { inlineVal, frames } = getStackAndVars(stepIndex, explanations[stepIndex].line);
      
      if (lineNum === explanations[stepIndex].line) {
        return inlineVal;
      }
      return null;
    },
    
    getGraphVisual: (stepIndex) => {
      const trieState = getTrieAtStep(stepIndex);
      const activeLine = explanations[stepIndex].line;
      const stackInfo = getStackAndVars(stepIndex, activeLine);
      
      const currVal = stackInfo.vars.find(v => v.name === "curr")?.val ?? -1;
      
      const path = getPathToNode(currVal);
      const activeNodeId = currVal;
      const visitedNodeIds = path.filter(id => id !== currVal);

      const staticNodes = [
        { id: "0", x: 200, y: 50, label: "R" },
        { id: "1", x: 100, y: 120, label: "0" },
        { id: "4", x: 300, y: 120, label: "1" },
        
        { id: "2", x: 150, y: 190, label: "1" },
        { id: "5", x: 250, y: 190, label: "0" },
        
        { id: "3", x: 100, y: 260, label: "0" },
        { id: "6", x: 300, y: 260, label: "1" }
      ];

      const staticEdges = [
        { source: "0", target: "1" },
        { source: "0", target: "4" },
        
        { source: "1", target: "2" },
        { source: "4", target: "5" },
        
        { source: "2", target: "3" },
        { source: "5", target: "6" }
      ];

      const visibleNodes = [];
      staticNodes.forEach(n => {
        const idNum = parseInt(n.id);
        if (idNum < trieState.length) {
          let state = undefined;
          if (idNum === activeNodeId) state = "active";
          else if (visitedNodeIds.includes(idNum)) state = "visited";
          
          visibleNodes.push({
            id: n.id,
            x: n.x,
            y: n.y,
            label: n.label,
            desc: `Nod ${n.id}`,
            state
          });
        }
      });

      const visibleEdges = [];
      staticEdges.forEach(e => {
        const src = parseInt(e.source);
        const dest = parseInt(e.target);
        if (src < trieState.length && dest < trieState.length) {
          let active = false;
          for (let i = 0; i < path.length - 1; i++) {
            const u = path[i];
            const v = path[i+1];
            if ((u === src && v === dest) || (u === dest && v === src)) {
              active = true;
              break;
            }
          }
          
          visibleEdges.push({
            source: e.source,
            target: e.target,
            active
          });
        }
      });

      return {
        directed: true,
        title: "Binary Trie Structură",
        nodes: visibleNodes,
        edges: visibleEdges
      };
    }
  }
};
