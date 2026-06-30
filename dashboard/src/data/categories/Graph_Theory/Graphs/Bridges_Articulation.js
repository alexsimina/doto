const steps = [
  {
    line: 50,
    text: "Pornim algoritmul apelând dfs(0, -1) din funcția main pentru a explora graful începând cu nodul 0.",
    u: 0, p: -1, timer: 0, children: 0,
    tin: [0, 0, 0, 0, 0],
    low: [0, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0]
  },
  {
    line: 14,
    text: "Suntem la începutul apelului dfs(0). Inițializăm timpul de descoperire și valoarea low-link pentru nodul 0 cu valoarea curentă a cronometrului incrementat: tin[0] = low[0] = 1.",
    u: 0, p: -1, timer: 1, children: 0,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0]
  },
  {
    line: 15,
    text: "Inițializăm numărul de copii ai nodului 0 în arborele DFS: children = 0.",
    u: 0, p: -1, timer: 1, children: 0,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0]
  },
  {
    line: 16,
    text: "Parcurgem lista de adiacență a nodului 0. Primul vecin selectat este nodul 1.",
    u: 0, p: -1, timer: 1, children: 0,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [0, 1], stack: [0]
  },
  {
    line: 17,
    text: "Verificăm dacă vecinul 1 este părintele nodului curent 0. Părintele este -1, deci mergem mai departe.",
    u: 0, p: -1, timer: 1, children: 0,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [0, 1], stack: [0]
  },
  {
    line: 18,
    text: "Verificăm dacă nodul 1 a mai fost vizitat. tin[1] este 0 (nevizitat).",
    u: 0, p: -1, timer: 1, children: 0,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [0, 1], stack: [0]
  },
  {
    line: 21,
    text: "Nodul 1 este nevizitat, deci el va fi un nou copil al nodului 0 în arborele DFS. Incrementăm children la 1.",
    u: 0, p: -1, timer: 1, children: 1,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [0, 1], stack: [0]
  },
  {
    line: 22,
    text: "Apelăm recursiv parcurgerea DFS pentru nodul 1, setându-i ca părinte nodul 0: dfs(1, 0).",
    u: 1, p: 0, timer: 1, children: 0,
    tin: [1, 0, 0, 0, 0],
    low: [1, 0, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [0, 1], stack: [0, 1]
  },
  {
    line: 14,
    text: "Începem explorarea nodului 1. Atribuim tin[1] = low[1] = ++timer (care devine 2).",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1]
  },
  {
    line: 15,
    text: "Inițializăm numărul de copii ai nodului 1: children = 0.",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1]
  },
  {
    line: 16,
    text: "Analizăm vecinii nodului 1. Primul vecin din listă este nodul 0.",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 0], stack: [0, 1]
  },
  {
    line: 17,
    text: "Verificăm dacă vecinul 0 este părintele nodului curent 1. Da, 0 este părintele, așa că trecem peste el.",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 0], stack: [0, 1]
  },
  {
    line: 16,
    text: "Următorul vecin al nodului 1 este nodul 2.",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 2], stack: [0, 1]
  },
  {
    line: 17,
    text: "Verificăm dacă vecinul 2 este părinte (este 0, nu 2), deci nu este.",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 2], stack: [0, 1]
  },
  {
    line: 18,
    text: "Verificăm dacă 2 a fost vizitat. tin[2] este 0 (nevizitat).",
    u: 1, p: 0, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 2], stack: [0, 1]
  },
  {
    line: 21,
    text: "Incrementăm contorul de copii pentru nodul 1: children = 1.",
    u: 1, p: 0, timer: 2, children: 1,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 2], stack: [0, 1]
  },
  {
    line: 22,
    text: "Apelăm recursiv parcurgerea pentru nodul 2, având ca părinte pe 1: dfs(2, 1).",
    u: 2, p: 1, timer: 2, children: 0,
    tin: [1, 2, 0, 0, 0],
    low: [1, 2, 0, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [1, 2], stack: [0, 1, 2]
  },
  {
    line: 14,
    text: "Începem explorarea nodului 2. Setăm tin[2] = low[2] = ++timer (care devine 3).",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 15,
    text: "Inițializăm children = 0 pentru nodul 2.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 16,
    text: "Parcurgem vecinii lui 2. Primul vecin analizat este 1.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 1], stack: [0, 1, 2]
  },
  {
    line: 17,
    text: "Vecinul 1 este părintele nodului 2. Continuăm bucla.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 1], stack: [0, 1, 2]
  },
  {
    line: 16,
    text: "Următorul vecin al nodului 2 este nodul 0.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 0], stack: [0, 1, 2]
  },
  {
    line: 17,
    text: "Vecinul 0 nu este părinte, mergem mai departe.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 0], stack: [0, 1, 2]
  },
  {
    line: 18,
    text: "Nodul 0 este deja vizitat (tin[0] = 1 != 0).",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 3, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 0], stack: [0, 1, 2]
  },
  {
    line: 19,
    text: "Deoarece am găsit o muchie de întoarcere la un strămoș deja vizitat, actualizăm low[2] = min(low[2], tin[0]) = min(3, 1) = 1.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 1, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 0], stack: [0, 1, 2]
  },
  {
    line: 16,
    text: "Următorul vecin al nodului 2 este nodul 3.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 1, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 3], stack: [0, 1, 2]
  },
  {
    line: 17,
    text: "Verificăm dacă vecinul 3 este părinte (nu este).",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 1, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 3], stack: [0, 1, 2]
  },
  {
    line: 18,
    text: "Verificăm dacă 3 a fost vizitat. tin[3] este 0, deci nu a fost vizitat.",
    u: 2, p: 1, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 1, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 3], stack: [0, 1, 2]
  },
  {
    line: 21,
    text: "Incrementăm contorul de copii pentru nodul 2: children = 1.",
    u: 2, p: 1, timer: 3, children: 1,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 1, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 3], stack: [0, 1, 2]
  },
  {
    line: 22,
    text: "Apelăm recursiv dfs(3, 2).",
    u: 3, p: 2, timer: 3, children: 0,
    tin: [1, 2, 3, 0, 0],
    low: [1, 2, 1, 0, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [2, 3], stack: [0, 1, 2, 3]
  },
  {
    line: 14,
    text: "Începem explorarea nodului 3. Setăm tin[3] = low[3] = ++timer (care devine 4).",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 15,
    text: "Inițializăm children = 0 pentru nodul 3.",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 16,
    text: "Parcurgem vecinii lui 3. Primul vecin este 2.",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 2], stack: [0, 1, 2, 3]
  },
  {
    line: 17,
    text: "Vecinul 2 este părintele nodului 3. Continuăm.",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 2], stack: [0, 1, 2, 3]
  },
  {
    line: 16,
    text: "Următorul vecin al nodului 3 este 4.",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 4], stack: [0, 1, 2, 3]
  },
  {
    line: 17,
    text: "Vecinul 4 nu este părinte.",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 4], stack: [0, 1, 2, 3]
  },
  {
    line: 18,
    text: "Verificăm dacă 4 a fost vizitat. tin[4] este 0 (nevizitat).",
    u: 3, p: 2, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 4], stack: [0, 1, 2, 3]
  },
  {
    line: 21,
    text: "Incrementăm children = 1 pentru nodul 3.",
    u: 3, p: 2, timer: 4, children: 1,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 4], stack: [0, 1, 2, 3]
  },
  {
    line: 22,
    text: "Apelăm recursiv dfs(4, 3).",
    u: 4, p: 3, timer: 4, children: 0,
    tin: [1, 2, 3, 4, 0],
    low: [1, 2, 1, 4, 0],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [3, 4], stack: [0, 1, 2, 3, 4]
  },
  {
    line: 14,
    text: "Începem explorarea nodului 4. Setăm tin[4] = low[4] = ++timer (care devine 5).",
    u: 4, p: 3, timer: 5, children: 0,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3, 4]
  },
  {
    line: 15,
    text: "Inițializăm children = 0 pentru nodul 4.",
    u: 4, p: 3, timer: 5, children: 0,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3, 4]
  },
  {
    line: 16,
    text: "Parcurgem vecinii lui 4. Singurul vecin este nodul 3.",
    u: 4, p: 3, timer: 5, children: 0,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [4, 3], stack: [0, 1, 2, 3, 4]
  },
  {
    line: 17,
    text: "Vecinul 3 este părintele nodului 4. Continuăm.",
    u: 4, p: 3, timer: 5, children: 0,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: [4, 3], stack: [0, 1, 2, 3, 4]
  },
  {
    line: 32,
    text: "Finalizăm explorarea vecinilor nodului 4. Deoarece părintele p este 3 (nu -1), nu verificăm condiția de rădăcină. Revenim din dfs(4, 3).",
    u: 4, p: 3, timer: 5, children: 0,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3, 4]
  },
  {
    line: 23,
    text: "Suntem din nou în dfs(3, 2). Actualizăm low[3] = min(low[3], low[4]) = min(4, 5) = 4.",
    u: 3, p: 2, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 24,
    text: "Verificăm dacă low[4] >= tin[3] (5 >= 4). Este adevărat, iar părintele lui 3 nu este -1 (este 2). Aceasta înseamnă că nodul 3 este punct de articulație.",
    u: 3, p: 2, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, false, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 25,
    text: "Marcăm nodul 3 ca punct de articulație în vectorul is_cut: is_cut[3] = true.",
    u: 3, p: 2, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, true, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 27,
    text: "Verificăm dacă low[4] > tin[3] (5 > 4). Este adevărat, ceea ce înseamnă că muchia {3, 4} este o punte (bridge) în graf.",
    u: 3, p: 2, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, true, false],
    bridges: [], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 28,
    text: "Adăugăm muchia {3, 4} în lista de punți.",
    u: 3, p: 2, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, true, false],
    bridges: [[3, 4]], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 32,
    text: "Finalizăm explorarea vecinilor nodului 3. Părintele este 2, deci nu modificăm is_cut[3] pe baza rădăcinii. Revenim din dfs(3, 2).",
    u: 3, p: 2, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, true, false],
    bridges: [[3, 4]], activeEdge: null, stack: [0, 1, 2, 3]
  },
  {
    line: 23,
    text: "Suntem din nou în dfs(2, 1). Actualizăm low[2] = min(low[2], low[3]) = min(1, 4) = 1.",
    u: 2, p: 1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, true, false],
    bridges: [[3, 4]], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 24,
    text: "Verificăm dacă low[3] >= tin[2] (4 >= 3). Este adevărat, iar părintele lui 2 nu este -1 (este 1). Nodul 2 este punct de articulație.",
    u: 2, p: 1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, false, true, false],
    bridges: [[3, 4]], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 25,
    text: "Marcăm nodul 2 ca punct de articulație: is_cut[2] = true.",
    u: 2, p: 1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4]], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 27,
    text: "Verificăm dacă low[3] > tin[2] (4 > 3). Este adevărat, deci muchia {2, 3} este de asemenea o punte în graf.",
    u: 2, p: 1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4]], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 28,
    text: "Adăugăm muchia {2, 3} în lista de punți.",
    u: 2, p: 1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 32,
    text: "Finalizăm explorarea vecinilor nodului 2. Revenim din dfs(2, 1).",
    u: 2, p: 1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 2, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0, 1, 2]
  },
  {
    line: 23,
    text: "Suntem din nou în dfs(1, 0). Actualizăm low[1] = min(low[1], low[2]) = min(2, 1) = 1.",
    u: 1, p: 0, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0, 1]
  },
  {
    line: 24,
    text: "Verificăm dacă low[2] >= tin[1] (1 >= 2). Fals! Nodul 1 nu este punct de articulație din cauza subarborelui lui 2.",
    u: 1, p: 0, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0, 1]
  },
  {
    line: 27,
    text: "Verificăm dacă low[2] > tin[1] (1 > 2). Fals, muchia {1, 2} nu este punte.",
    u: 1, p: 0, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0, 1]
  },
  {
    line: 32,
    text: "Finalizăm explorarea nodului 1. Revenim din dfs(1, 0).",
    u: 1, p: 0, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0, 1]
  },
  {
    line: 23,
    text: "Suntem din nou în dfs(0, -1). Actualizăm low[0] = min(low[0], low[1]) = min(1, 1) = 1.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0]
  },
  {
    line: 24,
    text: "Verificăm dacă low[1] >= tin[0] (1 >= 1). Adevărat, dar părintele lui 0 este -1 (rădăcină), deci nu îl marcam ca punct de articulație aici.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0]
  },
  {
    line: 27,
    text: "Verificăm dacă low[1] > tin[0] (1 > 1). Fals, muchia {0, 1} nu este punte.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0]
  },
  {
    line: 16,
    text: "Următorul vecin al nodului 0 este nodul 2.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: [0, 2], stack: [0]
  },
  {
    line: 17,
    text: "Vecinul 2 nu este părinte.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: [0, 2], stack: [0]
  },
  {
    line: 18,
    text: "Nodul 2 este vizitat (tin[2] == 3 != 0).",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: [0, 2], stack: [0]
  },
  {
    line: 19,
    text: "Actualizăm low[0] = min(low[0], tin[2]) = min(1, 3) = 1.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: [0, 2], stack: [0]
  },
  {
    line: 16,
    text: "Nu mai sunt vecini de parcurs pentru nodul 0.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0]
  },
  {
    line: 32,
    text: "Verificăm dacă rădăcina 0 este punct de articulație. Deoarece p == -1 și children <= 1 (avem un singur copil în arborele DFS, pe 1), nodul 0 nu este punct de articulație.",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0]
  },
  {
    line: 33,
    text: "Setăm is_cut[0] = false (era deja false).",
    u: 0, p: -1, timer: 5, children: 1,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: [0]
  },
  {
    line: 51,
    text: "Revenim în main. Algoritmul s-a încheiat. Am găsit punctele de articulație {2, 3} și punțile {{2, 3}, {3, 4}}.",
    u: -1, p: -1, timer: 5, children: 0,
    tin: [1, 2, 3, 4, 5],
    low: [1, 1, 1, 4, 5],
    is_cut: [false, false, true, true, false],
    bridges: [[3, 4], [2, 3]], activeEdge: null, stack: []
  }
];

