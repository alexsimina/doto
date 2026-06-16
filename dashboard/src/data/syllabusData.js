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
  { id: 'math', label: 'Math & Geometry', color: 'rgba(99, 102, 241, 0.03)', borderColor: 'rgba(99, 102, 241, 0.5)', icon: '🧮', nodes: ['math1', 'comb', 'geom', 'game_theory', 'linalg', 'advmath'] },
  { id: 'fund', label: 'Fundamentals', color: 'rgba(139, 92, 246, 0.03)', borderColor: 'rgba(139, 92, 246, 0.5)', icon: '📚', nodes: ['ds_basics', 'arr', 'sort', 'twoptr'] },
  { id: 'str', label: 'String Processing', color: 'rgba(236, 72, 153, 0.03)', borderColor: 'rgba(236, 72, 153, 0.5)', icon: '🔤', nodes: ['str', 'trie', 'kmp', 'aho', 'suffix'] },
  { id: 'dp', label: 'Dynamic Programming', color: 'rgba(245, 158, 11, 0.03)', borderColor: 'rgba(245, 158, 11, 0.5)', icon: '🧠', nodes: ['dp', 'dp_knapsack', 'dp_lcs', 'dp_lis', 'dp_trees', 'dp_exp', 'cht'] },
  { id: 'alg', label: 'Core Algorithms', color: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.5)', icon: '⚡', nodes: ['bkt', 'greedy', 'dq', 'dq_merge', 'dq_quick', 'dq_bin', 'dq_z', 'meetinmid', 'sqrtd', 'mo'] },
  { id: 'ds', label: 'Data Structures', color: 'rgba(14, 165, 233, 0.03)', borderColor: 'rgba(14, 165, 233, 0.5)', icon: '🗃️', nodes: ['bits', 'diffarr', 'rmq', 'dsu', 'aib', 'seg', 'ds_frequency', 'ds_stack', 'ds_queue_deque', 'ds_priority_queue'] },
  { id: 'graph', label: 'Graph Theory', color: 'rgba(244, 63, 94, 0.03)', borderColor: 'rgba(244, 63, 94, 0.5)', icon: '🕸️', nodes: ['graph_basics', 'dfs', 'bfs', 'topsort', 'scc', 'eulerhamilton', 'mst', 'sp', 'maxflow', 'lca', 'sp_dijkstra', 'sp_bf', 'sp_fw', 'mst_kruskal', 'mst_prim', 'scc_kosaraju', 'scc_tarjan', 'maxflow_ek', 'maxflow_dinic', 'lca_bin', 'lca_rmq'] }
];

export const getNodeDomain = (nodeId) => {
  return domainGroups.find(d => d.nodes.includes(nodeId));
};

