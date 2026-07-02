const steps = [
  { line: 70, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Apelăm solve_2sat() din main." },
  { line: 41, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Inițializăm numărul total de noduri: num_nodes = 2 * n = 6." },
  { line: 42, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Inițializăm vectorul dfn cu 0." },
  { line: 43, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Inițializăm vectorul low cu 0." },
  { line: 44, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Inițializăm vectorul scc cu 0." },
  { line: 45, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Inițializăm vectorul in_stack cu false." },
  { line: 47, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Pornim bucla de parcurgere a celor 6 noduri (0 la 5). Începem cu i = 0." },
  { line: 48, u: null, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Verificăm dacă nodul 0 este vizitat. dfn[0] == 0 (nu este vizitat)." },
  { line: 49, u: 0, v: null, dfn: [0,0,0,0,0,0], low: [0,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Apelăm dfs(0) pentru a începe parcurgerea." },
  { line: 17, u: 0, v: null, dfn: [1,0,0,0,0,0], low: [1,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [], assigned: [], text: "Intrăm în dfs(0). Atribuim dfn[0] = low[0] = ++timer = 1." },
  { line: 18, u: 0, v: null, dfn: [1,0,0,0,0,0], low: [1,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [false,false,false,false,false,false], st: [0], assigned: [], text: "Adăugăm nodul 0 pe stiva st." },
  { line: 19, u: 0, v: null, dfn: [1,0,0,0,0,0], low: [1,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,false,false], st: [0], assigned: [], text: "Marcăm in_stack[0] = true." },
  { line: 20, u: 0, v: 4, dfn: [1,0,0,0,0,0], low: [1,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,false,false], st: [0], assigned: [], text: "Parcurgem vecinii lui 0. Singurul vecin este v = 4 (din clauza ~x0 v x2 => x0 -> x2)." },
  { line: 21, u: 0, v: 4, dfn: [1,0,0,0,0,0], low: [1,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,false,false], st: [0], assigned: [], text: "Nodul 4 nu este vizitat (dfn[4] == 0)." },
  { line: 22, u: 4, v: null, dfn: [1,0,0,0,0,0], low: [1,0,0,0,0,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,false,false], st: [0], assigned: [], text: "Apelăm recursiv dfs(4)." },
  { line: 17, u: 4, v: null, dfn: [1,0,0,0,2,0], low: [1,0,0,0,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,false,false], st: [0], assigned: [], text: "Setăm dfn[4] = low[4] = ++timer = 2." },
  { line: 18, u: 4, v: null, dfn: [1,0,0,0,2,0], low: [1,0,0,0,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,false,false], st: [0,4], assigned: [], text: "Adăugăm nodul 4 pe stivă." },
  { line: 19, u: 4, v: null, dfn: [1,0,0,0,2,0], low: [1,0,0,0,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,true,false], st: [0,4], assigned: [], text: "Marcăm in_stack[4] = true." },
  { line: 20, u: 4, v: 3, dfn: [1,0,0,0,2,0], low: [1,0,0,0,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,true,false], st: [0,4], assigned: [], text: "Vecinii lui 4 sunt {3, 2}. Explorăm primul vecin v = 3 (~x1)." },
  { line: 21, u: 4, v: 3, dfn: [1,0,0,0,2,0], low: [1,0,0,0,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,true,false], st: [0,4], assigned: [], text: "Nodul 3 nu este vizitat (dfn[3] == 0)." },
  { line: 22, u: 3, v: null, dfn: [1,0,0,0,2,0], low: [1,0,0,0,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,true,false], st: [0,4], assigned: [], text: "Apelăm recursiv dfs(3)." },
  { line: 17, u: 3, v: null, dfn: [1,0,0,3,2,0], low: [1,0,0,3,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,true,false], st: [0,4], assigned: [], text: "Setăm dfn[3] = low[3] = ++timer = 3." },
  { line: 18, u: 3, v: null, dfn: [1,0,0,3,2,0], low: [1,0,0,3,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,false,true,false], st: [0,4,3], assigned: [], text: "Adăugăm nodul 3 pe stivă." },
  { line: 19, u: 3, v: null, dfn: [1,0,0,3,2,0], low: [1,0,0,3,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Marcăm in_stack[3] = true." },
  { line: 20, u: 3, v: 0, dfn: [1,0,0,3,2,0], low: [1,0,0,3,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Vecinii lui 3 sunt {0, 5}. Explorăm vecinul v = 0 (x0)." },
  { line: 21, u: 3, v: 0, dfn: [1,0,0,3,2,0], low: [1,0,0,3,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Nodul 0 este vizitat deja (dfn[0] == 1)." },
  { line: 24, u: 3, v: 0, dfn: [1,0,0,3,2,0], low: [1,0,0,3,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Deoarece 0 este pe stivă, actualizăm low[3] = min(low[3], dfn[0]) = min(3, 1) = 1." },
  { line: 20, u: 3, v: 5, dfn: [1,0,0,3,2,0], low: [1,0,0,1,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Explorăm următorul vecin al lui 3, v = 5 (~x2)." },
  { line: 21, u: 3, v: 5, dfn: [1,0,0,3,2,0], low: [1,0,0,1,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Nodul 5 nu este vizitat (dfn[5] == 0)." },
  { line: 22, u: 5, v: null, dfn: [1,0,0,3,2,0], low: [1,0,0,1,2,0], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Apelăm recursiv dfs(5)." },
  { line: 17, u: 5, v: null, dfn: [1,0,0,3,2,4], low: [1,0,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3], assigned: [], text: "Setăm dfn[5] = low[5] = ++timer = 4." },
  { line: 18, u: 5, v: null, dfn: [1,0,0,3,2,4], low: [1,0,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,false], st: [0,4,3,5], assigned: [], text: "Adăugăm nodul 5 pe stivă." },
  { line: 19, u: 5, v: null, dfn: [1,0,0,3,2,4], low: [1,0,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,true], st: [0,4,3,5], assigned: [], text: "Marcăm in_stack[5] = true." },
  { line: 20, u: 5, v: 1, dfn: [1,0,0,3,2,4], low: [1,0,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,true], st: [0,4,3,5], assigned: [], text: "Vecinii lui 5: explorăm v = 1 (~x0)." },
  { line: 21, u: 5, v: 1, dfn: [1,0,0,3,2,4], low: [1,0,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,true], st: [0,4,3,5], assigned: [], text: "Nodul 1 nu este vizitat (dfn[1] == 0)." },
  { line: 22, u: 1, v: null, dfn: [1,0,0,3,2,4], low: [1,0,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,true], st: [0,4,3,5], assigned: [], text: "Apelăm recursiv dfs(1)." },
  { line: 17, u: 1, v: null, dfn: [1,5,0,3,2,4], low: [1,5,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,true], st: [0,4,3,5], assigned: [], text: "Setăm dfn[1] = low[1] = ++timer = 5." },
  { line: 18, u: 1, v: null, dfn: [1,5,0,3,2,4], low: [1,5,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,false,false,true,true,true], st: [0,4,3,5,1], assigned: [], text: "Adăugăm nodul 1 pe stivă." },
  { line: 19, u: 1, v: null, dfn: [1,5,0,3,2,4], low: [1,5,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,false,true,true,true], st: [0,4,3,5,1], assigned: [], text: "Marcăm in_stack[1] = true." },
  { line: 20, u: 1, v: 2, dfn: [1,5,0,3,2,4], low: [1,5,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,false,true,true,true], st: [0,4,3,5,1], assigned: [], text: "Vecinii lui 1: explorăm v = 2 (x1)." },
  { line: 21, u: 1, v: 2, dfn: [1,5,0,3,2,4], low: [1,5,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,false,true,true,true], st: [0,4,3,5,1], assigned: [], text: "Nodul 2 nu este vizitat (dfn[2] == 0)." },
  { line: 22, u: 2, v: null, dfn: [1,5,0,3,2,4], low: [1,5,0,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,false,true,true,true], st: [0,4,3,5,1], assigned: [], text: "Apelăm recursiv dfs(2)." },
  { line: 17, u: 2, v: null, dfn: [1,5,6,3,2,4], low: [1,5,6,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,false,true,true,true], st: [0,4,3,5,1], assigned: [], text: "Setăm dfn[2] = low[2] = ++timer = 6." },
  { line: 18, u: 2, v: null, dfn: [1,5,6,3,2,4], low: [1,5,6,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,false,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Adăugăm nodul 2 pe stivă." },
  { line: 19, u: 2, v: null, dfn: [1,5,6,3,2,4], low: [1,5,6,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Marcăm in_stack[2] = true." },
  { line: 20, u: 2, v: 5, dfn: [1,5,6,3,2,4], low: [1,5,6,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Vecinii lui 2: explorăm v = 5 (~x2)." },
  { line: 21, u: 2, v: 5, dfn: [1,5,6,3,2,4], low: [1,5,6,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Nodul 5 este vizitat deja (dfn[5] == 4)." },
  { line: 24, u: 2, v: 5, dfn: [1,5,6,3,2,4], low: [1,5,6,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Deoarece 5 este pe stivă, actualizăm low[2] = min(low[2], dfn[5]) = min(6, 4) = 4." },
  { line: 28, u: 2, v: null, dfn: [1,5,6,3,2,4], low: [1,5,4,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Mergem la sfârșitul funcției. Deoarece low[2] (4) != dfn[2] (6), revenim la apelul părintelui." },
  { line: 23, u: 1, v: 2, dfn: [1,5,6,3,2,4], low: [1,5,4,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Reveniți în dfs(1). Actualizăm low[1] = min(low[1], low[2]) = min(5, 4) = 4." },
  { line: 28, u: 1, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Am terminat vecinii lui 1. low[1] (4) != dfn[1] (5), deci revenim la dfs(5)." },
  { line: 23, u: 5, v: 1, dfn: [1,5,6,3,2,4], low: [1,4,4,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Reveniți în dfs(5). Actualizăm low[5] = min(low[5], low[1]) = min(4, 4) = 4." },
  { line: 28, u: 5, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], assigned: [], text: "Am terminat vecinii lui 5. Verificăm low[5] == dfn[5]. Cum 4 == 4, am găsit o componentă tare conexă!" },
  { line: 29, u: 5, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,3,2,4], scc: [0,0,0,0,0,0], in_stack: [true,true,true,true,true,true], st: [0,4,3,5,1,2], scc_cnt: 1, assigned: [], text: "Incrementăm scc_cnt la 1." },
  { line: 34, u: 5, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,3,2,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Extragem de pe stivă toate nodurile până la 5: scoatem 2, 1 și 5. Acestea formează componenta 1." },
  { line: 23, u: 3, v: 5, dfn: [1,5,6,3,2,4], low: [1,4,4,3,2,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Revenim în dfs(3). Actualizăm low[3] = min(low[3], low[5]) = min(1, 4) = 1." },
  { line: 28, u: 3, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,2,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Am terminat vecinii lui 3. low[3] (1) != dfn[3] (3), deci revenim la dfs(4)." },
  { line: 23, u: 4, v: 3, dfn: [1,5,6,3,2,4], low: [1,4,4,1,2,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Revenim în dfs(4). Actualizăm low[4] = min(low[4], low[3]) = min(2, 1) = 1." },
  { line: 20, u: 4, v: 2, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Explorăm următorul vecin al lui 4, v = 2 (x1)." },
  { line: 21, u: 4, v: 2, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Nodul 2 este vizitat deja." },
  { line: 24, u: 4, v: 2, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Deoarece 2 nu mai este pe stivă (a fost extras), nu actualizăm low[4]." },
  { line: 28, u: 4, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Am terminat vecinii lui 4. low[4] (1) != dfn[4] (2), deci revenim la dfs(0)." },
  { line: 23, u: 0, v: 4, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Revenim în dfs(0). Actualizăm low[0] = min(low[0], low[4]) = min(1, 1) = 1." },
  { line: 28, u: 0, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 1, assigned: [], text: "Am terminat vecinii lui 0. Verificăm low[0] == dfn[0]. Cum 1 == 1, am găsit o altă componentă tare conexă!" },
  { line: 29, u: 0, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [0,1,1,0,0,1], in_stack: [true,false,false,true,true,false], st: [0,4,3], scc_cnt: 2, assigned: [], text: "Incrementăm scc_cnt la 2." },
  { line: 34, u: 0, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Extragem din stivă toate nodurile până la 0: scoatem 3, 4 și 0. Acestea formează componenta 2." },
  { line: 51, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Funcția dfs(0) se încheie. În solve_2sat(), bucla i=1..5 verifică dacă restul de noduri sunt vizitate. Toate sunt deja vizitate." },
  { line: 52, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Trecem la verificarea de consistență a componentelor pentru fiecare variabilă." },
  { line: 53, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Pentru x0: scc[0] (2) != scc[1] (1). OK." },
  { line: 53, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Pentru x1: scc[2] (1) != scc[3] (2). OK." },
  { line: 53, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Pentru x2: scc[4] (2) != scc[5] (1). OK. Sistemul este satisfiabil!" },
  { line: 57, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Redimensionăm vectorul assigned_values la n = 3." },
  { line: 58, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [], text: "Pornim bucla de atribuire pentru fiecare variabilă." },
  { line: 59, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [false], text: "Setăm x0 = scc[0] < scc[1] => 2 < 1 => false." },
  { line: 59, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [false, true], text: "Setăm x1 = scc[2] < scc[3] => 1 < 2 => true." },
  { line: 59, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [false, true, false], text: "Setăm x2 = scc[4] < scc[5] => 2 < 1 => false." },
  { line: 61, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [false, true, false], text: "Returnăm true (sistem satisfiabil)." },
  { line: 71, u: null, v: null, dfn: [1,5,6,3,2,4], low: [1,4,4,1,1,4], scc: [2,1,1,2,2,1], in_stack: [false,false,false,false,false,false], st: [], scc_cnt: 2, assigned: [false, true, false], text: "Soluția a fost găsită. Programul se termină." }
];

export const data = {
  "presentation": "### Satisfiabilitate 2-SAT (2-Satisfiability)\n\nProblema 2-SAT constă în determinarea existenței unei atribuiri de valori de adevăr pentru un set de variabile booleene $x_0, x_1, \\dots, x_{n-1}$ care să satisfacă o formulă booleană în formă conjunctivă normală (CNF), unde fiecare clauză conține exact două literale (de exemplu, $(x_0 \\lor \\neg x_1) \\land (\\neg x_0 \\lor x_2)$).\n\n### Reducerea la Componente Tare Conexe\n\nFiecare clauză de forma $(u \\lor v)$ poate fi scrisă ca două implicații logice echivalente:\n1. $\\neg u \\implies v$\n2. $\\neg v \\implies u$\n\nConstruim un graf orientat (graful de implicație) în care:\n- Fiecare variabilă $x_i$ corespunde la două noduri: un nod pentru $x_i$ (index $2i$) și un nod pentru $\\neg x_i$ (index $2i + 1$).\n- Fiecare clauză $(u \\lor v)$ introduce două muchii orientate în graf: de la $\\neg u$ la $v$ și de la $\\neg v$ la $u$.\n\nO formulă 2-SAT este **satisfiabilă** dacă și numai dacă pentru nicio variabilă $x_i$, nodul $x_i$ și nodul $\\neg x_i$ nu se află în aceeași componentă tare conexă (SCC). Dacă se află în aceeași componentă, ar însemna că avem o contradicție reciprocă: $x_i \\implies \\neg x_i$ și $\\neg x_i \\implies x_i$.\n\n### Algoritmul de Rezolvare\n\n1. **Construcția grafului**: Adăugăm implicațiile în graful cu $2n$ noduri.\n2. **Determinarea SCC-urilor**: Folosim algoritmul lui Tarjan sau Kosaraju pentru a identifica componentele tare conexe în timp liniar $O(V + E)$.\n3. **Verificarea consistenței**: Dacă pentru orice $i$, $scc[2i] == scc[2i+1]$, formula este nesatisfiabilă.\n4. **Atribuirea valorilor**:\n   Deoarece componentele sunt vizitate în ordine invers-topologică (de la frunze spre rădăcină în graful aciclic al componentelor), atribuim variabilelor valori în funcție de ordinea SCC-urilor:\n   - Dacă $scc[2i] < scc[2i + 1]$, atunci setăm $x_i = \\text{true}$.\n   - Dacă $scc[2i] > scc[2i + 1]$, atunci setăm $x_i = \\text{false}$.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(V + E)$ unde $V = 2n$ noduri și $E = 2m$ muchii (pentru cele $m$ clauze). Algoritmul lui Tarjan efectuează o singură parcurgere DFS.\n- **Spațiu:** $O(V + E)$ pentru stocarea grafului de implicație, a stivei și a vectorilor auxiliari (`dfn`, `low`, `scc`, `in_stack`).",
  "variations": "### Variații și Cazuri Particulare\n\n- **Max 2-SAT**: Determinarea numărului maxim de clauze care pot fi satisfăcute este o problemă NP-hard.\n- **Alte algoritmi de SCC**: Kosaraju folosește două parcurgeri DFS pe graful normal și transpus, fiind mai ușor de înțeles dar având o constantă de timp mai mare decât Tarjan.",
  "applications": "### Aplicații Reale\n\n- Probleme de planificare și optimizare a orarelor (scheduling) cu restricții de tip pereche.\n- Rezolvarea unor jocuri logice precum Sudoku de dimensiune redusă sau puzzle-uri logice.\n- Design-ul circuitelor digitale și verificarea formală a componentelor hardware.",
  "code": `#include <iostream>\\n#include <vector>\\n#include <stack>\\n#include <algorithm>\\n\\nusing namespace std;\\n\\nint n = 3;\\nvector<vector<int>> adj;\\nvector<int> dfn, low, scc;\\nvector<bool> in_stack;\\nstack<int> st;\\nint timer = 0, scc_cnt = 0;\\nvector<bool> assigned_values;\\n\\nvoid dfs(int u) {\\n    dfn[u] = low[u] = ++timer;\\n    st.push(u);\\n    in_stack[u] = true;\\n    for (int v : adj[u]) {\\n        if (!dfn[v]) {\\n            dfs(v);\\n            low[u] = min(low[u], low[v]);\\n        } else if (in_stack[v]) {\\n            low[u] = min(low[u], dfn[v]);\\n        }\\n    }\\n    if (low[u] == dfn[u]) {\\n        scc_cnt++;\\n        while (true) {\\n            int v = st.top();\\n            st.pop();\\n            in_stack[v] = false;\\n            scc[v] = scc_cnt;\\n            if (u == v) break;\\n        }\\n    }\\n}\\n\\nbool solve_2sat() {\\n    int num_nodes = 2 * n;\\n    dfn.assign(num_nodes, 0);\\n    low.assign(num_nodes, 0);\\n    scc.assign(num_nodes, 0);\\n    in_stack.assign(num_nodes, false);\\n    timer = 0; scc_cnt = 0;\\n    for (int i = 0; i < num_nodes; i++) {\\n        if (!dfn[i]) {\\n            dfs(i);\\n        }\\n    }\\n    for (int i = 0; i < n; i++) {\\n        if (scc[2 * i] == scc[2 * i + 1]) {\\n            return false;\\n        }\\n    }\\n    assigned_values.resize(n);\\n    for (int i = 0; i < n; i++) {\\n        assigned_values[i] = (scc[2 * i] < scc[2 * i + 1]);\\n    }\\n    return true;\\n}\\n\\nint main() {\\n    adj.resize(2 * n);\\n    adj[1].push_back(2); adj[3].push_back(0);\\n    adj[0].push_back(4); adj[5].push_back(1);\\n    adj[2].push_back(5); adj[4].push_back(3);\\n    adj[3].push_back(5); adj[4].push_back(2);\\n    solve_2sat();\\n    return 0;\\n}\\n`,
  "explanations": steps.map((s, idx) => ({
    "line": s.line,
    "text": s.text,
    "blocksVisual": [
      {
        "label": "Stivă Tarjan (st)",
        "groups": [s.st.map(nodeId => ({ val: nodeId.toString(), active: true }))]
      },
      {
        "label": "scc",
        "groups": [s.scc.map((comp, node) => ({ val: `${node}: C${comp}`, active: comp > 0 }))]
      },
      {
        "label": "dfn / low",
        "groups": [s.dfn.map((d, node) => ({ val: `${node}: [d:${d}, l:${s.low[node]}]`, active: d > 0 }))]
      },
      {
        "label": "Valori Atribuite",
        "groups": [s.assigned.map((val, idx) => ({ val: `x${idx}: ${val}`, active: true }))]
      }
    ]
  })),
  "problems": {
    "easy": [
      {
        "title": "2-SAT",
        "url": "https://www.pbinfo.ro/probleme/3234/2-sat",
        "desc": "Determinarea unei atribuiri satisfiabile pentru o formulă booleană 2-SAT."
      }
    ],
    "medium": [
      {
        "title": "2-SAT Clasic",
        "url": "https://infoarena.ro/problema/2sat",
        "desc": "Problema 2-SAT standard pe Infoarena."
      }
    ],
    "hard": [
      {
        "title": "Restricții speciale 2-SAT",
        "url": "https://codeforces.com/problemset/problem/1215/F",
        "desc": "Problemă avansată reducibilă la 2-SAT folosind modelare de intervale și implicații."
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

      globalVars.push({ name: "n", type: "int", val: "3", expandable: false });
      globalVars.push({ name: "timer", type: "int", val: curr.dfn.reduce((max, x) => Math.max(max, x), 0).toString(), expandable: false });
      globalVars.push({ name: "scc_cnt", type: "int", val: curr.scc.reduce((max, x) => Math.max(max, x), 0).toString(), expandable: false });

      const adjStr = "[[4], [2], [5], [0, 5], [3, 2], [1]]";
      vars.push({ name: "implication_graph", type: "std::vector<std::vector<int>>", val: adjStr, expandable: true });

      const dfnStr = "[" + curr.dfn.join(", ") + "]";
      vars.push({ name: "dfn", type: "std::vector<int>", val: dfnStr, expandable: true });

      const lowStr = "[" + curr.low.join(", ") + "]";
      vars.push({ name: "low", type: "std::vector<int>", val: lowStr, expandable: true });

      const sccStr = "[" + curr.scc.join(", ") + "]";
      vars.push({ name: "scc", type: "std::vector<int>", val: sccStr, expandable: true });

      const assignedStr = "[" + curr.assigned.map(v => v.toString()).join(", ") + "]";
      vars.push({ name: "assigned_values", type: "std::vector<bool>", val: assignedStr, expandable: true });

      if (curr.u !== null) {
        vars.push({ name: "u", type: "int", val: curr.u.toString(), expandable: false });
      }
      if (curr.v !== null) {
        vars.push({ name: "v", type: "int", val: curr.v.toString(), expandable: false });
      }

      frames.push({ name: "main()", file: "main.cpp", line: 70 });
      if (stepIndex >= 9 && stepIndex <= 66) {
        const dfsStack = [];
        if (stepIndex >= 9) dfsStack.push(0);
        if (stepIndex >= 15) dfsStack.push(4);
        if (stepIndex >= 21) dfsStack.push(3);
        if (stepIndex >= 30) dfsStack.push(5);
        if (stepIndex >= 36) dfsStack.push(1);
        if (stepIndex >= 42) dfsStack.push(2);

        if (stepIndex >= 50) dfsStack.pop();
        if (stepIndex >= 52) dfsStack.pop();
        if (stepIndex >= 54) dfsStack.pop();
        if (stepIndex >= 61) dfsStack.pop();
        if (stepIndex >= 67) dfsStack.pop();

        for (let idx = dfsStack.length - 1; idx >= 0; idx--) {
          dfsStack[idx] !== undefined && frames.unshift({ name: `dfs(u = ${dfsStack[idx]})`, file: "solution.cpp", line: activeLine });
        }
        frames.push({ name: "solve_2sat()", file: "solution.cpp", line: 49 });
      } else if (stepIndex >= 1 && stepIndex <= 8) {
        frames.unshift({ name: "solve_2sat()", file: "solution.cpp", line: activeLine });
      } else if (stepIndex >= 67 && stepIndex <= 79) {
        frames.unshift({ name: "solve_2sat()", file: "solution.cpp", line: activeLine });
      }

      inlineVal = `u: ${curr.u !== null ? curr.u : "null"}`;
      if (curr.v !== null) inlineVal += `, v: ${curr.v}`;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const curr = steps[stepIndex];
      if (!curr) return null;
      if (lineNum === curr.line) {
        let res = `u: ${curr.u !== null ? curr.u : "null"}`;
        if (curr.v !== null) res += `, v: ${curr.v}`;
        return res;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const curr = steps[stepIndex] || steps[steps.length - 1];
      const dfn = curr.dfn;
      const low = curr.low;
      const scc = curr.scc;
      const in_stack = curr.in_stack;
      const activeU = curr.u;
      const activeV = curr.v;

      const nodes = [
        { id: "0", label: "x0", x: 80, y: 80 },
        { id: "1", label: "~x0", x: 280, y: 80 },
        { id: "2", label: "x1", x: 80, y: 200 },
        { id: "3", label: "~x1", x: 280, y: 200 },
        { id: "4", label: "x2", x: 80, y: 320 },
        { id: "5", label: "~x2", x: 280, y: 320 }
      ];

      const baseEdges = [
        { source: "1", target: "2" },
        { source: "3", target: "0" },
        { source: "0", target: "4" },
        { source: "5", target: "1" },
        { source: "2", target: "5" },
        { source: "4", target: "3" },
        { source: "3", target: "5" },
        { source: "4", target: "2" }
      ];

      return {
        directed: true,
        title: "Implication Graph (Graf de Implicație)",
        nodes: nodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (activeU === idNum) state = "active";
          else if (in_stack[idNum]) state = "visited";

          let valLabel = "";
          if (curr.assigned.length > 0) {
            const varIdx = Math.floor(idNum / 2);
            const isNegated = idNum % 2 === 1;
            const actualVal = curr.assigned[varIdx];
            const displayVal = isNegated ? !actualVal : actualVal;
            valLabel = ` (${displayVal ? "T" : "F"})`;
          }

          let desc = `dfn: ${dfn[idNum]}, low: ${low[idNum]}`;
          if (scc[idNum] > 0) {
            desc += ` | SCC: ${scc[idNum]}`;
          }

          return {
            ...n,
            label: n.label + valLabel,
            state,
            desc
          };
        }),
        edges: baseEdges.map(e => {
          const isTraversing = (activeU !== null && activeV !== null && activeU.toString() === e.source && activeV.toString() === e.target);
          return {
            ...e,
            active: isTraversing
          };
        })
      };
    }
  }
};
