/*
 * Landing masonry: packs the tiles into 4 / 3 / 2 columns (same breakpoints as css/landing.css),
 * always adding the next tile to the shortest column, so "see more" lands last.
 * Without JS the CSS falls back to column-count.
 */
export function initLanding() {
  const mason = document.getElementById('mason');
  if (!mason) return;
  const tiles = [...mason.children];
  const three = matchMedia('(max-width: 1040px)');
  const two = matchMedia('(max-width: 640px)');

  const pack = () => {
    const n = two.matches ? 2 : three.matches ? 3 : 4;
    if (mason.dataset.n === String(n)) return;
    mason.dataset.n = n;
    const cols = Array.from({ length: n }, () => {
      const col = document.createElement('div');
      col.className = 'mz-col';
      col.h = 0;
      return col;
    });
    tiles.forEach((tile) => {
      const img = tile.querySelector('img');
      // Height as a share of the width; "see more" is 4:3. The extra .08 stands in for the gap
      const ratio = img ? img.getAttribute('height') / img.getAttribute('width') : 0.75;
      const shortest = cols.reduce((a, b) => (b.h < a.h ? b : a));
      shortest.appendChild(tile);
      shortest.h += ratio + 0.08;
    });
    mason.replaceChildren(...cols);
    mason.classList.add('packed');
  };

  pack();
  three.addEventListener('change', pack);
  two.addEventListener('change', pack);
}
