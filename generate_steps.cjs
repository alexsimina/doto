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
    env.addStep(7, "Definim numărul zecimal $n = 13$ pe care dorim să-l convertim în baza $2$.", [{ label: "Input", groups: [[{ val: "n = 13", active: true }]] }]);
    env.setVar('base', 'int', 2, 8);
    env.addStep(8, "Setăm baza în care dorim să facem conversia: $base = 2$. Numărul 13 va fi transformat în format binar.", [{ label: "Bază", groups: [[{ val: "base = 2", active: true }]] }]);
    env.setVar('digits', 'std::vector<int>', '[]', 9, true);
    env.addStep(9, "Declarăm un vector gol $digits$ în care vom stoca resturile obținute la fiecare pas, reprezentând cifrele în baza 2 de la dreapta la stânga.", [{ label: "Vector Cifre", groups: [[{ val: "digits: []", active: true }]] }]);
    env.setVar('temp', 'int', 13, 11);
    let temp = 13;
    let base = 2;
    let digitsArr = [];
    env.addStep(11, "Copiem valoarea lui $n$ în variabila de lucru $temp = 13$. Vom împărți succesiv $temp$ la bază pentru a nu altera valoarea inițială a lui $n$.", [{ label: "Copie", groups: [[{ val: "temp = 13", active: true }]] }]);
    
    while (true) {
        env.addStep(12, `Verificăm condiția buclei: $temp > 0$. Deoarece $temp = ${temp}$ este strict mai mare decât $0$ (${temp} > 0 este Adevărat), intrăm în buclă pentru a calcula următoarea cifră.`, [{ label: "Condiție", groups: [[{ val: `${temp} > 0 ? Da`, active: true }]] }]);
        if (temp <= 0) break;
        let rem = temp % base;
        env.setVar('rem', 'int', rem, 13);
        env.addStep(13, `Calculăm restul împărțirii lui $temp$ la $base$: $${temp} \\pmod{${base}} = ${rem}$. Cifra curentă determinată este ${rem}.`, [{ label: "Rest", groups: [[{ val: `rem = ${rem}`, active: true }], [{ val: `temp = ${temp}` }]] }]);
        digitsArr.push(rem);
        env.setVar('digits', 'std::vector<int>', `[${digitsArr.join(', ')}]`, 14, true);
        env.addStep(14, `Adăugăm restul obținut ($${rem}$) la finalul vectorului $digits$. Starea actuală a cifrelor colectate este [${digitsArr.join(', ')}].`, [{ label: "Vector Cifre", groups: [[{ val: `digits: [${digitsArr.join(', ')}]`, active: true }]] }]);
        temp = Math.floor(temp / base);
        env.setVar('temp', 'int', temp, 15);
        env.addStep(15, `Împărțim întreagă valoarea lui $temp$ la $base$ pentru a trece la următoarea cifră: $temp = \\lfloor ${temp * base + rem} / ${base} \\rfloor = ${temp}$.`, [{ label: "Actualizare", groups: [[{ val: `temp = ${temp}`, active: true }]] }]);
        env.delVar('rem');
    }
    
    // We exited the loop, let's trace the final check and output
    env.addStep(12, `Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 0$ nu este mai mare decât $0$ (0 > 0 este Fals), condiția este falsă și ieșim din bucla while.`, [{ label: "Condiție", groups: [[{ val: "0 > 0 ? Nu", active: true }]] }]);
    env.setVar('num_digits', 'int', digitsArr.length, 18);
    env.addStep(18, `Determinăm lungimea vectorului de cifre: $num_digits = ${digitsArr.length}$. Numărul 13 are ${digitsArr.length} cifre în baza 2.`, [{ label: "Rezultat", groups: [[{ val: `num_digits = ${digitsArr.length}`, active: true }]] }]);
    env.addStep(19, `Programul se încheie cu succes, returnând 0. Vectorul $digits$ conține cifrele binare de la dreapta la stânga (reprezentând numărul 1101 binar).`, [{ label: "Final", groups: [[{ val: "return 0", active: true }]] }]);
    return env.trace;
}