export const rawNodes = [
    // Math & Geometry
    { id: 'math1', label: 'Math/Number_Theory', x: -1458, y: 0, status: null },
    { id: 'comb', label: 'Math/Combinatorics', x: -1701, y: 243, status: null },
    { id: 'geom', label: 'Geometry/Computational', x: -1215, y: 243, status: null },
    { id: 'advmath', label: 'Math/Advanced', x: -1458, y: 648, status: null },
    { id: 'game_theory', label: 'Math/Game_Theory', x: -1701, y: 445, status: null },
    { id: 'linalg', label: 'Math/Linear_Algebra', x: -1215, y: 445, status: null },

    // Fundamentals
    { id: 'ds_basics', label: 'Data_Structures/Basics', x: 0, y: 0, status: null },
    { id: 'arr', label: 'Arrays', x: 0, y: 243, status: null },
    { id: 'sort', label: 'Sorting', x: -283, y: 486, status: null },
    { id: 'twoptr', label: 'Techniques/Two_Pointers', x: 283, y: 486, status: null },

    // String Processing
    { id: 'str', label: 'Strings', x: 1458, y: 0, status: null },
    { id: 'trie', label: 'Strings/Trie', x: 1174, y: 243, status: null },
    { id: 'kmp', label: 'Strings/KMP', x: 1741, y: 243, status: null },
    { id: 'aho', label: 'Strings/Aho_Corasick', x: 1458, y: 486, status: null },
    { id: 'suffix', label: 'Strings/Suffix_Structures', x: 1458, y: 729, status: null },

    // Core Algorithms
    { id: 'bkt', label: 'Alg/Backtracking', x: -364, y: 810, status: null },
    { id: 'greedy', label: 'Alg/Greedy', x: 364, y: 810, status: null },
    { id: 'dq', label: 'Alg/Divide_Conquer', x: -364, y: 1134, status: null },
    { id: 'dq_bin', label: 'Alg/Divide_Conquer/Binary_Search', x: 364, y: 1134, status: null },
    { id: 'dq_merge', label: 'Alg/Divide_Conquer/Merge_Sort', x: -688, y: 1458, status: null },
    { id: 'dq_quick', label: 'Alg/Divide_Conquer/Quick_Sort', x: -40, y: 1458, status: null },
    { id: 'dq_z', label: 'Alg/Divide_Conquer/Z_Traversal', x: 300, y: 1458, status: null },
    { id: 'sqrtd', label: 'Alg/Square_Root_Decomp', x: 620, y: 1458, status: null },
    { id: 'meetinmid', label: 'Alg/Meet_in_the_Middle', x: -364, y: 1782, status: null },
    { id: 'mo', label: 'Alg/Mo_Algorithm', x: 620, y: 1782, status: null },

    // Dynamic Programming
    { id: 'dp', label: 'Dynamic_Programming', x: -1458, y: 1134, status: null },
    { id: 'dp_knapsack', label: 'Dynamic_Programming/Knapsack', x: -1782, y: 1377, status: null },
    { id: 'dp_lcs', label: 'Dynamic_Programming/LCS', x: -1458, y: 1377, status: null },
    { id: 'dp_lis', label: 'Dynamic_Programming/LIS', x: -1134, y: 1377, status: null },
    { id: 'dp_trees', label: 'Advanced_DP/Trees_Graphs', x: -1782, y: 1620, status: null },
    { id: 'dp_exp', label: 'Advanced_DP/Exponential_States', x: -1134, y: 1620, status: null },
    { id: 'cht', label: 'Advanced_DP/CHT', x: -1458, y: 1863, status: null },

    // Data Structures
    { id: 'bits', label: 'Techniques/Bitwise_Ops', x: 1296, y: 1053, status: null },
    { id: 'diffarr', label: 'Techniques/Difference_Arrays', x: 1296, y: 1296, status: null },
    { id: 'rmq', label: 'Data_Structures/RMQ', x: 1782, y: 1296, status: null },
    { id: 'dsu', label: 'Data_Structures/Disjoint_Sets', x: 1782, y: 1053, status: null },
    { id: 'aib', label: 'Trees/Fenwick_Tree', x: 1458, y: 1620, status: null },
    { id: 'seg', label: 'Trees/Segment_Trees', x: 2106, y: 1620, status: null },

    // New Data Structures Nodes
    { id: 'ds_frequency', label: 'Data_Structures/Frequency_Vectors', x: 960, y: 1053, status: null },
    { id: 'ds_stack', label: 'Data_Structures/Stack', x: 960, y: 1296, status: null },
    { id: 'ds_queue_deque', label: 'Data_Structures/Queue_Deque', x: 960, y: 1539, status: null },
    { id: 'ds_priority_queue', label: 'Data_Structures/Priority_Queue', x: 960, y: 1782, status: null },

    // Graph Theory
    { id: 'graph_basics', label: 'Graphs/Basics', x: 891, y: 2106, status: null },
    { id: 'dfs', label: 'Graphs/DFS', x: 364, y: 2430, status: null },
    { id: 'bfs', label: 'Graphs/BFS', x: 1417, y: 2430, status: null },
    { id: 'mst', label: 'Graphs/MST', x: 2187, y: 2430, status: null },
    { id: 'topsort', label: 'Graphs/Topological_Sort', x: -121, y: 2835, status: null },
    { id: 'scc', label: 'Graphs/SCC_Biconnected', x: 364, y: 2835, status: null },
    { id: 'eulerhamilton', label: 'Graphs/Eulerian_Hamiltonian', x: 891, y: 2835, status: null },
    { id: 'sp', label: 'Graphs/Shortest_Path', x: 1417, y: 2835, status: null },
    { id: 'maxflow', label: 'Graphs/Max_Flow', x: 2187, y: 2835, status: null },
    { id: 'lca', label: 'Graphs/LCA', x: 607, y: 3320, status: null },
    { id: 'sp_dijkstra', label: 'Graphs/Shortest_Path/Dijkstra', x: 1093, y: 3159, status: null },
    { id: 'sp_bf', label: 'Graphs/Shortest_Path/Bellman_Ford', x: 1417, y: 3159, status: null },
    { id: 'sp_fw', label: 'Graphs/Shortest_Path/Floyd_Warshall', x: 1741, y: 3159, status: null },
    { id: 'mst_kruskal', label: 'Graphs/MST/Kruskal', x: 2065, y: 3159, status: null },
    { id: 'mst_prim', label: 'Graphs/MST/Prim', x: 2389, y: 3159, status: null },
    { id: 'scc_kosaraju', label: 'Graphs/SCC/Kosaraju', x: 202, y: 3159, status: null },
    { id: 'scc_tarjan', label: 'Graphs/SCC/Tarjan', x: 526, y: 3159, status: null },
    { id: 'maxflow_ek', label: 'Graphs/Max_Flow/Edmonds_Karp', x: 2065, y: 3483, status: null },
    { id: 'maxflow_dinic', label: 'Graphs/Max_Flow/Dinic', x: 2389, y: 3483, status: null },
    { id: 'lca_bin', label: 'Graphs/LCA/Binary_Lifting', x: 445, y: 3483, status: null },
    { id: 'lca_rmq', label: 'Graphs/LCA/Euler_RMQ', x: 769, y: 3483, status: null }
  ];

export const rawEdges = [
    // Basics & Fundamentals
    { from: 'ds_basics', to: 'graph_basics' },
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
    { from: 'ds_priority_queue', to: 'sp_dijkstra' }
  ];
