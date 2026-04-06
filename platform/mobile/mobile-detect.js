// ── Mobile — Илрүүлэлт ба utility функцүүд ──────────────────

export const isMobile =
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  ('ontouchstart' in window && window.innerWidth < 900);

export const $    = (s)       => document.querySelector(s);
export const rnd  = (a, b)    => Math.floor(Math.random() * (b - a + 1)) + a;
export const rndF = (a, b)    => (Math.random() * (b - a) + a).toFixed(1);
export const pick = (arr)     => arr[Math.floor(Math.random() * arr.length)];
