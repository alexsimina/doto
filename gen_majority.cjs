const fs = require('fs');

const path = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Majority_Element.js';
let content = fs.readFileSync(path, 'utf8');

const arr = [2, 2, 1, 1, 2];

let explanations = [];
let debuggerStates = [];

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let locals = {
    arr: [2, 2, 1, 1, 2],
    candidate: -1,
    count: 0,
    x: null,
    actual_count: null,
    is_majority: null
};

function getBlocksVisual(activeArrIdx = -1) {
    let arrVisual = arr.map((val, idx) => ({ val: val.toString(), active: idx === activeArrIdx }));
    return [
        {
            label: "Vector (arr)",
            groups: [arrVisual]
        },
        {
            label: "Parametri Boyer-Moore",
            groups: [
                [
                    { val: `candidate = ${locals.candidate}`, active: false },
                    { val: `count = ${locals.count}`, active: false }
                ]
            ]
        }
    ];
}

function addStep(line, text, activeArrIdx = -1) {
    explanations.push({
        line,
        text,
        blocksVisual: getBlocksVisual(activeArrIdx)
    });

    debuggerStates.push({
        line,
        locals: clone(locals)
    });
}

// MAIN
addStep(12, "Definim vectorul arr = {2, 2, 1, 1, 2}.");

addStep(13, "Inițializăm candidate = -1.");

addStep(14, "Inițializăm count = 0.");

addStep(16, "Începem prima parcurgere a vectorului.");

for (let i = 0; i < arr.length; i++) {
    let x = arr[i];
    locals.x = x;
    addStep(16, `x = arr[${i}] = ${x}.`, i);

    addStep(17, `Verificăm dacă count == 0. (count este ${locals.count})`, i);
    if (locals.count === 0) {
        locals.candidate = x;
        addStep(18, `candidate = ${x}.`, i);

        locals.count = 1;
        addStep(19, `count = 1.`, i);
    } else {
        addStep(20, `Verificăm dacă x == candidate. (${x} == ${locals.candidate})`, i);
        if (x === locals.candidate) {
            locals.count++;
            addStep(21, `count devine ${locals.count}.`, i);
        } else {
            locals.count--;
            addStep(23, `count devine ${locals.count}.`, i);
        }
    }
}

locals.x = null;
locals.actual_count = 0;
addStep(27, "Inițializăm actual_count = 0 pentru validare.");

addStep(28, "Începem a doua parcurgere a vectorului pentru a număra aparițiile candidatului.");

for (let i = 0; i < arr.length; i++) {
    let x = arr[i];
    locals.x = x;
    addStep(28, `x = arr[${i}] = ${x}.`, i);

    addStep(29, `Verificăm dacă x == candidate. (${x} == ${locals.candidate})`, i);
    if (x === locals.candidate) {
        locals.actual_count++;
        addStep(30, `actual_count devine ${locals.actual_count}.`, i);
    }
}

locals.x = null;
addStep(34, `Calculăm is_majority = (actual_count > arr.size() / 2). (${locals.actual_count} > 2).`);
locals.is_majority = (locals.actual_count > Math.floor(arr.length / 2));
addStep(35, `is_majority este ${locals.is_majority}. Returnăm 0.`);

let debuggerStateFunction = `
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = [{ name: "main()", file: "main.cpp", line: activeLine }];
      
      vars.push({ name: "arr", type: "vector<int>", val: "size = 5", expandable: true });
      vars.push({ name: "candidate", type: "int", val: locals.candidate.toString() });
      vars.push({ name: "count", type: "int", val: locals.count.toString() });
      if (locals.x !== null) vars.push({ name: "x", type: "int", val: locals.x.toString() });
      if (locals.actual_count !== null) vars.push({ name: "actual_count", type: "int", val: locals.actual_count.toString() });
      if (locals.is_majority !== null) vars.push({ name: "is_majority", type: "bool", val: locals.is_majority.toString() });

      let inlineVal = null;
      if (locals.x !== null && activeLine >= 16 && activeLine <= 30) {
          inlineVal = \`x: \${locals.x}\`;
          if (activeLine === 18 || activeLine === 20 || activeLine === 29) {
              inlineVal += \`, candidate: \${locals.candidate}\`;
          }
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (locals.x !== null && (lineNum === 16 || lineNum === 28)) return \`x: \${locals.x}\`;
      return null;
    }
`;

// Replace explanations
const regexExp = /explanations:\s*\[[\s\S]*?\],\s*"debugger"/;
const newExp = 'explanations: ' + JSON.stringify(explanations, null, 2) + ',\n  "debugger"';
if (content.match(regexExp)) {
    content = content.replace(regexExp, newExp);
} else {
    // try different regex
    const r2 = /explanations:\s*\[[\s\S]*?\],\s*debugger:/;
    content = content.replace(r2, 'explanations: ' + JSON.stringify(explanations, null, 2) + ',\n  debugger:');
}

// Replace debugger
const regexDebugger = /"getDebuggerState":\s*\([\s\S]*?problems:/m;
if (content.match(regexDebugger)) {
    content = content.replace(regexDebugger, debuggerStateFunction + '\n  },\n  problems:');
} else {
    const rd2 = /getDebuggerState:\s*\([\s\S]*?problems:/m;
    content = content.replace(rd2, debuggerStateFunction + '\n  },\n  problems:');
}

fs.writeFileSync(path, content, 'utf8');
console.log("Updated Majority_Element.js");
