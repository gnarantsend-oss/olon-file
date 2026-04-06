// ── TV UI — Мөр ба карт байгуулах ───────────────────────────
// tv-ui.js-н "// ── 6. Rows" хэсэг

export function renderRows(movies, serials, onCardClick) {
  const container = document.getElementById('tv-rows');
  container.innerHTML = '';

  if (serials.length) {
    container.appendChild(buildRow('📺 Шинэ цуврал', serials.slice(0, 20), onCardClick));
  }

  (window.HOME_ROWS || []).forEach(({ title, keys }) => {
    const filtered = movies.filter(m => {
      const cat = (m.cat || '').toLowerCase();
      return keys.some(k => cat.includes(k));
    });
    if (filtered.length) container.appendChild(buildRow(title, filtered, onCardClick));
  });

  container.appendChild(buildRow('🎬 Бүх кино', movies, onCardClick));
}

export function buildRow(title, items, onCardClick) {
  const section = document.createElement('div');
  section.className = 'tv-row';

  const h = document.createElement('div');
  h.className   = 'tv-row-title';
  h.textContent = title;

  const scroll = document.createElement('div');
  scroll.className = 'tv-row-scroll';

  items.slice(0, 30).forEach(m => scroll.appendChild(buildCard(m, onCardClick)));

  section.appendChild(h);
  section.appendChild(scroll);
  return section;
}

export function buildCard(m, onCardClick) {
  const card = document.createElement('div');
  card.className = 'tv-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', m.title);
  card.innerHTML = `
    <img src="${m.poster || ''}" alt="${m.title}"
         onerror="this.src='https://placehold.co/320x200/111/555?text=${encodeURIComponent(m.title)}'">
    <div class="tv-card-ov">
      <div class="tv-card-title">${m.title}</div>
      <div class="tv-card-sub">⭐ ${m.rating || ''} · ${m.year || ''}</div>
    </div>
    <div class="tv-card-play-icon">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <polygon points="6,4 20,12 6,20" fill="white"/>
      </svg>
    </div>`;
  card.addEventListener('click', () => onCardClick(m));
  return card;
}
