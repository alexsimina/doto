// Mock logic for recommending next topics based on progress
const TOPIC_HIERARCHY = [
  "Math/Number_Theory",
  "Arrays",
  "Alg/Backtracking",
  "Sorting",
  "Strings",
  "Alg/Divide_Conquer",
  "Dynamic_Programming",
  "Graphs/DFS",
  "Graphs/BFS",
  "Data_Structures/RMQ",
  "Graphs/Shortest_Paths",
  "Graphs/MST",
  "Trees/Fenwick_Tree",
  "Trees/Segment_Trees",
  "Graphs/SCC_Biconnected",
  "Strings/Trie",
  "Strings/KMP",
  "Geometry/Computational",
  "Advanced_DP/CHT",
  "Trees/LCA",
  "Advanced_Graphs/Max_Flow",
  "Strings/Aho_Corasick"
];

function generateRecommendation(progressData, lastSubmission) {
  // If the last submission wasn't optimal, recommend optimizing it
  if (lastSubmission && !lastSubmission.isOptimal) {
    return {
      type: "OPTIMIZATION",
      message: `Your recent solution for ${lastSubmission.topic} was ${lastSubmission.complexity}. Try to optimize it to a better time complexity!`,
      recommendedTopic: lastSubmission.topic
    };
  }

  // Otherwise, recommend a topic based on XP
  let nextTopic = TOPIC_HIERARCHY[0];
  for (const topic of TOPIC_HIERARCHY) {
    const xp = progressData.user_xp[topic] || 0;
    if (xp < 100) {
      nextTopic = topic;
      break;
    }
  }

  return {
    type: "NEW_TOPIC",
    message: `You are making great progress! It's time to learn ${nextTopic}. Try solving a few problems on this topic.`,
    recommendedTopic: nextTopic
  };
}

module.exports = { generateRecommendation };
