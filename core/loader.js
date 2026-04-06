// ══════════════════════════════════════════════════
// core/loader.js  —  JSON өгөгдөл татах
// loadAllData()  — апп эхлэхэд нэг удаа дуудагдана
// ══════════════════════════════════════════════════

import { CONFIG }           from './config.js';
import { store }            from './store.js';
import { normalizeMovie, normalizeSeries } from './normalize.js';
import { buildHomeRows }    from '../pages/movies.js';
import { initHero }         from '../ui/hero.js';

/** Бүх өгөгдөл татах */
export async function loadAllData() {
  try {
    const [moviesRaw, seriesRaw, heroRaw] = await Promise.all([
      fetch(CONFIG.DATA_MOVIES).then(r => r.json()),
      fetch(CONFIG.DATA_SERIES).then(r => r.json()).catch(() => []),
      fetch(CONFIG.DATA_HERO).then(r => r.json()).catch(() => null),
    ]);

    if (Array.isArray(heroRaw) && heroRaw.length) {
      store.heroes = heroRaw;
    }

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

    if (Array.isArray(seriesRaw)) {
      seriesRaw.forEach((item, i) => store.series.push(normalizeSeries(item, i, 'sj')));
    }

    initHero();
    buildHomeRows();

  } catch (err) {
    console.error('[loader] Өгөгдөл татахад алдаа:', err);
  }
}
