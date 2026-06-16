# Instrucțiuni Extindere: Fundamente și Algoritmi de Bază

Acest document conține specificațiile detaliate pentru adăugarea noilor capitole din categoria **Fundamente** în Syllabus Tree.

## 📌 Teme de Adăugat

1. **Prelucrarea cifrelor unui număr**
   - **ID Nod:** `fund_digits`
   - **Label:** `Fundamentals/Number_Digits`
   - **Poziție Propusă:** `x: -400, y: -200`
   - **Muchii Propuse:** `{ from: 'fund_digits', to: 'ds_basics' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/number_digits.md`

2. **Prelucrări pe șiruri de numere citite succesiv, fără memorare**
   - **ID Nod:** `fund_streams`
   - **Label:** `Fundamentals/Stream_Processing`
   - **Poziție Propusă:** `x: -200, y: -200`
   - **Muchii Propuse:** `{ from: 'fund_streams', to: 'ds_basics' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/stream_processing.md`

3. **Sisteme de numerație și reguli de conversie**
   - **ID Nod:** `fund_numsys`
   - **Label:** `Fundamentals/Number_Systems`
   - **Poziție Propusă:** `x: 0, y: -200`
   - **Muchii Propuse:** `{ from: 'fund_numsys', to: 'ds_basics' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/number_systems.md`

4. **Simulări**
   - **ID Nod:** `fund_simulations`
   - **Label:** `Fundamentals/Simulations`
   - **Poziție Propusă:** `x: 200, y: -200`
   - **Muchii Propuse:** `{ from: 'fund_simulations', to: 'arr' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/simulations.md`

5. **Funcții și transmiterea parametrilor**
   - **ID Nod:** `fund_functions`
   - **Label:** `Fundamentals/Functions`
   - **Poziție Propusă:** `x: 400, y: -200`
   - **Muchii Propuse:** `{ from: 'fund_functions', to: 'ds_basics' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/functions.md`

6. **Tipuri de date neomogene (`struct`)**
   - **ID Nod:** `fund_structs`
   - **Label:** `Fundamentals/Structs`
   - **Poziție Propusă:** `x: 200, y: 0`
   - **Muchii Propuse:** `{ from: 'fund_structs', to: 'ds_basics' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/structs.md`

7. **Introducere în STL (`vector`, `pair`, `set`, `map`)**
   - **ID Nod:** `fund_stl`
   - **Label:** `Fundamentals/STL_Intro`
   - **Poziție Propusă:** `x: 400, y: 0`
   - **Muchii Propuse:** `{ from: 'fund_stl', to: 'arr' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/stl_intro.md`

8. **Determinarea elementului majoritar**
   - **ID Nod:** `fund_majority`
   - **Label:** `Fundamentals/Majority_Element`
   - **Poziție Propusă:** `x: -200, y: 243`
   - **Muchii Propuse:** `{ from: 'arr', to: 'fund_majority' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/1_fundamentals/majority_element.md`

---

## 🛠️ Pași Specifici pentru Agent
1. Deschide [syllabusData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/syllabusData.js).
2. Adaugă ID-urile nodurilor de mai sus în array-ul `nodes` din `domainGroups` unde `id` este `fund` (Fundamentals).
3. Adaugă fiecare nod în array-ul `rawNodes` la final, respectând structura.
4. Adaugă muchiile în array-ul `rawEdges` pentru a defini corect dependențele din graf.
5. Creează fișierele `.js` corespunzătoare în `dashboard/src/data/categories/Fundamentals/` (respectiv `Data_Structures/` sau `Techniques/` în funcție de clasificare) citind fișierele markdown menționate mai sus.
   - **Important:** Asigură-te că fiecare fișier conține o secțiune bogată de explicații interactive, inclusiv structura `blocksVisual` sau `visual` pentru a ilustra starea variabilelor și extragerea cifrelor/simulărilor pas cu pas.
6. Importă noile fișiere și înregistrează-le în [mockCategoryData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/mockCategoryData.js).

