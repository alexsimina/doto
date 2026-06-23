const fs = require('fs');
const path = require('path');

function generateDebuggerStateBody(trace) {
    const states = trace.map(t => ({
        vars: t.vars,
        frames: t.frames,
        inlineVal: t.inlineVal
    }));
    return `      const states = ${JSON.stringify(states, null, 2).replace(/\n/g, '\n      ')};
      if (stepIndex < 0) return { vars: [], globalVars: [], frames: [{ name: 'main()', file: 'main.cpp', line: activeLine || ${trace.length > 0 ? trace[0].line : 1} }], inlineVal: null };
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      const state = states[stepIndex];
      return { vars: state.vars, globalVars: [], frames: state.frames, inlineVal: state.inlineVal };`;
}

function generateInlineValueForLineBody(trace) {
    const states = trace.map(t => t.inlineValsByLine || {});
    return `      const states = ${JSON.stringify(states, null, 2).replace(/\n/g, '\n      ')};
      if (stepIndex < 0) return null;
      if (stepIndex >= states.length) stepIndex = states.length - 1;
      return states[stepIndex][lineNum] || null;`;
}

function processFile(filePath, simulateFn) {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const trace = simulateFn();
    
    const explanations = trace.map(t => {
        return `    {
      line: ${t.line},
      text: ${JSON.stringify(t.text)},
      blocksVisual: ${JSON.stringify(t.blocksVisual, null, 2).replace(/\n/g, '\n      ')}
    }`;
    }).join(',\n');
    
    const getDebuggerStateBody = generateDebuggerStateBody(trace);
    const getInlineValueForLineBody = generateInlineValueForLineBody(trace);
    
    let newContent = content.replace(/explanations:\s*\[[\s\S]*?\],\n\s*problems:/, `explanations: [\n${explanations}\n  ],\n  problems:`);
    newContent = newContent.replace(/"debugger":\s*\{[\s\S]*\}\s*\};?/, `"debugger": {\n    "getDebuggerState": (stepIndex, activeLine, explanationText) => {\n${getDebuggerStateBody}\n    },\n    "getInlineValueForLine": (stepIndex, lineNum) => {\n${getInlineValueForLineBody}\n    }\n  }\n}`);
    if (!newContent.endsWith(';')) newContent += ';';
    if (!newContent.endsWith('\n')) newContent += '\n';

    fs.writeFileSync(fullPath, newContent, 'utf8');
    console.log("Updated", filePath);
}

function createTraceEnv() {
    let trace = [];
    let vars = {};
    
    function addStep(line, text, blocksVisual, inlineValTemplate, customFrames = null) {
        let currentVars = [];
        let inlineValsByLine = {};
        
        for (const [name, v] of Object.entries(vars)) {
            currentVars.push({ name, type: v.type, val: v.val, expandable: v.expandable });
            if (v.line) {
                inlineValsByLine[v.line] = `${name}: ${v.val}`;
            }
        }
        
        let lineVars = {};
        for (const [name, v] of Object.entries(vars)) {
            if (v.line) {
                if (!lineVars[v.line]) lineVars[v.line] = [];
                lineVars[v.line].push(`${name}: ${v.val}`);
            }
        }
        for (const [ln, arr] of Object.entries(lineVars)) {
            inlineValsByLine[ln] = arr.join(', ');
        }
        
        let inlineVal = null;
        if (inlineValTemplate) {
            inlineVal = inlineValTemplate;
        } else if (lineVars[line]) {
            inlineVal = lineVars[line].join(', ');
        }
        
        let frames = customFrames || [{ name: 'main()', file: 'main.cpp', line }];
        
        trace.push({
            line,
            text,
            blocksVisual,
            vars: currentVars,
            frames,
            inlineVal,
            inlineValsByLine
        });
    }
    
    function setVar(name, type, val, line, expandable=false) {
        vars[name] = { type, val, line, expandable };
    }
    
    function delVar(name) {
        delete vars[name];
    }
    
    function clearVars() {
        vars = {};
    }
    
    return { trace, addStep, setVar, delVar, clearVars };
}

