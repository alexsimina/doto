# Instrucțiuni Extindere: Matematică și Teoria Numerelor

Acest document conține specificațiile detaliate pentru adăugarea noilor capitole din categoria **Math & Geometry** (subcategoria **Math**) în Syllabus Tree.

## 📌 Teme de Adăugat

1. **Ciurul lui Eratostene & Descompunerea în factori primi**
   - **ID Nod:** `math_sieve`
   - **Label:** `Math/Sieve_Primes`
   - **Poziție Propusă:** `x: -1458, y: -243`
   - **Muchii Propuse:** `{ from: 'math_sieve', to: 'math1' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/sieve_primes.md`

2. **Aritmetică modulară și Invers modular**
   - **ID Nod:** `math_modular`
   - **Label:** `Math/Modular_Arithmetic`
   - **Poziție Propusă:** `x: -1658, y: -243`
   - **Muchii Propuse:** `{ from: 'math_modular', to: 'math1' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/modular_arithmetic.md`

3. **Exponențiere rapidă**
   - **ID Nod:** `math_fast_exp`
   - **Label:** `Math/Fast_Exponentiation`
   - **Poziție Propusă:** `x: -1258, y: -243`
   - **Muchii Propuse:** `{ from: 'math_fast_exp', to: 'math1' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/fast_exponentiation.md`

4. **Operații cu numere mari (Big Integers)**
   - **ID Nod:** `math_bigint`
   - **Label:** `Math/Big_Integers`
   - **Poziție Propusă:** `x: -1858, y: 0`
   - **Muchii Propuse:** `{ from: 'math_bigint', to: 'comb' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/big_integers.md`

5. **Indicatorul lui Euler**
   - **ID Nod:** `math_euler`
   - **Label:** `Math/Euler_Totient`
   - **Poziție Propusă:** `x: -1458, y: 150`
   - **Muchii Propuse:** `{ from: 'math1', to: 'math_euler' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/euler_totient.md`

6. **Principiul Includerii și Excluderii (PIE)**
   - **ID Nod:** `math_pie`
   - **Label:** `Math/Inclusion_Exclusion`
   - **Poziție Propusă:** `x: -1900, y: 243`
   - **Muchii Propuse:** `{ from: 'comb', to: 'math_pie' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/inclusion_exclusion.md`

7. **Funcția Mobius**
   - **ID Nod:** `math_mobius`
   - **Label:** `Math/Mobius`
   - **Poziție Propusă:** `x: -1458, y: 400`
   - **Muchii Propuse:** `{ from: 'math_euler', to: 'math_mobius' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/mobius.md`

8. **Exponențiere de matrice în timp logaritmic**
   - **ID Nod:** `math_matrix_exp`
   - **Label:** `Math/Matrix_Exponentiation`
   - **Poziție Propusă:** `x: -1000, y: 445`
   - **Muchii Propuse:** `{ from: 'linalg', to: 'math_matrix_exp' }, { from: 'math_fast_exp', to: 'math_matrix_exp' }`
   - **Fișier Explicație Sursă:** `agent_instructions/explanations/3_math_number_theory/matrix_exponentiation.md`

---

## 🛠️ Pași Specifici pentru Agent
1. Deschide [syllabusData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/syllabusData.js).
2. Adaugă ID-urile nodurilor de mai sus în array-ul `nodes` din `domainGroups` unde `id` este `math` (Math & Geometry).
3. Adaugă fiecare nod în array-ul `rawNodes` la final.
4. Adaugă muchiile în array-ul `rawEdges` pentru a defini corect dependențele din graf.
5. Creează fișierele `.js` corespunzătoare în `dashboard/src/data/categories/Math_Geometry/Math/` citind fișierele markdown menționate mai sus.
   - **Important:** Asigură-te că fiecare fișier conține o secțiune bogată de explicații interactive. Pentru teme matematice, folosește `matrix` pentru exponențierea matricelor sau tabele, și `visual` sau `blocksVisual` pentru formule, pași de calcul modular, ciururi sau măști de biți.
6. Importă noile fișiere și înregistrează-le în [mockCategoryData.js](file:///c:/Users/alisi/Desktop/doto/dashboard/src/data/mockCategoryData.js).

