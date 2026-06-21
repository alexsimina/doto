const fs = require('fs');
const path = require('path');

const filesToUpdate = {
  'dashboard/src/data/categories/Math_Geometry/Math/Advanced.js': `  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      const gcdFrames = [
        [34, 21], [21, 34], [13, 21], [8, 13], [5, 8], [3, 5], [2, 3], [1, 2], [0, 1]
      ];
      globalVars.push({ name: 'a', type: 'long long', val: '34', expandable: false });
      globalVars.push({ name: 'b', type: 'long long', val: '21', expandable: false });
      
      if (stepIndex === 0) {
        frames.push({ name: 'main()', file: 'main.cpp', line: activeLine });
      } else {
        const depth = Math.min(stepIndex, 8);
        for (let d = 0; d <= depth; d++) {
          const f = gcdFrames[d];
          frames.push({ name: \`gcdExtended(\${f[0]}, \${f[1]})\`, file: 'main.cpp', line: d === depth ? activeLine : 16 });
        }
        frames.push({ name: 'main()', file: 'main.cpp', line: 28 });
      }
      frames.reverse();
      
      if (stepIndex >= 10) {
        const xVals = [null, 1, -1, 2, -3, 5, -8, 13, -8];
        const yVals = [null, 0, 1, -1, 2, -3, 5, -8, 13];
        const idx = Math.min(stepIndex - 10, 8);
        if (idx >= 0) {
          vars.push({ name: 'x', type: 'long long', val: xVals[idx] ?? 0, expandable: false });
          vars.push({ name: 'y', type: 'long long', val: yVals[idx] ?? 1, expandable: false });
        }
      }
      const depth = Math.min(stepIndex, 8);
      inlineVal = depth > 0 ? \`depth: \${depth}\` : null;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const gcdFrames = [
        [34, 21], [21, 34], [13, 21], [8, 13], [5, 8], [3, 5], [2, 3], [1, 2], [0, 1]
      ];
      const depth = Math.min(stepIndex, 8);
      if (lineNum === 9 && stepIndex <= 8) {
        const f = gcdFrames[depth];
        return \`a: \${f[0]}, b: \${f[1]}\`;
      }
      if (lineNum === 26 && stepIndex === 0) return 'a: 34, b: 21';
      if (stepIndex >= 10) {
        const xVals = [null, 1, -1, 2, -3, 5, -8, 13, -8];
        const yVals = [null, 0, 1, -1, 2, -3, 5, -8, 13];
        const idx = Math.min(stepIndex - 10, 8);
        if (idx >= 0) {
          if (lineNum === 19 || lineNum === 20) return \`x: \${xVals[idx]}, y: \${yVals[idx]}\`;
        }
      }
      return null;
    }
  }`,
  'dashboard/src/data/categories/Math_Geometry/Math/Game_Theory.js': `  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let nimSum = 0;
      if (stepIndex >= 2) nimSum = 3;
      if (stepIndex >= 3) nimSum = 7;
      if (stepIndex >= 4) nimSum = 2;
      globalVars.push({ name: 'stive', type: 'vector<int>', val: '{3, 4, 5}', expandable: false });
      vars.push({ name: 'nimSum', type: 'int', val: nimSum, expandable: false });
      frames.push({ name: 'main()', file: 'main.cpp', line: stepIndex === 0 ? activeLine : 29 });
      if (stepIndex >= 1) frames.unshift({ name: \`playNim(stive)\`, file: 'main.cpp', line: activeLine });
      inlineVal = \`nimSum: \${nimSum}\`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let nimSum = 0;
      if (stepIndex >= 2) nimSum = 3;
      if (stepIndex >= 3) nimSum = 7;
      if (stepIndex >= 4) nimSum = 2;
      
      if (lineNum === 7) return \`nimSum: \${nimSum}\`;
      if (lineNum === 11 && stepIndex >= 2 && stepIndex <= 4) return \`val: \${stepIndex === 2 ? 3 : (stepIndex === 3 ? 4 : 5)}\`;
      if (lineNum === 15) return \`nimSum: \${nimSum}\`;
      return null;
    }
  }`,
  'dashboard/src/data/categories/Math_Geometry/Math/Linear_Algebra.js': `  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      
      let iVal = 0;
      if (stepIndex >= 16 && stepIndex <= 22) iVal = 1;
      if (stepIndex >= 23) iVal = 2;
      
      let maxRow = 0;
      if (stepIndex >= 2 && stepIndex <= 16) maxRow = 1;
      if (stepIndex >= 17) maxRow = 2;
      
      let kVal = null;
      if (stepIndex === 2) kVal = 1;
      if (stepIndex >= 4 && stepIndex <= 9) kVal = 1;
      if (stepIndex >= 10 && stepIndex <= 15) kVal = 2;
      if (stepIndex === 17) kVal = 2;
      if (stepIndex >= 19 && stepIndex <= 22) kVal = 2;
      
      let cVal = null;
      if (stepIndex >= 5 && stepIndex <= 9) cVal = 0.67;
      if (stepIndex >= 11 && stepIndex <= 15) cVal = -0.67;
      if (stepIndex >= 19 && stepIndex <= 22) cVal = -0.20;

      globalVars.push({ name: 'n', type: 'int', val: '3', expandable: false });
      globalVars.push({ name: 'a', type: 'vector<vector<double>>', val: '3x4 matrix', expandable: false });
      
      if (stepIndex >= 1 && stepIndex <= 23) {
        vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
        vars.push({ name: 'maxRow', type: 'int', val: maxRow, expandable: false });
        if (kVal !== null) {
          vars.push({ name: 'k', type: 'int', val: kVal, expandable: false });
        }
        if (cVal !== null) {
          vars.push({ name: 'c', type: 'double', val: cVal, expandable: false });
        }
      }
      
      frames.push({ name: 'main()', file: 'main.cpp', line: stepIndex === 0 ? 39 : (stepIndex === 24 ? 45 : 44) });
      if (stepIndex >= 1 && stepIndex <= 23) {
        frames.unshift({ name: \`gaussianElimination(a)\`, file: 'main.cpp', line: activeLine });
      }
      
      inlineVal = stepIndex >= 1 && stepIndex <= 23 ? \`i: \${iVal}\` : null;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let iVal = 0;
      if (stepIndex >= 16 && stepIndex <= 22) iVal = 1;
      if (stepIndex >= 23) iVal = 2;
      
      let maxRow = 0;
      if (stepIndex >= 2 && stepIndex <= 16) maxRow = 1;
      if (stepIndex >= 17) maxRow = 2;
      
      let kVal = null;
      if (stepIndex === 2) kVal = 1;
      if (stepIndex >= 4 && stepIndex <= 9) kVal = 1;
      if (stepIndex >= 10 && stepIndex <= 15) kVal = 2;
      if (stepIndex === 17) kVal = 2;
      if (stepIndex >= 19 && stepIndex <= 22) kVal = 2;
      
      let cVal = null;
      if (stepIndex >= 5 && stepIndex <= 9) cVal = 0.67;
      if (stepIndex >= 11 && stepIndex <= 15) cVal = -0.67;
      if (stepIndex >= 19 && stepIndex <= 22) cVal = -0.20;

      if (lineNum === 12) return \`i: \${iVal}\`;
      if (lineNum === 14 || lineNum === 17) return \`maxRow: \${maxRow}\`;
      if ((lineNum === 15 || lineNum === 25) && kVal !== null) return \`k: \${kVal}\`;
      if (lineNum === 26 && cVal !== null) return \`c: \${cVal}\`;
      return null;
    }
  }`,
  'dashboard/src/data/categories/Math_Geometry/Math/Number_Theory.js': `  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      let p = 2;
      if (stepIndex >= 14) p = 3;
      if (stepIndex >= 21) p = 4;
      if (stepIndex >= 23) p = 5;
      globalVars.push({ name: 'estePrim', type: 'vector<bool>', val: '[2..20]', expandable: false });
      globalVars.push({ name: 'n', type: 'int', val: '20', expandable: false });
      if (stepIndex >= 2) vars.push({ name: 'p', type: 'int', val: p, expandable: false });
      
      let iVal = null;
      if (stepIndex >= 4 && stepIndex <= 13) {
        iVal = stepIndex === 4 ? 4 : 4 + (stepIndex - 5) * 2;
      } else if (stepIndex >= 16 && stepIndex <= 20) {
        iVal = stepIndex === 16 ? 9 : 9 + (stepIndex - 17) * 3;
      }
      
      if (iVal !== null) {
        vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
      }
      
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 2) frames.unshift({ name: \`ciurulLuiEratostene(n = 20)\`, file: 'main.cpp', line: activeLine });
      if (stepIndex >= 2) inlineVal = \`p: \${p}\${iVal !== null ? \`, i: \${iVal}\` : ''}\`;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let p = 2;
      if (stepIndex >= 14) p = 3;
      if (stepIndex >= 21) p = 4;
      if (stepIndex >= 23) p = 5;

      if (lineNum === 10) return \`p: \${p}\`;
      
      let iVal = null;
      if (stepIndex >= 4 && stepIndex <= 13) {
        iVal = stepIndex === 4 ? 4 : 4 + (stepIndex - 5) * 2;
      } else if (stepIndex >= 16 && stepIndex <= 20) {
        iVal = stepIndex === 16 ? 9 : 9 + (stepIndex - 17) * 3;
      }
      
      if ((lineNum === 12 || lineNum === 13) && iVal !== null) {
        return \`i: \${iVal}\`;
      }
      return null;
    }
  }`,
  'dashboard/src/data/categories/Math_Geometry/Geometry/Computational.js': `  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;
      
      globalVars.push({ name: 'A', type: 'Point', val: '{1, 1}', expandable: false });
      globalVars.push({ name: 'B', type: 'Point', val: '{3, 3}', expandable: false });
      
      let cpResult = 0;
      let cName = 'C_Coliniar';
      if (stepIndex <= 8) { cName = 'C_Coliniar'; cpResult = 0; }
      else if (stepIndex <= 14) { cName = 'C_Stanga'; cpResult = 4; }
      else { cName = 'C_Dreapta'; cpResult = -4; }
      
      vars.push({ name: cName, type: 'Point', val: cName === 'C_Coliniar' ? '{5,5}' : cName === 'C_Stanga' ? '{2,4}' : '{4,2}', expandable: false });
      if (stepIndex >= 4) vars.push({ name: 'cp', type: 'long long', val: cpResult, expandable: false });
      
      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });
      if (stepIndex >= 4 && stepIndex <= 7) frames.unshift({ name: \`crossProduct(A, B, \${cName})\`, file: 'main.cpp', line: activeLine });
      if (stepIndex >= 10 && stepIndex <= 13) frames.unshift({ name: \`crossProduct(A, B, \${cName})\`, file: 'main.cpp', line: activeLine });
      if (stepIndex >= 16 && stepIndex <= 19) frames.unshift({ name: \`crossProduct(A, B, \${cName})\`, file: 'main.cpp', line: activeLine });
      
      inlineVal = stepIndex >= 4 ? \`cp: \${cpResult}\` : null;
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      if ((lineNum === 24 || lineNum === 28) && stepIndex >= 8) return 'cp1: 0';
      if ((lineNum === 25 || lineNum === 29) && stepIndex >= 14) return 'cp2: 4';
      if ((lineNum === 26 || lineNum === 30) && stepIndex >= 20) return 'cp3: -4';
      return null;
    }
  }`
};

Object.entries(filesToUpdate).forEach(([relPath, newDebuggerBlock]) => {
  const filePath = path.resolve(relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${relPath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the debugger block in content.
  // Match "debugger": { ... } at the end of the export const data object.
  const regex = /"debugger"\s*:\s*\{[\s\S]*\}\s*(?=\}\s*;?\s*$)/;
  if (regex.test(content)) {
    content = content.replace(regex, newDebuggerBlock);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated debugger block in ${relPath}`);
  } else {
    console.error(`Could not locate debugger block in ${relPath}`);
  }
});
