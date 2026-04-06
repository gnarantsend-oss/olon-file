// ══════════════════════════════════════════════════
// pages/series.js  —  Цуврал хуудас
// openSeriesDetail(series) — аль ч газраас дуудаж болно
// ══════════════════════════════════════════════════

import { CONFIG }              from '../core/config.js';
import { store }               from '../core/store.js';
import { fillGrid }            from '../ui/fill.js';
import { openModal, closeModal } from '../ui/modal.js';
import { buildGenreBar }       from '../ui/genre-filter.js';

// ── Цуврал detail modal нээх ────────────────────────────────
window.openSeriesDetail = function (series) {
  const hero = document.getElementById('smHero');
  if (hero) hero.style.backgroundImage = `url('${series.poster}')`;

  setText('smTitle', series.title);
  setHtml('smMeta',  `⭐ ${series.rating} &nbsp;·&nbsp; ${series.year}`);
  setText('smDesc',  series.desc || '');

  const grid = document.getElementById('smEpGrid');
  if (grid) {
    grid.innerHTML = '';
    (series.episodes || []).forEach((ep, i) => {
      const item = document.createElement('div');
      item.className = 'ep-item';
      item.innerHTML = `
        <div class="ep-num">${i + 1}</div>
        <div class="ep-label">${ep.title}</div>`;

      item.onclick = () => {
        closeModal('seriesModal');
        setTimeout(() => {
          window.openPlayer({
            title:  `${series.title} — ${i + 1}-р анги`,
            embed:  ep.embed,
            poster: series.poster,
          });
        }, 300);
      };

      grid.appendChild(item);
    });
  }

  openModal('seriesModal');
};

// ── Цуврал хуудас барих ─────────────────────────────────────
export function buildSeriesPage() {
  if (!store.series.length) return;

  buildGenreBar('seriesGenreBar', CONFIG.SERIES_GENRES, keys => renderSeriesGrid(keys));
  renderSeriesGrid([]); // Эхлээд бүгдийг харуулах
}

/** Жанраар шүүж grid харуулах */
function renderSeriesGrid(keys) {
  const items = keys.length
    ? store.series.filter(s => keys.some(k => s.cat.includes(k)))
    : store.series;

  fillGrid('seriesGrid', items, series => window.openSeriesDetail(series));

  const count = document.getElementById('seriesCount');
  if (count) count.textContent = `${items.length} цуврал`;
}

function setText(id, t) { const el = document.getElementById(id); if (el) el.textContent = t; }
function setHtml(id, h) { const el = document.getElementById(id); if (el) el.innerHTML = h; }
