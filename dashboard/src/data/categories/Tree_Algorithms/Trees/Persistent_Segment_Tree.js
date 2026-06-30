const codeStr = `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Node {
    int sum;
    int left, right;
};

vector<Node> tree;

int build(int tl, int tr) {
    int id = tree.size();
    tree.push_back({0, -1, -1});
    if (tl == tr) {
        return id;
    }
    int tm = (tl + tr) / 2;
    int left_child = build(tl, tm);
    int right_child = build(tm + 1, tr);
    tree[id].left = left_child;
    tree[id].right = right_child;
    return id;
}

int update(int prev_id, int tl, int tr, int pos, int val) {
    int id = tree.size();
    tree.push_back(tree[prev_id]);
    if (tl == tr) {
        tree[id].sum += val;
        return id;
    }
    int tm = (tl + tr) / 2;
    if (pos <= tm) {
        int left_child = update(tree[prev_id].left, tl, tm, pos, val);
        tree[id].left = left_child;
    } else {
        int right_child = update(tree[prev_id].right, tm + 1, tr, pos, val);
        tree[id].right = right_child;
    }
    tree[id].sum = tree[tree[id].left].sum + tree[tree[id].right].sum;
    return id;
}

int query(int id, int tl, int tr, int l, int r) {
    if (l > r) return 0;
    if (tl == l && tr == r) {
        return tree[id].sum;
    }
    int tm = (tl + tr) / 2;
    return query(tree[id].left, tl, tm, l, min(r, tm)) +
           query(tree[id].right, tm + 1, tr, max(l, tm + 1), r);
}

int main() {
    int root0 = build(0, 3);
    int root1 = update(root0, 0, 3, 2, 5);
    int res = query(root1, 0, 3, 1, 3);
    cout << "Suma: " << res << endl;
    return 0;
}`;

