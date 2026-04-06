// ══════════════════════════════════════════════════
// ui/hero-dots.js  —  Hero dot товч + автомат таймер
// buildDots()   — dot цэгүүд үүсгэх
// startTimer()  — автомат слайд эхлүүлэх
// resetTimer()  — таймер дахин эхлүүлэх
// ══════════════════════════════════════════════════

import { CONFIG } from '../core/config.js';
import { store }  from '../core/store.js';

let timer = null;
let _onSlide = null; // hero.js-аас тохируулагдана

/** hero.js-ийн showSlide callback бүртгэх */
export function setSlideCallback(fn) {
  _onSlide = fn;
}

/** Hero dot товчнуудыг барих */
export function buildDots() {
  const el = document.getElementById('heroDots');
  if (!el) return;
  el.innerHTML = '';
  store.heroes.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className    = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Слайд ${i + 1}`);
    dot.onclick = () => { resetTimer(); _onSlide?.(i); };
    el.appendChild(dot);
  });
}

/** Автомат слайд таймер эхлүүлэх */
export function startTimer() {
  timer = setInterval(() => _onSlide?.(-1), CONFIG.HERO_INTERVAL_MS);
}

/** Таймер дахин эхлүүлэх */
export function resetTimer() {
  clearInterval(timer);
  startTimer();
}
