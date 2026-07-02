const steps = [
  { line: 87, u: null, v: null, head: [-1,-1,-1,-1], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Inițializăm vectorul head cu -1 pentru cele 4 noduri." },
  { line: 88, u: null, v: null, head: [0,1,-1,-1], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Adăugăm muchia 0 -> 1: cap 4, cost 2. Aceasta creează muchia forward (index 0) și muchia reziduală 1 -> 0 (index 1) cu cap 0, cost -2." },
  { line: 89, u: null, v: null, head: [2,1,3,-1], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Adăugăm muchia 0 -> 2: cap 2, cost 5. Se actualizează listele de adiacență ale nodurilor 0 și 2." },
  { line: 90, u: null, v: null, head: [2,4,5,-1], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Adăugăm muchia 1 -> 2: cap 2, cost 1. Se actualizează adiacența nodurilor 1 și 2." },
  { line: 91, u: null, v: null, head: [2,6,5,7], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Adăugăm muchia 1 -> 3: cap 3, cost 4. Se actualizează adiacența nodurilor 1 și 3." },
  { line: 92, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Adăugăm muchia 2 -> 3: cap 4, cost 3. Se actualizează adiacența nodurilor 2 și 3." },
  { line: 94, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Apelăm mcmf() pentru a porni algoritmul Min-Cost Max-Flow." },
  { line: 70, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "În mcmf(), inițializăm max_flow = 0 și min_cost = 0." },
  { line: 72, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Intrăm în bucla principală: apelăm spfa() pentru a găsi primul drum cel mai scurt." },
  { line: 41, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "În spfa(), inițializăm distanțele: dist[0] = 0 și dist[i] = INF pentru restul nodurilor." },
  { line: 42, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Inițializăm vectorii parent_node și parent_edge cu -1." },
  { line: 43, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Inițializăm vectorul in_queue cu false." },
  { line: 46, u: 0, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [0], max_flow: 0, min_cost: 0, text: "Adăugăm sursa 0 în coadă. Setăm in_queue[0] = true." },
  { line: 49, u: 0, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Extragem primul nod u = 0 din coada SPFA." },
  { line: 52, u: 0, v: 2, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 0, min_cost: 0, text: "Parcurgem muchiile din 0. Începem cu e = 2 (0 -> 2, cost 5, cap 2)." },
  { line: 54, u: 0, v: 2, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,5,1e9], p_node: [-1,-1,0,-1], p_edge: [-1,-1,2,-1], q: [2], max_flow: 0, min_cost: 0, text: "Deoarece dist[0] + 5 < dist[2], actualizăm dist[2] = 5 și adăugăm nodul 2 în coadă." },
  { line: 52, u: 0, v: 1, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,1e9,5,1e9], p_node: [-1,-1,0,-1], p_edge: [-1,-1,2,-1], q: [2], max_flow: 0, min_cost: 0, text: "Continuăm bucla de muchii pentru 0. Găsim e = 0 (0 -> 1, cost 2, cap 4)." },
  { line: 54, u: 0, v: 1, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,1e9], p_node: [-1,0,0,-1], p_edge: [0,-1,2,-1], q: [2,1], max_flow: 0, min_cost: 0, text: "Actualizăm dist[1] = 2. Adăugăm nodul 1 în coadă." },
  { line: 49, u: 2, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,1e9], p_node: [-1,0,0,-1], p_edge: [0,-1,2,-1], q: [1], max_flow: 0, min_cost: 0, text: "Extragem u = 2 din coadă." },
  { line: 52, u: 2, v: 3, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,1e9], p_node: [-1,0,0,-1], p_edge: [0,-1,2,-1], q: [1], max_flow: 0, min_cost: 0, text: "Mergem pe e = 8 (2 -> 3, cost 3, cap 4)." },
  { line: 54, u: 2, v: 3, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,8], p_node: [-1,0,0,2], p_edge: [0,-1,2,8], q: [1,3], max_flow: 0, min_cost: 0, text: "Actualizăm dist[3] = dist[2] + 3 = 8. Adăugăm nodul 3 în coadă." },
  { line: 49, u: 1, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,8], p_node: [-1,0,0,2], p_edge: [0,-1,2,8], q: [3], max_flow: 0, min_cost: 0, text: "Extragem u = 1 din coadă." },
  { line: 52, u: 1, v: 3, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,8], p_node: [-1,0,0,2], p_edge: [0,-1,2,8], q: [3], max_flow: 0, min_cost: 0, text: "Parcurgem muchiile din 1. Începem cu e = 6 (1 -> 3, cost 4, cap 3)." },
  { line: 54, u: 1, v: 3, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,6], p_node: [-1,0,0,1], p_edge: [0,-1,2,6], q: [3], max_flow: 0, min_cost: 0, text: "dist[1] + 4 = 6 < dist[3] (8). Actualizăm dist[3] = 6, iar parent_node[3] = 1." },
  { line: 52, u: 1, v: 2, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,5,6], p_node: [-1,0,0,1], p_edge: [0,-1,2,6], q: [3], max_flow: 0, min_cost: 0, text: "Trecem la e = 4 (1 -> 2, cost 1, cap 2)." },
  { line: 54, u: 1, v: 2, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [3,2], max_flow: 0, min_cost: 0, text: "dist[1] + 1 = 3 < dist[2] (5). Actualizăm dist[2] = 3. Reintroducem nodul 2 în coadă." },
  { line: 49, u: 3, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [2], max_flow: 0, min_cost: 0, text: "Extragem u = 3 din coadă. Nodul 3 este destinația și nu are vecini cu capacitate reziduală." },
  { line: 49, u: 2, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [], max_flow: 0, min_cost: 0, text: "Extragem u = 2. Verificăm e = 8 (2 -> 3). dist[2] + 3 = 6 (nu este mai mic decât dist[3] = 6). Coada devine goală." },
  { line: 60, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [], max_flow: 0, min_cost: 0, text: "Algoritmul SPFA se termină. Am găsit cel mai scurt drum de la sursa 0 la sink-ul 3 de cost 6." },
  { line: 73, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [0,0,0,0,0,0,0,0,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [], max_flow: 0, min_cost: 0, text: "Găsim capacitatea reziduală minimă pe drumul 0 -> 1 -> 3. Aceasta este push = min(cap[0], cap[6]) = min(4, 3) = 3." },
  { line: 77, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [3,-3,0,0,0,0,3,-3,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [], max_flow: 0, min_cost: 18, text: "Actualizăm fluxul: adăugăm 3 unități pe muchiile forward (0 și 6) și scădem 3 de pe cele backward (1 și 7). Adăugăm costul: min_cost += 3 * 6 = 18." },
  { line: 82, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [3,-3,0,0,0,0,3,-3,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [], max_flow: 3, min_cost: 18, text: "Actualizăm fluxul total: max_flow = 3." },
  { line: 72, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [3,-3,0,0,0,0,3,-3,0,0], dist: [0,2,3,6], p_node: [-1,0,1,1], p_edge: [0,4,2,6], q: [], max_flow: 3, min_cost: 18, text: "Apelăm din nou spfa() pentru a găsi un alt drum în rețeaua reziduală." },
  { line: 60, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [3,-3,0,0,0,0,3,-3,0,0], dist: [0,2,3,6], p_node: [-1,0,1,2], p_edge: [0,4,2,8], q: [], max_flow: 3, min_cost: 18, text: "SPFA găsește drumul 0 -> 1 -> 2 -> 3 de cost total 6: dist[3] = 6 (cu parent_node = [0, 0, 1, 2] și parent_edge = [-1, 0, 4, 8])." },
  { line: 73, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [3,-3,0,0,0,0,3,-3,0,0], dist: [0,2,3,6], p_node: [-1,0,1,2], p_edge: [0,4,2,8], q: [], max_flow: 3, min_cost: 18, text: "Capacitatea minimă pe noul drum este push = min(4 - 3, 2, 4) = 1." },
  { line: 77, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,0,0,1,-1,3,-3,1,-1], dist: [0,2,3,6], p_node: [-1,0,1,2], p_edge: [0,4,2,8], q: [], max_flow: 3, min_cost: 24, text: "Actualizăm fluxurile pe drum: flow[0] = 4, flow[4] = 1, flow[8] = 1. Costul min_cost devine 18 + 1 * 6 = 24." },
  { line: 82, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,0,0,1,-1,3,-3,1,-1], dist: [0,2,3,6], p_node: [-1,0,1,2], p_edge: [0,4,2,8], q: [], max_flow: 4, min_cost: 24, text: "Actualizăm max_flow = 4." },
  { line: 72, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,0,0,1,-1,3,-3,1,-1], dist: [0,2,3,6], p_node: [-1,0,1,2], p_edge: [0,4,2,8], q: [], max_flow: 4, min_cost: 24, text: "Apelăm spfa() pentru a treia iterație." },
  { line: 60, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,0,0,1,-1,3,-3,1,-1], dist: [0,4,5,8], p_node: [-1,2,0,2], p_edge: [0,-1,2,8], q: [], max_flow: 4, min_cost: 24, text: "SPFA găsește drumul 0 -> 2 -> 3 direct de cost total 8. (0->1 este saturată)." },
  { line: 73, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,0,0,1,-1,3,-3,1,-1], dist: [0,4,5,8], p_node: [-1,2,0,2], p_edge: [0,-1,2,8], q: [], max_flow: 4, min_cost: 24, text: "Capacitatea minimă pe acest drum este push = min(2, 4 - 1) = 2." },
  { line: 77, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,2,-2,1,-1,3,-3,3,-3], dist: [0,4,5,8], p_node: [-1,2,0,2], p_edge: [0,-1,2,8], q: [], max_flow: 4, min_cost: 40, text: "Actualizăm fluxurile: flow[2] = 2, flow[8] = 3. Costul min_cost devine 24 + 2 * 8 = 40." },
  { line: 82, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,2,-2,1,-1,3,-3,3,-3], dist: [0,4,5,8], p_node: [-1,2,0,2], p_edge: [0,-1,2,8], q: [], max_flow: 6, min_cost: 40, text: "max_flow devine 6." },
  { line: 72, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,2,-2,1,-1,3,-3,3,-3], dist: [0,4,5,8], p_node: [-1,2,0,2], p_edge: [0,-1,2,8], q: [], max_flow: 6, min_cost: 40, text: "Apelăm spfa() pentru a patra iterație." },
  { line: 60, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,2,-2,1,-1,3,-3,3,-3], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 6, min_cost: 40, text: "În această iterație, nu mai există nicio cale reziduală de la 0 la 3. spfa() returnează false." },
  { line: 84, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,2,-2,1,-1,3,-3,3,-3], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 6, min_cost: 40, text: "Bucla se încheie. Returnăm rezultatul final: max_flow = 6 și min_cost = 40." },
  { line: 95, u: null, v: null, head: [2,6,8,9], to: [1,0,2,0,2,1,3,1,3,2], next: [-1,-1,0,-1,1,3,4,-1,5,7], cap: [4,0,2,0,2,0,3,0,4,0], cost: [2,-2,5,-5,1,-1,4,-4,3,-3], flow: [4,-4,2,-2,1,-1,3,-3,3,-3], dist: [1e9,1e9,1e9,1e9], p_node: [-1,-1,-1,-1], p_edge: [-1,-1,-1,-1], q: [], max_flow: 6, min_cost: 40, text: "Programul se încheie cu succes." }
];