const explanationsRaw = [
  { line: 58, text: "Începem execuția programului în `main()` prin construirea arborelui de intervale inițial (versiunea 0) pe intervalul $[0, 3]$." },
  { line: 14, text: "Intrăm în funcția `build(tl = 0, tr = 3)` pentru a crea rădăcina arborelui pe intervalul $[0, 3]$." },
  { line: 15, text: "Determinăm indexul noului nod: `id = 0` (dimensiunea curentă a vectorului `tree`)." },
  { line: 16, text: "Adăugăm nodul $0$ în vectorul `tree` cu suma $0$ și copii stâng/drept neinițializați ($-1$)." },
  { line: 20, text: "Calculăm mijlocul intervalului: `tm = 1`." },
  { line: 21, text: "Apelăm recursiv `build(0, 1)` pentru a construi subarborele stâng." },
  { line: 14, text: "Intrăm în `build(tl = 0, tr = 1)` pentru subarborele stâng." },
  { line: 15, text: "Noul nod primește indexul `id = 1`." },
  { line: 16, text: "Adăugăm nodul $1$ în vectorul `tree` cu suma inițială $0$." },
  { line: 20, text: "Calculăm mijlocul intervalului $[0, 1]$: `tm = 0`." },
  { line: 21, text: "Apelăm recursiv `build(0, 0)` pentru fiul stâng al nodului $1$." },
  { line: 14, text: "Intrăm în `build(tl = 0, tr = 0)`." },
  { line: 15, text: "Acesta primește indexul `id = 2`." },
  { line: 16, text: "Adăugăm nodul $2$ în vectorul `tree`." },
  { line: 17, text: "Verificăm dacă intervalul are lungimea 1 ($tl == tr$). Condiția este adevărată." },
  { line: 18, text: "Returnăm indexul `id = 2` către părintele său (nodul 1)." },
  { line: 22, text: "Revenim în `build(0, 1)`. Apelăm recursiv `build(1, 1)` pentru fiul drept." },
  { line: 14, text: "Intrăm în `build(tl = 1, tr = 1)`." },
  { line: 15, text: "Nodul primește indexul `id = 3`." },
  { line: 16, text: "Adăugăm nodul $3$ în vectorul `tree`." },
  { line: 17, text: "Avem din nou o frunză ($tl == tr == 1$)." },
  { line: 18, text: "Returnăm indexul `id = 3` către părintele său (nodul 1)." },
  { line: 23, text: "Setăm fiul stâng al nodului $1$ la indexul returnat: `left = 2`." },
  { line: 24, text: "Setăm fiul drept al nodului $1$ la indexul returnat: `right = 3`." },
  { line: 25, text: "Returnăm indexul nodului actualizat: `id = 1` către rădăcină (nodul 0)." },
  { line: 22, text: "Revenim în `build(0, 3)`. Apelăm recursiv `build(2, 3)` pentru a construi subarborele drept." },
  { line: 14, text: "Intrăm în `build(tl = 2, tr = 3)`." },
  { line: 15, text: "Nodul primește indexul `id = 4`." },
  { line: 16, text: "Adăugăm nodul $4$ în vectorul `tree` cu suma $0$." },
  { line: 20, text: "Calculăm mijlocul: `tm = 2`." },
  { line: 21, text: "Apelăm recursiv `build(2, 2)` pentru fiul stâng al nodului $4$." },
  { line: 14, text: "Intrăm în `build(tl = 2, tr = 2)` (frunză, index `id = 5`)." },
  { line: 17, text: "Verificăm frunza: intervalul este $[2, 2]$, deci condiția $tl == tr$ este adevărată." },
  { line: 18, text: "Returnăm indexul `id = 5` către nodul $4$." },
  { line: 22, text: "Revenim în `build(2, 3)`. Apelăm recursiv `build(3, 3)` pentru fiul drept." },
  { line: 14, text: "Intrăm în `build(tl = 3, tr = 3)` (frunză, index `id = 6`)." },
  { line: 17, text: "Verificăm condiția de oprire pe frunză pentru $[3, 3]$." },
  { line: 18, text: "Returnăm indexul `id = 6` către nodul $4$." },
  { line: 23, text: "Setăm fiul stâng al nodului $4$ la indexul returnat: `left = 5`." },
  { line: 24, text: "Setăm fiul drept al nodului $4$ la indexul returnat: `right = 6`." },
  { line: 25, text: "Returnăm indexul subarborelui drept: `id = 4` către rădăcină (nodul 0)." },
  { line: 23, text: "Setăm fiul stâng al rădăcinii $0$ la indexul returnat: `left = 1`." },
  { line: 24, text: "Setăm fiul drept al rădăcinii $0$ la indexul returnat: `right = 4`." },
  { line: 25, text: "Returnăm rădăcina `id = 0`. Construcția versiunii 0 s-a finalizat." },
  { line: 59, text: "Apelăm `update(root0, 0, 3, 2, 5)` pentru a genera versiunea 1 (adăugăm 5 pe poziția 2)." },
  { line: 28, text: "Intrăm în funcția `update` cu `prev_id = 0`, interval $[0, 3]$, poziția $pos = 2$ și valoarea $val = 5$." },
  { line: 29, text: "Determinăm indexul noului nod creat prin persistență: `id = 7`." },
  { line: 30, text: "Copiem complet datele din vechiul nod `tree[0]` în noul nod $7$ pentru a păstra legăturile nevătămate." },
  { line: 31, text: "Verificăm dacă suntem pe o frunză ($tl == tr$). Condiția este falsă pentru $[0, 3]$." },
  { line: 35, text: "Calculăm mijlocul intervalului curent: `tm = 1`." },
  { line: 36, text: "Verificăm dacă poziția modificată este în subarborele stâng ($pos \\le tm$)." },
  { line: 39, text: "Deoarece $pos = 2 > 1$, mergem pe ramura dreaptă (else)." },
  { line: 40, text: "Apelăm recursiv `update` pentru subarborele drept: `update(tree[0].right (4), 2, 3, 2, 5)`." },
  { line: 28, text: "Intrăm în `update` pentru nodul $4$, pe intervalul $[2, 3]$." },
  { line: 29, text: "Noul nod creat primește indexul `id = 8`." },
  { line: 30, text: "Copiem structura nodului $4$ în nodul $8$." },
  { line: 35, text: "Calculăm mijlocul intervalului $[2, 3]$: `tm = 2`." },
  { line: 36, text: "Deoarece $pos = 2 \\le tm = 2$, direcția de actualizare este stânga." },
  { line: 37, text: "Apelăm recursiv `update` pe fiul stâng: `update(tree[4].left (5), 2, 2, 2, 5)`." },
  { line: 28, text: "Intrăm în `update` pe nodul frunză $5$, pe intervalul $[2, 2]$." },
  { line: 29, text: "Noul nod creat pentru frunză primește indexul `id = 9`." },
  { line: 30, text: "Copiem structura nodului $5$ în nodul $9$." },
  { line: 31, text: "Verificăm frunza: $tl == tr$ este adevărat ($2 == 2$)." },
  { line: 32, text: "Actualizăm valoarea frunzei: `tree[9].sum += 5`, deci suma devine $5$." },
  { line: 33, text: "Returnăm indexul noului nod frunză: `id = 9`." },
  { line: 38, text: "Revenim în nodul $8$. Actualizăm legătura fiului stâng: `left = 9` (indică spre noul nod creat)." },
  { line: 43, text: "Recalculăm suma nodului $8$: `tree[9].sum (5) + tree[6].sum (0) = 5`." },
  { line: 44, text: "Returnăm indexul noului nod: `id = 8`." },
  { line: 41, text: "Revenim în rădăcina versiunii 1 (nodul $7$). Actualizăm legătura fiului drept: `right = 8`." },
  { line: 43, text: "Recalculăm suma nodului rădăcină $7$: `tree[1].sum (0) + tree[8].sum (5) = 5`." },
  { line: 44, text: "Returnăm indexul rădăcinii versiunii 1: `id = 7`." },
  { line: 60, text: "Apelăm `query(root1, 0, 3, 1, 3)` pe versiunea 1 pentru a calcula suma pe intervalul $[1, 3]$." },
  { line: 47, text: "Intrăm în `query` pe nodul $7$, cu intervalul nodului $[0, 3]$ și intervalul de interogare $[1, 3]$." },
  { line: 48, text: "Verificăm dacă intervalul de interogare este invalid ($l > r$). Condiția $1 > 3$ este falsă." },
  { line: 49, text: "Verificăm dacă intervalul de căutare coincide perfect cu cel al nodului. Nu coincide ($[0, 3] \\neq [1, 3]$)." },
  { line: 52, text: "Calculăm mijlocul intervalului nodului curent: `tm = 1`." },
  { line: 53, text: "Interogăm recursiv subarborele stâng: `query(tree[7].left (1), 0, 1, 1, min(3, 1) = 1)`." },
  { line: 47, text: "Intrăm în `query` pe nodul $1$ (pe intervalul $[0, 1]$) căutând $[1, 1]$." },
  { line: 52, text: "Calculăm mijlocul intervalului: `tm = 0`." },
  { line: 53, text: "Interogăm fiul stâng $[1, 0]$ (obținem $0$) și fiul drept `query(tree[1].right (3), 1, 1, 1, 1)`." },
  { line: 47, text: "Intrăm în `query` pe nodul $3$, pe intervalul $[1, 1]$, căutând $[1, 1]$." },
  { line: 49, text: "Verificăm dacă intervalele coincid. Da, ambele sunt $[1, 1]$." },
  { line: 50, text: "Returnăm valoarea sumei stocate în nodul $3$, adică $0$." },
  { line: 54, text: "Revenim în apelul rădăcinii $7$. Acum interogăm subarborele drept: `query(tree[7].right (8), 2, 3, max(1, 2) = 2, 3)`." },
  { line: 47, text: "Intrăm în `query` pe nodul $8$ pe intervalul $[2, 3]$, căutând $[2, 3]$." },
  { line: 49, text: "Deoarece intervalul nodului coincide exact cu intervalul de căutare $[2, 3]$, returnăm suma." },
  { line: 50, text: "Suma nodului $8$ este $5$, deci returnăm $5$." },
  { line: 61, text: "Revenim în `main()` și afișăm rezultatul final: `Suma: 5`." },
  { line: 62, text: "Programul se încheie, returnând 0." }
];

