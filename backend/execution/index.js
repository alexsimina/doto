const graphs = require('./graphs');
const strings = require('./strings');
const divideConquer = require('./divide_conquer');

async function generateTrace(code, topic) {
  const normalizedTopic = (topic || '').toLowerCase();

  if (normalizedTopic.includes('graph') || normalizedTopic.includes('tree')) {
    return await graphs.generateTrace(code);
  } else if (normalizedTopic.includes('string') || normalizedTopic.includes('trie') || normalizedTopic.includes('kmp')) {
    return await strings.generateTrace(code);
  } else if (normalizedTopic.includes('divide') || normalizedTopic.includes('sort') || normalizedTopic.includes('dynamic programming')) {
    return await divideConquer.generateTrace(code);
  } else {
    // Default fallback if topic doesn't match
    console.warn(`Unknown topic: ${topic}, falling back to Graphs trace generator.`);
    return await graphs.generateTrace(code);
  }
}

module.exports = { generateTrace };
