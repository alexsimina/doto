const fs = require('fs');
const path = require('path');

function getJsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getJsFiles(fullPath));
        } else if (file.endsWith('.js')) {
            results.push(fullPath);
        }
    });
    return results;
}

function processTableLines(lines) {
    if (lines.length < 3) return lines;
    
    // Parse headers
    const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
    
    const listItems = [];
    for (let i = 2; i < lines.length; i++) {
        const cols = lines[i].split('|').map(s => s.trim()).filter(Boolean);
        if (cols.length === 0) continue;
        
        const firstCol = cols[0];
        listItems.push(`- **${firstCol}:**`);
        for (let j = 1; j < cols.length; j++) {
            const headerName = headers[j] || `Coloana ${j + 1}`;
            const cellVal = cols[j] || '';
            listItems.push(`  - **${headerName}:** ${cellVal}`);
        }
    }
    return listItems;
}

function replacePlaceholders(array, startIdx, resolvedLines) {
    const joined = resolvedLines.join(array[startIdx - 1] === '\\n' ? '\\n' : '\n');
    let first = true;
    for (let i = startIdx; i < array.length; i++) {
        if (array[i] && array[i].placeholder) {
            if (first) {
                array[i] = { value: joined };
                first = false;
            } else {
                array[i] = { value: '' };
                if (i > 0 && (array[i - 1] === '\n' || array[i - 1] === '\\n')) {
                    array[i - 1] = '';
                }
            }
        }
    }
}

function fixContent(text) {
    // 1. Fix #### headings
    text = text.replace(/####\s+/g, '### ');
    
    // 2. Fix markdown tables
    const parts = text.split(/(\\n|\n)/g);
    let inTable = false;
    let tableLines = [];
    let tableStartIdx = -1;
    
    const processedParts = [];
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '\n' || part === '\\n') {
            processedParts.push(part);
            continue;
        }
        
        const trimmed = part.trim();
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableLines = [trimmed];
                tableStartIdx = processedParts.length;
            } else {
                tableLines.push(trimmed);
            }
            processedParts.push({ placeholder: true });
        } else {
            if (inTable) {
                const resolvedTableLines = processTableLines(tableLines);
                replacePlaceholders(processedParts, tableStartIdx, resolvedTableLines);
                inTable = false;
                tableLines = [];
            }
            processedParts.push(part);
        }
    }
    if (inTable) {
        const resolvedTableLines = processTableLines(tableLines);
        replacePlaceholders(processedParts, tableStartIdx, resolvedTableLines);
    }
    
    return processedParts.map(p => {
        if (typeof p === 'string') return p;
        return p.value;
    }).join('');
}

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    const textFields = ['presentation', 'complexity', 'variations', 'applications'];
    for (const field of textFields) {
        const regex = new RegExp(`(["']?${field}["']?\\s*:\\s*)(["'\`])`, 'g');
        let match;
        regex.lastIndex = 0;
        
        while ((match = regex.exec(content)) !== null) {
            const prefix = match[1];
            const quoteChar = match[2];
            const startIdx = match.index + prefix.length;
            
            let endIdx = -1;
            let escape = false;
            for (let i = startIdx + 1; i < content.length; i++) {
                if (escape) {
                    escape = false;
                    continue;
                }
                if (content[i] === '\\') {
                    escape = true;
                    continue;
                }
                if (content[i] === quoteChar) {
                    endIdx = i;
                    break;
                }
            }
            
            if (endIdx !== -1) {
                const rawString = content.substring(startIdx + 1, endIdx);
                const fixedString = fixContent(rawString);
                
                if (fixedString !== rawString) {
                    content = content.substring(0, startIdx + 1) + fixedString + content.substring(endIdx);
                    modified = true;
                    regex.lastIndex = startIdx + 1 + fixedString.length + 1;
                }
            }
        }
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Repaired: ${path.relative(path.resolve(__dirname, '../..'), filePath)}`);
    }
}

const categoriesDir = path.resolve(__dirname, '../../dashboard/src/data/categories');
const files = getJsFiles(categoriesDir);
console.log(`Scanning and repairing ${files.length} category files...\n`);

for (const file of files) {
    fixFile(file);
}

console.log("\nRepair complete!");
process.exit(0);
