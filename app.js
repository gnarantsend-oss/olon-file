// ══════════════════════════════════════════════════
// app.js  —  Апп-ийн эхлэл (Entry Point)
//
// Ачаалах дараалал:
//   1. loadPartials()  — HTML хэсгүүдийг DOM-д оруулах
//   2. UI модулиуд (toast, modal, card, hero)
//   3. Page модулиуд (movies, series, search)
//   4. Player
//   5. Router — side effects холбох
//   6. Data loader — өгөгдөл татаж эхлэх
//
// Шинэ хуудас нэмэхдээ:
//   1. partials/page-foo.html үүсгэнэ
//   2. core/partials.js → PARTIALS жагсаалтад нэмнэ
//   3. pages/foo.js үүсгэнэ
//   4. Доор import нэмнэ
// ══════════════════════════════════════════════════

// ── HTML хэсгүүдийг эхэлж ачаалах ──────────────────────────
import { loadPartials } from './core/partials.js';
await loadPartials();

// ── UI үндсэн модулиуд ──────────────────────────────────────
import './ui/toast.js';
import './ui/modal.js';
import './ui/card.js';
import './ui/hero.js';

// ── Хуудсын модулиуд ────────────────────────────────────────
import './pages/movies.js';
import './pages/series.js';
import './pages/search.js';

// ── Player ──────────────────────────────────────────────────
import './player/player.js';

// ── Router side effects ─────────────────────────────────────
import { registerPageEffect } from './core/router.js';
import { buildSeriesPage }    from './pages/series.js';

// 'series' хуудас нээгдэхэд жанр шүүлтүүр барих
registerPageEffect('series', () => buildSeriesPage());

// ── Өгөгдөл татах — хамгийн сүүлд ──────────────────────────
import { loadAllData } from './core/loader.js';
loadAllData();
