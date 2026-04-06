// =========================================================
//  DEVTOOLS ХАМГААЛАЛТ
//  1. Товчлуур хориглох
//  2. Matrix код бороо
//  3. Аймшигтай дуу (Web Audio)
//  4. Хуурамч IP scan
//  5. DevTools илрүүлэх
//  6. Tab-аас гарвал видео pause
//  7. Copy watermark
//  8. Нуугдмал watermark
// =========================================================
(function () {

  // ── 1. Товчлуур хориглох ─────────────────────────────────
  document.addEventListener('contextmenu', e => { e.preventDefault(); return false; });
  document.addEventListener('keydown', e => {
    if (e.key === 'F12') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c','K','k'].includes(e.key)) { e.preventDefault(); return false; }
    if (e.ctrlKey && ['U','u','S','s'].includes(e.key)) { e.preventDefault(); return false; }
  });
  document.addEventListener('selectstart', e => { e.preventDefault(); return false; });
  document.addEventListener('dragstart',   e => { e.preventDefault(); return false; });
  setInterval(() => { try { console.clear(); } catch (e) {} }, 100);

  // ── 2. Matrix код бороо ──────────────────────────────────
  function startMatrix() {
    const c = document.getElementById('__matrix');
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
    const cols  = Math.floor(c.width / 16);
    const drops = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ∑∂∫≠≈ABCDEF0123456789';
    setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = '#ff2200';
      ctx.font = '14px Courier New';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 16, y * 16);
        if (y * 16 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 40);
  }

  // ── 3. Аймшигтай дуу (Web Audio) ─────────────────────────
  function playAlarm() {
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      function beep(freq, start, dur, type) {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.type = type || 'sawtooth';
        o.frequency.setValueAtTime(freq, ac.currentTime + start);
        o.frequency.exponentialRampToValueAtTime(freq * 0.5, ac.currentTime + start + dur);
        g.gain.setValueAtTime(0.3, ac.currentTime + start);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + dur);
        o.start(ac.currentTime + start);
        o.stop(ac.currentTime + start + dur);
      }
      beep(880, 0,    0.2, 'sawtooth');
      beep(440, 0.25, 0.2, 'sawtooth');
      beep(880, 0.5,  0.2, 'sawtooth');
      beep(220, 0.75, 0.5, 'sawtooth');
      beep(660, 0,    1.2, 'square');
    } catch (e) {}
  }

  // ── 4. Хуурамч IP scan ───────────────────────────────────
  function fakeIPScan() {
    const box = document.getElementById('__ipbox');
    if (!box) return;
    const steps = [
      '📡 IP ХАЯГ ТОДОРХОЙЛЖ БАЙНА...',
      '🔍 БАЙРШИЛ ТОГТООЖ БАЙНА...',
      '🌐 БРАУЗЕР МЭДЭЭЛЭЛ ЦУГЛУУЛЖ БАЙНА...',
      '⚡ БҮРТГЭЛ РҮҮ ИЛГЭЭЖ БАЙНА...',
      '🚨 ХЯНАЛТ ИДЭВХЖЛЭЭ — ТА БАРИГДЛАА',
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) { box.textContent = steps[i++]; }
      else { clearInterval(iv); }
    }, 1200);
  }

  // ── 5. DevTools илрүүлэх ─────────────────────────────────
  const _overlay  = document.getElementById('__devblock');
  let   _devOpen  = false;
  const _thresh   = 300;
  let   _alarmed  = false;
  let   _matrixOn = false;
  const _isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 768;

  setInterval(() => {
    if (_isMobile) return;
    const open = (window.outerWidth  - window.innerWidth  > _thresh) ||
                 (window.outerHeight - window.innerHeight > _thresh);
    if (open !== _devOpen) {
      _devOpen = open;
      if (_overlay) _overlay.style.display = open ? 'block' : 'none';
      if (open) {
        document.querySelectorAll('video,iframe').forEach(el => {
          try {
            if (el.tagName === 'VIDEO') el.pause();
            else { const s = el.src; el.src = ''; el.src = s; }
          } catch (e) {}
        });
        if (!_matrixOn) { startMatrix(); _matrixOn = true; }
        if (!_alarmed)  { playAlarm(); fakeIPScan(); _alarmed = true; }
      }
    }
  }, 500);

  // ── 6. Tab-аас гарвал видео pause ────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.querySelectorAll('video').forEach(v => { v._wasPlaying = !v.paused; v.pause(); });
    } else {
      document.querySelectorAll('video').forEach(v => { if (v._wasPlaying) v.play().catch(() => {}); });
    }
  });

  // ── 7. Copy watermark ────────────────────────────────────
  document.addEventListener('copy', e => {
    const sel = window.getSelection ? window.getSelection().toString() : '';
    if (!sel) return;
    try {
      e.clipboardData.setData('text/plain', sel + '\n\n— Эх сурвалж: nabo.pages.dev');
      e.preventDefault();
    } catch (err) {}
  });

  // ── 8. Нуугдмал watermark ────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    let uid = localStorage.getItem('_nabo_uid');
    if (!uid) {
      uid = 'U' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
      localStorage.setItem('_nabo_uid', uid);
    }
    const wm = document.createElement('div');
    wm.style.cssText = 'position:fixed;bottom:8px;right:10px;font-size:9px;color:rgba(255,255,255,0.04);pointer-events:none;z-index:9999;user-select:none;letter-spacing:1px;';
    wm.textContent = 'nabo · ' + uid;
    document.body.appendChild(wm);
  });

})();
