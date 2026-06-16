# Lista de materii care trebuie adăugate în Syllabus Tree

Această listă a fost generată pe baza `programa.pdf` și confruntată cu conținutul actual din `dashboard/src/data/syllabusData.js`. 
Conform `AGENT_README.md`, aceste topicuri vor trebui injectate în fișierele de configurare ale UI-ului și în baza de date locală (prin `.cjs` scripts).

## 1. Fundamente și Algoritmi de Bază
- Prelucrarea cifrelor unui număr (Gimnaziu)
- Prelucrări pe șiruri de numere citite succesiv, fără memorarea lor (Gimnaziu)
- Sisteme de numerație și reguli de conversie
- Simulări
- Funcții și transmiterea parametrilor
- Tipuri de date neomogene (`struct`)
- Introducere în STL (`vector`, `pair`, `set`, `map` etc.)

## 2. Structuri de Date Esențiale
- Vectori de frecvență / Sortare prin numărare
- Stiva (Stack) și aplicații
- Coada (Queue) și Deque
- Coada cu priorități (Priority Queue)

## 3. Matematică și Teoria Numerelor
- Ciurul lui Eratostene & Descompunerea în factori primi
- Aritmetică modulară și Invers modular
- Exponențiere rapidă
- Operații cu numere mari (Big Integers)
- Indicatorul lui Euler
- Principiul Includerii și Excluderii (PIE)
- Funcția Mobius
- Exponențiere de matrice în timp logaritmic (pentru recurențe liniare)

## 4. Grafuri, Arbori și Geometrie
- Algoritmul lui Lee & Algoritmul de Fill (Flood Fill)
- Diametrul unui arbore
- Algoritmul lui Dial (optimizare Dijkstra)
- Algoritmi de baleiere (Sweep-line)
- Înfășurătoare convexă (Convex Hull)
- Determinarea elementului majoritar (poate intra la Fundamente/Vectori)

---
*Pentru implementarea acestora, au fost create 3 fișiere de instrucțiuni pentru agenți în folderul `agent_instructions/`.*
