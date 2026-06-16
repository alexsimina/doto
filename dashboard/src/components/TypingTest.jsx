import React, { useState, useEffect, useRef } from 'react';
import { generateWords } from '../data/words';
import '../index.css';

export default function TypingTest() {
  const [globalStats, setGlobalStats] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle', 'typing', 'finished'
  const [mode, setMode] = useState('words'); // 'words' or 'time'
  const [wordCount, setWordCount] = useState(20);
  const [timeLimit, setTimeLimit] = useState(60);
  const [dictionary, setDictionary] = useState('roEn'); // 'roEn' or 'cpp'

  const [textToType, setTextToType] = useState('');
  const [userInput, setUserInput] = useState('');
  
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  
  // Track letter performance in current session
  const [sessionStats, setSessionStats] = useState({});
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Fetch initial stats
  useEffect(() => {
    fetch('http://localhost:3000/get_typing_stats')
      .then(res => res.json())
      .then(data => {
        if (data.typing_stats) {
          setGlobalStats(data.typing_stats);
        }
      })
      .catch(err => console.error("Error fetching typing stats:", err));
  }, []);

  const initTest = () => {
    const words = generateWords(mode === 'words' ? wordCount : 100, globalStats, dictionary);
    setTextToType(words.join(' '));
    setUserInput('');
    setStatus('idle');
    setSessionStats({});
    setStartTime(null);
    setEndTime(null);
    setTimeLeft(timeLimit);
    setWpm(0);
    setAccuracy(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (inputRef.current) inputRef.current.focus();
  };

  // Initialize on mount and when mode/settings change
  useEffect(() => {
    initTest();
  }, [mode, wordCount, timeLimit, dictionary, globalStats]);

  useEffect(() => {
    if (status === 'typing' && mode === 'time') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, mode]);

  const endTest = () => {
    setStatus('finished');
    setEndTime(Date.now());
    if (timerRef.current) clearInterval(timerRef.current);

    const timeTaken = mode === 'time' ? (timeLimit - timeLeft) : ((Date.now() - startTime) / 1000);
    const timeInMins = timeTaken / 60 || 1;
    
    // WPM = (characters typed / 5) / time in minutes
    const charsTyped = userInput.length;
    const calcWpm = Math.round((charsTyped / 5) / timeInMins);
    
    // Accuracy
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === textToType[i]) correctChars++;
    }
    const calcAcc = charsTyped > 0 ? Math.round((correctChars / charsTyped) * 100) : 0;
    
    setWpm(calcWpm);
    setAccuracy(calcAcc);

    // Compute Word-level Stats
    const textWords = textToType.split(' ');
    const userWords = userInput.trim().split(' ');
    
    const wordStats = {};
    for (let i = 0; i < userWords.length; i++) {
      const targetWord = textWords[i];
      const typedWord = userWords[i];
      if (!targetWord) break;
      
      if (!wordStats[targetWord]) wordStats[targetWord] = { typed: 0, errors: 0 };
      
      wordStats[targetWord].typed += 1;
      if (typedWord !== targetWord) {
        wordStats[targetWord].errors += 1;
      }
    }

    // Send to backend
    fetch('http://localhost:3000/update_typing_stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        letterStats: sessionStats,
        wordStats: wordStats,
        wpm: calcWpm,
        accuracy: calcAcc
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.typing_stats) {
        setGlobalStats(data.typing_stats);
      }
    })
    .catch(err => console.error("Error updating stats", err));
  };

  const handleChange = (e) => {
    if (status === 'finished') return;
    
    const val = e.target.value;
    
    if (status === 'idle') {
      setStatus('typing');
      setStartTime(Date.now());
    }

    // Determine what was typed
    if (val.length > userInput.length) {
      const typedChar = val[val.length - 1];
      const targetChar = textToType[val.length - 1];
      
      const charKey = targetChar?.toLowerCase();
      if (charKey && /[a-z]/.test(charKey)) {
        setSessionStats(prev => {
          const charStats = prev[charKey] || { typed: 0, errors: 0 };
          return {
            ...prev,
            [charKey]: {
              typed: charStats.typed + 1,
              errors: charStats.errors + (typedChar === targetChar ? 0 : 1)
            }
          };
        });
      }
    }

    setUserInput(val);

    if (mode === 'words' && val.length >= textToType.length) {
      endTest();
    }
  };

  const renderText = () => {
    return textToType.split('').map((char, index) => {
      let color = 'var(--text-muted)';
      if (index < userInput.length) {
        color = userInput[index] === char ? '#10b981' : '#ef4444'; // green or red
      }
      
      // highlight current character
      const isCurrent = index === userInput.length && status !== 'finished';
      
      return (
        <span 
          key={index} 
          style={{
            color,
            backgroundColor: isCurrent ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
            borderBottom: isCurrent ? '2px solid var(--accent-primary)' : 'none',
            transition: 'background-color 0.1s'
          }}
        >
          {char}
        </span>
      );
    });
  };

  // Helper to show all letters
  const getAllLettersStats = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const statsArr = alphabet.map(letter => {
      const stats = globalStats[letter];
      if (stats && stats.typed > 0) {
        return {
          letter,
          rate: Math.round((stats.errors / stats.typed) * 100),
          typed: stats.typed
        };
      }
      return { letter, rate: 0, typed: 0 };
    });
    // Sort alphabetically
    return statsArr;
  };

  const lastRun = globalStats.lastRun || { wpm: 0, accuracy: 0 };

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
          <span style={{color: 'var(--accent-primary)'}}>⌨️</span> Typing Test
        </h2>
        
        {/* Settings */}
        <div style={{ display: 'flex', gap: '16px', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '12px' }}>
          
          <select 
            value={dictionary} 
            onChange={e => setDictionary(e.target.value)}
            style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '14px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '12px' }}
          >
            <option value="roEn" style={{color: '#000'}}>Engleză + Română</option>
            <option value="cpp" style={{color: '#000'}}>Programare (C++)</option>
          </select>

          <select 
            value={mode} 
            onChange={e => setMode(e.target.value)}
            style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '14px' }}
          >
            <option value="words" style={{color: '#000'}}>Words</option>
            <option value="time" style={{color: '#000'}}>Time</option>
          </select>
          
          {mode === 'words' && (
            <select 
              value={wordCount} 
              onChange={e => setWordCount(parseInt(e.target.value))}
              style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              <option value="10" style={{color: '#000'}}>10 Words</option>
              <option value="20" style={{color: '#000'}}>20 Words</option>
              <option value="50" style={{color: '#000'}}>50 Words</option>
            </select>
          )}
          
          {mode === 'time' && (
            <select 
              value={timeLimit} 
              onChange={e => setTimeLimit(parseInt(e.target.value))}
              style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '14px' }}
            >
              <option value="15" style={{color: '#000'}}>15s</option>
              <option value="30" style={{color: '#000'}}>30s</option>
              <option value="60" style={{color: '#000'}}>60s</option>
            </select>
          )}
          
          <button onClick={initTest} style={{ background: 'var(--accent-primary)', border: 'none', borderRadius: '6px', color: '#fff', padding: '4px 12px', cursor: 'pointer' }}>
            Restart
          </button>
        </div>
      </div>

      {status !== 'finished' ? (
        <div style={{ position: 'relative' }}>
          {mode === 'time' && (
            <div style={{ fontSize: '20px', color: 'var(--accent-primary)', fontWeight: 'bold', marginBottom: '16px' }}>
              {timeLeft}s
            </div>
          )}
          <div 
            style={{ 
              fontSize: '24px', 
              fontFamily: 'monospace', 
              lineHeight: '1.6', 
              minHeight: '150px',
              padding: '24px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '16px',
              cursor: 'text',
              userSelect: 'none'
            }}
            onClick={() => inputRef.current && inputRef.current.focus()}
          >
            {renderText()}
          </div>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleChange}
            onBlur={() => inputRef.current && inputRef.current.focus()} // Keep focus
            style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0 }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '32px', marginBottom: '8px' }}>Test Finished</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', margin: '32px 0' }}>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>WPM</div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{wpm}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Accuracy</div>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981' }}>{accuracy}%</div>
            </div>
          </div>
          <button 
            onClick={initTest} 
            className="btn-primary glow-on-hover"
            style={{ padding: '12px 32px', fontSize: '16px', borderRadius: '12px' }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Stats Area */}
      <div style={{ marginTop: '40px', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '16px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '18px', margin: 0 }}>Letter Statistics</h3>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Run WPM</span>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{lastRun.wpm}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Last Run Acc</span>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{lastRun.accuracy}%</div>
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', 
          gap: '12px' 
        }}>
          {getAllLettersStats().map((stat, i) => {
            // Color mapping based on error rate
            let bgColor = 'rgba(255, 255, 255, 0.05)';
            let borderColor = 'rgba(255, 255, 255, 0.1)';
            let textColor = 'var(--text-primary)';
            let rateColor = 'var(--text-muted)';
            
            if (stat.typed > 0) {
              if (stat.rate > 10) {
                bgColor = 'rgba(239, 68, 68, 0.15)'; // Red for high error
                borderColor = 'rgba(239, 68, 68, 0.4)';
                rateColor = '#ef4444';
              } else if (stat.rate > 0) {
                bgColor = 'rgba(245, 158, 11, 0.15)'; // Orange for some errors
                borderColor = 'rgba(245, 158, 11, 0.4)';
                rateColor = '#f59e0b';
              } else {
                bgColor = 'rgba(16, 185, 129, 0.15)'; // Green for perfect
                borderColor = 'rgba(16, 185, 129, 0.4)';
                rateColor = '#10b981';
              }
            }

            return (
              <div key={i} style={{ 
                background: bgColor, 
                border: `1px solid ${borderColor}`,
                padding: '8px', 
                borderRadius: '8px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase', color: textColor, marginBottom: '2px' }}>{stat.letter}</div>
                <div style={{ fontSize: '11px', color: rateColor, fontWeight: 'bold' }}>
                  {stat.typed > 0 ? `${stat.rate}%` : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
