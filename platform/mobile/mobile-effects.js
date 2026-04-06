// ── Mobile — Visual effects ──────────────────────────────────
// hacker-mobile.js-н "4. TOUCH RIPPLE", "6. SIGNAL",
// "7. GLITCH", "8. HAPTIC", "9. BOTTOM NAV" хэсгүүд

import { rnd, pick } from './mobile-detect.js';

// ── CSS animation inject (нэг л удаа) ───────────────────────
function _injectAnimations() {
  if (document.getElementById('nabRippleStyle')) return;
  const s = document.createElement('style');
  s.id = 'nabRippleStyle';
  s.textContent = `
    @keyframes nabRipple {
      0%   { width:0;height:0;opacity:1; }
      100% { width:80px;height:80px;opacity:0; }
    }
    @keyframes nabGlitchFlash {
      0%,100% { transform:none; opacity:1; }
      10% { transform:translateX(-3px) skewX(-2deg); opacity:0.9; }
      20% { transform:translateX(3px) skewX(2deg); }
      30% { transform:translateX(-2px); opacity:0.95; }
      40% { transform:none; }
      50% { transform:translateY(-2px) skewY(1deg); }
      60% { transform:translateY(2px); opacity:0.92; }
      70% { transform:none; }
      80% { transform:translateX(1px) skewX(-1deg); }
      90% { transform:none; opacity:1; }
    }
    @keyframes nabSignalIn {
      0%   { transform:translateY(100%); opacity:0; }
      100% { transform:translateY(0);    opacity:1; }
    }
    @keyframes nabSignalOut {
      0%   { transform:translateY(0);    opacity:1; }
      100% { transform:translateY(-100%);opacity:0; }
    }
  `;
  document.head.appendChild(s);
}

// ── 1. Touch ripple ─────────────────────────────────────────
export function initTouchRipple() {
  _injectAnimations();
  document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const ripple = document.createElement('div');
    ripple.style.cssText = [
      'position:fixed;pointer-events:none;z-index:99998',
      `left:${touch.clientX}px;top:${touch.clientY}px`,
      'width:0;height:0',
      'border-radius:50%',
      'border:1.5px solid rgba(0,255,65,0.7)',
      'transform:translate(-50%,-50%)',
      'box-shadow:0 0 8px rgba(0,255,65,0.4)',
      'animation:nabRipple 0.6s ease-out forwards',
    ].join(';');
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }, { passive: true });
}

// ── 2. Incoming signal notification ─────────────────────────
const _signals = [
  { title: 'SIGNAL INTERCEPTED', body: 'New encrypted stream available'     },
  { title: 'PROXY ROTATED',      body: 'Location masked → Frankfurt'         },
  { title: 'CONTENT UNLOCKED',   body: '14 geo-blocked titles accessed'      },
  { title: 'SECURE TUNNEL',      body: 'AES-256 encryption active'           },
  { title: 'SYSTEM ALERT',       body: 'Anonymous mode: verified'            },
  { title: 'DATA STREAM',        body: `${rnd(200,900)} MB/s throughput`     },
  { title: 'USER VERIFIED',      body: 'Identity masked successfully'        },
  { title: 'SCAN COMPLETE',      body: `${rnd(40,200)} new titles indexed`   },
];

export function showSignal() {
  _injectAnimations();
  const sig = pick(_signals);
  const el  = document.createElement('div');
  el.style.cssText = [
    'position:fixed;left:16px;right:16px;z-index:99900',
    'bottom:90px',
    'background:rgba(2,10,2,0.97)',
    'border:1px solid rgba(0,255,65,0.4)',
    'border-left:3px solid #00ff41',
    'padding:12px 16px',
    'font-family:"Share Tech Mono",monospace',
    'animation:nabSignalIn 0.3s ease-out forwards',
    'box-shadow:0 0 20px rgba(0,255,65,0.15),0 8px 32px rgba(0,0,0,0.8)',
  ].join(';');
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
      <span style="width:6px;height:6px;background:#00ff41;border-radius:50%;display:inline-block;box-shadow:0 0 6px rgba(0,255,65,0.8)"></span>
      <span style="font-size:9px;color:#00ff41;letter-spacing:2px">${sig.title}</span>
    </div>
    <div style="font-size:11px;color:rgba(0,255,65,0.6);letter-spacing:0.5px">${sig.body}</div>
  `;

  const bnav = document.getElementById('bottomNav');
  if (bnav && getComputedStyle(bnav).display !== 'none') el.style.bottom = '160px';

  document.body.appendChild(el);
  if (navigator.vibrate) navigator.vibrate([30, 20, 60]);

  setTimeout(() => {
    el.style.animation = 'nabSignalOut 0.3s ease-in forwards';
    setTimeout(() => el.remove(), 320);
  }, 3500);
}

// ── 3. Screen glitch ─────────────────────────────────────────
export function triggerGlitch() {
  _injectAnimations();
  const glitch = document.createElement('div');
  glitch.style.cssText = [
    'position:fixed;inset:0;z-index:99000;pointer-events:none',
    'animation:nabGlitchFlash 0.5s ease-out forwards',
  ].join(';');

  for (let i = 0; i < 4; i++) {
    const bar = document.createElement('div');
    bar.style.cssText = [
      `position:absolute;left:0;right:0;top:${rnd(5,90)}%;height:${rnd(2,12)}px`,
      `background:rgba(0,255,65,${(Math.random() * 0.15 + 0.03).toFixed(2)})`,
      `transform:translateX(${rnd(-20,20)}px)`,
    ].join(';');
    glitch.appendChild(bar);
  }

  const rgb = document.createElement('div');
  rgb.style.cssText = [
    'position:absolute;inset:0;mix-blend-mode:screen',
    'background:linear-gradient(transparent 30%,rgba(0,255,65,0.03) 30.5%,transparent 31%)',
    'animation:nabGlitchFlash 0.5s ease-out forwards',
  ].join(';');
  glitch.appendChild(rgb);

  document.body.appendChild(glitch);
  if (navigator.vibrate) navigator.vibrate(15);
  setTimeout(() => glitch.remove(), 550);
}

// ── 4. Player haptic feedback ────────────────────────────────
export function initPlayerHaptic() {
  document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-watch') || e.target.closest('.mcard-play')) {
      if (navigator.vibrate) navigator.vibrate([40, 20, 80, 20, 40]);
    }
    if (e.target.closest('.mcard')) {
      if (navigator.vibrate) navigator.vibrate(20);
    }
  });
}

// ── 5. Bottom nav hacker style ───────────────────────────────
export function hackBottomNav() {
  const bnav = document.getElementById('bottomNav');
  if (!bnav) return;

  bnav.style.borderTop  = '1px solid rgba(0,255,65,0.2)';
  bnav.style.background = 'rgba(2,10,2,0.97)';
  bnav.style.boxShadow  = '0 -4px 20px rgba(0,255,65,0.05)';

  const mo = new MutationObserver(() => {
    if (navigator.vibrate) navigator.vibrate(12);
  });
  document.querySelectorAll('.bnav-item').forEach(item => {
    mo.observe(item, { attributes: true, attributeFilter: ['class'] });
  });
}
