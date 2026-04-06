// ── TV UI — Hero хэсэг ───────────────────────────────────────
// tv-ui.js-н "// ── 5. Hero" хэсэг

import { tvState } from './tv-state.js';

export function renderHero(list, onPlay, onDetail) {
  tvState.heroList = list.slice(0, 8);
  tvState.heroIdx  = 0;
  showHero(0, onPlay, onDetail);

  const dots = document.getElementById('tv-hero-dots');
  dots.innerHTML = tvState.heroList.map((_, i) =>
    `<button class="tv-hdot ${i === 0 ? 'active' : ''}" tabindex="-1" data-i="${i}"></button>`
  ).join('');
  dots.querySelectorAll('.tv-hdot').forEach(d =>
    d.addEventListener('click', () => showHero(+d.dataset.i, onPlay, onDetail))
  );

  // Auto-rotate
  tvState.heroTimer = setInterval(
    () => showHero((tvState.heroIdx + 1) % tvState.heroList.length, onPlay, onDetail),
    8000
  );
}

export function showHero(idx, onPlay, onDetail) {
  tvState.heroIdx = idx;
  const m = tvState.heroList[idx];
  if (!m) return;

  document.getElementById('tv-hero-bg').style.backgroundImage = `url('${m.poster}')`;
  document.getElementById('tv-hero-cat').textContent   = m.cat || '';
  document.getElementById('tv-hero-title').textContent = m.title;
  document.getElementById('tv-hero-meta').textContent  = `⭐ ${m.rating || ''}  ·  ${m.year || ''}`;
  document.getElementById('tv-hero-desc').textContent  = m.overview || m.desc || '';

  document.querySelectorAll('.tv-hdot').forEach((d, i) =>
    d.classList.toggle('active', i === idx)
  );

  document.getElementById('tv-hero-play').onclick     = () => onPlay(m);
  document.getElementById('tv-hero-info-btn').onclick = () => onDetail(m);

  window._tvHeroMovie = m;
}
