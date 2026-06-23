const fs = require('fs');

const path = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Flood_Fill.js';
let content = fs.readFileSync(path, 'utf8');

let img = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1]
];

let steps = [];
let callStack = []; // stores { r, c, name }
let explanations = [];
let debuggerStates = [];

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function addStep(line, text, activeCells = [], highlightCells = []) {
    let locals = { r: null, c: null, oldColor: null, newColor: null, rows: null, cols: null, startColor: null };
    let frameName = "main()";
    let callerLine = null;
    let file = "main.cpp";
    let stackFrames = [];
    
    if (callStack.length === 0) {
        locals.startColor = 1;
        stackFrames.push({ name: "main()", file: "main.cpp", line });
    } else {
        for (let i = callStack.length - 1; i >= 0; i--) {
            let frame = callStack[i];
            stackFrames.push({
                name: `floodFill(image, r=${frame.r}, c=${frame.c}, oldColor=1, newColor=2)`,
                file: "solution.cpp",
                line: i === callStack.length - 1 ? line : frame.callerLine
            });
        }
        stackFrames.push({ name: "main()", file: "main.cpp", line: 54 });
        
        let top = callStack[callStack.length - 1];
        locals.r = top.r;
        locals.c = top.c;
        locals.oldColor = 1;
        locals.newColor = 2;
        if (top.step >= 1) locals.rows = 3;
        if (top.step >= 2) locals.cols = 3;
    }

    let mData = [
        ["0", img[0][0], img[0][1], img[0][2]],
        ["1", img[1][0], img[1][1], img[1][2]],
        ["2", img[2][0], img[2][1], img[2][2]]
    ];

    let exp = {
        line,
        text,
        blocksVisual: [],
        matrix: {
            title: "Gridul de Culori",
            headers: ["R/C", "0", "1", "2"],
            data: mData,
            activeCells,
            highlightCells
        }
    };
    explanations.push(exp);

    debuggerStates.push({
        line,
        locals,
        stackFrames
    });
}

// MAIN
addStep(46, "Inițializăm matricea `img` de dimensiuni 3x3.");
addStep(52, "Preluăm culoarea de start: `startColor = img[1][1] = 1`.");
addStep(53, "Verificăm dacă `startColor != 2`. Adevărat (1 != 2).");
addStep(54, "Apelăm `floodFill` pentru celula (1,1).", [{r:1, c:1}]);

function dfs(r, c, callerLine) {
    callStack.push({ r, c, step: 0, callerLine });
    let top = callStack[callStack.length - 1];

    addStep(31, `Intrăm în floodFill pentru r=${r}, c=${c}. Obținem rows = 3.`, [{r, c}]);
    top.step = 1;
    addStep(32, `Obținem cols = 3.`, [{r, c}]);
    top.step = 2;

    let outOfBounds = (r < 0 || r >= 3 || c < 0 || c >= 3);
    addStep(34, `Verificăm limitele (r=${r}, c=${c}). ${outOfBounds ? "Suntem în afara limitelor matricei. Returnăm." : "În limite."}`, [{r, c}]);
    if (outOfBounds) {
        callStack.pop();
        return;
    }

    let diffColor = img[r][c] !== 1;
    addStep(35, `Verificăm dacă culoarea curentă este diferită de 1. Culoarea este ${img[r][c]}. ${diffColor ? "Diferită, deci returnăm." : "La fel, continuăm."}`, [{r, c}]);
    if (diffColor) {
        callStack.pop();
        return;
    }

    img[r][c] = 2;
    addStep(37, `Colorăm celula (${r}, ${c}) în noua culoare (2).`, [{r, c}]);

    addStep(39, `Apelăm recursiv floodFill pentru vecinul de sus (${r-1}, ${c}).`, [{r, c}], [{r: r-1, c}]);
    dfs(r - 1, c, 39);

    addStep(40, `Revenim la (${r}, ${c}). Apelăm recursiv floodFill pentru vecinul de jos (${r+1}, ${c}).`, [{r, c}], [{r: r+1, c}]);
    dfs(r + 1, c, 40);

    addStep(41, `Revenim la (${r}, ${c}). Apelăm recursiv floodFill pentru vecinul din stânga (${r}, ${c-1}).`, [{r, c}], [{r, c: c-1}]);
    dfs(r, c - 1, 41);

    addStep(42, `Revenim la (${r}, ${c}). Apelăm recursiv floodFill pentru vecinul din dreapta (${r}, ${c+1}).`, [{r, c}], [{r, c: c+1}]);
    dfs(r, c + 1, 42);

    addStep(43, `Am finalizat explorarea pentru (${r}, ${c}) și ne întoarcem.`, [{r, c}]);
    callStack.pop();
}

dfs(1, 1, 54);

// Back in main
addStep(57, "Afișăm rezultatul final al matricei img.");
// Print loops
addStep(58, "Bucla principală pentru afișare (i=0).");
addStep(59, "Bucla secundară pentru afișare (j=0).");
addStep(60, "Afișăm img[0][0].");
// skip rest of print loop for brevity but let's just do a few
addStep(64, "Return 0; program finalizat.");

let debuggerStateFunction = `
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const vars = [];
      const globalVars = [];
      const frames = state.stackFrames;
      
      vars.push({ name: "img", type: "vector<vector<int>>", val: "size = 3x3", expandable: true });
      if (state.locals.startColor !== null) vars.push({ name: "startColor", type: "int", val: state.locals.startColor.toString() });
      if (state.locals.r !== null) vars.push({ name: "r", type: "int", val: state.locals.r.toString() });
      if (state.locals.c !== null) vars.push({ name: "c", type: "int", val: state.locals.c.toString() });
      if (state.locals.oldColor !== null) vars.push({ name: "oldColor", type: "int", val: state.locals.oldColor.toString() });
      if (state.locals.newColor !== null) vars.push({ name: "newColor", type: "int", val: state.locals.newColor.toString() });
      if (state.locals.rows !== null) vars.push({ name: "rows", type: "int", val: state.locals.rows.toString() });
      if (state.locals.cols !== null) vars.push({ name: "cols", type: "int", val: state.locals.cols.toString() });
      
      let inlineVal = null;
      if (state.locals.r !== null) {
          inlineVal = \`r: \${state.locals.r}, c: \${state.locals.c}, oldColor: 1, newColor: 2\`;
      } else if (state.locals.startColor !== null) {
          inlineVal = \`startColor: \${state.locals.startColor}\`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      if (lineNum === 52 || lineNum === 53) return state.locals.startColor !== null ? \`startColor: \${state.locals.startColor}\` : null;
      if (lineNum >= 30 && lineNum <= 43 && state.locals.r !== null) return \`r: \${state.locals.r}, c: \${state.locals.c}\`;
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
console.log("Updated Flood_Fill.js");
