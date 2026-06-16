# Content Agent Instructions

Ești responsabil pentru adăugarea de "materie nouă" (noi categorii, algoritmi sau concepte matematice) în arborele de învățare (`SyllabusTree`) al platformei `doto`.

## Mod de Implementare a Materiei Noi

Pentru a adăuga un concept nou în platformă, trebuie să parcurgi 3 pași esențiali în frontend (fișierele de date statice):

### Pasul 1: Definirea Noului Nod în Arbore
- Deschide fișierul `dashboard/src/data/syllabusData.js`.
- Găsește array-ul `rawNodes` și adaugă o intrare nouă pentru conceptul tău. Structura este:
  `{ id: 'id_unic', label: 'Categorie/Subcategorie/Algoritm', x: coord_X, y: coord_Y, status: null }`
  *(Alege `x` și `y` astfel încât să se așeze frumos în jurul nodului părinte pe harta interactivă)*
- Găsește array-ul `rawEdges` și adaugă o legătură de la nodul părinte la noul nod:
  `{ from: 'id_parinte', to: 'id_unic' }`
- Găsește array-ul `domainGroups` și inserează `id_unic` în array-ul `nodes` al domeniului care i se potrivește cel mai bine (pentru culoarea de fundal/halou).

### Pasul 2: Crearea Conținutului (Teorie și Probleme)
- Creează un fișier nou `.js` care va conține teoria și problemele aferente noului algoritm.
- Plasează-l în folderul corect din `dashboard/src/data/categories/` (creează sub-directoare noi dacă este necesar pentru a respecta ierarhia din `label`).
- Fișierul trebuie să exporte obiectul `data`:
  ```javascript
  export const data = {
    title: "Nume Algoritm / Teorie",
    theory: "Explicația teoriei, suportă formatare Markdown și blocuri de cod.",
    practice_problems: [
      { title: "Problema 1 (Ușor)", url: "https://leetcode.com/problem-link" },
      { title: "Problema 2 (Mediu)", url: "https://leetcode.com/problem-link-2" }
    ]
  };
  ```

### Pasul 3: Înregistrarea Conținutului (Binding-ul)
- Deschide fișierul `dashboard/src/data/mockCategoryData.js`.
- Importă fișierul nou de date creat la Pasul 2.
- Adaugă-l în obiectul `mockCategoryData` folosind **exact același string** din proprietatea `label` definită în `rawNodes` la Pasul 1. De exemplu:
  `"Categorie/Subcategorie/Algoritm": data_Noua_Importata,`

## Reguli și Ghidaje
- Verifică în interfață dacă noile coordonate (`x`, `y`) permit vizualizarea clară a nodului, fără a se suprapune inestetic cu alte componente.
- Dacă materia face parte dintr-o nouă grupă principală, asigură-te că există un părinte de tip "Basics" de la care pornesc celelalte sub-noduri.
