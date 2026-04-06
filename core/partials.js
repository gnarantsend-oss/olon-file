// ══════════════════════════════════════════════════
// core/partials.js  —  HTML хэсгүүдийг динамикаар ачаалах
//
// Шинэ partial нэмэхдээ:
//   1. partials/ доор файл үүсгэнэ
//   2. PARTIALS жагсаалтад нэмнэ
// ══════════════════════════════════════════════════

const PARTIALS = [
  'partials/navbar.html',
  'partials/hero.html',
  'partials/page-movies.html',
  'partials/page-series.html',
  'partials/page-search.html',
  'partials/modals.html',
];

/**
 * Бүх partial HTML файлыг дарааллаар татаж
 * document.body-д inject хийнэ.
 * app.js эхлэхээс өмнө await хийгдэх ёстой.
 */
export async function loadPartials() {
  const container = document.getElementById('app-root');

  for (const url of PARTIALS) {
    try {
      const res  = await fetch(url);
      const html = await res.text();
      container.insertAdjacentHTML('beforeend', html);
    } catch (err) {
      console.error(`[partials] "${url}" ачаалахад алдаа:`, err);
    }
  }

  // Navbar scroll эффект
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 10);
  });
}
