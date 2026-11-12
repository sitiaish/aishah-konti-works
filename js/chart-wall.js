/*
 * Chart wall page: featured pieces from content/chart-wall.js, grouped into sections,
 * newest first, with a full-size viewer.
 *
 * Layout by screen size is CSS only (css/chart-wall.css):
 *   desktop masonry · tablet even tiles · phone small squares, 6 per section then "Show more".
 */
import { SECTIONS, CREDIT, PIECES } from '../content/chart-wall.js';
import { loadProjects, esc, img } from './data.js';
import { initA11y } from './a11y.js';
import { initTheme } from './theme.js';

const PHONE = matchMedia('(max-width:640px)');
const PHONE_FIRST = 6; // tiles shown per section on phones before "Show more"

initA11y();
initTheme();
initDataStory();

loadProjects().then(({ projects }) => {
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

  // Join each piece with its project, keep featured ones, newest first
  const pieces = PIECES.filter((x) => x.featured)
    .map((x) => {
      const p = byId[x.project];
      return { ...x, title: p.t, y: p.y, m: p.m, org: p.org, typ: p.typ, url: p.url };
    })
    .sort((a, b) => b.y * 100 + b.m - (a.y * 100 + a.m));

  const sections = SECTIONS.filter((s) => pieces.some((x) => x.section === s.id));
  const view = sections.flatMap((s) => pieces.filter((x) => x.section === s.id)); // viewer order

  renderWall(sections, view);
  initViewer(view, sections);
  initShowMore();
  initSectionSpy();
});

/* ---------- The wall ---------- */
function tile(x, i) {
  const first = x.views[0];
  const [w, h] = first.size.split('x');
  const n = x.views.length;
  return (
    `<figure class="card${n > 1 ? ' multi' : ''}">` +
    `<button type="button" class="shot" data-i="${i}" aria-label="View full size: ${esc(x.caption)}${n > 1 ? `, ${n} views` : ''}">` +
    `<img src="${img(first.image)}" alt="${esc(x.caption)}" width="${w}" height="${h}" loading="lazy"><span class="kind">${x.y}</span>` +
    `</button></figure>`
  );
}

function renderWall(sections, view) {
  document.getElementById('walls').innerHTML = sections
    .map(
      (s) =>
        `<section class="yr" id="y${s.id}" aria-labelledby="h${s.id}">` +
        `<div class="yh"><h2 id="h${s.id}">${s.title}</h2></div><p class="blurb">${s.blurb}</p>` +
        `<span class="sq" aria-hidden="true"></span>` +
        `<div class="wall">${view.map((x, i) => (x.section === s.id ? tile(x, i) : '')).join('')}</div></section>`,
    )
    .join('');

  document.getElementById('years').innerHTML = sections
    .map((s) => `<a href="#y${s.id}" data-y="${s.id}">${s.short}</a>`)
    .join('');
}

/* ---------- Full-size viewer ---------- */
function initViewer(view, sections) {
  const dialog = document.getElementById('lb');
  const strip = document.getElementById('lb-s');
  const image = document.getElementById('lb-i');
  const go = document.getElementById('lb-go');
  document.querySelector('.lb-cr').textContent = CREDIT;
  let cur = 0;

  // Switch between views of the same viz
  function pick(j) {
    const x = view[cur],
      v = x.views[j];
    image.src = img(v.image);
    image.alt = v.caption || x.caption;
    document.getElementById('lb-h').textContent =
      x.views.length > 1 ? `${x.caption}: ${v.caption || x.caption}` : x.caption;
    strip.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', k === j));
  }

  function show(i) {
    cur = (i + view.length) % view.length;
    const x = view[cur],
      n = x.views.length;
    strip.hidden = n < 2;
    strip.innerHTML =
      n < 2
        ? ''
        : x.views
            .map(
              (v, k) =>
                `<button type="button" data-j="${k}"><img src="${img(v.image)}" alt=""><span>View ${k + 1}: ${esc(v.caption || x.caption)}</span></button>`,
            )
            .join('');
    strip.querySelectorAll('button').forEach((b) => (b.onclick = () => pick(+b.dataset.j)));
    pick(0);
    const section = sections.find((s) => s.id === x.section).title;
    document.getElementById('lb-t').textContent =
      `${section} · ${x.y} · ${cur + 1} of ${view.length}${n > 1 ? ` · ${n} views` : ''}`;
    document.getElementById('lb-m').textContent = `${x.title} · ${x.org} · ${x.typ}`;
    go.hidden = !x.url;
    if (x.url) go.href = x.url;
  }

  document.getElementById('walls').addEventListener('click', (e) => {
    const b = e.target.closest('.shot');
    if (b) {
      show(+b.dataset.i);
      dialog.showModal();
    }
  });
  document.getElementById('lb-p').onclick = () => show(cur - 1);
  document.getElementById('lb-n').onclick = () => show(cur + 1);
  document.getElementById('lb-x').onclick = () => dialog.close();
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'ArrowLeft') show(cur - 1);
  });
}

/* ---------- Phones: first 6 tiles per section, then "Show more" ---------- */
function initShowMore() {
  function update() {
    document.querySelectorAll('.yr').forEach((sec) => {
      const cards = [...sec.querySelectorAll('.card')];
      let b = sec.querySelector('.more');
      if (!PHONE.matches || cards.length <= PHONE_FIRST) {
        cards.forEach((c) => (c.hidden = false));
        if (b) b.hidden = true;
        return;
      }
      if (!b) {
        b = document.createElement('button');
        b.type = 'button';
        b.className = 'pill more';
        sec.appendChild(b);
        b.onclick = () => {
          b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true');
          update();
        };
      }
      const open = b.getAttribute('aria-expanded') === 'true';
      b.hidden = false;
      cards.slice(PHONE_FIRST).forEach((c) => (c.hidden = !open));
      b.textContent = open ? 'Show fewer' : `Show ${cards.length - PHONE_FIRST} more`;
    });
  }
  PHONE.addEventListener('change', update);
  update();
}

/* ---------- Highlight the section link for the section on screen ---------- */
function initSectionSpy() {
  const links = [...document.querySelectorAll('#years a')];
  const spy = () => {
    let on = null;
    document.querySelectorAll('.yr').forEach((s) => {
      if (s.getBoundingClientRect().top < 160) on = s.id.slice(1);
    });
    links.forEach((a) => a.classList.toggle('on', a.dataset.y === on));
  };
  addEventListener('scroll', spy, { passive: true });
  spy();
}

/* "What is a data story?": opens and closes the box under the intro */
function initDataStory() {
  const button = document.getElementById('ds-q');
  const panel = document.getElementById('ds-a');
  if (!button) return;
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', open);
    panel.classList.toggle('open', open);
  });
}
