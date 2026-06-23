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

addStep(79, "Apelăm funcția leeAlgorithm pentru grid, src=(0,0), dest=(3,3).", locals);

locals.rows = 4;
addStep(36, "Obținem numărul de rânduri: rows = 4.", locals);

locals.cols = 4;
addStep(37, "Obținem numărul de coloane: cols = 4.", locals);

addStep(38, "Verificăm dacă sursa sau destinația este obstacol (1). Ambele sunt 0 (libere).", locals);

addStep(40, "Inițializăm matricea dist cu valoarea -1.", locals);

addStep(41, "Inițializăm coada q.", locals);

dist[0][0] = 0;
addStep(43, "Setăm distanța pentru sursă la 0: dist[0][0] = 0.", locals, [{r:0, c:0}]);

q.push({r: 0, c: 0});
addStep(44, "Adăugăm sursa în coadă.", locals, [{r:0, c:0}]);

addStep(46, "Definim dr = {-1, 1, 0, 0}.", locals, [{r:0, c:0}]);
addStep(47, "Definim dc = {0, 0, -1, 1}.", locals, [{r:0, c:0}]);

let dr = [-1, 1, 0, 0];
let dc = [0, 0, -1, 1];

while (q.length > 0) {
    addStep(49, `Începem o iterație BFS. Coada are ${q.length} elemente.`, locals);

    let curr = q.shift();
    locals.curr = { ...curr };
    addStep(50, `Extragem primul element din coadă: curr = (${curr.r}, ${curr.c}).`, locals, [{r:curr.r, c:curr.c}]);
    
    addStep(51, `Scoatem elementul din coadă.`, locals, [{r:curr.r, c:curr.c}]);

    let isDest = (curr.r === 3 && curr.c === 3);
    addStep(53, `Verificăm dacă curr este destinația (3,3). ${isDest ? "Da, este destinația!" : "Nu."}`, locals, [{r:curr.r, c:curr.c}]);
    
    if (isDest) {
        addStep(54, `Returnăm distanța minimă: ${dist[curr.r][curr.c]}.`, locals, [{r:curr.r, c:curr.c}]);
        locals.ans = dist[curr.r][curr.c];
        break;
    }

    for (let i = 0; i < 4; i++) {
        locals.i = i;
        addStep(57, `Explorăm vecinul i=${i}.`, locals, [{r:curr.r, c:curr.c}]);
        
        let nr = curr.r + dr[i];
        let nc = curr.c + dc[i];
        locals.nr = nr;
        locals.nc = nc;
        addStep(58, `Calculăm nr = ${nr}.`, locals, [{r:curr.r, c:curr.c}]);
        addStep(59, `Calculăm nc = ${nc}.`, locals, [{r:curr.r, c:curr.c}]);

        let inBounds = (nr >= 0 && nr < 4 && nc >= 0 && nc < 4);
        addStep(61, `Verificăm limitele pentru (${nr}, ${nc}). ${inBounds ? "În limite." : "În afara limitelor."}`, locals, [{r:curr.r, c:curr.c}]);

        if (inBounds) {
            let isFreeAndUnvisited = (grid[nr][nc] === 0 && dist[nr][nc] === -1);
            addStep(62, `Verificăm dacă celula e liberă și nevizitată. ${isFreeAndUnvisited ? "Da." : "Nu."}`, locals, [{r:curr.r, c:curr.c}], [{r:nr, c:nc}]);

            if (isFreeAndUnvisited) {
                dist[nr][nc] = dist[curr.r][curr.c] + 1;
                addStep(63, `Actualizăm dist[${nr}][${nc}] = ${dist[nr][nc]}.`, locals, [{r:curr.r, c:curr.c}], [{r:nr, c:nc}]);
                
                q.push({r: nr, c: nc});
                addStep(64, `Adăugăm (${nr}, ${nc}) în coadă.`, locals, [{r:curr.r, c:curr.c}], [{r:nr, c:nc}]);
            }
        }
    }
}

// Back in main
addStep(80, "Afișăm drumul minim.", locals);
addStep(81, "Program finalizat.", locals);

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
