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

addStep(86, "Apelăm funcția dial(src=1, n=4, adj, max_weight=7) din main pentru a calcula drumurile minime din sursa 1.", locals);

addStep(39, "Inițializăm vectorul de distanțe dist cu valoarea infinită (INF = 1e9) pentru toate nodurile, considerându-le nevizitate.", locals);

dist[1] = 0;
addStep(40, "Setăm distanța minimă de la sursă la ea însăși la 0: dist[1] = 0.", locals);

locals.num_buckets = num_buckets;
addStep(43, `Calculăm numărul maxim de bucket-uri necesar: num_buckets = n * max_weight + 1 = 4 * 7 + 1 = 29.`, locals);

addStep(44, "Inițializăm vectorul buckets care conține 29 de sertare (liste) pentru a sorta nodurile în funcție de distanța lor actuală.", locals);

buckets[0].push(1);
addStep(46, "Adăugăm nodul sursă 1 în bucket-ul corespunzător distanței sale (0): buckets[0].", locals);

locals.idx = 0;
addStep(47, "Inițializăm indexul bucket-ului curent de unde vom începe căutarea: idx = 0.", locals);

locals.count = 0;
addStep(49, "Începe bucla principală. Verificăm condiția: count < n (0 < 4). Deoarece mai avem noduri nevizitate, intrăm în buclă.", locals);

while (locals.count < n) {
    addStep(51, `Căutăm următorul bucket ne-vid începând de la indexul idx = ${idx}.`, locals);
    while (idx < num_buckets && buckets[idx].length === 0) {
        idx++;
        locals.idx = idx;
        addStep(52, `Deoarece buckets[${idx-1}] este gol, incrementăm indexul căutării: idx = ${idx}.`, locals);
    }

    addStep(51, `Am găsit un bucket ne-vid la indexul idx = ${idx}. Oprim căutarea sertarelor.`, locals);

    addStep(55, `Verificăm dacă am depășit limitele sertarelor: idx == num_buckets (${idx} == 29). Condiția este Falsă, deci continuăm.`, locals);
    if (idx === num_buckets) break;

    let u = buckets[idx][0];
    locals.u = u;
    addStep(57, `Extragem primul nod din bucket-ul curent buckets[${idx}]: u = ${u}. Acesta este cel mai apropiat nod nevizitat.`, locals, u);

    buckets[idx].shift();
    addStep(58, `Eliminăm nodul u = ${u} din buckets[${idx}].`, locals, u);

    locals.count++;
    addStep(60, `Incrementăm numărul de noduri finalizate: count devine ${locals.count}.`, locals, u);

    for (let i = 0; i < adj[u].length; i++) {
        let edge = adj[u][i];
        locals.v = edge.to;
        locals.weight = edge.weight;
        addStep(62, `Explorăm vecinul v = ${edge.to} al nodului u = ${u}. Muchia are costul (ponderea) weight = ${edge.weight}.`, locals, u);

        addStep(66, `Verificăm dacă trecerea prin u oferă un drum mai scurt către vecinul v: dist[u] + weight < dist[v] (${dist[u]} + ${edge.weight} < ${dist[edge.to] === INF ? "INF" : dist[edge.to]}). Condiția este ${dist[u] + edge.weight < dist[edge.to] ? "Adevărată (relaxăm muchia)" : "Falsă (drumul existent este mai bun)"}.`, locals, u);
        if (dist[u] + edge.weight < dist[edge.to]) {
            addStep(67, `Verificăm dacă vecinul v = ${edge.to} avea deja o distanță finită (dist[v] != INF). Deoarece dist[${edge.to}] = ${dist[edge.to] === INF ? "INF" : dist[edge.to]}, condiția este ${dist[edge.to] !== INF ? 'Adevărată' : 'Falsă'}.`, locals, u);
            if (dist[edge.to] !== INF) {
                let oldD = dist[edge.to];
                buckets[oldD] = buckets[oldD].filter(x => x !== edge.to);
                addStep(68, `Deoarece vecinul avea o distanță mai veche, îl eliminăm din buckets[${oldD}].`, locals, u);
            }

            dist[edge.to] = dist[u] + edge.weight;
            addStep(71, `Actualizăm distanța minimă până la vecinul v = ${edge.to}: dist[${edge.to}] = ${dist[edge.to]} pași.`, locals, u);

            buckets[dist[edge.to]].push(edge.to);
            addStep(72, `Introducem vecinul v = ${edge.to} în noul bucket corespunzător noii sale distanțe: buckets[${dist[edge.to]}].`, locals, u);
        }
    }
}

if (locals.count >= n) {
    addStep(49, `Verificăm condiția buclei principale: count < n (${locals.count} < 4). Deoarece condiția este Falsă, finalizăm bucla.`, locals);
}

addStep(76, "Am parcurs toate nodurile accesibile. Returnăm vectorul final de distanțe minime dist.", locals);
addStep(87, "Revenim în main() și afișăm distanțele minime calculate de la sursa 1.", locals);
addStep(91, "Programul se încheie cu succes.", locals);

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
