# Project Overview (Agent Context)

This file is intended for AI agents to quickly understand the structure, architecture, and purpose of the `doto` workspace. When handling user requests, please refer to this document for context on where to find specific components or where to place new ones.

## 📂 Directory Structure

The workspace is divided into several main components:

### 1. `/backend` (Node.js Server)
Contains the server-side logic, API endpoints, code execution environments, and recommendations.
- `server.js`: The main entry point for the backend server.
- `evaluator.js`: Logic for evaluating code/algorithms.
- `recommendation.js`: Logic for generating user recommendations.
- `database.json`: Local database / mock data file.
- `/execution`: Directory likely used for isolated code execution or running test tasks.

### 2. `/dashboard` (React + Vite Frontend)
Contains the user interface, likely a web dashboard for the application. Built with React and Vite.
- `/src/App.jsx` & `/src/main.jsx`: Core application entry points.
- `/src/components/`: Reusable React components.
  - `CategoryPresentation.jsx`: Main modal rendering when a syllabus node is clicked. Houses the CLion-style debugger and tabbed workspace.
  - `CodeDemonstrator.jsx`: Debugger code demonstrator component.
- `/src/data/`: Data structures, constants, or mock data for the frontend.
  - `/src/data/categories/`: Algorithm and data structure content files.
- `/src/App.css` & `/src/index.css`: Styling files (note: standard CSS, adhere to the styling conventions present).

### 3. `/extension` (Chrome Extension)
A browser extension associated with the project.
- `manifest.json`: Configuration for the Chrome extension.
- `background.js`: Service worker / background script.
- `content.js` / `content-styles.css`: Injected content scripts and their corresponding styles.

### 4. `/e2e_tests` (End-to-End Tests)
Testing framework and cases for the application.
- `runner.js`: The main test runner script.
- `/cases/`: Directory containing specific E2E test cases.

### 5. `/validation_tools` (Validation Scripts)
Scripts to validate the syntax, structure, and execution of category configuration JS files.
- `validate_syntax.cjs`: Syntax and structural validation tool for category data configuration JS files.
- `bracket_counter.cjs`: Helper script to count and match brackets and strings in files.

### 6. Root Directory (`/`) Data & Scripts
The root contains numerous CommonJS (`.cjs`) utility scripts and JSON data files. These are primarily used for processing, parsing, fixing, and injecting algorithmic and mathematical content.

---

## 🛠 Guidelines for Agents

1. **Frontend Changes**: Always look in `/dashboard/src/`. Component modifications go into `/components`. Follow the existing design aesthetics (Vanilla CSS).
2. **Backend/API Changes**: Look in `/backend`.
3. **Extension Modifications**: Look in `/extension`. Ensure `manifest.json` permissions align with your changes.
4. **Content Generation / Scripting**: If the user asks to modify algorithmic content (like Graphs, Math, Divide & Conquer), check the `.cjs` and `.json` data files in the root folder, or verify if they map to `/dashboard/src/data/`.

5. **Aesthetics & UI Constraints**:
   - **No Glassmorphism**: Do not use `backdrop-filter` or highly translucent panels in explanation popups/modals. Use solid dark themes.
   - **No 3D Animations**: Do not use 3D transitions or spring layouts. Modal entries must use simple 2D animations (e.g. `@keyframes simpleSlideUp`).
   - **CLion/IDE Dark Palette**: Use solid backgrounds like `#1e1f22` (CLion editor), `#1a1b1d` (IDE panels), and `#2b2d30` (borders/active areas).

6. **CLion Debugger Layout & Logic**:
   - **Left Pane (Code Editor)**: Syntax highlighted using the custom C++ tokenizer `highlightCpp`. Displays line numbers and CLion-style **inline variables** (e.g., `// max_val: 10`) next to the code line.
   - **Vertical Control Strip**: Standard CLion debugger controls: Resume `▶`, Step Over `↷`, Step Back `↶`, Stop/Reset `■`, Run to End `⏭`.
   - **Right Pane (Tabbed Workspace)**:
     - **Debugger Tab**: Shows Call Stack Frames list and expandable tree-view of active Variables (supporting typings, e.g. `int`, `std::vector<int>`, etc.).
     - **State Visualizer Tab**: Renders graphic elements like lists, trees, graphs, and matrices.
     - **Console Tab**: Collects step-by-step logs from the debugger run.

