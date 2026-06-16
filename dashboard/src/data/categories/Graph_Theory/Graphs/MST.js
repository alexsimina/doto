export const data = {
  "presentation": "### Prezentare Generală\n\nUn Arbore Minim de Acoperire (Minimum Spanning Tree - MST) este un subgraf care conectează toate nodurile grafului original (este un arbore) cu costul total minim posibil.\\n\\nCei mai cunoscuți algoritmi sunt:\\n1. **Kruskal**: Sortează muchiile și le adaugă pe rând folosind Disjoint Sets (Union-Find) pentru a evita ciclurile.\\n2. **Prim**: Crește arborele pornind de la un nod adăugând mereu cea mai ieftină muchie conectată, folosind un Priority Queue.",
  "complexity": "### Complexitate\n\nAmbele soluții au complexitatea timp de O(E log V) în implementările standard.",
  "variations": "### Variații și Edge Cases\n\nBoruvka (folosit în procesare distribuită).",
  "applications": "### Aplicații\n\nProiectarea rețelelor de telecomunicații, conectarea cablurilor electrice în oraș, algoritmi de aproximare pentru TSP.",
  "code": "",
  "explanations": [],
  "problems": {
    "easy": [
      {
        "title": "APM",
        "url": "https://www.pbinfo.ro/probleme/apm",
        "desc": "Arbore parțial de cost minim clasic."
      }
    ],
    "medium": [
      {
        "title": "Road Reparation",
        "url": "https://cses.fi/problemset/task/1675",
        "desc": "Construirea rețelei de drumuri cu cost minim."
      }
    ],
    "hard": [
      {
        "title": "Road Construction",
        "url": "https://cses.fi/problemset/task/1676",
        "desc": "Aflarea dimensiunii celei mai mari componente conectate treptat."
      }
    ]
  }
};
