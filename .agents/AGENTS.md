# Project Overview (Agent Context)

This file is intended for AI agents to quickly understand the structure, architecture, and purpose of the `doto` workspace. When handling user requests, please refer to this document for context on where to find specific components or where to place new ones.

## 📂 Directory Structure

The workspace is divided into several main components:

### 1\. `/backend` (Node.js Server)

Contains the server-side logic, API endpoints, code execution environments, and recommendations.

* `server.js`: The main entry point for the backend server.
* `evaluator.js`: Logic for evaluating code/algorithms.
* `recommendation.js`: Logic for generating user recommendations.
* `database.json`: Local database / mock data file.
* `/execution`: Directory likely used for isolated code execution or running test tasks.

### 2\. `/dashboard` (React + Vite Frontend)

Contains the user interface, likely a web dashboard for the application. Built with React and Vite.

* `/src/App.jsx` \& `/src/main.jsx`: Core application entry points.
* `/src/components/`: Reusable React components.

  * `CategoryPresentation.jsx`: Main modal rendering when a syllabus node is clicked. Houses the CLion-style debugger and tabbed workspace.
  * `CodeDemonstrator.jsx`: Debugger code demonstrator component.
* `/src/data/`: Data structures, constants, or mock data for the frontend.

  * `/src/data/categories/`: Algorithm and data structure content files.
* `/src/App.css` \& `/src/index.css`: Styling files (note: standard CSS, adhere to the styling conventions present).

### 3\. `/extension` (Chrome Extension)

A browser extension associated with the project.

* `manifest.json`: Configuration for the Chrome extension.
* `background.js`: Service worker / background script.
* `content.js` / `content-styles.css`: Injected content scripts and their corresponding styles.

### 4\. `/e2e\\\_tests` (End-to-End Tests)

Testing framework and cases for the application.

* `runner.js`: The main test runner script.
* `/cases/`: Directory containing specific E2E test cases.

### 5\. `/validation\\\_tools` (Validation Scripts)

Scripts to validate the syntax, structure, and execution of category configuration JS files.

* `validate\\\_syntax.cjs`: Syntax and structural validation tool for category data configuration JS files.
* `bracket\\\_counter.cjs`: Helper script to count and match brackets and strings in files.

### 6\. Root Directory (`/`) Data \& Scripts

The root contains numerous CommonJS (`.cjs`) utility scripts and JSON data files. These are primarily used for processing, parsing, fixing, and injecting algorithmic and mathematical content.

\---

## 🛠 Guidelines for Agents

1. **Frontend Changes**: Always look in `/dashboard/src/`. Component modifications go into `/components`. Follow the existing design aesthetics (Vanilla CSS).
2. **Backend/API Changes**: Look in `/backend`.
3. **Extension Modifications**: Look in `/extension`. Ensure `manifest.json` permissions align with your changes.
4. **Content Generation / Scripting**: If the user asks to modify algorithmic content (like Graphs, Math, Divide \& Conquer), check the `.cjs` and `.json` data files in the root folder, or verify if they map to `/dashboard/src/data/`.
5. **Aesthetics \& UI Constraints**:

   * **No Glassmorphism**: Do not use `backdrop-filter` or highly translucent panels in explanation popups/modals. Use solid dark themes.
   * **No 3D Animations**: Do not use 3D transitions or spring layouts. Modal entries must use simple 2D animations (e.g. `@keyframes simpleSlideUp`).
   * **CLion/IDE Dark Palette**: Use solid backgrounds like `#1e1f22` (CLion editor), `#1a1b1d` (IDE panels), and `#2b2d30` (borders/active areas).
