const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');

// ── Stub the AI layer so tests never call the real API ──
const aiPath = require.resolve('../config/ai');
let rebuttalDelay = 0;
let calls = { rebuttal: [], verdict: 0 };
require.cache[aiPath] = {
  id: aiPath, filename: aiPath, loaded: true,
  exports: {
    generateOpening: async () => 'Opening.',
    generateRebuttal: async (session, arg) => {
      calls.rebuttal.push({ arg, history: session.getHistory({ excludeLast: true }) });
      await new Promise((r) => setTimeout(r, rebuttalDelay));
      return 'Rebuttal.';
    },
    generateVerdict: async () => { calls.verdict++; return { winner: 'for', score_for: 60, score_against: 40 }; },
  },
};

const ctrl = require('../controllers/debateController');
const { createSession, _sessions } = require('../models/session');
const { parseVerdict } = loadReal('../config/ai.js');
const rag = require('../models/rag');

function loadReal(p) {
  // load the real ai.js (bypassing the stub above) just for parseVerdict
  const m = new Module(require.resolve(p), module);
  m.filename = require.resolve(p);
  m.paths = Module._nodeModulePaths(__dirname);
  m._compile(require('fs').readFileSync(m.filename, 'utf8'), m.filename);
  return m.exports;
}

function fakeRes() {
  const r = { statusCode: 200, body: null };
  r.status = (c) => { r.statusCode = c; return r; };
  r.json = (b) => { r.body = b; return r; };
  r.render = (v, b) => { r.view = v; r.body = b; return r; };
  r.redirect = (u) => { r.redirectTo = u; return r; };
  return r;
}

test('the user argument is sent once, not duplicated in history', async () => {
  calls = { rebuttal: [], verdict: 0 };
  const s = createSession('ai-jobs', 'for');
  s.addMessage('ai', 'Opening.', s.aiSide);
  await ctrl.submitArgument({ body: { sessionId: s.id, argument: 'Robots take jobs.' } }, fakeRes());
  const { arg, history } = calls.rebuttal[0];
  assert.equal(arg, 'Robots take jobs.');
  assert.ok(!history.some((m) => m.content === 'Robots take jobs.'), 'argument leaked into history too');
});

test('a double-submit is rejected while the first is in flight', async () => {
  rebuttalDelay = 50;
  const s = createSession('ai-jobs', 'for');
  s.addMessage('ai', 'Opening.', s.aiSide);
  const a = fakeRes(), b = fakeRes();
  await Promise.all([
    ctrl.submitArgument({ body: { sessionId: s.id, argument: 'one' } }, a),
    ctrl.submitArgument({ body: { sessionId: s.id, argument: 'two' } }, b),
  ]);
  assert.deepEqual([a.statusCode, b.statusCode].sort(), [200, 409]);
  assert.equal(s.round, 2);
  rebuttalDelay = 0;
});

test('over-long arguments are refused', async () => {
  const s = createSession('ai-jobs', 'for');
  const r = fakeRes();
  await ctrl.submitArgument({ body: { sessionId: s.id, argument: 'x'.repeat(2001) } }, r);
  assert.equal(r.statusCode, 413);
});

test('non-string input is refused', async () => {
  const r = fakeRes();
  await ctrl.submitArgument({ body: { sessionId: { $gt: '' }, argument: ['a'] } }, r);
  assert.equal(r.statusCode, 400);
});

test('parseVerdict validates and clamps, and never fakes a result', () => {
  const topic = { for_label: 'Yes', against_label: 'No' };
  const v = parseVerdict('{"winner":"for","score_for":140,"score_against":-3,"summary":"ok"}', topic);
  assert.equal(v.winner_label, 'Yes');
  assert.equal(v.score_for, 100);
  assert.equal(v.score_against, 0);
  const bad = parseVerdict('not json', topic);
  assert.equal(bad.unscored, true);
});

test('retrieval returns on-side, relevant evidence', () => {
  const forIds = rag.retrieve('ai-jobs', 'for', 'automation replacing warehouse workers', 3);
  assert.equal(forIds.length, 3);
  assert.ok(forIds.every((c) => c.side === 'for' || c.side === 'neutral'));
  assert.match(forIds[0].text, /warehouse|automat/i);
});

test('sessions expire and stay bounded', () => {
  const { _sweep } = require('../models/session');
  const s = createSession('ai-jobs', 'for');
  s.lastActive = Date.now() - 3 * 60 * 60 * 1000;
  _sweep();
  assert.equal(_sessions.has(s.id), false);
});
