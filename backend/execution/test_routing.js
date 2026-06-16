const { generateTrace } = require('./index');

async function runTests() {
    let warningLogged = false;
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (args[0] && args[0].includes('Unknown topic:')) {
            warningLogged = true;
        }
        originalWarn(...args);
    };

    const topicsToTest = ["Trie", "KMP", "Trees", "Dynamic Programming"];
    let failed = [];

    for (const topic of topicsToTest) {
        warningLogged = false;
        try {
            await generateTrace("test code", topic);
        } catch (e) {
            // Ignore actual errors from generator, we just care about routing fallback warning
        }
        if (warningLogged) {
            failed.push(topic);
        }
    }

    if (failed.length > 0) {
        console.log("FAIL: Unknown topic fallback triggered for:", failed.join(", "));
        process.exit(1);
    } else {
        console.log("PASS: All topics routed correctly without fallback.");
    }
}

runTests().catch(console.error);
