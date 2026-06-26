const fs = require('fs');
const path = require('path');

const defaultPath = path.resolve(__dirname, '../../dashboard/src/data/categories/Data_Structures/Trees/Segment_Trees.js');
const filePath = process.argv[2] ? path.resolve(process.argv[2]) : defaultPath;

console.log(`Analyzing brackets and quotes in: ${filePath}\n`);

if (!fs.existsSync(filePath)) {
    console.error(`Error: File does not exist at ${filePath}`);
    process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');

let stack = [];
let inString = null; // '"', "'", "`"
let inComment = null; // '//', '/*'
let line = 1;
let col = 1;

for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1] || '';

    // Handle comments
    if (inComment === '//') {
        if (char === '\n') {
            inComment = null;
            line++;
            col = 1;
        } else {
            col++;
        }
        continue;
    }
    if (inComment === '/*') {
        if (char === '*' && nextChar === '/') {
            inComment = null;
            i++;
            col += 2;
        } else if (char === '\n') {
            line++;
            col = 1;
        } else {
            col++;
        }
        continue;
    }

    // Handle line endings
    if (char === '\n') {
        line++;
        col = 1;
        if (inString === "'" || inString === '"') {
            console.log(`Warning: Multiline string using ${inString} at line ${line}`);
        }
    } else {
        col++;
    }

    // Skip escaped characters in strings
    if (inString && char === '\\') {
        i++;
        col++;
        continue;
    }

    // Handle strings
    if (inString) {
        if (char === inString) {
            inString = null;
        }
        continue;
    }

    if (char === '"' || char === "'" || char === '`') {
        inString = char;
        continue;
    }

    // Handle comment starters
    if (char === '/' && nextChar === '//') {
        inComment = '//';
        i++;
        col++;
        continue;
    }
    if (char === '/' && nextChar === '*') {
        inComment = '/*';
        i++;
        col++;
        continue;
    }

    // Handle brackets
    if (char === '{' || char === '[' || char === '(') {
        stack.push({ char, line, col });
    } else if (char === '}' || char === ']' || char === ')') {
        if (stack.length === 0) {
            console.log(`Mismatched closing bracket ${char} at line ${line}:${col}`);
        } else {
            const top = stack.pop();
            const matching = { '}': '{', ']': '[', ')': '(' };
            if (top.char !== matching[char]) {
                console.log(`Mismatched bracket: expected ${matching[char]} (opened at line ${top.line}:${top.col}), but found ${char} at line ${line}:${col}`);
            }
        }
    }
}

if (inString) {
    console.log(`Unclosed string of type ${inString}`);
}
if (inComment) {
    console.log(`Unclosed comment of type ${inComment}`);
}
if (stack.length > 0) {
    console.log(`Unclosed brackets:`);
    stack.forEach(b => {
        console.log(`  ${b.char} opened at line ${b.line}:${b.col}`);
    });
    process.exit(1);
} else {
    console.log(`✓ No unclosed brackets or strings found!`);
}
