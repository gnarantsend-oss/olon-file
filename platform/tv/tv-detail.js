// ── TV UI — Дэлгэрэнгүй modal ───────────────────────────────
// tv-ui.js-н "// ── 7. Detail modal" хэсэг

import { tvState } from './tv-state.js';

export function openDetail(m, onPlay) {
  tvState.currentMovie = m;
  clearInterval(tvState.heroTimer);

  document.getElementById('tv-detail-poster').src        = m.poster || '';
  document.getElementById('tv-detail-cat').textContent   = m.cat || '';
  document.getElementById('tv-detail-title').textContent = m.title;
  document.getElementById('tv-detail-meta').textContent  = `⭐ ${m.rating || ''}  ·  ${m.year || ''}`;
  document.getElementById('tv-detail-desc').textContent  = m.overview || m.desc || '';
  document.getElementById('tv-detail-modal').classList.add('open');

  setTimeout(() => document.getElementById('tv-detail-play').focus(), 100);
}

export function closeDetail(onHeroRestart) {
  document.getElementById('tv-detail-modal').classList.remove('open');
  if (onHeroRestart) onHeroRestart();
  if (tvState.lastCard) setTimeout(() => tvState.lastCard.focus(), 100);
}

export function bindDetailModal(onPlay, onClose) {
  document.getElementById('tv-detail-play').onclick  = () => {
    onClose();
    onPlay(tvState.currentMovie);
  };
  document.getElementById('tv-detail-close').onclick = onClose;
}