function traceBaseConversion() {
    const env = createTraceEnv();
    env.setVar('n', 'int', 13, 7);
    env.addStep(7, "Definim numărul zecimal $n = 13$ pe care dorim să-l convertim.", [{ label: "Input", groups: [[{ val: "n = 13", active: true }]] }]);
    env.setVar('base', 'int', 2, 8);
    env.addStep(8, "Definim baza în care dorim să facem conversia: $base = 2$.", [{ label: "Bază", groups: [[{ val: "base = 2", active: true }]] }]);
    env.setVar('digits', 'std::vector<int>', '[]', 9, true);
    env.addStep(9, "Declarăm un vector $digits$ în care vom stoca cifrele reprezentării în baza $2$.", [{ label: "Vector Cifre", groups: [[{ val: "digits: []", active: true }]] }]);
    env.setVar('temp', 'int', 13, 11);
    let temp = 13;
    let base = 2;
    let digitsArr = [];
    env.addStep(11, "Copiem valoarea lui $n$ în variabila de lucru $temp$.", [{ label: "Copie", groups: [[{ val: "temp = 13", active: true }]] }]);
    
    while (true) {
        env.addStep(12, `Verificăm dacă $temp > 0$. $${temp} > 0$ este ${temp > 0 ? 'adevărat' : 'fals'}.`, [{ label: "Condiție", groups: [[{ val: `${temp} > 0 ? ${temp > 0 ? 'Da' : 'Fals'}`, active: true }]] }]);
        if (temp <= 0) break;
        let rem = temp % base;
        env.setVar('rem', 'int', rem, 13);
        env.addStep(13, `Calculăm restul împărțirii lui $temp$ la $base$: $${temp} \\pmod{${base}} = ${rem}$.`, [{ label: "Rest", groups: [[{ val: `rem = ${rem}`, active: true }], [{ val: `temp = ${temp}` }]] }]);
        digitsArr.push(rem);
        env.setVar('digits', 'std::vector<int>', `[${digitsArr.join(', ')}]`, 14, true);
        env.addStep(14, `Adăugăm restul obținut ($${rem}$) la finalul vectorului $digits$.`, [{ label: "Vector Cifre", groups: [[{ val: `digits: [${digitsArr.join(', ')}]`, active: true }]] }]);
        temp = Math.floor(temp / base);
        env.setVar('temp', 'int', temp, 15);
        env.addStep(15, `Împărțim întreagă valoarea lui $temp$ la $base$: $temp = ${temp}$.`, [{ label: "Actualizare", groups: [[{ val: `temp = ${temp}`, active: true }]] }]);
        env.delVar('rem');
    }
    
    env.setVar('num_digits', 'int', digitsArr.length, 18);
    env.addStep(18, "Salvăm lungimea vectorului de cifre pentru afișare/analiză.", [{ label: "Rezultat", groups: [[{ val: `num_digits = ${digitsArr.length}`, active: true }]] }]);
    env.addStep(19, "Programul se încheie cu succes.", [{ label: "Final", groups: [[{ val: "return 0", active: true }]] }]);
    return env.trace;
}

