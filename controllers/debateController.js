// Copyright (c) 2026 Janat Yasser. All rights reserved.
const { getAllTopics, getTopic } = require('../models/rag');
const { createSession, getSession } = require('../models/session');
const { generateOpening, generateRebuttal, generateVerdict } = require('../config/ai');

const MAX_ARGUMENT_CHARS = 2000;

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
  const topicId = String(req.body.topicId || '');
  const userSide = String(req.body.userSide || '');
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
  const sessionId = typeof req.body.sessionId === 'string' ? req.body.sessionId : '';
  const argument = typeof req.body.argument === 'string' ? req.body.argument.trim() : '';
  if (!sessionId || !argument) {
    return res.status(400).json({ error: 'Missing session or argument' });
  }
  if (argument.length > MAX_ARGUMENT_CHARS) {
    return res.status(413).json({ error: `Keep your argument under ${MAX_ARGUMENT_CHARS} characters.` });
  }

  const session = getSession(sessionId);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.isOver()) return res.status(400).json({ error: 'Debate is over' });
  // One argument at a time: a double-click or second tab can't run two rounds at once.
  if (session.busy) return res.status(409).json({ error: 'Still answering your last argument.' });

  session.busy = true;
  const before = session.messages.length;
  try {
    session.addMessage('user', argument, session.userSide);

    const rebuttal = await generateRebuttal(session, argument);
    session.addMessage('ai', rebuttal, session.aiSide);

    let verdict = null;
    if (session.isOver()) {
      verdict = await generateVerdict(session);
      if (!verdict.unscored) session.verdict = verdict;
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
    // Roll back a half-finished round so the user can simply resend.
    session.messages.length = Math.min(session.messages.length, before);
    session.round = session.messages.filter((m) => m.role === 'ai').length;
    res.status(500).json({ error: 'AI service error. Please try again.' });
  } finally {
    session.busy = false;
  }
};

// ── Get verdict for completed session ──────────
exports.getVerdict = async (req, res) => {
  const session = getSession(req.params.sessionId);
  if (!session) return res.redirect('/');
  const topic = getTopic(session.topicId);

  let verdict = session.verdict;
  if (!verdict && session.messages.length >= 2) {
    try {
      verdict = await generateVerdict(session);
      if (!verdict.unscored) session.verdict = verdict;
    } catch (err) {
      console.error('Error generating verdict:', err.message);
      return res.status(503).render('error', {
        title: 'Judge unavailable',
        message: "The judge couldn't be reached just now. Refresh this page in a moment to get your verdict.",
      });
    }
  }
  if (!verdict) return res.redirect(`/topic/${session.topicId}`);

  res.render('verdict', {
    title: 'Debate Verdict',
    topic,
    session,
    verdict
  });
};
