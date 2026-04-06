/* hover-3d.js — Desktop 3D card hover effect (хулгана байвал л) */

if (window.matchMedia('(hover: hover)').matches && !window.isTV) {
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.mcard');
    if (!card) return;
    const rect    = card.getBoundingClientRect();
    const rotateX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -20;
    const rotateY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  20;
    card.style.transform  = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05,1.05,1.05)`;
    card.style.zIndex     = '100';
    card.style.transition = 'transform 0.1s ease-out';
  });

  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.mcard');
    if (!card) return;
    card.style.transform  = '';
    card.style.zIndex     = '1';
    card.style.transition = 'transform 0.5s ease';
  });
}