function traceDigits() {
    const env = createTraceEnv();
    env.setVar('n', 'int', 358, 6);
    env.addStep(6, "Inițializăm numărul $n$ cu valoarea $358$ pe care îl vom procesa pentru a-i calcula suma cifrelor și răsturnatul.", [{ label: "Variabile", groups: [[{ val: "n = 358", active: true }]] }]);
    env.setVar('sum', 'int', 0, 7);
    env.addStep(7, "Inițializăm variabila $sum = 0$, în care vom acumula suma cifrelor extrase succesiv.", [{ label: "Stare", groups: [[{ val: "n = 358" }], [{ val: "sum = 0", active: true }]] }]);
    env.setVar('reversed', 'int', 0, 8);
    env.addStep(8, "Inițializăm variabila $reversed = 0$, în care vom construi numărul răsturnat (inversat).", [{ label: "Stare", groups: [[{ val: "sum = 0" }], [{ val: "reversed = 0", active: true }]] }]);
    env.setVar('temp', 'int', 358, 9);
    env.addStep(9, "Copiem valoarea lui $n$ în $temp = 358$ pentru a nu altera valoarea inițială a lui $n$ în timpul prelucrării cifrelor.", [{ label: "Stare", groups: [[{ val: "temp = 358", active: true }], [{ val: "sum = 0" }], [{ val: "reversed = 0" }]] }]);
    
    let temp = 358;
    let sum = 0;
    let reversed = 0;
    
    while (true) {
        env.addStep(11, `Verificăm condiția buclei: $temp > 0$. Deoarece $temp = ${temp}$ este strict mai mare decât $0$ (${temp} > 0 este Adevărat), continuăm extragerea cifrelor.`, [{ label: "Condiție", groups: [[{ val: `${temp} > 0 ? Da`, active: true }]] }]);
        if (temp <= 0) break;
        let digit = temp % 10;
        env.setVar('digit', 'int', digit, 12);
        env.addStep(12, `Extragem ultima cifră a lui $temp$ folosind operatorul modulo $10$: $${temp} \\pmod{10} = ${digit}$.`, [{ label: "Cifră extrasă", groups: [[{ val: `digit = ${digit}`, active: true }], [{ val: `temp = ${temp}` }]] }]);
        sum += digit;
        env.setVar('sum', 'int', sum, 7);
        env.addStep(13, `Adăugăm cifra extrasă $${digit}$ la suma cifrelor: $sum$ devine $${sum - digit} + ${digit} = ${sum}$.`, [{ label: "Suma actualizată", groups: [[{ val: `sum = ${sum}`, active: true }]] }]);
        reversed = reversed * 10 + digit;
        env.setVar('reversed', 'int', reversed, 8);
        env.addStep(14, `Actualizăm răsturnatul: înmulțim vechea valoare a lui $reversed$ cu 10 și adunăm cifra $${digit}$. $reversed$ devine $${reversed}$.`, [{ label: "Răsturnat actualizat", groups: [[{ val: `reversed = ${reversed}`, active: true }]] }]);
        temp = Math.floor(temp / 10);
        env.setVar('temp', 'int', temp, 9);
        env.addStep(15, `Eliminăm ultima cifră a lui $temp$ prin împărțirea întreagă la $10$: $temp$ devine $\\lfloor ${temp * 10 + digit} / 10 \\rfloor = ${temp}$.`, [{ label: "Valoare rămasă", groups: [[{ val: `temp = ${temp}`, active: true }]] }]);
        env.delVar('digit');
    }
    
    // final check when temp is 0
    env.addStep(11, `Verificăm condiția buclei: $temp > 0$. Deoarece $temp = 0$, condiția este falsă (0 > 0 este Fals), deci ieșim din buclă.`, [{ label: "Condiție", groups: [[{ val: "0 > 0 ? Nu", active: true }]] }]);
    env.addStep(18, `Programul se încheie cu succes, returnând 0. Am calculat cu succes suma cifrelor ($sum = ${sum}$) și răsturnatul ($reversed = ${reversed}$).`, [{ label: "Final", groups: [[{ val: "return 0", active: true }]] }]);
    return env.trace;
}

