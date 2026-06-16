const { generateTrace } = require('./backend/execution/index');
async function test() {
  const trace = await generateTrace('void dfs(int u) {}', 'Graphs/DFS');
  console.log(JSON.stringify(trace, null, 2));
}
test();
