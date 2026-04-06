// ══════════════════════════════════════════════════
// core/config.js  —  Бүх тохиргоо ЭНД байна
// Шинэ зүйл нэмэхдээ ЭНД нэмнэ, өөр файл хайхгүй.
// ══════════════════════════════════════════════════

export const CONFIG = {

  // ── API түлхүүрүүд ──────────────────────────────
  TMDB_KEY: '0b34540c864eaaf51207c87c28dabb36',  // The Movie Database

  // ── Өгөгдлийн файлууд ───────────────────────────
  DATA_MOVIES: 'data_movies.json',
  DATA_SERIES: 'data_serial.json',
  DATA_HERO:   'data_hero.json',

  // ── Hero тохиргоо ───────────────────────────────
  HERO_INTERVAL_MS: 8000,   // Hero слайд хэдэн мс-д солигдох

  // ── Fallback утгууд ─────────────────────────────
  FALLBACK_RATING: 7.0,
  FALLBACK_YEAR:   2024,
  FALLBACK_POSTER: 'https://placehold.co/300x450/141414/555?text=No+Image',

  // ── Нүүр хуудасны мөрүүд (жанраар) ─────────────
  // Шинэ жанр нэмэх бол ЭНД нэмж тавина
  HOME_ROWS: [
    { id: 'rowAction',    title: '💥 Тулаант (Action)',        keys: ['action'] },
    { id: 'rowComedy',    title: '😂 Инээдмийн (Comedy)',      keys: ['comedy'] },
    { id: 'rowDrama',     title: '🎭 Драм (Drama)',            keys: ['drama'] },
    { id: 'rowHorror',    title: '👻 Аймшгийн (Horror)',       keys: ['horror'] },
    { id: 'rowSciFi',     title: '🚀 Зөгнөлт (Sci-Fi)',        keys: ['sci-fi', 'science fiction'] },
    { id: 'rowAnimation', title: '🎨 Хүүхэлдэйн (Animation)', keys: ['animation', 'anime'] },
    { id: 'rowThriller',  title: '🔪 Триллер (Thriller)',      keys: ['thriller'] },
    { id: 'rowCrime',     title: '🚨 Гэмт хэрэг (Crime)',      keys: ['crime'] },
    { id: 'rowRomance',   title: '❤️ Хайр дурлал (Romance)',   keys: ['romance'] },
    { id: 'rowAdventure', title: '🗺 Адал явдалт (Adventure)', keys: ['adventure'] },
  ],

  // ── Цуврал жанрууд (Series шүүлтүүр) ────────────
  SERIES_GENRES: [
    { label: '🌐 Бүгд',       keys: [] },
    { label: '🎭 Драма',       keys: ['drama', 'romance'] },
    { label: '⚔️ Action',     keys: ['action', 'adventure'] },
    { label: '😂 Инээдмийн',  keys: ['comedy'] },
    { label: '🎨 Аниме',       keys: ['animation', 'anime'] },
    { label: '👻 Аймшиг',     keys: ['horror', 'thriller'] },
  ],

};
