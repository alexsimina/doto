export const data = {
  "presentation": `### Prezentare Generală

Înfășurătoarea convexă (Convex Hull) a unei mulțimi de puncte din plan este cel mai mic poligon convex care conține toate punctele în interiorul său sau pe frontieră. O analogie fizică clasică este plasarea unui elastic de cauciuc în jurul unor cuie bătute în plan; elasticul se va strânge închizând toate cuiele și formând exact înfășurătoarea convexă.

Există mai mulți algoritmi pentru a determina înfășurătoarea convexă:
- **Algoritmul lui Jarvis (Gift Wrapping):** $O(N \\cdot H)$ unde $H$ este numărul de puncte de pe înfășurătoare.
- **Scanarea Graham (Graham Scan):** $O(N \\log N)$ folosind sortare polară.
- **Algoritmul Monotone Chain al lui Andrew:** $O(N \\log N)$, extrem de popular în programare competitivă deoarece utilizează o simplă sortare lexicografică și împarte înfășurătoarea în două jumătăți: partea inferioară (Lower Hull) și partea superioară (Upper Hull).

Pentru a determina dacă trei puncte succesive $O, A, B$ fac o curbă la stânga (counter-clockwise) sau la dreapta (clockwise), se folosește **Produsul Vectorial (Cross Product)**:
$$ \\text{cross}(O, A, B) = (A.x - O.x)(B.y - O.y) - (A.y - O.y)(B.x - O.x) $$
Dacă rezultatul este $> 0$, atunci curba este spre stânga. Dacă este $< 0$, curba este spre dreapta, iar dacă este $0$, punctele sunt coliniare.`,
  "complexity": `### Complexitate

Pentru $N$ puncte în plan folosind algoritmul lui Andrew:
- **Timp:** $O(N \\log N)$ — sortarea inițială lexicografică a punctelor domină timpul de rulare. Construirea înfășurătorilor se face în timp liniar $O(N)$, deoarece fiecare punct este adăugat și eliminat cel mult o dată în structura stivei.
- **Spațiu:** $O(N)$ — necesar pentru stocarea punctelor sortate și a punctelor din înfășurătoarea convexă finală.`,
  "variations": `### Variații și Edge Cases

1. **Puncte coliniare:** Dacă există mai multe puncte pe marginea înfășurătorii convexe, trebuie stabilit clar prin cerință dacă acestea trebuie păstrate sau eliminate (se rezolvă prin modificarea operatorului $\\le 0$ sau $< 0$ în verificarea cross product-ului).
2. **Număr mic de puncte:** Pentru $N \\le 3$, toate punctele fac parte din înfășurătoarea convexă (după eliminarea eventualelor duplicate coliniare).`,
  "applications": `### Aplicații

- **Probleme de localizare:** Determinarea celei mai mici zone de siguranță care cuprinde un set de senzori sau orașe.
- **Planificare de rute:** Evitarea obstacolelor în robotică prin ocolirea înfășurătorii lor convexe.
- **Geometrie computațională avansată:** Determinarea diametrului unei mulțimi de puncte sau determinarea dacă două poligoane se intersectează.`,
  "code": `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Point {
    long long x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

long long crossProduct(Point O, Point A, Point B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

vector<Point> convexHull(vector<Point>& points) {
    int n = points.size();
    if (n <= 3) return points;
    
    sort(points.begin(), points.end());
    vector<Point> hull;
    
    // Partea inferioara (Lower hull)
    for (int i = 0; i < n; ++i) {
        while (hull.size() >= 2 && crossProduct(hull[hull.size() - 2], hull.back(), points[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }
    
    // Partea superioara (Upper hull)
    int t = hull.size() + 1;
    for (int i = n - 2; i >= 0; --i) {
        while (hull.size() >= t && crossProduct(hull[hull.size() - 2], hull.back(), points[i]) <= 0) {
            hull.pop_back();
        }
        hull.push_back(points[i]);
    }
    
    hull.pop_back(); // Ultimul punct e duplicat al primului
    return hull;
}

int main() {
    vector<Point> pts = {{0, 3}, {1, 1}, {2, 2}, {4, 4}, {0, 0}, {1, 2}, {3, 1}, {3, 3}};
    vector<Point> hull = convexHull(pts);
    cout << "Puncte in infasuratoare: ";
    for (Point p : hull) {
        cout << "(" << p.x << ", " << p.y << ") ";
    }
    cout << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 48,
    "text": "Inițializăm vectorul de puncte (pts) în plan cu coordonatele date.",
    "blocksVisual": []
  },
  {
    "line": 49,
    "text": "Apelăm funcția convexHull pentru a construi înfășurătoarea convexă a mulțimii de puncte.",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "Intrăm în funcție. Salvăm numărul total de puncte: n = points.size(); .",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "Verificăm dacă numărul de puncte este mai mic sau egal cu 3. Dacă da, returnăm direct punctele.",
    "blocksVisual": []
  },
  {
    "line": 23,
    "text": "Sortăm punctele lexicografic după coordonata X, iar în caz de egalitate după Y. Acest lucru ne ajută să le parcurgem ordonat.",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "Inițializăm vectorul hull care va stoca punctele selectate pentru înfășurătoarea convexă.",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[0].",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[1].",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[2].",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[3].",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[4].",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[5].",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[6].",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "Construim înfășurătoarea inferioară (Lower Hull). Analizăm punctul curent points[7].",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "int t = hull.size() + 1",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[6].",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[5].",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[4].",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[3].",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[2].",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[1].",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "Deoarece ultimele trei puncte nu formează o curbă spre stânga, eliminăm ultimul punct adăugat (hull.pop_back).",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "Construim înfășurătoarea superioară (Upper Hull). Analizăm punctul curent points[0].",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "Verificăm dacă ultimele două puncte din înfășurătoare și punctul curent formează o curbă spre dreapta sau sunt coliniare (crossProduct <= 0).",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "Adăugăm punctul curent points[i] la înfășurătoarea convexă hull (hull.push_back).",
    "blocksVisual": []
  },
  {
    "line": 43,
    "text": "Eliminăm ultimul punct din înfășurătoare (hull.pop_back) deoarece coincide cu primul punct adăugat la început.",
    "blocksVisual": []
  },
  {
    "line": 44,
    "text": "Returnăm înfășurătoarea convexă finală determinată.",
    "blocksVisual": []
  },
  {
    "line": 49,
    "text": "Revenim în funcția main. Atribuim înfășurătoarea convexă returnată variabilei hull.",
    "blocksVisual": []
  },
  {
    "line": 50,
    "text": "Afișăm la consolă coordonatele punctelor din înfășurătoarea convexă.",
    "blocksVisual": []
  },
  {
    "line": 55,
    "text": "Funcția main returnează 0, finalizând cu succes execuția programului.",
    "blocksVisual": []
  }
],
  "problems": {
    "easy": [
      {
        "title": "Erect the Fence",
        "url": "https://leetcode.com/problems/erect-the-fence/",
        "desc": "Găsește toate coordonatele copacilor care definesc gardul exterior (înfășurătoarea convexă), incluzând punctele coliniare."
      }
    ],
    "medium": [
      {
        "title": "Convex Hull Graham Scan",
        "url": "https://www.geeksforgeeks.org/convex-hull-using-graham-scan/",
        "desc": "Implementează înfășurătoarea convexă folosind algoritmul Graham Scan bazat pe ordonare polară."
      }
    ],
    "hard": [
      {
        "title": "Convex Hull",
        "url": "https://cses.fi/problemset/task/2195/",
        "desc": "Problemă clasică Convex Hull pe CSES: determină înfășurătoarea convexă folosind un algoritm eficient și afișează punctele în ordinea cerută."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex, activeLine) => {
      const states = [{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"pts init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"Apel"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"n=8"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"sorted"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=7"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"t=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\",\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull primit"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const frames = s.frames.map((frame, index) => {
        if (index === 0 && activeLine !== undefined && activeLine !== null) {
          return { ...frame, line: activeLine };
        }
        return frame;
      });
      return { vars: s.vars, globalVars: [], frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"pts init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"Apel"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"n=8"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"sorted"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=7"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"t=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\",\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull primit"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const nodes = [
        { id: '0', x: 50, y: 250, label: '(0,0)' },
        { id: '1', x: 50, y: 100, label: '(0,3)' },
        { id: '2', x: 130, y: 200, label: '(1,1)' },
        { id: '3', x: 130, y: 150, label: '(1,2)' },
        { id: '4', x: 210, y: 150, label: '(2,2)' },
        { id: '5', x: 290, y: 200, label: '(3,1)' },
        { id: '6', x: 290, y: 100, label: '(3,3)' },
        { id: '7', x: 370, y: 50, label: '(4,4)' }
      ];

      const pointToIdx = {
        "(0,0)": 0,
        "(0,3)": 1,
        "(1,1)": 2,
        "(1,2)": 3,
        "(2,2)": 4,
        "(3,1)": 5,
        "(3,3)": 6,
        "(4,4)": 7
      };

      const state = data.debugger.getDebuggerState(stepIndex);
      const hullVar = state && state.vars ? state.vars.find(v => v.name === "hull") : null;
      
      let hullIndices = [];
      if (hullVar) {
        try {
          const hullPoints = JSON.parse(hullVar.val);
          hullIndices = hullPoints.map(pt => pointToIdx[pt]);
        } catch (e) {
          hullIndices = [];
        }
      }

      let closed = false;
      if (hullIndices.length > 0) {
        const iVar = state && state.vars ? state.vars.find(v => v.name === "i") : null;
        if (!iVar && stepIndex > 5) {
          closed = true;
        }
      }


      nodes.forEach(n => {
        const idx = parseInt(n.id);
        if (hullIndices.includes(idx)) {
          n.state = 'active';
        }
      });

      const edges = [];
      for (let i = 0; i < hullIndices.length - 1; i++) {
        edges.push({
          source: String(hullIndices[i]),
          target: String(hullIndices[i + 1]),
          active: true
        });
      }
      if (closed && hullIndices.length > 2 && hullIndices[hullIndices.length - 1] !== hullIndices[0]) {
        edges.push({
          source: String(hullIndices[hullIndices.length - 1]),
          target: String(hullIndices[0]),
          active: true
        });
      }

      return {
        directed: false,
        nodes,
        edges
      };
    }
  }
};
