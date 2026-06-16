require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
}

async function generateTrace(code) {
  if (!model) {
    return mockGenerateTrace(code);
  }

  const prompt = `
You are an expert code execution tracer.
Analyze the following C++ code related to Divide & Conquer (e.g., Merge Sort, Quick Sort).
Generate an execution trace representing the step-by-step execution of the algorithm.
Return a JSON array of objects. Each object must have:
- "line": an integer representing the line number being executed.
- "segment": a short string of the code segment executing.
- "explanation": a string explaining what is happening at this step.
- "state": an object representing the local variables and their values at this point.

Return the result STRICTLY as a JSON array (do not include markdown blocks like \`\`\`json).

Code:
\`\`\`cpp
${code}
\`\`\`
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini AI trace generation failed for Divide & Conquer:", error.message);
    return mockGenerateTrace(code);
  }
}

function mockGenerateTrace(code) {
  const lines = code.split('\n');
  const trace = [];
  const lowerCode = code.toLowerCase();
  
  // Determine domain terms
  let extraExplanation = "";
  if (lowerCode.includes("merge")) {
    extraExplanation = "Dividing the array recursively and merging sorted sub-arrays.";
  } else if (lowerCode.includes("quick")) {
    extraExplanation = "Dividing the array recursively using pivot partitions.";
  } else if (lowerCode.includes("binary") || lowerCode.includes("closest") || lowerCode.includes("karatsuba")) {
    extraExplanation = "Dividing problem into smaller subproblems.";
  }

  for (let i = 0; i < lines.length; i++) {
    const lineContent = lines[i].trim();
    if (lineContent) {
      let explanation = `Executing: ${lineContent}`;
      if (extraExplanation && trace.length === 0) {
        explanation = `${extraExplanation} Executing: ${lineContent}`;
      }
      trace.push({
        line: i + 1,
        segment: lineContent,
        explanation: explanation,
        state: { "line_number": i + 1 }
      });
    }
  }
  return trace;
}

module.exports = { generateTrace };