7. **Category Debugger States**:
   - Instead of hardcoding debugger states inside `CategoryPresentation.jsx`, each custom topic contains a `"debugger"` block directly in its JS data file.
   - The frontend reads state details dynamically via `data?.debugger` or static variables from `data?.globalVars`.
   - For all other categories without a custom debugger block, a **dynamic regex parser** fallback in `CategoryPresentation.jsx` extracts variables from the explanation text (matching patterns like `name = value`, `name este value`, `name devine value`) to populate the Variables list and inline labels.

8. **Polymorphic Database Schemas (Matrices/Arrays)**:
   - Handle variations in matrix definitions gracefully. Matrix representations inside data files might use `matrix.data` or `matrix.rows`.
   - Cells in the matrix/array can be primitives (e.g., `5`) or objects (e.g., `{ val: 5 }`). Always use defensive checks (like `cell && typeof cell === 'object' ? cell.val : cell`) to avoid React render crashes (`Objects are not valid as a React child`).

9. **Dynamic Graph & Tree Visualizations**:
   - Graph Theory topics (except Basics which has static definitions) generate their visualizations dynamically using the `getGraphVisual(stepIndex)` function in their `"debugger"` block.
   - This function returns an object structured as:
     ```javascript
     {
       directed: boolean, // true for directed graphs (with arrows), false for undirected
       title: string,     // Optional title (e.g., "Graf Transpus")
       nodes: Array<{ id, x, y, label, state?: 'active'|'visited', desc?: string }>,
       edges: Array<{ source, target, weight?: number|string, active?: boolean }>
     }
     ```
   - Node and edge highlight states (`active`, `visited`) and edge weights/labels are calculated dynamically based on the current step's variables.
   - **Segment Tree & Tree/Graph DP Visualizations**: This same dynamic graph model is used to represent tree structures like **Segment Trees** and trees/graphs in **Dynamic Programming** (e.g., DP on Trees/Graphs). For Segment Trees, node intervals (e.g., `[start..end]`) are rendered above each node using the `desc` property. In Tree/Graph DP, this `desc` property is highly recommended to show subproblem intervals, active states, or calculated DP values for specific tree nodes/intervals.
   - **Dynamic Titles for Trees**: The UI dynamically resolves tree categories to render clean titles in the graph header. Segment Trees show `"Arbore de Intervale"`, DP on Trees/Graphs shows `"Arbore / DP pe Arbori"`, and other tree topics show `"Structură de Arbore"`, separating them from standard `"Graf Orientat"` / `"Graf Neorientat"`.

10. **Transitional Chapters**: Categories that act as transitions to sub-algorithms (e.g., Shortest Path branching into Dijkstra, Bellman-Ford) are automatically detected in `CategoryPresentation.jsx` based on the presence of subcategories. For these, the UI hides the code and problem sections and instead displays a "Subcapitole / Algoritmi" interactive grid.
11. **Testing**: E2E tests go to `/e2e_tests`.
12. **Math/LaTeX Delimiter Parsing & Formatting**:
    - To render mathematical formulas inside category descriptions and complexities, `CategoryPresentation.jsx` utilizes the **KaTeX** math engine to compile standard LaTeX expressions dynamically.
    - Text blocks are split by math delimiters (`$$...$$` for display math blocks, `$` for inline expressions), and KaTeX compiles the raw equations to styled HTML layout nodes.
    - KaTeX imports and styles are configured inside `CategoryPresentation.jsx`. No additional CDNs are needed.

---

## 🎨 Debugger Visualizations (CRITICAL)

