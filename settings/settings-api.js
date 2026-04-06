/* settings-api.js — Public API + touch drag to close */

import { saveState, applyAll } from './settings-state.js';

export function buildAPI(S) {
  window._nabooSettings = {
    open()  { document.getElementById('settingsModal').classList.add('open'); document.body.style.overflow = 'hidden'; },
    close() { document.getElementById('settingsModal').classList.remove('open'); document.body.style.overflow = ''; },

    set(key, val) {
      S[key] = val; saveState(S); applyAll(S);
      if (key === 'notifications' && val && 'Notification' in window) Notification.requestPermission();
    },
    setAccent(key, el) {
      S.accent = key; saveState(S); applyAll(S);
      document.querySelectorAll('.s-color-dot').forEach(d => d.classList.remove('active'));
      el.classList.add('active');
    },
    setVol(v) {
      S.volume = parseInt(v); saveState(S);
      const lbl = document.getElementById('s-vol-label');
      if (lbl) lbl.textContent = v + '%';
      if (window.HERO_VOLUME !== undefined) window.HERO_VOLUME = parseInt(v) / 100;
    },
    clearHistory() {
      if (confirm('Үзсэн түүхийг устгах уу?')) {
        localStorage.removeItem('naboo_history');
        if (window.toast) window.toast('✅ Түүх цэвэрлэгдлээ');
      }
    },
    clearWatchlist() {
      if (confirm('Хадгалсан жагсаалтыг бүгдийг устгах уу?')) {
        localStorage.removeItem('naboo_watchlist');
        window.userWatchlist = [];
        if (window.toast) window.toast('✅ Жагсаалт цэвэрлэгдлээ');
      }
    },
  };
}

export function initTouchDrag() {
  const sheet = document.querySelector('.settings-sheet');
  if (!sheet) return;
  let startY = 0, isDragging = false;
  sheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; isDragging = true; }, { passive: true });
  sheet.addEventListener('touchmove',  e => { if (!isDragging) return; const dy = e.touches[0].clientY - startY; if (dy > 0) sheet.style.transform = `translateY(${dy}px)`; }, { passive: true });
  sheet.addEventListener('touchend',   e => { const dy = e.changedTouches[0].clientY - startY; sheet.style.transform = ''; if (dy > 100) window._nabooSettings.close(); isDragging = false; });
}
