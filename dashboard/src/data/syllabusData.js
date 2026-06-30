export const getCategoryIcon = (label) => {
  if (label.includes('Math')) return '🧮';
  if (label.includes('Graphs')) return '🕸️';
  if (label.includes('Trees')) return '🌳';
  if (label.includes('Strings')) return '🔤';
  if (label.includes('Dynamic_Programming') || label.includes('DP')) return '🧠';
  if (label.includes('Data_Structures') || label.includes('Arrays')) return '🗃️';
  if (label.includes('Geometry')) return '📐';
  if (label.includes('Greedy')) return '🪙';
  if (label.includes('Alg')) return '⚡';
  if (label.includes('Techniques')) return '🛠️';
  if (label.includes('Sorting')) return '📊';
  return '📚';
};

export const domainGroups = [
  { id: 'math', label: 'Math & Geometry', color: 'rgba(99, 102, 241, 0.03)', borderColor: 'rgba(99, 102, 241, 0.5)', icon: '🧮', nodes: ['math1', 'comb', 'geom', 'game_theory', 'linalg', 'advmath', 'math_fast_expo', 'math_bigint', 'math_phi', 'math_pie', 'math_mobius', 'math_matrix_expo', 'geom_sweepline', 'geom_convexhull', 'math_catalan', 'math_modinv'] },
  { id: 'fund', label: 'Fundamentals', color: 'rgba(139, 92, 246, 0.03)', borderColor: 'rgba(139, 92, 246, 0.5)', icon: '📚', nodes: ['ds_basics', 'arr', 'sort', 'twoptr', 'fund_digits', 'fund_stream', 'fund_bases', 'fund_sim', 'fund_funcs', 'fund_structs', 'fund_stl'] },
  { id: 'str', label: 'String Processing', color: 'rgba(236, 72, 153, 0.03)', borderColor: 'rgba(236, 72, 153, 0.5)', icon: '🔤', nodes: ['str', 'trie', 'kmp', 'aho', 'suffix', 'str_z', 'str_manacher', 'str_rabin_karp'] },
  { id: 'dp', label: 'Dynamic Programming', color: 'rgba(245, 158, 11, 0.03)', borderColor: 'rgba(245, 158, 11, 0.5)', icon: '🧠', nodes: ['dp', 'dp_knapsack', 'dp_lcs', 'dp_lis', 'dp_trees', 'dp_exp', 'cht', 'dp_mcm', 'dp_digit', 'dp_opt_dq'] },
  { id: 'alg', label: 'Core Algorithms', color: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.5)', icon: '⚡', nodes: ['bkt', 'greedy', 'dq', 'dq_merge', 'dq_quick', 'dq_bin', 'dq_z', 'meetinmid', 'sqrtd', 'mo', 'alg_majority', 'dq_ternary'] },
  { id: 'ds', label: 'Data Structures', color: 'rgba(14, 165, 233, 0.03)', borderColor: 'rgba(14, 165, 233, 0.5)', icon: '🗃️', nodes: ['bits', 'diffarr', 'rmq', 'dsu', 'aib', 'seg', 'ds_frequency', 'ds_stack', 'ds_queue_deque', 'ds_priority_queue', 'seg_lazy', 'ds_treap'] },
  { id: 'graph', label: 'Graph Theory', color: 'rgba(244, 63, 94, 0.03)', borderColor: 'rgba(244, 63, 94, 0.5)', icon: '🕸️', nodes: ['graph_theory_concepts', 'graph_basics', 'dfs', 'bfs', 'topsort', 'scc', 'eulerhamilton', 'mst', 'sp', 'maxflow', 'lca', 'sp_dijkstra', 'sp_bf', 'sp_fw', 'mst_kruskal', 'mst_prim', 'scc_kosaraju', 'scc_tarjan', 'maxflow_ek', 'maxflow_dinic', 'lca_bin', 'lca_rmq', 'graph_lee', 'graph_fill', 'graph_diameter', 'graph_dial', 'sp_spfa', 'graph_theory_undirected', 'graph_theory_directed', 'scc_biconnected', 'sp_bfs01', 'graph_bipartite', 'graph_bipartite_matching', 'graph_bridges', 'graph_mincut'] },
  { id: 'tree_alg', label: 'Tree Algorithms', color: 'rgba(20, 184, 166, 0.03)', borderColor: 'rgba(20, 184, 166, 0.5)', icon: '🌳', nodes: ['tree_euler', 'tree_decomp', 'tree_hld', 'tree_centroid', 'ds_persistent_seg', 'ds_binary_trie'] }
];

