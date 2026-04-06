// ══════════════════════════════════════════════════
// core/normalize.js  —  JSON өгөгдөл стандарт формат руу хөрвүүлэх
// normalizeMovie()   — кино нэг мөр
// normalizeSeries()  — цуврал нэг мөр
// ══════════════════════════════════════════════════

import { CONFIG } from './config.js';

/** Кино нэг мөрийг стандарт формат руу хөрвүүлэх */
export function normalizeMovie(item, index) {
  const rating = parseFloat(item.ratings?.imdb || item.rating) || CONFIG.FALLBACK_RATING;
  const cat    = Array.isArray(item.genre) ? item.genre.join(',').toLowerCase() : (item.genre || '').toLowerCase();

  return {
    id:       'm' + index,
    title:    item.mongolian_title || item.title,
    title_en: item.title,
    year:     item.year    || CONFIG.FALLBACK_YEAR,
    rating,
    poster:   item.poster_link || item.poster || CONFIG.FALLBACK_POSTER,
    cat,
    country:  (item.country || 'mn').toLowerCase(),
    embed:    item.embed_links?.[0] || item.embed || '',
  };
}

/** Цуврал нэг мөрийг стандарт формат руу хөрвүүлэх */
export function normalizeSeries(item, index, prefix = 's') {
  const rating = parseFloat(item.ratings?.imdb || item.rating) || CONFIG.FALLBACK_RATING;
  const cat    = Array.isArray(item.genre) ? item.genre.join(',').toLowerCase() : (item.genre || '').toLowerCase();

  return {
    id:       prefix + index,
    title:    item.mongolian_title || item.title,
    title_en: item.title,
    year:     item.year || CONFIG.FALLBACK_YEAR,
    rating,
    poster:   item.poster_link || item.poster || CONFIG.FALLBACK_POSTER,
    cat,
    country:  (item.country || 'mn').toLowerCase(),
    desc:     item.desc || '',
    episodes: (item.episodes || []).map(ep => ({
      title: ep.episode_title || ep.title || 'Анги',
      embed: ep.embed_links?.[0] || ep.embed || '',
    })),
  };
}