function traceDigits() {
    const env = createTraceEnv();
    env.setVar('n', 'int', 358, 6);
    env.addStep(6, "Inițializăm numărul $n$ cu valoarea $358$ pe care îl vom procesa.", [{ label: "Variabile", groups: [[{ val: "n = 358", active: true }]] }]);
    env.setVar('sum', 'int', 0, 7);
    env.addStep(7, "Inițializăm variabila $sum$ cu $0$. Aceasta va acumula suma cifrelor.", [{ label: "Stare", groups: [[{ val: "n = 358" }], [{ val: "sum = 0", active: true }]] }]);
    env.setVar('reversed', 'int', 0, 8);
    env.addStep(8, "Inițializăm $reversed$ cu $0$. Aici vom construi inversul (răsturnatul) numărului.", [{ label: "Stare", groups: [[{ val: "sum = 0" }], [{ val: "reversed = 0", active: true }]] }]);
    env.setVar('temp', 'int', 358, 9);
    env.addStep(9, "Copiem valoarea lui $n$ în $temp$ pentru a nu distruge valoarea inițială în timpul procesării.", [{ label: "Stare", groups: [[{ val: "temp = 358", active: true }], [{ val: "sum = 0" }], [{ val: "reversed = 0" }]] }]);
    
    let temp = 358;
    let sum = 0;
    let reversed = 0;
    
    while (true) {
        env.addStep(11, `Verificăm dacă $temp > 0$. $${temp} > 0$ este ${temp > 0 ? 'adevărat' : 'fals'}.`, [{ label: "Condiție", groups: [[{ val: `${temp} > 0 ? ${temp > 0 ? 'Da' : 'Fals'}`, active: true }]] }]);
        if (temp <= 0) break;
        let digit = temp % 10;
        env.setVar('digit', 'int', digit, 12);
        env.addStep(12, `Extragem ultima cifră a lui $temp$: $${temp} \\pmod{10} = ${digit}$.`, [{ label: "Cifră extrasă", groups: [[{ val: `digit = ${digit}`, active: true }], [{ val: `temp = ${temp}` }]] }]);
        sum += digit;
        env.setVar('sum', 'int', sum, 7);
        env.addStep(13, `Adăugăm cifra $${digit}$ la suma cifrelor: sum devine $${sum}$.`, [{ label: "Suma actualizată", groups: [[{ val: `sum = ${sum}`, active: true }]] }]);
        reversed = reversed * 10 + digit;
        env.setVar('reversed', 'int', reversed, 8);
        env.addStep(14, `Actualizăm răsturnatul: reversed devine $${reversed}$.`, [{ label: "Răsturnat actualizat", groups: [[{ val: `reversed = ${reversed}`, active: true }]] }]);
        temp = Math.floor(temp / 10);
        env.setVar('temp', 'int', temp, 9);
        env.addStep(15, `Eliminăm ultima cifră a lui $temp$ prin împărțirea la $10$: $temp = ${temp}$.`, [{ label: "Valoare rămasă", groups: [[{ val: `temp = ${temp}`, active: true }]] }]);
        env.delVar('digit');
    }
    
    env.addStep(18, "Finalizăm programul cu succes.", [{ label: "Final", groups: [[{ val: "return 0", active: true }]] }]);
    return env.trace;
}

