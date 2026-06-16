import React, { useState, useEffect } from 'react';
import SyllabusTree from './components/SyllabusTree';
import Recommendations from './components/Recommendations';
import HistoryList from './components/HistoryList';
import CategoryPresentation from './components/CategoryPresentation';

import './index.css';

function App() {
  const [progress, setProgress] = useState(null);
  const [view, setView] = useState('syllabus'); // 'syllabus' or 'dashboard'
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/get_progress')
      .then(res => res.json())
      .then(data => setProgress(data))
      .catch(err => console.error("Error fetching progress:", err));
  }, []);

  let totalXp = 0;
  if (progress && progress.user_xp) {
    totalXp = Object.values(progress.user_xp).reduce((a, b) => a + b, 0);
  }

  const level = Math.floor(totalXp / 100) + 1;
  const currentLevelXp = totalXp % 100;
  const nextLevelXp = 100;
  const progressPercent = (currentLevelXp / nextLevelXp) * 100;

  if (view === 'syllabus') {
    return (
      <div style={{ width: '100vw', height: '100vh', padding: '16px', boxSizing: 'border-box', position: 'relative' }}>
        <button 
          onClick={() => setView('dashboard')}
          style={{
            position: 'absolute', top: '40px', left: '40px', zIndex: 1000,
            padding: '14px 28px', borderRadius: '16px', 
            background: 'linear-gradient(145deg, rgba(10, 14, 23, 0.9), rgba(15, 20, 30, 0.85))',
            border: '1px solid rgba(255,255,255,0.15)', borderTop: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', fontWeight: 700, fontSize: '15px',
            backdropFilter: 'blur(32px)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
            transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="glow-on-hover"
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(99, 102, 241, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)';
            e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          }}
        >
          <span style={{color: 'var(--accent-primary)', fontSize: '20px', textShadow: '0 0 10px var(--accent-primary)'}}>◷</span> Dashboard & Istoric
        </button>

        <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden' }}>
          <SyllabusTree 
            userXp={progress ? progress.user_xp : {}} 
            onNodeClick={(cat) => setSelectedCategory(cat)}
          />
        </div>

        {selectedCategory && (
          <CategoryPresentation 
            category={selectedCategory} 
            onClose={() => setSelectedCategory(null)} 
            onNavigate={(cat) => setSelectedCategory(cat)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar for Navigation / User Info */}
      <aside className="sidebar glass-panel">
        <div className="header">
          <h1 className="header-title text-gradient-accent">Olympic AI Coach</h1>
        </div>
        <div style={{ padding: '0 32px 32px' }}>
          <div className="glass-card" style={{ marginBottom: '32px', padding: '28px', position: 'relative' }}>
            {/* Ambient Glow */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}>
                  🧑‍💻
                </div>
                <h3 className="text-gradient-accent" style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', margin: 0, fontWeight: 800 }}>
                  Algorithmist
                </h3>
              </div>
              <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.4)', boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)' }}>
                Lvl {level}
              </span>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.6)', height: '14px', borderRadius: '8px', overflow: 'hidden', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)', position: 'relative' }}>
              <div style={{ 
                width: `${progressPercent}%`, 
                background: 'linear-gradient(90deg, #4f46e5, #ec4899, #8b5cf6)', 
                backgroundSize: '200% 100%',
                height: '100%', 
                borderRadius: '8px',
                transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
                animation: 'gradientFlow 3s ease infinite'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', transform: 'skewX(-20deg) translateX(-150%)', animation: 'shimmer 2s infinite' }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, fontWeight: 600, letterSpacing: '0.5px' }}>TOTAL XP: <span style={{color: 'var(--text-secondary)'}}>{totalXp}</span></p>
              <p style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary)', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {currentLevelXp} <span style={{ color: 'var(--text-muted)' }}>/ {nextLevelXp} XP</span>
              </p>
            </div>
          </div>
          
          <Recommendations />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 32px' }}>
          <h2 style={{ fontSize: '32px', letterSpacing: '-0.5px' }}>Dashboard</h2>
          <button 
            onClick={() => setView('syllabus')}
            className="btn-primary glow-on-hover"
            style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '14px 30px', fontSize: '16px', borderRadius: '16px', letterSpacing: '0.5px' }}
          >
            <span style={{ fontSize: '22px' }}>⎈</span> Înapoi la Syllabus
          </button>
        </div>

        {/* Top bar for History */}
        <section className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{color: 'var(--accent-secondary)'}}>◷</span> Istoric Recent
          </h2>
          <HistoryList />
        </section>

      </main>
    </div>
  );
}

export default App;
