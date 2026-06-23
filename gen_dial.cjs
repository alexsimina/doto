const fs = require('fs');

const path = 'c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Dial.js';
let content = fs.readFileSync(path, 'utf8');

const n = 4;
const INF = 1000000000;
let dist = [INF, INF, INF, INF, INF];
let max_weight = 7;
let num_buckets = n * max_weight + 1;
let buckets = Array.from({ length: num_buckets }, () => []);

let adj = [
    [],
    [{to: 2, weight: 2}, {to: 3, weight: 4}],
    [{to: 3, weight: 1}, {to: 4, weight: 7}],
    [{to: 4, weight: 3}],
    []
];

let steps = [];
let explanations = [];
let debuggerStates = [];
let idx = 0;
let count = 0;

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getBlocksVisual() {
    let bs = [];
    for (let i = 0; i <= 6; i++) {
        let b = buckets[i];
        bs.push({ val: `B[${i}]: {${b.join(',')}}`, active: i === idx });
    }
    return [
        {
            label: `Buckets (0..6) - idx=${idx}`,
            groups: [bs]
        }
    ];
}

function addStep(line, text, stateVars, uVal = -1) {
    explanations.push({
        line,
        text,
        blocksVisual: getBlocksVisual()
    });

    let locals = clone(stateVars);
    debuggerStates.push({
        line,
        locals,
        dist: clone(dist),
        uVal,
        bucketsStr: buckets.slice(0, 7).map(b => b.join(','))
    });
}

// MAIN
let locals = {
    src: 1, n: 4, max_weight: 7,
    num_buckets: null, idx: null, count: null, u: null,
    v: null, weight: null
};

addStep(86, "Apelăm dial(1, 4, adj, 7).", locals);

addStep(39, "Inițializăm dist[i] = INF.", locals);

dist[1] = 0;
addStep(40, "dist[1] = 0.", locals);

locals.num_buckets = num_buckets;
addStep(43, `num_buckets = 29.`, locals);

addStep(44, "Inițializăm vectorul buckets.", locals);

buckets[0].push(1);
addStep(46, "buckets[0].push_back(1).", locals);

locals.idx = 0;
addStep(47, "idx = 0.", locals);

locals.count = 0;
addStep(49, "Începe bucla (count = 0 < 4).", locals);

while (locals.count < n) {
    addStep(51, `Căutăm următorul bucket ne-vid de la idx=${idx}.`, locals);
    while (idx < num_buckets && buckets[idx].length === 0) {
        idx++;
        locals.idx = idx;
        addStep(52, `idx=${idx}.`, locals);
    }

    addStep(55, `Verificăm idx == num_buckets.`, locals);
    if (idx === num_buckets) break;

    let u = buckets[idx][0];
    locals.u = u;
    addStep(57, `u = buckets[${idx}].front() = ${u}.`, locals, u);

    buckets[idx].shift();
    addStep(58, `buckets[${idx}].pop_front().`, locals, u);

    locals.count++;
    addStep(60, `count devine ${locals.count}.`, locals, u);

    for (let i = 0; i < adj[u].length; i++) {
        let edge = adj[u][i];
        locals.v = edge.to;
        locals.weight = edge.weight;
        addStep(62, `Parcurgem vecinii lui ${u}. Vectorul v=${edge.to}, weight=${edge.weight}.`, locals, u);

        addStep(66, `Verificăm dacă dist[${u}] + ${edge.weight} < dist[${edge.to}]. (${dist[u] + edge.weight} < ${dist[edge.to] === INF ? "INF" : dist[edge.to]}).`, locals, u);
        if (dist[u] + edge.weight < dist[edge.to]) {
            addStep(67, `Verificăm dacă dist[${edge.to}] != INF.`, locals, u);
            if (dist[edge.to] !== INF) {
                let oldD = dist[edge.to];
                buckets[oldD] = buckets[oldD].filter(x => x !== edge.to);
                addStep(68, `Eliminăm nodul ${edge.to} din bucket[${oldD}].`, locals, u);
            }

            dist[edge.to] = dist[u] + edge.weight;
            addStep(71, `dist[${edge.to}] = ${dist[edge.to]}.`, locals, u);

            buckets[dist[edge.to]].push(edge.to);
            addStep(72, `Adăugăm ${edge.to} în bucket[${dist[edge.to]}].`, locals, u);
        }
    }
}

