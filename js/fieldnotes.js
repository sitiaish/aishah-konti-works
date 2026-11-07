/*
 * Fieldnotes: four groups of links from content/fieldnotes.js, numbered in one running sequence.
 * Each group shows 3 links, then a "Show more" button.
 */
import { FIELDNOTES } from '../content/fieldnotes.js';
import { esc } from './data.js';

const SHOW_FIRST = 3;

export function initFieldnotes() {
  let n = 0;
  FIELDNOTES.forEach((group, g) => {
    const ol = document.getElementById('fn' + (g + 1));
    if (!ol) return;
    ol.innerHTML = group.list
      .map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener"><span>${String(++n).padStart(2, '0')}</span><div>${esc(x.title)} ↗<small>${esc(x.note)}</small></div></a></li>`)
      .join('');
    addShowMore(ol);
  });
}

function addShowMore(ol) {
  const extra = [...ol.children].slice(SHOW_FIRST);
  if (!extra.length) return;
  extra.forEach((li) => (li.hidden = true));
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'more';
  b.setAttribute('aria-expanded', 'false');
  const label = () => (b.textContent = extra[0].hidden ? `Show ${extra.length} more` : 'Show fewer');
  label();
  b.onclick = () => {
    const open = extra[0].hidden;
    extra.forEach((li) => (li.hidden = !open));
    b.setAttribute('aria-expanded', open);
    label();
  };
  ol.after(b);
}
