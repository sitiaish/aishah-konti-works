/*
 * Scrolly story: one ✦ per project in a sticky window, regrouped as you scroll.
 *
 * How it fits together:
 *   index.html   each <article class="step" data-scene="..."> holds a scene's copy
 *   SCENES below what the window shows for that scene: title, layout, colours, legend
 *   layouts.js   where each ✦ sits
 *
 * To add a scene: add an <article class="step" data-scene="new-id"> in index.html,
 * then a matching entry in SCENES.
 */
import { esc, wins } from '../data.js';
import { grid, timeline, byKind, isPhone, KINDS, KIND_LABEL } from './layouts.js';

/* ✦ colour for each kind of work (tokens from css/tokens.css) */
const COLOUR = { 'In-house': 'var(--inh)', Partner: 'var(--ok)', Client: 'var(--accent)', Talk: 'var(--award)' };

/* Repeat clients circled in the "Clients came back" scene */
const UOB = new Set(['P019', 'P022', 'P048', 'P060', 'P074', 'P078']);
const GITOC = new Set(['P026', 'P069']);

/* A scene starts when its heading rises above this share of the screen height (0.8 = 20% from the bottom) */
const TRIGGER = 0.8;

const kindLegend = (kinds) => kinds.map((k) => [KIND_LABEL[k], COLOUR[k]]);

/**
 * The scenes, in scroll order. Each one:
 *   title(c)  window title. c holds the live counts from data.js
 *   draw(s)   places the ✦ marks. s gives you the layouts, place(), label() and legend()
 */
const SCENES = {
  hey: {
    title: (c) => `${c.total} things I made in seven years`,
    draw(s) {
      grid(s).forEach(([p, x, y, size]) => s.place(p, x, y, size * 0.6, 'var(--ink)', p.shade));
      s.hint(`${s.counts.total} ✦ · one per story, project or talk`);
    },
  },

  contrast: {
    title: () => 'Fewer builds over time, but bigger ones',
    draw(s) {
      const pts = timeline(s);
      const bands = [[2019.5, 2022, '2019–21'], [2023, 2026.9, '2023–26']];
      if (isPhone(s.W)) {
        bands.forEach(([a, b, n]) => {
          s.label('shade', '', { left: pts.lx + 'px', width: pts.laneW * 3 + 'px', top: pts.Y(a) + 'px', height: pts.Y(b) - pts.Y(a) + 'px' });
          s.label('axl', n, { left: pts.lx + pts.laneW * 3 + 'px', width: pts.laneW + 'px', top: pts.Y(a) + 4 + 'px', fontSize: '10px' });
        });
      } else {
        const lh = pts.laneH * 3;
        bands.forEach(([a, b, n]) => {
          s.label('shade', '', { left: pts.X(a) + 'px', width: pts.X(b) - pts.X(a) + 'px', top: '-6px', height: lh + 6 + 'px' });
          s.label('axl', n, { left: pts.X(a) + 'px', width: pts.X(b) - pts.X(a) + 'px', top: lh + 2 + 'px' });
        });
      }
      // Talks fade out; 2022, between the two bands, is dimmed
      pts.forEach(([p, x, y, size]) => s.place(p, x, y, size * 0.72, COLOUR[p.typ], p.typ === 'Talk' ? 0.15 : p.y === 2022 ? 0.2 : 1));
      s.legend(kindLegend(KINDS.slice(0, 3)));
    },
  },

  awards: {
    title: () => 'Partner stories won the most awards',
    draw(s) {
      const pts = byKind(s);
      pts.forEach(([p, x, y, size]) => {
        const w = wins(p);
        s.place(p, x, y, size * 0.62, w ? 'var(--award)' : 'var(--inh)', w ? 1 : 0.22, w > 1 ? 1.3 : 1);
      });
      const c = s.counts, phone = isPhone(s.W);
      [[`${c.wonInhouse} of ${c.inhouse} won`, 0], [`${c.wonPartner} of ${c.partner} won`, 1], [`${c.wonClient} of ${c.client} won`, 2]].forEach(([text, j]) => {
        const cell = pts.cells[j];
        s.label('axl', text, { left: cell.x + 'px', top: cell.y + (phone ? 15 : 18) + 'px', width: cell.w + 'px', color: 'var(--award)', fontSize: phone ? '10.5px' : '' });
      });
      s.legend([['Won an award (bigger = more than one)', 'var(--award)']]);
    },
  },

  client: {
    title: () => 'Clients and partners became most of the work',
    draw(s) {
      byKind(s).forEach(([p, x, y, size]) => {
        const on = p.typ === 'Client' || p.typ === 'Partner';
        s.place(p, x, y, size * 0.62, on ? COLOUR[p.typ] : 'var(--inh)', on ? 1 : 0.18, on && p.aw.length ? 1.35 : 1);
        p.el.classList.toggle('ring', UOB.has(p.id));
        p.el.classList.toggle('ring-d', GITOC.has(p.id));
      });
      s.legend([
        ['Client', 'var(--accent)'],
        ['Partner', 'var(--ok)'],
        ['UOB, 6 builds', 'var(--accent)', 'ring-k'],
        ['GI-TOC, 2 builds', 'var(--accent)', 'ring-k dash'],
        ['Bigger = recognised', 'var(--ink)'],
      ]);
    },
  },

  talk: {
    title: () => 'Teaching took off from 2022',
    draw(s) {
      timeline(s).forEach(([p, x, y, size]) => s.place(p, x, y, size * 0.72, p.typ === 'Talk' ? COLOUR.Talk : 'var(--inh)', p.typ === 'Talk' ? 1 : 0.18));
      s.legend([['Talk or workshop', 'var(--award)']]);
    },
  },

  sum: {
    title: (c) => `${c.builds} builds, ${c.awards} awards, ${c.talks} talks`,
    draw(s) {
      grid(s).forEach(([p, x, y, size]) => s.place(p, x, y, size * 0.62, COLOUR[p.typ], 1, wins(p) ? 1.25 : 1));
      s.legend(kindLegend(KINDS));
    },
  },
};

