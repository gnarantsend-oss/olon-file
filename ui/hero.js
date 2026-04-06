// ══════════════════════════════════════════════════
// ui/hero.js  —  Hero banner үндсэн логик
// initHero()  — loader.js-ийн дараа дуудагдана
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';
import { store }  from '../core/store.js';
import { buildDots, startTimer, setSlideCallback } from './hero-dots.js';

let currentIndex = 0;

/** Hero-г эхлүүлэх */
export function initHero() {
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

  // hero-dots.js-д callback дамжуулах
  setSlideCallback((i) => showSlide(i === -1 ? currentIndex + 1 : i));

  showSlide(0);
  buildDots();
  startTimer();
}

/** Тухайн индексийн слайд харуулах */
function showSlide(index) {
  currentIndex = (index + store.heroes.length) % store.heroes.length;
  const h = store.heroes[currentIndex];

  const bg = document.getElementById('heroBg');
  if (bg) bg.style.backgroundImage = `url('${h.img || h.poster || ''}')`;

  setText('heroTitle', h.title || '');
  setText('heroDesc',  h.desc  || '');

  document.querySelectorAll('.hero-dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });

  const btn = document.getElementById('heroWatch');
  if (btn) {
    btn.onclick = () => {
      if (h.ref) window.openMovieDetail?.(h.ref);
      else if (h.embed) window.openPlayer?.({ title: h.title, embed: h.embed });
    };
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
