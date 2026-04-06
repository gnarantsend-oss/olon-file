// ══════════════════════════════════════════════════
// ui/matrix-bg.js  —  Matrix хэв маягийн арын анимэйшн
// initMatrixBg()   — апп эхлэхэд нэг удаа дуудна
// ══════════════════════════════════════════════════

export function initMatrixBg() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrixCanvas';
  Object.assign(canvas.style, {
    position:   'fixed',
    top:        '0',
    left:       '0',
    width:      '100%',
    height:     '100%',
    zIndex:     '0',
    pointerEvents: 'none',
    opacity:    '0.18',
  });
  document.body.prepend(canvas);

  // body болон #app-root дээр z-index тохируулах
  document.body.style.position = 'relative';
  const root = document.getElementById('app-root');
  if (root) root.style.position = 'relative', root.style.zIndex = '1';

  const ctx = canvas.getContext('2d');

  // Кирилл + латин + тоо + япон тэмдэгтүүд
  const CHARS = 'АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ日月火水木金土';
  const FONT_SIZE = 14;
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    drops = Array(cols).fill(1);
  }

  function draw() {
    // Сүүдэр давхарга — урсгал мөр дагуулах
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${FONT_SIZE}px monospace`;

    drops.forEach((y, i) => {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * FONT_SIZE;

      // Толгой тэмдэгт — цагаан гэрэл
      if (y * FONT_SIZE > canvas.height * 0.8) {
        ctx.fillStyle = '#afffaf';
      } else {
        ctx.fillStyle = '#00ff41';
      }

      ctx.fillText(char, x, y * FONT_SIZE);

      // Санамсаргүй байрлалаас дахин эхлэх
      if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
}
