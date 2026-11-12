/*
 * Selected works: the case studies shown as cards and opened in a pop-up.
 *
 * - projects: project IDs from projects.csv. Clicking these ✦ in the story opens this case study.
 * - images:   files in img/. The first image is the card cover and the pop-up hero;
 *             the rest fill the "A closer look at the build" carousel.
 *             The first 3 images also appear when hovering the project's ✦ in the story.
 * - links:    one link shows as a blue button; several show as a row of buttons.
 */
export const WORKS = [
  {
    code: 'A',
    projects: ['P086'],
    slug: 'a-u-mapazine',
    title: 'A+U Mapazine',
    tags: ['Maps', 'UI and product'],
    details: [
      { label: 'Client', value: 'Ajman University' },
      { label: 'Year', value: '2025' },
      { label: 'Role', value: 'Sole developer' },
      { label: 'Design', value: 'Amanda Teo' },
      { label: 'Stack', value: 'Airtable as a headless CMS, Mapbox GL JS' },
    ],
    images: [
      { file: 'A1.jpg', caption: 'Map view with region filter' },
      { file: 'A2.jpg', caption: 'Story panel on the map' },
      { file: 'A3.jpg', caption: 'Grid view by region' },
      { file: 'A4.jpg', caption: 'Story opened from the grid' },
    ],
    overview:
      'Ajman University wanted a way to show how far its work reaches beyond its campus, gathering projects by its faculty, students and student organisations, both on campus and in the surrounding cities, into one place people could explore. I built A+U Mapazine around an interactive map and set up the Airtable base the client fills in, so new stories and map points can be added without touching the code.',
    built: [
      {
        title: 'Map view with story panels',
        text: 'Each location on the world map, linked by lines that show the university’s reach, opens a side panel of stories, profiles and photographs, so visitors can read about a project without losing their place on the map.',
      },
      {
        title: 'Grid view',
        text: 'A single switch flips between the map and a grid of blog posts, and because both views draw from the same data, they always stay in sync.',
      },
      {
        title: 'Airtable as a headless CMS',
        text: 'The client edits stories and map points in Airtable, and a data pull and rebuild publishes the changes to the site.',
      },
    ],
    highlights: {
      title: 'Highlights',
      items: ['Easy to edit: all stories and map points live in Airtable'],
    },
    links: [{ label: 'View project', url: 'https://impact.ajman.ac.ae/' }],
  },
  {
    code: 'B',
    projects: ['P075'],
    slug: 'gaza-lives',
    title: 'Gaza Lives',
    tags: ['Data viz', 'Maps'],
    details: [
      { label: 'Partner', value: 'Visualising Palestine' },
      { label: 'Year', value: '2024' },
      { label: 'Role', value: 'Sole developer' },
      { label: 'Design and illustration', value: 'Munirah Mansoor and Griselda Gabriele' },
      { label: 'Stack', value: 'D3.js, Mapbox GL JS' },
    ],
    images: [
      { file: 'B1.jpg', caption: 'Landing page' },
      { file: 'B2.jpg', caption: 'Villages depopulated in 1948, in tatreez' },
      { file: 'B3.jpg', caption: 'Destroyed cultural sites, in the Qowara pattern' },
      { file: 'B4.jpg', caption: 'Map of destroyed sites, filtered by region' },
      { file: 'B5.jpg', caption: 'Interviewees across three neighbourhoods' },
    ],
    overview:
      'Made in partnership with Visualising Palestine, Gaza Lives shows how the ongoing genocide in Gaza has targeted Palestinian cultural life and heritage, and traces that erasure back to 1948. Across a landing page, three chapters, a resources and references page, and a page for each of five Palestinian cultural practitioners from Gaza, the story moves from more than 200 cultural sites destroyed between October 2023 and May 2024 to the villages depopulated in 1948. Because the data needed to carry memory and identity as well as numbers, its visualisations take their form from tatreez, Palestinian embroidery. I built every page, visualisation and map on the site, and implemented all of its content.',
    built: [
      {
        title: 'Tatreez-patterned visualisations',
        text: 'Two visualisations draw on Palestinian embroidery: one, based on the Qowara hijab pattern from Gaza, details the destroyed cultural sites, while the other maps each village depopulated in 1948, laid out in the shape of historic Palestine.',
      },
      {
        title: 'Map of destroyed cultural sites',
        text: 'Built on data from the Palestinian Ministry of Culture in Gaza, the map can be filtered by region through a set of tabs.',
      },
      {
        title: 'Scrollytelling map',
        text: 'As the story scrolls, the map journeys across three key neighbourhoods in Gaza, each one leading into an interviewee’s story.',
      },
      {
        title: 'Micro-animations',
        text: 'Story-specific motion, from horizontal parallax scrolling to transitions on hover and focus, gives each page a sense of movement.',
      },
    ],
    highlights: {
      title: 'Awards and recognition',
      items: [
        'Information Is Beautiful Awards 2024, Bronze',
        'SND Award of Excellence 2025',
        'New Media Writing Prize 2025',
        'Sigma Awards shortlist 2025',
      ],
    },
    links: [{ label: 'View project', url: 'https://gazalives.kontinentalist.com/' }],
  },
  {
    code: 'C',
    projects: ['P069'],
    slug: 'eco-solve',
    title: 'ECO-SOLVE dashboard',
    tags: ['UI and product', 'Data viz'],
    details: [
      { label: 'Client', value: 'Global Initiative Against Transnational Organized Crime' },
      { label: 'Built with', value: 'Thibi' },
      { label: 'Year', value: '2024' },
      {
        label: 'Role',
        value:
          'Front-end developer: data flow, UI for the chart and content pages, QA and UI refinement',
      },
      { label: 'Design', value: 'Joceline Kuswanto' },
      { label: 'Stack', value: 'SvelteKit, Airtable' },
    ],
    images: [
      { file: 'C1.jpg', caption: 'Dashboard on a tablet' },
      { file: 'C2.jpg', caption: 'Landing page' },
      { file: 'C3.jpg', caption: 'Content page' },
      { file: 'C4.jpg', caption: 'Filters for animal group, country and platform' },
    ],
    overview:
      'ECO-SOLVE is the Global Initiative Against Transnational Organized Crime’s programme to monitor illegal wildlife markets online, part of the European Union’s Global Illicit Flows Programme. It builds a network of data hubs in key countries that use open-source intelligence and machine learning to track the trade, generating data that supports local law enforcement and helps shape global policy. Kontinentalist and Thibi were brought in to turn that data into an interactive tool, and because the data is layered and updated often, the tool had to stay clear for very different users and easy for the client to maintain for years. Thibi’s developers coded the charts, while I designed how data flows through the site and built the chart and content pages around them, and working closely with their team built a strong relationship between our studios.',
    built: [
      {
        title: 'Dashboard landing page',
        text: 'A bento-grid overview pairs key figures with previews of each interactive chart, giving users a quick read of the data before they dive in.',
      },
      {
        title: 'Chart pages',
        text: 'Each of the four visualisations (a sankey diagram, a diamond-shaped treemap, a ridgeline plot and a dynamic table) has its own page, with a larger view, filters, summary insights, related articles and a dataset download, which I built around the charts coded by Thibi’s developers.',
      },
      {
        title: 'Filters',
        text: 'Users can combine filters for animal group, country and platform, so each person can answer their own question from the same data.',
      },
      {
        title: 'Content pages',
        text: 'The about, contact and resources pages round out the tool and give the data its context.',
      },
      {
        title: 'Editable content',
        text: 'Content is decoupled from the front end through Airtable, so the client can update data and text without touching the code.',
      },
    ],
    highlights: { title: 'Highlights', items: ['Part of the EU’s Global Illicit Flows Programme'] },
    links: [{ label: 'View project', url: 'https://www.ecosolve.eco/' }],
  },
  {
    code: 'E',
    projects: ['P034', 'P041'],
    slug: 'gcc-changing-climate',
    title: 'GCC’s Changing Climate',
    tags: ['Data viz'],
    details: [
      { label: 'Client', value: 'AEON Collective' },
      { label: 'Year', value: '2021–22' },
      { label: 'Role', value: 'Sole developer' },
      { label: 'Design', value: 'Amanda Teo' },
      { label: 'Stack', value: 'D3.js' },
    ],
    images: [
      { file: 'E1.jpg', caption: 'Title page and radial charts' },
      { file: 'E2.jpg', caption: 'Doha, winter view' },
      { file: 'E3.jpg', caption: 'Variable filters' },
    ],
    overview:
      'Presented at COP26 by the client, GCC’s Changing Climate shows how the climate of the six Gulf Cooperation Council countries has shifted over 40 years, city by city and season by season. The challenge was fitting four variables (precipitation, heat index, temperature and dangerous days) into a single bespoke radial chart designed for the project, and making it work in both English and Arabic. I built the radial chart and a companion page of line charts in D3.js, along with the filters, toggles and bilingual layout that tie them together.',
    built: [
      {
        title: 'Radial chart',
        text: 'The radial chart layers 40 years of data in a single view, with filters to switch between the four variables.',
      },
      {
        title: 'Season and location toggles',
        text: 'Users can switch between summer and winter, or between one city and the GCC-wide average, and the chart transitions smoothly between states instead of redrawing.',
      },
      {
        title: 'Colour-blind-safe mode',
        text: 'A single toggle swaps the palette across the whole chart, so the data stays readable for people with colour vision deficiencies.',
      },
      {
        title: 'Right-to-left Arabic version',
        text: 'Both the charts and the page copy were translated into Arabic and run right to left, which meant mirroring the page layout and handling text direction inside the charts themselves.',
      },
      {
        title: 'Analysis page',
        text: 'A companion page presents the same dataset as line charts, for anyone who wants a closer look at the trends.',
      },
    ],
    highlights: {
      title: 'Awards and recognition',
      items: [
        'Presented at the 26th United Nations Climate Change Conference by AEON Collective',
        'Information Is Beautiful Awards 2022, longlist',
      ],
    },
    links: [
      {
        label: 'View project (archived)',
        url: 'https://web.archive.org/web/20240826071312/https://aeon.kontinentalist.studio/',
      },
    ],
  },
  {
    code: 'D',
    projects: ['P019', 'P022', 'P048', 'P074', 'P078'],
    slug: 'fintech-in-asean',
    title: 'FinTech in ASEAN',
    tags: ['Data viz'],
    details: [
      { label: 'Client', value: 'UOB' },
      { label: 'Year', value: '2020–24, 5 editions' },
      {
        label: 'Role',
        value:
          'Sole developer for the 2022, 2023 and 2024 editions, covering the data visualisations, front-end build and content. One of two developers for the 2020 and 2021 editions, focusing on data visualisation.',
      },
      { label: 'Design', value: 'Munirah Mansoor and Joceline Kuswanto' },
      {
        label: 'Stack',
        value:
          'Vue 2, Vue 3 or vanilla HTML and CSS, depending on the edition; amCharts 4 and 5, D3.js, ai2html',
      },
    ],
    images: [
      { file: 'D0.jpg', caption: 'Charts from five years of FinTech in ASEAN' },
      { file: 'D1.jpg', caption: 'Unicorn map and timeline' },
      { file: 'D2.jpg', caption: 'Heatmap with tooltips' },
      { file: 'D3.jpg', caption: 'Funding bubbles by category' },
      { file: 'D4.jpg', caption: 'Clickable roadmap' },
    ],
    overview:
      'Every year, UOB publishes a report on ASEAN’s fintech industry, from where the funding flows to how COVID-19 shook it. FinTech in ASEAN turns each edition into an interactive, mobile-friendly executive summary, with a video introduction, editorial content and explorable charts, released in the lead-up to the Singapore FinTech Festival. With new data visualisations every year, each edition was its own build, and UOB came back for five of them. I built the data visualisations for all five, and the full microsite for three.',
    built: [
      {
        title: 'Custom chart designs',
        text: 'amCharts was customised well beyond its defaults, and where a design called for something it couldn’t do, charts were hand-coded in D3.js, such as dynamic bubble charts of fintech funding and industry growth with custom filters.',
      },
      {
        title: 'ai2html and clickable SVGs',
        text: 'Designers’ Illustrator graphics were turned into responsive HTML with ai2html, while clickable SVGs let people explore the data for themselves.',
      },
      {
        title: 'Rebrand update',
        text: 'When UOB rebranded, past editions were refreshed with its new typography and colour palette.',
      },
      {
        title: 'Editable content',
        text: 'Content is decoupled from the code and stored in editable JSON files, so the client’s non-technical team can update it themselves after handover.',
      },
    ],
    highlights: {
      title: 'Highlights',
      items: ['5 editions, released yearly for the Singapore FinTech Festival'],
    },
    links: [
      {
        label: '2020',
        url: 'https://www.uobgroup.com/techecosystem/reports/fintech-in-asean-2020.page',
      },
      {
        label: '2021',
        url: 'https://www.uobgroup.com/techecosystem/reports/fintech-in-asean-2021.page',
      },
      {
        label: '2022',
        url: 'https://www.uobgroup.com/techecosystem/reports/fintech-in-asean-2022.page',
      },
      {
        label: '2023',
        url: 'https://www.uobgroup.com/techecosystem/reports/fintech-in-asean-2023.page',
      },
      {
        label: '2024',
        url: 'https://www.uobgroup.com/techecosystem/reports/fintech-in-asean-2024.page',
      },
    ],
  },
  {
    code: 'F',
    projects: ['P020'],
    slug: 'abandoned-at-sea',
    title: 'Abandoned at Sea',
    tags: ['Maps'],
    details: [
      { label: 'Partner', value: 'UNHCR, the UN Refugee Agency' },
      { label: 'Year', value: '2020' },
      { label: 'Role', value: 'Sole developer' },
      { label: 'Design', value: 'Joceline Kuswanto and Griselda Gabriele' },
      { label: 'Stack', value: 'Mapbox GL JS, Flourish' },
    ],
    images: [
      { file: 'F1.jpg', caption: 'Time slider and tooltips' },
      { file: 'F2.jpg', caption: 'Route drawn on scroll' },
      { file: 'F3.jpg', caption: 'Landing page with wave video and sound' },
      { file: 'F4.jpg', caption: 'Days at sea' },
      { file: 'F5.jpg', caption: 'Journey outcomes' },
    ],
    overview:
      'In collaboration with UNHCR, Abandoned at Sea follows the perilous sea voyages of Rohingya refugees and aims to help people understand the crisis and act on it. To keep readers engaged, we anchored the story with an interactive map that traces each journey, and paired it with audio clips and visceral illustrations.',
    built: [
      {
        title: 'Scroll-driven map',
        text: 'Mapbox’s flyTo camera movements are tied to scroll position, so the map flies between locations as the story unfolds.',
      },
      {
        title: 'Animated routes',
        text: 'The voyage draws itself across the map as the story scrolls, showing the full path of the journey.',
      },
      {
        title: 'Time slider',
        text: 'A time slider tied to the map lets people explore the boat incident data over time.',
      },
      { title: 'Supporting charts', text: 'Additional charts were built in Flourish Studio.' },
    ],
    highlights: {
      title: 'Awards and recognition',
      items: ['Information Is Beautiful Awards 2022, Gold'],
    },
    links: [
      {
        label: 'View project',
        url: 'https://kontinentalist.com/stories/the-rohingya-in-myanmar-a-refugee-crisis-at-sea',
      },
    ],
  },
];
