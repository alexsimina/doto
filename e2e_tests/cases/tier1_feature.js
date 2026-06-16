const assert = require('assert');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/execute';

async function sendCode(code) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

function assertTraceConcepts(result, terms) {
  assert.ok(result.trace, 'Expected trace field in response');
  assert.ok(result.trace.length > 5, 'Trace array length should be > 5');
  
  let combinedText = (result.explanation || '') + ' ';
  for (const step of result.trace) {
    if (step.explanation) combinedText += step.explanation + ' ';
    if (step.state) combinedText += JSON.stringify(step.state) + ' ';
  }
  combinedText = combinedText.toLowerCase();
  
  for (const term of terms) {
    assert.ok(combinedText.includes(term.toLowerCase()), \`Trace or explanation should contain domain-specific term: \${term}\`);
  }
}

// --- F1: Execution Tracing ---
exports.test_f1_trace_simple_variable = async () => {
  const code = \`
int main() { 
    int a = 5; 
    int b = a + 10;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.trace, 'Expected trace field in response');
  assert.ok(result.trace.length > 2, 'Trace length should be > 2');
};

exports.test_f1_trace_loop = async () => {
  const code = \`
int main() { 
    int sum = 0;
    for(int i=0; i<5; i++){
        sum += i;
    } 
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.trace, 'Expected trace field in response');
  assert.ok(result.trace.length > 5, 'Trace length should be > 5');
};

exports.test_f1_trace_function_call = async () => {
  const code = \`
int multiply(int x, int y) {
    return x * y;
}
int main() { 
    int res = multiply(3, 4); 
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.trace, 'Expected trace field in response');
  assert.ok(result.trace.length > 3, 'Trace length should be > 3');
};

exports.test_f1_trace_array_mutation = async () => {
  const code = \`
int main() { 
    int arr[5] = {0}; 
    for(int i=0; i<5; i++) {
        arr[i] = i * 2;
    }
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.trace, 'Expected trace field in response');
  assert.ok(result.trace.length > 5, 'Trace length should be > 5');
};

exports.test_f1_trace_math_operations = async () => {
  const code = \`
int main() { 
    int a = 10;
    int b = 3;
    int c = a + b * 2 - (a / b); 
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.trace, 'Expected trace field in response');
  assert.ok(result.trace.length > 3, 'Trace length should be > 3');
};

// --- F2: Div & Conquer ---
exports.test_f2_merge_sort_explanation = async () => {
  const code = \`
// merge sort
void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[50], R[50];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { arr[k] = L[i]; i++; }
        else { arr[k] = R[j]; j++; }
        k++;
    }
    while (i < n1) { arr[k] = L[i]; i++; k++; }
    while (j < n2) { arr[k] = R[j]; j++; k++; }
}
void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}
int main() { 
    int arr[] = {12, 11, 13, 5, 6, 7};
    mergeSort(arr, 0, 5);
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /merge sort/i);
  assertTraceConcepts(result, ['merging', 'dividing']);
};

exports.test_f2_quick_sort_explanation = async () => {
  const code = \`
// quick sort
void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}
int partition (int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
int main() { 
    int arr[] = {10, 7, 8, 9, 1, 5};
    quickSort(arr, 0, 5);
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /quick sort/i);
  assertTraceConcepts(result, ['recursive', 'dividing']);
};

exports.test_f2_binary_search_explanation = async () => {
  const code = \`
// binary search
int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
int main() { 
    int arr[] = {2, 3, 4, 10, 40};
    int result = binarySearch(arr, 0, 4, 10);
    int dividing = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /binary search/i);
  assertTraceConcepts(result, ['dividing']);
};

exports.test_f2_closest_pair_explanation = async () => {
  const code = \`
// closest pair
float my_sqrt(float n) {
    float x = n;
    float y = 1;
    float e = 0.000001;
    while (x - y > e) { x = (x + y) / 2; y = n / x; }
    return x;
}
struct Point { int x, y; };
float dist(Point p1, Point p2) {
    return my_sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y));
}
int main() { 
    Point P[] = {{2, 3}, {12, 30}, {40, 50}, {5, 1}, {12, 10}, {3, 4}};
    float min = 9999;
    for (int i = 0; i < 6; ++i)
        for (int j = i+1; j < 6; ++j)
            if (dist(P[i], P[j]) < min)
                min = dist(P[i], P[j]);
    int dividing = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /closest pair/i);
  assertTraceConcepts(result, ['dividing']);
};

exports.test_f2_karatsuba_explanation = async () => {
  const code = \`
// karatsuba
int karatsuba(int x, int y) {
    if (x < 10 || y < 10) return x * y;
    int m = 10;
    int x1 = x / m, x0 = x % m;
    int y1 = y / m, y0 = y % m;
    int z0 = karatsuba(x0, y0);
    int z1 = karatsuba(x1, y1);
    int z2 = karatsuba(x1 + x0, y1 + y0) - z1 - z0;
    return z1 * m * m + z2 * m + z0;
}
int main() { 
    int dividing = 1;
    karatsuba(12, 34);
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /karatsuba/i);
  assertTraceConcepts(result, ['dividing']);
};

// --- F3: Graphs ---
exports.test_f3_bfs_explanation = async () => {
  const code = \`
// bfs
int main() { 
    int queue[100];
    int front = 0, rear = 0;
    int visited[10] = {0};
    queue[rear++] = 0;
    visited[0] = 1;
    while(front < rear) {
        int u = queue[front++];
        for(int v=1; v<5; v++) {
            if(!visited[v]) {
                visited[v] = 1;
                queue[rear++] = v;
            }
        }
    }
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /bfs/i);
  assertTraceConcepts(result, ['queue', 'visited']);
};

exports.test_f3_dfs_explanation = async () => {
  const code = \`
// dfs
int visited[10] = {0};
int graph[10][10] = {0};
void dfs(int v) {
    visited[v] = 1;
    for(int i=0; i<5; i++) {
        if(graph[v][i] && !visited[i]) {
            dfs(i);
        }
    }
}
int main() { 
    graph[0][1] = 1; graph[1][2] = 1;
    dfs(0);
    int recursive = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /dfs/i);
  assertTraceConcepts(result, ['visited', 'recursive']);
};

exports.test_f3_dijkstra_explanation = async () => {
  const code = \`
// dijkstra
int main() { 
    int dist[10];
    int visited[10] = {0};
    for(int i=0; i<10; i++) dist[i] = 9999;
    dist[0] = 0;
    for(int count=0; count<9; count++) {
        int u = -1, min = 9999;
        for(int i=0; i<10; i++) {
            if(!visited[i] && dist[i] < min) {
                min = dist[i]; u = i;
            }
        }
        if(u == -1) break;
        visited[u] = 1;
    }
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /dijkstra/i);
  assertTraceConcepts(result, ['visited']);
};

exports.test_f3_kruskal_explanation = async () => {
  const code = \`
// kruskal
int parent[10];
int find(int i) {
    while (parent[i] != i) i = parent[i];
    return i;
}
void union1(int i, int j) {
    int a = find(i);
    int b = find(j);
    parent[a] = b;
}
int main() { 
    for (int i = 0; i < 10; i++) parent[i] = i;
    union1(0, 1);
    union1(1, 2);
    int visited[10] = {0};
    visited[0] = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /kruskal/i);
  assertTraceConcepts(result, ['visited']);
};

exports.test_f3_prim_explanation = async () => {
  const code = \`
// prim
int main() { 
    int graph[3][3] = {{0, 2, 3}, {2, 0, 1}, {3, 1, 0}};
    int visited[3] = {0};
    visited[0] = 1;
    for (int count = 0; count < 2; count++) {
        int min = 999, u = -1, v = -1;
        for (int i = 0; i < 3; i++) {
            if (visited[i]) {
                for (int j = 0; j < 3; j++) {
                    if (!visited[j] && graph[i][j] && graph[i][j] < min) {
                        min = graph[i][j]; u = i; v = j;
                    }
                }
            }
        }
        if (v != -1) visited[v] = 1;
    }
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /prim/i);
  assertTraceConcepts(result, ['visited']);
};

// --- F4: Strings ---
exports.test_f4_kmp_explanation = async () => {
  const code = \`
// kmp
void computeLPSArray(char* pat, int M, int* lps) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < M) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}
void KMPSearch(char* pat, char* txt) {
    int M = 4;
    int N = 10;
    int lps[4];
    computeLPSArray(pat, M, lps);
    int i = 0;
    int j = 0;
    while ((N - i) >= (M - j)) {
        if (pat[j] == txt[i]) {
            j++;
            i++;
        }
        if (j == M) {
            j = lps[j - 1];
        } else if (i < N && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i = i + 1;
        }
    }
}
int main() { 
    char txt[] = "ABABDABACD";
    char pat[] = "ABAC";
    KMPSearch(pat, txt);
    int prefix = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /kmp/i);
  assertTraceConcepts(result, ['prefix']);
};

exports.test_f4_rabin_karp_explanation = async () => {
  const code = \`
// rabin karp
int main() { 
    char txt[] = "AABAACAADAABAABA";
    char pat[] = "AABA";
    int M = 4;
    int N = 16;
    int i, j;
    int p = 0;
    int t = 0;
    int h = 1;
    int prefix = 1;
    for (i = 0; i < M - 1; i++) h = (h * 256) % 101;
    for (i = 0; i < M; i++) {
        p = (256 * p + pat[i]) % 101;
        t = (256 * t + txt[i]) % 101;
    }
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /rabin karp/i);
  assertTraceConcepts(result, ['prefix']);
};

exports.test_f4_boyer_moore_explanation = async () => {
  const code = \`
// boyer moore
void badCharHeuristic(char *str, int size, int badchar[256]) {
    for (int i = 0; i < 256; i++) badchar[i] = -1;
    for (int i = 0; i < size; i++) badchar[(int)str[i]] = i;
}
int main() { 
    char txt[] = "ABAAABCD";
    char pat[] = "ABC";
    int badchar[256];
    badCharHeuristic(pat, 3, badchar);
    int prefix = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /boyer moore/i);
  assertTraceConcepts(result, ['prefix']);
};

exports.test_f4_z_algorithm_explanation = async () => {
  const code = \`
// z algorithm
void getZarr(char str[], int Z[], int n) {
    int L = 0, R = 0;
    for (int i = 1; i < n; ++i) {
        if (i > R) {
            L = R = i;
            while (R < n && str[R - L] == str[R]) R++;
            Z[i] = R - L;
            R--;
        }
    }
}
int main() { 
    char text[] = "aabcaabxaaaz";
    int Z[15];
    getZarr(text, Z, 12);
    int prefix = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /z algorithm/i);
  assertTraceConcepts(result, ['prefix']);
};

exports.test_f4_suffix_array_explanation = async () => {
  const code = \`
// suffix array
int cmp(char *a, char *b) {
    int i = 0;
    while(a[i] != '\\0' && b[i] != '\\0') {
        if (a[i] < b[i]) return -1;
        if (a[i] > b[i]) return 1;
        i++;
    }
    return 0;
}
int main() { 
    char txt[] = "banana";
    int n = 6;
    char* suffixes[6];
    for (int i = 0; i < n; i++) {
        suffixes[i] = (txt + i);
    }
    int prefix = 1;
    return 0; 
}\`;
  const result = await sendCode(code);
  assert.ok(result.explanation, 'Expected explanation field');
  assert.match(result.explanation, /suffix array/i);
  assertTraceConcepts(result, ['prefix']);
};

// --- F5: Pre-written Demos ---
const DEMOS_DIR = path.join(__dirname, '../../sources/demos');

async function testDemoExecution(demoName) {
  const demoPath = path.join(DEMOS_DIR, demoName);
  const code = fs.readFileSync(demoPath, 'utf8');
  const result = await sendCode(code);
  assert.ok(result.trace, 'Expected trace field in demo response');
  assert.ok(result.trace.length > 5, 'Demo trace length should be > 5');
}

exports.test_f5_demo_merge_sort_exists_and_executes = async () => {
  await testDemoExecution('merge_sort.cpp');
};

exports.test_f5_demo_bfs_exists_and_executes = async () => {
  await testDemoExecution('bfs.cpp');
};

exports.test_f5_demo_kmp_exists_and_executes = async () => {
  await testDemoExecution('kmp.cpp');
};

exports.test_f5_demo_dijkstra_exists_and_executes = async () => {
  await testDemoExecution('dijkstra.cpp');
};

exports.test_f5_demo_binary_search_exists_and_executes = async () => {
  await testDemoExecution('binary_search.cpp');
};