function traceFunctions() {
    const env = createTraceEnv();
    env.setVar('a', 'int', 5, 16);
    env.addStep(16, "Inițializăm variabila locală $a = 5$ în funcția main. Valoarea ei va fi transmisă ulterior prin valoare.", [{ label: "Funcția main", groups: [[{ val: "a = 5", active: true }, { val: "b = ?" }]] }]);
    env.setVar('b', 'int', 5, 17);
    env.addStep(17, "Inițializăm variabila locală $b = 5$ în main. Aceasta va fi transmisă ulterior prin referință.", [{ label: "Funcția main", groups: [[{ val: "a = 5" }, { val: "b = 5", active: true }]] }]);
    
    env.addStep(19, "Apelăm funcția `incrementByValue(a)`. Deoarece transmiterea este prin valoare, programul va copia valoarea lui $a$ pe stivă.", [{ label: "Apel incrementByValue", groups: [[{ val: "a = 5 (în main)" }], [{ val: "Parametru x = 5 (copie pe stivă)", active: true }]] }]);
    
    let a = 5;
    let b = 5;
    
    // push incrementByValue frame
    env.clearVars();
    env.setVar('x', 'int', 5, 6);
    env.addStep(6, "Suntem acum în interiorul funcției `incrementByValue`. Parametrul $x$ are valoarea copiată $5$.", [{ label: "În incrementByValue", groups: [[{ val: "x = 5", active: true }]] }], null, [{name:'incrementByValue(int)', file:'main.cpp', line:6}, {name:'main()', file:'main.cpp', line:19}]);
    env.setVar('x', 'int', 6, 7);
    env.addStep(7, "Incrementăm variabila locală $x$ din funcție. $x$ devine $6$. Observăm că valoarea originală $a$ din main rămâne neschimbată.", [{ label: "În incrementByValue", groups: [[{ val: "x = 6", active: true }]] }], null, [{name:'incrementByValue(int)', file:'main.cpp', line:7}, {name:'main()', file:'main.cpp', line:19}]);
    env.addStep(8, "Funcția `incrementByValue` se încheie. Copia locală $x$ este ștearsă din memorie, iar controlul revine în main.", [{ label: "Revenire în main", groups: [[{ val: "a = 5", active: true }], [{ val: "b = 5" }]] }], null, [{name:'incrementByValue(int)', file:'main.cpp', line:8}, {name:'main()', file:'main.cpp', line:19}]);
    
    // pop frame
    env.clearVars();
    env.setVar('a', 'int', a, 16);
    env.setVar('b', 'int', b, 17);
    env.addStep(20, "Apelăm `incrementByReference(b)`. Deoarece parametrul este transmis prin referință (folosind &), nu se face o copie, ci se lucrează direct pe variabila originală $b$.", [{ label: "Apel incrementByReference", groups: [[{ val: "b = 5 (în main)" }], [{ val: "Referința x pointează direct la b", active: true }]] }]);
    
    // push incrementByReference frame
    env.clearVars();
    env.setVar('x', 'int&', '&b (value: 5)', 11);
    env.addStep(11, "Intrăm în funcția `incrementByReference`. Parametrul $x$ este o referință (un alias sau o poreclă) pentru variabila originală $b$ din main.", [{ label: "În incrementByReference", groups: [[{ val: "x (alias pentru b) = 5", active: true }]] }], null, [{name:'incrementByReference(int&)', file:'main.cpp', line:11}, {name:'main()', file:'main.cpp', line:20}]);
    b = 6;
    env.setVar('x', 'int&', '&b (value: 6)', 12);
    env.addStep(12, "Incrementăm valoarea referită de $x$. Deoarece $x$ este legat direct de variabila $b$ din main, valoarea lui $b$ devine direct $6$ în memorie.", [{ label: "În incrementByReference", groups: [[{ val: "x (alias pentru b) = 6", active: true }]] }], null, [{name:'incrementByReference(int&)', file:'main.cpp', line:12}, {name:'main()', file:'main.cpp', line:20}]);
    env.addStep(13, "Funcția `incrementByReference` se încheie. Referința $x$ este eliminată, iar execuția continuă în main.", [{ label: "Revenire în main", groups: [[{ val: "a = 5" }], [{ val: "b = 6", active: true }]] }], null, [{name:'incrementByReference(int&)', file:'main.cpp', line:13}, {name:'main()', file:'main.cpp', line:20}]);
    
    // pop frame
    env.clearVars();
    env.setVar('a', 'int', a, 16);
    env.setVar('b', 'int', b, 17);
    env.addStep(22, "Programul se finalizează cu succes. Se observă cum $a$ a rămas cu valoarea inițială $5$, în timp ce $b$ a fost modificat cu succes la $6$ prin referință.", [{ label: "Stare Finală", groups: [[{ val: "a = 5" }], [{ val: "b = 6" }]] }]);

    return env.trace;
}

