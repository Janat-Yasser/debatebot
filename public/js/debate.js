/* =============================================
   DEBATEBOT — Debate Arena JS
   ============================================= */

let isWaiting = false;
let currentRound = parseInt(document.getElementById('currentRound')?.textContent || '0');

// ── Character counter ──────────────────────────
const textarea = document.getElementById('argumentInput');
const charCount = document.getElementById('charCount');

if (textarea) {
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = len;
    charCount.style.color = len > 1300 ? '#e74c3c' : len > 1000 ? '#f59e0b' : '';
  });

  textarea.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      submitArgument();
    }
  });
}

// ── Submit argument ────────────────────────────
async function submitArgument() {
  if (isWaiting) return;
  const input = document.getElementById('argumentInput');
  const argument = input?.value?.trim();
  if (!argument) {
    input.style.borderColor = '#c0392b';
    input.placeholder = 'Please enter your argument first...';
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
    return;
  }

  isWaiting = true;
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Waiting...'; }

  appendMessage('user', argument, USER_SIDE);
  input.value = '';
  charCount.textContent = '0';

  const typingEl = document.getElementById('typingIndicator');
  if (typingEl) typingEl.style.display = 'flex';
  scrollToBottom();

  try {
    const res = await fetch('/debate/argue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: SESSION_ID, argument })
    });

    const data = await res.json();
    if (typingEl) typingEl.style.display = 'none';

    if (!res.ok || data.error) {
      showError(data.error || 'Something went wrong. Please try again.');
      isWaiting = false;
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Argue'; }
      return;
    }

    appendMessage('ai', data.rebuttal, AI_SIDE);
    currentRound = data.round;
    updateRoundTracker(data.round, data.maxRounds);

    if (data.isOver) {
      showDebateOver();
    } else {
      isWaiting = false;
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Argue'; }
      updateInputLabel(data.round + 1);
    }

    scrollToBottom();

  } catch (err) {
    if (typingEl) typingEl.style.display = 'none';
    showError('Network error. Please check your connection.');
    isWaiting = false;
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Argue'; }
  }
}

// ── Append message ─────────────────────────────
function appendMessage(role, content, side) {
  const chamber = document.getElementById('debateChamber');
  if (!chamber) return;

  const sideLabel = side === 'for' ? FOR_LABEL : AGAINST_LABEL;
  const from      = role === 'user' ? 'You' : 'AI Opponent';
  const avatarTxt = role === 'user' ? 'YOU' : 'AI';
  const avatarCls = role === 'user' ? 'avatar-you' : 'avatar-ai';

  const msg = document.createElement('div');
  msg.className = `message message-${role} message-${side}`;
  msg.innerHTML = `
    <div class="message-avatar ${avatarCls}">${avatarTxt}</div>
    <div class="message-body">
      <div class="message-header">
        <span class="message-from">${from}</span>
        <span class="message-stance stance-${side}">${sideLabel}</span>
      </div>
      <div class="message-content">${escapeHtml(content)}</div>
    </div>
  `;

  const typing = document.getElementById('typingIndicator');
  if (typing) chamber.insertBefore(msg, typing);
  else chamber.appendChild(msg);
}

// ── Round tracker ──────────────────────────────
function updateRoundTracker(round, maxRounds) {
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

// ── Debate over ────────────────────────────────
function showDebateOver() {
  const inputWrap = document.getElementById('inputWrap');
  if (inputWrap) inputWrap.remove();

  const banner = document.createElement('div');
  banner.className = 'debate-over-banner';
  banner.innerHTML = `
    <h2>Debate Complete</h2>
    <p>All ${MAX_ROUNDS} rounds have been fought. Time for the judge's verdict.</p>
    <a href="/verdict/${SESSION_ID}" class="btn-verdict">See the Verdict &rarr;</a>
  `;

  const page = document.querySelector('.debate-page');
  if (page) page.appendChild(banner);
  updateRoundTracker(MAX_ROUNDS, MAX_ROUNDS);
}

// ── Scroll ─────────────────────────────────────
function scrollToBottom() {
  const chamber = document.getElementById('debateChamber');
  if (chamber) setTimeout(() => { chamber.scrollTop = chamber.scrollHeight; }, 100);
}

// ── Error toast ────────────────────────────────
function showError(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
    background:#c0392b;color:white;padding:12px 24px;
    border-radius:8px;font-size:0.85rem;font-weight:600;
    z-index:999;box-shadow:0 4px 20px rgba(0,0,0,0.5);
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── HTML escape ────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  scrollToBottom();

  // Animate score bars
  document.querySelectorAll('.score-bar').forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = target; }, 300);
  });
});