function traceFunctions() {
    const env = createTraceEnv();
    env.setVar('a', 'int', 5, 16);
    env.addStep(16, "Inițializăm variabila $a$ cu valoarea $5$. Aceasta va fi transmisă prin valoare.", [{ label: "Funcția main", groups: [[{ val: "a = 5", active: true }, { val: "b = ?" }]] }]);
    env.setVar('b', 'int', 5, 17);
    env.addStep(17, "Inițializăm variabila $b$ cu valoarea $5$. Aceasta va fi transmisă prin referință.", [{ label: "Funcția main", groups: [[{ val: "a = 5" }, { val: "b = 5", active: true }]] }]);
    
    env.addStep(19, "Apelăm funcția `incrementByValue(a)`. Se creează o copie a valorii lui $a$ pe stivă.", [{ label: "Apel incrementByValue", groups: [[{ val: "a = 5 (în main)" }], [{ val: "Parametru x = 5 (copie pe stivă)", active: true }]] }]);
    
    let a = 5;
    let b = 5;
    
    // push incrementByValue frame
    let varsOld = JSON.parse(JSON.stringify(env.trace[env.trace.length-1].vars));
    env.clearVars();
    env.setVar('x', 'int', 5, 6);
    env.addStep(6, "Suntem în corpul funcției `incrementByValue`. Parametrul $x$ are valoarea copiată $5$.", [{ label: "În incrementByValue", groups: [[{ val: "x = 5", active: true }]] }], null, [{name:'incrementByValue(int)', file:'main.cpp', line:6}, {name:'main()', file:'main.cpp', line:19}]);
    env.setVar('x', 'int', 6, 7);
    env.addStep(7, "Incrementăm variabila locală $x$. Aceasta devine $6$.", [{ label: "În incrementByValue", groups: [[{ val: "x = 6", active: true }]] }], null, [{name:'incrementByValue(int)', file:'main.cpp', line:7}, {name:'main()', file:'main.cpp', line:19}]);
    env.addStep(8, "Funcția se încheie și copia locală $x$ este ștearsă din memorie. Revenim în main.", [{ label: "Revenire în main", groups: [[{ val: "a = 5", active: true }], [{ val: "b = 5" }]] }], null, [{name:'incrementByValue(int)', file:'main.cpp', line:8}, {name:'main()', file:'main.cpp', line:19}]);
    
    // pop frame
    env.clearVars();
    env.setVar('a', 'int', a, 16);
    env.setVar('b', 'int', b, 17);
    env.addStep(20, "Apelăm `incrementByReference(b)`. Nu se face o copie; funcția va opera direct pe variabila $b$.", [{ label: "Apel incrementByReference", groups: [[{ val: "b = 5 (în main)" }], [{ val: "Referința x pointează către b", active: true }]] }]);
    
    // push incrementByReference frame
    env.clearVars();
    env.setVar('x', 'int&', '&b (value: 5)', 11);
    env.addStep(11, "Suntem în `incrementByReference`. Parametrul $x$ este o poreclă (alias) pentru variabila $b$ din main.", [{ label: "În incrementByReference", groups: [[{ val: "x (alias pentru b) = 5", active: true }]] }], null, [{name:'incrementByReference(int&)', file:'main.cpp', line:11}, {name:'main()', file:'main.cpp', line:20}]);
    b = 6;
    env.setVar('x', 'int&', '&b (value: 6)', 12);
    env.addStep(12, "Incrementăm valoarea de la referința $x$. Deoarece $x$ este legat direct de $b$, valoarea lui $b$ din main devine $6$.", [{ label: "În incrementByReference", groups: [[{ val: "x (alias pentru b) = 6", active: true }]] }], null, [{name:'incrementByReference(int&)', file:'main.cpp', line:12}, {name:'main()', file:'main.cpp', line:20}]);
    env.addStep(13, "Funcția se încheie. Revenim în main.", [{ label: "Revenire în main", groups: [[{ val: "a = 5" }], [{ val: "b = 6", active: true }]] }], null, [{name:'incrementByReference(int&)', file:'main.cpp', line:13}, {name:'main()', file:'main.cpp', line:20}]);
    
    // pop frame
    env.clearVars();
    env.setVar('a', 'int', a, 16);
    env.setVar('b', 'int', b, 17);
    env.addStep(22, "Finalizăm programul cu succes. Se observă că $a$ a rămas $5$, în timp ce $b$ a devenit $6$.", [{ label: "Stare Finală", groups: [[{ val: "a = 5" }], [{ val: "b = 6" }]] }]);

    return env.trace;
}

