// In-memory debate session store (sessions are ephemeral by design).
// Sessions expire after 2 hours of inactivity; at most MAX_SESSIONS are kept,
// evicting the least-recently-used ones first (not active debates).

const { v4: uuidv4 } = require('uuid');

const MAX_SESSIONS = 500;
const TTL_MS = 2 * 60 * 60 * 1000;
const sessions = new Map(); // insertion order == recency order (we re-insert on access)

class DebateSession {
  constructor(topicId, userSide) {
    this.id = uuidv4();
    this.topicId = topicId;
    this.userSide = userSide; // 'for' or 'against'
    this.aiSide = userSide === 'for' ? 'against' : 'for';
    this.messages = []; // { role: 'user'|'ai', content, side, timestamp, round }
    this.round = 0;
    this.maxRounds = 6;
    this.verdict = null;
    this.busy = false; // true while waiting on the model, blocks double-submits
    this.createdAt = new Date();
    this.lastActive = Date.now();
  }

  addMessage(role, content, side) {
    this.messages.push({ role, content, side, timestamp: new Date(), round: this.round });
    if (role === 'ai') this.round++;
  }

  isOver() {
    return this.round >= this.maxRounds;
  }

  // Chat history for the model. Pass `excludeLast` to leave out the newest message
  // when the caller is about to send it separately.
  getHistory({ excludeLast = false } = {}) {
    const msgs = excludeLast ? this.messages.slice(0, -1) : this.messages;
    return msgs.map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }));
  }
}

function sweep(now = Date.now()) {
  for (const [id, s] of sessions) if (now - s.lastActive > TTL_MS) sessions.delete(id);
  while (sessions.size > MAX_SESSIONS) sessions.delete(sessions.keys().next().value);
}

function createSession(topicId, userSide) {
  const session = new DebateSession(topicId, userSide);
  sessions.set(session.id, session);
  sweep();
  return session;
}

function getSession(id) {
  const s = sessions.get(id);
  if (!s) return null;
  if (Date.now() - s.lastActive > TTL_MS) { sessions.delete(id); return null; }
  s.lastActive = Date.now();
  sessions.delete(id); sessions.set(id, s); // mark as most recently used
  return s;
}

function deleteSession(id) {
  sessions.delete(id);
}

module.exports = { createSession, getSession, deleteSession, DebateSession, _sessions: sessions, _sweep: sweep };
