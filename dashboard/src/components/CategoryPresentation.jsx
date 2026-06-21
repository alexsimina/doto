import { useState, useRef, useEffect } from 'react';
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
      let style;
      
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

// Dictionary/mapping of important global variables per category
const getCategoryGlobalVars = (category, stepIndex, activeLine, explanationText) => {
  const data = mockCategoryData[category];
  if (data?.debugger?.getGlobalVars) {
    return data.debugger.getGlobalVars(stepIndex, activeLine, explanationText);
  }
  if (data?.globalVars) {
    return data.globalVars;
  }

  // Default fallback for any other categories
  return [
    { name: 'INF', type: 'const int', val: '1e9', expandable: false },
    { name: 'MOD', type: 'const int', val: '1e9+7', expandable: false }
  ];
};

// Helper to parse function definitions and parameter lists from C++ code
const parseCodeFunctions = (code) => {
  if (!code) return [];
  const lines = code.split('\n');
  const functions = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_<>\s*&]*\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*(?:const\s*)?\{/);
    if (match) {
      const name = match[2].trim();
      const paramsText = match[3];
      
      if (new Set(['if', 'for', 'while', 'switch', 'catch', 'else']).has(name)) {
        continue;
      }
      
      const params = paramsText.split(',').map(p => p.trim()).filter(Boolean).map(p => {
        const parts = p.split(/\s+/);
        let paramName = parts[parts.length - 1];
        paramName = paramName.replace(/^[*&]+/, '').replace(/\[\]$/, '');
        return paramName;
      });
      
      const startLine = i + 1;
      
      let braceCount = 1;
      let endLine = startLine;
      for (let j = i + 1; j < lines.length; j++) {
        const checkLine = lines[j];
        for (let k = 0; k < checkLine.length; k++) {
          const char = checkLine[k];
          if (char === '{') braceCount++;
          else if (char === '}') braceCount--;
        }
        if (braceCount === 0) {
          endLine = j + 1;
          break;
        }
      }
      
      functions.push({
        name,
        params,
        startLine,
        endLine
      });
    }
  }
  return functions;
};

// Simulated debugger state tracker for arbitrary categories
const getDynamicCallStackAndVars = (category, stepIndex, activeLine, explanationText) => {
  const categoryData = mockCategoryData[category] || {};
  const code = categoryData.code ? categoryData.code.replace(/^\r?\n/, '').replace(/\r?\n$/, '') : '';
  const explanations = categoryData.explanations || [];
  
  const functions = parseCodeFunctions(code);
  
  const getFuncForLine = (lineNum) => {
    if (!lineNum) return null;
    return functions.find(f => lineNum >= f.startLine && lineNum <= f.endLine) || null;
  };
  
  let stack = [{
    functionName: 'main',
    line: activeLine || 1,
    params: {},
    name: 'main()',
    file: 'main.cpp'
  }];
  
  let currentLocalVars = [];
  
  for (let i = 0; i <= stepIndex; i++) {
    const exp = explanations[i];
    if (!exp) continue;
    
    const lineNum = exp.line;
    const text = exp.text || '';
    
    const parsedVars = {};
    const varRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*(?:\[[a-zA-Z0-9_]+\])?)\s*(?:=|este|devine)\s*([0-9-]+|"[^"]*"|'[^']'|true|false)\b/g;
    let match;
    while ((match = varRegex.exec(text)) !== null) {
      parsedVars[match[1]] = match[2];
    }
    
    const func = getFuncForLine(lineNum);
    
    if (!func || func.name === 'main') {
      stack = [{
        functionName: 'main',
        line: lineNum,
        params: parsedVars,
        name: 'main()',
        file: 'main.cpp'
      }];
    } else {
      if (stack.length === 0 || stack[0].functionName !== 'main') {
        stack.unshift({
          functionName: 'main',
          line: 1,
          params: {},
          name: 'main()',
          file: 'main.cpp'
        });
      }
      
      const isRecursiveCall = (text.match(/apelăm\s+recursiv|apelăm\s+funcția|apel\s+|intrăm\s+în\s+noul|intrăm\s+în|apelam\s+recursiv|apelam/i) || 
                              (text.includes(func.name) && lineNum === func.startLine)) &&
                              text.toLowerCase().includes(func.name.toLowerCase());
      const isReturn = text.match(/revenim\s+în|întoarcem|returnăm|return|backtrack|revenim|intoarcem|returnam/i);
      
      const topFrame = stack[stack.length - 1];
      
      if (topFrame.functionName !== func.name) {
        if (isReturn) {
          while (stack.length > 1 && stack[stack.length - 1].functionName !== func.name) {
            stack.pop();
          }
          if (stack.length > 1) {
            stack[stack.length - 1].line = lineNum;
            Object.assign(stack[stack.length - 1].params, parsedVars);
          }
        } else {
          stack.push({
            functionName: func.name,
            line: lineNum,
            params: parsedVars,
            name: `${func.name}()`,
            file: 'solution.cpp'
          });
        }
      } else {
        if (isRecursiveCall) {
          stack.push({
            functionName: func.name,
            line: lineNum,
            params: parsedVars,
            name: `${func.name}()`,
            file: 'solution.cpp'
          });
        } else if (isReturn && stack.length > 2) {
          stack.pop();
          stack[stack.length - 1].line = lineNum;
          Object.assign(stack[stack.length - 1].params, parsedVars);
        } else {
          topFrame.line = lineNum;
          Object.assign(topFrame.params, parsedVars);
        }
      }
    }
    
    stack.forEach(frame => {
      const fInfo = functions.find(f => f.name === frame.functionName);
      if (fInfo && fInfo.name !== 'main') {
        const paramStrings = fInfo.params.map(pName => {
          const val = frame.params[pName] !== undefined ? frame.params[pName] : pName;
          return `${pName} = ${val}`;
        });
        frame.name = `${fInfo.name}(${paramStrings.join(', ')})`;
      } else {
        frame.name = 'main()';
      }
    });
    
    if (i === stepIndex) {
      const activeFrame = stack[stack.length - 1];
      currentLocalVars = Object.entries(activeFrame.params).map(([name, val]) => {
        const type = isNaN(val) ? (val === 'true' || val === 'false' ? 'bool' : 'std::string') : 'int';
        return { name, type, val, expandable: false };
      });
    }
  }
  
  let inlineVal = null;
  if (currentLocalVars.length > 0 && activeLine) {
    inlineVal = currentLocalVars.map(v => `${v.name}: ${v.val}`).join(', ');
  }
  
  return {
    vars: currentLocalVars,
  frames: [...stack].reverse(),
    inlineVal
  };
};

