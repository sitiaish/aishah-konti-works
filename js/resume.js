/*
 * Resume: three tables (in-house, partners + clients, talks), each showing 5 rows then "Show more".
 * - The award switch shows award winners only (on by default for the first two tables).
 * - Hovering an award opens a tooltip with every recognition (desktop only).
 * - On phones the three tables become tabs.
 */
import { esc, newestFirst, wins } from './data.js';

const STEP = 5;

/* Talks: repeat runs of the same workshop fold into one row with a year range.
   [title pattern, row title, row id, word for the count] */
const MERGE = [
  [/^Kontinentalist Workshop/i, 'Kontinentalist Public Workshop', 'KONTI-WS', 'runs'],
  [/^NUS REx Workshop/i, 'NUS REx Workshop', 'NUS-REX', 'runs'],
  [
    /^Creating Narratives Festival/i,
    'Creating Narratives For Change Festival',
    'CN-FEST',
    'editions',
  ],
];

const SOON_NOTE = 'I built most of it before handing it over';

function mergeTalks(talks) {
  const out = [],
    groups = {};
  talks.forEach((p) => {
    const rule = MERGE.find(([re]) => re.test(p.t));
    if (!rule) {
      out.push(Object.assign({}, p, { ids: [p.id] }));
      return;
    }
    const [, title, id, unit] = rule;
    const g =
      groups[id] || (groups[id] = Object.assign({}, p, { id, t: title, unit, ids: [], runs: [] }));
    g.ids.push(p.id);
    g.runs.push(p);
  });
  Object.values(groups).forEach((g) => {
    g.runs.sort((a, b) => a.y * 100 + a.m - (b.y * 100 + b.m));
    const first = g.runs[0],
      last = g.runs[g.runs.length - 1];
    g.y = last.y;
    g.m = last.m;
    g.yr = first.y === last.y ? String(last.y) : `${first.y}–${last.y}`;
    g.t = `${g.t} — ${g.runs.length} ${g.unit}`;
    out.push(g);
  });
  return out;
}

/* ---------- Cells ---------- */
const soon = (p) =>
  p.soon
    ? `<span class="soon" data-tip="${SOON_NOTE}">launching soon<span class="sr-only"> (${SOON_NOTE})</span></span>`
    : '';
const title = (p) =>
  p.url
    ? `<a class="tl" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.t)}<span class="ar" aria-hidden="true"> ↗</span></a>`
    : `<span class="tl-plain">${esc(p.t)}</span>`;
function awardCell(p) {
  if (!p.aw.length) return '<span class="none">—</span>';
  const w = wins(p);
  const label = w ? `★ ${w} win${w > 1 ? 's' : ''}` : esc(p.aw[0][0]);
  const spoken = p.aw.map((a) => `${esc(a[0])}: ${esc(a[1])}, ${esc(a[2])} ${a[3]}`).join('; ');
  return `<span class="awt" tabindex="0" data-id="${p.id}"><span class="aw" aria-hidden="true">${label}</span><span class="sr">${spoken}</span></span>`;
}
const ROW = {
  inh: (p) =>
    `<tr id="r-${p.id}"><td class="t">${title(p)}</td><td class="y">${p.y}</td><td>${awardCell(p)}</td></tr>`,
  pc: (p) =>
    `<tr id="r-${p.id}"><td class="t">${title(p)}${soon(p)}</td><td class="o">${esc(p.org)} <span class="ty ${p.typ}">${p.typ}</span></td><td class="y">${p.y}</td><td>${awardCell(p)}</td></tr>`,
  tk: (p) =>
    `<tr id="r-${p.id}"><td class="t"><div class="cl" title="${esc(p.t)}">${title(p)}</div></td><td class="o"><div class="cl" title="${esc(p.org)}">${esc(p.org)}</div></td><td class="y">${p.yr || p.y}</td></tr>`,
};