export function initStory({ story: projects, counts }, { openWork, goRow }) {
  const stage = document.getElementById('stage');
  const key = document.getElementById('key');
  const tip = document.getElementById('tip');
  const winTitle = document.getElementById('wintitle');
  if (!stage) return;

  /* ---------- One ✦ per project ---------- */
  projects.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'x';
    p.shade = 0.28 + (((i * 37) % 13) / 13) * 0.72; // varied greys for the opening grid
    p.el = el;
    el.addEventListener('mouseenter', () => showTip(p));
    el.addEventListener('mouseleave', () => (tip.hidden = true));
    // Click: open the case study if there is one, otherwise jump to the project's row in the tables
    el.addEventListener('click', () => { if (!openWork(p.id)) goRow(p.id); });
    stage.appendChild(el);
  });

  /* ---------- Hover card ---------- */
  function showTip(p) {
    const shots = p.shots;
    const w = wins(p);
    tip.innerHTML =
      (shots.length ? `<div class="shots n${shots.length}">${shots.map((u) => `<span><img src="${u}" alt=""></span>`).join('')}</div>` : '') +
      `<div><b>${esc(p.t)}</b><small>${p.y} · ${esc(p.org)} · ${KIND_LABEL[p.typ]}</small></div>` +
      (w ? `<span><span class="aw">★ ${w} award${w > 1 ? 's' : ''}</span></span>` : '');
    tip.hidden = false;
    // Sit beside the ✦, flipping to the left if it would run off the window
    const r = p.el.getBoundingClientRect(), box = stage.getBoundingClientRect();
    let x = r.left - box.left + r.width + 8;
    let y = r.top - box.top - tip.offsetHeight / 2;
    if (x + tip.offsetWidth > box.width) x = r.left - box.left - tip.offsetWidth - 8;
    if (x < 0) x = 0;
    y = Math.max(-10, Math.min(y, box.height - tip.offsetHeight));
    tip.style.left = x + 'px';
    tip.style.top = y + 'px';
  }

  /* ---------- Tools each scene draws with ---------- */
  let labels = [];
  const tools = {
    projects, counts,
    place(p, x, y, size, colour, opacity, scale = 1) {
      p.el.style.setProperty('--s', size + 'px');
      p.el.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
      p.el.style.color = colour;
      p.el.style.opacity = opacity;
    },
    /* Axis labels, ticks and shaded bands. Cleared on every scene change */
    label(cls, text, style) {
      const el = document.createElement('div');
      el.className = cls;
      el.textContent = text;
      Object.assign(el.style, style);
      stage.appendChild(el);
      labels.push(el);
      return el;
    },
    legend(items) {
      key.innerHTML = items
        .map(([name, colour, cls]) => `<span><i class="${cls || ''}" style="${cls === 'ring-k' ? 'color:' + colour : 'background:' + colour}"></i>${name}</span>`)
        .join('');
    },
    hint(text) { key.innerHTML = `<span class="hint">${text}</span>`; },
  };

  let current = '';
  function show(id) {
    const scene = SCENES[id];
    if (!scene) return;
    current = id;
    winTitle.textContent = scene.title(counts);
    projects.forEach((p) => p.el.classList.remove('ring', 'ring-d'));
    labels.forEach((l) => l.remove());
    labels = [];
    tip.hidden = true;
    scene.draw(Object.assign(tools, { W: stage.clientWidth, H: stage.clientHeight, label: tools.label }));
  }

  /* ---------- Scroll trigger ---------- */
  const steps = [...document.querySelectorAll('.step')];
  let ticking = false;
  function pick() {
    ticking = false;
    const line = innerHeight * TRIGGER;
    let id = steps[0].dataset.scene;
    for (const step of steps) {
      const heading = step.querySelector('h2') || step;
      if (heading.getBoundingClientRect().top < line) id = step.dataset.scene;
    }
    if (id !== current) show(id);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(pick); } }, { passive: true });

  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => show(current), 150); });

  show(steps[0].dataset.scene);
  pick();
}
