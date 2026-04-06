// ══════════════════════════════════════════════════
// pages/movies.js  —  Нүүр хуудас (Кино жагсаалт)
// buildHomeRows() — өгөгдөл ачаалсны дараа дуудна
// Шинэ мөр нэмэх: config.js → HOME_ROWS жагсаалтад
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';
import { store }  from '../core/store.js';
import { fillRow, fillGrid } from '../ui/card.js';
import { openModal } from '../ui/modal.js';

// ── Кино detail modal нээх ──────────────────────────────────
window.openMovieDetail = function (movie) {
  // Modal-ийн агуулга дүүргэх
  const hero = document.getElementById('mHero');
  if (hero) hero.style.backgroundImage = `url('${movie.poster}')`;

  setText('mTitle', movie.title);
  setHtml('mMeta',  `⭐ ${movie.rating} &nbsp;·&nbsp; ${movie.year} &nbsp;·&nbsp; ${movie.cat || ''}`);
  setText('mDesc',  movie.desc || '');

  // "Үзэх" товч
  const acts = document.getElementById('mActs');
  if (acts) {
    acts.innerHTML = `
      <button class="btn-watch" onclick="openPlayer(window._detailMovie)">
        ▶ ЯГ ОДОО ҮЗЭХ
      </button>`;
  }

  // Одоогийн киног глобалд хадгалах (player ашиглана)
  window._detailMovie = movie;
  openModal('movieModal');
};

// ── Нүүр хуудасны бүх мөр барих ────────────────────────────
export function buildHomeRows() {
  // Цуврал мөр
  fillRow('rowSeries', store.series.slice(0, 20), m => window.openSeriesDetail(m));

  // Жанраар тусгаарласан кино мөрүүд
  const container = document.getElementById('dynamicRows');
  if (!container || !CONFIG.HOME_ROWS) return;
  container.innerHTML = '';

  CONFIG.HOME_ROWS.forEach(({ id, title, keys }) => {
    const items = store.movies
      .filter(m => keys.some(k => m.cat.includes(k)))
      .slice(0, 25);

    if (!items.length) return; // Хоосон мөр үүсгэхгүй

    const section = document.createElement('section');
    section.className = 'sec';
    section.innerHTML = `
      <div class="sec-head">
        <div class="sec-title">${title}</div>
      </div>
      <div class="row-wrap">
        <button class="scroll-btn left"  onclick="scrollRow('${id}', -600)">❮</button>
        <div class="scroll-row" id="${id}"></div>
        <button class="scroll-btn right" onclick="scrollRow('${id}', 600)">❯</button>
      </div>`;

    container.appendChild(section);
    fillRow(id, items, m => window.openMovieDetail(m));
  });
}

// ── Scroll helper (HTML onclick дотор ашиглах) ──────────────
window.scrollRow = function (id, dx) {
  document.getElementById(id)?.scrollBy({ left: dx, behavior: 'smooth' });
};

// ── Кино хайлт (search.js ашиглана) ────────────────────────
window.searchMovies = function (query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return [
    ...store.movies.filter(m => m.title.toLowerCase().includes(q) || m.cat.includes(q)),
    ...store.series.filter(m => m.title.toLowerCase().includes(q) || m.cat.includes(q)),
  ];
};

// ── Utility ─────────────────────────────────────────────────
function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setHtml(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
