import React, { useState } from 'react';

import Editor from '@monaco-editor/react';

const mockTraceData = [
  { line: 1, segment: "int main() {", explanation: "Program entry point", state: {} },
  { line: 2, segment: "int a = 5;", explanation: "Initialize variable a to 5", state: { a: 5 } },
  { line: 3, segment: "int b = 10;", explanation: "Initialize variable b to 10", state: { a: 5, b: 10 } },
  { line: 4, segment: "int c = a + b;", explanation: "Compute sum of a and b", state: { a: 5, b: 10, c: 15 } },
  { line: 5, segment: "return 0;", explanation: "Return successful exit code", state: { a: 5, b: 10, c: 15 } }
];

const PRACTICE_PROBLEMS = {
  "Divide and Conquer": [
    { title: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
    { title: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/" }
  ],
  "Graphs": [
    { title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
    { title: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/" }
  ],
  "Dynamic Programming": [
    { title: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
    { title: "Longest Increasing Subsequence", url: "https://leetcode.com/problems/longest-increasing-subsequence/" }
  ],
  "Trees": [
    { title: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
    { title: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/" }
  ],
  "Trie": [
    { title: "Implement Trie (Prefix Tree)", url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
    { title: "Design Add and Search Words Data Structure", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" }
  ],
  "KMP": [
    { title: "Find the Index of the First Occurrence in a String", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" }
  ]
};

function CodeDemonstrator() {
  const [code, setCode] = useState("int main() {\n  int a = 5;\n  int b = 10;\n  int c = a + b;\n  return 0;\n}");
  const [topic, setTopic] = useState("");
  const [trace, setTrace] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleExecute = () => {
    fetch('http://localhost:3000/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, topic })
    })
    .then(res => {
      if (!res.ok) throw new Error("API not available, using fallback");
      return res.json();
    })
    .then(data => {
      if (data.trace && data.trace.length > 0) {
        setTrace(data.trace);
        setCurrentStep(0);
      } else {
        throw new Error("No trace returned, using fallback");
      }
    })
    .catch(err => {
      console.warn("Fallback to mock trace:", err);
      setTrace(mockTraceData);
      setCurrentStep(0);
    });
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(trace.length - 1, prev + 1));
  };

  const codeLines = code.split('\n');
  const currentLine = trace.length > 0 ? trace[currentStep].line : -1;

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
      <h2>Code Demonstrator</h2>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }}>
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: 'var(--font-mono)',
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                formatOnPaste: true,
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              style={{ 
                flex: 1, 
                background: 'rgba(255, 255, 255, 0.05)', 
                color: '#e2e8f0', 
                border: '1px solid var(--glass-border)', 
                borderRadius: '8px', 
                padding: '10px 16px',
                fontSize: '15px'
              }}
            >
              <option value="" style={{background: 'var(--bg-secondary)'}}>Select a Topic (optional)</option>
              {Object.keys(PRACTICE_PROBLEMS).map(t => (
                <option key={t} value={t} style={{background: 'var(--bg-secondary)'}}>{t}</option>
              ))}
            </select>
            <button 
              onClick={handleExecute}
              className="btn-primary"
            >
              Run Code
            </button>
          </div>
        </div>
      </div>

      {topic && PRACTICE_PROBLEMS[topic] && (
        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--success-color)' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: 'var(--success-color)' }}>Practice Problems: {topic}</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PRACTICE_PROBLEMS[topic].map((prob, idx) => (
              <li key={idx}>
                <a href={prob.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='var(--success-color)'} onMouseOut={e=>e.target.style.color='#fff'}>
                  {prob.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {trace.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                border: '1px solid var(--glass-border)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStep === 0 ? 0.5 : 1,
                fontWeight: 600, transition: 'all 0.2s'
              }}
              onMouseOver={e => { if(currentStep !== 0) e.target.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseOut={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)' }}
            >
              Prev
            </button>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              Step {currentStep + 1} of {trace.length}
            </span>
            <button 
              onClick={handleNext} 
              disabled={currentStep === trace.length - 1}
              className="btn-primary"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: currentStep === trace.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentStep === trace.length - 1 ? 0.5 : 1
              }}
            >
              Next
            </button>
          </div>
          
          <input 
            type="range" 
            min={0} 
            max={trace.length - 1} 
            value={currentStep} 
            onChange={(e) => setCurrentStep(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px', background: '#0d1117', padding: '20px 0', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', overflowX: 'auto', fontSize: '15px', lineHeight: '1.5' }}>
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isCurrent = lineNum === currentLine;
                return (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    background: isCurrent ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    borderLeft: isCurrent ? '3px solid var(--accent-primary)' : '3px solid transparent',
                    padding: '4px 16px',
                    transition: 'all 0.2s ease'
                  }}>
                    <span style={{ width: '40px', color: 'rgba(255, 255, 255, 0.3)', textAlign: 'right', paddingRight: '12px', userSelect: 'none' }}>
                      {lineNum}
                    </span>
                    <span style={{ color: '#c9d1d9', whiteSpace: 'pre' }}>{lineText}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.05)' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: 'var(--accent-secondary)' }}>Explanation</h3>
                <p style={{ margin: 0, color: '#fff', lineHeight: '1.6', fontSize: '15px' }}>{trace[currentStep].explanation}</p>
              </div>

              <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.05)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--success-color)' }}>State</h3>
                {Object.keys(trace[currentStep].state || {}).length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                        <th style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>Variable</th>
                        <th style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(trace[currentStep].state).map(([key, val]) => (
                        <tr key={key} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-secondary)' }}>{key}</td>
                          <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', color: '#fff' }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontStyle: 'italic' }}>No variables in state</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeDemonstrator;
