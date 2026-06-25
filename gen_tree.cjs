const fs = require('fs');

const path = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Tree_Diameter.js';
let content = fs.readFileSync(path, 'utf8');

const n = 6;
const adj = [
    [],
    [2],
    [1, 3, 4],
    [2, 5],
    [2, 6],
    [3],
    [4]
];

let steps = [];
let explanations = [];
let debuggerStates = [];

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let bfsCallCount = 0;

function bfs(start, callerLine) {
    bfsCallCount++;
    let callName = bfsCallCount === 1 ? "BFS 1" : "BFS 2";
    
    let dist = [-1, -1, -1, -1, -1, -1, -1];
    let q = [];
    
    let locals = {
        start, n, p1: bfsCallCount === 2 ? { first: 5, second: 3 } : null, p2: null, diameter: null,
        farthest_node: null, max_dist: null, u: null, v: null
    };

    function addStep(line, text) {
        explanations.push({
            line,
            text,
            blocksVisual: [
                {
                    label: callName,
                    groups: [
                        [{ val: `q = [${q.join(',')}]` }]
                    ]
                }
            ]
        });

        let stackFrames = [
            { name: `bfs(start=${start}, n=6, adj)`, file: "solution.cpp", line },
            { name: "getTreeDiameter(n=6, adj)", file: "solution.cpp", line: callerLine },
            { name: "main()", file: "main.cpp", line: 81 }
        ];

        debuggerStates.push({
            line,
            locals: clone(locals),
            dist: clone(dist),
            q: clone(q),
            stackFrames,
            bfsCallCount,
            activeNode: locals.u || -1
        });
    }

    addStep(35, `Intrăm în funcția BFS (${callName}) începând din nodul de start $start = ${start}$. Scopul este să determinăm distanțele minime de la acest nod la toate celelalte noduri.`);

    addStep(36, `Inițializăm vectorul de distanțe dist cu valoarea -1, considerând toate nodurile ca fiind inițial nevizitate.`);

    addStep(37, `Inițializăm coada de priorități q, utilizată pentru a asigura parcurgerea în lățime a arborelui.`);

    dist[start] = 0;
    addStep(39, `Setăm distanța de pornire pentru nodul de start la 0: dist[${start}] = 0.`);

    q.push(start);
    addStep(40, `Adăugăm nodul de start ${start} în coada q pentru a iniția explorarea vecinilor săi.`);

    locals.farthest_node = start;
    addStep(42, `Inițializăm cel mai îndepărtat nod detectat până acum ca fiind chiar nodul de start: farthest_node = ${start}.`);

    locals.max_dist = 0;
    addStep(43, `Inițializăm distanța maximă găsită până în acest moment: max_dist = 0.`);

    while (q.length > 0) {
        addStep(45, `Verificăm condiția buclei: !q.empty(). Deoarece coada conține ${q.length} elemente, condiția este adevărată, deci continuăm parcurgerea.`);

        let u = q[0];
        locals.u = u;
        addStep(46, `Extragem nodul din fața cozii: u = q.front() = ${u}. Distanța sa actuală este dist[${u}] = ${dist[u]}.`);

        q.shift();
        addStep(47, `Eliminăm nodul ${u} din coadă (operația pop).`);

        addStep(49, `Verificăm dacă distanța până la nodul curent dist[${u}] = ${dist[u]} este mai mare decât distanța maximă de până acum (max_dist = ${locals.max_dist}). Condiția ${dist[u]} > ${locals.max_dist} este ${dist[u] > locals.max_dist ? "Adevărată" : "Falsă"}.`);
        if (dist[u] > locals.max_dist) {
            locals.max_dist = dist[u];
            addStep(50, `Actualizăm distanța maximă la noua valoare găsită: max_dist = ${dist[u]}.`);

            locals.farthest_node = u;
            addStep(51, `Actualizăm cel mai îndepărtat nod găsit: farthest_node = ${u}.`);
        }

        for (let i = 0; i < adj[u].length; i++) {
            let v = adj[u][i];
            locals.v = v;
            addStep(54, `Parcurgem vecinul v = ${v} al nodului curent u = ${u} din lista de adiacență.`);

            addStep(55, `Verificăm dacă vecinul v = ${v} a fost deja vizitat: dist[v] == -1. Condiția dist[${v}] == -1 este ${dist[v] === -1 ? 'Adevărată (este nevizitat)' : 'Falsă (este deja vizitat)'}.`);
            if (dist[v] === -1) {
                dist[v] = dist[u] + 1;
                addStep(56, `Calculăm și actualizăm distanța pentru nodul vecin: dist[${v}] = dist[${u}] + 1 = ${dist[v]}.`);

                q.push(v);
                addStep(57, `Adăugăm vecinul ${v} în coadă pentru a fi explorat în etapele următoare.`);
            }
        }
    }

    addStep(45, `Verificăm condiția buclei: !q.empty(). Deoarece coada este goală, condiția este Falsă, deci finalizăm parcurgerea BFS.`);
    addStep(61, `Parcurgerea BFS s-a terminat. Returnăm perechea {farthest_node, max_dist} = {${locals.farthest_node}, ${locals.max_dist}}.`);
    return { first: locals.farthest_node, second: locals.max_dist };
}

