// ══════════════════════════════════════════════════
// core/store.js  —  Глобал төлөв (State)
// Апп даяар хуваалцах өгөгдөл ЭНД хадгалагдана.
// window.* ашиглахгүй — бүгдийг import/export-оор
// ══════════════════════════════════════════════════

// Кино болон цуврал жагсаалт
export const store = {
  movies: [],   // { id, title, title_en, year, rating, poster, cat, embed }
  series: [],   // { id, title, title_en, year, rating, poster, cat, episodes[] }
  heroes: [],   // Hero слайдын өгөгдөл
};
