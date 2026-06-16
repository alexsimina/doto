import { useState, useEffect } from 'react';

const HistoryList = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/get_progress')
      .then(res => res.json())
      .then(data => {
        if (data.history) {
          setHistory(data.history);
        }
      })
      .catch(err => console.error("Error fetching history:", err));
  }, []);

  if (history.length === 0) {
    return <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Nu există istoric recent.</p>;
  }

  return (
    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
      {history.map((item, idx) => {
        const isAccepted = item.evaluation?.isOptimal || item.evaluation?.qualityScore >= 80;
        const verdict = isAccepted ? 'Accepted' : 'Sub-optimal';
        const title = item.problemId !== 'unknown' ? item.problemId : (item.evaluation?.topic || 'Problem');
        const badges = [item.evaluation?.topic, item.evaluation?.complexity].filter(Boolean);

        return (
        <div key={idx} className="glass-card" style={{ minWidth: '240px', flexShrink: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px', lineHeight: '1.2' }}>{title}</h4>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: '700',
              padding: '4px 8px', 
              borderRadius: '8px', 
              background: isAccepted ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 51, 102, 0.15)',
              color: isAccepted ? 'var(--success-color)' : 'var(--danger-color)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {verdict}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {badges.map((badge, bIdx) => (
              <span key={bIdx} className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      )})}
    </div>
  );
};

export default HistoryList;
