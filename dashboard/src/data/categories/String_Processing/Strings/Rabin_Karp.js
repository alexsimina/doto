const patVal = "AABA";
const txtVal = "AABAACAADAABAAABAA";

function generateRabinKarpBlocks(pat, txt, i, p_hash, t_hash, match_start = -1) {
  const m = pat.length;
  const n = txt.length;
  
  const textGroup = [];
  for (let idx = 0; idx < n; idx++) {
    let active = idx >= i && idx < i + m;
    let sorted = match_start !== -1 && idx >= match_start && idx < match_start + m;
    
    textGroup.push({
      val: txt[idx],
      active: active,
      sorted: sorted
    });
  }
  
  const hashGroup = [
    { val: "pat_hash: " + p_hash, active: p_hash === t_hash, sorted: p_hash === t_hash },
    { val: "txt_hash: " + t_hash, active: p_hash === t_hash }
  ];
  
  return [
    {
      label: "Textul txt (fereastra curentă evidențiată la i = " + i + ")",
      groups: [textGroup]
    },
    {
      label: "Comparație Hash-uri (mod 101)",
      groups: [hashGroup]
    }
  ];
}

const trace = [
  {
    line: 47,
    text: "Se pornește execuția funcției main.",
    stack: ["main()"],
    vars: [],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 48,
    text: "Se declară textul în care căutăm: txt = \"AABAACAADAABAAABAA\".",
    stack: ["main()"],
    vars: [{ name: "txt", type: "string", val: "\"AABAACAADAABAAABAA\"" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 49,
    text: "Se declară șablonul (pattern) căutat: pat = \"AABA\".",
    stack: ["main()"],
    vars: [{ name: "txt", type: "string", val: "\"AABAACAADAABAAABAA\"" }, { name: "pat", type: "string", val: "\"AABA\"" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 50,
    text: "Definim modulul prim pentru hash, q = 101.",
    stack: ["main()"],
    vars: [{ name: "txt", type: "string", val: "\"AABAACAADAABAAABAA\"" }, { name: "pat", type: "string", val: "\"AABA\"" }, { name: "q", type: "int", val: "101" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 51,
    text: "Se apelează funcția rabinKarp(pat, txt, q).",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "txt", type: "string", val: "\"AABAACAADAABAAABAA\"" }, { name: "pat", type: "string", val: "\"AABA\"" }, { name: "q", type: "int", val: "101" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 8,
    text: "Aflăm lungimea șablonului m = pat.length() = 4.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "pat", type: "string", val: "\"AABA\"" }, { name: "txt", type: "string", val: "\"AABAACAADAABAAABAA\"" }, { name: "q", type: "int", val: "101" }, { name: "m", type: "int", val: "4" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 9,
    text: "Aflăm lungimea textului n = txt.length() = 18.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "m", type: "int", val: "4" }, { name: "n", type: "int", val: "18" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 10,
    text: "Inițializăm baza sistemului de numerație (numărul de caractere din alfabet): d = 256.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "m", type: "int", val: "4" }, { name: "n", type: "int", val: "18" }, { name: "d", type: "int", val: "256" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 13,
    text: "Inițializăm p_hash = 0, t_hash = 0 și multiplicatorul h = 1.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "p_hash", type: "int", val: "0" }, { name: "t_hash", type: "int", val: "0" }, { name: "h", type: "int", val: "1" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 15,
    text: "Calculăm h = d^(m-1) % q = 256^3 % 101 prin buclă repetată. h devine 5.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "h", type: "int", val: "5" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, -100, 0, 0)
  },
  {
    line: 19,
    text: "Calculăm hash-ul inițial pentru șablon și prima fereastră din text: p_hash = 79 și t_hash = 79.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "79" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 0, 79, 79)
  },
  {
    line: 24,
    text: "Începem bucla de căutare pentru i = 0. Fereastra curentă din text este \"AABA\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "0" }, { name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "79" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 0, 79, 79)
  },
  {
    line: 25,
    text: "Comparație Hash: p_hash == t_hash (79 == 79). Sunt egale! Intrăm să verificăm caracterele.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "0" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 0, 79, 79)
  },
  {
    line: 33,
    text: "Caracterele se potrivesc perfect în fereastră (\"AABA\"). Am găsit o potrivire completă!",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "0" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 0, 79, 79, 0)
  },
  {
    line: 34,
    text: "Se afișează în consolă: \"Pattern gasit la indexul 0\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "0" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 0, 79, 79, 0)
  },
  {
    line: 38,
    text: "Verificăm dacă mai avem ferestre în față (i = 0 < n - m = 14). Este adevărat, deci recalculăm hash-ul prin rolling.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "0" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 0, 79, 79)
  },
  {
    line: 39,
    text: "Recalculăm hash-ul eliminând txt[0] = 'A' și adăugând txt[4] = 'C'. Noul hash devine t_hash = 14.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "0" }, { name: "t_hash", type: "int", val: "14" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 1, 79, 14)
  },
  {
    line: 24,
    text: "Trecem la i = 1. Fereastra curentă este \"ABAC\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "1" }, { name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "14" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 1, 79, 14)
  },
  {
    line: 25,
    text: "Comparație Hash: p_hash == t_hash (79 == 14) este fals. Sărim peste verificarea caracterelor (optimizare!).",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "1" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 1, 79, 14)
  },
  {
    line: 39,
    text: "Recalculăm hash-ul eliminând txt[1] = 'A' și adăugând txt[5] = 'A'. Noul hash devine t_hash = 37.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "1" }, { name: "t_hash", type: "int", val: "37" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 2, 79, 37)
  },
  {
    line: 24,
    text: "Trecem la i = 2. Fereastra curentă este \"BACA\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "2" }, { name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "37" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 2, 79, 37)
  },
  {
    line: 25,
    text: "Comparație Hash: p_hash == t_hash (79 == 37) este fals. Continuăm.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "2" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 2, 79, 37)
  },
  {
    line: 39,
    text: "Recalculăm hash-ul eliminând txt[2] = 'B' și adăugând txt[6] = 'A'. Noul hash devine t_hash = 100.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "2" }, { name: "t_hash", type: "int", val: "100" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 3, 79, 100)
  },
  {
    line: 24,
    text: "Trecem la i = 3. Fereastra curentă este \"ACAA\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "3" }, { name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "100" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 3, 79, 100)
  },
  {
    line: 25,
    text: "Comparație Hash: p_hash == t_hash (79 == 100) este fals.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "3" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 3, 79, 100)
  },
  {
    line: 39,
    text: "Rolling hash continuă pentru pozițiile următoare în mod repetat.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "3" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 4, 79, 85)
  },
  {
    line: 24,
    text: "Atingem indexul i = 8. Fereastra curentă este \"DAAB\" cu t_hash = 96.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "8" }, { name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "96" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 8, 79, 96)
  },
  {
    line: 39,
    text: "Recalculăm hash-ul pentru fereastra următoare: eliminăm txt[8] = 'D' și adăugăm txt[12] = 'A'. Noul hash devine t_hash = 79.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "8" }, { name: "t_hash", type: "int", val: "79" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 9, 79, 79)
  },
  {
    line: 24,
    text: "Trecem la i = 9. Fereastra curentă este \"AABA\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "9" }, { name: "p_hash", type: "int", val: "79" }, { name: "t_hash", type: "int", val: "79" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 9, 79, 79)
  },
  {
    line: 25,
    text: "Comparație Hash: p_hash == t_hash (79 == 79). Sunt egale! Trecem la compararea caracterelor.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "9" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 9, 79, 79)
  },
  {
    line: 33,
    text: "Toate caracterele se potrivesc (\"AABA\"). Am găsit a doua potrivire!",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "9" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 9, 79, 79, 9)
  },
  {
    line: 34,
    text: "Se afișează în consolă: \"Pattern gasit la indexul 9\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "9" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 9, 79, 79, 9)
  },
  {
    line: 39,
    text: "Continuăm rolling hash-ul. La indexul i = 12, fereastra devine \"AABA\" cu t_hash = 79.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "12" }, { name: "t_hash", type: "int", val: "79" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 12, 79, 79)
  },
  {
    line: 33,
    text: "Se confirmă potrivirea caracter cu caracter la indexul 12.",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "12" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 12, 79, 79, 12)
  },
  {
    line: 34,
    text: "Se afișează în consolă: \"Pattern gasit la indexul 12\".",
    stack: ["rabinKarp()", "main()"],
    vars: [{ name: "i", type: "int", val: "12" }],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 12, 79, 79, 12)
  },
  {
    line: 52,
    text: "Revenim în funcția main și încheiem programul returnând 0.",
    stack: ["main()"],
    vars: [],
    blocksVisual: generateRabinKarpBlocks(patVal, txtVal, 12, 79, 79, 12)
  }
];

export const data = {
  presentation: `### Prezentare Generală

Algoritmul **Rabin-Karp** este un algoritm de căutare a unui șablon (pattern) într-un text folosind funcții de hashing. Spre deosebire de algoritmi precum KMP sau Z, care fac comparații de caractere structurate prin preprocesare, Rabin-Karp folosește o funcție de hash pentru a filtra rapid ferestrele din text care nu se potrivesc cu șablonul.

### Principiul de Funcționare

1. **Hashing inițial:** Calculăm valoarea de hash a șablonului de lungime $M$ și a primei ferestre de lungime $M$ din text.
2. **Glisare și Rolling Hash:** Mutăm fereastra pe text caracter cu caracter. Pentru a evita recalcularea hash-ului de la zero la fiecare pas (care ar dura $\\mathcal{O}(M)$), folosim tehnica de **Rolling Hash** (Hash Rulant), care permite calculul noului hash în $\\mathcal{O}(1)$ pe baza vechiului hash:
   $$H_{new} = \\left( d \\cdot (H_{old} - T[i] \\cdot h) + T[i+M] \\right) \\pmod q$$
   unde $d$ este dimensiunea alfabetului, $q$ este un număr prim mare pentru a evita coliziunile, iar $h = d^{M-1} \\pmod q$.
3. **Verificare coliziune:** Dacă hash-ul șablonului coincide cu cel al ferestrei curente din text ($p\\_hash == t\\_hash$), se efectuează o comparație clasică caracter cu caracter pentru a confirma potrivirea și a evita coliziunile (false positive).`,

  complexity: `### Complexitate de Timp

- **Cazul Favorabil / Mediu:** $\\mathcal{O}(N + M)$, unde $N$ este lungimea textului și $M$ este lungimea șablonului. Recalcularea hash-ului prin rolling hash durează timp constant $\\mathcal{O}(1)$.
- **Cazul Defavorabil:** $\\mathcal{O}(N \\cdot M)$, care apare atunci când modulul $q$ generează foarte multe coliziuni de hash (de exemplu, când toate ferestrele textului au același hash cu șablonul, fiind necesară verificarea completă a caracterelor la fiecare pas).

### Complexitate Spațială

- **$\\mathcal{O}(1)$** deoarece algoritmul utilizează doar câteva variabile simple pentru calcularea hash-urilor.`,

  variations: `### Variații și Extinderi

1. **Căutarea a multiple șabloane (Multiple Pattern Search):** Rabin-Karp poate fi generalizat foarte ușor pentru a căuta $k$ șabloane de lungimi egale în mod simultan. Stocăm hash-urile celor $k$ șabloane într-un tabel de dispersie (HashTable) și comparăm hash-ul ferestrei curente direct cu acest set.
2. **Double Hashing:** Pentru a reduce probabilitatea coliziunilor aproape de zero fără a folosi aritmetică pe 64 de biți complecși, se pot calcula în paralel două hash-uri cu numere prime diferite ($q_1$, $q_2$).`,

  applications: `### Aplicații Practice

- **Detectarea plagiatului:** Căutarea fragmentelor repetitive dintr-un document în baze de date mari de texte.
- **Detecția de semnături malware:** Căutarea simultană a mai multor semnături de viruși (șabloane) în fișiere binare.
- **Algoritmi de bioinformatică:** Căutarea potrivirilor parțiale și a mutațiilor în secvențe de nucleotide.`,

  code: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

void rabinKarp(string pat, string txt, int q) {
    int m = pat.length();
    int n = txt.length();
    int d = 256;
    int p_hash = 0;
    int t_hash = 0;
    int h = 1;
    
    for (int i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }
    
    for (int i = 0; i < m; i++) {
        p_hash = (d * p_hash + pat[i]) % q;
        t_hash = (d * t_hash + txt[i]) % q;
    }
    
    for (int i = 0; i <= n - m; i++) {
        if (p_hash == t_hash) {
            bool match = true;
            for (int j = 0; j < m; j++) {
                if (txt[i + j] != pat[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                cout << "Pattern gasit la indexul " << i << endl;
            }
        }
        
        if (i < n - m) {
            t_hash = (d * (t_hash - txt[i] * h) + txt[i + m]) % q;
            if (t_hash < 0) {
                t_hash = (t_hash + q);
            }
        }
    }
}

int main() {
    string txt = "AABAACAADAABAAABAA";
    string pat = "AABA";
    int q = 101;
    rabinKarp(pat, txt, q);
    return 0;
}
`,

  explanations: trace.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: step.blocksVisual
  })),

  problems: {
    easy: [
      {
        title: "Implement strStr()",
        url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        desc: "Găsește prima apariție a unui șablon în text."
      }
    ],
    medium: [
      {
        title: "Repeated DNA Sequences",
        url: "https://leetcode.com/problems/repeated-dna-sequences/",
        desc: "Găsește toate substringurile de lungime 10 care apar de mai multe ori în ADN utilizând hashing rulant."
      }
    ],
    hard: [
      {
        title: "Longest Duplicate Substring",
        url: "https://leetcode.com/problems/longest-duplicate-substring/",
        desc: "Găsirea celui mai lung substring duplicat utilizând Căutare Binară pe lungime combinată cu Rabin-Karp."
      }
    ]
  },

  globalVars: [],

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const step = trace[stepIndex] || trace[trace.length - 1];
      const vars = step.vars.map(v => ({ name: v.name, type: v.type, val: v.val, expandable: false }));
      const globalVars = [];
      const frames = step.stack.map(fName => ({ name: fName, file: "solution.cpp", line: activeLine }));
      
      let inlineVal = "";
      if (step.vars.length > 0) {
        inlineVal = step.vars.map(v => `${v.name}: ${v.val}`).join(", ");
      }
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const step = trace[stepIndex];
      if (!step) return null;
      if (step.line === lineNum) {
        if (step.vars.length > 0) {
          return step.vars.map(v => `${v.name}: ${v.val}`).join(", ");
        }
      }
      return null;
    }
  }
};
