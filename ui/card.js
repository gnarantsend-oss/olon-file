// ══════════════════════════════════════════════════
// ui/card.js  —  Кино карт компонент
// makeCard(item, onClick) → HTMLElement
// Карт дизайн өөрчлөх бол ЭНД засна
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';

/**
 * Кино карт DOM элемент үүсгэх
 * @param {object}   item      — Кино эсвэл цуврал объект
 * @param {function} onClick   — Карт дарахад юу хийх
 * @param {boolean}  isFirst   — Эхний карт уу (eager load)
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

/**
 * Poster зураг дутуу бол TMDB-с хайж авах
 * Ашиглах: onerror="fixPoster(this, 'Movie Title')"
 */
window.fixPoster = async function (imgEl, titleEn) {
  if (imgEl.dataset.tried) return;
  imgEl.dataset.tried = '1';
  try {
    const res  = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${CONFIG.TMDB_KEY}&query=${encodeURIComponent(titleEn)}`);
    const data = await res.json();
    const hit  = data.results?.find(x => x.poster_path);
    if (hit) { imgEl.src = `https://image.tmdb.org/t/p/w500${hit.poster_path}`; return; }
  } catch (_) {}
  imgEl.src = CONFIG.FALLBACK_POSTER;
};

/** HTML attribute-д тавих утгыг аюулгүй болгох */
function escapeAttr(str) {
  return String(str).replace(/'/g, "\\'");
}

/**
 * Scroll row мөрийг карт-аар дүүргэх
 * @param {string}   rowId     — Элементийн id
 * @param {Array}    items     — Кино жагсаалт
 * @param {function} onClickFn — Карт дарахад (item) => {}
 */
export function fillRow(rowId, items, onClickFn) {
  const el = document.getElementById(rowId);
  if (!el) return;
  el.innerHTML = '';
  items.forEach((item, i) => {
    el.appendChild(makeCard(item, () => onClickFn(item), i === 0));
  });
}

/**
 * Grid хэлбэрийн хайрцагт карт-уудыг байрлуулах
 * @param {string}   gridId    — Элементийн id
 * @param {Array}    items     — Кино жагсаалт
 * @param {function} onClickFn — Карт дарахад (item) => {}
 */
export function fillGrid(gridId, items, onClickFn) {
  const el = document.getElementById(gridId);
  if (!el) return;
  el.innerHTML = '';
  items.forEach((item, i) => {
    el.appendChild(makeCard(item, () => onClickFn(item), i < 4));
  });
}