export const data = {
  "presentation": "### Flux de Cost Minim și Valoare Maximă (Min Cost Max Flow - MCMF)\n\nProblema determinării fluxului de cost minim și valoare maximă (MCMF) constă în găsirea unui flux într-o rețea de transport de valoare maximă, care în același timp minimizează costul total. Fiecare muchie $e$ din rețea are:\n- O capacitate $c(e) \\ge 0$, reprezentând cantitatea maximă de flux care poate trece prin ea.\n- Un cost unitar $w(e) \\ge 0$, adică prețul plătit pentru fiecare unitate de flux trimisă pe muchia respectivă.\n\n### Algoritmul Succesiv al Căilor Scurte\n\nAlgoritmul funcționează similar cu algoritmul Edmonds-Karp, dar în loc să găsească orice drum de augmentare folosind BFS, acesta găsește drumul **cel mai scurt în funcție de cost** în rețeaua reziduală. \n\nDeoarece rețeaua reziduală conține muchii de întoarcere (backward) cu costuri negative (pentru a permite redirecționarea fluxului, având costul $-w(e)$), nu putem folosi algoritmul lui Dijkstra direct fără a utiliza potențiale (potențialele lui Johnson). În schimb, se folosește un algoritm de drum minim care suportă muchii cu costuri negative, cum ar fi **SPFA (Shortest Path Faster Algorithm)** sau **Bellman-Ford**.\n\n### Etapele Algoritmului\n\n1. **SPFA pe Rețeaua Reziduală**: Determinăm drumul minim de la sursă la destinație (sink) în raport cu costul muchiilor reziduale.\n2. **Augmentarea Fluxului**: Dacă s-a găsit un drum, determinăm capacitatea minimă rămasă pe drum ($d$). Trimitem acest flux de lungime $d$ pe drumul respectiv, actualizăm fluxurile pe muchii și creștem costul total cu $d \\cdot \\text{dist}[sink]$.\n3. **Repetare**: Procesul se repetă până când destinația nu mai este accesibilă din sursă în rețeaua reziduală.",
  "complexity": "### Complexitate\n\n- **Timp:** $O(F \\cdot E \\cdot V)$ în cel mai rău caz, unde $F$ este valoarea fluxului maxim, iar $E \\cdot V$ este complexitatea medie a unei rulări SPFA. În practică, SPFA rulează mult mai rapid decât Bellman-Ford.\n- **Spațiu:** $O(V + E)$ pentru stocarea rețelei de flux, a fluxurilor, capacităților și structurilor auxiliare de distanțe și cozi.",
  "variations": "### Variații și Optimizări\n\n- **Algoritmul lui Dijkstra cu Potențiale (Johnson)**: Pentru a evita SPFA la fiecare pas, putem defini un set de potențiale de noduri $h(u)$ pentru a face toate costurile muchiilor non-negative, permițând utilizarea lui Dijkstra cu Heap in $O(F \\cdot E \\log V)$.\n- **Algoritmul de anulare a ciclurilor de cost negativ (Cycle Canceling)**: Începe cu un flux maxim (calculat de exemplu cu Dinic) și caută cicluri cu cost negativ în rețeaua reziduală, trimițând flux de-a lungul lor pentru a reduce costul.",
  "applications": "### Aplicații Reale\n\n- **Problema de transport**: Optimizarea livrărilor din depozite la clienți, minimizând costurile de transport.\n- **Cuplaj de cost minim (Assignment Problem)**: Alocarea a $N$ sarcini către $N$ agenți cu costuri diferite, rezolvabilă prin reducerea la MCMF.\n- **Planificarea zborurilor**: Alocarea optimă a avioanelor pe rute pentru a reduce consumul și taxele.",
  "code": `#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\n\nusing namespace std;\n\nconst int INF = 1e9;\nint n = 4;\nint source = 0, sink = 3;\nvector<int> head;\nvector<int> to_node, next_edge, cap, flow, cost;\nvector<int> dist, parent_edge, parent_node;\nvector<bool> in_queue;\n\nvoid add_edge(int u, int v, int c, int w) {\n    to_node.push_back(v);\n    cap.push_back(c);\n    flow.push_back(0);\n    cost.push_back(w);\n    next_edge.push_back(head[u]);\n    head[u] = to_node.size() - 1;\n\n    to_node.push_back(u);\n    cap.push_back(0);\n    flow.push_back(0);\n    cost.push_back(-w);\n    next_edge.push_back(head[v]);\n    head[v] = to_node.size() - 1;\n}\n\nbool spfa() {\n    dist.assign(n, INF);\n    parent_node.assign(n, -1);\n    parent_edge.assign(n, -1);\n    in_queue.assign(n, false);\n    queue<int> q;\n    q.push(source);\n    dist[source] = 0;\n    in_queue[source] = true;\n    while (!q.empty()) {\n        int u = q.front();\n        q.pop();\n        in_queue[u] = false;\n        for (int e = head[u]; e != -1; e = next_edge[e]) {\n            int v = to_node[e];\n            if (cap[e] - flow[e] > 0 && dist[u] + cost[e] < dist[v]) {\n                dist[v] = dist[u] + cost[e];\n                parent_node[v] = u;\n                parent_edge[v] = e;\n                if (!in_queue[v]) {\n                    q.push(v);\n                    in_queue[v] = true;\n                }\n            }\n        }\n    }\n    return dist[sink] != INF;\n}\n\npair<int, int> mcmf() {\n    int max_flow = 0;\n    int min_cost = 0;\n    while (spfa()) {\n        int push = INF;\n        for (int v = sink; v != source; v = parent_node[v]) {\n            int e = parent_edge[v];\n            push = min(push, cap[e] - flow[e]);\n        }\n        for (int v = sink; v != source; v = parent_node[v]) {\n            int e = parent_edge[v];\n            flow[e] += push;\n            flow[e ^ 1] -= push;\n            min_cost += push * cost[e];\n        }\n        max_flow += push;\n    }\n    return {max_flow, min_cost};\n}\n\nint main() {\n    head.assign(n, -1);\n    add_edge(0, 1, 4, 2);\n    add_edge(0, 2, 2, 5);\n    add_edge(1, 2, 2, 1);\n    add_edge(1, 3, 3, 4);\n    add_edge(2, 3, 4, 3);\n    mcmf();\n    return 0;\n}\n`,
  "explanations": steps.map((s, idx) => ({
    "line": s.line,
    "text": s.text,
    "blocksVisual": [
      {
        "label": "head (Primele indexuri de muchii din noduri)",
        "groups": [s.head.map((h, idx) => ({ val: `Nod ${idx}: head=${h}`, active: h !== -1 }))]
      },
      {
        "label": "Muchiile rețelei reziduale (index: to, cap, flow, cost, next)",
        "groups": [s.to.map((t, idx) => ({ val: `[${idx}]: ${s.flow[idx]}/${s.cap[idx]} c:${s.cost[idx]}`, active: s.flow[idx] !== 0 }))]
      },
      {
        "label": "dist (Distanțe SPFA)",
        "groups": [s.dist.map((d, idx) => ({ val: `Nod ${idx}: ${d === 1000000000 ? "INF" : d}`, active: d !== 1000000000 }))]
      },
      {
        "label": "parent_node (Nodul părinte pe drum)",
        "groups": [s.p_node.map((p, idx) => ({ val: `Nod ${idx} <- ${p === -1 ? "niciunul" : p}`, active: p !== -1 }))]
      }
    ]
  })),
  "problems": {
    "easy": [
      {
        "title": "Flux de Cost Minim",
        "url": "https://www.pbinfo.ro/probleme/3233/l-matching",
        "desc": "Determinarea unui cuplaj maxim sau flux de cost minim pe rețea."
      }
    ],
    "medium": [
      {
        "title": "MCMF Standard",
        "url": "https://infoarena.ro/problema/mcmf",
        "desc": "Problema clasică de Min Cost Max Flow pe Infoarena."
      }
    ],
    "hard": [
      {
        "title": "Aplicație MCMF complexă",
        "url": "https://codeforces.com/problemset/problem/708/D",
        "desc": "Problemă avansată de re-echilibrare a fluxului pe graf pentru a minimiza costul modificărilor."
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

      globalVars.push({ name: "n", type: "int", val: "4", expandable: false });
      globalVars.push({ name: "source", type: "int", val: "0", expandable: false });
      globalVars.push({ name: "sink", type: "int", val: "3", expandable: false });

      const headStr = "[" + curr.head.join(", ") + "]";
      vars.push({ name: "head", type: "std::vector<int>", val: headStr, expandable: true });

      const toStr = "[" + curr.to.join(", ") + "]";
      vars.push({ name: "to", type: "std::vector<int>", val: toStr, expandable: true });

      const nextStr = "[" + curr.next.join(", ") + "]";
      vars.push({ name: "next", type: "std::vector<int>", val: nextStr, expandable: true });

      const capStr = "[" + curr.cap.join(", ") + "]";
      vars.push({ name: "cap", type: "std::vector<int>", val: capStr, expandable: true });

      const flowStr = "[" + curr.flow.join(", ") + "]";
      vars.push({ name: "flow", type: "std::vector<int>", val: flowStr, expandable: true });

      const costStr = "[" + curr.cost.join(", ") + "]";
      vars.push({ name: "cost", type: "std::vector<int>", val: costStr, expandable: true });

      const distStr = "[" + curr.dist.map(d => d === 1000000000 ? "INF" : d).join(", ") + "]";
      vars.push({ name: "dist", type: "std::vector<int>", val: distStr, expandable: true });

      const parentStr = "[" + curr.p_node.join(", ") + "]";
      vars.push({ name: "parent", type: "std::vector<int>", val: parentStr, expandable: true });

      if (curr.u !== null) {
        vars.push({ name: "u", type: "int", val: curr.u.toString(), expandable: false });
      }
      if (curr.v !== null) {
        vars.push({ name: "v", type: "int", val: curr.v.toString(), expandable: false });
      }

      // frames
      frames.push({ name: "main()", file: "main.cpp", line: 94 });
      if (stepIndex >= 7 && stepIndex <= 45) {
        frames.unshift({ name: "mcmf()", file: "solution.cpp", line: activeLine });
      }
      const isInsideSPFA = (
        (stepIndex >= 9 && stepIndex <= 29) ||
        (stepIndex === 33) ||
        (stepIndex === 38) ||
        (stepIndex === 43 || stepIndex === 44)
      );
      if (isInsideSPFA) {
        frames.unshift({ name: "spfa()", file: "solution.cpp", line: activeLine });
      }

      inlineVal = `flow: ${curr.max_flow}, cost: ${curr.min_cost}`;
      if (curr.u !== null) inlineVal += `, u: ${curr.u}`;
      if (curr.v !== null) inlineVal += `, v: ${curr.v}`;

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const curr = steps[stepIndex];
      if (!curr) return null;
      if (lineNum === curr.line) {
        let res = `flow: ${curr.max_flow}, cost: ${curr.min_cost}`;
        if (curr.u !== null) res += `, u: ${curr.u}`;
        if (curr.v !== null) res += `, v: ${curr.v}`;
        return res;
      }
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const curr = steps[stepIndex] || steps[steps.length - 1];
      const dist = curr.dist;
      const p_node = curr.p_node;
      const p_edge = curr.p_edge;
      const flow = curr.flow;
      const cap = curr.cap;
      const cost = curr.cost;
      const activeU = curr.u;
      const activeV = curr.v;

      const nodes = [
        { id: "0", label: "0 (S)", x: 50, y: 200 },
        { id: "1", label: "1", x: 180, y: 100 },
        { id: "2", label: "2", x: 180, y: 300 },
        { id: "3", label: "3 (T)", x: 310, y: 200 }
      ];

      // Forward edges mapping:
      // Edge 0: 0 -> 1, cap 4, cost 2
      // Edge 2: 0 -> 2, cap 2, cost 5
      // Edge 4: 1 -> 2, cap 2, cost 1
      // Edge 6: 1 -> 3, cap 3, cost 4
      // Edge 8: 2 -> 3, cap 4, cost 3
      const baseEdges = [
        { id: 0, source: "0", target: "1", cap: 4, cost: 2 },
        { id: 2, source: "0", target: "2", cap: 2, cost: 5 },
        { id: 4, source: "1", target: "2", cap: 2, cost: 1 },
        { id: 6, source: "1", target: "3", cap: 3, cost: 4 },
        { id: 8, source: "2", target: "3", cap: 4, cost: 3 }
      ];

      // Find path edges
      const pathEdges = new Set();
      let temp = 3;
      while (temp !== 0 && temp !== -1) {
        const pe = p_edge[temp];
        if (pe !== -1) {
          // Normalize to forward edge index (pe is either forward or backward)
          const forwardIdx = pe & ~1;
          pathEdges.add(forwardIdx);
        }
        temp = p_node[temp];
      }

      return {
        directed: true,
        title: "Residual Flow Network (MCMF via SPFA)",
        nodes: nodes.map(n => {
          const idNum = parseInt(n.id);
          let state = undefined;
          if (activeU === idNum) state = "active";
          else if (dist[idNum] !== 1000000000) state = "visited";

          let desc = `dist: ${dist[idNum] === 1000000000 ? "INF" : dist[idNum]}`;
          if (p_node[idNum] !== -1) desc += ` | parent: ${p_node[idNum]}`;

          return { ...n, state, desc };
        }),
        edges: baseEdges.map(e => {
          const curFlow = flow[e.id];
          const curCap = cap[e.id];

          const isPathEdge = pathEdges.has(e.id);
          const isCurrentlyAugmenting = (activeU !== null && activeV !== null && activeU.toString() === e.source && activeV.toString() === e.target);

          let active = false;
          if (isCurrentlyAugmenting || isPathEdge) {
            active = true;
          }

          const label = `${curFlow}/${curCap} ($${e.cost})`;

          return {
            source: e.source,
            target: e.target,
            weight: label,
            active
          };
        })
      };
    }
  }
};