6. **CLion Debugger Layout \& Logic**:

   * **Left Pane (Code Editor)**: Syntax highlighted using the custom C++ tokenizer `highlightCpp`. Displays line numbers and CLion-style **inline variables** (e.g., `// max\\\_val: 10`) next to the code line.
   * **Vertical Control Strip**: Standard CLion debugger controls: Resume `▶`, Step Over `↷`, Step Back `↶`, Stop/Reset `■`, Run to End `⏭`.
   * **Right Pane (Tabbed Workspace)**:

     * **Debugger Tab**: Shows Call Stack Frames list and expandable tree-view of active Variables (supporting typings, e.g. `int`, `std::vector<int>`, etc.).
     * **State Visualizer Tab**: Renders graphic elements like lists, trees, graphs, and matrices.
     * **Console Tab**: Collects step-by-step logs from the debugger run.
7. **Category Debugger States**:

   * Instead of hardcoding debugger states inside `CategoryPresentation.jsx`, each custom topic contains a `"debugger"` block directly in its JS data file.
   * The frontend reads state details dynamically via `data?.debugger` or static variables from `data?.globalVars`.
   * For all other categories without a custom debugger block, a **dynamic regex parser** fallback in `CategoryPresentation.jsx` extracts variables from the explanation text (matching patterns like `name = value`, `name este value`, `name devine value`) to populate the Variables list and inline labels.
8. **Polymorphic Database Schemas (Matrices/Arrays)**:

   * Handle variations in matrix definitions gracefully. Matrix representations inside data files might use `matrix.data` or `matrix.rows`.
   * Cells in the matrix/array can be primitives (e.g., `5`) or objects (e.g., `{ val: 5 }`). Always use defensive checks (like `cell \\\&\\\& typeof cell === 'object' ? cell.val : cell`) to avoid React render crashes (`Objects are not valid as a React child`).
9. **Dynamic Graph \& Tree Visualizations**:

   * Graph Theory topics (except Basics which has static definitions) generate their visualizations dynamically using the `getGraphVisual(stepIndex)` function in their `"debugger"` block.
   * This function returns an object structured as:

```javascript
     {
       directed: boolean, // true for directed graphs (with arrows), false for undirected
       title: string,     // Optional title (e.g., "Graf Transpus")
       nodes: Array<{ id, x, y, label, state?: 'active'|'visited', desc?: string }>,
       edges: Array<{ source, target, weight?: number|string, active?: boolean }>
     }
     ```

   \* Node and edge highlight states (`active`, `visited`) and edge weights/labels are calculated dynamically based on the current step's variables.
   \* \*\*Segment Tree \\\& Tree/Graph DP Visualizations\*\*: This same dynamic graph model is used to represent tree structures like \*\*Segment Trees\*\* and trees/graphs in \*\*Dynamic Programming\*\* (e.g., DP on Trees/Graphs). For Segment Trees, node intervals (e.g., `\\\[start..end]`) are rendered above each node using the `desc` property. In Tree/Graph DP, this `desc` property is highly recommended to show subproblem intervals, active states, or calculated DP values for specific tree nodes/intervals.
   \* \*\*Dynamic Titles for Trees\*\*: The UI dynamically resolves tree categories to render clean titles in the graph header. Segment Trees show `"Arbore de Intervale"`, DP on Trees/Graphs shows `"Arbore / DP pe Arbori"`, and other tree topics show `"Structură de Arbore"`, separating them from standard `"Graf Orientat"` / `"Graf Neorientat"`.
