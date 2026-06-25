const fs = require('fs');

const path = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Lee.js';
let content = fs.readFileSync(path, 'utf8');

let grid = [
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [1, 0, 0, 0],
    [0, 0, 1, 0]
];
let dist = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1]
];

let steps = [];
let explanations = [];
let debuggerStates = [];
let q = [];

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getMatrixData() {
    return [
        ["0", dist[0][0] === -1 ? (grid[0][0]===1?"█":-1) : dist[0][0],
              dist[0][1] === -1 ? (grid[0][1]===1?"█":-1) : dist[0][1],
              dist[0][2] === -1 ? (grid[0][2]===1?"█":-1) : dist[0][2],
              dist[0][3] === -1 ? (grid[0][3]===1?"█":-1) : dist[0][3]],
        ["1", dist[1][0] === -1 ? (grid[1][0]===1?"█":-1) : dist[1][0],
              dist[1][1] === -1 ? (grid[1][1]===1?"█":-1) : dist[1][1],
              dist[1][2] === -1 ? (grid[1][2]===1?"█":-1) : dist[1][2],
              dist[1][3] === -1 ? (grid[1][3]===1?"█":-1) : dist[1][3]],
        ["2", dist[2][0] === -1 ? (grid[2][0]===1?"█":-1) : dist[2][0],
              dist[2][1] === -1 ? (grid[2][1]===1?"█":-1) : dist[2][1],
              dist[2][2] === -1 ? (grid[2][2]===1?"█":-1) : dist[2][2],
              dist[2][3] === -1 ? (grid[2][3]===1?"█":-1) : dist[2][3]],
        ["3", dist[3][0] === -1 ? (grid[3][0]===1?"█":-1) : dist[3][0],
              dist[3][1] === -1 ? (grid[3][1]===1?"█":-1) : dist[3][1],
              dist[3][2] === -1 ? (grid[3][2]===1?"█":-1) : dist[3][2],
              dist[3][3] === -1 ? (grid[3][3]===1?"█":-1) : dist[3][3]]
    ];
}

function getBlocksVisual() {
    let qGroups = q.map(cell => ({ val: `(${cell.r},${cell.c})` }));
    return [
        {
            label: "Queue q",
            groups: [qGroups]
        }
    ];
}

function addStep(line, text, stateVars, activeCells=[], highlightCells=[]) {
    explanations.push({
        line,
        text,
        blocksVisual: getBlocksVisual(),
        matrix: {
            title: "Matricea dist",
            headers: ["R/C", "0", "1", "2", "3"],
            data: getMatrixData(),
            activeCells,
            highlightCells
        }
    });

    let locals = clone(stateVars);
    debuggerStates.push({
        line,
        locals,
        q: clone(q)
    });
}

// MAIN
let locals = {
    ans: null,
    srcR: 0, srcC: 0, destR: 3, destC: 3,
    rows: null, cols: null,
    curr: null,
    i: null, nr: null, nc: null
};

addStep(79, "Începem execuția algoritmului lui Lee pentru a determina cel mai scurt drum de la sursa (0,0) la destinația (3,3) pe o matrice cu obstacole.", locals);

locals.rows = 4;
addStep(36, "Obținem numărul de linii ale matricei prin apelul grid.size(): rows = 4.", locals);

locals.cols = 4;
addStep(37, "Obținem numărul de coloane ale matricei prin apelul grid[0].size(): cols = 4.", locals);

addStep(38, "Verificăm dacă celula sursă sau destinația reprezintă un obstacol (valoare 1). Ambele celule sunt 0 (libere), deci condiția este falsă și putem porni parcurgerea.", locals);

addStep(40, "Inițializăm matricea dist de dimensiune 4x4 cu valoarea -1, marcând toate celulele ca fiind nevizitate.", locals);

addStep(41, "Inițializăm coada de priorități q, utilizată pentru a asigura parcurgerea în lățime (BFS).", locals);

dist[0][0] = 0;
addStep(43, "Setăm distanța de pornire pentru celula sursă la 0: dist[0][0] = 0.", locals, [{r:0, c:0}]);

