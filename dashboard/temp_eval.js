module.exports = {
  "Arrays": {
    presentation: "Un Array (tablou) este o structură de date care stochează o colecție de elemente, de obicei de același tip, în locații de memorie contigue.\n\nImaginează-ți un dulap cu sertare numerotate: poți pune câte un obiect în fiecare sertar și poți accesa rapid orice obiect dacă îi știi numărul sertarului (indexul).",
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    \n    for(int i = 0; i < 5; i++) {\n        cout << "Element " << i << ": " << arr[i] << endl;\n    }\n    \n    return 0;\n}`,
    explanations: [
      { line: 1, text: "Includem biblioteca standard de intrare/ieșire pentru afișare." },
      { line: 2, text: "Folosim spațiul de nume standard pentru a nu mai scrie std::." },
      { line: 4, text: "Punctul de intrare în program." },
      { line: 5, text: "Declarăm și inițializăm un array de 5 elemente întregi." },
      { line: 7, text: "Un loop for care iterează de la indexul 0 la 4." },
      { line: 8, text: "Afișează valoarea din array de la indexul curent i." },
      { line: 11, text: "Finalizăm execuția cu succes." }
    ],
    problems: {
      easy: [
        { title: "Suma elementelor", url: "https://www.pbinfo.ro/probleme/123/suma-elementelor", desc: "Aflare sumă" },
        { title: "Afișare inversă", url: "https://www.pbinfo.ro/probleme/456/afisare-inversa", desc: "Afișare array" }
      ],
      medium: [
        { title: "Căutare Binară", url: "https://leetcode.com/problems/binary-search/", desc: "Algoritm optim" },
        { title: "Two Sum", url: "https://leetcode.com/problems/two-sum/", desc: "Folosire hashmap" }
      ],
      hard: [
        { title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/", desc: "Alg Kadane" },
        { title: "Trapping Rain Water", url: "https://leetcode.com/problems/trapping-rain-water/", desc: "Doi pointeri" }
      ]
    }
  },
  "Alg/Divide_Conquer": {
    presentation: "Divide et Impera (Divide and Conquer) este o paradigmă fundamentală de proiectare a algoritmilor. Funcționează prin împărțirea recursivă a unei probleme complexe în subprobleme mai mici de același tip, rezolvarea acestor subprobleme, și apoi combinarea soluțiilor lor pentru a obține rezultatul problemei inițiale.\n\nEtapele principale sunt:\n1. Divide: Împarte problema în subprobleme mai mici.\n2. Stăpânește (Conquer): Rezolvă subproblemele recursiv (până la cazuri de bază banale).\n3. Combină: Unește soluțiile subproblemelor pentru a rezolva problema mare.\n\nDe ce este important? Reduce drastic complexitatea în timp. Unul din cele mai clare exemple este Ridicarea la putere în timp logaritmic (Fast Exponentiation). Dacă vrem să calculăm a^n, o abordare naivă ar face n înmulțiri (O(n)). Însă, cu Divide et Impera, observăm că:\n- Dacă n este par: a^n = a^(n/2) * a^(n/2)\n- Dacă n este impar: a^n = a * a^(n-1)\nAceasta ne permite să reducem timpul la O(log n)!",
    complexity: "Prin reducerea continuă a dimensiunii problemei (de ex. înjumătățire), se ajunge la performanțe logaritmice sau super-liniare O(N log N) – esențiale pentru algoritmii moderni de sortare și structuri de date. Teorema Master ne ajută să calculăm complexitatea algoritmică a relațiilor de recurență.",
    variations: "Algoritmii care folosesc Divide et Impera se regăsesc în tot computer science-ul:\n1. Sortări (Merge Sort, Quick Sort)\n2. Căutări (Căutarea Binară pe vectori sau pe intervale de numere)\n3. Geometrie Computațională (Cel mai apropiat punct)\n4. Structuri de Date (Arbori de Intervale - Segment Trees)\n5. Transformata Fourier Rapidă (FFT) care stă la baza comprimării audio-video moderne.",
    applications: "Un prim contact excelent cu Divide et Impera este Ridicarea la putere. Mai jos, poți urmări pașii pentru a calcula 2^10 = 1024 în doar câteva înmulțiri, comparativ cu o buclă de 10 pași.",
    code: `#include <iostream>

using namespace std;

long long fastExpo(long long a, long long n) {
    if (n == 0) return 1;
    if (n % 2 == 0) {
        long long half = fastExpo(a, n / 2);
        return half * half;
    } else {
        return a * fastExpo(a, n - 1);
    }
}

int main() {
    long long baza = 2, exponent = 10;
    cout << baza << "^" << exponent << " = " << fastExpo(baza, exponent) << "\n";
    return 0;
}`,
    explanations: [
      { line: 17, text: "Apelăm funcția fastExpo pentru a calcula 2^10.", blocksVisual: [{ label: "Stare", groups: [[{val: "Calcul: 2^10", active: true}]] }] },
      { line: 7, text: "Exponentul 10 este par. Conform strategiei Divide et Impera, calculăm întâi a^(n/2), adică 2^5.", blocksVisual: [{ label: "Înjumătățire", groups: [[{val: "Calculăm 2^5"}], [{val: "Urmează: x * x", hidden: true}]] }] },
      { line: 8, text: "Ne adâncim recursiv pentru a calcula fastExpo(2, 5).", blocksVisual: [{ label: "Apel recursiv", groups: [[{val: "Calcul: 2^5", active: true}]] }] },
      { line: 11, text: "Exponentul 5 este impar. Reducem problema calculând întâi 2^4.", blocksVisual: [{ label: "Impar", groups: [[{val: "Calculăm 2^4"}], [{val: "Urmează: 2 * (2^4)", hidden: true}]] }] },
      { line: 11, text: "Apel recursiv pentru fastExpo(2, 4).", blocksVisual: [{ label: "Apel recursiv", groups: [[{val: "Calcul: 2^4", active: true}]] }] },
      { line: 7, text: "Exponentul 4 este par. Înjumătățim la fastExpo(2, 2).", blocksVisual: [{ label: "Înjumătățire", groups: [[{val: "Calculăm 2^2"}], [{val: "Urmează: y * y", hidden: true}]] }] },
      { line: 8, text: "Apel recursiv pentru fastExpo(2, 2).", blocksVisual: [{ label: "Apel recursiv", groups: [[{val: "Calcul: 2^2", active: true}]] }] },
      { line: 7, text: "Exponentul 2 este par. Înjumătățim la fastExpo(2, 1).", blocksVisual: [{ label: "Înjumătățire", groups: [[{val: "Calculăm 2^1"}], [{val: "Urmează: z * z", hidden: true}]] }] },
      { line: 8, text: "Apel recursiv pentru fastExpo(2, 1).", blocksVisual: [{ label: "Apel recursiv", groups: [[{val: "Calcul: 2^1", active: true}]] }] },
      { line: 11, text: "Exponentul 1 este impar. Reducem la fastExpo(2, 0).", blocksVisual: [{ label: "Impar", groups: [[{val: "Calculăm 2^0"}], [{val: "Urmează: 2 * (2^0)", hidden: true}]] }] },
      { line: 6, text: "Cazul de bază: Exponentul este 0. Orice număr la puterea 0 este 1. Am atins baza recursivității!", blocksVisual: [{ label: "Caz de bază", groups: [[{val: "2^0 = 1", sorted: true}]] }] },
      { line: 11, text: "Ne întoarcem din recursivitate: 2 * (2^0) = 2 * 1 = 2. Deci 2^1 = 2.", blocksVisual: [{ label: "Întoarcere", groups: [[{val: "2^1 = 2", sorted: true}]] }] },
      { line: 9, text: "Acum avem răspunsul pentru (2^1). Îl ridicăm la pătrat pentru a obține 2^2: 2 * 2 = 4.", blocksVisual: [{ label: "Întoarcere (par)", groups: [[{val: "2^2 = 4", sorted: true}]] }] },
      { line: 9, text: "Avem răspunsul pentru (2^2). Îl ridicăm la pătrat pentru a obține 2^4: 4 * 4 = 16.", blocksVisual: [{ label: "Întoarcere (par)", groups: [[{val: "2^4 = 16", sorted: true}]] }] },
      { line: 11, text: "Pentru exponent impar, multiplicăm cu baza: 2 * (2^4) = 2 * 16 = 32. Deci 2^5 = 32.", blocksVisual: [{ label: "Întoarcere (impar)", groups: [[{val: "2^5 = 32", sorted: true}]] }] },
      { line: 9, text: "În sfârșit, avem jumătatea pentru apelul inițial: (2^5). O ridicăm la pătrat: 32 * 32 = 1024.", blocksVisual: [{ label: "FINAL COMBINE", groups: [[{val: "2^10 = 1024", sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Putere", url: "https://www.pbinfo.ro/probleme/810/putere", desc: "Aflare a^n" },
        { title: "Căutare Binară", url: "https://www.pbinfo.ro/probleme/115/cautare-binara", desc: "Aflare element O(log N)" }
      ],
      medium: [
        { title: "Turnurile din Hanoi", url: "https://www.pbinfo.ro/probleme/1146/hanoi", desc: "Recursivitate & Divide" },
        { title: "Z-Parcurgere", url: "https://www.infoarena.ro/problema/z", desc: "Parcurgere fractalică" }
      ],
      hard: [
        { title: "Inversion Count", url: "https://www.spoj.com/problems/INVCNT/", desc: "Numărare inversiuni" },
        { title: "Pow(x, n)", url: "https://leetcode.com/problems/powx-n/", desc: "Fast Expo pe numere reale" }
      ]
    }
  },
  "Alg/Divide_Conquer/Binary_Search": {
    presentation: "Căutarea Binară (Binary Search) este un algoritm extrem de eficient pentru găsirea unui element într-un șir **sortat**.\n\nPrincipiul de bază este simplu: comparăm valoarea căutată cu elementul din mijlocul șirului. Dacă sunt egale, am găsit elementul! Dacă valoarea căutată este mai mică, înseamnă că ea se poate afla doar în prima jumătate a șirului (deoarece șirul e sortat). Dacă este mai mare, se află cu siguranță în a doua jumătate. Astfel, la fiecare pas, înjumătățim spațiul de căutare.\n\nImaginează-ți că deschizi un dicționar pentru a căuta cuvântul 'Programare'. Nu citești fiecare pagină, ci deschizi la jumătate. Dacă dai de litera 'M', știi că 'P' urmează mai încolo, așa că ignori complet prima jumătate a dicționarului și cauți doar în a doua.",
    complexity: "Timp: O(log N). La fiecare pas, numărul de elemente analizate se reduce la jumătate. Chiar și pentru un miliard de elemente (10^9), algoritmul are nevoie de cel mult 30 de pași!\nSpațiu: O(1) pentru varianta iterativă (care folosește doar câțiva pointeri). Varianta recursivă necesită O(log N) spațiu pe stiva de apeluri (Call Stack).",
    variations: "1. Lower Bound / Upper Bound: În loc să găsim o valoare exactă, vrem să găsim prima valoare mai mare sau egală (lower_bound) sau strict mai mare (upper_bound) decât target-ul.\n2. Căutarea Binară pe Răspuns (Binary Search on Answer): O tehnică avansată unde nu căutăm într-un array, ci într-un interval de valori posibile ale răspunsului, validând fiecare valoare printr-o funcție de decizie (care trebuie să fie monotonă).",
    applications: "Căutarea binară este o tehnică foarte versatilă:\n\n- Optimizări în care trebuie să găsești o soluție optimă ('minimizați maximul' sau 'maximizați minimul').\n- Rezolvarea ecuațiilor matematice monotone (găsirea rădăcinilor).\n- Interogări rapide pe structuri de date sortate.",
    code: `#include <iostream>
#include <vector>

using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Element gasit
        }
        
        if (arr[mid] < target) {
            left = mid + 1; // Cautam in dreapta
        } else {
            right = mid - 1; // Cautam in stanga
        }
    }
    
    return -1; // Elementul nu exista
}

int main() {
    vector<int> arr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    
    int result = binarySearch(arr, target);
    
    if (result != -1) {
        cout << "Elementul " << target << " a fost gasit la indexul: " << result << "\\n";
    } else {
        cout << "Elementul " << target << " nu a fost gasit.\\n";
    }
    
    return 0;
}`,
    explanations: [
      { line: 7, text: "Setăm limitele inițiale: `left` la primul element și `right` la ultimul.", blocksVisual: [{ label: "Inițializare", groups: [[{val: 2, active: true}, {val: 5}, {val: 8}, {val: 12}, {val: 16}, {val: 23}, {val: 38}, {val: 56}, {val: 72}, {val: 91, active: true}]] }] },
      { line: 10, text: "Cât timp intervalul este valid (left nu a depășit right), continuăm căutarea." },
      { line: 11, text: "Calculăm mijlocul. Folosim formula `left + (right - left) / 2` pentru a preveni overflow-ul dacă left și right sunt foarte mari.", blocksVisual: [{ label: "Mijloc (mid = 4)", groups: [[{val: 2, active: true}, {val: 5}, {val: 8}, {val: 12}, {val: 16, sorted: true}, {val: 23}, {val: 38}, {val: 56}, {val: 72}, {val: 91, active: true}]] }] },
      { line: 13, text: "Verificăm dacă am găsit elementul. (16 == 23) este Fals." },
      { line: 17, text: "Elementul din mijloc (16) este mai mic decât target-ul (23). Astfel, știm sigur că 23 se află în dreapta lui 16. Mutăm `left` la `mid + 1`." },
      { line: 18, text: "Noul interval devine [23, 38, 56, 72, 91].", blocksVisual: [{ label: "Actualizare Left", groups: [[{val: 2, hidden: true}, {val: 5, hidden: true}, {val: 8, hidden: true}, {val: 12, hidden: true}, {val: 16, hidden: true}, {val: 23, active: true}, {val: 38}, {val: 56}, {val: 72}, {val: 91, active: true}]] }] },
      { line: 10, text: "Reluăm bucla cu noul interval." },
      { line: 11, text: "Calculăm noul mijloc: left=5, right=9. `mid = 5 + (9 - 5)/2 = 7` (valoarea 56).", blocksVisual: [{ label: "Nou Mijloc (mid = 7)", groups: [[{val: 2, hidden: true}, {val: 5, hidden: true}, {val: 8, hidden: true}, {val: 12, hidden: true}, {val: 16, hidden: true}, {val: 23, active: true}, {val: 38}, {val: 56, sorted: true}, {val: 72}, {val: 91, active: true}]] }] },
      { line: 13, text: "Verificăm dacă (56 == 23). Fals." },
      { line: 17, text: "Acum 56 este mai MARE decât 23. Astfel, 23 se află în stânga lui 56. Mutăm `right` la `mid - 1`." },
      { line: 20, text: "Noul interval devine [23, 38].", blocksVisual: [{ label: "Actualizare Right", groups: [[{val: 2, hidden: true}, {val: 5, hidden: true}, {val: 8, hidden: true}, {val: 12, hidden: true}, {val: 16, hidden: true}, {val: 23, active: true}, {val: 38, active: true}, {val: 56, hidden: true}, {val: 72, hidden: true}, {val: 91, hidden: true}]] }] },
      { line: 10, text: "Reluăm bucla." },
      { line: 11, text: "Calculăm noul mijloc: left=5, right=6. `mid = 5 + (6 - 5)/2 = 5` (valoarea 23).", blocksVisual: [{ label: "Nou Mijloc (mid = 5)", groups: [[{val: 2, hidden: true}, {val: 5, hidden: true}, {val: 8, hidden: true}, {val: 12, hidden: true}, {val: 16, hidden: true}, {val: 23, sorted: true}, {val: 38, active: true}, {val: 56, hidden: true}, {val: 72, hidden: true}, {val: 91, hidden: true}]] }] },
      { line: 13, text: "Verificăm (23 == 23). ADEVĂRAT! Am găsit elementul." },
      { line: 14, text: "Returnăm indexul 5.", blocksVisual: [{ label: "FINAL - Succes!", groups: [[{val: 23, sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Binary Search", url: "https://leetcode.com/problems/binary-search/", desc: "Standard BS" },
        { title: "First Bad Version", url: "https://leetcode.com/problems/first-bad-version/", desc: "Lower Bound practic" }
      ],
      medium: [
        { title: "Search in Rotated Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", desc: "Array rotit" },
        { title: "Koko Eating Bananas", url: "https://leetcode.com/problems/koko-eating-bananas/", desc: "Căutare pe Răspuns" },
        { title: "Tăieturi M", url: "https://www.pbinfo.ro/probleme/1149/taieturi-m", desc: "Problema cu cherestea" }
      ],
      hard: [
        { title: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", desc: "O(log(min(m,n))) BS complex" },
        { title: "Split Array Largest Sum", url: "https://leetcode.com/problems/split-array-largest-sum/", desc: "Minimizați maximul (BS + Greedy)" }
      ]
    }
  },
  "Alg/Divide_Conquer/Merge_Sort": {
    presentation: "Merge Sort este un algoritm de sortare clasic și foarte eficient, bazat pe Divide et Impera. Se bazează pe o idee extrem de elegantă: e foarte ușor să unești (interclasezi) două șiruri deja sortate într-unul singur, tot sortat.\n\nLogica principală: înjumătățim constant șirul până ajungem la elemente individuale (care, fiind singure, sunt implicit 'sortate'). Apoi le combinăm înapoi două câte două, menținând ordinea la fiecare pas.\n\nCaracteristica sa de bază este stabilitatea. Un algoritm stabil garantează că elementele cu valori egale își păstrează ordinea relativă inițială după sortare (esențial când sortezi obiecte după atribute multiple).",
    complexity: "Timp: O(N log N) în orice caz (Best, Average, Worst). E garantat să nu degenereze în O(N^2) precum Quick Sort.\nSpațiu: O(N) memorie auxiliară. Acesta este marele dezavantaj al Merge Sort – necesită vectori auxiliari pentru interclasare.",
    variations: "1. Inversion Count (Numărarea inversiunilor): Cea mai populară aplicație a algoritmului.\n2. Bottom-up Merge Sort: Fără recursivitate, unește direct perechi de lungime 1, apoi 2, 4 etc.",
    applications: "Merge Sort este algoritmul preferat pentru structurile de date Linked Lists, unde inserarea la mijloc se face în O(1) și nu avem nevoie de un vector auxiliar suplimentar masiv.",
    code: `#include <iostream>
#include <vector>

using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
        
    int mid = left + (right - left) / 2;
    
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    
    merge(arr, left, mid, right);
}