// Extractor of CLion Debugger state (Variables, Stack Frames, Inline Variables)
const getCategoryDebuggerState = (category, stepIndex, activeLine, explanationText) => {
  const vars = [];
  const globalVars = [];
  const frames = [];
  let inlineVal = null;

  const data = mockCategoryData[category];
  if (data?.debugger?.getDebuggerState) {
    const res = data.debugger.getDebuggerState(stepIndex, activeLine, explanationText);
    if (res) {
      if (!res.globalVars || res.globalVars.length === 0) {
        res.globalVars = getCategoryGlobalVars(category, stepIndex, activeLine, explanationText);
      }
      return res;
    }
  }

  // Fallback to dynamic simulated engine for categories without custom debugger state
  const dynamicState = getDynamicCallStackAndVars(category, stepIndex, activeLine, explanationText);
  vars.push(...dynamicState.vars);
  frames.push(...dynamicState.frames);
  inlineVal = dynamicState.inlineVal;

  if (globalVars.length === 0) {
    globalVars.push(...getCategoryGlobalVars(category, stepIndex, activeLine, explanationText));
  }

  return { vars, globalVars, frames, inlineVal };
};

const getInlineValueForLine = (category, stepIndex, lineNum) => {
  const data = mockCategoryData[category];
  if (data?.debugger?.getInlineValueForLine) {
    return data.debugger.getInlineValueForLine(stepIndex, lineNum);
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

  const renderVariable = (v) => {
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
            {v.name === 'parent' && [0, 1, 2, 3, 4, 5].map((parentVal, idx) => (
               <div key={idx} style={{ padding: '2px 4px', display: 'flex', gap: '4px' }}>
                 <span style={{ color: 'rgba(255,255,255,0.3)', width: '12px' }}></span>
                 <span style={{ color: '#e06c75' }}>[{idx}]</span>: <span style={{ color: '#a9b7c6' }}>{parentVal}</span>
               </div>
            ))}
            {v.name === 'rank' && [0, 0, 0, 0, 0, 0].map((rankVal, idx) => (
               <div key={idx} style={{ padding: '2px 4px', display: 'flex', gap: '4px' }}>
                 <span style={{ color: 'rgba(255,255,255,0.3)', width: '12px' }}></span>
                 <span style={{ color: '#e06c75' }}>[{idx}]</span>: <span style={{ color: '#a9b7c6' }}>{rankVal}</span>
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
  };

  const currentExplanation = explanations[currentStepIndex];
  const graphVisual = currentExplanation?.graphVisual || data?.debugger?.getGraphVisual?.(currentStepIndex);
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

  const renderStateVisualizer = (isLarge = false) => {
    const mx = currentExplanation?.matrix;
    const mxData = mx ? (mx.data || mx.rows || []) : [];
    
    // Matrix styling
    const hasRowHeader = mx && mx.headers && (mx.headers[0] === '' || mx.headers[0] === 'R/C');

    const renderMatrix = () => {
      if (!currentExplanation?.matrix) return null;
      return (
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: isLarge ? '450px' : '260px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: isLarge ? '12px' : '10px', color: '#7c9cbf', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {mx.title || 'DP Matrix'}
          </div>
          <table style={{ borderCollapse: 'separate', borderSpacing: '2px', fontSize: isLarge ? '14px' : '12px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            {mx.headers && mx.headers.length > 0 && (
              <thead>
                <tr>
                  {mx.headers.map((h, i) => (
                    <th key={i} style={{
                      padding: isLarge ? '8px 12px' : '5px 8px',
                      background: i === 0 ? '#1a1b1c' : '#252629',
                      color: i === 0 ? '#555' : '#ffc66d',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      border: '1px solid #2b2d30',
                      minWidth: isLarge ? '38px' : '28px',
                      fontSize: isLarge ? '12px' : '11px',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {mxData.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => {
                    const cellVal = cell && typeof cell === 'object' ? cell.val : cell;
                    const isEmpty = cellVal === '' || cellVal === null || cellVal === undefined;
                    const isActive = mx.activeCells?.some(ac => ac.r === r && ac.c === c);
                    const isHighlight = mx.highlightCells?.some(hc => hc.r === r && hc.c === c);
                    const isRowHeader = c === 0 && hasRowHeader;
                    let bg, color, border, shadow;
                    if (isActive) {
                      bg = 'rgba(53, 116, 240, 0.25)'; color = '#56a8f5'; border = '1px solid #3574f0'; shadow = '0 0 8px rgba(53,116,240,0.4)';
                    } else if (isHighlight) {
                      bg = 'rgba(245, 166, 35, 0.2)'; color = '#f5a623'; border = '1px solid rgba(245,166,35,0.5)'; shadow = '0 0 6px rgba(245,166,35,0.3)';
                    } else if (isRowHeader) {
                      bg = '#252629'; color = '#ffc66d'; border = '1px solid #2b2d30'; shadow = 'none';
                    } else {
                      bg = '#1a1b1c'; color = isEmpty ? '#333' : '#a9b7c6'; border = '1px solid #252629'; shadow = 'none';
                    }
                    return (
                      <td key={c} style={{
                        padding: isLarge ? '8px 12px' : '5px 8px', minWidth: isLarge ? '38px' : '28px', height: isLarge ? '38px' : '28px',
                        background: bg, color: color, border: border,
                        borderRadius: '4px', fontWeight: isActive || isHighlight || isRowHeader ? 'bold' : 'normal',
                        boxShadow: shadow, transition: 'all 0.25s ease',
                      }}>
                        {isEmpty ? '·' : cellVal}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const renderBlocksVisual = () => {
      if (!currentExplanation?.blocksVisual) return null;
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: isLarge ? '16px' : '10px', alignItems: 'center', width: '100%' }}>
          {currentExplanation.blocksVisual.map((row, rIdx) => {
            const indexedPattern = /^(.+)\[(\d+)\]:\s*(.+)$/;
            const firstGroup = row.groups[0] || [];
            const isIndexedArray = firstGroup.length > 0 && firstGroup.every(b => indexedPattern.test(String(b.val)));

            if (isIndexedArray) {
              const parsed = firstGroup.map(b => {
                const m = String(b.val).match(indexedPattern);
                return { arrayName: m[1], index: m[2], value: m[3], active: b.active, sorted: b.sorted, hidden: b.hidden };
              });
              const arrayName = parsed[0].arrayName;
              const otherGroups = row.groups.slice(1);
              return (
                <div key={rIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isLarge ? '12px' : '8px', width: '100%' }}>
                  {row.label && <span style={{ color: '#7c9cbf', fontSize: isLarge ? '13px' : '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{row.label}</span>}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: isLarge ? '12px' : '8px' }}>
                    <span style={{ color: '#7c9cbf', fontSize: isLarge ? '14px' : '12px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', paddingBottom: isLarge ? '8px' : '6px', flexShrink: 0 }}>
                      {arrayName}:
                    </span>
                    <div style={{ display: 'flex', gap: '3px', background: '#141517', padding: isLarge ? '8px' : '5px', borderRadius: '8px', border: '1px solid #2b2d30', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)' }}>
                      {parsed.map((entry, eIdx) => (
                        <div key={eIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                          <span style={{ fontSize: isLarge ? '10px' : '9px', color: '#404552', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{entry.index}</span>
                          <div style={{
                            minWidth: isLarge ? '40px' : '30px', padding: '0 4px', height: isLarge ? '40px' : '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: entry.active ? 'linear-gradient(135deg, #2860c8, #3574f0)' : (entry.sorted ? 'linear-gradient(135deg, #4a9a5a, #59a869)' : '#1e1f22'),
                            border: `1px solid ${entry.active ? '#56a8f5' : (entry.sorted ? '#59a869' : '#3c3f41')}`,
                            borderRadius: '5px', color: entry.active || entry.sorted ? '#fff' : '#a9b7c6',
                            fontWeight: 'bold', fontSize: isLarge ? '14px' : '12px', fontFamily: 'var(--font-mono)',
                            transition: 'all 0.25s ease',
                            opacity: entry.hidden ? 0.15 : 1,
                            boxShadow: entry.active ? '0 0 10px rgba(53,116,240,0.6)' : (entry.sorted ? '0 0 6px rgba(89,168,105,0.4)' : 'none'),
                            transform: entry.active ? 'scaleY(1.05)' : 'scaleY(1)',
                          }}>
                            {entry.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {otherGroups.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {otherGroups.map((group, gIdx) => (
                        <div key={gIdx} style={{ display: 'flex', gap: '4px', background: '#141517', padding: '4px 6px', borderRadius: '6px', border: '1px solid #2b2d30' }}>
                          {group.map((block, bIdx) => (
                            <div key={bIdx} style={{
                              minWidth: isLarge ? '42px' : '32px', padding: '0 10px', height: isLarge ? '38px' : '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: block.active ? 'rgba(53,116,240,0.15)' : 'transparent',
                              border: `1px solid ${block.active ? '#3574f0' : '#3c3f41'}`,
                              borderRadius: '5px', color: block.active ? '#56a8f5' : '#8b949e',
                              fontWeight: 'bold', fontSize: isLarge ? '14px' : '12px', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap'
                            }}>
                              {block.val}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const labelLower = (row.label || '').toLowerCase();
            const isStack = labelLower.includes('top') || labelLower.includes('stack') || labelLower.includes('bot') || labelLower.includes('stiv') || labelLower.includes('apelur') || labelLower.includes('push') || labelLower.includes('pop') || labelLower.includes('vârf') || labelLower.includes('varf') || (category && category.toLowerCase().includes('stack'));
            const isQueue = labelLower.includes('front') || labelLower.includes('queue') || labelLower.includes('back') || labelLower.includes('coada') || labelLower.includes('deque') || labelLower.includes('dq') || (category && (category.toLowerCase().includes('queue') || category.toLowerCase().includes('deque')));

            return (
              <div key={rIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '100%' }}>
                {row.label && (
                  <span style={{
                    color: isStack ? '#cc7832' : isQueue ? '#b378ba' : '#7c9cbf',
                    fontSize: isLarge ? '12px' : '10px', fontWeight: 'bold', fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    {isStack ? '▲ ' : isQueue ? '⟶ ' : ''}{row.label}
                  </span>
                )}
                <div style={{ display: 'flex', gap: '4px', flexWrap: isStack ? 'nowrap' : 'wrap', justifyContent: 'center', flexDirection: isStack ? 'column-reverse' : 'row', width: isStack ? '100%' : 'auto' }}>
                  {row.groups.map((group, gIdx) => (
                    <div key={gIdx} style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '3px',
                      background: isStack ? 'linear-gradient(135deg,#1a1b1e,#23252a)' : '#141517',
                      padding: isStack ? (isLarge ? '10px 14px' : '6px 10px') : (isLarge ? '8px' : '5px'),
                      borderRadius: '6px',
                      border: `1px solid ${isStack ? '#cc7832' : isQueue ? '#b378ba' : '#2b2d30'}`,
                      boxShadow: isStack ? '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)' : isQueue ? '0 0 8px rgba(179,120,186,0.15)' : 'none',
                      width: isStack ? '100%' : 'auto',
                      alignItems: 'center',
                    }}>
                      {isStack && <span style={{ color: '#666', marginRight: '6px', fontSize: '9px', flexShrink: 0 }}>⊞</span>}
                      {group.map((block, bIdx) => (
                        <div key={bIdx} style={{
                          flex: isStack ? 1 : 'none',
                          minWidth: isLarge ? '46px' : '36px', padding: isLarge ? '4px 12px' : '2px 8px', height: isLarge ? '38px' : '30px', display: 'flex', alignItems: 'center', justifyContent: isStack ? 'flex-start' : 'center',
                          background: block.active ? 'linear-gradient(135deg,#2860c8,#3574f0)' : (block.sorted ? 'linear-gradient(135deg,#4a9a5a,#59a869)' : 'transparent'),
                          border: `1px solid ${block.active ? '#56a8f5' : (block.sorted ? '#59a869' : 'transparent')}`,
                          borderRadius: '4px', color: block.active ? '#fff' : block.sorted ? '#fff' : isStack ? '#cc9a4a' : '#a9b7c6',
                          fontWeight: block.active || isStack ? 'bold' : 'normal', fontSize: isStack ? (isLarge ? '14px' : '12px') : (isLarge ? '15px' : '13px'), fontFamily: 'var(--font-mono)',
                          transition: 'all 0.25s ease',
                          opacity: block.hidden ? 0.15 : 1,
                          boxShadow: block.active ? '0 0 10px rgba(53,116,240,0.6)' : (block.sorted ? '0 0 6px rgba(89,168,105,0.4)' : 'none'),
                          whiteSpace: 'nowrap',
                        }}>
                          {block.val}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const renderGraphVisual = () => {
      if (!graphVisual) return null;
      const gv = graphVisual;
      const nodes = gv.nodes;
      if (!nodes || nodes.length === 0) return null;

      const fenwickLayout = {
        '8': {x:200,y:22}, '4':{x:90,y:78}, '10':{x:330,y:78},
        '2':{x:38,y:134}, '6':{x:150,y:134}, '9':{x:315,y:134},
        '1':{x:12,y:190}, '3':{x:70,y:190}, '5':{x:128,y:190}, '7':{x:190,y:190},
      };
      const isFenwick = nodes.length >= 8 && nodes.every(n => fenwickLayout[n.id]);

      const xs = nodes.map(n => n.x); const ys = nodes.map(n => n.y);
      const minX = Math.min(...xs), maxX = Math.max(...xs);
      const minY = Math.min(...ys), maxY = Math.max(...ys);
      const pad = isLarge ? 36 : 28;
      const svgW = isLarge ? (isFenwick ? 580 : 500) : (isFenwick ? 390 : 340);
      const svgH = isLarge ? (isFenwick ? 300 : 320) : (isFenwick ? 210 : 220);
      const rangeX = maxX - minX || 1, rangeY = maxY - minY || 1;
      const scaleX = (svgW - 2*pad) / rangeX;
      const scaleY = (svgH - 2*pad) / rangeY;
      const scale = Math.min(scaleX, scaleY);
      const nodeR = isLarge ? 22 : 16;

      const isDirected = (() => {
        if (gv && typeof gv.directed === 'boolean') return gv.directed;
        if (!category) return true;
        const lower = category.toLowerCase();
        if (lower.includes('basics') ||
            lower.includes('dfs') ||
            lower.includes('bfs') ||
            lower.includes('mst') ||
            lower.includes('lca') ||
            lower.includes('tree')) {
          return false;
        }
        return true;
      })();

      const getX = n => isFenwick 
        ? (isLarge ? fenwickLayout[n.id].x * 1.45 : fenwickLayout[n.id].x) 
        : (pad + (n.x - minX)*scale + (svgW - 2*pad - rangeX*scale)/2);
      const getY = n => isFenwick 
        ? (isLarge ? fenwickLayout[n.id].y * 1.45 : fenwickLayout[n.id].y) 
        : (pad + (n.y - minY)*scale + (svgH - 2*pad - rangeY*scale)/2);

      const markerId = `gv_${nodes.map(n=>n.id).join('')}`.replace(/[^a-zA-Z0-9_]/g,'_').slice(0,20);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: '#555d6b', fontSize: isLarge ? '12px' : '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {gv.title || (() => {
              if (isFenwick) return 'Dependențe AIB';
              const lowerCat = category ? category.toLowerCase() : '';
              if (lowerCat.includes('segment_trees')) return 'Arbore de Intervale';
              if (lowerCat.includes('trees_graphs')) return 'Arbore / DP pe Arbori';
              if (lowerCat.includes('tree')) return 'Structură de Arbore';
              return isDirected ? 'Graf Orientat' : 'Graf Neorientat';
            })()}
          </span>
          <div style={{ position: 'relative', width: `${svgW}px`, height: `${svgH}px`, flexShrink: 0 }}>
            <svg width={svgW} height={svgH} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
              <defs>
                <marker id={`${markerId}_a`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#3574f0" />
                </marker>
                <marker id={`${markerId}_n`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="rgba(255,255,255,0.22)" />
                </marker>
                <marker id={`${markerId}_v`} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <polygon points="0 0, 8 4, 0 8" fill="#59a869" />
                </marker>
              </defs>
              {gv.edges?.map((edge, i) => {
                const n1 = nodes.find(n => n.id === edge.source);
                const n2 = nodes.find(n => n.id === edge.target);
                if (!n1 || !n2) return null;
                const x1=getX(n1), y1=getY(n1), x2=getX(n2), y2=getY(n2);
                const dx=x2-x1, dy=y2-y1;
                const len=Math.sqrt(dx*dx+dy*dy)||1;
                const ux=dx/len, uy=dy/len;
                const sx=x1+ux*nodeR, sy=y1+uy*nodeR;
                const targetPadding = isDirected ? (nodeR + 6) : nodeR;
                const ex=x2-ux*targetPadding, ey=y2-uy*targetPadding;
                const mx2=(sx+ex)/2, my2=(sy+ey)/2;
                const isActive = edge.active;
                const n2isVisited = n2.state === 'visited';
                const markerRef = isActive ? `url(#${markerId}_a)` : (n2isVisited ? `url(#${markerId}_v)` : `url(#${markerId}_n)`);
                const strokeColor = isActive ? '#3574f0' : (n2isVisited ? '#59a869' : 'rgba(255,255,255,0.15)');
                return (
                  <g key={i}>
                    <line x1={sx} y1={sy} x2={ex} y2={ey}
                      stroke={strokeColor} strokeWidth={isActive ? 2.5 : 1.5}
                      markerEnd={isDirected ? markerRef : undefined}
                    />
                    {edge.weight != null && (
                      <text x={mx2} y={my2} textAnchor="middle" dominantBaseline="central"
                        fontSize={isLarge ? '11px' : '9px'} fontWeight="bold" fill={isActive ? '#ffc66d' : '#555d6b'}
                        fontFamily="var(--font-mono)"
                        style={{ paintOrder: 'stroke', stroke: '#1e1f22', strokeWidth: '3' }}
                      >{edge.weight}</text>
                    )}
                  </g>
                );
              })}
            </svg>
            {nodes.map(node => {
              const isNodeActive = node.state === 'active' || node.active;
              const isVisited = node.state === 'visited';
              let bg = '#1e1f22', border = '#3c3f41', color = '#a9b7c6', shadow = 'none';
              if (isNodeActive) { bg = 'linear-gradient(135deg,#2860c8,#3574f0)'; border = '#56a8f5'; color = '#fff'; shadow = '0 0 14px rgba(53,116,240,0.7)'; }
              else if (isVisited) { bg = 'linear-gradient(135deg,#4a9a5a,#59a869)'; border = '#59a869'; color = '#fff'; shadow = '0 0 8px rgba(89,168,105,0.5)'; }
              const cx = getX(node), cy = getY(node);
              return (
                <div key={node.id} style={{ position: 'absolute', left: `${cx}px`, top: `${cy}px`, transform: 'translate(-50%,-50%)', width: `${nodeR*2}px`, height: `${nodeR*2}px`, zIndex: 2 }}>
                  {node.desc && (
                    <div style={{ position:'absolute', top:'-15px', left:'50%', transform:'translateX(-50%)', fontSize: isLarge ? '10px' : '8px', color:'#8c929e', fontFamily:'var(--font-mono)', fontWeight:'bold', whiteSpace:'nowrap', pointerEvents:'none' }}>{node.desc}</div>
                  )}
                  <div style={{ width:'100%', height:'100%', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: bg, border:`2px solid ${border}`, color, fontWeight:'bold', fontSize: isLarge ? '13px' : '11px', transition:'all 0.25s ease', boxShadow: shadow }}>
                    {node.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const renderAsciiVisual = () => {
      if (!currentExplanation?.visual) return null;
      const raw = typeof currentExplanation.visual === 'string' ? currentExplanation.visual : String(currentExplanation.visual);
      const colored = raw.replace(/[┌┐└┘├┤┬┴┼│─╔╗╚╝╠╣╦╩╬║═╳×]/g, c => `<span style="color:#3d8fd1;opacity:0.85">${c}</span>`)
        .replace(/\b(\d+)\b/g, '<span style="color:#ffc66d;font-weight:bold">$1</span>')
        .replace(/\b(TOP|BOTTOM|BOT|FRONT|BACK|PUSH|POP|LIFO|FIFO)\b/g, '<span style="color:#cc7832;font-weight:bold">$1</span>')
        .replace(/(←|→|↑|↓|⬆|⬇|✓|✗|↶|↷)/g, '<span style="color:#59a869">$1</span>')
        .replace(/\(([^)]+)\)/g, '(<span style="color:#b378ba">$1</span>)');
      return (
        <div style={{
          width: '100%',
          background: 'linear-gradient(135deg,#141517,#18191c)',
          border: '1px solid #2b2d30',
          borderRadius: '8px',
          padding: isLarge ? '18px 20px' : '12px 14px',
          fontSize: isLarge ? '15px' : '13px',
          lineHeight: '1.7',
          fontFamily: 'var(--font-mono)',
          color: '#6aab73',
          whiteSpace: 'pre-wrap',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.3)',
          overflowX: 'auto',
        }} dangerouslySetInnerHTML={{ __html: colored }} />
      );
    };

    const hasVisual = currentExplanation?.matrix || currentExplanation?.blocksVisual || graphVisual || currentExplanation?.visual;

    if (!hasVisual) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: 0.4, padding: '20px 0' }}>
          <div style={{ fontSize: isLarge ? '36px' : '28px', filter: 'grayscale(1)' }}>🖼️</div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: isLarge ? '14px' : '12px', textAlign: 'center' }}>
            Vizualizare indisponibilă
          </span>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', gap: '16px', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: (currentExplanation?.blocksVisual && graphVisual) ? 'column' : 'row', flexWrap: 'wrap' }}>
        {renderMatrix()}
        {renderBlocksVisual()}
        {renderGraphVisual()}
        {renderAsciiVisual()}
      </div>
    );
  };


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
                  const inlineVarVal = getInlineValueForLine(category, currentStepIndex, lineNum) || (isActive ? debugState.inlineVal : null);
                  
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
                  {(category.includes('Math/') || category.includes('Geometry/')) && (
                    <button
                      onClick={() => setActiveTab('visualizer')}
                      style={{
                        background: activeTab === 'visualizer' ? '#1e1f22' : 'transparent',
                        border: 'none',
                        borderRight: '1px solid #3c3f41',
                        color: activeTab === 'visualizer' ? '#fff' : '#a9b7c6',
                        padding: '0 16px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ color: activeTab === 'visualizer' ? '#b378ba' : '#888' }}>🔬</span> Vizualizator
                    </button>
                  )}
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
                          minWidth: '300px', 
                          background: 'linear-gradient(145deg, #18191c, #1e1f22)',
                          padding: '14px', 
                          borderRadius: '8px', 
                          border: '1px solid #2f3136',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: '220px',
                          gap: '12px',
                        }}>
                          {/* Panel title */}
                          <div style={{ fontSize: '10px', color: '#555d6b', fontWeight: '700', alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#3574f0', boxShadow: '0 0 6px #3574f0' }} />
                            State Visualizer
                          </div>

                          {renderStateVisualizer(false)}
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

                      {/* Restructured debugger content: Call Stack Row & Variables Row */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                        
                        {/* Call Stack - Compact horizontal full-width row */}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', borderBottom: '1px solid #2b2d30', paddingBottom: '12px', marginBottom: '4px' }}>
                          <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Frames (Call Stack)
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexWrap: 'wrap', overflowX: 'auto', padding: '4px 0' }}>
                            {debugState.frames.map((frame, index) => (
                              <div 
                                key={index} 
                                style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: '6px', 
                                  padding: '4px 10px', 
                                  background: index === 0 ? '#1e293b' : 'transparent',
                                  border: index === 0 ? '1px solid #3574f0' : '1px solid #1e2030',
                                  color: index === 0 ? '#fff' : '#a9b7c6',
                                  fontSize: '12px',
                                  fontFamily: 'var(--font-mono)',
                                  borderRadius: '6px',
                                  boxShadow: index === 0 ? '0 2px 8px rgba(53, 116, 240, 0.2)' : 'none'
                                }}
                              >
                                <span style={{ color: index === 0 ? '#3574f0' : '#888' }}>⊞</span>
                                <span style={{ fontWeight: index === 0 ? '600' : 'normal' }}>{frame.name}</span>
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>{frame.file}:{frame.line}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Variables: Local & Global side-by-side */}
                        <div style={{ display: 'flex', gap: '20px', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                          {/* Local Variables Column */}
                          <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Local Variables
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, gap: '2px', maxHeight: '220px' }}>
                              {debugState.vars && debugState.vars.length > 0 ? (
                                debugState.vars.map(v => renderVariable(v))
                              ) : (
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontSize: '13px' }}>
                                  No local variables active
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Global Variables Column */}
                          <div style={{ flex: 1, minWidth: '240px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '11px', color: '#888', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Global Variables
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, gap: '2px', maxHeight: '220px' }}>
                              {debugState.globalVars && debugState.globalVars.length > 0 ? (
                                debugState.globalVars.map(v => renderVariable(v))
                              ) : (
                                <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', fontSize: '13px' }}>
                                  No global variables active
                                </span>
                              )}
                            </div>
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

                  {activeTab === 'visualizer' && (() => {
                    const catKey = category;
                    const isMathOrGeo = category.includes('Math/') || category.includes('Geometry/');
                    if (isMathOrGeo) {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', padding: '4px 0' }}>
                          <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            🔬 Vizualizator Matematic — Pas {currentStepIndex + 1}
                          </div>

                          {/* NUMBER THEORY: Sieve Grid */}
                          {catKey.includes('Number_Theory') && (() => {
                            const eliminated = new Set([4,6,8,9,10,12,14,15,16,18,20]);
                            // based on step, some are active
                            const activelyEliminating = [];
                            if (currentStepIndex >= 4 && currentStepIndex <= 13) {
                              const multiples2 = [4,6,8,10,12,14,16,18,20];
                              for (let i = 0; i <= currentStepIndex - 4; i++) activelyEliminating.push(multiples2[i]);
                            }
                            if (currentStepIndex >= 16 && currentStepIndex <= 20) {
                              const multiples3 = [9,12,15,18];
                              for (let i = 0; i <= currentStepIndex - 16; i++) activelyEliminating.push(multiples3[i]);
                            }
                            const confirmed = currentStepIndex >= 3 ? [2] : [];
                            if (currentStepIndex >= 15) confirmed.push(3);
                            if (currentStepIndex >= 25) confirmed.push(5,7,11,13,17,19);
                            const nums = Array.from({length: 19}, (_, i) => i + 2);
                            return (
                              <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '16px' }}>
                                <div style={{ fontSize: '11px', color: '#b378ba', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  🔢 Ciurul lui Eratostene — N = 20
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-start' }}>
                                  {nums.map(n => {
                                    const isPrime = !eliminated.has(n);
                                    const isBeingElim = activelyEliminating.includes(n);
                                    const isConfirmed = confirmed.includes(n);
                                    let bg = '#1e1f22', border = '#3c3f41', color = '#a9b7c6', shadow = 'none';
                                    if (isBeingElim) { bg = 'rgba(219, 88, 96, 0.3)'; border = '#db5860'; color = '#ff8b8b'; shadow = '0 0 8px rgba(219,88,96,0.4)'; }
                                    else if (isConfirmed) { bg = 'linear-gradient(135deg,#4a9a5a,#59a869)'; border = '#59a869'; color = '#fff'; shadow = '0 0 10px rgba(89,168,105,0.5)'; }
                                    else if (!isPrime) { bg = '#141517'; border = '#252629'; color = '#444'; }
                                    return (
                                      <div key={n} style={{
                                        width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: bg, border: `2px solid ${border}`, borderRadius: '8px',
                                        color, fontWeight: 'bold', fontSize: '14px', fontFamily: 'var(--font-mono)',
                                        boxShadow: shadow, transition: 'all 0.3s ease',
                                        textDecoration: (!isPrime && !isBeingElim) ? 'line-through' : 'none',
                                        opacity: (!isPrime && !isBeingElim) ? 0.4 : 1,
                                      }}>
                                        {n}
                                      </div>
                                    );
                                  })}
                                </div>
                                <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '11px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'linear-gradient(135deg,#4a9a5a,#59a869)' }} />
                                    <span style={{ color: '#aaa' }}>Prime confirmat</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'rgba(219,88,96,0.4)', border: '1px solid #db5860' }} />
                                    <span style={{ color: '#aaa' }}>Eliminat (compus)</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          {/* COMBINATORICS: Pascal Triangle visual */}
                          {catKey.includes('Combinatorics') && (() => {
                            const triangle = [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]];
                            const maxRow = Math.min(currentStepIndex < 3 ? 0 : currentStepIndex < 6 ? 1 : currentStepIndex < 11 ? 2 : currentStepIndex < 16 ? 3 : 4, 4);
                            return (
                              <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div style={{ fontSize: '11px', color: '#b378ba', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  🔺 Triunghiul lui Pascal — C(N, K)
                                </div>
                                {triangle.slice(0, maxRow + 1).map((row, rIdx) => (
                                  <div key={rIdx} style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                    {row.map((val, cIdx) => {
                                      const isNew = rIdx === maxRow;
                                      return (
                                        <div key={cIdx} style={{
                                          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          background: isNew ? 'linear-gradient(135deg,#2860c8,#3574f0)' : 'linear-gradient(135deg,#252629,#2b2d30)',
                                          border: `2px solid ${isNew ? '#56a8f5' : '#3c3f41'}`,
                                          borderRadius: '8px', color: isNew ? '#fff' : '#a9b7c6',
                                          fontWeight: 'bold', fontSize: '14px', fontFamily: 'var(--font-mono)',
                                          boxShadow: isNew ? '0 0 12px rgba(53,116,240,0.5)' : 'none',
                                          transition: 'all 0.3s ease',
                                        }}>
                                          {val}
                                        </div>
                                      );
                                    })}
                                  </div>
                                ))}
                                <div style={{ marginTop: '6px', fontSize: '11px', color: '#555', fontFamily: 'var(--font-mono)' }}>
                                  C(N,K) = C(N-1,K-1) + C(N-1,K)
                                </div>
                              </div>
                            );
                          })()}

                          {/* COMPUTATIONAL GEOMETRY: Coordinate plane */}
                          {catKey.includes('Computational') && (() => {
                            const pts = { A: {x:1,y:1}, B: {x:3,y:3} };
                            const testPoints = [
                              { name: 'C_Coliniar', x: 5, y: 5, cp: 0, color: '#ffc66d' },
                              { name: 'C_Stanga', x: 2, y: 4, cp: 4, color: '#59a869' },
                              { name: 'C_Dreapta', x: 4, y: 2, cp: -4, color: '#db5860' },
                            ];
                            const activePtIdx = currentStepIndex <= 8 ? 0 : currentStepIndex <= 14 ? 1 : 2;
                            const activeTestPt = testPoints[activePtIdx];
                            const svgSize = 200;
                            const scale = 32;
                            const originX = 20, originY = svgSize - 20;
                            const toSvg = (x, y) => ({ sx: originX + x * scale, sy: originY - y * scale });
                            const ptA = toSvg(pts.A.x, pts.A.y);
                            const ptB = toSvg(pts.B.x, pts.B.y);
                            const ptC = toSvg(activeTestPt.x, activeTestPt.y);
                            return (
                              <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                <div style={{ fontSize: '11px', color: '#b378ba', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  📐 Cross Product — Plan 2D
                                </div>
                                <svg width={svgSize} height={svgSize} style={{ background: '#0f1012', borderRadius: '8px', border: '1px solid #2b2d30' }}>
                                  {/* Grid */}
                                  {[1,2,3,4,5].map(i => (
                                    <g key={i}>
                                      <line x1={originX + i*scale} y1={0} x2={originX + i*scale} y2={svgSize} stroke="#1e1f22" strokeWidth="1"/>
                                      <line x1={0} y1={originY - i*scale} x2={svgSize} y2={originY - i*scale} stroke="#1e1f22" strokeWidth="1"/>
                                      <text x={originX + i*scale} y={originY + 12} textAnchor="middle" fontSize="8" fill="#444" fontFamily="var(--font-mono)">{i}</text>
                                      <text x={originX - 12} y={originY - i*scale + 3} textAnchor="middle" fontSize="8" fill="#444" fontFamily="var(--font-mono)">{i}</text>
                                    </g>
                                  ))}
                                  {/* Axes */}
                                  <line x1={originX} y1={0} x2={originX} y2={svgSize} stroke="#333" strokeWidth="1.5"/>
                                  <line x1={0} y1={originY} x2={svgSize} y2={originY} stroke="#333" strokeWidth="1.5"/>
                                  {/* Edge AB */}
                                  <line x1={ptA.sx} y1={ptA.sy} x2={ptB.sx} y2={ptB.sy} stroke="#3574f0" strokeWidth="2" markerEnd="url(#arr2d)"/>
                                  {/* Edge AC */}
                                  <line x1={ptA.sx} y1={ptA.sy} x2={ptC.sx} y2={ptC.sy} stroke={activeTestPt.color} strokeWidth="2" strokeDasharray="4,2"/>
                                  {/* Defs */}
                                  <defs>
                                    <marker id="arr2d" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                                      <polygon points="0 0, 8 4, 0 8" fill="#3574f0"/>
                                    </marker>
                                  </defs>
                                  {/* Points */}
                                  <circle cx={ptA.sx} cy={ptA.sy} r="5" fill="#56a8f5" stroke="#fff" strokeWidth="1"/>
                                  <text x={ptA.sx+6} y={ptA.sy-6} fontSize="9" fill="#56a8f5" fontFamily="var(--font-mono)">A(1,1)</text>
                                  <circle cx={ptB.sx} cy={ptB.sy} r="5" fill="#56a8f5" stroke="#fff" strokeWidth="1"/>
                                  <text x={ptB.sx+6} y={ptB.sy-6} fontSize="9" fill="#56a8f5" fontFamily="var(--font-mono)">B(3,3)</text>
                                  <circle cx={ptC.sx} cy={ptC.sy} r="5" fill={activeTestPt.color} stroke="#fff" strokeWidth="1.5"/>
                                  <text x={ptC.sx+6} y={ptC.sy-6} fontSize="9" fill={activeTestPt.color} fontFamily="var(--font-mono)">{activeTestPt.name.replace('C_','C(').replace('Coliniar','5,5)').replace('Stanga','2,4)').replace('Dreapta','4,2)')}</text>
                                </svg>
                                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                  <div style={{ padding: '6px 12px', background: 'rgba(255,198,109,0.1)', border: '1px solid rgba(255,198,109,0.3)', borderRadius: '6px', color: '#ffc66d', fontFamily: 'var(--font-mono)' }}>
                                    CP = {activeTestPt.cp} {activeTestPt.cp === 0 ? '→ Coliniar' : activeTestPt.cp > 0 ? '→ Stânga (Anti-Orar)' : '→ Dreapta (Orar)'}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          {/* GAME THEORY: XOR visualization */}
                          {catKey.includes('Game_Theory') && (() => {
                            const stacks = [3, 4, 5];
                            const xorVals = [0, 3, 3^4, 3^4^5];
                            const xorStep = currentStepIndex <= 1 ? 0 : currentStepIndex === 2 ? 1 : currentStepIndex === 3 ? 2 : 3;
                            const nimSum = xorVals[xorStep];
                            return (
                              <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '16px' }}>
                                <div style={{ fontSize: '11px', color: '#b378ba', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  ♟️ Jocul Nim — Stive XOR
                                </div>
                                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '16px' }}>
                                  {stacks.map((s, idx) => {
                                    const isProcessed = xorStep > idx;
                                    const isCurrent = xorStep === idx + 1;
                                    return (
                                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ fontSize: '10px', color: '#888', fontFamily: 'var(--font-mono)' }}>Stiva {idx + 1}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '3px' }}>
                                          {Array.from({length: s}, (_, i) => (
                                            <div key={i} style={{
                                              width: '32px', height: '18px', borderRadius: '4px',
                                              background: isCurrent ? 'linear-gradient(135deg,#2860c8,#3574f0)' : isProcessed ? 'linear-gradient(135deg,#4a9a5a,#59a869)' : '#252629',
                                              border: `1px solid ${isCurrent ? '#56a8f5' : isProcessed ? '#59a869' : '#3c3f41'}`,
                                              transition: 'all 0.3s ease',
                                            }}/>
                                          ))}
                                        </div>
                                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: isProcessed || isCurrent ? '#fff' : '#666', fontFamily: 'var(--font-mono)' }}>{s}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div style={{ textAlign: 'center', padding: '10px', background: nimSum !== 0 ? 'rgba(89,168,105,0.15)' : 'rgba(219,88,96,0.15)', border: `1px solid ${nimSum !== 0 ? '#59a869' : '#db5860'}`, borderRadius: '8px' }}>
                                  <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'var(--font-mono)', color: nimSum !== 0 ? '#59a869' : '#db5860' }}>
                                    NimSum = {nimSum} ({nimSum.toString(2).padStart(4, '0')} binar)
                                  </div>
                                  <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                                    {nimSum !== 0 ? '✅ Primul jucător câștigă!' : '❌ Al doilea jucător câștigă!'}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          {/* ADVANCED MATH: GCD visualization */}
                          {catKey.includes('Math/Advanced') && (() => {
                            const pairs = [[34,21],[21,34],[13,21],[8,13],[5,8],[3,5],[2,3],[1,2],[0,1]];
                            const depth = Math.min(currentStepIndex, 8);
                            return (
                              <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '16px' }}>
                                <div style={{ fontSize: '11px', color: '#b378ba', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  🔄 Euclid Extins — Stivă Recursivă
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '260px', overflowY: 'auto' }}>
                                  {pairs.slice(0, depth + 1).map((pair, idx) => {
                                    const isTop = idx === depth;
                                    return (
                                      <div key={idx} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '6px 12px', borderRadius: '6px',
                                        background: isTop ? 'linear-gradient(135deg,rgba(53,116,240,0.2),rgba(53,116,240,0.1))' : 'rgba(255,255,255,0.02)',
                                        border: `1px solid ${isTop ? '#3574f0' : '#252629'}`,
                                        transition: 'all 0.25s ease',
                                      }}>
                                        <span style={{ color: '#666', fontSize: '9px', width: '14px' }}>⊞</span>
                                        <span style={{ color: isTop ? '#56a8f5' : '#888', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: isTop ? 'bold' : 'normal' }}>
                                          gcdExtended({pair[0]}, {pair[1]})
                                        </span>
                                        {isTop && <span style={{ color: '#3574f0', fontSize: '10px', marginLeft: 'auto' }}>← activ</span>}
                                      </div>
                                    );
                                  })}
                                  <div style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', border: '1px solid #1e1f22', opacity: 0.5 }}>
                                    <span style={{ color: '#555', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>main()</span>
                                  </div>
                                </div>
                                {currentStepIndex >= 10 && (
                                  <div style={{ marginTop: '10px', padding: '8px', background: 'rgba(89,168,105,0.1)', border: '1px solid #59a869', borderRadius: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                                    <span style={{ color: '#59a869' }}>✓ Revenire: </span>
                                    <span style={{ color: '#a9b7c6' }}>CMMDC = 1, a•x + b•y = 1</span>
                                  </div>
                                )}
                              </div>
                            );
                          })()}

                          {/* LINEAR ALGEBRA: Matrix visualization */}
                          {catKey.includes('Linear_Algebra') && (() => {
                            const matrices = [
                              { data: [['2.00','1.00','-1.00','8.00'],['-3.00','-1.00','2.00','-11.00'],['-2.00','1.00','2.00','-3.00']], activeRow: -1 },
                              { data: [['2.00','1.00','-1.00','8.00'],['-3.00','-1.00','2.00','-11.00'],['-2.00','1.00','2.00','-3.00']], activeRow: 1 },
                              { data: [['-3.00','-1.00','2.00','-11.00'],['2.00','1.00','-1.00','8.00'],['-2.00','1.00','2.00','-3.00']], activeRow: 0 },
                              { data: [['-3.00','-1.00','2.00','-11.00'],['0.00','0.33','0.33','-0.33'],['0.00','0.33','0.67','-10.33']], activeRow: -1 },
                            ];
                            const mIdx = Math.min(Math.floor(currentStepIndex / 5), 3);
                            const m = matrices[mIdx];
                            return (
                              <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '16px' }}>
                                <div style={{ fontSize: '11px', color: '#b378ba', fontWeight: 'bold', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  🔢 Eliminare Gaussiană — Forma Eșalonată
                                </div>
                                <div style={{ display: 'flex', gap: '6px', flexDirection: 'column', alignItems: 'center' }}>
                                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                    {['X1','X2','X3','C'].map(h => (
                                      <div key={h} style={{ width: '70px', textAlign: 'center', fontSize: '10px', color: '#ffc66d', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{h}</div>
                                    ))}
                                  </div>
                                  {m.data.map((row, rIdx) => (
                                    <div key={rIdx} style={{ display: 'flex', gap: '4px' }}>
                                      {row.map((cell, cIdx) => {
                                        const isActive = rIdx === m.activeRow;
                                        const isPivot = cIdx === rIdx && cell !== '0.00';
                                        return (
                                          <div key={cIdx} style={{
                                            width: '70px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: isPivot ? 'rgba(53,116,240,0.25)' : isActive ? 'rgba(245,166,35,0.15)' : cIdx === 3 ? '#252629' : '#1e1f22',
                                            border: `1px solid ${isPivot ? '#3574f0' : isActive ? '#f5a623' : '#2b2d30'}`,
                                            borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--font-mono)',
                                            color: isPivot ? '#56a8f5' : isActive ? '#f5a623' : cIdx === 3 ? '#ffc66d' : '#a9b7c6',
                                            fontWeight: isPivot ? 'bold' : 'normal',
                                            transition: 'all 0.3s ease',
                                          }}>
                                            {cell}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Default fallback for other Math topics */}
                          {!catKey.includes('Number_Theory') && !catKey.includes('Combinatorics') && !catKey.includes('Computational') && !catKey.includes('Game_Theory') && !catKey.includes('Math/Advanced') && !catKey.includes('Linear_Algebra') && (
                            <div style={{ background: 'linear-gradient(135deg,#141517,#18191c)', border: '1px solid #2b2d30', borderRadius: '10px', padding: '24px', textAlign: 'center', opacity: 0.6 }}>
                              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔢</div>
                              <div style={{ color: '#888', fontSize: '13px' }}>Vizualizator matematic disponibil în modul Debugger</div>
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', padding: '4px 0' }}>
                          <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            🔬 Vizualizator Stare — Pas {currentStepIndex + 1}
                          </div>
                          <div style={{ 
                            background: 'linear-gradient(145deg, #18191c, #1e1f22)',
                            padding: '24px', 
                            borderRadius: '10px', 
                            border: '1px solid #2f3136',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '350px',
                            gap: '20px',
                            width: '100%'
                          }}>
                            {renderStateVisualizer(true)}
                          </div>
                        </div>
                      );
                    }
                  })()}

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