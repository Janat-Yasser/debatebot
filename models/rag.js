// RAG retrieval engine
// Real TF-IDF (term frequency × inverse document frequency) over each topic's evidence
// chunks, with stemming, so "regulations" matches "regulate". No vector DB needed.

const natural = require('natural');
const { topics } = require('../data/topics/index');

const stem = (w) => natural.PorterStemmer.stem(w);
const tokenizer = new natural.WordTokenizer();
const STOP = new Set(natural.stopwords);

function tokenize(text) {
  return tokenizer
    .tokenize(String(text).toLowerCase())
    .filter((w) => w.length > 2 && !STOP.has(w))
    .map(stem);
}

// Build one TF-IDF index per topic once, at startup.
const indexes = new Map();
for (const topic of topics) {
  const tfidf = new natural.TfIdf();
  topic.chunks.forEach((c) => tfidf.addDocument(tokenize(c.text)));
  indexes.set(topic.id, tfidf);
}

// Score every chunk of a topic against a query. Exported for tests.
function scoreChunks(topicId, query) {
  const topic = getTopic(topicId);
  const tfidf = indexes.get(topicId);
  if (!topic || !tfidf) return [];
  const terms = tokenize(query);
  const scores = new Array(topic.chunks.length).fill(0);
  if (terms.length) tfidf.tfidfs(terms, (i, measure) => { scores[i] = measure; });
  return topic.chunks.map((chunk, i) => ({ chunk, score: scores[i] }));
}

// ── Retrieve relevant chunks ───────────────────
function retrieve(topicId, side, query, topK = 3) {
  return scoreChunks(topicId, query)
    .filter(({ chunk }) => chunk.side === side || chunk.side === 'neutral')
    // stable tie-break keeps the original evidence order when scores are equal
    .map((s, i) => ({ ...s, i }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, topK)
    .map((s) => s.chunk);
}

// ── Build context string for prompt ────────────
function buildContext(chunks) {
  if (!chunks.length) return '';
  return chunks.map((c, i) => `[Source ${i + 1}]: ${c.text}`).join('\n\n');
}

function getTopic(id) {
  return topics.find((t) => t.id === id) || null;
}

function getAllTopics() {
  return topics;
}

module.exports = { retrieve, buildContext, getTopic, getAllTopics, scoreChunks, tokenize };