q.push({r: 0, c: 0});
addStep(44, "Adăugăm celula sursă (0,0) în coada q pentru a fi prima analizată.", locals, [{r:0, c:0}]);

addStep(46, "Definim vectorul de deplasare pe linii dr = {-1, 1, 0, 0} pentru a accesa vecinii (Sus, Jos, Stânga, Dreapta).", locals, [{r:0, c:0}]);
addStep(47, "Definim vectorul de deplasare pe coloane dc = {0, 0, -1, 1}.", locals, [{r:0, c:0}]);

let dr = [-1, 1, 0, 0];
let dc = [0, 0, -1, 1];

while (q.length > 0) {
    addStep(49, `Verificăm condiția buclei BFS: !q.empty(). Deoarece coada conține ${q.length} elemente, condiția este adevărată, așa că începem o nouă iterație.`, locals);

    let curr = q.shift();
    locals.curr = { ...curr };
    addStep(50, `Extragem celula din fața cozii: curr = (${curr.r}, ${curr.c}). Distanța calculată până la ea este dist[${curr.r}][${curr.c}] = ${dist[curr.r][curr.c]}.`, locals, [{r:curr.r, c:curr.c}]);
    
    addStep(51, `Eliminăm celula (${curr.r}, ${curr.c}) din coada de prelucrare.`, locals, [{r:curr.r, c:curr.c}]);

    let isDest = (curr.r === 3 && curr.c === 3);
    addStep(53, `Verificăm dacă celula curentă este destinația: curr.r == dest.r && curr.c == dest.c. Coordonatele sunt (${curr.r}, ${curr.c}) comparate cu (3, 3). Condiția este ${isDest ? "Adevărată! Am găsit drumul minim." : "Falsă."}`, locals, [{r:curr.r, c:curr.c}]);
    
    if (isDest) {
        addStep(54, `Returnăm valoarea stocată în dist[${curr.r}][${curr.c}] = ${dist[curr.r][curr.c]}, reprezentând numărul minim de pași de la sursă la destinație.`, locals, [{r:curr.r, c:curr.c}]);
        locals.ans = dist[curr.r][curr.c];
        break;
    }

    for (let i = 0; i < 4; i++) {
        locals.i = i;
        addStep(57, `Explorăm vecinul i = ${i} în direcțiile definite de vectorii dr și dc.`, locals, [{r:curr.r, c:curr.c}]);
        
        let nr = curr.r + dr[i];
        let nc = curr.c + dc[i];
        locals.nr = nr;
        locals.nc = nc;
        addStep(58, `Calculăm linia vecinului: nr = curr.r + dr[${i}] = ${curr.r} + (${dr[i]}) = ${nr}.`, locals, [{r:curr.r, c:curr.c}]);
        addStep(59, `Calculăm coloana vecinului: nc = curr.c + dc[${i}] = ${curr.c} + (${dc[i]}) = ${nc}.`, locals, [{r:curr.r, c:curr.c}]);

        let inBounds = (nr >= 0 && nr < 4 && nc >= 0 && nc < 4);
        addStep(61, `Verificăm dacă vecinul (${nr}, ${nc}) se află în interiorul limitelor grilei: nr >= 0 && nr < rows && nc >= 0 && nc < cols. Deoarece coordonatele sunt ${inBounds ? 'valide' : 'în afara limitelor'}, condiția este ${inBounds ? 'Adevărată' : 'Falsă'}.`, locals, [{r:curr.r, c:curr.c}]);

        if (inBounds) {
            let isFreeAndUnvisited = (grid[nr][nc] === 0 && dist[nr][nc] === -1);
            addStep(62, `Verificăm dacă celula vecină (${nr}, ${nc}) este liberă (egală cu 0) și nevizitată (dist == -1). Deoarece grid[${nr}][${nc}] = ${grid[nr][nc]} și dist[${nr}][${nc}] = ${dist[nr][nc]}, condiția este ${isFreeAndUnvisited ? 'Adevărată' : 'Falsă'}.`, locals, [{r:curr.r, c:curr.c}], [{r:nr, c:nc}]);

            if (isFreeAndUnvisited) {
                dist[nr][nc] = dist[curr.r][curr.c] + 1;
                addStep(63, `Actualizăm distanța pentru celula vecină: dist[${nr}][${nc}] = dist[${curr.r}][${curr.c}] + 1 = ${dist[nr][nc]} pași.`, locals, [{r:curr.r, c:curr.c}], [{r:nr, c:nc}]);
                
                q.push({r: nr, c: nc});
                addStep(64, `Adăugăm coordonatele (${nr}, ${nc}) în coadă pentru a le extinde frontul în iterațiile următoare.`, locals, [{r:curr.r, c:curr.c}], [{r:nr, c:nc}]);
            }
        }
    }
}