10. \*\*Transitional Chapters\*\*: Categories that act as transitions to sub-algorithms (e.g., Shortest Path branching into Dijkstra, Bellman-Ford) are automatically detected in `CategoryPresentation.jsx` based on the presence of subcategories. For these, the UI hides the code and problem sections and instead displays a "Subcapitole / Algoritmi" interactive grid.
11. \*\*Testing\*\*: E2E tests go to `/e2e\\\_tests`.
12. \*\*Math/LaTeX Delimiter Parsing \\\& Formatting\*\*:

    \* To support math formulas inside category descriptions and complexities without adding external rendering packages, `CategoryPresentation.jsx` runs a custom LaTeX-to-HTML parser inside `formatText`.
    \* It splits text by math delimiters (`$$...$$` for display math, `$` for inline math) and translates LaTeX commands (e.g., `\\\\to`, `\\\\cdot`, `\\\\le`, `\\\\ge`, `\\\\pi`, `\\\\Sigma`, `\\\\pmod`, `\\\\ll`, `\\\\gg`) to Unicode. Subscripts (`\\\_`) and superscripts (`^`) are compiled to `<sub>` and `<sup>` elements.
    \* All mathematical formulas are formatted in monospace (`var(--font-mono)`) and editor text color (`#a9b7c6`) to match the IDE design scheme.
    \* If new LaTeX symbols need to be supported, append them to the replacements array in `formatMathToHtml` using negative lookaheads `(?!\\\[a-zA-Z])` to avoid prefix conflicts (like `\\\\le` matching inside `\\\\left`).

\\---

## 📚 Syllabus Category Structure (Theory, Transition, and Algorithm Nodes)

Every topic in the syllabus tree corresponds to a JavaScript configuration file under `/dashboard/src/data/categories/` (e.g. `Basics.js`, `DFS.js`, `Shortest\\\_Path.js`). Each file must export a `data` object with the following structure depending on its type:

### 1\\. Theory Nodes (Noduri de Teorie)

Used to explain mathematical foundations or general concepts.

\* \*\*Fields\*\*:

  \* `presentation`: Detailed markdown text explaining the theory in Romanian, utilizing LaTeX notation (e.g., `$O(N \\\\log N)$` or `$\\\\sum$`) for math and complexities.
  \* `complexity`: Space and time complexity analysis in Romanian.
  \* `variations`: Alternate approaches, variants, and edge cases.
  \* `applications`: Real-world applications and use cases.
  \* `code`: C++ source code demonstrating the theory/algorithm (if applicable).
  \* `explanations`: Debugger simulation steps detailing state changes (if applicable).

### 2\\. Transition Nodes (Noduri de Tranziție)

Used as intermediate navigation hubs when a category branches into sub-topics (e.g. `Shortest\\\_Path` branching into Dijkstra, Bellman-Ford, Floyd-Warshall).

\* \*\*Fields\*\*:

  \* `presentation`, `complexity`, `variations`, `applications` describing the high-level topic.
  \* `code`: Must be set to an empty string (`""`).
  \* `explanations`: Must be set to an empty array (`\\\[]`).
  \* `problems`: A dictionary containing lists of practice problems grouped by difficulty:

