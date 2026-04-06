// ══════════════════════════════════════════════════
// pages/series.js  —  Цуврал хуудас
// openSeriesDetail(series) — аль ч газраас дуудаж болно
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';
import { store }  from '../core/store.js';
import { fillGrid } from '../ui/card.js';
import { openModal, closeModal } from '../ui/modal.js';

// ── Цуврал detail modal нээх ────────────────────────────────
window.openSeriesDetail = function (series) {
  // Hero зураг
  const hero = document.getElementById('smHero');
  if (hero) hero.style.backgroundImage = `url('${series.poster}')`;

  setText('smTitle', series.title);
  setHtml('smMeta',  `⭐ ${series.rating} &nbsp;·&nbsp; ${series.year}`);
  setText('smDesc',  series.desc || '');

  // Ангиудын жагсаалт
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

// ── Цуврал хуудасны жанр шүүлтүүр ──────────────────────────
export function buildSeriesPage() {
  const bar = document.getElementById('seriesGenreBar');
  if (!bar || !store.series.length) return;

  bar.innerHTML = '';

  CONFIG.SERIES_GENRES.forEach((genre, i) => {
    const pill = document.createElement('button');
    pill.className = 'gpill' + (i === 0 ? ' on' : '');
    pill.textContent = genre.label;
    pill.onclick = () => {
      bar.querySelectorAll('.gpill').forEach(p => p.classList.remove('on'));
      pill.classList.add('on');
      renderSeriesGrid(genre.keys);
    };
    bar.appendChild(pill);
  });

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
