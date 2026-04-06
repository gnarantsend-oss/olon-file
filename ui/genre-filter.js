// ══════════════════════════════════════════════════
// ui/genre-filter.js  —  Жанр pill шүүлтүүр
// buildGenreBar(barId, genres, onSelect)
// ══════════════════════════════════════════════════

/**
 * Жанр pill товчнуудыг барих
 * @param {string}   barId    — Pill-үүдийг байрлуулах элементийн id
 * @param {Array}    genres   — [{ label, keys }] жагсаалт
 * @param {function} onSelect — Pill дарахад (keys) => {} дуудагдана
 */
export function buildGenreBar(barId, genres, onSelect) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.innerHTML = '';

  genres.forEach((genre, i) => {
    const pill = document.createElement('button');
    pill.className = 'gpill' + (i === 0 ? ' on' : '');
    pill.textContent = genre.label;
    pill.onclick = () => {
      bar.querySelectorAll('.gpill').forEach(p => p.classList.remove('on'));
      pill.classList.add('on');
      onSelect(genre.keys);
    };
    bar.appendChild(pill);
  });
}
