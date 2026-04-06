/* settings-state.js — Тохиргооны state, load/save, applyAll */

const STORAGE_KEY = 'naboo_settings_v2';

export const defaults = {
  accent:        'red',
  autoplay:      true,
  hls:           true,
  subtitles:     false,
  notifications: false,
  quality:       'auto',
  language:      'mn',
  fontSize:      'medium',
  volume:        80,
  animations:    true,
};

export function loadState()    { try { return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return { ...defaults }; } }
export function saveState(s)   { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

export function applyAll(S) {
  document.body.setAttribute('data-accent', S.accent);
  document.body.className = document.body.className.replace(/\bfs-\w+/g, '').trim();
  document.body.classList.add('fs-' + S.fontSize);
  if (!S.animations) document.documentElement.style.setProperty('--transition-speed', '0s');
  else               document.documentElement.style.removeProperty('--transition-speed');
}
