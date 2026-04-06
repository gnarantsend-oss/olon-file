// ══════════════════════════════════════════════════
// core/loader.js  —  JSON өгөгдөл татах
// Өгөгдлийн форматыг өөрчлөх бол normalizeMovie,
// normalizeSeries функцийг засна.
// ══════════════════════════════════════════════════

import { CONFIG } from './config.js';
import { store }  from './store.js';
import { buildHomeRows } from '../pages/movies.js';
import { initHero } from '../ui/hero.js';

/** Кино нэг мөрийг стандарт формат руу хөрвүүлэх */
function normalizeMovie(item, index) {
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
function normalizeSeries(item, index, prefix = 's') {
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

/** Бүх өгөгдөл татах — апп эхлэхэд нэг удаа дуудагдана */
export async function loadAllData() {
  try {
    // Гурван файл зэрэг татах
    const [moviesRaw, seriesRaw, heroRaw] = await Promise.all([
      fetch(CONFIG.DATA_MOVIES).then(r => r.json()),
      fetch(CONFIG.DATA_SERIES).then(r => r.json()).catch(() => []),
      fetch(CONFIG.DATA_HERO).then(r => r.json()).catch(() => null),
    ]);

    // ── Hero слайд ──────────────────────────────
    if (Array.isArray(heroRaw) && heroRaw.length) {
      store.heroes = heroRaw;
    }

    // ── data_movies.json дотроос кино болон цуврал ялгах ──
    if (Array.isArray(moviesRaw)) {
      moviesRaw.forEach((item, i) => {
        const isSeries = item.type?.toLowerCase().includes('series');
        if (isSeries) {
          store.series.push(normalizeSeries(item, i, 'ms'));
        } else {
          store.movies.push(normalizeMovie(item, i));
        }
      });
    }

    // ── data_serial.json — тусдаа цуврал файл ──
    if (Array.isArray(seriesRaw)) {
      seriesRaw.forEach((item, i) => store.series.push(normalizeSeries(item, i, 'sj')));
    }

    // Өгөгдөл бэлэн болсны дараа UI барих
    initHero();
    buildHomeRows();

  } catch (err) {
    console.error('[loader] Өгөгдөл татахад алдаа:', err);
  }
}
