// ══════════════════════════════════════════════════
// core/router.js  —  Хуудас шилжилт
// Шинэ хуудас нэмэх бол:
//   1. index.html-д  <div class="page" id="page-foo"> нэмнэ
//   2. SIDE_EFFECTS доор тухайн хуудасны логикийг холбоно
// ══════════════════════════════════════════════════

// Хуудас нэгдэх үед дуудагдах функцуудыг ЭНД бүртгэнэ
const SIDE_EFFECTS = {};

/**
 * Хуудасны side effect бүртгэх
 * @example  registerPageEffect('search', () => focusSearchInput())
 */
export function registerPageEffect(pageId, fn) {
  SIDE_EFFECTS[pageId] = fn;
}

/**
 * Хуудас руу очих
 * @param {string} pageId  — 'movies' | 'series' | 'search' | ...
 */
export function gotoPage(pageId) {
  // Бүх хуудасны active класс арилгах
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));

  // Тухайн хуудсыг идэвхжүүлэх
  document.getElementById('page-' + pageId)?.classList.add('active');

  // Nav tab идэвхжүүлэх
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('t-' + pageId)?.classList.add('active');

  // Дээш гүйлгэх
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Тухайн хуудасны нэмэлт логик ажиллуулах
  SIDE_EFFECTS[pageId]?.();
}

// Глобал болгох (HTML onclick="" дотор ашиглах боломж олгоно)
window.gotoPage = gotoPage;
