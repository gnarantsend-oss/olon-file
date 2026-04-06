// ══════════════════════════════════════════════════
// pages/search.js  —  Хайлт хуудас
// Хайлтын логик өөрчлөх бол searchItems() засна
// ══════════════════════════════════════════════════

import { store }    from '../core/store.js';
import { fillGrid } from '../ui/card.js';
import { registerPageEffect } from '../core/router.js';

// Search хуудас нээгдэхэд input-д focus
registerPageEffect('search', () => {
  setTimeout(() => document.getElementById('searchInput')?.focus(), 300);
});

/** Хайлтын мөр оруулахад дуудагдана */
window.doSearch = function (query) {
  // Navbar болон search хуудасны input-ийг синхрончлох
  const q = query.trim().toLowerCase();
  syncInputs(query);

  if (!q) {
    fillGrid('searchGrid', [], () => {});
    setText('searchCount', '');
    return;
  }

  // Кино болон цуврал хоёроос хайх
  const results = searchItems(q);

  setText('searchCount', `"${query}" — ${results.length} үр дүн`);

  fillGrid('searchGrid', results, item => {
    // Кино эсвэл цуврал мэдэх арга: episodes байгаа эсэх
    if (item.episodes) window.openSeriesDetail(item);
    else window.openMovieDetail(item);
  });
};

/** Хайлтын логик — гарчиг болон жанраас хайна */
function searchItems(q) {
  const match = item =>
    item.title.toLowerCase().includes(q) ||
    (item.title_en || '').toLowerCase().includes(q) ||
    item.cat.includes(q);

  return [
    ...store.movies.filter(match),
    ...store.series.filter(match),
  ];
}

/** Navbar болон search хуудасны input утгыг ижил болгох */
function syncInputs(value) {
  const nav  = document.getElementById('navSearchInput');
  const page = document.getElementById('searchInput');
  if (nav  && nav.value  !== value) nav.value  = value;
  if (page && page.value !== value) page.value = value;
}

function setText(id, t) { const el = document.getElementById(id); if (el) el.textContent = t; }
