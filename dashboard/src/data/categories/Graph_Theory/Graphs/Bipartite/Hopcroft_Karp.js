const steps = [
  { line: 79, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [0,0,0,0], q: [], matching: 0, text: "Apelăm hopcroft_karp() din main." },
  { line: 60, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [0,0,0,0], q: [], matching: 0, text: "Inițializăm pair_u cu 0 (NIL) pentru toate nodurile din stânga." },
  { line: 61, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [0,0,0,0], q: [], matching: 0, text: "Inițializăm pair_v cu 0 (NIL) pentru toate nodurile din dreapta." },
  { line: 62, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [0,0,0,0], q: [], matching: 0, text: "Inițializăm vectorul de distanțe dist cu 0." },
  { line: 63, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [0,0,0,0], q: [], matching: 0, text: "Inițializăm numărul de cuplaje matching = 0." },
  { line: 64, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [0,0,0,0], q: [], matching: 0, text: "Începem prima fază apelând bfs() pentru a determina lungimea celor mai scurte drumuri de augmentare." },
  { line: 18, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,1e9,1e9], q: [], matching: 0, text: "În bfs(), parcurgem nodurile din stânga pentru a adăuga nodurile necuplate în coada BFS." },
  { line: 21, u: 1, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,1e9,1e9], q: [1], matching: 0, text: "Nodul L1 este liber. Setăm dist[1] = 0 și îl introducem în coada q." },
  { line: 21, u: 2, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,1e9], q: [1,2], matching: 0, text: "Nodul L2 este liber. Setăm dist[2] = 0 și îl introducem în coada q." },
  { line: 21, u: 3, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,0], q: [1,2,3], matching: 0, text: "Nodul L3 este liber. Setăm dist[3] = 0 și îl introducem în coada q." },
  { line: 26, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,0], q: [1,2,3], matching: 0, text: "Setăm distanța pentru nodul NIL: dist[0] = INF." },
  { line: 27, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,0], q: [1,2,3], matching: 0, text: "Intrăm în bucla principală BFS. Coada conține: [1, 2, 3]." },
  { line: 28, u: 1, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,0], q: [2,3], matching: 0, text: "Extragem u = 1 din coadă." },
  { line: 30, u: 1, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,0], q: [2,3], matching: 0, text: "Deoarece dist[1] (0) < dist[0] (INF), parcurgem vecinii lui 1." },
  { line: 31, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1e9,0,0,0], q: [2,3], matching: 0, text: "Vecinii lui L1 sunt {1, 2} (R1, R2). Analizăm v = 1. Partenerul lui R1 este NIL (0)." },
  { line: 33, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [2,3], matching: 0, text: "Deoarece dist[0] (NIL) == INF, actualizăm dist[0] = dist[1] + 1 = 1." },
  { line: 34, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [2,3,0], matching: 0, text: "Introducem NIL (0) în coadă." },
  { line: 28, u: 2, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [3,0], matching: 0, text: "Extragem u = 2 din coadă." },
  { line: 30, u: 2, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [3,0], matching: 0, text: "Deoarece dist[2] (0) < dist[0] (1), parcurgem vecinii lui L2." },
  { line: 31, u: 2, v: 2, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [3,0], matching: 0, text: "Vecinii lui L2 sunt {2, 3}. Deoarece dist pentru partenerii lor este deja 1 (care != INF), nu îi mai introducem în coadă." },
  { line: 28, u: 3, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [0], matching: 0, text: "Extragem u = 3 din coadă." },
  { line: 30, u: 3, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [0], matching: 0, text: "Deoarece dist[3] (0) < dist[0] (1), parcurgem vecinul lui 3 (v = 1). Partenerul lui R1 este deja vizitat, deci nu adăugăm nimic." },
  { line: 28, u: 0, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Extragem u = 0 (NIL) din coadă." },
  { line: 30, u: 0, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Deoarece dist[0] (1) nu este mai mic decât dist[0] (1), nu mai expandăm nodul NIL." },
  { line: 39, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Bucla BFS se termină. Deoarece dist[0] != INF (este 1), s-au găsit drumuri de augmentare. Returnăm true." },
  { line: 65, u: null, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Revenim în hopcroft_karp(). Pornim parcurgerea nodurilor din stânga pentru a căuta drumuri de augmentare folosind DFS." },
  { line: 66, u: 1, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Nodul L1 este necuplat. Apelăm dfs(1)." },
  { line: 42, u: 1, v: null, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Intrăm în dfs(1)." },
  { line: 44, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Parcurgem vecinii lui 1: v = 1 (R1). Partenerul lui R1 este pair_v[1] = 0 (NIL)." },
  { line: 45, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Verificăm dacă dist[pair_v[1]] == dist[1] + 1 (1 == 0 + 1). Condiția este adevărată." },
  { line: 46, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,0,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Apelăm recursiv dfs(0). Acesta returnează direct true." },
  { line: 47, u: 1, v: 1, pair_u: [0,0,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Înapoi în dfs(1). Cuplăm R1 cu L1: pair_v[1] = 1." },
  { line: 48, u: 1, v: 1, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "Cuplăm L1 cu R1: pair_u[1] = 1." },
  { line: 49, u: 1, v: null, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 0, text: "dfs(1) returnează true." },
  { line: 67, u: null, v: null, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 1, text: "dfs(1) a reușit! Incrementăm matching = 1." },
  { line: 66, u: 2, v: null, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 1, text: "Nodul L2 este necuplat. Apelăm dfs(2)." },
  { line: 42, u: 2, v: null, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 1, text: "Intrăm în dfs(2)." },
  { line: 44, u: 2, v: 2, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 1, text: "Parcurgem vecinii lui 2: {2, 3}. Începem cu v = 2 (R2). Partenerul lui R2 este 0." },
  { line: 45, u: 2, v: 2, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 1, text: "dist[0] (1) == dist[2] + 1 (1) este adevărat." },
  { line: 46, u: 2, v: 2, pair_u: [0,1,0,0], pair_v: [0,1,0,0], dist: [1,0,0,0], q: [], matching: 1, text: "Apelăm recursiv dfs(0) care returnează true." },
  { line: 47, u: 2, v: 2, pair_u: [0,1,0,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 1, text: "Cuplăm R2 cu L2: pair_v[2] = 2." },
  { line: 48, u: 2, v: 2, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 1, text: "Cuplăm L2 cu R2: pair_u[2] = 2." },
  { line: 49, u: 2, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 1, text: "dfs(2) returnează true." },
  { line: 67, u: null, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 2, text: "dfs(2) a reușit! Incrementăm matching = 2." },
  { line: 66, u: 3, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 2, text: "Nodul L3 este necuplat. Apelăm dfs(3)." },
  { line: 42, u: 3, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 2, text: "Intrăm în dfs(3)." },
  { line: 44, u: 3, v: 1, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 2, text: "Vecinul lui 3 este v = 1 (R1). Partenerul lui R1 este pair_v[1] = 1 (L1)." },
  { line: 45, u: 3, v: 1, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 2, text: "dist[1] (0) == dist[3] + 1 (1) este fals, deci nu putem augmenta prin v=1. dfs(3) returnează false." },
  { line: 64, u: null, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1,0,0,0], q: [], matching: 2, text: "Începem faza a doua de BFS. Resetăm distanțele." },
  { line: 21, u: 3, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1e9,1e9,0], q: [3], matching: 2, text: "L3 este singurul nod din stânga necuplat. Setăm dist[3] = 0 și îl adăugăm în coada q." },
  { line: 26, u: null, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1e9,1e9,0], q: [3], matching: 2, text: "dist[0] = INF." },
  { line: 28, u: 3, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1e9,1e9,0], q: [], matching: 2, text: "Extragem u = 3 din coadă. Vecinul său este v = 1 (R1), partenerul său fiind pair_v[1] = 1." },
  { line: 33, u: 3, v: 1, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1,1e9,0], q: [], matching: 2, text: "Deoarece dist[1] == INF, actualizăm dist[1] = dist[3] + 1 = 1." },
  { line: 34, u: 3, v: 1, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1,1e9,0], q: [1], matching: 2, text: "Adăugăm 1 în coadă." },
  { line: 28, u: 1, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1,1e9,0], q: [], matching: 2, text: "Extragem u = 1 din coadă. Vecinii lui 1 sunt {1, 2}. Pentru v = 2 (R2), partenerul este pair_v[2] = 2." },
  { line: 33, u: 1, v: 2, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1,2,0], q: [], matching: 2, text: "Deoarece dist[2] == INF, actualizăm dist[2] = dist[1] + 1 = 2." },
  { line: 34, u: 1, v: 2, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1,2,0], q: [2], matching: 2, text: "Adăugăm 2 în coadă." },
  { line: 28, u: 2, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [1e9,1,2,0], q: [], matching: 2, text: "Extragem u = 2 din coadă. Vecinii lui 2 sunt {2, 3}. Pentru v = 3 (R3), partenerul este 0 (NIL)." },
  { line: 33, u: 2, v: 3, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Deoarece dist[0] == INF, actualizăm dist[0] = dist[2] + 1 = 3." },
  { line: 34, u: 2, v: 3, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [0], matching: 2, text: "Adăugăm 0 în coadă." },
  { line: 39, u: null, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "BFS se termină cu succes (dist[0] = 3 != INF). Există un drum de augmentare de lungime 3." },
  { line: 66, u: 3, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Apelăm dfs(3) pentru a încerca augmentarea de la nodul L3." },
  { line: 42, u: 3, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Intrăm în dfs(3)." },
  { line: 44, u: 3, v: 1, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Vecinul lui 3 este v = 1 (R1). Partenerul lui R1 este 1 (L1)." },
  { line: 45, u: 3, v: 1, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "dist[1] (1) == dist[3]+1 (1) este adevărat. Apelăm recursiv dfs(1)." },
  { line: 42, u: 1, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Intrăm în dfs(1)." },
  { line: 44, u: 1, v: 2, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Vecinul lui 1 este v = 2 (R2). Partenerul lui R2 este 2 (L2)." },
  { line: 45, u: 1, v: 2, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "dist[2] (2) == dist[1]+1 (2) este adevărat. Apelăm recursiv dfs(2)." },
  { line: 42, u: 2, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Intrăm în dfs(2)." },
  { line: 44, u: 2, v: 3, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "Vecinul lui 2 este v = 3 (R3). Partenerul lui R3 este 0 (NIL)." },
  { line: 45, u: 2, v: 3, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "dist[0] (3) == dist[2]+1 (3) este adevărat. Apelăm recursiv dfs(0)." },
  { line: 56, u: 0, v: null, pair_u: [0,1,2,0], pair_v: [0,1,2,0], dist: [3,1,2,0], q: [], matching: 2, text: "dfs(0) returnează direct true." },
  { line: 47, u: 2, v: 3, pair_u: [0,1,2,0], pair_v: [0,1,2,2], dist: [3,1,2,0], q: [], matching: 2, text: "Revenim în dfs(2). Cuplăm R3 cu L2: pair_v[3] = 2." },
  { line: 48, u: 2, v: 3, pair_u: [0,1,3,0], pair_v: [0,1,2,2], dist: [3,1,2,0], q: [], matching: 2, text: "Cuplăm L2 cu R3: pair_u[2] = 3." },
  { line: 49, u: 2, v: null, pair_u: [0,1,3,0], pair_v: [0,1,2,2], dist: [3,1,2,0], q: [], matching: 2, text: "dfs(2) returnează true." },
  { line: 47, u: 1, v: 2, pair_u: [0,1,3,0], pair_v: [0,1,1,2], dist: [3,1,2,0], q: [], matching: 2, text: "Revenim în dfs(1). Cuplăm R2 cu L1: pair_v[2] = 1." },
  { line: 48, u: 1, v: 2, pair_u: [0,2,3,0], pair_v: [0,1,1,2], dist: [3,1,2,0], q: [], matching: 2, text: "Cuplăm L1 cu R2: pair_u[1] = 2." },
  { line: 49, u: 1, v: null, pair_u: [0,2,3,0], pair_v: [0,1,1,2], dist: [3,1,2,0], q: [], matching: 2, text: "dfs(1) returnează true." },
  { line: 47, u: 3, v: 1, pair_u: [0,2,3,0], pair_v: [0,3,1,2], dist: [3,1,2,0], q: [], matching: 2, text: "Revenim în dfs(3). Cuplăm R1 cu L3: pair_v[1] = 3." },
  { line: 48, u: 3, v: 1, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [3,1,2,0], q: [], matching: 2, text: "Cuplăm L3 cu R1: pair_u[3] = 1." },
  { line: 49, u: 3, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [3,1,2,0], q: [], matching: 2, text: "dfs(3) returnează true." },
  { line: 67, u: null, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [3,1,2,0], q: [], matching: 3, text: "Augmentarea s-a terminat cu succes. Incrementăm matching = 3." },
  { line: 64, u: null, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [3,1,2,0], q: [], matching: 3, text: "Începem faza a treia de BFS." },
  { line: 18, u: null, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [1e9,1e9,1e9,1e9], q: [], matching: 3, text: "Toate nodurile din stânga sunt deja cuplate. Niciun nod nu intră în coadă." },
  { line: 26, u: null, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [1e9,1e9,1e9,1e9], q: [], matching: 3, text: "dist[0] = INF." },
  { line: 39, u: null, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [1e9,1e9,1e9,1e9], q: [], matching: 3, text: "BFS se încheie deoarece coada este goală. dist[0] rămâne INF. Returnăm false." },
  { line: 71, u: null, v: null, pair_u: [0,2,3,1], pair_v: [0,3,1,2], dist: [1e9,1e9,1e9,1e9], q: [], matching: 3, text: "Algoritmul Hopcroft-Karp se termină și returnează dimensiunea cuplajului maxim (3)." }
];

export const data = {
  "presentation": "### Algoritmul Hopcroft-Karp\n\nAlgoritmul Hopcroft-Karp determină un cuplaj maxim de cardinalitate într-un graf bipartit în timp $O(E \\sqrt{V})$. Acesta îmbunătățește algoritmul lui Kuhn prin găsirea simultană a mai multor drumuri de augmentare minime în fiecare fază.\n\n### Principiul de Funcționare\n\nAlgoritmul funcționează în faze repetitive, fiecare fază constând în:\n1. **BFS (Breadth-First Search)**:\n   - Pornește din toate nodurile necuplate din stânga ($U$) și generează un graf pe niveluri (Level Graph).\n   - BFS se oprește la primul nivel unde găsește noduri necuplate în dreapta ($V$) care pot ajunge la starea finală `NIL` (nodul dummy 0).\n   - Definește distanțele `dist[u]` pentru fiecare nod din stânga. `dist[NIL]` reprezintă lungimea minimă a unui drum de augmentare.\n2. **DFS (Depth-First Search)**:\n   - Caută căi de augmentare disjuncte în noduri de lungime minimă folosind distanțele calculate de BFS.\n   - Atunci când se găsește o cale de augmentare, matching-ul este actualizat (augmentat) de-a lungul acestei căi.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(E \\sqrt{V})$ deoarece numărul de faze (BFS + DFS) este limitat la $O(\\sqrt{V})$, iar fiecare fază parcurge graful în timp liniar $O(V + E)$.\n- **Spațiu:** $O(V + E)$ pentru listele de adiacență ale grafului, vectorii de cuplaje `pair_u` / `pair_v` și structurile auxiliare de distanțe.",
  "variations": "### Variații și Algoritmul lui Kuhn\n\n- **Algoritmul lui Kuhn**: Folosește doar DFS simplu pentru a căuta căi de augmentare pe rând, având o complexitate de $O(V \\cdot E)$. Deși mai simplu, este mai lent pe grafuri dense și mari.\n- **Flux Maxim**: Problema cuplajului maxim poate fi redusă la flux maxim adăugând o sursă $S$ conectată la $U$ și o destinație $T$ conectată la $V$. Hopcroft-Karp este echivalent cu algoritmul lui Dinic aplicat pe această rețea de flux.",
  "applications": "### Aplicații Reale\n\n- **Sisteme de recomandare**: Asignarea optimă a reclamelor/produselor către utilizatori.\n- **Alocarea resurselor**: Distribuirea sarcinilor către procesoare sau vehicule.\n- **Determining Maximum Independent Set**: În grafuri bipartite, conform teoremei lui König, putem găsi mulțimea independentă maximă folosind cuplajul maxim.",
  "code": `#include <iostream>\\n#include <vector>\\n#include <queue>\\n#include <algorithm>\\n\\nusing namespace std;\\n\\nconst int INF = 1e9;\\nconst int NIL = 0;\\n\\nint n1 = 3;\\nint n2 = 3;\\nvector<vector<int>> adj;\\nvector<int> pair_u, pair_v, dist;\\n\\nbool bfs() {\\n    queue<int> q;\\n    for (int u = 1; u <= n1; u++) {\\n        if (pair_u[u] == NIL) {\\n            dist[u] = 0;\\n            q.push(u);\\n        } else {\\n            dist[u] = INF;\\n        }\\n    }\\n    dist[NIL] = INF;\\n    while (!q.empty()) {\\n        int u = q.front();\\n        q.pop();\\n        if (dist[u] < dist[NIL]) {\\n            for (int v : adj[u]) {\\n                if (dist[pair_v[v]] == INF) {\\n                    dist[pair_v[v]] = dist[u] + 1;\\n                    q.push(pair_v[v]);\\n                }\\n            }\\n        }\\n    }\\n    return (dist[NIL] != INF);\\n}\\n\\nbool dfs(int u) {\\n    if (u != NIL) {\\n        for (int v : adj[u]) {\\n            if (dist[pair_v[v]] == dist[u] + 1) {\\n                if (dfs(pair_v[v])) {\\n                    pair_v[v] = u;\\n                    pair_u[u] = v;\\n                    return true;\\n                }\\n            }\\n        }\\n        dist[u] = INF;\\n        return false;\\n    }\\n    return true;\\n}\\n\\nint hopcroft_karp() {\\n    pair_u.assign(n1 + 1, NIL);\\n    pair_v.assign(n2 + 1, NIL);\\n    dist.assign(n1 + 1, 0);\\n    int matching = 0;\\n    while (bfs()) {\\n        for (int u = 1; u <= n1; u++) {\\n            if (pair_u[u] == NIL && dfs(u)) {\\n                matching++;\\n            }\\n        }\\n    }\\n    return matching;\\n}\\n\\nint main() {\\n    adj.resize(n1 + 1);\\n    adj[1] = {1, 2};\\n    adj[2] = {2, 3};\\n    adj[3] = {1};\\n    hopcroft_karp();\\n    return 0;\\n}\\n`,
  "explanations": steps.map((s, idx) => ({
    "line": s.line,
    "text": s.text,
    "blocksVisual": [
      {
        "label": "pair_u (Cuplaj L -> R)",
        "groups": [s.pair_u.slice(1).map((val, idx) => ({ val: `L${idx+1}: ${val === 0 ? "liber" : "R" + val}`, active: val > 0 }))]
      },
      {
        "label": "pair_v (Cuplaj R -> L)",
        "groups": [s.pair_v.slice(1).map((val, idx) => ({ val: `R${idx+1}: ${val === 0 ? "liber" : "L" + val}`, active: val > 0 }))]
      },
      {
        "label": "dist (Distanțe BFS)",
        "groups": [s.dist.map((d, idx) => ({ val: `${idx === 0 ? "NIL" : "L" + idx}: ${d === 1000000000 ? "INF" : d}`, active: d !== 1000000000 }))]
      },
      {
        "label": "Coada BFS (q)",
        "groups": [s.q.map(nodeId => ({ val: nodeId === 0 ? "NIL" : `L${nodeId}`, active: true }))]
      }
    ]
  })),
  "problems": {
    "easy": [
      {
        "title": "Cuplaj Bipartit",
        "url": "https://www.pbinfo.ro/probleme/2633/cuplaj-maxim",
        "desc": "Problemă clasică de determinare a cuplajului maxim."
      }
    ],
    "medium": [
      {
        "title": "Matching Hopcroft-Karp",
        "url": "https://infoarena.ro/problema/cuplaj",
        "desc": "Implementarea eficientă a cuplajului maxim pe Infoarena."
      }
    ],
    "hard": [
      {
        "title": "Configurații Cuplaj",
        "url": "https://codeforces.com/problemset/problem/1137/F",
        "desc": "Problemă avansată ce folosește cuplaj maxim și structuri de date suplimentare."
      }
    ]
  },
  "globalVars": [],
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const curr = steps[stepIndex] || steps[steps.length - 1];
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = "";

      globalVars.push({ name: "n1", type: "int", val: "3", expandable: false });
      globalVars.push({ name: "n2", type: "int", val: "3", expandable: false });
      globalVars.push({ name: "INF", type: "const int", val: "1e9", expandable: false });
      globalVars.push({ name: "NIL", type: "const int", val: "0", expandable: false });

      const pairUStr = "[" + curr.pair_u.join(", ") + "]";
      vars.push({ name: "pair_u", type: "std::vector<int>", val: pairUStr, expandable: true });

      const pairVStr = "[" + curr.pair_v.join(", ") + "]";
      vars.push({ name: "pair_v", type: "std::vector<int>", val: pairVStr, expandable: true });

      const distStr = "[" + curr.dist.map(d => d === 1000000000 ? "INF" : d).join(", ") + "]";
      vars.push({ name: "dist", type: "std::vector<int>", val: distStr, expandable: true });

      const queueStr = "[" + curr.q.map(x => x === 0 ? "NIL" : x).join(", ") + "]";
      vars.push({ name: "q", type: "std::queue<int>", val: queueStr, expandable: false });

      if (curr.u !== null) {
        vars.push({ name: "u", type: "int", val: curr.u.toString(), expandable: false });
      }
      if (curr.v !== null) {
        vars.push({ name: "v", type: "int", val: curr.v.toString(), expandable: false });
      }

      // frames
      frames.push({ name: "main()", file: "main.cpp", line: 79 });
      if (stepIndex >= 1 && stepIndex <= 5) {
        frames.unshift({ name: "hopcroft_karp()", file: "solution.cpp", line: activeLine });
      } else if (stepIndex >= 6 && stepIndex <= 25) {
        frames.unshift({ name: "bfs()", file: "solution.cpp", line: activeLine });
        frames.push({ name: "hopcroft_karp()", file: "solution.cpp", line: 64 });
      } else if (stepIndex >= 26 && stepIndex <= 43) {
        const dfsStack = [];
        if (stepIndex >= 28) dfsStack.push(1);
        if (stepIndex >= 36) dfsStack.push(2);
        if (stepIndex >= 41) dfsStack.push(3);

        for (let idx = dfsStack.length - 1; idx >= 0; idx--) {
          frames.unshift({ name: `dfs(u = ${dfsStack[idx]})`, file: "solution.cpp", line: activeLine });
        }
        frames.push({ name: "hopcroft_karp()", file: "solution.cpp", line: 66 });
      } else if (stepIndex >= 44 && stepIndex <= 54) {
        frames.unshift({ name: "bfs()", file: "solution.cpp", line: activeLine });
        frames.push({ name: "hopcroft_karp()", file: "solution.cpp", line: 64 });
      } else if (stepIndex >= 55 && stepIndex <= 60) {
        const dfsStack = [3];
        if (stepIndex >= 56) dfsStack.push(1);
        if (stepIndex >= 57) dfsStack.push(2);
        if (stepIndex >= 58) dfsStack.push(0);

        if (stepIndex >= 59) dfsStack.pop();

        for (let idx = dfsStack.length - 1; idx >= 0; idx--) {
          frames.unshift({ name: `dfs(u = ${dfsStack[idx]})`, file: "solution.cpp", line: activeLine });
        }
        frames.push({ name: "hopcroft_karp()", file: "solution.cpp", line: 66 });
      } else if (stepIndex >= 61 && stepIndex <= 62) {
        frames.unshift({ name: "bfs()", file: "solution.cpp", line: activeLine });
        frames.push({ name: "hopcroft_karp()", file: "solution.cpp", line: 64 });
      } else if (stepIndex === 63) {
        frames.unshift({ name: "hopcroft_karp()", file: "solution.cpp", line: activeLine });
      }

      inlineVal = `matching: ${curr.matching}`;
      if (curr.u !== null) inlineVal += `, u: L${curr.u}`;
      if (curr.v !== null) inlineVal += `, v: R${curr.v}`;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const curr = steps[stepIndex];
      if (!curr) return null;
      if (lineNum === curr.line) {
        let res = `matching: ${curr.matching}`;
        if (curr.u !== null) res += `, u: L${curr.u}`;
        if (curr.v !== null) res += `, v: R${curr.v}`;
        return res;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const curr = steps[stepIndex] || steps[steps.length - 1];
      const pair_u = curr.pair_u;
      const pair_v = curr.pair_v;
      const dist = curr.dist;
      const activeU = curr.u;
      const activeV = curr.v;

      const nodes = [
        { id: "L1", label: "L1", x: 80, y: 80 },
        { id: "L2", label: "L2", x: 80, y: 200 },
        { id: "L3", label: "L3", x: 80, y: 320 },
        { id: "R1", label: "R1", x: 280, y: 80 },
        { id: "R2", label: "R2", x: 280, y: 200 },
        { id: "R3", label: "R3", x: 280, y: 320 },
        { id: "NIL", label: "NIL (0)", x: 180, y: 420 }
      ];

      const baseEdges = [
        { source: "L1", target: "R1" },
        { source: "L1", target: "R2" },
        { source: "L2", target: "R2" },
        { source: "L2", target: "R3" },
        { source: "L3", target: "R1" }
      ];

      return {
        directed: false,
        title: "Bipartite Graph (Hopcroft-Karp Matching)",
        nodes: nodes.map(n => {
          let state = undefined;
          let desc = "";

          if (n.id.startsWith("L")) {
            const idx = parseInt(n.id.slice(1));
            if (activeU === idx) state = "active";
            else if (dist[idx] !== 1000000000) state = "visited";
            desc = `dist: ${dist[idx] === 1000000000 ? "INF" : dist[idx]}`;
            if (pair_u[idx] !== 0) desc += ` | cuplat R${pair_u[idx]}`;
          } else if (n.id.startsWith("R")) {
            const idx = parseInt(n.id.slice(1));
            if (activeV === idx) state = "active";
            desc = pair_v[idx] !== 0 ? `cuplat L${pair_v[idx]}` : "liber";
          } else {
            // NIL
            if (activeU === 0) state = "active";
            else if (dist[0] !== 1000000000) state = "visited";
            desc = `dist: ${dist[0] === 1000000000 ? "INF" : dist[0]}`;
          }

          return { ...n, state, desc };
        }),
        edges: baseEdges.map(e => {
          const uIdx = parseInt(e.source.slice(1));
          const vIdx = parseInt(e.target.slice(1));

          const isMatched = (pair_u[uIdx] === vIdx);
          const isCurrentAction = (activeU === uIdx && activeV === vIdx);

          let active = false;
          let weight = "";

          if (isCurrentAction) {
            active = true;
            weight = isMatched ? "recuplare" : "exploră";
          } else if (isMatched) {
            active = true;
            weight = "cuplat";
          }

          return {
            ...e,
            active,
            weight
          };
        })
      };
    }
  }
};
