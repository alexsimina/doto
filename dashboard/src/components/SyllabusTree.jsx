import { useState, useRef, useEffect } from 'react';
import { getCategoryIcon, domainGroups, getNodeDomain, rawNodes, rawEdges } from '../data/syllabusData';

const SyllabusTree = ({ userXp = {}, onNodeClick }) => {
  const getStatus = (label) => {
    const xp = userXp[label] || 0;
    if (xp >= 100) return 'completed';
    if (xp > 0) return 'in-progress';
    return 'locked';
  };

  const nodes = rawNodes.map(node => ({ ...node, status: getStatus(node.label) }));
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

  const [scale, setScale] = useState(0.85);
  const [position, setPosition] = useState({ x: 0, y: 1600 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // QOL States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [flashedNodeId, setFlashedNodeId] = useState(null);
  const [activeDomainFilter, setActiveDomainFilter] = useState(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const flashTimeoutRef = useRef(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    };
  }, []);

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
      x: -centerX,
      y: 2200 - centerY
    });
  };

  const fitAll = () => {
    const container = containerRef.current;
    const W = container ? container.clientWidth : 1200;
    const H = container ? container.clientHeight : 800;
    const w = 4207 + 360;
    const h = 3683 + 280;
    const targetScale = Math.max(0.18, Math.min((W - 100) / w, (H - 100) / h, 0.95));
    setScale(targetScale);
    setPosition({
      x: -285,
      y: 2200 - 1841
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
      x: -node.x,
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
      const zoomSensitivity = 0.002;
      setScale(currentScale => {
        let newScale = currentScale - e.deltaY * zoomSensitivity;
        return Math.max(0.1, Math.min(newScale, 4));
      });
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
          setScale(s => Math.min(s + zoomStep, 4));
          break;
        case '-':
        case '_':
          setScale(s => Math.max(s - zoomStep, 0.1));
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
        case '/':
          e.preventDefault();
          const searchInput = document.getElementById('syllabus-search-input');
          if (searchInput) searchInput.focus();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const formatNodeLabel = (label) => {
    const parts = label.replace(/_/g, ' ').split('/');
    if (parts.length > 1) {
      const leaf = parts[parts.length - 1];
      const category = parts.slice(0, parts.length - 1).join(' / ');
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '1.2px', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
            {category}
          </span>
          <span style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '0.2px' }}>
            {leaf}
          </span>
        </div>
      );
    }
    return (
      <span style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#ffffff', letterSpacing: '0.2px' }}>
        {parts[0]}
      </span>
    );
  };

  const controlBtnStyle = {
    width: '36px',
    height: '36px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '10px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    outline: 'none'
  };

  const OFFSET_X = 3000;
  const OFFSET_Y = 300;

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
        backgroundColor: '#05040f',
        backgroundImage: 'radial-gradient(circle at center, #16113c 0%, #05040f 100%)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.95)',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)'
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
        background: 'rgba(10, 14, 23, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        padding: '6px 12px',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
      }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '700', padding: '0 8px', borderRight: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)' }}>
          {Math.round(scale * 100)}%
        </span>
        <button 
          onClick={() => setScale(s => Math.min(s + 0.2, 4))} 
          style={controlBtnStyle}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
          title="Zoom In"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button 
          onClick={() => setScale(s => Math.max(s - 0.2, 0.1))} 
          style={controlBtnStyle}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
          title="Zoom Out"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button 
          onClick={() => { setScale(1); setPosition({x:0, y:0}); }} 
          style={{ ...controlBtnStyle, width: '48px' }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
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
        width: '6000px',
        height: '5000px',
        transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}>
        
        {/* Glow Orbs Layer (Dynamic) */}
        {domainsWithBounds.map(domain => {
          if(!domain.bounds) return null;
          const {x, y, w, h} = domain.bounds;
          const glowColor = domain.borderColor.replace('0.5', '0.22');
          return (
            <div 
              key={`glow-${domain.id}`}
              style={{
                position: 'absolute',
                left: x + OFFSET_X - 35,
                top: y + OFFSET_Y - 35,
                width: w + 70,
                height: h + 70,
                backgroundColor: glowColor,
                borderRadius: '48px',
                filter: 'blur(90px)',
                mixBlendMode: 'screen',
                opacity: 0.78,
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
          );
        })}

        {/* Draw SVG Background Domains and Edges */}
        <svg width="6000" height="5000" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
          <defs>
            {/* Tech Blueprint Grid Pattern */}
            <pattern id="techgrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1" />
              <circle cx="40" cy="40" r="1.2" fill="rgba(255, 255, 255, 0.12)" />
              <path d="M 0 8 L 0 0 L 8 0" fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.5" />
              <path d="M 80 8 L 80 0 L 72 0" fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.5" />
              <path d="M 0 72 L 0 80 L 8 80" fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.5" />
              <path d="M 80 72 L 80 80 L 72 80" fill="none" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.5" />
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
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Backgrounds */}
          <rect width="100%" height="100%" fill="url(#techgrid)" mask="url(#grid-mask)" style={{ mixBlendMode: 'screen', opacity: 0.45 }} />
          <rect width="100%" height="100%" fill="url(#black-halftone)" mask="url(#grid-mask)" style={{ mixBlendMode: 'multiply', opacity: 0.95 }} />

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
                  strokeWidth="12"
                  opacity="0.04"
                  filter="url(#glow)"
                  rx="40"
                />
                {/* Outer Tech Border */}
                <rect 
                  x={rectX} 
                  y={rectY} 
                  width={rectW} 
                  height={rectH} 
                  fill={domain.color.replace('0.03', '0.04')} 
                  stroke={borderColor.replace('0.5', '0.25')} 
                  strokeWidth="1.5" 
                  rx="40" 
                />
                {/* Inner Tech Border */}
                <rect 
                  x={rectX + 6} 
                  y={rectY + 6} 
                  width={rectW - 12} 
                  height={rectH - 12} 
                  fill="none" 
                  stroke={borderColor.replace('0.5', '0.35')} 
                  strokeWidth="1"
                  strokeDasharray="24 16"
                  rx="34" 
                />
                {/* Sector Bracket Highlights (Sci-fi Corner Overlays) */}
                {/* Top-Left Corner */}
                <path d={`M ${rectX} ${rectY + 40} L ${rectX} ${rectY} L ${rectX + 40} ${rectY}`} fill="none" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
                {/* Top-Right Corner */}
                <path d={`M ${rectX + rectW - 40} ${rectY} L ${rectX + rectW} ${rectY} L ${rectX + rectW} ${rectY + 40}`} fill="none" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
                {/* Bottom-Left Corner */}
                <path d={`M ${rectX} ${rectY + rectH - 40} L ${rectX} ${rectY + rectH} L ${rectX + 40} ${rectY + rectH}`} fill="none" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />
                {/* Bottom-Right Corner */}
                <path d={`M ${rectX + rectW - 40} ${rectY + rectH} L ${rectX + rectW} ${rectY + rectH} L ${rectX + rectW} ${rectY + rectH - 40}`} fill="none" stroke={borderColor} strokeWidth="4" strokeLinecap="round" />

                {/* Tech Meta Code text */}
                <text
                  x={rectX + rectW - 24}
                  y={rectY + 28}
                  fill={borderColor.replace('0.5', '0.4')}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fontWeight="bold"
                  textAnchor="end"
                  letterSpacing="1px"
                >
                  {`[ ${sectorCode} ] COORDINATES: ${x},${y}`}
                </text>

                {/* Domain Label */}
                <text 
                  x={rectX + 32} 
                  y={rectY + 44} 
                  fill={borderColor} 
                  fontSize="28" 
                  fontFamily="var(--font-display)"
                  fontWeight="800" 
                  style={{ letterSpacing: '2px', textShadow: `0 4px 15px rgba(0,0,0,0.8), 0 0 15px ${borderColor}` }}
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
            
            const startX = n1.x + OFFSET_X;
            const startY = n1.y + OFFSET_Y;
            const endX = n2.x + OFFSET_X + (n1.x === n2.x ? 0.01 : 0);
            const endY = n2.y + OFFSET_Y + (n1.y === n2.y ? 0.01 : 0);
            
            // Cubic bezier for organic tree look
            const dy = Math.abs(endY - startY);
            const cp1X = startX;
            const cp1Y = startY + dy * 0.5;
            const cp2X = endX;
            const cp2Y = endY - dy * 0.5;
            
            const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
            
            const isEdgeToChild = hoveredNode === n1.id;
            const isEdgeToParent = hoveredNode === n2.id;
            const isRelated = isEdgeToChild || isEdgeToParent;
            const bothCompleted = n1.status === 'completed' && n2.status === 'completed';
            
            let edgeColor = `url(#grad-${i})`;
            let edgeWidth = '4';

            if (isRelated) {
              edgeWidth = '8';
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
            
            const edgeBaseOpacity = !hoveredNode ? (bothCompleted ? 1 : 0.85) : ((isRelated || bothCompleted) ? 1 : 0.35);
            const finalEdgeOpacity = isEdgeVisible ? edgeBaseOpacity : 0.05;

            return (
              <g key={i}>
                {/* Glow path behind the edge */}
                {(bothCompleted || isRelated) && isEdgeVisible && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isRelated ? flowColor : 'var(--success-color)'}
                    strokeWidth={isRelated ? 10 : 6}
                    opacity="0.24"
                    filter="url(#glow)"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                )}
                {/* Base Connector Line */}
                <path 
                  d={pathData}
                  fill="none"
                  stroke={edgeColor} 
                  strokeWidth={edgeWidth}
                  style={{ 
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    strokeDasharray: bothCompleted ? '12 12' : (isEdgeToParent ? '8 8' : (isEdgeToChild ? 'none' : '6 6')),
                    animation: bothCompleted ? 'dataFlow 1.2s linear infinite' : (isEdgeToParent ? 'dataFlow 0.8s linear infinite' : 'none'),
                    opacity: finalEdgeOpacity
                  }}
                />
                {/* Dynamic Moving Data Pulse overlay */}
                {(bothCompleted || isRelated || n1.status === 'completed') && n2.status !== 'locked' && isEdgeVisible && (
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isRelated ? '#fff' : (bothCompleted ? 'var(--success-color)' : flowColor)}
                    strokeWidth={isRelated ? '2.5' : '1.5'}
                    strokeLinecap="round"
                    strokeDasharray="8 60"
                    style={{
                      animation: `dataPulseFlow ${isRelated ? '0.7s' : (bothCompleted ? '1.5s' : '2.5s')} linear infinite`,
                      opacity: 0.85
                    }}
                  />
                )}
              </g>
            )
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
          
          let nodeBg = 'linear-gradient(135deg, #090a0f 0%, #11131c 100%)';
          let shadow = '0 10px 30px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
          let transformScale = 'scale(1)';
          let borderOverlay = '2px solid rgba(255, 255, 255, 0.15)';
          let customAnimation = 'none';

          if (isHovered) {
            transformScale = 'scale(1.1) translateY(-10px)';
            nodeBg = 'linear-gradient(135deg, #131726 0%, #0d0f17 100%)';
            shadow = `0 18px 40px rgba(0,0,0,0.8), 0 0 20px ${domainBorderColor}, inset 0 1px 0 rgba(255,255,255,0.1)`;
            borderOverlay = `2px solid ${domainBorderColor}`;
          } else if (isParentOfHovered) {
            borderOverlay = `2px solid ${domainBorderColor}`;
            shadow = `0 10px 30px rgba(0, 0, 0, 0.75), 0 0 15px ${domainBorderColor}, inset 0 1px 0 rgba(255,255,255,0.05)`;
            customAnimation = 'parentGlowPulse 2.5s infinite ease-in-out';
          } else if (isChildOfHovered) {
            borderOverlay = `2px solid ${domainBorderColor}`;
            shadow = `0 10px 30px rgba(0, 0, 0, 0.75), 0 0 15px ${domainBorderColor}, inset 0 1px 0 rgba(255,255,255,0.05)`;
            customAnimation = 'childGlowPulse 2.5s infinite ease-in-out';
          } else if (node.status === 'completed') {
            nodeBg = 'linear-gradient(135deg, #04100c 0%, #080a10 100%)';
            borderOverlay = `2px solid ${getStatusColor(node.status)}`;
            customAnimation = 'cyberPulse 3s infinite ease-in-out';
          } else if (node.status === 'in-progress') {
            nodeBg = 'linear-gradient(135deg, #0a0b12 0%, #141724 100%)';
            borderOverlay = `2px solid ${domainBorderColor}`;
            shadow = `0 10px 30px rgba(0, 0, 0, 0.7), 0 0 12px ${domainBorderColor}, inset 0 1px 0 rgba(255,255,255,0.05)`;
          } else if (node.status === 'locked') {
            nodeBg = '#06070a';
            borderOverlay = `1px solid rgba(255, 255, 255, 0.08)`;
            shadow = '0 4px 12px rgba(0, 0, 0, 0.8)';
          }

          // Interactive domain & status filter visibility
          const isNodeVisible = (!activeDomainFilter || (domain && domain.id === activeDomainFilter)) &&
                                (!activeStatusFilter || node.status === activeStatusFilter);
          const nodeBaseOpacity = node.status === 'locked' ? 0.6 : 1;
          const finalNodeOpacity = (flashedNodeId === node.id) ? 1 : (isNodeVisible ? nodeBaseOpacity : 0.15);

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
                borderRadius: '20px',
                padding: '24px 32px',
                color: node.status === 'locked' ? 'rgba(255, 255, 255, 0.25)' : '#fff',
                cursor: node.status === 'locked' ? 'default' : 'pointer',
                zIndex: isHovered ? 10 : (isParentOfHovered || isChildOfHovered ? 8 : (node.status === 'completed' ? 5 : 1)),
                boxShadow: shadow,
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease',
                opacity: finalNodeOpacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                minWidth: '270px',
                animation: customAnimation,
                "--glow-color": domainBorderColor
              }}
            >
              {/* Sci-fi corner brackets (HTML/CSS design overlay) */}
              {node.status !== 'locked' && (
                <>
                  <div style={{ position: 'absolute', top: '8px', left: '8px', width: '8px', height: '8px', borderTop: `2px solid ${domainBorderColor}`, borderLeft: `2px solid ${domainBorderColor}`, borderTopLeftRadius: '4px', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderTop: `2px solid ${domainBorderColor}`, borderRight: `2px solid ${domainBorderColor}`, borderTopRightRadius: '4px', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '8px', height: '8px', borderBottom: `2px solid ${domainBorderColor}`, borderLeft: `2px solid ${domainBorderColor}`, borderBottomLeftRadius: '4px', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '8px', height: '8px', borderBottom: `2px solid ${domainBorderColor}`, borderRight: `2px solid ${domainBorderColor}`, borderBottomRightRadius: '4px', opacity: 0.6 }} />
                </>
              )}

              {/* Shimmer sweep effect on hovered cards */}
              <div 
                className="shimmer-sheen" 
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.08) 50%, transparent 65%)',
                  backgroundSize: '200% 100%',
                  pointerEvents: 'none',
                  borderRadius: '20px',
                  opacity: isHovered ? 1 : 0,
                  animation: isHovered ? 'shimmerSweep 1.5s infinite linear' : 'none'
                }} 
              />

              {node.status === 'in-progress' && (
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  borderRadius: '20px',
                  border: `2px solid ${domainBorderColor}`,
                  animation: 'sonarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                  pointerEvents: 'none',
                  zIndex: -1
                }} />
              )}
              
              {/* Category Icon and Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '24px', filter: node.status === 'locked' ? 'grayscale(100%) opacity(0.3)' : 'none' }}>
                  {domain ? domain.icon : getCategoryIcon(node.label)}
                </span>
                {formatNodeLabel(node.label)}
              </div>
              
              {node.status !== 'locked' && (
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                    <span>Mastery</span>
                    <span style={{ color: getStatusColor(node.status), fontWeight: 'bold' }}>{confidence}%</span>
                  </div>
                  {/* Styled segmented-look progress bar */}
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 2px, transparent 2px, transparent 6px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '4px', 
                    overflow: 'hidden', 
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      width: `${confidence}%`, 
                      height: '100%', 
                      background: node.status === 'completed' 
                        ? 'linear-gradient(90deg, var(--success-color), #34d399)' 
                        : `linear-gradient(90deg, ${domainBorderColor}, var(--text-primary))`,
                      boxShadow: `0 0 10px ${getStatusColor(node.status)}`,
                      transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              )}
              
              {node.status === 'locked' && (
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.25)', marginTop: '4px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  LOCKED
                </div>
              )}
              
              {/* Sci-fi glowing tooltip hint */}
              {isHovered && node.status !== 'locked' && (
                <div style={{
                  position: 'absolute',
                  bottom: '-42px',
                  background: 'rgba(10, 14, 23, 0.95)',
                  border: `1px solid ${domainBorderColor}`,
                  color: '#fff',
                  fontSize: '10px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  fontWeight: '800',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.6), 0 0 12px ${domainBorderColor.replace('0.5', '0.25')}`,
                  animation: 'fadeIn 0.2s ease forwards',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 100,
                  letterSpacing: '0.8px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: domainBorderColor, display: 'inline-block', animation: 'sonarPing 1s infinite' }} />
                  EXPLORE TOPICS
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Holographic Radar Minimap */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        width: '240px',
        height: '200px',
        background: 'rgba(8, 10, 16, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        zIndex: 100,
        overflow: 'hidden',
        boxShadow: '0 10px 35px rgba(0,0,0,0.6), inset 0 0 15px rgba(99, 102, 241, 0.05)'
      }}>
        <div style={{ 
          padding: '8px 12px', 
          fontSize: '10px', 
          color: 'rgba(255,255,255,0.5)', 
          borderBottom: '1px solid rgba(99, 102, 241, 0.15)', 
          fontWeight: 700, 
          textTransform: 'uppercase', 
          letterSpacing: '1.5px', 
          position: 'relative', 
          zIndex: 4,
          fontFamily: 'var(--font-mono)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Tactical Map</span>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-secondary)', display: 'inline-block', animation: 'sonarPing 2.5s infinite' }} />
        </div>
        {/* Radar scanline sweep overlay */}
        <div style={{ 
          position: 'absolute', 
          left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
          boxShadow: '0 0 6px rgba(99, 102, 241, 0.6)',
          animation: 'radarSweep 4s linear infinite',
          pointerEvents: 'none', 
          zIndex: 3 
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99, 102, 241, 0.03) 2px, rgba(99, 102, 241, 0.03) 4px)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 33px)', zIndex: 2 }}>
          {nodes.map(node => {
            const nodeDomain = getNodeDomain(node.id);
            const dotColor = node.status === 'completed' 
              ? 'var(--success-color)' 
              : (node.status === 'locked' ? 'rgba(255,255,255,0.15)' : (nodeDomain ? nodeDomain.borderColor : 'var(--accent-secondary)'));
            return (
              <div key={`mini-${node.id}`} style={{
                position: 'absolute',
                left: `${((node.x + OFFSET_X) / 6000) * 100}%`,
                top: `${((node.y + OFFSET_Y) / 5000) * 100}%`,
                width: '4px',
                height: '4px',
                background: dotColor,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: node.status === 'in-progress' ? `0 0 6px ${dotColor}` : 'none'
              }} />
            );
          })}
          {/* Viewport Bounds Indicator with Reticle ticks */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: `translate(calc(-50% - ${(position.x / 6000) * 240}px), calc(-50% - ${(position.y / 5000) * 167}px))`,
            width: `${(100 / scale) * (800 / 6000)}%`,
            height: `${(100 / scale) * (600 / 5000)}%`,
            border: '1px solid rgba(99, 102, 241, 0.7)',
            borderRadius: '2px',
            background: 'rgba(99, 102, 241, 0.08)',
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(99, 102, 241, 0.25)'
          }}>
            {/* Viewfinder ticks */}
            <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '4px', height: '4px', borderTop: '1px solid #fff', borderLeft: '1px solid #fff' }} />
            <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '4px', height: '4px', borderTop: '1px solid #fff', borderRight: '1px solid #fff' }} />
            <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '4px', height: '4px', borderBottom: '1px solid #fff', borderLeft: '1px solid #fff' }} />
            <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '4px', height: '4px', borderBottom: '1px solid #fff', borderRight: '1px solid #fff' }} />
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
        background: '#0a0b10',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        boxShadow: '0 12px 35px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        overflow: isPanelCollapsed ? 'hidden' : 'visible',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
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
              color: '#a5b4fc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none'
            }}
            title="Deschide panou control"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', height: '100%', position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', fontFamily: 'var(--font-mono)', letterSpacing: '1px', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚙️</span> CONTROL PANEL
              </span>
              <button
                onClick={() => setIsPanelCollapsed(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px'
                }}
                title="Ascunde"
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
                  background: '#050508',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {/* Autocomplete Suggestions */}
              {searchQuery.trim() !== '' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#0a0b10',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  marginTop: '4px',
                  zIndex: 200,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.9)',
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
                            borderBottom: '1px solid rgba(255,255,255,0.03)'
                          }}
                          className="search-item"
                        >
                          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>{leaf}</div>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{path}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '12px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                      Niciun rezultat găsit
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Status Filter Section */}
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: '700' }}>
                Filtrare Status
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {[
                  { id: null, label: 'Toate', color: 'rgba(255,255,255,0.06)', activeColor: 'rgba(255,255,255,0.15)' },
                  { id: 'completed', label: 'Finalizate', color: 'rgba(16, 185, 129, 0.05)', activeColor: 'rgba(16, 185, 129, 0.25)', borderColor: 'rgba(16, 185, 129, 0.4)' },
                  { id: 'in-progress', label: 'În lucru', color: 'rgba(139, 92, 246, 0.05)', activeColor: 'rgba(139, 92, 246, 0.25)', borderColor: 'rgba(139, 92, 246, 0.4)' },
                  { id: 'locked', label: 'Blocate', color: 'rgba(255,255,255,0.02)', activeColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }
                ].map(opt => {
                  const isActive = activeStatusFilter === opt.id;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setActiveStatusFilter(opt.id)}
                      style={{
                        background: isActive ? opt.activeColor : opt.color,
                        border: `1px solid ${isActive ? (opt.borderColor || '#a5b4fc') : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px', fontWeight: '700' }}>
                <span>Legendă domenii & Statistici</span>
                <span style={{ fontSize: '10px', color: '#10b981' }}>
                  {nodes.filter(n => n.status === 'completed').length} / {nodes.length} OK
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto', maxHeight: '200px', paddingRight: '4px' }}>
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
                        borderRadius: '6px',
                        background: isHoveredDomain ? 'rgba(255,255,255,0.03)' : 'transparent',
                        border: `1px solid ${isHoveredDomain ? d.borderColor : 'transparent'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px' }}>{d.icon}</span>
                        <span style={{ fontSize: '12px', color: isHoveredDomain ? '#fff' : 'rgba(255,255,255,0.85)', fontWeight: isHoveredDomain ? 'bold' : 'normal' }}>
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
            <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
              <button
                onClick={() => { setScale(0.85); setPosition({ x: 0, y: 1600 }); }}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Alinează Start
              </button>
              <button
                onClick={fitAll}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '8px',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Privire de ansamblu
              </button>
            </div>
            
          </div>
        )}
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
            70% { transform: scale(1.15); opacity: 0; }
            100% { transform: scale(1.15); opacity: 0; }
          }
          @keyframes parentGlowPulse {
            0% { 
              box-shadow: 0 0 12px var(--glow-color), inset 0 0 12px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02);
              border-color: var(--glow-color);
            }
            50% { 
              box-shadow: 0 0 28px var(--glow-color), inset 0 0 20px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.04);
              border-color: #fff;
            }
            100% { 
              box-shadow: 0 0 12px var(--glow-color), inset 0 0 12px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02);
              border-color: var(--glow-color);
            }
          }
          @keyframes childGlowPulse {
            0% { 
              box-shadow: 0 4px 12px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02) translateY(-2px);
              border-color: var(--glow-color);
            }
            50% { 
              box-shadow: 0 14px 32px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.05) translateY(-5px);
              border-color: #fff;
            }
            100% { 
              box-shadow: 0 4px 12px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.02) translateY(-2px);
            }
          }
          @keyframes cyberPulse {
            0% { box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2), inset 0 1px 1px rgba(255,255,255,0.08); }
            50% { box-shadow: 0 8px 36px rgba(16, 185, 129, 0.4), inset 0 1px 1px rgba(255,255,255,0.15); }
            100% { box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2), inset 0 1px 1px rgba(255,255,255,0.08); }
          }
          @keyframes shimmerSweep {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes radarSweep {
            0% { transform: translateY(0); }
            100% { transform: translateY(167px); }
          }
          @keyframes searchFlashPulse {
            0% {
              border-color: #fff;
              box-shadow: 0 0 8px #fff, 0 0 25px var(--glow-color), inset 0 0 10px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.15);
            }
            25% {
              border-color: var(--accent-tertiary);
              box-shadow: 0 0 25px var(--accent-tertiary), 0 0 50px var(--accent-tertiary), inset 0 0 20px var(--accent-tertiary);
              transform: translate(-50%, -50%) scale(1.25);
            }
            50% {
              border-color: #fff;
              box-shadow: 0 0 8px #fff, 0 0 25px var(--glow-color), inset 0 0 10px var(--glow-color);
              transform: translate(-50%, -50%) scale(1.15);
            }
            75% {
              border-color: var(--accent-tertiary);
              box-shadow: 0 0 25px var(--accent-tertiary), 0 0 50px var(--accent-tertiary), inset 0 0 20px var(--accent-tertiary);
              transform: translate(-50%, -50%) scale(1.25);
            }
            100% {
              border-color: var(--glow-color);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.05);
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .searched-flash {
            animation: searchFlashPulse 2.5s ease-in-out forwards !important;
            z-index: 1000 !important;
          }
          .search-item:hover {
            background: rgba(99, 102, 241, 0.15) !important;
          }
        `}
      </style>
    </div>
  );
};

export default SyllabusTree;
