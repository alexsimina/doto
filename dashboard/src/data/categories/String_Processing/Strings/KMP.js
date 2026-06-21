export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul **KMP (Knuth-Morris-Pratt)** este un algoritm liniar clasic pentru căutarea unui șablon (pattern) de lungime $M$ într-un text de lungime $N$. \n\nÎn abordarea naivă (brute-force), când apare o nepotrivire (mismatch) între text și șablon, glisăm șablonul cu o singură poziție la dreapta și reluăm căutarea de la capăt. Acest lucru poate duce la o complexitate în cel mai rău caz de $\\mathcal{O}(N \\cdot M)$.\n\nKMP evită această recalculare redundantă utilizând informațiile acumulate în timpul potrivirilor parțiale anterioare. Ideea principală este că, atunci când o nepotrivire apare pe poziția $j$ din șablon, știm deja exact ce caractere se află în text pe pozițiile anterioare. Astfel, putem glisa șablonul direct la o poziție sigură, definită de cel mai lung prefix al șablonului care este, în același timp, și sufix al potrivirii parțiale.\n\n### Vectorul de Failure (Prefix Array / $\\pi$)\n\nÎnainte de căutare, preprocesăm șablonul pentru a construi vectorul de prefix $\\pi$ (sau LPS - Longest Proper Prefix which is also Suffix). Pentru fiecare index $i$, $\\pi[i]$ reprezintă lungimea celui mai lung prefix propriu al subșirului $pat[0..i]$ care este și sufix al acestuia:\n$$\\pi[i] = \\max \\{ k : pat[0..k-1] = pat[i-k+1..i] \\text{ și } k < i + 1 \\}$$",
  "complexity": "### Complexitate\n\nFie $N$ lungimea textului și $M$ lungimea șablonului.\n\n- **Timp:** \n  - **Preprocesare ($\\pi$):** $\\mathcal{O}(M)$ deoarece pointerii care parcurg șablonul avansează monoton sau scad prin salturi.\n  - **Căutare:** $\\mathcal{O}(N)$ deoarece pointerul pe text nu merge niciodată înapoi. Fiecare caracter din text este comparat de cel mult $2$ ori în medie.\n  - **Total:** $\\mathcal{O}(N + M)$ - o îmbunătățire uriașă față de $\\mathcal{O}(N \\cdot M)$.\n- **Spațiu:**\n  - $\\mathcal{O}(M)$ memorie auxiliară pentru stocarea vectorului $\\pi$.",
  "variations": "### Variații și Edge Cases\n\n1. **Aflarea Perioadei unui Șir:** Dacă lungimea șablonului $M$ se divide la $M - \\pi[M-1]$, atunci șirul este periodic, iar lungimea celei mai mici perioade este exact $M - \\pi[M-1]$.\n2. **Algoritmul Z:** O alternativă la fel de rapidă (tot $\\mathcal{O}(N + M)$), dar care calculează valorile de potrivire direct față de prefixul principal al întregului șir.\n3. **Căutare pe Fluxuri (Streaming):** Datorită faptului că pointerul pe text avansează strict monoton, KMP poate căuta tipare în fișiere uriașe citite caracter cu caracter, fără a încărca tot fișierul în memorie.",
  "applications": "### Aplicații\n\n- **Funcții de căutare în editoare (Ctrl+F):** Implementări extrem de rapide pentru regăsirea cuvintelor în documente lungi.\n- **Bioinformatică:** Alinierea secvențelor genetice scurte în genomi complecși.\n- **Filtrarea conținutului:** Detectarea de cuvinte cheie în pachetele de rețea care tranzitează un router în timp real.",
  code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<int> computePi(string pat) {
    int m = pat.length();
    vector<int> pi(m, 0);
    int j = 0;
    
    for (int i = 1; i < m; i++) {
        while (j > 0 && pat[i] != pat[j]) {
            j = pi[j - 1]; // Fallback pe muchia de failure
        }
        if (pat[i] == pat[j]) {
            j++;
        }
        pi[i] = j;
    }
    return pi;
}

