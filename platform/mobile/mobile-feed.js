// ── Mobile — Live activity feed ticker ──────────────────────
// hacker-mobile.js-н "2. LIVE ACTIVITY FEED" хэсэг

import { rnd, rndF, pick } from './mobile-detect.js';

const feedMessages = [
  () => `> USER_${rnd(1000,9999)} connected from ${pick(['Japan','Germany','Brazil','UK','France','Korea','Australia'])}`,
  () => `> Stream active: ${rnd(89,847)} users watching now`,
  () => `> New content detected: ${rnd(3,21)} titles indexed`,
  () => `> Proxy node rotated → ${pick(['Amsterdam','Singapore','Frankfurt','Tokyo','London'])}`,
  () => `> Encrypted packet: ${rnd(128,999)} MB/s throughput`,
  () => `> Content scan: ${rnd(100,999)} new releases found`,
  () => `> Security check: PASSED ✓`,
  () => `> Bandwidth allocated: ${rndF(2.1,9.8)} MB/s`,
  () => `> Cache refresh: ${rnd(200,800)} items updated`,
  () => `> Ping optimized: ${rnd(8,42)} ms latency`,
  () => `> Anonymous session active: ${rnd(1,59)}m ${rnd(1,59)}s`,
  () => `> CDN node: ${pick(['EU-WEST','ASIA-PAC','US-EAST','AF-SOUTH'])} selected`,
];

export function showLiveFeed() {
  const feed = document.createElement('div');
  feed.id = 'nabLiveFeed';
  feed.style.cssText = [
    'position:fixed;bottom:0;left:0;right:0;z-index:800',
    'background:linear-gradient(to top,rgba(2,10,2,0.97),rgba(2,10,2,0.85))',
    'border-top:1px solid rgba(0,255,65,0.2)',
    'padding:6px 16px 6px',
    'padding-bottom:calc(6px + env(safe-area-inset-bottom,0px))',
    'overflow:hidden;height:36px',
    'pointer-events:none',
  ].join(';');

  const ticker = document.createElement('div');
  ticker.id = 'nabTicker';
  ticker.style.cssText = [
    'font-family:"Share Tech Mono",monospace',
    'font-size:10px;color:rgba(0,255,65,0.6);letter-spacing:0.5px',
    'white-space:nowrap;overflow:hidden;text-overflow:ellipsis',
    'display:flex;align-items:center;gap:8px',
  ].join(';');

  const dot = document.createElement('span');
  dot.style.cssText = 'width:6px;height:6px;background:#00ff41;border-radius:50%;flex-shrink:0;display:inline-block;box-shadow:0 0 6px rgba(0,255,65,0.8)';
  ticker.appendChild(dot);

  const txt = document.createElement('span');
  txt.id = 'nabTickerTxt';
  ticker.appendChild(txt);
  feed.appendChild(ticker);

  const bnav = document.getElementById('bottomNav');
  if (bnav && getComputedStyle(bnav).display !== 'none') {
    feed.style.bottom = '62px';
  }

  document.body.appendChild(feed);

  setInterval(() => { dot.style.opacity = dot.style.opacity === '0' ? '1' : '0'; }, 800);

  let mi = 0;
  function rotateFeed() {
    const el = document.getElementById('nabTickerTxt');
    if (!el) return;
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = feedMessages[mi++ % feedMessages.length]();
      el.style.opacity = '1';
    }, 300);
  }
  rotateFeed();
  setInterval(rotateFeed, 4000);
}
