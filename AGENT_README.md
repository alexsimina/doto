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

### 5. Root Directory (`/`) Data & Scripts
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

10. **Transitional Chapters**: Categories that act as transitions to sub-algorithms (e.g., Shortest Path branching into Dijkstra, Bellman-Ford) are automatically detected in `CategoryPresentation.jsx` based on the presence of subcategories. For these, the UI hides the code and problem sections and instead displays a "Subcapitole / Algoritmi" interactive grid.
11. **Testing**: E2E tests go to `/e2e_tests`.

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

