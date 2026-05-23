const Groq = require('groq-sdk');
const { retrieve, buildContext, getTopic } = require('../models/rag');

let groq;
function getGroq() {
  if (!groq) groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  return groq;
}

// ── System prompt builder ──────────────────────
function buildSystemPrompt(topic, aiSide, sideLabel) {
  const stance = aiSide === 'for'
    ? `You are ARGUING IN FAVOR of: "${topic.title}"`
    : `You are ARGUING AGAINST: "${topic.title}"`;

  return `You are a world-class debate champion and rhetorical expert participating in a formal debate.

${stance}

Your debate persona: ${sideLabel}

DEBATE RULES:
1. You MUST argue your assigned side with conviction — never concede or switch sides
2. Ground every argument in the provided sources — cite them naturally
3. Directly rebut your opponent's specific points when they make arguments
4. Use rhetorical techniques: analogies, rhetorical questions, vivid examples
5. Keep responses focused and punchy — 3-5 paragraphs maximum
6. Start each response with a bold opening line that frames your position
7. End with a memorable closing statement or question that puts pressure on your opponent
8. Use formal but passionate debate language — this is a courtroom, not a chat

TONE: Confident, passionate, intellectually rigorous. Never personal, always substantive.
NEVER say "I agree" or acknowledge your opponent makes good points without immediately dismantling them.`;
}

// ── Opening argument ───────────────────────────
async function generateOpening(session) {
  const topic = getTopic(session.topicId);
  if (!topic) throw new Error('Topic not found');

  // Retrieve top evidence chunks
  const chunks = retrieve(session.topicId, session.aiSide, topic.title, 4);
  const context = buildContext(chunks);
  const sideLabel = session.aiSide === 'for' ? topic.for_label : topic.against_label;

  const messages = [
    {
      role: 'system',
      content: buildSystemPrompt(topic, session.aiSide, sideLabel)
    },
    {
      role: 'user',
      content: `DEBATE TOPIC: "${topic.title}"

RETRIEVED EVIDENCE (use these facts to ground your argument):
${context}

Make your OPENING ARGUMENT. This is your first statement — establish your position clearly and powerfully. Lead with your strongest point backed by evidence.`
    }
  ];

  const response = await getGroq().chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.8,
    max_tokens: 600
  });

  return response.choices[0].message.content;
}

// ── Rebuttal generator ─────────────────────────
async function generateRebuttal(session, userArgument) {
  const topic = getTopic(session.topicId);
  if (!topic) throw new Error('Topic not found');

  // Retrieve evidence relevant to user's argument
  const chunks = retrieve(session.topicId, session.aiSide, userArgument, 3);
  const context = buildContext(chunks);
  const sideLabel = session.aiSide === 'for' ? topic.for_label : topic.against_label;

  // Build conversation history
  const history = session.getHistory();

  const messages = [
    {
      role: 'system',
      content: buildSystemPrompt(topic, session.aiSide, sideLabel)
    },
    ...history,
    {
      role: 'user',
      content: `[NEW ARGUMENT FROM OPPONENT]:
${userArgument}

RETRIEVED EVIDENCE relevant to this exchange:
${context}

ROUND ${session.round + 1} of ${session.maxRounds}: Rebut your opponent's argument directly, then advance your own position with fresh evidence. Be sharp and direct.`
    }
  ];

  const response = await getGroq().chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.85,
    max_tokens: 600
  });

  return response.choices[0].message.content;
}

// ── Verdict generator ──────────────────────────
async function generateVerdict(session) {
  const topic = getTopic(session.topicId);
  const history = session.messages.map(m =>
    `[${m.role.toUpperCase()} - ${m.side === 'for' ? topic.for_label : topic.against_label}]:\n${m.content}`
  ).join('\n\n---\n\n');

  const messages = [
    {
      role: 'system',
      content: `You are an impartial debate judge with decades of experience. Analyze the debate transcript and deliver a verdict. Be fair, specific, and educational.`
    },
    {
      role: 'user',
      content: `DEBATE TOPIC: "${topic.title}"

FULL TRANSCRIPT:
${history}

Deliver a JUDGE'S VERDICT in this exact JSON format (no markdown, just raw JSON):
{
  "winner": "for" or "against" or "draw",
  "winner_label": "the label of the winning side",
  "score_for": number 0-100,
  "score_against": number 0-100,
  "summary": "2-3 sentence overall assessment",
  "for_strengths": ["strength 1", "strength 2"],
  "against_strengths": ["strength 1", "strength 2"],
  "key_moment": "The most decisive moment or argument in the debate",
  "lesson": "One thing both sides could learn from this debate"
}`
    }
  ];

  const response = await getGroq().chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.3,
    max_tokens: 500
  });

  try {
    const raw = response.choices[0].message.content.trim();
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    return {
      winner: 'draw',
      winner_label: 'Draw',
      score_for: 50,
      score_against: 50,
      summary: 'Both sides presented compelling arguments. This was a closely contested debate.',
      for_strengths: ['Strong evidence use', 'Clear position'],
      against_strengths: ['Strong evidence use', 'Clear position'],
      key_moment: 'Multiple strong exchanges throughout',
      lesson: 'Complex topics rarely have simple answers.'
    };
  }
}

module.exports = { generateOpening, generateRebuttal, generateVerdict };
