const { getAllTopics, getTopic } = require('../models/rag');
const { createSession, getSession } = require('../models/session');
const { generateOpening, generateRebuttal, generateVerdict } = require('../config/ai');

// ── Home ───────────────────────────────────────
exports.getHome = (req, res) => {
  const topics = getAllTopics();
  const categories = [...new Set(topics.map(t => t.category))];
  res.render('index', {
    title: 'DebateBot — Argue Both Sides',
    topics,
    categories
  });
};

// ── Topic page ─────────────────────────────────
exports.getTopic = (req, res) => {
  const topic = getTopic(req.params.id);
  if (!topic) return res.redirect('/');
  res.render('topic', {
    title: `${topic.title} — DebateBot`,
    topic
  });
};

// ── Start debate ───────────────────────────────
exports.startDebate = async (req, res) => {
  const { topicId, userSide } = req.body;
  const topic = getTopic(topicId);
  if (!topic || !['for', 'against'].includes(userSide)) {
    return res.redirect('/');
  }

  try {
    const session = createSession(topicId, userSide);
    const opening = await generateOpening(session);
    session.addMessage('ai', opening, session.aiSide);

    res.render('debate', {
      title: `Debate: ${topic.title}`,
      topic,
      session,
      messages: session.messages,
      isOver: false,
      verdict: null
    });
  } catch (err) {
    console.error('Error starting debate:', err.message);
    res.render('error', {
      title: 'Error',
      message: err.message.includes('API') || err.message.includes('401')
        ? 'Invalid or missing Groq API key. Please check your .env file.'
        : 'Failed to start debate. Please try again.'
    });
  }
};

// ── Submit argument (AJAX) ─────────────────────
exports.submitArgument = async (req, res) => {
  const { sessionId, argument } = req.body;
  if (!sessionId || !argument?.trim()) {
    return res.status(400).json({ error: 'Missing session or argument' });
  }

  const session = getSession(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.isOver()) return res.status(400).json({ error: 'Debate is over' });

  try {
    // Add user message
    session.addMessage('user', argument.trim(), session.userSide);

    // Check if last round
    const isLastRound = session.round >= session.maxRounds;

    // Generate AI rebuttal
    const rebuttal = await generateRebuttal(session, argument.trim());
    session.addMessage('ai', rebuttal, session.aiSide);

    let verdict = null;
    if (session.isOver()) {
      verdict = await generateVerdict(session);
      session.verdict = verdict;
    }

    res.json({
      success: true,
      rebuttal,
      round: session.round,
      maxRounds: session.maxRounds,
      isOver: session.isOver(),
      verdict
    });
  } catch (err) {
    console.error('Error in debate:', err.message);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
};

// ── Get verdict for completed session ──────────
exports.getVerdict = async (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) return res.redirect('/');
  const topic = getTopic(session.topicId);

  let verdict = session.verdict;
  if (!verdict && session.messages.length >= 2) {
    verdict = await generateVerdict(session);
    session.verdict = verdict;
  }

  res.render('verdict', {
    title: 'Debate Verdict',
    topic,
    session,
    verdict
  });
};
