// ── TV UI — Видео тоглуулагч ─────────────────────────────────
// tv-ui.js-н "// ── 8. Player" хэсэг

import { tvState } from './tv-state.js';

export function openPlayer(m) {
  if (!m || !m.embed) return;
  const modal = document.getElementById('tv-player-modal');
  const video = document.getElementById('tv-player-video');
  document.getElementById('tv-player-title').textContent = m.title;

  if (m.embed.includes('.m3u8') && typeof Hls !== 'undefined' && Hls.isSupported()) {
    if (tvState.hls) tvState.hls.destroy();
    tvState.hls = new Hls();
    tvState.hls.loadSource(m.embed);
    tvState.hls.attachMedia(video);
    tvState.hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
  } else {
    video.src = m.embed;
    video.play().catch(() => {});
  }

  modal.classList.add('open');
  showControls();
  document.getElementById('tv-btn-play').focus();
}

export function closePlayer() {
  const video = document.getElementById('tv-player-video');
  video.pause();
  video.src = '';
  if (tvState.hls) { tvState.hls.destroy(); tvState.hls = null; }
  document.getElementById('tv-player-modal').classList.remove('open');
  if (tvState.lastCard) setTimeout(() => tvState.lastCard.focus(), 100);
}

export function showControls() {
  const modal = document.getElementById('tv-player-modal');
  modal.classList.add('show-controls');
  clearTimeout(tvState.ctrlTimeout);
  tvState.ctrlTimeout = setTimeout(() => modal.classList.remove('show-controls'), 4000);
}

export function bindPlayerControls() {
  const video   = document.getElementById('tv-player-video');
  const progBar = document.getElementById('tv-progress-bar');
  const timeEl  = document.getElementById('tv-player-time');
  const playBtn = document.getElementById('tv-btn-play');

  document.getElementById('tv-player-back').onclick = closePlayer;
  document.getElementById('tv-btn-rw').onclick = () => { video.currentTime -= 10; showControls(); };
  document.getElementById('tv-btn-ff').onclick = () => { video.currentTime += 10; showControls(); };

  playBtn.onclick = () => {
    video.paused ? video.play() : video.pause();
    playBtn.textContent = video.paused ? '▶' : '⏸';
    showControls();
  };

  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    progBar.style.width = pct + '%';
    timeEl.textContent  = `${_fmt(video.currentTime)} / ${_fmt(video.duration)}`;
  });
}

function _fmt(s) {
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}
