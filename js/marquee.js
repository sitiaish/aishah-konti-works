/*
 * "Built for" and "Spoke at" scrolling rows. Names live in content/marquee.js.
 * Each row repeats its list twice so the loop is seamless. Hover or keyboard focus pauses it.
 */
import { MARQUEE } from '../content/marquee.js';
import { esc } from './data.js';

function fill(el, items, cls, seconds, reverse) {
  const li = items
    .map((i) => `<li class="logo ${cls || (i.kind === 'client' ? 'c' : 'p')}">${i.logo ? `<img src="${i.logo}" alt="${esc(i.name)}">` : esc(i.name)}</li>`)
    .join('');
  el.innerHTML = `<div class="mq-track${reverse ? ' rev' : ''}" style="--dur:${seconds}s"><ul>${li}</ul><ul aria-hidden="true">${li}</ul></div>`;
}

export function initMarquee() {
  fill(document.getElementById('mq1'), MARQUEE.built, null, MARQUEE.speed.built);
  fill(document.getElementById('mq2'), MARQUEE.spoke, 't', MARQUEE.speed.spoke, true);
  // Moving content must be pausable (WCAG 2.2.2): the CSS pauses on hover and focus
  document.querySelectorAll('.mq').forEach((m) => {
    m.tabIndex = 0;
    m.setAttribute('aria-label', 'Scrolling list of names. Hover or focus to pause.');
  });
}
