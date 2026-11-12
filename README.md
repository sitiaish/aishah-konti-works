# Siti Aishah · Konti Work Archive

Seven years of data stories, maps, dashboards and talks I built at [Kontinentalist](https://kontinentalist.com), from August 2019 to August 2026.

**Live:** https://sitiaish.github.io/aishah-konti-works/

- **`index.html`**, the archive: a scrolly story of my work in ✦ marks, selected case studies, Fieldnotes and the full list of projects.
- **`chart-wall.html`**, the chart wall: maps, charts, interactive illustrations and delighters, each viewable full size.

Built with AI pair-programming (Claude). Content, direction and the work shown are mine.

---

## Run it on your computer

The pages load their project list from CSV files, so they need a small local server. Opening `index.html` by double-clicking won't work.

```bash
cd aishah-konti-works
python3 -m http.server 8000
```

Then open http://localhost:8000. Press `Ctrl+C` in the terminal to stop it.

Plain HTML, CSS and JavaScript (ES modules). No framework, no build step and nothing to install.

### Tidy the code (optional)

The site doesn't need these, but they keep the code readable. Run `npm install` once, then:

```bash
npm run format   # Prettier: formats HTML, CSS and JS
npm run lint     # ESLint (JS) and Stylelint (CSS): catches mistakes
```

---

## Where things live

```
index.html          the archive page; each section is marked with a banner comment
chart-wall.html     the chart wall page

content/            ✏️ edit these to change what the site says
  projects.csv      one row per project (opens in Google Sheets or Excel)
  awards.csv        one row per award, linked to a project by its id
  works.js          the 6 selected works case studies
  fieldnotes.js     Fieldnotes, Kawan and Instagram links
  marquee.js        "Built for" and "Spoke at" names
  chart-wall.js     chart wall sections and pieces

css/                one file per section
  tokens.css        every colour, font and text size, light and dark
  base.css          page frame, links, buttons, squiggles
  nav.css · landing.css · story.css · marquee.css · works.css
  fieldnotes.css · resume.css · footer.css
  typescale.css     shared text sizes, loaded last
  chart-wall.css    the chart wall page

js/                 one file per section
  main.js           archive entry point: loads data, starts each section
  data.js           reads the CSVs and works out the counts
  story/story.js    the scrolly story: scenes and scroll trigger
  story/layouts.js  where each ✦ sits: grid, timeline, grouped by kind
  works.js · marquee.js · fieldnotes.js · resume.js · nav.js · landing.js · footer.js
  chart-wall.js     the chart wall page
  a11y.js           screen reader helpers used by both pages

img/                screenshots (P039-1.jpg …), case study images (A1.jpg …), icons, photo
files/              portfolio and resume PDFs
```

---

## Common edits

### Add or change a project
Open `content/projects.csv` and add a row.

| Column | What to put |
|---|---|
| `id` | Next free number, like `P093` |
| `year`, `month` | When it launched (month as a number) |
| `type` | `In-house`, `Partner`, `Client` or `Talk` |
| `link` | Where it lives online. Leave empty if it's offline |
| `show` | `yes` counts it everywhere · `list-only` lists it in the tables but leaves it out of the story's numbers · `no` hides it |
| `hover_images` | Screenshots shown when hovering its ✦, like `P093-1.jpg; P093-2.jpg` (up to 3) |

The story, the tables and every number in the copy update by themselves.

### Add an award
Add a row to `content/awards.csv` with the project's `id`. Use `Won` as the result for wins. Shortlists and longlists show up in the tooltip but aren't counted as wins.

### Add screenshots
1. Save them in `img/`, named by project: `P093-1.jpg`, `P093-2.jpg`. Around 1200px wide is plenty.
2. List them in that project's `hover_images` column.

### Add a piece to the chart wall
In `content/chart-wall.js`, copy an existing piece, change `project`, `section`, `caption` and `views`, and set `featured: true`. Pieces with `featured: false` are saved but hidden.

### Change copy
Most text is plain HTML in `index.html` and `chart-wall.html`. Numbers written as `<span data-count="builds">67</span>` fill themselves in from the data, so you don't need to update them.

### Change colours or fonts
Only edit `css/tokens.css`. Change a colour once and both pages follow, in light and dark mode.

### Change what a story scene shows
Each `<article class="step" data-scene="…">` in `index.html` holds a scene's text. The matching entry in `SCENES` at the top of `js/story/story.js` sets its window title, layout, colours and legend.

---

## Deploy to GitHub Pages

1. Create a **public** repository called `aishah-konti-works` on GitHub.
2. **Add file → Upload files**, then drag in everything inside this folder (not the folder itself). Commit.
3. **Settings → Pages**: under Source, pick **Deploy from a branch**, then branch `main` and folder `/ (root)`. Save.
4. After a minute or two, the site is live at `https://sitiaish.github.io/aishah-konti-works/`.

To update the site later, upload the changed files again. GitHub redeploys on its own.

### Help Google find it
1. Open [Google Search Console](https://search.google.com/search-console) and add the site URL as a **URL prefix** property.
2. Verify it with the HTML tag option: paste the `<meta name="google-site-verification" …>` tag into the `<head>` of `index.html`, then upload `index.html` again.
3. Under **Sitemaps**, submit `sitemap.xml`.

### Moving to your own domain later
1. Find and replace `https://sitiaish.github.io/aishah-konti-works/` with your new address in `index.html`, `chart-wall.html`, `sitemap.xml` and `robots.txt`.
2. In **Settings → Pages → Custom domain**, enter the domain and follow GitHub's DNS steps.

### Link previews
`img/og-image.jpg` (archive) and `img/og-chart-wall.jpg` (chart wall) are the cards shown when the link is shared on LinkedIn, Slack or WhatsApp. They still show the old typewriter font, so for a sharper card, replace them with your own 1200 × 630 screenshots under the same names.

---

## Credits

Design and illustrations for the works shown were usually by Kontinentalist's designers. Each piece credits them. Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [Inter](https://fonts.google.com/specimen/Inter). The visual style follows my own [Fieldnotes from Konti](https://sitiaish.github.io/kontifenotes/).
