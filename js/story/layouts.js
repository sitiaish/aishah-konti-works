/*
 * Story layouts: where each ✦ sits in the story window.
 *
 * Each layout takes the window size, the projects and a label() helper, and returns
 * a list of [project, x, y, size] for every ✦. Scenes in story.js pick a layout,
 * then colour and fade the marks.
 *
 * Phones (window narrower than 520px) get their own versions:
 *   timeline -> years run down the side instead of across
 *   byType   -> a 2 x 2 grid instead of four columns in a row
 */

export const KINDS = ['In-house', 'Partner', 'Client', 'Talk'];
export const KIND_LABEL = { 'In-house': 'In-house', Partner: 'Partner', Client: 'Client', Talk: 'Talks' };
const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const T0 = 2019.5; // timeline starts mid-2019
const T1 = 2026.9; // and ends late 2026

/* My job titles, shown as bars under the desktop timeline */
const ROLES = [
  ['Dataviz developer', 2019.58, 2022.5],
  ['Front-end lead', 2022.5, 2025],
  ['Asst team lead', 2025, 2026.7],
];

export const isPhone = (W) => W < 520;
const when = (p) => p.y + (p.m - 1) / 12;
const ofKind = (projects, kind) => projects.filter((p) => p.typ === kind);

/** Every ✦ in one grid, 13 across. */
export function grid({ W, H, projects }) {
  const cols = 13, rows = 7;
  const s = Math.min(W / cols, H / rows) * 0.92;
  const ox = (W - cols * s) / 2;
  const oy = Math.max(0, (H - rows * s) / 2 - 10);
  return projects.map((p, i) => [p, ox + (i % cols) * s, oy + Math.floor(i / cols) * s, s]);
}

/** Timeline. Desktop: months run left to right, one lane per kind of work, job titles underneath. */
export function timeline(ctx) {
  if (isPhone(ctx.W)) return timelineVertical(ctx);
  const { W, H, projects, label } = ctx;
  const lx = W < 520 ? 60 : 76;
  const X = (t) => lx + ((t - T0) / (T1 - T0)) * (W - lx - 8);
  const laneH = (H - 96) / 4;
  const s = Math.max(8, Math.min(18, laneH / 3.2));
  const out = [], seen = {};

  KINDS.forEach((kind, j) => {
    const y0 = j * laneH + laneH / 2;
    label('ln', KIND_LABEL[kind], { top: y0 - 7 + 'px', width: lx - 4 + 'px', fontSize: W < 520 ? '10px' : '', whiteSpace: 'nowrap' });
    ofKind(projects, kind).forEach((p) => {
      // Projects in the same month step up and to the right so they don't overlap
      const n = (seen[kind + p.y + p.m] = (seen[kind + p.y + p.m] || 0) + 1);
      out.push([p, X(when(p)) - s * 0.36 + (n - 1) * s * 0.5, y0 - s * 0.36 - (n - 1) * s * 0.8, s]);
    });
  });

  const ty = 4 * laneH + 8;
  YEARS.forEach((y) => {
    const a = Math.max(y, T0), b = Math.min(y + 1, T1);
    if (y > 2019) label('tick', '', { left: X(y) + 'px', top: ty - 4 + 'px' });
    if (b - a < 0.6 && W < 420) return;
    label('axl', b - a < 0.6 ? "'" + String(y).slice(2) : y, { left: X((a + b) / 2) - 20 + 'px', top: ty + 'px', width: '40px' });
  });
  ROLES.forEach(([name, a, b]) => label('rb', name, { left: X(a) + 'px', width: X(b) - X(a) - 3 + 'px', top: ty + 24 + 'px' }));

  out.X = X;
  out.laneH = laneH;
  return out;
}