int main() {
    vector<int> arr = {38, 27, 43, 3};
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Array sortat: ";
    for(int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}`,
    explanations: [
      { line: 43, text: "Începem cu un vector inițial neordonat.", blocksVisual: [{ label: "Vector Inițial", groups: [[{val: 38}, {val: 27}, {val: 43}, {val: 3}]] }] },
      { line: 33, text: "Apelăm mergeSort pentru întreg vectorul (left=0, right=3).", blocksVisual: [{ label: "Vector Inițial", groups: [[{val: 38, active: true}, {val: 27, active: true}, {val: 43, active: true}, {val: 3, active: true}]] }] },
      { line: 35, text: "Etapa DIVIDE: Calculăm mijlocul pentru a împărți problema în două.", blocksVisual: [{ label: "Împărțire în două jumătăți", groups: [[{val: 38, active: true}, {val: 27, active: true}], [{val: 43}, {val: 3}]] }] },
      { line: 37, text: "Etapa CONQUER: Apelăm recursiv mergeSort pentru jumătatea din stânga.", blocksVisual: [{ label: "Jumătatea stângă (Apel curent)", groups: [[{val: 38, active: true}, {val: 27, active: true}]] }, { label: "Jumătatea dreaptă (În așteptare)", groups: [[{val: 43, hidden: true}, {val: 3, hidden: true}]] }] },
      { line: 35, text: "Împărțim din nou jumătatea stângă.", blocksVisual: [{ label: "Divide - stânga", groups: [[{val: 38, active: true}], [{val: 27, active: true}]] }] },
      { line: 33, text: "Cazul de bază: Elementele ajung să fie singure [38] și [27]. Ele nu mai pot fi împărțite și se consideră sortate.", blocksVisual: [{ label: "Elemente singure (Sortate default)", groups: [[{val: 38, sorted: true}], [{val: 27, sorted: true}]] }] },
      { line: 40, text: "Etapa COMBINE: Apelăm funcția merge pentru a interclasa [38] și [27].", blocksVisual: [{ label: "L (Stânga)", groups: [[{val: 38, sorted: true}]] }, { label: "R (Dreapta)", groups: [[{val: 27, sorted: true}]] }, { label: "Vector destinație temporar", groups: [[{val: "?", hidden: true}, {val: "?", hidden: true}]] }] },
      { line: 16, text: "Comparăm elementele (38 cu 27). Punem elementul mai mic primul.", blocksVisual: [{ label: "L", groups: [[{val: 38, active: true}]] }, { label: "R", groups: [[{val: 27, active: true}]] }, { label: "Rezultat (27 < 38)", groups: [[{val: 27, sorted: true}, {val: "?", hidden: true}]] }] },
      { line: 27, text: "Copiem restul elementelor (în acest caz 38) dacă un vector se termină.", blocksVisual: [{ label: "L (rămas)", groups: [[{val: 38, active: true}]] }, { label: "Sfertul stâng interclasat complet", groups: [[{val: 27, sorted: true}, {val: 38, sorted: true}]] }] },
      { line: 38, text: "Acum că jumătatea stângă originală e sortată [27, 38], aplicăm aceeași recursivitate pentru jumătatea din dreapta [43, 3].", blocksVisual: [{ label: "Stânga (Gata)", groups: [[{val: 27, sorted: true}, {val: 38, sorted: true}]] }, { label: "Dreapta (Urmează)", groups: [[{val: 43, active: true}, {val: 3, active: true}]] }] },
      { line: 35, text: "Împărțim jumătatea dreaptă.", blocksVisual: [{ label: "Divide - dreapta", groups: [[{val: 43, active: true}], [{val: 3, active: true}]] }] },
      { line: 16, text: "Și le interclasăm similar pe [43] și [3]. 3 este mai mic.", blocksVisual: [{ label: "L", groups: [[{val: 43, sorted: true}]] }, { label: "R", groups: [[{val: 3, sorted: true}]] }, { label: "Sfertul drept interclasat (3 < 43)", groups: [[{val: 3, sorted: true}, {val: 43, sorted: true}]] }] },
      { line: 40, text: "Finalul etapei COMBINE pentru tot vectorul: Apelăm funcția merge pentru cele două jumătăți mari (care acum sunt sortate).", blocksVisual: [{ label: "Jumătatea Stângă", groups: [[{val: 27, sorted: true}, {val: 38, sorted: true}]] }, { label: "Jumătatea Dreaptă", groups: [[{val: 3, sorted: true}, {val: 43, sorted: true}]] }, { label: "Array destinație general", groups: [[{val: "?", hidden: true}, {val: "?", hidden: true}, {val: "?", hidden: true}, {val: "?", hidden: true}]] }] },
      { line: 16, text: "Comparăm primul din L (27) cu primul din R (3).", blocksVisual: [{ label: "L", groups: [[{val: 27, active: true}, {val: 38, sorted: true}]] }, { label: "R", groups: [[{val: 3, active: true}, {val: 43, sorted: true}]] }, { label: "Alegem 3", groups: [[{val: 3, sorted: true}, {val: "?", hidden: true}, {val: "?", hidden: true}, {val: "?", hidden: true}]] }] },
      { line: 16, text: "Avansează R. Comparăm (27) cu următorul din R (43).", blocksVisual: [{ label: "L", groups: [[{val: 27, active: true}, {val: 38, sorted: true}]] }, { label: "R", groups: [[{val: 3, hidden: true}, {val: 43, active: true}]] }, { label: "Alegem 27", groups: [[{val: 3, sorted: true}, {val: 27, sorted: true}, {val: "?", hidden: true}, {val: "?", hidden: true}]] }] },
      { line: 16, text: "Avansează L. Comparăm (38) cu (43).", blocksVisual: [{ label: "L", groups: [[{val: 27, hidden: true}, {val: 38, active: true}]] }, { label: "R", groups: [[{val: 3, hidden: true}, {val: 43, active: true}]] }, { label: "Alegem 38", groups: [[{val: 3, sorted: true}, {val: 27, sorted: true}, {val: 38, sorted: true}, {val: "?", hidden: true}]] }] },
      { line: 28, text: "L s-a terminat. Copiem elementele rămase din R (adică 43).", blocksVisual: [{ label: "R (rămas)", groups: [[{val: 43, active: true}]] }, { label: "Vector interclasat complet", groups: [[{val: 3, sorted: true}, {val: 27, sorted: true}, {val: 38, sorted: true}, {val: 43, sorted: true}]] }] },
      { line: 48, text: "Algoritmul s-a terminat. Am combinat succesiv soluții mici pentru a rezolva problema mare!", blocksVisual: [{ label: "REZULTAT FINAL", groups: [[{val: 3, sorted: true}, {val: 27, sorted: true}, {val: 38, sorted: true}, {val: 43, sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Sort an Array", url: "https://leetcode.com/problems/sort-an-array/", desc: "Problemă standard" },
        { title: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/", desc: "Punctul cheie (merge)" }
      ],
      medium: [
        { title: "Sort List", url: "https://leetcode.com/problems/sort-list/", desc: "Merge Sort pe liste O(1) memorie" },
        { title: "Inversion Count", url: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1", desc: "Aplicația numărul 1" }
      ],
      hard: [
        { title: "Count of Range Sum", url: "https://leetcode.com/problems/count-of-range-sum/", desc: "Merge Sort modificat" },
        { title: "Reverse Pairs", url: "https://leetcode.com/problems/reverse-pairs/", desc: "Variație la Inversiuni" }
      ]
    }
  },
  "Alg/Divide_Conquer/Quick_Sort": {
    presentation: "Quick Sort este probabil cel mai faimos algoritm de sortare practic (de unde și cuvântul 'Quick'). Deși asimptotic (pe hârtie) Worst-Case-ul lui este mai slab decât al Merge Sort, în realitate, cu mici optimizări (ca alegerea randomizată a pivotului), bate majoritatea algoritmilor de sortare!\n\nIdeea sa este să aleagă un element numit 'Pivot' și să 'partiționeze' șirul: toate elementele mai mici decât pivotul merg în stânga sa, și toate cele mai mari merg în dreapta sa. După acest proces, știm clar că Pivotul este la poziția sa finală! Apoi, aplicăm recursiv Quick Sort pe partea stângă și pe partea dreaptă.",
    complexity: "Timp: O(N log N) în caz mediu (Average Case) și optim. O(N^2) în cel mai rău caz (Worst Case), care apare când vectorul este deja sortat și alegem sistematic primul sau ultimul element ca pivot. Randomizarea pivotului elimină practic șansa unui O(N^2).\nSpațiu: O(1) memorie auxiliară (sortează 'in-place'). Pe stiva de apeluri folosește O(log N) spațiu.",
    variations: "1. Randomized Quick Sort: Algoritmul standard folosește un rand() pentru a alege pivotul, anulând vulnerabilitățile worst-case.\n2. Quick Select (K-th Element): Putem afla al K-lea cel mai mic element în O(N) folosind logica de partiționare a Quick Sort, fără să sortăm integral vectorul (căutăm doar în stânga sau în dreapta pivotului!).\n3. 3-Way Quick Sort (Dijkstra 3-way partitioning): Optim pentru vectori cu extrem de multe duplicate (grupează '<, ==, >').",
    applications: "Funcția qsort() din C și funcțiile similare din alte limbaje s-au bazat decenii la rând pe acest algoritm. Reprezintă de asemenea soluția standard când ai memorie RAM extrem de strictă și Merge Sort e inacceptabil din cauza O(N) aux space.",
    code: `#include <iostream>
#include <vector>

using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1);
  
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> arr = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, arr.size() - 1);
    cout << "Array sortat cu Quick Sort: ";
    for(int x : arr) cout << x << " ";
    cout << "\n";
    return 0;
}`,
    explanations: [
      { line: 31, text: "Avem vectorul nesortat [10, 7, 8, 9, 1, 5].", blocksVisual: [{ label: "Inițial", groups: [[{val: 10}, {val: 7}, {val: 8}, {val: 9}, {val: 1}, {val: 5}]] }] },
      { line: 22, text: "Apelăm quickSort pentru întreg intervalul (low=0, high=5).", blocksVisual: [{ label: "Apel initial", groups: [[{val: 10, active: true}, {val: 7, active: true}, {val: 8, active: true}, {val: 9, active: true}, {val: 1, active: true}, {val: 5, active: true}]] }] },
      { line: 23, text: "Aflăm poziția pivotului apelând funcția partition.", blocksVisual: [{ label: "Partiționare curentă", groups: [[{val: 10, active: true}, {val: 7, active: true}, {val: 8, active: true}, {val: 9, active: true}, {val: 1, active: true}, {val: 5, active: true}]] }] },
      { line: 7, text: "La prima partiționare, Pivotul devine ultimul element: 5.", blocksVisual: [{ label: "Pivot = 5", groups: [[{val: 10}, {val: 7}, {val: 8}, {val: 9}, {val: 1}, {val: 5, active: true}]] }] },
      { line: 10, text: "Iterăm prin vector. 10 > 5, 7 > 5, 8 > 5, 9 > 5. Niciun swap până la 1.", blocksVisual: [{ label: "Căutare mai mici", groups: [[{val: 10}, {val: 7}, {val: 8}, {val: 9}, {val: 1, active: true}, {val: 5, active: true}]] }] },
      { line: 13, text: "Găsim 1 < 5. Îl aducem la început (swap cu arr[i+1], adică cu 10).", blocksVisual: [{ label: "Swap 1 cu 10", groups: [[{val: 1}, {val: 7}, {val: 8}, {val: 9}, {val: 10}, {val: 5, active: true}]] }] },
      { line: 17, text: "Aducem pivotul (5) la locul său corect (după 1). Facem swap între 7 (prima valoare mai mare) și 5.", blocksVisual: [{ label: "Fixare Pivot", groups: [[{val: 1}, {val: 5, sorted: true}, {val: 8}, {val: 9}, {val: 10}, {val: 7}]] }] },
      { line: 24, text: "Aplicăm quickSort recursiv pe jumătatea stângă [1] (low=0, high=0). Condiția low < high e falsă, deci rămâne pe loc.", blocksVisual: [{ label: "Stânga (Sortat)", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 8}, {val: 9}, {val: 10}, {val: 7}]] }] },
      { line: 25, text: "Aplicăm quickSort pe jumătatea dreaptă (low=2, high=5). Intervalul este [8, 9, 10, 7].", blocksVisual: [{ label: "Partea Dreaptă", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 8, active: true}, {val: 9, active: true}, {val: 10, active: true}, {val: 7, active: true}]] }] },
      { line: 7, text: "Partiționăm [8, 9, 10, 7]. Pivotul devine ultimul element: 7.", blocksVisual: [{ label: "Pivot = 7", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 8}, {val: 9}, {val: 10}, {val: 7, active: true}]] }] },
      { line: 10, text: "Toate elementele (8, 9, 10) sunt > 7. Niciun swap în buclă.", blocksVisual: [{ label: "Căutare", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 8}, {val: 9}, {val: 10}, {val: 7, active: true}]] }] },
      { line: 17, text: "Punem pivotul (7) la locul lui, la începutul intervalului (swap 8 cu 7). Vectorul devine [7, 9, 10, 8].", blocksVisual: [{ label: "Fixare Pivot 7", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 7, sorted: true}, {val: 9}, {val: 10}, {val: 8}]] }] },
      { line: 25, text: "Aplicăm quickSort la dreapta lui 7. Interval: [9, 10, 8] (low=3, high=5).", blocksVisual: [{ label: "Partea Dreaptă", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 7, sorted: true}, {val: 9, active: true}, {val: 10, active: true}, {val: 8, active: true}]] }] },
      { line: 7, text: "Partiționăm [9, 10, 8]. Pivotul este 8. Atât 9 cât și 10 sunt mai mari ca 8. Swap 8 cu 9. Vector: [8, 10, 9].", blocksVisual: [{ label: "Pivot 8 fixat", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 7, sorted: true}, {val: 8, sorted: true}, {val: 10}, {val: 9}]] }] },
      { line: 25, text: "Aplicăm quickSort la dreapta lui 8. Interval: [10, 9] (low=4, high=5).", blocksVisual: [{ label: "Partea Dreaptă", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 7, sorted: true}, {val: 8, sorted: true}, {val: 10, active: true}, {val: 9, active: true}]] }] },
      { line: 7, text: "Partiționăm [10, 9]. Pivotul e 9. 10 > 9. Swap 10 cu 9. Vector: [9, 10].", blocksVisual: [{ label: "Pivot 9 fixat", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 7, sorted: true}, {val: 8, sorted: true}, {val: 9, sorted: true}, {val: 10}]] }] },
      { line: 36, text: "La final, elementul 10 rămâne singur. Este automat considerat sortat.", blocksVisual: [{ label: "Finalizat!", groups: [[{val: 1, sorted: true}, {val: 5, sorted: true}, {val: 7, sorted: true}, {val: 8, sorted: true}, {val: 9, sorted: true}, {val: 10, sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Sort an Array", url: "https://leetcode.com/problems/sort-an-array/", desc: "Folosind Quick Sort" }
      ],
      medium: [
        { title: "Kth Largest Element", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", desc: "Quick Select, optim O(N)" },
        { title: "Sort Colors (0 1 2)", url: "https://leetcode.com/problems/sort-colors/", desc: "3-Way Partitioning/Dutch Flag" }
      ],
      hard: [
        { title: "Median of Array (O(N))", url: "https://www.infoarena.ro/problema/sdo", desc: "Selecție de ordine" }
      ]
    }
  },
  "Alg/Divide_Conquer/Z_Traversal": {
    presentation: "Z-Parcurgere (Z-Traversal / Morton Order / Z-order curve) este un algoritm clasic care utilizează Divide et Impera pentru a mapa date multidimensionale pe o singură dimensiune, păstrând localitatea.\n\nProblema tipică ne cere să determinăm valoarea dintr-o matrice $2^N \\times 2^N$ la o anumită linie și coloană, știind că matricea este populată parcurgând recursiv cadranele ei în ordinea formei literei 'Z':\n1. Cadranul stânga-sus\n2. Cadranul dreapta-sus\n3. Cadranul stânga-jos\n4. Cadranul dreapta-jos\n\nPentru a găsi valoarea direct, NU trebuie să generăm matricea (ceea ce ar costa O(4^N) memorie și timp). Folosim Divide et Impera: împărțim matricea curentă în 4 și verificăm în care sfert se află linia și coloana noastră. Adunăm la răspuns numărul de elemente din cadranele pe care le sărim și continuăm recursiv în cadranul țintă până ajungem la o celulă $1 \\times 1$.",
    complexity: "Timp: O(N) unde N este puterea lui 2 a laturii matricei. Deoarece înjumătățim dimensiunea la fiecare pas, vom face exact N pași.\nSpațiu: O(1) pentru varianta iterativă, sau O(N) memorie pe stiva de apeluri pentru recursivitate.",
    variations: "1. Varianta Inversă: Se dă valoarea și trebuie să găsim coordonatele (R, C) corespunzătoare.\n2. Grafică pe Calculator: Generarea de hărți de biți și optimizarea texturilor (Quadtrees, Morton codes).",
    applications: "Acest algoritm stă la baza Quadtrees, folosite extensiv în dezvoltarea de jocuri, detectarea coliziunilor 2D și indexarea geografică a bazelor de date (ex. Amazon DynamoDB / baze de date spațiale).",
    code: `#include <iostream>

using namespace std;

long long zTraversal(int n, int r, int c) {
    if (n == 1) return 0;

    int half = n / 2;
    long long area = 1LL * half * half;

    if (r < half && c < half) return zTraversal(half, r, c);
    else if (r < half && c >= half) return area + zTraversal(half, r, c - half);
    else if (r >= half && c < half) return 2 * area + zTraversal(half, r - half, c);
    else return 3 * area + zTraversal(half, r - half, c - half);
}

int main() {
    int N = 3;
    int dim = 1 << N;
    int r = 5, c = 2;
    
    cout << "Valoarea la (" << r << ", " << c << ") este: " << zTraversal(dim, r, c) << "\n";
    return 0;
}`,
    explanations: [
      { line: 21, text: "Vrem să aflăm valoarea la linia r=5, coloana c=2 într-o matrice de dimensiune 8x8 (unde indicii sunt 0..7).", blocksVisual: [{ label: "Căutare", groups: [[{val: "Dim: 8x8"}, {val: "R: 5"}, {val: "C: 2"}]] }] },
      { line: 8, text: "Jumătatea dimensiunii este half = 4. Aria unui cadran (sfert) este 4x4 = 16. Cadranul stânga-sus are valori 0..15, dreapta-sus 16..31, stânga-jos 32..47, dreapta-jos 48..63.", blocksVisual: [{ label: "Matrice 8x8", groups: [[{val: "[0..15]"}, {val: "[16..31]"}], [{val: "[32..47]", active: true}, {val: "[48..63]"}]] }] },
      { line: 13, text: "Verificăm cadranele: r=5 >= 4, c=2 < 4. Suntem în Cadranul 3 (Stânga-Jos). Sărim peste primele 2 cadrane (2 * 16 = 32 elemente). Apelăm recursiv pentru noul cadran.", blocksVisual: [{ label: "Salt +32", groups: [[{val: "+32 elemente", sorted: true}]] }] },
      { line: 8, text: "Acum căutăm în submatricea de 4x4. Noile coordonate relative devin r = 5 - 4 = 1 și c = 2. Jumătatea este 2, aria unui cadran este 4.", blocksVisual: [{ label: "Matrice 4x4", groups: [[{val: "[32..35]", active: true}, {val: "[36..39]"}], [{val: "[40..43]"}, {val: "[44..47]"}]] }] },
      { line: 12, text: "r=1 < 2, dar c=2 NU este < 2, deci c=2 >= 2! Ah, deci suntem in Cadranul 2 (Dreapta-Sus).", blocksVisual: [{ label: "Salt +4", groups: [[{val: "+4 elemente", sorted: true}]] }] },
      { line: 12, text: "Adunăm aria unui cadran (4). Coordonatele devin: r=1, c=2-2=0. Apelăm recursiv pentru submatrice 2x2.", blocksVisual: [{ label: "Total = 32 + 4", groups: [[{val: "36"}]] }] },
      { line: 8, text: "Matrice 2x2. Jumătatea e 1, aria unui cadran este 1. Căutăm la r=1, c=0.", blocksVisual: [{ label: "Matrice 2x2", groups: [[{val: "[36]"}, {val: "[37]"}], [{val: "[38]", active: true}, {val: "[39]"}]] }] },
      { line: 13, text: "r=1 >= 1, c=0 < 1. Cadranul 3 (Stânga-Jos). Sărim peste 2 cadrane (2 * 1 = 2). Coordonate: r=1-1=0, c=0.", blocksVisual: [{ label: "Salt +2", groups: [[{val: "+2 elemente", sorted: true}]] }] },
      { line: 13, text: "Adunăm cele 2 elemente. Totalul este 32 + 4 + 2 = 38. Apel recursiv cu n=1, r=0, c=0.", blocksVisual: [{ label: "Total = 36 + 2", groups: [[{val: "38"}]] }] },
      { line: 6, text: "Baza recursivității: n=1. Returnăm 0.", blocksVisual: [{ label: "Baza", groups: [[{val: "0"}]] }] },
      { line: 23, text: "Răspunsul final este 38! Fără să generăm restul de 63 de numere.", blocksVisual: [{ label: "Rezultat", groups: [[{val: "Valoare = 38", sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Z-Parcurgere Info", url: "https://www.pbinfo.ro/probleme/1149/z", desc: "Clasica pbinfo" }
      ],
      medium: [
        { title: "Z-Parcurgere", url: "https://www.infoarena.ro/problema/z", desc: "Z Parcurgere pe Infoarena" },
        { title: "Quad Tree", url: "https://leetcode.com/problems/construct-quad-tree/", desc: "Constructie Arbore Z" }
      ],
      hard: [
        { title: "Căutare în QuadTree", url: "https://www.pbinfo.ro/probleme/2951/quadtree", desc: "Grafică avansată" }
      ]
    }
  }
,

  "Alg/Backtracking": {
    presentation: "Backtracking-ul este o metodă generală de a găsi toate (sau unele) soluții pentru probleme de calcul, în special probleme de satisfacere a constrângerilor.\n\nAlgoritmul explorează treptat spațiul de căutare (care adesea ia forma unui arbore). La fiecare pas, algoritmul încearcă să adauge un element la o soluție parțială. Dacă soluția parțială poate duce la o soluție validă, continuă. Altfel, se 'întoarce' (backtracks) și încearcă o altă opțiune.",
    complexity: "Timp: Frecvent exponențial $O(2^N)$ sau factorial $O(N!)$, depinzând de ramificarea arborelui de decizie. Deși ineficient pentru $N$ mari, de multe ori este singura soluție exactă pentru probleme NP-Complete.\nSpațiu: $O(N)$ pentru stiva de apeluri recursiv, unde N este adâncimea maximă a arborelui.",
    variations: "1. Branch and Bound: O optimizare în care păstrăm evidența celei mai bune soluții găsite până acum și abandonăm ramurile care nu o pot îmbunătăți.\n2. Memoization / DP: Dacă subproblemele se suprapun (ceea ce nu e mereu cazul în Backtracking), putem salva rezultatele.",
    applications: "Backtracking este folosit extensiv la generarea de permutări, combinări, rezolvarea de puzzle-uri precum Sudoku sau N-Regine, și în AI pentru parcurgerea spațiului de stări.",
    code: `#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int N = 4;
