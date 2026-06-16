import React, { useState, useRef, useEffect } from 'react';
import mockCategoryData from '../data/mockCategoryData';

// HTML escaping helper for syntax highlighter
const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Custom C++ syntax highlighter
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
          background: '#1e1f22', padding: '18px', borderRadius: '8px',
          overflowX: 'auto', border: '1px solid #2b2d30',
          margin: '16px 0', fontFamily: 'var(--font-mono)',
          whiteSpace: 'pre', fontSize: '14px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}>
          <code dangerouslySetInnerHTML={{ __html: highlightCpp(codeContent) }} />
        </pre>
      );
    }

    const lines = block.split('\n');
    return lines.map((line, lIdx) => {
      const renderInline = (str) => {
        const parts = str.split(/(\*\*[\s\S]*?\*\*|\*[\s\S]*?\*|`[^`]*`|\[[^\]]+\]\([^)]+\))/g);
        return parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} style={{ color: '#ffc66d' }}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i} style={{ color: '#a9b7c6' }}>{part.slice(1, -1)}</em>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #3c3f41',
                padding: '2px 6px', borderRadius: '4px', fontFamily: 'var(--font-mono)',
                color: '#bbb', fontWeight: 'bold', fontSize: '0.9em'
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
                   color: '#56a8f5', textDecoration: 'none', borderBottom: '1px solid #56a8f5', transition: 'all 0.2s'
                 }} onMouseOver={e => e.target.style.color='#ffc66d'} onMouseOut={e => e.target.style.color='#56a8f5'}>
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
        const colors = { 1: '#fff', 2: '#56a8f5', 3: '#ffc66d' };
        const marginTop = (bIdx === 0 && lIdx === 0) ? '0' : '24px';
        return <div key={`line-${lIdx}`} style={{ fontSize: sizes[headerLevel], fontWeight: 'bold', marginTop, marginBottom: '12px', color: colors[headerLevel], borderBottom: headerLevel === 1 ? '1px solid #2b2d30' : 'none', paddingBottom: headerLevel === 1 ? '8px' : '0' }}>{inlineContent}</div>;
      }

      if (isQuote) {
        return <div key={`line-${lIdx}`} style={{ borderLeft: '4px solid #56a8f5', margin: '16px 0', color: '#888', fontStyle: 'italic', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '0 8px 8px 0' }}>{inlineContent}</div>;
      }

      if (isList) {
        return (
          <div key={`line-${lIdx}`} style={{ display: 'flex', gap: '12px', marginLeft: '16px', marginBottom: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: '#56a8f5', fontWeight: 'bold', marginTop: '-2px' }}>{isOrdered ? '•' : '■'}</span>
            <div style={{ flex: 1 }}>{inlineContent}</div>
          </div>
        );
      }

      return <div key={`line-${lIdx}`}>{inlineContent}</div>;
    });
  });
};

// Extractor of CLion Debugger state (Variables, Stack Frames, Inline Variables)
const getCategoryDebuggerState = (category, stepIndex, activeLine, explanationText) => {
  const vars = [];
  const frames = [];
  let inlineVal = null;

  const cat = typeof category === 'string' ? category : '';

  // Default frames (Stack frame list)
  frames.push({ name: 'main()', file: 'main.cpp', line: activeLine || 1 });

  if (cat === 'Arrays') {
    vars.push({ name: 'arr', type: 'std::vector<int>', val: '{10, 24, 8, 42, 17}', expandable: true });
    if (stepIndex >= 1) {
      let maxVal = 10;
      if (stepIndex >= 4) maxVal = 24;
      if (stepIndex >= 8) maxVal = 42;
      vars.push({ name: 'max_val', type: 'int', val: maxVal, expandable: false });
      if (activeLine === 9 || activeLine === 13 || activeLine === 15) inlineVal = `max_val: ${maxVal}`;
    }
    if (stepIndex >= 2 && stepIndex <= 10) {
      let iVal = 1;
      if (stepIndex >= 5) iVal = 2;
      if (stepIndex >= 7) iVal = 3;
      if (stepIndex >= 10) iVal = 4;
      vars.push({ name: 'i', type: 'int', val: iVal, expandable: false });
      if (activeLine === 11 || activeLine === 12) inlineVal = `i: ${iVal}, arr[i]: ${[10, 24, 8, 42, 17][iVal]}`;
    }
    if (stepIndex >= 11) {
      vars.push({ name: 'matrix', type: 'std::vector<std::vector<int>>', val: '{{1, 2, 3}, {4, 5, 6}}', expandable: true });
    }
    if (stepIndex >= 12) {
      let sumVal = 0;
      if (stepIndex === 13) sumVal = 1;
      if (stepIndex === 14) sumVal = 3;
      if (stepIndex === 15) sumVal = 6;
      if (stepIndex === 16) sumVal = 10;
      if (stepIndex === 17) sumVal = 15;
      if (stepIndex === 18) sumVal = 21;
      if (stepIndex === 19) sumVal = 21;
      vars.push({ name: 'sum', type: 'int', val: sumVal, expandable: false });
      if (activeLine === 22 || activeLine === 26 || activeLine === 32) inlineVal = `sum: ${sumVal}`;
    }
  }
  else if (cat.includes('Divide_Conquer') || cat.includes('Binary_Search')) {
    vars.push({ name: 'arr', type: 'std::vector<int>&', val: '{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}', expandable: true });
    vars.push({ name: 'target', type: 'int', val: '23', expandable: false });

    let left = 0, right = 9, mid = -1;
    if (stepIndex >= 3) left = 5;
    if (stepIndex >= 6) right = 6;
    if (stepIndex >= 2 && stepIndex < 5) mid = 4;
    else if (stepIndex >= 5 && stepIndex < 8) mid = 7;
    else if (stepIndex >= 8) mid = 5;

    vars.push({ name: 'left', type: 'int', val: left, expandable: false });
    vars.push({ name: 'right', type: 'int', val: right, expandable: false });

    if (mid !== -1) {
      vars.push({ name: 'mid', type: 'int', val: mid, expandable: false });
      vars.push({ name: 'arr[mid]', type: 'int', val: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91][mid], expandable: false });
    }

    frames.unshift({ name: `binarySearch(arr, target = 23)`, file: 'solution.cpp', line: activeLine });
    
    if (activeLine === 13 || activeLine === 14) inlineVal = `left: ${left}, right: ${right}`;
    if (activeLine === 17) inlineVal = `mid: ${mid}`;
    if (activeLine === 19 || activeLine === 23) inlineVal = `arr[mid]: ${[2, 5, 8, 12, 16, 23, 38, 56, 72, 91][mid]}, target: 23`;
    if (activeLine === 24) inlineVal = `left: ${left}`;
    if (activeLine === 26) inlineVal = `right: ${right}`;
  }
  else if (cat.endsWith('/DFS') || cat === 'DFS') {
    vars.push({ name: 'adj', type: 'std::vector<std::vector<int>>&', val: 'size = 5', expandable: true });
    
    let nodeVal = -1;
    let neighborVal = -1;
    let visitedArray = [false, false, false, false, false];
    let activeStack = [];
    
    if (stepIndex >= 1) { visitedArray[0] = true; nodeVal = 0; activeStack = [0]; }
    if (stepIndex >= 4) { visitedArray[1] = true; nodeVal = 1; activeStack = [1, 0]; }
    if (stepIndex >= 7) { visitedArray[3] = true; nodeVal = 3; activeStack = [3, 1, 0]; }
    if (stepIndex >= 10) { nodeVal = 1; activeStack = [1, 0]; }
    if (stepIndex >= 12) { visitedArray[4] = true; nodeVal = 4; activeStack = [4, 1, 0]; }
    if (stepIndex >= 14) { visitedArray[2] = true; nodeVal = 2; activeStack = [2, 4, 1, 0]; }
    if (stepIndex >= 16) { nodeVal = 0; activeStack = [0]; }
    
    if (stepIndex === 3) neighborVal = 1;
    if (stepIndex === 6) neighborVal = 3;
    if (stepIndex === 11) neighborVal = 4;
    
    vars.push({ name: 'visited', type: 'std::vector<bool>&', val: `{${visitedArray.map(b => b ? 'true' : 'false').join(', ')}}`, expandable: false });
    if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
    if (neighborVal !== -1) vars.push({ name: 'neighbor', type: 'int', val: neighborVal, expandable: false });
    
    activeStack.forEach((n, idx) => {
      frames.unshift({ name: `dfs(node = ${n}, adj, visited)`, file: 'dfs.cpp', line: idx === 0 ? activeLine : 18 });
    });
    
    if (nodeVal !== -1) {
      inlineVal = `node: ${nodeVal}`;
      if (neighborVal !== -1) inlineVal += `, neighbor: ${neighborVal}`;
    }
  }
  else if (cat.endsWith('/BFS') || cat === 'BFS') {
    vars.push({ name: 'adj', type: 'std::vector<std::vector<int>>&', val: 'size = 6', expandable: true });
    
    let nodeVal = -1;
    let visitedArray = [false, false, false, false, false, false];
    let qArray = [];
    
    if (stepIndex >= 1) { visitedArray[0] = true; }
    if (stepIndex >= 2) { qArray = [0]; }
    if (stepIndex >= 4) { qArray = []; nodeVal = 0; }
    if (stepIndex >= 5) { visitedArray[1] = true; visitedArray[2] = true; qArray = [1, 2]; }
    if (stepIndex >= 6) { qArray = [2]; nodeVal = 1; }
    if (stepIndex >= 7) { visitedArray[3] = true; visitedArray[4] = true; qArray = [2, 3, 4]; }
    if (stepIndex >= 8) { qArray = [3, 4]; nodeVal = 2; }
    if (stepIndex >= 10) { visitedArray[5] = true; qArray = [4, 5]; nodeVal = 3; }
    if (stepIndex >= 11) { qArray = []; nodeVal = 5; }
    
    vars.push({ name: 'visited', type: 'std::vector<bool>', val: `{${visitedArray.map(b => b ? 'true' : 'false').join(', ')}}`, expandable: false });
    vars.push({ name: 'q', type: 'std::queue<int>', val: qArray.length > 0 ? `{${qArray.join(', ')}}` : 'empty', expandable: false });
    if (nodeVal !== -1) vars.push({ name: 'node', type: 'int', val: nodeVal, expandable: false });
    
    if (stepIndex >= 1) {
      frames.unshift({ name: `bfs(start = 0, adj, V = 6)`, file: 'solution.cpp', line: activeLine });
    }
    
    if (nodeVal !== -1) {
      inlineVal = `node: ${nodeVal}`;
    } else if (stepIndex >= 1) {
      inlineVal = `start: 0`;
    }
  }
  else {
    // General fallback
    if (explanationText && typeof explanationText === 'string') {
      const regex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:=|este|devine)\s*([0-9\-]+|"[^"]*"|'[^']'|true|false)\b/g;
      let match;
      while ((match = regex.exec(explanationText)) !== null) {
        const name = match[1];
        const val = match[2];
        const type = isNaN(val) ? (val === 'true' || val === 'false' ? 'bool' : 'std::string') : 'int';
        vars.push({ name, type, val, expandable: false });
      }
      if (vars.length > 0 && activeLine) {
        inlineVal = vars.map(v => `${v.name}: ${v.val}`).join(', ');
      }
    }
  }

  return { vars, frames, inlineVal };
};

const getInlineValueForLine = (category, stepIndex, lineNum) => {
  const cat = typeof category === 'string' ? category : '';
  if (cat === 'Arrays') {
    if (lineNum === 8 && stepIndex >= 0) return 'arr: {10, 24, 8, 42, 17}';
    if (lineNum === 9 && stepIndex >= 1) {
      return `max_val: ${stepIndex >= 8 ? 42 : (stepIndex >= 4 ? 24 : 10)}`;
    }
    if (lineNum === 11 && stepIndex >= 2 && stepIndex <= 10) {
      let iVal = 1;
      if (stepIndex >= 5) iVal = 2;
      if (stepIndex >= 7) iVal = 3;
      if (stepIndex >= 10) iVal = 4;
      return `i: ${iVal}`;
    }
    if (lineNum === 12 && stepIndex >= 2 && stepIndex <= 10) {
      let iVal = 1;
      let maxVal = 10;
      if (stepIndex >= 5) { iVal = 2; maxVal = 24; }
      if (stepIndex >= 7) { iVal = 3; maxVal = 24; }
      if (stepIndex >= 10) { iVal = 4; maxVal = 42; }
      const arrVals = [10, 24, 8, 42, 17];
      return `arr[i]: ${arrVals[iVal]}, max_val: ${maxVal}`;
    }
    if (lineNum === 13 && stepIndex >= 1) {
      return `max_val: ${stepIndex >= 8 ? 42 : (stepIndex >= 4 ? 24 : 10)}`;
    }
    if (lineNum === 20 && stepIndex >= 11) return 'matrix: {{1,2,3},{4,5,6}}';
    if (lineNum === 24 && stepIndex >= 13 && stepIndex <= 18) {
      let iVal = stepIndex >= 16 ? 1 : 0;
      return `i: ${iVal}`;
    }
    if (lineNum === 25 && stepIndex >= 13 && stepIndex <= 18) {
      let iVal = stepIndex >= 16 ? 1 : 0;
      let jVal = (stepIndex - 13) % 3;
      if (stepIndex >= 16) jVal = (stepIndex - 16) % 3;
      return `i: ${iVal}, j: ${jVal}`;
    }
    if (lineNum === 26 && stepIndex >= 12) {
      let sumVal = 0;
      if (stepIndex === 13) sumVal = 1;
      if (stepIndex === 14) sumVal = 3;
      if (stepIndex === 15) sumVal = 6;
      if (stepIndex === 16) sumVal = 10;
      if (stepIndex === 17) sumVal = 15;
      if (stepIndex === 18) sumVal = 21;
      if (stepIndex === 19) sumVal = 21;
      return `sum: ${sumVal}`;
    }
  }
  else if (cat.endsWith('/DFS') || cat === 'DFS') {
    let nodeVal = -1;
    let neighborVal = -1;
    if (stepIndex >= 1) nodeVal = 0;
    if (stepIndex >= 4) nodeVal = 1;
    if (stepIndex >= 7) nodeVal = 3;
    if (stepIndex >= 10) nodeVal = 1;
    if (stepIndex >= 12) nodeVal = 4;
    if (stepIndex >= 14) nodeVal = 2;
    if (stepIndex >= 16) nodeVal = 0;
    
    if (stepIndex === 3) neighborVal = 1;
    if (stepIndex === 6) neighborVal = 3;
    if (stepIndex === 11) neighborVal = 4;

    if ((lineNum === 12 || lineNum === 13 || lineNum === 14 || lineNum === 16) && nodeVal !== -1) {
      return `node: ${nodeVal}`;
    }
    if ((lineNum === 17 || lineNum === 18) && neighborVal !== -1) {
      return `neighbor: ${neighborVal}`;
    }
  }
  else if (cat.endsWith('/BFS') || cat === 'BFS') {
    let nodeVal = -1;
    let qArray = [];
    if (stepIndex >= 2) qArray = [0];
    if (stepIndex >= 4) { qArray = []; nodeVal = 0; }
    if (stepIndex >= 5) { qArray = [1, 2]; nodeVal = 0; }
    if (stepIndex >= 6) { qArray = [2]; nodeVal = 1; }
    if (stepIndex >= 7) { qArray = [2, 3, 4]; nodeVal = 1; }
    if (stepIndex >= 8) { qArray = [3, 4]; nodeVal = 2; }
    if (stepIndex >= 10) { qArray = [4, 5]; nodeVal = 3; }
    if (stepIndex >= 11) { qArray = []; nodeVal = 5; }

    if (lineNum === 13 || lineNum === 17 || lineNum === 18) {
      return `start: 0`;
    }
    if (lineNum === 20) {
      return `q.size(): ${qArray.length}`;
    }
    if ((lineNum === 21 || lineNum === 22 || lineNum === 24 || lineNum === 26) && nodeVal !== -1) {
      return `node: ${nodeVal}`;
    }
    if ((lineNum === 27 || lineNum === 28 || lineNum === 29) && nodeVal !== -1) {
      return `node: ${nodeVal}, q.size(): ${qArray.length}`;
    }
  }
  return null;
};

const CategoryPresentation = ({ category, onClose, onNavigate }) => {
  const data = mockCategoryData[category] || mockCategoryData["Arrays"];
  const explanations = data.explanations || [];
  
  const subcategories = Object.keys(mockCategoryData).filter(key => 
    key.startsWith(category + '/') && key.split('/').length === category.split('/').length + 1
  );
  const isTransition = subcategories.length > 0;
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('debugger'); // 'debugger', 'visualizer', 'console'
  const [expandedVars, setExpandedVars] = useState({});
  const activeLineRef = useRef(null);
  const workspaceRef = useRef(null);
  const isInitialMount = useRef(true);

  const cleanCode = data.code ? data.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '') : '';
  const codeLines = cleanCode ? cleanCode.split('\n') : [];

  // Reset index when changing categories
  useEffect(() => {
    setCurrentStepIndex(0);
    setExpandedVars({});
    isInitialMount.current = true;
  }, [category]);

  const handlePrev = () => {
    if (explanations.length > 0) {
      setCurrentStepIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (explanations.length > 0) {
      setCurrentStepIndex(prev => Math.min(explanations.length - 1, prev + 1));
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleRunToEnd = () => {
    if (explanations.length > 0) {
      setCurrentStepIndex(explanations.length - 1);
    }
  };

  const handleCopyCode = () => {
    const codeToCopy = cleanCode || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(codeToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy(codeToCopy);
      });
    } else {
      fallbackCopy(codeToCopy);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleVarExpand = (name) => {
    setExpandedVars(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const currentExplanation = explanations[currentStepIndex];
  const activeLine = currentExplanation ? currentExplanation.line : null;

  // Calculate CLion debugger details safely
  const explanationText = (currentExplanation && typeof currentExplanation.text === 'string') ? currentExplanation.text : '';
  const debugState = getCategoryDebuggerState(category, currentStepIndex, activeLine, explanationText);

  // Generate logs for console tab
  const consoleLogs = [];
  for (let i = 0; i <= currentStepIndex; i++) {
    const exp = explanations[i];
    if (exp) {
      consoleLogs.push(`[CLion Debugger] Line ${exp.line}: ${exp.text || ''}`);
    }
  }

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLine]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStepIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Safe matrix rendering setup (handling matrix.data vs matrix.rows, and object cells)
  const matrixData = (currentExplanation && currentExplanation.matrix) 
    ? (currentExplanation.matrix.data || currentExplanation.matrix.rows || []) 
    : [];

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(5, 6, 11, 0.98)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1420px',
          maxHeight: '94vh',
          overflowY: 'auto',
          padding: '30px',
          position: 'relative',
          background: '#1e1f22', // CLion base IDE editor background
          border: '1px solid #2b2d30',
          borderRadius: '12px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          animation: 'simpleSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #3c3f41',
            color: '#bbb',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 100
          }}
          onMouseOver={e => { e.target.style.background = '#ef4444'; e.target.style.color = '#fff'; e.target.style.borderColor = '#ef4444'; }}
          onMouseOut={e => { e.target.style.background = 'rgba(255, 255, 255, 0.05)'; e.target.style.color = '#bbb'; e.target.style.borderColor = '#3c3f41'; }}
        >✕</button>

        <h1 style={{ 
          fontSize: '22px', 
          color: '#dfdfdf', 
          marginBottom: '20px', 
          borderBottom: '1px solid #2b2d30', 
          paddingBottom: '12px',
          fontWeight: 'bold',
          letterSpacing: '-0.2px',
          fontFamily: 'var(--font-display)'
        }}>
          CLion Debugger: {category.replace(/_/g, ' ').replace(/\//g, ' / ')}
        </h1>
        
        {/* Theoretical Presentations */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px', background: '#2b2d30', border: '1px solid #3c3f41', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ color: '#ffc66d', fontSize: '15px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📖</span> Concept Teoretic
            </h4>
            <div style={{ fontSize: '14px', color: '#a9b7c6', lineHeight: '1.6' }}>
              {formatText(data.presentation)}
            </div>
          </div>

          {data.complexity && (
            <div style={{ flex: 1, minWidth: '300px', background: '#2b2d30', border: '1px solid #3c3f41', borderLeft: '4px solid #cc7832', borderRadius: '8px', padding: '16px' }}>
              <h4 style={{ color: '#cc7832', fontSize: '15px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>⚡</span> Complexități
              </h4>
              <div style={{ fontSize: '14px', color: '#a9b7c6', lineHeight: '1.6' }}>
                {formatText(data.complexity)}
              </div>
            </div>
          )}
        </div>

        {/* Variations & Applications */}
        {(data.variations || data.applications) && (
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {data.variations && (
              <div style={{ flex: 1, minWidth: '300px', background: '#2b2d30', border: '1px solid #3c3f41', borderLeft: '4px solid #b378ba', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#b378ba', fontSize: '15px', marginBottom: '8px' }}>🔄 Variante</h4>
                <div style={{ fontSize: '14px', color: '#a9b7c6', lineHeight: '1.6' }}>
                  {formatText(data.variations)}
                </div>
              </div>
            )}
            {data.applications && (
              <div style={{ flex: 1, minWidth: '300px', background: '#2b2d30', border: '1px solid #3c3f41', borderLeft: '4px solid #6aab73', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: '#6aab73', fontSize: '15px', marginBottom: '8px' }}>🚀 Aplicații practice</h4>
                <div style={{ fontSize: '14px', color: '#a9b7c6', lineHeight: '1.6' }}>
                  {formatText(data.applications)}
                </div>
              </div>
            )}
          </div>
        )}

        {isTransition && (
          <div style={{ background: '#2b2d30', border: '1px solid #3c3f41', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
            <h4 style={{ color: '#56a8f5', fontSize: '15px', marginBottom: '12px' }}>🔀 Subcapitole / Algoritmi înrudite</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {subcategories.map(subcat => {
                const subcatName = subcat.split('/').pop().replace(/_/g, ' ');
                return (
                  <button
                    key={subcat}
                    onClick={() => onNavigate(subcat)}
                    style={{
                      background: '#1e1f22', border: '1px solid #3c3f41', color: '#a9b7c6',
                      padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s',
                      fontWeight: 600, fontSize: '13px'
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#56a8f5'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#3c3f41'; e.currentTarget.style.color = '#a9b7c6'; }}
                  >
                    {subcatName} →
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN CLION EDITOR & DEBUGGER LAYOUT */}
        {cleanCode && cleanCode.trim() !== "" && (
          <div 
            ref={workspaceRef}
            style={{ display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', marginBottom: '24px' }}
          >
            
            {/* LEFT PANE: CLion Code Editor */}
            <div style={{ 
              flex: 1.2, 
              minWidth: '550px', 
              display: 'flex', 
              flexDirection: 'column', 
              background: '#1e1f22', 
              border: '1px solid #2b2d30', 
              borderRadius: '8px',
              overflow: 'hidden',
              height: '850px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              {/* CLion Tab Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                background: '#1a1b1c',
                borderBottom: '1px solid #2b2d30',
                height: '38px',
                userSelect: 'none'
              }}>
                <div style={{ display: 'flex', gap: '0', alignItems: 'stretch', height: '100%' }}>
                  {/* File Tab */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    background: '#1e1f22', 
                    padding: '0 16px', 
                    borderRight: '1px solid #2b2d30',
                    borderTop: '2px solid #56a8f5',
                    fontSize: '13px', 
                    color: '#dfdfdf', 
                    fontFamily: 'var(--font-mono)' 
                  }}>
                    <span style={{ color: '#e06c75', fontWeight: 'bold' }}>C++</span>
                    {category.split('/').pop().toLowerCase()}.cpp
                  </div>
                </div>
                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  style={{
                    background: copied ? '#6aab73' : 'transparent',
                    border: '1px solid ' + (copied ? '#6aab73' : '#3c3f41'),
                    color: '#dfdfdf',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s'
                  }}
                >
                  {copied ? 'Copiat' : 'Copiază cod'}
                </button>
              </div>

              {/* Code lines container */}
              <div style={{ 
                overflowX: 'auto', 
                overflowY: 'auto', 
                padding: '12px 0', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '14px', 
                lineHeight: '1.6',
                background: '#1e1f22',
                color: '#a9b7c6',
                flex: 1
              }}>
                {codeLines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActive = activeLine === lineNum;
                  
                  // Extract inline debugger value for this line
                  const inlineVarVal = getInlineValueForLine(category, currentStepIndex, lineNum);
                  
                  return (
                    <div 
                      key={idx}
                      ref={isActive ? activeLineRef : null}
                      style={{
                        display: 'flex',
                        padding: '1px 16px',
                        background: isActive ? 'rgba(33, 66, 131, 0.4)' : 'transparent', // CLion blue line breakpoint/active highlight
                        borderLeft: isActive ? '3px solid #389fd6' : '3px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Line Numbers column */}
                      <span style={{ 
                        width: '35px', 
                        color: isActive ? '#389fd6' : 'rgba(255, 255, 255, 0.2)', 
                        userSelect: 'none', 
                        textAlign: 'right', 
                        paddingRight: '12px',
                        fontWeight: isActive ? 'bold' : 'normal',
                        marginRight: '12px'
                      }}>
                        {lineNum}
                      </span>
                      {/* Code body & inline debug values */}
                      <span style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                        <span 
                          style={{ whiteSpace: 'pre' }}
                          dangerouslySetInnerHTML={{ __html: highlightCpp(line) }}
                        />
                        {/* CLion Inline Value display */}
                        {inlineVarVal && (
                          <span style={{ 
                            color: '#9a9a9a', 
                            fontSize: '12px', 
                            fontStyle: 'italic', 
                            fontFamily: 'var(--font-mono)',
                            userSelect: 'none',
                            paddingRight: '16px'
                          }}>
                            // {inlineVarVal}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANE: CLion Debugger Window */}
            <div style={{ 
              flex: 1, 
              minWidth: '500px', 
              display: 'flex', 
              flexDirection: 'column', 
              background: '#1a1b1c', 
              border: '1px solid #2b2d30', 
              borderRadius: '8px',
              overflow: 'hidden',
              height: '850px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
            }}>
              
              {/* CLion Debugger Panel Title and Tabs */}
              <div style={{
                display: 'flex',
                background: '#2b2d30',
                borderBottom: '1px solid #3c3f41',
                alignItems: 'stretch',
                height: '34px',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex' }}>
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
                    <span style={{ color: activeTab === 'debugger' ? '#56a8f5' : '#888' }}>🪲</span> Debugger
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
                
                {/* Active Line Status tag */}
                <div style={{ display: 'flex', alignItems: 'center', paddingRight: '12px', fontSize: '11px', color: '#888', fontFamily: 'var(--font-mono)' }}>
                  Line: {activeLine}
                </div>
              </div>

              {/* Main Debugger Pane Workspace */}
              <div style={{ display: 'flex', flex: 1, background: '#1e1f22', position: 'relative' }}>
                
                {/* CLion Vertical Control Strip */}
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
                    disabled={explanations.length === 0 || currentStepIndex === explanations.length - 1}
                    title="Resume Program (F9)"
                    style={{
                      background: 'transparent', border: 'none', cursor: (explanations.length === 0 || currentStepIndex === explanations.length - 1) ? 'not-allowed' : 'pointer',
                      color: (explanations.length === 0 || currentStepIndex === explanations.length - 1) ? '#43454a' : '#59a869', fontSize: '16px'
                    }}
                  >
                    ▶
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    disabled={explanations.length === 0 || currentStepIndex === explanations.length - 1}
                    title="Step Over (F8)"
                    style={{
                      background: 'transparent', border: 'none', cursor: (explanations.length === 0 || currentStepIndex === explanations.length - 1) ? 'not-allowed' : 'pointer',
                      color: (explanations.length === 0 || currentStepIndex === explanations.length - 1) ? '#43454a' : '#3574f0', fontSize: '18px', fontWeight: 'bold'
                    }}
                  >
                    ↷
                  </button>

                  <button 
                    onClick={handlePrev}
                    disabled={currentStepIndex === 0}
                    title="Step Back"
                    style={{
                      background: 'transparent', border: 'none', cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                      color: currentStepIndex === 0 ? '#43454a' : '#3574f0', fontSize: '18px', fontWeight: 'bold'
                    }}
                  >
                    ↶
                  </button>

                  <button 
                    onClick={handleReset}
                    disabled={currentStepIndex === 0}
                    title="Stop & Reset (Ctrl+F2)"
                    style={{
                      background: 'transparent', border: 'none', cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                      color: currentStepIndex === 0 ? '#43454a' : '#db5860', fontSize: '14px'
                    }}
                  >
                    ■
                  </button>

                  <button 
                    onClick={handleRunToEnd}
                    disabled={explanations.length === 0 || currentStepIndex === explanations.length - 1}
                    title="Run to End"
                    style={{
                      background: 'transparent', border: 'none', cursor: (explanations.length === 0 || currentStepIndex === explanations.length - 1) ? 'not-allowed' : 'pointer',
                      color: (explanations.length === 0 || currentStepIndex === explanations.length - 1) ? '#43454a' : '#b378ba', fontSize: '15px'
                    }}
                  >
                    ⏭
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                  
                  {activeTab === 'debugger' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
                      
                      {/* Top Row: Visualizer & Explanation */}
                      <div style={{ 
                        display: 'flex', 
                        gap: '16px', 
                        borderBottom: '1px solid #2b2d30', 
                        paddingBottom: '16px',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'flex-start'
                      }}>
                        {/* Visualizer Pane */}
                        <div style={{ 
                          flex: 1.2, 
                          minWidth: '280px', 
                          background: '#1a1b1c', 
                          padding: '12px', 
                          borderRadius: '6px', 
                          border: '1px solid #2b2d30',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: '190px'
                        }}>
                          <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                            State Visualizer
                          </div>
                          
                          {currentExplanation?.matrix && (
                            <div style={{ overflowX: 'auto', width: '100%' }}>
                              <table style={{ borderCollapse: 'collapse', width: '100%', color: 'white', fontSize: '12px', textAlign: 'center' }}>
                                <thead>
                                  <tr>
                                    {currentExplanation.matrix.headers.map((h, i) => (
                                      <th key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', padding: '4px', color: '#ffc66d' }}>{h}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {matrixData.map((row, r) => (
                                    <tr key={r}>
                                      {row.map((cell, c) => {
                                        const cellVal = cell && typeof cell === 'object' ? cell.val : cell;
                                        const isActive = currentExplanation.matrix.activeCells?.some(ac => ac.r === r && ac.c === c);
                                        const isHighlight = currentExplanation.matrix.highlightCells?.some(hc => hc.r === r && hc.c === c);
                                        const bg = isActive ? 'rgba(89, 168, 105, 0.3)' : (isHighlight ? 'rgba(255, 198, 109, 0.25)' : 'transparent');
                                        const borderRight = c === 0 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.05)';
                                        return (
                                          <td key={c} style={{ padding: '6px', borderRight, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: bg, fontWeight: isActive || isHighlight ? 'bold' : 'normal', color: isActive ? '#59a869' : (isHighlight ? '#ffc66d' : '#a9b7c6') }}>
                                            {cellVal}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            {currentExplanation?.blocksVisual && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', flex: 1, minWidth: '180px' }}>
                                {currentExplanation.blocksVisual.map((row, rIdx) => (
                                  <div key={rIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '100%' }}>
                                    {row.label && <span style={{ color: '#a9b7c6', fontSize: '11px', fontWeight: 'bold' }}>{row.label}</span>}
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                      {row.groups.map((group, gIdx) => (
                                        <div key={gIdx} style={{ display: 'flex', gap: '4px', background: '#1a1b1c', padding: '4px', borderRadius: '4px', border: '1px solid #2b2d30' }}>
                                          {group.map((block, bIdx) => (
                                            <div key={bIdx} style={{
                                              minWidth: '32px', padding: '0 6px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                              background: block.active ? '#3574f0' : (block.sorted ? '#59a869' : '#1e1f22'),
                                              border: `1px solid ${block.active ? '#56a8f5' : (block.sorted ? '#59a869' : '#3c3f41')}`,
                                              borderRadius: '4px', color: block.active || block.sorted ? '#fff' : '#a9b7c6', fontWeight: 'bold', fontSize: '12px',
                                              transition: 'all 0.2s ease',
                                              opacity: block.hidden ? 0.2 : 1,
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
                              <div style={{ position: 'relative', width: '280px', height: '170px', flexShrink: 0 }}>
                                <svg width="280" height="170" style={{ position: 'absolute', top: 0, left: 0 }}>
                                  {currentExplanation.graphVisual.edges.map((edge, i) => {
                                    const n1 = currentExplanation.graphVisual.nodes.find(n => n.id === edge.source);
                                    const n2 = currentExplanation.graphVisual.nodes.find(n => n.id === edge.target);
                                    if (!n1 || !n2) return null;
                                    const scaleY = 170 / 220;
                                    return <line key={i} x1={n1.x} y1={n1.y * scaleY} x2={n2.x} y2={n2.y * scaleY} stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" />
                                  })}
                                </svg>
                                {currentExplanation.graphVisual.nodes.map(node => {
                                  let bg = '#1e1f22';
                                  let border = '#3c3f41';
                                  let color = '#a9b7c6';
                                  if (node.state === 'active') { bg = '#3574f0'; border = '#56a8f5'; color = '#fff'; }
                                  else if (node.state === 'visited') { bg = '#59a869'; border = '#59a869'; color = '#fff'; }
                                  
                                  const scaleY = 170 / 220;
                                  return (
                                    <div key={node.id} style={{
                                      position: 'absolute', left: node.x - 16, top: (node.y * scaleY) - 16, width: '32px', height: '32px',
                                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      background: bg, border: `1px solid ${border}`, color: color, fontWeight: 'bold', fontSize: '13px',
                                      transition: 'all 0.2s ease', zIndex: 2
                                    }}>
                                      {node.label}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {currentExplanation?.visual && (
                            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#6aab73', whiteSpace: 'pre-wrap', width: '100%', background: '#1a1b1c', padding: '8px', borderRadius: '6px', border: '1px solid #2b2d30', marginTop: '8px' }}>
                              {formatText(currentExplanation.visual)}
                            </div>
                          )}

                          {!currentExplanation?.matrix && !currentExplanation?.blocksVisual && !currentExplanation?.graphVisual && !currentExplanation?.visual && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '20px' }}>🖼️</span>
                              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center' }}>
                                (Vizualizare indisponibilă)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Explanation Pane */}
                        <div style={{ 
                          flex: 1, 
                          minWidth: '280px', 
                          background: '#2b2d30', 
                          border: '1px solid #3c3f41',
                          borderLeft: '4px solid #56a8f5',
                          padding: '16px', 
                          borderRadius: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          minHeight: 'auto',
                          alignSelf: 'flex-start'
                        }}>
                          <h4 style={{ color: '#56a8f5', fontSize: '12px', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>
                            Explicație Pasul {currentStepIndex + 1} (Linia {activeLine})
                          </h4>
                          <div style={{ color: '#dfdfdf', fontSize: '13.5px', lineHeight: '1.5', overflowY: 'auto', maxHeight: '350px' }}>
                            {formatText(currentExplanation?.text || '')}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Call Stack & Variables */}
                      <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: '180px', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {/* Call Stack */}
                        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Frames (Call Stack)
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
                            {debugState.frames.map((frame, index) => (
                              <div 
                                key={index} 
                                style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '8px', 
                                  padding: '4px 8px', 
                                  background: index === 0 ? '#2d2f34' : 'transparent',
                                  borderLeft: index === 0 ? '3px solid #3574f0' : '3px solid transparent',
                                  color: index === 0 ? '#fff' : '#a9b7c6',
                                  fontSize: '13px',
                                  fontFamily: 'var(--font-mono)',
                                  borderRadius: '3px'
                                }}
                              >
                                <span style={{ color: '#3574f0' }}>⊞</span>
                                <span>{frame.name}</span>
                                <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{frame.file}:{frame.line}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Variables */}
                        <div style={{ flex: 1.5, minWidth: '240px', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Variables
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, gap: '2px' }}>
                            {debugState.vars.length > 0 ? (
                              debugState.vars.map(v => {
                                const isExpandable = v.expandable;
                                const isExpanded = !!expandedVars[v.name];
                                
                                return (
                                  <div key={v.name} style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', padding: '3px 0' }}>
                                    <div 
                                      style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '4px', 
                                        cursor: isExpandable ? 'pointer' : 'default',
                                        padding: '2px 4px',
                                        borderRadius: '3px',
                                        background: 'transparent'
                                      }} 
                                      onClick={() => isExpandable && toggleVarExpand(v.name)}
                                      onMouseOver={e => e.currentTarget.style.background = '#2d2f34'}
                                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                      <span style={{ color: 'rgba(255,255,255,0.3)', userSelect: 'none', width: '12px', fontSize: '10px' }}>
                                        {isExpandable ? (isExpanded ? '▼' : '▶') : ''}
                                      </span>
                                      <span style={{ color: '#b378ba' }}>{'{x}'}</span>
                                      <span style={{ color: '#9cdcfe', fontWeight: 600 }}> {v.name}</span>
                                      <span style={{ color: 'rgba(255,255,255,0.35)' }}>: {v.type}</span>
                                      <span style={{ color: '#a9b7c6', marginLeft: '6px' }}> = {v.val}</span>
                                    </div>
                                    
                                    {isExpandable && isExpanded && (
                                      <div style={{ paddingLeft: '24px', borderLeft: '1px dashed #3c3f41', marginTop: '2px', marginLeft: '10px' }}>
                                        {v.name === 'arr' && (category.includes('Binary_Search') || category.includes('Divide_Conquer') ? [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] : [10, 24, 8, 42, 17]).map((item, idx) => (
                                          <div key={idx} style={{ padding: '2px 4px', display: 'flex', gap: '4px' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.3)', width: '12px' }}></span>
                                            <span style={{ color: '#e06c75' }}>[{idx}]</span>: <span style={{ color: '#2ebfc6' }}>{item}</span>
                                          </div>
                                        ))}
                                        {v.name === 'matrix' && [
                                          { r: 0, vals: [1, 2, 3] },
                                          { r: 1, vals: [4, 5, 6] }
                                        ].map((row, idx) => (
                                          <div key={idx} style={{ padding: '2px 4px', display: 'flex', gap: '4px' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.3)', width: '12px' }}></span>
                                            <span style={{ color: '#e06c75' }}>[{idx}]</span>: <span style={{ color: '#a9b7c6' }}>{'{'}{row.vals.join(', ')}{'}'}</span>
                                          </div>
                                        ))}
                                        {v.name === 'adj' && (
                                          (category.endsWith('/DFS') || category === 'DFS') ? [
                                            { u: 0, neighbors: [1, 2] },
                                            { u: 1, neighbors: [0, 3, 4] },
                                            { u: 2, neighbors: [0, 4] },
                                            { u: 3, neighbors: [1] },
                                            { u: 4, neighbors: [1, 2] }
                                          ] : (category.endsWith('/BFS') || category === 'BFS') ? [
                                            { u: 0, neighbors: [1, 2] },
                                            { u: 1, neighbors: [0, 3, 4] },
                                            { u: 2, neighbors: [0, 4] },
                                            { u: 3, neighbors: [1, 5] },
                                            { u: 4, neighbors: [1, 2, 5] },
                                            { u: 5, neighbors: [3, 4] }
                                          ] : [
                                            { u: 0, neighbors: [1, 2] },
                                            { u: 1, neighbors: [0, 2, 3] },
                                            { u: 2, neighbors: [0, 1] }
                                          ]
                                        ).map((row, idx) => (
                                          <div key={idx} style={{ padding: '2px 4px', display: 'flex', gap: '4px' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.3)', width: '12px' }}></span>
                                            <span style={{ color: '#e06c75' }}>[{idx}]</span>: <span style={{ color: '#a9b7c6' }}>Node {row.u} → {JSON.stringify(row.neighbors)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontSize: '13px' }}>
                                No local variables active
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'console' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                      <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                        Debugger Console Output
                      </div>
                      <div style={{ flex: 1, background: '#1a1b1c', padding: '12px', borderRadius: '6px', border: '1px solid #2b2d30', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {consoleLogs.map((log, idx) => (
                          <div key={idx} style={{ color: '#a9b7c6', whiteSpace: 'pre-wrap' }}>
                            <span style={{ color: '#bbb' }}>[09:30:{10 + idx}]</span> {log}
                          </div>
                        ))}
                        <div style={{ color: '#56a8f5', display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <span>&gt;_</span>
                          <span style={{ animation: 'shimmer 1s infinite', borderRight: '2px solid #56a8f5', width: '1px', height: '14px' }}></span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        )}



        {/* Recommended Problems */}
        {data.problems && (data.problems.easy?.length > 0 || data.problems.medium?.length > 0 || data.problems.hard?.length > 0) && (
        <section>
          <h2 style={{ color: '#56a8f5', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎯</span> Probleme Recomandate (CLion Practice Tracker)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            
            <div style={{ background: '#1e2821', border: '1px solid #2d4533', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: '#59a869', margin: '0 0 12px 0', fontSize: '15px' }}>🟢 Ușor</h3>
              <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {data.problems.easy?.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: '#dfdfdf', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e => e.target.style.color='#59a869'} onMouseOut={e => e.target.style.color='#dfdfdf'}>{p.title}</a>
                    <span style={{ color: '#888', marginLeft: '6px' }}>- {formatText(p.desc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#2d241a', border: '1px solid #4a3c2b', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: '#ffc66d', margin: '0 0 12px 0', fontSize: '15px' }}>🟡 Mediu</h3>
              <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {data.problems.medium?.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: '#dfdfdf', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e => e.target.style.color='#ffc66d'} onMouseOut={e => e.target.style.color='#dfdfdf'}>{p.title}</a>
                    <span style={{ color: '#888', marginLeft: '6px' }}>- {formatText(p.desc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#2c1e20', border: '1px solid #4f3135', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: '#db5860', margin: '0 0 12px 0', fontSize: '15px' }}>🔴 Dificil</h3>
              <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {data.problems.hard?.map((p, i) => (
                  <li key={i}>
                    <a href={p.url} target="_blank" rel="noreferrer" style={{ color: '#dfdfdf', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 'bold' }} onMouseOver={e => e.target.style.color='#db5860'} onMouseOut={e => e.target.style.color='#dfdfdf'}>{p.title}</a>
                    <span style={{ color: '#888', marginLeft: '6px' }}>- {formatText(p.desc)}</span>
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