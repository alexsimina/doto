import React, { useState, useEffect } from 'react';

const Recommendations = () => {
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/get_recommendation')
      .then(res => res.json())
      .then(data => setRecommendation(data))
      .catch(err => console.error("Error fetching recommendation:", err));
  }, []);

  return (
    <div className="recommendations-container" style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <h3 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>Ce învățăm azi?</h3>
        <span role="img" aria-label="sparkles">✨</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recommendation ? (
          <div className="glass-card" style={{ padding: '20px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: recommendation.type === 'OPTIMIZATION' ? 'var(--warning-color)' : 'var(--accent-primary)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '15px', margin: 0, paddingRight: '8px' }}>{recommendation.recommendedTopic}</h4>
              <span className="badge" style={{ background: recommendation.type === 'OPTIMIZATION' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)', color: recommendation.type === 'OPTIMIZATION' ? 'var(--warning-color)' : 'var(--accent-secondary)' }}>
                {recommendation.type === 'OPTIMIZATION' ? 'Optimizare' : 'Concept'}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>{recommendation.message}</p>
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0, animation: 'pulse 2s infinite' }}>Se încarcă recomandările...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
