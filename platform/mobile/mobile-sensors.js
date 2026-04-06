// ── Mobile — Device sensors (gyro/accelerometer) ────────────
// hacker-mobile.js-н "3. DEVICE SENSORS" хэсэг

export function initSensors() {
  const canvas = document.getElementById('nabMatrixCanvas');
  if (!canvas) return;

  let lastBeta = 0, lastGamma = 0;

  function handleOrientation(e) {
    const beta  = e.beta  || 0;
    const gamma = e.gamma || 0;

    lastBeta  += (beta  - lastBeta)  * 0.08;
    lastGamma += (gamma - lastGamma) * 0.08;

    const rx = Math.max(-12, Math.min(12, lastBeta  * 0.3));
    const ry = Math.max(-12, Math.min(12, lastGamma * 0.3));
    canvas.style.transform       = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    canvas.style.transformOrigin = 'center center';
  }

  if (typeof DeviceOrientationEvent === 'undefined') return;

  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS 13+ — touch event дээр permission асуух
    document.addEventListener('touchend', function askPerm() {
      DeviceOrientationEvent.requestPermission()
        .then(state => {
          if (state === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
          }
        }).catch(() => {});
      document.removeEventListener('touchend', askPerm);
    }, { once: true });
  } else {
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
  }
}
