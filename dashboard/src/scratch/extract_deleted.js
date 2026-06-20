const { execSync } = require('child_process');
const fs = require('fs');

try {
  const diff = execSync('git diff dashboard/src/components/CategoryPresentation.jsx', {
    cwd: 'c:\\Users\\User8\\Desktop\\doto',
    maxBuffer: 10 * 1024 * 1024 // 10MB
  }).toString();

  const lines = diff.split('\n');
  const deletedLines = lines.filter(line => line.startsWith('-') && !line.startsWith('---'));
  
  fs.writeFileSync('c:\\Users\\User8\\Desktop\\doto\\dashboard\\src\\scratch\\deleted_lines.txt', deletedLines.join('\n'));
  console.log(`Extracted ${deletedLines.length} deleted lines to deleted_lines.txt`);
} catch (e) {
  console.error(e);
}