export const data = {
  presentation: `### Punți și Puncte de Articulație (Algoritmul lui Tarjan)

În teoria grafurilor, o **punte** (sau muchie de tăiere) este o muchie a cărei eliminare mărește numărul de componente conexe ale grafului. Un **punct de articulație** (sau nod de tăiere) este un nod a cărui eliminare (împreună cu toate muchiile incidente lui) mărește numărul de componente conexe.

Algoritmul lui Tarjan folosește o singură parcurgere DFS pentru a le găsi eficient. Fiecărui nod $u$ i se asociază doi indici:
- \`tin[u]\`: timpul de descoperire al nodului $u$ în DFS.
- \`low[u]\`: cel mai mic timp de descoperire al unui nod accesibil din subarborele lui $u$ folosind cel mult o muchie de întoarcere.

Pentru o muchie directă $(u, v)$ în DFS (unde $u$ este părintele lui $v$):
1. Muchia $(u, v)$ este **punte** dacă și numai dacă:
   $$low[v] > tin[u]$$
   Aceasta înseamnă că din subarborele lui $v$ nu se poate ajunge înapoi la $u$ sau la vreun strămoș al său folosind o muchie de întoarcere.
2. Rădăcina DFS este **punct de articulație** dacă și numai dacă are cel puțin doi copii în arborele DFS.
3. Un nod $u$ care nu este rădăcină este **punct de articulație** dacă și numai dacă are un fiu $v$ astfel încât:
   $$low[v] \\ge tin[u]$$
   Aceasta înseamnă că subarborele lui $v$ nu se poate conecta cu niciun strămoș strict al lui $u$.`,

  complexity: `### Complexitate

- **Timp:** $\\mathcal{O}(V + E)$ – o singură parcurgere DFS în care fiecare nod și muchie este vizitată de un număr constant de ori.
- **Spațiu:** $\\mathcal{O}(V + E)$ – pentru lista de adiacență, vectorii auxiliari (\`tin\`, \`low\`, \`is_cut\`) și stiva recursivă.`,

  variations: `### Variații și Cazuri Particulare

- **Graf 2-Vertex-Connected**: Un graf este biconex în noduri dacă nu are puncte de articulație.
- **Graf 2-Edge-Connected**: Un graf este biconex în muchii dacă nu are punți.
- **Detecție de cicluri**: Orice muchie care nu este o punte face parte din cel puțin un ciclu simplu.`,

  applications: `### Aplicații Reale

- **Rețele tolerante la erori**: Determinarea serverelor sau a conexiunilor critice (single point of failure) dintr-o rețea de calculatoare.
- **Rețele electrice și logistice**: Identificarea intersecțiilor sau cablurilor a căror defectare ar izola anumite secțiuni ale rețelei.
- **Analiza rețelelor sociale**: Identificarea persoanelor care servesc ca singură punte de legătură între două comunități distincte.`,

  code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<vector<int>> adj;
vector<int> tin, low;
int timer = 0;
vector<pair<int, int>> bridges;
vector<bool> is_cut;

void dfs(int u, int p = -1) {
    tin[u] = low[u] = ++timer;
    int children = 0;
    for (int v : adj[u]) {
        if (v == p) continue;
        if (tin[v] != 0) {
            low[u] = min(low[u], tin[v]);
        } else {
            children++;
            dfs(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] >= tin[u]) {
                is_cut[u] = true;
            }
            if (low[v] > tin[u]) {
                bridges.push_back({u, v});
            }
        }
    }
    if (p == -1 && children <= 1) {
        is_cut[u] = false;
    }
}

