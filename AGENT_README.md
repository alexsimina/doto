# Project Overview (Agent Context)

This file is intended for AI agents to quickly understand the structure, architecture, and purpose of the `doto` workspace. When handling user requests, please refer to this document for context on where to find specific components or where to place new ones.

## 📂 Directory Structure

The workspace is divided into several main components:

### 1. `/backend` (Node.js Server)
Contains the server-side logic, API endpoints, code execution environments, and recommendations.
- `server.js`: The main entry point for the backend server.
- `evaluator.js`: Logic for evaluating code/algorithms.
- `recommendation.js`: Logic for generating user recommendations.
- `/prisma`: Contains `schema.prisma` definitions for the PostgreSQL database via Prisma ORM.
- `/execution`: Directory likely used for isolated code execution or running test tasks.
- `Dockerfile`: Containerization configuration for the backend.

### 2. `/dashboard` (React + Vite Frontend)
Contains the user interface, a web dashboard for the application built with React and Vite. Features a premium "Deep Space Dark" theme with glassmorphism UI.
- `/src/App.jsx` & `/src/main.jsx`: Core application entry points.
- `/src/components/`: Reusable React components (e.g., `CodeDemonstrator.jsx` integrates `@monaco-editor/react` for an advanced code editor).
- `/src/data/`: Data structures, constants, or mock data for the frontend.
- `/src/App.css` & `/src/index.css`: Styling files. Follow the premium Vanilla CSS design system (Deep Space Dark Theme, Glassmorphism, CSS variables). Do NOT use Tailwind unless explicitly requested.
- `Dockerfile`: Containerization configuration for the frontend.

### 3. `/extension` (Chrome Extension)
A browser extension associated with the project.
- `manifest.json`: Configuration for the Chrome extension.
- `background.js`: Service worker / background script.
- `content.js` / `content-styles.css`: Injected content scripts and their corresponding styles.

### 4. `/e2e_tests` (End-to-End Tests)
Testing framework and cases for the application.
- `runner.js`: The main test runner script.
- `/cases/`: Directory containing specific E2E test cases.

### 5. Root Directory (`/`) Data, Scripts & Infrastructure
The root contains numerous utility scripts, configuration files, and infrastructure definitions:
- **Infrastructure**: `docker-compose.yml` for orchestrating services (db, backend, frontend) and `.github/workflows/ci.yml` for CI/CD.
- **Agent Blueprints**: `/agent_instructions` contains task blueprints for specialized AI agents.
- **Data Injection Scripts**: `inject_all.cjs`, `add_core_algos.cjs`, `add_math_chapters.cjs`, `rebuild_d_c.cjs` etc.
- **Fix/Cleanup Scripts**: `fix_syntax.cjs`, `clean_syntax.cjs`, `fix_final.cjs`, `cleanup.cjs`, etc.
- **Data Files**: `dp_data.json`, `math_data.cjs`, `graph_data_1.cjs`, etc. 
- **PDF Resource**: `programa.pdf` (potentially the syllabus or course curriculum).

## 🛠 Guidelines for Agents
1. **Frontend Changes**: Always look in `/dashboard/src/`. Component modifications go into `/components`. Follow the existing design aesthetics (Vanilla CSS, Deep Space Dark Theme, Glassmorphism, micro-animations). Ensure all components use predefined CSS variables from `index.css`.
2. **Backend/API Changes**: Look in `/backend`.
3. **Extension Modifications**: Look in `/extension`. Ensure `manifest.json` permissions align with your changes.
4. **Content Generation / Scripting**: If the user asks to modify algorithmic content (like Graphs, Math, Divide & Conquer), check the `.cjs` and `.json` data files in the root folder, or verify if they map to `/dashboard/src/data/`.
5. **Transitional Chapters**: Categories that act as transitions to sub-algorithms (e.g., Shortest Path branching into Dijkstra, Bellman-Ford) are automatically detected in `CategoryPresentation.jsx` based on the presence of subcategories. For these, the UI hides the code and problem sections and instead displays a "Subcapitole / Algoritmi" interactive grid.
6. **Testing & CI/CD**: E2E tests go to `/e2e_tests`. Unit and integration tests (Jest for backend, Vitest for frontend) are enforced via GitHub Actions in `.github/workflows/ci.yml`. Agents must ensure their code changes pass these automated CI checks.
7. **Infrastructure & Deployment**: The project is fully containerized. Use `docker-compose up --build` to spin up the `db` (PostgreSQL), `backend`, and `frontend` services. Agents modifying environment variables, network ports, or dependencies must update `docker-compose.yml` and the respective `Dockerfile`s accordingly. Refer to `README-docker.md` for more details.

When generating a response or plan, ensure you correctly target the relevant subdirectory to maintain structural integrity.
