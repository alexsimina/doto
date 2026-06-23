export const data = {
  "presentation": `### Prezentare Generală

Algoritmul de baleiere (Sweep Line) este o paradigmă geometrică fundamentală utilizată pentru a rezolva probleme bidimensionale prin trecerea unei linii imaginare (de obicei verticală sau orizontală) peste plan. Pe măsură ce linia se deplasează de la stânga la dreapta, evenimentele geometrice relevante sunt procesate în ordine cronologică.

Acest algoritm transformă o problemă statică bidimensională într-o problemă dinamică unidimensională. O structură de date de tip set auto-echilibrat (de exemplu \`std::set\` în C++) este utilizată pentru a stoca starea activă a obiectelor geometrice intersectate în prezent de linia de baleiere.

Exemple clasice includ determinarea intersecțiilor de segmente în plan (Algoritmul Bentley-Ottmann) sau găsirea celei mai apropiate perechi de puncte (Closest Pair of Points) în $O(N \\log N)$.`,
  "complexity": `### Complexitate

Pentru $N$ obiecte în plan (cum ar fi puncte sau capete de segmente):
- **Timp:** $O(N \\log N)$ — sortarea inițială a evenimentelor durează $O(N \\log N)$, iar fiecare inserare, ștergere și interogare în setul activ durează $O(\\log N)$ pe eveniment.
- **Spațiu:** $O(N)$ — necesar pentru stocarea evenimentelor geometrice și a structurii setului activ.`,
  "variations": `### Variații și Edge Cases

1. **Evenimente coincidente:** Dacă mai multe puncte au aceeași abscisă $X$, ordonarea lor secundară (de obicei după $Y$) este critică pentru a evita erori geometrice.
2. **Structuri active adaptate:** În funcție de problemă, setul activ poate stoca puncte (sortate după $Y$), intervale active, sau intersecții de segmente.
3. **Baleiere 1D:** Probleme simple precum unirea intervalelor sau calcularea acoperirii maxime pe o axă folosesc evenimente de tip „start” și „end” sortate liniar.`,
  "applications": `### Aplicații

- Determinarea ariei uniunii unei mulțimi de dreptunghiuri orientate pe axe (Algoritmul lui Klee).
- Găsirea celei mai apropiate perechi de puncte în plan bidimensional.
- Determinarea tuturor punctelor de intersecție dintr-o mulțime de segmente de dreaptă.
- Triangularea poligoanelor în grafică computerizată.`,
  "code": `
#include <iostream>
#include <vector>
#include <set>
#include <cmath>
#include <algorithm>
#include <iomanip>

using namespace std;

struct Point {
    double x, y;
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

struct CompareY {
    bool operator()(const Point& a, const Point& b) const {
        if (a.y != b.y) return a.y < b.y;
        return a.x < b.x;
    }
};

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

double closestPair(vector<Point>& points) {
    sort(points.begin(), points.end());
    set<Point, CompareY> active_set;
    double d = dist(points[0], points[1]);
    active_set.insert(points[0]);
    active_set.insert(points[1]);
    
    int left = 0;
    for (int i = 2; i < points.size(); ++i) {
        while (left < i && points[i].x - points[left].x >= d) {
            active_set.erase(points[left]);
            left++;
        }
        
        Point lower = {points[i].x, points[i].y - d};
        Point upper = {points[i].x, points[i].y + d};
        auto it_start = active_set.lower_bound(lower);
        
        for (auto it = it_start; it != active_set.end() && it->y <= points[i].y + d; ++it) {
            d = min(d, dist(points[i], *it));
        }
        active_set.insert(points[i]);
    }
    return d;
}

int main() {
    vector<Point> pts = {{2, 3}, {12, 30}, {40, 50}, {5, 1}, {12, 10}, {3, 4}};
    double ans = closestPair(pts);
    cout << "Distanta minima: " << fixed << setprecision(4) << ans << endl;
    return 0;
}
`,
  "explanations": [
  {
    "line": 56,
    "text": "pts",
    "blocksVisual": []
  },
  {
    "line": 57,
    "text": "Apel closestPair",
    "blocksVisual": []
  },
  {
    "line": 29,
    "text": "Intrare functie",
    "blocksVisual": []
  },
  {
    "line": 30,
    "text": "sort(points)",
    "blocksVisual": []
  },
  {
    "line": 31,
    "text": "set active_set",
    "blocksVisual": []
  },
  {
    "line": 32,
    "text": "d = dist",
    "blocksVisual": []
  },
  {
    "line": 33,
    "text": "insert points[0]",
    "blocksVisual": []
  },
  {
    "line": 34,
    "text": "insert points[1]",
    "blocksVisual": []
  },
  {
    "line": 36,
    "text": "int left = 0",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "for i=2",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while (left < i && points[i].x - points[left].x >= d)",
    "blocksVisual": []
  },
  {
    "line": 39,
    "text": "active_set.erase",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "left++",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while (left < i && points[i].x - points[left].x >= d)",
    "blocksVisual": []
  },
  {
    "line": 39,
    "text": "active_set.erase",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "left++",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while ended",
    "blocksVisual": []
  },
  {
    "line": 43,
    "text": "lower = ...",
    "blocksVisual": []
  },
  {
    "line": 44,
    "text": "upper = ...",
    "blocksVisual": []
  },
  {
    "line": 45,
    "text": "auto it_start = active_set.lower_bound(lower)",
    "blocksVisual": []
  },
  {
    "line": 50,
    "text": "active_set.insert(points[i])",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "for i=3",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while (left < i && points[i].x - points[left].x >= d)",
    "blocksVisual": []
  },
  {
    "line": 39,
    "text": "active_set.erase",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "left++",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while ended",
    "blocksVisual": []
  },
  {
    "line": 43,
    "text": "lower = ...",
    "blocksVisual": []
  },
  {
    "line": 44,
    "text": "upper = ...",
    "blocksVisual": []
  },
  {
    "line": 45,
    "text": "auto it_start = active_set.lower_bound(lower)",
    "blocksVisual": []
  },
  {
    "line": 50,
    "text": "active_set.insert(points[i])",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "for i=4",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while ended",
    "blocksVisual": []
  },
  {
    "line": 43,
    "text": "lower = ...",
    "blocksVisual": []
  },
  {
    "line": 44,
    "text": "upper = ...",
    "blocksVisual": []
  },
  {
    "line": 45,
    "text": "auto it_start = active_set.lower_bound(lower)",
    "blocksVisual": []
  },
  {
    "line": 50,
    "text": "active_set.insert(points[i])",
    "blocksVisual": []
  },
  {
    "line": 37,
    "text": "for i=5",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while (left < i && points[i].x - points[left].x >= d)",
    "blocksVisual": []
  },
  {
    "line": 39,
    "text": "active_set.erase",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "left++",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while (left < i && points[i].x - points[left].x >= d)",
    "blocksVisual": []
  },
  {
    "line": 39,
    "text": "active_set.erase",
    "blocksVisual": []
  },
  {
    "line": 40,
    "text": "left++",
    "blocksVisual": []
  },
  {
    "line": 38,
    "text": "while ended",
    "blocksVisual": []
  },
  {
    "line": 43,
    "text": "lower = ...",
    "blocksVisual": []
  },
  {
    "line": 44,
    "text": "upper = ...",
    "blocksVisual": []
  },
  {
    "line": 45,
    "text": "auto it_start = active_set.lower_bound(lower)",
    "blocksVisual": []
  },
  {
    "line": 50,
    "text": "active_set.insert(points[i])",
    "blocksVisual": []
  },
  {
    "line": 52,
    "text": "return d",
    "blocksVisual": []
  },
  {
    "line": 57,
    "text": "ans primit",
    "blocksVisual": []
  },
  {
    "line": 58,
    "text": "cout",
    "blocksVisual": []
  },
  {
    "line": 59,
    "text": "return 0",
    "blocksVisual": []
  }
],
  "problems": {
    "easy": [
      {
        "title": "Merge Intervals",
        "url": "https://leetcode.com/problems/merge-intervals/",
        "desc": "Îmbinează intervalele suprapuse folosind o linie de baleiere unidimensională prin sortarea punctelor de start și final."
      }
    ],
    "medium": [
      {
        "title": "The Skyline Problem",
        "url": "https://leetcode.com/problems/the-skyline-problem/",
        "desc": "Reprezintă conturul clădirilor suprapuse folosind o linie de baleiere verticală și o structură de priority queue."
      }
    ],
    "hard": [
      {
        "title": "Closest Pair of Points",
        "url": "https://www.spoj.com/problems/CLOPPAIR/",
        "desc": "Găsește cea mai apropiată pereche de puncte în plan bidimensional folosind algoritmul Sweep Line în timp O(N log N)."
      }
    ]
  },
  "debugger": {
    "getDebuggerState": (stepIndex) => {
      const states = [{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"pts"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"d=1.4142"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"1","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"1","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"1","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(5,1)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(5,1)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(5,1)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\",\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\",\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\",\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"4","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"4","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"4","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(40,50)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(40,50)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"ans","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"ans=1.4142"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"ans","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"ans","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      return { vars: s.vars, globalVars: [], frames: s.frames, inlineVal: s.inlineVal };
    },
    "getInlineValueForLine": (stepIndex, lineNum) => {
      const states = [{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"pts"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"d=1.4142"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=0"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(2,3)\",\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"0","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"1","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=1"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(3,4)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"1","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"1","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=2"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(5,1)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"2","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(5,1)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(5,1)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"2","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=3"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"3","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\",\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"4","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\",\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"i=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,10)\",\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"3","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"4","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=4"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(12,30)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"4","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"4","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"left=5"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(40,50)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false},{"name":"i","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"points","type":"vector<Point>&","val":"[\"(2,3)\",\"(3,4)\",\"(5,1)\",\"(12,10)\",\"(12,30)\",\"(40,50)\"]","expandable":false},{"name":"active_set","type":"set<Point>","val":"[\"(40,50)\"]","expandable":false},{"name":"d","type":"double","val":"1.4142","expandable":false},{"name":"left","type":"int","val":"5","expandable":false}],"frames":[{"name":"closestPair(pts)","file":"main.cpp","line": 29},{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"ans","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":"ans=1.4142"},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"ans","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null},{"vars":[{"name":"pts","type":"vector<Point>","val":"[\"(2,3)\",\"(12,30)\",\"(40,50)\",\"(5,1)\",\"(12,10)\",\"(3,4)\"]","expandable":false},{"name":"ans","type":"double","val":"1.4142","expandable":false}],"frames":[{"name":"main()","file":"main.cpp","line": 55}],"inlineVal":null}];
      const s = states[stepIndex] || states[states.length - 1];
      if (s.inlineVal && s.frames.length > 0 && s.frames[0].line === lineNum) return s.inlineVal;
      return null;
    },
    "getGraphVisual": (stepIndex) => {
      const nodes = [
        { id: '0', x: 46, y: 238, label: '(2,3)' },
        { id: '1', x: 54, y: 234, label: '(3,4)' },
        { id: '2', x: 70, y: 246, label: '(5,1)' },
        { id: '3', x: 126, y: 210, label: '(12,10)' },
        { id: '4', x: 126, y: 130, label: '(12,30)' },
        { id: '5', x: 350, y: 50, label: '(40,50)' }
      ];

      let activeSetIndices = [];
      let currentPtIdx = -1;
      let sweepX = null;

      if (stepIndex === 4) {
        activeSetIndices = [0];
        sweepX = 46;
      } else if (stepIndex === 5 || stepIndex === 6) {
        activeSetIndices = [0, 1];
        sweepX = 54;
      } else if (stepIndex === 7 || stepIndex === 8) {
        activeSetIndices = [0, 1];
        currentPtIdx = 2;
        sweepX = 70;
      } else if (stepIndex === 9) {
        activeSetIndices = [1];
        currentPtIdx = 2;
        sweepX = 70;
      } else if (stepIndex >= 10 && stepIndex <= 14) {
        activeSetIndices = [1];
        currentPtIdx = 2;
        sweepX = 70;
      } else if (stepIndex === 15) {
        activeSetIndices = [0, 1, 2, 3, 4, 5];
        sweepX = 350;
      }

      nodes.forEach(n => {
        const idx = parseInt(n.id);
        if (idx === currentPtIdx) {
          n.state = 'active';
        } else if (activeSetIndices.includes(idx)) {
          n.state = 'visited';
        }
      });

      const edges = [];
      if (sweepX !== null) {
        nodes.push({ id: 'sweep_t', x: sweepX, y: 20, label: 'Baleiere', size: 1 });
        nodes.push({ id: 'sweep_b', x: sweepX, y: 280, label: '', size: 1 });
        edges.push({ source: 'sweep_t', target: 'sweep_b', active: true });
      }

      if (stepIndex >= 3) {
        edges.push({ source: '0', target: '1', active: false, label: 'd=1.41' });
      }

      return {
        directed: false,
        nodes,
        edges
      };
    }
  }
};
