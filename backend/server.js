const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { evaluateSolution } = require('./evaluator');
const { generateRecommendation } = require('./recommendation');
const { generateTrace } = require('./execution/index');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

// Helper to read DB
function readDb() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

// Helper to write DB
function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Endpoint to receive a new solution
app.post('/submit_solution', async (req, res) => {
  const { code, problemId } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // 1. Evaluate Code
  const evaluationResult = await evaluateSolution(code);

  // 2. Update Progress
  const db = readDb();
  const topic = evaluationResult.topic;
  
  if (db.user_xp[topic] === undefined) {
    db.user_xp[topic] = 0;
  }
  
  // Reward XP based on quality and optimality
  let xpGained = 10;
  if (evaluationResult.isOptimal) xpGained += 10;
  if (evaluationResult.qualityScore > 80) xpGained += 5;

  db.user_xp[topic] += xpGained;

  // Save history
  const submissionRecord = {
    problemId: problemId || 'unknown',
    timestamp: new Date().toISOString(),
    evaluation: evaluationResult,
    xpGained
  };
  db.history.push(submissionRecord);
  
  writeDb(db);

  res.json({
    message: 'Solution evaluated successfully',
    evaluation: evaluationResult,
    xpGained,
    currentXp: db.user_xp[topic]
  });
});

// Endpoint to get skill tree progress
app.get('/get_progress', (req, res) => {
  const db = readDb();
  res.json({
    user_xp: db.user_xp,
    totalSubmissions: db.history.length,
    history: db.history.slice(-10).reverse()
  });
});

// Endpoint to get practice recommendations
app.get('/get_recommendation', (req, res) => {
  const db = readDb();
  const lastSubmission = db.history.length > 0 ? db.history[db.history.length - 1].evaluation : null;
  
  const recommendation = generateRecommendation(db, lastSubmission);
  
  res.json(recommendation);
});

// Endpoint to trace execution
app.post('/execute', async (req, res) => {
  const { code, topic } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const trace = await generateTrace(code, topic);
    res.json({ trace });
  } catch (error) {
    console.error("Execution trace failed:", error);
    res.status(500).json({ error: 'Trace generation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Brain Agent Backend running on http://localhost:${PORT}`);
});
