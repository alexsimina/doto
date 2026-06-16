require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
}

async function evaluateSolution(code) {
  if (!model) {
    console.log("No GEMINI_API_KEY found, using mock evaluation.");
    return mockEvaluateSolution(code);
  }

  const prompt = `
You are an expert competitive programming coach.
Please analyze the following C++ code and identify the main algorithm or technique used, as well as guess the time complexity.
Also, provide a quality score from 0 to 100 and determine if the solution is optimal for the problem (true/false).
Map the algorithm to one of the following standard Olympic Informatics topics:
Arrays, Strings, Sorting, Graphs/DFS, Graphs/BFS, Dynamic_Programming, Math, Greedy.

Return the result STRICTLY as a JSON object with this format (do not include markdown blocks, just the raw JSON):
{
    "topic": "Graphs/DFS",
    "complexity": "O(V+E)",
    "qualityScore": 95,
    "isOptimal": true
}

Code to analyze:
\`\`\`cpp
${code.slice(0, 5000)}
\`\`\`
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(jsonStr);
    
    return {
      topic: parsed.topic || "Unknown",
      complexity: parsed.complexity || "O(?)",
      qualityScore: parsed.qualityScore || 80,
      isOptimal: parsed.isOptimal !== undefined ? parsed.isOptimal : true
    };
  } catch (error) {
    console.error("Gemini AI evaluation failed:", error.message);
    return mockEvaluateSolution(code);
  }
}

function mockEvaluateSolution(code) {
  let topic = "Arrays";
  let complexity = "O(N)";
  let qualityScore = 80;
  let isOptimal = true;

  if (code.includes("dfs") || code.includes("vector<int> adj")) {
    topic = "Graphs/DFS";
    complexity = "O(V+E)";
  } else if (code.includes("bfs") || code.includes("queue")) {
    topic = "Graphs/BFS";
    complexity = "O(V+E)";
  } else if (code.includes("dp[") || code.includes("memo")) {
    topic = "Dynamic_Programming";
    complexity = "O(N^2)";
  } else if (code.includes("sort(")) {
    topic = "Sorting";
    complexity = "O(N log N)";
  } else {
    const loops = (code.match(/for\s*\(/g) || []).length;
    if (loops >= 2) {
      complexity = "O(N^2)";
      isOptimal = false;
    }
  }

  if (!code.includes("using namespace std;")) qualityScore += 10;
  if (!code.includes("#include")) qualityScore -= 20;

  return { topic, complexity, qualityScore, isOptimal };
}

module.exports = { evaluateSolution };
