// ── Mobile — Entry point (hacker-mobile.js-г орлуулна) ──────

import { isMobile, rnd }         from './mobile-detect.js';
import { runBoot }               from './mobile-boot.js';
import { showLiveFeed }          from './mobile-feed.js';
import { initSensors }           from './mobile-sensors.js';
import { initDeviceHUD }         from './mobile-hud.js';
import {
  initTouchRipple,
  showSignal,
  triggerGlitch,
  initPlayerHaptic,
  hackBottomNav,
} from './mobile-effects.js';

if (!isMobile) {
  // Мобайл биш бол юу ч хийхгүй
} else {
  _init();
}

function _init() {
  initTouchRipple();
  initSensors();
  initDeviceHUD();
  initPlayerHaptic();

  setTimeout(runBoot, 200);

  // Boot дууссаны дараа бусад feature-үүдийг эхлүүлэх
  setTimeout(() => {
    hackBottomNav();
    showLiveFeed();

    setTimeout(() => showSignal(), rnd(15000, 25000));
    setInterval(() => showSignal(), rnd(40000, 70000));

    setInterval(() => {
      if (Math.random() > 0.5) triggerGlitch();
    }, rnd(30000, 55000));
  }, 6000);
}

function _run() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }
}
