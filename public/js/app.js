/* =============================================
   DEBATEBOT — Main JS
   ============================================= */

// Category filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('.topic-card').forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? '' : 'none';
      if (show) card.style.animation = 'fadeInCard 0.25s ease';
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInCard {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;
document.head.appendChild(style);
