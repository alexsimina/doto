const { generateTrace } = require('./execution/index');
const graphs = require('./execution/graphs');
const strings = require('./execution/strings');
const divideConquer = require('./execution/divide_conquer');

// Mock generators
graphs.generateTrace = async () => 'graphs';
strings.generateTrace = async () => 'strings';
divideConquer.generateTrace = async () => 'divideConquer';

async function test() {
  const t1 = await generateTrace('code', 'Trees');
  if (t1 !== 'graphs') throw new Error('Trees failed');

  const t2 = await generateTrace('code', 'Trie');
  if (t2 !== 'strings') throw new Error('Trie failed');

  const t3 = await generateTrace('code', 'KMP');
  if (t3 !== 'strings') throw new Error('KMP failed');

  const t4 = await generateTrace('code', 'Dynamic Programming');
  if (t4 !== 'divideConquer') throw new Error('DP failed');
  
  console.log('All tests passed');
}
test().catch(e => { console.error(e); process.exit(1); });
