// ── TV UI — D-pad гарын navigation ──────────────────────────
// tv-ui.js-н "// ── 9. Nav tabs" + "// ── 10. D-pad" хэсэг

import { tvState } from './tv-state.js';
import { closePlayer, showControls } from './tv-player.js';
import { closeDetail } from './tv-detail.js';

export function bindNavTabs() {
  document.querySelectorAll('.tv-nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tv-nav-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // TODO: page switching
    });
  });
}

export function initKeyboardNavigation(onHeroRestart) {
  document.addEventListener('keydown', e => {
    const k = e.keyCode;

    // Player нээлттэй үед
    const playerOpen = document.getElementById('tv-player-modal')?.classList.contains('open');
    if (playerOpen) {
      showControls();
      if (k === 8 || k === 27) { e.preventDefault(); closePlayer(); }
      if (k === 37) { e.preventDefault(); document.getElementById('tv-player-video').currentTime -= 10; }
      if (k === 39) { e.preventDefault(); document.getElementById('tv-player-video').currentTime += 10; }
      if (k === 13) { e.preventDefault(); document.getElementById('tv-btn-play').click(); }
      return;
    }

    // Detail modal нээлттэй үед
    const detailOpen = document.getElementById('tv-detail-modal')?.classList.contains('open');
    if (detailOpen) {
      if (k === 8 || k === 27) { e.preventDefault(); closeDetail(onHeroRestart); }
      return;
    }

    // Үндсэн UI
    const focused = document.activeElement;
    const isCard  = focused?.classList.contains('tv-card');
    const isBtn   = focused?.classList.contains('tv-hero-btn') || focused?.classList.contains('tv-nav-tab');

    if (k === 13 && isCard) {
      e.preventDefault();
      tvState.lastCard = focused;
      focused.click();
      return;
    }

    if (isCard) {
      const row   = focused.closest('.tv-row-scroll');
      const cards = row ? Array.from(row.querySelectorAll('.tv-card')) : [];
      const idx   = cards.indexOf(focused);

      if (k === 37) { // ←
        e.preventDefault();
        const prev = cards[idx - 1];
        if (prev) { prev.focus(); prev.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        else if (row) row.scrollBy({ left: -300, behavior: 'smooth' });
      }
      if (k === 39) { // →
        e.preventDefault();
        const next = cards[idx + 1];
        if (next) { next.focus(); next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        else if (row) row.scrollBy({ left: 300, behavior: 'smooth' });
      }
      if (k === 38) { // ↑ — дээрх мөр эсвэл Hero
        e.preventDefault();
        const rows = Array.from(document.querySelectorAll('.tv-row-scroll'));
        const rIdx = rows.indexOf(row);
        if (rIdx === 0) {
          document.getElementById('tv-hero-play')?.focus();
        } else {
          const prevCards = Array.from(rows[rIdx - 1].querySelectorAll('.tv-card'));
          const best = _nearestCard(prevCards, focused);
          if (best) { best.focus(); best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        }
      }
      if (k === 40) { // ↓ — доорх мөр
        e.preventDefault();
        const rows    = Array.from(document.querySelectorAll('.tv-row-scroll'));
        const rIdx    = rows.indexOf(row);
        const nextRow = rows[rIdx + 1];
        if (nextRow) {
          const nextCards = Array.from(nextRow.querySelectorAll('.tv-card'));
          const best = _nearestCard(nextCards, focused);
          if (best) { best.focus(); best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
        }
      }
    }

    // Hero товчнуудаас ↓ → эхний мөрийн эхний card
    if (isBtn && k === 40) {
      e.preventDefault();
      const firstCard = document.querySelector('.tv-row-scroll .tv-card');
      if (firstCard) { firstCard.focus(); firstCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); }
    }

    if (k === 8 || k === 27) {
      e.preventDefault();
      document.getElementById('tv-hero-play')?.focus();
    }
  });
}

function _nearestCard(cards, ref) {
  const r  = ref.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  let best = cards[0], bestDist = Infinity;
  cards.forEach(c => {
    const cr   = c.getBoundingClientRect();
    const dist = Math.abs((cr.left + cr.width / 2) - cx);
    if (dist < bestDist) { bestDist = dist; best = c; }
  });
  return best;
}