addStep(76, "Returnăm vectorul dist.", locals);
addStep(87, "Afișăm distanțele în main().", locals);
addStep(91, "Program finalizat.", locals);

let debuggerStateFunction = `
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      const vars = [];
      const globalVars = [];
      const frames = [];
      
      if (activeLine >= 80 && activeLine <= 91 && activeLine !== 86) {
          frames.push({ name: "main()", file: "main.cpp", line: activeLine });
          vars.push({ name: "n", type: "int", val: "4" });
          if (activeLine > 86) vars.push({ name: "dist", type: "vector<int>", val: "size = 5", expandable: true });
      } else {
          frames.push({ name: "dial(src, n, adj, max_weight)", file: "solution.cpp", line: activeLine });
          frames.push({ name: "main()", file: "main.cpp", line: 86 });
          
          vars.push({ name: "src", type: "int", val: "1" });
          vars.push({ name: "n", type: "int", val: "4" });
          vars.push({ name: "max_weight", type: "int", val: "7" });
          vars.push({ name: "dist", type: "vector<int>", val: "size = 5", expandable: true });
          
          if (locals.num_buckets !== null) vars.push({ name: "num_buckets", type: "int", val: locals.num_buckets.toString() });
          if (locals.idx !== null) vars.push({ name: "idx", type: "int", val: locals.idx.toString() });
          if (locals.count !== null) vars.push({ name: "count", type: "int", val: locals.count.toString() });
          if (locals.u !== null) vars.push({ name: "u", type: "int", val: locals.u.toString() });
          if (locals.v !== null) vars.push({ name: "v", type: "int", val: locals.v.toString() });
          if (locals.weight !== null) vars.push({ name: "weight", type: "int", val: locals.weight.toString() });
      }

      globalVars.push({ name: "INF", type: "const int", val: "1e9" });

      let inlineVal = null;
      if (locals.u !== null && activeLine >= 57 && activeLine <= 74) {
          inlineVal = \`u: \${locals.u}\`;
          if (locals.v !== null) inlineVal += \`, v: \${locals.v}\`;
      }

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const locals = state.locals;
      if (lineNum === 57 || lineNum === 62) return locals.u !== null ? \`u: \${locals.u}\` : null;
      if (lineNum === 63) return locals.v !== null ? \`v: \${locals.v}\` : null;
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const states = ${JSON.stringify(debuggerStates)};
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      const dist = state.dist;
      let uVal = state.uVal;

      const staticNodes = [
        { id: "1", x: 50, y: 110, label: "1" },
        { id: "2", x: 150, y: 50, label: "2" },
        { id: "3", x: 150, y: 170, label: "3" },
        { id: "4", x: 250, y: 110, label: "4" }
      ];
      const staticEdges = [
        { source: "1", target: "2", weight: 2 },
        { source: "1", target: "3", weight: 4 },
        { source: "2", target: "3", weight: 1 },
        { source: "2", target: "4", weight: 7 },
        { source: "3", target: "4", weight: 3 }
      ];

      return {
        directed: true,
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let nState = undefined;
          if (idNum === uVal) nState = "active";
          else if (dist[idNum] < 1e9) nState = "visited";
          const desc = \`d=\${dist[idNum] >= 1e9 ? "INF" : dist[idNum]}\`;
          return { ...n, state: nState, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source);
          const active = (u === uVal);
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
console.log("Updated Dial.js");
