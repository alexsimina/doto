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
    { id: 'math1', label: 'Math/Number_Theory', x: -1458, y: 0, status: null },
    { id: 'comb', label: 'Math/Combinatorics', x: -1818, y: 243, status: null },
    { id: 'geom', label: 'Geometry/Computational', x: -1098, y: 243, status: null },
    { id: 'advmath', label: 'Math/Advanced', x: -1458, y: 648, status: null },
    { id: 'game_theory', label: 'Math/Game_Theory', x: -1818, y: 445, status: null },
    { id: 'linalg', label: 'Math/Linear_Algebra', x: -1098, y: 445, status: null },

    // Fundamentals
    { id: 'ds_basics', label: 'Data_Structures/Basics', x: 0, y: 0, status: null },
    { id: 'arr', label: 'Arrays', x: 0, y: 300, status: null },
    { id: 'sort', label: 'Sorting', x: -300, y: 660, status: null },
    { id: 'twoptr', label: 'Techniques/Two_Pointers', x: 300, y: 660, status: null },

    // String Processing
    { id: 'str', label: 'Strings', x: 1458, y: 0, status: null },
    { id: 'trie', label: 'Strings/Trie', x: 1174, y: 243, status: null },
    { id: 'kmp', label: 'Strings/KMP', x: 1741, y: 243, status: null },
    { id: 'aho', label: 'Strings/Aho_Corasick', x: 1458, y: 486, status: null },
    { id: 'suffix', label: 'Strings/Suffix_Structures', x: 1458, y: 729, status: null },

    // Core Algorithms
    { id: 'bkt', label: 'Alg/Backtracking', x: -364, y: 960, status: null },
    { id: 'greedy', label: 'Alg/Greedy', x: 364, y: 960, status: null },
    { id: 'dq', label: 'Alg/Divide_Conquer', x: -364, y: 1284, status: null },
    { id: 'dq_bin', label: 'Alg/Divide_Conquer/Binary_Search', x: 364, y: 1284, status: null },
    { id: 'dq_merge', label: 'Alg/Divide_Conquer/Merge_Sort', x: -688, y: 1608, status: null },
    { id: 'dq_quick', label: 'Alg/Divide_Conquer/Quick_Sort', x: -40, y: 1608, status: null },
    { id: 'dq_z', label: 'Alg/Divide_Conquer/Z_Traversal', x: 300, y: 1608, status: null },
    { id: 'sqrtd', label: 'Alg/Square_Root_Decomp', x: 620, y: 1608, status: null },
    { id: 'meetinmid', label: 'Alg/Meet_in_the_Middle', x: -364, y: 1932, status: null },
    { id: 'mo', label: 'Alg/Mo_Algorithm', x: 620, y: 1932, status: null },

    // Dynamic Programming
    { id: 'dp', label: 'Dynamic_Programming', x: -1458, y: 1534, status: null },
    { id: 'dp_knapsack', label: 'Dynamic_Programming/Knapsack', x: -1782, y: 1777, status: null },
    { id: 'dp_lcs', label: 'Dynamic_Programming/LCS', x: -1458, y: 1777, status: null },
    { id: 'dp_lis', label: 'Dynamic_Programming/LIS', x: -1134, y: 1777, status: null },
    { id: 'dp_trees', label: 'Advanced_DP/Trees_Graphs', x: -1782, y: 2020, status: null },
    { id: 'dp_exp', label: 'Advanced_DP/Exponential_States', x: -1134, y: 2020, status: null },
    { id: 'cht', label: 'Advanced_DP/CHT', x: -1458, y: 2263, status: null },

    // Data Structures
    { id: 'bits', label: 'Techniques/Bitwise_Ops', x: 1346, y: 1053, status: null },
    { id: 'diffarr', label: 'Techniques/Difference_Arrays', x: 1346, y: 1296, status: null },
    { id: 'rmq', label: 'Data_Structures/RMQ', x: 1832, y: 1296, status: null },
    { id: 'dsu', label: 'Data_Structures/Disjoint_Sets', x: 1832, y: 1053, status: null },
    { id: 'aib', label: 'Trees/Fenwick_Tree', x: 1508, y: 1620, status: null },
    { id: 'seg', label: 'Trees/Segment_Trees', x: 2156, y: 1620, status: null },

    // New Data Structures Nodes
    { id: 'ds_frequency', label: 'Data_Structures/Frequency_Vectors', x: 1010, y: 1053, status: null },
    { id: 'ds_stack', label: 'Data_Structures/Stack', x: 1010, y: 1296, status: null },
    { id: 'ds_queue_deque', label: 'Data_Structures/Queue_Deque', x: 1010, y: 1539, status: null },
    { id: 'ds_priority_queue', label: 'Data_Structures/Priority_Queue', x: 1010, y: 1782, status: null },

    // Graph Theory
    { id: 'graph_theory_concepts', label: 'Graphs/Theory_Concepts', x: 891, y: 2050, status: null },
    { id: 'graph_basics', label: 'Graphs/Basics', x: 891, y: 2306, status: null },
    { id: 'dfs', label: 'Graphs/DFS', x: 364, y: 2630, status: null },
    { id: 'bfs', label: 'Graphs/BFS', x: 1417, y: 2630, status: null },
    { id: 'mst', label: 'Graphs/MST', x: 2187, y: 2630, status: null },
    { id: 'topsort', label: 'Graphs/Topological_Sort', x: -121, y: 3035, status: null },
    { id: 'scc', label: 'Graphs/SCC_Biconnected', x: 240, y: 3035, status: null },
    { id: 'eulerhamilton', label: 'Graphs/Eulerian_Hamiltonian', x: 960, y: 3035, status: null },
    { id: 'sp', label: 'Graphs/Shortest_Path', x: 1417, y: 3035, status: null },
    { id: 'maxflow', label: 'Graphs/Max_Flow', x: 2187, y: 3035, status: null },
    { id: 'lca', label: 'Graphs/LCA', x: 607, y: 3520, status: null },
    { id: 'sp_dijkstra', label: 'Graphs/Shortest_Path/Dijkstra', x: 1093, y: 3359, status: null },
    { id: 'sp_bf', label: 'Graphs/Shortest_Path/Bellman_Ford', x: 1417, y: 3359, status: null },
    { id: 'sp_fw', label: 'Graphs/Shortest_Path/Floyd_Warshall', x: 1741, y: 3359, status: null },
    { id: 'mst_kruskal', label: 'Graphs/MST/Kruskal', x: 2065, y: 3359, status: null },
    { id: 'mst_prim', label: 'Graphs/MST/Prim', x: 2389, y: 3359, status: null },
    { id: 'scc_kosaraju', label: 'Graphs/SCC/Kosaraju', x: 202, y: 3359, status: null },
    { id: 'scc_tarjan', label: 'Graphs/SCC/Tarjan', x: 526, y: 3359, status: null },
    { id: 'maxflow_ek', label: 'Graphs/Max_Flow/Edmonds_Karp', x: 2065, y: 3683, status: null },
    { id: 'maxflow_dinic', label: 'Graphs/Max_Flow/Dinic', x: 2389, y: 3683, status: null },
    { id: 'lca_bin', label: 'Graphs/LCA/Binary_Lifting', x: 445, y: 3683, status: null },
    { id: 'lca_rmq', label: 'Graphs/LCA/Euler_RMQ', x: 769, y: 3683, status: null },

    // New Fundamentals Nodes
    { id: 'fund_digits', label: 'Fundamentals/Digits', x: -360, y: 300, status: null },
    { id: 'fund_stream', label: 'Fundamentals/Streaming', x: 360, y: 300, status: null },
    { id: 'fund_bases', label: 'Fundamentals/Base_Conversion', x: -540, y: 480, status: null },
    { id: 'fund_sim', label: 'Fundamentals/Simulations', x: 540, y: 480, status: null },
    { id: 'fund_funcs', label: 'Fundamentals/Functions', x: -180, y: 150, status: null },
    { id: 'fund_structs', label: 'Fundamentals/Structs', x: 180, y: 150, status: null },
    { id: 'fund_stl', label: 'Fundamentals/STL', x: 0, y: 480, status: null },

    // New Math Nodes
    { id: 'math_fast_expo', label: 'Math/Fast_Exponentiation', x: -1458, y: 810, status: null },
    { id: 'math_bigint', label: 'Math/Big_Integers', x: -1098, y: 810, status: null },
    { id: 'math_phi', label: 'Math/Euler_Phi', x: -1818, y: 810, status: null },
    { id: 'math_pie', label: 'Math/PIE', x: -1818, y: 1000, status: null },
    { id: 'math_mobius', label: 'Math/Mobius', x: -1458, y: 1000, status: null },
    { id: 'math_matrix_expo', label: 'Math/Matrix_Exponentiation', x: -1098, y: 1000, status: null },
    { id: 'geom_sweepline', label: 'Geometry/Sweep_Line', x: -1818, y: 1200, status: null },
    { id: 'geom_convexhull', label: 'Geometry/Convex_Hull', x: -1098, y: 1200, status: null },

    // New Graph Nodes
    { id: 'graph_lee', label: 'Graphs/Lee', x: 1200, y: 2800, status: null },
    { id: 'graph_fill', label: 'Graphs/Flood_Fill', x: 600, y: 2800, status: null },
    { id: 'graph_diameter', label: 'Graphs/Tree_Diameter', x: 600, y: 3035, status: null },
    { id: 'graph_dial', label: 'Graphs/Shortest_Path/Dial', x: 1200, y: 3520, status: null },

    // New Core Algorithms Nodes
    { id: 'alg_majority', label: 'Alg/Majority_Element', x: 0, y: 960, status: null },

    // New Tree Algorithms Nodes
    { id: 'tree_euler', label: 'Trees/Euler_Tour', x: -800, y: 2600, status: null },
    { id: 'tree_decomp', label: 'Trees/Decompositions', x: -400, y: 2600, status: null },
    { id: 'tree_hld', label: 'Trees/Decompositions/HLD', x: -600, y: 2900, status: null },
    { id: 'tree_centroid', label: 'Trees/Decompositions/Centroid', x: -200, y: 2900, status: null },

    // Phase 2 Nodes
    { id: 'dp_mcm', label: 'Dynamic_Programming/MCM', x: -1458, y: 2020, status: null },
    { id: 'sp_spfa', label: 'Graphs/Shortest_Path/SPFA', x: 1417, y: 3520, status: null },
    { id: 'str_z', label: 'Strings/Z_Algorithm', x: 1741, y: 486, status: null },
    { id: 'seg_lazy', label: 'Trees/Segment_Trees/Lazy_Propagation', x: 2156, y: 1850, status: null },

    // Phase 3 Nodes (New Expansion)
    { id: 'graph_theory_undirected', label: 'Graphs/Theory_Undirected', x: 700, y: 2050, status: null },
    { id: 'graph_theory_directed', label: 'Graphs/Theory_Directed', x: 700, y: 2200, status: null },
    { id: 'scc_biconnected', label: 'Graphs/SCC/Biconnected', x: 364, y: 3520, status: null },
    { id: 'sp_bfs01', label: 'Graphs/Shortest_Path/BFS_01', x: 1000, y: 3520, status: null },
    { id: 'graph_bipartite', label: 'Graphs/Bipartite', x: 1191, y: 2306, status: null },
    { id: 'graph_bipartite_matching', label: 'Graphs/Bipartite/Max_Matching', x: 1191, y: 2450, status: null },
    { id: 'str_manacher', label: 'Strings/Manacher', x: 1174, y: 972, status: null },
    { id: 'str_rabin_karp', label: 'Strings/Rabin_Karp', x: 1741, y: 972, status: null },
    { id: 'ds_treap', label: 'Trees/Treap', x: 1832, y: 1850, status: null },
    { id: 'dq_ternary', label: 'Alg/Divide_Conquer/Ternary_Search', x: -364, y: 2256, status: null },

    // New nodes added in this expansion
    { id: 'math_catalan', label: 'Math/Catalan', x: -1818, y: 1350, status: null },
    { id: 'math_modinv', label: 'Math/Modular_Inverse', x: -1458, y: 1350, status: null },
    { id: 'dp_digit', label: 'Dynamic_Programming/Digit_DP', x: -1782, y: 2263, status: null },
    { id: 'dp_opt_dq', label: 'Advanced_DP/Divide_Conquer_Optimization', x: -1134, y: 2263, status: null },
    { id: 'ds_persistent_seg', label: 'Trees/Persistent_Segment_Tree', x: -800, y: 3100, status: null },
    { id: 'ds_binary_trie', label: 'Trees/Binary_Trie', x: -400, y: 3100, status: null },
    { id: 'graph_bridges', label: 'Graphs/Bridges_Articulation', x: 100, y: 3520, status: null },
    { id: 'graph_mincut', label: 'Graphs/Min_Cut', x: 2187, y: 3850, status: null }
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
    { from: 'dfs', to: 'graph_bridges' },
    { from: 'maxflow', to: 'graph_mincut' }
  ];