vector<int> col; // col[i] = coloana in care se afla regina pe linia i

bool isValid(int r, int c) {
    for (int i = 0; i < r; i++) {
        // Daca e pe aceeasi coloana sau diagonala
        if (col[i] == c || abs(i - r) == abs(col[i] - c)) {
            return false;
        }
    }
    return true;
}

void solve(int row) {
    if (row == N) {
        cout << "Solutie gasita!\n";
        return;
    }
    
    for (int c = 0; c < N; c++) {
        if (isValid(row, c)) {
            col[row] = c;       // Plasare regina
            solve(row + 1);     // Explorare mai departe
            // col[row] se va suprascrie la urmatoarea iteratie (Backtrack)
        }
    }
}`,
    explanations: [
      { line: 20, text: "Începem căutarea pe prima linie (row = 0) pentru un tablou de 4x4.", blocksVisual: [{ label: "Stare curentă", groups: [[{val: "Row: 0"}]] }] },
      { line: 26, text: "Încercăm plasarea reginei pe prima coloană (c = 0).", blocksVisual: [{ label: "Linia 0", groups: [[{val: "R0, C0", active: true}]] }] },
      { line: 10, text: "Verificăm dacă e valid. Cum tabla e goală, e mereu valid pe R0.", blocksVisual: [{ label: "Validare", groups: [[{val: "Valid!"}]] }] },
      { line: 28, text: "Plasăm regina la (0, 0). Apelăm recursiv pentru linia 1.", blocksVisual: [{ label: "Plasează R0", groups: [[{val: "Q la (0,0)", sorted: true}]] }] },
      { line: 26, text: "Pentru linia 1, încercăm c=0, c=1. Ambele sunt atacate de (0,0). La c=2 este valid.", blocksVisual: [{ label: "Linia 1", groups: [[{val: "C=0: Atacat", hidden: true}, {val: "C=1: Atacat", hidden: true}, {val: "C=2: Valid", active: true}]] }] },
      { line: 28, text: "Plasăm regina la (1, 2). Mergem la linia 2.", blocksVisual: [{ label: "Plasează R1", groups: [[{val: "Q la (1,2)", sorted: true}]] }] },
      { line: 26, text: "Pentru linia 2, TOATE coloanele (0, 1, 2, 3) sunt atacate de (0,0) și (1,2).", blocksVisual: [{ label: "Linia 2", groups: [[{val: "C=0: X"}, {val: "C=1: X"}, {val: "C=2: X"}, {val: "C=3: X"}]] }] },
      { line: 31, text: "Ieșim din for pe linia 2. Backtrack! Ne întoarcem la linia 1 și încercăm următoarea coloană (c=3).", blocksVisual: [{ label: "Backtrack L2->L1", groups: [[{val: "Înapoi la R1", active: true}]] }] },
      { line: 28, text: "Plasăm regina la (1, 3). Mergem iar la linia 2.", blocksVisual: [{ label: "Plasează R1 (nou)", groups: [[{val: "Q la (1,3)", sorted: true}]] }] },
      { line: 26, text: "La linia 2, acum c=1 este valid.", blocksVisual: [{ label: "Linia 2", groups: [[{val: "C=1: Valid", active: true}]] }] },
      { line: 28, text: "Plasăm regina la (2, 1). Mergem la linia 3.", blocksVisual: [{ label: "Plasează R2", groups: [[{val: "Q la (2,1)", sorted: true}]] }] },
      { line: 26, text: "La linia 3, c=0, 1, 2, 3 sunt verificate. C=0, C=1, C=2 atacate. C=3 atacat de R1.", blocksVisual: [{ label: "Linia 3", groups: [[{val: "Toate atacate!"}]] }] },
      { line: 31, text: "Backtrack L3->L2! Și tot așa până descoperim soluția: (0,1), (1,3), (2,0), (3,2).", blocksVisual: [{ label: "Soluție finală", groups: [[{val: "(0,1)"}, {val: "(1,3)"}, {val: "(2,0)"}, {val: "(3,2)"}]] }] }
    ],
    problems: {
      easy: [
        { title: "Permutari", url: "https://www.pbinfo.ro/probleme/123/permutari", desc: "Generare permutari N" }
      ],
      medium: [
        { title: "N-Queens", url: "https://leetcode.com/problems/n-queens/", desc: "Clasica problema cu Regine" }
      ],
      hard: [
        { title: "Sudoku Solver", url: "https://leetcode.com/problems/sudoku-solver/", desc: "Backtracking pe grila" }
      ]
    }
  },

  "Alg/Greedy": {
    presentation: "Algoritmii Greedy construiesc o soluție pas cu pas, alegând mereu opțiunea care pare a fi cea mai bună în momentul curent (alegerea local optimă), în speranța că aceasta va conduce la soluția globală optimă.\n\nPentru ca un algoritm Greedy să funcționeze, problema trebuie să aibă două proprietăți:\n1. Proprietatea alegerii Greedy: Putem ajunge la soluția optimă prin alegeri locale.\n2. Substructură optimă: Soluția optimă a problemei conține soluțiile optime ale subproblemelor.",
    complexity: "Timp: Majoritatea algoritmilor Greedy necesită o sortare inițială a datelor, deci $O(N \\log N)$. Parcurgerea propriu-zisă e adesea $O(N)$.\nSpațiu: $O(1)$ sau $O(N)$ în funcție de nevoia stocării rezultatului.",
    variations: "1. Interval Scheduling: Selectarea numărului maxim de activități care nu se suprapun.\n2. Huffman Coding: Crearea de arbori de compresie optimi.\n3. Fractional Knapsack: Spre deosebire de 0/1 Knapsack (unde e nevoie de DP), varianta fracționară se rezolvă optim cu Greedy.",
    applications: "Greedy este des folosit în rutare (Dijkstra), generarea arborilor de acoperire minimă (Kruskal, Prim), compresia datelor și planificarea activităților (Scheduling).",
    code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Activity {
    int start, finish;
};

// Sortam activitatile dupa timpul de terminare (crescator)
bool cmp(Activity s1, Activity s2) {
    return (s1.finish < s2.finish);
}

void printMaxActivities(vector<Activity>& arr) {
    sort(arr.begin(), arr.end(), cmp);

    cout << "Activitati selectate: ";
    int i = 0;
    cout << "(" << arr[i].start << ", " << arr[i].finish << "), ";

    for (int j = 1; j < arr.size(); j++) {
        // Daca activitatea j incepe dupa ce s-a terminat i
        if (arr[j].start >= arr[i].finish) {
            cout << "(" << arr[j].start << ", " << arr[j].finish << "), ";
            i = j;
        }
    }
}`,
    explanations: [
      { line: 16, text: "Avem un vector de activități (Start, Finish).", blocksVisual: [{ label: "Input", groups: [[{val: "A1: (1, 4)"}, {val: "A2: (3, 5)"}, {val: "A3: (0, 6)"}, {val: "A4: (5, 7)"}, {val: "A5: (8, 9)"}]] }] },
      { line: 17, text: "Sortăm activitățile crescător după timpul de TERMINARE.", blocksVisual: [{ label: "Sortare dupa Finish", groups: [[{val: "(1, 4)", active: true}, {val: "(3, 5)"}, {val: "(0, 6)"}, {val: "(5, 7)"}, {val: "(8, 9)"}]] }] },
      { line: 20, text: "Alegem mereu prima activitate (cea care se termină cel mai devreme), lăsând astfel cel mai mult timp pentru restul.", blocksVisual: [{ label: "Selecție #1", groups: [[{val: "(1, 4)", sorted: true}]] }] },
      { line: 24, text: "Parcurgem restul activităților.", blocksVisual: [{ label: "Iterare", groups: [[{val: "(3, 5)", active: true}, {val: "(0, 6)"}, {val: "(5, 7)"}, {val: "(8, 9)"}]] }] },
      { line: 26, text: "(3, 5) începe la 3, dar activitatea curentă s-a terminat la 4. Suprapunere! O ignorăm.", blocksVisual: [{ label: "Respins", groups: [[{val: "(3, 5) X", hidden: true}]] }] },
      { line: 26, text: "(0, 6) începe la 0, s-a terminat la 4. Suprapunere! Ignorăm.", blocksVisual: [{ label: "Respins", groups: [[{val: "(0, 6) X", hidden: true}]] }] },
      { line: 26, text: "(5, 7) începe la 5 >= 4. E compatibilă! O selectăm și actualizăm timpul curent de terminare la 7.", blocksVisual: [{ label: "Selecție #2", groups: [[{val: "(5, 7)", sorted: true}]] }] },
      { line: 26, text: "(8, 9) începe la 8 >= 7. E compatibilă! O selectăm.", blocksVisual: [{ label: "Selecție #3", groups: [[{val: "(8, 9)", sorted: true}]] }] },
      { line: 31, text: "Am găsit numărul maxim de activități: 3.", blocksVisual: [{ label: "Rezultat", groups: [[{val: "(1, 4)"}, {val: "(5, 7)"}, {val: "(8, 9)"}]] }] }
    ],
    problems: {
      easy: [
        { title: "Spectacole", url: "https://www.pbinfo.ro/probleme/344/spectacole", desc: "Problema planificarii clasice" }
      ],
      medium: [
        { title: "Jump Game", url: "https://leetcode.com/problems/jump-game/", desc: "Aflare distanta maxima Greedy" }
      ],
      hard: [
        { title: "Minimum Number of Refueling Stops", url: "https://leetcode.com/problems/minimum-number-of-refueling-stops/", desc: "Greedy combinat cu Heap-uri" }
      ]
    }
  },

  "Alg/Meet_in_the_Middle": {
    presentation: "Meet in the Middle este o tehnică inteligentă folosită atunci când complexitatea exponențială a problemei este un pic prea mare (ex: $O(2^N)$ pentru $N=40$).\n\nIdeea este să împărțim datele de intrare în două jumătăți aproximativ egale ($N/2$). Generăm toate soluțiile posibile independent pentru stânga și pentru dreapta. Aceasta durează $O(2^{N/2}) + O(2^{N/2})$, care e MULT mai mic decât $O(2^N)$.\n\nApoi, combinăm ('ne întâlnim la mijloc') soluțiile celor două jumătăți într-un mod eficient, de regulă sortând o jumătate și făcând Căutare Binară sau folosind Two Pointers pe ea pentru fiecare element din a doua jumătate.",
    complexity: "Timp: Reducere de la $O(2^N)$ la $O(2^{N/2} \\cdot N)$ datorită combinării.\nSpațiu: $O(2^{N/2})$ pentru a stoca soluțiile unei jumătăți în memorie.",
    variations: "1. Subset Sum: Aflarea dacă există o submulțime cu o anumită sumă.\n2. 4-SUM: Reducerea de la $O(N^4)$ la $O(N^2 \\log N)$ prin același principiu, doar că împărțim în perechi în loc de jumătăți de array.",
    applications: "Folosit în criptografie (atacuri asupra 2DES - Double DES), unde împărțirea spațiului cheilor la jumătate face atacul fezabil.",
    code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Functie auxiliara pentru a genera toate sumele de submultimi
void getSubsetSums(const vector<long long>& arr, int start, int end, vector<long long>& res) {
    int n = end - start;
    // Iteram prin toate cele 2^n submultimi posibile folosind biti
    for (int i = 0; i < (1 << n); i++) {
        long long sum = 0;
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) {
                sum += arr[start + j];
            }
        }
        res.push_back(sum);
    }
}

long long maxSubsetSumLessThanS(vector<long long>& a, long long S) {
    int n = a.size();
    vector<long long> left, right;
    
    // Impartim vectorul in 2 jumatati
    getSubsetSums(a, 0, n / 2, left);
    getSubsetSums(a, n / 2, n, right);
    
    // Sortam jumatatea dreapta
    sort(right.begin(), right.end());
    
    long long max_sum = 0;
    
    // Pentru fiecare suma din stanga, gasim cel mai bun complement din dreapta
    for (int i = 0; i < left.size(); i++) {
        if (left[i] <= S) {
            // Cautare binara in 'right'
            auto it = upper_bound(right.begin(), right.end(), S - left[i]);
            if (it != right.begin()) {
                max_sum = max(max_sum, left[i] + *(--it));
            }
        }
    }
    return max_sum;
}`,
    explanations: [
      { line: 24, text: "Presupunem un vector de 40 elemente. Generarea tuturor celor 2^40 sume e imposibilă. Îl tăiem în 2 jumătăți de câte 20.", blocksVisual: [{ label: "Împărțire", groups: [[{val: "A[0..19]"}], [{val: "A[20..39]"}]] }] },
      { line: 27, text: "Generăm toate sumele posibile pentru prima jumătate. Există 2^20 (aprox 1 milion) sume. Le stocăm în 'left'.", blocksVisual: [{ label: "Sume Stânga", groups: [[{val: "2^20 elemente", active: true}]] }] },
      { line: 28, text: "Generăm sumele și pentru a doua jumătate. Le stocăm în 'right'.", blocksVisual: [{ label: "Sume Dreapta", groups: [[{val: "2^20 elemente", active: true}]] }] },
      { line: 31, text: "Sortăm vectorul 'right' ca să putem căuta binar în el. Durează $O(2^{N/2} \\log(2^{N/2}))$.", blocksVisual: [{ label: "Sortare Right", groups: [[{val: "Sorted Right", sorted: true}]] }] },
      { line: 36, text: "Parcurgem fiecare sumă L din 'left'. Vrem ca (L + R <= S), deci vrem un R maxim cu condiția R <= S - L.", blocksVisual: [{ label: "Iterare pe Left", groups: [[{val: "L curent", active: true}]] }] },
      { line: 39, text: "Folosim 'upper_bound' (căutare binară) în 'right' pentru valoarea (S - L). Aceasta găsește rapid cel mai mare R.", blocksVisual: [{ label: "Căutare Binară", groups: [[{val: "Găsim R", sorted: true}]] }] },
      { line: 41, text: "Actualizăm suma maximă găsită până acum cu L + R. Continuăm până verificăm tot.", blocksVisual: [{ label: "Actualizare", groups: [[{val: "Max = L + R"}]] }] },
      { line: 46, text: "A durat de un milion de ori mai puțin decât o rezolvare backtraking standard!", blocksVisual: [{ label: "Victorie!", groups: [[{val: "Done", sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "4Sum", url: "https://leetcode.com/problems/4sum/", desc: "Clasica O(N^2)" }
      ],
      medium: [
        { title: "Subset Sum", url: "https://www.spoj.com/problems/SUBSUMS/", desc: "O(2^{N/2}) pe bune" }
      ],
      hard: [
        { title: "Closest Subsequence Sum", url: "https://leetcode.com/problems/closest-subsequence-sum/", desc: "Meet in the Middle pe Leetcode" }
      ]
    }
  },

  "Alg/Square_Root_Decomp": {
    presentation: "Descompunerea în radical (Square Root Decomposition) este o tehnică foarte flexibilă pentru a rezolva eficient probleme de interogări pe intervale (Range Queries).\n\nÎn loc să răspundem la interogări în $O(N)$ (naiv) sau $O(\\log N)$ cu Arbori de Intervale care sunt complex de implementat, SQRT Decomposition oferă o soluție elegantă de compromis $O(\\sqrt{N})$:\nÎmpărțim vectorul de $N$ elemente în bucăți (blocuri) de dimensiune $\\sqrt{N}$. Precalculăm răspunsul (suma, minimul, max) pentru fiecare bloc.\n\nCând vine o interogare pe un interval [L, R], acest interval va acoperi complet o serie de blocuri intermediare, și parțial cel mult două blocuri (la margini). Sumăm răspunsurile precalculate ale blocurilor complet acoperite, și iterăm element cu element pentru capetele parțiale.",
    complexity: "Timp: Creare/Precalculare: $O(N)$. Interogare: $O(\\sqrt{N})$ deoarece parcurgem cel mult $\\sqrt{N}$ elemente individuale la capete și cel mult $\\sqrt{N}$ blocuri întregi pe mijloc.\nSpațiu: $O(\\sqrt{N})$ pentru a reține răspunsul pe blocuri.",
    variations: "1. Point Update: Actualizarea unei valori necesită doar actualizarea blocului din care face parte în $O(1)$.\n2. Range Update: Se pot folosi 'lazy tags' pe blocuri întregi, similar segment trees.",
    applications: "Orice fel de Range Queries pe care nu știm sau ne e greu să le modelăm cu Segment Trees. Unele funcții care nu sunt asociative (ex: Mode / Culoare dominantă) pot fi rezolvate mult mai ușor cu blocuri.",
    code: `#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int blockSize;
vector<int> b; // vectorul de blocuri

void preprocess(const vector<int>& input) {
    int n = input.size();
    blockSize = sqrt(n);
    // rotunjire in sus pentru ultimul bloc
    b.assign((n + blockSize - 1) / blockSize, 0); 
    
    for (int i = 0; i < n; i++) {
        b[i / blockSize] += input[i];
    }
}

