import React, { useState, useRef, useEffect } from 'react';
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

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

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

  const btnStyle = {
    padding: '10px 16px',
    background: 'rgba(10, 14, 23, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: '#fff',
    cursor: 'pointer',
    backdropFilter: 'blur(16px)',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
        backgroundColor: '#05050a',
        backgroundImage: 'radial-gradient(circle at center, #0f0c1b 0%, #05050a 100%)',
        boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Glow Orbs Layer Removed to allow dynamic per-category glows */}
      <div style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 100, display: 'flex', gap: '12px' }}>
        <button 
          onClick={() => setScale(s => Math.min(s + 0.2, 4))} 
          style={btnStyle}
          onMouseOver={e => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={e => e.target.style.background = 'rgba(10, 14, 23, 0.6)'}
        >+</button>
        <button 
          onClick={() => setScale(s => Math.max(s - 0.2, 0.1))} 
          style={btnStyle}
          onMouseOver={e => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={e => e.target.style.background = 'rgba(10, 14, 23, 0.6)'}
        >-</button>
        <button 
          onClick={() => { setScale(1); setPosition({x:0, y:0}); }} 
          style={{ ...btnStyle, fontSize: '14px' }}
          onMouseOver={e => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={e => e.target.style.background = 'rgba(10, 14, 23, 0.6)'}
        >Reset</button>
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
          const glowColor = domain.borderColor.replace('0.5', '0.2');
          return (
            <div 
              key={`glow-${domain.id}`}
              style={{
                position: 'absolute',
                left: x + OFFSET_X + w/2,
                top: y + OFFSET_Y + h/2,
                width: Math.max(w, h) * 1.8,
                height: Math.max(w, h) * 1.8,
                background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                transform: 'translate(-50%, -50%)',
                filter: 'blur(90px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
          );
        })}

        {/* Draw SVG Background Domains and Edges */}
        <svg width="6000" height="5000" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
          <defs>
            <pattern id="halftone" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Center Cross */}
              <path d="M 20 16 L 20 24 M 16 20 L 24 20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
              
              {/* Corner Dots */}
              <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.08)" />
              <circle cx="40" cy="0" r="1.5" fill="rgba(255,255,255,0.08)" />
              <circle cx="0" cy="40" r="1.5" fill="rgba(255,255,255,0.08)" />
              <circle cx="40" cy="40" r="1.5" fill="rgba(255,255,255,0.08)" />
              
              {/* Subtle Edge Dots */}
              <circle cx="20" cy="0" r="0.8" fill="rgba(255,255,255,0.04)" />
              <circle cx="0" cy="20" r="0.8" fill="rgba(255,255,255,0.04)" />
              <circle cx="40" cy="20" r="0.8" fill="rgba(255,255,255,0.04)" />
              <circle cx="20" cy="40" r="0.8" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#halftone)" />
          <defs>
            {edges.map((edge, i) => {
              const n1 = nodes.find(n => n.id === edge.from);
              const n2 = nodes.find(n => n.id === edge.to);
              if(!n1 || !n2) return null;
              const d1 = getNodeDomain(n1.id);
              const d2 = getNodeDomain(n2.id);
              return (
                <linearGradient key={`grad-${i}`} id={`grad-${i}`} gradientUnits="userSpaceOnUse" x1={n1.x + OFFSET_X} y1={n1.y + OFFSET_Y} x2={n2.x + OFFSET_X} y2={n2.y + OFFSET_Y}>
                  <stop offset="0%" stopColor={d1 ? d1.borderColor : 'rgba(255, 255, 255, 0.2)'} />
                  <stop offset="100%" stopColor={d2 ? d2.borderColor : 'rgba(255, 255, 255, 0.2)'} />
                </linearGradient>
              )
            })}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Domain Backgrounds */}
          {domainsWithBounds.map(domain => {
            if(!domain.bounds) return null;
            const {x, y, w, h} = domain.bounds;
            return (
              <g key={domain.id}>
                <rect 
                  x={x + OFFSET_X - 40} 
                  y={y + OFFSET_Y - 40} 
                  width={w + 80} 
                  height={h + 80} 
                  fill={domain.color.replace('0.03', '0.06')} 
                  stroke={domain.borderColor.replace('0.5', '0.4')} 
                  strokeWidth="4" 
                  strokeDasharray="12 12" 
                  rx="48" 
                />
                <text 
                  x={x + OFFSET_X + 24} 
                  y={y + OFFSET_Y + 40} 
                  fill={domain.borderColor} 
                  fontSize="32" 
                  fontWeight="bold" 
                  style={{ letterSpacing: '2px', textShadow: `0 4px 15px rgba(0,0,0,0.8), 0 0 20px ${domain.borderColor}` }}
                >
                  {domain.icon} {domain.label}
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
            const endX = n2.x + OFFSET_X;
            const endY = n2.y + OFFSET_Y;
            
            // Cubic bezier for organic tree look
            const dy = Math.abs(endY - startY);
            const cp1X = startX;
            const cp1Y = startY + dy * 0.5;
            const cp2X = endX;
            const cp2Y = endY - dy * 0.5;
            
            const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
            
            const isRelated = hoveredNode === n1.id || hoveredNode === n2.id;
            const bothCompleted = n1.status === 'completed' && n2.status === 'completed';
            
            let edgeColor = `url(#grad-${i})`;
            let edgeWidth = '4';

            if (isRelated) {
              edgeWidth = '8';
            } else if (n1.status === 'locked' && n2.status === 'locked') {
              edgeColor = 'rgba(255, 255, 255, 0.35)';
              edgeWidth = '3';
            }

            return (
              <path 
                key={i}
                d={pathData}
                fill="none"
                stroke={edgeColor} 
                strokeWidth={edgeWidth}
                filter={(bothCompleted || isRelated) ? 'url(#glow)' : 'none'}
                style={{ 
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  strokeDasharray: bothCompleted ? '12 12' : (isRelated ? 'none' : '6 6'),
                  animation: bothCompleted ? 'dataFlow 1s linear infinite' : 'none',
                  opacity: (isRelated || bothCompleted) ? 1 : 0.85
                }}
              />
            )
          })}
        </svg>

        {/* Draw HTML Nodes */}
        {nodes.map(node => {
          const isHovered = hoveredNode === node.id;
          const xp = userXp[node.label] || 0;
          const confidence = Math.min(100, xp);
          const domain = getNodeDomain(node.id);
          const domainBorderColor = domain ? domain.borderColor : 'rgba(255, 255, 255, 0.2)';
          
          let nodeBg = 'linear-gradient(145deg, rgba(30, 35, 45, 0.9) 0%, rgba(15, 20, 30, 0.95) 100%)';
          let shadow = '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)';
          let transformScale = 'scale(1)';
          let borderOverlay = `2px solid ${domainBorderColor.replace('0.5', '0.4')}`;

          if (isHovered) {
            transformScale = 'scale(1.1) translateY(-10px)';
            nodeBg = 'linear-gradient(145deg, rgba(40, 45, 60, 0.95) 0%, rgba(20, 25, 35, 1) 100%)';
            shadow = `0 25px 50px ${domainBorderColor}, inset 0 2px 4px rgba(255,255,255,0.3)`;
            borderOverlay = `2px solid ${domainBorderColor}`;
          } else if (node.status === 'completed') {
            shadow = `0 8px 24px ${getStatusColor(node.status)}40, inset 0 1px 1px rgba(255,255,255,0.1)`;
            borderOverlay = `2px solid ${getStatusColor(node.status)}`;
          } else if (node.status === 'in-progress') {
            shadow = `0 8px 32px ${domainBorderColor.replace('0.5', '0.3')}, inset 0 1px 1px rgba(255,255,255,0.1)`;
            borderOverlay = `2px solid ${domainBorderColor.replace('0.5', '0.8')}`;
          } else if (node.status === 'locked') {
            nodeBg = 'rgba(10, 12, 18, 0.7)';
            borderOverlay = `1px solid rgba(255, 255, 255, 0.15)`;
          }

          return (
          <div 
            key={node.id}
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
              color: node.status === 'locked' ? 'rgba(255, 255, 255, 0.4)' : '#fff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              zIndex: isHovered ? 10 : (node.status === 'completed' ? 5 : 1),
              boxShadow: shadow,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              minWidth: '260px'
            }}
          >
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '0.4px', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '22px', filter: node.status === 'locked' ? 'grayscale(100%) opacity(0.4)' : 'none' }}>
                {domain ? domain.icon : getCategoryIcon(node.label)}
              </span>
              <span>{node.label.replace(/_/g, ' ').replace(/\//g, ' / ')}</span>
            </div>
            
            {node.status !== 'locked' && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '800' }}>
                  <span>Mastery</span>
                  <span style={{ color: getStatusColor(node.status) }}>{confidence}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}>
                  <div style={{ 
                    width: `${confidence}%`, 
                    height: '100%', 
                    background: node.status === 'completed' 
                      ? 'linear-gradient(90deg, var(--success-color), #34d399)' 
                      : `linear-gradient(90deg, ${domainBorderColor}, var(--text-primary))`,
                    boxShadow: `0 0 12px ${getStatusColor(node.status)}`,
                    transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            )}
            
            {node.status === 'locked' && (
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.3)', marginTop: '4px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Locked
              </div>
            )}
            
            {/* Hover tooltip hint */}
            {isHovered && node.status !== 'locked' && (
              <div style={{
                position: 'absolute',
                bottom: '-36px',
                background: domainBorderColor,
                color: '#fff',
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                fontWeight: '700',
                boxShadow: `0 4px 12px ${domainBorderColor}`,
                animation: 'fadeIn 0.2s ease forwards',
                textShadow: '0 1px 2px rgba(0,0,0,0.8)'
              }}>
                Click to explore topics
              </div>
            )}
          </div>
        )})}
      </div>

      {/* Cool Feature: Minimap */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        width: '240px',
        height: '200px',
        background: 'rgba(10, 14, 23, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
      }}>
        <div style={{ padding: '8px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', position: 'relative', zIndex: 2 }}>
          Minimap
        </div>
        {/* Radar scanline overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(99, 102, 241, 0.05) 2px, rgba(99, 102, 241, 0.05) 4px)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'relative', width: '100%', height: 'calc(100% - 33px)', zIndex: 2 }}>
          {nodes.map(node => (
            <div key={`mini-${node.id}`} style={{
              position: 'absolute',
              left: `${((node.x + OFFSET_X) / 6000) * 100}%`,
              top: `${((node.y + OFFSET_Y) / 5000) * 100}%`,
              width: '4px',
              height: '4px',
              background: node.status === 'completed' ? 'var(--success-color)' : (node.status === 'locked' ? 'rgba(255,255,255,0.2)' : 'var(--accent-secondary)'),
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: node.status === 'in-progress' ? '0 0 6px var(--accent-secondary)' : 'none'
            }} />
          ))}
          {/* Approximate Viewport indicator */}
          <div style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: `translate(calc(-50% - ${(position.x / 6000) * 240}px), calc(-50% - ${(position.y / 5000) * 167}px))`,
            width: `${(100 / scale) * (800 / 6000)}%`,
            height: `${(100 / scale) * (600 / 5000)}%`,
            border: '1px solid rgba(255, 255, 255, 0.6)',
            borderRadius: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            pointerEvents: 'none',
            boxShadow: '0 0 10px rgba(255,255,255,0.2)'
          }} />
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float1 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-45%, -40%) scale(1.1); }
          }
          @keyframes float2 {
            0%, 100% { transform: translate(30%, 30%) scale(1); }
            50% { transform: translate(25%, 35%) scale(1.15); }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-55%, -55%) scale(1.05); }
          }
          @keyframes dataFlow {
            from { stroke-dashoffset: 24; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes dash {
            to {
              stroke-dashoffset: -16;
            }
          }
          @keyframes sonarPing {
            0% { transform: scale(1); opacity: 0.8; }
            70% { transform: scale(1.15); opacity: 0; }
            100% { transform: scale(1.15); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default SyllabusTree;
