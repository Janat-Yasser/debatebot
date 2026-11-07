# DebateBot

**Pick a motion. Take a side. An AI argues the other one, with sources, for six rounds. Then a judge decides.**

DebateBot is a debate sparring partner. You choose one of 20 motions and a side, and an LLM takes the opposite bench. It argues from a curated evidence base rather than inventing statistics. After six rounds, a neutral AI judge scores both sides, names a winner and tells you what to sharpen.

[![CI](https://github.com/Janat-Yasser/debatebot/actions/workflows/ci.yml/badge.svg)](https://github.com/Janat-Yasser/debatebot/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/LLM-gpt--oss--120b%20via%20Groq-F55036)
![RAG](https://img.shields.io/badge/retrieval-TF--IDF%20RAG-6E40C9)

---

## How a debate works

1. **Choose a bench**: proposition or opposition. The AI takes whichever side you leave.
2. **Evidence is pulled**: every AI turn retrieves the most relevant chunks for its side from the topic's knowledge base and argues from them.
3. **Six rounds**: trade arguments. The AI doesn't concede. It looks for new angles and goes after your weakest point.
4. **The House divides**: an impartial judge model reads the transcript and returns a score for each side (0–100), a winner, and specific feedback.

## One turn, under the hood

The motion is *AI will destroy more jobs than it creates*. You take the opposition, so the AI argues for the motion, and you write:

> *New technology has always created more jobs than it destroyed. The ATM did not eliminate bank tellers, and the internet created whole industries.*

Before the AI replies, `retrieve()` ranks the proposition's evidence against your words with TF-IDF and keeps the top 3. On this argument, those are:

1. *"Historical automation has disproportionately harmed low-income workers… AI is moving orders of magnitude faster, giving workers no time to retrain."*
2. Frey and Osborne (Oxford): 47% of US jobs at high risk of automation.
3. Goldman Sachs: 300 million full-time jobs exposed, white-collar work included.

Your argument leaned on history, and the top result is the evidence about history, so the rebuttal argues *why this time is different*. You can reproduce this ranking without an API key:

```bash
node -e "const {retrieve}=require('./models/rag'); console.log(retrieve('ai-jobs','for','New technology has always created more jobs than it destroyed. The ATM did not eliminate bank tellers, and the internet created whole industries.').map(c => c.id))"
# [ 4, 2, 3 ]
```

## Topics

20 motions across Technology, Politics, Justice, Society, Economics, Science, Energy, Education and Work. For example:

- *AI will destroy more jobs than it creates*
- *Universal Basic Income should be implemented*
- *Nuclear energy is the future of clean power*
- *Mass surveillance makes society safer*
- *Human gene editing should be permitted*

Each topic has its own set of sourced evidence chunks for both sides (McKinsey, Oxford, Goldman Sachs and so on). Add or edit topics in `data/topics/index.js`.

## Quick start

You'll need a free API key from [console.groq.com](https://console.groq.com).

```bash
git clone https://github.com/Janat-Yasser/debatebot.git
cd debatebot
npm install
cp .env.example .env      # then paste your GROQ_API_KEY
npm run dev
```

Open **http://localhost:3000**.

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | yes | Groq API key |
| `GROQ_MODEL` | no | Defaults to `openai/gpt-oss-120b` |
| `PORT` | no | Defaults to `3000` |

## Architecture

```
Browser ──► Express routes ──► debateController
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
             models/rag.js   models/session.js  config/ai.js
          (TF-IDF retrieval  (in-memory debate  (Groq: opening,
           over topic chunks)  state + rounds)   rebuttal, verdict)
```

- **Retrieval (`models/rag.js`)**: TF-IDF with stemming over each topic's evidence chunks, filtered to the AI's side. It needs no vector database.
- **Generation (`config/ai.js`)**: three prompts (opening statement, rebuttal, verdict) on `openai/gpt-oss-120b`, with its reasoning kept short and out of the reply. It used Llama 3.3 70B until Groq retired that model for free and developer keys in August 2026. The verdict comes back as structured JSON, with a safe fallback if parsing fails.
- **Sessions (`models/session.js`)**: debates live in memory (2-hour expiry, least-recently-used eviction), so restarting the server clears them. Each session handles one argument at a time, so double-submits can't run two rounds.
- **Safety**: arguments are capped at 2,000 characters, `/debate` routes are rate-limited per IP, the judge ignores instructions hidden inside debate turns, and async errors can't crash the server.

| Route | Purpose |
|---|---|
| `GET /` | Motion list |
| `GET /topic/:id` | Topic briefing and side selection |
| `POST /debate/start` | Start a session; the AI opens |
| `POST /debate/argue` | Submit your argument; the AI rebuts |
| `GET /verdict/:sessionId` | Judge's verdict |

## Tests

```bash
npm test
```

The AI calls are stubbed, so no API key is needed.

## Roadmap

- [ ] Persist debates (SQLite or Mongo) so you can revisit transcripts
- [ ] Stream AI responses token by token
- [ ] Let users add their own motions and evidence
- [ ] Embedding-based retrieval as an option
- [ ] Evaluate retrieval quality (hit rate per topic)

## License

© 2026 Janat Yasser. All rights reserved. See [LICENSE](LICENSE).