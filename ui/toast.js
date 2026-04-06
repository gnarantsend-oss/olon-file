// ══════════════════════════════════════════════════
// ui/toast.js  —  Богино мэдэгдэл харуулах
// Ашиглах:  showToast('Амжилттай!')
// ══════════════════════════════════════════════════

const DURATION_MS = 3000;

/** Дэлгэцийн дээр богино мэдэгдэл харуулна */
export function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), DURATION_MS);
}

// HTML onclick="" дотроос ашиглахад
window.showToast = showToast;