int main() {
    int n = 5;
    adj.resize(n);
    tin.assign(n, 0);
    low.assign(n, 0);
    is_cut.assign(n, false);

    adj[0].push_back(1); adj[1].push_back(0);
    adj[1].push_back(2); adj[2].push_back(1);
    adj[2].push_back(0); adj[0].push_back(2);
    adj[2].push_back(3); adj[3].push_back(2);
    adj[3].push_back(4); adj[4].push_back(3);

    dfs(0);
    return 0;
}
`,

  explanations: steps.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: [
      {
        label: "Stiva recursivă",
        groups: [
          step.stack.map(node => ({
            val: node.toString(),
            active: node === step.u
          }))
        ]
      },
      {
        label: "Low-link",
        groups: [
          step.low.map((val, idx) => ({
            val: `low[${idx}]: ${val !== 0 ? val : '-'}`,
            active: idx === step.u
          }))
        ]
      },
      {
        label: "tin",
        groups: [
          step.tin.map((val, idx) => ({
            val: `tin[${idx}]: ${val !== 0 ? val : '-'}`,
            active: idx === step.u
          }))
        ]
      }
    ]
  })),

  problems: {
    easy: [
      {
        title: "Critical Connections in a Network",
        url: "https://leetcode.com/problems/critical-connections-in-a-network/",
        desc: "Găsește toate punțile (critical connections) dintr-un graf neorientat dat folosind algoritmul lui Tarjan."
      }
    ],
    medium: [
      {
        title: "Articulation Points - I",
        url: "https://www.geeksforgeeks.org/problems/articulation-points-1587115620/1",
        desc: "Implementează detecția punctelor de articulație într-un graf neorientat."
      }
    ],
    hard: [
      {
        title: "Severely Connected Graph",
        url: "https://codeforces.com/problemset/problem/118/E",
        desc: "Verifică dacă un graf poate fi orientat pentru a deveni tare conex (adică nu conține punți)."
      }
    ]
  },

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const step = steps[stepIndex] || steps[steps.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];

      globalVars.push({ name: "timer", type: "int", val: step.timer, expandable: false });
      globalVars.push({ name: "tin", type: "std::vector<int>", val: "{" + step.tin.join(", ") + "}", expandable: false });
      globalVars.push({ name: "low", type: "std::vector<int>", val: "{" + step.low.join(", ") + "}", expandable: false });
      globalVars.push({ name: "is_cut", type: "std::vector<bool>", val: "{" + step.is_cut.map(x => x ? "true" : "false").join(", ") + "}", expandable: false });
      globalVars.push({ name: "bridges", type: "std::vector<std::pair<int,int>>", val: "size = " + step.bridges.length, expandable: true });

      if (step.u !== -1) {
        vars.push({ name: "u", type: "int", val: step.u, expandable: false });
        vars.push({ name: "p", type: "int", val: step.p, expandable: false });
        vars.push({ name: "children", type: "int", val: step.children, expandable: false });
        if (step.activeEdge) {
          vars.push({ name: "v", type: "int", val: step.activeEdge[1], expandable: false });
        }
      }

      frames.push({ name: "main()", file: "main.cpp", line: 50 });
      if (step.u !== -1) {
        const path = [];
        for (let i = 0; i < step.stack.length; i++) {
          const curr = step.stack[i];
          const parent = i === 0 ? -1 : step.stack[i - 1];
          path.push({ u: curr, p: parent });
        }
        for (const f of path) {
          frames.unshift({
            name: `dfs(u = ${f.u}, p = ${f.p})`,
            file: "solution.cpp",
            line: activeLine
          });
        }
      }

      let inlineVal = null;
      if (step.u !== -1) {
        inlineVal = `u: ${step.u}, p: ${step.p}, low[u]: ${step.low[step.u]}`;
        if (step.activeEdge) {
          inlineVal += `, v: ${step.activeEdge[1]}`;
        }
      }

      return { vars, globalVars, frames, inlineVal };
    },

    getInlineValueForLine: (stepIndex, lineNum) => {
      const step = steps[stepIndex];
      if (!step || step.u === -1) return null;

      if (lineNum === 14) {
        return `u: ${step.u}, tin[u]: ${step.tin[step.u]}`;
      }
      if (lineNum === 15) {
        return `children: ${step.children}`;
      }
      if (lineNum === 16 || lineNum === 17) {
        return step.activeEdge ? `v: ${step.activeEdge[1]}` : null;
      }
      if (lineNum === 19) {
        return `low[u]: ${step.low[step.u]}`;
      }
      if (lineNum === 23) {
        const v = step.activeEdge ? step.activeEdge[1] : -1;
        return v !== -1 ? `low[u]: ${step.low[step.u]}, low[v]: ${step.low[v]}` : null;
      }
      if (lineNum === 24 || lineNum === 25) {
        const v = step.activeEdge ? step.activeEdge[1] : -1;
        return v !== -1 ? `low[v]: ${step.low[v]} >= tin[u]: ${step.tin[step.u]}` : null;
      }
      if (lineNum === 27 || lineNum === 28) {
        const v = step.activeEdge ? step.activeEdge[1] : -1;
        return v !== -1 ? `low[v]: ${step.low[v]} > tin[u]: ${step.tin[step.u]}` : null;
      }
      return null;
    },

    getGraphVisual: (stepIndex) => {
      const step = steps[stepIndex] || steps[steps.length - 1];

      const staticNodes = [
        { id: "0", x: 100, y: 50, label: "0" },
        { id: "1", x: 50, y: 150, label: "1" },
        { id: "2", x: 150, y: 150, label: "2" },
        { id: "3", x: 150, y: 250, label: "3" },
        { id: "4", x: 150, y: 350, label: "4" }
      ];

      const staticEdges = [
        { source: "0", target: "1" },
        { source: "1", target: "2" },
        { source: "2", target: "0" },
        { source: "2", target: "3" },
        { source: "3", target: "4" }
      ];

      return {
        directed: false,
        title: "Punți și Puncte de Articulație",
        nodes: staticNodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (idNum === step.u) {
            state = "active";
          } else if (step.tin[idNum] > 0) {
            state = "visited";
          }

          let desc = "tin/low: -/-";
          if (step.tin[idNum] > 0) {
            desc = `tin/low: ${step.tin[idNum]}/${step.low[idNum]}`;
            if (step.is_cut[idNum]) {
              desc += " (Artic)";
            }
          }

          return { ...n, state, desc };
        }),
        edges: staticEdges.map(e => {
          const u = parseInt(e.source), v = parseInt(e.target);
          
          const isCurrentActive = step.activeEdge && 
            ((step.activeEdge[0] === u && step.activeEdge[1] === v) || 
             (step.activeEdge[0] === v && step.activeEdge[1] === u));

          const isBridge = step.bridges.some(b => 
            (b[0] === u && b[1] === v) || (b[0] === v && b[1] === u)
          );

          return { 
            ...e, 
            active: isCurrentActive || isBridge,
            weight: isBridge ? "punte" : undefined
          };
        })
      };
    }
  }
};
