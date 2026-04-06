/* settings.js — Entry point (бүх хэсгийг нэгтгэнэ) */
import { loadState, applyAll }   from './settings-state.js';
import { buildModalHTML }        from './settings-html.js';
import { buildAPI, initTouchDrag } from './settings-api.js';

(function () {
  'use strict';
  const S = loadState();
  applyAll(S);
  document.body.insertAdjacentHTML('beforeend', buildModalHTML(S));
  buildAPI(S);
  initTouchDrag();
})();
