export const data = {
  "presentation": "### Prezentare Generală\n\nAlgoritmul lui Mo (Mo's Algorithm) este o extindere strălucită a Descompunerii în Radical, aplicabilă problemelor Offline (unde poți citi toate interogările înainte de a răspunde la ele).\n\nIdeea e simplă: dacă avem un interval curent [L, R] pentru care știm răspunsul, și vrem răspunsul pentru [L+1, R], e de ajuns să 'scoatem' elementul de la poziția L din structura curentă. Daca vrem [L, R+1], 'adăugăm' R+1. Practic, mutăm pointerii L și R element cu element până ajung la L și R cerut de interogare.\n\nSecretul algoritmului lui Mo constă în SORTAREA inteligentă a acestor interogări: grupăm interogările după blocul din care face parte L. În interiorul aceluiași bloc, sortăm după R.",
  "complexity": "### Complexitate\n\n- **Timp:** $O((N + Q) \\sqrt{N})$, unde N e numărul de elemente și Q numărul de interogări. Prin metoda sa de sortare, garantează că pointerul R se mută maxim $O(N)$ per bloc, adică $O(N \\sqrt{N})$ global. Iar pointerul L se mișcă doar in limita blocului său de $\\sqrt{N}$ ori pentru fiecare din cele Q query-uri.\n- **Spațiu:** $O(N + Q)$ pentru date și stocarea interogărilor.\n",
  "variations": "### Variații și Edge Cases\n\n1. Mo's on Trees: Transformarea interogărilor pe drumuri din arbori în interogări de interval folosind Euler Tour (Căutare DFS).\n2. Mo's with Updates: A treia dimensiune este 'timpul' t. Se sortează după bloc(L), bloc(R) și t.",
  "applications": "### Aplicații\n\nDacă într-o problemă trebuie să găsești 'Numărul de elemente distincte' într-un interval, sau frecvența frecvențelor, și problema nu cere update-uri pe parcurs (sau e offline), Algoritmul lui Mo o rezolvă extrem de facil, comparativ cu Persistent Segment Trees.",
  code: `
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

int blockSize;

struct Query {
    int L, R, id;
};

// Logica magistrala a algoritmului lui Mo
bool compareQueries(Query q1, Query q2) {
    int block1 = q1.L / blockSize;
    int block2 = q2.L / blockSize;
    
    if (block1 != block2)
        return block1 < block2;
        
    // Daca L cade in acelasi bloc, sortam dupa R
    // O optimizare: Daca blocul e par R urca, daca e impar R coboara.
    return (block1 % 2 == 1) ? q1.R < q2.R : q1.R > q2.R;
}

int current_answer = 0;
int freq[1000005];

void add(int x) {
    freq[x]++;
    if (freq[x] == 1) current_answer++;
}

void remove(int x) {
    freq[x]--;
    if (freq[x] == 0) current_answer--;
}

vector<int> solveMo(vector<int>& arr, vector<Query>& queries) {
    blockSize = sqrt(arr.size());
    sort(queries.begin(), queries.end(), compareQueries);
    
    vector<int> ans(queries.size());
    
    // Pointerii initiali
    int currL = 0, currR = -1;
    
    for (Query q : queries) {
        // Mutam pointerul L spre stanga (adaugam)
        while (currL > q.L) { currL--; add(arr[currL]); }
        // Mutam pointerul R spre dreapta (adaugam)
        while (currR < q.R) { currR++; add(arr[currR]); }
        // Mutam pointerul L spre dreapta (stergem)
        while (currL < q.L) { remove(arr[currL]); currL++; }
        // Mutam pointerul R spre stanga (stergem)
        while (currR > q.R) { remove(arr[currR]); currR--; }
        
        ans[q.id] = current_answer;
    }
    return ans;
}
`,
  "explanations": [
    {
      "line": 40,
      "text": "Apelăm solveMo cu arr = {1, 2, 1, 3, 2} (indici 0-4) și interogările Q0=[1,3], Q1=[2,4]. Toate interogările sunt citite OFFLINE înainte de procesare.",
      "blocksVisual": [
        { "label": "Array arr[0-4]", "groups": [[{"val": "1\n[0]"}, {"val": "2\n[1]"}, {"val": "1\n[2]"}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "Query-uri (nesortate)", "groups": [[{"val": "Q0:[1,3]"}, {"val": "Q1:[2,4]"}]] },
        { "label": "Răspunsuri ans[]", "groups": [[{"val": "ans[0]=?"}, {"val": "ans[1]=?"}]] }
      ]
    },
    {
      "line": 41,
      "text": "Calculăm blockSize = sqrt(5) ≈ 2. Vectorul este împărțit în blocuri de dimensiune 2: [0-1], [2-3], [4].",
      "blocksVisual": [
        { "label": "Block 0 [0-1]", "groups": [[{"val": "1\n[0]"}, {"val": "2\n[1]"}]] },
        { "label": "Block 1 [2-3]", "groups": [[{"val": "1\n[2]"}, {"val": "3\n[3]"}]] },
        { "label": "Block 2 [4]", "groups": [[{"val": "2\n[4]"}]] },
        { "label": "blockSize=2", "groups": [[{"val": "2", "sorted": true}]] }
      ]
    },
    {
      "line": 42,
      "text": "Sortăm interogările prin compareQueries. Q0: bloc(L=1)=1/2=0; Q1: bloc(L=2)=2/2=1. Blocuri diferite → Q0 rămâne înaintea Q1.",
      "blocksVisual": [
        { "label": "Query-uri sortate Mo", "groups": [[{"val": "Q0:[1,3]\nbloc(L)=0", "sorted": true}, {"val": "Q1:[2,4]\nbloc(L)=1"}]] },
        { "label": "Ordine finală", "groups": [[{"val": "1. Q0"}, {"val": "2. Q1"}]] }
      ]
    },
    {
      "line": 44,
      "text": "Inițializăm vectorul de răspunsuri ans[] cu 2 intrări nedeterminate și setăm pointerii currL=0, currR=-1 (fereastră vidă).",
      "blocksVisual": [
        { "label": "Array arr[0-4]", "groups": [[{"val": "1\n[0]"}, {"val": "2\n[1]"}, {"val": "1\n[2]"}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "Fereastră [currL, currR]", "groups": [[{"val": "currL=0"}, {"val": "currR=-1\n(vid)"}]] },
        { "label": "Răspunsuri ans[]", "groups": [[{"val": "ans[0]=?"}, {"val": "ans[1]=?"}]] }
      ]
    },
    {
      "line": 49,
      "text": "Procesăm Q0 = {L=1, R=3}. Fereastra curentă este [0,-1] (vidă). Trebuie să ajungem la fereastra [1,3]. Ordinea operațiilor: extinde R, apoi restrânge L.",
      "blocksVisual": [
        { "label": "Array arr[0-4]", "groups": [[{"val": "1\n[0]"}, {"val": "2\n[1]"}, {"val": "1\n[2]"}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "Q0: țintă [1,3]", "groups": [[{"val": "L=1", "active": true}, {"val": "R=3", "active": true}]] },
        { "label": "Fereastră curentă", "groups": [[{"val": "currL=0"}, {"val": "currR=-1"}]] }
      ]
    },
    {
      "line": 53,
      "text": "while(currR < q.R): currR=-1 < 3=q.R → currR++ devine 0. add(arr[0]=1): freq[1]++ → freq[1]=1. Prima apariție → current_answer=1.",
      "blocksVisual": [
        { "label": "Array arr[0-4]  (currR→0)", "groups": [[{"val": "1\n[0]", "active": true}, {"val": "2\n[1]"}, {"val": "1\n[2]"}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=1", "active": true}, {"val": "freq[2]=0"}, {"val": "freq[3]=0"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=1", "active": true}]] }
      ]
    },
    {
      "line": 53,
      "text": "currR=0 < 3 → currR++ devine 1. add(arr[1]=2): freq[2]++ → freq[2]=1. Nouă valoare distinctă → current_answer=2.",
      "blocksVisual": [
        { "label": "Array arr[0-4]  (currR→1)", "groups": [[{"val": "1\n[0]", "sorted": true}, {"val": "2\n[1]", "active": true}, {"val": "1\n[2]"}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=1", "active": true}, {"val": "freq[3]=0"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=2", "active": true}]] }
      ]
    },
    {
      "line": 53,
      "text": "currR=1 < 3 → currR++ devine 2. add(arr[2]=1): freq[1]++ → freq[1]=2. Nu e prima apariție → current_answer rămâne 2.",
      "blocksVisual": [
        { "label": "Array arr[0-4]  (currR→2)", "groups": [[{"val": "1\n[0]", "sorted": true}, {"val": "2\n[1]", "sorted": true}, {"val": "1\n[2]", "active": true}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=2", "active": true}, {"val": "freq[2]=1"}, {"val": "freq[3]=0"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=2"}]] }
      ]
    },
    {
      "line": 53,
      "text": "currR=2 < 3 → currR++ devine 3. add(arr[3]=3): freq[3]++ → freq[3]=1. Nouă valoare distinctă → current_answer=3. Acum currR=q.R, bucla R se oprește.",
      "blocksVisual": [
        { "label": "Array arr[0-4]  (currR→3)", "groups": [[{"val": "1\n[0]", "sorted": true}, {"val": "2\n[1]", "sorted": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "active": true}, {"val": "2\n[4]"}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=2"}, {"val": "freq[2]=1"}, {"val": "freq[3]=1", "active": true}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3", "sorted": true}]] }
      ]
    },
    {
      "line": 55,
      "text": "while(currL < q.L): currL=0 < 1=q.L → remove(arr[0]=1). freq[1]-- → freq[1]=1. freq[1]>0 → current_answer rămâne 3. currL++ devine 1.",
      "blocksVisual": [
        { "label": "Array arr[0-4]  (scoatem [0])", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "active": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "sorted": true}, {"val": "2\n[4]"}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=1", "active": true}, {"val": "freq[2]=1"}, {"val": "freq[3]=1"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3", "sorted": true}]] }
      ]
    },
    {
      "line": 55,
      "text": "currL=1 = q.L=1 → bucla L se oprește. Fereastra curentă este [1,3] = intervalul cerut de Q0. Avem curr_ans=3.",
      "blocksVisual": [
        { "label": "Array arr  [currL=1, currR=3]", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "active": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "active": true}, {"val": "2\n[4]"}]] },
        { "label": "freq[]", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=1"}, {"val": "freq[3]=1"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3", "sorted": true}]] }
      ]
    },
    {
      "line": 59,
      "text": "Salvăm ans[Q0.id] = ans[0] = current_answer = 3. Elementele distincte din [1,3] sunt {2, 1, 3}. ✓",
      "blocksVisual": [
        { "label": "Array arr  fereastra [1,3]", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "sorted": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "sorted": true}, {"val": "2\n[4]"}]] },
        { "label": "freq[]", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=1"}, {"val": "freq[3]=1"}]] },
        { "label": "Răspunsuri ans[]", "groups": [[{"val": "ans[0]=3", "sorted": true}, {"val": "ans[1]=?"}]] }
      ]
    },
    {
      "line": 49,
      "text": "Procesăm Q1 = {L=2, R=4}. Fereastra curentă este [1,3]. Trebuie să ajungem la [2,4]. Extindem R de la 3 la 4, apoi mutăm L de la 1 la 2.",
      "blocksVisual": [
        { "label": "Array arr  (fereastra curentă [1,3])", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "active": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "active": true}, {"val": "2\n[4]"}]] },
        { "label": "Q1: țintă [2,4]", "groups": [[{"val": "L=2", "active": true}, {"val": "R=4", "active": true}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3"}]] }
      ]
    },
    {
      "line": 53,
      "text": "while(currR < q.R): currR=3 < 4=q.R → currR++ devine 4. add(arr[4]=2): freq[2]++ → freq[2]=2. Nu e prima apariție → current_answer rămâne 3.",
      "blocksVisual": [
        { "label": "Array arr  (currR→4)", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "active": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "sorted": true}, {"val": "2\n[4]", "active": true}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=2", "active": true}, {"val": "freq[3]=1"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3"}]] }
      ]
    },
    {
      "line": 55,
      "text": "while(currL < q.L): currL=1 < 2=q.L → remove(arr[1]=2). freq[2]-- → freq[2]=1. freq[2]>0 → current_answer rămâne 3. currL++ devine 2.",
      "blocksVisual": [
        { "label": "Array arr  (scoatem [1])", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "hidden": true}, {"val": "1\n[2]", "active": true}, {"val": "3\n[3]", "sorted": true}, {"val": "2\n[4]", "sorted": true}]] },
        { "label": "freq[] actualizat", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=1", "active": true}, {"val": "freq[3]=1"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3", "sorted": true}]] }
      ]
    },
    {
      "line": 55,
      "text": "currL=2 = q.L=2 → bucla L se oprește. Fereastra curentă este [2,4] = intervalul cerut de Q1. curr_ans=3.",
      "blocksVisual": [
        { "label": "Array arr  [currL=2, currR=4]", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "hidden": true}, {"val": "1\n[2]", "active": true}, {"val": "3\n[3]", "sorted": true}, {"val": "2\n[4]", "active": true}]] },
        { "label": "freq[]", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=1"}, {"val": "freq[3]=1"}]] },
        { "label": "Distinct count", "groups": [[{"val": "curr_ans=3", "sorted": true}]] }
      ]
    },
    {
      "line": 59,
      "text": "Salvăm ans[Q1.id] = ans[1] = current_answer = 3. Elementele distincte din [2,4] sunt {1, 3, 2}. ✓",
      "blocksVisual": [
        { "label": "Array arr  fereastra [2,4]", "groups": [[{"val": "1\n[0]", "hidden": true}, {"val": "2\n[1]", "hidden": true}, {"val": "1\n[2]", "sorted": true}, {"val": "3\n[3]", "sorted": true}, {"val": "2\n[4]", "sorted": true}]] },
        { "label": "freq[]", "groups": [[{"val": "freq[1]=1"}, {"val": "freq[2]=1"}, {"val": "freq[3]=1"}]] },
        { "label": "Răspunsuri ans[]  (FINAL)", "groups": [[{"val": "ans[0]=3", "sorted": true}, {"val": "ans[1]=3", "sorted": true}]] }
      ]
    },
    {
      "line": 61,
      "text": "Returnăm ans = {3, 3}. Algoritmul lui Mo a procesat toate interogările offline cu mutări minime ale pointerilor datorită sortării inteligente!",
      "blocksVisual": [
        { "label": "Array arr[0-4]", "groups": [[{"val": "1\n[0]"}, {"val": "2\n[1]"}, {"val": "1\n[2]"}, {"val": "3\n[3]"}, {"val": "2\n[4]"}]] },
        { "label": "Q0=[1,3] → distincte={2,1,3}", "groups": [[{"val": "2", "sorted": true}, {"val": "1", "sorted": true}, {"val": "3", "sorted": true}]] },
        { "label": "Q1=[2,4] → distincte={1,3,2}", "groups": [[{"val": "1", "sorted": true}, {"val": "3", "sorted": true}, {"val": "2", "sorted": true}]] },
        { "label": "Rezultat Final ans[]", "groups": [[{"val": "ans[0]=3", "sorted": true}, {"val": "ans[1]=3", "sorted": true}]] }
      ]
    }
  ],
  "problems": {
    "easy": [
      {
        "title": "Distinct Elements Query",
        "url": "https://www.spoj.com/problems/DQUERY/",
        "desc": "DQUERY pe Spoj e baza"
      }
    ],
    "medium": [
      {
        "title": "Powerful Array",
        "url": "https://codeforces.com/problemset/problem/86/D",
        "desc": "Problema perfecta pe Codeforces"
      }
    ],
    "hard": [
      {
        "title": "Tree Queries",
        "url": "https://codeforces.com/problemset/problem/375/D",
        "desc": "Mo's on Trees"
      }
    ]
  }
};
