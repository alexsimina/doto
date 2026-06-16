# Instrucțiuni Extindere: Structuri de Date Esențiale

Acest document conține specificațiile detaliate pentru adăugarea noilor capitole din categoria **Data Structures** în Syllabus Tree.

## 📌 Teme de Adăugat

1. **Vectori de frecvență / Sortare prin numărare**
   - **ID Nod:** `ds_frequency`
   - **Label:** `Data_Structures/Frequency_Vectors`
   - **Poziție Propusă:** `x: 800, y: 1053`
   - **Muchii Propuse:** `{ from: 'arr', to: 'ds_frequency' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/2_data_structures/frequency_vectors.md`

2. **Stiva (Stack) și aplicații**
   - **ID Nod:** `ds_stack`
   - **Label:** `Data_Structures/Stack`
   - **Poziție Propusă:** `x: 800, y: 1296`
   - **Muchii Propuse:** `{ from: 'ds_frequency', to: 'ds_stack' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/2_data_structures/stack.md`

3. **Coada (Queue) și Deque**
   - **ID Nod:** `ds_queue_deque`
   - **Label:** `Data_Structures/Queue_Deque`
   - **Poziție Propusă:** `x: 800, y: 1539`
   - **Muchii Propuse:** `{ from: 'ds_stack', to: 'ds_queue_deque' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/2_data_structures/queue_deque.md`

4. **Coada cu priorități (Priority Queue)**
   - **ID Nod:** `ds_priority_queue`
   - **Label:** `Data_Structures/Priority_Queue`
   - **Poziție Propusă:** `x: 800, y: 1782`
   - **Muchii Propuse:** `{ from: 'ds_queue_deque', to: 'ds_priority_queue' }, { from: 'ds_priority_queue', to: 'sp_dijkstra' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/2_data_structures/priority_queue.md`

---

## 🛠️ Pași Specifici pentru Agent
1. Deschide [syllabusData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/syllabusData.js).
2. Adaugă ID-urile nodurilor de mai sus în array-ul `nodes` din `domainGroups` unde `id` este `ds` (Data Structures).
3. Adaugă fiecare nod în array-ul `rawNodes` la final.
4. Adaugă muchiile în array-ul `rawEdges` pentru a defini corect dependențele din graf.
5. Creează fișierele `.js` corespunzătoare în `dashboard/src/data/categories/Data_Structures/` citind fișierele markdown menționate mai sus.
   - **Important:** Asigură-te că fiecare fișier conține o secțiune bogată de explicații interactive, incluzând structura `blocksVisual` pentru a ilustra stiva, coada, deque-ul și coada cu priorități în mod grafic la fiecare pas.
6. Importă noile fișiere și înregistrează-le în [mockCategoryData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/mockCategoryData.js).

