/**
 * platform/tv/tv-init.js — TV UI эхлүүлэгч
 * Энэ файл tv-ui.js-г орлуулна.
 * Desktop / Mobile-д огт нөлөөлөхгүй.
 */

import './tv-detect.js';
import { tvState }              from './tv-state.js';
import { injectTVStyles }       from './tv-styles.js';
import { buildTVShell }         from './tv-shell.js';
import { renderHero, showHero } from './tv-hero.js';
import { renderRows }           from './tv-rows.js';
import { openDetail, closeDetail, bindDetailModal } from './tv-detail.js';
import { openPlayer, bindPlayerControls }           from './tv-player.js';
import { bindNavTabs, initKeyboardNavigation }      from './tv-navigation.js';
import { loadTVData }           from './tv-data.js';

if (!window.isTV) {
  // TV биш бол юу ч хийхгүй
} else {
  _initTVUI();
}

function _initTVUI() {
  document.addEventListener('DOMContentLoaded', async () => {
    // Хуучин UI нуух
    document.querySelectorAll('body > *:not(#tv-root):not(script):not(style)')
      .forEach(el => el.style.display = 'none');

    injectTVStyles();
    buildTVShell();

    // Callback-уудыг тодорхойлох
    const onHeroRestart = () => {
      tvState.heroTimer = setInterval(
        () => showHero((tvState.heroIdx + 1) % tvState.heroList.length, openPlayer, _handleDetail),
        8000
      );
    };

    const _handleDetail = (m) => openDetail(m, openPlayer);

    bindPlayerControls();
    bindDetailModal(openPlayer, () => closeDetail(onHeroRestart));
    bindNavTabs();
    initKeyboardNavigation(onHeroRestart);

    // Өгөгдөл ачаалах
    const { movies, serials, heroList } = await loadTVData();
    renderHero(heroList, openPlayer, _handleDetail);
    renderRows(movies, serials, _handleDetail);

    // Эхний товч руу focus
    setTimeout(() => document.querySelector('#tv-hero-play')?.focus(), 400);
  });

  console.log('[TV] YouTube-style TV UI идэвхжлээ 🎬');
}