function traceSTL() {
    const env = createTraceEnv();
    env.setVar('v', 'std::vector<int>', '[]', 11, true);
    env.addStep(11, "Declarăm un vector de numere întregi $v$ din STL. În acest moment vectorul este dinamic și complet gol.", [{ label: "Vector v", groups: [[{ val: "v: []", active: true }]] }]);
    env.setVar('v', 'std::vector<int>', '[10]', 12, true);
    env.addStep(12, "Adăugăm elementul $10$ la finalul vectorului folosind `push_back`. Dimensiunea vectorului devine 1, iar elementul de la indexul 0 este 10.", [{ label: "Vector v", groups: [[{ val: "10", active: true }]] }]);
    env.setVar('p', 'std::pair<int, string>', '{first: 1, second: "unu"}', 15, true);
    env.addStep(15, "Inițializăm perechea $p$ (de tip `std::pair`) ce grupează două tipuri diferite: primul câmp `.first` are valoarea $1$, iar al doilea câmp `.second` are valoarea `\"unu\"`.", [{ label: "Pereche p", groups: [[{ val: "first: 1", active: true }, { val: "second: \"unu\"", active: true }]] }]);
    env.setVar('s', 'std::set<int>', '{}', 18, true);
    env.addStep(18, "Declarăm o mulțime ordonată $s$ (de tip `std::set`) pentru a păstra elemente unice. Setul este inițial gol.", [{ label: "Mulțime s", groups: [[{ val: "s: {}", active: true }]] }]);
    env.setVar('s', 'std::set<int>', '{5}', 19, true);
    env.addStep(19, "Inserăm valoarea $5$ în mulțime. Elementele din `std::set` sunt sortate automat crescător.", [{ label: "Mulțime s", groups: [[{ val: "5", active: true }]] }]);
    env.addStep(20, "Încercăm să inserăm din nou valoarea $5$. Deoarece elementele într-un `std::set` sunt unice, duplicatul este respins, iar mulțimea rămâne $\\{5\\}$.", [{ label: "Mulțime s (ignorat duplicat)", groups: [[{ val: "5" }]] }]);
    env.setVar('m', 'std::map<string, int>', '{}', 23, true);
    env.addStep(23, "Declarăm un dicționar $m$ (`std::map`) ce asociază chei de tip șir de caractere (string) cu valori întregi (int). Momentan este gol.", [{ label: "Dicționar m", groups: [[{ val: "m: {}", active: true }]] }]);
    env.setVar('m', 'std::map<string, int>', '{"mere": 3}', 24, true);
    env.addStep(24, "Asociem cheii `\"mere\"` valoarea $3$ prin `m[\"mere\"] = 3`. Cheia este creată și valoarea este stocată în map.", [{ label: "Dicționar m", groups: [[{ val: "\"mere\" -> 3", active: true }]] }]);
    env.setVar('val', 'int', 10, 26);
    env.addStep(26, "Accesăm prin indexare în timp constant primul element din vector: $v[0] = 10$. Valoarea este salvată în variabila $val$.", [{ label: "Citire Vector", groups: [[{ val: "val = 10", active: true }]] }]);
    env.setVar('count', 'int', 1, 27);
    env.addStep(27, "Obținem numărul de elemente din setul $s$ folosind `size()`. Dimensiunea este $1$ deoarece duplicatul introdus anterior a fost ignorat.", [{ label: "Dimensiune Mulțime", groups: [[{ val: "count = 1", active: true }]] }]);
    env.setVar('mere_count', 'int', 3, 28);
    env.addStep(28, "Căutăm în map valoarea asociată cheii `\"mere\"` folosind cheia ca index. Găsim valoarea stocată $3$.", [{ label: "Citire Dicționar", groups: [[{ val: "mere_count = 3", active: true }]] }]);
    env.addStep(30, "Programul se încheie cu succes. Containerele din STL ne permit să scriem cod extrem de rapid și bine optimizat.", [{ label: "Final", groups: [[{ val: "return 0", active: true }]] }]);
    return env.trace;
}

