// ══════════════════════════════════════════════════
// ui/hero.js  —  Hero banner слайд
// initHero() — store.heroes бэлэн болсны дараа дуудна
// Слайдын харагдац өөрчлөх бол index.html #hero засна
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';
import { store }  from '../core/store.js';

let currentIndex = 0;
let timer        = null;

/** Hero-г эхлүүлэх — loader.js-ийн дараа дуудагдана */
export function initHero() {
  // Hero өгөгдөл байхгүй бол MOVIES-аас авна
  if (!store.heroes.length) {
    store.heroes = store.movies.slice(0, 10).map(m => ({
      title: m.title,
      desc:  '',
      img:   m.poster,
      embed: m.embed,
      ref:   m,
    }));
  }
  if (!store.heroes.length) return;

  showSlide(0);
  buildDots();
  startTimer();
}

/** Тухайн индексийн слайд харуулах */
function showSlide(index) {
  currentIndex = (index + store.heroes.length) % store.heroes.length;
  const h = store.heroes[currentIndex];

  // Зураг солих
  const bg = document.getElementById('heroBg');
  if (bg) bg.style.backgroundImage = `url('${h.img || h.poster || ''}')`;

  // Текст солих
  setText('heroTitle', h.title || '');
  setText('heroDesc',  h.desc  || '');

  // Dot идэвхжүүлэх
  document.querySelectorAll('.hero-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });

  // "Үзэх" товчны утга
  const btn = document.getElementById('heroWatch');
  if (btn) {
    btn.onclick = () => {
      if (h.ref) window.openMovieDetail?.(h.ref);
      else if (h.embed) window.openPlayer?.({ title: h.title, embed: h.embed });
    };
  }
}

/** Hero dot цэгүүд үүсгэх */
function buildDots() {
  const el = document.getElementById('heroDots');
  if (!el) return;
  el.innerHTML = '';
  store.heroes.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className    = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Слайд ${i + 1}`);
    dot.onclick = () => { resetTimer(); showSlide(i); };
    el.appendChild(dot);
  });
}

/** Автомат слайд эхлүүлэх */
function startTimer() {
  timer = setInterval(() => showSlide(currentIndex + 1), CONFIG.HERO_INTERVAL_MS);
}

/** Таймер дахин эхлүүлэх (dot дарахад) */
function resetTimer() {
  clearInterval(timer);
  startTimer();
}

/** Аюулгүй текст оруулах */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
