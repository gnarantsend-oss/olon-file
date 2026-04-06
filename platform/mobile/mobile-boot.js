// ── Mobile — Boot sequence ───────────────────────────────────
// hacker-mobile.js-н "1. BOOT SEQUENCE" хэсэг

export function runBoot() {
  const alreadyBooted = sessionStorage.getItem('nab_booted');
  if (alreadyBooted) return;

  const overlay = document.createElement('div');
  overlay.id = 'nabBoot';
  overlay.style.cssText = [
    'position:fixed;inset:0;z-index:99999',
    'background:#000',
    'display:flex;flex-direction:column;align-items:center;justify-content:center',
    'font-family:"Share Tech Mono",monospace',
    'padding:40px 28px',
    'transition:opacity 0.8s ease',
  ].join(';');

  overlay.innerHTML = `
    <div style="width:100%;max-width:400px">
      <div style="text-align:center;margin-bottom:32px">
        <div style="font-size:13px;color:rgba(0,255,65,0.4);letter-spacing:4px;margin-bottom:8px">NABOOSHY SYSTEM</div>
        <div id="nabBootTitle" style="font-size:28px;color:#00ff41;letter-spacing:3px;text-shadow:0 0 20px rgba(0,255,65,0.7)">INITIALIZING</div>
      </div>
      <div id="nabBootLog" style="font-size:11px;color:rgba(0,255,65,0.6);line-height:2.2;letter-spacing:0.5px;min-height:220px"></div>
      <div style="margin-top:28px">
        <div style="font-size:9px;color:rgba(0,255,65,0.3);letter-spacing:2px;margin-bottom:8px" id="nabBootPct">0%</div>
        <div style="height:2px;background:rgba(0,255,65,0.1);width:100%">
          <div id="nabBootBar" style="height:100%;width:0%;background:#00ff41;transition:width 0.4s ease;box-shadow:0 0 8px rgba(0,255,65,0.8)"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  if (navigator.vibrate) navigator.vibrate([80, 40, 80]);

  const bootLines = [
    { t: 300,  txt: '> Initializing NABOOSHY core...',            ok: true, pct: 8   },
    { t: 700,  txt: '> Scanning device fingerprint...',            ok: true, pct: 16  },
    { t: 1100, txt: '> Establishing encrypted tunnel...',          ok: true, pct: 26  },
    { t: 1600, txt: '> Routing through proxy chain [3 nodes]...',  ok: true, pct: 38  },
    { t: 2000, txt: '> Loading content database [47,203 files]...', ok: true, pct: 52 },
    { t: 2400, txt: '> Bypassing geo-restrictions...',             ok: true, pct: 62  },
    { t: 2800, txt: '> Decrypting stream protocols...',            ok: true, pct: 74  },
    { t: 3200, txt: '> Verifying anonymous session...',            ok: true, pct: 84  },
    { t: 3700, txt: '> Injecting security layer...',               ok: true, pct: 93  },
    { t: 4200, txt: '> System ready.',                             ok: true, pct: 100 },
  ];

  const log = document.getElementById('nabBootLog');
  const bar = document.getElementById('nabBootBar');
  const pct = document.getElementById('nabBootPct');

  bootLines.forEach(({ t, txt, ok, pct: p }) => {
    setTimeout(() => {
      const d = document.createElement('div');
      d.style.cssText = 'opacity:0;transition:opacity 0.2s';
      d.innerHTML = txt + (ok ? ' <span style="color:#00ff41">[OK]</span>' : '');
      log.appendChild(d);
      requestAnimationFrame(() => d.style.opacity = '1');
      bar.style.width  = p + '%';
      pct.textContent  = p + '%';
      if (navigator.vibrate && p === 100) navigator.vibrate([60, 30, 120, 30, 200]);
    }, t);
  });

  setTimeout(() => {
    const title = document.getElementById('nabBootTitle');
    if (title) { title.textContent = 'ACCESS GRANTED'; title.style.color = '#00ffcc'; }
  }, 4400);

  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
      sessionStorage.setItem('nab_booted', '1');
    }, 800);
  }, 5200);
}
