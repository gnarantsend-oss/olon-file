// ══════════════════════════════════════════════════
// player/player.js  —  Видео тоглуулагч
// openPlayer({ title, embed, poster }) — дуудна
// HLS стрим нэмэх бол player-hls.js тусдаа файл үүсгэ
// ══════════════════════════════════════════════════

import { openModal, closeModal } from '../ui/modal.js';

/**
 * Кино эсвэл анги тоглуулах
 * @param {{ title: string, embed: string, poster?: string }} item
 */
window.openPlayer = function (item) {
  if (!item?.embed) {
    window.showToast?.('Видео холбоос алга байна');
    return;
  }

  // Iframe src тавих
  const frame = document.getElementById('playerFrame');
  if (frame) {
    frame.src = item.embed;
  }

  // Гарчиг харуулах
  const title = document.getElementById('playerTitle');
  if (title) title.textContent = item.title || '';

  openModal('playerModal');
};

/** Player modal хаахад iframe зогсоох */
window.closePlayerModal = function () {
  const frame = document.getElementById('playerFrame');
  if (frame) frame.src = '';
  closeModal('playerModal');
};
