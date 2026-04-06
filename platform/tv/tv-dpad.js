/* tv-dpad.js — TV D-pad (Remote) navigation
   Android TV remote товчнууд:
     ← 37  ↑ 38  → 39  ↓ 40  OK/Enter 13  Back 8/27
*/

// ── CSS: focus ring + cursor нуух ──────────────────────────────
const tvCSS = document.createElement('style');
tvCSS.textContent = `
  * { cursor: none !important; }
  .mcard:focus {
    outline: 3px solid #D4AF37 !important;
    outline-offset: 3px !important;
    transform: scale(1.07) !important;
    z-index: 100 !important;
    box-shadow: 0 0 20px rgba(212,175,55,0.6) !important;
    transition: transform 0.15s ease, box-shadow 0.15s ease !important;
  }
  .scroll-btn { display: none !important; }
  .btn-watch:focus, .mcls:focus, button:focus {
    outline: 3px solid #D4AF37 !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(tvCSS);

// ── Helpers ────────────────────────────────────────────────────
function _makeFocusable() {
  document.querySelectorAll('.mcard').forEach(c => {
    if (!c.getAttribute('tabindex')) {
      c.setAttribute('tabindex', '0');
      c.setAttribute('role', 'button');
    }
  });
}

function _getRow(card)   { return card.closest('.scroll-row'); }
function _cards(row)     { return Array.from(row ? row.querySelectorAll('.mcard') : []); }

function _moveInRow(card, dir) {
  const row   = _getRow(card);
  const cards = _cards(row);
  const next  = cards[cards.indexOf(card) + dir];
  if (next) {
    next.focus();
    next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  } else if (row) {
    row.scrollBy({ left: dir * 300, behavior: 'smooth' });
  }
}

function _moveVertical(card, dir) {
  const row     = _getRow(card);
  if (!row) return;
  const allRows = Array.from(document.querySelectorAll('.scroll-row'));
  const nextRow = allRows[allRows.indexOf(row) + dir];
  if (!nextRow) return;
  const nextCards = _cards(nextRow);
  if (!nextCards.length) return;
  const curRect = card.getBoundingClientRect();
  let best = nextCards[0], bestDist = Infinity;
  nextCards.forEach(c => {
    const r    = c.getBoundingClientRect();
    const dist = Math.abs((r.left + r.width / 2) - (curRect.left + curRect.width / 2));
    if (dist < bestDist) { bestDist = dist; best = c; }
  });
  best.focus();
  best.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ── Keyboard handler ───────────────────────────────────────────
document.addEventListener('keydown', e => {
  const key     = e.keyCode;
  const focused = document.activeElement;
  const isCard  = focused && focused.classList.contains('mcard');

  // Back → нээлттэй modal хаах
  if (key === 8 || key === 27) {
    const openModal = document.querySelector('.modal-bg.open, .modal.open');
    if (openModal) {
      e.preventDefault();
      const closeBtn = openModal.querySelector('.mcls, [onclick*="closeM"]');
      if (closeBtn) closeBtn.click();
      if (window._tvLastCard) setTimeout(() => window._tvLastCard.focus(), 100);
      return;
    }
  }

  if (!isCard) return;

  const DIRS = { 37: [-1, 'h'], 39: [+1, 'h'], 38: [-1, 'v'], 40: [+1, 'v'], 13: [0, 'ok'] };
  const action = DIRS[key];
  if (!action) return;
  e.preventDefault();
  window._tvLastCard = focused;

  const [dir, axis] = action;
  if (axis === 'h') _moveInRow(focused, dir);
  if (axis === 'v') _moveVertical(focused, dir);
  if (axis === 'ok') {
    focused.click();
    setTimeout(() => {
      const btn = document.querySelector('.btn-watch, #movieModal .btn-watch');
      if (btn) btn.focus();
    }, 200);
  }
});

// ── MutationObserver — динамик card-уудад tabindex ─────────────
new MutationObserver(_makeFocusable).observe(document.body, { childList: true, subtree: true });

window.addEventListener('DOMContentLoaded', () => {
  _makeFocusable();
  setTimeout(() => { const first = document.querySelector('.mcard'); if (first) first.focus(); }, 800);
});

console.log('[TV] D-pad navigation идэвхжлээ');