export const getNodeDomain = (nodeId) => {
  return domainGroups.find(d => d.nodes.includes(nodeId));
};

export const rawNodes = [
    // Math & Geometry
    { id: 'math1', label: 'Math/Number_Theory', x: -1458, y: 0, status: null, olympiadLevel: 'clasa9', recommendedOrder: 23 },
    { id: 'comb', label: 'Math/Combinatorics', x: -1818, y: 243, status: null, olympiadLevel: 'clasa9', recommendedOrder: 26 },
    { id: 'geom', label: 'Geometry/Computational', x: -1098, y: 243, status: null, olympiadLevel: 'clasa10', recommendedOrder: 13 },
    { id: 'advmath', label: 'Math/Advanced', x: -1458, y: 648, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 39 },
    { id: 'game_theory', label: 'Math/Game_Theory', x: -1818, y: 445, status: null, olympiadLevel: 'baraj', recommendedOrder: 1 },
    { id: 'linalg', label: 'Math/Linear_Algebra', x: -1098, y: 445, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 40 },

    // Fundamentals
    { id: 'ds_basics', label: 'Data_Structures/Basics', x: 0, y: 0, status: null, olympiadLevel: 'clasa9', recommendedOrder: 1 },
    { id: 'arr', label: 'Arrays', x: 0, y: 300, status: null, olympiadLevel: 'clasa9', recommendedOrder: 5 },
    { id: 'sort', label: 'Sorting', x: -300, y: 660, status: null, olympiadLevel: 'clasa9', recommendedOrder: 13 },
    { id: 'twoptr', label: 'Techniques/Two_Pointers', x: 300, y: 660, status: null, olympiadLevel: 'clasa9', recommendedOrder: 14 },

    // String Processing
    { id: 'str', label: 'Strings', x: 1458, y: 0, status: null, olympiadLevel: 'clasa9', recommendedOrder: 27 },
    { id: 'trie', label: 'Strings/Trie', x: 1174, y: 243, status: null, olympiadLevel: 'clasa10', recommendedOrder: 9 },
    { id: 'kmp', label: 'Strings/KMP', x: 1741, y: 243, status: null, olympiadLevel: 'clasa10', recommendedOrder: 10 },
    { id: 'aho', label: 'Strings/Aho_Corasick', x: 1458, y: 486, status: null, olympiadLevel: 'baraj', recommendedOrder: 9 },
    { id: 'suffix', label: 'Strings/Suffix_Structures', x: 1458, y: 729, status: null, olympiadLevel: 'baraj', recommendedOrder: 8 },

    // Core Algorithms
    { id: 'bkt', label: 'Alg/Backtracking', x: -364, y: 960, status: null, olympiadLevel: 'clasa9', recommendedOrder: 28 },
    { id: 'greedy', label: 'Alg/Greedy', x: 364, y: 960, status: null, olympiadLevel: 'clasa9', recommendedOrder: 22 },
    { id: 'dq', label: 'Alg/Divide_Conquer', x: -364, y: 1284, status: null, olympiadLevel: 'clasa9', recommendedOrder: 18 },
    { id: 'dq_bin', label: 'Alg/Divide_Conquer/Binary_Search', x: 364, y: 1284, status: null, olympiadLevel: 'clasa9', recommendedOrder: 16 },
    { id: 'dq_merge', label: 'Alg/Divide_Conquer/Merge_Sort', x: -688, y: 1608, status: null, olympiadLevel: 'clasa9', recommendedOrder: 19 },
    { id: 'dq_quick', label: 'Alg/Divide_Conquer/Quick_Sort', x: -40, y: 1608, status: null, olympiadLevel: 'clasa9', recommendedOrder: 20 },
    { id: 'dq_z', label: 'Alg/Divide_Conquer/Z_Traversal', x: 300, y: 1608, status: null, olympiadLevel: 'clasa9', recommendedOrder: 21 },
    { id: 'sqrtd', label: 'Alg/Square_Root_Decomp', x: 620, y: 1608, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 36 },
    { id: 'meetinmid', label: 'Alg/Meet_in_the_Middle', x: -364, y: 1932, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 38 },
    { id: 'mo', label: 'Alg/Mo_Algorithm', x: 620, y: 1932, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 37 },

    // Dynamic Programming
    { id: 'dp', label: 'Dynamic_Programming', x: -1458, y: 1534, status: null, olympiadLevel: 'clasa10', recommendedOrder: 15 },
    { id: 'dp_knapsack', label: 'Dynamic_Programming/Knapsack', x: -1782, y: 1777, status: null, olympiadLevel: 'clasa10', recommendedOrder: 16 },
    { id: 'dp_lcs', label: 'Dynamic_Programming/LCS', x: -1458, y: 1777, status: null, olympiadLevel: 'clasa10', recommendedOrder: 17 },
    { id: 'dp_lis', label: 'Dynamic_Programming/LIS', x: -1134, y: 1777, status: null, olympiadLevel: 'clasa10', recommendedOrder: 18 },
    { id: 'dp_trees', label: 'Advanced_DP/Trees_Graphs', x: -1782, y: 2020, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 44 },
    { id: 'dp_exp', label: 'Advanced_DP/Exponential_States', x: -1134, y: 2020, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 45 },
    { id: 'cht', label: 'Advanced_DP/CHT', x: -1458, y: 2263, status: null, olympiadLevel: 'baraj', recommendedOrder: 16 },

    // Data Structures
    { id: 'bits', label: 'Techniques/Bitwise_Ops', x: 1346, y: 1053, status: null, olympiadLevel: 'clasa9', recommendedOrder: 11 },
    { id: 'diffarr', label: 'Techniques/Difference_Arrays', x: 1346, y: 1296, status: null, olympiadLevel: 'clasa9', recommendedOrder: 12 },
    { id: 'rmq', label: 'Data_Structures/RMQ', x: 1832, y: 1296, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 32 },
    { id: 'dsu', label: 'Data_Structures/Disjoint_Sets', x: 1832, y: 1053, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 31 },
    { id: 'aib', label: 'Trees/Fenwick_Tree', x: 1508, y: 1620, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 33 },
    { id: 'seg', label: 'Trees/Segment_Trees', x: 2156, y: 1620, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 34 },

    // New Data Structures Nodes
    { id: 'ds_frequency', label: 'Data_Structures/Frequency_Vectors', x: 1010, y: 1053, status: null, olympiadLevel: 'clasa9', recommendedOrder: 10 },
    { id: 'ds_stack', label: 'Data_Structures/Stack', x: 1010, y: 1296, status: null, olympiadLevel: 'clasa10', recommendedOrder: 1 },
    { id: 'ds_queue_deque', label: 'Data_Structures/Queue_Deque', x: 1010, y: 1539, status: null, olympiadLevel: 'clasa10', recommendedOrder: 2 },
    { id: 'ds_priority_queue', label: 'Data_Structures/Priority_Queue', x: 1010, y: 1782, status: null, olympiadLevel: 'clasa10', recommendedOrder: 3 },

    // Graph Theory
    { id: 'graph_theory_concepts', label: 'Graphs/Theory_Concepts', x: 891, y: 2050, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 3 },
    { id: 'graph_basics', label: 'Graphs/Basics', x: 891, y: 2306, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 4 },
    { id: 'dfs', label: 'Graphs/DFS', x: 364, y: 2630, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 5 },
    { id: 'bfs', label: 'Graphs/BFS', x: 1417, y: 2630, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 6 },
    { id: 'mst', label: 'Graphs/MST', x: 2187, y: 2630, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 15 },
    { id: 'topsort', label: 'Graphs/Topological_Sort', x: -121, y: 3035, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 7 },
    { id: 'scc', label: 'Graphs/SCC_Biconnected', x: 240, y: 3035, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 19 },
    { id: 'eulerhamilton', label: 'Graphs/Eulerian_Hamiltonian', x: 960, y: 3035, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 8 },
    { id: 'sp', label: 'Graphs/Shortest_Path', x: 1417, y: 3035, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 9 },
    { id: 'maxflow', label: 'Graphs/Max_Flow', x: 2187, y: 3035, status: null, olympiadLevel: 'baraj', recommendedOrder: 11 },
    { id: 'lca', label: 'Graphs/LCA', x: 607, y: 3520, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 26 },
    { id: 'sp_dijkstra', label: 'Graphs/Shortest_Path/Dijkstra', x: 1093, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 10 },
    { id: 'sp_bf', label: 'Graphs/Shortest_Path/Bellman_Ford', x: 1417, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 12 },
    { id: 'sp_fw', label: 'Graphs/Shortest_Path/Floyd_Warshall', x: 1741, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 14 },
    { id: 'mst_kruskal', label: 'Graphs/MST/Kruskal', x: 2065, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 16 },
    { id: 'mst_prim', label: 'Graphs/MST/Prim', x: 2389, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 17 },
    { id: 'scc_kosaraju', label: 'Graphs/SCC/Kosaraju', x: 202, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 20 },
    { id: 'scc_tarjan', label: 'Graphs/SCC/Tarjan', x: 526, y: 3359, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 21 },
    { id: 'maxflow_ek', label: 'Graphs/Max_Flow/Edmonds_Karp', x: 2065, y: 3683, status: null, olympiadLevel: 'baraj', recommendedOrder: 12 },
    { id: 'maxflow_dinic', label: 'Graphs/Max_Flow/Dinic', x: 2389, y: 3683, status: null, olympiadLevel: 'baraj', recommendedOrder: 13 },
    { id: 'lca_bin', label: 'Graphs/LCA/Binary_Lifting', x: 445, y: 3683, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 27 },
    { id: 'lca_rmq', label: 'Graphs/LCA/Euler_RMQ', x: 769, y: 3683, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 28 },

    // New Fundamentals Nodes
    { id: 'fund_digits', label: 'Fundamentals/Digits', x: -360, y: 300, status: null, olympiadLevel: 'clasa9', recommendedOrder: 6 },
    { id: 'fund_stream', label: 'Fundamentals/Streaming', x: 360, y: 300, status: null, olympiadLevel: 'clasa9', recommendedOrder: 9 },
    { id: 'fund_bases', label: 'Fundamentals/Base_Conversion', x: -540, y: 480, status: null, olympiadLevel: 'clasa9', recommendedOrder: 7 },
    { id: 'fund_sim', label: 'Fundamentals/Simulations', x: 540, y: 480, status: null, olympiadLevel: 'clasa9', recommendedOrder: 8 },
    { id: 'fund_funcs', label: 'Fundamentals/Functions', x: -180, y: 150, status: null, olympiadLevel: 'clasa9', recommendedOrder: 2 },
    { id: 'fund_structs', label: 'Fundamentals/Structs', x: 180, y: 150, status: null, olympiadLevel: 'clasa9', recommendedOrder: 3 },
    { id: 'fund_stl', label: 'Fundamentals/STL', x: 0, y: 480, status: null, olympiadLevel: 'clasa9', recommendedOrder: 4 },

    // New Math Nodes
    { id: 'math_fast_expo', label: 'Math/Fast_Exponentiation', x: -1458, y: 810, status: null, olympiadLevel: 'clasa9', recommendedOrder: 24 },
    { id: 'math_bigint', label: 'Math/Big_Integers', x: -1098, y: 810, status: null, olympiadLevel: 'clasa10', recommendedOrder: 6 },
    { id: 'math_phi', label: 'Math/Euler_Phi', x: -1818, y: 810, status: null, olympiadLevel: 'clasa9', recommendedOrder: 25 },
    { id: 'math_pie', label: 'Math/PIE', x: -1818, y: 1000, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 41 },
    { id: 'math_mobius', label: 'Math/Mobius', x: -1458, y: 1000, status: null, olympiadLevel: 'baraj', recommendedOrder: 2 },
    { id: 'math_matrix_expo', label: 'Math/Matrix_Exponentiation', x: -1098, y: 1000, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 42 },
    { id: 'geom_sweepline', label: 'Geometry/Sweep_Line', x: -1818, y: 1200, status: null, olympiadLevel: 'baraj', recommendedOrder: 3 },
    { id: 'geom_convexhull', label: 'Geometry/Convex_Hull', x: -1098, y: 1200, status: null, olympiadLevel: 'clasa10', recommendedOrder: 14 },

    // New Graph Nodes
    { id: 'graph_lee', label: 'Graphs/Lee', x: 1200, y: 2800, status: null, olympiadLevel: 'clasa10', recommendedOrder: 5 },
    { id: 'graph_fill', label: 'Graphs/Flood_Fill', x: 600, y: 2800, status: null, olympiadLevel: 'clasa10', recommendedOrder: 4 },
    { id: 'graph_diameter', label: 'Graphs/Tree_Diameter', x: 600, y: 3035, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 25 },
    { id: 'graph_dial', label: 'Graphs/Shortest_Path/Dial', x: 1200, y: 3520, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 30 },

    // New Core Algorithms Nodes
    { id: 'alg_majority', label: 'Alg/Majority_Element', x: 0, y: 960, status: null, olympiadLevel: 'clasa9', recommendedOrder: 15 },

    // New Tree Algorithms Nodes
    { id: 'tree_euler', label: 'Trees/Euler_Tour', x: -800, y: 2600, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 24 },
    { id: 'tree_decomp', label: 'Trees/Decompositions', x: -400, y: 2600, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 29 },
    { id: 'tree_hld', label: 'Trees/Decompositions/HLD', x: -600, y: 2900, status: null, olympiadLevel: 'baraj', recommendedOrder: 10 },
    { id: 'tree_centroid', label: 'Trees/Decompositions/Centroid', x: -200, y: 2900, status: null, olympiadLevel: 'baraj', recommendedOrder: 4 },

    // Phase 2 Nodes
    { id: 'dp_mcm', label: 'Dynamic_Programming/MCM', x: -1458, y: 2020, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 43 },
    { id: 'sp_spfa', label: 'Graphs/Shortest_Path/SPFA', x: 1417, y: 3520, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 13 },
    { id: 'str_z', label: 'Strings/Z_Algorithm', x: 1741, y: 486, status: null, olympiadLevel: 'clasa10', recommendedOrder: 11 },
    { id: 'seg_lazy', label: 'Trees/Segment_Trees/Lazy_Propagation', x: 2156, y: 1850, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 35 },

    // Phase 3 Nodes (New Expansion)
    { id: 'graph_theory_undirected', label: 'Graphs/Theory_Undirected', x: 700, y: 2050, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 1 },
    { id: 'graph_theory_directed', label: 'Graphs/Theory_Directed', x: 700, y: 2200, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 2 },
    { id: 'scc_biconnected', label: 'Graphs/SCC/Biconnected', x: 364, y: 3520, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 22 },
    { id: 'sp_bfs01', label: 'Graphs/Shortest_Path/BFS_01', x: 1000, y: 3520, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 11 },
    { id: 'graph_bipartite', label: 'Graphs/Bipartite', x: 1191, y: 2306, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 23 },
    { id: 'graph_bipartite_matching', label: 'Graphs/Bipartite/Max_Matching', x: 1191, y: 2450, status: null, olympiadLevel: 'baraj', recommendedOrder: 15 },
    { id: 'str_manacher', label: 'Strings/Manacher', x: 1174, y: 972, status: null, olympiadLevel: 'baraj', recommendedOrder: 14 },
    { id: 'str_rabin_karp', label: 'Strings/Rabin_Karp', x: 1741, y: 972, status: null, olympiadLevel: 'clasa10', recommendedOrder: 12 },
    { id: 'ds_treap', label: 'Trees/Treap', x: 1832, y: 1850, status: null, olympiadLevel: 'baraj', recommendedOrder: 6 },
    { id: 'dq_ternary', label: 'Alg/Divide_Conquer/Ternary_Search', x: -364, y: 2256, status: null, olympiadLevel: 'clasa9', recommendedOrder: 17 },

    // New nodes added in this expansion
    { id: 'math_catalan', label: 'Math/Catalan', x: -1818, y: 1350, status: null, olympiadLevel: 'clasa10', recommendedOrder: 8 },
    { id: 'math_modinv', label: 'Math/Modular_Inverse', x: -1458, y: 1350, status: null, olympiadLevel: 'clasa10', recommendedOrder: 7 },
    { id: 'dp_digit', label: 'Dynamic_Programming/Digit_DP', x: -1782, y: 2263, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 46 },
    { id: 'dp_opt_dq', label: 'Advanced_DP/Divide_Conquer_Optimization', x: -1134, y: 2263, status: null, olympiadLevel: 'baraj', recommendedOrder: 17 },
    { id: 'ds_persistent_seg', label: 'Trees/Persistent_Segment_Tree', x: -800, y: 3100, status: null, olympiadLevel: 'baraj', recommendedOrder: 5 },
    { id: 'ds_binary_trie', label: 'Trees/Binary_Trie', x: -400, y: 3100, status: null, olympiadLevel: 'baraj', recommendedOrder: 7 },
    { id: 'graph_bridges', label: 'Graphs/Bridges_Articulation', x: 100, y: 3520, status: null, olympiadLevel: 'clasele11_12', recommendedOrder: 18 },
    { id: 'graph_mincut', label: 'Graphs/Min_Cut', x: 2187, y: 3850, status: null, olympiadLevel: 'baraj', recommendedOrder: 14 }
  ];