function traceSimulations() {
    const env = createTraceEnv();
    let r = 1;
    let c = 1;
    env.setVar('row', 'int', 1, 9);
    env.addStep(9, "Inițializăm linia de pornire a robotului: $row = 1$ (centrul unei matrice de dimensiune $3 \\times 3$, cu indici de la 0 la 2).", [{ label: "Poziție Robot", groups: [[{ val: "row = 1", active: true }, { val: "col = ?" }]] }]);
    env.setVar('col', 'int', 1, 10);
    env.addStep(10, "Inițializăm coloana de pornire a robotului: $col = 1$. Poziția inițială a robotului pe grilă este $(1, 1)$.", [{ label: "Poziție Robot", groups: [[{ val: "row = 1" }, { val: "col = 1", active: true }]] }]);
    env.setVar('commands', 'std::string', '"RULD"', 13);
    env.addStep(13, "Definim șirul de comenzi de mișcare: $commands = \"RULD\"$. Robotul se va deplasa la Dreapta (R), Sus (U), Stânga (L) și Jos (D).", [{ label: "Comenzi de rulat", groups: [[{ val: "R", active: true }, { val: "U" }, { val: "L" }, { val: "D" }]] }]);
    
    let cmds = ['R', 'U', 'L', 'D'];
    for(let i=0; i<cmds.length; i++) {
        let cmd = cmds[i];
        env.setVar('cmd', 'char', `'${cmd}'`, 15);
        env.addStep(15, `Citim următoarea comandă din flux: $cmd = '${cmd}'$.`, [{ label: "Comandă curentă", groups: [[{ val: `cmd = '${cmd}'`, active: true }]] }]);
        
        env.addStep(16, `Verificăm condiția: comanda este 'U' și linia este superioară limitei superioare: cmd == 'U' && row > 0. Deoarece cmd este '${cmd}' și row este ${r}, condiția este ${cmd === 'U' && r > 0 ? 'Adevărată' : 'Falsă'}.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'U' ? ${cmd == 'U' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'U' && r > 0) {
            r--;
            env.setVar('row', 'int', r, 9);
            env.addStep(17, `Mutăm robotul în sus prin decrementarea liniei: $row$ devine $row = ${r}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}`, active: true }, { val: `col = ${c}` }]] }]);
            continue;
        }
        
        env.addStep(18, `Verificăm condiția: comanda este 'D' și linia este inferioară limitei inferioare: cmd == 'D' && row < 2. Deoarece cmd este '${cmd}' și row este ${r}, condiția este ${cmd === 'D' && r < 2 ? 'Adevărată' : 'Falsă'}.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'D' ? ${cmd == 'D' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'D' && r < 2) {
            r++;
            env.setVar('row', 'int', r, 9);
            env.addStep(19, `Mutăm robotul în jos prin incrementarea liniei: $row$ devine $row = ${r}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}`, active: true }, { val: `col = ${c}` }]] }]);
            continue;
        }
        
        env.addStep(20, `Verificăm condiția: comanda este 'L' și coloana este validă: cmd == 'L' && col > 0. Deoarece cmd este '${cmd}' și col este ${c}, condiția este ${cmd === 'L' && c > 0 ? 'Adevărată' : 'Falsă'}.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'L' ? ${cmd == 'L' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'L' && c > 0) {
            c--;
            env.setVar('col', 'int', c, 10);
            env.addStep(21, `Mutăm robotul la stânga prin decrementarea coloanei: $col$ devine $col = ${c}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}` }, { val: `col = ${c}`, active: true }]] }]);
            continue;
        }
        
        env.addStep(22, `Verificăm condiția: comanda este 'R' și coloana este validă: cmd == 'R' && col < 2. Deoarece cmd este '${cmd}' și col este ${c}, condiția este ${cmd === 'R' && c < 2 ? 'Adevărată' : 'Falsă'}.`, [{ label: "Verificare mișcare", groups: [[{ val: `cmd == 'R' ? ${cmd == 'R' ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (cmd == 'R' && c < 2) {
            c++;
            env.setVar('col', 'int', c, 10);
            env.addStep(23, `Mutăm robotul la dreapta prin incrementarea coloanei: $col$ devine $col = ${c}$.`, [{ label: "Poziție Robot", groups: [[{ val: `row = ${r}` }, { val: `col = ${c}`, active: true }]] }]);
            continue;
        }
    }
    
    env.delVar('cmd');
    // final check of the loop
    env.addStep(15, "Toate caracterele din commands au fost parcurse. Bucla pentru comenzi s-a finalizat.", [{ label: "Buclă încheiată", groups: [[{ val: "commands complet", active: true }]] }]);
    env.addStep(27, `Finalizăm simularea cu succes, având robotul revenit la poziția de start: row = ${r}, col = ${c}.`, [{ label: "Poziție Finală", groups: [[{ val: `row = ${r}` }, { val: `col = ${c}` }]] }]);
    return env.trace;
}

