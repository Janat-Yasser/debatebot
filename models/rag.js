// RAG Engine
// Uses TF-IDF style keyword matching for retrieval
// (lightweight, no external vector DB needed)

const { topics } = require('../data/topics/index');

// ── Simple tokenizer ───────────────────────────
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w));
}

const STOP_WORDS = new Set([
  'that','this','with','from','they','have','been','were','their',
  'what','when','which','will','would','could','should','there',
  'than','more','also','into','some','other','about','over','just',
  'even','most','after','where','while','many','much','very','only',
  'both','each','such','does','then','than','these','those','being',
  'make','made','well','back','through','between','during','before'
]);

// ── TF-IDF scoring ─────────────────────────────
function score(query, chunk) {
  const qTokens = tokenize(query);
  const cTokens = tokenize(chunk.text);
  const cSet = new Set(cTokens);

  let hits = 0;
  for (const t of qTokens) {
    if (cSet.has(t)) hits++;
    // partial match bonus
    for (const ct of cTokens) {
      if (ct.includes(t) || t.includes(ct)) hits += 0.3;
    }
  }

  const tf = hits / (cTokens.length + 1);
  const coverage = hits / (qTokens.length + 1);
  return (tf + coverage) / 2;
}

// ── Retrieve relevant chunks ───────────────────
function retrieve(topicId, side, query, topK = 3) {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return [];

  // Filter to relevant side + neutral chunks
  const candidates = topic.chunks.filter(c => c.side === side || c.side === 'neutral');

  // Score and sort
  const scored = candidates.map(chunk => ({
    chunk,
    score: score(query, chunk)
  })).sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map(s => s.chunk);
}

// ── Build context string for prompt ───────────-
function buildContext(chunks) {
  if (!chunks.length) return '';
  return chunks.map((c, i) =>
    `[Source ${i + 1}]: ${c.text}`
  ).join('\n\n');
}

// ── Get topic by id ────────────────────────────
function getTopic(id) {
  return topics.find(t => t.id === id) || null;
}

// ── Get all topics ─────────────────────────────
function getAllTopics() {
  return topics;
}

module.exports = { retrieve, buildContext, getTopic, getAllTopics };
