# DebateBot

**Pick a motion. Take a side. An AI argues the other one, with sources, for six rounds. Then a judge decides.**

DebateBot is a debate sparring partner. You choose one of 20 motions and a side, and an LLM takes the opposite bench. It argues from a curated evidence base rather than inventing statistics. After six rounds, a neutral AI judge scores both sides, names a winner and tells you what to sharpen.

![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/LLM-Llama%203.3%2070B%20via%20Groq-F55036)
![RAG](https://img.shields.io/badge/retrieval-TF--IDF%20RAG-6E40C9)

---

## How a debate works

1. **Choose a bench**: proposition or opposition. The AI takes whichever side you leave.
2. **Evidence is pulled**: every AI turn retrieves the most relevant chunks for its side from the topic's knowledge base and argues from them.
3. **Six rounds**: trade arguments. The AI doesn't concede. It looks for new angles and goes after your weakest point.
4. **The House divides**: an impartial judge model reads the transcript and returns a score for each side (0–100), a winner, and specific feedback.

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

- **Retrieval (`models/rag.js`)**: a lightweight TF-IDF-style scorer over each topic's evidence chunks, filtered to the AI's side. It needs no vector database.
- **Generation (`config/ai.js`)**: three prompts (opening statement, rebuttal, verdict) on `llama-3.3-70b-versatile`. The verdict comes back as structured JSON, with a safe fallback if parsing fails.
- **Sessions (`models/session.js`)**: debates live in memory, so restarting the server clears them.

| Route | Purpose |
|---|---|
| `GET /` | Motion list |
| `GET /topic/:id` | Topic briefing and side selection |
| `POST /debate/start` | Start a session; the AI opens |
| `POST /debate/argue` | Submit your argument; the AI rebuts |
| `GET /verdict/:sessionId` | Judge's verdict |

## Roadmap

- [ ] Persist debates (SQLite or Mongo) so you can revisit transcripts
- [ ] Stream AI responses token by token
- [ ] Let users add their own motions and evidence
- [ ] Embedding-based retrieval as an option

## License

MIT