export const olympiadTracks = [
  {
    id: 'g9',
    label: 'Clasa a IX-a',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    badge: '🥉',
    nodes: [
      'ds_basics',
      'fund_digits',
      'math1',
      'math_fast_expo',
      'fund_bases',
      'bits',
      'fund_stream',
      'arr',
      'ds_frequency',
      'sort',
      'dq_bin',
      'alg_majority',
      'twoptr',
      'diffarr',
      'fund_structs',
      'greedy',
      'fund_funcs',
      'fund_stl',
      'math_phi',
      'comb'
    ]
  },
  {
    id: 'g10',
    label: 'Clasa a X-a',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    badge: '🥈',
    nodes: [
      'ds_basics', 'arr', 'sort', 'dq_bin', 'greedy', 'bits',
      'str',
      'ds_stack',
      'ds_queue_deque',
      'fund_stl',
      'math_bigint',
      'math_modinv',
      'dq',
      'dq_merge',
      'dq_quick',
      'dq_z',
      'dq_ternary',
      'geom',
      'geom_sweepline',
      'geom_convexhull',
      'bkt',
      'dp',
      'dp_knapsack',
      'dp_lcs',
      'dp_lis'
    ]
  },
  {
    id: 'g11_12',
    label: 'Clasele XI-XII',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    badge: '🥇',
    nodes: [
      'ds_stack', 'ds_queue_deque', 'dp',
      'dp_trees',
      'dp_exp',
      'graph_theory_concepts',
      'graph_basics',
      'dfs',
      'bfs',
      'mst',
      'sp',
      'topsort',
      'scc',
      'eulerhamilton',
      'graph_bipartite',
      'graph_bipartite_matching',
      'ds_priority_queue',
      'ds_treap',
      'dsu',
      'scc_biconnected',
      'graph_bridges',
      'graph_dial',
      'sp_spfa',
      'lca',
      'lca_bin',
      'lca_rmq',
      'graph_diameter',
      'aib',
      'seg',
      'seg_lazy',
      'sqrtd',
      'mo',
      'rmq',
      'meetinmid',
      'math_matrix_expo',
      'math_pie',
      'math_mobius'
    ]
  },
  {
    id: 'baraj',
    label: 'Baraj & Lot',
    color: '#d946ef',
    glowColor: 'rgba(217, 70, 239, 0.4)',
    badge: '🌌',
    nodes: [
      'seg', 'lca',
      'maxflow',
      'maxflow_ek',
      'maxflow_dinic',
      'graph_mincut',
      'tree_euler',
      'tree_decomp',
      'tree_hld',
      'tree_centroid',
      'ds_persistent_seg',
      'ds_binary_trie',
      'dp_opt_dq',
      'cht',
      'dp_digit',
      'dp_mcm',
      'suffix',
      'aho',
      'str_manacher',
      'str_rabin_karp',
      'str_z',
      'math_catalan',
      'math_modinv',
      'geom_sweepline'
    ]
  }
];