export function initResume({ listed }) {
  const ALL = {
    inh: newestFirst(listed.filter((p) => p.typ === 'In-house')),
    pc: newestFirst(listed.filter((p) => p.typ === 'Partner' || p.typ === 'Client')),
    tk: newestFirst(mergeTalks(listed.filter((p) => p.typ === 'Talk'))),
  };
  const onlyWinners = { inh: true, pc: true, tk: false };
  const shown = { inh: STEP, pc: STEP, tk: STEP };
  const rowsFor = (k) => (onlyWinners[k] ? ALL[k].filter((p) => wins(p) > 0) : ALL[k]);

  function draw(k) {
    const list = rowsFor(k);
    document.getElementById('tb-' + k).innerHTML = list.slice(0, shown[k]).map(ROW[k]).join('');
    document.getElementById('n-' + k).textContent = onlyWinners[k]
      ? `${ALL[k].length} entries · ${list.length} won awards`
      : `${ALL[k].length} entries`;
    const more = document.getElementById('more-' + k),
      left = list.length - shown[k];
    more.hidden = list.length <= STEP;
    more.textContent = left > 0 ? `Show ${Math.min(STEP, left)} more · ${left} left` : 'Show fewer';
    more.setAttribute('aria-expanded', left <= 0);
  }

  ['inh', 'pc', 'tk'].forEach((k) => {
    draw(k);
    document.getElementById('more-' + k).onclick = () => {
      if (shown[k] < rowsFor(k).length) shown[k] += STEP;
      else {
        shown[k] = STEP;
        document.getElementById('g-' + k).scrollIntoView({ block: 'start' });
      }
      draw(k);
    };
  });

  ['inh', 'pc'].forEach((k) => {
    const sw = document.getElementById('sw-' + k);
    sw.onclick = () => {
      onlyWinners[k] = !onlyWinners[k];
      sw.setAttribute('aria-checked', onlyWinners[k]);
      shown[k] = STEP;
      draw(k);
    };
  });

  initAwardTooltip(listed);

  /* Phone tabs */
  const TABS = ['inh', 'pc', 'tk'];
  const tab = (k) =>
    TABS.forEach((g) => {
      document.getElementById('g-' + g).classList.toggle('on', g === k);
      document.getElementById('tab-' + g).setAttribute('aria-selected', g === k);
    });
  TABS.forEach((g) => (document.getElementById('tab-' + g).onclick = () => tab(g)));
}

/* Awards tooltip: desktop hover or keyboard focus only */
function initAwardTooltip(listed) {
  const tip = document.getElementById('atip');
  const section = document.getElementById('resume');
  const canHover = matchMedia('(hover: hover)');
  const byId = Object.fromEntries(listed.map((p) => [p.id, p]));

  function show(el) {
    if (!canHover.matches) return;
    const p = byId[el.dataset.id];
    if (!p) return;
    tip.innerHTML = `<b>${esc(p.t)}</b><ul>${p.aw.map((a) => `<li><span class="st">${esc(a[0])}</span> ${esc(a[1])} · ${esc(a[2])} ${a[3]}</li>`).join('')}</ul>`;
    tip.hidden = false;
    const r = el.getBoundingClientRect(),
      w = tip.offsetWidth,
      h = tip.offsetHeight;
    const x = Math.min(innerWidth - w - 12, Math.max(12, r.right - w));
    let y = r.bottom + 8;
    if (y + h > innerHeight - 8) y = r.top - h - 8;
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }
  const hide = () => (tip.hidden = true);

  section.addEventListener('mouseover', (e) => {
    const a = e.target.closest('.awt');
    if (a) show(a);
  });
  section.addEventListener('mouseout', (e) => {
    if (e.target.closest('.awt')) hide();
  });
  section.addEventListener('focusin', (e) => {
    const a = e.target.closest('.awt');
    if (a) show(a);
  });
  section.addEventListener('focusout', hide);
  addEventListener('scroll', hide, { passive: true });
}
