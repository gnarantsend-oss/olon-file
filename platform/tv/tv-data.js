// ── TV UI — Өгөгдөл ачаалах ─────────────────────────────────
// tv-ui.js-н "// ── 4. Өгөгдөл ачаалах" хэсэг

export async function loadTVData() {
  const [movies, serials, heroes] = await Promise.all([
    fetch('data_movies.json').then(r => r.json()).catch(() => []),
    fetch('data_serial.json').then(r => r.json()).catch(() => []),
    fetch('data_hero.json').then(r => r.json()).catch(() => [])
  ]);
  window.MOVIES = movies;
  window.SERIES = serials;

  const heroList = Array.isArray(heroes) && heroes.length ? heroes : movies.slice(0, 8);
  return { movies, serials, heroList };
}
