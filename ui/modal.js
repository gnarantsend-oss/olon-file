// ══════════════════════════════════════════════════
// ui/modal.js  —  Modal нээх/хаах удирдлага
// Шинэ modal нэмэх бол:
//   1. index.html-д modal-bg + modal нэмнэ
//   2. openModal('myModal') дуудна
// ══════════════════════════════════════════════════

/** Modal нээх */
export function openModal(modalId) {
  document.getElementById(modalId)?.classList.add('open');
  document.body.style.overflow = 'hidden'; // scroll хаах
}

/** Modal хаах */
export function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  el.classList.remove('open');
  document.body.style.overflow = '';

  // Player modal бол iframe src цэвэрлэх (видео зогсоох)
  if (modalId === 'playerModal') {
    document.getElementById('playerFrame')?.setAttribute('src', '');
  }
}

/** Modal-ийн ар талыг дарахад хаах */
export function closeBg(event, modalId) {
  if (event.target.classList.contains('modal-bg')) closeModal(modalId);
}

// HTML onclick="" дотроос ашиглах
window.openModal  = openModal;
window.closeModal = closeModal;
window.closeBg    = closeBg;
