const fs = require('fs');
const path = require('path');

const CASES_DIR = path.join(__dirname, 'cases');

async function run() {
  const files = fs.readdirSync(CASES_DIR).filter(f => f.endsWith('.js'));
  
  let passed = 0;
  let failed = 0;
  
  for (const file of files) {
    console.log(`\nRunning file: ${file}`);
    const filePath = path.join(CASES_DIR, file);
    const tests = require(filePath);
    
    for (const [testName, testFn] of Object.entries(tests)) {
      if (typeof testFn === 'function') {
        try {
          await testFn();
          console.log(`✅ ${testName}`);
          passed++;
        } catch (error) {
          console.error(`❌ ${testName}`);
          console.error(`   Error: ${error.message || error}`);
          failed++;
        }
      }
    }
  }
  
  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
  
  if (failed > 0) {
    process.exit(1);
  } else {
    setTimeout(() => { process.exit(0); }, 250);
  }
}

run().catch(error => {
  console.error("Unhandled error in runner:", error);
  process.exit(1);
});
