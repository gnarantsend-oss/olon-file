// =========================================================
//  RGB ХӨДӨЛГӨӨНТЭЙ FAVICON — N үсэг (canvas-д зурна)
// =========================================================
(function () {
  let hue = 0;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  setInterval(() => {
    ctx.clearRect(0, 0, 32, 32);

    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.roundRect(0, 0, 32, 32, 8);
    ctx.fill();

    ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
    ctx.shadowBlur = 8;
    ctx.fillText('N', 16, 18);

    link.href = canvas.toDataURL('image/png');
    hue = (hue + 5) % 360;
  }, 100);
})();