if (q.length === 0 && locals.ans === null) {
    addStep(49, `Verificăm condiția buclei BFS: !q.empty(). Deoarece coada este goală, condiția este Falsă și ieșim din buclă.`, locals);
}

// Back in main
addStep(80, `Afișăm rezultatul final obținut în variabila ans: ${locals.ans} pași.`, locals);
addStep(81, "Programul se încheie cu succes.", locals);

let debuggerStateFunction = `
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      let qStr = "empty";
      if (state.q.length > 0) {
          qStr = state.q.map(e => \`(\${e.r},\${e.c})\`).join(", ");
      }

      if (activeLine >= 73 && activeLine <= 81 && activeLine !== 79) {
          frames.push({ name: "main()", file: "main.cpp", line: activeLine });
          vars.push({ name: "grid", type: "vector<vector<int>>", val: "size = 4x4", expandable: true });
          if (locals.ans !== null) vars.push({ name: "ans", type: "int", val: locals.ans.toString() });
      } else {
          frames.push({ name: "leeAlgorithm(grid, src, dest)", file: "solution.cpp", line: activeLine });
          frames.push({ name: "main()", file: "main.cpp", line: 79 });
          
          vars.push({ name: "grid", type: "vector<vector<int>>&", val: "size = 4x4", expandable: true });
          vars.push({ name: "src", type: "Cell", val: "{0, 0}" });
          vars.push({ name: "dest", type: "Cell", val: "{3, 3}" });
          if (locals.rows !== null) vars.push({ name: "rows", type: "int", val: "4" });
          if (locals.cols !== null) vars.push({ name: "cols", type: "int", val: "4" });
          vars.push({ name: "dist", type: "vector<vector<int>>", val: "size = 4x4", expandable: true });
          vars.push({ name: "q", type: "queue<Cell>", val: qStr });
          
          if (locals.curr) {
              vars.push({ name: "curr", type: "Cell", val: \`{\${locals.curr.r}, \${locals.curr.c}}\` });
          }
          if (locals.i !== null) vars.push({ name: "i", type: "int", val: locals.i.toString() });
          if (locals.nr !== null) vars.push({ name: "nr", type: "int", val: locals.nr.toString() });
          if (locals.nc !== null) vars.push({ name: "nc", type: "int", val: locals.nc.toString() });
      }

      let inlineVal = null;
      if (locals.curr !== null && activeLine >= 49 && activeLine <= 68) {
          inlineVal = \`curr: {\${locals.curr.r}, \${locals.curr.c}}\`;
          if (locals.nr !== null && locals.nc !== null) {
              inlineVal += \`, nr: \${locals.nr}, nc: \${locals.nc}\`;
          }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (lineNum === 50) return locals.curr ? \`curr: {\${locals.curr.r}, \${locals.curr.c}}\` : null;
      if (lineNum === 58) return locals.nr !== null ? \`nr: \${locals.nr}\` : null;
      if (lineNum === 59) return locals.nc !== null ? \`nc: \${locals.nc}\` : null;
      return null;
    }
`;

// Replace explanations
const regexExp = /"explanations":\s*\[[\s\S]*?\],\s*"debugger"/;
const newExp = '"explanations": ' + JSON.stringify(explanations, null, 2) + ',\n  "debugger"';
content = content.replace(regexExp, newExp);

// Replace debugger
const regexDebugger = /"getDebuggerState":\s*\([\s\S]*?"problems":/m;
content = content.replace(regexDebugger, debuggerStateFunction + '\n  },\n  "problems":');

fs.writeFileSync(path, content, 'utf8');
console.log("Updated Lee.js");