> [!IMPORTANT]
> **Understanding and Implementing Visualizations**
> The application uses three primary visualization systems to animate code execution in the State Visualizer tab. A single debugger step can combine multiple visualizations concurrently (e.g. rendering both a `blocksVisual` vector and a dynamic graph). You must adhere strictly to these structures when adding/updating algorithm steps.

### 1. 1D / Block Visualizations (`blocksVisual`)
Used to visualize 1D structures like arrays, vectors, stacks, queues, and DSU parent sets.
* **How it works:** It renders row-by-row horizontal grids. If a row's label contains the word `"Stack"` or `"Queue"`, special styling is applied (e.g., vertical stack piling or horizontal queue pipeline).
* **Structure (JSON Array):**
  ```json
  [
    {
      "label": "Vector v", 
      "groups": [
        [
          { "val": "10", "active": true, "sorted": false, "hidden": false }
        ]
      ]
    }
  ]
  ```
* **Attributes:**
  - `val`: The text value displayed in the cell.
  - `active`: Highlight cell (yellow/orange border) to denote it is currently being accessed.
  - `sorted`: Highlight cell green to mark it as sorted.
  - `hidden`: Render cell invisibly (useful for spacing out disjoint segments).

### 2. 2D / Grid Visualizations (`matrix`)
Used to visualize matrices, 2D dynamic programming tables, grid maps, or Sparse Tables (RMQ).
* **How it works:** Renders an interactive spreadsheet-like grid with indexed column headers.
* **Structure (JSON Object):**
  ```json
  {
    "title": "DP Table",
    "headers": ["", "0", "1", "2"],
    "rows": [
      ["0", "1", "2", "3"]
    ]
  }
  ```
* **Polymorphism Constraint:** Rows can contain either primitives (e.g., `"5"`) or objects (e.g., `{ val: "5", active: true }`). Always write defensive UI code checking for object structures before rendering to avoid React runtime crashes.

### 3. Dynamic Graph & Tree Visualizations (`getGraphVisual`)
Used for Graph Theory topics, MSTs, Shortest Paths, Trees, Segment Trees, and Tree/Graph DP.
* **How it works:** Generates interactive node-link diagrams. Layout positions (`x`, `y`) must be manually defined in the node objects to ensure clear, non-overlapping layouts on the canvas.
* **Structure (Returned by Javascript function `getGraphVisual(stepIndex)`):**
  ```javascript
  {
    directed: false, // true for arrows, false for undirected lines
    title: "Graf Curent", // Optional title displayed in the header
    nodes: [
      { id: "0", x: 80, y: 50, label: "0", state: "active", desc: "[0..3]" }
    ],
    edges: [
      { source: "0", target: "1", weight: 10, active: true }
    ]
  }
  ```
