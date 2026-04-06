// ══════════════════════════════════════════════════
// ui/fill.js  —  Row / Grid дүүргэх хэрэгслүүд
// fillRow()   — Хэвтээ scroll мөр
// fillGrid()  — Grid хэлбэрийн хайрцаг
// ══════════════════════════════════════════════════

import { makeCard } from './card.js';

/**
 * Scroll row мөрийг карт-аар дүүргэх
 * @param {string}   rowId     — Элементийн id
 * @param {Array}    items     — Кино жагсаалт
 * @param {function} onClickFn — Карт дарахад (item) => {}
 */
export function fillRow(rowId, items, onClickFn) {
  const el = document.getElementById(rowId);
  if (!el) return;
  el.innerHTML = '';
  items.forEach((item, i) => {
    el.appendChild(makeCard(item, () => onClickFn(item), i === 0));
  });
}

/**
 * Grid хэлбэрийн хайрцагт карт-уудыг байрлуулах
 * @param {string}   gridId    — Элементийн id
 * @param {Array}    items     — Кино жагсаалт
 * @param {function} onClickFn — Карт дарахад (item) => {}
 */
export function fillGrid(gridId, items, onClickFn) {
  const el = document.getElementById(gridId);
  if (!el) return;
  el.innerHTML = '';
  items.forEach((item, i) => {
    el.appendChild(makeCard(item, () => onClickFn(item), i < 4));
  });
}
