const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../dashboard/src/data/categories/Graph_Theory/Graphs/MST/Kruskal.js');
const content = fs.readFileSync(file, 'utf8');

// We need to evaluate the file to get the data object
// A simple regex to extract the "code" field or eval the export.
// Let's run eval by mimicking ESM import in CommonJS or just extracting the code string.
const codeMatch = content.match(/"code":\s*"([^"]+)"/);
if (codeMatch) {
  const code = codeMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
  const cleanCode = code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
  const lines = cleanCode.split('\n');
  lines.forEach((line, idx) => {
    console.log(`${idx + 1}: ${line}`);
  });
} else {
  // Try backtick match
  const backtickMatch = content.match(/"code":\s*`([\s\S]*?)`/);
  if (backtickMatch) {
    const code = backtickMatch[1];
    const cleanCode = code.replace(/^\r?\n/, '').replace(/\r?\n$/, '');
    const lines = cleanCode.split('\n');
    lines.forEach((line, idx) => {
      console.log(`${idx + 1}: ${line}`);
    });
  } else {
    console.log("Could not find code field");
  }
}