// MAIN
function mainGen() {
    let locals = { n: 6, p1: null, p2: null, diameter: null };

    function addMainStep(line, text, frameName = "main()", file="main.cpp") {
        explanations.push({
            line,
            text,
            blocksVisual: [
                {
                    label: "Main",
                    groups: [
                        [{ val: `n = 6` }]
                    ]
                }
            ]
        });

        let stackFrames = [{ name: frameName, file, line }];
        if (frameName.startsWith("getTreeDiameter")) {
            stackFrames.push({ name: "main()", file: "main.cpp", line: 81 });
        }

        debuggerStates.push({
            line,
            locals: clone(locals),
            stackFrames,
            bfsCallCount: 0
        });
    }

    addMainStep(81, `Apelăm funcția getTreeDiameter(n=6, adj) din main pentru a calcula diametrul arborelui.`);

    // In getTreeDiameter
    addMainStep(65, `Intrăm în getTreeDiameter. Verificăm cazul de bază n <= 1. Deoarece n = 6, condiția 6 <= 1 este Falsă, deci continuăm.`, `getTreeDiameter(n=6, adj)`, "solution.cpp");

    addMainStep(66, `Apelăm primul BFS din nodul de start arbitrar 1: bfs(1, n, adj), pentru a determina un nod de pe extremitatea diametrului.`, `getTreeDiameter(n=6, adj)`, "solution.cpp");
    let p1 = bfs(1, 66);
    locals.p1 = p1;

    addMainStep(67, `Primul BFS a terminat și a returnat perechea {${p1.first}, ${p1.second}}. Nodul cel mai îndepărtat de 1 este ${p1.first}. Apelăm al doilea BFS pornind din nodul ${p1.first} pentru a afla diametrul maxim: bfs(${p1.first}, n, adj).`, `getTreeDiameter(n=6, adj)`, "solution.cpp");
    let p2 = bfs(p1.first, 67);
    locals.p2 = p2;

    addMainStep(68, `Al doilea BFS a terminat și a returnat perechea {${p2.first}, ${p2.second}}. Diametrul arborelui este distanța maximă găsită: p2.second = ${p2.second}. Returnăm această valoare.`, `getTreeDiameter(n=6, adj)`, "solution.cpp");
    locals.diameter = p2.second;

    addMainStep(82, `Afișăm rezultatul final în consolă: diametrul arborelui este ${locals.diameter}.`);
    addMainStep(83, `Programul se încheie cu succes, returnând 0.`);
}

mainGen();

let debuggerStateFunction = `
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = state.stackFrames;
      
      if (state.bfsCallCount === 0) {
          vars.push({ name: "n", type: "int", val: "6" });
          if (locals.p1) vars.push({ name: "p1", type: "pair<int,int>", val: \`{\${locals.p1.first}, \${locals.p1.second}}\` });
          if (locals.p2) vars.push({ name: "p2", type: "pair<int,int>", val: \`{\${locals.p2.first}, \${locals.p2.second}}\` });
          if (locals.diameter) vars.push({ name: "diameter", type: "int", val: locals.diameter.toString() });
      } else {
          vars.push({ name: "start", type: "int", val: locals.start.toString() });
          vars.push({ name: "n", type: "int", val: "6" });
          vars.push({ name: "dist", type: "vector<int>", val: "size = 7", expandable: true });
          vars.push({ name: "q", type: "queue<int>", val: \`[\${state.q.join(',')}]\` });
          if (locals.farthest_node !== null) vars.push({ name: "farthest_node", type: "int", val: locals.farthest_node.toString() });
          if (locals.max_dist !== null) vars.push({ name: "max_dist", type: "int", val: locals.max_dist.toString() });
          if (locals.u !== null) vars.push({ name: "u", type: "int", val: locals.u.toString() });
          if (locals.v !== null) vars.push({ name: "v", type: "int", val: locals.v.toString() });
      }

      let inlineVal = null;
      if (state.bfsCallCount > 0 && locals.u !== null && activeLine >= 46 && activeLine <= 60) {
          inlineVal = \`u: \${locals.u}\`;
          if (locals.v !== null && activeLine >= 54) inlineVal += \`, v: \${locals.v}\`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (state.bfsCallCount > 0) {
          if (lineNum === 46) return locals.u !== null ? \`u: \${locals.u}\` : null;
          if (lineNum === 54) return locals.v !== null ? \`v: \${locals.v}\` : null;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      
      const staticNodes = [
        { id: "1", x: 160, y: 170, label: "1" },
        { id: "2", x: 160, y: 100, label: "2" },
        { id: "3", x: 100, y: 100, label: "3" },
        { id: "4", x: 220, y: 100, label: "4" },
        { id: "5", x: 40, y: 100, label: "5" },
        { id: "6", x: 280, y: 100, label: "6" }
      ];
      const staticEdges = [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "2", target: "4" },
        { source: "3", target: "5" },
        { source: "4", target: "6" }
      ];

      let activeNode = state.activeNode || -1;
      let visitedNodes = [];
      let diameterNodes = [];

      if (state.bfsCallCount === 1) {
          for (let i = 1; i <= 6; i++) {
              if (state.dist[i] !== -1) visitedNodes.push(i);
          }
      } else if (state.bfsCallCount === 2) {
          for (let i = 1; i <= 6; i++) {
              if (state.dist[i] !== -1) visitedNodes.push(i);
          }
      }

      if (state.line === 82 || state.line === 83) {
          diameterNodes = [5, 3, 2, 4, 6];
          activeNode = -1;
          visitedNodes = [];
      }

      return {
        directed: false,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let nState = undefined;
          if (diameterNodes.includes(idNum)) nState = "active";
          else if (idNum === activeNode) nState = "active";
          else if (visitedNodes.includes(idNum)) nState = "visited";
          
          let desc = "";
          if (state.dist && state.dist[idNum] !== undefined && state.dist[idNum] !== -1) {
              desc = \`d=\${state.dist[idNum]}\`;
          }
          return { ...n, state: nState, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          const active = (diameterNodes.includes(u) && diameterNodes.includes(v)) || (u === activeNode || v === activeNode);
          return { ...e, active };
        })
      };
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
console.log("Updated Tree_Diameter.js");
