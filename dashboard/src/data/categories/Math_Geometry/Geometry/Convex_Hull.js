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
  "code": `
#include <iostream>
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
    "text": "Initializare pts",
    "blocksVisual": []
  },
  {
    "line": 49,
    "text": "Apel convexHull",
    "blocksVisual": []
  },
  {
    "line": 20,
    "text": "int n = points.size(); n = 8",
    "blocksVisual": []
  },
  {
    "line": 21,
    "text": "if (n <= 3)",
    "blocksVisual": []
  },
  {
    "line": 23,
    "text": "sort(points)",
    "blocksVisual": []
  },
  {
    "line": 24,
    "text": "vector hull",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=0",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=1",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=2",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=3",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=4",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=5",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=6",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 27,
    "text": "lower hull for i=7",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 28,
    "text": "while hull.size()>=2 && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 35,
    "text": "int t = hull.size() + 1",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=6",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=5",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=4",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=3",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=2",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=1",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "pop_back din hull",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "upper hull for i=0",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "while hull.size()>=t && crossProduct<=0",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "push_back points[i]",
    "blocksVisual": []
  },
  {
    "line": 43,
    "text": "hull.pop_back() pentru primul/ultimul punct duplicat",
    "blocksVisual": []
  },
  {
    "line": 44,
    "text": "return hull",
    "blocksVisual": []
  },
  {
    "line": 49,
    "text": "hull a fost primit",
    "blocksVisual": []
  },
  {
    "line": 50,
    "text": "cout",
    "blocksVisual": []
  },
  {
    "line": 55,
    "text": "return 0",
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
    "getDebuggerState": (stepIndex) => {
      const states = [{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"pts init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"Apel"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"n=8"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"sorted"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=7"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"t=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\",\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull primit"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      return { vars: s.vars, globalVars: [], frames: s.frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"pts init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"Apel"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"n=8"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"sorted"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull init"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=7"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"7","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"t=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=6"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"6","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"5","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\",\"(3,1)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(3,3)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"4","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(2,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"3","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"2","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\",\"(1,1)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(1,2)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"1","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"i=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\",\"(0,0)\"]","expandable":false},{"name":"i","type":"int","val":"0","expandable":false},{"name":"t","type":"int","val":"4","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull.size=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(0,0)\",\"(0,3)\",\"(1,1)\",\"(1,2)\",\"(2,2)\",\"(3,1)\",\"(3,3)\",\"(4,4)\"]","expandable":false},{"name":"n","type":"int","val":"8","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"convexHull(pts)","file":"main.cpp","line": 19},{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":"hull primit"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(0,3)\",\"(1,1)\",\"(2,2)\",\"(4,4)\",\"(0,0)\",\"(1,2)\",\"(3,1)\",\"(3,3)\"]","expandable":false},{"name":"hull","type":"vector<Point>","val":"[\"(0,0)\",\"(3,1)\",\"(4,4)\",\"(0,3)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 47}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      if (s.inlineVal && s.frames.length > 0 && s.frames[0].line === lineNum) return s.inlineVal;
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

      let hullIndices = [];
      let closed = false;

      if (stepIndex === 6) {
        hullIndices = [0, 5, 7];
      } else if (stepIndex === 7 || stepIndex === 8 || stepIndex === 9) {
        hullIndices = [0, 5, 7];
      } else if (stepIndex === 10) {
        hullIndices = [0, 5, 7, 6, 1, 0];
        closed = true;
      } else if (stepIndex >= 11) {
        hullIndices = [0, 5, 7, 6, 1];
        closed = true;
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
