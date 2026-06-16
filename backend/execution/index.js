const graphs = require('./graphs');
const strings = require('./strings');
const divideConquer = require('./divide_conquer');

async function generateTrace(code, topic) {
  let normalizedTopic = (topic || '').toLowerCase();
  if (!normalizedTopic) {
    const commentMatch = code.match(/\/\/\s*(.*)/);
    if (commentMatch) {
      normalizedTopic = commentMatch[1].trim().toLowerCase();
    }
  }

  if (normalizedTopic.includes('graph') || normalizedTopic.includes('tree') || normalizedTopic.includes('bfs') || normalizedTopic.includes('dfs') || normalizedTopic.includes('dijkstra') || normalizedTopic.includes('prim') || normalizedTopic.includes('kruskal')) {
    return await graphs.generateTrace(code);
  } else if (normalizedTopic.includes('string') || normalizedTopic.includes('trie') || normalizedTopic.includes('kmp') || normalizedTopic.includes('rabin') || normalizedTopic.includes('boyer') || normalizedTopic.includes('z algorithm') || normalizedTopic.includes('suffix')) {
    return await strings.generateTrace(code);
  } else if (normalizedTopic.includes('divide') || normalizedTopic.includes('sort') || normalizedTopic.includes('dynamic programming') || normalizedTopic.includes('binary search') || normalizedTopic.includes('closest pair') || normalizedTopic.includes('karatsuba')) {
    return await divideConquer.generateTrace(code);
  } else {
    // Default fallback if topic doesn't match
    console.warn(`Unknown topic: ${topic}, falling back to Graphs trace generator.`);
    return await graphs.generateTrace(code);
  }
}

module.exports = { generateTrace };