export const rawEdges = [
    // Basics & Fundamentals
    { from: 'ds_basics', to: 'graph_theory_concepts' },
    { from: 'graph_theory_concepts', to: 'graph_basics' },
    { from: 'ds_basics', to: 'arr' },
    { from: 'graph_basics', to: 'dfs' },
    { from: 'graph_basics', to: 'bfs' },

    // Math & Backtracking
    { from: 'math1', to: 'comb' },
    { from: 'math1', to: 'geom' },
    { from: 'math1', to: 'bkt' },
    { from: 'math1', to: 'advmath' },
    { from: 'math1', to: 'game_theory' },
    { from: 'math1', to: 'linalg' },
    { from: 'linalg', to: 'advmath' },
    { from: 'game_theory', to: 'advmath' },
    { from: 'bkt', to: 'dp' },
    { from: 'bkt', to: 'dq' },
    { from: 'bkt', to: 'meetinmid' },

    // Greedy & Sorting
    { from: 'greedy', to: 'mst' },
    { from: 'sort', to: 'mst' },
    { from: 'sort', to: 'dq_bin' },

    // Arrays & Techniques
    { from: 'arr', to: 'sort' },
    { from: 'arr', to: 'str' },
    { from: 'arr', to: 'twoptr' },
    { from: 'arr', to: 'bits' },
    { from: 'arr', to: 'diffarr' },
    { from: 'arr', to: 'dq_bin' },
    { from: 'arr', to: 'sqrtd' },

    // Divide & Conquer
    { from: 'dq', to: 'dq_merge' },
    { from: 'dq', to: 'dq_quick' },
    { from: 'dq', to: 'dq_bin' },
    { from: 'dq', to: 'dq_z' },

    // DP
    { from: 'dp', to: 'dp_knapsack' },
    { from: 'dp', to: 'dp_lcs' },
    { from: 'dp', to: 'dp_lis' },
    { from: 'dp_knapsack', to: 'dp_trees' },
    { from: 'dp_lcs', to: 'cht' },
    { from: 'dp_lis', to: 'dp_exp' },
    { from: 'dp', to: 'rmq' },
    { from: 'bits', to: 'dp_exp' },

    // Graphs
    { from: 'dfs', to: 'scc' },
    { from: 'dfs', to: 'topsort' },
    { from: 'dfs', to: 'eulerhamilton' },
    { from: 'dfs', to: 'lca' },
    { from: 'bfs', to: 'sp' },
    { from: 'bfs', to: 'maxflow' },
    { from: 'sp', to: 'maxflow' },
    { from: 'dsu', to: 'mst' },

    // Trees & Data Structures
    { from: 'rmq', to: 'aib' },
    { from: 'rmq', to: 'seg' },
    { from: 'seg', to: 'lca' },
    { from: 'sqrtd', to: 'mo' },

    // Strings
    { from: 'str', to: 'trie' },
    { from: 'str', to: 'kmp' },
    { from: 'trie', to: 'aho' },
    { from: 'kmp', to: 'aho' },
    { from: 'aho', to: 'suffix' },
    { from: 'sp', to: 'sp_dijkstra' },
    { from: 'sp', to: 'sp_bf' },
    { from: 'sp', to: 'sp_fw' },
    { from: 'mst', to: 'mst_kruskal' },
    { from: 'mst', to: 'mst_prim' },
    { from: 'scc', to: 'scc_kosaraju' },
    { from: 'scc', to: 'scc_tarjan' },
    { from: 'maxflow', to: 'maxflow_ek' },
    { from: 'maxflow', to: 'maxflow_dinic' },
    { from: 'lca', to: 'lca_bin' },
    { from: 'lca', to: 'lca_rmq' },
    { from: 'arr', to: 'ds_frequency' },
    { from: 'ds_frequency', to: 'ds_stack' },
    { from: 'ds_stack', to: 'ds_queue_deque' },
    { from: 'ds_queue_deque', to: 'ds_priority_queue' },
    { from: 'ds_priority_queue', to: 'sp_dijkstra' },

    // New Edges
    { from: 'ds_basics', to: 'fund_funcs' },
    { from: 'ds_basics', to: 'fund_structs' },
    { from: 'fund_funcs', to: 'arr' },
    { from: 'fund_structs', to: 'arr' },
    { from: 'arr', to: 'fund_digits' },
    { from: 'arr', to: 'fund_stream' },
    { from: 'arr', to: 'fund_bases' },
    { from: 'arr', to: 'fund_sim' },
    { from: 'arr', to: 'fund_stl' },
    { from: 'fund_stl', to: 'sort' },
    { from: 'fund_digits', to: 'sort' },
    { from: 'fund_stream', to: 'twoptr' },
    { from: 'advmath', to: 'math_fast_expo' },
    { from: 'math_fast_expo', to: 'math_phi' },
    { from: 'math_fast_expo', to: 'math_bigint' },
    { from: 'math_fast_expo', to: 'math_matrix_expo' },
    { from: 'math_phi', to: 'math_pie' },
    { from: 'math_phi', to: 'math_mobius' },
    { from: 'geom', to: 'geom_sweepline' },
    { from: 'geom', to: 'geom_convexhull' },
    { from: 'graph_basics', to: 'graph_fill' },
    { from: 'graph_basics', to: 'graph_lee' },
    { from: 'dfs', to: 'graph_diameter' },
    { from: 'sp', to: 'graph_dial' },
    { from: 'arr', to: 'alg_majority' },
    { from: 'alg_majority', to: 'greedy' },

    // Tree Algorithms Edges
    { from: 'dfs', to: 'tree_euler' },
    { from: 'dfs', to: 'tree_decomp' },
    { from: 'tree_decomp', to: 'tree_hld' },
    { from: 'tree_decomp', to: 'tree_centroid' },

    // Phase 2 Edges
    { from: 'dp', to: 'dp_mcm' },
    { from: 'sp', to: 'sp_spfa' },
    { from: 'str', to: 'str_z' },
    { from: 'seg', to: 'seg_lazy' },

    // Phase 3 Edges (New Expansion)
    { from: 'ds_basics', to: 'graph_theory_undirected' },
    { from: 'ds_basics', to: 'graph_theory_directed' },
    { from: 'graph_theory_undirected', to: 'graph_theory_concepts' },
    { from: 'graph_theory_directed', to: 'graph_theory_concepts' },
    { from: 'scc', to: 'scc_biconnected' },
    { from: 'sp', to: 'sp_bfs01' },
    { from: 'graph_basics', to: 'graph_bipartite' },
    { from: 'graph_bipartite', to: 'graph_bipartite_matching' },
    { from: 'str', to: 'str_manacher' },
    { from: 'str', to: 'str_rabin_karp' },
    { from: 'seg', to: 'ds_treap' },
    { from: 'dq_bin', to: 'dq_ternary' },

    // New edges added in this expansion
    { from: 'comb', to: 'math_catalan' },
    { from: 'math1', to: 'math_modinv' },
    { from: 'dp', to: 'dp_digit' },
    { from: 'dp', to: 'dp_opt_dq' },
    { from: 'seg', to: 'ds_persistent_seg' },
    { from: 'trie', to: 'ds_binary_trie' },
    { from: 'dfs', to: 'graph_bridges' },
    { from: 'maxflow', to: 'graph_mincut' }
  ];

