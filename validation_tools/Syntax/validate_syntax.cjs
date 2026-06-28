const fs = require('fs');
const path = require('path');

function validateFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found at ${filePath}`);
        return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/export\s+const\s+data\s*=/, 'const data =');
    content += '\n;module.exports = data;';
    
    const tempFile = path.join(__dirname, 'temp_validate.cjs');
    fs.writeFileSync(tempFile, content, 'utf8');
    try {
        const exported = require(tempFile);
        if (!exported.presentation || !exported.explanations) {
            throw new Error("Missing critical keys: presentation or explanations");
        }
        
        const textFields = ['presentation', 'complexity', 'variations', 'applications'];
        for (const field of textFields) {
            if (exported[field]) {
                const textVal = exported[field];
                if (textVal.includes('####')) {
                    throw new Error(`Field '${field}' contains header level 4 (####), which is unsupported by formatText. Use up to ###.`);
                }
                if (/\|(\s*:?-+:?\s*\|)+/.test(textVal)) {
                    throw new Error(`Field '${field}' contains markdown table separator (using '|'), which is unsupported by the custom dashboard parser. Convert tables to bulleted lists.`);
                }
            }
        }
        if (exported.debugger) {
            if (typeof exported.debugger.getDebuggerState !== 'function') {
                throw new Error("debugger.getDebuggerState is not a function");
            }
            if (exported.debugger.getInlineValueForLine && typeof exported.debugger.getInlineValueForLine !== 'function') {
                throw new Error("debugger.getInlineValueForLine is not a function");
            }
            // Test execution of the debugger functions at step 0
            const state = exported.debugger.getDebuggerState(0, 10, "test");
            if (!state || !Array.isArray(state.vars) || !Array.isArray(state.globalVars) || !Array.isArray(state.frames)) {
                throw new Error("debugger.getDebuggerState returned invalid format: " + JSON.stringify(state));
            }
        }
        console.log(`✓ ${path.relative(path.resolve(__dirname, '../..'), filePath)} is valid!`);
        return true;
    } catch (err) {
        console.error(`✗ Error in ${path.relative(path.resolve(__dirname, '../..'), filePath)}:`, err.stack || err.message);
        return false;
    } finally {
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        delete require.cache[require.resolve(tempFile)];
    }
}

// Find files recursively
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

let files = process.argv.slice(2);
if (files.length === 0) {
    // Default to validating all files in categories
    const categoriesDir = path.resolve(__dirname, '../../dashboard/src/data/categories');
    if (fs.existsSync(categoriesDir)) {
        files = getJsFiles(categoriesDir);
    } else {
        console.log("No files specified and categories folder not found.");
        process.exit(1);
    }
} else {
    files = files.map(f => path.resolve(f));
}

console.log(`Validating ${files.length} file(s)...\n`);
let allOk = true;
for (const f of files) {
    if (!validateFile(f)) {
        allOk = false;
    }
}

if (!allOk) {
    console.log("\n✗ Some files have validation errors.");
    process.exit(1);
} else {
    console.log("\n✓ All files validated successfully!");
}
