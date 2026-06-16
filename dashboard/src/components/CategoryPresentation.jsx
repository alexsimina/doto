import React, { useState, useRef, useEffect } from 'react';
import mockCategoryData from '../data/mockCategoryData';

const formatText = (text) => {
  if (typeof text !== 'string') return text;
  const processedText = text.replace(/\\n/g, '\n');

  // Separăm mai întâi blocurile de cod
  const blocks = processedText.split(/(```[\s\S]*?```)/g);

  return blocks.map((block, bIdx) => {
    if (block.startsWith('```') && block.endsWith('```')) {
      const codeContent = block.slice(3, -3).replace(/^\w+\n/, '');
      return (
        <pre key={`block-${bIdx}`} style={{
          background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px',
          overflowX: 'auto', border: '1px solid rgba(255,255,255,0.1)',
          margin: '16px 0', color: '#e2e8f0', fontFamily: 'var(--font-mono)',
          whiteSpace: 'pre', fontSize: '14px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
        }}>
          <code>{codeContent}</code>
        </pre>
      );
    }

    const lines = block.split('\n');
    return lines.map((line, lIdx) => {
      const renderInline = (str) => {
        const parts = str.split(/(\*\*[\s\S]*?\*\*|\*[\s\S]*?\*|`[^`]*`|\[[^\]]+\]\([^)]+\))/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} style={{ color: 'var(--accent-secondary)' }}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} style={{ color: '#a3aed2' }}>{part.slice(1, -1)}</em>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} style={{
                background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '2px 6px', borderRadius: '6px', fontFamily: 'var(--font-mono)',
                color: '#818cf8', fontWeight: 'bold', fontSize: '0.9em'
              }}>
                {part.slice(1, -1)}
              </code>
            );
          }
          if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const tMatch = part.match(/\[([^\]]+)\]/);
            const uMatch = part.match(/\(([^)]+)\)/);
            if (tMatch && uMatch) {
               return (
                 <a key={i} href={uMatch[1]} target="_blank" rel="noreferrer" style={{
                   color: 'var(--accent-primary)', textDecoration: 'none', borderBottom: '1px solid var(--accent-primary)', transition: 'all 0.2s'
                 }} onMouseOver={e => e.target.style.color='var(--accent-secondary)'} onMouseOut={e => e.target.style.color='var(--accent-primary)'}>
                   {tMatch[1]}
                 </a>
               );
            }
          }
          return <span key={i}>{part}</span>;
        });
      };

      if (line.trim().length === 0) {
        return <div key={`empty-${lIdx}`} style={{ height: '12px' }} />;
      }

      let content = line;
      let isList = false;
      let isOrdered = false;
      let isHeader = false;
      let headerLevel = 0;
      let isQuote = false;

      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) { isHeader = true; headerLevel = 1; content = trimmed.slice(2); }
      else if (trimmed.startsWith('## ')) { isHeader = true; headerLevel = 2; content = trimmed.slice(3); }
      else if (trimmed.startsWith('### ')) { isHeader = true; headerLevel = 3; content = trimmed.slice(4); }
      else if (trimmed.startsWith('> ')) { isQuote = true; content = trimmed.slice(2); }
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) { isList = true; content = trimmed.slice(2); }
      else if (/^\d+\.\s/.test(trimmed)) { 
        isList = true; 
        isOrdered = true; 
        content = trimmed.replace(/^\d+\.\s/, ''); 
      }

      const inlineContent = renderInline(content);

      if (isHeader) {
        const sizes = { 1: '28px', 2: '22px', 3: '18px' };
        const colors = { 1: '#fff', 2: 'var(--accent-primary)', 3: 'var(--accent-secondary)' };
        const marginTop = (bIdx === 0 && lIdx === 0) ? '0' : '24px';
        return <div key={`line-${lIdx}`} style={{ fontSize: sizes[headerLevel], fontWeight: 'bold', marginTop, marginBottom: '12px', color: colors[headerLevel], borderBottom: headerLevel === 1 ? '1px solid rgba(255,255,255,0.1)' : 'none', paddingBottom: headerLevel === 1 ? '8px' : '0' }}>{inlineContent}</div>;
      }

      if (isQuote) {
        return <div key={`line-${lIdx}`} style={{ borderLeft: '4px solid var(--accent-primary)', margin: '16px 0', color: 'var(--text-muted)', fontStyle: 'italic', background: 'rgba(99, 102, 241, 0.05)', padding: '16px', borderRadius: '0 8px 8px 0' }}>{inlineContent}</div>;
      }

      if (isList) {
        return (
          <div key={`line-${lIdx}`} style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginBottom: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', marginTop: '-2px' }}>{isOrdered ? '•' : '■'}</span>
            <div style={{ flex: 1 }}>{inlineContent}</div>
          </div>
        );
      }

      return <div key={`line-${lIdx}`}>{inlineContent}</div>;
    });
  });
};

const CategoryPresentation = ({ category, onClose, onNavigate }) => {
  // Folosim datele specifice categoriei, sau Arrays ca fallback pentru demo
  const data = mockCategoryData[category] || mockCategoryData["Arrays"];
  
  const subcategories = Object.keys(mockCategoryData).filter(key => 
    key.startsWith(category + '/') && key.split('/').length === category.split('/').length + 1
  );
  const isTransition = subcategories.length > 0;
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const activeLineRef = useRef(null);

  const codeLines = data.code.split('\n');

  const handlePrev = () => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStepIndex(prev => Math.min(data.explanations.length - 1, prev + 1));
  };

  const currentExplanation = data.explanations[currentStepIndex];
  const activeLine = currentExplanation ? currentExplanation.line : null;

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLine]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(3, 5, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '1400px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '40px',
        position: 'relative',
        animation: 'zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 0 20px rgba(99, 102, 241, 0.1)'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
          onMouseOver={e => { e.target.style.background = 'rgba(239, 68, 68, 0.2)'; e.target.style.color = '#ef4444'; e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)'; }}
          onMouseOut={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = 'white'; e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'; }}
        >✕</button>

        <h1 className="text-gradient" style={{ marginBottom: '32px', fontSize: '32px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
          {category.replace(/_/g, ' ').replace(/\//g, ' / ')}
        </h1>
        
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📖</span> 1. Prezentare & Explicație
          </h2>
          <div className="glass-card" style={{ padding: '24px', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '15px', color: 'var(--text-secondary)' }}>
            {formatText(data.presentation)}
          </div>
        </section>

        {data.complexity && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚡</span> 2. Complexitate și Performanță
            </h2>
            <div className="glass-card" style={{ borderLeft: '4px solid var(--warning-color)', padding: '24px', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '15px', color: 'var(--text-secondary)' }}>
              {formatText(data.complexity)}
            </div>
          </section>
        )}

        {data.variations && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔄</span> 3. Variații și Edge Cases
            </h2>
            <div className="glass-card" style={{ borderLeft: '4px solid var(--danger-color)', padding: '24px', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '15px', color: 'var(--text-secondary)' }}>
              {formatText(data.variations)}
            </div>
          </section>
        )}

        {data.applications && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚀</span> {data.complexity ? '4' : '3'}. Aplicații și Alte Exemple
            </h2>
            <div className="glass-card" style={{ borderLeft: '4px solid var(--success-color)', padding: '24px', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '15px', color: 'var(--text-secondary)' }}>
              {formatText(data.applications)}
            </div>
          </section>
        )}

        {isTransition && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔀</span> {data.applications ? (data.complexity ? '5' : '4') : (data.complexity ? '4' : '2')}. Subcapitole / Algoritmi
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {subcategories.map(subcat => {
                const subcatName = subcat.split('/').pop().replace(/_/g, ' ');
                return (
                  <div 
                    key={subcat}
                    onClick={() => onNavigate(subcat)}
                    className="glass-card glow-on-hover"
                    style={{ 
                      padding: '24px', 
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.02))',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.2)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'; }}
                  >
                    <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '18px' }}>{subcatName}</h3>
                    <div style={{ color: 'var(--accent-secondary)', fontSize: '14px', fontWeight: 'bold' }}>Explorează →</div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {data.code && data.code.trim() !== "" && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💻</span> {isTransition ? (data.applications ? (data.complexity ? '6' : '5') : (data.complexity ? '5' : '3')) : (data.applications ? (data.complexity ? '5' : '4') : (data.complexity ? '4' : '2'))}. Cod C++ & Explicații
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px' }}>
            Folosește săgețile pentru a naviga prin execuția codului pas cu pas.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            
            {/* Code Block */}
            <div style={{ flex: 1, minWidth: 0, overflowX: 'auto', background: 'linear-gradient(145deg, #1e1e2e, #11111b)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px 0', fontFamily: 'var(--font-mono)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.4)' }}>
              {codeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isActive = activeLine === lineNum;
                
                return (
                  <div 
                    key={idx}
                    ref={isActive ? activeLineRef : null}
                    style={{
                      display: 'flex',
                      padding: '4px 16px',
                      background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ width: '40px', color: 'rgba(255, 255, 255, 0.3)', userSelect: 'none', textAlign: 'right', paddingRight: '12px' }}>{lineNum}</span>
                    <span style={{ color: '#c9d1d9', whiteSpace: 'pre' }}>{line}</span>
                  </div>
                )
              })}
            </div>

            {/* Explanation Panel */}
            <div style={{ width: '600px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px', zIndex: 10 }}>
              {/* Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '12px' }}>
                <button 
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', 
                    padding: '8px 16px', borderRadius: '8px', cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentStepIndex === 0 ? 0.5 : 1, transition: 'all 0.2s ease', fontWeight: 600
                  }}
                  onMouseOver={e => { if(currentStepIndex !== 0) e.target.style.background = 'rgba(255,255,255,0.1)' }}
                  onMouseOut={e => { e.target.style.background = 'rgba(255,255,255,0.05)' }}
                >
                  ← Precedent
                </button>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
                  Pas {currentStepIndex + 1} / {data.explanations.length}
                </span>
                <button 
                  onClick={handleNext}
                  disabled={currentStepIndex === data.explanations.length - 1}
                  className="btn-primary"
                  style={{
                    padding: '8px 16px', borderRadius: '8px', cursor: currentStepIndex === data.explanations.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentStepIndex === data.explanations.length - 1 ? 0.5 : 1
                  }}
                >
                  Următor →
                </button>
              </div>

              {/* Explicație curentă */}
              <div className="glass-card" style={{ 
                background: 'rgba(99, 102, 241, 0.08)', 
                border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '24px', 
                borderRadius: '16px',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--accent-secondary)' }}>
                  Explicație Linia {activeLine}
                </h3>
                <div style={{ color: '#fff', margin: 0, fontSize: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {formatText(currentExplanation?.text)}
                </div>
              </div>

              {/* Fereastră vizuală pentru Graf/Matrice/Blocuri */}
              {(category === 'Data_Structures/RMQ' || category.startsWith('Alg/Divide_Conquer') || category.startsWith('Graphs/') || currentExplanation?.matrix || currentExplanation?.blocksVisual || currentExplanation?.graphVisual) && (
                <div style={{ 
                  flex: 1,
                  minHeight: '150px',
                  background: 'linear-gradient(145deg, rgba(10, 15, 25, 0.8), rgba(5, 10, 15, 0.9))', 
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)',
                  padding: '20px', 
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {currentExplanation?.matrix && (
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                      <table style={{ borderCollapse: 'collapse', width: '100%', color: 'white', fontSize: '13px', textAlign: 'center' }}>
                        <thead>
                          <tr>
                            {currentExplanation.matrix.headers.map((h, i) => (
                              <th key={i} style={{ borderBottom: '1px solid rgba(163, 255, 245, 0.2)', padding: '6px', color: '#c4b5fd' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentExplanation.matrix.data.map((row, r) => (
                            <tr key={r}>
                              {row.map((cell, c) => {
                                const isActive = currentExplanation.matrix.activeCells?.some(ac => ac.r === r && ac.c === c);
                                const isHighlight = currentExplanation.matrix.highlightCells?.some(hc => hc.r === r && hc.c === c);
                                const bg = isActive ? 'rgba(74, 222, 128, 0.2)' : (isHighlight ? 'rgba(234, 179, 8, 0.2)' : 'transparent');
                                const borderRight = c === 0 ? '1px solid rgba(163, 255, 245, 0.2)' : '1px solid rgba(163, 255, 245, 0.05)';
                                return (
                                  <td key={c} style={{ padding: '6px', borderRight, borderBottom: '1px solid rgba(163, 255, 245, 0.05)', background: bg, fontWeight: isActive || isHighlight ? 'bold' : 'normal', color: isActive ? '#4ade80' : (isHighlight ? '#facc15' : '#fff') }}>
                                    {cell}
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '32px', width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    {currentExplanation?.blocksVisual && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', paddingTop: '10px', flex: 1, minWidth: '200px' }}>
                        {currentExplanation.blocksVisual.map((row, rIdx) => (
                          <div key={rIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
                            {row.label && <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 'bold' }}>{row.label}</span>}
                            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                              {row.groups.map((group, gIdx) => (
                                <div key={gIdx} style={{ display: 'flex', gap: '8px', background: 'rgba(163, 255, 245, 0.05)', padding: '10px', borderRadius: '12px', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
                                  {group.map((block, bIdx) => (
                                    <div key={bIdx} style={{
                                      minWidth: '44px', padding: '0 12px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      background: block.active ? '#7cb4c8' : (block.sorted ? '#4ade80' : 'rgba(0,0,0,0.6)'),
                                      border: `2px solid ${block.active ? '#c4b5fd' : (block.sorted ? '#86efac' : '#475569')}`,
                                      borderRadius: '8px', color: block.active || block.sorted ? '#000' : '#fff', fontWeight: 'bold', fontSize: '15px',
                                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                      opacity: block.hidden ? 0.2 : 1,
                                      transform: block.active ? 'scale(1.1)' : 'scale(1)',
                                      boxShadow: block.active ? '0 0 15px rgba(95, 102, 112, 0.8)' : (block.sorted ? '0 0 10px rgba(74, 222, 128, 0.5)' : 'none'),
                                      whiteSpace: 'nowrap'
                                    }}>
                                      {block.val}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {currentExplanation?.graphVisual && (
                      <div style={{ position: 'relative', width: '280px', height: '220px', flexShrink: 0 }}>
                        <svg width="280" height="220" style={{ position: 'absolute', top: 0, left: 0 }}>
                          {currentExplanation.graphVisual.edges.map((edge, i) => {
                            const n1 = currentExplanation.graphVisual.nodes.find(n => n.id === edge.source);
                            const n2 = currentExplanation.graphVisual.nodes.find(n => n.id === edge.target);
                            return <line key={i} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="rgba(163, 255, 245, 0.2)" strokeWidth="3" />
                          })}
                        </svg>
                        {currentExplanation.graphVisual.nodes.map(node => {
                          let bg = 'rgba(0,0,0,0.6)';
                          let border = '#475569';
                          let color = '#fff';
                          if (node.state === 'active') { bg = '#7cb4c8'; border = '#c4b5fd'; color = '#000'; }
                          else if (node.state === 'visited') { bg = '#4ade80'; border = '#86efac'; color = '#000'; }
                          
                          return (
                            <div key={node.id} style={{
                              position: 'absolute', left: node.x - 20, top: node.y - 20, width: '40px', height: '40px',
                              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: bg, border: `2px solid ${border}`, color: color, fontWeight: 'bold', fontSize: '16px',
                              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2,
                              boxShadow: node.state === 'active' ? '0 0 15px rgba(95, 102, 112, 0.8)' : (node.state === 'visited' ? '0 0 10px rgba(74, 222, 128, 0.5)' : 'none'),
                              transform: node.state === 'active' ? 'scale(1.15)' : 'scale(1)'
                            }}>
                              {node.label}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {currentExplanation?.visual && (
                    <div style={{ fontSize: '13px', fontFamily: 'monospace', color: '#4ade80', whiteSpace: 'pre-wrap', width: '100%' }}>
                      {formatText(currentExplanation.visual)}
                    </div>
                  )}

                  {!currentExplanation?.matrix && !currentExplanation?.blocksVisual && !currentExplanation?.graphVisual && !currentExplanation?.visual && (
                    <>
                      <span style={{ fontSize: '24px' }}>🖼️</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center' }}>
                        (Vizualizare nedisponibilă pentru acest pas)
                      </span>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        </section>
        )}

        {data.problems && (data.problems.easy?.length > 0 || data.problems.medium?.length > 0 || data.problems.hard?.length > 0) && (
        <section>
          <h2 style={{ color: 'var(--accent-primary)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎯</span> {isTransition ? (data.code && data.code.trim() !== "" ? (data.applications ? (data.complexity ? '7' : '6') : (data.complexity ? '6' : '4')) : (data.applications ? (data.complexity ? '6' : '5') : (data.complexity ? '5' : '3'))) : (data.code && data.code.trim() !== "" ? (data.applications ? (data.complexity ? '6' : '5') : (data.complexity ? '5' : '3')) : (data.applications ? (data.complexity ? '5' : '4') : (data.complexity ? '4' : '2')))}. Probleme Recomandate
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            
            <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'var(--success-color)', margin: '0 0 16px 0', fontSize: '16px' }}>🟢 Ușor (Mic)</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.problems.easy.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e => e.target.style.color='var(--success-color)'} onMouseOut={e => e.target.style.color='#fff'}>{p.title}</a>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '8px', fontSize: '13px' }}>- {formatText(p.desc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'var(--warning-color)', margin: '0 0 16px 0', fontSize: '16px' }}>🟡 Mediu</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.problems.medium.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e => e.target.style.color='var(--warning-color)'} onMouseOut={e => e.target.style.color='#fff'}>{p.title}</a>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '8px', fontSize: '13px' }}>- {formatText(p.desc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: 'var(--danger-color)', margin: '0 0 16px 0', fontSize: '16px' }}>🔴 Dificil (Mare)</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.problems.hard.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e => e.target.style.color='var(--danger-color)'} onMouseOut={e => e.target.style.color='#fff'}>{p.title}</a>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '8px', fontSize: '13px' }}>- {formatText(p.desc)}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>
        )}

      </div>
    </div>
  );
};

export default CategoryPresentation;