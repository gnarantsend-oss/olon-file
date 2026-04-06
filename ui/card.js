// ══════════════════════════════════════════════════
// ui/card.js  —  Кино карт компонент
// makeCard(item, onClick, isFirst) → HTMLElement
// Карт дизайн өөрчлөх бол ЭНД засна
// ══════════════════════════════════════════════════

import { escapeAttr } from './poster.js';
import './poster.js';   // window.fixPoster бүртгэгдэнэ

/**
 * Кино карт DOM элемент үүсгэх
 * @param {object}   item    — Кино эсвэл цуврал объект
 * @param {function} onClick — Карт дарахад юу хийх
 * @param {boolean}  isFirst — Эхний карт уу (eager load)
 */
export function makeCard(item, onClick, isFirst = false) {
  const card = document.createElement('div');
  card.className = 'mcard';
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', item.title);
  card.setAttribute('tabindex', '0');

  const loadAttr = isFirst ? 'fetchpriority="high" loading="eager"' : 'loading="lazy" decoding="async"';

  card.innerHTML = `
    <div class="mcard-poster-wrap">
      <img class="mcard-poster"
           src="${item.poster}"
           alt="${item.title}"
           ${loadAttr}
           onerror="fixPoster(this, '${escapeAttr(item.title_en || item.title)}')">
      <div class="mcard-overlay">
        <div class="mcard-play-icon">▶</div>
      </div>
    </div>
    <div class="mcard-info">
      <div class="mcard-title">${item.title}</div>
      <div class="mcard-meta">⭐ ${item.rating} · ${item.year}</div>
    </div>`;

  card.addEventListener('click', onClick);
  card.addEventListener('keydown', e => { if (e.key === 'Enter') onClick(); });

  return card;
}