const getBlocksVisual = (stepIndex) => {
  const isUpdate = (stepIndex >= 44 && stepIndex <= 70);
  const isQuery = (stepIndex >= 71 && stepIndex <= 86);
  const val2 = stepIndex >= 63 ? "5" : "0";
  return [
    {
      label: "Vectorul logic (A)",
      groups: [
        [
          { val: "0", active: false },
          { val: "0", active: isQuery },
          { val: val2, active: isUpdate || isQuery },
          { val: "0", active: isQuery }
        ]
      ]
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

const getTreeAtStep = (stepIndex) => {
  const tree = [];
  if (stepIndex >= 3) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  if (stepIndex >= 8) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  if (stepIndex >= 13) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  if (stepIndex >= 19) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  
  if (stepIndex >= 22 && tree[1]) {
    tree[1].left = 2;
  }
  if (stepIndex >= 23 && tree[1]) {
    tree[1].right = 3;
  }
  
  if (stepIndex >= 28) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  if (stepIndex >= 33) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  if (stepIndex >= 37) {
    tree.push({ sum: 0, left: -1, right: -1 });
  }
  
  if (stepIndex >= 38 && tree[4]) {
    tree[4].left = 5;
  }
  if (stepIndex >= 39 && tree[4]) {
    tree[4].right = 6;
  }
  
  if (stepIndex >= 41 && tree[0]) {
    tree[0].left = 1;
  }
  if (stepIndex >= 42 && tree[0]) {
    tree[0].right = 4;
  }
  
  // update phase
  if (stepIndex >= 47) {
    tree.push({ ...tree[0] });
  }
  if (stepIndex >= 55) {
    tree.push({ ...tree[4] });
  }
  if (stepIndex >= 61) {
    tree.push({ ...tree[5] });
  }
  
  if (stepIndex >= 63 && tree[9]) {
    tree[9].sum += 5;
  }
  if (stepIndex >= 65 && tree[8]) {
    tree[8].left = 9;
  }
  if (stepIndex >= 66 && tree[8]) {
    tree[8].sum = tree[9].sum + tree[6].sum; // 5 + 0 = 5
  }
  if (stepIndex >= 68 && tree[7]) {
    tree[7].right = 8;
  }
  if (stepIndex >= 69 && tree[7]) {
    tree[7].sum = tree[1].sum + tree[8].sum; // 0 + 5 = 5
  }
  return tree;
};

const getStackAndVars = (stepIndex, activeLine) => {
  const frames = [];
  const vars = [];
  let inlineVal = "";
  
  if (stepIndex === 0) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
  } else if (stepIndex >= 1 && stepIndex <= 43) {
    // build phase
    const buildFrames = [];
    const addBuildFrame = (tl, tr, line) => {
      buildFrames.push({ name: `build(tl = ${tl}, tr = ${tr})`, file: "main.cpp", line });
    };
    
    if (stepIndex >= 1 && stepIndex <= 5) {
      addBuildFrame(0, 3, activeLine);
    } else if (stepIndex >= 6 && stepIndex <= 10) {
      addBuildFrame(0, 1, activeLine);
      addBuildFrame(0, 3, 21);
    } else if (stepIndex >= 11 && stepIndex <= 15) {
      addBuildFrame(0, 0, activeLine);
      addBuildFrame(0, 1, 21);
      addBuildFrame(0, 3, 21);
    } else if (stepIndex === 16) {
      addBuildFrame(0, 1, activeLine);
      addBuildFrame(0, 3, 21);
    } else if (stepIndex >= 17 && stepIndex <= 21) {
      addBuildFrame(1, 1, activeLine);
      addBuildFrame(0, 1, 22);
      addBuildFrame(0, 3, 21);
    } else if (stepIndex >= 22 && stepIndex <= 24) {
      addBuildFrame(0, 1, activeLine);
      addBuildFrame(0, 3, 21);
    } else if (stepIndex === 25) {
      addBuildFrame(0, 3, activeLine);
    } else if (stepIndex >= 26 && stepIndex <= 30) {
      addBuildFrame(2, 3, activeLine);
      addBuildFrame(0, 3, 22);
    } else if (stepIndex >= 31 && stepIndex <= 33) {
      addBuildFrame(2, 2, activeLine);
      addBuildFrame(2, 3, 21);
      addBuildFrame(0, 3, 22);
    } else if (stepIndex === 34) {
      addBuildFrame(2, 3, activeLine);
      addBuildFrame(0, 3, 22);
    } else if (stepIndex >= 35 && stepIndex <= 37) {
      addBuildFrame(3, 3, activeLine);
      addBuildFrame(2, 3, 22);
      addBuildFrame(0, 3, 22);
    } else if (stepIndex >= 38 && stepIndex <= 40) {
      addBuildFrame(2, 3, activeLine);
      addBuildFrame(0, 3, 22);
    } else if (stepIndex >= 41 && stepIndex <= 43) {
      addBuildFrame(0, 3, activeLine);
    }
    
    buildFrames.push({ name: "main()", file: "main.cpp", line: 58 });
    frames.push(...buildFrames);
    
    const top = buildFrames[0];
    const match = top.name.match(/tl = (\d+), tr = (\d+)/);
    if (match) {
      const tl = parseInt(match[1]);
      const tr = parseInt(match[2]);
      vars.push({ name: "tl", type: "int", val: tl, expandable: false });
      vars.push({ name: "tr", type: "int", val: tr, expandable: false });
      inlineVal = `tl: ${tl}, tr: ${tr}`;
      
      let idVal = -1;
      if (tl === 0 && tr === 3) idVal = 0;
      else if (tl === 0 && tr === 1) idVal = 1;
      else if (tl === 0 && tr === 0) idVal = 2;
      else if (tl === 1 && tr === 1) idVal = 3;
      else if (tl === 2 && tr === 3) idVal = 4;
      else if (tl === 2 && tr === 2) idVal = 5;
      else if (tl === 3 && tr === 3) idVal = 6;
      
      if (idVal !== -1 && activeLine >= 15) {
        vars.push({ name: "id", type: "int", val: idVal, expandable: false });
        inlineVal += `, id: ${idVal}`;
      }
      
      if (activeLine >= 20 && tl < tr) {
        const tm = Math.floor((tl + tr) / 2);
        vars.push({ name: "tm", type: "int", val: tm, expandable: false });
        inlineVal += `, tm: ${tm}`;
      }
    }
  } else if (stepIndex === 44) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
    vars.push({ name: "root0", type: "int", val: 0, expandable: false });
    inlineVal = "root0: 0";
  } else if (stepIndex >= 45 && stepIndex <= 70) {
    // update phase
    const updateFrames = [];
    const addUpdateFrame = (prev_id, tl, tr, pos, val, line) => {
      updateFrames.push({ name: `update(prev_id = ${prev_id}, tl = ${tl}, tr = ${tr}, pos = ${pos}, val = ${val})`, file: "main.cpp", line });
    };
    
    if (stepIndex >= 45 && stepIndex <= 52) {
      addUpdateFrame(0, 0, 3, 2, 5, activeLine);
    } else if (stepIndex >= 53 && stepIndex <= 58) {
      addUpdateFrame(4, 2, 3, 2, 5, activeLine);
      addUpdateFrame(0, 0, 3, 2, 5, 40);
    } else if (stepIndex >= 59 && stepIndex <= 64) {
      addUpdateFrame(5, 2, 2, 2, 5, activeLine);
      addUpdateFrame(4, 2, 3, 2, 5, 37);
      addUpdateFrame(0, 0, 3, 2, 5, 40);
    } else if (stepIndex >= 65 && stepIndex <= 67) {
      addUpdateFrame(4, 2, 3, 2, 5, activeLine);
      addUpdateFrame(0, 0, 3, 2, 5, 40);
    } else if (stepIndex >= 68 && stepIndex <= 70) {
      addUpdateFrame(0, 0, 3, 2, 5, activeLine);
    }
    
    updateFrames.push({ name: "main()", file: "main.cpp", line: 59 });
    frames.push(...updateFrames);
    
    const top = updateFrames[0];
    const match = top.name.match(/prev_id = (\d+), tl = (\d+), tr = (\d+), pos = (\d+), val = (\d+)/);
    if (match) {
      const prev_id = parseInt(match[1]);
      const tl = parseInt(match[2]);
      const tr = parseInt(match[3]);
      const pos = parseInt(match[4]);
      const val = parseInt(match[5]);
      
      vars.push({ name: "prev_id", type: "int", val: prev_id, expandable: false });
      vars.push({ name: "tl", type: "int", val: tl, expandable: false });
      vars.push({ name: "tr", type: "int", val: tr, expandable: false });
      vars.push({ name: "pos", type: "int", val: pos, expandable: false });
      vars.push({ name: "val", type: "int", val: val, expandable: false });
      
      inlineVal = `prev_id: ${prev_id}, tl: ${tl}, tr: ${tr}, pos: ${pos}`;
      
      let idVal = -1;
      if (prev_id === 0) idVal = 7;
      else if (prev_id === 4) idVal = 8;
      else if (prev_id === 5) idVal = 9;
      
      if (idVal !== -1 && activeLine >= 29) {
        vars.push({ name: "id", type: "int", val: idVal, expandable: false });
        inlineVal += `, id: ${idVal}`;
      }
      
      if (activeLine >= 35 && tl < tr) {
        const tm = Math.floor((tl + tr) / 2);
        vars.push({ name: "tm", type: "int", val: tm, expandable: false });
        inlineVal += `, tm: ${tm}`;
      }
    }
  } else if (stepIndex === 71) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
    vars.push({ name: "root0", type: "int", val: 0, expandable: false });
    vars.push({ name: "root1", type: "int", val: 7, expandable: false });
    inlineVal = "root1: 7";
  } else if (stepIndex >= 72 && stepIndex <= 86) {
    // query phase
    const queryFrames = [];
    const addQueryFrame = (id, tl, tr, l, r, line) => {
      queryFrames.push({ name: `query(id = ${id}, tl = ${tl}, tr = ${tr}, l = ${l}, r = ${r})`, file: "main.cpp", line });
    };
    
    if (stepIndex >= 72 && stepIndex <= 76) {
      addQueryFrame(7, 0, 3, 1, 3, activeLine);
    } else if (stepIndex >= 77 && stepIndex <= 79) {
      addQueryFrame(1, 0, 1, 1, 1, activeLine);
      addQueryFrame(7, 0, 3, 1, 3, 53);
    } else if (stepIndex >= 80 && stepIndex <= 82) {
      addQueryFrame(3, 1, 1, 1, 1, activeLine);
      addQueryFrame(1, 0, 1, 1, 1, 53);
      addQueryFrame(7, 0, 3, 1, 3, 53);
    } else if (stepIndex === 83) {
      addQueryFrame(7, 0, 3, 1, 3, activeLine);
    } else if (stepIndex >= 84 && stepIndex <= 86) {
      addQueryFrame(8, 2, 3, 2, 3, activeLine);
      addQueryFrame(7, 0, 3, 1, 3, 54);
    }
    
    queryFrames.push({ name: "main()", file: "main.cpp", line: 60 });
    frames.push(...queryFrames);
    
    const top = queryFrames[0];
    const match = top.name.match(/id = (\d+), tl = (\d+), tr = (\d+), l = (\d+), r = (\d+)/);
    if (match) {
      const id = parseInt(match[1]);
      const tl = parseInt(match[2]);
      const tr = parseInt(match[3]);
      const l = parseInt(match[4]);
      const r = parseInt(match[5]);
      
      vars.push({ name: "id", type: "int", val: id, expandable: false });
      vars.push({ name: "tl", type: "int", val: tl, expandable: false });
      vars.push({ name: "tr", type: "int", val: tr, expandable: false });
      vars.push({ name: "l", type: "int", val: l, expandable: false });
      vars.push({ name: "r", type: "int", val: r, expandable: false });
      
      inlineVal = `id: ${id}, tl: ${tl}, tr: ${tr}, l: ${l}, r: ${r}`;
      
      if (activeLine >= 52 && tl < tr) {
        const tm = Math.floor((tl + tr) / 2);
        vars.push({ name: "tm", type: "int", val: tm, expandable: false });
        inlineVal += `, tm: ${tm}`;
      }
    }
  } else if (stepIndex >= 87) {
    frames.push({ name: "main()", file: "main.cpp", line: activeLine });
    vars.push({ name: "root0", type: "int", val: 0, expandable: false });
    vars.push({ name: "root1", type: "int", val: 7, expandable: false });
    vars.push({ name: "res", type: "int", val: 5, expandable: false });
    inlineVal = "res: 5";
  }
  
  return { frames, vars, inlineVal };
};

