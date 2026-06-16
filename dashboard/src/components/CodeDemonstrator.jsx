import React, { useState } from 'react';

// HTML escaping helper
const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// C++ syntax highlighter
const highlightCpp = (code) => {
  if (!code) return '';

  const keywords = new Set([
    'struct', 'class', 'public', 'private', 'protected', 'template', 'typename', 'using', 'namespace',
    'const', 'constexpr', 'static', 'inline', 'operator', 'new', 'delete', 'typedef', 'friend', 'virtual', 'override'
  ]);

  const controlKeywords = new Set([
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch', 'throw'
  ]);

  const dataTypes = new Set([
    'int', 'long', 'double', 'float', 'char', 'bool', 'void', 'auto', 'size_t', 'short', 'unsigned', 'signed'
  ]);

  const stdTypes = new Set([
    'vector', 'string', 'pair', 'set', 'map', 'unordered_map', 'unordered_set', 
    'queue', 'stack', 'priority_queue', 'deque', 'list', 'multiset', 'multimap',
    'iostream', 'cin', 'cout', 'endl', 'std', 'min', 'max', 'swap', 'sort'
  ]);

  let i = 0;
  let result = [];
  
  while (i < code.length) {
    // 1. Comments
    if (code.startsWith('//', i)) {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      result.push(`<span style="color: #7a7e85; font-style: italic;">${escapeHtml(code.substring(i, end))}</span>`);
      i = end;
      continue;
    }
    if (code.startsWith('/*', i)) {
      let end = code.indexOf('*/', i);
      if (end === -1) {
        result.push(`<span style="color: #7a7e85; font-style: italic;">${escapeHtml(code.substring(i))}</span>`);
        i = code.length;
      } else {
        result.push(`<span style="color: #7a7e85; font-style: italic;">${escapeHtml(code.substring(i, end + 2))}</span>`);
        i = end + 2;
      }
      continue;
    }
    
    // 2. Preprocessor directives
    if (code[i] === '#') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = code.length;
      const line = code.substring(i, end);
      const matchInclude = line.match(/^#\s*include\s*(<[^>]+>|"[^"]+")/);
      if (matchInclude) {
        const fullMatch = matchInclude[0];
        const header = matchInclude[1];
        const prefix = fullMatch.substring(0, fullMatch.indexOf(header));
        result.push(`<span style="color: #b378ba;">${escapeHtml(prefix)}</span><span style="color: #6aab73;">${escapeHtml(header)}</span>`);
        i += fullMatch.length;
      } else {
        result.push(`<span style="color: #b378ba;">${escapeHtml(line)}</span>`);
        i = end;
      }
      continue;
    }

    // 3. Strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let j = i + 1;
      let escaped = false;
      while (j < code.length) {
        if (escaped) {
          escaped = false;
        } else if (code[j] === '\\') {
          escaped = true;
        } else if (code[j] === quote) {
          break;
        }
        j++;
      }
      const end = Math.min(j + 1, code.length);
      result.push(`<span style="color: #6aab73;">${escapeHtml(code.substring(i, end))}</span>`);
      i = end;
      continue;
    }

    // 4. Numbers
    const numMatch = code.substring(i).match(/^\b\d+(\.\d+)?([eE][+-]?\d+)?\b/);
    if (numMatch) {
      result.push(`<span style="color: #2ebfc6;">${escapeHtml(numMatch[0])}</span>`);
      i += numMatch[0].length;
      continue;
    }

    // 5. Identifiers, functions, keywords
    const idMatch = code.substring(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    if (idMatch) {
      const id = idMatch[0];
      let style = '';
      
      let nextIdx = i + id.length;
      while (nextIdx < code.length && (code[nextIdx] === ' ' || code[nextIdx] === '\t')) {
        nextIdx++;
      }
      const isFunc = nextIdx < code.length && code[nextIdx] === '(';

      if (controlKeywords.has(id)) {
        style = 'color: #cf8e6d; font-weight: bold;';
      } else if (keywords.has(id)) {
        style = 'color: #cc7832; font-weight: bold;';
      } else if (dataTypes.has(id)) {
        style = 'color: #cc7832;';
      } else if (stdTypes.has(id)) {
        style = 'color: #56a8f5;';
      } else if (isFunc) {
        style = 'color: #57b6c2;';
      } else {
        style = 'color: #a9b7c6;';
      }
      
      result.push(`<span style="${style}">${escapeHtml(id)}</span>`);
      i += id.length;
      continue;
    }

    // 6. Operators and Punctuation
    const char = code[i];
    if ('{}[]().,;?:+-*/%&|^!<>='.includes(char)) {
      result.push(`<span style="color: #a9b7c6;">${escapeHtml(char)}</span>`);
    } else {
      result.push(escapeHtml(char));
    }
    i++;
  }
  
  return result.join('');
};

