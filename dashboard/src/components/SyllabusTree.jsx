import { useState, useRef, useEffect, useMemo } from 'react';
import { getCategoryIcon, domainGroups, getNodeDomain, rawNodes, rawEdges, olympiadTracks } from '../data/syllabusData';

const SyllabusTree = ({ userXp = {}, onNodeClick }) => {
  const getStatus = (label) => {
    const xp = userXp[label] || 0;
    if (xp >= 100) return 'completed';
    if (xp > 0) return 'in-progress';
    return 'locked';
  };

  const nodes = useMemo(() => {
    const layoutOverrides = {
      // --- MATH & GEOMETRY (extrema stângă) ---
      'math1': { x: -3500, y: 360 },
      'math_bigint': { x: -3500, y: 540 },
      'math_modinv': { x: -3180, y: 540 },
      'math_fast_expo': { x: -3820, y: 720 },
      'comb': { x: -3820, y: 1080 },
      'geom': { x: -3180, y: 1080 },
      'math_phi': { x: -4140, y: 1080 },
      'math_matrix_expo': { x: -2860, y: 1080 },
      'geom_sweepline': { x: -3200, y: 1260 },
      'geom_convexhull': { x: -2880, y: 1260 },
      'math_catalan': { x: -3840, y: 1260 },
      'math_pie': { x: -3520, y: 1260 },
      'linalg': { x: -2560, y: 1260 },
      'game_theory': { x: -3820, y: 1440 },
      'advmath': { x: -2540, y: 1440 },
      'math_mobius': { x: -4140, y: 1440 },

      // --- FUNDAMENTALS (centru-sus) ---
      'ds_basics': { x: 400, y: 0 },
      'fund_funcs': { x: 200, y: 160 },
      'fund_structs': { x: 600, y: 160 },
      'arr': { x: 400, y: 320 },
      'fund_digits': { x: 200, y: 500 },
      'fund_bases': { x: 380, y: 680 },
      'fund_stream': { x: 100, y: 680 },
      'fund_sim': { x: 720, y: 500 },
      'fund_stl': { x: 940, y: 680 },
      'ds_frequency': { x: 400, y: 980 },
      'diffarr': { x: 200, y: 1160 },
      'bits': { x: 280, y: 1340 },
      'sort': { x: -200, y: 680 },
      'twoptr': { x: 660, y: 680 },

      // --- DATA STRUCTURES (centru-dreapta) ---
      'ds_stack': { x: 200, y: 1520 },
      'ds_queue_deque': { x: 200, y: 1700 },
      'ds_priority_queue': { x: 200, y: 1880 },
      'dsu': { x: 200, y: 2060 },
      'rmq': { x: 600, y: 1160 },
      'aib': { x: 600, y: 1340 },
      'seg': { x: 920, y: 1340 },
      'seg_lazy': { x: 920, y: 1520 },
      'ds_treap': { x: 920, y: 1700 },

      // --- CORE ALGORITHMS (stânga-sus) ---
      'alg_majority': { x: -1040, y: 600 },
      'greedy': { x: -1040, y: 780 },
      'dq_bin': { x: -720, y: 600 },
      'sqrtd': { x: -720, y: 780 },
      'mo': { x: -1600, y: 960 },
      'meetinmid': { x: -1360, y: 780 },
      'bkt': { x: -1680, y: 600 },
      'dq': { x: -1680, y: 780 },
      'dq_merge': { x: -1920, y: 960 },
      'dq_quick': { x: -1280, y: 960 },
      'dq_z': { x: -1820, y: 1140 },
      'dq_ternary': { x: -960, y: 960 },

      // --- DYNAMIC PROGRAMMING (stânga-jos) ---
      'dp': { x: -1700, y: 1500 },
      'dp_knapsack': { x: -2020, y: 1680 },
      'dp_lis': { x: -1700, y: 1680 },
      'dp_lcs': { x: -1380, y: 1680 },
      'dp_digit': { x: -2020, y: 1860 },
      'dp_mcm': { x: -1380, y: 1860 },
      'dp_trees': { x: -2020, y: 2040 },
      'dp_exp': { x: -1700, y: 2040 },
      'cht': { x: -1380, y: 2040 },
      'dp_opt_dq': { x: -1060, y: 2040 },

      // --- STRING PROCESSING (dreapta-mijloc) ---
      'str': { x: 1700, y: 400 },
      'str_rabin_karp': { x: 1380, y: 580 },
      'str_z': { x: 1700, y: 580 },
      'str_manacher': { x: 2020, y: 580 },
      'kmp': { x: 1540, y: 760 },
      'trie': { x: 1860, y: 760 },
      'aho': { x: 1700, y: 940 },
      'suffix': { x: 1700, y: 1120 },

      // --- TREE ALGORITHMS (dreapta-jos) ---
      'ds_persistent_seg': { x: 1380, y: 1410 },
      'ds_binary_trie': { x: 1700, y: 1410 },
      'tree_euler': { x: 2020, y: 1410 },
      'tree_decomp': { x: 2340, y: 1590 },
      'tree_hld': { x: 2180, y: 1770 },
      'tree_centroid': { x: 2500, y: 1770 },

      // --- GRAPH THEORY (dreapta) ---
      'graph_theory_concepts': { x: 4330, y: 650 },
      'graph_theory_undirected': { x: 3930, y: 830 },
      'graph_theory_directed': { x: 4730, y: 830 },
      'graph_basics': { x: 4330, y: 1010 },
      'dfs': { x: 3830, y: 1190 },
      'graph_fill': { x: 3530, y: 1370 },
      'topsort': { x: 3210, y: 1550 },
      'graph_bridges': { x: 3850, y: 1550 },
      'eulerhamilton': { x: 4170, y: 1550 },
      'scc': { x: 3190, y: 1730 },
      'scc_kosaraju': { x: 2870, y: 1910 },
      'scc_tarjan': { x: 3190, y: 1910 },
      'scc_biconnected': { x: 3510, y: 1910 },
      'graph_diameter': { x: 4170, y: 1730 },
      'bfs': { x: 4630, y: 1190 },
      'graph_lee': { x: 4230, y: 1370 },
      'sp': { x: 4630, y: 1370 },
      'sp_dijkstra': { x: 4490, y: 1550 },
      'sp_bf': { x: 4810, y: 1550 },
      'sp_bfs01': { x: 5130, y: 1550 },
      'sp_fw': { x: 3530, y: 1730 },
      'sp_spfa': { x: 3850, y: 1730 },
      'graph_dial': { x: 4470, y: 1730 },
      'maxflow': { x: 4890, y: 1730 },
      'maxflow_ek': { x: 4570, y: 1910 },
      'maxflow_dinic': { x: 4890, y: 1910 },
      'graph_mincut': { x: 5210, y: 1910 },
      'graph_bipartite': { x: 5280, y: 1190 },
      'graph_bipartite_matching': { x: 5280, y: 1370 },
      'lca': { x: 5610, y: 1370 },
      'lca_bin': { x: 5450, y: 1550 },
      'lca_rmq': { x: 5770, y: 1550 },
      'mst': { x: 3430, y: 2060 },
      'mst_kruskal': { x: 3270, y: 2240 },
      'mst_prim': { x: 3590, y: 2240 }
    };

    return rawNodes.map(rawNode => {
      const node = { ...rawNode, status: getStatus(rawNode.label) };
      if (layoutOverrides[node.id]) {
        const { x, y } = layoutOverrides[node.id];
        return { ...node, x, y };
      }
      return node;
    });
  }, [userXp]);
  const edges = rawEdges;

  const domainsWithBounds = domainGroups.map(domain => {
    const domainNodes = nodes.filter(n => domain.nodes.includes(n.id));
    if (domainNodes.length === 0) return { ...domain, bounds: null };
    const minX = Math.min(...domainNodes.map(n => n.x)) - 180;
    const maxX = Math.max(...domainNodes.map(n => n.x)) + 180;
    const minY = Math.min(...domainNodes.map(n => n.y)) - 140;
    const maxY = Math.max(...domainNodes.map(n => n.y)) + 140;
    return {
      ...domain,
      bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY }
    };
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'var(--success-color)';
      case 'in-progress': return 'var(--accent-secondary)';
      case 'locked': return 'rgba(255, 255, 255, 0.15)';
      default: return '#fff';
    }
  };

  const [hoveredNode, setHoveredNode] = useState(null);

  // Compute all upward ancestor distances from the hovered node
  const upwardDistances = useMemo(() => {
    if (!hoveredNode) return {};
    const distances = {};
    distances[hoveredNode] = 0;
    const queue = [hoveredNode];
    while (queue.length > 0) {
      const current = queue.shift();
      const currentDist = distances[current];
      const parents = edges.filter(e => e.to === current).map(e => e.from);
      for (const parent of parents) {
        if (distances[parent] === undefined || distances[parent] > currentDist + 1) {
          distances[parent] = currentDist + 1;
          queue.push(parent);
        }
      }
    }
    return distances;
  }, [hoveredNode, edges]);

  const [scale, setScale] = useState(0.85);
  const [position, setPosition] = useState({ x: 200, y: 1950 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const scaleRef = useRef(scale);
  const positionRef = useRef(position);

  useEffect(() => {
    scaleRef.current = scale;
    positionRef.current = position;
  }, [scale, position]);

  const handleZoomIncrement = (step) => {
    const currentScale = scaleRef.current;
    const newScale = Math.max(0.1, Math.min(currentScale + step, 4));
    if (newScale === currentScale) return;
    
    const k = newScale / currentScale;
    const currentPos = positionRef.current;
    const newPosX = currentPos.x * k;
    const newPosY = currentPos.y * k;
    
    scaleRef.current = newScale;
    positionRef.current = { x: newPosX, y: newPosY };
    setScale(newScale);
    setPosition({ x: newPosX, y: newPosY });
  };

  // QOL States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [flashedNodeId, setFlashedNodeId] = useState(null);
  const [activeDomainFilter, setActiveDomainFilter] = useState(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const flashTimeoutRef = useRef(null);

  // Olympiad Track States
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isVoyageMode, setIsVoyageMode] = useState(false);
  const [voyageStep, setVoyageStep] = useState(0);
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [isHudHovered, setIsHudHovered] = useState(false);

  const activeTrack = activeTrackId ? olympiadTracks.find(t => t.id === activeTrackId) : null;
  const activeTrackNodes = activeTrack ? activeTrack.nodes : [];

  const nextTargetIndex = activeTrackId ? activeTrackNodes.findIndex(nId => {
    const nodeObj = nodes.find(n => n.id === nId);
    return nodeObj && nodeObj.status !== 'completed';
  }) : -1;
  const nextTargetNodeId = (activeTrackId && nextTargetIndex !== -1) ? activeTrackNodes[nextTargetIndex] : null;

  // Calcularea recomandării globale pe baza progresului general (caută primul nod nefinalizat din toate traseele)
  let globalRecommendedNodeId = null;
  let globalRecommendedTrack = null;
  let globalRecommendedIndex = -1;

  for (const track of olympiadTracks) {
    const uncompletedIdx = track.nodes.findIndex(nId => {
      const nodeObj = nodes.find(n => n.id === nId);
      return nodeObj && nodeObj.status !== 'completed';
    });
    if (uncompletedIdx !== -1) {
      globalRecommendedNodeId = track.nodes[uncompletedIdx];
      globalRecommendedTrack = track;
      globalRecommendedIndex = uncompletedIdx;
      break;
    }
  }

  // Ținta activă este fie următorul pas din traseul activ, fie recomandarea globală
  const targetNodeId = activeTrackId ? nextTargetNodeId : globalRecommendedNodeId;

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

  // Slide up HUD when mouse is at the bottom of the screen
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Dacă utilizatorul trage harta (drag), HUD-ul rămâne ascuns
      if (isDragging) {
        setIsHudOpen(false);
        return;
      }
      
      const threshold = window.innerHeight - 55; // 55px din marginea inferioară a ecranului
      if (e.clientY >= threshold) {
        setIsHudOpen(true);
      } else if (!isHudHovered) {
        setIsHudOpen(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHudHovered, isDragging]);

  const fitDomain = (domain) => {
    if (!domain.bounds) return;
    const container = containerRef.current;
    const W = container ? container.clientWidth : 1200;
    const H = container ? container.clientHeight : 800;
    const { x, y, w, h } = domain.bounds;
    
    const targetScale = Math.max(0.4, Math.min((W - 140) / w, (H - 140) / h, 1.15));
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    
    setScale(targetScale);
    setPosition({
      x: 1000 - centerX,
      y: 2200 - centerY
    });
  };

  const fitAll = () => {
    const container = containerRef.current;
    const W = container ? container.clientWidth : 1200;
    const H = container ? container.clientHeight : 800;
    const minX = -4320;
    const maxX = 5950;
    const minY = -140;
    const maxY = 2440;
    const w = maxX - minX;
    const h = maxY - minY;
    const targetScale = Math.max(0.10, Math.min((W - 140) / w, (H - 140) / h, 0.95));
    setScale(targetScale);
    setPosition({
      x: 1000 - (minX + maxX) / 2,
      y: 2200 - (minY + maxY) / 2
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const cleanQuery = query.toLowerCase();
    const matches = nodes.filter(n => {
      const cleanLabel = n.label.toLowerCase();
      const labelWords = n.label.replace(/_/g, ' ').replace(/\//g, ' ').toLowerCase();
      return cleanLabel.includes(cleanQuery) || labelWords.includes(cleanQuery);
    });
    setSearchResults(matches.slice(0, 10));
  };

  const handleSelectNode = (node) => {
    setPosition({
      x: 1000 - node.x,
      y: 2200 - node.y
    });
    setScale(1.0);
    
    setFlashedNodeId(node.id);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => {
      setFlashedNodeId(null);
    }, 2500);
    
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    const handleWheelNative = (e) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const zoomSensitivity = 0.002;
      const currentScale = scaleRef.current;
      const currentPos = positionRef.current;

      const newScale = Math.max(0.1, Math.min(currentScale - e.deltaY * zoomSensitivity, 4));
      if (newScale === currentScale) return;

      const cx_v = container.clientWidth / 2;
      const cy_v = container.clientHeight / 2;

      const dxCursor = cursorX - cx_v;
      const dyCursor = cursorY - cy_v;

      const k = newScale / currentScale;
      const newPosX = dxCursor - (dxCursor - currentPos.x) * k;
      const newPosY = dyCursor - (dyCursor - currentPos.y) * k;

      scaleRef.current = newScale;
      positionRef.current = { x: newPosX, y: newPosY };

      setScale(newScale);
      setPosition({ x: newPosX, y: newPosY });
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheelNative, { passive: false });
    }
    return () => {
      if (el) {
        el.removeEventListener('wheel', handleWheelNative);
      }
    };
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement && (
        document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA'
      )) {
        return;
      }
      
      const moveStep = 60;
      const zoomStep = 0.05;
      
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setPosition(p => ({ ...p, y: p.y + moveStep }));
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setPosition(p => ({ ...p, y: p.y - moveStep }));
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setPosition(p => ({ ...p, x: p.x + moveStep }));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setPosition(p => ({ ...p, x: p.x - moveStep }));
          break;
        case '+':
        case '=':
          handleZoomIncrement(zoomStep);
          break;
        case '-':
        case '_':
          handleZoomIncrement(-zoomStep);
          break;
        case 'r':
        case 'R':
          setScale(0.85);
          setPosition({ x: 0, y: 1600 });
          break;
        case 'Escape':
          setScale(0.85);
          setPosition({ x: 0, y: 1600 });
          break;
        case '/': {
          e.preventDefault();
          const searchInput = document.getElementById('syllabus-search-input');
          if (searchInput) searchInput.focus();
          break;
        }
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Centrarea camerei pe nodul activ când se schimbă pasul în modul Călătorie (Voyage Mode)
  useEffect(() => {
    if (isVoyageMode && activeTrackId) {
      const activeTrack = olympiadTracks.find(t => t.id === activeTrackId);
      if (activeTrack && activeTrack.nodes[voyageStep]) {
        const nodeId = activeTrack.nodes[voyageStep];
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
          setPosition({
            x: -node.x,
            y: 2200 - node.y
          });
          setScale(1.1);
        }
      }
    }
  }, [isVoyageMode, voyageStep, activeTrackId]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setHasMoved(true);
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const formatNodeLabel = (label, status, chapterColor) => {
    const parts = label.replace(/_/g, ' ').split('/');
    const isLocked = status === 'locked';
    
    // CLion editor style code highlighting colors
    const nsColor = isLocked ? '#686868' : '#9876aa'; // purple namespace/variable
    const leafColor = isLocked ? '#808080' : (chapterColor ? chapterColor.replace('0.5', '0.95') : '#ffc66d'); // chapter color when unlocked
    
    if (parts.length > 1) {
      const leaf = parts[parts.length - 1];
      const category = parts.slice(0, parts.length - 1).join('::');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '11px', color: nsColor, letterSpacing: '0.5px', marginBottom: '2px' }}>
            {category}::
          </span>
          <span style={{ fontSize: '15px', fontWeight: '600', color: leafColor, letterSpacing: '0.2px' }}>
            {leaf}()
          </span>
        </div>
      );
    }
    return (
      <span style={{ fontSize: '15px', fontWeight: '600', fontFamily: 'var(--font-mono)', color: leafColor, letterSpacing: '0.2px' }}>
        {parts[0]}()
      </span>
    );
  };

  const controlBtnStyle = {
    width: '36px',
    height: '36px',
    background: '#2b2d30',
    border: '1px solid #3c3f41',
    borderRadius: '6px',
    color: '#a9b7c6',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    outline: 'none'
  };

  const OFFSET_X = 5000;
  const OFFSET_Y = 300;

  const computeEdgePath = (n1, n2) => {
    const startX = n1.x + OFFSET_X;
    const startY = n1.y + OFFSET_Y;
    const endX = n2.x + OFFSET_X + (n1.x === n2.x ? 0.01 : 0);
    const endY = n2.y + OFFSET_Y + (n1.y === n2.y ? 0.01 : 0);

    const dx = endX - startX;
    const dy = endY - startY;

    // Case 1: arr -> math1 (goes far left and up)
    if (n1.id === 'arr' && n2.id === 'math1') {
      const midY = startY - 80;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    // Case 2: arr -> str (goes far right and up)
    if (n1.id === 'arr' && n2.id === 'str') {
      const midY = startY - 80;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    // Case 3: fund_stl -> graph_theory_concepts
    if (n1.id === 'fund_stl' && n2.id === 'graph_theory_concepts') {
      const midY = 320 + OFFSET_Y;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    // Case 4: dsu -> mst
    if (n1.id === 'dsu' && n2.id === 'mst') {
      const midY = 2150 + OFFSET_Y;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    // Case 5: greedy -> mst
    if (n1.id === 'greedy' && n2.id === 'mst') {
      const midY = 2220 + OFFSET_Y;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    // Default Orthogonal Dagre-style pathing (Manhattan paths)
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx > absDy * 1.2) {
      // Mostly horizontal step
      const midX = startX + dx * 0.5;
      return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
    } else {
      // Mostly vertical step
      const midY = startY + dy * 0.5;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '700px',
        overflow: 'hidden', 
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: '#1a1b1d',
        boxShadow: 'none',
        borderRadius: '24px',
        border: '1px solid #2b2d30'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dynamic zoom capsule controls */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#2b2d30',
        border: '1px solid #3c3f41',
        borderRadius: '8px',
        padding: '6px 12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
      }}>
        <span style={{ fontSize: '11px', color: '#a9b7c6', fontWeight: '700', padding: '0 8px', borderRight: '1px solid #3c3f41', fontFamily: 'var(--font-mono)' }}>
          {Math.round(scale * 100)}%
        </span>
        <button 
          onClick={() => handleZoomIncrement(0.2)} 
          style={controlBtnStyle}
          onMouseOver={e => e.currentTarget.style.background = '#3c3f41'}
          onMouseOut={e => e.currentTarget.style.background = '#2b2d30'}
          title="Zoom In"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button 
          onClick={() => handleZoomIncrement(-0.2)} 
          style={controlBtnStyle}
          onMouseOver={e => e.currentTarget.style.background = '#3c3f41'}
          onMouseOut={e => e.currentTarget.style.background = '#2b2d30'}
          title="Zoom Out"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button 
          onClick={() => { setScale(1); setPosition({x:0, y:0}); }} 
          style={{ ...controlBtnStyle, width: '48px' }}
          onMouseOver={e => e.currentTarget.style.background = '#3c3f41'}
          onMouseOut={e => e.currentTarget.style.background = '#2b2d30'}
          title="Reset View"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </button>
      </div>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
        transformOrigin: 'center',
        width: '12000px',
        height: '5000px',
        transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        backgroundColor: '#1e1f22'
      }}>
        
        {/* Glow Orbs Layer (Dynamic) */}
        {/* Draw SVG Background Domains and Edges */}
        <svg width="12000" height="5000" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
          <defs>
            {/* Tech Blueprint Grid Pattern */}
            <pattern id="techgrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(43, 45, 48, 0.45)" strokeWidth="1" />
              <circle cx="40" cy="40" r="1.2" fill="rgba(255, 255, 255, 0.03)" />
              <path d="M 0 8 L 0 0 L 8 0" fill="none" stroke="rgba(60, 63, 65, 0.45)" strokeWidth="1.5" />
              <path d="M 80 8 L 80 0 L 72 0" fill="none" stroke="rgba(60, 63, 65, 0.45)" strokeWidth="1.5" />
              <path d="M 0 72 L 0 80 L 8 80" fill="none" stroke="rgba(60, 63, 65, 0.45)" strokeWidth="1.5" />
              <path d="M 80 72 L 80 80 L 72 80" fill="none" stroke="rgba(60, 63, 65, 0.45)" strokeWidth="1.5" />
            </pattern>

            {/* Black Halftone Pattern */}
            <pattern id="black-halftone" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <circle cx="30" cy="30" r="3.2" fill="#000000" />
              <circle cx="0" cy="0" r="1.8" fill="#000000" />
              <circle cx="60" cy="0" r="1.8" fill="#000000" />
              <circle cx="0" cy="60" r="1.8" fill="#000000" />
              <circle cx="60" cy="60" r="1.8" fill="#000000" />
              
              <circle cx="15" cy="15" r="1.0" fill="#000000" />
              <circle cx="45" cy="15" r="1.0" fill="#000000" />
              <circle cx="15" cy="45" r="1.0" fill="#000000" />
              <circle cx="45" cy="45" r="1.0" fill="#000000" />

              <path d="M 30 16 L 30 21 M 30 39 L 30 44 M 16 30 L 21 30 M 39 30 L 44 30" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
            </pattern>

            {/* Dynamic Halftone Patterns for each domain using domain.borderColor */}
            {domainGroups.map(domain => {
              const baseColor = domain.borderColor; // e.g. "rgba(99, 102, 241, 0.5)"
              const dotColor = baseColor.replace('0.5', '0.24');
              const smallDotColor = baseColor.replace('0.5', '0.12');
              return (
                <pattern
                  key={`halftone-${domain.id}`}
                  id={`halftone-${domain.id}`}
                  width="36"
                  height="36"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(30)"
                >
                  <circle cx="18" cy="18" r="4.5" fill={dotColor} />
                  <circle cx="0" cy="0" r="2.2" fill={dotColor} />
                  <circle cx="36" cy="0" r="2.2" fill={dotColor} />
                  <circle cx="0" cy="36" r="2.2" fill={dotColor} />
                  <circle cx="36" cy="36" r="2.2" fill={dotColor} />
                  
                  {/* Intermediate noise dots for grunge print simulation */}
                  <circle cx="9" cy="9" r="1.2" fill={smallDotColor} />
                  <circle cx="27" cy="9" r="1.2" fill={smallDotColor} />
                  <circle cx="9" cy="27" r="1.2" fill={smallDotColor} />
                  <circle cx="27" cy="27" r="1.2" fill={smallDotColor} />
                </pattern>
              );
            })}

            {/* Grunge Distortion Filter using fractalNoise */}
            <filter id="grunge-distort" x="-20%" y="-20%" width="140%" height="140%">
              {/* Turbulence generator creating fine structure and distressed edges */}
              <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
              {/* Displace halftone dots dynamically based on noise map */}
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Radial Gradient for Vignette Fade inside Domains */}
            <radialGradient id="domain-vignette-grad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.08" />
              <stop offset="50%" stopColor="white" stopOpacity="0.45" />
              <stop offset="100%" stopColor="white" stopOpacity="0.95" />
            </radialGradient>
            <mask id="domain-vignette-mask" maskContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="url(#domain-vignette-grad)" />
            </mask>

            {/* Main Canvas Grunge Halftone Pattern (Optimized: distressed shapes defined statically) */}
            <pattern id="main-grunge-halftone" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
              {/* Central primary dot (distorted/split to look grunge) */}
              <circle cx="30" cy="30" r="3.5" fill="rgba(169, 183, 198, 0.04)" />
              <circle cx="28.5" cy="31.2" r="1.5" fill="rgba(169, 183, 198, 0.02)" />
              <circle cx="31.5" cy="28.8" r="2.0" fill="rgba(169, 183, 198, 0.03)" />
              
              {/* Corner dots */}
              <circle cx="0" cy="0" r="1.8" fill="rgba(169, 183, 198, 0.03)" />
              <circle cx="2" cy="1" r="1.0" fill="rgba(169, 183, 198, 0.02)" />
              <circle cx="60" cy="0" r="1.8" fill="rgba(169, 183, 198, 0.03)" />
              <circle cx="0" cy="60" r="1.8" fill="rgba(169, 183, 198, 0.03)" />
              <circle cx="60" cy="60" r="1.8" fill="rgba(169, 183, 198, 0.03)" />
              
              {/* Distressed splatters/noise dots within the grid to simulate grunge wear */}
              <circle cx="15" cy="12" r="0.8" fill="rgba(169, 183, 198, 0.02)" />
              <circle cx="42" cy="18" r="1.2" fill="rgba(169, 183, 198, 0.02)" />
              <circle cx="18" cy="45" r="1.0" fill="rgba(169, 183, 198, 0.02)" />
              <circle cx="48" cy="42" r="0.7" fill="rgba(169, 183, 198, 0.02)" />
              
              {/* Tiny dust/hair scratch simulation in the pattern */}
              <path d="M 12 25 Q 14 27 13 30" stroke="rgba(169, 183, 198, 0.02)" strokeWidth="0.8" fill="none" />
              <path d="M 45 10 Q 47 8 49 11" stroke="rgba(169, 183, 198, 0.02)" strokeWidth="0.6" fill="none" />
            </pattern>
            
            {/* Fade mask for grid edges */}
            <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="35%" stopColor="white" stopOpacity="1" />
              <stop offset="75%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <mask id="grid-mask">
              <rect width="100%" height="100%" fill="url(#grid-fade)" />
            </mask>

            {/* Edge Gradients - Boosted opacity stops for high visibility */}
            {edges.map((edge, i) => {
              const n1 = nodes.find(n => n.id === edge.from);
              const n2 = nodes.find(n => n.id === edge.to);
              if(!n1 || !n2) return null;
              const d1 = getNodeDomain(n1.id);
              const d2 = getNodeDomain(n2.id);
              return (
                <linearGradient key={`grad-${i}`} id={`grad-${i}`} gradientUnits="userSpaceOnUse" x1={n1.x + OFFSET_X} y1={n1.y + OFFSET_Y} x2={n2.x + OFFSET_X} y2={n2.y + OFFSET_Y}>
                  <stop offset="0%" stopColor={d1 ? d1.borderColor.replace('0.5', '0.85') : 'rgba(255, 255, 255, 0.35)'} />
                  <stop offset="100%" stopColor={d2 ? d2.borderColor.replace('0.5', '0.85') : 'rgba(255, 255, 255, 0.35)'} />
                </linearGradient>
              )
            })}

            {/* Neon Glow Filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Backgrounds */}
          <rect width="100%" height="100%" fill="url(#main-grunge-halftone)" mask="url(#grid-mask)" style={{ opacity: 0.85 }} />
          <rect width="100%" height="100%" fill="url(#techgrid)" mask="url(#grid-mask)" style={{ mixBlendMode: 'screen', opacity: 0.65 }} />
          {/* Tech Blueprint Ruler Guide Lines & Meta Details */}
          <line x1="0" y1={OFFSET_Y} x2="12000" y2={OFFSET_Y} stroke="rgba(60, 63, 65, 0.15)" strokeWidth="1" strokeDasharray="6 6" />
          <line x1={OFFSET_X} y1="0" x2={OFFSET_X} y2="5000" stroke="rgba(60, 63, 65, 0.15)" strokeWidth="1" strokeDasharray="6 6" />

          {/* Central Watermark */}
          <text x={OFFSET_X} y={OFFSET_Y - 80} fill="rgba(169, 183, 198, 0.05)" fontFamily="var(--font-mono)" fontSize="32" textAnchor="middle" fontWeight="bold" letterSpacing="12">
            [ SYLLABUS DIRECTED progression TREE CONST MAP ]
          </text>

          {/* Top-Left Tech metadata */}
          <g transform="translate(150, 150)" fill="rgba(169, 183, 198, 0.15)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.5px">
            <text x="0" y="0">FILE: prog_tree_canvas.cpp</text>
            <text x="0" y="16">TARGET: CLion Debugger Env v2.4</text>
            <text x="0" y="32">MEMORY POOL: 0x7FFF5FBFF608 [OK]</text>
            <text x="0" y="48">SYSTEM SCHEMATIC: ACTIVE CONST MAP LAYOUT</text>
          </g>

          {/* Bottom-Right Tech metadata */}
          <g transform="translate(11850, 4850)" fill="rgba(169, 183, 198, 0.15)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.5px" textAnchor="end">
            <text x="0" y="0">MODE: BINARY DATA FLUID STREAM [0 / 1]</text>
            <text x="0" y="-16">COORDINATE CALIBRATION: OFFSET_X=5000, OFFSET_Y=300</text>
            <text x="0" y="-32">CANVAS DIMENSIONS: 12000 * 5000 px</text>
            <text x="0" y="-48">MATRIX CODEC: UTF-8 / ASCII STREAM</text>
          </g>

          {/* Faint Coordinate markers across grid intersections */}
          <g fill="rgba(169, 183, 198, 0.04)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1px">
            {/* Horizontal coordinates */}
            <text x={OFFSET_X - 4000} y={OFFSET_Y + 15} textAnchor="middle">X: -4000px [GRID_IDX_L4]</text>
            <text x={OFFSET_X - 3000} y={OFFSET_Y + 15} textAnchor="middle">X: -3000px [GRID_IDX_L3]</text>
            <text x={OFFSET_X - 2000} y={OFFSET_Y + 15} textAnchor="middle">X: -2000px [GRID_IDX_L2]</text>
            <text x={OFFSET_X - 1000} y={OFFSET_Y + 15} textAnchor="middle">X: -1000px [GRID_IDX_L1]</text>
            <text x={OFFSET_X + 1000} y={OFFSET_Y + 15} textAnchor="middle">X: +1000px [GRID_IDX_R1]</text>
            <text x={OFFSET_X + 2000} y={OFFSET_Y + 15} textAnchor="middle">X: +2000px [GRID_IDX_R2]</text>
            <text x={OFFSET_X + 3000} y={OFFSET_Y + 15} textAnchor="middle">X: +3000px [GRID_IDX_R3]</text>
            <text x={OFFSET_X + 4000} y={OFFSET_Y + 15} textAnchor="middle">X: +4000px [GRID_IDX_R4]</text>

            {/* Vertical coordinates */}
            <text x={OFFSET_X + 15} y={OFFSET_Y - 200} dominantBaseline="middle">Y: -200px [AXIS_TOP_MIN]</text>
            <text x={OFFSET_X + 15} y={OFFSET_Y + 500} dominantBaseline="middle">Y: +500px [AXIS_LANE_1]</text>
            <text x={OFFSET_X + 15} y={OFFSET_Y + 1000} dominantBaseline="middle">Y: +1000px [AXIS_LANE_2]</text>
            <text x={OFFSET_X + 15} y={OFFSET_Y + 1500} dominantBaseline="middle">Y: +1500px [AXIS_LANE_3]</text>
            <text x={OFFSET_X + 15} y={OFFSET_Y + 2000} dominantBaseline="middle">Y: +2000px [AXIS_LANE_4]</text>
            <text x={OFFSET_X + 15} y={OFFSET_Y + 2500} dominantBaseline="middle">Y: +2500px [AXIS_LANE_5]</text>
          </g>

          {/* Additional background watermarks */}
          <text x={OFFSET_X - 2500} y={1500} fill="rgba(169, 183, 198, 0.02)" fontFamily="var(--font-mono)" fontSize="54" fontWeight="bold" textAnchor="middle">
            [ STACK // QUEUE // DEQUE STRUCT ]
          </text>
          <text x={OFFSET_X + 2500} y={3500} fill="rgba(169, 183, 198, 0.02)" fontFamily="var(--font-mono)" fontSize="54" fontWeight="bold" textAnchor="middle">
            [ GRAPH_THEORY::SCC::KOSARAJU ]
          </text>
          <text x={OFFSET_X - 3000} y={3200} fill="rgba(169, 183, 198, 0.02)" fontFamily="var(--font-mono)" fontSize="48" fontWeight="bold" textAnchor="middle">
            [ COMPLEXITY_BOUNDS::O(N * log N) ]
          </text>

          {/* Render Domain Backgrounds */}
          {domainsWithBounds.map(domain => {
            if(!domain.bounds) return null;
            const {x, y, w, h} = domain.bounds;
            const rectX = x + OFFSET_X - 45;
            const rectY = y + OFFSET_Y - 45;
            const rectW = w + 90;
            const rectH = h + 90;
            const borderColor = domain.borderColor;
            const sectorCode = `SEC-${domain.id.substring(0, 5).toUpperCase()}`;

            return (
              <g key={domain.id}>
                {/* Glow Underlay */}
                <rect
                  x={rectX}
                  y={rectY}
                  width={rectW}
                  height={rectH}
                  fill="none"
                  stroke={borderColor}
                  strokeWidth="6"
                  opacity="0.02"
                  filter="url(#glow)"
                  rx="12"
                />
                {/* Outer Tech Border */}
                <rect 
                  x={rectX} 
                  y={rectY} 
                  width={rectW} 
                  height={rectH} 
                  fill="#161719" 
                  stroke={borderColor.replace('0.5', '0.15')} 
                  strokeWidth="1" 
                  rx="12" 
                />
                {/* Grunge Halftone Background Layer */}
                <rect
                  x={rectX + 2}
                  y={rectY + 2}
                  width={rectW - 4}
                  height={rectH - 4}
                  fill={`url(#halftone-${domain.id})`}
                  filter="url(#grunge-distort)"
                  mask="url(#domain-vignette-mask)"
                  rx="10"
                  pointerEvents="none"
                />
                {/* Inner Tech Border */}
                <rect 
                  x={rectX + 4} 
                  y={rectY + 4} 
                  width={rectW - 8} 
                  height={rectH - 8} 
                  fill="none" 
                  stroke={borderColor.replace('0.5', '0.1')} 
                  strokeWidth="0.75"
                  strokeDasharray="16 12"
                  rx="10" 
                />
                {/* Sector Bracket Highlights (Sci-fi Corner Overlays) */}
                {/* Top-Left Corner */}
                <path d={`M ${rectX} ${rectY + 20} L ${rectX} ${rectY} L ${rectX + 20} ${rectY}`} fill="none" stroke={borderColor} strokeWidth="2.5" strokeLinecap="round" />
                {/* Top-Right Corner */}
                <path d={`M ${rectX + rectW - 20} ${rectY} L ${rectX + rectW} ${rectY} L ${rectX + rectW} ${rectY + 20}`} fill="none" stroke={borderColor} strokeWidth="2.5" strokeLinecap="round" />
                {/* Bottom-Left Corner */}
                <path d={`M ${rectX} ${rectY + rectH - 20} L ${rectX} ${rectY + rectH} L ${rectX + 20} ${rectY + rectH}`} fill="none" stroke={borderColor} strokeWidth="2.5" strokeLinecap="round" />
                {/* Bottom-Right Corner */}
                <path d={`M ${rectX + rectW - 20} ${rectY + rectH} L ${rectX + rectW} ${rectY + rectH} L ${rectX + rectW} ${rectY + rectH - 20}`} fill="none" stroke={borderColor} strokeWidth="2.5" strokeLinecap="round" />

                {/* Top-Left location tag */}
                <text x={rectX + 8} y={rectY - 6} fill={borderColor.replace('0.5', '0.22')} fontSize="8" fontFamily="var(--font-mono)">
                  {`LOC_REF: [${rectX}px, ${rectY}px]`}
                </text>
                {/* Bottom-Right location tag */}
                <text x={rectX + rectW - 8} y={rectY + rectH + 12} fill={borderColor.replace('0.5', '0.22')} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">
                  {`LOC_END: [${rectX + rectW}px, ${rectY + rectH}px]`}
                </text>

                {/* Domain-specific programming watermarks */}
                {domain.id === 'math' && (
                  <text x={rectX + rectW / 2} y={rectY + rectH / 2 + 10} fill={borderColor.replace('0.5', '0.03')} fontFamily="var(--font-mono)" fontSize="48" textAnchor="middle" fontWeight="bold">
                    O(log N) * Sum(i=1..N)
                  </text>
                )}
                {domain.id === 'fund' && (
                  <text x={rectX + rectW / 2} y={rectY + rectH / 2 + 10} fill={borderColor.replace('0.5', '0.03')} fontFamily="var(--font-mono)" fontSize="40" textAnchor="middle" fontWeight="bold">
                    [ A[0] | A[1] | A[2] | A[3] ]
                  </text>
                )}
                {domain.id === 'graph' && (
                  <text x={rectX + rectW / 2} y={rectY + rectH / 2 + 10} fill={borderColor.replace('0.5', '0.025')} fontFamily="var(--font-mono)" fontSize="32" textAnchor="middle" fontWeight="bold" letterSpacing="2px">
                    adj[u] = &#123;v1, v2, v3&#125;
                  </text>
                )}
                {domain.id === 'dp' && (
                  <text x={rectX + rectW / 2} y={rectY + rectH / 2 + 10} fill={borderColor.replace('0.5', '0.025')} fontFamily="var(--font-mono)" fontSize="32" textAnchor="middle" fontWeight="bold">
                    dp[i][j] = dp[i-1][j] + dp[i][j-1]
                  </text>
                )}
                {domain.id === 'str' && (
                  <text x={rectX + rectW / 2} y={rectY + rectH / 2 + 10} fill={borderColor.replace('0.5', '0.025')} fontFamily="var(--font-mono)" fontSize="36" textAnchor="middle" fontWeight="bold" letterSpacing="4px">
                    Trie::insert(S)
                  </text>
                )}
                {domain.id === 'ds' && (
                  <text x={rectX + rectW / 2} y={rectY + rectH / 2 + 10} fill={borderColor.replace('0.5', '0.025')} fontFamily="var(--font-mono)" fontSize="36" textAnchor="middle" fontWeight="bold" letterSpacing="4px">
                    Tree[idx] = Left + Right
                  </text>
                )}

                {/* Tech Meta Code text */}
                <text
                  x={rectX + rectW - 16}
                  y={rectY + 22}
                  fill={borderColor.replace('0.5', '0.3')}
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fontWeight="bold"
                  textAnchor="end"
                  letterSpacing="1px"
                >
                  {`[ ${sectorCode} ] COORDINATES: ${x},${y}`}
                </text>

                {/* Domain Label */}
                <text 
                  x={rectX + 20} 
                  y={rectY + 32} 
                  fill={borderColor} 
                  fontSize="18" 
                  fontFamily="var(--font-mono)"
                  fontWeight="700" 
                  style={{ letterSpacing: '1px' }}
                >
                  {domain.icon} {domain.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Render Edges */}
          {edges.map((edge, i) => {
            const n1 = nodes.find(n => n.id === edge.from);
            const n2 = nodes.find(n => n.id === edge.to);
            if(!n1 || !n2) return null;
            
            const pathData = computeEdgePath(n1, n2);
            
            const isEdgeToChild = hoveredNode === n1.id;
            const isAncestorEdge = hoveredNode && (upwardDistances[n2.id] !== undefined);
            const ancestorDistance = isAncestorEdge ? upwardDistances[n2.id] : -1;
            const bothCompleted = n1.status === 'completed' && n2.status === 'completed';
            const isToRecommended = n2.id === targetNodeId;
            if (isToRecommended) {
              console.log("Recommended edge found:", edge.from, "->", edge.to, "targetNodeId:", targetNodeId);
            }
            
            let edgeColor = `url(#grad-${i})`;
            let edgeWidth = '4';

            if (isEdgeToChild) {
              edgeWidth = '8';
            } else if (isAncestorEdge) {
              edgeWidth = ancestorDistance === 0 ? '8' : (ancestorDistance === 1 ? '6' : '5');
            } else if (isToRecommended) {
              edgeColor = '#499c54';
              edgeWidth = '5';
            } else if (n1.status === 'locked' && n2.status === 'locked') {
              edgeColor = 'rgba(255, 255, 255, 0.25)';
              edgeWidth = '2';
            }
            
            const domain1 = getNodeDomain(n1.id);
            const flowColor = domain1 ? domain1.borderColor : 'var(--accent-primary)';

            // Dynamic filter opacities
            const n1Domain = getNodeDomain(n1.id);
            const n2Domain = getNodeDomain(n2.id);
            const n1Visible = (!activeDomainFilter || (n1Domain && n1Domain.id === activeDomainFilter)) && 
                              (!activeStatusFilter || n1.status === activeStatusFilter);
            const n2Visible = (!activeDomainFilter || (n2Domain && n2Domain.id === activeDomainFilter)) && 
                              (!activeStatusFilter || n2.status === activeStatusFilter);
            const isEdgeVisible = n1Visible && n2Visible;
            
            const edgeBaseOpacity = !hoveredNode 
              ? (bothCompleted ? 1 : 0.85) 
              : (isEdgeToChild || bothCompleted 
                  ? 1 
                  : (isAncestorEdge 
                      ? (ancestorDistance === 0 ? 1 : (ancestorDistance === 1 ? 0.65 : 0.45))
                      : 0.25
                    )
                );
            
            // Diminuarea opacității legăturilor standard dacă un traseu olimpic este activ
            const trackActive = activeTrackId !== null;
            const inTrackEdge = activeTrackId ? (activeTrackNodes.includes(n1.id) && activeTrackNodes.includes(n2.id)) : false;
            const trackEdgeDim = trackActive ? (inTrackEdge ? 0.2 : 0.04) : 1;
            
            let finalEdgeOpacity = isEdgeVisible ? (edgeBaseOpacity * trackEdgeDim) : 0.05;
            if (isToRecommended && isEdgeVisible) {
              finalEdgeOpacity = 1.0;
            }

            let dashArray = '6 6';
            let edgeAnimation = 'none';
            if (bothCompleted) {
              dashArray = '12 12';
              edgeAnimation = 'dataFlow 1.2s linear infinite';
            } else if (isEdgeToChild) {
              dashArray = 'none';
            } else if (isToRecommended) {
              dashArray = '6 6';
              edgeAnimation = 'dataFlow 1.8s linear infinite';
            } else if (isAncestorEdge) {
              const speed = 0.8 + ancestorDistance * 0.4;
              edgeAnimation = `dataFlow ${speed}s linear infinite`;
              if (ancestorDistance === 0) {
                dashArray = '8 8';
              } else if (ancestorDistance === 1) {
                dashArray = '4 8';
              } else {
                dashArray = '2 10';
              }
            }

            const isBinaryStreamActive = (bothCompleted || isEdgeToChild || isAncestorEdge || isToRecommended) && isEdgeVisible;

            return (
              <g key={i}>
                {/* Glow path behind the edge */}
                {(bothCompleted || isEdgeToChild || isAncestorEdge || isToRecommended) && isEdgeVisible && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isEdgeToChild || isAncestorEdge || isToRecommended ? (isToRecommended ? '#499c54' : flowColor) : 'var(--success-color)'}
                    strokeWidth={isEdgeToChild || isToRecommended ? 10 : (isAncestorEdge ? Math.max(4, 10 - ancestorDistance * 2) : 6)}
                    opacity={isEdgeToChild || isToRecommended ? "0.24" : (isAncestorEdge ? (0.24 * Math.max(0.15, 1 - ancestorDistance * 0.35)) : "0.24")}
                    filter="url(#glow)"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                )}
                {/* Base Connector Line */}
                <path 
                  id={`edge-path-${i}`}
                  d={pathData}
                  fill="none"
                  stroke={edgeColor} 
                  strokeWidth={edgeWidth}
                  style={{ 
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    strokeDasharray: dashArray,
                    animation: edgeAnimation,
                    opacity: finalEdgeOpacity
                  }}
                />

                {/* Animated Binary Data Stream (0/1) overlay */}
                {isBinaryStreamActive && (
                  <text 
                    dy="-3.5" 
                    fill={isEdgeToChild ? '#499c54' : (isAncestorEdge ? '#3574f0' : '#499c54')}
                  >
                    <textPath 
                      href={`#edge-path-${i}`}
                      xlinkHref={`#edge-path-${i}`}
                      startOffset="0%"
                    >
                      <tspan 
                        fontSize="9px" 
                        fontWeight="bold"
                        fontFamily="var(--font-mono)" 
                        letterSpacing="4px"
                        opacity={isEdgeToChild ? 0.9 : 0.65}
                      >
                        101001011010010110100101
                      </tspan>
                      <animate attributeName="startOffset" from="0%" to="100%" dur={isEdgeToChild ? '4s' : '7.5s'} repeatCount="indefinite" />
                    </textPath>
                  </text>
                )}

                {/* Dynamic Moving Data Pulse overlay */}
                {(bothCompleted || isEdgeToChild || isAncestorEdge || n1.status === 'completed') && n2.status !== 'locked' && isEdgeVisible && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isEdgeToChild || isAncestorEdge ? '#fff' : (bothCompleted ? 'var(--success-color)' : flowColor)}
                    strokeWidth={isEdgeToChild ? '2.5' : (isAncestorEdge ? Math.max(1.2, 2.5 - ancestorDistance * 0.5) : '1.5')}
                    strokeLinecap="round"
                    strokeDasharray="8 60"
                    style={{
                      animation: `dataPulseFlow ${isEdgeToChild ? '0.7s' : (isAncestorEdge ? `${0.7 + ancestorDistance * 0.4}s` : (bothCompleted ? '1.5s' : '2.5s'))} linear infinite`,
                      opacity: isEdgeToChild ? 0.85 : (isAncestorEdge ? 0.85 * Math.max(0.15, 1 - ancestorDistance * 0.35) : 0.85)
                    }}
                  />
                )}
              </g>
            )
          })}

          {/* Render Active Olympiad Constellation Paths */}
          {activeTrackId && activeTrackNodes.length > 1 && activeTrackNodes.map((nodeId, idx) => {
            if (idx === activeTrackNodes.length - 1) return null;
            const n1 = nodes.find(n => n.id === nodeId);
            const n2 = nodes.find(n => n.id === activeTrackNodes[idx + 1]);
            if (!n1 || !n2) return null;

            const pathData = computeEdgePath(n1, n2);
            
            // Highlight step segment in Voyage Mode
            const isVoyageActiveSegment = isVoyageMode && (idx === voyageStep || idx === voyageStep - 1);
            const pathColor = '#499c54'; // Binary green style
            const constellationEdgeId = `constellation-edge-${idx}`;

            return (
              <g key={`olympiad-constellation-edge-${idx}`}>
                {/* Glowing thick ribbon */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={pathColor}
                  strokeWidth={isVoyageActiveSegment ? "12" : "7"}
                  opacity={isVoyageActiveSegment ? "0.45" : "0.22"}
                  filter="url(#glow)"
                  style={{ transition: 'all 0.3s ease' }}
                />
                {/* Core animated dashed line */}
                <path
                  id={constellationEdgeId}
                  d={pathData}
                  fill="none"
                  stroke={isVoyageActiveSegment ? '#fff' : pathColor}
                  strokeWidth={isVoyageActiveSegment ? "4.5" : "2.5"}
                  strokeDasharray="10 15"
                  style={{
                    animation: `dataPulseFlow ${isVoyageActiveSegment ? '0.7s' : '1.4s'} linear infinite`,
                    opacity: isVoyageActiveSegment ? 1 : 0.75,
                    transition: 'all 0.3s ease'
                  }}
                />
                {/* Binary overlay on constellation */}
                <text dy="-3.5" fill={isVoyageActiveSegment ? '#fff' : pathColor}>
                  <textPath 
                    href={`#${constellationEdgeId}`}
                    xlinkHref={`#${constellationEdgeId}`}
                    startOffset="0%"
                  >
                    <tspan fontSize="9px" fontWeight="bold" fontFamily="var(--font-mono)" letterSpacing="4px" opacity={isVoyageActiveSegment ? 0.95 : 0.8}>
                      1010010110101001011010
                    </tspan>
                    <animate attributeName="startOffset" from="0%" to="100%" dur="3s" repeatCount="indefinite" />
                  </textPath>
                </text>
              </g>
            );
          })}
        </svg>

        {/* Draw HTML Nodes */}
        {nodes.map(node => {
          const isHovered = hoveredNode === node.id;
          const isParentOfHovered = hoveredNode ? edges.some(e => e.from === node.id && e.to === hoveredNode) : false;
          const isChildOfHovered = hoveredNode ? edges.some(e => e.to === node.id && e.from === hoveredNode) : false;
          
          const xp = userXp[node.label] || 0;
          const confidence = Math.min(100, xp);
          const domain = getNodeDomain(node.id);
          const domainBorderColor = domain ? domain.borderColor : 'rgba(255, 255, 255, 0.2)';
          const activeColor = domainBorderColor.includes('0.5') 
            ? domainBorderColor.replace('0.5', '0.95') 
            : domainBorderColor.replace('0.2', '0.8');
          
          let nodeBg = '#252629';
          let shadow;
          let transformScale = 'scale(1)';
          let borderOverlay;
          let customAnimation = 'none';

          if (node.status === 'locked') {
            nodeBg = '#1e1f22';
            borderOverlay = '1px solid #2b2d30';
            shadow = 'none';
          } else {
            // For both 'in-progress' and 'completed' (100%)
            const glowRadius = 3 + (confidence / 100) * 12; // scales from 3px up to 15px
            borderOverlay = `1.5px solid ${domainBorderColor}`;
            shadow = `0 4px 15px rgba(0, 0, 0, 0.35), 0 0 ${glowRadius}px ${domainBorderColor}`;
          }

          // Interactive domain & status filter visibility
          const isNodeVisible = (!activeDomainFilter || (domain && domain.id === activeDomainFilter)) &&
                                (!activeStatusFilter || node.status === activeStatusFilter);

          const isNodeInTrack = activeTrackId ? activeTrackNodes.includes(node.id) : true;
          const trackIndex = activeTrackNodes.indexOf(node.id);
          const isCurrentVoyageNode = isVoyageMode && activeTrackId && node.id === activeTrackNodes[voyageStep];

          let trackOpacity = 1;
          if (activeTrackId) {
            if (isNodeInTrack) {
              if (isVoyageMode) {
                trackOpacity = isCurrentVoyageNode ? 1 : 0.45;
              } else {
                trackOpacity = 1;
              }
            } else {
              trackOpacity = 0.12;
            }
          }

          const nodeBaseOpacity = node.status === 'locked' ? 0.6 : 1;
          const finalNodeOpacity = (flashedNodeId === node.id) ? 1 : (isNodeVisible ? nodeBaseOpacity * trackOpacity : 0.15);

          const isRecommended = node.id === targetNodeId;

          if (isCurrentVoyageNode) {
            borderOverlay = `2px solid ${activeTrack.color}`;
            shadow = `0 0 20px ${activeTrack.color}`;
            transformScale = 'scale(1.06) translateY(-4px)';
          } else if (isHovered && node.status !== 'locked') {
            transformScale = 'scale(1.06) translateY(-6px)';
            nodeBg = '#313339'; // CLion active tab/hover color
            const glowRadius = 3 + (confidence / 100) * 12;
            shadow = `0 12px 28px rgba(0, 0, 0, 0.5), 0 0 ${glowRadius + 4}px ${isRecommended ? '#499c54' : domainBorderColor}`;
            borderOverlay = `1.5px solid ${isRecommended ? '#499c54' : domainBorderColor}`;
          } else if (isRecommended) {
            borderOverlay = `1.5px solid #499c54`;
            shadow = `0 0 16px rgba(73, 156, 84, 0.5)`;
            customAnimation = 'cyberPulse 2.5s infinite ease-in-out';
          } else if (isParentOfHovered) {
            borderOverlay = `1.5px solid ${domainBorderColor}`;
            shadow = `0 4px 15px rgba(0, 0, 0, 0.35), 0 0 10px ${domainBorderColor}`;
            customAnimation = 'parentGlowPulse 2.5s infinite ease-in-out';
          } else if (isChildOfHovered) {
            borderOverlay = `1.5px solid ${domainBorderColor}`;
            shadow = `0 4px 15px rgba(0, 0, 0, 0.35), 0 0 10px ${domainBorderColor}`;
            customAnimation = 'childGlowPulse 2.5s infinite ease-in-out';
          }

          return (
            <div 
              key={node.id}
              className={flashedNodeId === node.id ? 'searched-flash' : ''}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={(e) => {
                if (hasMoved) {
                  e.stopPropagation();
                  return;
                }
                if (onNodeClick) {
                  onNodeClick(node.label);
                }
              }}
              style={{
                position: 'absolute',
                left: node.x + OFFSET_X,
                top: node.y + OFFSET_Y,
                transform: `translate(-50%, -50%) ${transformScale}`,
                background: nodeBg,
                border: borderOverlay,
                borderRadius: '8px',
                padding: '14px 18px',
                color: node.status === 'locked' ? 'rgba(255, 255, 255, 0.25)' : '#fff',
                cursor: node.status === 'locked' ? 'default' : 'pointer',
                zIndex: isCurrentVoyageNode ? 15 : (isHovered ? 10 : (isParentOfHovered || isChildOfHovered ? 8 : (node.status === 'completed' ? 5 : 1))),
                boxShadow: shadow,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.15), opacity 0.3s ease',
                opacity: finalNodeOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                minWidth: '240px',
                animation: customAnimation,
                "--glow-color": domainBorderColor
              }}
            >
              {/* Floating step index badge for active track */}
              {activeTrackId && trackIndex !== -1 && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '-12px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: activeTrack.color,
                  border: '1.5px solid #fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  color: '#000',
                  fontWeight: '900',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  zIndex: 20
                }}>
                  {trackIndex + 1}
                </div>
              )}

              {/* Sci-fi corner brackets aligned to 8px borders */}
              {node.status !== 'locked' && (
                <>
                  <div style={{ position: 'absolute', top: '4px', left: '4px', width: '6px', height: '6px', borderTop: `1.5px solid ${domainBorderColor}`, borderLeft: `1.5px solid ${domainBorderColor}`, borderTopLeftRadius: '2px', opacity: 0.35 }} />
                  <div style={{ position: 'absolute', top: '4px', right: '4px', width: '6px', height: '6px', borderTop: `1.5px solid ${domainBorderColor}`, borderRight: `1.5px solid ${domainBorderColor}`, borderTopRightRadius: '2px', opacity: 0.35 }} />
                  <div style={{ position: 'absolute', bottom: '4px', left: '4px', width: '6px', height: '6px', borderBottom: `1.5px solid ${domainBorderColor}`, borderLeft: `1.5px solid ${domainBorderColor}`, borderBottomLeftRadius: '2px', opacity: 0.35 }} />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '6px', height: '6px', borderBottom: `1.5px solid ${domainBorderColor}`, borderRight: `1.5px solid ${domainBorderColor}`, borderBottomRightRadius: '2px', opacity: 0.35 }} />
                </>
              )}

              {/* Shimmer sweep effect on hovered cards */}
              <div 
                className="shimmer-sheen" 
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.05) 50%, transparent 65%)',
                  backgroundSize: '200% 100%',
                  pointerEvents: 'none',
                  borderRadius: '8px',
                  opacity: isHovered ? 1 : 0,
                  animation: isHovered ? 'shimmerSweep 1.5s infinite linear' : 'none'
                }} 
              />

              {node.status === 'in-progress' && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '8px',
                  border: `1.5px solid ${domainBorderColor}`,
                  animation: 'sonarPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                  pointerEvents: 'none',
                  zIndex: -1
                }} />
              )}
              
              {/* Category Icon and Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '20px', filter: node.status === 'locked' ? 'grayscale(100%) opacity(0.3)' : 'none' }}>
                  {domain ? domain.icon : getCategoryIcon(node.label)}
                </span>
                {formatNodeLabel(node.label, node.status, domainBorderColor)}
              </div>
              
              {node.status !== 'locked' && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                    <span>Mastery</span>
                    <span style={{ color: activeColor, fontWeight: 'bold' }}>{confidence}%</span>
                  </div>
                  {/* Clean IntelliJ Progress Bar */}
                  <div style={{ 
                    width: '100%', 
                    height: '4px', 
                    backgroundColor: '#1e1f22',
                    borderRadius: '2px', 
                    overflow: 'hidden', 
                    position: 'relative'
                  }}>
                    <div style={{ 
                      width: `${confidence}%`, 
                      height: '100%', 
                      background: activeColor,
                      transition: 'width 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)',
                      borderRadius: '2px'
                    }}></div>
                  </div>
                </div>
              )}
              
              {node.status === 'locked' && (
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.25)', marginTop: '2px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  LOCKED
                </div>
              )}
              
              {/* Solid IDE Tooltip Hint */}
              {isHovered && node.status !== 'locked' && (
                <div style={{
                  position: 'absolute',
                  bottom: '-36px',
                  background: '#1a1b1d',
                  border: '1px solid #3c3f41',
                  color: '#a9b7c6',
                  fontSize: '10px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  fontWeight: '600',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                  animation: 'fadeIn 0.2s ease forwards',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 100,
                  letterSpacing: '0.5px'
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: domainBorderColor, display: 'inline-block' }} />
                  EXPLORE TOPICS
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Solid IDE Structure Minimap */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        width: '240px',
        height: '200px',
        background: '#1a1b1d',
        border: '1px solid #3c3f41',
        borderRadius: '6px',
        zIndex: 100,
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <div style={{ 
          padding: '8px 12px', 
          fontSize: '10px', 
          color: '#a9b7c6', 
          background: '#2b2d30',
          borderBottom: '1px solid #3c3f41', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          position: 'relative', 
          zIndex: 4,
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Structure Map</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#499c54', display: 'inline-block' }} />
        </div>
        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 33px)', zIndex: 2 }}>
          {nodes.map(node => {
            const nodeDomain = getNodeDomain(node.id);
            const dotColor = node.status === 'completed' 
              ? '#499c54' 
              : (node.status === 'locked' ? 'rgba(255,255,255,0.1)' : (nodeDomain ? nodeDomain.borderColor : '#3574f0'));
            return (
              <div key={`mini-${node.id}`} style={{
                position: 'absolute',
                left: `${((node.x + OFFSET_X) / 12000) * 100}%`,
                top: `${((node.y + OFFSET_Y) / 5000) * 100}%`,
                width: '4px',
                height: '4px',
                background: dotColor,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: node.status === 'in-progress' ? `0 0 4px ${dotColor}` : 'none'
              }} />
            );
          })}
          {/* Viewport Bounds Indicator with Reticle ticks */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: `translate(calc(-50% - ${(position.x / 12000) * 240}px), calc(-50% - ${(position.y / 5000) * 167}px))`,
            width: `${(100 / scale) * (800 / 12000)}%`,
            height: `${(100 / scale) * (600 / 5000)}%`,
            border: '1px solid #3574f0',
            borderRadius: '2px',
            background: 'rgba(53, 116, 240, 0.06)',
            pointerEvents: 'none',
            boxShadow: '0 0 6px rgba(53, 116, 240, 0.15)'
          }}>
            {/* Viewfinder ticks */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '4px', height: '4px', borderTop: '1px solid #3574f0', borderLeft: '1px solid #3574f0' }} />
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '4px', height: '4px', borderTop: '1px solid #3574f0', borderRight: '1px solid #3574f0' }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '4px', height: '4px', borderBottom: '1px solid #3574f0', borderLeft: '1px solid #3574f0' }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '4px', height: '4px', borderBottom: '1px solid #3574f0', borderRight: '1px solid #3574f0' }} />
          </div>
        </div>
      </div>

      {/* Syllabus Control Panel */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        zIndex: 150,
        width: isPanelCollapsed ? '44px' : '320px',
        height: isPanelCollapsed ? '44px' : 'auto',
        maxHeight: isPanelCollapsed ? '44px' : 'calc(100% - 48px)',
        background: '#1a1b1d',
        border: '1px solid #3c3f41',
        borderRadius: '8px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: isPanelCollapsed ? 'hidden' : 'visible',
        transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        padding: isPanelCollapsed ? '0' : '16px',
        boxSizing: 'border-box'
      }}>
        {isPanelCollapsed ? (
          <button
            onClick={() => setIsPanelCollapsed(false)}
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              border: 'none',
              color: '#a9b7c6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none'
            }}
            title="Deschide panou control"
            onMouseOver={e => e.currentTarget.style.background = '#2b2d30'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', height: '100%', position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2b2d30', paddingBottom: '10px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', fontFamily: 'var(--font-mono)', letterSpacing: '0.5px', color: '#a9b7c6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚙️</span> CONTROL PANEL
              </span>
              <button
                onClick={() => setIsPanelCollapsed(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#686868',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
                title="Ascunde"
                onMouseOver={e => e.currentTarget.style.color = '#a9b7c6'}
                onMouseOut={e => e.currentTarget.style.color = '#686868'}
              >
                ✕
              </button>
            </div>
            
            {/* Search Section */}
            <div style={{ position: 'relative' }}>
              <input
                id="syllabus-search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Caută algoritm (ex: Dijkstra)..."
                style={{
                  width: '100%',
                  background: '#1e1f22',
                  border: '1px solid #3c3f41',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#a9b7c6',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#3574f0'}
                onBlur={e => e.currentTarget.style.borderColor = '#3c3f41'}
              />
              {/* Autocomplete Suggestions */}
              {searchQuery.trim() !== '' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#1e1f22',
                  border: '1px solid #3c3f41',
                  borderRadius: '6px',
                  marginTop: '4px',
                  zIndex: 200,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                  maxHeight: '250px',
                  overflowY: 'auto'
                }}>
                  {searchResults.length > 0 ? (
                    searchResults.map(node => {
                      const parts = node.label.replace(/_/g, ' ').split('/');
                      const leaf = parts[parts.length - 1];
                      const path = parts.slice(0, parts.length - 1).join(' / ');
                      return (
                        <div
                          key={node.id}
                          onClick={() => handleSelectNode(node)}
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #2b2d30'
                          }}
                          className="search-item"
                        >
                          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffc66d', fontFamily: 'var(--font-mono)' }}>{leaf}()</div>
                          <div style={{ fontSize: '10px', color: '#9876aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{path}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                      Niciun rezultat găsit
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Status Filter Section */}
            <div>
              <div style={{ fontSize: '11px', color: '#a9b7c6', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                Filtrare Status
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { id: null, label: 'Toate', color: '#2b2d30', activeColor: '#3c3f41', borderColor: '#a9b7c6' },
                  { id: 'completed', label: 'Finalizate', color: '#2b2d30', activeColor: 'rgba(73, 156, 84, 0.15)', borderColor: '#499c54' },
                  { id: 'in-progress', label: 'În lucru', color: '#2b2d30', activeColor: 'rgba(53, 116, 240, 0.15)', borderColor: '#3574f0' },
                  { id: 'locked', label: 'Blocate', color: '#2b2d30', activeColor: '#1e1f22', borderColor: '#555555' }
                ].map(opt => {
                  const isActive = activeStatusFilter === opt.id;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setActiveStatusFilter(opt.id)}
                      style={{
                        background: isActive ? opt.activeColor : opt.color,
                        border: `1px solid ${isActive ? opt.borderColor : '#3c3f41'}`,
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: isActive ? '#fff' : '#a9b7c6',
                        fontSize: '11px',
                        fontWeight: isActive ? '800' : 'normal',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend & Stats Section */}
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#a9b7c6', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                <span>Domenii & Statistici</span>
                <span style={{ fontSize: '10px', color: '#499c54', fontWeight: 'bold' }}>
                  {nodes.filter(n => n.status === 'completed').length} / {nodes.length} OK
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', maxHeight: '200px', paddingRight: '4px' }}>
                {domainsWithBounds.map(d => {
                  if (!d.bounds) return null;
                  const domainNodes = nodes.filter(n => d.nodes.includes(n.id));
                  const completedCount = domainNodes.filter(n => n.status === 'completed').length;
                  const totalCount = domainNodes.length;
                  const isHoveredDomain = activeDomainFilter === d.id;
                  
                  return (
                    <div
                      key={d.id}
                      onMouseEnter={() => setActiveDomainFilter(d.id)}
                      onMouseLeave={() => setActiveDomainFilter(null)}
                      onClick={() => fitDomain(d)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        background: isHoveredDomain ? '#2b2d30' : 'transparent',
                        border: `1px solid ${isHoveredDomain ? '#3c3f41' : 'transparent'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px' }}>{d.icon}</span>
                        <span style={{ fontSize: '12px', color: isHoveredDomain ? '#fff' : '#a9b7c6', fontWeight: isHoveredDomain ? 'bold' : 'normal' }}>
                          {d.label}
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', color: d.borderColor, fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                        {completedCount}/{totalCount}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #2b2d30', paddingTop: '12px' }}>
              <button
                onClick={() => { setScale(0.85); setPosition({ x: 0, y: 1600 }); }}
                style={{
                  flex: 1,
                  background: '#2b2d30',
                  border: '1px solid #3c3f41',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#a9b7c6',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#3c3f41'}
                onMouseOut={e => e.currentTarget.style.background = '#2b2d30'}
              >
                Alinează Start
              </button>
              <button
                onClick={fitAll}
                style={{
                  flex: 1,
                  background: '#2b2d30',
                  border: '1px solid #3c3f41',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#a9b7c6',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#3c3f41'}
                onMouseOut={e => e.currentTarget.style.background = '#2b2d30'}
              >
                Privire de ansamblu
              </button>
            </div>
            
          </div>
        )}
      </div>

      {/* Olympiad Quest Deck HUD (Solid IDE panel) */}
      <div 
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsHudHovered(true)}
        onMouseLeave={() => setIsHudHovered(false)}
        style={{
          position: 'absolute',
          bottom: (isHudOpen || isHudHovered) ? '24px' : '0px',
          left: '50%',
          transform: (isHudOpen || isHudHovered) ? 'translateX(-50%)' : 'translateX(-50%) translateY(calc(100% - 10px))',
          zIndex: 150,
          width: '680px',
          background: '#2b2d30',
          border: '1px solid #3c3f41',
          borderRadius: '8px',
          boxShadow: (isHudOpen || isHudHovered) ? '0 6px 20px rgba(0, 0, 0, 0.5)' : 'none',
          padding: '16px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          color: '#a9b7c6',
          opacity: (isHudOpen || isHudHovered) ? 1 : 0.25,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1), boxShadow 0.3s ease'
        }}
      >
        {/* Track Selection Buttons */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
          {olympiadTracks.map(track => {
            const isActive = activeTrackId === track.id;
            const trackNodes = track.nodes;
            const completedCount = trackNodes.filter(nId => {
              const nodeObj = nodes.find(n => n.id === nId);
              return nodeObj && nodeObj.status === 'completed';
            }).length;
            const progressPct = trackNodes.length > 0 ? Math.round((completedCount / trackNodes.length) * 100) : 0;

            return (
              <button
                key={track.id}
                onClick={() => {
                  if (isActive) {
                    setActiveTrackId(null);
                    setIsVoyageMode(false);
                  } else {
                    setActiveTrackId(track.id);
                    setIsVoyageMode(false);
                    setVoyageStep(0);
                  }
                }}
                style={{
                  flex: 1,
                  background: isActive ? '#1e1f22' : '#2b2d30',
                  border: `1.5px solid ${isActive ? track.color : '#3c3f41'}`,
                  borderRadius: '6px',
                  padding: '10px 8px',
                  color: isActive ? '#fff' : '#a9b7c6',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: 'none',
                  transition: 'all 0.15s ease',
                  outline: 'none'
                }}
              >
                <span style={{ fontSize: '18px' }}>{track.badge}</span>
                <span style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.5px' }}>{track.label}</span>
                <span style={{ fontSize: '10px', opacity: 0.7, fontFamily: 'var(--font-mono)' }}>{progressPct}% completat</span>
              </button>
            );
          })}
        </div>

        {/* Recomandare Globală (afișată când nu este selectat niciun traseu) */}
        {!activeTrackId && globalRecommendedTrack && (() => {
          const recNodeObj = nodes.find(n => n.id === globalRecommendedNodeId);
          if (!recNodeObj) return null;
          const labelParts = recNodeObj.label.split('/');
          const recShortName = labelParts[labelParts.length - 1].replace(/_/g, ' ');
          
          return (
            <div 
              onClick={() => {
                handleSelectNode(recNodeObj);
                setActiveTrackId(globalRecommendedTrack.id);
              }}
              style={{
                background: 'rgba(73, 156, 84, 0.08)',
                border: '1px solid #499c54',
                borderRadius: '6px',
                padding: '10px 14px',
                fontSize: '11px',
                color: '#a9b7c6',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginTop: '4px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(73, 156, 84, 0.15)';
                e.currentTarget.style.borderColor = '#499c54';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(73, 156, 84, 0.08)';
                e.currentTarget.style.borderColor = '#499c54';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>🎯</span>
                <span>
                  Recomandare: Începe sau continuă cu <strong style={{ color: '#fff' }}>{recShortName}</strong> din traseul <strong style={{ color: '#fff' }}>{globalRecommendedTrack.label}</strong>
                </span>
              </div>
              <span style={{ fontSize: '10px', color: '#499c54', fontWeight: 'bold' }}>Focalizează ➔</span>
            </div>
          );
        })()}

        {/* Selected Track Detail & Steps */}
        {activeTrackId && (() => {
          const track = olympiadTracks.find(t => t.id === activeTrackId);
          const rawTrackNodes = track ? track.nodes : [];
          const completedCount = rawTrackNodes.filter(nId => {
            const nodeObj = nodes.find(n => n.id === nId);
            return nodeObj && nodeObj.status === 'completed';
          }).length;
          const progressPct = rawTrackNodes.length > 0 ? Math.round((completedCount / rawTrackNodes.length) * 100) : 0;

          // Ignore already completed nodes!
          const trackNodes = rawTrackNodes.filter(nId => {
            const nodeObj = nodes.find(n => n.id === nId);
            return nodeObj && nodeObj.status !== 'completed';
          });

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #3c3f41', paddingTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: track.color }} />
                  <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: track.color, fontFamily: 'var(--font-mono)' }}>
                    Traseul {track.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsVoyageMode(!isVoyageMode);
                    setVoyageStep(0);
                  }}
                  style={{
                    background: isVoyageMode ? 'rgba(239, 68, 68, 0.15)' : '#1e1f22',
                    border: `1px solid ${isVoyageMode ? '#ef4444' : '#3c3f41'}`,
                    borderRadius: '6px',
                    padding: '4px 12px',
                    color: isVoyageMode ? '#f87171' : '#a9b7c6',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isVoyageMode ? '✕ Oprire Antrenament' : '🚀 Antrenament Ghidat'}
                </button>
              </div>

              {/* Detalii Pas curent din Antrenamentul Ghidat */}
              {isVoyageMode && (() => {
                if (trackNodes.length === 0) {
                  return (
                    <div style={{
                      background: '#1e1f22',
                      border: '1px solid #499c54',
                      borderRadius: '6px',
                      padding: '16px',
                      textAlign: 'center',
                      color: '#499c54',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}>
                      🎉 Felicitări! Ai finalizat toate topicurile din traseul {track.label}!
                    </div>
                  );
                }
                const activeNodeId = trackNodes[voyageStep];
                const nodeObj = nodes.find(n => n.id === activeNodeId);
                if (!nodeObj) return null;

                const labelParts = nodeObj.label.split('/');
                const categoryName = labelParts.slice(0, labelParts.length - 1).join(' / ').replace(/_/g, ' ');
                const topicName = labelParts[labelParts.length - 1].replace(/_/g, ' ');
                const isCompleted = nodeObj.status === 'completed';

                return (
                  <div style={{
                    background: '#1e1f22',
                    border: '1px solid #3c3f41',
                    borderRadius: '6px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginTop: '4px',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: track.color, textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-mono)' }}>
                        {track.badge} Antrenament: Pasul {voyageStep + 1} / {trackNodes.length}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: isCompleted ? 'rgba(73, 156, 84, 0.15)' : 'rgba(245, 166, 35, 0.15)',
                        color: isCompleted ? '#499c54' : '#fbbf24',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {isCompleted ? '✓ Finalizat' : '⚡ În lucru'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#9876aa', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                          {categoryName}
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '2px 0 0 0', fontFamily: 'var(--font-mono)', color: '#ffc66d' }}>
                          {topicName}()
                        </h3>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          if (onNodeClick) onNodeClick(nodeObj.label);
                        }}
                        style={{
                          background: track.color,
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 14px',
                          color: '#000',
                          fontWeight: '800',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: 'none',
                          transition: 'all 0.15s ease',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        📖 Studiază Teorie & C++
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', borderTop: '1px solid #3c3f41', paddingTop: '10px', marginTop: '2px' }}>
                      <button
                        type="button"
                        disabled={voyageStep === 0}
                        onClick={() => setVoyageStep(s => Math.max(0, s - 1))}
                        style={{
                          background: '#1e1f22',
                          border: '1px solid #3c3f41',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          color: voyageStep === 0 ? '#686868' : '#a9b7c6',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: voyageStep === 0 ? 'default' : 'pointer'
                        }}
                      >
                        ◀ Pasul Anterior
                      </button>
                      
                      <button
                        type="button"
                        disabled={voyageStep === trackNodes.length - 1}
                        onClick={() => setVoyageStep(s => Math.min(trackNodes.length - 1, s + 1))}
                        style={{
                          background: '#1e1f22',
                          border: '1px solid #3c3f41',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          color: voyageStep === trackNodes.length - 1 ? '#686868' : '#a9b7c6',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          cursor: voyageStep === trackNodes.length - 1 ? 'default' : 'pointer'
                        }}
                      >
                        Pasul Următor ▶
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Horizontal Scrollable Step Navigator */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  overflowX: 'auto', 
                  paddingBottom: '4px',
                  scrollBehavior: 'smooth'
                }}
                className="custom-scrollbar"
              >
                {trackNodes.map((nId, idx) => {
                  const nodeObj = nodes.find(n => n.id === nId);
                  if (!nodeObj) return null;
                  const labelParts = nodeObj.label.split('/');
                  const shortName = labelParts[labelParts.length - 1].replace(/_/g, ' ');
                  
                  const isCurrent = isVoyageMode && voyageStep === idx;
                  const isCompleted = nodeObj.status === 'completed';
                  const isRecommended = nId === nextTargetNodeId;

                  let stepBg = '#1e1f22';
                  let stepBorder = '1px solid #3c3f41';
                  let extraShadow = 'none';
                  if (isCurrent) {
                    stepBg = '#252629';
                    stepBorder = `2px solid ${track.color}`;
                  } else if (isRecommended) {
                    stepBg = 'rgba(73, 156, 84, 0.08)';
                    stepBorder = '1px solid #499c54';
                  } else if (isCompleted) {
                    stepBg = '#1e1f22';
                    stepBorder = '1px solid #499c54';
                  }

                  return (
                    <div
                      key={`${nId}-step-${idx}`}
                      onClick={() => {
                        handleSelectNode(nodeObj);
                        if (isVoyageMode) {
                          setVoyageStep(idx);
                        }
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        background: stepBg,
                        border: stepBorder,
                        boxShadow: extraShadow,
                        fontSize: '11px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: isCurrent ? '#fff' : (isRecommended ? '#499c54' : '#a9b7c6'),
                        fontWeight: isCurrent || isRecommended ? 'bold' : 'normal',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: isCompleted ? '#499c54' : (isRecommended ? '#499c54' : '#2b2d30'),
                        color: isCompleted || isRecommended ? '#000' : '#a9b7c6',
                        fontSize: '9px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isCompleted ? '✓' : (isRecommended ? '🎯' : idx + 1)}
                      </span>
                      {shortName}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>



      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes dataFlow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes dataPulseFlow {
            from { stroke-dashoffset: 100; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes sonarPing {
            0% { transform: scale(1); opacity: 0.8; }
            70% { transform: scale(1.06); opacity: 0; }
            100% { transform: scale(1.06); opacity: 0; }
          }
          @keyframes parentGlowPulse {
            0% { 
              box-shadow: 0 0 6px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02);
              border-color: var(--glow-color);
            }
            50% { 
              box-shadow: 0 0 12px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.03);
              border-color: #fff;
            }
            100% { 
              box-shadow: 0 0 6px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02);
              border-color: var(--glow-color);
            }
          }
          @keyframes childGlowPulse {
            0% { 
              box-shadow: 0 2px 6px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02) translateY(-1px);
              border-color: var(--glow-color);
            }
            50% { 
              box-shadow: 0 6px 16px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.03) translateY(-2px);
              border-color: #fff;
            }
            100% { 
              box-shadow: 0 2px 6px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02) translateY(-1px);
            }
          }
          @keyframes cyberPulse {
            0% { box-shadow: 0 4px 10px rgba(73, 156, 84, 0.2); }
            50% { box-shadow: 0 4px 16px rgba(73, 156, 84, 0.35); }
            100% { box-shadow: 0 4px 10px rgba(73, 156, 84, 0.2); }
          }
          @keyframes shimmerSweep {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes searchFlashPulse {
            0% {
              border-color: #3574f0;
              box-shadow: 0 0 12px #3574f0;
              transform: translate(-50%, -50%) scale(1.04);
            }
            25% {
              border-color: #ffc66d;
              box-shadow: 0 0 16px #ffc66d;
              transform: translate(-50%, -50%) scale(1.08);
            }
            50% {
              border-color: #3574f0;
              box-shadow: 0 0 12px #3574f0;
              transform: translate(-50%, -50%) scale(1.04);
            }
            75% {
              border-color: #ffc66d;
              box-shadow: 0 0 16px #ffc66d;
              transform: translate(-50%, -50%) scale(1.08);
            }
            100% {
              border-color: var(--glow-color);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .searched-flash {
            animation: searchFlashPulse 2.5s ease-in-out forwards !important;
            z-index: 1000 !important;
          }
          .search-item:hover {
            background: #2b2d30 !important;
          }
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a1b1d;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #3c3f41;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555555;
          }
        `}
      </style>
    </div>
  );
};

export default SyllabusTree;
