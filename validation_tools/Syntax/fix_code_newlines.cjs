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

function fixCodeString(codeContent) {
    let inString = false;
    let result = '';
    for (let i = 0; i < codeContent.length; i++) {
        // Handle quotes for C++ strings and chars
        if ((codeContent[i] === '"' || codeContent[i] === "'") && (i === 0 || codeContent[i-1] !== '\\')) {
            if (!inString) {
                inString = codeContent[i];
            } else if (inString === codeContent[i]) {
                inString = false;
            }
            result += codeContent[i];
        } else if (!inString && codeContent.substring(i, i + 3) === '\\\\n') {
            result += '\n';
            i += 2;
        } else if (!inString && codeContent.substring(i, i + 2) === '\\n') {
            result += '\n';
            i += 1;
        } else {
            result += codeContent[i];
        }
    }
    return result;
}

const basePath = path.resolve(__dirname, '../../dashboard/src/data/categories');
const files = getJsFiles(basePath);

let fixedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We first verify if the file actually has the newline issue by loading it
    const tempFile = path.join(__dirname, `temp_fix_newlines_${path.basename(filePath)}.cjs`);
    fs.writeFileSync(tempFile, content.replace(/export\s+const\s+data\s*=/, 'module.exports =') + ';', 'utf8');
    
    let hasIssue = false;
    try {
        const data = require(tempFile);
        if (data && data.code) {
            const hasRealNewlines = data.code.includes('\n');
            const hasEscapedNewlines = data.code.includes('\\n');
            if (!hasRealNewlines && hasEscapedNewlines) {
                hasIssue = true;
            }
        }
    } catch (e) {
        // Ignore files failing to load
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
    
    if (!hasIssue) return;

    // Apply the fix by finding the code block and replacing it
    // The regex matches: ("code"|code) : followed by either `...` or "..."
    const codeBlockRegex = /("code"|code)\s*:\s*(?:`([\s\S]*?)`|"([\s\S]*?)")/g;
    
    let modified = false;
    const newContent = content.replace(codeBlockRegex, (match, key, backtickContent, doubleQuoteContent) => {
        let codeContent = backtickContent !== undefined ? backtickContent : doubleQuoteContent;
        let fixedContent = fixCodeString(codeContent);
        modified = true;
        // Always rewrite to backticks since we are introducing real newlines on disk
        return `${key}: \`${fixedContent}\``;
    });
    
    if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Fixed code newlines in: ${path.relative(basePath, filePath)}`);
        fixedCount++;
    }
});

console.log("=========================================");
if (fixedCount > 0) {
    console.log(`🎉 Successfully repaired ${fixedCount} file(s) with single-line C++ code blocks!`);
} else {
    console.log("✓ No files required code newline repairs.");
}
process.exit(0);
