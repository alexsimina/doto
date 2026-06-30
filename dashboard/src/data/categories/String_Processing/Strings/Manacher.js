const tVal = "^#a#b#a#a#b#a#$";
const p0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const p_with_p2_1 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const p_with_p4_3 = [0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const p_with_p6_1 = [0, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
const p_with_p7_6 = [0, 0, 1, 0, 3, 0, 1, 6, 0, 0, 0, 0, 0, 0, 0];
const p_final = [0, 0, 1, 0, 3, 0, 1, 6, 1, 0, 3, 0, 1, 0, 0];

function generateManacherBlocks(t, p, i, c, r, activeMatch1 = -1, activeMatch2 = -1) {
  const stringGroup = [];
  const radiusGroup = [];
  
  for (let idx = 0; idx < t.length; idx++) {
    let charActive = idx === i;
    let charSorted = idx === activeMatch1 || idx === activeMatch2;
    let charHidden = idx > r;
    
    stringGroup.push({
      val: t[idx],
      active: charActive,
      sorted: charSorted,
      hidden: charHidden
    });
    
    let radActive = idx === i;
    let radSorted = idx === c;
    radiusGroup.push({
      val: p[idx],
      active: radActive,
      sorted: radSorted,
      hidden: idx > r
    });
  }
  
  return [
    {
      label: "Șirul preprocesat t (i = " + i + ", c = " + c + ", r = " + r + ")",
      groups: [stringGroup]
    },
    {
      label: "Vectorul de raze p (centrul c evidențiat)",
      groups: [radiusGroup]
    }
  ];
}

const trace = [
  {
    line: 45,
    text: "Se începe execuția programului în funcția main.",
    stack: ["main()"],
    vars: [],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      }
    ]
  },
  {
    line: 46,
    text: "Se declară șirul inițial s = \"abaaba\" de lungime 6.",
    stack: ["main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      }
    ]
  },
  {
    line: 47,
    text: "Se apelează funcția manacher(s) pentru a calcula vectorul de raze palindromice.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      }
    ]
  },
  {
    line: 19,
    text: "În interiorul funcției manacher, se apelează preprocessString(s) pentru a intercala caractere speciale '#'.",
    stack: ["preprocessString(s)", "manacher(s)", "main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      }
    ]
  },
  {
    line: 9,
    text: "Se inițializează noul șir t cu santinela de început '^'.",
    stack: ["preprocessString(s)", "manacher(s)", "main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }, { name: "t", type: "string", val: "\"^\"" }],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      },
      {
        label: "Șirul preprocesat în curs de construire t",
        groups: [[{ val: "^", active: true }]]
      }
    ]
  },
  {
    line: 10,
    text: "Parcurgem caracterele din s și adăugăm '#' urmat de caracter în t.",
    stack: ["preprocessString(s)", "manacher(s)", "main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }, { name: "t", type: "string", val: "\"^#a#b#a#a#b#a\"" }],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      },
      {
        label: "Șirul preprocesat în curs de construire t",
        groups: [[{ val: "^" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "b" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "b" }, { val: "#" }, { val: "a", active: true }]]
      }
    ]
  },
  {
    line: 14,
    text: "Adăugăm santinela de sfârșit '#$' pentru a asigura detectarea limitelor fără verificări suplimentare.",
    stack: ["preprocessString(s)", "manacher(s)", "main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }, { name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }],
    blocksVisual: [
      {
        label: "Șirul inițial s",
        groups: [[{ val: "a" }, { val: "b" }, { val: "a" }, { val: "a" }, { val: "b" }, { val: "a" }]]
      },
      {
        label: "Șirul preprocesat finalizat t",
        groups: [[{ val: "^" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "b" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "b" }, { val: "#" }, { val: "a" }, { val: "#" }, { val: "$" }]]
      }
    ]
  },
  {
    line: 15,
    text: "Returnăm șirul preprocesat t = \"^#a#b#a#a#b#a#$\".",
    stack: ["preprocessString(s)", "manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }],
    blocksVisual: []
  },
  {
    line: 20,
    text: "Se obține lungimea șirului preprocesat: n = 15.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "n", type: "int", val: "15" }],
    blocksVisual: generateManacherBlocks(tVal, p0, -1, 0, 0)
  },
  {
    line: 21,
    text: "Inițializăm vectorul de raze p cu 15 elemente egale cu 0, reprezentând razele palindromice inițiale.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "n", type: "int", val: "15" }, { name: "p", type: "vector<int>", val: "size=15" }],
    blocksVisual: generateManacherBlocks(tVal, p0, -1, 0, 0)
  },
  {
    line: 22,
    text: "Inițializăm centrul c = 0 și marginea dreaptă r = 0 ale celui mai din dreapta palindrom identificat până acum.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "0" }, { name: "r", type: "int", val: "0" }],
    blocksVisual: generateManacherBlocks(tVal, p0, -1, 0, 0)
  },
  {
    line: 24,
    text: "Intrăm în bucla principală cu i = 1. Caracterul analizat este t[1] = '#'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "0" }, { name: "r", type: "int", val: "0" }, { name: "i", type: "int", val: "1" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 1, 0, 0)
  },
  {
    line: 25,
    text: "Calculăm indexul oglindit i_mirror = 2 * c - i = 2 * 0 - 1 = -1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "0" }, { name: "r", type: "int", val: "0" }, { name: "i", type: "int", val: "1" }, { name: "i_mirror", type: "int", val: "-1" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 1, 0, 0)
  },
  {
    line: 29,
    text: "Deoarece r = 0 nu este mai mare ca i = 1, nu putem folosi simetria. Mergem pe ramura else și inițializăm p[1] = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "0" }, { name: "r", type: "int", val: "0" }, { name: "i", type: "int", val: "1" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 1, 0, 0)
  },
  {
    line: 33,
    text: "Încercăm extinderea palindromului prin comparare. Verificăm t[2] ('a') și t[0] ('^'). Nu se potrivesc, bucla se termină rapid.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "0" }, { name: "r", type: "int", val: "0" }, { name: "i", type: "int", val: "1" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 1, 0, 0, 2, 0)
  },
  {
    line: 37,
    text: "Deoarece i + p[1] = 1 + 0 = 1 > r = 0, actualizăm noul centru c = 1 și marginea dreaptă r = 1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "1" }, { name: "r", type: "int", val: "1" }, { name: "i", type: "int", val: "1" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 1, 1, 1)
  },
  {
    line: 24,
    text: "Trecem la i = 2. Caracterul curent este t[2] = 'a'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "1" }, { name: "r", type: "int", val: "1" }, { name: "i", type: "int", val: "2" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 2, 1, 1)
  },
  {
    line: 25,
    text: "Calculăm oglinditul lui i = 2 față de c = 1: i_mirror = 2 * 1 - 2 = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "1" }, { name: "r", type: "int", val: "1" }, { name: "i", type: "int", val: "2" }, { name: "i_mirror", type: "int", val: "0" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 2, 1, 1)
  },
  {
    line: 29,
    text: "Deoarece r = 1 nu este strict mai mare decât i = 2, setăm raza inițială p[2] = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "1" }, { name: "r", type: "int", val: "1" }, { name: "i", type: "int", val: "2" }],
    blocksVisual: generateManacherBlocks(tVal, p0, 2, 1, 1)
  },
  {
    line: 33,
    text: "Încercăm extinderea la i = 2. Comparăm t[3] ('#') cu t[1] ('#'). Sunt egale! Incrementăm p[2] la 1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "1" }, { name: "r", type: "int", val: "1" }, { name: "i", type: "int", val: "2" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 2, 1, 1, 3, 1)
  },
  {
    line: 33,
    text: "Continuăm extinderea la i = 2. Comparăm t[4] ('b') cu t[0] ('^'). Nu se potrivesc, extinderea se oprește.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "1" }, { name: "r", type: "int", val: "1" }, { name: "i", type: "int", val: "2" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 2, 1, 1, 4, 0)
  },
  {
    line: 37,
    text: "Deoarece i + p[2] = 2 + 1 = 3 > r = 1, actualizăm centrul c = 2 și marginea dreaptă r = 3.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "2" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 2, 2, 3)
  },
  {
    line: 24,
    text: "Trecem la i = 3. Caracterul analizat este t[3] = '#'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "3" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 3, 2, 3)
  },
  {
    line: 25,
    text: "Calculăm oglinditul lui i = 3 față de c = 2: i_mirror = 2 * 2 - 3 = 1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "3" }, { name: "i_mirror", type: "int", val: "1" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 3, 2, 3)
  },
  {
    line: 29,
    text: "Deoarece r = 3 nu este strict mai mare decât i = 3, setăm raza inițială p[3] = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "3" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 3, 2, 3)
  },
  {
    line: 33,
    text: "Încercăm extinderea la i = 3. Comparăm t[4] ('b') cu t[2] ('a'). Nu sunt egale, deci p[3] rămâne 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "3" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 3, 2, 3, 4, 2)
  },
  {
    line: 37,
    text: "Deoarece i + p[3] = 3 + 0 = 3 > r = 3 este fals, nu actualizăm centrul c sau frontiera r.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "3" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 3, 2, 3)
  },
  {
    line: 24,
    text: "Trecem la i = 4. Caracterul analizat este t[4] = 'b'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "4" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 4, 2, 3)
  },
  {
    line: 29,
    text: "Deoarece r = 3 nu este mai mare decât i = 4, setăm raza inițială p[4] = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "4" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p2_1, 4, 2, 3)
  },
  {
    line: 33,
    text: "Extindem palindromul centrat la i = 4. Găsim potriviri succesive pentru '#' cu '#', 'a' cu 'a', și '#' cu '#'. Raza p[4] devine 3.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "2" }, { name: "r", type: "int", val: "3" }, { name: "i", type: "int", val: "4" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 4, 2, 3, 7, 1)
  },
  {
    line: 37,
    text: "Deoarece i + p[4] = 4 + 3 = 7 > r = 3, actualizăm noul centru c = 4 și marginea dreaptă r = 7.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "4" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 4, 4, 7)
  },
  {
    line: 24,
    text: "Trecem la i = 5. Caracterul analizat este t[5] = '#'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "5" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 5, 4, 7)
  },
  {
    line: 25,
    text: "Calculăm oglinditul lui i = 5 față de c = 4: i_mirror = 2 * 4 - 5 = 3.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "5" }, { name: "i_mirror", type: "int", val: "3" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 5, 4, 7)
  },
  {
    line: 27,
    text: "Deoarece r = 7 > i = 5, folosim simetria. Setăm p[5] = min(r - i, p[i_mirror]) = min(2, p[3]) = min(2, 0) = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "5" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 5, 4, 7)
  },
  {
    line: 33,
    text: "Extindem palindromul la i = 5. Comparăm t[6] ('a') cu t[4] ('b'). Nu se potrivesc. p[5] rămâne 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "5" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 5, 4, 7, 6, 4)
  },
  {
    line: 37,
    text: "Deoarece i + p[5] = 5 + 0 = 5 > r = 7 este fals, nu actualizăm centrul c sau frontiera r.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "5" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 5, 4, 7)
  },
  {
    line: 24,
    text: "Trecem la i = 6. Caracterul curent este t[6] = 'a'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "6" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 6, 4, 7)
  },
  {
    line: 25,
    text: "Calculăm oglinditul lui i = 6 față de c = 4: i_mirror = 2 * 4 - 6 = 2.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "6" }, { name: "i_mirror", type: "int", val: "2" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p4_3, 6, 4, 7)
  },
  {
    line: 27,
    text: "Deoarece r = 7 > i = 6, folosim simetria. Setăm p[6] = min(r - i, p[i_mirror]) = min(1, p[2]) = min(1, 1) = 1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "6" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p6_1, 6, 4, 7)
  },
  {
    line: 33,
    text: "Extindem palindromul de la p[6] = 1. Comparăm t[8] ('a') cu t[4] ('b'). Nu sunt egale. p[6] rămâne 1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "6" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p6_1, 6, 4, 7, 8, 4)
  },
  {
    line: 37,
    text: "Deoarece i + p[6] = 6 + 1 = 7 > r = 7 este fals, nu actualizăm centrul c sau frontiera r.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "6" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p6_1, 6, 4, 7)
  },
  {
    line: 24,
    text: "Trecem la i = 7. Caracterul analizat este t[7] = '#'.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "7" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p6_1, 7, 4, 7)
  },
  {
    line: 25,
    text: "Calculăm oglinditul lui i = 7 față de c = 4: i_mirror = 2 * 4 - 7 = 1.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "7" }, { name: "i_mirror", type: "int", val: "1" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p6_1, 7, 4, 7)
  },
  {
    line: 29,
    text: "Deoarece r = 7 nu este mai mare ca i = 7, setăm raza inițială p[7] = 0.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "7" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p6_1, 7, 4, 7)
  },
  {
    line: 33,
    text: "Extindem palindromul centrat la i = 7. Se potrivesc succesiv toate caracterele până la capetele șirului. Raza p[7] devine 6.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "4" }, { name: "r", type: "int", val: "7" }, { name: "i", type: "int", val: "7" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p7_6, 7, 4, 7, 13, 1)
  },
  {
    line: 37,
    text: "Deoarece i + p[7] = 7 + 6 = 13 > r = 7, actualizăm noul centru c = 7 și noua margine dreaptă r = 13.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "7" }, { name: "r", type: "int", val: "13" }, { name: "i", type: "int", val: "7" }],
    blocksVisual: generateManacherBlocks(tVal, p_with_p7_6, 7, 7, 13)
  },
  {
    line: 24,
    text: "Bucla continuă în mod similar pentru restul pozițiilor i = 8..13 folosind simetria și extinderile.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "t", type: "string", val: "\"^#a#b#a#a#b#a#$\"" }, { name: "p", type: "vector<int>", val: "size=15" }, { name: "c", type: "int", val: "7" }, { name: "r", type: "int", val: "13" }],
    blocksVisual: generateManacherBlocks(tVal, p_final, 13, 7, 13)
  },
  {
    line: 42,
    text: "Se returnează vectorul de raze palindromice p către funcția apelantă.",
    stack: ["manacher(s)", "main()"],
    vars: [{ name: "p", type: "vector<int>", val: "size=15" }],
    blocksVisual: generateManacherBlocks(tVal, p_final, -1, 7, 13)
  },
  {
    line: 47,
    text: "Se revine în funcția main. Rezultatul a fost salvat în vectorul p.",
    stack: ["main()"],
    vars: [{ name: "s", type: "string", val: "\"abaaba\"" }, { name: "p", type: "vector<int>", val: "size=15" }],
    blocksVisual: generateManacherBlocks(tVal, p_final, -1, 7, 13)
  },
  {
    line: 48,
    text: "Programul se încheie cu succes, returnând codul 0.",
    stack: ["main()"],
    vars: [],
    blocksVisual: generateManacherBlocks(tVal, p_final, -1, 7, 13)
  }
];