export const olympiadPaths = {
  clasa9: {
    label: "Clasa a 9-a (Etapa Națională)",
    steps: [
      {
        title: "1. Algoritmi Elementari & Fundamente",
        nodeIds: ["ds_basics", "fund_funcs", "fund_structs", "fund_stl"]
      },
      {
        title: "2. Tablouri Unidimensionale (Vectori)",
        nodeIds: ["arr", "fund_digits", "fund_bases", "fund_sim", "fund_stream", "ds_frequency", "bits", "diffarr"]
      },
      {
        title: "3. Căutare, Sortare & Doi Vectori",
        nodeIds: ["sort", "twoptr", "alg_majority", "dq_bin", "dq_ternary"]
      },
      {
        title: "4. Divide et Impera & Greedy",
        nodeIds: ["dq", "dq_merge", "dq_quick", "dq_z", "greedy"]
      },
      {
        title: "5. Aritmetică & Combinatorică (Baze)",
        nodeIds: ["math1", "math_fast_expo", "math_phi", "comb"]
      },
      {
        title: "6. Șiruri de Caractere & Backtracking",
        nodeIds: ["str", "bkt"]
      }
    ]
  },
  clasa10: {
    label: "Clasa a 10-a (Etapa Națională)",
    steps: [
      {
        title: "1. Structuri de Date Liniare & Lee",
        nodeIds: ["ds_stack", "ds_queue_deque", "ds_priority_queue", "graph_fill", "graph_lee"]
      },
      {
        title: "2. Numere Mari & Aritmetică Modulară",
        nodeIds: ["math_bigint", "math_modinv", "math_catalan"]
      },
      {
        title: "3. Șiruri de Caractere (Avansat) & Tries",
        nodeIds: ["trie", "kmp", "str_z", "str_rabin_karp"]
      },
      {
        title: "4. Geometrie Computațională (Baze)",
        nodeIds: ["geom", "geom_convexhull"]
      },
      {
        title: "5. Programare Dinamică (Baze)",
        nodeIds: ["dp", "dp_knapsack", "dp_lcs", "dp_lis"]
      }
    ]
  },
  clasele11_12: {
    label: "Clasele 11-12 (Etapa Națională)",
    steps: [
      {
        title: "1. Algoritmi de Bază pe Grafuri",
        nodeIds: ["graph_theory_undirected", "graph_theory_directed", "graph_theory_concepts", "graph_basics", "dfs", "bfs", "topsort", "eulerhamilton"]
      },
      {
        title: "2. Drumuri Minime & MST",
        nodeIds: ["sp", "sp_dijkstra", "sp_bfs01", "sp_bf", "sp_spfa", "sp_fw", "mst", "mst_kruskal", "mst_prim"]
      },
      {
        title: "3. Conexitate & Proprietăți Grafuri",
        nodeIds: ["graph_bridges", "scc", "scc_kosaraju", "scc_tarjan", "scc_biconnected", "graph_bipartite"]
      },
      {
        title: "4. Proprietăți & Algoritmi pe Arbori",
        nodeIds: ["tree_euler", "graph_diameter", "lca", "lca_bin", "lca_rmq", "tree_decomp", "graph_dial"]
      },
      {
        title: "5. Structuri de Date Arborescente",
        nodeIds: ["dsu", "rmq", "aib", "seg", "seg_lazy"]
      },
      {
        title: "6. Square Root Decomp & Meet in the Middle",
        nodeIds: ["sqrtd", "mo", "meetinmid"]
      },
      {
        title: "7. Matematici Avansate & Algebră liniară",
        nodeIds: ["advmath", "linalg", "math_pie", "math_matrix_expo"]
      },
      {
        title: "8. Programare Dinamică Avansată",
        nodeIds: ["dp_mcm", "dp_trees", "dp_exp", "dp_digit"]
      }
    ]
  },
  baraj: {
    label: "Baraj Național (Seniori/Juniori)",
    steps: [
      {
        title: "1. Teoria Jocurilor & Möbius Inversion",
        nodeIds: ["game_theory", "math_mobius", "geom_sweepline"]
      },
      {
        title: "2. Arbori Centroid, HLD, Persistență & Treap",
        nodeIds: ["tree_centroid", "ds_persistent_seg", "ds_treap", "ds_binary_trie", "tree_hld"]
      },
      {
        title: "3. Suffix Structures & Șiruri de Caractere",
        nodeIds: ["suffix", "aho", "str_manacher"]
      },
      {
        title: "4. Flux Maxim, Cuplaje & Tăieturi",
        nodeIds: ["maxflow", "maxflow_ek", "maxflow_dinic", "graph_mincut", "graph_bipartite_matching"]
      },
      {
        title: "5. Optimizări Programare Dinamică",
        nodeIds: ["cht", "dp_opt_dq"]
      }
    ]
  }
};

