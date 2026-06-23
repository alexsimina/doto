export const data = {
  presentation: "### Tipuri de Date Neomogene (Structs)\n\nO structură (`struct`) în C++ este un tip de date definit de utilizator care permite gruparea mai multor variabile de tipuri diferite (neomogene) sub același nume. Variabilele din interiorul structurii sunt numite **membri** sau **câmpuri**.\n\nSpre deosebire de un vector sau un tablou, unde toate elementele au același tip, o structură poate conține simultan numere întregi, caractere, șiruri de caractere sau chiar alte structuri. Acest lucru este extrem de util pentru a modela obiecte din lumea reală (cum ar fi un student, un punct în plan tridimensional sau o tranzacție bancară).",
  complexity: "### Complexitate\n\n- **Timp:** Accesul la orice membru al unei structuri se realizează în $O(1)$ prin intermediul operatorului punct (`.`).\n- **Spațiu:** Dimensiunea unei structuri în memorie este, în general, suma dimensiunilor membrilor săi (plus posibile spații de umplere - *padding* - adăugate automat de compilator pentru alinierea memoriei).",
  variations: "### Variații și Cazuri Particulare\n\n- **Vector de structuri**: Putem declara tablouri sau vectori STL de structuri pentru a menține liste de înregistrări.\n- **Supraîncărcarea operatorilor**: Putem defini operatori personalizați în structură (de exemplu, operatorul `<`) pentru a permite sortarea automată a elementelor cu `std::sort`.\n- **Constructori**: Putem adăuga constructori în interiorul structurii pentru o inițializare rapidă a câmpurilor: `Student(string n, int g) : name(n), grade(g) {}`.",
  applications: "### Aplicații Reale\n\n- Reprezentarea punctelor în spațiu bidimensional sau tridimensional în grafică computerizată ($x, y, z$).\n- Stocarea nodurilor și a costurilor în algoritmi de drum minim (cum ar fi stocarea unei stări `(nod, cost)` în coada de priorități pentru Dijkstra).\n- Baze de date mici stocate în memorie (de exemplu, catalogul unei școli, stocul unui magazin).",
  code: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Student {
    string name;
    int grade;
};

int main() {
    Student s1;
    s1.name = "Alex";
    s1.grade = 9;
    
    Student s2;
    s2.name = "Maria";
    s2.grade = 10;
    
    vector<Student> classList;
    classList.push_back(s1);
    classList.push_back(s2);
    
    int maxGrade = classList[0].grade;
    string topStudent = classList[0].name;
    
    for (int i = 1; i < classList.size(); i++) {
        if (classList[i].grade > maxGrade) {
            maxGrade = classList[i].grade;
            topStudent = classList[i].name;
        }
    }
    
    return 0;
}
`,
  explanations: [
    {
      line: 13,
      text: "Declarăm variabila $s1$ de tipul `Student`.",
      blocksVisual: [
        {
          label: "Student s1",
          groups: [
            [{ val: "name: \"\"", active: true }, { val: "grade: 0" }]
          ]
        }
      ]
    },
    {
      line: 14,
      text: "Atribuim valoarea `\"Alex\"` membrului $name$ al structurii $s1$.",
      blocksVisual: [
        {
          label: "Student s1",
          groups: [
            [{ val: "name: \"Alex\"", active: true }, { val: "grade: 0" }]
          ]
        }
      ]
    },
    {
      line: 15,
      text: "Atribuim valoarea $9$ membrului $grade$ al structurii $s1$.",
      blocksVisual: [
        {
          label: "Student s1",
          groups: [
            [{ val: "name: \"Alex\"" }, { val: "grade: 9", active: true }]
          ]
        }
      ]
    },
    {
      line: 17,
      text: "Declarăm variabila $s2$ de tipul `Student`.",
      blocksVisual: [
        {
          label: "Student s2",
          groups: [
            [{ val: "name: \"\"", active: true }, { val: "grade: 0" }]
          ]
        }
      ]
    },
    {
      line: 18,
      text: "Setăm numele studentului $s2$ ca fiind `\"Maria\"`.",
      blocksVisual: [
        {
          label: "Student s2",
          groups: [
            [{ val: "name: \"Maria\"", active: true }, { val: "grade: 0" }]
          ]
        }
      ]
    },
    {
      line: 19,
      text: "Setăm nota studentului $s2$ ca fiind $10$.",
      blocksVisual: [
        {
          label: "Student s2",
          groups: [
            [{ val: "name: \"Maria\"" }, { val: "grade: 10", active: true }]
          ]
        }
      ]
    },
    {
      line: 21,
      text: "Declarăm un vector $classList$ capabil să stocheze elemente de tipul `Student`.",
      blocksVisual: [
        {
          label: "Listă Clasă",
          groups: [
            [{ val: "classList: []", active: true }]
          ]
        }
      ]
    },
    {
      line: 22,
      text: "Adăugăm studentul $s1$ la finalul vectorului $classList$.",
      blocksVisual: [
        {
          label: "Listă Clasă",
          groups: [
            [{ val: "[0]: {Alex, 9}", active: true }]
          ]
        }
      ]
    },
    {
      line: 23,
      text: "Adăugăm studentul $s2$ la finalul vectorului $classList$. Acesta va fi la poziția $1$.",
      blocksVisual: [
        {
          label: "Listă Clasă",
          groups: [
            [{ val: "[0]: {Alex, 9}" }, { val: "[1]: {Maria, 10}", active: true }]
          ]
        }
      ]
    },
    {
      line: 25,
      text: "Inițializăm nota maximă cu nota primului student din listă: $maxGrade = 9$.",
      blocksVisual: [
        {
          label: "Maxim",
          groups: [
            [{ val: "maxGrade = 9", active: true }]
          ]
        }
      ]
    },
    {
      line: 26,
      text: "Inițializăm numele studentului eminent cu cel al primului student: `topStudent = \"Alex\"`.",
      blocksVisual: [
        {
          label: "Top Student",
          groups: [
            [{ val: "topStudent = \"Alex\"", active: true }]
          ]
        }
      ]
    },
    {
      line: 28,
      text: "Începem parcurgerea clasei de la indexul $i = 1$ (Maria).",
      blocksVisual: [
        {
          label: "Index parcurgere",
          groups: [
            [{ val: "i = 1", active: true }]
          ]
        }
      ]
    },
    {
      line: 29,
      text: "Verificăm dacă nota studentului curent ($classList[1].grade = 10$) este mai mare decât $maxGrade$ ($9$). Condiția este adevărată.",
      blocksVisual: [
        {
          label: "Verificare",
          groups: [
            [{ val: "10 > 9 ? Da", active: true }]
          ]
        }
      ]
    },
    {
      line: 30,
      text: "Actualizăm nota maximă cu nota Mariei: $maxGrade = 10$.",
      blocksVisual: [
        {
          label: "Maxim actualizat",
          groups: [
            [{ val: "maxGrade = 10", active: true }]
          ]
        }
      ]
    },
    {
      line: 31,
      text: "Actualizăm numele studentului eminent: `topStudent = \"Maria\"`.",
      blocksVisual: [
        {
          label: "Top Student actualizat",
          groups: [
            [{ val: "topStudent = \"Maria\"", active: true }]
          ]
        }
      ]
    },
    {
      line: 28,
      text: "Incrementăm $i$ la $2$. Condiția $i < classList.size()$ ($2 < 2$) devine falsă. Ieșim din buclă.",
      blocksVisual: [
        {
          label: "Condiție buclă",
          groups: [
            [{ val: "2 < 2 ? Fals", active: true }]
          ]
        }
      ]
    },
    {
      line: 35,
      text: "Finalizăm programul cu succes, având determinat studentul eminent: Maria cu nota $10$.",
      blocksVisual: [
        {
          label: "Rezultate Finale",
          groups: [
            [{ val: "topStudent = \"Maria\"" }, { val: "maxGrade = 10" }]
          ]
        }
      ]
    }
  ],
  problems: {
    easy: [
      {
        title: "Puncte 2D",
        url: "https://www.pbinfo.ro/probleme/2311/puncte",
        desc: "Definește o structură pentru un punct în plan și calculează distanța dintre două puncte."
      }
    ],
    medium: [
      {
        title: "Catalog Elevi",
        url: "https://www.pbinfo.ro/probleme/3233/sortare-elevi",
        desc: "Stochează datele mai multor elevi într-un vector de structuri și sortează-i după medie."
      }
    ],
    hard: [
      {
        title: "Complex Numbers",
        url: "https://www.pbinfo.ro/probleme/2324/numere-complexe",
        desc: "Implementează o structură pentru numere complexe și operațiile matematice elementare pe acestea."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine, explanationText) => {
      const vars = [];
      const globalVars = [];
      const frames = [];
      let inlineVal = null;

      frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 13 });

      let s1Val = '{name: "Alex", grade: 9}';
      if (stepIndex === 0) s1Val = '{name: "", grade: 0}';
      else if (stepIndex === 1) s1Val = '{name: "Alex", grade: 0}';

      let s2Val = '{name: "Maria", grade: 10}';
      if (stepIndex === 3) s2Val = '{name: "", grade: 0}';
      else if (stepIndex === 4) s2Val = '{name: "Maria", grade: 0}';

      let classListVal = '[]';
      if (stepIndex === 7) classListVal = '[{name: "Alex", grade: 9}]';
      else if (stepIndex >= 8) classListVal = '[{name: "Alex", grade: 9}, {name: "Maria", grade: 10}]';

      let maxGradeVal = 9;
      if (stepIndex >= 13) maxGradeVal = 10;

      let topStudentVal = '"Alex"';
      if (stepIndex >= 14) topStudentVal = '"Maria"';

      if (stepIndex >= 0) {
        vars.push({ name: 's1', type: 'Student', val: s1Val, expandable: true });
      }
      if (stepIndex >= 3) {
        vars.push({ name: 's2', type: 'Student', val: s2Val, expandable: true });
      }
      if (stepIndex >= 6) {
        vars.push({ name: 'classList', type: 'std::vector<Student>', val: classListVal, expandable: true });
      }
      if (stepIndex >= 9) {
        vars.push({ name: 'maxGrade', type: 'int', val: maxGradeVal, expandable: false });
      }
      if (stepIndex >= 10) {
        vars.push({ name: 'topStudent', type: 'std::string', val: topStudentVal, expandable: false });
      }
      if (stepIndex >= 11 && stepIndex <= 15) {
        let iVal = stepIndex === 15 ? 2 : 1;
        vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
      }

      if (activeLine === 13) inlineVal = "s1: {name: \"\", grade: 0}";
      else if (activeLine === 14) inlineVal = "s1.name: \"Alex\"";
      else if (activeLine === 15) inlineVal = "s1.grade: 9";
      else if (activeLine === 17) inlineVal = "s2: {name: \"\", grade: 0}";
      else if (activeLine === 18) inlineVal = "s2.name: \"Maria\"";
      else if (activeLine === 19) inlineVal = "s2.grade: 10";
      else if (activeLine === 21) inlineVal = "classList: []";
      else if (activeLine === 22) inlineVal = "classList: [{name: \"Alex\", grade: 9}]";
      else if (activeLine === 23) inlineVal = "classList: [{name: \"Alex\", grade: 9}, {name: \"Maria\", grade: 10}]";
      else if (activeLine === 25) inlineVal = "maxGrade: 9";
      else if (activeLine === 26) inlineVal = "topStudent: \"Alex\"";
      else if (activeLine === 28) inlineVal = `i: ${stepIndex === 15 ? 2 : 1}`;
      else if (activeLine === 29) inlineVal = `i: 1, classList[i].grade: 10, maxGrade: 9`;
      else if (activeLine === 30) inlineVal = "maxGrade: 10";
      else if (activeLine === 31) inlineVal = "topStudent: \"Maria\"";
      else if (activeLine === 35) inlineVal = "topStudent: \"Maria\", maxGrade: 10";

      return { vars, globalVars, frames, inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      let maxGradeVal = 9;
      if (stepIndex >= 13) maxGradeVal = 10;

      let topStudentVal = '"Alex"';
      if (stepIndex >= 14) topStudentVal = '"Maria"';

      if (lineNum === 13 && stepIndex >= 0) return 's1: {name: "", grade: 0}';
      if (lineNum === 14 && stepIndex >= 1) return 's1.name: "Alex"';
      if (lineNum === 15 && stepIndex >= 2) return 's1.grade: 9';
      if (lineNum === 17 && stepIndex >= 3) return 's2: {name: "", grade: 0}';
      if (lineNum === 18 && stepIndex >= 4) return 's2.name: "Maria"';
      if (lineNum === 19 && stepIndex >= 5) return 's2.grade: 10';
      if (lineNum === 21 && stepIndex >= 6) return 'classList: []';
      if (lineNum === 22 && stepIndex >= 7) return 'classList: [{name: "Alex", grade: 9}]';
      if (lineNum === 23 && stepIndex >= 8) return 'classList: [{name: "Alex", grade: 9}, {name: "Maria", grade: 10}]';
      if (lineNum === 25 && stepIndex >= 9) return 'maxGrade: 9';
      if (lineNum === 26 && stepIndex >= 10) return 'topStudent: "Alex"';
      if (lineNum === 28 && stepIndex >= 11) return `i: ${stepIndex === 15 ? 2 : 1}`;
      if (lineNum === 29 && stepIndex >= 12) return 'i: 1, classList[i].grade: 10, maxGrade: 9';
      if (lineNum === 30 && stepIndex >= 13) return 'maxGrade: 10';
      if (lineNum === 31 && stepIndex >= 14) return 'topStudent: "Maria"';
      if (lineNum === 35 && stepIndex >= 16) return `topStudent: ${topStudentVal}, maxGrade: ${maxGradeVal}`;
      return null;
    }
  }
};
