// ── TV UI — HTML бүтэц байгуулах ────────────────────────────
// tv-ui.js-н "// ── 3. HTML бүтэц" хэсэг

export function buildTVShell() {
  const root = document.createElement('div');
  root.id = 'tv-root';
  root.innerHTML = `
    <!-- NAV -->
    <nav id="tv-nav">
      <div class="tv-nav-logo">🎬 Nabooshy</div>
      <button class="tv-nav-tab active" tabindex="0" data-page="home">🏠 Нүүр</button>
      <button class="tv-nav-tab" tabindex="0" data-page="movies">🎬 Кино</button>
      <button class="tv-nav-tab" tabindex="0" data-page="series">📺 Цуврал</button>
      <button class="tv-nav-tab" tabindex="0" data-page="search">🔍 Хайх</button>
    </nav>

    <!-- HERO -->
    <div id="tv-hero">
      <div id="tv-hero-bg"></div>
      <div id="tv-hero-info">
        <div id="tv-hero-cat"></div>
        <div id="tv-hero-title">Ачааллаж байна...</div>
        <div id="tv-hero-meta"></div>
        <div id="tv-hero-desc"></div>
        <div id="tv-hero-btns">
          <button class="tv-hero-btn primary" tabindex="0" id="tv-hero-play">▶ Тоглуулах</button>
          <button class="tv-hero-btn secondary" tabindex="0" id="tv-hero-info-btn">ℹ Дэлгэрэнгүй</button>
        </div>
      </div>
      <div id="tv-hero-dots"></div>
    </div>

    <!-- ROWS (dynamic) -->
    <div id="tv-rows"></div>
    <div class="tv-bottom-space"></div>

    <!-- DETAIL MODAL -->
    <div id="tv-detail-modal">
      <div id="tv-detail-box">
        <img id="tv-detail-poster" src="" alt="">
        <div id="tv-detail-info">
          <div id="tv-detail-cat"></div>
          <div id="tv-detail-title"></div>
          <div id="tv-detail-meta"></div>
          <div id="tv-detail-desc"></div>
          <div id="tv-detail-btns">
            <button class="tv-hero-btn primary" id="tv-detail-play" tabindex="0">▶ Тоглуулах</button>
            <button class="tv-hero-btn secondary" id="tv-detail-close" tabindex="0">✕ Хаах</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PLAYER MODAL -->
    <div id="tv-player-modal">
      <video id="tv-player-video" controls playsinline></video>
      <div id="tv-player-overlay">
        <div id="tv-player-top">
          <button class="tv-ctrl-btn" id="tv-player-back" tabindex="0">← Буцах</button>
          <div id="tv-player-title"></div>
        </div>
        <div id="tv-player-controls">
          <div id="tv-progress-wrap">
            <div id="tv-progress-bar"></div>
          </div>
          <div id="tv-player-btns">
            <button class="tv-ctrl-btn" id="tv-btn-rw" tabindex="0">⏪ 10с</button>
            <button class="tv-ctrl-btn" id="tv-btn-play" tabindex="0">⏸</button>
            <button class="tv-ctrl-btn" id="tv-btn-ff" tabindex="0">10с ⏩</button>
            <span id="tv-player-time">0:00 / 0:00</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);
}
