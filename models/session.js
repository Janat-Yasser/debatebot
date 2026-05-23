// In-memory debate session store
// (no DB needed — sessions are ephemeral)

const { v4: uuidv4 } = require('uuid');

const sessions = new Map();

class DebateSession {
  constructor(topicId, userSide) {
    this.id = uuidv4();
    this.topicId = topicId;
    this.userSide = userSide; // 'for' or 'against'
    this.aiSide = userSide === 'for' ? 'against' : 'for';
    this.messages = []; // { role: 'user'|'ai', content, side, timestamp }
    this.round = 0;
    this.maxRounds = 6;
    this.verdict = null;
    this.createdAt = new Date();
  }

  addMessage(role, content, side) {
    this.messages.push({
      role,
      content,
      side,
      timestamp: new Date(),
      round: this.round
    });
    if (role === 'ai') this.round++;
  }

  isOver() {
    return this.round >= this.maxRounds;
  }

  getHistory() {
    return this.messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content
    }));
  }
}

function createSession(topicId, userSide) {
  const session = new DebateSession(topicId, userSide);
  sessions.set(session.id, session);
  // Clean old sessions (keep last 50)
  if (sessions.size > 50) {
    const oldest = [...sessions.keys()][0];
    sessions.delete(oldest);
  }
  return session;
}

function getSession(id) {
  return sessions.get(id) || null;
}

function deleteSession(id) {
  sessions.delete(id);
}

module.exports = { createSession, getSession, deleteSession };