* **Attributes:**
  - `state` (Node): `"active"` (red border highlight), `"visited"` (green/blue visited highlight), or `undefined` (default).
  - `desc` (Node): Text badge drawn above the node (used for node metrics or Segment Tree intervals).
  - `active` (Edge): Highlights the edge in thick green (used to trace Dijkstra's shortest path, Kruskal/Prim MSTs, etc.).

---

## 📚 Syllabus Category Structure (Theory, Transition, and Algorithm Nodes)

Every topic in the syllabus tree corresponds to a JavaScript configuration file under `/dashboard/src/data/categories/` (e.g. `Basics.js`, `DFS.js`, `Shortest_Path.js`). Each file must export a `data` object with the following structure depending on its type:

### 1. Theory Nodes (Noduri de Teorie)
Used to explain mathematical foundations or general concepts.
- **Fields**:
  - `presentation`: Detailed markdown text explaining the theory in Romanian, utilizing LaTeX notation (e.g., `$O(N \log N)$` or `$\sum$`) for math and complexities.
  - `complexity`: Space and time complexity analysis in Romanian.
  - `variations`: Alternate approaches, variants, and edge cases.
  - `applications`: Real-world applications and use cases.
  - `code`: C++ source code demonstrating the theory/algorithm (if applicable).
  - `explanations`: Debugger simulation steps detailing state changes (if applicable).

### 2. Transition Nodes (Noduri de Tranziție)
Used as intermediate navigation hubs when a category branches into sub-topics (e.g. `Shortest_Path` branching into Dijkstra, Bellman-Ford, Floyd-Warshall).
- **Fields**:
  - `presentation`, `complexity`, `variations`, `applications` describing the high-level topic.
  - `code`: Must be set to an empty string (`""`).
  - `explanations`: Must be set to an empty array (`[]`).
  - `problems`: A dictionary containing lists of practice problems grouped by difficulty:
    ```json
    {
      "easy": [{ "title": "...", "url": "...", "desc": "..." }],
      "medium": [{ "title": "...", "url": "...", "desc": "..." }],
      "hard": [{ "title": "...", "url": "...", "desc": "..." }]
    }
    ```

### 3. Algorithm Nodes (Noduri de Algoritmi)
Concrete implementation of a specific algorithm with debugger steps.
- **Fields**:
  - Comprehensive `presentation`, `complexity`, `variations`, and `applications`.
  - `code`: C++ source code.
  - `explanations`: Array of step objects (typically 20+ steps) for the CLion-style debugger:
    - `line`: The 1-indexed line number in `code` currently being executed.
    - `text`: Detailed explanation of the step in Romanian.
    - `blocksVisual` (Optional): Used to visualize 1D structures like arrays, vectors, stacks, queues, and DSU sets. Formatted as an array of rows:
      ```json
      [
        {
          "label": "Stack (stive)", // Optional label (triggers Stack/Queue styling if containing those words)
          "groups": [
            [
              { "val": "10", "active": true, "sorted": false, "hidden": false }
            ]
          ]
        }
      ]
      ```
    - `matrix` (Optional): Used to visualize 2D structures like DP tables, matrices, or Sparse Tables (RMQ). Formatted as:
      ```json
      {
        "title": "RMQ Table",
        "headers": ["", "0", "1", "2"],
        "rows": [
          ["0", "1", "2", "3"]
        ]
      }
      ```
    - **Note on Multi-Visual Support**: A single debugger step can contain **multiple visualizations concurrently** (e.g., combining `blocksVisual` for vector/stack visualization, `matrix` for DP state, and/or a dynamically generated graph from `getGraphVisual`). When multiple visualization keys exist at the same step, the frontend displays them stacked together (e.g., rendering both a vector/blocks layout and a graph vertically).
  - `debugger` (Optional): A block containing custom execution trace handlers:
    - `getDebuggerState(stepIndex, activeLine, explanationText)`: returns `{ vars, globalVars, frames, inlineVal }`.
    - `getInlineValueForLine(stepIndex, lineNum)`: returns inline labels next to code lines.
    - `getGraphVisual(stepIndex)`: returns dynamic graph configuration (used for Graph Theory topics).

---

## 🌳 Syllabus Tree Sections & Topics

Below is the list of all domains (sections) and topics in the syllabus tree, mapped to their configuration files:

### 1. Math & Geometry (ID: `math` | 🧮)
* **Math/Number_Theory** (Node ID: `math1`) — [Number_Theory.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Number_Theory.js)
* **Math/Combinatorics** (Node ID: `comb`) — [Combinatorics.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Combinatorics.js)
* **Geometry/Computational** (Node ID: `geom`) — [Computational.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Geometry/Computational.js)
* **Math/Advanced** (Node ID: `advmath`) — [Advanced.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Advanced.js)
* **Math/Game_Theory** (Node ID: `game_theory`) — [Game_Theory.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Game_Theory.js)
* **Math/Linear_Algebra** (Node ID: `linalg`) — [Linear_Algebra.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Linear_Algebra.js)
* **Math/Fast_Exponentiation** (Node ID: `math_fast_expo`) — [Fast_Exponentiation.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Fast_Exponentiation.js)
* **Math/Big_Integers** (Node ID: `math_bigint`) — [Big_Integers.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Big_Integers.js)
* **Math/Euler_Phi** (Node ID: `math_phi`) — [Euler_Phi.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Euler_Phi.js)
* **Math/PIE** (Node ID: `math_pie`) — [PIE.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/PIE.js)
* **Math/Mobius** (Node ID: `math_mobius`) — [Mobius.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Mobius.js)
* **Math/Matrix_Exponentiation** (Node ID: `math_matrix_expo`) — [Matrix_Exponentiation.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Math/Matrix_Exponentiation.js)
* **Geometry/Sweep_Line** (Node ID: `geom_sweepline`) — [Sweep_Line.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Geometry/Sweep_Line.js)
* **Geometry/Convex_Hull** (Node ID: `geom_convexhull`) — [Convex_Hull.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Math_Geometry/Geometry/Convex_Hull.js)

### 2. Fundamentals (ID: `fund` | 📚)
* **Data_Structures/Basics** (Node ID: `ds_basics`) — [Basics.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Data_Structures/Basics.js)
* **Arrays** (Node ID: `arr`) — [Arrays.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Arrays.js)
* **Sorting** (Node ID: `sort`) — [Sorting.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Sorting.js)
* **Techniques/Two_Pointers** (Node ID: `twoptr`) — [Two_Pointers.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Techniques/Two_Pointers.js)
* **Fundamentals/Digits** (Node ID: `fund_digits`) — [Digits.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Digits.js)
* **Fundamentals/Streaming** (Node ID: `fund_stream`) — [Streaming.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Streaming.js)
* **Fundamentals/Base_Conversion** (Node ID: `fund_bases`) — [Base_Conversion.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Base_Conversion.js)
* **Fundamentals/Simulations** (Node ID: `fund_sim`) — [Simulations.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Simulations.js)
* **Fundamentals/Functions** (Node ID: `fund_funcs`) — [Functions.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Functions.js)
* **Fundamentals/Structs** (Node ID: `fund_structs`) — [Structs.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/Structs.js)
* **Fundamentals/STL** (Node ID: `fund_stl`) — [STL.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Fundamentals/STL.js)

### 3. String Processing (ID: `str` | 🔤)
* **Strings** (Node ID: `str`) — [Strings.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String_Processing/Strings.js)
* **Strings/Trie** (Node ID: `trie`) — [Trie.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String_Processing/Strings/Trie.js)
* **Strings/KMP** (Node ID: `kmp`) — [KMP.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String_Processing/Strings/KMP.js)
* **Strings/Aho_Corasick** (Node ID: `aho`) — [Aho_Corasick.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String_Processing/Strings/Aho_Corasick.js)
* **Strings/Suffix_Structures** (Node ID: `suffix`) — [Suffix_Structures.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/String_Processing/Strings/Suffix_Structures.js)

### 4. Dynamic Programming (ID: `dp` | 🧠)
* **Dynamic_Programming** (Node ID: `dp`) — [Dynamic_Programming.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Dynamic_Programming.js)
* **Dynamic_Programming/Knapsack** (Node ID: `dp_knapsack`) — [Knapsack.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Dynamic_Programming/Knapsack.js)
* **Dynamic_Programming/LCS** (Node ID: `dp_lcs`) — [LCS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Dynamic_Programming/LCS.js)
* **Dynamic_Programming/LIS** (Node ID: `dp_lis`) — [LIS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Dynamic_Programming/LIS.js)
* **Advanced_DP/Trees_Graphs** (Node ID: `dp_trees`) — [Trees_Graphs.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Advanced_DP/Trees_Graphs.js)
* **Advanced_DP/Exponential_States** (Node ID: `dp_exp`) — [Exponential_States.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Advanced_DP/Exponential_States.js)
* **Advanced_DP/CHT** (Node ID: `cht`) — [CHT.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Dynamic_Programming/Advanced_DP/CHT.js)

### 5. Core Algorithms (ID: `alg` | ⚡)
* **Alg/Backtracking** (Node ID: `bkt`) — [Backtracking.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Backtracking.js)
* **Alg/Greedy** (Node ID: `greedy`) — [Greedy.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Greedy.js)
* **Alg/Divide_Conquer** (Node ID: `dq`) — [Divide_Conquer.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Divide_Conquer.js)
* **Alg/Divide_Conquer/Binary_Search** (Node ID: `dq_bin`) — [Binary_Search.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Divide_Conquer/Binary_Search.js)
* **Alg/Divide_Conquer/Merge_Sort** (Node ID: `dq_merge`) — [Merge_Sort.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Divide_Conquer/Merge_Sort.js)
* **Alg/Divide_Conquer/Quick_Sort** (Node ID: `dq_quick`) — [Quick_Sort.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Divide_Conquer/Quick_Sort.js)
* **Alg/Divide_Conquer/Z_Traversal** (Node ID: `dq_z`) — [Z_Traversal.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Divide_Conquer/Z_Traversal.js)
* **Alg/Square_Root_Decomp** (Node ID: `sqrtd`) — [Square_Root_Decomp.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Square_Root_Decomp.js)
* **Alg/Meet_in_the_Middle** (Node ID: `meetinmid`) — [Meet_in_the_Middle.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Meet_in_the_Middle.js)
* **Alg/Mo_Algorithm** (Node ID: `mo`) — [Mo_Algorithm.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Mo_Algorithm.js)
* **Alg/Majority_Element** (Node ID: `alg_majority`) — [Majority_Element.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Core_Algorithms/Alg/Majority_Element.js)

### 6. Data Structures (ID: `ds` | 🗃️)
* **Techniques/Bitwise_Ops** (Node ID: `bits`) — [Bitwise_Ops.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Techniques/Bitwise_Ops.js)
* **Techniques/Difference_Arrays** (Node ID: `diffarr`) — [Difference_Arrays.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Techniques/Difference_Arrays.js)
* **Data_Structures/RMQ** (Node ID: `rmq`) — [RMQ.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/RMQ.js)
* **Data_Structures/Disjoint_Sets** (Node ID: `dsu`) — [Disjoint_Sets.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/Disjoint_Sets.js)
* **Trees/Fenwick_Tree** (Node ID: `aib`) — [Fenwick_Tree.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Trees/Fenwick_Tree.js)
* **Trees/Segment_Trees** (Node ID: `seg`) — [Segment_Trees.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Trees/Segment_Trees.js)
* **Data_Structures/Frequency_Vectors** (Node ID: `ds_frequency`) — [Frequency_Vectors.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/Frequency_Vectors.js)
* **Data_Structures/Stack** (Node ID: `ds_stack`) — [Stack.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/Stack.js)
* **Data_Structures/Queue_Deque** (Node ID: `ds_queue_deque`) — [Queue_Deque.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/Queue_Deque.js)
* **Data_Structures/Priority_Queue** (Node ID: `ds_priority_queue`) — [Priority_Queue.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Data_Structures/Data_Structures/Priority_Queue.js)

### 7. Graph Theory (ID: `graph` | 🕸️)
* **Graphs/Basics** (Node ID: `graph_basics`) — [Basics.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Basics.js)
* **Graphs/DFS** (Node ID: `dfs`) — [DFS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/DFS.js)
* **Graphs/BFS** (Node ID: `bfs`) — [BFS.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/BFS.js)
* **Graphs/MST** (Node ID: `mst`) — [MST.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/MST.js)
* **Graphs/Topological_Sort** (Node ID: `topsort`) — [Topological_Sort.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Topological_Sort.js)
* **Graphs/SCC_Biconnected** (Node ID: `scc`) — [SCC.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/SCC.js)
* **Graphs/Eulerian_Hamiltonian** (Node ID: `eulerhamilton`) — [Euler_Hamilton.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Euler_Hamilton.js)
* **Graphs/Shortest_Path** (Node ID: `sp`) — [Shortest_Path.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path.js)
* **Graphs/Max_Flow** (Node ID: `maxflow`) — [Max_Flow.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Max_Flow.js)
* **Graphs/LCA** (Node ID: `lca`) — [LCA.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/LCA.js)
* **Graphs/Shortest_Path/Dijkstra** (Node ID: `sp_dijkstra`) — [Dijkstra.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Dijkstra.js)
* **Graphs/Shortest_Path/Bellman_Ford** (Node ID: `sp_bf`) — [Bellman_Ford.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Bellman_Ford.js)
* **Graphs/Shortest_Path/Floyd_Warshall** (Node ID: `sp_fw`) — [Floyd_Warshall.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Floyd_Warshall.js)
* **Graphs/MST/Kruskal** (Node ID: `mst_kruskal`) — [Kruskal.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/MST/Kruskal.js)
* **Graphs/MST/Prim** (Node ID: `mst_prim`) — [Prim.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/MST/Prim.js)
* **Graphs/SCC/Kosaraju** (Node ID: `scc_kosaraju`) — [Kosaraju.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/SCC/Kosaraju.js)
* **Graphs/SCC/Tarjan** (Node ID: `scc_tarjan`) — [Tarjan.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/SCC/Tarjan.js)
* **Graphs/Max_Flow/Edmonds_Karp** (Node ID: `maxflow_ek`) — [Edmonds_Karp.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Max_Flow/Edmonds_Karp.js)
* **Graphs/Max_Flow/Dinic** (Node ID: `maxflow_dinic`) — [Dinic.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Max_Flow/Dinic.js)
* **Graphs/LCA/Binary_Lifting** (Node ID: `lca_bin`) — [Binary_Lifting.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/LCA/Binary_Lifting.js)
* **Graphs/LCA/Euler_RMQ** (Node ID: `lca_rmq`) — [Euler_RMQ.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/LCA/Euler_RMQ.js)
* **Graphs/Lee** (Node ID: `graph_lee`) — [Lee.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Lee.js)
* **Graphs/Flood_Fill** (Node ID: `graph_fill`) — [Flood_Fill.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Flood_Fill.js)
* **Graphs/Tree_Diameter** (Node ID: `graph_diameter`) — [Tree_Diameter.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Tree_Diameter.js)
* **Graphs/Shortest_Path/Dial** (Node ID: `graph_dial`) — [Dial.js](file:///c:/Users/User8/Desktop/doto/dashboard/src/data/categories/Graph_Theory/Graphs/Shortest_Path/Dial.js)

---

## 🧪 Validation & Syntax Checks

To guarantee that any changes made to the syllabus category files are syntactically and structurally correct (and conform to the React dashboard expectations), you should run the validation tools located in the `/validation_tools` directory.

### 1. `validate_syntax.cjs`
This script checks one or more category JS configuration files. It validates that critical fields (like `presentation`, `explanations`, `problems`) are present, and checks the signature and run-time execution of the custom `debugger` hooks (`getDebuggerState` and `getInlineValueForLine`).

- **Usage (All files in a category directory):**
  ```cmd
  node validation_tools/validate_syntax.cjs
  ```
- **Usage (Targeted files):**
  ```cmd
  node validation_tools/validate_syntax.cjs dashboard/src/data/categories/Math_Geometry/Math/Advanced.js
  ```

### 2. `bracket_counter.cjs`
A utility script used to inspect balanced brackets (braces, parentheses, brackets) and unclosed strings/comments. It helps catch syntax errors, mismatched JSON structures, or template literal string leaks.

- **Usage:**
  ```cmd
  node validation_tools/bracket_counter.cjs <path_to_file.js>
  ```

### 3. `fix_latex_backslashes.cjs`
A helper script to automatically find and fix over-escaped LaTeX backslashes (replacing 4 backslashes `\\\\` in the source file with 2 backslashes `\\` for correct browser-level KaTeX rendering inside template literals or double-quoted strings).

- **Usage:**
  ```cmd
  node validation_tools/fix_latex_backslashes.cjs
  ```