export const data = {
  presentation: `### Persistent Segment Tree (Arbore de Intervale Persistent)

Un arbore de intervale persistent este o structură de date avansată care permite efectuarea de actualizări și interogări menținând în același timp istoricul tuturor versiunilor anterioare ale structurii. În loc să modifice arborele existent în mod distructiv, o actualizare persistentă creează un set minim de noduri noi (pe calea de la rădăcină la frunza actualizată), restul arborelui fiind partajat cu versiunea anterioară.

Pentru un arbore care acoperă un interval de dimensiune $N$, fiecare actualizare afectează o cale de lungime cel mult $\\log N$. Prin urmare, fiecare versiune nouă adaugă exact $O(\\log N)$ noduri noi, păstrând complexitatea de timp și spațiu extrem de eficientă.

Această structură este utilizată în geometrie computațională, determinarea elementelor active în diverse momente de timp, sau în combinarea tehnicilor de procesare a interogărilor offline cu structuri online.`,

  complexity: `### Complexitate

- **Timp:** 
  - **Construire:** $O(N)$ - se construiește structura inițială (versiunea 0).
  - **Actualizare (Point Update):** $O(\\log N)$ - se creează noduri noi doar pe calea de actualizare.
  - **Interogare (Range Query):** $O(\\log N)$ - similar cu un arbore de intervale clasic.
- **Spațiu:** $O(N + Q \\log N)$ - unde $Q$ este numărul de actualizări, deoarece fiecare actualizare creează $O(\\log N)$ noduri noi.`,

  variations: `### Variații și Cazuri Particulare

- **Persistență parțială vs. totală:** Codul de mai jos implementează persistență parțială (putem interoga orice versiune din istoric, dar putem crea versiuni noi doar pornind de la ultima versiune). În persistența totală, se pot face actualizări și pe versiuni istorice intermediare, creând ramificații.
- **Persistent Segment Tree cu Lazy Propagation:** Propagarea leneșă în arbori persistenți este mai complexă deoarece nu putem altera nodurile partajate fără a le clona. Actualizările se fac de obicei prin tehnici speciale (de exemplu păstrarea tag-urilor lazy fără push-down direct).`,

  applications: `### Aplicații Reale

- **Range Query 2D:** Probleme de geometrie computațională (de exemplu, determinarea punctelor din interiorul unui dreptunghi).
- **K-th smallest element in a range:** Găsirea celui de-al $K$-lea cel mai mic element dintr-un interval $[L, R]$ (folosind un arbore persistent de frecvențe, rezolvabil în $O(\\log N)$ per query).
- **Arbori de intervale persistenți pe structuri arborescente:** Rezolvarea problemelor pe drumuri în arbore prin persistență de-a lungul parcurgerii DFS.`,

  code: codeStr,

  explanations: explanations,

  problems: {
    easy: [
      {
        title: "Persistent Segment Tree Basic",
        url: "https://www.spoj.com/problems/PSEGTREE/",
        desc: "Implementarea de bază a unui arbore de intervale persistent cu update de punct și range query."
      }
    ],
    medium: [
      {
        title: "K-th Number (SPOJ MKTHNUM)",
        url: "https://www.spoj.com/problems/MKTHNUM/",
        desc: "Găsirea celui de-al K-lea cel mai mic element dintr-un interval [L, R] folosind un arbore de intervale persistent peste vectorul de frecvențe cumulate."
      },
      {
        title: "D-query (SPOJ DQUERY)",
        url: "https://www.spoj.com/problems/DQUERY/",
        desc: "Determinarea numărului de elemente distincte într-un interval [L, R] utilizând arbori de intervale persistenți."
      }
    ],
    hard: [
      {
        title: "To the Moon (HDU 4348)",
        url: "https://acm.hdu.edu.cn/showproblem.php?pid=4348",
        desc: "Arbore de intervale persistent cu actualizări pe interval (Lazy Propagation) și interogări istorice."
      }
    ]
  },

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const { frames, vars, inlineVal } = getStackAndVars(stepIndex, activeLine);
      const globalVars = [];
      
      const treeState = getTreeAtStep(stepIndex);
      globalVars.push({
        name: "tree",
        type: "std::vector<Node>",
        val: `size = ${treeState.length}`,
        expandable: true
      });
      
      treeState.forEach((node, idx) => {
        globalVars.push({
          name: `tree[${idx}]`,
          type: "Node",
          val: `{ sum: ${node.sum}, left: ${node.left}, right: ${node.right} }`,
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
      const treeState = getTreeAtStep(stepIndex);
      const activeLine = explanations[stepIndex].line;
      const stackInfo = getStackAndVars(stepIndex, activeLine);
      
      const activeNodeId = stackInfo.vars.find(v => v.name === "id")?.val;
      
      const visitedNodeIds = stackInfo.frames
        .map(f => {
          const matchBuild = f.name.match(/build\(tl = (\d+), tr = (\d+)\)/);
          if (matchBuild) {
            const tl = parseInt(matchBuild[1]);
            const tr = parseInt(matchBuild[2]);
            if (tl === 0 && tr === 3) return 0;
            if (tl === 0 && tr === 1) return 1;
            if (tl === 0 && tr === 0) return 2;
            if (tl === 1 && tr === 1) return 3;
            if (tl === 2 && tr === 3) return 4;
            if (tl === 2 && tr === 2) return 5;
            if (tl === 3 && tr === 3) return 6;
          }
          const matchUpdate = f.name.match(/update\(prev_id = (\d+)/);
          if (matchUpdate) {
            const prev_id = parseInt(matchUpdate[1]);
            if (prev_id === 0) return 7;
            if (prev_id === 4) return 8;
            if (prev_id === 5) return 9;
          }
          const matchQuery = f.name.match(/query\(id = (\d+)/);
          if (matchQuery) {
            return parseInt(matchQuery[1]);
          }
          return null;
        })
        .filter(id => id !== null);

      const staticNodes = [
        { id: "0", x: 200, y: 50, label: "0 (S: sumVal)", desc: "[0..3]" },
        { id: "1", x: 100, y: 130, label: "1 (S: sumVal)", desc: "[0..1]" },
        { id: "4", x: 300, y: 130, label: "4 (S: sumVal)", desc: "[2..3]" },
        { id: "2", x: 50, y: 210, label: "2 (S: sumVal)", desc: "[0..0]" },
        { id: "3", x: 150, y: 210, label: "3 (S: sumVal)", desc: "[1..1]" },
        { id: "5", x: 250, y: 210, label: "5 (S: sumVal)", desc: "[2..2]" },
        { id: "6", x: 350, y: 210, label: "6 (S: sumVal)", desc: "[3..3]" },
        
        { id: "7", x: 480, y: 50, label: "7 (S: sumVal)", desc: "[0..3]" },
        { id: "8", x: 580, y: 130, label: "8 (S: sumVal)", desc: "[2..3]" },
        { id: "9", x: 530, y: 210, label: "9 (S: sumVal)", desc: "[2..2]" }
      ];

      const staticEdges = [
        { source: "0", target: "1" },
        { source: "0", target: "4" },
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "4", target: "5" },
        { source: "4", target: "6" },
        
        { source: "7", target: "1" },
        { source: "7", target: "8" },
        { source: "8", target: "9" },
        { source: "8", target: "6" }
      ];

      const visibleNodes = [];
      staticNodes.forEach(n => {
        const idNum = parseInt(n.id);
        if (idNum < treeState.length) {
          const nodeData = treeState[idNum];
          let state = undefined;
          if (idNum === activeNodeId) state = "active";
          else if (visitedNodeIds.includes(idNum)) state = "visited";
          
          let verTag = idNum >= 7 ? "v1" : (idNum === 0 || idNum === 4 || idNum === 5 ? "v0" : "");
          let labelText = `N${idNum}`;
          if (verTag) labelText += ` (${verTag})`;
          
          visibleNodes.push({
            id: n.id,
            x: n.x,
            y: n.y,
            val: nodeData.sum.toString(),
            label: labelText,
            labelPosition: idNum >= 7 ? "right" : "left",
            desc: n.desc,
            state
          });
        }
      });

      const visibleEdges = [];
      staticEdges.forEach(e => {
        const src = parseInt(e.source);
        const dest = parseInt(e.target);
        if (src < treeState.length && dest < treeState.length) {
          let active = false;
          for (let i = 0; i < visitedNodeIds.length - 1; i++) {
            const u = visitedNodeIds[i];
            const v = visitedNodeIds[i+1];
            if ((u === src && v === dest) || (u === dest && v === src)) {
              active = true;
              break;
            }
          }
          
          let isValidEdge = true;
          if (src === 7) {
            const actualLeft = treeState[7].left;
            const actualRight = treeState[7].right;
            if (dest === 1 && actualLeft !== 1) isValidEdge = false;
            if (dest === 8 && actualRight !== 8) isValidEdge = false;
          }
          if (src === 8) {
            const actualLeft = treeState[8].left;
            const actualRight = treeState[8].right;
            if (dest === 9 && actualLeft !== 9) isValidEdge = false;
            if (dest === 6 && actualRight !== 6) isValidEdge = false;
          }
          
          if (isValidEdge) {
            visibleEdges.push({
              source: e.source,
              target: e.target,
              active
            });
          }
        }
      });

      return {
        directed: true,
        title: "Persistent Segment Tree Structură",
        nodes: visibleNodes,
        edges: visibleEdges
      };
    }
  }
};
