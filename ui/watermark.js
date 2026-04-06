// ══════════════════════════════════════════════════
// ui/watermark.js  —  Circuit board NABOOSHY эффект
// ══════════════════════════════════════════════════

export function initWatermark() {
  const canvas = document.createElement('canvas');
  canvas.id = 'watermarkCanvas';
  Object.assign(canvas.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '100%',
    height:        '100%',
    zIndex:        '0',
    pointerEvents: 'none',
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  // ── Тохиргоо ────────────────────────────────────
  const BRAND   = 'NABOOSHY';
  const FILLER  = '01 10 11 00 ';       // brand хоорондох дэвсгэр тоо
  const COLOR   = '#00ff41';
  const GRID    = 48;                   // шугамын зай
  const SPEED   = 1.2;

  let W, H, streams = [];

  // ── Нэг шугамын дата ────────────────────────────
  function makeStream(x, y, angle) {
    // Шугам бүрт brand нэрийг санамсаргүй байрлалд оруулах
    const brandPos = Math.floor(Math.random() * 6 + 2);
    let content = '';
    for (let i = 0; i < 20; i++) {
      if (i === brandPos) content += '  ' + BRAND + '  ';
      else content += FILLER;
    }
    return {
      x, y,
      angle,                            // deg
      offset: Math.random() * 800,      // анхны байрлал
      content,
      brandPos,
      alpha:  Math.random() * 0.12 + 0.04,
      fontSize: Math.floor(Math.random() * 4 + 10),
    };
  }

  function buildStreams() {
    streams = [];
    // Хэвтээ шугамууд (баруун тийш)
    for (let y = GRID; y < H; y += GRID) {
      streams.push(makeStream(0, y, 0));
    }
    // Босоо шугамууд (доош)
    for (let x = GRID; x < W; x += GRID * 3) {
      streams.push(makeStream(x, 0, 90));
    }
    // Ташуу шугамууд
    for (let i = 0; i < 6; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H * 0.5;
      streams.push(makeStream(x, y, -25));
    }
  }

  function resize() {
    canvas.width  = W = window.innerWidth;
    canvas.height = H = window.innerHeight;
    buildStreams();
  }

  // ── Нэг шугам зурах ─────────────────────────────
  function drawStream(s) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate((s.angle * Math.PI) / 180);

    ctx.font = `600 ${s.fontSize}px 'Courier New', monospace`;

    // Шугам урт
    const len = Math.max(W, H) * 1.5;
    const charW = ctx.measureText('0').width + 1;
    const totalChars = Math.floor(len / charW);

    for (let i = 0; i < totalChars; i++) {
      const charX = (i * charW - s.offset % (s.content.length * charW / 1)) % len;
      if (charX < 0 || charX > len) continue;

      const ch = s.content[(i + Math.floor(s.offset / charW * 0.3)) % s.content.length];

      // NABOOSHY үсэг тод, бусад нь бүдэг
      const isBrand = (() => {
        const slice = s.content.slice(
          Math.floor((i + Math.floor(s.offset / charW * 0.3)) % s.content.length),
          Math.floor((i + Math.floor(s.offset / charW * 0.3)) % s.content.length) + 1
        );
        const pos = (i + Math.floor(s.offset / charW * 0.3)) % s.content.length;
        const brandStart = s.content.indexOf(BRAND);
        return pos >= brandStart && pos < brandStart + BRAND.length;
      })();

      if (isBrand) {
        ctx.fillStyle = `rgba(180,255,180,${Math.min(s.alpha * 3.5, 0.55)})`;
        ctx.shadowColor = COLOR;
        ctx.shadowBlur  = 8;
      } else {
        ctx.fillStyle = `rgba(0,255,65,${s.alpha})`;
        ctx.shadowBlur = 0;
      }

      ctx.fillText(ch, charX, 0);
    }

    // Шугамын үргэлжлэлийн зураас
    ctx.strokeStyle = `rgba(0,255,65,${s.alpha * 0.4})`;
    ctx.lineWidth   = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.stroke();

    ctx.restore();

    s.offset += SPEED;
  }

  // ── Уулзах цэгүүд (circuit node) ────────────────
  function drawNodes() {
    for (let x = GRID; x < W; x += GRID * 3) {
      for (let y = GRID; y < H; y += GRID) {
        if (Math.random() > 0.997) {
          // Мөчлөгт гэрлэх цэг
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(180,255,180,0.7)';
          ctx.shadowColor = COLOR;
          ctx.shadowBlur  = 12;
          ctx.fill();
          ctx.shadowBlur  = 0;
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    streams.forEach(drawStream);
    drawNodes();
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}
