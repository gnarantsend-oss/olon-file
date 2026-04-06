// ══════════════════════════════════════════════════
// ui/scroll.js  —  Хэвтээ scroll товчны логик
// HTML дотор: onclick="scrollRow('rowId', 600)"
// ══════════════════════════════════════════════════

window.scrollRow = function (id, dx) {
  document.getElementById(id)?.scrollBy({ left: dx, behavior: 'smooth' });
};
