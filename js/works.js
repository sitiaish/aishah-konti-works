/*
 * Selected works: case study cards, the phone carousel, and the case study pop-up.
 * The case studies themselves live in content/works.js.
 */
import { WORKS } from '../content/works.js';
import { esc, img } from './data.js';

const yearOf = (w) => w.details.find((d) => d.label === 'Year').value;
const whoFor = (w) => w.details[0].value;

export function initWorks() {
  const list = document.getElementById('sel');
  const dialog = document.getElementById('wk');
  const body = document.getElementById('wk-body');
  let current = 0, opener = null;

  /* ---------- Cards ---------- */
  list.innerHTML = WORKS.map((w, i) => {
    const cover = w.images[0];
    return `<article class="card"><button type="button" class="card-hit" data-i="${i}" aria-label="Open ${esc(w.title)}">` +
      `<img class="thumb" src="${img(cover.file)}" alt="${esc(cover.caption)}, ${esc(w.title)}" loading="lazy" width="1600" height="900"></button>` +
      `<div class="cb"><div class="who">${esc(yearOf(w))} · ${esc(whoFor(w))}</div><h3>${esc(w.title)}</h3>` +
      `<div class="chips">${w.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>` +
      `<p>${esc(w.overview.split('. ')[0])}.</p>` +
      `<button type="button" class="btn pri open" data-i="${i}">Open case study</button></div></article>`;
  }).join('');

  /* ---------- Pop-up ---------- */
  function show(i) {
    current = (i + WORKS.length) % WORKS.length;
    const w = WORKS[current];
    const [hero, ...rest] = w.images;
    document.getElementById('wk-file').textContent = w.slug + '.html';

    body.innerHTML = `
      <header class="wk-head"><h2 id="wk-title">${esc(w.title)}</h2>
        <div class="chips">${w.tags.map((t) => `<span class="chip">${t}</span>`).join('')}</div></header>
      <figure class="wk-hero"><img src="${img(hero.file)}" alt="${esc(hero.caption)}"><figcaption>${esc(hero.caption)}</figcaption></figure>
      <dl class="wk-meta">${w.details.map((d) => `<div><dt>${esc(d.label)}</dt><dd>${esc(d.value)}</dd></div>`).join('')}</dl>
      <p class="wk-ov">${esc(w.overview)}</p>
      <h3 class="wk-h">What I built</h3>
      <ol class="wk-built">${w.built.map((b) => `<li><b>${esc(b.title)}</b>${esc(b.text)}</li>`).join('')}</ol>
      <section class="wk-car" aria-label="Up close">
        <div class="wk-car-head"><h3 class="wk-h">A closer look at the build</h3>
          <div class="wk-car-nav"><span class="wk-count" aria-live="polite">1 / ${rest.length}</span>
            <button type="button" class="xbtn car-prev" aria-label="Previous screenshot">←</button>
            <button type="button" class="xbtn car-next" aria-label="Next screenshot">→</button></div></div>
        <div class="wk-track" tabindex="0">${rest.map((x, j) =>
          `<figure><img src="${img(x.file)}" alt="${esc(x.caption)}" loading="lazy"><figcaption><span>${String(j + 1).padStart(2, '0')}</span> ${esc(x.caption)}</figcaption></figure>`).join('')}</div>
      </section>
      <div class="wk-hl"><h3 class="wk-h">${esc(w.highlights.title)}</h3><ul>${w.highlights.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="jump">${w.links.length > 1 ? '<span class="wk-lk">Link to reports:</span>' : ''}${w.links.map((l) =>
        `<a class="${w.links.length === 1 ? 'pri' : ''}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join('')}</div>`;
    body.scrollTop = 0;

    // Screenshot carousel: arrows scroll one image; the counter follows the scroll
    const track = body.querySelector('.wk-track');
    const count = body.querySelector('.wk-count');
    const figs = [...track.children];
    const stepWidth = () => figs[0].getBoundingClientRect().width + 16;
    body.querySelector('.car-prev').onclick = () => track.scrollBy({ left: -stepWidth(), behavior: 'smooth' });
    body.querySelector('.car-next').onclick = () => track.scrollBy({ left: stepWidth(), behavior: 'smooth' });
    track.addEventListener('scroll', () => {
      count.textContent = `${Math.min(figs.length, Math.round(track.scrollLeft / stepWidth()) + 1)} / ${figs.length}`;
    }, { passive: true });
  }

  function open(i, from) {
    opener = from || null;
    show(i);
    if (!dialog.open) { try { dialog.showModal(); } catch (e) { dialog.setAttribute('open', ''); } }
    document.getElementById('wk-x').focus();
  }
  function close() {
    if (dialog.open) dialog.close();
    if (opener) opener.focus();
  }

  list.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) open(+b.dataset.i, b); });
  document.getElementById('wk-x').onclick = close;
  document.getElementById('wk-prev').onclick = () => show(current - 1);
  document.getElementById('wk-next').onclick = () => show(current + 1);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });

  initCarousel(list);

  /** Open the case study that includes this project. Returns false if there isn't one. */
  return function openWork(id) {
    const i = WORKS.findIndex((w) => w.projects.includes(id));
    if (i < 0) return false;
    open(i);
    return true;
  };
}

/* ---------- Phones: swipeable cards with page dots ---------- */
function initCarousel(list) {
  const dots = document.getElementById('sel-dots');
  if (!dots) return;
  const cards = () => [...list.children];
  dots.innerHTML = cards().map((c, i) => `<button type="button" aria-label="Case study ${i + 1} of ${cards().length}"></button>`).join('');
  const buttons = [...dots.children];

  const go = (i) => {
    const card = cards()[Math.max(0, Math.min(i, cards().length - 1))];
    const smooth = !matchMedia('(prefers-reduced-motion:reduce)').matches;
    list.scrollTo({ left: card.offsetLeft - list.offsetLeft - 4, behavior: smooth ? 'smooth' : 'auto' });
  };
  const nearest = () => {
    let best = 0, gap = 1e9;
    cards().forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - list.offsetLeft - 4 - list.scrollLeft);
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  };
  const mark = () => { const n = nearest(); buttons.forEach((b, i) => b.setAttribute('aria-current', i === n)); };

  buttons.forEach((b, i) => (b.onclick = () => go(i)));
  document.getElementById('sel-p').onclick = () => go(nearest() - 1);
  document.getElementById('sel-n').onclick = () => go(nearest() + 1);
  let t;
  list.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(mark, 60); }, { passive: true });
  mark();
}