function traceSTL() {
    const env = createTraceEnv();
    env.setVar('v', 'std::vector<int>', '[]', 11, true);
    env.addStep(11, "Declarăm un vector de numere întregi $v$, inițial gol.", [{ label: "Vector v", groups: [[{ val: "v: []", active: true }]] }]);
    env.setVar('v', 'std::vector<int>', '[10]', 12, true);
    env.addStep(12, "Adăugăm elementul $10$ la finalul vectorului folosind `push_back`. Dimensiunea vectorului devine $1$.", [{ label: "Vector v", groups: [[{ val: "10", active: true }]] }]);
    env.setVar('p', 'std::pair<int, string>', '{first: 1, second: "unu"}', 15, true);
    env.addStep(15, "Inițializăm perechea $p$ cu valorile $1$ (pe prima poziție, `.first`) și `\"unu\"` (pe a doua poziție, `.second`).", [{ label: "Pereche p", groups: [[{ val: "first: 1", active: true }, { val: "second: \"unu\"", active: true }]] }]);
    env.setVar('s', 'std::set<int>', '{}', 18, true);
    env.addStep(18, "Declarăm o mulțime ordonată $s$ pentru a păstra elemente întregi unice. În acest moment este goală.", [{ label: "Mulțime s", groups: [[{ val: "s: {}", active: true }]] }]);
    env.setVar('s', 'std::set<int>', '{5}', 19, true);
    env.addStep(19, "Inserăm valoarea $5$ în mulțime. $s$ devine $\\{5\\}$.", [{ label: "Mulțime s", groups: [[{ val: "5", active: true }]] }]);
    env.addStep(20, "Încercăm să inserăm din nou valoarea $5$. Deoarece elementele într-un `std::set` trebuie să fie unice, inserarea este ignorată. Mulțimea rămâne $\\{5\\}$.", [{ label: "Mulțime s (ignorat duplicat)", groups: [[{ val: "5" }]] }]);
    env.setVar('m', 'std::map<string, int>', '{}', 23, true);
    env.addStep(23, "Declarăm un dicționar $m$ care asociază chei de tip șir de caractere cu valori întregi.", [{ label: "Dicționar m", groups: [[{ val: "m: {}", active: true }]] }]);
    env.setVar('m', 'std::map<string, int>', '{"mere": 3}', 24, true);
    env.addStep(24, "Asociem cheii `\"mere\"` valoarea $3$. Dacă cheia nu exista, ea este creată.", [{ label: "Dicționar m", groups: [[{ val: "\"mere\" -> 3", active: true }]] }]);
    env.setVar('val', 'int', 10, 26);
    env.addStep(26, "Accesăm primul element din vector: $v[0] = 10$.", [{ label: "Citire Vector", groups: [[{ val: "val = 10", active: true }]] }]);
    env.setVar('count', 'int', 1, 27);
    env.addStep(27, "Obținem dimensiunea mulțimii $s$ folosind funcția `size()`. Valoarea returnată este $1$, deoarece duplicatul a fost ignorat.", [{ label: "Dimensiune Mulțime", groups: [[{ val: "count = 1", active: true }]] }]);
    env.setVar('mere_count', 'int', 3, 28);
    env.addStep(28, "Căutăm și citim valoarea asociată cheii `\"mere\"` în dicționar. Obținem valoarea $3$.", [{ label: "Citire Dicționar", groups: [[{ val: "mere_count = 3", active: true }]] }]);
    env.addStep(30, "Finalizăm programul cu succes.", [{ label: "Final", groups: [[{ val: "return 0", active: true }]] }]);
    return env.trace;
}

