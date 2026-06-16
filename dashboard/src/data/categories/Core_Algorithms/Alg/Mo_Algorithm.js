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
      "line": 15,
      "text": "Definim cum sortăm interogările (Queries). Eleganța este că, datorită acestei ordonări, parcurgerile lui currL și currR vor fi reduse masiv.",
      "blocksVisual": [
        {
          "label": "Sortarea lui Mo",
          "groups": [
            [
              {
                "val": "Sort dupa Block(L)"
              },
              {
                "val": "Sort dupa R"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 43,
      "text": "Sortăm vectorul de interogări conform funcției compareQueries. Amintiți-vă că este un algoritm OFFLINE (știm tot la început).",
      "blocksVisual": [
        {
          "label": "Sortate Offline",
          "groups": [
            [
              {
                "val": "Q1, Q2, ..., Qn"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 48,
      "text": "Setăm pointerii inițiali currL și currR care definesc o 'fereastră' de acoperire. Acum ea este goală.",
      "blocksVisual": [
        {
          "label": "Pointeri Init",
          "groups": [
            [
              {
                "val": "currL = 0"
              },
              {
                "val": "currR = -1"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 52,
      "text": "Primim un prim Query (ex: L=2, R=5). Deoarece currR este -1, bucla 'while(currR < q.R)' rulează și extinde fereastra la dreapta.",
      "blocksVisual": [
        {
          "label": "Extinde R",
          "groups": [
            [
              {
                "val": "Add arr[0]"
              },
              {
                "val": "Add arr[1]"
              },
              {
                "val": "..."
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 31,
      "text": "Funcția add() se asigură că atunci când un element apare prima dată (freq[x]==1), creștem contorul elementelor distincte.",
      "blocksVisual": [
        {
          "label": "Add",
          "groups": [
            [
              {
                "val": "+ distinct",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 56,
      "text": "Acum că currR a ajuns la 5, aducem currL la 2 prin bucla 'while(currL < q.L)'. Funcția remove() șterge elementele lăsate în urmă.",
      "blocksVisual": [
        {
          "label": "Restrânge L",
          "groups": [
            [
              {
                "val": "Remove arr[0]"
              },
              {
                "val": "Remove arr[1]"
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 36,
      "text": "Funcția remove() scade frecvența. Dacă a ajuns la 0, scade contorul elementelor distincte.",
      "blocksVisual": [
        {
          "label": "Remove",
          "groups": [
            [
              {
                "val": "- distinct",
                "active": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 60,
      "text": "Răspunsul la acest moment e corect stocat în 'current_answer'. Îl salvăm pe poziția Q.id din vectorul rezultat.",
      "blocksVisual": [
        {
          "label": "Salvare rezultat",
          "groups": [
            [
              {
                "val": "Ans[id] = ans",
                "sorted": true
              }
            ]
          ]
        }
      ]
    },
    {
      "line": 50,
      "text": "Următorul Query (ex: L=3, R=6). currL avansează un pas (scoate elem), currR avansează un pas (adaugă elem). Datorită sortării lui Mo, numărul de mișcări este garantat matematic a fi sub O(N sqrt N) per total!",
      "blocksVisual": [
        {
          "label": "Următorul Q",
          "groups": [
            [
              {
                "val": "L++"
              },
              {
                "val": "R++"
              }
            ]
          ]
        }
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