void kmpSearch(string pat, string txt) {
    vector<int> pi = computePi(pat);
    int n = txt.length();
    int m = pat.length();
    int j = 0;
    
    for (int i = 0; i < n; i++) {
        while (j > 0 && txt[i] != pat[j]) {
            j = pi[j - 1]; // Aici e inima KMP-ului
        }
        if (txt[i] == pat[j]) {
            j++;
        }
        if (j == m) {
            cout << "Gasit la index " << i - m + 1 << "\\n";
            j = pi[j - 1]; // Continuă pentru a găsi și alte potriviri
        }
    }
}

int main() {
    string txt = "ABABDABACDABABCABAB";
    string pat = "ABABCABAB";
    kmpSearch(pat, txt);
    return 0;
}`,
  "explanations": [
    {
      "line": 44,
      "text": "Pornim programul din funcția main.",
      "blocksVisual": [
        {
          "label": "State",
          "groups": [[{"val": "main()"}]]
        }
      ]
    },
    {
      "line": 45,
      "text": "Definim textul de căutare txt = \"ABABDABACDABABCABAB\".",
      "blocksVisual": [
        {
          "label": "Text",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "D"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "C"}, {"val": "D"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 46,
      "text": "Definim șablonul (pattern-ul) căutat pat = \"ABABCABAB\".",
      "blocksVisual": [
        {
          "label": "Pattern",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 47,
      "text": "Apelăm funcția kmpSearch.",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{"val": "kmpSearch", "active": true}]]
        }
      ]
    },
    {
      "line": 25,
      "text": "În interiorul kmpSearch, precalculăm vectorul de prefixe pi apelând computePi(pat).",
      "blocksVisual": [
        {
          "label": "Call Stack",
          "groups": [[{"val": "kmpSearch"}, {"val": "computePi", "active": true}]]
        }
      ]
    },
    {
      "line": 8,
      "text": "Aflăm lungimea șablonului m = 9.",
      "blocksVisual": [
        {
          "label": "Compute Pi State",
          "groups": [[{"val": "m = 9", "sorted": true}]]
        }
      ]
    },
    {
      "line": 9,
      "text": "Inițializăm vectorul pi cu 0 pe toate cele 9 poziții. pi = [0, 0, 0, 0, 0, 0, 0, 0, 0].",
      "blocksVisual": [
        {
          "label": "Vectorul PI",
          "groups": [
            [
              {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 10,
      "text": "Inițializăm pointerul j = 0. Acesta reprezintă lungimea potrivirii curente.",
      "blocksVisual": [
        {
          "label": "Pointer j",
          "groups": [[{"val": "j = 0", "sorted": true}]]
        }
      ]
    },
    {
      "line": 12,
      "text": "Începem bucla for de la i = 1 până la m - 1.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{"val": "i = 1", "active": true}, {"val": "j = 0"}]]
        }
      ]
    },
    {
      "line": 13,
      "text": "i = 1: Comparăm pat[1] ('B') cu pat[j] = pat[0] ('A'). Nu se potrivesc, dar j = 0, deci bucla while nu se execută.",
      "blocksVisual": [
        {
          "label": "Comparare i=1",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Deoarece pat[1] != pat[0] și j = 0, setăm pi[1] = 0.",
      "blocksVisual": [
        {
          "label": "Vectorul PI",
          "groups": [
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "i = 2: Comparăm pat[2] ('A') cu pat[j] = pat[0] ('A'). Se potrivesc!",
      "blocksVisual": [
        {
          "label": "Comparare i=2",
          "groups": [
            [
              {"val": "A", "active": true}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 17,
      "text": "Deoarece s-au potrivit caracterele, incrementăm j. j devine 1.",
      "blocksVisual": [
        {
          "label": "Variabile",
          "groups": [[{"val": "i = 2"}, {"val": "j = 1", "sorted": true}]]
        }
      ]
    },
    {
      "line": 19,
      "text": "Salvam rezultatul: pi[2] = j = 1.",
      "blocksVisual": [
        {
          "label": "Vectorul PI",
          "groups": [
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "i = 3: Comparăm pat[3] ('B') cu pat[j] = pat[1] ('B'). Potrivire! Incrementăm j la 2.",
      "blocksVisual": [
        {
          "label": "Comparare i=3",
          "groups": [
            [
              {"val": "A"}, {"val": "B", "active": true}, {"val": "A"}, {"val": "B", "active": true}, {"val": "C"}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 19,
      "text": "Salvam rezultatul: pi[3] = j = 2.",
      "blocksVisual": [
        {
          "label": "Vectorul PI",
          "groups": [
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 13,
      "text": "i = 4: Comparăm pat[4] ('C') cu pat[j] = pat[2] ('A'). Nepotrivire! Deoarece j = 2 > 0, activăm bucla while.",
      "blocksVisual": [
        {
          "label": "Mismatch i=4",
          "groups": [
            [
              {"val": "A"}, {"val": "B"}, {"val": "A", "active": true}, {"val": "B"}, {"val": "C", "active": true}, {"val": "A"}, {"val": "B"}, {"val": "A"}, {"val": "B"}
            ]
          ]
        }
      ]
    },
    {
      "line": 14,
      "text": "Facem fallback pe failure link: j devine pi[j-1] = pi[1] = 0.",
      "blocksVisual": [
        {
          "label": "Fallback j",
          "groups": [[{"val": "j = 0", "sorted": true}]]
        }
      ]
    },
    {
      "line": 19,
      "text": "Pentru i = 4, pat[4] ('C') != pat[0] ('A') și j = 0, deci pi[4] = 0.",
      "blocksVisual": [
        {
          "label": "Vectorul PI",
          "groups": [
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "0"}, {"val": "0"}, {"val": "0"}, {"val": "0"}
            ]
          ]
        }
      ]
    },
    {
      "line": 12,
      "text": "Continuăm pașii i = 5..8. După finalizarea completă a buclei, vectorul pi devine [0, 0, 1, 2, 0, 1, 2, 3, 4].",
      "blocksVisual": [
        {
          "label": "Vectorul PI Final",
          "groups": [
            [
              {"val": "0", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "0", "sorted": true}, {"val": "1", "sorted": true}, {"val": "2", "sorted": true}, {"val": "3", "sorted": true}, {"val": "4", "sorted": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 21,
      "text": "Returnăm vectorul pi către funcția apelantă.",
      "blocksVisual": [
        {
          "label": "Return pi",
          "groups": [[{"val": "pi computed"}]]
        }
      ]
    },
    {
      "line": 26,
      "text": "Revenim în kmpSearch. Aflăm lungimea textului n = 19.",
      "blocksVisual": [
        {
          "label": "Variabile Căutare",
          "groups": [[{"val": "n = 19", "sorted": true}]]
        }
      ]
    },
    {
      "line": 27,
      "text": "Aflăm lungimea șablonului m = 9.",
      "blocksVisual": [
        {
          "label": "Variabile Căutare",
          "groups": [[{"val": "n = 19"}, {"val": "m = 9", "sorted": true}]]
        }
      ]
    },
    {
      "line": 28,
      "text": "Inițializăm pointerul j = 0 pentru traversarea șablonului pe parcursul căutării.",
      "blocksVisual": [
        {
          "label": "Variabile Căutare",
          "groups": [[{"val": "n = 19"}, {"val": "m = 9"}, {"val": "j = 0", "sorted": true}]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Pornim bucla principală de parcurgere a textului cu indexul i de la 0 la n-1.",
      "blocksVisual": [
        {
          "label": "Parcurgere",
          "groups": [[{"val": "i = 0", "active": true}, {"val": "j = 0"}]]
        }
      ]
    },
    {
      "line": 34,
      "text": "i = 0: txt[0] ('A') se potrivește cu pat[j] = pat[0] ('A'). Incrementăm j. j devine 1.",
      "blocksVisual": [
        {
          "label": "Potrivire",
          "groups": [[{"val": "txt[0] == pat[0] ('A')", "sorted": true}]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Între i = 1 și i = 3, caracterele continuă să se potrivească perfect. j avansează succesiv la 4.",
      "blocksVisual": [
        {
          "label": "State",
          "groups": [[{"val": "i = 3"}, {"val": "j = 4", "sorted": true}]]
        }
      ]
    },
    {
      "line": 31,
      "text": "i = 4: txt[4] ('D') vs pat[4] ('C'). Mismatch! Deoarece j = 4 > 0, intrăm în bucla while.",
      "blocksVisual": [
        {
          "label": "Mismatch la D vs C",
          "groups": [
            [
              {"val": "txt[4] = D", "active": true}, {"val": "pat[4] = C", "active": true}
            ]
          ]
        }
      ]
    },
    {
      "line": 32,
      "text": "Mergem pe failure link: j devine pi[j-1] = pi[3] = 2. Deoarece txt[4] ('D') != pat[2] ('A'), facem din nou fallback la j = pi[1] = 0.",
      "blocksVisual": [
        {
          "label": "Dublu Fallback",
          "groups": [[{"val": "j = 0", "sorted": true}]]
        }
      ]
    },
    {
      "line": 30,
      "text": "Continuăm căutarea. La indexul i = 10 începe o potrivire perfectă de 9 caractere (\"ABABCABAB\") care se termină la i = 18.",
      "blocksVisual": [
        {
          "label": "Match complet început",
          "groups": [[{"val": "i = 10..18", "sorted": true}]]
        }
      ]
    },
    {
      "line": 37,
      "text": "La i = 18, j devine 9 = m. Am identificat o apariție completă a șablonului!",
      "blocksVisual": [
        {
          "label": "Match găsit",
          "groups": [[{"val": "j == m", "sorted": true}]]
        }
      ]
    },
    {
      "line": 38,
      "text": "Afișăm indexul de început: i - m + 1 = 18 - 9 + 1 = 10.",
      "blocksVisual": [
        {
          "label": "Consolă",
          "groups": [[{"val": "Gasit la index 10", "sorted": true}]]
        }
      ]
    },
    {
      "line": 39,
      "text": "Pentru a căuta alte potriviri posibile, facem din nou fallback: j devine pi[j-1] = pi[8] = 4.",
      "blocksVisual": [
        {
          "label": "Continuare",
          "groups": [[{"val": "j = 4", "sorted": true}]]
        }
      ]
    },
    {
      "line": 48,
      "text": "Programul se încheie returnând 0 din funcția main.",
      "blocksVisual": [
        {
          "label": "Exit",
          "groups": [[{"val": "EXIT_SUCCESS", "sorted": true}]]
        }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Find the Index of the First Occurrence in a String",
        "url": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        "desc": "Problema clasică de string matching, rezolvabilă optim cu KMP."
      }
    ],
    "medium": [
      {
        "title": "Potrivire (strmatch)",
        "url": "https://www.infoarena.ro/problema/strmatch",
        "desc": "Problemă clasică pe Infoarena pentru implementarea KMP."
      },
      {
        "title": "Repeated Substring Pattern",
        "url": "https://leetcode.com/problems/repeated-substring-pattern/",
        "desc": "Folosirea proprietăților vectorului pi pentru a determina dacă un șir este periodic."
      }
    ],
    "hard": [
      {
        "title": "Shortest Palindrome",
        "url": "https://leetcode.com/problems/shortest-palindrome/",
        "desc": "Construirea unui șir inteligent și utilizarea KMP pentru a găsi cel mai lung prefix palindromic."
      }
    ]
  },
  "globalVars": [
    {
      "name": "pi",
      "type": "std::vector<int>",
      "val": "{0, 0, 1, 2, 0, 1, 2, 3, 4}",
      "expandable": false
    }
  ],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const trace = [
        { "stack": ["main()"], "vars": [] },
        { "stack": ["main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }] },
        { "stack": ["main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "1" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "1" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "1" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "2" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 0, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "1" }, { "name": "i", "type": "int", "val": "2" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "1" }, { "name": "i", "type": "int", "val": "2" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 0, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "2" }, { "name": "i", "type": "int", "val": "3" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "2" }, { "name": "i", "type": "int", "val": "3" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "2" }, { "name": "i", "type": "int", "val": "4" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "4" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 0, 0, 0, 0}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "4" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "m", "type": "int", "val": "9" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }] },
        { "stack": ["computePi(pat)", "kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "n", "type": "int", "val": "19" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "n", "type": "int", "val": "19" }, { "name": "m", "type": "int", "val": "9" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "n", "type": "int", "val": "19" }, { "name": "m", "type": "int", "val": "9" }, { "name": "j", "type": "int", "val": "0" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "0" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "1" }, { "name": "i", "type": "int", "val": "0" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "4" }, { "name": "i", "type": "int", "val": "3" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "4" }, { "name": "i", "type": "int", "val": "4" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "0" }, { "name": "i", "type": "int", "val": "4" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "9" }, { "name": "i", "type": "int", "val": "18" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "9" }, { "name": "i", "type": "int", "val": "18" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "9" }, { "name": "i", "type": "int", "val": "18" }] },
        { "stack": ["kmpSearch(pat, txt)", "main()"], "vars": [{ "name": "txt", "type": "std::string", "val": "\"ABABDABACDABABCABAB\"" }, { "name": "pat", "type": "std::string", "val": "\"ABABCABAB\"" }, { "name": "pi", "type": "std::vector<int>", "val": "size=9 {0, 0, 1, 2, 0, 1, 2, 3, 4}" }, { "name": "j", "type": "int", "val": "4" }, { "name": "i", "type": "int", "val": "18" }] },
        { "stack": ["main()"], "vars": [] }
      ];
      const curr = trace[stepIndex] || trace[trace.length - 1];
      const vars = [];
      const globalVars = [{ "name": "pi", "type": "std::vector<int>", "val": "{0, 0, 1, 2, 0, 1, 2, 3, 4}", "expandable": false }];
      const frames = [];

      curr.stack.forEach(frameName => {
        frames.push({ "name": frameName, "file": "solution.cpp", "line": activeLine });
      });

      curr.vars.forEach(v => {
        vars.push({ "name": v.name, "type": v.type, "val": v.val, "expandable": false });
      });

      let inlineVal = curr.vars.length > 0 ? `${curr.vars[0].name}: ${curr.vars[0].val}` : "";
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const mappings = {
        0: { line: 49, val: "main()" },
        1: { line: 50, val: "txt: \"ABABDABACDABABCABAB\"" },
        2: { line: 51, val: "pat: \"ABABCABAB\"" },
        3: { line: 52, val: "kmpSearch()" },
        4: { line: 30, val: "computePi(pat)" },
        5: { line: 13, val: "m: 9" },
        6: { line: 14, val: "pi: size=9" },
        7: { line: 15, val: "j: 0" },
        8: { line: 17, val: "i: 1" },
        9: { line: 18, val: "pat[1] != pat[0]" },
        10: { line: 24, val: "pi[1]: 0" },
        11: { line: 17, val: "i: 2" },
        12: { line: 22, val: "j: 1" },
        13: { line: 24, val: "pi[2]: 1" },
        14: { line: 17, val: "i: 3" },
        15: { line: 24, val: "pi[3]: 2" },
        16: { line: 17, val: "i: 4" },
        17: { line: 19, val: "j: 0" },
        18: { line: 24, val: "pi[4]: 0" },
        19: { line: 17, val: "i: 5..8" },
        20: { line: 26, val: "return pi" },
        21: { line: 31, val: "n: 19" },
        22: { line: 32, val: "m: 9" },
        23: { line: 33, val: "j: 0" },
        24: { line: 35, val: "i: 0" },
        25: { line: 39, val: "j: 1" },
        26: { line: 35, val: "i: 1..3" },
        27: { line: 36, val: "txt[4] != pat[4]" },
        28: { line: 37, val: "j: 0" },
        29: { line: 35, val: "i: 10..18" },
        30: { line: 42, val: "j: 9 (match)" },
        31: { line: 43, val: "stdout: 10" },
        32: { line: 44, val: "j: 4" },
        33: { line: 53, val: "return 0" }
      };
      const mapping = mappings[stepIndex];
      if (mapping && mapping.line === lineNum) {
        return mapping.val;
      }
      return null;
    }
  }
};
