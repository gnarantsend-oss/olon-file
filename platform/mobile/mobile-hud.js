// ── Mobile — Device HUD (battery, network, time) ────────────
// hacker-mobile.js-н "5. DEVICE HUD" хэсэг

export function initDeviceHUD() {
  const hud = document.createElement('div');
  hud.id = 'nabDevHUD';
  hud.style.cssText = [
    'position:fixed;top:64px;right:12px;z-index:850',
    'font-family:"Share Tech Mono",monospace',
    'font-size:8.5px;color:rgba(0,255,65,0.45)',
    'letter-spacing:0.8px;line-height:2',
    'text-align:right;pointer-events:none',
    'text-shadow:0 0 6px rgba(0,255,65,0.3)',
  ].join(';');
  document.body.appendChild(hud);

  async function updateHUD() {
    let bat = '', net = '';

    if (navigator.getBattery) {
      try {
        const b   = await navigator.getBattery();
        const lvl = Math.round(b.level * 100);
        bat = `BAT: ${b.charging ? '⚡' : ''}${lvl}%`;
      } catch(e) {}
    }

    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      net = `NET: ${(conn.effectiveType || conn.type || '').toUpperCase() || 'ONLINE'}`;
    } else {
      net = `NET: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}`;
    }

    const time = new Date().toTimeString().slice(0, 8);
    hud.innerHTML = [
      bat ? `<div>${bat}</div>` : '',
      `<div>${net}</div>`,
      `<div>TIME: ${time}</div>`,
      `<div>SEC: <span style="color:#00ff41">✓ ON</span></div>`,
    ].join('');
  }

  updateHUD();
  setInterval(updateHUD, 10000);
}