\&#x20;   ```json
    {
      "easy": \\\[{ "title": "...", "url": "...", "desc": "..." }],
      "medium": \\\[{ "title": "...", "url": "...", "desc": "..." }],
      "hard": \\\[{ "title": "...", "url": "...", "desc": "..." }]
    }
    ```

### 3\\. Algorithm Nodes (Noduri de Algoritmi)

Concrete implementation of a specific algorithm with debugger steps.

\* \*\*Fields\*\*:

  \* Comprehensive `presentation`, `complexity`, `variations`, and `applications`.
  \* `code`: C++ source code.
  \* `explanations`: Array of step objects (typically 20+ steps) for the CLion-style debugger:

    \* `line`: The 1-indexed line number in `code` currently being executed.
    \* `text`: Detailed explanation of the step in Romanian.
    \* `blocksVisual` (Optional): Used to visualize 1D structures like arrays, vectors, stacks, queues, and DSU sets. Formatted as an array of rows:

```json
      \\\[
        {
          "label": "Stack (stive)", // Optional label (triggers Stack/Queue styling if containing those words)
          "groups": \\\[
            \\\[
              { "val": "10", "active": true, "sorted": false, "hidden": false }
            ]
          ]
        }
      ]
      ```

    \* `matrix` (Optional): Used to visualize 2D structures like DP tables, matrices, or Sparse Tables (RMQ). Formatted as:

```json
      {
        "title": "RMQ Table",
        "headers": \\\["", "0", "1", "2"],
        "rows": \\\[
          \\\["0", "1", "2", "3"]
        ]
      }
      ```

    \* \*\*Note on Multi-Visual Support\*\*: A single debugger step can contain \*\*multiple visualizations concurrently\*\* (e.g., combining `blocksVisual` for vector/stack visualization, `matrix` for DP state, and/or a dynamically generated graph from `getGraphVisual`). When multiple visualization keys exist at the same step, the frontend displays them stacked together (e.g., rendering both a vector/blocks layout and a graph vertically).
  \* `debugger` (Optional): A block containing custom execution trace handlers:

    \* `getDebuggerState(stepIndex, activeLine, explanationText)`: returns `{ vars, globalVars, frames, inlineVal }`.
    \* `getInlineValueForLine(stepIndex, lineNum)`: returns inline labels next to code lines.
    \* `getGraphVisual(stepIndex)`: returns dynamic graph configuration (used for Graph Theory topics).

\\---

## 🌳 Syllabus Tree Sections \\\& Topics

Below is the list of all domains (sections) and topics in the syllabus tree, mapped to their configuration files:

### 1\\. Math \\\& Geometry (ID: `math` | 🧮)

\* \*\*Math/Number\\\_Theory\*\* (Node ID: `math1`) — \[Number\\\_Theory.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math\_Geometry/Math/Number\_Theory.js)
\* \*\*Math/Combinatorics\*\* (Node ID: `comb`) — \[Combinatorics.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math\_Geometry/Math/Combinatorics.js)
\* \*\*Geometry/Computational\*\* (Node ID: `geom`) — \[Computational.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math\_Geometry/Geometry/Computational.js)
\* \*\*Math/Advanced\*\* (Node ID: `advmath`) — \[Advanced.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math\_Geometry/Math/Advanced.js)
\* \*\*Math/Game\\\_Theory\*\* (Node ID: `game\\\_theory`) — \[Game\\\_Theory.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math\_Geometry/Math/Game\_Theory.js)
\* \*\*Math/Linear\\\_Algebra\*\* (Node ID: `linalg`) — \[Linear\\\_Algebra.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math\_Geometry/Math/Linear\_Algebra.js)

### 2\\. Fundamentals (ID: `fund` | 📚)

\* \*\*Data\\\_Structures/Basics\*\* (Node ID: `ds\\\_basics`) — \[Basics.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Data\_Structures/Basics.js)
\* \*\*Arrays\*\* (Node ID: `arr`) — \[Arrays.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Arrays.js)
\* \*\*Sorting\*\* (Node ID: `sort`) — \[Sorting.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Sorting.js)
\* \*\*Techniques/Two\\\_Pointers\*\* (Node ID: `twoptr`) — \[Two\\\_Pointers.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Techniques/Two\_Pointers.js)

### 3\\. String Processing (ID: `str` | 🔤)

\* \*\*Strings\*\* (Node ID: `str`) — \[Strings.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String\_Processing/Strings.js)
\* \*\*Strings/Trie\*\* (Node ID: `trie`) — \[Trie.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String\_Processing/Strings/Trie.js)
\* \*\*Strings/KMP\*\* (Node ID: `kmp`) — \[KMP.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String\_Processing/Strings/KMP.js)
\* \*\*Strings/Aho\\\_Corasick\*\* (Node ID: `aho`) — \[Aho\\\_Corasick.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String\_Processing/Strings/Aho\_Corasick.js)
\* \*\*Strings/Suffix\\\_Structures\*\* (Node ID: `suffix`) — \[Suffix\\\_Structures.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String\_Processing/Strings/Suffix\_Structures.js)

### 4\\. Dynamic Programming (ID: `dp` | 🧠)

\* \*\*Dynamic\\\_Programming\*\* (Node ID: `dp`) — \[Dynamic\\\_Programming.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Dynamic\_Programming.js)
\* \*\*Dynamic\\\_Programming/Knapsack\*\* (Node ID: `dp\\\_knapsack`) — \[Knapsack.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Dynamic\_Programming/Knapsack.js)
\* \*\*Dynamic\\\_Programming/LCS\*\* (Node ID: `dp\\\_lcs`) — \[LCS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Dynamic\_Programming/LCS.js)
\* \*\*Dynamic\\\_Programming/LIS\*\* (Node ID: `dp\\\_lis`) — \[LIS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Dynamic\_Programming/LIS.js)
\* \*\*Advanced\\\_DP/Trees\\\_Graphs\*\* (Node ID: `dp\\\_trees`) — \[Trees\\\_Graphs.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Advanced\_DP/Trees\_Graphs.js)
\* \*\*Advanced\\\_DP/Exponential\\\_States\*\* (Node ID: `dp\\\_exp`) — \[Exponential\\\_States.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Advanced\_DP/Exponential\_States.js)
\* \*\*Advanced\\\_DP/CHT\*\* (Node ID: `cht`) — \[CHT.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic\_Programming/Advanced\_DP/CHT.js)

### 5\\. Core Algorithms (ID: `alg` | ⚡)

\* \*\*Alg/Backtracking\*\* (Node ID: `bkt`) — \[Backtracking.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Backtracking.js)
\* \*\*Alg/Greedy\*\* (Node ID: `greedy`) — \[Greedy.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Greedy.js)
\* \*\*Alg/Divide\\\_Conquer\*\* (Node ID: `dq`) — \[Divide\\\_Conquer.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Divide\_Conquer.js)
\* \*\*Alg/Divide\\\_Conquer/Binary\\\_Search\*\* (Node ID: `dq\\\_bin`) — \[Binary\\\_Search.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Divide\_Conquer/Binary\_Search.js)
\* \*\*Alg/Divide\\\_Conquer/Merge\\\_Sort\*\* (Node ID: `dq\\\_merge`) — \[Merge\\\_Sort.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Divide\_Conquer/Merge\_Sort.js)
\* \*\*Alg/Divide\\\_Conquer/Quick\\\_Sort\*\* (Node ID: `dq\\\_quick`) — \[Quick\\\_Sort.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Divide\_Conquer/Quick\_Sort.js)
\* \*\*Alg/Divide\\\_Conquer/Z\\\_Traversal\*\* (Node ID: `dq\\\_z`) — \[Z\\\_Traversal.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Divide\_Conquer/Z\_Traversal.js)
\* \*\*Alg/Square\\\_Root\\\_Decomp\*\* (Node ID: `sqrtd`) — \[Square\\\_Root\\\_Decomp.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Square\_Root\_Decomp.js)
\* \*\*Alg/Meet\\\_in\\\_the\\\_Middle\*\* (Node ID: `meetinmid`) — \[Meet\\\_in\\\_the\\\_Middle.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Meet\_in\_the\_Middle.js)
\* \*\*Alg/Mo\\\_Algorithm\*\* (Node ID: `mo`) — \[Mo\\\_Algorithm.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core\_Algorithms/Alg/Mo\_Algorithm.js)

### 6\\. Data Structures (ID: `ds` | 🗃️)

\* \*\*Techniques/Bitwise\\\_Ops\*\* (Node ID: `bits`) — \[Bitwise\\\_Ops.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Techniques/Bitwise\_Ops.js)
\* \*\*Techniques/Difference\\\_Arrays\*\* (Node ID: `diffarr`) — \[Difference\\\_Arrays.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Techniques/Difference\_Arrays.js)
\* \*\*Data\\\_Structures/RMQ\*\* (Node ID: `rmq`) — \[RMQ.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Data\_Structures/RMQ.js)
\* \*\*Data\\\_Structures/Disjoint\\\_Sets\*\* (Node ID: `dsu`) — \[Disjoint\\\_Sets.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Data\_Structures/Disjoint\_Sets.js)
\* \*\*Trees/Fenwick\\\_Tree\*\* (Node ID: `aib`) — \[Fenwick\\\_Tree.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Trees/Fenwick\_Tree.js)
\* \*\*Trees/Segment\\\_Trees\*\* (Node ID: `seg`) — \[Segment\\\_Trees.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Trees/Segment\_Trees.js)
\* \*\*Data\\\_Structures/Frequency\\\_Vectors\*\* (Node ID: `ds\\\_frequency`) — \[Frequency\\\_Vectors.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Data\_Structures/Frequency\_Vectors.js)
\* \*\*Data\\\_Structures/Stack\*\* (Node ID: `ds\\\_stack`) — \[Stack.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Data\_Structures/Stack.js)
\* \*\*Data\\\_Structures/Queue\\\_Deque\*\* (Node ID: `ds\\\_queue\\\_deque`) — \[Queue\\\_Deque.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Data\_Structures/Queue\_Deque.js)
\* \*\*Data\\\_Structures/Priority\\\_Queue\*\* (Node ID: `ds\\\_priority\\\_queue`) — \[Priority\\\_Queue.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data\_Structures/Data\_Structures/Priority\_Queue.js)

### 7\\. Graph Theory (ID: `graph` | 🕸️)

\* \*\*Graphs/Basics\*\* (Node ID: `graph\\\_basics`) — \[Basics.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Basics.js)
\* \*\*Graphs/DFS\*\* (Node ID: `dfs`) — \[DFS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/DFS.js)
\* \*\*Graphs/BFS\*\* (Node ID: `bfs`) — \[BFS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/BFS.js)
\* \*\*Graphs/MST\*\* (Node ID: `mst`) — \[MST.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/MST.js)
\* \*\*Graphs/Topological\\\_Sort\*\* (Node ID: `topsort`) — \[Topological\\\_Sort.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Topological\_Sort.js)
\* \*\*Graphs/SCC\\\_Biconnected\*\* (Node ID: `scc`) — \[SCC.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/SCC.js)
\* \*\*Graphs/Eulerian\\\_Hamiltonian\*\* (Node ID: `eulerhamilton`) — \[Euler\\\_Hamilton.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Euler\_Hamilton.js)
\* \*\*Graphs/Shortest\\\_Path\*\* (Node ID: `sp`) — \[Shortest\\\_Path.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Shortest\_Path.js)
\* \*\*Graphs/Max\\\_Flow\*\* (Node ID: `maxflow`) — \[Max\\\_Flow.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Max\_Flow.js)
\* \*\*Graphs/LCA\*\* (Node ID: `lca`) — \[LCA.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/LCA.js)
\* \*\*Graphs/Shortest\\\_Path/Dijkstra\*\* (Node ID: `sp\\\_dijkstra`) — \[Dijkstra.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Shortest\_Path/Dijkstra.js)
\* \*\*Graphs/Shortest\\\_Path/Bellman\\\_Ford\*\* (Node ID: `sp\\\_bf`) — \[Bellman\\\_Ford.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Shortest\_Path/Bellman\_Ford.js)
\* \*\*Graphs/Shortest\\\_Path/Floyd\\\_Warshall\*\* (Node ID: `sp\\\_fw`) — \[Floyd\\\_Warshall.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Shortest\_Path/Floyd\_Warshall.js)
\* \*\*Graphs/MST/Kruskal\*\* (Node ID: `mst\\\_kruskal`) — \[Kruskal.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/MST/Kruskal.js)
\* \*\*Graphs/MST/Prim\*\* (Node ID: `mst\\\_prim`) — \[Prim.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/MST/Prim.js)
\* \*\*Graphs/SCC/Kosaraju\*\* (Node ID: `scc\\\_kosaraju`) — \[Kosaraju.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/SCC/Kosaraju.js)
\* \*\*Graphs/SCC/Tarjan\*\* (Node ID: `scc\\\_tarjan`) — \[Tarjan.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/SCC/Tarjan.js)
\* \*\*Graphs/Max\\\_Flow/Edmonds\\\_Karp\*\* (Node ID: `maxflow\\\_ek`) — \[Edmonds\\\_Karp.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Max\_Flow/Edmonds\_Karp.js)
\* \*\*Graphs/Max\\\_Flow/Dinic\*\* (Node ID: `maxflow\\\_dinic`) — \[Dinic.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/Max\_Flow/Dinic.js)
\* \*\*Graphs/LCA/Binary\\\_Lifting\*\* (Node ID: `lca\\\_bin`) — \[Binary\\\_Lifting.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/LCA/Binary\_Lifting.js)
\* \*\*Graphs/LCA/Euler\\\_RMQ\*\* (Node ID: `lca\\\_rmq`) — \[Euler\\\_RMQ.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph\_Theory/Graphs/LCA/Euler\_RMQ.js)

\\---

## 🧪 Validation \\\& Syntax Checks

To guarantee that any changes made to the syllabus category files are syntactically and structurally correct (and conform to the React dashboard expectations), you should run the validation tools located in the `/validation\\\_tools` directory.

### 1\\. `validate\\\_syntax.cjs`

This script checks one or more category JS configuration files. It validates that critical fields (like `presentation`, `explanations`, `problems`) are present, and checks the signature and run-time execution of the custom `debugger` hooks (`getDebuggerState` and `getInlineValueForLine`).

\* \*\*Usage (All files in a category directory):\*\*

```cmd
  node validation\\\_tools/validate\\\_syntax.cjs
  ```

* **Usage (Targeted files):**

```cmd
  node validation\\\_tools/validate\\\_syntax.cjs dashboard/src/data/categories/Math\\\_Geometry/Math/Advanced.js
  ```

### 2\. `bracket\\\_counter.cjs`

A utility script used to inspect balanced brackets (braces, parentheses, brackets) and unclosed strings/comments. It helps catch syntax errors, mismatched JSON structures, or template literal string leaks.

* **Usage:**

```cmd
  node validation\\\_tools/bracket\\\_counter.cjs <path\\\_to\\\_file.js>
  ```






# Reguli Proiect - DOTO Harta Programa (Syllabus Tree)

Acest fisier contine regulile si ghidurile specifice pentru gestionarea si modificarea graficului de noduri din Syllabus Tree (SyllabusTree.jsx si syllabusData.js).

## Reguli Obligatorii pentru Modificarea Nodurilor si Coordonatelor

1. **Evitarea suprapunerilor**:
   - Casetele individuale ale nodurilor (cards) au latimea de 270px si inaltimea de 150px.
   - Casetele capitolelor (bounding boxes) au o margine (padding) de 180px pe orizontala si 140px pe verticala.
   - Orice modificare a coordonatelor (layoutOverrides) sau adaugare de noduri noi NU trebuie sa introduca suprapuneri intre placute sau bounding box-urile domeniilor.

2. **Rularea Validatorului**:
   - De fiecare data cand modificati sau adaugati noduri in harta, **este obligatoriu** sa rulati scriptul de verificare pentru a confirma ca nu exista suprapuneri:
     `ash
     python validation_tools/layout_checker.py
     `
   - Scriptul va analiza automat noile coordonate din SyllabusTree.jsx si asocierile din syllabusData.js. Daca scriptul returneaza un cod de eroare, coordonatele TREBUIE ajustate pana cand verificarea reuseste.

3. **Ordonarea verticala a parintilor (Regula Max Flow)**:
   - Nodurile parinte care au sub-noduri copii (de ex. maxflow, scc, tree_decomp, math_fast_expo) trebuie plasate mai jos pe axa Y decat fratii lor care sunt frunze simple (fara copii). Aceasta creeaza o structura clara de arbore directionat in jos.