const mockTraceData = [
  { line: 1, segment: "int main() {", explanation: "Punctul de intrare în program (Entry point)", state: {} },
  { line: 2, segment: "int a = 5;", explanation: "Inițializăm variabila 'a' cu valoarea 5", state: { a: 5 } },
  { line: 3, segment: "int b = 10;", explanation: "Inițializăm variabila 'b' cu valoarea 10", state: { a: 5, b: 10 } },
  { line: 4, segment: "int c = a + b;", explanation: "Calculăm suma variabilelor 'a' și 'b' și o stocăm în 'c'", state: { a: 5, b: 10, c: 15 } },
  { line: 5, segment: "return 0;", explanation: "Returnăm codul de ieșire cu succes (0)", state: { a: 5, b: 10, c: 15 } }
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
  const [activeTab, setActiveTab] = useState('debugger'); // 'debugger', 'console'

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

  const handleReset = () => {
    setCurrentStep(0);
  };

  const codeLines = code.split('\n');
  const currentLine = trace.length > 0 ? trace[currentStep].line : -1;

  // Build local variables state object for CLion panel representation
  const currentStateVars = trace.length > 0 ? (trace[currentStep].state || {}) : {};
  const clionVars = Object.entries(currentStateVars).map(([name, val]) => {
    const type = isNaN(val) ? 'std::string' : 'int';
    return { name, type, val };
  });

  // Inline value representation for current debugger line
  const inlineValText = Object.entries(currentStateVars).map(([k, v]) => `${k}: ${v}`).join(', ');

  // Console log builder
  const consoleLogs = [];
  for (let idx = 0; idx <= currentStep; idx++) {
    const step = trace[idx];
    if (step) {
      consoleLogs.push(`[CLion Debugger] Line ${step.line}: ${step.segment} (${step.explanation})`);
    }
  }

  return (
    <div style={{ 
      background: '#0c0d16', 
      border: '1px solid #1e2030', 
      borderRadius: '16px', 
      padding: '24px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px', 
      flex: 1, 
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)' 
    }}>
      <h2 style={{ fontSize: '22px', borderBottom: '1px solid #1e2030', paddingBottom: '12px', color: '#dfdfdf' }}>
        Code Demonstrator (Playground Sandbox)
      </h2>
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            rows={10} 
            style={{ 
              width: '100%', 
              background: '#07080d', 
              color: '#c9d1d9', 
              border: '1px solid #1e2030', 
              borderRadius: '12px', 
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              lineHeight: '1.5',
              resize: 'vertical',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease'
            }}
            placeholder="Enter C++ code here..."
          />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <select 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              style={{ 
                flex: 1, 
                background: '#121320', 
                color: '#e2e8f0', 
                border: '1px solid #1e2030', 
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
        <div style={{ background: '#0d1512', border: '1px solid #123326', borderLeft: '4px solid var(--success-color)', padding: '20px', borderRadius: '12px' }}>
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
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch' }}>
          
          {/* LEFT: Code Tracer Window (IDE theme) */}
          <div style={{ 
            flex: 1.2, 
            minWidth: '350px', 
            display: 'flex', 
            flexDirection: 'column', 
            background: '#1e1f22', 
            border: '1px solid #2b2d30', 
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            {/* Mock Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              background: '#1a1b1c',
              borderBottom: '1px solid #2b2d30',
              userSelect: 'none'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                <span style={{ 
                  marginLeft: '12px', 
                  fontSize: '13px', 
                  color: 'rgba(255,255,255,0.4)', 
                  fontFamily: 'var(--font-mono)' 
                }}>
                  playground.cpp
                </span>
              </div>
            </div>

            {/* Code tracer editor lines */}
            <div style={{ 
              padding: '16px 0', 
              fontFamily: 'var(--font-mono)', 
              overflowX: 'auto', 
              fontSize: '15px', 
              lineHeight: '1.5',
              flex: 1
            }}>
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isCurrent = lineNum === currentLine;
                return (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    background: isCurrent ? 'rgba(33, 66, 131, 0.4)' : 'transparent',
                    borderLeft: isCurrent ? '3px solid #389fd6' : '3px solid transparent',
                    padding: '2px 16px',
                    transition: 'all 0.15s ease'
                  }}>
                    <span style={{ 
                      width: '35px', 
                      color: isCurrent ? '#389fd6' : 'rgba(255, 255, 255, 0.25)', 
                      textAlign: 'right', 
                      paddingRight: '12px', 
                      userSelect: 'none',
                      borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                      marginRight: '12px'
                    }}>
                      {lineNum}
                    </span>
                    <span style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: '24px' }}>
                      <span 
                        style={{ whiteSpace: 'pre' }}
                        dangerouslySetInnerHTML={{ __html: highlightCpp(lineText) }}
                      />
                      {isCurrent && inlineValText && (
                        <span style={{ color: '#9a9a9a', fontSize: '12px', fontStyle: 'italic', paddingRight: '16px' }}>
                          // {inlineValText}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: CLion Debug Window Panel */}
          <div style={{ 
            flex: 1, 
            minWidth: '350px', 
            display: 'flex', 
            flexDirection: 'column', 
            background: '#1a1b1c', 
            border: '1px solid #2b2d30', 
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            
            {/* Header Tabs */}
            <div style={{
              display: 'flex',
              background: '#2b2d30',
              borderBottom: '1px solid #3c3f41',
              alignItems: 'stretch',
              height: '34px'
            }}>
              <button
                onClick={() => setActiveTab('debugger')}
                style={{
                  background: activeTab === 'debugger' ? '#1e1f22' : 'transparent',
                  border: 'none',
                  borderRight: '1px solid #3c3f41',
                  color: activeTab === 'debugger' ? '#fff' : '#a9b7c6',
                  padding: '0 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🪲</span> Debugger
              </button>
              <button
                onClick={() => setActiveTab('console')}
                style={{
                  background: activeTab === 'console' ? '#1e1f22' : 'transparent',
                  border: 'none',
                  borderRight: '1px solid #3c3f41',
                  color: activeTab === 'console' ? '#fff' : '#a9b7c6',
                  padding: '0 16px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>💻</span> Console
              </button>
            </div>

            {/* Split layout: control strip + panels */}
            <div style={{ display: 'flex', flex: 1, background: '#1e1f22' }}>
              
              {/* CLion control strip */}
              <div style={{
                width: '38px',
                background: '#2b2d30',
                borderRight: '1px solid #3c3f41',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 0',
                gap: '12px',
                userSelect: 'none'
              }}>
                <button 
                  onClick={handleNext} 
                  disabled={currentStep === trace.length - 1}
                  title="Step Over (F8)"
                  style={{
                    background: 'transparent', border: 'none', cursor: currentStep === trace.length - 1 ? 'not-allowed' : 'pointer',
                    color: currentStep === trace.length - 1 ? '#43454a' : '#3574f0', fontSize: '18px', fontWeight: 'bold'
                  }}
                >
                  ↷
                </button>
                <button 
                  onClick={handlePrev} 
                  disabled={currentStep === 0}
                  title="Step Back"
                  style={{
                    background: 'transparent', border: 'none', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    color: currentStep === 0 ? '#43454a' : '#3574f0', fontSize: '18px', fontWeight: 'bold'
                  }}
                >
                  ↶
                </button>
                <button 
                  onClick={handleReset}
                  disabled={currentStep === 0}
                  title="Stop Program"
                  style={{
                    background: 'transparent', border: 'none', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    color: currentStep === 0 ? '#43454a' : '#db5860', fontSize: '14px'
                  }}
                >
                  ■
                </button>
              </div>

              {/* Variable / stack trace view */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                
                {activeTab === 'debugger' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Frames */}
                    <div style={{ borderBottom: '1px solid #2b2d30', pb: '12px', minHeight: '80px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', mb: '6px' }}>FRAMES (CALL STACK)</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', background: '#2d2f34', fontSize: '13px', fontFamily: 'var(--font-mono)', borderRadius: '3px', color: '#fff' }}>
                        <span style={{ color: '#3574f0' }}>⊞</span>
                        <span>main()</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>playground.cpp:{currentLine}</span>
                      </div>
                    </div>
                    
                    {/* Local Variables */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', mb: '6px' }}>VARIABLES</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {clionVars.length > 0 ? (
                          clionVars.map(v => (
                            <div key={v.name} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontFamily: 'var(--font-mono)', padding: '2px 4px' }}>
                              <span style={{ color: '#b378ba' }}>{'{x}'}</span>
                              <span style={{ color: '#9cdcfe', fontWeight: 600 }}>{v.name}</span>
                              <span style={{ color: 'rgba(255,255,255,0.3)' }}>: {v.type}</span>
                              <span style={{ color: '#a9b7c6', marginLeft: '6px' }}>= {v.val}</span>
                            </div>
                          ))
                        ) : (
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontSize: '13px' }}>
                            No variables active in local scope
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Explanations card */}
                    <div style={{ marginTop: '12px', background: '#2b2d30', borderLeft: '3px solid #3574f0', padding: '12px', borderRadius: '4px' }}>
                      <div style={{ fontSize: '11px', color: '#3574f0', fontWeight: 'bold', textTransform: 'uppercase' }}>Debugger Status</div>
                      <p style={{ color: '#a9b7c6', fontSize: '13px', margin: '4px 0 0 0', lineHeight: '1.4' }}>{trace[currentStep].explanation}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'console' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                    <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>CONSOLE OUTPUT LOG</div>
                    <div style={{ background: '#1a1b1c', padding: '10px', borderRadius: '6px', border: '1px solid #2b2d30', minHeight: '120px' }}>
                      {consoleLogs.map((log, idx) => (
                        <div key={idx} style={{ color: '#a9b7c6', marginBottom: '4px' }}>
                          <span style={{ color: '#bbb' }}>[log]</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>
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
