const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { evaluateSolution } = require('./evaluator');
const { generateRecommendation } = require('./recommendation');
const { generateTrace } = require('./execution/index');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// Helper to get or create a default user since auth isn't implemented yet
async function getDefaultUser() {
  let user = await prisma.user.findUnique({ where: { email: 'default@doto.local' } });
  if (!user) {
    user = await prisma.user.create({
      data: { email: 'default@doto.local', password_hash: 'default' }
    });
  }
  return user;
}

// Endpoint to receive a new solution
app.post('/submit_solution', async (req, res) => {
  const { code, problemId } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // 1. Evaluate Code
    const evaluationResult = await evaluateSolution(code);
    
    // Reward XP based on quality and optimality
    let xpGained = 10;
    if (evaluationResult.isOptimal) xpGained += 10;
    if (evaluationResult.qualityScore > 80) xpGained += 5;
    
    const user = await getDefaultUser();
    
    // 2. Save Submission
    await prisma.submission.create({
      data: {
        user_id: user.id,
        problem_id: problemId || 'unknown',
        code: code,
        topic: evaluationResult.topic,
        score: xpGained,
        is_optimal: evaluationResult.isOptimal
      }
    });
    
    // Calculate current XP for topic
    const topicSubmissions = await prisma.submission.findMany({
      where: { user_id: user.id, topic: evaluationResult.topic }
    });
    const currentXp = topicSubmissions.reduce((sum, sub) => sum + sub.score, 0);

    res.json({
      message: 'Solution evaluated successfully',
      evaluation: evaluationResult,
      xpGained,
      currentXp
    });
  } catch (error) {
    console.error("Submission failed:", error);
    res.status(500).json({ error: 'Evaluation failed' });
  }
});

// Endpoint to get skill tree progress
app.get('/get_progress', async (req, res) => {
  try {
    const user = await getDefaultUser();
    const submissions = await prisma.submission.findMany({
      where: { user_id: user.id },
      orderBy: { timestamp: 'desc' }
    });

    const user_xp = {};
    submissions.forEach(sub => {
      user_xp[sub.topic] = (user_xp[sub.topic] || 0) + sub.score;
    });

    const history = submissions.slice(0, 10).map(sub => ({
      problemId: sub.problem_id,
      timestamp: sub.timestamp,
      evaluation: {
        topic: sub.topic,
        isOptimal: sub.is_optimal
      },
      xpGained: sub.score
    }));

    res.json({
      user_xp,
      totalSubmissions: submissions.length,
      history
    });
  } catch (error) {
    console.error("Get progress failed:", error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Endpoint to get practice recommendations
app.get('/get_recommendation', async (req, res) => {
  try {
    const user = await getDefaultUser();
    const submissions = await prisma.submission.findMany({
      where: { user_id: user.id },
      orderBy: { timestamp: 'desc' }
    });

    const user_xp = {};
    submissions.forEach(sub => {
      user_xp[sub.topic] = (user_xp[sub.topic] || 0) + sub.score;
    });

    const lastSubmission = submissions.length > 0 ? {
      topic: submissions[0].topic,
      isOptimal: submissions[0].is_optimal
    } : null;

    const recommendation = generateRecommendation({ user_xp }, lastSubmission);
    res.json(recommendation);
  } catch (error) {
    console.error("Recommendation failed:", error);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
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

// Endpoint to get typing stats
app.get('/get_typing_stats', async (req, res) => {
  try {
    const user = await getDefaultUser();
    const stats = await prisma.typingStats.findUnique({ where: { user_id: user.id } });
    if (!stats) {
      return res.json({ typing_stats: {} });
    }
    
    const typing_stats = {
      ...stats.letter_stats,
      words: stats.word_stats,
      lastRun: {
        wpm: stats.wpm,
        accuracy: stats.accuracy
      }
    };
    
    res.json({ typing_stats });
  } catch (error) {
    console.error("Get typing stats failed:", error);
    res.status(500).json({ error: 'Failed to fetch typing stats' });
  }
});

// Endpoint to update typing stats
app.post('/update_typing_stats', async (req, res) => {
  const { letterStats, wordStats, wpm, accuracy } = req.body;
  try {
    const user = await getDefaultUser();
    let stats = await prisma.typingStats.findUnique({ where: { user_id: user.id } });
    
    let currentLetterStats = stats && typeof stats.letter_stats === 'object' ? stats.letter_stats : {};
    let currentWordStats = stats && typeof stats.word_stats === 'object' ? stats.word_stats : {};

    if (letterStats) {
      for (const [letter, s] of Object.entries(letterStats)) {
        if (!currentLetterStats[letter]) currentLetterStats[letter] = { typed: 0, errors: 0 };
        currentLetterStats[letter].typed += s.typed || 0;
        currentLetterStats[letter].errors += s.errors || 0;
      }
    }

    if (wordStats) {
      for (const [word, s] of Object.entries(wordStats)) {
        if (!currentWordStats[word]) currentWordStats[word] = { typed: 0, errors: 0 };
        currentWordStats[word].typed += s.typed || 0;
        currentWordStats[word].errors += s.errors || 0;
      }
    }

    if (stats) {
      await prisma.typingStats.update({
        where: { id: stats.id },
        data: {
          wpm: wpm || stats.wpm,
          accuracy: accuracy !== undefined ? accuracy : stats.accuracy,
          letter_stats: currentLetterStats,
          word_stats: currentWordStats
        }
      });
    } else {
      await prisma.typingStats.create({
        data: {
          user_id: user.id,
          wpm: wpm || 0,
          accuracy: accuracy || 0,
          letter_stats: currentLetterStats,
          word_stats: currentWordStats
        }
      });
    }
    
    const typing_stats = {
      ...currentLetterStats,
      words: currentWordStats,
      lastRun: { wpm: wpm || (stats ? stats.wpm : 0), accuracy: accuracy !== undefined ? accuracy : (stats ? stats.accuracy : 0) }
    };
    
    res.json({ success: true, typing_stats });
  } catch (error) {
    console.error("Update typing stats failed:", error);
    res.status(500).json({ error: 'Failed to update typing stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Brain Agent Backend running on http://localhost:${PORT}`);
});
