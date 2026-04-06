// ── TV UI — CSS дарж оруулах ─────────────────────────────────
// tv-ui.js-н "// ── 2. CSS" хэсэг

export function injectTVStyles() {
  if (document.getElementById('_tv_css')) return;
  const css = document.createElement('style');
  css.id = '_tv_css';
  css.textContent = `
    :root {
      --tv-bg: #0f0f0f;
      --tv-bg2: #1a1a1a;
      --tv-accent: #D4AF37;
      --tv-text: #ffffff;
      --tv-muted: rgba(255,255,255,0.55);
      --tv-focus: #D4AF37;
      --tv-card-w: 320px;
      --tv-card-h: 200px;
      --tv-radius: 10px;
      --tv-nav-h: 70px;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--tv-bg); color: var(--tv-text); font-family: 'Segoe UI', Arial, sans-serif; overflow: hidden; cursor: none !important; }

    /* ── NAV ── */
    #tv-nav {
      position: fixed; top: 0; left: 0; right: 0; height: var(--tv-nav-h);
      background: linear-gradient(to bottom, rgba(0,0,0,0.95), transparent);
      display: flex; align-items: center; padding: 0 60px; gap: 8px; z-index: 100;
    }
    .tv-nav-logo { font-size: 22px; font-weight: 800; color: var(--tv-accent); letter-spacing: 1px; margin-right: 40px; text-transform: uppercase; }
    .tv-nav-tab { padding: 8px 22px; border-radius: 30px; font-size: 17px; font-weight: 600; color: var(--tv-muted); background: none; border: none; cursor: pointer; transition: all 0.2s; }
    .tv-nav-tab.active, .tv-nav-tab:focus { color: #fff; background: rgba(255,255,255,0.12); outline: 2px solid var(--tv-focus); outline-offset: 2px; }

    /* ── HERO ── */
    #tv-hero { width: 100vw; height: 56.25vw; max-height: 85vh; position: relative; overflow: hidden; flex-shrink: 0; }
    #tv-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center top; transition: background-image 0.6s ease; }
    #tv-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%), linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%); }
    #tv-hero-info { position: absolute; bottom: 80px; left: 60px; max-width: 550px; z-index: 2; }
    #tv-hero-cat { font-size: 14px; font-weight: 700; color: var(--tv-accent); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 12px; }
    #tv-hero-title { font-size: 52px; font-weight: 900; line-height: 1.1; margin-bottom: 16px; text-shadow: 0 2px 20px rgba(0,0,0,0.8); }
    #tv-hero-meta { font-size: 18px; color: var(--tv-muted); margin-bottom: 12px; }
    #tv-hero-desc { font-size: 16px; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 28px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    #tv-hero-btns { display: flex; gap: 16px; }
    .tv-hero-btn { display: flex; align-items: center; gap: 10px; padding: 14px 32px; border-radius: 8px; font-size: 18px; font-weight: 700; border: none; cursor: pointer; transition: all 0.2s; }
    .tv-hero-btn.primary { background: #fff; color: #000; }
    .tv-hero-btn.secondary { background: rgba(255,255,255,0.2); color: #fff; border: 2px solid rgba(255,255,255,0.4); }
    .tv-hero-btn:focus { outline: 3px solid var(--tv-focus) !important; outline-offset: 3px !important; transform: scale(1.05); }
    #tv-hero-dots { position: absolute; bottom: 30px; left: 60px; display: flex; gap: 8px; z-index: 2; }
    .tv-hdot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.35); transition: all 0.3s; border: none; cursor: pointer; }
    .tv-hdot.active { background: var(--tv-accent); width: 24px; border-radius: 4px; }

    /* ── CONTENT ── */
    #tv-root { position: fixed; inset: 0; overflow-y: auto; overflow-x: hidden; scroll-behavior: smooth; }
    #tv-root::-webkit-scrollbar { display: none; }

    /* ── ROW ── */
    .tv-row { padding: 0 0 40px 0; }
    .tv-row-title { font-size: 20px; font-weight: 700; padding: 0 60px 16px; color: var(--tv-text); letter-spacing: 0.5px; }
    .tv-row-scroll { display: flex; gap: 16px; padding: 8px 60px 8px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; }
    .tv-row-scroll::-webkit-scrollbar { display: none; }

    /* ── CARD ── */
    .tv-card { flex-shrink: 0; width: var(--tv-card-w); height: var(--tv-card-h); border-radius: var(--tv-radius); overflow: hidden; position: relative; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; background: var(--tv-bg2); }
    .tv-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease; }
    .tv-card-ov { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%); display: flex; flex-direction: column; justify-content: flex-end; padding: 14px; }
    .tv-card-title { font-size: 15px; font-weight: 700; line-height: 1.3; }
    .tv-card-sub { font-size: 13px; color: var(--tv-muted); margin-top: 3px; }
    .tv-card-play-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; border-radius: 50%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
    .tv-card:focus { outline: none !important; transform: scale(1.1) !important; box-shadow: 0 0 0 3px var(--tv-focus), 0 20px 50px rgba(0,0,0,0.7) !important; z-index: 50 !important; }
    .tv-card:focus .tv-card-play-icon { opacity: 1; }
    .tv-card:focus img { transform: scale(1.05); }

    /* ── PLAYER MODAL ── */
    #tv-player-modal { position: fixed; inset: 0; background: #000; z-index: 1000; display: none; flex-direction: column; }
    #tv-player-modal.open { display: flex; }
    #tv-player-video { width: 100%; height: 100%; background: #000; }
    #tv-player-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 60px; background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.85) 100%); opacity: 0; transition: opacity 0.3s; }
    #tv-player-modal:focus-within #tv-player-overlay, #tv-player-modal.show-controls #tv-player-overlay { opacity: 1; }
    #tv-player-top { display: flex; align-items: center; gap: 20px; }
    #tv-player-back { background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; padding: 8px; }
    #tv-player-back:focus { outline: 2px solid var(--tv-focus); border-radius: 6px; }
    #tv-player-title { font-size: 22px; font-weight: 700; }
    #tv-player-controls { display: flex; flex-direction: column; gap: 14px; }
    #tv-progress-wrap { position: relative; height: 6px; background: rgba(255,255,255,0.3); border-radius: 3px; cursor: pointer; }
    #tv-progress-bar { height: 100%; background: var(--tv-accent); border-radius: 3px; width: 0%; transition: width 0.5s linear; }
    #tv-player-btns { display: flex; align-items: center; gap: 20px; }
    .tv-ctrl-btn { background: none; border: none; color: #fff; font-size: 26px; cursor: pointer; padding: 8px 14px; border-radius: 8px; transition: background 0.2s; }
    .tv-ctrl-btn:focus { outline: 2px solid var(--tv-focus); background: rgba(255,255,255,0.15); }
    #tv-player-time { font-size: 16px; color: var(--tv-muted); margin-left: auto; }

    /* ── DETAIL MODAL ── */
    #tv-detail-modal { position: fixed; inset: 0; z-index: 500; display: none; background: rgba(0,0,0,0.85); align-items: center; justify-content: center; }
    #tv-detail-modal.open { display: flex; }
    #tv-detail-box { width: 70vw; max-height: 80vh; background: var(--tv-bg2); border-radius: 16px; overflow: hidden; display: flex; box-shadow: 0 30px 80px rgba(0,0,0,0.8); }
    #tv-detail-poster { width: 280px; flex-shrink: 0; object-fit: cover; }
    #tv-detail-info { padding: 40px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }
    #tv-detail-cat { font-size: 13px; color: var(--tv-accent); text-transform: uppercase; letter-spacing: 2px; }
    #tv-detail-title { font-size: 36px; font-weight: 900; line-height: 1.2; }
    #tv-detail-meta { font-size: 16px; color: var(--tv-muted); }
    #tv-detail-desc { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8); }
    #tv-detail-btns { display: flex; gap: 14px; margin-top: 10px; }
    .tv-bottom-space { height: 80px; }
  `;
  document.head.appendChild(css);
}
