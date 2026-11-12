/*
 * Data: reads content/projects.csv and content/awards.csv and works out the counts.
 * Every section that needs projects imports from here, so the numbers always agree.
 */
import { WORKS } from '../content/works.js';

/* ---------- Small helpers shared by every component ---------- */

/** Escape text before putting it into HTML. */
export const esc = (s) =>
  String(s ?? '').replace(
    /[&<>"]/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c],
  );

/** Path to an image in img/. */
export const img = (file) => 'img/' + file;

/** Sort newest first by year, then month. */
export const newestFirst = (list) =>
  list.slice().sort((a, b) => b.y * 100 + b.m - (a.y * 100 + a.m));

/* ---------- CSV ---------- */

/** Parse CSV text into an array of objects keyed by the header row. Handles quoted cells. */
export function parseCSV(text) {
  const rows = [];
  let row = [],
    cell = '',
    quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim() !== ''));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

async function loadCSV(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load ${path}`);
  return parseCSV(await res.text());
}

/* ---------- Projects ---------- */

/**
 * Load every project.
 * show column in projects.csv:
 *   yes        counted in the story and listed in the tables
 *   list-only  listed in the tables only (unreleased work, the exhibition)
 *   no         hidden everywhere, kept for the record
 */
export async function loadProjects() {
  const [rows, awardRows] = await Promise.all([
    loadCSV('content/projects.csv'),
    loadCSV('content/awards.csv'),
  ]);

  const projects = rows.map((r) => ({
    id: r.id,
    y: Number(r.year),
    m: Number(r.month),
    t: r.title,
    org: r.organisation || 'Kontinentalist',
    typ: r.type, // In-house | Partner | Client | Talk
    url: r.link,
    show: r.show || 'yes',
    soon: r.show === 'list-only' && r.type !== 'Talk', // unreleased build
    hover: r.hover_images
      ? r.hover_images
          .split(';')
          .map((s) => img(s.trim()))
          .filter(Boolean)
      : [],
    // awards: [result, award, awarded by, year]
    aw: awardRows
      .filter((a) => a.project_id === r.id)
      .map((a) => [a.result, a.award, a.awarded_by, Number(a.year)]),
  }));

  // Hover images: a project's own screenshots first, any gaps filled from its case study
  const fromWorks = {};
  WORKS.forEach((w) =>
    w.projects.forEach((id) => (fromWorks[id] = w.images.slice(0, 3).map((x) => img(x.file)))),
  );
  projects.forEach((p) => (p.shots = p.hover.concat(fromWorks[p.id] || []).slice(0, 3)));

  const story = projects.filter((p) => p.show === 'yes');
  const listed = projects.filter((p) => p.show !== 'no');
  return { projects, story, listed, counts: countUp(story) };
}

/** Number of awards a project won (not counting shortlists and longlists). */
export const wins = (p) => p.aw.filter((a) => a[0] === 'Won').length;

/** The numbers used in the copy and the story window titles. */
function countUp(story) {
  const by = (typ) => story.filter((p) => p.typ === typ);
  const kinds = {
    inhouse: by('In-house'),
    partner: by('Partner'),
    client: by('Client'),
    talks: by('Talk'),
  };
  return {
    total: story.length,
    builds: story.length - kinds.talks.length,
    inhouse: kinds.inhouse.length,
    partner: kinds.partner.length,
    client: kinds.client.length,
    talks: kinds.talks.length,
    awards: story.reduce((n, p) => n + wins(p), 0),
    awardProjects: story.filter((p) => wins(p) > 0).length,
    wonInhouse: kinds.inhouse.filter((p) => wins(p) > 0).length,
    wonPartner: kinds.partner.filter((p) => wins(p) > 0).length,
    wonClient: kinds.client.filter((p) => wins(p) > 0).length,
  };
}

/**
 * Fill numbers into the copy. In index.html, write <span data-count="builds">67</span>:
 * the number inside is a fallback, replaced with the live count when the page loads.
 */
export function fillCounts(counts) {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const n = counts[el.dataset.count];
    if (n !== undefined) el.textContent = n;
  });
}
