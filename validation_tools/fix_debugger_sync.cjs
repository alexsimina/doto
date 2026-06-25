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

function processFile(filePath, basePath, dryRun = false) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const fixes = [];
    
    // 1. Remove leading newline in "code" property (handle quoted and unquoted key)
    const codeRegex = /(?:code|"code"):\s*`\r?\n/;
    if (codeRegex.test(content)) {
        if (!dryRun) {
            content = content.replace(codeRegex, match => match.includes('"code"') ? '"code": `' : 'code: `');
        }
        fixes.push("Leading newline in code string removed");
        modified = true;
    }
    
    // 2. Modify getDebuggerState signature (quoted and unquoted key)
    const debuggerSig = /(?:"getDebuggerState"|getDebuggerState):\s*\(stepIndex\)\s*=>\s*{/;
    if (debuggerSig.test(content)) {
        if (!dryRun) {
            content = content.replace(debuggerSig, match => match.includes('"getDebuggerState"') ? '"getDebuggerState": (stepIndex, activeLine) => {' : 'getDebuggerState: (stepIndex, activeLine) => {');
        }
        fixes.push("getDebuggerState signature updated to accept activeLine");
        modified = true;
    }
    
    // 3. Modify getDebuggerState return to map frame lines dynamically
    const debuggerReturn = /return\s*{\s*vars:\s*s\.vars,\s*globalVars:\s*\[\],\s*frames:\s*s\.frames,\s*inlineVal:\s*s\.inlineVal\s*};/;
    if (debuggerReturn.test(content)) {
        if (!dryRun) {
            const replacement = `const frames = s.frames.map((frame, index) => {
        if (index === 0 && activeLine !== undefined && activeLine !== null) {
          return { ...frame, line: activeLine };
        }
        return frame;
      });
      return { vars: s.vars, globalVars: [], frames, inlineVal: s.inlineVal };`;
            content = content.replace(debuggerReturn, replacement);
        }
        fixes.push("getDebuggerState return mapped to activeLine dynamically");
        modified = true;
    }
    
    // 4. Modify getInlineValueForLine condition to check explanation's active line
    const inlineTarget = 'if (s.inlineVal && s.frames.length > 0 && s.frames[0].line === lineNum) return s.inlineVal;';
    if (content.includes(inlineTarget)) {
        if (!dryRun) {
            const replacement = `const activeLine = typeof data !== 'undefined' && data.explanations && data.explanations[stepIndex] ? data.explanations[stepIndex].line : null;
      if (s.inlineVal && activeLine === lineNum) return s.inlineVal;`;
            content = content.replace(inlineTarget, replacement);
        }
        fixes.push("getInlineValueForLine mapped to explanations line dynamically");
        modified = true;
    }
    
    if (modified && !dryRun) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
    
    return { modified, fixes };
}

function main() {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const targetFiles = args.filter(a => !a.startsWith('-'));
    
    const basePath = path.resolve(__dirname, '../dashboard/src/data/categories');
    
    let files = [];
    if (targetFiles.length === 0) {
        if (fs.existsSync(basePath)) {
            files = getJsFiles(basePath);
        } else {
            console.error("Categories folder not found.");
            process.exit(1);
        }
    } else {
        files = targetFiles.map(f => path.resolve(f));
    }
    
    console.log(`${dryRun ? 'Scanning' : 'Repairing'} ${files.length} file(s) for debugger synchronization issues...\n`);
    
    let affectedCount = 0;
    const categorySummary = {};
    
    for (const file of files) {
        if (!fs.existsSync(file)) {
            console.log(`❌ File not found: ${file}`);
            continue;
        }
        
        const relativePath = path.relative(basePath, file);
        // Category path: e.g. Math_Geometry/Math
        const parts = relativePath.split(path.sep);
        const category = parts.length > 1 ? parts.slice(0, parts.length - 1).join('/') : 'Root';
        
        const { modified, fixes } = processFile(file, basePath, dryRun);
        
        if (modified) {
            affectedCount++;
            if (!categorySummary[category]) {
                categorySummary[category] = [];
            }
            categorySummary[category].push({ file: path.basename(file), fixes });
            
            console.log(`⚠️  ${dryRun ? 'Found issue' : 'Fixed'} in [${category}/${path.basename(file)}]:`);
            fixes.forEach(f => console.log(`   - ${f}`));
            console.log();
        }
    }
    
    console.log("=============================================");
    console.log(`Summary: ${affectedCount} file(s) ${dryRun ? 'need fixes' : 'were fixed'}.\n`);
    
    if (affectedCount > 0) {
        console.log("Affected Categories:");
        for (const [cat, items] of Object.entries(categorySummary)) {
            console.log(`📁 ${cat}:`);
            items.forEach(item => {
                console.log(`   📄 ${item.file}`);
            });
        }
        process.exit(1); // Exit with error code if there are issues
    } else {
        console.log("✓ All checked files are fully synchronized and aligned!");
        process.exit(0);
    }
}

main();
