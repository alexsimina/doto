const getStates = () => {
  const states = [];
  let sz = [0, 0, 0, 0, 0];
  let parent = [-1, -1, -1, -1, -1];
  let heavy = [-1, -1, -1, -1, -1];
  let head = [0, 0, 0, 0, 0];
  let pos = [0, 0, 0, 0, 0];
  let cur_pos = 0;
  let v = -1, p = -1, c = -1, h = -1;
  let stack = [];

  for (let step = 0; step < 80; step++) {
    if (step === 15) sz[0] = 1;
    else if (step === 16) parent[0] = -1;
    else if (step === 20) sz[1] = 1;
    else if (step === 21) parent[1] = 0;
    else if (step === 25) sz[3] = 1;
    else if (step === 28) sz[1] = 2;
    else if (step === 29) heavy[1] = 3;
    else if (step === 33) sz[4] = 1;
    else if (step === 35) sz[1] = 3;
    else if (step === 38) sz[0] = 4;
    else if (step === 39) heavy[0] = 1;
    else if (step === 43) sz[2] = 1;
    else if (step === 45) sz[0] = 5;
    else if (step === 50) head[0] = 0;
    else if (step === 51) { pos[0] = 0; cur_pos = 1; }
    else if (step === 55) head[1] = 0;
    else if (step === 56) { pos[1] = 1; cur_pos = 2; }
    else if (step === 60) head[3] = 0;
    else if (step === 61) { pos[3] = 2; cur_pos = 3; }
    else if (step === 68) head[4] = 4;
    else if (step === 69) { pos[4] = 3; cur_pos = 4; }
    else if (step === 75) head[2] = 2;
    else if (step === 76) { pos[2] = 4; cur_pos = 5; }

    v = -1; p = -1; c = -1; h = -1; stack = [];
    if (step >= 14 && step <= 18) {
      v = 0; p = -1; stack = [[0, -1, 'sz']];
      if (step >= 17) c = 1;
    } else if (step >= 19 && step <= 23) {
      v = 1; p = 0; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
      if (step >= 22) c = 3;
    } else if (step >= 24 && step <= 27) {
      v = 3; p = 1; stack = [[3, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 28 && step <= 31) {
      v = 1; p = 0; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
      if (step >= 29 && step <= 30) c = 3;
      if (step === 31) c = 4;
    } else if (step >= 32 && step <= 34) {
      v = 4; p = 1; stack = [[4, 1, 'sz'], [1, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 35 && step <= 37) {
      v = 1; p = 0; stack = [[1, 0, 'sz'], [0, -1, 'sz']];
      if (step === 35 || step === 36) c = 4;
    } else if (step >= 38 && step <= 41) {
      v = 0; p = -1; stack = [[0, -1, 'sz']];
      if (step === 38 || step === 39) c = 1;
      if (step >= 40) c = 2;
    } else if (step >= 42 && step <= 44) {
      v = 2; p = 0; stack = [[2, 0, 'sz'], [0, -1, 'sz']];
    } else if (step >= 45 && step <= 47) {
      v = 0; p = -1; stack = [[0, -1, 'sz']];
      if (step === 45 || step === 46) c = 2;
    } else if (step >= 49 && step <= 53) {
      v = 0; h = 0; stack = [[0, 0, 'hld']];
    } else if (step >= 54 && step <= 58) {
      v = 1; h = 0; stack = [[1, 0, 'hld'], [0, 0, 'hld']];
    } else if (step >= 59 && step <= 64) {
      v = 3; h = 0; stack = [[3, 0, 'hld'], [1, 0, 'hld'], [0, 0, 'hld']];
    } else if (step >= 65 && step <= 66) {
      v = 1; h = 0; stack = [[1, 0, 'hld'], [0, 0, 'hld']];
      if (step === 66) c = 4;
    } else if (step >= 67 && step <= 70) {
      v = 4; h = 4; stack = [[4, 4, 'hld'], [1, 0, 'hld'], [0, 0, 'hld']];
    } else if (step >= 71 && step <= 73) {
      v = 0; h = 0; stack = [[0, 0, 'hld']];
      if (step >= 72) c = 2;
    } else if (step >= 74 && step <= 77) {
      v = 2; h = 2; stack = [[2, 2, 'hld'], [0, 0, 'hld']];
    } else if (step === 78) {
      v = 0; h = 0; stack = [[0, 0, 'hld']];
    }

    states.push({
      sz: [...sz],
      parent: [...parent],
      heavy: [...heavy],
      head: [...head],
      pos: [...pos],
      cur_pos,
      v, p, c, h,
      stack: [...stack]
    });
  }
  return states;
};

const states = getStates();

export const data = {
  "presentation": "### Descompunerea Heavy-Light (HLD)\n\nHeavy-Light Decomposition (HLD) este o tehnică avansată de descompunere a unui arbore în căi/drumuri liniare disjuncte. Ea clasifică muchiile în:\n- **Heavy edges** (muchii grele): muchia dintre un nod $u$ și fiul său cu subarborele cel mai mare.\n- **Light edges** (muchii ușoare): toate celelalte muchii.\n\nFiecare nod aparține unei singure căi grele, definită prin liderul ei (*head*). HLD aplatizează arborele într-un singur vector de poziții astfel încât toate nodurile de pe aceeași cale grea ocupă un interval contiguu. Acest lucru ne permite să folosim un singur arbore de intervale pentru a efectua interogări și actualizări pe drumuri între orice două noduri $u$ și $v$ în timp de $O(\\log^2 N)$, deoarece orice drum conține cel mult $O(\\log N)$ căi grele distincte.",
  "complexity": "### Complexitate\n\n- **Timp Preprocesare:** $O(N)$ folosind două parcurgeri DFS (una pentru calcularea dimensiunilor și una pentru descompunerea propriu-zisă).\n- **Timp Interogare/Actualizare:** $O(\\log^2 N)$ per operație, deoarece urcăm în arbore trecând prin cel mult $O(\\log N)$ lideri de căi grele, făcând o interogare de tip $O(\\log N)$ pe arborele de intervale pentru fiecare cale.\n- **Spațiu:** $O(N)$ pentru stocarea listelor de adiacență și a vectorilor auxiliari (`sz`, `head`, `pos`, `heavy`).",
  "variations": "### Variații și Cazuri Particulare\n\n- **HLD pe muchii**: Atunci când valorile sunt stocate pe muchii, ele sunt proiectate pe nodul fiu corespunzător. La interogarea drumului dintre $u$ și $v$, LCA-ul este exclus din interval, deoarece muchia de deasupra sa nu aparține drumului dintre fii.\n- **LCA rapid**: HLD poate fi folosit ca o metodă alternativă și rapidă de calculare a LCA-ului în timp $O(\\log N)$, urcând repetat pe calea cu liderul cel mai adânc.",
  "applications": "### Aplicații Reale\n\n- Actualizări pe noduri/muchii și interogări de sumă/minim/maxim pe drumul cel mai scurt în rețele dinamice.\n- Întreținerea structurilor dinamice de date pe arbori în concursuri de programare sportivă.\n- Optimizarea fluxurilor de date ierarhice în rețele mari.",
  "code": `#include <iostream>
#include <vector>

using namespace std;

vector<int> sz, parent, heavy, head, pos;
int cur_pos = 0;

void dfs_sz(int v, int p, const vector<vector<int>>& adj) {
    sz[v] = 1;
    parent[v] = p;
    int max_c_size = 0;
    for (int c : adj[v]) {
        if (c != p) {
            dfs_sz(c, v, adj);
            sz[v] += sz[c];
            if (sz[c] > max_c_size) {
                max_c_size = sz[c];
                heavy[v] = c;
            }
        }
    }
}

void dfs_hld(int v, int h, const vector<vector<int>>& adj) {
    head[v] = h;
    pos[v] = cur_pos++;
    if (heavy[v] != -1) {
        dfs_hld(heavy[v], h, adj);
    }
    for (int c : adj[v]) {
        if (c != parent[v] && c != heavy[v]) {
            dfs_hld(c, c, adj);
        }
    }
}

int main() {
    int N = 5;
    vector<vector<int>> adj(N);
    adj[0] = {1, 2};
    adj[1] = {0, 3, 4};
    adj[2] = {0};
    adj[3] = {1};
    adj[4] = {1};
    sz.assign(N, 0);
    parent.assign(N, -1);
    heavy.assign(N, -1);
    head.assign(N, 0);
    pos.assign(N, 0);
    dfs_sz(0, -1, adj);
    dfs_hld(0, 0, adj);
    return 0;
}`,
  "explanations": [
    {
      "line": 38,
      "text": "Începem execuția funcției `main()`.",
      "blocksVisual": []
    },
    {
      "line": 39,
      "text": "Declarăm numărul de noduri al arborelui: $N = 5$.",
      "blocksVisual": []
    },
    {
      "line": 40,
      "text": "Declarăm lista de adiacență `adj` de dimensiune $N$.",
      "blocksVisual": []
    },
    {
      "line": 41,
      "text": "Definim legăturile pentru nodul 0: vecinii săi sunt 1 și 2.",
      "blocksVisual": []
    },
    {
      "line": 42,
      "text": "Definim legăturile pentru nodul 1: vecinii săi sunt 0, 3 și 4.",
      "blocksVisual": []
    },
    {
      "line": 43,
      "text": "Definim legăturile pentru nodul 2: vecinul său este 0.",
      "blocksVisual": []
    },
    {
      "line": 44,
      "text": "Definim legăturile pentru nodul 3: vecinul său este 1.",
      "blocksVisual": []
    },
    {
      "line": 45,
      "text": "Definim legăturile pentru nodul 4: vecinul său este 1.",
      "blocksVisual": []
    },
    {
      "line": 46,
      "text": "Inițializăm vectorul `sz` cu 0 pentru toate cele 5 noduri.",
      "blocksVisual": []
    },
    {
      "line": 47,
      "text": "Inițializăm vectorul `parent` cu -1 (semnifică nod fără părinte).",
      "blocksVisual": []
    },
    {
      "line": 48,
      "text": "Inițializăm vectorul `heavy` cu -1 (implicit nu există fiu heavy).",
      "blocksVisual": []
    },
    {
      "line": 49,
      "text": "Inițializăm vectorul `head` cu 0 pentru toate nodurile.",
      "blocksVisual": []
    },
    {
      "line": 50,
      "text": "Inițializăm vectorul `pos` cu 0 pentru poziția în vectorul aplatizat.",
      "blocksVisual": []
    },
    {
      "line": 51,
      "text": "Apelăm prima parcurgere DFS, `dfs_sz(0, -1)`, pentru a stabili dimensiunea subarborilor și a determina fiii heavy.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru rădăcina 0.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Inițializăm dimensiunea subarborelui `sz[0] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Setăm părintele nodului 0 ca fiind -1.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Începem analiza vecinilor nodului 0. Primul vecin este 1.",
      "blocksVisual": []
    },
    {
      "line": 15,
      "text": "Apelăm recursiv `dfs_sz(1, 0)` pentru nodul fiu 1.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Inițializăm dimensiunea subarborelui `sz[1] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 11,
      "text": "Setăm părintele nodului 1 ca fiind 0.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Analizăm vecinii nodului 1. Primul vecin nerezolvat (diferit de părintele 0) este 3.",
      "blocksVisual": []
    },
    {
      "line": 15,
      "text": "Apelăm recursiv `dfs_sz(3, 1)` pentru nodul fiu 3.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 3.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Inițializăm `sz[3] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Nodul 3 nu are fii diferiți de părintele 1.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Ieșim din `dfs_sz(3, 1)` revenind în apelul pentru nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 16,
      "text": "Actualizăm dimensiunea subarborelui nodului 1: `sz[1] += sz[3]` (1 + 1 = 2).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Comparăm: `sz[3]` (1) este mai mare decât `max_c_size` (0). Actualizăm `max_c_size = 1` și memorăm `heavy[1] = 3`.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Trecem la următorul vecin al nodului 1, care este 4.",
      "blocksVisual": []
    },
    {
      "line": 15,
      "text": "Apelăm recursiv `dfs_sz(4, 1)` pentru nodul fiu 4.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 4.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Setăm `sz[4] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Nodul 4 nu are alți fii, ieșim din `dfs_sz(4, 1)`.",
      "blocksVisual": []
    },
    {
      "line": 16,
      "text": "Revenim în nodul 1 și actualizăm: `sz[1] += sz[4]` (2 + 1 = 3).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Deoarece `sz[4]` (1) nu este strict mai mare decât `max_c_size` (1), fiul heavy al nodului 1 rămâne nodul 3.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Am parcurs toți vecinii nodului 1. Finalizăm `dfs_sz(1, 0)`.",
      "blocksVisual": []
    },
    {
      "line": 16,
      "text": "Revenim în nodul 0 și actualizăm dimensiunea sa: `sz[0] += sz[1]` (1 + 3 = 4).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Comparăm: `sz[1]` (3) > `max_c_size` (0). Actualizăm `max_c_size = 3` și setăm `heavy[0] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 13,
      "text": "Următorul vecin al nodului 0 este 2.",
      "blocksVisual": []
    },
    {
      "line": 15,
      "text": "Apelăm recursiv `dfs_sz(2, 0)`.",
      "blocksVisual": []
    },
    {
      "line": 9,
      "text": "Intrăm în `dfs_sz` pentru nodul 2.",
      "blocksVisual": []
    },
    {
      "line": 10,
      "text": "Inițializăm `sz[2] = 1`.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Nodul 2 nu are alți fii, finalizăm `dfs_sz(2, 0)`.",
      "blocksVisual": []
    },
    {
      "line": 16,
      "text": "Revenim în nodul 0 și actualizăm dimensiunea sa: `sz[0] += sz[2]` (4 + 1 = 5).",
      "blocksVisual": []
    },
    {
      "line": 17,
      "text": "Deoarece `sz[2]` (1) nu este strict mai mare decât `max_c_size` (3), fiul heavy al rădăcinii rămâne 1.",
      "blocksVisual": []
    },
    {
      "line": 23,
      "text": "Am finalizat prima trecere DFS. Avem dimensiunile subarborilor și fiii heavy.",
      "blocksVisual": []
    },
    {
      "line": 52,
      "text": "Apelăm a doua parcurgere, `dfs_hld(0, 0)`, pentru a atribui liderii de căi grele (head) și a numerota pozițiile.",
      "blocksVisual": []
    },
    {
      "line": 25,
      "text": "Intrăm în `dfs_hld` pentru rădăcina 0, cu liderul inițial de cale h = 0.",
      "blocksVisual": []
    },
    {
      "line": 26,
      "text": "Setăm `head[0] = 0`.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Atribuim `pos[0] = 0` (poziția curentă) și incrementăm `cur_pos` la 1.",
      "blocksVisual": []
    },
    {
      "line": 28,
      "text": "Verificăm dacă nodul 0 are fiu heavy. `heavy[0] = 1`, deci continuăm calea grea.",
      "blocksVisual": []
    },
    {
      "line": 29,
      "text": "Apelăm recursiv `dfs_hld(1, 0)` pentru fiul heavy 1, păstrând liderul 0.",
      "blocksVisual": []
    },
    {
      "line": 25,
      "text": "Intrăm în `dfs_hld` pentru nodul 1 cu h = 0.",
      "blocksVisual": []
    },
    {
      "line": 26,
      "text": "Setăm `head[1] = 0`.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Atribuim `pos[1] = 1` și incrementăm `cur_pos` la 2.",
      "blocksVisual": []
    },
    {
      "line": 28,
      "text": "Nodul 1 are fiu heavy pe 3 (`heavy[1] = 3`).",
      "blocksVisual": []
    },
    {
      "line": 29,
      "text": "Apelăm recursiv `dfs_hld(3, 0)` pentru fiul heavy 3, păstrând liderul 0.",
      "blocksVisual": []
    },
    {
      "line": 25,
      "text": "Intrăm în `dfs_hld` pentru nodul 3 cu h = 0.",
      "blocksVisual": []
    },
    {
      "line": 26,
      "text": "Setăm `head[3] = 0`.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Atribuim `pos[3] = 2` și incrementăm `cur_pos` la 3.",
      "blocksVisual": []
    },
    {
      "line": 28,
      "text": "Nodul 3 nu are fiu heavy (`heavy[3] = -1`).",
      "blocksVisual": []
    },
    {
      "line": 31,
      "text": "Căutăm fii light ai nodului 3. Nu există.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Finalizăm apelul `dfs_hld` pentru nodul 3 și revenim la nodul 1.",
      "blocksVisual": []
    },
    {
      "line": 31,
      "text": "La nodul 1, parcurgem restul fiilor pentru a porni căi ușoare. Fiul 4 este diferit de părintele 0 și de fiul heavy 3.",
      "blocksVisual": []
    },
    {
      "line": 33,
      "text": "Apelăm recursiv `dfs_hld(4, 4)` pornind o nouă cale grea cu liderul 4.",
      "blocksVisual": []
    },
    {
      "line": 25,
      "text": "Intrăm în `dfs_hld` pentru nodul 4 cu h = 4.",
      "blocksVisual": []
    },
    {
      "line": 26,
      "text": "Setăm `head[4] = 4`.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Atribuim `pos[4] = 3` și incrementăm `cur_pos` la 4.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Nodul 4 nu are alți fii, finalizăm `dfs_hld(4, 4)`.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Revenim din nodul 1 în apelul pentru nodul 0.",
      "blocksVisual": []
    },
    {
      "line": 31,
      "text": "La nodul 0, parcurgem ceilalți fii pentru a detecta căi ușoare. Fiul 2 este diferit de părinte și de fiul heavy 1.",
      "blocksVisual": []
    },
    {
      "line": 33,
      "text": "Apelăm recursiv `dfs_hld(2, 2)` pornind o nouă cale grea cu liderul 2.",
      "blocksVisual": []
    },
    {
      "line": 25,
      "text": "Intrăm în `dfs_hld` pentru nodul 2 cu h = 2.",
      "blocksVisual": []
    },
    {
      "line": 26,
      "text": "Setăm `head[2] = 2`.",
      "blocksVisual": []
    },
    {
      "line": 27,
      "text": "Atribuim `pos[2] = 4` și incrementăm `cur_pos` la 5.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Nodul 2 nu are fii, ieșim din `dfs_hld(2, 2)`.",
      "blocksVisual": []
    },
    {
      "line": 36,
      "text": "Revenim în `dfs_hld(0, 0)` și finalizăm execuția celei de-a doua treceri.",
      "blocksVisual": []
    },
    {
      "line": 53,
      "text": "Întregul arbore a fost descompus în căi grele. Finalizăm execuția programului cu succes.",
      "blocksVisual": []
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Lowest Common Ancestor of a Binary Tree (LeetCode 236)",
        "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
        "desc": "Găsirea celui mai apropiat strămoș comun, o operație ce poate fi realizată în O(log N) folosind descompunerea HLD fără structuri de date pe căi."
      },
      {
        "title": "Path Sum III (LeetCode 437)",
        "url": "https://leetcode.com/problems/path-sum-iii/",
        "desc": "Determinarea numărului de căi orientate în jos care au o sumă dată, un exercițiu introductiv pentru procesarea căilor în arbori."
      }
    ],
    "medium": [
      {
        "title": "Heavy Path (Infoarena heavypath)",
        "url": "https://www.infoarena.ro/problema/heavypath",
        "desc": "Problema clasică HLD: actualizarea valorii unui nod și interogarea valorii maxime de pe drumul simplu dintre două noduri."
      },
      {
        "title": "Water Tree (Codeforces 343D)",
        "url": "https://codeforces.com/problemset/problem/343/D",
        "desc": "Efectuarea de operații de umplere a unui subarbore cu apă și golire a unei căi către rădăcină, rezolvabilă eficient prin HLD sau Euler Tour."
      }
    ],
    "hard": [
      {
        "title": "Tree or not Tree (Codeforces 117E)",
        "url": "https://codeforces.com/problemset/problem/117/E",
        "desc": "Calcularea distanțelor și a numărului de componente conexe într-un graf format dintr-un arbore plus o muchie suplimentară (un singur ciclu), necesitând HLD."
      },
      {
        "title": "Tree Queries (Codeforces 1254D)",
        "url": "https://codeforces.com/problemset/problem/1254/D",
        "desc": "Efectuarea de actualizări aditive pe nodurile vecine și interogarea sumei pe o cale, rezolvabilă prin HLD și Segment Tree cu optimizări speciale."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      const state = states[stepIndex] || states[states.length - 1];

      if (state.v !== -1) {
        vars.push({ name: 'v', type: 'int', val: state.v, expandable: false });
        if (state.p !== -1) {
          vars.push({ name: 'p', type: 'int', val: state.p, expandable: false });
        }
        if (state.h !== -1) {
          vars.push({ name: 'h', type: 'int', val: state.h, expandable: false });
        }
        if (state.c !== -1) {
          vars.push({ name: 'c', type: 'int', val: state.c, expandable: false });
        }
      }

      globalVars.push({ name: 'cur_pos', type: 'int', val: state.cur_pos, expandable: false });
      globalVars.push({ name: 'sz', type: 'std::vector<int>&', val: `{${state.sz.join(', ')}}`, expandable: false });
      globalVars.push({ name: 'parent', type: 'std::vector<int>&', val: `{${state.parent.join(', ')}}`, expandable: false });
      globalVars.push({ name: 'heavy', type: 'std::vector<int>&', val: `{${state.heavy.join(', ')}}`, expandable: false });
      globalVars.push({ name: 'head', type: 'std::vector<int>&', val: `{${state.head.join(', ')}}`, expandable: false });
      globalVars.push({ name: 'pos', type: 'std::vector<int>&', val: `{${state.pos.join(', ')}}`, expandable: false });

      if (state.stack.length === 0) {
        frames.push({ name: 'main()', file: 'main.cpp', line: activeLine });
      } else {
        const top = state.stack[0];
        if (top[2] === 'sz') {
          frames.push({ name: `dfs_sz(v = ${top[0]}, p = ${top[1]}, adj)`, file: 'hld.cpp', line: activeLine });
        } else {
          frames.push({ name: `dfs_hld(v = ${top[0]}, h = ${top[1]}, adj)`, file: 'hld.cpp', line: activeLine });
        }
        for (let i = 1; i < state.stack.length; i++) {
          const frame = state.stack[i];
          if (frame[2] === 'sz') {
            frames.push({ name: `dfs_sz(v = ${frame[0]}, p = ${frame[1]}, adj)`, file: 'hld.cpp', line: 15 });
          } else {
            const nextFrame = state.stack[i - 1];
            const line = nextFrame[1] === frame[1] ? 29 : 33;
            frames.push({ name: `dfs_hld(v = ${frame[0]}, h = ${frame[1]}, adj)`, file: 'hld.cpp', line });
          }
        }
        const mainLine = state.stack[0][2] === 'sz' ? 51 : 52;
        frames.push({ name: 'main()', file: 'main.cpp', line: mainLine });
      }

      if (state.v !== -1) {
        inlineVal = `v: ${state.v}`;
        if (state.h !== -1) inlineVal += `, h: ${state.h}`;
        if (state.c !== -1) inlineVal += `, c: ${state.c}`;
      }
      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const state = states[stepIndex] || states[states.length - 1];
      if ((lineNum === 9 || lineNum === 10 || lineNum === 11 || lineNum === 25 || lineNum === 26 || lineNum === 27) && state.v !== -1) {
        return `v: ${state.v}`;
      }
      if ((lineNum === 13 || lineNum === 14 || lineNum === 15 || lineNum === 31 || lineNum === 32 || lineNum === 33) && state.c !== -1) {
        return `c: ${state.c}`;
      }
      if ((lineNum === 25 || lineNum === 26 || lineNum === 27) && state.h !== -1) {
        return `h: ${state.h}`;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const state = states[stepIndex] || states[states.length - 1];
      const staticNodes = [
        { id: "0", x: 150, y: 40, label: "0" },
        { id: "1", x: 100, y: 110, label: "1" },
        { id: "2", x: 200, y: 110, label: "2" },
        { id: "3", x: 60, y: 180, label: "3" },
        { id: "4", x: 140, y: 180, label: "4" }
      ];
      const staticEdges = [
        { source: "0", target: "1" },
        { source: "0", target: "2" },
        { source: "1", target: "3" },
        { source: "1", target: "4" }
      ];

      return {
        directed: false,
        title: "Descompunere Heavy-Light (HLD)",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let nodeState = undefined;
          if (idNum === state.v) nodeState = "active";
          else if (state.sz[idNum] > 0) nodeState = "visited";

          let desc = "";
          if (stepIndex < 48) {
            if (state.sz[idNum] > 0) desc = `sz=${state.sz[idNum]}`;
          } else {
            desc = `h=${state.head[idNum]}, pos=${state.pos[idNum]}`;
          }
          return { ...n, state: nodeState, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          let active = false;
          if (stepIndex >= 48) {
            const isHeavy01 = (u === 0 && v === 1) || (u === 1 && v === 0);
            const isHeavy13 = (u === 1 && v === 3) || (u === 3 && v === 1);
            if (isHeavy01 || isHeavy13) {
              active = true;
            }
          } else {
            active = (u === state.v && v === state.c) || (v === state.v && u === state.c);
            if (!active && state.stack.length > 1) {
              for (let i = 0; i < state.stack.length - 1; i++) {
                const su = state.stack[i][0], sv = state.stack[i + 1][0];
                if ((su === u && sv === v) || (su === v && sv === u)) {
                  active = true;
                  break;
                }
              }
            }
          }
          return { ...e, active };
        })
      };
    }
  }
};