export const data = {
  presentation: `### Prezentare Generală

Algoritmul lui **Manacher** este un algoritm extrem de eficient care găsește toate subșirurile palindromice dintr-un șir de caractere $S$ în timp liniar $\\mathcal{O}(N)$.

În abordarea naivă, pentru a găsi toate palindromurile, verificăm fiecare centru posibil și extindem în ambele direcții. Deoarece sunt $2N - 1$ centre posibile (palindromuri de lungime impară și pară), această abordare naivă durează $\\mathcal{O}(N^2)$ în cel mai rău caz (de exemplu, pentru un șir format din același caracter \`aaaaa\`).

### Trucul de Preprocesare

Pentru a evita tratarea separată a palindromurilor de lungime pară (de tipul \`abba\`) și impară (de tipul \`aba\`), algoritmul folosește un truc de preprocesare:
- Inserează un caracter special (de obicei \`#\`) între fiecare două caractere adiacente, precum și la începutul și la sfârșitul șirului.
- Adaugă caractere santinelă diferite la extreme (cum ar fi \`^\` la început și \`&#36;\` la sfârșit) pentru a evita verificarea manuală a depășirii limitelor șirului.

De exemplu, șirul \`abaaba\` devine \`^#a#b#a#a#b#a#&#36;\`. Astfel, orice palindrom devine de lungime impară în șirul preprocesat.

### Principiul de Funcționare

Algoritmul menține în permanență:
1. Centrul $c$ al palindromului care se extinde cel mai mult spre dreapta.
2. Frontiera dreaptă $r$ a acestui palindrom ($r = c + P[c]$).

Pentru fiecare poziție $i$, dacă $i < r$, putem folosi simetria față de $c$ pentru a inițializa valoarea razei palindromului în $i$ cu $P[i_{mirror}]$, unde $i_{mirror} = 2c - i$, limitată de distanța până la frontieră ($r - i$). Ulterior, încercăm să extindem palindromul prin comparații clasice doar dacă este necesar.`,

  complexity: `### Complexitate de Timp

- **Cazul Favorabil / Mediu / Defavorabil:** $\\mathcal{O}(N)$, unde $N$ este lungimea șirului de caractere.
  Deși există o buclă \`while\` în interiorul buclei \`for\`, frontiera dreaptă $r$ crește strict monoton la fiecare potrivire reușită de caractere dincolo de $r$. Numărul total de comparații reușite este limitat de lungimea șirului preprocesat, garantând o complexitate liniară.

### Complexitate Spațială

- $\\mathcal{O}(N)$ memorie auxiliară folosită pentru a stoca șirul preprocesat $T$ de lungime $2N + 3$ și vectorul de raze palindromice $P$ de aceeași lungime.`,

  variations: `### Variații și Particularități

1. **Găsirea celui mai lung subșir palindromic:** Este determinat de valoarea maximă din vectorul $P$. Lungimea palindromului original este exact valoarea maximă din $P$, iar indexul de început poate fi calculat direct.
2. **Determinarea tuturor prefixelor/sufixelor palindromice:** Util în diverse probleme de descompunere a șirurilor.
3. **Manacher pe Structuri Dinamice:** Poate fi adaptat cu arbori de intervale sau structuri de tip hash pentru scenarii dinamice.`,

  applications: `### Aplicații Practice

- **Bioinformatică:** Identificarea secvențelor palindromice în catenele de ADN (de exemplu, situri de restricție).
- **Compresia datelor:** Algoritmi de compresie bazați pe simetrii repetitive în text.
- **Procesarea limbajului natural:** Analiza structurilor sintactice simetrice sau identificarea jocurilor de cuvinte.`,

  code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

string preprocessString(string s) {
    string t = "^";
    for (char c : s) {
        t += "#";
        t += c;
    }
    t += "#$";
    return t;
}

vector<int> manacher(string s) {
    string t = preprocessString(s);
    int n = t.length();
    vector<int> p(n, 0);
    int c = 0, r = 0;
    
    for (int i = 1; i < n - 1; i++) {
        int i_mirror = 2 * c - i;
        
        if (r > i) {
            p[i] = min(r - i, p[i_mirror]);
        } else {
            p[i] = 0;
        }
        
        while (t[i + 1 + p[i]] == t[i - 1 - p[i]]) {
            p[i]++;
        }
        
        if (i + p[i] > r) {
            c = i;
            r = i + p[i];
        }
    }
    return p;
}

int main() {
    string s = "abaaba";
    vector<int> p = manacher(s);
    return 0;
}
`,

  explanations: trace.map(step => ({
    line: step.line,
    text: step.text,
    blocksVisual: step.blocksVisual
  })),

  problems: {
    easy: [
      {
        title: "Valid Palindrome",
        url: "https://leetcode.com/problems/valid-palindrome/",
        desc: "Verifică dacă un șir este palindrom (introducere în concepte)."
      }
    ],
    medium: [
      {
        title: "Longest Palindromic Substring",
        url: "https://leetcode.com/problems/longest-palindromic-substring/",
        desc: "Găsește cel mai lung subșir palindromic folosind algoritmul lui Manacher în timp liniar."
      },
      {
        title: "Palindrom (Infoarena)",
        url: "https://www.infoarena.ro/problema/palindrom",
        desc: "Aflarea celui mai scurt super-șir palindromic care conține șirul dat ca prefix."
      }
    ],
    hard: [
      {
        title: "Palindrome Pairs",
        url: "https://leetcode.com/problems/palindrome-pairs/",
        desc: "Găsirea perechilor de șiruri care concatenate formează un palindrom (combină trie și palindromuri)."
      }
    ]
  },

  globalVars: [],

  debugger: {
    getDebuggerState: (stepIndex, activeLine, explanationText) => {
      const step = trace[stepIndex] || trace[trace.length - 1];
      const vars = step.vars.map(v => ({ name: v.name, type: v.type, val: v.val, expandable: false }));
      const globalVars = [];
      const frames = step.stack.map(fName => ({ name: fName, file: "solution.cpp", line: activeLine }));
      
      let inlineVal = "";
      if (step.vars.length > 0) {
        inlineVal = step.vars.map(v => `${v.name}: ${v.val}`).join(", ");
      }
      
      return { vars, globalVars, frames, inlineVal };
    },
    getInlineValueForLine: (stepIndex, lineNum) => {
      const step = trace[stepIndex];
      if (!step) return null;
      if (step.line === lineNum) {
        if (step.vars.length > 0) {
          return step.vars.map(v => `${v.name}: ${v.val}`).join(", ");
        }
      }
      return null;
    }
  }
};
