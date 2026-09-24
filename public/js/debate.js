/* ==========================================================
   DEBATEBOT: the chamber
   ========================================================== */
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
let isWaiting = false;
let currentRound = parseInt(document.getElementById('currentRound')?.textContent || '0', 10);

const chamber = document.getElementById('debateChamber');
const inner = document.getElementById('chamberInner');
const textarea = document.getElementById('argumentInput');
const charCount = document.getElementById('charCount');
const charMeter = document.getElementById('charMeter');
const submitBtn = document.getElementById('submitBtn');

/* ── Composer ─────────────────────────────────────────── */
function autoGrow() {
  if (!textarea) return;
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 220) + 'px';
}

function updateCount() {
  const len = textarea.value.length;
  charCount.textContent = len;
  if (charMeter) {
    charMeter.style.transform = `scaleX(${len / 1500})`;
    charMeter.classList.toggle('warn', len > 1000 && len <= 1300);
    charMeter.classList.toggle('max', len > 1300);
  }
}

if (textarea) {
  textarea.addEventListener('input', () => { updateCount(); autoGrow(); });
  textarea.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      submitArgument();
    }
  });
  submitBtn?.addEventListener('click', submitArgument);
  setTimeout(() => textarea.focus({ preventScroll: true }), 900);
}

function setBusy(busy) {
  if (!submitBtn) return;
  submitBtn.disabled = busy;
  submitBtn.querySelector('.btn-label').textContent = busy ? 'Listening' : 'Argue';
}

/* ── Submit ───────────────────────────────────────────── */
async function submitArgument() {
  if (isWaiting || !textarea) return;
  const argument = textarea.value.trim();
  if (!argument) {
    textarea.classList.remove('is-empty');
    void textarea.offsetWidth;
    textarea.classList.add('is-empty');
    textarea.placeholder = 'Say something first.';
    textarea.focus();
    return;
  }

  isWaiting = true;
  setBusy(true);

  appendMessage('user', argument, USER_SIDE, currentRound + 1);
  textarea.value = '';
  updateCount();
  autoGrow();

  const typing = document.getElementById('typingIndicator');
  if (typing) {
    typing.hidden = false;
    inner.appendChild(typing); // keep it last
  }
  scrollToBottom();

  try {
    const res = await fetch('/debate/argue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: SESSION_ID, argument })
    });
    const data = await res.json();
    if (typing) typing.hidden = true;

    if (!res.ok || data.error) {
      showError(data.error || 'Something went wrong. Please try again.');
      isWaiting = false;
      setBusy(false);
      return;
    }

    const msg = appendMessage('ai', data.rebuttal, AI_SIDE, data.round, true);
    currentRound = data.round;
    updateRoundTracker(data.round);

    const revealTime = REDUCE ? 0 : Math.min(msg.words * 22 + 500, 4200);
    followReveal(revealTime);

    if (data.isOver) {
      setTimeout(showDebateOver, revealTime + 300);
    } else {
      isWaiting = false;
      setBusy(false);
      updateInputLabel(data.round + 1);
    }
  } catch (err) {
    if (typing) typing.hidden = true;
    showError('Network error. Check your connection and try again.');
    isWaiting = false;
    setBusy(false);
  }
}

/* ── Messages ─────────────────────────────────────────── */
function appendMessage(role, content, side, round, animateWords = false) {
  const sideLabel = side === 'for' ? FOR_LABEL : AGAINST_LABEL;
  const msg = document.createElement('article');
  msg.className = `msg msg-${role} msg-${side}`;
  msg.innerHTML = `
    <header class="msg-head">
      <span class="msg-who">${role === 'user' ? 'You' : 'AI opponent'}</span>
      <span class="msg-side">${escapeHtml(sideLabel)}</span>
      <span class="msg-round">Round ${round}</span>
    </header>
    <div class="msg-text"></div>`;

  const text = msg.querySelector('.msg-text');
  let words = 0;
  if (animateWords && !REDUCE) {
    // wrap each word so it can fade in, keeping the original whitespace
    const frag = document.createDocumentFragment();
    content.split(/(\s+)/).forEach(tok => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
      const s = document.createElement('span');
      s.className = 'tw';
      s.style.setProperty('--i', Math.min(words++, 180));
      s.textContent = tok;
      frag.appendChild(s);
    });
    text.appendChild(frag);
  } else {
    text.textContent = content;
  }

  const typing = document.getElementById('typingIndicator');
  if (typing && typing.parentNode === inner) inner.insertBefore(msg, typing);
  else inner.appendChild(msg);
  msg.words = words;
  return msg;
}

/* ── Round tracker ────────────────────────────────────── */
function updateRoundTracker(round) {
  document.querySelectorAll('.round-dot').forEach((dot, i) => {
    dot.classList.remove('done', 'current');
    if (i < round) dot.classList.add('done');
    else if (i === round) dot.classList.add('current');
  });
  const roundEl = document.getElementById('currentRound');
  if (roundEl) roundEl.textContent = round;
}

function updateInputLabel(nextRound) {
  const el = document.getElementById('inputRound');
  if (el) el.textContent = nextRound;
}

/* ── End of debate ────────────────────────────────────── */
function showDebateOver() {
  const dock = document.getElementById('inputWrap');
  const banner = document.createElement('div');
  banner.className = 'over';
  banner.innerHTML = `
    <p class="kicker">The floor is closed</p>
    <h2>All ${MAX_ROUNDS} rounds are done.</h2>
    <a href="/verdict/${encodeURIComponent(SESSION_ID)}" class="btn btn-verdict">Hear the verdict <span aria-hidden="true">&rarr;</span></a>`;
  if (dock) dock.replaceWith(banner);
  else document.querySelector('.debate')?.appendChild(banner);
  updateRoundTracker(MAX_ROUNDS);
  document.querySelectorAll('.round-dot').forEach(d => d.classList.add('done'));
  scrollToBottom();
}

/* ── Scrolling ────────────────────────────────────────── */
function scrollToBottom() {
  if (!chamber) return;
  requestAnimationFrame(() => { chamber.scrollTop = chamber.scrollHeight; });
}

// keep the newest words in view while a reply fades in,
// unless the reader has scrolled up to re-read something
function followReveal(ms) {
  if (!chamber) return;
  const end = performance.now() + ms;
  const step = () => {
    const nearBottom = chamber.scrollHeight - chamber.scrollTop - chamber.clientHeight < 240;
    if (nearBottom) chamber.scrollTop = chamber.scrollHeight;
    if (performance.now() < end) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── Toast ────────────────────────────────────────────── */
function showError(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

scrollToBottom();

/* fresh debate: let the opening statement read itself in */
(() => {
  const msgs = inner?.querySelectorAll('article.msg');
  if (REDUCE || !msgs || msgs.length !== 1) return;
  const text = msgs[0].querySelector('.msg-text');
  const content = text.textContent;
  text.textContent = '';
  let n = 0;
  content.split(/(\s+)/).forEach(tok => {
    if (!tok) return;
    if (/^\s+$/.test(tok)) { text.appendChild(document.createTextNode(tok)); return; }
    const s = document.createElement('span');
    s.className = 'tw';
    s.style.setProperty('--i', Math.min(n++, 180) + 18);
    s.textContent = tok;
    text.appendChild(s);
  });
})();
