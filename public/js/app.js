// Copyright (c) 2026 Janat Yasser. All rights reserved.
/* ==========================================================
   DEBATEBOT: shared motion
   split text, scroll reveals, hero divide, list preview,
   filters, count-ups, magnetic buttons, page transitions
   ========================================================== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* ── Split headings into masked words ─────────────────── */
  function splitWords(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(tok => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const wi = document.createElement('span'); wi.className = 'wi';
            wi.style.setProperty('--i', i++);
            wi.textContent = tok;
            w.appendChild(wi); frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(el);
  }
  document.querySelectorAll('[data-split]').forEach(splitWords);

  /* stagger siblings that reveal together */
  document.querySelectorAll('.motion-list, .format-grid, .evidence-grid, .v-notes, .v-strengths').forEach(group => {
    [...group.querySelectorAll('[data-reveal]')].forEach((el, n) => el.style.setProperty('--d', `${Math.min(n, 8) * 70}ms`));
  });

  /* ── Reveal on scroll ─────────────────────────────────── */
  const targets = document.querySelectorAll('[data-split], [data-reveal], .hero, .motion-hero, .v-score');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
        e.target.querySelectorAll?.('[data-count]').forEach(countUp);
        if (e.target.matches('[data-count]')) countUp(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    // let the page wipe clear before the first reveals fire
    setTimeout(() => targets.forEach(el => io.observe(el)), 380);
  }

  /* ── Count-ups ────────────────────────────────────────── */
  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const end = parseFloat(el.dataset.count);
    if (isNaN(end) || reduce) return;
    const dur = 1400, t0 = performance.now();
    const tick = now => {
      const p = clamp((now - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  }

  /* ── Hero: the dividing line follows the pointer ──────── */
  const hero = document.getElementById('hero');
  if (hero) {
    let target = 50, current = reduce ? 50 : 100, active = false, idle = 0;
    const set = v => hero.style.setProperty('--split', `${v}%`);
    set(current);
    setTimeout(() => { target = 56; }, 250);

    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      target = clamp(((e.clientX - r.left) / r.width) * 100, 8, 92);
      active = true;
    });
    hero.addEventListener('pointerleave', () => { active = false; target = 56; });

    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

    const loop = t => {
      if (visible) {
        if (!active && !fine && !reduce) target = 50 + Math.sin(t / 1600) * 18; // gentle sway on touch
        current = lerp(current, target, reduce ? 1 : 0.085);
        set(current.toFixed(2));
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ── Motions: floating photo preview + filters ────────── */
  const peek = document.querySelector('.peek');
  if (peek && fine && !reduce) {
    let x = -999, y = -999, px = x, py = y, vx = 0;
    document.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    document.querySelectorAll('.motion').forEach((row, n) => {
      row.addEventListener('pointerenter', () => {
        peek.dataset.cat = row.dataset.cat;
        peek.classList.toggle('alt', n % 2 === 1);
        peek.classList.add('on');
      });
      row.addEventListener('pointerleave', () => peek.classList.remove('on'));
    });
    const follow = () => {
      if (px === -999) { px = x; py = y; }
      const nx = lerp(px, x, 0.14), ny = lerp(py, y, 0.14);
      vx = lerp(vx, nx - px, 0.2);
      px = nx; py = ny;
      peek.style.setProperty('--x', `${px + 180}px`);
      peek.style.setProperty('--y', `${py}px`);
      peek.style.setProperty('--r', `${clamp(vx * 0.6, -12, 12)}deg`);
      requestAnimationFrame(follow);
    };
    requestAnimationFrame(follow);
  }

  const filters = document.querySelector('.filters');
  if (filters) {
    const ink = filters.querySelector('.filter-ink');
    const moveInk = btn => {
      if (!ink) return;
      ink.style.width = `${btn.offsetWidth}px`;
      ink.style.transform = `translate(${btn.offsetLeft}px, ${btn.offsetTop - 4}px)`;
      ink.style.height = `${btn.offsetHeight}px`;
    };
    const wrapped = () => getComputedStyle(filters).flexWrap !== 'nowrap' && filters.scrollHeight > 60;
    const sync = () => {
      const active = filters.querySelector('.filter-btn.active');
      filters.classList.toggle('no-ink', wrapped());
      if (ink) ink.style.display = wrapped() ? 'none' : '';
      if (active && !wrapped()) moveInk(active);
    };
    sync();
    addEventListener('resize', sync);
    document.fonts?.ready.then(sync);

    filters.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sync();
        btn.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
        const cat = btn.dataset.cat;
        let n = 0;
        document.querySelectorAll('.motion-item').forEach(item => {
          const show = cat === 'all' || item.dataset.category === cat;
          item.classList.toggle('is-hidden', !show);
          if (show && !reduce) {
            item.animate(
              [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }],
              { duration: 700, delay: n++ * 45, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }
            );
          }
        });
      });
    });
  }

  /* ── Magnetic buttons ─────────────────────────────────── */
  if (fine && !reduce) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ── Page transitions on internal links ───────────────── */
  const wipe = document.querySelector('.wipe');
  if (wipe && !reduce) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return; // in-page anchor
      e.preventDefault();
      wipe.classList.add('leave');
      setTimeout(() => { location.href = url.href; }, 520);
    });
    addEventListener('pageshow', e => { if (e.persisted) wipe.classList.remove('leave'); });
  }

  /* smooth in-page anchors (e.g. /#motions from the home page) */
  document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').split('#')[1];
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