// Update la pozitia 'idx' cu valoarea 'val' (adaugare)
void update(vector<int>& input, int idx, int val) {
    int blockNumber = idx / blockSize;
    b[blockNumber] += val - input[idx];
    input[idx] = val;
}

// Query pe intervalul [l, r]
int query(const vector<int>& input, int l, int r) {
    int sum = 0;
    int c_l = l / blockSize;
    int c_r = r / blockSize;
    
    if (c_l == c_r) {
        // Cazul in care intervalul e pe un singur bloc
        for (int i = l; i <= r; i++) sum += input[i];
    } else {
        // Capatul stang (partial)
        for (int i = l, end = (c_l + 1) * blockSize - 1; i <= end; i++) sum += input[i];
        
        // Blocurile intermediare complete
        for (int i = c_l + 1; i <= c_r - 1; i++) sum += b[i];
        
        // Capatul drept (partial)
        for (int i = c_r * blockSize; i <= r; i++) sum += input[i];
    }
    return sum;
}`,
    explanations: [
      { line: 11, text: "Avem N = 9 elemente. Dimensiunea blocului va fi sqrt(9) = 3.", blocksVisual: [{ label: "Input", groups: [[{val: "2"}, {val: "1"}, {val: "3"}, {val: "4"}, {val: "5"}, {val: "8"}, {val: "9"}, {val: "2"}, {val: "0"}]] }] },
      { line: 16, text: "Precalculăm sumele. Bloc 0 va avea suma primelor 3 elemente, Bloc 1 suma următoarelor 3, etc.", blocksVisual: [{ label: "Blocuri", groups: [[{val: "B0: 6", active: true}], [{val: "B1: 17", active: true}], [{val: "B2: 11", active: true}]] }] },
      { line: 31, text: "Vine un Query de Sumă pe [1, 7]. Acoperă parțial B0, B1 total, și parțial B2.", blocksVisual: [{ label: "Query", groups: [[{val: "L=1"}], [{val: "R=7"}]] }] },
      { line: 39, text: "Capatul stâng (L=1). Face parte din B0 (care are indecșii 0..2). Parcurgem de la index 1 la marginea blocului 2. Adunăm input[1] + input[2].", blocksVisual: [{ label: "Left partial", groups: [[{val: "A[1]=1", active: true}, {val: "A[2]=3", active: true}]] }] },
      { line: 42, text: "Partea din mijloc. B1 este complet inclus in interval! Nu iterăm prin 3 elemente, ci doar luăm B1 direct (Suma 17).", blocksVisual: [{ label: "Middle block", groups: [[{val: "B1 = 17", sorted: true}]] }] },
      { line: 45, text: "Capatul drept (R=7). Face parte din B2 (indecși 6..8). Iterăm de la începutul blocului (index 6) până la R=7. Adunăm input[6] + input[7].", blocksVisual: [{ label: "Right partial", groups: [[{val: "A[6]=9", active: true}, {val: "A[7]=2", active: true}]] }] },
      { line: 47, text: "Suma = 4 (stânga) + 17 (mijloc) + 11 (dreapta) = 32.", blocksVisual: [{ label: "Rezultat", groups: [[{val: "Suma = 32", sorted: true}]] }] },
      { line: 23, text: "Dacă facem Update la index 4 cu +2, adăugăm 2 pur și simplu în B1. Blocul e mereu corect. O(1) timp!", blocksVisual: [{ label: "Update", groups: [[{val: "B1 devine 19"}]] }] }
    ],
    problems: {
      easy: [
        { title: "Range Sum Query", url: "https://leetcode.com/problems/range-sum-query-mutable/", desc: "Clasica RSQ" }
      ],
      medium: [
        { title: "Arbori de intervale", url: "https://www.pbinfo.ro/probleme/2096/arbori-de-intervale", desc: "Se pot face cu Sqrt!" }
      ],
      hard: [
        { title: "Holes", url: "https://codeforces.com/contest/13/problem/E", desc: "Sarături din bloc în bloc pe CF" }
      ]
    }
  },

  "Alg/Mo_Algorithm": {
    presentation: "Algoritmul lui Mo (Mo's Algorithm) este o extindere strălucită a Descompunerii în Radical, aplicabilă problemelor Offline (unde poți citi toate interogările înainte de a răspunde la ele).\n\nIdeea e simplă: dacă avem un interval curent [L, R] pentru care știm răspunsul, și vrem răspunsul pentru [L+1, R], e de ajuns să 'scoatem' elementul de la poziția L din structura curentă. Daca vrem [L, R+1], 'adăugăm' R+1. Practic, mutăm pointerii L și R element cu element până ajung la L și R cerut de interogare.\n\nSecretul algoritmului lui Mo constă în SORTAREA inteligentă a acestor interogări: grupăm interogările după blocul din care face parte L. În interiorul aceluiași bloc, sortăm după R.",
    complexity: "Timp: $O((N + Q) \\sqrt{N})$, unde N e numărul de elemente și Q numărul de interogări. Prin metoda sa de sortare, garantează că pointerul R se mută maxim $O(N)$ per bloc, adică $O(N \\sqrt{N})$ global. Iar pointerul L se mișcă doar in limita blocului său de $\\sqrt{N}$ ori pentru fiecare din cele Q query-uri.\nSpațiu: $O(N + Q)$ pentru date și stocarea interogărilor.",
    variations: "1. Mo's on Trees: Transformarea interogărilor pe drumuri din arbori în interogări de interval folosind Euler Tour (Căutare DFS).\n2. Mo's with Updates: A treia dimensiune este 'timpul' t. Se sortează după bloc(L), bloc(R) și t.",
    applications: "Dacă într-o problemă trebuie să găsești 'Numărul de elemente distincte' într-un interval, sau frecvența frecvențelor, și problema nu cere update-uri pe parcurs (sau e offline), Algoritmul lui Mo o rezolvă extrem de facil, comparativ cu Persistent Segment Trees.",
    code: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

int blockSize;

struct Query {
    int L, R, id;
};

// Logica magistrala a algoritmului lui Mo
bool compareQueries(Query q1, Query q2) {
    int block1 = q1.L / blockSize;
    int block2 = q2.L / blockSize;
    
    if (block1 != block2)
        return block1 < block2;
        
    // Daca L cade in acelasi bloc, sortam dupa R
    // O optimizare: Daca blocul e par R urca, daca e impar R coboara.
    return (block1 % 2 == 1) ? q1.R < q2.R : q1.R > q2.R;
}

int current_answer = 0;
int freq[1000005];

void add(int x) {
    freq[x]++;
    if (freq[x] == 1) current_answer++;
}

void remove(int x) {
    freq[x]--;
    if (freq[x] == 0) current_answer--;
}

vector<int> solveMo(vector<int>& arr, vector<Query>& queries) {
    blockSize = sqrt(arr.size());
    sort(queries.begin(), queries.end(), compareQueries);
    
    vector<int> ans(queries.size());
    
    // Pointerii initiali
    int currL = 0, currR = -1;
    
    for (Query q : queries) {
        // Mutam pointerul L spre stanga (adaugam)
        while (currL > q.L) { currL--; add(arr[currL]); }
        // Mutam pointerul R spre dreapta (adaugam)
        while (currR < q.R) { currR++; add(arr[currR]); }
        // Mutam pointerul L spre dreapta (stergem)
        while (currL < q.L) { remove(arr[currL]); currL++; }
        // Mutam pointerul R spre stanga (stergem)
        while (currR > q.R) { remove(arr[currR]); currR--; }
        
        ans[q.id] = current_answer;
    }
    return ans;
}`,
    explanations: [
      { line: 15, text: "Definim cum sortăm interogările (Queries). Eleganța este că, datorită acestei ordonări, parcurgerile lui currL și currR vor fi reduse masiv.", blocksVisual: [{ label: "Sortarea lui Mo", groups: [[{val: "Sort dupa Block(L)"}, {val: "Sort dupa R"}]] }] },
      { line: 43, text: "Sortăm vectorul de interogări conform funcției compareQueries. Amintiți-vă că este un algoritm OFFLINE (știm tot la început).", blocksVisual: [{ label: "Sortate Offline", groups: [[{val: "Q1, Q2, ..., Qn"}]] }] },
      { line: 48, text: "Setăm pointerii inițiali currL și currR care definesc o 'fereastră' de acoperire. Acum ea este goală.", blocksVisual: [{ label: "Pointeri Init", groups: [[{val: "currL = 0"}, {val: "currR = -1"}]] }] },
      { line: 52, text: "Primim un prim Query (ex: L=2, R=5). Deoarece currR este -1, bucla 'while(currR < q.R)' rulează și extinde fereastra la dreapta.", blocksVisual: [{ label: "Extinde R", groups: [[{val: "Add arr[0]"}, {val: "Add arr[1]"}, {val: "..."}]] }] },
      { line: 31, text: "Funcția add() se asigură că atunci când un element apare prima dată (freq[x]==1), creștem contorul elementelor distincte.", blocksVisual: [{ label: "Add", groups: [[{val: "+ distinct", active: true}]] }] },
      { line: 56, text: "Acum că currR a ajuns la 5, aducem currL la 2 prin bucla 'while(currL < q.L)'. Funcția remove() șterge elementele lăsate în urmă.", blocksVisual: [{ label: "Restrânge L", groups: [[{val: "Remove arr[0]"}, {val: "Remove arr[1]"}]] }] },
      { line: 36, text: "Funcția remove() scade frecvența. Dacă a ajuns la 0, scade contorul elementelor distincte.", blocksVisual: [{ label: "Remove", groups: [[{val: "- distinct", active: true}]] }] },
      { line: 60, text: "Răspunsul la acest moment e corect stocat în 'current_answer'. Îl salvăm pe poziția Q.id din vectorul rezultat.", blocksVisual: [{ label: "Salvare rezultat", groups: [[{val: "Ans[id] = ans", sorted: true}]] }] },
      { line: 50, text: "Următorul Query (ex: L=3, R=6). currL avansează un pas (scoate elem), currR avansează un pas (adaugă elem). Datorită sortării lui Mo, numărul de mișcări este garantat matematic a fi sub O(N sqrt N) per total!", blocksVisual: [{ label: "Următorul Q", groups: [[{val: "L++"}, {val: "R++"}]] }] }
    ],
    problems: {
      easy: [
        { title: "Distinct Elements Query", url: "https://www.spoj.com/problems/DQUERY/", desc: "DQUERY pe Spoj e baza" }
      ],
      medium: [
        { title: "Powerful Array", url: "https://codeforces.com/problemset/problem/86/D", desc: "Problema perfecta pe Codeforces" }
      ],
      hard: [
        { title: "Tree Queries", url: "https://codeforces.com/problemset/problem/375/D", desc: "Mo's on Trees" }
      ]
    }
    }
  ,"Strings": {
    presentation: "Procesarea șirurilor de caractere (String Processing) este un domeniu esențial în programare, ocupându-se cu manipularea, căutarea și analiza textului.\n\nÎn C++, un `std::string` este o clasă din Standard Template Library (STL) care gestionează automat alocarea memoriei pentru caractere. Oferă funcții extrem de puternice, precum `substr` (pentru a extrage părți dintr-un șir), `find` (pentru a căuta un subșir) sau `append`.\n\nÎnțelegerea modului în care funcționează șirurile este primul pas către rezolvarea problemelor avansate, cum ar fi căutarea de tipare, parsarea, criptografia și compresia datelor.",
    complexity: "Timp: Operațiile de bază pe șiruri pot părea rapide, dar ascund adesea un cost ascuns. Concatenarea `s += 'a'` este amortizat O(1), dar inserarea la început `s.insert(0, \"a\")` este O(N). Funcția `find` folosește în C++ standard o abordare destul de eficientă, dar în cel mai rău caz (naiv) poate lua O(N * M).\nSpațiu: O(N) pentru a stoca șirul, plus potențiala memorie extra necesară pentru concatenări.",
    variations: "1. String Hashing (Rabin-Karp): Reprezintă transformarea unui șir într-un număr (hash) pentru a compara două șiruri de lungime N în O(1) (după o preprocesare O(N)).\n2. Căutare Naivă: Compararea a două șiruri de la fiecare poziție posibilă.\n3. Parsare: Extragerea de token-uri dintr-un text (de ex. folosind `stringstream` sau `strtok`).",
    applications: "Aproape orice interacțiune cu un utilizator implică șiruri de caractere: căutările pe Google, parsarea de fișiere JSON, editoarele de text și sistemele de recomandare. Cunoașterea detaliată a manipulării lor previne probleme grave de performanță (precum faimosul 'accident' de O(N^2) din GTA Online la parsarea unui fișier JSON masiv).",
    code: `#include <iostream>
#include <string>

using namespace std;

int main() {
    string text = "algoritmica";
    string pattern = "ritm";
    
    // Căutarea unui subșir
    size_t pos = text.find(pattern);
    if (pos != string::npos) {
        cout << "Am găsit '" << pattern << "' la indexul " << pos << "\\n";
    }
    
    // Extragerea unui substring
    string sub = text.substr(pos, 4);
    cout << "Substring extras: " << sub << "\\n";
    
    // Modificarea șirului
    text.replace(pos, 4, "bra");
    cout << "După înlocuire: " << text << "\\n";
    
    return 0;
}`,
    explanations: [
      { line: 7, text: "Inițializăm șirul de bază 'text' și modelul pe care vrem să-l căutăm 'pattern'.", blocksVisual: [{ label: "Text", groups: [[{val: "a"}, {val: "l"}, {val: "g"}, {val: "o"}, {val: "r"}, {val: "i"}, {val: "t"}, {val: "m"}, {val: "i"}, {val: "c"}, {val: "a"}]] }, { label: "Pattern", groups: [[{val: "r"}, {val: "i"}, {val: "t"}, {val: "m"}]] }] },
      { line: 11, text: "Folosim funcția 'find' pentru a căuta 'ritm'. Aceasta returnează indexul de început al primei apariții. Intern, C++ caută potriviri succesive.", blocksVisual: [{ label: "Căutare 'find'", groups: [[{val: "a"}, {val: "l"}, {val: "g"}, {val: "o"}, {val: "r", active: true}, {val: "i", active: true}, {val: "t", active: true}, {val: "m", active: true}, {val: "i"}, {val: "c"}, {val: "a"}]] }] },
      { line: 13, text: "'string::npos' este o constantă specială care înseamnă 'nu a fost găsit'. Aici, condiția e adevărată, deci am găsit la indexul 4." },
      { line: 17, text: "Folosim 'substr(index, lungime)' pentru a extrage 4 caractere începând de la indexul 4. Obținem din nou 'ritm'.", blocksVisual: [{ label: "Extragere 'substr'", groups: [[{val: "r", sorted: true}, {val: "i", sorted: true}, {val: "t", sorted: true}, {val: "m", sorted: true}]] }] },
      { line: 21, text: "Folosim 'replace(index, lungime, noul_string)'. Înlocuim cele 4 caractere ('ritm') cu 'bra'. Rezultatul final va fi 'algebra'.", blocksVisual: [{ label: "Înlocuire", groups: [[{val: "a"}, {val: "l"}, {val: "g"}, {val: "e"}, {val: "b", active: true}, {val: "r", active: true}, {val: "a", active: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Defanging an IP Address", url: "https://leetcode.com/problems/defanging-an-ip-address/", desc: "Înlocuire caractere" },
        { title: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome/", desc: "Doi pointeri pe șiruri" }
      ],
      medium: [
        { title: "Longest Substring Without Repeating", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", desc: "Sliding window" },
        { title: "String to Integer (atoi)", url: "https://leetcode.com/problems/string-to-integer-atoi/", desc: "Parsare masivă" }
      ],
      hard: [
        { title: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/", desc: "Căutare avansată în fereastră" },
        { title: "Text Justification", url: "https://leetcode.com/problems/text-justification/", desc: "Formatare de text complexă" }
      ]
    }
  },
  "Strings/Trie": {
    presentation: "Un Trie (sau Arbore de Prefixe) este o structură de date arborescentă, extrem de eficientă pentru stocarea și căutarea unui dicționar mare de cuvinte.\n\nFiecare nod din Trie reprezintă un caracter, iar un drum de la rădăcină (root) la o frunză formează un cuvânt. Avantajul masiv este că prefixele comune ale cuvintelor sunt stocate o singură dată (ex. 'car' și 'cat' vor împărți primele două noduri, 'c' și 'a'). Acest lucru economisește spațiu și reduce masiv numărul de comparații la căutare.",
    complexity: "Timp: O(L) pentru inserare și căutare, unde L este lungimea cuvântului. Timpul depinde DOAR de lungimea cuvântului, nu și de numărul de cuvinte din dicționar!\nSpațiu: O(N * L * Σ), unde N este numărul de cuvinte, L lungimea medie, iar Σ este dimensiunea alfabetului (ex. 26 pentru litere mici). Trie-ul poate consuma destul de multă memorie din cauza pointerilor liberi, dar există optimizări (ex. Radix Trie).",
    variations: "1. Trie pe Biți (Bitwise Trie): În loc de litere, muchiile sunt 0 și 1. Este folosit extrem de des pentru aflarea XOR-ului maxim între două numere dintr-un vector.\n2. Compressed Trie (Radix Tree): Muchiile pot avea șiruri întregi de caractere în loc de unul singur, dacă există un singur copil, economisind mult spațiu.",
    applications: "Trie-ul este la baza oricărui sistem de 'Auto-Complete' (completare automată) și a corectoarelor gramaticale (Spell Checker). De asemenea, este esențial pentru stocarea și căutarea rapidă în agende telefonice uriașe sau servere de rutare IP.",
    code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool isEndOfWord;
    
    TrieNode() {
        isEndOfWord = false;
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
    }
};

class Trie {
private:
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }
    
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (node->children[index] == nullptr) {
                node->children[index] = new TrieNode();
            }
            node = node->children[index];
        }
        node->isEndOfWord = true;
    }
    
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int index = c - 'a';
            if (node->children[index] == nullptr) return false;
            node = node->children[index];
        }
        return node->isEndOfWord;
    }
};

int main() {
    Trie t;
    t.insert("cat");
    t.insert("car");
    t.insert("do");
    
    cout << "Caut 'cat': " << (t.search("cat") ? "Gasit" : "Nu") << "\\n";
    cout << "Caut 'ca': " << (t.search("ca") ? "Gasit" : "Nu") << "\\n";
    return 0;
}`,
    explanations: [
      { line: 26, text: "Pentru a insera 'cat', pornim de la nodul Rădăcină (Root).", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "active"}], edges: [] } },
      { line: 30, text: "Verificăm prima literă: 'c'. Nodul Root nu are un copil 'c', așa că îl creăm.", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "visited"}, {id: 1, label: "c", x: 80, y: 100, state: "active"}], edges: [{source: 0, target: 1}] } },
      { line: 30, text: "Următoarea literă: 'a'. Creăm copilul 'a' pentru nodul 'c'.", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "visited"}, {id: 1, label: "c", x: 80, y: 100, state: "visited"}, {id: 2, label: "a", x: 80, y: 160, state: "active"}], edges: [{source: 0, target: 1}, {source: 1, target: 2}] } },
      { line: 30, text: "Ultima literă: 't'. Creăm copilul 't' pentru nodul 'a'.", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "visited"}, {id: 1, label: "c", x: 80, y: 100, state: "visited"}, {id: 2, label: "a", x: 80, y: 160, state: "visited"}, {id: 3, label: "t", x: 40, y: 220, state: "active"}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}] } },
      { line: 34, text: "Am terminat cuvântul. Marcăm nodul 't' ca fiind sfârșit de cuvânt (isEndOfWord = true).", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "visited"}, {id: 1, label: "c", x: 80, y: 100, state: "visited"}, {id: 2, label: "a", x: 80, y: 160, state: "visited"}, {id: 3, label: "t", x: 40, y: 220, state: "visited"}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}] } },
      { line: 50, text: "Acum inserăm 'car'. Root are deja copilul 'c', deci îl refolosim! Apoi 'c' are deja copilul 'a', deci refolosim! Pentru 'r', îl creăm din nodul 'a'. Aceasta este magia Trie-ului.", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "visited"}, {id: 1, label: "c", x: 80, y: 100, state: "visited"}, {id: 2, label: "a", x: 80, y: 160, state: "visited"}, {id: 3, label: "t", x: 40, y: 220, state: "visited"}, {id: 4, label: "r", x: 120, y: 220, state: "active"}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}, {source: 2, target: 4}] } },
      { line: 51, text: "Pentru 'do', Root nu are 'd', așa că creăm o ramură separată în dreapta.", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "visited"}, {id: 1, label: "c", x: 80, y: 100}, {id: 2, label: "a", x: 80, y: 160}, {id: 3, label: "t", x: 40, y: 220}, {id: 4, label: "r", x: 120, y: 220}, {id: 5, label: "d", x: 200, y: 100, state: "active"}, {id: 6, label: "o", x: 200, y: 160, state: "active"}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}, {source: 2, target: 4}, {source: 0, target: 5}, {source: 5, target: 6}] } },
      { line: 54, text: "Când căutăm 'ca', mergem Root -> c -> a. Dar nodul 'a' NU are flag-ul isEndOfWord activ, deci 'ca' e doar un prefix, nu un cuvânt complet! Returnăm false.", graphVisual: { nodes: [{id: 0, label: "Root", x: 140, y: 30, state: "active"}, {id: 1, label: "c", x: 80, y: 100, state: "active"}, {id: 2, label: "a", x: 80, y: 160, state: "active"}, {id: 3, label: "t", x: 40, y: 220}, {id: 4, label: "r", x: 120, y: 220}, {id: 5, label: "d", x: 200, y: 100}, {id: 6, label: "o", x: 200, y: 160}], edges: [{source: 0, target: 1}, {source: 1, target: 2}, {source: 2, target: 3}, {source: 2, target: 4}, {source: 0, target: 5}, {source: 5, target: 6}] } }
    ],
    problems: {
      easy: [
        { title: "Implement Trie", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", desc: "Implementarea clasică" }
      ],
      medium: [
        { title: "Maximum XOR of Two Numbers", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", desc: "Bitwise Trie pe Numere" },
        { title: "Replace Words", url: "https://leetcode.com/problems/replace-words/", desc: "Trie pentru Prefix matching" }
      ],
      hard: [
        { title: "Word Search II", url: "https://leetcode.com/problems/word-search-ii/", desc: "Trie + Backtracking (DFS) pe matrice" }
      ]
    }
  },
  "Strings/KMP": {
    presentation: "Algoritmul KMP (Knuth-Morris-Pratt) este probabil cel mai faimos algoritm eficient de potrivire a șirurilor (String Matching). Rezolvă problema găsirii tuturor aparițiilor unui model (pattern de lungime M) într-un text (de lungime N) în timp O(N + M).\n\nÎn abordarea naivă, când avem o nepotrivire (mismatch), ne întoarcem cu un caracter și reluăm toată verificarea (timp O(N * M)). KMP-ul spune: 'Dacă am greșit, de ce să uit tot ce am citit deja bun?'. Analizând în prealabil pattern-ul, construim un vector numit LPS sau PI array (Longest Proper Prefix which is also Suffix). Acest vector ne spune la fiecare pas: dacă mă blochez aici, cât de mult din prefixul meu este și sufix, ca să pot continua de acolo fără să mă întorc pe text!",
    complexity: "Timp: O(N + M) deoarece atât construirea PI array-ului cât și căutarea în sine nu duc pointerii pe text niciodată înapoi (pointerii cresc monoton).\nSpațiu: O(M) memorie auxiliară, necesară stocării PI array-ului de lungimea patternului.",
    variations: "1. Numărarea Aparițiilor (Z-Algorithm este o alternativă, dar PI Array e mai flexibil pentru suprapuneri).\n2. Găsirea celei mai scurte perioade a unui șir: PI array-ul, la ultima sa poziție, poate fi folosit pentru a afla dacă șirul este repetitiv (de ex. 'ababab').",
    applications: "Funcțiile de căutare avansată în editoarele de cod moderne și parsarea extrem de rapidă de fluxuri infinite (stream-uri) unde nu poți memora tot textul și nu te poți întoarce pe el.",
    code: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<int> computePi(string pat) {
    int m = pat.length();
    vector<int> pi(m, 0);
    int j = 0;
    
    for (int i = 1; i < m; i++) {
        while (j > 0 && pat[i] != pat[j]) {
            j = pi[j - 1]; // Fallback pe muchia de failure
        }
        if (pat[i] == pat[j]) {
            j++;
        }
        pi[i] = j;
    }
    return pi;
}

void kmpSearch(string pat, string txt) {
    vector<int> pi = computePi(pat);
    int n = txt.length();
    int m = pat.length();
    int j = 0;
    
    for (int i = 0; i < n; i++) {
        while (j > 0 && txt[i] != pat[j]) {
            j = pi[j - 1]; // Aici e inima KMP-ului
        }
        if (txt[i] == pat[j]) {
            j++;
        }
        if (j == m) {
            cout << "Gasit la index " << i - m + 1 << "\\n";
            j = pi[j - 1]; // Continuă pentru a găsi și alte potriviri
        }
    }
}

int main() {
    string txt = "ABABDABACDABABCABAB";
    string pat = "ABABCABAB";
    kmpSearch(pat, txt);
    return 0;
}`,
    explanations: [
      { line: 7, text: "Etapa de Preprocesare: Construim PI array-ul pentru pattern-ul 'ABABCABAB'. Ne spune cel mai lung prefix care este și sufix. De exemplu, pentru 'ABABCABAB', ultimul B (index 8) are sufixul 'ABAB' care e egal cu prefixul 'ABAB', deci pi[8] = 4.", blocksVisual: [{ label: "Pattern și PI Array", groups: [[{val: "A"}, {val: "B"}, {val: "A"}, {val: "B"}, {val: "C"}, {val: "A"}, {val: "B"}, {val: "A"}, {val: "B"}], [{val: "0"}, {val: "0"}, {val: "1"}, {val: "2"}, {val: "0"}, {val: "1"}, {val: "2"}, {val: "3"}, {val: "4"}]] }] },
      { line: 25, text: "Începem căutarea în text, având PI-ul gata. i e indexul pe text, j pe pattern.", blocksVisual: [{ label: "KMP Search (i=0..4, j=0..4)", groups: [[{val: "T: A B A B D ..."}], [{val: "P: A B A B C ..."}]] }] },
      { line: 31, text: "Găsim potrivire la primele 4 litere: 'ABAB' se potrivește cu 'ABAB'. Dar la i=4 în text e 'D', iar la j=4 în pattern e 'C'. Mismatch!", blocksVisual: [{ label: "Mismatch la C vs D", groups: [[{val: "A", sorted: true}, {val: "B", sorted: true}, {val: "A", sorted: true}, {val: "B", sorted: true}, {val: "D", active: true}], [{val: "A", sorted: true}, {val: "B", sorted: true}, {val: "A", sorted: true}, {val: "B", sorted: true}, {val: "C", active: true}]] }] },
      { line: 32, text: "În loc să ne întoarcem pe i în text la indexul 1 (cum ar face varianta naivă), KMP zice: M-am blocat la j=4. PI array pt j-1 (adică pi[3]) este 2. Știm că 'AB' este deja un prefix care s-a potrivit la capătul a ceea ce am citit. Deci mutăm j la 2!", blocksVisual: [{ label: "Shift inteligent (j = 2)", groups: [[{val: "A"}, {val: "B"}, {val: "A", sorted: true}, {val: "B", sorted: true}, {val: "D", active: true}], [{val: "-", hidden: true}, {val: "-", hidden: true}, {val: "A", sorted: true}, {val: "B", sorted: true}, {val: "A", active: true}]] }] },
      { line: 32, text: "Acum comparăm text[4] ('D') cu pattern[2] ('A'). Încă nu e bine. j=2, ne ducem la pi[1] care e 0. j devine 0.", blocksVisual: [{ label: "Nou shift", groups: [[{val: "A"}, {val: "B"}, {val: "A"}, {val: "B"}, {val: "D", active: true}], [{val: "-", hidden: true}, {val: "-", hidden: true}, {val: "-", hidden: true}, {val: "-", hidden: true}, {val: "A", active: true}]] }] },
      { line: 30, text: "i-ul pur și simplu continuă (i avansează, NICIODATĂ nu scade). Așa obținem O(N). Patternul este decalat constant pe baza informațiilor din PI array.", blocksVisual: [{ label: "Căutare mai departe", groups: [[{val: "KMP Rulez!"}]] }] }
    ],
    problems: {
      easy: [
        { title: "Find the Index of the First Occurrence", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", desc: "Problema KMP Standard" }
      ],
      medium: [
        { title: "Potrivire", url: "https://www.infoarena.ro/problema/strmatch", desc: "String Matching Infoarena" },
        { title: "Repeated Substring Pattern", url: "https://leetcode.com/problems/repeated-substring-pattern/", desc: "Găsirea perioadei (folosind Pi Array)" }
      ],
      hard: [
        { title: "Shortest Palindrome", url: "https://leetcode.com/problems/shortest-palindrome/", desc: "Construcție isteață cu KMP" }
      ]
    }
  },
  "Strings/Aho_Corasick": {
    presentation: "Aho-Corasick este algoritmul absolut pentru căutarea simultană a MULTIPLE pattern-uri (un dicționar) într-un singur text.\n\nGândește-te la o combinație strălucită între Trie (unde stocăm dicționarul de pattern-uri) și KMP (unde calculăm muchii de 'eșec' - failure links). Un Failure Link ne spune: 'dacă ai ajuns într-un nod pe Trie dar următoarea literă nu se potrivește, la ce alt nod din Trie trebuie să sari (cel mai lung prefix comun care se potrivește) ca să continui eficient?'.",
    complexity: "Timp: Preprocesarea dicționarului: O(Sumă lungimi pattern-uri). Căutarea în text: O(N + Z), unde N e lungimea textului, iar Z e numărul total de apariții ale tuturor cuvintelor din dicționar. Este extrem de rapid!\nSpațiu: O(Sumă lungimi pattern-uri * Σ) pentru Trie și vectorul de tranziții.",
    variations: "1. Aho-Corasick pe Automate Finit Deterministe (DFA): Calculăm direct un automat de tranziții, astfel încât la fiecare pas facem o sigură verificare, obținând O(N) garantat pe text, independent de mărimea dicționarului.\n2. Aho-Corasick DP: Combinat cu Programare Dinamică pentru a afla 'Câte parole de lungime L care nu conțin cuvinte interzise pot fi generate?'.",
    applications: "Aplicația clasică: Antivirus Scanner. Motoarele antivirus trebuie să caute milioane de 'semnături' (viruși) într-un fișier. Fac un Aho-Corasick pe viruși, și apoi trec fișierul suspect o singură dată (în streaming!) prin automat.",
    code: `// Implementarea Aho-Corasick e considerabilă ca mărime (necesită BFS pentru Failure Links).
// Conceptual:
// 1. Construim un Trie clasic cu toate cuvintele.
// 2. Parcurgem Trie-ul in lățime (BFS) pentru a calcula array-ul 'fail[node]'.
//    - fail[copil] = fiul corespunzător literei al nodului fail[părinte].
// 3. Parcurgem Textul. Dacă nu există fiul necesar, sărim la fail[node].
//    La fiecare pas mergem în sus pe link-urile 'dict_link' (ca să scoatem la iveală și 
//    aparițiile unor cuvinte scurte ascunse ca sufix în cuvintele lungi).

void buildAhoCorasick() {
    queue<int> q;
    for (int c = 0; c < 26; c++) {
        if (trie[0][c] != 0) {
            fail[trie[0][c]] = 0;
            q.push(trie[0][c]);
        }
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int c = 0; c < 26; c++) {
            if (trie[u][c]) {
                int f = fail[u];
                while (f > 0 && trie[f][c] == 0) f = fail[f];
                if (trie[f][c]) f = trie[f][c];
                fail[trie[u][c]] = f;
                q.push(trie[u][c]);
            }
        }
    }
}`,
    explanations: [
      { line: 7, text: "Aho-Corasick utilizează Failure Links care acționează ca Pi Array-ul din KMP pe un Arbore. Dacă cauți 'she' și apoi dai de 'r', te muți pe link-ul de fail spre ramura 'he', ca să poți finaliza 'her'.", blocksVisual: [{ label: "Algoritm Hibrid", groups: [[{val: "Trie + KMP", sorted: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Aho-Corasick Infoarena", url: "https://www.infoarena.ro/problema/ahocorasick", desc: "Problema clasică" }
      ],
      medium: [
        { title: "Stream of Characters", url: "https://leetcode.com/problems/stream-of-characters/", desc: "Trie răsturnat sau AC" }
      ],
      hard: [
        { title: "Trie + DP (Password Generator)", url: "https://codeforces.com/problemset/problem/86/C", desc: "Aho-Corasick combinat cu DP" }
      ]
    }
  },
  "Strings/Suffix_Structures": {
    presentation: "Structurile de Sufixe (Suffix Array, Suffix Tree, Suffix Automaton) sunt apogeul algoritmilor de stringuri. Odată ce stăpânești aceste concepte, aproape nicio problemă de substring-uri nu îți va sta în cale.\n\nSuffix Array (Vectorul de sufixe) reprezintă pur și simplu ordonarea lexicografică (alfabetică) a TUTUROR sufixelor unui text. Din el obținem LCP Array (Longest Common Prefix), care ne indică câte litere sunt comune între două sufixe adiacente sortate. Prin combinarea Suffix Array + LCP putem rezolva instant probleme ca: 'Care este cel mai lung substring comun pentru M texte?' sau 'De câte ori apare un string?'.",
    complexity: "Timp: Suffix Array poate fi construit trivial în O(N^2 log N), optimizat la O(N log^2 N) folosind hash-uri/sortare cu prefixe, și în O(N log N) sau chiar O(N) (SA-IS, algoritmul lui Yuta Mori sau Karkkainen-Sanders).\nSpațiu: O(N) memorie pentru LCP și SA, de obicei foarte compact față de Suffix Tree.",
    variations: "1. Suffix Tree: O reprezentare sub formă de Trie comprimat al tuturor sufixelor. Ukkonen îl generează în O(N).\n2. Suffix Automaton (DAWG): O structură incredibil de mică și elegantă care acceptă fix toate substring-urile, fără construcții complicate (algoritm on-line).",
    applications: "Bioinformatica: Găsirea celei mai lungi secvențe de ADN comune între mai multe genomi. Analiza plagiatului la o scară masivă. Motoare de căutare primitive.",
    code: `// Conceptual Suffix Array
// Pentru șirul "banana"
// Sufixele sunt:
// 0: banana
// 1: anana
// 2: nana
// 3: ana
// 4: na
// 5: a

// Sortate lexicografic, vectorul SA va memora indexul inițial al fiecărui sufix:
// SA = [5, 3, 1, 0, 4, 2]
// LCP = [1, 3, 0, 0, 2, 0] (Prefixul comun dintre sufixul anterior sortat si cel curent)

// Pentru Căutarea unui cuvânt "nan" în text (folosim Căutare Binară pe SA!):
// deoarece sufixele sunt sortate, toate sufixele care încep cu "nan" 
// vor fi grupate contiguu în vectorul SA (în acest caz indexul 4 și 2: "nana" și "na" - "na" e mai mic).
`,
    explanations: [
      { line: 12, text: "Magia din spate: Deoarece sufixele sunt așezate alfabetic, ORICE substring este pur și simplu prefixul unuia sau mai multor sufixe. Așadar, folosind Căutarea Binară pe vectorul Suffix Array, poți găsi aparițiile oricărui cuvânt în O(M log N) direct! Fără KMP!", blocksVisual: [{ label: "Suffix Array pt 'banana'", groups: [[{val: "5: a"}], [{val: "3: ana"}], [{val: "1: anana"}], [{val: "0: banana"}], [{val: "4: na"}], [{val: "2: nana", active: true}]] }] }
    ],
    problems: {
      easy: [
        { title: "Suffix Array", url: "https://www.infoarena.ro/problema/smax", desc: "Inițiere SA" }
      ],
      medium: [
        { title: "Longest Common Substring", url: "https://leetcode.com/problems/longest-common-substring/", desc: "Se rezolvă excelent cu Suffix Array / Automata" },
        { title: "Distinct Substrings", url: "https://www.spoj.com/problems/DISUBSTR/", desc: "Numărul de substringuri unice: N(N+1)/2 - sum(LCP)" }
      ],
      hard: [
        { title: "Longest Duplicate Substring", url: "https://leetcode.com/problems/longest-duplicate-substring/", desc: "Problemă clasică pentru LCP max" }
      ]
    }
  ,
  "Graphs/Basics": {
    "presentation": "Un graf este o structură de date neliniară formată din noduri (vârfuri) și muchii (conexiuni între noduri). Este folosit pentru a modela relații între perechi de obiecte.\\n\\nTipuri principale:\\n- Orientate / Neorientate: Muchiile au o direcție (A -> B) sau sunt bidirecționale.\\n- Ponderate / Neponderate: Muchiile au un 'cost' (ex: distanță, timp).\\n\\nReprezentare:\\n1. Matrice de adiacență: O matrice N x N unde M[i][j] = 1 dacă există muchie între i și j.\\n2. Liste de adiacență: Un vector de liste, unde vec[i] conține toți vecinii nodului i. Este mult mai eficientă din punct de vedere al memoriei pentru grafuri rare (cu puține muchii).",
    "complexity": "Spațiu: O(V^2) pentru matricea de adiacență, O(V + E) pentru liste de adiacență (V = noduri, E = muchii).\\nTimp: Verificarea existenței unei muchii e O(1) la matrice, dar O(grad(V)) la liste. Parcurgerea vecinilor e O(V) la matrice, O(grad(V)) la liste.",
    "variations": "Grafuri Bipartite (nodurile pot fi împărțite în 2 seturi fără muchii în interiorul aceluiași set), Arbori (grafuri conexe fără cicluri), DAG (Directed Acyclic Graph - graf orientat fără cicluri).",
    "applications": "Rețele de socializare (prietenii sunt muchii), hărți GPS (intersecțiile sunt noduri, străzile sunt muchii), rețele de calculatoare, web (link-uri între pagini).",
    "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int V = 5; // Numarul de noduri (0 la 4)\n    vector<vector<int>> adj(V);\n    \n    // Adaugam muchii pentru un graf neorientat\n    // Muchia 0-1\n    adj[0].push_back(1);\n    adj[1].push_back(0);\n    \n    // Muchia 0-4\n    adj[0].push_back(4);\n    adj[4].push_back(0);\n    \n    // Muchia 1-2\n    adj[1].push_back(2);\n    adj[2].push_back(1);\n    \n    // Muchia 1-3\n    adj[1].push_back(3);\n    adj[3].push_back(1);\n    \n    // Muchia 1-4\n    adj[1].push_back(4);\n    adj[4].push_back(1);\n    \n    // Afisarea listei de adiacenta\n    for (int i = 0; i < V; ++i) {\n        cout << \"Nodul \" << i << \" este conectat cu: \";\n        for (int vec : adj[i]) {\n            cout << vec << \" \";\n        }\n        cout << \"\\n\";\n    }\n    \n    return 0;\n}",
    "explanations": [
        {
            "line": 7,
            "text": "Avem 5 noduri numerotate de la 0 la 4.",
            "blocksVisual": [
                {
                    "label": "Noduri",
                    "groups": [
                        [
                            {
                                "val": "0"
                            },
                            {
                                "val": "1"
                            },
                            {
                                "val": "2"
                            },
                            {
                                "val": "3"
                            },
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 8,
            "text": "Inițializăm un vector de vectori (liste de adiacență). `adj[i]` va reține vecinii nodului `i`.",
            "blocksVisual": [
                {
                    "label": "Liste vide",
                    "groups": [
                        [
                            {
                                "val": "adj[0]: []"
                            }
                        ],
                        [
                            {
                                "val": "adj[1]: []"
                            }
                        ],
                        [
                            {
                                "val": "adj[2]: []"
                            }
                        ],
                        [
                            {
                                "val": "adj[3]: []"
                            }
                        ],
                        [
                            {
                                "val": "adj[4]: []"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 12,
            "text": "Adăugăm muchia neorientată (0, 1). Punem 1 în lista lui 0.",
            "blocksVisual": [
                {
                    "label": "Muchia 0-1",
                    "groups": [
                        [
                            {
                                "val": "adj[0]: [1]",
                                "active": true
                            }
                        ],
                        [
                            {
                                "val": "adj[1]: []"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 13,
            "text": "Și punem 0 în lista lui 1.",
            "blocksVisual": [
                {
                    "label": "Muchia 0-1",
                    "groups": [
                        [
                            {
                                "val": "adj[0]: [1]"
                            }
                        ],
                        [
                            {
                                "val": "adj[1]: [0]",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 16,
            "text": "Adăugăm muchia (0, 4).",
            "blocksVisual": [
                {
                    "label": "Muchia 0-4",
                    "groups": [
                        [
                            {
                                "val": "adj[0]: [1, 4]",
                                "active": true
                            }
                        ],
                        [
                            {
                                "val": "adj[4]: [0]",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 20,
            "text": "Adăugăm muchia (1, 2).",
            "blocksVisual": [
                {
                    "label": "Muchia 1-2",
                    "groups": [
                        [
                            {
                                "val": "adj[1]: [0, 2]",
                                "active": true
                            }
                        ],
                        [
                            {
                                "val": "adj[2]: [1]",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Adăugăm muchia (1, 3).",
            "blocksVisual": [
                {
                    "label": "Muchia 1-3",
                    "groups": [
                        [
                            {
                                "val": "adj[1]: [0, 2, 3]",
                                "active": true
                            }
                        ],
                        [
                            {
                                "val": "adj[3]: [1]",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 28,
            "text": "Adăugăm muchia (1, 4).",
            "blocksVisual": [
                {
                    "label": "Muchia 1-4",
                    "groups": [
                        [
                            {
                                "val": "adj[1]: [0, 2, 3, 4]",
                                "active": true
                            }
                        ],
                        [
                            {
                                "val": "adj[4]: [0, 1]",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 32,
            "text": "Afișăm structura finală a grafului. Aceasta este o reprezentare compactă și eficientă!",
            "blocksVisual": [
                {
                    "label": "Graful Final",
                    "groups": [
                        [
                            {
                                "val": "Nod 0 -> 1, 4",
                                "sorted": true
                            }
                        ],
                        [
                            {
                                "val": "Nod 1 -> 0, 2, 3, 4",
                                "sorted": true
                            }
                        ],
                        [
                            {
                                "val": "Nod 2 -> 1",
                                "sorted": true
                            }
                        ],
                        [
                            {
                                "val": "Nod 3 -> 1",
                                "sorted": true
                            }
                        ],
                        [
                            {
                                "val": "Nod 4 -> 0, 1",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Matrice de Adiacență",
                "url": "https://www.pbinfo.ro/probleme/412/adiacenta",
                "desc": "Creare din muchii"
            }
        ],
        "medium": [
            {
                "title": "Grade Noduri",
                "url": "https://www.pbinfo.ro/probleme/416/grade",
                "desc": "Calcul grade"
            }
        ],
        "hard": [
            {
                "title": "Find the Town Judge",
                "url": "https://leetcode.com/problems/find-the-town-judge/",
                "desc": "Grade intrare/ieșire"
            }
        ]
    }
},
  "Graphs/DFS": {
    "presentation": "Depth First Search (Parcurgerea în Adâncime) este o tehnică fundamentală de explorare a unui graf. Se pornește dintr-un nod sursă și se vizitează un vecin, apoi un vecin al acelui vecin, adâncindu-ne cât mai mult posibil. Când ajungem la un nod fără vecini nevizitați, ne 'întoarcem' (backtrack) la nodul anterior.\\n\\nEste implementată natural folosind o funcție recursivă (care folosește implicit stiva de apeluri a sistemului). Este esențial să marcăm nodurile deja vizitate într-un vector `visited` pentru a nu intra într-un ciclu infinit.",
    "complexity": "Timp: O(V + E) deoarece explorăm fiecare nod și fiecare muchie exact o dată.\\nSpațiu: O(V) pentru vectorul de vizitați și stiva de recursivitate (în cel mai rău caz, graful este o linie dreaptă).",
    "variations": "Aflarea Componentelor Conexe, Detectarea Ciclurilor (grafuri orientate/neorientate), Sortare Topologică.",
    "applications": "Rezolvarea labirinturilor, flood fill (umplerea contururilor în MS Paint), analiza rețelelor electrice.",
    "code": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nvoid dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {\n    visited[node] = true;\n    cout << node << \" \";\n    \n    for (int neighbor : adj[node]) {\n        if (!visited[neighbor]) {\n            dfs(neighbor, adj, visited);\n        }\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj = {\n        {1, 2},    // Vecinii lui 0\n        {0, 3, 4}, // Vecinii lui 1\n        {0, 4},    // Vecinii lui 2\n        {1},       // Vecinii lui 3\n        {1, 2}     // Vecinii lui 4\n    };\n    \n    vector<bool> visited(V, false);\n    \n    cout << \"Parcurgere DFS pornind din 0: \";\n    dfs(0, adj, visited);\n    cout << \"\\n\";\n    \n    return 0;\n}",
    "explanations": [
        {
            "line": 30,
            "text": "Începem DFS-ul din nodul 0.",
            "blocksVisual": [
                {
                    "label": "Apel",
                    "groups": [
                        [
                            {
                                "val": "dfs(0)",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 7,
            "text": "Marcăm nodul 0 ca vizitat.",
            "blocksVisual": [
                {
                    "label": "Vizitat",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            },
                            {
                                "val": "1"
                            },
                            {
                                "val": "2"
                            },
                            {
                                "val": "3"
                            },
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 10,
            "text": "Iterăm prin vecinii lui 0 (adică 1 și 2).",
            "blocksVisual": [
                {
                    "label": "Vecini 0",
                    "groups": [
                        [
                            {
                                "val": "1",
                                "active": true
                            },
                            {
                                "val": "2"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 11,
            "text": "Vecinul 1 nu este vizitat. Apelăm recursiv `dfs(1)`.",
            "blocksVisual": [
                {
                    "label": "Apel",
                    "groups": [
                        [
                            {
                                "val": "dfs(1)",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 7,
            "text": "Marcăm 1 ca vizitat.",
            "blocksVisual": [
                {
                    "label": "Vizitat",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            },
                            {
                                "val": "1",
                                "active": true
                            },
                            {
                                "val": "2"
                            },
                            {
                                "val": "3"
                            },
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 10,
            "text": "Vecinii lui 1 sunt 0, 3, 4. 0 e deja vizitat. Urmează 3.",
            "blocksVisual": [
                {
                    "label": "Vecini 1",
                    "groups": [
                        [
                            {
                                "val": "0(viz)"
                            },
                            {
                                "val": "3",
                                "active": true
                            },
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 12,
            "text": "Apelăm recursiv `dfs(3)`.",
            "blocksVisual": [
                {
                    "label": "Apel",
                    "groups": [
                        [
                            {
                                "val": "dfs(3)",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 7,
            "text": "Marcăm 3 ca vizitat.",
            "blocksVisual": [
                {
                    "label": "Vizitat",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            },
                            {
                                "val": "1",
                                "active": true
                            },
                            {
                                "val": "2"
                            },
                            {
                                "val": "3",
                                "active": true
                            },
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 10,
            "text": "Vecinii lui 3 sunt doar 1. Dar 1 este deja vizitat! Deci am atins un capăt.",
            "blocksVisual": [
                {
                    "label": "Vecini 3",
                    "groups": [
                        [
                            {
                                "val": "1(viz)"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 15,
            "text": "Funcția `dfs(3)` se termină. Ne întoarcem (backtrack) la `dfs(1)`.",
            "blocksVisual": [
                {
                    "label": "Backtrack",
                    "groups": [
                        [
                            {
                                "val": "Înapoi la dfs(1)",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 10,
            "text": "La `dfs(1)`, următorul vecin de verificat era 4. 4 nu este vizitat.",
            "blocksVisual": [
                {
                    "label": "Vecini 1",
                    "groups": [
                        [
                            {
                                "val": "0(viz)"
                            },
                            {
                                "val": "3(viz)"
                            },
                            {
                                "val": "4",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 12,
            "text": "Apelăm recursiv `dfs(4)`.",
            "blocksVisual": [
                {
                    "label": "Apel",
                    "groups": [
                        [
                            {
                                "val": "dfs(4)",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 7,
            "text": "Marcăm 4 ca vizitat.",
            "blocksVisual": [
                {
                    "label": "Vizitat",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            },
                            {
                                "val": "1",
                                "active": true
                            },
                            {
                                "val": "2"
                            },
                            {
                                "val": "3",
                                "active": true
                            },
                            {
                                "val": "4",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 10,
            "text": "Vecinii lui 4 sunt 1 și 2. 1 este deja vizitat. Apelăm DFS pentru 2.",
            "blocksVisual": [
                {
                    "label": "Vecini 4",
                    "groups": [
                        [
                            {
                                "val": "1(viz)"
                            },
                            {
                                "val": "2",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 7,
            "text": "Marcăm 2 ca vizitat.",
            "blocksVisual": [
                {
                    "label": "Vizitat",
                    "groups": [
                        [
                            {
                                "val": "Toate vizitate!",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 10,
            "text": "Vecinii lui 2 (0, 4) sunt amândoi vizitați. Ne întoarcem.",
            "blocksVisual": [
                {
                    "label": "Backtrack",
                    "groups": [
                        [
                            {
                                "val": "Înapoi la dfs(4)"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 15,
            "text": "Se termină `dfs(4)`, apoi se termină `dfs(1)`, iar în `dfs(0)` vecinul rămas era 2 (deja vizitat). Astfel, am explorat întregul graf conex!",
            "blocksVisual": [
                {
                    "label": "Ordinea Vizitării",
                    "groups": [
                        [
                            {
                                "val": "0 -> 1 -> 3 -> 4 -> 2",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Componente Conexe",
                "url": "https://www.pbinfo.ro/probleme/417/componenteconexe",
                "desc": "Găsire componente"
            }
        ],
        "medium": [
            {
                "title": "Number of Islands",
                "url": "https://leetcode.com/problems/number-of-islands/",
                "desc": "DFS pe matrice"
            }
        ],
        "hard": [
            {
                "title": "Longest Increasing Path in a Matrix",
                "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
                "desc": "DFS + Memoization"
            }
        ]
    }
},
  "Graphs/BFS": {
    "presentation": "Breadth First Search (Parcurgerea în Lățime) explorează graful nivel cu nivel, plecând de la nodul sursă. Întâi vizitează toți vecinii direcți, apoi vecinii vecinilor, și așa mai departe.\\n\\nAcest comportament face ca BFS să fie algoritmul perfect pentru a găsi **cel mai scurt drum** (ca număr de muchii) într-un graf neponderat.\\n\\nImplementarea se bazează pe o structură de date de tip Coadă (Queue - FIFO: First In, First Out).",
    "complexity": "Timp: O(V + E) - fiecare nod este adăugat în coadă o singură dată, iar fiecare muchie este verificată o singură dată.\\nSpațiu: O(V) - pentru coada de așteptare și vectorul de vizitați. În cel mai rău caz (un graf stea), coada va conține V-1 noduri.",
    "variations": "Lee Algorithm (BFS pe o matrice pentru găsirea drumului minim într-un labirint), 0-1 BFS (dacă muchiile au cost 0 sau 1, folosim un deque în loc de queue), Multi-source BFS (dacă avem mai multe surse din care plecăm simultan).",
    "applications": "Găsirea celui mai scurt drum pe o hartă fără ponderi, rețele peer-to-peer (pentru a găsi nodurile vecine), web crawlers, algoritmul lui Ford-Fulkerson (pentru aflarea drumului de creștere în rețea - Edmonds-Karp).",
    "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvoid bfs(int start, vector<vector<int>>& adj, int V) {\n    vector<bool> visited(V, false);\n    queue<int> q;\n    \n    visited[start] = true;\n    q.push(start);\n    \n    while (!q.empty()) {\n        int node = q.front();\n        q.pop();\n        \n        cout << node << \" \";\n        \n        for (int neighbor : adj[node]) {\n            if (!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n}\n\nint main() {\n    int V = 6;\n    vector<vector<int>> adj = {\n        {1, 2},    // Vecini 0\n        {0, 3, 4}, // Vecini 1\n        {0, 4},    // Vecini 2\n        {1, 5},    // Vecini 3\n        {1, 2, 5}, // Vecini 4\n        {3, 4}     // Vecini 5\n    };\n    \n    cout << \"Parcurgere BFS pornind din 0: \";\n    bfs(0, adj, V);\n    cout << \"\\n\";\n    \n    return 0;\n}",
    "explanations": [
        {
            "line": 40,
            "text": "Începem BFS din nodul 0.",
            "blocksVisual": [
                {
                    "label": "Start",
                    "groups": [
                        [
                            {
                                "val": "0"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 11,
            "text": "Marcăm 0 ca vizitat.",
            "blocksVisual": [
                {
                    "label": "Vizitat",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 12,
            "text": "Adăugăm 0 în coadă.",
            "blocksVisual": [
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 14,
            "text": "Cât timp coada nu e goală, extragem primul element.",
            "blocksVisual": [
                {
                    "label": "Pop",
                    "groups": [
                        [
                            {
                                "val": "0"
                            }
                        ]
                    ]
                },
                {
                    "label": "Coadă Rămasă",
                    "groups": [
                        [
                            {
                                "val": "Gol"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 20,
            "text": "Explorăm vecinii lui 0 (1 și 2). Niciunul nu e vizitat.",
            "blocksVisual": [
                {
                    "label": "Vecini 0",
                    "groups": [
                        [
                            {
                                "val": "1",
                                "active": true
                            },
                            {
                                "val": "2",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 22,
            "text": "Marcăm 1 și 2 ca vizitați și îi adăugăm în coadă.",
            "blocksVisual": [
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "1",
                                "active": true
                            },
                            {
                                "val": "2",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 14,
            "text": "Extragem pe 1 din coadă.",
            "blocksVisual": [
                {
                    "label": "Pop",
                    "groups": [
                        [
                            {
                                "val": "1"
                            }
                        ]
                    ]
                },
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "2"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 20,
            "text": "Vecinii lui 1 sunt 0, 3, 4. 0 este vizitat, deci adăugăm 3 și 4.",
            "blocksVisual": [
                {
                    "label": "Coadă Nouă",
                    "groups": [
                        [
                            {
                                "val": "2"
                            },
                            {
                                "val": "3",
                                "active": true
                            },
                            {
                                "val": "4",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 14,
            "text": "Extragem pe 2 din coadă.",
            "blocksVisual": [
                {
                    "label": "Pop",
                    "groups": [
                        [
                            {
                                "val": "2"
                            }
                        ]
                    ]
                },
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "3"
                            },
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 20,
            "text": "Vecinii lui 2 sunt 0 și 4. Ambele sunt deja vizitate/în coadă. Nu adăugăm nimic.",
            "blocksVisual": [
                {
                    "label": "Skip",
                    "groups": [
                        [
                            {
                                "val": "Niciunul adăugat"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 14,
            "text": "Extragem pe 3. Vecinii săi: 1 (vizitat), 5 (nevizitat).",
            "blocksVisual": [
                {
                    "label": "Pop",
                    "groups": [
                        [
                            {
                                "val": "3"
                            }
                        ]
                    ]
                },
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "4"
                            },
                            {
                                "val": "5",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 14,
            "text": "Extragem pe 4. Vecinii (1, 2, 5) toți vizitați. Apoi extragem 5. Gata!",
            "blocksVisual": [
                {
                    "label": "Ordinea Vizitării",
                    "groups": [
                        [
                            {
                                "val": "0 -> 1 -> 2 -> 3 -> 4 -> 5",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "BFS Parcurgere",
                "url": "https://www.pbinfo.ro/probleme/418/bfs",
                "desc": "Parcurgere simplă"
            }
        ],
        "medium": [
            {
                "title": "Rotting Oranges",
                "url": "https://leetcode.com/problems/rotting-oranges/",
                "desc": "Multi-source BFS"
            }
        ],
        "hard": [
            {
                "title": "Word Ladder",
                "url": "https://leetcode.com/problems/word-ladder/",
                "desc": "BFS pentru drum minim în graf de cuvinte"
            }
        ]
    }
},
  "Graphs/MST": {
    "presentation": "Minimum Spanning Tree (Arborele Parțial de Cost Minim). Dat fiind un graf neorientat, ponderat și conex, un MST este un subgraf care:\\n1. Este un arbore (nu are cicluri)\\n2. Conectează TOATE nodurile (este conex)\\n3. Suma costurilor muchiilor sale este minimă.\\n\\nCei mai cunoscuți algoritmi sunt Kruskal și Prim, ambii fiind abordări Greedy.\\n- **Kruskal**: Sortează toate muchiile crescător. Adaugă-le una câte una dacă nu formează un ciclu (folosind Disjoint Set Union - DSU).\\n- **Prim**: Pornește cu un nod oarecare. La fiecare pas, folosește un Priority Queue pentru a alege cea mai ieftină muchie care conectează porțiunea deja construită de un nod nou.",
    "complexity": "Kruskal: O(E log E) pentru sortare muchii + O(E α(V)) pentru operațiile DSU.\\nPrim: O(E log V) cu un min-heap (Priority Queue).\\nRecomandare: Pentru grafuri rare (puține muchii), Kruskal e adesea mai ușor de scris. Pentru grafuri dense (E ~ V^2), Prim poate fi mai rapid.",
    "variations": "Maximum Spanning Tree (se sortează muchiile descrescător), Second Best MST.",
    "applications": "Proiectarea rețelelor de cabluri (ex: fibră optică) - conectarea tuturor orașelor cu cel mai mic cost posibil, designul circuitelor integrate.",
    "code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\n// Structura Disjoint Set (Paduri de multimi disjuncte)\nstruct DSU {\n    vector<int> parent, rank;\n    DSU(int n) {\n        parent.resize(n); rank.resize(n, 0);\n        for(int i=0; i<n; i++) parent[i] = i;\n    }\n    int find(int i) {\n        if (parent[i] == i) return i;\n        return parent[i] = find(parent[i]); // Path compression\n    }\n    void unite(int i, int j) {\n        int rootI = find(i), rootJ = find(j);\n        if (rootI != rootJ) {\n            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;\n            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;\n            else { parent[rootJ] = rootI; rank[rootI]++; }\n        }\n    }\n};\n\nstruct Edge { int u, v, weight; };\n\nint kruskal(int V, vector<Edge>& edges) {\n    // 1. Sortam muchiile crescator dupa cost\n    sort(edges.begin(), edges.end(), [](Edge a, Edge b) {\n        return a.weight < b.weight;\n    });\n\n    DSU dsu(V);\n    int mst_cost = 0;\n    \n    // 2. Iteram prin muchii\n    for (Edge e : edges) {\n        if (dsu.find(e.u) != dsu.find(e.v)) { // Daca nu formeaza ciclu\n            dsu.unite(e.u, e.v);\n            mst_cost += e.weight;\n            cout << \"Adaug muchia: \" << e.u << \"-\" << e.v << \" (Cost \" << e.weight << \")\\n\";\n        }\n    }\n    return mst_cost;\n}\n\nint main() {\n    int V = 4;\n    vector<Edge> edges = {\n        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},\n        {1, 3, 15}, {2, 3, 4}\n    };\n    \n    cout << \"Cost minim: \" << kruskal(V, edges) << \"\\n\";\n    return 0;\n}",
    "explanations": [
        {
            "line": 32,
            "text": "Sortăm toate muchiile crescător. Inițial: [ (0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4) ].",
            "blocksVisual": [
                {
                    "label": "Muchii Sortate",
                    "groups": [
                        [
                            {
                                "val": "2-3: 4",
                                "active": true
                            },
                            {
                                "val": "0-3: 5"
                            },
                            {
                                "val": "0-2: 6"
                            },
                            {
                                "val": "0-1: 10"
                            },
                            {
                                "val": "1-3: 15"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 36,
            "text": "DSU (Disjoint Set) se inițializează: Fiecare nod e în propriul set.",
            "blocksVisual": [
                {
                    "label": "Seturi",
                    "groups": [
                        [
                            {
                                "val": "{0}"
                            }
                        ],
                        [
                            {
                                "val": "{1}"
                            }
                        ],
                        [
                            {
                                "val": "{2}"
                            }
                        ],
                        [
                            {
                                "val": "{3}"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 40,
            "text": "Alegem prima muchie: 2-3 (cost 4). 2 și 3 sunt în seturi diferite?",
            "blocksVisual": [
                {
                    "label": "Verificare ciclu",
                    "groups": [
                        [
                            {
                                "val": "2 ∈ {2}",
                                "active": true
                            },
                            {
                                "val": "3 ∈ {3}",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 41,
            "text": "Da! Nu formează ciclu. Îi unim.",
            "blocksVisual": [
                {
                    "label": "Unire",
                    "groups": [
                        [
                            {
                                "val": "{0}"
                            }
                        ],
                        [
                            {
                                "val": "{1}"
                            }
                        ],
                        [
                            {
                                "val": "{2, 3}",
                                "sorted": true
                            }
                        ]
                    ]
                },
                {
                    "label": "Cost",
                    "groups": [
                        [
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 40,
            "text": "Alegem a doua muchie: 0-3 (cost 5). Seturile lui 0 și 3 sunt diferite.",
            "blocksVisual": [
                {
                    "label": "Verificare ciclu",
                    "groups": [
                        [
                            {
                                "val": "0 ∈ {0}",
                                "active": true
                            },
                            {
                                "val": "3 ∈ {2, 3}",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 41,
            "text": "Unim setul lui 0 cu setul lui 3.",
            "blocksVisual": [
                {
                    "label": "Unire",
                    "groups": [
                        [
                            {
                                "val": "{1}"
                            }
                        ],
                        [
                            {
                                "val": "{0, 2, 3}",
                                "sorted": true
                            }
                        ]
                    ]
                },
                {
                    "label": "Cost",
                    "groups": [
                        [
                            {
                                "val": "4 + 5 = 9"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 40,
            "text": "Alegem a treia muchie: 0-2 (cost 6). 0 și 2 sunt în același set! Formează ciclu. O SĂRIM.",
            "blocksVisual": [
                {
                    "label": "Skip",
                    "groups": [
                        [
                            {
                                "val": "0 ∈ {0, 2, 3}",
                                "active": true
                            },
                            {
                                "val": "2 ∈ {0, 2, 3}",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 40,
            "text": "Alegem a patra muchie: 0-1 (cost 10). Seturile sunt diferite.",
            "blocksVisual": [
                {
                    "label": "Verificare",
                    "groups": [
                        [
                            {
                                "val": "0 ∈ {0, 2, 3}",
                                "active": true
                            },
                            {
                                "val": "1 ∈ {1}",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 41,
            "text": "Le unim. Acum toate nodurile sunt în același set!",
            "blocksVisual": [
                {
                    "label": "Arbore Finalizat",
                    "groups": [
                        [
                            {
                                "val": "{0, 1, 2, 3}",
                                "sorted": true
                            }
                        ]
                    ]
                },
                {
                    "label": "Cost",
                    "groups": [
                        [
                            {
                                "val": "9 + 10 = 19",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 46,
            "text": "Returnăm costul 19.",
            "blocksVisual": [
                {
                    "label": "Gata!",
                    "groups": [
                        [
                            {
                                "val": "Cost MST: 19",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "APM",
                "url": "https://www.pbinfo.ro/probleme/588/apm",
                "desc": "Arbore parțial de cost minim clasic"
            }
        ],
        "medium": [
            {
                "title": "Min Cost to Connect All Points",
                "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
                "desc": "Kruskal / Prim pe puncte 2D"
            }
        ],
        "hard": [
            {
                "title": "Redundant Connection II",
                "url": "https://leetcode.com/problems/redundant-connection-ii/",
                "desc": "Grafuri orientate & DSU"
            }
        ]
    }
},
  "Graphs/Topological_Sort": {
    "presentation": "Sortarea Topologică este o aranjare liniară a nodurilor dintr-un DAG (Directed Acyclic Graph) astfel încât pentru fiecare muchie orientată u -> v, nodul u apare înaintea nodului v în acea înșiruire.\\n\\nPentru ce e folosită? Pentru a programa o serie de task-uri care au dependențe (de ex. un curs universitar necesită alte cursuri ca pre-rechizite, sau compilarea unui proiect depinde de ordinea modulelor).\\n\\nAlgoritmul lui Kahn: Calculăm 'gradul de intrare' (in-degree) pentru fiecare nod. Nodurile cu grad 0 nu depind de nimic, deci pot fi adăugate primele. Le adăugăm într-o coadă, le scoatem, și 'ștergem' muchiile care pornesc din ele, scăzând gradul vecinilor. Când un vecin ajunge la grad 0, îl adăugăm în coadă.",
    "complexity": "Timp: O(V + E) - fiecare nod este introdus în coadă o dată, iar fiecare muchie e vizitată la scăderea gradului.\\nSpațiu: O(V) pentru vectorul de in-degree și coadă.",
    "variations": "Detectarea unui ciclu într-un graf orientat: dacă la finalul algoritmului Kahn nu am reușit să punem toate cele V noduri în lista sortată, înseamnă că există o dependență circulară (un ciclu)!",
    "applications": "Dependency Resolution (cum face `npm` sau `apt`), scheduling de task-uri.",
    "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\n\nvector<int> topologicalSort(int V, vector<vector<int>>& adj) {\n    vector<int> inDegree(V, 0);\n    // Calculam gradul de intrare pentru fiecare nod\n    for (int i = 0; i < V; ++i) {\n        for (int neighbor : adj[i]) {\n            inDegree[neighbor]++;\n        }\n    }\n    \n    queue<int> q;\n    // Adaugam nodurile care nu depind de nimic (inDegree == 0)\n    for (int i = 0; i < V; ++i) {\n        if (inDegree[i] == 0) q.push(i);\n    }\n    \n    vector<int> topOrder;\n    while (!q.empty()) {\n        int node = q.front();\n        q.pop();\n        topOrder.push_back(node);\n        \n        // Simulam stergerea muchiilor\n        for (int neighbor : adj[node]) {\n            inDegree[neighbor]--;\n            if (inDegree[neighbor] == 0) {\n                q.push(neighbor);\n            }\n        }\n    }\n    \n    if (topOrder.size() != V) {\n        cout << \"Eroare: Graful are un ciclu!\\n\";\n        return {};\n    }\n    return topOrder;\n}\n\nint main() {\n    int V = 6;\n    vector<vector<int>> adj(V);\n    // 5 -> 0, 5 -> 2, 4 -> 0, 4 -> 1, 2 -> 3, 3 -> 1\n    adj[5].push_back(0); adj[5].push_back(2);\n    adj[4].push_back(0); adj[4].push_back(1);\n    adj[2].push_back(3); adj[3].push_back(1);\n    \n    vector<int> res = topologicalSort(V, adj);\n    cout << \"Sortare Topologica: \";\n    for (int n : res) cout << n << \" \";\n    cout << \"\\n\";\n    return 0;\n}",
    "explanations": [
        {
            "line": 9,
            "text": "Calculăm gradul de intrare. Adică de câte alte noduri depinde fiecare nod.",
            "blocksVisual": [
                {
                    "label": "InDegree",
                    "groups": [
                        [
                            {
                                "val": "0: 2"
                            },
                            {
                                "val": "1: 2"
                            },
                            {
                                "val": "2: 1"
                            },
                            {
                                "val": "3: 1"
                            },
                            {
                                "val": "4: 0"
                            },
                            {
                                "val": "5: 0"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 17,
            "text": "Nodurile 4 și 5 au inDegree 0. Pot fi executate primele! Le băgăm în coadă.",
            "blocksVisual": [
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "4",
                                "active": true
                            },
                            {
                                "val": "5",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Scoatem 4. Îl adăugăm la rezultat.",
            "blocksVisual": [
                {
                    "label": "Rezultat",
                    "groups": [
                        [
                            {
                                "val": "4"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 30,
            "text": "Scădem inDegree pentru vecinii lui 4 (adică 0 și 1).",
            "blocksVisual": [
                {
                    "label": "InDegree Update",
                    "groups": [
                        [
                            {
                                "val": "0: 1",
                                "active": true
                            },
                            {
                                "val": "1: 1",
                                "active": true
                            },
                            {
                                "val": "2: 1"
                            },
                            {
                                "val": "3: 1"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Scoatem 5. Îl adăugăm la rezultat.",
            "blocksVisual": [
                {
                    "label": "Rezultat",
                    "groups": [
                        [
                            {
                                "val": "4"
                            },
                            {
                                "val": "5"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 30,
            "text": "Scădem inDegree pentru vecinii lui 5 (0 și 2). Noul inDegree pentru 0 devine 0! Pentru 2 devine 0!",
            "blocksVisual": [
                {
                    "label": "InDegree Update",
                    "groups": [
                        [
                            {
                                "val": "0: 0",
                                "active": true
                            },
                            {
                                "val": "2: 0",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 32,
            "text": "Fiindcă 0 și 2 au atins 0 dependențe, le punem în coadă.",
            "blocksVisual": [
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "0",
                                "active": true
                            },
                            {
                                "val": "2",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Scoatem 0. Acesta nu are vecini. Rezultat: [4, 5, 0].",
            "blocksVisual": [
                {
                    "label": "Rezultat",
                    "groups": [
                        [
                            {
                                "val": "4, 5, 0"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Scoatem 2. Vecinul său e 3. Scădem inDegree-ul lui 3. Devine 0! Punem 3 în coadă.",
            "blocksVisual": [
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "3",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Scoatem 3. Vecinul e 1. Scădem inDegree-ul lui 1. Devine 0! Punem 1 în coadă.",
            "blocksVisual": [
                {
                    "label": "Coadă",
                    "groups": [
                        [
                            {
                                "val": "1",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Scoatem 1. Nu are vecini. Am terminat!",
            "blocksVisual": [
                {
                    "label": "Rezultat Final",
                    "groups": [
                        [
                            {
                                "val": "4, 5, 0, 2, 3, 1",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Sortare Topologica",
                "url": "https://www.infoarena.ro/problema/sortaret",
                "desc": "Problema clasica"
            }
        ],
        "medium": [
            {
                "title": "Course Schedule",
                "url": "https://leetcode.com/problems/course-schedule/",
                "desc": "Detectie Cicluri"
            },
            {
                "title": "Course Schedule II",
                "url": "https://leetcode.com/problems/course-schedule-ii/",
                "desc": "Aflare Ordine"
            }
        ],
        "hard": [
            {
                "title": "Alien Dictionary",
                "url": "https://leetcode.com/problems/alien-dictionary/",
                "desc": "Dedus alfabete extraterestre cu DAG"
            }
        ]
    }
},
  "Graphs/SCC_Biconnected": {
    "presentation": "O Componentă Tare Conexă (Strongly Connected Component - SCC) într-un graf orientat este un subgraf maximal în care, pentru orice pereche de noduri (u, v), există un drum de la u la v ȘI un drum de la v la u.\\n\\nAlgoritmii clasici pentru găsirea SCC-urilor sunt Tarjan și Kosaraju. Kosaraju folosește 2 parcurgeri DFS (una pe graful normal pentru a determina o ordine de finalizare, alta pe graful transpus, explorând în ordinea inversă).\\n\\nComponentele Biconexe se aplică grafurilor neorientate. Un graf este biconex dacă nu are niciun 'Punct de Articulație' (un nod care, dacă e șters, rupe graful în mai multe componente).",
    "complexity": "Timp: O(V + E) - Kosaraju face doar 2 parcurgeri DFS, iar transpunerea grafului durează tot O(V + E).\\nSpațiu: O(V + E) pentru graful transpus (la Kosaraju) și O(V) stiva pentru DFS.",
    "variations": "Găsirea Punctelor de Articulație și a Punților (Bridges) - muchii a căror eliminare crește numărul de componente conexe (algoritmul lui Tarjan / DFS Low-Link).",
    "applications": "Analiza rețelelor ecologice, 2-SAT (Satisfiability) poate fi rezolvat în timp liniar transformând expresia logică într-un graf de implicații și găsind SCC-urile.",
    "code": "#include <iostream>\n#include <vector>\n#include <stack>\n\nusing namespace std;\n\nvoid dfs1(int node, vector<vector<int>>& adj, vector<bool>& visited, stack<int>& s) {\n    visited[node] = true;\n    for (int neighbor : adj[node]) {\n        if (!visited[neighbor]) dfs1(neighbor, adj, visited, s);\n    }\n    s.push(node); // Punem in stiva la finalizarea vizitei\n}\n\nvoid dfs2(int node, vector<vector<int>>& adjT, vector<bool>& visited, vector<int>& component) {\n    visited[node] = true;\n    component.push_back(node);\n    for (int neighbor : adjT[node]) {\n        if (!visited[neighbor]) dfs2(neighbor, adjT, visited, component);\n    }\n}\n\nint main() {\n    int V = 5;\n    vector<vector<int>> adj(V), adjT(V);\n    // Muchii: 0->2, 2->1, 1->0, 0->3, 3->4\n    adj[0].push_back(2); adjT[2].push_back(0);\n    adj[2].push_back(1); adjT[1].push_back(2);\n    adj[1].push_back(0); adjT[0].push_back(1);\n    adj[0].push_back(3); adjT[3].push_back(0);\n    adj[3].push_back(4); adjT[4].push_back(3);\n\n    vector<bool> visited(V, false);\n    stack<int> s;\n    \n    // Pasul 1: DFS pe graful original\n    for (int i = 0; i < V; ++i) {\n        if (!visited[i]) dfs1(i, adj, visited, s);\n    }\n    \n    fill(visited.begin(), visited.end(), false);\n    \n    // Pasul 2: DFS pe graful transpus, in ordinea stivei\n    cout << \"Componentele Tare Conexe:\\n\";\n    while (!s.empty()) {\n        int node = s.top();\n        s.pop();\n        \n        if (!visited[node]) {\n            vector<int> component;\n            dfs2(node, adjT, visited, component);\n            for (int x : component) cout << x << \" \";\n            cout << \"\\n\";\n        }\n    }\n    return 0;\n}",
    "explanations": [
        {
            "line": 36,
            "text": "Pasul 1 (Kosaraju): Facem DFS pe graful normal pentru a înregistra timpul de finalizare al nodurilor într-o stivă.",
            "blocksVisual": [
                {
                    "label": "DFS 1",
                    "groups": [
                        [
                            {
                                "val": "Începem..."
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 12,
            "text": "Când un nod termină de explorat toți vecinii săi, îl punem în stivă. Primul nod care se blochează va fi jos, ultimul care se termină va fi în vârf.",
            "blocksVisual": [
                {
                    "label": "Stivă (Top -> Bottom)",
                    "groups": [
                        [
                            {
                                "val": "0, 1, 2, 3, 4",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 26,
            "text": "Avem Graful Transpus (adjT), unde sensul tuturor muchiilor a fost inversat.",
            "blocksVisual": [
                {
                    "label": "Graf Transpus",
                    "groups": [
                        [
                            {
                                "val": "2->0, 1->2, 0->1, 3->0, 4->3"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 43,
            "text": "Pasul 2: Scoatem noduri din stivă. Extragem primul nod din stivă (cel cu timpul de finalizare maxim).",
            "blocksVisual": [
                {
                    "label": "Pop",
                    "groups": [
                        [
                            {
                                "val": "Nod curent"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 47,
            "text": "Facem un nou DFS pornind de la acest nod, dar pe Graful Transpus. Toate nodurile la care ajungem din el formează o Componentă Tare Conexă!",
            "blocksVisual": [
                {
                    "label": "DFS 2",
                    "groups": [
                        [
                            {
                                "val": "Găsim SCC-ul",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 49,
            "text": "Am găsit un SCC. Continuăm procesul până când stiva e goală, ignorând nodurile deja vizitate în faza 2.",
            "blocksVisual": [
                {
                    "label": "SCC Găsit",
                    "groups": [
                        [
                            {
                                "val": "{0, 1, 2}"
                            }
                        ],
                        [
                            {
                                "val": "{3}"
                            }
                        ],
                        [
                            {
                                "val": "{4}"
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Componente Tare Conexe",
                "url": "https://www.infoarena.ro/problema/ctc",
                "desc": "Problema Standard Kosaraju/Tarjan"
            }
        ],
        "medium": [
            {
                "title": "Puncte de Articulatie",
                "url": "https://www.infoarena.ro/problema/biconex",
                "desc": "Componente Biconexe"
            }
        ],
        "hard": [
            {
                "title": "Critical Connections in a Network",
                "url": "https://leetcode.com/problems/critical-connections-in-a-network/",
                "desc": "Găsirea Punților (Bridges) cu Tarjan"
            }
        ]
    }
},
  "Graphs/Eulerian_Hamiltonian": {
    "presentation": "Un **Drum Eulerian** vizitează fiecare muchie dintr-un graf exact o singură dată. Un **Ciclu Eulerian** este un drum Eulerian care se întoarce la nodul de pornire.\\n\\nPentru grafuri neorientate:\\n- Ciclu Eulerian: toate nodurile au grad par.\\n- Drum Eulerian: exact 2 noduri au grad impar (restul par).\\n\\nAlgoritmul lui Hierholzer găsește un Ciclu Eulerian în O(E): facem DFS, dar distrugem muchiile pe măsură ce le parcurgem. Când ne blocăm într-un nod, adăugăm acel nod la răspuns. La final, răspunsul se inversează.\\n\\nUn **Drum/Ciclu Hamiltonian** vizitează fiecare nod exact o singură dată. Spre deosebire de Eulerian, problema este NP-Hard (nu are soluție eficientă polinomială, necesitând Backtracking sau Bitmask DP O(2^N * N^2)).",
    "complexity": "Eulerian (Hierholzer): O(V + E) timp și spațiu.\\nHamiltonian (Held-Karp Bitmask DP): O(2^V * V^2) timp. (Deci imposibil pentru V > 20).",
    "variations": "Problema Poștașului Chinez (Găsirea drumului minim care vizitează toate muchiile măcar o dată), Problema Comis-Voiajorului (TSP - vizitarea tuturor nodurilor cu cost minim).",
    "applications": "Rute de gunoieri, poștași, curățarea străzilor cu utilaje (Eulerian). Optimizarea livrărilor logistice (TSP).",
    "code": "#include <iostream>\n#include <vector>\n#include <stack>\n#include <algorithm>\n\nusing namespace std;\n\nvoid findEulerianPath(int start, vector<vector<int>>& adj) {\n    stack<int> curr_path;\n    vector<int> circuit;\n    \n    curr_path.push(start);\n    int curr_v = start; \n\n    while (!curr_path.empty()) {\n        if (adj[curr_v].size()) {\n            curr_path.push(curr_v);\n            int next_v = adj[curr_v].back();\n            adj[curr_v].pop_back();\n            \n            // Daca graful era neorientat, trebuia stearsa si muchia inapoi!\n            // Presupunem graf orientat pentru simplitate\n            curr_v = next_v;\n        } else {\n            circuit.push_back(curr_v);\n            curr_v = curr_path.top();\n            curr_path.pop();\n        }\n    }\n\n    reverse(circuit.begin(), circuit.end());\n    for (int node : circuit) cout << node << \" \";\n    cout << \"\\n\";\n}\n\nint main() {\n    vector<vector<int>> adj = {\n        {1},    // 0 -> 1\n        {2},    // 1 -> 2\n        {0, 3}, // 2 -> 0, 2 -> 3\n        {4},    // 3 -> 4\n        {2}     // 4 -> 2\n    };\n    \n    cout << \"Ciclu Eulerian: \";\n    findEulerianPath(0, adj);\n    return 0;\n}",
    "explanations": [
        {
            "line": 12,
            "text": "Începem de la nodul 0.",
            "blocksVisual": [
                {
                    "label": "Start",
                    "groups": [
                        [
                            {
                                "val": "0"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 16,
            "text": "Avem vecini pentru nodul curent. Îl salvăm pe stivă, luăm primul vecin disponibil și ȘTERGEM muchia dintre ei.",
            "blocksVisual": [
                {
                    "label": "Alegere Muchie",
                    "groups": [
                        [
                            {
                                "val": "0 -> 1",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 23,
            "text": "Ne mutăm la noul nod și repetăm. Continuăm până nu mai avem muchii.",
            "blocksVisual": [
                {
                    "label": "Drum Recursiv",
                    "groups": [
                        [
                            {
                                "val": "0 -> 1 -> 2 -> 3 -> 4 -> 2 -> 0"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Când un nod rămâne complet FĂRĂ muchii de ieșire (ne-am blocat), îl adăugăm la rezultatul final `circuit`.",
            "blocksVisual": [
                {
                    "label": "Blocaj",
                    "groups": [
                        [
                            {
                                "val": "Nod adăugat la final"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 26,
            "text": "Ne întoarcem la ultimul nod salvat în stivă (Backtrack) ca să vedem dacă are alte rute neexplorate.",
            "blocksVisual": [
                {
                    "label": "Backtrack",
                    "groups": [
                        [
                            {
                                "val": "Pop stiva",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 31,
            "text": "La final, inversăm `circuit`. Dacă graful satisface condițiile, rezultatul este Ciclu/Drum Eulerian valid!",
            "blocksVisual": [
                {
                    "label": "Rezultat",
                    "groups": [
                        [
                            {
                                "val": "0 -> 1 -> 2 -> 3 -> 4 -> 2 -> 0",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Ciclu Eulerian",
                "url": "https://www.infoarena.ro/problema/ciclueuler",
                "desc": "Clasica O(M)"
            }
        ],
        "medium": [
            {
                "title": "Reconstruct Itinerary",
                "url": "https://leetcode.com/problems/reconstruct-itinerary/",
                "desc": "Drum Eulerian cu Sortare Lexicografică"
            }
        ],
        "hard": [
            {
                "title": "Hamiltonian Path (TSP)",
                "url": "https://www.infoarena.ro/problema/tsp",
                "desc": "Traveling Salesman Bitmask DP"
            }
        ]
    }
},
  "Graphs/Shortest_Paths": {
    "presentation": "Pentru a găsi cel mai scurt drum (când muchiile au ponderi), BFS nu mai funcționează. Avem nevoie de:\\n\\n1. **Algoritmul lui Dijkstra**: Găsește drumurile minime de la un nod sursă la toate celelalte. Funcționează doar pentru ponderi $\\\\ge 0$. Folosește un Priority Queue (Min-Heap).\\n2. **Algoritmul Bellman-Ford**: Poate gestiona ponderi negative. Iterează relaxarea muchiilor de V-1 ori. Poate și detecta Cicluri de Cost Negativ!\\n3. **Floyd-Warshall**: Găsește drumul minim între *orice pereche* de noduri (All-Pairs Shortest Path) folosind Programare Dinamică. Simplu de scris (3 for-uri).",
    "complexity": "Dijkstra: O(E log V) (cu Priority Queue).\\nBellman-Ford: O(V * E).\\nFloyd-Warshall: O(V^3). (E bun doar pentru V $\\\\le$ 400).",
    "variations": "A* Search (A-Star) - o extensie a lui Dijkstra care folosește o euristică pentru a ghida căutarea mai rapid către destinație (folosit extensiv în jocuri video).",
    "applications": "Navigație GPS (Google Maps folosește variații ultra-optimizate de Dijkstra/A* numite Contraction Hierarchies), rutingul pachetelor de rețea pe internet (OSPF).",
    "code": "#include <iostream>\n#include <vector>\n#include <queue>\n\nusing namespace std;\nconst int INF = 1e9;\n\nstruct Edge { int to, weight; };\n\nvoid dijkstra(int start, int V, vector<vector<Edge>>& adj) {\n    vector<int> dist(V, INF);\n    // priority_queue min-heap: stocheaza perechi (distanta, nod)\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    \n    dist[start] = 0;\n    pq.push({0, start});\n    \n    while (!pq.empty()) {\n        int d = pq.top().first;\n        int u = pq.top().second;\n        pq.pop();\n        \n        // Optimizare vitala: daca am gasit un drum mai bun in trecut, oprim ramura\n        if (d > dist[u]) continue;\n        \n        for (Edge e : adj[u]) {\n            if (dist[u] + e.weight < dist[e.to]) {\n                dist[e.to] = dist[u] + e.weight;\n                pq.push({dist[e.to], e.to});\n            }\n        }\n    }\n    \n    for (int i = 0; i < V; i++) cout << \"0 -> \" << i << \" : \" << dist[i] << \"\\n\";\n}\n\nint main() {\n    int V = 5;\n    vector<vector<Edge>> adj(V);\n    // Muchii orientate ponderate\n    adj[0].push_back({1, 10}); adj[0].push_back({2, 3});\n    adj[1].push_back({3, 2});\n    adj[2].push_back({1, 1}); adj[2].push_back({3, 8}); adj[2].push_back({4, 2});\n    adj[4].push_back({3, 9});\n    \n    dijkstra(0, V, adj);\n    return 0;\n}",
    "explanations": [
        {
            "line": 11,
            "text": "Inițializăm vectorul de distanțe cu INF (Infinit), cu excepția nodului start care e 0.",
            "blocksVisual": [
                {
                    "label": "Distanțe",
                    "groups": [
                        [
                            {
                                "val": "0: 0",
                                "active": true
                            },
                            {
                                "val": "1: INF"
                            },
                            {
                                "val": "2: INF"
                            },
                            {
                                "val": "3: INF"
                            },
                            {
                                "val": "4: INF"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 13,
            "text": "Creăm un Min-Heap pentru a extrage mereu cel mai apropiat nod nevizitat în timp O(log V).",
            "blocksVisual": [
                {
                    "label": "Min Heap",
                    "groups": [
                        [
                            {
                                "val": "pq = [{0, 0}]"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 20,
            "text": "Extragem (dist=0, nod=0).",
            "blocksVisual": [
                {
                    "label": "Nod curent",
                    "groups": [
                        [
                            {
                                "val": "Nod 0",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 26,
            "text": "Analizăm muchiile lui 0: (0->1, cost 10) și (0->2, cost 3).",
            "blocksVisual": [
                {
                    "label": "Relaxare",
                    "groups": [
                        [
                            {
                                "val": "Relaxăm vecinii",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 27,
            "text": "Verificăm Relaxarea: (dist[0] + 10) < INF. Da! Actualizăm dist[1] = 10.",
            "blocksVisual": [
                {
                    "label": "Distanțe",
                    "groups": [
                        [
                            {
                                "val": "1: 10",
                                "active": true
                            },
                            {
                                "val": "2: 3",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 29,
            "text": "Punem perechile {10, 1} și {3, 2} în Min-Heap. Heap-ul aduce la suprafață {3, 2}.",
            "blocksVisual": [
                {
                    "label": "Min Heap",
                    "groups": [
                        [
                            {
                                "val": "{3, 2}"
                            },
                            {
                                "val": "{10, 1}"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 20,
            "text": "Extragem {3, 2}. Ne aflăm la nodul 2 (care a fost descoperit cu distanța minimă de 3). Vecinii sunt 1 (cost 1), 3 (cost 8), 4 (cost 2).",
            "blocksVisual": [
                {
                    "label": "Nod curent",
                    "groups": [
                        [
                            {
                                "val": "Nod 2",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 27,
            "text": "Relaxăm (2->1, cost 1): 3 + 1 = 4. Mai bun decât vechiul 10? DA! Noul dist[1] devine 4.",
            "blocksVisual": [
                {
                    "label": "Distanțe",
                    "groups": [
                        [
                            {
                                "val": "1: 4",
                                "active": true
                            },
                            {
                                "val": "2: 3"
                            },
                            {
                                "val": "3: 11",
                                "active": true
                            },
                            {
                                "val": "4: 5",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 29,
            "text": "Băgăm noul drum pentru 1 în Heap: {4, 1}.",
            "blocksVisual": [
                {
                    "label": "Min Heap",
                    "groups": [
                        [
                            {
                                "val": "{4, 1}"
                            },
                            {
                                "val": "{5, 4}"
                            },
                            {
                                "val": "{10, 1}(vechi)"
                            },
                            {
                                "val": "{11, 3}"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "La extragerea stării vechi {10, 1}, condiția `d > dist[u]` se va prinde că am găsit deja ceva mai bun (4) și o va ignora. Aceasta e optimizarea vitală pentru Dijkstra pe cozi de priorități!",
            "blocksVisual": [
                {
                    "label": "Optimizare",
                    "groups": [
                        [
                            {
                                "val": "Ignoră stări slabe",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 34,
            "text": "La final afișăm drumurile.",
            "blocksVisual": [
                {
                    "label": "Finalizat",
                    "groups": [
                        [
                            {
                                "val": "0: 0, 1: 4, 2: 3, 3: 6, 4: 5",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Dijkstra",
                "url": "https://www.infoarena.ro/problema/dijkstra",
                "desc": "Clasica Dijkstra"
            },
            {
                "title": "Bellman-Ford",
                "url": "https://www.infoarena.ro/problema/bellmanford",
                "desc": "Drumuri negative"
            }
        ],
        "medium": [
            {
                "title": "Network Delay Time",
                "url": "https://leetcode.com/problems/network-delay-time/",
                "desc": "Dijkstra Basic"
            },
            {
                "title": "Floyd-Warshall",
                "url": "https://www.infoarena.ro/problema/royfloyd",
                "desc": "Roy-Floyd (V^3)"
            }
        ],
        "hard": [
            {
                "title": "Cheapest Flights Within K Stops",
                "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
                "desc": "Bellman-Ford Relaxări K pași"
            }
        ]
    }
},
  "Advanced_Graphs/Max_Flow": {
    "presentation": "Fluxul Maxim (Maximum Flow) ne cere să determinăm ce cantitate maximă de materie (apă, date, pachete, curent) putem trimite de la un nod Sursă (Source) la un nod Destinație (Sink) într-o rețea unde muchiile au 'capacități' limitate.\\n\\nAlgoritmul Edmonds-Karp e o specializare a metodei Ford-Fulkerson. El caută cel mai scurt drum de la sursă la destinație (ca număr de muchii, folosind BFS) pe care încă mai e spațiu liber, calculează cât spațiu ('bottleneck') are acel drum, scade acel flux din muchiile normale și adaugă flux pe muchiile 'reziduale' (muchii virtuale în direcția opusă). Muchiile reziduale permit algoritmului să 'anuleze' decizii luate anterior.\\n\\nTeorema Max Flow - Min Cut: Fluxul maxim din rețea este exact egal cu capacitatea celei mai mici tăieturi (muchii șterse) care separă Sursa de Destinație.",
    "complexity": "Edmonds-Karp: O(V * E^2). Deoarece drumurile sunt găsite prin BFS, lungimea drumului de creștere crește mereu, garantând terminarea.\\nDinic: O(V^2 * E). Mult mai rapid în practică (construiește level graphs și face blocking flows cu DFS).",
    "variations": "Bipartite Matching (Cuplaj Maxim în graf Bipartit): Se poate reduce la un Max Flow punând o sursă superioară și o destinație superioară. Circulații cu cereri (flux care trebuie să fie într-un anume interval).",
    "applications": "Asignarea de joburi la angajați (Bipartite Matching), optimizarea rețelelor de transport feroviar/aero, planificarea evacuărilor de urgență.",
    "code": "#include <iostream>\n#include <vector>\n#include <queue>\n#include <algorithm>\n\nusing namespace std;\nconst int INF = 1e9;\n\nint bfs(int s, int t, vector<int>& parent, vector<vector<int>>& adj, vector<vector<int>>& capacity) {\n    fill(parent.begin(), parent.end(), -1);\n    parent[s] = -2;\n    queue<pair<int, int>> q;\n    q.push({s, INF});\n\n    while (!q.empty()) {\n        int cur = q.front().first;\n        int flow = q.front().second;\n        q.pop();\n\n        for (int next : adj[cur]) {\n            if (parent[next] == -1 && capacity[cur][next] > 0) {\n                parent[next] = cur;\n                int new_flow = min(flow, capacity[cur][next]);\n                if (next == t) return new_flow; // Gata\n                q.push({next, new_flow});\n            }\n        }\n    }\n    return 0; // Nu mai sunt drumuri\n}\n\nint edmondsKarp(int s, int t, int V, vector<vector<int>>& adj, vector<vector<int>>& capacity) {\n    int flow = 0;\n    vector<int> parent(V);\n    int new_flow;\n\n    while ((new_flow = bfs(s, t, parent, adj, capacity)) > 0) {\n        flow += new_flow;\n        int cur = t;\n        while (cur != s) {\n            int prev = parent[cur];\n            capacity[prev][cur] -= new_flow; // Reducem capacitatea muchiei\n            capacity[cur][prev] += new_flow; // Adaugam pe muchia reziduala!\n            cur = prev;\n        }\n    }\n    return flow;\n}\n\nint main() {\n    int V = 6;\n    vector<vector<int>> adj(V);\n    vector<vector<int>> cap(V, vector<int>(V, 0));\n\n    auto add_edge = [&](int u, int v, int c) {\n        adj[u].push_back(v);\n        adj[v].push_back(u); // Muchia reziduala\n        cap[u][v] += c;\n    };\n\n    // S=0, T=5\n    add_edge(0, 1, 16); add_edge(0, 2, 13);\n    add_edge(1, 2, 10); add_edge(1, 3, 12);\n    add_edge(2, 1, 4);  add_edge(2, 4, 14);\n    add_edge(3, 2, 9);  add_edge(3, 5, 20);\n    add_edge(4, 3, 7);  add_edge(4, 5, 4);\n\n    cout << \"Max Flow: \" << edmondsKarp(0, 5, V, adj, cap) << \"\\n\";\n    return 0;\n}",
    "explanations": [
        {
            "line": 36,
            "text": "Edmonds-Karp va continua să ruleze un BFS cât timp găsește un drum pe care mai încăpea flux de la Sursă la Destinație (Drum de Creștere).",
            "blocksVisual": [
                {
                    "label": "Algoritm Principal",
                    "groups": [
                        [
                            {
                                "val": "BFS Loop",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 9,
            "text": "BFS-ul stochează pentru fiecare nod atât sursa din care s-a venit (vectorul `parent`), cât și cel mai restrâns 'gâtuire' (bottleneck flow) de până acum pe acel drum.",
            "blocksVisual": [
                {
                    "label": "BFS Stare",
                    "groups": [
                        [
                            {
                                "val": "Coadă",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 21,
            "text": "Când explorăm un vecin, verificăm `capacity[cur][next] > 0`. Pe muchia inițială, asta e capacitatea reală. Pe muchia Inversă, va fi fluxul anulat.",
            "blocksVisual": [
                {
                    "label": "Verificare Capacitate",
                    "groups": [
                        [
                            {
                                "val": "Cap > 0",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 23,
            "text": "Noul bottleneck e MIN dintre bottleneck-ul anterior și capacitatea muchiei curente.",
            "blocksVisual": [
                {
                    "label": "Bottleneck Min",
                    "groups": [
                        [
                            {
                                "val": "min(flow, cap)"
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 24,
            "text": "Dacă am atins destinația T, ne oprim imediat din BFS și returnăm cât flux încape pe tot drumul. Nu e nevoie să parcurgem tot graful.",
            "blocksVisual": [
                {
                    "label": "Spre T",
                    "groups": [
                        [
                            {
                                "val": "Găsit t!",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 39,
            "text": "Acum că avem un drum cu capacitatea `new_flow`, reconstituim calea parcurgând din tată în tată din Destinație până în Sursă.",
            "blocksVisual": [
                {
                    "label": "Reconstituire",
                    "groups": [
                        [
                            {
                                "val": "Cur -> Sursă",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 41,
            "text": "Scădem fluxul din capacitatea normală (spațiul liber se reduce).",
            "blocksVisual": [
                {
                    "label": "Reducere Cap",
                    "groups": [
                        [
                            {
                                "val": "cap -= new_flow",
                                "active": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 42,
            "text": "SECRETUL MAX FLOW: Adăugăm aceeași valoare pe MUCHIA REZIDUALĂ (în sens invers). Astfel, la iterațiile viitoare, un alt drum va putea 'trimite înapoi' acest flux, corectând o greșeală din trecut!",
            "blocksVisual": [
                {
                    "label": "Muchia Reziduală",
                    "groups": [
                        [
                            {
                                "val": "cap_inv += new_flow",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        },
        {
            "line": 46,
            "text": "Când BFS nu mai găsește NICIUN drum > 0, înseamnă că am pompat la maxim. Returnăm `flow` total, care în acest exemplu este 23.",
            "blocksVisual": [
                {
                    "label": "Finalizat",
                    "groups": [
                        [
                            {
                                "val": "Total: 23",
                                "sorted": true
                            }
                        ]
                    ]
                }
            ]
        }
    ],
    "problems": {
        "easy": [
            {
                "title": "Max Flow",
                "url": "https://www.infoarena.ro/problema/maxflow",
                "desc": "Problema clasică"
            }
        ],
        "medium": [
            {
                "title": "Cuplaj Maxim in Graf Bipartit",
                "url": "https://www.infoarena.ro/problema/cuplaj",
                "desc": "Edmonds Karp adaptat"
            }
        ],
        "hard": [
            {
                "title": "Maximum Flow (Dinic)",
                "url": "https://www.spoj.com/problems/FASTFLOW/",
                "desc": "Edmonds Karp da TLE, cere Dinic O(V^2 E)"
            }
        ]
    }
},
};