function traceSimulations() {
    const env = createTraceEnv();
    let r = 1;
    let c = 1;
    env.setVar('row', 'int', 1, 9);
    env.addStep(9, "Inițializăm linia de pornire a robotului: $row = 1$ (centrul unei matrice $3 \\times 3$).", [{ label: "Poziție Robot", groups: [[{ val: "row = 1", active: true }, { val: "col = ?" }]] }]);
    env.setVar('col', 'int', 1, 10);
    env.addStep(10, "Inițializăm coloana de pornire a robotului: $col = 1$.", [{ label: "Poziție Robot", groups: [[{ val: "row = 1" }, { val: "col = 1", active: true }]] }]);
    env.setVar('commands', 'std::string', '"RULD"', 13);
    env.addStep(13, "Definim șirul de comenzi de mișcare: $commands = \"RULD\"$ (Dreapta, Sus, Stânga, Jos).", [{ label: "Comenzi de rulat", groups: [[{ val: "R", active: true }, { val: "U" }, { val: "L" }, { val: "D" }]] }]);
    
    let cmds = ['R', 'U', 'L', 'D'];
    for(let i=0; i<cmds.length; i++) {
        let cmd = cmds[i];
        env.setVar('cmd', 'char', `'${cmd}'`, 15);
        env.addStep(15, `Citim comanda: $cmd = '${cmd}'$.`, [{ label: "Comandă curentă", groups: [[{ val: `cmd = '${cmd}'`, active: true }]] }]);
        
        env.addStep(16, `Verificăm \`cmd == 'U' && row > 0\`.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'U' ? ${cmd == 'U' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'U' && r > 0) {
            r--;
            env.setVar('row', 'int', r, 9);
            env.addStep(17, `Mutăm robotul în sus prin decrementarea liniei: $row = ${r}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}`, active: true }, { val: `col = ${c}` }]] }]);
            continue;
        }
        
        env.addStep(18, `Verificăm \`cmd == 'D' && row < 2\`.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'D' ? ${cmd == 'D' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'D' && r < 2) {
            r++;
            env.setVar('row', 'int', r, 9);
            env.addStep(19, `Mutăm robotul în jos prin incrementarea liniei: $row = ${r}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}`, active: true }, { val: `col = ${c}` }]] }]);
            continue;
        }
        
        env.addStep(20, `Verificăm \`cmd == 'L' && col > 0\`.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'L' ? ${cmd == 'L' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'L' && c > 0) {
            c--;
            env.setVar('col', 'int', c, 10);
            env.addStep(21, `Mutăm robotul la stânga prin decrementarea coloanei: $col = ${c}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}` }, { val: `col = ${c}`, active: true }]] }]);
            continue;
        }
        
        env.addStep(22, `Verificăm \`cmd == 'R' && col < 2\`.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'R' ? ${cmd == 'R' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'R' && c < 2) {
            c++;
            env.setVar('col', 'int', c, 10);
            env.addStep(23, `Mutăm robotul la dreapta prin incrementarea coloanei: $col = ${c}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}` }, { val: `col = ${c}`, active: true }]] }]);
            continue;
        }
    }
    
    env.delVar('cmd');
    env.addStep(27, "Finalizăm simularea cu robotul revenit la poziția de start $(1, 1)$.", [{ label: "Poziție Finală", groups: [[{ val: `row = ${r}` }, { val: `col = ${c}` }]] }]);
    return env.trace;
}

function traceStreaming() {
    const env = createTraceEnv();
    env.setVar('stream', 'std::vector<int>', '{4, -2, 7, 0}', 8, true);
    env.addStep(8, "Definim un vector $stream$ pentru a simula citirea valorilor de la consolă.", [{ label: "Flux de intrare", groups: [[{ val: "4" }, { val: "-2" }, { val: "7" }, { val: "0 (stop)" }]] }]);
    env.setVar('sum', 'int', 0, 9);
    env.addStep(9, "Inițializăm suma numerelor pozitive cu $0$.", [{ label: "Suma", groups: [[{ val: "sum = 0", active: true }]] }]);
    env.setVar('count', 'int', 0, 10);
    env.addStep(10, "Inițializăm numărul de elemente pozitive găsite cu $0$.", [{ label: "Contor", groups: [[{ val: "count = 0", active: true }]] }]);
    
    let sum = 0;
    let count = 0;
    let vals = [4, -2, 7, 0];
    
    for (let x of vals) {
        env.setVar('x', 'int', x, 12);
        env.addStep(12, `Citim următorul număr din flux: $x = ${x}$.`, [{ label: "Element curent", groups: [[{ val: `x = ${x}`, active: true }]] }]);
        
        env.addStep(13, `Verificăm dacă $x$ este $0$. ${x == 0 ? 'Este adevărat.' : 'Nu este.'}`, [{ label: "Oprire?", groups: [[{ val: `${x} == 0 ? ${x == 0 ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (x == 0) {
            env.addStep(14, "Întrerupem bucla folosind instrucțiunea `break`.", [{ label: "Ieșire din buclă", groups: [[{ val: "break", active: true }]] }]);
            break;
        }
        
        env.addStep(16, `Verificăm dacă $x$ este pozitiv ($${x} > 0$). Este ${x > 0 ? 'adevărat' : 'fals'}.`, [{ label: "Verificare", groups: [[{ val: `${x} > 0 ? ${x > 0 ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (x > 0) {
            sum += x;
            env.setVar('sum', 'int', sum, 9);
            env.addStep(17, `Adunăm valoarea $${x}$ la suma totală: $sum = ${sum}$.`, [{ label: "Suma", groups: [[{ val: `sum = ${sum}`, active: true }]] }]);
            
            count++;
            env.setVar('count', 'int', count, 10);
            env.addStep(18, `Incrementăm contorul numerelor pozitive: $count = ${count}$.`, [{ label: "Contor", groups: [[{ val: `count = ${count}`, active: true }]] }]);
        }
    }
    env.delVar('x');
    env.addStep(22, `Finalizăm programul. Variabilele finale sunt $sum = ${sum}$ și $count = ${count}$.`, [{ label: "Stare finală", groups: [[{ val: `sum = ${sum}` }], [{ val: `count = ${count}` }]] }]);
    return env.trace;
}

function traceStructs() {
    const env = createTraceEnv();
    env.setVar('s1', 'Student', '{name: "", grade: 0}', 13, true);
    env.addStep(13, "Declarăm variabila $s1$ de tipul `Student`.", [{ label: "Student s1", groups: [[{ val: "name: \"\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s1', 'Student', '{name: "Alex", grade: 0}', 14, true);
    env.addStep(14, "Atribuim valoarea `\"Alex\"` membrului $name$ al structurii $s1$.", [{ label: "Student s1", groups: [[{ val: "name: \"Alex\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s1', 'Student', '{name: "Alex", grade: 9}', 15, true);
    env.addStep(15, "Atribuim valoarea $9$ membrului $grade$ al structurii $s1$.", [{ label: "Student s1", groups: [[{ val: "name: \"Alex\"" }, { val: "grade: 9", active: true }]] }]);
    
    env.setVar('s2', 'Student', '{name: "", grade: 0}', 17, true);
    env.addStep(17, "Declarăm variabila $s2$ de tipul `Student`.", [{ label: "Student s2", groups: [[{ val: "name: \"\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s2', 'Student', '{name: "Maria", grade: 0}', 18, true);
    env.addStep(18, "Setăm numele studentului $s2$ ca fiind `\"Maria\"`.", [{ label: "Student s2", groups: [[{ val: "name: \"Maria\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s2', 'Student', '{name: "Maria", grade: 10}', 19, true);
    env.addStep(19, "Setăm nota studentului $s2$ ca fiind $10$.", [{ label: "Student s2", groups: [[{ val: "name: \"Maria\"" }, { val: "grade: 10", active: true }]] }]);
    
    env.setVar('classList', 'std::vector<Student>', '[]', 21, true);
    env.addStep(21, "Declarăm un vector $classList$ capabil să stocheze elemente de tipul `Student`.", [{ label: "Listă Clasă", groups: [[{ val: "classList: []", active: true }]] }]);
    env.setVar('classList', 'std::vector<Student>', '[{name: "Alex", grade: 9}]', 22, true);
    env.addStep(22, "Adăugăm studentul $s1$ la finalul vectorului $classList$.", [{ label: "Listă Clasă", groups: [[{ val: "[0]: {Alex, 9}", active: true }]] }]);
    env.setVar('classList', 'std::vector<Student>', '[{name: "Alex", grade: 9}, {name: "Maria", grade: 10}]', 23, true);
    env.addStep(23, "Adăugăm studentul $s2$ la finalul vectorului.", [{ label: "Listă Clasă", groups: [[{ val: "[0]: {Alex, 9}" }, { val: "[1]: {Maria, 10}", active: true }]] }]);
    
    let maxGrade = 9;
    env.setVar('maxGrade', 'int', maxGrade, 25);
    env.addStep(25, "Inițializăm nota maximă cu nota primului student din listă: $maxGrade = 9$.", [{ label: "Maxim", groups: [[{ val: "maxGrade = 9", active: true }]] }]);
    
    let topStudent = '"Alex"';
    env.setVar('topStudent', 'std::string', topStudent, 26);
    env.addStep(26, "Inițializăm numele studentului eminent cu cel al primului student: `topStudent = \"Alex\"`.", [{ label: "Top Student", groups: [[{ val: "topStudent = \"Alex\"", active: true }]] }]);
    
    let classList = [ {name: '"Alex"', grade: 9}, {name: '"Maria"', grade: 10} ];
    for (let i = 1; i < classList.length; i++) {
        env.setVar('i', 'int', i, 28);
        env.addStep(28, `Începem parcurgerea clasei de la indexul $i = ${i}$.`, [{ label: "Index parcurgere", groups: [[{ val: `i = ${i}`, active: true }]] }]);
        
        let st = classList[i];
        env.addStep(29, `Verificăm dacă nota studentului curent ($${st.grade}$) este mai mare decât $maxGrade$ ($${maxGrade}$).`, [{ label: "Verificare", groups: [[{ val: `${st.grade} > ${maxGrade} ? ${st.grade > maxGrade ? 'Da' : 'Nu'}`, active: true }]] }]);
        
        if (st.grade > maxGrade) {
            maxGrade = st.grade;
            env.setVar('maxGrade', 'int', maxGrade, 25);
            env.addStep(30, `Actualizăm nota maximă: $maxGrade = ${maxGrade}$.`, [{ label: "Maxim actualizat", groups: [[{ val: `maxGrade = ${maxGrade}`, active: true }]] }]);
            
            topStudent = st.name;
            env.setVar('topStudent', 'std::string', topStudent, 26);
            env.addStep(31, `Actualizăm numele studentului eminent: topStudent = ${topStudent}.`, [{ label: "Top Student actualizat", groups: [[{ val: `topStudent = ${topStudent}`, active: true }]] }]);
        }
    }
    
    let i = 2;
    env.setVar('i', 'int', i, 28);
    env.addStep(28, `Incrementăm $i$ la $2$. Condiția devine falsă. Ieșim din buclă.`, [{ label: "Condiție buclă", groups: [[{ val: "2 < 2 ? Fals", active: true }]] }]);
    env.delVar('i');
    env.addStep(35, `Finalizăm programul cu succes, având determinat studentul eminent: Maria cu nota 10.`, [{ label: "Rezultate Finale", groups: [[{ val: `topStudent = ${topStudent}` }, { val: `maxGrade = ${maxGrade}` }]] }]);

    return env.trace;
}

processFile('./dashboard/src/data/categories/Fundamentals/Base_Conversion.js', traceBaseConversion);
processFile('./dashboard/src/data/categories/Fundamentals/Digits.js', traceDigits);
processFile('./dashboard/src/data/categories/Fundamentals/Functions.js', traceFunctions);
processFile('./dashboard/src/data/categories/Fundamentals/STL.js', traceSTL);
processFile('./dashboard/src/data/categories/Fundamentals/Simulations.js', traceSimulations);
processFile('./dashboard/src/data/categories/Fundamentals/Streaming.js', traceStreaming);
processFile('./dashboard/src/data/categories/Fundamentals/Structs.js', traceStructs);
