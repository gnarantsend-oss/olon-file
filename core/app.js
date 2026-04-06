// ── Core — Үндсэн эхлүүлэгч ─────────────────────────────────

import '../platform/tv/tv-init.js';
import '../player/player.js';
import '../player/player-advanced.js';
import './config.js';
import '../pages/weather/weather.js';
import '../pages/games/games.js';
import '../ui/hero/hero.js';
import '../ui/hero/hero-pages.js';
import '../pages/movies.js';
import { buildSeriesPage } from '../pages/series.js';
import '../pages/search.js';
import { loadData } from './data-loader.js';
import '../platform/mobile/mobile-init.js';

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

window.scrollRow = function (id, dx) {
  document.getElementById(id)?.scrollBy({ left: dx, behavior: 'smooth' });
};

window.showSeriesGrid = function () {
  const s = document.getElementById('seriesFullSection');
  if (!s) return;
  if (s.style.display !== 'none') {
    s.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    s.style.display = '';
    buildSeriesPage();
    s.scrollIntoView({ behavior: 'smooth' });
  }
};

window.gotoPage = function (p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + p)?.classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('t-' + p)?.classList.add('active');
  document.querySelectorAll('.bnav-item').forEach(t => t.classList.remove('active'));
  document.getElementById('bn-' + p)?.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.setPageHero)  window.setPageHero(p);
  if (p === 'games'   && window.buildGamesPage)  window.buildGamesPage();
  if (p === 'weather' && window.loadWeather)     window.loadWeather();
  if (p === 'search') setTimeout(() => document.getElementById('searchPageInput')?.focus(), 300);
};

if (window.fetchTMDBNowPlaying) window.fetchTMDBNowPlaying();
loadData();

console.log('%cЗОГС!', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cЭнэ сайтын кодыг хуулахыг хориглоно.', 'font-size: 18px;');