/** Timeline on phones: years run down the left, one column per kind of work, no job titles. */
function timelineVertical({ W, H, projects, label }) {
  const lx = 30, HEAD = 22;
  const Y = (t) => HEAD + ((t - T0) / (T1 - T0)) * (H - HEAD - 10);
  const laneW = (W - lx) / 4;
  const s = Math.max(8, Math.min(15, laneW / 4.6));
  const out = [], seen = {};

  KINDS.forEach((kind, j) => {
    label('axl', KIND_LABEL[kind], { left: lx + j * laneW + 'px', top: '0px', width: laneW + 'px', fontSize: '10.5px' });
    ofKind(projects, kind).forEach((p) => {
      const n = (seen[kind + p.y + p.m] = (seen[kind + p.y + p.m] || 0) + 1);
      out.push([p, lx + j * laneW + laneW * 0.22 + (n - 1) * s * 0.75, Y(when(p)) - s * 0.36, s]);
    });
  });

  YEARS.forEach((y) => {
    const a = Math.max(y, T0), b = Math.min(y + 1, T1);
    if (y > 2019) label('tick', '', { left: lx + 'px', top: Y(y) + 'px', width: W - lx + 'px', height: '1px' });
    label('axl', "'" + String(y).slice(2), { left: '0px', top: Y((a + b) / 2) - 7 + 'px', width: lx - 6 + 'px', textAlign: 'right', fontSize: '10.5px' });
  });

  out.Y = Y;
  out.lx = lx;
  out.laneW = laneW;
  return out;
}

/**
 * Grouped by kind of work. Desktop: four columns in a row. Phones: a 2 x 2 grid.
 * Also returns out.cells: the top-left corner and width of each group, for extra labels.
 */
export function byKind(ctx) {
  if (isPhone(ctx.W)) return byKind2x2(ctx);
  const { W, H, projects, label } = ctx;
  const cw = W / 4, per = 5;
  const HEAD = W < 520 ? 64 : 58;
  const rows = Math.ceil(Math.max(...KINDS.map((k) => ofKind(projects, k).length)) / per);
  const s = Math.min(cw / (per + 0.8), (H - HEAD - 20) / rows);
  const top = Math.max(0, (H - (HEAD + rows * s)) / 2);
  const out = [];

  KINDS.forEach((kind, j) => {
    const group = ofKind(projects, kind);
    group.forEach((p, k) => out.push([p, j * cw + (cw - per * s) / 2 + (k % per) * s, top + HEAD + Math.floor(k / per) * s, s]));
    label('axl', W < 520 ? KIND_LABEL[kind] + '\n' + group.length : KIND_LABEL[kind] + ' ' + group.length, {
      left: j * cw + 'px', top: top + 'px', width: cw + 'px',
      whiteSpace: W < 520 ? 'pre-line' : '', fontSize: W < 520 ? '10.5px' : '', lineHeight: '1.25',
    });
  });
  out.cells = KINDS.map((k, j) => ({ x: j * cw, y: top, w: cw }));
  return out;
}

function byKind2x2({ W, H, projects, label }) {
  const cw = W / 2, per = 8, HEAD = 34, GAP = 18;
  const rows = Math.ceil(Math.max(...KINDS.map((k) => ofKind(projects, k).length)) / per);
  const s = Math.min(cw / (per + 0.8), (H / 2 - HEAD - GAP) / rows);
  const ch = HEAD + rows * s + GAP;
  const top = Math.max(0, (H - 2 * ch + GAP) / 2);
  const out = [];
  out.cells = [];

  KINDS.forEach((kind, j) => {
    const cx = (j % 2) * cw, cy = top + Math.floor(j / 2) * ch;
    const group = ofKind(projects, kind);
    out.cells.push({ x: cx, y: cy, w: cw });
    group.forEach((p, k) => out.push([p, cx + (cw - per * s) / 2 + (k % per) * s, cy + HEAD + Math.floor(k / per) * s, s]));
    label('axl', KIND_LABEL[kind] + ' ' + group.length, { left: cx + 'px', top: cy + 'px', width: cw + 'px', fontSize: '11px' });
  });
  return out;
}
