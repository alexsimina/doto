# Instrucțiuni Extindere: Grafuri, Arbori și Geometrie

Acest document conține specificațiile detaliate pentru adăugarea noilor capitole din categoriile **Graph Theory** și **Geometry** în Syllabus Tree.

## 📌 Teme de Adăugat

### A. Subcategoria Grafuri (Grupul: `graph`)

1. **Algoritmul lui Lee & Algoritmul de Fill (Flood Fill)**
   - **ID Nod:** `graph_lee`
   - **Label:** `Graphs/Lee_Fill`
   - **Poziție Propusă:** `x: 1600, y: 2600`
   - **Muchii Propuse:** `{ from: 'bfs', to: 'graph_lee' }, { from: 'dfs', to: 'graph_lee' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/4_graphs_geometry/lee_fill.md`

2. **Diametrul unui arbore**
   - **ID Nod:** `graph_diameter`
   - **Label:** `Graphs/Tree_Diameter`
   - **Poziție Propusă:** `x: 600, y: 2600`
   - **Muchii Propuse:** `{ from: 'dfs', to: 'graph_diameter' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/4_graphs_geometry/tree_diameter.md`

3. **Algoritmul lui Dial (optimizare Dijkstra)**
   - **ID Nod:** `graph_dial`
   - **Label:** `Graphs/Dial_Optimization`
   - **Poziție Propusă:** `x: 1093, y: 3350`
   - **Muchii Propuse:** `{ from: 'sp_dijkstra', to: 'graph_dial' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/4_graphs_geometry/dial_optimization.md`

### B. Subcategoria Geometrie (Grupul: `math`)

4. **Algoritmi de baleiere (Sweep-line)**
   - **ID Nod:** `geom_sweepline`
   - **Label:** `Geometry/Sweep_Line`
   - **Poziție Propusă:** `x: -1000, y: 350`
   - **Muchii Propuse:** `{ from: 'geom', to: 'geom_sweepline' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/4_graphs_geometry/sweep_line.md`

5. **Înfășurătoare convexă (Convex Hull)**
   - **ID Nod:** `geom_convexhull`
   - **Label:** `Geometry/Convex_Hull`
   - **Poziție Propusă:** `x: -1215, y: 350`
   - **Muchii Propuse:** `{ from: 'geom', to: 'geom_convexhull' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/4_graphs_geometry/convex_hull.md`

---

## 🛠️ Pași Specifici pentru Agent
1. Deschide [syllabusData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/syllabusData.js).
2. Adaugă ID-urile `graph_lee`, `graph_diameter` și `graph_dial` în array-ul `nodes` din `domainGroups` pentru grupul cu `id: 'graph'`.
3. Adaugă ID-urile `geom_sweepline` și `geom_convexhull` în array-ul `nodes` din `domainGroups` pentru grupul cu `id: 'math'`.
4. Adaugă fiecare nod în array-ul `rawNodes` la final.
5. Adaugă muchiile în array-ul `rawEdges` pentru a defini corect dependențele din graf.
6. Pentru grafuri, creează fișierele `.js` corespunzătoare în `dashboard/src/data/categories/Graph_Theory/Graphs/` (sau subfolderele aferente) citind fișierele markdown corespunzătoare.
   - **Important:** Asigură-te că folosești structura `graphVisual` pentru a desena nodurile și muchiile arborelui sau grafului (evidențiind nodurile active/vizitate), sau `matrix` pentru reprezentarea matricei labirintului în cazul algoritmului lui Lee.
7. Pentru geometrie, creează fișierele `.js` corespunzătoare în `dashboard/src/data/categories/Math_Geometry/Geometry/` citind fișierele markdown corespunzătoare.
   - **Important:** Folosește `visual` sau `blocksVisual` pentru a ilustra pozițiile punctelor, sortările pe X/Y și starea înfășurătorii/liniei de baleiere la fiecare pas.
8. Importă noile fișiere și înregistrează-le în [mockCategoryData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/mockCategoryData.js).

