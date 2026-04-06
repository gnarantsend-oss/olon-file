// ══════════════════════════════════════════════════
// ui/poster.js  —  Постер зураг засах логик
// fixPoster()   — TMDB-с орлуулах зураг хайх
// escapeAttr()  — HTML attribute-д аюулгүй болгох
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';

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
export function escapeAttr(str) {
  return String(str).replace(/'/g, "\\'");
}