function traceStreaming() {
    const env = createTraceEnv();
    env.setVar('stream', 'std::vector<int>', '{4, -2, 7, 0}', 8, true);
    env.addStep(8, "Definim un vector $stream$ pentru a simula fluxul de date citit de la tastatură (consolă): 4, -2, 7 și valoarea santinelă 0.", [{ label: "Flux de intrare", groups: [[{ val: "4" }, { val: "-2" }, { val: "7" }, { val: "0 (stop)" }]] }]);
    env.setVar('sum', 'int', 0, 9);
    env.addStep(9, "Inițializăm variabila $sum = 0$. Aceasta va acumula suma numerelor strict pozitive din flux.", [{ label: "Suma", groups: [[{ val: "sum = 0", active: true }]] }]);
    env.setVar('count', 'int', 0, 10);
    env.addStep(10, "Inițializăm contorul $count = 0$. Acesta va reține numărul elementelor strict pozitive întâlnite.", [{ label: "Contor", groups: [[{ val: "count = 0", active: true }]] }]);
    
    let sum = 0;
    let count = 0;
    let vals = [4, -2, 7, 0];
    
    for (let x of vals) {
        env.setVar('x', 'int', x, 12);
        env.addStep(12, `Citim următorul număr din flux: $x = ${x}$.`, [{ label: "Element curent", groups: [[{ val: `x = ${x}`, active: true }]] }]);
        
        env.addStep(13, `Verificăm condiția de oprire: $x == 0$. Deoarece $x = ${x}$, condiția este ${x === 0 ? 'Adevărată' : 'Falsă'}.`, [{ label: "Oprire?", groups: [[{ val: `${x} == 0 ? ${x == 0 ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (x == 0) {
            env.addStep(14, "Deoarece am întâlnit valoarea santinelă 0, întrerupem imediat execuția buclei folosind instrucțiunea `break`.", [{ label: "Ieșire din buclă", groups: [[{ val: "break", active: true }]] }]);
            break;
        }
        
        env.addStep(16, `Verificăm dacă numărul citit este strict pozitiv: $x > 0$. Deoarece $x = ${x}$, condiția este ${x > 0 ? 'Adevărată' : 'Falsă'}.`, [{ label: "Verificare", groups: [[{ val: `${x} > 0 ? ${x > 0 ? 'Da' : 'Nu'}`, active: true }]] }]);
        if (x > 0) {
            sum += x;
            env.setVar('sum', 'int', sum, 9);
            env.addStep(17, `Deoarece valoarea $x = ${x}$ este pozitivă, o adunăm la sumă: $sum$ devine $${sum}$.`, [{ label: "Suma", groups: [[{ val: `sum = ${sum}`, active: true }]] }]);
            
            count++;
            env.setVar('count', 'int', count, 10);
            env.addStep(18, `Incrementăm contorul numerelor pozitive găsite: $count$ devine $${count}$.`, [{ label: "Contor", groups: [[{ val: `count = ${count}`, active: true }]] }]);
        }
    }
    
    env.delVar('x');
    env.addStep(22, `Finalizăm programul cu succes, returnând 0. Rezultatele finale sunt: $sum = ${sum}$ și $count = ${count}$. Fluxul a fost procesat fără a fi stocat în memorie.`, [{ label: "Stare finală", groups: [[{ val: `sum = ${sum}` }], [{ val: `count = ${count}` }]] }]);
    return env.trace;
}

function traceStructs() {
    const env = createTraceEnv();
    env.setVar('s1', 'Student', '{name: "", grade: 0}', 13, true);
    env.addStep(13, "Declarăm variabila $s1$ de tipul structurii `Student` pentru primul elev din catalog.", [{ label: "Student s1", groups: [[{ val: "name: \"\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s1', 'Student', '{name: "Alex", grade: 0}', 14, true);
    env.addStep(14, "Atribuim numele `\"Alex\"` membrului $name$ al structurii $s1$: s1.name = \"Alex\".", [{ label: "Student s1", groups: [[{ val: "name: \"Alex\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s1', 'Student', '{name: "Alex", grade: 9}', 15, true);
    env.addStep(15, "Atribuim nota $9$ membrului $grade$ al structurii $s1$: s1.grade = 9.", [{ label: "Student s1", groups: [[{ val: "name: \"Alex\"" }, { val: "grade: 9", active: true }]] }]);
    
    env.setVar('s2', 'Student', '{name: "", grade: 0}', 17, true);
    env.addStep(17, "Declarăm a doua variabilă de tip structură: $s2$ de tipul `Student`.", [{ label: "Student s2", groups: [[{ val: "name: \"\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s2', 'Student', '{name: "Maria", grade: 0}', 18, true);
    env.addStep(18, "Setăm numele studentului $s2$ la valoarea `\"Maria\"`: s2.name = \"Maria\".", [{ label: "Student s2", groups: [[{ val: "name: \"Maria\"", active: true }, { val: "grade: 0" }]] }]);
    env.setVar('s2', 'Student', '{name: "Maria", grade: 10}', 19, true);
    env.addStep(19, "Setăm nota studentului $s2$ la valoarea $10$: s2.grade = 10.", [{ label: "Student s2", groups: [[{ val: "name: \"Maria\"" }, { val: "grade: 10", active: true }]] }]);
    
    env.setVar('classList', 'std::vector<Student>', '[]', 21, true);
    env.addStep(21, "Declarăm vectorul $classList$ de tipul `std::vector<Student>` în care vom stoca catalogul elevilor.", [{ label: "Listă Clasă", groups: [[{ val: "classList: []", active: true }]] }]);
    env.setVar('classList', 'std::vector<Student>', '[{name: "Alex", grade: 9}]', 22, true);
    env.addStep(22, "Adăugăm studentul $s1$ la sfârșitul catalogului folosind `push_back(s1)`.", [{ label: "Listă Clasă", groups: [[{ val: "[0]: {Alex, 9}", active: true }]] }]);
    env.setVar('classList', 'std::vector<Student>', '[{name: "Alex", grade: 9}, {name: "Maria", grade: 10}]', 23, true);
    env.addStep(23, "Adăugăm și studentul $s2$ la sfârșitul catalogului cu `push_back(s2)`. Catalogul are acum 2 elevi.", [{ label: "Listă Clasă", groups: [[{ val: "[0]: {Alex, 9}" }, { val: "[1]: {Maria, 10}", active: true }]] }]);
    
    let maxGrade = 9;
    env.setVar('maxGrade', 'int', maxGrade, 25);
    env.addStep(25, "Inițializăm nota maximă cu nota primului student din listă: $maxGrade = classList[0].grade = 9$.", [{ label: "Maxim", groups: [[{ val: "maxGrade = 9", active: true }]] }]);
    
    let topStudent = '"Alex"';
    env.setVar('topStudent', 'std::string', topStudent, 26);
    env.addStep(26, "Inițializăm numele elevului eminent cu numele primului student: $topStudent = classList[0].name = \"Alex\"$.", [{ label: "Top Student", groups: [[{ val: "topStudent = \"Alex\"", active: true }]] }]);
    
    let classList = [ {name: '"Alex"', grade: 9}, {name: '"Maria"', grade: 10} ];
    for (let i = 1; i < classList.length; i++) {
        env.setVar('i', 'int', i, 28);
        env.addStep(28, `Verificăm condiția buclei de parcurgere: $i < classList.size()$. Deoarece $i = ${i}$ și dimensiunea este 2, condiția ${i < 2 ? 'este Adevărată' : 'este Falsă'}. Parcurgem elementele.`, [{ label: "Index parcurgere", groups: [[{ val: `i = ${i}`, active: true }]] }]);
        
        let st = classList[i];
        env.addStep(29, `Verificăm dacă nota studentului curent ${st.name} ($${st.grade}$) este strict mai mare decât nota maximă de până acum ($maxGrade = ${maxGrade}$). Condiția ${st.grade} > ${maxGrade} este ${st.grade > maxGrade ? 'Adevărată' : 'Falsă'}.`, [{ label: "Verificare", groups: [[{ val: `${st.grade} > ${maxGrade} ? ${st.grade > maxGrade ? 'Da' : 'Nu'}`, active: true }]] }]);
        
        if (st.grade > maxGrade) {
            maxGrade = st.grade;
            env.setVar('maxGrade', 'int', maxGrade, 25);
            env.addStep(30, `Actualizăm nota maximă la nota noului lider de clasă: $maxGrade$ devine $${maxGrade}$.`, [{ label: "Maxim actualizat", groups: [[{ val: `maxGrade = ${maxGrade}`, active: true }]] }]);
            
            topStudent = st.name;
            env.setVar('topStudent', 'std::string', topStudent, 26);
            env.addStep(31, `Actualizăm numele studentului eminent: $topStudent$ devine $${topStudent}$.`, [{ label: "Top Student actualizat", groups: [[{ val: `topStudent = ${topStudent}`, active: true }]] }]);
        }
    }
    
    let i = 2;
    env.setVar('i', 'int', i, 28);
    env.addStep(28, `Verificăm condiția buclei: $i < classList.size()$. Deoarece $i = 2$ și dimensiunea este 2, condiția $2 < 2$ este Falsă. Finalizăm bucla.`, [{ label: "Condiție buclă", groups: [[{ val: "2 < 2 ? Fals", active: true }]] }]);
    env.delVar('i');
    env.addStep(35, `Programul se încheie cu succes. Studentul eminent din catalog este ${topStudent} cu nota maximă ${maxGrade}.`, [{ label: "Rezultate Finale", groups: [[{ val: `topStudent = ${topStudent}` }, { val: `maxGrade = ${maxGrade}` }]] }]);

    return env.trace;
}

processFile('./dashboard/src/data/categories/Fundamentals/Base_Conversion.js', traceBaseConversion);
processFile('./dashboard/src/data/categories/Fundamentals/Digits.js', traceDigits);
processFile('./dashboard/src/data/categories/Fundamentals/Functions.js', traceFunctions);
processFile('./dashboard/src/data/categories/Fundamentals/STL.js', traceSTL);
processFile('./dashboard/src/data/categories/Fundamentals/Simulations.js', traceSimulations);
processFile('./dashboard/src/data/categories/Fundamentals/Streaming.js', traceStreaming);
processFile('./dashboard/src/data/categories/Fundamentals/Structs.js', traceStructs);

